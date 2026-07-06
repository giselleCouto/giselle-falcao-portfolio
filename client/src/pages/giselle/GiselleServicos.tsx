import { motion } from "framer-motion";
import {
  Boxes,
  Calendar,
  Factory,
  LineChart,
  MessageCircle,
  Sigma,
  type LucideIcon,
} from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { consultingSectors, consultingServices, contact } from "@/lib/portfolioData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const serviceMeta: Record<string, { icon: LucideIcon; tint: string; text: string }> = {
  "industrial-ai": {
    icon: Factory,
    tint: "bg-violet-100 text-[#6b21a8]",
    text: "Inspeção, qualidade e monitoramento inteligente para operações complexas.",
  },
  "digital-twins": {
    icon: Boxes,
    tint: "bg-teal-100 text-teal-700",
    text: "Gêmeos digitais e simulação de cenários para decidir antes do problema.",
  },
  "math-modeling": {
    icon: Sigma,
    tint: "bg-amber-100 text-amber-700",
    text: "Otimização e previsão para reduzir perdas e alocar melhor os recursos.",
  },
  "strategic-analytics": {
    icon: LineChart,
    tint: "bg-pink-100 text-pink-700",
    text: "Dados dispersos viram critérios claros de diagnóstico e ação.",
  },
};

const fallbackMeta = {
  icon: LineChart,
  tint: "bg-violet-100 text-[#6b21a8]",
  text: "Consultoria em IA aplicada a decisões críticas.",
};

const steps = [
  { number: "1", title: "Diagnóstico", text: "Entender o problema real" },
  { number: "2", title: "Modelagem", text: "Matemática e IA aplicadas" },
  { number: "3", title: "Implementação", text: "Sistema em produção" },
  { number: "4", title: "Acompanhamento", text: "Medir e ajustar sempre" },
];

const sectorTints = [
  "border-violet-200 bg-violet-50 text-[#6b21a8]",
  "border-teal-200 bg-teal-50 text-teal-700",
  "border-amber-200 bg-amber-50 text-amber-700",
];

export default function GiselleServicos() {
  return (
    <GiselleLayout>
      {/* Header */}
      <section className="container pb-4 pt-14 sm:pt-20">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }}>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Consultoria</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Como posso{" "}
            <span className="bg-[linear-gradient(90deg,#6b21a8,#8b5cf6,#14b8a6)] bg-clip-text text-transparent">
              ajudar
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-500">
            Consultoria em IA e ciência de dados para operações que não podem errar.
          </p>
        </motion.div>
      </section>

      {/* Grid de serviços */}
      <section className="container py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {consultingServices.map((service, i) => {
            const meta = serviceMeta[service.key] ?? fallbackMeta;
            return (
              <motion.div
                key={service.key}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(26,19,51,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(107,33,168,0.12)]"
              >
                <span className={`flex size-12 items-center justify-center rounded-2xl ${meta.tint}`}>
                  <meta.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{service.title.pt}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{meta.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Como trabalho */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-16 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Método</p>
          <h2 className="mt-3 text-3xl font-bold">Como trabalho</h2>
          <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex flex-1 items-center gap-4 lg:flex-col lg:gap-0 lg:text-center"
              >
                <div className="flex items-center lg:w-full">
                  <div className={`hidden h-1 flex-1 rounded-full lg:block ${i === 0 ? "bg-transparent" : "bg-[linear-gradient(90deg,#8b5cf6,#14b8a6)] opacity-40"}`} />
                  <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#6b21a8,#8b5cf6,#14b8a6)] font-baloo text-2xl font-bold text-white shadow-[0_10px_30px_rgba(107,33,168,0.35)]">
                    {step.number}
                  </span>
                  <div className={`hidden h-1 flex-1 rounded-full lg:block ${i === steps.length - 1 ? "bg-transparent" : "bg-[linear-gradient(90deg,#8b5cf6,#14b8a6)] opacity-40"}`} />
                </div>
                <div className="lg:mt-4">
                  <p className="font-baloo text-lg font-bold">{step.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Onde atuo */}
      <section className="container py-16 sm:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-[0_10px_40px_rgba(26,19,51,0.06)]"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Setores</p>
          <h2 className="mt-3 text-3xl font-bold">Onde atuo</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {consultingSectors.pt.map((sector, i) => (
              <span
                key={sector}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold ${sectorTints[i % sectorTints.length]}`}
              >
                {sector}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA final */}
      <section className="container pb-16 sm:pb-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0d1226]">
          <div className="absolute -left-20 -top-20 size-72 rounded-full bg-[#6b21a8] opacity-30 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 size-72 rounded-full bg-[#14b8a6] opacity-20 blur-3xl" />
          <div className="relative flex flex-col items-center gap-6 px-8 py-16 text-center">
            <h2 className="max-w-xl font-baloo text-3xl font-bold text-white sm:text-4xl">
              Vamos conversar sobre o seu desafio?
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={contact.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#1a1333] transition hover:bg-violet-100"
              >
                <Calendar className="size-4" />
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
