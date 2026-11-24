import { describe, expect, it } from "vitest";
import { CENARIOS, avaliar } from "./avaliacao";
import { claudeFalso, respostaDeTexto } from "./testeUtil";

describe("avaliação das respostas críticas", () => {
  it("os repasses por regra passam sem depender da IA", async () => {
    const regra = CENARIOS.filter((c) => ["Pagamento com problema", "Reembolso", "Documentos da Anhanguera", "Empresa", "Reclamação"].includes(c.nome));
    const r = await avaliar(claudeFalso([]), { cenarios: regra });
    expect(r.passaram).toBe(regra.length);
  });

  it("reprova resposta errada e aprova resposta certa", async () => {
    const certificado = CENARIOS.find((c) => c.nome === "Certificado do MBA")!;
    const errada = await avaliar(
      claudeFalso([respostaDeTexto("O MBA dá diploma do MEC."), respostaDeTexto("O MBA dá diploma do MEC.")]),
      { cenarios: [certificado] }
    );
    expect(errada.resultados[0]).toMatchObject({ passou: false });

    const certa = await avaliar(
      claudeFalso([respostaDeTexto("O certificado é emitido pela Anhanguera, instituição credenciada pelo MEC.")]),
      { cenarios: [certificado] }
    );
    expect(certa.resultados[0]).toMatchObject({ passou: true, tipo: "resposta", usouIa: true });
  });

  it("os cenários de economia passam sem chamar a IA", async () => {
    const economia = CENARIOS.filter((c) => /sem IA|não responde/.test(c.nome));
    expect(economia.length).toBeGreaterThanOrEqual(4);
    const r = await avaliar(claudeFalso([]), { cenarios: economia });
    expect(r.passaram).toBe(economia.length);
    expect(r.semIa).toBe(economia.length);
  });

  it("os preços do MBA, antes e depois de 12/12, saem certos e sem IA", async () => {
    const precos = CENARIOS.filter((c) => c.nome.startsWith("Preço do MBA"));
    const r = await avaliar(claudeFalso([]), { cenarios: precos });
    expect(r.passaram).toBe(precos.length);
    expect(r.semIa).toBe(precos.length);
  });
});
