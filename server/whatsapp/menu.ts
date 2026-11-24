// Respostas fixas do WhatsApp, que não gastam a IA:
// - menu de opções (lista do WhatsApp) para quem só cumprimenta ou escreve "menu";
// - cartão de cada curso, preços do dia e teste de nível, montados com os dados do site;
// - mensagens prontas dos botões do site ("NÍVEL 1", "Tenho uma dúvida sobre o MBA…");
// - silêncio para "ok", "obrigada", figurinha repetida e afins.
// Só o que não cabe aqui vai para a IA. Assim a maior parte das conversas custa
// zero token e poucas mensagens.

import { mba } from "../../client/src/lib/mbaData";
import { doDadoAoValor } from "../../client/src/lib/doDadoAoValorData";
import { fatosDoDia, type CursoId, type Fatos } from "./conhecimento";
import { normalizar } from "./regras";

export type LinhaMenu = { id: string; titulo: string; descricao: string };
export type SaidaFixa =
  | { tipo: "texto"; texto: string }
  | { tipo: "lista"; texto: string; botao: string; secao: string; linhas: LinhaMenu[] };

export type RotaFixa = { tipo: "saida"; rota: string; saida: SaidaFixa } | { tipo: "ignorar"; motivo: string };

/** Mensagem do histórico que o roteador precisa ver. */
export type MsgRoteador = { autor: "cliente" | "agente" | "giselle"; texto: string; semTexto?: boolean; em?: Date };

// ------------------------------------------------------------------ menu

/** Títulos de até 24 caracteres e descrições de até 72 (limites do WhatsApp). */
export const OPCOES_MENU: LinhaMenu[] = [
  { id: "fluente", titulo: "Fluente em IA", descricao: "Curso livre · 10 h · usar IA no trabalho com segurança" },
  { id: "extensao", titulo: "Do Dado ao Valor", descricao: "Extensão universitária · 40 h · não exige graduação" },
  { id: "mba", titulo: "MBA Executivo", descricao: "Especialização · 380 h · para quem tem graduação" },
  { id: "teste", titulo: "Não sei qual escolher", descricao: "Teste de 5 perguntas indica por onde começar" },
  { id: "precos", titulo: "Preços e condição", descricao: "Valores de hoje, cupom e parcelamento" },
  { id: "giselle", titulo: "Falar com a Giselle", descricao: "Atendimento pessoal, de segunda a sexta, 8h–18h" },
];

export const TEXTO_MENU =
  "Oi! Aqui é o assistente virtual da NOKAHI EDU 🙂 Escolha uma opção, ou escreva a sua dúvida numa mensagem só, que eu respondo.";

export function saidaMenu(): SaidaFixa {
  return { tipo: "lista", texto: TEXTO_MENU, botao: "Ver opções", secao: "Turma 01", linhas: OPCOES_MENU };
}

/** Versão em texto do menu (painel, histórico e quem não vê a lista). */
export function menuEmTexto(): string {
  return [TEXTO_MENU, ...OPCOES_MENU.map((o, i) => `${i + 1}. ${o.titulo}`)].join("\n");
}

export function textoDaSaida(s: SaidaFixa): string {
  return s.tipo === "texto" ? s.texto : menuEmTexto();
}

const RODAPE = "Responda *menu* para ver as outras opções, ou escreva a sua dúvida.";

// ------------------------------------------------------------ cartões

function linhaPreco(f: Fatos, id: CursoId): string {
  const c = f.cursos[id];
  if (f.condicaoAtiva && c.cupomHoje) {
    return `Hoje: ${c.hoje.avista} à vista ou ${c.hoje.parcelado} no cartão, com o cupom ${c.cupomHoje} (condição de primeira turma, até 12/12/2026). Depois: ${c.regular.avista}.`;
  }
  return `Valor: ${c.regular.avista} à vista ou ${c.regular.parcelado} no cartão.`;
}

function linhaInscricao(f: Fatos, id: CursoId): string {
  const c = f.cursos[id];
  if (!c.linkInscricao) {
    return `As inscrições da Turma 01 encerraram em 22/01/2027. Para saber da próxima turma, responda *Giselle*.\nPágina do curso: ${c.pagina}`;
  }
  return `Inscrição${f.condicaoAtiva ? " (o cupom já vai no link)" : ""}:\n${c.linkInscricao}\nPágina do curso: ${c.pagina}`;
}

export function cartaoDoCurso(id: CursoId, agora = Date.now()): string {
  const f = fatosDoDia(agora);
  const partes: string[] = [];
  if (id === "fluente") {
    partes.push(
      "*Fluente em IA completo* · curso livre",
      "7 módulos, 40 aulas, 10 h, 100% on-line, sem programação. Para quem usa IA no trabalho e quer usar com segurança, conferir as respostas e montar um plano de 90 dias.",
      "Certificado de conclusão de curso livre."
    );
  } else if (id === "extensao") {
    partes.push(
      "*Do Dado ao Valor* · curso de extensão universitária",
      `${doDadoAoValor.fatos.join(" · ")}. Para decidir quais projetos de Dados e IA dão retorno, qualquer que seja o seu cargo.`,
      doDadoAoValor.certificado
    );
  } else {
    partes.push(
      `*${mba.nome}*`,
      `${mba.fatos.join(" · ")}. Para quem decide ou vai decidir onde a empresa investe em IA.`,
      mba.certificado
    );
  }
  partes.push(linhaPreco(f, id), `Início das aulas: 25/01/2027.`, linhaInscricao(f, id), RODAPE);
  return partes.join("\n\n");
}

export function cartaoDePrecos(agora = Date.now()): string {
  const f = fatosDoDia(agora);
  const nomes: Record<CursoId, string> = { fluente: "Fluente em IA completo", extensao: "Do Dado ao Valor", mba: "MBA Executivo" };
  const linhas = (Object.keys(nomes) as CursoId[]).map((id) => {
    const c = f.cursos[id];
    return f.condicaoAtiva && c.cupomHoje
      ? `• *${nomes[id]}*: ${c.hoje.avista} ou ${c.hoje.parcelado} com o cupom ${c.cupomHoje} (depois: ${c.regular.avista})`
      : `• *${nomes[id]}*: ${c.regular.avista} ou ${c.regular.parcelado}`;
  });
  return [
    f.condicaoAtiva ? "Valores de hoje, com a condição de primeira turma (até 12/12/2026):" : "Valores da Turma 01:",
    linhas.join("\n"),
    "O pagamento é pela Voomp, à vista ou em até 12× no cartão. O cupom já vai dentro do link de inscrição.",
    "Responda o número para ver o curso e o link: *1* Fluente em IA · *2* Do Dado ao Valor · *3* MBA Executivo.",
  ].join("\n\n");
}

export function cartaoDoTeste(agora = Date.now()): string {
  const f = fatosDoDia(agora);
  return [
    "Ninguém nasce fluente em IA 🙂 São 3 níveis: *Usar* (Fluente em IA), *Decidir* (Do Dado ao Valor) e *Liderar* (MBA Executivo).",
    `O teste tem 5 perguntas de sim ou não e indica por onde começar:\n${f.testeDeNivel}`,
    "Na dúvida entre dois níveis, comece pelo menor. O MBA é o único que exige graduação.",
    RODAPE,
  ].join("\n\n");
}

export const PEDIR_DUVIDA = "Que bom ter você com a gente! Pode escrever a sua dúvida numa mensagem só, que eu respondo ou passo para a Giselle.";

// ------------------------------------------------------------ roteador

const PALAVRAS_SAUDACAO = new Set(
  "oi oii oiii ola opa e ai eai eae alo hello hi hey bom boa dia tarde noite tudo bem bom como vai voce vc td tranquilo giselle nokahi edu prof professora pessoal gente".split(" ")
);
const PALAVRAS_OK = new Set(
  "ok okay okk blz beleza obrigado obrigada obg obgd brigado brigada valeu vlw show certo entendi perfeito otimo legal top combinado ta bom muito mt mto joia massa demais maravilha agradeco de nada".split(" ")
);

/** Só letras, números e espaços, sem acento, sem emoji. */
function palavras(texto: string): string[] {
  return normalizar(texto)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function cursoCitado(t: string): CursoId[] {
  const achados: CursoId[] = [];
  if (/\bfluente\b|curso livre|nivel 1\b/.test(t)) achados.push("fluente");
  if (/do dado ao valor|\bextensao\b|\bddv\b|nivel 2\b/.test(t)) achados.push("extensao");
  if (/\bmba\b|pos[- ]?graduacao|especializacao|nivel 3\b/.test(t)) achados.push("mba");
  return achados;
}

const POR_NUMERO: Record<string, string> = { "1": "fluente", "2": "extensao", "3": "mba", "4": "teste", "5": "precos", "6": "giselle" };
const POR_TITULO: Record<string, string> = Object.fromEntries(OPCOES_MENU.map((o) => [normalizar(o.titulo), o.id]));

const HORA = 3600_000;

function opcao(id: string, agora: number): RotaFixa | null {
  if (id === "fluente" || id === "extensao" || id === "mba") return { tipo: "saida", rota: `curso:${id}`, saida: { tipo: "texto", texto: cartaoDoCurso(id, agora) } };
  if (id === "precos") return { tipo: "saida", rota: "precos", saida: { tipo: "texto", texto: cartaoDePrecos(agora) } };
  if (id === "teste") return { tipo: "saida", rota: "teste", saida: { tipo: "texto", texto: cartaoDoTeste(agora) } };
  return null; // "giselle" fica com a regra de repasse
}

/**
 * Resposta fixa para as mensagens ainda sem resposta (`pendentes`), ou null
 * quando é preciso a IA. `anteriores` é o resto da conversa (para saber se o
 * menu já foi mandado e se a última mensagem do agente foi uma pergunta).
 */
export function rotaFixa(pendentes: MsgRoteador[], anteriores: MsgRoteador[], agora = Date.now()): RotaFixa | null {
  const doAgente = anteriores.filter((m) => m.autor !== "cliente");
  const ultimaDoAgente = doAgente[doAgente.length - 1];
  const recente = (m?: MsgRoteador) => Boolean(m?.em && agora - m.em.getTime() < 6 * HORA);
  const menuRecente = doAgente.some((m) => m.texto.startsWith(TEXTO_MENU) && recente(m));
  const agenteFezPergunta = Boolean(ultimaDoAgente && /\?\s*$/.test(ultimaDoAgente.texto.trim()));

  const comTexto = pendentes.filter((m) => !m.semTexto);
  const texto = comTexto.map((m) => m.texto).join(" ").trim();
  const t = normalizar(texto).replace(/\s+/g, " ").trim();
  const ps = palavras(texto);

  // Vazio (só emoji, pontuação, figurinha sem texto): menu uma vez; depois, silêncio.
  if (!ps.length) {
    return menuRecente || !comTexto.length ? { tipo: "ignorar", motivo: "sem conteúdo" } : { tipo: "saida", rota: "menu", saida: saidaMenu() };
  }

  // Número do menu ou título de uma opção da lista
  const numero = t.match(/^\*?([1-6])\*?[.)!]?$/)?.[1];
  const id = numero ? POR_NUMERO[numero] : POR_TITULO[t];
  if (id) {
    const r = opcao(id, agora);
    if (r) return r;
    return null;
  }

  if (/^(menu|opcoes|opcao|inicio|comecar|voltar)$/.test(t)) return { tipo: "saida", rota: "menu", saida: saidaMenu() };

  // Botões do site
  const nivel = t.match(/^nivel\s*([123])$/)?.[1];
  if (nivel) return opcao(POR_NUMERO[nivel], agora);
  const prontaDuvida = t.match(/^(ola|oi),? giselle!? tenho uma duvida sobre o (.+?) \(turma 01\)\.?$/);
  const prontaInscricao = t.match(/^(ola|oi),? giselle!? quero me inscrever no (.+?) \(turma 01\)\.?$/);
  const pronta = prontaDuvida ?? prontaInscricao;
  if (pronta) {
    const [curso] = cursoCitado(pronta[2]);
    if (curso) return opcao(curso, agora);
  }
  if (/^(oi|ola),? giselle!? (acabei de me inscrever|me inscrevi) (no|na) .+ e tenho uma duvida:?$/.test(t)) {
    return { tipo: "saida", rota: "pedir-duvida", saida: { tipo: "texto", texto: PEDIR_DUVIDA } };
  }

  // "ok", "obrigada", "valeu"… sem pergunta: não responde (a não ser que o agente tenha perguntado algo)
  if (!texto.includes("?") && !agenteFezPergunta && ps.length <= 6 && ps.every((p) => PALAVRAS_OK.has(p))) {
    return { tipo: "ignorar", motivo: "agradecimento" };
  }

  // Só cumprimento: menu (uma vez a cada 6 h)
  if (ps.length <= 8 && ps.every((p) => PALAVRAS_SAUDACAO.has(p))) {
    return menuRecente ? { tipo: "ignorar", motivo: "cumprimento repetido" } : { tipo: "saida", rota: "menu", saida: saidaMenu() };
  }

  // Perguntas curtas e diretas que os cartões já respondem
  if (t.length <= 90) {
    const cursos = cursoCitado(t);
    const sobrePreco = /quanto custa|\bvalor|\bpreco|investimento|mensalidade|parcel|\bcupom|desconto|quanto (e|fica|sai)/.test(t);
    const sobreInscricao = /\blink\b|inscri|matricul|\bcomprar\b|como (faco|faz) (para|pra) (entrar|me inscrever|comprar)/.test(t);
    const naoSabe = /nao sei qual|qual (curso|nivel|e o melhor|devo|escolher|indica)|por onde (comeco|comecar)|qual (combina|serve)/.test(t);
    if (naoSabe && !cursos.length && t.length <= 45) return opcao("teste", agora);
    if ((sobrePreco || sobreInscricao) && cursos.length === 1) return opcao(cursos[0], agora);
    if (sobrePreco && !cursos.length) return opcao("precos", agora);
  }

  return null;
}
