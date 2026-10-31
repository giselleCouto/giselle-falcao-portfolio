// Página do Kit de Letramento da série Fluente em IA (NOKAHI EDU, out/2026).
// Destino dos anúncios e das descrições da série no YouTube, Instagram,
// LinkedIn e TikTok. Cada canal tem a sua rota curta (/fluente/youtube...),
// que vira a origem do lead e da visita — mesmo sem ?src= no link.
// O PDF é a isca da Máquina de Anúncios (marketing/iscas/). Até 12/12/2026
// vale a versão com a condição de primeira turma; depois, a de preço regular.
// Regras: tom amigável e coletivo, sem pressão; só urgência verdadeira.

export const FLUENTE_ROTA = "/fluente";

export const FLUENTE_CANAIS = ["youtube", "instagram", "linkedin", "tiktok"] as const;
export type FluenteCanal = (typeof FLUENTE_CANAIS)[number];

/** Fim da condição de primeira turma (12/12/2026, 23h59 em Brasília) */
const FIM_PRIMEIRA_TURMA = new Date("2026-12-13T00:00:00-03:00").getTime();

export function condicaoPrimeiraTurmaAtiva(agora = Date.now()) {
  return agora < FIM_PRIMEIRA_TURMA;
}

export function kitPdfUrl(agora = Date.now()) {
  return condicaoPrimeiraTurmaAtiva(agora)
    ? "/iscas/Kit-de-Letramento-Fluente-em-IA.pdf"
    : "/iscas/a-partir-de-13-12/Kit-de-Letramento-Fluente-em-IA.pdf";
}

export const fluente = {
  selo: "NOKAHI EDU · Série Fluente em IA",
  titulo: "Use IA com critério, não só com pressa.",
  sub: "Baixe grátis o Kit de Letramento: os cinco entregáveis da série reunidos em 7 páginas, prontos para imprimir, preencher e usar no trabalho a partir de hoje.",

  perfis: [
    "Uso IA no meu trabalho",
    "Lidero uma equipe",
    "Decido sobre investimentos em IA",
    "Ainda estou começando",
  ],

  entregaveis: [
    {
      n: "01",
      ep: "Ep. 1",
      titulo: "Autoavaliação de 5 perguntas",
      texto: "Descubra em qual estágio você está e qual é o próximo degrau.",
      imagem: "/iscas/kit-fluente/pagina-2.jpg",
    },
    {
      n: "02",
      ep: "Ep. 2",
      titulo: "Semáforo do Dado",
      texto: "Verde, amarelo e vermelho para o que entra na IA; 3 perguntas para o que sai.",
      imagem: "/iscas/kit-fluente/pagina-3.jpg",
    },
    {
      n: "03",
      ep: "Ep. 3",
      titulo: "Ficha de Caso de Uso",
      texto: "Tarefa, entrada, saída, critério, verificação e risco do dado.",
      imagem: "/iscas/kit-fluente/pagina-4.jpg",
    },
    {
      n: "04",
      ep: "Ep. 4",
      titulo: "As 7 perguntas antes de aprovar",
      texto: "O filtro antes de aprovar um projeto, e a prova de 6 semanas com critério de parada.",
      imagem: "/iscas/kit-fluente/pagina-5.jpg",
    },
    {
      n: "05",
      ep: "Ep. 5",
      titulo: "Matriz valor × prontidão e plano de 90 dias",
      texto: "Valor × prontidão para priorizar; 90 dias para sair do papel.",
      imagem: "/iscas/kit-fluente/pagina-6.jpg",
    },
  ],

  porQueAgora:
    "Na União Europeia, letramento em IA já é obrigação legal desde 02/02/2025 (Regulamento 2024/1689, art. 4). Quem usa IA no trabalho precisa saber o que pode colar, como conferir a resposta e quando dizer não.",

  mandePara: [
    { quem: "Uma pessoa que executa", porque: "Para trocar o “pedir” por uma ficha." },
    { quem: "Uma pessoa que decide", porque: "Para levar as 7 perguntas à próxima reunião." },
    { quem: "Uma pessoa que ainda tem medo", porque: "Para começar pelo semáforo, com segurança." },
  ],

  autora: {
    nome: "Profa. Dra. Giselle Couto Falcão",
    texto:
      "Doutora em Modelagem Matemática e Computacional pelo CEFET-MG e em Matemática do Clima pela Sorbonne Université. Atua na interseção entre inteligência artificial, ciência de dados e educação baseada em dados, apoiando organizações a transformar conhecimento técnico em decisão.",
  },

  proximoPasso: {
    titulo: "O próximo passo, quando fizer sentido",
    nome: "Do Dado ao Valor",
    texto:
      "Extensão universitária de 40 h em 4 semanas, 100% on-line, sem programação e sem exigência de graduação. Você leva uma iniciativa da sua empresa até a diretoria, com tese de valor, critérios de prova, riscos e roadmap, e termina com o seu AI Value & Risk Canvas.",
    certificado: "Certificado de extensão universitária emitido pela Anhanguera, instituição credenciada pelo MEC.",
    turma: "Primeira turma começa em 25/01/2027, com inscrições até 22/01/2027.",
    condicao: "Condição de primeira turma até 12/12/2026: os valores estão na última página do kit.",
  },

  youtube: "https://www.youtube.com/@GiselleCFalcao",
};
