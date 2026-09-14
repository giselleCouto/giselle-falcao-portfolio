// Página de Palestras & Formações Corporativas — 3 níveis de oferta.
// Preços sob consulta (proposta após entendimento do contexto), agendamento
// pelo link oficial de agenda da Giselle (contact.calendar).

export const palestras = {
  heroTitle: "Palestras que transformam dados em decisão",
  heroSubtitle:
    "Conteúdo técnico com narrativa acessível, casos reais do agro, indústria, logística e educação — e evidências que a plateia consegue aplicar na segunda-feira.",

  // Prova social real e verificável
  proof: [
    { value: "DATA BH · SQL Saturday", label: "palestrante no maior evento de dados de MG (PUC Minas)" },
    { value: "Minas Summit", label: "painel 'IA aplicada no Agronegócio', com cobertura do jornal O Tempo" },
    { value: "HackTown 2026", label: "palestrante no festival de inovação e criatividade (Santa Rita do Sapucaí)" },
    { value: "IFMG · Campus Sabará", label: "palestra a estudantes sobre Dados, IA e carreira" },
    { value: "O Tempo · Sagres TV", label: "2 reportagens de Economia e entrevista ao programa É Bom, É Brasil" },
    { value: "Livro publicado", label: "Metodologia CEOD (Editora Sorian, 2026) — ISBN e conselho editorial" },
  ],

  tiers: [
    {
      id: "keynote",
      nome: "Palestra & Keynote",
      duracao: "45 a 90 minutos",
      formato: "Presencial ou on-line · eventos, conferências e convenções",
      destaque: false,
      paraQuem: "Eventos corporativos, summits, universidades e times comerciais que querem inspirar com substância técnica.",
      inclui: [
        "Tema ajustado ao público e ao objetivo do evento",
        "Casos reais com números (agro, indústria, logística, educação)",
        "Demonstração ao vivo quando o formato permite",
        "QR Code de extensão: trilha gratuita para a plateia continuar",
        "Divulgação cruzada nas redes da Giselle",
      ],
      investimento: "Proposta conforme formato, praça e data",
    },
    {
      id: "workshop",
      nome: "Workshop Hands-on",
      duracao: "Meio dia a 2 dias",
      formato: "Presencial ou on-line ao vivo · turmas de até 40 pessoas · duas versões",
      destaque: true,
      paraQuem:
        "Equipes que precisam sair fazendo — da diretoria ao operacional. Versão para equipes NÃO técnicas (a mais pedida por RH e T&D) e versão técnica para times de dados.",
      inclui: [
        "Versão equipes não técnicas: produtividade com ChatGPT, Copilot e Gemini — uso seguro, LGPD e casos do dia a dia de cada área",
        "Versão técnica: prática guiada em Colab, BigQuery e Databricks Free",
        "Diagnóstico prévio do nível e do contexto da equipe",
        "Dados e casos do próprio negócio quando possível (com acordo de confidencialidade)",
        "Material de apoio, trilha de continuidade e relatório pós-workshop",
      ],
      investimento: "Proposta após diagnóstico do contexto",
    },
    {
      id: "corporativo",
      nome: "Programa Corporativo",
      duracao: "Trilhas de 8 a 32 semanas",
      formato: "In-company · desenho sob medida com governança e indicadores",
      destaque: false,
      paraQuem: "Empresas e instituições que querem formar times inteiros em dados e IA, com método e medição.",
      inclui: [
        "Currículo sob medida a partir do Termo de Referência da Trilha Arquiteto",
        "Gates de competência com evidências (não é presença em aula)",
        "Capstone com problema real da empresa e banca",
        "Indicadores, SLAs e relatórios executivos",
        "Opção de turmas exclusivas do programa Impulso Dela IA",
      ],
      investimento: "Proposta e escopo via Termo de Referência",
    },
  ],

  // Temas prontos (títulos reais + linhas de pesquisa)
  temas: [
    "IA generativa para equipes não técnicas: produtividade com ChatGPT, Copilot e Gemini — com uso seguro e LGPD",
    "IA vai além dos LLMs: qual abordagem resolve a dor do seu negócio",
    "Da Query ao Modelo: IA de produção com SQL e Python",
    "IA aplicada no Agronegócio: do sensor à decisão",
    "Metodologia CEOD: dados e IA na recomposição da aprendizagem",
    "Inteligência de decisão: FinOps, evidência e trade-offs",
    "Gêmeos digitais e visão computacional na operação",
    "Mulheres em Dados & IA: carreira, autoria e representatividade",
  ],

  // Vídeo real de palco (YouTube Short — Minas Summit 2026)
  video: {
    embedUrl: "https://www.youtube.com/embed/M0PbUaz6naM",
    titulo: "Giselle no palco",
    legenda: "Trecho real de palestra — Minas Summit 2026, Palco Casa do Baile",
  },

  // Depoimentos AUTORIZADOS — regra da casa: nunca inventar.
  // A seção só aparece quando houver itens aqui. Formato:
  // { texto: "...", nome: "Nome Sobrenome", cargo: "Cargo · Empresa" }
  depoimentos: [] as { texto: string; nome: string; cargo: string }[],

  comoFunciona: [
    { n: "1", t: "Diagnóstico", d: "Você conta o objetivo, o público e o formato do evento ou da formação." },
    { n: "2", t: "Proposta", d: "Tema, roteiro, logística e investimento em até 3 dias úteis." },
    { n: "3", t: "Entrega", d: "Palestra ou formação com material de extensão para a plateia." },
    { n: "4", t: "Continuidade", d: "Trilhas, cursos e diagnóstico de maturidade para o próximo passo." },
  ],
};
