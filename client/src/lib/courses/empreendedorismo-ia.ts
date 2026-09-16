import type { Course } from "./types";

// Curso gratuito "Empreendedorismo com IA" — programa da Giselle para jovens
// empreendedores: identificar oportunidades, desenvolver soluções e criar
// negócios sustentáveis usando IA de forma prática e ética.
// Funil deliberado: práticas navegáveis 100% no navegador → desafio final →
// conversa de diagnóstico de mentoria (nextSteps) → aprofundamento no curso
// pago "IA na Prática". Regras da casa: nunca prometer emprego, investimento
// ou faturamento; só ferramentas gratuitas de navegador nas práticas.

const GEMINI_URL = "https://gemini.google.com/";
const MIRO_EMPATIA_URL = "https://miro.com/pt/modelos/mapa-de-empatia/";
const MIRO_CANVAS_URL = "https://miro.com/pt/modelos/business-model-canvas/";
const TEACHABLE_URL = "https://teachablemachine.withgoogle.com/";
const ZAPIER_GPT_URL = "https://zapier.com/apps/chatgpt/integrations";
const FORMS_URL = "https://docs.google.com/forms/";
const CANVA_URL = "https://www.canva.com/";
const GLIDE_URL = "https://www.glideapps.com/";

const MENTORIA_HREF = "/giselle/mentoria?src=curso&c=empreendedorismo-ia";
const IA_NA_PRATICA_HREF = "/giselle/cursos/ia-na-pratica?src=curso&c=empreendedorismo-ia";

export const empreendedorismoIa: Course = {
  slug: "empreendedorismo-ia",
  title: "Empreendedorismo com IA: da Ideia ao Negócio",
  level: "Iniciante",
  hours: "24h",
  free: true,
  tagline:
    "Identifique uma dor real, valide com gente de verdade e construa um MVP com IA sem escrever código — em 8 módulos práticos, do problema ao pitch.",
  description:
    "Programa gratuito para jovens empreendedores que querem usar Inteligência Artificial de forma prática e ética: como pensar orientado por dados, encontrar oportunidades onde a IA gera impacto de verdade, prototipar com ferramentas no-code gratuitas, validar um MVP, desenhar o modelo de negócio (com LGPD desde o início) e apresentar a solução em um pitch honesto. Termina com um desafio real — e com a porta aberta para mentoria de negócio com a Dra. Giselle.",
  outcomes: [
    "Explicar, sem jargão, o que a IA faz bem hoje, o que ela não faz e onde ela gera valor em um negócio pequeno",
    "Identificar dores reais de mercado com mapa de empatia e canvas de proposta de valor — antes de pensar em tecnologia",
    "Distinguir IA, Machine Learning, Deep Learning e IA generativa, e escolher a abordagem certa para cada problema",
    "Prototipar uma solução com IA usando apenas ferramentas gratuitas de navegador (Teachable Machine, Zapier/Make, Glide)",
    "Montar e validar um MVP com entrevistas, formulário e piloto — avaliando viabilidade técnica e ética do uso da IA",
    "Desenhar um modelo de negócio (B2B, SaaS, plataforma ou produto inteligente) com monetização e LGPD desde o desenho",
    "Construir um pitch de 3 minutos com storytelling e números honestos, e saber onde buscar fomento no Brasil",
  ],
  audience:
    "Jovens empreendedores, estudantes e donos de pequenos negócios que querem criar (ou turbinar) um negócio usando IA — sem precisar saber programar. Também serve a quem participa de programas de empreendedorismo, incubadoras e feiras de negócio.",
  prerequisites:
    "Nenhum conhecimento técnico. Você vai precisar de um navegador, uma conta Google gratuita e disposição para conversar com clientes de verdade. Tudo que o curso usa é gratuito.",
  status: "disponivel",
  modules: [
    // ─────────────────────────────────────────────────────────────────────
    {
      id: "modulo-1",
      title: "Módulo 1 · Introdução ao Empreendedorismo com IA",
      subtitle: "O que é IA, por que ela importa para negócios e como pensar orientado por dados",
      duration: "3h",
      free: true,
      lessons: [
        {
          title: "O que é IA e por que ela importa para negócios hoje",
          type: "leitura",
          duration: "30min",
          summary: "IA sem mistério: previsão, classificação, recomendação e geração — e por que isso virou vantagem competitiva.",
          content:
            "Esqueça robôs de filme. Na prática de negócios, Inteligência Artificial é um conjunto de técnicas que fazem quatro coisas muito bem: prever (quanto vou vender no próximo mês?), classificar (este cliente tem perfil de inadimplência?), recomendar (qual produto oferecer para esta pessoa?) e gerar (escreva a descrição deste produto, resuma este contrato). Cada uma dessas capacidades resolve um tipo diferente de dor — e o erro mais comum do empreendedor iniciante é começar pela tecnologia em vez de começar pela dor.\n\nPor que isso importa agora? Porque o custo de usar IA despencou. Há cinco anos, treinar um modelo exigia equipe técnica e meses de trabalho. Hoje, ferramentas gratuitas de navegador permitem prototipar um classificador de imagens em uma tarde, e modelos generativos (como ChatGPT e Gemini) executam tarefas de texto que antes exigiam contratar alguém. A barreira caiu — o que significa que a vantagem não está mais em ter acesso à IA, e sim em saber onde aplicá-la.\n\nA pergunta que guia este curso inteiro — e que a Dra. Giselle repete para toda empresa que orienta — é: qual dor do seu negócio (ou do seu cliente) a IA precisa resolver? Note a ordem: primeiro a dor, depois a ferramenta. Um negócio não precisa 'de IA'; precisa vender mais, perder menos, atender melhor ou decidir mais rápido. A IA é meio, nunca fim.\n\nAo longo dos 8 módulos, você vai percorrer o caminho completo: entender o que a IA faz (Módulos 1 e 3), encontrar uma dor que valha a pena resolver (Módulo 2), construir uma solução sem código (Módulo 4), validá-la com gente de verdade (Módulo 5), transformá-la em negócio (Módulos 6 e 7) e apresentá-la num desafio final com mentoria (Módulo 8).",
        },
        {
          title: "Exemplos reais: como negócios usam IA no Brasil",
          type: "leitura",
          duration: "30min",
          summary: "Casos públicos de empresas brasileiras — e o padrão que se repete em todos eles.",
          content:
            "Olhe para casos públicos brasileiros e um padrão aparece. O iFood usa modelos de previsão para estimar demanda e otimizar rotas de entrega — a dor é logística, não 'ter IA'. O Nubank usa modelos de risco para analisar crédito e IA generativa para acelerar o atendimento — a dor é decidir rápido sem aumentar a inadimplência. No agro, empresas como a Agrosmart usam sensores e modelos preditivos para recomendar irrigação — a dor é desperdício de água e perda de safra. No varejo, a Magazine Luiza recomenda produtos com base no comportamento de navegação — a dor é converter visita em venda.\n\nRepare no que esses casos têm em comum: (1) a dor veio primeiro e é mensurável em dinheiro, tempo ou risco; (2) os dados já existiam dentro da operação (pedidos, transações, sensores, navegação); (3) a IA entrou como camada de decisão sobre esses dados — não como produto em si.\n\nAgora o mais importante para você: nada disso é exclusivo de empresa grande. Uma clínica de bairro tem histórico de agendamentos (e faltas). Uma loja de roupas tem histórico de vendas por tamanho e estação. Um restaurante tem pedidos por dia da semana e clima. Onde há registro, há dado; onde há dado e decisão repetida, há espaço para IA. O seu trabalho como empreendedor é enxergar essas dores antes dos outros — e é exatamente isso que o Módulo 2 ensina.",
        },
        {
          title: "Radar de oportunidades: 10 negócios ao seu redor",
          type: "pratica",
          duration: "1h45",
          practiceTool: "Gemini ou ChatGPT (grátis)",
          practiceUrl: GEMINI_URL,
          summary:
            "Liste 10 negócios que você conhece de perto (do bairro, da família, onde você já trabalhou). Para cada um, escreva: qual decisão o dono toma toda semana no 'achismo'? Que registro (caderno, planilha, WhatsApp, sistema) esse negócio já tem? Depois, use o Gemini ou ChatGPT como parceiro de brainstorm: descreva um dos negócios e peça 'liste 5 decisões deste negócio que poderiam melhorar com dados que ele já tem — e diga qual dado seria necessário para cada uma'. Compare as respostas da IA com as suas: onde a IA acertou, onde inventou, onde você sabe mais que ela (spoiler: sobre o contexto local, você sempre sabe). Entrega: sua lista de 10 negócios com pelo menos 1 oportunidade de decisão-com-dados em cada.",
        },
        {
          title: "Quiz do Módulo 1",
          type: "quiz",
          duration: "15min",
          summary: "Quatro questões sobre o que a IA faz bem, o padrão dos casos reais e a pergunta que vem antes da tecnologia.",
        },
      ],
      quiz: [
        {
          prompt: "Qual é a ordem certa de raciocínio para um empreendedor que quer usar IA?",
          options: [
            "Escolher a ferramenta de IA mais moderna e depois procurar onde aplicá-la no negócio.",
            "Identificar primeiro a dor do negócio (vender mais, perder menos, decidir mais rápido) e só então escolher se — e qual — IA resolve.",
            "Contratar um programador antes de qualquer coisa.",
          ],
          correctIndex: 1,
          explanation:
            "A IA é meio, nunca fim. 'Qual dor do seu negócio a IA precisa resolver?' vem antes de qualquer escolha de ferramenta — é o fio condutor do curso inteiro.",
        },
        {
          prompt: "Quais são as quatro capacidades práticas da IA para negócios apresentadas no módulo?",
          options: [
            "Programar, desenhar, calcular e traduzir.",
            "Prever, classificar, recomendar e gerar.",
            "Automatizar, robotizar, digitalizar e conectar.",
          ],
          correctIndex: 1,
          explanation:
            "Prever (demanda), classificar (risco), recomendar (produto certo) e gerar (texto, imagem, resumo) — cada dor de negócio mapeia para uma dessas capacidades.",
        },
        {
          prompt: "O que os casos reais (iFood, Nubank, Agrosmart, Magalu) têm em comum?",
          options: [
            "Todos criaram a própria IA do zero, com laboratórios enormes.",
            "A dor mensurável veio primeiro, os dados já existiam na operação e a IA entrou como camada de decisão — não como produto em si.",
            "Todos usam o mesmo modelo de IA generativa.",
          ],
          correctIndex: 1,
          explanation:
            "O padrão que se repete: dor mensurável + dado que já existe + IA como apoio à decisão. É o mesmo padrão que um negócio pequeno pode reproduzir na sua escala.",
        },
        {
          prompt: "Uma loja de bairro 'não tem dados'. Verdadeiro ou falso?",
          options: [
            "Verdadeiro — só empresas grandes têm dados.",
            "Falso — caderno de fiado, histórico de vendas, conversas de WhatsApp e agendamentos são dados; onde há registro e decisão repetida, há espaço para IA.",
            "Verdadeiro — dados só contam se estiverem num banco de dados profissional.",
          ],
          correctIndex: 1,
          explanation:
            "Dado é registro, em qualquer formato. A prática do módulo pede exatamente isso: enxergar os registros que os negócios ao seu redor já têm e ninguém usa.",
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────
    {
      id: "modulo-2",
      title: "Módulo 2 · Identificação de Problemas e Oportunidades",
      subtitle: "Dores reais, mapa de empatia, proposta de valor — e onde a IA gera impacto",
      duration: "3h",
      free: true,
      lessons: [
        {
          title: "Como observar dores reais no mercado",
          type: "leitura",
          duration: "30min",
          summary: "Dor de verdade tem frequência, custo e alguém disposto a resolver — aprenda a separar dor de opinião.",
          content:
            "Ideia de negócio boa não nasce de 'tive uma ideia genial no banho'. Nasce de uma dor que se repete, custa caro (em dinheiro, tempo ou estresse) e para a qual alguém já tenta, sem sucesso, uma gambiarra. Se as pessoas já montam planilhas tortas, contratam freelancer, ou perdem horas toda semana com o problema — isso é sinal de dor real. Se ninguém faz nada a respeito, provavelmente é só um incômodo.\n\nO teste das três perguntas: (1) Com que frequência essa dor acontece? Dor diária ou semanal vale mais que dor anual. (2) Quanto ela custa? Estime em reais ou horas — 'o dono perde 5 horas por semana montando escala de funcionários' é uma dor quantificada. (3) Quem sofre e quem paga? Nem sempre é a mesma pessoa: o funcionário sofre com a escala ruim, mas quem paga pela solução é o dono.\n\nOnde observar: converse com donos de negócio (a prática do Módulo 1 já te deu 10 candidatos), leia reclamações públicas (Reclame Aqui, avaliações do Google Maps, grupos de WhatsApp e Facebook do seu setor), e observe processos de perto — a dor mora nos momentos em que alguém digita a mesma coisa duas vezes, confere manualmente, ou decide 'no olho'.\n\nRegra de ouro deste módulo: você ainda NÃO está procurando onde usar IA. Está procurando dor. A IA só entra na última aula — e só se couber.",
        },
        {
          title: "Ferramentas: mapa de empatia, Design Thinking e canvas de proposta de valor",
          type: "leitura",
          duration: "35min",
          summary: "Três ferramentas visuais para transformar observação em oportunidade — e os erros clássicos ao usá-las.",
          content:
            "Mapa de empatia: um quadro com 6 blocos sobre UMA pessoa específica (não 'o mercado'): o que ela vê, ouve, pensa e sente, fala e faz — e, embaixo, suas dores e ganhos desejados. O erro clássico é preenchê-lo da sua cabeça. O mapa só vale se vier de conversa real: entreviste a pessoa antes, preencha depois. Uma entrevista de 20 minutos com um dono de negócio vale mais que 2 horas de suposição.\n\nDesign Thinking, na versão que cabe num negócio nascente, é um ciclo de 5 passos: empatizar (entender a dor de perto), definir (escrever o problema numa frase), idear (gerar muitas soluções antes de escolher uma), prototipar (versão simples e barata) e testar (com a pessoa real). O valor está na ordem: quem prototipa antes de empatizar constrói a coisa errada com capricho.\n\nCanvas de proposta de valor: dois lados. À direita, o perfil do cliente: as tarefas que ele precisa realizar, suas dores e os ganhos que busca. À esquerda, a sua oferta: produtos/serviços, analgésicos (o que alivia cada dor) e criadores de ganho. O encaixe entre os dois lados É a proposta de valor. Se você não consegue ligar cada analgésico a uma dor específica do lado direito, sua solução é resposta para uma pergunta que ninguém fez.\n\nOnde a IA entra? Volte ao seu mapa preenchido e marque as dores que envolvem: decisão repetida com base em informação (prever, classificar), excesso de opções (recomendar) ou trabalho manual com texto/imagem (gerar). Essas — e apenas essas — são candidatas a solução com IA. Dor de logística física, de caixa ou de ponto comercial se resolve com gestão, não com modelo.",
        },
        {
          title: "Mapa de empatia real: entreviste e mapeie um dono de negócio",
          type: "pratica",
          duration: "1h40",
          practiceTool: "Miro (modelo gratuito)",
          practiceUrl: MIRO_EMPATIA_URL,
          summary:
            "Escolha o negócio mais promissor da sua lista do Módulo 1 e faça uma entrevista de 20 minutos com o dono (presencial, chamada ou áudio de WhatsApp). Roteiro mínimo: 'me conta como é sua semana', 'o que te toma mais tempo?', 'o que você decide no achismo e queria decidir com mais certeza?', 'o que você já tentou?'. Depois, abra o modelo gratuito de mapa de empatia no Miro e preencha os 6 blocos SÓ com o que ouviu (se não ouviu, deixe em branco — branco é dado). Para fechar, marque em vermelho as dores candidatas a IA (decisão repetida, excesso de opções, trabalho manual com texto/imagem) e em cinza as que não são. Entrega: o mapa preenchido + a dor escolhida escrita numa frase: 'QUEM sofre COM O QUÊ, QUANTAS vezes por semana, custando QUANTO'.",
        },
        {
          title: "Quiz do Módulo 2",
          type: "quiz",
          duration: "15min",
          summary: "Quatro questões sobre dor real vs. incômodo, mapa de empatia, proposta de valor e onde a IA cabe.",
        },
      ],
      quiz: [
        {
          prompt: "Qual destes sinais indica uma dor de mercado REAL (e não só um incômodo)?",
          options: [
            "Muitas pessoas acham a ideia 'legal' quando você conta.",
            "As pessoas já tentam resolver com gambiarras (planilhas tortas, horas perdidas, freelancers) — frequência alta e custo mensurável.",
            "Nenhum concorrente existe no mercado.",
          ],
          correctIndex: 1,
          explanation:
            "Dor real tem frequência, custo e tentativa de solução. 'Achar legal' não é sinal de compra; ausência de concorrente às vezes é sinal de que não há dor.",
        },
        {
          prompt: "Qual é o erro clássico ao preencher um mapa de empatia?",
          options: [
            "Usar canetas de cores diferentes.",
            "Preenchê-lo por suposição, da sua cabeça, sem ter conversado com a pessoa real.",
            "Focar em apenas uma pessoa em vez de todo o mercado.",
          ],
          correctIndex: 1,
          explanation:
            "O mapa é registro de escuta, não de imaginação. Focar em UMA pessoa específica é justamente o correto; inventar as respostas é o que invalida a ferramenta.",
        },
        {
          prompt: "No canvas de proposta de valor, o que define uma boa proposta?",
          options: [
            "Uma lista longa de funcionalidades do produto.",
            "O encaixe: cada 'analgésico' da sua oferta conectado a uma dor específica do perfil do cliente.",
            "Um preço mais baixo que o dos concorrentes.",
          ],
          correctIndex: 1,
          explanation:
            "Proposta de valor é o encaixe entre os dois lados do canvas. Analgésico sem dor correspondente é resposta para pergunta que ninguém fez.",
        },
        {
          prompt: "Quais dores são boas candidatas a solução com IA?",
          options: [
            "Todas — IA resolve qualquer problema de negócio.",
            "Decisão repetida baseada em informação, excesso de opções para escolher, e trabalho manual com texto ou imagem.",
            "Problemas de fluxo de caixa e de ponto comercial.",
          ],
          correctIndex: 1,
          explanation:
            "IA cabe onde há previsão, classificação, recomendação ou geração. Dor de caixa e de localização se resolve com gestão — usar IA ali é começar pela ferramenta.",
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────
    {
      id: "modulo-3",
      title: "Módulo 3 · Fundamentos de IA para Empreendedores",
      subtitle: "IA vs. ML vs. Deep Learning, o que é possível (e o que não é), dados e IA generativa",
      duration: "3h",
      free: true,
      lessons: [
        {
          title: "IA, Machine Learning e Deep Learning — sem jargão",
          type: "leitura",
          duration: "30min",
          summary: "As três camadas da cebola, o que é um modelo preditivo e por que 'IA vai além dos LLMs'.",
          content:
            "Pense em três círculos, um dentro do outro. O maior é a Inteligência Artificial: qualquer técnica que faça a máquina executar tarefas que exigiriam inteligência humana — inclusive regras escritas à mão ('se o cliente não compra há 90 dias, mande cupom'). Dentro dele, o Machine Learning (ML): em vez de escrever as regras, você mostra exemplos (dados históricos) e o algoritmo aprende os padrões sozinho. Dentro do ML, o Deep Learning: redes neurais com muitas camadas, que brilham em imagem, áudio e linguagem — é a tecnologia por trás dos modelos generativos como ChatGPT e Gemini.\n\nUm modelo preditivo, na prática, é uma função aprendida com o passado: entra o histórico (vendas por dia, clima, feriado), sai uma previsão (quanto vou vender amanhã). A qualidade depende muito mais dos DADOS do que do algoritmo — um modelo simples com dados bons e limpos vence um modelo sofisticado com dados ruins, sempre.\n\nJá a IA generativa cria conteúdo novo (texto, imagem, código) a partir de instruções. Ela é espetacular para tarefas de linguagem — redigir, resumir, traduzir, responder — mas NÃO é a única IA que existe, nem a melhor para todo problema. Prever demanda, otimizar rota, detectar doença em planta: nada disso se resolve conversando com um chatbot; se resolve com modelos preditivos, visão computacional e otimização. É a tese que a Dra. Giselle leva às empresas que orienta: IA vai além dos LLMs — e o empreendedor que entende isso escolhe a ferramenta certa em vez de seguir a moda.",
        },
        {
          title: "O que é possível (e o que não é) — e a matéria-prima chamada dados",
          type: "leitura",
          duration: "35min",
          summary: "Expectativas calibradas: onde a IA erra, o que ela precisa para funcionar e as perguntas antes de prometer.",
          content:
            "O que a IA faz bem hoje: tarefas repetitivas com padrão claro e muitos exemplos (classificar fotos de produto, prever demanda com histórico suficiente, sugerir resposta de atendimento, transcrever áudio, resumir documento). O que ela faz mal: tarefas sem dados históricos ('preveja as vendas do produto que ainda não lancei'), decisões que exigem contexto que não está nos dados, e qualquer coisa onde o erro é inaceitável sem revisão humana — modelos generativos, em particular, 'alucinam': inventam informação com total confiança.\n\nDaí três regras práticas para o empreendedor. Regra 1: sem dados, sem mágica. Antes de prometer IA a um cliente, pergunte 'que registro você já tem, e desde quando?'. Poucos meses de histórico limitam o que dá para prever. Regra 2: comece onde o erro é barato. Um rascunho de post gerado por IA que sai ruim custa uma revisão; um diagnóstico errado custa uma reputação. Posicione a IA como assistente com revisão humana nos primeiros ciclos. Regra 3: desconfie de 100%. Todo modelo erra; a pergunta profissional não é 'ele acerta?', e sim 'ele erra QUANTO, em QUAIS casos, e o que acontece quando erra?'.\n\nSobre dados, o vocabulário mínimo: dado estruturado é o que cabe em tabela (vendas, cadastros); não estruturado é texto livre, foto, áudio (conversas de WhatsApp, notas fiscais fotografadas). Modelos preditivos clássicos comem tabelas; deep learning e IA generativa destravam o resto. Quando você olhar a dor escolhida no Módulo 2, pergunte: o dado necessário existe? É tabela ou é texto/imagem? Quem é o dono desse dado — e ele pode ser usado? (Essa última pergunta é a LGPD entrando; ela volta com força no Módulo 6.)\n\nQuer ir fundo nessa parte — ver esses conceitos aplicados a casos reais de indústria, agro e serviços, com a profundidade de quem constrói? Esse é exatamente o território do curso IA na Prática, o aprofundamento pago desta trilha (link nos Próximos passos, na lateral).",
        },
        {
          title: "Treine sua primeira IA: classificador no Teachable Machine",
          type: "pratica",
          duration: "1h40",
          practiceTool: "Teachable Machine (Google, grátis)",
          practiceUrl: TEACHABLE_URL,
          summary:
            "Você vai treinar um modelo de verdade, no navegador, sem uma linha de código. No Teachable Machine (projeto de Imagem), crie um classificador útil para um negócio que você mapeou — exemplos: 'produto na embalagem certa vs. errada', 'prateleira cheia vs. vazia', 'fruta madura vs. passada'. Tire ao menos 20 fotos de cada classe com a webcam ou celular, treine, e TESTE com fotos que o modelo nunca viu. Depois, sabote de propósito: teste com iluminação diferente, fundo diferente, ângulo diferente — e veja o modelo errar. Entrega: print do modelo funcionando + 3 frases: onde ele acerta, onde erra, e que dados faltariam para ele funcionar no mundo real. Essa última frase é a mais importante do módulo: você acabou de aprender, na pele, por que dados representativos valem mais que algoritmo.",
        },
        {
          title: "Quiz do Módulo 3",
          type: "quiz",
          duration: "15min",
          summary: "Quatro questões sobre as camadas da IA, modelos preditivos, IA generativa e expectativas calibradas.",
        },
      ],
      quiz: [
        {
          prompt: "Qual é a relação entre IA, Machine Learning e Deep Learning?",
          options: [
            "São três nomes para a mesma tecnologia.",
            "Círculos concêntricos: Deep Learning está dentro do Machine Learning, que está dentro da IA — cada camada é um subconjunto da anterior.",
            "São tecnologias concorrentes: ou você usa uma, ou usa outra.",
          ],
          correctIndex: 1,
          explanation:
            "IA é o guarda-chuva (inclui até regras manuais); ML aprende padrões com exemplos; Deep Learning é o ML de redes profundas, forte em imagem, áudio e linguagem.",
        },
        {
          prompt: "Por que 'IA vai além dos LLMs' importa para um empreendedor?",
          options: [
            "Porque LLMs são proibidos para uso comercial.",
            "Porque muitas dores (prever demanda, otimizar rota, detectar doença em planta) se resolvem com modelos preditivos, visão computacional ou otimização — não com chatbots.",
            "Porque LLMs são sempre mais caros que outros modelos.",
          ],
          correctIndex: 1,
          explanation:
            "IA generativa brilha em linguagem, mas não é a ferramenta de todo problema. Escolher a abordagem pela dor — e não pela moda — é o que separa solução de modismo.",
        },
        {
          prompt: "O que mais determina a qualidade de um modelo preditivo?",
          options: [
            "O algoritmo mais moderno disponível.",
            "A qualidade e a representatividade dos dados de treino — modelo simples com dados bons vence modelo sofisticado com dados ruins.",
            "A velocidade do computador usado no treino.",
          ],
          correctIndex: 1,
          explanation:
            "Foi o que a prática mostrou na pele: o classificador erra quando as fotos de treino não representam o mundo real (luz, fundo, ângulo). Dados primeiro, algoritmo depois.",
        },
        {
          prompt: "Um cliente pede: 'quero uma IA que preveja as vendas de um produto que nunca lancei, com 100% de certeza'. Qual é a resposta profissional?",
          options: [
            "Aceitar o projeto — IA moderna dá conta de tudo.",
            "Calibrar a expectativa: sem histórico não há base de aprendizado, todo modelo erra, e a pergunta certa é 'erra quanto, em quais casos, e o que acontece quando erra' — talvez começando por um teste piloto.",
            "Recusar qualquer projeto de previsão, porque previsão não funciona.",
          ],
          correctIndex: 1,
          explanation:
            "Regras do módulo: sem dados, sem mágica; desconfie de 100%; comece onde o erro é barato. Vender expectativa errada destrói a confiança que o negócio precisa para crescer.",
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────
    {
      id: "modulo-4",
      title: "Módulo 4 · Construindo a Solução com IA",
      subtitle: "As etapas de um projeto de IA e as ferramentas no-code para prototipar",
      duration: "3h",
      free: true,
      lessons: [
        {
          title: "As 5 etapas de um projeto com IA",
          type: "leitura",
          duration: "30min",
          summary: "Coleta, preparação, modelo, validação, aplicação — e onde os projetos morrem.",
          content:
            "Todo projeto de IA, do protótipo de garagem ao sistema industrial, percorre as mesmas cinco etapas. (1) Coleta: reunir os dados da dor — histórico de vendas, fotos, conversas. (2) Preparação: limpar e organizar (a etapa mais demorada e menos glamourosa: datas em formatos diferentes, campos vazios, duplicatas — no protótipo, uma planilha bem organizada resolve). (3) Modelo: treinar ou configurar a IA — que no seu caso pode ser treinar um classificador no Teachable Machine, escrever boas instruções para um modelo generativo, ou montar uma automação que combina os dois. (4) Validação: testar com casos que o modelo nunca viu e medir o erro ANTES de colocar na frente de cliente. (5) Aplicação: encaixar no fluxo real do negócio — e aqui mora o segredo que quase todo iniciante ignora: a IA só gera valor quando entra no fluxo de quem trabalha. Um modelo perfeito que ninguém abre é um projeto morto.\n\nDois avisos de quem já viu muitos projetos morrerem. Primeiro: a etapa 2 consome a maior parte do tempo real de qualquer projeto — se o seu plano não reserva tempo para organizar dados, o plano está errado. Segundo: defina na etapa 4 o que conta como 'bom o suficiente' ANTES de testar ('acertar 8 em cada 10 classificações' / 'economizar 2 horas por semana do dono'). Sem esse número combinado, todo teste 'parece bom' — e você se engana junto com o cliente.\n\nNo seu MVP, essas 5 etapas podem caber numa semana: 2 dias coletando e organizando exemplos, 1 dia montando o modelo/automação, 1 dia validando com casos novos, 1 dia colocando na mão de um usuário real. O Módulo 5 estrutura exatamente esse ciclo.",
        },
        {
          title: "Ferramentas no-code e low-code para protótipos com IA",
          type: "leitura",
          duration: "35min",
          summary: "O cinto de utilidades gratuito: Teachable Machine, Zapier/Make com GPT, Glide — e o que cada um resolve.",
          content:
            "Você não precisa programar para prototipar. Precisa conhecer quatro tipos de ferramenta e o que cada uma resolve.\n\n(1) Treinar um classificador próprio: Teachable Machine (você já usou) treina modelos de imagem, som e pose no navegador, de graça, e permite exportar o modelo. Serve para dores do tipo 'olhar e separar': triagem de fotos de produto, verificação visual simples.\n\n(2) Automatizar com IA generativa: Zapier e Make conectam aplicativos entre si ('quando chegar e-mail, faça X') e ambos têm integração com ChatGPT/GPT nos planos gratuitos limitados. Exemplos reais de protótipo: 'quando entrar resposta no formulário, gere um resumo e mande no meu e-mail'; 'quando eu salvar uma nota, gere uma sugestão de post'. Serve para dores de trabalho manual com texto.\n\n(3) Transformar planilha em aplicativo: Glide cria um app navegável a partir de uma planilha do Google, sem código, com plano gratuito. Serve para dar cara de produto ao seu MVP: catálogo, agendamento simples, consulta de status.\n\n(4) O próprio chatbot como motor: para muitos MVPs, 'a IA' pode ser simplesmente o Gemini ou ChatGPT com instruções bem escritas (um bom prompt fixo), operado por você nos bastidores enquanto valida a demanda — o famoso 'mágico de Oz', que o Módulo 5 explica.\n\nNota honesta sobre listas antigas: materiais de empreendedorismo com IA costumam citar Peltarion e Lobe — as duas foram descontinuadas. Antes de apostar o MVP numa ferramenta, verifique se ela está viva e qual o limite do plano gratuito. A regra do protótipo é gastar zero: se a ferramenta pede cartão de crédito para começar, procure a alternativa.",
        },
        {
          title: "Monte uma automação com IA: do formulário ao resumo automático",
          type: "pratica",
          duration: "1h40",
          practiceTool: "Zapier + GPT (plano grátis)",
          practiceUrl: ZAPIER_GPT_URL,
          summary:
            "Escolha uma tarefa manual de texto da dor que você mapeou (resumir pedidos que chegam, rascunhar resposta a cliente, gerar descrição de produto) e monte a automação mínima: um gatilho (nova resposta em formulário ou novo item numa planilha) → um passo de IA (instrução clara do que gerar) → uma saída (e-mail para você ou linha na planilha). No plano gratuito do Zapier (ou do Make, se preferir), monte, rode com 3 casos reais e avalie: a saída da IA precisaria de quanta revisão antes de ir para um cliente? Entrega: a automação funcionando + as 3 saídas geradas com sua nota de 0 a 10 e o que você mudaria na instrução. Se travar em limite de plano, monte a versão manual: cole os mesmos casos no Gemini com a mesma instrução fixa — o aprendizado sobre a qualidade da instrução é o mesmo.",
        },
        {
          title: "Quiz do Módulo 4",
          type: "quiz",
          duration: "15min",
          summary: "Quatro questões sobre as 5 etapas, onde projetos morrem, e qual ferramenta no-code para cada dor.",
        },
      ],
      quiz: [
        {
          prompt: "Quais são, em ordem, as 5 etapas de um projeto com IA?",
          options: [
            "Ideia, investimento, contratação, lançamento, escala.",
            "Coleta, preparação, modelo, validação, aplicação.",
            "Modelo, coleta, aplicação, preparação, validação.",
          ],
          correctIndex: 1,
          explanation:
            "Coleta → preparação → modelo → validação → aplicação. E a etapa que mais consome tempo real é a preparação dos dados — planeje por ela.",
        },
        {
          prompt: "Por que definir 'o que conta como bom o suficiente' ANTES de validar o modelo?",
          options: [
            "Para impressionar investidores com metas.",
            "Porque sem um critério combinado antes, todo teste 'parece bom' — e você se engana junto com o cliente.",
            "Porque as ferramentas no-code exigem esse número para funcionar.",
          ],
          correctIndex: 1,
          explanation:
            "Critério de sucesso definido antes do teste é honestidade experimental — o mesmo princípio que protege qualquer decisão baseada em dados.",
        },
        {
          prompt: "Sua dor é 'transformar uma planilha de produtos num catálogo navegável para clientes'. Qual ferramenta no-code resolve?",
          options: [
            "Teachable Machine.",
            "Glide — cria um app a partir de uma planilha do Google, sem código.",
            "Um modelo de Deep Learning treinado do zero.",
          ],
          correctIndex: 1,
          explanation:
            "Cada ferramenta tem sua dor: Teachable Machine classifica ('olhar e separar'), Zapier/Make automatizam texto, Glide dá cara de app a uma planilha.",
        },
        {
          prompt: "Um modelo com ótima acurácia foi entregue, mas ninguém no negócio o utiliza. O que o módulo diz sobre isso?",
          options: [
            "Missão cumprida — a qualidade do modelo é o que importa.",
            "Projeto morto: IA só gera valor quando entra no fluxo real de quem trabalha — a etapa de aplicação é tão importante quanto o modelo.",
            "Basta aumentar a acurácia que as pessoas passarão a usar.",
          ],
          correctIndex: 1,
          explanation:
            "A etapa 5 (aplicação) é onde o valor aparece — ou não. Um modelo perfeito fora do fluxo de trabalho é um troféu de prateleira.",
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────
    {
      id: "modulo-5",
      title: "Módulo 5 · Validação e MVP",
      subtitle: "O mínimo para testar a ideia — entrevistas, landing page, piloto e ética",
      duration: "3h",
      free: true,
      lessons: [
        {
          title: "MVP com IA: o mínimo que testa a hipótese",
          type: "leitura",
          duration: "30min",
          summary: "O que é (e o que não é) um MVP, o 'mágico de Oz' e por que validar demanda antes de automatizar tudo.",
          content:
            "MVP — produto mínimo viável — não é a versão 1.0 com menos capricho. É o menor experimento capaz de testar a sua hipótese mais arriscada. E a sua hipótese mais arriscada quase nunca é técnica ('a IA consegue fazer isso?'); é de demanda ('alguém quer isso a ponto de usar, voltar e pagar?').\n\nPor isso, o MVP com IA tem um atalho poderoso e honesto: o 'mágico de Oz'. Por fora, o cliente vê o serviço funcionando ('me manda a foto do produto, devolvo a descrição pronta em 1 hora'); por dentro, é você operando o Gemini com uma instrução bem calibrada. Nada de errado nisso — desde que você não minta sobre prazos nem sobre qualidade — e a vantagem é imensa: você valida a demanda ANTES de investir na automação. Se ninguém topa nem a versão operada à mão, nenhuma automação salvaria a ideia.\n\nA escada do MVP com IA: degrau 1, serviço manual assistido por IA (você + chatbot); degrau 2, automação parcial (a automação do Módulo 4 rodando, você revisando); degrau 3, produto navegável (o app no Glide consultando a planilha que a automação alimenta). Suba um degrau por vez, e apenas quando o anterior mostrar tração — pessoas usando de novo sem você implorar.\n\nDefina antes de lançar: qual métrica diz que deu certo? Sugestão para a primeira rodada: 10 pessoas usam; ao menos 3 voltam a usar sem lembrete; ao menos 1 pergunta 'quanto custa?'. Números pequenos e honestos valem mais que métricas de vaidade (curtidas, visualizações) — curtida não paga boleto.",
        },
        {
          title: "Técnicas de validação — e a viabilidade ética do uso de IA",
          type: "leitura",
          duration: "35min",
          summary: "Entrevista sem viés, landing page, piloto — e as quatro perguntas éticas antes de lançar.",
          content:
            "Três técnicas de validação, em ordem de custo. (1) Entrevista de problema: 5 a 10 conversas sobre a DOR (não sobre a sua solução). Regra de ouro: pergunte sobre o passado ('quando foi a última vez que isso aconteceu? o que você fez?'), nunca sobre o futuro hipotético ('você usaria?') — sobre o futuro, todo mundo mente por educação. (2) Landing page ou formulário de interesse: uma página simples dizendo o que a solução faz e um botão de 'quero testar'. Divulgue nos grupos onde a dor mora e meça: de cada 100 que veem, quantos deixam contato? (3) Piloto: 3 a 5 usuários reais usando a versão mágico-de-Oz por 2 semanas, com você medindo uso repetido e colhendo reclamações — reclamação de quem usa é ouro; silêncio é enterro.\n\nAntes de qualquer lançamento, o teste ético de quatro perguntas — que no seu negócio é inegociável, porque confiança é o único ativo que empreendedor iniciante tem: (1) Consentimento: as pessoas sabem que há IA no processo e que dados delas são usados? Avise, em linguagem simples. (2) Dados: você coleta só o necessário, guarda com cuidado e apagaria se pedissem? (A LGPD, lei brasileira de proteção de dados, exige isso — o Módulo 6 detalha.) (3) Erro: quando a IA errar — e vai errar — quem revisa, quem responde e como o cliente é compensado? (4) Viés: seu modelo trata grupos diferentes de forma justa? Um classificador de currículos treinado com histórico enviesado repete o viés em escala — teste com casos diversos antes de confiar.\n\nSe alguma dessas quatro respostas for 'não sei', o MVP não está pronto para gente de verdade — e descobrir isso agora é infinitamente mais barato que descobrir depois.",
        },
        {
          title: "Rode uma validação real: formulário de interesse + 5 entrevistas",
          type: "pratica",
          duration: "1h40",
          practiceTool: "Google Forms (grátis)",
          practiceUrl: FORMS_URL,
          summary:
            "Duas frentes nesta prática. Frente A — entrevistas: usando o roteiro 'sobre o passado' da aula, converse com 5 pessoas que têm a dor mapeada e anote, para cada uma: a última vez que a dor aconteceu, o que a pessoa fez, quanto custou. Frente B — interesse: crie um Google Forms de uma tela descrevendo sua solução em 3 frases honestas (o que faz, para quem, o que ainda não faz) + campos nome/WhatsApp + a pergunta 'o que faria você usar isso toda semana?'. Divulgue em 2 grupos onde seu público está. Entrega: as 5 fichas de entrevista + o número de interessados + a decisão explícita na régua do módulo: perseverar (métrica batida), ajustar (interesse morno — o que mudar?) ou pivotar (a dor não era o que você achava — qual é a nova hipótese?). Coragem de escrever 'pivotar' também é resultado.",
        },
        {
          title: "Quiz do Módulo 5",
          type: "quiz",
          duration: "15min",
          summary: "Quatro questões sobre MVP, mágico de Oz, entrevistas sem viés e o teste ético de quatro perguntas.",
        },
      ],
      quiz: [
        {
          prompt: "O que é um MVP, segundo o módulo?",
          options: [
            "A primeira versão completa do produto, com todas as funcionalidades básicas.",
            "O menor experimento capaz de testar a hipótese mais arriscada — que quase sempre é de demanda, não de tecnologia.",
            "Um protótipo visual feito no Canva para mostrar a investidores.",
          ],
          correctIndex: 1,
          explanation:
            "MVP testa hipótese, não impressiona ninguém. Se a hipótese arriscada é 'alguém quer isso?', o teste mais barato pode nem precisar de automação.",
        },
        {
          prompt: "O que é a técnica do 'mágico de Oz' num MVP com IA?",
          options: [
            "Esconder do cliente que o serviço tem defeitos.",
            "Entregar o serviço operando a IA manualmente por trás (você + chatbot com boa instrução), validando a demanda antes de investir em automação — sem mentir sobre prazo ou qualidade.",
            "Usar um avatar mágico como mascote do produto.",
          ],
          correctIndex: 1,
          explanation:
            "Por fora, o serviço; por dentro, você operando. É honesto (você entrega o prometido) e barato — se nem assim houver demanda, automação nenhuma salvaria a ideia.",
        },
        {
          prompt: "Por que perguntar 'quando foi a última vez que isso aconteceu?' em vez de 'você usaria minha solução?'",
          options: [
            "Porque é mais educado.",
            "Porque sobre o futuro hipotético as pessoas mentem por educação; sobre o passado concreto, elas contam fatos — e fatos validam dores.",
            "Porque a LGPD proíbe perguntas sobre intenção de compra.",
          ],
          correctIndex: 1,
          explanation:
            "'Você usaria?' colhe gentileza, não verdade. Entrevista de problema boa é sobre comportamento passado: última ocorrência, o que fez, quanto custou.",
        },
        {
          prompt: "Qual das situações abaixo REPROVA no teste ético do módulo?",
          options: [
            "Avisar no rodapé, em linguagem simples, que as descrições são geradas com apoio de IA e revisadas por uma pessoa.",
            "Lançar um classificador de currículos sem testar se ele trata grupos diferentes de forma justa, porque 'o modelo é neutro'.",
            "Coletar apenas nome e WhatsApp no formulário de interesse.",
          ],
          correctIndex: 1,
          explanation:
            "Modelo nenhum é neutro: ele aprende os padrões — e os vieses — dos dados. Testar justiça com casos diversos antes de confiar é a pergunta 4 do teste ético.",
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────
    {
      id: "modulo-6",
      title: "Módulo 6 · Modelos de Negócio com IA",
      subtitle: "B2B, SaaS, plataforma e produto inteligente — monetização, dados e LGPD",
      duration: "3h",
      free: true,
      lessons: [
        {
          title: "Tipos de modelo de negócio com IA",
          type: "leitura",
          duration: "30min",
          summary: "Quatro caminhos para transformar sua solução em negócio — com exemplos na escala de quem está começando.",
          content:
            "A mesma solução de IA pode virar negócio por caminhos muito diferentes — e escolher o caminho é uma decisão tão importante quanto a solução em si.\n\n(1) Serviço B2B: você vende o RESULTADO para empresas — 'entrego as descrições dos seus 200 produtos por R$ X', 'faço a triagem visual do seu estoque'. É o caminho mais rápido para o primeiro dinheiro, porque empresas pagam por dor resolvida sem querer saber da tecnologia. Desvantagem: seu tempo é o limite — cada cliente novo custa horas suas.\n\n(2) SaaS (software como serviço): o cliente usa a ferramenta sozinho e paga assinatura mensal. Escala sem consumir seu tempo, mas exige produto redondo, suporte e uma máquina de aquisição de clientes — raramente é o primeiro passo; costuma ser a evolução de um B2B validado.\n\n(3) Plataforma: conecta dois lados (quem precisa e quem oferece) e a IA melhora o encontro — recomendação, precificação, matching. Poderosa e difícil: você precisa atrair os dois lados ao mesmo tempo (o 'problema do ovo e da galinha').\n\n(4) Produto inteligente: um produto ou serviço existente que fica melhor com IA embutida — a pousada que prevê ocupação e ajusta preço, a loja que recomenda por perfil. Aqui a IA não é o produto: é o diferencial de margem.\n\nPara quem está começando, a rota mais comum e sensata: B2B de serviço primeiro (valida a dor e gera caixa) → padroniza o processo → transforma em SaaS quando a repetição aparecer. O canvas da prática deste módulo vai forçar as perguntas certas para o SEU caso.",
        },
        {
          title: "Monetização, proteção de dados e LGPD",
          type: "leitura",
          duration: "35min",
          summary: "Como cobrar, quanto custa operar IA — e as regras de dados que protegem seu negócio desde o dia zero.",
          content:
            "Como cobrar: as quatro formas mais comuns em negócios com IA são assinatura (valor recorrente por acesso — previsível, mas exige valor recorrente de verdade), por uso (paga-se por unidade: descrição gerada, análise feita — justo e fácil de começar), por resultado (percentual da economia ou da venda gerada — poderoso, mas exige medir o resultado com confiança) e licença/projeto (valor fechado por implantação — comum no B2B). Regra prática do preço inicial: cobre pela DOR, não pelo custo. Se sua solução economiza 5 horas semanais do dono, o preço âncora é o valor dessas horas — não os centavos que a ferramenta te custa.\n\nE por falar em custo: IA tem custo variável. APIs de modelos generativos cobram por uso; planos gratuitos têm teto. Antes de fechar preço, estime o custo por cliente atendido (quantas gerações/análises por mês?) e garanta margem — negócio com IA que não conhece seu custo por uso descobre o prejuízo no boleto.\n\nAgora, o tema que a Dra. Giselle mais repete a empresas: dados. No Brasil, a LGPD (Lei Geral de Proteção de Dados) vale para QUALQUER negócio que trate dados pessoais — inclusive o seu MVP com 10 usuários. O essencial, em linguagem de empreendedor: colete o mínimo necessário (se não precisa do CPF, não peça o CPF); diga de forma clara para que usa cada dado e obtenha consentimento; guarde com segurança (planilha aberta com link público é vazamento esperando data); respeite os direitos do titular (a pessoa pode pedir para ver, corrigir ou apagar os dados dela — e você precisa conseguir atender); e atenção redobrada com IA: dados do seu cliente não podem virar insumo de treino de terceiros sem consentimento — cuidado com o que você cola em chatbots; prefira as opções de negócio das ferramentas quando tratar dado alheio.\n\nNada disso é burocracia contra você. É o contrário: num mercado desconfiado de IA, tratar dados com seriedade é argumento de venda — especialmente no B2B, onde a primeira pergunta do cliente grande é 'o que vocês fazem com os meus dados?'. Quem responde bem, fecha.",
        },
        {
          title: "Desenhe seu negócio: Business Model Canvas completo",
          type: "pratica",
          duration: "1h40",
          practiceTool: "Miro (modelo gratuito)",
          practiceUrl: MIRO_CANVAS_URL,
          summary:
            "Abra o modelo gratuito de Business Model Canvas no Miro e preencha os 9 blocos para a SUA solução validada: segmentos de cliente (quem você entrevistou de verdade), proposta de valor (o encaixe do Módulo 2), canais, relacionamento, fontes de receita (escolha o modelo de cobrança e escreva o preço âncora pela dor), recursos-chave (inclua os DADOS como recurso — quais, de quem, com que consentimento), atividades-chave, parcerias e estrutura de custos (inclua o custo por uso da IA, estimado por cliente/mês). Teste de consistência final: a receita por cliente cobre o custo por cliente com folga? O dado que sustenta a solução tem dono e consentimento claros? Entrega: o canvas preenchido + 3 frases: como você cobra, quanto custa te operar, e por que o cliente escolheria você e não um estagiário com ChatGPT (se não souber responder a última, volte à proposta de valor).",
        },
        {
          title: "Quiz do Módulo 6",
          type: "quiz",
          duration: "15min",
          summary: "Quatro questões sobre modelos de negócio, precificação pela dor, custo por uso e LGPD.",
        },
      ],
      quiz: [
        {
          prompt: "Para quem está começando, qual rota de modelo de negócio o módulo recomenda como mais sensata?",
          options: [
            "Construir uma plataforma de dois lados desde o primeiro dia.",
            "B2B de serviço primeiro (valida a dor e gera caixa) → padronizar → evoluir para SaaS quando a repetição aparecer.",
            "Lançar um SaaS por assinatura antes de falar com qualquer cliente.",
          ],
          correctIndex: 1,
          explanation:
            "Serviço B2B converte dor em receita rápido e ensina o processo; SaaS escala o que já se provou repetível; plataforma sofre do 'ovo e galinha' e raramente é bom primeiro passo.",
        },
        {
          prompt: "Qual é a regra prática para o preço inicial de uma solução com IA?",
          options: [
            "Custo da ferramenta + 10% de margem.",
            "Cobrar pela dor: se a solução economiza 5 horas semanais do dono, o valor dessas horas é o preço âncora — não os centavos que a ferramenta custa.",
            "Sempre cobrar o mesmo que o concorrente mais barato.",
          ],
          correctIndex: 1,
          explanation:
            "Preço ancorado no valor entregue (horas, perdas evitadas, vendas geradas). Cobrar pelo custo da ferramenta é presentear sua margem.",
        },
        {
          prompt: "Por que estimar o custo por uso ANTES de fechar o preço de um serviço com IA?",
          options: [
            "Porque a LGPD exige a publicação dos custos.",
            "Porque APIs de IA cobram por uso e planos gratuitos têm teto — sem conhecer o custo por cliente/mês, o prejuízo aparece só no boleto.",
            "Porque investidores pedem essa planilha no primeiro encontro.",
          ],
          correctIndex: 1,
          explanation:
            "IA tem custo variável. Margem saudável = preço pela dor − custo por uso conhecido. É aritmética de sobrevivência, não planilha de investidor.",
        },
        {
          prompt: "Qual atitude está de acordo com a LGPD no seu MVP?",
          options: [
            "Pedir CPF de todo mundo 'para garantir', guardar numa planilha com link público e treinar modelos com os dados sem avisar.",
            "Coletar só o necessário, explicar para que usa cada dado, guardar com segurança e conseguir mostrar/corrigir/apagar os dados se o titular pedir.",
            "Ignorar a lei enquanto tiver menos de 100 usuários, porque a LGPD só vale para empresas grandes.",
          ],
          correctIndex: 1,
          explanation:
            "A LGPD vale para qualquer porte — e levar dados a sério é argumento de venda: a primeira pergunta do cliente B2B grande é 'o que vocês fazem com os meus dados?'.",
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────
    {
      id: "modulo-7",
      title: "Módulo 7 · Pitch e Captação de Recursos",
      subtitle: "Storytelling honesto, o que investidores procuram e onde buscar fomento no Brasil",
      duration: "3h",
      free: true,
      lessons: [
        {
          title: "Como apresentar sua solução: pitch deck + storytelling",
          type: "leitura",
          duration: "30min",
          summary: "A estrutura de 8 telas que funciona, a regra dos 3 minutos e os erros que enterram pitches de IA.",
          content:
            "Um pitch não vende o produto; vende a próxima conversa. Em 3 minutos, quem ouve precisa entender a dor, acreditar que você é a pessoa certa para resolvê-la e querer saber mais. A estrutura de 8 telas que sustenta isso: (1) a dor, contada como história de uma pessoa real ('a Dona Marta perde 5 horas por semana...'); (2) o tamanho do problema (quantas Donas Martas existem, quanto custa a dor somada); (3) a solução, em uma frase e uma demonstração — mostre funcionando, nem que seja a versão mágico-de-Oz; (4) por que agora (o que mudou no mundo que torna isso possível — no seu caso, o colapso do custo da IA); (5) modelo de negócio (como você cobra — direto do canvas do Módulo 6); (6) tração (os números honestos da sua validação: entrevistas, interessados, usuários do piloto, o primeiro 'quanto custa?'); (7) time (por que VOCÊ — proximidade com a dor conta tanto quanto currículo); (8) o pedido (o que você busca: mentoria, primeiro cliente, edital, investimento — e para fazer o quê).\n\nStorytelling não é floreio: é ordem. Dor → tentativas frustradas → sua descoberta → prova. A Dona Marta da tela 1 volta na tela 6, agora usando seu piloto — o círculo fecha e a plateia lembra de você.\n\nOs três erros que enterram pitches de IA: prometer o que a IA não faz (a plateia técnica derruba em uma pergunta; a não técnica descobre depois — pior); pitch sobre a tecnologia em vez da dor ('usamos um modelo de última geração...' — ninguém compra modelo, compram problema resolvido); e esconder os riscos — citar você mesmo 'a IA erra em X% dos casos e por isso mantemos revisão humana' transmite mais competência que fingir perfeição. Números pequenos e verdadeiros ganham de projeções grandes e inventadas: '5 entrevistas, 3 pilotos ativos, 1 pedido de preço' é tração real de quem está começando — e quem avalia sabe disso.",
        },
        {
          title: "O que investidores procuram — e as fontes de fomento no Brasil",
          type: "leitura",
          duration: "35min",
          summary: "A régua de quem avalia startups com IA e o mapa honesto do dinheiro: editais, aceleradoras, anjos.",
          content:
            "O que quem avalia uma startup com IA de verdade procura (e em ordem): (1) Dor validada com evidência — suas entrevistas e piloto valem mais que qualquer slide bonito. (2) Diferencial defensável — a pergunta da moda é 'por que o ChatGPT não mata seu negócio amanhã?'; boas respostas envolvem dados próprios do nicho, relacionamento com o cliente, distribuição, processo — raramente 'nosso modelo é melhor'. (3) Unit economics — quanto custa atender um cliente (incluindo o custo por uso da IA) versus quanto ele paga; você já tem isso do Módulo 6. (4) Time que executa — velocidade de aprendizado demonstrada: o que você testou, o que descobriu, o que mudou. (5) Uso responsável — LGPD e ética deixaram de ser detalhe: viraram critério de eliminação em editais e fundos sérios.\n\nO mapa do dinheiro no Brasil, do mais acessível ao mais raro para quem está começando: Fomento público e editais — Sebrae (capacitação e programas como o Catalisa), FINEP e fundações estaduais de amparo à pesquisa (em Minas, a FAPEMIG) publicam editais para negócios inovadores; dinheiro que não dilui sua participação, em troca de burocracia e prazo. Aceleradoras e incubadoras — universidades e hubs regionais aceleram negócios em estágio inicial em troca de participação pequena ou de nada; além do dinheiro, valem pela rede e pelos mentores. Investidor-anjo — pessoa física que investe cedo; chega por indicação e por demo days, quase nunca por e-mail frio. Venture capital — fundos profissionais, para negócios com tração comprovada e ambição de escala; não é o próximo passo de quem está validando o MVP, e está tudo bem.\n\nDois avisos honestos para fechar: captar não é o objetivo — é combustível para um motor que já funciona; investimento antes de validação compra velocidade na direção errada. E o caminho subestimado: RECEITA. Cliente pagando é a fonte de recurso que não dilui, não cobra relatório e ainda valida a tese. Para muitos negócios deste curso, o melhor 'investidor' é o terceiro cliente B2B.",
        },
        {
          title: "Monte seu pitch de 3 minutos",
          type: "pratica",
          duration: "1h40",
          practiceTool: "Canva (grátis)",
          practiceUrl: CANVA_URL,
          summary:
            "No Canva gratuito, monte seu deck com as 8 telas da aula — uma ideia por tela, letra grande, zero parágrafos. Use os artefatos que você JÁ construiu no curso: a dor quantificada (Módulo 2), o print do protótipo (Módulos 3-4), os números da validação (Módulo 5) e o modelo de cobrança (Módulo 6). Depois — a parte que ninguém pula — grave-se apresentando em até 3 minutos (a câmera do celular basta) e assista uma vez se avaliando: a dor ficou clara em 30 segundos? Você mostrou algo funcionando? Prometeu só o que valida? Regrave uma vez aplicando o que viu. Entrega: o deck + o vídeo da segunda tomada. Este pitch é exatamente o que você vai apresentar no desafio final do Módulo 8.",
        },
        {
          title: "Quiz do Módulo 7",
          type: "quiz",
          duration: "15min",
          summary: "Quatro questões sobre a estrutura do pitch, erros clássicos, a régua dos investidores e fomento no Brasil.",
        },
      ],
      quiz: [
        {
          prompt: "Qual é o objetivo real de um pitch de 3 minutos?",
          options: [
            "Explicar todos os detalhes técnicos da solução.",
            "Vender a próxima conversa: a plateia entende a dor, acredita em você e quer saber mais.",
            "Convencer a plateia de que a IA usada é a mais avançada do mercado.",
          ],
          correctIndex: 1,
          explanation:
            "Pitch bom abre porta, não fecha contrato. Dor clara, prova honesta, pedido específico — os detalhes vêm na conversa seguinte.",
        },
        {
          prompt: "Por que citar você mesmo a taxa de erro da sua IA ('erra em X% dos casos, por isso mantemos revisão humana') fortalece o pitch?",
          options: [
            "Porque deixa o pitch mais longo e detalhado.",
            "Porque transmite domínio e honestidade — quem esconde riscos é derrubado por uma pergunta ou, pior, descoberto depois.",
            "Porque nenhum investidor entende de taxas de erro.",
          ],
          correctIndex: 1,
          explanation:
            "Fingir perfeição é o erro clássico do pitch de IA. Conhecer e comunicar os limites do próprio sistema é sinal de maturidade — e diferencial raro.",
        },
        {
          prompt: "Na pergunta 'por que o ChatGPT não mata seu negócio amanhã?', quais respostas são consideradas boas?",
          options: [
            "'Nosso modelo é mais inteligente que o ChatGPT.'",
            "Dados próprios do nicho, relacionamento com o cliente, distribuição e processo — vantagens que um modelo genérico não replica.",
            "'IA generativa é moda passageira.'",
          ],
          correctIndex: 1,
          explanation:
            "Diferencial defensável raramente é o modelo em si (que todos alugam). É o que você acumula e os outros não: dado do nicho, confiança do cliente, canal, processo.",
        },
        {
          prompt: "Para um negócio que acabou de validar o MVP, qual fonte de recurso o módulo aponta como a mais subestimada?",
          options: [
            "Venture capital internacional.",
            "Receita: cliente pagando não dilui participação, não cobra relatório e ainda valida a tese — para muitos negócios, o melhor 'investidor' é o terceiro cliente B2B.",
            "Empréstimo bancário com garantia pessoal.",
          ],
          correctIndex: 1,
          explanation:
            "Captação é combustível para motor que já funciona. Antes de validar, investimento compra velocidade na direção errada; receita compra aprendizado na direção certa.",
        },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────
    {
      id: "modulo-8",
      title: "Módulo 8 · Desafio Real + Mentoria",
      subtitle: "Escolha um desafio de mercado, construa em uma semana e apresente — com a porta da mentoria aberta",
      duration: "3h",
      free: true,
      lessons: [
        {
          title: "O desafio final: 5 problemas reais para escolher o seu",
          type: "leitura",
          duration: "30min",
          summary: "Cinco desafios com dor, público e critério de sucesso — e o plano de 7 dias para executar um deles.",
          content:
            "Chegou a hora de juntar tudo. Escolha UM dos cinco desafios abaixo (ou o seu próprio projeto, se a validação do Módulo 5 apontou uma dor melhor) e execute o ciclo completo em uma semana.\n\n(1) Assistente de atendimento para pequenos negócios: um fluxo que rascunha respostas às perguntas repetidas de um negócio real (horário, preço, agendamento) para o dono revisar e enviar. Sucesso: o dono usa por 5 dias e responde em menos da metade do tempo. (2) Recomendação simples por perfil de consumo: a partir do histórico de compras (planilha), sugerir 'quem comprou X costuma levar Y' para uma loja real. Sucesso: 10 sugestões geradas, o dono considera ao menos 5 úteis. (3) Gerador de conteúdo com identidade: automação que transforma novidades do negócio em rascunhos de post com o tom da marca. Sucesso: 2 semanas de posts em 30 minutos de trabalho, aprovados sem reescrever do zero. (4) Tutoria personalizada: fluxo que gera listas de exercícios e explicações no nível de cada aluno para um professor ou reforço escolar. Sucesso: o professor usa com 3 alunos e relata economia de preparo. (5) Triagem de currículos para uma ONG ou vaga local: classificador que organiza candidaturas pelos critérios combinados — com revisão humana obrigatória e o teste de viés do Módulo 5. Sucesso: triagem inicial cai de horas para minutos SEM excluir injustamente ninguém (audite uma amostra).\n\nO plano dos 7 dias: dias 1-2, releia sua dor e colete os dados/exemplos reais; dia 3, monte a solução mínima (Teachable Machine, Zapier/Make, Glide ou mágico-de-Oz — o que a dor pedir); dia 4, valide com casos novos e defina o número de sucesso; dias 5-6, coloque na mão de UM usuário real; dia 7, monte o relatório de uma página: dor → o que construí → número de antes → número de depois → o que quebrou → próximo passo. Esse relatório + o pitch do Módulo 7 são o seu demo day — e são exatamente o material que você levará para a mentoria, na última aula.",
        },
        {
          title: "Construa e rode seu desafio (7 dias)",
          type: "pratica",
          duration: "2h",
          practiceTool: "Sua caixa de ferramentas no-code",
          practiceUrl: GLIDE_URL,
          summary:
            "Execute o plano dos 7 dias com o desafio escolhido. Use a ferramenta que a dor pede: Teachable Machine para 'olhar e separar', Zapier/Make + GPT para automatizar texto, Glide para dar cara de app à sua planilha (link do botão), ou o mágico-de-Oz operado por você. O critério de conclusão não é 'ficou bonito': é o relatório de uma página com número de antes e número de depois medidos num usuário real — mesmo que o número seja pequeno, mesmo que algo tenha quebrado (o que quebrou é a parte mais valiosa do relatório). Entrega: o relatório + prints ou vídeo curto da solução em uso.",
        },
        {
          title: "Demo day e o próximo passo: mentoria de negócio",
          type: "leitura",
          duration: "25min",
          summary: "Como apresentar seu projeto, o que fazer com o feedback — e como continuar com acompanhamento de verdade.",
          content:
            "Apresente seu projeto para uma banca real, ainda que pequena: o dono do negócio que viveu a dor, um colega empreendedor e uma pessoa que não entende de tecnologia (se ela entender seu pitch, ele está pronto). Roteiro: pitch de 3 minutos (Módulo 7) + demonstração ao vivo de 2 minutos + relatório de uma página na mão. Colete três coisas de cada pessoa: o que ficou claro, o que não convenceu, e a pergunta que você não soube responder — essa última é seu mapa de estudo para o próximo ciclo.\n\nE agora? Um curso te dá método e primeiras provas; um negócio de verdade se constrói em ciclos — e cada ciclo novo (primeiro cliente pagante, precificação, proposta B2B, escala) traz decisões em que orientação experiente encurta anos de tentativa e erro.\n\nSe você quer esse acompanhamento, o caminho é a mentoria de negócio com a Dra. Giselle: uma conversa de diagnóstico individual onde você apresenta exatamente o material que acabou de produzir (relatório + pitch), recebe uma leitura franca do estágio do seu projeto e sai com os próximos passos priorizados — e, se fizer sentido para os dois lados, um plano de acompanhamento contínuo. O botão 'Solicitar conversa de diagnóstico' está nos Próximos passos, na lateral desta página.\n\nSe o seu próximo salto for técnico — dominar os fundamentos aplicados de IA com casos reais de indústria, agro e serviços para construir soluções mais robustas — o aprofundamento natural é o curso IA na Prática, também nos Próximos passos.\n\nSeja qual for o caminho: você terminou este curso com o que a maioria não tem — uma dor validada com gente real, um protótipo funcionando, números honestos e um pitch. Não pare o ciclo. A Dona Marta do seu pitch está esperando a versão 2.",
        },
        {
          title: "Quiz final do curso",
          type: "quiz",
          duration: "15min",
          summary: "Quatro questões que amarram o ciclo completo: dor, MVP, número honesto e próximo ciclo.",
        },
      ],
      quiz: [
        {
          prompt: "No desafio da triagem de currículos para ONG, quais salvaguardas o módulo exige?",
          options: [
            "Nenhuma — classificação automática pode decidir sozinha.",
            "Revisão humana obrigatória em toda decisão e auditoria de viés numa amostra — triagem mais rápida SEM excluir injustamente ninguém.",
            "Apenas velocidade: quanto mais currículos por minuto, melhor.",
          ],
          correctIndex: 1,
          explanation:
            "Decisão sobre pessoas é o território de maior risco ético. IA acelera a organização; a decisão e a justiça continuam sendo responsabilidade humana.",
        },
        {
          prompt: "Qual é o critério de conclusão do desafio final?",
          options: [
            "A solução ficar visualmente impressionante.",
            "O relatório de uma página com número de antes e número de depois, medidos com um usuário real — incluindo o que quebrou.",
            "Publicar o projeto nas redes sociais.",
          ],
          correctIndex: 1,
          explanation:
            "Antes → depois → o que quebrou → próximo passo. É a prova de domínio do ciclo completo — e exatamente o material que sustenta uma conversa séria de mentoria ou venda.",
        },
        {
          prompt: "Por que incluir 'uma pessoa que não entende de tecnologia' na banca do seu demo day?",
          options: [
            "Para ter uma avaliação mais fácil.",
            "Porque se ela entender seu pitch, ele está pronto — cliente e investidor compram dor resolvida, não tecnologia explicada.",
            "Porque a LGPD exige diversidade nas bancas.",
          ],
          correctIndex: 1,
          explanation:
            "O teste da clareza: pitch que só especialista entende é pitch sobre tecnologia. A dor, a prova e o pedido têm que atravessar qualquer plateia.",
        },
        {
          prompt: "Terminado o curso, qual é a lógica do próximo passo saudável?",
          options: [
            "Parar de validar e investir tudo em marketing.",
            "Continuar em ciclos — e buscar orientação experiente (mentoria) nas decisões novas, como primeiro cliente pagante, precificação e proposta B2B, onde ela encurta anos de tentativa e erro.",
            "Reescrever o protótipo do zero com programação avançada antes de falar com mais clientes.",
          ],
          correctIndex: 1,
          explanation:
            "Negócio se constrói em ciclos de aprendizado. Método você já tem; acompanhamento experiente acelera — é para isso que existe a conversa de diagnóstico de mentoria.",
        },
      ],
    },
  ],
  library: [
    {
      title: "Teachable Machine — treine modelos sem código",
      description: "Classificadores de imagem, som e pose no navegador. A prática do Módulo 3 e a base de vários desafios finais.",
      tool: "Teachable Machine",
      url: TEACHABLE_URL,
    },
    {
      title: "Mapa de empatia (modelo gratuito)",
      description: "O template usado na prática do Módulo 2 — preencha só com o que ouviu na entrevista.",
      tool: "Miro",
      url: MIRO_EMPATIA_URL,
    },
    {
      title: "Business Model Canvas (modelo gratuito)",
      description: "Os 9 blocos do seu negócio, incluindo dados como recurso e custo por uso da IA. Prática do Módulo 6.",
      tool: "Miro",
      url: MIRO_CANVAS_URL,
    },
    {
      title: "Zapier + GPT — automações com IA",
      description: "Conecte formulários, planilhas e e-mail a um passo de IA generativa. Prática do Módulo 4.",
      tool: "Zapier",
      url: ZAPIER_GPT_URL,
    },
    {
      title: "Glide — transforme planilha em aplicativo",
      description: "Dê cara de produto ao seu MVP sem código, a partir de uma planilha do Google.",
      tool: "Glide",
      url: GLIDE_URL,
    },
    {
      title: "Google Forms — validação de interesse",
      description: "Formulários gratuitos para entrevistas estruturadas e página de interesse do Módulo 5.",
      tool: "Google Forms",
      url: FORMS_URL,
    },
  ],
  nextSteps: [
    {
      title: "Mentoria de negócio com a Dra. Giselle",
      description:
        "Terminou o desafio final? Leve seu relatório e seu pitch para uma conversa de diagnóstico individual: leitura franca do estágio do projeto e próximos passos priorizados.",
      href: MENTORIA_HREF,
      label: "Solicitar conversa de diagnóstico",
    },
    {
      title: "Aprofundamento: IA na Prática",
      description:
        "O curso pago da trilha: fundamentos aplicados de IA com casos reais de indústria, agro e serviços — para construir soluções mais robustas que o protótipo.",
      href: IA_NA_PRATICA_HREF,
      label: "Conhecer o curso",
    },
  ],
};
