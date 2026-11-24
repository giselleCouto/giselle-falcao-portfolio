import { describe, expect, it } from "vitest";
import { fatosDoDia } from "./conhecimento";
import { OPCOES_MENU, TEXTO_MENU, cartaoDePrecos, cartaoDoCurso, cartaoDoTeste, rotaFixa, type MsgRoteador } from "./menu";
import { conferirResposta } from "./regras";

const ANTES = Date.parse("2026-11-23T14:00:00-03:00");
const DEPOIS = Date.parse("2026-12-15T14:00:00-03:00");
const FECHOU = Date.parse("2027-01-25T14:00:00-03:00");

const cliente = (texto: string): MsgRoteador => ({ autor: "cliente", texto });
const rota = (texto: string, anteriores: MsgRoteador[] = [], agora = ANTES) => {
  const r = rotaFixa([cliente(texto)], anteriores, agora);
  return r === null ? null : r.tipo === "ignorar" ? "ignorar" : r.rota;
};

describe("respostas prontas, sem IA", () => {
  it.each([
    ["Oi", "menu"],
    ["Olá, boa tarde!", "menu"],
    ["Bom dia, tudo bem?", "menu"],
    ["oii giselle", "menu"],
    ["menu", "menu"],
    ["😊", "menu"],
    ["1", "curso:fluente"],
    ["*2*", "curso:extensao"],
    ["3", "curso:mba"],
    ["4", "teste"],
    ["5", "precos"],
    ["MBA Executivo", "curso:mba"],
    ["Não sei qual escolher", "teste"],
    ["NÍVEL 1", "curso:fluente"],
    ["NÍVEL 3", "curso:mba"],
    ["Olá, Giselle! Tenho uma dúvida sobre o MBA Executivo (Turma 01).", "curso:mba"],
    ["Olá, Giselle! Quero me inscrever no Do Dado ao Valor (Turma 01).", "curso:extensao"],
    ["Oi, Giselle! Me inscrevi no Fluente em IA completo e tenho uma dúvida:", "pedir-duvida"],
    ["Quanto custa o MBA?", "curso:mba"],
    ["qual o valor da extensão?", "curso:extensao"],
    ["me manda o link do fluente", "curso:fluente"],
    ["Quanto custa?", "precos"],
    ["tem cupom de desconto?", "precos"],
    ["Não sei qual curso fazer", "teste"],
    ["ok", "ignorar"],
    ["Obrigada!!", "ignorar"],
    ["valeu, show", "ignorar"],
    ["👍", "menu"],
  ])("“%s” → %s", (texto, esperado) => {
    expect(rota(texto)).toBe(esperado);
  });

  it.each([
    "O MBA tem aula ao vivo?",
    "Sou professora da rede pública, qual curso me ajuda a usar IA em sala?",
    "Posso fazer o MBA e a extensão ao mesmo tempo?",
    "Quanto custa o MBA e a extensão juntos e dá pra parcelar em 6 vezes no boleto pra minha mãe?",
    "Qual a diferença entre o MBA e a extensão?",
  ])("“%s” vai para a IA", (texto) => {
    expect(rota(texto)).toBeNull();
  });

  it("não repete o menu: cumprimento ou emoji logo depois do menu ficam sem resposta", () => {
    const menuAgora: MsgRoteador = { autor: "agente", texto: `${TEXTO_MENU}\n1. Fluente em IA`, em: new Date(ANTES - 60_000) };
    expect(rota("Oi", [cliente("oi"), menuAgora])).toBe("ignorar");
    expect(rota("👍", [cliente("oi"), menuAgora])).toBe("ignorar");
    const menuAntigo = { ...menuAgora, em: new Date(ANTES - 7 * 3600_000) };
    expect(rota("Oi", [cliente("oi"), menuAntigo])).toBe("menu");
  });

  it("“ok” logo depois de uma pergunta do agente vai para a IA (não é só agradecimento)", () => {
    const pergunta: MsgRoteador = { autor: "agente", texto: "Você já tem graduação?" };
    expect(rota("sim", [cliente("Posso fazer o MBA?"), pergunta])).toBeNull();
    expect(rota("ok", [cliente("Posso fazer o MBA?"), pergunta])).toBeNull();
  });

  it("o menu cabe nos limites da lista do WhatsApp", () => {
    expect(OPCOES_MENU.length).toBeLessThanOrEqual(10);
    for (const o of OPCOES_MENU) {
      expect(o.titulo.length).toBeLessThanOrEqual(24);
      expect(o.descricao.length).toBeLessThanOrEqual(72);
    }
  });
});

describe("cartões prontos com os dados do site", () => {
  it("até 12/12: preço com cupom e link com cupom; e passam na conferência", () => {
    const mba = cartaoDoCurso("mba", ANTES);
    expect(mba).toContain("R$ 6.200");
    expect(mba).toContain("MBA2800");
    expect(mba).toContain("cupom=MBA2800");
    expect(mba).toContain("instituição credenciada pelo MEC");
    for (const c of [mba, cartaoDoCurso("extensao", ANTES), cartaoDoCurso("fluente", ANTES), cartaoDePrecos(ANTES), cartaoDoTeste(ANTES)]) {
      expect(conferirResposta(c, fatosDoDia(ANTES), ANTES)).toEqual([]);
    }
  });

  it("depois de 12/12: valor regular, sem cupom; e passam na conferência", () => {
    for (const c of [cartaoDoCurso("mba", DEPOIS), cartaoDoCurso("extensao", DEPOIS), cartaoDoCurso("fluente", DEPOIS), cartaoDePrecos(DEPOIS)]) {
      expect(c).not.toMatch(/MBA2800|DADO750|FLUENTE105|cupom=/);
      expect(conferirResposta(c, fatosDoDia(DEPOIS), DEPOIS)).toEqual([]);
    }
    expect(cartaoDoCurso("extensao", DEPOIS)).toContain("R$ 2.500");
  });

  it("depois de 22/01/2027: sem link de checkout", () => {
    const c = cartaoDoCurso("fluente", FECHOU);
    expect(c).not.toContain("pay.voompcreators.com.br");
    expect(c).toContain("encerraram");
    expect(conferirResposta(c, fatosDoDia(FECHOU), FECHOU)).toEqual([]);
  });

  it("o Fluente não cita o MEC; a extensão não é chamada de pós", () => {
    expect(cartaoDoCurso("fluente", ANTES)).not.toMatch(/MEC/);
    expect(cartaoDoCurso("extensao", ANTES)).not.toMatch(/\bpós\b|especializa/i);
  });
});
