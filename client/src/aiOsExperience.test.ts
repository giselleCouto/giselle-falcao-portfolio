import path from "node:path";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "..", "..");
const appSource = readFileSync(path.join(projectRoot, "client", "src", "App.tsx"), "utf-8");
const pageSource = readFileSync(path.join(projectRoot, "client", "src", "pages", "AiOsExperience.tsx"), "utf-8");

describe("Rota experimental AI/OS", () => {
  it("registra uma rota pública dedicada para a proposta visual", () => {
    expect(appSource).toContain('Route path="/ai-os"');
    expect(appSource).toContain("AI/OS Interface Prototype | Couto Falcão");
  });

  it("implementa o hero com linguagem AI/OS e foco em decisão, dados e engenharia", () => {
    expect(pageSource).toContain("Sistema operacional moderno de IA");
    expect(pageSource).toContain("IA, dados e engenharia para decisões em camadas.");
    expect(pageSource).toContain("Geometria de precisão.");
  });

  it("usa GSAP e React Three Fiber na estrutura inicial do protótipo", () => {
    expect(pageSource).toContain('from "gsap"');
    expect(pageSource).toContain('from "@react-three/fiber"');
    expect(pageSource).toContain("ScrollTrigger");
    expect(pageSource).toContain("<Canvas");
  });
});
