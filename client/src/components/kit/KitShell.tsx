// Casca do kit "Quem está aprendendo a dirigir?" — tema escuro próprio (§2),
// cabeçalho fixo mínimo (nome à esquerda, início à direita), sem menu.
// Tudo mobile-first: uma coluna, botões de 56px, área de toque ≥ 44px.

import type { ReactNode } from "react";
import { Link } from "wouter";
import { Home } from "lucide-react";
import { KIT_CREDITOS, CONTATO } from "@/lib/kitData";

// Tokens da spec (§2) — únicos do kit, não herdam o tema claro do site.
export const KIT = {
  bg: "#050608",
  surface: "#0F1117",
  surface2: "#171A23",
  border: "#262A36",
  text: "#F4F4F5",
  muted: "#9CA3AF",
  accent: "#C9F31D",
  accent2: "#7A10D6",
  danger: "#FF6B6B",
  ok: "#4ADE80",
} as const;

export const btnPrimario =
  "flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#C9F31D] px-6 text-[15px] font-bold text-[#050608] transition hover:brightness-110 active:scale-[0.99]";

export const btnSecundario =
  "flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#262A36] bg-transparent px-6 py-3 text-sm font-semibold text-[#F4F4F5] transition hover:border-[#C9F31D]/60";

export const opcaoCard =
  "block w-full rounded-2xl border bg-[#171A23] px-5 py-4 text-left text-[17px] font-medium leading-6 text-[#F4F4F5] transition min-h-[44px]";

export function BadgeNumero({ n }: { n: number }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#C9F31D] font-baloo text-base font-bold text-[#050608]">
      {n}
    </span>
  );
}

export function KitProgress({ atual, total, rotulo }: { atual: number; total: number; rotulo?: string }) {
  return (
    <div aria-live="polite" className="pt-1">
      <div className="flex items-center justify-between text-xs font-bold text-[#9CA3AF]">
        <span>
          {atual} de {total}
        </span>
        {rotulo ? <span className="uppercase tracking-[0.16em]">{rotulo}</span> : null}
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#262A36]">
        <div
          className="h-full rounded-full bg-[#C9F31D] transition-all duration-300"
          style={{ width: `${Math.min(100, (atual / total) * 100)}%` }}
        />
      </div>
    </div>
  );
}

/** Rodapé discreto das telas de resultado (§3). */
export function KitCreditos() {
  return (
    <p className="pt-2 text-center text-[11px] leading-5 text-[#9CA3AF]/80">
      <a
        href={`https://www.instagram.com/${CONTATO.instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        className="transition hover:text-[#C9F31D]"
      >
        {KIT_CREDITOS}
      </a>
    </p>
  );
}

export default function KitShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#050608] text-[#F4F4F5]">
      <header className="sticky top-0 z-40 border-b border-[#262A36] bg-[#050608]/90 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-xl items-center justify-between gap-3 px-4">
          <Link
            href="/kit"
            className="min-w-0 truncate font-baloo text-sm font-bold uppercase tracking-[0.08em] text-[#F4F4F5]"
          >
            Kit do Agente
          </Link>
          <Link
            href="/kit"
            aria-label="Início do kit"
            className="flex size-11 shrink-0 items-center justify-center rounded-full text-[#9CA3AF] transition hover:text-[#C9F31D]"
          >
            <Home className="size-5" />
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-xl flex-1 px-4 pb-12 pt-5">{children}</main>
    </div>
  );
}
