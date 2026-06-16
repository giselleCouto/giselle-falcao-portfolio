import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  aboutSection,
  authorityProofs,
  caseStudies,
  consultingSectors,
  consultingServices,
  editorialPositioning,
  editorialSeries,
  faqItems,
  heroCopy,
  insightArticles,
} from "@/lib/portfolioData";

const projectRoot = path.resolve(import.meta.dirname, "..", "..");
const indexHtml = readFileSync(path.join(projectRoot, "client", "index.html"), "utf-8");
const robotsTxt = readFileSync(path.join(projectRoot, "client", "public", "robots.txt"), "utf-8");
const sitemapXml = readFileSync(path.join(projectRoot, "client", "public", "sitemap.xml"), "utf-8");
const appSource = readFileSync(path.join(projectRoot, "client", "src", "App.tsx"), "utf-8");
const portfolioSiteSource = readFileSync(path.join(projectRoot, "client", "src", "components", "PortfolioSite.tsx"), "utf-8");

describe("SEO da rota /giselle", () => {
  it("simplifica o topo com a nova proposta de valor e posicionamento central", () => {
    expect(heroCopy.headline.pt).toBe("IA aplicada, modelagem matemática e ciência de dados para decisões complexas.");
    expect(heroCopy.subheadline.pt).toContain("Pesquisadora e consultora PhD");
    expect(heroCopy.role.pt).toContain("IA aplicada");
    expect(aboutSection.intro.pt).toContain("interseção entre IA aplicada, modelagem matemática e ciência de dados");
  });

  it("destaca provas de autoridade logo no início com sinais verificáveis", () => {
    expect(authorityProofs.length).toBeGreaterThanOrEqual(8);
    expect(authorityProofs.map((item) => item.title.pt)).toEqual(
      expect.arrayContaining([
        "PhD e formação",
        "Google Scholar",
        "Lattes",
        "Artigos com DOI",
        "Cases com impacto",
        "GitHub",
        "Medium",
        "Palestras e aulas",
      ]),
    );
    expect(portfolioSiteSource).toContain('section id="provas"');
  });

  it("expõe uma seção de consultoria com ofertas e setores-alvo coerentes", () => {
    expect(consultingServices).toHaveLength(4);
    expect(consultingServices[0].title.pt).toContain("Inteligência Artificial");
    expect(consultingServices[2].title.pt).toContain("Modelagem matemática");
    expect(consultingSectors.pt).toContain("Indústria");
    expect(consultingSectors.pt).toContain("Educação");
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

  it("estrutura a linha editorial pública com séries coerentes e insights recorrentes", () => {
    expect(editorialPositioning.title.pt).toBe("IA aplicada com rigor matemático para decisões complexas.");
    expect(editorialSeries).toHaveLength(6);
    expect(editorialSeries.map((item) => item.title.pt)).toEqual(
      expect.arrayContaining([
        "Matemática que vira decisão",
        "IA aplicada sem espuma",
        "Modelos matemáticos para problemas reais",
        "Educação, dados e recomposição da aprendizagem",
        "Logística, otimização e inteligência operacional",
        "Como avaliar modelos de IA com rigor",
      ]),
    );
    expect(insightArticles).toHaveLength(6);
    expect(insightArticles[0].title.pt).toContain("Matemática que vira decisão");
    expect(portfolioSiteSource).toContain('section id="insights"');
    expect(appSource).toContain("giselle-insights-schema");
    expect(appSource).toContain('"@type": "Article"');
  });

  it("expõe metadados estáticos compatíveis com o novo posicionamento", () => {
    expect(indexHtml).toContain("IA Aplicada, Modelagem Matemática e Ciência de Dados");
    expect(indexHtml).toContain("decisões complexas");
    expect(indexHtml).toContain("Pesquisadora e consultora PhD");
  });

  it("publica robots.txt e sitemap.xml para indexação", () => {
    expect(robotsTxt).toContain("User-agent: *");
    expect(robotsTxt).toContain("Allow: /");
    expect(robotsTxt).toContain("Sitemap: https://coutofalcao.com/sitemap.xml");
    expect(sitemapXml).toContain("https://coutofalcao.com/giselle");
    expect(sitemapXml).toContain("https://coutofalcao.com/giselle/cursos");
  });
});
