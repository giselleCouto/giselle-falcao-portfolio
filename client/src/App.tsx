// Arquitetura principal do hub Couto Falcão
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
import GiselleCourses from "./pages/GiselleCourses";

function RouteSeo() {
  const [location] = useLocation();

  useEffect(() => {
    const descriptionTag = document.querySelector('meta[name="description"]');

    if (location === "/giselle/cursos") {
      document.title = "Curso de Engenharia de Sistemas de IA Generativa | Giselle Falcão";
      descriptionTag?.setAttribute(
        "content",
        "Curso de IA generativa com módulos gratuitos e pagos, prática visual, engenharia de RAG, embeddings, bancos vetoriais, frameworks, avaliação e checkout com PIX.",
      );
      return;
    }

    if (location === "/giselle/cursos/checkout") {
      document.title = "Checkout do Curso | Giselle Falcão";
      descriptionTag?.setAttribute(
        "content",
        "Libere os módulos avançados do curso de IA generativa com checkout seguro, PIX, laboratório visual e continuidade autenticada do aprendizado.",
      );
      return;
    }

    if (location === "/giselle/cursos/lab") {
      document.title = "Laboratório Visual do Curso | Giselle Falcão";
      descriptionTag?.setAttribute(
        "content",
        "Ambiente visual de prática do curso de IA generativa com simulação de parâmetros de RAG, chunking, top-k, temperatura e fidelidade esperada.",
      );
      return;
    }

    if (location === "/giselle") {
      document.title = "Giselle Couto Falcão | IA, Educação e Modelagem Matemática";
      descriptionTag?.setAttribute(
        "content",
        "Portfólio institucional de Giselle Couto Falcão com foco em inteligência artificial, educação, machine learning, modelagem matemática computacional, matemática do clima, publicações e projetos para empresas e instituições.",
      );
      return;
    }

    if (location === "/jade") {
      document.title = "Jade | Posicionamento, Narrativa e Presença de Marca";
      descriptionTag?.setAttribute(
        "content",
        "Persona Jade por Couto Falcão: uma frente voltada a posicionamento autoral, narrativa, presença pública e construção estratégica de imagem e marca.",
      );
      return;
    }

    document.title = "Couto Falcão | Hub de Identidades";
    descriptionTag?.setAttribute(
      "content",
      "Couto Falcão é um hub de identidades que organiza frentes autorais e institucionais. Explore a rota Giselle para autoridade científica em IA, educação e modelagem matemática, e a rota Jade para posicionamento, narrativa e presença de marca.",
    );
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
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-teal-300 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-copper)]" />
              Hub de identidade
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              Couto Falcão
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Inteligência, estratégia e identidade reunidas em um único domínio. Escolha a frente de atuação que deseja explorar e entre em uma experiência desenhada para comunicar repertório, direção e presença.
            </p>
          </div>

          <div className="max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-400">
              Arquitetura editorial
            </p>
            <p className="mt-4 text-base leading-8 text-slate-300">
              A raiz do site funciona como seletor curatorial. Cada rota preserva a marca-mãe, mas desenvolve uma voz própria, um ritmo visual distinto e um posicionamento profissional claramente reconhecível.
            </p>
          </div>
        </header>

        <div className="grid gap-6 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:py-14">
          <Link href="/giselle" className="group rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,28,40,0.94),rgba(8,18,28,0.98))] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.35)] transition duration-500 hover:-translate-y-1 hover:border-teal-300/35 hover:shadow-[0_35px_120px_rgba(10,18,28,0.48)] sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-teal-300">Giselle</p>
                <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl">
                  Autoridade científica, IA, educação e modelagem matemática
                </h2>
              </div>
              <BrainCircuit className="mt-1 size-8 text-[var(--accent-copper)]" />
            </div>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Portfólio técnico-institucional para empresas, universidades, setor público e ecossistemas de inovação, com ênfase em machine learning, matemática computacional, pesquisa aplicada e matemática do clima.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "IA aplicada e machine learning",
                "Educação orientada por dados",
                "Modelagem matemática computacional",
                "Publicações, experiência e credenciais",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 inline-flex items-center text-sm font-medium text-white">
              Acessar portfólio
              <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </Link>

          <Link href="/jade" className="group rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(24,17,32,0.96),rgba(12,11,22,0.98))] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.35)] transition duration-500 hover:-translate-y-1 hover:border-fuchsia-300/35 hover:shadow-[0_35px_120px_rgba(16,12,30,0.5)] sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-fuchsia-300">Jade</p>
                <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl">
                  Persona de presença, linguagem e posicionamento autoral
                </h2>
              </div>
              <Sparkles className="mt-1 size-8 text-fuchsia-300" />
            </div>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Uma frente complementar, orientada à narrativa, marca pessoal e direção criativa estratégica, concebida para ampliar alcance, magnetismo comunicacional e repertório de imagem sem romper com a sofisticação da marca Couto Falcão.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Brand voice e expressão autoral",
                "Presença pública e narrativa",
                "Curadoria estética e comunicação",
                "Posicionamento com assinatura própria",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 inline-flex items-center text-sm font-medium text-white">
              Explorar identidade
              <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </Link>
        </div>

        <footer className="grid gap-5 border-t border-white/8 pt-8 text-sm text-slate-400 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4">
            <p className="font-medium text-slate-200">Marca-mãe</p>
            <p className="mt-2 leading-7">Uma assinatura central que organiza diferentes frentes profissionais dentro de uma mesma arquitetura de autoridade.</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4">
            <p className="font-medium text-slate-200">Rotas internas</p>
            <p className="mt-2 leading-7">O domínio principal concentra a navegação e distribui as identidades por caminhos internos com leitura clara e elegante.</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4">
            <p className="font-medium text-slate-200">Experiência premium</p>
            <p className="mt-2 leading-7">Transições suaves, profundidade visual e distinção editorial entre as personas, sem cair em uma estrutura genérica.</p>
          </div>
        </footer>
      </section>
    </main>
  );
}

function JadeProfile() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#100e18_0%,#0a0d16_100%)] text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(217,70,239,0.16),_transparent_26%),radial-gradient(circle_at_85%_18%,_rgba(96,165,250,0.12),_transparent_22%)]" />
        <div className="grid-overlay absolute inset-0 opacity-40" />
      </div>

      <section className="relative container py-8 sm:py-10 lg:py-12">
        <header className="flex flex-col gap-6 border-b border-white/8 pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-fuchsia-300 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
              Persona Jade
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[0.96] text-white sm:text-6xl">
              Jade por Couto Falcão
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              Um território de marca voltado a posicionamento autoral, linguagem, presença e construção de percepção. Jade não replica a frente científica de Giselle: ela traduz identidade em magnetismo, curadoria e comunicação com assinatura própria.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-3">
            <Link href="/" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10">
              Voltar ao hub
            </Link>
            <Link href="/giselle" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-fuchsia-200">
              Ver perfil Giselle
            </Link>
          </nav>
        </header>

        <div className="grid gap-6 py-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl sm:p-9">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-fuchsia-300">Posicionamento</p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-white sm:text-5xl">
              Presença estratégica para comunicação, imagem e expansão de marca pessoal
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
              A proposta da persona Jade é ocupar um campo complementar ao da autoridade técnico-científica: uma voz mais sensorial, narrativa e cultural, pensada para projetos, aparições, colaborações e construções de marca que exigem refinamento estético e clareza de identidade.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Narrativa de marca pessoal",
                "Curadoria estética e direção de presença",
                "Comunicação autoral multicanal",
                "Parcerias, imagem e repertório público",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <Orbit className="size-5 text-fuchsia-300" />
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-400">Tom da persona</p>
              </div>
              <p className="mt-5 text-base leading-8 text-slate-300">
                Mais expressiva, mais curatorial e mais orientada à percepção. Jade é uma identidade para contextos em que o valor não está apenas na profundidade técnica, mas também na forma como a presença é lida, lembrada e desejada.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(30,20,40,0.95),rgba(14,12,24,0.95))] p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <Sparkles className="size-5 text-sky-300" />
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-400">Aplicações sugeridas</p>
              </div>
              <div className="mt-5 space-y-4 text-base leading-8 text-slate-300">
                <p>Perfis públicos, keynote branding, presença digital, colaborações com marcas, projetos autorais e experiências onde imagem, voz e distinção simbólica são determinantes.</p>
                <p>Essa base já deixa a rota pronta para evolução futura com portfólio editorial, mídia, manifesto pessoal, projetos criativos e captação de parcerias específicas.</p>
              </div>
            </div>
          </div>
        </div>
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
        <Route path="/giselle" component={() => <PortfolioSite />} />
        <Route path="/jade" component={JadeProfile} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
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

export default App;
