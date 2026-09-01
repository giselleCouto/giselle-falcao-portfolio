// Trilhas de carreira em Dados & IA — escada de progressão da plataforma.
// Ordem definida pela Giselle: Analista de Dados é a PRIMEIRA trilha e
// Arquiteto de Soluções, Dados & IA (trilhaData.ts, 480h) é a ÚLTIMA.
//
// As etapas referenciam cursos reais pelo slug — título, horas, nível e
// gratuidade são lidos do registro central (lib/courses) na renderização,
// para nunca divergirem do catálogo.

export type TrilhaEtapa = {
  /** Slug de um curso existente em client/src/lib/courses */
  courseSlug: string;
  /** Por que este curso entra neste ponto da carreira */
  porque: string;
  /** O que a pessoa consegue fazer ao concluir a etapa */
  entrega: string;
};

export type TrilhaCarreira = {
  slug: string;
  ordem: number;
  cargo: string;
  titulo: string;
  tagline: string;
  descricao: string;
  /** Par de cores para o hero e destaques (gradiente) */
  cores: { de: string; para: string; chip: string };
  paraQuem: string[];
  requisitos: string;
  etapas: TrilhaEtapa[];
  competencias: string[];
  ferramentas: string[];
  rotinas: string[];
  disclaimer: string;
};

export const trilhasCarreira: TrilhaCarreira[] = [
  {
    slug: "analista-de-dados",
    ordem: 1,
    cargo: "Analista de Dados",
    titulo: "Trilha Analista de Dados",
    tagline: "A porta de entrada da carreira em dados — do zero à primeira análise que sustenta uma decisão.",
    descricao:
      "O analista de dados é quem transforma dados brutos em respostas: coleta, organiza, analisa e comunica. Esta trilha começa do zero absoluto e termina com você dominando SQL, planilhas, dashboards e a estatística necessária para defender suas conclusões — usando apenas ferramentas gratuitas, direto no navegador.",
    cores: { de: "#14b8a6", para: "#0d9488", chip: "text-teal-200" },
    paraQuem: [
      "Quem nunca trabalhou com dados e quer a primeira oportunidade na área",
      "Profissionais de qualquer área que vivem cercados de planilhas e querem extrair decisões delas",
      "Estudantes que querem uma base sólida antes de escolher especialização",
    ],
    requisitos:
      "Nenhum pré-requisito técnico. Basta um computador com navegador, disposição para praticar e o hábito de perguntar 'o que esse número está me dizendo?'.",
    etapas: [
      {
        courseSlug: "fundamentos-ciencia-de-dados",
        porque:
          "Antes da ferramenta vem o mapa: o que é a área de dados, quais papéis existem, como um dado vira decisão — e onde o analista entra nessa cadeia.",
        entrega: "Você entende o ciclo completo do dado e faz suas primeiras análises guiadas no navegador.",
      },
      {
        courseSlug: "analise-dados-estrategica",
        porque:
          "O dia a dia do analista: limpar dados reais, cruzar fontes abertas, montar dashboards e transformar números em recomendação para quem decide.",
        entrega: "Você constrói um dashboard completo a partir de dados abertos e apresenta uma recomendação.",
      },
      {
        courseSlug: "da-query-ao-modelo",
        porque:
          "SQL é a língua oficial do analista — e aqui você a usa em ambiente de produção real (Databricks Free Edition), descobrindo que seu SELECT já é 80% do caminho até a IA.",
        entrega: "Você escreve consultas de nível profissional e executa um pipeline real de dados de ponta a ponta.",
      },
      {
        courseSlug: "estatistica-padroes",
        porque:
          "O que separa um relatório de uma análise confiável é a estatística: inferência, testes e reconhecimento de padrões para afirmar com rigor — e saber quando não afirmar.",
        entrega: "Você sustenta conclusões com testes estatísticos e identifica padrões que planilha nenhuma mostra sozinha.",
      },
    ],
    competencias: [
      "Coletar, limpar e organizar dados de fontes diversas",
      "Consultar bancos de dados com SQL em nível profissional",
      "Construir dashboards e relatórios que orientam decisões",
      "Aplicar estatística descritiva e inferencial com rigor",
      "Comunicar resultados para públicos técnicos e de negócio",
    ],
    ferramentas: ["Google Sheets", "SQL", "Databricks Free Edition", "Looker Studio", "BigQuery Sandbox"],
    rotinas: [
      "Responder perguntas de negócio com dados e prazo curto",
      "Manter indicadores e dashboards que times inteiros consultam",
      "Investigar anomalias: por que o número mudou?",
      "Preparar dados que alimentam modelos dos cientistas de dados",
    ],
    disclaimer:
      "Esta trilha certifica competências demonstradas nos cursos e projetos — ela não garante emprego nem senioridade. A evolução profissional depende também de prática real e portfólio próprio. O que prometemos: um caminho honesto, na ordem certa, com ferramentas que você pode usar hoje sem pagar nada.",
  },
  {
    slug: "cientista-de-dados",
    ordem: 2,
    cargo: "Cientista de Dados",
    titulo: "Trilha Cientista de Dados",
    tagline: "Do analisar para o prever: modelos de Machine Learning e IA que saem do notebook e chegam à produção.",
    descricao:
      "O cientista de dados vai além do que aconteceu: constrói modelos que preveem o que vai acontecer e sistemas de IA que agem sobre isso. Esta trilha assume a base de análise consolidada e adiciona Machine Learning, deploy de modelos com casos reais da indústria e do agro, e a fronteira dos agentes de IA.",
    cores: { de: "#8b5cf6", para: "#6b21a8", chip: "text-violet-200" },
    paraQuem: [
      "Analistas de dados que querem dar o próximo passo na carreira",
      "Quem concluiu a Trilha Analista de Dados (ou domina o equivalente)",
      "Profissionais técnicos que querem migrar para Machine Learning e IA aplicada",
    ],
    requisitos:
      "Recomendamos concluir antes a Trilha Analista de Dados — ou dominar o equivalente: SQL, análise exploratória e estatística básica. Lógica de programação ajuda; os cursos constroem o Python necessário no caminho.",
    etapas: [
      {
        courseSlug: "fundamentos-ml",
        porque:
          "Os quatro pilares que todo cientista usa a vida inteira: regressão, classificação, clustering e avaliação de modelos — explicados sem matemática intimidadora.",
        entrega: "Você treina e avalia seus primeiros modelos e sabe dizer quando um modelo é bom (e quando engana).",
      },
      {
        courseSlug: "ia-na-pratica",
        porque:
          "O salto profissional: pegar um problema real — da indústria, do agro, da logística — e levá-lo do dado bruto ao modelo publicado, com as decisões de engenharia que o mercado cobra.",
        entrega: "Você constrói um projeto de IA de ponta a ponta e publica um modelo funcionando.",
      },
      {
        courseSlug: "agentes-ia",
        porque:
          "A fronteira atual da profissão: LLMs, RAG, MCP e agentes que decidem e agem. É o que separa quem acompanha a área de quem constrói o que vem a seguir.",
        entrega: "Você projeta e constrói agentes de IA integrados a APIs e fontes de dados reais.",
      },
    ],
    competencias: [
      "Formular problemas de negócio como problemas de Machine Learning",
      "Treinar, avaliar e comparar modelos com metodologia correta",
      "Levar modelos do notebook à produção (deploy e monitoramento)",
      "Construir aplicações com LLMs, RAG e agentes de IA",
      "Estimar custo, risco e impacto de uma solução de IA",
    ],
    ferramentas: ["Python", "scikit-learn", "Google Colab", "Gradio", "LLMs e APIs de IA"],
    rotinas: [
      "Transformar uma pergunta de negócio em experimento mensurável",
      "Treinar modelos e defender por que o baseline simples perdeu (ou ganhou)",
      "Publicar modelos e vigiar drift, custo e qualidade em produção",
      "Prototipar soluções com IA generativa e avaliar se valem o custo",
    ],
    disclaimer:
      "Esta trilha certifica competências demonstradas nos cursos e projetos — ela não garante emprego nem senioridade. Ciência de dados se aprende fazendo: o diferencial no mercado será o portfólio que você constrói ao longo das etapas.",
  },
];

export function getTrilhaCarreira(slug: string): TrilhaCarreira | undefined {
  return trilhasCarreira.find((t) => t.slug === slug);
}

// Escada completa exibida no hub /giselle/trilhas — a trilha do Arquiteto
// (480h, Termo de Referência) é o degrau final e tem página própria.
export const escadaCarreira = [
  {
    ordem: 1,
    cargo: "Analista de Dados",
    href: "/giselle/trilhas/analista-de-dados",
    resumo: "Comece do zero: SQL, planilhas, dashboards e estatística para transformar dados em decisões.",
    carga: "4 cursos · 98h",
    nivel: "A porta de entrada da carreira",
  },
  {
    ordem: 2,
    cargo: "Cientista de Dados",
    href: "/giselle/trilhas/cientista-de-dados",
    resumo: "Machine Learning, IA aplicada com casos reais e agentes de IA — do notebook à produção.",
    carga: "3 cursos · 96h",
    nivel: "Para quem já domina a análise",
  },
  {
    ordem: 3,
    cargo: "Arquiteto de Soluções, Dados & IA",
    href: "/giselle/trilha",
    resumo: "Formação profissional multicloud por competências: arquitetura, MLOps, GenAI, FinOps e capstone com banca.",
    carga: "10 cursos · 480h",
    nivel: "O degrau mais alto da escada",
  },
];
