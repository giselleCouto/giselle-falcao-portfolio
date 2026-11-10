import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Headphones,
  MessageCircle,
  PlayCircle,
  XCircle,
} from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import {
  BarraFixa,
  CartaoPreco,
  Depoimentos,
  Faq,
  INK,
  MINT,
  NotaLegal,
  NumerosComFonte,
  QuemConduz,
  Rotulo,
  SURFACE,
  TEAL,
  fadeUp,
  useEventoPaginaOferta,
} from "@/components/nokahiEdu/Venda";
import { mba } from "@/lib/mbaData";
import { DDV_ROTA } from "@/lib/doDadoAoValorData";
import { canalValido, condicaoPrimeiraTurmaAtiva, turma01 } from "@/lib/turma01Data";

// Página de vendas do MBA Executivo (Turma 01) — destino dos anúncios B2C e
// página de vendas do produto na Voomp. Conteúdo em lib/mbaData.ts (do PPC v3);
// preço, datas e checkout em lib/turma01Data.ts.

const ALVOS_PRECO = ["preco-topo", "preco-final"];
const ICONES_ESTUDO = [PlayCircle, BookOpen, Headphones, ClipboardCheck, MessageCircle, CalendarDays];

export default function GiselleMba({ canal }: { canal?: string }) {
  const origem = canalValido(canal);
  useEventoPaginaOferta("mba", mba.precos);
  const faq = [
    ...mba.faq,
    condicaoPrimeiraTurmaAtiva()
      ? { q: "Até quando vale a condição de primeira turma?", a: `Até ${turma01.fimCondicao}. Depois, vale o valor regular, e a condição não reabre.` }
      : { q: "Ainda vale a condição de primeira turma?", a: `Não. Ela terminou em ${turma01.fimCondicao}, e agora vale o valor regular.` },
  ];

  return (
    <GiselleLayout>
      {/* Hero: promessa + cartão de preço (acima da dobra no desktop) */}
      <section className="relative overflow-hidden" style={{ backgroundColor: INK }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(97,232,191,0.20),transparent_45%),radial-gradient(circle_at_10%_10%,rgba(17,175,200,0.18),transparent_40%)]" />
        <div className="container relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.3 }}>
            <Rotulo claro>{mba.selo}</Rotulo>
            <h1 className="mt-5 font-baloo text-4xl font-bold leading-[1.06] text-white sm:text-5xl">
              {mba.tituloInicio} <span style={{ color: MINT }}>{mba.tituloDestaque}</span>
            </h1>
            <p className="mt-4 text-base font-semibold text-slate-200 sm:text-lg">{mba.nome}</p>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">{mba.sub}</p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {mba.fatos.map((f) => (
                <li key={f} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-white">
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
          <CartaoPreco
            ancora="preco-topo"
            id="mba"
            nomeCurto={mba.nomeCurto}
            precos={mba.precos}
            certificado={mba.certificado}
            canal={origem}
          />
        </div>
      </section>

      {/* Por que agora: urgência verdadeira, com fonte */}
      <section className="container py-14 sm:py-16">
        <Rotulo>Por que agora</Rotulo>
        <h2 className="mt-3 max-w-3xl font-baloo text-3xl font-bold sm:text-4xl" style={{ color: INK }}>
          {mba.porQueAgora.titulo}
        </h2>
        <NumerosComFonte fatos={mba.porQueAgora.fatos} />
        <p className="mt-8 max-w-3xl text-base leading-7 text-slate-600">{mba.porQueAgora.fecho}</p>
      </section>

      {/* As cinco perguntas */}
      <section style={{ backgroundColor: SURFACE }}>
        <div className="container py-14 sm:py-16">
          <Rotulo>O que você vai saber responder</Rotulo>
          <h2 className="mt-3 max-w-3xl font-baloo text-3xl font-bold sm:text-4xl" style={{ color: INK }}>
            {mba.perguntas.titulo}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{mba.perguntas.intro}</p>
          <ol className="mt-10 grid gap-4 lg:grid-cols-5">
            {mba.perguntas.itens.map((p, i) => (
              <motion.li
                key={p.pergunta}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex flex-col rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(15,49,65,0.06)]"
              >
                <span className="font-baloo text-3xl font-bold" style={{ color: TEAL }}>
                  {i + 1}
                </span>
                <p className="mt-3 flex-1 font-semibold leading-6" style={{ color: INK }}>
                  {p.pergunta}
                </p>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">{p.onde}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* O percurso: 10 disciplinas */}
      <section className="container py-14 sm:py-16">
        <Rotulo>O percurso</Rotulo>
        <h2 className="mt-3 max-w-3xl font-baloo text-3xl font-bold sm:text-4xl" style={{ color: INK }}>
          10 disciplinas, uma por mês, do dado ao valor
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{mba.ritmo}</p>
        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {mba.disciplinas.map((d) => (
            <li key={d.n} className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
              <span
                className="flex size-10 shrink-0 items-center justify-center rounded-2xl font-baloo text-base font-bold text-white"
                style={{ backgroundColor: d.anhanguera ? "#64748b" : TEAL }}
              >
                {d.n}
              </span>
              <div>
                <p className="font-bold leading-snug" style={{ color: INK }}>
                  {d.titulo}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {d.horas}
                  {d.anhanguera ? " · disciplina Anhanguera" : ""}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{d.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* O entregável: AI Value & Risk Blueprint */}
      <section className="container pb-14 sm:pb-16">
        <div className="grid gap-8 rounded-[2rem] p-8 text-white sm:p-10 lg:grid-cols-2 lg:items-center" style={{ backgroundColor: INK }}>
          <div>
            <Rotulo claro>{mba.blueprint.nome}</Rotulo>
            <h2 className="mt-3 font-baloo text-3xl font-bold">{mba.blueprint.titulo}</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">{mba.blueprint.texto}</p>
          </div>
          <ul className="grid gap-3">
            {mba.blueprint.partes.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" style={{ color: MINT }} />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Como é estudar */}
      <section style={{ backgroundColor: SURFACE }}>
        <div className="container py-14 sm:py-16">
          <Rotulo>Como é estudar</Rotulo>
          <h2 className="mt-3 max-w-3xl font-baloo text-3xl font-bold sm:text-4xl" style={{ color: INK }}>
            Feito para caber na agenda de quem lidera
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mba.comoEstudar.map((c, i) => {
              const Icone = ICONES_ESTUDO[i] ?? CheckCircle2;
              return (
                <div key={c.titulo} className="rounded-3xl bg-white p-6">
                  <Icone className="size-6" style={{ color: TEAL }} />
                  <p className="mt-4 font-bold" style={{ color: INK }}>
                    {c.titulo}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{c.texto}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Para quem é (e para quem não é) */}
      <section className="container grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Rotulo>Para quem é</Rotulo>
          <h2 className="mt-3 font-baloo text-3xl font-bold" style={{ color: INK }}>
            Para quem decide, lidera ou financia IA
          </h2>
          <ul className="mt-6 space-y-3">
            {mba.paraQuem.map((p) => (
              <li key={p} className="flex items-start gap-3 text-base leading-7 text-slate-700">
                <CheckCircle2 className="mt-1 size-5 shrink-0" style={{ color: TEAL }} />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7">
          <p className="font-baloo text-xl font-bold" style={{ color: INK }}>
            Para quem não é
          </p>
          <p className="mt-1 text-sm text-slate-500">Melhor saber agora do que se frustrar depois.</p>
          <ul className="mt-5 space-y-3">
            {mba.naoEPara.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                <XCircle className="mt-0.5 size-4 shrink-0 text-slate-400" />
                {p}
              </li>
            ))}
          </ul>
          <Link
            href={DDV_ROTA}
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold hover:underline"
            style={{ color: TEAL }}
          >
            Conhecer a extensão Do Dado ao Valor
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Quem conduz + corpo docente */}
      <QuemConduz
        rotulo="Coordenação pedagógica"
        complemento={
          <div className="mt-8">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-400">Corpo docente</p>
            <ul className="mt-3 divide-y divide-slate-100 rounded-3xl border border-slate-200">
              {mba.docentes.map((d) => (
                <li key={d.nome} className="grid gap-1 px-5 py-4 sm:grid-cols-[1fr_1.2fr] sm:gap-4">
                  <span>
                    <span className="block font-bold" style={{ color: INK }}>
                      {d.nome}
                    </span>
                    <span className="block text-xs text-slate-500">{d.titulo}</span>
                  </span>
                  <span className="text-sm leading-6 text-slate-600">{d.disciplinas}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <Depoimentos
        nomes={["Alberto Antonio", "Vitor Consuelo", "Giseli Barbosa"]}
        nota="Profissionais que construíram soluções reais em formações e acompanhamentos com a Giselle, antes do lançamento do MBA."
      />

      {/* FAQ + preço de novo, para quem rolou até o fim */}
      <section className="container grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <Faq itens={faq} titulo="Antes de se inscrever" />
        <div className="lg:sticky lg:top-24">
          <CartaoPreco
            ancora="preco-final"
            id="mba"
            nomeCurto={mba.nomeCurto}
            precos={mba.precos}
            certificado={mba.certificado}
            canal={origem}
          />
        </div>
      </section>

      <NotaLegal texto={mba.notaLegal} />
      <BarraFixa id="mba" precos={mba.precos} canal={origem} alvos={ALVOS_PRECO} />
    </GiselleLayout>
  );
}
