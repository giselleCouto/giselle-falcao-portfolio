import { describe, expect, it } from "vitest";
import { doDadoAoValor } from "./doDadoAoValorData";
import { fluenteCompleto } from "./fluenteCompletoData";
import { mba } from "./mbaData";
import { getNivel } from "./ninguemNasceFluenteData";
import {
  LINHA_CONFIANCA,
  ROTULO_INSCRICAO,
  ROTULO_WHATSAPP,
  checkoutUrl,
  precoAtual,
  whatsappUrl,
} from "./turma01Data";

const brasilia = (iso: string) => new Date(`${iso}-03:00`).getTime();
const ULTIMO_MINUTO = brasilia("2026-12-12T23:59:59");
const VIRADA = brasilia("2026-12-13T00:00:00");

/** Todos os textos de um objeto de dados, em uma lista só */
function textos(valor: unknown): string[] {
  if (typeof valor === "string") return [valor];
  if (Array.isArray(valor)) return valor.flatMap(textos);
  if (valor && typeof valor === "object") return Object.values(valor).flatMap(textos);
  return [];
}

describe("Primeira tela das páginas de venda (quem chega do anúncio)", () => {
  it("usa os rótulos combinados nos botões", () => {
    expect(ROTULO_INSCRICAO).toBe("Fazer minha inscrição");
    expect(ROTULO_WHATSAPP).toBe("Tirar dúvida no WhatsApp");
  });

  it("leva ao checkout de cada curso com ch_id, cupom e a origem da rota até 12/12/2026", () => {
    const esperado = {
      fluente: ["/17873", "3073", "FLUENTE105"],
      extensao: ["/17781", "3072", "DADO750"],
      mba: ["/17779", "3071", "MBA2800"],
    } as const;
    for (const id of ["fluente", "extensao", "mba"] as const) {
      const [caminho, chId, cupom] = esperado[id];
      const antes = new URL(checkoutUrl(id, "instagram", ULTIMO_MINUTO)!);
      expect(antes.origin).toBe("https://pay.voompcreators.com.br");
      expect(antes.pathname).toBe(caminho);
      expect(antes.searchParams.get("ch_id")).toBe(chId);
      expect(antes.searchParams.get("cupom")).toBe(cupom);
      expect(antes.searchParams.get("utm_source")).toBe("instagram");

      const depois = new URL(checkoutUrl(id, "instagram", VIRADA)!);
      expect(depois.searchParams.get("ch_id")).toBe(chId);
      expect(depois.searchParams.has("cupom")).toBe(false);
    }
  });

  it("troca o preço da primeira tela sozinha à meia-noite de 13/12/2026 (Brasília)", () => {
    expect(precoAtual(fluenteCompleto.precos, ULTIMO_MINUTO)).toMatchObject({ avista: "R$ 245", parcelado: "12× de R$ 24,50", valor: 245 });
    expect(precoAtual(fluenteCompleto.precos, VIRADA)).toMatchObject({ avista: "R$ 350", parcelado: "12× de R$ 35,00", valor: 350 });
    expect(precoAtual(doDadoAoValor.precos, ULTIMO_MINUTO).avista).toBe("R$ 1.750");
    expect(precoAtual(doDadoAoValor.precos, VIRADA).avista).toBe("R$ 2.500");
    expect(precoAtual(mba.precos, ULTIMO_MINUTO).avista).toBe("R$ 6.200");
    expect(precoAtual(mba.precos, VIRADA).avista).toBe("R$ 9.000");
  });

  it("o Fluente em IA completo usa os mesmos valores do nível 1 da /nivel", () => {
    const nivel1 = getNivel(1);
    expect(fluenteCompleto.nome).toBe(nivel1.curso);
    expect(fluenteCompleto.precos.primeiraTurma).toMatchObject(nivel1.precos.primeiraTurma);
    expect(fluenteCompleto.precos.regular).toMatchObject(nivel1.precos.regular);
  });

  it("abre o WhatsApp das dúvidas com a mensagem pronta", () => {
    const url = new URL(whatsappUrl("Olá, Giselle!"));
    expect(url.origin + url.pathname).toBe("https://wa.me/5531982280551");
    expect(url.searchParams.get("text")).toBe("Olá, Giselle!");
  });
});

describe("Regras de texto da primeira tela", () => {
  it("linha de confiança: garantia só no Fluente; Anhanguera e MEC só na extensão e no MBA", () => {
    expect(LINHA_CONFIANCA.fluente).toBe(
      "7 dias de garantia · certificado de conclusão emitido pela NOKAHI EDU · pagamento pela Voomp",
    );
    for (const id of ["extensao", "mba"] as const) {
      expect(LINHA_CONFIANCA[id]).toBe(
        "Certificado emitido pela Anhanguera, instituição credenciada pelo MEC · pagamento pela Voomp",
      );
      // A Giselle ainda não confirmou a garantia da extensão e do MBA
      expect(LINHA_CONFIANCA[id].toLowerCase()).not.toContain("garantia");
    }
    expect(LINHA_CONFIANCA.fluente).not.toMatch(/MEC|Anhanguera/);
  });

  it("nunca “diploma”, “reconhecido pelo MEC”, “doutora” nem pressão nos textos novos", () => {
    const novos = [
      ...Object.values(LINHA_CONFIANCA),
      mba.promessa,
      mba.emResumo,
      doDadoAoValor.promessa,
      doDadoAoValor.emResumo,
      ...textos(fluenteCompleto),
    ];
    for (const t of novos) {
      expect(t).not.toMatch(/diploma/i);
      expect(t).not.toMatch(/reconhecid[oa] pelo MEC/i);
      expect(t).not.toMatch(/\bdoutora\b|\bDra\./i);
      expect(t).not.toMatch(/\bcorr[ae]\b|últimas vagas|só hoje|vagas limitadas/i);
    }
    expect(fluenteCompleto.autora.resumo).toContain("Mestre e doutoranda");
  });

  it("a extensão nunca é “pós”, “especialização” nem “MBA de 40 horas”", () => {
    for (const t of [doDadoAoValor.promessa, doDadoAoValor.emResumo, doDadoAoValor.selo]) {
      expect(t).not.toMatch(/\bpós\b|especializa|MBA/i);
    }
  });

  it("o curso livre não cita a Anhanguera, e o MEC só aparece na nota legal de curso livre", () => {
    const { notaLegal, ...resto } = fluenteCompleto;
    for (const t of textos(resto)) expect(t).not.toMatch(/MEC|Anhanguera/);
    expect(notaLegal).toContain("não sujeito a autorização do MEC");
    expect(fluenteCompleto.certificado.toLowerCase()).toContain("certificado de conclusão de curso livre");
  });
});
