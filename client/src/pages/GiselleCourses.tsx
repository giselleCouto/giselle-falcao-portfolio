import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowRight, CheckCircle2, ChevronRight, CirclePlay, LockKeyhole, QrCode, Rocket, Sparkles, TimerReset } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import {
  audienceCards,
  conversionHighlights,
  courseHero,
  courseModules,
  faqItems,
  freeModuleCount,
  logoAssetPath,
  paidPriceFormatted,
  practiceScenarios,
  pricingCard,
  socialCta,
  urgencyCard,
} from "@/lib/courseData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type GiselleCoursesProps = {
  view?: "overview" | "checkout" | "lab";
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-fuchsia-200">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
      {children}
    </div>
  );
}

export default function GiselleCourses({ view = "overview" }: GiselleCoursesProps) {
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [activeModuleId, setActiveModuleId] = useState(courseModules[0]?.id ?? "modulo-0");
  const [chunkSize, setChunkSize] = useState(780);
  const [overlap, setOverlap] = useState(110);
  const [topK, setTopK] = useState(4);
  const [temperature, setTemperature] = useState(0.3);

  const statusQuery = trpc.course.status.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: true,
  });

  const checkoutMutation = trpc.course.createCheckout.useMutation({
    onSuccess: ({ checkoutUrl }) => {
      if (!checkoutUrl) {
        toast.error("O checkout não retornou um link válido. Tente novamente em instantes.");
        return;
      }

      toast.success("Abrindo checkout seguro para liberar os módulos avançados.");
      window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    },
    onError: () => {
      toast.error("Não foi possível iniciar o checkout agora. Tente novamente em instantes.");
    },
  });

  const progressMutation = trpc.course.progress.useMutation({
    onSuccess: () => {
      toast.success("Seu avanço no curso foi registrado.");
      statusQuery.refetch();
    },
    onError: () => {
      toast.error("Não foi possível salvar seu progresso agora.");
    },
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const checkoutState = params.get("checkout");

    if (checkoutState === "success") {
      toast.success("Pagamento recebido. Atualize ou continue navegando para ver os módulos liberados.");
      params.delete("checkout");
      params.delete("session_id");
      const query = params.toString();
      window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
      statusQuery.refetch();
    }

    if (checkoutState === "cancelled") {
      toast.message("Checkout cancelado. Os módulos gratuitos continuam disponíveis.");
      params.delete("checkout");
      const query = params.toString();
      window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
    }
  }, [statusQuery]);

  const unlockedModuleIds = useMemo(() => {
    const free = new Set(statusQuery.data?.freeModuleIds ?? courseModules.filter((item) => item.free).map((item) => item.id));
    if (statusQuery.data?.hasPaidAccess) {
      courseModules.forEach((item) => free.add(item.id));
    }
    return free;
  }, [statusQuery.data]);

  const activeModule = useMemo(
    () => courseModules.find((item) => item.id === activeModuleId) ?? courseModules[0],
    [activeModuleId],
  );

  const completedModules = statusQuery.data?.progress.filter((item) => item.completed).length ?? 0;
  const progressPercent = Math.round((completedModules / courseModules.length) * 100);

  const moduleUnlocked = activeModule ? unlockedModuleIds.has(activeModule.id) : false;
  const practiceSignal = useMemo(() => {
    const chunkPenalty = Math.abs(780 - chunkSize) / 8;
    const overlapPenalty = Math.abs(110 - overlap) / 4;
    const topKPenalty = Math.abs(4 - topK) * 8;
    const tempPenalty = Math.abs(0.3 - temperature) * 70;
    const rawScore = 100 - chunkPenalty - overlapPenalty - topKPenalty - tempPenalty;
    const score = Math.max(28, Math.min(98, Math.round(rawScore)));
    const quality = score >= 84 ? "Alta fidelidade" : score >= 67 ? "Equilíbrio aceitável" : "Risco de deriva";
    const guidance =
      score >= 84
        ? "Boa relação entre contexto recuperado, estabilidade de resposta e custo estimado."
        : score >= 67
          ? "O pipeline está funcional, mas ainda há margem para reduzir ruído e redundância."
          : "Os parâmetros escolhidos tendem a aumentar inconsistência, custo desnecessário ou perda de contexto.";

    return { score, quality, guidance };
  }, [chunkSize, overlap, topK, temperature]);

  const handleStartCheckout = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    checkoutMutation.mutate();
  };

  const handleMarkModule = (practiceCompleted = false) => {
    if (!activeModule) return;

    if (!isAuthenticated) {
      toast.message("Faça login para salvar seu progresso e retomar o curso de onde parou.");
      window.location.href = getLoginUrl();
      return;
    }

    progressMutation.mutate({
      moduleId: activeModule.id,
      lessonTitle: activeModule.lessons[0]?.title,
      completed: true,
      practiceCompleted,
    });
  };

  const pageIntro =
    view === "checkout"
      ? "Checkout, acesso e destravamento"
      : view === "lab"
        ? "Ambiente visual de prática"
        : "Trilha completa do curso";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#050816_0%,#090c1b_38%,#080f18_100%)] text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(217,70,239,0.18),_transparent_26%),radial-gradient(circle_at_84%_16%,_rgba(34,211,238,0.18),_transparent_22%),linear-gradient(180deg,rgba(3,7,18,0.7),rgba(5,8,22,0.92))]" />
        <div className="grid-overlay absolute inset-0 opacity-35" />
      </div>

      <section className="relative container py-8 sm:py-10 lg:py-12">
        <header className="flex flex-col gap-6 border-b border-white/8 pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-4xl">
            <SectionTag>{pageIntro}</SectionTag>
            <h1 className="mt-5 font-display text-4xl leading-[0.96] text-white sm:text-5xl lg:text-6xl">
              {courseHero.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{courseHero.subtitle}</p>
          </div>

          <nav className="flex flex-wrap items-center gap-3">
            <Link href="/giselle" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10">
              Voltar ao portfólio
            </Link>
            <Link href="/giselle/cursos/lab" className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-400/20">
              Ambiente de prática
            </Link>
            <Link href="/giselle/cursos/checkout" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-fuchsia-200">
              Checkout e acesso
            </Link>
          </nav>
        </header>

        <div className="grid gap-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="rounded-full border-0 bg-fuchsia-500/20 px-3 py-1 text-fuchsia-100">{freeModuleCount} módulos gratuitos</Badge>
              <Badge className="rounded-full border-0 bg-cyan-500/20 px-3 py-1 text-cyan-100">Destravamento com PIX</Badge>
              <Badge className="rounded-full border-0 bg-amber-500/20 px-3 py-1 text-amber-100">Projeto final + validação</Badge>
            </div>

            <div className="mt-8 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{courseHero.eyebrow}</p>
                <p className="mt-4 text-base leading-8 text-slate-300">{courseHero.tagline}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#modulos" className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-fuchsia-200">
                    {courseHero.primaryCta}
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                  <Link href="/giselle/cursos/lab" className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    {courseHero.secondaryCta}
                    <ChevronRight className="ml-2 size-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-white/10 bg-[#060914] px-6 py-7 text-center shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                <img src={logoAssetPath} alt="Logo Giselle Falcão" className="mx-auto h-auto w-full max-w-[280px]" />
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {courseHero.socialProof.map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5 text-sm leading-7 text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.08 }} className="space-y-6">
            <Card className="rounded-[2rem] border-white/10 bg-[linear-gradient(180deg,rgba(20,12,38,0.88),rgba(8,13,25,0.96))] text-white backdrop-blur-xl">
              <CardContent className="p-7 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-fuchsia-200">Destravamento integral</p>
                    <h2 className="mt-4 font-display text-3xl text-white">{pricingCard.price}</h2>
                  </div>
                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3 text-cyan-100">
                    <QrCode className="size-6" />
                  </div>
                </div>
                <p className="mt-5 text-base leading-8 text-slate-300">{pricingCard.description}</p>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-200">
                  {pricingCard.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 size-4 text-cyan-300" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm leading-7 text-slate-400">{pricingCard.paymentCopy}</p>
                <Button onClick={handleStartCheckout} disabled={checkoutMutation.isPending} className="mt-7 w-full rounded-full bg-white text-slate-950 hover:bg-fuchsia-200">
                  {isAuthenticated ? "Liberar módulos pagos via PIX" : "Entrar para continuar o curso"}
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-white/10 bg-white/[0.04] text-white backdrop-blur-xl">
              <CardContent className="p-7 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-400">Seu progresso</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">
                      {statusQuery.data?.hasPaidAccess ? "Acesso completo liberado" : `${freeModuleCount} módulos disponíveis agora`}
                    </h3>
                  </div>
                  <Rocket className="size-6 text-fuchsia-300" />
                </div>
                <Progress value={progressPercent} className="mt-6 h-2 bg-white/10" />
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {completedModules} de {courseModules.length} módulos marcados como concluídos.
                  {user ? ` Sessão de estudo vinculada a ${user.name ?? user.email ?? "sua conta"}.` : " Faça login para salvar o avanço e retomar do ponto exato em que parou."}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <section className="grid gap-5 lg:grid-cols-3">
          {conversionHighlights.map((item) => (
            <Card key={item.title} className="rounded-[1.8rem] border-white/10 bg-white/[0.04] text-white backdrop-blur-xl">
              <CardContent className="p-6">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-cyan-200">Por que este curso</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section id="modulos" className="grid gap-6 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
          <div className="space-y-4">
            {courseModules.map((module) => {
              const isUnlocked = unlockedModuleIds.has(module.id);
              const isActive = module.id === activeModuleId;
              const progressEntry = statusQuery.data?.progress.find((item) => item.moduleId === module.id);
              return (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => setActiveModuleId(module.id)}
                  className={cn(
                    "w-full rounded-[1.8rem] border px-6 py-5 text-left transition duration-300",
                    isActive
                      ? "border-fuchsia-300/40 bg-[linear-gradient(180deg,rgba(123,54,176,0.18),rgba(11,16,27,0.9))] shadow-[0_24px_70px_rgba(0,0,0,0.32)]"
                      : "border-white/8 bg-white/[0.03] hover:border-cyan-300/25 hover:bg-white/[0.05]",
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-400">Módulo {module.order}</p>
                      <h3 className="mt-3 text-xl font-semibold text-white">{module.title}</h3>
                    </div>
                    <Badge className={cn("rounded-full border-0 px-3 py-1", module.free ? "bg-emerald-500/20 text-emerald-100" : isUnlocked ? "bg-cyan-500/20 text-cyan-100" : "bg-white/10 text-slate-300")}>{module.free ? "Gratuito" : isUnlocked ? "Liberado" : "Pago"}</Badge>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{module.subtitle}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-slate-400">
                    <span>{module.duration}</span>
                    <span>•</span>
                    <span>{module.level}</span>
                    {progressEntry?.completed ? (
                      <>
                        <span>•</span>
                        <span className="text-cyan-200">Concluído</span>
                      </>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>

          {activeModule ? (
            <div className="rounded-[2rem] border border-white/10 bg-[rgba(8,14,25,0.86)] p-7 shadow-[0_35px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-9">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={cn("rounded-full border-0 px-3 py-1", activeModule.free ? "bg-emerald-500/20 text-emerald-100" : moduleUnlocked ? "bg-cyan-500/20 text-cyan-100" : "bg-white/10 text-slate-300")}>{activeModule.free ? "Acesso imediato" : moduleUnlocked ? "Módulo liberado" : `Pago · ${paidPriceFormatted}`}</Badge>
                <Badge className="rounded-full border-0 bg-fuchsia-500/15 px-3 py-1 text-fuchsia-100">{activeModule.duration}</Badge>
              </div>

              <h3 className="mt-5 font-display text-4xl leading-tight text-white">{activeModule.title}</h3>
              <p className="mt-5 text-lg leading-8 text-slate-300">{activeModule.hook}</p>
              <p className="mt-5 text-base leading-8 text-slate-300">{activeModule.summary}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {activeModule.outcomes.map((outcome) => (
                  <div key={outcome} className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-5 py-5 text-sm leading-7 text-slate-200">
                    {outcome}
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[1.6rem] border border-white/8 bg-black/20 p-6">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-400">Aulas centrais</p>
                  <div className="mt-5 space-y-4">
                    {activeModule.lessons.map((lesson) => (
                      <div key={lesson.title} className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-medium text-white">{lesson.title}</p>
                          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">{lesson.duration}</span>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-slate-300">{lesson.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(16,30,43,0.82),rgba(10,12,23,0.92))] p-6">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-cyan-200">Prática guiada</p>
                  <h4 className="mt-4 text-2xl font-semibold text-white">{activeModule.practice.title}</h4>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{activeModule.practice.scenario}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-200"><span className="font-semibold text-white">Desafio:</span> {activeModule.practice.challenge}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-200"><span className="font-semibold text-white">Entrega esperada:</span> {activeModule.practice.deliverable}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {moduleUnlocked ? (
                  <>
                    <Button onClick={() => handleMarkModule(false)} disabled={progressMutation.isPending} className="rounded-full bg-white px-5 text-slate-950 hover:bg-fuchsia-200">
                      <CirclePlay className="mr-2 size-4" />
                      Marcar módulo como estudado
                    </Button>
                    <Button onClick={() => handleMarkModule(true)} disabled={progressMutation.isPending} variant="outline" className="rounded-full border-cyan-300/20 bg-transparent text-cyan-100 hover:bg-cyan-400/10">
                      <Sparkles className="mr-2 size-4" />
                      Registrar prática concluída
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleStartCheckout} disabled={checkoutMutation.isPending} className="rounded-full bg-white px-5 text-slate-950 hover:bg-fuchsia-200">
                    <LockKeyhole className="mr-2 size-4" />
                    Continuar com PIX e liberar este módulo
                  </Button>
                )}
              </div>
            </div>
          ) : null}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[rgba(8,13,24,0.88)] p-7 backdrop-blur-xl sm:p-9">
            <SectionTag>Ambiente visual de prática</SectionTag>
            <h2 className="mt-5 font-display text-4xl leading-tight text-white sm:text-5xl">Simule decisões de arquitetura e veja o impacto na qualidade do sistema</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
              O laboratório visual foi desenhado para transformar conceitos abstratos em sensação operacional. Ajuste parâmetros, observe o impacto na fidelidade esperada e use o ambiente como ensaio mental para arquiteturas reais.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="space-y-5 rounded-[1.7rem] border border-white/8 bg-black/20 p-5">
                <label className="block text-sm font-medium text-slate-100">
                  Chunk size: <span className="text-cyan-200">{chunkSize} tokens</span>
                  <input type="range" min={280} max={1400} step={20} value={chunkSize} onChange={(event) => setChunkSize(Number(event.target.value))} className="mt-3 w-full accent-fuchsia-400" />
                </label>
                <label className="block text-sm font-medium text-slate-100">
                  Overlap: <span className="text-cyan-200">{overlap} tokens</span>
                  <input type="range" min={0} max={260} step={10} value={overlap} onChange={(event) => setOverlap(Number(event.target.value))} className="mt-3 w-full accent-cyan-400" />
                </label>
                <label className="block text-sm font-medium text-slate-100">
                  Top-k: <span className="text-cyan-200">{topK} documentos</span>
                  <input type="range" min={1} max={10} step={1} value={topK} onChange={(event) => setTopK(Number(event.target.value))} className="mt-3 w-full accent-amber-400" />
                </label>
                <label className="block text-sm font-medium text-slate-100">
                  Temperatura: <span className="text-cyan-200">{temperature.toFixed(1)}</span>
                  <input type="range" min={0} max={1} step={0.1} value={temperature} onChange={(event) => setTemperature(Number(event.target.value))} className="mt-3 w-full accent-emerald-400" />
                </label>
              </div>

              <div className="rounded-[1.7rem] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(12,30,42,0.75),rgba(15,11,26,0.88))] p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-cyan-200">Leitura automática do pipeline</p>
                    <h3 className="mt-3 text-3xl font-semibold text-white">{practiceSignal.score}% · {practiceSignal.quality}</h3>
                  </div>
                  <TimerReset className="size-6 text-fuchsia-300" />
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-300">{practiceSignal.guidance}</p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {practiceScenarios.map((item) => (
                    <div key={item.title} className="rounded-[1.2rem] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-slate-200 first:sm:col-span-2">
                      <p className="font-medium text-white">{item.title}</p>
                      <p className="mt-2">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="rounded-[2rem] border-white/10 bg-white/[0.05] text-white backdrop-blur-xl">
              <CardContent className="p-7 sm:p-8">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-400">Para quem foi desenhado</p>
                <div className="mt-5 space-y-4">
                  {audienceCards.map((item) => (
                    <div key={item.title} className="rounded-[1.3rem] border border-white/8 bg-black/20 px-5 py-5">
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border border-fuchsia-300/15 bg-[linear-gradient(180deg,rgba(63,18,98,0.22),rgba(9,12,22,0.94))] text-white backdrop-blur-xl">
              <CardContent className="p-7 sm:p-8">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-fuchsia-200">Conversão sem ruptura de valor</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">{urgencyCard.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{urgencyCard.text}</p>
                <Button onClick={handleStartCheckout} disabled={checkoutMutation.isPending} className="mt-6 rounded-full bg-white text-slate-950 hover:bg-fuchsia-200">
                  Desbloquear agora por {paidPriceFormatted}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl sm:p-9">
            <SectionTag>FAQ e continuidade</SectionTag>
            <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.9fr] lg:items-start">
              <div>
                <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl">{socialCta.headline}</h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">{socialCta.support}</p>
              </div>
              <div className="rounded-[1.6rem] border border-white/8 bg-black/20 p-6">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-400">Perguntas frequentes</p>
                <div className="mt-5 space-y-4">
                  {faqItems.map((item) => (
                    <div key={item.question} className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                      <p className="text-sm font-medium text-white">{item.question}</p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/8 pb-10 pt-8 text-sm text-slate-400">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-medium text-slate-200">Giselle Falcão · Área de cursos</p>
              <p className="mt-2 max-w-2xl leading-7">Página atual: <span className="text-slate-200">{location}</span>. O percurso gratuito introduz os fundamentos; o checkout libera a trilha completa, o ambiente de prática e a retomada autenticada.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/giselle/cursos" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white transition hover:bg-white/10">
                Visão geral do curso
              </Link>
              <Link href="/giselle/cursos/lab" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white transition hover:bg-white/10">
                Laboratório visual
              </Link>
              <Link href="/giselle/cursos/checkout" className="rounded-full bg-white px-4 py-2 text-slate-950 transition hover:bg-fuchsia-200">
                Ir para checkout
              </Link>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
