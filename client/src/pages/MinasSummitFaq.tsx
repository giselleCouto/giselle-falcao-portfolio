import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { minasSummitFaqIntro, minasSummitFaqItems, minasSummitHighlights, minasSummitSocialLinks } from "@/lib/minasSummitFaqData";
import { ArrowRight, Linkedin, MessageCircle, QrCode } from "lucide-react";
import { Link } from "wouter";

export default function MinasSummitFaq() {
  const intro = minasSummitFaqIntro.pt;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg-obsidian)] text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(32,211,194,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(255,107,74,0.12),_transparent_24%),linear-gradient(180deg,_rgba(6,7,10,1),_rgba(13,17,23,1))]" />
        <div className="grid-overlay absolute inset-0" />
      </div>

      <section className="relative container py-8 sm:py-10 lg:py-14">
        <div className="editorial-shell rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-3 border border-white/10 bg-black/20 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-teal-200">
                <QrCode className="size-4" />
                {intro.eyebrow}
              </div>
              <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold uppercase leading-[0.95] text-white sm:text-5xl lg:text-[4.4rem]">
                {intro.title}
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-200">{intro.summary}</p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">{intro.body}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href={minasSummitSocialLinks.whatsapp} target="_blank" rel="noreferrer" className="inline-flex">
                  <Button className="rounded-full bg-[var(--accent-copper)] px-6 py-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 hover:bg-white">
                    <MessageCircle className="mr-2 size-4" />
                    {intro.primaryCta}
                  </Button>
                </a>
                <a href={minasSummitSocialLinks.linkedin} target="_blank" rel="noreferrer" className="inline-flex">
                  <Button variant="outline" className="rounded-full border-[var(--accent-teal)]/30 bg-[var(--accent-teal)]/10 px-6 py-6 text-sm font-semibold uppercase tracking-[0.2em] text-teal-50 hover:bg-[var(--accent-teal)]/20 hover:text-white">
                    <Linkedin className="mr-2 size-4" />
                    {intro.secondaryCta}
                  </Button>
                </a>
                <Link href="/giselle" className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10">
                  {intro.tertiaryCta}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-px overflow-hidden border border-white/8 bg-white/8">
              {minasSummitHighlights.map((item) => (
                <div key={item} className="bg-[rgba(8,10,14,0.92)] px-6 py-6">
                  <p className="text-sm font-medium leading-7 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="thoughtworks-card rounded-[1.6rem] p-6 sm:p-8">
            <div className="story-divider pb-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[var(--accent-copper)]">Perguntas frequentes</p>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
                Respostas organizadas para consulta rápida depois da palestra
              </h2>
            </div>

            <Accordion type="single" collapsible className="mt-6 w-full">
              {minasSummitFaqItems.map((item, index) => (
                <AccordionItem key={item.question} value={`item-${index}`} className="border-white/8">
                  <AccordionTrigger className="text-left text-base font-semibold leading-7 text-white hover:text-[var(--accent-teal)]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-7 text-slate-300 sm:text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <aside className="grid gap-6 self-start">
            <div className="thoughtworks-card rounded-[1.6rem] p-6 sm:p-8">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[var(--accent-copper)]">Continuar a conversa</p>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-tight text-white">
                Quer levar IA aplicada para a sua operação?
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300">
                O melhor próximo passo é sair da abstração e olhar para dados, processo, dor operacional e impacto econômico. A conversa pode começar por uma troca simples no WhatsApp ou pelo LinkedIn.
              </p>

              <div className="mt-8 grid gap-4">
                <a
                  href={minasSummitSocialLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between border border-white/10 bg-black/20 px-5 py-4 text-sm font-medium text-white transition hover:border-[var(--accent-copper)]/40 hover:bg-black/30"
                >
                  <span>WhatsApp direto</span>
                  <MessageCircle className="size-4 text-[var(--accent-copper)]" />
                </a>
                <a
                  href={minasSummitSocialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between border border-white/10 bg-black/20 px-5 py-4 text-sm font-medium text-white transition hover:border-[var(--accent-teal)]/40 hover:bg-black/30"
                >
                  <span>Perfil no LinkedIn</span>
                  <Linkedin className="size-4 text-[var(--accent-teal)]" />
                </a>
                <Link
                  href="/giselle"
                  className="flex items-center justify-between border border-white/10 bg-black/20 px-5 py-4 text-sm font-medium text-white transition hover:border-white/20 hover:bg-black/30"
                >
                  <span>Portfólio completo</span>
                  <ArrowRight className="size-4 text-white" />
                </Link>
              </div>
            </div>

            <div className="thoughtworks-card rounded-[1.6rem] p-6 sm:p-8">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-slate-500">Mensagem final</p>
              <p className="mt-4 text-base leading-8 text-slate-300">{intro.footer}</p>
              <p className="mt-6 text-sm uppercase tracking-[0.24em] text-teal-200">Minas Summit · IA no Agro · Giselle Falcão</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
