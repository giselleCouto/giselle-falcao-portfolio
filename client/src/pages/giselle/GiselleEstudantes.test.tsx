// @vitest-environment jsdom

import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GiselleEstudantes from "./GiselleEstudantes";

vi.mock("wouter", () => ({
  Link: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

const base = {
  statusVoomp: null,
  productName: null,
  offerName: null,
  zipcode: null,
  saleId: null,
  installments: null,
  refusedReason: null,
  utmCampaign: null,
  utmContent: null,
  eventsCount: 1,
  firstEventAt: new Date("2026-11-20T13:00:00Z"),
  lastEventAt: new Date("2026-11-20T13:05:00Z"),
  createdAt: new Date("2026-11-20T13:00:00Z"),
  updatedAt: new Date("2026-11-20T13:05:00Z"),
  academico: null,
};

const acad = (extra: Record<string, unknown>) => ({
  id: 1,
  inscricaoId: 1,
  ra: null,
  turma: null,
  progressoPct: null,
  aulasConcluidas: null,
  aulasTotal: null,
  aprovado: null,
  ultimoAcessoAt: null,
  ultimoAvancoAt: null,
  concluidoAt: null,
  canceladoAt: null,
  motivoCancelamento: null,
  observacoes: null,
  origem: "importacao",
  importadoAt: new Date("2027-03-01T12:00:00Z"),
  createdAt: new Date("2027-03-01T12:00:00Z"),
  updatedAt: new Date("2027-03-01T12:00:00Z"),
  ...extra,
});

const pagoTurma01 = new Date("2026-11-20T13:05:00Z");
// "Hoje" dos testes: 08/02/2027, duas semanas depois do início da Turma 01 (25/01/2027).
// O curso livre (3 semanas) vence em 15/02; a extensão (4 meses) em 25/05.
const HOJE = new Date("2027-02-08T15:00:00Z");

const inscricoes = [
  { ...base, id: 1, matricula: "NK-DDV-2027-0001", status: "pago", productId: "17781", email: "maria@exemplo.com", name: "Maria Souza", phone: "31999990000", documentoMascarado: "•••.456.789-••", city: "Belo Horizonte", uf: "MG", method: "PIX", amountCents: 175000, coupon: "DADO750", utmSource: "instagram", paidAt: pagoTurma01, academico: acad({ inscricaoId: 1, ra: "RA2027001", progressoPct: 60, ultimoAvancoAt: new Date("2027-02-01T12:00:00Z") }) },
  { ...base, id: 2, matricula: null, status: "abandonado", productId: "17781", email: "joao@exemplo.com", name: "João Lima", phone: "31988887777", documentoMascarado: null, city: null, uf: null, method: null, amountCents: null, coupon: null, utmSource: "linkedin", paidAt: null },
  { ...base, id: 3, matricula: "NK-FIA-2027-0001", status: "pago", productId: "17873", email: "ana@exemplo.com", name: "Ana Reis", phone: null, documentoMascarado: null, city: "Contagem", uf: "MG", method: "CREDIT_CARD", amountCents: 24500, coupon: "FLUENTE105", utmSource: "instagram", paidAt: pagoTurma01, academico: acad({ id: 3, inscricaoId: 3, progressoPct: 15, ultimoAvancoAt: new Date("2027-01-28T12:00:00Z") }) },
  { ...base, id: 4, matricula: null, status: "aguardando_pagamento", productId: "17873", email: "bia@exemplo.com", name: "Bia Rocha", phone: null, documentoMascarado: null, city: "Salvador", uf: "BA", method: "PIX", amountCents: 24500, coupon: null, utmSource: null, paidAt: null },
  { ...base, id: 5, matricula: "NK-FIA-2027-0002", status: "pago", productId: "17873", email: "caio@exemplo.com", name: "Caio Prado", phone: null, documentoMascarado: null, city: "Uberlândia", uf: "MG", method: "PIX", amountCents: 24500, coupon: null, utmSource: "youtube", paidAt: pagoTurma01, academico: acad({ id: 5, inscricaoId: 5, progressoPct: 100, concluidoAt: new Date("2027-02-05T12:00:00Z") }) },
];

const atualizarMock = vi.fn().mockResolvedValue({ ok: true });
const fichas = new Map<number, unknown>();

vi.mock("@/lib/trpc", () => ({
  trpc: {
    academy: {
      estudantes: {
        useQuery: (input: { token: string }) =>
          input.token
            ? {
                data: {
                  inscricoes,
                  eventos: [
                    { id: 9, evento: "saleUpdated", status: "pago", statusVoomp: "paid", productId: "17781", email: "maria@exemplo.com", receivedAt: new Date("2026-11-20T13:05:00Z") },
                  ],
                  totalEventos: 6,
                  ultimaImportacao: "2027-03-01T12:00:00.000Z",
                  geradoEm: "2026-11-20T13:06:00Z",
                },
                isLoading: false,
                isError: false,
                isFetching: false,
                refetch: vi.fn(),
              }
            : { data: undefined, isLoading: false, isError: false, isFetching: false, refetch: vi.fn() },
      },
      estudante: {
        // mesmo objeto a cada render, como o React Query faz (senão o cartão re-renderiza sem fim)
        useQuery: ({ inscricaoId }: { inscricaoId: number }) => {
          if (!fichas.has(inscricaoId)) {
            const { documentoMascarado: _m, academico, ...inscricao } = inscricoes.find((i) => i.id === inscricaoId)!;
            fichas.set(inscricaoId, {
              data: {
                encontrado: true,
                inscricao: { ...inscricao, documento: "123.456.789-09", documentoCifrado: true },
                academico,
                eventos: [],
              },
              isError: false,
              refetch: vi.fn(),
            });
          }
          return fichas.get(inscricaoId);
        },
      },
      atualizarEstudante: { useMutation: () => ({ mutateAsync: atualizarMock, isPending: false }) },
      importarProgresso: { useMutation: () => ({ mutateAsync: vi.fn(), isPending: false }) },
      documentosEstudantes: { useMutation: () => ({ mutateAsync: vi.fn().mockResolvedValue([]), isPending: false }) },
    },
  },
}));

const tile = (rotulo: string) =>
  screen.getAllByText(rotulo).find((el) => el.tagName === "P")?.parentElement as HTMLElement;

describe("GiselleEstudantes", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(HOJE);
    atualizarMock.mockClear();
  });
  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it("pede a chave antes de mostrar qualquer dado", () => {
    render(<GiselleEstudantes />);
    expect(screen.getByPlaceholderText("Chave de acesso")).toBeTruthy();
    expect(screen.queryByText("Maria Souza")).toBeNull();
  });

  it("mostra quem pagou e quem não finalizou, com a distribuição por curso", async () => {
    localStorage.setItem("painel-key", "chave");
    render(<GiselleEstudantes />);

    expect(within(tile("Pessoas registradas")).getByText("5")).toBeTruthy();
    expect(within(tile("Inscrições pagas")).getByText("3")).toBeTruthy();
    expect(within(tile("Não finalizaram")).getByText("2")).toBeTruthy();
    expect(within(tile("Taxa de finalização")).getByText("60.0%")).toBeTruthy();

    const linhaDdv = screen.getAllByText("Do Dado ao Valor (extensão)").find((el) => el.tagName === "TD")?.closest("tr") as HTMLElement;
    expect(within(linhaDdv).getAllByText("1").length).toBeGreaterThanOrEqual(2); // 1 paga, 1 abandono
    expect(within(linhaDdv).getByText("50.0%")).toBeTruthy();

    expect(screen.getByText("NK-DDV-2027-0001")).toBeTruthy();
    expect(screen.getByText("•••.456.789-••")).toBeTruthy(); // CPF oculto na tela
    expect(screen.queryByText("123.456.789-09")).toBeNull();
    expect(screen.getByText("João Lima")).toBeTruthy();
    expect(screen.getByText("6 no total", { exact: false })).toBeTruthy();
  });

  it("filtra só quem não finalizou", async () => {
    localStorage.setItem("painel-key", "chave");
    render(<GiselleEstudantes />);
    await userEvent.selectOptions(screen.getByRole("combobox", { name: "Situação" }), "nao-finalizaram");
    expect(screen.queryByText("Maria Souza")).toBeNull();
    expect(screen.getByText("João Lima")).toBeTruthy();
    expect(screen.getByText("Bia Rocha")).toBeTruthy();
  });

  it("acompanhamento: cursando, em risco e concluintes de quem se matriculou", async () => {
    localStorage.setItem("painel-key", "chave");
    render(<GiselleEstudantes />);
    await userEvent.click(screen.getByRole("tab", { name: "Acompanhamento do curso" }));

    expect(within(tile("Matriculados")).getByText("3")).toBeTruthy();
    expect(within(tile("Cursando")).getByText("1")).toBeTruthy(); // Maria (extensão) avançou há 7 dias, acima do ritmo
    expect(within(tile("Em risco")).getByText("1")).toBeTruthy(); // Ana (curso livre): 11 dias parada, prazo de 3 semanas
    expect(within(tile("Concluíram")).getByText("1")).toBeTruthy(); // Caio: 100%
    expect(screen.queryByText("João Lima")).toBeNull(); // não pagou: fica só nas inscrições

    expect(screen.getByText("Em risco agora (1)")).toBeTruthy();
    const ana = screen.getByText(/11 dias sem avançar/).closest("button") as HTMLElement;
    expect(within(ana).getByText("Ana Reis")).toBeTruthy();
    expect(screen.getByText("RA RA2027001")).toBeTruthy();
  });

  it("abre o cartão do estudante com o CPF escondido até pedir e salva o RA", async () => {
    localStorage.setItem("painel-key", "chave");
    render(<GiselleEstudantes />);
    await userEvent.click(screen.getByText("Maria Souza"));

    const cartao = screen.getByRole("dialog", { name: "Cartão do estudante" });
    expect(within(cartao).queryByText("123.456.789-09")).toBeNull();
    await userEvent.click(within(cartao).getByRole("button", { name: /Mostrar CPF/ }));
    expect(within(cartao).getByText("123.456.789-09")).toBeTruthy();

    const ra = within(cartao).getByLabelText("RA (Anhanguera)");
    await userEvent.clear(ra);
    await userEvent.type(ra, "RA999");
    await userEvent.click(within(cartao).getByRole("button", { name: "Salvar" }));
    expect(atualizarMock).toHaveBeenCalledWith({ token: "chave", inscricaoId: 1, ra: "RA999" });
  });
});
