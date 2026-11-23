// Webhook da Voomp → registro de estudantes (voomp_inscricoes + voomp_eventos).
//
// A Voomp chama POST /api/voomp/webhook/<token> a cada evento escolhido na
// integração "Webhook" do painel dela (venda paga, recusada, reembolsada,
// chargeback, não paga, aguardando pagamento e checkout abandonado). O token
// fica só na URL cadastrada lá e em VOOMP_WEBHOOK_TOKEN no Railway — a Voomp
// não assina o envio, então a URL secreta é a autenticação.
//
// O formato exato do corpo não é documentado publicamente: a leitura abaixo é
// tolerante (procura os campos em sale/client/lead/product e variações), e o
// corpo original é guardado inteiro em voomp_eventos para conferência.

import { createHash, timingSafeEqual } from "crypto";
import type { Express, Request, Response } from "express";
import type { StatusInscricao } from "../shared/voomp";

type Obj = Record<string, unknown>;

const ehObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);

function texto(v: unknown, max = 255): string | null {
  if (v === null || v === undefined) return null;
  if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
    const s = String(v).trim();
    return s ? s.slice(0, max) : null;
  }
  return null;
}

function primeiro(objs: (Obj | null)[], chaves: string[], max = 255): string | null {
  for (const o of objs) {
    if (!o) continue;
    for (const k of chaves) {
      const v = texto(o[k], max);
      if (v) return v;
    }
  }
  return null;
}

function sub(o: Obj | null, ...chaves: string[]): Obj | null {
  if (!o) return null;
  for (const k of chaves) {
    const v = o[k];
    if (ehObj(v)) return v;
  }
  return null;
}

/** Valor em reais (número ou texto "1.750,00" / "1750.00") → centavos. */
export function paraCentavos(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v === "number" && Number.isFinite(v)) return Math.round(v * 100);
  const s = String(v).replace(/[^\d,.-]/g, "");
  if (!s) return null;
  const normal = s.includes(",") ? s.replace(/\./g, "").replace(",", ".") : s;
  const n = Number(normal);
  return Number.isFinite(n) ? Math.round(n * 100) : null;
}

function data(v: unknown): Date | null {
  const s = texto(v, 64);
  if (!s) return null;
  const d = new Date(s.includes("T") || s.includes("Z") ? s : s.replace(" ", "T"));
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Status da Voomp (ou nome do evento) → situação da inscrição. */
export function normalizarStatus(bruto: string | null, evento?: string | null): StatusInscricao {
  const s = `${bruto ?? ""} ${evento ?? ""}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  if (!s.trim()) return "outro";
  if (s.includes("abandon")) return "abandonado";
  if (s.includes("chargeback") || s.includes("charged_back") || s.includes("chargedback")) return "chargeback";
  if (s.includes("refund") || s.includes("reembols") || s.includes("estorn")) return "reembolsado";
  if (/(unpaid|nao[ _-]?pag|not[ _-]?paid|expired|expirad|vencid|cancel)/.test(s)) return "nao_pago";
  if (/(refused|recusad|declined|denied|failed|negad)/.test(s)) return "recusado";
  if (/(waiting|pending|aguardando|processing|em[ _]analise|boleto[ _]gerado|pix[ _]gerado)/.test(s)) return "aguardando_pagamento";
  if (/(paid|approved|aprovad|\bpago\b|\bpaga\b|completed|concluid)/.test(s)) return "pago";
  return "outro";
}

const NAO_FINALIZOU: StatusInscricao[] = ["abandonado", "aguardando_pagamento", "recusado", "nao_pago"];

/**
 * Próxima situação de uma inscrição. Um aviso atrasado de "abandonou" ou
 * "aguardando" não apaga um pagamento (nem um reembolso) já registrado, e o
 * checkout abandonado não esconde que a pessoa chegou a gerar Pix/boleto.
 */
export function proximoStatus(atual: StatusInscricao | null, novo: StatusInscricao): StatusInscricao {
  if (!atual) return novo;
  if (novo === "outro") return atual;
  if (["pago", "reembolsado", "chargeback"].includes(atual) && NAO_FINALIZOU.includes(novo)) return atual;
  if (novo === "abandonado" && NAO_FINALIZOU.includes(atual)) return atual;
  return novo;
}

export type EventoVoomp = {
  evento: string | null;
  statusVoomp: string | null;
  status: StatusInscricao;
  saleId: string | null;
  productId: string | null;
  productName: string | null;
  offerName: string | null;
  email: string | null;
  name: string | null;
  phone: string | null;
  document: string | null;
  zipcode: string | null;
  city: string | null;
  uf: string | null;
  method: string | null;
  installments: number | null;
  amountCents: number | null;
  coupon: string | null;
  refusedReason: string | null;
  utmSource: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  paidAt: Date | null;
};

/** UTMs podem vir como objeto, como saleMetas [{meta_key, meta_value}] ou soltas. */
function utms(raiz: Obj, venda: Obj | null): Record<string, string> {
  const achadas: Record<string, string> = {};
  const listas = [raiz.saleMetas, raiz.sale_metas, raiz.metas, venda?.metas, venda?.saleMetas];
  for (const lista of listas) {
    if (!Array.isArray(lista)) continue;
    for (const item of lista) {
      if (!ehObj(item)) continue;
      const k = texto(item.meta_key ?? item.key ?? item.name, 64)?.toLowerCase();
      const v = texto(item.meta_value ?? item.value, 160);
      if (k && v) achadas[k] = v;
    }
  }
  // Soltas no corpo/venda (utm_source) ou num objeto próprio ({utm: {source}}).
  const soltas = [raiz, venda];
  const agrupadas = [sub(raiz, "utm", "utms", "tracking"), sub(venda, "utm", "utms", "tracking")];
  for (const o of [...soltas, ...agrupadas]) {
    if (!o) continue;
    const agrupado = agrupadas.includes(o);
    for (const [k, v] of Object.entries(o)) {
      const valor = texto(v, 160);
      if (!valor) continue;
      const chave = k.toLowerCase().replace(/^utm_/, "");
      if (!["source", "campaign", "content", "medium"].includes(chave)) continue;
      if (agrupado || k.toLowerCase().startsWith("utm_")) achadas[`utm_${chave}`] ??= valor;
    }
  }
  return achadas;
}

export function interpretarEventoVoomp(corpo: unknown): EventoVoomp {
  const raiz: Obj = ehObj(corpo) ? corpo : {};
  const dados = sub(raiz, "data", "payload") ?? raiz;
  const venda = sub(dados, "sale", "transaction", "venda", "order");
  const cliente = sub(dados, "client", "lead", "customer", "buyer", "comprador");
  const endereco = sub(cliente, "address", "endereco");
  const produto = sub(dados, "product", "produto");
  const oferta = sub(dados, "offer", "oferta") ?? sub(produto, "offer", "oferta");

  const evento = primeiro([raiz, dados], ["event", "evento", "type", "tipo"], 64);
  const statusVoomp =
    primeiro([raiz, dados], ["currentStatus", "current_status", "status"], 64) ??
    primeiro([venda], ["status", "currentStatus"], 64);
  const status = normalizarStatus(statusVoomp, evento);

  const email = primeiro([cliente, dados], ["email", "e-mail", "mail"], 320)?.toLowerCase() ?? null;
  const parcelas = Number(primeiro([venda], ["installments", "parcelas"], 8));
  const u = utms(raiz, venda);

  return {
    evento,
    statusVoomp,
    status,
    saleId: primeiro([venda], ["id", "sale_id", "code"], 64) ?? primeiro([dados], ["sale_id", "saleId"], 64),
    productId: primeiro([produto], ["id", "product_id"], 32) ?? primeiro([dados, venda], ["product_id", "productId"], 32),
    productName: primeiro([produto], ["name", "nome"]),
    offerName: primeiro([produto], ["offer_name"]) ?? primeiro([oferta], ["name", "nome"]),
    email,
    name: primeiro([cliente], ["name", "nome", "full_name"], 200),
    phone: primeiro([cliente], ["cellphone", "phone", "telefone", "celular"], 40),
    document: primeiro([cliente], ["document", "cpf", "cpf_cnpj", "documento"], 32),
    zipcode: primeiro([cliente, endereco], ["zipcode", "zip_code", "cep"], 16),
    city: primeiro([cliente, endereco], ["city", "cidade"], 120),
    uf: primeiro([cliente, endereco], ["uf", "state", "estado"], 4)?.toUpperCase() ?? null,
    method: primeiro([venda], ["method", "payment_method", "metodo"], 40),
    installments: Number.isFinite(parcelas) && parcelas > 0 ? parcelas : null,
    amountCents: paraCentavos(venda?.amount ?? venda?.total ?? venda?.value ?? dados.amount),
    coupon: primeiro([venda], ["coupon", "cupom", "coupon_code"], 80),
    refusedReason: primeiro([venda], ["refused_reason", "refusedReason", "motivo_recusa"]),
    utmSource: u.utm_source ?? null,
    utmCampaign: u.utm_campaign ?? null,
    utmContent: u.utm_content ?? null,
    paidAt: data(venda?.paid_at ?? venda?.paidAt) ?? (status === "pago" ? new Date() : null),
  };
}

/** Compara o token da URL com VOOMP_WEBHOOK_TOKEN em tempo constante. */
export function tokenValido(recebido: string, esperado: string | undefined) {
  if (!esperado) return false;
  return timingSafeEqual(
    createHash("sha256").update(recebido).digest(),
    createHash("sha256").update(esperado).digest()
  );
}

export function registerVoompWebhook(app: Express) {
  const responder = async (req: Request, res: Response) => {
    const esperado = process.env.VOOMP_WEBHOOK_TOKEN;
    if (!esperado) {
      res.status(503).json({ ok: false, erro: "webhook não configurado" });
      return;
    }
    if (!tokenValido(String(req.params.token ?? ""), esperado)) {
      res.status(401).json({ ok: false });
      return;
    }
    // Teste de URL (alguns painéis fazem GET antes de salvar).
    if (req.method === "GET") {
      res.json({ ok: true });
      return;
    }
    try {
      const { registrarEventoVoomp } = await import("./voompDb");
      const corpo = req.body ?? {};
      // ?teste=1 percorre a gravação inteira e desfaz no fim (nada fica no painel)
      const teste = req.query.teste === "1";
      const { ocultarDocumentos } = await import("./cifraDocumento");
      // a cópia guardada do aviso vai sem CPF; o CPF fica só cifrado na inscrição
      const copia = JSON.stringify(ocultarDocumentos(corpo));
      const resultado = await registrarEventoVoomp(interpretarEventoVoomp(corpo), copia, { teste });
      if (!resultado) {
        res.status(503).json({ ok: false, erro: "banco indisponível" });
        return;
      }
      res.json({ ok: true, ...resultado });
    } catch (erro) {
      console.error("[Voomp webhook] falha ao registrar evento:", erro);
      res.status(500).json({ ok: false });
    }
  };
  app.get("/api/voomp/webhook/:token", responder);
  app.post("/api/voomp/webhook/:token", responder);
}
