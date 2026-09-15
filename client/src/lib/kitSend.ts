// Mecânica de envio do kit (§8): copiar o texto ANTES de abrir o canal,
// toast de confirmação, e deep link para o canal padrão. Só o WhatsApp aceita
// texto pré-preenchido — Instagram e LinkedIn abrem o perfil/direct e a pessoa
// cola. Analytics de eventos (§10) fica aqui também: dataLayer local + um
// registro best-effort no mesmo endpoint anônimo de visitas (LGPD-safe),
// para os eventos-chave aparecerem no digest diário da Giselle.

import { toast } from "sonner";
import { CONTATO } from "./kitData";
import { getSrc } from "./kitStore";

export function kitEvent(nome: string, detalhe?: string) {
  try {
    (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
      event: `kit_${nome}`,
      detalhe,
    });
  } catch {
    /* sem dataLayer — segue */
  }
  try {
    void fetch("/api/trpc/academy.visita", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        json: {
          path: `/kit/e/${nome}`,
          source: getSrc(),
          campaign: detalhe?.slice(0, 120),
        },
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* offline no auditório — o kit continua funcionando */
  }
}

async function copiar(texto: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    // Fallback para navegadores sem clipboard API em contexto inseguro.
    try {
      const ta = document.createElement("textarea");
      ta.value = texto;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

function linkCanal(canal: "whatsapp" | "instagram" | "linkedin", texto: string): string | null {
  if (canal === "whatsapp") {
    if (!CONTATO.whatsapp) return null;
    return `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(texto)}`;
  }
  if (canal === "instagram") return `https://ig.me/m/${CONTATO.instagram}`;
  return `https://www.linkedin.com/in/${CONTATO.linkedin}`;
}

/** Copia o texto, confirma com toast e abre o canal pedido (ou o padrão). */
export async function enviarParaGiselle(
  texto: string,
  ferramenta: string,
  canal?: "whatsapp" | "instagram" | "linkedin"
) {
  const escolhido = canal ?? (CONTATO.whatsapp ? CONTATO.padrao : "instagram");
  const copiou = await copiar(texto);
  if (copiou) toast.success("Resultado copiado. É só colar.");
  kitEvent("send_click", `${ferramenta}:${escolhido}`);
  const url = linkCanal(escolhido, texto);
  if (url) window.open(url, "_blank", "noopener,noreferrer");
}

/** Web Share API com fallback para cópia (botão "Compartilhar"). */
export async function compartilhar(texto: string, ferramenta: string) {
  kitEvent("share_click", ferramenta);
  try {
    if (navigator.share) {
      await navigator.share({ text: texto });
      return;
    }
  } catch {
    /* pessoa cancelou o share — cai no fallback silenciosamente? não: só sai */
    return;
  }
  const copiou = await copiar(texto);
  toast.success(copiou ? "Texto copiado. É só colar onde quiser." : "Não consegui copiar — selecione o texto manualmente.");
}

export const TEM_WHATSAPP = Boolean(CONTATO.whatsapp);
