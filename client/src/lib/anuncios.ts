// Tags de anúncios (Pixel da Meta e LinkedIn Insight Tag) com consentimento.
//
// O carregador fica em client/index.html (window.__nkCarregarTagsAnuncio) e
// só roda depois que a pessoa aceita no aviso de cookies (AvisoCookies.tsx).
// Os IDs vêm das variáveis VITE_META_PIXEL_ID e VITE_LINKEDIN_PARTNER_ID do
// Railway; sem ID, a tag não existe e o aviso não aparece.
//
// Aqui ficam a escolha da pessoa, os eventos de conversão da Meta e o PageView
// das trocas de rota (o site é SPA: o PageView do index.html vale só para a
// primeira página). A Política de Privacidade (seção 3) descreve exatamente
// isto: mude as duas juntas.

type Fbq = ((...args: unknown[]) => void) & { disablePushState?: boolean };

declare global {
  interface Window {
    fbq?: Fbq;
    __nkTagsAnuncio?: { linkedin: string; meta: string };
    __nkCarregarTagsAnuncio?: () => void;
  }
}

export const CHAVE_CONSENTIMENTO = "nk-consentimento-anuncios";
export type Escolha = "sim" | "nao";

const EVENTO_ESCOLHA = "nk-consentimento";

/** Plataformas com tag configurada neste build (vazio = nenhum aviso de cookies) */
export function plataformasDeAnuncio(): ("Meta" | "LinkedIn")[] {
  if (typeof window === "undefined") return [];
  const ids = window.__nkTagsAnuncio;
  const lista: ("Meta" | "LinkedIn")[] = [];
  if (ids?.meta) lista.push("Meta");
  if (ids?.linkedin) lista.push("LinkedIn");
  return lista;
}

export function escolhaAtual(): Escolha | null {
  try {
    const valor = localStorage.getItem(CHAVE_CONSENTIMENTO);
    return valor === "sim" || valor === "nao" ? valor : null;
  } catch {
    return null;
  }
}

export function aoMudarEscolha(callback: () => void) {
  window.addEventListener(EVENTO_ESCOLHA, callback);
  return () => window.removeEventListener(EVENTO_ESCOLHA, callback);
}

/** Envia um evento à Meta. Sem consentimento (ou sem pixel), não faz nada. */
export function metaEvento(nome: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (params) window.fbq("track", nome, params);
    else window.fbq("track", nome);
  }
}

// Evento da página atual (ex.: ViewContent de uma oferta). Se a pessoa aceitar
// os cookies depois de a página abrir, ele é enviado na hora do aceite.
let eventoDaPagina: { caminho: string; nome: string; params?: Record<string, unknown> } | null = null;
let ultimoCaminho = "";

export function metaEventoDaPagina(nome: string, params?: Record<string, unknown>) {
  eventoDaPagina = { caminho: window.location.pathname, nome, params };
  metaEvento(nome, params);
}

export function registrarEscolha(escolha: Escolha) {
  try {
    localStorage.setItem(CHAVE_CONSENTIMENTO, escolha);
  } catch {
    /* sem localStorage: vale só para esta visita */
  }
  if (escolha === "sim") {
    window.__nkCarregarTagsAnuncio?.(); // já envia o PageView desta página
    ultimoCaminho = window.location.pathname;
    if (eventoDaPagina?.caminho === window.location.pathname) {
      metaEvento(eventoDaPagina.nome, eventoDaPagina.params);
    }
  }
  window.dispatchEvent(new Event(EVENTO_ESCOLHA));
}

/** Apaga a escolha e recarrega: as tags já carregadas saem e o aviso volta. */
export function revisarEscolha() {
  try {
    localStorage.removeItem(CHAVE_CONSENTIMENTO);
  } catch {
    /* nada a apagar */
  }
  window.location.reload();
}

let iniciado = false;

/** Chamado uma vez em main.tsx: PageView nas trocas de rota e cliques de conversão. */
export function iniciarTagsAnuncio() {
  if (iniciado || typeof window === "undefined") return;
  iniciado = true;
  ultimoCaminho = window.location.pathname;

  // O wouter dispara "pushState"/"replaceState" no window a cada navegação.
  const aoTrocarRota = () => {
    if (window.location.pathname === ultimoCaminho) return;
    ultimoCaminho = window.location.pathname;
    eventoDaPagina = null;
    metaEvento("PageView");
  };
  for (const tipo of ["pushState", "replaceState", "popstate"]) {
    window.addEventListener(tipo, aoTrocarRota);
  }

  // Checkout da Voomp = InitiateCheckout; WhatsApp = Contact. Nome e valor da
  // oferta vêm de data-meta-nome / data-meta-valor do link (Venda.tsx).
  document.addEventListener(
    "click",
    (evento) => {
      const alvo = evento.target as Element | null;
      const link = alvo?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const nome = link.dataset.metaNome;
      if (link.href.includes("pay.voompcreators.com.br")) {
        const valor = Number(link.dataset.metaValor);
        metaEvento("InitiateCheckout", {
          currency: "BRL",
          ...(nome ? { content_name: nome } : {}),
          ...(valor > 0 ? { value: valor } : {}),
        });
      } else if (/(^|\/\/)(wa\.me|api\.whatsapp\.com)\//.test(link.href)) {
        metaEvento("Contact", nome ? { content_name: nome } : undefined);
      }
    },
    true,
  );
}
