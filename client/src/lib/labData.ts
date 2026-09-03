// Laboratório da Decisão — kit interativo pós-palestra (QR do palco → /lab).
// Especificação da Giselle: página única mobile-first, 3 ferramentas que a
// pessoa APLICA em si mesma (não lê), cada resultado termina num botão de
// WhatsApp pré-preenchido com o resultado dela. Sem backend: quem "envia" é
// a própria pessoa, já chegando em conversa. Micro-copy: 2ª pessoa, curto,
// voz de palco; nenhum resultado negativo sem próximo passo.

export const WHATSAPP_NUMERO = "5531993275366";

export function waLink(texto: string) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

export const lab = {
  nome: "Laboratório da Decisão",
  bandeira: "Da dor à produção. Da produção ao valor.",
  heroTitle: "Em que ponto sua trajetória — ou seu projeto de IA — está travado?",
  heroSub: "Três ferramentas de 5 minutos. Você aplica agora, no celular, e sai com um resultado seu.",
  tese: "O mercado não precisa apenas de mais pessoas que saibam usar IA. Precisa de pessoas capazes de decidir o que vale resolver e conduzir a solução até gerar valor.",
  dados: [
    { valor: "74%", fonte: "das empresas ainda não demonstram valor tangível com IA (BCG)" },
    { valor: "22%", fonte: "passaram da prova de conceito (BCG)" },
    { valor: "63%", fonte: "dos empregadores apontam a lacuna de competências como barreira (Fórum Econômico Mundial)" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Ferramenta 1 — Diagnóstico de Prontidão
// ─────────────────────────────────────────────────────────────────────────────

export type LabModo = "pessoal" | "empresa";

export type LabOpcao = { label: string; pontos: 0 | 1 | 2 };

export type LabPergunta = {
  id: string;
  /** pessoal: eixo de competência · empresa: M do método */
  grupo: string;
  pergunta: string;
  opcoes: LabOpcao[];
  destaque?: boolean;
};

export const EIXOS_PESSOAL = [
  { key: "formular", nome: "Formular", max: 4 },
  { key: "medir", nome: "Medir", max: 4 },
  { key: "avaliar", nome: "Avaliar", max: 2 },
  { key: "comunicar", nome: "Comunicar", max: 2 },
  { key: "orquestrar", nome: "Orquestrar", max: 4 },
] as const;

export const PERGUNTAS_PESSOAL: LabPergunta[] = [
  {
    id: "p1",
    grupo: "formular",
    pergunta: "Você consegue descrever, em uma frase, uma tarefa sua que passa por três ou mais sistemas?",
    opcoes: [
      { label: "Consigo agora, de cabeça", pontos: 2 },
      { label: "Preciso pensar um pouco", pontos: 1 },
      { label: "Nunca olhei minhas tarefas assim", pontos: 0 },
    ],
  },
  {
    id: "p2",
    grupo: "formular",
    pergunta: "Você sabe qual decisão essa tarefa alimenta — quem usa o resultado dela, e para quê?",
    opcoes: [
      { label: "Sei exatamente quem e para quê", pontos: 2 },
      { label: "Sei quem usa, não sei bem para quê", pontos: 1 },
      { label: "Nunca parei para pensar", pontos: 0 },
    ],
  },
  {
    id: "p3",
    grupo: "medir",
    pergunta: "Você sabe quanto tempo essa tarefa leva hoje, em número?",
    opcoes: [
      { label: "Sei o número", pontos: 2 },
      { label: "Tenho uma noção, nunca cronometrei", pontos: 1 },
      { label: "Nunca medi", pontos: 0 },
    ],
  },
  {
    id: "p4",
    grupo: "medir",
    pergunta: "E quanto ela custa por mês — em horas suas ou em dinheiro?",
    opcoes: [
      { label: "Sei estimar em 1 minuto", pontos: 2 },
      { label: "Saberia com algum esforço", pontos: 1 },
      { label: "Não faço ideia", pontos: 0 },
    ],
  },
  {
    id: "p5",
    grupo: "avaliar",
    pergunta: "Quando uma IA te dá uma resposta, você tem um jeito de conferir se ela acertou além de “parece bom”?",
    opcoes: [
      { label: "Tenho um teste ou fonte de verdade", pontos: 2 },
      { label: "Confiro por amostragem, sem método", pontos: 1 },
      { label: "Confio no que parece bom", pontos: 0 },
    ],
  },
  {
    id: "p6",
    grupo: "comunicar",
    pergunta: "Você já mostrou um resultado medido — com número de antes e depois — para alguém do seu time nos últimos 90 dias?",
    opcoes: [
      { label: "Sim, com número", pontos: 2 },
      { label: "Mostrei, mas sem número", pontos: 1 },
      { label: "Ainda não", pontos: 0 },
    ],
  },
  {
    id: "p7",
    grupo: "orquestrar",
    pergunta: "Se um agente de IA errasse no seu lugar, você saberia dizer onde ele deveria ter parado e perguntado?",
    opcoes: [
      { label: "Sei apontar o ponto de parada", pontos: 2 },
      { label: "Intuo, mas nunca desenhei isso", pontos: 1 },
      { label: "Não saberia dizer", pontos: 0 },
    ],
  },
  {
    id: "p8",
    grupo: "orquestrar",
    pergunta: "Você já encadeou duas ou mais ferramentas para resolver algo de ponta a ponta — mesmo sem código?",
    opcoes: [
      { label: "Já, mais de uma vez", pontos: 2 },
      { label: "Uma vez, com ajuda", pontos: 1 },
      { label: "Ainda não", pontos: 0 },
    ],
  },
];

export type PerfilPessoal = {
  nome: string;
  faixa: [number, number]; // total 0-16
  resumo: string;
  boaNoticia: string;
  acao7dias: string;
};

export const PERFIS_PESSOAL: PerfilPessoal[] = [
  {
    nome: "Executor Experiente",
    faixa: [0, 6],
    resumo:
      "Você faz muito — e mede pouco. Sua experiência é real, mas hoje ela fica invisível: sem número, sem formulação, ela não vira argumento nem projeto.",
    boaNoticia:
      "A boa notícia: você já tem a matéria-prima que falta em quem só coleciona curso — tarefas reais, de processos reais. Só falta olhar para elas do jeito certo.",
    acao7dias:
      "Nos próximos 7 dias: escolha UMA tarefa sua que atravessa 3 ou mais sistemas e escreva o número de hoje dela (tempo, erros ou custo). Só isso.",
  },
  {
    nome: "Formulador em Formação",
    faixa: [7, 11],
    resumo:
      "Você já enxerga as tarefas como problemas e começou a medir. O que falta é fechar o ciclo: transformar o que você formula em uma versão que roda e em um resultado que alguém vê.",
    boaNoticia:
      "A boa notícia: você está exatamente no ponto em que um ciclo de 30 dias bem conduzido muda de patamar — é o perfil que mais acelera.",
    acao7dias:
      "Nos próximos 7 dias: pegue a tarefa que você já sabe descrever e registre o número de hoje. Depois desenhe, no papel, onde uma automação deveria PARAR e te chamar.",
  },
  {
    nome: "Orientador de Sistemas",
    faixa: [12, 16],
    resumo:
      "Você formula, mede, avalia e sabe onde o sistema deve parar. Seu próximo salto não é técnico: é conduzir outras pessoas e projetos por esse ciclo — e cobrar valor por isso.",
    boaNoticia:
      "A boa notícia: o mercado tem fila para quem faz o que você já faz. O que falta é evidência visível e posicionamento.",
    acao7dias:
      "Nos próximos 7 dias: transforme um resultado que você já obteve em um relatório de uma página (antes, depois, o que quebrou) e mostre para uma pessoa que decide.",
  },
];

// ── modo empresa ────────────────────────────────────────────────────────────

export const EMES = [
  { key: "m1", nome: "M1 · Mapear", curto: "Mapear" },
  { key: "m2", nome: "M2 · Medir", curto: "Medir" },
  { key: "m3", nome: "M3 · Materializar", curto: "Materializar" },
  { key: "m4", nome: "M4 · Multiplicar", curto: "Multiplicar" },
] as const;

export const PERGUNTAS_EMPRESA: LabPergunta[] = [
  {
    id: "e1",
    grupo: "m1",
    pergunta: "Existe um processo específico escolhido — ou a ideia ainda é “usar IA”?",
    opcoes: [
      { label: "Processo escolhido e delimitado", pontos: 2 },
      { label: "Temos candidatos, sem decisão", pontos: 1 },
      { label: "A ideia ainda é “usar IA”", pontos: 0 },
    ],
  },
  {
    id: "e2",
    grupo: "m1",
    pergunta: "Alguém escreveu, antes de começar, o que vai contar como sucesso?",
    opcoes: [
      { label: "Sim, com número e prazo", pontos: 2 },
      { label: "Está combinado, não escrito", pontos: 1 },
      { label: "Não", pontos: 0 },
    ],
  },
  {
    id: "e3",
    grupo: "m2",
    pergunta: "Vocês sabem o custo por execução do que já roda — ou o custo atual do processo?",
    opcoes: [
      { label: "Sabemos o número", pontos: 2 },
      { label: "Temos estimativa solta", pontos: 1 },
      { label: "Não sabemos", pontos: 0 },
    ],
  },
  {
    id: "e4",
    grupo: "m2",
    pergunta: "Existe um número de “antes” registrado — tempo, erro ou custo do processo hoje?",
    opcoes: [
      { label: "Registrado e aceito por todos", pontos: 2 },
      { label: "Existe, mas ninguém confia muito", pontos: 1 },
      { label: "Não existe", pontos: 0 },
    ],
  },
  {
    id: "e5",
    grupo: "m3",
    pergunta: "Está definido onde o sistema para e chama uma pessoa?",
    opcoes: [
      { label: "Definido e testado", pontos: 2 },
      { label: "Definido no papel", pontos: 1 },
      { label: "Não está definido", pontos: 0 },
    ],
  },
  {
    id: "e6",
    grupo: "m3",
    pergunta: "Os dados do processo estão governados — ou “a gente sabe onde está”?",
    opcoes: [
      { label: "Governados: dono, acesso e qualidade", pontos: 2 },
      { label: "Organizados, sem governança formal", pontos: 1 },
      { label: "“A gente sabe onde está”", pontos: 0 },
    ],
  },
  {
    id: "e7",
    grupo: "m4",
    pergunta: "Quem opera o processo participou do desenho — ou vai receber pronto?",
    opcoes: [
      { label: "Participa desde o início", pontos: 2 },
      { label: "Foi consultado uma vez", pontos: 1 },
      { label: "Vai receber pronto", pontos: 0 },
    ],
  },
  {
    id: "e8",
    grupo: "engavetado",
    destaque: true,
    pergunta:
      "Vocês têm alguma solução de dados ou IA pronta, aprovada e parada — um modelo, um painel, um piloto que nunca virou operação?",
    opcoes: [
      { label: "Sim, pelo menos uma", pontos: 0 },
      { label: "Não", pontos: 2 },
      { label: "Não sei dizer", pontos: 1 },
    ],
  },
];

// Ramificação para quem tem projeto engavetado (e8 = "Sim")
export const PERGUNTAS_ENGAVETADO: LabPergunta[] = [
  {
    id: "g1",
    grupo: "m1",
    pergunta: "Esse projeto tinha um número de sucesso definido — ou o objetivo era “ver funcionando”?",
    opcoes: [
      { label: "Tinha número definido", pontos: 2 },
      { label: "Tinha objetivo, sem número", pontos: 1 },
      { label: "Era “ver funcionando”", pontos: 0 },
    ],
  },
  {
    id: "g2",
    grupo: "m3",
    pergunta: "Quem usaria a solução no dia a dia chegou a operá-la por pelo menos uma semana?",
    opcoes: [
      { label: "Sim, operou de verdade", pontos: 2 },
      { label: "Viu uma demonstração", pontos: 1 },
      { label: "Nunca tocou nela", pontos: 0 },
    ],
  },
];

export type NivelEmpresa = {
  nome: string;
  faixa: [number, number]; // total e1-e7 (0-14)
  resumo: string;
  boaNoticia: string;
};

export const NIVEIS_EMPRESA: NivelEmpresa[] = [
  {
    nome: "Piloto Bonito",
    faixa: [0, 5],
    resumo:
      "Há movimento e boa vontade — mas sem processo delimitado, sem número de antes e sem ponto de parada, o que existe é demonstração, não operação.",
    boaNoticia:
      "Piloto Bonito não é bronca, é diagnóstico — e a boa notícia é que essa é a fase mais barata de consertar: uma semana de definição vale mais que três meses de desenvolvimento.",
  },
  {
    nome: "Quase Operação",
    faixa: [6, 10],
    resumo:
      "O essencial existe, mas há um elo solto — em geral o número que prova valor ou a adoção de quem opera. É exatamente aqui que a maioria dos projetos morre engavetada.",
    boaNoticia:
      "A boa notícia: a distância até a operação é menor do que parece. O que falta é específico, nomeável — e recuperável.",
  },
  {
    nome: "Pronto para Escalar",
    faixa: [11, 14],
    resumo:
      "Processo escolhido, número registrado, parada humana definida e gente da operação no desenho. Vocês estão à frente de 78% do mercado — o desafio agora é escala e custo por execução.",
    boaNoticia:
      "A boa notícia: nesse estágio, cada novo caso custa menos que o anterior. O risco muda de nome: vira governança e FinOps.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Ferramenta 2 — Checklist das 5 Peças (vacina contra agent washing)
// ─────────────────────────────────────────────────────────────────────────────

export type PecaChecklist = {
  nome: string;
  perguntas: [string, string];
};

export const PECAS: PecaChecklist[] = [
  {
    nome: "Objetivo",
    perguntas: [
      "Ele te disse qual resultado de negócio o agente melhora — com número?",
      "Existe algum caso em que o agente decide NÃO agir?",
    ],
  },
  {
    nome: "Memória",
    perguntas: [
      "Ele explicou o que o agente lembra entre uma interação e outra?",
      "Dá para auditar o que o agente sabia na hora em que decidiu?",
    ],
  },
  {
    nome: "Ferramentas",
    perguntas: [
      "Ele te disse quais sistemas o agente toca — ou só “integra com tudo”?",
      "Você viu o agente executar uma ação real, e não um slide dela?",
    ],
  },
  {
    nome: "Autonomia",
    perguntas: [
      "Está claro o que ele faz sozinho e o que pede permissão?",
      "Existe um ponto definido onde ele para e chama uma pessoa?",
    ],
  },
  {
    nome: "Avaliação",
    perguntas: [
      "Existe um teste que prova que funcionou — ou a prova é o demo?",
      "Ele mostrou a taxa de erro e o que acontece quando erra?",
    ],
  },
];

export type VereditoChecklist = { nome: string; faixa: [number, number]; frase: string };

export const VEREDITOS_CHECKLIST: VereditoChecklist[] = [
  {
    nome: "É um chatbot com marketing",
    faixa: [0, 3],
    frase: "Peça o demo de novo — dessa vez com as suas perguntas. Se as respostas não mudarem, o nome não muda.",
  },
  {
    nome: "É uma automação com sotaque de conversa",
    faixa: [4, 7],
    frase: "Pode até ser útil — mas cobre preço de automação, não de agente. E exija o teste que prova.",
  },
  {
    nome: "É um agente",
    faixa: [8, 10],
    frase: "Raridade verificada. Agora a pergunta muda: qual decisão ele melhora, e por quanto?",
  },
];

export const GARTNER_NOTA =
  "Gartner: dos milhares de “agentes de IA” anunciados no mercado, cerca de 130 eram agentes de verdade.";

export const ASSINATURA_CARTAO = "Giselle Falcão · @gisellecfalcao · coutofalcao.com/lab";

// ─────────────────────────────────────────────────────────────────────────────
// Ferramenta 3 — Roteiro dos 30 Dias
// ─────────────────────────────────────────────────────────────────────────────

export const ROTEIRO_STORAGE_KEY = "lab-roteiro-30d";

export const CHECKLIST_S3 = [
  "Fluxo desenhado no papel (feio mesmo)",
  "Primeira versão rodando com dados reais",
  "Ponto de parada humano definido e testado",
  "Uma pessoa do time usando junto",
];

// ─────────────────────────────────────────────────────────────────────────────
// Próximos passos por rota (fecho da página)
// ─────────────────────────────────────────────────────────────────────────────

export const PROXIMOS_PASSOS = {
  pessoal: [
    { label: "Mentoria Trajetória (turma fundadora)", href: "/giselle/mentoria/trajetoria" },
    { label: "Cursos gratuitos para começar", href: "/giselle/cursos" },
    { label: "Comunidade de aprendizado", href: "/giselle/mentoria" },
  ],
  empresa: [
    { label: "Diagnóstico de Maturidade em IA (3 min)", href: "/diagnostico-ia" },
    { label: "Palestras e formações corporativas", href: "/giselle/palestras" },
  ],
};
