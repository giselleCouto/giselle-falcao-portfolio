// Ferramenta 2 — Checklist das 5 Peças (§6). Um cartão por tela, duas
// perguntas de sim/não por cartão; veredito com cartão compartilhável em
// canvas 1080×1080 e histórico dos últimos 5 no aparelho.

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, MessageCircle, RotateCcw, Share2 } from "lucide-react";
import { toast } from "sonner";
import {
  GARTNER_NOTA,
  PECAS_KIT,
  VEREDITOS_KIT,
  msgChecklist,
  textoVeredito,
} from "@/lib/kitData";
import { getSrc, loadCheck, saveCheck, type CheckState } from "@/lib/kitStore";
import { compartilhar, enviarParaGiselle, kitEvent } from "@/lib/kitSend";
import { BadgeNumero, KitCreditos, KitProgress, btnPrimario, btnSecundario } from "./KitShell";

const TOTAL_PERGUNTAS = 10;

function contarSins(answers: (boolean | null)[]): number {
  return answers.filter((a) => a === true).length;
}

function pecasFaltando(answers: (boolean | null)[]): string[] {
  return PECAS_KIT.filter((p, i) => {
    const a = answers[i * 2];
    const b = answers[i * 2 + 1];
    return a === false && b === false;
  }).map((p) => p.nome);
}

function vereditoDe(sins: number): string {
  return (
    VEREDITOS_KIT.find((v) => sins >= v.faixa[0] && sins <= v.faixa[1])?.nome ?? VEREDITOS_KIT[0]!.nome
  );
}

export default function KitChecklist() {
  const [state, setState] = useState<CheckState>(() => loadCheck());
  const [fim, setFim] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Espelho síncrono do estado: dois toques rápidos (Sim de uma pergunta e
  // Sim da outra antes do re-render) não podem perder a primeira resposta.
  const stateRef = useRef(state);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const persistir = (next: CheckState) => {
    stateRef.current = next;
    setState(next);
    saveCheck(next);
  };

  const atual = state.atual;

  // "Avaliar outro" volta à tela inicial (dá para nomear o próximo).
  const comecar = () => {
    setFim(false);
    persistir({ ...state, atual: null });
  };

  const finalizar = (answers: (boolean | null)[], nome?: string) => {
    const sins = contarSins(answers);
    const veredito = vereditoDe(sins);
    kitEvent("check_done", `${veredito}:${sins}`);
    persistir({
      atual: { nome, answers, card: PECAS_KIT.length - 1 },
      history: [...state.history, { nome, answers, sins, veredito, at: new Date().toISOString() }],
    });
    setFim(true);
  };

  // ── Tela inicial ───────────────────────────────────────────────────────────
  if (!atual) {
    return (
      <div>
        <h1 className="font-baloo text-[28px] font-bold leading-tight text-[#F4F4F5]">
          É agente, automação ou chatbot com marketing?
        </h1>
        <p className="mt-3 text-base leading-7 text-[#9CA3AF]">
          Dez perguntas para fazer na próxima demo. Marque enquanto ouve.
        </p>
        <label className="mt-6 block">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9CA3AF]">
            Quem você vai avaliar? (opcional)
          </span>
          <input
            type="text"
            maxLength={60}
            placeholder="Fornecedor X"
            id="kit-check-nome"
            className="mt-2 h-12 w-full rounded-2xl border border-[#262A36] bg-[#171A23] px-4 text-[15px] text-[#F4F4F5] outline-none transition placeholder:text-[#9CA3AF]/50 focus:border-[#C9F31D]/70"
          />
        </label>
        <button
          type="button"
          onClick={() => {
            const nome = (document.getElementById("kit-check-nome") as HTMLInputElement | null)?.value?.trim();
            setFim(false);
            persistir({
              ...state,
              atual: { nome: nome || undefined, answers: Array(TOTAL_PERGUNTAS).fill(null), card: 0 },
            });
          }}
          className={`${btnPrimario} mt-6`}
        >
          Começar
        </button>
        {state.history.length > 0 ? (
          <div className="mt-8 rounded-2xl border border-[#262A36] bg-[#0F1117] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9CA3AF]">
              Seus últimos vereditos (só neste aparelho)
            </p>
            <ul className="mt-3 space-y-2">
              {[...state.history].reverse().map((h, i) => (
                <li key={`${h.at}-${i}`} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate text-[#F4F4F5]">{h.nome || "Sem nome"}</span>
                  <span className="shrink-0 text-[#9CA3AF]">
                    {h.veredito.replace(/\.$/, "")} · {h.sins}/10
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }

  // ── Veredito ───────────────────────────────────────────────────────────────
  if (fim || atual.answers.every((a) => a !== null)) {
    return <Veredito state={state} onOutro={comecar} />;
  }

  // ── Cartões (um por tela) ──────────────────────────────────────────────────
  const peca = PECAS_KIT[atual.card]!;
  const idxA = atual.card * 2;
  const idxB = idxA + 1;

  const marcar = (idx: number, valor: boolean) => {
    // Sempre a partir do espelho: o clique seguinte pode chegar antes do render.
    const cur = stateRef.current.atual;
    if (!cur) return;
    const answers = [...cur.answers];
    answers[idx] = valor;
    const next: CheckState = { ...stateRef.current, atual: { ...cur, answers } };
    persistir(next);
    // As duas perguntas do cartão respondidas → avança sozinho (350 ms).
    if (answers[idxA] !== null && answers[idxB] !== null && !timer.current) {
      timer.current = setTimeout(() => {
        timer.current = null;
        const agora = stateRef.current.atual;
        if (!agora) return;
        if (agora.card < PECAS_KIT.length - 1) {
          persistir({ ...stateRef.current, atual: { ...agora, card: agora.card + 1 } });
        } else {
          finalizar(agora.answers, agora.nome);
        }
      }, 350);
    }
  };

  const voltar = () => {
    if (timer.current) return;
    if (atual.card > 0) persistir({ ...state, atual: { ...atual, card: atual.card - 1 } });
    else persistir({ ...state, atual: null });
  };

  return (
    <div>
      <KitProgress atual={atual.card + 1} total={PECAS_KIT.length} rotulo="Checklist das 5 Peças" />
      <motion.div
        key={peca.n}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-6 rounded-2xl border border-[#262A36] bg-[#0F1117] p-5"
      >
        <div className="flex items-center gap-3">
          <BadgeNumero n={peca.n} />
          <h2 className="font-baloo text-xl font-bold text-[#F4F4F5]">{peca.nome}</h2>
        </div>
        <p className="mt-2 text-sm leading-6 text-[#9CA3AF]">{peca.definicao}</p>

        <div className="mt-5 space-y-5">
          {peca.perguntas.map((q, qi) => {
            const idx = atual.card * 2 + qi;
            const valor = atual.answers[idx];
            return (
              <div key={q.texto}>
                <p className="text-[17px] font-medium leading-6 text-[#F4F4F5]">{q.texto}</p>
                {q.hint ? <p className="mt-0.5 text-xs text-[#9CA3AF]">{q.hint}</p> : null}
                <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                  {([true, false] as const).map((v) => {
                    const ativo = valor === v;
                    return (
                      <button
                        key={String(v)}
                        type="button"
                        aria-pressed={ativo}
                        onClick={() => marcar(idx, v)}
                        className={`h-12 rounded-2xl border text-[15px] font-bold transition ${
                          ativo
                            ? v
                              ? "border-[#C9F31D] bg-[#C9F31D]/15 text-[#C9F31D]"
                              : "border-[#FF6B6B] bg-[#FF6B6B]/10 text-[#FF6B6B]"
                            : "border-[#262A36] bg-[#171A23] text-[#F4F4F5] hover:border-[#C9F31D]/40"
                        }`}
                      >
                        {v ? "Sim" : "Não"}
                      </button>
                    );
                  })}
                </div>
              </div>
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

// ── veredito + cartão compartilhável ─────────────────────────────────────────

function desenharCartao(canvas: HTMLCanvasElement, veredito: string, sins: number, answers: (boolean | null)[]) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const S = 1080;
  canvas.width = S;
  canvas.height = S;

  ctx.fillStyle = "#0F1117";
  ctx.fillRect(0, 0, S, S);

  ctx.fillStyle = "#C9F31D";
  ctx.fillRect(0, 0, S, 14);

  ctx.fillStyle = "#9CA3AF";
  ctx.font = "700 34px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("VEREDITO DA DEMO", S / 2, 130);

  // veredito com quebra de linha
  ctx.fillStyle = "#F4F4F5";
  ctx.font = "800 78px system-ui, -apple-system, sans-serif";
  const palavras = veredito.split(" ");
  const linhas: string[] = [];
  let linha = "";
  for (const p of palavras) {
    const teste = linha ? `${linha} ${p}` : p;
    if (ctx.measureText(teste).width > S - 160 && linha) {
      linhas.push(linha);
      linha = p;
    } else {
      linha = teste;
    }
  }
  if (linha) linhas.push(linha);
  linhas.forEach((l, i) => ctx.fillText(l, S / 2, 260 + i * 92));

  ctx.fillStyle = "#C9F31D";
  ctx.font = "800 64px system-ui, -apple-system, sans-serif";
  ctx.fillText(`${sins}/10`, S / 2, 300 + linhas.length * 92);

  // indicadores das 5 peças
  const baseY = 640;
  const gap = S / 5;
  PECAS_KIT.forEach((p, i) => {
    const cx = gap / 2 + i * gap;
    const cheia = answers[i * 2] === true || answers[i * 2 + 1] === true;
    ctx.beginPath();
    ctx.arc(cx, baseY, 34, 0, Math.PI * 2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#C9F31D";
    if (cheia) {
      ctx.fillStyle = "#C9F31D";
      ctx.fill();
    }
    ctx.stroke();
    ctx.fillStyle = cheia ? "#C9F31D" : "#9CA3AF";
    ctx.font = "700 28px system-ui, -apple-system, sans-serif";
    ctx.fillText(p.nome, cx, baseY + 90);
  });

  ctx.fillStyle = "#F4F4F5";
  ctx.font = "700 34px system-ui, -apple-system, sans-serif";
  ctx.fillText("Checklist das 5 Peças · Giselle Falcão · @gisellecfalcao", S / 2, 900);

  ctx.fillStyle = "#9CA3AF";
  ctx.font = "400 24px system-ui, -apple-system, sans-serif";
  ctx.fillText(GARTNER_NOTA, S / 2, 980);
}

function Veredito({ state, onOutro }: { state: CheckState; onOutro: () => void }) {
  const atual = state.atual!;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sins = contarSins(atual.answers);
  const veredito = vereditoDe(sins);
  const faltando = pecasFaltando(atual.answers);
  const texto = textoVeredito(sins, faltando);
  const cor = sins >= 9 ? "#C9F31D" : sins >= 5 ? "#7A10D6" : "#FF6B6B";

  const perguntasNao = PECAS_KIT.flatMap((p, pi) =>
    p.perguntas
      .map((q, qi) => ({ peca: p.nome, texto: q.texto, valor: atual.answers[pi * 2 + qi] }))
      .filter((q) => q.valor === false)
  );

  useEffect(() => {
    if (canvasRef.current) desenharCartao(canvasRef.current, veredito, sins, atual.answers);
  }, [veredito, sins, atual.answers]);

  const baixar = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    kitEvent("card_download", `${sins}`);
    canvas.toBlob((blob) => {
      if (!blob) {
        toast.error("Não consegui gerar o cartão neste navegador.");
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "checklist-5-pecas.png";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }, "image/png");
  };

  const msg = msgChecklist({
    src: getSrc(),
    nome: atual.nome,
    veredito,
    sins,
    pecasFaltando: faltando,
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} aria-live="polite" className="space-y-4">
      <div className="overflow-hidden rounded-2xl bg-[#0F1117] shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <div className="h-2 w-full" style={{ background: cor }} />
        <div className="p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9CA3AF]">
            {atual.nome ? `Veredito · ${atual.nome}` : "Veredito"}
          </p>
          <h2 className="mt-2 font-baloo text-[28px] font-bold leading-tight text-[#F4F4F5]">{veredito}</h2>
          <p className="mt-1 text-sm font-semibold text-[#9CA3AF]">{sins}/10 sim</p>
          <p className="mt-4 text-sm leading-7 text-[#F4F4F5]/85">{texto}</p>
        </div>
      </div>

      {/* cartão compartilhável 1:1 (canvas 1080×1080) */}
      <canvas ref={canvasRef} className="w-full rounded-2xl border border-[#262A36]" aria-label="Cartão do veredito para compartilhar" />

      {perguntasNao.length > 0 ? (
        <div className="rounded-2xl border border-[#262A36] bg-[#171A23] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9F31D]">
            O que perguntar antes de assinar
          </p>
          <ul className="mt-3 space-y-2.5">
            {perguntasNao.map((q) => (
              <li key={q.texto} className="text-sm leading-6 text-[#F4F4F5]/90">
                <span className="font-bold text-[#9CA3AF]">{q.peca}:</span> {q.texto}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-2.5">
        <button type="button" onClick={baixar} className={btnSecundario}>
          <Download className="size-4" />
          Salvar cartão
        </button>
        <button type="button" onClick={() => void compartilhar(msg, "checklist")} className={btnSecundario}>
          <Share2 className="size-4" />
          Compartilhar
        </button>
      </div>
      <button type="button" onClick={() => void enviarParaGiselle(msg, "checklist")} className={btnPrimario}>
        <MessageCircle className="size-4" />
        Enviar para a Giselle
      </button>
      <button
        type="button"
        onClick={onOutro}
        className="mx-auto flex min-h-11 items-center gap-1.5 text-xs font-semibold text-[#9CA3AF]/70 transition hover:text-[#C9F31D]"
      >
        <RotateCcw className="size-3.5" />
        Avaliar outro
      </button>
      <KitCreditos />
    </motion.div>
  );
}
