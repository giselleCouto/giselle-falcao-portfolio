// Painel do Funil (/painel) — página protegida da Giselle: métricas de
// aquisição, conversão por página, funil da masterclass e o mapeamento de
// perfis/dores do diagnóstico da LP. Acesso pela mesma chave do digest
// (DIGEST_TOKEN no Railway) — validada no servidor via academy.painel.
// Página noindex (RouteSeo) e fora do sitemap. Dados 100% dela; sem PII de
// terceiros além do que os formulários já coletam com consentimento.

import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  BarChart3,
  KeyRound,
  LogOut,
  RefreshCw,
  TrendingDown,
  Users,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

const KEY_STORAGE = "painel-key";

// Paleta validada (dataviz): roxo = visitas, teal = conversões/leads.
const COR_VISITAS = "#6b21a8";
const COR_LEADS = "#0f9d8f";
const COR_ALERTA = "#c2410c";

const PERFIL_LABEL: Record<string, string> = {
  "formacao-qualificacao": "Formação para se qualificar (empresas)",
  "formacao-empreender": "Formação para empreender com IA",
  "formacao-geral": "Formação — ainda definindo objetivo",
  "empresa-explorador": "Empresário(a) explorando soluções",
  "empresa-custo-sem-retorno": "Empresário(a) com custo de IA sem retorno",
};

const RESPOSTA_LABEL: Record<string, Record<string, string>> = {
  uso: {
    chatbots: "Só chatbots (ChatGPT/Gemini)",
    agentes: "Automações e agentes (MCP, fluxos)",
    dados: "Dados estruturados / preditivo",
    "nao-uso": "Ainda não usa",
  },
  inv: {
    retorno: "Investiu com retorno claro",
    "sem-retorno": "Investiu SEM retorno",
    parado: "Projeto começado e parado",
    explorando: "Ainda explorando",
  },
  obj: {
    qualificar: "Qualificar-se para empresas",
    empreender: "Empreender com IA",
    crescer: "Crescer no cargo atual",
    descobrindo: "Ainda descobrindo",
  },
  agentes: {
    perdido: "Perdido(a) com os termos",
    curioso: "Entende o hype, não aplica",
    aplicando: "Já aplica, quer profundidade",
  },
};

// Páginas-funil: visitas vêm de page_visits; conversões da tabela correspondente.
type FunilPagina = { rotulo: string; paths: string[]; conversoes: (d: PainelData) => number };

type PainelData = {
  desde: string;
  janelaDias: number;
  leadsTotal: number;
  visitasDia: { dia: string; visitas: number; unicos: number }[];
  visitasPath: { path: string; visitas: number; unicos: number }[];
  canais: { source: string; visitas: number; unicos: number }[];
  eventosKit: { evento: string; total: number }[];
  leads: {
    route: string;
    persona: string;
    interest: string | null;
    businessArea: string | null;
    source: string;
    campaign: string | null;
    name: string;
    createdAt: string | Date;
  }[];
  trajetorias: { status: string; total: number }[];
  impulso: number;
  maturidade: { total: number; mediaScore: number | null };
  pedidosPalestra: { status: string; total: number }[];
  interesseCursos: number;
};

const FUNIS: FunilPagina[] = [
  {
    rotulo: "Masterclass (LP)",
    paths: ["/masterclass", "/giselle/masterclass"],
    conversoes: (d) => d.leads.filter((l) => l.route === "/masterclass").length,
  },
  {
    rotulo: "Mentoria Trajetória",
    paths: ["/trajetoria", "/giselle/mentoria/trajetoria"],
    conversoes: (d) => d.trajetorias.reduce((s, t) => s + t.total, 0),
  },
  {
    rotulo: "Diagnóstico de IA",
    paths: ["/diagnostico-ia", "/giselle/diagnostico-ia", "/linkedin"],
    conversoes: (d) => d.maturidade.total,
  },
  {
    rotulo: "Palestras (briefing)",
    paths: ["/palestras", "/giselle/palestras"],
    conversoes: (d) => d.pedidosPalestra.reduce((s, p) => s + p.total, 0),
  },
  {
    rotulo: "Impulso Dela IA",
    paths: ["/impulso", "/giselle/mentoria/impulso"],
    conversoes: (d) => d.impulso,
  },
  {
    rotulo: "Interesse em cursos",
    paths: ["/interesse", "/giselle/interesse", "/palestra", "/databh"],
    conversoes: (d) => d.interesseCursos,
  },
  {
    rotulo: "Contato",
    paths: ["/giselle/contato"],
    conversoes: (d) => d.leads.filter((l) => l.route === "giselle-contato").length,
  },
];

function contar<T>(itens: T[], chave: (item: T) => string | null | undefined) {
  const mapa = new Map<string, number>();
  for (const item of itens) {
    const k = chave(item);
    if (!k) continue;
    mapa.set(k, (mapa.get(k) ?? 0) + 1);
  }
  return Array.from(mapa.entries()).sort((a, b) => b[1] - a[1]);
}

/** Dia em UTC (YYYY-MM-DD) — casa com date() do MySQL sob sessão UTC.
 *  createdAt chega como Date real via superjson; String(Date) daria "Tue Sep 16". */
function diaISO(d: string | Date): string {
  return new Date(d).toISOString().slice(0, 10);
}

function parseBA(businessArea: string | null | undefined, campo: string): string | null {
  if (!businessArea) return null;
  const par = businessArea.split(";").find((p) => p.startsWith(`${campo}:`));
  const valor = par?.slice(campo.length + 1);
  return valor && valor !== "-" ? valor : null;
}

// ── componentes visuais ──────────────────────────────────────────────────────

function Tile({ rotulo, valor, detalhe }: { rotulo: string; valor: string; detalhe?: string }) {
  return (
    <div className="rounded-2xl bg-[#1a1333] px-5 py-4 text-white">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] opacity-70">{rotulo}</p>
      <p className="mt-1 font-baloo text-3xl font-bold tabular-nums">{valor}</p>
      {detalhe ? <p className="text-xs opacity-70">{detalhe}</p> : null}
    </div>
  );
}

function Barras({
  dados,
  cor = COR_VISITAS,
  formato = (n: number) => String(n),
}: {
  dados: [string, number][];
  cor?: string;
  formato?: (n: number) => string;
}) {
  const max = Math.max(1, ...dados.map(([, v]) => v));
  return (
    <div className="space-y-2.5">
      {dados.map(([rotulo, valor]) => (
        <div key={rotulo}>
          <div className="flex items-baseline justify-between gap-3 text-xs">
            <span className="min-w-0 truncate font-semibold text-[#1a1333]">{rotulo}</span>
            <span className="shrink-0 font-bold tabular-nums text-slate-500">{formato(valor)}</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full" style={{ width: `${(valor / max) * 100}%`, background: cor }} />
          </div>
        </div>
      ))}
      {dados.length === 0 ? <p className="text-xs text-slate-400">Sem registros na janela.</p> : null}
    </div>
  );
}

/** Linha dupla visitas × leads por dia (SVG; tooltip nativo por ponto). */
function SerieDiaria({ dias }: { dias: { dia: string; visitas: number; leads: number }[] }) {
  const W = 640;
  const H = 180;
  const PAD = { t: 14, r: 60, b: 24, l: 34 };
  const max = Math.max(1, ...dias.map((d) => Math.max(d.visitas, d.leads)));
  const x = (i: number) => PAD.l + (i * (W - PAD.l - PAD.r)) / Math.max(1, dias.length - 1);
  const y = (v: number) => H - PAD.b - (v / max) * (H - PAD.t - PAD.b);
  const linha = (chave: "visitas" | "leads") =>
    dias.map((d, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(d[chave]).toFixed(1)}`).join(" ");
  const ultimo = dias[dias.length - 1];

  if (dias.length === 0) return <p className="text-xs text-slate-400">Sem visitas na janela.</p>;

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="min-w-[520px]" role="img" aria-label="Visitas e leads por dia">
        {[0.5, 1].map((f) => (
          <g key={f}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(max * f)} y2={y(max * f)} stroke="#e2e8f0" strokeWidth={1} />
            <text x={PAD.l - 6} y={y(max * f) + 4} textAnchor="end" fontSize="10" fill="#64748b">
              {Math.round(max * f)}
            </text>
          </g>
        ))}
        <line x1={PAD.l} x2={W - PAD.r} y1={y(0)} y2={y(0)} stroke="#cbd5e1" strokeWidth={1} />
        <path d={linha("visitas")} fill="none" stroke={COR_VISITAS} strokeWidth={2} />
        <path d={linha("leads")} fill="none" stroke={COR_LEADS} strokeWidth={2} />
        {dias.map((d, i) => (
          <g key={d.dia}>
            <circle cx={x(i)} cy={y(d.visitas)} r={dias.length > 20 ? 2.5 : 3.5} fill={COR_VISITAS}>
              <title>{`${d.dia} · ${d.visitas} visitas`}</title>
            </circle>
            <circle cx={x(i)} cy={y(d.leads)} r={dias.length > 20 ? 2.5 : 3.5} fill={COR_LEADS} stroke="#fff" strokeWidth={1.5}>
              <title>{`${d.dia} · ${d.leads} leads`}</title>
            </circle>
          </g>
        ))}
        {ultimo ? (
          <g fontSize="10" fontWeight="700">
            <text x={W - PAD.r + 6} y={y(ultimo.visitas) + 3} fill={COR_VISITAS}>
              {ultimo.visitas} visitas
            </text>
            <text x={W - PAD.r + 6} y={y(ultimo.leads) + (Math.abs(y(ultimo.leads) - y(ultimo.visitas)) < 12 ? 15 : 3)} fill={COR_LEADS}>
              {ultimo.leads} leads
            </text>
          </g>
        ) : null}
        <text x={PAD.l} y={H - 6} fontSize="10" fill="#64748b">
          {dias[0]?.dia}
        </text>
        <text x={W - PAD.r} y={H - 6} fontSize="10" fill="#64748b" textAnchor="end">
          {ultimo?.dia}
        </text>
      </svg>
      <div className="mt-1 flex gap-4 text-xs font-semibold">
        <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: COR_VISITAS }} />Visitas</span>
        <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: COR_LEADS }} />Leads</span>
      </div>
    </div>
  );
}

function Cartao({ titulo, children, icone: Icone = BarChart3 }: { titulo: string; children: React.ReactNode; icone?: typeof BarChart3 }) {
  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white p-5">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#6b21a8]">
        <Icone className="size-4" />
        {titulo}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

// ── página ───────────────────────────────────────────────────────────────────

export default function GisellePainel() {
  const [chave, setChave] = useState<string>(() => {
    try {
      return localStorage.getItem(KEY_STORAGE) ?? "";
    } catch {
      return "";
    }
  });
  const [entrada, setEntrada] = useState("");
  const [dias, setDias] = useState(14);

  const query = trpc.academy.painel.useQuery(
    { token: chave, days: dias },
    { enabled: chave.length > 0, retry: false, refetchOnWindowFocus: false }
  );

  const sair = () => {
    try {
      localStorage.removeItem(KEY_STORAGE);
    } catch {
      /* sem storage */
    }
    setChave("");
    setEntrada("");
  };

  const dados = query.data as PainelData | undefined;

  const calculado = useMemo(() => {
    if (!dados) return null;
    const leadsMc = dados.leads.filter((l) => l.route === "/masterclass");
    const leadsPorDiaMapa = new Map<string, number>();
    for (const l of dados.leads) {
      const dia = diaISO(l.createdAt);
      leadsPorDiaMapa.set(dia, (leadsPorDiaMapa.get(dia) ?? 0) + 1);
    }
    const visitasPorDiaMapa = new Map(dados.visitasDia.map((v) => [String(v.dia).slice(0, 10), v]));
    // Série densificada: todo dia da janela aparece, mesmo sem visitas —
    // um dia com lead e zero visita não pode sumir do gráfico.
    const serie: { dia: string; visitas: number; leads: number }[] = [];
    const DIA_MS = 24 * 60 * 60 * 1000;
    const inicio = new Date(dados.desde).getTime();
    for (let t = inicio; t <= Date.now(); t += DIA_MS) {
      const chave = new Date(t).toISOString().slice(0, 10);
      serie.push({
        dia: chave.slice(5),
        visitas: visitasPorDiaMapa.get(chave)?.visitas ?? 0,
        leads: leadsPorDiaMapa.get(chave) ?? 0,
      });
    }
    const visitasPorPaths = (paths: string[]) =>
      dados.visitasPath
        .filter((v) => paths.some((p) => v.path === p || v.path === `${p}/`))
        .reduce((s, v) => s + v.visitas, 0);
    const funis = FUNIS.map((f) => {
      const visitas = visitasPorPaths(f.paths);
      const conv = f.conversoes(dados);
      return { rotulo: f.rotulo, visitas, conv, taxa: visitas > 0 ? (conv / visitas) * 100 : null };
    }).sort((a, b) => b.visitas - a.visitas);
    return {
      totalVisitas: dados.visitasDia.reduce((s, v) => s + v.visitas, 0),
      totalUnicos: dados.visitasDia.reduce((s, v) => s + v.unicos, 0),
      totalLeads: dados.leadsTotal,
      amostrado: dados.leadsTotal > dados.leads.length,
      leadsMc,
      serie,
      funis,
      porPerfil: contar(leadsMc, (l) => {
        const tag = l.interest?.startsWith("mc-perfil:") ? l.interest.slice(10) : null;
        return tag ? (PERFIL_LABEL[tag] ?? tag) : "Sem diagnóstico (lead antigo)";
      }),
      porUso: contar(leadsMc, (l) => {
        const v = parseBA(l.businessArea, "uso");
        return v ? (RESPOSTA_LABEL.uso[v] ?? v) : null;
      }),
      porInvest: contar(leadsMc, (l) => {
        const v = parseBA(l.businessArea, "inv");
        return v ? (RESPOSTA_LABEL.inv[v] ?? v) : null;
      }),
      porObjetivo: contar(leadsMc, (l) => {
        const v = parseBA(l.businessArea, "obj");
        return v ? (RESPOSTA_LABEL.obj[v] ?? v) : null;
      }),
      porAgentes: contar(leadsMc, (l) => {
        const v = parseBA(l.businessArea, "agentes");
        return v ? (RESPOSTA_LABEL.agentes[v] ?? v) : null;
      }),
      porCanalLead: contar(dados.leads, (l) => l.source || "direto"),
    };
  }, [dados]);

  // ── porta de entrada ───────────────────────────────────────────────────────
  if (!chave || (query.isError && query.error?.data?.code === "UNAUTHORIZED")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fc] px-4">
        <div className="w-full max-w-sm rounded-3xl border border-slate-200/70 bg-white p-7 text-center shadow-[0_18px_50px_rgba(26,19,51,0.08)]">
          <KeyRound className="mx-auto size-8 text-[#6b21a8]" />
          <h1 className="mt-3 font-baloo text-xl font-bold text-[#1a1333]">Painel do Funil</h1>
          <p className="mt-1 text-sm text-slate-500">
            Área restrita da Giselle. Entre com a chave de acesso (a mesma do digest diário).
          </p>
          {query.isError ? (
            <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">
              Chave inválida — confira e tente de novo.
            </p>
          ) : null}
          <input
            type="password"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && entrada.trim()) {
                try {
                  localStorage.setItem(KEY_STORAGE, entrada.trim());
                } catch {
                  /* segue só em memória */
                }
                setChave(entrada.trim());
              }
            }}
            placeholder="Chave de acesso"
            className="mt-4 w-full rounded-2xl border-2 border-slate-200 px-4 py-3 text-center text-sm focus:border-[#8b5cf6] focus:outline-none"
          />
          <button
            type="button"
            disabled={!entrada.trim()}
            onClick={() => {
              try {
                localStorage.setItem(KEY_STORAGE, entrada.trim());
              } catch {
                /* segue só em memória */
              }
              setChave(entrada.trim());
            }}
            className="mt-3 w-full rounded-full bg-[#1a1333] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#6b21a8] disabled:opacity-40"
          >
            Entrar
          </button>
          <Link href="/giselle" className="mt-4 block text-xs text-slate-400 underline">
            Voltar ao site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fc] pb-16 text-[#1a1333]">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur">
        <div className="container flex h-14 items-center justify-between gap-3">
          <p className="font-baloo text-sm font-bold uppercase tracking-[0.12em]">Painel do Funil</p>
          <div className="flex items-center gap-2">
            {[7, 14, 30, 90].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDias(d)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  dias === d ? "bg-[#1a1333] text-white" : "bg-slate-100 text-slate-500 hover:bg-violet-100"
                }`}
              >
                {d}d
              </button>
            ))}
            <button
              type="button"
              onClick={() => void query.refetch()}
              aria-label="Atualizar"
              className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-violet-100"
            >
              <RefreshCw className={`size-4 ${query.isFetching ? "animate-spin" : ""}`} />
            </button>
            <button
              type="button"
              onClick={sair}
              aria-label="Sair"
              className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-rose-100 hover:text-rose-600"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mt-6 space-y-5">
        {query.isError ? (
          <div className="mx-auto max-w-md rounded-3xl border border-rose-200 bg-rose-50 p-6 text-center">
            <p className="text-sm font-bold text-rose-700">Não consegui carregar as métricas.</p>
            <p className="mt-1 text-xs text-rose-600">
              {query.error?.message || "Banco indisponível ou sem conexão."}
            </p>
            <button
              type="button"
              onClick={() => void query.refetch()}
              className="mt-4 rounded-full bg-[#1a1333] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#6b21a8]"
            >
              Tentar de novo
            </button>
          </div>
        ) : query.isLoading || !calculado || !dados ? (
          <p className="py-20 text-center text-sm text-slate-400">Carregando métricas…</p>
        ) : (
          <>
            {/* Visão geral */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Tile rotulo="Visitas" valor={String(calculado.totalVisitas)} detalhe={`últimos ${dados.janelaDias} dias`} />
              <Tile rotulo="Visitantes únicos" valor={String(calculado.totalUnicos)} detalhe="por dia, somados" />
              <Tile
                rotulo="Leads"
                valor={String(calculado.totalLeads)}
                detalhe={calculado.amostrado ? "detalhes = 500 mais recentes" : "formulários de contato/LP"}
              />
              <Tile
                rotulo="Conversão geral"
                valor={`${calculado.totalUnicos > 0 ? ((calculado.totalLeads / calculado.totalUnicos) * 100).toFixed(1) : "0"}%`}
                detalhe="leads ÷ visitantes"
              />
            </div>

            <Cartao titulo="Visitas × leads por dia">
              <SerieDiaria dias={calculado.serie} />
            </Cartao>

            {/* O que converte (e o que não) */}
            <Cartao titulo="Conversão por página-funil" icone={TrendingDown}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-[0.12em] text-slate-400">
                      <th className="pb-2">Funil</th>
                      <th className="pb-2 text-right">Visitas</th>
                      <th className="pb-2 text-right">Conversões</th>
                      <th className="pb-2 text-right">Taxa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculado.funis.map((f) => {
                      const alerta = f.visitas >= 10 && f.conv === 0;
                      return (
                        <tr key={f.rotulo} className="border-t border-slate-100">
                          <td className="py-2.5 font-semibold">{f.rotulo}</td>
                          <td className="py-2.5 text-right tabular-nums">{f.visitas}</td>
                          <td className="py-2.5 text-right tabular-nums">{f.conv}</td>
                          <td className="py-2.5 text-right font-bold tabular-nums" style={{ color: alerta ? COR_ALERTA : COR_LEADS }}>
                            {f.taxa === null ? "—" : `${f.taxa.toFixed(1)}%`}
                            {alerta ? " ⚠" : ""}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                ⚠ = página com tráfego e zero conversão na janela — é aqui que vale mexer primeiro.
              </p>
            </Cartao>

            {/* Masterclass: perfis e dores */}
            <div className="grid gap-5 lg:grid-cols-2">
              <Cartao titulo={`Masterclass · perfis (${calculado.leadsMc.length} leads)`} icone={Users}>
                <Barras dados={calculado.porPerfil} cor={COR_LEADS} />
              </Cartao>
              <Cartao titulo="Masterclass · como usam IA hoje">
                <Barras dados={calculado.porUso} />
              </Cartao>
              <Cartao titulo="Empresas · investimento em IA">
                <Barras dados={calculado.porInvest} cor={COR_ALERTA} />
              </Cartao>
              <Cartao titulo="Pessoas · objetivo com a formação">
                <Barras dados={calculado.porObjetivo} />
              </Cartao>
              <Cartao titulo="Maturidade em agentes / MCP / AGI">
                <Barras dados={calculado.porAgentes} cor={COR_LEADS} />
              </Cartao>
              <Cartao titulo="Leads por canal de origem">
                <Barras dados={calculado.porCanalLead} />
              </Cartao>
            </div>

            {/* Aquisição */}
            <div className="grid gap-5 lg:grid-cols-2">
              <Cartao titulo="Visitas por canal (src)">
                <Barras dados={dados.canais.map((c) => [c.source, c.visitas])} />
              </Cartao>
              <Cartao titulo="Páginas mais visitadas">
                <Barras dados={dados.visitasPath.slice(0, 10).map((v) => [v.path, v.visitas])} />
              </Cartao>
              <Cartao titulo="Eventos do Kit do Agente">
                <Barras dados={dados.eventosKit.map((e) => [e.evento, e.total])} cor={COR_LEADS} />
              </Cartao>
              <Cartao titulo="Outros funis na janela">
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between"><span>Candidaturas Trajetória</span><b className="tabular-nums">{dados.trajetorias.reduce((s, t) => s + t.total, 0)}</b></li>
                  <li className="flex justify-between"><span>Diagnósticos Impulso</span><b className="tabular-nums">{dados.impulso}</b></li>
                  <li className="flex justify-between"><span>Diagnósticos de maturidade{dados.maturidade.mediaScore !== null ? ` (média ${dados.maturidade.mediaScore})` : ""}</span><b className="tabular-nums">{dados.maturidade.total}</b></li>
                  <li className="flex justify-between"><span>Pedidos de palestra</span><b className="tabular-nums">{dados.pedidosPalestra.reduce((s, p) => s + p.total, 0)}</b></li>
                  <li className="flex justify-between"><span>Interesse em cursos</span><b className="tabular-nums">{dados.interesseCursos}</b></li>
                </ul>
              </Cartao>
            </div>

            {/* Últimos leads */}
            <Cartao titulo="Últimos leads (até 500 na janela)">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-[0.12em] text-slate-400">
                      <th className="pb-2">Quando</th>
                      <th className="pb-2">Nome</th>
                      <th className="pb-2">Rota</th>
                      <th className="pb-2">Persona</th>
                      <th className="pb-2">Perfil</th>
                      <th className="pb-2">Origem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dados.leads.slice(0, 30).map((l, i) => (
                      <tr key={`${l.name}-${i}`} className="border-t border-slate-100">
                        <td className="py-2 tabular-nums text-slate-500">{diaISO(l.createdAt)}</td>
                        <td className="py-2 font-semibold">{l.name}</td>
                        <td className="py-2">{l.route}</td>
                        <td className="py-2">{l.persona}</td>
                        <td className="py-2 text-xs">
                          {l.interest?.startsWith("mc-perfil:")
                            ? (PERFIL_LABEL[l.interest.slice(10)] ?? l.interest.slice(10))
                            : "—"}
                        </td>
                        <td className="py-2">{l.source}{l.campaign ? ` · ${l.campaign}` : ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Cartao>
          </>
        )}
      </main>
    </div>
  );
}
