import { describe, expect, it } from "vitest";
import { fatosDoDia } from "./conhecimento";
import { conferirResposta, detectarRepasse, mensagemDeRepasse, paraWhatsApp, valoresCitados } from "./regras";

const ANTES = Date.parse("2026-11-23T14:00:00-03:00");
const DEPOIS = Date.parse("2026-12-15T14:00:00-03:00");
const FECHOU = Date.parse("2027-01-25T14:00:00-03:00");
const confere = (texto: string, agora = ANTES) => conferirResposta(texto, fatosDoDia(agora), agora);

describe("assuntos que vão sempre para a Giselle", () => {
  it.each([
    ["Paguei e não recebi o acesso ao curso", "pagamento"],
    ["meu cartão foi recusado no checkout", "pagamento"],
    ["Fui cobrada duas vezes!", "pagamento"],
    ["O pix não caiu ainda", "pagamento"],
    ["Quero meu dinheiro de volta", "reembolso"],
    ["Como faço para pedir reembolso?", "reembolso"],
    ["quero cancelar minha inscrição", "reembolso"],
    ["Tem garantia?", "reembolso"],
    ["Preciso da declaração de matrícula da Anhanguera", "anhanguera"],
    ["qual é o meu RA?", "anhanguera"],
    ["Onde envio meu diploma de graduação para a Anhanguera?", "anhanguera"],
    ["Minha empresa quer fechar uma turma", "empresa"],
    ["Vocês emitem nota fiscal para CNPJ?", "empresa"],
    ["Seria para 15 gestores da nossa equipe", "empresa"],
    ["Quero contratar uma palestra para o nosso evento", "empresa"],
    ["Vou registrar uma reclamação no Reclame Aqui", "reclamacao"],
    ["Isso é golpe?", "reclamacao"],
    ["Estou muito insatisfeita com o atendimento", "reclamacao"],
    ["Quero falar com a Giselle", "pediu_humano"],
    ["posso falar com uma pessoa?", "pediu_humano"],
  ])("“%s” → %s", (texto, categoria) => {
    expect(detectarRepasse(texto)?.categoria).toBe(categoria);
  });

  it.each([
    "Quanto custa o MBA?",
    "Trabalho numa empresa de logística, qual curso é melhor pra mim?",
    "Vi sua palestra no HackTown e quero saber do MBA",
    "Sou advogado, o curso serve pra mim?",
    "Aceita pix?",
    "O certificado é da Anhanguera?",
    "Tenho vergonha de não saber nada de IA",
    "Sou péssima com tecnologia, consigo acompanhar?",
    "Preciso ter diploma para fazer o MBA?",
    "Qual a diferença entre o MBA e a extensão?",
    "Pensei em desistir de aprender IA, mas quero tentar",
  ])("“%s” fica com o agente", (texto) => {
    expect(detectarRepasse(texto)).toBeNull();
  });
});

describe("conferência das respostas antes do envio", () => {
  const f = fatosDoDia(ANTES);

  it("aceita o preço de primeira turma com cupom e o link certo até 12/12", () => {
    expect(
      confere(
        `O MBA sai por R$ 6.200 à vista ou 12× de R$ 620,01, com o cupom MBA2800 (R$ 2.800 de desconto sobre R$ 9.000).\n${f.cursos.mba.linkInscricao}`
      )
    ).toEqual([]);
  });

  it("depois de 12/12 bloqueia preço de primeira turma e cupom", () => {
    const problemas = confere("O MBA sai por R$ 6.200 ou 12× de R$ 620,01 com o cupom MBA2800.", DEPOIS);
    expect(problemas.join(" ")).toMatch(/R\$ 6\.200/);
    expect(problemas.join(" ")).toMatch(/R\$ 620,01/);
    expect(problemas.join(" ")).toMatch(/cupom MBA2800/);
    expect(confere("O MBA custa R$ 9.000 à vista ou 12× de R$ 900,01 no cartão.", DEPOIS)).toEqual([]);
  });

  it("depois de 12/12 bloqueia o link com cupom; antes, exige o link com cupom", () => {
    const comCupom = fatosDoDia(ANTES).cursos.extensao.linkInscricao!;
    const semCupom = fatosDoDia(DEPOIS).cursos.extensao.linkInscricao!;
    expect(confere(comCupom, DEPOIS).join(" ")).toMatch(/link/);
    expect(confere(semCupom, DEPOIS)).toEqual([]);
    expect(confere(semCupom, ANTES).join(" ")).toMatch(/link/);
  });

  it("depois de 22/01/2027 bloqueia qualquer link de checkout", () => {
    expect(confere(fatosDoDia(DEPOIS).cursos.mba.linkInscricao!, FECHOU).join(" ")).toMatch(/link/);
    expect(confere("A página do curso é https://www.coutofalcao.com/mba/whatsapp", FECHOU)).toEqual([]);
  });

  it("bloqueia preço, parcela, cupom, data e e-mail inventados", () => {
    expect(confere("Consigo fazer por R$ 5.000 pra você.").length).toBeGreaterThan(0);
    expect(confere("Dá para parcelar em 12× de R$ 600.").length).toBeGreaterThan(0);
    expect(confere("Use o cupom TURMA2026 no checkout.").join(" ")).toMatch(/TURMA2026/);
    expect(confere("A turma 02 começa em 20/02/2027.").join(" ")).toMatch(/20\/02\/2027/);
    expect(confere("Manda para contato@nokahi.com").join(" ")).toMatch(/e-mail/);
    expect(confere("As aulas começam em 25/01/2027, e a condição vai até 12/12.")).toEqual([]);
  });

  it("lê valores escritos de vários jeitos", () => {
    expect(valoresCitados("R$ 1.750, R$1750,00, 6.200 reais e R$ 9 mil")).toEqual([175000, 175000, 900000, 620000]);
  });

  it("regras de certificado", () => {
    expect(
      confere("O certificado do MBA é de especialização lato sensu, emitido pela Anhanguera, instituição credenciada pelo MEC.")
    ).toEqual([]);
    expect(confere("O certificado do MBA é reconhecido pelo MEC.").length).toBeGreaterThan(0);
    expect(confere("O Fluente em IA completo tem certificado do MEC.").length).toBeGreaterThan(0);
    expect(confere("O Fluente é curso livre, sem MEC.").length).toBeGreaterThan(0);
    expect(confere("O Fluente em IA completo dá certificado de conclusão de curso livre.")).toEqual([]);
    expect(confere("O Do Dado ao Valor é uma pós de 40 h.").length).toBeGreaterThan(0);
    expect(confere("A extensão é uma especialização rápida.").length).toBeGreaterThan(0);
    expect(confere("A extensão Do Dado ao Valor não é pós-graduação, diferente do MBA.")).toEqual([]);
    expect(confere("Você recebe o diploma do MBA.").length).toBeGreaterThan(0);
    expect(confere("Para o MBA é preciso ter graduação concluída, com diploma registrado.")).toEqual([]);
  });

  it("não deixa chamar a Giselle de doutora nem usar pressão", () => {
    expect(confere("A Dra. Giselle conduz o curso.").length).toBeGreaterThan(0);
    expect(confere("A Giselle é PhD em clima.").length).toBeGreaterThan(0);
    expect(confere("A Giselle é mestre e faz o doutorado no CEFET-MG.")).toEqual([]);
    expect(confere("Corre que são as últimas vagas!").length).toBeGreaterThan(0);
    expect(confere("Garanto que você vai conseguir uma promoção.").length).toBeGreaterThan(0);
  });

  it("aceita os links das páginas e do teste de nível", () => {
    expect(confere("Faz o teste: https://www.coutofalcao.com/nivel/whatsapp e veja coutofalcao.com/mba")).toEqual([]);
    expect(confere("Escreve pra giselle@coutofalcao.com")).toEqual([]);
    expect(confere("Veja https://outro-site.com/curso").length).toBeGreaterThan(0);
  });
});

describe("mensagens de repasse", () => {
  it("dá o prazo certo dentro e fora do horário da Giselle", () => {
    const dentro = mensagemDeRepasse("reembolso", Date.parse("2026-11-23T10:00:00-03:00"));
    const fora = mensagemDeRepasse("reembolso", Date.parse("2026-11-28T10:00:00-03:00"));
    expect(dentro).toContain("Giselle");
    expect(dentro).not.toContain("próximo horário");
    expect(fora).toContain("de segunda a sexta, das 8h às 18h");
  });

  it("nenhuma mensagem fixa fere as próprias regras", () => {
    for (const c of ["pagamento", "reembolso", "anhanguera", "empresa", "reclamacao", "pediu_humano", "nao_sei", "outro"] as const) {
      expect(confere(mensagemDeRepasse(c, ANTES))).toEqual([]);
    }
  });
});

describe("formatação para o WhatsApp", () => {
  it("troca Markdown pelo jeito do WhatsApp", () => {
    expect(paraWhatsApp("## Preço\n**R$ 245** no [link](https://www.coutofalcao.com/nivel)")).toBe(
      "Preço\n*R$ 245* no link: https://www.coutofalcao.com/nivel"
    );
  });
});
