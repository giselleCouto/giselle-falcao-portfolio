import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  Route as RouteIcon,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { getCourse } from "@/lib/courses";
import { escadaCarreira, type TrilhaCarreira } from "@/lib/trilhasCarreiraData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function GiselleTrilhaCarreira({ trilha }: { trilha: TrilhaCarreira }) {
  const cursos = trilha.etapas
    .map((etapa) => ({ etapa, course: getCourse(etapa.courseSlug) }))
    .filter((item) => item.course);
  const totalHoras = cursos.reduce(
    (sum, item) => sum + Number((item.course?.hours ?? "0").replace(/\D/g, "")),
    0
  );
  const proxima = escadaCarreira.find((d) => d.ordem === trilha.ordem + 1);

  return (
    <GiselleLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0d1226]">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 15% 25%, ${trilha.cores.de}44, transparent 50%), radial-gradient(circle at 85% 20%, ${trilha.cores.para}33, transparent 45%)`,
          }}
        />
        <div className="container relative py-16 sm:py-20">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }}>
            <p
              className={`inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur ${trilha.cores.chip}`}
            >
              <RouteIcon className="size-3.5" />
              Trilha de carreira · Degrau {trilha.ordem} de {escadaCarreira.length}
            </p>
            <h1 className="mt-5 max-w-3xl font-baloo text-4xl font-bold leading-[1.05] text-white sm:text-5xl">
              {trilha.cargo}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{trilha.tagline}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {[`${cursos.length} cursos · ${totalHoras}h`, "Prática no navegador", "Certificado por curso", "Comece grátis hoje"].map(
                (chip) => (
                  <span key={chip} className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur">
                    {chip}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* O que faz + para quem */}
      <section className="container grid gap-8 py-14 sm:py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">A profissão</p>
          <h2 className="mt-3 text-3xl font-bold">O que faz um(a) {trilha.cargo}?</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">{trilha.descricao}</p>
          <ul className="mt-6 space-y-2.5">
            {trilha.rotinas.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
                <Target className="mt-1 size-4 shrink-0 text-teal-600" />
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600">Para quem é</p>
            <ul className="mt-4 space-y-2.5">
              {trilha.paraQuem.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-teal-600" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#6b21a8]">Pré-requisitos</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{trilha.requisitos}</p>
          </div>
        </div>
      </section>

      {/* Etapas */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-14 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Passo a passo</p>
          <h2 className="mt-3 text-3xl font-bold">As etapas, na ordem certa</h2>
          <div className="mt-10 space-y-6">
            {cursos.map(({ etapa, course }, i) => (
              <motion.div
                key={etapa.courseSlug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="grid gap-6 rounded-3xl border border-slate-200/70 bg-[#f7f8fc] p-7 lg:grid-cols-[auto_1fr_auto] lg:items-center"
              >
                <span
                  className="flex size-12 shrink-0 items-center justify-center rounded-2xl font-baloo text-lg font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${trilha.cores.de}, ${trilha.cores.para})` }}
                >
                  {i + 1}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-baloo text-xl font-bold">{course!.title}</h3>
                    {course!.free ? (
                      <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-bold text-teal-700">Gratuito</span>
                    ) : (
                      <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-bold text-[#6b21a8]">Premium</span>
                    )}
                    <span className="text-xs font-semibold text-slate-400">
                      {course!.level} · {course!.hours}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{etapa.porque}</p>
                  <p className="mt-2 flex items-start gap-2 text-sm font-medium leading-6 text-[#1a1333]">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-teal-600" />
                    {etapa.entrega}
                  </p>
                </div>
                <Link
                  href={`/giselle/cursos/${course!.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-violet-200 px-5 py-2.5 text-sm font-bold text-[#6b21a8] transition hover:bg-violet-50"
                >
                  <BookOpen className="size-4" />
                  Ver curso
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competências + ferramentas */}
      <section className="container grid gap-8 py-14 sm:py-16 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200/70 bg-white p-7">
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-teal-600">
            <Sparkles className="size-4" />
            Ao concluir, você saberá
          </p>
          <ul className="mt-4 space-y-2.5">
            {trilha.competencias.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-teal-600" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200/70 bg-white p-7">
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#6b21a8]">
            <Wrench className="size-4" />
            Ferramentas que você vai dominar
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {trilha.ferramentas.map((f) => (
              <span key={f} className="rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-[#6b21a8]">
                {f}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-500">
            Tudo roda no navegador, em versões gratuitas — nenhuma instalação e nenhum cartão de crédito para começar.
          </p>
        </div>
      </section>

      {/* Compromisso com a verdade */}
      <section className="container pb-14">
        <div className="flex items-start gap-4 rounded-3xl border-2 border-amber-200 bg-amber-50 p-6">
          <AlertTriangle className="mt-1 size-6 shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Compromisso com a verdade</p>
            <p className="mt-2 text-sm leading-7 text-amber-900">{trilha.disclaimer}</p>
          </div>
        </div>
      </section>

      {/* CTA: começar + próxima trilha */}
      <section className="container pb-16">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0d1226]">
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(120deg, ${trilha.cores.de}55, rgba(13,18,38,0.92))` }}
          />
          <div className="relative grid gap-6 px-8 py-12 sm:py-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <h2 className="font-baloo text-2xl font-bold text-white sm:text-3xl">
                Comece agora pela etapa 1 — ela é gratuita.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                {proxima
                  ? `E quando concluir esta trilha, o próximo degrau da escada já estará esperando: ${proxima.cargo}.`
                  : "Você estará no degrau mais alto da escada de carreira da plataforma."}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {cursos[0] ? (
                <Link
                  href={`/giselle/cursos/${cursos[0].course!.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#1a1333] transition hover:bg-teal-100"
                >
                  Começar a trilha grátis
                  <ArrowRight className="size-4" />
                </Link>
              ) : null}
              {proxima ? (
                <Link
                  href={proxima.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Conhecer a próxima trilha
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </GiselleLayout>
  );
}
