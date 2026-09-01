// Turma Fundadora — "Mentoria Trajetória em Dados & IA" (nome provisório,
// validar a transformação primeiro). Plano definido pela Giselle: 4 semanas,
// 3 resultados (clareza de caminho, prova prática, plano de 90 dias),
// aberta a todos com compromisso especial com mulheres na tecnologia.
// Promessa honesta: sem emprego garantido, sem "dominar tudo em 4 semanas".

export const trajetoria = {
  name: "Mentoria Trajetória em Dados & IA",
  badge: "Turma Fundadora · vagas limitadas",
  heroTitle: "Transforme confusão em direção — e direção em movimento.",
  heroSubtitle:
    "Uma mentoria prática de quatro semanas para profissionais que desejam iniciar, migrar ou reposicionar sua carreira em Dados e Inteligência Artificial, aproveitando a experiência que já possuem.",
  compromissoCurto:
    "Aberta a homens e mulheres, com um compromisso especial de ampliar a presença e a progressão de mulheres em tecnologia.",

  promessa:
    "Em quatro semanas, você identificará a trajetória mais aderente ao seu perfil, entenderá quais competências precisa desenvolver, construirá um primeiro caso para demonstrar sua capacidade e sairá com um plano profissional de 90 dias.",

  resultados: [
    {
      titulo: "Clareza sobre qual caminho seguir",
      texto:
        "Entre analista, cientista, engenharia, produtos de IA ou IA aplicada à sua área de origem — você escolhe uma função-alvo com critério, em vez de estudar tudo ao mesmo tempo.",
    },
    {
      titulo: "Uma primeira prova prática de capacidade",
      texto:
        "Um caso orientado — análise de dados, machine learning ou aplicação de IA — que demonstra seu raciocínio profissional, com dados, notebook e modelos fornecidos.",
    },
    {
      titulo: "Um plano de execução para os próximos 90 dias",
      texto:
        "O que estudar, o que construir, como se posicionar e como se candidatar — com LinkedIn, currículo e apresentação pessoal revisados.",
    },
  ],

  // As dúvidas que a turma fundadora responde
  perguntas: [
    "Por onde eu começo?",
    "Preciso aprender a programar?",
    "Qual área combina comigo?",
    "Como posso usar a experiência que já tenho?",
    "Como construir um projeto que o mercado reconheça?",
  ],

  // "O momento" — leitura honesta da era turbulenta da IA, a partir do
  // ensaio de Bill Gates (Gates Notes, ago/2026), usada como bússola das
  // mentorias: esperança com método, não pânico nem negação.
  momento: {
    badge: "Por que agora",
    titulo: "Vivemos a era mais turbulenta — e mais aberta — da tecnologia",
    paragrafos: [
      "Em agosto de 2026, Bill Gates publicou um dos ensaios mais francos já escritos sobre este momento: a transição da IA será turbulenta, as funções de entrada e de nível médio — inclusive em análise de dados e atendimento — serão as primeiras a sentir, e a mudança virá comprimida em uma década, não em gerações.",
      "O mesmo ensaio, porém, é claro sobre o outro lado: na medicina, na educação, na agricultura e nos serviços públicos, a IA pode ampliar o acesso a conhecimento especializado como nenhuma tecnologia anterior. E nada disso acontece automaticamente — depende de pessoas que entendem problemas reais e usam a tecnologia com critério.",
      "É exatamente nessa fresta que esta mentoria trabalha: transformar a incerteza em direção, e a direção em movimento. Não com promessas, mas com método.",
    ],
    escolhas: [
      {
        de: "Incerteza",
        para: "Direção",
        texto:
          "Quando os mapas antigos de carreira perdem validade, escolher uma função-alvo com critério vale mais do que colecionar certificados. É o trabalho da Semana 1.",
      },
      {
        de: "Automação do básico",
        para: "Pensamento crítico",
        texto:
          "A IA automatiza a tarefa; quem formula o problema, julga a resposta e decide fica mais valioso. É o raciocínio da Semana 2 — e a habilidade que Gates aponta como vital nesta era.",
      },
      {
        de: "Mudança acelerada",
        para: "Movimento com método",
        texto:
          "Esperança não é esperar: é um plano de 90 dias executado. Sua experiência de setor somada à IA aplicada é a combinação mais difícil de automatizar. São as Semanas 3 e 4.",
      },
    ],
    citacao: "We need a plan to ensure that the good outweighs the bad.",
    citacaoAutor: "Bill Gates, “The turbulent AI era is here” (Gates Notes, ago/2026)",
    citacaoFecho: "Esta mentoria é esse plano — na escala da sua carreira.",
    linkEnsaio: "https://www.gatesnotes.com/a-turbulent-ai-era-and-critical-choices-to-make",
  },

  paraQuem: [
    "Já possui alguma experiência de trabalho — em administração, engenharia, educação, saúde, finanças, logística, tecnologia ou áreas correlatas",
    "Deseja entrar ou se reposicionar em Dados e IA",
    "Está perdido(a) entre cursos, ferramentas e diferentes cargos",
    "Tem dificuldade para transformar estudos em projetos e oportunidades",
    "Consegue dedicar de 4 a 6 horas semanais",
    "Possui conhecimentos digitais básicos — saber programar não é obrigatório",
  ],

  naoE: [
    "Para quem espera aprender programação do zero em quatro semanas",
    "Para profissionais seniores buscando aprofundamento avançado em MLOps ou arquitetura",
    "Para quem espera emprego garantido ao final",
    "Para quem não consegue participar dos encontros ao vivo",
    "Para quem deseja apenas o certificado",
    "Para quem não está disposto(a) a executar as atividades",
  ],

  formato: [
    { item: "Duração", valor: "4 semanas" },
    { item: "Encontro principal", valor: "2 horas por semana, ao vivo" },
    { item: "Plantão coletivo de dúvidas", valor: "1 hora por semana" },
    { item: "Sessão individual", valor: "30 minutos por participante" },
    { item: "Grupo de acompanhamento", valor: "Comunicação assíncrona durante o programa" },
    { item: "Projeto", valor: "Um caso prático orientado (3 modelos à escolha)" },
    { item: "Encerramento", valor: "Apresentação dos projetos (5 minutos cada)" },
    { item: "Dedicação esperada", valor: "4 a 6 horas semanais" },
    { item: "Gravações", valor: "Disponíveis durante o programa" },
  ],

  semanas: [
    {
      n: 1,
      titulo: "Encontre sua direção",
      tema: "Onde você está e qual caminho em Dados e IA faz sentido para você?",
      texto:
        "As diferenças reais entre Dados, Machine Learning, IA e IA generativa; os principais cargos do mercado; as competências transferíveis da sua profissão atual — e a escolha de uma função-alvo para os próximos seis meses.",
      entrega: "Função-alvo, setor-alvo, competências que já possui, lacunas prioritárias e plano inicial de aprendizado.",
    },
    {
      n: 2,
      titulo: "Pense como profissional de Dados e IA",
      tema: "A tecnologia começa pelo problema, não pela ferramenta.",
      texto:
        "Como identificar uma dor real e transformá-la em pergunta; quando usar análise, previsão, classificação, otimização ou IA generativa — e quando NÃO usar IA; custo, risco e impacto. Você preencherá o Canvas de Caso de IA em 10 campos.",
      entrega: "Um caso de uso de Dados ou IA estruturado em uma página.",
    },
    {
      n: 3,
      titulo: "Transforme conhecimento em prova de capacidade",
      tema: "Como construir um projeto que demonstre seu raciocínio profissional.",
      texto:
        "Três modelos de projeto à escolha — análise de dados, machine learning ou aplicação de IA — com base de dados, contexto, dicionário de variáveis, notebook orientado e modelo de apresentação fornecidos. O projeto não precisa ser sofisticado: precisa mostrar entendimento, método, decisão e comunicação.",
      entrega: "Primeira versão do projeto e apresentação de cinco minutos.",
    },
    {
      n: 4,
      titulo: "Posicione-se e entre em movimento",
      tema: "Como transformar preparação em oportunidades.",
      texto:
        "Como apresentar sua transição; LinkedIn e currículo orientados à função-alvo; como abordar profissionais e pedir orientação sem pedir emprego; preparação para entrevistas e um plano consistente de candidaturas.",
      entrega: "Projeto documentado, LinkedIn revisado, currículo direcionado, apresentação profissional e plano de 90 dias.",
    },
  ],

  entregaveis: [
    "Diagnóstico profissional individual",
    "Trilha de carreira recomendada",
    "Matriz de competências",
    "Plano de desenvolvimento",
    "Caso prático para portfólio",
    "Narrativa profissional de transição",
    "LinkedIn e currículo direcionados",
    "Apresentação pessoal de 60 segundos",
    "Estratégia de relacionamento e candidaturas",
    "Plano de execução de 90 dias",
  ],

  investimento: {
    precoOficial: "R$ 1.997",
    precoFundador: "R$ 1.497",
    parcelamento: "Possibilidade de parcelamento",
    justificativa:
      "A condição fundadora existe porque as primeiras pessoas também ajudam a validar e aprimorar o formato — com o mesmo compromisso de entrega e acompanhamento próximo.",
    vagas: "12 vagas",
    bolsas: "Até 2 bolsas integrais para mulheres em situação de vulnerabilidade econômica",
  },

  compromissoMulheres:
    "A mentoria é aberta a profissionais que desejam construir uma trajetória em Dados e IA. Ao mesmo tempo, possui um compromisso especial com a ampliação da presença e da progressão de mulheres na tecnologia — com bolsas dedicadas, ambiente de respeito e, após o programa, um encontro opcional de fortalecimento e networking para mulheres.",

  avisoHonesto:
    "Esta mentoria não promete emprego, promoção nem domínio técnico completo em quatro semanas — ninguém domina Dados e IA nesse prazo, e desconfie de quem prometer. O que ela entrega é método, acompanhamento, feedback honesto e um caminho estruturado: clareza sobre a direção, uma primeira prova prática de capacidade e um plano de 90 dias que você precisará executar.",

  selecao:
    "As vagas não são preenchidas por ordem de chegada nem apenas pela capacidade de pagamento: cada candidatura é analisada por aderência e compromisso, e as pessoas selecionadas são convidadas para uma conversa individual antes da confirmação.",

  ctaForm: "Quero me candidatar à Turma Fundadora",
};

// Opções dos campos fechados do formulário de candidatura
export const FUNCOES_INTERESSE = [
  "Análise de Dados e BI",
  "Ciência de Dados e Machine Learning",
  "Engenharia e Arquitetura de Dados",
  "Produtos e projetos de IA",
  "IA aplicada à minha área atual",
  "Ainda não sei — quero descobrir na mentoria",
];

export const HORAS_SEMANA = ["Menos de 4 horas", "4 a 6 horas", "6 a 10 horas", "Mais de 10 horas"];

export const DISPONIBILIDADE = [
  "Sim, consigo participar ao vivo",
  "Na maioria das semanas",
  "Depende do horário definido",
];
