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
import GiselleCourses from "./pages/GiselleCourses";

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

function RouteSeo() {
  const [location] = useLocation();

  useEffect(() => {
    const origin = window.location.origin;
    const pathname = location || "/";
    const canonicalUrl = new URL(pathname, origin).toString();

    let title = "Couto Falcão | Hub de Identidades";
    let description =
      "Couto Falcão é um hub de identidades que organiza frentes autorais e institucionais. Explore a rota Giselle para autoridade científica, consultoria em IA e modelagem matemática, e a rota Jade para posicionamento, narrativa e presença de marca.";
    let keywords =
      "Couto Falcão, Giselle Couto Falcão, consultoria em inteligência artificial, tecnologia, inovação, modelagem matemática, branding pessoal, Jade";

    removeJsonLd("giselle-person-schema");
    removeJsonLd("giselle-faq-schema");
    removeJsonLd("giselle-case-studies-schema");
    removeJsonLd("giselle-insights-schema");

    if (location === "/giselle/cursos") {
      title = "Curso de Engenharia de Sistemas de IA Generativa | Giselle Falcão";
      description =
        "Curso de IA generativa com módulos gratuitos e pagos, prática visual, engenharia de RAG, embeddings, bancos vetoriais, frameworks, avaliação e checkout com PIX.";
      keywords =
        "curso de IA generativa, curso de inteligência artificial, RAG, embeddings, bancos vetoriais, Giselle Falcão";
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
        url: "https://coutofalcao.com/giselle",
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
        <Route path="/giselle/cursos" component={() => <GiselleCourses view="overview" />} />
        <Route path="/giselle/cursos/checkout" component={() => <GiselleCourses view="checkout" />} />
        <Route path="/giselle/cursos/lab" component={() => <GiselleCourses view="lab" />} />
        <Route path="/giselle/cursos/meus-cursos" component={() => <GiselleCourses view="dashboard" />} />
        <Route path="/giselle" component={() => <PortfolioSite />} />
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
