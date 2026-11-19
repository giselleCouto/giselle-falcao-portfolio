import type { AddressInfo } from "net";
import express from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatarMatricula, cursoVoomp } from "../shared/voomp";
import {
  interpretarEventoVoomp,
  normalizarStatus,
  paraCentavos,
  proximoStatus,
  registerVoompWebhook,
} from "./voompWebhook";

const registrarEventoVoompMock = vi.fn();
const listarEstudantesVoompMock = vi.fn();
vi.mock("./voompDb", () => ({
  registrarEventoVoomp: registrarEventoVoompMock,
  listarEstudantesVoomp: listarEstudantesVoompMock,
}));

// Corpo no formato das plataformas da família Greenn/Voomp (variáveis do painel de integração).
const vendaPaga = {
  type: "sale",
  event: "saleUpdated",
  oldStatus: "waiting_payment",
  currentStatus: "paid",
  sale: {
    id: 987654,
    status: "paid",
    method: "CREDIT_CARD",
    installments: 12,
    amount: 1750,
    coupon: "DADO750",
    created_at: "2026-11-20 10:00:00",
    paid_at: "2026-11-20 10:02:31",
  },
  client: {
    id: 55,
    name: "Maria Souza",
    email: "Maria.Souza@Exemplo.com",
    cellphone: "+55 (31) 99999-0000",
    document: "123.456.789-09",
    zipcode: "30140-000",
    city: "Belo Horizonte",
    uf: "mg",
  },
  product: { id: 17781, name: "Do Dado ao Valor", offer_name: "Turma 01" },
  saleMetas: [
    { meta_key: "utm_source", meta_value: "instagram" },
    { meta_key: "utm_campaign", meta_value: "ninguem-nasce-fluente" },
  ],
};

const checkoutAbandonado = {
  type: "checkout",
  event: "checkoutAbandoned",
  lead: { name: "João Lima", email: "joao@exemplo.com", cellphone: "31988887777" },
  product: { id: "17873", name: "Fluente em IA completo" },
};

describe("leitura do aviso da Voomp", () => {
  it("extrai estudante, curso, pagamento e origem de uma venda paga", () => {
    const ev = interpretarEventoVoomp(vendaPaga);
    expect(ev.status).toBe("pago");
    expect(ev.email).toBe("maria.souza@exemplo.com");
    expect(ev.name).toBe("Maria Souza");
    expect(ev.document).toBe("123.456.789-09");
    expect(ev.uf).toBe("MG");
    expect(ev.productId).toBe("17781");
    expect(ev.offerName).toBe("Turma 01");
    expect(ev.saleId).toBe("987654");
    expect(ev.amountCents).toBe(175000);
    expect(ev.installments).toBe(12);
    expect(ev.coupon).toBe("DADO750");
    expect(ev.utmSource).toBe("instagram");
    expect(ev.utmCampaign).toBe("ninguem-nasce-fluente");
    expect(ev.paidAt?.getFullYear()).toBe(2026);
  });

  it("registra quem abandonou o checkout com os dados que deixou", () => {
    const ev = interpretarEventoVoomp(checkoutAbandonado);
    expect(ev.status).toBe("abandonado");
    expect(ev.email).toBe("joao@exemplo.com");
    expect(ev.phone).toBe("31988887777");
    expect(ev.productId).toBe("17873");
    expect(ev.paidAt).toBeNull();
  });

  it("aguenta corpo vazio ou estranho sem quebrar", () => {
    expect(interpretarEventoVoomp(null).status).toBe("outro");
    expect(interpretarEventoVoomp({ data: { status: "refunded", client: { email: "a@b.c" } } }).status).toBe("reembolsado");
  });

  it("converte valores em reais para centavos", () => {
    expect(paraCentavos(245)).toBe(24500);
    expect(paraCentavos("1.750,00")).toBe(175000);
    expect(paraCentavos("620.01")).toBe(62001);
    expect(paraCentavos("")).toBeNull();
  });
});

describe("situação da inscrição", () => {
  it.each([
    ["paid", "pago"],
    ["approved", "pago"],
    ["waiting_payment", "aguardando_pagamento"],
    ["pending", "aguardando_pagamento"],
    ["refused", "recusado"],
    ["unpaid", "nao_pago"],
    ["expired", "nao_pago"],
    ["refunded", "reembolsado"],
    ["chargedback", "chargeback"],
    ["Não paga", "nao_pago"],
  ])("%s → %s", (bruto, esperado) => {
    expect(normalizarStatus(bruto)).toBe(esperado);
  });

  it("aviso atrasado não desfaz pagamento nem reembolso", () => {
    expect(proximoStatus("pago", "abandonado")).toBe("pago");
    expect(proximoStatus("pago", "aguardando_pagamento")).toBe("pago");
    expect(proximoStatus("reembolsado", "abandonado")).toBe("reembolsado");
    expect(proximoStatus("pago", "reembolsado")).toBe("reembolsado");
    expect(proximoStatus("reembolsado", "pago")).toBe("pago");
  });

  it("quem gerou Pix e não pagou continua assim mesmo com aviso de abandono", () => {
    expect(proximoStatus("aguardando_pagamento", "abandonado")).toBe("aguardando_pagamento");
    expect(proximoStatus("abandonado", "aguardando_pagamento")).toBe("aguardando_pagamento");
    expect(proximoStatus("recusado", "pago")).toBe("pago");
    expect(proximoStatus(null, "abandonado")).toBe("abandonado");
    expect(proximoStatus("abandonado", "outro")).toBe("abandonado");
  });

  it("matrícula legível por curso", () => {
    expect(formatarMatricula(cursoVoomp("17779").codigo, 1)).toBe("NK-MBA-0001");
    expect(formatarMatricula(cursoVoomp("17781").codigo, 27)).toBe("NK-DDV-0027");
    expect(formatarMatricula(cursoVoomp("17873").codigo, 1234)).toBe("NK-FIA-1234");
    expect(cursoVoomp("99999").codigo).toBe("P99999");
  });
});

describe("rota do webhook", () => {
  let base = "";
  let fechar: () => void = () => undefined;

  beforeEach(async () => {
    registrarEventoVoompMock.mockReset();
    const app = express();
    app.use(express.json());
    registerVoompWebhook(app);
    const servidor = app.listen(0);
    await new Promise((r) => servidor.once("listening", r));
    base = `http://127.0.0.1:${(servidor.address() as AddressInfo).port}`;
    fechar = () => servidor.close();
  });
  afterEach(() => {
    fechar();
    delete process.env.VOOMP_WEBHOOK_TOKEN;
  });

  const enviar = (token: string, corpo: unknown) =>
    fetch(`${base}/api/voomp/webhook/${token}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(corpo),
    });

  it("fica fechada enquanto o token não está configurado", async () => {
    const r = await enviar("qualquer", vendaPaga);
    expect(r.status).toBe(503);
    expect(registrarEventoVoompMock).not.toHaveBeenCalled();
  });

  it("recusa token errado", async () => {
    process.env.VOOMP_WEBHOOK_TOKEN = "segredo-certo";
    const r = await enviar("segredo-errado", vendaPaga);
    expect(r.status).toBe(401);
    expect(registrarEventoVoompMock).not.toHaveBeenCalled();
  });

  it("grava o aviso com token certo e guarda o corpo original", async () => {
    process.env.VOOMP_WEBHOOK_TOKEN = "segredo-certo";
    registrarEventoVoompMock.mockResolvedValue({ eventoId: 1, inscricaoId: 7, status: "pago", matricula: "NK-DDV-0001" });
    const r = await enviar("segredo-certo", vendaPaga);
    expect(r.status).toBe(200);
    expect(await r.json()).toMatchObject({ ok: true, matricula: "NK-DDV-0001" });
    const [ev, payload] = registrarEventoVoompMock.mock.calls[0];
    expect(ev).toMatchObject({ status: "pago", email: "maria.souza@exemplo.com", productId: "17781" });
    expect(JSON.parse(payload)).toEqual(vendaPaga);
  });

  it("modo teste (?teste=1) avisa o gravador para desfazer no fim", async () => {
    process.env.VOOMP_WEBHOOK_TOKEN = "segredo-certo";
    registrarEventoVoompMock.mockResolvedValue({ eventoId: 1, inscricaoId: 7, status: "pago", matricula: "NK-DDV-0001", teste: true });
    const r = await fetch(`${base}/api/voomp/webhook/segredo-certo?teste=1`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(vendaPaga),
    });
    expect(r.status).toBe(200);
    expect(registrarEventoVoompMock.mock.calls[0][2]).toEqual({ teste: true });
  });

  it("responde 200 a um GET de teste com o token certo", async () => {
    process.env.VOOMP_WEBHOOK_TOKEN = "segredo-certo";
    const r = await fetch(`${base}/api/voomp/webhook/segredo-certo`);
    expect(r.status).toBe(200);
  });
});
