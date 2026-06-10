import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { aboutSection, heroCopy } from "@/lib/portfolioData";

const projectRoot = path.resolve(import.meta.dirname, "..", "..");
const indexHtml = readFileSync(path.join(projectRoot, "client", "index.html"), "utf-8");
const robotsTxt = readFileSync(path.join(projectRoot, "client", "public", "robots.txt"), "utf-8");
const sitemapXml = readFileSync(path.join(projectRoot, "client", "public", "sitemap.xml"), "utf-8");

describe("SEO da rota /giselle", () => {
  it("reforça consultoria em tecnologia, inovação e IA no hero e na seção sobre", () => {
    expect(heroCopy.role.pt).toContain("Consultora de Tecnologia, Inovação e Inteligência Artificial");
    expect(heroCopy.headline.pt).toContain("Consultoria estratégica em tecnologia, inovação e IA");
    expect(aboutSection.intro.pt).toContain("consultora de tecnologia, inovação e inteligência artificial");
  });

  it("expõe metadados estáticos compatíveis com o novo posicionamento", () => {
    expect(indexHtml).toContain("Consultora de Tecnologia, Inovação e Inteligência Artificial");
    expect(indexHtml).toContain("consultoria em IA");
    expect(indexHtml).toContain("analytics");
  });

  it("publica robots.txt e sitemap.xml para indexação", () => {
    expect(robotsTxt).toContain("User-agent: *");
    expect(robotsTxt).toContain("Allow: /");
    expect(robotsTxt).toContain("Sitemap: https://coutofalcao.com/sitemap.xml");
    expect(sitemapXml).toContain("https://coutofalcao.com/giselle");
    expect(sitemapXml).toContain("https://coutofalcao.com/giselle/cursos");
  });
});
