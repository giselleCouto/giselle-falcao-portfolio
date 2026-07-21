import type { Course } from "./types";

// Gerado a partir do material pedagógico em docs/cursos/estatistica-padroes/
// Edite videoUrl / slidesUrl / practiceUrl conforme grava e publica os materiais.

export const estatisticaPadroes: Course = {
  "slug": "estatistica-padroes",
  "title": "Estatística e Reconhecimento de Padrões na Ciência de Dados",
  "level": "Intermediário",
  "hours": "32h",
  "free": false,
  "tagline": "A camada de profundidade que faltava: inferência, distâncias, PCA e clustering com rigor estatístico.",
  "description": "Aprofunde a estatística que sustenta a ciência de dados séria: distribuições, inferência, testes de hipótese e bootstrap — e domine o reconhecimento de padrões com extração de características, PCA, clustering avançado, classificadores estatísticos e detecção de anomalias. Com casos reais da indústria, do agro e da educação.",
  "outcomes": [
    "Identificar a distribuição por trás de um dado real (normal, lognormal, Poisson, binomial, exponencial) e usar o Teorema Central do Limite e o erro padrão para quantificar a incerteza de qualquer média",
    "Construir e interpretar intervalos de confiança, testes de hipótese e intervalos bootstrap, usando o p-valor da forma correta e distinguindo significância estatística de relevância prática",
    "Transformar dados brutos (sensores, imagens de lavoura, tabelas educacionais) em vetores de características e escolher a medida de distância ou similaridade adequada a cada problema",
    "Aplicar PCA e redução de dimensionalidade para comprimir, visualizar e interpretar dados de alta dimensão — incluindo a leitura de loadings e os limites de t-SNE/UMAP",
    "Agrupar com clustering hierárquico e DBSCAN, validar clusters com silhueta e estabilidade, e classificar com Bayes ingênuo, KNN e discriminantes lineares/quadráticos entendendo suas suposições",
    "Validar e comparar modelos com rigor estatístico (validação cruzada com incerteza, ROC/AUC, testes pareados) e detectar anomalias com métodos do z-score robusto ao Isolation Forest"
  ],
  "audience": "Analistas e cientistas de dados em início de carreira que já treinam modelos com scikit-learn (ou concluíram Fundamentos de ML) e querem o alicerce estatístico para interpretar, validar e defender seus resultados com rigor — em relatórios, entrevistas e discussões técnicas.",
  "prerequisites": "Python básico com pandas no Google Colab e noções de ML aplicado (regressão, classificação, clustering) — o equivalente ao curso Fundamentos de Machine Learning da Academy; a matemática necessária é construída em aula, com intuição antes de fórmula.",
  "status": "disponivel",
  "modules": [
    {
      "id": "modulo-1",
      "title": "A gramática da incerteza: distribuições, amostragem e o TCL",
      "duration": "4h30",
      "free": true,
      "lessons": [
        {
          "title": "Padrões nascem de distribuições: o alicerce estatístico da ciência de dados",
          "type": "video",
          "duration": "20min",
          "summary": "Giselle abre o curso mostrando que todo padrão — a assinatura de vibração de um motor saudável, a imagem de uma lavoura, as proficiências do SAEB — é, no fundo, uma distribuição de probabilidade. Apresenta variável aleatória, a normal como soma de muitos efeitos pequenos e o perigo de assumir normalidade sem verificar (o caso do alarme μ + 3σ que dispara três vezes por dia). Fecha com a tese do curso: reconhecer padrões é detectar mudanças de distribuição."
        },
        {
          "title": "O bestiário das distribuições: normal, lognormal, Poisson e binomial em dados brasileiros",
          "type": "leitura",
          "duration": "50min",
          "summary": "Leitura de referência com as cinco distribuições que cobrem a maior parte dos dados reais — normal (ruído de sensor), lognormal (renda, chuva), Poisson (defeitos por lote, focos de praga por hectare), binomial (germinação de sementes) e exponencial (tempo entre falhas) — cada uma com seu mecanismo gerador. Ensina a diagnosticar pelo histograma e introduz o QQ-plot como teste visual de normalidade, com atenção especial às caudas pesadas. Fecha com um checklist de 5 perguntas e a atividade de classificar três variáveis do próprio trabalho."
        },
        {
          "title": "Amostras, o Teorema Central do Limite e o erro padrão",
          "type": "video",
          "duration": "22min",
          "summary": "Você nunca vê a população — só amostras — e a média amostral é, ela mesma, uma variável aleatória. A aula constrói o TCL com o experimento das mil amostras de uma população torta, apresenta o erro padrão σ/√n e a lei do √n: para cortar o erro pela metade é preciso quadruplicar os dados. Fecha com os limites honestos do teorema: caudas pesadas, dependência temporal (autocorrelação de sensores) e n pequeno com σ desconhecido — o gancho para a t de Student."
        },
        {
          "title": "Distribuições e TCL na prática: sensores industriais no Colab",
          "type": "pratica",
          "duration": "2h",
          "summary": "No notebook starter, o aluno analisa 60 leituras de temperatura de mancal do motor M-07 (dados didáticos realistas embutidos): histograma, ajuste de normal com scipy.stats, QQ-plot e intervalo de ~95% para a média via erro padrão. Depois constrói o Teorema Central do Limite com as próprias mãos, simulando 2.000 médias amostrais de uma população exponencial e confirmando a lei do √n. Desafio final: diagnosticar se as 40 leituras de vibração de um segundo sensor são normais — e o que a cauda direita sugere sobre a máquina e sobre alarmes μ + 3σ.",
          "practiceTool": "Colab",
          "practiceUrl": "https://colab.research.google.com/github/giselleCouto/giselle-falcao-portfolio/blob/main/client/public/cursos/notebooks/estatistica-padroes-pratica-modulo1.ipynb"
        },
        {
          "title": "Quiz do Módulo 1 — Distribuições, amostragem e TCL",
          "type": "quiz",
          "duration": "20min",
          "summary": "Cinco questões objetivas com explicação comentada sobre a escolha de distribuição pelo mecanismo gerador (normal, Poisson), o enunciado correto do TCL, a lei do √n do erro padrão e a leitura de um QQ-plot com caudas pesadas. Duas tentativas; compõe a média de quizzes (40% da nota do curso)."
        }
      ],
      "quiz": [
        {
          "prompt": "Um sensor registra a cada hora a temperatura de um mancal de motor. As leituras se concentram simetricamente em torno de 62 °C, com pequenos desvios causados por muitos fatores somados (carga, ventilação, ruído elétrico). Qual distribuição tende a descrever bem esses dados?",
          "options": [
            "Normal, porque a soma de muitos efeitos pequenos e independentes tende ao formato de sino.",
            "Poisson, porque a temperatura é uma contagem de graus.",
            "Binomial, porque cada leitura é um sucesso ou um fracasso."
          ],
          "correctIndex": 0,
          "explanation": "Quando muitas perturbações pequenas e independentes se somam, o resultado tende à normal — é o mecanismo gerador clássico do sino. Poisson modela contagens de eventos raros (números inteiros), e a binomial exige ensaios de sim/não; temperatura é uma medida contínua."
        },
        {
          "prompt": "O número de defeitos encontrados por lote em uma linha de produção (0, 1, 2, 3…) — eventos raros e independentes contados em um intervalo fixo. Qual é o modelo natural?",
          "options": [
            "Normal, porque todo dado industrial tende ao sino.",
            "Poisson, a distribuição de contagens de eventos raros em intervalo fixo, cujo parâmetro λ é ao mesmo tempo a média e a variância.",
            "Lognormal, porque defeitos só assumem valores positivos."
          ],
          "correctIndex": 1,
          "explanation": "Contagem de eventos raros e independentes em intervalo fixo é o habitat da Poisson — e a assinatura dela é média ≈ variância. A normal é contínua e admite valores negativos; a lognormal modela medidas contínuas positivas e assimétricas, como renda, não contagens."
        },
        {
          "prompt": "O que o Teorema Central do Limite garante?",
          "options": [
            "Que qualquer conjunto de dados, com n grande, torna-se normalmente distribuído.",
            "Que a distribuição das MÉDIAS amostrais se aproxima da normal quando n cresce, mesmo que a população original não seja normal.",
            "Que amostras grandes eliminam o erro de estimação."
          ],
          "correctIndex": 1,
          "explanation": "O TCL domestica a distribuição do estimador (médias e somas), não a dos dados — a renda continua assimétrica com um milhão de registros. E o erro de estimação nunca desaparece: ele diminui na proporção de 1/√n, que é justamente o erro padrão."
        },
        {
          "prompt": "O erro padrão da temperatura média de um sensor é 0,4 °C com 100 leituras. Aproximadamente quantas leituras são necessárias para reduzi-lo a 0,2 °C?",
          "options": [
            "200 leituras — o dobro.",
            "400 leituras — o quádruplo.",
            "150 leituras — mais 50%."
          ],
          "correctIndex": 1,
          "explanation": "Erro padrão = σ/√n. Para dividi-lo por 2, é preciso multiplicar n por 4 (√400/√100 = 2). É a lei do √n: cada ganho de precisão custa quadraticamente mais dados — a conta que acompanha qualquer orçamento de coleta."
        },
        {
          "prompt": "No QQ-plot das suas leituras contra a normal teórica, os pontos seguem bem a reta no centro, mas fogem dela para fora nas duas pontas. O diagnóstico correto é:",
          "options": [
            "Os dados são perfeitamente normais — as pontas de um QQ-plot sempre escapam.",
            "Caudas mais pesadas que a normal: valores extremos são mais frequentes do que a normal prevê, e limites do tipo μ ± 3σ subestimarão a taxa de eventos raros.",
            "Erro de construção do gráfico — QQ-plots corretos são sempre retas perfeitas."
          ],
          "correctIndex": 1,
          "explanation": "Pontas fugindo para fora da reta são a assinatura visual de caudas pesadas. A consequência prática é séria: alarmes e detectores calibrados pela regra 68–95–99,7 dispararão muito mais (ou confiarão menos) do que o projetado — tema que volta com força na detecção de anomalias do módulo 6."
        }
      ]
    },
    {
      "id": "modulo-2",
      "title": "Inferência: intervalos de confiança, testes de hipótese e bootstrap",
      "duration": "5h15",
      "free": false,
      "lessons": [
        {
          "title": "Intervalos de confiança: o tamanho honesto da dúvida",
          "type": "video",
          "duration": "22min",
          "summary": "Do erro padrão ao intervalo de confiança: construção do IC 95% para médias e proporções, a distribuição t de Student quando o n é pequeno e o σ é desconhecido, e a interpretação frequencial correta ao lado das duas interpretações erradas mais comuns. Exemplos com talhões de soja e indicadores educacionais: reportar '82 ± 4 sacas' muda a conversa com o cliente."
        },
        {
          "title": "Testes de hipótese e o p-valor bem usado",
          "type": "video",
          "duration": "25min",
          "summary": "A lógica do teste de hipótese como advogado do diabo: H0, estatística de teste e o que o p-valor realmente mede — a probabilidade dos dados sob H0, nunca a probabilidade de H0. Cobre erro tipo I e II, poder estatístico, o perigo das comparações múltiplas e do p-hacking, e a diferença entre significância estatística e relevância prática, na linha das recomendações da American Statistical Association. Reporte profissional: efeito + IC + contexto."
        },
        {
          "title": "Correlação não é causalidade — agora com rigor: confundidores, Simpson e DAGs",
          "type": "leitura",
          "duration": "60min",
          "summary": "Leitura aprofundada que eleva o mantra a método: variáveis de confusão, causalidade reversa e o paradoxo de Simpson com exemplo numérico completo em dados educacionais — o método que vence em todos os subgrupos e perde no agregado. Introduz diagramas causais (DAGs) como ferramenta de raciocínio, incluindo por que controlar a variável errada piora a análise. Fecha com a hierarquia de evidência (observacional × experimento) e o checklist de 5 perguntas antes de qualquer frase causal."
        },
        {
          "title": "Bootstrap e testes na prática: comparando dois manejos agrícolas no Colab",
          "type": "pratica",
          "duration": "2h20",
          "summary": "Com dados de exemplo de 30 + 30 talhões de soja sob manejo convencional e plantio direto, o aluno percorre o fluxo completo de inferência: teste t de Welch com scipy, checagem de pressupostos, alternativa não paramétrica (Mann-Whitney) e IC bootstrap para diferenças de médias e medianas com 10.000 reamostras — a técnica que dispensa fórmula fechada. Inclui simulação de poder para dimensionar amostras. Desafio: escrever a conclusão executiva de 5 linhas com efeito, IC e ressalva, sem usar a palavra 'provado'.",
          "practiceTool": "Colab"
        },
        {
          "title": "Quiz do Módulo 2 — Inferência estatística",
          "type": "quiz",
          "duration": "20min",
          "summary": "Cinco questões objetivas com explicação comentada sobre a interpretação correta de um IC 95%, o que o p-valor mede (e o que não mede), significância estatística versus relevância prática com n gigante, o bootstrap para estatísticas sem fórmula fechada e o paradoxo de Simpson. Duas tentativas; compõe a média de quizzes."
        }
      ],
      "quiz": [
        {
          "prompt": "Um IC de 95% para a produtividade média deu [78, 86] sacas/ha. A interpretação correta é:",
          "options": [
            "95% dos talhões produzem entre 78 e 86 sacas/ha.",
            "Se repetíssemos o estudo muitas vezes, cerca de 95% dos intervalos construídos dessa forma conteriam a média verdadeira — este intervalo é a nossa faixa de valores plausíveis para ela.",
            "Há 95% de probabilidade de o próximo talhão produzir dentro desse intervalo."
          ],
          "correctIndex": 1,
          "explanation": "O IC quantifica a incerteza sobre a MÉDIA populacional, não sobre talhões individuais (isso seria um intervalo de predição, bem mais largo). A confiança de 95% é uma propriedade do procedimento repetido, não uma probabilidade sobre este intervalo específico."
        },
        {
          "prompt": "O teste retornou p = 0,03. Isso significa que:",
          "options": [
            "A probabilidade de a hipótese nula ser verdadeira é de 3%.",
            "Se a hipótese nula fosse verdadeira, dados tão ou mais extremos que os observados ocorreriam em cerca de 3% das repetições do experimento.",
            "O efeito encontrado tem 97% de chance de se repetir em um novo estudo."
          ],
          "correctIndex": 1,
          "explanation": "O p-valor é P(dados | H0), nunca P(H0 | dados) — confundir as duas direções é o erro mais comum da inferência aplicada. Ele também não mede replicabilidade nem tamanho do efeito: um p pequeno com efeito ínfimo pode ser irrelevante na prática."
        },
        {
          "prompt": "Com 2 milhões de registros, uma diferença de 0,1% entre dois grupos resultou em p < 0,001. A leitura profissional é:",
          "options": [
            "O efeito é importante, pois o p-valor é minúsculo.",
            "Significância estatística não é relevância prática: com n gigante, efeitos ínfimos ficam 'significativos' — reporte o tamanho do efeito com IC e discuta se 0,1% muda alguma decisão.",
            "O teste deve estar errado, pois diferenças pequenas nunca atingem significância."
          ],
          "correctIndex": 1,
          "explanation": "O p-valor mistura tamanho do efeito com tamanho da amostra — com n enorme, qualquer diferença não nula fica 'significativa'. A pergunta de negócio é sempre sobre o efeito e sua incerteza (IC), não sobre cruzar o limiar de 0,05."
        },
        {
          "prompt": "Você precisa de um IC de 95% para a MEDIANA do tempo entre falhas — estatística sem fórmula fechada simples. A ferramenta indicada é:",
          "options": [
            "Bootstrap: reamostrar os dados com reposição milhares de vezes, calcular a mediana em cada reamostra e usar os percentis 2,5% e 97,5% da distribuição resultante.",
            "Assumir normalidade e usar mediana ± 2 desvios-padrão.",
            "Nenhuma — apenas médias admitem intervalo de confiança."
          ],
          "correctIndex": 0,
          "explanation": "O bootstrap estima a distribuição amostral de praticamente qualquer estatística reamostrando os próprios dados — é o canivete suíço da incerteza. Mediana ± 2 desvios mistura conceitos (o desvio-padrão descreve os dados, não a variabilidade da mediana), e ICs existem para qualquer parâmetro estimável."
        },
        {
          "prompt": "Em cada uma de duas escolas, o método B supera o método A em todos os subgrupos de alunos; no agregado das duas, A parece melhor. Esse padrão é:",
          "options": [
            "O paradoxo de Simpson: uma variável de confusão (a composição dos grupos) inverte a conclusão agregada — a análise deve controlar essa variável, e aqui a leitura por subgrupo é a mais confiável.",
            "Impossível — se B vence em todos os subgrupos, vence necessariamente no agregado.",
            "Evidência de fraude na coleta dos dados."
          ],
          "correctIndex": 0,
          "explanation": "Quando os grupos têm composições muito diferentes (ex.: B foi aplicado majoritariamente nas turmas de maior dificuldade), a agregação mistura efeitos e pode inverter o sinal. É perfeitamente possível aritmeticamente — e é o argumento definitivo para sempre perguntar 'controlado por quê?' antes de aceitar uma comparação."
        }
      ]
    },
    {
      "id": "modulo-3",
      "title": "O que é um padrão: features, distâncias e similaridade",
      "duration": "5h",
      "free": false,
      "lessons": [
        {
          "title": "Do pixel ao vetor: o que é um padrão para a máquina",
          "type": "video",
          "duration": "22min",
          "summary": "O conceito central do reconhecimento de padrões: representar objetos do mundo — imagem de lavoura, janela de sinal de sensor, aluno em uma avaliação — como vetores de características em um espaço matemático. Giselle mostra como seus projetos transformam pixels em índices de vegetação e séries de vibração em estatísticas de janela, e por que a qualidade das features decide o projeto antes do algoritmo: o modelo enxerga o mundo que as suas features descrevem, nenhum pixel a mais."
        },
        {
          "title": "Engenharia de características estatísticas: momentos, janelas e normalização",
          "type": "leitura",
          "duration": "50min",
          "summary": "Catálogo prático de features estatísticas: momentos (média, variância, assimetria, curtose) com leitura física, RMS e fator de crista para sinais, percentis, janelas deslizantes, histogramas de cor e texturas para imagens, e features tabulares derivadas. Aprofunda padronização z-score versus normalização min-max, quando cada uma é obrigatória e o vazamento sutil de padronizar antes de separar treino e teste. Atividade: propor 5 features para um problema do próprio trabalho e justificar cada uma."
        },
        {
          "title": "Réguas do espaço: distâncias euclidiana, Manhattan, Mahalanobis e cosseno",
          "type": "video",
          "duration": "25min",
          "summary": "Toda noção de 'parecido' esconde uma métrica: a aula compara euclidiana (sensível a escala), Manhattan (robusta), Mahalanobis (que desconta escala e correlação — a elipse no lugar do círculo) e a similaridade de cosseno (direção sem magnitude), com critérios de escolha por tipo de dado. Fecha com a maldição da dimensionalidade — em alta dimensão as distâncias se concentram e a vizinhança perde significado — motivando a redução de dimensionalidade do módulo 4."
        },
        {
          "title": "Assinaturas de máquinas: extraindo features de sensores e medindo similaridade no Colab",
          "type": "pratica",
          "duration": "2h20",
          "summary": "O aluno recebe séries de vibração simuladas de 8 motores (saudáveis, desgastado e um 'disfarçado'), extrai 6 features estatísticas por janela com numpy e scipy, padroniza e calcula matrizes de distância euclidiana e de Mahalanobis para descobrir quais máquinas se parecem — visualizando tudo em heatmaps. Desafio: identificar o motor 'disfarçado' — normal na média e no desvio, anômalo na curtose — e explicar por que só a feature certa o revela.",
          "practiceTool": "Colab"
        },
        {
          "title": "Quiz do Módulo 3 — Features e distâncias",
          "type": "quiz",
          "duration": "20min",
          "summary": "Cinco questões objetivas com explicação comentada sobre padronização antes de distâncias, quando usar similaridade de cosseno, a vantagem da Mahalanobis sobre a euclidiana, a maldição da dimensionalidade e a extração de features estatísticas de janelas de sinal. Duas tentativas; compõe a média de quizzes."
        }
      ],
      "quiz": [
        {
          "prompt": "Você vai calcular distâncias euclidianas entre máquinas descritas por temperatura (60–70 °C), vibração (2–5 mm/s) e corrente (100–400 A). Antes disso, é preciso:",
          "options": [
            "Padronizar as variáveis (z-score), senão a corrente — de escala numérica muito maior — domina a distância e as demais viram figurantes.",
            "Nada: a distância euclidiana é imune a diferenças de escala.",
            "Converter todas as variáveis para a mesma unidade física."
          ],
          "correctIndex": 0,
          "explanation": "A euclidiana soma quadrados de diferenças brutas — uma diferença de 50 A pesa 2.500, enquanto 0,5 mm/s pesa 0,25. Padronizar coloca todas as variáveis em desvios-padrão, dando voz igual a cada uma. Não existe conversão física entre ampère e milímetro por segundo — a solução é estatística, não de unidades."
        },
        {
          "prompt": "Em problemas onde importa a proporção entre as componentes do vetor, e não seu tamanho total (perfis de consumo, textos vetorizados), a medida indicada é:",
          "options": [
            "Distância euclidiana sem padronização.",
            "Similaridade de cosseno, que compara a direção dos vetores ignorando a magnitude.",
            "Distância de Manhattan."
          ],
          "correctIndex": 1,
          "explanation": "O cosseno mede o ângulo entre vetores — dois clientes com o mesmo padrão de consumo em escalas diferentes (um gasta 10× mais) ficam próximos. Euclidiana e Manhattan misturam forma do perfil com tamanho, separando vetores que apontam para o mesmo lado."
        },
        {
          "prompt": "A vantagem da distância de Mahalanobis sobre a euclidiana com dados padronizados é:",
          "options": [
            "Ser computacionalmente mais barata.",
            "Levar em conta a correlação entre as variáveis: um ponto pode parecer próximo em cada eixo isoladamente, mas ser muito improvável considerando a estrutura conjunta dos dados.",
            "Funcionar apenas com duas variáveis, o que simplifica a análise."
          ],
          "correctIndex": 1,
          "explanation": "A Mahalanobis usa a matriz de covariância inteira — mede distância em 'elipses de probabilidade' e detecta combinações incomuns (temperatura alta COM corrente baixa) que a euclidiana, cega às correlações, não vê. Custa mais caro computacionalmente, não menos, e funciona em qualquer dimensão."
        },
        {
          "prompt": "A 'maldição da dimensionalidade' afirma que, em espaços com muitas features:",
          "options": [
            "Os cálculos apenas ficam mais lentos, sem consequência estatística.",
            "As distâncias entre todos os pares de pontos tendem a se concentrar em valores parecidos, degradando métodos baseados em vizinhança como KNN e clustering.",
            "Torna-se obrigatório usar a distância de Manhattan."
          ],
          "correctIndex": 1,
          "explanation": "Em alta dimensão, o contraste entre o vizinho mais próximo e o mais distante encolhe — 'todo mundo fica longe de todo mundo' — e a noção de vizinhança perde poder discriminativo. É um fenômeno estatístico, não computacional, e é a motivação central da redução de dimensionalidade do módulo 4."
        },
        {
          "prompt": "Para transformar uma janela de 10 segundos de sinal de vibração (milhares de pontos) em entrada para um classificador, a prática deste módulo usa:",
          "options": [
            "Passar os milhares de pontos crus diretamente ao modelo, sempre.",
            "Extrair um vetor de características estatísticas da janela (média, desvio, RMS, curtose) que resume a assinatura do sinal em poucas dimensões comparáveis.",
            "Usar apenas o valor máximo da janela, descartando o resto."
          ],
          "correctIndex": 1,
          "explanation": "Features estatísticas comprimem a janela preservando a assinatura que interessa (nível, espalhamento, impulsividade) e tornam sinais de durações diferentes comparáveis. Pontos crus em alta dimensão alimentam a maldição da dimensionalidade; só o máximo joga fora quase toda a informação — inclusive a curtose que denuncia rolamento desgastado."
        }
      ]
    },
    {
      "id": "modulo-4",
      "title": "PCA e redução de dimensionalidade",
      "duration": "5h15",
      "free": false,
      "lessons": [
        {
          "title": "A intuição do PCA: encontrando os eixos que importam",
          "type": "video",
          "duration": "25min",
          "summary": "PCA sem álgebra sofrida: a nuvem de dados tem direções de maior variância, e as componentes principais são os novos eixos que capturam o máximo de informação com o mínimo de dimensões — rotação de eixos, não criação de informação. Construção geométrica em 2D, o papel da matriz de covariância (reencontro com a Mahalanobis) e a leitura de componentes como índices que resumem variáveis correlacionadas — como um índice socioeconômico que emerge de dados escolares."
        },
        {
          "title": "PCA na prática: variância explicada, scree plot e loadings",
          "type": "video",
          "duration": "22min",
          "summary": "O fluxo de trabalho completo com scikit-learn: padronizar antes (quase sempre), ler a variância explicada acumulada, escolher componentes pelo scree plot e — a parte que separa profissionais — interpretar loadings para batizar as componentes. Inclui os erros clássicos: PCA sem padronizar, interpretar componente como causa, esquecer que o PCA é linear — e os cenários em que é melhor não usar PCA."
        },
        {
          "title": "Além do PCA: t-SNE, UMAP e seleção de características — mapas úteis e suas mentiras",
          "type": "leitura",
          "duration": "50min",
          "summary": "Quando a estrutura é não linear, entram t-SNE e UMAP: como funcionam por vizinhanças, para que servem (visualização exploratória) e o que seus mapas NÃO garantem — tamanhos de cluster e distâncias globais não devem ser interpretados literalmente. Traz regras de leitura honesta (rodar mais de uma vez, variar hiperparâmetros, nunca medir distâncias no mapa), compara extração versus seleção de features e fecha com um guia de decisão: qual técnica para qual objetivo."
        },
        {
          "title": "Vinte sensores, três componentes: PCA em dados industriais no Colab",
          "type": "pratica",
          "duration": "2h30",
          "summary": "Com um dataset de exemplo de 200 instantes e 20 variáveis de processo de uma planta industrial, o aluno padroniza, aplica PCA, escolhe componentes pelo scree plot, interpreta loadings em heatmap e visualiza o processo em 2D — descobrindo que dois regimes de operação aparecem sem nenhum rótulo. Desafio: projetar uma amostra nova 'suspeita' no espaço das componentes e argumentar, pela posição dela, se é operação normal — antecipando a detecção de anomalias do módulo 6.",
          "practiceTool": "Colab"
        },
        {
          "title": "Quiz do Módulo 4 — PCA e redução de dimensionalidade",
          "type": "quiz",
          "duration": "20min",
          "summary": "Cinco questões objetivas com explicação comentada sobre o que é a primeira componente principal, por que padronizar antes do PCA, a leitura da variância explicada, o papel dos loadings na interpretação e os limites dos mapas de t-SNE. Duas tentativas; compõe a média de quizzes."
        }
      ],
      "quiz": [
        {
          "prompt": "A primeira componente principal de um PCA é:",
          "options": [
            "A variável original que tem a maior variância.",
            "A combinação linear das variáveis que captura a maior variância possível dos dados — o eixo ao longo do qual a nuvem mais se espalha.",
            "Sempre a média aritmética de todas as variáveis."
          ],
          "correctIndex": 1,
          "explanation": "O PCA não escolhe variáveis, ele constrói novos eixos girando o sistema de coordenadas; a PC1 é a direção de maior espalhamento da nuvem. Só coincide com uma variável original se as demais forem irrelevantes, e só se parece com uma média quando todas as variáveis são fortemente correlacionadas entre si."
        },
        {
          "prompt": "Por que padronizar as variáveis antes do PCA quando elas têm unidades diferentes?",
          "options": [
            "Porque o PCA maximiza variância: sem padronizar, a variável de maior escala numérica 'sequestra' as primeiras componentes, independentemente de sua importância real.",
            "Porque o algoritmo do PCA só aceita valores entre 0 e 1.",
            "Padronizar nunca é necessário — o PCA é invariante a escalas."
          ],
          "correctIndex": 0,
          "explanation": "Variância depende da unidade — pressão em Pa (milhares) esmaga temperatura em °C (dezenas). Padronizar dá variância 1 a todas, e as componentes passam a refletir estrutura de correlação, não escolha de unidades. O PCA aceita qualquer faixa de valores; ele apenas responde de forma diferente (e enganosa) sem padronização."
        },
        {
          "prompt": "Com 20 sensores, as 3 primeiras componentes explicam 85% da variância. Isso significa que:",
          "options": [
            "Qualquer modelo treinado nas 3 componentes terá 85% de acurácia.",
            "Trabalhando em 3 dimensões em vez de 20, retemos 85% da variabilidade total dos dados — compressão que facilita visualização e modelagem ao custo dos 15% restantes.",
            "17 dos 20 sensores estão com defeito e devem ser removidos."
          ],
          "correctIndex": 1,
          "explanation": "Variância explicada mede fidelidade da compressão, não desempenho de modelo — os 15% descartados podem até conter o sinal relevante para uma tarefa específica, por isso sempre se valida depois. E componentes descartadas não apontam sensores ruins: cada componente mistura todos os sensores."
        },
        {
          "prompt": "Os loadings (cargas) de uma componente principal servem para:",
          "options": [
            "Medir a acurácia final do PCA.",
            "Interpretar a componente: mostram o peso de cada variável original na sua composição, permitindo 'batizá-la' (ex.: componente de carga térmica, se temperatura e corrente pesam juntas).",
            "Definir a taxa de aprendizado do algoritmo."
          ],
          "correctIndex": 1,
          "explanation": "O loading é o coeficiente de cada variável original na combinação linear da componente — a ponte entre o espaço abstrato e a física ou o negócio. É a leitura dos loadings que separa 'reduzi para 3 dimensões' de 'descobri que o processo tem três modos: térmico, hidráulico e elétrico'. PCA não tem acurácia nem taxa de aprendizado."
        },
        {
          "prompt": "No mapa 2D de um t-SNE, dois clusters aparecem muito distantes um do outro. A leitura correta é:",
          "options": [
            "A distância entre eles no mapa mede fielmente a dissimilaridade real dos grupos.",
            "O t-SNE preserva vizinhanças locais, não distâncias globais: os grupos existem, mas o espaçamento e o tamanho aparente dos clusters no mapa não devem ser interpretados literalmente.",
            "O t-SNE falhou e deve ser reexecutado até os clusters se aproximarem."
          ],
          "correctIndex": 1,
          "explanation": "O t-SNE otimiza a preservação de vizinhanças, distorcendo livremente distâncias e densidades globais — clusters 'longe' podem ser vizinhos no espaço original, e tamanhos de cluster são artefato da perplexidade. O mapa serve para descobrir estrutura, nunca para medi-la; medições se fazem no espaço original ou nas componentes do PCA."
        }
      ]
    },
    {
      "id": "modulo-5",
      "title": "Clustering avançado e classificadores estatísticos",
      "duration": "5h15",
      "free": false,
      "lessons": [
        {
          "title": "Clustering hierárquico: o dendrograma como lupa dos dados",
          "type": "video",
          "duration": "22min",
          "summary": "Além do K-means: o clustering hierárquico aglomerativo passo a passo, os métodos de ligação (simples, completa, média, Ward) e como cada um deforma os grupos, a leitura de dendrogramas — altura de fusão como dissimilaridade — e a escolha do corte. Exemplo condutor: agrupar escolas por perfil de indicadores educacionais, onde a hierarquia revela estrutura aninhada que um k fixo esconderia."
        },
        {
          "title": "DBSCAN e validação de clusters: silhueta, estabilidade e ceticismo",
          "type": "video",
          "duration": "22min",
          "summary": "DBSCAN encontra clusters por densidade — formas arbitrárias, sem k pré-definido e com pontos de ruído explícitos — ao custo de calibrar eps e min_samples (com o gráfico de k-distâncias). A segunda metade é sobre honestidade: silhueta bem lida, comparação com dados aleatorizados e estabilidade sob reamostragem, porque algoritmo de clustering sempre devolve clusters — existirem de verdade é outra história."
        },
        {
          "title": "Classificadores estatísticos: Bayes ingênuo, KNN e discriminantes",
          "type": "video",
          "duration": "25min",
          "summary": "O teorema de Bayes como máquina de classificar: priors, verossimilhanças e posterior; Naive Bayes e sua suposição de independência condicional (falsa em geral, útil mesmo assim); KNN como classificador por vizinhança, com sua dependência total da métrica, da escala e do k (viés × variância); e os discriminantes LDA/QDA com fronteiras lineares e quadráticas. Fecha com a tabela de decisão — qual classificador para qual cenário — e a conexão com o que o scikit-learn faz por baixo do capô."
        },
        {
          "title": "Padrões de lavoura: clustering e classificação de talhões no Colab",
          "type": "pratica",
          "duration": "2h50",
          "summary": "Com features de exemplo extraídas de imagens de lavoura (índices de vegetação, solo exposto e textura de 90 talhões), o aluno aplica clustering hierárquico e DBSCAN, valida com silhueta e baseline embaralhado, e depois treina Naive Bayes, KNN e LDA na parte rotulada (saudável × estresse hídrico × infestação), comparando os três e visualizando fronteiras com o PCA do módulo anterior. Desafio: recomendar ao agrônomo um classificador e defender a escolha com números e uma ressalva.",
          "practiceTool": "Colab"
        },
        {
          "title": "Quiz do Módulo 5 — Clustering avançado e classificadores",
          "type": "quiz",
          "duration": "25min",
          "summary": "Cinco questões objetivas com explicação comentada sobre a leitura de dendrogramas, as vantagens do DBSCAN sobre o K-means, a interpretação da silhueta próxima de zero, a suposição de independência do Naive Bayes e o efeito do k no KNN. Duas tentativas; compõe a média de quizzes."
        }
      ],
      "quiz": [
        {
          "prompt": "Em um dendrograma de clustering hierárquico, a altura em que dois grupos se fundem representa:",
          "options": [
            "O número total de pontos contidos nos dois grupos.",
            "A dissimilaridade entre eles no momento da fusão — fusões altas unem grupos muito diferentes, e cortar o dendrograma abaixo delas revela a estrutura natural dos dados.",
            "A ordem alfabética dos rótulos das observações."
          ],
          "correctIndex": 1,
          "explanation": "O eixo vertical do dendrograma é a distância (segundo o método de ligação escolhido) em que a fusão ocorreu. Saltos grandes de altura são a dica visual clássica para o corte: os grupos unidos ali já eram 'espécies' bem distintas."
        },
        {
          "prompt": "A principal vantagem do DBSCAN sobre o K-means é:",
          "options": [
            "Ser sempre mais rápido em qualquer volume de dados.",
            "Encontrar clusters de forma arbitrária por densidade, sem exigir o número de clusters de antemão, e marcar explicitamente pontos de ruído que não pertencem a grupo algum.",
            "Não possuir nenhum hiperparâmetro para calibrar."
          ],
          "correctIndex": 1,
          "explanation": "O K-means impõe k e clusters convexos 'em bola', e força todo ponto para dentro de algum grupo; o DBSCAN segue a densidade (formas alongadas, anéis) e devolve ruído como categoria própria — precioso em anomalias. O preço: calibrar eps e min_samples, que são hiperparâmetros bem reais."
        },
        {
          "prompt": "Uma solução de clustering obteve silhueta média de 0,08 (próxima de zero). Isso indica:",
          "options": [
            "Clusters excelentes, compactos e bem separados.",
            "Estrutura de grupos fraca: os pontos estão, em média, quase tão próximos de clusters vizinhos quanto do próprio — a 'descoberta' pode ser artefato do algoritmo, e vale comparar com dados aleatorizados.",
            "Que basta normalizar a silhueta para que ela chegue a 1."
          ],
          "correctIndex": 1,
          "explanation": "Silhueta perto de 1 = ponto muito mais próximo do seu cluster que do vizinho; perto de 0 = fronteira indefinida; negativa = provável atribuição errada. Média 0,08 sugere que o algoritmo apenas fatiou uma nuvem contínua — o teste do embaralhamento diz se há estrutura real além do acaso."
        },
        {
          "prompt": "A suposição 'ingênua' do classificador Naive Bayes é:",
          "options": [
            "Que todas as classes têm exatamente a mesma probabilidade a priori.",
            "Que as features são condicionalmente independentes dada a classe — falsa em geral, mas que ainda produz classificadores úteis, rápidos e surpreendentemente competitivos em alta dimensão.",
            "Que os dados seguem distribuição uniforme em todas as dimensões."
          ],
          "correctIndex": 1,
          "explanation": "O 'ingênuo' está em fatorar P(x₁,…,xₚ|classe) como produto das marginais, ignorando correlações entre features. O modelo erra as probabilidades absolutas, mas frequentemente acerta o ranking entre classes — por isso classifica bem mesmo com a suposição violada. Priors desiguais são permitidos e estimados dos dados."
        },
        {
          "prompt": "No KNN, usar k muito pequeno (por exemplo, k = 1) tende a causar:",
          "options": [
            "Underfitting, pois o modelo se torna simples demais.",
            "Overfitting: a decisão fica refém do vizinho mais próximo — inclusive de ruído e outliers — criando fronteiras irregulares que não generalizam.",
            "Nenhum efeito, pois o KNN não possui hiperparâmetros."
          ],
          "correctIndex": 1,
          "explanation": "k controla o trade-off viés × variância do KNN — k=1 memoriza o treino (variância alta), k enorme dilui tudo na classe majoritária (viés alto). O k é hiperparâmetro central, escolhido por validação; e, como todo método de vizinhança, o KNN ainda depende criticamente da escala e da métrica (módulo 3)."
        }
      ]
    },
    {
      "id": "modulo-6",
      "title": "Validação estatística de modelos e detecção de anomalias",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Seu modelo é bom mesmo? Validação com incerteza e comparação estatística de modelos",
          "type": "video",
          "duration": "25min",
          "summary": "Acurácia única é uma amostra de tamanho 1: a aula ensina a reportar validação cruzada com média, desvio e IC, a ler ROC/AUC como qualidade de ordenação independente de limiar e a comparar dois modelos com teste estatístico (t pareado nos folds, McNemar) em vez de declarar vencedor por 0,4 ponto percentual. Cobre também as armadilhas — variância entre folds, testes repetidos, otimismo da seleção de modelo. O hábito que separa relatório amador de relatório defensável."
        },
        {
          "title": "Detecção de anomalias: do z-score robusto ao Isolation Forest",
          "type": "leitura",
          "duration": "60min",
          "summary": "Panorama rigoroso de detecção de anomalias: taxonomia (pontual, contextual, coletiva), z-score e seus limites, versões robustas com mediana e MAD, IQR, distância de Mahalanobis, Isolation Forest e LOF — e as cartas de controle de Shewhart que a indústria usa há um século. Discute a calibração do limiar como decisão de negócio (taxa de alarmes falsos) com casos de sensores e de dados educacionais. Fecha com o protocolo da casa: anomalia detectada é hipótese para investigar, não veredito."
        },
        {
          "title": "Projeto final: pipeline de padrões e anomalias em sensores industriais no Colab",
          "type": "pratica",
          "duration": "3h",
          "summary": "O projeto integrador do curso: a partir de dados de exemplo de uma frota de 12 motores com falhas rotuladas, o aluno constrói o pipeline completo — features por janela, padronização, PCA com leitura de loadings, clustering validado dos regimes de operação, classificador do estado da máquina com validação cruzada e IC, e detector de anomalias (robusto + Isolation Forest) com limiar estatisticamente justificado. Entrega notebook + resumo executivo de 10 linhas com efeitos, ICs e ressalvas; avaliado por rubrica, é a principal evidência do certificado.",
          "practiceTool": "Colab"
        },
        {
          "title": "Do padrão à decisão: fechamento e próximos passos",
          "type": "video",
          "duration": "18min",
          "summary": "Síntese da jornada — da distribuição ao pipeline — e o mapa do que vem depois: modelos probabilísticos mais ricos, séries temporais, deep learning para padrões em imagem e a ponte com interpretabilidade de modelos (SHAP), que conecta com a prática de consultoria da professora. Orientações de portfólio com os notebooks do curso e como demonstrar rigor estatístico em entrevistas técnicas."
        },
        {
          "title": "Quiz do Módulo 6 — Validação e anomalias",
          "type": "quiz",
          "duration": "25min",
          "summary": "Cinco questões objetivas com explicação comentada sobre comparação de modelos frente à variabilidade entre folds, a interpretação probabilística da AUC, o mascaramento de outliers na regra média ± 3 desvios, a intuição do Isolation Forest e o protocolo correto diante de uma anomalia detectada. Duas tentativas; compõe a média de quizzes."
        }
      ],
      "quiz": [
        {
          "prompt": "O modelo A obteve 91,2% e o modelo B 90,8% de acurácia média em validação cruzada, com desvio de ±1,5 ponto percentual entre folds. A conclusão profissional é:",
          "options": [
            "A é superior e deve ser declarado vencedor imediatamente.",
            "A diferença (0,4 ponto) é menor que a variabilidade entre folds: sem um teste estatístico (como t pareado nos folds), não há evidência de superioridade real — e critérios como simplicidade e custo podem decidir a escolha.",
            "B é superior, porque números mais redondos generalizam melhor."
          ],
          "correctIndex": 1,
          "explanation": "A acurácia média de CV é uma estimativa com incerteza — 0,4 ponto de diferença dentro de ±1,5 de ruído é indistinguível de empate. O teste pareado nos folds usa o fato de ambos os modelos verem os mesmos dados; sem evidência de diferença, escolhe-se pelo resto: interpretabilidade, latência, manutenção."
        },
        {
          "prompt": "AUC = 0,93 em um classificador binário significa que:",
          "options": [
            "O modelo acerta 93% de todas as previsões que faz.",
            "Sorteando ao acaso um exemplo positivo e um negativo, o modelo atribui score maior ao positivo em cerca de 93% das vezes — qualidade de ordenação, independente do limiar de decisão.",
            "93% dos casos positivos são detectados quando o limiar é 0,5."
          ],
          "correctIndex": 1,
          "explanation": "A AUC resume a curva ROC inteira e tem essa interpretação probabilística elegante — mede o quão bem o modelo ordena, sem fixar limiar. Acurácia e recall dependem do limiar escolhido (e do balanceamento das classes); a AUC, não. Modelos com mesma AUC podem ter acurácias bem diferentes no 0,5."
        },
        {
          "prompt": "Para detectar outliers em uma variável que já contém valores extremos, usar 'média ± 3 desvios-padrão' é problemático porque:",
          "options": [
            "Os próprios outliers inflam a média e o desvio-padrão, mascarando uns aos outros; medidas robustas como mediana e MAD (ou o critério do IQR) resistem a essa contaminação.",
            "A regra dos 3 sigmas só é válida para dados de sensores industriais.",
            "O desvio-padrão não pode ser matematicamente calculado na presença de outliers."
          ],
          "correctIndex": 0,
          "explanation": "É o efeito de mascaramento — um outlier gigante estica o desvio, e o limite μ ± 3σ abre tanto que engole os demais extremos. Mediana e MAD quase não se movem com contaminação moderada, por isso o z-score robusto é o padrão profissional. A regra 3σ vale para qualquer dado aproximadamente normal — e falha em qualquer um contaminado."
        },
        {
          "prompt": "A intuição central do Isolation Forest é:",
          "options": [
            "Anomalias formam sempre o menor cluster encontrado pelo K-means.",
            "Anomalias são mais fáceis de isolar: partições aleatórias separam um ponto anômalo do resto com poucos cortes, então profundidade média pequena nas árvores equivale a score alto de anomalia.",
            "Anomalias são sempre os pontos com os maiores valores absolutos."
          ],
          "correctIndex": 1,
          "explanation": "Em vez de modelar o normal e medir desvio, o Isolation Forest ataca a anomalia diretamente — pontos raros e distantes caem em folhas rasas de árvores de partição aleatória. Funciona em alta dimensão e sem assumir distribuição; e anomalias multivariadas podem ter valores individuais banais (a combinação é que é rara)."
        },
        {
          "prompt": "O detector sinalizou uma anomalia nas leituras de um sensor em produção. O protocolo correto, segundo o curso, é:",
          "options": [
            "Descartar a leitura imediatamente para não contaminar as análises seguintes.",
            "Tratar a anomalia como hipótese a investigar: pode ser falha da máquina, erro do sensor ou mudança legítima de regime — o contexto decide, e o descarte automático pode apagar justamente o evento mais importante.",
            "Retreinar o modelo na hora, incluindo a anomalia como uma classe nova."
          ],
          "correctIndex": 1,
          "explanation": "A anomalia é o começo da investigação, não o fim — o mesmo score alto pode ser um rolamento falhando (ação de manutenção), um sensor descalibrado (ação de instrumentação) ou um novo regime operacional (ação de modelagem). Descartar ou retreinar automaticamente destrói a informação mais valiosa que o detector produz."
        }
      ]
    }
  ],
  "library": [
    {
      "title": "Notebook — Prática do Módulo 1",
      "description": "Notebook starter com scipy e numpy: sua primeira análise estatística rigorosa no navegador.",
      "tool": "Google Colab",
      "url": "https://colab.research.google.com/github/giselleCouto/giselle-falcao-portfolio/blob/main/client/public/cursos/notebooks/estatistica-padroes-pratica-modulo1.ipynb"
    }
  ]
};
