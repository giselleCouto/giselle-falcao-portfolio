import { describe, expect, it } from "vitest";
import { courseModules } from "./courseData";
import { buildCourseDashboard, resolveCheckoutFeedback } from "./courseExperience";

describe("courseExperience", () => {
  it("mostra estado pendente quando o retorno do checkout ainda não resultou em acesso liberado", () => {
    const feedback = resolveCheckoutFeedback({
      search: "?checkout=success&session_id=cs_test_123",
      accessStatus: "pending",
      hasPaidAccess: false,
    });

    expect(feedback).toEqual({
      tone: "pending",
      title: "Pagamento em análise",
      description:
        "Compras por PIX podem levar alguns instantes para confirmação final. Assim que o pagamento for reconhecido, o acesso integral será liberado automaticamente.",
    });
  });

  it("mostra estado liberado quando o acesso já está ativo", () => {
    const feedback = resolveCheckoutFeedback({
      search: "?checkout=success",
      accessStatus: "active",
      hasPaidAccess: true,
    });

    expect(feedback?.tone).toBe("success");
    expect(feedback?.title).toBe("Acesso liberado com sucesso");
  });

  it("resume o dashboard do aluno com próxima etapa e última atividade", () => {
    const dashboard = buildCourseDashboard({
      modules: courseModules,
      hasPaidAccess: true,
      isAuthenticated: true,
      certificateEligible: false,
      progress: [
        {
          moduleId: "modulo-1",
          lessonKey: "modulo-1::lesson-1",
          lessonTitle: "Modelagem do chunking",
          completed: true,
          practiceCompleted: true,
          lastVisitedAt: new Date("2026-06-02T20:00:00Z"),
        },
        {
          moduleId: "modulo-0",
          lessonKey: "modulo-0::lesson-0",
          lessonTitle: "A matemática mínima",
          completed: true,
          practiceCompleted: false,
          lastVisitedAt: new Date("2026-06-01T20:00:00Z"),
        },
      ],
    });

    expect(dashboard.completedCount).toBe(2);
    expect(dashboard.latestModule?.id).toBe("modulo-1");
    expect(dashboard.latestProgress?.lessonKey).toBe("modulo-1::lesson-1");
    expect(dashboard.nextModule?.id).toBe("modulo-2");
    expect(dashboard.progressPercent).toBeGreaterThan(0);
    expect(dashboard.certificateReady).toBe(false);
  });

  it("marca o certificado como pronto quando a elegibilidade já foi liberada", () => {
    const dashboard = buildCourseDashboard({
      modules: courseModules,
      hasPaidAccess: true,
      isAuthenticated: true,
      certificateEligible: true,
      progress: courseModules.map((module, index) => ({
        moduleId: module.id,
        lessonKey: `${module.id}::lesson-2`,
        lessonTitle: module.lessons[module.lessons.length - 1]?.title ?? `Aula ${index + 1}`,
        completed: true,
        practiceCompleted: true,
        lastVisitedAt: new Date(`2026-06-${String(index + 1).padStart(2, "0")}T20:00:00Z`),
      })),
    });

    expect(dashboard.completedCount).toBe(courseModules.length);
    expect(dashboard.progressPercent).toBe(100);
    expect(dashboard.certificateReady).toBe(true);
  });
});
