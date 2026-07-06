import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Leaf,
  MessageCircle,
  Radar,
  Ship,
  TreePine,
  Waves,
} from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { contact, projects } from "@/lib/portfolioData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type Project = (typeof projects)[number];
type DemoProject = Project & { link: string; linkLabel: string };

const FEATURED = [
  {
    label: "SensorMonit",
    icon: Radar,
    tint: "bg-violet-100 text-[#6b21a8]",
    chip: "bg-violet-100 text-violet-700",
    blurb: "Prevê falhas antes da parada e prioriza a manutenção.",
  },
  {
    label: "Curral AI",
    icon: Ship,
    tint: "bg-teal-100 text-teal-700",
    chip: "bg-teal-100 text-teal-700",
    blurb: "Roteirização naval que levou a ocupação da frota de 60% para 87%.",
  },
  {
    label: "GreenSenti",
    icon: Leaf,
    tint: "bg-emerald-100 text-emerald-700",
    chip: "bg-emerald-100 text-emerald-700",
    blurb: "Clima e precipitação traduzidos em risco acionável para ESG.",
  },
  {
    label: "EucaSmart",
    icon: TreePine,
    tint: "bg-amber-100 text-amber-700",
    chip: "bg-amber-100 text-amber-700",
    blurb: "Sensores, satélite e IA no manejo preditivo do eucalipto.",
  },
  {
    label: "Pharos",
    icon: Waves,
    tint: "bg-sky-100 text-sky-700",
    chip: "bg-sky-100 text-sky-700",
    blurb: "Cabotagem planejada com marés reais e 4 cenários de custo.",
  },
];

const demos = FEATURED.flatMap((item) => {
  const project = projects.find(
    (p): p is DemoProject => "linkLabel" in p && p.linkLabel === item.label,
  );
  return project ? [{ ...item, project }] : [];
});

const others = projects.filter((p) => !("linkLabel" in p));

const OTHER_TINTS = [
  "bg-violet-100 text-violet-700",
  "bg-teal-100 text-teal-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
];

export default function GiselleSolucoes() {
  return (
    <GiselleLayout>
      {/* Header */}
      <section className="container pt-14 sm:pt-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
            Portfólio
          </p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Soluções{" "}
            <span className="bg-[linear-gradient(90deg,#6b21a8,#8b5cf6,#14b8a6)] bg-clip-text text-transparent">
              em produção
            </span>
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-500">
            Sistemas de IA rodando de verdade — indústria, agro, logística e clima.
          </p>
        </motion.div>
      </section>

      {/* Destaques com demo */}
      <section className="container py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((demo, i) => (
            <motion.div
              key={demo.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="h-full"
            >
              <div className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(26,19,51,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(107,33,168,0.12)]">
                <div className="flex items-start justify-between gap-3">
                  <span className={`flex size-12 items-center justify-center rounded-2xl ${demo.tint}`}>
                    <demo.icon className="size-6" />
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${demo.chip}`}>
                    {demo.project.category}
                  </span>
                </div>
                <h2 className="mt-5 font-baloo text-2xl font-bold">{demo.label}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{demo.blurb}</p>
                <a
                  href={demo.project.link}
                  className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-[#1a1333] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6b21a8]"
                >
                  Abrir demo
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Outros projetos */}
      <section className="container pb-16 sm:pb-20">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
          Bastidores
        </p>
        <h2 className="mt-3 text-3xl font-bold">Outros projetos</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p, i) => (
            <motion.div
              key={p.title.pt}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="h-full"
            >
              <div className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white p-5 shadow-[0_10px_40px_rgba(26,19,51,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(107,33,168,0.12)]">
                <span
                  className={`self-start rounded-full px-3 py-1 text-xs font-bold ${OTHER_TINTS[i % OTHER_TINTS.length]}`}
                >
                  {p.category}
                </span>
                <h3 className="mt-4 text-base font-bold leading-snug">{p.title.pt}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-500 line-clamp-2">
                  {p.context.pt}
                </p>
                {"link" in p ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 self-start text-sm font-bold text-[#6b21a8] hover:underline"
                  >
                    Ver demo
                    <ArrowUpRight className="size-4" />
                  </a>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="container pb-16 sm:pb-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-[#0d1226]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(107,33,168,0.5),rgba(13,18,38,0.9))]" />
          <div className="relative flex flex-col items-center gap-5 px-8 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
            <h2 className="max-w-md font-baloo text-2xl font-bold text-white sm:text-3xl">
              Quer uma solução assim na sua operação?
            </h2>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#1a1333] transition hover:bg-violet-100"
            >
              <MessageCircle className="size-4" />
              Chamar no WhatsApp
            </a>
          </div>
        </motion.div>
      </section>
    </GiselleLayout>
  );
}
