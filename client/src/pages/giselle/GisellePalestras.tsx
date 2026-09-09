import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Gauge,
  Loader2,
  MessageCircle,
  Mic,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { palestras } from "@/lib/palestrasData";
import { contact } from "@/lib/portfolioData";
import { getAttribution } from "@/lib/tracking";
import { trpc } from "@/lib/trpc";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const inputClass =
  "w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-[#1a1333] placeholder:text-slate-400 focus:border-[#8b5cf6] focus:outline-none";
const labelClass = "block text-sm font-bold text-[#1a1333]";

const TIPOS = ["Palestra / Keynote", "Workshop hands-on", "Programa corporativo", "Ainda não sei — quero orientação"];

const FORM_INICIAL = {
  name: "",
  email: "",
  whatsapp: "",
  empresa: "",
  tipo: "",
  evento: "",
  dataDesejada: "",
  publico: "",
  mensagem: "",
};

function PedidoProposta() {
  const [form, setForm] = useState(FORM_INICIAL);
  const [consent, setConsent] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const mutation = trpc.academy.palestraPedido.useMutation({
    onSuccess: () => setEnviado(true),
    onError: (error) => toast.error(error.message || "Não foi possível enviar. Tente novamente."),
  });

  const set = (campo: keyof typeof FORM_INICIAL) => (valor: string) =>
    setForm((prev) => ({ ...prev, [campo]: valor }));

  if (enviado) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border-2 border-teal-200 bg-teal-50/40 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto size-10 text-teal-600" />
        <h3 className="mt-4 font-baloo text-2xl font-bold">Pedido recebido!</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-600">
          A Giselle analisa o briefing e responde pelo e-mail ou WhatsApp informado. Se preferir
          adiantar, você também pode{" "}
          <a href={contact.calendar} target="_blank" rel="noopener noreferrer" className="font-bold text-[#6b21a8] hover:underline">
            agendar uma conversa direto na agenda
          </a>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate({ ...form, consent, ...getAttribution() });
      }}
      className="space-y-5 rounded-[2rem] border border-slate-200/70 bg-white p-7 shadow-[0_10px_40px_rgba(26,19,51,0.06)] sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="pp-name">Seu nome *</label>
          <input id="pp-name" required minLength={2} maxLength={160} className={`mt-1.5 ${inputClass}`} value={form.name} onChange={(e) => set("name")(e.target.value)} />
        </div>
        <div>
          <label className={labelClass} htmlFor="pp-email">E-mail *</label>
          <input id="pp-email" required type="email" maxLength={320} className={`mt-1.5 ${inputClass}`} value={form.email} onChange={(e) => set("email")(e.target.value)} />
        </div>
        <div>
          <label className={labelClass} htmlFor="pp-whatsapp">WhatsApp (opcional)</label>
          <input id="pp-whatsapp" maxLength={40} className={`mt-1.5 ${inputClass}`} value={form.whatsapp} onChange={(e) => set("whatsapp")(e.target.value)} placeholder="(31) 90000-0000" />
        </div>
        <div>
          <label className={labelClass} htmlFor="pp-empresa">Empresa ou instituição *</label>
          <input id="pp-empresa" required minLength={2} maxLength={200} className={`mt-1.5 ${inputClass}`} value={form.empresa} onChange={(e) => set("empresa")(e.target.value)} />
        </div>
        <div>
          <label className={labelClass} htmlFor="pp-tipo">Formato desejado *</label>
          <select id="pp-tipo" required className={`mt-1.5 ${inputClass}`} value={form.tipo} onChange={(e) => set("tipo")(e.target.value)}>
            <option value="">Selecione...</option>
            {TIPOS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="pp-data">Data ou período desejado</label>
          <input id="pp-data" maxLength={60} className={`mt-1.5 ${inputClass}`} value={form.dataDesejada} onChange={(e) => set("dataDesejada")(e.target.value)} placeholder="Ex.: outubro/2026" />
        </div>
        <div>
          <label className={labelClass} htmlFor="pp-evento">Evento (se houver)</label>
          <input id="pp-evento" maxLength={200} className={`mt-1.5 ${inputClass}`} value={form.evento} onChange={(e) => set("evento")(e.target.value)} placeholder="Nome do evento ou encontro interno" />
        </div>
        <div>
          <label className={labelClass} htmlFor="pp-publico">Público estimado</label>
          <input id="pp-publico" maxLength={200} className={`mt-1.5 ${inputClass}`} value={form.publico} onChange={(e) => set("publico")(e.target.value)} placeholder="Ex.: 80 pessoas, times de dados e negócio" />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="pp-mensagem">Conte o contexto e o objetivo *</label>
        <textarea id="pp-mensagem" required minLength={10} maxLength={4000} rows={4} className={`mt-1.5 ${inputClass}`} value={form.mensagem} onChange={(e) => set("mensagem")(e.target.value)} placeholder="O que o público precisa sair sabendo ou decidindo? Qual desafio motivou o convite?" />
      </div>
      <label className="flex cursor-pointer items-start gap-3 px-1">
        <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 size-4 accent-[#6b21a8]" />
        <span className="text-xs leading-6 text-slate-500">
          Autorizo o contato da Giselle Falcão sobre este pedido. Dados usados apenas para elaborar a
          proposta, conforme a{" "}
          <Link href="/privacidade" className="font-semibold text-[#6b21a8] hover:underline">
            Política de Privacidade
          </Link>
          . *
        </span>
      </label>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1a1333] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#6b21a8] disabled:opacity-60"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            Pedir proposta
            <ArrowRight className="size-4" />
          </>
        )}
      </button>
    </form>
  );
}

export default function GisellePalestras() {
  return (
    <GiselleLayout>
      {/* Hero com foto real de palco */}
      <section className="relative overflow-hidden bg-[#0d1226]">
        <img
          src="/brand/giselle-palestra.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-top opacity-30"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(13,18,38,0.92)_30%,rgba(13,18,38,0.55))]" />
        <div className="container relative py-16 sm:py-24">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }}>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur">
              <Mic className="size-3.5" />
              Palestras · Workshops · Programas corporativos
            </p>
            <h1 className="mt-5 max-w-2xl font-baloo text-4xl font-bold leading-[1.05] text-white sm:text-5xl">
              {palestras.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">{palestras.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={contact.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#1a1333] transition hover:bg-violet-100"
              >
                <Calendar className="size-4" />
                Agendar conversa
              </a>
              <a
                href="#proposta"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <ClipboardList className="size-4" />
                Pedir proposta
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Prova social */}
      <section className="border-b border-slate-200/70 bg-white">
        <div className="container grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {palestras.proof.map((p) => (
            <div key={p.value} className="flex items-start gap-3">
              <BadgeCheck className="mt-0.5 size-5 shrink-0 text-teal-600" />
              <div>
                <p className="font-baloo text-sm font-bold text-[#1a1333]">{p.value}</p>
                <p className="mt-0.5 text-xs leading-5 text-slate-500">{p.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 níveis */}
      <section className="container py-14 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Três formatos</p>
        <h2 className="mt-3 text-3xl font-bold">Do palco à formação completa do time</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {palestras.tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`flex h-full flex-col rounded-3xl border-2 p-7 ${
                tier.destaque
                  ? "border-[#8b5cf6] bg-white shadow-[0_18px_50px_rgba(107,33,168,0.12)]"
                  : "border-slate-200 bg-white"
              }`}
            >
              {tier.destaque ? (
                <span className="self-start rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-[#6b21a8]">
                  Mais pedido
                </span>
              ) : (
                <span className="self-start rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                  {tier.duracao}
                </span>
              )}
              <h3 className="mt-4 font-baloo text-2xl font-bold">{tier.nome}</h3>
              <p className="text-sm font-semibold text-slate-400">
                {tier.destaque ? tier.duracao + " · " : ""}
                {tier.formato}
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-600">{tier.paraQuem}</p>
              <ul className="mt-4 flex-1 space-y-2">
                {tier.inclui.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                    <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-teal-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm font-bold text-[#1a1333]">{tier.investimento}</p>
              <a
                href={contact.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${
                  tier.destaque
                    ? "bg-[#1a1333] text-white hover:bg-[#6b21a8]"
                    : "border-2 border-violet-200 text-[#6b21a8] hover:bg-violet-50"
                }`}
              >
                <Calendar className="size-4" />
                Agendar conversa
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Temas prontos */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Temas</p>
          <h2 className="mt-3 text-3xl font-bold">Repertório pronto para o seu público</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {palestras.temas.map((tema) => (
              <span
                key={tema}
                className="rounded-full border border-violet-200 bg-violet-50 px-5 py-2.5 text-sm font-semibold text-[#6b21a8]"
              >
                {tema}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm text-slate-500">
            Não achou o tema? Palestras sob medida a partir do seu desafio — dos dados abertos à IA
            generativa.
          </p>
        </div>
      </section>

      {/* Como funciona */}
      <section className="container py-14 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Processo</p>
        <h2 className="mt-3 text-3xl font-bold">Como funciona</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {palestras.comoFunciona.map((s) => (
            <div key={s.n} className="rounded-3xl border border-slate-200/70 bg-white p-6">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6b21a8,#14b8a6)] font-baloo text-base font-bold text-white">
                {s.n}
              </span>
              <h3 className="mt-4 text-base font-bold">{s.t}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-500">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pedido de proposta (briefing estruturado com origem registrada) */}
      <section id="proposta" className="scroll-mt-24 border-y border-slate-200/70 bg-white">
        <div className="container py-14 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">Proposta</p>
            <h2 className="mt-3 text-3xl font-bold">Peça uma proposta com briefing</h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              Quanto mais contexto, mais certeira a proposta. Prefere conversar primeiro?{" "}
              <a href={contact.calendar} target="_blank" rel="noopener noreferrer" className="font-bold text-[#6b21a8] hover:underline">
                Agende 30 minutos
              </a>{" "}
              ou{" "}
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="font-bold text-[#6b21a8] hover:underline">
                chame no WhatsApp
              </a>
              .
            </p>
            <div className="mt-7">
              <PedidoProposta />
            </div>
          </div>
        </div>
      </section>

      {/* CTA quiz de maturidade */}
      <section className="container pb-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-[#0d1226]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(20,184,166,0.35),rgba(13,18,38,0.9))]" />
          <div className="relative grid gap-6 px-8 py-12 sm:py-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur">
                <Gauge className="size-3.5" />
                Gratuito · 3 minutos
              </p>
              <h2 className="mt-4 font-baloo text-2xl font-bold text-white sm:text-3xl">
                Não sabe por onde começar? Meça a maturidade de IA da sua empresa.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                10 perguntas, resultado na hora: seu nível em Dados, Tecnologia, Pessoas, Processos e
                Estratégia — com recomendações práticas para o próximo passo.
              </p>
            </div>
            <Link
              href="/diagnostico-ia"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#1a1333] transition hover:bg-teal-100"
            >
              <Sparkles className="size-4" />
              Fazer o Diagnóstico de Maturidade em IA
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </GiselleLayout>
  );
}
