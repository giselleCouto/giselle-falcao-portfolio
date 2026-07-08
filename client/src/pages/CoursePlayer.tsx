import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CirclePlay,
  FlaskConical,
  ListChecks,
  LockKeyhole,
  MessageCircle,
  PartyPopper,
  Sparkles,
  Star,
  Trophy,
  Video,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import StudentGate from "@/components/giselle/StudentGate";
import { useStudentProfile } from "@/lib/courses/useStudentProfile";
import { getCourse } from "@/lib/courses";
import type { CourseModule, Lesson, QuizQuestion } from "@/lib/courses/types";
import {
  QUIZ_PASS_PERCENT,
  XP_PER_LESSON,
  XP_PER_QUIZ,
  useCourseProgress,
} from "@/lib/courses/useCourseProgress";
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

/** Anel de progresso do módulo (SVG). */
function ProgressRing({ percent, done }: { percent: number; done: boolean }) {
  const r = 15;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative inline-flex size-10 shrink-0 items-center justify-center">
      <svg viewBox="0 0 36 36" className="size-10 -rotate-90">
        <circle cx="18" cy="18" r={r} fill="none" stroke="#ede9fe" strokeWidth="4" />
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          stroke={done ? "#14b8a6" : "#8b5cf6"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * percent) / 100}
          className="transition-all duration-500"
        />
      </svg>
      <span className="absolute text-[0.6rem] font-bold text-[#1a1333]">
        {done ? <Star className="size-4 fill-amber-400 text-amber-400" /> : `${percent}%`}
      </span>
    </span>
  );
}

/** Explosão de celebração ao ganhar recompensa. */
function Celebration({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.45 }}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-3 rounded-3xl bg-white/95 px-10 py-8 shadow-[0_25px_80px_rgba(107,33,168,0.25)] backdrop-blur">
            <motion.div
              animate={{ rotate: [0, -12, 12, 0], scale: [1, 1.25, 1] }}
              transition={{ duration: 0.7 }}
            >
              <PartyPopper className="size-12 text-[#8b5cf6]" />
            </motion.div>
            <p className="font-baloo text-xl font-bold text-[#1a1333]">Conquista desbloqueada!</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ModuleQuiz({
  questions,
  onResult,
}: {
  questions: QuizQuestion[];
  onResult: (percent: number) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0);
  const allAnswered = questions.every((_, i) => answers[i] !== undefined);
  const percent = Math.round((score / questions.length) * 100);

  return (
    <div className="space-y-5">
      {questions.map((q, qi) => (
        <div key={qi} className="rounded-3xl border border-slate-200/70 bg-white p-6">
          <p className="text-sm font-bold text-[#1a1333]">
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
                  className={`block w-full rounded-2xl border-2 px-4 py-3 text-left text-sm font-medium transition ${
                    showState
                      ? isCorrect
                        ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                        : "border-rose-300 bg-rose-50 text-rose-700"
                      : chosen
                        ? "border-[#8b5cf6] bg-violet-50 text-[#6b21a8]"
                        : "border-slate-200 text-slate-600 hover:border-violet-300 hover:bg-violet-50/50"
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
                answers[qi] === q.correctIndex ? "text-emerald-700" : "text-rose-600"
              }`}
            >
              {answers[qi] === q.correctIndex ? "Correto! " : "Quase! "}
              <span className="text-slate-500">{q.explanation}</span>
            </p>
          ) : null}
        </div>
      ))}

      {submitted ? (
        <div
          className={`rounded-3xl border-2 p-6 text-center ${
            percent >= QUIZ_PASS_PERCENT ? "border-teal-300 bg-teal-50" : "border-amber-200 bg-amber-50"
          }`}
        >
          <p className="font-baloo text-3xl font-bold text-[#1a1333]">
            {score}/{questions.length}
          </p>
          <p className="mt-1 text-sm font-medium text-slate-600">
            {percent >= QUIZ_PASS_PERCENT
              ? `Você passou! +${XP_PER_QUIZ} XP adicionados à sua trilha.`
              : `Você precisa de ${QUIZ_PASS_PERCENT}% para ganhar o XP. Revise e tente de novo!`}
          </p>
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
            }}
            className="mt-4 rounded-full border-2 border-violet-200 px-5 py-2 text-sm font-semibold text-[#6b21a8] transition hover:bg-violet-50"
          >
            Refazer quiz
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={!allAnswered}
          onClick={() => {
            setSubmitted(true);
            onResult(percent);
          }}
          className="w-full rounded-full bg-[#1a1333] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#6b21a8] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {allAnswered ? "Corrigir respostas ✨" : "Responda tudo para corrigir"}
        </button>
      )}
    </div>
  );
}

function LessonView({
  lesson,
  module,
  onQuizResult,
}: {
  lesson: Lesson;
  module: CourseModule;
  onQuizResult: (percent: number) => void;
}) {
  if (lesson.type === "quiz") {
    return module.quiz && module.quiz.length > 0 ? (
      <ModuleQuiz questions={module.quiz} onResult={onQuizResult} />
    ) : (
      <Placeholder icon={ListChecks} title="Quiz em preparação" text="As perguntas deste módulo estão sendo finalizadas." />
    );
  }

  if (lesson.type === "video") {
    return (
      <div className="space-y-5">
        {lesson.videoUrl ? (
          <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-black">
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
          <Placeholder
            icon={CirclePlay}
            title="Aula em gravação"
            text="A Giselle está gravando esta aula. Aproveite o resumo e os materiais do módulo."
          />
        )}
        {lesson.slidesUrl ? (
          <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-black">
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
        <p className="text-base leading-8 text-slate-600">{lesson.summary}</p>
      </div>
    );
  }

  if (lesson.type === "pratica") {
    return (
      <div className="rounded-3xl border-2 border-teal-200 bg-teal-50/60 p-6">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
            <FlaskConical className="size-6" />
          </span>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
            {lesson.practiceTool ?? "Prática"} · 100% no navegador
          </p>
        </div>
        <p className="mt-4 text-base leading-8 text-slate-600">{lesson.summary}</p>
        {lesson.practiceUrl ? (
          <a
            href={lesson.practiceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-700"
          >
            Abrir ambiente de prática
            <ChevronRight className="size-4" />
          </a>
        ) : (
          <p className="mt-5 inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-sm text-slate-400">
            Ambiente em preparação
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {(lesson.content ?? lesson.summary).split("\n\n").map((paragraph, i) => (
        <p key={i} className="text-base leading-8 text-slate-600">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function Placeholder({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof CirclePlay;
  title: string;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-3xl border-2 border-dashed border-violet-200 bg-violet-50/50 px-6 py-14 text-center">
      <Icon className="size-10 text-[#8b5cf6]" />
      <p className="mt-4 font-baloo text-xl font-bold text-[#1a1333]">{title}</p>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

export default function CoursePlayer({ slug }: { slug: string }) {
  const course = getCourse(slug);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const { profile, saveProfile } = useStudentProfile();

  const progress = useCourseProgress(
    course ?? { slug: "_", title: "", level: "Iniciante", hours: "", free: true, tagline: "", description: "", outcomes: [], audience: "", prerequisites: "", status: "em-breve", modules: [], library: [] },
  );

  const activeModule = useMemo(() => {
    if (!course) return null;
    return course.modules.find((m) => m.id === activeModuleId) ?? course.modules[0] ?? null;
  }, [course, activeModuleId]);

  if (!course || course.status !== "disponivel") {
    return <NotFound />;
  }

  const moduleUnlocked = course.free || (activeModule?.free ?? false);
  const activeLesson = activeModule?.lessons[activeLessonIndex] ?? null;
  const lessonDone =
    activeModule && activeLesson ? progress.isLessonComplete(activeModule.id, activeLessonIndex) : false;

  const celebrate = () => {
    setCelebrating(true);
    window.setTimeout(() => setCelebrating(false), 1400);
  };

  const handleCompleteLesson = () => {
    if (!activeModule || lessonDone) return;
    if (!profile) {
      setGateOpen(true);
      return;
    }
    const before = progress.moduleProgress[activeModule.id];
    progress.markLessonComplete(activeModule.id, activeLessonIndex);
    toast.success(`+${XP_PER_LESSON} XP — aula concluída!`);
    if (before && before.done + 1 === before.total) celebrate();
  };

  const handleQuizResult = (percent: number) => {
    if (!activeModule) return;
    progress.registerQuizScore(activeModule.id, percent);
    if (percent >= QUIZ_PASS_PERCENT) {
      toast.success(`+${XP_PER_QUIZ} XP — quiz aprovado com ${percent}%!`);
      celebrate();
    }
  };

  return (
    <GiselleLayout>
      <Celebration show={celebrating} />
      <StudentGate
        open={gateOpen}
        courseSlug={course.slug}
        courseTitle={course.title}
        onClose={() => setGateOpen(false)}
        onRegistered={(data) => {
          saveProfile(data);
          setGateOpen(false);
        }}
      />

      {/* Cabeçalho do curso + gamificação */}
      <section className="border-b border-slate-200/70 bg-white">
        <div className="container py-10 sm:py-12">
          <Link
            href="/giselle/cursos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#6b21a8]"
          >
            <ArrowLeft className="size-4" />
            Todos os cursos
          </Link>

          <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                  {course.level}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    course.free ? "bg-teal-100 text-teal-700" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {course.free ? "Gratuito" : "Premium"}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                  {course.hours}
                </span>
              </div>
              <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">{course.title}</h1>
            </motion.div>

            {/* Painel de XP */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.08 }}
              className="flex shrink-0 items-center gap-4 rounded-3xl border border-slate-200/70 bg-[#f7f8fc] px-6 py-4"
            >
              <div className="text-center">
                <p className="flex items-center gap-1 font-baloo text-2xl font-bold text-[#6b21a8]">
                  <Zap className="size-5 fill-amber-400 text-amber-400" />
                  {progress.xp}
                </p>
                <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">XP</p>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div className="text-center">
                <p className="font-baloo text-lg font-bold text-[#1a1333]">
                  {progress.level.emoji} {progress.level.name}
                </p>
                <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Nível</p>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div className="text-center">
                <p className="flex items-center justify-center gap-1 font-baloo text-2xl font-bold text-teal-600">
                  <Trophy className="size-5" />
                  {progress.badges}
                </p>
                <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Conquistas</p>
              </div>
            </motion.div>
          </div>

          {/* Barra de progresso do curso */}
          <div className="mt-6">
            <div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-400">
              <span>
                Progresso do curso
                {profile ? (
                  <span className="ml-2 font-medium text-slate-400">· {profile.name.split(" ")[0]}</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setGateOpen(true)}
                    className="ml-2 rounded-full bg-violet-100 px-3 py-1 font-bold text-[#6b21a8] transition hover:bg-violet-200"
                  >
                    Crie seu perfil gratuito para garantir o certificado →
                  </button>
                )}
              </span>
              <span className="text-[#6b21a8]">{progress.coursePercent}%</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,#6b21a8,#8b5cf6,#14b8a6)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress.coursePercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Player */}
      <section className="container grid gap-8 py-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Trilha de módulos */}
        <div className="space-y-3">
          {course.modules.map((module, mi) => {
            const unlocked = course.free || module.free;
            const isActive = module.id === (activeModule?.id ?? "");
            const mp = progress.moduleProgress[module.id];
            return (
              <div
                key={module.id}
                className={`overflow-hidden rounded-3xl border bg-white transition ${
                  isActive ? "border-[#8b5cf6] shadow-[0_10px_40px_rgba(107,33,168,0.12)]" : "border-slate-200/70"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveModuleId(module.id);
                    setActiveLessonIndex(0);
                  }}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                >
                  {unlocked ? (
                    <ProgressRing percent={mp?.percent ?? 0} done={mp?.badge ?? false} />
                  ) : (
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <LockKeyhole className="size-4" />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Módulo {mi + 1} · {module.duration}
                    </p>
                    <p className="truncate text-sm font-bold text-[#1a1333]">{module.title}</p>
                  </div>
                  <ChevronRight
                    className={`size-4 shrink-0 text-slate-400 transition ${isActive ? "rotate-90 text-[#8b5cf6]" : ""}`}
                  />
                </button>

                {isActive && unlocked ? (
                  <div className="border-t border-slate-100 px-3 pb-3 pt-2">
                    {module.lessons.map((lesson, li) => {
                      const Icon = lessonIcons[lesson.type];
                      const selected = li === activeLessonIndex;
                      const done = progress.isLessonComplete(module.id, li);
                      return (
                        <button
                          key={li}
                          type="button"
                          onClick={() => setActiveLessonIndex(li)}
                          className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition ${
                            selected ? "bg-violet-50 font-semibold text-[#6b21a8]" : "text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          {done ? (
                            <CheckCircle2 className="size-4 shrink-0 fill-teal-100 text-teal-600" />
                          ) : (
                            <Icon className="size-4 shrink-0" />
                          )}
                          <span className="flex-1 truncate">{lesson.title}</span>
                          <span className="text-xs text-slate-400">{lesson.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                {isActive && !unlocked ? (
                  <div className="border-t border-slate-100 px-5 py-5">
                    <p className="text-sm leading-6 text-slate-500">
                      Conteúdo premium. Garanta sua vaga e libere a trilha completa com certificado.
                    </p>
                    <a
                      href={contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600"
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
            <div className="rounded-3xl border-2 border-teal-200 bg-teal-50/50 p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
                <FlaskConical className="size-4" />
                Biblioteca de prática
              </p>
              <div className="mt-4 space-y-3">
                {course.library.map((resource) => (
                  <div key={resource.title} className="rounded-2xl border border-teal-100 bg-white px-4 py-3">
                    <p className="text-sm font-bold text-[#1a1333]">{resource.title}</p>
                    {resource.url ? (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700"
                      >
                        Abrir {resource.tool}
                        <ChevronRight className="size-3" />
                      </a>
                    ) : (
                      <p className="mt-1 text-xs text-slate-400">Em preparação</p>
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
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(26,19,51,0.06)] sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                  {lessonTypeLabels[activeLesson.type]} · {activeLesson.duration}
                </span>
                {lessonDone ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-700">
                    <CheckCircle2 className="size-3.5" />
                    Concluída
                  </span>
                ) : null}
              </div>

              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{activeLesson.title}</h2>

              <div className="mt-6">
                <LessonView lesson={activeLesson} module={activeModule} onQuizResult={handleQuizResult} />
              </div>

              {/* Ações da aula */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  disabled={activeLessonIndex === 0}
                  onClick={() => setActiveLessonIndex((i) => Math.max(0, i - 1))}
                  className="rounded-full border-2 border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-500 transition hover:border-violet-200 hover:text-[#6b21a8] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Anterior
                </button>

                {activeLesson.type !== "quiz" ? (
                  <button
                    type="button"
                    disabled={lessonDone}
                    onClick={handleCompleteLesson}
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition ${
                      lessonDone
                        ? "cursor-default bg-teal-100 text-teal-700"
                        : "bg-[linear-gradient(90deg,#6b21a8,#8b5cf6)] text-white hover:opacity-90"
                    }`}
                  >
                    {lessonDone ? (
                      <>
                        <CheckCircle2 className="size-4" />
                        Aula concluída
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-4" />
                        Concluir aula (+{XP_PER_LESSON} XP)
                      </>
                    )}
                  </button>
                ) : null}

                <button
                  type="button"
                  disabled={!activeModule || activeLessonIndex >= activeModule.lessons.length - 1}
                  onClick={() =>
                    setActiveLessonIndex((i) => Math.min((activeModule?.lessons.length ?? 1) - 1, i + 1))
                  }
                  className="rounded-full bg-[#1a1333] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6b21a8] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Próxima
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="rounded-3xl border border-slate-200/70 bg-white p-8">
              <Placeholder
                icon={Award}
                title="Conteúdo premium"
                text="Selecione um módulo liberado ao lado, ou garanta sua matrícula para desbloquear a trilha completa."
              />
            </div>
          )}
        </div>
      </section>
    </GiselleLayout>
  );
}
