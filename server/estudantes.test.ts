import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const listarEstudantesVoompMock = vi.fn();
vi.mock("./voompDb", () => ({
  listarEstudantesVoomp: listarEstudantesVoompMock,
  registrarEventoVoomp: vi.fn(),
}));

const contexto = (): TrpcContext => ({
  user: null,
  req: { protocol: "https", headers: {} } as TrpcContext["req"],
  res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
});

describe("academy.estudantes (painel /painel/estudantes)", () => {
  beforeEach(() => {
    vi.resetModules();
    listarEstudantesVoompMock.mockReset();
    process.env.DIGEST_TOKEN = "chave-do-painel";
  });

  it("só entrega os estudantes com a chave do painel", async () => {
    const { appRouter } = await import("./routers");
    const caller = appRouter.createCaller(contexto());
    await expect(caller.academy.estudantes({ token: "errada" })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    expect(listarEstudantesVoompMock).not.toHaveBeenCalled();
  });

  it("devolve inscrições e últimos avisos com a chave certa", async () => {
    listarEstudantesVoompMock.mockResolvedValue({ inscricoes: [], eventos: [], totalEventos: 0, geradoEm: "agora" });
    const { appRouter } = await import("./routers");
    const caller = appRouter.createCaller(contexto());
    await expect(caller.academy.estudantes({ token: "chave-do-painel" })).resolves.toMatchObject({ totalEventos: 0 });
  });
});
