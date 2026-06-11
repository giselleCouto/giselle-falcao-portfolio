import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { aboutSection, caseStudies, consultingSectors, consultingServices, faqItems, heroCopy, insightArticles } from "@/lib/portfolioData";

const projectRoot = path.resolve(import.meta.dirname, "..", "..");
const indexHtml = readFileSync(path.join(projectRoot, "client", "index.html"), "utf-8");
const robotsTxt = readFileSync(path.join(projectRoot, "client", "public", "robots.txt"), "utf-8");
const sitemapXml = readFileSync(path.join(projectRoot, "client", "public", "sitemap.xml"), "utf-8");
const appSource = readFileSync(path.join(projectRoot, "client", "src", "App.tsx"), "utf-8");
const portfolioSiteSource = readFileSync(path.join(projectRoot, "client", "src", "components", "PortfolioSite.tsx"), "utf-8");

describe("SEO da rota /giselle", () => {
  it("reforça consultoria em tecnologia, inovação e IA no hero e na seção sobre", () => {
    expect(heroCopy.role.pt).toContain("Consultora de Tecnologia, Inovação e Inteligência Artificial");
    expect(heroCopy.headline.pt).toContain("Consultoria estratégica em tecnologia, inovação e IA");
    expect(aboutSection.intro.pt).toContain("consultora de tecnologia, inovação e inteligência artificial");
  });

  it("expõe uma seção de consultoria com ofertas e setores-alvo coerentes", () => {
    expect(consultingServices).toHaveLength(4);
    expect(consultingServices[0].title.pt).toContain("Inteligência Artificial");
    expect(consultingServices[1].title.pt).toContain("indústria, logística e supply chain");
    expect(consultingSectors.pt).toContain("Indústria");
    expect(consultingSectors.pt).toContain("Logística");
  });

  it("publica cases com métricas, setores e provas de resultado", () => {
    expect(caseStudies).toHaveLength(3);
    expect(caseStudies[0].metric.pt).toContain("R$ 8 milhões/ano");
    expect(caseStudies[0].sector.pt).toContain("Logística");
    expect(caseStudies[0].proof.pt).toContain("produção");
    expect(portfolioSiteSource).toContain('section id="cases"');
    expect(appSource).toContain("giselle-case-studies-schema");
  });

  it("mantém FAQs semânticas e schema FAQPage para buscadores e sistemas de IA", () => {
    expect(faqItems.length).toBeGreaterThanOrEqual(4);
    expect(faqItems[0].question.pt).toContain("Que tipo de consultoria");
    expect(faqItems[0].answer.pt).toContain("consultoria estratégica em tecnologia, inovação e inteligência artificial");
    expect(appSource).toContain('"@type": "FAQPage"');
    expect(appSource).toContain("giselle-faq-schema");
  });

  it("expõe um bloco editorial recorrente de insights com schema semântico", () => {
    expect(insightArticles).toHaveLength(3);
    expect(insightArticles[0].title.pt).toContain("IA aplicada");
    expect(insightArticles[1].category.pt).toContain("Inovação");
    expect(portfolioSiteSource).toContain('section id="insights"');
    expect(appSource).toContain("giselle-insights-schema");
    expect(appSource).toContain('"@type": "Article"');
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
