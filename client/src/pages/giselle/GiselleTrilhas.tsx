import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowDown, ArrowRight, Map, Sparkles } from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { escadaCarreira } from "@/lib/trilhasCarreiraData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const estilos = [
  { grad: "linear-gradient(135deg,#14b8a6,#0d9488)", badge: "bg-teal-100 text-teal-700" },
  { grad: "linear-gradient(135deg,#8b5cf6,#6b21a8)", badge: "bg-violet-100 text-[#6b21a8]" },
  { grad: "linear-gradient(135deg,#1a1333,#6b21a8)", badge: "bg-slate-200 text-[#1a1333]" },
];

export default function GiselleTrilhas() {
  return (
    <GiselleLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0d1226]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(20,184,166,0.3),transparent_50%),radial-gradient(circle_at_85%_20%,rgba(107,33,168,0.35),transparent_45%)]" />
        <div className="container relative py-16 sm:py-20">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }}>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur">
              <Map className="size-3.5" />
              Trilhas de carreira
            </p>
            <h1 className="mt-5 max-w-3xl font-baloo text-4xl font-bold leading-[1.05] text-white sm:text-5xl">
              Uma escada, três degraus:{" "}
              <span className="bg-[linear-gradient(90deg,#2dd4bf,#8b5cf6,#c4b5fd)] bg-clip-text text-transparent">
                do zero ao arquiteto
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Em vez de cursos soltos, um caminho: comece como Analista de Dados, evolua para Cientista de
              Dados e chegue à formação de Arquiteto de Soluções, Dados & IA. Cada trilha diz o que estudar,
              em que ordem e por quê.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Escada */}
      <section className="container py-14 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-4">
          {escadaCarreira.map((degrau, i) => (
            <motion.div
              key={degrau.href}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Link
                href={degrau.href}
                className="group block rounded-3xl border border-slate-200/70 bg-white p-7 shadow-[0_10px_40px_rgba(26,19,51,0.06)] transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_18px_50px_rgba(107,33,168,0.14)]"
              >
                <div className="flex items-start gap-5">
                  <span
                    className="flex size-14 shrink-0 items-center justify-center rounded-2xl font-baloo text-xl font-bold text-white"
                    style={{ background: estilos[i]?.grad }}
                  >
                    {degrau.ordem}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-baloo text-2xl font-bold">{degrau.cargo}</h2>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${estilos[i]?.badge}`}>
                        {degrau.carga}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{degrau.nivel}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{degrau.resumo}</p>
                  </div>
                  <ArrowRight className="mt-1 size-5 shrink-0 text-slate-300 transition group-hover:text-[#6b21a8]" />
                </div>
              </Link>
              {i < escadaCarreira.length - 1 ? (
                <div className="flex justify-center py-1">
                  <ArrowDown className="size-5 text-slate-300" />
                </div>
              ) : null}
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-7 text-slate-500">
          Cada degrau assume as competências do anterior — mas se você já domina a base, pode entrar direto
          no degrau que corresponde ao seu momento. As trilhas certificam competências demonstradas; a
          evolução de carreira depende também de prática real e portfólio.
        </p>
      </section>

      {/* CTA */}
      <section className="container pb-16">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0d1226]">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(20,184,166,0.35),rgba(13,18,38,0.9))]" />
          <div className="relative flex flex-col items-start gap-6 px-8 py-12 sm:py-14 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-baloo text-2xl font-bold text-white sm:text-3xl">
                Não sabe em qual degrau está? Comece pelo primeiro curso gratuito.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                O catálogo completo mostra todos os cursos das trilhas — os de nível Iniciante são gratuitos.
              </p>
            </div>
            <Link
              href="/giselle/cursos"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#1a1333] transition hover:bg-teal-100"
            >
              <Sparkles className="size-4" />
              Ver todos os cursos
            </Link>
          </div>
        </div>
      </section>
    </GiselleLayout>
  );
}
