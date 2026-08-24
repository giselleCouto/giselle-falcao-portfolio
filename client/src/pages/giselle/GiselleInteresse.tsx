import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Loader2,
  PartyPopper,
  PenLine,
  Rocket,
  ShoppingCart,
} from "lucide-react";
import { toast } from "sonner";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { courses } from "@/lib/courses";
import { contact } from "@/lib/portfolioData";
import { livro } from "@/lib/livroData";
import { trpc } from "@/lib/trpc";

const socialLink = (label: string) => contact.links.find((l) => l.label === label)?.href ?? "#";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const inputClass =
  "w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-[#1a1333] placeholder:text-slate-400 focus:border-[#8b5cf6] focus:outline-none";

const UFS = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT",
  "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO",
];

const GENDERS = ["Feminino", "Masculino", "Não-binário", "Outro", "Prefiro não responder"];

const RACES = ["Branca", "Preta", "Parda", "Amarela", "Indígena", "Prefiro não responder"];

const EDUCATION = [
  "Ensino fundamental",
  "Ensino médio",
  "Ensino técnico",
  "Graduação em andamento",
  "Graduação completa",
  "Pós-graduação",
];

const EXPERIENCE_LEVELS = ["Nunca tive contato", "Já tive algum contato", "Uso com frequência"];

const EXPERIENCE_QUESTIONS = [
  { key: "tech", label: "Tecnologia e informática no dia a dia" },
  { key: "data", label: "Dados, planilhas e análises" },
  { key: "code", label: "Programação (qualquer linguagem)" },
] as const;

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className={`${inputClass} ${value ? "" : "text-slate-400"}`}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o} className="text-[#1a1333]">
          {o}
        </option>
      ))}
    </select>
  );
}

type GiselleInteresseProps = {
  /** Identificador da origem (ex.: evento) gravado no banco para segmentar a demanda */
  source?: string;
  /** Rota para onde o aluno é levado automaticamente após enviar */
  next?: string;
  /** Sucesso em modo "jornada": redes sociais → livro → soluções → cursos (QR genérico de palestras) */
  journey?: boolean;
  /** Título e contexto específicos da origem (ex.: palestra) */
  headline?: string;
  intro?: string;
};

export default function GiselleInteresse({
  source = "interesse",
  next,
  journey = false,
  headline,
  intro,
}: GiselleInteresseProps = {}) {
  const [, navigate] = useLocation();
  const [countdown, setCountdown] = useState(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [state, setState] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState<Record<string, string>>({});
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [goals, setGoals] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const interestMutation = trpc.academy.interest.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (error) => {
      toast.error(error.message || "Não foi possível enviar agora. Tente novamente.");
    },
  });

  const canSubmit =
    name.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(email) &&
    state &&
    gender &&
    race &&
    education &&
    EXPERIENCE_QUESTIONS.every((q) => experience[q.key]) &&
    consent;

  const toggleCourse = (title: string) => {
    setSelectedCourses((current) =>
      current.includes(title) ? current.filter((c) => c !== title) : [...current, title],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || interestMutation.isPending) return;
    interestMutation.mutate({
      name: name.trim(),
      email: email.trim(),
      whatsapp,
      state,
      gender,
      race,
      education,
      techExperience: experience.tech,
      dataExperience: experience.data,
      codeExperience: experience.code,
      coursesInterest: selectedCourses,
      goals,
      source,
      consent: true,
    });
  };

  // Redirecionamento automático após o envio (fluxo QR Code → questionário → curso)
  useEffect(() => {
    if (!submitted || !next) return;
    if (countdown <= 0) {
      navigate(next);
      return;
    }
    const timer = window.setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [submitted, next, countdown, navigate]);

  if (submitted && journey) {
    return (
      <GiselleLayout>
        <section className="container max-w-2xl py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 0.8 }}
              className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-violet-100"
            >
              <PartyPopper className="size-8 text-[#6b21a8]" />
            </motion.div>
            <h1 className="mt-5 font-baloo text-3xl font-bold">Recebido! Sua jornada começa agora</h1>
            <p className="mx-auto mt-2 max-w-md leading-7 text-slate-500">
              Três passos rápidos para continuar de onde a palestra parou:
            </p>
          </motion.div>

          <div className="mt-8 space-y-4">
            {/* Passo 1 — Redes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(26,19,51,0.06)]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">Passo 1</p>
              <h2 className="mt-1 text-lg font-bold">Siga e acompanhe os bastidores</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={socialLink("Instagram")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)] px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                >
                  <Instagram className="size-4" />
                  Instagram
                </a>
                <a
                  href={socialLink("LinkedIn")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0a66c2] px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                >
                  <Linkedin className="size-4" />
                  LinkedIn
                </a>
                <a
                  href={socialLink("Medium")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1a1333] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#6b21a8]"
                >
                  <PenLine className="size-4" />
                  Medium
                </a>
                <a
                  href={socialLink("GitHub")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:border-violet-300 hover:text-[#6b21a8]"
                >
                  <Github className="size-4" />
                  GitHub
                </a>
              </div>
            </motion.div>

            {/* Passo 2 — Livro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28 }}
              className="flex items-center gap-5 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(26,19,51,0.06)]"
            >
              <img
                src={livro.cover}
                alt={`Capa do livro ${livro.title}`}
                className="w-20 shrink-0 rounded-lg border border-slate-200/70 shadow-md"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">Passo 2</p>
                <h2 className="mt-1 text-lg font-bold leading-snug">
                  Leve a Metodologia CEOD com você
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href="/giselle/livro"
                    className="inline-flex items-center gap-1.5 rounded-full border-2 border-violet-200 px-4 py-2 text-xs font-bold text-[#6b21a8] transition hover:bg-violet-50"
                  >
                    <BookOpen className="size-3.5" />
                    Conhecer o livro
                  </Link>
                  <Link
                    href="/livro"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1a1333] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#6b21a8]"
                  >
                    <ShoppingCart className="size-3.5" />
                    Onde comprar
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Passo 3 — Soluções */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.41 }}
              className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(26,19,51,0.06)]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">Passo 3</p>
              <h2 className="mt-1 text-lg font-bold">Mergulhe nas soluções que construí</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                SensorMonit, Curral AI, GreenSenti, EucaSmart e Pharos — IA em produção com demos abertas.
              </p>
              <Link
                href="/giselle/solucoes"
                className="mt-3 inline-flex items-center gap-1.5 rounded-full border-2 border-teal-200 px-4 py-2 text-xs font-bold text-teal-700 transition hover:bg-teal-50"
              >
                <Rocket className="size-3.5" />
                Explorar as soluções
              </Link>
            </motion.div>
          </div>

          {/* Destino final: cursos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="mt-8"
          >
            <Link
              href="/giselle/cursos"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#6b21a8,#8b5cf6,#14b8a6)] px-6 py-4 text-sm font-bold text-white transition hover:opacity-90"
            >
              <GraduationCap className="size-5" />
              Começar os cursos gratuitos agora
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </section>
      </GiselleLayout>
    );
  }

  if (submitted) {
    return (
      <GiselleLayout>
        <section className="container flex min-h-[60vh] items-center justify-center py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="max-w-lg rounded-[2.5rem] border border-slate-200/70 bg-white p-10 text-center shadow-[0_18px_60px_rgba(26,19,51,0.12)]"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 0.8 }}
              className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-violet-100"
            >
              <PartyPopper className="size-8 text-[#6b21a8]" />
            </motion.div>
            <h1 className="mt-6 font-baloo text-3xl font-bold">Recebido! 🎉</h1>
            <p className="mt-3 leading-7 text-slate-500">
              {next
                ? "Obrigada! Seu ambiente de treinamento já está pronto — você será levado(a) para ele em instantes."
                : "Obrigada por compartilhar seu interesse. Suas respostas ajudam a construir cursos cada vez melhores — e você será avisado(a) das novidades em primeira mão."}
            </p>
            {next ? (
              <p className="mt-2 text-sm font-semibold text-[#6b21a8]">
                Redirecionando em {countdown}s…
              </p>
            ) : null}
            <Link
              href={next ?? "/giselle/cursos"}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1a1333] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#6b21a8]"
            >
              <GraduationCap className="size-4" />
              {next ? "Ir agora para o treinamento" : "Conhecer os cursos gratuitos"}
            </Link>
          </motion.div>
        </section>
      </GiselleLayout>
    );
  }

  return (
    <GiselleLayout>
      <section className="container max-w-2xl py-12 sm:py-16">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
          <p className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#6b21a8]">
            <ClipboardList className="size-3.5" />
            Pesquisa de interesse · 2 minutos
          </p>
          <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
            {headline ?? (
              <>
                Me conta sobre{" "}
                <span className="bg-[linear-gradient(90deg,#6b21a8,#8b5cf6,#14b8a6)] bg-clip-text text-transparent">
                  você
                </span>
                ?
              </>
            )}
          </h1>
          <p className="mt-4 leading-7 text-slate-500">
            {intro ??
              "Suas respostas me ajudam a criar cursos de dados e IA que realmente sirvam para quem quer aprender — no formato, no ritmo e no nível certos."}
          </p>
        </motion.div>

        <motion.form
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.08 }}
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          {/* Identificação */}
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(26,19,51,0.06)]">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600">Sobre você</h2>
            <div className="mt-4 space-y-3">
              <input
                className={inputClass}
                placeholder="Seu nome completo *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={160}
                required
              />
              <input
                className={inputClass}
                type="email"
                placeholder="Seu melhor e-mail *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={320}
                required
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className={inputClass}
                  placeholder="WhatsApp (opcional)"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  maxLength={40}
                />
                <Select value={state} onChange={setState} options={UFS} placeholder="Estado (UF) *" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Select value={gender} onChange={setGender} options={GENDERS} placeholder="Sexo/gênero *" />
                <Select value={race} onChange={setRace} options={RACES} placeholder="Cor/raça (autoidentificação) *" />
              </div>
              <Select
                value={education}
                onChange={setEducation}
                options={EDUCATION}
                placeholder="Sua formação *"
              />
            </div>
          </div>

          {/* Experiência prévia */}
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(26,19,51,0.06)]">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600">
              Seu contato com tecnologia
            </h2>
            <div className="mt-4 space-y-5">
              {EXPERIENCE_QUESTIONS.map((q) => (
                <div key={q.key}>
                  <p className="text-sm font-semibold text-[#1a1333]">{q.label} *</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {EXPERIENCE_LEVELS.map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setExperience((cur) => ({ ...cur, [q.key]: level }))}
                        className={`rounded-full border-2 px-4 py-2 text-xs font-semibold transition ${
                          experience[q.key] === level
                            ? "border-[#8b5cf6] bg-violet-50 text-[#6b21a8]"
                            : "border-slate-200 text-slate-500 hover:border-violet-200"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cursos de interesse */}
          <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(26,19,51,0.06)]">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600">
              Quais cursos te interessam? (opcional)
            </h2>
            <div className="mt-4 space-y-2">
              {courses.map((course) => (
                <label
                  key={course.slug}
                  className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-slate-100 px-4 py-3 transition hover:border-violet-200"
                >
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course.title)}
                    onChange={() => toggleCourse(course.title)}
                    className="mt-0.5 size-4 accent-[#6b21a8]"
                  />
                  <span className="flex-1">
                    <span className="text-sm font-semibold text-[#1a1333]">{course.title}</span>
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${
                        course.free ? "bg-teal-100 text-teal-700" : "bg-violet-100 text-violet-700"
                      }`}
                    >
                      {course.free ? "Gratuito" : "Premium"}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            <textarea
              className={`${inputClass} mt-4 min-h-[80px] resize-y`}
              placeholder="O que você espera aprender? Algum tema que gostaria de ver? (opcional)"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              maxLength={2000}
            />
          </div>

          {/* Consentimento + enviar */}
          <div className="space-y-4">
            <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-slate-500">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-[#6b21a8]"
                required
              />
              Autorizo o uso das minhas respostas para fins de pesquisa da Giselle Falcão Academy e
              o contato sobre os cursos. Seus dados não são compartilhados com terceiros (LGPD). *
            </label>
            <button
              type="submit"
              disabled={!canSubmit || interestMutation.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#6b21a8,#8b5cf6)] px-6 py-4 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {interestMutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-4" />
                  Enviar respostas
                </>
              )}
            </button>
          </div>
        </motion.form>
      </section>
    </GiselleLayout>
  );
}
