import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Award, BookOpen, ClipboardList, Clock, Play, Trophy } from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { courses } from "@/lib/courses";
import { readCoursePercent } from "@/lib/courses/useCourseProgress";
import type { CourseLevel } from "@/lib/courses/types";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const levelChips: Record<CourseLevel, string> = {
  Iniciante: "bg-emerald-100 text-emerald-700",
  Intermediário: "bg-amber-100 text-amber-700",
  Avançado: "bg-rose-100 text-rose-700",
};

export default function CourseCatalog() {
  const progressBySlug = useMemo(() => {
    const map: Record<string, number> = {};
    for (const course of courses) map[course.slug] = readCoursePercent(course);
    return map;
  }, []);

  return (
    <GiselleLayout>
      {/* Hero com foto (estilo Base44) */}
      <section className="relative overflow-hidden bg-[#0d1226]">
        <img
          src="/cursos/hero-cursos.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,18,38,0.55),rgba(13,18,38,0.82))]" />
        <div className="container relative py-20 sm:py-24">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-teal-300">Educação</p>
            <h1 className="mt-4 max-w-3xl font-baloo text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Cursos{" "}
              <span className="bg-[linear-gradient(90deg,#2dd4bf,#8b5cf6,#c4b5fd)] bg-clip-text text-transparent">
                práticos
              </span>{" "}
              com certificação
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Do fundamento à aplicação real. Laboratórios interativos, quizzes e certificado ao concluir.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur">
                <Trophy className="size-4 text-amber-300" />
                Trilha gamificada: ganhe XP e conquistas
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur">
                <Award className="size-4 text-teal-300" />
                Certificado digital
              </span>
            </div>
            <Link
              href="/interesse"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-teal-300"
            >
              <ClipboardList className="size-4" />
              Diga o que você quer aprender (2 min)
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Grade de cursos */}
      <section className="container py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, index) => {
            const percent = progressBySlug[course.slug] ?? 0;
            return (
              <motion.article
                key={course.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_10px_40px_rgba(26,19,51,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(107,33,168,0.12)]"
              >
                {/* Capa */}
                <div className="relative flex h-36 items-center justify-center bg-[linear-gradient(140deg,#141a33,#0d1226)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.25),transparent_60%)]" />
                  <BookOpen className="relative size-11 text-teal-300 transition duration-300 group-hover:scale-110" />
                  {percent > 0 ? (
                    <span className="absolute right-3 top-3 rounded-full bg-teal-400 px-2.5 py-1 text-[0.65rem] font-bold text-slate-950">
                      {percent}% concluído
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${levelChips[course.level]}`}>
                      {course.level}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        course.free ? "bg-teal-100 text-teal-700" : "bg-violet-100 text-violet-700"
                      }`}
                    >
                      {course.free ? "Gratuito" : "Premium"}
                    </span>
                  </div>

                  <h2 className="mt-4 text-lg font-bold leading-snug">{course.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{course.tagline}</p>

                  <div className="mt-4 flex items-center gap-4 text-xs font-medium text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {course.hours}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Award className="size-3.5 text-teal-500" />
                      Certificado
                    </span>
                  </div>

                  {/* Progresso no card */}
                  {percent > 0 ? (
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#8b5cf6,#14b8a6)]"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  ) : null}

                  {course.status === "disponivel" ? (
                    <Link
                      href={`/giselle/cursos/${course.slug}`}
                      className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#1a1333] px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-[#6b21a8]"
                    >
                      <Play className="size-4" />
                      {percent > 0 ? "Continuar" : "Começar agora"}
                    </Link>
                  ) : (
                    <span className="mt-5 inline-flex w-fit items-center rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-400">
                      Em breve
                    </span>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </GiselleLayout>
  );
}
