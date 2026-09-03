import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, MessageCircle, RotateCcw, User } from "lucide-react";
import {
  EIXOS_PESSOAL,
  EMES,
  NIVEIS_EMPRESA,
  PERFIS_PESSOAL,
  PERGUNTAS_EMPRESA,
  PERGUNTAS_ENGAVETADO,
  PERGUNTAS_PESSOAL,
  waLink,
  type LabModo,
  type LabPergunta,
} from "@/lib/labData";

const btnOpcao =
  "block w-full rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-left text-sm font-medium leading-6 text-slate-700 transition hover:border-[#8b5cf6] hover:bg-violet-50/60";

function faixa<T extends { faixa: [number, number] }>(lista: T[], total: number): T {
  return lista.find((x) => total >= x.faixa[0] && total <= x.faixa[1]) ?? lista[0]!;
}

export default function LabDiagnostico() {
  const [modo, setModo] = useState<LabModo | null>(null);
  const [atual, setAtual] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, number>>({});
  const [ramificando, setRamificando] = useState(false);
  const [fim, setFim] = useState(false);

  const base = modo === "pessoal" ? PERGUNTAS_PESSOAL : PERGUNTAS_EMPRESA;
  const perguntas: LabPergunta[] = ramificando ? PERGUNTAS_ENGAVETADO : base;
  const pergunta = perguntas[atual];
  const totalTelas = base.length + (modo === "empresa" && respostas["e8-sim"] ? PERGUNTAS_ENGAVETADO.length : 0);
  const telaAtual = ramificando ? base.length + atual : atual;

  const reiniciar = () => {
    setModo(null);
    setAtual(0);
    setRespostas({});
    setRamificando(false);
    setFim(false);
  };

  const responder = (pontos: number, labelIdx: number) => {
    if (!pergunta) return;
    const next = { ...respostas, [pergunta.id]: pontos };
    if (pergunta.id === "e8") next["e8-sim"] = labelIdx === 0 ? 1 : 0;
    setRespostas(next);

    if (atual < perguntas.length - 1) {
      setAtual(atual + 1);
      return;
    }
    // fim do bloco atual
    if (!ramificando && modo === "empresa" && next["e8-sim"]) {
      setRamificando(true);
      setAtual(0);
      return;
    }
    setFim(true);
  };

  const voltar = () => {
    if (atual > 0) {
      setAtual(atual - 1);
    } else if (ramificando) {
      setRamificando(false);
      setAtual(base.length - 1);
    }
  };

  // ── Tela 0: escolha do modo ────────────────────────────────────────────────
  if (!modo) {
    return (
      <div className="space-y-3">
        <p className="text-center text-sm font-semibold text-slate-500">
          Uma pergunta antes de tudo. Escolha o seu lado:
        </p>
        <button
          type="button"
          onClick={() => setModo("pessoal")}
          className="flex w-full items-center gap-4 rounded-3xl border-2 border-teal-200 bg-white p-6 text-left transition hover:border-teal-400 hover:bg-teal-50/50"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
            <User className="size-6" />
          </span>
          <span>
            <span className="block font-baloo text-lg font-bold text-[#1a1333]">
              Quero fazer isso acontecer para mim
            </span>
            <span className="mt-0.5 block text-xs text-slate-500">Trajetória, competências e primeiro caso</span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => setModo("empresa")}
          className="flex w-full items-center gap-4 rounded-3xl border-2 border-violet-200 bg-white p-6 text-left transition hover:border-[#8b5cf6] hover:bg-violet-50/50"
        >
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-[#6b21a8]">
            <Briefcase className="size-6" />
          </span>
          <span>
            <span className="block font-baloo text-lg font-bold text-[#1a1333]">
              Quero fazer isso acontecer na minha empresa ou no meu time
            </span>
            <span className="mt-0.5 block text-xs text-slate-500">Projetos, produção e valor medido</span>
          </span>
        </button>
      </div>
    );
  }

  // ── Resultado ─────────────────────────────────────────────────────────────
  if (fim) {
    if (modo === "pessoal") {
      const porEixo = EIXOS_PESSOAL.map((e) => ({
        ...e,
        pontos: PERGUNTAS_PESSOAL.filter((p) => p.grupo === e.key).reduce(
          (s, p) => s + (respostas[p.id] ?? 0),
          0
        ),
      }));
      const total = porEixo.reduce((s, e) => s + e.pontos, 0);
      const perfil = faixa(PERFIS_PESSOAL, total);
      const msg = `Oi, Giselle! Fiz o Diagnóstico de Prontidão no Laboratório da Decisão. Meu perfil: ${perfil.nome} (${total}/16 — ${porEixo.map((e) => `${e.nome} ${e.pontos}/${e.max}`).join(", ")}). Me diz por onde você começaria?`;

      return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="rounded-3xl border-2 border-teal-200 bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">Seu perfil</p>
            <h3 className="mt-2 font-baloo text-3xl font-bold text-[#1a1333]">{perfil.nome}</h3>
            <p className="mt-1 text-sm font-semibold text-slate-400">{total} de 16 pontos</p>
            <div className="mt-5 space-y-2.5">
              {porEixo.map((e) => (
                <div key={e.key}>
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>{e.nome}</span>
                    <span>
                      {e.pontos}/{e.max}
                    </span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(e.pontos / e.max) * 100}%` }}
                      transition={{ duration: 0.7, delay: 0.15 }}
                      className="h-full rounded-full bg-[linear-gradient(90deg,#14b8a6,#8b5cf6)]"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-600">{perfil.resumo}</p>
            <p className="mt-3 text-sm font-medium leading-7 text-teal-700">{perfil.boaNoticia}</p>
            <div className="mt-4 rounded-2xl bg-[#f7f8fc] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b21a8]">Sua ação de 7 dias</p>
              <p className="mt-1.5 text-sm font-medium leading-6 text-[#1a1333]">{perfil.acao7dias}</p>
            </div>
          </div>
          <a
            href={waLink(msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1a1333] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#6b21a8]"
          >
            <MessageCircle className="size-4" />
            Me manda seu perfil — eu te digo por onde eu começaria
          </a>
          <button type="button" onClick={reiniciar} className="mx-auto flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-[#6b21a8]">
            <RotateCcw className="size-3.5" />
            Refazer o diagnóstico
          </button>
        </motion.div>
      );
    }

    // empresa
    const porM = EMES.map((m) => {
      const doM = PERGUNTAS_EMPRESA.filter((p) => p.grupo === m.key);
      const max = doM.length * 2;
      const pontos = doM.reduce((s, p) => s + (respostas[p.id] ?? 0), 0);
      return { ...m, pontos, max };
    });
    const total = porM.reduce((s, m) => s + m.pontos, 0);
    const nivel = faixa(NIVEIS_EMPRESA, total);
    const maisFraco = [...porM].sort((a, b) => a.pontos / a.max - b.pontos / b.max)[0]!;
    // Com pontuação perfeita não existe M travando — não contradizer o nível.
    const mFraco = maisFraco.pontos < maisFraco.max ? maisFraco : null;
    const temEngavetado = !!respostas["e8-sim"];
    let vereditoEngavetado = "";
    if (temEngavetado) {
      const semNumero = (respostas["g1"] ?? 0) <= 1;
      const semOperacao = (respostas["g2"] ?? 0) <= 1;
      if (semNumero && semOperacao)
        vereditoEngavetado =
          "Esse projeto provavelmente morreu no M1 — e o M3 nunca chegou a acontecer. E isso costuma ser recuperável.";
      else if (semNumero)
        vereditoEngavetado = "Esse projeto provavelmente morreu no M1 (sem número de sucesso). E isso costuma ser recuperável.";
      else if (semOperacao)
        vereditoEngavetado = "Esse projeto provavelmente morreu no M3 (nunca chegou à mão de quem opera). E isso costuma ser recuperável.";
      else
        vereditoEngavetado = "Esse projeto chegou perto — o que falta é específico e nomeável. Recuperável.";
    }
    const vereditoMsg = vereditoEngavetado
      ? vereditoEngavetado.charAt(0).toLowerCase() + vereditoEngavetado.slice(1)
      : "";
    const msg = `Oi, Giselle! Fiz o diagnóstico da empresa no Laboratório da Decisão. Nível: ${nivel.nome} (${total}/14). ${mFraco ? `O que mais trava: ${mFraco.nome}.` : "Nenhum M travando."}${temEngavetado ? " Temos solução pronta e parada — " + vereditoMsg : ""} Topo os 15 minutos de conversa sobre o diagnóstico.`;

    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
        <div className="rounded-3xl border-2 border-violet-200 bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6b21a8]">Prontidão do seu projeto</p>
          <h3 className="mt-2 font-baloo text-3xl font-bold text-[#1a1333]">{nivel.nome}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-400">{total} de 14 pontos</p>
          <div className="mt-5 space-y-2.5">
            {porM.map((m) => {
              const fraco = m.key === mFraco?.key;
              return (
                <div key={m.key}>
                  <div className={`flex justify-between text-xs font-bold ${fraco ? "text-rose-600" : "text-slate-500"}`}>
                    <span>
                      {m.nome}
                      {fraco ? " · é aqui que trava" : ""}
                    </span>
                    <span>
                      {m.pontos}/{m.max}
                    </span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(m.pontos / m.max) * 100}%` }}
                      transition={{ duration: 0.7, delay: 0.15 }}
                      className={`h-full rounded-full ${fraco ? "bg-rose-500" : "bg-[linear-gradient(90deg,#6b21a8,#8b5cf6)]"}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-600">{nivel.resumo}</p>
          <p className="mt-3 text-sm font-medium leading-7 text-teal-700">{nivel.boaNoticia}</p>
          {temEngavetado ? (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Sobre o projeto parado</p>
              <p className="mt-1.5 text-sm font-medium leading-6 text-amber-900">{vereditoEngavetado}</p>
            </div>
          ) : null}
        </div>
        <a
          href={waLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1a1333] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#6b21a8]"
        >
          <MessageCircle className="size-4" />
          Me manda o diagnóstico — devolvo em 15 min de conversa o que eu faria primeiro
        </a>
        <button type="button" onClick={reiniciar} className="mx-auto flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-[#6b21a8]">
          <RotateCcw className="size-3.5" />
          Refazer o diagnóstico
        </button>
      </motion.div>
    );
  }

  // ── Perguntas (uma por tela) ──────────────────────────────────────────────
  if (!pergunta) return null;
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-bold text-slate-400">
        <span>
          {telaAtual + 1} de {totalTelas}
        </span>
        <span className="uppercase tracking-[0.18em]">
          {ramificando ? "Sobre o projeto parado" : modo === "pessoal" ? "Sua prontidão" : "Prontidão do projeto"}
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#14b8a6,#8b5cf6)] transition-all duration-300"
          style={{
            // A e8 pode abrir mais 2 telas: não fechar a barra em 100% antes dela.
            width: `${
              pergunta.id === "e8" && respostas["e8"] === undefined
                ? 92
                : ((telaAtual + 1) / totalTelas) * 100
            }%`,
          }}
        />
      </div>
      <motion.div
        key={pergunta.id}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3
          className={`mt-6 text-lg font-bold leading-snug sm:text-xl ${
            pergunta.destaque ? "text-[#6b21a8]" : "text-[#1a1333]"
          }`}
        >
          {pergunta.pergunta}
        </h3>
        <div className="mt-5 space-y-2.5">
          {pergunta.opcoes.map((o, idx) => {
            const escolhida = respostas[pergunta.id] === o.pontos && respostas[pergunta.id] !== undefined;
            return (
              <button
                key={o.label}
                type="button"
                onClick={() => responder(o.pontos, idx)}
                className={`${btnOpcao} ${escolhida ? "!border-[#8b5cf6] !bg-violet-50 !text-[#6b21a8]" : ""}`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </motion.div>
      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          disabled={atual === 0 && !ramificando}
          onClick={voltar}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition hover:text-[#6b21a8] disabled:opacity-30"
        >
          <ArrowLeft className="size-4" />
          Anterior
        </button>
        {respostas[pergunta.id] !== undefined ? (
          <button
            type="button"
            onClick={() => {
              const idx = pergunta.opcoes.findIndex((o) => o.pontos === respostas[pergunta.id]);
              responder(respostas[pergunta.id] as 0 | 1 | 2, idx);
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6b21a8] transition hover:text-[#8b5cf6]"
          >
            Próxima
            <ArrowLeft className="size-4 rotate-180" />
          </button>
        ) : (
          <button type="button" onClick={reiniciar} className="text-xs font-semibold text-slate-300 hover:text-slate-500">
            Recomeçar
          </button>
        )}
      </div>
    </div>
  );
}
