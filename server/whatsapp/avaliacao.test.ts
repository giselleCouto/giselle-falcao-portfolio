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
    const [mbaAntes, mbaDepois] = CENARIOS;
    const errada = await avaliar(claudeFalso([respostaDeTexto("O MBA custa R$ 9.000."), respostaDeTexto("O MBA custa R$ 9.000.")]), {
      cenarios: [mbaAntes],
    });
    expect(errada.resultados[0]).toMatchObject({ passou: false });
    expect(errada.resultados[0].problemas.join(" ")).toMatch(/6\.200/);

    const certa = await avaliar(claudeFalso([respostaDeTexto("O MBA custa R$ 9.000 à vista ou 12× de R$ 900,01.")]), {
      cenarios: [mbaDepois],
    });
    expect(certa.resultados[0]).toMatchObject({ passou: true, tipo: "resposta" });
  });
});
