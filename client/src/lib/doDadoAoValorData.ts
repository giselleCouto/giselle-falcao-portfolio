// Página de vendas da extensão Do Dado ao Valor (NOKAHI EDU + Anhanguera, via
// Voomp Creators), Turma 01. Destino dos anúncios B2C e página de vendas
// cadastrada no produto da Voomp. Fonte do conteúdo: PPCE V4
// (Cursos_DADOS_IA/PPCE_Validação_Do Dado ao Valor ..._V4.docx, 04/11/2026):
// letramento em Dados e IA, sem hype e com retorno financeiro real.
// Rotas: /do-dado-ao-valor (principal), /extensao (atalho) e
// /do-dado-ao-valor/<canal> (origem da visita e do checkout).
// Regras de texto: ver turma01Data.ts (nunca "pós", "especialização" ou "MBA de 40 h").

import type { Precos } from "./turma01Data";

export const DDV_ROTA = "/do-dado-ao-valor";

export type Aula = { titulo: string; min: number };
export type Modulo = { n: string; titulo: string; texto: string; aulas: Aula[] };

export const doDadoAoValor = {
  //   = espaço inseparável: "Turma 01" nunca quebra em duas linhas no celular
  selo: "NOKAHI EDU · Curso de extensão universitária · Turma 01",
  nome: "Do Dado ao Valor",
  nomeCompleto: "Do Dado ao Valor: Estratégia, Dados e Inteligência Artificial para Líderes",
  tituloInicio: "IA sem hype: saiba quais projetos",
  tituloDestaque: "dão retorno, e quais não dão.",
  sub: "Um curso de extensão universitária de 40 h, 100% on-line, em aulas de 3 a 12 minutos. É letramento em Dados e IA para decidir com critério, qualquer que seja o seu cargo, sem programação e sem exigência de graduação.",
  fatos: ["40 h · 100% on-line", "48 aulas de 3 a 12 minutos", "Sem programação", "Sem exigência de graduação"],
  certificado: "Certificado de extensão universitária emitido pela Anhanguera, instituição credenciada pelo MEC.",

  precos: {
    primeiraTurma: { avista: "R$ 1.750", parcelado: "12× de R$ 152,10", valor: 1750 },
    regular: { avista: "R$ 2.500", parcelado: "12× de R$ 217,10", valor: 2500 },
  } satisfies Precos,

  // ---- O problema (justificativa do PPCE)
  problema: {
    titulo: "O problema raramente é a tecnologia",
    fatos: [
      {
        numero: "88%",
        texto: "das organizações já usavam IA em ao menos uma função em 2025.",
        fonte: "AI Index 2026, Universidade Stanford",
      },
      {
        numero: "30%+",
        texto: "dos projetos de IA generativa seriam abandonados depois da prova de conceito até o fim de 2025.",
        fonte: "Projeção da Gartner",
      },
      {
        numero: "40%+",
        texto: "dos projetos de IA agêntica devem ser cancelados até o fim de 2027.",
        fonte: "Estimativa da Gartner (2025)",
      },
    ],
    texto:
      "Faltam letramento e critério: saber o que é, de fato, um projeto de Dados e IA, separar promessa de evidência, estimar custos e benefícios antes de investir e reconhecer quando um projeto não vai se pagar. Sem essa base, a gente fica entre dois extremos igualmente caros: adotar IA por modismo ou rejeitá-la por desconfiança.",
  },

  // ---- As três respostas que a pessoa leva (aula final do curso)
  respostas: {
    titulo: "Você termina o curso sabendo responder a três perguntas",
    itens: [
      { pergunta: "O que é, de verdade, um projeto de Dados e IA?", texto: "Do problema de negócio ao uso em produção: as etapas, os dados necessários, quem faz o quê e por que tantos pilotos não saem do papel." },
      { pergunta: "Quando um projeto dá retorno, e quando não dá?", texto: "De onde vem o valor, o custo que ninguém coloca na planilha, ROI e payback sem mistério e os sinais de alerta de quem não vai se pagar." },
      { pergunta: "Como eu atuo na transformação, qualquer que seja o meu cargo?", texto: "Pessoas, processos, governança e riscos, inclusive a LGPD, e um roadmap de 100, 180 e 365 dias para a sua organização." },
    ],
  },

  // ---- Conteúdo programático (PPCE V4)
  modulos: [
    {
      n: "01",
      titulo: "IA sem hype: o que Dados e IA realmente fazem",
      texto: "Dados, analytics, machine learning, IA generativa e agentes em linguagem de negócio: o que a IA faz bem, o que faz mal, por que erra e como separar evidência de propaganda.",
      aulas: [
        { titulo: "Boas-vindas: do dado ao valor, sem hype", min: 4 },
        { titulo: "Dados: a matéria-prima das decisões", min: 7 },
        { titulo: "Analytics: olhar para trás para decidir melhor", min: 6 },
        { titulo: "Machine learning: aprender padrões para prever", min: 9 },
        { titulo: "IA generativa: o que os grandes modelos de linguagem fazem", min: 10 },
        { titulo: "Agentes de IA: quando a IA passa a agir", min: 8 },
        { titulo: "Automação, previsão, geração ou ação: qual é o seu problema?", min: 7 },
        { titulo: "O que a IA faz bem e o que faz mal", min: 8 },
        { titulo: "O ciclo do hype: por que tudo parece revolucionário", min: 7 },
        { titulo: "Mitos sobre IA no trabalho e nas empresas", min: 9 },
        { titulo: "Como reconhecer promessas exageradas", min: 8 },
        { titulo: "Síntese do módulo: o que é, e o que não é, IA", min: 7 },
      ],
    },
    {
      n: "02",
      titulo: "O que é um projeto de Dados e IA: do problema ao resultado",
      texto: "Formular o problema e a decisão a melhorar, medir o antes, saber de quais dados o projeto precisa, percorrer o ciclo do piloto à produção e escolher entre comprar, adaptar ou construir.",
      aulas: [
        { titulo: "O que torna um projeto de Dados e IA diferente", min: 7 },
        { titulo: "Comece pelo problema, não pela ferramenta", min: 8 },
        { titulo: "Linha de base e critério de sucesso", min: 7 },
        { titulo: "Os dados de que o projeto precisa", min: 8 },
        { titulo: "Ciclo de vida: da descoberta à produção", min: 9 },
        { titulo: "Piloto não é produto: da demonstração ao uso real", min: 8 },
        { titulo: "Comprar, adaptar ou construir", min: 7 },
        { titulo: "Quem faz o quê em um projeto de Dados e IA", min: 8 },
        { titulo: "Como saber se a solução funciona de verdade", min: 8 },
        { titulo: "Riscos básicos desde o início", min: 6 },
        { titulo: "Estudo de caso: um projeto do problema ao resultado", min: 9 },
        { titulo: "Síntese do módulo: anatomia de um projeto de Dados e IA", min: 5 },
      ],
    },
    {
      n: "03",
      titulo: "Retorno real: projetos de Dados e IA que dão retorno e os que não dão",
      texto: "Fontes de valor, custo total de propriedade, business case em uma página, ROI, payback e cenários, como medir impacto de verdade e quando avançar, ajustar ou abandonar.",
      aulas: [
        { titulo: "De onde vem o valor da IA", min: 8 },
        { titulo: "Produtividade não é lucro: como o ganho vira resultado", min: 7 },
        { titulo: "O custo que ninguém coloca na planilha", min: 9 },
        { titulo: "Business case em uma página", min: 10 },
        { titulo: "ROI e payback sem mistério", min: 8 },
        { titulo: "Cenários: pessimista, provável e otimista", min: 6 },
        { titulo: "Como medir o impacto de verdade", min: 8 },
        { titulo: "Projetos que dão retorno: o que eles têm em comum", min: 8 },
        { titulo: "Projetos que não dão retorno: sinais de alerta", min: 8 },
        { titulo: "Casos reais: quando a IA pagou a conta e quando não pagou", min: 9 },
        { titulo: "Avançar, ajustar ou abandonar", min: 6 },
        { titulo: "Síntese do módulo: as perguntas que todo projeto deve responder", min: 3 },
      ],
    },
    {
      n: "04",
      titulo: "Como atuar na transformação digital de Dados e IA",
      texto: "Maturidade da organização, pessoas e cultura, processos com supervisão humana, governança sem burocracia, LGPD e regulação de IA, priorização e roadmap, e o seu AI Value & Risk Canvas.",
      aulas: [
        { titulo: "Transformação digital não é comprar tecnologia", min: 7 },
        { titulo: "Onde a sua organização está: maturidade em dados e IA", min: 8 },
        { titulo: "Pessoas e cultura: o fator que decide o sucesso", min: 8 },
        { titulo: "Redesenhar processos com IA e supervisão humana", min: 8 },
        { titulo: "Governança de dados e de IA sem burocracia", min: 8 },
        { titulo: "Riscos e responsabilidades: LGPD e regulação de IA", min: 9 },
        { titulo: "Uso responsável de IA generativa no trabalho", min: 7 },
        { titulo: "Priorizar iniciativas: valor, viabilidade e risco", min: 7 },
        { titulo: "Roadmap de 100, 180 e 365 dias", min: 7 },
        { titulo: "Seu papel na transformação, qualquer que seja o cargo", min: 6 },
        { titulo: "AI Value & Risk Canvas: passo a passo", min: 10 },
        { titulo: "Conclusão do curso: do dado ao valor", min: 5 },
      ],
    },
  ] satisfies Modulo[],

  // ---- O entregável
  canvas: {
    titulo: "Você sai com uma decisão pronta, não só com anotações",
    nome: "AI Value & Risk Canvas",
    texto:
      "No último módulo, você preenche o Canvas de uma iniciativa real, da sua empresa ou da sua área, com exemplo resolvido para guiar. Ele reúne valor, custo, risco e prontidão e termina numa decisão clara: avançar, ajustar ou abandonar o projeto.",
  },

  // ---- O que está incluído (estruturação do PPCE)
  inclui: [
    "48 videoaulas de 3 a 12 minutos, 12 por módulo",
    "4 episódios de podcast de 15 minutos, um por módulo",
    "E-book autoral de 20 páginas, em 4 capítulos",
    "4 materiais extras com resolução: caso “deu retorno × não deu”, planilha de business case, checklist de promessas de IA e Canvas resolvido",
    "4 indicações de leitura, de AI Snake Oil ao NIST AI RMF",
    "Grupo da turma no WhatsApp, mediado pela professora",
    "Acesso 24 horas por dia, para estudar no seu ritmo",
  ],
  bonus: [
    { titulo: "Plantão de dúvidas", texto: "Sessões pelo WhatsApp às terças e quintas-feiras, com a Giselle." },
    { titulo: "Radar de IA sem hype", texto: "Atualizações periódicas sobre o que de fato importa nas novidades de Dados e IA." },
    { titulo: "Biblioteca de modelos", texto: "AI Value & Risk Canvas, planilha de business case em uma página e checklist “dá retorno × não dá” para baixar." },
  ],

  // ---- Para quem é (público-alvo do PPCE)
  paraQuem: [
    { titulo: "Gestores, líderes e empreendedores", texto: "que precisam decidir onde investir em dados e IA e cobrar resultados." },
    { titulo: "Profissionais de qualquer área", texto: "de negócio, operações, finanças, marketing, pessoas, saúde, educação e setor público, que vão trabalhar com projetos de IA ou ser impactados por eles." },
    { titulo: "Consultores e profissionais de tecnologia", texto: "que querem traduzir dados e IA em linguagem de negócio e de retorno financeiro." },
    { titulo: "Estudantes e quem está em transição de carreira", texto: "e busca um letramento sólido em dados e IA, sem precisar programar." },
  ],

  faq: [
    { q: "Preciso saber programar?", a: "Não. O curso é todo em linguagem de negócio, com exemplos do dia a dia e planilhas simples." },
    { q: "Preciso ter faculdade?", a: "Não. A extensão não exige graduação. Basta ter interesse em aplicar dados e IA no trabalho ou nos negócios." },
    { q: "Qual é o certificado?", a: "Certificado de extensão universitária emitido pela Anhanguera, instituição credenciada pelo MEC. Ele é emitido quando você conclui 75% do curso." },
    { q: "Quanto tempo leva?", a: "São 40 h ao todo, com aulas de 3 a 12 minutos que ficam disponíveis 24 horas por dia. Você define o seu ritmo, e o conteúdo cabe na rotina de quem trabalha." },
    { q: "Qual a diferença para o MBA?", a: "A extensão tem 40 h, não exige graduação e dá o letramento para decidir sobre projetos de Dados e IA. O MBA Executivo é uma especialização lato sensu de 380 h em 12 meses, para quem tem graduação e vai liderar a estratégia de IA. A extensão é a porta de entrada do MBA." },
    { q: "Como tiro dúvidas?", a: "No grupo da turma no WhatsApp, mediado pela Giselle, nos plantões de terça e quinta e pelo e-mail giselle@coutofalcao.com." },
    { q: "Quando começa?", a: "A Turma 01 começa em 25/01/2027. As inscrições vão até 22/01/2027." },
    { q: "Como é o pagamento?", a: "Pelo checkout da Voomp Creators, à vista ou em até 12× no cartão." },
  ],

  notaLegal:
    "Do Dado ao Valor é um curso de extensão universitária, na modalidade a distância, ofertado em parceria com a Anhanguera, instituição credenciada pelo MEC, que emite o certificado.",
};
