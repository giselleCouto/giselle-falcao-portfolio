// Ferramenta 1 — Diagnóstico de Prontidão (§5). Uma pergunta por tela, a
// opção tocada avança sozinha (350 ms), progresso salvo para retomar depois.

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Briefcase, MessageCircle, RotateCcw, User } from "lucide-react";
import {
  ACAO_7_DIAS,
  CAUSA_LABEL,
  E8A_OPCOES,
  E8B_OPCOES,
  EIXOS_PESSOAL,
  EMES,
  EMPRESA_DESEMPATE,
  FRASE_M_TRAVANDO,
  NIVEIS_EMPRESA,
  NOTA_12_MESES,
  PERFIS_PESSOAL,
  PERGUNTA_E8,
  PERGUNTAS_EMPRESA,
  PERGUNTAS_PESSOAL,
  PESSOAL_DESEMPATE,
  TEMPO_LABEL,
  VEREDITO_ENGAVETADO,
  msgDiagEmpresa,
  msgDiagPessoal,
  type EixoPessoal,
  type EmeKey,
} from "@/lib/kitData";
import {
  DIAG_VAZIO,
  cicloAtual,
  getSrc,
  loadDiag,
  loadPlan,
  saveDiag,
  type DiagState,
} from "@/lib/kitStore";
import { enviarParaGiselle, kitEvent } from "@/lib/kitSend";
import { KitCreditos, KitProgress, btnPrimario, btnSecundario, opcaoCard } from "./KitShell";
import { KitBarras, KitRadar } from "./KitCharts";

function faixa<T extends { faixa: [number, number] }>(lista: T[], total: number): T {
  return lista.find((x) => total >= x.faixa[0] && total <= x.faixa[1]) ?? lista[0]!;
}

const CORES_FAIXA = ["#FF6B6B", "#7A10D6", "#C9F31D"] as const;

function corDaFaixa<T extends { faixa: [number, number] }>(lista: T[], item: T): string {
  return CORES_FAIXA[lista.indexOf(item)] ?? CORES_FAIXA[1];
}

// ── telas ────────────────────────────────────────────────────────────────────

type Tela =
  | { tipo: "pergunta"; id: string; pergunta: string; opcoes: string[] }
  | { tipo: "e8" }
  | { tipo: "e8a" }
  | { tipo: "e8b" };

function telasDo(state: DiagState): Tela[] {
  if (state.mode === "pessoal") {
    return PERGUNTAS_PESSOAL.map((p) => ({
      tipo: "pergunta" as const,
      id: p.id,
      pergunta: p.pergunta,
      opcoes: [...p.opcoes],
    }));
  }
  const base: Tela[] = PERGUNTAS_EMPRESA.map((p) => ({
    tipo: "pergunta" as const,
    id: p.id,
    pergunta: p.pergunta,
    opcoes: [...p.opcoes],
  }));
  base.push({ tipo: "e8" });
  if (state.answers["e8"] === 1) base.push({ tipo: "e8a" }, { tipo: "e8b" });
  return base;
}

export default function KitDiagnostico() {
  const [state, setState] = useState<DiagState>(() => loadDiag());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [tocada, setTocada] = useState<string | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const persistir = (next: DiagState) => {
    setState(next);
    saveDiag(next);
  };

  const reiniciar = () => {
    if (timer.current) clearTimeout(timer.current);
    setTocada(null);
    persistir({ ...DIAG_VAZIO, answers: {} });
  };

  const telas = telasDo(state);
  const fim = Boolean(state.finishedAt);

  // A opção tocada acende e a tela avança sozinha após 350 ms (§2).
  const responder = (patch: Partial<DiagState>, marca: string) => {
    if (timer.current) return; // ignora toque duplo durante a transição
    setTocada(marca);
    const comResposta: DiagState = { ...state, ...patch, answers: { ...state.answers, ...(patch.answers ?? {}) } };
    timer.current = setTimeout(() => {
      timer.current = null;
      setTocada(null);
      const proximas = telasDo(comResposta);
      if (comResposta.step < proximas.length - 1) {
        persistir({ ...comResposta, step: comResposta.step + 1 });
      } else {
        const done: DiagState = { ...comResposta, finishedAt: new Date().toISOString() };
        persistir(done);
        anunciarFim(done);
      }
    }, 350);
  };

  const voltar = () => {
    if (timer.current) return;
    if (state.step > 0) persistir({ ...state, step: state.step - 1 });
    else persistir({ ...state, mode: null });
  };

  // ── Tela de modo (§5.1) ────────────────────────────────────────────────────
  if (!state.mode) {
    return (
      <div>
        <h1 className="font-baloo text-[28px] font-bold leading-tight text-[#F4F4F5]">
          Você quer fazer isso acontecer…
        </h1>
        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={() => {
              kitEvent("diag_start", "pessoal");
              persistir({ ...DIAG_VAZIO, mode: "pessoal", answers: {} });
            }}
            className="flex w-full items-center gap-4 rounded-2xl border border-[#262A36] bg-[#0F1117] p-5 text-left transition hover:border-[#C9F31D]/70"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#C9F31D]/15 text-[#C9F31D]">
              <User className="size-6" />
            </span>
            <span>
              <span className="block font-baloo text-lg font-bold text-[#F4F4F5]">Para mim</span>
              <span className="mt-0.5 block text-sm leading-6 text-[#9CA3AF]">
                quero aprender a formular, medir e orientar sistemas
              </span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              kitEvent("diag_start", "empresa");
              persistir({ ...DIAG_VAZIO, mode: "empresa", answers: {} });
            }}
            className="flex w-full items-center gap-4 rounded-2xl border border-[#262A36] bg-[#0F1117] p-5 text-left transition hover:border-[#7A10D6]"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#7A10D6]/20 text-[#c9a2ef]">
              <Briefcase className="size-6" />
            </span>
            <span>
              <span className="block font-baloo text-lg font-bold text-[#F4F4F5]">
                Para minha empresa ou meu time
              </span>
              <span className="mt-0.5 block text-sm leading-6 text-[#9CA3AF]">
                quero tirar um projeto de dados/IA do piloto e colocar em operação
              </span>
            </span>
          </button>
        </div>
      </div>
    );
  }

  // ── Resultado ──────────────────────────────────────────────────────────────
  if (fim) {
    return state.mode === "pessoal" ? <ResultadoPessoal state={state} onRefazer={reiniciar} /> : <ResultadoEmpresa state={state} onRefazer={reiniciar} />;
  }

  // ── Perguntas ──────────────────────────────────────────────────────────────
  const tela = telas[state.step];
  if (!tela) return null;

  const rotulo =
    tela.tipo === "e8a" || tela.tipo === "e8b"
      ? "Projeto engavetado"
      : state.mode === "pessoal"
        ? "Sua prontidão"
        : "Prontidão da sua empresa";

  let corpo: { pergunta: string; opcoes: { label: string; marca: string; onPick: () => void }[] };
  if (tela.tipo === "pergunta") {
    corpo = {
      pergunta: tela.pergunta,
      opcoes: tela.opcoes.map((label, pontos) => ({
        label,
        marca: `${tela.id}:${pontos}`,
        onPick: () => responder({ answers: { [tela.id]: pontos } }, `${tela.id}:${pontos}`),
      })),
    };
  } else if (tela.tipo === "e8") {
    corpo = {
      pergunta: PERGUNTA_E8,
      opcoes: [
        { label: "Não", marca: "e8:0", onPick: () => responder({ answers: { e8: 0 } }, "e8:0") },
        { label: "Sim", marca: "e8:1", onPick: () => responder({ answers: { e8: 1 } }, "e8:1") },
      ],
    };
  } else if (tela.tipo === "e8a") {
    corpo = {
      pergunta: "Ela parou por quê?",
      opcoes: E8A_OPCOES.map((o) => ({
        label: o.label,
        marca: `e8a:${o.causa}`,
        onPick: () => responder({ causa: o.causa }, `e8a:${o.causa}`),
      })),
    };
  } else {
    corpo = {
      pergunta: "Há quanto tempo está parada?",
      opcoes: E8B_OPCOES.map((o) => ({
        label: o.label,
        marca: `e8b:${o.tempo}`,
        onPick: () => responder({ tempo: o.tempo }, `e8b:${o.tempo}`),
      })),
    };
  }

  return (
    <div>
      <KitProgress atual={state.step + 1} total={telas.length} rotulo={rotulo} />
      <motion.div
        key={`${state.mode}-${state.step}`}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h2 className="mt-6 text-[22px] font-bold leading-snug text-[#F4F4F5]">{corpo.pergunta}</h2>
        <div className="mt-5 space-y-2.5">
          {corpo.opcoes.map((o) => {
            const acesa = tocada === o.marca;
            return (
              <button
                key={o.marca}
                type="button"
                onClick={o.onPick}
                className={`${opcaoCard} ${
                  acesa
                    ? "border-[#C9F31D] shadow-[0_0_18px_rgba(201,243,29,0.25)]"
                    : "border-[#262A36] hover:border-[#C9F31D]/50"
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </motion.div>
      <div className="mt-6">
        <button
          type="button"
          onClick={voltar}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#9CA3AF] transition hover:text-[#C9F31D]"
        >
          <ArrowLeft className="size-4" />
          Voltar
        </button>
      </div>
    </div>
  );
}

function anunciarFim(state: DiagState) {
  if (state.mode === "pessoal") {
    const { total, perfil, fraco } = calcularPessoal(state);
    kitEvent("diag_done", `pessoal:${perfil.nome}:${fraco ?? "nenhuma"}:${total}`);
  } else {
    const { score, nivel, fraco } = calcularEmpresa(state);
    kitEvent(
      "diag_done",
      `empresa:${nivel.nome}:${fraco ?? "nenhum"}:${score}${state.answers["e8"] === 1 ? ":engavetado" : ""}`
    );
  }
}

// ── cálculo (§5.2) ───────────────────────────────────────────────────────────

function calcularPessoal(state: DiagState) {
  const soma = (ids: string[]) => ids.reduce((s, id) => s + (state.answers[id] ?? 0), 0);
  const porEixo: Record<EixoPessoal, { valor: number; max: number }> = {
    formular: { valor: soma(["p1", "p2"]), max: 4 },
    medir: { valor: soma(["p3", "p4"]), max: 4 },
    orquestrar: { valor: soma(["p5"]), max: 2 },
    avaliar: { valor: soma(["p6"]), max: 2 },
    governar: { valor: soma(["p7"]), max: 2 },
    mostrar: { valor: soma(["p8"]), max: 2 },
  };
  const total = soma(["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"]);
  const perfil = faixa(PERFIS_PESSOAL, total);
  // peça fraca: menor pontuação normalizada; empate segue a ordem da spec
  let fraco: EixoPessoal | null = null;
  let menor = 1.01;
  for (const key of PESSOAL_DESEMPATE) {
    const { valor, max } = porEixo[key];
    const norm = valor / max;
    if (norm < menor) {
      menor = norm;
      fraco = key;
    }
  }
  if (menor >= 1) fraco = null; // radar fechado — nada travando
  return { porEixo, total, perfil, fraco };
}

function calcularEmpresa(state: DiagState) {
  const soma = (ids: string[]) => ids.reduce((s, id) => s + (state.answers[id] ?? 0), 0);
  const porM: Record<EmeKey, { valor: number; max: number }> = {
    m1: { valor: soma(["e1", "e2"]), max: 4 },
    m2: { valor: soma(["e3", "e4"]), max: 4 },
    m3: { valor: soma(["e5", "e6"]), max: 4 },
    m4: { valor: soma(["e7"]), max: 2 },
  };
  const score = soma(["e1", "e2", "e3", "e4", "e5", "e6", "e7"]);
  const nivel = faixa(NIVEIS_EMPRESA, score);
  let fraco: EmeKey | null = null;
  let menor = 1.01;
  for (const key of EMPRESA_DESEMPATE) {
    const { valor, max } = porM[key];
    const norm = valor / max;
    if (norm < menor) {
      menor = norm;
      fraco = key;
    }
  }
  if (menor >= 1) fraco = null;
  return { porM, score, nivel, fraco };
}

// ── resultado pessoal ────────────────────────────────────────────────────────

function ResultadoPessoal({ state, onRefazer }: { state: DiagState; onRefazer: () => void }) {
  const { porEixo, total, perfil, fraco } = calcularPessoal(state);
  const cor = corDaFaixa(PERFIS_PESSOAL, perfil);
  const nomeFraco = fraco ? EIXOS_PESSOAL.find((e) => e.key === fraco)!.nome : null;
  const acao = fraco
    ? ACAO_7_DIAS[fraco]
    : "Seu radar está fechado. A ação agora é escala: conduza uma pessoa do seu time pelo mesmo ciclo que você já domina.";
  const tarefa = (() => {
    const c = cicloAtual(loadPlan());
    return c?.w1.tarefa?.trim() || undefined;
  })();
  const msg = msgDiagPessoal({
    src: getSrc(),
    perfil: perfil.nome,
    total,
    pecaFraca: nomeFraco ?? "nenhuma — radar fechado",
    tarefa,
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} aria-live="polite" className="space-y-4">
      <div className="overflow-hidden rounded-2xl bg-[#0F1117] shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <div className="h-2 w-full" style={{ background: cor }} />
        <div className="p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9CA3AF]">Seu perfil</p>
          <h2 className="mt-2 font-baloo text-[30px] font-bold leading-tight text-[#F4F4F5]">{perfil.nome}</h2>
          <p className="mt-1 text-sm font-semibold text-[#9CA3AF]">{total}/16</p>
          <p className="mt-4 text-sm leading-7 text-[#F4F4F5]/85">{perfil.texto}</p>
          <div className="mt-5">
            <KitRadar
              eixos={EIXOS_PESSOAL.map((e) => ({
                key: e.key,
                nome: e.nome,
                valor: porEixo[e.key].valor,
                max: porEixo[e.key].max,
              }))}
              fraco={fraco ?? ""}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#262A36] bg-[#171A23] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9F31D]">Seus próximos 7 dias</p>
        <p className="mt-2 text-sm font-medium leading-7 text-[#F4F4F5]">{acao}</p>
      </div>

      <button type="button" onClick={() => void enviarParaGiselle(msg, "diagnostico")} className={btnPrimario}>
        <MessageCircle className="size-4" />
        Me manda seu perfil — eu te digo por onde eu começaria
      </button>
      <Link href="/kit/roteiro" className={btnSecundario}>
        Ir para o Roteiro dos 30 Dias
      </Link>
      <button
        type="button"
        onClick={onRefazer}
        className="mx-auto flex min-h-11 items-center gap-1.5 text-xs font-semibold text-[#9CA3AF]/70 transition hover:text-[#C9F31D]"
      >
        <RotateCcw className="size-3.5" />
        Refazer
      </button>
      <KitCreditos />
    </motion.div>
  );
}

// ── resultado empresa ────────────────────────────────────────────────────────

function ResultadoEmpresa({ state, onRefazer }: { state: DiagState; onRefazer: () => void }) {
  const { porM, score, nivel, fraco } = calcularEmpresa(state);
  const cor = corDaFaixa(NIVEIS_EMPRESA, nivel);
  const engavetado = state.answers["e8"] === 1;
  const nomeFraco = fraco ? EMES.find((m) => m.key === fraco)!.nome : null;
  const msg = msgDiagEmpresa({
    src: getSrc(),
    nivel: nivel.nome,
    score,
    mTravando: nomeFraco ?? "nenhum — os quatro M fechados",
    engavetado,
    causa: state.causa ? CAUSA_LABEL[state.causa] : undefined,
    tempo: state.tempo ? TEMPO_LABEL[state.tempo] : undefined,
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} aria-live="polite" className="space-y-4">
      <div className="overflow-hidden rounded-2xl bg-[#0F1117] shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <div className="h-2 w-full" style={{ background: cor }} />
        <div className="p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9CA3AF]">Prontidão da sua empresa</p>
          <h2 className="mt-2 font-baloo text-[30px] font-bold leading-tight text-[#F4F4F5]">{nivel.nome}</h2>
          <p className="mt-1 text-sm font-semibold text-[#9CA3AF]">{score}/14</p>
          <p className="mt-4 text-sm leading-7 text-[#F4F4F5]/85">{nivel.texto}</p>
          <div className="mt-5">
            <KitBarras
              barras={EMES.map((m) => ({
                key: m.key,
                nome: m.nome,
                valor: porM[m.key].valor,
                max: porM[m.key].max,
              }))}
              fraco={fraco ?? ""}
            />
          </div>
        </div>
      </div>

      {fraco ? (
        <div className="rounded-2xl border border-[#FF6B6B]/60 bg-[#171A23] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B6B]">
            O M que está travando · {nomeFraco}
          </p>
          <p className="mt-2 text-sm font-medium leading-7 text-[#F4F4F5]">{FRASE_M_TRAVANDO[fraco]}</p>
        </div>
      ) : null}

      {engavetado && state.causa ? (
        <div className="rounded-2xl border border-[#C9F31D]/40 bg-[#171A23] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9F31D]">Projeto engavetado</p>
          <p className="mt-2 text-sm font-medium leading-7 text-[#F4F4F5]">{VEREDITO_ENGAVETADO[state.causa]}</p>
          {state.tempo === "mais-12" ? (
            <p className="mt-2 text-sm leading-7 text-[#9CA3AF]">{NOTA_12_MESES}</p>
          ) : null}
        </div>
      ) : null}

      <button type="button" onClick={() => void enviarParaGiselle(msg, "diagnostico")} className={btnPrimario}>
        <MessageCircle className="size-4" />
        <span className="text-center text-[13px] leading-tight sm:text-[15px]">
          Me manda o diagnóstico — eu leio e te devolvo, em 15 minutos de conversa, o que eu faria primeiro
        </span>
      </button>
      <Link href="/kit/checklist" className={btnSecundario}>
        Levar o Checklist das 5 Peças para a próxima reunião
      </Link>
      <button
        type="button"
        onClick={onRefazer}
        className="mx-auto flex min-h-11 items-center gap-1.5 text-xs font-semibold text-[#9CA3AF]/70 transition hover:text-[#C9F31D]"
      >
        <RotateCcw className="size-3.5" />
        Refazer
      </button>
      <KitCreditos />
    </motion.div>
  );
}
