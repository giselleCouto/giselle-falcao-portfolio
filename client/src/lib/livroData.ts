// Dados oficiais do livro "Metodologia CEOD" (Editora Sorian, 2026).
// Fonte: ficha catalográfica (CIP) e páginas iniciais da obra.

export type BookLink = {
  label: string;
  href: string | null; // null = ainda não divulgado (mostra "em breve")
  kind: "primary" | "official" | "marketplace";
  note?: string;
};

export const livro = {
  title: "Metodologia CEOD",
  subtitle: "A revolução data-driven na recomposição da aprendizagem",
  ceodMeaning: "Conhecimento Evolutivo Orientado por Dados",
  author: "Giselle Couto Falcão",
  publisher: "Editora Sorian",
  place: "Araucária, PR",
  year: "2026",
  edition: "1ª edição",
  pages: 184,
  isbnPrint: "978-65-5453-847-3",
  isbnDigital: "978-65-5453-849-7",
  doi: "10.54466/sorianed.978-65-5453-849-7",
  doiResolverUrl: "https://doi.org/10.54466/sorianed.978-65-5453-849-7",
  doiStatus:
    "DOI informado na obra; em 28/07/2026, o resolvedor DOI.org, Crossref e DataCite ainda não retornavam registro público.",
  cover: "/livro/capa-ceod.jpg",
  dossierDownload: "/livro/dossie-educacional-metodologia-ceod.docx",

  pitch:
    "A crise da aprendizagem no Brasil não é apenas pedagógica — é estrutural, mensurável e acumulativa. A Metodologia CEOD integra inteligência artificial, psicometria e modelagem matemática para diagnosticar as lacunas de aprendizagem e atuar em suas causas estruturais.",

  // Blurb curto para cards e SEO
  shortPitch:
    "IA, psicometria e modelagem matemática para diagnosticar e recompor a aprendizagem — validada sobre milhões de registros do SAEB.",

  // Pilares/diferenciais para a página (visual, pouco texto)
  pillars: [
    {
      icon: "target",
      title: "Nó Crítico da Aprendizagem",
      text: "Identifica a habilidade estrutural cuja fragilidade compromete cadeias inteiras de conhecimento.",
    },
    {
      icon: "route",
      title: "Trilhas adaptativas alinhadas à BNCC",
      text: "Do diagnóstico à intervenção personalizada, sustentada por grafos de conhecimento.",
    },
    {
      icon: "bar-chart",
      title: "Validada em larga escala",
      text: "Estudo quasi-experimental na rede estadual de Goiás (2022–2023) sobre milhões de registros do SAEB.",
    },
    {
      icon: "shield-check",
      title: "IA interpretável e auditável",
      text: "Modelos explicáveis, reprodutíveis e adequados à adoção responsável em políticas públicas.",
    },
  ],

  // Fundamentos científicos (chips)
  foundations: [
    "Teoria da Resposta ao Item (TRI temporal)",
    "Taxonomias de Bloom e SOLO",
    "Grafos de conhecimento",
    "Machine Learning interpretável",
    "Protocolos de repetição espaçada",
    "Modelagem matemática da retenção",
  ],

  distributionNotice:
    "Links de venda confirmados nos marketplaces. Para compra institucional ou em lote, fale com a Editora Sorian.",

  links: [
    {
      label: "Comprar na Amazon",
      href: "https://www.amazon.com.br/dp/655453847X",
      kind: "primary",
      note: "Livro físico",
    },
    {
      label: "Mercado Livre",
      href: "https://www.mercadolivre.com.br/metodologia-ceod-a-revolucao-datadriven-na-recomposicao-da-aprendizagem/up/MLBU4780091149",
      kind: "marketplace",
    },
    {
      label: "umLivro",
      href: "https://loja.umlivro.com.br/metodologia-ceod--a-revolucao-data-driven-na-recomposicao-da-aprendizagem-8501885/p",
      kind: "marketplace",
    },
    {
      label: "Editora Sorian",
      href: "https://www.editorasorian.com.br",
      kind: "official",
      note: "Compra institucional e em lote",
    },
  ] as BookLink[],

  // Lojas para a página de escolha de compra (/livro — link curto das redes)
  buyLinks: [
    {
      store: "Amazon",
      description: "Entrega rápida em todo o Brasil · vendido como livro físico",
      href: "https://www.amazon.com.br/dp/655453847X",
      accent: "amber",
    },
    {
      store: "Mercado Livre",
      description: "Parcelamento e frete Mercado Envios",
      href: "https://www.mercadolivre.com.br/metodologia-ceod-a-revolucao-datadriven-na-recomposicao-da-aprendizagem/up/MLBU4780091149",
      accent: "yellow",
    },
    {
      store: "umLivro",
      description: "Livraria especializada · catálogo editorial",
      href: "https://loja.umlivro.com.br/metodologia-ceod--a-revolucao-data-driven-na-recomposicao-da-aprendizagem-8501885/p",
      accent: "teal",
    },
    {
      store: "Editora Sorian",
      description: "Compra institucional, em lote ou com a editora",
      href: "https://www.editorasorian.com.br",
      accent: "violet",
    },
  ],

  publisherContact: {
    whatsapp: "https://wa.me/5541988655312",
    email: "mailto:editor@editorasorian.com.br",
  },
};

// Conteúdo do dossiê educacional — material técnico para secretarias,
// escolas e submissão a editais. Evidências extraídas do Capítulo 11
// (estudo quasi-experimental na rede estadual de Goiás, 2022–2023).

export const dossie = {
  updatedAt: "Julho de 2026",

  executiveSummary:
    "A Metodologia CEOD (Conhecimento Evolutivo Orientado por Dados) é uma abordagem científica para diagnóstico e recomposição da aprendizagem que integra Teoria da Resposta ao Item, taxonomias cognitivas, grafos de conhecimento e machine learning interpretável. Validada em estudo quasi-experimental sobre 809 escolas da rede estadual de Goiás, produziu efeito líquido médio de +20,7 pontos na escala SAEB — com os maiores ganhos exatamente nas escolas de menor proficiência e menor nível socioeconômico.",

  problem: [
    {
      stat: "Estrutural",
      label: "A crise da aprendizagem no Brasil é estrutural, acumulativa e mensurável.",
    },
    {
      stat: "Efeito cascata",
      label: "Estudantes avançam de etapa sem consolidar habilidades fundamentais, comprometendo todo o percurso.",
    },
    {
      stat: "Diagnóstico raso",
      label: "Faltam ferramentas para identificar, tratar e recompor as lacunas cognitivas com precisão.",
    },
  ],

  // Como funciona — 4 etapas (para diagrama)
  method: [
    {
      step: "1",
      title: "Diagnóstico por dados",
      text: "Microdados oficiais (SAEB) e algoritmos interpretáveis mapeiam o estado cognitivo real de cada estudante.",
    },
    {
      step: "2",
      title: "Nó Crítico",
      text: "Identificação da habilidade estrutural cuja fragilidade compromete cadeias inteiras de conhecimento.",
    },
    {
      step: "3",
      title: "Trilha adaptativa",
      text: "Construção de percurso personalizado alinhado à BNCC, sustentado por grafos de conhecimento e retenção.",
    },
    {
      step: "4",
      title: "Recomposição medida",
      text: "Intervenção acompanhada por indicadores, com evolução cognitiva observável e auditável.",
    },
  ],

  // Evidências de impacto — números reais do estudo (Cap. 11)
  evidence: {
    context:
      "Estudo quasi-experimental na rede estadual de Goiás (2022–2023). Desenho com propensity score matching, Difference-in-Differences e regressão multinível; intervalos de confiança por bootstrap (1.000 reamostras).",
    metrics: [
      { value: "809", label: "escolas da rede estadual de Goiás no estudo" },
      { value: "+20,7 pts", label: "efeito líquido médio na escala SAEB · IC 95% [16,8; 24,6]" },
      { value: "≈ 0,45 DP", label: "tamanho de efeito (desvio-padrão da escala SAEB do 9º ano)" },
      { value: "7 descritores", label: "com efeito líquido positivo e estatisticamente significativo" },
    ],
    equity: [
      {
        title: "Quanto maior a defasagem, maior o ganho",
        text: "Estudantes no quartil de menor proficiência inicial ganharam +31,2 pontos, contra +12,7 no quartil mais alto.",
      },
      {
        title: "Impacto concentrado onde mais importa",
        text: "Escolas de NSE muito baixo tiveram efeito líquido de +24,3 pontos (vs. +7,2 em escolas de NSE alto) — a metodologia reduz desigualdade.",
      },
      {
        title: "Relação dose-resposta",
        text: "Quanto maior a adesão às fases da metodologia, maior o ganho observado — reforçando a plausibilidade causal do efeito.",
      },
    ],
    disclaimer:
      "Os procedimentos estatísticos utilizados (propensity score matching, Difference-in-Differences, regressão multinível, teste t pareado) são públicos e padronizados na literatura econométrica e educacional. As calibrações de produção específicas da plataforma são proprietárias; as evidências aqui reportadas são replicáveis.",
  },

  // Alinhamento a políticas públicas / editais
  alignment: [
    "Alinhamento direto à BNCC e às competências avaliadas pelo SAEB",
    "Base em microdados oficiais e reprodutibilidade científica",
    "IA interpretável e auditável — adequada à adoção responsável no setor público",
    "Foco em equidade: maiores ganhos em contextos de vulnerabilidade",
    "Publicação com ISBN físico/digital, DOI informado na obra e conselho editorial",
    "Escalável a redes municipais e estaduais inteiras",
  ],

  // Público-alvo do dossiê
  audience: [
    "Secretarias municipais e estaduais de Educação",
    "Escolas e redes de ensino público e privado",
    "Formuladores de políticas públicas educacionais",
    "Proponentes e avaliadores de editais de educação e inovação",
  ],
};
