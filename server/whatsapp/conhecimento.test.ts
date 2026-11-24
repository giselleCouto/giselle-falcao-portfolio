import { describe, expect, it } from "vitest";
import { fatosDoDia, formatarReais, montarPromptDoSistema, relogioBrasilia } from "./conhecimento";

// Horários em Brasília (UTC−3, sem horário de verão)
const ANTES = Date.parse("2026-11-23T14:00:00-03:00");
const ULTIMO_MINUTO = Date.parse("2026-12-12T23:59:00-03:00");
const DEPOIS = Date.parse("2026-12-13T00:00:00-03:00");
const FECHOU = Date.parse("2027-01-23T00:00:00-03:00");

/** Parcela da Tabela Price da Voomp (2,923% a.m.), arredondada ao centavo. */
const price = (valor: number, n = 12, i = 0.02923) => Math.round(((valor * i) / (1 - (1 + i) ** -n)) * 100);

describe("preços, cupons e links que o agente pode citar", () => {
  it("até 12/12/2026: condição de primeira turma com cupom no link", () => {
    const f = fatosDoDia(ANTES);
    expect(f.fase).toBe("primeira_turma");
    expect(f.cursos.mba.hoje).toMatchObject({ avista: "R$ 6.200", parcelado: "12× de R$ 620,01" });
    expect(f.cursos.extensao.hoje).toMatchObject({ avista: "R$ 1.750", parcelado: "12× de R$ 175,00" });
    expect(f.cursos.fluente.hoje).toMatchObject({ avista: "R$ 245", parcelado: "12× de R$ 24,50" });
    expect(f.cursos.mba.cupomHoje).toBe("MBA2800");
    expect(f.cursos.extensao.cupomHoje).toBe("DADO750");
    expect(f.cursos.fluente.cupomHoje).toBe("FLUENTE105");
    expect([f.cursos.mba.desconto, f.cursos.extensao.desconto, f.cursos.fluente.desconto]).toEqual(["R$ 2.800", "R$ 750", "R$ 105"]);

    const mba = new URL(f.cursos.mba.linkInscricao!);
    expect(mba.origin + mba.pathname).toBe("https://pay.voompcreators.com.br/17779");
    expect(mba.searchParams.get("ch_id")).toBe("3071");
    expect(mba.searchParams.get("cupom")).toBe("MBA2800");
    expect(mba.searchParams.get("utm_source")).toBe("whatsapp");
    expect(new URL(f.cursos.extensao.linkInscricao!).searchParams.get("cupom")).toBe("DADO750");
    expect(new URL(f.cursos.fluente.linkInscricao!).pathname).toBe("/17873");
  });

  it("12/12/2026 às 23h59 ainda vale; 13/12 à meia-noite já é valor regular, sem cupom", () => {
    expect(fatosDoDia(ULTIMO_MINUTO).fase).toBe("primeira_turma");
    const f = fatosDoDia(DEPOIS);
    expect(f.fase).toBe("regular");
    expect(f.cursos.mba.hoje).toMatchObject({ avista: "R$ 9.000", parcelado: "12× de R$ 900,01" });
    expect(f.cursos.extensao.hoje).toMatchObject({ avista: "R$ 2.500", parcelado: "12× de R$ 250,00" });
    expect(f.cursos.fluente.hoje).toMatchObject({ avista: "R$ 350", parcelado: "12× de R$ 35,00" });
    for (const c of Object.values(f.cursos)) {
      expect(c.cupomHoje).toBeNull();
      expect(new URL(c.linkInscricao!).searchParams.has("cupom")).toBe(false);
    }
  });

  it("depois de 22/01/2027 não há link de inscrição", () => {
    const f = fatosDoDia(FECHOU);
    expect(f.fase).toBe("inscricoes_encerradas");
    expect(Object.values(f.cursos).every((c) => c.linkInscricao === null)).toBe(true);
  });

  it("as parcelas de 12× batem com a Tabela Price da Voomp (2,923% a.m.)", () => {
    for (const t of [ANTES, DEPOIS]) {
      for (const c of Object.values(fatosDoDia(t).cursos)) {
        expect(c.hoje.parcelaCentavos).toBe(price(c.hoje.avistaCentavos / 100));
      }
    }
  });

  it("formata reais como o site", () => {
    expect(formatarReais(620001)).toBe("R$ 6.200,01");
    expect(formatarReais(280000)).toBe("R$ 2.800");
    expect(formatarReais(2450)).toBe("R$ 24,50");
  });
});

describe("prompt do agente (base-de-conhecimento.md + dados do site)", () => {
  it("até 12/12 traz preços, cupons e links de primeira turma", () => {
    const p = montarPromptDoSistema(ANTES);
    expect(p).toContain("R$ 6.200 à vista ou 12× de R$ 620,01");
    expect(p).toContain("cupom MBA2800");
    expect(p).toContain("cupom DADO750");
    expect(p).toContain("cupom FLUENTE105");
    expect(p).toContain("cupom=MBA2800");
    expect(p).toContain("https://www.coutofalcao.com/nivel/whatsapp");
    expect(p).not.toMatch(/\{\{|<!--/);
  });

  it("depois de 12/12 não cita nenhum código de cupom nem preço de primeira turma", () => {
    const p = montarPromptDoSistema(DEPOIS);
    for (const codigo of ["MBA2800", "DADO750", "FLUENTE105"]) expect(p).not.toContain(codigo);
    for (const valor of ["R$ 6.200", "R$ 1.750", "R$ 245", "620,01", "175,00", "24,50"]) expect(p).not.toContain(valor);
    expect(p).toContain("R$ 9.000 à vista ou 12× de R$ 900,01");
    expect(p).toContain("terminou em 12/12/2026 e não reabre");
  });

  it("depois de 22/01/2027 não traz link de checkout", () => {
    const p = montarPromptDoSistema(FECHOU);
    expect(p).not.toContain("pay.voompcreators.com.br");
    expect(p).toContain("encerraram em 22/01/2027");
  });

  it("traz as regras de certificado e não chama a Giselle de doutora", () => {
    const p = montarPromptDoSistema(ANTES);
    expect(p).toContain("emitido pela Anhanguera, instituição credenciada pelo MEC");
    expect(p).toContain('"certificado de conclusão de curso livre"');
    expect(p).toContain("Nunca chame de pós, pós-graduação, especialização ou MBA");
    expect(p).not.toMatch(/Dra\.\s*Giselle|Doutora\s*·/);
  });

  it("fica igual dentro da mesma fase (cache de prompt do Claude)", () => {
    expect(montarPromptDoSistema(ANTES)).toBe(montarPromptDoSistema(ULTIMO_MINUTO));
    expect(montarPromptDoSistema(DEPOIS)).toBe(montarPromptDoSistema(FECHOU - 60_000));
  });
});

describe("relógio de Brasília", () => {
  it("sabe quando é horário da Giselle (seg–sex, 8h–18h)", () => {
    expect(relogioBrasilia(Date.parse("2026-11-23T10:00:00-03:00"))).toMatchObject({ data: "23/11/2026", nomeDia: "segunda-feira", horarioDaGiselle: true });
    expect(relogioBrasilia(Date.parse("2026-11-23T19:30:00-03:00")).horarioDaGiselle).toBe(false);
    expect(relogioBrasilia(Date.parse("2026-11-28T10:00:00-03:00")).horarioDaGiselle).toBe(false); // sábado
    expect(relogioBrasilia(Date.parse("2026-11-24T07:59:00-03:00")).horarioDaGiselle).toBe(false);
  });
});
