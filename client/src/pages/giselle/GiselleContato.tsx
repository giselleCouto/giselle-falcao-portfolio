import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Compass,
  FileText,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MessageCircle,
  Mic,
  PenLine,
} from "lucide-react";
import { toast } from "sonner";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { contact, faqItems } from "@/lib/portfolioData";
import { getAttribution } from "@/lib/tracking";
import { trpc } from "@/lib/trpc";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const channels = [
  {
    href: contact.whatsapp,
    icon: MessageCircle,
    tint: "bg-emerald-100 text-emerald-600",
    title: "WhatsApp",
    text: "Resposta rápida, direto no celular.",
    cta: "Chamar agora",
    pill: "bg-emerald-500 text-white group-hover:bg-emerald-600",
  },
  {
    href: contact.email,
    icon: Mail,
    tint: "bg-violet-100 text-[#6b21a8]",
    title: "E-mail",
    text: "giselle@coutofalcao.com",
    cta: "Enviar e-mail",
    pill: "bg-[#6b21a8] text-white group-hover:bg-[#8b5cf6]",
  },
  {
    href: contact.calendar,
    icon: Calendar,
    tint: "bg-teal-100 text-teal-700",
    title: "Agendar reunião",
    text: "30 min, online.",
    cta: "Escolher horário",
    pill: "bg-teal-500 text-white group-hover:bg-teal-600",
  },
];

const socialLabels = [
  { label: "Instagram", icon: Instagram },
  { label: "LinkedIn", icon: Linkedin },
  { label: "GitHub", icon: Github },
  { label: "Google Scholar", icon: GraduationCap },
  { label: "Lattes CNPq", icon: FileText },
  { label: "Medium", icon: PenLine },
];

const socials = socialLabels.map((s) => ({
  ...s,
  href: contact.links.find((l) => l.label === s.label)?.href ?? "#",
}));

// As 3 perguntas mais comerciais do FAQ (respostas já curtas, 1-2 frases)
const faqs = [faqItems[0], faqItems[2], faqItems[3]];

// O que a pessoa procura — cada caminho com a porta certa
const procuras = [
  {
    valor: "Consultoria",
    icon: Briefcase,
    tint: "bg-violet-100 text-[#6b21a8]",
    titulo: "Consultoria em Dados & IA",
    texto:
      "Para empresas que precisam tirar projetos do papel — do diagnóstico ao sistema em produção, com valor medido.",
    href: "/giselle/ia-para-empresas",
    cta: "Ver Inteligência para Decisões",
  },
  {
    valor: "Mentoria",
    icon: Compass,
    tint: "bg-orange-100 text-[#a94b30]",
    titulo: "Mentoria de carreira",
    texto:
      "Para quem quer entrar, migrar ou crescer em Dados e IA — turma fundadora, Impulso Dela IA e acompanhamento individual.",
    href: "/giselle/mentoria",
    cta: "Conhecer as mentorias",
  },
  {
    valor: "Palestra ou treinamento",
    icon: Mic,
    tint: "bg-sky-100 text-sky-700",
    titulo: "Palestras e treinamentos",
    texto:
      "Keynotes, workshops hands-on e programas corporativos que ajudam equipes a aplicar IA no trabalho, com uso responsável.",
    href: "/giselle/palestras",
    cta: "Ver formatos e pedir proposta",
  },
];

const COMO_CONHECEU = [
  "ChatGPT, Claude, Gemini ou outra IA",
  "Google / busca",
  "Instagram",
  "LinkedIn",
  "Palestra ou evento",
  "Indicação",
  "Outro",
];

const FORM_INICIAL = { name: "", email: "", phone: "", procura: "", howFound: "", message: "" };

function FormularioContato() {
  const [form, setForm] = useState(FORM_INICIAL);
  const [consent, setConsent] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const mutation = trpc.leads.submit.useMutation({
    onSuccess: () => setEnviado(true),
    onError: (error) => toast.error(error.message || "Não foi possível enviar. Tente novamente."),
  });

  const set = (campo: keyof typeof FORM_INICIAL) => (valor: string) =>
    setForm((prev) => ({ ...prev, [campo]: valor }));

  const inputClass =
    "w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-[#1a1333] placeholder:text-slate-400 focus:border-[#8b5cf6] focus:outline-none";
  const labelClass = "block text-sm font-bold text-[#1a1333]";

  if (enviado) {
    return (
      <div className="rounded-3xl border-2 border-teal-200 bg-teal-50/40 p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-teal-600" />
        <h3 className="mt-4 font-baloo text-2xl font-bold">Mensagem recebida!</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-600">
          A Giselle responde pelo e-mail informado. Se for urgente, o WhatsApp é o caminho mais
          rápido.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const attr = getAttribution();
        mutation.mutate({
          route: "giselle-contato",
          persona: form.procura || "Contato geral",
          name: form.name,
          email: form.email,
          phone: form.phone,
          interest: form.procura,
          message: form.message,
          source: attr.source ?? "website",
          campaign: attr.campaign ?? "",
          howFound: form.howFound,
        });
      }}
      className="space-y-5 rounded-[2rem] border border-slate-200/70 bg-white p-7 shadow-[0_10px_40px_rgba(26,19,51,0.06)] sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="ct-name">Seu nome *</label>
          <input id="ct-name" required minLength={2} maxLength={160} className={`mt-1.5 ${inputClass}`} value={form.name} onChange={(e) => set("name")(e.target.value)} />
        </div>
        <div>
          <label className={labelClass} htmlFor="ct-email">E-mail *</label>
          <input id="ct-email" required type="email" maxLength={320} className={`mt-1.5 ${inputClass}`} value={form.email} onChange={(e) => set("email")(e.target.value)} />
        </div>
        <div>
          <label className={labelClass} htmlFor="ct-phone">WhatsApp (opcional)</label>
          <input id="ct-phone" maxLength={40} className={`mt-1.5 ${inputClass}`} value={form.phone} onChange={(e) => set("phone")(e.target.value)} placeholder="(31) 90000-0000" />
        </div>
        <div>
          <label className={labelClass} htmlFor="ct-procura">O que você procura? *</label>
          <select id="ct-procura" required className={`mt-1.5 ${inputClass}`} value={form.procura} onChange={(e) => set("procura")(e.target.value)}>
            <option value="">Selecione...</option>
            {[...procuras.map((p) => p.valor), "Outro assunto"].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="ct-como">Como conheceu meu trabalho? *</label>
        <select id="ct-como" required className={`mt-1.5 ${inputClass}`} value={form.howFound} onChange={(e) => set("howFound")(e.target.value)}>
          <option value="">Selecione...</option>
          {COMO_CONHECEU.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor="ct-message">Sua mensagem *</label>
        <textarea id="ct-message" required minLength={12} maxLength={4000} rows={4} className={`mt-1.5 ${inputClass}`} value={form.message} onChange={(e) => set("message")(e.target.value)} placeholder="Conte o contexto: empresa ou carreira, desafio e o que você espera." />
      </div>
      <label className="flex cursor-pointer items-start gap-3 px-1">
        <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 size-4 accent-[#6b21a8]" />
        <span className="text-xs leading-6 text-slate-500">
          Autorizo o contato da Giselle Falcão sobre esta mensagem, conforme a{" "}
          <Link href="/privacidade" className="font-semibold text-[#6b21a8] hover:underline">
            Política de Privacidade
          </Link>
          . *
        </span>
      </label>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1a1333] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#6b21a8] disabled:opacity-60"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            Enviar mensagem
            <ArrowRight className="size-4" />
          </>
        )}
      </button>
    </form>
  );
}

export default function GiselleContato() {
  return (
    <GiselleLayout>
      {/* Header */}
      <section className="container pb-4 pt-14 sm:pt-20">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }}>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Contato</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Vamos{" "}
            <span className="bg-[linear-gradient(90deg,#6b21a8,#8b5cf6,#14b8a6)] bg-clip-text text-transparent">
              conversar
            </span>
            ?
          </h1>
          <p className="mt-4 max-w-md text-lg leading-8 text-slate-500">
            Escolha o canal — a resposta vem rápido.
          </p>
        </motion.div>
      </section>

      {/* Canais */}
      <section className="container py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel, i) => (
            <motion.div
              key={channel.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col items-start rounded-3xl border border-slate-200/70 bg-white p-7 shadow-[0_10px_40px_rgba(26,19,51,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(107,33,168,0.12)]"
              >
                <span className={`flex size-14 items-center justify-center rounded-2xl ${channel.tint}`}>
                  <channel.icon className="size-7" />
                </span>
                <h2 className="mt-5 text-xl font-bold">{channel.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{channel.text}</p>
                <span
                  className={`mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${channel.pill}`}
                >
                  {channel.cta}
                  <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* O que você procura? — consultoria, mentoria e palestras + vídeo do palco */}
      <section className="container py-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
              O que você procura?
            </p>
            <h2 className="mt-3 text-3xl font-bold">Três caminhos, uma conversa</h2>
            <div className="mt-8 space-y-5">
              {procuras.map((p, i) => (
                <motion.div
                  key={p.valor}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="flex flex-col gap-4 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(26,19,51,0.06)] sm:flex-row sm:items-center"
                >
                  <span className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${p.tint}`}>
                    <p.icon className="size-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-baloo text-lg font-bold">{p.titulo}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{p.texto}</p>
                  </div>
                  <Link
                    href={p.href}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 border-violet-200 px-5 py-2.5 text-sm font-bold text-[#6b21a8] transition hover:bg-violet-50"
                  >
                    {p.cta}
                    <ArrowRight className="size-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Vídeo: Giselle no palco do Minas Summit */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto w-full max-w-xs lg:mx-0 lg:justify-self-end"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-[linear-gradient(135deg,#6b21a8,#8b5cf6,#14b8a6)] opacity-15 blur-xl" />
              <video
                controls
                playsInline
                preload="metadata"
                poster="/videos/giselle-apresentacao-poster.jpg"
                className="relative aspect-[9/16] w-full rounded-[2rem] border border-slate-200/70 bg-black object-cover shadow-[0_18px_60px_rgba(26,19,51,0.18)]"
              >
                <source src="/videos/giselle-apresentacao.mp4" type="video/mp4" />
                Seu navegador não reproduz vídeo — assista no Instagram @gisellecfalcao.
              </video>
            </div>
            <p className="mt-3 text-center text-xs font-semibold text-slate-400">
              Giselle no palco do Minas Summit 2026 · Casa do Baile
            </p>
          </motion.div>
        </div>
      </section>

      {/* Formulário */}
      <section className="container py-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Mensagem</p>
          <h2 className="mt-3 text-3xl font-bold">Ou me escreva por aqui</h2>
          <div className="mt-7">
            <FormularioContato />
          </div>
        </div>
      </section>

      {/* Redes */}
      <section className="container py-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-[0_10px_40px_rgba(26,19,51,0.06)]"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Redes</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-5 py-2.5 text-sm font-semibold text-[#6b21a8] transition hover:bg-violet-100"
              >
                <social.icon className="size-4" />
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="container py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">FAQ</p>
        <h2 className="mt-3 text-3xl font-bold">Perguntas frequentes</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question.pt}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <details className="group rounded-3xl border border-slate-200/70 bg-white shadow-[0_10px_40px_rgba(26,19,51,0.06)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-left font-semibold text-[#1a1333] [&::-webkit-details-marker]:hidden">
                  {faq.question.pt}
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[#6b21a8] transition group-open:rotate-180">
                    <ChevronDown className="size-4" />
                  </span>
                </summary>
                <p className="px-6 pb-6 text-sm leading-7 text-slate-500">{faq.answer.pt}</p>
              </details>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA final — painel claro com borda gradiente */}
      <section className="container pb-16 sm:pb-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="rounded-[2.5rem] bg-[linear-gradient(120deg,#6b21a8,#8b5cf6,#14b8a6)] p-[2px]"
        >
          <div className="flex flex-col items-center gap-6 rounded-[calc(2.5rem-2px)] bg-white px-8 py-14 text-center">
            <h2 className="max-w-lg font-baloo text-3xl font-bold sm:text-4xl">
              Prefere ir direto ao ponto?
            </h2>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-emerald-500 px-9 py-4 text-base font-bold text-white transition hover:bg-emerald-600"
            >
              <MessageCircle className="size-5" />
              Chamar no WhatsApp
            </a>
          </div>
        </motion.div>
      </section>
    </GiselleLayout>
  );
}
