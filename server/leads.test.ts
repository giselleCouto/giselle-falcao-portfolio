import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";
import { NOT_ADMIN_ERR_MSG } from "../shared/const";

const createLeadContactMock = vi.fn();
const listLeadContactsMock = vi.fn();
const notifyOwnerMock = vi.fn();

vi.mock("./db", () => ({
  createLeadContact: createLeadContactMock,
  listLeadContacts: listLeadContactsMock,
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: notifyOwnerMock,
}));

function createContext(role: "admin" | "user" | null = null): TrpcContext {
  return {
    user:
      role === null
        ? null
        : {
            id: 1,
            openId: `${role}-open-id`,
            email: `${role}@example.com`,
            name: role === "admin" ? "Admin User" : "Regular User",
            loginMethod: "manus",
            role,
            createdAt: new Date(),
            updatedAt: new Date(),
            lastSignedIn: new Date(),
          },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as TrpcContext["res"],
  };
}

describe("leads router", () => {
  beforeEach(() => {
    vi.resetModules();
    createLeadContactMock.mockReset();
    listLeadContactsMock.mockReset();
    notifyOwnerMock.mockReset();
  });

  it("persiste o lead normalizado e tenta notificar o proprietário", async () => {
    const { appRouter } = await import("./routers");

    createLeadContactMock.mockResolvedValue({ success: true });
    notifyOwnerMock.mockResolvedValue(true);

    const caller = appRouter.createCaller(createContext());

    const result = await caller.leads.submit({
      route: "/giselle",
      persona: "giselle",
      name: "Giselle Lead",
      email: "lead@example.com",
      organization: "Instituto AIFA",
      interest: "Parceria acadêmica",
      message: "Gostaria de conversar sobre um projeto de IA aplicada à educação.",
      source: "website-contact-form",
    });

    expect(createLeadContactMock).toHaveBeenCalledWith({
      route: "/giselle",
      persona: "giselle",
      name: "Giselle Lead",
      email: "lead@example.com",
      organization: "Instituto AIFA",
      interest: "Parceria acadêmica",
      message: "Gostaria de conversar sobre um projeto de IA aplicada à educação.",
      source: "website-contact-form",
    });
    expect(notifyOwnerMock).toHaveBeenCalledTimes(1);
    expect(notifyOwnerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining("/giselle"),
        content: expect.stringContaining("Instituto AIFA"),
      }),
    );
    expect(result).toEqual({ success: true, notificationSent: true });
  });

  it("normaliza campos opcionais vazios antes de persistir", async () => {
    const { appRouter } = await import("./routers");

    createLeadContactMock.mockResolvedValue({ success: true });
    notifyOwnerMock.mockResolvedValue(false);

    const caller = appRouter.createCaller(createContext());

    const result = await caller.leads.submit({
      route: "/jade",
      persona: "jade",
      name: "Contato Jade",
      email: "jade@example.com",
      organization: "",
      interest: "",
      message: "Tenho interesse em convidar você para uma conversa institucional.",
      source: "website-contact-form",
    });

    expect(createLeadContactMock).toHaveBeenCalledWith({
      route: "/jade",
      persona: "jade",
      name: "Contato Jade",
      email: "jade@example.com",
      organization: null,
      interest: null,
      message: "Tenho interesse em convidar você para uma conversa institucional.",
      source: "website-contact-form",
    });
    expect(result).toEqual({ success: true, notificationSent: false });
  });

  it("permite que administradores listem os leads recebidos", async () => {
    const { appRouter } = await import("./routers");

    const leads = [
      {
        id: 1,
        route: "/giselle",
        persona: "giselle",
        name: "Lead Teste",
        email: "lead@example.com",
        organization: "AIFA",
        interest: "Consultoria",
        message: "Mensagem de teste suficientemente longa.",
        status: "new",
        source: "website-contact-form",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    listLeadContactsMock.mockResolvedValue(leads);

    const caller = appRouter.createCaller(createContext("admin"));
    const result = await caller.leads.list();

    expect(listLeadContactsMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(leads);
  });

  it("bloqueia listagem para usuários não autenticados", async () => {
    const { appRouter } = await import("./routers");

    const caller = appRouter.createCaller(createContext(null));

    await expect(caller.leads.list()).rejects.toMatchObject({
      message: NOT_ADMIN_ERR_MSG,
    });
  });
});
