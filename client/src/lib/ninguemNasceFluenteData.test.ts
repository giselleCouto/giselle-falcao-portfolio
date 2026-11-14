import { describe, expect, it } from "vitest";
import {
  faqCondicao,
  getNivel,
  inscricaoUrl,
  inscricoesAbertas,
  nivelPeloPlacar,
  niveis,
  nnf,
  pendencias,
  precoAtual,
  teste,
} from "./ninguemNasceFluenteData";

const brasilia = (iso: string) => new Date(`${iso}-03:00`).getTime();

describe("Ninguém nasce fluente: dados do lançamento", () => {
  it("troca o preço sozinha à meia-noite de 13/12/2026 (Brasília)", () => {
    const ultimoMinuto = brasilia("2026-12-12T23:59:59");
    const virada = brasilia("2026-12-13T00:00:00");
    expect(niveis.map((n) => precoAtual(n, ultimoMinuto).avista)).toEqual(["R$ 245", "R$ 1.750", "R$ 6.200"]);
    expect(niveis.map((n) => precoAtual(n, ultimoMinuto).parcelado)).toEqual([
      "12× de R$ 21,30",
      "12× de R$ 152,10",
      "12× de R$ 521,00",
    ]);
    expect(niveis.map((n) => precoAtual(n, virada).avista)).toEqual(["R$ 350", "R$ 2.500", "R$ 9.000"]);
    expect(niveis.map((n) => precoAtual(n, virada).parcelado)).toEqual([
      "12× de R$ 30,45",
      "12× de R$ 217,10",
      "12× de R$ 781,50",
    ]);
    expect(faqCondicao(ultimoMinuto).a).toContain("Até 12/12/2026");
    expect(faqCondicao(virada).a).toContain("terminou");
  });

  it("leva o cupom FLUENTE105 ao checkout 17873 só até 12/12/2026", () => {
    const antes = new URL(inscricaoUrl(1, { agora: brasilia("2026-12-12T23:59:59"), origem: "instagram" })!);
    expect(antes.origin + antes.pathname).toBe("https://pay.voompcreators.com.br/17873");
    expect(antes.searchParams.get("cupom")).toBe("FLUENTE105");
    expect(antes.searchParams.get("utm_source")).toBe("instagram");
    expect(antes.searchParams.get("utm_campaign")).toBe("ninguem-nasce-fluente");

    const depois = new URL(inscricaoUrl(1, { agora: brasilia("2026-12-13T00:00:00") })!);
    expect(depois.searchParams.has("cupom")).toBe(false);
    expect(depois.searchParams.has("utm_source")).toBe(false);
  });

  it("usa os mesmos checkouts e cupons das páginas da extensão e do MBA", () => {
    const agora = brasilia("2026-11-20T12:00:00");
    const extensao = new URL(inscricaoUrl(2, { agora })!);
    const mba = new URL(inscricaoUrl(3, { agora })!);
    expect(extensao.pathname).toBe("/17781");
    expect(extensao.searchParams.get("cupom")).toBe("DADO750");
    expect(mba.pathname).toBe("/17779");
    expect(mba.searchParams.get("cupom")).toBe("MBA2800");
    expect(pendencias()).toEqual([]);
  });

  it("fecha as inscrições depois de 22/01/2027", () => {
    expect(inscricoesAbertas(brasilia("2027-01-22T23:59:00"))).toBe(true);
    expect(inscricoesAbertas(brasilia("2027-01-23T00:00:00"))).toBe(false);
  });

  it("placar 0–1 = nível 1, 2–3 = nível 2, 4–5 = nível 3", () => {
    expect([0, 1, 2, 3, 4, 5].map(nivelPeloPlacar)).toEqual([1, 1, 2, 2, 3, 3]);
    expect(teste.perguntas).toHaveLength(5);
  });

  it("segue as regras de texto do certificado e da extensão", () => {
    const tudo = JSON.stringify({ niveis, nnf, teste }).toLowerCase();
    expect(tudo).not.toContain("diploma");
    expect(tudo).not.toContain("reconhecido pelo mec");

    for (const n of niveis.slice(1)) {
      expect(n.certificado).toContain("emitido pela Anhanguera, instituição credenciada pelo MEC");
    }
    expect(getNivel(1).certificado.toLowerCase()).toContain("certificado de conclusão de curso livre");

    const extensao = JSON.stringify(getNivel(2)).toLowerCase();
    expect(extensao).not.toMatch(/\bpós\b|especializa|mba/);
    expect(extensao).toContain("sem exigência de graduação");
    expect(getNivel(3).paraQuem).toContain("graduação concluída");
  });
});
