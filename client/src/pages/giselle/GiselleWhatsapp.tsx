// Atendimento do WhatsApp da NOKAHI EDU (/painel/whatsapp) — página protegida da Giselle.
// Mostra as conversas do número (31) 98228-0551 com o agente de IA, os repasses
// para a Giselle (pagamento, reembolso, Anhanguera, empresa, reclamação…) e
// deixa pausar ou devolver cada conversa ao agente. Tem também um simulador
// para testar respostas sem mandar nada pelo WhatsApp.
// Mesma chave do Painel do Funil (DIGEST_TOKEN), validada no servidor; página noindex.

import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Bot, FlaskConical, KeyRound, LogOut, MessageCircle, Pause, Play, RefreshCw, Send, UserRound } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Cartao, KEY_STORAGE, Tile } from "./GisellePainel";

const NOME_CATEGORIA: Record<string, string> = {
  pagamento: "Pagamento com problema",
  reembolso: "Reembolso ou cancelamento",
  anhanguera: "Documentos da Anhanguera",
  empresa: "Empresa / B2B",
  reclamacao: "Reclamação",
  pediu_humano: "Pediu para falar com você",
  nao_sei: "Sem resposta na base",
  outro: "Outro assunto",
};

const quando = (d: Date | string | null | undefined) =>
  d ? new Date(d).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "—";

const pausada = (ate: Date | string | null | undefined) => Boolean(ate && new Date(ate).getTime() > Date.now());

type Filtro = "todas" | "repasse" | "pausadas";
type MsgSimulada = { autor: "cliente" | "agente"; texto: string; nota?: string; ignorada?: boolean };

const DATAS_SIMULADAS: { rotulo: string; valor: string | undefined }[] = [
  { rotulo: "Hoje", valor: undefined },
  { rotulo: "10/12/2026 (condição vale)", valor: "2026-12-10T15:00:00.000Z" },
  { rotulo: "15/12/2026 (valor regular)", valor: "2026-12-15T15:00:00.000Z" },
  { rotulo: "25/01/2027 (inscrições fechadas)", valor: "2027-01-25T15:00:00.000Z" },
];

export default function GiselleWhatsapp() {
  const [chave, setChave] = useState<string>(() => {
    try {
      return localStorage.getItem(KEY_STORAGE) ?? "";
    } catch {
      return "";
    }
  });
  const [entrada, setEntrada] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [aberta, setAberta] = useState<number | null>(() => {
    try {
      const c = Number(new URLSearchParams(window.location.search).get("c"));
      return Number.isFinite(c) && c > 0 ? c : null;
    } catch {
      return null;
    }
  });

  const lista = trpc.academy.whatsappConversas.useQuery(
    { token: chave },
    { enabled: chave.length > 0, retry: false, refetchInterval: 20_000, refetchOnWindowFocus: true }
  );
  const conversa = trpc.academy.whatsappConversa.useQuery(
    { token: chave, id: aberta ?? 0 },
    { enabled: chave.length > 0 && aberta !== null, retry: false, refetchInterval: 15_000 }
  );
  const acao = trpc.academy.whatsappAcao.useMutation({
    onSuccess: () => {
      void lista.refetch();
      void conversa.refetch();
    },
  });

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

  const conversas = lista.data?.conversas ?? [];
  const filtradas = useMemo(
    () =>
      conversas.filter((c) =>
        filtro === "repasse" ? c.repasse?.status === "aberto" : filtro === "pausadas" ? pausada(c.pausadoAte) : true
      ),
    [conversas, filtro]
  );

  if (!chave || (lista.isError && lista.error?.data?.code === "UNAUTHORIZED")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fc] px-4">
        <div className="w-full max-w-sm rounded-3xl border border-slate-200/70 bg-white p-7 text-center shadow-[0_18px_50px_rgba(26,19,51,0.08)]">
          <KeyRound className="mx-auto size-8 text-[#6b21a8]" />
          <h1 className="mt-3 font-baloo text-xl font-bold text-[#1a1333]">WhatsApp · Atendimento</h1>
          <p className="mt-1 text-sm text-slate-500">Área restrita da Giselle. Use a mesma chave do Painel do Funil.</p>
          {lista.isError ? (
            <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">Chave inválida — confira e tente de novo.</p>
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

  const cfg = lista.data?.configuracao;
  const abertos = conversas.filter((c) => c.repasse?.status === "aberto").length;
  const nPausadas = conversas.filter((c) => pausada(c.pausadoAte)).length;
  const agentePausado = lista.data?.agentePausado ?? false;

  return (
    <div className="min-h-screen bg-[#f7f8fc] pb-16 text-[#1a1333]">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur">
        <div className="container flex h-14 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/painel" className="shrink-0 text-xs font-bold text-slate-400 hover:text-[#6b21a8]">
              ← Funil
            </Link>
            <p className="truncate font-baloo text-sm font-bold uppercase tracking-[0.12em]">WhatsApp · Atendimento</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void lista.refetch()}
              aria-label="Atualizar"
              className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-violet-100"
            >
              <RefreshCw className={`size-4 ${lista.isFetching ? "animate-spin" : ""}`} />
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
        <div className="grid gap-3 sm:grid-cols-4">
          <Tile rotulo="Conversas" valor={String(conversas.length)} />
          <Tile rotulo="Repasses abertos" valor={String(abertos)} detalhe="esperando você" />
          <Tile rotulo="Pausadas" valor={String(nPausadas)} detalhe="agente quieto" />
          <div className="rounded-2xl border border-slate-200/70 bg-white px-5 py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Agente</p>
            <p className={`mt-1 font-baloo text-xl font-bold ${!cfg?.agenteLigado || agentePausado ? "text-rose-600" : "text-[#0f766e]"}`}>
              {!cfg?.agenteLigado ? "Desligado no Railway" : agentePausado ? "Pausado" : "Respondendo"}
            </p>
            {cfg?.agenteLigado ? (
              <button
                type="button"
                disabled={acao.isPending}
                onClick={() => acao.mutate({ token: chave, acao: agentePausado ? "religar_agente" : "pausar_agente" })}
                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#1a1333] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#6b21a8]"
              >
                {agentePausado ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
                {agentePausado ? "Religar em todas" : "Pausar em todas"}
              </button>
            ) : null}
          </div>
        </div>

        {cfg ? (
          <p className="rounded-2xl bg-white px-4 py-3 text-xs text-slate-500">
            Configuração: Claude {cfg.claude ? "✓" : "✗ (falta ANTHROPIC_API_KEY)"} · WhatsApp{" "}
            {cfg.whatsapp ? `✓ (${cfg.provedor})` : "✗ (falta WHATSAPP_TOKEN)"} · webhook {cfg.webhook ? "✓" : "✗"} · aviso no seu
            WhatsApp {cfg.avisoParaGiselle ? (cfg.modeloDeAviso ? "✓ (modelo aprovado)" : "✓ (texto simples, só dentro de 24 h)") : "✗"}
          </p>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
          <Cartao titulo="Conversas" icone={MessageCircle}>
            <div className="mb-3 flex gap-1.5">
              {(["todas", "repasse", "pausadas"] as Filtro[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFiltro(f)}
                  className={`rounded-full px-3 py-1 text-xs font-bold ${filtro === f ? "bg-[#1a1333] text-white" : "bg-slate-100 text-slate-500"}`}
                >
                  {f === "todas" ? "Todas" : f === "repasse" ? "Com repasse" : "Pausadas"}
                </button>
              ))}
            </div>
            {lista.isLoading ? <p className="text-sm text-slate-400">Carregando…</p> : null}
            {!lista.isLoading && !filtradas.length ? <p className="text-sm text-slate-400">Nenhuma conversa por aqui ainda.</p> : null}
            <ul className="max-h-[620px] space-y-1.5 overflow-y-auto">
              {filtradas.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setAberta(c.id)}
                    className={`w-full rounded-2xl px-3 py-2.5 text-left transition ${aberta === c.id ? "bg-violet-100" : "hover:bg-slate-50"}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-bold">{c.nome || `+${c.waId}`}</p>
                      <span className="shrink-0 text-[11px] text-slate-400">{quando(c.ultimaMensagemEm)}</span>
                    </div>
                    <p className="truncate text-xs text-slate-500">
                      {c.ultima ? `${c.ultima.autor === "cliente" ? "" : c.ultima.autor === "giselle" ? "Você: " : "Agente: "}${c.ultima.texto}` : ""}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {c.repasse?.status === "aberto" ? (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                          {NOME_CATEGORIA[c.repasse.categoria] ?? c.repasse.categoria}
                        </span>
                      ) : null}
                      {pausada(c.pausadoAte) ? (
                        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600">agente pausado</span>
                      ) : null}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </Cartao>

          <Cartao titulo={conversa.data ? conversa.data.conversa.nome || `+${conversa.data.conversa.waId}` : "Conversa"} icone={UserRound}>
            {aberta === null ? <p className="text-sm text-slate-400">Escolha uma conversa ao lado.</p> : null}
            {conversa.data ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <a
                    href={`https://wa.me/${conversa.data.conversa.waId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#0f766e] px-3 py-1.5 font-bold text-white"
                  >
                    +{conversa.data.conversa.waId}
                  </a>
                  {pausada(conversa.data.conversa.pausadoAte) ? (
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 font-semibold text-slate-600">
                      Agente quieto até {quando(conversa.data.conversa.pausadoAte)}
                    </span>
                  ) : (
                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700">Agente responde nesta conversa</span>
                  )}
                  <button
                    type="button"
                    disabled={acao.isPending}
                    onClick={() => acao.mutate({ token: chave, acao: "devolver_ao_agente", conversaId: conversa.data!.conversa.id })}
                    className="rounded-full bg-[#1a1333] px-3 py-1.5 font-bold text-white hover:bg-[#6b21a8]"
                  >
                    Devolver ao agente
                  </button>
                  <button
                    type="button"
                    disabled={acao.isPending}
                    onClick={() => acao.mutate({ token: chave, acao: "pausar_conversa", conversaId: conversa.data!.conversa.id, horas: 24 })}
                    className="rounded-full bg-slate-100 px-3 py-1.5 font-bold text-slate-600 hover:bg-slate-200"
                  >
                    Pausar 24 h
                  </button>
                  {conversa.data.repasses.some((r) => r.status !== "resolvido") ? (
                    <button
                      type="button"
                      disabled={acao.isPending}
                      onClick={() => acao.mutate({ token: chave, acao: "resolver_repasse", conversaId: conversa.data!.conversa.id })}
                      className="rounded-full bg-amber-100 px-3 py-1.5 font-bold text-amber-800 hover:bg-amber-200"
                    >
                      Marcar repasse como resolvido
                    </button>
                  ) : null}
                </div>

                {conversa.data.repasses.length ? (
                  <ul className="space-y-1.5">
                    {conversa.data.repasses.map((r) => (
                      <li key={r.id} className="rounded-2xl bg-amber-50 px-3 py-2 text-xs text-amber-900">
                        <b>{NOME_CATEGORIA[r.categoria] ?? r.categoria}</b> · {r.status} · {quando(r.criadoEm)}
                        {r.avisadoEm ? " · você foi avisada" : r.avisoErro ? ` · aviso falhou: ${r.avisoErro}` : ""}
                        <p className="mt-0.5">{r.resumo}</p>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="max-h-[520px] space-y-2 overflow-y-auto rounded-2xl bg-[#efeae2] p-3">
                  {conversa.data.mensagens.map((m) => (
                    <div key={m.id} className={`flex ${m.direcao === "entrada" ? "justify-start" : "justify-end"}`}>
                      <div
                        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm shadow-sm ${
                          m.direcao === "entrada" ? "bg-white" : m.autor === "giselle" ? "bg-[#d9fdd3]" : "bg-[#ede9fe]"
                        }`}
                      >
                        <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {m.autor === "cliente" ? "Pessoa" : m.autor === "giselle" ? "Você" : m.autor === "agente" ? "Agente" : m.autor}
                          {" · "}
                          {quando(m.criadaEm)}
                          {m.status && m.direcao === "saida" ? ` · ${m.status}` : ""}
                        </p>
                        {m.texto}
                        {m.erro ? <p className="mt-1 text-[11px] font-semibold text-rose-600">{m.erro}</p> : null}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400">
                  Para responder, use o app WhatsApp Business no celular. Quando você responde, o agente fica quieto nesta conversa por algumas horas.
                </p>
              </div>
            ) : null}
          </Cartao>
        </div>

        <Simulador chave={chave} />
        <Avaliacao chave={chave} />
      </main>
    </div>
  );
}

function Avaliacao({ chave }: { chave: string }) {
  const avaliar = trpc.academy.whatsappAvaliar.useMutation();
  const r = avaliar.data;
  return (
    <Cartao titulo="Avaliação das respostas críticas (Claude de verdade)" icone={FlaskConical}>
      <p className="text-sm text-slate-500">
        Roda as perguntas de teste: preço com e sem cupom antes e depois de 12/12, links, certificado, quem não tem graduação, os
        repasses para você e as mensagens que não devem gastar a IA. Leva cerca de 1 minuto e custa menos de um centavo de dólar.
        Nada é enviado pelo WhatsApp.
      </p>
      <button
        type="button"
        disabled={avaliar.isPending}
        onClick={() => avaliar.mutate({ token: chave })}
        className="mt-3 rounded-full bg-[#1a1333] px-4 py-2 text-xs font-bold text-white hover:bg-[#6b21a8] disabled:opacity-40"
      >
        {avaliar.isPending ? "Rodando…" : "Rodar avaliação"}
      </button>
      {avaliar.error ? <p className="mt-3 text-xs font-semibold text-rose-600">{avaliar.error.message}</p> : null}
      {r ? (
        <div className="mt-4 space-y-2">
          <p className={`font-baloo text-lg font-bold ${r.passaram === r.total ? "text-[#0f766e]" : "text-amber-700"}`}>
            {r.passaram} de {r.total} passaram
          </p>
          <p className="text-xs text-slate-500">
            {r.semIa} de {r.total} foram resolvidas sem a IA (resposta pronta ou regra), com custo zero.
          </p>
          <ul className="space-y-1.5">
            {r.resultados.map((x) => (
              <li key={x.nome} className={`rounded-2xl px-3 py-2 text-xs ${x.passou ? "bg-emerald-50" : "bg-amber-50"}`}>
                <b>{x.passou ? "✓" : "✗"} {x.nome}</b> ·{" "}
                {x.tipo === "repasse" ? `repasse (${NOME_CATEGORIA[x.categoria ?? ""] ?? x.categoria})` : x.tipo === "fixa" ? "resposta pronta" : x.tipo}
                {x.usouIa ? ` · IA${x.tokens ? ` (${x.tokens.entrada + x.tokens.cacheLido} lidos, ${x.tokens.saida} escritos)` : ""}` : " · sem IA"}
                {x.problemas.length ? <p className="font-semibold text-amber-800">{x.problemas.join("; ")}</p> : null}
                <p className="mt-1 whitespace-pre-wrap text-slate-600">{x.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Cartao>
  );
}

function Simulador({ chave }: { chave: string }) {
  const [mensagens, setMensagens] = useState<MsgSimulada[]>([]);
  const [texto, setTexto] = useState("");
  const [data, setData] = useState<string | undefined>(undefined);
  const simular = trpc.academy.whatsappSimular.useMutation();

  useEffect(() => setMensagens([]), [data]);

  const enviar = async () => {
    const t = texto.trim();
    if (!t || simular.isPending) return;
    const historico = [...mensagens, { autor: "cliente" as const, texto: t }];
    setMensagens(historico);
    setTexto("");
    try {
      const r = await simular.mutateAsync({
        token: chave,
        data,
        mensagens: historico.filter((m) => !m.ignorada).map((m) => ({ autor: m.autor, texto: m.texto })),
      });
      if (r.tipo === "ignorar") {
        setMensagens([...historico, { autor: "agente", texto: "(sem resposta)", nota: `Não responde: ${r.motivo}. Custo zero.`, ignorada: true }]);
        return;
      }
      const nota =
        r.tipo === "repasse"
          ? `Repasse para você · ${NOME_CATEGORIA[r.categoria] ?? r.categoria} · ${r.origem} · resumo: ${r.resumo}`
          : r.tipo === "fixa"
            ? `Resposta pronta (${r.rota}), sem IA: custo zero.`
            : r.problemasCorrigidos.length
              ? `Resposta da IA, reescrita depois da conferência: ${r.problemasCorrigidos.join("; ")}`
              : `Resposta da IA${r.uso ? ` · ${r.uso.entrada + r.uso.cacheLido} tokens lidos, ${r.uso.saida} escritos` : ""}.`;
      setMensagens([...historico, { autor: "agente", texto: r.texto, nota }]);
    } catch (e) {
      setMensagens([...historico, { autor: "agente", texto: "(erro no simulador)", nota: String((e as Error).message) }]);
    }
  };

  return (
    <Cartao titulo="Testar o agente (nada é enviado pelo WhatsApp)" icone={FlaskConical}>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {DATAS_SIMULADAS.map((d) => (
          <button
            key={d.rotulo}
            type="button"
            onClick={() => setData(d.valor)}
            className={`rounded-full px-3 py-1 text-xs font-bold ${data === d.valor ? "bg-[#1a1333] text-white" : "bg-slate-100 text-slate-500"}`}
          >
            {d.rotulo}
          </button>
        ))}
        {mensagens.length ? (
          <button type="button" onClick={() => setMensagens([])} className="rounded-full px-3 py-1 text-xs font-bold text-rose-600">
            Limpar
          </button>
        ) : null}
      </div>
      <div className="max-h-[480px] space-y-2 overflow-y-auto rounded-2xl bg-[#efeae2] p-3">
        {!mensagens.length ? <p className="text-xs text-slate-500">Escreva como se fosse uma pessoa interessada nos cursos.</p> : null}
        {mensagens.map((m, i) => (
          <div key={i} className={`flex ${m.autor === "cliente" ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm shadow-sm ${m.autor === "cliente" ? "bg-white" : "bg-[#ede9fe]"}`}>
              {m.autor === "agente" ? <Bot className="mb-1 size-3.5 text-[#6b21a8]" /> : null}
              {m.texto}
              {m.nota ? <p className="mt-1 text-[11px] font-semibold text-amber-700">{m.nota}</p> : null}
            </div>
          </div>
        ))}
        {simular.isPending ? <p className="text-right text-xs text-slate-500">O agente está escrevendo…</p> : null}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && void enviar()}
          placeholder="Ex.: Quanto custa o MBA?"
          className="flex-1 rounded-full border-2 border-slate-200 px-4 py-2.5 text-sm focus:border-[#8b5cf6] focus:outline-none"
        />
        <button
          type="button"
          onClick={() => void enviar()}
          disabled={!texto.trim() || simular.isPending}
          className="flex size-11 items-center justify-center rounded-full bg-[#1a1333] text-white hover:bg-[#6b21a8] disabled:opacity-40"
          aria-label="Enviar"
        >
          <Send className="size-4" />
        </button>
      </div>
    </Cartao>
  );
}
