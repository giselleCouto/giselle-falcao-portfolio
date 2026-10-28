import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { contact } from "@/lib/portfolioData";
import { getAttribution } from "@/lib/tracking";
import { trpc } from "@/lib/trpc";

// Pedido de proposta com briefing estruturado (tabela palestra_pedidos via
// academy.palestraPedido). Usado em /giselle/palestras e na página de vendas
// dos Programas Executivos NOKAHI Edu — cada página passa suas opções de "tipo".

const inputClass =
  "w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-[#1a1333] placeholder:text-slate-400 focus:border-[#8b5cf6] focus:outline-none";
const labelClass = "block text-sm font-bold text-[#1a1333]";

export const TIPOS_PALESTRA = [
  "Palestra / Keynote",
  "Workshop hands-on",
  "Programa corporativo",
  "Ainda não sei — quero orientação",
];

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

type Props = {
  /** Opções do campo "tipo" (cada uma com até 60 caracteres — limite do servidor) */
  tipos?: string[];
  tipoLabel?: string;
  /** Opção pré-selecionada (ex.: programa vindo de ?programa=slug) */
  tipoInicial?: string;
  /** Campo "Evento (se houver)" — faz sentido para palestras, não para programas */
  mostrarEvento?: boolean;
  placeholderData?: string;
  placeholderPublico?: string;
  placeholderMensagem?: string;
  /** Origem usada quando a visita não trouxe ?src= nem origem na sessão */
  fallbackSource?: string;
};

export default function PedidoProposta({
  tipos = TIPOS_PALESTRA,
  tipoLabel = "Formato desejado",
  tipoInicial = "",
  mostrarEvento = true,
  placeholderData = "Ex.: outubro/2026",
  placeholderPublico = "Ex.: 80 pessoas, times de dados e negócio",
  placeholderMensagem = "O que o público precisa sair sabendo ou decidindo? Qual desafio motivou o convite?",
  fallbackSource,
}: Props) {
  const [form, setForm] = useState({ ...FORM_INICIAL, tipo: tipos.includes(tipoInicial) ? tipoInicial : "" });
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
        initial={{ opacity: 0, y: 10 }}
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
        const attribution = getAttribution();
        mutation.mutate({
          ...form,
          consent,
          ...attribution,
          source: attribution.source || fallbackSource,
        });
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
          <label className={labelClass} htmlFor="pp-tipo">{tipoLabel} *</label>
          <select id="pp-tipo" required className={`mt-1.5 ${inputClass}`} value={form.tipo} onChange={(e) => set("tipo")(e.target.value)}>
            <option value="">Selecione...</option>
            {tipos.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="pp-data">Data ou período desejado</label>
          <input id="pp-data" maxLength={60} className={`mt-1.5 ${inputClass}`} value={form.dataDesejada} onChange={(e) => set("dataDesejada")(e.target.value)} placeholder={placeholderData} />
        </div>
        {mostrarEvento ? (
          <div>
            <label className={labelClass} htmlFor="pp-evento">Evento (se houver)</label>
            <input id="pp-evento" maxLength={200} className={`mt-1.5 ${inputClass}`} value={form.evento} onChange={(e) => set("evento")(e.target.value)} placeholder="Nome do evento ou encontro interno" />
          </div>
        ) : null}
        <div className={mostrarEvento ? "" : "sm:col-span-2"}>
          <label className={labelClass} htmlFor="pp-publico">Público estimado</label>
          <input id="pp-publico" maxLength={200} className={`mt-1.5 ${inputClass}`} value={form.publico} onChange={(e) => set("publico")(e.target.value)} placeholder={placeholderPublico} />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="pp-mensagem">Conte o contexto e o objetivo *</label>
        <textarea id="pp-mensagem" required minLength={10} maxLength={4000} rows={4} className={`mt-1.5 ${inputClass}`} value={form.mensagem} onChange={(e) => set("mensagem")(e.target.value)} placeholder={placeholderMensagem} />
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
