import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, ChevronDown, MessageCircle, Quote, ShieldCheck } from "lucide-react";
import { programasExecutivos } from "@/lib/programasExecutivosData";
import { metaEventoDaPagina } from "@/lib/anuncios";
import {
  NOME_OFERTA,
  checkoutUrl,
  condicaoPrimeiraTurmaAtiva,
  cupomAtual,
  giselle,
  guardarUtmDaChegada,
  inscricoesAbertas,
  notaEmpresa,
  precoAtual,
  turma01,
  whatsappUrl,
  type OfertaId,
  type Precos,
} from "@/lib/turma01Data";

// Peças compartilhadas pelas páginas de vendas da Turma 01 (/mba e
// /do-dado-ao-valor). Paleta NOKAHI EDU, a mesma do Kit de Letramento.

export const INK = "#0f3141";
export const TEAL = "#078aa7";
export const MINT = "#61e8bf";
export const SURFACE = "#eef8f9";

export const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

/** Rótulo de seção (texto pequeno em caixa alta acima do título) */
export function Rotulo({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: claro ? MINT : TEAL }}>
      {children}
    </p>
  );
}

/** Link de inscrição com as UTMs da chegada (só existe depois de montar no navegador). */
function useCheckout(id: OfertaId, canal?: string) {
  const [href, setHref] = useState<string | null>(null);
  useEffect(() => {
    guardarUtmDaChegada();
    setHref(checkoutUrl(id, canal));
  }, [id, canal]);
  return href;
}

/**
 * ViewContent da oferta para o Pixel da Meta (só sai com o aceite de cookies;
 * se a pessoa aceitar depois de abrir a página, sai na hora do aceite).
 */
export function useEventoPaginaOferta(id: OfertaId, precos: Precos) {
  useEffect(() => {
    metaEventoDaPagina("ViewContent", {
      content_name: NOME_OFERTA[id],
      content_category: id === "mba" ? "MBA Executivo" : "Curso de extensão",
      value: precoAtual(precos).valor,
      currency: "BRL",
    });
  }, [id, precos]);
}

type OfertaProps = {
  id: OfertaId;
  nomeCurto: string;
  precos: Precos;
  certificado: string;
  canal?: string;
};

export function CartaoPreco({ id, nomeCurto, precos, certificado, canal, ancora }: OfertaProps & { ancora: string }) {
  const href = useCheckout(id, canal);
  const condicao = condicaoPrimeiraTurmaAtiva();
  const aberto = inscricoesAbertas();
  const preco = precoAtual(precos);
  const cupom = aberto ? cupomAtual(id) : null;
  const msg = `Olá, Giselle! Tenho uma dúvida sobre o ${nomeCurto} (Turma 01).`;

  return (
    <div id={ancora} className="scroll-mt-24 rounded-[2rem] bg-white p-7 shadow-[0_18px_60px_rgba(15,49,65,0.25)] sm:p-8">
      {condicao && aberto ? (
        <p
          className="inline-flex rounded-full px-3 py-1 text-xs font-bold"
          style={{ backgroundColor: SURFACE, color: TEAL }}
        >
          Condição de primeira turma até {turma01.fimCondicao}
        </p>
      ) : null}
      <p className="mt-4 font-baloo text-4xl font-bold leading-none sm:text-5xl" style={{ color: INK }}>
        {preco.parcelado}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-600">ou {preco.avista} à vista</p>
      {condicao && aberto ? (
        <p className="mt-2 text-xs leading-5 text-slate-500">
          A partir de {turma01.inicioRegular}: {precos.regular.avista} ou {precos.regular.parcelado}.
        </p>
      ) : null}
      {cupom ? (
        <div
          className="mt-4 rounded-2xl border border-dashed px-4 py-3 text-sm leading-6"
          style={{ borderColor: TEAL, backgroundColor: SURFACE, color: INK }}
        >
          <p>
            Cupom{" "}
            <span className="rounded-md bg-white px-2 py-0.5 font-mono font-bold tracking-wider" style={{ color: TEAL }}>
              {cupom.codigo}
            </span>{" "}
            ({cupom.desconto} de desconto até {turma01.fimCondicao})
          </p>
          <p className="mt-1 text-xs text-slate-600">
            {href
              ? "Ele já vai aplicado quando você clica em “Quero me inscrever”. Se não aparecer no checkout, é só digitar o código."
              : "Informe o código no checkout da Voomp."}
          </p>
        </div>
      ) : null}

      {aberto ? (
        href ? (
          <a
            href={href}
            data-cta={`inscrever-${id}`}
            data-meta-nome={NOME_OFERTA[id]}
            data-meta-valor={preco.valor}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-bold text-white transition hover:brightness-110"
            style={{ backgroundColor: INK }}
          >
            Quero me inscrever
          </a>
        ) : (
          <a
            href={whatsappUrl(`Olá, Giselle! Quero me inscrever no ${nomeCurto} (Turma 01).`)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={`inscricao-em-breve-${id}`}
            data-meta-nome={NOME_OFERTA[id]}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-bold text-white transition hover:brightness-110"
            style={{ backgroundColor: INK }}
          >
            Inscrições abrem em breve: fale comigo
          </a>
        )
      ) : (
        <p className="mt-6 rounded-2xl px-4 py-3 text-sm font-semibold" style={{ backgroundColor: SURFACE, color: INK }}>
          As inscrições da Turma 01 terminaram em {turma01.fimInscricoes}. Chame a Giselle para saber da próxima turma.
        </p>
      )}
      <a
        href={whatsappUrl(msg)}
        target="_blank"
        rel="noopener noreferrer"
        data-cta={`whatsapp-${id}`}
        data-meta-nome={NOME_OFERTA[id]}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-slate-200 px-7 py-3 text-sm font-bold text-slate-700 transition hover:border-[#078aa7]"
      >
        <MessageCircle className="size-4" style={{ color: TEAL }} />
        Tirar dúvidas com a Giselle
      </a>

      <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5 text-sm text-slate-600">
        {aberto ? (
          <li className="flex items-start gap-2">
            <CalendarDays className="mt-0.5 size-4 shrink-0" style={{ color: TEAL }} />
            Turma 01 começa em {turma01.inicio}, com inscrições até {turma01.fimInscricoes}.
          </li>
        ) : null}
        <li className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" style={{ color: TEAL }} />
          {certificado}
        </li>
        <li className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 size-4 shrink-0" style={{ color: TEAL }} />
          {turma01.pagamento}
        </li>
      </ul>
    </div>
  );
}

/**
 * Barra fixa no rodapé do celular (quem chega do anúncio está no celular):
 * aparece quando nenhum cartão de preço está na tela.
 */
export function BarraFixa({ id, precos, canal, alvos }: Omit<OfertaProps, "certificado" | "nomeCurto"> & { alvos: string[] }) {
  const href = useCheckout(id, canal);
  const [visivel, setVisivel] = useState(false);
  const preco = precoAtual(precos);
  const aberto = inscricoesAbertas();
  const chaveAlvos = alvos.join(",");

  useEffect(() => {
    const elementos = chaveAlvos
      .split(",")
      .map((a) => document.getElementById(a))
      .filter(Boolean) as HTMLElement[];
    if (elementos.length === 0 || typeof IntersectionObserver === "undefined") return;
    const naTela = new Map<Element, boolean>();
    const obs = new IntersectionObserver((entradas) => {
      for (const e of entradas) naTela.set(e.target, e.isIntersecting);
      const algumNaTela = Array.from(naTela.values()).some(Boolean);
      // Só depois de passar do primeiro cartão (evita a barra no topo da página)
      setVisivel(!algumNaTela && window.scrollY > 400);
    });
    elementos.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [chaveAlvos]);

  if (!aberto) return null;
  const destino = href ?? `#${alvos[0]}`;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(15,49,65,0.12)] backdrop-blur transition-transform duration-300 lg:hidden ${
        visivel ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visivel}
    >
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold" style={{ color: INK }}>
            {preco.parcelado}
          </p>
          <p className="truncate text-xs text-slate-500">ou {preco.avista} à vista</p>
        </div>
        <a
          href={destino}
          tabIndex={visivel ? 0 : -1}
          data-cta={`barra-inscrever-${id}`}
          data-meta-nome={NOME_OFERTA[id]}
          data-meta-valor={preco.valor}
          className="shrink-0 rounded-full px-5 py-3 text-sm font-bold text-white"
          style={{ backgroundColor: INK }}
        >
          {href ? "Quero me inscrever" : "Ver condições"}
        </a>
      </div>
    </div>
  );
}

/** Três números com a fonte embaixo (urgência verdadeira, nunca contagem regressiva) */
export function NumerosComFonte({ fatos }: { fatos: { numero: string; texto: string; fonte: string }[] }) {
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {fatos.map((f, i) => (
        <motion.div
          key={f.numero}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="rounded-3xl border border-slate-200 bg-white p-6"
        >
          <p className="font-baloo text-4xl font-bold" style={{ color: TEAL }}>
            {f.numero}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{f.texto}</p>
          <p className="mt-3 text-xs text-slate-400">Fonte: {f.fonte}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function QuemConduz({ rotulo, complemento }: { rotulo: string; complemento?: React.ReactNode }) {
  return (
    <section className="border-y border-slate-200/70 bg-white">
      <div className="container grid gap-10 py-14 sm:py-16 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <img
          src={giselle.foto}
          alt="Giselle Couto Falcão"
          loading="lazy"
          className="aspect-[4/5] w-full max-w-sm rounded-[2rem] object-cover shadow-[0_18px_50px_rgba(15,49,65,0.18)]"
        />
        <div>
          <Rotulo>{rotulo}</Rotulo>
          <h2 className="mt-3 font-baloo text-3xl font-bold" style={{ color: INK }}>
            {giselle.nome}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{giselle.resumo}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {giselle.provas.map((p) => (
              <li key={p} className="flex items-start gap-2 rounded-2xl px-4 py-3 text-sm leading-6 text-slate-700" style={{ backgroundColor: SURFACE }}>
                <CheckCircle2 className="mt-1 size-4 shrink-0" style={{ color: TEAL }} />
                {p}
              </li>
            ))}
          </ul>
          {complemento}
        </div>
      </div>
    </section>
  );
}

/** Depoimentos reais (os mesmos da página dos Programas Executivos) */
export function Depoimentos({ nomes, nota }: { nomes: string[]; nota: string }) {
  const lista = programasExecutivos.depoimentos.filter((d) => nomes.includes(d.nome));
  if (lista.length === 0) return null;
  return (
    <section style={{ backgroundColor: INK }}>
      <div className="container py-14 sm:py-16">
        <Rotulo claro>Quem aprendeu com a Giselle</Rotulo>
        <h2 className="mt-3 max-w-2xl font-baloo text-3xl font-bold text-white sm:text-4xl">
          Aprender de verdade, para seguir sozinho depois
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{nota}</p>
        <div className={`mt-10 grid gap-6 ${lista.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
          {lista.map((d, i) => {
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
                <span className="self-start rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: "rgba(97,232,191,0.15)", color: MINT }}>
                  {d.tema}
                </span>
                <Quote className="mt-5 size-7" style={{ color: "rgba(97,232,191,0.6)" }} />
                <blockquote className="mt-2 font-baloo text-lg font-semibold leading-snug text-white">“{d.destaque}”</blockquote>
                <p className="mt-4 text-sm leading-6 text-slate-400">{d.contexto}</p>
                <details className="group mt-4 flex-1">
                  <summary
                    className="inline-flex cursor-pointer list-none items-center gap-1 text-sm font-bold hover:underline [&::-webkit-details-marker]:hidden"
                    style={{ color: MINT }}
                  >
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
                  <span className="flex size-10 items-center justify-center rounded-full text-sm font-bold" style={{ backgroundColor: MINT, color: INK }}>
                    {iniciais}
                  </span>
                  <span className="text-sm font-bold text-white">{d.nome}</span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Faq({ itens, titulo }: { itens: { q: string; a: string }[]; titulo: string }) {
  return (
    <div>
      <Rotulo>Perguntas frequentes</Rotulo>
      <h2 className="mt-3 font-baloo text-3xl font-bold" style={{ color: INK }}>
        {titulo}
      </h2>
      <div className="mt-8 space-y-3">
        {itens.map((item) => (
          <details key={item.q} className="group rounded-3xl border border-slate-200/80 bg-white">
            <summary
              className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left font-semibold [&::-webkit-details-marker]:hidden"
              style={{ color: INK }}
            >
              {item.q}
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full transition group-open:rotate-180"
                style={{ backgroundColor: SURFACE, color: TEAL }}
              >
                <ChevronDown className="size-4" />
              </span>
            </summary>
            <p className="px-5 pb-5 text-sm leading-7 text-slate-600">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function NotaLegal({ texto }: { texto: string }) {
  return (
    <section className="container pb-24 pt-2 lg:pb-14">
      <p className="max-w-4xl text-xs leading-6 text-slate-500">
        {texto} {notaEmpresa} {turma01.atendimento}
      </p>
    </section>
  );
}
