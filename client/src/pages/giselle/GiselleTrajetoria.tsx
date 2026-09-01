import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Compass,
  ExternalLink,
  HeartHandshake,
  Lightbulb,
  Loader2,
  MessageCircle,
  Rocket,
  Sparkles,
  Users,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import {
  DISPONIBILIDADE,
  FUNCOES_INTERESSE,
  HORAS_SEMANA,
  trajetoria,
} from "@/lib/trajetoriaData";
import { contact } from "@/lib/portfolioData";
import { trpc } from "@/lib/trpc";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const inputClass =
  "w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-[#1a1333] placeholder:text-slate-400 focus:border-[#c65a3a] focus:outline-none";
const labelClass = "block text-sm font-bold text-[#1a1333]";

const resultadoIcons = [Compass, BadgeCheck, Rocket];

const FORM_INICIAL = {
  name: "",
  email: "",
  whatsapp: "",
  linkedin: "",
  areaAtual: "",
  formacao: "",
  porque: "",
  funcaoInteresse: "",
  jaEstudou: "",
  maiorDificuldade: "",
  horasSemana: "",
  expectativa: "",
  disponibilidade: "",
  porqueAgora: "",
  bolsaContexto: "",
};

export default function GiselleTrajetoria() {
  const [form, setForm] = useState(FORM_INICIAL);
  const [dispostoProjeto, setDispostoProjeto] = useState(false);
  const [bolsa, setBolsa] = useState(false);
  const [consent, setConsent] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const mutation = trpc.academy.trajetoria.useMutation({
    onSuccess: () => {
      setEnviado(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: (error) =>
      toast.error(error.message || "Não foi possível enviar a candidatura. Tente novamente."),
  });

  const set = (field: keyof typeof FORM_INICIAL) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      ...form,
      bolsaContexto: bolsa ? form.bolsaContexto : "",
      dispostoProjeto,
      bolsa,
      consent,
    });
  };

  if (enviado) {
    return (
      <GiselleLayout>
        <section className="container flex min-h-[60vh] items-center justify-center py-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-2xl rounded-[2.5rem] border border-slate-200/70 bg-white p-10 text-center shadow-[0_18px_60px_rgba(26,19,51,0.1)]"
          >
            <span className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-teal-100 text-teal-700">
              <CheckCircle2 className="size-9" />
            </span>
            <h1 className="mt-6 font-baloo text-3xl font-bold">Candidatura enviada! 🎉</h1>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Obrigada pelo interesse na Turma Fundadora. Os próximos passos:
            </p>
            <ol className="mx-auto mt-5 max-w-md space-y-3 text-left">
              {[
                "A Giselle analisa pessoalmente cada candidatura, por aderência e compromisso",
                "As pessoas selecionadas recebem o convite para uma conversa individual",
                "Após a conversa, vêm a confirmação da vaga, o calendário e as boas-vindas",
              ].map((passo, i) => (
                <li key={passo} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#c65a3a] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  {passo}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-slate-500">
              Fique de olho no e-mail e no WhatsApp informados. Enquanto isso, os cursos gratuitos já
              estão abertos:
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/giselle/trilhas"
                className="inline-flex items-center gap-2 rounded-full bg-[#1a1333] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#6b21a8]"
              >
                Conhecer as trilhas de carreira
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-violet-200 px-6 py-3 text-sm font-bold text-[#6b21a8] transition hover:bg-violet-50"
              >
                <MessageCircle className="size-4" />
                Falar com a Giselle
              </a>
            </div>
          </motion.div>
        </section>
      </GiselleLayout>
    );
  }

  return (
    <GiselleLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0d1226]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(198,90,58,0.4),transparent_50%),radial-gradient(circle_at_85%_20%,rgba(107,33,168,0.35),transparent_45%)]" />
        <div className="container relative py-16 sm:py-20">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }}>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-orange-200 backdrop-blur">
              <Sparkles className="size-3.5" />
              {trajetoria.badge}
            </p>
            <h1 className="mt-5 max-w-3xl font-baloo text-4xl font-bold leading-[1.05] text-white sm:text-5xl">
              {trajetoria.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{trajetoria.heroSubtitle}</p>
            <p className="mt-4 flex max-w-2xl items-start gap-2 text-sm leading-7 text-orange-100">
              <HeartHandshake className="mt-1 size-4 shrink-0" />
              {trajetoria.compromissoCurto}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#candidatura"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#1a1333] transition hover:bg-orange-100"
              >
                <ClipboardList className="size-4" />
                {trajetoria.ctaForm}
              </a>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3.5 text-xs font-bold text-white backdrop-blur">
                4 semanas · {trajetoria.investimento.vagas} · acompanhamento próximo
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* As dúvidas que a mentoria responde */}
      <section className="border-b border-slate-200/70 bg-white">
        <div className="container py-10">
          <p className="text-sm font-semibold text-slate-500">
            Nas últimas semanas, mulheres e homens têm chegado com dúvidas muito parecidas:
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {trajetoria.perguntas.map((p) => (
              <span
                key={p}
                className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-[#c65a3a]"
              >
                “{p}”
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* O momento — a era turbulenta da IA (ensaio de Bill Gates) */}
      <section className="relative overflow-hidden bg-[#0d1226]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(198,90,58,0.25),transparent_50%),radial-gradient(circle_at_10%_80%,rgba(20,184,166,0.15),transparent_45%)]" />
        <div className="container relative py-14 sm:py-16">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur">
            <Lightbulb className="size-3.5" />
            {trajetoria.momento.badge}
          </p>
          <h2 className="mt-4 max-w-3xl font-baloo text-3xl font-bold text-white sm:text-4xl">
            {trajetoria.momento.titulo}
          </h2>
          <div className="mt-5 max-w-3xl space-y-4">
            {trajetoria.momento.paragrafos.map((p) => (
              <p key={p.slice(0, 30)} className="text-sm leading-8 text-slate-300 sm:text-base">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {trajetoria.momento.escolhas.map((e) => (
              <div key={e.para} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="flex items-center gap-2 text-sm font-bold text-white">
                  <span className="text-slate-400">{e.de}</span>
                  <ArrowRight className="size-4 text-teal-300" />
                  <span className="text-teal-200">{e.para}</span>
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{e.texto}</p>
              </div>
            ))}
          </div>
          <figure className="mt-9 max-w-3xl border-l-4 border-[#c65a3a] pl-5">
            <blockquote className="font-baloo text-xl font-bold text-white sm:text-2xl">
              “{trajetoria.momento.citacao}”
            </blockquote>
            <figcaption className="mt-2 text-xs font-semibold text-slate-400">
              — {trajetoria.momento.citacaoAutor}
            </figcaption>
            <p className="mt-3 text-sm font-semibold text-orange-200">{trajetoria.momento.citacaoFecho}</p>
          </figure>
          <a
            href={trajetoria.momento.linkEnsaio}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white"
          >
            <ExternalLink className="size-4" />
            Ler o ensaio completo no Gates Notes
          </a>
        </div>
      </section>

      {/* Promessa + 3 resultados */}
      <section className="container py-14 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c65a3a]">A transformação</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-bold">{trajetoria.heroTitle}</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{trajetoria.promessa}</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {trajetoria.resultados.map((r, i) => {
            const Icon = resultadoIcons[i] ?? Compass;
            return (
              <motion.div
                key={r.titulo}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-3xl border border-slate-200/70 bg-white p-7"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#c65a3a,#6b21a8)] text-white">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 font-baloo text-xl font-bold">{r.titulo}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{r.texto}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Para quem é / não é */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container grid gap-8 py-14 sm:py-16 lg:grid-cols-2">
          <div className="rounded-3xl border-2 border-teal-200 bg-teal-50/40 p-7">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
              <CheckCircle2 className="size-4" />
              Esta turma é para você que
            </p>
            <ul className="mt-4 space-y-2.5">
              {trajetoria.paraQuem.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-teal-600" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border-2 border-slate-200 bg-slate-50/60 p-7">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
              <XCircle className="size-4" />
              Ela não é
            </p>
            <ul className="mt-4 space-y-2.5">
              {trajetoria.naoE.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm leading-6 text-slate-500">
                  <XCircle className="mt-1 size-4 shrink-0 text-slate-400" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Formato */}
      <section className="container py-14 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c65a3a]">Como funciona</p>
        <h2 className="mt-3 text-3xl font-bold">Quatro semanas, formato claro</h2>
        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200/70 bg-white">
          {trajetoria.formato.map((f, i) => (
            <div
              key={f.item}
              className={`flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between ${
                i > 0 ? "border-t border-slate-100" : ""
              }`}
            >
              <span className="text-sm font-bold text-[#1a1333]">{f.item}</span>
              <span className="text-sm text-slate-500">{f.valor}</span>
            </div>
          ))}
        </div>
      </section>

      {/* As 4 semanas */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-14 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c65a3a]">Semana a semana</p>
          <h2 className="mt-3 text-3xl font-bold">O caminho das quatro semanas</h2>
          <div className="mt-10 space-y-6">
            {trajetoria.semanas.map((s, i) => (
              <motion.div
                key={s.n}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="grid gap-5 rounded-3xl border border-slate-200/70 bg-[#f7f8fc] p-7 lg:grid-cols-[auto_1fr]"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#c65a3a,#6b21a8)] font-baloo text-lg font-bold text-white">
                  S{s.n}
                </span>
                <div>
                  <h3 className="font-baloo text-xl font-bold">{s.titulo}</h3>
                  <p className="mt-1 text-sm font-semibold italic text-[#c65a3a]">{s.tema}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{s.texto}</p>
                  <p className="mt-3 flex items-start gap-2 text-sm font-medium leading-6 text-[#1a1333]">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-teal-600" />
                    Entrega da semana: {s.entrega}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Entregáveis */}
      <section className="container py-14 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c65a3a]">Seu resultado</p>
        <h2 className="mt-3 text-3xl font-bold">Você sai da mentoria com</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {trajetoria.entregaveis.map((e, i) => (
            <div key={e} className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white px-5 py-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-[#c65a3a]">
                {i + 1}
              </span>
              <span className="text-sm font-medium leading-6 text-slate-700">{e}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Investimento */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container grid gap-8 py-14 sm:py-16 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border-2 border-[#c65a3a] bg-white p-8 shadow-[0_18px_50px_rgba(198,90,58,0.12)]">
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-[#c65a3a]">
              Condição da Turma Fundadora
            </span>
            <div className="mt-5 flex items-end gap-3">
              <p className="font-baloo text-5xl font-bold text-[#1a1333]">
                {trajetoria.investimento.precoFundador}
              </p>
              <p className="pb-2 text-sm text-slate-400">
                <s>{trajetoria.investimento.precoOficial}</s> no preço oficial
              </p>
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-500">{trajetoria.investimento.parcelamento}</p>
            <ul className="mt-5 space-y-2.5">
              {[trajetoria.investimento.vagas + " pagas, com acompanhamento próximo", trajetoria.investimento.bolsas].map(
                (item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
                    <Users className="mt-1 size-4 shrink-0 text-[#c65a3a]" />
                    {item}
                  </li>
                )
              )}
            </ul>
            <p className="mt-5 text-sm leading-7 text-slate-500">{trajetoria.investimento.justificativa}</p>
            <a
              href="#candidatura"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1a1333] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#c65a3a]"
            >
              <ClipboardList className="size-4" />
              {trajetoria.ctaForm}
            </a>
          </div>
          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200/70 bg-[#f7f8fc] p-7">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#6b21a8]">
                <HeartHandshake className="size-4" />
                Compromisso com mulheres na tecnologia
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{trajetoria.compromissoMulheres}</p>
            </div>
            <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-7">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
                <AlertTriangle className="size-4" />
                Compromisso com a verdade
              </p>
              <p className="mt-3 text-sm leading-7 text-amber-900">{trajetoria.avisoHonesto}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário de candidatura */}
      <section id="candidatura" className="container scroll-mt-24 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c65a3a]">Candidatura</p>
          <h2 className="mt-3 text-3xl font-bold">Candidate-se à Turma Fundadora</h2>
          <p className="mt-3 flex items-start gap-2 text-sm leading-7 text-slate-500">
            <CalendarCheck className="mt-1 size-4 shrink-0 text-[#c65a3a]" />
            {trajetoria.selecao}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5 rounded-[2rem] border border-slate-200/70 bg-white p-7 shadow-[0_10px_40px_rgba(26,19,51,0.06)] sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="tj-name">Nome completo *</label>
                <input id="tj-name" required minLength={2} maxLength={160} className={`mt-1.5 ${inputClass}`} value={form.name} onChange={(e) => set("name")(e.target.value)} placeholder="Seu nome" />
              </div>
              <div>
                <label className={labelClass} htmlFor="tj-email">E-mail *</label>
                <input id="tj-email" required type="email" maxLength={320} className={`mt-1.5 ${inputClass}`} value={form.email} onChange={(e) => set("email")(e.target.value)} placeholder="voce@email.com" />
              </div>
              <div>
                <label className={labelClass} htmlFor="tj-whatsapp">WhatsApp *</label>
                <input id="tj-whatsapp" required minLength={8} maxLength={40} className={`mt-1.5 ${inputClass}`} value={form.whatsapp} onChange={(e) => set("whatsapp")(e.target.value)} placeholder="(31) 90000-0000" />
              </div>
              <div>
                <label className={labelClass} htmlFor="tj-linkedin">LinkedIn (opcional)</label>
                <input id="tj-linkedin" maxLength={320} className={`mt-1.5 ${inputClass}`} value={form.linkedin} onChange={(e) => set("linkedin")(e.target.value)} placeholder="linkedin.com/in/voce" />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="tj-area">1. Em que área você trabalha atualmente? *</label>
                <input id="tj-area" required minLength={2} maxLength={120} className={`mt-1.5 ${inputClass}`} value={form.areaAtual} onChange={(e) => set("areaAtual")(e.target.value)} placeholder="Ex.: administração, saúde, engenharia..." />
              </div>
              <div>
                <label className={labelClass} htmlFor="tj-formacao">2. Qual é a sua formação? *</label>
                <input id="tj-formacao" required minLength={2} maxLength={160} className={`mt-1.5 ${inputClass}`} value={form.formacao} onChange={(e) => set("formacao")(e.target.value)} placeholder="Curso, nível ou área de formação" />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="tj-porque">3. Por que deseja entrar em Dados ou IA? *</label>
              <textarea id="tj-porque" required minLength={10} maxLength={2000} rows={3} className={`mt-1.5 ${inputClass}`} value={form.porque} onChange={(e) => set("porque")(e.target.value)} />
            </div>

            <div>
              <label className={labelClass} htmlFor="tj-funcao">4. Qual função desperta seu interesse? *</label>
              <select id="tj-funcao" required className={`mt-1.5 ${inputClass}`} value={form.funcaoInteresse} onChange={(e) => set("funcaoInteresse")(e.target.value)}>
                <option value="">Selecione...</option>
                {FUNCOES_INTERESSE.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="tj-estudou">5. O que você já estudou (cursos, ferramentas, tentativas)? *</label>
              <textarea id="tj-estudou" required minLength={2} maxLength={2000} rows={3} className={`mt-1.5 ${inputClass}`} value={form.jaEstudou} onChange={(e) => set("jaEstudou")(e.target.value)} />
            </div>

            <div>
              <label className={labelClass} htmlFor="tj-dificuldade">6. Qual é a sua maior dificuldade hoje? *</label>
              <textarea id="tj-dificuldade" required minLength={5} maxLength={2000} rows={3} className={`mt-1.5 ${inputClass}`} value={form.maiorDificuldade} onChange={(e) => set("maiorDificuldade")(e.target.value)} />
            </div>

            <div>
              <label className={labelClass} htmlFor="tj-horas">7. Quanto tempo pode dedicar por semana? *</label>
              <select id="tj-horas" required className={`mt-1.5 ${inputClass}`} value={form.horasSemana} onChange={(e) => set("horasSemana")(e.target.value)}>
                <option value="">Selecione...</option>
                {HORAS_SEMANA.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="tj-expectativa">8. O que espera conquistar nos próximos seis meses? *</label>
              <textarea id="tj-expectativa" required minLength={5} maxLength={2000} rows={3} className={`mt-1.5 ${inputClass}`} value={form.expectativa} onChange={(e) => set("expectativa")(e.target.value)} />
            </div>

            <div>
              <label className={labelClass} htmlFor="tj-disponibilidade">9. Está disponível para os encontros ao vivo semanais? *</label>
              <select id="tj-disponibilidade" required className={`mt-1.5 ${inputClass}`} value={form.disponibilidade} onChange={(e) => set("disponibilidade")(e.target.value)}>
                <option value="">Selecione...</option>
                {DISPONIBILIDADE.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-slate-200 bg-[#f7f8fc] px-5 py-4 transition has-[:checked]:border-[#c65a3a]">
              <input
                type="checkbox"
                required
                checked={dispostoProjeto}
                onChange={(e) => setDispostoProjeto(e.target.checked)}
                className="mt-1 size-4 accent-[#c65a3a]"
              />
              <span className="text-sm leading-6 text-slate-700">
                <strong>10.</strong> Estou disposto(a) a desenvolver um projeto prático durante a mentoria. *
              </span>
            </label>

            <div>
              <label className={labelClass} htmlFor="tj-agora">11. Por que acredita que esta mentoria faz sentido agora? *</label>
              <textarea id="tj-agora" required minLength={5} maxLength={2000} rows={3} className={`mt-1.5 ${inputClass}`} value={form.porqueAgora} onChange={(e) => set("porqueAgora")(e.target.value)} />
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-slate-200 bg-[#f7f8fc] px-5 py-4 transition has-[:checked]:border-[#c65a3a]">
              <input
                type="checkbox"
                checked={bolsa}
                onChange={(e) => {
                  setBolsa(e.target.checked);
                  if (!e.target.checked) {
                    setForm((prev) => ({ ...prev, bolsaContexto: "" }));
                  }
                }}
                className="mt-1 size-4 accent-[#c65a3a]"
              />
              <span className="text-sm leading-6 text-slate-700">
                <strong>12.</strong> Desejo me candidatar a uma das bolsas integrais para mulheres em situação de
                vulnerabilidade econômica.
              </span>
            </label>

            {bolsa ? (
              <div>
                <label className={labelClass} htmlFor="tj-bolsa">Conte brevemente seu contexto para a bolsa (opcional)</label>
                <textarea id="tj-bolsa" maxLength={2000} rows={3} className={`mt-1.5 ${inputClass}`} value={form.bolsaContexto} onChange={(e) => set("bolsaContexto")(e.target.value)} />
              </div>
            ) : null}

            <label className="flex cursor-pointer items-start gap-3 px-1">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 size-4 accent-[#c65a3a]"
              />
              <span className="text-xs leading-6 text-slate-500">
                Autorizo o contato da Giselle Falcão sobre a minha candidatura, por e-mail ou WhatsApp. Os
                dados são usados apenas para a seleção da turma e não são compartilhados com terceiros
                (LGPD). *
              </span>
            </label>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1a1333] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#c65a3a] disabled:opacity-60"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Enviando candidatura...
                </>
              ) : (
                <>
                  Enviar candidatura
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </GiselleLayout>
  );
}
