import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock,
  FileCheck2,
  Gauge,
  GraduationCap,
  Layers,
  Quote,
  Target,
  Users,
  XCircle,
} from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import PedidoProposta from "@/components/giselle/PedidoProposta";
import { getCourse } from "@/lib/courses";
import { contact } from "@/lib/portfolioData";
import { programasExecutivos as pe, type ProgramaVenda } from "@/lib/programasExecutivosData";

// Página de vendas B2B dos Programas Executivos NOKAHI Edu.
// Conteúdo em lib/programasExecutivosData.ts (o snapshot para robôs usa o mesmo módulo).

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const TEAL = "#0f766e";

const TIPO_COMBINACAO = "Combinação de programas";
const TIPO_ORIENTACAO = "Ainda não sei — quero orientação";
const TIPOS_FORM = [...pe.programas.map((p) => p.rotuloFormulario), TIPO_COMBINACAO, TIPO_ORIENTACAO];

const iconesPilar = [Target, FileCheck2, Layers, GraduationCap];

function lerParametroPrograma(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return new URLSearchParams(window.location.search).get("programa");
  } catch {
    return null;
  }
}

function rolarPara(id: string, instantaneo = false) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: (instantaneo ? "instant" : "smooth") as ScrollBehavior, block: "start" });
}

export default function GiselleProgramasExecutivos() {
  const programaUrl = useMemo(() => lerParametroPrograma(), []);
  const nivelInicial =
    pe.niveis.find((n) => programaUrl && n.programas.includes(programaUrl))?.id ?? pe.niveis[0].id;
  const [nivelId, setNivelId] = useState(nivelInicial);
  const [tipoForm, setTipoForm] = useState(
    pe.programas.find((p) => p.slug === programaUrl)?.rotuloFormulario ?? "",
  );

  // Links de outras páginas chegam com #proposta ou #programas: a navegação da SPA
  // não rola sozinha até a âncora, então rolamos depois do primeiro render.
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    // Duas tentativas: a segunda corrige deslocamentos de layout (fontes, imagens).
    const t1 = window.setTimeout(() => rolarPara(id, true), 300);
    const t2 = window.setTimeout(() => rolarPara(id, true), 1000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const nivel = pe.niveis.find((n) => n.id === nivelId) ?? pe.niveis[0];
  const programasDoNivel = nivel.programas
    .map((slug) => pe.programas.find((p) => p.slug === slug))
    .filter((p): p is ProgramaVenda => Boolean(p));

  const pedirProposta = (rotulo: string) => {
    setTipoForm(rotulo);
    window.setTimeout(() => rolarPara("proposta"), 50);
  };

  return (
    <GiselleLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0b1424]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(15,118,110,0.45),transparent_50%),radial-gradient(circle_at_88%_15%,rgba(107,33,168,0.35),transparent_45%)]" />
        <div className="container relative py-16 sm:py-20">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.3 }}>
            <p className="inline-flex flex-wrap items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-teal-200 backdrop-blur">
              <BadgeCheck className="size-3.5" />
              {pe.marca}
              <span className="font-semibold normal-case tracking-normal text-teal-100/80">· {pe.assinatura}</span>
            </p>
            <h1 className="mt-5 max-w-3xl font-baloo text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
              {pe.heroTitulo}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{pe.heroSub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => rolarPara("proposta")}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#1a1333] transition hover:bg-teal-100"
              >
                <ClipboardList className="size-4" />
                Solicitar proposta
              </button>
              <button
                type="button"
                onClick={() => rolarPara("programas")}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Encontrar o programa certo
                <ArrowRight className="size-4" />
              </button>
            </div>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {pe.fatos.map((f) => (
              <div key={f.rotulo} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
                <p className="font-baloo text-2xl font-bold text-white">{f.valor}</p>
                <p className="mt-0.5 text-xs leading-5 text-slate-300">{f.rotulo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dores do comprador */}
      <section className="container py-14 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-600">O problema</p>
        <h2 className="mt-3 max-w-2xl font-baloo text-3xl font-bold sm:text-4xl">
          Por que tanto treinamento de IA não vira resultado
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pe.dores.map((d, i) => (
            <motion.div
              key={d.titulo}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="rounded-3xl border border-rose-100 bg-rose-50/50 p-6"
            >
              <XCircle className="size-6 text-rose-500" />
              <h3 className="mt-3 text-base font-bold text-[#1a1333]">{d.titulo}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{d.texto}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Como os programas são diferentes */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-14 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: TEAL }}>
            Como trabalhamos
          </p>
          <h2 className="mt-3 max-w-2xl font-baloo text-3xl font-bold sm:text-4xl">
            Quatro escolhas que mudam o resultado da formação
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pe.pilares.map((p, i) => {
              const Icon = iconesPilar[i] ?? Target;
              return (
                <motion.div
                  key={p.titulo}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-[#f7f8fc] p-6"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-800">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-baloo text-lg font-bold leading-snug">{p.titulo}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{p.texto}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seletor por nível da organização */}
      <section id="programas" className="container scroll-mt-24 py-14 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: TEAL }}>
          Os programas
        </p>
        <h2 className="mt-3 max-w-2xl font-baloo text-3xl font-bold sm:text-4xl">
          Quem você quer formar?
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          Escolha o público e veja o programa indicado e o que a empresa leva ao final.
        </p>

        <div role="tablist" aria-label="Público do programa" className="mt-8 flex flex-wrap gap-2">
          {pe.niveis.map((n) => {
            const ativo = n.id === nivel.id;
            return (
              <button
                key={n.id}
                type="button"
                role="tab"
                aria-selected={ativo}
                onClick={() => setNivelId(n.id)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  ativo
                    ? "bg-[#0f766e] text-white shadow-[0_8px_24px_rgba(15,118,110,0.25)]"
                    : "border-2 border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-[#0f766e]"
                }`}
              >
                <Users className="size-4" />
                {n.nome}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-500">{nivel.descricao}</p>

        <div className={`mt-6 grid gap-6 ${programasDoNivel.length > 1 ? "lg:grid-cols-2" : ""}`}>
          {programasDoNivel.map((p) => {
            const course = getCourse(p.slug);
            if (!course) return null;
            return (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex h-full flex-col rounded-3xl border-2 border-teal-100 bg-white p-7 shadow-[0_10px_40px_rgba(15,118,110,0.08)]"
              >
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-800">{course.level}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    <Clock className="size-3.5" />
                    {course.hours}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {p.semProgramacao ? "Sem programação" : "Técnico (SQL)"}
                  </span>
                </div>
                <h3 className="mt-4 font-baloo text-2xl font-bold leading-snug text-[#1a1333]">{course.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{p.pergunta}</p>

                <div className="mt-5 flex-1 rounded-2xl bg-teal-50/70 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-800">A empresa leva ao final</p>
                  <p className="mt-2 font-bold text-[#1a1333]">{p.entregavel}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{p.entregavelDetalhe}</p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => pedirProposta(p.rotuloFormulario)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#1a1333] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0f766e]"
                  >
                    Pedir proposta deste programa
                  </button>
                  <Link
                    href={`/giselle/cursos/${p.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-[#0f766e] hover:underline"
                  >
                    Ver módulos e aulas
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-violet-200 bg-violet-50/60 p-6">
          <p className="text-sm font-bold text-[#6b21a8]">Dá para combinar</p>
          <p className="mt-1.5 text-sm leading-6 text-slate-600">{pe.combinar}</p>
        </div>

        {/* Visão geral dos cinco programas */}
        <div className="mt-12">
          <h3 className="font-baloo text-xl font-bold text-[#1a1333]">Os cinco programas lado a lado</h3>
          <div className="mt-4 divide-y divide-slate-200/70 overflow-hidden rounded-3xl border border-slate-200/70 bg-white">
            {pe.programas.map((p) => {
              const course = getCourse(p.slug);
              if (!course) return null;
              return (
                <div key={p.slug} className="grid gap-2 px-6 py-4 md:grid-cols-[1.6fr_0.9fr_0.5fr_1.2fr] md:items-center md:gap-6">
                  <Link href={`/giselle/cursos/${p.slug}`} className="font-bold leading-snug text-[#1a1333] hover:text-[#0f766e]">
                    {course.title}
                  </Link>
                  <p className="text-sm text-slate-500">{p.paraQuem}</p>
                  <p className="text-sm font-semibold text-slate-600">{course.hours}</p>
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-teal-800">Entregável:</span> {p.entregavel}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Método por módulo */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-14 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: TEAL }}>
            Método
          </p>
          <h2 className="mt-3 max-w-2xl font-baloo text-3xl font-bold sm:text-4xl">
            Cada módulo, o mesmo ciclo
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {pe.metodo.map((m, i) => (
              <li key={m.titulo} className="relative rounded-3xl border border-slate-200/70 bg-[#f7f8fc] p-6">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f766e,#6b21a8)] font-baloo text-base font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-bold">{m.titulo}</h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">{m.texto}</p>
                {i < pe.metodo.length - 1 ? (
                  <ArrowRight className="absolute -right-3.5 top-1/2 hidden size-5 -translate-y-1/2 text-slate-300 md:block" />
                ) : null}
              </li>
            ))}
          </ol>
          <p className="mt-6 rounded-2xl bg-teal-50/70 px-5 py-4 text-sm leading-6 text-teal-900">
            <strong>Projeto aplicado:</strong> os entregáveis dos módulos se somam num projeto que a equipe
            apresenta à liderança. É ele que mostra, no fim, o que mudou.
          </p>
        </div>
      </section>

      {/* Jornada de contratação + o que está incluído */}
      <section className="container grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: TEAL }}>
            Como contratar
          </p>
          <h2 className="mt-3 font-baloo text-3xl font-bold">Da primeira conversa à apresentação dos projetos</h2>
          <ol className="mt-8 space-y-4">
            {pe.jornada.map((j, i) => (
              <li key={j.titulo} className="flex items-start gap-4 rounded-2xl border border-slate-200/70 bg-white px-5 py-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#0f766e] font-baloo text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold text-[#1a1333]">{j.titulo}</p>
                  <p className="mt-0.5 text-sm leading-6 text-slate-600">{j.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-3xl border border-slate-200/70 bg-[#f7f8fc] p-7">
          <p className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: TEAL }}>
            O que está incluído
          </p>
          <ul className="mt-5 space-y-3">
            {pe.inclui.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-teal-600" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-slate-200 pt-5 text-sm font-bold text-[#1a1333]">
            Investimento sob proposta, conforme programa, número de participantes e formato.
          </p>
        </div>
      </section>

      {/* Quem conduz */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container grid gap-10 py-14 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <img
            src="/brand/giselle-mentora.jpg"
            alt="Giselle Falcão"
            loading="lazy"
            className="aspect-[4/5] w-full max-w-sm rounded-[2rem] object-cover shadow-[0_18px_50px_rgba(26,19,51,0.15)]"
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: TEAL }}>
              Quem conduz
            </p>
            <h2 className="mt-3 font-baloo text-3xl font-bold">{pe.conductora.nome}</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">{pe.conductora.resumo}</p>
            <ul className="mt-6 space-y-2.5">
              {pe.conductora.provas.map((prova) => (
                <li key={prova} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-teal-600" />
                  {prova}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl border-2 border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900">
              {pe.conductora.independencia}
            </p>
            <Link href="/giselle/sobre" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#6b21a8] hover:underline">
              Trajetória completa
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Depoimentos reais (formações e acompanhamentos com a Giselle) */}
      {pe.depoimentos.length > 0 ? (
        <section className="bg-[#0b1424]">
          <div className="container py-14 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-300">Quem aprendeu com a Giselle</p>
            <h2 className="mt-3 max-w-2xl font-baloo text-3xl font-bold text-white sm:text-4xl">
              Modelos e agentes em operação, mantidos por quem aprendeu a fazer
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Depoimentos de profissionais que construíram soluções reais em formações e acompanhamentos com a
              Giselle, antes do lançamento dos Programas Executivos.
            </p>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {pe.depoimentos.map((d, i) => {
                const relacionado = getCourse(d.programaRelacionado);
                const iniciais = d.nome
                  .split(" ")
                  .map((parte) => parte[0])
                  .slice(0, 2)
                  .join("");
                return (
                  <motion.figure
                    key={d.nome}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7"
                  >
                    <span className="self-start rounded-full bg-teal-400/15 px-3 py-1 text-xs font-bold text-teal-200">
                      {d.tema}
                    </span>
                    <Quote className="mt-5 size-7 text-teal-300/70" />
                    <blockquote className="mt-2 font-baloo text-lg font-semibold leading-snug text-white">
                      “{d.destaque}”
                    </blockquote>
                    <p className="mt-4 text-sm leading-6 text-slate-400">{d.contexto}</p>
                    <details className="group mt-4 flex-1">
                      <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-sm font-bold text-teal-300 hover:underline [&::-webkit-details-marker]:hidden">
                        Ler depoimento completo
                        <ChevronDown className="size-4 transition group-open:rotate-180" />
                      </summary>
                      <div className="mt-3 space-y-3">
                        {d.texto.split("\n\n").map((paragrafo) => (
                          <p key={paragrafo.slice(0, 24)} className="text-sm leading-7 text-slate-300">
                            {paragrafo}
                          </p>
                        ))}
                      </div>
                    </details>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                      <span className="flex size-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0f766e,#6b21a8)] text-sm font-bold text-white">
                        {iniciais}
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-white">{d.nome}</span>
                        {relacionado ? (
                          <Link
                            href={`/giselle/cursos/${relacionado.slug}`}
                            className="block text-xs text-slate-400 hover:text-teal-200"
                          >
                            Tema relacionado: {relacionado.title.split(":")[0]}
                          </Link>
                        ) : null}
                      </span>
                    </figcaption>
                  </motion.figure>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="container py-14 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: TEAL }}>
          Perguntas de quem contrata
        </p>
        <h2 className="mt-3 font-baloo text-3xl font-bold">Antes de pedir a proposta</h2>
        <div className="mt-8 space-y-4">
          {pe.faq.map((item) => (
            <details
              key={item.q}
              className="group rounded-3xl border border-slate-200/70 bg-white shadow-[0_10px_40px_rgba(26,19,51,0.06)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-left font-semibold text-[#1a1333] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-100 text-[#0f766e] transition group-open:rotate-180">
                  <ChevronDown className="size-4" />
                </span>
              </summary>
              <p className="px-6 pb-6 text-sm leading-7 text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Pedido de proposta */}
      <section id="proposta" className="scroll-mt-24 border-t border-slate-200/70 bg-[#f7f8fc]">
        <div className="container grid gap-10 py-14 sm:py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: TEAL }}>
              Proposta sem compromisso
            </p>
            <h2 className="mt-3 font-baloo text-3xl font-bold">Conte o desafio da sua empresa</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Quanto mais contexto, mais certeira a proposta: quem vai participar, o que precisa mudar e
              qual o melhor período para a turma.
            </p>
            <div className="mt-8 space-y-3">
              <a
                href={contact.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-5 py-4 text-sm font-semibold text-[#1a1333] transition hover:border-teal-300"
              >
                <Calendar className="size-5 text-[#0f766e]" />
                Prefere conversar antes? Agende um horário
              </a>
              <Link
                href="/diagnostico-ia?src=programas-executivos"
                className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-5 py-4 text-sm font-semibold text-[#1a1333] transition hover:border-teal-300"
              >
                <Gauge className="size-5 text-[#0f766e]" />
                Ainda mapeando? Diagnóstico de maturidade em IA (3 min)
              </Link>
            </div>
          </div>
          <PedidoProposta
            key={tipoForm}
            tipos={TIPOS_FORM}
            tipoLabel="Programa de interesse"
            tipoInicial={tipoForm}
            mostrarEvento={false}
            placeholderData="Ex.: 1º semestre de 2027"
            placeholderPublico="Ex.: 25 gestores das áreas comercial e de operações"
            placeholderMensagem="Qual desafio motivou a busca? O que a equipe precisa sair sabendo fazer ou decidindo?"
            fallbackSource="programas-executivos"
          />
        </div>
        <div className="container pb-12">
          <p className="max-w-3xl text-xs leading-5 text-slate-400">{pe.notaLegal}</p>
        </div>
      </section>
    </GiselleLayout>
  );
}
