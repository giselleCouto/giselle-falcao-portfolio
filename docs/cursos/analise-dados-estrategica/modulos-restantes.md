# Módulos 3 a 6 — Planos resumidos

**Curso:** Análise de Dados para Decisões Estratégicas · Giselle Falcão Academy
*Estes módulos serão desenvolvidos em profundidade (plano de aula + roteiro + slides) na próxima iteração de produção. Abaixo: objetivos, aulas e resumos que já definem o escopo pedagógico e as fontes de dados.*

---

## Módulo 3 — Estatística para decidir (sem sofrimento) · 4h30

**Objetivos do módulo (Bloom):** interpretar medidas de centro e dispersão no contexto de gestão (compreender); escolher entre média e mediana conforme a distribuição (analisar); reconhecer os limites de correlações em políticas públicas (avaliar); calcular estatísticas descritivas de uma base real no Colab (aplicar).

### Aulas

1. **A média mente: centro, dispersão e distribuições para gestores** — vídeo · 20min
   Por que "tempo médio de atendimento: 12 dias" pode esconder metade dos casos resolvidos em 2 dias e outra metade em 22. Média × mediana × moda, desvio e percentis contados com exemplos do SP156 e de salários. A regra prática: distribuição assimétrica pede mediana.

2. **Correlação não é causalidade: lições de políticas públicas** — leitura · 45min
   Casos comentados em que correlação enganou gestores: variáveis de confusão, causalidade reversa e coincidências. Como a imprensa (e o próprio gestor) transforma "associado a" em "causa". Checklist de 4 perguntas antes de atribuir causa a um número.

3. **Amostras, incerteza e o tamanho da dúvida** — vídeo · 22min
   Toda medição carrega incerteza: amostra × população, viés de seleção (quem liga para o 156 não é a cidade inteira) e margem de erro em linguagem de gestor. Como reportar números com honestidade sem paralisar a decisão.

4. **Estatística descritiva na prática: sinistros de trânsito de SP no Colab** — prática (Colab) · 2h30
   Notebook guiado com dados do InfoSiga SP (https://infosiga.sp.gov.br): distribuição de sinistros por mês, tipo e período do dia; média × mediana na prática; percentis; e um mini-relatório de conclusões. Desafio final: identificar o recorte com tendência mais preocupante e justificar com dois números.

5. **Quiz do Módulo 3 — Estatística para decisão** — quiz · 15min
   3–5 questões sobre média × mediana, correlação × causalidade e viés de amostra, com explicações comentadas.

---

## Módulo 4 — SQL no navegador: BigQuery para perguntas grandes · 5h

**Objetivos do módulo (Bloom):** explicar quando a planilha deixa de ser suficiente (compreender); escrever consultas SELECT/WHERE/GROUP BY/ORDER BY (aplicar); combinar tabelas com JOIN simples (aplicar); traduzir perguntas de gestão em consultas SQL (analisar/criar).

**Infraestrutura:** BigQuery **sandbox** (gratuito, sem cartão de crédito — https://console.cloud.google.com/bigquery) + datasets públicos tratados da **Base dos Dados** (https://basedosdados.org) e do programa de datasets públicos do Google Cloud.

### Aulas

1. **SQL: a língua franca dos dados (e os 20% que resolvem 80%)** — vídeo · 18min
   O que é um banco de dados, por que SQL sobrevive há décadas e por que gestores que leem SQL conversam melhor com equipes técnicas. A anatomia de um SELECT lida em voz alta como uma frase em português.

2. **Primeiras consultas no BigQuery sandbox com a Base dos Dados** — prática (BigQuery sandbox) · 1h40
   Criar o projeto sandbox (sem cartão), localizar tabelas públicas da Base dos Dados no catálogo e executar as primeiras consultas: SELECT, WHERE, LIMIT e ORDER BY sobre dados brasileiros reais. Checkpoints de custo zero e leitura do "bytes processados".

3. **Agregar, filtrar, cruzar: GROUP BY e JOIN sem medo** — vídeo · 22min
   A mesma gramática da tabela dinâmica ("calcule isto agrupado por aquilo") escrita em SQL: GROUP BY, COUNT, AVG, HAVING. JOIN apresentado como o PROCV honesto: cruzar a tabela de fatos com a tabela de referência (ex.: códigos de município → nomes).

4. **Três perguntas de gestão respondidas em SQL** — prática (BigQuery sandbox) · 2h10
   Roteiro guiado: três perguntas de complexidade crescente sobre dados públicos de São Paulo na Base dos Dados, cada uma exigindo um degrau novo (WHERE → GROUP BY → JOIN). Fecha exportando um resultado para o Google Sheets — a ponte para o módulo 5.

5. **Quiz do Módulo 4 — SQL e BigQuery** — quiz · 15min
   3–5 questões de leitura e correção de consultas: prever o resultado de um GROUP BY, identificar o erro de um JOIN, escolher a cláusula certa para uma pergunta.

---

## Módulo 5 — Dashboards que sustentam decisões: Looker Studio · 5h

**Objetivos do módulo (Bloom):** aplicar princípios de percepção visual à escolha de gráficos (aplicar); conectar fontes (Sheets/BigQuery) ao Looker Studio (aplicar); projetar um dashboard executivo com hierarquia de informação (criar); criticar dashboards ruins (avaliar).

**Ferramenta:** Looker Studio (https://lookerstudio.google.com), gratuito, no navegador.

### Aulas

1. **Visualização que decide: princípios antes da ferramenta** — vídeo · 20min
   Por que o cérebro compara comprimentos melhor que áreas e ângulos; o gráfico como resposta a uma pergunta (e não decoração); os 4 tipos que resolvem 90% dos casos: barras, linhas, tabela e indicador (scorecard). Galeria de antes/depois com dashboards públicos reais.

2. **Do Sheets ao primeiro dashboard no Looker Studio** — prática (Looker Studio) · 1h40
   Conectar a planilha limpa do módulo 2 como fonte de dados, entender dimensões × métricas, e montar a primeira página: scorecard de total de chamados, barras por distrito, linha por mês e filtro de serviço. Publicar e compartilhar por link.

3. **Design de dashboards executivos: KPIs, hierarquia e contexto** — vídeo · 20min
   A regra dos 5 segundos (o número mais importante no canto superior esquerdo), escolher 3–5 KPIs e recusar o resto, comparação e contexto (meta, período anterior), paleta sóbria com um só destaque, e o erro capital: dashboard-enciclopédia que ninguém abre duas vezes.

4. **Dashboard de zeladoria urbana de ponta a ponta** — prática (Looker Studio) · 2h10
   Projeto guiado completo com a base SP156: definição da persona (subprefeito), 4 KPIs, página de visão geral + página de detalhe com drill por distrito, controles de período e serviço, e revisão por checklist de design. Resultado: primeiro item de portfólio apresentável do curso.

5. **Quiz do Módulo 5 — Visualização e dashboards** — quiz · 15min
   3–5 questões sobre escolha de gráfico por pergunta, hierarquia visual e crítica de um dashboard de exemplo.

---

## Módulo 6 — IA copilota, ética e projeto final · 5h30

**Objetivos do módulo (Bloom):** usar IA generativa para acelerar (não substituir) a análise (aplicar); verificar as saídas da IA contra as fontes (avaliar); reconhecer limites legais e éticos do uso de dados na gestão pública (compreender/avaliar); integrar todas as etapas do curso em um projeto autoral (criar).

### Aulas

1. **IA generativa na análise de dados: copilota, não piloto** — vídeo · 20min
   O que a IA de 2026 faz bem no fluxo de análise (explicar código, sugerir consultas, resumir documentos, primeiras versões de texto) e onde ela erra com confiança (números inventados, fontes fantasma). O protocolo da casa: a IA propõe, o dado confirma, você assina.

2. **NotebookLM na prática: interrogando relatórios públicos** — prática (NotebookLM) · 1h20
   Carregar no NotebookLM (https://notebooklm.google.com) documentos públicos reais (ex.: relatórios de gestão e metas da Prefeitura de SP), fazer perguntas com citação de fonte, gerar um resumo orientado a decisão e conferir cada citação no original. Desafio: encontrar uma afirmação que a IA resumiu de forma imprecisa.

3. **LGPD, ética e limites do uso de dados na gestão pública** — leitura · 40min
   O essencial da LGPD (Lei nº 13.709/2018) para quem analisa dados no setor público: dado pessoal × dado anonimizado × dado agregado, bases legais do tratamento no poder público, por que dados abertos já nascem (em tese) anonimizados — e as armadilhas de reidentificação. Checklist ético antes de publicar qualquer análise.

4. **Storytelling com dados: a apresentação que muda a decisão** — vídeo · 20min
   A estrutura contexto → conflito → resolução aplicada a uma apresentação executiva de 5 minutos; um slide, uma ideia; antecipar as três perguntas difíceis da audiência; e como apresentar incerteza sem perder autoridade.

5. **Projeto final: do dado aberto à recomendação estratégica** — prática (Looker Studio + NotebookLM) · 2h30
   O aluno escolhe um dataset dos portais do curso (SP156, InfoSiga, ObservaSampa, Base dos Dados), define uma pergunta estratégica, executa o ciclo completo (limpeza → análise → dashboard no Looker Studio) e entrega: link do dashboard + sumário executivo de 1 página + roteiro de apresentação de 5 minutos. Avaliação por rubrica (pergunta clara · dado tratado corretamente · visual adequado · recomendação acionável), com feedback individual.

---

## Observações de produção

- Os quizzes dos módulos 3, 4 e 5 seguem o mesmo padrão dos módulos 1 e 2 (3–5 questões, 3 alternativas, explicação por questão) e serão redigidos junto com o desenvolvimento completo de cada módulo.
- O módulo 6 não tem quiz: a avaliação somativa é o projeto final por rubrica.
- As práticas 4.2 e 4.4 devem ser revisadas a cada oferta: nomes de datasets no catálogo da Base dos Dados mudam; manter uma consulta de fallback sobre `bigquery-public-data` documentada no material do instrutor.
