// Kit "Quem está aprendendo a dirigir?" — continuação da palestra
// "A Próxima Interface do Mundo Não Será um App: Será um Agente".
// Especificação da Giselle (KIT_ESPECIFICACAO v1.0): 3 ferramentas, tema
// escuro próprio, 100% client-side, resultado sem pedir nada, envio por deep
// link com cópia prévia. Regra da casa: nenhum texto menciona preço, mentoria,
// consultoria, turma, vaga ou prazo — o kit é generoso; a conversa nasce dele.

export const CONTATO = {
  whatsapp: "5531982280551", // se vazio, esconder a opção
  instagram: "gisellecfalcao",
  linkedin: "giselle-falcao-phd",
  padrao: "whatsapp" as "whatsapp" | "instagram" | "linkedin",
};

export const KIT_CREDITOS = "Giselle Falcão · @gisellecfalcao · in/giselle-falcao-phd";

export const kit = {
  // Âncora de marca (decisão da Giselle, 16/set): o nome curto identifica o
  // assunto para quem chega sem contexto; a pergunta-metáfora da palestra
  // permanece como título da home.
  nomeCurto: "Kit do Agente",
  titulo: "Quem está aprendendo a dirigir?",
  subtitulo:
    "Três ferramentas para você aplicar, em minutos, o que viu na palestra sobre agentes de IA. Sem cadastro. O resultado é seu.",
  rodapeHome: "Se você chegou aqui pelo HackTown: o agente é a parte fácil. Comece pelo que dói.",
  ferramentas: [
    {
      id: "diagnostico",
      n: 1,
      nome: "Diagnóstico de Prontidão",
      descricao: "Descubra em 8 perguntas o que está travando — em você ou na sua empresa.",
      tempo: "3 min",
      cta: "Começar",
      href: "/kit/diagnostico",
    },
    {
      id: "checklist",
      n: 2,
      nome: "Checklist das 5 Peças",
      descricao: "Leve para a próxima demo: é agente, automação ou chatbot com marketing?",
      tempo: "2 min",
      cta: "Abrir checklist",
      href: "/kit/checklist",
    },
    {
      id: "roteiro",
      n: 3,
      nome: "Roteiro dos 30 Dias",
      descricao: "O método 4M numa tarefa sua, semana a semana, com relatório no final.",
      tempo: "30 dias",
      cta: "Começar a semana 1",
      href: "/kit/roteiro",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Ferramenta 1 — Diagnóstico de Prontidão
// ─────────────────────────────────────────────────────────────────────────────

export type KitModo = "pessoal" | "empresa";

export type KitPergunta = {
  id: string;
  /** pessoal: competência · empresa: M do método (e8 não pontua) */
  grupo: string;
  pergunta: string;
  /** opções na ordem 0, 1, 2 pontos */
  opcoes: [string, string, string];
};

// Seis eixos (recomendação da spec: 6 eixos para não perder informação).
// A ordem de desempate da peça fraca é OUTRA (ver PESSOAL_DESEMPATE).
export const EIXOS_PESSOAL = [
  { key: "formular", nome: "Formular" },
  { key: "medir", nome: "Medir" },
  { key: "orquestrar", nome: "Orquestrar" },
  { key: "avaliar", nome: "Avaliar" },
  { key: "governar", nome: "Governar" },
  { key: "mostrar", nome: "Mostrar" },
] as const;

export type EixoPessoal = (typeof EIXOS_PESSOAL)[number]["key"];

// Medir é o gargalo mais comum e o mais barato de corrigir — desempata primeiro.
export const PESSOAL_DESEMPATE: EixoPessoal[] = [
  "medir",
  "formular",
  "governar",
  "avaliar",
  "orquestrar",
  "mostrar",
];

export const PERGUNTAS_PESSOAL: KitPergunta[] = [
  {
    id: "p1",
    grupo: "formular",
    pergunta: "Você consegue descrever, em uma frase, uma tarefa sua que passa por três ou mais sistemas?",
    opcoes: ["Não me vem nenhuma", "Consigo, mas é vaga", "Consigo — e sei exatamente qual"],
  },
  {
    id: "p2",
    grupo: "formular",
    pergunta: "Quando você pede algo a uma IA, você descreve o resultado que quer ou o passo a passo?",
    opcoes: ["Quase não uso", "O passo a passo", "O resultado — e o que conta como certo"],
  },
  {
    id: "p3",
    grupo: "medir",
    pergunta: "Você sabe quanto tempo essa tarefa leva hoje, em número?",
    opcoes: ["Não faço ideia", "Tenho um chute", "Já medi"],
  },
  {
    id: "p4",
    grupo: "medir",
    pergunta: "Antes de testar uma ferramenta nova, você define o que vai contar como “funcionou”?",
    opcoes: ["Nunca pensei nisso", "Às vezes", "Sempre, antes de começar"],
  },
  {
    id: "p5",
    grupo: "orquestrar",
    pergunta: "Você sabe quais sistemas e dados essa tarefa toca — e em que ordem?",
    opcoes: ["Não", "Mais ou menos", "Sei desenhar o fluxo"],
  },
  {
    id: "p6",
    grupo: "avaliar",
    pergunta: "Quando uma IA te dá uma resposta, você tem um jeito de conferir além de “parece bom”?",
    opcoes: ["Confio", "Releio com atenção", "Tenho um teste ou uma comparação"],
  },
  {
    id: "p7",
    grupo: "governar",
    pergunta: "Se um agente errasse no seu lugar, você saberia dizer onde ele deveria ter parado e perguntado?",
    opcoes: ["Não pensei nisso", "Tenho uma ideia", "Sei apontar o ponto de parada"],
  },
  {
    id: "p8",
    grupo: "mostrar",
    pergunta: "Você já mostrou um resultado medido para alguém do seu time nos últimos 90 dias?",
    opcoes: ["Não", "Mostrei, sem número", "Mostrei, com número"],
  },
];

export type PerfilPessoal = { nome: string; faixa: [number, number]; texto: string };

export const PERFIS_PESSOAL: PerfilPessoal[] = [
  {
    nome: "Executor Experiente",
    faixa: [0, 6],
    texto:
      "Você sabe fazer o trabalho — provavelmente melhor do que qualquer sistema. O que falta não é competência técnica: é traduzir o que você sabe em objetivo, número e critério. A boa notícia: essa é a passagem mais rápida de todas, porque o conhecimento do processo você já tem.",
  },
  {
    nome: "Formulador em Formação",
    faixa: [7, 11],
    texto:
      "Você já pensa em resultado, não só em tarefa. O que separa você de orientar um sistema com segurança é fechar o ciclo: medir antes, definir onde ele para, e mostrar o que aconteceu. Falta pouco — e é treinável.",
  },
  {
    nome: "Orientador de Sistemas",
    faixa: [12, 16],
    texto:
      "Você já opera no lugar certo: define o objetivo, mede, sabe onde a máquina deve parar. O seu próximo salto não é aprender mais — é fazer isso em escala e formar outras pessoas para fazer também.",
  },
];

export const ACAO_7_DIAS: Record<EixoPessoal, string> = {
  formular:
    "Escreva em uma frase uma tarefa sua que atravessa 3+ sistemas. Só a frase. Essa é a sua Semana 1.",
  medir:
    "Cronometre a tarefa três vezes esta semana e anote o número. Sem esse número, nada do resto conta.",
  orquestrar: "Desenhe, em papel, por quais sistemas a tarefa passa e em que ordem. Setas bastam.",
  avaliar:
    "Da próxima resposta de IA que você usar, escreva antes como vai saber se ela acertou. Depois confira.",
  governar:
    "Pegue uma tarefa que você delegaria a um agente e marque o ponto exato em que ele deveria parar e te perguntar.",
  mostrar: "Leve um número — qualquer número medido — para alguém do seu time até sexta.",
};

// ── modo empresa ─────────────────────────────────────────────────────────────

export const EMES = [
  { key: "m1", nome: "M1 · Mapear", curto: "Mapear" },
  { key: "m2", nome: "M2 · Medir", curto: "Medir" },
  { key: "m3", nome: "M3 · Montar", curto: "Montar" },
  { key: "m4", nome: "M4 · Mostrar", curto: "Mostrar" },
] as const;

export type EmeKey = (typeof EMES)[number]["key"];

// Medir é onde mais trava — desempata primeiro.
export const EMPRESA_DESEMPATE: EmeKey[] = ["m2", "m1", "m3", "m4"];

export const PERGUNTAS_EMPRESA: KitPergunta[] = [
  {
    id: "e1",
    grupo: "m1",
    pergunta: "Existe um processo específico escolhido, ou a ideia ainda é “usar IA”?",
    opcoes: ["A ideia ainda é geral", "Temos uma lista de candidatos", "Um processo escolhido, com dono"],
  },
  {
    id: "e2",
    grupo: "m1",
    pergunta: "Quem opera o processo participou do desenho da solução, ou vai receber pronto?",
    opcoes: ["Vai receber pronto", "Foi consultado", "Desenha junto, desde o início"],
  },
  {
    id: "e3",
    grupo: "m2",
    pergunta: "Alguém escreveu, antes de começar, o que vai contar como sucesso?",
    opcoes: ["Não", "Está na cabeça de alguém", "Está escrito e acordado"],
  },
  {
    id: "e4",
    grupo: "m2",
    pergunta: "Vocês sabem o custo por execução do que já roda (ou vai rodar)?",
    opcoes: ["Não", "Temos uma estimativa", "Está medido"],
  },
  {
    id: "e5",
    grupo: "m3",
    pergunta: "Está definido onde o sistema para e chama uma pessoa?",
    opcoes: ["Não pensamos nisso", "Em parte", "Sim, com regra clara"],
  },
  {
    id: "e6",
    grupo: "m3",
    pergunta: "Os dados do processo estão governados, ou “a gente sabe onde está”?",
    opcoes: ["A gente sabe onde está", "Parcialmente", "Governados, com dono e qualidade"],
  },
  {
    id: "e7",
    grupo: "m4",
    pergunta: "Existe data e público para mostrar o resultado — bom ou ruim?",
    opcoes: ["Não", "Uma ideia de quando", "Data e público definidos"],
  },
];

// E8 não pontua — abre a ramificação do projeto engavetado.
export const PERGUNTA_E8 =
  "Vocês têm alguma solução de dados ou IA pronta, aprovada e parada — um modelo, um painel, um piloto que nunca virou operação?";

export type CausaEngavetado = "operacao" | "metrica" | "dado" | "prioridade";

export const E8A_OPCOES: { causa: CausaEngavetado; label: string }[] = [
  { causa: "operacao", label: "Ninguém usa no dia a dia" },
  { causa: "metrica", label: "O número não convenceu quem decide" },
  { causa: "dado", label: "Faltou dado ou integração" },
  { causa: "prioridade", label: "Mudou a prioridade / o patrocinador saiu" },
];

export type TempoEngavetado = "menos-3" | "3-12" | "mais-12";

export const E8B_OPCOES: { tempo: TempoEngavetado; label: string }[] = [
  { tempo: "menos-3", label: "Menos de 3 meses" },
  { tempo: "3-12", label: "De 3 a 12 meses" },
  { tempo: "mais-12", label: "Mais de 12 meses" },
];

export type NivelEmpresa = { nome: string; faixa: [number, number]; texto: string };

export const NIVEIS_EMPRESA: NivelEmpresa[] = [
  {
    nome: "Piloto Bonito",
    faixa: [0, 5],
    texto:
      "Vocês estão onde 62% das empresas estão: experimentando. O que impede o piloto de virar operação não é tecnologia — é que ainda não está escrito o que conta como sucesso, quem opera não desenhou junto, ou ninguém sabe o custo por execução. A boa notícia: isso é o mais barato de consertar, e é o que separa vocês dos 23% que escalam.",
  },
  {
    nome: "Quase Operação",
    faixa: [6, 10],
    texto:
      "Vocês já passaram do demo. Falta fechar um dos quatro M — e quase sempre é o mesmo: medir antes e definir onde o sistema para. Com isso resolvido, o projeto sai da gaveta em semanas, não em trimestres.",
  },
  {
    nome: "Pronto para Escalar",
    faixa: [11, 14],
    texto:
      "Processo escolhido, métrica escrita, operação envolvida, limite desenhado. Vocês têm o que 23% das empresas têm. O próximo problema é outro: descobrir quais 2% dos processos merecem o próximo agente — e formar gente para sustentar isso sem depender de fora.",
  },
];

export const FRASE_M_TRAVANDO: Record<EmeKey, string> = {
  m1: "Ainda não está claro qual processo dói e quem decide o quê. Sem isso, vocês automatizam a coisa errada.",
  m2: "Não existe o número de hoje nem o critério de acerto escrito. É por aqui que morrem 40% dos projetos.",
  m3: "Falta o ponto de parada humano ou o dado governado. O sistema vai agir — e vocês vão descobrir o erro depois.",
  m4: "Sem data e público, o piloto fica bonito e invisível. Mostre — inclusive o que deu errado.",
};

export const VEREDITO_ENGAVETADO: Record<CausaEngavetado, string> = {
  operacao:
    "Esse projeto provavelmente morreu no M1 ou M3: quem opera não desenhou junto, ou o sistema para e pergunta na hora errada. Isso costuma ser recuperável — e é mais rápido do que começar outro.",
  metrica:
    "Morreu no M2: não havia um número de antes para comparar. Recuperar começa por medir o processo como ele roda hoje, sem o sistema.",
  dado: "Morreu no M3: o dado não estava pronto para sustentar a decisão. Muitas vezes o modelo está certo e o pipeline não. Vale um diagnóstico antes de descartar.",
  prioridade:
    "Morreu no M4: sem patrocinador e sem data para mostrar, ninguém defendeu o resultado. Se o problema ainda existe, o projeto ainda vale.",
};

export const NOTA_12_MESES =
  "Um ano parado normalmente significa que o processo mudou. O diagnóstico precisa começar pelo processo de hoje, não pelo projeto de ontem.";

// ─────────────────────────────────────────────────────────────────────────────
// Ferramenta 2 — Checklist das 5 Peças
// ─────────────────────────────────────────────────────────────────────────────

export type PecaKit = {
  n: number;
  nome: string;
  definicao: string;
  /** [pergunta, dica de leitura ("Sim = ...") opcional] */
  perguntas: { texto: string; hint?: string }[];
};

export const PECAS_KIT: PecaKit[] = [
  {
    n: 1,
    nome: "Objetivo",
    definicao: "O que precisa acontecer — não o clique que precisa ser dado.",
    perguntas: [
      { texto: "Ele recebe um objetivo, ou uma instrução passo a passo?", hint: "Sim = objetivo" },
      { texto: "Dá para dizer, em uma frase, o que conta como sucesso?" },
    ],
  },
  {
    n: 2,
    nome: "Memória",
    definicao: "O que já foi feito, decidido e aprendido antes desta conversa.",
    perguntas: [
      { texto: "Ele lembra do que foi decidido antes desta conversa?" },
      { texto: "Você consegue ver e corrigir o que ele lembra?" },
    ],
  },
  {
    n: 3,
    nome: "Ferramentas",
    definicao: "As mãos: APIs, bancos, sistemas internos, navegador, arquivos.",
    perguntas: [
      { texto: "Ele disse quais sistemas toca, ou só “integra com tudo”?", hint: "Sim = nomeou" },
      { texto: "As ações que ele executa ficam registradas (log, auditoria)?" },
    ],
  },
  {
    n: 4,
    nome: "Autonomia",
    definicao: "Até onde pode ir sozinho e onde obrigatoriamente para e pergunta.",
    perguntas: [
      { texto: "Está definido onde ele para e pergunta?" },
      { texto: "Você pode ajustar esse limite sem pedir ao fornecedor?" },
    ],
  },
  {
    n: 5,
    nome: "Avaliação",
    definicao: "Como se mede se deu certo — sem isso, é demo, não é produto.",
    perguntas: [
      { texto: "Existe um teste que prova que funcionou, ou a prova é o demo?", hint: "Sim = teste" },
      { texto: "Existe um número de acerto medido em dados reais seus?" },
    ],
  },
];

export const GARTNER_NOTA =
  "De milhares de fornecedores “agênticos”, o Gartner identificou cerca de 130 reais.";

export type VereditoKit = { nome: string; faixa: [number, number] };

export const VEREDITOS_KIT: VereditoKit[] = [
  { nome: "É um chatbot com marketing.", faixa: [0, 4] },
  { nome: "É uma automação com sotaque de conversa.", faixa: [5, 8] },
  { nome: "É um agente.", faixa: [9, 10] },
];

export function textoVeredito(sins: number, pecasFaltando: string[]): string {
  if (sins >= 9)
    return "Objetivo, memória, mãos, limite e prova. Raro. Agora a pergunta é se ele resolve um dos 2% de processos que importam.";
  if (sins >= 5) {
    const falta =
      pecasFaltando.length > 0
        ? pecasFaltando.join(", ")
        : "fechar as pontas que ficaram pela metade";
    return `Faz coisas — mas falta ${falta}. Não é problema, desde que ninguém venda como agente. Pergunte pelo que falta antes de assinar.`;
  }
  return `Devolve texto, não ação — e não há como provar que acertou. ${GARTNER_NOTA} Esse não está entre eles.`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Ferramenta 3 — Roteiro dos 30 Dias (4M)
// ─────────────────────────────────────────────────────────────────────────────

export const SEMANAS = [
  {
    n: 1,
    m: "Mapear",
    titulo: "Escolha uma tarefa sua",
    frase: "Uma tarefa chata, repetitiva, que você faz toda semana e que passa por pelo menos três sistemas.",
    dica: "Se você não consegue descrever em uma frase, a tarefa está grande demais. Corte.",
  },
  {
    n: 2,
    m: "Medir",
    titulo: "Defina o acerto",
    frase: "Antes de automatizar qualquer coisa: como você vai saber que deu certo?",
    dica: "Sem esse número, nada do resto conta. Sem medir, é achismo.",
  },
  {
    n: 3,
    m: "Montar",
    titulo: "Construa a versão feia",
    frase: "Monte a primeira versão com as ferramentas que você já tem. Feia, funcionando.",
    dica: "Versão feia, com gente do lado. O erro é o aprendizado, não o fracasso.",
  },
  {
    n: 4,
    m: "Mostrar",
    titulo: "Meça e mostre",
    frase: "Compare com o número da Semana 2. Leve o resultado — bom ou ruim — para alguém.",
    dica: "Mostre — inclusive o que deu errado.",
  },
] as const;

export const UNIDADES = ["minutos", "horas", "erros por semana", "R$"] as const;
export type Unidade = (typeof UNIDADES)[number];

export const CHECKLIST_S3 = [
  { key: "objetivo", label: "Escrevi o objetivo em uma frase, com o critério de acerto" },
  { key: "sistemas", label: "Listei os sistemas/dados que a tarefa toca, em ordem" },
  {
    key: "parada",
    label: "Defini onde ela para e me pergunta",
    aviso: "sem ponto de parada não é versão feia, é risco",
  },
  { key: "rodei", label: "Rodei pelo menos 3 vezes em casos reais" },
] as const;

export const FICOU_EM_BRANCO = "ficou em branco — e tudo bem: isso também é dado";

// ─────────────────────────────────────────────────────────────────────────────
// Mensagens de envio (§8) — sempre com src quando existir
// ─────────────────────────────────────────────────────────────────────────────

function via(src?: string) {
  return src ? ` (via ${src})` : "";
}

export function msgDiagPessoal(p: {
  src?: string;
  perfil: string;
  total: number;
  pecaFraca: string;
  tarefa?: string;
}): string {
  const tarefa = p.tarefa ? ` Minha tarefa: ${p.tarefa}.` : "";
  return `Oi Giselle! Fiz o Diagnóstico do kit${via(p.src)}. Perfil: ${p.perfil} (${p.total}/16). Peça mais fraca: ${p.pecaFraca}.${tarefa} Por onde você começaria?`;
}

export function msgDiagEmpresa(p: {
  src?: string;
  nivel: string;
  score: number;
  mTravando: string;
  engavetado: boolean;
  causa?: string;
  tempo?: string;
}): string {
  const gaveta = p.engavetado
    ? `Sim${p.causa ? ` — causa: ${p.causa}` : ""}${p.tempo ? `, há ${p.tempo}` : ""}`
    : "Não";
  return `Oi Giselle! Fiz o Diagnóstico de Prontidão da minha empresa${via(p.src)}. Nível: ${p.nivel} (${p.score}/14). M travando: ${p.mTravando}. Projeto engavetado: ${gaveta}. Topo os 15 minutos para você me dizer o que faria primeiro.`;
}

export function msgChecklist(p: {
  src?: string;
  nome?: string;
  veredito: string;
  sins: number;
  pecasFaltando: string[];
}): string {
  const alvo = p.nome?.trim() || "uma solução";
  const faltou = p.pecasFaltando.length > 0 ? ` Faltou: ${p.pecasFaltando.join(", ")}.` : "";
  return `Oi Giselle! Rodei o Checklist das 5 Peças em ${alvo}${via(p.src)}: ${p.veredito} (${p.sins}/10).${faltou} Faz sentido?`;
}

export function msgRoteiro(p: {
  src?: string;
  tarefa?: string;
  antes?: string;
  agora?: string;
  variacao?: string;
  quebrou?: string;
  proximo?: string;
}): string {
  const partes = [
    `Oi Giselle! Fechei meu ciclo de 30 dias${via(p.src)}.`,
    p.tarefa ? `Tarefa: ${p.tarefa}.` : undefined,
    p.antes && p.agora
      ? `Antes: ${p.antes} → Agora: ${p.agora}${p.variacao ? ` (${p.variacao})` : ""}.`
      : undefined,
    p.quebrou ? `O que quebrou: ${p.quebrou}.` : undefined,
    p.proximo ? `Próximo ciclo: ${p.proximo}.` : undefined,
    "Queria a sua leitura.",
  ];
  return partes.filter(Boolean).join(" ");
}

export const CAUSA_LABEL: Record<CausaEngavetado, string> = {
  operacao: "ninguém usa no dia a dia",
  metrica: "o número não convenceu quem decide",
  dado: "faltou dado ou integração",
  prioridade: "mudou a prioridade",
};

export const TEMPO_LABEL: Record<TempoEngavetado, string> = {
  "menos-3": "menos de 3 meses",
  "3-12": "de 3 a 12 meses",
  "mais-12": "mais de 12 meses",
};
