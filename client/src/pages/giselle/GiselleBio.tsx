import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  BookOpen,
  Building2,
  Compass,
  FlaskConical,
  GraduationCap,
  Instagram,
  Linkedin,
  Mic,
  MessageCircle,
  Route as RouteIcon,
} from "lucide-react";
import { contact } from "@/lib/portfolioData";

// Link-in-bio próprio (Instagram @gisellecfalcao → coutofalcao.com/bio).
// Cada botão carrega ?src=instagram&c=bio: a visita e o lead ficam atribuídos
// ao canal no rastreamento (page_visits + formulários que leem a atribuição).
const TRACK = "?src=instagram&c=bio";

const LINKS = [
  {
    href: `/trajetoria${TRACK}`,
    icon: Compass,
    titulo: "Mentoria Trajetória — Turma Fundadora",
    sub: "4 semanas: direção, projeto e plano de 90 dias",
    destaque: true,
  },
  {
    href: `/lab${TRACK}`,
    icon: FlaskConical,
    titulo: "Em que ponto você está travado(a)?",
    sub: "Diagnóstico de 5 minutos, resultado na hora",
  },
  {
    href: `/giselle/cursos${TRACK}`,
    icon: GraduationCap,
    titulo: "Cursos gratuitos de Dados & IA",
    sub: "Comece hoje, direto no navegador",
  },
  {
    href: `/trilhas${TRACK}`,
    icon: RouteIcon,
    titulo: "Trilhas de carreira",
    sub: "Do zero ao arquiteto, na ordem certa",
  },
  {
    href: `/livro${TRACK}`,
    icon: BookOpen,
    titulo: "Livro Metodologia CEOD",
    sub: "A revolução data-driven na aprendizagem",
  },
  {
    href: `/diagnostico-ia${TRACK}`,
    icon: Building2,
    titulo: "Para empresas: maturidade em IA",
    sub: "3 minutos, com recomendações práticas",
  },
  {
    href: `/palestras${TRACK}`,
    icon: Mic,
    titulo: "Palestras e workshops",
    sub: "Do DATA BH ao Minas Summit",
  },
];

export default function GiselleBio() {
  return (
    <div className="giselle-light min-h-screen bg-[#f7f8fc] font-baloo">
      <main className="mx-auto flex max-w-md flex-col items-center px-5 pb-14 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-full bg-[linear-gradient(135deg,#6b21a8,#8b5cf6,#14b8a6)] opacity-30 blur-md" />
            <img
              src="/brand/giselle-retrato-2.jpg"
              alt="Giselle Falcão"
              className="relative size-24 rounded-full border-2 border-white object-cover object-top shadow-lg"
            />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-[#1a1333]">Giselle Falcão</h1>
          <p className="mt-1 max-w-xs text-sm leading-6 text-slate-500">
            PhD · IA que entende, transforma e impulsiona. Da dor à produção, da produção ao valor.
          </p>
        </motion.div>

        <div className="mt-7 w-full space-y-3">
          {LINKS.map((l, i) => (
            <motion.div
              key={l.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 + i * 0.05 }}
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
        </div>
        <p className="mt-4 text-xs text-slate-400">coutofalcao.com</p>
      </main>
    </div>
  );
}
