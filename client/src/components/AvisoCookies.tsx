import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { aoMudarEscolha, escolhaAtual, plataformasDeAnuncio, registrarEscolha, revisarEscolha } from "@/lib/anuncios";

// Aviso de cookies de anúncios (Pixel da Meta, LinkedIn Insight Tag).
// Só aparece quando há alguma tag configurada e a pessoa ainda não escolheu.
// Aceitar e recusar têm o mesmo peso visual: a escolha é dela.

function nomesDasPlataformas(plataformas: ("Meta" | "LinkedIn")[]) {
  return plataformas
    .map((p) => (p === "Meta" ? "da Meta (Facebook e Instagram)" : "do LinkedIn"))
    .join(" e ");
}

/** Versão curta, para a faixa do celular: "da Meta e do LinkedIn" */
function nomesCurtos(plataformas: ("Meta" | "LinkedIn")[]) {
  return plataformas.map((p) => (p === "Meta" ? "da Meta" : "do LinkedIn")).join(" e ");
}

export default function AvisoCookies() {
  const [location] = useLocation();
  const [escolha, setEscolha] = useState(() => escolhaAtual());
  useEffect(() => aoMudarEscolha(() => setEscolha(escolhaAtual())), []);

  const plataformas = plataformasDeAnuncio();
  if (escolha !== null || plataformas.length === 0) return null;
  if (location.startsWith("/painel") || location.startsWith("/giselle/painel")) return null;

  // No celular, uma faixa fina colada ao rodapé (até 64 px), para não cobrir a
  // oferta nem os botões da primeira tela; a partir de 640 px, o cartão de
  // sempre, no canto. Se a barra de compra estiver na tela, o aviso sobe
  // (--barra-compra, definida pela BarraFixa das páginas de venda).
  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[70] mb-[var(--barra-compra,0px)] transition-[margin] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-md"
    >
      <div className="flex items-center gap-2 border-t border-slate-200 bg-white px-3 py-2 text-[0.6875rem] leading-[0.875rem] text-slate-600 shadow-[0_-8px_24px_rgba(15,23,42,0.12)] sm:block sm:rounded-2xl sm:border sm:p-5 sm:text-sm sm:leading-6 sm:shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
        <p className="min-w-0 flex-1">
          <span className="sm:hidden">
            Podemos usar cookies {nomesCurtos(plataformas)} para medir nossos anúncios?
          </span>
          <span className="hidden sm:inline">
            Podemos usar cookies {nomesDasPlataformas(plataformas)} para saber quais anúncios trouxeram você até
            aqui? Sem a sua permissão, eles não são carregados.
          </span>{" "}
          <Link href="/privacidade" className="font-semibold text-slate-800 underline underline-offset-2">
            Saiba mais
          </Link>
        </p>
        <div className="flex shrink-0 gap-1.5 sm:mt-4 sm:gap-2">
          <button
            type="button"
            onClick={() => registrarEscolha("sim")}
            className="rounded-full border-2 border-slate-900 bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800 sm:flex-1 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            Aceitar
          </button>
          <button
            type="button"
            onClick={() => registrarEscolha("nao")}
            className="rounded-full border-2 border-slate-900 px-3 py-2 text-xs font-bold text-slate-900 transition hover:bg-slate-50 sm:flex-1 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            Agora não
          </button>
        </div>
      </div>
    </div>
  );
}

/** Para a Política de Privacidade: mostra a escolha atual e permite mudar. */
export function RevisarCookies() {
  const [escolha, setEscolha] = useState<ReturnType<typeof escolhaAtual>>(null);
  const [plataformas, setPlataformas] = useState<("Meta" | "LinkedIn")[]>([]);
  useEffect(() => {
    setEscolha(escolhaAtual());
    setPlataformas(plataformasDeAnuncio());
    return aoMudarEscolha(() => setEscolha(escolhaAtual()));
  }, []);

  if (plataformas.length === 0) return null;
  const estado =
    escolha === "sim"
      ? "Você aceitou os cookies de anúncios neste navegador."
      : escolha === "nao"
        ? "Você recusou os cookies de anúncios neste navegador."
        : "Você ainda não escolheu se aceita os cookies de anúncios.";

  return (
    <div className="mt-6 rounded-3xl border border-slate-200/70 bg-white p-6">
      <p className="text-sm leading-7 text-slate-600">{estado}</p>
      <button
        type="button"
        onClick={revisarEscolha}
        className="mt-3 rounded-full border-2 border-slate-900 px-5 py-2 text-sm font-bold text-slate-900 transition hover:bg-slate-50"
      >
        Mudar minha escolha
      </button>
    </div>
  );
}
