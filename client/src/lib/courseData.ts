export type CourseModule = {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  duration: string;
  free: boolean;
  level: string;
  hook: string;
  summary: string;
  outcomes: string[];
  lessons: Array<{
    title: string;
    summary: string;
    duration: string;
  }>;
  practice: {
    title: string;
    scenario: string;
    challenge: string;
    deliverable: string;
  };
  evaluation?: {
    title: string;
    format: string;
    criteria: string[];
    prompt: string;
  };
};

export const courseSlug = "engenharia-sistemas-ia-generativa";
export const paidPriceCents = 49700;
export const paidPriceFormatted = "R$ 497";
export const freeModuleCount = 2;
export const logoAssetPath = "/manus-storage/logo_4c289922.png";

export const courseHero = {
  eyebrow: "Cursos · IA aplicada com rigor de engenharia",
  title: "Engenharia de Sistemas de IA Generativa",
  subtitle:
    "Da extração de dados à validação: uma trilha completa para construir sistemas de RAG e LLMs com matemática, código real, prática guiada e critérios de confiança em produção.",
  tagline: "Os módulos 0 e 1 são gratuitos. O restante da jornada é liberado via checkout com PIX.",
  primaryCta: "Começar gratuitamente",
  secondaryCta: "Ver módulos e prática",
  socialProof: [
    "2 módulos liberados sem pagamento",
    "9 módulos + laboratório visual",
    "Projeto final com avaliação de respostas de IA",
  ],
};

export const conversionHighlights = [
  {
    title: "Entenda o sistema inteiro, não só a API",
    text:
      "O curso percorre o fluxo real dos dados: ingestão, embeddings, busca vetorial, geração, orquestração, avaliação e governança.",
  },
  {
    title: "Aprenda com matemática, código e decisão de arquitetura",
    text:
      "Cada módulo conecta intuição, modelagem computacional, implementação prática e trade-offs de ferramentas como LangChain, LlamaIndex, Haystack, Chroma, Qdrant e Ollama.",
  },
  {
    title: "Valide a resposta da IA antes de colocá-la em produção",
    text:
      "O diferencial da trilha está em ensinar como medir fidelidade, relevância, recuperação e risco de alucinação em sistemas reais.",
  },
];

export const audienceCards = [
  {
    title: "Para quem já usa LLMs e quer rigor",
    text:
      "Ideal para profissionais que já testaram prompts, assistentes ou RAG e agora precisam construir soluções auditáveis, justificáveis e sustentáveis em produção.",
  },
  {
    title: "Para times de dados, ML e produto",
    text:
      "A linguagem conversa com engenharia, ciência de dados, arquitetura de software e liderança técnica interessada em padrões mais estáveis de implementação.",
  },
  {
    title: "Para quem quer portfólio aplicável",
    text:
      "Ao longo da trilha, o aluno acumula entregáveis, anotações de arquitetura, exercícios e um projeto final que pode alimentar portfólio técnico ou programa interno de capacitação.",
  },
];

export const courseModules: CourseModule[] = [
  {
    id: "modulo-0",
    order: 0,
    title: "Fundamentos de RAG e geometria do significado",
    subtitle: "Por que RAG existe, onde ele falha e qual matemática mínima sustenta a busca semântica.",
    duration: "4h",
    free: true,
    level: "Abertura gratuita",
    hook: "Todo mundo consegue chamar um LLM. Quase ninguém consegue explicar por que ele erra.",
    summary:
      "O módulo apresenta a anatomia de um sistema de IA generativa orientado por recuperação, conectando o problema das alucinações à ideia de embeddings, proveniência e busca contextual. É a base intelectual da trilha.",
    outcomes: [
      "Compreender o papel de RAG em sistemas corporativos.",
      "Explicar similaridade do cosseno e representação vetorial de textos.",
      "Reconhecer limitações estruturais de um LLM puro.",
    ],
    lessons: [
      {
        title: "O problema que origina tudo",
        summary: "Conhecimento congelado, alucinação e ausência de proveniência em modelos puros.",
        duration: "35 min",
      },
      {
        title: "A equação conceitual do RAG",
        summary: "Como decompor a resposta em recuperação, contexto e geração.",
        duration: "30 min",
      },
      {
        title: "A matemática mínima",
        summary: "Similaridade do cosseno, vetores normalizados e o que realmente significa proximidade semântica.",
        duration: "50 min",
      },
    ],
    practice: {
      title: "Laboratório 0 · Mapa do pipeline",
      scenario: "O aluno recebe uma pergunta problemática e precisa mapear por que um LLM sem grounding responderia com baixa confiabilidade.",
      challenge: "Selecionar a etapa correta do pipeline em que o erro nasce e justificar com base na geometria do significado.",
      deliverable: "Quiz explicativo + mapa visual do pipeline anotado.",
    },
  },
  {
    id: "modulo-1",
    order: 1,
    title: "Extração de dados e chunking com intenção de produção",
    subtitle: "Aquisição, parsing e chunking são o começo real da qualidade em RAG.",
    duration: "5h",
    free: true,
    level: "Abertura gratuita",
    hook: "Se a base entra errada, o sistema inteiro escala o erro com mais sofisticação.",
    summary:
      "A etapa de ingestão é tratada como engenharia de qualidade: aquisição web, parsing de documentos, estruturação e decisões de chunking com impacto mensurável em custo e qualidade de recuperação.",
    outcomes: [
      "Distinguir aquisição, parsing e chunking.",
      "Comparar chunking fixo, recursivo e semântico.",
      "Estimar custo e overhead de sobreposição em tokens.",
    ],
    lessons: [
      {
        title: "As três camadas da ingestão",
        summary: "Aquisição, parsing e estruturação em sites, PDFs e tabelas.",
        duration: "45 min",
      },
      {
        title: "Ferramentas da camada de extração",
        summary: "Crawl4AI, Firecrawl, Docling, Llama Parse e o problema dos formatos hostis.",
        duration: "35 min",
      },
      {
        title: "Modelagem do chunking",
        summary: "Tamanho de janela, overlap, chunking semântico e implicações sobre embedding e busca.",
        duration: "65 min",
      },
    ],
    practice: {
      title: "Laboratório 1 · Arquitetura de ingestão",
      scenario: "O aluno recebe um conjunto de PDFs e páginas web de baixa qualidade para transformar em uma base utilizável por RAG.",
      challenge: "Escolher a estratégia de ingestão e ajustar chunk size e overlap de acordo com o objetivo da consulta.",
      deliverable: "Mini pipeline de ingestão + recomendação argumentada de chunking.",
    },
  },
  {
    id: "modulo-2",
    order: 2,
    title: "Embeddings de texto e representação semântica",
    subtitle: "Como o modelo aprende que textos próximos em significado devem estar próximos no espaço vetorial.",
    duration: "6h",
    free: false,
    level: "Pago",
    hook: "A pergunta central deixa de ser 'qual modelo usar?' e passa a ser 'qual geometria eu preciso preservar?'.",
    summary:
      "O módulo aprofunda embeddings, treino contrastivo, bi-encoders, cross-encoders e comparação de fornecedores, conectando teoria com critérios práticos de seleção.",
    outcomes: [
      "Explicar o que é um embedding e como ele é treinado.",
      "Distinguir bi-encoder de cross-encoder.",
      "Comparar modelos do mercado segundo custo, qualidade e portabilidade.",
    ],
    lessons: [
      {
        title: "O que é um embedding, formalmente",
        summary: "Função texto-vetor, dimensionalidade e geometria de significados.",
        duration: "50 min",
      },
      {
        title: "Bi-encoder vs. cross-encoder",
        summary: "Onde cada abordagem ganha ou perde em produção.",
        duration: "40 min",
      },
      {
        title: "Comparando os modelos do mercado",
        summary: "SBERT, Nomic, OpenAI, Voyage, Google e Cohere sob lente prática.",
        duration: "55 min",
      },
    ],
    practice: {
      title: "Laboratório 2 · Embedding Explorer",
      scenario: "Um conjunto de perguntas semanticamente parecidas precisa ser indexado de forma a preservar a intenção do usuário.",
      challenge: "Ajustar dimensionalidade, recall esperado e estratégia de reranking para maximizar relevância percebida.",
      deliverable: "Comparativo guiado de modelos e justificativa arquitetural.",
    },
  },
  {
    id: "modulo-3",
    order: 3,
    title: "Bancos vetoriais, ANN e performance de recuperação",
    subtitle: "Do k-NN exato à busca aproximada em escala, com foco em latência, recall e custo.",
    duration: "6h",
    free: false,
    level: "Pago",
    hook: "Quando a base cresce, a pergunta não é apenas 'o que recuperar?', mas 'com que velocidade e com que precisão aproximada?'.",
    summary:
      "Aqui o aluno entra na lógica de indexação, HNSW, trade-offs de Chroma, Qdrant, Milvus e pgvector, entendendo como a busca vetorial afeta diretamente a qualidade do sistema.",
    outcomes: [
      "Compreender a diferença entre busca exata e aproximada.",
      "Relacionar recall, latência e custo operacional.",
      "Escolher um banco vetorial coerente com o contexto do produto.",
    ],
    lessons: [
      {
        title: "Do exato ao aproximado",
        summary: "ANN, HNSW e o motivo de a escala mudar a engenharia do problema.",
        duration: "55 min",
      },
      {
        title: "Mão na massa com Chroma",
        summary: "Configuração de um banco simples para aprendizado e prototipação.",
        duration: "40 min",
      },
      {
        title: "Comparando bancos do mercado",
        summary: "Critérios reais para escolher entre opções locais, cloud e híbridas.",
        duration: "50 min",
      },
    ],
    practice: {
      title: "Laboratório 3 · Retrieval Tuner",
      scenario: "O aluno recebe um índice com volume crescente de documentos e precisa preservar experiência de busca sem comprometer custo.",
      challenge: "Equilibrar top-k, estratégia de indexação e expectativa de recall.",
      deliverable: "Configuração comentada do motor de busca vetorial.",
    },
  },
  {
    id: "modulo-4",
    order: 4,
    title: "LLMs, self-attention e geração controlada",
    subtitle: "A matemática do Transformer e o impacto de sampling, contexto e distribuição de probabilidade.",
    duration: "6h",
    free: false,
    level: "Pago",
    hook: "Quem controla temperatura, top-p e janela de contexto controla parte essencial do comportamento do sistema.",
    summary:
      "O módulo abre a caixa preta do Transformer e mostra como geração, contexto, latência e custo se articulam, sempre conectando teoria ao comportamento observável em produção.",
    outcomes: [
      "Entender o LLM como estimador de probabilidade.",
      "Interpretar sampling e seus efeitos sobre estilo e confiabilidade.",
      "Relacionar tamanho de contexto a custo computacional.",
    ],
    lessons: [
      {
        title: "O LLM como distribuição de probabilidade",
        summary: "Por que geração é amostragem condicionada e não recuperação factual pura.",
        duration: "60 min",
      },
      {
        title: "Janela de contexto e custo quadrático",
        summary: "Limites de contexto, memória e orçamento computacional.",
        duration: "35 min",
      },
      {
        title: "Sampling, temperatura e controle",
        summary: "Como parâmetros moldam criatividade, consistência e risco de desvio.",
        duration: "45 min",
      },
    ],
    practice: {
      title: "Laboratório 4 · Generation Control Room",
      scenario: "O aluno ajusta parâmetros de geração para diferentes tipos de pergunta: factual, criativa e analítica.",
      challenge: "Equilibrar criatividade e confiabilidade em cenários distintos.",
      deliverable: "Configuração comparativa de prompts e sampling.",
    },
  },
  {
    id: "modulo-5",
    order: 5,
    title: "Acesso a LLMs abertos, serving e quantização",
    subtitle: "Como decidir entre API, self-hosting, quantização e throughput de serving.",
    duration: "4h",
    free: false,
    level: "Pago",
    hook: "Nem sempre o melhor modelo é o melhor produto: infraestrutura, throughput e custo mudam a decisão.",
    summary:
      "O aluno passa a dominar portas de acesso a LLMs, modelos locais, quantização e serving, relacionando viabilidade técnica a orçamento e contexto operacional.",
    outcomes: [
      "Escolher entre API, open weights e execução local.",
      "Entender o que quantização sacrifica e o que ela viabiliza.",
      "Dimensionar throughput e expectativas de serving.",
    ],
    lessons: [
      {
        title: "As quatro portas de acesso",
        summary: "APIs, modelos locais, provedores acelerados e trade-offs de adoção.",
        duration: "40 min",
      },
      {
        title: "Quantização sem misticismo",
        summary: "O que se perde e o que se ganha ao reduzir precisão numérica.",
        duration: "35 min",
      },
      {
        title: "Throughput de serving",
        summary: "Latência, concorrência, tokens por segundo e engenharia de capacidade.",
        duration: "35 min",
      },
    ],
    practice: {
      title: "Laboratório 5 · Serving Budget",
      scenario: "O aluno precisa desenhar uma estratégia de serving para um produto com orçamento limitado e carga crescente.",
      challenge: "Escolher entre API e open source local com justificativa técnica e financeira.",
      deliverable: "Mapa de decisão com custo, desempenho e risco.",
    },
  },
  {
    id: "modulo-6",
    order: 6,
    title: "Frameworks e orquestração ponta a ponta",
    subtitle: "LangChain, LlamaIndex, Haystack e Txtai como diferentes formas de declarar o mesmo grafo computacional.",
    duration: "5h",
    free: false,
    level: "Pago",
    hook: "Framework bom acelera. Framework mal escolhido esconde o problema até o ambiente de produção.",
    summary:
      "Com base no anexo de frameworks, o módulo mostra o que cada ecossistema resolve, como o código se parece de verdade e em quais cenários a abstração ajuda ou atrapalha.",
    outcomes: [
      "Comparar estilos de orquestração entre os principais frameworks.",
      "Modelar pipelines como DAGs de transformação.",
      "Escolher a ferramenta conforme produção, protótipo, agentes ou indexação intensiva.",
    ],
    lessons: [
      {
        title: "Os frameworks em profundidade",
        summary: "LangChain, LlamaIndex, Haystack e Txtai sob ótica funcional e arquitetural.",
        duration: "55 min",
      },
      {
        title: "O pipeline RAG avançado",
        summary: "Reranking, HyDE, MMR, tools e orquestração com estado.",
        duration: "45 min",
      },
      {
        title: "Mão na massa: RAG ponta a ponta",
        summary: "Construção guiada de um fluxo completo com componentes explícitos.",
        duration: "55 min",
      },
    ],
    practice: {
      title: "Laboratório 6 · Framework Matchmaker",
      scenario: "Quatro cenários de negócio exigem escolhas diferentes de framework e forma de orquestração.",
      challenge: "Selecionar a stack certa e defender a decisão perante critérios de auditabilidade, velocidade e complexidade.",
      deliverable: "Arquitetura recomendada por cenário.",
    },
  },
  {
    id: "modulo-7",
    order: 7,
    title: "Avaliação, validação e confiança operacional",
    subtitle: "Como medir se a resposta da IA é relevante, fiel, segura e suficiente para a decisão.",
    duration: "6h",
    free: false,
    level: "Pago",
    hook: "Se você não mede fidelidade, relevância e recuperação, você não tem um produto; você tem um palpite elegante.",
    summary:
      "O módulo amarra toda a trilha técnica até aqui, ensinando métricas de recuperação e geração, LLM-as-a-Judge, sinais automáticos de confiança, golden sets e um protocolo prático de validação.",
    outcomes: [
      "Aplicar métricas de recuperação e geração em avaliações reais.",
      "Compreender limites e vieses de LLM-as-a-Judge.",
      "Desenhar um protocolo de validação robusto para RAG em produção.",
    ],
    lessons: [
      {
        title: "Taxonomia da validação",
        summary: "Faithfulness, relevância, cobertura, grounding e confiança operacional.",
        duration: "45 min",
      },
      {
        title: "Ferramentas de avaliação",
        summary: "Ragas, TruLens, Giskard e avaliação caseira bem desenhada.",
        duration: "45 min",
      },
      {
        title: "Golden set e protocolo prático",
        summary: "Como fechar um ciclo mínimo de validação antes de produção.",
        duration: "60 min",
      },
    ],
    practice: {
      title: "Laboratório 7 · Confidence Studio",
      scenario: "O aluno audita respostas de um miniassistente e precisa decidir o que pode ou não seguir para uso real.",
      challenge: "Interpretar sinais de baixa confiança e propor correções concretas na pipeline.",
      deliverable: "Relatório de validação do sistema.",
    },
  },
  {
    id: "modulo-8",
    order: 8,
    title: "MCP na prática: conectando LLMs, ferramentas e contexto externo",
    subtitle: "Um passo a passo para entender host, client, server, primitives e fluxos reais de execução com Model Context Protocol.",
    duration: "5h",
    free: false,
    level: "Pago",
    hook: "O valor do MCP não está no nome do protocolo, mas na capacidade de transformar um LLM isolado em um sistema que enxerga contexto e age com ferramentas reais.",
    summary:
      "O módulo introduz o Model Context Protocol como padrão aberto para conectar aplicações de IA a dados, ferramentas e workflows externos. O aluno aprende a arquitetura host-client-server, a diferença entre tools, resources e prompts, os fluxos de inicialização, descoberta e execução e os cuidados de segurança e governança necessários para usar MCP em ambientes reais.",
    outcomes: [
      "Explicar o que o MCP resolve e quando seu uso faz sentido em produtos com IA.",
      "Distinguir host, client e server no fluxo arquitetural do protocolo.",
      "Mapear tools, resources e prompts em cenários reais de integração.",
      "Desenhar um fluxo mínimo de inicialização, descoberta e execução com controle de risco.",
    ],
    lessons: [
      {
        title: "O problema que o MCP resolve",
        summary: "Por que integrar cada fonte de dados de forma ad hoc escala custo, risco e retrabalho em aplicações de IA.",
        duration: "35 min",
      },
      {
        title: "Arquitetura host, client e server",
        summary: "Como uma aplicação de IA coordena clientes MCP e conversa com servidores locais ou remotos.",
        duration: "45 min",
      },
      {
        title: "Primitives e fluxo operacional passo a passo",
        summary: "Initialize, negotiation, tools/list, resources/read, prompts/get, tools/call e notificações em linguagem prática.",
        duration: "60 min",
      },
      {
        title: "Segurança, governança e desenho de integração",
        summary: "Escopo, autenticação, confirmação de ações sensíveis, logs e limites para uso responsável de MCP.",
        duration: "40 min",
      },
    ],
    practice: {
      title: "Laboratório 8 · MCP Integration Studio",
      scenario: "O aluno recebe o desenho de um assistente corporativo que precisa consultar uma base documental, acionar uma ferramenta de agenda e pedir confirmação antes de executar ações críticas.",
      challenge: "Definir quais capacidades devem ser expostas como resources, tools e prompts, desenhando também o fluxo de inicialização, descoberta e chamada com checkpoints de segurança.",
      deliverable: "Mapa arquitetural do servidor MCP + roteiro de mensagens entre host, client e server para um caso real.",
    },
    evaluation: {
      title: "Avaliação aplicada · MCP Blueprint",
      format: "Estudo de caso guiado + checklist avaliativo de arquitetura",
      criteria: [
        "Identificar corretamente o papel de host, client e server no cenário proposto.",
        "Separar com coerência o que deve ser tool, resource e prompt.",
        "Explicar o fluxo mínimo do protocolo sem omitir inicialização, descoberta e execução.",
        "Propor controles de autenticação, confirmação e observabilidade adequados ao risco da integração.",
      ],
      prompt: "Desenhe a arquitetura MCP de um assistente para operações acadêmicas que consulta calendário, documentos e base de FAQs. Justifique quais capacidades serão expostas, como o host descobre essas capacidades e em quais pontos o usuário deve ser consultado antes de ações críticas.",
    },
  },
];

export const practiceScenarios = [
  {
    title: "Pipeline Visual",
    text:
      "Um canvas narrativo permite acompanhar a passagem da pergunta por ingestão, embeddings, busca vetorial, reranking, prompting e resposta final, ajudando o aluno a enxergar o sistema como arquitetura e não como magia.",
  },
  {
    title: "Simulador de parâmetros",
    text:
      "Sliders de chunk size, overlap, top-k e temperatura mostram como pequenas decisões alteram a qualidade da resposta, o custo estimado e o risco de inconsistência.",
  },
  {
    title: "Trilha de progresso",
    text:
      "O ambiente registra continuidade, status por módulo e desafios concluídos, mantendo o aluno em uma narrativa clara de avanço e desbloqueio.",
  },
];

export const pricingCard = {
  title: "Desbloqueio completo da trilha",
  description:
    "Ao concluir os módulos gratuitos, o aluno pode liberar os módulos avançados, os laboratórios guiados, o projeto final e o ambiente contínuo de prática.",
  price: paidPriceFormatted,
  paymentCopy: "Checkout com PIX e cartão via ambiente seguro. A liberação dos módulos pagos acontece assim que a compra for confirmada.",
  features: [
    "Acesso aos módulos 2 a 8",
    "Laboratórios visuais interativos",
    "Projeto final com protocolo de validação",
    "Histórico de progresso e retomada de estudo",
  ],
};

export const urgencyCard = {
  title: "Os dois primeiros módulos são completos, não amostras vazias",
  text:
    "A proposta é que o aluno perceba valor real antes de comprar. Depois disso, o desbloqueio leva para a parte mais rara da trilha: engenharia de arquitetura, avaliação e confiança em produção.",
};

export const faqItems = [
  {
    question: "Os módulos gratuitos têm pegadinha?",
    answer:
      "Não. Os módulos 0 e 1 são completos e já entregam base conceitual, prática guiada e entendimento real sobre a etapa mais negligenciada dos sistemas de IA.",
  },
  {
    question: "Preciso ser especialista em matemática para acompanhar?",
    answer:
      "Não. Álgebra linear e probabilidade básicas ajudam, mas a trilha foi desenhada para construir a intuição antes da formalização, sem simplificações enganosas.",
  },
  {
    question: "O checkout aceita PIX?",
    answer:
      "Sim. O fluxo foi pensado para conversão rápida e continuidade imediata dos estudos, com PIX destacado como opção principal de compra para o público brasileiro.",
  },
  {
    question: "O que acontece depois da compra?",
    answer:
      "O aluno volta automaticamente para a área do curso com os módulos pagos destravados, acesso ao ambiente de prática e continuidade do progresso em uma única trilha.",
  },
];

export const socialCta = {
  headline: "Pare de apenas chamar a API. Aprenda a engenheirar sistemas de IA — e a provar que eles funcionam.",
  support:
    "A stack inteira de RAG e LLMs em uma jornada que combina modelagem matemática, código real, critérios de escolha e avaliação estruturada.",
};
