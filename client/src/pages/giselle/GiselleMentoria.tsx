import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Heart,
  HelpCircle,
  Loader2,
  Quote,
  Sparkles,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { mentoria } from "@/lib/mentoriaData";
import { assets } from "@/lib/portfolioData";
import { trpc } from "@/lib/trpc";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const UFS = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT",
  "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO",
];

const inputClass =
  "w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-[#1a1333] placeholder:text-slate-400 focus:border-[#c65a3a] focus:outline-none";

const CTA_CLASS =
  "inline-flex items-center gap-2 rounded-full bg-[#c65a3a] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#a94b30]";

function goDiagnostico() {
  document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Select({
  value,
  onChange,
  options,
  placeholder,
  required = true,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
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

export default function GiselleMentoria() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    state: "",
    ageRange: "",
    education: "",
    currentSituation: "",
    worksWithTech: "",
    areaInterest: "",
    mainDifficulty: "",
    goal: "",
    hoursPerWeek: "",
    format: "",
    investmentRange: "",
    whyNow: "",
  });
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof typeof form) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  const mentoriaMutation = trpc.academy.mentoria.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (error) => toast.error(error.message || "Não foi possível enviar agora. Tente novamente."),
  });

  const canSubmit =
    form.name.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.whatsapp.trim().length >= 8 &&
    form.city.trim().length >= 2 &&
    form.state &&
    form.education &&
    form.currentSituation &&
    form.worksWithTech &&
    form.areaInterest &&
    form.mainDifficulty.trim().length >= 5 &&
    form.goal.trim().length >= 5 &&
    form.hoursPerWeek &&
    form.format &&
    form.investmentRange &&
    form.whyNow.trim().length >= 5 &&
    consent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || mentoriaMutation.isPending) return;
    mentoriaMutation.mutate({ ...form, consent: true });
  };

  return (
    <GiselleLayout>
      {/* Abertura */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_25%,rgba(198,90,58,0.09),transparent_45%),radial-gradient(circle_at_88%_15%,rgba(107,33,168,0.09),transparent_45%)]" />
        <div className="container relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }}>
            <p className="inline-flex items-center gap-2 rounded-full bg-[#c65a3a]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#a94b30]">
              <Sparkles className="size-3.5" />
              {mentoria.name} · Mentoria para mulheres
            </p>
            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.08] sm:text-5xl">
              {mentoria.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-500">{mentoria.heroSubtitle}</p>
            <button type="button" onClick={goDiagnostico} className={`mt-8 ${CTA_CLASS}`}>
              {mentoria.ctaMain}
              <ArrowRight className="size-4" />
            </button>
            <p className="mt-3 text-xs font-medium text-slate-400">{mentoria.tagline}</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-3 rounded-[2.5rem] bg-[linear-gradient(135deg,#c65a3a,#8b5cf6,#14b8a6)] opacity-15 blur-xl" />
            <img
              src={assets.educationPanel}
              alt="Giselle Falcão ensinando"
              className="relative aspect-[4/5] w-full rounded-[2.5rem] border border-slate-200/70 object-cover shadow-[0_18px_60px_rgba(26,19,51,0.14)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Identificação */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-14 sm:py-16">
          <h2 className="max-w-2xl text-3xl font-bold">
            Talvez você já tenha começado. Mas ainda não consiga enxergar o caminho.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-500">
            Você faz cursos, acompanha conteúdos e escuta falar sobre inúmeras oportunidades em Dados
            e IA. Mesmo assim, algumas perguntas continuam:
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {mentoria.perguntas.map((p, i) => (
              <motion.div
                key={p}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-2xl bg-[#f7f8fc] px-5 py-4"
              >
                <Quote className="mt-0.5 size-4 shrink-0 text-[#c65a3a]" />
                <p className="text-sm font-medium leading-6 text-[#1a1333]">“{p}”</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl rounded-2xl border-l-4 border-l-[#c65a3a] bg-[#c65a3a]/5 p-5 leading-7 text-slate-600">
            {mentoria.identificacaoFecho}
          </p>
        </div>
      </section>

      {/* Promessa */}
      <section className="container py-14 sm:py-16">
        <h2 className="text-3xl font-bold">{mentoria.promessa.titulo}</h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-500">{mentoria.promessa.texto}</p>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
          Aqui, você aprende a:
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mentoria.promessa.aprendizados.map((a) => (
            <div key={a} className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white px-5 py-4">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-600" />
              <p className="text-sm leading-6 text-slate-600">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Transformação — 4 movimentos */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-14 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">O método</p>
          <h2 className="mt-3 text-3xl font-bold">Um caminho construído em quatro movimentos</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mentoria.movimentos.map((m, i) => (
              <motion.div
                key={m.n}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="rounded-3xl border border-slate-200/70 bg-[#f7f8fc] p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#c65a3a,#8b5cf6)] font-baloo text-lg font-bold text-white">
                  {m.n}
                </span>
                <h3 className="mt-4 font-baloo text-xl font-bold">{m.titulo}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{m.texto}</p>
              </motion.div>
            ))}
          </div>
          <button type="button" onClick={goDiagnostico} className={`mt-10 ${CTA_CLASS}`}>
            Quero construir meu caminho
            <ArrowRight className="size-4" />
          </button>
        </div>
      </section>

      {/* Para quem é */}
      <section className="container py-14 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Para quem é</p>
        <h2 className="mt-3 text-3xl font-bold">O {mentoria.name} foi criado para mulheres que…</h2>
        <div className="mt-8 grid gap-3 lg:grid-cols-2">
          {mentoria.paraQuem.map((p) => (
            <div key={p} className="flex items-start gap-3 rounded-2xl bg-[#f7f8fc] px-5 py-4">
              <Heart className="mt-0.5 size-4 shrink-0 text-[#c65a3a]" />
              <p className="text-sm leading-6 text-slate-600">{p}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl font-medium leading-7 text-[#1a1333]">{mentoria.paraQuemFecho}</p>
      </section>

      {/* Formatos */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-14 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Formatos</p>
          <h2 className="mt-3 text-3xl font-bold">Como posso acompanhar você</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {mentoria.formatos.map((f, i) => (
              <motion.div
                key={f.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`flex h-full flex-col rounded-3xl border-2 p-7 ${
                  f.id === "grupo"
                    ? "border-[#c65a3a] bg-white shadow-[0_18px_50px_rgba(198,90,58,0.12)]"
                    : "border-slate-200 bg-white"
                }`}
              >
                <span
                  className={`self-start rounded-full px-3 py-1 text-xs font-bold ${
                    f.status === "lista" ? "bg-slate-100 text-slate-500" : "bg-[#c65a3a]/10 text-[#a94b30]"
                  }`}
                >
                  {f.statusLabel}
                </span>
                <h3 className="mt-4 font-baloo text-2xl font-bold">{f.nome}</h3>
                <p className="text-sm font-semibold text-slate-400">{f.subtitulo}</p>
                <ul className="mt-5 flex-1 space-y-2">
                  {f.itens.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                      <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-teal-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm font-bold text-[#1a1333]">{f.investimento}</p>
                <button
                  type="button"
                  onClick={goDiagnostico}
                  className={`mt-4 w-full rounded-full px-5 py-3 text-sm font-bold transition ${
                    f.id === "grupo"
                      ? "bg-[#c65a3a] text-white hover:bg-[#a94b30]"
                      : "border-2 border-[#c65a3a]/40 text-[#a94b30] hover:bg-[#c65a3a]/5"
                  }`}
                >
                  {f.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Você não começa do zero */}
      <section className="container py-14 sm:py-16">
        <h2 className="text-3xl font-bold">{mentoria.naoDoZero.titulo}</h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-500">
          Sua formação anterior, sua experiência profissional, os problemas que já resolveu e a
          maneira como você enxerga o mundo podem se tornar diferenciais em Dados e IA.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {mentoria.naoDoZero.exemplos.map((e) => (
            <div key={e.perfil} className="rounded-3xl border border-slate-200/70 bg-white p-5">
              <p className="font-baloo text-base font-bold text-[#a94b30]">{e.perfil}</p>
              <p className="mt-1.5 text-sm leading-6 text-slate-500">{e.traz}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl rounded-2xl bg-[#f7f8fc] p-5 font-baloo text-lg font-bold text-[#1a1333]">
          {mentoria.naoDoZero.fecho}
        </p>
      </section>

      {/* Sobre Giselle */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 rounded-[2.5rem] bg-[linear-gradient(135deg,#6b21a8,#c65a3a)] opacity-15 blur-xl" />
            <img
              src={assets.heroAtlas}
              alt="Giselle Couto Falcão"
              className="relative aspect-[4/3] w-full rounded-[2.5rem] border border-slate-200/70 object-cover shadow-[0_18px_60px_rgba(26,19,51,0.14)]"
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
              {mentoria.sobre.titulo}
            </p>
            <h2 className="mt-3 text-3xl font-bold">Giselle Couto Falcão</h2>
            {mentoria.sobre.paragrafos.map((p) => (
              <p key={p.slice(0, 30)} className="mt-4 leading-8 text-slate-600">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Compromisso honesto */}
      <section className="container py-14">
        <div className="rounded-3xl border-l-4 border-l-[#6b21a8] border-y border-r border-slate-200/70 bg-white p-7 shadow-[0_10px_40px_rgba(26,19,51,0.06)]">
          <h2 className="text-2xl font-bold">{mentoria.compromisso.titulo}</h2>
          <p className="mt-4 leading-7 text-slate-600">
            <strong className="text-[#1a1333]">O programa oferece:</strong> {mentoria.compromisso.oferece}
          </p>
          <p className="mt-3 leading-7 text-slate-600">{mentoria.compromisso.naoPromete}</p>
          <p className="mt-3 font-medium leading-7 text-[#6b21a8]">{mentoria.compromisso.fecho}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container pb-14">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Perguntas frequentes</p>
        <h2 className="mt-3 text-3xl font-bold">Antes de você perguntar</h2>
        <div className="mt-8 max-w-3xl space-y-3">
          {mentoria.faq.map((item) => (
            <details
              key={item.q}
              className="group rounded-3xl border border-slate-200/70 bg-white px-6 py-4 open:shadow-[0_10px_40px_rgba(26,19,51,0.06)]"
            >
              <summary className="flex cursor-pointer items-center gap-3 text-base font-bold text-[#1a1333] [&::-webkit-details-marker]:hidden">
                <HelpCircle className="size-4 shrink-0 text-[#c65a3a]" />
                {item.q}
              </summary>
              <p className="mt-3 pl-7 text-sm leading-7 text-slate-500">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Formulário-diagnóstico */}
      <section id="diagnostico" className="border-t border-slate-200/70 bg-white scroll-mt-20">
        <div className="container max-w-2xl py-14 sm:py-16">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="rounded-[2.5rem] border border-slate-200/70 bg-[#f7f8fc] p-10 text-center"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 0.8 }}
                className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-[#c65a3a]/10"
              >
                <Compass className="size-8 text-[#a94b30]" />
              </motion.div>
              <h2 className="mt-6 font-baloo text-3xl font-bold">Diagnóstico recebido 💜</h2>
              <p className="mx-auto mt-3 max-w-md leading-7 text-slate-500">
                Obrigada por compartilhar seu momento. Vou analisar suas respostas com atenção e
                retornarei pelo WhatsApp ou e-mail informado, indicando o formato do{" "}
                {mentoria.name} que faz sentido para você — e, quando for o caso, o convite para a
                conversa de diagnóstico.
              </p>
            </motion.div>
          ) : (
            <>
              <p className="inline-flex items-center gap-2 rounded-full bg-[#c65a3a]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#a94b30]">
                <Compass className="size-3.5" />
                Diagnóstico · 3 minutos
              </p>
              <h2 className="mt-4 text-3xl font-bold">{mentoria.form.titulo}</h2>
              <p className="mt-3 leading-7 text-slate-500">{mentoria.form.subtitulo}</p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-3">
                <input className={inputClass} placeholder="Nome completo *" value={form.name} onChange={(e) => set("name")(e.target.value)} maxLength={160} required />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input className={inputClass} type="email" placeholder="Seu melhor e-mail *" value={form.email} onChange={(e) => set("email")(e.target.value)} maxLength={320} required />
                  <input className={inputClass} placeholder="WhatsApp com DDD *" value={form.whatsapp} onChange={(e) => set("whatsapp")(e.target.value)} maxLength={40} required />
                </div>
                <div className="grid gap-3 sm:grid-cols-[1.4fr_0.6fr]">
                  <input className={inputClass} placeholder="Cidade *" value={form.city} onChange={(e) => set("city")(e.target.value)} maxLength={120} required />
                  <Select value={form.state} onChange={set("state")} options={UFS} placeholder="UF *" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Select value={form.ageRange} onChange={set("ageRange")} options={mentoria.form.ageRanges} placeholder="Faixa etária (opcional)" required={false} />
                  <Select value={form.education} onChange={set("education")} options={mentoria.form.education} placeholder="Formação *" />
                </div>
                <Select value={form.currentSituation} onChange={set("currentSituation")} options={mentoria.form.situations} placeholder="Situação profissional atual *" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Select value={form.worksWithTech} onChange={set("worksWithTech")} options={mentoria.form.worksWithTech} placeholder="Já trabalha com tecnologia? *" />
                  <Select value={form.areaInterest} onChange={set("areaInterest")} options={mentoria.form.areas} placeholder="Área de maior interesse *" />
                </div>
                <textarea className={`${inputClass} min-h-[70px] resize-y`} placeholder="Qual é a sua principal dificuldade neste momento? *" value={form.mainDifficulty} onChange={(e) => set("mainDifficulty")(e.target.value)} maxLength={2000} required />
                <textarea className={`${inputClass} min-h-[70px] resize-y`} placeholder="Qual é o seu objetivo para os próximos 6 a 12 meses? *" value={form.goal} onChange={(e) => set("goal")(e.target.value)} maxLength={2000} required />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Select value={form.hoursPerWeek} onChange={set("hoursPerWeek")} options={mentoria.form.hours} placeholder="Horas disponíveis por semana *" />
                  <Select value={form.format} onChange={set("format")} options={mentoria.form.formats} placeholder="Formato de interesse *" />
                </div>
                <Select value={form.investmentRange} onChange={set("investmentRange")} options={mentoria.form.investments} placeholder="Faixa de investimento possível *" />
                <textarea className={`${inputClass} min-h-[70px] resize-y`} placeholder="Por que este é o momento de realizar essa mudança? *" value={form.whyNow} onChange={(e) => set("whyNow")(e.target.value)} maxLength={2000} required />

                <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs leading-5 text-slate-500">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 size-4 shrink-0 accent-[#c65a3a]" required />
                  Autorizo o contato da Giselle Falcão sobre o programa {mentoria.name}. Suas
                  respostas são confidenciais e não são compartilhadas com terceiros (LGPD). *
                </label>

                <button
                  type="submit"
                  disabled={!canSubmit || mentoriaMutation.isPending}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#c65a3a,#8b5cf6)] px-6 py-4 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {mentoriaMutation.isPending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Users className="size-4" />
                      {mentoria.form.cta}
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </GiselleLayout>
  );
}
