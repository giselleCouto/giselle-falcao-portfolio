import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  FileText,
  GraduationCap,
  MessageCircle,
  Mic,
  Sparkles,
} from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import {
  assets,
  certifications,
  contact,
  educationTimeline,
  publications,
  speaking,
  stack,
} from "@/lib/portfolioData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const SCHOLAR_URL = "https://scholar.google.com.br/citations?hl=pt-BR&user=ljBj6GMAAAAJ";

type Credential = {
  icon: typeof BookOpen;
  tint: string;
  value: string;
  label: string;
  href?: string;
  linkLabel?: string;
};

const credentials: Credential[] = [
  {
    icon: BookOpen,
    tint: "bg-violet-100 text-[#6b21a8]",
    value: String(publications.length),
    label: "publicações com DOI",
    href: SCHOLAR_URL,
    linkLabel: "Google Scholar",
  },
  {
    icon: FileText,
    tint: "bg-teal-100 text-teal-700",
    value: "Lattes",
    label: "currículo oficial CNPq",
    href: contact.lattes,
    linkLabel: "Abrir Lattes",
  },
  {
    icon: Award,
    tint: "bg-amber-100 text-amber-700",
    value: String(certifications.length),
    label: "certificações em nuvem e IA",
  },
  {
    icon: Mic,
    tint: "bg-pink-100 text-pink-700",
    value: String(speaking.themes.pt.length),
    label: "frentes de palestras e formação",
  },
];

export default function GiselleSobre() {
  return (
    <GiselleLayout>
      {/* Header com foto */}
      <section className="container grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }}>
          <p className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#6b21a8]">
            <Sparkles className="size-3.5" />
            Sobre
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl">
            Dra. Giselle{" "}
            <span className="bg-[linear-gradient(90deg,#6b21a8,#8b5cf6,#14b8a6)] bg-clip-text text-transparent">
              Couto Falcão
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-500">
            Pesquisadora e consultora na interseção entre IA industrial, modelagem matemática e
            ciência de dados. Rigor acadêmico e clareza executiva para decisões de alto impacto.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-3 rounded-[2.5rem] bg-[linear-gradient(135deg,#6b21a8,#8b5cf6,#14b8a6)] opacity-15 blur-xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-white shadow-[0_18px_60px_rgba(26,19,51,0.12)]">
            <img
              src={assets.heroAtlas}
              alt="Dra. Giselle Couto Falcão"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="flex items-center gap-3 p-5">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-violet-100 text-[#6b21a8]">
                <GraduationCap className="size-6" />
              </span>
              <div>
                <p className="font-baloo text-sm font-bold">2 doutorados (PhD)</p>
                <p className="text-xs text-slate-500">CEFET-MG · Sorbonne University</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Linha do tempo da formação */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-16 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Formação</p>
          <h2 className="mt-3 text-3xl font-bold">Trajetória acadêmica</h2>
          <ol className="relative mt-10 max-w-2xl space-y-6 border-l-2 border-violet-200 pl-8">
            {educationTimeline.map((item, i) => (
              <motion.li
                key={item.title.pt}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative"
              >
                <span className="absolute -left-[41px] top-1 size-4 rounded-full border-4 border-white bg-[linear-gradient(135deg,#6b21a8,#14b8a6)] shadow" />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {item.institution !== "—" ? (
                    <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-700">
                      {item.institution}
                    </span>
                  ) : null}
                  <p className="text-sm font-semibold text-[#1a1333]">{item.title.pt}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Credenciais */}
      <section className="container py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Credenciais</p>
        <h2 className="mt-3 text-3xl font-bold">Autoridade verificável</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((cred, i) => (
            <motion.div
              key={cred.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(26,19,51,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(107,33,168,0.12)]"
            >
              <span className={`flex size-12 items-center justify-center rounded-2xl ${cred.tint}`}>
                <cred.icon className="size-6" />
              </span>
              <p className="mt-5 font-baloo text-4xl font-bold bg-[linear-gradient(90deg,#6b21a8,#8b5cf6,#14b8a6)] bg-clip-text text-transparent">
                {cred.value}
              </p>
              <p className="mt-1 flex-1 text-sm font-medium text-slate-500">{cred.label}</p>
              {cred.href ? (
                <a
                  href={cred.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#6b21a8] hover:underline"
                >
                  {cred.linkLabel}
                  <ArrowUpRight className="size-4" />
                </a>
              ) : null}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stack tecnológico */}
      <section className="container pb-16 sm:pb-20">
        <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-[0_10px_40px_rgba(26,19,51,0.06)]">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Stack</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-[#6b21a8]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final (painel escuro) */}
      <section className="container pb-16 sm:pb-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0d1226]">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(107,33,168,0.55),rgba(13,18,38,0.75))]" />
          <div className="relative flex flex-col items-center gap-6 px-8 py-16 text-center">
            <h2 className="max-w-xl font-baloo text-3xl font-bold text-white sm:text-4xl">
              Quer trabalhar comigo?
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={contact.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-7 py-3 text-sm font-bold text-[#1a1333] transition hover:bg-violet-100"
              >
                Agendar conversa
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </GiselleLayout>
  );
}
