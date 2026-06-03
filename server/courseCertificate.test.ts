import { Buffer } from "node:buffer";
import { beforeEach, describe, expect, it, vi } from "vitest";

const authenticateRequestMock = vi.fn();
const listCourseLessonProgressMock = vi.fn();

vi.mock("./_core/sdk", () => ({
  sdk: {
    authenticateRequest: authenticateRequestMock,
  },
}));

vi.mock("./db", async () => {
  const actual = await vi.importActual<typeof import("./db")>("./db");

  return {
    ...actual,
    listCourseLessonProgress: listCourseLessonProgressMock,
  };
});

describe("course certificate route", () => {
  beforeEach(() => {
    authenticateRequestMock.mockReset();
    listCourseLessonProgressMock.mockReset();
  });

  it("retorna 401 quando o usuário não está autenticado", async () => {
    const { handleCourseCertificateRequest } = await import("./courseCertificate");

    authenticateRequestMock.mockRejectedValue(new Error("invalid session"));

    const res = createMockResponse();
    await handleCourseCertificateRequest({ headers: {} } as never, res as never);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "unauthorized",
      message: "Faça login para acessar seu certificado.",
    });
  });

  it("retorna 403 quando ainda faltam aulas para concluir a trilha", async () => {
    const { handleCourseCertificateRequest } = await import("./courseCertificate");

    authenticateRequestMock.mockResolvedValue({
      id: 7,
      name: "Usuária Teste",
    });
    listCourseLessonProgressMock.mockResolvedValue([
      { lessonKey: "modulo-0::lesson-0", completed: true, lastVisitedAt: new Date("2026-06-03T10:00:00Z") },
      { lessonKey: "modulo-0::lesson-1", completed: true, lastVisitedAt: new Date("2026-06-03T10:05:00Z") },
    ]);

    const res = createMockResponse();
    await handleCourseCertificateRequest({ headers: {} } as never, res as never);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "certificate_not_ready",
      message: "Conclua todas as aulas da trilha para liberar o certificado em PDF.",
    });
  });

  it("retorna um PDF válido quando todas as aulas já foram concluídas", async () => {
    const { COURSE_LESSON_KEYS, handleCourseCertificateRequest } = await import("./courseCertificate");

    authenticateRequestMock.mockResolvedValue({
      id: 7,
      name: "Usuária Teste",
    });
    listCourseLessonProgressMock.mockResolvedValue(
      COURSE_LESSON_KEYS.map((lessonKey, index) => ({
        lessonKey,
        completed: true,
        lastVisitedAt: new Date(`2026-06-${String((index % 9) + 1).padStart(2, "0")}T10:00:00Z`),
      })),
    );

    const res = createMockResponse();
    await handleCourseCertificateRequest({ headers: {} } as never, res as never);

    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/pdf");
    expect(res.send).toHaveBeenCalledTimes(1);

    const payload = res.send.mock.calls[0]?.[0];
    expect(Buffer.isBuffer(payload)).toBe(true);
    expect(payload.subarray(0, 4).toString()).toBe("%PDF");
  });
});

function createMockResponse() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
    setHeader: vi.fn(),
  };
}
