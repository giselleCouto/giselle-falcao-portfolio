import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  Award,
  CalendarDays,
  CheckCircle2,
  ListChecks,
  Loader2,
  MessageCircle,
  RotateCcw,
  Send,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { trackEvent } from "@/lib/eventos";
import { fluente } from "@/lib/fluenteData";
import { getAttribution } from "@/lib/tracking";
import { trpc } from "@/lib/trpc";
import {
  NNF_CAMPANHA,
  NNF_CANAIS,
  NNF_ROTA,
  condicaoPrimeiraTurmaAtiva,
  faixaDoPlacar,
  faqCondicao,
  getNivel,
  inscricaoUrl,
  inscricoesAbertas,
  nivelPeloPlacar,
  niveis,
  nnf,
  pendencias,
  precoAtual,
  teste,
  turma,
  whatsappUrl,
  type Nivel,
  type NivelId,
  type NnfCanal,
} from "@/lib/ninguemNasceFluenteData";

// Página do lançamento "Ninguém nasce fluente" (Turma 01). Conteúdo, preços e
// links pendentes em lib/ninguemNasceFluenteData.ts. A visita é registrada pelo
// rastreamento global (App.tsx), a escolha de nível e o teste viram eventos, e
// o contato vai para lead_contacts (leads.submit) com origem e campanha.

// Paleta NOKAHI EDU (a mesma da página /fluente e dos PDFs)
const INK = "#0f3141";
const TEAL = "#078aa7";
const MINT = "#61e8bf";

type Origem = "frase" | "teste" | "link";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const inputClass =
  "w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-[#0f3141] placeholder:text-slate-400 focus:border-[#078aa7] focus:outline-none";

/** "Agora" da página. Só no ambiente local, ?agora=2026-12-13 simula outra data. */
function agoraDaPagina(): number {
  if (import.meta.env.DEV && typeof window !== "undefined") {
    const v = new URLSearchParams(window.location.search).get("agora");
    if (v && /^\d{4}-\d{2}-\d{2}$/.test(v)) {
      const t = new Date(`${v}T12:00:00-03:00`).getTime();
      if (!Number.isNaN(t)) return t;
    }
  }
  return Date.now();
}

function nivelDoHash(): NivelId | null {
  if (typeof window === "undefined") return null;
  const m = window.location.hash.match(/^#nivel-([123])$/);
  return m ? (Number(m[1]) as NivelId) : null;
}

function rolarPara(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ------------------------------------------------------------------ cartões

function CartaoFrase({ nivel, ativo, onEscolher }: { nivel: Nivel; ativo: boolean; onEscolher: () => void }) {
  return (
    <button
      type="button"
      onClick={onEscolher}
      aria-pressed={ativo}
      data-cta={`frase-n${nivel.id}`}
      className={`group flex h-full flex-col rounded-[1.75rem] border-2 p-6 text-left transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#61e8bf]/50 ${
        ativo ? "bg-white" : "border-white/15 bg-white/[0.07] hover:border-white/40 hover:bg-white/[0.11]"
      }`}
      style={ativo ? { borderColor: MINT } : undefined}
    >
      <span className="flex items-center gap-3">
        <span
          className="flex size-10 items-center justify-center rounded-full font-baloo text-xl font-bold"
          style={ativo ? { backgroundColor: INK, color: MINT } : { backgroundColor: MINT, color: INK }}
        >
          {nivel.id}
        </span>
        <span
          className={`text-xs font-bold uppercase tracking-[0.2em] ${ativo ? "" : "text-white/80"}`}
          style={ativo ? { color: TEAL } : undefined}
        >
          Nível {nivel.id} · {nivel.rotulo}
        </span>
      </span>
      <span
        className={`mt-5 flex-1 font-baloo text-xl font-semibold leading-snug ${ativo ? "" : "text-white"}`}
        style={ativo ? { color: INK } : undefined}
      >
        “{nivel.frase}”
      </span>
      <span
        className={`mt-6 flex items-end justify-between gap-3 border-t pt-4 ${ativo ? "border-slate-200" : "border-white/15"}`}
      >
        <span>
          <span className={`block text-sm font-bold ${ativo ? "" : "text-white"}`} style={ativo ? { color: INK } : undefined}>
            {nivel.cursoCurto}
          </span>
          <span className={`block text-xs ${ativo ? "text-slate-500" : "text-slate-300"}`}>{nivel.tipo}</span>
        </span>
        <span
          className="inline-flex shrink-0 items-center gap-1 text-sm font-bold"
          style={{ color: ativo ? TEAL : MINT }}
        >
          {ativo ? "Escolhido" : "Sou eu"}
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </span>
      </span>
    </button>
  );
}

// ------------------------------------------------------------ painel do nível

function Preco({ nivel, agora }: { nivel: Nivel; agora: number }) {
  const primeira = condicaoPrimeiraTurmaAtiva(agora);
  const preco = precoAtual(nivel, agora);
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: TEAL }}>
        {primeira ? `Condição de primeira turma · até ${turma.fimCondicao}` : `Valor da ${turma.nome}`}
      </p>
      <p className="mt-2 font-baloo text-4xl font-bold leading-none" style={{ color: INK }}>
        {preco.avista} <span className="text-base font-semibold text-slate-500">à vista</span>
      </p>
      <p className="mt-2 text-sm text-slate-600">ou {preco.parcelado} no cartão</p>
      {primeira ? (
        <p className="mt-4 rounded-2xl bg-[#eef8f9] px-4 py-3 text-xs leading-5 text-slate-600">
          A partir de {turma.inicioRegular}: {nivel.precos.regular.avista} à vista ou {nivel.precos.regular.parcelado}.
          A condição de primeira turma não reabre.
        </p>
      ) : null}
    </div>
  );
}

function Botoes({ nivel, agora, canal }: { nivel: Nivel; agora: number; canal?: NnfCanal }) {
  const abertas = inscricoesAbertas(agora);
  const inscricao = inscricaoUrl(nivel.id, { agora, origem: canal ?? getAttribution().source });
  const whatsapp = whatsappUrl(nivel.id);
  const faltam = import.meta.env.DEV ? pendencias() : [];

  return (
    <div className="mt-6 space-y-3">
      {abertas ? (
        inscricao ? (
          <a
            href={inscricao}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={`inscricao-n${nivel.id}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-white transition hover:brightness-110"
            style={{ backgroundColor: INK }}
          >
            Quero me inscrever no nível {nivel.id}
            <ArrowRight className="size-4" />
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border-2 border-dashed border-slate-300 px-7 py-4 text-sm font-bold text-slate-400"
          >
            Link de inscrição em breve
          </span>
        )
      ) : (
        <p className="rounded-2xl bg-slate-100 px-4 py-3 text-sm leading-6 text-slate-600">
          As inscrições da {turma.nome} terminaram em {turma.fimInscricoes}. Para saber das próximas turmas, fale com a
          Giselle.
        </p>
      )}

      {whatsapp ? (
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          data-cta={`whatsapp-n${nivel.id}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 px-7 py-3.5 text-sm font-bold transition hover:bg-[#eef8f9]"
          style={{ borderColor: TEAL, color: TEAL }}
        >
          <MessageCircle className="size-4" />
          Falar com a Giselle no WhatsApp
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border-2 border-dashed border-slate-300 px-7 py-3.5 text-sm font-bold text-slate-400"
        >
          <MessageCircle className="size-4" />
          WhatsApp em breve
        </span>
      )}
      <p className="text-center text-xs leading-5 text-slate-500">
        {whatsapp ? `A mensagem já vai escrita: “NÍVEL ${nivel.id}”. ` : ""}
        {turma.atendimento}
      </p>

      {faltam.length ? (
        <div className="rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900">
          <b>Só aparece no ambiente local.</b> Falta preencher antes de publicar, em{" "}
          <code>lib/ninguemNasceFluenteData.ts</code>:
          <ul className="mt-1 list-disc pl-5">
            {faltam.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function ContatoPorEmail({
  nivel,
  origem,
  placar,
  canal,
  primeiraTurma,
}: {
  nivel: Nivel;
  origem: Origem;
  placar: number | null;
  canal?: NnfCanal;
  primeiraTurma: boolean;
}) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [consent, setConsent] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const mutation = trpc.leads.submit.useMutation({
    onSuccess: () => setEnviado(true),
    onError: (error) => toast.error(error.message || "Não foi possível enviar. Tente novamente."),
  });

  if (enviado) {
    return (
      <div className="flex items-start gap-3 rounded-3xl bg-[#eef8f9] p-6">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0" style={{ color: TEAL }} />
        <p className="text-sm leading-6 text-slate-700">
          Recebido, {nome.split(" ")[0]}! A Giselle vai falar com você sobre o nível {nivel.id}. {turma.atendimento}
        </p>
      </div>
    );
  }

  const comoEscolheu =
    origem === "teste" && placar !== null
      ? `pelo teste de 5 perguntas (placar ${placar}/5)`
      : origem === "frase"
        ? "pela frase"
        : "por um link direto";

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const attribution = getAttribution();
    mutation.mutate({
      route: NNF_ROTA,
      persona: `Nível ${nivel.id} · ${nivel.rotulo}`,
      name: nome,
      email,
      phone: telefone,
      interest: `${turma.nome} · ${nivel.cursoCurto}`,
      message: `Escolheu o nível ${nivel.id} (${nivel.rotulo}) ${comoEscolheu}. Curso: ${nivel.curso}. Preço visto: ${
        primeiraTurma ? "condição de primeira turma" : "valor regular"
      }.${telefone ? " Informou WhatsApp e autorizou contato." : ""}`,
      source: canal ?? attribution.source ?? "nivel",
      campaign: attribution.campaign ?? NNF_CAMPANHA,
      howFound: canal ?? attribution.source ?? "",
    });
  };

  return (
    <form onSubmit={enviar} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7">
      <div>
        <p className="font-baloo text-lg font-bold" style={{ color: INK }}>
          Prefere que a Giselle fale com você?
        </p>
        <p className="mt-1 text-sm text-slate-500">Deixe o seu contato e ela responde sobre o nível {nivel.id}.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-bold" style={{ color: INK }} htmlFor="nnf-nome">
            Seu nome *
          </label>
          <input
            id="nnf-nome"
            required
            minLength={2}
            maxLength={160}
            autoComplete="name"
            className={`mt-1.5 ${inputClass}`}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-bold" style={{ color: INK }} htmlFor="nnf-email">
            E-mail *
          </label>
          <input
            id="nnf-email"
            required
            type="email"
            maxLength={320}
            autoComplete="email"
            className={`mt-1.5 ${inputClass}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold" style={{ color: INK }} htmlFor="nnf-telefone">
          WhatsApp, com DDD <span className="font-normal text-slate-400">(opcional)</span>
        </label>
        <input
          id="nnf-telefone"
          type="tel"
          inputMode="tel"
          maxLength={40}
          autoComplete="tel"
          placeholder="(31) 90000-0000"
          className={`mt-1.5 ${inputClass}`}
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>
      <label className="flex cursor-pointer items-start gap-3 px-1">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 size-4 accent-[#078aa7]"
        />
        <span className="text-xs leading-5 text-slate-500">
          Autorizo a Giselle Falcão e a NOKAHI EDU a entrar em contato sobre a {turma.nome}, por e-mail ou pelo
          WhatsApp informado, conforme a{" "}
          <Link href="/privacidade" className="font-semibold hover:underline" style={{ color: TEAL }}>
            Política de Privacidade
          </Link>
          . *
        </span>
      </label>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-60"
        style={{ backgroundColor: TEAL }}
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="size-4" />
            Quero conversar sobre o nível {nivel.id}
          </>
        )}
      </button>
    </form>
  );
}

function PainelNivel({
  nivel,
  origem,
  placar,
  canal,
  agora,
  onTrocar,
}: {
  nivel: Nivel;
  origem: Origem;
  placar: number | null;
  canal?: NnfCanal;
  agora: number;
  onTrocar: (id: NivelId) => void;
}) {
  const primeiraTurma = condicaoPrimeiraTurmaAtiva(agora);
  return (
    <section id="seu-nivel" className="scroll-mt-20 bg-[#f4fafb] py-12 sm:py-16">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: TEAL }}>
            {origem === "teste" && placar !== null ? `Seu placar: ${placar} / 5 · ` : ""}O seu ponto de partida
          </p>
          <div role="tablist" aria-label="Ver outro nível" className="flex gap-1 rounded-full bg-white p-1 shadow-sm">
            {niveis.map((n) => {
              const ativo = n.id === nivel.id;
              return (
                <button
                  key={n.id}
                  type="button"
                  role="tab"
                  aria-selected={ativo}
                  onClick={() => onTrocar(n.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition sm:px-4 ${
                    ativo ? "text-white" : "text-slate-500 hover:text-[#0f3141]"
                  }`}
                  style={ativo ? { backgroundColor: INK } : undefined}
                >
                  {n.id} · {n.rotulo}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={nivel.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start"
        >
          {/* O curso */}
          <div className="rounded-[2rem] bg-white p-7 shadow-[0_18px_50px_rgba(15,49,65,0.08)] sm:p-9">
            <p className="text-sm font-bold" style={{ color: TEAL }}>
              Nível {nivel.id} · {nivel.rotulo}
            </p>
            <h2 className="mt-2 font-baloo text-3xl font-bold leading-tight sm:text-4xl" style={{ color: INK }}>
              {nivel.curso}
            </h2>
            <p className="mt-2 text-sm font-semibold text-slate-500">{nivel.tipo}</p>
            <p className="mt-5 border-l-4 pl-4 text-sm italic leading-6 text-slate-600" style={{ borderColor: MINT }}>
              Para quem pensa: “{nivel.frase}”
            </p>

            <h3 className="mt-7 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: INK }}>
              O que você sai sabendo
            </h3>
            <p className="mt-2 text-base leading-7 text-slate-700">{nivel.saiSabendo}</p>

            <ul className="mt-5 space-y-2.5">
              {nivel.detalhes.map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" style={{ color: TEAL }} />
                  {d}
                </li>
              ))}
              <li className="flex items-start gap-2.5 text-sm leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" style={{ color: TEAL }} />
                {nivel.paraQuem}
              </li>
            </ul>

            <div className="mt-7 flex items-start gap-3 rounded-2xl bg-[#eef8f9] px-5 py-4">
              <Award className="mt-0.5 size-5 shrink-0" style={{ color: TEAL }} />
              <p className="text-sm leading-6 text-slate-700">{nivel.certificado}</p>
            </div>

            <div className="mt-6 space-y-1.5 text-xs leading-5 text-slate-500">
              {nnf.regras.map((r) => (
                <p key={r}>{r}</p>
              ))}
              {nivel.id === 3 ? <p className="font-semibold text-slate-600">{nnf.regraSemGraduacao}</p> : null}
            </div>
          </div>

          {/* Preço, datas e inscrição */}
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-white p-7 shadow-[0_18px_50px_rgba(15,49,65,0.08)] sm:p-8">
              <Preco nivel={nivel} agora={agora} />
              <div className="mt-5 flex items-start gap-2.5 text-sm leading-6 text-slate-700">
                <CalendarDays className="mt-0.5 size-4 shrink-0" style={{ color: TEAL }} />
                <span>
                  A {turma.nome} começa em <b>{turma.inicio}</b>. Inscrições até <b>{turma.fimInscricoes}</b>.
                </span>
              </div>
              <Botoes nivel={nivel} agora={agora} canal={canal} />
            </div>
            <ContatoPorEmail
              key={nivel.id}
              nivel={nivel}
              origem={origem}
              placar={placar}
              canal={canal}
              primeiraTurma={primeiraTurma}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------------- o teste

function Teste({ onVerNivel }: { onVerNivel: (id: NivelId, placar: number) => void }) {
  const [respostas, setRespostas] = useState<(boolean | null)[]>(() => teste.perguntas.map(() => null));
  const respondidas = respostas.filter((r) => r !== null).length;
  const completo = respondidas === teste.perguntas.length;
  const placar = respostas.filter((r) => r === true).length;
  const sugerido = nivelPeloPlacar(placar);
  const faixa = faixaDoPlacar(placar);
  const registrado = useRef(false);

  useEffect(() => {
    if (completo && !registrado.current) {
      registrado.current = true;
      trackEvent("teste", `placar-${placar}`);
    }
  }, [completo, placar]);

  const responder = (i: number, valor: boolean) =>
    setRespostas((atual) => atual.map((r, j) => (j === i ? valor : r)));

  const refazer = () => {
    registrado.current = false;
    setRespostas(teste.perguntas.map(() => null));
  };

  return (
    <section id="teste" className="container scroll-mt-20 py-14 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: TEAL }}>
            A segunda porta
          </p>
          <h2 className="mt-3 font-baloo text-3xl font-bold sm:text-4xl" style={{ color: INK }}>
            {teste.titulo}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{teste.intro}</p>
          <ul className="mt-6 space-y-2 text-sm text-slate-600">
            {teste.faixas.map((f) => (
              <li key={f.nivel} className="flex items-center gap-3">
                <span className="w-16 font-bold" style={{ color: INK }}>
                  {f.de} a {f.ate}
                </span>
                <span>
                  Nível {f.nivel} · {getNivel(f.nivel).rotulo}
                </span>
              </li>
            ))}
          </ul>
          <a
            href={fluente.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold hover:underline"
            style={{ color: TEAL }}
          >
            <Youtube className="size-4 text-red-600" />
            A série Fluente em IA no YouTube
          </a>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,49,65,0.06)] sm:p-7">
          <ol className="divide-y divide-slate-100">
            {teste.perguntas.map((p, i) => (
              <li key={p} className="flex flex-col gap-3 py-4 first:pt-1 sm:flex-row sm:items-center sm:gap-5">
                <p className="flex flex-1 gap-3 text-sm leading-6 text-slate-700">
                  <span className="font-baloo text-lg font-bold leading-6" style={{ color: TEAL }}>
                    {i + 1}
                  </span>
                  {p}
                </p>
                <div className="flex shrink-0 gap-2 pl-7 sm:pl-0" role="group" aria-label={`Resposta da pergunta ${i + 1}`}>
                  {[
                    { v: true, rotulo: "Sim" },
                    { v: false, rotulo: "Não" },
                  ].map((op) => {
                    const ativo = respostas[i] === op.v;
                    return (
                      <button
                        key={op.rotulo}
                        type="button"
                        aria-pressed={ativo}
                        onClick={() => responder(i, op.v)}
                        className={`min-w-16 rounded-full border-2 px-4 py-2.5 text-sm font-bold transition ${
                          ativo ? "text-white" : "border-slate-200 text-slate-600 hover:border-[#078aa7]"
                        }`}
                        style={ativo ? { backgroundColor: op.v ? TEAL : INK, borderColor: op.v ? TEAL : INK } : undefined}
                      >
                        {op.rotulo}
                      </button>
                    );
                  })}
                </div>
              </li>
            ))}
          </ol>

          {completo ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-3xl p-6 text-white"
              style={{ backgroundColor: INK }}
              aria-live="polite"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: MINT }}>
                Seu placar: {placar} / 5
              </p>
              <p className="mt-2 font-baloo text-2xl font-bold">
                Nível {sugerido} · {getNivel(sugerido).rotulo}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{faixa.texto}</p>
              <p className="mt-2 text-xs text-slate-400">{teste.aviso}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  data-cta={`teste-ver-n${sugerido}`}
                  onClick={() => onVerNivel(sugerido, placar)}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition hover:brightness-110"
                  style={{ backgroundColor: MINT, color: INK }}
                >
                  Ver o nível {sugerido}: {getNivel(sugerido).cursoCurto}
                  <ArrowRight className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={refazer}
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"
                >
                  <RotateCcw className="size-3.5" />
                  Refazer
                </button>
              </div>
            </motion.div>
          ) : (
            <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-400">
              <ListChecks className="size-4" />
              {respondidas} de {teste.perguntas.length} respondidas
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------- página

export default function GiselleNinguemNasceFluente({ canal }: { canal?: string }) {
  const canalValido = NNF_CANAIS.includes(canal as NnfCanal) ? (canal as NnfCanal) : undefined;
  const agora = useMemo(() => agoraDaPagina(), []);
  const primeiraTurma = condicaoPrimeiraTurmaAtiva(agora);
  const condicao = faqCondicao(agora);

  const [escolha, setEscolha] = useState<{ id: NivelId; origem: Origem; placar: number | null } | null>(null);
  const [rolar, setRolar] = useState(0);

  const escolher = (id: NivelId, origem: Origem, placar: number | null = null) => {
    setEscolha({ id, origem, placar });
    setRolar((n) => n + 1);
    trackEvent("nivel", `n${id}-${origem}`);
    try {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#nivel-${id}`);
    } catch {
      /* sem history: segue sem o endereço do nível */
    }
  };

  // Link direto para um nível (ex.: /nivel#nivel-2, nas respostas do WhatsApp)
  useEffect(() => {
    const id = nivelDoHash();
    if (id) escolher(id, "link");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!rolar) return;
    const t = window.setTimeout(() => rolarPara("seu-nivel"), 60);
    return () => window.clearTimeout(t);
  }, [rolar]);

  return (
    <GiselleLayout>
      {/* Hero: a frase-assinatura e os três cartões */}
      <section id="niveis" className="relative scroll-mt-16 overflow-hidden" style={{ backgroundColor: INK }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(97,232,191,0.20),transparent_45%),radial-gradient(circle_at_8%_8%,rgba(17,175,200,0.18),transparent_40%)]" />
        <div className="container relative py-10 sm:py-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
            className="max-w-4xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: MINT }}>
              {nnf.selo} · Começa em {turma.inicio}
            </p>
            <h1 className="mt-4 font-baloo text-4xl font-bold leading-[1.05] text-white sm:mt-5 sm:text-6xl">
              <span className="block">{nnf.assinatura}</span>{" "}
              <span className="block" style={{ color: MINT }}>
                {nnf.assinaturaFim}
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">{nnf.sub}</p>
            <p className="mt-6 font-baloo text-2xl font-bold text-white sm:mt-8">{nnf.pergunta}</p>
          </motion.div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {niveis.map((n, i) => (
              <motion.div
                key={n.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: 0.05 + i * 0.06 }}
              >
                <CartaoFrase nivel={n} ativo={escolha?.id === n.id} onEscolher={() => escolher(n.id, "frase")} />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <a
              href="#teste"
              onClick={(ev) => {
                ev.preventDefault();
                rolarPara("teste");
              }}
              data-cta="ir-para-teste"
              className="inline-flex items-center gap-2 text-sm font-bold text-white hover:underline"
            >
              <ListChecks className="size-4" style={{ color: MINT }} />
              Não sabe qual frase é você? Faça o teste de 5 perguntas
              <ArrowRight className="size-4" />
            </a>
            <p className="text-xs leading-5 text-slate-400">
              Inscrições até {turma.fimInscricoes}
              {primeiraTurma ? ` · Condição de primeira turma até ${turma.fimCondicao}` : ""}
            </p>
          </div>
        </div>
      </section>

      {escolha ? (
        <PainelNivel
          nivel={getNivel(escolha.id)}
          origem={escolha.origem}
          placar={escolha.placar}
          canal={canalValido}
          agora={agora}
          onTrocar={(id) => escolher(id, escolha.origem === "teste" ? "teste" : "frase", escolha.placar)}
        />
      ) : null}

      <Teste onVerNivel={(id, placar) => escolher(id, "teste", placar)} />

      {/* Alívio + perguntas frequentes */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container grid gap-10 py-14 sm:py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] p-8 text-white" style={{ backgroundColor: INK }}>
            <p className="font-baloo text-6xl font-bold leading-none" style={{ color: MINT }}>
              {nnf.alivio.numero}
            </p>
            <p className="mt-4 text-lg leading-7">{nnf.alivio.texto}</p>
            <p className="mt-2 text-xs text-slate-400">{nnf.alivio.fonte}</p>
            <p className="mt-6 border-t border-white/15 pt-5 text-sm leading-6 text-slate-300">{nnf.alivio.fecho}</p>
          </div>
          <div>
            <h2 className="font-baloo text-3xl font-bold" style={{ color: INK }}>
              As perguntas que a Giselle mais recebe
            </h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {[...nnf.faq, condicao].map((f) => (
                <div key={f.q} className="rounded-2xl border border-slate-200 px-5 py-4">
                  <dt className="text-sm font-bold" style={{ color: INK }}>
                    {f.q}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-slate-600">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Quem conduz */}
      <section className="container py-14 sm:py-16">
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <img
            src="/brand/giselle-retrato-3.jpg"
            alt="Giselle Couto Falcão"
            loading="lazy"
            className="size-28 shrink-0 rounded-3xl object-cover"
          />
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: TEAL }}>
              Quem conduz a {turma.nome}
            </p>
            <p className="mt-2 font-baloo text-2xl font-bold" style={{ color: INK }}>
              {nnf.autora.nome}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{nnf.autora.texto}</p>
            <p className="mt-3 text-sm font-semibold text-slate-700">{turma.atendimento}</p>
          </div>
        </div>
      </section>

      {/* Fecho */}
      <section className="container pb-16">
        <div className="rounded-[2rem] p-8 text-center text-white sm:p-12" style={{ backgroundColor: INK }}>
          <p className="font-baloo text-3xl font-bold leading-tight sm:text-4xl">
            {nnf.assinatura} <span style={{ color: MINT }}>{nnf.assinaturaFim}</span>
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">
            A {turma.nome} começa em {turma.inicio}, com inscrições até {turma.fimInscricoes}.
            {primeiraTurma ? ` A condição de primeira turma vale até ${turma.fimCondicao}.` : ""}
          </p>
          <a
            href="#niveis"
            onClick={(ev) => {
              ev.preventDefault();
              rolarPara("niveis");
            }}
            data-cta="fecho-escolher-nivel"
            className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition hover:brightness-110"
            style={{ backgroundColor: MINT, color: INK }}
          >
            {nnf.pergunta}
            <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
    </GiselleLayout>
  );
}
