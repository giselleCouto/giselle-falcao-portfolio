import GiselleLayout from "@/components/giselle/GiselleLayout";

// Política de privacidade (LGPD) — página exigida também por plataformas de
// captação (ex.: LinkedIn Lead Gen). O conteúdo descreve o que o site FAZ de
// verdade: formulários com consentimento, métricas de navegação anônimas e
// nenhum compartilhamento comercial com terceiros. Mantenha esta página em
// sincronia com qualquer novo formulário ou coleta.

const VIGENCIA = "8 de setembro de 2026";

const secoes = [
  {
    titulo: "1. Quem somos",
    corpo: [
      "Este site (coutofalcao.com e giselle.coutofalcao.com) é mantido por Giselle Couto Falcão, consultora, mentora e palestrante em Dados e Inteligência Artificial (“Controladora”, nos termos da Lei nº 13.709/2018 — LGPD).",
      "Contato da controladora e canal para assuntos de privacidade: giselle@coutofalcao.com.",
    ],
  },
  {
    titulo: "2. Quais dados coletamos e quando",
    corpo: [
      "Coletamos dados pessoais apenas quando você os informa voluntariamente em um dos formulários do site, sempre com uma caixa de consentimento explícita:",
    ],
    lista: [
      "Cadastro de aluno(a) na plataforma de cursos: nome, e-mail e, opcionalmente, WhatsApp, cargo e organização;",
      "Pesquisa de interesse em cursos: nome, e-mail, WhatsApp (opcional), estado/região e perfil autodeclarado (escolaridade, experiência com tecnologia, dados e programação);",
      "Candidatura à mentoria: nome, e-mail, WhatsApp, LinkedIn (opcional) e as respostas do formulário de seleção;",
      "Diagnóstico de Maturidade em IA (empresas): nome, e-mail corporativo, empresa, cargo, porte e as respostas do questionário;",
      "Pedido de proposta de palestra/workshop: nome, e-mail, WhatsApp (opcional), empresa e o briefing informado;",
      "Formulários de contato: nome, e-mail e mensagem.",
    ],
  },
  {
    titulo: "3. Métricas de navegação (sem identificação pessoal)",
    corpo: [
      "Para saber quais páginas e canais de divulgação funcionam, registramos métricas anônimas de navegação: a página visitada, a origem do acesso (por exemplo, um QR code de palestra ou um link de rede social), o domínio do site de referência e a data. Não registramos endereço IP, não usamos cookies de publicidade e não criamos perfil individual de visitante.",
      "O navegador pode guardar, apenas no seu aparelho, conveniências locais como progresso de curso e rascunhos de ferramentas interativas (localStorage/sessionStorage). Essas informações não identificam você e podem ser apagadas limpando os dados do navegador.",
    ],
  },
  {
    titulo: "4. Para que usamos os dados",
    corpo: ["Os dados informados nos formulários são usados exclusivamente para:"],
    lista: [
      "Responder à sua solicitação (candidatura, diagnóstico, proposta, contato);",
      "Conduzir processos de seleção de turmas e mentorias;",
      "Enviar o resultado, recomendações ou materiais que você solicitou;",
      "Entrar em contato pelos canais que você autorizou (e-mail ou WhatsApp);",
      "Melhorar o conteúdo e a experiência do site (métricas agregadas).",
    ],
  },
  {
    titulo: "5. Base legal",
    corpo: [
      "O tratamento dos dados de formulários tem como base legal o seu consentimento (art. 7º, I, da LGPD), colhido de forma destacada em cada formulário. As métricas anônimas de navegação apoiam-se no legítimo interesse (art. 7º, IX), sem tratamento de dados pessoais identificáveis.",
    ],
  },
  {
    titulo: "6. Compartilhamento",
    corpo: [
      "Não vendemos, alugamos nem compartilhamos seus dados pessoais com terceiros para fins comerciais ou de publicidade.",
      "Os dados ficam armazenados em infraestrutura de nuvem contratada para hospedar este site (Railway, com servidores que podem estar localizados fora do Brasil), que atua como operadora e não utiliza os dados para outros fins. Poderemos compartilhar dados se exigido por lei ou ordem de autoridade competente.",
    ],
  },
  {
    titulo: "7. Retenção",
    corpo: [
      "Mantemos os dados apenas pelo tempo necessário às finalidades acima — por exemplo, durante um processo de seleção ou enquanto duram as comunicações que você autorizou — ou até que você solicite a exclusão.",
    ],
  },
  {
    titulo: "8. Seus direitos (art. 18 da LGPD)",
    corpo: [
      "Você pode, a qualquer momento e gratuitamente, solicitar: confirmação da existência de tratamento; acesso aos seus dados; correção de dados incompletos ou desatualizados; anonimização ou eliminação; e revogação do consentimento.",
      "Para exercer qualquer direito, escreva para giselle@coutofalcao.com com o assunto “Privacidade”. Responderemos no menor prazo possível, dentro dos prazos legais.",
    ],
  },
  {
    titulo: "9. Segurança",
    corpo: [
      "Adotamos medidas técnicas e organizacionais proporcionais ao porte deste site: acesso restrito ao banco de dados, comunicação criptografada (HTTPS) e coleta mínima — só pedimos o que é necessário para cada finalidade.",
    ],
  },
  {
    titulo: "10. Atualizações desta política",
    corpo: [
      `Esta política pode ser atualizada para refletir novas funcionalidades do site. A versão vigente estará sempre nesta página. Vigência a partir de ${VIGENCIA}.`,
    ],
  },
];

export default function GisellePrivacidade() {
  return (
    <GiselleLayout>
      <section className="container py-14 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">LGPD</p>
          <h1 className="mt-3 font-baloo text-4xl font-bold leading-tight text-[#1a1333]">
            Política de Privacidade
          </h1>
          <p className="mt-3 text-sm text-slate-400">Vigente desde {VIGENCIA}</p>

          <div className="mt-8 space-y-8">
            {secoes.map((s) => (
              <div key={s.titulo}>
                <h2 className="font-baloo text-xl font-bold text-[#1a1333]">{s.titulo}</h2>
                {s.corpo.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-2 text-sm leading-7 text-slate-600">
                    {p}
                  </p>
                ))}
                {s.lista ? (
                  <ul className="mt-2 list-disc space-y-1.5 pl-6">
                    {s.lista.map((item) => (
                      <li key={item.slice(0, 40)} className="text-sm leading-7 text-slate-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200/70 bg-white p-6">
            <p className="text-sm leading-7 text-slate-600">
              Dúvidas sobre esta política ou sobre seus dados? Escreva para{" "}
              <a href="mailto:giselle@coutofalcao.com" className="font-bold text-[#6b21a8] hover:underline">
                giselle@coutofalcao.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </GiselleLayout>
  );
}
