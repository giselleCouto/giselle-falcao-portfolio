import type { Course } from "./types";

// Programa corporativo (formato Executivo: eixos → competências → módulos).
// Programa completo e roteiros de gravação no Claude Docs: https://claude.ai/code/artifact/7e275713-1f7e-4b85-849c-eb6e94b2dfb9
// Edite videoUrl / slidesUrl / practiceUrl conforme grava e publica os materiais.

export const iaDeProducaoTimesDados: Course = {
  "slug": "ia-de-producao-times-dados",
  "title": "IA de Produção para Times de Dados: do SQL ao MLOps",
  "level": "Avançado",
  "hours": "72h",
  "free": false,
  "publico": "empresas",
  "tagline": "Trilha técnica para levar modelos do notebook à produção: seu SQL já cobre 80% do caminho, e o programa percorre o resto com o seu time.",
  "description": "Programa corporativo de 72 horas para times de TI, engenharia e dados que precisam colocar modelos em produção com confiabilidade. Em dois eixos, vai do enquadramento do problema e da tabela de treino em SQL até MLOps, LLMOps e governança, com laboratórios em ferramentas gratuitas e dados públicos brasileiros. O projeto aplicado entrega um modelo em produção, do pipeline ao monitoramento.",
  "outcomes": [
    "Enquadrar problemas de negócio como problemas de ML e construir tabelas de treino em SQL, com features temporais e sem vazamento de dados",
    "Treinar e validar modelos supervisionados com baselines, validação temporal, métricas ligadas ao custo do erro, tratamento de desbalanceamento e calibração",
    "Construir pipelines de dados para ML com camadas, testes de qualidade, data contracts, lakehouse e feature store",
    "Explicar modelos com SHAP, medir viés por grupo, documentar com model cards e atender aos requisitos da LGPD para decisões automatizadas",
    "Publicar modelos de forma reprodutível com MLflow, APIs em FastAPI, contêineres Docker e CI/CD no GitHub Actions",
    "Monitorar e manter modelos em produção: drift de dados e de conceito, alertas, observabilidade, retreino e custos",
    "Operar IA generativa com segurança: RAG, avaliação de LLMs, guardrails contra injeção de prompt, custo por token, agentes e MCP",
    "Estruturar plataforma e governança de IA: maturidade de MLOps, arquitetura de referência, papéis, ISO/IEC 42001, regulação e indicadores de valor"
  ],
  "audience": "Times de TI, engenharia e dados que precisam levar modelos à produção: analistas de dados, engenheiros de dados, engenheiros de software, desenvolvedores, cientistas de dados em início de carreira, DBAs e líderes técnicos. O time pode ser misto: cada sigla e conceito é explicado na primeira vez em que aparece.",
  "prerequisites": "SQL intermediário (JOIN, GROUP BY, subconsultas) e Python básico. Não é necessária experiência prévia com MLOps; os laboratórios usam ferramentas gratuitas (BigQuery sandbox ou Databricks Free Edition, Google Colab, MLflow, GitHub).",
  "status": "disponivel",
  "conteudo": "em-producao",
  "modules": [
    {
      "id": "modulo-1",
      "title": "Enquadrar o problema e preparar dados com SQL",
      "subtitle": "Competência: preparar dados de treino confiáveis com SQL",
      "duration": "7h",
      "free": true,
      "lessons": [
        {
          "title": "Do notebook à produção: por que tantos modelos param no caminho",
          "type": "video",
          "duration": "9min",
          "summary": "Apresenta o que significa colocar um modelo em produção e as três gavetas em que os projetos travam: dados, operação e confiança. Introduz o MLOps e a tese que atravessa o programa: o SQL do time já cobre 80% do caminho até um modelo em produção.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Enquadrar o problema: decisão, alvo, métrica e baseline",
          "type": "video",
          "duration": "10min",
          "summary": "Mostra como transformar um pedido vago de negócio num enunciado de ML: decisão, ação, alvo, unidade, horizonte, KPI e ROI. Apresenta o baseline como concorrente invisível do modelo e o canvas de enquadramento de uma página.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Features em SQL: agregações, CASE WHEN e funções de janela",
          "type": "video",
          "duration": "11min",
          "summary": "Organiza a tabela de treino pelo grão (uma linha por pedido no momento da compra) e escreve features legíveis com CTEs, CASE WHEN e funções de janela. Destaca o detalhe que salva o modelo: a janela termina na linha anterior e nunca enxerga o futuro.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Vazamento de dados: o teste do \"o que eu sabia naquele dia?\"",
          "type": "video",
          "duration": "10min",
          "summary": "Diferencia vazamento de alvo e vazamento temporal e ensina o teste \"o que eu sabia naquele dia?\" com a linha do tempo de um pedido. Mostra joins no tempo certo (point-in-time) e os sinais de alerta de desempenho bom demais.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Treino, validação e teste no tempo",
          "type": "video",
          "duration": "10min",
          "summary": "Explica por que a divisão aleatória engana quando os dados têm tempo e como definir data de corte, janela de observação, janela de desempenho e folga entre os conjuntos. Apresenta o backtesting com janelas expansivas e deslizantes.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Tabela de treino reprodutível: grão, histórico e versionamento",
          "type": "video",
          "duration": "12min",
          "summary": "Trata das tabelas que sobrescrevem o passado e do padrão SCD tipo 2 para guardar histórico. Mostra snapshots, time travel no Delta Lake e no BigQuery, queries parametrizadas por data e testes simples que tornam a tabela de treino reprodutível.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: a fintech e a feature que vinha do futuro",
          "type": "leitura",
          "duration": "30min",
          "summary": "Um modelo de inadimplência excelente no teste despenca em produção por causa de uma feature calculada na data errada.",
          "content": "Uma fintech de crédito consignado, fictícia, treinou um modelo de inadimplência para apoiar a concessão de novos contratos. No conjunto de teste, o modelo acertava muito, e o time comemorou: a métrica era a melhor que a empresa já tinha visto.\n\nEm produção, o desempenho caiu para perto do acaso em duas semanas. O time de risco voltou a usar a política antiga enquanto a área de dados investigava. Ninguém tinha mudado o código, e os dados de entrada pareciam normais.\n\nA investigação mostrou que a feature mais importante do modelo, \"dias desde o último pagamento\", era calculada a partir da data da extração dos dados, e não da data da concessão do crédito. No treino, ela carregava informação sobre parcelas pagas ou atrasadas depois da decisão, ou seja, sobre o próprio resultado que o modelo deveria prever.\n\nNo momento real da decisão, essa informação não existia. O modelo tinha aprendido a ler o futuro, e em produção o futuro não estava disponível. A correção exigiu reescrever a query com um corte no tempo certo, refazer a validação com divisão temporal e criar um checklist de revisão de features para todos os modelos da casa.\n\nPerguntas para discussão: (1) Como desenhar a linha do tempo de uma concessão de crédito e marcar nela o momento em que cada feature fica disponível? (2) Que testes automáticos poderiam ter barrado essa feature antes do deploy? (3) Que itens você colocaria no checklist de revisão de vazamento do seu time?"
        },
        {
          "title": "Laboratório: tabela de treino Olist em SQL",
          "type": "pratica",
          "duration": "3h",
          "summary": "No BigQuery sandbox (ou na Databricks Free Edition), com o dataset público de pedidos da Olist, enquadre o problema \"este pedido vai atrasar?\" e escreva a query que gera a tabela de treino: uma linha por pedido na data da compra, 10 a 15 features com funções de janela, rótulo calculado pela data real de entrega e cortes temporais de treino, validação e teste. Entregue o canvas de enquadramento, o arquivo .sql versionado no GitHub e o checklist de vazamento preenchido.",
          "practiceTool": "BigQuery sandbox",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Segundo a tese do programa, o que o SQL do time já cobre no caminho até um modelo em produção?",
          "options": [
            "Nada: é preciso recomeçar do zero em Python.",
            "A maior parte da preparação de dados e das features (cerca de 80% do caminho).",
            "Apenas a etapa de monitoramento.",
            "Somente a publicação do modelo como API."
          ],
          "correctIndex": 1,
          "explanation": "SELECT, JOIN, GROUP BY, funções de janela e CASE WHEN já montam o conjunto de dados, as features e o alvo. Os 20% restantes são validar, empacotar, servir, monitorar e governar."
        },
        {
          "prompt": "Qual é a primeira pergunta ao enquadrar um problema de ML?",
          "options": [
            "Qual algoritmo é o mais moderno?",
            "Que decisão vai ser diferente com o modelo?",
            "Quantas GPUs serão necessárias?",
            "Qual biblioteca de Python usar?"
          ],
          "correctIndex": 1,
          "explanation": "Um modelo só gera valor quando muda uma decisão. Decisão e ação vêm antes do alvo, da métrica e do algoritmo."
        },
        {
          "prompt": "Por que a janela de uma feature de histórico deve terminar em \"1 PRECEDING\"?",
          "options": [
            "Para a query rodar mais rápido.",
            "Para não incluir o próprio pedido nem informações posteriores a ele.",
            "Porque o BigQuery exige essa sintaxe.",
            "Para reduzir o número de linhas da tabela."
          ],
          "correctIndex": 1,
          "explanation": "A janela que termina na linha anterior garante que a feature use só o que se sabia antes daquele pedido, evitando vazamento."
        },
        {
          "prompt": "Um modelo de cancelamento tem desempenho quase perfeito e a feature campeã é \"número de contatos com o atendimento\", contando também os contatos posteriores à data de referência. O que provavelmente aconteceu?",
          "options": [
            "Um ótimo modelo pronto para produção.",
            "Vazamento de dados: a feature carrega informação do futuro.",
            "Desbalanceamento de classes.",
            "Excesso de regularização."
          ],
          "correctIndex": 1,
          "explanation": "Contatos feitos para pedir o cancelamento só existem depois do evento. É o teste do \"o que eu sabia naquele dia?\" falhando."
        },
        {
          "prompt": "Qual é o principal benefício do padrão SCD tipo 2 para treinar modelos?",
          "options": [
            "Ocupa menos espaço que o tipo 1.",
            "Guarda o histórico de mudanças com início e fim de validade, permitindo joins no tempo certo.",
            "Dispensa o uso de datas nas queries.",
            "Apaga automaticamente os dados antigos."
          ],
          "correctIndex": 1,
          "explanation": "Com uma linha por versão e datas de validade, é possível reconstruir como cada registro estava no momento da previsão."
        }
      ]
    },
    {
      "id": "modulo-2",
      "title": "Modelagem supervisionada sólida",
      "subtitle": "Competência: treinar e validar modelos com métricas de negócio",
      "duration": "7h",
      "free": false,
      "lessons": [
        {
          "title": "Baselines: o concorrente que todo modelo precisa vencer",
          "type": "video",
          "duration": "9min",
          "summary": "Constrói três tipos de baseline: o ingênuo (classe mais comum, média, último valor), a regra de negócio e o modelo linear. Explica o MAE e a regra da casa: todo modelo precisa vencer os três com folga para justificar a manutenção.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Árvores e gradient boosting: os cavalos de batalha dos dados tabulares",
          "type": "video",
          "duration": "11min",
          "summary": "Explica, sem equações, árvores de decisão, florestas aleatórias e gradient boosting (XGBoost, LightGBM, CatBoost) e por que o boosting lidera em dados tabulares. Apresenta os poucos hiperparâmetros que realmente importam e o risco de sobreajuste.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Validação cruzada sem se enganar",
          "type": "video",
          "duration": "10min",
          "summary": "Compara k-fold, validação estratificada, por grupos e temporal, e mostra como os Pipelines do scikit-learn evitam vazamento no pré-processamento. Trata da busca de hiperparâmetros aleatória e bayesiana e do uso único do conjunto de teste.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Métricas ligadas ao custo de negócio",
          "type": "video",
          "duration": "11min",
          "summary": "Lê a matriz de confusão, precisão, recall, curvas ROC e de precisão-recall, AUC, RMSE e MAPE. Fecha com a matriz de custo: o melhor modelo é o que minimiza o custo total em reais, não o que tem a maior métrica técnica.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Desbalanceamento: quando o evento raro é o que importa",
          "type": "video",
          "duration": "10min",
          "summary": "Mostra por que a acurácia engana quando o evento é raro e compara pesos de classe, reamostragem e SMOTE. Reforça a regra de ouro: nunca balancear validação e teste, e lembrar que reamostrar distorce as probabilidades.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Calibração e limiar de decisão",
          "type": "video",
          "duration": "12min",
          "summary": "Diferencia ordenar bem de estar calibrado, mede a calibração com curva de confiabilidade e Brier score e corrige com Platt ou isotônica. Ensina a escolher o limiar pelo custo do erro e pela capacidade da operação, registrando a decisão.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: a operadora de telecom e os 97% de acurácia",
          "type": "leitura",
          "duration": "30min",
          "summary": "Um modelo de cancelamento com 97% de acurácia que, na prática, dizia que ninguém cancelaria.",
          "content": "Uma operadora regional de telecomunicações, fictícia, comemorou um modelo de cancelamento com 97% de acurácia. A base tinha apenas 3% de clientes que cancelavam por mês, e a diretoria aprovou o projeto com base nesse número.\n\nQuando o time de retenção começou a usar a lista, percebeu que ela vinha quase vazia. O modelo tinha aprendido que dizer \"não cancela\" acertava quase sempre. A acurácia era alta e o recall, quase zero: ele não encontrava os clientes que de fato iam sair.\n\nO time de retenção tem capacidade para 2.000 ligações por mês. Cada ligação tem um custo, e cada cliente retido preserva uma receita mensal. Com valores ilustrativos dessas duas grandezas, é possível montar uma matriz de custo e calcular, para cada limiar, quanto a empresa ganha ou perde.\n\nAlém disso, a área financeira queria usar as probabilidades do modelo para prever quantos clientes sairiam no trimestre. Para isso, as probabilidades precisavam estar calibradas: \"30% de risco\" teria de significar algo próximo de 30 em cada 100 clientes com essa nota.\n\nPerguntas para discussão: (1) Que métricas substituiriam a acurácia neste caso, e por quê? (2) Como você escolheria o limiar considerando ao mesmo tempo a matriz de custo e a capacidade de 2.000 ligações? (3) O que precisa ser feito para que a área financeira possa confiar nas probabilidades do modelo?"
        },
        {
          "title": "Laboratório: modelos, validação temporal e limiar por custo",
          "type": "pratica",
          "duration": "3h",
          "summary": "No Google Colab, com pandas, scikit-learn e LightGBM, use a tabela de treino Olist do Módulo 1 para treinar três baselines, uma regressão logística e um gradient boosting com validação temporal. Monte uma matriz de custo ilustrativa, trace a curva de calibração e escolha o limiar. Entregue o notebook reprodutível e um relatório de métricas de uma página com a recomendação de modelo e de limiar.",
          "practiceTool": "Colab",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Em uma base em que 92% dos pedidos chegam no prazo, qual acurácia atinge o baseline \"nunca atrasa\"?",
          "options": [
            "8%",
            "50%",
            "92%",
            "100%"
          ],
          "correctIndex": 2,
          "explanation": "Prever sempre a classe mais comum acerta na proporção dessa classe. Por isso a acurácia sozinha engana em problemas desbalanceados."
        },
        {
          "prompt": "Qual é a ideia central do gradient boosting?",
          "options": [
            "Treinar uma única árvore muito profunda.",
            "Treinar árvores em sequência, cada uma corrigindo os erros das anteriores.",
            "Treinar árvores independentes e sortear uma delas.",
            "Substituir árvores por redes neurais."
          ],
          "correctIndex": 1,
          "explanation": "No boosting, cada nova árvore foca no que as anteriores deixaram passar, como um time de revisores em sequência."
        },
        {
          "prompt": "Por que usar um Pipeline do scikit-learn na validação cruzada?",
          "options": [
            "Para deixar o código mais bonito.",
            "Para que o pré-processamento seja ajustado só com os dados de treino de cada rodada, evitando vazamento.",
            "Para dispensar o conjunto de teste.",
            "Para treinar mais rápido em GPU."
          ],
          "correctIndex": 1,
          "explanation": "Preencher faltantes ou codificar categorias com a base toda contamina a validação. O Pipeline ajusta cada etapa dentro de cada rodada."
        },
        {
          "prompt": "Dois modelos têm AUC parecida. Como escolher entre eles para produção?",
          "options": [
            "Pelo que tem mais hiperparâmetros.",
            "Pelo custo total em reais calculado com a matriz de custo no limiar escolhido.",
            "Pelo que treina mais rápido.",
            "Por sorteio."
          ],
          "correctIndex": 1,
          "explanation": "A matriz de custo traduz alarmes falsos e atrasos não detectados em dinheiro, que é a linguagem do KPI e do ROI."
        },
        {
          "prompt": "O que significa um modelo estar bem calibrado?",
          "options": [
            "Ele tem AUC maior que 0,9.",
            "Quando ele diz 70% de chance, o evento acontece em cerca de 70% desses casos.",
            "Ele foi treinado com classes balanceadas.",
            "Ele usa o limiar de 0,5."
          ],
          "correctIndex": 1,
          "explanation": "Calibração é a probabilidade significar probabilidade, o que é necessário para orçamento, custos e comunicação com o negócio."
        }
      ]
    },
    {
      "id": "modulo-3",
      "title": "Engenharia de dados para ML",
      "subtitle": "Competência: construir pipelines de dados confiáveis para ML",
      "duration": "7h",
      "free": false,
      "lessons": [
        {
          "title": "Pipelines de dados para ML: ETL, ELT e camadas",
          "type": "video",
          "duration": "10min",
          "summary": "Diferencia ETL e ELT, organiza os dados nas camadas bronze, prata e ouro e explica quando usar lote ou streaming. Mostra como um orquestrador executa o pipeline como um DAG de tarefas dependentes.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Qualidade e testes de dados",
          "type": "video",
          "duration": "10min",
          "summary": "Apresenta as cinco dimensões de qualidade (completude, unicidade, validade, consistência e atualidade) e como testá-las com dbt, Great Expectations ou Pandera. Define onde testar e o que fazer quando um teste falha: severidade e quarentena.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Data contracts: o acordo entre quem produz e quem consome",
          "type": "video",
          "duration": "10min",
          "summary": "Explica o data contract com esquema, significado, SLA e responsáveis, escrito como código e verificado no pipeline do produtor. Trata a tabela como uma API e diferencia mudanças compatíveis e incompatíveis.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Lakehouse e formatos abertos de tabela",
          "type": "video",
          "duration": "11min",
          "summary": "Compara data warehouse, data lake e lakehouse e mostra como Delta Lake e Apache Iceberg trazem transações ACID a arquivos abertos. Destaca os recursos do dia a dia: time travel, evolução de esquema, MERGE e manutenção.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Feature store: a mesma feature no treino e na produção",
          "type": "video",
          "duration": "11min",
          "summary": "Explica a divergência treino-serviço e como uma feature store resolve com registro, armazenamento offline e online. Discute quando ela vale a pena e quando uma boa tabela de features na camada ouro basta.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Operação do pipeline: idempotência, backfill e linhagem",
          "type": "video",
          "duration": "12min",
          "summary": "Mostra como tornar tarefas idempotentes, como fazer backfill com segurança e como usar linhagem e observabilidade de dados para saber de onde veio cada número. Inclui práticas para controlar o custo de computação.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: o supermercado e os quilos que viraram gramas",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma mudança de unidade não avisada faz o modelo de demanda recomendar compras dez vezes maiores.",
          "content": "Uma rede de supermercados com 60 lojas, fictícia, usava um modelo de previsão de demanda para gerar sugestões diárias de compra de hortifrúti. O processo funcionava havia um ano, e os compradores confiavam nas sugestões.\n\nNuma segunda-feira, as sugestões vieram dez vezes maiores que o normal em vários itens. Alguns pedidos chegaram a ser enviados aos fornecedores antes que alguém percebesse. O prejuízo com perdas de produtos perecíveis foi relevante.\n\nA causa estava fora do time de dados: uma atualização do sistema de gestão das lojas mudou a unidade do campo de peso de quilos para gramas, sem aviso a ninguém. O pipeline carregou os dados normalmente, o modelo leu os números e fez o que sabia fazer. Nenhum teste falhou, porque não havia nenhum teste.\n\nDepois do incidente, a empresa precisou reprocessar semanas de dados, retreinar o modelo e explicar à diretoria por que um problema tão simples tinha passado despercebido. A discussão chegou rapidamente à pergunta: de quem é a responsabilidade por avisar e por verificar mudanças nos dados?\n\nPerguntas para discussão: (1) Que testes de dados, e em qual camada, teriam barrado o problema no primeiro dia? (2) O que deveria constar do data contract entre o time do sistema de gestão e o time de dados? (3) Como reprocessar as semanas afetadas com segurança, e quais modelos precisariam ser retreinados?"
        },
        {
          "title": "Laboratório: pipeline em camadas com testes e data contract",
          "type": "pratica",
          "duration": "3h",
          "summary": "Na Databricks Free Edition (Delta Lake e Workflows) ou com DuckDB e dbt Core no Colab, reorganize os dados da Olist em bronze, prata e ouro, escreva 10 testes de dados, redija o data contract da tabela de pedidos em YAML e agende um job idempotente que regera a tabela de treino. Entregue o repositório e um relatório de execução mostrando um teste falhando de propósito e o pipeline parando antes da camada ouro.",
          "practiceTool": "Databricks Free Edition",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Qual a diferença entre ETL e ELT?",
          "options": [
            "Não há diferença.",
            "No ELT, os dados são carregados brutos no destino e transformados lá dentro, em geral com SQL.",
            "O ETL só funciona na nuvem.",
            "O ELT dispensa transformações."
          ],
          "correctIndex": 1,
          "explanation": "ETL transforma no caminho; ELT carrega primeiro e transforma no armazém ou lakehouse, o padrão atual na nuvem."
        },
        {
          "prompt": "Qual camada da arquitetura medalhão nunca deve ser apagada, para permitir reprocessamento?",
          "options": [
            "Ouro",
            "Prata",
            "Bronze",
            "Nenhuma"
          ],
          "correctIndex": 2,
          "explanation": "A camada bronze guarda o dado bruto como chegou. Sem ela, não há como refazer o pipeline depois de um bug."
        },
        {
          "prompt": "O que um data contract deve conter, no mínimo?",
          "options": [
            "Apenas o nome da tabela.",
            "Esquema, significado dos campos, SLA e responsáveis.",
            "O código do modelo de ML.",
            "A senha do banco de dados."
          ],
          "correctIndex": 1,
          "explanation": "O contrato combina formato, significado, prazo de entrega e quem responde quando algo falha, e é verificado automaticamente."
        },
        {
          "prompt": "O que é a divergência treino-serviço (training-serving skew)?",
          "options": [
            "A diferença de preço entre treino e serviço.",
            "A diferença entre como a feature é calculada no treino e na produção.",
            "O tempo de treino de um modelo.",
            "Um tipo de drift de conceito."
          ],
          "correctIndex": 1,
          "explanation": "Duas implementações do mesmo cálculo geram números diferentes, e o modelo piora sem dar erro. A solução é uma definição única."
        },
        {
          "prompt": "Uma tarefa é idempotente quando:",
          "options": [
            "Roda mais rápido a cada execução.",
            "Rodada duas vezes com a mesma entrada, deixa o mesmo resultado.",
            "Nunca falha.",
            "Usa sempre a data de hoje."
          ],
          "correctIndex": 1,
          "explanation": "Sobrescrever a partição ou usar MERGE pela chave evita duplicações e permite reprocessar sem medo."
        }
      ]
    },
    {
      "id": "modulo-4",
      "title": "Explicabilidade, viés e documentação",
      "subtitle": "Competência: explicar, auditar e documentar modelos",
      "duration": "7h",
      "free": false,
      "lessons": [
        {
          "title": "Por que explicar um modelo",
          "type": "video",
          "duration": "9min",
          "summary": "Apresenta as três razões para explicar um modelo: depurar, gerar confiança e cumprir obrigações como as da LGPD, fiscalizada pela ANPD. Diferencia modelos interpretáveis por natureza de explicações feitas depois do treino, e explicações globais de locais.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Explicabilidade global: o que o modelo aprendeu",
          "type": "video",
          "duration": "10min",
          "summary": "Usa importância por permutação, PDP e ICE para entender o que o modelo aprendeu e se faz sentido para o negócio. Alerta para features correlacionadas e para a confusão entre importância e causalidade.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "SHAP na prática: explicando cada previsão",
          "type": "video",
          "duration": "11min",
          "summary": "Explica os valores SHAP com a analogia da divisão justa de um prêmio e mostra os gráficos de resumo, dependência e cascata. Ensina a traduzir as principais contribuições em razões de decisão em português claro.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Viés e fairness: medir antes de opinar",
          "type": "video",
          "duration": "11min",
          "summary": "Mostra as três portas de entrada do viés (amostragem, rótulo histórico e variáveis substitutas) e as métricas de fairness por grupo com o Fairlearn. Discute os trade-offs entre métricas e as mitigações antes, durante e depois do treino.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Model cards e datasheets: documentar para quem usa e para quem audita",
          "type": "video",
          "duration": "10min",
          "summary": "Apresenta o model card como a bula do modelo e o datasheet como a ficha técnica dos dados. Mostra como manter a documentação viva, gerada em parte pelo registro de experimentos e revisada a cada retreino.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "LGPD e decisões automatizadas",
          "type": "video",
          "duration": "12min",
          "summary": "Explica o art. 20 da LGPD sobre revisão de decisões automatizadas e informações sobre critérios, e traduz os princípios da lei em requisitos técnicos. Apresenta o RIPD e o papel do encarregado (DPO), com aviso para conferir as orientações mais recentes da ANPD.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: a cooperativa e o pedido de revisão",
          "type": "leitura",
          "duration": "30min",
          "summary": "Um associado da zona rural tem o limite negado, pede revisão e o time não sabe explicar a decisão.",
          "content": "Uma cooperativa de crédito, fictícia, usa um modelo para pré-aprovar limites de crédito no aplicativo. O modelo foi treinado com cinco anos de histórico e tinha bom desempenho geral na validação.\n\nUm associado da zona rural teve o limite negado e pediu revisão, citando o direito previsto no art. 20 da LGPD de solicitar revisão de decisões tomadas unicamente com base em tratamento automatizado e de receber informações sobre os critérios usados. O time de dados não soube explicar, de forma clara, por que o modelo tinha negado.\n\nAo investigar, o time gerou explicações individuais e mediu o desempenho por grupo. Descobriu que o modelo errava mais com associados do interior: eles tinham menos histórico digital, e várias features dependiam de transações em canais digitais. Bons pagadores do interior eram classificados como risco alto com frequência maior que os da capital.\n\nA cooperativa precisou decidir como mitigar o problema, como responder ao associado e como documentar tudo para futuras auditorias e para o encarregado de dados.\n\nPerguntas para discussão: (1) Como construir, com SHAP, uma explicação que o associado consiga entender? (2) Qual métrica de fairness faz mais sentido neste caso, e que diferença entre grupos seria aceitável? (3) O que deve constar do model card e do RIPD deste modelo?"
        },
        {
          "title": "Laboratório: explicabilidade, viés por região e model card",
          "type": "pratica",
          "duration": "3h",
          "summary": "No Google Colab, com SHAP e Fairlearn, use o modelo Olist do Módulo 2 para produzir a explicação global e a de cinco pedidos individuais, medir o recall de atrasos por região do cliente (Norte, Nordeste, Centro-Oeste, Sudeste e Sul), preencher o model card e aplicar o checklist de LGPD para decisões automatizadas. Entregue o model card e um relatório de explicabilidade e viés de duas páginas.",
          "practiceTool": "Colab",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Qual destas NÃO é uma das três razões para explicar um modelo apresentadas no módulo?",
          "options": [
            "Depurar erros e vazamentos.",
            "Gerar confiança no negócio.",
            "Cumprir obrigações legais.",
            "Aumentar automaticamente a AUC."
          ],
          "correctIndex": 3,
          "explanation": "Explicar ajuda a depurar, a gerar confiança e a cumprir obrigações. Não melhora a métrica por si só."
        },
        {
          "prompt": "O que a importância por permutação mede?",
          "options": [
            "Quanto o desempenho cai quando embaralhamos os valores de uma feature.",
            "A correlação entre duas features.",
            "Quantas vezes uma feature aparece nas árvores.",
            "A causa do evento previsto."
          ],
          "correctIndex": 0,
          "explanation": "Se embaralhar a coluna derruba o desempenho, o modelo dependia dela. Importância não é causalidade."
        },
        {
          "prompt": "Na explicação SHAP de uma previsão, o que acontece quando somamos a previsão média às contribuições de todas as features?",
          "options": [
            "Obtemos zero.",
            "Obtemos exatamente a previsão daquele caso.",
            "Obtemos a AUC do modelo.",
            "Obtemos o número de features."
          ],
          "correctIndex": 1,
          "explanation": "Por isso o SHAP é chamado de aditivo: as contribuições explicam a diferença entre a média e a previsão do caso."
        },
        {
          "prompt": "Retirar a variável sensível (por exemplo, região) do modelo garante que ele não terá viés?",
          "options": [
            "Sim, sempre.",
            "Não: variáveis substitutas podem carregar a mesma informação, e sem a variável fica mais difícil medir o problema.",
            "Sim, se o modelo for linear.",
            "Sim, se o dataset for grande."
          ],
          "correctIndex": 1,
          "explanation": "CEP, escola ou tempo de deslocamento podem funcionar como proxies. Medir por grupo é o caminho."
        },
        {
          "prompt": "O art. 20 da LGPD garante ao titular:",
          "options": [
            "O direito de exigir que a empresa não use IA.",
            "O direito de solicitar a revisão de decisões tomadas unicamente com base em tratamento automatizado que afetem seus interesses.",
            "O direito de receber o código-fonte do modelo.",
            "O direito de escolher o algoritmo usado."
          ],
          "correctIndex": 1,
          "explanation": "O titular pode pedir revisão e informações claras sobre os critérios, respeitados os segredos comercial e industrial."
        }
      ]
    },
    {
      "id": "modulo-5",
      "title": "Empacotar e servir",
      "subtitle": "Competência: publicar modelos de forma reprodutível",
      "duration": "7h",
      "free": false,
      "lessons": [
        {
          "title": "Do notebook ao código: projeto, ambiente e reprodutibilidade",
          "type": "video",
          "duration": "10min",
          "summary": "Transforma o notebook num projeto com estrutura de pastas, funções pequenas, dependências fixadas, semente registrada e configuração fora do código. Introduz testes unitários de features com pytest e um teste de ponta a ponta.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Rastreamento de experimentos e registro de modelos com MLflow",
          "type": "video",
          "duration": "11min",
          "summary": "Mostra o MLflow como caderno de laboratório automático (parâmetros, métricas, artefatos) e o registro de modelos com versões e apelidos campeão e desafiante. Liga cada versão aos dados, ao código e ao ambiente que a geraram.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Lote, online ou streaming: escolhendo o padrão de serviço",
          "type": "video",
          "duration": "10min",
          "summary": "Compara os padrões lote, online, streaming e embarcado e propõe quatro perguntas para escolher entre eles. Mostra o scoring dentro do SQL com BigQuery ML e ai_query, e a regra prática de começar pelo lote.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "O modelo como API: FastAPI e Gradio",
          "type": "video",
          "duration": "11min",
          "summary": "Explica REST, HTTP e JSON e constrói uma API com FastAPI que carrega o modelo campeão, valida a entrada e expõe /predict e /health. Cria uma demonstração com Gradio para validar com o negócio antes de integrar sistemas.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Contêineres: empacotando tudo com Docker",
          "type": "video",
          "duration": "10min",
          "summary": "Explica imagens e contêineres com a analogia do contêiner de navio e escreve um Dockerfile enxuto e seguro para a API. Compara onde rodar: serviços gerenciados, Kubernetes ou plataformas de ML com serviço embutido.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "CI/CD para ML: testes, portão de qualidade e deploy gradual",
          "type": "video",
          "duration": "12min",
          "summary": "Apresenta CI/CD e treinamento contínuo (CT) e monta um pipeline no GitHub Actions com testes de código, de dados e de modelo e um portão de qualidade. Mostra modo sombra, canário, rollback e aprovação humana para modelos de alto impacto.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: a seguradora e o modelo que morava num notebook",
          "type": "leitura",
          "duration": "30min",
          "summary": "Um modelo de fraude em sinistros leva quatro meses por atualização e ninguém sabe qual versão está em uso.",
          "content": "Uma seguradora de automóveis, fictícia, tinha um modelo de detecção de fraude em sinistros criado por um único cientista de dados. O modelo vivia no notebook dele, e o scoring era feito numa planilha exportada toda semana e enviada por e-mail aos analistas.\n\nCada atualização do modelo levava cerca de quatro meses: preparar dados à mão, treinar, validar em planilhas, pedir aprovação e copiar arquivos para um servidor. Quando um analista perguntou qual versão estava em uso, ninguém soube responder com certeza.\n\nA área de sinistros queria mais: analisar o risco de fraude no momento da abertura do sinistro, ainda com o cliente ao telefone. Isso exigia uma resposta em segundos, e não uma planilha semanal.\n\nA diretoria pediu ao time de dados um plano para levar o modelo à produção de forma profissional, com rastreabilidade, atualizações mais rápidas e segurança para voltar atrás se algo desse errado.\n\nPerguntas para discussão: (1) Que partes do problema seriam resolvidas por scoring em lote e quais exigiriam uma API online? (2) Como o registro de modelos e os apelidos campeão e desafiante mudariam a pergunta \"qual versão está em uso\"? (3) Quais testes e portões de qualidade você colocaria no pipeline de CI/CD antes de qualquer troca de modelo?"
        },
        {
          "title": "Laboratório: modelo registrado, API, contêiner e CI/CD",
          "type": "pratica",
          "duration": "3h",
          "summary": "Com MLflow (no Colab ou na Databricks Free Edition), FastAPI, Docker, Gradio no Hugging Face Spaces e GitHub Actions, registre três execuções do modelo Olist e promova a melhor, crie a API com /predict e /health, escreva o Dockerfile e configure um workflow que roda os testes e constrói a imagem. Entregue o repositório com pipeline verde, o modelo registrado com versão e o link da demonstração publicada.",
          "practiceTool": "GitHub Actions",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Para que serve o registro de modelos do MLflow?",
          "options": [
            "Guardar senhas de produção.",
            "Versionar modelos aprovados, com apelidos como campeão e desafiante, e ligar cada versão à sua origem.",
            "Treinar modelos mais rápido.",
            "Substituir o Git."
          ],
          "correctIndex": 1,
          "explanation": "O registro é o almoxarifado dos modelos aprovados; trocar de versão em produção vira mudar um apelido."
        },
        {
          "prompt": "A reposição de estoque é decidida uma vez por dia, às 6h. Qual padrão de serviço é mais indicado?",
          "options": [
            "Online, com latência de milissegundos.",
            "Streaming.",
            "Lote, com um job agendado antes das 6h.",
            "Embarcado."
          ],
          "correctIndex": 2,
          "explanation": "Quando a decisão pode esperar horas, o lote é mais simples, barato e fácil de monitorar."
        },
        {
          "prompt": "O que é JSON?",
          "options": [
            "Um banco de dados.",
            "Um formato de texto com pares de nome e valor usado para trocar dados entre sistemas.",
            "Uma linguagem de programação.",
            "Um tipo de contêiner."
          ],
          "correctIndex": 1,
          "explanation": "JSON, JavaScript Object Notation, é o formato mais comum de entrada e saída de APIs."
        },
        {
          "prompt": "Por que copiar o arquivo de dependências antes do código no Dockerfile?",
          "options": [
            "Por exigência legal.",
            "Para aproveitar o cache de camadas: mudanças no código não reinstalam todas as dependências.",
            "Para deixar a imagem maior.",
            "Para rodar como administrador."
          ],
          "correctIndex": 1,
          "explanation": "As camadas são reaproveitadas enquanto não mudam, o que acelera os builds."
        },
        {
          "prompt": "No modo sombra (shadow), o que acontece com o novo modelo?",
          "options": [
            "Ele substitui o campeão imediatamente.",
            "Ele recebe o tráfego real e calcula previsões, mas ninguém usa a resposta dele; ela é comparada com a do campeão.",
            "Ele é desligado.",
            "Ele só roda à noite."
          ],
          "correctIndex": 1,
          "explanation": "O modo sombra permite observar o desafiante com dados reais sem risco para as decisões."
        }
      ]
    },
    {
      "id": "modulo-6",
      "title": "Monitorar e manter",
      "subtitle": "Competência: manter modelos saudáveis em produção",
      "duration": "7h",
      "free": false,
      "lessons": [
        {
          "title": "O que pode dar errado depois do deploy",
          "type": "video",
          "duration": "9min",
          "summary": "Mostra as falhas silenciosas de modelos em produção (dados quebrados, mudanças no mundo e no negócio) e os ciclos de realimentação. Organiza o monitoramento em quatro camadas: infraestrutura, dados, modelo e negócio.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Drift de dados: quando as entradas mudam",
          "type": "video",
          "duration": "11min",
          "summary": "Compara referência e janela atual e mede mudanças com PSI, teste KS e distâncias entre distribuições, com atenção a faltantes e categorias novas. Lembra que drift de dados é alarme antecipado, não sinônimo de problema.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Drift de conceito e desempenho com rótulos atrasados",
          "type": "video",
          "duration": "11min",
          "summary": "Diferencia drift de conceito de drift de dados e mostra como monitorar o desempenho quando o rótulo chega com atraso: desempenho por safra, métricas substitutas e amostras rotuladas. Reforça a análise por segmento.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Retreino: quando, como e com que garantias",
          "type": "video",
          "duration": "10min",
          "summary": "Compara retreino agendado, por gatilho e combinado, e mostra como retreinar pelo mesmo pipeline com os mesmos testes. Apresenta campeão e desafiante, modo sombra, teste A/B e o registro das decisões de retreino.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Alertas e observabilidade",
          "type": "video",
          "duration": "11min",
          "summary": "Apresenta logs, métricas e traces e define SLIs e SLOs para serviço, dados, modelo e negócio. Mostra como desenhar alertas que exigem ação, com runbooks, plantão e revisão pós-incidente sem caça a culpados.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Custos de operação: FinOps para ML",
          "type": "video",
          "duration": "12min",
          "summary": "Mapeia as fontes de custo de um modelo (treino com CPU ou GPU, inferência, dados e pessoas) e ensina a medir custo por previsão e custo total. Lista alavancas de FinOps para reduzir custos sem perder qualidade, incluindo desligar modelos sem valor.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: a operadora logística e a Black Friday",
          "type": "leitura",
          "duration": "30min",
          "summary": "Um modelo de prazo de entrega degrada e a empresa só percebe três semanas depois, pelas reclamações.",
          "content": "Uma operadora logística de última milha, fictícia, usava um modelo para estimar o prazo de entrega exibido aos clientes de seus parceiros de comércio eletrônico. O modelo funcionava bem havia meses.\n\nNo mesmo período, aconteceram duas mudanças: a Black Friday, com volume muito acima do normal, e a abertura de uma nova região de atendimento, com rotas e distâncias diferentes das que o modelo conhecia.\n\nO modelo continuou respondendo normalmente, sem nenhum erro técnico. Mas os prazos exibidos passaram a ser otimistas demais em várias rotas. A operação só percebeu três semanas depois, quando as reclamações de clientes chegaram ao atendimento dos parceiros.\n\nNa análise posterior, o time viu que os sinais estavam nos dados desde o segundo dia: a distribuição das distâncias mudou, apareceram novas cidades de destino e o atraso real das primeiras entregas já estava acima do previsto. Ninguém olhava para esses sinais de forma sistemática.\n\nPerguntas para discussão: (1) Que métricas de drift e de desempenho teriam mostrado o problema no segundo dia? (2) Que alertas você criaria, com quais limiares e quem deveria recebê-los? (3) Qual política de retreino faria sentido para eventos sazonais e para a abertura de novas regiões?"
        },
        {
          "title": "Laboratório: painel de monitoramento e plano de retreino",
          "type": "pratica",
          "duration": "3h",
          "summary": "No Google Colab, com Evidently e MLflow, simule produção com os pedidos Olist de 2018 comparados a uma referência de 2017: gere o relatório de drift de dados e de previsões, acompanhe o desempenho mês a mês com rótulos que chegam depois, defina três alertas com limiares justificados e simule um retreino comparando campeão e desafiante. Entregue o painel de monitoramento, a política de alertas e um plano de retreino de uma página.",
          "practiceTool": "Colab",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Por que as falhas de modelos em produção costumam ser silenciosas?",
          "options": [
            "Porque modelos nunca falham.",
            "Porque o modelo continua respondendo normalmente, só que com previsões piores.",
            "Porque os logs são apagados.",
            "Porque a GPU desliga."
          ],
          "correctIndex": 1,
          "explanation": "O serviço segue de pé e rápido; o que piora é a qualidade, que só aparece com monitoramento de dados e desempenho."
        },
        {
          "prompt": "Qual regra de bolso comum de interpretação do PSI indica mudança relevante?",
          "options": [
            "Abaixo de 0,1.",
            "Entre 0,1 e 0,25.",
            "Acima de 0,25.",
            "Exatamente 1."
          ],
          "correctIndex": 2,
          "explanation": "Abaixo de 0,1 costuma ser estável, de 0,1 a 0,25 pede atenção e acima de 0,25 indica mudança relevante. Ajuste ao seu caso."
        },
        {
          "prompt": "O que caracteriza o drift de conceito?",
          "options": [
            "A distribuição das entradas muda.",
            "A relação entre as entradas e a resposta muda.",
            "O servidor fica mais lento.",
            "O dataset fica maior."
          ],
          "correctIndex": 1,
          "explanation": "No drift de conceito, o mesmo perfil passa a ter outro desfecho. Só é confirmado medindo desempenho com rótulos reais."
        },
        {
          "prompt": "O que é um SLO?",
          "options": [
            "Um tipo de modelo.",
            "O objetivo de nível de serviço: o valor de um indicador que o time se compromete a manter.",
            "Uma linguagem de consulta.",
            "Um formato de arquivo."
          ],
          "correctIndex": 1,
          "explanation": "SLI é o que se mede; SLO é a meta para esse indicador, como 99,5% das requisições em menos de 300 ms."
        },
        {
          "prompt": "Qual é uma forma eficaz de reduzir o custo de operação de um modelo?",
          "options": [
            "Manter sempre o máximo de réplicas ligadas.",
            "Usar lote quando a decisão permite, dimensionar as máquinas e desligar modelos sem valor.",
            "Reprocessar todos os dados todos os dias.",
            "Usar GPU para tudo."
          ],
          "correctIndex": 1,
          "explanation": "Escolher o padrão de serviço certo, dimensionar recursos e cuidar do portfólio são as principais alavancas de FinOps."
        }
      ]
    },
    {
      "id": "modulo-7",
      "title": "LLMOps: IA generativa em produção",
      "subtitle": "Competência: operar aplicações de IA generativa com segurança",
      "duration": "7h",
      "free": false,
      "lessons": [
        {
          "title": "Do MLOps ao LLMOps: o que muda com IA generativa",
          "type": "video",
          "duration": "10min",
          "summary": "Explica o que é um LLM, o que são tokens e prompts e o que muda ao operar modelos de terceiros, com saída aberta e custo variável. Mostra o que continua igual: enquadramento, dados, avaliação, monitoramento e governança.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "RAG: respostas ancoradas nos documentos da empresa",
          "type": "video",
          "duration": "11min",
          "summary": "Apresenta o RAG como uma prova com consulta e detalha o pipeline: ingestão com metadados, divisão em trechos, embeddings e banco vetorial. Mostra busca híbrida, reordenação, regras de citação e filtro de permissão.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Avaliação de LLM: como saber se está bom",
          "type": "video",
          "duration": "11min",
          "summary": "Constrói um conjunto de referência e mede recuperação, fidelidade, relevância e formato com ferramentas como Ragas e promptfoo. Discute o LLM como juiz, seus vieses e a calibração humana, e o teste de regressão a cada mudança.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Guardrails e injeção de prompt",
          "type": "video",
          "duration": "11min",
          "summary": "Apresenta os riscos do OWASP para aplicações com LLM, com foco na injeção de prompt direta e indireta e no vazamento de dados. Organiza guardrails em camadas (entrada, contexto, saída e privilégio mínimo) e testes de equipe vermelha.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Custo por token, latência e cache",
          "type": "video",
          "duration": "10min",
          "summary": "Mostra como o custo se forma por tokens de entrada e saída e como estimar o custo por conversa e por mês. Reduz custo e latência com contexto enxuto, cache, roteamento entre modelos e limites, e rastreia cada chamada.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Agentes e MCP em produção",
          "type": "video",
          "duration": "12min",
          "summary": "Explica agentes como o ciclo pensar, agir e observar com ferramentas e o MCP como padrão aberto de conexão a ferramentas e dados. Lista os controles para produção: privilégio mínimo, aprovação humana, limites, trilha de auditoria e avaliação de agentes.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: a operadora de saúde e o assistente que obedecia aos documentos",
          "type": "leitura",
          "duration": "30min",
          "summary": "Um assistente interno de regras de cobertura sofre injeção de prompt, estoura o orçamento e troca de modelo sem avaliação.",
          "content": "Uma operadora de planos de saúde, fictícia, lançou um assistente interno que responde aos atendentes sobre regras de cobertura, usando RAG sobre normas, contratos e documentos enviados por prestadores.\n\nNo primeiro mês, três problemas apareceram. Primeiro: um documento enviado por um prestador continha uma instrução escondida que levava o assistente a recomendar a aprovação de determinados procedimentos. Alguns atendentes seguiram a recomendação antes que a auditoria percebesse.\n\nSegundo: o custo mensal ficou quatro vezes acima do previsto. Cada pergunta enviava ao modelo dezenas de trechos longos e todo o histórico da conversa. Terceiro: no meio do mês, o time trocou o modelo por uma versão nova, sem nenhum conjunto de avaliação, e ninguém soube dizer se as respostas melhoraram ou pioraram.\n\nA diretoria decidiu manter o assistente, porque os atendentes gostavam dele, mas exigiu um plano para torná-lo seguro, previsível no custo e avaliado antes de qualquer mudança.\n\nPerguntas para discussão: (1) Que guardrails em camadas teriam impedido a injeção indireta pelo documento do prestador? (2) Quais alavancas de custo você aplicaria primeiro, e como garantir que a qualidade não caia? (3) Como montar o conjunto de avaliação e o teste de regressão para futuras trocas de modelo ou de prompt?"
        },
        {
          "title": "Laboratório: assistente RAG avaliado e protegido",
          "type": "pratica",
          "duration": "3h",
          "summary": "No Google Colab, com LlamaIndex ou LangChain, banco vetorial Chroma, um modelo de linguagem via API com cota gratuita ou um modelo aberto e avaliação com Ragas ou promptfoo, monte um RAG que cita as fontes sobre documentos públicos (como o texto da LGPD e guias da ANPD). Crie um conjunto de 30 perguntas de referência, meça fidelidade e relevância, teste um guardrail com 10 tentativas de injeção de prompt e estime o custo por mil perguntas. Entregue o notebook, o relatório de avaliação e de custo e a tabela de ataques testados.",
          "practiceTool": "Colab",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "O que é um token, no contexto de LLMs?",
          "options": [
            "Uma senha de acesso.",
            "Um pedaço de texto, em geral parte de uma palavra, usado para processar e cobrar as chamadas.",
            "Um tipo de banco vetorial.",
            "Uma criptomoeda."
          ],
          "correctIndex": 1,
          "explanation": "Os modelos leem e geram texto em tokens, e a maioria dos provedores cobra por milhão de tokens de entrada e de saída."
        },
        {
          "prompt": "Qual é a ideia central do RAG?",
          "options": [
            "Retreinar o LLM toda semana.",
            "Buscar trechos relevantes nos documentos e entregá-los ao LLM junto com a pergunta, para responder com base neles.",
            "Usar apenas o conhecimento interno do modelo.",
            "Gerar imagens a partir de texto."
          ],
          "correctIndex": 1,
          "explanation": "Como uma prova com consulta: conhecimento atualizado e citável, sem retreinar o modelo."
        },
        {
          "prompt": "O que é injeção de prompt indireta?",
          "options": [
            "Um erro de digitação do usuário.",
            "Uma instrução maliciosa escondida num documento, e-mail ou página que o sistema lê.",
            "Um ataque ao banco de dados SQL.",
            "Uma falha de rede."
          ],
          "correctIndex": 1,
          "explanation": "Para o LLM, tudo é texto. Por isso conteúdo recuperado deve ser tratado como dado, nunca como instrução."
        },
        {
          "prompt": "Ao usar um LLM como juiz para avaliar respostas, qual cuidado é essencial?",
          "options": [
            "Nenhum: ele é sempre imparcial.",
            "Calibrar as notas dele com as de especialistas numa amostra, porque ele tem vieses conhecidos.",
            "Usar sempre o mesmo modelo que gera as respostas.",
            "Avaliar apenas uma pergunta."
          ],
          "correctIndex": 1,
          "explanation": "Juízes automáticos tendem a preferir respostas longas e o próprio estilo. A calibração humana mantém a avaliação honesta."
        },
        {
          "prompt": "Qual controle é mais importante para um agente que pode executar reembolsos?",
          "options": [
            "Dar acesso de administrador a todos os sistemas.",
            "Exigir aprovação humana para a ação de reembolso e aplicar privilégio mínimo às ferramentas.",
            "Aumentar o limite de passos.",
            "Desligar a trilha de auditoria."
          ],
          "correctIndex": 1,
          "explanation": "Ações irreversíveis ou de alto impacto pedem aprovação humana, e cada ferramenta deve ter o menor acesso possível."
        }
      ]
    },
    {
      "id": "modulo-8",
      "title": "Plataforma, governança e escala",
      "subtitle": "Competência: escalar e governar a IA de produção",
      "duration": "7h",
      "free": false,
      "lessons": [
        {
          "title": "Níveis de maturidade de MLOps",
          "type": "video",
          "duration": "10min",
          "summary": "Apresenta os níveis de maturidade de MLOps (manual, pipeline automatizado e CI/CD de ponta a ponta) e um autodiagnóstico objetivo, modelo a modelo. Orienta a priorizar por risco e valor e a não pular degraus.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Arquitetura de referência de uma plataforma de ML",
          "type": "video",
          "duration": "11min",
          "summary": "Monta a arquitetura de referência com dados, features, treino, registro, serviço, monitoramento, gateway de LLMs e catálogo. Discute construir ou comprar e a infraestrutura como código (IaC) com modelos de projeto prontos.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Papéis e times da IA de produção",
          "type": "video",
          "duration": "10min",
          "summary": "Define os papéis da IA de produção, do dono do produto ao engenheiro de plataforma, e como organizar time de plataforma, times de produto e centro de excelência. Distribui responsabilidades do ciclo de vida com uma matriz RACI.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Governança de IA e a ISO/IEC 42001",
          "type": "video",
          "duration": "11min",
          "summary": "Estrutura a governança de IA em inventário, classificação de risco, aprovação proporcional, evidências e revisão periódica. Explica o que a ISO/IEC 42001 pede de um sistema de gestão de IA e como o MLOps já produz boa parte das evidências.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Regulação: AI Act europeu e PL 2338/2023",
          "type": "video",
          "duration": "11min",
          "summary": "Explica a abordagem por risco do AI Act da UE e do PL 2338/2023, com o que muda para sistemas de alto risco e para empresas brasileiras. Mostra como o que foi construído no programa prepara o time, com aviso para conferir o estado das regras antes de gravar.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Indicadores de valor: provando o retorno da IA em produção",
          "type": "video",
          "duration": "12min",
          "summary": "Define indicadores de valor por modelo (KPI afetado, medição com controle, custo total e ROI) e do portfólio (tempo até a produção, incidentes, documentação em dia). Mostra como comunicar à diretoria e decidir expandir, corrigir ou desligar modelos.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: o varejista com 12 modelos e nenhum inventário",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma auditoria pede o inventário de modelos e a empresa descobre que não sabe quais usam dados pessoais nem quem responde por dois deles.",
          "content": "Um grupo varejista, fictício, tem 12 modelos em produção: previsão de demanda, precificação, recomendação, crédito no crediário próprio, prevenção de fraude e outros. Eles são mantidos por quatro times diferentes, cada um com as suas ferramentas, o seu jeito de publicar e o seu jeito de monitorar, quando monitora.\n\nUma auditoria interna pediu o inventário dos modelos, com finalidade, dados usados, responsáveis e riscos. Foram necessárias três semanas para montar uma planilha, e ela ainda tinha lacunas: ninguém sabia dizer com certeza quais modelos usavam dados pessoais, e dois modelos não tinham dono identificado.\n\nAo mesmo tempo, a área comercial planejava vender o crediário em parceria com uma empresa europeia, o que trouxe à mesa perguntas sobre o AI Act. E a diretoria queria saber, afinal, quanto valor os 12 modelos geravam.\n\nO time de dados recebeu a missão de propor, em 90 dias, uma plataforma comum, um modelo de governança e um painel de indicadores de valor, sem parar os modelos que já estavam rodando.\n\nPerguntas para discussão: (1) Como você classificaria os 12 modelos por risco, e quais teriam prioridade na governança? (2) Que componentes a plataforma comum precisa ter primeiro, e o que pode esperar? (3) Quais indicadores a diretoria deveria acompanhar todo trimestre?"
        },
        {
          "title": "Laboratório: plataforma, governança e indicadores de valor",
          "type": "pratica",
          "duration": "3h",
          "summary": "Com Google Docs, Google Sheets e Miro (ou draw.io), avalie a maturidade de MLOps do seu time com o questionário fornecido, desenhe a arquitetura-alvo, monte a matriz RACI, classifique um inventário fictício de 12 modelos por risco, preencha o checklist de ISO/IEC 42001 e de regulação e defina o painel de indicadores de valor. Entregue um documento de plataforma e governança de até 8 páginas.",
          "practiceTool": "Google Docs",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "O que caracteriza o nível 1 de maturidade de MLOps?",
          "options": [
            "Tudo é feito à mão em notebooks.",
            "Treino e previsão rodam por pipeline automatizado, com dados testados, registro de modelos e monitoramento.",
            "Não existe nenhum modelo em produção.",
            "Todos os modelos usam IA generativa."
          ],
          "correctIndex": 1,
          "explanation": "O nível 0 é manual; o nível 1 automatiza o pipeline; o nível 2 aplica CI/CD de ponta a ponta ao próprio pipeline."
        },
        {
          "prompt": "Qual a função de um gateway de LLMs na arquitetura de referência?",
          "options": [
            "Treinar LLMs do zero.",
            "Ser o ponto único de chamada aos modelos de linguagem, com controle de acesso, limites, cache, custos e guardrails.",
            "Substituir o banco de dados.",
            "Gerar dashboards."
          ],
          "correctIndex": 1,
          "explanation": "Centralizar as chamadas permite governar custo, segurança e qualidade de todas as aplicações generativas."
        },
        {
          "prompt": "Na matriz RACI, quantos \"Accountable\" pode haver por atividade?",
          "options": [
            "Nenhum.",
            "Exatamente um.",
            "Dois.",
            "Quantos forem necessários."
          ],
          "correctIndex": 1,
          "explanation": "Só uma pessoa responde pelo resultado de cada atividade; várias podem executar, ser consultadas ou informadas."
        },
        {
          "prompt": "O que a ISO/IEC 42001 estabelece?",
          "options": [
            "Um algoritmo obrigatório de ML.",
            "Requisitos para um sistema de gestão de IA: políticas, papéis, avaliação de riscos e impacto, controles, auditoria e melhoria contínua.",
            "Uma lista de modelos proibidos.",
            "O preço máximo de uma GPU."
          ],
          "correctIndex": 1,
          "explanation": "É uma norma certificável de sistema de gestão, no mesmo raciocínio da ISO/IEC 27001 de segurança da informação."
        },
        {
          "prompt": "Qual a forma mais honesta de medir o valor gerado por um modelo?",
          "options": [
            "Perguntar ao time que o criou.",
            "Comparar com um grupo de controle ou teste A/B, descontando o custo total do modelo.",
            "Usar a AUC como valor em reais.",
            "Contar o número de previsões feitas."
          ],
          "correctIndex": 1,
          "explanation": "Grupo de controle ou teste A/B isolam o efeito do modelo; o ROI desconta infraestrutura, tokens e pessoas."
        }
      ]
    }
  ],
  "library": [
    {
      "title": "Canvas de enquadramento de problemas de ML",
      "description": "Uma página para definir decisão, ação, alvo, unidade, horizonte, métrica, baseline e custo do erro antes de escrever qualquer query.",
      "tool": "Google Docs",
      "url": null
    },
    {
      "title": "Checklist de vazamento de dados",
      "description": "Doze perguntas para revisar cada feature com o teste \"o que eu sabia naquele dia?\".",
      "tool": "Google Docs",
      "url": null
    },
    {
      "title": "Guia de funções de janela para features",
      "description": "Padrões de recência, frequência, médias móveis e contagens acumuladas em BigQuery e Spark SQL.",
      "tool": "BigQuery",
      "url": null
    },
    {
      "title": "Planilha de matriz de custo e escolha de limiar",
      "description": "Calcula o custo total por limiar a partir dos custos de alarmes falsos e de eventos não detectados.",
      "tool": "Google Sheets",
      "url": null
    },
    {
      "title": "Modelo de data contract em YAML",
      "description": "Contrato comentado com esquema, significado, SLA, responsáveis e regras de qualidade.",
      "tool": "GitHub",
      "url": null
    },
    {
      "title": "Template de model card em português",
      "description": "Identificação, uso pretendido, dados, desempenho por grupo, limitações e responsáveis.",
      "tool": "Google Docs",
      "url": null
    },
    {
      "title": "Repositório-modelo de projeto de ML",
      "description": "Estrutura de pastas, API em FastAPI, Dockerfile e workflow de CI no GitHub Actions prontos para adaptar.",
      "tool": "GitHub",
      "url": null
    },
    {
      "title": "Template de painel de monitoramento e runbook",
      "description": "Painel com drift, desempenho por safra e custo, mais o roteiro de resposta a incidentes de modelo.",
      "tool": "Colab",
      "url": null
    },
    {
      "title": "Notebook-modelo de RAG com avaliação e guardrails",
      "description": "Pipeline de RAG com citações, conjunto de referência, métricas de fidelidade e relevância e lista de ataques de injeção de prompt.",
      "tool": "Colab",
      "url": null
    },
    {
      "title": "Questionário de maturidade de MLOps e checklist de ISO/IEC 42001",
      "description": "Autodiagnóstico modelo a modelo e lista de verificação de governança e regulação para times técnicos.",
      "tool": "Google Sheets",
      "url": null
    }
  ],
  "nextSteps": [
    {
      "title": "Leve este programa para sua empresa",
      "description": "Turma fechada para o seu time de TI e dados, com laboratórios adaptados aos seus dados e ao seu setor, e investimento sob proposta.",
      "href": "/giselle/palestras?src=curso&c=ia-de-producao-times-dados#proposta",
      "label": "Solicitar proposta"
    },
    {
      "title": "Diagnóstico de maturidade em IA",
      "description": "Descubra em poucos minutos em que ponto sua empresa está na jornada de dados e IA e por onde começar.",
      "href": "/diagnostico-ia?src=curso&c=ia-de-producao-times-dados",
      "label": "Fazer o diagnóstico"
    }
  ]
};
