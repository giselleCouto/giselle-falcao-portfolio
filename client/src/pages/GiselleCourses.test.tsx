// @vitest-environment jsdom

import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GiselleCourses from "./GiselleCourses";

const refetchMock = vi.fn();
const checkoutMutateMock = vi.fn();
const progressMutateMock = vi.fn();

vi.mock("wouter", () => ({
  Link: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
  useLocation: () => ["/giselle/cursos/meus-cursos", vi.fn()],
}));

vi.mock("@/_core/hooks/useAuth", () => ({
  useAuth: () => ({
    user: { id: 7, name: "Giselle Falcão", email: "giselle@example.com" },
    isAuthenticated: true,
  }),
}));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    course: {
      status: {
        useQuery: () => ({
          data: {
            hasPaidAccess: true,
            accessStatus: "active",
            freeModuleIds: ["modulo-0", "modulo-1"],
            progress: [
              {
                id: 11,
                userId: 7,
                courseSlug: "engenharia-sistemas-ia-generativa",
                moduleId: "modulo-1",
                lessonKey: "modulo-1::lesson-1",
                lessonTitle: "Ferramentas da camada de extração",
                practiceCompleted: false,
                completed: true,
                lastVisitedAt: new Date("2026-06-02T20:00:00Z"),
                createdAt: new Date("2026-06-02T20:00:00Z"),
                updatedAt: new Date("2026-06-02T20:00:00Z"),
              },
            ],
          },
          refetch: refetchMock,
        }),
      },
      createCheckout: {
        useMutation: () => ({
          mutate: checkoutMutateMock,
          isPending: false,
        }),
      },
      progress: {
        useMutation: () => ({
          mutate: progressMutateMock,
          isPending: false,
        }),
      },
    },
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    message: vi.fn(),
  },
}));

describe("GiselleCourses resume by lesson", () => {
  beforeEach(() => {
    refetchMock.mockReset();
    checkoutMutateMock.mockReset();
    progressMutateMock.mockReset();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("reabre o módulo correto e destaca a aula específica ao retomar a partir do último progresso", async () => {
    const user = userEvent.setup();
    render(<GiselleCourses view="dashboard" />);

    expect(await screen.findByText("Última aula registrada: Ferramentas da camada de extração.")).toBeTruthy();
    expect(screen.getByText("Aula pronta para retomada e registro")).toBeTruthy();

    await user.click(screen.getAllByText("As três camadas da ingestão")[1]!.closest("button")!);

    expect(screen.getByText("Aula pronta para retomada e registro")).toBeTruthy();
    expect(screen.getByText(/Aula ativa para retomada:/).textContent).toContain("As três camadas da ingestão");

    await user.click(screen.getByRole("button", { name: "Voltar para esta aula" }));

    const highlightedLesson = screen.getAllByText("Aula pronta para retomada e registro");
    expect(highlightedLesson).toHaveLength(1);
    expect(screen.getByText(/Aula ativa para retomada:/).textContent).toContain("Ferramentas da camada de extração");
  });

  it("exibe um diagrama interativo no módulo MCP e atualiza a explicação ao trocar a camada em foco", async () => {
    const user = userEvent.setup();
    render(<GiselleCourses />);

    await user.click(screen.getAllByText(/MCP na prática: conectando LLMs, ferramentas e contexto externo/i)[0]!.closest("button")!);

    expect(await screen.findByText("Fluxo host-client-server do MCP")).toBeTruthy();
    expect(screen.getByText("1. Initialize e negociação de versão")).toBeTruthy();
    expect(screen.getByText(/É a aplicação principal onde o usuário conversa com a IA/i)).toBeTruthy();

    const serverButton = screen.getAllByText("Server")[0]!.closest("button")!;
    expect(serverButton.getAttribute("aria-pressed")).toBe("false");

    await user.click(serverButton);

    expect(screen.getByText("Camada em foco")).toBeTruthy();
    expect(serverButton.getAttribute("aria-pressed")).toBe("true");
  });

  it("simula uma conexão com servidor MCP acadêmico no laboratório e permite marcar exercícios práticos", async () => {
    const user = userEvent.setup();
    render(<GiselleCourses view="lab" />);

    expect(screen.getAllByText("MCP Academic Sandbox").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sessão MCP aberta com contexto de aula e trilha ativa.").length).toBeGreaterThan(0);

    const discoverButton = screen.getAllByRole("button", { name: /Discover/i })[0]!;
    await user.click(discoverButton);
    expect(discoverButton.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText(/client lista resources, prompts e tools disponíveis/i)).toBeTruthy();

    const climateResourceButton = screen.getAllByText("Observatório de clima e séries históricas")[0]!.closest("button")!;
    await user.click(climateResourceButton);
    expect(climateResourceButton.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText(/extremos climáticos e produtividade agrícola/i)).toBeTruthy();

    const exerciseButton = screen.getAllByText(/Exercício 1 · Escolha do resource correto/i)[0]!.closest("button")!;
    expect(exerciseButton?.getAttribute("aria-pressed")).toBe("false");
    await user.click(exerciseButton!);
    expect(exerciseButton?.getAttribute("aria-pressed")).toBe("true");
  });
});
