import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Award, BookOpen, ClipboardList, Clock, Play, Route as RouteIcon, Trophy } from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { courses } from "@/lib/courses";
import { readCoursePercent } from "@/lib/courses/useCourseProgress";
import type { CourseLevel } from "@/lib/courses/types";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
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
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.3 }}>
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

      {/* Banner: trilhas de carreira */}
      <section className="container pt-12">
        <Link
          href="/giselle/trilhas"
          className="group flex flex-col items-start gap-4 rounded-3xl border-2 border-violet-200 bg-white p-6 shadow-[0_10px_40px_rgba(26,19,51,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-[#8b5cf6] hover:shadow-[0_18px_50px_rgba(107,33,168,0.14)] sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6b21a8,#14b8a6)] text-white">
              <RouteIcon className="size-6" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6b21a8]">
                Não sabe por onde começar?
              </p>
              <p className="mt-1 font-baloo text-lg font-bold text-[#1a1333]">
                Trilhas de carreira: Analista → Cientista → Arquiteto de Soluções, Dados & IA
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1a1333] px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-[#6b21a8]">
            Escolher minha trilha
          </span>
        </Link>

        {/* Kit da palestra "Quem está aprendendo a dirigir?" */}
        <Link
          href="/kit"
          className="group mt-4 flex flex-col items-start gap-4 rounded-3xl border-2 border-slate-800 bg-[#050608] p-6 shadow-[0_10px_40px_rgba(5,6,8,0.25)] transition duration-300 hover:-translate-y-0.5 hover:border-[#C9F31D] sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#C9F31D] font-baloo text-xl font-bold text-[#050608]">
              4M
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9F31D]">
                Veio da palestra sobre agentes de IA?
              </p>
              <p className="mt-1 font-baloo text-lg font-bold text-white">
                Kit do Agente: “Quem está aprendendo a dirigir?” — 3 ferramentas, sem cadastro
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#C9F31D] px-5 py-2.5 text-sm font-semibold text-[#050608] transition group-hover:brightness-110">
            Abrir o kit
          </span>
        </Link>
      </section>

      {/* Comece gratuitamente */}
      <section className="container pt-10">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Comece gratuitamente</p>
        <h2 className="mt-2 font-baloo text-2xl font-bold text-[#1a1333]">Cursos gratuitos</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.filter((c) => c.free && c.publico !== "empresas").sort((a, b) => Number(a.conteudo === "em-producao") - Number(b.conteudo === "em-producao")).map((course, index) => {
            const percent = progressBySlug[course.slug] ?? 0;
            return (
              <CourseCard key={course.slug} course={course} percent={percent} index={index} />
            );
          })}
        </div>
      </section>

      {/* Aprofunde sua formação */}
      <section className="container py-10 sm:py-12">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6b21a8]">Aprofunde sua formação</p>
        <h2 className="mt-2 font-baloo text-2xl font-bold text-[#1a1333]">Cursos Premium</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          As formações aprofundadas estão com o conteúdo em produção. Entre na lista de aviso e seja
          a primeira pessoa a saber do lançamento — sem compromisso.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.filter((c) => !c.free && c.publico !== "empresas").map((course, index) => {
            const percent = progressBySlug[course.slug] ?? 0;
            return (
              <CourseCard key={course.slug} course={course} percent={percent} index={index} />
            );
          })}
        </div>
      </section>

      {/* Programas Executivos NOKAHI Edu (corporativos: turma fechada, sob proposta) */}
      {courses.some((c) => c.publico === "empresas") ? (
        <section className="border-t border-slate-200/70 bg-[#f7f8fc]">
          <div className="container py-10 sm:py-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0f766e]">Para empresas</p>
            <h2 className="mt-2 font-baloo text-2xl font-bold text-[#1a1333]">Programas Executivos NOKAHI Edu</h2>
            <p className="mt-1 text-sm font-semibold text-[#0f766e]">Conduzidos por Giselle Falcão</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Formações para lideranças e equipes, em turmas fechadas: videoaulas curtas, encontros ao vivo
              e um projeto aplicado à realidade da sua empresa. Adaptamos ao seu setor, e o investimento é sob proposta.
            </p>
            <Link
              href="/giselle/programas-executivos"
              className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-teal-200 bg-white px-5 py-2.5 text-sm font-bold text-[#0f766e] transition hover:border-[#0f766e]"
            >
              Conheça os Programas Executivos: qual serve para cada equipe
            </Link>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.filter((c) => c.publico === "empresas").map((course, index) => (
                <CourseCard key={course.slug} course={course} percent={0} index={index} />
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-xs leading-5 text-slate-400">
              Cursos livres de capacitação profissional, nos termos da Lei nº 9.394/96 (LDB) e do Decreto nº 5.154/2004 — não sujeitos a autorização do MEC.
            </p>
          </div>
        </section>
      ) : null}
    </GiselleLayout>
  );
}

function CourseCard({ course, percent, index }: { course: (typeof courses)[number]; percent: number; index: number }) {
  const emProducao = course.conteudo === "em-producao";
  const empresas = course.publico === "empresas";
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
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
                        empresas ? "bg-cyan-100 text-cyan-800" : course.free ? "bg-teal-100 text-teal-700" : "bg-violet-100 text-violet-700"
                      }`}
                    >
                      {empresas
                        ? "NOKAHI Edu · sob proposta"
                        : course.free
                          ? (emProducao ? "Gratuito · em produção" : "Gratuito · acesso imediato")
                          : "Premium · em produção"}
                    </span>
                  </div>

                  <h2 className="mt-4 text-lg font-bold leading-snug">{course.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{course.tagline}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    <b className="text-slate-500">Pré-requisitos:</b>{" "}
                    {course.prerequisites.split(".")[0]}.
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-xs font-medium text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {course.hours} estimadas
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

                  {empresas ? (
                    <div className="mt-5 flex flex-col gap-2">
                      <Link
                        href={`/giselle/programas-executivos?src=curso&c=${course.slug}&programa=${course.slug}#proposta`}
                        className="inline-flex w-fit items-center gap-2 rounded-full bg-[#1a1333] px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-[#0f766e]"
                      >
                        Solicitar proposta
                      </Link>
                      <Link
                        href={`/giselle/cursos/${course.slug}`}
                        className="text-xs font-semibold text-slate-400 underline-offset-2 hover:text-[#0f766e] hover:underline"
                      >
                        Ver o programa completo
                      </Link>
                    </div>
                  ) : emProducao ? (
                    <div className="mt-5 flex flex-col gap-2">
                      <Link
                        href={`/interesse?src=aviso-${course.slug}`}
                        className="inline-flex w-fit items-center gap-2 rounded-full bg-[#1a1333] px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-[#6b21a8]"
                      >
                        Receber aviso de lançamento
                      </Link>
                      <Link
                        href={`/giselle/cursos/${course.slug}`}
                        className="text-xs font-semibold text-slate-400 underline-offset-2 hover:text-[#6b21a8] hover:underline"
                      >
                        Ver o programa completo
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={`/giselle/cursos/${course.slug}`}
                      className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#1a1333] px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-[#6b21a8]"
                    >
                      <Play className="size-4" />
                      {percent > 0 ? "Continuar" : "Acessar gratuitamente"}
                    </Link>
                  )}
                </div>
              </motion.article>
  );
}
