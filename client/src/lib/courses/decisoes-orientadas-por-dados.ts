import type { Course } from "./types";

// Programa corporativo (formato Executivo: eixos → competências → módulos).
// Programa completo e roteiros de gravação no Claude Docs: https://claude.ai/code/artifact/3440b278-223e-4648-8cff-be7c28da4a84
// Edite videoUrl / slidesUrl / practiceUrl conforme grava e publica os materiais.

export const decisoesOrientadasPorDados: Course = {
  "slug": "decisoes-orientadas-por-dados",
  "title": "Decisões Orientadas por Dados: Indicadores, Evidências e Experimentos para Gestores",
  "level": "Intermediário",
  "hours": "60h",
  "free": false,
  "publico": "empresas",
  "tagline": "Para gestores que querem decidir com evidências: indicadores, estatística, experimentos e cenários, sem programar e com casos brasileiros.",
  "description": "Programa corporativo de 60 horas para líderes que decidem com números todos os dias. Em dois eixos, Ler e medir e Decidir com evidências, o participante aprende a formular perguntas de negócio, escolher indicadores, interpretar estatística, desenhar painéis, separar causa de coincidência, experimentar e planejar cenários, usando apenas Google Sheets e Looker Studio. Cada módulo gera uma peça do projeto aplicado Decisão documentada, construído sobre um problema real da área do participante.",
  "outcomes": [
    "Transformar intuições em perguntas de negócio respondíveis e dosar o nível de evidência pelo custo do erro e pela reversibilidade da decisão",
    "Construir árvores de indicadores com KPIs, OKRs, métricas de entrada e de saída, metas com linha de base e indicadores contrapeso",
    "Interpretar média, mediana, variabilidade, margem de erro, intervalo de confiança e significância estatística sem precisar programar",
    "Desenhar painéis de uma página no Looker Studio, escolher gráficos honestos e conduzir narrativas e ritos de gestão que levam a decisões",
    "Separar correlação de causa, identificando confundidores, paradoxo de Simpson, vieses de seleção e os próprios vieses cognitivos",
    "Desenhar, dimensionar e ler testes A/B e quase-experimentos, como diferença-em-diferenças, com cuidado ético e respeito à LGPD",
    "Planejar sob incerteza com previsões em planilha, faixas de erro, cenários com gatilhos e critérios claros para acionar aprendizado de máquina",
    "Instituir ritos, registro e revisão de decisões e definir o papel humano e as regras nas decisões apoiadas por IA"
  ],
  "audience": "Gestores, coordenadores, supervisores e líderes de áreas como comercial, marketing, operações, finanças, pessoas, atendimento e produto, além de analistas que preparam informações para a tomada de decisão.",
  "prerequisites": "Familiaridade com planilhas. Não é preciso saber programar nem ter formação em estatística; basta uma conta Google gratuita para usar Google Sheets e Looker Studio.",
  "status": "disponivel",
  "conteudo": "em-producao",
  "modules": [
    {
      "id": "modulo-1",
      "title": "Da intuição à evidência",
      "subtitle": "Competência: formular perguntas de negócio e escolher o tipo de análise adequado a cada decisão",
      "duration": "6h",
      "free": true,
      "lessons": [
        {
          "title": "Da intuição à evidência: o custo de decidir no escuro",
          "type": "video",
          "duration": "9min",
          "summary": "Aula de abertura com Giselle Falcão: intuição é experiência comprimida, ótima fonte de hipóteses e péssima fonte de conclusões. Apresenta o custo de decidir pela opinião de quem ganha mais (HiPPO) e por que a IA amplia tanto os acertos quanto os erros de lógica.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "O ciclo de decisão: da pergunta à revisão",
          "type": "video",
          "duration": "10min",
          "summary": "As seis etapas de uma boa decisão (pergunta, dados, análise, decisão, ação e revisão), a relação com o PDCA e as etapas que as equipes mais pulam: a pergunta, a decisão explícita e a revisão.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Perguntas de negócio que os dados conseguem responder",
          "type": "video",
          "duration": "10min",
          "summary": "Como transformar um desejo vago em uma pergunta respondível com quatro elementos: decisão associada, métrica, recorte e prazo. Inclui a frase-teste \"Se descobrirmos que ___, vamos ___\" e os limites do que os dados sozinhos respondem.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Os quatro tipos de análise: descritiva, diagnóstica, preditiva e prescritiva",
          "type": "video",
          "duration": "11min",
          "summary": "A escada da análise com a analogia da consulta médica: o que aconteceu, por que aconteceu, o que deve acontecer e o que fazer. Explica onde entram BI (inteligência de negócios) e ML (aprendizado de máquina), com o caso de uma rede de óticas.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "A matéria-prima: dados disponíveis, confiáveis e suficientes",
          "type": "video",
          "duration": "11min",
          "summary": "De onde vêm os dados (ERP, CRM, planilhas, pesquisas e dados públicos) e o checklist de confiança em quatro perguntas: origem, definição, atualidade e completude. O que fazer quando o dado não existe: coletar, aproximar ou experimentar.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Quanto de evidência cada decisão merece",
          "type": "video",
          "duration": "12min",
          "summary": "Portas de mão única e de mão dupla, custo do erro e valor da informação (inclusive o ROI da própria análise). Fecha o módulo com a matriz evidência × risco, que entra na Ficha da decisão do projeto aplicado.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: o delivery próprio da rede de supermercados",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma rede de 22 supermercados no interior paulista discute lançar entrega própria porque os concorrentes já têm. Os participantes reescrevem a discussão em perguntas, classificam as análises e decidem o nível de evidência.",
          "content": "Uma rede de supermercados com 22 lojas no interior de São Paulo atende principalmente famílias de classe média em cidades de 80 a 300 mil habitantes. Nos últimos dois anos, três concorrentes regionais lançaram serviços de entrega próprios, e o tema passou a ocupar todas as reuniões de diretoria.\n\nO diretor comercial defende lançar o serviço em todas as lojas até o fim do semestre. Seu argumento é que todos os concorrentes já têm e que a rede vai perder clientes jovens. Ele traz uma pesquisa feita com 150 clientes na saída de duas lojas, em que 64% disseram que usariam o serviço.\n\nO diretor financeiro é contra. Ele estima que cada entrega custaria entre 14 e 22 reais, contra um lucro médio por compra de cerca de 18 reais, e lembra que a rede já investiu em um aplicativo de ofertas que pouca gente usa. Ele traz o número de downloads do aplicativo como prova de que os clientes não querem soluções digitais.\n\nA diretora de operações tem outra preocupação: as lojas menores não têm espaço para separar pedidos sem atrapalhar o atendimento no salão. Ela não tem números, mas conhece bem a rotina das lojas e acha que um piloto mostraria problemas que nenhuma planilha mostra.\n\nO presidente pediu uma recomendação para a próxima reunião. Ele quer saber o que a rede realmente precisa descobrir, quais dados já existem, quais faltam e se a decisão precisa ser tomada de uma vez ou pode começar pequena.\n\nPerguntas para discussão:\n\n1. Reescreva a discussão em três perguntas de negócio respondíveis, cada uma com decisão associada, métrica, recorte e prazo. Que tipo de análise cada pergunta exige?\n\n2. Aplique o checklist de confiança à pesquisa de saída de loja e ao número de downloads do aplicativo. Que limitações você declararia?\n\n3. A decisão é uma porta de mão única ou de mão dupla? Que desenho de piloto em três lojas você proporia, e o que mediria?"
        },
        {
          "title": "Atividade prática: Ficha da decisão",
          "type": "pratica",
          "duration": "1h",
          "summary": "No modelo em Google Sheets, preencha a Ficha da decisão de um problema real da sua área: intuição inicial, pergunta de negócio, decisão associada, tipo de análise, dados disponíveis com nota de confiança, classificação da decisão (reversível ou não) e nível de evidência exigido. Entrega: a ficha preenchida, primeiro entregável do projeto aplicado.",
          "practiceTool": "Google Sheets",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Qual destas é uma pergunta de negócio respondível?",
          "options": [
            "Quero entender melhor as vendas da empresa.",
            "Nossos clientes estão satisfeitos?",
            "Entre os clientes que compraram pela primeira vez em 2025, qual canal teve maior recompra em 90 dias? Precisamos decidir até março onde investir a verba de aquisição.",
            "Como a inteligência artificial pode nos ajudar?"
          ],
          "correctIndex": 2,
          "explanation": "A pergunta respondível tem decisão associada, métrica, recorte e prazo (aula 1.3). As outras são desejos ou temas, não perguntas que uma análise consiga responder."
        },
        {
          "prompt": "A pergunta é: por que as vendas caíram em duas lojas no último trimestre? Que tipo de análise ela pede?",
          "options": [
            "Descritiva.",
            "Diagnóstica.",
            "Preditiva.",
            "Prescritiva."
          ],
          "correctIndex": 1,
          "explanation": "Perguntas sobre por que algo aconteceu pedem análise diagnóstica, que abre o número em partes para achar a origem (aula 1.4). A descritiva apenas mostra que caíram."
        },
        {
          "prompt": "Qual das perguntas abaixo NÃO faz parte do checklist de confiança de dados visto no módulo?",
          "options": [
            "De onde veio esse número?",
            "O que exatamente está sendo contado?",
            "O número confirma o que a diretoria esperava?",
            "Falta alguma parte, como lojas que não enviaram dados?"
          ],
          "correctIndex": 2,
          "explanation": "O checklist cobre origem, definição, atualidade e completude (aula 1.5). Confirmar a expectativa da diretoria não é critério de qualidade; é um convite ao viés de confirmação."
        },
        {
          "prompt": "Uma empresa vai assinar um contrato de aluguel de dez anos para uma nova unidade. Segundo a matriz evidência × risco, o que é mais adequado?",
          "options": [
            "Decidir rápido e ajustar depois, porque toda decisão é reversível.",
            "Usar apenas um checklist simples, para não atrasar.",
            "Análise profunda, cenários, opinião independente e revisão programada.",
            "Esperar até ter certeza absoluta sobre a demanda."
          ],
          "correctIndex": 2,
          "explanation": "É uma porta de mão única com alto custo do erro: pede o nível máximo de evidência (aula 1.6). Certeza absoluta nunca chega; por isso a evidência é proporcional, não infinita."
        },
        {
          "prompt": "Antes de encomendar uma nova análise, qual é a pergunta que mais ajuda a saber se ela vale a pena?",
          "options": [
            "Quantos gráficos a análise vai ter?",
            "O que eu faria de diferente se soubesse a resposta?",
            "Qual ferramenta de BI será usada?",
            "Quem é o analista mais experiente disponível?"
          ],
          "correctIndex": 1,
          "explanation": "Informação só tem valor se puder mudar a decisão (aula 1.6). Se a resposta não muda nada, a análise pode ser interessante, mas não é prioritária."
        }
      ]
    },
    {
      "id": "modulo-2",
      "title": "Indicadores que importam",
      "subtitle": "Competência: definir indicadores, metas e árvores de indicadores que conectam a estratégia ao trabalho do time",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Métrica, indicador e KPI: qual a diferença",
          "type": "video",
          "duration": "9min",
          "summary": "Com a analogia do painel do carro, a aula separa métrica, indicador e KPI (indicador-chave de desempenho) e apresenta a ficha técnica do indicador: definição, fórmula, fonte, frequência, dono, sentido de melhoria e meta.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "OKR: objetivos que inspiram e resultados que se medem",
          "type": "video",
          "duration": "10min",
          "summary": "Como escrever objetivos e resultados-chave (OKR), por que resultado-chave mede efeito e não esforço, como OKRs e KPIs convivem e os erros mais comuns, como atrelar OKR diretamente a bônus.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Métricas de entrada e de saída: o que você controla e o que você colhe",
          "type": "video",
          "duration": "10min",
          "summary": "A diferença entre indicadores antecedentes e consequentes, com exemplos por área, incluindo NPS (índice de recomendação) e CAC (custo de aquisição de cliente), e quatro critérios para escolher boas métricas de entrada.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "A árvore de indicadores: da meta da empresa à alavanca do time",
          "type": "video",
          "duration": "12min",
          "summary": "Como decompor um resultado por soma e por multiplicação, exemplos clássicos como o LTV (valor do cliente ao longo do tempo) e o uso da árvore para diagnosticar variações, com o caso de uma rede de lavanderias que quase baixou o preço sem necessidade.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Metas que fazem sentido: linha de base, ambição e tolerância",
          "type": "video",
          "duration": "11min",
          "summary": "Metas começam pela linha de base, pela sazonalidade e pela variação natural. A aula apresenta o formato SMART, a diferença entre meta de compromisso e meta de ambição e as faixas verde, amarela e vermelha.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Armadilhas: Lei de Goodhart, métricas de vaidade e indicadores contrapeso",
          "type": "video",
          "duration": "12min",
          "summary": "Quando uma medida vira meta, deixa de ser boa medida. A aula mostra atalhos típicos, métricas de vaidade, SLAs (acordos de nível de serviço) que se contradizem e como proteger cada meta com um indicador contrapeso.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: o tempo médio de atendimento que saiu caro",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma empresa de software para clínicas premia o suporte pelo tempo médio de atendimento e vê o indicador melhorar enquanto rechamadas e cancelamentos sobem.",
          "content": "Uma empresa de software de gestão para clínicas médicas atende cerca de 3 mil clientes em todo o Brasil. O suporte, com 35 atendentes, era avaliado principalmente pela satisfação dos clientes, medida em uma pesquisa enviada após cada atendimento.\n\nCom o crescimento da base, as filas aumentaram. A diretoria decidiu criar um bônus trimestral para quem reduzisse o tempo médio de atendimento, que estava em 14 minutos. A meta era chegar a 10 minutos. Em três meses, o tempo médio caiu para cerca de 9,8 minutos, uma melhora de 30%, e a maioria dos atendentes recebeu o bônus.\n\nNo mesmo período, porém, as rechamadas em até sete dias, ou seja, clientes que voltaram a ligar pelo mesmo problema, subiram de 12% para 21%. A pesquisa de satisfação caiu, e o cancelamento de contratos no trimestre seguinte foi o maior em dois anos. Conversando com a equipe, a coordenadora ouviu relatos de atendentes que encerravam chamadas complexas com uma solução provisória ou pediam ao cliente que ligasse mais tarde.\n\nA diretoria não quer voltar ao cenário anterior, com filas longas, mas também não quer manter um incentivo que piora a experiência. O desafio é redesenhar os indicadores e a meta do suporte, ligando o trabalho do time ao resultado que importa para o negócio: clientes que ficam.\n\nPerguntas para discussão:\n\n1. Desenhe a árvore de indicadores do suporte, do cancelamento de clientes até as alavancas do time. Onde está o tempo médio de atendimento nessa árvore?\n\n2. Como a Lei de Goodhart explica o que aconteceu? Que indicadores contrapeso deveriam ter sido acompanhados desde o início?\n\n3. Proponha uma nova meta para o time, com linha de base, faixa de tolerância e pelo menos um contrapeso. Ela deveria estar ligada a bônus?"
        },
        {
          "title": "Atividade prática: Árvore de indicadores da sua área",
          "type": "pratica",
          "duration": "1h",
          "summary": "Em Google Sheets, monte a árvore de indicadores da sua área: indicador de saída no topo, dois ou três níveis de alavancas, ficha técnica de cinco indicadores, metas com linha de base e pelo menos um indicador contrapeso. Entrega: a árvore com metas, segundo entregável do projeto aplicado.",
          "practiceTool": "Google Sheets",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Qual é a melhor descrição de um KPI?",
          "options": [
            "Qualquer número que a empresa consegue medir.",
            "Um dos poucos indicadores que mostram se a estratégia está funcionando.",
            "Uma meta trimestral inspiradora escrita em palavras.",
            "Um relatório mensal com todos os números da área."
          ],
          "correctIndex": 1,
          "explanation": "KPI é um clube pequeno: poucos indicadores-chave que dizem se a estratégia está dando certo (aula 2.1). Qualquer número medido é uma métrica; o objetivo inspirador é parte do OKR."
        },
        {
          "prompt": "Qual dos itens abaixo é um bom resultado-chave de OKR?",
          "options": [
            "Lançar o programa de boas-vindas para novos clientes.",
            "Fazer cinco reuniões com o time de marketing.",
            "Aumentar a recompra em 90 dias de 22% para 30% até o fim do trimestre.",
            "Melhorar a experiência dos clientes."
          ],
          "correctIndex": 2,
          "explanation": "Resultado-chave mede efeito, com número e prazo (aula 2.2). Lançar um programa ou fazer reuniões são iniciativas; melhorar a experiência é vago."
        },
        {
          "prompt": "Para uma equipe comercial, qual opção é uma métrica de entrada?",
          "options": [
            "Receita nova do trimestre.",
            "Lucro líquido da empresa.",
            "Reuniões qualificadas com decisor presente por semana.",
            "Participação de mercado anual."
          ],
          "correctIndex": 2,
          "explanation": "Métricas de entrada são influenciáveis pelo time e antecedem o resultado (aula 2.3). Receita, lucro e participação de mercado são saídas."
        },
        {
          "prompt": "Receita on-line = visitantes × taxa de conversão × ticket médio. A receita caiu 8%, os visitantes subiram 2% e o ticket ficou estável. Onde investigar primeiro?",
          "options": [
            "Nos visitantes.",
            "Na taxa de conversão.",
            "No ticket médio.",
            "Em nenhum galho; a árvore não ajuda nesse caso."
          ],
          "correctIndex": 1,
          "explanation": "Se visitantes subiram e o ticket ficou estável, a queda veio da conversão (aula 2.4). A árvore aponta onde investigar, mas a causa ainda precisa ser confirmada."
        },
        {
          "prompt": "Uma empresa cria SLA de visita técnica em 24 horas e o indicador chega a 97%, mas as reclamações sobem. Qual é a melhor resposta?",
          "options": [
            "Aumentar o bônus por cumprimento do SLA.",
            "Acrescentar um indicador contrapeso, como chamados reabertos em até sete dias.",
            "Eliminar todos os indicadores do time técnico.",
            "Trocar o SLA por 12 horas."
          ],
          "correctIndex": 1,
          "explanation": "É a Lei de Goodhart: o indicador vira alvo e as pessoas encontram atalhos (aula 2.6). O contrapeso denuncia o atalho e equilibra velocidade e qualidade."
        }
      ]
    },
    {
      "id": "modulo-3",
      "title": "Estatística essencial para quem decide",
      "subtitle": "Competência: interpretar números levando em conta a variação e a incerteza",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Média, mediana e moda: qual é o número típico",
          "type": "video",
          "duration": "9min",
          "summary": "Com a analogia do bilionário na padaria, a aula mostra quando a média engana e por que salário, ticket e prazo pedem mediana e percentis, com o caso de entregas em que o percentil 90 revelou o problema escondido.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Variabilidade: por que a média sozinha engana",
          "type": "video",
          "duration": "10min",
          "summary": "Amplitude, desvio padrão e coeficiente de variação explicados com duas linhas de ônibus. A diferença entre variação comum e especial e como ela muda a gestão: parar de reagir a toda oscilação e investigar o que sai da faixa.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Distribuições: o formato dos dados e os valores extremos",
          "type": "video",
          "duration": "10min",
          "summary": "O histograma como raio X dos dados, os formatos mais comuns (simétrico, cauda longa, dois picos e uniforme) e o que fazer com valores extremos: verificar, entender e declarar.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Amostra e população: quando uma parte fala pelo todo",
          "type": "video",
          "duration": "11min",
          "summary": "A analogia da colher de sopa: sortear é mexer a panela. Amostras de conveniência e de autosseleção, e o efeito do tamanho da amostra, que depende mais do número de respostas do que do tamanho da população.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Margem de erro e intervalo de confiança",
          "type": "video",
          "duration": "12min",
          "summary": "O que é margem de erro, a regra de bolso de 1 dividido pela raiz do tamanho da amostra, o significado de 95% de confiança com a analogia da rede de pesca e como comparar dois números cujos intervalos se sobrepõem.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Significância estatística sem mistério: p-valor e relevância prática",
          "type": "video",
          "duration": "12min",
          "summary": "Hipótese nula e p-valor com a lógica do tribunal, as três interpretações erradas mais comuns e a diferença entre significância estatística e relevância para o negócio, com o caso de um e-mail significativo, mas irrelevante.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: a agência que caiu seis pontos",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma cooperativa de crédito cogita trocar a gerência de uma agência cuja satisfação caiu de 82 para 76 pontos em uma pesquisa com 70 respostas.",
          "content": "Uma cooperativa de crédito com 15 agências no interior de Minas Gerais mede a satisfação dos cooperados a cada trimestre. A pesquisa é enviada por mensagem a todos que foram atendidos presencialmente no período, e a nota vai de 0 a 100.\n\nNo último trimestre, a agência de uma das cidades menores caiu de 82 para 76 pontos, com 70 respostas. Foi a maior queda da rede. Na reunião de diretoria, um diretor sugeriu substituir o gerente da agência, que assumiu o cargo há oito meses. Outro lembrou que a agência tinha passado por uma reforma no período, com atendimento em espaço provisório durante seis semanas.\n\nA analista de planejamento levou mais informações. Nas agências com menos de 100 respostas por trimestre, as notas costumam oscilar entre 5 e 8 pontos de um trimestre para outro, sem que nada de diferente aconteça. A taxa de resposta da pesquisa na agência caiu de 18% para 11%, e a maior parte das respostas veio de cooperados com mais de 60 anos, que frequentam mais a agência. Nas agências maiores, com mais de 400 respostas, as oscilações raramente passam de 3 pontos.\n\nA diretoria precisa decidir se há evidência suficiente para agir sobre a gerência, se deve esperar mais um trimestre ou se deve mudar a forma de medir a satisfação nas agências pequenas.\n\nPerguntas para discussão:\n\n1. Com 70 respostas, qual é a margem de erro aproximada da nota? A queda de 6 pontos está fora da variação normal dessa agência?\n\n2. Que vieses de amostra podem estar afetando o resultado? Como a reforma da agência entra nessa leitura?\n\n3. Qual é a sua recomendação para a diretoria? Que dado adicional mudaria a sua decisão?"
        },
        {
          "title": "Atividade prática: Diagnóstico estatístico do indicador",
          "type": "pratica",
          "duration": "1h",
          "summary": "Com uma base fictícia de 1.200 pedidos de um comércio eletrônico de cosméticos em Google Sheets, calcule média, mediana e desvio padrão, monte um histograma e estime o intervalo de confiança do ticket médio com fórmulas prontas. Depois, repita o diagnóstico com o indicador principal do seu projeto. Entrega: o diagnóstico estatístico, terceiro entregável do projeto aplicado.",
          "practiceTool": "Google Sheets",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "O tempo médio de entrega é 38 minutos, a mediana é 29 e o percentil 90 é 72. O que isso indica?",
          "options": [
            "As entregas são todas parecidas, perto de 38 minutos.",
            "A maioria das entregas é rápida, mas um em cada dez clientes espera mais de uma hora.",
            "A média está errada e deve ser descartada.",
            "Metade das entregas leva mais de 72 minutos."
          ],
          "correctIndex": 1,
          "explanation": "Média acima da mediana indica uma cauda de casos lentos; o percentil 90 mostra que 10% esperam mais de 72 minutos (aula 3.1)."
        },
        {
          "prompt": "As vendas diárias de uma loja caíram 4% ontem, dentro da faixa habitual de oscilação. Qual é a atitude mais adequada?",
          "options": [
            "Pedir explicação imediata ao gerente da loja.",
            "Tratar como variação comum e investigar apenas se sair da faixa ou formar uma sequência estranha.",
            "Lançar uma promoção no dia seguinte.",
            "Mudar a meta da loja."
          ],
          "correctIndex": 1,
          "explanation": "Reagir à variação comum é como mexer no volante a cada buraco (aula 3.2). Investiga-se a variação especial: pontos fora da faixa ou sequências incomuns."
        },
        {
          "prompt": "Uma pesquisa de satisfação é respondida apenas por quem escaneia um código deixado no quarto do hotel. Qual é o principal risco?",
          "options": [
            "A amostra ser pequena demais para qualquer conclusão.",
            "Autosseleção: respondem sobretudo os muito satisfeitos e os muito insatisfeitos.",
            "O código não funcionar em todos os celulares.",
            "A pesquisa ter perguntas demais."
          ],
          "correctIndex": 1,
          "explanation": "O erro mais comum não é a amostra pequena, é a amostra torta (aula 3.4). Sortear quem responde reduz esse viés."
        },
        {
          "prompt": "Uma pesquisa com 400 clientes mostra 60% de aprovação. Pela regra de bolso, qual é a margem de erro aproximada, com 95% de confiança?",
          "options": [
            "Cerca de 1 ponto.",
            "Cerca de 5 pontos.",
            "Cerca de 15 pontos.",
            "Não é possível estimar sem saber o tamanho da população."
          ],
          "correctIndex": 1,
          "explanation": "1 dividido pela raiz de 400 é 0,05, ou cerca de 5 pontos (aula 3.5). A precisão depende principalmente do tamanho da amostra, não da população."
        },
        {
          "prompt": "Um teste mostra diferença de 0,1 ponto na taxa de abertura de e-mails, com p-valor abaixo de 1%, em uma base de 2 milhões de clientes. O que se pode concluir?",
          "options": [
            "A mudança é obrigatoriamente vantajosa e deve ser adotada.",
            "Há 99% de chance de a nova versão ser melhor.",
            "A diferença provavelmente existe, mas é preciso avaliar se ela é relevante frente ao custo da mudança.",
            "O resultado é inválido porque a amostra é grande demais."
          ],
          "correctIndex": 2,
          "explanation": "Significância indica que a diferença provavelmente não é acaso; relevância depende do tamanho do efeito e do custo (aula 3.6). E o p-valor não é a probabilidade de a hipótese estar certa."
        }
      ]
    },
    {
      "id": "modulo-4",
      "title": "Painéis e storytelling com dados",
      "subtitle": "Competência: comunicar dados de forma que levem a decisões",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Para que serve um painel: uma decisão, um público, uma frequência",
          "type": "video",
          "duration": "9min",
          "summary": "Painéis estratégicos, táticos e operacionais e o briefing do painel em cinco perguntas, escrito antes de abrir qualquer ferramenta. O caso de uma cooperativa que trocou 25 abas por três painéis enxutos.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Desenho de painel: hierarquia, contexto e comparação",
          "type": "video",
          "duration": "11min",
          "summary": "Leitura em Z, três camadas (cartões de KPI, tendências e detalhes), contexto obrigatório para todo número, uso de cores com significado e boas práticas de filtros e descrições no Looker Studio.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "O gráfico certo para cada pergunta",
          "type": "video",
          "duration": "10min",
          "summary": "Cinco perguntas, cinco famílias de gráficos (comparação, evolução, composição, distribuição e relação), regras de clareza como títulos que afirmam e destaque com uma só cor, e quando uma tabela vence qualquer gráfico.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Gráficos que enganam (e como não ser enganado)",
          "type": "video",
          "duration": "10min",
          "summary": "Distorções de escala e forma (eixo cortado, dois eixos, 3D, ícones) e de recorte (período escolhido a dedo, acumulado, percentual sem base, média de médias), com cinco perguntas de defesa para usar em qualquer reunião.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Narrativa para a diretoria: recomendação primeiro",
          "type": "video",
          "duration": "11min",
          "summary": "A estrutura SCQA (situação, complicação, questão e resposta), a pirâmide com a recomendação no topo, um slide por mensagem e a declaração honesta de incerteza e premissas.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Ritos de gestão com dados: a reunião que decide",
          "type": "video",
          "duration": "12min",
          "summary": "Como desenhar uma revisão semanal de negócio (WBR) curta, com painel único, dono que explica a variação e registro de ações. Inclui bons usos e cuidados da IA generativa para resumir painéis.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: o painel de 40 gráficos que ninguém abria",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma indústria de alimentos tem um painel enorme e uma reunião mensal que virou leitura de números. Os participantes redesenham painel e rito.",
          "content": "Uma indústria de alimentos com três fábricas e cerca de 900 funcionários tem um painel de indicadores construído ao longo de quatro anos. Ele reúne 40 gráficos em seis páginas, com dados de produção, qualidade, vendas, logística, pessoas e finanças. Cada área pediu os seus gráficos, e nenhum foi retirado.\n\nOs registros de acesso mostram que o painel é aberto, em média, oito vezes por mês, quase sempre na véspera da reunião mensal de resultados. A reunião dura três horas: cada diretor apresenta os seus números, um de cada vez, e raramente sobra tempo para discutir os problemas. As decisões costumam ficar para a próxima reunião.\n\nNa última reunião, dois diretores apresentaram números diferentes de perdas na produção. Um usava o percentual sobre o volume produzido; o outro, sobre o volume planejado. Os gráficos tinham escalas diferentes e um deles começava o eixo em 90%, o que fazia uma variação pequena parecer enorme.\n\nO novo diretor-geral pediu uma proposta para que o painel e a reunião ajudem a decidir. A empresa já tem uma árvore de indicadores, com margem operacional no topo e alavancas como produtividade, perdas, prazo de entrega e preço médio.\n\nPerguntas para discussão:\n\n1. Escreva o briefing de um painel estratégico de uma página para essa diretoria. Quais seis indicadores entram, e por quê?\n\n2. Que distorções visuais e de definição você identifica no caso das perdas? Como evitá-las no novo painel?\n\n3. Desenhe a pauta de um rito semanal de 30 minutos. O que acontece quando um indicador fica vermelho?"
        },
        {
          "title": "Atividade prática: Painel de uma página e narrativa",
          "type": "pratica",
          "duration": "1h",
          "summary": "No Looker Studio, conecte a planilha modelo (ou dados anonimizados da sua área) e monte um painel de uma página com o indicador principal, a comparação com a meta, a tendência e duas alavancas da árvore de indicadores. Depois escreva uma narrativa de cinco frases no formato SCQA. Entrega: painel e narrativa, quarto entregável do projeto aplicado.",
          "practiceTool": "Looker Studio",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Qual é a primeira coisa a definir antes de construir um painel?",
          "options": [
            "As cores e o logotipo da empresa.",
            "A ferramenta de BI que será usada.",
            "Quem vai usar o painel, para qual decisão e com que frequência.",
            "O número máximo de gráficos por página."
          ],
          "correctIndex": 2,
          "explanation": "O briefing do painel começa por público, decisão e frequência (aula 4.1). Ferramenta e visual vêm depois."
        },
        {
          "prompt": "Você quer mostrar como o prazo de entrega evoluiu mês a mês ao longo do ano. Qual gráfico é o mais indicado?",
          "options": [
            "Pizza.",
            "Linhas.",
            "Gráfico de dispersão.",
            "Barras empilhadas 100%."
          ],
          "correctIndex": 1,
          "explanation": "Evolução no tempo pede linhas (aula 4.3). Pizza serve para composição com poucas fatias; dispersão, para relação entre duas variáveis."
        },
        {
          "prompt": "Um gráfico de barras compara duas lojas com eixo começando em 95. Qual é o problema?",
          "options": [
            "Nenhum, é só uma escolha estética.",
            "Uma diferença pequena parece muito maior do que é, porque o comprimento da barra deixa de ser proporcional.",
            "O gráfico deveria ser de pizza.",
            "Faltam rótulos de dados."
          ],
          "correctIndex": 1,
          "explanation": "Em barras, o comprimento é a mensagem; por isso o eixo deve começar no zero (aulas 4.3 e 4.4)."
        },
        {
          "prompt": "Na estrutura SCQA, o que vem na letra R (resposta)?",
          "options": [
            "O histórico completo da análise.",
            "A recomendação que responde à questão levantada.",
            "A lista de todas as fontes de dados.",
            "Os agradecimentos à equipe."
          ],
          "correctIndex": 1,
          "explanation": "Situação, complicação, questão e resposta: a resposta é a recomendação, e ela vem logo no início da apresentação (aula 4.5)."
        },
        {
          "prompt": "Qual prática caracteriza uma boa revisão semanal de negócio (WBR)?",
          "options": [
            "Cada diretor apresenta todos os seus números, um de cada vez.",
            "A IA gera o resumo e ninguém precisa revisá-lo.",
            "O dono de cada indicador explica a variação, e toda variação especial gera ação com responsável e prazo.",
            "Discute-se apenas o que está no verde, para manter o clima positivo."
          ],
          "correctIndex": 2,
          "explanation": "O rito existe para responder o que mudou, por que mudou e o que fazer (aula 4.6). A IA pode rascunhar o resumo, mas os números são conferidos e a interpretação é do time."
        }
      ]
    },
    {
      "id": "modulo-5",
      "title": "Causalidade e vieses",
      "subtitle": "Competência: separar correlação de causa e controlar os vieses que distorcem a análise e a decisão",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Correlação não é causa",
          "type": "video",
          "duration": "9min",
          "summary": "Três explicações para uma correlação que não são causa (acaso, causa reversa e terceiro fator) e quatro perguntas para transformar uma correlação do painel em hipótese a investigar, com o caso de vendedores e cursos internos.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Confundidores: a variável escondida",
          "type": "video",
          "duration": "10min",
          "summary": "O que é um confundidor, com o exemplo dos hospitais que recebem os casos mais graves, e três técnicas para comparar o comparável numa planilha: segmentar, parear e usar taxas.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Paradoxo de Simpson: quando o total contradiz as partes",
          "type": "video",
          "duration": "11min",
          "summary": "Duas equipes de vendas em que a melhor em cada produto é a pior no total. A aula explica o efeito de mix e como se proteger abrindo o indicador pelo segmento certo.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Viés de sobrevivência, viés de seleção e regressão à média",
          "type": "video",
          "duration": "11min",
          "summary": "Os aviões que voltaram da guerra, os programas opcionais que atraem os mais engajados e as piores lojas que melhoram sozinhas. Três armadilhas de quem entra e de quem sai dos dados.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Os vieses de quem decide",
          "type": "video",
          "duration": "11min",
          "summary": "Confirmação, ancoragem, disponibilidade, excesso de confiança, custo afundado e efeito manada, com antídotos que cabem numa reunião, como critérios antes dos dados, opiniões por escrito e pré-mortem.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Argumentar causa com responsabilidade: contrafactual e diagramas causais",
          "type": "video",
          "duration": "12min",
          "summary": "O contrafactual como o mundo que não aconteceu, o diagrama causal (DAG) desenhado com caixas e setas para achar confundidores e a escada da força da evidência, da história isolada ao experimento.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: o aplicativo que reduziria a evasão",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma rede de escolas de idiomas descobre que quem usa o aplicativo desiste 40% menos e quer tornar o uso obrigatório.",
          "content": "Uma rede de escolas de idiomas com 18 unidades no Sul do país lançou, há dois anos, um aplicativo com exercícios, lembretes de aula e um canal com os professores. O uso é opcional, e cerca de 35% dos alunos acessam o aplicativo pelo menos uma vez por semana.\n\nA equipe de dados cruzou o uso do aplicativo com a evasão e encontrou um número que animou a diretoria: entre os alunos que usam o aplicativo toda semana, a desistência no semestre é 40% menor do que entre os que não usam. O diretor pedagógico propôs tornar o uso obrigatório, com tarefas valendo nota, e estimou uma redução de evasão capaz de pagar todo o investimento em tecnologia.\n\nUma coordenadora levantou dúvidas. Ela observou que os alunos que mais usam o aplicativo são justamente os que fazem as tarefas de casa, chegam no horário e têm metas claras, como uma viagem ou uma promoção. Também lembrou que boa parte dos usuários frequentes estuda em turmas de professores mais experientes, que incentivam o uso. E notou que alunos com dificuldades financeiras, que desistem mais, muitas vezes têm celulares com pouco espaço e não instalam o aplicativo.\n\nA diretoria não quer descartar a ideia, mas também não quer impor uma regra que pode irritar alunos e professores sem gerar o efeito esperado. Ela pediu uma recomendação sobre como obter evidência melhor antes de mudar a regra para toda a rede.\n\nPerguntas para discussão:\n\n1. Desenhe o diagrama causal com uso do aplicativo, evasão e as variáveis citadas pela coordenadora. Quais são confundidores?\n\n2. Que viés explica boa parte da diferença de 40%? Por que tornar o uso obrigatório pode não gerar o mesmo efeito?\n\n3. Como você desenharia uma forma de testar o efeito real do aplicativo antes de mudar a regra?"
        },
        {
          "title": "Atividade prática: Mapa causal e checklist de vieses",
          "type": "pratica",
          "duration": "1h",
          "summary": "Em Google Sheets, com uma base fictícia de vendas de uma distribuidora de autopeças, segmente um indicador por região e mix de produto e revele um paradoxo de Simpson. Depois desenhe o mapa causal do indicador do seu projeto (causas prováveis, confundidores e o que pode ser testado) e aplique o checklist de vieses à sua decisão. Entrega: mapa causal e checklist, quinto entregável do projeto aplicado.",
          "practiceTool": "Google Sheets",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Lojas com mais funcionários vendem mais. Qual explicação alternativa à causa é a de causa reversa?",
          "options": [
            "Foi pura coincidência neste ano.",
            "As lojas que vendem mais contratam mais funcionários.",
            "O tamanho da cidade aumenta tanto o número de funcionários quanto as vendas.",
            "Os funcionários trazem clientes de outras lojas."
          ],
          "correctIndex": 1,
          "explanation": "Causa reversa é quando o suposto efeito causa a suposta causa (aula 5.1). O tamanho da cidade seria um terceiro fator, ou confundidor."
        },
        {
          "prompt": "Carros revisados na rede quebram 40% menos, mas são, em média, bem mais novos. O que a idade do carro representa nessa análise?",
          "options": [
            "Um viés de sobrevivência.",
            "Um confundidor.",
            "Uma métrica de vaidade.",
            "Uma regressão à média."
          ],
          "correctIndex": 1,
          "explanation": "A idade influencia quem faz revisão na rede e também a chance de quebra: é um confundidor (aula 5.2). Comparar dentro da mesma faixa de idade reduz o problema."
        },
        {
          "prompt": "A equipe A converte melhor que a B em cada tipo de produto, mas pior no total. Qual é a explicação mais provável?",
          "options": [
            "Erro de cálculo no total.",
            "A equipe A recebeu uma proporção maior de oportunidades mais difíceis, mudando o mix.",
            "A equipe B trabalha mais horas.",
            "A amostra é pequena demais."
          ],
          "correctIndex": 1,
          "explanation": "É o paradoxo de Simpson: o total mistura desempenho com composição (aula 5.3). Para avaliar equipes, compare dentro de cada segmento."
        },
        {
          "prompt": "Uma consultoria atuou nas dez piores lojas, que melhoraram 15% no trimestre seguinte. As lojas da 11ª à 20ª pior posição, sem consultoria, melhoraram 12%. O que isso sugere?",
          "options": [
            "A consultoria gerou 15% de melhora.",
            "Boa parte da melhora seria esperada de qualquer jeito, por regressão à média.",
            "As lojas sem consultoria trapacearam nos números.",
            "A consultoria piorou os resultados."
          ],
          "correctIndex": 1,
          "explanation": "Resultados extremos tendem a voltar para perto da média (aula 5.4). O grupo de comparação mostra que o efeito real da consultoria é bem menor que 15%."
        },
        {
          "prompt": "Uma equipe insiste em um projeto que não dá resultado porque já gastou muito nele. Que pergunta ajuda a combater esse viés?",
          "options": [
            "Quanto já investimos até agora?",
            "Quem aprovou o projeto originalmente?",
            "Se começássemos hoje, do zero, faríamos este investimento?",
            "Quantas pessoas trabalham no projeto?"
          ],
          "correctIndex": 2,
          "explanation": "É o viés do custo afundado (aula 5.5). A pergunta do zero tira o peso do que já foi gasto e foca no futuro."
        }
      ]
    },
    {
      "id": "modulo-6",
      "title": "Experimentos no negócio",
      "subtitle": "Competência: desenhar, dimensionar e interpretar experimentos e quase-experimentos",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Por que experimentar: o grupo de controle",
          "type": "video",
          "duration": "9min",
          "summary": "Como o sorteio cria grupos parecidos em tudo, inclusive no que não se mede, e quando um experimento faz sentido nos negócios, com o caso do frete grátis de uma assinatura de café especial.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Teste A/B passo a passo",
          "type": "video",
          "duration": "11min",
          "summary": "A hipótese bem escrita, a métrica principal, as métricas de proteção, a unidade de sorteio, o cuidado com contaminação e o critério de decisão registrado antes de começar.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Tamanho de amostra e duração do teste",
          "type": "video",
          "duration": "11min",
          "summary": "Poder do teste e MDE (efeito mínimo detectável) explicados com a lanterna no escuro, a regra de bolso para taxas e o que fazer quando o volume é pequeno, como testar mudanças mais ousadas.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Lendo resultados sem cair em armadilhas",
          "type": "video",
          "duration": "11min",
          "summary": "Os quatro desfechos de um teste (vitória, derrota, empate verdadeiro e inconclusivo) e as armadilhas de espiar antes da hora, caçar segmentos, efeito novidade e sorteio quebrado.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Quando não dá para sortear: quase-experimentos e diferença-em-diferenças",
          "type": "video",
          "duration": "12min",
          "summary": "Grupos de comparação bem escolhidos, a diferença-em-diferenças (DiD) calculada com quatro números, a premissa de tendências paralelas e saídas como implantação em ondas e regras de corte.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Ética e governança de um programa de experimentos",
          "type": "video",
          "duration": "12min",
          "summary": "Princípios éticos para testar com clientes e colaboradores, o que a LGPD exige (com aviso para conferir as orientações da ANPD) e como organizar a experimentação como programa, com registro prévio, revisão proporcional e biblioteca de aprendizados.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: o programa de fidelidade testado nas lojas escolhidas",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma rede de farmácias testa um programa de fidelidade em 20 lojas escolhidas pelos gerentes e vê as vendas subirem 8%.",
          "content": "Uma rede de farmácias com 120 lojas em quatro estados do Nordeste desenhou um novo programa de fidelidade, com descontos progressivos para clientes de uso contínuo de medicamentos. Antes de levar o programa a toda a rede, a diretoria decidiu fazer um piloto em 20 lojas durante três meses.\n\nOs gerentes regionais escolheram as lojas do piloto. Naturalmente, indicaram unidades com boa equipe, gerentes engajados e localização de alto movimento, para que o programa tivesse as melhores condições de dar certo. Algumas dessas lojas também tinham passado por reforma recente.\n\nAo fim do piloto, as vendas das 20 lojas cresceram 8% em relação ao mesmo período do ano anterior, contra 3% no restante da rede. A área comercial quer lançar o programa em todas as lojas no próximo trimestre e projeta um crescimento de 5 pontos para a rede inteira. O diretor financeiro, porém, pediu cautela antes de assumir o custo dos descontos em 120 lojas.\n\nA rede ainda tem 40 lojas que receberiam o programa só no ano seguinte, por limitações de sistema. A equipe de dados tem o histórico de vendas mensal de todas as lojas dos últimos três anos.\n\nPerguntas para discussão:\n\n1. Por que a escolha das lojas pelos gerentes compromete a comparação de 8% contra 3%? Que confundidores estão envolvidos?\n\n2. Como você redesenharia o teste com sorteio entre lojas pareadas? E, se o sorteio não for possível, como montaria uma diferença-em-diferenças com as 40 lojas que ficarão para o ano seguinte?\n\n3. Que métricas de proteção e cuidados éticos e de LGPD o teste de um programa de fidelidade de farmácia exige?"
        },
        {
          "title": "Atividade prática: Desenho de experimento",
          "type": "pratica",
          "duration": "1h",
          "summary": "Em Google Sheets, use a calculadora modelo para dimensionar um teste A/B de uma campanha de e-mail de uma loja virtual de móveis, leia um resultado fictício e calcule uma diferença-em-diferenças com quatro números. Depois desenhe o experimento ou quase-experimento do seu projeto: hipótese, unidade, métrica principal, métricas de proteção, tamanho, duração, critério de decisão e cuidados éticos. Entrega: plano de experimento, sexto entregável do projeto aplicado.",
          "practiceTool": "Google Sheets",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Por que o sorteio é tão importante em um experimento?",
          "options": [
            "Porque torna o teste mais rápido.",
            "Porque cria grupos parecidos em tudo, inclusive no que não foi medido, de modo que a diferença de resultado pode ser atribuída à ação.",
            "Porque dispensa o grupo de controle.",
            "Porque garante que a novidade vai funcionar."
          ],
          "correctIndex": 1,
          "explanation": "O sorteio equilibra os grupos e torna o controle um contrafactual visível (aula 6.1)."
        },
        {
          "prompt": "Em um teste A/B de lembrete de consulta, qual é um bom exemplo de métrica de proteção?",
          "options": [
            "Taxa de faltas.",
            "Reclamações sobre excesso de mensagens.",
            "Número de lembretes enviados.",
            "Quantidade de salões participantes."
          ],
          "correctIndex": 1,
          "explanation": "A métrica principal é a taxa de faltas; a de proteção vigia o que não pode piorar, como reclamações (aula 6.2)."
        },
        {
          "prompt": "Se você quer detectar um efeito duas vezes menor (MDE pela metade), o que acontece com o tamanho de amostra necessário?",
          "options": [
            "Fica igual.",
            "Dobra.",
            "Aumenta cerca de quatro vezes.",
            "Diminui pela metade."
          ],
          "correctIndex": 2,
          "explanation": "O tamanho de amostra cresce com o inverso do quadrado do MDE: metade do efeito pede cerca de quatro vezes mais amostra (aula 6.3)."
        },
        {
          "prompt": "No terceiro dia de um teste planejado para duas semanas, a nova versão mostra 12% a mais de pedidos. O que fazer?",
          "options": [
            "Encerrar o teste e lançar para todos.",
            "Respeitar a duração planejada, porque espiar e parar aumenta o risco de falso positivo e de efeito novidade.",
            "Dobrar o tráfego da versão nova.",
            "Procurar o segmento com maior ganho e lançar só para ele."
          ],
          "correctIndex": 1,
          "explanation": "Espiar e parar é uma das armadilhas centrais da leitura de testes (aula 6.4). No caso do aplicativo, o efeito final foi inconclusivo."
        },
        {
          "prompt": "Lojas com a mudança passaram de 100 para 112; lojas de comparação, de 100 para 106. Qual é o efeito estimado pela diferença-em-diferenças?",
          "options": [
            "12 pontos.",
            "6 pontos.",
            "18 pontos.",
            "106 pontos."
          ],
          "correctIndex": 1,
          "explanation": "Efeito = (112 − 100) − (106 − 100) = 6 pontos, supondo tendências paralelas entre os grupos (aula 6.5)."
        }
      ]
    },
    {
      "id": "modulo-7",
      "title": "Previsão e análise de cenários",
      "subtitle": "Competência: planejar sob incerteza com previsões e cenários",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Prever não é adivinhar: previsão, meta e plano",
          "type": "video",
          "duration": "9min",
          "summary": "A diferença entre previsão, meta e plano com a analogia do aplicativo de navegação, o erro clássico de ajustar a previsão à meta e como horizonte, nível de detalhe e erro esperado definem uma boa previsão.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Séries temporais para gestores: tendência, sazonalidade e ruído",
          "type": "video",
          "duration": "10min",
          "summary": "Os componentes de uma série com a analogia do mar, três gráficos para enxergá-los numa planilha e os efeitos de calendário do Brasil, como Carnaval, Páscoa, Black Friday e dias úteis.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Previsão de demanda na prática",
          "type": "video",
          "duration": "12min",
          "summary": "Quatro métodos em planilha (ingênuo, média móvel, suavização exponencial e sazonal), o teste justo com meses escondidos, o MAPE (erro percentual absoluto médio) e o registro dos ajustes feitos pela equipe.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "A incerteza da previsão: faixas e o cone de incerteza",
          "type": "video",
          "duration": "10min",
          "summary": "Como construir faixas de previsão a partir dos erros passados, o cone de incerteza que se abre com o horizonte e a escolha do ponto da faixa conforme o custo de faltar ou de sobrar.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Simulação de cenários: sensibilidade e Monte Carlo em planilha",
          "type": "video",
          "duration": "12min",
          "summary": "Análise de sensibilidade com gráfico de tornado, cenários coerentes com gatilhos e ações pré-combinadas e uma simulação de Monte Carlo com 1.000 linhas de planilha para estimar a chance de prejuízo.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Quando chamar o aprendizado de máquina",
          "type": "video",
          "duration": "11min",
          "summary": "Cinco condições que justificam um modelo de ML, cinco perguntas para avaliar o trabalho do time de dados e os bons usos e limites dos LLMs (grandes modelos de linguagem) em previsão.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: o verão da fabricante de sorvetes",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma fabricante de sorvetes planeja a produção pela média dos últimos 12 meses e convive com falta em dezembro e sobra em março.",
          "content": "Uma fabricante de sorvetes com distribuição em cinco estados do Nordeste vende para supermercados, padarias e pequenos comércios. Todo ano, em setembro, a empresa define o plano de produção do verão: quanto comprar de insumos, quantos turnos rodar e quanto estocar em câmaras frias alugadas.\n\nO plano é feito pela média mensal de vendas dos últimos 12 meses, com um acréscimo de 10% definido pela diretoria comercial como meta de crescimento. Nos últimos dois anos, faltou produto em dezembro e janeiro, com pedidos recusados, e sobrou estoque em março, quando as vendas caem e parte do produto vence ou precisa ser vendido com desconto.\n\nA analista de planejamento reuniu 36 meses de vendas. O gráfico mostra uma tendência de crescimento de cerca de 6% ao ano e uma sazonalidade forte: os meses de pico vendem mais que o dobro dos meses mais fracos. Também aparecem dois efeitos irregulares: um ano com Carnaval em fevereiro e outro em março, e um mês com queda forte por causa de uma greve de caminhoneiros.\n\nPara o próximo verão, há incertezas adicionais: o preço do leite pode subir, um concorrente nacional anunciou entrada na região e a previsão climática indica temperaturas acima da média. A diretoria quer um plano que não dependa de acertar um número exato.\n\nPerguntas para discussão:\n\n1. Por que planejar pela média dos últimos 12 meses mais 10% gera falta no pico e sobra depois? Que método você usaria, e como mediria o erro?\n\n2. Monte três cenários (pessimista, base e otimista) com as incertezas citadas. Que premissas mudam juntas em cada um?\n\n3. Defina dois gatilhos observáveis até novembro e a ação pré-combinada para cada um."
        },
        {
          "title": "Atividade prática: Previsão e três cenários",
          "type": "pratica",
          "duration": "1h",
          "summary": "Em Google Sheets, com 36 meses de vendas fictícias, calcule média móvel e uma previsão com sazonalidade, meça o MAPE contra o método ingênuo, construa três cenários e rode uma simulação simples com 1.000 linhas de números aleatórios. Depois aplique o método ao indicador do seu projeto. Entrega: previsão e três cenários com premissas e gatilhos, sétimo entregável do projeto aplicado.",
          "practiceTool": "Google Sheets",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Qual é o erro clássico na relação entre previsão e meta?",
          "options": [
            "Fazer a previsão antes de definir a meta.",
            "Ajustar a previsão para que ela bata com a meta e planejar compras e equipe sobre esse número.",
            "Usar dados históricos na previsão.",
            "Revisar a previsão todo mês."
          ],
          "correctIndex": 1,
          "explanation": "Previsão é o que deve acontecer; meta é o que se quer; plano é o que se fará para chegar lá (aula 7.1). Misturar as duas leva a planejar sobre um desejo."
        },
        {
          "prompt": "As vendas de março cresceram 40% sobre o março anterior, mas a Páscoa caiu em março neste ano e em abril no ano anterior. O que fazer?",
          "options": [
            "Comemorar o crescimento de 40%.",
            "Comparar a soma de março e abril dos dois anos para eliminar o efeito da data móvel.",
            "Ignorar os dados de março.",
            "Comparar março com fevereiro."
          ],
          "correctIndex": 1,
          "explanation": "Datas móveis distorcem comparações mensais (aula 7.2). Agrupar os meses afetados mostra o crescimento real."
        },
        {
          "prompt": "Um novo método de previsão tem MAPE de 16%, e o método ingênuo tem MAPE de 14%. O que isso indica?",
          "options": [
            "O novo método é melhor, porque é mais sofisticado.",
            "O novo método não agrega valor, porque não vence a régua mínima do método ingênuo.",
            "Os dois métodos são equivalentes.",
            "O MAPE não serve para comparar métodos."
          ],
          "correctIndex": 1,
          "explanation": "Todo método precisa vencer o ingênuo no teste justo (aula 7.3). Um erro maior que o dele significa que a sofisticação não está ajudando."
        },
        {
          "prompt": "Para um produto perecível, em que sobrar custa muito mais do que faltar, onde planejar dentro da faixa de previsão?",
          "options": [
            "Sempre no topo da faixa.",
            "Mais perto da base da faixa, com um plano rápido para reforçar se a demanda vier alta.",
            "Exatamente no valor central, sem plano adicional.",
            "Fora da faixa, abaixo do limite inferior."
          ],
          "correctIndex": 1,
          "explanation": "O ponto da faixa depende do custo de errar para cada lado (aula 7.4), como no caso dos panetones."
        },
        {
          "prompt": "Em qual situação o aprendizado de máquina tende a valer mais a pena para previsão?",
          "options": [
            "Uma única previsão anual do faturamento total, com poucos dados.",
            "Previsão diária de milhares de produtos em dezenas de lojas, com histórico confiável e muitas influências.",
            "Uma decisão que acontece uma vez por década.",
            "Qualquer previsão, desde que se use um LLM."
          ],
          "correctIndex": 1,
          "explanation": "Volume, recorrência, muitas influências, dados e valor juntos justificam ML (aula 7.6). LLMs ajudam no processo, mas não são, sozinhos, máquinas confiáveis de prever números."
        }
      ]
    },
    {
      "id": "modulo-8",
      "title": "Cultura e governança da decisão",
      "subtitle": "Competência: instituir ritos, registro e revisão de decisões, inclusive as apoiadas por IA",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Ritos de decisão: quem decide o quê",
          "type": "video",
          "duration": "9min",
          "summary": "O modelo DACI (condutor, aprovador, contribuidores e informados), o cardápio de modos de decidir (individual informada, consenso, consentimento e delegação) e a importância de um prazo para decidir.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "O diário de decisões",
          "type": "video",
          "duration": "10min",
          "summary": "Por que registrar decisões contra o viés de retrospectiva, os campos de um bom registro (contexto, opções, evidências, premissas, resultado esperado e revisão) e como dosar o registro pelo tamanho da decisão.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Revisão pós-decisão: separar decisão de resultado",
          "type": "video",
          "duration": "10min",
          "summary": "A matriz de decisão e resultado (mérito, azar, sorte perigosa e aprendizado), as quatro perguntas da revisão sem culpa e como transformar lições repetidas em regras da equipe.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Alfabetização de dados da equipe",
          "type": "video",
          "duration": "11min",
          "summary": "Os níveis de fluência em dados (leitor, explorador, analista e especialista), as seis perguntas que todos devem saber fazer a um número e um plano de 90 dias com diagnóstico, campeões de dados e rituais leves.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Decisões com IA: o humano no circuito",
          "type": "video",
          "duration": "11min",
          "summary": "Quatro níveis de automação, as condições para uma supervisão humana real (HITL, humano no circuito), o viés de automação e regras para agentes de IA generativa, como permissões mínimas e aprovação de ações irreversíveis.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Governança das decisões apoiadas por IA",
          "type": "video",
          "duration": "12min",
          "summary": "O artigo 20 da LGPD, o PL 2338/2023, o AI Act europeu e a ISO/IEC 42001, com aviso para conferir o estado de cada um antes de gravar, e a política de decisão de uma página para a área. Encerra o programa.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: o limite de crédito sugerido pela IA",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma varejista adota IA para sugerir limite de crédito no caixa; vendedores aceitam 98% das sugestões e uma cliente pede explicação à ouvidoria.",
          "content": "Uma varejista de eletrodomésticos com 70 lojas no Centro-Oeste oferece crediário próprio. Há um ano, adotou um sistema de IA que sugere, no caixa, o limite de crédito de cada cliente, com base no histórico de compras, nos pagamentos anteriores e em informações cadastrais. O vendedor pode aceitar a sugestão ou ajustá-la, justificando o ajuste.\n\nNos primeiros meses, a inadimplência caiu e o tempo de aprovação do crediário diminuiu bastante. A diretoria comemorou. Seis meses depois, porém, um levantamento mostrou que os vendedores aceitavam 98% das sugestões sem abrir a tela com a justificativa. Em entrevistas, vários disseram que ajustar o limite exigia preencher um formulário e que eram cobrados pelo tempo de atendimento.\n\nNo mesmo período, uma cliente teve o crédito negado e procurou a ouvidoria pedindo explicação. Ela tinha bom histórico de pagamentos em outra loja da rede, que estava registrado com um cadastro diferente. A ouvidoria não sabia como explicar a decisão nem quem poderia revisá-la. O caso chegou à diretoria jurídica, que lembrou o direito de revisão de decisões automatizadas previsto na LGPD.\n\nA diretoria quer manter os ganhos do sistema, mas organizar a governança: definir o nível de autonomia da IA, garantir supervisão humana real, registrar as decisões e criar um caminho de contestação e um rito de revisão periódica.\n\nPerguntas para discussão:\n\n1. Em que nível de automação o sistema estava na prática, e em qual deveria estar para negativas de crédito? Por quê?\n\n2. O que impedia a supervisão humana de ser real? Que mudanças de processo e de indicadores você proporia?\n\n3. Escreva os itens principais da política de decisão de uma página para o crediário, incluindo registro, contestação e revisão."
        },
        {
          "title": "Atividade prática: Registro da decisão e plano de revisão",
          "type": "pratica",
          "duration": "1h",
          "summary": "No modelo de diário de decisões em Google Sheets, registre a decisão do seu projeto, mapeie os papéis com o modelo DACI, defina se e onde a IA entra e com qual supervisão, agende a revisão pós-decisão e proponha três ações de alfabetização de dados para a equipe nos próximos 90 dias. Entrega: registro e plano de revisão, oitavo entregável do projeto aplicado.",
          "practiceTool": "Google Sheets",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "No modelo DACI, quantas pessoas devem ocupar o papel de aprovador (Approver) em uma decisão?",
          "options": [
            "Nenhuma; a decisão é sempre do grupo.",
            "Uma só.",
            "Duas, para garantir equilíbrio.",
            "Todas as que forem afetadas pela decisão."
          ],
          "correctIndex": 1,
          "explanation": "Dois aprovadores é o mesmo que nenhum (aula 8.1). Os demais participam como condutor, contribuidores ou informados."
        },
        {
          "prompt": "Qual campo é essencial em um registro de decisão para permitir uma revisão justa no futuro?",
          "options": [
            "A lista de presença da reunião.",
            "As premissas que precisam ser verdadeiras para a decisão dar certo.",
            "O número de slides apresentados.",
            "A opinião pessoal de cada participante."
          ],
          "correctIndex": 1,
          "explanation": "As premissas mostram o que se sabia e se supunha no momento da decisão (aula 8.2). Na revisão, elas ajudam a separar premissa errada, execução e acaso."
        },
        {
          "prompt": "Uma decisão bem fundamentada teve resultado ruim por um evento imprevisível. Como classificá-la na revisão pós-decisão?",
          "options": [
            "Má decisão, porque o resultado foi ruim.",
            "Boa decisão com azar; punir aqui ensina a equipe a nunca arriscar.",
            "Sorte perigosa.",
            "Não é possível revisar decisões com resultado ruim."
          ],
          "correctIndex": 1,
          "explanation": "Julgar a decisão só pelo resultado é o chamado resultadismo (aula 8.3). A revisão olha o processo, não só o desfecho."
        },
        {
          "prompt": "Analistas aceitam 99% das sugestões de um sistema de IA sem abrir a justificativa. O que isso pode indicar?",
          "options": [
            "Que o sistema é perfeito.",
            "Viés de automação: a supervisão humana pode ter virado um carimbo.",
            "Que os analistas são muito produtivos.",
            "Que o nível de automação deve subir para decisão totalmente autônoma."
          ],
          "correctIndex": 1,
          "explanation": "Supervisão real exige tempo, informação, autoridade e incentivo para discordar (aula 8.5). Concordância perto de 100% é um sinal de alerta."
        },
        {
          "prompt": "O que o artigo 20 da LGPD garante ao titular dos dados?",
          "options": [
            "O direito de proibir qualquer uso de IA pela empresa.",
            "O direito de pedir revisão de decisões tomadas unicamente por tratamento automatizado que afetem seus interesses, e de receber informações sobre os critérios usados.",
            "O direito de acessar o código-fonte do sistema de IA.",
            "O direito de receber indenização sempre que uma decisão automatizada for negativa."
          ],
          "correctIndex": 1,
          "explanation": "O artigo 20 prevê a revisão de decisões automatizadas e informações claras sobre critérios, respeitados os segredos comercial e industrial (aula 8.6)."
        }
      ]
    }
  ],
  "library": [
    {
      "title": "Modelo da Ficha da decisão",
      "description": "Pergunta de negócio, tipo de análise, checklist de confiança dos dados e matriz evidência × risco.",
      "tool": "Google Sheets",
      "url": null
    },
    {
      "title": "Árvore de indicadores e ficha técnica",
      "description": "Modelo para decompor o resultado em alavancas, com fichas técnicas, metas e indicadores contrapeso.",
      "tool": "Google Sheets",
      "url": null
    },
    {
      "title": "Planilha de estatística para gestores",
      "description": "Média, mediana, desvio padrão, histograma, margem de erro e intervalo de confiança com fórmulas prontas.",
      "tool": "Google Sheets",
      "url": null
    },
    {
      "title": "Modelo de painel de uma página",
      "description": "Painel com cartões de KPI, tendência, comparação com a meta e alavancas, conectado a uma planilha de exemplo.",
      "tool": "Looker Studio",
      "url": null
    },
    {
      "title": "Checklist de vieses e roteiro de pré-mortem",
      "description": "Os vieses do decisor em uma página e o passo a passo do pré-mortem para reuniões de decisão.",
      "tool": "Google Docs",
      "url": null
    },
    {
      "title": "Calculadora de experimentos",
      "description": "Tamanho de amostra por MDE, leitura do resultado com intervalo de confiança e diferença-em-diferenças.",
      "tool": "Google Sheets",
      "url": null
    },
    {
      "title": "Planilha de previsão e cenários",
      "description": "Métodos de previsão, cálculo do MAPE, faixas de previsão, cenários com gatilhos e simulação de Monte Carlo.",
      "tool": "Google Sheets",
      "url": null
    },
    {
      "title": "Diário de decisões e matriz DACI",
      "description": "Registro de decisões, papéis DACI, nível de automação com IA e agenda de revisão pós-decisão.",
      "tool": "Google Sheets",
      "url": null
    }
  ],
  "nextSteps": [
    {
      "title": "Leve este programa para sua empresa",
      "description": "Turma fechada para gestores, com casos e indicadores adaptados ao setor da sua empresa e encontros ao vivo; investimento sob proposta.",
      "href": "/giselle/palestras?src=curso&c=decisoes-orientadas-por-dados#proposta",
      "label": "Solicitar proposta"
    },
    {
      "title": "Diagnóstico de maturidade em IA",
      "description": "Descubra em poucos minutos em que estágio sua empresa está no uso de dados e IA e por onde vale começar.",
      "href": "/diagnostico-ia?src=curso&c=decisoes-orientadas-por-dados",
      "label": "Fazer o diagnóstico"
    }
  ]
};
