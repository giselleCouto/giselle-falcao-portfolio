import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Compass,
  HeartHandshake,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { contact } from "@/lib/portfolioData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

// Hub de mentorias — decisão da Giselle (set/2026): ela mentora mulheres E
// homens. A aba Mentoria é aberta a todos; o Impulso Dela IA permanece como
// programa dedicado às mulheres, em página própria (/giselle/mentoria/impulso).
const caminhos = [
  {
    href: "/giselle/mentoria/trajetoria",
    badge: "Inscrições abertas · para todos",
    badgeClass: "bg-orange-100 text-[#a94b30]",
    titulo: "Turma Fundadora · Mentoria Trajetória",
    texto:
      "4 semanas para iniciar, migrar ou reposicionar sua carreira em Dados e IA: direção, um caso prático para o portfólio e um plano de 90 dias. 12 vagas, seleção por aderência — com bolsas para mulheres.",
    cta: "Conhecer e me candidatar",
    Icon: Compass,
    iconClass: "bg-[linear-gradient(135deg,#c65a3a,#6b21a8)]",
    destaque: true,
  },
  {
    href: "/giselle/mentoria/impulso",
    badge: "Programa dedicado às mulheres",
    badgeClass: "bg-pink-100 text-pink-700",
    titulo: "Impulso Dela IA · Mentoria para mulheres",
    texto:
      "Direção, conhecimento e confiança para mulheres que desejam entrar, migrar ou crescer em Dados e IA — comunidade, grupo e acompanhamento individual, pelo método dos 4 movimentos.",
    cta: "Conhecer o Impulso Dela IA",
    Icon: HeartHandshake,
    iconClass: "bg-[linear-gradient(135deg,#ec4899,#6b21a8)]",
    destaque: false,
  },
] as const;

const individualInclui = [
  "Diagnóstico do seu momento: competências, lacunas e objetivo",
  "Plano de desenvolvimento e posicionamento sob medida",
  "Acompanhamento nas decisões: projetos, transição, negociação",
  "Formato e ritmo definidos na conversa — proposta individual",
];

export default function GiselleMentoriaHub() {
  return (
    <GiselleLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_25%,rgba(107,33,168,0.09),transparent_45%),radial-gradient(circle_at_88%_15%,rgba(20,184,166,0.09),transparent_45%)]" />
        <div className="container relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }}>
            <p className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#6b21a8]">
              <Sparkles className="size-3.5" />
              Mentoria em Dados & IA
            </p>
            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.08] sm:text-5xl">
              Você não precisa descobrir sozinho(a) como construir uma carreira em Dados e IA.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-500">
              Direção, método e acompanhamento para quem quer entrar, migrar ou crescer — mulheres e
              homens, cada pessoa no formato certo para o seu momento.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-3 rounded-[2.5rem] bg-[linear-gradient(135deg,#6b21a8,#8b5cf6,#14b8a6)] opacity-15 blur-xl" />
            <img
              src="/brand/giselle-mentora.jpg"
              alt="Giselle Couto Falcão"
              className="relative aspect-[4/5] w-full rounded-[2.5rem] border border-slate-200/70 object-cover object-top shadow-[0_18px_60px_rgba(26,19,51,0.14)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Os dois programas */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-14 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Programas</p>
          <h2 className="mt-3 text-3xl font-bold">Escolha o seu caminho</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {caminhos.map((c, i) => (
              <motion.div
                key={c.href}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`flex h-full flex-col rounded-3xl border-2 p-7 ${
                  c.destaque
                    ? "border-[#c65a3a] bg-white shadow-[0_18px_50px_rgba(198,90,58,0.12)]"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`flex size-12 items-center justify-center rounded-2xl text-white ${c.iconClass}`}>
                    <c.Icon className="size-6" />
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${c.badgeClass}`}>{c.badge}</span>
                </div>
                <h3 className="mt-5 font-baloo text-2xl font-bold">{c.titulo}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{c.texto}</p>
                <Link
                  href={c.href}
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition ${
                    c.destaque
                      ? "bg-[#1a1333] text-white hover:bg-[#c65a3a]"
                      : "border-2 border-violet-200 text-[#6b21a8] hover:bg-violet-50"
                  }`}
                >
                  {c.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentoria individual — aberta a todos (homens incluídos) */}
      <section className="container py-14 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6b21a8]">
              Mentoria individual
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold">
              Acompanhamento individual — para mulheres e homens
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
              Sim, também mentoro homens. Profissionais que precisam de direção individual — para
              entrar na área, destravar um projeto, se reposicionar ou preparar o próximo passo de
              carreira — são acompanhados no formato um a um, desenhado a partir de uma conversa de
              diagnóstico.
            </p>
            <ul className="mt-6 space-y-2.5">
              {individualInclui.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-teal-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border-2 border-violet-200 bg-white p-7 shadow-[0_18px_50px_rgba(107,33,168,0.1)]">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#6b21a8]">
              <Users className="size-4" />
              Como começa
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Tudo parte de uma conversa de diagnóstico: eu entendo seu momento, você entende o
              método — e só então desenhamos formato, duração e investimento, sob proposta
              individual.
            </p>
            <a
              href={contact.calendar}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1a1333] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#6b21a8]"
            >
              <CalendarCheck className="size-4" />
              Solicitar conversa de diagnóstico
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-violet-200 px-6 py-3.5 text-sm font-bold text-[#6b21a8] transition hover:bg-violet-50"
            >
              <MessageCircle className="size-4" />
              Prefiro WhatsApp
            </a>
          </div>
        </div>
      </section>
    </GiselleLayout>
  );
}
