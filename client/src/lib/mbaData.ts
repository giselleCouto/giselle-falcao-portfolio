// Página de vendas do MBA Executivo em Estratégia de IA e Transformação
// Empresarial (NOKAHI EDU + Anhanguera, via Voomp Creators), Turma 01.
// Destino dos anúncios B2C (Instagram/Facebook) e página de vendas cadastrada
// no produto da Voomp. Fonte do conteúdo: PPC v3 (pos_graduacao/PCP007450_..._v3).
// Rotas: /mba (principal) e /mba/<canal> (origem da visita e do checkout).
// Regras de texto: ver turma01Data.ts.

import type { Precos } from "./turma01Data";

export const MBA_ROTA = "/mba";

export type Disciplina = {
  n: number;
  titulo: string;
  horas: string;
  /** O que a pessoa aprende, em linguagem simples (resumo da ementa do PPC) */
  texto: string;
  anhanguera?: boolean;
};

export const mba = {
  //   = espaço inseparável: "Turma 01" nunca quebra em duas linhas no celular
  selo: "NOKAHI EDU · MBA Executivo · Turma 01",
  nome: "MBA Executivo em Estratégia de IA e Transformação Empresarial",
  nomeCurto: "MBA Executivo",
  tituloInicio: "Todo mundo já usa IA. Falta quem saiba",
  tituloDestaque: "decidir onde ela gera valor.",
  sub: "Um MBA para quem decide, lidera ou financia iniciativas de Dados e IA: priorizar os casos de uso certos, provar que a solução funciona, governar os riscos e sair do piloto com um plano de 100, 180 e 365 dias.",
  fatos: ["380 h em 12 meses", "100% on-line", "Sem programação", "Para quem tem graduação, em qualquer área"],
  certificado:
    "Certificado de especialização lato sensu emitido pela Anhanguera, instituição credenciada pelo MEC, com histórico escolar.",

  precos: {
    primeiraTurma: { avista: "R$ 6.200", parcelado: "12× de R$ 521,00", valor: 6200 },
    regular: { avista: "R$ 9.000", parcelado: "12× de R$ 781,50", valor: 9000 },
  } satisfies Precos,

  // ---- Por que agora (urgência verdadeira, com fonte)
  porQueAgora: {
    titulo: "A IA já chegou à empresa. O que falta é liderança.",
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
        numero: "2026",
        texto: "é o ano em que o regulamento europeu de IA (AI Act) passou a ser aplicável, com obrigações escalonadas.",
        fonte: "Regulamento (UE) 2024/1689",
      },
    ],
    fecho:
      "No Brasil, a LGPD já garante a revisão de decisões tomadas só por sistemas automatizados (art. 20), e o PL 2.338/2023, aprovado no Senado, tramita na Câmara. Pilotos que não chegam à produção, investimento sem business case e uso de IA generativa sem regra viraram assunto de diretoria. O gargalo deixou de ser só tecnológico: faltam pessoas que saibam decidir, provar e governar.",
  },

  // ---- As 5 perguntas que os conselhos fazem (eixo do curso, segundo o PPC)
  perguntas: {
    titulo: "As cinco perguntas que a diretoria vai fazer a você",
    intro: "O MBA foi desenhado em torno delas. Ao final, você sabe responder a cada uma com números e evidências.",
    itens: [
      { pergunta: "Onde a IA cria valor econômico ou estratégico no nosso negócio?", onde: "Estratégia · Economia da IA" },
      { pergunta: "Quais dados, capacidades e processos precisamos para capturar esse valor?", onde: "Arquitetura · BPM" },
      { pergunta: "Como provar que o modelo ou o agente funciona, com segurança e confiabilidade?", onde: "Avaliação de Modelos e Agentes" },
      { pergunta: "Como sair do piloto e operar em escala, com governança e custo controlado?", onde: "IA Generativa · MLOps · Governança" },
      { pergunta: "Como transformar a iniciativa em resultado mensurável em 100, 180 e 365 dias?", onde: "AI Value & Risk Blueprint" },
    ],
  },

  // ---- Matriz curricular (ordem do PPC v3; uma disciplina abre por mês)
  disciplinas: [
    {
      n: 1,
      titulo: "Estratégia de Dados e IA: valor, vantagem e portfólio",
      horas: "40 h",
      texto: "Onde dados e IA viram vantagem competitiva e como montar um portfólio priorizado de casos de uso, com métricas de adoção e de valor.",
    },
    {
      n: 2,
      titulo: "Fundamentos Quantitativos para Decisões com IA",
      horas: "20 h",
      texto: "Estatística, probabilidade, métricas de avaliação e matemática financeira de forma intuitiva, em planilha e sem pré-requisito de cálculo.",
    },
    {
      n: 3,
      titulo: "Economia da IA, Business Case, ROI e priorização",
      horas: "40 h",
      texto: "Business case com linha de base, custo total de propriedade, VPL, TIR e payback; experimentos para medir impacto e critérios de go/no-go.",
    },
    {
      n: 4,
      titulo: "Foresight Estratégico",
      horas: "40 h",
      texto: "Sinais fracos, tendências e cenários para antecipar futuros, apoiar a inovação e gerir riscos.",
      anhanguera: true,
    },
    {
      n: 5,
      titulo: "Arquitetura de Dados, Operating Model e escala",
      horas: "40 h",
      texto: "Data lake, lakehouse, produtos de dados, data mesh e modelos operacionais para sustentar a IA em escala, com custo controlado.",
    },
    {
      n: 6,
      titulo: "Transformação Organizacional através da Gestão por Processos de Negócios (BPM)",
      horas: "40 h",
      texto: "Gestão por processos integrada à estratégia, aos projetos e à experiência do cliente.",
      anhanguera: true,
    },
    {
      n: 7,
      titulo: "IA Generativa, RAG e Agentes Corporativos",
      horas: "40 h",
      texto: "Como funcionam os grandes modelos de linguagem, o RAG e os agentes; segurança, supervisão humana e um protótipo guiado com dados públicos ou anonimizados.",
    },
    {
      n: 8,
      titulo: "Avaliação de Modelos e Agentes, MLOps e LLMOps",
      horas: "40 h",
      texto: "O eixo do curso: provar se um modelo ou agente funciona no seu contexto, e não só na demonstração, e operar com monitoramento, versionamento e rollback.",
    },
    {
      n: 9,
      titulo: "Agile Leadership Practices",
      horas: "40 h",
      texto: "Cultura e liderança ágil para conduzir equipes durante a transformação.",
      anhanguera: true,
    },
    {
      n: 10,
      titulo: "Governança, Liderança e AI Value & Risk Blueprint",
      horas: "40 h",
      texto: "Governança e riscos com NIST AI RMF, ISO/IEC 42001, AI Act e LGPD; liderança da mudança; integração e defesa do seu Blueprint.",
    },
  ] satisfies Disciplina[],

  // ---- O entregável final
  blueprint: {
    titulo: "Você termina com um plano que se defende diante da diretoria",
    nome: "AI Value & Risk Blueprint",
    texto:
      "Construído aos poucos, disciplina a disciplina, para uma organização real ou um caso anonimizado. No fim do curso, você integra tudo e defende o plano.",
    partes: [
      "Estratégia e portfólio priorizado de casos de uso",
      "Business case com custos, retorno e cenários",
      "Arquitetura e modelo operacional de dados",
      "Avaliação do modelo ou agente, com critérios de go/no-go",
      "Governança, riscos e conformidade (LGPD e AI Act)",
      "Roadmap de 100, 180 e 365 dias",
    ],
  },

  // ---- Como é estudar
  comoEstudar: [
    { titulo: "Aulas gravadas", texto: "Videoaulas para assistir quando e onde quiser, no celular ou no computador." },
    { titulo: "E-books autorais", texto: "Material escrito com casos, exemplos e referências para consultar sempre que precisar." },
    { titulo: "Podcast", texto: "Episódios de 15 minutos para revisar o conteúdo no trânsito ou entre uma reunião e outra." },
    { titulo: "Casos e exercícios resolvidos", texto: "Estudos de caso construídos a partir de fontes públicas, listas com resolução e navegações guiadas." },
    { titulo: "Tutoria pelo WhatsApp", texto: "Plantões de dúvidas às terças e quintas-feiras, além do e-mail de apoio." },
    { titulo: "Aula ao vivo mensal", texto: "Um encontro por mês, de tema transversal, pelo Google Meet, com gravação no ambiente do curso." },
  ],
  ritmo:
    "Uma nova disciplina abre a cada mês. Cada uma termina com uma avaliação virtual; para ser aprovado, são 75% de frequência e nota 7 ou mais.",

  // ---- Para quem é
  paraQuem: [
    "Diretoras, diretores e executivos responsáveis por investimento e transformação",
    "Heads e gerentes de Dados, IA, Produto, Tecnologia, Inovação, Operações e Risco",
    "Líderes de unidades de negócio que precisam priorizar casos de uso e medir valor",
    "Consultoras, consultores, empreendedoras e empreendedores",
    "Profissionais técnicos que precisam traduzir arquitetura e modelos para a diretoria",
  ],
  naoEPara: [
    "Quem quer aprender a programar: o MBA não ensina código.",
    "Quem ainda não tem graduação concluída. Nesse caso, comece pela extensão Do Dado ao Valor, que não exige.",
  ],

  // ---- Corpo docente (PPC v3)
  docentes: [
    { nome: "Profa. Dra. Giselle Couto Falcão", titulo: "Doutora · coordenação pedagógica", disciplinas: "Estratégia · Arquitetura · Governança e Blueprint" },
    { nome: "Prof. Dr. Edgar Lacerda Aguiar", titulo: "Doutor", disciplinas: "IA Generativa, RAG e Agentes · Avaliação de Modelos e Agentes" },
    { nome: "Profa. Simone Moura", titulo: "Especialista", disciplinas: "Fundamentos Quantitativos · Economia da IA" },
    { nome: "Docentes da Anhanguera", titulo: "Mestres e especialistas", disciplinas: "Foresight · BPM · Agile Leadership" },
  ],

  faq: [
    { q: "Preciso saber programar?", a: "Não. O MBA é para quem decide e lidera. Ele exige alfabetização em dados, IA, risco e decisão, e isso é desenvolvido ao longo do curso, a começar pela disciplina de Fundamentos Quantitativos, que não pede cálculo." },
    { q: "Preciso ter graduação?", a: "Sim: graduação concluída, em qualquer área, com diploma registrado. Se você ainda não tem, a extensão Do Dado ao Valor não exige graduação e é uma boa porta de entrada." },
    { q: "Qual é o certificado?", a: "Certificado de especialização lato sensu emitido pela Anhanguera, instituição credenciada pelo MEC, acompanhado de histórico escolar. Para receber, são 75% de frequência e nota 7 ou mais em todas as disciplinas." },
    { q: "Quanto tempo preciso por semana?", a: "Uma nova disciplina abre a cada mês. Para acompanhar esse ritmo, conte com cerca de 10 horas por semana. As aulas são gravadas, então você escolhe os dias e os horários." },
    { q: "Tem aula ao vivo?", a: "Sim, uma por mês, de tema transversal, pelo Google Meet. Ela fica gravada no ambiente do curso para quem não puder assistir na hora." },
    { q: "Como tiro dúvidas durante o curso?", a: "Pela tutoria no WhatsApp, com plantões às terças e quintas-feiras, e pelo e-mail de apoio." },
    { q: "Quando começa?", a: "A Turma 01 começa em 25/01/2027. As inscrições vão até 22/01/2027." },
    { q: "Como é o pagamento?", a: "Pelo checkout da Voomp Creators, à vista ou em até 12× no cartão." },
  ],

  notaLegal:
    "O MBA Executivo em Estratégia de IA e Transformação Empresarial é um curso de pós-graduação lato sensu (especialização), na modalidade a distância, ofertado em parceria com a Anhanguera, instituição credenciada pelo MEC, que emite o certificado.",
};
