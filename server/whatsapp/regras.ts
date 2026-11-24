// Regras fixas do atendimento no WhatsApp, que não dependem do modelo:
// 1) assuntos que vão sempre para a Giselle (detectados antes de chamar a IA);
// 2) conferência de cada resposta antes do envio (preço, cupom, link, data,
//    certificado e tom). Resposta que não passa é reescrita ou vira repasse;
// 3) mensagens de repasse, escritas aqui para não dependerem da IA.

import { formatarReais, reaisParaCentavos, relogioBrasilia, type Fatos } from "./conhecimento";

export const CATEGORIAS_REPASSE = [
  "pagamento",
  "reembolso",
  "anhanguera",
  "empresa",
  "reclamacao",
  "pediu_humano",
  "nao_sei",
  "outro",
] as const;
export type CategoriaRepasse = (typeof CATEGORIAS_REPASSE)[number];

export const NOME_CATEGORIA: Record<CategoriaRepasse, string> = {
  pagamento: "Pagamento com problema",
  reembolso: "Reembolso ou cancelamento",
  anhanguera: "Documentos da Anhanguera",
  empresa: "Empresa ou proposta B2B",
  reclamacao: "Reclamação",
  pediu_humano: "Pediu para falar com você",
  nao_sei: "Pergunta sem resposta na base",
  outro: "Outro assunto",
};

export function ehCategoria(v: unknown): v is CategoriaRepasse {
  return typeof v === "string" && (CATEGORIAS_REPASSE as readonly string[]).includes(v);
}

/** Minúsculas e sem acento, para as regras abaixo. */
export function normalizar(texto: string): string {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// ------------------------------------------------------- 1) repasse fixo

/** Na ordem de prioridade: a primeira que casar define a categoria. */
const GATILHOS: { categoria: CategoriaRepasse; padroes: RegExp[] }[] = [
  {
    categoria: "reclamacao",
    padroes: [
      /reclama(r|cao|coes|ndo)\b|\bprocon\b|reclame\s+aqui|\bgolpe\b|\bfraude\b|fui\s+enganad[oa]|desrespeito|palhacada/,
      /(atendimento\s+pessimo|pessimo\s+atendimento|que\s+absurdo|um\s+absurdo|vou\s+processar|entrar\s+na\s+justica|meu\s+advogado|minha\s+advogada)/,
      /(insatisfeit|decepcionad|chatead|frustrad)[oa]s?\s+com\s+(o\s+|a\s+|os\s+|as\s+)?(curso|atendimento|compra|voces|nokahi|plataforma|aula|giselle)/,
    ],
  },
  {
    categoria: "reembolso",
    padroes: [
      /reembols|estorn|chargeback|cancelamento|arrependimento|\bgarantia\b/,
      /devolu(cao|ir|ver)\s+(o\s+|do\s+|meu\s+)*dinheiro|devolver\s+(o\s+|meu\s+)?valor/,
      /cancelar\s+(a\s+|minha\s+|o\s+|meu\s+)?(compra|inscricao|matricula|pedido|curso|pagamento)/,
      /desisti(r)?\s+(da|do|de)\s+(minha\s+|meu\s+)?(compra|curso|inscricao|matricula|mba|extensao)|\bdesistencia\b/,
      /dinheiro\s+de\s+volta|\bquero\s+(o\s+)?(meu\s+)?dinheiro\b/,
    ],
  },
  {
    categoria: "pagamento",
    padroes: [
      /cobrad[oa]s?\s+(duas|2)\s+vezes|cobranca\s+(em\s+dobro|duplicad|indevid)|cobraram\s+(duas|2)\s+vezes/,
      /pagamento\s+(foi\s+)?(recusad|negad|nao\s+(foi|passou|aprov|compens|confirm|caiu))/,
      /cartao\s+(foi\s+)?(recusad|negad|nao\s+(passa|passou|aceit))/,
      /nao\s+consig\w*\s+(pagar|finalizar|concluir|comprar)|nao\s+consegui\s+(pagar|finalizar|concluir|comprar)/,
      /\bpix\b.{0,30}\bnao\s+(caiu|compensou|foi|aprovou|confirmou|chegou|funcion)/,
      /\bboleto\b.{0,30}(\bnao\s+(caiu|compensou|foi|chegou|gerou|funcion)|\bvenceu\b|\bvencido\b)/,
      /\bja\s+paguei\b|\bpaguei\s+e\b|\bpaguei\s+mas\b|erro\s+no\s+(checkout|pagamento|cartao)/,
      /nao\s+recebi\s+(o\s+|meu\s+)?(acesso|e-?mail|login|senha)|compra\s+nao\s+(aparece|aprov|confirm)/,
    ],
  },
  {
    categoria: "anhanguera",
    padroes: [
      /anhanguera.{0,80}(document|\bra\b|matricula|declaracao|historico|diploma|cadastro|portal|login|senha|ava\b)/,
      /(document|\bra\b|declaracao|historico|diploma|cadastro|portal|login).{0,60}anhanguera/,
      /\b(meu|o)\s+ra\b|declaracao\s+de\s+matricula|enviar\s+(o\s+|meu\s+)?diploma|mandar\s+(o\s+|meu\s+)?diploma/,
    ],
  },
  {
    categoria: "empresa",
    padroes: [
      /\bcnpj\b|nota\s+fiscal|\bnfs?-?e?\b|in[- ]?company|turma\s+(fechada|exclusiva|corporativa)/,
      /para\s+(a\s+|minha\s+|nossa\s+|o\s+|meu\s+|nosso\s+)?(equipe|time|empresa|colaboradores|funcionarios|setor|departamento)\b/,
      /(minha|nossa)\s+empresa\s+(quer|queria|pode|vai|gostaria|paga|pagaria|contrat|tem\s+interesse)/,
      /\b(varios|varias|\d+)\s+(funcionarios|colaboradores|pessoas|alunos|gestores|lideres)\b/,
      /proposta\s+(comercial|para|de\s+(curso|treinamento|turma))|pedir\s+(um\s+)?orcamento|orcamento\s+(para|de)\s+(empresa|equipe|turma|treinamento)/,
      /(contratar|fazer|dar|ministrar|orcamento|proposta|convidar|convite)\b.{0,25}\b(palestra|workshop)/,
      /\b(palestra|workshop)\s+(para|na|no|em)\s+(a\s+|o\s+|nossa\s+|nosso\s+|minha\s+|meu\s+)?(empresa|equipe|evento|time|escola|universidade|prefeitura)/,
      /(contratar|preciso\s+de|precisamos\s+de|queria|quero|fazem|faz|oferecem|oferece)\s+.{0,15}\bconsultoria|treinamento\s+(para\s+(a\s+|minha\s+|nossa\s+)?(empresa|equipe|time)|corporativo|in\s?company)/,
    ],
  },
  {
    categoria: "pediu_humano",
    padroes: [
      /(falar|conversar|atendimento|atender|contato)\s+(direto\s+)?(com\s+)?(a\s+|uma\s+|um\s+)?(giselle|pessoa|humano|humana|atendente|alguem\s+de\s+verdade|alguem\s+real)/,
      /(quero|prefiro|posso)\s+(falar\s+com\s+)?(a\s+)?giselle\b|chama\s+(a\s+)?giselle/,
      /nao\s+quero\s+(falar\s+com\s+)?(robo|bot|ia|maquina)|\bme\s+passa\s+pra\s+(a\s+)?giselle/,
    ],
  },
];

export type RepasseDetectado = { categoria: CategoriaRepasse; trecho: string };

/** Assuntos que vão para a Giselle sem passar pela IA. */
export function detectarRepasse(texto: string): RepasseDetectado | null {
  const t = normalizar(texto);
  for (const g of GATILHOS) {
    for (const p of g.padroes) {
      const m = t.match(p);
      if (m) return { categoria: g.categoria, trecho: m[0] };
    }
  }
  return null;
}

// --------------------------------------------------- 2) conferência da resposta

const URL_RE =
  /(https?:\/\/[^\s<>()"']+|(?<![@\w./])(?:www\.)?coutofalcao\.com(?:\/[^\s<>()"']*)?|(?<![\w./])pay\.voompcreators\.com\.br(?:\/[^\s<>()"']*)?)/gi;

/** Endereço normalizado para comparar: sem www, sem / no fim, sem utm_*, parâmetros em ordem. */
export function normalizarUrl(bruto: string): string | null {
  const limpo = bruto.replace(/[.,;:!?*_)\]]+$/, "");
  try {
    const url = new URL(/^https?:\/\//i.test(limpo) ? limpo : `https://${limpo}`);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    const caminho = url.pathname.replace(/\/+$/, "") || "/";
    const params = Array.from(url.searchParams.entries())
      .filter(([k]) => !k.toLowerCase().startsWith("utm_"))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join("&");
    return `${host}${caminho}${params ? `?${params}` : ""}`;
  } catch {
    return null;
  }
}

const PAGINAS_DO_SITE = [
  "/",
  "/mba",
  "/mba/whatsapp",
  "/do-dado-ao-valor",
  "/do-dado-ao-valor/whatsapp",
  "/extensao",
  "/nivel",
  "/nivel/whatsapp",
  "/ninguem-nasce-fluente",
];

export function linksPermitidos(f: Fatos): Set<string> {
  const permitidos = new Set<string>();
  for (const p of PAGINAS_DO_SITE) permitidos.add(`coutofalcao.com${p}`);
  for (const c of Object.values(f.cursos)) {
    if (c.linkInscricao) {
      const n = normalizarUrl(c.linkInscricao);
      if (n) permitidos.add(n);
    }
  }
  return permitidos;
}

/** Valores em reais citados no texto, em centavos ("R$ 1.750", "6.200 reais", "6 mil reais"). */
export function valoresCitados(texto: string): number[] {
  const achados: number[] = [];
  for (const m of Array.from(texto.matchAll(/R\$\s*(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d{1,2}))?(\s*mil\b)?/gi))) {
    let c = reaisParaCentavos(`${m[1]}${m[2] ? `,${m[2]}` : ""}`);
    if (m[3]) c *= 1000;
    achados.push(c);
  }
  for (const m of Array.from(texto.matchAll(/(?<!R\$\s?)\b(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d{1,2}))?\s*(mil\s+)?reais\b/gi))) {
    let c = reaisParaCentavos(`${m[1]}${m[2] ? `,${m[2]}` : ""}`);
    if (m[3]) c *= 1000;
    achados.push(c);
  }
  return achados;
}

export function valoresPermitidos(f: Fatos): Set<number> {
  const v = new Set<number>();
  for (const c of Object.values(f.cursos)) {
    v.add(c.regular.avistaCentavos);
    v.add(c.regular.parcelaCentavos);
    if (f.condicaoAtiva) {
      v.add(c.primeiraTurma.avistaCentavos);
      v.add(c.primeiraTurma.parcelaCentavos);
      if (c.descontoCentavos) v.add(c.descontoCentavos);
    }
  }
  return v;
}

const MESES = ["janeiro", "fevereiro", "marco", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

/** Datas citadas no texto como "dd/mm" (sem ano, quando não vier). */
export function datasCitadas(texto: string): string[] {
  const achadas: string[] = [];
  for (const m of Array.from(texto.matchAll(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/g))) {
    const dia = Number(m[1]);
    const mes = Number(m[2]);
    if (dia < 1 || dia > 31 || mes < 1 || mes > 12) continue;
    achadas.push(`${String(dia).padStart(2, "0")}/${String(mes).padStart(2, "0")}${m[3] ? `/${m[3].length === 2 ? `20${m[3]}` : m[3]}` : ""}`);
  }
  for (const m of Array.from(normalizar(texto).matchAll(/\b(\d{1,2})\s+de\s+(janeiro|fevereiro|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)(?:\s+de\s+(\d{4}))?/g))) {
    const mes = MESES.indexOf(m[2]) + 1;
    achadas.push(`${String(Number(m[1])).padStart(2, "0")}/${String(mes).padStart(2, "0")}${m[3] ? `/${m[3]}` : ""}`);
  }
  return achadas;
}

function frases(texto: string): string[] {
  return texto.split(/(?<=[.!?])\s+|\n+/).map((s) => s.trim()).filter(Boolean);
}

const CUPONS_CONHECIDOS = ["MBA2800", "DADO750", "FLUENTE105"];

/**
 * Problemas de uma resposta antes do envio. Lista vazia = pode enviar.
 * As regras são conservadoras: na dúvida, a resposta volta para ser reescrita.
 */
export function conferirResposta(texto: string, f: Fatos, agora = Date.now()): string[] {
  const problemas: string[] = [];
  const t = normalizar(texto);

  // Preço
  const permitidos = valoresPermitidos(f);
  for (const v of valoresCitados(texto)) {
    if (!permitidos.has(v)) problemas.push(`valor ${formatarReais(v)} não está na base para hoje`);
  }

  // Cupom
  for (const codigo of CUPONS_CONHECIDOS) {
    if (texto.toUpperCase().includes(codigo) && !f.condicaoAtiva) {
      problemas.push(`cita o cupom ${codigo}, mas a condição de primeira turma já terminou`);
    }
  }
  for (const m of Array.from(texto.matchAll(/\b[A-Z]{3,}\d{2,4}\b/g))) {
    if (!CUPONS_CONHECIDOS.includes(m[0])) problemas.push(`código "${m[0]}" não é um cupom da base`);
  }

  // Links
  const links = linksPermitidos(f);
  for (const m of Array.from(texto.matchAll(URL_RE))) {
    const n = normalizarUrl(m[0]);
    if (!n || !links.has(n)) problemas.push(`link ${m[0]} não está na base para hoje`);
  }
  for (const m of Array.from(texto.matchAll(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g))) {
    if (m[0].toLowerCase() !== "giselle@coutofalcao.com") problemas.push(`e-mail ${m[0]} não está na base`);
  }

  // Datas
  const hoje = relogioBrasilia(agora).data;
  const datasOk = new Set([...f.datas, hoje].flatMap((d) => [d, d.slice(0, 5)]));
  for (const d of datasCitadas(texto)) {
    if (!datasOk.has(d)) problemas.push(`data ${d} não está na base`);
  }

  // Certificado e MEC
  if (/(reconhecid|aprovad|certificad|validad|autorizad|chancelad)[oa]s?\s+pelo\s+mec|selo\s+(do\s+)?mec|chancela\s+do\s+mec/.test(t)) {
    problemas.push('usa "reconhecido/aprovado pelo MEC" (o certo é "instituição credenciada pelo MEC", falando da Anhanguera)');
  }
  const mecs = (t.match(/\bmec\b/g) ?? []).length;
  const mecsCertos = (t.match(/credenciada\s+pelo\s+mec\b/g) ?? []).length;
  if (mecs > mecsCertos) problemas.push('cita o MEC fora da frase "instituição credenciada pelo MEC"');
  if (/diploma\s+(do|da|de)\s+(mba|pos|especializa|extensao|curso|nokahi|anhanguera)|diploma\s+reconhecid/.test(t)) {
    problemas.push('fala em "diploma" do curso (o certo é "certificado")');
  }
  for (const s of frases(texto)) {
    const sn = normalizar(s);
    if (/(fluente|curso\s+livre)/.test(sn) && /\bmec\b/.test(sn)) {
      problemas.push("liga o curso livre Fluente ao MEC");
    }
    if (/(do\s+dado\s+ao\s+valor|extensao)/.test(sn)) {
      if (/mba\s+de\s+40/.test(sn)) problemas.push('chama a extensão de "MBA de 40 h"');
      else if (/(pos[- ]?gradua|\bpos\b|especializa|lato\s+sensu)/.test(sn) && !/\bmba\b/.test(sn)) {
        problemas.push("chama a extensão Do Dado ao Valor de pós/especialização");
      }
    }
  }

  // Título da Giselle (ver base-de-conhecimento.md)
  if (/\bdra\.?\s+giselle|giselle[^.\n]{0,60}\b(doutora|phd)\b|\bphd\b/.test(t)) {
    problemas.push('chama a Giselle de "doutora/Dra./PhD"');
  }

  // Tom: sem pressão nem promessa
  if (/\b(corre|corra|corram)\b|ultimas\s+vagas|so\s+hoje|nao\s+perca|ultima\s+chance|vagas\s+limitadas|garanta\s+(ja|a\s+sua|sua)/.test(t)) {
    problemas.push("usa urgência ou pressão");
  }
  if (/(garant|promet)\w*.{0,40}(emprego|promocao|salario|aprovacao|retorno\s+financeiro|cargo)/.test(t)) {
    problemas.push("promete emprego, cargo, salário ou retorno");
  }
  if (/garantia\s+de\s+\d+\s+dias|\d+\s+dias\s+de\s+garantia/.test(t)) {
    problemas.push("afirma prazo de garantia que não está na base");
  }

  return Array.from(new Set(problemas));
}

// ------------------------------------------------------ 3) mensagens fixas

const ABERTURA: Record<CategoriaRepasse, string> = {
  pagamento:
    "Sinto muito pelo transtorno com o pagamento. Quem resolve isso é a Giselle, pessoalmente, e eu já avisei ela por aqui.",
  reembolso: "Entendi. Reembolso e cancelamento a Giselle cuida pessoalmente, e eu já avisei ela por aqui.",
  anhanguera:
    "Documentos e processos da Anhanguera quem acompanha é a Giselle, pessoalmente. Já avisei ela por aqui.",
  empresa:
    "Que bom! Turmas para empresas, propostas e compras com CNPJ a Giselle conversa pessoalmente, pra entender o que faz sentido para vocês. Já avisei ela por aqui.",
  reclamacao: "Sinto muito por isso. Quero que a Giselle veja pessoalmente, e já avisei ela por aqui.",
  pediu_humano: "Claro! Já chamei a Giselle.",
  nao_sei: "Essa eu prefiro não responder sem ter certeza. Já passei sua pergunta para a Giselle.",
  outro: "Já passei sua mensagem para a Giselle.",
};

const PEDIDO: Partial<Record<CategoriaRepasse, string>> = {
  pagamento: "Se puder, me conta numa mensagem qual curso e o que apareceu na tela, que já fica tudo anotado pra ela.",
  empresa: "Se quiser adiantar: qual a empresa, quantas pessoas e o que vocês buscam?",
};

/** Mensagem enviada a quem foi passado para a Giselle (com a expectativa de prazo certa). */
export function mensagemDeRepasse(categoria: CategoriaRepasse, agora = Date.now()): string {
  const r = relogioBrasilia(agora);
  const prazo = r.horarioDaGiselle
    ? "Ela te responde por aqui mesmo, neste número, assim que puder."
    : "Ela te responde por aqui mesmo, neste número. Ela atende de segunda a sexta, das 8h às 18h, então a resposta chega no próximo horário de atendimento.";
  return [ABERTURA[categoria], prazo, PEDIDO[categoria]].filter(Boolean).join(" ");
}

/** Resposta a áudio, imagem, figurinha etc. quando não vem texto junto. */
export const RESPOSTA_SEM_TEXTO =
  "Por aqui eu consigo ler só mensagens escritas 🙏 Pode me contar a sua dúvida por texto?";

/** Ajusta a formatação para o WhatsApp (negrito com um asterisco, sem títulos nem links em Markdown). */
export function paraWhatsApp(texto: string): string {
  return texto
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, "$1: $2")
    .replace(/\*\*([^*]+)\*\*/g, "*$1*")
    .replace(/__([^_]+)__/g, "_$1_")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 3900);
}
