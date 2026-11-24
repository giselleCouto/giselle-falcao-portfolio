// WhatsApp Cloud API (API oficial da Meta): envio de mensagens e leitura dos
// avisos (webhook). Nada aqui imita o WhatsApp Web.
//
// Dois provedores, com o mesmo formato de mensagem da Cloud API:
// - "meta": direto na Graph API (graph.facebook.com/<versão>/<phone_number_id>),
//   token de usuário do sistema no cabeçalho Authorization. É o caminho do
//   número de teste da Meta e de um número só na API.
// - "360dialog": parceiro oficial da Meta que faz a coexistência (o mesmo número
//   no app WhatsApp Business do celular e na API). Mesma API, outro endereço
//   (waba-v2.360dialog.io) e a chave no cabeçalho D360-API-KEY.

import { createHmac, timingSafeEqual } from "crypto";

export type Provedor = "meta" | "360dialog";

export type ConfigWhatsApp = {
  provedor: Provedor;
  token: string;
  phoneNumberId: string | null;
  versaoGraph: string;
};

export function configWhatsApp(env: NodeJS.ProcessEnv = process.env): ConfigWhatsApp | null {
  const provedor: Provedor = env.WHATSAPP_PROVEDOR === "360dialog" ? "360dialog" : "meta";
  const token = env.WHATSAPP_TOKEN?.trim();
  const phoneNumberId = env.WHATSAPP_PHONE_NUMBER_ID?.trim() || null;
  if (!token) return null;
  if (provedor === "meta" && !phoneNumberId) return null;
  return { provedor, token, phoneNumberId, versaoGraph: env.WHATSAPP_GRAPH_VERSAO?.trim() || "v23.0" };
}

function endereco(cfg: ConfigWhatsApp): { url: string; cabecalhos: Record<string, string> } {
  if (cfg.provedor === "360dialog") {
    return { url: "https://waba-v2.360dialog.io/messages", cabecalhos: { "D360-API-KEY": cfg.token } };
  }
  return {
    url: `https://graph.facebook.com/${cfg.versaoGraph}/${cfg.phoneNumberId}/messages`,
    cabecalhos: { Authorization: `Bearer ${cfg.token}` },
  };
}

export type Buscar = typeof fetch;

export class ErroWhatsApp extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly codigo: number | null
  ) {
    super(message);
  }
}

async function postar(cfg: ConfigWhatsApp, corpo: Record<string, unknown>, buscar: Buscar): Promise<{ id: string | null }> {
  const { url, cabecalhos } = endereco(cfg);
  const r = await buscar(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...cabecalhos },
    body: JSON.stringify({ messaging_product: "whatsapp", ...corpo }),
  });
  const texto = await r.text();
  let json: any = null;
  try {
    json = texto ? JSON.parse(texto) : null;
  } catch {
    /* corpo não-JSON */
  }
  if (!r.ok) {
    const erro = json?.error;
    throw new ErroWhatsApp(
      `WhatsApp ${r.status}: ${erro?.message ?? texto.slice(0, 300)}`,
      r.status,
      typeof erro?.code === "number" ? erro.code : null
    );
  }
  return { id: json?.messages?.[0]?.id ?? null };
}

export function enviarTexto(cfg: ConfigWhatsApp, para: string, texto: string, buscar: Buscar = fetch) {
  return postar(
    cfg,
    { recipient_type: "individual", to: para, type: "text", text: { body: texto, preview_url: false } },
    buscar
  );
}

/** Lista de opções do WhatsApp (até 10 linhas; título ≤ 24, descrição ≤ 72, botão ≤ 20 caracteres). */
export function enviarLista(
  cfg: ConfigWhatsApp,
  para: string,
  lista: { texto: string; botao: string; secao: string; linhas: { id: string; titulo: string; descricao: string }[] },
  buscar: Buscar = fetch
) {
  return postar(
    cfg,
    {
      recipient_type: "individual",
      to: para,
      type: "interactive",
      interactive: {
        type: "list",
        body: { text: lista.texto.slice(0, 1024) },
        action: {
          button: lista.botao.slice(0, 20),
          sections: [
            {
              title: lista.secao.slice(0, 24),
              rows: lista.linhas.slice(0, 10).map((l) => ({
                id: l.id.slice(0, 200),
                title: l.titulo.slice(0, 24),
                description: l.descricao.slice(0, 72),
              })),
            },
          ],
        },
      },
    },
    buscar
  );
}

/** Parâmetro de modelo: sem quebra de linha, tabulação nem 4+ espaços seguidos (regra da Meta). */
export function limparParametro(v: string, max = 600): string {
  return v.replace(/[\r\n\t]+/g, " ").replace(/ {4,}/g, "   ").trim().slice(0, max) || "-";
}

export function enviarModelo(
  cfg: ConfigWhatsApp,
  para: string,
  nome: string,
  idioma: string,
  parametros: string[],
  buscar: Buscar = fetch
) {
  return postar(
    cfg,
    {
      recipient_type: "individual",
      to: para,
      type: "template",
      template: {
        name: nome,
        language: { code: idioma },
        components: [{ type: "body", parameters: parametros.map((p) => ({ type: "text", text: limparParametro(p) })) }],
      },
    },
    buscar
  );
}

/** Marca a mensagem da pessoa como lida (os dois tracinhos azuis). Falha em silêncio. */
export async function marcarComoLida(cfg: ConfigWhatsApp, messageId: string, buscar: Buscar = fetch) {
  try {
    await postar(cfg, { status: "read", message_id: messageId }, buscar);
  } catch {
    /* não atrapalha a resposta */
  }
}

/** Assinatura X-Hub-Signature-256 dos avisos da Meta (HMAC-SHA256 do corpo com o App Secret). */
export function assinaturaValida(corpoBruto: Buffer, cabecalho: string | undefined, appSecret: string): boolean {
  if (!cabecalho?.startsWith("sha256=")) return false;
  const esperado = createHmac("sha256", appSecret).update(corpoBruto).digest();
  let recebido: Buffer;
  try {
    recebido = Buffer.from(cabecalho.slice(7), "hex");
  } catch {
    return false;
  }
  return recebido.length === esperado.length && timingSafeEqual(recebido, esperado);
}

// ------------------------------------------------------------ leitura do aviso

export type MensagemRecebida = {
  waId: string;
  nome: string | null;
  waMessageId: string;
  tipo: string;
  texto: string;
  /** Áudio, imagem, figurinha etc. sem texto que o agente consiga ler. */
  semTexto: boolean;
  recebidaEm: Date;
};

/** Mensagem que a Giselle mandou do app WhatsApp Business (coexistência: smb_message_echoes). */
export type EcoDaGiselle = { waId: string; waMessageId: string; tipo: string; texto: string; enviadaEm: Date };

export type StatusDeEnvio = { waMessageId: string; status: string; waId: string | null; erro: string | null };

export type AvisoLido = { mensagens: MensagemRecebida[]; ecos: EcoDaGiselle[]; status: StatusDeEnvio[] };

const ROTULO_SEM_TEXTO: Record<string, string> = {
  audio: "[áudio]",
  voice: "[áudio]",
  image: "[imagem]",
  video: "[vídeo]",
  document: "[documento]",
  sticker: "[figurinha]",
  location: "[localização]",
  contacts: "[contato]",
};

function dataDoAviso(ts: unknown): Date {
  const n = Number(ts);
  return Number.isFinite(n) && n > 0 ? new Date(n * 1000) : new Date();
}

/** Texto legível de uma mensagem da Cloud API (texto, botão, lista, legenda). */
export function textoDaMensagem(m: any): { tipo: string; texto: string; semTexto: boolean } {
  const tipo = String(m?.type ?? "desconhecido");
  if (tipo === "text") return { tipo, texto: String(m.text?.body ?? ""), semTexto: false };
  if (tipo === "button") return { tipo, texto: String(m.button?.text ?? m.button?.payload ?? ""), semTexto: false };
  if (tipo === "interactive") {
    const i = m.interactive ?? {};
    const titulo = i.button_reply?.title ?? i.list_reply?.title ?? i.nfm_reply?.body ?? "";
    return { tipo, texto: String(titulo), semTexto: !titulo };
  }
  const legenda = m?.[tipo]?.caption;
  if (legenda) return { tipo, texto: `${ROTULO_SEM_TEXTO[tipo] ?? `[${tipo}]`} ${legenda}`, semTexto: false };
  return { tipo, texto: ROTULO_SEM_TEXTO[tipo] ?? `[${tipo}]`, semTexto: true };
}

/** Lê um aviso do webhook da WhatsApp Cloud API (mesmo formato na Meta e na 360dialog). */
export function lerAviso(corpo: unknown): AvisoLido {
  const lido: AvisoLido = { mensagens: [], ecos: [], status: [] };
  const entradas = Array.isArray((corpo as any)?.entry) ? (corpo as any).entry : [];
  for (const entrada of entradas) {
    const mudancas = Array.isArray(entrada?.changes) ? entrada.changes : [];
    for (const mudanca of mudancas) {
      const campo = String(mudanca?.field ?? "messages");
      const valor = mudanca?.value ?? {};
      const contatos: any[] = Array.isArray(valor.contacts) ? valor.contacts : [];
      const nomeDe = (waId: string) =>
        contatos.find((c) => c?.wa_id === waId)?.profile?.name ?? (contatos.length === 1 ? contatos[0]?.profile?.name : null) ?? null;

      if (campo === "smb_message_echoes") {
        const ecos: any[] = valor.message_echoes ?? valor.messages ?? [];
        for (const e of Array.isArray(ecos) ? ecos : []) {
          if (!e?.id || !e?.to) continue;
          const { tipo, texto } = textoDaMensagem(e);
          lido.ecos.push({ waId: String(e.to), waMessageId: String(e.id), tipo, texto, enviadaEm: dataDoAviso(e.timestamp) });
        }
        continue;
      }
      if (campo !== "messages") continue; // history, smb_app_state_sync, account_update…

      for (const m of Array.isArray(valor.messages) ? valor.messages : []) {
        if (!m?.id || !m?.from) continue;
        if (m.type === "reaction" || m.type === "system" || m.type === "unsupported" || m.type === "ephemeral") continue;
        const { tipo, texto, semTexto } = textoDaMensagem(m);
        lido.mensagens.push({
          waId: String(m.from),
          nome: nomeDe(String(m.from)),
          waMessageId: String(m.id),
          tipo,
          texto,
          semTexto,
          recebidaEm: dataDoAviso(m.timestamp),
        });
      }
      for (const s of Array.isArray(valor.statuses) ? valor.statuses : []) {
        if (!s?.id || !s?.status) continue;
        const erro = Array.isArray(s.errors) && s.errors.length
          ? `${s.errors[0]?.code ?? ""} ${s.errors[0]?.title ?? s.errors[0]?.message ?? ""}`.trim()
          : null;
        lido.status.push({ waMessageId: String(s.id), status: String(s.status), waId: s.recipient_id ? String(s.recipient_id) : null, erro });
      }
    }
  }
  return lido;
}
