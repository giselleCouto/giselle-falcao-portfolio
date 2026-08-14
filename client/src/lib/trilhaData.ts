// Trilha Profissional — Arquitetura de Soluções, Dados e IA.
// Conteúdo fiel ao Termo de Referência v1.0 (agosto/2026), disponível para
// download em /trilhas/termo-referencia-arquiteto-dados-ia.docx

export const trilha = {
  title: "Trilha Arquiteto de Soluções, Dados & IA",
  subtitle: "Formação multicloud orientada a competências, evidências e resultados de negócio",
  version: "v1.0 · agosto de 2026",
  trDownload: "/trilhas/termo-referencia-arquiteto-dados-ia.docx",

  // Posicionamento honesto — exigência explícita do Termo de Referência
  disclaimer:
    "Um curso, sozinho, não transforma uma pessoa iniciante em arquiteta autônoma. Esta trilha certifica competências demonstradas — não promete senioridade nem emprego. A conclusão prepara para atuar como arquiteto(a) associado(a) ou integrante de squads de arquitetura; a autonomia para decisões críticas depende também de experiência real, revisão por pares e responsabilidade progressiva em produção.",

  routes: [
    {
      id: "padrao",
      name: "Rota Padrão",
      hours: "480h",
      weeks: "32 semanas",
      pace: "15h semanais",
      audience: "Fundamentos técnicos + experiência inicial",
      certification: "Formação Profissional em Arquitetura de Soluções, Dados e IA",
      highlight: true,
    },
    {
      id: "acelerada",
      name: "Rota Acelerada",
      hours: "300h",
      weeks: "24 semanas",
      pace: "Para experientes",
      audience: "Mínimo de 2 anos em software, dados, cloud ou plataforma + prova prática obrigatória",
      certification: "Bootcamp Avançado em Arquitetura de Dados e IA Multicloud",
      highlight: false,
    },
  ],

  // Distribuição da carga (480h)
  workload: [
    { label: "Laboratórios guiados", hours: 160, percent: 33.3 },
    { label: "Aulas conceituais e demonstrações", hours: 120, percent: 25.0 },
    { label: "Desafios, ADRs e revisões", hours: 100, percent: 20.8 },
    { label: "Capstone, documentação e defesa", hours: 60, percent: 12.5 },
    { label: "Leituras, diagnósticos e retrospectivas", hours: 40, percent: 8.4 },
  ],

  ingresso: [
    "Questionário de trajetória e objetivo profissional",
    "Prova diagnóstica de 60–90 min (Python, SQL, Git, sistemas, interpretação arquitetural)",
    "Desafio prático curto para candidatos à rota acelerada",
    "Classificação: apto · apto com nivelamento obrigatório · ainda não apto",
  ],

  courses: [
    {
      code: "C0",
      title: "Nivelamento técnico e método de arquitetura",
      hours: "30h",
      weeks: 2,
      finalidade:
        "Criar um piso técnico comum e introduzir a disciplina de arquitetura baseada em requisitos, evidências e decisões reversíveis.",
      competencias:
        "Programar e consultar dados em nível básico; usar Git, Docker e Linux; decompor um requisito; escrever NFR, SLO e ADR simples.",
      labs: [
        "Serviço Docker que recebe eventos, valida schema, persiste dados e expõe métricas",
        "Falhas injetadas: schema incompatível, storage indisponível e secret exposto em commit",
      ],
      gate: "Recriar do zero, passar nos testes e explicar a falha sem depender do roteiro.",
    },
    {
      code: "C1",
      title: "Arquitetura de soluções e system design",
      hours: "45h",
      weeks: 3,
      finalidade:
        "Ensinar o raciocínio que antecede a escolha de serviços: contexto, atributos de qualidade, padrões, alternativas e evolução.",
      competencias:
        "Conduzir discovery técnico, dimensionar carga, selecionar padrões e comunicar uma arquitetura para técnicos e executivos.",
      labs: [
        "Projetar plataforma de pedidos para picos de 10x com restrição de orçamento",
        "Revisão adversarial: queda regional, duplicação de mensagens e requisito contraditório",
      ],
      gate: "Defender trade-offs sob mudança de volume, SLA e orçamento.",
    },
    {
      code: "C2",
      title: "Cloud foundations, plataforma e IaC multicloud",
      hours: "45h",
      weeks: 3,
      finalidade:
        "Construir bases cloud seguras e repetíveis, entendendo capacidades equivalentes e diferenças reais entre AWS, GCP, Azure e OCI.",
      competencias:
        "Projetar landing zone, identidade, rede, políticas e CI/CD; provisionar com Terraform; estimar blast radius e custo basal.",
      labs: [
        "Landing zone mínima em ao menos duas nuvens, traduzida para as demais",
        "Detectar drift, bloquear storage público, rotacionar secret e destruir recursos com segurança",
      ],
      gate: "Plan/apply/destroy reprodutível; nenhum segredo no repositório; nenhum acesso público não justificado.",
    },
    {
      code: "C3",
      title: "Arquitetura, modelagem e governança de dados",
      hours: "60h",
      weeks: 4,
      finalidade:
        "Projetar dados como produto, do contrato à governança, com modelos adequados a transação, analytics, IA e interoperabilidade.",
      competencias:
        "Selecionar padrões de armazenamento e modelagem; definir qualidade, ownership, catálogo, linhagem, privacidade e acesso.",
      labs: [
        "Modelar domínio de pedidos, clientes e navegação para transação, analytics e features",
        "Injetar coluna nova, PII, conflito semântico e regra de qualidade quebrada",
      ],
      gate: "Rastreabilidade completa entre requisito, campo, regra, consumidor, política e teste.",
    },
    {
      code: "C4",
      title: "Engenharia de dados, lakehouse e streaming",
      hours: "60h",
      weeks: 4,
      finalidade:
        "Implementar pipelines resilientes batch e streaming, medindo qualidade, desempenho e custo.",
      competencias:
        "Construir ingestão, transformação, orquestração, CDC, lakehouse e real time com backfill, replay e observabilidade.",
      labs: [
        "Pipeline bronze/silver/gold idempotente com carga incremental e correção retroativa",
        "Streaming de fraude com janela, late data, DLQ, replay e pico de 10x",
      ],
      gate: "Sem perda silenciosa, duplicidade indevida ou dados inválidos propagados; recuperação demonstrada.",
    },
    {
      code: "C5",
      title: "Analytics, APIs de dados e produtos de decisão",
      hours: "30h",
      weeks: 2,
      finalidade:
        "Conectar plataforma de dados a decisões por meio de semântica, serving, APIs, BI e produtos analíticos confiáveis.",
      competencias:
        "Projetar camada semântica e contratos de consumo; decidir entre consulta, cache, API, materialização e evento.",
      labs: [
        "Publicar métrica crítica por dashboard e API com uma única definição semântica",
        "Comparar serving direto, materializado e cacheado sob carga e custo",
      ],
      gate: "Métrica consistente em todos os canais, acesso governado e SLO medido.",
    },
    {
      code: "C6",
      title: "Arquitetura de ML e MLOps",
      hours: "60h",
      weeks: 4,
      finalidade:
        "Projetar o ciclo de vida completo de modelos preditivos, do caso de uso à operação e governança.",
      competencias:
        "Definir baseline, dados/features, treino, avaliação, registro, serving, monitoramento, reprodutibilidade e rollback.",
      labs: [
        "Pipeline de treino e batch/online serving com registry e promoção controlada",
        "Injetar drift, feature ausente, degradação, pico de latência e rollback",
      ],
      gate: "Promoção condicionada por testes; rollback funcional; impacto e custo mensurados.",
    },
    {
      code: "C7",
      title: "GenAI, RAG, agentes e LLMOps",
      hours: "45h",
      weeks: 3,
      finalidade:
        "Projetar aplicações generativas que sejam úteis, avaliáveis, seguras e economicamente sustentáveis.",
      competencias:
        "Selecionar modelo e padrão; construir RAG/agente; avaliar recuperação e resposta; controlar dados, ações, tokens e riscos.",
      labs: [
        "Assistente RAG com fontes autorizadas, citações, recusa e eval set versionado",
        "Agente com ferramenta de baixo risco, autorização explícita e trilha de auditoria",
        "Testes adversariais: instrução maliciosa em documento, conflito de fontes e custo excessivo",
      ],
      gate: "Nenhuma ação crítica sem controle; resposta sem evidência deve recusar; logs sem segredo/PII.",
    },
    {
      code: "C8",
      title: "Segurança, confiabilidade, observabilidade, FinOps e sustentabilidade",
      hours: "45h",
      weeks: 3,
      finalidade:
        "Integrar qualidades operacionais e econômicas que atravessam toda arquitetura e determinam sua viabilidade em produção.",
      competencias:
        "Executar revisão Well-Architected, instrumentar telemetria, planejar DR, responder a incidentes e explicar o custo unitário.",
      labs: [
        "Revisão de arquitetura por pilares com plano priorizado de remediação",
        "Simulação de incidente com traces correlacionados e restauração",
        "Modelo FinOps com drivers, cenários e unit economics",
      ],
      gate: "RPO/RTO medidos; custo reconciliável; nenhuma recomendação sem impacto, esforço, risco e owner.",
    },
    {
      code: "C9",
      title: "Capstone integrado e defesa",
      hours: "60h",
      weeks: 4,
      finalidade:
        "Integrar as competências em um cenário empresarial com mudança de requisitos e defesa diante de banca.",
      competencias:
        "Entregar arquitetura completa, implementação funcional, evidência de operação, segurança, custo e plano de evolução.",
      labs: [
        "Projeto em equipe de 3 a 5 pessoas com papéis rotativos e contribuição individual auditável",
        "Game day com alteração de volume, região, serviço, preço ou política de dados",
        "Defesa de 45 minutos com arguição individual",
      ],
      gate: "Mínimo de 75% no capstone, nenhum critério crítico reprovado e contribuição individual comprovada.",
    },
  ],

  principles: [
    "Competência demonstrada: toda unidade termina com evidência verificável",
    "Multicloud sem falsa equivalência (AWS, GCP, Azure, OCI)",
    "Código e infraestrutura reprodutíveis, versionados e recriáveis",
    "Dados e IA responsáveis: LGPD, explicabilidade e supervisão humana",
    "FinOps desde o desenho: toda arquitetura declara custo e limite de gasto",
    "Operação desde o primeiro laboratório: logs, métricas, SLOs e runbooks",
  ],

  b2b: {
    text: "Termo de Referência completo e editável para contratação, desenvolvimento e oferta: ementas detalhadas, equipe mínima, infraestrutura, LGPD, acessibilidade, cronograma, SLAs, critérios de aceite e pagamento, matriz de competências, rubrica e checklist — com campos para personalização da contratante e aderência à Lei nº 14.133/2021.",
  },

  anexos: [
    {
      title: "Termo de Referência (editável)",
      description: "Documento-base completo para contratação: 20 seções, campos de personalização, SLAs, rubrica e checklist.",
      format: "Word · 69 KB",
      href: "/trilhas/termo-referencia-arquiteto-dados-ia.docx",
    },
    {
      title: "Anexo — Bootcamp 300h (rota acelerada)",
      description: "Estrutura técnica das 24 semanas: currículo por fases, mapa multicloud, método de custos FinOps e rubrica.",
      format: "Markdown · 22 KB",
      href: "/trilhas/anexo-bootcamp-300h.md",
    },
    {
      title: "Anexo — Curso completo autodirigido",
      description: "Módulos com aulas, laboratórios, quizzes com gabarito, roteiros de vídeo/podcast e atividades interativas.",
      format: "Markdown · 19 KB",
      href: "/trilhas/anexo-curso-completo.md",
    },
  ],
};
