// Persistência do kit em localStorage (§9 da spec) — prefixo kit.v1.,
// tudo best-effort: navegador em modo estrito nunca quebra a experiência.

import type { CausaEngavetado, KitModo, TempoEngavetado, Unidade } from "./kitData";

const K = {
  meta: "kit.v1.meta",
  diag: "kit.v1.diag",
  check: "kit.v1.check",
  plan: "kit.v1.plan",
} as const;

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* sem storage — a sessão segue em memória */
  }
}

// ── meta (src de origem) ─────────────────────────────────────────────────────

export type KitMeta = { src?: string; firstSeen: string };

export function rememberSrc(srcParam?: string) {
  const atual = read<KitMeta>(K.meta);
  if (atual && !srcParam) return;
  write(K.meta, {
    src: srcParam ?? atual?.src,
    firstSeen: atual?.firstSeen ?? new Date().toISOString(),
  } satisfies KitMeta);
}

export function getSrc(): string | undefined {
  return read<KitMeta>(K.meta)?.src;
}

// ── diagnóstico ──────────────────────────────────────────────────────────────

export type DiagState = {
  mode: KitModo | null;
  /** respostas por id de pergunta (0|1|2); e8 usa 0=Não, 1=Sim */
  answers: Record<string, number>;
  causa?: CausaEngavetado;
  tempo?: TempoEngavetado;
  /** índice da tela atual (para retomar de onde parou) */
  step: number;
  finishedAt?: string;
};

export const DIAG_VAZIO: DiagState = { mode: null, answers: {}, step: 0 };

export function loadDiag(): DiagState {
  return read<DiagState>(K.diag) ?? { ...DIAG_VAZIO };
}

export function saveDiag(state: DiagState) {
  write(K.diag, state);
}

// ── checklist ────────────────────────────────────────────────────────────────

export type CheckRun = {
  nome?: string;
  /** 10 respostas na ordem das peças (true = sim) */
  answers: (boolean | null)[];
  sins: number;
  veredito: string;
  at: string;
};

export type CheckState = {
  /** rodada em andamento (null = nenhuma) */
  atual: { nome?: string; answers: (boolean | null)[]; card: number } | null;
  history: CheckRun[];
};

export function loadCheck(): CheckState {
  return read<CheckState>(K.check) ?? { atual: null, history: [] };
}

export function saveCheck(state: CheckState) {
  // Histórico: só os últimos 5 vereditos.
  write(K.check, { ...state, history: state.history.slice(-5) });
}

// ── roteiro ──────────────────────────────────────────────────────────────────

export type PlanWeek1 = { tarefa?: string; sistemas?: number; decide?: string; done?: boolean };
export type PlanWeek2 = { numeroAntes?: string; unidade?: Unidade; funcionou?: string; done?: boolean };
export type PlanWeek3 = { checks?: Record<string, boolean>; quebrou?: string; done?: boolean };
export type PlanWeek4 = { numeroAgora?: string; mostreiPara?: string; proximoCiclo?: string; done?: boolean };

export type PlanCycle = {
  w1: PlanWeek1;
  w2: PlanWeek2;
  w3: PlanWeek3;
  w4: PlanWeek4;
  startedAt: string;
  finishedAt: string | null;
};

export type PlanState = { cycles: PlanCycle[] };

export function novoCiclo(): PlanCycle {
  return { w1: {}, w2: {}, w3: {}, w4: {}, startedAt: new Date().toISOString(), finishedAt: null };
}

export function loadPlan(): PlanState {
  return read<PlanState>(K.plan) ?? { cycles: [] };
}

export function savePlan(state: PlanState) {
  write(K.plan, state);
}

export function cicloAtual(state: PlanState): PlanCycle | null {
  const ultimo = state.cycles[state.cycles.length - 1];
  return ultimo && !ultimo.finishedAt ? ultimo : null;
}

/** Semana em que a pessoa parou (1–4) no ciclo aberto. */
export function semanaAtual(c: PlanCycle): number {
  if (!c.w1.done) return 1;
  if (!c.w2.done) return 2;
  if (!c.w3.done) return 3;
  return 4;
}

// ── limpeza ("Apagar meus dados deste aparelho") ─────────────────────────────

export function apagarTudo() {
  try {
    for (const key of Object.values(K)) localStorage.removeItem(key);
  } catch {
    /* nada a apagar */
  }
}
