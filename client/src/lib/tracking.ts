// Atribuição de origem/campanha compartilhada entre o rastreamento de visitas
// e os formulários de lead. Convenção da casa: ?src= (canal) e ?c= (campanha),
// com fallback para o padrão UTM (?utm_source= / ?utm_campaign=) para links
// gerados por ferramentas externas. A atribuição fica "sticky" na sessão
// (sessionStorage), então o lead mantém a origem mesmo navegando internamente
// até o formulário. Tudo best-effort: nunca lança.

const MAX = 120;

function clean(value: string | null | undefined): string | undefined {
  return value?.trim().slice(0, MAX) || undefined;
}

function sticky(key: string): string | undefined {
  try {
    return sessionStorage.getItem(key) ?? undefined;
  } catch {
    return undefined;
  }
}

/** Lê ?src=/?c= (ou utm_source/utm_campaign) da URL atual. */
export function readTrackingParams(): { srcParam?: string; cParam?: string } {
  if (typeof window === "undefined") return {};
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      srcParam: clean(params.get("src")) ?? clean(params.get("utm_source")),
      cParam: clean(params.get("c")) ?? clean(params.get("utm_campaign")),
    };
  } catch {
    return {};
  }
}

/** Grava a atribuição da sessão (chamado pelo rastreamento a cada rota). */
export function stickAttribution(srcParam?: string, cParam?: string) {
  try {
    if (srcParam) sessionStorage.setItem("trk-src", srcParam);
    if (cParam) sessionStorage.setItem("trk-c", cParam);
  } catch {
    /* sessionStorage indisponível — segue sem atribuição sticky */
  }
}

/**
 * Identificador anônimo do navegador para contar visitantes únicos por dia.
 * É aleatório (não deriva de IP nem de dado pessoal) e é trocado a cada dia,
 * então não dá para seguir a mesma pessoa entre dias.
 */
export function getDailyVisitorId(): string | undefined {
  try {
    // Data local (não UTC): no Brasil o dia vira à meia-noite, não às 21h.
    const now = new Date();
    const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const stored = localStorage.getItem("trk-vid");
    if (stored) {
      const [day, id] = stored.split("|");
      if (day === today && id) return id;
    }
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
    localStorage.setItem("trk-vid", `${today}|${id}`);
    return id;
  } catch {
    return undefined;
  }
}

/**
 * Origem/campanha para carimbar um lead no momento do envio.
 * Precedência: origem da rota (a rota É o canal, ex. /linkedin) > URL > sessão.
 */
export function getAttribution(routeSource?: string): {
  source?: string;
  campaign?: string;
} {
  const { srcParam, cParam } = readTrackingParams();
  return {
    source: routeSource || srcParam || sticky("trk-src"),
    campaign: cParam || sticky("trk-c"),
  };
}
