// Kit "Quem está aprendendo a dirigir?" (/kit) — continuação da palestra
// "A Próxima Interface do Mundo Não Será um App: Será um Agente".
// Home + sub-rotas client-side (§3). Regras: sem cadastro, sem venda,
// resultado sempre da pessoa; ?src= guardado e incluído nas mensagens.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { toast } from "sonner";
import { kit } from "@/lib/kitData";
import { readTrackingParams } from "@/lib/tracking";
import {
  apagarTudo,
  cicloAtual,
  loadCheck,
  loadDiag,
  loadPlan,
  rememberSrc,
  semanaAtual,
} from "@/lib/kitStore";
import KitShell, { BadgeNumero, KitCreditos } from "@/components/kit/KitShell";
import KitDiagnostico from "@/components/kit/KitDiagnostico";
import KitChecklist from "@/components/kit/KitChecklist";
import KitRoteiro from "@/components/kit/KitRoteiro";

export type KitTool = "home" | "diagnostico" | "checklist" | "roteiro";

function progressoDe(id: string): string | null {
  try {
    if (id === "diagnostico") {
      const d = loadDiag();
      if (d.finishedAt) return "Rever meu resultado";
      if (d.mode) return `Continuar — você parou na pergunta ${d.step + 1}`;
      return null;
    }
    if (id === "checklist") {
      const c = loadCheck();
      if (c.atual && c.atual.answers.some((a) => a === null))
        return `Continuar — peça ${c.atual.card + 1} de 5`;
      return null;
    }
    if (id === "roteiro") {
      const p = loadPlan();
      const aberto = cicloAtual(p);
      if (aberto) return `Continuar — você está na Semana ${semanaAtual(aberto)}`;
      return null;
    }
  } catch {
    /* sem storage — mostra os CTAs padrão */
  }
  return null;
}

function KitHome() {
  const [, setVersao] = useState(0);

  const apagar = () => {
    if (!window.confirm("Apagar todos os dados do kit salvos neste aparelho?")) return;
    apagarTudo();
    toast.success("Dados apagados deste aparelho.");
    setVersao((v) => v + 1);
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="font-baloo text-[32px] font-bold leading-[1.1] text-[#F4F4F5]">{kit.titulo}</h1>
        <p className="mt-3 text-base leading-7 text-[#9CA3AF]">{kit.subtitulo}</p>
      </motion.div>

      <div className="mt-7 space-y-3">
        {kit.ferramentas.map((f, i) => {
          const progresso = progressoDe(f.id);
          return (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * (i + 1) }}
            >
              <Link
                href={f.href}
                className="block rounded-2xl border border-[#262A36] bg-[#0F1117] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition hover:border-[#C9F31D]/60"
              >
                <div className="flex items-center gap-3">
                  <BadgeNumero n={f.n} />
                  <h2 className="font-baloo text-lg font-bold text-[#F4F4F5]">{f.nome}</h2>
                </div>
                <p className="mt-2.5 text-sm leading-6 text-[#9CA3AF]">{f.descricao}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9CA3AF]/70">
                    {f.tempo}
                  </span>
                  <span className="rounded-full bg-[#C9F31D] px-5 py-2 text-sm font-bold text-[#050608]">
                    {progresso ?? f.cta}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm leading-6 text-[#9CA3AF]">{kit.rodapeHome}</p>

      <div className="mt-6 space-y-2">
        <KitCreditos />
        <button
          type="button"
          onClick={apagar}
          className="mx-auto block min-h-11 text-[11px] font-semibold text-[#9CA3AF]/50 transition hover:text-[#FF6B6B]"
        >
          Apagar meus dados deste aparelho
        </button>
      </div>
    </div>
  );
}

export default function GiselleKit({ tool = "home" }: { tool?: KitTool }) {
  useEffect(() => {
    // ?src=hacktown do QR fica guardado para as mensagens e eventos (§1).
    try {
      rememberSrc(readTrackingParams().srcParam);
    } catch {
      /* segue sem origem */
    }
  }, []);

  return (
    <KitShell>
      {tool === "home" ? <KitHome /> : null}
      {tool === "diagnostico" ? <KitDiagnostico /> : null}
      {tool === "checklist" ? <KitChecklist /> : null}
      {tool === "roteiro" ? <KitRoteiro /> : null}
    </KitShell>
  );
}
