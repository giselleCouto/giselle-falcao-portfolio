import { describe, expect, it } from "vitest";
import { decidir, montarMensagens } from "./agente";
import { fatosDoDia } from "./conhecimento";
import { RESPOSTA_SEM_TEXTO } from "./regras";
import { chamadaDeRepasse, claudeFalso, recusa, respostaDeTexto } from "./testeUtil";

const ANTES = Date.parse("2026-11-23T14:00:00-03:00");
const DEPOIS = Date.parse("2026-12-15T14:00:00-03:00");
const cliente = (texto: string) => [{ autor: "cliente" as const, texto }];

describe("decisão do agente", () => {
  it("pagamento com problema vai para a Giselle sem chamar a IA", async () => {
    const claude = claudeFalso([]);
    const d = await decidir(cliente("Paguei o MBA e não recebi o acesso"), { claude, agora: ANTES });
    expect(d).toMatchObject({ tipo: "repasse", categoria: "pagamento", origem: "regra" });
    expect(d.texto).toContain("Giselle");
    expect(claude.chamadas).toHaveLength(0);
  });

  it.each([
    ["Quero reembolso", "reembolso"],
    ["Preciso do histórico da Anhanguera", "anhanguera"],
    ["Minha empresa quer uma turma fechada", "empresa"],
    ["Quero fazer uma reclamação", "reclamacao"],
    ["Quero falar com a Giselle", "pediu_humano"],
  ])("“%s” → repasse %s", async (texto, categoria) => {
    const d = await decidir(cliente(texto), { claude: claudeFalso([]), agora: ANTES });
    expect(d).toMatchObject({ tipo: "repasse", categoria });
  });

  it("quando a IA não sabe, ela chama a ferramenta e a pessoa recebe a mensagem fixa de repasse", async () => {
    const claude = claudeFalso([chamadaDeRepasse("nao_sei", "Pergunta sobre bolsa de estudos.")]);
    const d = await decidir(cliente("Vocês têm bolsa?"), { claude, agora: ANTES });
    expect(d).toMatchObject({ tipo: "repasse", categoria: "nao_sei", origem: "agente", resumo: "Pergunta sobre bolsa de estudos." });
    expect(d.texto).toContain("Já passei sua pergunta para a Giselle");
  });

  it("responde com o preço de primeira turma até 12/12", async () => {
    const link = fatosDoDia(ANTES).cursos.mba.linkInscricao!;
    const claude = claudeFalso([respostaDeTexto(`Oi! O MBA sai por **R$ 6.200** ou 12× de R$ 620,01 com o cupom MBA2800.\n${link}`)]);
    const d = await decidir(cliente("Quanto custa o MBA?"), { claude, agora: ANTES });
    expect(d).toMatchObject({ tipo: "resposta", tentativas: 1 });
    expect(d.texto).toContain("*R$ 6.200*");
  });

  it("depois de 12/12, bloqueia o preço com cupom e pede para reescrever", async () => {
    const claude = claudeFalso([
      respostaDeTexto("O MBA sai por R$ 6.200 com o cupom MBA2800."),
      respostaDeTexto("O MBA custa R$ 9.000 à vista ou 12× de R$ 900,01 no cartão."),
    ]);
    const d = await decidir(cliente("Quanto custa o MBA?"), { claude, agora: DEPOIS });
    expect(d).toMatchObject({ tipo: "resposta", tentativas: 2, texto: "O MBA custa R$ 9.000 à vista ou 12× de R$ 900,01 no cartão." });
    expect(d.tipo === "resposta" && d.problemasCorrigidos.join(" ")).toMatch(/MBA2800/);
    const aviso = claude.chamadas[1].messages.at(-1);
    expect(aviso?.role).toBe("system");
    expect(String(aviso?.content)).toMatch(/bloqueada antes do envio/);
  });

  it("se a resposta falhar duas vezes na conferência, a Giselle assume", async () => {
    const claude = claudeFalso([
      respostaDeTexto("O Fluente tem certificado reconhecido pelo MEC."),
      respostaDeTexto("O Fluente é curso livre com certificado do MEC."),
    ]);
    const d = await decidir(cliente("O Fluente tem certificado?"), { claude, agora: ANTES });
    expect(d).toMatchObject({ tipo: "repasse", categoria: "nao_sei", origem: "conferencia" });
  });

  it("recusa do modelo, erro na API ou falta da chave viram repasse", async () => {
    expect(await decidir(cliente("Oi"), { claude: claudeFalso([recusa()]), agora: ANTES })).toMatchObject({ tipo: "repasse", origem: "recusa" });
    expect(await decidir(cliente("Oi"), { claude: claudeFalso([new Error("rede")]), agora: ANTES })).toMatchObject({
      tipo: "repasse",
      origem: "erro",
    });
    expect(await decidir(cliente("Oi"), { claude: null, agora: ANTES })).toMatchObject({ tipo: "repasse", origem: "erro" });
  });

  it("só áudio: pede texto sem gastar a IA", async () => {
    const claude = claudeFalso([]);
    const d = await decidir([{ autor: "cliente", texto: "[áudio]", semTexto: true }], { claude, agora: ANTES });
    expect(d).toMatchObject({ tipo: "resposta", texto: RESPOSTA_SEM_TEXTO });
    expect(claude.chamadas).toHaveLength(0);
  });

  it("monta o pedido ao Claude: modelo atual, ferramenta estrita, cache e relógio no fim", async () => {
    const claude = claudeFalso([respostaDeTexto("Oi! Sou o assistente virtual da NOKAHI EDU. Como posso ajudar?")]);
    await decidir(cliente("Oi"), { claude, agora: ANTES });
    const p = claude.chamadas[0];
    expect(p.model).toBe("claude-opus-5-5");
    expect(p.betas).toContain("server-side-fallback-2026-07-01");
    expect(p.fallbacks).toBe("default");
    expect(p.tool_choice).toEqual({ type: "auto" });
    expect(p.tools?.[0]).toMatchObject({ name: "passar_para_giselle", strict: true });
    const sistema = (p.system as { text: string; cache_control?: unknown }[])[0];
    expect(sistema.cache_control).toEqual({ type: "ephemeral" });
    expect(sistema.text).toContain("R$ 6.200");
    const relogio = String(p.messages.at(-1)?.content);
    expect(relogio).toContain("23/11/2026, 14:00");
    expect(relogio).toContain("primeira resposta");
  });

  it("na conversa em andamento, não se apresenta de novo", async () => {
    const claude = claudeFalso([respostaDeTexto("Claro!")]);
    await decidir(
      [
        { autor: "cliente", texto: "Oi" },
        { autor: "agente", texto: "Oi! Sou o assistente virtual da NOKAHI EDU." },
        { autor: "cliente", texto: "E o Fluente?" },
      ],
      { claude, agora: ANTES }
    );
    expect(String(claude.chamadas[0].messages.at(-1)?.content)).not.toContain("primeira resposta");
  });
});

describe("histórico para a API", () => {
  it("junta mensagens seguidas, marca as respostas da Giselle e começa pela pessoa", () => {
    expect(
      montarMensagens([
        { autor: "agente", texto: "mensagem perdida" },
        { autor: "cliente", texto: "Oi" },
        { autor: "cliente", texto: "Quanto custa?" },
        { autor: "giselle", texto: "Te mandei por e-mail!" },
        { autor: "cliente", texto: "Obrigada" },
      ])
    ).toEqual([
      { role: "user", content: "Oi\nQuanto custa?" },
      { role: "assistant", content: "[A Giselle respondeu pessoalmente:] Te mandei por e-mail!" },
      { role: "user", content: "Obrigada" },
    ]);
  });
});
