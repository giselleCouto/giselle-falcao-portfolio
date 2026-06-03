import { describe, expect, it, vi, beforeEach } from "vitest";
import type { TrpcContext } from "./_core/context";

const getCourseAccessForUserMock = vi.fn();
const getUserByIdMock = vi.fn();
const listCourseLessonProgressMock = vi.fn();
const listCourseProgressMock = vi.fn();
const upsertCourseCheckoutMock = vi.fn();
const upsertCourseLessonProgressRecordMock = vi.fn();
const upsertCourseProgressRecordMock = vi.fn();

const createCourseCheckoutSessionMock = vi.fn();
const isFreeModuleMock = vi.fn();

vi.mock("./db", async () => {
  const actual = await vi.importActual<typeof import("./db")>("./db");

  return {
    ...actual,
    getCourseAccessForUser: getCourseAccessForUserMock,
    getUserById: getUserByIdMock,
    listCourseLessonProgress: listCourseLessonProgressMock,
    listCourseProgress: listCourseProgressMock,
    upsertCourseCheckout: upsertCourseCheckoutMock,
    upsertCourseLessonProgressRecord: upsertCourseLessonProgressRecordMock,
    upsertCourseProgressRecord: upsertCourseProgressRecordMock,
  };
});

vi.mock("./coursePayments", () => ({
  COURSE_PRICE_CENTS: 49700,
  COURSE_SLUG: "engenharia-sistemas-ia-generativa",
  COURSE_TITLE: "Engenharia de Sistemas de IA Generativa",
  FREE_MODULE_IDS: ["modulo-0", "modulo-1"],
  createCourseCheckoutSession: createCourseCheckoutSessionMock,
  isFreeModule: isFreeModuleMock,
}));

function createContext(role: "user" | null = null): TrpcContext {
  return {
    user:
      role === null
        ? null
        : {
            id: 7,
            openId: "user-open-id",
            email: "user@example.com",
            name: "Usuária Teste",
            loginMethod: "manus",
            role,
            createdAt: new Date(),
            updatedAt: new Date(),
            lastSignedIn: new Date(),
          },
    req: {
      protocol: "https",
      headers: {
        origin: "https://coutofalcao.com",
        host: "coutofalcao.com",
      },
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as TrpcContext["res"],
  };
}

describe("course router", () => {
  beforeEach(() => {
    vi.resetModules();
    getCourseAccessForUserMock.mockReset();
    getUserByIdMock.mockReset();
    listCourseLessonProgressMock.mockReset();
    listCourseProgressMock.mockReset();
    upsertCourseCheckoutMock.mockReset();
    upsertCourseLessonProgressRecordMock.mockReset();
    upsertCourseProgressRecordMock.mockReset();
    createCourseCheckoutSessionMock.mockReset();
    isFreeModuleMock.mockReset();
  });

  it("retorna status público com apenas os módulos gratuitos para visitantes", async () => {
    const { appRouter } = await import("./routers");

    const caller = appRouter.createCaller(createContext(null));
    const result = await caller.course.status();

    expect(result.authenticated).toBe(false);
    expect(result.hasPaidAccess).toBe(false);
    expect(result.freeModuleIds).toEqual(["modulo-0", "modulo-1"]);
    expect(result.certificateEligible).toBe(false);
    expect(result.certificateUrl).toBe("/api/course/certificate.pdf");
    expect(result.progress).toEqual([]);
  });

  it("cria checkout com origem dinâmica e persiste a sessão pendente", async () => {
    const { appRouter } = await import("./routers");

    getUserByIdMock.mockResolvedValue({
      id: 7,
      email: "user@example.com",
      name: "Usuária Teste",
      stripeCustomerId: "cus_123",
    });
    createCourseCheckoutSessionMock.mockResolvedValue({
      id: "cs_test_123",
      url: "https://checkout.stripe.com/pay/cs_test_123",
    });

    const caller = appRouter.createCaller(createContext("user"));
    const result = await caller.course.createCheckout();

    expect(createCourseCheckoutSessionMock).toHaveBeenCalledWith({
      origin: "https://coutofalcao.com",
      user: {
        id: 7,
        email: "user@example.com",
        name: "Usuária Teste",
        stripeCustomerId: "cus_123",
      },
    });
    expect(upsertCourseCheckoutMock).toHaveBeenCalledWith({
      userId: 7,
      courseSlug: "engenharia-sistemas-ia-generativa",
      stripeCheckoutSessionId: "cs_test_123",
    });
    expect(result).toEqual({
      checkoutUrl: "https://checkout.stripe.com/pay/cs_test_123",
    });
  });

  it("permite registrar progresso em módulo gratuito mesmo sem acesso pago", async () => {
    const { appRouter } = await import("./routers");

    getCourseAccessForUserMock.mockResolvedValue(null);
    listCourseLessonProgressMock.mockResolvedValue([
      { lessonKey: "modulo-0::lesson-0", completed: true },
      { lessonKey: "modulo-0::lesson-1", completed: true },
    ]);
    isFreeModuleMock.mockReturnValue(true);

    const caller = appRouter.createCaller(createContext("user"));
    const result = await caller.course.progress({
      moduleId: "modulo-0",
      lessonKey: "modulo-0::lesson-0",
      lessonTitle: "O problema que origina tudo",
      completed: true,
      practiceCompleted: true,
    });

    expect(upsertCourseLessonProgressRecordMock).toHaveBeenCalledWith({
      userId: 7,
      courseSlug: "engenharia-sistemas-ia-generativa",
      moduleId: "modulo-0",
      lessonKey: "modulo-0::lesson-0",
      lessonTitle: "O problema que origina tudo",
      completed: true,
    });
    expect(upsertCourseProgressRecordMock).toHaveBeenCalledWith({
      userId: 7,
      courseSlug: "engenharia-sistemas-ia-generativa",
      moduleId: "modulo-0",
      lessonKey: "modulo-0::lesson-0",
      lessonTitle: "O problema que origina tudo",
      completed: false,
      practiceCompleted: true,
    });
    expect(result).toEqual({
      success: true,
      certificateEligible: false,
      certificateUrl: "/api/course/certificate.pdf",
    });
  });

  it("sinaliza certificado pronto quando o último módulo concluído completa a trilha", async () => {
    const { appRouter } = await import("./routers");

    getCourseAccessForUserMock.mockResolvedValue({
      status: "active",
    });
    listCourseLessonProgressMock.mockResolvedValue([
      { lessonKey: "modulo-0::lesson-0", completed: true },
      { lessonKey: "modulo-0::lesson-1", completed: true },
      { lessonKey: "modulo-0::lesson-2", completed: true },
      { lessonKey: "modulo-1::lesson-0", completed: true },
      { lessonKey: "modulo-1::lesson-1", completed: true },
      { lessonKey: "modulo-1::lesson-2", completed: true },
      { lessonKey: "modulo-2::lesson-0", completed: true },
      { lessonKey: "modulo-2::lesson-1", completed: true },
      { lessonKey: "modulo-2::lesson-2", completed: true },
      { lessonKey: "modulo-3::lesson-0", completed: true },
      { lessonKey: "modulo-3::lesson-1", completed: true },
      { lessonKey: "modulo-3::lesson-2", completed: true },
      { lessonKey: "modulo-4::lesson-0", completed: true },
      { lessonKey: "modulo-4::lesson-1", completed: true },
      { lessonKey: "modulo-4::lesson-2", completed: true },
      { lessonKey: "modulo-5::lesson-0", completed: true },
      { lessonKey: "modulo-5::lesson-1", completed: true },
      { lessonKey: "modulo-5::lesson-2", completed: true },
      { lessonKey: "modulo-6::lesson-0", completed: true },
      { lessonKey: "modulo-6::lesson-1", completed: true },
      { lessonKey: "modulo-6::lesson-2", completed: true },
      { lessonKey: "modulo-7::lesson-0", completed: true },
      { lessonKey: "modulo-7::lesson-1", completed: true },
      { lessonKey: "modulo-7::lesson-2", completed: true },
      { lessonKey: "modulo-8::lesson-0", completed: true },
      { lessonKey: "modulo-8::lesson-1", completed: true },
      { lessonKey: "modulo-8::lesson-2", completed: true },
      { lessonKey: "modulo-8::lesson-3", completed: true },
    ]);
    isFreeModuleMock.mockReturnValue(false);

    const caller = appRouter.createCaller(createContext("user"));
    const result = await caller.course.progress({
      moduleId: "modulo-8",
      lessonKey: "modulo-8::lesson-3",
      lessonTitle: "Segurança, governança e desenho de integração",
      completed: true,
      practiceCompleted: true,
    });

    expect(result).toEqual({
      success: true,
      certificateEligible: true,
      certificateUrl: "/api/course/certificate.pdf",
    });
  });

  it("bloqueia progresso em módulo pago quando o acesso ainda não foi liberado", async () => {
    const { appRouter } = await import("./routers");

    getCourseAccessForUserMock.mockResolvedValue({
      status: "pending",
    });
    isFreeModuleMock.mockReturnValue(false);

    const caller = appRouter.createCaller(createContext("user"));

    await expect(
      caller.course.progress({
        moduleId: "modulo-4",
        lessonKey: "modulo-4::lesson-1",
        lessonTitle: "Sampling, temperatura e controle",
        completed: true,
      }),
    ).rejects.toThrow("Purchase required to record progress in paid modules");
  });
});
