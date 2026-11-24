// RepositorioWhatsApp em memória: testes e simulação local (sem MySQL).

import type { Conversa, Mensagem, Repasse, RepositorioWhatsApp } from "./atendimento";

export function criarRepositorioEmMemoria() {
  const conversas: Conversa[] = [];
  const mensagens: Mensagem[] = [];
  const repasses: Repasse[] = [];
  const ajustes = new Map<string, string>();

  const conversaPorWaId = (waId: string) => conversas.find((c) => c.waId === waId) ?? null;
  const criar = (waId: string, nome: string | null) => {
    const existente = conversaPorWaId(waId);
    if (existente) {
      if (nome) existente.nome = nome;
      return existente;
    }
    const c: Conversa = { id: conversas.length + 1, waId, nome, pausadoAte: null, motivoPausa: null };
    conversas.push(c);
    return c;
  };

  const repo: RepositorioWhatsApp = {
    async registrarEntrada(m) {
      const conversa = criar(m.waId, m.nome);
      if (mensagens.some((x) => x.waMessageId === m.waMessageId)) return { conversa, nova: false };
      mensagens.push({
        id: mensagens.length + 1,
        conversaId: conversa.id,
        waMessageId: m.waMessageId,
        direcao: "entrada",
        autor: "cliente",
        tipo: m.tipo,
        texto: m.texto,
        semTexto: m.semTexto,
        status: "recebido",
        erro: null,
        criadaEm: m.recebidaEm,
      });
      return { conversa, nova: true };
    },
    async registrarSaida(conversaId, s) {
      if (s.waMessageId && mensagens.some((x) => x.waMessageId === s.waMessageId)) return null;
      const m: Mensagem = {
        id: mensagens.length + 1,
        conversaId,
        waMessageId: s.waMessageId,
        direcao: "saida",
        autor: s.autor,
        tipo: s.tipo ?? "text",
        texto: s.texto,
        semTexto: false,
        status: s.status,
        erro: s.erro ?? null,
        criadaEm: s.criadaEm ?? new Date(),
      };
      mensagens.push(m);
      return m;
    },
    async conversaPorId(id) {
      return conversas.find((c) => c.id === id) ?? null;
    },
    async conversaPorWaId(waId) {
      return conversaPorWaId(waId);
    },
    async criarConversa(waId, nome) {
      return criar(waId, nome);
    },
    async historico(conversaId, limite) {
      return mensagens.filter((m) => m.conversaId === conversaId).slice(-limite);
    },
    async pausar(conversaId, ate, motivo) {
      const c = conversas.find((x) => x.id === conversaId);
      if (c) {
        c.pausadoAte = ate;
        c.motivoPausa = motivo;
      }
    },
    async atualizarStatus(waMessageId, status, erro) {
      for (const m of mensagens) {
        if (m.waMessageId === waMessageId) {
          m.status = status;
          if (erro) m.erro = erro;
        }
      }
    },
    async repasseAberto(conversaId) {
      return [...repasses].reverse().find((r) => r.conversaId === conversaId && r.status !== "resolvido") ?? null;
    },
    async abrirRepasse(r) {
      const novo: Repasse = {
        id: repasses.length + 1,
        ...r,
        status: "aberto",
        avisadoEm: null,
        avisoErro: null,
        criadoEm: new Date(),
      };
      repasses.push(novo);
      return novo;
    },
    async atualizarRepasse(id, campos) {
      const r = repasses.find((x) => x.id === id);
      if (!r) return;
      if (campos.status) r.status = campos.status;
      if ("avisadoEm" in campos) r.avisadoEm = campos.avisadoEm ?? null;
      if ("avisoErro" in campos) r.avisoErro = campos.avisoErro ?? null;
      if (campos.resumo) r.resumo = campos.resumo;
    },
    async respostasDoAgenteDesde(conversaId, desde) {
      return mensagens.filter((m) => m.conversaId === conversaId && m.autor === "agente" && m.criadaEm >= desde).length;
    },
    async ajuste(chave) {
      return ajustes.get(chave) ?? null;
    },
  };

  return { repo, conversas, mensagens, repasses, ajustes };
}
