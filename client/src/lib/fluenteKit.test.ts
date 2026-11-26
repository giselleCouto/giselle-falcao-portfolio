import { describe, expect, it } from "vitest";
import { validarKit } from "./fluenteData";

describe("validarKit", () => {
  it("aceita nome, e-mail e autorização preenchidos", () => {
    expect(validarKit({ nome: "Ana", email: "ana@exemplo.com", consent: true })).toEqual({});
  });

  it("aponta cada campo que falta, com o texto que aparece na tela", () => {
    const erros = validarKit({ nome: " ", email: "", consent: false });
    expect(Object.keys(erros)).toEqual(["nome", "email", "consent"]);
    expect(erros.consent).toBe("Marque a autorização para liberar o kit.");
  });

  it("recusa e-mail sem @ ou sem o final", () => {
    expect(validarKit({ nome: "Ana", email: "ana.exemplo.com", consent: true }).email).toBeTruthy();
    expect(validarKit({ nome: "Ana", email: "ana@exemplo", consent: true }).email).toBeTruthy();
  });

  it("ignora espaços antes e depois do e-mail", () => {
    expect(validarKit({ nome: "Ana", email: "  ana@exemplo.com.br ", consent: true })).toEqual({});
  });
});
