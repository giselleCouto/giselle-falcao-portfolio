// Quiz "Diagnóstico de Maturidade em IA" — 10 perguntas, 5 dimensões,
// pontuação 0-3 por resposta (total 0-30) e 4 níveis de maturidade.

export type QuizOption = { label: string; points: number };
export type QuizQuestion = {
  dimension: DimensionKey;
  question: string;
  options: QuizOption[];
};

export type DimensionKey = "dados" | "tecnologia" | "pessoas" | "processos" | "estrategia";

export const DIMENSIONS: Record<DimensionKey, { label: string; icon: string }> = {
  dados: { label: "Dados", icon: "database" },
  tecnologia: { label: "Tecnologia", icon: "cpu" },
  pessoas: { label: "Pessoas", icon: "users" },
  processos: { label: "Processos", icon: "workflow" },
  estrategia: { label: "Estratégia & Governança", icon: "compass" },
};

export const QUESTIONS: QuizQuestion[] = [
  {
    dimension: "dados",
    question: "Como os dados da sua operação estão organizados hoje?",
    options: [
      { label: "Espalhados em planilhas e sistemas isolados, sem padrão", points: 0 },
      { label: "Centralizados em parte, mas com qualidade irregular", points: 1 },
      { label: "Base estruturada e confiável para as áreas principais", points: 2 },
      { label: "Plataforma de dados governada, com catálogo e qualidade medida", points: 3 },
    ],
  },
  {
    dimension: "dados",
    question: "Quando uma decisão importante é tomada, qual o papel dos dados?",
    options: [
      { label: "Decidimos principalmente pela experiência e intuição", points: 0 },
      { label: "Olhamos relatórios básicos quando existe tempo", points: 1 },
      { label: "Indicadores e dashboards embasam a maioria das decisões", points: 2 },
      { label: "Decisões críticas exigem evidência, com previsões e cenários", points: 3 },
    ],
  },
  {
    dimension: "tecnologia",
    question: "Qual a situação da infraestrutura de tecnologia para dados e IA?",
    options: [
      { label: "Sistemas legados e pouca integração entre ferramentas", points: 0 },
      { label: "Algumas ferramentas modernas, mas sem arquitetura definida", points: 1 },
      { label: "Nuvem e ferramentas de dados integradas nas áreas-chave", points: 2 },
      { label: "Arquitetura escalável com pipelines, monitoramento e custo controlado", points: 3 },
    ],
  },
  {
    dimension: "tecnologia",
    question: "A empresa já usa alguma forma de IA (preditiva ou generativa)?",
    options: [
      { label: "Ainda não usamos IA em nada estruturado", points: 0 },
      { label: "Testes pontuais (ex.: ChatGPT individual, pilotos isolados)", points: 1 },
      { label: "Ao menos um caso de IA rodando em produção", points: 2 },
      { label: "Vários casos em produção, com avaliação e melhoria contínua", points: 3 },
    ],
  },
  {
    dimension: "pessoas",
    question: "Como está a competência do time em dados e IA?",
    options: [
      { label: "Não temos pessoas dedicadas a dados", points: 0 },
      { label: "Alguns curiosos autodidatas, sem papel formal", points: 1 },
      { label: "Time de dados estruturado (análise/engenharia/ciência)", points: 2 },
      { label: "Times multidisciplinares com formação contínua e carreira definida", points: 3 },
    ],
  },
  {
    dimension: "pessoas",
    question: "Como a empresa desenvolve as pessoas nesses temas?",
    options: [
      { label: "Não há iniciativas de capacitação em dados/IA", points: 0 },
      { label: "Cursos avulsos por iniciativa individual", points: 1 },
      { label: "Treinamentos patrocinados pela empresa em áreas específicas", points: 2 },
      { label: "Programa estruturado de formação com trilhas e medição", points: 3 },
    ],
  },
  {
    dimension: "processos",
    question: "Os processos do negócio incorporam análises ou modelos?",
    options: [
      { label: "Processos manuais, sem apoio analítico", points: 0 },
      { label: "Relatórios apoiam alguns processos, sem automação", points: 1 },
      { label: "Análises e alertas integrados aos processos principais", points: 2 },
      { label: "Modelos preditivos/IA embutidos na operação, com donos definidos", points: 3 },
    ],
  },
  {
    dimension: "processos",
    question: "Como vocês medem o resultado das iniciativas de dados/IA?",
    options: [
      { label: "Não medimos — é difícil saber o que funcionou", points: 0 },
      { label: "Percepção qualitativa dos envolvidos", points: 1 },
      { label: "Indicadores de uso e eficiência em parte dos projetos", points: 2 },
      { label: "ROI e impacto no negócio medidos por iniciativa, com metas", points: 3 },
    ],
  },
  {
    dimension: "estrategia",
    question: "Dados e IA aparecem na estratégia da empresa?",
    options: [
      { label: "Não são pauta da liderança", points: 0 },
      { label: "Há interesse, mas sem plano ou orçamento definidos", points: 1 },
      { label: "Existe roadmap aprovado com patrocínio executivo", points: 2 },
      { label: "São pilar estratégico com metas, orçamento e revisão periódica", points: 3 },
    ],
  },
  {
    dimension: "estrategia",
    question: "Como a empresa trata riscos, privacidade e governança de IA?",
    options: [
      { label: "Tema ainda não discutido internamente", points: 0 },
      { label: "Preocupação existe, mas sem políticas formais", points: 1 },
      { label: "Políticas de LGPD/dados aplicadas; IA em discussão", points: 2 },
      { label: "Governança de dados e IA formalizada, com papéis e auditoria", points: 3 },
    ],
  },
];

export type MaturityLevel = {
  id: string;
  nome: string;
  faixa: [number, number];
  cor: string;
  resumo: string;
  recomendacoes: string[];
};

export const LEVELS: MaturityLevel[] = [
  {
    id: "inicial",
    nome: "Inicial",
    faixa: [0, 8],
    cor: "#e11d48",
    resumo:
      "A operação ainda decide no escuro: dados dispersos, pouca tecnologia integrada e nenhuma iniciativa estruturada de IA. A boa notícia: é o estágio em que pequenas mudanças geram os maiores saltos.",
    recomendacoes: [
      "Comece pela pergunta de negócio, não pela ferramenta: qual decisão mais sofre sem dados hoje?",
      "Organize as fontes críticas em uma base única e confiável antes de pensar em IA",
      "Capacite um núcleo pequeno — os cursos gratuitos da Academy são um ponto de partida sem custo",
    ],
  },
  {
    id: "exploratorio",
    nome: "Exploratório",
    faixa: [9, 15],
    cor: "#d97706",
    resumo:
      "Existem dados e experimentos, mas sem método: pilotos que não chegam à produção, decisões parcialmente embasadas e competências concentradas em poucas pessoas.",
    recomendacoes: [
      "Escolha UM caso de uso com dono, meta e prazo — e leve-o até produção",
      "Estruture a plataforma de dados mínima (qualidade, catálogo, acesso governado)",
      "Formalize a capacitação do time: um workshop hands-on acelera meses de tentativa e erro",
    ],
  },
  {
    id: "estruturado",
    nome: "Estruturado",
    faixa: [16, 22],
    cor: "#0d9488",
    resumo:
      "A casa está arrumada: dados confiáveis, time capacitado e casos de IA em produção. O desafio agora é escalar com governança, medir ROI e não deixar a operação depender de heróis.",
    recomendacoes: [
      "Padronize o ciclo de vida dos modelos (MLOps): monitoramento, retreino e rollback",
      "Implante FinOps de dados/IA: custo por caso de uso e por decisão",
      "Amplie a formação para além do time técnico — negócio também decide com IA",
    ],
  },
  {
    id: "estrategico",
    nome: "Estratégico",
    faixa: [23, 30],
    cor: "#6b21a8",
    resumo:
      "Dados e IA são vantagem competitiva: produção estável, governança madura e liderança engajada. O próximo salto é fronteira — IA generativa com segurança, otimização avançada e novos modelos de negócio.",
    recomendacoes: [
      "Explore casos de fronteira: agentes, gêmeos digitais e otimização em tempo real",
      "Formalize a governança de IA generativa (avaliação, guardrails, auditoria)",
      "Transforme a maturidade em marca: cases públicos atraem talento e clientes",
    ],
  },
];

export const COMPANY_SIZES = [
  "Até 10 pessoas",
  "11 a 50 pessoas",
  "51 a 200 pessoas",
  "201 a 1.000 pessoas",
  "Mais de 1.000 pessoas",
  "Setor público",
];

export function levelForScore(total: number): MaturityLevel {
  return LEVELS.find((l) => total >= l.faixa[0] && total <= l.faixa[1]) ?? LEVELS[0];
}
