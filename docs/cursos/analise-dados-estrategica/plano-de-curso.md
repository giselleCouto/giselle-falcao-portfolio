# Análise de Dados para Decisões Estratégicas

**Giselle Falcão Academy** · Curso gratuito · Nível Iniciante · Carga horária: 30h
**Slug:** `analise-dados-estrategica`

> **Tagline:** Transforme dados abertos em decisões estratégicas usando só o navegador — do Sheets ao dashboard.

---

## 1. Posicionamento

Este é o curso de entrada (gratuito) da Giselle Falcão Academy para a trilha de dados e IA. Ele materializa a promessa da marca — **acolhedora porém rigorosa** — em um formato que qualquer pessoa com uma conta Google consegue acompanhar: nada de instalar software, nada de matemática intimidadora, e todos os exemplos ancorados em **problemas reais da gestão pública paulistana**, com dados abertos da cidade de São Paulo.

A Dra. Giselle Falcão, PhD e consultora de IA industrial (indústria, agro e logística), conduz o curso na primeira pessoa: vídeos curtos (10–25 min), gravados de forma simples, com roteiro conversacional — uma professora experiente conversando, não lendo.

**Diferenciais:**

- 100% ferramentas gratuitas de navegador: **Google Sheets, Google Colab, BigQuery sandbox, Looker Studio e NotebookLM**.
- Dados reais: **Portal de Dados Abertos da Prefeitura de São Paulo, GeoSampa, dados.gov.br, InfoSiga SP e Base dos Dados**.
- Cada módulo termina respondendo uma **pergunta de gestão de verdade** ("onde a cidade mais reclama?", "qual distrito demora mais para ser atendido?").
- Projeto final apresentável: um dashboard + recomendação estratégica que o aluno pode levar para o próprio trabalho (e para o portfólio).

## 2. Público-alvo

Agentes públicos (com foco na gestão municipal, especialmente São Paulo) e profissionais de qualquer setor que precisam **transformar dados em decisões** — analistas, assessores, coordenadores, gestores de contratos, equipes de planejamento — **sem experiência prévia** em programação, estatística ou BI.

## 3. Pré-requisitos

Nenhum conhecimento prévio de programação, estatística ou ferramentas de dados. Basta:

- Uma conta Google (gratuita);
- Navegador atualizado (Chrome, Edge ou Firefox) e conexão com a internet;
- Familiaridade básica com computador (abrir sites, baixar arquivos).

## 4. Resultados de aprendizagem

Ao concluir o curso, o aluno será capaz de:

1. **Localizar e avaliar** bases de dados abertas (Portal de Dados Abertos de SP, GeoSampa, dados.gov.br, Base dos Dados) relevantes para o seu contexto de trabalho.
2. **Limpar e organizar** dados reais no Google Sheets e no Google Colab, documentando as decisões de tratamento.
3. **Resumir e interpretar** dados com estatística descritiva, evitando armadilhas clássicas (média enganosa, correlação ≠ causalidade, amostras viesadas).
4. **Consultar grandes volumes de dados** com SQL básico no BigQuery sandbox.
5. **Construir dashboards executivos** no Looker Studio que respondem perguntas de gestão com clareza.
6. **Comunicar recomendações estratégicas** fundamentadas em dados, usando IA generativa (NotebookLM) como copilota — com responsabilidade e atenção à LGPD.

## 5. Estrutura do curso

Seis módulos, ~28h30 de trilha guiada + ~1h30 de atividades de reflexão e fórum = **30h certificadas**.

| # | Módulo | Carga | Status de desenvolvimento |
|---|--------|-------|---------------------------|
| 1 | Pensar com dados: fundamentos e dados abertos | 4h | **Completo** (`modulo-1.md`) |
| 2 | Google Sheets: da planilha bruta à primeira resposta | 4h30 | **Completo** (`modulo-2.md`) |
| 3 | Estatística para decidir (sem sofrimento) | 4h30 | Resumido (`modulos-restantes.md`) |
| 4 | SQL no navegador: BigQuery para perguntas grandes | 5h | Resumido (`modulos-restantes.md`) |
| 5 | Dashboards que sustentam decisões: Looker Studio | 5h | Resumido (`modulos-restantes.md`) |
| 6 | IA copilota, ética e projeto final | 5h30 | Resumido (`modulos-restantes.md`) |

### Módulo 1 — Pensar com dados: fundamentos e dados abertos (4h)

| Aula | Tipo | Duração |
|------|------|---------|
| 1.1 Da intuição à evidência: por que decisões precisam de dados | vídeo | 18min |
| 1.2 O mapa do tesouro: dados abertos de São Paulo e do Brasil | leitura | 45min |
| 1.3 Anatomia de um dataset: linhas, colunas, tipos e armadilhas | vídeo | 22min |
| 1.4 Sua primeira análise em Python: os chamados do SP156 no Colab | prática (Colab) | 2h |
| 1.5 Quiz do Módulo 1 — Fundamentos e dados abertos | quiz | 15min |

### Módulo 2 — Google Sheets: da planilha bruta à primeira resposta (4h30)

| Aula | Tipo | Duração |
|------|------|---------|
| 2.1 Dado bruto não responde: limpeza e organização no Google Sheets | vídeo | 20min |
| 2.2 Faxina de dados: preparando os chamados do SP156 no Sheets | prática (Google Sheets) | 1h30 |
| 2.3 Tabela dinâmica: a pergunta certa em três cliques | vídeo | 22min |
| 2.4 Onde a cidade mais reclama? Da tabela dinâmica à resposta executiva | prática (Google Sheets) | 1h50 |
| 2.5 Quiz do Módulo 2 — Google Sheets | quiz | 18min |

### Módulo 3 — Estatística para decidir (sem sofrimento) (4h30)

| Aula | Tipo | Duração |
|------|------|---------|
| 3.1 A média mente: centro, dispersão e distribuições para gestores | vídeo | 20min |
| 3.2 Correlação não é causalidade: lições de políticas públicas | leitura | 45min |
| 3.3 Amostras, incerteza e o tamanho da dúvida | vídeo | 22min |
| 3.4 Estatística descritiva na prática: sinistros de trânsito de SP no Colab | prática (Colab) | 2h30 |
| 3.5 Quiz do Módulo 3 — Estatística para decisão | quiz | 15min |

### Módulo 4 — SQL no navegador: BigQuery para perguntas grandes (5h)

| Aula | Tipo | Duração |
|------|------|---------|
| 4.1 SQL: a língua franca dos dados (e os 20% que resolvem 80%) | vídeo | 18min |
| 4.2 Primeiras consultas no BigQuery sandbox com a Base dos Dados | prática (BigQuery sandbox) | 1h40 |
| 4.3 Agregar, filtrar, cruzar: GROUP BY e JOIN sem medo | vídeo | 22min |
| 4.4 Três perguntas de gestão respondidas em SQL | prática (BigQuery sandbox) | 2h10 |
| 4.5 Quiz do Módulo 4 — SQL e BigQuery | quiz | 15min |

### Módulo 5 — Dashboards que sustentam decisões: Looker Studio (5h)

| Aula | Tipo | Duração |
|------|------|---------|
| 5.1 Visualização que decide: princípios antes da ferramenta | vídeo | 20min |
| 5.2 Do Sheets ao primeiro dashboard no Looker Studio | prática (Looker Studio) | 1h40 |
| 5.3 Design de dashboards executivos: KPIs, hierarquia e contexto | vídeo | 20min |
| 5.4 Dashboard de zeladoria urbana de ponta a ponta | prática (Looker Studio) | 2h10 |
| 5.5 Quiz do Módulo 5 — Visualização e dashboards | quiz | 15min |

### Módulo 6 — IA copilota, ética e projeto final (5h30)

| Aula | Tipo | Duração |
|------|------|---------|
| 6.1 IA generativa na análise de dados: copilota, não piloto | vídeo | 20min |
| 6.2 NotebookLM na prática: interrogando relatórios públicos | prática (NotebookLM) | 1h20 |
| 6.3 LGPD, ética e limites do uso de dados na gestão pública | leitura | 40min |
| 6.4 Storytelling com dados: a apresentação que muda a decisão | vídeo | 20min |
| 6.5 Projeto final: do dado aberto à recomendação estratégica | prática (Looker Studio + NotebookLM) | 2h30 |

## 6. Fontes de dados usadas nas práticas

| Fonte | URL | Uso no curso |
|-------|-----|--------------|
| Portal de Dados Abertos da Prefeitura de SP | https://dados.prefeitura.sp.gov.br | Chamados do SP156 (módulos 1, 2 e 5) |
| GeoSampa | https://geosampa.prefeitura.sp.gov.br | Camadas geográficas e contexto territorial (leituras) |
| dados.gov.br | https://dados.gov.br | Catálogo federal — exploração guiada (módulo 1) |
| ObservaSampa | https://observasampa.prefeitura.sp.gov.br | Indicadores municipais (leituras e projeto final) |
| InfoSiga SP | https://infosiga.sp.gov.br | Sinistros de trânsito (módulo 3) |
| Base dos Dados | https://basedosdados.org | Tabelas públicas tratadas no BigQuery (módulo 4) |

*Observação de manutenção: links de portais públicos mudam. Cada prática ensina o aluno a **buscar o dataset pelo nome** no portal, e a plataforma disponibiliza uma cópia estável da amostra usada (CSV/planilha) como material da aula.*

## 7. Estratégia de avaliação

| Instrumento | Peso na certificação | Descrição |
|-------------|----------------------|-----------|
| Quizzes de módulo (M1–M5) | 40% | 3–5 questões objetivas por módulo, correção automática, 2 tentativas. Média mínima: 70%. |
| Práticas guiadas | 30% | Autoavaliação por **critérios de conclusão** (checklist) + envio de link/print do artefato (planilha, notebook, dashboard). |
| Projeto final (M6) | 30% | Dashboard + sumário executivo de 1 página com recomendação estratégica, avaliado por rubrica (pergunta clara, dado correto, visual adequado, recomendação acionável). |

**Avaliação formativa contínua:** cada vídeo termina com uma pergunta de reflexão para o fórum; cada prática tem checkpoints intermediários ("se sua tela mostra X, você está no caminho certo").

## 8. Certificação

- Certificado digital da **Giselle Falcão Academy** (30h), emitido automaticamente ao cumprir: 100% das práticas entregues + média ≥ 70% nos quizzes + projeto final aprovado pela rubrica.
- O certificado nomeia as ferramentas dominadas (Google Sheets, Colab, BigQuery, Looker Studio, NotebookLM) — útil para LinkedIn e progressão funcional.

## 9. Notas de produção (para a Giselle)

- **Vídeos curtos e leves:** 18–22 min, gravados com webcam/celular + microfone de lapela. Roteiros completos prontos para teleprompter em `modulo-1.md` e `modulo-2.md`. Nada de edição pesada: cortes secos entre blocos bastam.
- **Slides:** estruturas prontas (título + bullets) para montar no Canva ou Google Slides com a paleta da marca (**roxo, lavanda e teal**), tipografia grande, no máximo 5 bullets por slide.
- **Práticas:** o aluno executa sozinho com o passo a passo; não é preciso gravar screencast na primeira versão do curso (pode ser adicionado depois como melhoria).
- **Ordem de gravação sugerida:** 1.1 → 1.3 → 2.1 → 2.3 (aproveita o mesmo cenário e figurino em uma única diária).
