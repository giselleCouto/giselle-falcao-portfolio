// Página de vendas do curso livre Fluente em IA completo (NOKAHI EDU, via Voomp
// Creators), Turma 01. É a entrada própria do curso para os anúncios: quem
// chega vê a oferta direto, sem escolher entre os três níveis da /nivel.
// Rotas: /fluente-completo (principal) e /fluente-completo/<canal> (origem da
// visita e do checkout). A /fluente continua sendo o Kit de Letramento (grátis).
//
// Fonte do conteúdo: a grade do curso cadastrada na Voomp (7 módulos, 40 aulas,
// 10 h; cursos-livres/fluente-em-ia-completo/voomp/grade-de-aulas.csv) e o
// nível 1 de ninguemNasceFluenteData.ts. Preço, cupom e link de inscrição vêm
// de lá e de turma01Data.ts: nada de valor ou data digitado aqui.
//
// Regras de texto: ver turma01Data.ts. Neste curso:
// - "certificado de conclusão de curso livre", emitido pela NOKAHI EDU. Não é
//   da Anhanguera; MEC só aparece na nota legal de curso livre.
// - Garantia de 7 dias (cadastrada no produto 17873 da Voomp).
// - A Giselle é "mestre e doutoranda", nunca "doutora".

import { getNivel, nnf } from "./ninguemNasceFluenteData";
import { turma01, type Precos } from "./turma01Data";

export const FLUENTE_COMPLETO_ROTA = "/fluente-completo";

const nivel1 = getNivel(1);

/** "R$ 1.750" → 1750 (valor para o Pixel da Meta e para os dados estruturados) */
function valorEmReais(avista: string): number {
  return Number(avista.replace(/[^\d,]/g, "").replace(",", "."));
}

export type ModuloFluente = { n: number; titulo: string; aulas: string[] };

export const fluenteCompleto = {
  //   = espaço inseparável: "Turma 01" nunca quebra em duas linhas no celular
  selo: "NOKAHI EDU · Curso livre · Turma 01",
  nome: nivel1.curso,
  tituloInicio: `${nivel1.curso}:`,
  tituloDestaque: "use IA com critério, não só com pressa.",
  // Primeira tela no celular: uma linha de promessa e o formato em uma linha
  promessa: "Para usar IA no dia a dia com segurança, conferir as respostas e montar o seu plano de 90 dias.",
  emResumo: "10 h em 7 módulos · aulas gravadas · sem programação",
  nomeCompleto: `${nivel1.curso}: a versão completa da série Fluente em IA`,
  sub: "Um curso livre de 10 h, 100% on-line, com aulas gravadas para assistir no seu ritmo. Você descobre em que nível está, aprende a usar IA sem risco, a conferir o que ela responde e a medir o ganho, e termina com um plano de 90 dias. Sem programação, e qualquer pessoa pode fazer.",
  fatos: ["10 h · 100% on-line", "7 módulos, no seu ritmo", "Sem programação", "Qualquer pessoa pode fazer"],
  certificado:
    "Certificado de conclusão de curso livre, emitido pela NOKAHI EDU quando você conclui todas as aulas.",

  // Os mesmos valores do nível 1 da /nivel (uma fonte só)
  precos: {
    primeiraTurma: { ...nivel1.precos.primeiraTurma, valor: valorEmReais(nivel1.precos.primeiraTurma.avista) },
    regular: { ...nivel1.precos.regular, valor: valorEmReais(nivel1.precos.regular.avista) },
  } satisfies Precos,

  // ---- Para quem é
  paraQuem: {
    frase: nivel1.frase,
    titulo: "Para quem já usa IA no trabalho e quer usar com segurança",
    itens: [
      "Você usa IA no dia a dia e nunca sabe se pode confiar na resposta.",
      "Você tem receio de colar o que não devia: dado de cliente, contrato, dado pessoal.",
      "Você quer mostrar, com número, o que a IA melhora no seu trabalho.",
      "Você quer levar o assunto para o seu gestor e para o seu time, sem atropelo.",
    ],
    alivio: nnf.alivio,
  },
  naoEPara: [
    "Quem quer aprender a programar: o curso não ensina código.",
    "Quem precisa escolher quais projetos de IA dão retorno: para isso existe a extensão Do Dado ao Valor.",
    "Quem vai liderar a estratégia de IA da empresa: para isso existe o MBA Executivo.",
  ],

  // ---- O percurso (títulos das aulas como estão na grade do curso)
  percurso: {
    titulo: "5 módulos de conteúdo, do seu nível ao plano de 90 dias",
    intro:
      "Cada módulo começa com o episódio gratuito da série Fluente em IA, aprofunda o tema em videoaulas de 4 a 12 minutos e termina com uma avaliação curta. Antes deles, um módulo de boas-vindas; depois, a conclusão e o certificado.",
    modulos: [
      {
        n: 1,
        titulo: "Onde você está e a conversa com o seu gestor",
        aulas: [
          "O diagnóstico completo: 15 perguntas, 5 capacidades",
          "A sua trilha de 30 dias",
          "A conversa com o seu gestor",
        ],
      },
      {
        n: 2,
        titulo: "Usar IA sem risco: LGPD, política e conferência",
        aulas: [
          "LGPD sem juridiquês",
          "A política de uso de IA em uma página",
          "Conferência por tipo de conteúdo",
        ],
      },
      {
        n: 3,
        titulo: "Dados na prática: inventário, qualidade e soluções reais",
        aulas: [
          "O inventário de dados da sua área",
          "Dá para confiar? O teste de qualidade",
          "Cinco jeitos de transformar dado em solução",
        ],
      },
      {
        n: 4,
        titulo: "Produtividade com número: receitas, medição e biblioteca do time",
        aulas: ["Seis receitas por área", "Medir em duas semanas", "A biblioteca do time"],
      },
      {
        n: 5,
        titulo: "Liderar a mudança com o seu time",
        aulas: [
          "As sete perguntas, a fundo",
          "A oficina de uma hora com o seu time",
          "Cuidar das pessoas",
        ],
      },
    ] satisfies ModuloFluente[],
  },

  // ---- O que está incluído
  inclui: {
    titulo: "Tudo o que você recebe",
    texto:
      "O curso é feito para usar no trabalho: cada módulo deixa com você um material pronto para imprimir, preencher e aplicar.",
    itens: [
      "Videoaulas gravadas, de 4 a 12 minutos, para assistir quando e onde quiser",
      "Um guia do curso e um kit em PDF por módulo",
      "Três planilhas de prática: qualidade dos dados, medição de duas semanas e custo de operar",
      "Cinco avaliações curtas, uma ao fim de cada módulo",
      "Certificado de conclusão de curso livre, emitido pela NOKAHI EDU",
      "7 dias de garantia",
    ],
  },

  // ---- Quem conduz (títulos conferidos: mestre e doutoranda)
  autora: {
    nome: "Giselle Couto Falcão",
    resumo:
      "Mestre e doutoranda em Modelagem Matemática e Computacional pelo CEFET-MG, com MBA in Data Science pela University of Hartford. Professora há mais de 18 anos, no ensino básico e no superior, desenha e coloca em operação soluções de IA para a indústria, a logística, o agro, a educação e o setor público.",
  },

  faq: [
    { q: "Preciso saber programar?", a: "Não. O curso é para usar IA no trabalho com segurança, e não ensina código." },
    { q: "Preciso ter faculdade?", a: "Não. É um curso livre, e qualquer pessoa pode fazer." },
    {
      q: "Qual é a diferença para a série gratuita no YouTube?",
      a: "A série gratuita Fluente em IA tem cinco episódios. O curso completo aprofunda cada um deles em um módulo, com videoaulas novas, kits em PDF, planilhas de prática e avaliações.",
    },
    {
      q: "E se eu não tiver tempo?",
      a: "As aulas são gravadas e curtas. São 10 h no total, e você assiste no seu ritmo.",
    },
    {
      q: "Tem certificado?",
      a: "Sim: certificado de conclusão de curso livre, emitido pela NOKAHI EDU quando você conclui todas as aulas.",
    },
    { q: "Tem garantia?", a: "Sim. O curso tem 7 dias de garantia." },
    {
      q: "Quando começa?",
      a: `A ${turma01.nome} começa em ${turma01.inicio}. As inscrições vão até ${turma01.fimInscricoes}.`,
    },
    { q: "Como é o pagamento?", a: "Pelo checkout da Voomp Creators, à vista ou em até 12× no cartão." },
  ],

  notaLegal:
    "Fluente em IA completo é um curso livre de capacitação profissional, nos termos da Lei nº 9.394/96 (LDB) e do Decreto nº 5.154/2004, não sujeito a autorização do MEC. O certificado de conclusão é emitido pela NOKAHI EDU.",
};
