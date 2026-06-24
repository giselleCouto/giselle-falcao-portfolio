import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("/solucoes/curral", (_req, res) => res.redirect("https://curral-demo-mq88jbar.manus.space"));
  app.get("/solucoes/sensormonit", (_req, res) => res.redirect("https://sensormonit-ipqnpabh.manus.space"));
  app.get("/solucoes/eucasmart", (_req, res) => res.redirect("https://eucasmart-wwnth7mf.manus.space"));
  app.get("/solucoes/greensenti", (_req, res) => res.redirect("https://greensenti-wehhdk6t.manus.space"));
  app.get("/solucoes/pharo", (_req, res) => res.redirect("https://pharo-production.up.railway.app/"));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
