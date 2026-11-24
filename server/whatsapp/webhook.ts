// Rotas do WhatsApp no servidor do site:
// - GET  /api/whatsapp/webhook/<token>  verificação da Meta (hub.challenge)
// - POST /api/whatsapp/webhook/<token>  avisos da WhatsApp Cloud API
// - GET  /api/whatsapp/saude            o que está configurado (só sim/não, sem segredo)
//
// Autenticação: o <token> da URL (WHATSAPP_WEBHOOK_TOKEN no Railway) e, na
// Meta, a assinatura X-Hub-Signature-256 com o App Secret (WHATSAPP_APP_SECRET).
// A 360dialog não assina os avisos, então lá vale só o token da URL.
//
// Registrado antes do express.json(): a assinatura é conferida sobre o corpo cru.

import { createHash, timingSafeEqual } from "crypto";
import express, { type Express, type Request, type Response } from "express";
import { clienteClaudePadrao } from "./agente";
import { configAtendimento, criarAtendimento, type Atendimento } from "./atendimento";
import { assinaturaValida, configWhatsApp } from "./cloudApi";

/**
 * A senha nunca tem espaço: o que vier depois do primeiro espaço ou quebra de
 * linha é lixo de cópia (ex.: a linha "PS C:\..." do PowerShell colada junto
 * no Railway) e é descartado dos dois lados antes de comparar.
 */
export function limparToken(v: string | undefined | null): string {
  return String(v ?? "").trim().split(/\s+/)[0] ?? "";
}

export function tokenConfere(recebido: string, esperado: string | undefined) {
  const certo = limparToken(esperado);
  if (!certo) return false;
  const ok = timingSafeEqual(
    createHash("sha256").update(limparToken(recebido)).digest(),
    createHash("sha256").update(certo).digest()
  );
  if (!ok) {
    // só os tamanhos, nunca os valores
    console.warn(
      `[WhatsApp] senha do webhook não confere (recebida com ${limparToken(recebido).length} caracteres; a do Railway tem ${certo.length}, ${String(esperado ?? "").length} antes de limpar)`
    );
  }
  return ok;
}

let atendimento: Atendimento | null = null;

export async function obterAtendimento(): Promise<Atendimento> {
  if (atendimento) return atendimento;
  const { repositorioMySql } = await import("./whatsappDb");
  atendimento = criarAtendimento({
    repo: repositorioMySql,
    claude: clienteClaudePadrao(),
    whatsapp: configWhatsApp(),
    config: configAtendimento(),
  });
  return atendimento;
}

export function estadoDaConfiguracao(env: NodeJS.ProcessEnv = process.env) {
  const wa = configWhatsApp(env);
  const cfg = configAtendimento(env);
  return {
    agenteLigado: cfg.ligado,
    claude: Boolean(env.ANTHROPIC_API_KEY),
    whatsapp: Boolean(wa),
    provedor: wa?.provedor ?? null,
    webhook: Boolean(env.WHATSAPP_WEBHOOK_TOKEN),
    assinaturaMeta: Boolean(env.WHATSAPP_APP_SECRET),
    avisoParaGiselle: Boolean(cfg.avisoPara),
    modeloDeAviso: Boolean(cfg.modeloAviso),
  };
}

type Opcoes = { obter?: () => Promise<Pick<Atendimento, "receberAviso">>; env?: NodeJS.ProcessEnv };

export function registerWhatsAppWebhook(app: Express, opcoes: Opcoes = {}) {
  const env = opcoes.env ?? process.env;
  const obter = opcoes.obter ?? obterAtendimento;

  app.get("/api/whatsapp/saude", (_req, res) => {
    res.json({ ok: true, configurado: estadoDaConfiguracao(env) });
  });

  // Verificação do webhook no painel da Meta (Verify token = o mesmo WHATSAPP_WEBHOOK_TOKEN).
  app.get("/api/whatsapp/webhook/:token", (req: Request, res: Response) => {
    const esperado = env.WHATSAPP_WEBHOOK_TOKEN;
    if (!tokenConfere(String(req.params.token ?? ""), esperado)) {
      res.sendStatus(401);
      return;
    }
    const modo = req.query["hub.mode"];
    const verificacao = String(req.query["hub.verify_token"] ?? "");
    const desafio = req.query["hub.challenge"];
    if (modo === "subscribe" && tokenConfere(verificacao, esperado) && typeof desafio === "string") {
      res.status(200).type("text/plain").send(desafio);
      return;
    }
    res.json({ ok: true });
  });

  app.post(
    "/api/whatsapp/webhook/:token",
    express.raw({ type: "*/*", limit: "3mb" }),
    async (req: Request, res: Response) => {
      if (!env.WHATSAPP_WEBHOOK_TOKEN) {
        res.status(503).json({ ok: false, erro: "webhook não configurado" });
        return;
      }
      if (!tokenConfere(String(req.params.token ?? ""), env.WHATSAPP_WEBHOOK_TOKEN)) {
        res.sendStatus(401);
        return;
      }
      const bruto: Buffer = Buffer.isBuffer(req.body) ? req.body : Buffer.from(String(req.body ?? ""));
      const assinadoPelaMeta = env.WHATSAPP_PROVEDOR !== "360dialog" && Boolean(env.WHATSAPP_APP_SECRET);
      if (assinadoPelaMeta && !assinaturaValida(bruto, req.get("x-hub-signature-256"), env.WHATSAPP_APP_SECRET!)) {
        res.sendStatus(401);
        return;
      }
      let corpo: unknown;
      try {
        corpo = JSON.parse(bruto.toString("utf8") || "{}");
      } catch {
        res.status(400).json({ ok: false });
        return;
      }
      // Responde já: a Meta reenvia o aviso se a resposta demorar. A resposta à
      // pessoa sai depois, e avisos repetidos são descartados pelo id da mensagem.
      res.sendStatus(200);
      try {
        const a = await obter();
        await a.receberAviso(corpo);
      } catch (erro) {
        console.error("[WhatsApp] falha ao tratar aviso:", erro);
      }
    }
  );
}
