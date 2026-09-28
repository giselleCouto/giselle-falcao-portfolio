// Eventos de interação (onde a pessoa age ou para): cliques em links/CTAs,
// início e envio de formulário, e profundidade de rolagem. Mesmo endpoint
// anônimo das visitas (LGPD-safe: sem IP, sem dado pessoal), com path
// "/e/<tipo><página>" — o servidor separa eventos de páginas vistas.
// Deduplica por sessão; best-effort: nunca lança.

import { getAttribution, getDailyVisitorId } from "./tracking";

const MAX_PATH = 255;

function slug(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9/.:_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function paginaAtual(): string {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

export function trackEvent(tipo: string, alvo?: string) {
  try {
    const path = `/e/${tipo}${paginaAtual()}${alvo ? `>${alvo}` : ""}`.slice(0, MAX_PATH);
    const dedupeKey = `trk-e:${path}`;
    if (sessionStorage.getItem(dedupeKey)) return;
    sessionStorage.setItem(dedupeKey, "1");
    const { source, campaign } = getAttribution();
    void fetch("/api/trpc/academy.visita", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ json: { path, visitorId: getDailyVisitorId(), source, campaign } }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* sessionStorage indisponível — segue sem medir */
  }
}

/** Rótulo do alvo: data-cta > rota interna > host externo (wa.me, calendar...). */
function alvoDoClique(el: Element): string | undefined {
  const cta = el.getAttribute("data-cta");
  if (cta) return slug(cta);
  const href = el.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("javascript:")) return undefined;
  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("tel:")) return "telefone";
  try {
    const url = new URL(href, window.location.href);
    if (url.host === window.location.host) return slug(url.pathname.replace(/\/+$/, "") || "/");
    return slug(url.host.replace(/^www\./, ""));
  } catch {
    return undefined;
  }
}

/** Instala os ouvintes globais uma vez; devolve a função de limpeza. */
export function installEventTracking(): () => void {
  const onClick = (e: MouseEvent) => {
    const el = (e.target as Element | null)?.closest?.("a[href], [data-cta]");
    if (!el) return;
    const alvo = alvoDoClique(el);
    if (alvo) trackEvent("clique", alvo);
  };
  const onFocusIn = (e: FocusEvent) => {
    if ((e.target as Element | null)?.closest?.("form")) trackEvent("form-inicio");
  };
  const onSubmit = () => trackEvent("form-envio");

  // Rolagem: marca 50% e 90% da página (só se houver o que rolar).
  let agendado = false;
  const onScroll = () => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(() => {
      agendado = false;
      const doc = document.documentElement;
      const rolavel = doc.scrollHeight - window.innerHeight;
      if (rolavel < 200) return;
      const pct = window.scrollY / rolavel;
      if (pct >= 0.5) trackEvent("rolagem-50");
      if (pct >= 0.9) trackEvent("rolagem-90");
    });
  };

  document.addEventListener("click", onClick, true);
  document.addEventListener("focusin", onFocusIn, true);
  document.addEventListener("submit", onSubmit, true);
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    document.removeEventListener("click", onClick, true);
    document.removeEventListener("focusin", onFocusIn, true);
    document.removeEventListener("submit", onSubmit, true);
    window.removeEventListener("scroll", onScroll);
  };
}
