// Registro de estudantes vindos da Voomp (webhook → tabela voomp_inscricoes).
// Compartilhado entre o servidor (que grava) e o painel /painel/estudantes (que mostra).

/** Situação da inscrição de uma pessoa num curso. */
export type StatusInscricao =
  | "pago"
  | "aguardando_pagamento"
  | "abandonado"
  | "recusado"
  | "nao_pago"
  | "reembolsado"
  | "chargeback"
  | "outro";

export const STATUS_INSCRICAO: Record<StatusInscricao, { rotulo: string; finalizou: boolean | null; cor: string }> = {
  pago: { rotulo: "Inscrição paga", finalizou: true, cor: "#0f9d8f" },
  aguardando_pagamento: { rotulo: "Aguardando pagamento (Pix/boleto)", finalizou: false, cor: "#b45309" },
  abandonado: { rotulo: "Abandonou o checkout", finalizou: false, cor: "#64748b" },
  recusado: { rotulo: "Pagamento recusado", finalizou: false, cor: "#c2410c" },
  nao_pago: { rotulo: "Não pagou (Pix/boleto venceu)", finalizou: false, cor: "#be123c" },
  reembolsado: { rotulo: "Reembolsado", finalizou: null, cor: "#6b21a8" },
  chargeback: { rotulo: "Chargeback", finalizou: null, cor: "#7f1d1d" },
  outro: { rotulo: "Outro", finalizou: null, cor: "#94a3b8" },
};

/** Cursos da Turma 01 na Voomp: id do produto → código da matrícula e nome curto. */
export const CURSOS_VOOMP: Record<string, { codigo: string; nome: string }> = {
  "17779": { codigo: "MBA", nome: "MBA Estratégia de IA e Transformação Empresarial" },
  "17781": { codigo: "DDV", nome: "Do Dado ao Valor (extensão)" },
  "17873": { codigo: "FIA", nome: "Fluente em IA completo (curso livre)" },
};

export function cursoVoomp(productId: string | null | undefined, nomeVoomp?: string | null) {
  const id = String(productId ?? "").trim();
  return CURSOS_VOOMP[id] ?? { codigo: id ? `P${id}` : "PRD", nome: nomeVoomp?.trim() || (id ? `Produto ${id}` : "Produto sem id") };
}

/** Matrícula legível e estável por curso: NK-MBA-0001, NK-DDV-0001, NK-FIA-0001. */
export function formatarMatricula(codigoCurso: string, sequencia: number) {
  return `NK-${codigoCurso}-${String(sequencia).padStart(4, "0")}`;
}
