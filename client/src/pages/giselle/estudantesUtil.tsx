// Peças comuns das telas de estudantes (/painel/estudantes): tipos, formatos,
// planilha CSV e selos de situação.

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../../../../server/routers";
import { SITUACAO_ACADEMICA, type SituacaoAcademica } from "@shared/academico";
import { STATUS_INSCRICAO, type StatusInscricao } from "@shared/voomp";

type Saidas = inferRouterOutputs<AppRouter>;
export type DadosEstudantes = Saidas["academy"]["estudantes"];
export type Inscricao = DadosEstudantes["inscricoes"][number];
export type FichaEstudante = Extract<Saidas["academy"]["estudante"], { encontrado: true }>;
export type ResultadoImportacao = Saidas["academy"]["importarProgresso"];

export const statusDe = (s: string): StatusInscricao => (s in STATUS_INSCRICAO ? (s as StatusInscricao) : "outro");

export function dataHora(d: string | Date | null | undefined) {
  if (!d) return "";
  return new Date(d).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function data(d: string | Date | null | undefined) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
}

export const reais = (centavos: number) =>
  (centavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function linkWhatsApp(telefone: string | null) {
  let d = (telefone ?? "").replace(/\D/g, "");
  if (d.length === 10 || d.length === 11) d = `55${d}`;
  return d.length >= 12 ? `https://wa.me/${d}` : null;
}

export function contar<T>(itens: T[], chave: (item: T) => string | null | undefined): [string, number][] {
  const mapa = new Map<string, number>();
  for (const item of itens) {
    const k = chave(item);
    if (!k) continue;
    mapa.set(k, (mapa.get(k) ?? 0) + 1);
  }
  return Array.from(mapa.entries()).sort((a, b) => b[1] - a[1]);
}

export const pct = (parte: number, todo: number) => (todo > 0 ? `${((parte / todo) * 100).toFixed(1)}%` : "—");

export function baixarCsv(nome: string, linhas: (string | number | null | undefined)[][]) {
  const celula = (v: string | number | null | undefined) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[";\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  // ";" e BOM: o Excel em português abre com acentos e colunas certas.
  const conteudo = "﻿" + linhas.map((l) => l.map(celula).join(";")).join("\r\n");
  const url = URL.createObjectURL(new Blob([conteudo], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = nome;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function Selo({ status }: { status: StatusInscricao }) {
  const info = STATUS_INSCRICAO[status];
  return (
    <span
      className="inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold"
      style={{ background: `${info.cor}1a`, color: info.cor }}
    >
      {info.rotulo}
    </span>
  );
}

export function SeloAcademico({ situacao }: { situacao: SituacaoAcademica }) {
  const info = SITUACAO_ACADEMICA[situacao];
  return (
    <span
      title={info.explicacao}
      className="inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold"
      style={{ background: `${info.cor}1a`, color: info.cor }}
    >
      {info.rotulo}
    </span>
  );
}

export function BarraProgresso({ valor }: { valor: number | null | undefined }) {
  if (valor === null || valor === undefined) return <span className="text-xs text-slate-400">sem dado</span>;
  return (
    <div className="flex items-center gap-2" aria-label={`Progresso ${valor}%`}>
      <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-[#0f9d8f]" style={{ width: `${Math.min(100, valor)}%` }} />
      </div>
      <span className="text-xs font-bold tabular-nums">{valor}%</span>
    </div>
  );
}
