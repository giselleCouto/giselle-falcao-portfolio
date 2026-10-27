import type { Course } from "./types";

// Programa corporativo (formato Executivo: eixos → competências → módulos).
// Programa completo e roteiros de gravação no Claude Docs: https://claude.ai/code/artifact/85dfe3e3-4497-421d-8fd5-a3fd5080b568
// Edite videoUrl / slidesUrl / practiceUrl conforme grava e publica os materiais.

export const solucoesDadosIaLideres: Course = {
  "slug": "solucoes-dados-ia-lideres",
  "title": "Do Problema à Solução: Dados, IA e Otimização para Líderes",
  "level": "Intermediário",
  "hours": "60h",
  "free": false,
  "publico": "empresas",
  "tagline": "Para cada problema de negócio, a solução certa: estatística, Machine Learning, otimização, simulação ou IA generativa, sem precisar programar.",
  "description": "Programa corporativo que ensina líderes a reconhecer o tipo de problema de negócio e escolher a família de solução baseada em dados e IA que resolve melhor, do BI e dos experimentos ao Machine Learning, à Pesquisa Operacional, às heurísticas, à simulação e à IA generativa. O participante aprende a estimar valor e risco, fazer as perguntas certas a times e fornecedores, combinar soluções e levá-las da prova de conceito à operação. Cada módulo gera uma peça do projeto aplicado: o Mapa Problema → Solução da empresa.",
  "outcomes": [
    "Traduzir dores de negócio em problemas bem formulados e classificá-los como descritivos, diagnósticos, preditivos, prescritivos ou generativos",
    "Usar indicadores, estatística e experimentos para medir o que importa e separar causalidade de correlação",
    "Reconhecer quando o Machine Learning é a solução certa, qual tipo de modelo se aplica e como avaliar se ele funciona pelo custo do erro",
    "Identificar problemas de otimização (alocação, roteirização, escalonamento, mix, filas) e o que um modelo de Pesquisa Operacional entrega",
    "Saber quando recorrer a heurísticas, meta-heurísticas e simulação porque o ótimo exato não cabe no tempo ou a incerteza domina",
    "Distinguir onde a IA generativa e os agentes geram valor e onde não servem, combinando-os com modelos clássicos",
    "Desenhar soluções híbridas, estimar retorno, decidir entre construir, comprar ou fazer parceria e planejar uma prova de conceito",
    "Levar soluções à operação com dados confiáveis, monitoramento, governança, gestão da mudança e indicadores de valor"
  ],
  "audience": "Diretores, gerentes, coordenadores e líderes de negócio, operações, logística, finanças, marketing, produto, tecnologia e inovação que decidem ou patrocinam projetos de dados e IA, negociam com fornecedores ou precisam priorizar onde investir.",
  "prerequisites": "Não é preciso saber programar. Basta familiaridade com planilhas e com os indicadores da própria área; nenhuma formação em estatística ou matemática é exigida.",
  "status": "disponivel",
  "conteudo": "em-producao",
  "modules": [
    {
      "id": "modulo-1",
      "title": "Problemas de negócio e famílias de solução",
      "subtitle": "Competência: formular problemas de negócio e reconhecer a família de solução adequada",
      "duration": "6h",
      "free": true,
      "lessons": [
        {
          "title": "Problema primeiro, tecnologia depois",
          "type": "video",
          "duration": "9min",
          "summary": "Por que tantos projetos de dados e IA começam pela ferramenta e terminam sem uso. A aula propõe a decisão de negócio como ponto de partida e a pergunta-guia do programa: se tivéssemos a resposta perfeita, o que faríamos diferente?",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "As cinco perguntas que os dados respondem",
          "type": "video",
          "duration": "10min",
          "summary": "Apresenta as perguntas descritiva, diagnóstica, preditiva, prescritiva e generativa, e a família de solução que costuma responder a cada uma. Mostra a confusão mais cara do mercado: tratar uma pergunta prescritiva como preditiva.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Como formular um problema de negócio",
          "type": "video",
          "duration": "10min",
          "summary": "Ensina a reescrever uma queixa como problema bem formulado, com sete elementos: decisão, dono, variável de interesse, restrições, horizonte e frequência, métrica de sucesso e linha de base. Inclui os erros de formulação mais comuns.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Regras, modelos que aprendem e otimização: três maneiras de decidir",
          "type": "video",
          "duration": "11min",
          "summary": "Compara as três maneiras de uma máquina decidir: regras de negócio, modelos que aprendem com dados (Machine Learning) e modelos de otimização (Pesquisa Operacional). Situa simulação e IA generativa como famílias complementares.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "A árvore de decisão das soluções",
          "type": "video",
          "duration": "11min",
          "summary": "Monta a árvore de decisão das soluções: perguntas em sequência que levam do problema ao painel, à regra, ao experimento, ao Machine Learning, à otimização, às heurísticas, à simulação ou à IA generativa. Mostra os sinais de que a resposta certa é a mais simples.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Valor, viabilidade e risco: priorizar antes de escolher a técnica",
          "type": "video",
          "duration": "12min",
          "summary": "A aula mais avançada do módulo: como priorizar dezenas de problemas por valor, viabilidade e risco, com uma conta de guardanapo do retorno sobre o investimento e uma matriz de priorização, antes de discutir tecnologia.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: a rede de moda e as três propostas",
          "type": "leitura",
          "duration": "30min",
          "summary": "Analise o caso da rede de moda com R$ 40 milhões em estoque parado e decida que família de solução atende cada decisão por trás do problema.",
          "content": "Uma rede de moda com 60 lojas no Nordeste fechou o ano com R$ 40 milhões em estoque parado, cerca de um terço a mais do que no ano anterior. A diretoria tratou o assunto como prioridade e, no mesmo mês, recebeu três propostas de fornecedores diferentes.\n\nA primeira proposta era um assistente de IA generativa para os vendedores, que sugeriria combinações de peças e argumentos de venda para escoar o estoque. A segunda era um painel de indicadores com giro por loja, por coleção e por categoria. A terceira era um modelo de previsão de vendas por produto e loja para as próximas coleções.\n\nAo conversar com as áreas, a equipe de planejamento percebeu que o \"problema do estoque parado\" escondia pelo menos três decisões diferentes. A compra de cada coleção, feita seis meses antes, com base na experiência das compradoras. A distribuição inicial das peças entre as 60 lojas, feita por uma regra fixa proporcional ao tamanho da loja. E a remarcação de preços no fim da coleção, decidida loja a loja pelos gerentes, sem critério comum.\n\nCada decisão tem dono, frequência e informação diferentes. A compra é rara, grande e cercada de incerteza sobre a moda da estação. A distribuição acontece a cada coleção e envolve milhares de combinações de produto, tamanho e loja, com restrições de espaço. A remarcação acontece toda semana no fim da coleção e afeta diretamente a margem.\n\nNenhuma das três propostas respondia diretamente às três decisões. O painel ajudaria a enxergar onde o estoque estava parado, mas não diria o que fazer. A previsão de vendas seria útil para a compra e para a distribuição, desde que alimentasse uma decisão. O assistente de IA generativa poderia ajudar na venda, mas não resolvia a causa do excesso.\n\nPerguntas para discussão: (1) Como você reescreveria cada uma das três decisões no formato decisão + métrica + restrições + linha de base? (2) Que família de solução, ou combinação, você indicaria para a compra, para a distribuição e para a remarcação? (3) Qual das três decisões você priorizaria primeiro, considerando valor, viabilidade e risco?"
        },
        {
          "title": "Atividade prática: Inventário de problemas classificados",
          "type": "pratica",
          "duration": "1h",
          "summary": "Liste de 8 a 10 problemas de negócio da sua área, reescreva cada um no formato decisão + métrica + restrições, classifique pelo tipo de pergunta e aplique a árvore de decisão das soluções para indicar a família provisória. Entregue a planilha do inventário.",
          "practiceTool": "Google Sheets",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Uma diretora diz: \"precisamos de um chatbot para o estoque\". Qual é a melhor primeira pergunta do líder?",
          "options": [
            "Qual fornecedor de chatbot é o mais barato?",
            "Qual decisão sobre o estoque queremos melhorar e quem a toma?",
            "Quantos dados temos disponíveis?",
            "Qual modelo de IA generativa é o mais moderno?"
          ],
          "correctIndex": 1,
          "explanation": "O programa parte da decisão: sem saber qual decisão melhora, não há como escolher a família de solução nem medir valor."
        },
        {
          "prompt": "\"Quanto produzir de cada item em cada fábrica nesta semana, respeitando capacidade e pedidos?\" é uma pergunta de que tipo?",
          "options": [
            "Descritiva",
            "Diagnóstica",
            "Preditiva",
            "Prescritiva"
          ],
          "correctIndex": 3,
          "explanation": "Perguntas sobre o que fazer, com muitas combinações e restrições, são prescritivas e costumam pedir otimização."
        },
        {
          "prompt": "Qual elemento de um problema bem formulado é o mais esquecido e impede medir o ganho depois?",
          "options": [
            "A linha de base",
            "O nome do projeto",
            "A tecnologia escolhida",
            "O fornecedor"
          ],
          "correctIndex": 0,
          "explanation": "Sem registrar como a decisão é tomada hoje e qual o resultado atual, qualquer ganho posterior vira impressão."
        },
        {
          "prompt": "Quando a regra de negócio simples costuma ser a melhor solução?",
          "options": [
            "Quando o problema tem milhões de combinações",
            "Quando o conhecimento é claro e estável e alguém da casa consegue escrevê-la em poucas linhas",
            "Quando há muitos dados históricos rotulados",
            "Nunca, regras estão ultrapassadas"
          ],
          "correctIndex": 1,
          "explanation": "Regras são transparentes, baratas e auditáveis; quando o conhecimento é claro, são uma solução legítima e muitas vezes a mais barata."
        },
        {
          "prompt": "Na matriz de priorização, por onde começar?",
          "options": [
            "Pelos problemas de maior visibilidade na mídia",
            "Pelos problemas de alto valor e alta viabilidade",
            "Pelos problemas de menor valor, para errar barato",
            "Pelos problemas que usam a tecnologia mais nova"
          ],
          "correctIndex": 1,
          "explanation": "Alto valor com alta viabilidade gera resultado mais cedo e constrói confiança; os de alto valor e baixa viabilidade vão para uma segunda onda."
        }
      ]
    },
    {
      "id": "modulo-2",
      "title": "Estatística, BI e experimentos",
      "subtitle": "Competência: medir, comparar e testar relações de causa e efeito para decidir com evidência",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Indicadores que contam a verdade (e os que enganam)",
          "type": "video",
          "duration": "9min",
          "summary": "Média, mediana e dispersão; taxas e denominadores; indicadores de resultado e de processo; e metas que distorcem o comportamento. Como desconfiar, com carinho, dos números que aparecem na tela.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "BI e painéis: do relatório à pergunta de negócio",
          "type": "video",
          "duration": "10min",
          "summary": "De onde vêm os números de um painel de BI (sistemas de gestão, de relacionamento com clientes, planilhas) e para que serve cada tipo de painel. Quando o painel resolve o problema e quando ele só mostra que o problema existe.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estatística para decidir: variação, amostra e acaso",
          "type": "video",
          "duration": "11min",
          "summary": "Variabilidade natural, gráfico de controle, amostra, intervalo de confiança, significância e regressão à média, tudo sem fórmulas. O objetivo é não confundir ruído com sinal nas decisões de gestão.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Correlação não é causalidade",
          "type": "video",
          "duration": "10min",
          "summary": "Fatores de confusão, causalidade reversa, viés de seleção e o paradoxo de Simpson, com exemplos de negócio. Termina com a pergunta-padrão do líder: o que mais poderia explicar essa relação?",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Testes A/B: o experimento como ferramenta de gestão",
          "type": "video",
          "duration": "11min",
          "summary": "Como desenhar um teste A/B com grupo de controle, sorteio, métrica principal, efeito mínimo, tamanho, duração e critério de decisão definidos antes. Inclui experimentos em lojas, regiões e equipes e os cuidados éticos.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Inferência causal quando não dá para experimentar",
          "type": "video",
          "duration": "12min",
          "summary": "A aula mais avançada do módulo: diferença em diferenças, controle sintético, descontinuidade de regressão e modelos de uplift, que estimam em quem a ação faz diferença. Para cada método, a premissa que o líder deve questionar.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: o programa de crônicos da operadora de saúde",
          "type": "leitura",
          "duration": "30min",
          "summary": "Investigue se a redução de 20% nas internações atribuída a um programa de acompanhamento é real e proponha um desenho de avaliação causal.",
          "content": "Uma operadora de planos de saúde do interior paulista, com cerca de 300 mil beneficiários, lançou um programa de acompanhamento de doentes crônicos. Enfermeiras passaram a ligar mensalmente para beneficiários com diabetes, hipertensão e doenças cardíacas, orientando sobre medicação, consultas e hábitos.\n\nA adesão era voluntária. Os beneficiários recebiam um convite por mensagem e entravam no programa se respondessem. Cerca de 8 mil aceitaram no primeiro ano, de um total de 30 mil elegíveis.\n\nDoze meses depois, a área de gestão de saúde apresentou ao conselho um resultado animador: os participantes tiveram 20% menos internações do que os elegíveis que não participaram. O conselho propôs ampliar o programa para todos os elegíveis, triplicando a equipe de enfermagem.\n\nAntes da decisão, a área de dados levantou algumas perguntas. Quem respondeu ao convite tendia a ser mais jovem, a morar em cidades maiores e a já ter consultas regulares. Além disso, beneficiários com internação recente tinham sido excluídos do convite por uma regra operacional. Por fim, a taxa de internação de toda a carteira tinha caído um pouco no mesmo período, por causa de uma mudança na rede credenciada.\n\nA operadora ainda tinha uma oportunidade: a expansão seria feita em etapas, por região, ao longo de um ano, porque não era possível contratar todas as enfermeiras de uma vez.\n\nPerguntas para discussão: (1) Quais vieses podem explicar parte da diferença de 20%? (2) Como a expansão em etapas por região poderia ser usada para medir o efeito real do programa? (3) Que indicadores e que critério de decisão você definiria antes de começar a próxima fase?"
        },
        {
          "title": "Atividade prática: Plano de medição e de experimento",
          "type": "pratica",
          "duration": "1h",
          "summary": "Escolha um problema do seu inventário, defina a linha de base e os indicadores de sucesso e desenhe um experimento (ou uma avaliação causal, se experimentar não for possível) com grupos, duração, tamanho aproximado e critério de decisão.",
          "practiceTool": "Google Docs",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Nove clientes compram R$ 100 e um compra R$ 10 mil. Qual medida representa melhor o cliente típico?",
          "options": [
            "A média",
            "A mediana",
            "O maior valor",
            "A soma"
          ],
          "correctIndex": 1,
          "explanation": "Valores extremos puxam a média; a mediana, o valor do meio, costuma representar melhor o caso típico."
        },
        {
          "prompt": "Uma central é cobrada só pelo tempo médio de atendimento e passa a encerrar chamadas antes de resolver. Isso ilustra:",
          "options": [
            "Regressão à média",
            "Uma meta que distorce o comportamento",
            "Paradoxo de Simpson",
            "Intervalo de confiança"
          ],
          "correctIndex": 1,
          "explanation": "Quando um indicador vira meta isolada, as pessoas aprendem a mexer no indicador, não necessariamente no resultado."
        },
        {
          "prompt": "As lojas com pior resultado num trimestre recebem uma intervenção e melhoram no seguinte. O que pode explicar parte da melhora sem a intervenção?",
          "options": [
            "Causalidade reversa",
            "Regressão à média",
            "Vazamento de dados",
            "Sazonalidade inexistente"
          ],
          "correctIndex": 1,
          "explanation": "Resultados extremos tendem a voltar para perto da média; por isso é preciso um grupo de comparação."
        },
        {
          "prompt": "Qual é o principal motivo para sortear quem recebe a ação num teste A/B?",
          "options": [
            "Economizar tempo",
            "Tornar os grupos parecidos em tudo, inclusive no que não medimos",
            "Garantir resultado positivo",
            "Reduzir o número de clientes envolvidos"
          ],
          "correctIndex": 1,
          "explanation": "A aleatorização equilibra os grupos e isola o efeito da mudança, resolvendo confusão e viés de seleção."
        },
        {
          "prompt": "Na diferença em diferenças, qual premissa o líder deve pedir para ver?",
          "options": [
            "Que os grupos tinham o mesmo tamanho",
            "Que, antes da ação, os dois grupos evoluíam em paralelo",
            "Que o efeito foi maior que 10%",
            "Que não houve sazonalidade"
          ],
          "correctIndex": 1,
          "explanation": "O método assume tendências paralelas antes da ação; mostrar as curvas anteriores é o teste básico."
        }
      ]
    },
    {
      "id": "modulo-3",
      "title": "Machine Learning para quem decide",
      "subtitle": "Competência: reconhecer e avaliar oportunidades de Machine Learning",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "O que significa uma máquina aprender",
          "type": "video",
          "duration": "9min",
          "summary": "O que é aprender com dados, a diferença entre regra programada e regra aprendida e os quatro pré-requisitos de um projeto de Machine Learning: histórico, rótulo, sinal e estabilidade.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Aprendizado supervisionado: classificar e estimar",
          "type": "video",
          "duration": "11min",
          "summary": "Classificação e regressão, as famílias de modelos em linguagem de negócio (regressões, árvores, conjuntos de árvores, redes neurais) e como uma previsão vira ação com ponto de corte e processo.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Aprendizado não supervisionado: segmentar e achar o estranho",
          "type": "video",
          "duration": "10min",
          "summary": "Segmentação de clientes e produtos e detecção de anomalias sem respostas prontas. Por que todo resultado não supervisionado precisa de interpretação de negócio e de uma ação associada.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Séries temporais e previsão de demanda",
          "type": "video",
          "duration": "11min",
          "summary": "Tendência, sazonalidade, eventos e ruído; previsão por item e loja e a hierarquia de previsões; e por que a previsão com faixa de incerteza é o que permite decidir estoque de segurança.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Recomendação, visão computacional e linguagem natural",
          "type": "video",
          "duration": "11min",
          "summary": "Sistemas de recomendação, visão computacional e processamento de linguagem natural: o que cada um resolve, o que exige de dados e onde gera valor em setores brasileiros.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Como avaliar um modelo: métricas, custo do erro e explicabilidade",
          "type": "video",
          "duration": "12min",
          "summary": "A aula mais avançada do módulo: matriz de confusão, precisão, revocação e erro percentual; o custo de cada tipo de erro; sobreajuste, vazamento de dados, viés e explicabilidade. Por que 96% de acurácia pode não valer nada.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: o modelo de 96% de acurácia da cooperativa de crédito",
          "type": "leitura",
          "duration": "30min",
          "summary": "Descubra por que um modelo de inadimplência com 96% de acurácia quase não identifica maus pagadores e traduza o desempenho em reais.",
          "content": "Uma cooperativa de crédito de Minas Gerais, com 120 mil associados, contratou um modelo para prever inadimplência na concessão de crédito pessoal. O objetivo era reduzir perdas sem travar o crédito para os bons pagadores, que são a maioria do quadro.\n\nO fornecedor entregou um relatório com uma métrica em destaque: 96% de acurácia no conjunto de teste. A diretoria comemorou e aprovou a implantação. Três meses depois, a inadimplência da carteira nova continuava praticamente igual.\n\nA equipe interna foi investigar. No histórico, apenas 4% dos associados atrasavam mais de 90 dias. O modelo, na prática, classificava quase todos os pedidos como \"bom pagador\". Acertava os 96% de bons pagadores e deixava passar a grande maioria dos maus. A acurácia era alta porque o evento era raro.\n\nAo pedir a matriz de confusão e outras métricas, a equipe descobriu ainda que o teste tinha sido feito com dados misturados de vários anos, e não com um período posterior ao do treino. Um dos campos usados pelo modelo, \"renegociação em andamento\", só era preenchido depois que o associado já estava em atraso.\n\nA cooperativa decidiu recomeçar a avaliação com o custo do erro na mesa: cada mau pagador aprovado custava, em média, o valor do empréstimo não recuperado; cada bom pagador recusado custava a margem perdida e o risco de o associado procurar outro banco.\n\nPerguntas para discussão: (1) Que métricas a cooperativa deveria ter pedido no lugar da acurácia? (2) Que problemas de avaliação o caso revela além do desbalanceamento? (3) Como você usaria os custos dos dois tipos de erro para escolher o ponto de corte do modelo?"
        },
        {
          "title": "Atividade prática: Ficha de oportunidade de Machine Learning",
          "type": "pratica",
          "duration": "1h",
          "summary": "Escolha um problema preditivo do seu inventário e preencha a ficha: decisão apoiada, o que se quer prever, dados e rótulo disponíveis, tipo de aprendizado, métrica técnica, custo de cada tipo de erro e como a previsão vira ação.",
          "practiceTool": "Google Docs",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Qual destes NÃO é um pré-requisito para um projeto de Machine Learning supervisionado?",
          "options": [
            "Histórico com exemplos",
            "Rótulo com a resposta conhecida",
            "Uma rede neural profunda",
            "Sinal nos dados disponíveis no momento da decisão"
          ],
          "correctIndex": 2,
          "explanation": "O tipo de modelo é escolhido depois; os pré-requisitos são histórico, rótulo, sinal e estabilidade."
        },
        {
          "prompt": "\"Quanto este cliente vai gastar nos próximos 12 meses?\" é um problema de:",
          "options": [
            "Classificação",
            "Regressão",
            "Segmentação",
            "Detecção de anomalias"
          ],
          "correctIndex": 1,
          "explanation": "Quando a resposta é um número, o problema supervisionado é de regressão."
        },
        {
          "prompt": "Por que a previsão com faixa de incerteza é importante para o estoque?",
          "options": [
            "Porque deixa o relatório mais bonito",
            "Porque permite dimensionar o estoque de segurança",
            "Porque elimina o erro da previsão",
            "Porque dispensa a otimização"
          ],
          "correctIndex": 1,
          "explanation": "A faixa mostra quanto a demanda pode variar; é ela que permite decidir quanto estoque de segurança manter."
        },
        {
          "prompt": "Um modelo de fraude tem 96% de acurácia, mas só 4% dos casos são fraude. O que isso pode significar?",
          "options": [
            "Que o modelo é excelente",
            "Que o modelo pode simplesmente dizer \"nunca é fraude\" e quase não detectar fraudes",
            "Que há sobreajuste garantido",
            "Que o modelo é explicável"
          ],
          "correctIndex": 1,
          "explanation": "Com classes desbalanceadas, a acurácia engana; é preciso olhar precisão, revocação e o custo de cada erro."
        },
        {
          "prompt": "Um modelo usa o campo \"motivo do cancelamento\" para prever cancelamento e tem resultado excelente. O problema é:",
          "options": [
            "Viés de seleção",
            "Vazamento de dados",
            "Deriva do conceito",
            "Falta de rótulo"
          ],
          "correctIndex": 1,
          "explanation": "A informação só existe depois do evento; o modelo não terá esse dado no momento da decisão."
        }
      ]
    },
    {
      "id": "modulo-4",
      "title": "Pesquisa Operacional e otimização",
      "subtitle": "Competência: reconhecer e formular problemas de otimização",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Quando a pergunta é \"qual a melhor decisão?\"",
          "type": "video",
          "duration": "9min",
          "summary": "Por que previsão não é decisão e como reconhecer problemas prescritivos. Os três elementos de qualquer modelo de otimização: variáveis de decisão, função objetivo e restrições.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Programação linear: o modelo que cabe numa planilha",
          "type": "video",
          "duration": "11min",
          "summary": "Programação linear e os problemas clássicos de mix, formulação, transporte e planejamento multiperíodo, que podem ser resolvidos no Solver da planilha. Inclui o preço-sombra: quanto vale relaxar uma restrição.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Programação inteira e mista: decisões de sim ou não",
          "type": "video",
          "duration": "11min",
          "summary": "Decisões de sim ou não (abrir um centro de distribuição, aprovar um projeto, ligar uma máquina) e a programação linear inteira mista. Por que esses problemas são mais difíceis e como os solvers lidam com isso.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Roteirização e logística",
          "type": "video",
          "duration": "10min",
          "summary": "O problema de roteirização de veículos e suas variações (capacidade, janelas de horário, jornada), os dados que um roteirizador exige e as perguntas certas para avaliá-lo com as rotas reais da empresa.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Escalonamento, alocação e filas",
          "type": "video",
          "duration": "11min",
          "summary": "Escalas de trabalho, sequenciamento de produção, alocação de recursos e teoria de filas. O ponto contraintuitivo: perto de 100% de ocupação, a espera não cresce aos poucos, ela explode.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Solvers, limites da otimização exata e decisões sob incerteza",
          "type": "video",
          "duration": "12min",
          "summary": "A aula mais avançada do módulo: o papel dos solvers e da modelagem, explosão combinatória e gap de otimalidade, fronteira entre objetivos conflitantes e otimização estocástica e robusta para decidir sob incerteza.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: rotas e um novo centro de distribuição",
          "type": "leitura",
          "duration": "30min",
          "summary": "Separe a decisão operacional diária de rotas da decisão estratégica de abrir um segundo centro de distribuição e descreva cada uma como modelo de otimização.",
          "content": "Uma distribuidora de alimentos do Triângulo Mineiro atende 1.200 clientes, entre supermercados, restaurantes e padarias, com uma frota própria de 40 caminhões de tamanhos diferentes. Todo fim de tarde, dois programadores montam as rotas do dia seguinte à mão, com base em planilhas e na experiência.\n\nOs custos de frete subiram nos últimos dois anos, e a taxa de entregas fora da janela combinada com os clientes chegou a 12%. Muitos supermercados só recebem entre 6 e 10 horas da manhã, e alguns restaurantes só depois das 14 horas. Há ainda regras de jornada dos motoristas e restrições de circulação de caminhões grandes no centro de algumas cidades.\n\nAo mesmo tempo, a diretoria discute abrir um segundo centro de distribuição para atender clientes que hoje ficam a mais de 300 quilômetros do armazém atual. Há três cidades candidatas, cada uma com custo de aluguel, impostos e mão de obra diferentes.\n\nNas reuniões, as duas discussões se misturam. Um diretor defende que um bom roteirizador resolveria o problema sem o novo centro. Outro defende que, sem o novo centro, nenhuma rota será eficiente para as regiões distantes.\n\nA empresa tem dados de dois anos de pedidos por cliente, endereços nem sempre corretos, tempos de descarga anotados apenas para os maiores clientes e custos de frete por quilômetro por tipo de caminhão.\n\nPerguntas para discussão: (1) Quais são as variáveis de decisão, o objetivo e as restrições de cada uma das duas decisões? (2) Que dados faltam ou precisam ser melhorados para cada modelo? (3) Como as duas decisões se relacionam e em que ordem você as trataria?"
        },
        {
          "title": "Atividade prática: Ficha de modelo de otimização",
          "type": "pratica",
          "duration": "1h",
          "summary": "Escolha um problema prescritivo do seu inventário e preencha a ficha: o que se decide, o que se quer maximizar ou minimizar, quais restrições não podem ser violadas, com que frequência a decisão é tomada e quais dados existem. Opcional: resolva uma versão pequena no Solver da planilha.",
          "practiceTool": "Google Sheets",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Quais são os três elementos de qualquer modelo de otimização?",
          "options": [
            "Dados, algoritmo e painel",
            "Variáveis de decisão, função objetivo e restrições",
            "Previsão, regra e simulação",
            "Hardware, software e pessoas"
          ],
          "correctIndex": 1,
          "explanation": "Todo modelo de otimização descreve o que se decide, o que se quer maximizar ou minimizar e o que não pode ser violado."
        },
        {
          "prompt": "O preço-sombra de uma restrição informa:",
          "options": [
            "O custo do solver",
            "Quanto o objetivo melhoraria se a restrição fosse afrouxada em uma unidade",
            "O preço de venda do produto",
            "O tempo de solução"
          ],
          "correctIndex": 1,
          "explanation": "É uma informação valiosa para decidir investimentos, como horas extras ou ampliação de capacidade."
        },
        {
          "prompt": "Decidir em quais cidades abrir centros de distribuição pede, em geral:",
          "options": [
            "Programação linear com variáveis fracionárias",
            "Programação inteira mista, com variáveis binárias de abrir ou não",
            "Regressão linear",
            "Um painel de BI"
          ],
          "correctIndex": 1,
          "explanation": "Decisões de sim ou não com custos fixos exigem variáveis binárias, típicas da programação inteira mista."
        },
        {
          "prompt": "Pela teoria de filas, o que acontece com a espera quando a ocupação se aproxima de 100%?",
          "options": [
            "Cresce aos poucos, de forma proporcional",
            "Fica estável",
            "Explode",
            "Diminui"
          ],
          "correctIndex": 2,
          "explanation": "Perto da ocupação total, pequenas variações geram filas enormes; por isso metas de ocupação muito altas são perigosas."
        },
        {
          "prompt": "Um solver informa \"gap de 1%\". Isso significa que:",
          "options": [
            "A solução tem 1% de chance de estar errada",
            "A solução encontrada está a no máximo 1% do melhor resultado possível",
            "O modelo usou 1% dos dados",
            "O tempo de solução foi de 1% do limite"
          ],
          "correctIndex": 1,
          "explanation": "O gap mede a distância máxima entre a solução encontrada e o limite teórico do ótimo."
        }
      ]
    },
    {
      "id": "modulo-5",
      "title": "Heurísticas, meta-heurísticas e simulação",
      "subtitle": "Competência: decidir sob complexidade e incerteza",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Quando o ótimo exato não cabe no tempo",
          "type": "video",
          "duration": "9min",
          "summary": "Abre o Eixo 2 com as situações em que uma solução boa e rápida vale mais do que a ótima: tamanho do problema, tempo de resposta e dados imprecisos. A comparação justa é com o que se faz hoje.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Heurísticas: regras gulosas e busca local",
          "type": "video",
          "duration": "10min",
          "summary": "Heurísticas gulosas (vizinho mais próximo, mais urgente primeiro) e busca local, que melhora a solução com pequenas mudanças. Termina com a armadilha do ótimo local.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Meta-heurísticas: genéticos, têmpera simulada, busca tabu e formigas",
          "type": "video",
          "duration": "12min",
          "summary": "Algoritmos genéticos, têmpera simulada, busca tabu e colônia de formigas explicados por analogias, com seus usos típicos e um roteiro para avaliar se uma meta-heurística está entregando boas soluções.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Simulação de Monte Carlo: decidir olhando a faixa de resultados",
          "type": "video",
          "duration": "10min",
          "summary": "Como a simulação de Monte Carlo transforma incertezas em uma faixa de resultados, mostra a chance de prejuízo e indica quais incertezas mais pesam. Pode ser feita em planilha, sem programar.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Simulação de eventos discretos: filas, gargalos e capacidade",
          "type": "video",
          "duration": "11min",
          "summary": "Entidades, recursos e regras: como a simulação de eventos discretos reproduz filas e gargalos de pátios, fábricas e hospitais para testar capacidade, regras e layout antes de investir.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Gêmeos digitais e otimização via simulação",
          "type": "video",
          "duration": "12min",
          "summary": "A aula mais avançada do módulo: o que é e o que não é um gêmeo digital, onde faz sentido e como a otimização via simulação combina uma meta-heurística com um simulador para escolher configurações.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: as filas do armazém de grãos na safra",
          "type": "leitura",
          "duration": "30min",
          "summary": "Compare agendamento de chegadas, mudança de turnos e uma nova obra para reduzir filas de caminhões na colheita, usando simulação.",
          "content": "Um armazém de grãos no sudoeste goiano recebe soja e milho de cerca de 400 produtores da região. Na colheita da soja, entre fevereiro e março, as filas de caminhões chegam a 14 horas nos dias de pico, com reclamações dos produtores e custo de frete parado.\n\nO caminho de cada caminhão tem quatro etapas: pesagem na entrada, coleta de amostra e classificação no laboratório, descarga na moega e pesagem na saída. Os caminhões chegam de forma muito irregular, concentrados no fim da tarde, quando termina a colheita do dia.\n\nA diretoria cogita construir uma segunda moega, um investimento relevante, com obra de vários meses. A equipe de operações levanta outras alternativas: agendar as chegadas por janelas de horário, com uma regra simples de prioridade; criar um segundo turno no laboratório de classificação; e combinar as duas medidas.\n\nHá também incerteza sobre o volume da próxima safra, que depende do clima e da área plantada pelos produtores. Um ano de safra cheia pode mudar completamente a necessidade de capacidade.\n\nA equipe montou uma simulação de eventos discretos com os tempos reais de cada etapa e uma simulação de Monte Carlo do volume de safra, com três cenários de clima.\n\nPerguntas para discussão: (1) Por que a simulação pode revelar um gargalo diferente do que a diretoria imagina? (2) Como você compararia as alternativas considerando a incerteza da safra, e não só o cenário médio? (3) Que heurística simples de agendamento você testaria primeiro e como mediria o resultado?"
        },
        {
          "title": "Atividade prática: Análise de cenários com simulação",
          "type": "pratica",
          "duration": "1h",
          "summary": "Escolha uma decisão do seu inventário cercada de incerteza e monte, em planilha, uma simulação de Monte Carlo com três variáveis incertas, comparando duas alternativas pela faixa de resultados e pela chance de prejuízo.",
          "practiceTool": "Google Sheets",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Qual destes NÃO é um bom motivo para abrir mão do ótimo exato?",
          "options": [
            "O problema é grande demais para o tempo disponível",
            "A decisão precisa sair em segundos",
            "Os dados de entrada têm erro maior que o ganho do ótimo",
            "O fornecedor não sabe usar um solver"
          ],
          "correctIndex": 3,
          "explanation": "Tamanho, tempo de resposta e imprecisão dos dados justificam heurísticas; limitação do fornecedor não."
        },
        {
          "prompt": "O que é um ótimo local?",
          "options": [
            "A melhor solução possível",
            "Uma solução em que nenhuma pequena mudança melhora, mas que pode estar longe da melhor",
            "Uma solução que só vale para uma região",
            "Uma solução encontrada por um solver exato"
          ],
          "correctIndex": 1,
          "explanation": "Buscas locais podem ficar presas em ótimos locais; meta-heurísticas são estratégias para escapar deles."
        },
        {
          "prompt": "Qual meta-heurística imita a evolução das espécies com seleção, cruzamento e mutação?",
          "options": [
            "Busca tabu",
            "Têmpera simulada",
            "Algoritmo genético",
            "Colônia de formigas"
          ],
          "correctIndex": 2,
          "explanation": "Algoritmos genéticos mantêm uma população de soluções que se combinam e sofrem mutações, guiadas pela qualidade."
        },
        {
          "prompt": "Qual é o principal produto de uma simulação de Monte Carlo?",
          "options": [
            "Um número exato do resultado",
            "Uma distribuição de resultados possíveis e suas chances",
            "Uma rota ótima",
            "Um modelo de classificação"
          ],
          "correctIndex": 1,
          "explanation": "Ao sortear as incertezas milhares de vezes, a simulação mostra a faixa de resultados e a chance de prejuízo."
        },
        {
          "prompt": "O que diferencia um gêmeo digital de um painel 3D?",
          "options": [
            "As cores",
            "Ser mantido atualizado com dados da operação e permitir simular \"e se?\"",
            "Usar inteligência artificial generativa",
            "Ser mais caro"
          ],
          "correctIndex": 1,
          "explanation": "Modelo, dados em tempo real e capacidade de simular decisões são os três ingredientes de um gêmeo digital."
        }
      ]
    },
    {
      "id": "modulo-6",
      "title": "IA generativa e agentes: onde servem e onde não servem",
      "subtitle": "Competência: aplicar IA generativa e agentes com critério",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "O que a IA generativa faz de verdade",
          "type": "video",
          "duration": "9min",
          "summary": "Como funciona um modelo de linguagem de grande porte: previsão da próxima palavra, conhecimento do treinamento, contexto, alucinação e variabilidade. Por que a resposta é plausível, mas nem sempre correta.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Onde ela brilha: texto, conhecimento e atendimento",
          "type": "video",
          "duration": "10min",
          "summary": "As tarefas em que a IA generativa gera valor consistente (redigir, resumir, extrair, classificar, apoiar atendimento, programar) e a técnica de geração aumentada por recuperação, que a conecta aos documentos da empresa.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Onde ela não serve: cálculo, otimização e exatidão",
          "type": "video",
          "duration": "11min",
          "summary": "Quatro sinais de que a IA generativa é a escolha errada: exatidão, muitas combinações com restrições, previsão numérica com histórico estruturado e decisões repetitivas de alto volume. O papel certo para ela: interface, não motor.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Agentes de IA: ferramentas, autonomia e supervisão",
          "type": "video",
          "duration": "11min",
          "summary": "O que diferencia um agente de um assistente de conversa, como os agentes se conectam a sistemas por interfaces de programação e pelo protocolo MCP, e como definir níveis de autonomia e supervisão.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Custos, riscos e regulação da IA generativa",
          "type": "video",
          "duration": "11min",
          "summary": "Custos que aparecem na escala, riscos (dados pessoais, confidencialidade, propriedade intelectual, viés, segurança) e o mapa regulatório: LGPD, PL 2338/2023, AI Act europeu e a norma ISO/IEC 42001.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "IA generativa combinada com modelos clássicos",
          "type": "video",
          "duration": "12min",
          "summary": "A aula mais avançada do módulo: três padrões de combinação com modelos clássicos (interface, extratora, explicadora), avaliação sistemática das respostas e o teste da retirada para checar se a IA generativa está no lugar certo.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: IA generativa em tudo na distribuidora de energia",
          "type": "leitura",
          "duration": "30min",
          "summary": "Decida onde a IA generativa serve, onde um modelo de otimização é a resposta e como as duas podem trabalhar juntas em três pedidos internos.",
          "content": "Uma distribuidora de energia do Centro-Oeste, com mais de 2 milhões de unidades consumidoras, definiu como meta do ano \"usar IA generativa em todas as áreas\". Em poucas semanas, o comitê de inovação recebeu três pedidos.\n\nO primeiro veio do atendimento: um assistente para ajudar os atendentes a responder reclamações de clientes, consultando as normas internas, as regras de faturamento e o histórico de cada cliente. O volume é alto e as normas mudam com frequência.\n\nO segundo veio das operações de campo: um agente de IA generativa que montasse a escala diária das 300 equipes de manutenção e ligação, distribuindo as ordens de serviço por região, prioridade, habilidade da equipe, prazos regulatórios e jornada de trabalho.\n\nO terceiro veio da engenharia: uma ferramenta que lesse os laudos técnicos escritos pelas equipes após cada inspeção, extraísse o tipo de defeito, o equipamento e a urgência, e alimentasse o sistema de manutenção, onde hoje esses dados são digitados à mão com muitos erros.\n\nO comitê precisa decidir quais pedidos aprovar, com qual desenho, e o que dizer às áreas cujos pedidos não forem aprovados no formato original.\n\nPerguntas para discussão: (1) Em qual dos três pedidos a IA generativa é a escolha certa e por quê? (2) Qual pedido deveria ser resolvido por um modelo de otimização, e qual papel a IA generativa poderia ter nele? (3) Que riscos e controles você exigiria no assistente de atendimento antes de usá-lo em escala?"
        },
        {
          "title": "Atividade prática: Mapa de usos de IA generativa",
          "type": "pratica",
          "duration": "1h",
          "summary": "Liste as propostas e ideias de IA generativa em circulação na sua área, classifique cada uma em serve, serve combinada ou não serve, justifique com os critérios do módulo e indique a alternativa quando não serve.",
          "practiceTool": "Miro",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Por que um modelo de linguagem pode inventar uma cláusula que não existe?",
          "options": [
            "Porque foi mal programado",
            "Porque gera a continuação mais plausível, não consulta uma verdade numa base",
            "Porque está sem internet",
            "Porque a pergunta foi longa"
          ],
          "correctIndex": 1,
          "explanation": "A alucinação é consequência da natureza estatística do modelo; por isso exatidão exige verificação."
        },
        {
          "prompt": "O que a geração aumentada por recuperação (RAG) faz?",
          "options": [
            "Treina um modelo novo do zero",
            "Busca trechos relevantes nos documentos da empresa e os entrega ao modelo junto com a pergunta",
            "Aumenta a velocidade do modelo",
            "Remove dados pessoais automaticamente"
          ],
          "correctIndex": 1,
          "explanation": "O RAG conecta o modelo ao conhecimento atualizado da empresa e permite citar a fonte da resposta."
        },
        {
          "prompt": "Montar a escala de 300 enfermeiros respeitando regras trabalhistas é tarefa principalmente para:",
          "options": [
            "IA generativa",
            "Um modelo de otimização",
            "Um painel de BI",
            "Detecção de anomalias"
          ],
          "correctIndex": 1,
          "explanation": "Muitas combinações com restrições duras pedem otimização; a IA generativa pode atuar como interface."
        },
        {
          "prompt": "Qual regra de supervisão de agentes de IA é a mais adequada?",
          "options": [
            "Autonomia total desde o primeiro dia",
            "Quanto mais irreversível e de maior impacto a ação, mais supervisão humana",
            "Nenhuma supervisão para economizar custos",
            "Supervisão só depois de problemas"
          ],
          "correctIndex": 1,
          "explanation": "A autonomia deve ser proporcional ao risco e à reversibilidade da ação, com registro e limites."
        },
        {
          "prompt": "No \"teste da retirada\", a IA generativa está no lugar certo quando:",
          "options": [
            "A solução para de funcionar sem ela",
            "A solução continua funcionando com uma tela no lugar da conversa, pois ela é interface",
            "Ela calcula todos os números",
            "Ela toma todas as decisões"
          ],
          "correctIndex": 1,
          "explanation": "Se a exatidão depende de um modelo clássico ou regra e a IA generativa cuida da linguagem, o desenho está saudável."
        }
      ]
    },
    {
      "id": "modulo-7",
      "title": "Escolher e combinar: soluções híbridas, ROI e prova de conceito",
      "subtitle": "Competência: combinar soluções e decidir o investimento",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Prever e depois otimizar: a solução híbrida mais comum",
          "type": "video",
          "duration": "10min",
          "summary": "A combinação mais comum e valiosa: prever e depois otimizar, com exemplos de varejo, indústria, serviços e energia. Por que a incerteza precisa atravessar a cadeia e por que o ganho se mede no resultado final.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Padrões de combinação nos setores brasileiros",
          "type": "video",
          "duration": "11min",
          "summary": "Cinco padrões híbridos (prever e otimizar, detectar e priorizar, simular e otimizar, extrair e decidir, experimentar e escalar) aplicados a agro, logística, varejo, indústria, saúde, serviços financeiros e energia.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Quanto vale: linha de base, ROI e custo total",
          "type": "video",
          "duration": "11min",
          "summary": "Como montar um caso de valor que resiste à diretoria financeira: ganho incremental sobre a linha de base, custo total de propriedade, retorno sobre o investimento, payback e análise de sensibilidade.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Construir, comprar ou fazer parceria",
          "type": "video",
          "duration": "10min",
          "summary": "Comprar, construir ou fazer parceria: as cinco perguntas que decidem (diferenciação, dados proprietários, competência interna, tempo e dependência) e as armadilhas de cada caminho.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Fornecedores: as perguntas certas e a demonstração com seus dados",
          "type": "video",
          "duration": "11min",
          "summary": "Um pedido de proposta que começa pelo problema, sete perguntas que separam proposta de apresentação e a demonstração obrigatória com os dados da própria empresa, em um período que o fornecedor não viu.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Prova de conceito bem desenhada",
          "type": "video",
          "duration": "12min",
          "summary": "A aula mais avançada do módulo: os sete elementos de uma prova de conceito que responde à pergunta certa, a diferença para o produto mínimo viável e as armadilhas que fazem a prova de conceito virar eterna.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: vencidos e rupturas na indústria de laticínios",
          "type": "leitura",
          "duration": "30min",
          "summary": "Desenhe uma solução híbrida de previsão e otimização, estime o valor com linha de base e decida entre comprar, construir ou combinar.",
          "content": "Uma indústria de laticínios do sul de Minas produz iogurtes, bebidas lácteas e queijos frescos, com validade entre 20 e 45 dias, e vende para cerca de 2 mil supermercados. A empresa perde cerca de 3% do faturamento com produtos vencidos devolvidos pelo varejo e, ao mesmo tempo, recebe reclamações frequentes de ruptura nas gôndolas.\n\nHoje, o planejamento da produção é feito semanalmente numa planilha, a partir da média de vendas das últimas quatro semanas, ajustada pela experiência do gerente de planejamento. As promoções dos supermercados nem sempre são informadas a tempo, e a captação de leite varia com a estação.\n\nDuas propostas chegaram. A primeira é um software de mercado de planejamento de demanda, vendido como assinatura, com implantação rápida e boa reputação no setor de bens de consumo. A segunda é um projeto sob medida com um grupo de pesquisa de uma universidade da região, que propõe prever a demanda e otimizar a produção e a distribuição considerando validade, captação de leite e capacidade das linhas.\n\nA diretoria financeira pede um caso de valor antes de qualquer decisão: quanto se ganha, quanto custa no total e em quanto tempo o investimento se paga, considerando que nem todas as recomendações serão seguidas no início.\n\nA empresa tem três anos de vendas por produto e cliente, dados de produção e de captação de leite e um calendário de promoções incompleto.\n\nPerguntas para discussão: (1) Como você desenharia a solução híbrida de previsão e otimização para esse caso? (2) Que linha de base, premissas e cenários você usaria no caso de valor? (3) Comprar, construir em parceria ou combinar: qual a sua recomendação e por quê?"
        },
        {
          "title": "Atividade prática: Portfólio priorizado com valor e decisão de contratação",
          "type": "pratica",
          "duration": "1h",
          "summary": "Consolide os problemas trabalhados até aqui em um portfólio priorizado: para cada um, a família ou combinação de soluções, o valor estimado com premissas explícitas, o risco principal e a decisão preliminar de construir, comprar ou fazer parceria.",
          "practiceTool": "Google Sheets",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Qual é o erro mais comum ao ligar uma previsão a um otimizador?",
          "options": [
            "Usar dados demais",
            "Passar só o número previsto, ignorando a incerteza",
            "Usar um solver comercial",
            "Revisar o modelo"
          ],
          "correctIndex": 1,
          "explanation": "A faixa de incerteza precisa atravessar a cadeia; é ela que define estoques de segurança e decisões robustas."
        },
        {
          "prompt": "O que é o custo total de propriedade (TCO)?",
          "options": [
            "O preço da licença",
            "Tudo o que a solução custa durante a vida útil: implantação, dados, pessoas, infraestrutura, manutenção",
            "O custo do primeiro mês",
            "O salário da equipe de TI"
          ],
          "correctIndex": 1,
          "explanation": "O preço da compra é só a ponta do iceberg; o custo total inclui operação e manutenção."
        },
        {
          "prompt": "Quando tende a fazer mais sentido comprar uma solução pronta?",
          "options": [
            "Quando o problema é o coração da diferenciação da empresa",
            "Quando o problema é padronizado e o mercado já o resolve bem",
            "Quando a empresa tem dados exclusivos que definem o valor",
            "Nunca"
          ],
          "correctIndex": 1,
          "explanation": "Para problemas padronizados, comprar é mais rápido e barato; o que diferencia a empresa tende a pedir construção ou parceria."
        },
        {
          "prompt": "Qual pedido a um fornecedor mais revela a qualidade real da solução?",
          "options": [
            "Uma apresentação com casos de sucesso",
            "Uma demonstração com os dados da própria empresa, em período que ele não viu",
            "O número de clientes que ele tem",
            "O prêmio que recebeu"
          ],
          "correctIndex": 1,
          "explanation": "Resultados nos seus dados, comparados à linha de base, separam a boa proposta da boa apresentação."
        },
        {
          "prompt": "Qual destes NÃO é elemento de uma prova de conceito bem desenhada?",
          "options": [
            "Critério de sucesso definido antes",
            "Prazo",
            "Decisão prevista ao final",
            "Escopo sem limite para aproveitar o entusiasmo"
          ],
          "correctIndex": 3,
          "explanation": "PoC precisa de escopo representativo e limitado, prazo e decisão; escopo aberto vira prova de conceito eterna."
        }
      ]
    },
    {
      "id": "modulo-8",
      "title": "Da prova de conceito à operação",
      "subtitle": "Competência: levar soluções à operação e medir o valor gerado",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Por que tantas provas de conceito não chegam à operação",
          "type": "video",
          "duration": "9min",
          "summary": "O intervalo perigoso entre o \"funcionou no teste\" e o \"está funcionando na empresa\" e as cinco causas mais comuns de provas de conceito que não chegam à operação.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Dados para produção: fluxos, qualidade e contratos de dados",
          "type": "video",
          "duration": "10min",
          "summary": "Fluxos automáticos de dados (extrair, transformar e carregar), verificações contínuas de qualidade e contratos de dados entre a área que produz e a que consome.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Modelos envelhecem: MLOps e monitoramento",
          "type": "video",
          "duration": "11min",
          "summary": "Por que modelos envelhecem (deriva dos dados e do conceito) e as práticas de MLOps: versionamento, monitoramento, retreino e contingência. Como cuidar também de otimizadores e de aplicações de IA generativa em uso.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Governança: quem responde pela decisão do algoritmo",
          "type": "video",
          "duration": "11min",
          "summary": "Quem responde pela decisão do algoritmo: papéis nomeados, revisão humana proporcional ao risco, explicabilidade, registro de decisões e verificação de viés, conectados à LGPD e à regulação de IA.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Gestão da mudança: pessoas que confiam na recomendação",
          "type": "video",
          "duration": "11min",
          "summary": "Por que as pessoas não seguem a recomendação e os remédios que funcionam: desenhar junto, explicar, permitir ajuste com registro, medir a taxa de aceitação e implantar em etapas, começando em modo sombra.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Indicadores de valor e o portfólio vivo de soluções",
          "type": "video",
          "duration": "12min",
          "summary": "A aula final do programa: valor realizado versus prometido, ligação com objetivos e resultados-chave e o portfólio vivo de soluções, com as decisões de ampliar, ajustar, desligar e alimentar o ciclo com novos problemas.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: a manutenção preditiva que ninguém usa",
          "type": "leitura",
          "duration": "30min",
          "summary": "Diagnostique por que uma prova de conceito bem-sucedida de manutenção preditiva e sequenciamento deixou de ser usada e desenhe o plano de passagem à operação.",
          "content": "Uma fabricante de autopeças do ABC paulista fornece componentes de suspensão para montadoras, com contratos que exigem entregas pontuais e multas por atraso. Paradas não programadas das prensas e dos centros de usinagem eram a principal causa de atrasos.\n\nHá um ano e meio, a empresa fez duas provas de conceito com bons resultados. Um modelo de manutenção preditiva, usando dados de vibração e temperatura das máquinas, acertou bem as falhas num teste de três meses. Um modelo de otimização do sequenciamento da produção reduziu, em simulação, as trocas de ferramenta e os atrasos.\n\nSeis meses depois da implantação, a situação era outra. Os técnicos de manutenção ignoravam os alertas, que chegavam por e-mail a um engenheiro que havia saído da empresa. Os sensores de duas linhas tinham parado de enviar dados após uma troca de rede, e ninguém percebeu. Os supervisores de produção refaziam a sequência à mão, porque o modelo não considerava duas restrições que só eles conheciam.\n\nNenhum dos dois projetos tinha um dono no negócio, um painel de acompanhamento do valor ou uma rotina de revisão. O fornecedor do modelo de manutenção tinha encerrado o contrato após a entrega.\n\nA nova diretoria industrial quer retomar as duas soluções, mas pede um plano que não repita os erros.\n\nPerguntas para discussão: (1) Quais causas de falha na passagem à operação aparecem no caso? (2) Que papéis, rotinas de monitoramento e governança você definiria para cada solução? (3) Como você conduziria a gestão da mudança com técnicos e supervisores na segunda tentativa?"
        },
        {
          "title": "Atividade prática: Plano de prova de conceito e de operação",
          "type": "pratica",
          "duration": "1h",
          "summary": "Escolha o problema número 1 do seu portfólio e escreva o plano: pergunta e critério de sucesso, dados e responsáveis, integração ao processo, monitoramento, governança, plano de adoção e indicadores de valor.",
          "practiceTool": "Google Docs",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Qual destas é uma causa comum de PoC bem-sucedida que não chega à operação?",
          "options": [
            "Solver muito rápido",
            "Falta de dono no negócio e de integração ao processo",
            "Excesso de documentação",
            "Uso de dados reais"
          ],
          "correctIndex": 1,
          "explanation": "Sem dono e sem integração ao fluxo de trabalho, a recomendação não chega a quem decide."
        },
        {
          "prompt": "O que é um contrato de dados?",
          "options": [
            "Um contrato de compra de dados de terceiros",
            "Um acordo entre quem produz e quem consome o dado sobre formato, significado, frequência e qualidade",
            "Um termo de consentimento do cliente",
            "Uma licença de software"
          ],
          "correctIndex": 1,
          "explanation": "Contratos de dados evitam que mudanças silenciosas num sistema quebrem modelos que dependem dele."
        },
        {
          "prompt": "\"O que antes indicava risco deixou de indicar depois de uma mudança econômica.\" Isso é:",
          "options": [
            "Deriva do conceito",
            "Vazamento de dados",
            "Sobreajuste",
            "Paradoxo de Simpson"
          ],
          "correctIndex": 0,
          "explanation": "A relação entre os sinais e o resultado mudou; é preciso monitorar e retreinar."
        },
        {
          "prompt": "Para decisões de alto impacto sobre pessoas, a governança recomenda:",
          "options": [
            "Automação total sem registro",
            "Recomendação do modelo com decisão humana, explicação e registro",
            "Desligar qualquer modelo",
            "Decisão por sorteio"
          ],
          "correctIndex": 1,
          "explanation": "A revisão humana deve ser proporcional ao risco; a LGPD já prevê o direito de revisão de decisões automatizadas."
        },
        {
          "prompt": "Qual indicador mostra se as pessoas confiam e usam a solução?",
          "options": [
            "Gap de otimalidade",
            "Taxa de aceitação das recomendações",
            "Tamanho do modelo",
            "Número de linhas de código"
          ],
          "correctIndex": 1,
          "explanation": "Medir quantas recomendações são seguidas, ajustadas ou rejeitadas mostra a adoção e aponta melhorias."
        }
      ]
    }
  ],
  "library": [
    {
      "title": "Ficha de formulação de problema",
      "description": "Modelo de uma página com os sete elementos de um problema bem formulado: decisão, dono, variável de interesse, restrições, horizonte e frequência, métrica e linha de base.",
      "tool": "Google Docs",
      "url": null
    },
    {
      "title": "Árvore de decisão das soluções",
      "description": "Pôster com as perguntas em sequência que levam do problema à família de solução: painel, regra, experimento, Machine Learning, otimização, heurística, simulação ou IA generativa.",
      "tool": "PDF",
      "url": null
    },
    {
      "title": "Planilha de priorização valor × viabilidade × risco",
      "description": "Matriz para posicionar e comparar problemas, com conta de guardanapo do valor e checklist de viabilidade.",
      "tool": "Google Sheets",
      "url": null
    },
    {
      "title": "Calculadora de tamanho de amostra para testes A/B",
      "description": "Planilha que estima quantos clientes, lojas ou dias um teste precisa para detectar o efeito mínimo que vale a pena.",
      "tool": "Google Sheets",
      "url": null
    },
    {
      "title": "Simulador de matriz de confusão e custo do erro",
      "description": "Planilha para escolher o ponto de corte de um modelo de classificação a partir do custo de cada tipo de erro.",
      "tool": "Google Sheets",
      "url": null
    },
    {
      "title": "Modelos de otimização prontos no Solver",
      "description": "Três modelos editáveis de mix de produção, alocação e transporte para explorar sem programar.",
      "tool": "Google Sheets",
      "url": null
    },
    {
      "title": "Planilha-modelo de simulação de Monte Carlo",
      "description": "Modelo para comparar alternativas pela faixa de resultados e pela chance de prejuízo, com três variáveis incertas.",
      "tool": "Google Sheets",
      "url": null
    },
    {
      "title": "Matriz serve, serve combinada, não serve",
      "description": "Ferramenta de triagem de ideias de IA generativa e agentes, com os critérios do Módulo 6 e alternativas por tipo de problema.",
      "tool": "Miro",
      "url": null
    },
    {
      "title": "Cartão de perguntas para fornecedores",
      "description": "As perguntas que separam proposta de apresentação, por família de solução, e o roteiro da demonstração com os dados da empresa.",
      "tool": "PDF",
      "url": null
    },
    {
      "title": "Modelo de pedido de proposta e termo de prova de conceito",
      "description": "Modelos de RFP orientado ao problema e de prova de conceito de uma página com critério de sucesso e decisão prevista.",
      "tool": "Google Docs",
      "url": null
    },
    {
      "title": "Checklist de prontidão para operação",
      "description": "Lista de verificação de dados, monitoramento, governança, adoção e indicadores de valor antes de levar uma solução à operação.",
      "tool": "Google Docs",
      "url": null
    }
  ],
  "nextSteps": [
    {
      "title": "Leve este programa para sua empresa",
      "description": "Turma fechada, com casos e exercícios adaptados ao seu setor; investimento sob proposta.",
      "href": "/giselle/palestras?src=curso&c=solucoes-dados-ia-lideres#proposta",
      "label": "Solicitar proposta"
    },
    {
      "title": "Diagnóstico de maturidade em IA",
      "description": "Descubra em poucos minutos em que estágio sua empresa está para escolher e operar soluções de dados e IA.",
      "href": "/diagnostico-ia?src=curso&c=solucoes-dados-ia-lideres",
      "label": "Fazer o diagnóstico"
    }
  ]
};
