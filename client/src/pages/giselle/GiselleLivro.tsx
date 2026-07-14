import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  FileText,
  GraduationCap,
  Mail,
  MessageCircle,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { livro } from "@/lib/livroData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const pillarIcons = {
  target: Target,
  route: Route,
  "bar-chart": BarChart3,
  "shield-check": ShieldCheck,
} as const;

export default function GiselleLivro() {
  return (
    <GiselleLayout>
      {/* Hero: capa + apresentação */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(107,33,168,0.1),transparent_45%),radial-gradient(circle_at_85%_30%,rgba(20,184,166,0.08),transparent_45%)]" />
        <div className="container relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Capa */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-xs"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-[linear-gradient(135deg,#6b21a8,#8b5cf6,#14b8a6)] opacity-20 blur-2xl" />
              <img
                src={livro.cover}
                alt={`Capa do livro ${livro.title}, de ${livro.author}`}
                className="relative w-full rounded-2xl border border-slate-200/70 shadow-[0_25px_70px_rgba(26,19,51,0.25)]"
              />
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#6b21a8]">
              <Sparkles className="size-3.5" />
              Livro · {livro.publisher} · {livro.year}
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl">
              {livro.title}
            </h1>
            <p className="mt-3 text-lg font-semibold text-[#6b21a8]">{livro.subtitle}</p>
            <p className="mt-5 max-w-xl leading-8 text-slate-500">{livro.pitch}</p>

            {/* Botões oficiais */}
            <div className="mt-8 flex flex-wrap gap-3">
              {livro.links.map((link) =>
                link.href ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      link.kind === "primary"
                        ? "inline-flex items-center gap-2 rounded-full bg-[#1a1333] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6b21a8]"
                        : "inline-flex items-center gap-2 rounded-full border-2 border-violet-200 px-6 py-3 text-sm font-semibold text-[#6b21a8] transition hover:bg-violet-50"
                    }
                  >
                    {link.label}
                    <ArrowUpRight className="size-4" />
                  </a>
                ) : null,
              )}
            </div>

            {/* Ficha rápida */}
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
              {[
                { t: "Edição", v: `${livro.edition} · ${livro.pages}p` },
                { t: "ISBN (impresso)", v: livro.isbnPrint },
                { t: "ISBN (digital)", v: livro.isbnDigital },
                { t: "DOI", v: livro.doi },
                { t: "Publicação", v: `${livro.place} · ${livro.year}` },
                { t: "Editora", v: livro.publisher },
              ].map((item) => (
                <div key={item.t}>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.t}</dt>
                  <dd className="mt-0.5 font-medium text-[#1a1333] break-words">{item.v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      {/* Pilares */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-16 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">O que é a CEOD</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold">
            {livro.ceodMeaning}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {livro.pillars.map((pillar, i) => {
              const Icon = pillarIcons[pillar.icon as keyof typeof pillarIcons] ?? Target;
              return (
                <motion.div
                  key={pillar.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-[#f7f8fc] p-6"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-violet-100 text-[#6b21a8]">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold leading-snug">{pillar.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{pillar.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fundamentos científicos (chips) */}
      <section className="container py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Fundamentos científicos</p>
        <h2 className="mt-3 text-3xl font-bold">Rigor de ponta a ponta</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {livro.foundations.map((f) => (
            <span
              key={f}
              className="rounded-full border border-violet-200 bg-violet-50 px-5 py-2.5 text-sm font-semibold text-[#6b21a8]"
            >
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* Faixa: dossiê educacional para secretarias */}
      <section className="container pb-16 sm:pb-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-[#0d1226]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(107,33,168,0.5),rgba(13,18,38,0.9))]" />
          <div className="relative grid gap-8 px-8 py-12 sm:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur">
                <GraduationCap className="size-3.5" />
                Para secretarias, escolas e editais
              </p>
              <h2 className="mt-4 font-baloo text-2xl font-bold text-white sm:text-3xl">
                Dossiê educacional da Metodologia CEOD
              </h2>
              <p className="mt-3 max-w-xl leading-7 text-slate-300">
                Material técnico para redes de ensino, gestores públicos e submissão a editais:
                fundamentação, evidências de impacto e caminho de implementação.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/giselle/livro/dossie"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#1a1333] transition hover:bg-violet-100"
              >
                <FileText className="size-4" />
                Ver o dossiê
              </Link>
              <a
                href={livro.publisherContact.email}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <Mail className="size-4" />
                Falar com a editora
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Onde adquirir */}
      <section className="container pb-20">
        <div className="rounded-3xl border border-slate-200/70 bg-white p-8 text-center shadow-[0_10px_40px_rgba(26,19,51,0.06)]">
          <BookOpen className="mx-auto size-8 text-[#6b21a8]" />
          <h2 className="mt-4 text-2xl font-bold">Onde adquirir</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            A obra está disponível pela {livro.publisher}. Para aquisição institucional ou em lote,
            fale diretamente com a editora.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="https://www.editorasorian.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1a1333] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6b21a8]"
            >
              Site da Editora Sorian
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={livro.publisherContact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-200 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              <MessageCircle className="size-4" />
              WhatsApp da editora
            </a>
          </div>
        </div>
      </section>
    </GiselleLayout>
  );
}
