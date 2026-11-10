import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, ChevronDown, Gift, PlayCircle } from "lucide-react";
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
} from "@/components/nokahiEdu/Venda";
import { doDadoAoValor as ddv } from "@/lib/doDadoAoValorData";
import { MBA_ROTA } from "@/lib/mbaData";
import { canalValido, condicaoPrimeiraTurmaAtiva, turma01 } from "@/lib/turma01Data";

// Página de vendas da extensão Do Dado ao Valor (Turma 01) — destino dos
// anúncios B2C e página de vendas do produto na Voomp. Conteúdo em
// lib/doDadoAoValorData.ts (do PPCE V4); preço, datas e checkout em
// lib/turma01Data.ts.

const ALVOS_PRECO = ["preco-topo", "preco-final"];

export default function GiselleDoDadoAoValor({ canal }: { canal?: string }) {
  const origem = canalValido(canal);
  const faq = [
    ...ddv.faq,
    condicaoPrimeiraTurmaAtiva()
      ? { q: "Até quando vale a condição de primeira turma?", a: `Até ${turma01.fimCondicao}. Depois, vale o valor regular, e a condição não reabre.` }
      : { q: "Ainda vale a condição de primeira turma?", a: `Não. Ela terminou em ${turma01.fimCondicao}, e agora vale o valor regular.` },
  ];

  return (
    <GiselleLayout>
      {/* Hero: promessa + cartão de preço */}
      <section className="relative overflow-hidden" style={{ backgroundColor: INK }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(97,232,191,0.20),transparent_45%),radial-gradient(circle_at_10%_10%,rgba(17,175,200,0.18),transparent_40%)]" />
        <div className="container relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.3 }}>
            <Rotulo claro>{ddv.selo}</Rotulo>
            <h1 className="mt-5 font-baloo text-4xl font-bold leading-[1.06] text-white sm:text-5xl">
              {ddv.tituloInicio} <span style={{ color: MINT }}>{ddv.tituloDestaque}</span>
            </h1>
            <p className="mt-4 text-base font-semibold text-slate-200 sm:text-lg">{ddv.nomeCompleto}</p>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">{ddv.sub}</p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {ddv.fatos.map((f) => (
                <li key={f} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-white">
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
          <CartaoPreco
            ancora="preco-topo"
            id="extensao"
            nomeCurto={ddv.nome}
            precos={ddv.precos}
            certificado={ddv.certificado}
            canal={origem}
          />
        </div>
      </section>

      {/* O problema */}
      <section className="container py-14 sm:py-16">
        <Rotulo>Por que este curso existe</Rotulo>
        <h2 className="mt-3 max-w-3xl font-baloo text-3xl font-bold sm:text-4xl" style={{ color: INK }}>
          {ddv.problema.titulo}
        </h2>
        <NumerosComFonte fatos={ddv.problema.fatos} />
        <p className="mt-8 max-w-3xl text-base leading-7 text-slate-600">{ddv.problema.texto}</p>
      </section>

      {/* As três respostas */}
      <section style={{ backgroundColor: SURFACE }}>
        <div className="container py-14 sm:py-16">
          <Rotulo>O que você leva</Rotulo>
          <h2 className="mt-3 max-w-3xl font-baloo text-3xl font-bold sm:text-4xl" style={{ color: INK }}>
            {ddv.respostas.titulo}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {ddv.respostas.itens.map((r, i) => (
              <motion.div
                key={r.pergunta}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(15,49,65,0.06)]"
              >
                <span className="font-baloo text-3xl font-bold" style={{ color: TEAL }}>
                  {i + 1}
                </span>
                <p className="mt-3 font-bold leading-6" style={{ color: INK }}>
                  {r.pergunta}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{r.texto}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conteúdo: 4 módulos × 12 aulas */}
      <section className="container py-14 sm:py-16">
        <Rotulo>O conteúdo</Rotulo>
        <h2 className="mt-3 max-w-3xl font-baloo text-3xl font-bold sm:text-4xl" style={{ color: INK }}>
          4 módulos, 48 aulas curtas, nenhuma linha de código
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          Toque em um módulo para ver as 12 aulas. Cada aula tem de 3 a 12 minutos e cabe num intervalo do seu dia.
        </p>
        <div className="mt-10 space-y-4">
          {ddv.modulos.map((m, i) => {
            const minutos = m.aulas.reduce((soma, a) => soma + a.min, 0);
            return (
              <details
                key={m.n}
                open={i === 0}
                className="group rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,49,65,0.05)]"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 p-5 sm:gap-4 sm:p-6 [&::-webkit-details-marker]:hidden">
                  <span className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <span
                      className="flex size-11 shrink-0 items-center justify-center rounded-2xl font-baloo text-base font-bold text-white"
                      style={{ backgroundColor: TEAL }}
                    >
                      {m.n}
                    </span>
                    <span>
                      <span className="block font-baloo text-xl font-bold leading-snug" style={{ color: INK }}>
                        {m.titulo}
                      </span>
                      <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-slate-400">
                        {m.aulas.length} aulas · {minutos} min de vídeo · 10 h no total
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-slate-600">{m.texto}</span>
                    </span>
                  </span>
                  <span
                    className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full transition group-open:rotate-180"
                    style={{ backgroundColor: SURFACE, color: TEAL }}
                  >
                    <ChevronDown className="size-4" />
                  </span>
                </summary>
                <ol className="grid gap-x-8 border-t border-slate-100 px-5 py-4 sm:grid-cols-2 sm:px-6 sm:py-5">
                  {m.aulas.map((a, k) => (
                    <li key={a.titulo} className="flex items-start gap-3 border-b border-slate-50 py-2.5 text-sm text-slate-700 last:border-0">
                      <PlayCircle className="mt-0.5 size-4 shrink-0" style={{ color: TEAL }} />
                      <span className="flex-1">
                        <span className="text-slate-400">Aula {k + 1} · </span>
                        {a.titulo}
                      </span>
                      <span className="shrink-0 text-xs text-slate-400">{a.min} min</span>
                    </li>
                  ))}
                </ol>
              </details>
            );
          })}
        </div>
      </section>

      {/* O entregável + o que está incluído + bônus */}
      <section className="container pb-14 sm:pb-16">
        <div className="grid gap-8 rounded-[2rem] p-8 text-white sm:p-10 lg:grid-cols-2" style={{ backgroundColor: INK }}>
          <div>
            <Rotulo claro>{ddv.canvas.nome}</Rotulo>
            <h2 className="mt-3 font-baloo text-3xl font-bold">{ddv.canvas.titulo}</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">{ddv.canvas.texto}</p>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider" style={{ color: MINT }}>
              O que está incluído
            </p>
            <ul className="mt-4 space-y-2.5">
              {ddv.inclui.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm leading-6 text-slate-100">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" style={{ color: MINT }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {ddv.bonus.map((b) => (
            <div key={b.titulo} className="rounded-3xl border border-slate-200 bg-white p-6">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: TEAL }}>
                <Gift className="size-4" />
                Bônus
              </p>
              <p className="mt-3 font-bold" style={{ color: INK }}>
                {b.titulo}
              </p>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{b.texto}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-400">Os bônus não contam na carga horária do curso.</p>
      </section>

      {/* Para quem é */}
      <section style={{ backgroundColor: SURFACE }}>
        <div className="container py-14 sm:py-16">
          <Rotulo>Para quem é</Rotulo>
          <h2 className="mt-3 max-w-3xl font-baloo text-3xl font-bold sm:text-4xl" style={{ color: INK }}>
            Para quem quer entender IA o suficiente para decidir bem
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ddv.paraQuem.map((p) => (
              <div key={p.titulo} className="rounded-3xl bg-white p-6">
                <p className="font-bold leading-6" style={{ color: INK }}>
                  {p.titulo}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuemConduz rotulo="Sua professora" />

      <Depoimentos
        nomes={["Alberto Antonio", "Vitor Consuelo"]}
        nota="Profissionais que construíram soluções reais em formações e acompanhamentos com a Giselle, antes do lançamento desta extensão."
      />

      {/* Próximo passo: o MBA */}
      <section className="container pt-14 sm:pt-16">
        <div className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <Rotulo>E depois?</Rotulo>
            <p className="mt-2 font-baloo text-2xl font-bold" style={{ color: INK }}>
              A extensão é a porta de entrada do MBA Executivo
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Para quem tem graduação e vai liderar a estratégia de IA: 380 h em 12 meses, com certificado de
              especialização emitido pela Anhanguera.
            </p>
          </div>
          <Link
            href={MBA_ROTA}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-bold transition hover:bg-[#eef8f9]"
            style={{ borderColor: TEAL, color: TEAL }}
          >
            Conhecer o MBA
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* FAQ + preço de novo */}
      <section className="container grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <Faq itens={faq} titulo="Antes de se inscrever" />
        <div className="lg:sticky lg:top-24">
          <CartaoPreco
            ancora="preco-final"
            id="extensao"
            nomeCurto={ddv.nome}
            precos={ddv.precos}
            certificado={ddv.certificado}
            canal={origem}
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

      <NotaLegal texto={ddv.notaLegal} />
      <BarraFixa id="extensao" precos={ddv.precos} canal={origem} alvos={ALVOS_PRECO} />
    </GiselleLayout>
  );
}
