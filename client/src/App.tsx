// Design reminder: a home funciona como hub institucional, enquanto Giselle e Jade operam como frentes autorais distintas,
// com uma home seletora sofisticada e duas personas claramente distintas,
// preservando continuidade de marca, profundidade institucional e navegação fluida.

import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { ArrowRight, BrainCircuit, Orbit, Sparkles } from "lucide-react";
import { Link, Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import PortfolioSite from "./components/PortfolioSite";
import { ThemeProvider } from "./contexts/ThemeContext";
import { caseStudies, faqItems, insightArticles } from "./lib/portfolioData";
import { getCourse } from "./lib/courses";
import { minasSummitFaqItems, minasSummitFaqMeta, minasSummitSocialLinks } from "./lib/minasSummitFaqData";
import AiOsExperience from "./pages/AiOsExperience";
import CourseCatalog from "./pages/CourseCatalog";
import CoursePlayer from "./pages/CoursePlayer";
import GiselleCourses from "./pages/GiselleCourses";
import GiselleHome from "./pages/giselle/GiselleHome";
import GiselleSolucoes from "./pages/giselle/GiselleSolucoes";
import GiselleServicos from "./pages/giselle/GiselleServicos";
import GiselleSobre from "./pages/giselle/GiselleSobre";
import GiselleContato from "./pages/giselle/GiselleContato";
import GiselleLivro from "./pages/giselle/GiselleLivro";
import GiselleDossie from "./pages/giselle/GiselleDossie";
import GiselleInteresse from "./pages/giselle/GiselleInteresse";
import GiselleLivroComprar from "./pages/giselle/GiselleLivroComprar";
import GiselleMentoria from "./pages/giselle/GiselleMentoria";
import GisellePalestras from "./pages/giselle/GisellePalestras";
import GiselleDiagnosticoIA from "./pages/giselle/GiselleDiagnosticoIA";
import GiselleLab from "./pages/giselle/GiselleLab";
import GiselleTrajetoria from "./pages/giselle/GiselleTrajetoria";
import GiselleTrilha from "./pages/giselle/GiselleTrilha";
import GiselleTrilhas from "./pages/giselle/GiselleTrilhas";
import GiselleTrilhaCarreira from "./pages/giselle/GiselleTrilhaCarreira";
import { trilhasCarreira } from "./lib/trilhasCarreiraData";
import MinasSummitFaq from "./pages/MinasSummitFaq";

function upsertMeta(selector: string, attributeName: "name" | "property", attributeValue: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attributeName, attributeValue);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let tag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let tag = document.getElementById(id) as HTMLScriptElement | null;

  if (!tag) {
    tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.id = id;
    document.head.appendChild(tag);
  }

  tag.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  document.getElementById(id)?.remove();
}

// Rotas-atalho que renderizam o mesmo conteúdo de uma URL principal:
// o canonical (e og:url) deve apontar sempre para a variante listada no
// sitemap, evitando conteúdo duplicado aos olhos dos buscadores.
const CANONICAL_ALIASES: Record<string, string> = {
  "/trilhas": "/giselle/trilhas",
  "/trilhas/": "/giselle/trilhas",
  "/mentoria": "/giselle/mentoria",
  "/trajetoria": "/giselle/mentoria/trajetoria",
  "/trajetoria/": "/giselle/mentoria/trajetoria",
  "/lab": "/giselle/lab",
  "/lab/": "/giselle/lab",
  "/giselle/lab/": "/giselle/lab",
  "/palestras": "/giselle/palestras",
  "/giselle/diagnostico-ia": "/diagnostico-ia",
  "/giselle/interesse": "/interesse",
  "/giselle/trilhas/arquiteto-dados-ia": "/giselle/trilha",
};

function RouteSeo() {
  const [location] = useLocation();

  useEffect(() => {
    // Navegação SPA deve se comportar como troca de página: volta ao topo.
    // Âncoras same-page (#candidatura etc.) não alteram o pathname do wouter,
    // então não passam por aqui e continuam funcionando.
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    // Host canônico único: evita conteúdo duplicado entre www e subdomínios.
    const origin = "https://www.coutofalcao.com";
    const pathname = location || "/";
    const canonicalUrl = new URL(CANONICAL_ALIASES[pathname] ?? pathname, origin).toString();

    let title = "Giselle Falcão | AI que entende, transforma e impulsiona";
    let description =
      "AI que entende, transforma e impulsiona. Dra. Giselle Falcão — PhD, pesquisadora e consultora em IA industrial, modelagem matemática e ciência de dados, com soluções em produção, cursos, mentoria e o livro Metodologia CEOD.";
    let keywords =
      "Giselle Falcão, Giselle Couto Falcão, inteligência artificial, consultoria em IA, modelagem matemática, ciência de dados, cursos de IA, mentoria mulheres em dados, Metodologia CEOD";

    removeJsonLd("giselle-person-schema");
    removeJsonLd("giselle-faq-schema");
    removeJsonLd("giselle-case-studies-schema");
    removeJsonLd("giselle-insights-schema");
    removeJsonLd("giselle-course-schema");
    removeJsonLd("giselle-book-schema");
    removeJsonLd("minas-summit-faq-schema");
    removeJsonLd("minas-summit-speaker-schema");

    if (location === "/giselle/cursos") {
      title = "Cursos de IA e Dados com Certificado | Giselle Falcão Academy";
      description =
        "Cursos práticos de Machine Learning, análise de dados, IA aplicada e agentes de IA — com trilha gamificada, laboratórios no navegador e certificado. Cursos gratuitos para começar hoje.";
      keywords =
        "curso de inteligência artificial, curso de machine learning gratuito, curso de análise de dados, curso de IA com certificado, Giselle Falcão Academy";
    } else if (location === "/giselle/cursos/checkout") {
      title = "Checkout do Curso | Giselle Falcão";
      description =
        "Libere os módulos avançados do curso de IA generativa com checkout seguro, PIX, laboratório visual e continuidade autenticada do aprendizado.";
      keywords = "checkout curso IA, curso de IA generativa, PIX, Giselle Falcão";
    } else if (location === "/giselle/cursos/lab") {
      title = "Laboratório Visual do Curso | Giselle Falcão";
      description =
        "Ambiente visual de prática do curso de IA generativa com simulação de parâmetros de RAG, chunking, top-k, temperatura e fidelidade esperada.";
      keywords = "laboratório de IA generativa, RAG, prática em IA, Giselle Falcão";
    } else if (location === "/giselle/cursos/meus-cursos") {
      title = "Meus Cursos | Giselle Falcão";
      description =
        "Área autenticada dos cursos de Giselle Falcão com histórico detalhado, retomada por aula, progresso salvo e status claro de liberação pós-compra.";
      keywords = "meus cursos, área do aluno, curso de IA, Giselle Falcão";
    } else if (location.startsWith("/giselle/cursos/")) {
      const slug = location.split("/")[3] ?? "";
      const course = getCourse(slug);

      if (course) {
        title = `${course.title} — Curso ${course.free ? "Gratuito" : "Premium"} com Certificado | Giselle Falcão Academy`;
        description = `${course.tagline} Curso ${course.level.toLowerCase()} de ${course.hours} com trilha gamificada, práticas no navegador e certificado digital.`;
        keywords = `curso ${course.title}, curso de IA, curso ${course.free ? "gratuito" : "online"}, ${course.level}, certificado, Giselle Falcão Academy`;

        upsertJsonLd("giselle-course-schema", {
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.title,
          description: course.description,
          inLanguage: "pt-BR",
          provider: {
            "@type": "Organization",
            name: "Giselle Falcão Academy",
            url: "https://www.coutofalcao.com/giselle",
          },
          offers: {
            "@type": "Offer",
            category: course.free ? "Free" : "Paid",
            ...(course.free ? { price: "0", priceCurrency: "BRL" } : {}),
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Online",
            courseWorkload: `PT${course.hours.replace(/\D/g, "")}H`,
          },
          educationalCredentialAwarded: "Certificado digital de conclusão",
          teaches: course.outcomes,
          audience: {
            "@type": "EducationalAudience",
            educationalRole: "student",
            audienceType: course.audience,
          },
        });
      }
    } else if (location === "/giselle/solucoes") {
      title = "Soluções de IA em Produção | Giselle Falcão";
      description =
        "SensorMonit, Curral AI, GreenSenti, EucaSmart e Pharos: sistemas de IA em produção para indústria, agro, logística e clima — com demos abertas.";
      keywords =
        "soluções de IA, IA industrial, IA no agro, otimização logística, gêmeo digital, visão computacional, Giselle Falcão";
    } else if (location === "/giselle/servicos") {
      title = "Consultoria em IA e Ciência de Dados | Giselle Falcão";
      description =
        "Consultoria PhD em IA industrial, digital twins, modelagem matemática e analytics estratégico: diagnóstico, modelagem, implementação e acompanhamento.";
      keywords =
        "consultoria em inteligência artificial, consultoria de dados, IA industrial, digital twins, modelagem matemática, Giselle Falcão";
    } else if (location === "/giselle/sobre") {
      title = "Sobre a Dra. Giselle Couto Falcão | PhD em IA e Modelagem Matemática";
      description =
        "Trajetória, formação (2 doutorados), publicações científicas e credenciais da Dra. Giselle Couto Falcão — pesquisadora e consultora em IA industrial.";
      keywords =
        "Giselle Couto Falcão, PhD inteligência artificial, doutora modelagem matemática, pesquisadora IA, Lattes, Google Scholar";
    } else if (location === "/giselle/contato") {
      title = "Contato | Giselle Falcão — IA e Ciência de Dados";
      description =
        "Fale com a Dra. Giselle Falcão: WhatsApp, e-mail ou agende uma reunião online de 30 minutos sobre consultoria, cursos, palestras e workshops.";
      keywords = "contato Giselle Falcão, agendar consultoria IA, palestra inteligência artificial, workshop dados";
    } else if (location === "/trilhas" || location === "/trilhas/" || location === "/giselle/trilhas") {
      title = "Trilhas de Carreira em Dados e IA — do Zero ao Arquiteto | Giselle Falcão";
      description =
        "Três degraus, um caminho: Trilha Analista de Dados (do zero, 98h), Trilha Cientista de Dados (96h) e a formação Arquiteto de Soluções, Dados & IA (480h). Comece grátis, na ordem certa.";
      keywords =
        "trilha analista de dados, trilha cientista de dados, carreira em dados, como começar em ciência de dados, curso gratuito dados e IA, Giselle Falcão";
    } else if (location === "/giselle/trilhas/analista-de-dados") {
      title = "Trilha Analista de Dados — Comece do Zero | Giselle Falcão";
      description =
        "4 cursos e 98h para se tornar Analista de Dados: fundamentos, análise estratégica, SQL de produção e estatística — com ferramentas gratuitas, direto no navegador. Comece grátis hoje.";
      keywords =
        "trilha analista de dados, curso analista de dados gratuito, aprender SQL do zero, dashboard, estatística para análise de dados, Giselle Falcão";
    } else if (location === "/giselle/trilhas/cientista-de-dados") {
      title = "Trilha Cientista de Dados — do Analisar ao Prever | Giselle Falcão";
      description =
        "3 cursos e 96h para evoluir de analista a cientista de dados: Machine Learning, IA aplicada com casos reais da indústria e do agro, e agentes de IA — do notebook à produção.";
      keywords =
        "trilha cientista de dados, curso machine learning, IA aplicada, agentes de IA, transição analista para cientista de dados, Giselle Falcão";
    } else if (location === "/giselle/trilha" || location === "/giselle/trilhas/arquiteto-dados-ia") {
      title = "Trilha Arquiteto de Soluções, Dados & IA — 480h Multicloud | Giselle Falcão";
      description =
        "Formação profissional de 480h em 10 cursos (rota acelerada de 300h): arquitetura de soluções, cloud multicloud, dados, MLOps, GenAI, FinOps e capstone com banca. Certificação por competências demonstradas.";
      keywords =
        "trilha arquiteto de soluções, formação arquiteto de dados, curso arquitetura de IA, multicloud, MLOps, GenAI, FinOps, capstone, Giselle Falcão";
    } else if (location === "/palestras" || location === "/giselle/palestras") {
      title = "Palestras e Formações Corporativas em Dados e IA | Giselle Falcão";
      description =
        "Palestras, workshops hands-on e programas corporativos com a Dra. Giselle Falcão: casos reais do agro, indústria e educação, do DATA BH ao Minas Summit. Proposta sob consulta.";
      keywords =
        "palestrante inteligência artificial, palestra dados e IA, workshop IA empresas, formação corporativa dados, keynote IA Brasil, Giselle Falcão";
    } else if (location === "/diagnostico-ia" || location === "/giselle/diagnostico-ia") {
      title = "Diagnóstico de Maturidade em IA — Teste Gratuito | Giselle Falcão";
      description =
        "Em 3 minutos, descubra o estágio da sua empresa em Dados, Tecnologia, Pessoas, Processos e Estratégia de IA — com resultado na hora e recomendações práticas.";
      keywords =
        "maturidade em IA, diagnóstico de IA, assessment inteligência artificial, maturidade de dados empresa, teste gratuito IA";
    } else if (
      location === "/lab" ||
      location === "/lab/" ||
      location === "/giselle/lab" ||
      location === "/giselle/lab/"
    ) {
      title = "Laboratório da Decisão — Da Dor à Produção | Giselle Falcão";
      description =
        "Três ferramentas de 5 minutos para destravar sua trajetória em Dados e IA ou o projeto parado da sua empresa: diagnóstico de prontidão, checklist anti agent-washing e roteiro de 30 dias. Resultado na hora, no celular.";
      keywords =
        "laboratório da decisão, diagnóstico IA, projeto de IA parado, agent washing, checklist agente de IA, roteiro 30 dias IA, prontidão em dados, Giselle Falcão";
    } else if (
      location === "/trajetoria" ||
      location === "/trajetoria/" ||
      location === "/giselle/mentoria/trajetoria"
    ) {
      title = "Mentoria Trajetória em Dados & IA — Turma Fundadora | Giselle Falcão";
      description =
        "Mentoria prática de 4 semanas para iniciar, migrar ou reposicionar sua carreira em Dados e IA aproveitando a experiência que você já tem: direção, caso prático para portfólio e plano de 90 dias. 12 vagas + bolsas para mulheres.";
      keywords =
        "mentoria dados e IA, mentoria carreira em dados, transição de carreira tecnologia, turma fundadora, mentoria trajetória, projeto para portfólio dados, Giselle Falcão";
    } else if (location === "/mentoria" || location === "/giselle/mentoria") {
      title = "Impulso Dela IA — Mentoria para Mulheres em Dados e IA | Giselle Falcão";
      description =
        "Direção, conhecimento e confiança para construir uma carreira possível em tecnologia. Mentoria em grupo e individual para mulheres que desejam entrar, migrar ou crescer em Dados e IA — com a Dra. Giselle Falcão.";
      keywords =
        "mentoria mulheres tecnologia, mentoria dados e IA, carreira em dados, transição de carreira mulher, Impulso Dela IA, Giselle Falcão";
    } else if (location === "/livro" || location === "/livro/") {
      title = "Onde comprar — Metodologia CEOD | Giselle Falcão";
      description =
        "Escolha onde comprar o livro Metodologia CEOD: Amazon, Mercado Livre, umLivro ou direto com a Editora Sorian. A revolução data-driven na recomposição da aprendizagem.";
      keywords = "comprar Metodologia CEOD, livro Giselle Falcão Amazon, Mercado Livre, umLivro, Editora Sorian";
    } else if (location === "/palestra") {
      title = "Continue sua jornada | Palestras da Giselle Falcão";
      description =
        "Você assistiu a uma palestra da Giselle Falcão? Responda em 2 minutos e destrave a jornada completa: redes, livro Metodologia CEOD, soluções de IA e cursos gratuitos.";
      keywords = "palestra Giselle Falcão, questionário, cursos gratuitos de dados e IA";
    } else if (location === "/databh") {
      title = "Da Query ao Modelo — Trilha de 30 dias | DATA BH · SQL Saturday 2026";
      description =
        "Continuação da palestra da Giselle Falcão no DATA BH: responda em 2 minutos e libere o treinamento gratuito de 4 semanas — do SQL ao modelo de ML em produção, na Databricks Free Edition.";
      keywords = "DATA BH, SQL Saturday 2026, Da Query ao Modelo, Giselle Falcão, Databricks Free Edition, curso ML SQL";
    } else if (location === "/interesse" || location === "/giselle/interesse") {
      title = "Pesquisa de Interesse — Cursos de Dados e IA | Giselle Falcão Academy";
      description =
        "Conte em 2 minutos o que você quer aprender sobre dados e IA. Suas respostas ajudam a criar cursos gratuitos e acessíveis, no formato certo para você.";
      keywords = "pesquisa de interesse, curso de dados, curso de IA, curso gratuito, Giselle Falcão Academy";
    } else if (location === "/giselle/livro" || location === "/giselle/livro/dossie") {
      const isDossie = location === "/giselle/livro/dossie";
      title = isDossie
        ? "Dossiê Educacional — Metodologia CEOD | Giselle Falcão"
        : "Metodologia CEOD — Livro de Giselle Falcão (Editora Sorian, 2026)";
      description = isDossie
        ? "Dossiê técnico da Metodologia CEOD para secretarias, escolas e editais: fundamentação científica, evidências de impacto (estudo SAEB em Goiás) e implementação."
        : "Livro Metodologia CEOD: a revolução data-driven na recomposição da aprendizagem. IA, psicometria e modelagem matemática validadas sobre milhões de registros do SAEB. Editora Sorian, 2026.";
      keywords =
        "Metodologia CEOD, livro Giselle Falcão, recomposição da aprendizagem, IA na educação, BNCC, SAEB, Editora Sorian, Conhecimento Evolutivo Orientado por Dados";

      upsertJsonLd("giselle-book-schema", {
        "@context": "https://schema.org",
        "@type": "Book",
        name: "Metodologia CEOD: a revolução data-driven na recomposição da aprendizagem",
        author: { "@type": "Person", name: "Giselle Couto Falcão" },
        publisher: { "@type": "Organization", name: "Editora Sorian" },
        inLanguage: "pt-BR",
        datePublished: "2026",
        numberOfPages: 184,
        isbn: "978-65-5453-849-7",
        bookFormat: "https://schema.org/EBook",
        identifier: [
          {
            "@type": "PropertyValue",
            propertyID: "ISBN digital",
            value: "978-65-5453-849-7",
          },
          {
            "@type": "PropertyValue",
            propertyID: "ISBN impresso",
            value: "978-65-5453-847-3",
          },
          {
            "@type": "PropertyValue",
            propertyID: "DOI informado na obra",
            value: "10.54466/sorianed.978-65-5453-849-7",
          },
        ],
        about: [
          "Inteligência artificial na educação",
          "Recomposição da aprendizagem",
          "Psicometria",
          "Modelagem matemática",
          "BNCC",
          "SAEB",
        ],
        url: "https://www.coutofalcao.com/giselle/livro",
      });
    } else if (location === "/ai-os") {
      title = "AI/OS Interface Prototype | Couto Falcão";
      description =
        "Protótipo visual AI/OS para portfólio institucional focado em IA, inovação, dados e engenharia matemática, com hero monumental e módulo inicial de geometria de precisão.";
      keywords =
        "AI/OS interface, portfolio IA, inovação, dados, engenharia matemática, GSAP, Three.js, geometria de precisão";
    } else if (location === minasSummitFaqMeta.slug) {
      title = minasSummitFaqMeta.title;
      description = minasSummitFaqMeta.description;
      keywords = minasSummitFaqMeta.keywords;

      upsertJsonLd("minas-summit-faq-schema", {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: minasSummitFaqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      });

      upsertJsonLd("minas-summit-speaker-schema", {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Giselle Couto Falcão",
        url: new URL(minasSummitFaqMeta.slug, origin).toString(),
        sameAs: [minasSummitSocialLinks.linkedin],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "business inquiries",
          url: minasSummitSocialLinks.whatsapp,
        },
      });
    } else if (location === "/giselle") {
      title = "Giselle Couto Falcão | IA Industrial, Modelagem Matemática e Ciência de Dados";
      description =
        "IA industrial, modelagem matemática e ciência de dados para decisões críticas. Pesquisadora e consultora PhD com atuação em visão computacional, digital twins, logística, saúde, educação, indústria e setor público.";
      keywords =
        "Giselle Couto Falcão, IA industrial, visão computacional, digital twins, modelagem matemática, ciência de dados aplicada, decisões críticas, consultora PhD, indústria, logística, saúde, educação, setor público";

      upsertJsonLd("giselle-person-schema", {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Giselle Couto Falcão",
        url: "https://www.coutofalcao.com/giselle",
        jobTitle: "Pesquisadora e consultora PhD em IA industrial, modelagem matemática e ciência de dados aplicada",
        description:
          "Pesquisadora e consultora PhD que desenvolve modelos, sistemas analíticos e estratégias técnicas para indústria, logística, saúde, educação e setor público, com foco em visão computacional, digital twins e inteligência operacional.",
        knowsAbout: [
          "IA Industrial",
          "Visão Computacional",
          "Digital Twins",
          "Modelagem Matemática",
          "Ciência de Dados Aplicada",
          "Machine Learning",
          "Sistemas de Decisão",
          "Otimização Operacional",
          "Logística",
          "Saúde orientada por dados",
          "Educação baseada em dados",
          "Setor público",
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "PhD",
            educationalLevel: "Doctorate",
            abstract: "Doutorado em Modelagem Matemática e Computacional",
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "PhD",
            educationalLevel: "Doctorate",
            abstract: "Doutorado em Matemática do Clima",
          },
        ],
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "CEFET-MG" },
          { "@type": "CollegeOrUniversity", name: "Sorbonne University" },
          { "@type": "CollegeOrUniversity", name: "University of Hartford" },
        ],
        sameAs: [
          "https://www.linkedin.com/in/giselle-falcao-phd/",
          "https://www.instagram.com/gisellecfalcao",
          "https://github.com/giselleCouto",
          "https://scholar.google.com.br/citations?hl=pt-BR&user=ljBj6GMAAAAJ",
          "http://lattes.cnpq.br/7661015485905669",
        ],
      });

      upsertJsonLd("giselle-faq-schema", {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question.pt,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer.pt,
          },
        })),
      });

      upsertJsonLd("giselle-case-studies-schema", {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Cases de IA industrial, modelagem matemática e ciência de dados aplicada de Giselle Couto Falcão",
        itemListElement: caseStudies.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: item.title.pt,
            description: `${item.result.pt} ${item.proof.pt}`,
            about: item.sector.pt,
            keywords: item.tags.join(", "),
          },
        })),
      });

      upsertJsonLd("giselle-insights-schema", {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Insights editoriais de Giselle Couto Falcão sobre IA industrial, modelagem matemática e ciência de dados aplicada",
        itemListElement: insightArticles.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Article",
            headline: item.title.pt,
            description: item.excerpt.pt,
            articleSection: item.category.pt,
            audience: item.audience.pt,
            author: {
              "@type": "Person",
              name: "Giselle Couto Falcão",
            },
          },
        })),
      });
    } else if (location === "/jade") {
      title = "Jade | Posicionamento, Narrativa e Presença de Marca";
      description =
        "Persona Jade por Couto Falcão: uma frente voltada a posicionamento autoral, narrativa, presença pública e construção estratégica de imagem e marca.";
      keywords = "Jade, posicionamento, narrativa, presença de marca, Couto Falcão";
    }

    document.title = title;
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[name="keywords"]', "name", "keywords", keywords);
    upsertMeta('meta[name="robots"]', "name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta('meta[property="og:locale"]', "property", "og:locale", "pt_BR");
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", "Couto Falcão");
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertCanonical(canonicalUrl);
  }, [location]);

  return null;
}

function IdentityHub() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg-obsidian)] text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,167,167,0.16),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(187,123,72,0.14),_transparent_22%),linear-gradient(180deg,_rgba(5,13,20,1),_rgba(6,16,24,1))]" />
        <div className="grid-overlay absolute inset-0" />
      </div>

      <section className="relative container flex min-h-screen flex-col justify-between py-8 sm:py-10 lg:py-14">
        <header className="flex flex-col gap-8 border-b border-white/8 pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/18 bg-teal-300/6 px-4 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.34em] text-teal-200">
              <span className="size-1.5 rounded-full bg-[var(--accent-copper)]" />
              Hub de Identidade
            </div>
            <h1 className="mt-6 max-w-2xl font-display text-5xl leading-[0.95] tracking-tight text-[var(--text-ivory)] sm:text-6xl lg:text-[5rem]">
              Couto Falcão
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-200 sm:text-2xl sm:leading-10">
              Inteligência, estratégia e identidade reunidas em um único domínio. Escolha a frente de atuação que deseja explorar e entre em uma experiência desenhada para comunicar repertório, direção e presença.
            </p>
          </div>

          <div className="max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-slate-400">Arquitetura editorial</p>
            <p className="mt-5 text-[1.45rem] leading-9 text-slate-200">
              A raiz do site funciona como seletor curatorial. Cada rota preserva a marca-mãe, mas desenvolve uma voz própria, um ritmo visual distinto e um posicionamento profissional claramente reconhecível.
            </p>
          </div>
        </header>

        <div className="grid gap-6 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:py-14">
          <Link href="/giselle" className="group rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,28,40,0.94),rgba(8,18,28,0.98))] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.35)] transition duration-500 hover:-translate-y-1 hover:border-teal-300/35 hover:shadow-[0_35px_120px_rgba(10,18,28,0.48)] sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.34em] text-teal-300">Giselle</p>
                <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.05] text-[var(--text-ivory)] sm:text-[3.75rem]">
                  IA industrial, modelagem matemática e ciência de dados aplicada
                </h2>
              </div>
              <div className="mt-1 rounded-full border border-white/10 bg-white/5 p-3 text-[var(--accent-copper)]">
                <BrainCircuit className="size-5" />
              </div>
            </div>

            <p className="mt-7 max-w-2xl text-[1.32rem] leading-9 text-slate-300">
              Portfólio técnico-institucional para empresas, universidades, setor público e ecossistemas de inovação, com ênfase em machine learning, matemática computacional, pesquisa aplicada e matemática do clima.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {[
                "IA industrial e visão computacional",
                "Digital twins e inteligência operacional",
                "Modelagem matemática computacional",
                "Publicações, experiência e credenciais",
              ].map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-[1rem] text-slate-200">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.24em] text-slate-300">
              Explorar Giselle
              <span className="rounded-full border border-white/10 bg-white/5 p-2 transition duration-500 group-hover:translate-x-1 group-hover:border-teal-300/40">
                <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>

          <Link href="/jade" className="group rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(26,14,40,0.94),rgba(18,8,28,0.98))] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.35)] transition duration-500 hover:-translate-y-1 hover:border-fuchsia-300/35 hover:shadow-[0_35px_120px_rgba(24,10,28,0.52)] sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.34em] text-fuchsia-200">Jade</p>
                <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.05] text-[var(--text-ivory)] sm:text-[3.6rem]">
                  Persona de presença, linguagem e posicionamento autoral
                </h2>
              </div>
              <div className="mt-1 rounded-full border border-white/10 bg-white/5 p-3 text-fuchsia-200">
                <Sparkles className="size-5" />
              </div>
            </div>

            <p className="mt-7 max-w-2xl text-[1.32rem] leading-9 text-slate-300">
              Uma frente complementar, orientada à narrativa, marca pessoal e direção criativa estratégica, concebida para ampliar alcance, magnetismo comunicacional e repertório de imagem sem romper com a sofisticação da marca Couto Falcão.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {[
                "Brand voice e expressão autoral",
                "Presença pública e narrativa",
                "Estratégia de imagem e sofisticação visual",
                "Comunicação de alta lembrança",
              ].map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-[1rem] text-slate-200">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.24em] text-slate-300">
              Explorar Jade
              <span className="rounded-full border border-white/10 bg-white/5 p-2 transition duration-500 group-hover:translate-x-1 group-hover:border-fuchsia-300/40">
                <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        </div>

        <footer className="flex flex-col gap-4 border-t border-white/8 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Couto Falcão estrutura presença, profundidade e direção para frentes autorais e institucionais.</p>
          <div className="flex items-center gap-2 text-slate-300">
            <Orbit className="size-4 text-teal-300" />
            <span>Hub editorial com rotas posicionadas para autoridade e narrativa.</span>
          </div>
        </footer>
      </section>
    </main>
  );
}

function JadeProfile() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg-obsidian)] text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(167,37,124,0.16),_transparent_28%),radial-gradient(circle_at_78%_18%,_rgba(115,74,187,0.16),_transparent_22%),linear-gradient(180deg,_rgba(7,12,24,1),_rgba(8,9,16,1))]" />
        <div className="grid-overlay absolute inset-0" />
      </div>

      <section className="relative container flex min-h-screen flex-col justify-between py-8 sm:py-10 lg:py-14">
        <header className="flex flex-col gap-8 border-b border-white/8 pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-300/8 px-4 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.34em] text-fuchsia-200">
              <span className="size-1.5 rounded-full bg-[var(--accent-copper)]" />
              VOLTAR AO HUB
            </Link>
            <h1 className="mt-6 max-w-2xl font-display text-5xl leading-[0.95] tracking-tight text-[var(--text-ivory)] sm:text-6xl lg:text-[4.8rem]">
              Jade
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-200 sm:text-2xl sm:leading-10">
              Persona de presença, sofisticação narrativa e direção autoral. Uma frente desenhada para linguagem, imagem e magnetismo de marca.
            </p>
          </div>

          <div className="max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-slate-400">Arquitetura de presença</p>
            <p className="mt-5 text-[1.45rem] leading-9 text-slate-200">
              Jade foi concebida como uma extensão autoral complementar: uma linguagem própria, construída para imagem, presença e inteligência comunicacional.
            </p>
          </div>
        </header>

        <div className="grid gap-6 py-10 lg:grid-cols-[0.92fr_1.08fr] lg:py-14">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(26,14,40,0.94),rgba(18,8,28,0.98))] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.34em] text-fuchsia-200">POSICIONAMENTO</p>
                <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.05] text-[var(--text-ivory)] sm:text-[3.5rem]">
                  Linguagem, imagem e narrativa como ativos estratégicos
                </h2>
              </div>
              <div className="mt-1 rounded-full border border-white/10 bg-white/5 p-3 text-fuchsia-200">
                <Sparkles className="size-5" />
              </div>
            </div>

            <p className="mt-7 max-w-2xl text-[1.32rem] leading-9 text-slate-300">
              A persona Jade articula sensibilidade estética, repertório simbólico e clareza de posicionamento para construir uma presença pública memorável, sofisticada e coerente.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {[
                "Direção criativa e narrativa autoral",
                "Expressão pública com magnetismo",
                "Identidade refinada para marca pessoal",
                "Presença visual com alta coerência",
              ].map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-[1rem] text-slate-200">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.24em] text-slate-300">
              Linguagem com direção
              <span className="rounded-full border border-white/10 bg-white/5 p-2">
                <ArrowRight className="size-4" />
              </span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,12,24,0.94),rgba(10,12,20,0.98))] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.34em] text-teal-200">CONTINUIDADE DE MARCA</p>
                <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.05] text-[var(--text-ivory)] sm:text-[3.25rem]">
                  Uma voz própria sem romper com a assinatura Couto Falcão
                </h2>
              </div>
              <div className="mt-1 rounded-full border border-white/10 bg-white/5 p-3 text-teal-200">
                <BrainCircuit className="size-5" />
              </div>
            </div>

            <p className="mt-7 max-w-2xl text-[1.32rem] leading-9 text-slate-300">
              A coexistência entre Giselle e Jade permite expandir território simbólico sem dispersão. O resultado é uma arquitetura de identidades com coerência, respiro narrativo e grande capacidade de diferenciação.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {[
                "Ecossistema de presença e sofisticação",
                "Narrativa com densidade e lembrança",
                "Arquitetura visual integrada",
                "Clareza estratégica de posicionamento",
              ].map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-[1rem] text-slate-200">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.24em] text-slate-300">
              Arquitetura complementar
              <span className="rounded-full border border-white/10 bg-white/5 p-2">
                <ArrowRight className="size-4" />
              </span>
            </div>
          </div>
        </div>

        <footer className="flex flex-col gap-4 border-t border-white/8 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Jade amplia a presença pública com sofisticação, coerência e direção narrativa.</p>
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="size-4 text-fuchsia-200" />
            <span>Uma rota pensada para magnetismo, repertório e expressão autoral.</span>
          </div>
        </footer>
      </section>
    </main>
  );
}

function Router() {
  return (
    <>
      <RouteSeo />
      <Switch>
        <Route path="/" component={IdentityHub} />
        <Route path="/giselle/cursos" component={CourseCatalog} />
        <Route path="/giselle/cursos/trilha" component={() => <GiselleCourses view="overview" />} />
        <Route path="/giselle/cursos/checkout" component={() => <GiselleCourses view="checkout" />} />
        <Route path="/giselle/cursos/lab" component={() => <GiselleCourses view="lab" />} />
        <Route path="/giselle/cursos/meus-cursos" component={() => <GiselleCourses view="dashboard" />} />
        <Route path="/giselle/cursos/:slug">
          {(params) => <CoursePlayer slug={params.slug ?? ""} />}
        </Route>
        <Route path="/giselle/solucoes" component={GiselleSolucoes} />
        <Route path="/interesse">{() => <GiselleInteresse />}</Route>
        <Route path="/giselle/interesse">{() => <GiselleInteresse />}</Route>
        <Route path="/livro" component={GiselleLivroComprar} />
        <Route path="/mentoria" component={GiselleMentoria} />
        <Route path="/giselle/mentoria" component={GiselleMentoria} />
        <Route path="/lab" component={GiselleLab} />
        <Route path="/giselle/lab" component={GiselleLab} />
        <Route path="/trajetoria" component={GiselleTrajetoria} />
        <Route path="/giselle/mentoria/trajetoria" component={GiselleTrajetoria} />
        <Route path="/palestras" component={GisellePalestras} />
        <Route path="/giselle/palestras" component={GisellePalestras} />
        <Route path="/diagnostico-ia" component={GiselleDiagnosticoIA} />
        <Route path="/giselle/diagnostico-ia" component={GiselleDiagnosticoIA} />
        <Route path="/palestra">
          {() => (
            <GiselleInteresse
              source="palestra"
              journey
              headline="Que bom ter você aqui! 🚀"
              intro="Você acabou de assistir a uma palestra da Giselle Falcão. Responda em 2 minutos — suas respostas moldam os próximos conteúdos — e destrave sua jornada: redes, livro, soluções e os cursos gratuitos."
            />
          )}
        </Route>
        <Route path="/databh">
          {() => (
            <GiselleInteresse
              source="databh-sqlsaturday-2026"
              next="/giselle/cursos/da-query-ao-modelo"
              headline="Bem-vindo(a) à sua trilha de 30 dias 🚀"
              intro="Você assistiu à palestra 'Da Query ao Modelo' no DATA BH · SQL Saturday. Responda em 2 minutos e libere o treinamento introdutório de 4 semanas — com o notebook da palestra, o plano S1–S4 e os quatro tropeços já vacinados."
            />
          )}
        </Route>
        <Route path="/giselle/trilha" component={GiselleTrilha} />
        <Route path="/trilhas" component={GiselleTrilhas} />
        <Route path="/giselle/trilhas" component={GiselleTrilhas} />
        <Route path="/giselle/trilhas/arquiteto-dados-ia" component={GiselleTrilha} />
        {trilhasCarreira.map((t) => (
          <Route key={t.slug} path={`/giselle/trilhas/${t.slug}`}>
            {() => <GiselleTrilhaCarreira trilha={t} />}
          </Route>
        ))}
        <Route path="/giselle/livro/dossie" component={GiselleDossie} />
        <Route path="/giselle/livro" component={GiselleLivro} />
        <Route path="/giselle/servicos" component={GiselleServicos} />
        <Route path="/giselle/sobre" component={GiselleSobre} />
        <Route path="/giselle/contato" component={GiselleContato} />
        <Route path="/giselle/completo" component={() => <PortfolioSite />} />
        <Route path="/giselle" component={GiselleHome} />
        <Route path="/ai-os" component={AiOsExperience} />
        <Route path={minasSummitFaqMeta.slug} component={MinasSummitFaq} />
        <Route path="/jade" component={JadeProfile} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
