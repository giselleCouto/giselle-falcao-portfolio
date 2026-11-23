// Vida acadêmica de quem se matriculou: turma, prazo, situação no curso
// (cursando, em risco, concluiu, não concluiu) e leitura do relatório de
// progresso. Compartilhado entre o servidor (que grava e importa) e o painel
// /painel/estudantes (que calcula a distribuição na tela).

// Ritmo e prazos: ver CALENDARIO_CURSOS.

type Turma = { codigo: string; inicio: string; inscricoesAte: string };
type Calendario = {
  /** Carga horária autorizada do curso (a que vai no certificado). */
  cargaHoraria: number;
  /** Prazo máximo para concluir, contado do início da turma (ou da compra, na entrada contínua). */
  prazo: { meses: number } | { dias: number };
  rotuloPrazo: string;
  /** Dias seguidos sem avançar que já põem a pessoa "em risco" (proporcional ao prazo). */
  diasSemAvancoParaRisco: number;
  turmas: Turma[];
};

const TURMA_01: Turma = { codigo: "T01", inicio: "2027-01-25", inscricoesAte: "2027-01-22" };

/**
 * Calendário de cada curso da Voomp. Quem paga até o fim das inscrições de uma
 * turma entra nela; quem paga depois entra na "entrada contínua" do mês da
 * compra, com início no dia do pagamento. Para abrir a Turma 02, basta
 * acrescentar a linha aqui.
 *
 * Prazos máximos (definidos pela Giselle em 19/11/2026) e o ritmo que cada um
 * exige para cumprir a carga horária autorizada:
 *  - MBA: 380 h em 12 meses (uma disciplina a cada 30 dias) ≈ 7,3 h/semana;
 *  - extensão Do Dado ao Valor: 40 h em até 4 meses ≈ 2,3 h/semana;
 *  - curso livre Fluente em IA completo: 10 h em até 3 semanas ≈ 3,3 h/semana.
 */
export const CALENDARIO_CURSOS: Record<string, Calendario> = {
  "17779": { cargaHoraria: 380, prazo: { meses: 12 }, rotuloPrazo: "12 meses", diasSemAvancoParaRisco: 30, turmas: [TURMA_01] },
  "17781": { cargaHoraria: 40, prazo: { meses: 4 }, rotuloPrazo: "4 meses", diasSemAvancoParaRisco: 21, turmas: [TURMA_01] },
  "17873": { cargaHoraria: 10, prazo: { dias: 21 }, rotuloPrazo: "3 semanas", diasSemAvancoParaRisco: 7, turmas: [TURMA_01] },
};

const CALENDARIO_PADRAO: Calendario = {
  cargaHoraria: 0,
  prazo: { meses: 6 },
  rotuloPrazo: "6 meses",
  diasSemAvancoParaRisco: 30,
  turmas: [],
};

export const calendarioDoCurso = (productId: string) => CALENDARIO_CURSOS[String(productId)] ?? CALENDARIO_PADRAO;

/** Pontos percentuais abaixo do ritmo esperado que já põem a pessoa "em risco". */
export const ATRASO_RITMO_PP = 20;

/** "2027-01-25" → meia-noite em Brasília. */
const diaBrasilia = (dia: string, fimDoDia = false) => new Date(`${dia}T${fimDoDia ? "23:59:59" : "00:00:00"}-03:00`);

const DIA_MS = 24 * 60 * 60 * 1000;

function somarPrazo(d: Date, prazo: Calendario["prazo"]) {
  if ("dias" in prazo) return new Date(d.getTime() + prazo.dias * DIA_MS);
  const r = new Date(d.getTime());
  r.setUTCMonth(r.getUTCMonth() + prazo.meses);
  return r;
}

const comoData = (v: Date | string | null | undefined) => (v ? (v instanceof Date ? v : new Date(v)) : null);

export type TurmaCalculada = { codigo: string; inicio: Date; prazo: Date; ano: number };

/** Turma, início e prazo de quem pagou em `pagoEm` (ou da turma escrita à mão no painel). */
export function turmaDaInscricao(
  productId: string,
  pagoEm: Date | string | null | undefined,
  turmaManual?: string | null
): TurmaCalculada {
  const cal = calendarioDoCurso(productId);
  const pago = comoData(pagoEm) ?? new Date();
  const fixa = turmaManual ? cal.turmas.find((t) => t.codigo === turmaManual.trim().toUpperCase()) : undefined;
  const turma = fixa ?? cal.turmas.find((t) => pago.getTime() <= diaBrasilia(t.inscricoesAte, true).getTime());
  if (turma) {
    const inicio = diaBrasilia(turma.inicio);
    return { codigo: turma.codigo, inicio, prazo: somarPrazo(inicio, cal.prazo), ano: Number(turma.inicio.slice(0, 4)) };
  }
  // entrada contínua: começa no dia do pagamento
  const mes = pago.toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" }).slice(0, 7);
  return {
    codigo: turmaManual?.trim() ? turmaManual.trim().toUpperCase() : `EC-${mes}`,
    inicio: pago,
    prazo: somarPrazo(pago, cal.prazo),
    ano: Number(mes.slice(0, 4)),
  };
}

/** Situação de quem se matriculou (inscrição paga) ao longo do curso. */
export type SituacaoAcademica =
  | "aguardando_inicio"
  | "cursando"
  | "em_risco"
  | "concluiu"
  | "nao_concluiu"
  | "cancelou"
  | "reembolsado";

export const SITUACAO_ACADEMICA: Record<SituacaoAcademica, { rotulo: string; cor: string; explicacao: string }> = {
  aguardando_inicio: { rotulo: "Aguardando início", cor: "#64748b", explicacao: "Pagou e a turma ainda não começou." },
  cursando: { rotulo: "Cursando", cor: "#2563eb", explicacao: "Avançando no ritmo que fecha a carga horária no prazo." },
  em_risco: {
    rotulo: "Em risco",
    cor: "#d97706",
    explicacao: `Parou de avançar (MBA 30 dias, extensão 21, curso livre 7) ou está ${ATRASO_RITMO_PP} pontos abaixo do ritmo que fecha a carga horária no prazo.`,
  },
  concluiu: { rotulo: "Concluiu", cor: "#0f9d8f", explicacao: "Chegou a 100% das aulas ou foi aprovada(o)." },
  nao_concluiu: { rotulo: "Não concluiu no prazo", cor: "#be123c", explicacao: "O prazo máximo acabou sem 100% nem aprovação." },
  cancelou: { rotulo: "Cancelou", cor: "#7c3aed", explicacao: "Desistência registrada no painel (sem reembolso)." },
  reembolsado: { rotulo: "Reembolso ou chargeback", cor: "#6b21a8", explicacao: "Dinheiro devolvido: sai da conta de conclusão." },
};

export const ORDEM_SITUACAO: SituacaoAcademica[] = [
  "aguardando_inicio",
  "cursando",
  "em_risco",
  "concluiu",
  "nao_concluiu",
  "cancelou",
  "reembolsado",
];

export type DadosAcademicos = {
  turma?: string | null;
  progressoPct?: number | null;
  aprovado?: boolean | null;
  ultimoAvancoAt?: Date | string | null;
  concluidoAt?: Date | string | null;
  canceladoAt?: Date | string | null;
};

export type HorasDoCurso = {
  /** carga horária autorizada */
  total: number;
  /** horas equivalentes ao progresso (progresso × carga horária) */
  cumpridas: number;
  faltam: number;
  /** ritmo que fecha a carga horária exatamente no prazo, do início ao fim */
  porSemanaPlanejado: number;
  /** ritmo que a pessoa precisa daqui até o prazo (null: prazo vencido ou já concluiu) */
  porSemanaNecessario: number | null;
};

export type AcompanhamentoCalculado = {
  situacao: SituacaoAcademica;
  turma: TurmaCalculada;
  /** dias desde o último avanço (ou desde o início da turma, se nunca avançou) */
  diasSemAvanco: number | null;
  /** dias até o fim do prazo (negativo = prazo vencido) */
  diasAtePrazo: number;
  /** progresso que já deveria ter, se o ritmo fosse uniforme até o prazo (null antes do início) */
  progressoEsperado: number | null;
  motivoRisco: "sem_avanco" | "ritmo" | null;
  horas: HorasDoCurso;
};

const umaCasa = (n: number) => Math.round(n * 10) / 10;

/**
 * Situação acadêmica de uma inscrição. Devolve null para quem não se
 * matriculou (inscrição não paga): essas pessoas ficam só na aba Inscrições.
 */
export function situacaoAcademica(
  inscricao: { status: string; productId: string; paidAt?: Date | string | null },
  academico: DadosAcademicos | null | undefined,
  agora: Date = new Date()
): AcompanhamentoCalculado | null {
  const financeiro = inscricao.status === "reembolsado" || inscricao.status === "chargeback";
  if (inscricao.status !== "pago" && !financeiro) return null;

  const cal = calendarioDoCurso(inscricao.productId);
  const turma = turmaDaInscricao(inscricao.productId, inscricao.paidAt, academico?.turma);
  const duracaoMs = Math.max(DIA_MS, turma.prazo.getTime() - turma.inicio.getTime());
  const diasAtePrazo = Math.ceil((turma.prazo.getTime() - agora.getTime()) / DIA_MS);
  const avanco = comoData(academico?.ultimoAvancoAt);
  const referencia = avanco && avanco > turma.inicio ? avanco : turma.inicio;
  const comecou = agora >= turma.inicio;
  const diasSemAvanco = comecou ? Math.floor((agora.getTime() - referencia.getTime()) / DIA_MS) : null;

  const progresso = Math.max(0, Math.min(100, academico?.progressoPct ?? 0));
  const decorrido = Math.min(1, Math.max(0, (agora.getTime() - turma.inicio.getTime()) / duracaoMs));
  const progressoEsperado = comecou ? Math.round(decorrido * 100) : null;

  const concluiu = Boolean(academico?.concluidoAt) || progresso >= 100 || academico?.aprovado === true;
  const semanasTotais = duracaoMs / (7 * DIA_MS);
  const semanasRestantes = (turma.prazo.getTime() - Math.max(agora.getTime(), turma.inicio.getTime())) / (7 * DIA_MS);
  const cumpridas = concluiu ? cal.cargaHoraria : (progresso / 100) * cal.cargaHoraria;
  const faltam = Math.max(0, cal.cargaHoraria - cumpridas);
  const horas: HorasDoCurso = {
    total: cal.cargaHoraria,
    cumpridas: umaCasa(cumpridas),
    faltam: umaCasa(faltam),
    porSemanaPlanejado: umaCasa(cal.cargaHoraria / semanasTotais),
    porSemanaNecessario: concluiu || semanasRestantes <= 0 ? null : umaCasa(faltam / semanasRestantes),
  };

  let motivoRisco: AcompanhamentoCalculado["motivoRisco"] = null;
  if ((diasSemAvanco ?? 0) >= cal.diasSemAvancoParaRisco) motivoRisco = "sem_avanco";
  else if (progressoEsperado !== null && progressoEsperado - progresso >= ATRASO_RITMO_PP) motivoRisco = "ritmo";

  let situacao: SituacaoAcademica;
  if (financeiro) situacao = "reembolsado";
  else if (concluiu) situacao = "concluiu";
  else if (academico?.canceladoAt) situacao = "cancelou";
  else if (!comecou) situacao = "aguardando_inicio";
  else if (agora > turma.prazo) situacao = "nao_concluiu";
  else if (motivoRisco) situacao = "em_risco";
  else situacao = "cursando";

  return {
    situacao,
    turma,
    diasSemAvanco,
    diasAtePrazo,
    progressoEsperado,
    motivoRisco: situacao === "em_risco" ? motivoRisco : null,
    horas,
  };
}

/** Texto curto do motivo de risco, para a lista e o cartão. */
export function textoRisco(a: AcompanhamentoCalculado, progressoPct: number | null | undefined) {
  if (a.motivoRisco === "sem_avanco") return `${a.diasSemAvanco} dias sem avançar`;
  if (a.motivoRisco === "ritmo") return `${progressoPct ?? 0}% feito, esperado ${a.progressoEsperado}%`;
  return "";
}

/** Faixas do funil de progresso. */
export const FAIXAS_PROGRESSO = ["sem dado", "0%", "1–25%", "26–50%", "51–75%", "76–99%", "100%"] as const;

export function faixaProgresso(pct: number | null | undefined): (typeof FAIXAS_PROGRESSO)[number] {
  if (pct === null || pct === undefined) return "sem dado";
  if (pct <= 0) return "0%";
  if (pct <= 25) return "1–25%";
  if (pct <= 50) return "26–50%";
  if (pct <= 75) return "51–75%";
  if (pct < 100) return "76–99%";
  return "100%";
}

// ── leitura do relatório de progresso (CSV do Voomp Play, da Anhanguera ou planilha própria) ──

/** CSV/TSV colado ou exportado (";" do Excel em português, "," ou tabulação). */
export function lerPlanilha(texto: string): { cabecalhos: string[]; linhas: string[][] } {
  const limpo = texto.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
  const primeira = limpo.split("\n").find((l) => l.trim()) ?? "";
  const contagem = (sep: string) => primeira.split(sep).length - 1;
  const sep = ["\t", ";", ","].reduce((melhor, s) => (contagem(s) > contagem(melhor) ? s : melhor), "\t");

  const linhas: string[][] = [];
  let linha: string[] = [];
  let celula = "";
  let aspas = false;
  for (let i = 0; i < limpo.length; i++) {
    const c = limpo[i];
    if (aspas) {
      if (c === '"' && limpo[i + 1] === '"') {
        celula += '"';
        i++;
      } else if (c === '"') aspas = false;
      else celula += c;
    } else if (c === '"' && celula === "") aspas = true;
    else if (c === sep) {
      linha.push(celula.trim());
      celula = "";
    } else if (c === "\n") {
      linha.push(celula.trim());
      if (linha.some((x) => x)) linhas.push(linha);
      linha = [];
      celula = "";
    } else celula += c;
  }
  linha.push(celula.trim());
  if (linha.some((x) => x)) linhas.push(linha);

  const [cabecalhos = [], ...resto] = linhas;
  return { cabecalhos, linhas: resto };
}

export type CampoImportacao =
  | "email"
  | "nome"
  | "matricula"
  | "ra"
  | "cpf"
  | "progresso"
  | "aulasConcluidas"
  | "aulasTotal"
  | "horas"
  | "ultimoAcesso"
  | "concluidoEm"
  | "situacao";

export const ROTULO_CAMPO: Record<CampoImportacao, string> = {
  email: "E-mail",
  nome: "Nome",
  matricula: "Matrícula NOKAHI",
  ra: "RA (Anhanguera)",
  cpf: "CPF",
  progresso: "Progresso (%)",
  aulasConcluidas: "Aulas concluídas",
  aulasTotal: "Total de aulas",
  horas: "Horas cumpridas",
  ultimoAcesso: "Último acesso",
  concluidoEm: "Data de conclusão",
  situacao: "Situação / aprovação",
};

const normalizar = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9%]+/g, " ").trim();

// Ordem importa: a primeira regra que casar fica com a coluna.
const REGRAS_COLUNA: [CampoImportacao, RegExp][] = [
  ["email", /\be ?mail\b/],
  ["ra", /^(ra|r a|registro academico|ra do aluno|matricula anhanguera|matricula ies)$/],
  ["matricula", /^(matricula|matricula nokahi|n matricula|numero da matricula)$/],
  ["cpf", /\b(cpf|documento)\b/],
  ["aulasConcluidas", /(aulas? (concluidas?|assistidas?|finalizadas?)|concluidas|lessons? completed|completed lessons?)/],
  ["aulasTotal", /(total (de )?aulas|aulas total|total lessons?|^aulas$|quantidade de aulas)/],
  ["horas", /(horas? (cumpridas?|assistidas?|concluidas?|realizadas?)|carga horaria cumprida|tempo assistido \(?h)/],
  ["progresso", /(progresso|porcentagem|percentual|% ?conclu|conclusao ?%|andamento|progress|^%$)/],
  ["concluidoEm", /(data (de )?conclusao|concluido em|concluida em|completed at|data do certificado|certificado em|finalizado em)/],
  ["ultimoAcesso", /(ultimo acesso|ultima atividade|ultimo login|last (access|login|activity)|acessou em)/],
  ["situacao", /(situacao|status|resultado|aprovad)/],
  ["nome", /^(nome|aluno|estudante|nome do aluno|nome completo|name|full name)$/],
];

/** Qual campo cada coluna do relatório representa (null = coluna ignorada). */
export function mapearColunas(cabecalhos: string[]): (CampoImportacao | null)[] {
  const usados = new Set<CampoImportacao>();
  return cabecalhos.map((c) => {
    const n = normalizar(c);
    for (const [campo, regra] of REGRAS_COLUNA) {
      if (!usados.has(campo) && regra.test(n)) {
        usados.add(campo);
        return campo;
      }
    }
    return null;
  });
}

/** "45%", "45,5", "0,455" (fração) → 0–100 inteiro. */
export function lerPercentual(v: string | null | undefined): number | null {
  const s = String(v ?? "").trim();
  if (!s) return null;
  const n = Number(s.replace("%", "").replace(/\s/g, "").replace(",", "."));
  if (!Number.isFinite(n)) return null;
  // "0,45" ou "0.45" sem % = fração (45%); "1" = 1%
  const pct = !s.includes("%") && n > 0 && n < 1 ? n * 100 : n;
  return Math.max(0, Math.min(100, Math.round(pct)));
}

/** "25/01/2027", "25/01/2027 14:30", "2027-01-25", "2027-01-25T14:30:00Z" → Date (horário de Brasília). */
export function lerData(v: string | null | undefined): Date | null {
  const s = String(v ?? "").trim();
  if (!s) return null;
  const br = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})(?:[ T]+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
  if (br) {
    const [, d, m, a, h = "00", min = "00", seg = "00"] = br;
    const ano = a.length === 2 ? `20${a}` : a;
    const data = new Date(`${ano}-${m.padStart(2, "0")}-${d.padStart(2, "0")}T${h.padStart(2, "0")}:${min}:${seg}-03:00`);
    return Number.isNaN(data.getTime()) ? null : data;
  }
  const iso = s.match(/^\d{4}-\d{2}-\d{2}$/) ? `${s}T00:00:00-03:00` : s.replace(" ", "T");
  const data = new Date(/[zZ]$|[+-]\d{2}:?\d{2}$/.test(iso) ? iso : `${iso}-03:00`);
  return Number.isNaN(data.getTime()) ? null : data;
}

/** Texto da coluna de situação → aprovado/concluído. */
export function lerSituacao(v: string | null | undefined): { aprovado: boolean | null; concluido: boolean } {
  const s = normalizar(String(v ?? ""));
  if (!s) return { aprovado: null, concluido: false };
  if (/reprov/.test(s)) return { aprovado: false, concluido: false };
  if (/aprov/.test(s)) return { aprovado: true, concluido: true };
  if (/(^| )(nao|sem) conclu|em andamento|cursando|incomplet/.test(s)) return { aprovado: null, concluido: false };
  if (/conclu|complet|finaliz|certificad/.test(s)) return { aprovado: null, concluido: true };
  return { aprovado: null, concluido: false };
}

export type LinhaImportada = {
  email: string | null;
  nome: string | null;
  matricula: string | null;
  ra: string | null;
  cpfDigitos: string | null;
  progressoPct: number | null;
  aulasConcluidas: number | null;
  aulasTotal: number | null;
  ultimoAcessoAt: Date | null;
  concluidoAt: Date | null;
  aprovado: boolean | null;
  concluido: boolean;
};

const inteiro = (v: string | undefined) => {
  const n = Number(String(v ?? "").replace(/\D/g, ""));
  return String(v ?? "").trim() && Number.isFinite(n) ? n : null;
};

/**
 * Uma linha do relatório → dados prontos para gravar. Com a carga horária do
 * curso, uma coluna de horas cumpridas também vira progresso (horas ÷ carga).
 */
export function interpretarLinha(colunas: (CampoImportacao | null)[], celulas: string[], cargaHoraria = 0): LinhaImportada {
  const valor = (campo: CampoImportacao) => {
    const i = colunas.indexOf(campo);
    const v = i >= 0 ? celulas[i]?.trim() : "";
    return v ? v : undefined;
  };
  const aulasConcluidas = inteiro(valor("aulasConcluidas"));
  const aulasTotal = inteiro(valor("aulasTotal"));
  let progressoPct = lerPercentual(valor("progresso"));
  if (progressoPct === null && aulasConcluidas !== null && aulasTotal) {
    progressoPct = Math.max(0, Math.min(100, Math.round((aulasConcluidas / aulasTotal) * 100)));
  }
  const horas = Number(String(valor("horas") ?? "").replace(/h/i, "").replace(",", ".").trim());
  if (progressoPct === null && cargaHoraria > 0 && valor("horas") && Number.isFinite(horas)) {
    progressoPct = Math.max(0, Math.min(100, Math.round((horas / cargaHoraria) * 100)));
  }
  const situacao = lerSituacao(valor("situacao"));
  const concluidoAt = lerData(valor("concluidoEm"));
  const cpf = (valor("cpf") ?? "").replace(/\D/g, "");
  return {
    email: valor("email")?.toLowerCase() ?? null,
    nome: valor("nome") ?? null,
    matricula: valor("matricula")?.toUpperCase() ?? null,
    ra: valor("ra") ?? null,
    cpfDigitos: cpf.length >= 11 ? cpf : null,
    progressoPct,
    aulasConcluidas,
    aulasTotal,
    ultimoAcessoAt: lerData(valor("ultimoAcesso")),
    concluidoAt,
    aprovado: situacao.aprovado,
    concluido: situacao.concluido || Boolean(concluidoAt) || (progressoPct ?? 0) >= 100,
  };
}
