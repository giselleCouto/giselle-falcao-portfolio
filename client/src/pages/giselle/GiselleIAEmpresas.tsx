import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  ChartLine,
  CheckCircle2,
  ChevronDown,
  Eye,
  Gauge,
  Radar,
  Route as RouteIcon,
  Sigma,
  Sparkles,
  Waves,
} from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { iaEmpresas } from "@/lib/iaEmpresasData";
import { contact } from "@/lib/portfolioData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const iconesAbordagem = {
  radar: Radar,
  route: RouteIcon,
  eye: Eye,
  chart: ChartLine,
  waves: Waves,
  sigma: Sigma,
  bot: Bot,
} as const;

export default function GiselleIAEmpresas() {
  return (
    <GiselleLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0d1226]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(107,33,168,0.4),transparent_50%),radial-gradient(circle_at_85%_20%,rgba(20,184,166,0.25),transparent_45%)]" />
        <div className="container relative py-16 sm:py-20">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }}>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur">
              <Sparkles className="size-3.5" />
              {iaEmpresas.badge}
            </p>
            <h1 className="mt-5 max-w-3xl font-baloo text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
              {iaEmpresas.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{iaEmpresas.heroSub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/diagnostico-ia"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#1a1333] transition hover:bg-teal-100"
              >
                <Gauge className="size-4" />
                Diagnóstico gratuito (3 min)
              </Link>
              <a
                href={contact.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Agendar conversa
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tese 1 — a dor primeiro */}
      <section className="container py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Tese nº 1</p>
            <h2 className="mt-3 max-w-xl font-baloo text-3xl font-bold sm:text-4xl">
              {iaEmpresas.tese1.titulo}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">{iaEmpresas.tese1.texto}</p>
          </div>
          <ol className="space-y-3">
            {iaEmpresas.tese1.passos.map((p, i) => (
              <motion.li
                key={p}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3.5 rounded-2xl border border-slate-200/70 bg-white px-5 py-4"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#6b21a8,#14b8a6)] font-baloo text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-sm font-medium leading-6 text-slate-700">{p}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tese 2 — IA vai além dos LLMs */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-14 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6b21a8]">Tese nº 2</p>
          <h2 className="mt-3 font-baloo text-3xl font-bold sm:text-4xl">{iaEmpresas.tese2.titulo}</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{iaEmpresas.tese2.texto}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {iaEmpresas.abordagens.map((a, i) => {
              const Icon = iconesAbordagem[a.icone as keyof typeof iconesAbordagem] ?? Sparkles;
              return (
                <motion.div
                  key={a.nome}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-[#f7f8fc] p-6"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-violet-100 text-[#6b21a8]">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-baloo text-lg font-bold leading-snug">{a.nome}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{a.resolve}</p>
                  <p className="mt-3 flex flex-1 items-start gap-2 text-xs leading-5 text-slate-500">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-teal-600" />
                    <span>
                      <strong className="text-teal-700">Prova real:</strong> {a.prova}
                    </span>
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Jornada */}
      <section className="container py-14 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Como funciona</p>
        <h2 className="mt-3 text-3xl font-bold">Da dor à decisão, em quatro movimentos</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {iaEmpresas.jornada.map((j) => (
            <div key={j.n} className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white p-6">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6b21a8,#14b8a6)] font-baloo text-base font-bold text-white">
                {j.n}
              </span>
              <h3 className="mt-4 text-base font-bold">{j.titulo}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-6 text-slate-500">{j.texto}</p>
              <Link
                href={j.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#6b21a8] hover:underline"
              >
                {j.cta}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Para quem + aviso honesto */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container grid gap-8 py-14 sm:py-16 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200/70 bg-[#f7f8fc] p-7">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600">Para quem</p>
            <ul className="mt-4 space-y-2.5">
              {iaEmpresas.paraQuem.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-teal-600" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-7">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
              <AlertTriangle className="size-4" />
              Orientação independente
            </p>
            <p className="mt-3 text-sm leading-7 text-amber-900">{iaEmpresas.avisoHonesto}</p>
          </div>
        </div>
      </section>

      {/* FAQ do comprador */}
      <section className="container py-14 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
          Perguntas de quem contrata
        </p>
        <h2 className="mt-3 text-3xl font-bold">As dúvidas que ouço das empresas</h2>
        <div className="mt-8 space-y-4">
          {iaEmpresas.faq.map((item) => (
            <details
              key={item.q}
              className="group rounded-3xl border border-slate-200/70 bg-white shadow-[0_10px_40px_rgba(26,19,51,0.06)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-left font-semibold text-[#1a1333] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[#6b21a8] transition group-open:rotate-180">
                  <ChevronDown className="size-4" />
                </span>
              </summary>
              <p className="px-6 pb-6 text-sm leading-7 text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="container pb-16">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0d1226]">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(20,184,166,0.35),rgba(13,18,38,0.9))]" />
          <div className="relative flex flex-col items-start gap-6 px-8 py-12 sm:py-14 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="max-w-xl font-baloo text-2xl font-bold text-white sm:text-3xl">
                Comece pela pergunta certa: qual dor a IA precisa resolver aí?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                O diagnóstico leva 3 minutos e devolve o estágio da sua empresa em 5 dimensões — com
                recomendações práticas na hora.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href="/diagnostico-ia"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#1a1333] transition hover:bg-teal-100"
              >
                <Gauge className="size-4" />
                Fazer o diagnóstico
              </Link>
              <Link
                href="/giselle/palestras#proposta"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Pedir proposta
              </Link>
            </div>
          </div>
        </div>
      </section>
    </GiselleLayout>
  );
}
