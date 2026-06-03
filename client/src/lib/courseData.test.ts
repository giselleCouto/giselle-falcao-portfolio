import { describe, expect, it } from "vitest";
import { courseHero, courseModules, freeModuleCount, logoAssetPath, paidPriceFormatted, pricingCard } from "./courseData";

describe("courseData", () => {
  it("mantém exatamente dois módulos gratuitos e o restante pago", () => {
    const freeModules = courseModules.filter((module) => module.free);
    const paidModules = courseModules.filter((module) => !module.free);

    expect(freeModules).toHaveLength(freeModuleCount);
    expect(freeModules.map((module) => module.id)).toEqual(["modulo-0", "modulo-1"]);
    expect(paidModules.length).toBeGreaterThan(0);
  });

  it("usa caminho da logo via storage proxy e preço formatado do desbloqueio", () => {
    expect(logoAssetPath.startsWith("/manus-storage/")).toBe(true);
    expect(paidPriceFormatted).toBe("R$ 497");
  });

  it("inclui um módulo dedicado a MCP com prática e avaliação aplicada", () => {
    const mcpModule = courseModules.find((module) => module.id === "modulo-8");

    expect(mcpModule?.title).toContain("MCP");
    expect(mcpModule?.lessons).toHaveLength(4);
    expect(mcpModule?.practice.title).toContain("MCP");
    expect(mcpModule?.evaluation?.title).toContain("MCP");
    expect(mcpModule?.evaluation?.criteria.length).toBeGreaterThanOrEqual(4);
  });

  it("reflete na comunicação comercial que a trilha agora possui nove módulos", () => {
    expect(courseHero.socialProof).toContain("9 módulos + laboratório visual");
    expect(pricingCard.features).toContain("Acesso aos módulos 2 a 8");
  });
});
