import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cifrarDocumento, decifrarDocumento, estaCifrado, mascararDocumento, ocultarDocumentos } from "./cifraDocumento";

const guardado = { dedicada: process.env.ESTUDANTES_CHAVE_CPF, jwt: process.env.JWT_SECRET };

describe("CPF cifrado no banco", () => {
  beforeEach(() => {
    process.env.ESTUDANTES_CHAVE_CPF = "chave-dedicada-de-teste-bem-comprida";
    process.env.JWT_SECRET = "segredo-jwt-de-teste";
  });
  afterEach(() => {
    process.env.ESTUDANTES_CHAVE_CPF = guardado.dedicada;
    process.env.JWT_SECRET = guardado.jwt;
  });

  it("cifra, cabe na coluna e volta igual", () => {
    const c = cifrarDocumento("123.456.789-09")!;
    expect(c.startsWith("cpf1:")).toBe(true);
    expect(c).not.toContain("123");
    expect(c.length).toBeLessThanOrEqual(128);
    expect(decifrarDocumento(c)).toBe("123.456.789-09");
    expect(cifrarDocumento("123.456.789-09")).not.toBe(c); // IV aleatório
  });

  it("sem a chave dedicada usa a derivada do JWT_SECRET; sem nenhuma, não grava", () => {
    delete process.env.ESTUDANTES_CHAVE_CPF;
    const c = cifrarDocumento("12345678909")!;
    expect(c.startsWith("cpf0:")).toBe(true);
    expect(decifrarDocumento(c)).toBe("12345678909");
    delete process.env.JWT_SECRET;
    expect(cifrarDocumento("12345678909")).toBeNull();
  });

  it("chave errada não revela nada; valor antigo em texto aberto volta como está", () => {
    const c = cifrarDocumento("12345678909")!;
    process.env.ESTUDANTES_CHAVE_CPF = "outra-chave";
    expect(decifrarDocumento(c)).toBeNull();
    expect(decifrarDocumento("12345678909")).toBe("12345678909");
    expect(estaCifrado("12345678909")).toBe(false);
  });

  it("máscara da lista e cópia do aviso sem CPF", () => {
    expect(mascararDocumento("123.456.789-09")).toBe("•••.456.789-••");
    expect(mascararDocumento(null)).toBeNull();
    const aviso = { client: { name: "Maria", document: "123.456.789-09" }, lead: [{ cpf: 12345678909 }], sale: { id: 1 } };
    const limpo = ocultarDocumentos(aviso);
    expect(JSON.stringify(limpo)).not.toMatch(/123\.?456\.?789-?09/);
    expect(limpo).toEqual({ client: { name: "Maria", document: "•••.456.789-••" }, lead: [{ cpf: "•••.456.789-••" }], sale: { id: 1 } });
  });
});
