import { describe, expect, it } from "vitest";
import { validarKit } from "./fluenteData";

describe("validarKit", () => {
  it("aceita nome e e-mail preenchidos", () => {
    expect(validarKit({ nome: "Ana", email: "ana@exemplo.com" })).toEqual({});
  });

  it("aponta cada campo que falta, com o texto que aparece na tela", () => {
    const erros = validarKit({ nome: " ", email: "" });
    expect(Object.keys(erros)).toEqual(["nome", "email"]);
    expect(erros.nome).toBe("Escreva o seu nome.");
  });

  it("recusa e-mail sem @ ou sem o final", () => {
    expect(validarKit({ nome: "Ana", email: "ana.exemplo.com" }).email).toBeTruthy();
    expect(validarKit({ nome: "Ana", email: "ana@exemplo" }).email).toBeTruthy();
  });

  it("ignora espaços antes e depois do e-mail", () => {
    expect(validarKit({ nome: "Ana", email: "  ana@exemplo.com.br " })).toEqual({});
  });
});
