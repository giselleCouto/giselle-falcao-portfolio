import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Mail,
  MessageCircle,
  Printer,
  Quote,
} from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { dossie, livro } from "@/lib/livroData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{title}</h2>
    </>
  );
}

export default function GiselleDossie() {
  return (
    <GiselleLayout>
      {/* Cabeçalho do dossiê */}
      <section className="border-b border-slate-200/70 bg-white">
        <div className="container py-10 sm:py-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/giselle/livro"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#6b21a8]"
            >
              <ArrowLeft className="size-4" />
              Página do livro
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border-2 border-violet-200 px-5 py-2.5 text-sm font-semibold text-[#6b21a8] transition hover:bg-violet-50"
            >
              <Printer className="size-4" />
              Imprimir / salvar em PDF
            </button>
          </div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5 }} className="mt-8">
            <p className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#6b21a8]">
              <Building2 className="size-3.5" />
              Dossiê educacional · {dossie.updatedAt}
            </p>
            <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
              Metodologia CEOD — recomposição da aprendizagem orientada por dados
            </h1>
            <p className="mt-4 max-w-2xl text-xs font-medium uppercase tracking-wider text-slate-400">
              Material técnico para secretarias, escolas e submissão a editais · {livro.author} ·{" "}
              {livro.publisher}, {livro.year} · ISBN {livro.isbnDigital} · DOI {livro.doi}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sumário executivo */}
      <section className="container py-14">
        <div className="rounded-3xl border-l-4 border-l-[#6b21a8] border-y border-r border-slate-200/70 bg-white p-7 shadow-[0_10px_40px_rgba(26,19,51,0.06)]">
          <div className="flex items-center gap-2">
            <Quote className="size-5 text-[#6b21a8]" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6b21a8]">Sumário executivo</p>
          </div>
          <p className="mt-4 text-lg leading-8 text-[#1a1333]">{dossie.executiveSummary}</p>
        </div>
      </section>

      {/* O problema */}
      <section className="container pb-14">
        <SectionTitle eyebrow="O problema" title="Uma crise estrutural e mensurável" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {dossie.problem.map((p, i) => (
            <motion.div
              key={p.stat}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="rounded-3xl border border-slate-200/70 bg-white p-6"
            >
              <p className="font-baloo text-xl font-bold text-[#6b21a8]">{p.stat}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">{p.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-14 sm:py-16">
          <SectionTitle eyebrow="A metodologia" title="Do diagnóstico à recomposição, em 4 etapas" />
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {dossie.method.map((m, i) => (
              <motion.div
                key={m.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="relative rounded-3xl border border-slate-200/70 bg-[#f7f8fc] p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6b21a8,#14b8a6)] font-baloo text-lg font-bold text-white">
                  {m.step}
                </span>
                <h3 className="mt-4 text-base font-bold leading-snug">{m.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{m.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidências de impacto */}
      <section className="container py-14 sm:py-16">
        <SectionTitle eyebrow="Evidências de impacto" title="Validação empírica em larga escala" />
        <p className="mt-4 max-w-3xl leading-7 text-slate-500">{dossie.evidence.context}</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dossie.evidence.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="rounded-3xl bg-[#0d1226] p-6"
            >
              <p className="font-baloo text-3xl font-bold text-teal-300">{m.value}</p>
              <p className="mt-2 text-sm leading-5 text-slate-300">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Equidade */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {dossie.evidence.equity.map((e) => (
            <div key={e.title} className="rounded-3xl border border-slate-200/70 bg-white p-6">
              <BadgeCheck className="size-6 text-teal-600" />
              <h3 className="mt-3 text-base font-bold leading-snug">{e.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{e.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 rounded-2xl bg-slate-100 p-5 text-xs leading-6 text-slate-500">
          <strong className="text-slate-600">Nota metodológica.</strong> {dossie.evidence.disclaimer}
        </p>
      </section>

      {/* Alinhamento a políticas públicas */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-14 sm:py-16">
          <SectionTitle eyebrow="Aderência" title="Alinhamento a políticas públicas e editais" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {dossie.alignment.map((a) => (
              <div key={a} className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-[#f7f8fc] px-5 py-4">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#6b21a8]" />
                <p className="text-sm leading-6 text-[#1a1333]">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A quem se destina */}
      <section className="container py-14">
        <SectionTitle eyebrow="Público" title="A quem se destina este dossiê" />
        <div className="mt-8 flex flex-wrap gap-3">
          {dossie.audience.map((a) => (
            <span
              key={a}
              className="rounded-full border border-violet-200 bg-violet-50 px-5 py-2.5 text-sm font-semibold text-[#6b21a8]"
            >
              {a}
            </span>
          ))}
        </div>
      </section>

      {/* CTA de contato institucional */}
      <section className="container pb-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0d1226]">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(107,33,168,0.5),rgba(13,18,38,0.9))]" />
          <div className="relative flex flex-col items-center gap-6 px-8 py-14 text-center">
            <h2 className="max-w-xl font-baloo text-2xl font-bold text-white sm:text-3xl">
              Levar a CEOD para a sua rede de ensino
            </h2>
            <p className="max-w-lg text-sm leading-7 text-slate-300">
              Para apresentação técnica, projeto-piloto ou composição de proposta a edital, fale com a
              autora ou com a editora.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/giselle/contato"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1a1333] transition hover:bg-violet-100"
              >
                <MessageCircle className="size-4" />
                Falar com a autora
              </Link>
              <a
                href={livro.publisherContact.email}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <Mail className="size-4" />
                Contato da editora
              </a>
            </div>
          </div>
        </div>
      </section>
    </GiselleLayout>
  );
}
