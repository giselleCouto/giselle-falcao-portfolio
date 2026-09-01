import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  AlertTriangle,
  Award,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Download,
  FlaskConical,
  Landmark,
  MessageCircle,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { trilha } from "@/lib/trilhaData";
import { contact } from "@/lib/portfolioData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function GiselleTrilha() {
  const [openCourse, setOpenCourse] = useState<string | null>("C0");

  return (
    <GiselleLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0d1226]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(107,33,168,0.4),transparent_50%),radial-gradient(circle_at_85%_20%,rgba(20,184,166,0.22),transparent_45%)]" />
        <div className="container relative py-16 sm:py-20">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }}>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur">
              <RouteIcon className="size-3.5" />
              Trilha profissional · {trilha.version}
            </p>
            <h1 className="mt-5 max-w-3xl font-baloo text-4xl font-bold leading-[1.05] text-white sm:text-5xl">
              Arquiteto de Soluções,{" "}
              <span className="bg-[linear-gradient(90deg,#2dd4bf,#8b5cf6,#c4b5fd)] bg-clip-text text-transparent">
                Dados & IA
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{trilha.subtitle}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {["480h em 10 cursos", "Multicloud: AWS · GCP · Azure · OCI", "Capstone com banca", "Certificação por competências"].map((chip) => (
                <span key={chip} className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur">
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Posição na escada de carreira */}
      <section className="border-b border-slate-200/70 bg-white">
        <div className="container flex flex-wrap items-center justify-between gap-4 py-5">
          <p className="text-sm leading-6 text-slate-600">
            <strong className="text-[#1a1333]">Degrau 3 de 3</strong> da escada de carreira — o caminho
            começa nas trilhas <strong className="text-[#1a1333]">Analista de Dados</strong> e{" "}
            <strong className="text-[#1a1333]">Cientista de Dados</strong>.
          </p>
          <Link
            href="/giselle/trilhas"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#6b21a8] transition hover:text-[#8b5cf6]"
          >
            Ver a escada completa
            <Sparkles className="size-4" />
          </Link>
        </div>
      </section>

      {/* Duas rotas */}
      <section className="container py-14 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Escolha sua rota</p>
        <h2 className="mt-3 text-3xl font-bold">Duas portas, o mesmo rigor</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {trilha.routes.map((route, i) => (
            <motion.div
              key={route.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`rounded-3xl border-2 p-7 ${
                route.highlight
                  ? "border-[#8b5cf6] bg-white shadow-[0_18px_50px_rgba(107,33,168,0.12)]"
                  : "border-slate-200 bg-white"
              }`}
            >
              {route.highlight ? (
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-[#6b21a8]">
                  Recomendada
                </span>
              ) : (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                  Mediante prova prática
                </span>
              )}
              <h3 className="mt-4 font-baloo text-2xl font-bold">{route.name}</h3>
              <p className="mt-1 font-baloo text-4xl font-bold bg-[linear-gradient(90deg,#6b21a8,#8b5cf6,#14b8a6)] bg-clip-text text-transparent">
                {route.hours}
              </p>
              <p className="text-sm font-semibold text-slate-400">
                {route.weeks} · {route.pace}
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-500">
                <strong className="text-[#1a1333]">Para quem:</strong> {route.audience}
              </p>
              <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-slate-500">
                <Award className="mt-0.5 size-4 shrink-0 text-teal-600" />
                {route.certification}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Aviso honesto */}
        <div className="mt-8 flex items-start gap-4 rounded-3xl border-2 border-amber-200 bg-amber-50 p-6">
          <AlertTriangle className="mt-1 size-6 shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
              Compromisso com a verdade
            </p>
            <p className="mt-2 text-sm leading-7 text-amber-900">{trilha.disclaimer}</p>
          </div>
        </div>
      </section>

      {/* Como as horas se distribuem */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-14 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Mão na massa de verdade</p>
          <h2 className="mt-3 text-3xl font-bold">Como as 480 horas se distribuem</h2>
          <div className="mt-8 max-w-3xl space-y-4">
            {trilha.workload.map((w) => (
              <div key={w.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-[#1a1333]">{w.label}</span>
                  <span className="font-bold text-[#6b21a8]">{w.hours}h</span>
                </div>
                <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${w.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-[linear-gradient(90deg,#6b21a8,#8b5cf6,#14b8a6)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Os 10 cursos */}
      <section className="container py-14 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">A jornada</p>
        <h2 className="mt-3 text-3xl font-bold">Os 10 cursos da trilha</h2>
        <p className="mt-3 max-w-2xl text-slate-500">
          Cada curso termina com evidências verificáveis e um <strong className="text-[#1a1333]">gate de aprovação</strong> — presença e consumo de vídeo não bastam.
        </p>

        <div className="relative mt-10 space-y-3">
          {trilha.courses.map((course, i) => {
            const open = openCourse === course.code;
            return (
              <motion.div
                key={course.code}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                className={`overflow-hidden rounded-3xl border bg-white transition ${
                  open ? "border-[#8b5cf6] shadow-[0_10px_40px_rgba(107,33,168,0.1)]" : "border-slate-200/70"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenCourse(open ? null : course.code)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
                >
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-2xl font-baloo text-base font-bold ${
                      course.code === "C9"
                        ? "bg-[linear-gradient(135deg,#6b21a8,#14b8a6)] text-white"
                        : "bg-violet-100 text-[#6b21a8]"
                    }`}
                  >
                    {course.code}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-base font-bold text-[#1a1333]">{course.title}</span>
                    <span className="text-xs font-semibold text-slate-400">
                      {course.hours} · {course.weeks} semana{course.weeks > 1 ? "s" : ""}
                    </span>
                  </span>
                  <ChevronDown className={`size-5 shrink-0 text-slate-400 transition ${open ? "rotate-180 text-[#8b5cf6]" : ""}`} />
                </button>

                {open ? (
                  <div className="border-t border-slate-100 px-5 py-5 sm:px-6">
                    <p className="text-sm leading-7 text-slate-600">{course.finalidade}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      <strong className="text-[#6b21a8]">Você sai sabendo:</strong> {course.competencias}
                    </p>
                    <div className="mt-4 rounded-2xl bg-teal-50/70 p-4">
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
                        <FlaskConical className="size-4" />
                        Laboratórios obrigatórios
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {course.labs.map((lab) => (
                          <li key={lab} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                            <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-teal-600" />
                            {lab}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="mt-3 flex items-start gap-2 rounded-2xl bg-violet-50/70 p-4 text-sm leading-6 text-slate-600">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#6b21a8]" />
                      <span>
                        <strong className="text-[#6b21a8]">Gate de aprovação:</strong> {course.gate}
                      </span>
                    </p>
                  </div>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Princípios + ingresso */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container grid gap-10 py-14 sm:py-16 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Princípios técnicos</p>
            <h2 className="mt-3 text-2xl font-bold">O que a trilha não abre mão</h2>
            <ul className="mt-6 space-y-3">
              {trilha.principles.map((p) => (
                <li key={p} className="flex items-start gap-3 rounded-2xl bg-[#f7f8fc] px-4 py-3 text-sm leading-6 text-slate-600">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-[#8b5cf6]" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Processo de ingresso</p>
            <h2 className="mt-3 text-2xl font-bold">Como entrar</h2>
            <ol className="mt-6 space-y-3">
              {trilha.ingresso.map((step, i) => (
                <li key={step} className="flex items-start gap-3 rounded-2xl bg-[#f7f8fc] px-4 py-3 text-sm leading-6 text-slate-600">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#6b21a8,#14b8a6)] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-400">
              <ClipboardCheck className="mt-0.5 size-4 shrink-0" />
              A declaração de experiência não substitui a prova prática — regra que protege a qualidade da turma acelerada.
            </p>
          </div>
        </div>
      </section>

      {/* B2B: Termo de Referência */}
      <section className="container py-14 sm:py-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-[#0d1226]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(107,33,168,0.5),rgba(13,18,38,0.9))]" />
          <div className="relative grid gap-8 px-8 py-12 sm:py-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur">
                <Landmark className="size-3.5" />
                Para empresas, instituições e setor público
              </p>
              <h2 className="mt-4 font-baloo text-2xl font-bold text-white sm:text-3xl">
                Termo de Referência completo e editável
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{trilha.b2b.text}</p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={trilha.trDownload}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#1a1333] transition hover:bg-violet-100"
              >
                <Download className="size-4" />
                Baixar o Termo de Referência
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <MessageCircle className="size-4" />
                Falar sobre contratação
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Anexos operacionais */}
      <section className="container pb-14">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Documentação completa</p>
        <h2 className="mt-3 text-2xl font-bold">Anexos operacionais</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {trilha.anexos.map((anexo) => (
            <a
              key={anexo.href}
              href={anexo.href}
              download
              className="group flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(26,19,51,0.06)] transition duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-[0_18px_50px_rgba(107,33,168,0.12)]"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-violet-100 text-[#6b21a8]">
                <Download className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-bold leading-snug">{anexo.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{anexo.description}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">{anexo.format}</p>
            </a>
          ))}
        </div>
      </section>

      {/* CTA cursos */}
      <section className="container pb-16">
        <div className="rounded-3xl border border-slate-200/70 bg-white p-8 text-center shadow-[0_10px_40px_rgba(26,19,51,0.06)]">
          <Building2 className="mx-auto size-8 text-[#6b21a8]" />
          <h2 className="mt-4 text-2xl font-bold">Quer começar agora?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Enquanto a trilha completa não abre turma, os cursos gratuitos da Academy constroem
            exatamente o piso técnico do C0.
          </p>
          <Link
            href="/giselle/cursos"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a1333] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#6b21a8]"
          >
            Ver cursos gratuitos
          </Link>
        </div>
      </section>
    </GiselleLayout>
  );
}
