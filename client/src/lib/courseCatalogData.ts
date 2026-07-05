// Catálogo de cursos — vitrine espelhada da Giselle Falcão Academy (Base44),
// reconstruída no site em produção com a identidade roxo/lavanda/teal.

export type CourseLevel = "Iniciante" | "Intermediário" | "Avançado";

export type CatalogCourse = {
  id: string;
  level: CourseLevel;
  title: string;
  description: string;
  hours: string;
  certificate: boolean;
};

export const catalogHero = {
  eyebrow: "Educação",
  titleLead: "Cursos",
  titleHighlight: "práticos",
  titleTail: "com certificação",
  subtitle:
    "Do fundamento à aplicação real. Laboratórios interativos, atividades avaliadas e certificado ao concluir.",
  photo: "/cursos/hero-cursos.png",
};

export const catalogCourses: CatalogCourse[] = [
  {
    id: "ia-na-pratica",
    level: "Intermediário",
    title: "IA na Prática: Do Conceito ao Deploy",
    description:
      "Curso completo de Inteligência Artificial aplicada. Aprenda a construir, treinar e colocar modelos de ML em produção. Do dado bruto à decisão inteligente, com laboratórios práticos e projetos reais.",
    hours: "40h",
    certificate: true,
  },
  {
    id: "fundamentos-ml",
    level: "Iniciante",
    title: "Fundamentos de Machine Learning",
    description:
      "Domine os pilares do Machine Learning: regressão, classificação, clustering e avaliação de modelos. Exercícios práticos com datasets reais e avaliação com pontuação.",
    hours: "24h",
    certificate: true,
  },
  {
    id: "agentes-ia",
    level: "Avançado",
    title: "Agentes de IA e Automação Inteligente",
    description:
      "Construa agentes de IA autônomos que tomam decisões complexas. MCP, RAG, LLMs e integração com APIs reais. Projeto final com certificação.",
    hours: "32h",
    certificate: true,
  },
  {
    id: "analise-dados-estrategica",
    level: "Iniciante",
    title: "Análise de Dados para Decisões Estratégicas",
    description:
      "Curso prático de 30 horas desenvolvido para agentes públicos e profissionais que precisam transformar dados em decisões. Baseado em problemas reais da gestão pública paulistana, utilizando dados abertos da cidade de São Paulo e ferramentas gratuitas acessíveis pelo navegador (Google Sheets, Colab, BigQuery, Looker Studio e NotebookLM). Do fundamento à apresentação de dashboards que fundamentam decisões estratégicas.",
    hours: "30h",
    certificate: true,
  },
];

export const levelStyles: Record<CourseLevel, string> = {
  Iniciante: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  Intermediário: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Avançado: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};
