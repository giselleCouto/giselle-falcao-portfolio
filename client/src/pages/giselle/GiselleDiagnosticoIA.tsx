import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Compass,
  Cpu,
  Database,
  Gauge,
  Loader2,
  MessageCircle,
  Mic,
  Users,
  Workflow,
} from "lucide-react";
import { toast } from "sonner";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import {
  COMPANY_SIZES,
  DIMENSIONS,
  LEVELS,
  QUESTIONS,
  levelForScore,
  type DimensionKey,
} from "@/lib/maturidadeData";
import { contact } from "@/lib/portfolioData";
import { trpc } from "@/lib/trpc";

const dimensionIcons: Record<DimensionKey, typeof Database> = {
  dados: Database,
  tecnologia: Cpu,
  pessoas: Users,
  processos: Workflow,
  estrategia: Compass,
};

const inputClass =
  "w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-[#1a1333] placeholder:text-slate-400 focus:border-[#8b5cf6] focus:outline-none";

type Stage = "intro" | "quiz" | "result";

export default function GiselleDiagnosticoIA() {
  const [stage, setStage] = useState<Stage>("intro");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    companySize: "",
  });
  const [consent, setConsent] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const maturidadeMutation = trpc.academy.maturidade.useMutation({
    onSuccess: () => setStage("result"),
    onError: (error) => toast.error(error.message || "Não foi possível salvar. Tente novamente."),
  });

  const canStart =
    contactForm.name.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(contactForm.email) &&
    contactForm.company.trim().length >= 2 &&
    contactForm.role.trim().length >= 2 &&
    contactForm.companySize &&
    consent;

  const scores = useMemo(() => {
    const byDim: Record<DimensionKey, number> = {
      dados: 0,
      tecnologia: 0,
      pessoas: 0,
      processos: 0,
      estrategia: 0,
    };
    answers.forEach((points, i) => {
      const q = QUESTIONS[i];
      if (q) byDim[q.dimension] += points;
    });
    return byDim;
  }, [answers]);

  const total = scores.dados + scores.tecnologia + scores.pessoas + scores.processos + scores.estrategia;
  const level = levelForScore(total);

  const handleAnswer = (points: number) => {
    const next = [...answers];
    next[current] = points;
    setAnswers(next);
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
      return;
    }
    // última pergunta: calcula e envia
    const byDim: Record<DimensionKey, number> = { dados: 0, tecnologia: 0, pessoas: 0, processos: 0, estrategia: 0 };
    next.forEach((p, i) => {
      const q = QUESTIONS[i];
      if (q) byDim[q.dimension] += p;
    });
    const t = byDim.dados + byDim.tecnologia + byDim.pessoas + byDim.processos + byDim.estrategia;
    maturidadeMutation.mutate({
      ...contactForm,
      scores: byDim,
      level: levelForScore(t).nome,
      answers: next,
      consent: true,
    });
  };

  const question = QUESTIONS[current];
  const progress = Math.round((current / QUESTIONS.length) * 100);

  return (
    <GiselleLayout>
      <section className="container max-w-2xl py-12 sm:py-16">
        <AnimatePresence mode="wait">
          {/* INTRO */}
          {stage === "intro" ? (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
              <p className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
                <Gauge className="size-3.5" />
                Diagnóstico gratuito · 10 perguntas · 3 minutos
              </p>
              <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                Diagnóstico de{" "}
                <span className="bg-[linear-gradient(90deg,#6b21a8,#8b5cf6,#14b8a6)] bg-clip-text text-transparent">
                  Maturidade em IA
                </span>
              </h1>
              <p className="mt-4 leading-7 text-slate-500">
                Descubra em que estágio sua empresa está em <strong className="text-[#1a1333]">Dados,
                Tecnologia, Pessoas, Processos e Estratégia</strong> — e receba, na hora,
                recomendações práticas para o próximo passo. Sem jargão, sem enrolação.
              </p>

              <div className="mt-6 grid grid-cols-5 gap-2">
                {(Object.keys(DIMENSIONS) as DimensionKey[]).map((d) => {
                  const Icon = dimensionIcons[d];
                  return (
                    <div key={d} className="flex flex-col items-center gap-1.5 rounded-2xl bg-[#f7f8fc] px-2 py-3 text-center">
                      <Icon className="size-5 text-[#6b21a8]" />
                      <span className="text-[0.6rem] font-bold leading-tight text-slate-500">
                        {DIMENSIONS[d].label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (canStart) setStage("quiz");
                }}
                className="mt-8 space-y-3 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(26,19,51,0.06)]"
              >
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600">
                  Antes de começar
                </p>
                <input className={inputClass} placeholder="Seu nome *" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} maxLength={160} required />
                <input className={inputClass} type="email" placeholder="E-mail corporativo *" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} maxLength={320} required />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input className={inputClass} placeholder="Empresa / instituição *" value={contactForm.company} onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })} maxLength={200} required />
                  <input className={inputClass} placeholder="Seu cargo *" value={contactForm.role} onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })} maxLength={160} required />
                </div>
                <select
                  value={contactForm.companySize}
                  onChange={(e) => setContactForm({ ...contactForm, companySize: e.target.value })}
                  required
                  className={`${inputClass} ${contactForm.companySize ? "" : "text-slate-400"}`}
                >
                  <option value="" disabled>
                    Porte da organização *
                  </option>
                  {COMPANY_SIZES.map((s) => (
                    <option key={s} value={s} className="text-[#1a1333]">
                      {s}
                    </option>
                  ))}
                </select>
                <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-slate-500">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 size-4 shrink-0 accent-[#6b21a8]" required />
                  Autorizo o contato da Giselle Falcão com o resultado e recomendações. Dados não são
                  compartilhados com terceiros (LGPD). *
                </label>
                <button
                  type="submit"
                  disabled={!canStart}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#6b21a8,#8b5cf6,#14b8a6)] px-6 py-4 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Começar o diagnóstico
                  <ArrowRight className="size-4" />
                </button>
              </form>
            </motion.div>
          ) : null}

          {/* QUIZ */}
          {stage === "quiz" && question ? (
            <motion.div key={`q-${current}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span className="inline-flex items-center gap-1.5 text-[#6b21a8]">
                  {(() => {
                    const Icon = dimensionIcons[question.dimension];
                    return <Icon className="size-4" />;
                  })()}
                  {DIMENSIONS[question.dimension].label}
                </span>
                <span>
                  {current + 1} de {QUESTIONS.length}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#6b21a8,#8b5cf6,#14b8a6)]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <h2 className="mt-8 text-2xl font-bold leading-snug sm:text-3xl">{question.question}</h2>
              <div className="mt-6 space-y-3">
                {question.options.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    disabled={maturidadeMutation.isPending}
                    onClick={() => handleAnswer(opt.points)}
                    className={`block w-full rounded-2xl border-2 px-5 py-4 text-left text-sm font-medium leading-6 transition hover:border-[#8b5cf6] hover:bg-violet-50/60 disabled:opacity-50 ${
                      answers[current] === opt.points && answers.length > current
                        ? "border-[#8b5cf6] bg-violet-50 text-[#6b21a8]"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  disabled={current === 0 || maturidadeMutation.isPending}
                  onClick={() => setCurrent(current - 1)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition hover:text-[#6b21a8] disabled:opacity-30"
                >
                  <ArrowLeft className="size-4" />
                  Anterior
                </button>
                {maturidadeMutation.isPending ? (
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#6b21a8]">
                    <Loader2 className="size-4 animate-spin" />
                    Calculando seu resultado...
                  </span>
                ) : null}
              </div>
            </motion.div>
          ) : null}

          {/* RESULT */}
          {stage === "result" ? (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }}>
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
                  Maturidade em IA · {contactForm.company}
                </p>
                <motion.p
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="mt-4 font-baloo text-5xl font-bold"
                  style={{ color: level.cor }}
                >
                  {level.nome}
                </motion.p>
                <p className="mt-2 font-baloo text-xl font-bold text-slate-400">
                  {total} de 30 pontos
                </p>
              </div>

              {/* Barras por dimensão */}
              <div className="mt-8 space-y-4 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(26,19,51,0.06)]">
                {(Object.keys(DIMENSIONS) as DimensionKey[]).map((d) => {
                  const Icon = dimensionIcons[d];
                  const value = scores[d];
                  return (
                    <div key={d}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="inline-flex items-center gap-2 font-semibold text-[#1a1333]">
                          <Icon className="size-4 text-[#6b21a8]" />
                          {DIMENSIONS[d].label}
                        </span>
                        <span className="font-bold text-slate-400">{value}/6</span>
                      </div>
                      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(value / 6) * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${level.cor}, #8b5cf6)` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-6 rounded-2xl bg-[#f7f8fc] p-5 leading-7 text-slate-600">{level.resumo}</p>

              <div className="mt-6 rounded-3xl border-2 border-teal-200 bg-teal-50/60 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
                  Recomendações para o seu estágio
                </p>
                <ul className="mt-3 space-y-2.5">
                  {level.recomendacoes.map((r, i) => (
                    <li key={r} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 space-y-3">
                <a
                  href={contact.calendar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1a1333] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#6b21a8]"
                >
                  <Calendar className="size-4" />
                  Conversar sobre o resultado com a Giselle
                </a>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/giselle/palestras"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-violet-200 px-5 py-3 text-sm font-bold text-[#6b21a8] transition hover:bg-violet-50"
                  >
                    <Mic className="size-4" />
                    Workshops e formações
                  </Link>
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-emerald-200 px-5 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
                  >
                    <MessageCircle className="size-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>
    </GiselleLayout>
  );
}
