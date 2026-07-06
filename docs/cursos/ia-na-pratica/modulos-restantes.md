# Módulos 2 a 7 — Planos resumidos

**Curso:** IA na Prática: Do Conceito ao Deploy — Giselle Falcão Academy
Estes módulos serão desenvolvidos em profundidade (plano de aula, roteiro e slides) na fase de produção, seguindo o padrão estabelecido no `modulo-1.md`. Abaixo, o plano resumido de cada um: objetivos e lista de aulas com resumos.

---

## Módulo 2 — Dados que valem ouro: coleta, limpeza e exploração (7h)

**Objetivos do módulo:** capacitar o aluno a inventariar fontes de dados, diagnosticar problemas de qualidade e vieses, limpar bases reais em planilha e consultar dados em escala com SQL no BigQuery — a fundação de qualquer modelo confiável.

| # | Aula | Tipo | Duração | Resumo |
|---|---|---|---|---|
| 2.1 | Dados no mundo real: fontes, qualidade e vieses | vídeo | 20min | De sensores de chão de fábrica a planilhas de cooperativa: onde os dados vivem nas empresas brasileiras e os defeitos mais comuns (duplicatas, formatos mistos, ausências, vieses de coleta). Apresenta o panorama de dados abertos do Brasil: IBGE/SIDRA, dados.gov.br e Base dos Dados. Fecha com a regra de ouro: viés que entra no treino sai na decisão. |
| 2.2 | Faxina de dados: do caos à tabela confiável | prática (Google Sheets) | 2h | O aluno recebe uma base propositalmente suja (cadastro de fornecedores com duplicatas, datas em três formatos, cidades grafadas de cinco jeitos) e a transforma em tabela confiável usando recursos nativos do Sheets: remoção de duplicatas, validação de dados, `ARRAYFORMULA`, `SPLIT` e formatação condicional para auditoria. Critério de conclusão: base final passa no checklist de qualidade de 10 itens. |
| 2.3 | SQL para IA: o essencial que resolve 80% dos casos | vídeo | 18min | O subconjunto de SQL que sustenta a análise de dados profissional: SELECT, WHERE, GROUP BY, JOIN e funções de data — cada comando demonstrado sobre o dataset de pedidos já conhecido do módulo 1. Por que SQL continua sendo, em 2026, a habilidade de dados mais pedida em vagas no Brasil. |
| 2.4 | Explorando dados públicos em escala com BigQuery | prática (BigQuery sandbox) | 2h30 | Ativação do BigQuery sandbox (gratuito, sem cartão de crédito) e consultas reais sobre datasets públicos da Base dos Dados (basedosdados.org), como RAIS e dados agropecuários municipais. O aluno escreve consultas progressivas — de um SELECT simples a um JOIN com agregação — e exporta o resultado para o Sheets. Critério: 5 consultas salvas + 1 tabela exportada. |
| 2.5 | Quiz de fixação: dados | quiz | 30min | Cinco questões cobrindo qualidade de dados, vieses de coleta, LGPD em projetos de IA e leitura de consultas SQL simples. |

---

## Módulo 3 — Construindo modelos de machine learning (8h)

**Objetivos do módulo:** construir os dois modelos supervisionados fundamentais (regressão e classificação) com scikit-learn no Colab, entendendo intuição dos algoritmos, divisão treino/teste e o pipeline reprodutível de ponta a ponta.

| # | Aula | Tipo | Duração | Resumo |
|---|---|---|---|---|
| 3.1 | Como as máquinas aprendem: regressão e classificação sem mistério | vídeo | 25min | A intuição do aprendizado supervisionado sem sofrimento matemático: o que significa "ajustar uma reta", o que é função de erro e por que separar treino e teste é inegociável. Regressão linear e logística explicadas com um exemplo de frete e um de atraso de entrega, desenhados passo a passo nos slides. |
| 3.2 | Seu primeiro modelo preditivo com scikit-learn | prática (Colab) | 2h30 | No Colab, o aluno treina uma regressão para prever o tempo de entrega dos pedidos Olist: preparação de features, `train_test_split`, `LinearRegression`, avaliação com MAE e comparação contra o baseline "média histórica". Critério: notebook com MAE reportado no teste e uma célula interpretando o resultado em linguagem de negócio. |
| 3.3 | Árvores, florestas e boosting: os cavalos de batalha da indústria | vídeo | 20min | Por que árvores de decisão, Random Forest e gradient boosting (XGBoost/LightGBM) dominam os problemas tabulares do mundo corporativo até hoje. Intuição visual de como uma árvore divide os dados, o que a "floresta" corrige e quando o boosting vale a complexidade extra. Inclui o mapa honesto: quando redes neurais valem a pena em dados tabulares (quase nunca) e quando são obrigatórias (imagem, áudio, texto). |
| 3.4 | Classificação ponta a ponta: prevendo atrasos de entrega | prática (Colab) | 3h | O laboratório central do curso: o aluno constrói o classificador de atraso de entrega enunciado no canvas do módulo 1 — engenharia de features (distância, sazonalidade, categoria), `RandomForestClassifier`, matriz de confusão e análise de importância de features. Critério: pipeline reprodutível + comparação com baseline + 3 conclusões de negócio escritas. |
| 3.5 | Quiz de fixação: modelos | quiz | 30min | Cinco questões sobre supervisão, treino/teste, escolha de algoritmo por tipo de problema e leitura de uma matriz de confusão simples. |

---

## Módulo 4 — Avaliação, validação e comunicação de resultados (6h)

**Objetivos do módulo:** avaliar modelos com honestidade técnica (métricas certas, validação cruzada, caça ao leakage) e traduzir resultados em decisões e dashboards que executivos entendem.

| # | Aula | Tipo | Duração | Resumo |
|---|---|---|---|---|
| 4.1 | Métricas que importam: do RMSE ao dinheiro | vídeo | 22min | O cardápio de métricas explicado pela pergunta de negócio que cada uma responde: MAE/RMSE para regressão; acurácia, precisão, recall e F1 para classificação — e por que acurácia engana em bases desbalanceadas (o caso clássico: 92% de acurácia prevendo que "nunca atrasa"). Fecha convertendo métrica em dinheiro com o custo assimétrico do erro visto no módulo 1. |
| 4.2 | Os três vilões: overfitting, data leakage e validação mal feita | leitura | 50min | Guia de referência com casos reais anonimizados de consultoria: o modelo que decorou o passado (overfitting), a feature que vazava o futuro (leakage) e a validação que embaralhou séries temporais. Para cada vilão: como detectar, como prevenir e um mini-checklist. É a leitura mais consultada do curso na vida profissional dos alunos. |
| 4.3 | Diagnóstico e ajuste: validação cruzada e tuning na prática | prática (Colab) | 2h30 | Sobre o classificador do módulo 3, o aluno aplica validação cruzada (`cross_val_score`), compara com a divisão simples, ajusta hiperparâmetros com `GridSearchCV` e monta a curva de aprendizado para diagnosticar sub/superajuste. Critério: relatório de 5 células comparando os resultados antes/depois do tuning. |
| 4.4 | Dashboard executivo: resultados do modelo para quem decide | prática (Looker Studio) | 2h | O aluno exporta as previsões do modelo para o Google Sheets e constrói no Looker Studio um dashboard de uma página para a diretoria: taxa de atraso prevista vs. real, mapa por estado e os 3 números que sustentam a decisão de adotar o modelo. Critério: link público do dashboard + roteiro de apresentação de 5 frases. |
| 4.5 | Quiz de fixação: avaliação | quiz | 30min | Cinco questões sobre escolha de métrica por contexto, identificação de leakage em cenários descritos e interpretação de validação cruzada. |

---

## Módulo 5 — IA generativa e LLMs no fluxo de trabalho (5h)

**Objetivos do módulo:** usar LLMs com critério profissional — saber o que já funciona em empresas, escolher entre prompting, RAG e agentes, montar um assistente de conhecimento real e avaliar riscos, custos e governança.

| # | Aula | Tipo | Duração | Resumo |
|---|---|---|---|---|
| 5.1 | LLMs em 2026: o que já funciona nas empresas | vídeo | 22min | Panorama sem hype do estado da IA generativa: os casos que já entregam valor em empresas brasileiras (atendimento assistido, análise de documentos, geração de relatórios, copilotos internos) e os que seguem imaturos. Como um LLM funciona em nível de intuição (prever a próxima palavra em escala absurda) e por que ele alucina — e o que isso implica para o uso corporativo. |
| 5.2 | Prompting, RAG e agentes: guia de arquiteturas | leitura | 45min | Guia de decisão em camadas: quando um bom prompt resolve, quando é preciso RAG (conectar o LLM aos documentos da empresa) e quando agentes (LLMs que executam ações em várias etapas) se justificam. Cada arquitetura com diagrama, exemplo de caso industrial e ordem de grandeza de custo e complexidade. Regra da casa: comece pela arquitetura mais simples que resolve. |
| 5.3 | Assistente de conhecimento com seus próprios documentos | prática (NotebookLM) | 2h | O aluno monta no NotebookLM um assistente alimentado por documentos reais da sua área (manuais, normas, relatórios públicos — ex.: normas regulamentadoras, manuais técnicos da Embrapa), testa perguntas, verifica citações de fonte e documenta onde o assistente acerta, hesita e erra. Critério: caderno com 10 perguntas testadas + avaliação escrita de confiabilidade. |
| 5.4 | Riscos, custos e governança de IA generativa | vídeo | 15min | O que pode dar errado e como se proteger: alucinação, vazamento de dados sensíveis, dependência de fornecedor e custos que escalam sem controle. Os princípios de uma política mínima de uso de IA generativa na empresa, o recorte da LGPD e o cenário regulatório brasileiro de IA em 2026. |
| 5.5 | Quiz de fixação: IA generativa | quiz | 30min | Cinco questões sobre escolha de arquitetura (prompt vs. RAG vs. agente), limites dos LLMs e boas práticas de governança. |

---

## Módulo 6 — Deploy, monitoramento e MLOps enxuto (6h)

**Objetivos do módulo:** fechar o ciclo — transformar o modelo do notebook em aplicação acessível por link, entender o que produção exige (versionamento, monitoramento, drift, retreino) e montar a versão enxuta e gratuita desse ciclo.

| # | Aula | Tipo | Duração | Resumo |
|---|---|---|---|---|
| 6.1 | O que significa colocar um modelo em produção (de verdade) | vídeo | 25min | O abismo entre o notebook e o produto: quem consome a previsão (pessoa, sistema, rotina), previsão em lote vs. em tempo real, e o inventário mínimo de produção — serialização do modelo, ambiente reprodutível e ponto de acesso. Casos dos três setores da casa: o modelo agro que roda toda madrugada em lote e o de logística que responde a cada pedido em tempo real. |
| 6.2 | Monitoramento, drift e retreino: mantendo o modelo vivo | leitura | 50min | Guia de referência do pós-deploy: métricas de saúde do modelo em produção, data drift vs. concept drift (com exemplos de sazonalidade agro e mudança de comportamento logístico), gatilhos de retreino e o dashboard mínimo de monitoramento. Inclui tabela-resumo das ferramentas de mercado (MLflow, Evidently, serviços gerenciados de nuvem) e o caminho enxuto adotado no curso. |
| 6.3 | Do notebook ao app: publicando seu modelo com Gradio | prática (Colab) | 3h | O momento mais celebrado do curso: o aluno serializa o classificador de atrasos com `joblib` e constrói, no próprio Colab, uma interface web com Gradio — formulário de entrada, previsão com probabilidade e link público compartilhável gerado na hora. Critério: app funcional acessível por link + captura de tela de uma previsão feita por um colega de turma. |
| 6.4 | MLOps enxuto: o mínimo viável para times pequenos | vídeo | 18min | A pirâmide de maturidade de MLOps e a mensagem central da casa: para 90% das empresas brasileiras, o nível 1 bem feito — código versionado, dados versionados, retreino agendado e um dashboard de monitoramento — já coloca a operação à frente do mercado. Roteiro de evolução: o que adotar quando o time crescer. |
| 6.5 | Quiz de fixação: deploy e MLOps | quiz | 30min | Cinco questões sobre lote vs. tempo real, diagnóstico de drift em cenários descritos e prioridades de um MLOps enxuto. |

---

## Módulo 7 — Projeto final: do conceito ao deploy (3h + trabalho autônomo)

**Objetivos do módulo:** consolidar todas as competências do curso num projeto autoral completo — problema real da área do aluno, pipeline de dados, modelo avaliado com honestidade e aplicação publicada — avaliado por rubrica.

| # | Aula | Tipo | Duração | Resumo |
|---|---|---|---|---|
| 7.1 | Briefing do projeto final: escopo, dados e critérios de avaliação | vídeo | 15min | A Giselle apresenta o desafio: aplicar o ciclo completo a um problema da área do aluno (ou a um dos 3 temas-cardápio com datasets públicos sugeridos, para quem preferir). Walkthrough da rubrica de 4 dimensões — enquadramento, dados/modelo, avaliação, deploy/comunicação — e dos erros mais comuns de edições-piloto: escopo grande demais e baseline esquecido. |
| 7.2 | Sprint guiado: montando seu projeto de ponta a ponta | prática (Colab) | 2h30 | Sessão de trabalho estruturada com o template oficial do projeto: canvas do problema preenchido, checklist de dados, esqueleto de notebook com as seções obrigatórias e roteiro do app Gradio. O aluno sai da sessão com o projeto de pé em versão rascunho e um plano do que falta. Critério: template completo submetido para feedback. |
| 7.3 | Do projeto ao portfólio: como apresentar seu trabalho | leitura | 30min | Como transformar o projeto em ativo de carreira: estrutura de um case de portfólio (problema → abordagem → resultado → link do app), o que escrever no LinkedIn e no GitHub, e como falar do projeto em entrevista — incluindo como apresentar limitações com honestidade, que é o que mais impressiona avaliadores técnicos. |

---

**Nota de produção:** os quizzes dos módulos 2 a 6 seguem o mesmo padrão do módulo 1 (5 questões, 3 alternativas, feedback explicativo, nota mínima 70%, tentativas ilimitadas) e serão redigidos na fase de desenvolvimento completo de cada módulo.
