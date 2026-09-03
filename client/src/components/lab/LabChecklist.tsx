import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, MessageCircle, RotateCcw, Share2, X } from "lucide-react";
import { toast } from "sonner";
import {
  ASSINATURA_CARTAO,
  GARTNER_NOTA,
  PECAS,
  VEREDITOS_CHECKLIST,
  waLink,
} from "@/lib/labData";

export default function LabChecklist() {
  // respostas[peca][pergunta] = true (sim) | false (não) | undefined
  const [respostas, setRespostas] = useState<Record<string, boolean>>({});

  const marcar = (key: string, valor: boolean) =>
    setRespostas((prev) => ({ ...prev, [key]: valor }));

  const totalRespondidas = Object.keys(respostas).length;
  const sims = Object.values(respostas).filter(Boolean).length;
  const completo = totalRespondidas === PECAS.length * 2;

  const veredito = useMemo(
    () => VEREDITOS_CHECKLIST.find((v) => sims >= v.faixa[0] && sims <= v.faixa[1]) ?? VEREDITOS_CHECKLIST[0]!,
    [sims]
  );

  const textoCartao = `Passei o "agente" pelo Checklist das 5 Peças: ${sims}/10 sim.\nVeredito: ${veredito.nome}.\n${veredito.frase}\n\n${GARTNER_NOTA}\n${ASSINATURA_CARTAO}`;

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(textoCartao);
      toast.success("Veredito copiado — cola no grupo do trabalho 😉");
    } catch {
      toast.error("Não consegui copiar. Selecione o texto do cartão manualmente.");
    }
  };

  const compartilhar = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ text: textoCartao });
      } else {
        await copiar();
      }
    } catch {
      /* usuário cancelou — ok */
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm leading-7 text-slate-500">
        Para usar <strong className="text-[#1a1333]">na próxima demo ou reunião com fornecedor</strong>. Marque
        enquanto ouve. O veredito aparece no final.
      </p>

      {PECAS.map((peca, pi) => (
        <div key={peca.nome} className="rounded-3xl border border-slate-200/70 bg-white p-5">
          <p className="flex items-center gap-2 font-baloo text-base font-bold text-[#1a1333]">
            <span className="flex size-7 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#6b21a8,#14b8a6)] text-xs font-bold text-white">
              {pi + 1}
            </span>
            {peca.nome}
          </p>
          <div className="mt-3 space-y-3">
            {peca.perguntas.map((perg, qi) => {
              const key = `${pi}-${qi}`;
              const val = respostas[key];
              return (
                <div key={key} className="flex items-start justify-between gap-3">
                  <p className="text-sm leading-6 text-slate-600">{perg}</p>
                  <div className="flex shrink-0 gap-1.5">
                    <button
                      type="button"
                      aria-label={`Sim — ${perg}`}
                      aria-pressed={val === true}
                      onClick={() => marcar(key, true)}
                      className={`flex size-9 items-center justify-center rounded-xl border-2 transition ${
                        val === true
                          ? "border-teal-500 bg-teal-500 text-white"
                          : "border-slate-200 text-slate-300 hover:border-teal-300"
                      }`}
                    >
                      <Check className="size-4" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Não — ${perg}`}
                      aria-pressed={val === false}
                      onClick={() => marcar(key, false)}
                      className={`flex size-9 items-center justify-center rounded-xl border-2 transition ${
                        val === false
                          ? "border-rose-500 bg-rose-500 text-white"
                          : "border-slate-200 text-slate-300 hover:border-rose-300"
                      }`}
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {completo ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl bg-[#0d1226] p-6"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-200">Veredito · {sims}/10 sim</p>
          <h3 className="mt-2 font-baloo text-2xl font-bold text-white">{veredito.nome}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-300">{veredito.frase}</p>
          <p className="mt-4 border-t border-white/10 pt-3 text-xs leading-5 text-slate-400">{GARTNER_NOTA}</p>
          <p className="mt-1 text-xs font-semibold text-slate-500">{ASSINATURA_CARTAO}</p>
          <a
            href={waLink(`Oi, Giselle! ${textoCartao}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3.5 text-sm font-bold text-[#1a1333] transition hover:bg-teal-100"
          >
            <MessageCircle className="size-4" />
            Mandar para a Giselle
          </a>
          <div className="mt-2.5 flex gap-2.5">
            <button
              type="button"
              onClick={compartilhar}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-white/30 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              <Share2 className="size-4" />
              Compartilhar
            </button>
            <button
              type="button"
              onClick={copiar}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-white/30 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              <Copy className="size-4" />
              Copiar
            </button>
          </div>
        </motion.div>
      ) : (
        <p className="text-center text-xs font-semibold text-slate-400">
          {totalRespondidas} de {PECAS.length * 2} respondidas — o veredito aparece quando completar.
        </p>
      )}

      {totalRespondidas > 0 ? (
        <button
          type="button"
          onClick={() => setRespostas({})}
          className="mx-auto flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-[#6b21a8]"
        >
          <RotateCcw className="size-3.5" />
          Limpar e usar de novo
        </button>
      ) : null}
    </div>
  );
}
