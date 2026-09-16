// Landing page ÚNICA de captação da campanha "Dados & IA na Prática" —
// porta de entrada paga do ecossistema (estratégia Trajetória & Decisão).
// Uma página, três momentos segmentados no formulário (transição de carreira /
// empresa / pós-graduação): o lead cai em leads.submit com persona + campanha
// e o funil continua no WhatsApp. Regras da casa: sem promessa de emprego,
// sem depoimento inventado, sem data inventada (a data é confirmada à lista),
// preço fundador visível (âncora R$197 → R$97), LGPD com link de privacidade.

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  MessageCircle,
  Mic2,
  Newspaper,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { getAttribution } from "@/lib/tracking";

const WHATSAPP = "5531993275366";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

type Momento = "transicao-carreira" | "empresa-decisor" | "pos-graduacao";

const MOMENTOS: { id: Momento; Icon: typeof TrendingUp; titulo: string; sub: string }[] = [
  {
    id: "transicao-carreira",
    Icon: TrendingUp,
    titulo: "Quero migrar (ou crescer) em Dados & IA",
    sub: "Transição de carreira aproveitando a experiência que você já tem",
  },
  {
    id: "empresa-decisor",
    Icon: Briefcase,
    titulo: "Quero levar Dados & IA para a minha empresa",
    sub: "Encontrar, junto, onde Dados & IA fazem sentido no seu negócio",
  },
  {
    id: "pos-graduacao",
    Icon: GraduationCap,
    titulo: "Estou buscando uma pós-graduação em Dados & IA",
    sub: "Formação estruturada, com aviso em primeira mão da turma",
  },
];

const WHATS_MSG: Record<Momento, string> = {
  "transicao-carreira":
    "Oi, Giselle! Acabei de entrar para a turma fundadora da Masterclass Dados & IA na Prática (transição de carreira). Feliz em construir junto! Quais são os próximos passos?",
  "empresa-decisor":
    "Oi, Giselle! Entrei para a turma fundadora da Masterclass Dados & IA na Prática pensando na minha empresa. Queria também entender a conversa executiva de 15 minutos.",
  "pos-graduacao":
    "Oi, Giselle! Entrei para a turma fundadora da Masterclass Dados & IA na Prática e tenho interesse na pós-graduação em Dados & IA. Me avisa das novidades?",
};

const APRENDIZADOS = [
  {
    t: "O mapa honesto do mercado de Dados & IA",
    d: "O que as empresas realmente contratam e pagam — e onde a sua experiência atual já vale mais do que você imagina.",
  },
  {
    t: "O método dos 90 dias",
    d: "Como sair do consumo infinito de cursos para UM caso prático que vira portfólio, argumento de entrevista ou projeto interno.",
  },
  {
    t: "Onde a IA gera valor de verdade (e onde ela só gasta)",
    d: "A pergunta que a Giselle leva às empresas: qual dor do negócio a IA precisa resolver — com exemplos reais do agro, indústria e educação.",
  },
  {
    t: "Seu plano, construído junto",
    d: "Você não assiste — constrói. Saímos do encontro com o seu próximo passo escrito: o plano de 90 dias no seu contexto, feito com orientação ao vivo.",
  },
];

const PROVAS = [
  { Icon: Award, texto: "PhD · pesquisadora e consultora com soluções de IA em produção" },
  { Icon: Newspaper, texto: "Na mídia: O Tempo (Economia) e entrevista à Sagres TV" },
  { Icon: Mic2, texto: "Palcos: DATA BH · SQL Saturday, Minas Summit, HackTown 2026" },
  { Icon: BookOpen, texto: "Autora do livro Metodologia CEOD (Editora Sorian, 2026)" },
];

const FAQ = [
  {
    q: "A masterclass garante emprego ou resultado financeiro?",
    a: "Não — e você deve desconfiar de quem promete isso. Ela entrega direção, método e um plano de 90 dias honesto, construído com você. O resultado vem da sua execução; o que a Giselle garante é caminhar junto com um caminho testado e a verdade sobre o mercado.",
  },
  {
    q: "Quando acontece? Por que a data não está aqui?",
    a: "Porque a turma fundadora escolhe junto: quem está na lista recebe as opções de data primeiro e ajuda a definir o melhor dia. É assim que uma primeira turma deve nascer — em conjunto.",
  },
  {
    q: "Por que pago R$ 97 se é uma 'construção conjunta'?",
    a: "Porque compromisso constrói turma boa. O valor é simbólico perto do que se entrega em 3 horas — e garante que o encontro reúna quem está de verdade disposto a construir, não só a assistir. Em troca, a turma fundadora molda as próximas edições e leva condições que não se repetem.",
  },
  {
    q: "Sou de empresa — isso serve para mim?",
    a: "Sim. Um dos três blocos é exatamente sobre encontrar onde Dados & IA fazem sentido no seu negócio. E, se preferir começar por uma conversa executiva de 15 minutos, marque essa opção no formulário — a Giselle te chama.",
  },
  {
    q: "E se eu não puder ao vivo?",
    a: "A gravação fica disponível por um período para os inscritos. Mas o plano de 90 dias é construído ao vivo, em conversa — se puder, esteja com a gente.",
  },
];

function FormularioLista() {
  const [momento, setMomento] = useState<Momento | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whats, setWhats] = useState("");
  const [consent, setConsent] = useState(false);
  const [enviado, setEnviado] = useState<Momento | null>(null);

  const mutation = trpc.leads.submit.useMutation({
    onSuccess: () => setEnviado(momento),
    onError: (error) => toast.error(error.message || "Não foi possível enviar. Tente novamente."),
  });

  if (enviado) {
    return (
      <div className="rounded-3xl border-2 border-teal-200 bg-teal-50/40 p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-teal-600" />
        <h3 className="mt-4 font-baloo text-2xl font-bold text-[#1a1333]">
          Que bom ter você na turma fundadora!
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-600">
          Seu lugar na condição de fundador (R$ 97) está reservado. O próximo passo é uma conversa:
          as opções de data — que a turma escolhe junto — e o material de preparação chegam pelo
          WhatsApp, primeiro para quem está aqui.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATS_MSG[enviado])}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-600"
        >
          <MessageCircle className="size-4" />
          Continuar a conversa no WhatsApp
        </a>
        <p className="mt-3 text-xs text-slate-400">
          Um toque no botão abre a conversa já escrita — é só enviar.
        </p>
      </div>
    );
  }

  const enviar = () => {
    if (!momento) {
      toast.error("Escolha o seu momento — é o que define o que você recebe.");
      return;
    }
    if (nome.trim().length < 2 || !email.includes("@")) {
      toast.error("Confira seu nome e e-mail.");
      return;
    }
    if (whats.replace(/\D/g, "").length < 10) {
      toast.error("Informe um WhatsApp com DDD — o funil da turma acontece por lá.");
      return;
    }
    if (!consent) {
      toast.error("Para entrar na lista, autorize o contato (LGPD).");
      return;
    }
    const attr = getAttribution();
    const rotulo = MOMENTOS.find((m) => m.id === momento)?.titulo ?? momento;
    mutation.mutate({
      route: "/masterclass",
      persona: momento,
      name: nome.trim(),
      email: email.trim(),
      phone: whats.trim(),
      interest: "masterclass-dados-ia",
      message: `Inscrição na lista prioritária da Masterclass Dados & IA na Prática. Momento: ${rotulo}.`,
      source: attr.source ?? "website",
      campaign: attr.campaign ?? "masterclass-dados-ia",
      howFound: "landing-masterclass",
    });
  };

  const inputClass =
    "w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-[#1a1333] placeholder:text-slate-400 focus:border-[#8b5cf6] focus:outline-none";

  return (
    <div className="rounded-3xl border-2 border-violet-200 bg-white p-6 shadow-[0_18px_50px_rgba(107,33,168,0.12)] sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6b21a8]">
        Turma fundadora · construção conjunta
      </p>
      <h3 className="mt-2 font-baloo text-2xl font-bold text-[#1a1333]">
        Participe por R$ 97 na turma fundadora
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Sem pagamento agora — entrar na lista reserva sua condição de fundador (nas próximas
        turmas, o valor passa a R$ 197). A turma fundadora tem um papel especial: escolhe a data
        junto e o retorno de vocês molda as próximas edições. O convite chega pelo WhatsApp, numa
        conversa de verdade.
      </p>

      <div className="mt-5 space-y-2.5">
        <p className="text-sm font-bold text-[#1a1333]">Qual é o seu momento?</p>
        {MOMENTOS.map((m) => {
          const ativo = momento === m.id;
          return (
            <button
              key={m.id}
              type="button"
              aria-pressed={ativo}
              onClick={() => setMomento(m.id)}
              className={`flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition ${
                ativo ? "border-[#8b5cf6] bg-violet-50/60" : "border-slate-200 bg-white hover:border-violet-300"
              }`}
            >
              <m.Icon className={`mt-0.5 size-5 shrink-0 ${ativo ? "text-[#6b21a8]" : "text-slate-400"}`} />
              <span>
                <span className="block text-sm font-bold text-[#1a1333]">{m.titulo}</span>
                <span className="mt-0.5 block text-xs leading-5 text-slate-500">{m.sub}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3">
        <input className={inputClass} placeholder="Seu nome" value={nome} maxLength={160} onChange={(e) => setNome(e.target.value)} />
        <input className={inputClass} placeholder="Seu melhor e-mail" type="email" value={email} maxLength={320} onChange={(e) => setEmail(e.target.value)} />
        <input className={inputClass} placeholder="WhatsApp com DDD (ex.: 31 99999-9999)" inputMode="tel" value={whats} maxLength={40} onChange={(e) => setWhats(e.target.value)} />
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-slate-500">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 size-4 accent-[#6b21a8]"
        />
        <span>
          Autorizo o contato por WhatsApp e e-mail sobre a masterclass e conteúdos relacionados,
          conforme a{" "}
          <Link href="/privacidade" className="font-semibold text-[#6b21a8] underline">
            Política de Privacidade
          </Link>
          .
        </span>
      </label>

      <button
        type="button"
        onClick={enviar}
        disabled={mutation.isPending}
        className="mt-5 w-full rounded-full bg-[#1a1333] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#6b21a8] disabled:opacity-50"
      >
        {mutation.isPending ? "Enviando..." : "Quero construir junto na turma fundadora"}
      </button>
      <p className="mt-3 text-center text-[11px] text-slate-400">
        Turma intencionalmente pequena, para ser conversa · dados protegidos pela LGPD
      </p>
    </div>
  );
}

export default function GiselleMasterclass() {
  return (
    <div className="min-h-screen bg-[#f7f8fc] text-[#1a1333]">
      {/* Cabeçalho mínimo — LP de conversão, sem menu */}
      <header className="border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/giselle" className="font-baloo text-sm font-bold uppercase tracking-[0.14em]">
            Giselle Falcão
          </Link>
          <a
            href="#lista"
            className="rounded-full bg-[#1a1333] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#6b21a8]"
          >
            Entrar na lista
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0d1226]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(20,184,166,0.25),transparent_50%),radial-gradient(circle_at_85%_15%,rgba(107,33,168,0.45),transparent_45%)]" />
        <div className="container relative py-14 sm:py-20">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.3 }}>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-200 backdrop-blur">
              <Sparkles className="size-3.5" />
              Masterclass ao vivo · turma fundadora
            </p>
            <h1 className="mt-5 max-w-3xl font-baloo text-3xl font-bold leading-[1.1] text-white sm:text-5xl">
              Dados & IA na Prática:{" "}
              <span className="bg-[linear-gradient(90deg,#2dd4bf,#8b5cf6,#c4b5fd)] bg-clip-text text-transparent">
                vamos construir juntos
              </span>{" "}
              o seu plano de 90 dias
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              3 horas ao vivo com a Dra. Giselle Falcão, em turma pequena e com conversa de
              verdade, para desenhar — com método e sem promessas vazias — o seu próximo passo em
              Dados & IA: a virada de carreira, a IA que faz sentido na sua empresa, ou a formação
              certa para o seu momento.
            </p>
            <a
              href="#lista"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-teal-400 px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-teal-300"
            >
              Quero fazer parte da turma fundadora
              <ChevronDown className="size-4" />
            </a>
            <div className="mt-8 grid max-w-3xl gap-2.5 sm:grid-cols-2">
              {PROVAS.map((p) => (
                <div key={p.texto} className="flex items-center gap-2.5 rounded-2xl bg-white/5 px-4 py-2.5 backdrop-blur">
                  <p.Icon className="size-4 shrink-0 text-teal-300" />
                  <span className="text-xs font-semibold text-slate-200">{p.texto}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="container py-12 sm:py-16">
        <h2 className="text-center font-baloo text-2xl font-bold sm:text-3xl">
          Esta masterclass foi desenhada para três momentos
        </h2>
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
          {MOMENTOS.map((m) => (
            <div key={m.id} className="rounded-3xl border-2 border-slate-200 bg-white p-5">
              <m.Icon className="size-6 text-[#6b21a8]" />
              <p className="mt-3 text-sm font-bold leading-6">{m.titulo}</p>
              <p className="mt-1.5 text-xs leading-5 text-slate-500">{m.sub}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-7 text-slate-500">
          Você marca o seu momento no formulário — e o conteúdo, o material e o acompanhamento
          chegam calibrados para ele.
        </p>
      </section>

      {/* O que você sai sabendo */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="container py-12 sm:py-16">
          <h2 className="text-center font-baloo text-2xl font-bold sm:text-3xl">
            O que você leva das 3 horas
          </h2>
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
            {APRENDIZADOS.map((a, i) => (
              <div key={a.t} className="flex gap-4 rounded-3xl border border-slate-200/70 bg-[#f7f8fc] p-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#6b21a8] font-baloo text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-bold">{a.t}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{a.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quem conduz */}
      <section className="container py-12 sm:py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 sm:flex-row">
          <img
            src="/brand/giselle-retrato-3.jpg"
            alt="Dra. Giselle Falcão"
            className="w-56 rounded-3xl object-cover shadow-[0_18px_50px_rgba(26,19,51,0.18)]"
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-600">Quem conduz</p>
            <h2 className="mt-2 font-baloo text-2xl font-bold sm:text-3xl">Dra. Giselle Falcão</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              PhD, pesquisadora e consultora em IA industrial e ciência de dados — com soluções em
              produção no agro, na indústria e na educação, passagem pela Sorbonne, livro publicado
              (Metodologia CEOD) e palcos como DATA BH, Minas Summit e HackTown. É a mesma pessoa que
              orienta empresas com a pergunta que abre esta masterclass:{" "}
              <strong>qual dor do seu negócio a IA precisa resolver?</strong>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["PhD", "Soluções em produção", "Imprensa: O Tempo · Sagres TV", "Livro publicado"].map((chip) => (
                <span key={chip} className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-[#6b21a8]">
                  <BadgeCheck className="size-3.5" />
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section id="lista" className="scroll-mt-20 border-y border-slate-200/70 bg-[linear-gradient(180deg,#f7f8fc,#ede9fe66)]">
        <div className="container py-12 sm:py-16">
          <div className="mx-auto max-w-xl">
            <FormularioLista />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-12 sm:py-16">
        <h2 className="text-center font-baloo text-2xl font-bold sm:text-3xl">Perguntas diretas, respostas honestas</h2>
        <div className="mx-auto mt-8 max-w-2xl space-y-4">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-3xl border border-slate-200/70 bg-white p-5">
              <p className="text-sm font-bold">{f.q}</p>
              <p className="mt-2 text-sm leading-7 text-slate-500">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200/70 bg-white">
        <div className="container flex flex-col items-center gap-2 py-8 text-center text-xs text-slate-400">
          <p>Dra. Giselle Falcão · Dados & IA que entendem, transformam e impulsionam</p>
          <p>
            <Link href="/privacidade" className="underline hover:text-[#6b21a8]">
              Política de Privacidade
            </Link>{" "}
            ·{" "}
            <Link href="/giselle" className="underline hover:text-[#6b21a8]">
              Conhecer o site completo
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
