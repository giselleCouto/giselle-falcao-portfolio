// Página do lançamento "Ninguém nasce fluente" (Turma 01 da NOKAHI EDU, nov/2026).
// A pessoa escolhe a frase que parece com ela (ou faz o teste de 5 perguntas do
// episódio 1) e vê o curso, o preço e o certificado do seu nível.
// Rotas: /ninguem-nasce-fluente (principal) e /nivel (curta, para bio, Reels e
// WhatsApp). Cada canal tem a sua rota curta (/nivel/instagram...), que vira a
// origem da visita e do lead, mesmo sem ?src= no link.
// Plano completo: Claude Doc "Lançamento da primeira turma: Ninguém nasce fluente".
//
// Regras de texto (não mudar sem a Giselle):
// - Certificado: "emitido pela Anhanguera, instituição credenciada pelo MEC".
//   Nunca "diploma" nem "reconhecido pelo MEC". Curso livre: "certificado de
//   conclusão de curso livre".
// - Extensão: nunca "pós", "especialização" ou "MBA de 40 h". Só o MBA exige
//   graduação.
// - Sem contagem regressiva, sem promessa de cargo, salário ou retorno. A única
//   urgência é a data real: condição até 12/12/2026, inscrições até 22/01/2027.

import { condicaoPrimeiraTurmaAtiva } from "./fluenteData";

export { condicaoPrimeiraTurmaAtiva };

export const NNF_ROTA = "/ninguem-nasce-fluente";
export const NNF_ROTA_CURTA = "/nivel";
export const NNF_CAMPANHA = "ninguem-nasce-fluente";

export const NNF_CANAIS = ["youtube", "instagram", "linkedin", "tiktok", "whatsapp"] as const;
export type NnfCanal = (typeof NNF_CANAIS)[number];

export type NivelId = 1 | 2 | 3;

// ===================================================================
// Links, cupons e WhatsApp do lançamento (preenchidos em 14/11/2026).
// Se algum ficar vazio, o botão aparece como "em breve" e não leva a
// lugar nenhum.
// ===================================================================

/** Links de inscrição: checkout da Voomp (Produtos → Links) de cada curso. */
export const LINKS_INSCRICAO: Record<NivelId, string | null> = {
  1: "https://pay.voompcreators.com.br/17873", // Fluente em IA completo (curso livre, Voomp)
  2: "https://pay.voompcreators.com.br/17781", // Do Dado ao Valor (extensão, Voomp)
  3: "https://pay.voompcreators.com.br/17779", // MBA Executivo (Voomp)
};

/**
 * Cupom da condição de primeira turma, criado na Voomp (Cupons) com validade
 * até 12/12/2026 23:59. Enquanto a condição vale, o link de inscrição já leva
 * ?cupom=, que o checkout da Voomp aplica sozinho; o preço do produto na Voomp
 * é o regular. Os mesmos cupons das páginas /do-dado-ao-valor e /mba.
 * Fluente em IA completo: R$ 350 − FLUENTE105 (R$ 105) = R$ 245.
 * Do Dado ao Valor: R$ 2.500 − DADO750 (R$ 750) = R$ 1.750.
 * MBA Executivo: R$ 9.000 − MBA2800 (R$ 2.800) = R$ 6.200.
 */
export const CUPOM_PRIMEIRA_TURMA: Partial<Record<NivelId, string>> = {
  1: "FLUENTE105",
  2: "DADO750",
  3: "MBA2800",
};

/**
 * Número oficial de WhatsApp do lançamento: só dígitos, com 55 e DDD.
 * O mesmo das páginas /mba e /do-dado-ao-valor (WHATSAPP_DUVIDAS) e da
 * tutoria do PPC.
 */
export const WHATSAPP_LANCAMENTO: string | null = "5531982280551";

// ===================================================================

/** Fim das inscrições da Turma 01 (22/01/2027, 23h59 em Brasília) */
const FIM_INSCRICOES = new Date("2027-01-23T00:00:00-03:00").getTime();

export function inscricoesAbertas(agora = Date.now()) {
  return agora < FIM_INSCRICOES;
}

export const turma = {
  nome: "Turma 01",
  inicio: "25/01/2027",
  fimInscricoes: "22/01/2027",
  fimCondicao: "12/12/2026",
  inicioRegular: "13/12/2026",
  atendimento: "A Giselle responde pessoalmente, de segunda a sexta, das 8h às 18h.",
};

export type Preco = { avista: string; parcelado: string };

export type Nivel = {
  id: NivelId;
  rotulo: string;
  frase: string;
  curso: string;
  /** Nome curto, para botões e cartões no celular */
  cursoCurto: string;
  tipo: string;
  saiSabendo: string;
  detalhes: string[];
  certificado: string;
  paraQuem: string;
  precos: { primeiraTurma: Preco; regular: Preco };
};

export const niveis: Nivel[] = [
  {
    id: 1,
    rotulo: "Usar",
    frase: "Eu uso IA no trabalho, mas nunca sei se posso confiar no que ela responde.",
    curso: "Fluente em IA completo",
    cursoCurto: "Fluente em IA completo",
    tipo: "Curso livre",
    saiSabendo: "Usar IA no dia a dia com segurança, conferir as respostas e montar um plano de 90 dias.",
    detalhes: [
      "A versão completa da série Fluente em IA, do seu nível ao plano de 90 dias",
      "Aulas gravadas, para assistir no seu ritmo",
      "Não exige programação",
    ],
    certificado: "Certificado de conclusão de curso livre.",
    paraQuem: "Qualquer pessoa pode fazer.",
    precos: {
      primeiraTurma: { avista: "R$ 245", parcelado: "12× de R$ 21,30" },
      regular: { avista: "R$ 350", parcelado: "12× de R$ 30,45" },
    },
  },
  {
    id: 2,
    rotulo: "Decidir",
    frase: "Me pediram para trazer IA para a minha área, e eu não sei quais projetos dão retorno.",
    curso: "Do Dado ao Valor",
    cursoCurto: "Do Dado ao Valor",
    tipo: "Curso de extensão universitária · 40 h",
    saiSabendo:
      "O que é um projeto de Dados e IA, como atuar na transformação digital e como separar os projetos que dão retorno dos que não dão.",
    detalhes: [
      "40 h, 100% online, com aulas curtas de até 12 minutos",
      "Aulas gravadas, para assistir no seu ritmo",
      "Não exige programação",
    ],
    certificado:
      "Certificado de extensão universitária emitido pela Anhanguera, instituição credenciada pelo MEC.",
    paraQuem: "Qualquer pessoa pode fazer, sem exigência de graduação.",
    precos: {
      primeiraTurma: { avista: "R$ 1.750", parcelado: "12× de R$ 152,10" },
      regular: { avista: "R$ 2.500", parcelado: "12× de R$ 217,10" },
    },
  },
  {
    id: 3,
    rotulo: "Liderar",
    frase: "Sou eu quem decide, ou vai decidir, onde a empresa investe em IA.",
    curso: "MBA Executivo em Estratégia de IA e Transformação Empresarial",
    cursoCurto: "MBA Executivo",
    tipo: "MBA Executivo · 380 h em 12 meses",
    saiSabendo: "Priorizar, provar, governar e escalar IA na empresa, com um plano de 365 dias.",
    detalhes: [
      "380 h em 12 meses, 100% online",
      "Aulas gravadas, para assistir no seu ritmo",
      "Não exige programação",
    ],
    certificado:
      "Certificado de especialização lato sensu emitido pela Anhanguera, instituição credenciada pelo MEC.",
    paraQuem: "Para quem tem graduação concluída, em qualquer área.",
    precos: {
      primeiraTurma: { avista: "R$ 6.200", parcelado: "12× de R$ 521,00" },
      regular: { avista: "R$ 9.000", parcelado: "12× de R$ 781,50" },
    },
  },
];

export function getNivel(id: NivelId): Nivel {
  return niveis[id - 1];
}

/** Preço que vale hoje: condição de primeira turma até 12/12/2026, depois o regular. */
export function precoAtual(nivel: Nivel, agora = Date.now()): Preco {
  return condicaoPrimeiraTurmaAtiva(agora) ? nivel.precos.primeiraTurma : nivel.precos.regular;
}

export function whatsappUrl(id: NivelId): string | null {
  if (!WHATSAPP_LANCAMENTO) return null;
  return `https://wa.me/${WHATSAPP_LANCAMENTO}?text=${encodeURIComponent(`NÍVEL ${id}`)}`;
}

/**
 * Link de inscrição com o cupom (só enquanto vale a condição de primeira turma)
 * e a origem da visita: utm_source = canal da rota ou ?src=, utm_campaign =
 * ninguem-nasce-fluente. Null enquanto o curso não tem link.
 */
export function inscricaoUrl(id: NivelId, opcoes: { agora?: number; origem?: string } = {}): string | null {
  const base = LINKS_INSCRICAO[id];
  if (!base) return null;
  try {
    const url = new URL(base);
    const cupom = CUPOM_PRIMEIRA_TURMA[id];
    if (cupom && condicaoPrimeiraTurmaAtiva(opcoes.agora ?? Date.now())) url.searchParams.set("cupom", cupom);
    if (opcoes.origem) url.searchParams.set("utm_source", opcoes.origem.slice(0, 120));
    url.searchParams.set("utm_campaign", NNF_CAMPANHA);
    return url.toString();
  } catch {
    return base;
  }
}

/** O que ainda falta preencher (aparece só no ambiente local, para revisão). */
export function pendencias(): string[] {
  const faltam: string[] = [];
  for (const n of niveis) {
    if (!LINKS_INSCRICAO[n.id]) faltam.push(`Link de inscrição do nível ${n.id} (${n.cursoCurto})`);
  }
  if (!WHATSAPP_LANCAMENTO) faltam.push("Número de WhatsApp do lançamento");
  return faltam;
}

// ---- A segunda porta: o teste de 5 perguntas do episódio 1 (Kit de Letramento, p. 2)

export const teste = {
  titulo: "Prefere descobrir pelo teste?",
  intro:
    "São as 5 perguntas do episódio 1 da série Fluente em IA. Responda com sinceridade, sim ou não. Cada “não” é só o próximo degrau, e todo mundo começa de algum lugar.",
  perguntas: [
    "Você sabe o que não pode colar numa ferramenta de IA pública (dado de cliente, contrato, senha, dado pessoal)?",
    "Você verifica a resposta da IA antes de usar, com fonte, cálculo ou um segundo método?",
    "Você tem um conjunto de prompts salvos para as tarefas que repete toda semana?",
    "Você consegue explicar a diferença entre um chatbot, um copiloto e um agente?",
    "Você tem pelo menos uma iniciativa de IA escrita, com dono, métrica e dado necessário?",
  ],
  faixas: [
    { de: 0, ate: 1, nivel: 1 as NivelId, texto: "Você usa IA por conta própria. Começar pelo uso seguro é o melhor primeiro degrau." },
    { de: 2, ate: 3, nivel: 2 as NivelId, texto: "Você já tem hábitos bons; falta transformar uso em processo e escolher bem os projetos." },
    { de: 4, ate: 5, nivel: 3 as NivelId, texto: "Você já tem base para liderar o assunto na sua área." },
  ],
  aviso: "O teste sugere; a conversa com a Giselle confirma.",
};

/** Placar 0–1 = nível 1, 2–3 = nível 2, 4–5 = nível 3. */
export function nivelPeloPlacar(placar: number): NivelId {
  if (placar <= 1) return 1;
  if (placar <= 3) return 2;
  return 3;
}

export function faixaDoPlacar(placar: number) {
  return teste.faixas.find((f) => placar >= f.de && placar <= f.ate) ?? teste.faixas[0];
}

// ---- Textos da página

export const nnf = {
  selo: "NOKAHI EDU · Turma 01",
  assinatura: "Ninguém nasce fluente em IA.",
  assinaturaFim: "A gente aprende junto.",
  sub: "Fluência em IA tem níveis, como num idioma. Escolha a frase que mais parece com você e veja por qual curso começar.",
  pergunta: "Em qual nível você está?",
  alivio: {
    numero: "78%",
    texto: "de quem usa IA no trabalho leva a própria ferramenta, sem orientação da empresa.",
    fonte: "Microsoft e LinkedIn, Work Trend Index 2024",
    fecho: "Quase todo mundo está aprendendo por conta própria. Não é só com você.",
  },
  regras: [
    "Na dúvida entre dois níveis, comece pelo menor. É melhor subir depois do que se frustrar agora.",
    "Ninguém precisa fazer os três. Cada nível se sustenta sozinho.",
  ],
  regraSemGraduacao: "Ainda não tem graduação? Comece pelo nível 2, que não exige.",
  faq: [
    { q: "Preciso saber programar?", a: "Não. Nenhum dos três exige." },
    { q: "Preciso ter faculdade?", a: "Só para o MBA. O curso livre e a extensão não exigem." },
    { q: "Qual eu faço?", a: "Escolha a frase que parece com você. Na dúvida, chame a Giselle no WhatsApp." },
    { q: "E se eu não tiver tempo?", a: "As aulas são gravadas, e você assiste no seu ritmo." },
  ],
  autora: {
    nome: "Profa. Dra. Giselle Couto Falcão",
    texto:
      "Doutora em Modelagem Matemática e Computacional pelo CEFET-MG e em Matemática do Clima pela Sorbonne Université. Atua na interseção entre inteligência artificial, ciência de dados e educação baseada em dados, apoiando organizações a transformar conhecimento técnico em decisão.",
  },
};

/** Resposta da pergunta sobre a condição, conforme a data. */
export function faqCondicao(agora = Date.now()) {
  return condicaoPrimeiraTurmaAtiva(agora)
    ? {
        q: "Até quando vale a condição?",
        a: `Até ${turma.fimCondicao}. Depois, vale o valor regular, e ela não reabre.`,
      }
    : {
        q: "Ainda vale a condição de primeira turma?",
        a: `Não. Ela terminou em ${turma.fimCondicao}, e agora vale o valor regular.`,
      };
}
