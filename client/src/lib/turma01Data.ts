// Ofertas pagas da Turma 01 da NOKAHI EDU (nov/2026): MBA Executivo e a extensão
// Do Dado ao Valor, vendidas pela Voomp Creators (IES parceira: Anhanguera).
// Módulo compartilhado pelas páginas de vendas /mba e /do-dado-ao-valor:
// datas reais da turma, condição de primeira turma, links de checkout, UTMs e
// atendimento. O conteúdo de cada curso fica em mbaData.ts e doDadoAoValorData.ts.
//
// Regras de texto (combinadas com a Giselle; não mudar sem ela):
// - Certificado: "emitido pela Anhanguera, instituição credenciada pelo MEC".
//   Nunca "diploma" nem "reconhecido pelo MEC".
// - Extensão: nunca chamar de "pós", "especialização" ou "MBA de 40 h".
//   Só o MBA exige graduação.
// - Sem contagem regressiva, sem promessa de cargo, salário ou retorno. A única
//   urgência é a data real: condição até 12/12/2026, inscrições até 22/01/2027.
// - Tom amigável e coletivo, confiança acima de tudo; preço sempre visível.

import { condicaoPrimeiraTurmaAtiva } from "./fluenteData";
import { contact } from "./portfolioData";
import { getAttribution } from "./tracking";

export { condicaoPrimeiraTurmaAtiva };

export type OfertaId = "mba" | "extensao";

// ===================================================================
// Links de checkout da Voomp (Produtos → Links → copiar o link do produto).
// Enquanto um link estiver vazio, o botão da página vira "Inscrições abrem
// em breve" e leva para o WhatsApp, sem quebrar nada.
// ===================================================================
export const CHECKOUT_VOOMP: Record<OfertaId, string | null> = {
  mba: "https://pay.voompcreators.com.br/17779",
  extensao: null,
};

/**
 * WhatsApp das dúvidas: só dígitos, com 55 e DDD (ex.: "5531900000000").
 * Preenchido, o botão abre a conversa com a mensagem pronta; vazio, usa o
 * WhatsApp geral do site (o mesmo do rodapé). É o mesmo número da tutoria do PPC.
 */
export const WHATSAPP_DUVIDAS: string | null = "5531982280551";

/** Nome de cada oferta nos eventos de conversão (Pixel da Meta) */
export const NOME_OFERTA: Record<OfertaId, string> = {
  mba: "MBA Executivo em Estratégia de IA e Transformação Empresarial",
  extensao: "Do Dado ao Valor",
};

// ===================================================================

/** Fim das inscrições da Turma 01 (22/01/2027, 23h59 em Brasília) */
const FIM_INSCRICOES = new Date("2027-01-23T00:00:00-03:00").getTime();

export function inscricoesAbertas(agora = Date.now()) {
  return agora < FIM_INSCRICOES;
}

export const turma01 = {
  nome: "Turma 01",
  inicio: "25/01/2027",
  inicioIso: "2027-01-25",
  fimInscricoes: "22/01/2027",
  fimCondicao: "12/12/2026",
  fimCondicaoIso: "2026-12-12",
  inicioRegular: "13/12/2026",
  atendimento:
    "A Giselle responde pessoalmente, de segunda a sexta, das 8h às 18h. O que chega fora desse horário é respondido no dia útil seguinte.",
  pagamento: "Pagamento seguro pela Voomp Creators, à vista ou em até 12× no cartão.",
};

export type Preco = { avista: string; parcelado: string; valor: number };
export type Precos = { primeiraTurma: Preco; regular: Preco };

/** Preço que vale hoje: condição de primeira turma até 12/12/2026, depois o regular. */
export function precoAtual(precos: Precos, agora = Date.now()): Preco {
  return condicaoPrimeiraTurmaAtiva(agora) ? precos.primeiraTurma : precos.regular;
}

// ------------------------------------------------------------------ UTMs

const CHAVES_UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORAGE_UTM = "nk-voomp-utm";

/**
 * Guarda as UTMs da chegada (anúncio, QR, e-mail) para a sessão: a pessoa
 * costuma rolar a página, abrir o FAQ e só depois clicar em inscrever-se.
 * Também aceita a convenção da casa ?src= / ?c=.
 */
export function guardarUtmDaChegada() {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const chave of CHAVES_UTM) {
      const valor = params.get(chave);
      if (valor) utm[chave] = valor.slice(0, 120);
    }
    if (!utm.utm_source && params.get("src")) utm.utm_source = params.get("src")!.slice(0, 120);
    if (!utm.utm_campaign && params.get("c")) utm.utm_campaign = params.get("c")!.slice(0, 120);
    if (Object.keys(utm).length > 0) sessionStorage.setItem(STORAGE_UTM, JSON.stringify(utm));
  } catch {
    /* sessionStorage indisponível — o checkout abre só com a origem da rota */
  }
}

function utmDaSessao(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_UTM) ?? "{}");
  } catch {
    return {};
  }
}

/**
 * Link de checkout com as UTMs da sessão (ou, sem UTM, com a origem da rota:
 * /mba/instagram vira utm_source=instagram). Null se o link ainda não existe.
 */
export function checkoutUrl(id: OfertaId, origemDaRota?: string): string | null {
  const base = CHECKOUT_VOOMP[id];
  if (!base) return null;
  try {
    const url = new URL(base);
    const utm = utmDaSessao();
    if (!utm.utm_source) {
      const { source, campaign } = getAttribution(origemDaRota);
      if (source) utm.utm_source = source;
      if (campaign && !utm.utm_campaign) utm.utm_campaign = campaign;
    }
    for (const [chave, valor] of Object.entries(utm)) {
      if (!url.searchParams.has(chave)) url.searchParams.set(chave, valor);
    }
    return url.toString();
  } catch {
    return base;
  }
}

export function whatsappUrl(mensagem: string): string {
  if (!WHATSAPP_DUVIDAS) return contact.whatsapp;
  return `https://wa.me/${WHATSAPP_DUVIDAS}?text=${encodeURIComponent(mensagem)}`;
}

// ------------------------------------------- canais (rotas curtas por canal)

export const CANAIS_VENDA = ["instagram", "facebook", "youtube", "linkedin", "tiktok", "whatsapp"] as const;
export type CanalVenda = (typeof CANAIS_VENDA)[number];

export function canalValido(canal?: string): CanalVenda | undefined {
  return CANAIS_VENDA.includes(canal as CanalVenda) ? (canal as CanalVenda) : undefined;
}

// ---------------------------------------------------------- quem conduz

export const giselle = {
  nome: "Profa. Dra. Giselle Couto Falcão",
  foto: "/brand/giselle-retrato-3.jpg",
  resumo:
    "Doutora em Modelagem Matemática e Computacional pelo CEFET-MG e em Matemática do Clima pela Sorbonne Université, com MBA in Data Science pela University of Hartford. Professora há mais de 18 anos, no ensino básico e no superior, desenha e coloca em operação soluções de IA para a indústria, a logística, o agro, a educação e o setor público.",
  provas: [
    "Tech lead de projetos de machine learning na indústria 4.0 da Mercedes-Benz, na previsão de insumos hospitalares e na classificação de risco em contas médicas",
    "Curral AI: roteirização naval que levou a ocupação da frota de 60% para 87%",
    "Metodologia CEOD (livro, 2026): estudo com 809 escolas e +20,7 pontos no SAEB",
    "Palestrante no DATA BH · SQL Saturday (PUC Minas), no Minas Summit e no HackTown",
  ],
};

export const notaEmpresa =
  "Conteúdo e coordenação pedagógica: NOKAHI EDU (Nokahi Consultoria e Soluções Ltda., CNPJ 34.849.449/0001-40), Belo Horizonte/MG.";

// ------------------------------------------------- dados estruturados (SEO)

/**
 * Course + Offer + FAQPage de uma oferta da Turma 01. Usado pelo RouteSeo
 * (navegador) e pelo prerender (snapshot dos robôs), com o mesmo conteúdo.
 */
export function schemaOferta(
  o: {
    nome: string;
    descricao: string;
    rota: string;
    horas: number;
    credencial: string;
    precos: Precos;
    faq: { q: string; a: string }[];
  },
  agora = Date.now(),
): Record<string, unknown>[] {
  const url = `https://www.coutofalcao.com${o.rota}`;
  const preco = precoAtual(o.precos, agora);
  const condicao = condicaoPrimeiraTurmaAtiva(agora);
  return [
    {
      "@type": "Course",
      name: o.nome,
      description: o.descricao,
      inLanguage: "pt-BR",
      url,
      provider: { "@type": "Organization", name: "NOKAHI EDU", url },
      educationalCredentialAwarded: o.credencial,
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Online",
        startDate: turma01.inicioIso,
        courseWorkload: `PT${o.horas}H`,
        instructor: { "@type": "Person", name: "Giselle Couto Falcão" },
      },
      offers: {
        "@type": "Offer",
        category: "Paid",
        price: String(preco.valor),
        priceCurrency: "BRL",
        url,
        availability: inscricoesAbertas(agora) ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
        ...(condicao ? { priceValidUntil: turma01.fimCondicaoIso } : {}),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: o.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}
