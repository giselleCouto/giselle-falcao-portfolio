import { describe, expect, it } from "vitest";
import { courseModules, freeModuleCount, logoAssetPath, paidPriceFormatted } from "./courseData";

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
});
