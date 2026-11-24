// Peças para os testes do WhatsApp: um Claude falso, que devolve respostas
// prontas e guarda o que recebeu, e avisos no formato da WhatsApp Cloud API.

import type Anthropic from "@anthropic-ai/sdk";
import type { ClienteClaude } from "./agente";

type Msg = Anthropic.Beta.Messages.BetaMessage;
type Params = Anthropic.Beta.Messages.MessageCreateParamsNonStreaming;

const base = (content: unknown[], stop_reason: string): Msg =>
  ({
    id: "msg_teste",
    type: "message",
    role: "assistant",
    model: "claude-opus-5-5",
    content,
    stop_reason,
    stop_sequence: null,
    usage: { input_tokens: 100, output_tokens: 20, cache_read_input_tokens: 0, cache_creation_input_tokens: 0 },
  }) as unknown as Msg;

export const respostaDeTexto = (texto: string) => base([{ type: "text", text: texto, citations: null }], "end_turn");

export const chamadaDeRepasse = (categoria: string, resumo: string) =>
  base([{ type: "tool_use", id: "toolu_teste", name: "passar_para_giselle", input: { categoria, resumo } }], "tool_use");

export const recusa = () => base([], "refusal");

export function claudeFalso(respostas: (Msg | Error)[]): ClienteClaude & { chamadas: Params[] } {
  const chamadas: Params[] = [];
  return {
    chamadas,
    async criar(params) {
      chamadas.push(params);
      const r = respostas.shift();
      if (!r) throw new Error("O Claude falso ficou sem respostas");
      if (r instanceof Error) throw r;
      return r;
    },
  };
}

let contador = 0;

export function avisoDeMensagem(waId: string, texto: string, opcoes: { nome?: string; id?: string; tipo?: string } = {}) {
  const id = opcoes.id ?? `wamid.teste${++contador}`;
  const tipo = opcoes.tipo ?? "text";
  const mensagem: Record<string, unknown> = { from: waId, id, timestamp: String(Math.floor(Date.now() / 1000)), type: tipo };
  if (tipo === "text") mensagem.text = { body: texto };
  else mensagem[tipo] = { id: "media1", mime_type: "audio/ogg" };
  return {
    object: "whatsapp_business_account",
    entry: [
      {
        id: "WABA",
        changes: [
          {
            field: "messages",
            value: {
              messaging_product: "whatsapp",
              metadata: { display_phone_number: "5531982280551", phone_number_id: "PNID" },
              contacts: [{ profile: { name: opcoes.nome ?? "Ana" }, wa_id: waId }],
              messages: [mensagem],
            },
          },
        ],
      },
    ],
  };
}

export function avisoDeEco(para: string, texto: string, id = `wamid.eco${++contador}`) {
  return {
    object: "whatsapp_business_account",
    entry: [
      {
        id: "WABA",
        changes: [
          {
            field: "smb_message_echoes",
            value: {
              messaging_product: "whatsapp",
              metadata: { display_phone_number: "5531982280551", phone_number_id: "PNID" },
              message_echoes: [{ from: "5531982280551", to: para, id, timestamp: "1795000000", type: "text", text: { body: texto } }],
            },
          },
        ],
      },
    ],
  };
}

export function avisoDeStatus(id: string, status: string, erro?: { code: number; title: string }) {
  return {
    object: "whatsapp_business_account",
    entry: [
      {
        id: "WABA",
        changes: [
          {
            field: "messages",
            value: {
              messaging_product: "whatsapp",
              metadata: { display_phone_number: "5531982280551", phone_number_id: "PNID" },
              statuses: [{ id, status, timestamp: "1795000000", recipient_id: "5531999990000", ...(erro ? { errors: [erro] } : {}) }],
            },
          },
        ],
      },
    ],
  };
}

/** fetch falso da WhatsApp Cloud API: guarda cada envio e devolve um wamid novo. */
export function whatsappFalso(falhar?: (corpo: any) => boolean) {
  const envios: { url: string; cabecalhos: Record<string, string>; corpo: any }[] = [];
  let n = 0;
  const buscar = (async (url: string | URL, init?: RequestInit) => {
    const corpo = JSON.parse(String(init?.body ?? "{}"));
    envios.push({ url: String(url), cabecalhos: (init?.headers ?? {}) as Record<string, string>, corpo });
    if (falhar?.(corpo)) {
      return new Response(JSON.stringify({ error: { message: "Re-engagement message", code: 131047 } }), { status: 400 });
    }
    return new Response(JSON.stringify({ messages: [{ id: `wamid.enviado${++n}` }] }), { status: 200 });
  }) as typeof fetch;
  return { envios, buscar, textos: () => envios.filter((e) => e.corpo.type === "text") };
}
