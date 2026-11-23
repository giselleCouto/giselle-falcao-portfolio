import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const listarEstudantesVoompMock = vi.fn();
const obterEstudanteMock = vi.fn();
const atualizarAcademicoMock = vi.fn();
const importarProgressoMock = vi.fn();
const documentosCompletosMock = vi.fn();
vi.mock("./voompDb", () => ({
  listarEstudantesVoomp: listarEstudantesVoompMock,
  registrarEventoVoomp: vi.fn(),
  obterEstudante: obterEstudanteMock,
  atualizarAcademico: atualizarAcademicoMock,
  importarProgresso: importarProgressoMock,
  documentosCompletos: documentosCompletosMock,
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

  it("cartão, edição, importação e CPF completo também exigem a chave", async () => {
    const { appRouter } = await import("./routers");
    const caller = appRouter.createCaller(contexto());
    const errada = "errada";
    await expect(caller.academy.estudante({ token: errada, inscricaoId: 1 })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    await expect(caller.academy.atualizarEstudante({ token: errada, inscricaoId: 1, ra: "1" })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    await expect(
      caller.academy.importarProgresso({ token: errada, productId: "17779", cabecalhos: ["email"], linhas: [], simular: true })
    ).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    await expect(caller.academy.documentosEstudantes({ token: errada, ids: [1] })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    expect(obterEstudanteMock).not.toHaveBeenCalled();
    expect(atualizarAcademicoMock).not.toHaveBeenCalled();
    expect(importarProgressoMock).not.toHaveBeenCalled();
    expect(documentosCompletosMock).not.toHaveBeenCalled();
  });

  it("com a chave certa: abre o cartão e grava a edição sem passar a chave adiante", async () => {
    obterEstudanteMock.mockResolvedValue({ encontrado: true, inscricao: { id: 1 }, academico: null, eventos: [] });
    atualizarAcademicoMock.mockResolvedValue({ ok: true, academico: { inscricaoId: 1, ra: "RA1" } });
    const { appRouter } = await import("./routers");
    const caller = appRouter.createCaller(contexto());
    await expect(caller.academy.estudante({ token: "chave-do-painel", inscricaoId: 1 })).resolves.toMatchObject({ encontrado: true });
    await caller.academy.atualizarEstudante({ token: "chave-do-painel", inscricaoId: 1, ra: "RA1", progressoPct: 40 });
    expect(atualizarAcademicoMock).toHaveBeenCalledWith(1, { ra: "RA1", progressoPct: 40 });
    obterEstudanteMock.mockResolvedValue({ encontrado: false });
    await expect(caller.academy.estudante({ token: "chave-do-painel", inscricaoId: 99 })).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
});
