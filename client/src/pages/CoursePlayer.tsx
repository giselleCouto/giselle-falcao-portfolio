import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CirclePlay,
  Clock,
  FlaskConical,
  GraduationCap,
  ListChecks,
  LockKeyhole,
  MessageCircle,
  Video,
} from "lucide-react";
import { getCourse } from "@/lib/courses";
import type { CourseModule, Lesson, QuizQuestion } from "@/lib/courses/types";
import { contact } from "@/lib/portfolioData";
import NotFound from "@/pages/NotFound";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const lessonIcons = {
  video: Video,
  leitura: BookOpen,
  pratica: FlaskConical,
  quiz: ListChecks,
} as const;

const lessonTypeLabels = {
  video: "Vídeo-aula",
  leitura: "Leitura",
  pratica: "Prática guiada",
  quiz: "Quiz",
} as const;

function ModuleQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce(
    (acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0),
    0,
  );
  const allAnswered = questions.every((_, i) => answers[i] !== undefined);

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => (
        <div key={qi} className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-6">
          <p className="text-sm font-semibold text-white">
            {qi + 1}. {q.prompt}
          </p>
          <div className="mt-4 space-y-2">
            {q.options.map((opt, oi) => {
              const chosen = answers[qi] === oi;
              const showState = submitted && chosen;
              const isCorrect = oi === q.correctIndex;
              return (
                <button
                  key={oi}
                  type="button"
                  disabled={submitted}
                  onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                  className={`block w-full rounded-[1rem] border px-4 py-3 text-left text-sm transition ${
                    showState
                      ? isCorrect
                        ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-100"
                        : "border-rose-400/50 bg-rose-400/10 text-rose-100"
                      : chosen
                        ? "border-[var(--accent-purple)]/50 bg-[var(--accent-purple)]/10 text-violet-100"
                        : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/25"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {submitted ? (
            <p
              className={`mt-4 text-sm leading-6 ${
                answers[qi] === q.correctIndex ? "text-emerald-200" : "text-rose-200"
              }`}
            >
              {answers[qi] === q.correctIndex ? "Correto! " : "Não foi dessa vez. "}
              <span className="text-slate-300">{q.explanation}</span>
            </p>
          ) : null}
        </div>
      ))}

      {submitted ? (
        <div className="rounded-[1.4rem] border border-[var(--accent-teal)]/25 bg-[var(--accent-teal)]/10 p-6 text-center">
          <p className="font-display text-2xl font-semibold text-white">
            {score} de {questions.length} corretas
          </p>
          <p className="mt-2 text-sm text-slate-300">
            {score === questions.length
              ? "Excelente! Você dominou este módulo."
              : "Revise as explicações acima e tente novamente quando quiser."}
          </p>
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
            }}
            className="mt-4 rounded-full border border-white/15 px-5 py-2 text-sm text-slate-200 transition hover:bg-white/10"
          >
            Refazer quiz
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={!allAnswered}
          onClick={() => setSubmitted(true)}
          className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {allAnswered ? "Corrigir respostas" : "Responda todas as perguntas para corrigir"}
        </button>
      )}
    </div>
  );
}

function LessonView({ lesson, module }: { lesson: Lesson; module: CourseModule }) {
  if (lesson.type === "quiz") {
    return module.quiz && module.quiz.length > 0 ? (
      <ModuleQuiz questions={module.quiz} />
    ) : (
      <PlaceholderPanel
        icon={ListChecks}
        title="Quiz em preparação"
        text="As perguntas deste módulo estão sendo finalizadas."
      />
    );
  }

  if (lesson.type === "video") {
    return (
      <div className="space-y-6">
        {lesson.videoUrl ? (
          <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-black">
            <div className="relative aspect-video">
              <iframe
                src={lesson.videoUrl}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        ) : (
          <PlaceholderPanel
            icon={CirclePlay}
            title="Aula em gravação"
            text="A Giselle está gravando esta aula. Enquanto isso, aproveite o resumo abaixo e os materiais do módulo."
          />
        )}

        {lesson.slidesUrl ? (
          <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-black">
            <div className="relative aspect-video">
              <iframe
                src={lesson.slidesUrl}
                title={`Slides — ${lesson.title}`}
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        ) : null}

        <p className="text-base leading-8 text-slate-300">{lesson.summary}</p>
      </div>
    );
  }

  if (lesson.type === "pratica") {
    return (
      <div className="space-y-6">
        <div className="rounded-[1.4rem] border border-[var(--accent-teal)]/25 bg-[var(--accent-teal)]/8 p-6">
          <div className="flex items-center gap-3">
            <FlaskConical className="size-5 text-teal-300" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">
              {lesson.practiceTool ?? "Prática guiada"} · 100% no navegador
            </p>
          </div>
          <p className="mt-4 text-base leading-8 text-slate-300">{lesson.summary}</p>
          {lesson.practiceUrl ? (
            <a
              href={lesson.practiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--accent-teal)] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
            >
              Abrir ambiente de prática
              <ChevronRight className="size-4" />
            </a>
          ) : (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-slate-400">
              Ambiente de prática em preparação
            </p>
          )}
        </div>
      </div>
    );
  }

  // leitura
  return (
    <div className="space-y-5">
      {(lesson.content ?? lesson.summary).split("\n\n").map((paragraph, i) => (
        <p key={i} className="text-base leading-8 text-slate-300">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function PlaceholderPanel({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof CirclePlay;
  title: string;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-[1.4rem] border border-dashed border-white/15 bg-white/[0.02] px-6 py-14 text-center">
      <Icon className="size-10 text-violet-300/70" />
      <p className="mt-4 font-display text-xl font-semibold text-white">{title}</p>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

export default function CoursePlayer({ slug }: { slug: string }) {
  const course = getCourse(slug);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  const activeModule = useMemo(() => {
    if (!course) return null;
    return course.modules.find((m) => m.id === activeModuleId) ?? course.modules[0] ?? null;
  }, [course, activeModuleId]);

  if (!course || course.status !== "disponivel") {
    return <NotFound />;
  }

  const moduleUnlocked = course.free || (activeModule?.free ?? false);
  const activeLesson = activeModule?.lessons[activeLessonIndex] ?? activeModule?.lessons[0] ?? null;

  return (
    <main className="relative min-h-screen bg-[linear-gradient(180deg,#050608_0%,#090c11_38%,#0d1117_100%)] text-slate-100">
      <header className="sticky top-0 z-20 border-b border-white/8 bg-[#06070a]/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-4">
          <Link
            href="/giselle/cursos"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Todos os cursos
          </Link>
          <span
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${
              course.free
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                : "border-amber-400/30 bg-amber-400/10 text-amber-200"
            }`}
          >
            {course.free ? "Curso gratuito" : "Curso premium"}
          </span>
        </div>
      </header>

      {/* Hero do curso */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(107,33,168,0.28),transparent_45%),radial-gradient(circle_at_88%_15%,rgba(20,184,166,0.16),transparent_40%)]" />
        <div className="container relative py-14 sm:py-16">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }}>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-teal-300">
              {course.level} · {course.hours} · Com certificado
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {course.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{course.tagline}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:max-w-3xl">
              {course.outcomes.slice(0, 4).map((outcome) => (
                <div key={outcome} className="flex items-start gap-3 rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-300" />
                  <p className="text-sm leading-6 text-slate-300">{outcome}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Player: módulos + aula ativa */}
      <section className="container grid gap-8 py-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Navegação de módulos */}
        <div className="space-y-3">
          {course.modules.map((module, mi) => {
            const unlocked = course.free || module.free;
            const isActive = module.id === (activeModule?.id ?? "");
            return (
              <div
                key={module.id}
                className={`overflow-hidden rounded-[1.4rem] border transition ${
                  isActive
                    ? "border-[var(--accent-purple)]/40 bg-[var(--accent-purple)]/8"
                    : "border-white/8 bg-white/[0.02]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveModuleId(module.id);
                    setActiveLessonIndex(0);
                  }}
                  className="flex w-full items-start justify-between gap-3 px-5 py-4 text-left"
                >
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Módulo {mi + 1} · {module.duration}
                    </p>
                    <p className="mt-1.5 text-sm font-semibold text-white">{module.title}</p>
                  </div>
                  {unlocked ? (
                    <ChevronRight className={`mt-1 size-4 shrink-0 text-slate-500 transition ${isActive ? "rotate-90 text-violet-300" : ""}`} />
                  ) : (
                    <LockKeyhole className="mt-1 size-4 shrink-0 text-amber-300/80" />
                  )}
                </button>

                {isActive && unlocked ? (
                  <div className="border-t border-white/8 px-3 pb-3 pt-2">
                    {module.lessons.map((lesson, li) => {
                      const Icon = lessonIcons[lesson.type];
                      const selected = li === activeLessonIndex;
                      return (
                        <button
                          key={li}
                          type="button"
                          onClick={() => setActiveLessonIndex(li)}
                          className={`flex w-full items-center gap-3 rounded-[1rem] px-3 py-2.5 text-left text-sm transition ${
                            selected ? "bg-white/8 text-white" : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                          }`}
                        >
                          <Icon className={`size-4 shrink-0 ${selected ? "text-teal-300" : ""}`} />
                          <span className="flex-1">{lesson.title}</span>
                          <span className="text-xs text-slate-500">{lesson.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                {isActive && !unlocked ? (
                  <div className="border-t border-white/8 px-5 py-5">
                    <p className="text-sm leading-6 text-slate-400">
                      Este módulo faz parte do conteúdo premium. Garanta sua vaga e libere a trilha completa com certificado.
                    </p>
                    <a
                      href={contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/90 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
                    >
                      <MessageCircle className="size-4" />
                      Quero me matricular
                    </a>
                  </div>
                ) : null}
              </div>
            );
          })}

          {/* Biblioteca de prática */}
          {course.library.length > 0 ? (
            <div className="mt-6 rounded-[1.4rem] border border-[var(--accent-teal)]/20 bg-[var(--accent-teal)]/5 p-5">
              <div className="flex items-center gap-2">
                <FlaskConical className="size-4 text-teal-300" />
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-teal-200">
                  Biblioteca de prática
                </p>
              </div>
              <div className="mt-4 space-y-3">
                {course.library.map((resource) => (
                  <div key={resource.title} className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-3">
                    <p className="text-sm font-semibold text-white">{resource.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{resource.description}</p>
                    {resource.url ? (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-teal-300 hover:text-teal-200"
                      >
                        Abrir {resource.tool}
                        <ChevronRight className="size-3" />
                      </a>
                    ) : (
                      <p className="mt-2 text-xs text-slate-500">Em preparação</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Aula ativa */}
        <div className="min-w-0">
          {activeModule && activeLesson && moduleUnlocked ? (
            <motion.div
              key={`${activeModule.id}-${activeLessonIndex}`}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.4 }}
              className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[var(--accent-purple)]/30 bg-[var(--accent-purple)]/10 px-3 py-1 text-[0.7rem] font-semibold text-violet-200">
                  {lessonTypeLabels[activeLesson.type]}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="size-3.5" />
                  {activeLesson.duration}
                </span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
                {activeLesson.title}
              </h2>
              <div className="mt-6">
                <LessonView lesson={activeLesson} module={activeModule} />
              </div>

              {/* Navegação entre aulas */}
              <div className="mt-8 flex items-center justify-between border-t border-white/8 pt-6">
                <button
                  type="button"
                  disabled={activeLessonIndex === 0}
                  onClick={() => setActiveLessonIndex((i) => Math.max(0, i - 1))}
                  className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Aula anterior
                </button>
                <button
                  type="button"
                  disabled={activeLessonIndex >= activeModule.lessons.length - 1}
                  onClick={() =>
                    setActiveLessonIndex((i) => Math.min(activeModule.lessons.length - 1, i + 1))
                  }
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-violet-200 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Próxima aula
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-8">
              <PlaceholderPanel
                icon={GraduationCap}
                title="Conteúdo premium"
                text="Selecione um módulo liberado na coluna ao lado, ou garanta sua matrícula para acessar a trilha completa."
              />
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-white/8">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="text-sm text-slate-500">© 2026 Giselle Falcão. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Award className="size-4 text-teal-300" />
            Certificado digital ao concluir todas as aulas
          </div>
        </div>
      </footer>
    </main>
  );
}
