import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  Building2,
  Compass,
  FlaskConical,
  GraduationCap,
  Instagram,
  Linkedin,
  MessageCircle,
  Presentation,
  Youtube,
} from "lucide-react";
import { contact } from "@/lib/portfolioData";
import { condicaoPrimeiraTurmaAtiva } from "@/lib/fluenteData";
import { inscricoesAbertas, niveis, precoAtual, turma, type NivelId } from "@/lib/ninguemNasceFluenteData";

type Canal = "instagram" | "youtube";

// Turma 01 (NOKAHI EDU): os três cursos à venda, no topo da bio enquanto as
// inscrições estão abertas (até 22/01/2027). Cada nível leva à página de
// vendas com o canal na rota, que vira utm_source no checkout da Voomp.
// O nível 1 vai para /nivel, que é a página de vendas do Fluente e mostra os
// três níveis lado a lado. Preço: o que vale hoje (troca sozinho em 13/12).
const DESTINO_NIVEL: Record<NivelId, (canal: Canal) => string> = {
  1: (canal) => `/nivel/${canal}`,
  2: (canal) => `/do-dado-ao-valor/${canal}`,
  3: (canal) => `/mba/${canal}`,
};

/** Tipo de cada curso em uma linha curta (cabe no celular sem quebrar) */
const TIPO_CURTO: Record<NivelId, string> = {
  1: "Curso livre · 10 h",
  2: "Extensão universitária · 40 h",
  3: "Especialização lato sensu · 380 h",
};

function Turma01({ canal }: { canal: Canal }) {
  if (!inscricoesAbertas()) return null;
  const condicao = condicaoPrimeiraTurmaAtiva();
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="w-full rounded-3xl bg-[#0f3141] p-4 text-left shadow-[0_14px_40px_rgba(15,49,65,0.28)]"
      aria-label="Turma 01: inscrições abertas"
    >
      <p className="px-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#61e8bf]">
        Inscrições abertas · início {turma.inicio}
      </p>
      <h2 className="mt-1.5 px-1 text-lg font-bold leading-tight text-white">
        NOKAHI EDU · Turma 01: escolha o seu nível
      </h2>
      <div className="mt-3 space-y-2">
        {niveis.map((n) => {
          const preco = precoAtual(n);
          return (
            <Link
              key={n.id}
              href={DESTINO_NIVEL[n.id](canal)}
              data-cta={`bio-turma01-nivel-${n.id}`}
              className="flex items-center gap-3 rounded-2xl bg-white/[0.07] p-3 transition hover:bg-white/[0.12]"
            >
              <span className="flex size-10 shrink-0 flex-col items-center justify-center rounded-xl bg-[#61e8bf] leading-none text-[#0f3141]">
                <span className="text-[15px] font-bold">{n.id}</span>
                <span className="mt-0.5 text-[8px] font-bold uppercase tracking-wide">{n.rotulo}</span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-bold leading-tight text-white">{n.cursoCurto}</span>
                <span className="mt-0.5 block text-xs leading-snug text-[#b7d3db]">{TIPO_CURTO[n.id]}</span>
                <span className="mt-0.5 block whitespace-nowrap text-xs font-bold text-[#61e8bf]">
                  {preco.avista} ou {preco.parcelado}
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-[#61e8bf]" />
            </Link>
          );
        })}
      </div>
      {condicao ? (
        <p className="mt-3 px-1 text-xs text-[#b7d3db]">
          Valores da condição de primeira turma, até {turma.fimCondicao}.
        </p>
      ) : null}
    </motion.section>
  );
}

// Link-in-bio próprio, um por rede:
//  - Instagram @gisellecfalcao → coutofalcao.com/bio
//  - YouTube @GiselleCFalcao  → coutofalcao.com/youtube (links do canal e das descrições)
// Cada botão carrega ?src=<canal>&c=...: a visita e o lead ficam atribuídos
// ao canal no rastreamento (page_visits + formulários que leem a atribuição).
const TRACK: Record<Canal, string> = {
  instagram: "?src=instagram&c=bio",
  youtube: "?src=youtube&c=canal",
};

// Instagram = B2C, só 3 caminhos: primeiro o passo gratuito com resultado
// na hora, depois os cursos, e a mentoria para quem já quer ir mais fundo.
// Empresas/palestras ficam no LinkedIn; o resto, em "ver tudo" (/giselle).
// YouTube = público misto: os vídeos falam de ROI de IA nas empresas (B2B) e
// de aprender a pensar com dados (B2C), então empresa vem primeiro e a
// pessoa física tem o diagnóstico e os cursos logo abaixo.
function links(canal: Canal) {
  const t = TRACK[canal];
  if (canal === "youtube") {
    return [
      {
        href: `/diagnostico-ia${t}`,
        icon: Building2,
        titulo: "A IA da sua empresa dá retorno?",
        sub: "Diagnóstico de maturidade em 3 minutos, resultado na hora",
        destaque: true,
      },
      {
        href: `/lab${t}`,
        icon: FlaskConical,
        titulo: "Em que ponto você está travado(a)?",
        sub: "Diagnóstico pessoal de 5 minutos, gratuito",
      },
      {
        href: `/giselle/cursos${t}`,
        icon: GraduationCap,
        titulo: "Cursos gratuitos de Dados & IA",
        sub: "Aprenda a resolver problemas reais, direto no navegador",
      },
      {
        href: `/giselle/palestras${t}`,
        icon: Presentation,
        titulo: "Palestras e workshops para equipes",
        sub: "Leve este conteúdo para a sua empresa",
      },
    ];
  }
  return [
    {
      href: `/lab${t}`,
      icon: FlaskConical,
      titulo: "Em que ponto você está travado(a)?",
      sub: "Diagnóstico gratuito de 5 minutos, resultado na hora",
      destaque: true,
    },
    {
      href: `/giselle/cursos${t}`,
      icon: GraduationCap,
      titulo: "Cursos gratuitos de Dados & IA",
      sub: "Comece hoje, direto no navegador",
    },
    {
      href: `/trajetoria${t}`,
      icon: Compass,
      titulo: "Mentoria Trajetória — Turma Fundadora",
      sub: "4 semanas: direção, projeto e plano de 90 dias",
    },
  ];
}

export default function GiselleBio({ canal = "instagram" }: { canal?: Canal }) {
  const LINKS = links(canal);
  return (
    <div className="giselle-light min-h-screen bg-[#f7f8fc] font-baloo">
      <main className="mx-auto flex max-w-md flex-col items-center px-5 pb-14 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-full bg-[linear-gradient(135deg,#6b21a8,#8b5cf6,#14b8a6)] opacity-30 blur-md" />
            <img
              src="/brand/giselle-retrato-3.jpg"
              alt="Giselle Falcão"
              className="relative size-24 rounded-full border-2 border-white object-cover object-top shadow-lg"
            />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-[#1a1333]">Giselle Falcão</h1>
          <p className="mt-1 max-w-xs text-sm leading-6 text-slate-500">
            PhD · IA que entende, transforma e impulsiona. Da dor à produção, da produção ao valor.
          </p>
        </motion.div>

        <div className="mt-7 w-full">
          <Turma01 canal={canal} />
        </div>

        <div className="mt-3 w-full space-y-3">
          {LINKS.map((l, i) => (
            <motion.div
              key={l.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.08 + i * 0.05 }}
            >
              <Link
                href={l.href}
                className={`flex w-full items-center gap-3.5 rounded-2xl border-2 p-4 transition hover:-translate-y-0.5 ${
                  l.destaque
                    ? "border-[#8b5cf6] bg-white shadow-[0_10px_30px_rgba(107,33,168,0.15)]"
                    : "border-slate-200 bg-white hover:border-violet-300"
                }`}
              >
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                    l.destaque
                      ? "bg-[linear-gradient(135deg,#6b21a8,#14b8a6)] text-white"
                      : "bg-violet-50 text-[#6b21a8]"
                  }`}
                >
                  <l.icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-bold leading-tight text-[#1a1333]">{l.titulo}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">{l.sub}</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          href={`/giselle${TRACK[canal]}`}
          className="mt-5 text-sm font-semibold text-[#6b21a8] underline-offset-4 hover:underline"
        >
          Ver tudo: trilhas, livro e mais →
        </Link>

        <div className="mt-8 flex items-center gap-5">
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-slate-400 transition hover:text-teal-600"
          >
            <MessageCircle className="size-5" />
          </a>
          <a
            href="https://www.instagram.com/gisellecfalcao"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-slate-400 transition hover:text-[#6b21a8]"
          >
            <Instagram className="size-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/giselle-falcao-phd/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-slate-400 transition hover:text-[#6b21a8]"
          >
            <Linkedin className="size-5" />
          </a>
          <a
            href="https://www.youtube.com/@GiselleCFalcao"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-slate-400 transition hover:text-[#6b21a8]"
          >
            <Youtube className="size-5" />
          </a>
        </div>
        <p className="mt-4 text-xs text-slate-400">coutofalcao.com</p>
      </main>
    </div>
  );
}
