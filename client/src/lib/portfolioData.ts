// Design reminder: editorial científico neo-institucional com assimetria disciplinada, autoridade silenciosa,
// azul petróleo, cobre fosco, marfim técnico e acentos turquesa. Cada texto deve reforçar profundidade,
// impacto mensurável e sofisticação executiva, nunca parecer portfólio genérico.

export type Locale = "pt" | "en";

export const assets = {
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663156393333/6sAjL87Dgs7zQfqq7pYXKz/logo_preta_aa73ef4c.webp",
  portrait: "https://d2xsxph8kpxj0f.cloudfront.net/310519663156393333/6sAjL87Dgs7zQfqq7pYXKz/giselle-business-portrait-1_71af2cf6.png",
  heroAtlas:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663156393333/6sAjL87Dgs7zQfqq7pYXKz/giselle-hero-atlas-9rA6i749UYThtL9Lh5ZSxA.webp",
  climatePanel:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663156393333/6sAjL87Dgs7zQfqq7pYXKz/giselle-climate-math-panel-WFgWmN5e9jCReteRQSrBXt.webp",
  educationPanel:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663156393333/6sAjL87Dgs7zQfqq7pYXKz/giselle-ai-education-panel-gsjjyd5bgf99jZd3PTbEqD.webp",
};

export const navItems = [
  { href: "#home", section: "home", label: { pt: "Home", en: "Home" } },
  { href: "#sobre", section: "sobre", label: { pt: "Sobre", en: "About" } },
  { href: "#projetos", section: "projetos", label: { pt: "Projetos", en: "Projects" } },
  { href: "#publicacoes", section: "publicacoes", label: { pt: "Publicações", en: "Publications" } },
  { href: "#experiencia", section: "experiencia", label: { pt: "Experiência", en: "Experience" } },
  { href: "#formacao", section: "formacao", label: { pt: "Formação", en: "Education" } },
  { href: "#palestras", section: "palestras", label: { pt: "Palestras & Mídia", en: "Speaking & Media" } },
  { href: "#contato", section: "contato", label: { pt: "Contato", en: "Contact" } },
] as const;

export const keyAreas = {
  pt: [
    "Educação",
    "AI & Machine Learning",
    "Modelagem Matemática",
    "Climate Math",
    "Pesquisa Aplicada",
    "Consultoria Estratégica",
  ],
  en: [
    "Education",
    "AI & Machine Learning",
    "Mathematical Modeling",
    "Climate Math",
    "Applied Research",
    "Strategic Consulting",
  ],
};

export const heroCopy = {
  name: "Giselle Couto Falcão",
  role: {
    pt: "Especialista em Inteligência Artificial, Ciência de Dados, Modelagem Matemática Computacional e Soluções de Alto Impacto para Educação, Negócios e Pesquisa",
    en: "Specialist in Artificial Intelligence, Data Science, Computational Mathematical Modeling, and High-Impact Solutions for Education, Business, and Research",
  },
  headline: {
    pt: "Autoridade técnica e científica na interseção entre IA, educação, machine learning e matemática do clima",
    en: "Technical and scientific authority at the intersection of AI, education, machine learning, and climate mathematics",
  },
  subheadline: {
    pt: "Trajetória interdisciplinar que conecta pesquisa profunda, modelagem matemática, ciência de dados e execução estratégica para empresas, setor público, universidades e ecossistemas de inovação.",
    en: "An interdisciplinary trajectory connecting deep research, mathematical modeling, data science, and strategic execution for companies, the public sector, universities, and innovation ecosystems.",
  },
  ctaPrimary: { pt: "Ver projetos", en: "View projects" },
  ctaSecondary: { pt: "Falar sobre parceria", en: "Discuss a partnership" },
  impactPrompt: {
    pt: "Da modelagem teórica à implementação aplicada, com foco em impacto mensurável, robustez metodológica e leitura estratégica do problema.",
    en: "From theoretical modeling to applied implementation, with a focus on measurable impact, methodological rigor, and strategic problem framing.",
  },
};

export const authorityMetrics = [
  {
    value: "+10",
    label: {
      pt: "anos conectando matemática, ciência de dados, educação e inovação aplicada",
      en: "years connecting mathematics, data science, education, and applied innovation",
    },
  },
  {
    value: "9",
    label: {
      pt: "setores estratégicos contemplados em projetos e pesquisas",
      en: "strategic sectors covered through projects and research",
    },
  },
  {
    value: "2",
    label: {
      pt: "doutorados que consolidam uma identidade intelectual rara",
      en: "doctorates consolidating a rare intellectual identity",
    },
  },
  {
    value: "360°",
    label: {
      pt: "visão ponta a ponta: pesquisa, produto, consultoria, docência e liderança",
      en: "end-to-end perspective: research, product, consulting, teaching, and leadership",
    },
  },
];

export const aboutSection = {
  intro: {
    pt: "Giselle Couto Falcão construiu uma trajetória singular entre matemática, computação, inteligência artificial, educação e pesquisa aplicada. Sua atuação não se limita à análise de dados: ela formula problemas complexos, modela cenários, estrutura decisões e transforma conhecimento técnico em soluções capazes de gerar impacto econômico, institucional e social.",
    en: "Giselle Couto Falcão has built a distinctive trajectory across mathematics, computing, artificial intelligence, education, and applied research. Her work goes beyond data analysis: she frames complex problems, models scenarios, structures decisions, and turns technical knowledge into solutions capable of generating economic, institutional, and social impact.",
  },
  body: {
    pt: "Ao longo de mais de uma década, sua experiência integrou empresas, setor público, universidades, marcas e organizações de relevância institucional. Esse percurso consolidou uma combinação pouco comum entre rigor científico, visão estratégica, sensibilidade educacional e capacidade de execução. O resultado é uma profissional apta a transitar com profundidade entre machine learning, modelagem matemática computacional, IA generativa, séries temporais, educação baseada em dados e matemática do clima.",
    en: "Over more than a decade, her experience has spanned companies, the public sector, universities, brands, and institutionally relevant organizations. This journey has consolidated an unusual combination of scientific rigor, strategic vision, educational sensitivity, and execution capacity. The result is a professional able to move with depth across machine learning, computational mathematical modeling, generative AI, time series, data-driven education, and climate mathematics.",
  },
  closing: {
    pt: "Seu posicionamento é o de uma liderança técnico-intelectual capaz de conectar pesquisa profunda e aplicações reais, apoiando projetos complexos em ambientes onde precisão analítica, reputação e impacto são decisivos. A autoria de livros, artigos e produção científica, somada à atuação com iniciativas e marcas como a AIFA, reforça uma presença pública e institucional orientada por conhecimento, inovação e autoridade.",
    en: "Her positioning is that of a technical-intellectual leader capable of connecting deep research with real-world applications, supporting complex initiatives in environments where analytical precision, reputation, and impact are decisive. The authorship of books, articles, and scientific production, combined with work involving initiatives and brands such as AIFA, reinforces a public and institutional presence guided by knowledge, innovation, and authority.",
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
    sector: { pt: "Logística", en: "Logistics" },
    title: {
      pt: "Planejamento de rotas e otimização com heurísticas e metaheurísticas",
      en: "Route Planning and Optimization with Heuristics and Metaheuristics",
    },
    context: {
      pt: "Problemas logísticos com múltiplas restrições operacionais e necessidade de ganho de eficiência sob pressão de custo.",
      en: "Logistical problems with multiple operational constraints and the need for efficiency gains under cost pressure.",
    },
    problem: {
      pt: "Percursos ineficientes, baixa ocupação, alto custo operacional e variabilidade da operação.",
      en: "Inefficient routes, low utilization, high operational cost, and operational variability.",
    },
    approach: {
      pt: "Modelagem matemática, algoritmos exatos, heurísticos e simulação orientada por cenários.",
      en: "Mathematical modeling, exact algorithms, heuristics, and scenario-based simulation.",
    },
    stack: "Optimization, Python, operations research, simulation",
    impact: {
      pt: "Redução de custo, racionalização do planejamento e maior previsibilidade operacional.",
      en: "Cost reduction, smarter planning, and greater operational predictability.",
    },
    tags: ["routing", "operations research", "metaheuristics", "supply planning"],
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
      pt: "IA, recomposição da aprendizagem e taxonomias pedagógicas para decisões educacionais mais precisas",
      en: "AI, learning recovery, and pedagogical taxonomies for more precise educational decisions",
    },
    summary: {
      pt: "Discussão sobre o uso de inteligência artificial para diagnóstico educacional, acompanhamento e priorização pedagógica em larga escala.",
      en: "Discussion on the use of artificial intelligence for educational diagnosis, monitoring, and pedagogical prioritization at scale.",
    },
    link: "#",
  },
  {
    type: { pt: "Pesquisa / Clima", en: "Research / Climate" },
    year: "2024",
    theme: "Clima",
    title: {
      pt: "Precipitação, previsibilidade e leitura matemática de sistemas climáticos complexos",
      en: "Precipitation, predictability, and mathematical interpretation of complex climate systems",
    },
    summary: {
      pt: "Estudo voltado à compreensão de séries temporais climáticas, variabilidade e modelagem aplicada à interpretação ambiental.",
      en: "Study focused on understanding climate time series, variability, and modeling applied to environmental interpretation.",
    },
    link: "#",
  },
  {
    type: { pt: "Pesquisa / Saúde", en: "Research / Health" },
    year: "2023",
    theme: "Saúde",
    title: {
      pt: "EEG e modelagem matemática aplicada à análise de padrões neurofisiológicos",
      en: "EEG and mathematical modeling applied to neurophysiological pattern analysis",
    },
    summary: {
      pt: "Produção orientada à análise quantitativa de sinais complexos e suporte a estudos com potencial clínico.",
      en: "Research oriented toward quantitative analysis of complex signals and support for clinically relevant studies.",
    },
    link: "#",
  },
  {
    type: { pt: "Tese / Modelagem", en: "Thesis / Modeling" },
    year: "2026",
    theme: "Matemática",
    title: {
      pt: "Tese em modelagem matemática e computacional para problemas complexos de alto impacto",
      en: "Thesis in mathematical and computational modeling for high-impact complex problems",
    },
    summary: {
      pt: "Produção intelectual orientada à formulação, experimentação e aplicação de métodos avançados de modelagem.",
      en: "Intellectual production focused on formulating, experimenting with, and applying advanced modeling methods.",
    },
    link: "#",
  },
  {
    type: { pt: "Paper / IA", en: "Paper / AI" },
    year: "2026",
    theme: "IA / Machine Learning",
    title: {
      pt: "Avaliação de modelos, embeddings e fluxos baseados em linguagem para cenários institucionais",
      en: "Model evaluation, embeddings, and language-based workflows for institutional scenarios",
    },
    summary: {
      pt: "Reflexão técnica sobre arquiteturas de IA contemporâneas aplicadas a contextos de negócio, educação e gestão do conhecimento.",
      en: "Technical reflection on contemporary AI architectures applied to business, education, and knowledge-management contexts.",
    },
    link: "#",
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
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/giselle-falc%C3%A3o-phd-29b90028/", available: true },
    { label: "GitHub", href: "https://github.com/giselleCouto", available: true },
    { label: "E-mail", href: "mailto:contato@gisellefalcao.com", available: true },
    { label: "CV", href: "http://lattes.cnpq.br/7661015485905669", available: true },
    { label: "Google Scholar", href: "https://scholar.google.com.br/citations?hl=pt-BR&user=ljBj6GMAAAAJ", available: true },
    { label: "Lattes", href: "http://lattes.cnpq.br/7661015485905669", available: true },
  ],
};

export const placeholderPrompt = {
  pt: "Prompt-base para expansão futura: este site foi estruturado para receber cases adicionais, links de artigos, currículo, mídia, SEO ampliado, integrações de CMS e formulário com backend sem perda da linguagem institucional adotada.",
  en: "Base prompt for future expansion: this website was structured to receive additional case studies, article links, CV, media, expanded SEO, CMS integrations, and backend-powered forms without losing the adopted institutional language.",
};

export function t(locale: Locale, value: { pt: string; en: string }) {
  return value[locale];
}
