// Página "IA para Empresas" — posicionamento definido pela Giselle (set/2026):
// ela orienta empresas sobre o uso adequado de IA e prepara empresas,
// lideranças e times para decidir e operar com Dados & IA.
// Duas teses centrais:
//  1. "Qual dor do seu negócio a IA precisa resolver?" — diagnóstico e ganhos mensuráveis
//  2. "IA vai além dos LLMs" — diferentes abordagens para soluções e decisões
// Regra da casa: toda prova citada é real (portfólio em produção / estudo do livro).

export const iaEmpresas = {
  nome: "Inteligência para Decisões",
  heroTitle: "Preparo empresas, lideranças e times para decidir e operar com Dados & IA",
  heroSub:
    "Orientação independente sobre o uso adequado de IA: começar pela dor certa, escolher a abordagem certa — que nem sempre é um LLM — e medir o ganho de verdade.",
  badge: "Inteligência para Decisões · Orientação · Formação · Implementação",

  tese1: {
    titulo: "“Qual dor do seu negócio a IA precisa resolver?”",
    texto:
      "É a primeira pergunta de qualquer conversa comigo — antes de falar de ferramenta, modelo ou fornecedor. Projetos de IA morrem quando começam pela tecnologia; prosperam quando começam por uma dor específica, com um número de hoje registrado e um critério de sucesso escrito. Diagnóstico honesto primeiro, ganhos mensuráveis sempre.",
    passos: [
      "Nomear a dor: qual decisão ou processo custa caro hoje?",
      "Medir o antes: tempo, erro ou custo — sem número, é achismo",
      "Escolher a abordagem certa para ESSA dor (nem sempre é IA generativa)",
      "Colocar em operação com ponto de parada humano e valor medido",
    ],
  },

  tese2: {
    titulo: "“IA vai além dos LLMs.”",
    texto:
      "O mercado fala como se IA fosse sinônimo de chatbot. Mas a maioria das dores de negócio se resolve com outras famílias de IA — mais baratas, mais auditáveis e muitas vezes mais eficazes. Cada abordagem abaixo está provada no meu portfólio, rodando em operação de verdade.",
  },

  // Abordagens além (e incluindo) LLMs — cada uma com prova real
  abordagens: [
    {
      nome: "Previsão e detecção (ML preditivo)",
      resolve: "Antecipar falhas, demanda, inadimplência, evasão — agir antes do problema.",
      prova: "SensorMonit: prevê falhas de equipamento antes da parada e prioriza a manutenção.",
      icone: "radar",
    },
    {
      nome: "Otimização e pesquisa operacional",
      resolve: "Rotas, alocação de recursos, sequenciamento — extrair mais do que você já tem.",
      prova: "Curral AI: roteirização naval que levou a ocupação da frota de 60% para 87%.",
      icone: "route",
    },
    {
      nome: "Visão computacional e sensores",
      resolve: "Inspecionar, contar e monitorar o mundo físico sem depender de olho humano.",
      prova: "EucaSmart: sensores, satélite e IA no manejo preditivo do eucalipto.",
      icone: "eye",
    },
    {
      nome: "Séries temporais e risco",
      resolve: "Transformar clima, mercado e indicadores em risco acionável.",
      prova: "GreenSenti: precipitação e clima traduzidos em decisão ESG.",
      icone: "chart",
    },
    {
      nome: "Simulação e gêmeos digitais",
      resolve: "Testar cenários antes de gastar — e escolher com evidência.",
      prova: "Pharos: cabotagem planejada com marés reais e 4 cenários de custo.",
      icone: "waves",
    },
    {
      nome: "Estatística e inferência causal",
      resolve: "Saber se o efeito é real ou acaso — a base de qualquer ganho declarado.",
      prova: "Estudo da Metodologia CEOD: 809 escolas, +20,7 pontos no SAEB (IC 95%).",
      icone: "sigma",
    },
    {
      nome: "LLMs, RAG e agentes",
      resolve: "Linguagem, atendimento e conhecimento — quando é essa a dor de verdade.",
      prova: "Método próprio de avaliação (as 5 peças de um agente) para separar agente de marketing.",
      icone: "bot",
    },
  ],

  // Jornada de trabalho com a empresa
  jornada: [
    {
      n: 1,
      titulo: "Diagnóstico",
      texto: "Maturidade em 5 dimensões, dor priorizada e número de hoje. Começa gratuito, em 3 minutos.",
      href: "/diagnostico-ia",
      cta: "Fazer o diagnóstico",
    },
    {
      n: 2,
      titulo: "Formação de lideranças e times",
      texto: "Palestras, workshops hands-on e programas — para decidir e operar, não só assistir.",
      href: "/giselle/palestras",
      cta: "Ver formatos",
    },
    {
      n: 3,
      titulo: "Implementação acompanhada",
      texto: "Da solução nova ao resgate de projeto parado — com escopo, critérios de aceite e adoção.",
      href: "/giselle/servicos",
      cta: "Ver consultoria",
    },
    {
      n: 4,
      titulo: "Operação com valor medido",
      texto: "Antes e depois documentados, custo por execução e ponto de parada humano definido.",
      href: "/giselle/palestras#proposta",
      cta: "Pedir proposta",
    },
  ],

  paraQuem: [
    "Diretoria e conselhos que precisam decidir onde (e se) investir em IA",
    "Times de inovação e dados com projetos parados ou mal especificados",
    "RH e T&D que precisam formar equipes não técnicas para operar com IA",
    "Empresas que receberam propostas de fornecedores e querem uma avaliação independente",
  ],

  // FAQ = perguntas reais de comprador (também viram FAQPage JSON-LD p/ buscadores e IAs)
  faq: [
    {
      q: "Como escolher um treinamento de IA para minha equipe?",
      a: "Comece pela dor, não pelo catálogo: qual decisão ou processo o time precisa melhorar? Um bom treinamento parte de casos do seu contexto, faz o time praticar com dados reais (ou realistas) e termina com um plano aplicável — não com um certificado genérico. Desconfie de programas que prometem domínio completo em poucas horas e prefira formatos com exercício aplicado e critério de sucesso definido antes de começar.",
    },
    {
      q: "Como medir os resultados de um treinamento de inteligência artificial?",
      a: "Defina o número ANTES do treinamento: tempo de uma tarefa, taxa de erro, custo de um processo ou quantidade de decisões apoiadas por dados. Depois, compare em 30–90 dias. Sem uma medição de antes e depois, a avaliação vira opinião. Nos meus programas, esse número de partida é registrado na primeira semana — é ele que conta a história no final.",
    },
    {
      q: "Como aplicar IA na rotina de equipes que não são técnicas?",
      a: "Começando por uma tarefa específica que a equipe já faz — de preferência uma que atravessa vários sistemas e consome horas — e não por 'adotar IA' em abstrato. A equipe aprende a formular o problema, testar uma versão simples com acompanhamento e manter um ponto de parada humano. Ferramenta sem método vira custo; método com ferramenta simples vira ganho medido.",
    },
    {
      q: "Minha empresa precisa de um LLM (IA generativa) para tudo?",
      a: "Não — e essa é uma das confusões mais caras do mercado. LLMs resolvem dores de linguagem e conhecimento; previsão de demanda, otimização de rotas, inspeção visual e análise de risco se resolvem melhor com outras famílias de IA, geralmente mais baratas e auditáveis. A pergunta certa não é 'onde uso IA generativa?', e sim 'qual abordagem resolve esta dor com o menor custo e o maior controle?'.",
    },
  ],

  avisoHonesto:
    "Orientação independente de fornecedor: eu não revendo plataforma nem ganho comissão de ferramenta. A recomendação é a que resolve a sua dor com o menor custo e o maior controle — inclusive quando a resposta é “ainda não é hora de IA”.",
};
