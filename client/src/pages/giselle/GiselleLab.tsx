import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, FlaskConical, Gauge, ListChecks, Map } from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import LabChecklist from "@/components/lab/LabChecklist";
import LabDiagnostico from "@/components/lab/LabDiagnostico";
import LabRoteiro from "@/components/lab/LabRoteiro";
import { PROXIMOS_PASSOS, lab } from "@/lib/labData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const ferramentas = [
  { id: "diagnostico", n: 1, nome: "Diagnóstico de Prontidão", tempo: "5 min", Icon: Gauge },
  { id: "checklist", n: 2, nome: "Checklist das 5 Peças", tempo: "3 min", Icon: ListChecks },
  { id: "roteiro", n: 3, nome: "Roteiro dos 30 Dias", tempo: "1 mês", Icon: Map },
] as const;

export default function GiselleLab() {
  return (
    <GiselleLayout>
      {/* Hero enxuto — quem chega está no auditório, no celular */}
      <section className="relative overflow-hidden bg-[#0d1226]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(20,184,166,0.28),transparent_50%),radial-gradient(circle_at_85%_15%,rgba(107,33,168,0.4),transparent_45%)]" />
        <div className="container relative py-12 sm:py-16">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur">
              <FlaskConical className="size-3.5" />
              {lab.nome}
            </p>
            <h1 className="mt-4 max-w-2xl font-baloo text-3xl font-bold leading-[1.1] text-white sm:text-4xl">
              {lab.heroTitle}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-300">{lab.heroSub}</p>
            <p className="mt-4 font-baloo text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
              {lab.bandeira}
            </p>
          </motion.div>
          {/* atalhos para as ferramentas */}
          <div className="mt-7 grid gap-2.5 sm:grid-cols-3">
            {ferramentas.map((f) => (
              <a
                key={f.id}
                href={`#${f.id}`}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur transition hover:bg-white/10"
              >
                <f.Icon className="size-5 shrink-0 text-teal-300" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-white">
                    {f.n}. {f.nome}
                  </span>
                  <span className="text-xs text-slate-400">{f.tempo}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Ferramenta 1 — Diagnóstico (primeiro: separa pessoa de empresa) */}
      <section id="diagnostico" className="container scroll-mt-24 py-12 sm:py-14">
        <div className="mx-auto max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Ferramenta 1 · 5 minutos</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Diagnóstico de Prontidão</h2>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            Poucas perguntas, uma por vez. Resultado na hora, seu, com a próxima ação.
          </p>
          <div className="mt-6">
            <LabDiagnostico />
          </div>
        </div>
      </section>

      {/* Ferramenta 2 — Checklist */}
      <section id="checklist" className="scroll-mt-24 border-y border-slate-200/70 bg-white">
        <div className="container py-12 sm:py-14">
          <div className="mx-auto max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6b21a8]">Ferramenta 2 · 3 minutos</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Checklist das 5 Peças</h2>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              Aquilo é um agente de verdade — ou marketing? Descubra antes de assinar.
            </p>
            <div className="mt-6">
              <LabChecklist />
            </div>
          </div>
        </div>
      </section>

      {/* Ferramenta 3 — Roteiro */}
      <section id="roteiro" className="container scroll-mt-24 py-12 sm:py-14">
        <div className="mx-auto max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Ferramenta 3 · 30 dias</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Roteiro dos 30 Dias</h2>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            Da palestra para a prática: um ciclo completo, no seu ritmo.
          </p>
          <div className="mt-6">
            <LabRoteiro />
          </div>
        </div>
      </section>

      {/* Tese + dados de mercado */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-12 sm:py-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-baloo text-xl font-bold leading-relaxed text-[#1a1333] sm:text-2xl">
              “{lab.tese}”
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {lab.dados.map((d) => (
                <div key={d.valor}>
                  <p className="font-baloo text-4xl font-bold bg-[linear-gradient(90deg,#6b21a8,#8b5cf6,#14b8a6)] bg-clip-text text-transparent">
                    {d.valor}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{d.fonte}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Próximos passos por rota */}
      <section className="container py-12 pb-16 sm:py-14">
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-teal-200 bg-teal-50/40 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">Para a sua trajetória</p>
            <ul className="mt-3 space-y-2">
              {PROXIMOS_PASSOS.pessoal.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a1333] transition hover:text-teal-700"
                  >
                    <ArrowRight className="size-3.5 text-teal-600" />
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-violet-200 bg-violet-50/40 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6b21a8]">Para a sua empresa</p>
            <ul className="mt-3 space-y-2">
              {PROXIMOS_PASSOS.empresa.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a1333] transition hover:text-[#6b21a8]"
                  >
                    <ArrowRight className="size-3.5 text-[#6b21a8]" />
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </GiselleLayout>
  );
}
