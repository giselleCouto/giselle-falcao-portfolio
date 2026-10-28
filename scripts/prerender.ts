/**
 * Gera "snapshots" HTML das páginas públicas — versões já renderizadas, com
 * texto, títulos e dados estruturados dentro do HTML.
 *
 * Por que isso existe: o site é uma SPA React. O Google executa JavaScript e
 * enxerga as páginas, mas os robôs dos assistentes de IA (GPTBot, ClaudeBot,
 * PerplexityBot, Amazonbot, CCBot...) normalmente NÃO executam. Sem isto, eles
 * recebem uma casca vazia e não há o que citar.
 *
 * Os snapshots são servidos APENAS para robôs (ver server/_core/vite.ts) e têm
 * o mesmo conteúdo que a pessoa vê na tela — não há conteúdo oculto nem
 * variação de mensagem.
 *
 * Roda no build, depois do `vite build`:
 *     vite build && tsx scripts/prerender.ts && esbuild ...
 *
 * O conteúdo vem dos mesmos módulos de dados que alimentam as páginas, então
 * não há risco de divergir quando a Giselle editar um curso ou uma trilha.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { courses } from "../client/src/lib/courses/index";
import { trajetoria } from "../client/src/lib/trajetoriaData";
import { trilhasCarreira, escadaCarreira } from "../client/src/lib/trilhasCarreiraData";
import { trilha } from "../client/src/lib/trilhaData";
import { palestras } from "../client/src/lib/palestrasData";
import { livro } from "../client/src/lib/livroData";
import { programasExecutivos as pe } from "../client/src/lib/programasExecutivosData";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist", "public");
const OUT = path.join(DIST, "__snapshots");
const ORIGIN = "https://www.coutofalcao.com";

// ---------------------------------------------------------------- utilidades
const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

type Block =
  | { h2: string }
  | { p: string }
  | { ul: string[] }
  | { dl: Array<[string, string]> }
  | { links: Array<[string, string]> };

type Route = {
  path: string;
  /** Rotas-atalho que mostram a mesma página (ex.: /trajetoria) */
  aliases?: string[];
  title: string;
  description: string;
  h1: string;
  blocks: Block[];
  schema?: Record<string, unknown>[];
};

function renderBlocks(blocks: Block[]): string {
  return blocks
    .map(b => {
      if ("h2" in b) return `<h2>${esc(b.h2)}</h2>`;
      if ("p" in b) return `<p>${esc(b.p)}</p>`;
      if ("ul" in b) return `<ul>${b.ul.map(li => `<li>${esc(li)}</li>`).join("")}</ul>`;
      if ("dl" in b)
        return `<dl>${b.dl.map(([t, d]) => `<dt>${esc(t)}</dt><dd>${esc(d)}</dd>`).join("")}</dl>`;
      return `<ul>${b.links.map(([label, href]) => `<li><a href="${esc(href)}">${esc(label)}</a></li>`).join("")}</ul>`;
    })
    .join("\n");
}

// --------------------------------------------------------------- dados fixos
const PERSON = {
  "@type": "Person",
  "@id": `${ORIGIN}/giselle#person`,
  name: "Giselle Couto Falcão",
  alternateName: "Giselle Falcão",
  honorificSuffix: "PhD",
  jobTitle: "Consultora e pesquisadora em Inteligência Artificial e Ciência de Dados",
  description:
    "PhD em Modelagem Matemática e Computacional. Desenvolve soluções de inteligência artificial e ciência de dados aplicadas a operações reais — agro, logística, indústria, saúde, educação e setor público — e forma profissionais e equipes para decidir com base em dados.",
  url: `${ORIGIN}/giselle`,
  image: `${ORIGIN}/brand/giselle-retrato.jpg`,
  knowsAbout: [
    "Inteligência artificial aplicada",
    "Machine learning",
    "Ciência de dados",
    "Modelagem matemática e computacional",
    "Pesquisa operacional e otimização",
    "IA no agronegócio",
    "Visão computacional",
    "LLMs, RAG e agentes de IA",
    "Séries temporais e previsão de demanda",
    "Matemática do clima",
    "Educação baseada em dados",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "CEFET-MG" },
    { "@type": "CollegeOrUniversity", name: "Sorbonne Université" },
    { "@type": "CollegeOrUniversity", name: "University of Hartford" },
    { "@type": "CollegeOrUniversity", name: "Universidade Federal de Minas Gerais" },
  ],
  sameAs: [
    "https://www.linkedin.com/in/giselle-falcao-phd/",
    "https://github.com/giselleCouto",
    "https://scholar.google.com.br/citations?hl=pt-BR&user=ljBj6GMAAAAJ",
    "http://lattes.cnpq.br/7661015485905669",
    "https://www.instagram.com/gisellecfalcao",
  ],
  worksFor: { "@type": "Organization", name: "Couto Falcão", url: ORIGIN },
};

const PROVIDER = {
  "@type": "Organization",
  name: "Couto Falcão · Giselle Falcão",
  url: ORIGIN,
};

// ------------------------------------------------------------------- rotas
const routes: Route[] = [];

// ---- /giselle — hub
routes.push({
  path: "/giselle",
  title: "Giselle Falcão, PhD | IA aplicada, ciência de dados e formação",
  description:
    "Giselle Couto Falcão, PhD em Modelagem Matemática e Computacional: consultoria em IA aplicada a operações reais (agro, logística, indústria, educação), palestras, cursos e mentoria de carreira em Dados e IA.",
  h1: "Giselle Falcão, PhD — IA que entende, transforma e impulsiona",
  blocks: [
    { p: PERSON.description },
    { h2: "Áreas de atuação" },
    { ul: PERSON.knowsAbout },
    { h2: "Formação" },
    {
      ul: [
        "Doutorado em Modelagem Matemática e Computacional — CEFET-MG",
        "Doutorado em Matemática do Clima — Sorbonne Université",
        "MBA in Data Science — University of Hartford",
        "Mestrado em Modelagem Matemática e Computacional — CEFET-MG",
        "Especialização em Cálculo — UFMG",
        "Bacharelado em Matemática",
      ],
    },
    { h2: "Por onde começar" },
    {
      links: [
        ["Sobre Giselle Falcão", "/giselle/sobre"],
        ["Consultoria e serviços", "/giselle/servicos"],
        ["IA para empresas", "/giselle/ia-para-empresas"],
        ["Palestras", "/giselle/palestras"],
        ["Mentoria de carreira em Dados e IA", "/giselle/mentoria"],
        ["Trilhas de carreira", "/giselle/trilhas"],
        ["Cursos", "/giselle/cursos"],
        ["Livro — Metodologia CEOD", "/livro"],
      ],
    },
  ],
  schema: [PERSON],
});

// ---- /giselle/sobre
routes.push({
  path: "/giselle/sobre",
  title: "Sobre Giselle Falcão, PhD | Trajetória, formação e atuação",
  description:
    "Quem é Giselle Couto Falcão: PhD em Modelagem Matemática e Computacional e em Matemática do Clima, com mais de uma década de projetos de IA e ciência de dados para empresas, setor público e pesquisa.",
  h1: "Sobre Giselle Couto Falcão",
  blocks: [
    {
      p: "Giselle Couto Falcão é doutora em Modelagem Matemática e Computacional (CEFET-MG) e em Matemática do Clima (Sorbonne Université), com MBA in Data Science (University of Hartford). Atua na interseção entre inteligência artificial, machine learning, ciência de dados e modelagem matemática aplicada a problemas reais de operação.",
    },
    {
      p: "Ao longo de mais de uma década, desenvolveu projetos para empresas, setor público, universidades e organizações com alta exigência analítica — de modelagem preditiva, otimização e meta-heurísticas a IA generativa, NLP, séries temporais e analytics para decisão.",
    },
    { h2: "Experiência institucional" },
    {
      ul: [
        "Fundação Sagres — consultoria e inteligência aplicada",
        "A&C — analytics e modelagem de negócio",
        "Unimed Seguros — modelos de risco, antifraude e inteligência para saúde e seguros",
        "Mercedes-Benz — modelagem e inteligência industrial",
        "Tenda Construtora e Walmart — indicadores, previsão de demanda e inteligência comercial",
        "UNESCO — projetos de relevância institucional",
        "Secretaria de Estado de Educação de Minas Gerais — análise educacional e IA aplicada a políticas públicas",
        "IGTI / CEFET-MG — docência e formação técnica",
      ],
    },
    { h2: "Caso de destaque: otimização logística naval" },
    {
      p: "Solução de pesquisa operacional baseada em Vehicle Routing Problem com janelas de tempo e restrições de capacidade, resolvida com meta-heurística e simulação multicenário, com camada de visualização executiva.",
    },
    {
      dl: [
        ["Redução de custo operacional", "USD 96 mil por mês"],
        ["Ocupação de frota", "de 60% para 87%"],
        ["Pegada de carbono", "redução de 22%"],
        ["Arquitetura", "cloud-agnostic (AWS, Azure e Oracle), multitenant com isolamento de dados"],
      ],
    },
    { h2: "Publicações selecionadas" },
    {
      ul: [
        "O impacto da recomposição da aprendizagem (Caderno Pedagógico, 2025) — DOI 10.54033/cadpedv22n9-249",
        "Ensino da matemática convergente com a BNCC 2017 (CoInspiração, 2019) — DOI 10.61074/2596-0172.2019.v2.69-94",
        "Precipitações pluviométricas em São Paulo e previsibilidade com ARIMA (SBMAC, 2020) — DOI 10.5540/03.2020.007.01.0380",
        "Precipitações em Belo Horizonte e previsibilidade com expoente de Hurst (SBMAC, 2018) — DOI 10.5540/03.2018.006.02.0253",
      ],
    },
    { h2: "Ferramentas e tecnologias" },
    {
      ul: [
        "Linguagens e dados: Python, PySpark, R, SQL",
        "Cloud e plataformas: AWS, GCP, Azure, Databricks",
        "Analytics e visualização: Power BI, Grafana, Looker Studio, Streamlit",
        "Aplicações e engenharia: FastAPI, NLP, RAG, embeddings",
      ],
    },
    { h2: "Perfis acadêmicos e profissionais" },
    {
      links: [
        ["LinkedIn", "https://www.linkedin.com/in/giselle-falcao-phd/"],
        ["Google Scholar", "https://scholar.google.com.br/citations?hl=pt-BR&user=ljBj6GMAAAAJ"],
        ["Currículo Lattes", "http://lattes.cnpq.br/7661015485905669"],
        ["GitHub", "https://github.com/giselleCouto"],
      ],
    },
  ],
  schema: [PERSON],
});

// ---- /giselle/palestras
routes.push({
  path: "/giselle/palestras",
  aliases: ["/palestras"],
  title: "Palestras sobre IA e dados | Giselle Falcão, PhD",
  description: palestras.heroSubtitle,
  h1: palestras.heroTitle,
  blocks: [
    { p: palestras.heroSubtitle },
    { h2: "Prova social verificável" },
    { ul: palestras.proof.map(p => `${p.value} — ${p.label}`) },
    { h2: "Formatos" },
    {
      ul: (palestras.tiers as Array<Record<string, unknown>>).map(t =>
        [t.name, t.duration, t.summary].filter(Boolean).join(" — ")
      ),
    },
    { h2: "Contato para convites" },
    { links: [["Página de contato", "/giselle/contato"]] },
  ],
  schema: [PERSON],
});

// ---- /giselle/mentoria/trajetoria
const faqTrajetoria = [
  ["Para quem é a mentoria?", trajetoria.paraQuem.join("; ") + "."],
  ["Para quem não é?", trajetoria.naoE.join("; ") + "."],
  ["Qual é o formato?", trajetoria.formato.map(f => `${f.item}: ${f.valor}`).join("; ") + "."],
  ["O que ela promete — e o que não promete?", trajetoria.avisoHonesto],
  ["Como funciona a seleção?", trajetoria.selecao],
];
routes.push({
  path: "/giselle/mentoria/trajetoria",
  aliases: ["/trajetoria"],
  title: `${trajetoria.name} | Turma Fundadora`,
  description: trajetoria.promessa,
  h1: trajetoria.heroTitle,
  blocks: [
    { p: trajetoria.heroSubtitle },
    { p: trajetoria.promessa },
    { h2: "O que você leva" },
    { ul: trajetoria.resultados.map(r => `${r.titulo}: ${r.texto}`) },
    { h2: "As quatro semanas" },
    { ul: trajetoria.semanas.map(s => `Semana ${s.n} — ${s.titulo}: ${s.texto} Entrega: ${s.entrega}`) },
    { h2: "Formato" },
    { dl: trajetoria.formato.map(f => [f.item, f.valor] as [string, string]) },
    { h2: "Para quem é" },
    { ul: trajetoria.paraQuem },
    { h2: "Para quem não é" },
    { ul: trajetoria.naoE },
    { h2: "Entregáveis" },
    { ul: trajetoria.entregaveis },
    { h2: "Aviso honesto" },
    { p: trajetoria.avisoHonesto },
    { h2: "Seleção" },
    { p: trajetoria.selecao },
  ],
  schema: [
    PERSON,
    {
      "@type": "EducationalOccupationalProgram",
      name: trajetoria.name,
      description: trajetoria.promessa,
      provider: PROVIDER,
      url: `${ORIGIN}/giselle/mentoria/trajetoria`,
      timeToComplete: "P4W",
      educationalProgramMode: "online",
      occupationalCategory: ["Analista de Dados", "Cientista de Dados", "Profissional de IA aplicada"],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqTrajetoria.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
});

// ---- /giselle/trilhas (hub) + trilhas de carreira
routes.push({
  path: "/giselle/trilhas",
  aliases: ["/trilhas"],
  title: "Trilhas de carreira em Dados e IA | Giselle Falcão",
  description:
    "A escada de carreira em dados: Analista de Dados, Cientista de Dados e Arquiteto de Soluções, Dados & IA — com os cursos de cada etapa, competências e o que você consegue fazer ao final.",
  h1: "Trilhas de carreira em Dados e IA",
  blocks: [
    { p: "Três degraus, na ordem certa, com ferramentas que você pode usar hoje." },
    { ul: escadaCarreira.map(e => `${e.ordem}. ${e.cargo} (${e.carga}) — ${e.resumo}`) },
    { links: escadaCarreira.map(e => [e.cargo, e.href] as [string, string]) },
  ],
  schema: [PERSON],
});

for (const t of trilhasCarreira) {
  routes.push({
    path: `/giselle/trilhas/${t.slug}`,
    title: `${t.titulo} | Giselle Falcão`,
    description: t.tagline,
    h1: t.titulo,
    blocks: [
      { p: t.descricao },
      { h2: "Para quem é" },
      { ul: t.paraQuem },
      { h2: "Pré-requisitos" },
      { p: t.requisitos },
      { h2: "Etapas" },
      { ul: t.etapas.map(e => `${e.courseSlug}: ${e.porque} ${e.entrega}`) },
      { h2: "Competências desenvolvidas" },
      { ul: t.competencias },
      { h2: "Ferramentas" },
      { ul: t.ferramentas },
      { h2: "Rotina de quem atua nesta função" },
      { ul: t.rotinas },
      { h2: "Posicionamento honesto" },
      { p: t.disclaimer },
    ],
    schema: [PERSON],
  });
}

// ---- /giselle/trilha (arquiteto)
routes.push({
  path: "/giselle/trilha",
  aliases: ["/giselle/trilhas/arquiteto-dados-ia"],
  title: `${trilha.title} | Giselle Falcão`,
  description: trilha.subtitle,
  h1: trilha.title,
  blocks: [
    { p: trilha.subtitle },
    { p: trilha.disclaimer },
    {
      ul: (trilha.routes as Array<Record<string, unknown>>).map(r =>
        [r.name, r.hours, r.weeks].filter(Boolean).join(" · ")
      ),
    },
  ],
  schema: [PERSON],
});

// ---- cursos
routes.push({
  path: "/giselle/cursos",
  title: "Cursos de Dados e IA | Giselle Falcão",
  description:
    "Catálogo de cursos de ciência de dados, machine learning, IA aplicada e agentes de IA, com práticas no navegador e trilha gamificada.",
  h1: "Cursos de Dados e Inteligência Artificial",
  blocks: [
    { ul: courses.map(c => `${c.title} (${c.level}, ${c.hours}) — ${c.tagline}`) },
    { links: courses.map(c => [c.title, `/giselle/cursos/${c.slug}`] as [string, string]) },
  ],
  schema: [PERSON],
});

for (const c of courses) {
  const hours = Number(String(c.hours).replace(/\D/g, "")) || undefined;
  routes.push({
    path: `/giselle/cursos/${c.slug}`,
    title: `${c.title} | Curso ${c.level} de ${c.hours}`,
    description: c.description,
    h1: c.title,
    blocks: [
      { p: c.tagline },
      { p: c.description },
      { h2: "O que você vai conseguir fazer" },
      { ul: c.outcomes },
      { h2: "Para quem é" },
      { p: c.audience },
      { h2: "Pré-requisitos" },
      { p: c.prerequisites },
      { h2: "Conteúdo" },
      {
        ul: (c.modules as Array<Record<string, unknown>>).map(m =>
          [m.title, m.subtitle, m.duration].filter(Boolean).join(" — ")
        ),
      },
    ],
    schema: [
      PERSON,
      {
        "@type": "Course",
        name: c.title,
        description: c.description,
        url: `${ORIGIN}/giselle/cursos/${c.slug}`,
        provider: PROVIDER,
        inLanguage: "pt-BR",
        educationalLevel: c.level,
        isAccessibleForFree: Boolean(c.free),
        ...(hours ? { timeRequired: `PT${hours}H` } : {}),
        teaches: c.outcomes,
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: `PT${hours ?? 0}H`,
        },
      },
    ],
  });
}

// ---- livro
routes.push({
  path: "/livro",
  title: `${livro.title} — ${livro.subtitle} | ${livro.author}`,
  description: `${livro.title} (${livro.ceodMeaning}): livro de ${livro.author}, ${livro.publisher}, ${livro.year}. ISBN ${livro.isbnPrint}.`,
  h1: `${livro.title} — ${livro.subtitle}`,
  blocks: [
    { p: `${livro.title} significa ${livro.ceodMeaning}.` },
    {
      dl: [
        ["Autora", livro.author],
        ["Editora", `${livro.publisher} — ${livro.place}`],
        ["Ano", String(livro.year)],
        ["Edição", livro.edition],
        ["Páginas", String(livro.pages)],
        ["ISBN impresso", livro.isbnPrint],
        ["ISBN digital", livro.isbnDigital],
      ],
    },
  ],
  schema: [
    PERSON,
    {
      "@type": "Book",
      name: livro.title,
      alternateName: `${livro.title} — ${livro.subtitle}`,
      author: { "@id": `${ORIGIN}/giselle#person` },
      publisher: { "@type": "Organization", name: livro.publisher },
      datePublished: String(livro.year),
      bookEdition: livro.edition,
      numberOfPages: livro.pages,
      isbn: livro.isbnPrint,
      inLanguage: "pt-BR",
      url: `${ORIGIN}/livro`,
    },
  ],
});

// ---- /giselle/servicos
routes.push({
  path: "/giselle/servicos",
  title: "Consultoria em IA aplicada a decisões críticas | Giselle Falcão",
  description:
    "Consultoria em inteligência artificial e ciência de dados para operações complexas: inspeção e qualidade, gêmeos digitais e simulação, otimização e previsão, e diagnóstico orientado por dados.",
  h1: "Consultoria em IA aplicada a decisões críticas",
  blocks: [
    { p: "Matemática e IA aplicadas a problemas reais de operação, com entrega orientada à decisão." },
    { h2: "Frentes de trabalho" },
    {
      ul: [
        "Inspeção, qualidade e monitoramento inteligente para operações complexas.",
        "Gêmeos digitais e simulação de cenários para decidir antes do problema.",
        "Otimização e previsão para reduzir perdas e alocar melhor os recursos.",
        "Dados dispersos viram critérios claros de diagnóstico e ação.",
      ],
    },
    { h2: "Setores" },
    { ul: ["Agronegócio", "Logística", "Indústria", "Saúde", "Educação", "Setor público", "Varejo", "Finanças"] },
    {
      links: [
        ["Diagnóstico de maturidade em IA", "/diagnostico-ia"],
        ["Contato", "/giselle/contato"],
      ],
    },
  ],
  schema: [
    PERSON,
    {
      "@type": "ProfessionalService",
      name: "Consultoria em IA aplicada — Giselle Falcão",
      description:
        "Consultoria em inteligência artificial, ciência de dados, otimização e modelagem matemática para operações críticas.",
      url: `${ORIGIN}/giselle/servicos`,
      provider: { "@id": `${ORIGIN}/giselle#person` },
      areaServed: "BR",
      availableLanguage: ["pt-BR", "en"],
    },
  ],
});

// ---- /giselle/ia-para-empresas
routes.push({
  path: "/giselle/ia-para-empresas",
  aliases: ["/empresas"],
  title: "IA para empresas: da dor à decisão | Giselle Falcão",
  description:
    "Como levar inteligência artificial à operação sem desperdício: mapear o problema, medir o custo de hoje, materializar a solução e multiplicar o resultado — com critério para saber quando IA não é a resposta.",
  h1: "IA para empresas — da dor à decisão, em quatro movimentos",
  blocks: [
    {
      p: "A maior parte do desperdício em projetos de IA vem de começar pela ferramenta. O caminho começa pelo problema e pelo número que ele custa hoje.",
    },
    { h2: "Os quatro movimentos" },
    {
      ul: [
        "Mapear — qual é o problema e quem decide com ele.",
        "Medir — como a decisão é tomada hoje e quanto custa, em horas ou em dinheiro.",
        "Materializar — a menor versão que roda e entrega resultado.",
        "Multiplicar — quem vê o resultado, o que muda e qual é o próximo passo.",
      ],
    },
    { h2: "Quando IA não é a resposta" },
    {
      p: "Se a decisão segue uma regra clara, uma regra bem feita resolve: mais rápido, mais barato e compreensível por qualquer pessoa da equipe. Um agente rodando sobre uma regra errada apenas erra mais rápido. A tecnologia vem depois do problema.",
    },
    {
      links: [
        ["Diagnóstico de maturidade em IA (3 minutos)", "/diagnostico-ia"],
        ["Consultoria e serviços", "/giselle/servicos"],
        ["Contato", "/giselle/contato"],
      ],
    },
  ],
  schema: [PERSON],
});

// ---- /giselle/programas-executivos (página de vendas B2B)
routes.push({
  path: "/giselle/programas-executivos",
  aliases: ["/programas-executivos", "/nokahi-edu"],
  title: "Programas Executivos NOKAHI Edu: formação em Dados e IA para empresas | Giselle Falcão",
  description:
    "Cinco programas in-company de Dados e IA para cada nível da empresa — diretoria, gestores, equipes não técnicas e times de TI —, conduzidos por Giselle Falcão, PhD. Turma fechada, casos do seu setor e um projeto aplicado ao final.",
  h1: pe.heroTitulo,
  blocks: [
    { p: `${pe.marca}, ${pe.assinatura}. ${pe.heroSub}` },
    { h2: "Por que tanto treinamento de IA não vira resultado" },
    { dl: pe.dores.map((d) => [d.titulo, d.texto] as [string, string]) },
    { h2: "Como trabalhamos" },
    { dl: pe.pilares.map((x) => [x.titulo, x.texto] as [string, string]) },
    { h2: "Os programas" },
    {
      dl: pe.programas.map((x) => {
        const c = courses.find((k) => k.slug === x.slug);
        return [
          `${c?.title ?? x.slug} (${c?.hours ?? ""}) — ${x.paraQuem}`,
          `${x.pergunta} Entregável: ${x.entregavel}. ${x.entregavelDetalhe}`,
        ] as [string, string];
      }),
    },
    { p: pe.combinar },
    { h2: "Método por módulo" },
    { ul: pe.metodo.map((m) => `${m.titulo}: ${m.texto}`) },
    { h2: "Como contratar" },
    { ul: pe.jornada.map((j) => `${j.titulo}: ${j.texto}`) },
    { h2: "O que está incluído" },
    { ul: pe.inclui },
    { h2: "Quem conduz" },
    { p: `${pe.conductora.nome}. ${pe.conductora.resumo}` },
    { ul: pe.conductora.provas },
    { h2: "Quem aprendeu com a Giselle" },
    {
      dl: pe.depoimentos.map(
        (d) => [`${d.nome} — ${d.tema}`, `${d.contexto} “${d.texto.replace(/\n\n/g, " ")}”`] as [string, string],
      ),
    },
    { h2: "Perguntas frequentes" },
    { dl: pe.faq.map((f) => [f.q, f.a] as [string, string]) },
    { p: pe.notaLegal },
    {
      links: [
        ...pe.programas.map(
          (x) =>
            [courses.find((k) => k.slug === x.slug)?.title ?? x.slug, `/giselle/cursos/${x.slug}`] as [string, string],
        ),
        ["Diagnóstico de maturidade em IA (3 minutos)", "/diagnostico-ia"],
        ["Palestras e workshops", "/giselle/palestras"],
      ],
    },
  ],
  schema: [
    PERSON,
    {
      "@type": "FAQPage",
      mainEntity: pe.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
});

// ---- /giselle/mentoria (hub)
routes.push({
  path: "/giselle/mentoria",
  aliases: ["/mentoria"],
  title: "Mentoria em Dados e IA | Giselle Falcão",
  description:
    "Dois caminhos de mentoria com Giselle Falcão: a Trajetória em Dados & IA, de quatro semanas em turma, e o Impulso Dela IA, programa individual dedicado a mulheres em tecnologia.",
  h1: "Mentoria em Dados e IA",
  blocks: [
    { h2: "Trajetória em Dados & IA — turma" },
    { p: trajetoria.promessa },
    { h2: "Impulso Dela IA — programa dedicado às mulheres" },
    {
      ul: [
        "Diagnóstico do seu momento: competências, lacunas e objetivo",
        "Plano de desenvolvimento e posicionamento sob medida",
        "Acompanhamento nas decisões: projetos, transição, negociação",
        "Formato e ritmo definidos na conversa — proposta individual",
      ],
    },
    {
      links: [
        ["Mentoria Trajetória em Dados & IA", "/giselle/mentoria/trajetoria"],
        ["Impulso Dela IA", "/giselle/mentoria/impulso"],
      ],
    },
  ],
  schema: [PERSON],
});

// ---- /giselle/contato
routes.push({
  path: "/giselle/contato",
  title: "Contato | Giselle Falcão, PhD",
  description:
    "Fale com Giselle Falcão sobre consultoria em IA aplicada, palestras, treinamentos in company e mentoria em Dados e IA.",
  h1: "Contato",
  blocks: [
    { p: "Para consultoria, palestras, treinamentos e mentoria." },
    {
      links: [
        ["LinkedIn", "https://www.linkedin.com/in/giselle-falcao-phd/"],
        ["Diagnóstico de maturidade em IA", "/diagnostico-ia"],
        ["Palestras", "/giselle/palestras"],
        ["Consultoria e serviços", "/giselle/servicos"],
      ],
    },
  ],
  schema: [PERSON],
});

// ---------------------------------------------------------------- template
function buildHtml(shell: string, r: Route): string {
  const url = ORIGIN + r.path;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: r.title,
        description: r.description,
        inLanguage: "pt-BR",
        isPartOf: { "@type": "WebSite", name: "Giselle Falcão", url: ORIGIN },
        about: { "@id": `${ORIGIN}/giselle#person` },
      },
      ...(r.schema ?? [PERSON]),
    ],
  };

  let html = shell;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(r.title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${esc(r.description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"[\s\S]*?\/>/,
    `<meta property="og:title" content="${esc(r.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${esc(r.description)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"[\s\S]*?\/>/,
    `<meta name="twitter:title" content="${esc(r.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${esc(r.description)}" />`
  );

  const head = [
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<script type="application/ld+json">${JSON.stringify(graph)}</script>`,
  ].join("\n    ");
  html = html.replace("</head>", `    ${head}\n  </head>`);

  const body = `<main><h1>${esc(r.h1)}</h1>\n${renderBlocks(r.blocks)}\n<hr /><p><a href="/giselle">Giselle Falcão, PhD</a> — ${esc(PERSON.jobTitle)}.</p></main>`;
  // O #root do build já vem com a tela de carregamento; o conteúdo entra logo
  // depois da abertura da div (o React substitui tudo isso ao hidratar).
  if (!html.includes('<div id="root">')) {
    throw new Error("[prerender] <div id=\"root\"> não encontrado no index.html do build");
  }
  html = html.replace('<div id="root">', `<div id="root">${body}`);
  return html;
}

// -------------------------------------------------------------------- build
function write(routePath: string, html: string) {
  const dir = path.join(OUT, routePath.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
}

const shellPath = path.join(DIST, "index.html");
if (!fs.existsSync(shellPath)) {
  console.error(`[prerender] ${shellPath} não encontrado — rode o vite build antes.`);
  process.exit(1);
}
const shell = fs.readFileSync(shellPath, "utf8");

let count = 0;
for (const r of routes) {
  const html = buildHtml(shell, r);
  write(r.path, html);
  count++;
  for (const alias of r.aliases ?? []) {
    write(alias, html);
    count++;
  }
}
// snapshot da home aponta para o hub da Giselle
write("/__home", buildHtml(shell, { ...routes[0], path: "/" }));
count++;

console.log(`[prerender] ${count} snapshots gerados em dist/public/__snapshots`);
