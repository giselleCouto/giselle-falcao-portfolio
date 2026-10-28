// Página de vendas dos Programas Executivos NOKAHI Edu (out/2026).
// Marca definida pela Giselle: "Programas Executivos NOKAHI Edu, conduzidos por
// Giselle Falcão". Comprador = RH/T&D, diretoria e líderes de área.
// Regras da casa: tom amigável e coletivo, sem pressão nem urgência; investimento
// sempre "sob proposta" (nunca inventar preço); toda prova citada é real; só
// depoimentos reais enviados pela Giselle (28/out/2026: Vitor, Giseli, Alberto),
// sem inventar cargo/empresa; nunca "reconhecido pelo MEC".
// Título, horas e nível de cada programa vêm de lib/courses (fonte única).

export const PROGRAMAS_ROTA = "/giselle/programas-executivos";

export type ProgramaVenda = {
  slug: string;
  /** Rótulo curto do formulário (até 60 caracteres — limite do servidor) */
  rotuloFormulario: string;
  paraQuem: string;
  /** A pergunta que o programa ajuda a responder */
  pergunta: string;
  /** O que a empresa leva ao final (projeto aplicado) */
  entregavel: string;
  entregavelDetalhe: string;
  semProgramacao: boolean;
};

export type Depoimento = {
  nome: string;
  /** O que a pessoa aprendeu/construiu com a Giselle (contexto do depoimento) */
  contexto: string;
  /** Frase de destaque — palavras da própria pessoa, sem paráfrase */
  destaque: string;
  /** Depoimento completo; parágrafos separados por \n\n */
  texto: string;
  tema: string;
  /** Programa executivo com conteúdo relacionado (não significa que a pessoa cursou o programa) */
  programaRelacionado: string;
};

export type NivelOrganizacao = {
  id: string;
  nome: string;
  descricao: string;
  programas: string[];
};

export const programasExecutivos = {
  marca: "Programas Executivos NOKAHI Edu",
  assinatura: "conduzidos por Giselle Falcão",

  heroTitulo: "Formação em Dados e IA que termina com um plano da sua empresa, não só com um certificado",
  heroSub:
    "Cinco programas para cada nível da organização, da diretoria aos times técnicos. Turma fechada, casos do seu setor e um entregável por módulo, construído a partir dos desafios reais da equipe.",

  fatos: [
    { valor: "5", rotulo: "programas, um para cada nível" },
    { valor: "40 a 72 h", rotulo: "de carga horária por programa" },
    { valor: "Turma fechada", rotulo: "só com a sua equipe" },
    { valor: "Híbrido", rotulo: "videoaulas + encontros ao vivo" },
  ],

  dores: [
    {
      titulo: "Conteúdo genérico, problema específico",
      texto:
        "A equipe assiste a exemplos de outra empresa e volta para a mesa sem saber por onde começar na própria.",
    },
    {
      titulo: "Todo mundo aprende a ferramenta, ninguém decide melhor",
      texto:
        "Saber usar um chatbot não ensina a escolher entre um modelo preditivo, uma otimização ou uma regra simples bem feita.",
    },
    {
      titulo: "Sem o número de antes, não existe o depois",
      texto:
        "Se ninguém registrou quanto o processo custa hoje, o ganho do treinamento vira opinião na reunião de resultados.",
    },
  ],

  pilares: [
    {
      titulo: "Começa pela dor da sua empresa",
      texto:
        "Antes da proposta, uma conversa de diagnóstico para entender o desafio, o público e o número de partida. Casos e exemplos são ajustados ao seu setor.",
    },
    {
      titulo: "Cada módulo gera um entregável",
      texto:
        "A turma não só assiste: aplica. Os entregáveis dos módulos se somam num projeto aplicado que a equipe apresenta à liderança no final.",
    },
    {
      titulo: "Um programa para cada nível",
      texto:
        "Diretoria, gestores, equipes e times técnicos aprendem o que cabe ao seu papel, com a mesma linguagem do topo à operação.",
    },
    {
      titulo: "Profundidade sem jargão",
      texto:
        "Conteúdo atualizado e com rigor, explicado para quem não é especialista: nenhuma sigla fica sem tradução, do primeiro ao último módulo.",
    },
  ],

  niveis: [
    {
      id: "lideranca",
      nome: "Diretoria e lideranças",
      descricao: "Quem decide onde investir em dados e IA e precisa avaliar propostas com segurança.",
      programas: ["solucoes-dados-ia-lideres", "agentes-ia-lideres"],
    },
    {
      id: "gestores",
      nome: "Gestores de área",
      descricao: "Quem toma decisões toda semana e quer trocar o achismo por evidência.",
      programas: ["decisoes-orientadas-por-dados"],
    },
    {
      id: "equipes",
      nome: "Equipes não técnicas",
      descricao: "Administrativo, comercial, marketing, RH, jurídico, atendimento e financeiro.",
      programas: ["ia-generativa-no-trabalho"],
    },
    {
      id: "tecnicos",
      nome: "Times de TI e dados",
      descricao: "Analistas, engenheiros e desenvolvedores que precisam levar modelos à produção.",
      programas: ["ia-de-producao-times-dados"],
    },
  ] satisfies NivelOrganizacao[],

  programas: [
    {
      slug: "solucoes-dados-ia-lideres",
      rotuloFormulario: "Do Problema à Solução (lideranças)",
      paraQuem: "Diretoria e lideranças",
      pergunta: "Qual solução resolve cada problema do negócio: estatística, Machine Learning, otimização, simulação ou IA generativa?",
      entregavel: "Mapa Problema → Solução da empresa",
      entregavelDetalhe:
        "De 3 a 5 problemas priorizados, cada um com a família de solução indicada, os dados necessários, o valor estimado, os riscos e o plano de prova de conceito.",
      semProgramacao: true,
    },
    {
      slug: "agentes-ia-lideres",
      rotuloFormulario: "Agentes de IA para Líderes",
      paraQuem: "Diretoria e lideranças",
      pergunta: "Onde agentes de IA geram valor de verdade e como implantá-los com segurança, sem cair em promessa de fornecedor?",
      entregavel: "Plano de Agente da empresa",
      entregavelDetalhe:
        "Um caso de uso levado do mapeamento ao piloto: processo atual, desenho do agente com as 5 peças, nível de autonomia, riscos e controles, métricas e plano de 30, 60 e 90 dias.",
      semProgramacao: true,
    },
    {
      slug: "decisoes-orientadas-por-dados",
      rotuloFormulario: "Decisões Orientadas por Dados (gestores)",
      paraQuem: "Gestores de área",
      pergunta: "Como decidir com evidência: indicadores certos, estatística essencial, experimentos e cenários?",
      entregavel: "Decisão documentada",
      entregavelDetalhe:
        "Um problema real da área com árvore de indicadores, painel, análise com evidências, experimento ou cenário, a decisão registrada e o plano de revisão.",
      semProgramacao: true,
    },
    {
      slug: "ia-generativa-no-trabalho",
      rotuloFormulario: "IA Generativa no Trabalho (equipes)",
      paraQuem: "Equipes não técnicas",
      pergunta: "Como usar ChatGPT, Copilot, Gemini e Claude com ganho real de produtividade, sem expor dados da empresa?",
      entregavel: "Guia de IA Generativa da equipe",
      entregavelDetalhe:
        "Três fluxos de trabalho redesenhados com prompts testados, regras de segurança e o ganho de tempo medido antes e depois.",
      semProgramacao: true,
    },
    {
      slug: "ia-de-producao-times-dados",
      rotuloFormulario: "IA de Produção (times de dados)",
      paraQuem: "Times de TI e dados",
      pergunta: "Como levar modelos do SQL à produção e mantê-los funcionando, incluindo IA generativa?",
      entregavel: "Modelo em produção",
      entregavelDetalhe:
        "Do SQL ao monitoramento: pipeline de dados, modelo registrado, serviço publicado, painel de monitoramento, model card e plano de retreino.",
      semProgramacao: false,
    },
  ] satisfies ProgramaVenda[],

  combinar:
    "Os programas foram desenhados para se combinar: a liderança escolhe onde investir enquanto as equipes aprendem a operar, todos com a mesma linguagem. A proposta pode reunir um ou mais programas.",

  metodo: [
    { titulo: "Aprender", texto: "Videoaulas curtas, de 9 a 12 minutos, e leituras de apoio, no ritmo da turma." },
    { titulo: "Aplicar", texto: "Estudo de caso e atividade prática com os desafios da própria empresa." },
    { titulo: "Consolidar", texto: "Avaliação do módulo e encontro ao vivo com a Giselle para discutir os resultados." },
    { titulo: "Entregar", texto: "Cada módulo fecha com um entregável que compõe o projeto aplicado final." },
  ],

  jornada: [
    {
      titulo: "Conversa de diagnóstico",
      texto: "Entendemos o desafio, quem participa e qual número de hoje vale acompanhar.",
    },
    {
      titulo: "Proposta por escrito",
      texto: "Programa (ou combinação), adaptação ao setor, calendário, tamanho da turma e formato dos encontros.",
    },
    {
      titulo: "Turma em andamento",
      texto: "Videoaulas, atividades aplicadas, avaliações e encontros ao vivo, presenciais ou on-line.",
    },
    {
      titulo: "Apresentação dos projetos",
      texto: "A equipe apresenta os projetos aplicados à liderança e recebe o certificado.",
    },
  ],

  inclui: [
    "Programa adaptado ao setor e ao momento da empresa",
    "Videoaulas, leituras e materiais de apoio (modelos, checklists e planilhas de trabalho)",
    "Encontros ao vivo com a Giselle em cada módulo, presenciais ou on-line",
    "Estudos de caso, atividades aplicadas e avaliação por módulo",
    "Projeto aplicado com os desafios reais da equipe",
    "Certificado de qualificação profissional NOKAHI Edu (aproveitamento mínimo de 70% e entrega do projeto)",
  ],

  conductora: {
    nome: "Giselle Falcão, PhD",
    resumo:
      "Doutora em Modelagem Matemática e Computacional (CEFET-MG) e em Matemática do Clima (Sorbonne Université), com MBA in Data Science (University of Hartford). Desenha e coloca em operação soluções de IA para indústria, logística, agro, educação e setor público.",
    provas: [
      "Curral AI: roteirização naval que levou a ocupação da frota de 60% para 87%",
      "Metodologia CEOD (livro, 2026): estudo com 809 escolas e +20,7 pontos no SAEB (IC 95%)",
      "Palestrante no DATA BH · SQL Saturday (PUC Minas) e no Minas Summit",
      "Soluções em operação com ML preditivo, otimização, visão computacional e simulação",
    ],
    independencia:
      "Orientação independente de fornecedor: não revendemos plataforma nem ganhamos comissão de ferramenta.",
  },

  // Depoimentos reais de quem aprendeu com a Giselle em formações e acompanhamentos.
  // Texto revisado só na ortografia e na pontuação; o conteúdo é da própria pessoa.
  depoimentos: [
    {
      nome: "Vitor Consuelo",
      tema: "Machine Learning com séries temporais",
      contexto:
        "Aprendeu a criar modelos de séries temporais para previsão de score de crédito, hoje em uso no Sicoob Paraná, e alertas de vencimento de boletos que reduzem a chance de inadimplência.",
      destaque: "Hoje consigo dar manutenção no modelo sozinho (…), porque aprendi de verdade como fazer.",
      texto:
        "Foi excelente, pois além de me apoiar na construção do modelo, eu saí sabendo o que estava fazendo e o porquê de cada decisão tomada. Hoje consigo dar manutenção no modelo sozinho, sem ter que procurar nem a Giselle nem ninguém do time, porque aprendi de verdade como fazer.",
      programaRelacionado: "ia-de-producao-times-dados",
    },
    {
      nome: "Giseli Barbosa",
      tema: "Detecção de fraude",
      contexto:
        "Aprendeu a criar um modelo de detecção de fraude em movimentações bancárias, a partir do histórico de movimentações e do comportamento dos clientes.",
      destaque: "Aprendi muitas coisas que não sabia, como (…) entender e identificar quando o modelo não está mais respondendo.",
      texto:
        "Foi incrível! Aprendi muitas coisas que não sabia, como fazer autocorrelações dentro da mesma série, acompanhar os desvios, entender e identificar quando o modelo não está mais respondendo.",
      programaRelacionado: "ia-de-producao-times-dados",
    },
    {
      nome: "Alberto Antonio",
      tema: "Agentes de IA em operação crítica",
      contexto:
        "Desenvolveu agentes de IA para uma operação crítica, com diagnósticos e históricos entregues em segundos à equipe técnica.",
      destaque:
        "A IA não corrige fluxos ruins — se os dados e as etapas estiverem desorganizados, o agente apenas automatiza o erro mais rápido.",
      texto:
        "Ao começar a desenvolver agentes de IA, achei que o maior desafio seria o código ou a escolha do modelo, mas a prática em uma operação crítica me provou o contrário. Onde a margem de erro é zero, entendi rapidamente que um agente não é um simples chatbot, mas um sistema autônomo que exige diretrizes rígidas para tomar decisões seguras.\n\nO verdadeiro aprendizado não foi técnico, e sim estratégico: mapear processos de ponta a ponta. Descobri que a IA não corrige fluxos ruins — se os dados e as etapas estiverem desorganizados, o agente apenas automatiza o erro mais rápido. Foi essencial estruturar guardrails claros para garantir que o sistema consultasse as fontes de informação corretas antes de sugerir qualquer ação.\n\nQuando a solução entrou em produção, fornecendo diagnósticos e históricos precisos em segundos para a equipe técnica, ficou claro o seu verdadeiro valor. Criar agentes de IA transformou minha visão profissional não por me tornar um programador melhor, mas por me ensinar a traduzir regras de negócio complexas em decisões autônomas eficientes.",
      programaRelacionado: "agentes-ia-lideres",
    },
  ] satisfies Depoimento[],

  faq: [
    {
      q: "Qual programa escolher para a minha empresa?",
      a: "Depende de quem vai participar e de qual decisão precisa melhorar. Liderança costuma começar por Do Problema à Solução ou Agentes de IA para Líderes; gestores, por Decisões Orientadas por Dados; equipes não técnicas, por IA Generativa no Trabalho; e times de TI e dados, por IA de Produção. Na conversa de diagnóstico a gente indica o melhor ponto de partida, inclusive combinações.",
    },
    {
      q: "Os programas são adaptados ao nosso setor?",
      a: "Sim. Casos, exemplos e atividades são ajustados ao setor e ao momento da empresa, e o projeto aplicado é construído com os desafios reais da equipe.",
    },
    {
      q: "É presencial ou on-line?",
      a: "Híbrido. As videoaulas e as leituras ficam on-line, no ritmo da turma, e os encontros ao vivo de cada módulo podem ser presenciais na empresa ou on-line, conforme combinado na proposta.",
    },
    {
      q: "Qual a duração e quantas pessoas por turma?",
      a: "A carga horária vai de 40 a 72 horas, conforme o programa. O calendário e o tamanho da turma são definidos na proposta, de acordo com a rotina da equipe.",
    },
    {
      q: "A equipe precisa saber programar?",
      a: "Não, com uma exceção: IA de Produção para Times de Dados é técnico e pede familiaridade com SQL. Os outros quatro programas não exigem nenhuma programação.",
    },
    {
      q: "Como ficam os dados da empresa nas atividades?",
      a: "Nenhuma atividade exige compartilhar dados pessoais. Quando o projeto usa dados reais, trabalhamos com dados anonimizados ou de exemplo, dentro das regras da empresa e da LGPD.",
    },
    {
      q: "Tem certificado?",
      a: "Sim. Quem atinge aproveitamento mínimo de 70% nas avaliações e entrega o projeto aplicado recebe o certificado de qualificação profissional NOKAHI Edu, com carga horária e conteúdo programático.",
    },
    {
      q: "Quanto custa?",
      a: "O investimento é sob proposta, porque depende do programa (ou da combinação), do número de participantes e do formato dos encontros. A proposta chega por escrito e sem compromisso.",
    },
  ],

  notaLegal:
    "Cursos livres de capacitação profissional, nos termos da Lei nº 9.394/96 (LDB) e do Decreto nº 5.154/2004 — não sujeitos a autorização do MEC.",
};
