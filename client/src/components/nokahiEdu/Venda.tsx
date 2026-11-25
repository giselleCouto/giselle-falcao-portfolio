import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, ChevronDown, MessageCircle, Quote, ShieldCheck } from "lucide-react";
import { programasExecutivos } from "@/lib/programasExecutivosData";
import { metaEventoDaPagina } from "@/lib/anuncios";
import {
  CATEGORIA_OFERTA,
  LINHA_CONFIANCA,
  NOME_OFERTA,
  ROTULO_INSCRICAO,
  ROTULO_WHATSAPP,
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

// Peças compartilhadas pelas páginas de vendas da Turma 01 (/mba,
// /do-dado-ao-valor e /fluente-completo). Paleta NOKAHI EDU, a mesma do Kit
// de Letramento.

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
      content_category: CATEGORIA_OFERTA[id],
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

/**
 * Topo das páginas de venda. No celular (quem chega do anúncio está no
 * celular), a primeira tela mostra, sem rolar: título, promessa, preço, botão
 * de inscrição, botão de WhatsApp e linha de confiança. Por isso a ordem ali é
 * título → cartão de preço → detalhes. No computador, o texto fica à esquerda
 * e o cartão à direita, como sempre.
 */
export function HeroOferta({
  selo,
  tituloInicio,
  tituloDestaque,
  promessa,
  emResumo,
  nome,
  sub,
  fatos,
  children,
}: {
  selo: string;
  tituloInicio: string;
  tituloDestaque: string;
  /** Uma linha de promessa (só no celular; no computador, o parágrafo `sub` já está ao lado) */
  promessa: string;
  /** Formato do curso em uma linha (só no celular) */
  emResumo: string;
  nome: string;
  sub: string;
  fatos: string[];
  /** O cartão de preço */
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: INK }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(97,232,191,0.20),transparent_45%),radial-gradient(circle_at_10%_10%,rgba(17,175,200,0.18),transparent_40%)]" />
      <div className="container relative grid gap-3.5 pb-10 pt-3 sm:gap-8 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-x-10 lg:gap-y-0 lg:py-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3 }}
          className="lg:col-start-1 lg:row-start-1 lg:self-end"
        >
          <p
            className="text-[0.6875rem] font-bold uppercase leading-4 tracking-[0.16em] sm:text-xs sm:tracking-[0.25em]"
            style={{ color: MINT }}
          >
            {selo}
          </p>
          <h1 className="mt-2 font-baloo text-[1.75rem] font-bold leading-[1.08] text-white sm:mt-5 sm:text-5xl sm:leading-[1.06]">
            {tituloInicio} <span style={{ color: MINT }}>{tituloDestaque}</span>
          </h1>
          <p className="mt-1.5 text-[0.9375rem] leading-[1.4] text-slate-200 lg:hidden">{promessa}</p>
          <p className="mt-1.5 text-xs font-semibold text-slate-400 lg:hidden">{emResumo}</p>
        </motion.div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">{children}</div>

        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <p className="text-base font-semibold text-slate-200 sm:text-lg lg:mt-4">{nome}</p>
          <p className="mt-3 max-w-xl text-base leading-7 text-slate-300 sm:mt-4 sm:text-lg sm:leading-8">{sub}</p>
          <ul className="mt-5 flex flex-wrap gap-2 sm:mt-7">
            {fatos.map((f) => (
              <li key={f} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-white">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Cartão de preço. De cima para baixo: condição, preço, botão de inscrição,
 * botão de WhatsApp e linha de confiança (tudo isso cabe na primeira tela do
 * celular); depois, cupom, datas e certificado.
 */
export function CartaoPreco({
  id,
  nomeCurto,
  precos,
  certificado,
  canal,
  ancora,
  destaque = "parcela",
}: OfertaProps & {
  ancora: string;
  /** Qual valor vai em letras grandes: a parcela (padrão) ou o valor à vista */
  destaque?: "parcela" | "avista";
}) {
  const href = useCheckout(id, canal);
  const condicao = condicaoPrimeiraTurmaAtiva();
  const aberto = inscricoesAbertas();
  const preco = precoAtual(precos);
  const cupom = aberto ? cupomAtual(id) : null;
  const msg = `Olá, Giselle! Tenho uma dúvida sobre o ${nomeCurto} (Turma 01).`;
  const botaoPrincipal =
    "mt-3.5 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-bold text-white transition hover:brightness-110 sm:mt-6 sm:px-7 sm:py-4";

  return (
    <div id={ancora} className="scroll-mt-24 rounded-[1.75rem] bg-white px-5 pb-5 pt-4 shadow-[0_18px_60px_rgba(15,49,65,0.25)] sm:rounded-[2rem] sm:p-8">
      {condicao && aberto ? (
        <p
          className="inline-flex rounded-full px-3 py-1 text-xs font-bold"
          style={{ backgroundColor: SURFACE, color: TEAL }}
        >
          Condição de primeira turma até {turma01.fimCondicao}
        </p>
      ) : null}
      <p className="mt-2.5 font-baloo text-[2.125rem] font-bold leading-none sm:mt-4 sm:text-5xl" style={{ color: INK }}>
        {destaque === "avista" ? (
          <>
            {preco.avista} <span className="font-sans text-base font-semibold text-slate-500">à vista</span>
          </>
        ) : (
          preco.parcelado
        )}
      </p>
      <p className="mt-1.5 text-sm font-semibold text-slate-600 sm:mt-2">
        {destaque === "avista" ? `ou ${preco.parcelado} no cartão` : `ou ${preco.avista} à vista`}
      </p>
      {condicao && aberto ? (
        <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:mt-2">
          A partir de {turma01.inicioRegular}: {precos.regular.avista} ou {precos.regular.parcelado}.
        </p>
      ) : null}

      {aberto ? (
        href ? (
          <a
            href={href}
            data-cta={`inscrever-${id}`}
            data-meta-nome={NOME_OFERTA[id]}
            data-meta-valor={preco.valor}
            className={botaoPrincipal}
            style={{ backgroundColor: INK }}
          >
            {ROTULO_INSCRICAO}
          </a>
        ) : (
          <a
            href={whatsappUrl(`Olá, Giselle! Quero me inscrever no ${nomeCurto} (Turma 01).`)}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={`inscricao-em-breve-${id}`}
            data-meta-nome={NOME_OFERTA[id]}
            className={botaoPrincipal}
            style={{ backgroundColor: INK }}
          >
            Inscrições abrem em breve: fale comigo
          </a>
        )
      ) : (
        <p className="mt-4 rounded-2xl px-4 py-3 text-sm font-semibold sm:mt-6" style={{ backgroundColor: SURFACE, color: INK }}>
          As inscrições da Turma 01 terminaram em {turma01.fimInscricoes}. Chame a Giselle para saber da próxima turma.
        </p>
      )}
      <a
        href={whatsappUrl(msg)}
        target="_blank"
        rel="noopener noreferrer"
        data-cta={`whatsapp-${id}`}
        data-meta-nome={NOME_OFERTA[id]}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-slate-200 px-6 py-2.5 text-sm font-bold text-slate-700 transition hover:border-[#078aa7] sm:mt-3 sm:px-7 sm:py-3"
      >
        <MessageCircle className="size-4" style={{ color: TEAL }} />
        {ROTULO_WHATSAPP}
      </a>
      <p className="mt-3 flex items-start gap-2 text-xs leading-[1.45] text-slate-600 sm:mt-4">
        <ShieldCheck className="mt-px size-4 shrink-0" style={{ color: TEAL }} />
        <span>{LINHA_CONFIANCA[id]}</span>
      </p>

      {cupom ? (
        <div
          className="mt-5 rounded-2xl border border-dashed px-4 py-3 text-sm leading-6"
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
              ? `Ele já vai aplicado quando você toca em “${ROTULO_INSCRICAO}”. Se não aparecer no checkout, é só digitar o código.`
              : "Informe o código no checkout da Voomp."}
          </p>
        </div>
      ) : null}

      <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 text-sm text-slate-600">
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
 * aparece, desde o topo da página, sempre que nenhum botão de inscrição dos
 * cartões de preço está na tela.
 */
export function BarraFixa({
  id,
  precos,
  canal,
  alvos,
  destaque = "parcela",
}: Omit<OfertaProps, "certificado" | "nomeCurto"> & {
  alvos: string[];
  /** O mesmo destaque do cartão de preço da página */
  destaque?: "parcela" | "avista";
}) {
  const href = useCheckout(id, canal);
  const [visivel, setVisivel] = useState(false);
  const preco = precoAtual(precos);
  const aberto = inscricoesAbertas();
  const chaveAlvos = alvos.join(",");

  useEffect(() => {
    // Observa o botão de inscrição de cada cartão (não o cartão inteiro): a barra
    // só some quando há um botão de inscrição de fato visível na tela.
    const elementos = chaveAlvos
      .split(",")
      .map((a) => {
        const cartao = document.getElementById(a);
        return cartao?.querySelector<HTMLElement>('[data-cta^="inscr"]') ?? cartao;
      })
      .filter(Boolean) as HTMLElement[];
    if (elementos.length === 0 || typeof IntersectionObserver === "undefined") return;
    const naTela = new Map<Element, boolean>();
    const obs = new IntersectionObserver((entradas) => {
      for (const e of entradas) naTela.set(e.target, e.isIntersecting);
      const algumNaTela = Array.from(naTela.values()).some(Boolean);
      // Desde o topo: quem chega do anúncio vê preço e botão sem precisar rolar
      setVisivel(!algumNaTela);
    });
    elementos.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [chaveAlvos]);

  // O aviso de cookies sobe para não cobrir a barra (ver AvisoCookies)
  useEffect(() => {
    const raiz = document.documentElement;
    const celular = typeof window.matchMedia !== "function" || !window.matchMedia("(min-width: 1024px)").matches;
    raiz.style.setProperty("--barra-compra", visivel && aberto && celular ? "76px" : "0px");
    return () => {
      raiz.style.removeProperty("--barra-compra");
    };
  }, [visivel, aberto]);

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
            {destaque === "avista" ? `${preco.avista} à vista` : preco.parcelado}
          </p>
          <p className="truncate text-xs text-slate-500">
            {destaque === "avista" ? `ou ${preco.parcelado} no cartão` : `ou ${preco.avista} à vista`}
          </p>
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
          {href ? ROTULO_INSCRICAO : "Ver condições"}
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

export function QuemConduz({
  rotulo,
  complemento,
  nome = giselle.nome,
  resumo = giselle.resumo,
}: {
  rotulo: string;
  complemento?: React.ReactNode;
  /** Nome e resumo próprios da página (padrão: os de turma01Data) */
  nome?: string;
  resumo?: string;
}) {
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
            {nome}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{resumo}</p>
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
