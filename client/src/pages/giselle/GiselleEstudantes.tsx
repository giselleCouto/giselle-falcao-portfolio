// Estudantes da Turma 01 (/painel/estudantes) — página protegida da Giselle.
// Mostra cada pessoa × curso que passou pelo checkout da Voomp: quem pagou
// (com número de matrícula) e quem não finalizou (abandonou o checkout, gerou
// Pix/boleto e não pagou, teve o cartão recusado), além de reembolsos.
// Dados chegam pelo webhook da Voomp (server/voompWebhook.ts). Mesma chave do
// Painel do Funil (DIGEST_TOKEN), validada no servidor; página noindex.

import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Download, GraduationCap, KeyRound, LogOut, MapPin, RadioTower, RefreshCw, Search, Users } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { CURSOS_VOOMP, STATUS_INSCRICAO, cursoVoomp, type StatusInscricao } from "@shared/voomp";
import { Barras, Cartao, KEY_STORAGE, Tile } from "./GisellePainel";
import GiselleEstudanteCartao from "./GiselleEstudanteCartao";
import GiselleEstudantesAcompanhamento from "./GiselleEstudantesAcompanhamento";
import { Selo, baixarCsv, contar, dataHora, linkWhatsApp, reais, statusDe, type Inscricao } from "./estudantesUtil";

const COR_PAGO = "#0f9d8f";
const COR_NAO = "#c2410c";
const COR_NEUTRA = "#6b21a8";

const ORDEM_STATUS: StatusInscricao[] = [
  "pago",
  "aguardando_pagamento",
  "abandonado",
  "recusado",
  "nao_pago",
  "reembolsado",
  "chargeback",
  "outro",
];

type FiltroSituacao = "todas" | "finalizaram" | "nao-finalizaram" | StatusInscricao;
type Aba = "inscricoes" | "acompanhamento";

/** /painel/alunos abre direto no acompanhamento do curso. */
const abaInicial = (): Aba => {
  try {
    return window.location.pathname.includes("/alunos") ? "acompanhamento" : "inscricoes";
  } catch {
    return "inscricoes";
  }
};

export default function GiselleEstudantes() {
  const [chave, setChave] = useState<string>(() => {
    try {
      return localStorage.getItem(KEY_STORAGE) ?? "";
    } catch {
      return "";
    }
  });
  const [entrada, setEntrada] = useState("");
  const [curso, setCurso] = useState<string>("todos");
  const [situacao, setSituacao] = useState<FiltroSituacao>("todas");
  const [busca, setBusca] = useState("");
  const [aba, setAba] = useState<Aba>(abaInicial);
  const [aberto, setAberto] = useState<number | null>(null);
  const [cpfCompleto, setCpfCompleto] = useState(false);

  const query = trpc.academy.estudantes.useQuery(
    { token: chave },
    { enabled: chave.length > 0, retry: false, refetchOnWindowFocus: false }
  );
  const documentos = trpc.academy.documentosEstudantes.useMutation();
  const agora = useMemo(() => new Date(), [query.data]);
  const buscarDocumentos = async (ids: number[]) =>
    new Map((await documentos.mutateAsync({ token: chave, ids })).map((d) => [d.id, d.documento] as const));

  const entrar = () => {
    const k = entrada.trim();
    if (!k) return;
    try {
      localStorage.setItem(KEY_STORAGE, k);
    } catch {
      /* segue só em memória */
    }
    setChave(k);
  };
  const sair = () => {
    try {
      localStorage.removeItem(KEY_STORAGE);
    } catch {
      /* sem storage */
    }
    setChave("");
    setEntrada("");
  };

  const calculado = useMemo(() => {
    const todas = (query.data?.inscricoes ?? []) as Inscricao[];
    const doCurso = curso === "todos" ? todas : todas.filter((i) => i.productId === curso);
    const pagas = doCurso.filter((i) => i.status === "pago");
    const naoFinalizaram = doCurso.filter((i) => STATUS_INSCRICAO[statusDe(i.status)].finalizou === false);
    const reembolsos = doCurso.filter((i) => i.status === "reembolsado" || i.status === "chargeback");

    const termo = busca.trim().toLowerCase();
    const termoDigitos = termo.replace(/\D/g, "");
    const filtradas = doCurso.filter((i) => {
      const st = statusDe(i.status);
      if (situacao === "finalizaram" && STATUS_INSCRICAO[st].finalizou !== true) return false;
      if (situacao === "nao-finalizaram" && STATUS_INSCRICAO[st].finalizou !== false) return false;
      if (situacao !== "todas" && situacao !== "finalizaram" && situacao !== "nao-finalizaram" && st !== situacao) return false;
      if (!termo) return true;
      const alvo = [i.name, i.email, i.matricula, i.city].filter(Boolean).join(" ").toLowerCase();
      const digitos = `${i.documentoMascarado ?? ""} ${i.phone ?? ""}`.replace(/\D/g, "");
      return alvo.includes(termo) || (termoDigitos.length >= 3 && digitos.includes(termoDigitos));
    });

    // Curso × situação (sempre com todos os cursos, para comparar a distribuição)
    const idsCursos = Array.from(new Set([...Object.keys(CURSOS_VOOMP), ...todas.map((i) => i.productId)]));
    const porCurso = idsCursos.map((id) => {
      const doId = todas.filter((i) => i.productId === id);
      const contagem = Object.fromEntries(ORDEM_STATUS.map((s) => [s, doId.filter((i) => statusDe(i.status) === s).length])) as Record<
        StatusInscricao,
        number
      >;
      const total = doId.length;
      return {
        id,
        nome: cursoVoomp(id, doId[0]?.productName).nome,
        contagem,
        total,
        taxa: total > 0 ? (contagem.pago / total) * 100 : null,
        receita: doId.filter((i) => i.status === "pago").reduce((s, i) => s + (i.amountCents ?? 0), 0),
      };
    });

    return {
      todas,
      doCurso,
      filtradas,
      pagas,
      naoFinalizaram,
      reembolsos,
      receita: pagas.reduce((s, i) => s + (i.amountCents ?? 0), 0),
      porCurso,
      ondeParam: contar(naoFinalizaram, (i) => STATUS_INSCRICAO[statusDe(i.status)].rotulo),
      porUf: contar(pagas, (i) => i.uf || "sem UF"),
      porCidade: contar(pagas, (i) => (i.city ? `${i.city}${i.uf ? ` / ${i.uf}` : ""}` : null)).slice(0, 10),
      porMetodo: contar(pagas, (i) => i.method || "não informado"),
      porOrigem: contar(doCurso, (i) => i.utmSource || "sem origem"),
      porCupom: contar(pagas, (i) => i.coupon || "sem cupom"),
    };
  }, [query.data, curso, situacao, busca]);

  const exportar = async () => {
    const cpfs = cpfCompleto ? await buscarDocumentos(calculado.filtradas.map((i) => i.id)) : null;
    const cabecalho = [
      "Matrícula", "Situação", "Finalizou", "Curso", "Oferta", "Nome", "E-mail", "Telefone", "CPF/CNPJ", "CEP",
      "Cidade", "UF", "Valor (R$)", "Forma de pagamento", "Parcelas", "Cupom", "Motivo da recusa", "Origem (utm_source)",
      "Campanha (utm_campaign)", "Conteúdo (utm_content)", "Primeiro aviso", "Último aviso", "Pago em", "Avisos recebidos",
    ];
    const linhas = calculado.filtradas.map((i) => {
      const st = statusDe(i.status);
      const fin = STATUS_INSCRICAO[st].finalizou;
      return [
        i.matricula, STATUS_INSCRICAO[st].rotulo, fin === true ? "sim" : fin === false ? "não" : "—",
        cursoVoomp(i.productId, i.productName).nome, i.offerName, i.name, i.email, i.phone,
        cpfs ? (cpfs.get(i.id) ?? "") : (i.documentoMascarado ?? ""), i.zipcode,
        i.city, i.uf, i.amountCents !== null ? (i.amountCents / 100).toFixed(2).replace(".", ",") : "", i.method,
        i.installments, i.coupon, i.refusedReason, i.utmSource, i.utmCampaign, i.utmContent, dataHora(i.firstEventAt),
        dataHora(i.lastEventAt), dataHora(i.paidAt), i.eventsCount,
      ];
    });
    const hoje = new Date().toISOString().slice(0, 10);
    baixarCsv(`estudantes-nokahi-${hoje}.csv`, [cabecalho, ...linhas]);
  };

  // ── porta de entrada ───────────────────────────────────────────────────────
  if (!chave || (query.isError && query.error?.data?.code === "UNAUTHORIZED")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fc] px-4">
        <div className="w-full max-w-sm rounded-3xl border border-slate-200/70 bg-white p-7 text-center shadow-[0_18px_50px_rgba(26,19,51,0.08)]">
          <KeyRound className="mx-auto size-8 text-[#6b21a8]" />
          <h1 className="mt-3 font-baloo text-xl font-bold text-[#1a1333]">Estudantes · Turma 01</h1>
          <p className="mt-1 text-sm text-slate-500">Área restrita da Giselle. Use a mesma chave do Painel do Funil.</p>
          {query.isError ? (
            <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">
              Chave inválida — confira e tente de novo.
            </p>
          ) : null}
          <input
            type="password"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && entrar()}
            placeholder="Chave de acesso"
            className="mt-4 w-full rounded-2xl border-2 border-slate-200 px-4 py-3 text-center text-sm focus:border-[#8b5cf6] focus:outline-none"
          />
          <button
            type="button"
            disabled={!entrada.trim()}
            onClick={entrar}
            className="mt-3 w-full rounded-full bg-[#1a1333] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#6b21a8] disabled:opacity-40"
          >
            Entrar
          </button>
          <Link href="/painel" className="mt-4 block text-xs text-slate-400 underline">
            Ir para o Painel do Funil
          </Link>
        </div>
      </div>
    );
  }

  const dados = query.data;
  const pessoas = calculado.doCurso.length;

  return (
    <div className="min-h-screen bg-[#f7f8fc] pb-16 text-[#1a1333]">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur">
        <div className="container flex h-14 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/painel" className="shrink-0 text-xs font-bold text-slate-400 hover:text-[#6b21a8]">
              ← Funil
            </Link>
            <p className="truncate font-baloo text-sm font-bold uppercase tracking-[0.12em]">Estudantes · Turma 01</p>
          </div>
          <div className="flex items-center gap-2">
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
            <p className="text-sm font-bold text-rose-700">Não consegui carregar os estudantes.</p>
            <p className="mt-1 text-xs text-rose-600">{query.error?.message || "Banco indisponível ou sem conexão."}</p>
            <button
              type="button"
              onClick={() => void query.refetch()}
              className="mt-4 rounded-full bg-[#1a1333] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#6b21a8]"
            >
              Tentar de novo
            </button>
          </div>
        ) : query.isLoading || !dados ? (
          <p className="py-20 text-center text-sm text-slate-400">Carregando estudantes…</p>
        ) : (
          <>
            {/* Abas */}
            <div role="tablist" aria-label="Visões" className="flex gap-1 rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-200/70 sm:w-fit">
              {(
                [
                  ["inscricoes", "Inscrições (checkout)"],
                  ["acompanhamento", "Acompanhamento do curso"],
                ] as [Aba, string][]
              ).map(([id, rotulo]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={aba === id}
                  onClick={() => setAba(id)}
                  className={`flex-1 rounded-full px-4 py-2 text-xs font-bold transition sm:flex-none ${
                    aba === id ? "bg-[#1a1333] text-white" : "text-slate-500 hover:bg-violet-50"
                  }`}
                >
                  {rotulo}
                </button>
              ))}
            </div>

            {aba === "acompanhamento" ? (
              <GiselleEstudantesAcompanhamento
                token={chave}
                dados={dados}
                agora={agora}
                onAbrir={setAberto}
                onAtualizar={() => void query.refetch()}
                buscarDocumentos={buscarDocumentos}
              />
            ) : (
            <>
            {/* Filtros */}
            <div className="flex flex-col gap-2 rounded-3xl border border-slate-200/70 bg-white p-3 sm:flex-row sm:items-center">
              <select
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                aria-label="Curso"
                className="rounded-2xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-semibold focus:border-[#8b5cf6] focus:outline-none"
              >
                <option value="todos">Todos os cursos</option>
                {calculado.porCurso.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
              <select
                value={situacao}
                onChange={(e) => setSituacao(e.target.value as FiltroSituacao)}
                aria-label="Situação"
                className="rounded-2xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-semibold focus:border-[#8b5cf6] focus:outline-none"
              >
                <option value="todas">Todas as situações</option>
                <option value="finalizaram">Finalizaram (pagas)</option>
                <option value="nao-finalizaram">Não finalizaram</option>
                {ORDEM_STATUS.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_INSCRICAO[s].rotulo}
                  </option>
                ))}
              </select>
              <label className="flex flex-1 items-center gap-2 rounded-2xl border-2 border-slate-200 px-3 py-2 focus-within:border-[#8b5cf6]">
                <Search className="size-4 shrink-0 text-slate-400" />
                <input
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Nome, e-mail, matrícula, CPF, telefone ou cidade"
                  className="w-full bg-transparent text-sm focus:outline-none"
                />
              </label>
            </div>

            {/* Visão geral */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
              <Tile rotulo="Pessoas registradas" valor={String(pessoas)} detalhe="passaram pelo checkout" />
              <Tile rotulo="Inscrições pagas" valor={String(calculado.pagas.length)} detalhe="com número de matrícula" />
              <Tile rotulo="Não finalizaram" valor={String(calculado.naoFinalizaram.length)} detalhe="abandono, Pix/boleto, recusa" />
              <Tile
                rotulo="Taxa de finalização"
                valor={`${pessoas > 0 ? ((calculado.pagas.length / pessoas) * 100).toFixed(1) : "0"}%`}
                detalhe="pagas ÷ pessoas"
              />
              <Tile
                rotulo="Receita paga"
                valor={reais(calculado.receita)}
                detalhe={calculado.reembolsos.length ? `${calculado.reembolsos.length} reembolso(s) fora da conta` : "valor bruto"}
              />
            </div>

            {/* Distribuição por curso */}
            <Cartao titulo="Distribuição por curso e situação" icone={GraduationCap}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-[0.1em] text-slate-400">
                      <th className="pb-2">Curso</th>
                      <th className="pb-2 text-right">Pagas</th>
                      <th className="pb-2 text-right">Aguardando</th>
                      <th className="pb-2 text-right">Abandonou</th>
                      <th className="pb-2 text-right">Recusado</th>
                      <th className="pb-2 text-right">Não pagou</th>
                      <th className="pb-2 text-right">Reembolso</th>
                      <th className="pb-2 text-right">Pessoas</th>
                      <th className="pb-2 text-right">Finalização</th>
                      <th className="pb-2 text-right">Receita</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculado.porCurso.map((c) => (
                      <tr key={c.id} className="border-t border-slate-100">
                        <td className="py-2.5 font-semibold">{c.nome}</td>
                        <td className="py-2.5 text-right font-bold tabular-nums" style={{ color: COR_PAGO }}>{c.contagem.pago}</td>
                        <td className="py-2.5 text-right tabular-nums">{c.contagem.aguardando_pagamento}</td>
                        <td className="py-2.5 text-right tabular-nums">{c.contagem.abandonado}</td>
                        <td className="py-2.5 text-right tabular-nums">{c.contagem.recusado}</td>
                        <td className="py-2.5 text-right tabular-nums">{c.contagem.nao_pago}</td>
                        <td className="py-2.5 text-right tabular-nums">{c.contagem.reembolsado + c.contagem.chargeback}</td>
                        <td className="py-2.5 text-right tabular-nums">{c.total}</td>
                        <td className="py-2.5 text-right font-bold tabular-nums">{c.taxa === null ? "—" : `${c.taxa.toFixed(1)}%`}</td>
                        <td className="py-2.5 text-right tabular-nums">{reais(c.receita)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Cartao>

            <div className="grid gap-5 lg:grid-cols-2">
              <Cartao titulo="Onde as pessoas param" icone={Users}>
                <Barras dados={calculado.ondeParam} cor={COR_NAO} />
              </Cartao>
              <Cartao titulo="Inscrições pagas por estado" icone={MapPin}>
                <Barras dados={calculado.porUf} cor={COR_PAGO} />
              </Cartao>
              <Cartao titulo="Cidades com mais inscrições pagas" icone={MapPin}>
                <Barras dados={calculado.porCidade} cor={COR_PAGO} />
              </Cartao>
              <Cartao titulo="Origem (utm_source) de quem passou pelo checkout">
                <Barras dados={calculado.porOrigem} cor={COR_NEUTRA} />
              </Cartao>
              <Cartao titulo="Forma de pagamento (pagas)">
                <Barras dados={calculado.porMetodo} cor={COR_NEUTRA} />
              </Cartao>
              <Cartao titulo="Cupons nas inscrições pagas">
                <Barras dados={calculado.porCupom} cor={COR_NEUTRA} />
              </Cartao>
            </div>

            {/* Lista */}
            <Cartao titulo={`Estudantes (${calculado.filtradas.length}${calculado.filtradas.length > 300 ? " · mostrando 300; a planilha leva todos" : ""})`} icone={Users}>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => void exportar()}
                  disabled={calculado.filtradas.length === 0}
                  className="flex items-center gap-1.5 rounded-full bg-[#1a1333] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#6b21a8] disabled:opacity-40"
                >
                  <Download className="size-3.5" />
                  Exportar planilha
                </button>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <input type="checkbox" checked={cpfCompleto} onChange={(e) => setCpfCompleto(e.target.checked)} />
                  incluir CPF completo
                </label>
                <span className="text-[11px] text-slate-400">Clique numa linha para abrir o cartão do estudante.</span>
              </div>
              {calculado.filtradas.length === 0 ? (
                <p className="text-sm text-slate-400">
                  {calculado.todas.length === 0
                    ? "Ninguém registrado ainda. Assim que a Voomp mandar o primeiro aviso (pagamento, Pix gerado ou checkout abandonado), a pessoa aparece aqui."
                    : "Nenhum estudante com esses filtros."}
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[980px] text-sm">
                    <thead>
                      <tr className="text-left text-[11px] uppercase tracking-[0.1em] text-slate-400">
                        <th className="pb-2">Matrícula</th>
                        <th className="pb-2">Estudante</th>
                        <th className="pb-2">Contato</th>
                        <th className="pb-2">Curso</th>
                        <th className="pb-2">Situação</th>
                        <th className="pb-2 text-right">Valor</th>
                        <th className="pb-2">Local</th>
                        <th className="pb-2">Origem</th>
                        <th className="pb-2">Último aviso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculado.filtradas.slice(0, 300).map((i) => {
                        const st = statusDe(i.status);
                        const wa = linkWhatsApp(i.phone);
                        return (
                          <tr
                            key={i.id}
                            onClick={() => setAberto(i.id)}
                            className="cursor-pointer border-t border-slate-100 align-top hover:bg-violet-50/50"
                          >
                            <td className="py-2.5 font-mono text-xs font-bold">{i.matricula ?? "—"}</td>
                            <td className="py-2.5">
                              <p className="font-semibold">{i.name || "—"}</p>
                              <p className="text-xs text-slate-400">{i.documentoMascarado ?? ""}</p>
                            </td>
                            <td className="py-2.5 text-xs">
                              <p>{i.email}</p>
                              {i.phone ? (
                                wa ? (
                                  <a
                                    href={wa}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="font-semibold text-[#0f766e] underline"
                                  >
                                    {i.phone}
                                  </a>
                                ) : (
                                  <p>{i.phone}</p>
                                )
                              ) : null}
                            </td>
                            <td className="py-2.5 text-xs">
                              <p className="font-semibold">{cursoVoomp(i.productId, i.productName).codigo}</p>
                              {i.coupon ? <p className="text-slate-400">cupom {i.coupon}</p> : null}
                            </td>
                            <td className="py-2.5">
                              <Selo status={st} />
                              {i.refusedReason && st !== "pago" ? <p className="mt-1 text-[11px] text-slate-400">{i.refusedReason}</p> : null}
                            </td>
                            <td className="py-2.5 text-right text-xs tabular-nums">
                              {i.amountCents !== null ? reais(i.amountCents) : "—"}
                              {i.method ? <p className="text-slate-400">{i.method}{i.installments && i.installments > 1 ? ` · ${i.installments}×` : ""}</p> : null}
                            </td>
                            <td className="py-2.5 text-xs">{[i.city, i.uf].filter(Boolean).join(" / ") || "—"}</td>
                            <td className="py-2.5 text-xs">{i.utmSource ?? "—"}{i.utmCampaign ? <p className="text-slate-400">{i.utmCampaign}</p> : null}</td>
                            <td className="py-2.5 text-xs tabular-nums text-slate-500">{dataHora(i.lastEventAt)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Cartao>

            {/* Saúde da integração */}
            <Cartao titulo={`Últimos avisos da Voomp (${dados.totalEventos} no total)`} icone={RadioTower}>
              {dados.eventos.length === 0 ? (
                <p className="text-sm text-slate-400">
                  Nenhum aviso recebido ainda. Confira em Voomp → Integrações → Webhook se a URL do site está salva e os eventos estão ligados.
                </p>
              ) : (
                <ul className="divide-y divide-slate-100 text-xs">
                  {dados.eventos.map((e) => (
                    <li key={e.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2">
                      <span className="tabular-nums text-slate-400">{dataHora(e.receivedAt)}</span>
                      <Selo status={statusDe(e.status)} />
                      <span className="font-semibold">{e.email ?? "sem e-mail"}</span>
                      <span className="text-slate-400">
                        {cursoVoomp(e.productId).codigo} · {e.evento ?? "evento"}{e.statusVoomp ? ` · ${e.statusVoomp}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Cartao>
            </>
            )}
          </>
        )}
      </main>

      {aberto !== null ? (
        <GiselleEstudanteCartao
          token={chave}
          inscricaoId={aberto}
          onFechar={() => setAberto(null)}
          onSalvo={() => void query.refetch()}
        />
      ) : null}
    </div>
  );
}
