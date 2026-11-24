import { describe, expect, it } from "vitest";
import { configAtendimento, criarAtendimento, type ConfigAtendimento } from "./atendimento";
import type { ConfigWhatsApp } from "./cloudApi";
import { criarRepositorioEmMemoria } from "./repositorioMemoria";
import { avisoDeEco, avisoDeMensagem, avisoDeStatus, chamadaDeRepasse, claudeFalso, respostaDeTexto, whatsappFalso } from "./testeUtil";

const AGORA = Date.parse("2026-11-23T14:00:00-03:00");
const ANA = "5531999990000";
const GISELLE_PESSOAL = "5531911112222";

const META: ConfigWhatsApp = { provedor: "meta", token: "tok", phoneNumberId: "PNID", versaoGraph: "v23.0" };

function montar(opcoes: { respostas?: Parameters<typeof claudeFalso>[0]; config?: Partial<ConfigAtendimento>; whatsapp?: ConfigWhatsApp; falhar?: (c: any) => boolean } = {}) {
  const memoria = criarRepositorioEmMemoria();
  const claude = claudeFalso(opcoes.respostas ?? []);
  const wa = whatsappFalso(opcoes.falhar);
  let relogio = AGORA;
  const atendimento = criarAtendimento({
    repo: memoria.repo,
    claude,
    whatsapp: opcoes.whatsapp ?? META,
    buscar: wa.buscar,
    agora: () => relogio,
    config: {
      ...configAtendimento({}),
      ligado: true,
      esperaMs: 0,
      avisoPara: GISELLE_PESSOAL,
      ...opcoes.config,
    },
  });
  const receber = async (aviso: unknown) => {
    await atendimento.receberAviso(aviso);
    await atendimento.aguardarOcioso();
  };
  return { ...memoria, claude, wa, atendimento, receber, avancar: (ms: number) => (relogio += ms) };
}

describe("atendimento do WhatsApp, do aviso à resposta", () => {
  it("responde a pergunta pela Cloud API da Meta e marca a mensagem como lida", async () => {
    const t = montar({ respostas: [respostaDeTexto("Oi, Ana! Sou o assistente virtual da NOKAHI EDU. O Fluente sai por R$ 245.")] });
    await t.receber(avisoDeMensagem(ANA, "Quanto custa o Fluente?", { id: "wamid.A1" }));

    const [envio, lida] = t.wa.envios;
    expect(envio.url).toBe("https://graph.facebook.com/v23.0/PNID/messages");
    expect(envio.cabecalhos.Authorization).toBe("Bearer tok");
    expect(envio.corpo).toMatchObject({ messaging_product: "whatsapp", to: ANA, type: "text", text: { body: expect.stringContaining("R$ 245") } });
    expect(lida.corpo).toMatchObject({ status: "read", message_id: "wamid.A1" });

    expect(t.mensagens.map((m) => [m.autor, m.status])).toEqual([
      ["cliente", "recebido"],
      ["agente", "enviado"],
    ]);
    expect(t.conversas[0]).toMatchObject({ waId: ANA, nome: "Ana" });
  });

  it("aviso repetido pela Meta não gera resposta em dobro", async () => {
    const t = montar({ respostas: [respostaDeTexto("Oi!")] });
    const aviso = avisoDeMensagem(ANA, "Oi", { id: "wamid.REPETIDO" });
    await t.receber(aviso);
    await t.receber(aviso);
    expect(t.claude.chamadas).toHaveLength(1);
    expect(t.wa.textos()).toHaveLength(1);
  });

  it("várias mensagens seguidas recebem uma resposta só", async () => {
    const t = montar({ respostas: [respostaDeTexto("Oi! O MBA tem 380 h em 12 meses.")], config: { esperaMs: 30 } });
    await t.atendimento.receberAviso(avisoDeMensagem(ANA, "Oi"));
    await t.atendimento.receberAviso(avisoDeMensagem(ANA, "quero saber do MBA"));
    await t.atendimento.aguardarOcioso();
    expect(t.claude.chamadas).toHaveLength(1);
    expect(String(t.claude.chamadas[0].messages[0].content)).toBe("Oi\nquero saber do MBA");
    expect(t.wa.textos()).toHaveLength(1);
  });

  it("repasse: avisa a Giselle no WhatsApp pessoal, responde a pessoa e pausa o agente", async () => {
    const t = montar();
    await t.receber(avisoDeMensagem(ANA, "Paguei e não recebi o acesso", { nome: "Ana Souza" }));

    expect(t.repasses).toHaveLength(1);
    expect(t.repasses[0]).toMatchObject({ categoria: "pagamento", origem: "regra", status: "aberto", avisoErro: null });
    expect(t.repasses[0].avisadoEm).toBeInstanceOf(Date);

    const [aviso, paraAna] = t.wa.textos();
    expect(aviso.corpo.to).toBe(GISELLE_PESSOAL);
    expect(aviso.corpo.text.body).toContain("Ana Souza (+5531999990000)");
    expect(aviso.corpo.text.body).toContain("Pagamento com problema");
    expect(aviso.corpo.text.body).toContain("/painel/whatsapp?c=1");
    expect(paraAna.corpo.to).toBe(ANA);
    expect(paraAna.corpo.text.body).toContain("Giselle");

    expect(t.conversas[0].motivoPausa).toBe("repasse:pagamento");
    expect(t.conversas[0].pausadoAte!.getTime()).toBe(AGORA + 72 * 3600_000);
    expect(t.claude.chamadas).toHaveLength(0);

    // a pessoa continua escrevendo: fica guardado para a Giselle, sem resposta do agente
    await t.receber(avisoDeMensagem(ANA, "Foi no cartão, MBA"));
    expect(t.wa.textos()).toHaveLength(2);
    expect(t.mensagens.at(-1)).toMatchObject({ autor: "cliente", texto: "Foi no cartão, MBA" });
  });

  it("com modelo aprovado na Meta, o aviso à Giselle sai como modelo com 4 parâmetros", async () => {
    const t = montar({
      respostas: [chamadaDeRepasse("nao_sei", "Quer saber de bolsa de estudos.")],
      config: { modeloAviso: "aviso_repasse" },
    });
    await t.receber(avisoDeMensagem(ANA, "Vocês têm bolsa?"));
    const modelo = t.wa.envios.find((e) => e.corpo.type === "template")!;
    expect(modelo.corpo.to).toBe(GISELLE_PESSOAL);
    expect(modelo.corpo.template).toMatchObject({ name: "aviso_repasse", language: { code: "pt_BR" } });
    expect(modelo.corpo.template.components[0].parameters.map((p: any) => p.text)).toEqual([
      "Ana (+5531999990000)",
      "Pergunta sem resposta na base",
      "Quer saber de bolsa de estudos.",
      "https://www.coutofalcao.com/painel/whatsapp?c=1",
    ]);
  });

  it("guarda o erro quando o aviso à Giselle não sai (ex.: fora da janela de 24 h, sem modelo)", async () => {
    const t = montar({ falhar: (c) => c.to === GISELLE_PESSOAL });
    await t.receber(avisoDeMensagem(ANA, "Quero reembolso"));
    expect(t.repasses[0].avisadoEm).toBeNull();
    expect(t.repasses[0].avisoErro).toMatch(/Re-engagement/);
    expect(t.wa.textos().at(-1)?.corpo.to).toBe(ANA);
  });

  it("um segundo repasse na mesma conversa não avisa a Giselle de novo", async () => {
    const t = montar({ config: { pausaRepasseMs: 0 } });
    await t.receber(avisoDeMensagem(ANA, "Quero reembolso"));
    await t.receber(avisoDeMensagem(ANA, "Quero falar com a Giselle"));
    expect(t.repasses).toHaveLength(1);
    expect(t.wa.textos().filter((e) => e.corpo.to === GISELLE_PESSOAL)).toHaveLength(1);
  });

  it("quando a Giselle responde pelo app (coexistência), o agente fica quieto naquela conversa", async () => {
    const t = montar({ respostas: [respostaDeTexto("Oi!")] });
    await t.receber(avisoDeMensagem(ANA, "Quero reembolso"));
    expect(t.repasses[0].status).toBe("aberto");

    await t.receber(avisoDeEco(ANA, "Oi, Ana! Já vi aqui, te respondo em 5 min."));
    expect(t.mensagens.at(-1)).toMatchObject({ autor: "giselle", direcao: "saida" });
    expect(t.conversas[0].motivoPausa).toBe("giselle_respondeu");
    expect(t.conversas[0].pausadoAte!.getTime()).toBe(AGORA + 12 * 3600_000);
    expect(t.repasses[0].status).toBe("respondido");

    await t.receber(avisoDeMensagem(ANA, "Obrigada!"));
    expect(t.claude.chamadas).toHaveLength(0);

    // passada a pausa, o agente volta a responder
    t.avancar(13 * 3600_000);
    await t.receber(avisoDeMensagem(ANA, "Mais uma dúvida: o MBA tem aula ao vivo?"));
    expect(t.claude.chamadas).toHaveLength(1);
    expect(String(t.claude.chamadas[0].messages.find((m) => m.role === "assistant")?.content)).toContain("[A Giselle respondeu pessoalmente:]");
  });

  it("o eco de uma mensagem que o próprio agente mandou não pausa nada", async () => {
    const t = montar({ respostas: [respostaDeTexto("Oi!")] });
    await t.receber(avisoDeMensagem(ANA, "Oi"));
    const idDoAgente = t.mensagens.find((m) => m.autor === "agente")!.waMessageId!;
    await t.receber(avisoDeEco(ANA, "Oi!", idDoAgente));
    expect(t.conversas[0].pausadoAte).toBeNull();
  });

  it("desligado (WHATSAPP_AGENTE_LIGADO ≠ 1) ou pausado no painel: só guarda", async () => {
    const desligado = montar({ config: { ligado: false } });
    await desligado.receber(avisoDeMensagem(ANA, "Oi"));
    expect(desligado.mensagens).toHaveLength(1);
    expect(desligado.wa.envios).toHaveLength(0);

    const pausado = montar();
    pausado.ajustes.set("agente_pausado", "1");
    await pausado.receber(avisoDeMensagem(ANA, "Oi"));
    expect(pausado.wa.envios).toHaveLength(0);
  });

  it("áudio sem texto: pede para escrever", async () => {
    const t = montar();
    await t.receber(avisoDeMensagem(ANA, "", { tipo: "audio" }));
    expect(t.mensagens[0]).toMatchObject({ texto: "[áudio]", semTexto: true });
    expect(t.wa.textos()[0].corpo.text.body).toContain("mensagens escritas");
  });

  it("guarda o status de entrega e o erro que a Meta devolve", async () => {
    const t = montar({ respostas: [respostaDeTexto("Oi!")] });
    await t.receber(avisoDeMensagem(ANA, "Oi"));
    const id = t.mensagens.find((m) => m.autor === "agente")!.waMessageId!;
    await t.receber(avisoDeStatus(id, "read"));
    expect(t.mensagens.find((m) => m.waMessageId === id)?.status).toBe("read");
    await t.receber(avisoDeStatus(id, "failed", { code: 131026, title: "Message undeliverable" }));
    expect(t.mensagens.find((m) => m.waMessageId === id)).toMatchObject({ status: "failed", erro: "131026 Message undeliverable" });
  });

  it("passa para a Giselle depois do limite de respostas em 24 h", async () => {
    const t = montar({ respostas: [respostaDeTexto("Resposta 1"), respostaDeTexto("Resposta 2")], config: { limiteDiario: 2 } });
    await t.receber(avisoDeMensagem(ANA, "Pergunta 1"));
    await t.receber(avisoDeMensagem(ANA, "Pergunta 2"));
    await t.receber(avisoDeMensagem(ANA, "Pergunta 3"));
    expect(t.claude.chamadas).toHaveLength(2);
    expect(t.repasses[0]).toMatchObject({ categoria: "outro" });
  });

  it("pela 360dialog (coexistência), usa o endereço e a chave dela", async () => {
    const t = montar({
      respostas: [respostaDeTexto("Oi!")],
      whatsapp: { provedor: "360dialog", token: "chave360", phoneNumberId: null, versaoGraph: "v23.0" },
    });
    await t.receber(avisoDeMensagem(ANA, "Oi"));
    expect(t.wa.envios[0].url).toBe("https://waba-v2.360dialog.io/messages");
    expect(t.wa.envios[0].cabecalhos["D360-API-KEY"]).toBe("chave360");
  });

  it("sem WhatsApp configurado, guarda a resposta como não enviada", async () => {
    const memoria = criarRepositorioEmMemoria();
    const a = criarAtendimento({
      repo: memoria.repo,
      claude: claudeFalso([respostaDeTexto("Oi!")]),
      whatsapp: null,
      agora: () => AGORA,
      config: { ...configAtendimento({}), ligado: true, esperaMs: 0 },
    });
    await a.receberAviso(avisoDeMensagem(ANA, "Oi"));
    await a.aguardarOcioso();
    expect(memoria.mensagens.at(-1)).toMatchObject({ autor: "agente", status: "nao_enviado" });
  });
});

describe("configuração pelo Railway", () => {
  it("lê as variáveis com padrões seguros", () => {
    expect(configAtendimento({})).toMatchObject({
      ligado: false,
      esperaMs: 6000,
      pausaHumanoMs: 12 * 3600_000,
      pausaRepasseMs: 72 * 3600_000,
      limiteDiario: 30,
      avisoPara: null,
      idiomaAviso: "pt_BR",
    });
    expect(
      configAtendimento({ WHATSAPP_AGENTE_LIGADO: "1", WHATSAPP_AVISO_PARA: "+55 (31) 91111-2222", WHATSAPP_PAUSA_HUMANO_HORAS: "4" })
    ).toMatchObject({ ligado: true, avisoPara: "5531911112222", pausaHumanoMs: 4 * 3600_000 });
  });
});
