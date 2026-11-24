import { createHmac } from "crypto";
import { readFileSync } from "fs";
import type { AddressInfo } from "net";
import path from "path";
import express from "express";
import { afterEach, describe, expect, it } from "vitest";
import { assinaturaValida, configWhatsApp, lerAviso, limparParametro } from "./cloudApi";
import { registerWhatsAppWebhook } from "./webhook";
import { DDL_WHATSAPP } from "./whatsappDb";
import { avisoDeEco, avisoDeMensagem, avisoDeStatus } from "./testeUtil";

const TOKEN = "token-de-teste-123";
const SEGREDO = "app-secret-de-teste";

let fechar: (() => void) | null = null;
afterEach(() => {
  fechar?.();
  fechar = null;
});

async function subir(env: NodeJS.ProcessEnv) {
  const recebidos: unknown[] = [];
  const app = express();
  registerWhatsAppWebhook(app, { env, obter: async () => ({ receberAviso: async (c: unknown) => void recebidos.push(c) }) });
  app.use(express.json()); // como no servidor real: depois do webhook
  const servidor = app.listen(0);
  await new Promise((r) => servidor.once("listening", r));
  fechar = () => servidor.close();
  const base = `http://127.0.0.1:${(servidor.address() as AddressInfo).port}`;
  return { base, recebidos };
}

const assinar = (corpo: string) => `sha256=${createHmac("sha256", SEGREDO).update(corpo).digest("hex")}`;

describe("rotas do webhook do WhatsApp", () => {
  it("responde a verificação da Meta só com o token certo", async () => {
    const { base } = await subir({ WHATSAPP_WEBHOOK_TOKEN: TOKEN });
    const ok = await fetch(`${base}/api/whatsapp/webhook/${TOKEN}?hub.mode=subscribe&hub.verify_token=${TOKEN}&hub.challenge=4242`);
    expect(ok.status).toBe(200);
    expect(await ok.text()).toBe("4242");
    expect((await fetch(`${base}/api/whatsapp/webhook/errado?hub.mode=subscribe&hub.verify_token=${TOKEN}&hub.challenge=1`)).status).toBe(401);
  });

  it("aceita aviso assinado pela Meta e recusa assinatura errada", async () => {
    const { base, recebidos } = await subir({ WHATSAPP_WEBHOOK_TOKEN: TOKEN, WHATSAPP_APP_SECRET: SEGREDO });
    const corpo = JSON.stringify(avisoDeMensagem("5531999990000", "Oi"));
    const certo = await fetch(`${base}/api/whatsapp/webhook/${TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Hub-Signature-256": assinar(corpo) },
      body: corpo,
    });
    expect(certo.status).toBe(200);
    await new Promise((r) => setTimeout(r, 20));
    expect(recebidos).toHaveLength(1);

    const errado = await fetch(`${base}/api/whatsapp/webhook/${TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Hub-Signature-256": assinar(corpo + " ") },
      body: corpo,
    });
    expect(errado.status).toBe(401);
    const semToken = await fetch(`${base}/api/whatsapp/webhook/outro`, { method: "POST", body: corpo });
    expect(semToken.status).toBe(401);
  });

  it("sem App Secret (360dialog), vale só o token da URL", async () => {
    const { base, recebidos } = await subir({ WHATSAPP_WEBHOOK_TOKEN: TOKEN });
    const r = await fetch(`${base}/api/whatsapp/webhook/${TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(avisoDeMensagem("5531999990000", "Oi")),
    });
    expect(r.status).toBe(200);
    await new Promise((r2) => setTimeout(r2, 20));
    expect(recebidos).toHaveLength(1);
  });

  it("na 360dialog, um App Secret esquecido no Railway não bloqueia os avisos", async () => {
    const { base, recebidos } = await subir({ WHATSAPP_WEBHOOK_TOKEN: TOKEN, WHATSAPP_APP_SECRET: SEGREDO, WHATSAPP_PROVEDOR: "360dialog" });
    const r = await fetch(`${base}/api/whatsapp/webhook/${TOKEN}`, { method: "POST", body: JSON.stringify(avisoDeMensagem("55", "Oi")) });
    expect(r.status).toBe(200);
    await new Promise((r2) => setTimeout(r2, 20));
    expect(recebidos).toHaveLength(1);
  });

  it("ignora espaço, quebra de linha e lixo de cópia na senha salva no Railway", async () => {
    const { base } = await subir({ WHATSAPP_WEBHOOK_TOKEN: ` ${TOKEN}\r\nPS C:\\WINDOWS\\System32> ` });
    const ok = await fetch(`${base}/api/whatsapp/webhook/${TOKEN}?hub.mode=subscribe&hub.verify_token=${TOKEN}&hub.challenge=77`);
    expect(ok.status).toBe(200);
    expect(await ok.text()).toBe("77");
    expect((await fetch(`${base}/api/whatsapp/webhook/${TOKEN}x?hub.mode=subscribe&hub.verify_token=${TOKEN}&hub.challenge=1`)).status).toBe(401);
  });

  it("sem token configurado, o webhook fica fechado", async () => {
    const { base } = await subir({});
    expect((await fetch(`${base}/api/whatsapp/webhook/qualquer`, { method: "POST", body: "{}" })).status).toBe(503);
  });

  it("a rota de saúde mostra só sim/não, sem segredo", async () => {
    const { base } = await subir({ WHATSAPP_WEBHOOK_TOKEN: TOKEN, WHATSAPP_TOKEN: "segredo", WHATSAPP_PHONE_NUMBER_ID: "1", ANTHROPIC_API_KEY: "sk" });
    const texto = await (await fetch(`${base}/api/whatsapp/saude`)).text();
    expect(JSON.parse(texto).configurado).toMatchObject({ claude: true, whatsapp: true, provedor: "meta", webhook: true, agenteLigado: false });
    expect(texto).not.toContain("segredo");
    expect(texto).not.toContain(TOKEN);
  });
});

describe("leitura dos avisos da WhatsApp Cloud API", () => {
  it("mensagem de texto, eco da Giselle e status", () => {
    const m = lerAviso(avisoDeMensagem("5531999990000", "Quanto custa?", { nome: "Bia", id: "wamid.X" }));
    expect(m.mensagens).toEqual([
      expect.objectContaining({ waId: "5531999990000", nome: "Bia", waMessageId: "wamid.X", tipo: "text", texto: "Quanto custa?", semTexto: false }),
    ]);
    const e = lerAviso(avisoDeEco("5531999990000", "Oi, sou a Giselle", "wamid.E"));
    expect(e.ecos).toEqual([expect.objectContaining({ waId: "5531999990000", waMessageId: "wamid.E", texto: "Oi, sou a Giselle" })]);
    expect(e.mensagens).toHaveLength(0);
    const s = lerAviso(avisoDeStatus("wamid.S", "delivered"));
    expect(s.status).toEqual([{ waMessageId: "wamid.S", status: "delivered", waId: "5531999990000", erro: null }]);
  });

  it("botão, lista, imagem com legenda e reação", () => {
    const aviso = (mensagem: Record<string, unknown>) => ({
      entry: [{ changes: [{ field: "messages", value: { contacts: [], messages: [{ from: "55", id: `w${Math.random()}`, ...mensagem }] } }] }],
    });
    expect(lerAviso(aviso({ type: "interactive", interactive: { button_reply: { title: "Quero o MBA" } } })).mensagens[0].texto).toBe("Quero o MBA");
    expect(lerAviso(aviso({ type: "image", image: { caption: "deu erro" } })).mensagens[0]).toMatchObject({ texto: "[imagem] deu erro", semTexto: false });
    expect(lerAviso(aviso({ type: "sticker", sticker: {} })).mensagens[0]).toMatchObject({ texto: "[figurinha]", semTexto: true });
    expect(lerAviso(aviso({ type: "reaction", reaction: { emoji: "👍" } })).mensagens).toHaveLength(0);
    expect(lerAviso({ entry: [{ changes: [{ field: "history", value: {} }] }] })).toEqual({ mensagens: [], ecos: [], status: [] });
    expect(lerAviso("lixo")).toEqual({ mensagens: [], ecos: [], status: [] });
  });

  it("assinatura, parâmetros de modelo e configuração", () => {
    const corpo = Buffer.from('{"a":1}');
    expect(assinaturaValida(corpo, assinar('{"a":1}'), SEGREDO)).toBe(true);
    expect(assinaturaValida(corpo, "sha256=00", SEGREDO)).toBe(false);
    expect(assinaturaValida(corpo, undefined, SEGREDO)).toBe(false);
    expect(limparParametro("linha 1\nlinha 2\t     fim")).toBe("linha 1 linha 2   fim");
    expect(configWhatsApp({ WHATSAPP_TOKEN: "t" })).toBeNull(); // Meta sem phone number id
    expect(configWhatsApp({ WHATSAPP_TOKEN: "t", WHATSAPP_PROVEDOR: "360dialog" })).toMatchObject({ provedor: "360dialog" });
  });
});

describe("tabelas do atendimento", () => {
  it("o servidor cria as tabelas com o mesmo SQL da migração 0019", () => {
    const migracao = readFileSync(path.resolve(import.meta.dirname, "../../drizzle/0019_large_gorgon.sql"), "utf-8")
      .split("--> statement-breakpoint")
      .map((c) => c.trim());
    expect(DDL_WHATSAPP.map((c) => c.trim())).toEqual(migracao);
    expect(DDL_WHATSAPP.every((c) => c.startsWith("CREATE TABLE IF NOT EXISTS"))).toBe(true);
  });
});
