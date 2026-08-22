# Plano de Aula — "Da Query ao Modelo: Construindo IA de Produção com SQL e Python"

## 1. Identificação

| Campo | Descrição |
|---|---|
| **Facilitadora** | Giselle Falcão |
| **Evento** | DATA BH · SQL Saturday 2026 — Belo Horizonte |
| **Formato** | Palestra-workshop expositiva com demonstração guiada (plateia sem computadores) |
| **Duração** | 45 minutos (40 de conteúdo + 5 de perguntas distribuídas) |
| **Público-alvo** | Analistas de dados, engenheiros de dados, DBAs e profissionais com SQL intermediário |
| **Pré-requisitos** | SQL intermediário (JOINs, GROUP BY, subqueries). Python básico é desejável, não obrigatório |
| **Materiais de extensão** | Notebook executável (Databricks Free Edition), slides e roteiro de reprodução via QR Code |

---

## 2. Objetivo geral

Ao final da sessão, o participante será capaz de **descrever e reproduzir um pipeline completo de Machine Learning de produção** — da query exploratória ao modelo servido como API — **reconhecendo que suas habilidades de SQL cobrem a maior parte do caminho** e identificando com precisão quais competências novas precisa desenvolver (e em que ordem).

## 3. Objetivos específicos de aprendizagem

Ao final da palestra, o participante deverá ser capaz de:

1. **Reconhecer** a equivalência entre preparação de dados em ML e operações SQL que já domina (SELECT, JOIN, GROUP BY, CASE WHEN);
2. **Explicar** o papel do DataFrame como ponto de integração entre SQL e o ecossistema de ML via `spark.sql()`;
3. **Justificar** o uso de Delta Lake em pipelines de ML pelas garantias de ACID, Time Travel e schema enforcement;
4. **Construir** (conceitualmente) features preditivas usando Window Functions, distinguindo sinal de negócio de coluna comum;
5. **Definir** um problema de classificação supervisionada usando apenas vocabulário SQL (feature = coluna preditora; label = coluna resposta via CASE WHEN);
6. **Identificar** data leakage em exemplos e aplicar o teste-antídoto ("o que eu sabia naquele dia?");
7. **Comparar** AutoML e MLlib quanto a propósito, esforço e controle, escolhendo a ordem adequada de adoção;
8. **Descrever** o ciclo de rastreamento de experimentos no MLflow (log_param, log_metric, log_model) e a função do Model Registry;
9. **Distinguir** as duas formas de consumo de um modelo servido (REST e `ai_query` em SQL) e o significado de serverless/scale-to-zero;
10. **Planejar** sua própria trilha de prática autônoma de 30 dias, evitando os quatro erros mais comuns de iniciantes.

---

## 4. Matriz de habilidades por bloco

> Nível cognitivo segundo a Taxonomia de Bloom revisada. "Evidência" = como a facilitadora percebe, em tempo real, que a habilidade foi construída.

| # | Bloco (tempo) | Conteúdo | Habilidade construída | Nível Bloom | Evidência em sala |
|---|---|---|---|---|---|
| 0 | Abertura + premissa (0:00–8:30) | Tese dos 80%; os dois caminhos; mapa do pipeline | **Reenquadramento**: enxergar o próprio repertório SQL como base legítima de ML (mudança de crença, pré-condição de toda a aprendizagem seguinte) | Compreender / Atitudinal | Linguagem corporal na dinâmica das mãos; risos e acenos na tese dos 80% |
| 1 | A ponte (8:30–15:00) | `spark.sql()`, DataFrame, Delta Lake (ACID, Time Travel, schema enforcement) | **Transferência**: mapear a query cotidiana para o ambiente distribuído; **avaliar requisitos de dados de produção** (confiabilidade, reprodutibilidade) | Compreender → Aplicar | Silêncio na pergunta "algo desconhecido nessa query?"; mãos levantadas nas perguntas do Time Travel |
| 2 | Features (15:00–22:00) | Window Functions como sinais; label via CASE WHEN; data leakage | **Modelar o problema**: converter conhecimento de negócio em features; **formular um problema de classificação**; **detectar vazamento de dados** | Aplicar → Analisar | Respostas corretas ao caso "motivo_do_cancelamento"; perguntas do bloco citando colunas do próprio trabalho |
| 3 | Treinamento (22:00–27:00) | AutoML (glass box) vs MLlib (Pipeline, randomSplit, GBT) | **Selecionar ferramenta por contexto**; compreender validação treino/teste como protocolo de honestidade experimental | Compreender → Avaliar | Reformulações espontâneas ("então AutoML é tipo…"); aceitação da ordem AutoML→MLlib |
| 4 | Demo guiada (27:00–33:00) | Execução real em 5 atos: query→DataFrame, Time Travel, features, disputa de modelos no MLflow, lista de risco | **Integração**: ver as partes como um fluxo único; **ler saídas reais** (tabela de runs, ranking de risco) | Analisar / Sintetizar | Fotos dos slides; reação ao "ninguém demitido" e à lista de 97% de risco |
| 5 | MLflow + Deploy (33:00–40:00) | Rastreamento, Registry, Serving REST e `ai_query` | **Governança de experimentos** (paralelo com auditoria de tabelas); **consumir modelo como serviço** a partir do SQL | Compreender → Aplicar | Reação ao clímax "chamar o modelo de dentro de um SELECT" |
| 6 | Consolidação (40:00–45:00) | Plano de 30 dias; 4 tropeços; Q&A | **Autorregulação**: planejar prática deliberada; **antecipar erros** (leakage, acurácia enganosa, treino=teste, falta de rastreio) | Avaliar / Criar | Fotos do slide do plano; qualidade das perguntas finais |

---

## 5. Competências desenvolvidas (síntese)

**Técnicas (hard skills)**
- Integração SQL ↔ Spark/Python (`spark.sql`, DataFrame)
- Fundamentos de Lakehouse: Delta Lake, versionamento de dados, Time Travel
- Feature engineering com Window Functions (janelas móveis, LAG, NTILE)
- Formulação de problemas de classificação supervisionada
- Higiene experimental: split treino/teste, métricas além da acurácia (AUC), prevenção de data leakage
- MLOps essencial: rastreamento com MLflow, Model Registry, Model Serving (REST e `ai_query`)

**Cognitivas e comportamentais (soft skills)**
- Transferência de aprendizagem: reutilizar repertório existente em domínio novo
- Autoeficácia: substituição da crença "ML exige recomeçar do zero" por um plano concreto
- Pensamento crítico sobre resultados de modelos ("bom demais" = suspeito)
- Autonomia de estudo: trilha autodirigida de 30 dias com marcos verificáveis

---

## 6. Metodologia

1. **Aprendizagem ancorada** — todo conceito novo é apresentado *a partir de* um equivalente SQL já dominado (DataFrame ← tabela de resultado; Pipeline ← VIEW sobre VIEW; MLflow ← tabela auditável; label ← CASE WHEN). Reduz carga cognitiva e resistência.
2. **Storytelling com credencial invertida** — a facilitadora narra o caminho oposto (da modelagem matemática ao SQL), legitimando a tese de que os dois mundos se encontram no meio.
3. **Exposição dialogada** — perguntas retóricas com resposta corporal ("levante a mão quem…") a cada bloco, mantendo atenção e gerando evidência de aprendizagem em tempo real.
4. **Demonstração guiada por evidências** — sem laboratório para a plateia, a demo apresenta código real e saídas reais lado a lado ("o que eu executo" / "o que aparece no telão"), preservando autenticidade sem risco técnico.
5. **Inoculação de erros** — os quatro tropeços clássicos são ensinados *antes* de o participante praticar, com casos memoráveis (coluna `motivo_do_cancelamento`).
6. **Prática distribuída pós-evento** — plano de 30 dias (1 marco/semana) transforma a palestra em trilha de aprendizagem com compromisso social (semana 4: "mostre a alguém").

## 7. Recursos didáticos

- Apresentação de 26 slides no template oficial do evento (com notas de facilitação e cronometragem)
- 5 slides de demonstração com código e saídas reais do pipeline
- Notebook executável completo (gera os próprios dados; compatível com Databricks Free Edition)
- Roteiro falado da sessão e roteiro da demonstração
- QR Code com repositório (notebook + slides + passo a passo de reprodução)

## 8. Avaliação da aprendizagem

| Momento | Instrumento | O que avalia |
|---|---|---|
| Durante (formativa) | Perguntas de 30s ao fim de cada bloco; dinâmicas de mãos levantadas | Compreensão imediata e engajamento; objetivos 1–9 |
| Imediata | Perguntas do Q&A final (qualidade e vocabulário usado pelos participantes) | Apropriação do vocabulário (feature, label, leakage, run, endpoint) |
| Pós-evento (somativa/autônoma) | Plano de 30 dias: S1 reproduzir · S2 adaptar aos próprios dados · S3 competir com o AutoML · S4 publicar e apresentar | Objetivo 10 e transferência real; a S4 é a evidência de domínio |
| Indireta | Acessos ao QR/repositório; interações posteriores (LinkedIn/comunidade) | Alcance e continuidade |

## 9. Possíveis dificuldades e mediações previstas

| Dificuldade prevista | Mediação |
|---|---|
| Ansiedade matemática ("ML não é para mim") | Tese dos 80% + contrato de "zero gatekeeping" logo na abertura |
| Confusão DataFrame × tabela | Analogia "tabela viva" + demonstração da mesma query nos dois mundos |
| Subestimar data leakage | Repetição espaçada (blocos 2, 4 e 6) + caso cômico memorável |
| Ceticismo sênior com AutoML | Argumento glass box: cada tentativa vira notebook legível |
| Falta de acesso a ambiente após o evento | Notebook autossuficiente + passo a passo da Free Edition no repositório |

## 10. Extensão (tarefa autodirigida — 30 dias)

- **Semana 1 — Reproduzir:** criar conta na Free Edition e executar o notebook (Run All).
- **Semana 2 — Adaptar:** substituir pelos dados do próprio contexto; recriar as janelas com a lógica do seu negócio.
- **Semana 3 — Competir:** rodar AutoML, estudar o notebook campeão e tentar superá-lo no MLlib.
- **Semana 4 — Publicar:** servir o modelo (ou o scoring em lote) e apresentar o resultado a alguém do negócio.

---
*Anexos: apresentação (.pptx com notas), notebook do lab (.py), roteiro falado (.md), roteiro da demonstração (.md).*
