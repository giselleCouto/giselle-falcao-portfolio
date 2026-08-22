import type { Course } from "./types";

// Curso de extensão da palestra "Da Query ao Modelo" (DATA BH · SQL Saturday 2026).
// Estrutura = Plano de Prática de 30 Dias (S1–S4) + os 7 atos do lab executável.
// Fontes: plano_de_aula.md, lab_da_query_ao_modelo.py e slides da palestra.

const LAB_URL = "/cursos/notebooks/lab_da_query_ao_modelo.py";
const SLIDES_URL = "/cursos/materiais/da-query-ao-modelo-slides.pptx";
const FREE_EDITION_URL = "https://www.databricks.com/learn/free-edition";

export const daQueryAoModelo: Course = {
  slug: "da-query-ao-modelo",
  title: "Da Query ao Modelo: IA de Produção com SQL e Python",
  level: "Iniciante",
  hours: "16h",
  free: true,
  tagline:
    "Seu SQL já cobre 80% do caminho até um modelo de ML em produção. Em 4 semanas, você percorre os 20% restantes — reproduzindo, adaptando, competindo e publicando.",
  description:
    "Trilha de prática de 30 dias que estende a palestra do DATA BH / SQL Saturday 2026: da query exploratória ao modelo servido como API, passando por Delta Lake, Window Functions como features, MLlib vs AutoML e MLflow. Tudo executável na Databricks Free Edition, com o notebook completo da palestra e os quatro tropeços de iniciante já vacinados.",
  outcomes: [
    "Reproduzir o pipeline completo da palestra na Databricks Free Edition e reconhecer cada etapa (query → DataFrame → Delta → features → modelo → scoring)",
    "Mapear operações SQL que você já domina (SELECT, JOIN, GROUP BY, CASE WHEN, Window Functions) para preparação de dados e feature engineering em ML",
    "Definir um problema de classificação supervisionada usando vocabulário SQL (feature = coluna preditora; label = coluna resposta via CASE WHEN) e detectar data leakage com o teste 'o que eu sabia naquele dia?'",
    "Treinar e comparar modelos com MLlib e AutoML, lendo a tabela de runs do MLflow como uma tabela auditável",
    "Publicar o resultado — scoring em lote ou endpoint — e consumir o modelo de dentro de um SELECT com ai_query",
    "Planejar prática deliberada evitando os quatro tropeços clássicos: leakage, acurácia enganosa, treino igual a teste e falta de rastreio",
  ],
  audience:
    "Analistas de dados, engenheiros de dados, DBAs e profissionais com SQL intermediário que querem entrar em Machine Learning sem recomeçar do zero — especialmente quem assistiu à palestra no DATA BH / SQL Saturday.",
  prerequisites:
    "SQL intermediário (JOINs, GROUP BY, subqueries). Python básico é desejável, não obrigatório. Conta gratuita na Databricks Free Edition (criada na Semana 1).",
  status: "disponivel",
  modules: [
    {
      id: "semana-1",
      title: "Semana 1 · Reproduzir na Free Edition",
      subtitle: "Execute o fluxo completo e reconheça cada etapa",
      duration: "4h",
      free: true,
      lessons: [
        {
          title: "A tese dos 80%: seu SQL já é o caminho",
          type: "video",
          duration: "15min",
          summary:
            "Abertura da jornada: os dois caminhos até o ML (o da matemática e o do SQL), a tese de que o repertório de SQL cobre a maior parte de um pipeline de produção e o mapa completo do que vamos construir. Contrato de zero gatekeeping: nenhuma equação será exigida.",
        },
        {
          title: "Guia: criar sua conta na Databricks Free Edition e importar o notebook",
          type: "leitura",
          duration: "30min",
          summary:
            "Passo a passo para criar a conta gratuita, criar um workspace, importar o notebook do lab (arquivo .py) e executar o Run All. Inclui o que fazer se AutoML ou Model Serving não aparecerem no seu workspace — o caminho garantido de MLlib + MLflow funciona em qualquer conta.\n\nBaixe o notebook na Biblioteca de prática ao lado e siga: Workspace → Import → selecione o arquivo → Run All.",
        },
        {
          title: "Atos 1 e 2 — spark.sql( ): três caracteres de distância, e Delta Lake com Time Travel",
          type: "video",
          duration: "20min",
          summary:
            "A ponte: a mesma query de sempre, só que devolvendo um DataFrame — a 'tabela viva' que aceita mais SQL, aceita Python e é o formato que o modelo come. Depois, Delta Lake: CREATE TABLE USING DELTA é SQL; alguém apaga metade da tabela numa sexta-feira, DESCRIBE HISTORY mostra tudo e RESTORE TABLE volta no tempo. Para ML isso significa treinar hoje com os dados exatos de ontem.",
        },
        {
          title: "Run All: executar o lab completo e reconhecer cada ato",
          type: "pratica",
          duration: "2h",
          practiceTool: "Databricks Free Edition",
          practiceUrl: FREE_EDITION_URL,
          summary:
            "Execute o notebook inteiro na sua conta gratuita (Run All) e percorra os 7 atos lendo as 'falas de palco' de cada célula: geração dos dados sintéticos (2.000 clientes, ~60k compras), a query-ponte, o desastre e o Time Travel, as features, o label, a disputa de modelos no MLflow e a lista de risco de churn. Critério de conclusão: todas as células executadas com saídas visíveis e você consegue explicar, em uma frase, o que cada ato faz.",
        },
        {
          title: "Quiz da Semana 1",
          type: "quiz",
          duration: "15min",
          summary:
            "Cinco questões sobre a tese dos 80%, o DataFrame como ponto de integração, Delta Lake, Time Travel e o que cada ato do lab entrega.",
        },
      ],
      quiz: [
        {
          prompt: "Na palestra, o DataFrame devolvido por spark.sql() foi descrito como uma 'tabela viva'. O que isso significa?",
          options: [
            "É uma tabela que se atualiza sozinha em tempo real a partir da fonte.",
            "É a tabela de resultado da query, que aceita mais SQL, aceita Python e é o formato que o modelo de ML consome.",
            "É uma cópia da tabela original que só pode ser lida por Python.",
          ],
          correctIndex: 1,
          explanation:
            "A única novidade na query-ponte é o df: o resultado deixa de ser estático e vira o ponto de integração entre SQL e o ecossistema de ML — continua aceitando SQL e agora também Python.",
        },
        {
          prompt: "Por que Delta Lake é 'a tabela que ML exige'?",
          options: [
            "Porque é o único formato aceito pelo Spark.",
            "Porque garante ACID, schema enforcement e Time Travel — o que permite treinar hoje com os dados exatos de ontem (reprodutibilidade).",
            "Porque comprime mais que Parquet e por isso treina mais rápido.",
          ],
          correctIndex: 1,
          explanation:
            "Confiabilidade e reprodutibilidade são requisitos de dados de produção. Com Time Travel você audita e restaura versões; para ML, isso é reprodutibilidade grátis.",
        },
        {
          prompt: "Alguém executou DELETE FROM vendas WHERE valor < 100 e metade da tabela sumiu. Qual comando SQL restaura a tabela ao estado anterior?",
          options: [
            "ROLLBACK TABLE vendas;",
            "RESTORE TABLE vendas TO VERSION AS OF 0;",
            "UNDO DELETE FROM vendas;",
          ],
          correctIndex: 1,
          explanation:
            "No Ato 2, DESCRIBE HISTORY mostra as versões e RESTORE TABLE ... TO VERSION AS OF 0 devolve a tabela como era antes do desastre — tudo em SQL.",
        },
        {
          prompt: "Qual é a 'tese dos 80%' que abre a jornada?",
          options: [
            "80% dos modelos de ML falham em produção por falta de dados.",
            "Suas habilidades de SQL já cobrem a maior parte (cerca de 80%) do caminho até um modelo de ML em produção.",
            "Apenas 80% dos dados devem ser usados para treinar o modelo.",
          ],
          correctIndex: 1,
          explanation:
            "O reenquadramento central: preparação de dados, features e label são operações SQL que você já domina. Os 20% restantes — treino, rastreio e serving — são o que a trilha ensina.",
        },
        {
          prompt: "O que o Ato 0 do lab faz, e por que ele roda 'antes, não no palco'?",
          options: [
            "Treina o modelo final; roda antes porque demora horas.",
            "Gera os dados sintéticos de vendas (2.000 clientes, ~60k compras) com padrões reais de churn embutidos; roda antes porque é preparação, não demonstração.",
            "Cria a conta na Databricks; roda antes porque exige aprovação manual.",
          ],
          correctIndex: 1,
          explanation:
            "O notebook é autossuficiente: o Ato 0 fabrica a própria base (clientes que 'esfriam' compram com intervalos crescentes antes de sumir). É bastidor, por isso fica fora do palco.",
        },
      ],
    },
    {
      id: "semana-2",
      title: "Semana 2 · Adaptar aos próprios dados",
      subtitle: "Troque as tabelas e mantenha o pipeline rastreável",
      duration: "4h15",
      free: true,
      lessons: [
        {
          title: "Ato 3 — Feature engineering é SELECT avançado",
          type: "video",
          duration: "20min",
          summary:
            "Cada Window Function vira um sinal com significado de negócio: AVG sobre ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING (tendência, excluindo a compra atual), DATEDIFF com LAG (recência), NTILE(10) (decil de gasto), MAX do intervalo (o cliente está esfriando?). A diferença entre uma coluna comum e um sinal é a pergunta de negócio que ela responde.",
        },
        {
          title: "Ato 4 — O alvo nasce de um CASE WHEN honesto",
          type: "video",
          duration: "15min",
          summary:
            "Churn = ficou 90+ dias sem comprar. O label é um CASE WHEN; features + label = dataset de treino. Você acabou de definir um problema de classificação sem uma equação. E a armadilha: a coluna ultima_compra só define o label — se entrasse como feature, o modelo teria 100% de acurácia e seria inútil. Isso é data leakage.",
        },
        {
          title: "Data leakage: o caso 'motivo_do_cancelamento' e o teste-antídoto",
          type: "leitura",
          duration: "30min",
          summary:
            "Leitura curta e memorável: a coluna que só existe depois do evento que você quer prever, a acurácia 'boa demais' como sinal de alerta e o teste-antídoto que resolve tudo — para cada feature, pergunte: 'o que eu sabia naquele dia?'. Inclui um checklist para auditar suas próprias features antes de treinar.",
        },
        {
          title: "Adapte o lab às suas tabelas: recrie as janelas com a lógica do seu negócio",
          type: "pratica",
          duration: "3h",
          practiceTool: "Databricks Free Edition",
          practiceUrl: FREE_EDITION_URL,
          summary:
            "Substitua vendas_raw por uma tabela do seu contexto (ou uma base pública de transações), defina o que é 'churn' (ou outro evento) no seu negócio via CASE WHEN, e recrie 3 a 5 features com Window Functions que façam sentido para você — mantendo o pipeline em Delta e rastreável. Entrega: a tabela de treino e uma frase por feature explicando qual sinal de negócio ela captura e por que não vaza a resposta.",
        },
        {
          title: "Quiz da Semana 2",
          type: "quiz",
          duration: "15min",
          summary:
            "Cinco questões sobre Window Functions como features, a definição do label via CASE WHEN, classificação supervisionada e detecção de data leakage.",
        },
      ],
      quiz: [
        {
          prompt: "Na feature media_ult_3_compras, por que a janela é ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING, e não 3 PRECEDING AND CURRENT ROW?",
          options: [
            "Por desempenho: janelas menores rodam mais rápido no Spark.",
            "Para excluir a compra atual da média — a feature não pode conter a própria resposta, primeira vacina contra data leakage.",
            "Porque o Spark não aceita CURRENT ROW em janelas de média.",
          ],
          correctIndex: 1,
          explanation:
            "A janela termina em 1 PRECEDING de propósito: a tendência é calculada só com compras anteriores. Incluir a linha atual misturaria o que você quer prever com o que usa para prever.",
        },
        {
          prompt: "No lab, o que define o label churn?",
          options: [
            "Um algoritmo de clustering que agrupa clientes parecidos.",
            "Um CASE WHEN: 1 se a última compra foi há mais de 90 dias (em relação à data de referência), 0 caso contrário.",
            "A média de gasto do cliente comparada à média geral.",
          ],
          correctIndex: 1,
          explanation:
            "CASE WHEN DATEDIFF(DATE'2026-08-01', ultima_compra) > 90 THEN 1 ELSE 0 END — o alvo de um problema de classificação nasce de vocabulário SQL.",
        },
        {
          prompt: "Você quer prever cancelamento e encontra na base a coluna motivo_do_cancelamento. Deve usá-la como feature?",
          options: [
            "Sim — é a coluna mais correlacionada com cancelamento, vai aumentar a acurácia.",
            "Não — ela só existe depois do cancelamento acontecer; usá-la é data leakage e o modelo seria inútil em produção.",
            "Sim, desde que você normalize os valores.",
          ],
          correctIndex: 1,
          explanation:
            "Teste-antídoto: 'o que eu sabia naquele dia?'. No dia da previsão, o motivo do cancelamento não existe. Acurácia altíssima aqui é sintoma, não mérito.",
        },
        {
          prompt: "Qual é a diferença entre uma 'coluna comum' e um 'sinal' (feature) no Ato 3?",
          options: [
            "Sinais são sempre numéricos; colunas comuns são texto.",
            "Um sinal responde a uma pergunta de negócio sobre o comportamento (tendência, recência, ritmo, intensidade); uma coluna comum é só um atributo armazenado.",
            "Sinais são criados por Python; colunas comuns vêm do SQL.",
          ],
          correctIndex: 1,
          explanation:
            "ritmo_medio_dias, maior_intervalo e decil_de_gasto capturam comportamento — o cliente está esfriando? — e é isso que dá poder preditivo, não a origem técnica da coluna.",
        },
        {
          prompt: "Por que o dataset de treino filtra WHERE qtd_compras >= 4?",
          options: [
            "Para acelerar o treinamento removendo linhas.",
            "Porque clientes com poucas compras não têm histórico suficiente para features de janela fazerem sentido (tendência, ritmo) — evita sinais vazios ou enganosos.",
            "Porque o Spark exige no mínimo 4 linhas por grupo.",
          ],
          correctIndex: 1,
          explanation:
            "Features baseadas em janelas precisam de histórico. Sem ele, média das 3 anteriores e ritmo médio ficam nulos ou instáveis — é higiene de dados, não otimização.",
        },
      ],
    },
    {
      id: "semana-3",
      title: "Semana 3 · Competir: AutoML vs MLlib",
      subtitle: "Compare velocidade, controle e clareza das escolhas",
      duration: "4h",
      free: true,
      lessons: [
        {
          title: "Ato 5 — Treinar com MLlib e rastrear tudo no MLflow",
          type: "video",
          duration: "20min",
          summary:
            "randomSplit 80/20 é 'estudar com a prova do ano passado e ser avaliado na deste ano'. Pipeline = VIEW sobre VIEW (VectorAssembler + classificador). Dois experimentos — regressão logística e GBT — com mlflow.log_param, log_metric(AUC) e log_model. Depois, a aba Experiments: a tabela de runs ordenada por AUC é uma tabela, e você audita tabelas a vida inteira.",
        },
        {
          title: "AutoML (glass box) vs MLlib: propósito, esforço e controle",
          type: "leitura",
          duration: "30min",
          summary:
            "AutoML testa dezenas de combinações e entrega cada tentativa como um notebook legível (glass box, não caixa-preta) — ideal para o primeiro baseline rápido. MLlib é o capô aberto: você escolhe cada estágio e entende cada decisão. A ordem certa de adoção: AutoML primeiro para ter um ponto de partida honesto, MLlib depois para entender e superar. Inclui o que fazer se a Free Edition não oferecer AutoML na interface.",
        },
        {
          title: "Rode o AutoML, estude o notebook campeão e tente superá-lo no MLlib",
          type: "pratica",
          duration: "3h",
          practiceTool: "Databricks Free Edition",
          practiceUrl: FREE_EDITION_URL,
          summary:
            "Se o seu workspace tiver AutoML: Experiments → Create AutoML Experiment apontando para treino_churn com target churn; abra o notebook do run campeão e leia o que ele fez. Depois, no MLlib, tente bater o AUC dele ajustando features, maxIter ou trocando o algoritmo — registrando cada tentativa no MLflow. Sem AutoML? Compare pelo menos três configurações de MLlib entre si. Entrega: a tabela de runs ordenada por AUC com uma frase sobre o que fez o campeão vencer.",
        },
        {
          title: "Quiz da Semana 3",
          type: "quiz",
          duration: "15min",
          summary:
            "Cinco questões sobre randomSplit, Pipeline, MLflow (params, métricas, modelo), AUC vs acurácia e a escolha entre AutoML e MLlib.",
        },
      ],
      quiz: [
        {
          prompt: "Por que o lab usa randomSplit([0.8, 0.2]) antes de treinar?",
          options: [
            "Para reduzir o volume de dados e treinar mais rápido.",
            "Para avaliar o modelo em dados que ele nunca viu — 'estudar com a prova do ano passado e ser avaliado na deste ano'; treinar e testar nos mesmos dados é um dos quatro tropeços.",
            "Porque o Spark exige dois DataFrames para o Pipeline funcionar.",
          ],
          correctIndex: 1,
          explanation:
            "Validação treino/teste é o protocolo de honestidade experimental. Treino igual a teste produz números ótimos e um modelo que não generaliza.",
        },
        {
          prompt: "O que o MLflow registra em cada run do lab, e qual a analogia usada na palestra?",
          options: [
            "Apenas o tempo de execução; a analogia é um cronômetro.",
            "Parâmetros (log_param), métrica AUC (log_metric) e o artefato do modelo (log_model); a tabela de runs é 'uma tabela — e vocês auditam tabelas a vida inteira'.",
            "Só o código-fonte; a analogia é um repositório Git.",
          ],
          correctIndex: 1,
          explanation:
            "MLflow é governança de experimentos: quem treinou o quê, com quais parâmetros, com qual resultado. Ler a aba Experiments é ler uma tabela auditável — paralelo direto com auditoria de tabelas.",
        },
        {
          prompt: "Por que AutoML foi chamado de 'glass box' na palestra?",
          options: [
            "Porque usa apenas modelos lineares, que são transparentes.",
            "Porque cada tentativa que ele faz vira um notebook legível — você vê e pode editar o código, em vez de receber uma caixa-preta.",
            "Porque mostra os dados em gráficos de vidro 3D.",
          ],
          correctIndex: 1,
          explanation:
            "O argumento que vence o ceticismo sênior: AutoML não esconde nada; entrega notebooks que você estuda, compara e tenta superar no MLlib.",
        },
        {
          prompt: "Qual é a ordem de adoção recomendada entre AutoML e MLlib, e por quê?",
          options: [
            "MLlib primeiro, porque AutoML é só para iniciantes.",
            "AutoML primeiro (baseline rápido e honesto), MLlib depois (entender cada estágio e tentar superar) — velocidade antes, controle depois.",
            "Tanto faz, ambos produzem o mesmo modelo.",
          ],
          correctIndex: 1,
          explanation:
            "É a Semana 3 do plano: competir. O AutoML dá o ponto de partida; o MLlib dá o capô aberto. Comparar velocidade, controle e clareza das escolhas é o objetivo.",
        },
        {
          prompt: "Por que o lab avalia com AUC (área sob a curva ROC) em vez de apenas acurácia?",
          options: [
            "Porque AUC é mais fácil de calcular no Spark.",
            "Porque em problemas desbalanceados (ex.: 25% de churn) a acurácia engana — prever 'ninguém cancela' já dá 75% de acerto; AUC mede a capacidade real de ranquear risco.",
            "Porque acurácia só funciona para regressão.",
          ],
          correctIndex: 1,
          explanation:
            "'Acurácia enganosa' é um dos quatro tropeços. AUC mede se o modelo separa bem quem cancela de quem não cancela, independentemente do ponto de corte.",
        },
      ],
    },
    {
      id: "semana-4",
      title: "Semana 4 · Publicar e apresentar",
      subtitle: "Registre o modelo, publique a saída e conte a história",
      duration: "4h",
      free: true,
      lessons: [
        {
          title: "Atos 6 e 7 — Prever é um JOIN mental: scoring, Registry e as duas portas",
          type: "video",
          duration: "20min",
          summary:
            "O clímax: o modelo campeão pontuando a base inteira (transform) e a lista de risco — 83%, 91%, 95% — nomes que o time de retenção pode ligar hoje. Depois, Model Registry e as duas portas de consumo: REST (curl no endpoint, serverless com scale-to-zero) e ai_query em SQL. A palestra termina onde começou: com um SELECT — que agora invoca IA.",
        },
        {
          title: "Os quatro tropeços para evitar",
          type: "leitura",
          duration: "30min",
          summary:
            "Inoculação final, um por um: (1) data leakage — a feature que contém a resposta; (2) acurácia enganosa — 'ninguém cancela' acerta 75%; (3) treino igual a teste — o modelo que decorou o gabarito; (4) falta de rastreio — o experimento que ninguém consegue reproduzir. Para cada um: como reconhecer, o caso memorável e o antídoto prático.",
        },
        {
          title: "Publique o scoring e apresente o resultado a alguém do negócio",
          type: "pratica",
          duration: "3h",
          practiceTool: "Databricks Free Edition",
          practiceUrl: FREE_EDITION_URL,
          summary:
            "Gere a lista priorizada de risco com o seu modelo (scoring em lote na Free Edition; endpoint se o workspace tiver Model Serving) e conte a história para uma pessoa do negócio em 5 minutos: qual decisão a lista apoia, como foi construída (sem jargão), o que ela NÃO promete e qual o próximo passo. A Semana 4 é a evidência de domínio: 'mostre a alguém'. Entrega: a lista + o resumo de 1 página da apresentação.",
        },
        {
          title: "Quiz da Semana 4",
          type: "quiz",
          duration: "15min",
          summary:
            "Cinco questões sobre scoring em lote, Model Registry, as duas portas de consumo (REST e ai_query), serverless/scale-to-zero e os quatro tropeços.",
        },
      ],
      quiz: [
        {
          prompt: "O que significa 'prever é um JOIN mental' no Ato 6?",
          options: [
            "Que o modelo precisa de um JOIN SQL para funcionar.",
            "Que aplicar o modelo (transform) é como juntar à sua tabela uma nova coluna — o risco previsto — linha a linha, para toda a base.",
            "Que previsões só funcionam em tabelas normalizadas.",
          ],
          correctIndex: 1,
          explanation:
            "campeao.transform(dados) devolve a base com churn_previsto e risco_de_churn por cliente — a lista priorizada que o time de retenção usa. Conceitualmente, é um JOIN entre seus dados e a inteligência do modelo.",
        },
        {
          prompt: "Quais são as duas portas para consumir um modelo servido, segundo a palestra?",
          options: [
            "Excel e Power BI.",
            "REST (chamada HTTP ao endpoint) e SQL (ai_query dentro de um SELECT).",
            "Python e R.",
          ],
          correctIndex: 1,
          explanation:
            "Porta 1: curl no serving endpoint. Porta 2: ai_query('churn_model', named_struct(...)) — o modelo invocado de dentro de um SELECT. 'A palestra termina onde começou.'",
        },
        {
          prompt: "O que significa 'scale to zero' em um endpoint serverless?",
          options: [
            "O modelo é apagado quando não usado.",
            "O endpoint desliga a computação quando não há requisições e sobe sob demanda — custo zero em repouso, com um 'cold start' na primeira chamada.",
            "O modelo aceita no máximo zero requisições simultâneas.",
          ],
          correctIndex: 1,
          explanation:
            "Por isso o lab recomenda 'chamar antes da palestra uma vez para aquecer': o cold start no palco mata o momento, mas em produção o scale-to-zero economiza quando ninguém consulta.",
        },
        {
          prompt: "Qual o papel do Model Registry no fluxo?",
          options: [
            "Armazenar os dados de treino para auditoria.",
            "Registrar versões do modelo com nome e estágio, para que o serving aponte para um modelo governado — não para um arquivo solto de um notebook.",
            "Acelerar o treinamento usando cache.",
          ],
          correctIndex: 1,
          explanation:
            "Registry é governança: o campeão vira um ativo nomeado e versionado (ex.: demo_palestra.default.churn_model), que o endpoint ou o ai_query consomem.",
        },
        {
          prompt: "Um colega treinou um modelo com 99% de acurácia em 10 minutos e não consegue dizer quais parâmetros usou. Quantos dos quatro tropeços isso sugere?",
          options: [
            "Nenhum — 99% é um ótimo resultado.",
            "Pelo menos dois sinais de alerta: acurácia enganosa/'boa demais' (possível leakage ou treino = teste) e falta de rastreio (sem MLflow não há como reproduzir ou auditar).",
            "Apenas um: falta de documentação.",
          ],
          correctIndex: 1,
          explanation:
            "Resultado bom demais é suspeito (leakage ou treino=teste), e 'não sei os parâmetros' é exatamente a falta de rastreio que o MLflow resolve. Pensamento crítico sobre resultados é competência da trilha.",
        },
      ],
    },
  ],
  library: [
    {
      title: "Notebook do lab — Da Query ao Modelo (Databricks)",
      description:
        "O notebook completo da palestra: 7 atos, gera os próprios dados, roda na Free Edition. Importe no seu workspace e dê Run All.",
      tool: "Databricks notebook (.py)",
      url: LAB_URL,
    },
    {
      title: "Databricks Free Edition",
      description: "Crie sua conta gratuita para executar o lab — é o ambiente de prática das 4 semanas.",
      tool: "Databricks",
      url: FREE_EDITION_URL,
    },
    {
      title: "Slides da palestra (DATA BH · SQL Saturday 2026)",
      description: "Apresentação completa com os 5 atos da demonstração, código e saídas reais lado a lado.",
      tool: "PowerPoint",
      url: SLIDES_URL,
    },
  ],
};
