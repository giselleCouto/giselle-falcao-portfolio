// Design reminder: editorial científico neo-institucional com assimetria disciplinada, autoridade silenciosa,
// azul petróleo, cobre fosco, marfim técnico e acentos turquesa. Cada bloco deve parecer uma peça curatorial,
// combinando evidência, sofisticação executiva e profundidade intelectual.

import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  ChevronRight,
  Globe,
  GraduationCap,
  Languages,
  Mail,
  Menu,
  Microscope,
  Newspaper,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { assets, authorityMetrics, contact, educationTimeline, experienceTimeline, expertiseCards, heroCopy, impactStats, keyAreas, navItems, placeholderPrompt, projectCategories, projects, publications, speaking, stack, certifications, t, type Locale, aboutSection, valueBlocks, linkedinBadge } from "@/lib/portfolioData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type SectionId =
  | "home"
  | "sobre"
  | "expertise"
  | "projetos"
  | "impacto"
  | "experiencia"
  | "formacao"
  | "publicacoes"
  | "credenciais"
  | "palestras"
  | "valor"
  | "contato";

type PortfolioSiteProps = {
  initialLocale?: Locale;
  page?: "home" | "sobre" | "projetos" | "publicacoes" | "experiencia" | "formacao" | "palestras" | "contato";
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const sectionMap: Record<NonNullable<PortfolioSiteProps["page"]>, SectionId> = {
  home: "home",
  sobre: "sobre",
  projetos: "projetos",
  publicacoes: "publicacoes",
  experiencia: "experiencia",
  formacao: "formacao",
  palestras: "palestras",
  contato: "contato",
};

const pageTitles = {
  home: { pt: "Home", en: "Home" },
  sobre: { pt: "Sobre", en: "About" },
  projetos: { pt: "Projetos", en: "Projects" },
  publicacoes: { pt: "Publicações", en: "Publications" },
  experiencia: { pt: "Experiência", en: "Experience" },
  formacao: { pt: "Formação", en: "Education" },
  palestras: { pt: "Palestras & Mídia", en: "Speaking & Media" },
  contato: { pt: "Contato", en: "Contact" },
};

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 border border-white/10 bg-slate-950/65 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-teal-300 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-copper)]" />
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  text: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}
    >
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{text}</p>
    </motion.div>
  );
}

declare global {
  interface Window {
    IN?: {
      parse?: () => void;
    };
  }
}

export default function PortfolioSite({ initialLocale = "pt", page = "home" }: PortfolioSiteProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("Todos");
  const [publicationFilter, setPublicationFilter] = useState(locale === "pt" ? "Todos" : "All");
  const [location] = useLocation();
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    organization: "",
    interest: "",
    message: "",
  });

  const currentRoute = useMemo(() => {
    if (location.startsWith("/jade")) {
      return { route: "/jade", persona: "jade" } as const;
    }

    if (location.startsWith("/giselle")) {
      return { route: "/giselle", persona: "giselle" } as const;
    }

    return { route: "/", persona: "hub" } as const;
  }, [location]);

  const submitLeadMutation = trpc.leads.submit.useMutation({
    onSuccess: (result) => {
      setLeadForm({
        name: "",
        email: "",
        organization: "",
        interest: "",
        message: "",
      });

      toast.success(
        locale === "pt"
          ? result.notificationSent
            ? "Mensagem enviada com sucesso. Sua solicitação já foi sinalizada internamente."
            : "Mensagem recebida com sucesso. O registro foi salvo e será analisado em breve."
          : result.notificationSent
            ? "Message sent successfully. Your request has already been flagged internally."
            : "Message received successfully. Your submission has been saved and will be reviewed soon.",
      );
    },
    onError: () => {
      toast.error(
        locale === "pt"
          ? "Não foi possível enviar sua mensagem agora. Tente novamente em instantes."
          : "We could not send your message right now. Please try again shortly.",
      );
    },
  });

  const scrollToSection = (href: string) => {
    if (typeof window === "undefined" || !href.startsWith("#")) return;

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    const headerOffset = 104;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.history.replaceState(null, "", href);
    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
  };

  const handleAnchorNavigation =
    (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setMenuOpen(false);
      scrollToSection(href);
    };

  const filteredProjects = useMemo(() => {
    if (projectFilter === "Todos" || projectFilter === "All") return projects;
    return projects.filter((item) => item.category === projectFilter);
  }, [projectFilter]);

  const publicationThemes = useMemo(
    () => (locale === "pt" ? ["Todos", "Educação", "Matemática", "Clima", "Saúde", "IA / Machine Learning"] : ["All", "Educação", "Matemática", "Clima", "Saúde", "IA / Machine Learning"]),
    [locale],
  );

  const filteredPublications = useMemo(() => {
    if (publicationFilter === "Todos" || publicationFilter === "All") return publications;
    return publications.filter((item) => item.theme === publicationFilter);
  }, [publicationFilter]);

  useEffect(() => {
    setPublicationFilter(locale === "pt" ? "Todos" : "All");
  }, [locale]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.location.hash) return;

    const frame = window.requestAnimationFrame(() => {
      scrollToSection(window.location.hash);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const parseLinkedinBadge = () => {
      window.IN?.parse?.();
    };

    const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://platform.linkedin.com/badges/js/profile.js"]');

    if (existingScript) {
      if (window.IN?.parse) {
        parseLinkedinBadge();
      } else {
        existingScript.addEventListener("load", parseLinkedinBadge, { once: true });
        return () => existingScript.removeEventListener("load", parseLinkedinBadge);
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;
    script.type = "text/javascript";
    script.addEventListener("load", parseLinkedinBadge, { once: true });
    document.body.appendChild(script);

    return () => script.removeEventListener("load", parseLinkedinBadge);
  }, [location, locale]);

  const handleLeadFieldChange =
    (field: keyof typeof leadForm) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setLeadForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleLeadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await submitLeadMutation.mutateAsync({
      route: currentRoute.route,
      persona: currentRoute.persona,
      name: leadForm.name,
      email: leadForm.email,
      organization: leadForm.organization,
      interest: leadForm.interest,
      message: leadForm.message,
      source: "website-contact-form",
    });
  };

  return (
    <div className="relative overflow-hidden bg-[var(--bg-obsidian)] text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_top_left,_rgba(37,167,167,0.16),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(187,123,72,0.18),_transparent_30%),linear-gradient(180deg,_rgba(7,17,26,0.94),_rgba(7,17,26,1))]" />
        <div className="grid-overlay absolute inset-0" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/8 bg-[rgba(6,16,24,0.78)] backdrop-blur-xl">
        <div className="container flex items-center justify-between gap-6 py-3">
          <Link href="/" className="flex shrink-0 items-center gap-4 xl:gap-5">
            <img src={assets.logo} alt="Logo Giselle Falcão" className="h-10 w-auto object-contain xl:h-11" />
            <div className="hidden 2xl:block">
              <p className="font-display text-base leading-tight text-white">Giselle Couto Falcão</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.24em] text-slate-400">
                AI Strategy · Mathematical Modeling · Education
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-4 xl:gap-5 lg:flex">
            {navItems.map((item) => {
              const active =
                (item.href === "#home" && (location === "/" || location === "")) ||
                (typeof window !== "undefined" && window.location.hash === item.href);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleAnchorNavigation(item.href)}
                  className={cn(
                    "text-[0.95rem] font-medium text-slate-300 transition-colors hover:text-white xl:text-sm",
                    active && "text-white",
                  )}
                >
                  {t(locale, item.label)}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/" className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white">
              Couto Falcão Hub
            </Link>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1 text-xs">
              <button
                className={cn("rounded-full px-3 py-1.5 transition", locale === "pt" && "bg-white text-slate-950")}
                onClick={() => setLocale("pt")}
              >
                PT
              </button>
              <button
                className={cn("rounded-full px-3 py-1.5 transition", locale === "en" && "bg-white text-slate-950")}
                onClick={() => setLocale("en")}
              >
                EN
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/giselle/cursos" className="group inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-400/10 px-5 py-2.5 text-sm font-medium text-cyan-50 transition hover:bg-cyan-400/20">
                {locale === "pt" ? "Cursos de IA" : "AI Courses"}
                <ChevronRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#contato"
                onClick={handleAnchorNavigation("#contato")}
                className="group inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-[var(--accent-copper)] hover:text-slate-950"
              >
                {t(locale, heroCopy.ctaSecondary)}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <button
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Abrir navegação"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/8 bg-[rgba(8,19,29,0.96)] lg:hidden">
            <div className="container flex flex-col gap-3 py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-2 text-left text-base text-slate-200"
                  onClick={handleAnchorNavigation(item.href)}
                >
                  {t(locale, item.label)}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                <Link href="/" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
                  Voltar ao hub
                </Link>
                <Button variant="outline" className="rounded-full border-white/10 bg-transparent text-white hover:bg-white/10" onClick={() => setLocale(locale === "pt" ? "en" : "pt")}> 
                  <Languages className="mr-2 size-4" />
                  {locale === "pt" ? "Switch to English" : "Mudar para português"}
                </Button>
                <Link href="/giselle/cursos" className="inline-flex items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-50 transition hover:bg-cyan-400/20">
                  {locale === "pt" ? "Cursos de IA" : "AI Courses"}
                </Link>
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-[var(--accent-copper)]"
                  onClick={handleAnchorNavigation("#contato")}
                >
                  {t(locale, heroCopy.ctaSecondary)}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="relative scroll-mt-28 border-b border-white/6 pt-6 sm:pt-10">
          <div className="container grid items-center gap-12 pb-20 pt-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pb-28">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10">
              <Badge className="rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.3em] text-teal-200">
                {t(locale, pageTitles[page])}
              </Badge>
              <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.94] text-white sm:text-6xl lg:text-[5.25rem]">
                {heroCopy.name}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-[1.4rem] sm:leading-9">{t(locale, heroCopy.headline)}</p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">{t(locale, heroCopy.subheadline)}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#projetos" onClick={handleAnchorNavigation("#projetos")} className="group inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-[var(--accent-copper)]">
                  {t(locale, heroCopy.ctaPrimary)}
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link href="/giselle/cursos" className="inline-flex items-center rounded-full border border-cyan-300/18 bg-cyan-400/10 px-6 py-3 text-sm font-medium text-cyan-50 transition hover:bg-cyan-400/20">
                  {locale === "pt" ? "Explorar cursos" : "Explore courses"}
                </Link>
                <a href="#contato" onClick={handleAnchorNavigation("#contato")} className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                  {t(locale, heroCopy.ctaSecondary)}
                </a>
              </div>

              <div className="mt-10 grid gap-3 rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur sm:grid-cols-2 xl:grid-cols-3">
                {keyAreas[locale].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/6 bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 max-w-3xl rounded-[2rem] border border-[rgba(191,148,103,0.3)] bg-[linear-gradient(135deg,rgba(191,148,103,0.14),rgba(11,21,34,0.1))] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-copper)]">Positioning</p>
                <p className="mt-3 text-base leading-8 text-slate-200">{t(locale, heroCopy.impactPrompt)}</p>
              </div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.12 }} className="relative mx-auto w-full max-w-[540px] lg:justify-self-end">
              <div className="absolute -left-10 top-8 hidden h-52 w-52 rounded-full bg-teal-400/15 blur-3xl md:block" />
              <div className="absolute -right-4 bottom-6 hidden h-56 w-56 rounded-full bg-amber-500/12 blur-3xl md:block" />
              <div className="portrait-frame relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-3 shadow-[0_35px_120px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-0 bg-[url('https://d2xsxph8kpxj0f.cloudfront.net/310519663156393333/6sAjL87Dgs7zQfqq7pYXKz/giselle-hero-atlas-9rA6i749UYThtL9Lh5ZSxA.webp')] bg-cover bg-center opacity-18 mix-blend-screen" />
                <img src={assets.portrait} alt="Retrato institucional de Giselle Couto Falcão" className="relative z-10 h-full w-full rounded-[2rem] object-cover" />
                <div className="absolute inset-x-6 bottom-6 z-20 rounded-[1.6rem] border border-white/10 bg-[rgba(6,16,24,0.76)] p-5 backdrop-blur-xl">
                  <p className="text-[0.65rem] uppercase tracking-[0.28em] text-slate-400">AI STRATEGY · APPLIED RESEARCH</p>
                  <p className="mt-3 font-display text-[1.65rem] leading-tight text-white">{t(locale, heroCopy.role)}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="container pb-18">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {authorityMetrics.map((metric, index) => (
                <motion.div
                  key={metric.value}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.05 }}
                  className="metric-panel rounded-[1.8rem] border border-white/8 bg-[rgba(255,255,255,0.04)] p-6"
                >
                  <p className="font-display text-3xl text-white">{metric.value}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{t(locale, metric.label)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="scroll-mt-28 border-b border-white/6 py-24">
          <div className="container grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionHeading
                eyebrow={locale === "pt" ? "Posicionamento" : "Positioning"}
                title={locale === "pt" ? "Uma identidade intelectual construída entre ciência, estratégia e execução" : "An intellectual identity built across science, strategy, and execution"}
                text={t(locale, aboutSection.intro)}
              />
            </div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-6 text-base leading-8 text-slate-300 sm:text-lg">
              <p>{t(locale, aboutSection.body)}</p>
              <p>{t(locale, aboutSection.closing)}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="rounded-[1.8rem] border-white/8 bg-white/5 text-white">
                  <CardContent className="p-6">
                    <Microscope className="size-8 text-teal-300" />
                    <h3 className="mt-5 font-display text-2xl">{locale === "pt" ? "Pesquisa profunda" : "Deep research"}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {locale === "pt"
                        ? "Leitura rigorosa de fenômenos complexos, com domínio matemático, metodológico e experimental."
                        : "Rigorous interpretation of complex phenomena, with mathematical, methodological, and experimental mastery."}
                    </p>
                  </CardContent>
                </Card>
                <Card className="rounded-[1.8rem] border-white/8 bg-white/5 text-white">
                  <CardContent className="p-6">
                    <BriefcaseBusiness className="size-8 text-[var(--accent-copper)]" />
                    <h3 className="mt-5 font-display text-2xl">{locale === "pt" ? "Aplicação estratégica" : "Strategic application"}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {locale === "pt"
                        ? "Capacidade de transformar complexidade técnica em decisões, produtos, políticas e resultados."
                        : "Ability to turn technical complexity into decisions, products, policies, and outcomes."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="expertise" className="border-b border-white/6 py-24">
          <div className="container">
            <SectionHeading
              eyebrow={locale === "pt" ? "Áreas de expertise" : "Areas of expertise"}
              title={locale === "pt" ? "Competências estruturadas para problemas complexos e ambientes de alta exigência" : "Capabilities designed for complex problems and high-demand environments"}
              text={locale === "pt" ? "Cada frente de atuação combina densidade metodológica, aplicação prática e leitura institucional do contexto. O conjunto comunica amplitude, mas também profundidade." : "Each line of work combines methodological depth, practical application, and institutional understanding of context. The whole conveys breadth, but also depth."}
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {expertiseCards.map((card, index) => (
                <motion.div
                  key={card.key}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Card className="group h-full rounded-[1.9rem] border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] text-white transition duration-300 hover:-translate-y-1 hover:border-teal-300/20 hover:bg-[linear-gradient(180deg,rgba(37,167,167,0.12),rgba(255,255,255,0.03))]">
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="mb-5 flex items-center justify-between">
                        <span className="h-1.5 w-12 rounded-full bg-[var(--accent-copper)]" />
                        <Sparkles className="size-4 text-teal-300/80" />
                      </div>
                      <h3 className="font-display text-2xl leading-tight">{t(locale, card.title)}</h3>
                      <p className="mt-4 text-sm leading-7 text-slate-300">{t(locale, card.description)}</p>
                      <p className="mt-5 border-t border-white/8 pt-5 text-sm leading-7 text-slate-400">{t(locale, card.applications)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="projetos" className="scroll-mt-28 border-b border-white/6 py-24">
          <div className="container">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow={locale === "pt" ? "Projetos em destaque" : "Featured projects"}
                title={locale === "pt" ? "Portfólio estruturado por setor, impacto e abordagem técnica" : "Portfolio organized by sector, impact, and technical approach"}
                text={locale === "pt" ? "Os cases abaixo foram desenhados para comunicar a amplitude da atuação e o tipo de problema que Giselle é capaz de conduzir. A estrutura já está pronta para receber links, métricas finais e clientes, caso você queira aprofundar cada projeto depois." : "The cases below were designed to communicate the breadth of work and the kinds of problems Giselle is able to lead. The structure is already ready to receive links, final metrics, and clients if you later want to deepen each project."}
              />
              <div className="flex flex-wrap gap-2">
                {[locale === "pt" ? "Todos" : "All", ...projectCategories].map((category) => (
                  <button
                    key={category}
                    onClick={() => setProjectFilter(category)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition",
                      projectFilter === category
                        ? "border-transparent bg-white text-slate-950"
                        : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-14 grid gap-6 xl:grid-cols-2">
              {filteredProjects.map((project, index) => (
                <motion.div key={project.title.pt} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                  <Card className="h-full overflow-hidden rounded-[2rem] border-white/8 bg-[rgba(255,255,255,0.04)] text-white">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden border-b border-white/6 p-8">
                        <div className="absolute inset-0 bg-[url('https://d2xsxph8kpxj0f.cloudfront.net/310519663156393333/6sAjL87Dgs7zQfqq7pYXKz/giselle-ai-education-panel-gsjjyd5bgf99jZd3PTbEqD.webp')] bg-cover bg-center opacity-10" />
                        <div className="relative z-10 flex items-start justify-between gap-4">
                          <div>
                            <Badge className="rounded-full border border-teal-300/20 bg-teal-300/10 text-teal-200">{t(locale, project.sector)}</Badge>
                            <h3 className="mt-4 font-display text-3xl leading-tight">{t(locale, project.title)}</h3>
                          </div>
                          <div className="text-right text-xs uppercase tracking-[0.22em] text-slate-500">{project.category}</div>
                        </div>
                      </div>
                      <div className="grid gap-6 p-8">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{locale === "pt" ? "Contexto" : "Context"}</p>
                          <p className="mt-2 text-sm leading-7 text-slate-300">{t(locale, project.context)}</p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{locale === "pt" ? "Problema" : "Problem"}</p>
                            <p className="mt-2 text-sm leading-7 text-slate-300">{t(locale, project.problem)}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{locale === "pt" ? "Abordagem" : "Approach"}</p>
                            <p className="mt-2 text-sm leading-7 text-slate-300">{t(locale, project.approach)}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Stack / Metodologia</p>
                          <p className="mt-2 text-sm leading-7 text-slate-300">{project.stack}</p>
                        </div>
                        <div className="border-t border-white/8 pt-6">
                          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-copper)]">{locale === "pt" ? "Impacto gerado" : "Impact generated"}</p>
                          <p className="mt-2 text-sm leading-7 text-slate-200">{t(locale, project.impact)}</p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                                {tag}
                              </span>
                            ))}
                          </div>
                          {project.link ? (
                            <div className="mt-6">
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-[rgba(191,148,103,0.28)] bg-[rgba(191,148,103,0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-copper)] transition hover:border-[rgba(191,148,103,0.45)] hover:bg-[rgba(191,148,103,0.16)]"
                              >
                                {locale === "pt" ? "Abrir projeto" : "Open project"}
                                <ArrowRight className="size-4" />
                              </a>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="impacto" className="relative border-b border-white/6 py-24">
          <div className="absolute inset-x-0 top-12 h-80 bg-[url('https://d2xsxph8kpxj0f.cloudfront.net/310519663156393333/6sAjL87Dgs7zQfqq7pYXKz/giselle-climate-math-panel-WFgWmN5e9jCReteRQSrBXt.webp')] bg-cover bg-center opacity-[0.08]" />
          <div className="container relative z-10">
            <SectionHeading
              eyebrow={locale === "pt" ? "Impacto e resultados" : "Impact and results"}
              title={locale === "pt" ? "Resultados apresentados como capacidade analítica, escala e confiança institucional" : "Results framed as analytical capacity, scale, and institutional trust"}
              text={locale === "pt" ? "Em vez de promessas genéricas, o site destaca as naturezas de impacto que compõem sua atuação: eficiência, inteligência decisória, profundidade metodológica e valor transversal a múltiplos setores." : "Instead of generic promises, the website highlights the types of impact that define her work: efficiency, decision intelligence, methodological depth, and value across multiple sectors."}
              align="center"
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {impactStats.map((item, index) => (
                <motion.div key={item.value} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                  <Card className="h-full rounded-[1.8rem] border-white/8 bg-[rgba(7,17,26,0.72)] text-white backdrop-blur-xl">
                    <CardContent className="p-6">
                      <p className="font-display text-3xl text-[var(--accent-copper)]">{item.value}</p>
                      <h3 className="mt-4 text-lg font-semibold text-white">{t(locale, item.title)}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{t(locale, item.text)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="experiencia" className="scroll-mt-28 border-b border-white/6 py-24">
          <div className="container grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
            <SectionHeading
              eyebrow={locale === "pt" ? "Trajetória profissional" : "Professional trajectory"}
              title={locale === "pt" ? "Uma linha do tempo que combina mercado, pesquisa, ensino e relevância pública" : "A timeline combining market experience, research, teaching, and public relevance"}
              text={locale === "pt" ? "A força do posicionamento está também na diversidade qualificada das experiências. Cada instituição amplia o repertório técnico e institucional da atuação." : "The strength of the positioning also lies in the qualified diversity of experiences. Each institution expands the technical and institutional repertoire of her work."}
            />
            <div className="relative space-y-6 before:absolute before:bottom-0 before:left-3 before:top-0 before:w-px before:bg-gradient-to-b before:from-[var(--accent-copper)] before:to-teal-300/20 sm:before:left-4">
              {experienceTimeline.map((item, index) => (
                <motion.div key={item.org} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="relative pl-10 sm:pl-14">
                  <span className="absolute left-0 top-2 h-7 w-7 rounded-full border border-[color:rgba(191,148,103,0.4)] bg-[var(--bg-obsidian)] shadow-[0_0_0_6px_rgba(7,17,26,0.8)] sm:left-1" />
                  <Card className="rounded-[1.7rem] border-white/8 bg-white/5 text-white">
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-display text-2xl">{item.org}</h3>
                          <p className="mt-1 text-sm uppercase tracking-[0.2em] text-teal-200">{t(locale, item.role)}</p>
                        </div>
                        <ChevronRight className="mt-1 hidden size-5 text-slate-500 sm:block" />
                      </div>
                      <p className="mt-4 text-sm leading-7 text-slate-300">{t(locale, item.focus)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="formacao" className="scroll-mt-28 border-b border-white/6 pb-18 pt-24">
          <div className="container grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <SectionHeading
                eyebrow={locale === "pt" ? "Formação acadêmica" : "Academic education"}
                title={locale === "pt" ? "Uma arquitetura formativa incomum para problemas intelectualmente exigentes" : "An unusual educational architecture for intellectually demanding problems"}
                text={locale === "pt" ? "A combinação entre doutorados, modelagem matemática, data science, matemática do clima e educação sustenta um perfil raro, com lastro para pesquisa de fronteira e aplicação de alto nível." : "The combination of doctorates, mathematical modeling, data science, climate mathematics, and education supports a rare profile prepared for frontier research and high-level application."}
              />
            </div>
            <div className="grid gap-4 lg:pt-6">
              {educationTimeline.map((item, index) => (
                <motion.div key={`${item.institution}-${index}`} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
                  <Card className="rounded-[1.8rem] border-white/8 bg-[rgba(255,255,255,0.04)] text-white">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                          <GraduationCap className="size-5 text-[var(--accent-copper)]" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl leading-tight">{t(locale, item.title)}</h3>
                          <p className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-400">{item.institution}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="publicacoes" className="scroll-mt-28 border-b border-white/6 pb-24 pt-18">
          <div className="container">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow={locale === "pt" ? "Publicações e produção intelectual" : "Publications and intellectual production"}
                title={locale === "pt" ? "Pesquisa, papers e escrita técnica como extensão natural da autoridade" : "Research, papers, and technical writing as a natural extension of authority"}
                text={locale === "pt" ? "A seção está estruturada para receber links externos, DOI, repositórios e acervos acadêmicos. O desenho editorial ajuda a valorizar produção científica, dissertações, teses e trabalhos técnicos." : "This section is structured to receive external links, DOI references, repositories, and academic archives. Its editorial design helps elevate scientific production, dissertations, theses, and technical papers."}
              />
              <div className="flex flex-wrap gap-2">
                {publicationThemes.map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setPublicationFilter(theme)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition",
                      publicationFilter === theme
                        ? "border-transparent bg-white text-slate-950"
                        : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-5 xl:grid-cols-2">
              {filteredPublications.map((item, index) => (
                <motion.div key={`${item.title.pt}-${item.year}`} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
                  <Card className="h-full rounded-[1.8rem] border-white/8 bg-white/5 text-white">
                    <CardContent className="p-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge className="rounded-full border border-white/10 bg-white/5 text-slate-200">{t(locale, item.type)}</Badge>
                        <span className="text-xs uppercase tracking-[0.22em] text-slate-500">{item.year}</span>
                      </div>
                      <h3 className="mt-5 font-display text-2xl leading-tight">{t(locale, item.title)}</h3>
                      {item.venue ? <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-400">{t(locale, item.venue)}</p> : null}
                      <p className="mt-4 text-sm leading-7 text-slate-300">{t(locale, item.summary)}</p>
                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        {item.link && item.link !== "#" ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-2 text-sm text-teal-100 transition hover:border-teal-200 hover:bg-teal-300/20 hover:text-white"
                          >
                            {locale === "pt" ? "Abrir artigo" : "Open article"}
                            <ArrowRight className="ml-2 size-4" />
                          </a>
                        ) : null}
                        {item.doi ? (
                          <a
                            href={item.doi}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                          >
                            DOI
                            <span className="ml-2 text-xs text-slate-400">{item.doi.replace("https://doi.org/", "")}</span>
                          </a>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="credenciais" className="border-b border-white/6 py-24">
          <div className="container grid gap-14 xl:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow={locale === "pt" ? "Certificações e stack" : "Certifications and stack"}
                title={locale === "pt" ? "Credenciais técnicas que reforçam repertório, atualização e domínio de ecossistema" : "Technical credentials reinforcing repertoire, currency, and ecosystem mastery"}
                text={locale === "pt" ? "As certificações dão visibilidade ao alinhamento com plataformas e práticas de mercado, enquanto a stack comunica prontidão para implementação, pesquisa aplicada e solução executiva." : "The certifications provide visibility into alignment with market platforms and practices, while the stack communicates readiness for implementation, applied research, and executive-grade solutions."}
              />
            </div>
            <div className="grid gap-6">
              <Card className="rounded-[2rem] border-white/8 bg-white/5 text-white">
                <CardContent className="p-6">
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-400">{locale === "pt" ? "Certificações" : "Certifications"}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {certifications.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.06)] px-4 py-2 text-sm text-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-[2rem] border-white/8 bg-[linear-gradient(180deg,rgba(37,167,167,0.08),rgba(255,255,255,0.03))] text-white">
                <CardContent className="p-6">
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-400">{locale === "pt" ? "Ferramentas e tecnologias" : "Tools and technologies"}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {stack.map((item) => (
                      <span key={item} className="rounded-full border border-teal-300/12 bg-teal-300/6 px-4 py-2 text-sm text-teal-100">
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="palestras" className="scroll-mt-28 border-b border-white/6 py-24">
          <div className="container grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-white/5">
              <img src={assets.climatePanel} alt="Painel visual sobre clima, modelagem e análise" className="h-full min-h-[320px] w-full object-cover opacity-85" />
            </div>
            <div>
              <SectionHeading
                eyebrow={locale === "pt" ? "Palestras, docência e liderança" : "Speaking, teaching, and leadership"}
                title={locale === "pt" ? "Autoridade pública e acadêmica para formação, debate e influência técnica" : "Public and academic authority for education, debate, and technical influence"}
                text={t(locale, speaking.intro)}
              />
              <div className="mt-8 space-y-4">
                {speaking.themes[locale].map((item) => (
                  <div key={item} className="flex items-start gap-4 rounded-[1.5rem] border border-white/8 bg-white/5 p-5">
                    <BookOpen className="mt-1 size-5 text-[var(--accent-copper)]" />
                    <p className="text-sm leading-7 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="valor" className="border-b border-white/6 py-24">
          <div className="container">
            <SectionHeading
              eyebrow={locale === "pt" ? "Para quem eu entrego valor" : "Where I create value"}
              title={locale === "pt" ? "Diferentes organizações, um mesmo padrão de exigência: profundidade, clareza e impacto" : "Different organizations, one common standard of demand: depth, clarity, and impact"}
              text={locale === "pt" ? "Esta arquitetura de valor ajuda empresas, organizações educacionais, setor público e centros de pesquisa a reconhecer rapidamente quais dores podem ser endereçadas e como a atuação se converte em resultado." : "This value architecture helps companies, education organizations, the public sector, and research centers quickly recognize which pains can be addressed and how the work translates into outcomes."}
              align="center"
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {valueBlocks.map((item, index) => (
                <motion.div key={item.title.pt} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                  <Card className="h-full rounded-[1.9rem] border-white/8 bg-white/5 text-white">
                    <CardContent className="p-6">
                      <h3 className="font-display text-2xl">{t(locale, item.title)}</h3>
                      <p className="mt-5 text-xs uppercase tracking-[0.24em] text-slate-500">{locale === "pt" ? "Dores que resolve" : "Problems solved"}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{t(locale, item.pain)}</p>
                      <p className="mt-5 text-xs uppercase tracking-[0.24em] text-[var(--accent-copper)]">{locale === "pt" ? "Valor percebido" : "Perceived value"}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-200">{t(locale, item.value)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="relative scroll-mt-28 py-24">
          <div className="absolute inset-x-0 top-0 h-full bg-[url('https://d2xsxph8kpxj0f.cloudfront.net/310519663156393333/6sAjL87Dgs7zQfqq7pYXKz/giselle-hero-atlas-9rA6i749UYThtL9Lh5ZSxA.webp')] bg-cover bg-center opacity-[0.08]" />
          <div className="container relative z-10 grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
            <Card className="rounded-[2.2rem] border-white/8 bg-[rgba(7,17,26,0.82)] text-white backdrop-blur-xl">
              <CardContent className="p-8 sm:p-10">
                <SectionEyebrow>{locale === "pt" ? "Contato" : "Contact"}</SectionEyebrow>
                <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl">{t(locale, contact.title)}</h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">{t(locale, contact.text)}</p>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {contact.links.map((item) => {
                    const enabled = item.available && item.href;
                    if (!enabled) {
                      return (
                        <div key={item.label} className="flex items-center justify-between rounded-[1.4rem] border border-white/6 bg-white/[0.03] px-5 py-4 text-sm text-slate-500">
                          <span>{item.label}</span>
                          <span className="text-[0.68rem] uppercase tracking-[0.2em]">{locale === "pt" ? "Em breve" : "Soon"}</span>
                        </div>
                      );
                    }
                    return (
                      <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} className="group flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white">
                        <span>{item.label}</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    );
                  })}
                </div>

                <div className="mt-10 rounded-[1.7rem] border border-[color:rgba(191,148,103,0.25)] bg-[linear-gradient(135deg,rgba(191,148,103,0.12),rgba(37,167,167,0.04))] p-6">
                  <p className="text-xs uppercase tracking-[0.26em] text-[var(--accent-copper)]">Future-ready prompt</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{placeholderPrompt[locale]}</p>
                </div>

                <div className="mt-8 rounded-[1.7rem] border border-white/8 bg-white/[0.03] p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">LinkedIn</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {locale === "pt"
                      ? "O perfil institucional também pode ser validado pelo selo oficial do LinkedIn, reforçando autoria pública e coerência entre presença acadêmica e executiva."
                      : "The institutional profile can also be validated through the official LinkedIn badge, reinforcing public authorship and coherence between academic and executive presence."}
                  </p>
                  <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-white/8 bg-white px-3 py-5 text-slate-900">
                    <div
                      className="badge-base LI-profile-badge"
                      data-locale={locale === "pt" ? "pt_BR" : "en_US"}
                      data-size="large"
                      data-theme="light"
                      data-type="HORIZONTAL"
                      data-vanity={linkedinBadge.publicIdentifier}
                      data-version="v1"
                    >
                      <a className="badge-base__link LI-simple-link" href={linkedinBadge.profileUrl} target="_blank" rel="noreferrer">
                        {linkedinBadge.displayName}
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="self-start rounded-[2.2rem] border-white/8 bg-white/5 text-white">
              <CardContent className="p-8 sm:p-10">
                <p className="text-xs uppercase tracking-[0.26em] text-slate-400">{locale === "pt" ? "Formulário de contato" : "Contact form"}</p>
                <h3 className="mt-4 font-display text-3xl">{locale === "pt" ? "Captação ativa de leads qualificados" : "Active qualified lead capture"}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {locale === "pt"
                    ? "Este formulário agora registra contatos no projeto e aciona uma notificação interna para acompanhamento. A experiência foi mantida com linguagem institucional, mas já opera com persistência e fluxo real de entrada."
                    : "This form now records contacts inside the project and triggers an internal notification for follow-up. The experience keeps its institutional language while already running on a real persistence workflow."}
                </p>
                <form className="mt-8 space-y-4" onSubmit={handleLeadSubmit}>
                  <Input
                    value={leadForm.name}
                    onChange={handleLeadFieldChange("name")}
                    placeholder={locale === "pt" ? "Nome" : "Name"}
                    className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                    required
                  />
                  <Input
                    type="email"
                    value={leadForm.email}
                    onChange={handleLeadFieldChange("email")}
                    placeholder="E-mail"
                    className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                    required
                  />
                  <Input
                    value={leadForm.organization}
                    onChange={handleLeadFieldChange("organization")}
                    placeholder={locale === "pt" ? "Organização, empresa ou instituição" : "Organization, company, or institution"}
                    className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                  />
                  <Input
                    value={leadForm.interest}
                    onChange={handleLeadFieldChange("interest")}
                    placeholder={locale === "pt" ? "Interesse principal: parceria, consultoria, palestra, projeto" : "Primary interest: partnership, consulting, speaking, project"}
                    className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                  />
                  <Textarea
                    value={leadForm.message}
                    onChange={handleLeadFieldChange("message")}
                    placeholder={locale === "pt" ? "Descreva o contexto do projeto, parceria, convite ou demanda institucional" : "Describe the context of the project, partnership, invitation, or institutional demand"}
                    className="min-h-36 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={submitLeadMutation.isPending}
                    className="w-full rounded-full bg-white text-slate-950 hover:bg-[var(--accent-copper)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Mail className="mr-2 size-4" />
                    {submitLeadMutation.isPending
                      ? locale === "pt"
                        ? "Enviando mensagem..."
                        : "Sending message..."
                      : locale === "pt"
                        ? "Enviar contato e acionar notificação interna"
                        : "Send contact and trigger internal notification"}
                  </Button>
                </form>
                <div className="mt-8 rounded-[1.7rem] border border-white/8 bg-white/[0.03] p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{locale === "pt" ? "Operação" : "Operation"}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {locale === "pt"
                      ? "Cada envio cria um registro persistente de lead com rota, persona, origem e mensagem, permitindo acompanhamento posterior sem perder a sofisticação da interface pública."
                      : "Each submission creates a persistent lead record with route, persona, source, and message, enabling future follow-up without losing the sophistication of the public interface."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 py-8">
        <div className="container flex flex-col gap-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Globe className="size-4" />
            <span>
              {locale === "pt"
                ? "Estrutura bilíngue pronta para expansão, SEO editorial e integração com acervo institucional."
                : "Bilingual structure ready for expansion, editorial SEO, and institutional archive integration."}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Newspaper className="size-4" />
            <span>Giselle Couto Falcão · Portfolio</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
