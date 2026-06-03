import type { CourseModule } from "./courseData";

export type CourseAccessStatus = "pending" | "active" | "canceled" | null;

export type CourseProgressEntry = {
  moduleId: string;
  lessonKey?: string | null;
  lessonTitle: string | null;
  completed: boolean;
  practiceCompleted: boolean;
  lastVisitedAt: Date | number | string;
};

export type CheckoutFeedback = {
  tone: "success" | "pending" | "cancelled";
  title: string;
  description: string;
};

export function resolveCheckoutFeedback(input: {
  search: string;
  accessStatus: CourseAccessStatus;
  hasPaidAccess: boolean;
}): CheckoutFeedback | null {
  const params = new URLSearchParams(input.search);
  const checkoutState = params.get("checkout");

  if (checkoutState === "cancelled") {
    return {
      tone: "cancelled",
      title: "Checkout cancelado",
      description:
        "Os módulos gratuitos continuam disponíveis. Quando quiser, você pode retomar o pagamento e liberar a trilha completa com PIX.",
    };
  }

  if (checkoutState === "success" && input.hasPaidAccess) {
    return {
      tone: "success",
      title: "Acesso liberado com sucesso",
      description:
        "Pagamento confirmado e módulos avançados desbloqueados. Você já pode continuar a trilha completa e registrar progresso normalmente.",
    };
  }

  if (checkoutState === "success" || input.accessStatus === "pending") {
    return {
      tone: "pending",
      title: "Pagamento em análise",
      description:
        "Compras por PIX podem levar alguns instantes para confirmação final. Assim que o pagamento for reconhecido, o acesso integral será liberado automaticamente.",
    };
  }

  if (input.accessStatus === "active") {
    return {
      tone: "success",
      title: "Acesso integral ativo",
      description:
        "Sua compra já foi reconhecida e a trilha completa está disponível com continuidade autenticada, prática e histórico salvo.",
    };
  }

  return null;
}

export function buildCourseDashboard(input: {
  modules: CourseModule[];
  progress: CourseProgressEntry[];
  hasPaidAccess: boolean;
  isAuthenticated: boolean;
}) {
  const completedModuleIds = new Set(input.progress.filter((entry) => entry.completed).map((entry) => entry.moduleId));
  const latestProgress = input.progress[0] ?? null;
  const latestModule = latestProgress ? input.modules.find((module) => module.id === latestProgress.moduleId) ?? null : null;

  const nextModule =
    input.modules.find((module) => {
      const unlocked = module.free || input.hasPaidAccess;
      return unlocked && !completedModuleIds.has(module.id);
    }) ?? (input.hasPaidAccess ? input.modules[input.modules.length - 1] ?? null : input.modules.find((module) => module.free) ?? null);

  const accessibleModules = input.modules.filter((module) => module.free || input.hasPaidAccess).length;
  const completedCount = completedModuleIds.size;
  const progressPercent = input.modules.length > 0 ? Math.round((completedCount / input.modules.length) * 100) : 0;

  return {
    latestProgress,
    latestModule,
    nextModule,
    accessibleModules,
    completedCount,
    progressPercent,
    emptyState:
      !input.isAuthenticated
        ? "Faça login para salvar seu histórico, acompanhar aulas concluídas e retomar exatamente do último ponto estudado."
        : input.progress.length === 0
          ? "Você ainda não registrou progresso. Comece pelos módulos gratuitos e salve seu avanço conforme conclui cada etapa."
          : null,
  };
}
