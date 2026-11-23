import { describe, expect, it } from "vitest";
import {
  faixaProgresso,
  interpretarLinha,
  lerData,
  lerPercentual,
  lerPlanilha,
  mapearColunas,
  situacaoAcademica,
  turmaDaInscricao,
} from "../shared/academico";
import type { VoompAcademico } from "../drizzle/schema";
import { camposDaEdicao, planejarImportacao } from "./voompDb";

const MBA = "17779";
const EXTENSAO = "17781";
const FLUENTE = "17873";
const pagoNaBlackFriday = new Date("2026-11-28T15:00:00-03:00");
const dia = (iso: string) => new Date(`${iso}T12:00:00-03:00`);

describe("turma e prazo", () => {
  it("quem paga até 22/01/2027 entra na Turma 01, que começa em 25/01/2027", () => {
    const t = turmaDaInscricao(MBA, pagoNaBlackFriday);
    expect(t.codigo).toBe("T01");
    expect(t.ano).toBe(2027);
    expect(t.inicio.toISOString()).toBe("2027-01-25T03:00:00.000Z");
    expect(t.prazo.toISOString()).toBe("2028-01-25T03:00:00.000Z"); // MBA: 12 meses
  });

  it("prazos máximos: extensão em até 4 meses e curso livre em até 3 semanas", () => {
    expect(turmaDaInscricao(EXTENSAO, pagoNaBlackFriday).prazo.toISOString()).toBe("2027-05-25T03:00:00.000Z");
    expect(turmaDaInscricao(FLUENTE, pagoNaBlackFriday).prazo.toISOString()).toBe("2027-02-15T03:00:00.000Z");
  });

  it("quem paga depois entra na entrada contínua do mês, começando no dia do pagamento", () => {
    const pago = new Date("2027-03-10T10:00:00-03:00");
    const t = turmaDaInscricao(FLUENTE, pago);
    expect(t.codigo).toBe("EC-2027-03");
    expect(t.inicio).toEqual(pago);
    expect(t.prazo.toISOString()).toBe("2027-03-31T13:00:00.000Z"); // 21 dias depois
  });

  it("a turma escrita no painel vale mais que a data do pagamento", () => {
    expect(turmaDaInscricao(MBA, new Date("2027-05-01T10:00:00-03:00"), "t01").codigo).toBe("T01");
  });
});

describe("situação no curso", () => {
  const paga = { status: "pago", productId: MBA, paidAt: pagoNaBlackFriday };

  it("inscrição não paga não é aluno", () => {
    expect(situacaoAcademica({ ...paga, status: "abandonado" }, null, dia("2027-03-01"))).toBeNull();
  });

  it("antes do início da turma: aguardando início", () => {
    expect(situacaoAcademica(paga, null, dia("2026-12-20"))?.situacao).toBe("aguardando_inicio");
  });

  it("cursando enquanto avança; em risco com 30 dias sem avançar", () => {
    const avancou = { progressoPct: 20, ultimoAvancoAt: dia("2027-03-01") };
    expect(situacaoAcademica(paga, avancou, dia("2027-03-20"))?.situacao).toBe("cursando");
    const r = situacaoAcademica(paga, avancou, dia("2027-04-01"));
    expect(r?.situacao).toBe("em_risco");
    expect(r?.diasSemAvanco).toBe(31);
  });

  it("quem nunca avançou entra em risco 30 dias depois do início da turma", () => {
    expect(situacaoAcademica(paga, null, dia("2027-02-15"))?.situacao).toBe("cursando");
    expect(situacaoAcademica(paga, null, dia("2027-02-26"))?.situacao).toBe("em_risco");
  });

  it("100%, data de conclusão ou aprovação = concluiu, mesmo depois do prazo", () => {
    const depois = dia("2028-06-01");
    expect(situacaoAcademica(paga, { progressoPct: 100 }, depois)?.situacao).toBe("concluiu");
    expect(situacaoAcademica(paga, { concluidoAt: dia("2027-12-01") }, depois)?.situacao).toBe("concluiu");
    expect(situacaoAcademica(paga, { aprovado: true, progressoPct: 90 }, depois)?.situacao).toBe("concluiu");
  });

  it("prazo da turma vencido sem 100% nem aprovação = não concluiu", () => {
    expect(situacaoAcademica(paga, { progressoPct: 80, ultimoAvancoAt: dia("2028-01-10") }, dia("2028-02-01"))?.situacao).toBe(
      "nao_concluiu"
    );
  });

  it("cancelamento e reembolso ficam à parte", () => {
    expect(situacaoAcademica(paga, { canceladoAt: dia("2027-04-01") }, dia("2027-05-01"))?.situacao).toBe("cancelou");
    expect(situacaoAcademica({ ...paga, status: "reembolsado" }, { progressoPct: 100 }, dia("2027-05-01"))?.situacao).toBe(
      "reembolsado"
    );
  });

  it("curso livre: 7 dias parado já é risco; o prazo de 3 semanas vence em 15/02/2027", () => {
    const fluente = { status: "pago", productId: FLUENTE, paidAt: pagoNaBlackFriday };
    const avancou = { progressoPct: 60, ultimoAvancoAt: dia("2027-02-03") };
    expect(situacaoAcademica(fluente, avancou, dia("2027-02-08"))?.situacao).toBe("cursando");
    const parado = situacaoAcademica(fluente, avancou, dia("2027-02-11"));
    expect(parado).toMatchObject({ situacao: "em_risco", motivoRisco: "sem_avanco", diasSemAvanco: 8 });
    expect(situacaoAcademica(fluente, avancou, dia("2027-02-16"))?.situacao).toBe("nao_concluiu");
  });

  it("fora do ritmo que fecha a carga horária no prazo = em risco, mesmo avançando", () => {
    const extensao = { status: "pago", productId: EXTENSAO, paidAt: pagoNaBlackFriday };
    // 66 dias de 120 (esperado 55%), 30% feito, avançou há 4 dias
    const r = situacaoAcademica(extensao, { progressoPct: 30, ultimoAvancoAt: dia("2027-03-28") }, dia("2027-04-01"))!;
    expect(r).toMatchObject({ situacao: "em_risco", motivoRisco: "ritmo", progressoEsperado: 55 });
    expect(r.horas).toEqual({ total: 40, cumpridas: 12, faltam: 28, porSemanaPlanejado: 2.3, porSemanaNecessario: 3.7 });
    // no ritmo: 45% feito com 55% esperado → cursando
    expect(situacaoAcademica(extensao, { progressoPct: 45, ultimoAvancoAt: dia("2027-03-28") }, dia("2027-04-01"))?.situacao).toBe(
      "cursando"
    );
  });

  it("ritmo planejado de cada curso cabe na carga horária autorizada", () => {
    const ritmo = (productId: string) =>
      situacaoAcademica({ status: "pago", productId, paidAt: pagoNaBlackFriday }, null, dia("2027-01-25"))!.horas.porSemanaPlanejado;
    expect(ritmo(MBA)).toBe(7.3); // 380 h em 12 meses
    expect(ritmo(EXTENSAO)).toBe(2.3); // 40 h em 4 meses
    expect(ritmo(FLUENTE)).toBe(3.3); // 10 h em 3 semanas
  });

  it("faixas do funil de progresso", () => {
    expect([null, 0, 10, 50, 51, 99, 100].map(faixaProgresso)).toEqual([
      "sem dado", "0%", "1–25%", "26–50%", "51–75%", "76–99%", "100%",
    ]);
  });
});

describe("leitura do relatório de progresso", () => {
  it("lê CSV do Excel em português (;), com aspas e BOM", () => {
    const p = lerPlanilha('﻿Nome;E-mail;Progresso\r\n"Souza; Maria";maria@exemplo.com;45%\r\n\r\nJoão;joao@exemplo.com;"100"\r\n');
    expect(p.cabecalhos).toEqual(["Nome", "E-mail", "Progresso"]);
    expect(p.linhas).toEqual([
      ["Souza; Maria", "maria@exemplo.com", "45%"],
      ["João", "joao@exemplo.com", "100"],
    ]);
  });

  it("lê o que foi colado do Excel (tabulação)", () => {
    expect(lerPlanilha("email\tprogresso\na@b.com\t30").linhas).toEqual([["a@b.com", "30"]]);
  });

  it("reconhece as colunas mais comuns dos relatórios", () => {
    expect(
      mapearColunas([
        "Aluno", "E-mail do aluno", "RA", "Matrícula", "CPF", "% Concluído", "Aulas concluídas", "Total de aulas",
        "Último acesso", "Data de conclusão", "Situação", "Telefone",
      ])
    ).toEqual([
      "nome", "email", "ra", "matricula", "cpf", "progresso", "aulasConcluidas", "aulasTotal", "ultimoAcesso", "concluidoEm",
      "situacao", null,
    ]);
  });

  it("percentuais e datas em formato brasileiro", () => {
    expect(["45%", "45,6", "0,45", "1", "", "abc", "120"].map(lerPercentual)).toEqual([45, 46, 45, 1, null, null, 100]);
    expect(lerData("25/01/2027")?.toISOString()).toBe("2027-01-25T03:00:00.000Z");
    expect(lerData("25/01/2027 14:30")?.toISOString()).toBe("2027-01-25T17:30:00.000Z");
    expect(lerData("2027-01-25")?.toISOString()).toBe("2027-01-25T03:00:00.000Z");
    expect(lerData("2027-01-25T14:30:00Z")?.toISOString()).toBe("2027-01-25T14:30:00.000Z");
    expect(lerData("ontem")).toBeNull();
  });

  it("calcula o progresso pelas aulas quando não há coluna de %", () => {
    const colunas = mapearColunas(["email", "aulas concluídas", "total de aulas"]);
    expect(interpretarLinha(colunas, ["A@B.com", "10", "40"])).toMatchObject({ email: "a@b.com", progressoPct: 25, concluido: false });
  });

  it("horas cumpridas viram progresso pela carga horária do curso", () => {
    const colunas = mapearColunas(["email", "horas assistidas"]);
    expect(colunas).toEqual(["email", "horas"]);
    expect(interpretarLinha(colunas, ["a@b.com", "5,5"], 10)).toMatchObject({ progressoPct: 55 });
    expect(interpretarLinha(colunas, ["a@b.com", "12"], 10)).toMatchObject({ progressoPct: 100, concluido: true });
  });

  it("situação 'Aprovado' conclui; 'Reprovado' não", () => {
    const colunas = mapearColunas(["email", "situação"]);
    expect(interpretarLinha(colunas, ["a@b.com", "Aprovado"])).toMatchObject({ aprovado: true, concluido: true });
    expect(interpretarLinha(colunas, ["a@b.com", "Reprovado"])).toMatchObject({ aprovado: false, concluido: false });
    expect(interpretarLinha(colunas, ["a@b.com", "Em andamento"])).toMatchObject({ aprovado: null, concluido: false });
  });
});

const acad = (inscricaoId: number, extra: Partial<VoompAcademico> = {}): VoompAcademico => ({
  id: inscricaoId,
  inscricaoId,
  ra: null,
  turma: null,
  progressoPct: null,
  aulasConcluidas: null,
  aulasTotal: null,
  aprovado: null,
  ultimoAcessoAt: null,
  ultimoAvancoAt: null,
  concluidoAt: null,
  canceladoAt: null,
  motivoCancelamento: null,
  observacoes: null,
  origem: null,
  importadoAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...extra,
});

describe("importação do relatório", () => {
  const agora = dia("2027-03-15");
  const inscricoes = [
    { id: 1, email: "maria@exemplo.com", matricula: "NK-MBA-2027-0001", documento: "123.456.789-09", status: "pago" },
    { id: 2, email: "joao@exemplo.com", matricula: "NK-MBA-2027-0002", documento: null, status: "pago" },
    { id: 3, email: "bia@exemplo.com", matricula: null, documento: null, status: "abandonado" },
    { id: 4, email: "ana@exemplo.com", matricula: "NK-MBA-2027-0003", documento: null, status: "pago" },
  ];
  const academicos = [acad(2, { progressoPct: 40, ultimoAvancoAt: dia("2027-02-20"), ra: "RA555" }), acad(4, { progressoPct: 60 })];

  it("liga cada linha pelo e-mail, matrícula, RA ou CPF e marca avanço e conclusão", () => {
    const plano = planejarImportacao(
      ["E-mail", "Matrícula", "RA", "CPF", "Progresso", "Último acesso"],
      [
        ["MARIA@exemplo.com", "", "", "", "30%", "10/03/2027"], // por e-mail, primeiro avanço
        ["", "", "RA555", "", "40%", ""], // por RA, sem mudança de progresso
        ["", "", "", "12345678909", "", ""], // por CPF (mesma Maria) → repetida
        ["bia@exemplo.com", "", "", "", "10%", ""], // inscrição não paga
        ["", "NK-MBA-2027-0003", "", "", "100%", "14/03/2027"], // por matrícula, concluiu
        ["quem@naoexiste.com", "", "", "", "50%", ""],
      ],
      inscricoes,
      academicos,
      agora
    );
    expect(plano.resultados.map((r) => r.resultado)).toEqual([
      "atualizada", "sem_mudanca", "ambigua", "nao_matriculada", "atualizada", "nao_encontrada",
    ]);
    expect(plano.totais).toMatchObject({ atualizadas: 2, semMudanca: 1, ambiguas: 1, naoMatriculadas: 1, naoEncontradas: 1, concluiramAgora: 1 });

    const maria = plano.gravar.find((g) => g.inscricaoId === 1)!.campos;
    expect(maria.progressoPct).toBe(30);
    expect(maria.ultimoAvancoAt?.toISOString()).toBe("2027-03-10T03:00:00.000Z"); // usa o último acesso do relatório
    const ana = plano.gravar.find((g) => g.inscricaoId === 4)!.campos;
    expect(ana.concluidoAt?.toISOString()).toBe("2027-03-14T03:00:00.000Z");
    expect(plano.gravar.find((g) => g.inscricaoId === 2)!.campos.progressoPct).toBeUndefined();
  });

  it("progresso que não sobe não renova o último avanço", () => {
    const plano = planejarImportacao(["email", "progresso"], [["joao@exemplo.com", "35"]], inscricoes, academicos, agora);
    const joao = plano.gravar[0].campos;
    expect(joao.progressoPct).toBe(35);
    expect(joao.ultimoAvancoAt).toBeUndefined();
  });
});

describe("edição no cartão do estudante", () => {
  const agora = dia("2027-04-01");

  it("RA, turma em maiúsculas e progresso que sobe marca avanço", () => {
    const campos = camposDaEdicao(acad(1, { progressoPct: 20 }), { ra: " 123456 ", turma: "t01", progressoPct: 45 }, agora);
    expect(campos).toMatchObject({ ra: "123456", turma: "T01", progressoPct: 45, ultimoAvancoAt: agora, origem: "painel" });
  });

  it("concluir e cancelar guardam a data; desmarcar limpa", () => {
    expect(camposDaEdicao(null, { concluido: true }, agora).concluidoAt).toEqual(agora);
    expect(camposDaEdicao(acad(1, { concluidoAt: dia("2027-03-01") }), { concluido: false }, agora).concluidoAt).toBeNull();
    expect(camposDaEdicao(null, { cancelado: true, motivoCancelamento: "mudou de emprego" }, agora)).toMatchObject({
      canceladoAt: agora,
      motivoCancelamento: "mudou de emprego",
    });
    expect(camposDaEdicao(acad(1, { canceladoAt: agora }), { cancelado: false }, agora)).toMatchObject({
      canceladoAt: null,
      motivoCancelamento: null,
    });
  });
});
