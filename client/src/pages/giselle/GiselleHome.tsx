import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  BookText,
  BrainCircuit,
  Briefcase,
  GraduationCap,
  MessageCircle,
  Newspaper,
  Rocket,
  Sparkles,
  TrendingDown,
  UserRound,
} from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { assets, contact, keyAreas } from "@/lib/portfolioData";
import { pressFeatures } from "@/lib/pressData";
import { livro } from "@/lib/livroData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const metrics = [
  { value: "2", label: "doutorados (PhD)" },
  { value: "5", label: "soluções em produção" },
  { value: "4", label: "cursos com certificado" },
  { value: "10+", label: "setores atendidos" },
];

const portals = [
  {
    href: "/giselle/solucoes",
    icon: Rocket,
    tint: "bg-violet-100 text-[#6b21a8]",
    title: "Soluções",
    text: "Sistemas de IA em produção: indústria, agro, logística e clima.",
  },
  {
    href: "/giselle/cursos",
    icon: GraduationCap,
    tint: "bg-teal-100 text-teal-700",
    title: "Cursos",
    text: "Aprenda IA na prática, com certificado e trilha gamificada.",
  },
  {
    href: "/giselle/servicos",
    icon: Briefcase,
    tint: "bg-amber-100 text-amber-700",
    title: "Serviços",
    text: "Consultoria em IA e ciência de dados para decisões críticas.",
  },
  {
    href: "/giselle/sobre",
    icon: UserRound,
    tint: "bg-pink-100 text-pink-700",
    title: "Sobre",
    text: "Trajetória, pesquisa e publicações da Dra. Giselle Falcão.",
  },
];

export default function GiselleHome() {
  return (
    <GiselleLayout>
      {/* Hero */}
      <section className="container grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }}>
          <p className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#6b21a8]">
            <Sparkles className="size-3.5" />
            PhD · IA Industrial
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
            AI que{" "}
            <span className="bg-[linear-gradient(90deg,#6b21a8,#8b5cf6,#14b8a6)] bg-clip-text text-transparent">
              entende, transforma
            </span>{" "}
            e impulsiona
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-500">
            Modelos, sistemas e estratégia de IA para quem precisa decidir com segurança.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/giselle/solucoes"
              className="inline-flex items-center gap-2 rounded-full bg-[#1a1333] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6b21a8]"
            >
              Ver soluções
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-violet-200 px-6 py-3 text-sm font-semibold text-[#6b21a8] transition hover:bg-violet-50"
            >
              <MessageCircle className="size-4" />
              Falar comigo
            </a>
          </div>
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
              alt="Giselle Falcão — IA industrial"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="flex items-center gap-3 p-5">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
                <BrainCircuit className="size-6" />
              </span>
              <div>
                <p className="font-baloo text-sm font-bold">Dra. Giselle Couto Falcão</p>
                <p className="text-xs text-slate-500">Pesquisadora e consultora em IA industrial</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Métricas */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="font-baloo text-4xl font-bold bg-[linear-gradient(90deg,#6b21a8,#8b5cf6,#14b8a6)] bg-clip-text text-transparent">
                {m.value}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portais */}
      <section className="container py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Explore</p>
        <h2 className="mt-3 text-3xl font-bold">Por onde você quer começar?</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {portals.map((portal, i) => (
            <motion.div
              key={portal.href}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Link
                href={portal.href}
                className="group flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(26,19,51,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(107,33,168,0.12)]"
              >
                <span className={`flex size-12 items-center justify-center rounded-2xl ${portal.tint}`}>
                  <portal.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{portal.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{portal.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#6b21a8]">
                  Explorar
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Destaque: livro recém-lançado */}
      <section className="container pb-16 sm:pb-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-[#0d1226]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(107,33,168,0.45),rgba(13,18,38,0.92))]" />
          <div className="relative grid items-center gap-8 px-8 py-10 sm:py-12 lg:grid-cols-[auto_1fr] lg:gap-12">
            <img
              src={livro.cover}
              alt={`Capa do livro ${livro.title}`}
              className="mx-auto w-40 rounded-xl shadow-[0_18px_50px_rgba(0,0,0,0.4)] sm:w-48"
            />
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur">
                <BookText className="size-3.5" />
                Novo livro · {livro.publisher} · {livro.year}
              </p>
              <h2 className="mt-4 font-baloo text-2xl font-bold text-white sm:text-3xl">
                {livro.title}
              </h2>
              <p className="mt-1 font-semibold text-violet-200">{livro.subtitle}</p>
              <p className="mt-4 max-w-xl leading-7 text-slate-300">{livro.shortPitch}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/giselle/livro"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1a1333] transition hover:bg-violet-100"
                >
                  Conhecer o livro
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/giselle/livro/dossie"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Dossiê para escolas
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Áreas-chave (chips visuais) */}
      <section className="container pb-16 sm:pb-20">
        <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-[0_10px_40px_rgba(26,19,51,0.06)]">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Especialidades</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {keyAreas.pt.map((area) => (
              <span
                key={area}
                className="rounded-full border border-violet-200 bg-violet-50 px-5 py-2.5 text-sm font-semibold text-[#6b21a8]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Na mídia */}
      <section className="container pb-16 sm:pb-20">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Na mídia</p>
        <h2 className="mt-3 text-3xl font-bold">Meu trabalho no jornal</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {pressFeatures.map((press, i) => (
            <motion.div
              key={press.url}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <a
                href={press.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(26,19,51,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(107,33,168,0.12)]"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1a1333] px-3 py-1 text-xs font-bold text-white">
                    <Newspaper className="size-3.5" />
                    {press.outlet}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                    {press.section} · {press.date}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold leading-snug">{press.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{press.summary}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-4 py-1.5 text-sm font-bold text-teal-700">
                    <TrendingDown className="size-4" />
                    {press.highlight}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-[#6b21a8]">
                    Ler matéria
                    <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA final (painel escuro estilo Base44) */}
      <section className="container pb-16 sm:pb-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0d1226]">
          <img
            src="/cursos/hero-cursos.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(107,33,168,0.55),rgba(13,18,38,0.75))]" />
          <div className="relative flex flex-col items-center gap-6 px-8 py-16 text-center">
            <h2 className="max-w-xl font-baloo text-3xl font-bold text-white sm:text-4xl">
              Vamos transformar seus dados em decisão?
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
                className="rounded-full border-2 border-white/40 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </GiselleLayout>
  );
}
