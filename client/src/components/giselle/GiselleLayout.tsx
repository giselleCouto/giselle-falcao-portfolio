import { useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Calendar, Menu, X } from "lucide-react";
import { contact } from "@/lib/portfolioData";

const NAV_ITEMS = [
  { href: "/giselle", label: "Início" },
  { href: "/giselle/solucoes", label: "Soluções" },
  { href: "/giselle/cursos", label: "Cursos" },
  { href: "/giselle/livro", label: "Livro" },
  { href: "/giselle/servicos", label: "Serviços" },
  { href: "/giselle/sobre", label: "Sobre" },
  { href: "/giselle/contato", label: "Contato" },
];

function isActive(location: string, href: string) {
  if (href === "/giselle") return location === "/giselle";
  return location.startsWith(href);
}

export default function GiselleLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="giselle-light min-h-screen font-sans">
      {/* Navegação */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-3">
          <Link href="/giselle" onClick={() => setMenuOpen(false)}>
            <img
              src="/brand/logo-giselle.png"
              alt="Giselle Falcão"
              className="h-9 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive(location, item.href)
                    ? "bg-violet-100 text-[#6b21a8]"
                    : "text-slate-600 hover:bg-slate-100 hover:text-[#1a1333]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={contact.calendar}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-[#1a1333] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6b21a8] sm:inline-flex"
            >
              <Calendar className="size-4" />
              Agendar conversa
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              className="flex size-10 items-center justify-center rounded-full border border-slate-200 text-[#1a1333] lg:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {menuOpen ? (
          <nav className="border-t border-slate-200/70 bg-white px-4 pb-4 pt-2 lg:hidden">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-base font-semibold ${
                  isActive(location, item.href)
                    ? "bg-violet-100 text-[#6b21a8]"
                    : "text-slate-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={contact.calendar}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#1a1333] px-5 py-3 text-sm font-semibold text-white"
            >
              <Calendar className="size-4" />
              Agendar conversa
            </a>
          </nav>
        ) : null}
      </header>

      {children}

      {/* Footer */}
      <footer className="border-t border-slate-200/70 bg-white">
        <div className="container flex flex-col items-center justify-between gap-5 py-10 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <img src="/brand/logo-giselle.png" alt="Giselle Falcão" className="h-8 w-auto" />
            <p className="text-xs text-slate-400">
              © 2026 Giselle Falcão. Todos os direitos reservados.
            </p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-2">
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-200"
            >
              WhatsApp
            </a>
            <a
              href={contact.email}
              className="rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold text-violet-700 transition hover:bg-violet-200"
            >
              E-mail
            </a>
            <a
              href={contact.calendar}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-teal-100 px-4 py-1.5 text-xs font-bold text-teal-700 transition hover:bg-teal-200"
            >
              Agenda
            </a>
            <a
              href={contact.lattes}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-200"
            >
              Lattes
            </a>
            <a
              href="https://www.linkedin.com/in/giselle-falcao-phd/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-200"
            >
              LinkedIn
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
