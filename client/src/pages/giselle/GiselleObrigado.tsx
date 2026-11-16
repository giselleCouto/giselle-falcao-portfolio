import { useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Mail, MessageCircle } from "lucide-react";
import GiselleLayout from "@/components/giselle/GiselleLayout";
import { INK, MINT, NotaLegal, Rotulo, SURFACE, TEAL, fadeUp } from "@/components/nokahiEdu/Venda";
import { doDadoAoValor as ddv } from "@/lib/doDadoAoValorData";
import { turma01, whatsappUrl } from "@/lib/turma01Data";
import { LINK_NAO_OBRIGADO, carregarScriptUpsell, upsellFluenteAtual } from "@/lib/upsellData";

// Páginas pós-compra da Turma 01 (fora do índice dos buscadores):
// - /obrigado/fluente: depois de pagar o Fluente em IA completo, confirma a
//   inscrição e convida para a extensão Do Dado ao Valor (upsell da Voomp);
// - /obrigado/fluente/confirmado: quem disse "não, obrigado";
// - /obrigado/do-dado-ao-valor: quem aceitou o convite ou comprou a extensão.
// Tom da casa: confiança primeiro, convite sem pressão, "não, obrigado" visível.

export type PaginaObrigado = "fluente" | "fluente-confirmado" | "do-dado-ao-valor";

const PROXIMOS_PASSOS = [
  {
    icone: Mail,
    titulo: "Confira o seu e-mail",
    texto: "A Voomp Creators envia a confirmação da compra para o e-mail que você usou no pagamento. Se não encontrar, olhe também no spam e nas promoções.",
  },
  {
    icone: CalendarDays,
    titulo: `A Turma 01 começa em ${turma01.inicio}`,
    texto: "Antes do início, você recebe por e-mail as instruções para entrar no ambiente do curso.",
  },
  {
    icone: MessageCircle,
    titulo: "Ficou alguma dúvida?",
    texto: "Fale comigo no WhatsApp. Eu respondo pessoalmente, de segunda a sexta, das 8h às 18h.",
  },
];

function ProximosPassos({ mensagemWhats }: { mensagemWhats: string }) {
  return (
    <section style={{ backgroundColor: SURFACE }}>
      <div className="container py-14 sm:py-16">
        <Rotulo>Próximos passos</Rotulo>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {PROXIMOS_PASSOS.map((p) => (
            <div key={p.titulo} className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(15,49,65,0.06)]">
              <p.icone className="size-6" style={{ color: TEAL }} />
              <p className="mt-4 font-bold leading-6" style={{ color: INK }}>
                {p.titulo}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{p.texto}</p>
            </div>
          ))}
        </div>
        <a
          href={whatsappUrl(mensagemWhats)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
          style={{ backgroundColor: TEAL }}
        >
          <MessageCircle className="size-4" />
          Falar com a Giselle no WhatsApp
        </a>
      </div>
    </section>
  );
}

function Topo({ rotulo, titulo, texto }: { rotulo: string; titulo: string; texto: string }) {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: INK }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(97,232,191,0.20),transparent_45%),radial-gradient(circle_at_10%_10%,rgba(17,175,200,0.18),transparent_40%)]" />
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        className="container relative py-12 sm:py-16"
      >
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: MINT }}>
          <CheckCircle2 className="size-4" />
          {rotulo}
        </p>
        <h1 className="mt-5 max-w-3xl font-baloo text-4xl font-bold leading-[1.06] text-white sm:text-5xl">{titulo}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">{texto}</p>
      </motion.div>
    </section>
  );
}

/** Convite para a extensão com o botão de upsell da Voomp. */
function ConviteExtensao() {
  const oferta = upsellFluenteAtual();
  useEffect(() => {
    carregarScriptUpsell();
  }, []);
  const comCondicao = oferta.preco !== oferta.regular;

  return (
    <section className="container py-14 sm:py-16">
      <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_10px_30px_rgba(15,49,65,0.06)] sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Rotulo>Um convite, se fizer sentido para você</Rotulo>
          <h2 className="mt-3 font-baloo text-3xl font-bold leading-tight sm:text-4xl" style={{ color: INK }}>
            Do uso da IA às decisões sobre IA
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            O Fluente em IA ensina a usar IA com segurança no dia a dia. A extensão universitária{" "}
            <strong style={{ color: INK }}>{ddv.nomeCompleto}</strong> é o passo seguinte: ensina a decidir quais
            projetos de IA dão retorno, e quais não dão, para você levar critério às conversas da sua área.
          </p>
          <ul className="mt-6 space-y-2.5">
            {[...ddv.fatos, "Certificado emitido pela Anhanguera, instituição credenciada pelo MEC", `Começa junto com a Turma 01, em ${turma01.inicio}`].map(
              (f) => (
                <li key={f} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" style={{ color: TEAL }} />
                  {f}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="flex flex-col justify-center rounded-3xl p-6 sm:p-8" style={{ backgroundColor: SURFACE }}>
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: TEAL }}>
            {comCondicao ? "Condição de primeira turma" : "Extensão Do Dado ao Valor"}
          </p>
          <p className="mt-2 font-baloo text-4xl font-bold" style={{ color: INK }}>
            {oferta.preco}
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {comCondicao
              ? `Até ${turma01.fimCondicao}; depois, o valor é ${oferta.regular}.`
              : "Pagamento pela Voomp Creators, com a mesma segurança do checkout."}
          </p>

          {/* Botão da Voomp: o upsell.js habilita e faz a compra; o estilo é o da casa */}
          <button
            type="button"
            data-voomp-upsell={oferta.id}
            data-voomp-one-click="false"
            disabled
            className="mt-6 w-full cursor-pointer rounded-full px-6 py-4 text-base font-bold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            style={{ backgroundColor: MINT, color: INK }}
          >
            Sim, quero a extensão por {oferta.preco}
          </button>
          <a
            href="#"
            data-voomp-new-payment={oferta.id}
            className="mt-3 text-center text-sm font-semibold hover:underline"
            style={{ color: TEAL }}
          >
            Escolher outro método de pagamento
          </a>
          <a
            id="not-buy-link"
            data-voomp-not-buy-link={oferta.id}
            href={LINK_NAO_OBRIGADO}
            className="mt-5 rounded-full border-2 border-slate-300 px-6 py-3 text-center text-sm font-bold text-slate-600 transition hover:border-slate-400"
          >
            Não, obrigado. Quero seguir só com o Fluente em IA.
          </a>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            O botão de compra é liberado logo depois do pagamento do Fluente em IA. Se ele não responder, fale comigo
            pelo WhatsApp, que eu te ajudo.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function GiselleObrigado({ pagina }: { pagina: PaginaObrigado }) {
  if (pagina === "fluente") {
    return (
      <GiselleLayout>
        <Topo
          rotulo="Inscrição confirmada · Fluente em IA completo"
          titulo="Que bom ter você na Turma 01!"
          texto={`Sua inscrição no Fluente em IA completo está confirmada. A turma começa em ${turma01.inicio}, e eu vou estar junto em cada etapa.`}
        />
        <ConviteExtensao />
        <ProximosPassos mensagemWhats="Oi, Giselle! Acabei de me inscrever no Fluente em IA completo e tenho uma dúvida:" />
        <NotaLegal texto={ddv.notaLegal} />
      </GiselleLayout>
    );
  }

  if (pagina === "fluente-confirmado") {
    return (
      <GiselleLayout>
        <Topo
          rotulo="Inscrição confirmada · Fluente em IA completo"
          titulo="Tudo certo, sua vaga na Turma 01 está garantida"
          texto={`Sua inscrição no Fluente em IA completo está confirmada. A turma começa em ${turma01.inicio}. Se um dia quiser seguir para a extensão Do Dado ao Valor ou para o MBA, é só me chamar.`}
        />
        <ProximosPassos mensagemWhats="Oi, Giselle! Me inscrevi no Fluente em IA completo e tenho uma dúvida:" />
      </GiselleLayout>
    );
  }

  return (
    <GiselleLayout>
      <Topo
        rotulo="Inscrição confirmada · Do Dado ao Valor"
        titulo="Pronto, você está na extensão Do Dado ao Valor"
        texto={`Sua inscrição na extensão universitária ${ddv.nomeCompleto} está confirmada. Se você também se inscreveu no Fluente em IA completo, vai receber as duas confirmações por e-mail. A Turma 01 começa em ${turma01.inicio}.`}
      />
      <ProximosPassos mensagemWhats="Oi, Giselle! Me inscrevi na extensão Do Dado ao Valor e tenho uma dúvida:" />
      <NotaLegal texto={ddv.notaLegal} />
    </GiselleLayout>
  );
}
