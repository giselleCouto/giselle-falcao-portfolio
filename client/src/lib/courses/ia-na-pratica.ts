import type { Course } from "./types";

// Gerado a partir do material pedagógico em docs/cursos/ia-na-pratica/
// Edite videoUrl / slidesUrl / practiceUrl conforme grava e publica os materiais.

export const iaNaPratica: Course = {
  "slug": "ia-na-pratica",
  "title": "IA na Prática: Do Conceito ao Deploy",
  "level": "Intermediário",
  "hours": "40h",
  "free": false,
  "tagline": "Do dado bruto ao modelo publicado: 40h de IA aplicada com casos reais da indústria, do agro e da logística.",
  "description": "Curso completo de Inteligência Artificial aplicada. Aprenda a construir, treinar e colocar modelos de ML em produção. Do dado bruto à decisão inteligente, com laboratórios práticos e projetos reais.",
  "outcomes": [
    "Traduzir problemas de negócio em problemas de machine learning bem enquadrados (entrada, saída, métrica, baseline e custo do erro)",
    "Coletar, limpar e explorar dados reais usando Google Sheets, SQL no BigQuery e Python/pandas no Google Colab",
    "Construir e treinar modelos supervisionados de regressão e classificação com scikit-learn, seguindo um pipeline reprodutível",
    "Avaliar e validar modelos com métricas adequadas ao negócio, evitando overfitting, data leakage e validação mal feita",
    "Aplicar IA generativa (LLMs, RAG) em fluxos de trabalho reais, com critérios de custo, risco e governança",
    "Publicar um modelo como aplicação web funcional (Gradio no Colab) e definir seu plano de monitoramento e retreino"
  ],
  "audience": "Analistas, engenheiros, agrônomos, profissionais de logística e gestores técnicos que já trabalham com dados e querem fechar o ciclo completo de um projeto de IA; e desenvolvedores/estudantes que sabem o básico de programação mas nunca levaram um modelo até a produção.",
  "prerequisites": "Lógica básica e familiaridade com planilhas; noções de programação ajudam (o essencial de Python é retomado nos laboratórios) e basta uma conta Google gratuita — nada precisa ser instalado.",
  "status": "disponivel",
  "modules": [
    {
      "id": "modulo-1",
      "title": "Fundamentos de IA aplicada: do hype à prática",
      "duration": "5h",
      "free": true,
      "lessons": [
        {
          "title": "IA na prática: o que é, o que não é e onde ela gera valor",
          "type": "video",
          "duration": "20min",
          "summary": "Aula de boas-vindas que organiza o vocabulário (IA, ML, deep learning, IA generativa) e apresenta os quatro tipos de valor da IA: prever, classificar, otimizar e gerar. Três cenários brasileiros — detecção precoce de mastite no agro, manutenção preditiva na indústria e previsão de atraso na logística — mostram onde a IA gera dinheiro de verdade. Fecha com o filtro anti-hype de três perguntas: dado disponível, decisão recorrente, custo do erro tolerável."
        },
        {
          "title": "Do problema de negócio ao problema de ML",
          "type": "video",
          "duration": "15min",
          "summary": "A habilidade número 1 do curso: traduzir um desejo de negócio em um enunciado de ML no formato entrada, saída e métrica. Apresenta as quatro tarefas (regressão, classificação, clusterização, geração), o conceito de baseline como concorrente invisível do modelo e o Canvas do Problema de IA, preenchido ao vivo com o caso de previsão de atraso de entrega."
        },
        {
          "title": "O ciclo de vida de um projeto de IA: do CRISP-DM ao MLOps",
          "type": "leitura",
          "duration": "45min",
          "summary": "Texto de referência com as seis fases do ciclo de vida (entendimento do negócio, entendimento dos dados, preparação, modelagem, avaliação e deploy) e por que a preparação de dados consome 60-80% do tempo. Conecta o ciclo clássico às práticas modernas de MLOps: monitoramento, drift, retreino e versionamento. Inclui checklist de 12 perguntas de saúde do projeto para download."
        },
        {
          "title": "Seu primeiro notebook: explorando dados reais de e-commerce e logística",
          "type": "pratica",
          "duration": "2h",
          "summary": "Primeiro laboratório: no Google Colab, o aluno carrega o dataset público da Olist (cerca de 100 mil pedidos reais de e-commerce brasileiro), converte datas, calcula tempo de entrega e taxa de atraso com pandas e gera seu primeiro histograma. Entrega: notebook compartilhado respondendo quatro perguntas de negócio, incluindo a taxa de atraso por estado.",
          "practiceTool": "Colab"
        },
        {
          "title": "Quiz de fixação: fundamentos",
          "type": "quiz",
          "duration": "30min",
          "summary": "Cinco questões de múltipla escolha com feedback explicativo cobrindo ML vs. sistemas de regras, tipos de tarefa, enquadramento com baseline, ciclo de vida e por que modelos degradam em produção. Nota mínima de 70%, tentativas ilimitadas."
        }
      ],
      "quiz": [
        {
          "prompt": "Qual é a diferença fundamental entre um sistema de regras tradicional e um modelo de machine learning?",
          "options": [
            "O sistema de regras é sempre mais barato de manter do que um modelo de ML.",
            "No ML, a lógica é aprendida a partir de exemplos (dados históricos), em vez de ser programada manualmente regra por regra.",
            "Modelos de ML não precisam de manutenção depois de treinados."
          ],
          "correctIndex": 1,
          "explanation": "Essa é a virada de chave da aula 1.1: no software tradicional o humano escreve as regras; no ML o algoritmo as aprende dos dados. Os custos de manutenção variam caso a caso, e modelos exigem monitoramento e retreino contínuos."
        },
        {
          "prompt": "Uma transportadora quer prever SE cada entrega vai estourar o prazo (sim ou não). Que tipo de tarefa de ML é essa?",
          "options": [
            "Classificação binária.",
            "Regressão.",
            "Clusterização."
          ],
          "correctIndex": 0,
          "explanation": "A resposta desejada é uma categoria entre duas possíveis (atrasa/não atrasa) — classificação binária. Seria regressão se a pergunta fosse 'quantos dias vai levar'; clusterização não usa gabarito e serve para descobrir grupos."
        },
        {
          "prompt": "Ao enquadrar um problema de negócio como problema de ML, qual é a primeira pergunta a fazer?",
          "options": [
            "Qual é o algoritmo mais moderno disponível para usar?",
            "Quantas GPUs serão necessárias para o treinamento?",
            "Qual decisão do negócio será melhorada e como ela é tomada hoje (baseline)?"
          ],
          "correctIndex": 2,
          "explanation": "O canvas da aula 1.2 começa pela decisão e pelo baseline — o modelo compete com o método atual, não com a perfeição. Algoritmo e infraestrutura são consequências do enquadramento, nunca o ponto de partida."
        },
        {
          "prompt": "Na prática, qual etapa do ciclo de vida de um projeto de IA costuma consumir a maior parte do tempo da equipe?",
          "options": [
            "Preparação e limpeza dos dados.",
            "A escolha do algoritmo de machine learning.",
            "A gravação da apresentação final de resultados."
          ],
          "correctIndex": 0,
          "explanation": "Como visto na leitura 1.3, a preparação de dados consome tipicamente 60-80% do tempo, porque os dados nascem para operar o negócio, não para treinar modelos. A escolha do algoritmo é uma fração pequena do esforço total."
        },
        {
          "prompt": "Por que um modelo com ótimo desempenho no notebook pode fracassar meses depois, em produção?",
          "options": [
            "Porque notebooks do Colab corrompem os modelos ao salvar.",
            "Porque o mundo muda: os dados de produção se afastam dos dados de treino (drift) e, sem monitoramento, o desempenho degrada em silêncio.",
            "Porque modelos só funcionam no ambiente onde foram treinados e nunca podem ser exportados."
          ],
          "correctIndex": 1,
          "explanation": "Modelo em produção é planta viva — precisa de monitoramento e retreino (aulas 1.1 e 1.3). Exportar modelos é prática padrão e o Colab não corrompe nada; o risco real é o drift silencioso."
        }
      ]
    },
    {
      "id": "modulo-2",
      "title": "Dados que valem ouro: coleta, limpeza e exploração",
      "duration": "7h",
      "free": false,
      "lessons": [
        {
          "title": "Dados no mundo real: fontes, qualidade e vieses",
          "type": "video",
          "duration": "20min",
          "summary": "De sensores de chão de fábrica a planilhas de cooperativa: onde os dados vivem nas empresas brasileiras e os defeitos mais comuns (duplicatas, formatos mistos, ausências, vieses de coleta). Apresenta o panorama de dados abertos do Brasil: IBGE/SIDRA, dados.gov.br e Base dos Dados. Fecha com a regra de ouro: viés que entra no treino sai na decisão."
        },
        {
          "title": "Faxina de dados: do caos à tabela confiável",
          "type": "pratica",
          "duration": "2h",
          "summary": "O aluno recebe uma base propositalmente suja (cadastro com duplicatas, datas em três formatos, cidades grafadas de cinco jeitos) e a transforma em tabela confiável usando recursos nativos do Sheets: remoção de duplicatas, validação de dados, ARRAYFORMULA, SPLIT e formatação condicional. Critério de conclusão: base final aprovada no checklist de qualidade de 10 itens.",
          "practiceTool": "Google Sheets"
        },
        {
          "title": "SQL para IA: o essencial que resolve 80% dos casos",
          "type": "video",
          "duration": "18min",
          "summary": "O subconjunto de SQL que sustenta a análise de dados profissional: SELECT, WHERE, GROUP BY, JOIN e funções de data, cada comando demonstrado sobre o dataset de pedidos já conhecido do módulo 1. Discute por que SQL continua sendo, em 2026, a habilidade de dados mais pedida em vagas no Brasil."
        },
        {
          "title": "Explorando dados públicos em escala com BigQuery",
          "type": "pratica",
          "duration": "2h30",
          "summary": "Ativação do BigQuery sandbox (gratuito, sem cartão de crédito) e consultas reais sobre datasets públicos da Base dos Dados, como RAIS e dados agropecuários municipais. O aluno escreve consultas progressivas — de um SELECT simples a um JOIN com agregação — e exporta o resultado para o Sheets. Critério: 5 consultas salvas e 1 tabela exportada.",
          "practiceTool": "BigQuery sandbox"
        },
        {
          "title": "Quiz de fixação: dados",
          "type": "quiz",
          "duration": "30min",
          "summary": "Cinco questões cobrindo qualidade de dados, vieses de coleta, LGPD em projetos de IA e leitura de consultas SQL simples. Mesmo formato do curso: 3 alternativas, feedback explicativo e nota mínima de 70%."
        }
      ]
    },
    {
      "id": "modulo-3",
      "title": "Construindo modelos de machine learning",
      "duration": "8h",
      "free": false,
      "lessons": [
        {
          "title": "Como as máquinas aprendem: regressão e classificação sem mistério",
          "type": "video",
          "duration": "25min",
          "summary": "A intuição do aprendizado supervisionado sem sofrimento matemático: o que significa ajustar uma reta, o que é função de erro e por que separar treino e teste é inegociável. Regressão linear e logística explicadas com um exemplo de frete e um de atraso de entrega, desenhados passo a passo nos slides."
        },
        {
          "title": "Seu primeiro modelo preditivo com scikit-learn",
          "type": "pratica",
          "duration": "2h30",
          "summary": "No Colab, o aluno treina uma regressão para prever o tempo de entrega dos pedidos Olist: preparação de features, train_test_split, LinearRegression, avaliação com MAE e comparação contra o baseline de média histórica. Critério: notebook com MAE reportado no teste e uma célula interpretando o resultado em linguagem de negócio.",
          "practiceTool": "Colab"
        },
        {
          "title": "Árvores, florestas e boosting: os cavalos de batalha da indústria",
          "type": "video",
          "duration": "20min",
          "summary": "Por que árvores de decisão, Random Forest e gradient boosting (XGBoost/LightGBM) dominam os problemas tabulares do mundo corporativo. Intuição visual de como uma árvore divide os dados, o que a floresta corrige e quando o boosting vale a complexidade extra. Inclui o mapa honesto de quando redes neurais valem a pena em dados tabulares (quase nunca) e quando são obrigatórias (imagem, áudio, texto)."
        },
        {
          "title": "Classificação ponta a ponta: prevendo atrasos de entrega",
          "type": "pratica",
          "duration": "3h",
          "summary": "O laboratório central do curso: o aluno constrói o classificador de atraso de entrega enunciado no canvas do módulo 1 — engenharia de features (distância, sazonalidade, categoria), RandomForestClassifier, matriz de confusão e análise de importância de features. Critério: pipeline reprodutível, comparação com baseline e 3 conclusões de negócio escritas.",
          "practiceTool": "Colab"
        },
        {
          "title": "Quiz de fixação: modelos",
          "type": "quiz",
          "duration": "30min",
          "summary": "Cinco questões sobre aprendizado supervisionado, divisão treino/teste, escolha de algoritmo por tipo de problema e leitura de uma matriz de confusão simples."
        }
      ]
    },
    {
      "id": "modulo-4",
      "title": "Avaliação, validação e comunicação de resultados",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Métricas que importam: do RMSE ao dinheiro",
          "type": "video",
          "duration": "22min",
          "summary": "O cardápio de métricas explicado pela pergunta de negócio que cada uma responde: MAE/RMSE para regressão; acurácia, precisão, recall e F1 para classificação — e por que acurácia engana em bases desbalanceadas (o caso clássico: 92% de acurácia prevendo que nunca atrasa). Fecha convertendo métrica em dinheiro com o custo assimétrico do erro visto no módulo 1."
        },
        {
          "title": "Os três vilões: overfitting, data leakage e validação mal feita",
          "type": "leitura",
          "duration": "50min",
          "summary": "Guia de referência com casos reais anonimizados de consultoria: o modelo que decorou o passado (overfitting), a feature que vazava o futuro (leakage) e a validação que embaralhou séries temporais. Para cada vilão: como detectar, como prevenir e um mini-checklist de proteção."
        },
        {
          "title": "Diagnóstico e ajuste: validação cruzada e tuning na prática",
          "type": "pratica",
          "duration": "2h30",
          "summary": "Sobre o classificador do módulo 3, o aluno aplica validação cruzada (cross_val_score), compara com a divisão simples, ajusta hiperparâmetros com GridSearchCV e monta a curva de aprendizado para diagnosticar sub e superajuste. Critério: relatório de 5 células comparando os resultados antes e depois do tuning.",
          "practiceTool": "Colab"
        },
        {
          "title": "Dashboard executivo: resultados do modelo para quem decide",
          "type": "pratica",
          "duration": "2h",
          "summary": "O aluno exporta as previsões do modelo para o Google Sheets e constrói no Looker Studio um dashboard de uma página para a diretoria: taxa de atraso prevista vs. real, mapa por estado e os 3 números que sustentam a decisão de adotar o modelo. Critério: link público do dashboard e roteiro de apresentação de 5 frases.",
          "practiceTool": "Looker Studio"
        },
        {
          "title": "Quiz de fixação: avaliação",
          "type": "quiz",
          "duration": "30min",
          "summary": "Cinco questões sobre escolha de métrica por contexto de negócio, identificação de data leakage em cenários descritos e interpretação de resultados de validação cruzada."
        }
      ]
    },
    {
      "id": "modulo-5",
      "title": "IA generativa e LLMs no fluxo de trabalho",
      "duration": "5h",
      "free": false,
      "lessons": [
        {
          "title": "LLMs em 2026: o que já funciona nas empresas",
          "type": "video",
          "duration": "22min",
          "summary": "Panorama sem hype do estado da IA generativa: os casos que já entregam valor em empresas brasileiras (atendimento assistido, análise de documentos, geração de relatórios, copilotos internos) e os que seguem imaturos. Como um LLM funciona em nível de intuição e por que ele alucina — e o que isso implica para o uso corporativo."
        },
        {
          "title": "Prompting, RAG e agentes: guia de arquiteturas",
          "type": "leitura",
          "duration": "45min",
          "summary": "Guia de decisão em camadas: quando um bom prompt resolve, quando é preciso RAG (conectar o LLM aos documentos da empresa) e quando agentes se justificam. Cada arquitetura com diagrama, exemplo de caso industrial e ordem de grandeza de custo e complexidade. Regra da casa: comece pela arquitetura mais simples que resolve."
        },
        {
          "title": "Assistente de conhecimento com seus próprios documentos",
          "type": "pratica",
          "duration": "2h",
          "summary": "O aluno monta no NotebookLM um assistente alimentado por documentos reais da sua área (manuais, normas, relatórios públicos), testa perguntas, verifica citações de fonte e documenta onde o assistente acerta, hesita e erra. Critério: caderno com 10 perguntas testadas e avaliação escrita de confiabilidade.",
          "practiceTool": "NotebookLM"
        },
        {
          "title": "Riscos, custos e governança de IA generativa",
          "type": "video",
          "duration": "15min",
          "summary": "O que pode dar errado e como se proteger: alucinação, vazamento de dados sensíveis, dependência de fornecedor e custos que escalam sem controle. Os princípios de uma política mínima de uso de IA generativa na empresa, o recorte da LGPD e o cenário regulatório brasileiro de IA em 2026."
        },
        {
          "title": "Quiz de fixação: IA generativa",
          "type": "quiz",
          "duration": "30min",
          "summary": "Cinco questões sobre escolha de arquitetura (prompt vs. RAG vs. agente), limites dos LLMs e boas práticas de governança corporativa de IA generativa."
        }
      ]
    },
    {
      "id": "modulo-6",
      "title": "Deploy, monitoramento e MLOps enxuto",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "O que significa colocar um modelo em produção (de verdade)",
          "type": "video",
          "duration": "25min",
          "summary": "O abismo entre o notebook e o produto: quem consome a previsão (pessoa, sistema, rotina), previsão em lote vs. em tempo real, e o inventário mínimo de produção — serialização do modelo, ambiente reprodutível e ponto de acesso. Casos dos três setores da casa: o modelo agro que roda em lote toda madrugada e o de logística que responde a cada pedido em tempo real."
        },
        {
          "title": "Monitoramento, drift e retreino: mantendo o modelo vivo",
          "type": "leitura",
          "duration": "50min",
          "summary": "Guia de referência do pós-deploy: métricas de saúde do modelo em produção, data drift vs. concept drift com exemplos de sazonalidade agro e mudança de comportamento logístico, gatilhos de retreino e o dashboard mínimo de monitoramento. Inclui tabela-resumo das ferramentas de mercado (MLflow, Evidently, serviços gerenciados) e o caminho enxuto adotado no curso."
        },
        {
          "title": "Do notebook ao app: publicando seu modelo com Gradio",
          "type": "pratica",
          "duration": "3h",
          "summary": "O momento mais celebrado do curso: o aluno serializa o classificador de atrasos com joblib e constrói, no próprio Colab, uma interface web com Gradio — formulário de entrada, previsão com probabilidade e link público compartilhável gerado na hora. Critério: app funcional acessível por link e captura de tela de uma previsão feita por um colega de turma.",
          "practiceTool": "Colab"
        },
        {
          "title": "MLOps enxuto: o mínimo viável para times pequenos",
          "type": "video",
          "duration": "18min",
          "summary": "A pirâmide de maturidade de MLOps e a mensagem central da casa: para 90% das empresas brasileiras, o nível 1 bem feito — código versionado, dados versionados, retreino agendado e um dashboard de monitoramento — já coloca a operação à frente do mercado. Roteiro de evolução para quando o time crescer."
        },
        {
          "title": "Quiz de fixação: deploy e MLOps",
          "type": "quiz",
          "duration": "30min",
          "summary": "Cinco questões sobre previsão em lote vs. tempo real, diagnóstico de drift em cenários descritos e prioridades de um MLOps enxuto para times pequenos."
        }
      ]
    },
    {
      "id": "modulo-7",
      "title": "Projeto final: do conceito ao deploy",
      "duration": "3h",
      "free": false,
      "lessons": [
        {
          "title": "Briefing do projeto final: escopo, dados e critérios de avaliação",
          "type": "video",
          "duration": "15min",
          "summary": "A Giselle apresenta o desafio: aplicar o ciclo completo a um problema da área do aluno, ou a um dos 3 temas-cardápio com datasets públicos sugeridos. Walkthrough da rubrica de 4 dimensões — enquadramento, dados/modelo, avaliação, deploy/comunicação — e dos erros mais comuns: escopo grande demais e baseline esquecido."
        },
        {
          "title": "Sprint guiado: montando seu projeto de ponta a ponta",
          "type": "pratica",
          "duration": "2h30",
          "summary": "Sessão de trabalho estruturada com o template oficial do projeto: canvas do problema preenchido, checklist de dados, esqueleto de notebook com as seções obrigatórias e roteiro do app Gradio. O aluno sai da sessão com o projeto de pé em versão rascunho e um plano do que falta. Critério: template completo submetido para feedback.",
          "practiceTool": "Colab"
        },
        {
          "title": "Do projeto ao portfólio: como apresentar seu trabalho",
          "type": "leitura",
          "duration": "30min",
          "summary": "Como transformar o projeto em ativo de carreira: estrutura de um case de portfólio (problema, abordagem, resultado, link do app), o que escrever no LinkedIn e no GitHub, e como falar do projeto em entrevista — incluindo como apresentar limitações com honestidade, o que mais impressiona avaliadores técnicos."
        }
      ]
    }
  ],
  "library": []
};
