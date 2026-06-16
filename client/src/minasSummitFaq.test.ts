import path from "node:path";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { minasSummitFaqItems, minasSummitFaqMeta, minasSummitSocialLinks } from "@/lib/minasSummitFaqData";

const projectRoot = path.resolve(import.meta.dirname, "..", "..");
const appSource = readFileSync(path.join(projectRoot, "client", "src", "App.tsx"), "utf-8");
const pageSource = readFileSync(path.join(projectRoot, "client", "src", "pages", "MinasSummitFaq.tsx"), "utf-8");
const sitemapXml = readFileSync(path.join(projectRoot, "client", "public", "sitemap.xml"), "utf-8");

describe("Página Minas Summit FAQ", () => {
  it("mantém uma rota pública curta, apropriada para uso em QR Code", () => {
    expect(minasSummitFaqMeta.slug).toBe("/minas-summit");
    expect(appSource).toContain('Route path={minasSummitFaqMeta.slug}');
    expect(sitemapXml).toContain("https://coutofalcao.com/minas-summit");
  });

  it("expõe os links principais de contato para LinkedIn e WhatsApp", () => {
    expect(minasSummitSocialLinks.linkedin).toBe("https://www.linkedin.com/in/giselle-falcao-phd/");
    expect(minasSummitSocialLinks.whatsapp).toBe("https://wa.me/qr/ZQ5MXUPDDICTL1");
    expect(pageSource).toContain("WhatsApp direto");
    expect(pageSource).toContain("Perfil no LinkedIn");
  });

  it("publica um FAQ robusto com conteúdo pós-palestra sobre IA no agro", () => {
    expect(minasSummitFaqItems.length).toBeGreaterThanOrEqual(18);
    expect(minasSummitFaqItems[0].question).toContain("IA no agro");
    expect(minasSummitFaqItems[12].question).toContain("gêmeo digital");
    expect(minasSummitFaqItems[17].answer).toContain("governança");
    expect(appSource).toContain('"@type": "FAQPage"');
    expect(appSource).toContain("minas-summit-faq-schema");
  });
});
