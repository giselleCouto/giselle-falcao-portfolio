import type { Course } from "./types";

// Gerado a partir do material pedagógico em docs/cursos/fundamentos-ml/
// Edite videoUrl / slidesUrl / practiceUrl conforme grava e publica os materiais.

export const fundamentosMl: Course = {
  "slug": "fundamentos-ml",
  "title": "Fundamentos de Machine Learning",
  "level": "Iniciante",
  "hours": "24h",
  "free": true,
  "tagline": "Domine os pilares do Machine Learning na prática — sem instalar nada e sem matemática intimidadora.",
  "description": "Domine os pilares do Machine Learning: regressão, classificação, clustering e avaliação de modelos. Exercícios práticos com datasets reais e avaliação com pontuação.",
  "outcomes": [
    "Explicar o que é Machine Learning, diferenciar aprendizado supervisionado e não supervisionado e identificar quando (não) usar ML em um problema de negócio",
    "Construir e interpretar modelos de regressão linear no Google Colab, avaliando-os com MAE, RMSE e R²",
    "Treinar e avaliar modelos de classificação (regressão logística, árvores e florestas aleatórias) lendo matriz de confusão, precisão, recall e F1",
    "Segmentar dados sem rótulos usando clustering (K-means) e interpretar os grupos para decisões de negócio",
    "Diagnosticar overfitting/underfitting e validar modelos corretamente com divisão treino/teste e validação cruzada, evitando vazamento de dados",
    "Executar um projeto de ML de ponta a ponta — do entendimento do problema à comunicação dos resultados — com um dataset real"
  ],
  "audience": "Profissionais e estudantes brasileiros que querem entrar na área de dados e IA: analistas, engenheiros de outras áreas, gestores e universitários que querem entender como a máquina aprende e treinar seus primeiros modelos.",
  "prerequisites": "Nenhum conhecimento prévio de programação ou estatística — basta familiaridade básica com planilhas e navegador; todo código Python é fornecido pronto e comentado.",
  "status": "disponivel",
  "modules": [
    {
      "id": "modulo-1",
      "title": "Bem-vindo(a) ao Machine Learning",
      "duration": "3h15",
      "free": true,
      "lessons": [
        {
          "title": "O que é Machine Learning (e o que não é)",
          "type": "video",
          "duration": "18min",
          "summary": "Giselle diferencia programação tradicional (regras escritas por humanos) de Machine Learning (padrões aprendidos dos dados) e apresenta as duas famílias de aprendizado: supervisionado e não supervisionado. Introduz os três pilares do curso — regressão, classificação e clustering — com exemplos brasileiros do agro, indústria e fintech. Fecha com o filtro de consultoria: quando NÃO usar ML."
        },
        {
          "title": "ML no mundo real: casos brasileiros",
          "type": "leitura",
          "duration": "45min",
          "summary": "Leitura ativa com cinco casos de ML operando no Brasil: antifraude do Pix, previsão de safra no agro, manutenção preditiva na indústria, otimização logística no e-commerce e recomendação/segmentação no varejo. Em cada caso, o aluno classifica o tipo de problema (regressão, classificação ou clustering) e reflete sobre os dados usados e o custo do erro."
        },
        {
          "title": "O ciclo de vida de um projeto de ML",
          "type": "video",
          "duration": "20min",
          "summary": "As seis etapas de um projeto de ML (inspiradas no CRISP-DM): entender o problema, coletar dados, preparar dados, treinar, avaliar e colocar em produção com monitoramento. Introduz a divisão treino/teste com a analogia do aluno que decora o gabarito e a regra 80/20 da preparação de dados. Lição de ouro: comece pelo problema, nunca avalie no dado de treino."
        },
        {
          "title": "Seu primeiro dataset no Google Colab",
          "type": "pratica",
          "duration": "90min",
          "summary": "Primeira mão na massa: o aluno abre o notebook starter no Google Colab e explora um dataset de 24 fazendas leiteiras de Minas Gerais com pandas (head, shape, describe), gráficos de dispersão e histograma, e matriz de correlação. Termina com um desafio de três TODOs: média por município, coluna de eficiência litros/vaca e gráfico temperatura x eficiência. Entrega via link do notebook no Drive.",
          "practiceTool": "Colab",
          "practiceUrl": "https://colab.research.google.com/github/giselleCouto/giselle-falcao-portfolio/blob/main/client/public/cursos/notebooks/fundamentos-ml-pratica-modulo1.ipynb"
        },
        {
          "title": "Quiz do Módulo 1",
          "type": "quiz",
          "duration": "20min",
          "summary": "Cinco questões de múltipla escolha com correção automática e explicação, cobrindo a definição de ML, os tipos de problema (regressão, classificação, clustering), o papel do conjunto de teste e a primeira etapa do ciclo de vida. Duas tentativas permitidas; compõe a média de quizzes (40% da nota do curso)."
        }
      ],
      "quiz": [
        {
          "prompt": "O que melhor define Machine Learning?",
          "options": [
            "Programar manualmente regras fixas que o computador deve seguir para cada situação.",
            "Fazer o computador aprender padrões a partir de dados, em vez de ser explicitamente programado com regras fixas.",
            "Qualquer sistema de computador que automatiza tarefas repetitivas de escritório."
          ],
          "correctIndex": 1,
          "explanation": "Em ML, mostramos dados e respostas, e o algoritmo descobre as regras (o modelo). Na programação tradicional é o contrário: o humano escreve as regras. Automação de tarefas repetitivas pode existir sem aprendizado algum."
        },
        {
          "prompt": "Prever o preço de venda de um apartamento em Belo Horizonte a partir de área, bairro e idade do imóvel é um problema de...",
          "options": [
            "Regressão, porque a resposta é um número contínuo.",
            "Classificação, porque bairros são categorias.",
            "Clustering, porque agrupamos apartamentos parecidos."
          ],
          "correctIndex": 0,
          "explanation": "O que define o tipo de problema é a resposta que queremos prever — aqui, um preço (número contínuo), portanto regressão. Bairro é uma variável de entrada (feature), não a resposta."
        },
        {
          "prompt": "Qual das situações abaixo é um exemplo de aprendizado NÃO supervisionado?",
          "options": [
            "Prever a produção de leite de cada vaca usando o histórico de produção como resposta.",
            "Classificar e-mails como spam usando milhares de e-mails já marcados como spam/não spam.",
            "Agrupar clientes de um e-commerce por comportamento de compra, sem nenhuma categoria pré-definida."
          ],
          "correctIndex": 2,
          "explanation": "Sem rótulos (respostas certas), o algoritmo procura estrutura por conta própria — é o caso do agrupamento de clientes (clustering). Os outros dois casos têm gabarito (produção histórica, marcação de spam), portanto são supervisionados."
        },
        {
          "prompt": "Para que serve o conjunto de TESTE na divisão treino/teste?",
          "options": [
            "Acelerar o treinamento usando menos dados.",
            "Avaliar o desempenho do modelo em dados que ele nunca viu durante o treinamento.",
            "Aumentar a quantidade de dados disponível para o modelo aprender."
          ],
          "correctIndex": 1,
          "explanation": "O teste é a 'prova com questões novas': ele mede se o modelo aprendeu padrões generalizáveis ou apenas decorou os dados de treino. Por isso ele fica separado ('no cofre') até a avaliação final."
        },
        {
          "prompt": "Qual é a primeira etapa do ciclo de vida de um projeto de ML?",
          "options": [
            "Escolher o algoritmo mais moderno disponível.",
            "Entender o problema de negócio e que decisão a previsão vai melhorar.",
            "Treinar o modelo com todos os dados disponíveis."
          ],
          "correctIndex": 1,
          "explanation": "Projeto que começa pelo algoritmo morre na apresentação. A pergunta inicial é sempre: 'se o modelo acertar, a empresa fará o quê de forma diferente?'. O algoritmo é consequência do problema, nunca o contrário."
        }
      ]
    },
    {
      "id": "modulo-2",
      "title": "Regressão: ensinando a máquina a prever números",
      "duration": "3h20",
      "free": true,
      "lessons": [
        {
          "title": "A intuição da regressão linear",
          "type": "video",
          "duration": "22min",
          "summary": "A regressão linear apresentada como 'a melhor reta pela nuvem de pontos': do gráfico de dispersão à equação y = a + b·x, com tradução de negócio de cada coeficiente. Explica intuitivamente os mínimos quadrados (treinar = achar os parâmetros que minimizam o erro) e estende para a regressão múltipla com a leitura 'mantendo o resto constante'. Fecha com os limites honestos: linearidade, outliers e coeficiente não é causalidade."
        },
        {
          "title": "Features, correlação e armadilhas dos dados",
          "type": "leitura",
          "duration": "40min",
          "summary": "Leitura que formaliza o vocabulário de features e target e ensina a ler correlações de -1 a +1. Aprofunda as armadilhas que fazem modelos mentirem com confiança: correlação não é causalidade (variáveis ocultas), correlações espúrias e vazamento de dados (data leakage), com a regra de bolso 'essa informação existiria no momento da previsão?'. Termina com um checklist de perguntas antes de treinar."
        },
        {
          "title": "Avaliando previsões: MAE, RMSE e R²",
          "type": "video",
          "duration": "18min",
          "summary": "As três métricas para responder 'o modelo é bom?' com número: MAE (erro médio na unidade do problema, ideal para comunicar), RMSE (pune erros grandes; comparar com o MAE revela alertas) e R² (proporção da variação explicada — e o que ele NÃO significa). Reforça que a avaliação honesta acontece sempre no conjunto de teste, nunca no treino."
        },
        {
          "title": "Prevendo a produtividade da soja com regressão no Colab",
          "type": "pratica",
          "duration": "100min",
          "summary": "O aluno treina seu primeiro modelo de verdade: regressão linear com scikit-learn sobre um dataset de 200 talhões de soja (chuva, adubo, temperatura, argila), com split treino/teste 80/20, cálculo de MAE, RMSE e R² nos dois conjuntos e gráfico real x previsto. Cada coeficiente é traduzido em uma frase de negócio. Desafio: adicionar o identificador do talhão como feature e explicar por que isso não deveria ajudar um modelo honesto.",
          "practiceTool": "Colab"
        },
        {
          "title": "Quiz do Módulo 2",
          "type": "quiz",
          "duration": "20min",
          "summary": "Cinco questões de múltipla escolha com explicação, cobrindo a leitura do coeficiente b, a diferença entre MAE e RMSE, a interpretação correta do R², correlação versus causalidade e o conceito de vazamento de dados. Duas tentativas permitidas; compõe a média de quizzes (40% da nota do curso)."
        }
      ],
      "quiz": [
        {
          "prompt": "Na regressão linear y = a + b·x, o coeficiente b representa...",
          "options": [
            "O valor de y quando x é igual a zero.",
            "Quanto y varia, em média, a cada unidade a mais de x.",
            "A porcentagem de acertos do modelo no conjunto de teste."
          ],
          "correctIndex": 1,
          "explanation": "b é a inclinação da reta: o efeito médio de +1 unidade de x sobre y (na regressão múltipla, 'mantendo o resto constante'). O valor de y quando x = 0 é o intercepto (a). Regressão não tem 'porcentagem de acerto'."
        },
        {
          "prompt": "Qual métrica penaliza mais fortemente os erros grandes de previsão?",
          "options": [
            "MAE, porque tira a média de todos os erros.",
            "RMSE, porque eleva os erros ao quadrado antes de tirar a média.",
            "R², porque mede a variação explicada pelo modelo."
          ],
          "correctIndex": 1,
          "explanation": "Ao elevar ao quadrado, um erro de 10 pesa 100, enquanto dez erros de 1 pesam 10 no total — por isso o RMSE cresce muito na presença de erros grandes (e RMSE ≥ MAE sempre). Um RMSE muito maior que o MAE indica erros grandes escondidos."
        },
        {
          "prompt": "Um modelo de regressão obteve R² = 0,85 no conjunto de teste. Isso significa que...",
          "options": [
            "O modelo acerta a previsão em 85% das vezes.",
            "O modelo explica cerca de 85% da variação do alvo; o restante fica sem explicação.",
            "O erro médio do modelo é de 0,85 sacas por hectare."
          ],
          "correctIndex": 1,
          "explanation": "R² compara o modelo com o 'chute da média' e mede a proporção da variação do target explicada. Regressão não 'acerta/erra' (isso seria classificação), e erro médio em unidades do problema é o MAE, não o R²."
        },
        {
          "prompt": "Descobriu-se que fazendas com mais tratores têm maior produtividade. Podemos concluir que comprar tratores CAUSA aumento de produtividade?",
          "options": [
            "Sim — a correlação alta comprova a relação de causa e efeito.",
            "Não — correlação não implica causalidade; uma variável oculta (como capital disponível) pode explicar as duas coisas.",
            "Sim, desde que a correlação seja maior que 0,9."
          ],
          "correctIndex": 1,
          "explanation": "Correlação mostra que as variáveis andam juntas, não que uma causa a outra. Fazendas mais capitalizadas compram mais tratores E investem em tudo que aumenta produtividade — o capital é a variável oculta. Nenhum valor de correlação comprova causalidade sozinho."
        },
        {
          "prompt": "O que caracteriza vazamento de dados (data leakage) no treinamento de um modelo?",
          "options": [
            "Usar como feature uma informação que não estaria disponível no momento real da previsão (ou que entrega a resposta).",
            "Usar menos de 80% dos dados para o treinamento do modelo.",
            "Treinar o modelo com dados coletados de mais de uma fonte diferente."
          ],
          "correctIndex": 0,
          "explanation": "Vazamento é quando o modelo 'cola' — recebe no treino uma informação que só existe depois do fato ou que embute o próprio target (ex.: usar o valor da fatura final para prever inadimplência). O sintoma clássico é desempenho bom demais para ser verdade."
        }
      ]
    },
    {
      "id": "modulo-3",
      "title": "Classificação: ensinando a máquina a decidir",
      "duration": "4h15",
      "free": true,
      "lessons": [
        {
          "title": "Problemas de classificação: do spam à fraude no Pix",
          "type": "video",
          "duration": "22min",
          "summary": "Apresenta a classificação como o problema supervisionado de prever categorias, com exemplos brasileiros: antifraude do Pix, triagem de crédito e controle de qualidade industrial. Introduz classes, probabilidades e o limiar de decisão, e mostra por que 'acurácia de 99%' pode ser péssima quando as classes são desbalanceadas."
        },
        {
          "title": "Regressão logística, árvores de decisão e florestas aleatórias",
          "type": "video",
          "duration": "25min",
          "summary": "Constrói a intuição dos três classificadores mais usados por iniciantes: regressão logística como 'regressão que devolve probabilidade', árvore de decisão como sequência de perguntas interpretável e floresta aleatória como comitê de árvores que vota. Discute quando preferir interpretabilidade versus desempenho."
        },
        {
          "title": "Matriz de confusão, precisão, recall e o custo do erro",
          "type": "leitura",
          "duration": "60min",
          "summary": "Leitura aprofundada sobre avaliação de classificadores: verdadeiros/falsos positivos e negativos, precisão, recall, F1 e o trade-off entre eles. Analisa casos com custos assimétricos — deixar passar uma fraude versus bloquear um cliente legítimo — e pede que o aluno escolha a métrica prioritária em cada cenário."
        },
        {
          "title": "Prevendo churn de clientes com classificação no Colab",
          "type": "pratica",
          "duration": "120min",
          "summary": "Exercício guiado com o dataset público Telco Customer Churn: treinar regressão logística e floresta aleatória para prever cancelamento de clientes, preparar variáveis categóricas, ler matriz de confusão e ajustar o limiar de decisão. Desafio: recomendar ao 'diretor comercial' qual modelo usar e por quê, em 5 linhas.",
          "practiceTool": "Colab"
        },
        {
          "title": "Quiz do Módulo 3",
          "type": "quiz",
          "duration": "30min",
          "summary": "Cinco questões cobrindo classes desbalanceadas e o perigo da acurácia, leitura de matriz de confusão, escolha entre precisão e recall pelo custo do erro, intuição da floresta aleatória e efeito do limiar de decisão. Duas tentativas; compõe a média de quizzes."
        }
      ]
    },
    {
      "id": "modulo-4",
      "title": "Clustering: encontrando grupos escondidos nos dados",
      "duration": "4h",
      "free": true,
      "lessons": [
        {
          "title": "Quando não temos rótulos: aprendizado não supervisionado",
          "type": "video",
          "duration": "20min",
          "summary": "Retoma a diferença supervisionado x não supervisionado e apresenta os usos típicos de clustering no Brasil: segmentação de clientes no varejo, agrupamento de filiais por perfil de venda e perfis de talhões no agro. Enfatiza que sem gabarito não existe 'acerto' — um bom cluster é o que gera decisão."
        },
        {
          "title": "K-means passo a passo (e como escolher o k)",
          "type": "video",
          "duration": "22min",
          "summary": "Desmonta o algoritmo K-means com animação em slides: centróides, atribuição, atualização e convergência. Explica por que padronizar as features antes de agrupar e apresenta o método do cotovelo e a silhueta como guias — não oráculos — para escolher o número de clusters."
        },
        {
          "title": "Segmentação de clientes e outros usos de clustering no Brasil",
          "type": "leitura",
          "duration": "50min",
          "summary": "Estudo de caso narrativo: uma rede varejista segmenta sua base com RFM (recência, frequência, valor monetário) + K-means e descobre quatro personas acionáveis. Discute como nomear clusters, apresentar para a diretoria e evitar os erros comuns: clusters demais, features sem lógica de negócio e esquecer de padronizar."
        },
        {
          "title": "Segmentando clientes com K-means no Colab + painel no Looker Studio",
          "type": "pratica",
          "duration": "120min",
          "summary": "Prática em duas etapas: no Colab, aplicar K-means ao dataset público Online Retail (UCI) transformado em RFM por cliente e escolher k pelo cotovelo; depois, importar o resultado no Looker Studio (via Google Sheets) e montar um mini-painel com o perfil de cada segmento. Desafio: batizar cada segmento e sugerir uma ação de marketing para cada um.",
          "practiceTool": "Colab"
        },
        {
          "title": "Quiz do Módulo 4",
          "type": "quiz",
          "duration": "25min",
          "summary": "Cinco questões cobrindo quando usar clustering, o papel da padronização, a mecânica do K-means, o método do cotovelo e a interpretação de clusters como decisão de negócio. Duas tentativas; compõe a média de quizzes."
        }
      ]
    },
    {
      "id": "modulo-5",
      "title": "Avaliação e melhoria de modelos",
      "duration": "4h20",
      "free": true,
      "lessons": [
        {
          "title": "Overfitting, underfitting e a divisão treino/teste",
          "type": "video",
          "duration": "25min",
          "summary": "O conceito mais importante do curso ganha aula dedicada: modelos que decoram (overfitting) versus modelos simples demais (underfitting), ilustrados com o mesmo dataset ajustado por retas e polinômios exagerados. Ensina a diagnosticar pela distância entre o desempenho no treino e no teste."
        },
        {
          "title": "Validação cruzada e ajuste de hiperparâmetros sem pânico",
          "type": "video",
          "duration": "20min",
          "summary": "Apresenta a validação cruzada k-fold como forma de avaliar com mais confiança quando há poucos dados, e o ajuste de hiperparâmetros com busca simples em grade. Regra de ouro: o conjunto de teste continua no cofre — hiperparâmetro se ajusta com validação, nunca com teste."
        },
        {
          "title": "Viés, vazamento de dados e ética em ML",
          "type": "leitura",
          "duration": "60min",
          "summary": "Leitura sobre as formas silenciosas de um modelo dar errado: viés histórico nos dados, vazamento temporal e proxies discriminatórios (como CEP substituindo renda/raça), com referência à LGPD e ao debate brasileiro de regulação de IA. Traz dilemas éticos para o aluno julgar em checkpoints."
        },
        {
          "title": "Diagnóstico completo de um modelo no Colab",
          "type": "pratica",
          "duration": "130min",
          "summary": "Clínica de modelos: o aluno recebe três modelos defeituosos treinados no dataset de churn — um com overfitting, um com underfitting e um com vazamento de dados — e precisa diagnosticar cada um com curvas treino x validação, validação cruzada e inspeção de features. Desafio: consertar pelo menos dois dos três e documentar o raciocínio.",
          "practiceTool": "Colab"
        },
        {
          "title": "Quiz do Módulo 5",
          "type": "quiz",
          "duration": "25min",
          "summary": "Cinco questões cobrindo sintomas de overfitting/underfitting, o papel da validação cruzada, por que hiperparâmetros não se ajustam no teste, identificação de vazamento e riscos éticos de proxies discriminatórios. Duas tentativas; compõe a média de quizzes."
        }
      ]
    },
    {
      "id": "modulo-6",
      "title": "Projeto final: do dado à decisão",
      "duration": "4h35",
      "free": true,
      "lessons": [
        {
          "title": "Como montar um projeto de ML de ponta a ponta",
          "type": "video",
          "duration": "20min",
          "summary": "Giselle percorre um projeto exemplar do início ao fim usando o ciclo de vida do módulo 1 como roteiro, com um notebook 'gabarito' comentado. Apresenta os três temas oferecidos para o projeto final (regressão, classificação ou clustering, cada um com dataset público sugerido) e os erros que mais reprovam projetos."
        },
        {
          "title": "Guia do projeto final + rubrica de pontuação",
          "type": "leitura",
          "duration": "40min",
          "summary": "Documento-guia com os requisitos do projeto: perguntas de negócio, checklist técnico mínimo, estrutura esperada do notebook e rubrica de avaliação detalhada. Inclui FAQ e um modelo de 'resumo executivo' de 10 linhas que o aluno deve escrever — porque comunicar é parte do trabalho."
        },
        {
          "title": "Projeto final guiado no Colab",
          "type": "pratica",
          "duration": "160min",
          "summary": "O aluno executa seu projeto no Colab a partir de um template com a estrutura do ciclo de vida (seções prontas, células vazias), usando um dos datasets públicos sugeridos ou um dataset próprio aprovado no fórum. Entrega: link do notebook + resumo executivo. É a principal evidência prática do certificado.",
          "practiceTool": "Colab"
        },
        {
          "title": "Próximos passos na sua jornada de dados e IA",
          "type": "video",
          "duration": "15min",
          "summary": "Aula de fechamento e orientação de carreira: o que estudar depois (Python mais profundo, SQL/BigQuery, deep learning, MLOps, IA generativa), como montar portfólio com os notebooks do curso e como publicar projetos no LinkedIn. Apresenta a trilha de cursos da Giselle Falcão Academy como continuidade natural."
        },
        {
          "title": "Avaliação final com pontuação",
          "type": "quiz",
          "duration": "40min",
          "summary": "Avaliação somativa de 20 questões cobrindo todo o curso (fundamentos, regressão, classificação, clustering e avaliação de modelos), valendo 40% da nota final, com questões embaralhadas e duas tentativas. Nota ≥ 70 no curso libera o certificado; ≥ 90 concede o selo 'Concluído com Distinção'."
        }
      ]
    }
  ],
  "library": [
    {
      "title": "Notebook — Seu primeiro dataset",
      "description": "Notebook starter do Módulo 1: exploração de dados de fazendas leiteiras de MG com pandas e gráficos.",
      "tool": "Google Colab",
      "url": "https://colab.research.google.com/github/giselleCouto/giselle-falcao-portfolio/blob/main/client/public/cursos/notebooks/fundamentos-ml-pratica-modulo1.ipynb"
    }
  ]
};
