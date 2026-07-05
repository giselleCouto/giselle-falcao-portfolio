import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, BookOpen, Clock, Award } from "lucide-react";
import {
  catalogHero,
  catalogCourses,
  levelStyles,
} from "@/lib/courseCatalogData";
import { contact } from "@/lib/portfolioData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function CourseCatalog() {
  return (
    <main className="relative min-h-screen bg-[linear-gradient(180deg,#050608_0%,#090c11_38%,#0d1117_100%)] text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/8 bg-[#06070a]/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-4">
          <Link
            href="/giselle"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            <span className="font-display text-base tracking-tight">
              Giselle{" "}
              <span className="bg-[linear-gradient(90deg,#c4b5fd,#8b5cf6,#14b8a6)] bg-clip-text text-transparent">
                Falcão
              </span>
            </span>
          </Link>
          <span className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950">
            Área do Aluno
          </span>
        </div>
      </header>

      {/* Hero com foto */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0">
          <img
            src={catalogHero.photo}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,10,0.72),rgba(6,7,10,0.86)),radial-gradient(circle_at_15%_30%,rgba(107,33,168,0.35),transparent_45%),radial-gradient(circle_at_85%_20%,rgba(20,184,166,0.22),transparent_42%)]" />
        </div>

        <div className="container relative py-20 sm:py-24 lg:py-28">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-teal-300">
              {catalogHero.eyebrow}
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {catalogHero.titleLead}{" "}
              <span className="bg-[linear-gradient(90deg,#2dd4bf,#8b5cf6,#c4b5fd)] bg-clip-text text-transparent">
                {catalogHero.titleHighlight}
              </span>{" "}
              {catalogHero.titleTail}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              {catalogHero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grade de cursos */}
      <section className="container py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {catalogCourses.map((course, index) => (
            <motion.article
              key={course.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group flex flex-col overflow-hidden rounded-[1.6rem] border border-white/8 bg-white/[0.03] transition duration-300 hover:border-[var(--accent-purple)]/40 hover:bg-white/[0.05]"
            >
              {/* Capa */}
              <div className="relative flex h-44 items-center justify-center overflow-hidden bg-[linear-gradient(150deg,#12101f,#0a0e18)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.16),transparent_60%)]" />
                <BookOpen className="relative size-12 text-teal-300/70 transition duration-300 group-hover:scale-110 group-hover:text-teal-300" />
              </div>

              {/* Conteúdo */}
              <div className="flex flex-1 flex-col p-6">
                <span
                  className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[0.7rem] font-semibold ${levelStyles[course.level]}`}
                >
                  {course.level}
                </span>

                <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-white">
                  {course.title}
                </h2>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
                  {course.description}
                </p>

                <div className="mt-5 flex items-center gap-4 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {course.hours}
                  </span>
                  {course.certificate ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Award className="size-3.5 text-teal-300" />
                      Com certificado
                    </span>
                  ) : null}
                </div>

                <span className="mt-6 inline-flex w-fit cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-300">
                  Em breve
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © 2026 Giselle Falcão. Todos os direitos reservados.
          </p>
          <nav className="flex flex-wrap items-center gap-2">
            <Link
              href="/giselle"
              className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-slate-300 transition hover:text-white"
            >
              Portfólio
            </Link>
            <a
              href={contact.email}
              className="rounded-full border border-[var(--accent-purple)]/30 px-4 py-1.5 text-xs text-violet-300 transition hover:bg-[var(--accent-purple)]/10"
            >
              E-mail
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-emerald-400/30 px-4 py-1.5 text-xs text-emerald-300 transition hover:bg-emerald-400/10"
            >
              WhatsApp
            </a>
            <a
              href={contact.lattes}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-slate-300 transition hover:text-white"
            >
              Lattes
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
