import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { minasSummitFaqIntro, minasSummitFaqItems, minasSummitHighlights, minasSummitSocialLinks } from "@/lib/minasSummitFaqData";
import { trpc } from "@/lib/trpc";
import { ArrowRight, BookOpen, Linkedin, MessageCircle, QrCode } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

const bookTitle = "IA na Prática: Anatomia de uma Solução de Machine Learning em Larga Escala — do Dado Bruto à Decisão";

export default function MinasSummitFaq() {
  const intro = minasSummitFaqIntro.pt;
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessArea: "",
  });

  const submitLeadMutation = trpc.leads.submit.useMutation({
    onSuccess: (result) => {
      setLeadForm({
        name: "",
        email: "",
        phone: "",
        businessArea: "",
      });

      toast.success(
        result.notificationSent
          ? "Cadastro enviado com sucesso. Sua entrada na lista de espera e seu contato já foram sinalizados internamente."
          : "Cadastro recebido com sucesso. Seus dados foram salvos e sua lista de espera foi registrada.",
      );
    },
    onError: () => {
      toast.error("Não foi possível registrar seu cadastro agora. Tente novamente em instantes.");
    },
  });

  const handleFieldChange =
    (field: keyof typeof leadForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setLeadForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleLeadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await submitLeadMutation.mutateAsync({
      route: "/minas-summit",
      persona: "minas-summit",
      name: leadForm.name,
      email: leadForm.email,
      phone: leadForm.phone,
      organization: "",
      businessArea: leadForm.businessArea,
      interest: "Lista de espera do livro Novatec + contato Minas Summit",
      message: `Contato captado na página Minas Summit. Interesse registrado na lista de espera do livro ${bookTitle}. Telefone: ${leadForm.phone}. Área de negócio: ${leadForm.businessArea}.`,
      source: "minas-summit-faq-waitlist",
    });
  };

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
                O melhor próximo passo é sair da abstração e olhar para dados, processo, dor operacional e impacto econômico. A conversa pode começar por uma troca simples no WhatsApp, pelo LinkedIn ou pelo cadastro abaixo.
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
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent-teal)]/12 text-[var(--accent-teal)]">
                  <BookOpen className="size-5" />
                </div>
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-teal-200">Lista de espera do livro</p>
                  <h2 className="mt-3 font-display text-2xl font-bold uppercase leading-tight text-white">
                    {bookTitle}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                    Deixe seus dados para receber novidades sobre o lançamento pela <span className="font-semibold text-white">Novatec</span>, prioridade de aviso e abertura da conversa sobre como IA aplicada, dados brutos e decisão em larga escala podem entrar na sua operação.
                  </p>
                </div>
              </div>

              <form className="mt-8 grid gap-4" onSubmit={handleLeadSubmit}>
                <Input
                  value={leadForm.name}
                  onChange={handleFieldChange("name")}
                  placeholder="Seu nome"
                  className="h-12 rounded-2xl border-white/10 bg-white/[0.03] text-white placeholder:text-slate-500"
                  required
                />
                <Input
                  type="email"
                  value={leadForm.email}
                  onChange={handleFieldChange("email")}
                  placeholder="Seu e-mail"
                  className="h-12 rounded-2xl border-white/10 bg-white/[0.03] text-white placeholder:text-slate-500"
                  required
                />
                <Input
                  value={leadForm.phone}
                  onChange={handleFieldChange("phone")}
                  placeholder="Seu telefone / WhatsApp"
                  className="h-12 rounded-2xl border-white/10 bg-white/[0.03] text-white placeholder:text-slate-500"
                  required
                />
                <Input
                  value={leadForm.businessArea}
                  onChange={handleFieldChange("businessArea")}
                  placeholder="Sua área de negócio"
                  className="h-12 rounded-2xl border-white/10 bg-white/[0.03] text-white placeholder:text-slate-500"
                  required
                />

                <Button
                  type="submit"
                  disabled={submitLeadMutation.isPending}
                  className="mt-2 rounded-full bg-[var(--accent-copper)] px-6 py-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitLeadMutation.isPending ? "Registrando cadastro..." : "Entrar na lista de espera e receber contato"}
                </Button>
              </form>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Ao enviar, seus dados ficam registrados para acompanhamento do pós-evento, contato consultivo e comunicação do lançamento do livro.
              </p>
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
