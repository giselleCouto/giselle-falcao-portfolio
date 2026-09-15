// Ferramenta 3 — Roteiro dos 30 Dias / 4M (§7). Campos curtos e opcionais
// com placeholder que ensina; o checkbox "Concluí esta semana" desbloqueia a
// próxima (dá para pular — o relatório avisa o que ficou em branco).

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, MessageCircle, Printer, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import {
  CHECKLIST_S3,
  FICOU_EM_BRANCO,
  SEMANAS,
  UNIDADES,
  msgRoteiro,
  type Unidade,
} from "@/lib/kitData";
import {
  cicloAtual,
  getSrc,
  loadDiag,
  loadPlan,
  novoCiclo,
  savePlan,
  semanaAtual,
  type PlanCycle,
  type PlanState,
} from "@/lib/kitStore";
import { enviarParaGiselle, kitEvent } from "@/lib/kitSend";
import { EIXOS_PESSOAL } from "@/lib/kitData";
import { BadgeNumero, KitCreditos, KitProgress, btnPrimario, btnSecundario } from "./KitShell";

const inputBase =
  "mt-2 h-12 w-full rounded-2xl border border-[#262A36] bg-[#171A23] px-4 text-[15px] text-[#F4F4F5] outline-none transition placeholder:text-[#9CA3AF]/50 focus:border-[#C9F31D]/70";

function parseNumero(valor?: string): number | null {
  if (!valor?.trim()) return null;
  const n = Number(valor.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function variacaoDe(c: PlanCycle): string | null {
  const antes = parseNumero(c.w2.numeroAntes);
  const agora = parseNumero(c.w4.numeroAgora);
  if (antes === null || agora === null || antes === 0) return null;
  const pct = Math.round(((agora - antes) / antes) * 100);
  return `${pct > 0 ? "+" : ""}${pct}%`;
}

export default function KitRoteiro() {
  const [plan, setPlan] = useState<PlanState>(() => loadPlan());
  const aberto = cicloAtual(plan);
  const [semana, setSemana] = useState<number>(() => (aberto ? semanaAtual(aberto) : 1));
  const [relatorio, setRelatorio] = useState(false);

  const persistir = (next: PlanState) => {
    setPlan(next);
    savePlan(next);
  };

  const atualizarCiclo = (patch: (c: PlanCycle) => PlanCycle) => {
    const cycles = [...plan.cycles];
    const idx = cycles.length - 1;
    if (idx < 0 || cycles[idx]!.finishedAt) return;
    cycles[idx] = patch(cycles[idx]!);
    persistir({ cycles });
  };

  const comecarCiclo = () => {
    persistir({ cycles: [...plan.cycles, novoCiclo()] });
    setSemana(1);
    setRelatorio(false);
  };

  const ultimoFechado = [...plan.cycles].reverse().find((c) => c.finishedAt) ?? null;

  // ── Relatório ──────────────────────────────────────────────────────────────
  if (relatorio) {
    const ciclo = aberto ?? ultimoFechado;
    if (ciclo) {
      return (
        <Relatorio
          ciclo={ciclo}
          onFechar={() => setRelatorio(false)}
          onProximoCiclo={() => {
            // arquiva o atual (se ainda aberto) e abre uma Semana 1 nova
            const cycles = plan.cycles.map((c, i) =>
              i === plan.cycles.length - 1 && !c.finishedAt
                ? { ...c, finishedAt: new Date().toISOString() }
                : c
            );
            persistir({ cycles: [...cycles, novoCiclo()] });
            setSemana(1);
            setRelatorio(false);
          }}
        />
      );
    }
  }

  // ── Tela inicial ───────────────────────────────────────────────────────────
  if (!aberto) {
    return (
      <div>
        <h1 className="font-baloo text-[28px] font-bold leading-tight text-[#F4F4F5]">
          O 4M numa tarefa sua. Trinta dias.
        </h1>
        <p className="mt-3 text-base leading-7 text-[#9CA3AF]">Comece pela Semana 1.</p>
        <button type="button" onClick={comecarCiclo} className={`${btnPrimario} mt-6`}>
          Começar
        </button>
        {ultimoFechado ? (
          <button type="button" onClick={() => setRelatorio(true)} className={`${btnSecundario} mt-3`}>
            Ver meu último relatório
          </button>
        ) : null}
      </div>
    );
  }

  // ── Semana atual ───────────────────────────────────────────────────────────
  const info = SEMANAS[semana - 1]!;
  const c = aberto;

  const marcarConcluida = (done: boolean) => {
    if (done) kitEvent("plan_week_done", `semana${semana}`);
    atualizarCiclo((ciclo) => {
      const chave = `w${semana}` as "w1" | "w2" | "w3" | "w4";
      return { ...ciclo, [chave]: { ...ciclo[chave], done } };
    });
  };

  const doneAtual = (c[`w${semana}` as "w1"] as { done?: boolean }).done ?? false;

  // Dica do diagnóstico: se a peça fraca existe, a Semana 1 já chega orientada.
  const diag = loadDiag();
  const pecaFraca =
    semana === 1 && diag.mode === "pessoal" && diag.finishedAt
      ? EIXOS_PESSOAL.find((e) => {
          // recomputa rápido: menor eixo normalizado
          const v = (ids: string[], max: number) =>
            ids.reduce((s, id) => s + (diag.answers[id] ?? 0), 0) / max;
          const valores: Record<string, number> = {
            formular: v(["p1", "p2"], 4),
            medir: v(["p3", "p4"], 4),
            orquestrar: v(["p5"], 2),
            avaliar: v(["p6"], 2),
            governar: v(["p7"], 2),
            mostrar: v(["p8"], 2),
          };
          const menor = Math.min(...Object.values(valores));
          return menor < 1 && valores[e.key] === menor;
        })?.nome
      : undefined;

  return (
    <div>
      <KitProgress atual={semana} total={4} rotulo="Roteiro dos 30 Dias" />

      {/* navegação entre semanas já visitadas */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {SEMANAS.map((s) => {
          const done = (c[`w${s.n}` as "w1"] as { done?: boolean }).done;
          const ativa = s.n === semana;
          const desbloqueada = s.n === 1 || (c[`w${s.n - 1}` as "w1"] as { done?: boolean }).done || s.n <= semanaAtual(c);
          return (
            <button
              key={s.n}
              type="button"
              disabled={!desbloqueada}
              onClick={() => setSemana(s.n)}
              className={`h-11 rounded-xl border text-xs font-bold transition ${
                ativa
                  ? "border-[#C9F31D] bg-[#C9F31D]/15 text-[#C9F31D]"
                  : done
                    ? "border-[#262A36] bg-[#171A23] text-[#4ADE80]"
                    : "border-[#262A36] bg-[#0F1117] text-[#9CA3AF] disabled:opacity-40"
              }`}
            >
              S{s.n} · {s.m}
            </button>
          );
        })}
      </div>

      <motion.div
        key={semana}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-5 rounded-2xl border border-[#262A36] bg-[#0F1117] p-5"
      >
        <div className="flex items-center gap-3">
          <BadgeNumero n={info.n} />
          <div>
            <h2 className="font-baloo text-xl font-bold text-[#F4F4F5]">
              Semana {info.n} · {info.m}
            </h2>
            <p className="text-sm text-[#9CA3AF]">{info.titulo}</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-7 text-[#F4F4F5]/85">{info.frase}</p>
        {pecaFraca ? (
          <p className="mt-2 rounded-xl bg-[#C9F31D]/10 px-3 py-2 text-xs leading-5 text-[#C9F31D]">
            Seu diagnóstico apontou {pecaFraca} como a peça mais fraca — comece por aí.
          </p>
        ) : null}

        <div className="mt-5 space-y-4">
          {semana === 1 ? (
            <>
              <Campo
                label="A tarefa que eu escolhi"
                placeholder="Fechar o relatório semanal de contratos"
                valor={c.w1.tarefa}
                onChange={(v) => atualizarCiclo((x) => ({ ...x, w1: { ...x.w1, tarefa: v } }))}
              />
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9CA3AF]">
                  Quantos sistemas ela atravessa
                </span>
                <div className="mt-2 flex items-center gap-3">
                  {[-1, 1].map((delta) => (
                    <button
                      key={delta}
                      type="button"
                      aria-label={delta > 0 ? "Mais um sistema" : "Um sistema a menos"}
                      onClick={() =>
                        atualizarCiclo((x) => ({
                          ...x,
                          w1: {
                            ...x.w1,
                            sistemas: Math.min(10, Math.max(1, (x.w1.sistemas ?? 3) + delta)),
                          },
                        }))
                      }
                      className="flex size-12 items-center justify-center rounded-2xl border border-[#262A36] bg-[#171A23] font-baloo text-xl font-bold text-[#F4F4F5] transition hover:border-[#C9F31D]/60"
                    >
                      {delta > 0 ? "+" : "−"}
                    </button>
                  ))}
                  <span className="font-baloo text-2xl font-bold text-[#C9F31D]">{c.w1.sistemas ?? 3}</span>
                </div>
              </div>
              <Campo
                label="Quem decide o quê nessa tarefa"
                placeholder="Eu levanto, o gerente aprova, o financeiro executa"
                valor={c.w1.decide}
                onChange={(v) => atualizarCiclo((x) => ({ ...x, w1: { ...x.w1, decide: v } }))}
              />
            </>
          ) : null}

          {semana === 2 ? (
            <>
              <div className="rounded-2xl border border-[#C9F31D]/50 bg-[#C9F31D]/5 p-4">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C9F31D]">
                  O número de hoje — o campo mais importante do kit
                </span>
                <div className="mt-2 flex gap-2.5">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="3"
                    value={c.w2.numeroAntes ?? ""}
                    onChange={(e) => atualizarCiclo((x) => ({ ...x, w2: { ...x.w2, numeroAntes: e.target.value } }))}
                    className="h-12 w-28 rounded-2xl border border-[#262A36] bg-[#171A23] px-4 text-center font-baloo text-xl font-bold text-[#C9F31D] outline-none focus:border-[#C9F31D]"
                  />
                  <select
                    aria-label="Unidade"
                    value={c.w2.unidade ?? "horas"}
                    onChange={(e) =>
                      atualizarCiclo((x) => ({ ...x, w2: { ...x.w2, unidade: e.target.value as Unidade } }))
                    }
                    className="h-12 flex-1 rounded-2xl border border-[#262A36] bg-[#171A23] px-3 text-[15px] text-[#F4F4F5] outline-none focus:border-[#C9F31D]/70"
                  >
                    {UNIDADES.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Campo
                label="O que vai contar como “funcionou”"
                placeholder="Cair de 3h para menos de 1h, sem erro no valor"
                valor={c.w2.funcionou}
                onChange={(v) => atualizarCiclo((x) => ({ ...x, w2: { ...x.w2, funcionou: v } }))}
              />
            </>
          ) : null}

          {semana === 3 ? (
            <>
              <div className="space-y-2.5">
                {CHECKLIST_S3.map((item) => {
                  const marcado = c.w3.checks?.[item.key] ?? false;
                  return (
                    <div key={item.key}>
                      <button
                        type="button"
                        aria-pressed={marcado}
                        onClick={() =>
                          atualizarCiclo((x) => ({
                            ...x,
                            w3: { ...x.w3, checks: { ...(x.w3.checks ?? {}), [item.key]: !marcado } },
                          }))
                        }
                        className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm leading-6 transition ${
                          marcado
                            ? "border-[#4ADE80]/60 bg-[#4ADE80]/10 text-[#F4F4F5]"
                            : "border-[#262A36] bg-[#171A23] text-[#F4F4F5]/85 hover:border-[#C9F31D]/40"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border text-xs font-bold ${
                            marcado ? "border-[#4ADE80] bg-[#4ADE80] text-[#050608]" : "border-[#9CA3AF]/50"
                          }`}
                        >
                          {marcado ? "✓" : ""}
                        </span>
                        {item.label}
                      </button>
                      {"aviso" in item && !marcado ? (
                        <p className="mt-1 pl-1 text-xs text-[#FF6B6B]">{item.aviso}</p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <Campo
                label="O que quebrou"
                placeholder="Ela confundiu contratos renovados com novos"
                valor={c.w3.quebrou}
                onChange={(v) => atualizarCiclo((x) => ({ ...x, w3: { ...x.w3, quebrou: v } }))}
              />
            </>
          ) : null}

          {semana === 4 ? (
            <>
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9CA3AF]">
                  O número de agora {c.w2.unidade ? `(${c.w2.unidade})` : ""}
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="1"
                  value={c.w4.numeroAgora ?? ""}
                  onChange={(e) => atualizarCiclo((x) => ({ ...x, w4: { ...x.w4, numeroAgora: e.target.value } }))}
                  className="mt-2 h-12 w-28 rounded-2xl border border-[#262A36] bg-[#171A23] px-4 text-center font-baloo text-xl font-bold text-[#C9F31D] outline-none focus:border-[#C9F31D]"
                />
                {variacaoDe(c) ? (
                  <p className="mt-1.5 text-sm font-bold text-[#4ADE80]">
                    Variação: {variacaoDe(c)} em relação à Semana 2
                  </p>
                ) : null}
              </div>
              <Campo
                label="Para quem eu mostrei"
                placeholder="Minha gestora, na reunião de sexta"
                valor={c.w4.mostreiPara}
                onChange={(v) => atualizarCiclo((x) => ({ ...x, w4: { ...x.w4, mostreiPara: v } }))}
              />
              <Campo
                label="O que eu faria diferente no próximo ciclo"
                placeholder="Começar medindo três execuções, não uma"
                valor={c.w4.proximoCiclo}
                onChange={(v) => atualizarCiclo((x) => ({ ...x, w4: { ...x.w4, proximoCiclo: v } }))}
              />
            </>
          ) : null}
        </div>

        <p className="mt-4 text-xs leading-5 text-[#9CA3AF]">💡 {info.dica}</p>

        <label className="mt-5 flex min-h-11 cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={doneAtual}
            onChange={(e) => marcarConcluida(e.target.checked)}
            className="size-5 accent-[#C9F31D]"
          />
          <span className="text-sm font-semibold text-[#F4F4F5]">Concluí esta semana</span>
        </label>
      </motion.div>

      <div className="mt-5 space-y-3">
        {semana < 4 ? (
          <>
            <button
              type="button"
              disabled={!doneAtual}
              onClick={() => setSemana(semana + 1)}
              className={`${btnPrimario} disabled:opacity-40`}
            >
              Ir para a Semana {semana + 1}
            </button>
            {!doneAtual ? (
              <button
                type="button"
                onClick={() => setSemana(semana + 1)}
                className="mx-auto flex min-h-11 items-center text-xs font-semibold text-[#9CA3AF]/70 transition hover:text-[#C9F31D]"
              >
                Pular esta semana (o relatório vai avisar)
              </button>
            ) : null}
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              kitEvent("plan_report");
              setRelatorio(true);
            }}
            className={btnPrimario}
          >
            Gerar meu relatório de 30 dias
          </button>
        )}
      </div>
    </div>
  );
}

function Campo({
  label,
  placeholder,
  valor,
  onChange,
}: {
  label: string;
  placeholder: string;
  valor?: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9CA3AF]">{label}</span>
      <input
        type="text"
        maxLength={160}
        placeholder={placeholder}
        value={valor ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={inputBase}
      />
    </label>
  );
}

// ── relatório (one-pager, imprimível) ────────────────────────────────────────

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#262A36] p-4 print:border-slate-300">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9CA3AF] print:text-slate-500">
        {titulo}
      </p>
      <div className="mt-1.5 text-sm leading-6 text-[#F4F4F5] print:text-black">{children}</div>
    </div>
  );
}

function ouBranco(valor?: string) {
  return valor?.trim() ? valor : <em className="text-[#9CA3AF] print:text-slate-500">{FICOU_EM_BRANCO}</em>;
}

function Relatorio({
  ciclo,
  onFechar,
  onProximoCiclo,
}: {
  ciclo: PlanCycle;
  onFechar: () => void;
  onProximoCiclo: () => void;
}) {
  const variacao = variacaoDe(ciclo);
  const unidade = ciclo.w2.unidade ?? "";
  const msg = msgRoteiro({
    src: getSrc(),
    tarefa: ciclo.w1.tarefa?.trim() || undefined,
    antes: ciclo.w2.numeroAntes ? `${ciclo.w2.numeroAntes} ${unidade}`.trim() : undefined,
    agora: ciclo.w4.numeroAgora ? `${ciclo.w4.numeroAgora} ${unidade}`.trim() : undefined,
    variacao: variacao ?? undefined,
    quebrou: ciclo.w3.quebrou?.trim() || undefined,
    proximo: ciclo.w4.proximoCiclo?.trim() || undefined,
  });

  const copiarRelatorio = async () => {
    const linhas = [
      `RELATÓRIO DE 30 DIAS — MÉTODO 4M`,
      `Tarefa: ${ciclo.w1.tarefa?.trim() || "(em branco)"}`,
      `Antes: ${ciclo.w2.numeroAntes || "?"} ${unidade} → Agora: ${ciclo.w4.numeroAgora || "?"} ${unidade}${variacao ? ` (${variacao})` : ""}`,
      `Mapear: ${ciclo.w1.tarefa?.trim() || "(em branco)"} · ${ciclo.w1.sistemas ?? "?"} sistemas · ${ciclo.w1.decide?.trim() || "(quem decide: em branco)"}`,
      `Medir: ${ciclo.w2.funcionou?.trim() || "(critério em branco)"}`,
      `Montar: ${Object.values(ciclo.w3.checks ?? {}).filter(Boolean).length}/4 passos · O que quebrou: ${ciclo.w3.quebrou?.trim() || "(em branco)"}`,
      `Mostrar: para ${ciclo.w4.mostreiPara?.trim() || "(em branco)"}`,
      `Próximo ciclo: ${ciclo.w4.proximoCiclo?.trim() || "(em branco)"}`,
      `— Método 4M · Giselle Falcão`,
    ];
    try {
      await navigator.clipboard.writeText(linhas.join("\n"));
      toast.success("Relatório copiado.");
    } catch {
      toast.error("Não consegui copiar — use o botão Salvar PDF.");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-4">
      {/* CSS de impressão: só o relatório sai, em 1 página A4 clara */}
      <style>{`
        @media print {
          @page { size: A4; margin: 14mm; }
          body * { visibility: hidden; }
          #kit-relatorio, #kit-relatorio * { visibility: visible; }
          #kit-relatorio {
            position: absolute; left: 0; top: 0; width: 100%;
            background: #fff !important; color: #000 !important;
            border: none !important; box-shadow: none !important;
          }
        }
      `}</style>

      <div id="kit-relatorio" className="rounded-2xl bg-[#0F1117] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)] print:bg-white">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9F31D] print:text-black">
          Relatório de 30 dias
        </p>
        <h2 className="mt-2 font-baloo text-2xl font-bold leading-tight text-[#F4F4F5] print:text-black">
          {ciclo.w1.tarefa?.trim() || "Minha tarefa"}
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#171A23] p-4 text-center print:border print:border-slate-300 print:bg-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9CA3AF] print:text-slate-500">Antes</p>
            <p className="mt-1 font-baloo text-3xl font-bold text-[#F4F4F5] print:text-black">
              {ciclo.w2.numeroAntes || "—"}
            </p>
            <p className="text-xs text-[#9CA3AF] print:text-slate-500">{unidade}</p>
          </div>
          <div className="rounded-xl bg-[#171A23] p-4 text-center print:border print:border-slate-300 print:bg-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9CA3AF] print:text-slate-500">Depois</p>
            <p className="mt-1 font-baloo text-3xl font-bold text-[#C9F31D] print:text-black">
              {ciclo.w4.numeroAgora || "—"}
            </p>
            <p className="text-xs text-[#9CA3AF] print:text-slate-500">
              {unidade}
              {variacao ? ` · ${variacao}` : ""}
            </p>
          </div>
        </div>
        {!ciclo.w2.numeroAntes || !ciclo.w4.numeroAgora ? (
          <p className="mt-2 text-xs italic text-[#9CA3AF] print:text-slate-500">
            número de antes/depois: {FICOU_EM_BRANCO}
          </p>
        ) : null}

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Bloco titulo="1 · Mapear">
            {ouBranco(ciclo.w1.tarefa)}
            {ciclo.w1.sistemas ? <span className="block text-xs text-[#9CA3AF] print:text-slate-500">{ciclo.w1.sistemas} sistemas · {ciclo.w1.decide?.trim() || "quem decide: em branco"}</span> : null}
          </Bloco>
          <Bloco titulo="2 · Medir">{ouBranco(ciclo.w2.funcionou)}</Bloco>
          <Bloco titulo="3 · Montar">
            {Object.values(ciclo.w3.checks ?? {}).filter(Boolean).length}/4 passos concluídos
          </Bloco>
          <Bloco titulo="4 · Mostrar">{ouBranco(ciclo.w4.mostreiPara)}</Bloco>
        </div>

        <div className="mt-3 space-y-3">
          <Bloco titulo="O que quebrou">{ouBranco(ciclo.w3.quebrou)}</Bloco>
          <Bloco titulo="Próximo ciclo">{ouBranco(ciclo.w4.proximoCiclo)}</Bloco>
        </div>

        <p className="mt-5 text-center text-xs font-bold text-[#9CA3AF] print:text-slate-500">
          Método 4M · Giselle Falcão
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 print:hidden">
        <button type="button" onClick={() => void copiarRelatorio()} className={btnSecundario}>
          <Copy className="size-4" />
          Copiar relatório
        </button>
        <button type="button" onClick={() => window.print()} className={btnSecundario}>
          <Printer className="size-4" />
          Salvar PDF
        </button>
      </div>
      <button type="button" onClick={() => void enviarParaGiselle(msg, "roteiro")} className={`${btnPrimario} print:hidden`}>
        <MessageCircle className="size-4" />
        Mandar para a Giselle
      </button>
      <button
        type="button"
        onClick={onProximoCiclo}
        className={`${btnSecundario} print:hidden`}
      >
        <RotateCcw className="size-4" />
        Começar o próximo ciclo
      </button>
      <button
        type="button"
        onClick={onFechar}
        className="mx-auto flex min-h-11 items-center text-xs font-semibold text-[#9CA3AF]/70 transition hover:text-[#C9F31D] print:hidden"
      >
        Voltar às semanas
      </button>
      <div className="print:hidden">
        <KitCreditos />
      </div>
    </motion.div>
  );
}
