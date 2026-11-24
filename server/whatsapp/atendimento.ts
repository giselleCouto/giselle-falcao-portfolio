// Atendimento do WhatsApp da NOKAHI EDU: recebe os avisos do webhook, guarda
// tudo, espera a pessoa terminar de escrever, pede a decisão ao agente e envia
// a resposta (ou passa a conversa para a Giselle e avisa ela no WhatsApp
// pessoal).
//
// Regras de convivência com a Giselle (escolha dela em 23/11/2026: o agente
// atende 24 h e ela também responde pelo celular, em coexistência):
// - quando ela responde pelo app (aviso smb_message_echoes), o agente fica
//   quieto naquela conversa por WHATSAPP_PAUSA_HUMANO_HORAS (padrão 12 h);
// - quando o agente passa a conversa, ele fica quieto por
//   WHATSAPP_PAUSA_REPASSE_HORAS (padrão 72 h) ou até ela devolver no painel;
// - o painel (/painel/whatsapp) pausa ou devolve qualquer conversa, e pausa o
//   agente inteiro (ajuste "agente_pausado").

import { decidirComIa, decidirSemIa, type Autor, type ClienteClaude, type Decisao } from "./agente";
import {
  enviarLista,
  enviarModelo,
  enviarTexto,
  lerAviso,
  marcarComoLida,
  type Buscar,
  type ConfigWhatsApp,
  type MensagemRecebida,
} from "./cloudApi";
import type { SaidaFixa } from "./menu";
import { NOME_CATEGORIA, type CategoriaRepasse } from "./regras";

export type Conversa = {
  id: number;
  waId: string;
  nome: string | null;
  pausadoAte: Date | null;
  motivoPausa: string | null;
};

export type Mensagem = {
  id: number;
  conversaId: number;
  waMessageId: string | null;
  direcao: "entrada" | "saida";
  autor: Autor | "sistema";
  tipo: string;
  texto: string;
  semTexto: boolean;
  status: string | null;
  erro: string | null;
  criadaEm: Date;
  /** JSON com o uso do modelo; "llm":true marca resposta escrita pela IA. */
  meta?: string | null;
};

export type StatusRepasse = "aberto" | "respondido" | "resolvido";

export type Repasse = {
  id: number;
  conversaId: number;
  categoria: CategoriaRepasse;
  resumo: string;
  origem: string;
  status: StatusRepasse;
  avisadoEm: Date | null;
  avisoErro: string | null;
  criadoEm: Date;
};

export type NovaSaida = {
  autor: "agente" | "giselle" | "sistema";
  texto: string;
  tipo?: string;
  waMessageId: string | null;
  status: string;
  erro?: string | null;
  meta?: string | null;
  criadaEm?: Date;
};

/** Onde as conversas ficam guardadas (MySQL em produção; memória nos testes). */
export interface RepositorioWhatsApp {
  /** Grava a mensagem recebida. `nova = false` quando o aviso é repetido. */
  registrarEntrada(m: MensagemRecebida): Promise<{ conversa: Conversa; nova: boolean }>;
  /** Grava a mensagem enviada. Null quando o waMessageId já existia. */
  registrarSaida(conversaId: number, s: NovaSaida): Promise<Mensagem | null>;
  conversaPorId(id: number): Promise<Conversa | null>;
  conversaPorWaId(waId: string): Promise<Conversa | null>;
  criarConversa(waId: string, nome: string | null): Promise<Conversa>;
  /** Últimas mensagens da conversa, da mais antiga para a mais nova. */
  historico(conversaId: number, limite: number): Promise<Mensagem[]>;
  pausar(conversaId: number, ate: Date | null, motivo: string | null): Promise<void>;
  atualizarStatus(waMessageId: string, status: string, erro: string | null): Promise<void>;
  repasseAberto(conversaId: number): Promise<Repasse | null>;
  abrirRepasse(r: { conversaId: number; categoria: CategoriaRepasse; resumo: string; origem: string }): Promise<Repasse>;
  atualizarRepasse(
    id: number,
    campos: Partial<{ status: StatusRepasse; avisadoEm: Date | null; avisoErro: string | null; resumo: string; resolvidoEm: Date | null }>
  ): Promise<void>;
  /** Respostas escritas pela IA (meta "llm":true) desde a data — base do limite diário. */
  respostasDaIaDesde(conversaId: number, desde: Date): Promise<number>;
  ajuste(chave: string): Promise<string | null>;
}

export type ConfigAtendimento = {
  /** WHATSAPP_AGENTE_LIGADO=1. Desligado, o servidor só guarda as mensagens. */
  ligado: boolean;
  esperaMs: number;
  pausaHumanoMs: number;
  pausaRepasseMs: number;
  limiteDiario: number;
  avisoPara: string | null;
  modeloAviso: string | null;
  idiomaAviso: string;
  painelUrl: string;
  modelo?: string;
  esforco?: "low" | "medium" | "high";
};

const horas = (v: string | undefined, padrao: number) => {
  const n = Number(v);
  return (Number.isFinite(n) && n >= 0 ? n : padrao) * 3600_000;
};

export function configAtendimento(env: NodeJS.ProcessEnv = process.env): ConfigAtendimento {
  const esforco = env.WHATSAPP_ESFORCO;
  return {
    ligado: env.WHATSAPP_AGENTE_LIGADO === "1",
    esperaMs: Math.max(0, Number(env.WHATSAPP_ESPERA_SEGUNDOS ?? 6) || 0) * 1000,
    pausaHumanoMs: horas(env.WHATSAPP_PAUSA_HUMANO_HORAS, 12),
    pausaRepasseMs: horas(env.WHATSAPP_PAUSA_REPASSE_HORAS, 72),
    limiteDiario: Number(env.WHATSAPP_LIMITE_DIARIO ?? 15) || 15,
    avisoPara: env.WHATSAPP_AVISO_PARA?.replace(/\D/g, "") || null,
    modeloAviso: env.WHATSAPP_MODELO_AVISO?.trim() || null,
    idiomaAviso: env.WHATSAPP_MODELO_AVISO_IDIOMA?.trim() || "pt_BR",
    painelUrl: env.WHATSAPP_PAINEL_URL?.trim() || "https://www.coutofalcao.com/painel/whatsapp",
    modelo: env.WHATSAPP_MODELO?.trim() || undefined,
    esforco: esforco === "medium" || esforco === "high" || esforco === "low" ? esforco : undefined,
  };
}

export type DependenciasAtendimento = {
  repo: RepositorioWhatsApp;
  claude: ClienteClaude | null;
  whatsapp: ConfigWhatsApp | null;
  config: ConfigAtendimento;
  buscar?: Buscar;
  agora?: () => number;
  /** Troca a parte da IA (testes). */
  decidirComIa?: typeof decidirComIa;
};

export function criarAtendimento(deps: DependenciasAtendimento) {
  const agora = deps.agora ?? (() => Date.now());
  const buscar = deps.buscar ?? fetch;
  const decideComIa = deps.decidirComIa ?? decidirComIa;
  const temporizadores = new Map<number, ReturnType<typeof setTimeout>>();
  const filas = new Map<number, Promise<void>>();
  const emAndamento = new Set<Promise<void>>();

  function naFila(conversaId: number, tarefa: () => Promise<void>) {
    const anterior = filas.get(conversaId) ?? Promise.resolve();
    const proxima = anterior
      .then(tarefa)
      .catch((erro) => console.error(`[WhatsApp] falha na conversa ${conversaId}:`, erro))
      .finally(() => {
        if (filas.get(conversaId) === proxima) filas.delete(conversaId);
        emAndamento.delete(proxima);
      });
    filas.set(conversaId, proxima);
    emAndamento.add(proxima);
    return proxima;
  }

  /** Espera a pessoa terminar de escrever (várias mensagens seguidas = uma resposta). */
  function agendar(conversaId: number) {
    const existente = temporizadores.get(conversaId);
    if (existente) clearTimeout(existente);
    if (deps.config.esperaMs <= 0) {
      naFila(conversaId, () => processar(conversaId));
      return;
    }
    temporizadores.set(
      conversaId,
      setTimeout(() => {
        temporizadores.delete(conversaId);
        naFila(conversaId, () => processar(conversaId));
      }, deps.config.esperaMs)
    );
  }

  function cancelarAgendamento(conversaId: number) {
    const existente = temporizadores.get(conversaId);
    if (existente) clearTimeout(existente);
    temporizadores.delete(conversaId);
  }

  async function enviar(conversa: Conversa, texto: string, meta: Record<string, unknown>, saida?: SaidaFixa) {
    let waMessageId: string | null = null;
    let status = "enviado";
    let erro: string | null = null;
    if (!deps.whatsapp) {
      status = "nao_enviado";
      erro = "WhatsApp não configurado (WHATSAPP_TOKEN)";
    } else {
      try {
        waMessageId =
          saida?.tipo === "lista"
            ? (await enviarLista(deps.whatsapp, conversa.waId, saida, buscar)).id
            : (await enviarTexto(deps.whatsapp, conversa.waId, texto, buscar)).id;
      } catch (e) {
        status = "falhou";
        erro = String((e as Error)?.message ?? e).slice(0, 255);
        console.error("[WhatsApp] falha ao enviar:", erro);
      }
    }
    await deps.repo.registrarSaida(conversa.id, {
      autor: "agente",
      tipo: saida?.tipo === "lista" ? "interactive" : "text",
      texto,
      waMessageId,
      status,
      erro,
      meta: JSON.stringify(meta),
      criadaEm: new Date(agora()),
    });
    return status === "enviado";
  }

  async function avisarGiselle(conversa: Conversa, repasse: Repasse): Promise<{ ok: boolean; erro: string | null }> {
    const { avisoPara, modeloAviso, idiomaAviso, painelUrl } = deps.config;
    if (!deps.whatsapp) return { ok: false, erro: "WhatsApp não configurado" };
    if (!avisoPara) return { ok: false, erro: "Sem número para o aviso (WHATSAPP_AVISO_PARA)" };
    const quem = `${conversa.nome ?? "Sem nome"} (+${conversa.waId})`;
    const assunto = NOME_CATEGORIA[repasse.categoria];
    const link = `${painelUrl}?c=${conversa.id}`;
    try {
      if (modeloAviso) {
        await enviarModelo(deps.whatsapp, avisoPara, modeloAviso, idiomaAviso, [quem, assunto, repasse.resumo, link], buscar);
      } else {
        await enviarTexto(
          deps.whatsapp,
          avisoPara,
          `🔔 Conversa para você no WhatsApp da NOKAHI EDU\n\nQuem: ${quem}\nAssunto: ${assunto}\nResumo: ${repasse.resumo}\n\nResponda pelo app WhatsApp Business. Painel: ${link}`,
          buscar
        );
      }
      return { ok: true, erro: null };
    } catch (e) {
      const erro = String((e as Error)?.message ?? e).slice(0, 255);
      console.error("[WhatsApp] falha ao avisar a Giselle:", erro);
      return { ok: false, erro };
    }
  }

  async function repassar(conversa: Conversa, d: Extract<Decisao, { tipo: "repasse" }>) {
    const aberto = await deps.repo.repasseAberto(conversa.id);
    if (aberto) {
      await deps.repo.atualizarRepasse(aberto.id, { resumo: `${aberto.resumo} | ${d.resumo}`.slice(0, 2000) });
    } else {
      const novo = await deps.repo.abrirRepasse({
        conversaId: conversa.id,
        categoria: d.categoria,
        resumo: d.resumo,
        origem: d.origem,
      });
      const aviso = await avisarGiselle(conversa, novo);
      await deps.repo.atualizarRepasse(novo.id, {
        avisadoEm: aviso.ok ? new Date(agora()) : null,
        avisoErro: aviso.erro,
      });
    }
    await deps.repo.pausar(conversa.id, new Date(agora() + deps.config.pausaRepasseMs), `repasse:${d.categoria}`);
    await enviar(conversa, d.texto, { repasse: d.categoria, origem: d.origem, problemas: d.problemas, uso: d.uso });
  }

  /** Responde (ou repassa) as mensagens ainda sem resposta da conversa. */
  async function processar(conversaId: number) {
    if (!deps.config.ligado) return;
    if ((await deps.repo.ajuste("agente_pausado")) === "1") return;
    const conversa = await deps.repo.conversaPorId(conversaId);
    if (!conversa) return;
    if (conversa.pausadoAte && conversa.pausadoAte.getTime() > agora()) return;

    const historico = await deps.repo.historico(conversaId, 30);
    const ultima = historico[historico.length - 1];
    if (!ultima || ultima.autor !== "cliente") return; // nada pendente

    const historicoParaDecidir = historico
      .filter((m): m is Mensagem & { autor: Autor } => m.autor !== "sistema")
      .map((m) => ({ autor: m.autor, texto: m.texto, semTexto: m.semTexto, em: m.criadaEm }));
    let decisao: Decisao | null = decidirSemIa(historicoParaDecidir, agora());
    if (!decisao) {
      const respostasDaIa24h = await deps.repo.respostasDaIaDesde(conversaId, new Date(agora() - 24 * 3600_000));
      decisao =
        respostasDaIa24h >= deps.config.limiteDiario
          ? {
              tipo: "repasse",
              categoria: "outro",
              resumo: `A conversa passou de ${deps.config.limiteDiario} respostas da IA em 24 h.`,
              texto: "Já passei a nossa conversa para a Giselle, e ela continua com você por aqui mesmo.",
              origem: "regra",
            }
          : await decideComIa(historicoParaDecidir, {
              claude: deps.claude,
              agora: agora(),
              modelo: deps.config.modelo,
              esforco: deps.config.esforco,
            });
    }
    if (decisao.tipo === "ignorar") return; // "ok", "obrigada", emoji: não gasta mensagem

    // A Giselle pode ter respondido enquanto a IA pensava: nesse caso, o agente não fala por cima.
    const atual = await deps.repo.conversaPorId(conversaId);
    if (atual?.pausadoAte && atual.pausadoAte.getTime() > agora()) return;

    if (decisao.tipo === "fixa") {
      const enviou = await enviar(conversa, decisao.texto, { fixa: decisao.rota }, decisao.saida);
      if (enviou && deps.whatsapp && ultima.waMessageId) await marcarComoLida(deps.whatsapp, ultima.waMessageId, buscar);
    } else if (decisao.tipo === "resposta") {
      const enviou = await enviar(conversa, decisao.texto, {
        llm: true,
        tentativas: decisao.tentativas,
        corrigidos: decisao.problemasCorrigidos,
        uso: decisao.uso,
      });
      if (enviou && deps.whatsapp && ultima.waMessageId) await marcarComoLida(deps.whatsapp, ultima.waMessageId, buscar);
    } else if (decisao.tipo === "repasse") {
      await repassar(conversa, decisao);
    }
  }

  /** Trata um aviso do webhook (mensagens recebidas, respostas da Giselle pelo app, status de envio). */
  async function receberAviso(corpo: unknown) {
    const lido = lerAviso(corpo);

    for (const s of lido.status) {
      await deps.repo.atualizarStatus(s.waMessageId, s.status, s.erro);
    }

    for (const eco of lido.ecos) {
      const conversa = (await deps.repo.conversaPorWaId(eco.waId)) ?? (await deps.repo.criarConversa(eco.waId, null));
      const gravada = await deps.repo.registrarSaida(conversa.id, {
        autor: "giselle",
        texto: eco.texto,
        tipo: eco.tipo,
        waMessageId: eco.waMessageId,
        status: "enviado",
        criadaEm: eco.enviadaEm,
      });
      if (!gravada) continue; // eco de uma mensagem que o próprio agente mandou
      cancelarAgendamento(conversa.id);
      await deps.repo.pausar(conversa.id, new Date(agora() + deps.config.pausaHumanoMs), "giselle_respondeu");
      const aberto = await deps.repo.repasseAberto(conversa.id);
      if (aberto) await deps.repo.atualizarRepasse(aberto.id, { status: "respondido" });
    }

    for (const m of lido.mensagens) {
      const { conversa, nova } = await deps.repo.registrarEntrada(m);
      if (nova) agendar(conversa.id);
    }
  }

  return {
    receberAviso,
    processar: (conversaId: number) => naFila(conversaId, () => processar(conversaId)),
    /** Espera tudo o que está na fila terminar (testes e desligamento). */
    async aguardarOcioso() {
      while (emAndamento.size || temporizadores.size) {
        if (!emAndamento.size) await new Promise((r) => setTimeout(r, 10));
        await Promise.all(Array.from(emAndamento));
      }
    },
  };
}

export type Atendimento = ReturnType<typeof criarAtendimento>;
