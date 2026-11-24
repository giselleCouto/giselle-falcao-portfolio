// O agente de IA do WhatsApp: decide, para as mensagens ainda sem resposta de
// uma conversa, se responde (com a base de conhecimento) ou se passa a
// conversa para a Giselle. Usa a API do Claude (Anthropic).
//
// Ordem de decisão:
// 1. regra fixa (regras.ts): pagamento com problema, reembolso, Anhanguera,
//    empresa, reclamação ou pedido de pessoa → repasse, sem chamar a IA;
// 2. a IA responde ou chama a ferramenta passar_para_giselle;
// 3. a resposta é conferida (preço, cupom, link, data, certificado, tom). Se
//    não passar, a IA reescreve uma vez; se falhar de novo, vira repasse.

import Anthropic from "@anthropic-ai/sdk";
import { fatosDoDia, montarPromptDoSistema, relogioBrasilia } from "./conhecimento";
import {
  CATEGORIAS_REPASSE,
  RESPOSTA_SEM_TEXTO,
  conferirResposta,
  detectarRepasse,
  ehCategoria,
  mensagemDeRepasse,
  paraWhatsApp,
  type CategoriaRepasse,
} from "./regras";

export type Autor = "cliente" | "agente" | "giselle";
export type MensagemDoHistorico = { autor: Autor; texto: string; semTexto?: boolean };

export type Decisao =
  | {
      tipo: "resposta";
      texto: string;
      tentativas: number;
      problemasCorrigidos: string[];
      uso?: UsoDoModelo;
    }
  | {
      tipo: "repasse";
      categoria: CategoriaRepasse;
      /** Para a Giselle (aviso e painel). */
      resumo: string;
      /** Para a pessoa no WhatsApp. */
      texto: string;
      origem: "regra" | "agente" | "conferencia" | "erro" | "recusa";
      problemas?: string[];
      uso?: UsoDoModelo;
    };

export type UsoDoModelo = { modelo: string; entrada: number; saida: number; cacheLido: number; cacheCriado: number };

/** O que o agente precisa do cliente da Anthropic (permite testar sem rede). */
export type ClienteClaude = {
  criar(params: Anthropic.Beta.Messages.MessageCreateParamsNonStreaming): Promise<Anthropic.Beta.Messages.BetaMessage>;
};

export function clienteClaudePadrao(apiKey = process.env.ANTHROPIC_API_KEY): ClienteClaude | null {
  if (!apiKey) return null;
  const client = new Anthropic({ apiKey, timeout: 60_000, maxRetries: 2 });
  return { criar: (params) => client.beta.messages.create(params) };
}

export const MODELO_PADRAO = "claude-opus-5-5";
type Esforco = "low" | "medium" | "high";

export const FERRAMENTA_REPASSE: Anthropic.Beta.Messages.BetaTool = {
  name: "passar_para_giselle",
  description:
    "Passa a conversa para a Giselle (atendimento humano) e avisa ela no celular. Use nos casos da seção 'Quando passar para a Giselle' da base de conhecimento, e sempre que não souber a resposta com certeza. Depois de chamar, não escreva mais nada: o sistema manda a mensagem de repasse para a pessoa.",
  input_schema: {
    type: "object",
    properties: {
      categoria: {
        type: "string",
        enum: [...CATEGORIAS_REPASSE],
        description: "Assunto do repasse.",
      },
      resumo: {
        type: "string",
        description:
          "Para a Giselle, em 1 ou 2 frases: quem é a pessoa (se disse), o que ela quer e o que você já respondeu.",
      },
    },
    required: ["categoria", "resumo"],
    additionalProperties: false,
  },
  strict: true,
};

const LIMITE_TEXTO_CLIENTE = 2500;

/** Histórico do banco → mensagens da API (cliente = user; agente e Giselle = assistant). */
export function montarMensagens(historico: MensagemDoHistorico[]): Anthropic.Beta.Messages.BetaMessageParam[] {
  const msgs: Anthropic.Beta.Messages.BetaMessageParam[] = [];
  for (const m of historico) {
    const role = m.autor === "cliente" ? "user" : "assistant";
    let texto = m.texto.trim().slice(0, LIMITE_TEXTO_CLIENTE);
    if (m.autor === "giselle") texto = `[A Giselle respondeu pessoalmente:] ${texto}`;
    if (!texto) continue;
    const anterior = msgs[msgs.length - 1];
    if (anterior && anterior.role === role && typeof anterior.content === "string") {
      anterior.content = `${anterior.content}\n${texto}`;
    } else {
      msgs.push({ role, content: texto });
    }
  }
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  return msgs;
}

function textoDoRelogio(agora: number, primeiraResposta: boolean): string {
  const r = relogioBrasilia(agora);
  return [
    `Agora: ${r.nomeDia}, ${r.data}, ${r.hora} (horário de Brasília).`,
    r.horarioDaGiselle
      ? "Estamos no horário de atendimento da Giselle (seg–sex, 8h–18h)."
      : "Estamos fora do horário de atendimento da Giselle (seg–sex, 8h–18h).",
    primeiraResposta
      ? "Esta é a sua primeira resposta nesta conversa: comece dizendo, numa frase curta e calorosa, que você é o assistente virtual da NOKAHI EDU."
      : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function lerUso(r: Anthropic.Beta.Messages.BetaMessage): UsoDoModelo {
  return {
    modelo: r.model,
    entrada: r.usage.input_tokens,
    saida: r.usage.output_tokens,
    cacheLido: r.usage.cache_read_input_tokens ?? 0,
    cacheCriado: r.usage.cache_creation_input_tokens ?? 0,
  };
}

function somarUso(a: UsoDoModelo | undefined, b: UsoDoModelo): UsoDoModelo {
  if (!a) return b;
  return {
    modelo: b.modelo,
    entrada: a.entrada + b.entrada,
    saida: a.saida + b.saida,
    cacheLido: a.cacheLido + b.cacheLido,
    cacheCriado: a.cacheCriado + b.cacheCriado,
  };
}

export type OpcoesDoAgente = {
  claude: ClienteClaude | null;
  agora?: number;
  modelo?: string;
  esforco?: Esforco;
};

/**
 * Decide a próxima mensagem da conversa. `historico` termina nas mensagens da
 * pessoa ainda sem resposta (as mais recentes, na ordem em que chegaram).
 */
export async function decidir(historico: MensagemDoHistorico[], opcoes: OpcoesDoAgente): Promise<Decisao> {
  const agora = opcoes.agora ?? Date.now();
  const pendentes: MensagemDoHistorico[] = [];
  for (let i = historico.length - 1; i >= 0 && historico[i].autor === "cliente"; i--) pendentes.unshift(historico[i]);
  const textoPendente = pendentes
    .filter((m) => !m.semTexto)
    .map((m) => m.texto)
    .join("\n");

  // 0. Só áudio, imagem ou figurinha: pede texto, sem gastar a IA.
  if (pendentes.length && !textoPendente.trim()) {
    return { tipo: "resposta", texto: RESPOSTA_SEM_TEXTO, tentativas: 0, problemasCorrigidos: [] };
  }

  // 1. Regra fixa.
  const detectado = detectarRepasse(textoPendente);
  if (detectado) {
    return {
      tipo: "repasse",
      categoria: detectado.categoria,
      resumo: `Mensagem: "${textoPendente.slice(0, 300)}"`,
      texto: mensagemDeRepasse(detectado.categoria, agora),
      origem: "regra",
    };
  }

  if (!opcoes.claude) {
    return {
      tipo: "repasse",
      categoria: "outro",
      resumo: `O agente está sem a chave da API do Claude (ANTHROPIC_API_KEY). Mensagem: "${textoPendente.slice(0, 300)}"`,
      texto: mensagemDeRepasse("outro", agora),
      origem: "erro",
    };
  }

  // 2. A IA responde.
  const fatos = fatosDoDia(agora);
  const sistema = montarPromptDoSistema(agora);
  const mensagens = montarMensagens(historico);
  const primeiraResposta = !historico.some((m) => m.autor !== "cliente");
  const modelo = opcoes.modelo ?? MODELO_PADRAO;
  let uso: UsoDoModelo | undefined;
  let problemasAnteriores: string[] = [];
  const corrigidos: string[] = [];

  for (let tentativa = 1; tentativa <= 2; tentativa++) {
    const avisoDeCorrecao = problemasAnteriores.length
      ? ` Sua resposta anterior foi bloqueada antes do envio por estes motivos: ${problemasAnteriores.join("; ")}. Escreva de novo usando só os valores, cupons, links e datas que estão na base. Se não tiver certeza, use a ferramenta passar_para_giselle.`
      : "";
    let resposta: Anthropic.Beta.Messages.BetaMessage;
    try {
      resposta = await opcoes.claude.criar({
        model: modelo,
        max_tokens: 8000,
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        output_config: { effort: opcoes.esforco ?? "low" },
        system: [{ type: "text", text: sistema, cache_control: { type: "ephemeral" } }],
        tools: [FERRAMENTA_REPASSE],
        tool_choice: { type: "auto" },
        messages: [...mensagens, { role: "system", content: textoDoRelogio(agora, primeiraResposta) + avisoDeCorrecao }],
      });
    } catch (erro) {
      console.error("[WhatsApp] falha na API do Claude:", erro);
      return {
        tipo: "repasse",
        categoria: "outro",
        resumo: `O agente não conseguiu responder (falha na API do Claude). Mensagem: "${textoPendente.slice(0, 300)}"`,
        texto: mensagemDeRepasse("outro", agora),
        origem: "erro",
        uso,
      };
    }
    uso = somarUso(uso, lerUso(resposta));

    if (resposta.stop_reason === "refusal") {
      return {
        tipo: "repasse",
        categoria: "nao_sei",
        resumo: `O modelo recusou responder. Mensagem: "${textoPendente.slice(0, 300)}"`,
        texto: mensagemDeRepasse("nao_sei", agora),
        origem: "recusa",
        uso,
      };
    }

    const chamada = resposta.content.find(
      (b): b is Anthropic.Beta.Messages.BetaToolUseBlock => b.type === "tool_use" && b.name === FERRAMENTA_REPASSE.name
    );
    if (chamada) {
      const entrada = (chamada.input ?? {}) as { categoria?: unknown; resumo?: unknown };
      const categoria = ehCategoria(entrada.categoria) ? entrada.categoria : "outro";
      const resumo = typeof entrada.resumo === "string" && entrada.resumo.trim() ? entrada.resumo.trim() : textoPendente.slice(0, 300);
      return {
        tipo: "repasse",
        categoria,
        resumo: resumo.slice(0, 600),
        texto: mensagemDeRepasse(categoria, agora),
        origem: "agente",
        uso,
      };
    }

    const texto = paraWhatsApp(
      resposta.content
        .filter((b): b is Anthropic.Beta.Messages.BetaTextBlock => b.type === "text")
        .map((b) => b.text)
        .join("\n\n")
    );
    const problemas = texto ? conferirResposta(texto, fatos, agora) : ["resposta vazia"];
    if (!problemas.length) {
      return { tipo: "resposta", texto, tentativas: tentativa, problemasCorrigidos: corrigidos, uso };
    }
    console.warn("[WhatsApp] resposta bloqueada na conferência:", problemas);
    corrigidos.push(...problemas);
    problemasAnteriores = problemas;
  }

  // 3. Falhou duas vezes na conferência: a Giselle responde.
  return {
    tipo: "repasse",
    categoria: "nao_sei",
    resumo: `O agente não conseguiu uma resposta segura (${problemasAnteriores.join("; ")}). Mensagem: "${textoPendente.slice(0, 300)}"`,
    texto: mensagemDeRepasse("nao_sei", agora),
    origem: "conferencia",
    problemas: problemasAnteriores,
    uso,
  };
}
