import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // ---------------------------------------------------------------------
  // Renderização para robôs: os assistentes de IA (GPTBot, ClaudeBot,
  // PerplexityBot, Amazonbot, CCBot...) não executam JavaScript, então a SPA
  // chegaria vazia para eles. Quando existe um snapshot da rota em
  // dist/public/__snapshots (gerado por scripts/prerender.ts no build), ele é
  // entregue a esses agentes. O conteúdo é o mesmo que a pessoa vê na tela.
  // Use ?__snapshot=1 para conferir o snapshot no navegador.
  // ---------------------------------------------------------------------
  const BOT_UA =
    /(googlebot|google-extended|bingbot|duckduckbot|baiduspider|yandex|slurp|gptbot|oai-searchbot|chatgpt-user|claudebot|claude-searchbot|claude-user|anthropic-ai|perplexitybot|perplexity-user|applebot|amazonbot|ccbot|meta-externalagent|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot|telegrambot|whatsapp)/i;

  function snapshotFor(urlPath: string): string | null {
    const clean = urlPath.replace(/\/+$/, "") || "/__home";
    if (clean.includes("..") || /\.[a-z0-9]+$/i.test(clean)) return null;
    const file = path.resolve(distPath, "__snapshots", clean.replace(/^\//, ""), "index.html");
    return fs.existsSync(file) ? file : null;
  }

  app.get("*", (req, res, next) => {
    const ua = req.get("user-agent") || "";
    const forced = req.query.__snapshot === "1";
    if (!forced && !BOT_UA.test(ua)) return next();
    const file = snapshotFor(req.path);
    if (!file) return next();
    res.set("x-rendered-for", forced ? "preview" : "bot");
    return res.sendFile(file);
  });

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
