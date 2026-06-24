// Design reminder: editorial científico neo-institucional com assimetria disciplinada, autoridade silenciosa,
// azul petróleo, cobre fosco, marfim técnico e acentos turquesa. Cada texto deve reforçar profundidade,
// impacto mensurável e sofisticação executiva, nunca parecer portfólio genérico.

export type Locale = "pt" | "en";

export const assets = {
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663156393333/6sAjL87Dgs7zQfqq7pYXKz/logo_preta_aa73ef4c.webp",
  portrait: "/manus-storage/foto_autora_11ba5989.jpeg",
  heroAtlas:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663156393333/6sAjL87Dgs7zQfqq7pYXKz/giselle-hero-atlas-9rA6i749UYThtL9Lh5ZSxA.webp",
  climatePanel:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663156393333/6sAjL87Dgs7zQfqq7pYXKz/giselle-climate-math-panel-WFgWmN5e9jCReteRQSrBXt.webp",
  educationPanel:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663156393333/6sAjL87Dgs7zQfqq7pYXKz/giselle-ai-education-panel-gsjjyd5bgf99jZd3PTbEqD.webp",
};

export const navItems = [
  { href: "#home", section: "home", label: { pt: "Home", en: "Home" } },
  { href: "#provas", section: "provas", label: { pt: "Autoridade", en: "Authority" } },
  { href: "#servicos", section: "servicos", label: { pt: "Consultoria", en: "Consulting" } },
  { href: "#cases", section: "cases", label: { pt: "Cases", en: "Cases" } },
  { href: "#publicacoes", section: "publicacoes", label: { pt: "Publicações", en: "Publications" } },
  { href: "#insights", section: "insights", label: { pt: "Linha editorial", en: "Editorial line" } },
  { href: "#contato", section: "contato", label: { pt: "Contato", en: "Contact" } },
] as const;

export const keyAreas = {
  pt: [
    "IA industrial",
    "Visão computacional",
    "Digital twins",
    "Modelagem matemática",
    "Otimização operacional",
    "Ciência de dados aplicada",
  ],
  en: [
    "Industrial AI",
    "Computer vision",
    "Digital twins",
    "Mathematical modeling",
    "Operational optimization",
    "Applied data science",
  ],
};

export const heroCopy = {
  name: "Giselle Couto Falcão",
  role: {
    pt: "Pesquisadora, consultora e PhD em IA industrial, modelagem matemática e ciência de dados aplicada",
    en: "Researcher, consultant, and PhD in industrial AI, mathematical modeling, and applied data science",
  },
  headline: {
    pt: "IA industrial, modelagem matemática e ciência de dados para decisões críticas.",
    en: "Industrial AI, mathematical modeling, and data science for critical decisions.",
  },
  subheadline: {
    pt: "Pesquisadora e consultora PhD que desenvolve modelos, sistemas analíticos e estratégias técnicas para indústria, logística, saúde, educação e setor público — com foco em visão computacional, digital twins e inteligência operacional.",
    en: "PhD researcher and consultant who designs models, analytical systems, and technical strategies for industry, logistics, healthcare, education, and the public sector — with a focus on computer vision, digital twins, and operational intelligence.",
  },
  ctaPrimary: { pt: "Ver provas de autoridade", en: "View authority proof" },
  ctaSecondary: { pt: "Falar sobre projeto", en: "Discuss a project" },
  impactPrompt: {
    pt: "Do rigor científico à implementação: sistemas analíticos para operar melhor, prever antes e decidir com mais segurança.",
    en: "From scientific rigor to implementation: analytical systems that help organizations operate better, forecast earlier, and decide more confidently.",
  },
};

export const authorityMetrics = [
  {
    value: "2 PhDs",
    label: {
      pt: "doutorados que conectam matemática, clima, modelagem computacional e inteligência aplicada",
      en: "doctorates connecting mathematics, climate science, computational modeling, and applied intelligence",
    },
  },
  {
    value: "Scholar",
    label: {
      pt: "produção científica verificável e leitura técnica com base acadêmica sólida",
      en: "verifiable scientific output and technical reasoning grounded in strong academic foundations",
    },
  },
  {
    value: "DOI",
    label: {
      pt: "artigos, pesquisa aplicada e escrita técnica com rastreabilidade pública",
      en: "articles, applied research, and technical writing with public traceability",
    },
  },
  {
    value: "Impacto",
    label: {
      pt: "cases em produção e sistemas desenhados para resultado operacional mensurável",
      en: "production cases and systems designed for measurable operational outcomes",
    },
  },
];

export const authorityProofs = [
  {
    key: "phd",
    title: { pt: "PhD e formação", en: "PhD and education" },
    description: {
      pt: "Formação avançada em modelagem matemática, matemática do clima, ciência de dados e pesquisa aplicada para problemas complexos.",
      en: "Advanced training in mathematical modeling, climate mathematics, data science, and applied research for complex problems.",
    },
    href: "#formacao",
    kind: "internal",
  },
  {
    key: "scholar",
    title: { pt: "Google Scholar", en: "Google Scholar" },
    description: {
      pt: "Produção científica indexada para validar repertório técnico, rigor metodológico e presença acadêmica internacional.",
      en: "Indexed scientific output that validates technical repertoire, methodological rigor, and international academic presence.",
    },
    href: "https://scholar.google.com.br/citations?hl=pt-BR&user=ljBj6GMAAAAJ",
    kind: "external",
  },
  {
    key: "lattes",
    title: { pt: "Lattes", en: "Lattes" },
    description: {
      pt: "Trajetória acadêmica, institucional e técnica consolidada em currículo público oficial.",
      en: "Academic, institutional, and technical trajectory consolidated in an official public CV.",
    },
    href: "http://lattes.cnpq.br/7661015485905669",
    kind: "external",
  },
  {
    key: "doi",
    title: { pt: "Artigos com DOI", en: "Articles with DOI" },
    description: {
      pt: "Publicações em educação, clima, séries temporais, matemática aplicada e problemas reais de decisão.",
      en: "Publications in education, climate, time series, applied mathematics, and real-world decision problems.",
    },
    href: "#publicacoes",
    kind: "internal",
  },
  {
    key: "cases",
    title: { pt: "Cases com impacto", en: "Impactful case studies" },
    description: {
      pt: "Resultados que conectam modelagem, IA, otimização e desenho de sistemas com impacto operacional concreto.",
      en: "Results that connect modeling, AI, optimization, and systems design with concrete operational impact.",
    },
    href: "#cases",
    kind: "internal",
  },
  {
    key: "github",
    title: { pt: "GitHub", en: "GitHub" },
    description: {
      pt: "Presença técnica pública para reforçar profundidade de implementação, prototipagem e pensamento estruturado.",
      en: "Public technical presence reinforcing implementation depth, prototyping capability, and structured thinking.",
    },
    href: "https://github.com/giselleCouto",
    kind: "external",
  },
  {
    key: "medium",
    title: { pt: "Medium", en: "Medium" },
    description: {
      pt: "Ensaios sobre IA aplicada, modelos matemáticos, educação, logística e inteligência operacional sem discurso inflado.",
      en: "Essays on applied AI, mathematical models, education, logistics, and operational intelligence without inflated discourse.",
    },
    href: "https://medium.com/@giselle_9978",
    kind: "external",
  },
  {
    key: "speaking",
    title: { pt: "Palestras e aulas", en: "Speaking and teaching" },
    description: {
      pt: "Docência, formação e presença pública em IA, modelagem, educação, decisão e sistemas analíticos.",
      en: "Teaching, training, and public presence on AI, modeling, education, decision-making, and analytical systems.",
    },
    href: "#palestras",
    kind: "internal",
  },
];

export const editorialPositioning = {
  title: {
    pt: "IA industrial com rigor matemático para decisões complexas.",
    en: "Industrial AI with mathematical rigor for complex decisions.",
  },
  body: {
    pt: "A linha editorial pública de Giselle deve ser reconhecida por traduzir matemática, ciência de dados, visão computacional, digital twins e inteligência artificial em arquitetura técnica, leitura estratégica e decisão executiva para operações reais.",
    en: "Giselle's public editorial line should be recognized for translating mathematics, data science, computer vision, digital twins, and artificial intelligence into technical architecture, strategic reading, and executive decision-making for real operations.",
  },
};

export const editorialSeries = [
  {
    key: "matematica-que-vira-decisao",
    title: { pt: "Matemática que vira decisão", en: "Mathematics that becomes decision" },
    description: {
      pt: "Série para mostrar como modelagem, estatística e otimização se tornam escolhas operacionais, políticas e estratégicas.",
      en: "A series showing how modeling, statistics, and optimization become operational, policy, and strategic choices.",
    },
  },
  {
    key: "ia-industrial-sem-espuma",
    title: { pt: "IA industrial sem espuma", en: "Industrial AI without hype" },
    description: {
      pt: "Leituras críticas sobre como sair do marketing da IA e construir sistemas úteis, auditáveis e economicamente defensáveis.",
      en: "Critical readings on how to move beyond AI marketing and build useful, auditable, economically defensible systems.",
    },
  },
  {
    key: "modelos-matematicos-problemas-reais",
    title: { pt: "Modelos matemáticos para problemas reais", en: "Mathematical models for real problems" },
    description: {
      pt: "Conteúdos sobre modelagem, simulação, otimização e estruturas de decisão para ambientes críticos e multirrestritos.",
      en: "Content on modeling, simulation, optimization, and decision structures for critical, multi-constrained environments.",
    },
  },
  {
    key: "visao-computacional-operacao",
    title: { pt: "Visão computacional que entra na operação", en: "Computer vision that reaches operations" },
    description: {
      pt: "Série sobre inspeção, qualidade, segurança, leitura visual e automação aplicada a contextos industriais e de infraestrutura.",
      en: "A series on inspection, quality, safety, visual interpretation, and automation applied to industrial and infrastructure settings.",
    },
  },
  {
    key: "digital-twins-decisao",
    title: { pt: "Digital twins para decisão operacional", en: "Digital twins for operational decision-making" },
    description: {
      pt: "Discussões sobre gêmeos digitais, simulação de cenários, sensores, previsibilidade e desenho de sistemas de resposta.",
      en: "Discussions on digital twins, scenario simulation, sensors, predictability, and responsive system design.",
    },
  },
  {
    key: "avaliar-modelos-ia-rigor",
    title: { pt: "Como avaliar modelos de IA com rigor", en: "How to evaluate AI models rigorously" },
    description: {
      pt: "Reflexões sobre critérios, validação, viés, robustez, monitoramento e confiabilidade de modelos em contextos sensíveis.",
      en: "Reflections on criteria, validation, bias, robustness, monitoring, and model reliability in sensitive contexts.",
    },
  },
];

export const aboutSection = {
  intro: {
    pt: "Giselle Couto Falcão atua na interseção entre IA industrial, modelagem matemática, visão computacional, digital twins e ciência de dados aplicada para estruturar problemas complexos e apoiar decisões de alto impacto.",
    en: "Giselle Couto Falcão works at the intersection of industrial AI, mathematical modeling, computer vision, digital twins, and applied data science to structure complex problems and support high-impact decisions.",
  },
  body: {
    pt: "Sua atuação combina pesquisa, consultoria e desenvolvimento de sistemas analíticos para organizações que precisam sair de sinais dispersos e construir critérios mais sólidos de previsão, priorização, otimização, monitoramento e escolha estratégica.",
    en: "Her work combines research, consulting, and analytical-system development for organizations that need to move from scattered signals toward stronger criteria for forecasting, prioritization, optimization, monitoring, and strategic choice.",
  },
  closing: {
    pt: "O diferencial está em unir rigor acadêmico, profundidade computacional e clareza executiva em setores como indústria, logística, saúde, educação e setor público, sem depender de promessas genéricas ou hype tecnológico.",
    en: "The differentiator lies in combining academic rigor, computational depth, and executive clarity across sectors such as industry, logistics, healthcare, education, and the public sector, without relying on generic promises or technology hype.",
  },
};

export const expertiseCards = [
  {
    key: "ai-ml",
    title: { pt: "Inteligência Artificial e Machine Learning", en: "Artificial Intelligence and Machine Learning" },
    description: {
      pt: "Desenvolvimento de soluções preditivas, classificatórias e prescritivas com forte aderência ao contexto de negócio e governança técnica.",
      en: "Development of predictive, classificatory, and prescriptive solutions closely aligned with business context and technical governance.",
    },
    applications: {
      pt: "Predição de risco, segmentação, scoring, detecção de anomalias, automação analítica e apoio à decisão.",
      en: "Risk prediction, segmentation, scoring, anomaly detection, analytical automation, and decision support.",
    },
  },
  {
    key: "genai",
    title: { pt: "IA Generativa, NLP e LLMs", en: "Generative AI, NLP, and LLMs" },
    description: {
      pt: "Concepção de soluções baseadas em linguagem, recuperação de conhecimento, embeddings, RAG e fluxos inteligentes orientados por contexto.",
      en: "Design of language-based solutions, knowledge retrieval, embeddings, RAG, and context-aware intelligent workflows.",
    },
    applications: {
      pt: "Assistentes especializados, extração semântica, avaliação de modelos, sistemas de recomendação textual e copilots institucionais.",
      en: "Specialized assistants, semantic extraction, model evaluation, textual recommendation systems, and institutional copilots.",
    },
  },
  {
    key: "math-modeling",
    title: { pt: "Modelagem Matemática e Computacional", en: "Mathematical and Computational Modeling" },
    description: {
      pt: "Estruturação de problemas complexos por meio de formulações matemáticas, simulação, otimização e desenho de experimentos computacionais.",
      en: "Structuring complex problems through mathematical formulations, simulation, optimization, and computational experiment design.",
    },
    applications: {
      pt: "Planejamento operacional, heurísticas, metaheurísticas, modelagem de cenários e sistemas de suporte à decisão.",
      en: "Operational planning, heuristics, metaheuristics, scenario modeling, and decision-support systems.",
    },
  },
  {
    key: "education",
    title: { pt: "Educação baseada em dados", en: "Data-Driven Education" },
    description: {
      pt: "Aplicação de IA, taxonomias de aprendizagem e métricas pedagógicas para ampliar precisão diagnóstica e orientar intervenções educacionais.",
      en: "Application of AI, learning taxonomies, and pedagogical metrics to expand diagnostic precision and guide educational interventions.",
    },
    applications: {
      pt: "Recomposição da aprendizagem, monitoramento estudantil, personalização, BNCC e políticas públicas educacionais.",
      en: "Learning recovery, student monitoring, personalization, BNCC-aligned solutions, and educational public policies.",
    },
  },
  {
    key: "climate",
    title: { pt: "Matemática do clima e séries temporais", en: "Climate Mathematics and Time Series" },
    description: {
      pt: "Análise de precipitação, previsibilidade, climatologia e monitoramento ambiental com integração entre modelos matemáticos e dados observacionais.",
      en: "Analysis of precipitation, predictability, climatology, and environmental monitoring integrating mathematical models with observational data.",
    },
    applications: {
      pt: "Risco climático, ESG, séries temporais multiescala, sustentabilidade e apoio a políticas de adaptação.",
      en: "Climate risk, ESG, multiscale time series, sustainability, and support for adaptation policies.",
    },
  },
  {
    key: "bi",
    title: { pt: "Business Intelligence e Analytics", en: "Business Intelligence and Analytics" },
    description: {
      pt: "Construção de leituras gerenciais e executivas orientadas por indicadores, inteligência operacional e governança de dados.",
      en: "Creation of managerial and executive insights driven by indicators, operational intelligence, and data governance.",
    },
    applications: {
      pt: "Dashboards críticos, monitoramento de performance, tradução analítica para liderança e priorização estratégica.",
      en: "Critical dashboards, performance monitoring, analytical translation for leadership, and strategic prioritization.",
    },
  },
  {
    key: "public",
    title: { pt: "Soluções para setor público e políticas públicas", en: "Solutions for the Public Sector and Public Policy" },
    description: {
      pt: "Integração entre evidência, dados e modelagem para programas públicos com maior capacidade de monitoramento, focalização e impacto.",
      en: "Integration of evidence, data, and modeling for public programs with improved monitoring, targeting, and impact.",
    },
    applications: {
      pt: "Educação pública, avaliação de políticas, desenho de indicadores e inteligência institucional.",
      en: "Public education, policy evaluation, indicator design, and institutional intelligence.",
    },
  },
  {
    key: "research",
    title: { pt: "Pesquisa aplicada e desenvolvimento experimental", en: "Applied Research and Experimental Development" },
    description: {
      pt: "Projetos que exigem formulação inédita, leitura interdisciplinar e desenho metodológico robusto para problemas ainda não padronizados.",
      en: "Projects requiring original formulation, interdisciplinary thinking, and robust methodological design for non-standardized problems.",
    },
    applications: {
      pt: "Prototipagem avançada, estudos técnicos, validação experimental e construção de vantagem competitiva baseada em conhecimento.",
      en: "Advanced prototyping, technical studies, experimental validation, and knowledge-based competitive advantage.",
    },
  },
];

export const projectCategories = [
  "Educação",
  "Saúde",
  "Indústria",
  "Finanças",
  "Varejo",
  "Logística",
  "Clima e Meio Ambiente",
  "Pesquisa Científica",
  "Setor Público",
  "Arquitetura Digital",
];

export const projects = [
  {
    category: "Educação",
    sector: { pt: "Educação", en: "Education" },
    title: {
      pt: "Plataforma de recomposição da aprendizagem baseada em IA e BNCC",
      en: "AI-Driven Learning Recovery Platform Aligned with BNCC",
    },
    context: {
      pt: "Solução concebida para ampliar capacidade diagnóstica e orientar intervenções pedagógicas em larga escala.",
      en: "Solution designed to expand diagnostic capacity and guide pedagogical interventions at scale.",
    },
    problem: {
      pt: "Baixa precisão no mapeamento de defasagens e dificuldade em priorizar ações pedagógicas por perfil de estudante.",
      en: "Limited precision in mapping learning gaps and difficulty prioritizing pedagogical actions by student profile.",
    },
    approach: {
      pt: "Integração entre taxonomias de aprendizagem, IA aplicada, trilhas adaptativas e análise de dados educacionais.",
      en: "Integration of learning taxonomies, applied AI, adaptive pathways, and educational data analysis.",
    },
    stack: "Python, NLP, modelagem pedagógica, analytics, regras BNCC",
    impact: {
      pt: "Suporte mais assertivo à recomposição, maior capacidade de personalização e inteligência para políticas públicas educacionais.",
      en: "More assertive support for learning recovery, greater personalization capacity, and intelligence for educational public policy.",
    },
    tags: ["BNCC", "adaptive learning", "edtech", "policy intelligence"],
  },
  {
    category: "Saúde",
    sector: { pt: "Saúde", en: "Healthcare" },
    title: {
      pt: "Modelagem de EEG e análise de padrões para apoio diagnóstico",
      en: "EEG Modeling and Pattern Analysis for Diagnostic Support",
    },
    context: {
      pt: "Pesquisa e desenvolvimento orientados à identificação de sinais relevantes em contextos de elevada complexidade clínica.",
      en: "Research and development focused on identifying relevant signals in highly complex clinical contexts.",
    },
    problem: {
      pt: "Necessidade de ampliar sensibilidade analítica e interpretação de padrões em dados neurofisiológicos.",
      en: "Need to improve analytical sensitivity and pattern interpretation in neurophysiological data.",
    },
    approach: {
      pt: "Modelagem matemática, séries temporais, extração de atributos e métodos de classificação aplicados a EEG.",
      en: "Mathematical modeling, time series, feature extraction, and classification methods applied to EEG.",
    },
    stack: "Python, signal processing, ML, statistics",
    impact: {
      pt: "Fortalecimento de estudos com potencial de apoio à decisão clínica e aprofundamento do entendimento analítico do fenômeno.",
      en: "Strengthening studies with potential to support clinical decisions and deepen analytical understanding of the phenomenon.",
    },
    tags: ["EEG", "health analytics", "diagnostic support", "research"],
  },
  {
    category: "Indústria",
    sector: { pt: "Indústria", en: "Industry" },
    title: {
      pt: "Predição de falhas e otimização operacional em ambiente industrial",
      en: "Failure Prediction and Operational Optimization in Industrial Environments",
    },
    context: {
      pt: "Projetos voltados à continuidade operacional, eficiência de planta e redução de perdas em processos industriais.",
      en: "Projects aimed at operational continuity, plant efficiency, and loss reduction in industrial processes.",
    },
    problem: {
      pt: "Paradas, desperdícios e baixa previsibilidade em equipamentos e operações críticas.",
      en: "Downtime, waste, and limited predictability in critical equipment and operations.",
    },
    approach: {
      pt: "Machine learning para previsão de falhas, análise de processo, modelagem de cenários e priorização de manutenção.",
      en: "Machine learning for failure prediction, process analysis, scenario modeling, and maintenance prioritization.",
    },
    stack: "Python, SQL, forecasting, optimization, dashboards",
    impact: {
      pt: "Maior confiabilidade operacional, redução de interrupções e melhor uso de capacidade produtiva.",
      en: "Greater operational reliability, fewer interruptions, and better use of production capacity.",
    },
    tags: ["predictive maintenance", "manufacturing", "optimization", "analytics"],
    link: "/solucoes/sensormonit",
    linkLabel: "SensorMonit",
  },
  {
    category: "Finanças",
    sector: { pt: "Finanças e crédito", en: "Finance and credit" },
    title: {
      pt: "Modelos de score, antifraude e risco para decisão baseada em machine learning",
      en: "Scoring, Anti-Fraud, and Risk Models for Machine Learning-Based Decisions",
    },
    context: {
      pt: "Ambientes com alto volume transacional e necessidade de equilíbrio entre eficiência, risco e experiência.",
      en: "Environments with high transaction volume and the need to balance efficiency, risk, and user experience.",
    },
    problem: {
      pt: "Perdas por fraude, ineficiência de triagem e baixa capacidade de priorização de risco em tempo útil.",
      en: "Fraud losses, inefficient triage, and low capacity to prioritize risk in a timely manner.",
    },
    approach: {
      pt: "Construção de modelos supervisionados, engenharia de atributos, calibragem e camadas de decisão orientadas por impacto.",
      en: "Development of supervised models, feature engineering, calibration, and impact-oriented decision layers.",
    },
    stack: "Python, PySpark, SQL, AWS, Databricks",
    impact: {
      pt: "Mitigação de perdas, ganho de assertividade e reforço à tomada de decisão crítica.",
      en: "Loss mitigation, improved assertiveness, and stronger support for critical decision-making.",
    },
    tags: ["credit score", "anti-fraud", "risk", "decision intelligence"],
  },
  {
    category: "Varejo",
    sector: { pt: "Varejo", en: "Retail" },
    title: {
      pt: "Modelos de demanda, personalização e inteligência comercial",
      en: "Demand Models, Personalization, and Commercial Intelligence",
    },
    context: {
      pt: "Cenários competitivos com pressão por eficiência comercial, supply chain e experiência do cliente.",
      en: "Competitive scenarios pressured by commercial efficiency, supply chain performance, and customer experience.",
    },
    problem: {
      pt: "Oscilação de demanda, rupturas, baixa previsibilidade e dificuldade de ajustar oferta e preço ao comportamento do mercado.",
      en: "Demand volatility, stockouts, limited predictability, and difficulty aligning offer and price with market behavior.",
    },
    approach: {
      pt: "Forecasting, segmentação, análise comportamental, pricing e priorização baseada em dados.",
      en: "Forecasting, segmentation, behavioral analysis, pricing, and data-driven prioritization.",
    },
    stack: "Python, SQL, BI, forecasting, experimentation",
    impact: {
      pt: "Maior leitura de mercado, mais eficiência comercial e suporte à rentabilidade.",
      en: "Better market understanding, improved commercial efficiency, and support for profitability.",
    },
    tags: ["retail analytics", "pricing", "supply chain", "forecasting"],
  },
  {
    category: "Logística",
    sector: { pt: "Logística marítima e otimização", en: "Maritime logistics and optimization" },
    title: {
      pt: "Otimização logística naval com meta-heurística, VRP e inteligência operacional",
      en: "Naval logistics optimization with meta-heuristics, VRP, and operational intelligence",
    },
    context: {
      pt: "Operação naval multirrestrita com pressão simultânea sobre custo, nível de serviço, ocupação de frota, integração entre demandas e governança de dados em ambiente multitenant.",
      en: "A multi-constrained naval operation under simultaneous pressure on cost, service level, fleet utilization, demand consolidation, and data governance in a multitenant environment.",
    },
    problem: {
      pt: "Rotas pouco eficientes, ocupação média de 60%, alto consumo de bunker, baixa capacidade de simular cenários de risco e custo e dificuldade de traduzir a complexidade operacional para o decisor em tempo hábil.",
      en: "Inefficient routes, average fleet utilization of 60%, high bunker consumption, limited ability to simulate cost and risk scenarios, and difficulty translating operational complexity into timely decision support.",
    },
    approach: {
      pt: "Desenvolvimento de um modelo matemático de VRP com janelas de tempo e restrições de capacidade volumétrica/tanque, resolvido por meta-heurística e motor de simulação multi-cenário. A solução incorporou agrupamento inteligente de demandas, sequenciamento de portos, bunker dinâmico, APIs Type 4, SLA operacional, Gantt interativo e mapa de rotas em SVG para leitura executiva.",
      en: "Development of a VRP mathematical model with time windows and volumetric/tank capacity constraints, solved through meta-heuristics and a multi-scenario simulation engine. The solution incorporated intelligent demand clustering, port sequencing, dynamic bunker optimization, Type 4 APIs, operational SLA controls, an interactive Gantt, and SVG route maps for executive decision-making.",
    },
    stack: "Python, operations research, meta-heuristics, VRP, multitenancy, AWS, Azure, Oracle, SVG, Type 4 APIs",
    impact: {
      pt: "Redução de USD 96 mil por mês no custo operacional, aumento da ocupação de frota de 60% para 87%, redução de 22% na pegada de carbono e arquitetura cloud-agnostic com 100% de isolamento de dados em ambiente multitenant.",
      en: "Reduced operational cost by USD 96k per month, increased fleet utilization from 60% to 87%, lowered carbon footprint by 22%, and delivered a cloud-agnostic architecture with 100% data isolation in a multitenant environment.",
    },
    tags: ["VRP", "meta-heuristics", "multitenancy", "bunker optimization", "SVG routing"],
    link: "/solucoes/curral",
    linkLabel: "Curral AI",
  },
  {
    category: "Logística",
    sector: { pt: "Logística Marítima e Pesquisa Operacional", en: "Maritime Logistics and Operations Research" },
    title: {
      pt: "Pharos — DSS de cabotagem multi-porto com modelagem de marés e otimização",
      en: "Pharos — Multi-port cabotage DSS with tide modeling and optimization",
    },
    context: {
      pt: "Sistema de Suporte à Decisão para planejamento operacional de cabotagem marítima com horizonte de até 60 dias, integrando motor de marés, restrições de calado e UKC, modelos de custo e heurística multi-cenário.",
      en: "Decision Support System for maritime cabotage operational planning with a 60-day horizon, integrating a tide engine, draft and UKC constraints, cost models, and a multi-scenario heuristic.",
    },
    problem: {
      pt: "Planejamento manual de rotas marítimas sujeito a restrições simultâneas de calado, maré, capacidade, segregação IMDG e janelas de ressuprimento — sem visibilidade de custo nem comparação de cenários em tempo hábil.",
      en: "Manual maritime route planning under simultaneous constraints of draft, tide, capacity, IMDG segregation, and supply windows — with no cost visibility or timely scenario comparison.",
    },
    approach: {
      pt: "Motor de marés com síntese harmônica (DHN 2026, 8 componentes astronômicas, 10 portos brasileiros) para validação de calado/UKC por chegada. Metaheurística construtiva greedy (multi_porto_heuristica_v3.3) executada em Web Worker gera 4 cenários paralelos — OTIMISTA, BASE, CONSERVADOR e CUSTO_MÍNIMO — com modelos de custo de bunker (FULL/ECO/MIN), hire TC, SPOT, demurrage e reefer.",
      en: "Harmonic tide engine (DHN 2026, 8 astronomical components, 10 Brazilian ports) for per-arrival draft/UKC validation. Greedy constructive meta-heuristic (multi_porto_heuristica_v3.3) running in a Web Worker generates 4 parallel scenarios — OPTIMISTIC, BASE, CONSERVATIVE, and MINIMUM_COST — with bunker cost models (FULL/ECO/MIN), TC hire, SPOT, demurrage, and reefer.",
    },
    stack: "TypeScript, Web Workers, síntese harmônica de marés, VRP, meta-heurística, WorldTides API, Gantt SVG, API Type 4",
    impact: {
      pt: "Automação do planejamento de viagens com validação física de calado × maré, comparação de 4 cenários de custo em < 2 min no browser e saída API Type 4 com Gantt e mapa SVG de rotas para tomada de decisão comercial e operacional.",
      en: "Automated voyage planning with physical draft × tide validation, 4-scenario cost comparison in under 2 minutes in the browser, and Type 4 API output with Gantt and SVG route map for commercial and operational decision-making.",
    },
    tags: ["cabotage", "tide modeling", "VRP", "DSS", "operations research", "maritime logistics"],
    link: "/solucoes/pharo",
    linkLabel: "Pharos",
  },
  {
    category: "Clima e Meio Ambiente",
    sector: { pt: "Clima e ESG", en: "Climate and ESG" },
    title: {
      pt: "Matemática do clima, precipitação e modelagem para sustentabilidade",
      en: "Climate Mathematics, Precipitation, and Sustainability Modeling",
    },
    context: {
      pt: "Projetos e pesquisas dedicados à compreensão de sistemas climáticos, previsibilidade e variáveis ambientais relevantes para políticas e negócios.",
      en: "Projects and research dedicated to understanding climate systems, predictability, and environmental variables relevant to policy and business.",
    },
    problem: {
      pt: "Necessidade de traduzir complexidade climática em inteligência acionável para sustentabilidade, risco e adaptação.",
      en: "Need to translate climate complexity into actionable intelligence for sustainability, risk, and adaptation.",
    },
    approach: {
      pt: "Séries temporais, modelagem estatística e matemática, leitura geoespacial e integração entre variáveis observacionais.",
      en: "Time series, statistical and mathematical modeling, geospatial interpretation, and integration of observational variables.",
    },
    stack: "Climate analytics, time series, Python, geospatial reasoning",
    impact: {
      pt: "Apoio a agendas de sustentabilidade, leitura de risco e fortalecimento de decisões em contextos climáticos e ambientais.",
      en: "Support for sustainability agendas, risk interpretation, and stronger decisions in climate and environmental contexts.",
    },
    tags: ["climate math", "precipitation", "ESG", "sustainability"],
    link: "/solucoes/greensenti",
    linkLabel: "GreenSenti",
  },
  {
    category: "Clima e Meio Ambiente",
    sector: { pt: "Agropecuária & Floresta", en: "Agribusiness & Forestry" },
    title: {
      pt: "EucaSmart — Gestão inteligente de eucalipto com IA e sensoriamento",
      en: "EucaSmart — Intelligent eucalyptus management with AI and sensing",
    },
    context: {
      pt: "Solução de precision agriculture voltada ao monitoramento de talhões de eucalipto, integrando sensores de campo, modelos preditivos e inteligência operacional para produtores florestais.",
      en: "Precision agriculture solution for eucalyptus stand monitoring, integrating field sensors, predictive models, and operational intelligence for forestry producers.",
    },
    problem: {
      pt: "Baixa previsibilidade de produtividade, manejo reativo e dificuldade de escalar decisões técnicas em grandes extensões de plantio.",
      en: "Low productivity predictability, reactive management, and difficulty scaling technical decisions across large planting areas.",
    },
    approach: {
      pt: "Integração de sensores IoT, modelos de crescimento, imagens de satélite e IA preditiva para otimizar ciclos de corte, irrigação e manejo fitossanitário.",
      en: "Integration of IoT sensors, growth models, satellite imagery, and predictive AI to optimize cutting cycles, irrigation, and phytosanitary management.",
    },
    stack: "Python, IoT, satellite imagery, time series, predictive modeling",
    impact: {
      pt: "Maior precisão no planejamento de colheita, redução de perdas por pragas e clima, e decisões operacionais mais rápidas e defensáveis.",
      en: "Improved harvest planning precision, reduced losses from pests and climate, and faster, more defensible operational decisions.",
    },
    tags: ["precision agriculture", "eucalyptus", "forestry", "IoT", "ESG"],
    link: "/solucoes/eucasmart",
    linkLabel: "EucaSmart",
  },
  {
    category: "Pesquisa Científica",
    sector: { pt: "Pesquisa científica", en: "Scientific research" },
    title: {
      pt: "Produção interdisciplinar em educação matemática, clima, EEG e modelagem aplicada",
      en: "Interdisciplinary Research in Math Education, Climate, EEG, and Applied Modeling",
    },
    context: {
      pt: "Linha de produção intelectual orientada à formulação de conhecimento com relevância metodológica e aplicação potencial.",
      en: "A line of intellectual production oriented toward knowledge creation with methodological relevance and potential application.",
    },
    problem: {
      pt: "Conectar agendas de pesquisa complexas a problemas reais sem perder rigor teórico e densidade analítica.",
      en: "Connecting complex research agendas to real problems without losing theoretical rigor and analytical density.",
    },
    approach: {
      pt: "Pesquisa aplicada, escrita científica, análise quantitativa e construção de pontes entre teoria e implementação.",
      en: "Applied research, scientific writing, quantitative analysis, and building bridges between theory and implementation.",
    },
    stack: "Research design, statistics, mathematical modeling, technical writing",
    impact: {
      pt: "Consolidação de autoridade científica e ampliação de repertório aplicável a consultoria, ensino e inovação.",
      en: "Consolidation of scientific authority and expansion of expertise applicable to consulting, teaching, and innovation.",
    },
    tags: ["publications", "research", "interdisciplinary", "science"],
  },
  {
    category: "Setor Público",
    sector: { pt: "Setor público", en: "Public sector" },
    title: {
      pt: "Inteligência aplicada para políticas públicas, monitoramento e decisão institucional",
      en: "Applied Intelligence for Public Policy, Monitoring, and Institutional Decision-Making",
    },
    context: {
      pt: "Atuação em contextos onde escalabilidade, evidência e impacto social precisam caminhar juntos.",
      en: "Work in contexts where scalability, evidence, and social impact must move together.",
    },
    problem: {
      pt: "Baixa capacidade de leitura integrada dos dados e dificuldade de orientar decisões com base em evidências confiáveis.",
      en: "Limited capacity for integrated data interpretation and difficulty guiding decisions through reliable evidence.",
    },
    approach: {
      pt: "Indicadores, analytics, modelagem e desenho de sistemas capazes de apoiar focalização, acompanhamento e priorização.",
      en: "Indicators, analytics, modeling, and system design capable of supporting targeting, monitoring, and prioritization.",
    },
    stack: "Policy analytics, dashboards, modeling, decision systems",
    impact: {
      pt: "Maior clareza institucional, suporte à ação pública e fortalecimento da capacidade analítica das organizações.",
      en: "Greater institutional clarity, support for public action, and stronger analytical capacity within organizations.",
    },
    tags: ["public policy", "education", "government", "impact"],
  },
  {
    category: "HealthTech e IA aplicada",
    sector: { pt: "Auditoria médica e recuperação financeira", en: "Medical auditing and financial recovery" },
    title: {
      pt: "Wealthy Audit Flow AI / AuditMed para auditoria de contas médicas e recuperação de glosas",
      en: "Wealthy Audit Flow AI / AuditMed for medical-billing auditing and claim recovery",
    },
    context: {
      pt: "Plataforma SaaS multi-tenant criada para operadoras de saúde, clínicas e hospitais analisarem arquivos TISS, XML, Excel e CSV, detectando cobranças indevidas, glosas recuperáveis e anomalias financeiras em escala.",
      en: "A multi-tenant SaaS platform built for health insurers, clinics, and hospitals to analyze TISS, XML, Excel, and CSV files, detecting improper charges, recoverable denials, and financial anomalies at scale.",
    },
    problem: {
      pt: "Equipes de auditoria lidavam com grande volume de contas médicas, baixa rastreabilidade de inconsistências, risco de fraude, dificuldade de priorizar recursos e pouca visibilidade sobre recuperação potencial e modelo de success fee.",
      en: "Audit teams faced high volumes of medical bills, limited inconsistency traceability, fraud risk, difficulty prioritizing appeals, and low visibility into recovery potential and success-fee economics.",
    },
    approach: {
      pt: "Desenho de arquitetura React + Vite com Base44, entidades isoladas por tenant, pipeline de upload e extração de arquivos, análise com IA generativa para classificar duplicidades, sobrepreço, incompatibilidades TUSS/TISS e materiais sem registro ANVISA, além de dashboards, relatórios executivos e trilha de recuperação financeira por anomalia.",
      en: "Designed a React + Vite architecture on Base44 with tenant-isolated entities, file-upload and extraction pipeline, generative-AI analysis to classify duplications, overpricing, TUSS/TISS incompatibilities, and materials lacking ANVISA registration, plus dashboards, executive reports, and financial recovery tracking per anomaly.",
    },
    stack: "React 18, Vite, Tailwind CSS, shadcn/ui, TanStack Query, React Router v6, Base44, JWT Auth, NoSQL entities, LLM analysis, Recharts",
    impact: {
      pt: "A solução estruturou uma operação auditável ponta a ponta, com detecção automática de anomalias, cálculo de potencial recuperável, gestão de success fee e acompanhamento do ciclo de recurso para transformar auditoria médica em inteligência operacional e financeira. Demo: https://wealthy-audit-flow-ai.base44.app",
      en: "The solution structured an end-to-end auditable operation, with automated anomaly detection, recoverable-value estimation, success-fee calculation, and appeal lifecycle tracking to turn medical auditing into operational and financial intelligence. Demo: https://wealthy-audit-flow-ai.base44.app",
    },
    tags: ["healthtech", "multi-tenant", "TISS/TUSS", "generative AI", "claim recovery"],
    link: "https://wealthy-audit-flow-ai.base44.app",
  },
];

export const impactStats = [
  {
    value: "Multissetorial",
    title: { pt: "Experiência com contextos críticos", en: "Experience across critical contexts" },
    text: {
      pt: "Atuação em educação, saúde, indústria, finanças, varejo, logística, clima, pesquisa científica e setor público.",
      en: "Work spanning education, healthcare, industry, finance, retail, logistics, climate, scientific research, and the public sector.",
    },
  },
  {
    value: "Dados → Estratégia",
    title: { pt: "Leitura executiva de problemas complexos", en: "Executive reading of complex problems" },
    text: {
      pt: "Capacidade de converter sinais dispersos em modelos, decisões, sistemas e priorizações acionáveis.",
      en: "Ability to convert dispersed signals into models, decisions, systems, and actionable priorities.",
    },
  },
  {
    value: "IA + Matemática",
    title: { pt: "Combinação rara de competências", en: "A rare combination of competencies" },
    text: {
      pt: "Integra machine learning, modelagem matemática, educação, clima e pesquisa aplicada em uma mesma arquitetura intelectual.",
      en: "Integrates machine learning, mathematical modeling, education, climate, and applied research within one intellectual architecture.",
    },
  },
  {
    value: "Impacto Mensurável",
    title: { pt: "Resultados orientados à decisão", en: "Decision-oriented outcomes" },
    text: {
      pt: "Foco em eficiência operacional, inteligência institucional, escalabilidade, precisão analítica e suporte à liderança.",
      en: "Focus on operational efficiency, institutional intelligence, scalability, analytical precision, and leadership support.",
    },
  },
];

export const experienceTimeline = [
  {
    org: "Fundação Sagres",
    role: {
      pt: "Consultoria e inteligência aplicada",
      en: "Consulting and applied intelligence",
    },
    focus: {
      pt: "Estruturação de soluções analíticas e apoio a decisões com forte densidade metodológica.",
      en: "Structuring analytical solutions and supporting decisions with strong methodological depth.",
    },
  },
  {
    org: "A&C",
    role: { pt: "Analytics e modelagem de negócio", en: "Business analytics and modeling" },
    focus: {
      pt: "Leitura de dados para eficiência operacional, previsibilidade e suporte gerencial.",
      en: "Data interpretation for operational efficiency, predictability, and managerial support.",
    },
  },
  {
    org: "Unimed Seguros",
    role: { pt: "Inteligência para saúde e seguros", en: "Intelligence for health and insurance" },
    focus: {
      pt: "Modelos de risco, antifraude e leitura analítica para ambientes assistenciais e securitários.",
      en: "Risk models, anti-fraud systems, and analytical interpretation for healthcare and insurance environments.",
    },
  },
  {
    org: "Mercedes-Benz",
    role: { pt: "Modelagem e inteligência industrial", en: "Industrial modeling and intelligence" },
    focus: {
      pt: "Aplicação de analytics e otimização a cenários industriais de alta exigência operacional.",
      en: "Application of analytics and optimization to industrial scenarios with high operational demands.",
    },
  },
  {
    org: "Logística marítima e otimização operacional",
    role: { pt: "Pesquisa operacional, VRP e simulação multi-cenário", en: "Operations research, VRP, and multi-scenario simulation" },
    focus: {
      pt: "Desenvolvimento de solução meta-heurística cloud-agnostic para roteirização naval, multitenancy, redução de bunker, Gantt interativo e mapa de rotas em SVG voltados à decisão executiva.",
      en: "Development of a cloud-agnostic meta-heuristic solution for naval routing, multitenancy, bunker reduction, an interactive Gantt, and SVG route maps designed for executive decision-making.",
    },
  },
  {
    org: "Tenda Construtora",
    role: { pt: "Dados e decisão aplicada", en: "Data and applied decision-making" },
    focus: {
      pt: "Indicadores, priorização e apoio à leitura executiva em ambiente corporativo.",
      en: "Indicators, prioritization, and support for executive interpretation in a corporate environment.",
    },
  },
  {
    org: "Walmart",
    role: { pt: "Analytics para varejo e operação", en: "Analytics for retail and operations" },
    focus: {
      pt: "Previsão, inteligência comercial, comportamento de demanda e eficiência de cadeia.",
      en: "Forecasting, commercial intelligence, demand behavior, and supply-chain efficiency.",
    },
  },
  {
    org: "IGTI / CEFET-MG",
    role: { pt: "Docência e formação técnica", en: "Teaching and technical education" },
    focus: {
      pt: "Formação de profissionais, desenho curricular e tradução de conteúdos complexos em aprendizagem de alto nível.",
      en: "Training professionals, curriculum design, and translating complex content into high-level learning.",
    },
  },
  {
    org: "UNESCO",
    role: { pt: "Projetos com relevância institucional", en: "Institutionally relevant projects" },
    focus: {
      pt: "Contribuições associadas à educação, evidência, monitoramento e construção de impacto público.",
      en: "Contributions linked to education, evidence, monitoring, and public impact building.",
    },
  },
  {
    org: "Secretaria de Estado de Educação de Minas Gerais",
    role: { pt: "Inteligência para educação pública", en: "Intelligence for public education" },
    focus: {
      pt: "Análise educacional, monitoramento, IA aplicada e soluções para políticas públicas de aprendizagem.",
      en: "Educational analysis, monitoring, applied AI, and solutions for public learning policies.",
    },
  },
];

export const educationTimeline = [
  {
    title: {
      pt: "Doutorado em Modelagem Matemática e Computacional",
      en: "PhD in Mathematical and Computational Modeling",
    },
    institution: "CEFET-MG",
  },
  {
    title: { pt: "Doutorado em Matemática do Clima", en: "PhD in Climate Mathematics" },
    institution: "Sorbonne University",
  },
  {
    title: { pt: "MBA in Data Science", en: "MBA in Data Science" },
    institution: "University of Hartford",
  },
  {
    title: {
      pt: "Mestrado em Modelagem Matemática e Computacional",
      en: "Master's in Mathematical and Computational Modeling",
    },
    institution: "CEFET-MG",
  },
  {
    title: { pt: "Especialização em Cálculo", en: "Graduate Specialization in Calculus" },
    institution: "UFMG",
  },
  {
    title: { pt: "Especialização em Educação Matemática", en: "Graduate Specialization in Mathematics Education" },
    institution: "—",
  },
  {
    title: { pt: "Bacharelado em Matemática", en: "Bachelor's in Mathematics" },
    institution: "—",
  },
];

export const publications = [
  {
    type: { pt: "Artigo / Educação", en: "Article / Education" },
    year: "2025",
    theme: "Educação",
    title: {
      pt: "O impacto da recomposição da aprendizagem: um estudo profundo de como a recomposição escolar pode melhor os níveis de desempenho dos estudantes da Ensino Fundamental II",
      en: "The impact of learning recovery: an in-depth study of how school recovery can improve elementary students' performance levels",
    },
    venue: {
      pt: "Caderno Pedagógico, v. 22, n. 9, e18270",
      en: "Caderno Pedagógico, vol. 22, no. 9, e18270",
    },
    summary: {
      pt: "Artigo sobre recomposição da aprendizagem com análise quantitativa do uso da plataforma Desafio Crescer e correlação entre engajamento escolar, descritores críticos e evolução de proficiência em avaliações oficiais.",
      en: "Article on learning recovery featuring a quantitative analysis of the Desafio Crescer platform and the correlation between school engagement, critical descriptors, and proficiency gains in official assessments.",
    },
    link: "https://ojs.studiespublicacoes.com.br/ojs/index.php/cadped/article/view/18270",
    doi: "https://doi.org/10.54033/cadpedv22n9-249",
  },
  {
    type: { pt: "Artigo / Educação", en: "Article / Education" },
    year: "2019",
    theme: "Educação",
    title: {
      pt: "Ensino da matemática convergente com a BNCC 2017: uma análise de experiências exitosas",
      en: "Teaching mathematics aligned with BNCC 2017: an analysis of successful experiences",
    },
    venue: {
      pt: "CoInspiração - Revista dos Professores que Ensinam Matemática, v. 2, n. 1, p. 69–94",
      en: "CoInspiração - Journal of Mathematics Teachers, vol. 2, no. 1, pp. 69–94",
    },
    summary: {
      pt: "Publicação dedicada à tradução prática da BNCC para o ensino da matemática, reunindo experiências pedagógicas, metodologias ativas e estratégias aplicáveis ao ensino fundamental e médio.",
      en: "Publication focused on translating BNCC into practical mathematics teaching through pedagogical cases, active methodologies, and classroom strategies for middle and secondary education.",
    },
    link: "https://sbemmatogrosso.com.br/publicacoes/index.php/coinspiracao/article/view/50",
    doi: "https://doi.org/10.61074/2596-0172.2019.v2.69-94",
  },
  {
    type: { pt: "Pesquisa / Clima", en: "Research / Climate" },
    year: "2020",
    theme: "Clima",
    title: {
      pt: "Estudo matemático e estatístico sobre a análise do volume das precipitações pluviométricas na cidade de São Paulo e sua previsibilidade usando o modelo ARIMA",
      en: "Mathematical and statistical study of rainfall volume in São Paulo and its predictability using the ARIMA model",
    },
    venue: {
      pt: "Proceeding Series of the Brazilian Society of Computational and Applied Mathematics, v. 7, n. 1",
      en: "Proceeding Series of the Brazilian Society of Computational and Applied Mathematics, vol. 7, no. 1",
    },
    summary: {
      pt: "Trabalho sobre modelagem de séries temporais não estacionárias para análise de sazonalidade e previsibilidade de precipitações máximas na capital paulista, com ênfase em métodos ARIMA.",
      en: "Paper on non-stationary time-series modeling for seasonality and predictability analysis of maximum rainfall in São Paulo, with emphasis on ARIMA methods.",
    },
    link: "https://proceedings.sbmac.org.br/sbmac/article/view/3076",
    doi: "https://doi.org/10.5540/03.2020.007.01.0380",
  },
  {
    type: { pt: "Pesquisa / Clima", en: "Research / Climate" },
    year: "2018",
    theme: "Clima",
    title: {
      pt: "Análise do volume das precipitações pluviométricas em Belo Horizonte e sua previsibilidade usando expoente de Hurst",
      en: "Analysis of rainfall volume in Belo Horizonte and its predictability using the Hurst exponent",
    },
    venue: {
      pt: "Proceeding Series of the Brazilian Society of Computational and Applied Mathematics, v. 6, n. 2",
      en: "Proceeding Series of the Brazilian Society of Computational and Applied Mathematics, vol. 6, no. 2",
    },
    summary: {
      pt: "Estudo que investiga autocorrelação, tendência e crescimento linear de precipitações históricas em Belo Horizonte a partir de análise multifractal e coeficiente de Hurst.",
      en: "Study investigating autocorrelation, trend, and linear growth in historical rainfall series in Belo Horizonte through multifractal analysis and the Hurst coefficient.",
    },
    link: "https://proceedings.sbmac.emnuvens.com.br/sbmac/article/view/2376",
    doi: "https://doi.org/10.5540/03.2018.006.02.0253",
  },
];

export const certifications = [
  "AWS Machine Learning",
  "Google Cloud Professional Data Engineer",
  "Databricks Certified Associate",
  "IBM Data Science Professional",
  "IBM Deep Learning Specialist",
  "AWS SageMaker",
  "IBM Watson AutoML",
];

export const stack = [
  "Python",
  "PySpark",
  "R",
  "SQL",
  "Databricks",
  "AWS",
  "GCP",
  "Azure",
  "Power BI",
  "Grafana",
  "Looker Studio",
  "Streamlit",
  "FastAPI",
  "NLP",
  "RAG",
  "Embeddings",
  "GPT / Gemini / Bedrock",
  "ML / DL / LLM Evaluation",
];

export const speaking = {
  intro: {
    pt: "Além da atuação em projetos e pesquisa, Giselle desenvolve formação de profissionais, participa de debates públicos e contribui para a construção de repertórios técnicos em inteligência artificial, matemática aplicada e educação.",
    en: "Beyond project and research work, Giselle trains professionals, contributes to public debates, and helps build technical repertoires in artificial intelligence, applied mathematics, and education.",
  },
  themes: {
    pt: [
      "Formação de profissionais em dados e IA",
      "Docência e desenho curricular",
      "Palestras e participação em eventos",
      "Debates sobre educação, matemática e inteligência artificial",
    ],
    en: [
      "Training professionals in data and AI",
      "Teaching and curriculum design",
      "Talks and event participation",
      "Debates on education, mathematics, and artificial intelligence",
    ],
  },
};

export const consultingServices = [
  {
    key: "industrial-ai",
    title: { pt: "IA industrial, visão computacional e automação analítica", en: "Industrial AI, computer vision, and analytical automation" },
    summary: {
      pt: "Desenho de soluções para inspeção, qualidade, segurança operacional, leitura visual e monitoramento inteligente em operações complexas.",
      en: "Solution design for inspection, quality, operational safety, visual interpretation, and intelligent monitoring in complex operations.",
    },
    deliverables: {
      pt: "Arquitetura do caso de uso, protótipo técnico, critérios de medição, indicadores de operação e plano de implantação.",
      en: "Use-case architecture, technical prototype, measurement criteria, operational indicators, and implementation plan.",
    },
  },
  {
    key: "digital-twins",
    title: { pt: "Digital twins e sistemas de decisão para operações críticas", en: "Digital twins and decision systems for critical operations" },
    summary: {
      pt: "Estruturação de gêmeos digitais, simulação multicenário, leitura de sensores e apoio à decisão para ambientes com alta variabilidade e custo operacional elevado.",
      en: "Structuring digital twins, multi-scenario simulation, sensor interpretation, and decision support for environments with high variability and significant operating costs.",
    },
    deliverables: {
      pt: "Modelo de simulação, cenários, lógica de decisão, painel analítico e desenho do fluxo operacional.",
      en: "Simulation model, scenarios, decision logic, analytical dashboard, and operating-flow design.",
    },
  },
  {
    key: "math-modeling",
    title: { pt: "Modelagem matemática, otimização e inteligência operacional", en: "Mathematical modeling, optimization, and operational intelligence" },
    summary: {
      pt: "Formulação de problemas complexos, heurísticas, meta-heurísticas, previsões e estruturas de otimização para reduzir perdas, melhorar ocupação e orientar alocação de recursos.",
      en: "Formulation of complex problems, heuristics, meta-heuristics, forecasting, and optimization structures to reduce losses, improve utilization, and guide resource allocation.",
    },
    deliverables: {
      pt: "Modelos, simuladores, cenários comparativos, motor de priorização e suporte técnico à decisão executiva.",
      en: "Models, simulators, comparative scenarios, prioritization engines, and technical support for executive decision-making.",
    },
  },
  {
    key: "strategic-analytics",
    title: { pt: "Estratégia analítica para educação, saúde e setor público", en: "Analytical strategy for education, healthcare, and the public sector" },
    summary: {
      pt: "Projetos para organizações que precisam transformar dados dispersos em critérios robustos de diagnóstico, monitoramento, priorização e ação institucional.",
      en: "Projects for organizations that need to turn fragmented data into robust criteria for diagnosis, monitoring, prioritization, and institutional action.",
    },
    deliverables: {
      pt: "Diagnóstico, arquitetura de indicadores, sistema analítico, roteiro de priorização e narrativa executiva para tomada de decisão.",
      en: "Diagnosis, indicator architecture, analytical system, prioritization roadmap, and executive narrative for decision-making.",
    },
  },
];

export const consultingSectors = {
  pt: ["Indústria", "Logística", "Saúde", "Educação", "Setor público", "Infraestrutura"],
  en: ["Industry", "Logistics", "Healthcare", "Education", "Public sector", "Infrastructure"],
};

export const caseStudies = [
  {
    key: "cabotagem",
    sector: { pt: "Logística marítima e supply chain", en: "Maritime logistics and supply chain" },
    metric: { pt: "USD 96 mil/mês de redução de custo operacional", en: "USD 96k/month reduction in operating cost" },
    title: {
      pt: "Motor de otimização naval com meta-heurística, VRP e simulação multicenário",
      en: "Naval optimization engine with meta-heuristics, VRP, and multi-scenario simulation",
    },
    result: {
      pt: "Estruturação de um sistema de roteirização executiva com bunker dinâmico, leitura de risco, Gantt interativo e mapa operacional para transformar complexidade logística em decisão acionável.",
      en: "Structuring an executive routing system with dynamic bunker optimization, risk interpretation, an interactive Gantt, and operational mapping to turn logistics complexity into actionable decisions.",
    },
    proof: {
      pt: "Case em produção com aumento da ocupação de frota de 60% para 87% e redução de 22% na pegada de carbono.",
      en: "Production case with fleet utilization increasing from 60% to 87% and a 22% reduction in carbon footprint.",
    },
    tags: ["VRP", "meta-heurística", "cabotagem", "simulação", "inteligência operacional"],
  },
  {
    key: "auditmed",
    sector: { pt: "Saúde, auditoria e recuperação financeira", en: "Healthcare, auditing, and financial recovery" },
    metric: { pt: "Auditoria assistida por IA para glosas, fraudes e recuperação", en: "AI-assisted auditing for denials, fraud, and recovery" },
    title: {
      pt: "Plataforma de auditoria médica com IA para detectar anomalias e recuperar receita",
      en: "Medical-auditing platform using AI to detect anomalies and recover revenue",
    },
    result: {
      pt: "Desenho de plataforma SaaS multi-tenant capaz de analisar arquivos TISS, XML, Excel e CSV, identificar inconsistências e transformar auditoria médica em inteligência operacional e financeira.",
      en: "Design of a multi-tenant SaaS platform able to analyze TISS, XML, Excel, and CSV files, identify inconsistencies, and turn medical auditing into operational and financial intelligence.",
    },
    proof: {
      pt: "A solução organizou trilha auditável, cálculo de potencial recuperável, success fee e gestão do ciclo de recurso em um fluxo único de decisão.",
      en: "The solution organized an auditable trail, recoverable-value estimation, success-fee logic, and appeal-lifecycle management in a single decision flow.",
    },
    tags: ["healthtech", "auditoria", "LLM", "multi-tenant", "recuperação financeira"],
  },
  {
    key: "educacao-ia",
    sector: { pt: "Educação e políticas públicas", en: "Education and public policy" },
    metric: { pt: "Escala diagnóstica e priorização pedagógica orientada por evidência", en: "Diagnostic scale and evidence-driven pedagogical prioritization" },
    title: {
      pt: "Arquitetura analítica para recomposição da aprendizagem com IA e BNCC",
      en: "Analytical architecture for learning recovery with AI and BNCC alignment",
    },
    result: {
      pt: "Desenho de sistema para identificar lacunas, orientar personalização e apoiar decisões pedagógicas e institucionais a partir de taxonomias, analytics e leitura de desempenho.",
      en: "Design of a system to identify gaps, guide personalization, and support pedagogical and institutional decisions through taxonomies, analytics, and performance interpretation.",
    },
    proof: {
      pt: "Integração entre evidência educacional, modelagem analítica e implementação prática para redes, escolas e organizações públicas.",
      en: "Integration of educational evidence, analytical modeling, and practical implementation for school systems, schools, and public organizations.",
    },
    tags: ["edtech", "BNCC", "analytics educacional", "priorização", "política pública"],
  },
];

export const insightArticles = [
  {
    slug: "matematica-que-vira-decisao",
    category: { pt: "Matemática aplicada", en: "Applied mathematics" },
    title: {
      pt: "Matemática que vira decisão",
      en: "Mathematics that becomes decision",
    },
    excerpt: {
      pt: "Conteúdos para mostrar como modelagem, estatística e critérios quantitativos estruturam decisões mais robustas em operação, política e estratégia.",
      en: "Content showing how modeling, statistics, and quantitative criteria structure stronger decisions in operations, policy, and strategy.",
    },
    audience: {
      pt: "Lideranças, pesquisadores e times que precisam sair da abstração e decidir com estrutura.",
      en: "Leaders, researchers, and teams that need to move beyond abstraction and decide with structure.",
    },
  },
  {
    slug: "ia-industrial-sem-espuma",
    category: { pt: "IA industrial", en: "Industrial AI" },
    title: {
      pt: "IA industrial sem espuma",
      en: "Industrial AI without hype",
    },
    excerpt: {
      pt: "Uma linha editorial para separar discurso de resultado, com foco em sistemas úteis, governança, criticidade operacional e retorno verificável.",
      en: "An editorial line designed to separate rhetoric from results, focusing on useful systems, governance, operational criticality, and verifiable return.",
    },
    audience: {
      pt: "Executivos, gestores de operação, times de inovação e lideranças técnicas que querem IA com critério.",
      en: "Executives, operations leaders, innovation teams, and technical leadership seeking AI with judgment.",
    },
  },
  {
    slug: "modelos-matematicos-problemas-reais",
    category: { pt: "Modelagem e decisão", en: "Modeling and decision-making" },
    title: {
      pt: "Modelos matemáticos para problemas reais",
      en: "Mathematical models for real problems",
    },
    excerpt: {
      pt: "Artigos sobre otimização, simulação, previsão e desenho de sistemas analíticos para contextos multirrestritos e economicamente sensíveis.",
      en: "Articles on optimization, simulation, forecasting, and analytical-system design for multi-constrained, economically sensitive contexts.",
    },
    audience: {
      pt: "Logística, indústria, infraestrutura, setor público e organizações intensivas em decisão.",
      en: "Logistics, industry, infrastructure, the public sector, and decision-intensive organizations.",
    },
  },
  {
    slug: "visao-computacional-operacao",
    category: { pt: "Visão computacional", en: "Computer vision" },
    title: {
      pt: "Visão computacional que entra na operação",
      en: "Computer vision that reaches operations",
    },
    excerpt: {
      pt: "Série sobre inspeção, qualidade, segurança e leitura visual aplicadas a plantas industriais, infraestrutura e ambientes críticos.",
      en: "A series on inspection, quality, safety, and visual interpretation applied to industrial plants, infrastructure, and critical environments.",
    },
    audience: {
      pt: "Times industriais, engenharia, qualidade, segurança e inovação aplicada.",
      en: "Industrial teams, engineering, quality, safety, and applied-innovation groups.",
    },
  },
  {
    slug: "digital-twins-decisao",
    category: { pt: "Digital twins", en: "Digital twins" },
    title: {
      pt: "Digital twins para decisão operacional",
      en: "Digital twins for operational decision-making",
    },
    excerpt: {
      pt: "Conteúdos sobre gêmeos digitais, simulação de cenários, sensores, previsibilidade e sistemas de resposta para operações complexas.",
      en: "Content about digital twins, scenario simulation, sensors, predictability, and response systems for complex operations.",
    },
    audience: {
      pt: "Operações, planejamento, supply chain, manutenção e engenharia de processos.",
      en: "Operations, planning, supply chain, maintenance, and process-engineering teams.",
    },
  },
  {
    slug: "avaliar-modelos-ia-rigor",
    category: { pt: "Avaliação de modelos", en: "Model evaluation" },
    title: {
      pt: "Como avaliar modelos de IA com rigor",
      en: "How to evaluate AI models rigorously",
    },
    excerpt: {
      pt: "Reflexões sobre validação, vieses, robustez, monitoramento e uso responsável de modelos em contextos sensíveis.",
      en: "Reflections on validation, bias, robustness, monitoring, and responsible model use in sensitive contexts.",
    },
    audience: {
      pt: "Times de dados, inovação, pesquisa aplicada e lideranças que precisam confiar na decisão algorítmica.",
      en: "Data, innovation, and applied-research teams that need to trust algorithmic decisions.",
    },
  },
];

export const faqItems = [
  {
    question: {
      pt: "Que tipo de consultoria Giselle Couto Falcão oferece?",
      en: "What type of consulting does Giselle Couto Falcão offer?",
    },
    answer: {
      pt: "Giselle atua com consultoria estratégica em tecnologia, inovação e inteligência artificial, incluindo IA generativa, machine learning, analytics, modelagem matemática computacional e desenho de soluções para operações, negócios, educação e setor público.",
      en: "Giselle provides strategic consulting in technology, innovation, and artificial intelligence, including generative AI, machine learning, analytics, computational mathematical modeling, and solution design for operations, business, education, and the public sector.",
    },
  },
  {
    question: {
      pt: "Para quais setores a consultoria é mais aderente?",
      en: "Which sectors are the best fit for this consulting work?",
    },
    answer: {
      pt: "A atuação é especialmente aderente a indústria, logística, supply chain, educação, ecossistemas de inovação, universidades, organizações intensivas em dados e instituições públicas que precisam de decisões mais precisas e arquitetura analítica mais madura.",
      en: "The work is especially relevant to industry, logistics, supply chain, education, innovation ecosystems, universities, data-intensive organizations, and public institutions that need more precise decisions and a more mature analytical architecture.",
    },
  },
  {
    question: {
      pt: "Quais problemas podem ser priorizados em um projeto de IA aplicada?",
      en: "Which problems can be prioritized in an applied AI project?",
    },
    answer: {
      pt: "Normalmente são priorizados problemas ligados a previsão de demanda, otimização operacional, redução de perdas, detecção de risco, apoio à decisão, governança analítica e transformação de dados dispersos em inteligência acionável.",
      en: "Typical priorities include demand forecasting, operational optimization, waste reduction, risk detection, decision support, analytical governance, and turning fragmented data into actionable intelligence.",
    },
  },
  {
    question: {
      pt: "Como funciona a metodologia de consultoria?",
      en: "How does the consulting methodology work?",
    },
    answer: {
      pt: "A metodologia combina diagnóstico do problema, leitura estratégica do contexto, estruturação matemática ou analítica, priorização de casos de uso, desenho de arquitetura e validação orientada a impacto. O objetivo é evitar pilotos sem direção e construir soluções com valor claro para o negócio.",
      en: "The methodology combines problem diagnosis, strategic context reading, mathematical or analytical structuring, use-case prioritization, architecture design, and impact-oriented validation. The goal is to avoid directionless pilots and build solutions with clear business value.",
    },
  },
  {
    question: {
      pt: "Como entrar em contato para uma conversa estratégica?",
      en: "How can someone get in touch for a strategic conversation?",
    },
    answer: {
      pt: "A forma mais direta é usar o formulário desta página ou os links de contato institucionais, detalhando contexto, setor, desafio e objetivo esperado. Isso acelera um primeiro diagnóstico qualificado.",
      en: "The most direct path is to use the contact form on this page or the institutional contact links, describing context, sector, challenge, and expected outcome. That speeds up a more qualified first diagnosis.",
    },
  },
];

export const valueBlocks = [
  {
    title: { pt: "Empresas privadas e indústrias", en: "Private companies and industries" },
    pain: {
      pt: "Problemas com risco, operação, eficiência, previsibilidade e priorização de decisões críticas.",
      en: "Challenges involving risk, operations, efficiency, predictability, and prioritization of critical decisions.",
    },
    value: {
      pt: "Modelos, sistemas analíticos e desenho de soluções orientadas a desempenho, escala e vantagem competitiva.",
      en: "Models, analytical systems, and solution design oriented toward performance, scale, and competitive advantage.",
    },
  },
  {
    title: { pt: "Health, insurance e serviços intensivos em dados", en: "Health, insurance, and data-intensive services" },
    pain: {
      pt: "Ambientes com alta criticidade, necessidade de leitura de risco e demanda por maior precisão operacional.",
      en: "Environments with high criticality, need for risk interpretation, and demand for greater operational precision.",
    },
    value: {
      pt: "Capacidade de combinar modelagem, machine learning e leitura institucional para decisões mais robustas.",
      en: "Ability to combine modeling, machine learning, and institutional interpretation for more robust decisions.",
    },
  },
  {
    title: { pt: "Edtechs, editoras e organizações educacionais", en: "Edtechs, publishers, and education organizations" },
    pain: {
      pt: "Necessidade de personalização, recomposição da aprendizagem, inteligência pedagógica e avaliação em escala.",
      en: "Need for personalization, learning recovery, pedagogical intelligence, and assessment at scale.",
    },
    value: {
      pt: "Integração entre IA, taxonomias, métricas e visão pedagógica para soluções educacionais de maior sofisticação.",
      en: "Integration of AI, taxonomies, metrics, and pedagogical vision for more sophisticated educational solutions.",
    },
  },
  {
    title: { pt: "Setor público, universidades e fundações", en: "Public sector, universities, and foundations" },
    pain: {
      pt: "Desafios de monitoramento, focalização, evidência, legitimidade técnica e escala institucional.",
      en: "Challenges involving monitoring, targeting, evidence, technical legitimacy, and institutional scale.",
    },
    value: {
      pt: "Leituras analíticas e metodológicas capazes de sustentar políticas, projetos e decisões com impacto público.",
      en: "Analytical and methodological approaches capable of sustaining policies, projects, and decisions with public impact.",
    },
  },
];

export const contact = {
  title: {
    pt: "Projetos complexos exigem clareza analítica, repertório técnico e visão institucional.",
    en: "Complex projects require analytical clarity, technical repertoire, and institutional vision.",
  },
  text: {
    pt: "Se a sua organização busca uma profissional capaz de conectar inteligência artificial, modelagem matemática, educação, pesquisa aplicada e tomada de decisão estratégica, este é o momento para iniciar uma conversa qualificada.",
    en: "If your organization is looking for a professional able to connect artificial intelligence, mathematical modeling, education, applied research, and strategic decision-making, this is the right time to start a qualified conversation.",
  },
  whatsapp: "https://wa.me/qr/ZQ5MXUPDDICTL1",
  email: "mailto:giselle@coutofalcao.com",
  calendar: "https://calendar.app.google/CHjaQQ3p9MeW4RYi9",
  lattes: "http://lattes.cnpq.br/7661015485905669",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/giselle-falcao-phd/", available: true },
    { label: "GitHub", href: "https://github.com/giselleCouto", available: true },
    { label: "E-mail", href: "mailto:giselle@coutofalcao.com", available: true },
    { label: "WhatsApp", href: "https://wa.me/qr/ZQ5MXUPDDICTL1", available: true },
    { label: "Agendar reunião", href: "https://calendar.app.google/CHjaQQ3p9MeW4RYi9", available: true },
    { label: "Google Scholar", href: "https://scholar.google.com.br/citations?hl=pt-BR&user=ljBj6GMAAAAJ", available: true },
    { label: "Lattes CNPq", href: "http://lattes.cnpq.br/7661015485905669", available: true },
    { label: "Medium", href: "https://medium.com/@giselle_9978", available: true },
  ],
};

export const linkedinBadge = {
  publicIdentifier: "giselle-falcao-phd",
  profileUrl: "https://www.linkedin.com/in/giselle-falcao-phd/",
  displayName: "Giselle Falcão, PhD",
};

export const placeholderPrompt = {
  pt: "Prompt-base para expansão futura: este site foi estruturado para receber cases adicionais, links de artigos, mídia, SEO ampliado, integrações de CMS e formulário com backend sem perda da linguagem institucional adotada.",
  en: "Base prompt for future expansion: this website was structured to receive additional case studies, article links, media, expanded SEO, CMS integrations, and backend-powered forms without losing the adopted institutional language.",
};

export function t(locale: Locale, value: { pt: string; en: string }) {
  return value[locale];
}
