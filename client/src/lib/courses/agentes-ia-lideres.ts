import type { Course } from "./types";

// Programa corporativo (formato Executivo: eixos → competências → módulos).
// Programa completo e roteiros de gravação no Claude Docs: https://claude.ai/code/artifact/bb1fe558-e3e7-493e-8666-0cd3cf8d9fdd
// Edite videoUrl / slidesUrl / practiceUrl conforme grava e publica os materiais.

export const agentesIaLideres: Course = {
  "slug": "agentes-ia-lideres",
  "title": "Agentes de IA para Líderes: da Estratégia à Operação",
  "level": "Intermediário",
  "hours": "60h",
  "free": false,
  "publico": "empresas",
  "tagline": "Do chatbot com marketing ao agente em operação: método para líderes decidirem, implantarem e governarem agentes de IA com segurança.",
  "description": "Programa corporativo para líderes que vão patrocinar, comprar ou conviver com agentes de IA. Com o método 4M, o Checklist das 5 Peças e os níveis de prontidão de Giselle Falcão, a turma aprende a escolher onde um agente gera valor, avaliar fornecedores, desenhar o trabalho com humano no circuito, governar riscos e levar um piloto até a operação. Cada participante sai com o Plano de Agente da própria empresa.",
  "outcomes": [
    "Distinguir chatbot, automação e agente de IA com o Checklist das 5 Peças e explicar o que mudou na tecnologia em 2025 e 2026",
    "Compreender a anatomia de um agente (modelo, ferramentas, MCP, memória, orquestração e multiagentes) a ponto de dialogar com times técnicos e fornecedores",
    "Mapear e medir oportunidades com o método 4M, priorizando processos por valor, viabilidade e risco",
    "Avaliar soluções e fornecedores sem cair no agent-washing, com provas de conceito, métricas de qualidade, custo por tarefa e a decisão entre construir e comprar",
    "Desenhar processos com humano no circuito, com níveis de autonomia, pontos de parada, alçadas e tratamento de exceções",
    "Governar riscos de agentes, incluindo injeção de prompt, permissões, rastreabilidade, LGPD, ISO/IEC 42001, AI Act europeu e PL 2338/2023",
    "Conduzir a passagem da prova de conceito à operação, com observabilidade, avaliação contínua, controle de custos e relatório para quem decide",
    "Escalar agentes como portfólio, com modelo operacional, papéis novos, indicadores de valor e uma cultura de confiança"
  ],
  "audience": "Diretores, gerentes, coordenadores e líderes de negócio, operações, atendimento, finanças, RH, jurídico, tecnologia e inovação que patrocinam, compram ou vão conviver com agentes de IA nas suas equipes. Turmas fechadas para uma empresa ou grupo de empresas, com casos adaptados ao setor.",
  "prerequisites": "Não é preciso saber programar. É recomendável já ter usado alguma ferramenta de IA generativa no trabalho e ter um processo da própria área para usar como base do projeto aplicado.",
  "status": "disponivel",
  "conteudo": "em-producao",
  "modules": [
    {
      "id": "modulo-1",
      "title": "O que é um agente de IA",
      "subtitle": "Competência: distinguir chatbot, automação e agente de IA",
      "duration": "6h",
      "free": true,
      "lessons": [
        {
          "title": "A próxima interface não será um app",
          "type": "video",
          "duration": "9min",
          "summary": "Giselle apresenta a mudança de interface em curso: do clicar em telas ao pedir resultados a um agente que usa as ferramentas por nós. Mostra por que isso é assunto de liderança (muda o trabalho, o cliente e o risco) com o caso de uma construtora que passou a cotar materiais por meio de um agente.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Chatbot, automação e agente: três coisas diferentes",
          "type": "video",
          "duration": "10min",
          "summary": "Separa os três pelo que fazem: o chatbot conversa e devolve texto, a automação (incluindo RPA) repete passos fixos e o agente recebe um objetivo e decide os passos. Usa a analogia do trem, do guia e do motorista e a pergunta da palestra: quem está aprendendo a dirigir?",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "As 5 Peças de um agente de verdade",
          "type": "video",
          "duration": "11min",
          "summary": "Apresenta o método da Giselle para reconhecer um agente: Objetivo, Memória, Ferramentas, Autonomia e Avaliação. Explica o que acontece quando falta cada peça, com o caso de um agente de cobrança que mandou três cobranças a um associado que já tinha renegociado.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Autonomia é uma escala, não um interruptor",
          "type": "video",
          "duration": "10min",
          "summary": "Mostra a autonomia como uma escada de cinco degraus, do agente que sugere ao que age sozinho dentro de limites, e como escolher o degrau pelo impacto e pela reversibilidade de cada ação. Autonomia se conquista com evidência, como a de um colaborador novo.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "O que mudou em 2025 e 2026",
          "type": "video",
          "duration": "11min",
          "summary": "Os três avanços que tornaram os agentes viáveis nas empresas: modelos que raciocinam e usam ferramentas, agentes que operam navegador, computador e código, e padrões abertos como MCP e A2A. Também o que não mudou: os modelos ainda erram, e o mercado se encheu de agent-washing.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "O Checklist das 5 Peças na prática",
          "type": "video",
          "duration": "12min",
          "summary": "As dez perguntas do Checklist das 5 Peças e os três veredictos (chatbot com marketing, automação com sotaque de conversa ou agente), aplicados primeiro dentro de casa: como montar o inventário das iniciativas da empresa e escolher três processos candidatos.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: a rede de supermercados e seus três \"agentes\"",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma rede regional de supermercados apresenta ao conselho três \"agentes em produção\". Com o Checklist das 5 Peças, você descobre o que cada um realmente é e reescreve a mensagem ao conselho.",
          "content": "Uma rede regional de supermercados com 35 lojas em Minas Gerais (empresa fictícia) apresentou ao conselho de administração, no último trimestre, um slide com o título \"Três agentes de IA em produção\". O diretor de tecnologia estava orgulhoso: em menos de um ano, a rede tinha colocado IA no atendimento, no financeiro e em compras.\n\nO primeiro \"agente\" é o atendente do aplicativo de mensagens. Ele responde dúvidas sobre horário das lojas, ofertas da semana e programa de fidelidade, a partir de um cardápio de opções e de uma base de perguntas frequentes. Quando o cliente pede algo diferente, como trocar a data de entrega de uma compra on-line, ele informa o telefone da central. Ninguém sabe dizer qual é a taxa de acerto das respostas.\n\nO segundo é o \"agente de contas a pagar\". Na prática, é um robô de automação que, todas as manhãs, lê as notas fiscais recebidas por e-mail, copia os dados para o sistema de gestão e agenda o pagamento conforme o prazo. Funciona muito bem enquanto as notas vêm no formato esperado; quando um fornecedor muda o layout, o robô para e alguém do financeiro assume. Todas as ações ficam registradas.\n\nO terceiro é o assistente de compras, ainda em piloto em duas lojas. Ele recebe o objetivo \"manter a ruptura de hortifrúti abaixo da meta sem aumentar a perda\", consulta estoque, vendas e previsão do tempo, monta o pedido de reposição e o envia ao comprador para aprovação quando passa de um valor. Tem memória das decisões anteriores do comprador, limite de autonomia definido e um teste com seis semanas de dados reais.\n\nAntes da próxima reunião do conselho, a presidente pediu que a equipe revisasse o slide. Ela não quer desmerecer o trabalho feito; quer que o conselho entenda exatamente o que a rede tem, para decidir com segurança onde investir no próximo ano.\n\nPerguntas para discussão:\n\n1. Aplicando as dez perguntas do Checklist das 5 Peças, quantos pontos cada iniciativa faz e qual é o veredicto de cada uma?\n\n2. Que peças faltam no atendente do aplicativo e no robô de contas a pagar, e vale a pena completá-las ou eles já cumprem bem o seu papel?\n\n3. Como você reescreveria o título e o texto do slide para o conselho, com os nomes corretos e sem desvalorizar as iniciativas?"
        },
        {
          "title": "Atividade prática: inventário de iniciativas pelas 5 Peças",
          "type": "pratica",
          "duration": "1h",
          "summary": "Liste todas as iniciativas de IA e automação da sua empresa ou área (em uso, em piloto ou em negociação), aplique o Checklist das 5 Peças a cada uma, registre o veredicto e as peças faltantes e escolha três processos candidatos para o seu Plano de Agente, com uma justificativa curta para cada um. Entregável: a planilha do inventário com as três candidatas destacadas.",
          "practiceTool": "Google Sheets",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "O que diferencia fundamentalmente um agente de IA de um chatbot?",
          "options": [
            "O agente usa um modelo de linguagem maior e mais caro.",
            "O agente recebe um objetivo, decide os passos e usa ferramentas para agir nos sistemas, com limites e avaliação.",
            "O agente responde mais rápido e em mais idiomas.",
            "O agente funciona sem nenhuma supervisão humana."
          ],
          "correctIndex": 1,
          "explanation": "O que define o agente não é o tamanho do modelo, e sim as 5 Peças: objetivo, memória, ferramentas, autonomia e avaliação. Um chatbot pode usar um modelo enorme e continuar devolvendo apenas texto. E agente sem limite de autonomia não é qualidade, é risco."
        },
        {
          "prompt": "Um robô de software copia, toda manhã, os dados das notas fiscais do e-mail para o ERP, seguindo sempre os mesmos passos. Pelo método do curso, ele é:",
          "options": [
            "Um agente, porque age nos sistemas da empresa.",
            "Um chatbot, porque lê textos.",
            "Uma automação (RPA): executa passos fixos e para diante do inesperado.",
            "Um sistema multiagente."
          ],
          "correctIndex": 2,
          "explanation": "Agir em sistemas não basta para ser agente. Quem recebe passos fixos e repete sempre igual é automação; a RPA imita cliques de uma pessoa. Pode ser excelente, mas não decide o caminho a partir de um objetivo."
        },
        {
          "prompt": "Pelo Checklist das 5 Peças, uma solução que faz 6 de 10 pontos recebe qual veredicto?",
          "options": [
            "É um agente.",
            "É uma automação com sotaque de conversa.",
            "É um chatbot com marketing.",
            "Não é possível classificar sem saber o fornecedor."
          ],
          "correctIndex": 1,
          "explanation": "De 0 a 4 pontos: chatbot com marketing; de 5 a 8: automação com sotaque de conversa; de 9 a 10: agente. O veredicto diz o que o sistema é, não se é bom ou ruim, e a peça que falta vira a pergunta a fazer antes de assinar."
        },
        {
          "prompt": "Ao decidir o nível de autonomia de um agente para uma tarefa, quais são as duas perguntas centrais?",
          "options": [
            "Qual o preço da licença e quantos usuários terá.",
            "Qual o tamanho do estrago se der errado e se dá para desfazer a ação.",
            "Qual o modelo de linguagem usado e em que nuvem roda.",
            "Quantas ferramentas o agente tem e quantos idiomas fala."
          ],
          "correctIndex": 1,
          "explanation": "Impacto e reversibilidade orientam o degrau de autonomia. Ações de baixo impacto e reversíveis aceitam degraus altos; ações irreversíveis ou de alto impacto (pagar, negar crédito, falar com o cliente em nome da empresa) pedem aprovação humana."
        },
        {
          "prompt": "Qual destas é uma mudança real que tornou os agentes viáveis nas empresas a partir de 2025?",
          "options": [
            "Os modelos deixaram de cometer erros.",
            "A adoção de padrões abertos, como o MCP, para conectar agentes a sistemas e ferramentas.",
            "A proibição de chatbots pela regulação europeia.",
            "O fim da necessidade de dados para treinar modelos."
          ],
          "correctIndex": 1,
          "explanation": "Modelos melhores no uso de ferramentas, agentes que operam navegador e código e padrões abertos como o MCP (agente-ferramentas) e o A2A (agente-agente) mudaram o jogo. O que não mudou: os modelos ainda erram, por isso avaliação e limites continuam essenciais."
        }
      ]
    },
    {
      "id": "modulo-2",
      "title": "Anatomia de um agente",
      "subtitle": "Competência: compreender os componentes de um agente e dialogar com times técnicos e fornecedores",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "O cérebro do agente: modelos de linguagem",
          "type": "video",
          "duration": "10min",
          "summary": "Explica sem jargão o que é um LLM, o que são tokens e janela de contexto e por que os modelos alucinam. Traz quatro critérios para o líder escolher modelos (qualidade na tarefa, custo por tarefa, velocidade e onde os dados são processados) e o caso de um escritório de contabilidade que cortou custos usando o modelo certo para cada etapa.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "O ciclo do agente: pensar, agir, observar",
          "type": "video",
          "duration": "10min",
          "summary": "Mostra o ciclo ReAct, em que o agente pensa no que falta, age com uma ferramenta e observa o resultado, repetindo até concluir. Apresenta as instruções de sistema como a descrição de cargo do agente e a importância do critério de parada, com o caso de um agente de suporte que tentava sem parar acessar um sistema fora do ar.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Ferramentas: as mãos do agente",
          "type": "video",
          "duration": "11min",
          "summary": "Como funciona a chamada de função: o modelo pede e o sistema da empresa confere e executa. Classifica as ferramentas em leitura, escrita reversível e ação irreversível, cada uma com seu nível de cuidado, e mostra que as ferramentas são a principal fronteira de segurança do agente.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "MCP: a tomada universal dos agentes",
          "type": "video",
          "duration": "11min",
          "summary": "O que é o Model Context Protocol, como servidores e clientes MCP reduzem integrações sob medida e por que o padrão se espalhou em 2025. Inclui as perguntas que o líder deve fazer antes de conectar servidores MCP de terceiros e o caso de um grupo de concessionárias que reaproveitou um servidor interno em três agentes.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Memória e conhecimento: contexto, RAG e base de conhecimento",
          "type": "video",
          "duration": "11min",
          "summary": "Diferencia memória de curto e de longo prazo e explica o RAG como uma prova com consulta: buscar os trechos certos nos documentos da empresa antes de responder. Mostra que a base de conhecimento precisa de dono, revisão e permissões, com o caso de um manual técnico desatualizado que gerou orientação errada.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Orquestração e multiagentes: quando um agente não basta",
          "type": "video",
          "duration": "12min",
          "summary": "Compara fluxos fixos com etapas inteligentes e agentes que decidem o caminho, explica a lógica de orquestrador e especialistas e o preço da complexidade (custo, latência, erros que se propagam). Regra prática: começar com um agente ou fluxo simples e dividir só com evidência.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: a distribuidora de autopeças e os cinco agentes",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma distribuidora de autopeças recebeu proposta de cinco agentes conversando entre si para atender seus vendedores externos. Você desenha a anatomia mínima e decide se o arranjo multiagente se justifica.",
          "content": "Uma distribuidora de autopeças de Campinas (empresa fictícia) tem 400 vendedores externos que visitam oficinas e lojas em quatro estados. Hoje, para saber se uma peça tem estoque, qual o preço para aquele cliente e qual o prazo de entrega, o vendedor liga ou manda mensagem para a central interna, que consulta o sistema de gestão e responde. Em dias de pico, a espera passa de uma hora e pedidos se perdem.\n\nA diretoria comercial quer um agente que atenda os vendedores pelo celular: consultar estoque e preço, montar o pedido no sistema de gestão e avisar o cliente sobre o prazo de entrega. Um fornecedor apresentou uma proposta com cinco agentes: um de estoque, um de preços, um de pedidos, um de logística e um orquestrador que conversa com o vendedor e distribui as tarefas.\n\nA equipe de tecnologia da distribuidora tem dúvidas. O sistema de gestão já oferece consultas de estoque, preço e prazo por API, e a criação de pedidos também. A política de preços tem regras por cliente e por volume, e descontos acima de um limite precisam de aprovação do gerente regional. O catálogo tem mais de 80 mil itens, com muitas peças equivalentes entre marcas, descritas em fichas técnicas.\n\nO fornecedor argumenta que cinco agentes especializados \"pensam melhor\" do que um. A diretoria financeira quer saber quanto vai custar cada pedido montado e quem responde se um pedido sair com preço errado. A gerente da central interna quer saber o que acontece com os casos que o agente não resolver.\n\nPerguntas para discussão:\n\n1. Qual é a anatomia mínima desse agente (modelo, ferramentas, memória e base de conhecimento, orquestração)? Quais ferramentas são de leitura e quais executam ações?\n\n2. O arranjo de cinco agentes se justifica? Que evidências você pediria ao fornecedor antes de aceitar a complexidade?\n\n3. Que perguntas técnicas você faria ao fornecedor sobre custo por pedido, limites de autonomia nos descontos e registro das ações?"
        },
        {
          "title": "Atividade prática: Ficha de Anatomia do Agente",
          "type": "pratica",
          "duration": "1h",
          "summary": "Escolha um dos três processos candidatos do Módulo 1 e preencha a Ficha de Anatomia do Agente: objetivo em uma frase com critério de sucesso, sistemas e dados que o agente precisa tocar (classificados em leitura, escrita reversível e ação irreversível), memória e base de conhecimento necessárias, limite de autonomia inicial e como ele seria avaliado. Entregável: a ficha de uma página.",
          "practiceTool": "Google Docs",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Na chamada de função (function calling), quem efetivamente executa a ação, por exemplo a consulta ao sistema de pedidos?",
          "options": [
            "O próprio modelo de linguagem, nos servidores do fornecedor.",
            "O sistema da empresa, depois de receber e conferir o pedido estruturado que o modelo devolve.",
            "O usuário, que precisa clicar para cada passo.",
            "O servidor de e-mail da empresa."
          ],
          "correctIndex": 1,
          "explanation": "O modelo pede, o sistema executa. Isso permite validar cada pedido antes de cumpri-lo e faz das ferramentas a principal fronteira de segurança: o agente só consegue fazer o que suas ferramentas permitem."
        },
        {
          "prompt": "Qual é a função do MCP (Model Context Protocol)?",
          "options": [
            "Treinar modelos de linguagem com os dados da empresa.",
            "Padronizar a conexão entre agentes e sistemas, ferramentas e dados, para que uma integração possa ser reaproveitada por vários agentes.",
            "Substituir o modelo de linguagem nas tarefas de raciocínio.",
            "Garantir que o agente nunca erre."
          ],
          "correctIndex": 1,
          "explanation": "O MCP é a \"tomada universal\": o sistema expõe ferramentas num servidor MCP e qualquer cliente compatível pode usá-las. Ele não treina modelos nem raciocina. E servidores de terceiros exigem cuidado, porque têm acesso aos seus dados."
        },
        {
          "prompt": "O que é RAG, no contexto de agentes?",
          "options": [
            "Um tipo de modelo de linguagem treinado só com dados brasileiros.",
            "Uma técnica que busca trechos relevantes nos documentos da empresa e os entrega ao modelo antes da resposta, como uma prova com consulta.",
            "Um protocolo para agentes conversarem entre si.",
            "Uma métrica de qualidade de agentes."
          ],
          "correctIndex": 1,
          "explanation": "RAG (geração aumentada por recuperação) permite responder com base nos documentos da empresa e mostrar a fonte. O limite: se a base estiver desatualizada ou contraditória, a resposta sai errada com cara de certa. Por isso a base precisa de dono."
        },
        {
          "prompt": "Um agente de suporte tentou acessar um sistema fora do ar dezenas de vezes seguidas. Que elemento faltou no desenho?",
          "options": [
            "Um modelo de linguagem maior.",
            "Um critério de parada, como um número máximo de tentativas seguido de escalonamento para uma pessoa.",
            "Mais ferramentas de escrita.",
            "Uma base de conhecimento com RAG."
          ],
          "correctIndex": 1,
          "explanation": "O ciclo pensar, agir, observar precisa saber quando parar: quando o objetivo é atingido, depois de um número máximo de tentativas ou quando há dúvida ou risco. Sem isso, o agente gasta tempo e dinheiro em voltas inúteis."
        },
        {
          "prompt": "Quando um sistema multiagente tende a se justificar?",
          "options": [
            "Sempre, porque vários agentes pensam melhor do que um.",
            "Quando as partes da tarefa exigem ferramentas, conhecimentos ou permissões muito diferentes, ou podem rodar em paralelo, e há evidência de que um agente só não dá conta.",
            "Quando o fornecedor recomenda.",
            "Quando a empresa quer reduzir custos de uso do modelo."
          ],
          "correctIndex": 1,
          "explanation": "Multiagentes trazem mais custo, mais latência e erros que se propagam. A regra prática é começar com um agente bem desenhado ou um fluxo fixo e dividir só quando houver evidência. Vários agentes conversando costumam custar mais, não menos."
        }
      ]
    },
    {
      "id": "modulo-3",
      "title": "Onde agentes geram valor",
      "subtitle": "Competência: mapear e medir oportunidades de uso de agentes",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Comece pelo que dói: o método 4M",
          "type": "video",
          "duration": "9min",
          "summary": "Apresenta o método 4M da Giselle (Mapear, Medir, Montar, Mostrar), o que cada passo produz e por que a ordem importa: quem pula o Mapear automatiza a coisa errada, quem pula o Medir não prova nada e quem pula o Mostrar cria um piloto invisível.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Casos de uso: atendimento, vendas, finanças e RH",
          "type": "video",
          "duration": "11min",
          "summary": "Um passeio pelas áreas que lidam com clientes, dinheiro e pessoas, com a virada do responder para o resolver no atendimento. Separa os casos de baixo risco dos de alto risco, como a triagem de candidatos no RH, em que a decisão final fica sempre com pessoas.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Casos de uso: operações, suprimentos, jurídico e tecnologia",
          "type": "video",
          "duration": "11min",
          "summary": "Casos em compras, logística, manutenção, qualidade, jurídico e tecnologia, e o padrão comum aos que dão certo: volume alto, vários sistemas, regras claras com exceções e uma pessoa por perto. Inclui o caso de uma indústria de móveis que liberou seus compradores de cobrar fornecedores atrasados.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Mapear: escolhendo o processo certo",
          "type": "video",
          "duration": "10min",
          "summary": "Critérios do bom candidato (repetitivo, atravessa três ou mais sistemas, regras com julgamento, dono, dor mensurável, erro tolerável) e como desenhar o processo como ele é hoje, junto com quem opera. Também os sinais de alerta de processos que parecem bons candidatos e não são.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Medir: linha de base e critério de sucesso",
          "type": "video",
          "duration": "11min",
          "summary": "Como medir a linha de base (tempo de ciclo, custo por execução, erro, volume) mesmo sem sistema, escrever o critério de sucesso antes de começar e escolher de três a cinco KPIs de resultado, qualidade e adoção, evitando métricas de vaidade.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "O filtro de oportunidades: valor, viabilidade e risco",
          "type": "video",
          "duration": "12min",
          "summary": "As três lentes do filtro, a matriz valor × viabilidade com o risco como cor e os quatro quadrantes de decisão. Fecha com o caso de negócio de uma página e o ROI estimado com premissas explícitas e cenários conservador e provável.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: a indústria de laticínios e as doze ideias",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma indústria de laticínios recebeu doze ideias de agentes e ninguém sabe quanto tempo os processos levam hoje. Você aplica Mapear, Medir e o filtro de oportunidades para escolher o primeiro agente.",
          "content": "Uma indústria de laticínios do interior de Goiás (empresa fictícia), com três fábricas e cerca de 1.200 produtores rurais fornecedores de leite, decidiu que 2027 seria \"o ano dos agentes de IA\". Em dois meses, a diretoria recebeu doze ideias, vindas de diretores, gerentes e fornecedores de tecnologia.\n\nEntre as ideias estão: um \"agente de vendas\" para atender supermercados; um agente de qualidade do leite que analisaria os laudos de cada produtor; um agente para responder dúvidas de produtores sobre pagamento; um agente de compras de embalagens; um agente para conferir notas fiscais de frete; um agente de manutenção das linhas de envase; e outras seis, de RH, jurídico e marketing.\n\nQuando o diretor de operações pediu números, ninguém soube dizer quanto tempo os processos levam hoje. A área de relacionamento com produtores estima que responde \"umas trezentas\" dúvidas sobre pagamento por mês, a maioria por telefone. A conferência de fretes ocupa duas pessoas em tempo integral, mas os erros encontrados não são registrados. O \"agente de vendas\" depende de uma tabela de preços que vive em planilhas pessoais dos vendedores.\n\nOs dados de qualidade do leite estão num sistema de laboratório antigo, sem integração, e qualquer erro na análise afeta o pagamento dos produtores e pode ter implicações sanitárias. A diretoria quer começar por um único processo, com chance real de dar certo, e usar o aprendizado para os próximos.\n\nPerguntas para discussão:\n\n1. Aplicando os critérios do Mapear, quais três ideias você levaria adiante para medição e por quê?\n\n2. Como você mediria a linha de base desses três processos em uma ou duas semanas, mesmo sem sistema que registre tudo?\n\n3. Passando as ideias pelo filtro de valor, viabilidade e risco, qual você recomendaria para o primeiro agente e qual seria o critério de sucesso escrito?"
        },
        {
          "title": "Atividade prática: processo mapeado e medido",
          "type": "pratica",
          "duration": "1h",
          "summary": "Mapeie o processo escolhido como ele é hoje (etapas, pessoas, sistemas, exceções), meça a linha de base com dados reais ou cronometragem de 10 a 20 casos ao longo de uma semana, escreva o critério de sucesso em uma frase e posicione os três candidatos na matriz valor × viabilidade × risco. Entregável: mapa do processo, ficha de linha de base, critério de sucesso e matriz.",
          "practiceTool": "Miro",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Qual é a ordem correta do método 4M?",
          "options": [
            "Montar, Medir, Mostrar, Mapear.",
            "Mapear, Medir, Montar, Mostrar.",
            "Medir, Mapear, Mostrar, Montar.",
            "Mapear, Montar, Medir, Mostrar."
          ],
          "correctIndex": 1,
          "explanation": "Primeiro se escolhe e desenha o processo (Mapear), depois se mede o número de hoje e se escreve o critério de sucesso (Medir), só então se constrói a primeira versão (Montar) e, por fim, se compara e apresenta o resultado (Mostrar). Pular para o Montar é o erro mais comum."
        },
        {
          "prompt": "Qual destes processos tende a ser o melhor candidato para o primeiro agente?",
          "options": [
            "O processo mais crítico da empresa, para mostrar impacto rápido.",
            "Um processo repetitivo, frequente, que atravessa vários sistemas, tem regras com algum julgamento, um dono e erro reversível.",
            "Um processo que cada pessoa faz de um jeito diferente.",
            "Um processo que será substituído por um sistema novo em três meses."
          ],
          "correctIndex": 1,
          "explanation": "Volume, vários sistemas, regras com julgamento, dono, dor mensurável e erro tolerável são os critérios do bom candidato. O processo mais crítico fica para depois, e processos sem padrão ou prestes a mudar são sinais de alerta."
        },
        {
          "prompt": "Por que escrever o critério de sucesso antes de começar?",
          "options": [
            "Porque o fornecedor exige.",
            "Para que o resultado possa ser comparado com algo acordado, evitando que qualquer resultado vire opinião.",
            "Porque a lei de proteção de dados obriga.",
            "Para reduzir o custo do modelo de linguagem."
          ],
          "correctIndex": 1,
          "explanation": "Sem número de antes e critério escrito, qualquer resultado depois é opinião. O critério deve ter número, prazo e limite de qualidade (o que não pode piorar) e ser acordado com o dono do processo e com quem opera."
        },
        {
          "prompt": "Qual destes é um exemplo de métrica de vaidade para um agente de atendimento?",
          "options": [
            "Custo por atendimento resolvido.",
            "Taxa de erros graves.",
            "Número total de conversas.",
            "Tempo de ciclo do pedido."
          ],
          "correctIndex": 2,
          "explanation": "Número de conversas mede atividade, não valor. Muitas conversas podem até significar que o agente não está resolvendo. Os KPIs úteis são de resultado de negócio, qualidade e adoção."
        },
        {
          "prompt": "No filtro de oportunidades, um candidato com alto valor e baixa viabilidade deve ser:",
          "options": [
            "Descartado definitivamente.",
            "Iniciado imediatamente, porque o valor compensa.",
            "Tratado como \"preparar o terreno\": resolver dados, integração ou padronização antes do agente.",
            "Transformado em vitória rápida."
          ],
          "correctIndex": 2,
          "explanation": "Alto valor com baixa viabilidade pede preparar o terreno. Foi o caso do atacadista que começou pela conferência de notas e, em paralelo, centralizou a tabela de preços que o futuro agente de vendas exigiria."
        }
      ]
    },
    {
      "id": "modulo-4",
      "title": "Avaliar soluções e fornecedores",
      "subtitle": "Competência: avaliar soluções de agentes, provas de conceito e custos",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Agent-washing: quando tudo vira agente",
          "type": "video",
          "duration": "10min",
          "summary": "O que é agent-washing, os sinais de exagero no discurso comercial (\"100% autônomo\", \"integra com tudo\", a prova é a demonstração) e como transformar o Checklist das 5 Peças em roteiro de perguntas para fornecedores, com respostas por escrito.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "A demonstração não é a prova",
          "type": "video",
          "duration": "10min",
          "summary": "Por que as demonstrações comerciais mostram o melhor cenário e como virar o jogo: rodar com dados e casos da empresa, incluir casos difíceis e casos que devem ser escalados, ver os registros, ver um erro acontecendo e perguntar o custo da execução.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Prova de conceito que decide",
          "type": "video",
          "duration": "11min",
          "summary": "A diferença entre PoC, piloto e operação e os cinco elementos que uma PoC precisa ter antes do primeiro teste: escopo pequeno, conjunto de casos de teste com gabarito, critério de aprovação, prazo e papéis. Inclui os cuidados que separam uma PoC séria de uma vitrine.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Métricas de qualidade de agentes",
          "type": "video",
          "duration": "11min",
          "summary": "As métricas que importam (conclusão, acerto, erros graves, escalonamento, consistência, tempo e satisfação), as três formas de avaliar (gabarito, revisão humana por amostragem e modelos avaliadores) e como transformar tudo em SLA de qualidade no contrato.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Custo por tarefa: a conta que ninguém mostra",
          "type": "video",
          "duration": "11min",
          "summary": "As camadas do custo de um agente, visíveis e invisíveis, o cálculo do custo por tarefa concluída corretamente, os incentivos de cada modelo de cobrança e o TCO ao longo de dois ou três anos, com o caso de uma rede que pagava por conversa.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Construir, comprar ou combinar",
          "type": "video",
          "duration": "12min",
          "summary": "Os três caminhos (SaaS pronto, plataforma configurável e construção sob medida), os critérios de decisão (diferenciação, especificidade, dados, capacidade interna, TCO e dependência) e as cláusulas contratuais que não podem faltar, como propriedade dos dados, acesso aos registros e plano de saída.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: a seguradora e as três propostas para sinistros",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma seguradora quer um agente para triagem de sinistros de automóvel e tem três propostas muito diferentes. Você aplica o checklist, calcula o custo por sinistro triado e desenha uma prova de conceito comparativa.",
          "content": "Uma seguradora de médio porte de São Paulo (empresa fictícia) recebe cerca de 6 mil avisos de sinistro de automóvel por mês. A triagem inicial (conferir apólice e cobertura, classificar o tipo de sinistro, pedir os documentos que faltam e encaminhar para a regulação certa) é feita por uma equipe de 14 analistas e leva, em média, dois dias úteis. Os corretores reclamam da demora e do vai e vem de documentos.\n\nA primeira proposta vem de uma plataforma internacional, cobrada por conversa, com uma demonstração impressionante em inglês e casos de exemplo. A segunda é de uma startup brasileira que promete \"100% de automação da triagem\" e um preço fixo mensal, mas não informa taxa de acerto em clientes parecidos. A terceira é da própria equipe de tecnologia, que prefere construir com modelos via API e já tem integração com o sistema de apólices.\n\nNas planilhas de preço (fictícias), a plataforma internacional parece a mais barata por conversa, mas a equipe estima que cada sinistro gera em média quatro conversas com o segurado e o corretor. A startup não cobra por uso, mas exige contrato de três anos. A equipe interna calcula seis meses para a primeira versão e duas pessoas dedicadas à manutenção.\n\nA diretoria de sinistros quer uma recomendação em seis semanas. O jurídico lembrou que os avisos de sinistro contêm dados pessoais e, às vezes, informações de saúde de vítimas. A área de prevenção a fraudes quer garantir que nenhum sinistro seja encerrado ou negado sem uma pessoa.\n\nPerguntas para discussão:\n\n1. Aplicando o Checklist das 5 Peças às três propostas, que peças faltam ou estão mal explicadas em cada uma?\n\n2. Como você calcularia o custo por sinistro triado corretamente em cada opção, e que informações ainda faltam para fechar a conta?\n\n3. Como seria uma prova de conceito comparativa de quatro semanas, com gabarito, critério de aprovação e papéis, e qual caminho (construir, comprar ou combinar) você recomendaria?"
        },
        {
          "title": "Atividade prática: plano de prova de conceito",
          "type": "pratica",
          "duration": "1h",
          "summary": "Redija o plano de prova de conceito do seu agente candidato: escopo, 30 a 50 casos de teste reais com gabarito, métricas de qualidade, custo-alvo por tarefa concluída, critério de aprovação, prazo e papéis. Registre também a decisão preliminar entre construir, comprar ou combinar, com justificativa. Entregável: o plano de PoC de duas páginas.",
          "practiceTool": "Google Docs",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "O que é agent-washing?",
          "options": [
            "Limpar os dados antes de usá-los num agente.",
            "Chamar de agente um produto que não tem as peças de um agente, como um chatbot ou uma automação com nova embalagem.",
            "Desligar um agente depois de um incidente.",
            "Treinar um agente com dados anonimizados."
          ],
          "correctIndex": 1,
          "explanation": "Assim como o greenwashing, o agent-washing é rebatizar chatbots, assistentes ou RPA como agentes para vender mais. O problema não é o produto ser simples; é pagar preço de agente e esperar resultado de agente."
        },
        {
          "prompt": "Numa prova de conceito bem desenhada, quem deve escolher os casos de teste?",
          "options": [
            "O fornecedor, que conhece melhor a solução.",
            "A empresa, com casos reais, incluindo difíceis e casos que devem ser escalados.",
            "Qualquer pessoa, desde que sejam pelo menos mil casos.",
            "Ninguém: a PoC deve rodar livremente com o que aparecer."
          ],
          "correctIndex": 1,
          "explanation": "A empresa escolhe os casos e monta o gabarito, e todos os fornecedores passam pelo mesmo conjunto. Isso evita a demonstração do caminho feliz e torna a comparação justa."
        },
        {
          "prompt": "Um fornecedor informa 92% de acerto. Qual informação adicional é mais importante pedir?",
          "options": [
            "O número de funcionários do fornecedor.",
            "Quantos dos erros são graves, isto é, causam dano real a clientes, dinheiro ou conformidade.",
            "Em quantos idiomas o agente funciona.",
            "A cor da interface."
          ],
          "correctIndex": 1,
          "explanation": "Uma única taxa de acerto esconde muito. Erros graves devem ser medidos à parte: um erro grave pode valer mais que cem leves. É isso que entra como teto num SLA de qualidade."
        },
        {
          "prompt": "Como se calcula o custo por tarefa de um agente, para compará-lo com a linha de base?",
          "options": [
            "Preço da licença dividido pelo número de usuários.",
            "Custo total do período (uso, licenças, revisão humana, retrabalho) dividido pelo número de tarefas concluídas corretamente.",
            "Número de tokens por conversa.",
            "Custo da integração dividido por doze meses."
          ],
          "correctIndex": 1,
          "explanation": "A conta certa usa tarefas concluídas corretamente, não tentativas nem conversas, e inclui os custos invisíveis, como revisão humana e retrabalho. Ao longo da vida da solução, isso compõe o TCO."
        },
        {
          "prompt": "Qual destas cláusulas é essencial num contrato de agente comprado como SaaS?",
          "options": [
            "Exclusividade do fornecedor por dez anos.",
            "Acesso da empresa aos registros de todas as ações do agente e proibição de usar seus dados para treinar modelos sem autorização.",
            "Proibição de a empresa medir a qualidade do agente.",
            "Pagamento integral antecipado."
          ],
          "correctIndex": 1,
          "explanation": "Propriedade dos dados, uso para treino, acesso aos registros, local de processamento, SLA de qualidade, aviso de troca de modelo, responsabilidades e plano de saída são as cláusulas que protegem a empresa."
        }
      ]
    },
    {
      "id": "modulo-5",
      "title": "Desenho do processo com humano no circuito",
      "subtitle": "Competência: desenhar o trabalho entre pessoas e agentes com autonomia calibrada",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Redesenhar o trabalho, não só automatizar a tarefa",
          "type": "video",
          "duration": "9min",
          "summary": "Por que colocar um agente num processo sem redesenhá-lo é pavimentar uma estrada torta: o desperdício só fica mais rápido. Traz as perguntas de redesenho e o princípio orientador: o agente cuida do volume, a pessoa cuida do julgamento e da relação.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Os cinco níveis de autonomia",
          "type": "video",
          "duration": "11min",
          "summary": "A escada de autonomia em profundidade (sugere, prepara, age com aprovação, age e informa, age dentro de limites), com quem decide, quem executa e que controle cada nível exige. Diferencia humano no circuito de humano sobre o circuito e define regras para subir e descer de nível.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Pontos de parada e alçadas de aprovação",
          "type": "video",
          "duration": "10min",
          "summary": "Os gatilhos que obrigam o agente a parar e chamar uma pessoa (valor, irreversibilidade, cliente em situação sensível, incerteza, exceção de política e pedido incomum) e como montar alçadas de aprovação para agentes, como já existem para pessoas. Parar no lugar certo não é falha, é confiabilidade.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Exceções e escalonamento",
          "type": "video",
          "duration": "10min",
          "summary": "Três caminhos para cada exceção frequente (resolver com regra, escalonar ou recusar), o escalonamento bem feito com fila, dono, prazo e contexto entregue, e a rotina de aprender com as exceções. Inclui o caso de uma loja on-line que reduziu o escalonamento com uma única regra nova.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Pessoas no novo processo",
          "type": "video",
          "duration": "11min",
          "summary": "Os papéis que mudam com a chegada do agente, como o supervisor de agentes e o especialista que treina o agente, a importância de quem opera desenhar junto e a conversa honesta com a equipe. Apresenta os perfis do Diagnóstico pessoal da Giselle: Executor Experiente, Formulador em Formação e Orientador de Sistemas.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "O processo futuro de ponta a ponta",
          "type": "video",
          "duration": "12min",
          "summary": "Como desenhar o processo futuro em raias (cliente, agente, pessoas, sistemas), com nível de autonomia por etapa, pontos de parada e exceções, e a matriz RACI entre pessoas e agente, em que o agente pode executar mas nunca responder pelo resultado. Fecha com o checklist do desenho.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: a operadora de saúde e a autorização de exames",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma operadora de planos de saúde quer autorização automática de exames; o corpo médico teme negativas indevidas. Você redesenha o processo com autonomia calibrada, pontos de parada e um novo papel para os analistas.",
          "content": "Uma operadora de planos de saúde de Pernambuco (empresa fictícia), com cerca de 300 mil beneficiários, analisa por dia centenas de pedidos de autorização de exames e procedimentos. O trabalho é feito por 22 analistas administrativos e, nos casos complexos, por uma equipe de médicos auditores. Há prazos regulatórios de resposta e a fila costuma apertar no início da semana.\n\nA diretoria quer \"autorização automática\" com um agente: ler o pedido médico, conferir a cobertura do plano, a carência, as regras de cada procedimento e o histórico do beneficiário, e responder ao prestador. O corpo médico e a ouvidoria temem negativas indevidas, que afetam a saúde das pessoas e geram reclamações e ações judiciais.\n\nNo mapeamento, a equipe descobriu que cerca de dois terços dos pedidos são exames simples, de baixo custo, com regras claras e quase sempre aprovados. Uma parte menor envolve procedimentos de alto custo ou sem cobertura clara, e uma fração pequena tem documentos incompletos ou suspeita de irregularidade. Hoje, todos passam pela mesma fila, na ordem de chegada.\n\nOs analistas estão apreensivos: ouviram que o agente vai \"fazer o trabalho deles\". Os médicos auditores, por outro lado, gostariam de ter mais tempo para os casos complexos. A diretoria pediu um desenho do processo futuro que equilibre agilidade, segurança para os beneficiários e o papel das pessoas.\n\nPerguntas para discussão:\n\n1. Em que nível de autonomia o agente deve atuar em cada tipo de pedido? Por que ele nunca deveria negar uma autorização sem revisão humana?\n\n2. Quais são os pontos de parada e como deve funcionar a fila de exceções, com contexto entregue e prazo de resposta?\n\n3. Qual o novo papel dos analistas e dos médicos auditores, e como você conduziria a conversa com a equipe?"
        },
        {
          "title": "Atividade prática: processo futuro com humano no circuito",
          "type": "pratica",
          "duration": "1h",
          "summary": "Desenhe o processo futuro do seu agente em raias (cliente, agente, pessoas, sistemas), indique o nível de autonomia de cada etapa, os pontos de parada com seus critérios e aprovadores, o fluxo de exceções e a matriz RACI entre pessoas e agente. Inclua um plano de comunicação de uma página para a equipe afetada. Entregável: o desenho, a RACI e o plano de comunicação.",
          "practiceTool": "Miro",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "No nível 4 da escada de autonomia (\"age e informa\"), qual é o papel da pessoa?",
          "options": [
            "Executar a tarefa no lugar do agente.",
            "Aprovar cada ação antes de ela acontecer.",
            "Revisar depois, por amostragem e alertas, podendo desfazer o que o agente fez.",
            "Nenhum: o agente atua sem qualquer supervisão."
          ],
          "correctIndex": 2,
          "explanation": "No nível 4, o agente executa e a pessoa revisa depois, com possibilidade de reverter. Exige revisão por amostragem, alertas e ações reversíveis. A aprovação prévia é característica dos níveis 2 e 3."
        },
        {
          "prompt": "O que é a fadiga de aprovação, risco típico do humano no circuito?",
          "options": [
            "O cansaço do modelo de linguagem depois de muitas tarefas.",
            "Quando quem aprova muitos casos por dia passa a aprovar sem ler, virando um carimbo.",
            "A demora do fornecedor em aprovar mudanças.",
            "O excesso de alertas no painel."
          ],
          "correctIndex": 1,
          "explanation": "Aprovação em excesso leva ao carimbo automático. Os remédios são aprovar só onde importa, entregar informação resumida a quem aprova e misturar casos de teste para checar a atenção."
        },
        {
          "prompt": "Qual destes é um gatilho de parada, em que o agente deve chamar uma pessoa?",
          "options": [
            "Uma consulta de leitura ao estoque.",
            "Uma ação irreversível, como um pagamento ou o envio de um documento oficial.",
            "Um pedido igual a centenas de outros já resolvidos.",
            "Uma resposta a uma dúvida frequente."
          ],
          "correctIndex": 1,
          "explanation": "Valor acima do limite, irreversibilidade, cliente em situação sensível, incerteza, exceção de política e pedido incomum são gatilhos de parada. Leituras e casos padrão não precisam parar."
        },
        {
          "prompt": "Na matriz RACI de um processo com agente, qual papel o agente nunca deve ocupar?",
          "options": [
            "R (Responsible, quem executa).",
            "A (Accountable, quem responde pelo resultado).",
            "I (Informed, quem é informado).",
            "Nenhum: o agente pode ocupar qualquer papel."
          ],
          "correctIndex": 1,
          "explanation": "O agente pode executar (R), mas quem responde pelo resultado (A) é sempre uma pessoa, com nome e cargo. Para o cliente e para o regulador, quem responde é a empresa."
        },
        {
          "prompt": "Qual é o melhor tratamento para uma exceção que se repete com frequência e tem resposta conhecida?",
          "options": [
            "Mantê-la sempre com uma pessoa, por segurança.",
            "Transformá-la em regra que o agente passa a resolver, revisando o resultado.",
            "Deixar o agente improvisar uma resposta.",
            "Recusar o pedido do cliente."
          ],
          "correctIndex": 1,
          "explanation": "A exceção frequente com resposta conhecida vira regra; a rara e delicada continua humana. Para o que não está previsto, a regra padrão é escalonar, nunca improvisar."
        }
      ]
    },
    {
      "id": "modulo-6",
      "title": "Riscos, segurança e governança de agentes",
      "subtitle": "Competência: governar riscos, segurança e conformidade de agentes de IA",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "O que pode dar errado quando a IA age",
          "type": "video",
          "duration": "10min",
          "summary": "As oito famílias de risco de agentes (erro com consequência, ação indevida, vazamento, manipulação, custo descontrolado, viés, dano reputacional e mudanças no fornecedor), a classificação por probabilidade e impacto e os controles preventivos, detectivos e corretivos. Lembra que a empresa responde pelo que o agente faz e promete.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Injeção de prompt: o golpe que fala a língua do agente",
          "type": "video",
          "duration": "11min",
          "summary": "O que é a injeção de prompt direta e indireta, como instruções escondidas em e-mails e documentos manipulam o agente, a combinação perigosa de dados privados, conteúdo não confiável e canal de saída, e as defesas em camadas, começando por quebrar essa combinação.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Permissões e identidade do agente",
          "type": "video",
          "duration": "11min",
          "summary": "O princípio do menor privilégio aplicado a agentes, a identidade própria com credenciais em cofre e revogáveis, o ciclo de vida dos acessos, os ambientes de teste separados e o botão de desligar que não depende do fornecedor.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Rastreabilidade e auditoria",
          "type": "video",
          "duration": "10min",
          "summary": "O que um agente precisa registrar em cada caso, o teste do \"por quê\" para reconstruir qualquer decisão em minutos e os cuidados com proteção e retenção dos registros, que contêm dados pessoais e pertencem à empresa.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "LGPD e agentes de IA",
          "type": "video",
          "duration": "11min",
          "summary": "A LGPD em linguagem de gestor aplicada a agentes: base legal, minimização, transparência, revisão de decisões automatizadas, transferência internacional, operadores, dados sensíveis, RIPD, papel do encarregado e comunicação de incidentes. Com aviso para conferir as orientações mais recentes da ANPD.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Governança e regulação: ISO/IEC 42001, AI Act e PL 2338/2023",
          "type": "video",
          "duration": "12min",
          "summary": "Governança interna de agentes (inventário, classificação por risco, comitê e aprovação), as referências voluntárias ISO/IEC 42001 e NIST AI RMF, a abordagem por risco do AI Act europeu e do PL 2338/2023, e o que a empresa pode fazer desde já. Com aviso para conferir o estado de cada norma antes de cada turma.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: a fintech e o e-mail com instruções escondidas",
          "type": "leitura",
          "duration": "30min",
          "summary": "Um agente de atendimento por e-mail de uma fintech enviou o extrato de um cliente para um endereço externo após ler instruções escondidas. Você reconstrói o incidente e redesenha permissões, controles e governança.",
          "content": "Uma fintech de crédito pessoal de Curitiba (empresa fictícia), com cerca de 200 mil clientes, colocou em operação um agente para responder e-mails de clientes. Para resolver os pedidos mais comuns, como segunda via de boleto e envio de extrato, o agente tinha acesso de leitura ao cadastro e ao histórico financeiro e permissão para enviar e-mails com documentos anexos.\n\nNuma sexta-feira à noite, o agente recebeu um e-mail aparentemente comum, de um remetente que se passava por cliente. No corpo da mensagem, em letra branca sobre fundo branco, havia instruções para que o agente enviasse o extrato de outro cliente, identificado pelo número do contrato, para um endereço externo. O agente obedeceu. O problema só foi percebido na segunda-feira, quando o cliente afetado recebeu um aviso de acesso e ligou para a central.\n\nNa investigação, a equipe encontrou outros pontos frágeis: o agente usava uma credencial compartilhada com um analista, os registros guardavam o e-mail enviado mas não o raciocínio nem as ferramentas chamadas, não havia limite de envios por hora e ninguém de plantão recebia alertas. O contrato com o fornecedor não deixava claro onde os dados eram processados.\n\nA diretoria precisa decidir as ações imediatas, avaliar as obrigações de comunicação pela LGPD, corrigir o desenho do agente e propor um modelo de governança de agentes para a empresa, que pretende lançar outros três agentes no próximo ano.\n\nPerguntas para discussão:\n\n1. Quais fatores da combinação perigosa estavam presentes e qual deles você eliminaria primeiro? Que outros controles faltaram?\n\n2. Quais são as ações imediatas, incluindo as obrigações de comunicação à ANPD e aos titulares, e o que deve ser preservado para a investigação?\n\n3. Como seria o modelo de governança de agentes da fintech (inventário, classificação por risco, aprovação, permissões, registros) para os próximos três agentes?"
        },
        {
          "title": "Atividade prática: matriz de riscos e controles do agente",
          "type": "pratica",
          "duration": "1h",
          "summary": "Elabore a matriz de riscos e controles do seu agente: riscos por família, probabilidade e impacto, controles preventivos, detectivos e corretivos, permissões mínimas, o que será registrado, enquadramento na LGPD (base legal, dados sensíveis, necessidade de RIPD) e o nível de risco segundo as referências regulatórias estudadas. Entregável: a matriz em planilha.",
          "practiceTool": "Google Sheets",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "O que é injeção de prompt indireta?",
          "options": [
            "Quando o próprio usuário pede ao agente para ignorar as regras.",
            "Quando instruções maliciosas chegam escondidas num conteúdo que o agente lê durante o trabalho, como um e-mail, um documento ou uma página.",
            "Quando o fornecedor troca o modelo sem avisar.",
            "Quando o agente entra em um ciclo infinito."
          ],
          "correctIndex": 1,
          "explanation": "Na injeção indireta, o ataque vem no conteúdo que o agente processa. É a forma mais perigosa porque ninguém precisa conversar com o agente: basta que ele leia o texto envenenado."
        },
        {
          "prompt": "Qual combinação de fatores torna um agente especialmente vulnerável a vazamento por injeção de prompt?",
          "options": [
            "Modelo grande, muitos usuários e alto volume.",
            "Acesso a dados privados, exposição a conteúdo não confiável e capacidade de enviar informação para fora.",
            "Uso de RAG, memória de longo prazo e painel de custos.",
            "Contrato SaaS, nuvem estrangeira e servidor MCP."
          ],
          "correctIndex": 1,
          "explanation": "Quando os três fatores estão no mesmo agente, o risco é alto. A defesa mais eficaz é quebrar a combinação, por exemplo exigindo aprovação humana para qualquer envio externo de um agente que lê e-mails de fora."
        },
        {
          "prompt": "Qual prática segue o princípio do menor privilégio para agentes?",
          "options": [
            "Usar a conta de um administrador para evitar erros de acesso.",
            "Dar ao agente identidade própria, com acesso apenas aos dados e ações necessários e limites dentro das ferramentas.",
            "Compartilhar a credencial do agente com a equipe de suporte.",
            "Liberar acesso total no piloto e restringir depois."
          ],
          "correctIndex": 1,
          "explanation": "O agente manipulado faz tudo o que suas permissões deixarem. Por isso: identidade própria, credenciais em cofre e revogáveis, separação entre leitura e escrita e limites de valor, quantidade e destinatários."
        },
        {
          "prompt": "Pela LGPD, o que o titular pode pedir diante de uma decisão tomada unicamente com base em tratamento automatizado que afete seus interesses, como uma recusa de crédito?",
          "options": [
            "Nada, pois decisões automatizadas não são reguladas.",
            "A revisão da decisão e informações sobre os critérios utilizados.",
            "A exclusão imediata de todos os seus dados da empresa.",
            "Uma indenização automática."
          ],
          "correctIndex": 1,
          "explanation": "A LGPD garante o direito de solicitar a revisão dessas decisões e de obter informações sobre os critérios. Por isso agentes que decidem sobre pessoas precisam de registros que permitam explicar cada caso."
        },
        {
          "prompt": "Sobre o AI Act europeu e o PL 2338/2023, qual afirmação está correta?",
          "options": [
            "Os dois proíbem o uso de agentes de IA em empresas.",
            "Ambos adotam uma abordagem baseada em risco, com obrigações maiores para sistemas de alto risco; o estado do PL brasileiro deve ser conferido, pois ainda pode mudar.",
            "O AI Act só vale para empresas com sede na Europa, sem efeito para empresas brasileiras.",
            "O PL 2338/2023 já está em vigor com o texto original de 2023."
          ],
          "correctIndex": 1,
          "explanation": "Os dois seguem a lógica de risco. O AI Act tem aplicação escalonada e pode afetar empresas brasileiras que atuam na União Europeia. O PL 2338/2023 foi aprovado no Senado em 2024 e seguiu para a Câmara; conferir o estado atual antes de decidir."
        }
      ]
    },
    {
      "id": "modulo-7",
      "title": "Da prova de conceito à operação",
      "subtitle": "Competência: montar, operar e mostrar os resultados de agentes",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Por que pilotos morrem: os três níveis de prontidão",
          "type": "video",
          "duration": "10min",
          "summary": "Os três níveis de prontidão da Giselle (Piloto Bonito, Quase Operação e Pronto para Escalar), as sete perguntas do Diagnóstico de Prontidão organizadas pelos quatro M e as quatro causas do projeto engavetado: operação, métrica, dado e prioridade.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Montar: a versão feia que funciona",
          "type": "video",
          "duration": "10min",
          "summary": "O terceiro M na prática: a menor versão que resolve um pedaço real do problema, com gente do lado. Traz o checklist antes de rodar (objetivo escrito, sistemas listados, ponto de parada, três execuções reais, permissões e registros) e a disciplina dos ciclos curtos de ajuste.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Observabilidade: enxergar o que o agente faz",
          "type": "video",
          "duration": "11min",
          "summary": "Rastros de cada execução, painel operacional com volume, conclusão, escalonamento, erros, tempo e custo, alertas com destinatário e ação prevista e revisão humana por amostragem, com o caso de um alerta que revelou uma integração quebrada no mesmo dia.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Avaliação contínua",
          "type": "video",
          "duration": "11min",
          "summary": "Por que um agente muda de comportamento sem ninguém mexer nele (troca de modelo, regras, dados, deriva), os testes de regressão que rodam a cada mudança e o calendário da avaliação: a cada mudança, semanal e mensal.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Custos e operação no dia a dia",
          "type": "video",
          "duration": "10min",
          "summary": "Como controlar custos com orçamento, limites, modelo certo para cada etapa e menos voltas no ciclo, a rotina operacional com dono e manual de operação, a gestão de mudanças e o plano de contingência testado para quando o agente parar.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Mostrar: o resultado para quem decide",
          "type": "video",
          "duration": "12min",
          "summary": "O quarto M: comparar com a linha de base de forma honesta, montar o relatório de uma página, mostrar inclusive o que deu errado e conduzir a decisão entre escalar, ajustar ou encerrar, com o caso de uma rede de clínicas que ajustou antes de escalar.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: a transportadora e o agente engavetado",
          "type": "leitura",
          "duration": "30min",
          "summary": "Um agente de agendamento de coletas foi aprovado numa prova de conceito e está parado há nove meses. Você diagnostica a prontidão e a causa, monta o plano de piloto e escreve o relatório para a diretoria.",
          "content": "Uma transportadora de cargas fracionadas do Rio Grande do Sul (empresa fictícia), com 18 filiais, agenda por dia centenas de coletas em clientes industriais e comerciais. Hoje o agendamento é feito pela central de atendimento, por telefone, e-mail e aplicativo de mensagens, consultando a disponibilidade de veículos e as rotas no sistema de transporte.\n\nHá nove meses, um agente de agendamento passou numa prova de conceito: a demonstração para a diretoria foi impecável e o relatório técnico apontou boa taxa de acerto nos casos testados. Desde então, o projeto está parado. O patrocinador original mudou de área e o orçamento do ano foi para outras prioridades.\n\nAo revisitar o projeto, a nova gerente de operações encontrou lacunas. Ninguém sabe o custo por agendamento do agente, nem o custo atual da central. A central de atendimento não participou do desenho e desconfia da solução. Não há registro do que o agente fez durante a PoC, só a planilha final de acertos. Não estão definidos o ponto de parada, o plano de contingência nem quem seria o dono operacional.\n\nA gerente tem uma reunião com a diretoria em oito semanas e quer levar duas coisas: um diagnóstico honesto de por que o projeto parou e uma proposta concreta de piloto, com métricas, observabilidade, custos e critérios de decisão.\n\nPerguntas para discussão:\n\n1. Em que nível de prontidão a transportadora está e qual das quatro causas de engavetamento explica melhor a parada?\n\n2. Como seria o plano de piloto de oito semanas, com escopo, equipe, painel, alertas, avaliação contínua, custos e plano de contingência?\n\n3. Como você estruturaria o relatório de uma página para a diretoria, incluindo o que deu errado na primeira tentativa?"
        },
        {
          "title": "Atividade prática: plano de piloto e painel",
          "type": "pratica",
          "duration": "1h",
          "summary": "Aplique o Diagnóstico de Prontidão do Kit do Agente à sua empresa e elabore o plano de piloto do seu agente: escopo, equipe, critérios de entrada e saída, painel de métricas (qualidade, custo por tarefa, adoção), alertas, rotina de avaliação contínua, plano de contingência e o modelo do relatório de resultados de uma página. Entregável: o plano de piloto e o esboço do painel.",
          "practiceTool": "Google Sheets",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Uma empresa tem um piloto que impressionou na demonstração, mas ninguém escreveu o que conta como sucesso nem sabe o custo por execução. Em que nível de prontidão ela está?",
          "options": [
            "Pronto para Escalar.",
            "Quase Operação.",
            "Piloto Bonito.",
            "Operação Plena."
          ],
          "correctIndex": 2,
          "explanation": "No Piloto Bonito a empresa está experimentando: falta o critério de sucesso escrito, o envolvimento de quem opera ou o custo por execução. É o nível mais barato de consertar."
        },
        {
          "prompt": "Um projeto de agente parou porque \"o número não convenceu quem decide\". Em qual M ele morreu?",
          "options": [
            "Mapear.",
            "Medir.",
            "Montar.",
            "Mostrar."
          ],
          "correctIndex": 1,
          "explanation": "Quando o número não convence, quase sempre faltou a linha de base: não havia número de antes para comparar. Recuperar começa por medir o processo como ele roda hoje, sem o agente."
        },
        {
          "prompt": "Qual item é obrigatório no checklist antes de rodar a versão feia em casos reais?",
          "options": [
            "Integração com todos os sistemas da empresa.",
            "Ponto de parada definido, porque sem ele não é versão feia, é risco.",
            "Aprovação do conselho de administração.",
            "Modelo de linguagem mais recente do mercado."
          ],
          "correctIndex": 1,
          "explanation": "Objetivo escrito, sistemas listados, ponto de parada definido e execuções acompanhadas em casos reais, além de permissões mínimas e registros ligados, vêm antes de qualquer execução real."
        },
        {
          "prompt": "Por que um agente pode piorar mesmo sem ninguém da empresa alterar nada?",
          "options": [
            "Porque os agentes se cansam com o uso.",
            "Porque o fornecedor pode atualizar o modelo e porque dados, regras e pedidos dos clientes mudam com o tempo.",
            "Porque os registros ocupam espaço demais.",
            "Porque a licença expira."
          ],
          "correctIndex": 1,
          "explanation": "Troca de modelo, mudanças em dados e sistemas e a deriva dos pedidos alteram o comportamento. Por isso a avaliação é contínua, com testes de regressão a cada mudança."
        },
        {
          "prompt": "No Mostrar, o resultado ficou perto do critério de sucesso e a causa da diferença está clara. Qual é a decisão mais adequada?",
          "options": [
            "Escalar imediatamente para toda a empresa.",
            "Ajustar, com mais um ciclo de prazo definido.",
            "Encerrar e esquecer o projeto.",
            "Esconder a diferença no relatório."
          ],
          "correctIndex": 1,
          "explanation": "Escalar quando o critério foi atingido e a operação está pronta; ajustar quando ficou perto e a causa é clara; encerrar quando ficou longe. E mostrar sempre, inclusive o que deu errado."
        }
      ]
    },
    {
      "id": "modulo-8",
      "title": "Escalar e liderar a transformação",
      "subtitle": "Competência: escalar agentes como portfólio e liderar pessoas na transformação",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "De um agente a um portfólio",
          "type": "video",
          "duration": "10min",
          "summary": "Os sintomas da proliferação de agentes (duplicados, custos espalhados, agentes órfãos), o inventário vivo, a gestão de portfólio com revisão trimestral (escalar, manter, ajustar ou aposentar) e o reaproveitamento de servidores MCP, bases de conhecimento e testes.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Modelo operacional para agentes",
          "type": "video",
          "duration": "11min",
          "summary": "Os modelos centralizado, federado e híbrido, o papel de um CoE de agentes como habilitador (plataforma, padrões, avaliação, segurança e capacitação) e os direitos de decisão ao longo do ciclo de vida: propor, aprovar, construir, operar e desligar.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Pessoas e papéis novos",
          "type": "video",
          "duration": "11min",
          "summary": "Os papéis que surgem com os agentes (dono do agente, supervisor, especialista em avaliação, engenheiro de agentes e o especialista do processo como treinador), as seis competências do caminho de Executor Experiente a Orientador de Sistemas e o novo papel do líder.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Indicadores de valor",
          "type": "video",
          "duration": "10min",
          "summary": "A árvore de valor que liga cada agente a eficiência, qualidade, receita, risco e experiência, os indicadores do portfólio (valor, custo, adoção, saúde e velocidade) e as métricas de vaidade a evitar, como número de agentes e de conversas.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Cultura de confiança",
          "type": "video",
          "duration": "10min",
          "summary": "Confiança calibrada (nem medo, nem confiança cega), segurança psicológica para reportar erros do agente, revisões de incidente sem culpados, comunidades de prática e uma política de uso de IA simples, que todos conheçam.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "O plano de 30, 60 e 90 dias e o papel do líder",
          "type": "video",
          "duration": "12min",
          "summary": "Consolida o percurso num plano de 30, 60 e 90 dias com entregas e critérios de passagem entre as fases, e fecha o programa com o papel do líder: patrocinar, perguntar, dar o exemplo, cuidar das pessoas e decidir com números.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: a cooperativa agroindustrial e os sete agentes",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma cooperativa agroindustrial tem sete agentes, três fornecedores e nenhum inventário. Você organiza o portfólio, propõe o modelo operacional e os papéis e define os indicadores de valor e o plano de 90 dias.",
          "content": "Uma cooperativa agroindustrial do Paraná (empresa fictícia), com milhares de cooperados e operações de grãos, ração, carnes e varejo agropecuário, criou sete agentes de IA em dois anos. Cada um nasceu de uma área diferente, com um de três fornecedores, e os custos estão espalhados em vários centros de custo.\n\nDois agentes funcionam bem e têm dono claro: o que responde dúvidas dos cooperados sobre romaneios e pagamentos e o que apoia a equipe de compras de insumos. Três são pouco usados: um assistente de vendas de ração, um agente de RH para dúvidas de benefícios e um agente de manutenção da fábrica de ração, que os operadores dizem \"não entender o nosso jeito de trabalhar\". Dois ninguém sabe quem mantém: foram criados por pessoas que mudaram de área.\n\nO conselho de administração pediu à diretoria uma visão consolidada: quanto os agentes custam, que valor geram, que riscos trazem e como a cooperativa deve se organizar para os próximos. Há pressão de algumas áreas para criar novos agentes rapidamente e preocupação da área de controles internos com dados de cooperados e com a falta de registros em alguns agentes.\n\nA diretoria quer apresentar ao conselho, em 90 dias, um portfólio organizado, um modelo operacional, os papéis necessários, os indicadores de valor e um plano para os próximos agentes, sem frear as áreas que estão aprendendo.\n\nPerguntas para discussão:\n\n1. Como você montaria o inventário e classificaria os sete agentes por valor e risco? Quais você escalaria, manteria, ajustaria ou aposentaria?\n\n2. Que modelo operacional (centralizado, federado ou híbrido) e que papéis você proporia, e quais seriam os direitos de decisão para novos agentes?\n\n3. Que indicadores de valor você levaria ao conselho e como seria o plano de 90 dias da diretoria?"
        },
        {
          "title": "Atividade prática: plano de 30/60/90 dias e caso de escala",
          "type": "pratica",
          "duration": "1h",
          "summary": "Consolide o plano de 30, 60 e 90 dias do seu agente (marcos, responsáveis, critérios de passagem entre fases) e o caso de escala: próximos processos candidatos pelo filtro de oportunidades, modelo operacional proposto, papéis, indicadores de valor e ações de cultura. Entregável: o plano e o caso de escala, que fecham o seu Plano de Agente.",
          "practiceTool": "Google Docs",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Qual é o principal remédio para a proliferação descontrolada de agentes numa empresa?",
          "options": [
            "Proibir que as áreas criem agentes.",
            "Um inventário vivo, com dono, finalidade, autonomia, risco, indicadores, custo e estágio de cada agente, revisado periodicamente.",
            "Contratar um único fornecedor para tudo.",
            "Aumentar o orçamento de tecnologia."
          ],
          "correctIndex": 1,
          "explanation": "O inventário vivo dá visibilidade e permite gerir os agentes como portfólio: escalar, manter, ajustar ou aposentar a cada revisão trimestral, e reaproveitar componentes entre agentes."
        },
        {
          "prompt": "Qual é o papel de um CoE (centro de excelência) de agentes num modelo híbrido?",
          "options": [
            "Ser dono de todos os agentes e operar cada um deles.",
            "Habilitar as áreas com plataforma, componentes comuns, padrões, avaliação, segurança e capacitação.",
            "Aprovar sozinho todas as decisões de negócio.",
            "Substituir o comitê de IA."
          ],
          "correctIndex": 1,
          "explanation": "No modelo híbrido, o CoE torna mais fácil e seguro que as áreas tenham seus agentes. Os donos dos agentes continuam sendo as áreas de negócio, que respondem pelos resultados."
        },
        {
          "prompt": "Qual destes é um indicador de valor adequado para o portfólio de agentes?",
          "options": [
            "Número de agentes ativos.",
            "Número de conversas no mês.",
            "Custo por tarefa concluída comparado à linha de base.",
            "Quantidade de fornecedores contratados."
          ],
          "correctIndex": 2,
          "explanation": "Indicadores de valor ligam os agentes a eficiência, qualidade, receita, risco e experiência, sempre contra a linha de base. Número de agentes e de conversas mede atividade, não valor."
        },
        {
          "prompt": "O que caracteriza a confiança calibrada em agentes?",
          "options": [
            "Confiar totalmente no agente depois do primeiro mês.",
            "Nunca usar o agente sem revisar cada resposta.",
            "Confiar na medida certa, com base em transparência, números e histórico, sem medo nem confiança cega.",
            "Deixar a decisão de confiar a cada colaborador, sem informações."
          ],
          "correctIndex": 2,
          "explanation": "Confiança calibrada evita os dois extremos: o medo, que impede o uso, e a confiança cega, que faz ninguém conferir. Ela cresce com transparência e resultados, e depende de segurança psicológica para reportar erros."
        },
        {
          "prompt": "No plano de 30, 60 e 90 dias, o que deve ser verdade para escalar o agente depois do piloto?",
          "options": [
            "O fornecedor recomendar a escala.",
            "Critério de sucesso atingido no piloto, operação com dono e manual e custo por tarefa dentro do previsto.",
            "Todos os colaboradores terem sido treinados em programação.",
            "O agente ter operado sem nenhum escalonamento para pessoas."
          ],
          "correctIndex": 1,
          "explanation": "Os critérios de passagem tornam a decisão objetiva. Se uma porta não abre, o plano se ajusta, e isso é sinal de que ele funciona. Escalonamento zero, aliás, seria motivo de desconfiança."
        }
      ]
    }
  ],
  "library": [
    {
      "title": "Checklist das 5 Peças",
      "description": "As dez perguntas para saber se uma solução é chatbot, automação ou agente, em versão para impressão e on-line no Kit do Agente.",
      "tool": "Kit do Agente",
      "url": null
    },
    {
      "title": "Diagnóstico de Prontidão",
      "description": "Sete perguntas organizadas pelos quatro M que classificam a empresa em Piloto Bonito, Quase Operação ou Pronto para Escalar.",
      "tool": "Kit do Agente",
      "url": null
    },
    {
      "title": "Roteiro dos 30 Dias (método 4M)",
      "description": "Mapear, Medir, Montar e Mostrar numa tarefa real, uma semana para cada M, com relatório no final.",
      "tool": "Kit do Agente",
      "url": null
    },
    {
      "title": "Ficha de Anatomia do Agente",
      "description": "Modelo de uma página para descrever objetivo, ferramentas, memória, autonomia e avaliação do agente candidato.",
      "tool": "Google Docs",
      "url": null
    },
    {
      "title": "Matriz valor × viabilidade × risco",
      "description": "Planilha para pontuar e priorizar processos candidatos a agentes, com caso de negócio e ROI estimado.",
      "tool": "Google Sheets",
      "url": null
    },
    {
      "title": "Template de plano de prova de conceito",
      "description": "Escopo, casos de teste com gabarito, métricas, critério de aprovação, prazo e papéis de uma PoC que decide.",
      "tool": "Google Docs",
      "url": null
    },
    {
      "title": "Planilha de custo por tarefa e TCO",
      "description": "Cálculo do custo por tarefa concluída e do custo total de propriedade em dois ou três anos.",
      "tool": "Google Sheets",
      "url": null
    },
    {
      "title": "Matriz de riscos e controles para agentes",
      "description": "Riscos por família, probabilidade e impacto, controles preventivos, detectivos e corretivos, permissões e registros.",
      "tool": "Google Sheets",
      "url": null
    },
    {
      "title": "Template do Plano de Agente",
      "description": "Estrutura do projeto aplicado: do processo atual ao plano de 30, 60 e 90 dias, integrando os oito entregáveis.",
      "tool": "Google Docs",
      "url": null
    }
  ],
  "nextSteps": [
    {
      "title": "Leve este programa para sua empresa",
      "description": "Turma fechada para a sua equipe de liderança, com casos adaptados ao seu setor e investimento sob proposta.",
      "href": "/giselle/programas-executivos?src=curso&c=agentes-ia-lideres&programa=agentes-ia-lideres#proposta",
      "label": "Solicitar proposta"
    },
    {
      "title": "Diagnóstico de maturidade em IA",
      "description": "Descubra em poucos minutos em que ponto sua empresa está e por onde começar com agentes de IA.",
      "href": "/diagnostico-ia?src=curso&c=agentes-ia-lideres",
      "label": "Fazer o diagnóstico"
    }
  ]
};
