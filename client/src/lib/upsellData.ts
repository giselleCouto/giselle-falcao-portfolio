// Upsell pós-compra da Turma 01: quem compra o Fluente em IA completo (Voomp
// 17873) cai em /obrigado/fluente, que convida para a extensão Do Dado ao
// Valor (Voomp 17781). O botão é da Voomp (Checkouts → Upsell): o script
// upsell.js habilita o botão quando a pessoa chega do checkout e cobra a oferta
// escolhida. A página de obrigado do Fluente na Voomp (Produto → Avançado →
// Páginas) aponta para /obrigado/fluente.
//
// Upsells criados na Voomp em 16/11/2026:
// - 552: oferta 91881 "Do Dado ao Valor · condição de primeira turma", R$ 1.750
//   (o mesmo valor da página com o cupom DADO750), até 12/12/2026;
// - 553: oferta 91659, preço base R$ 2.500, a partir de 13/12/2026.
// Nos dois: "não, obrigado" → /obrigado/fluente/confirmado; compra aceita →
// /obrigado/do-dado-ao-valor. OneClickBuy desligado.

import { condicaoPrimeiraTurmaAtiva } from "./fluenteData";

export const UPSELL_SCRIPT = "https://pay.voompcreators.com.br/assets/upsell.js";

const SITE = "https://www.coutofalcao.com";

export const ROTAS_OBRIGADO = {
  /** Depois de pagar o Fluente: confirmação + convite para a extensão */
  upsellFluente: "/obrigado/fluente",
  /** Quem recusou o convite (só o Fluente) */
  fluenteConfirmado: "/obrigado/fluente/confirmado",
  /** Quem aceitou o convite ou comprou a extensão */
  extensaoConfirmada: "/obrigado/do-dado-ao-valor",
} as const;

export type UpsellOferta = { id: string; preco: string; regular: string };

const UPSELL_FLUENTE = {
  primeiraTurma: { id: "552", preco: "R$ 1.750", regular: "R$ 2.500" },
  regular: { id: "553", preco: "R$ 2.500", regular: "R$ 2.500" },
} satisfies Record<string, UpsellOferta>;

/** Botão que vale hoje: condição de primeira turma até 12/12/2026, depois o preço regular. */
export function upsellFluenteAtual(agora = Date.now()): UpsellOferta {
  return condicaoPrimeiraTurmaAtiva(agora) ? UPSELL_FLUENTE.primeiraTurma : UPSELL_FLUENTE.regular;
}

/** Link absoluto do "não, obrigado" (o mesmo cadastrado no upsell da Voomp). */
export const LINK_NAO_OBRIGADO = `${SITE}${ROTAS_OBRIGADO.fluenteConfirmado}`;

/**
 * Carrega o upsell.js da Voomp uma vez por página (mesmo carregador que a
 * Voomp entrega em Checkouts → Upsell → Implementação).
 */
export function carregarScriptUpsell() {
  const w = window as unknown as { _voompUp?: number };
  if (w._voompUp) return;
  const t = Date.now();
  w._voompUp = t;
  const s = document.createElement("script");
  s.async = true;
  s.src = `${UPSELL_SCRIPT}?v=${t}`;
  document.head.appendChild(s);
}
