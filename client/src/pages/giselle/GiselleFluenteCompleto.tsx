import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, PlayCircle, XCircle } from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import {
  BarraFixa,
  CartaoPreco,
  Faq,
  HeroOferta,
  INK,
  MINT,
  NotaLegal,
  QuemConduz,
  Rotulo,
  SURFACE,
  TEAL,
  fadeUp,
  useEventoPaginaOferta,
} from "@/components/nokahiEdu/Venda";
import { DDV_ROTA } from "@/lib/doDadoAoValorData";
import { fluenteCompleto as fc } from "@/lib/fluenteCompletoData";
import { MBA_ROTA } from "@/lib/mbaData";
import { NNF_ROTA_CURTA } from "@/lib/ninguemNasceFluenteData";
import { canalValido, condicaoPrimeiraTurmaAtiva, turma01 } from "@/lib/turma01Data";

// Página de vendas do curso livre Fluente em IA completo (Turma 01): a entrada
// própria do curso para os anúncios. Quem chega vê a oferta na primeira tela,
// sem escolher entre os três níveis (a /nivel continua existindo para isso).
// Conteúdo em lib/fluenteCompletoData.ts; preço, datas e checkout em
// lib/turma01Data.ts e lib/ninguemNasceFluenteData.ts (nível 1).

const ALVOS_PRECO = ["preco-topo", "preco-final"];

export default function GiselleFluenteCompleto({ canal }: { canal?: string }) {
  const origem = canalValido(canal);
  useEventoPaginaOferta("fluente", fc.precos);
  const faq = [
    ...fc.faq,
    condicaoPrimeiraTurmaAtiva()
      ? { q: "Até quando vale a condição de primeira turma?", a: `Até ${turma01.fimCondicao}. Depois, vale o valor regular, e a condição não reabre.` }
      : { q: "Ainda vale a condição de primeira turma?", a: `Não. Ela terminou em ${turma01.fimCondicao}, e agora vale o valor regular.` },
  ];

  return (
    <GiselleLayout>
      {/* Hero: no celular, título, preço e botões cabem na primeira tela */}
      <HeroOferta
        selo={fc.selo}
        tituloInicio={fc.tituloInicio}
        tituloDestaque={fc.tituloDestaque}
        promessa={fc.promessa}
        emResumo={fc.emResumo}
        nome={fc.nomeCompleto}
        sub={fc.sub}
        fatos={fc.fatos}
      >
        <CartaoPreco
          ancora="preco-topo"
          id="fluente"
          nomeCurto={fc.nome}
          precos={fc.precos}
          certificado={fc.certificado}
          canal={origem}
          destaque="avista"
        />
      </HeroOferta>

      {/* Para quem é (e para quem não é) */}
      <section className="container grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Rotulo>Para quem é</Rotulo>
          <h2 className="mt-3 font-baloo text-3xl font-bold sm:text-4xl" style={{ color: INK }}>
            {fc.paraQuem.titulo}
          </h2>
          <p className="mt-5 border-l-4 pl-4 text-base italic leading-7 text-slate-600" style={{ borderColor: MINT }}>
            “{fc.paraQuem.frase}”
          </p>
          <ul className="mt-6 space-y-3">
            {fc.paraQuem.itens.map((p) => (
              <li key={p} className="flex items-start gap-3 text-base leading-7 text-slate-700">
                <CheckCircle2 className="mt-1 size-5 shrink-0" style={{ color: TEAL }} />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-start gap-4 rounded-3xl p-5" style={{ backgroundColor: SURFACE }}>
            <p className="font-baloo text-4xl font-bold leading-none" style={{ color: TEAL }}>
              {fc.paraQuem.alivio.numero}
            </p>
            <p className="text-sm leading-6 text-slate-700">
              {fc.paraQuem.alivio.texto} {fc.paraQuem.alivio.fecho}
              <span className="mt-1 block text-xs text-slate-400">Fonte: {fc.paraQuem.alivio.fonte}</span>
            </p>
          </div>
        </div>
        <div className="self-start rounded-3xl border border-slate-200 bg-white p-6 sm:p-7">
          <p className="font-baloo text-xl font-bold" style={{ color: INK }}>
            Para quem não é
          </p>
          <p className="mt-1 text-sm text-slate-500">Melhor saber agora do que se frustrar depois.</p>
          <ul className="mt-5 space-y-3">
            {fc.naoEPara.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                <XCircle className="mt-0.5 size-4 shrink-0 text-slate-400" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-2.5 text-sm font-bold">
            <Link href={DDV_ROTA} className="inline-flex items-center gap-2 hover:underline" style={{ color: TEAL }}>
              Conhecer a extensão Do Dado ao Valor
              <ArrowRight className="size-4" />
            </Link>
            <Link href={MBA_ROTA} className="inline-flex items-center gap-2 hover:underline" style={{ color: TEAL }}>
              Conhecer o MBA Executivo
              <ArrowRight className="size-4" />
            </Link>
            <Link href={NNF_ROTA_CURTA} className="inline-flex items-center gap-2 hover:underline" style={{ color: TEAL }}>
              Na dúvida? Veja em qual nível você está
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* O percurso: 5 módulos de conteúdo */}
      <section style={{ backgroundColor: SURFACE }}>
        <div className="container py-14 sm:py-16">
          <Rotulo>O percurso</Rotulo>
          <h2 className="mt-3 max-w-3xl font-baloo text-3xl font-bold sm:text-4xl" style={{ color: INK }}>
            {fc.percurso.titulo}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{fc.percurso.intro}</p>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {fc.percurso.modulos.map((m, i) => (
              <motion.li
                key={m.n}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(15,49,65,0.06)]"
              >
                <span
                  className="flex size-10 items-center justify-center rounded-2xl font-baloo text-base font-bold text-white"
                  style={{ backgroundColor: TEAL }}
                >
                  {m.n}
                </span>
                <p className="mt-4 font-baloo text-xl font-bold leading-snug" style={{ color: INK }}>
                  {m.titulo}
                </p>
                <ul className="mt-3 space-y-2">
                  {m.aulas.map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
                      <PlayCircle className="mt-1 size-4 shrink-0" style={{ color: TEAL }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* O que está incluído */}
      <section className="container py-14 sm:py-16">
        <div className="grid gap-8 rounded-[2rem] p-8 text-white sm:p-10 lg:grid-cols-2 lg:items-center" style={{ backgroundColor: INK }}>
          <div>
            <Rotulo claro>O que está incluído</Rotulo>
            <h2 className="mt-3 font-baloo text-3xl font-bold">{fc.inclui.titulo}</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">{fc.inclui.texto}</p>
          </div>
          <ul className="grid gap-3">
            {fc.inclui.itens.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" style={{ color: MINT }} />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <QuemConduz rotulo="Sua professora" nome={fc.autora.nome} resumo={fc.autora.resumo} />

      {/* FAQ + preço de novo, para quem rolou até o fim */}
      <section className="container grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <Faq itens={faq} titulo="Antes de se inscrever" />
        <div className="lg:sticky lg:top-24">
          <CartaoPreco
            ancora="preco-final"
            id="fluente"
            nomeCurto={fc.nome}
            precos={fc.precos}
            certificado={fc.certificado}
            canal={origem}
            destaque="avista"
          />
          <p className="mt-5 px-2 text-center text-sm text-slate-500">
            Ainda não é o momento?{" "}
            <Link href="/fluente" className="font-bold hover:underline" style={{ color: TEAL }}>
              Comece grátis pelo Kit de Letramento
            </Link>
            .
          </p>
        </div>
      </section>

      <NotaLegal texto={fc.notaLegal} />
      <BarraFixa id="fluente" precos={fc.precos} canal={origem} alvos={ALVOS_PRECO} destaque="avista" />
    </GiselleLayout>
  );
}
