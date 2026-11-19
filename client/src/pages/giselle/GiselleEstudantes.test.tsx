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
};

const inscricoes = [
  { ...base, id: 1, matricula: "NK-DDV-0001", status: "pago", productId: "17781", email: "maria@exemplo.com", name: "Maria Souza", phone: "31999990000", document: "12345678909", city: "Belo Horizonte", uf: "MG", method: "PIX", amountCents: 175000, coupon: "DADO750", utmSource: "instagram", paidAt: new Date("2026-11-20T13:05:00Z") },
  { ...base, id: 2, matricula: null, status: "abandonado", productId: "17781", email: "joao@exemplo.com", name: "João Lima", phone: "31988887777", document: null, city: null, uf: null, method: null, amountCents: null, coupon: null, utmSource: "linkedin", paidAt: null },
  { ...base, id: 3, matricula: "NK-FIA-0001", status: "pago", productId: "17873", email: "ana@exemplo.com", name: "Ana Reis", phone: null, document: null, city: "Contagem", uf: "MG", method: "CREDIT_CARD", amountCents: 24500, coupon: "FLUENTE105", utmSource: "instagram", paidAt: new Date("2026-11-20T13:05:00Z") },
  { ...base, id: 4, matricula: null, status: "aguardando_pagamento", productId: "17873", email: "bia@exemplo.com", name: "Bia Rocha", phone: null, document: null, city: "Salvador", uf: "BA", method: "PIX", amountCents: 24500, coupon: null, utmSource: null, paidAt: null },
];

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
                  geradoEm: "2026-11-20T13:06:00Z",
                },
                isLoading: false,
                isError: false,
                isFetching: false,
                refetch: vi.fn(),
              }
            : { data: undefined, isLoading: false, isError: false, isFetching: false, refetch: vi.fn() },
      },
    },
  },
}));

describe("GiselleEstudantes", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => cleanup());

  it("pede a chave antes de mostrar qualquer dado", () => {
    render(<GiselleEstudantes />);
    expect(screen.getByPlaceholderText("Chave de acesso")).toBeTruthy();
    expect(screen.queryByText("Maria Souza")).toBeNull();
  });

  it("mostra quem pagou e quem não finalizou, com a distribuição por curso", async () => {
    localStorage.setItem("painel-key", "chave");
    render(<GiselleEstudantes />);

    const tile = (rotulo: string) =>
      screen.getAllByText(rotulo).find((el) => el.tagName === "P")?.parentElement as HTMLElement;
    expect(within(tile("Pessoas registradas")).getByText("4")).toBeTruthy();
    expect(within(tile("Inscrições pagas")).getByText("2")).toBeTruthy();
    expect(within(tile("Não finalizaram")).getByText("2")).toBeTruthy();
    expect(within(tile("Taxa de finalização")).getByText("50.0%")).toBeTruthy();

    const linhaDdv = screen.getAllByText("Do Dado ao Valor (extensão)").find((el) => el.tagName === "TD")?.closest("tr") as HTMLElement;
    expect(within(linhaDdv).getAllByText("1").length).toBeGreaterThanOrEqual(2); // 1 paga, 1 abandono
    expect(within(linhaDdv).getByText("50.0%")).toBeTruthy();

    expect(screen.getByText("NK-DDV-0001")).toBeTruthy();
    expect(screen.getByText("•••.456.789-••")).toBeTruthy(); // CPF oculto na tela
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
});
