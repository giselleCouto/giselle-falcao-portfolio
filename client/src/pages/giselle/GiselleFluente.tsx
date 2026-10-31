import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2, Download, ExternalLink, FileText, Loader2, Share2, Youtube } from "lucide-react";
import { toast } from "sonner";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { getAttribution } from "@/lib/tracking";
import { trpc } from "@/lib/trpc";
import {
  FLUENTE_CANAIS,
  condicaoPrimeiraTurmaAtiva,
  fluente,
  kitPdfUrl,
  type FluenteCanal,
} from "@/lib/fluenteData";

// Página do Kit de Letramento Fluente em IA — destino dos anúncios e das
// descrições da série (YouTube, Instagram, LinkedIn, TikTok). Conteúdo em
// lib/fluenteData.ts. O lead vai para lead_contacts (leads.submit), com a
// origem do canal da rota (/fluente/<canal>) ou do ?src= do link.

// Paleta NOKAHI EDU (a mesma do PDF do kit)
const INK = "#0f3141";
const TEAL = "#078aa7";
const MINT = "#61e8bf";

const STORAGE_KEY = "fluente.kit.v1";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const inputClass =
  "w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-[#0f3141] placeholder:text-slate-400 focus:border-[#078aa7] focus:outline-none";

function jaBaixou(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function lembrarDownload() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* sem armazenamento local — a pessoa só preenche de novo na próxima visita */
  }
}

function compartilhar() {
  const url = "https://www.coutofalcao.com/fluente";
  const texto = "Kit de Letramento Fluente em IA (grátis): 5 ferramentas para usar IA com critério no trabalho.";
  if (typeof navigator !== "undefined" && navigator.share) {
    navigator.share({ title: "Kit de Letramento Fluente em IA", text: texto, url }).catch(() => {});
    return;
  }
  window.open(`https://wa.me/?text=${encodeURIComponent(`${texto} ${url}`)}`, "_blank", "noopener,noreferrer");
}

function KitLiberado({ pdf }: { pdf: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2rem] bg-white p-7 text-center shadow-[0_18px_60px_rgba(15,49,65,0.25)] sm:p-9"
    >
      <CheckCircle2 className="mx-auto size-11" style={{ color: TEAL }} />
      <h2 className="mt-4 font-baloo text-2xl font-bold" style={{ color: INK }}>
        Seu kit está pronto
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
        São 7 páginas para imprimir ou preencher na tela. Comece pela autoavaliação: leva 2 minutos.
      </p>
      <a
        href={pdf}
        download
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-white transition hover:brightness-110"
        style={{ backgroundColor: INK }}
      >
        <Download className="size-4" />
        Baixar o Kit (PDF)
      </a>
      <a
        href={pdf}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
        style={{ color: TEAL }}
      >
        Abrir no navegador
        <ExternalLink className="size-3.5" />
      </a>
      <div className="mt-6 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-2">
        <a
          href={fluente.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#078aa7]"
        >
          <Youtube className="size-4 text-red-600" />
          Assistir à série
        </a>
        <button
          type="button"
          onClick={compartilhar}
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#078aa7]"
        >
          <Share2 className="size-4" style={{ color: TEAL }} />
          Mandar para o time
        </button>
      </div>
    </motion.div>
  );
}

function FormularioKit({ canal, onLiberado }: { canal?: FluenteCanal; onLiberado: () => void }) {
  const [perfil, setPerfil] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [avisoExtensao, setAvisoExtensao] = useState(false);
  const [consent, setConsent] = useState(false);

  const mutation = trpc.leads.submit.useMutation({
    onSuccess: () => {
      lembrarDownload();
      onLiberado();
    },
    onError: (error) => toast.error(error.message || "Não foi possível enviar. Tente novamente."),
  });

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!perfil) {
      toast.error("Escolha a opção que mais combina com você.");
      return;
    }
    const attribution = getAttribution();
    mutation.mutate({
      route: "/fluente",
      persona: perfil,
      name: nome,
      email,
      interest: avisoExtensao ? "Kit Fluente em IA + aviso Do Dado ao Valor" : "Kit Fluente em IA",
      message: `Pediu o Kit de Letramento Fluente em IA. Perfil: ${perfil}. Quer aviso das inscrições da extensão Do Dado ao Valor: ${avisoExtensao ? "sim" : "não"}.`,
      source: canal ?? attribution.source ?? "fluente",
      campaign: attribution.campaign ?? "kit-letramento",
      howFound: canal ?? attribution.source ?? "",
    });
  };

  return (
    <form
      onSubmit={enviar}
      className="space-y-5 rounded-[2rem] bg-white p-7 shadow-[0_18px_60px_rgba(15,49,65,0.25)] sm:p-9"
    >
      <div>
        <p className="font-baloo text-xl font-bold" style={{ color: INK }}>
          Receba o kit grátis
        </p>
        <p className="mt-1 text-sm text-slate-500">O download libera na hora, aqui mesmo.</p>
      </div>
      <fieldset>
        <legend className="text-sm font-bold" style={{ color: INK }}>
          Qual frase combina mais com você? *
        </legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {fluente.perfis.map((p) => {
            const ativo = perfil === p;
            return (
              <button
                key={p}
                type="button"
                aria-pressed={ativo}
                onClick={() => setPerfil(p)}
                className={`rounded-2xl border-2 px-4 py-2.5 text-left text-sm font-semibold transition ${
                  ativo ? "text-white" : "border-slate-200 text-slate-600 hover:border-[#078aa7]"
                }`}
                style={ativo ? { backgroundColor: TEAL, borderColor: TEAL } : undefined}
              >
                {p}
              </button>
            );
          })}
        </div>
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-bold" style={{ color: INK }} htmlFor="fk-nome">
            Seu nome *
          </label>
          <input id="fk-nome" required minLength={2} maxLength={160} className={`mt-1.5 ${inputClass}`} value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-bold" style={{ color: INK }} htmlFor="fk-email">
            E-mail *
          </label>
          <input id="fk-email" required type="email" maxLength={320} className={`mt-1.5 ${inputClass}`} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-[#eef8f9] px-4 py-3">
        <input type="checkbox" checked={avisoExtensao} onChange={(e) => setAvisoExtensao(e.target.checked)} className="mt-1 size-4 accent-[#078aa7]" />
        <span className="text-xs leading-5 text-slate-600">
          Quero receber o aviso quando abrirem as inscrições da extensão <b>Do Dado ao Valor</b> (opcional).
        </span>
      </label>
      <label className="flex cursor-pointer items-start gap-3 px-1">
        <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 size-4 accent-[#078aa7]" />
        <span className="text-xs leading-5 text-slate-500">
          Autorizo a Giselle Falcão e a NOKAHI EDU a entrar em contato sobre a série e os cursos, conforme a{" "}
          <Link href="/privacidade" className="font-semibold hover:underline" style={{ color: TEAL }}>
            Política de Privacidade
          </Link>
          . *
        </span>
      </label>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-60"
        style={{ backgroundColor: INK }}
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Liberando...
          </>
        ) : (
          <>
            <Download className="size-4" />
            Quero o kit grátis
          </>
        )}
      </button>
    </form>
  );
}

export default function GiselleFluente({ canal }: { canal?: string }) {
  const canalValido = FLUENTE_CANAIS.includes(canal as FluenteCanal) ? (canal as FluenteCanal) : undefined;
  const [liberado, setLiberado] = useState(() => jaBaixou());
  const pdf = useMemo(() => kitPdfUrl(), []);
  const primeiraTurma = condicaoPrimeiraTurmaAtiva();

  return (
    <GiselleLayout>
      {/* Hero com o formulário à direita (acima da dobra no desktop) */}
      <section className="relative overflow-hidden" style={{ backgroundColor: INK }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(97,232,191,0.22),transparent_45%),radial-gradient(circle_at_10%_10%,rgba(17,175,200,0.18),transparent_40%)]" />
        <div className="container relative grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.3 }}>
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: MINT }}>
              {fluente.selo} · Material gratuito
            </p>
            <h1 className="mt-5 font-baloo text-4xl font-bold leading-[1.05] text-white sm:text-5xl">
              Use IA com <span style={{ color: MINT }}>critério</span>, não só com pressa.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">{fluente.sub}</p>
            {/* No celular a lista fica só em "Por dentro do kit", para o formulário subir */}
            <ol className="mt-7 hidden space-y-2.5 lg:block">
              {fluente.entregaveis.map((e) => (
                <li key={e.n} className="flex items-center gap-3 border-b border-white/10 pb-2.5 text-sm text-slate-200">
                  <span className="w-6 font-bold" style={{ color: MINT }}>
                    {e.n}
                  </span>
                  <span className="flex-1">{e.titulo}</span>
                  <span className="text-xs uppercase tracking-wider text-slate-400">{e.ep}</span>
                </li>
              ))}
            </ol>
          </motion.div>
          <div id="kit" className="scroll-mt-24">
            {liberado ? (
              <KitLiberado pdf={pdf} />
            ) : (
              <FormularioKit canal={canalValido} onLiberado={() => setLiberado(true)} />
            )}
          </div>
        </div>
      </section>

      {/* O que vem no kit, com a página de verdade */}
      <section className="container py-14 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: TEAL }}>
          Por dentro do kit
        </p>
        <h2 className="mt-3 max-w-2xl font-baloo text-3xl font-bold sm:text-4xl" style={{ color: INK }}>
          Uma página por episódio, para usar no trabalho
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {fluente.entregaveis.map((e, i) => (
            <motion.figure
              key={e.n}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex flex-col"
            >
              <img
                src={e.imagem}
                alt={`Página do kit: ${e.titulo}`}
                loading="lazy"
                width={452}
                height={640}
                className="w-full rounded-2xl border border-slate-200 shadow-[0_10px_30px_rgba(15,49,65,0.10)]"
              />
              <figcaption className="mt-3">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: TEAL }}>
                  {e.n} · {e.ep}
                </p>
                <p className="mt-1 text-sm font-bold" style={{ color: INK }}>
                  {e.titulo}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{e.texto}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl bg-[#eef8f9] p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-slate-700">
            <FileText className="mr-1.5 inline size-4" style={{ color: TEAL }} />
            {fluente.porQueAgora}
          </p>
          <a
            href="#kit"
            onClick={(ev) => {
              ev.preventDefault();
              document.getElementById("kit")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white"
            style={{ backgroundColor: INK }}
          >
            <Download className="size-4" />
            {liberado ? "Baixar o kit" : "Quero o kit grátis"}
          </a>
        </div>
      </section>

      {/* Mande para 3 pessoas + quem preparou */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container grid gap-10 py-14 sm:py-16 lg:grid-cols-2">
          <div>
            <h2 className="font-baloo text-2xl font-bold" style={{ color: INK }}>
              Mande para 3 pessoas
            </h2>
            <div className="mt-6 grid gap-3">
              {fluente.mandePara.map((m) => (
                <div key={m.quem} className="rounded-2xl border border-slate-200 px-5 py-4">
                  <p className="text-sm font-bold" style={{ color: INK }}>
                    {m.quem}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-500">{m.porque}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={compartilhar}
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold hover:underline"
              style={{ color: TEAL }}
            >
              <Share2 className="size-4" />
              Compartilhar esta página
            </button>
          </div>
          <div className="flex items-start gap-5">
            <img
              src="/brand/giselle-retrato-3.jpg"
              alt="Giselle Couto Falcão"
              loading="lazy"
              className="size-24 shrink-0 rounded-3xl object-cover"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: TEAL }}>
                Quem preparou este kit
              </p>
              <p className="mt-2 font-baloo text-xl font-bold" style={{ color: INK }}>
                {fluente.autora.nome}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{fluente.autora.texto}</p>
              <a
                href={fluente.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold hover:underline"
                style={{ color: TEAL }}
              >
                <Youtube className="size-4 text-red-600" />
                A série Fluente em IA no YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Próximo passo, sem pressão */}
      <section className="container py-14 sm:py-16">
        <div className="rounded-[2rem] p-8 text-white sm:p-10" style={{ backgroundColor: INK }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: MINT }}>
            {fluente.proximoPasso.titulo}
          </p>
          <h2 className="mt-3 font-baloo text-2xl font-bold sm:text-3xl">{fluente.proximoPasso.nome}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{fluente.proximoPasso.texto}</p>
          <ul className="mt-5 space-y-2 text-sm text-slate-200">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" style={{ color: MINT }} />
              {fluente.proximoPasso.certificado}
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" style={{ color: MINT }} />
              {fluente.proximoPasso.turma}
            </li>
            {primeiraTurma ? (
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" style={{ color: MINT }} />
                {fluente.proximoPasso.condicao}
              </li>
            ) : null}
          </ul>
          {!liberado ? (
            <p className="mt-6 text-sm text-slate-300">
              Quer saber quando abrirem as inscrições? Marque a opção de aviso ao pedir o kit.
            </p>
          ) : null}
        </div>
      </section>
    </GiselleLayout>
  );
}
