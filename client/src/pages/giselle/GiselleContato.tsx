import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  ChevronDown,
  FileText,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  PenLine,
} from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { contact, faqItems } from "@/lib/portfolioData";

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
