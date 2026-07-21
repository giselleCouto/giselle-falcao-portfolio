# Estatística e Reconhecimento de Padrões na Ciência de Dados — Plano de Curso

**Curso premium · Nível Intermediário · ~32h · Giselle Falcão Academy**
**Slug:** `estatistica-padroes` · **Professora:** Dra. Giselle Couto Falcão
**Modelo comercial:** premium (pago) — **Módulo 1 aberto como amostra gratuita**

> **Tagline:** A camada de profundidade que faltava: inferência, distâncias, PCA e clustering com rigor estatístico.

---

## 1. Posicionamento na Academy

Este é o curso de **profundidade estatística** da trilha. Os dois cursos gratuitos de aprofundamento ensinam a *fazer*; este ensina a *entender e defender* — a teoria de padrões e a inferência que sustentam tudo o que o scikit-learn faz por baixo do capô.

| Curso | Papel na trilha | O que cobre |
|---|---|---|
| Fundamentos de Ciência de Dados (20h) | Porta de entrada | Panorama da área, estatística descritiva, Python/pandas, visualização |
| Fundamentos de Machine Learning (24h) | Trilha ML aplicado | Regressão, classificação, clustering com scikit-learn, avaliação de modelos |
| Análise de Dados para Decisões Estratégicas (30h) | Trilha análise/gestão | Dados abertos, Sheets, SQL/BigQuery, Looker Studio |
| **Estatística e Reconhecimento de Padrões** (este, 32h) | **Camada de profundidade** | Distribuições e inferência (ICs, testes, p-valor, bootstrap), causalidade com rigor, features e distâncias, PCA, clustering avançado, classificadores estatísticos, validação estatística, anomalias |

**Regra anti-sobreposição** (respeitada no desenho de cada aula):

- Este curso **não reensina** o fluxo básico do scikit-learn (fit/predict, train/test split, K-means introdutório, matriz de confusão) — isso é território de Fundamentos de ML e é tratado aqui como pré-requisito. Quando um algoritmo reaparece (ex.: clustering), é em **versão avançada** (hierárquico, DBSCAN, validação de clusters) ou sob a **lente estatística** (por que funciona, quando falha, como validar).
- Este curso **não cobre** estatística descritiva introdutória (média/mediana/boxplot) nem "estatística para gestores" — territórios de Fundamentos de Ciência de Dados e Análise de Dados. Aqui a estatística é **inferencial e matemática**: distribuições, TCL, ICs, testes, bootstrap.
- A pauta de correlação × causalidade, tocada com leveza nos cursos iniciantes, ganha aqui o **tratamento rigoroso**: confundidores, paradoxo de Simpson com exemplo numérico e introdução a diagramas causais (DAGs).
- Conteúdo exclusivo deste curso (não aparece em nenhum outro): inferência estatística completa, extração de características, medidas de distância e similaridade, PCA e redução de dimensionalidade, clustering hierárquico/DBSCAN, Naive Bayes/KNN/LDA/QDA sob a ótica estatística, comparação estatística de modelos e detecção de anomalias.

## 2. Fio condutor: os casos reais da professora

O curso é atravessado por três domínios onde a Dra. Giselle atua em consultoria e pesquisa:

1. **Sensores industriais** — assinaturas de vibração e temperatura de motores; a distribuição como "impressão digital" da máquina saudável e a anomalia como mudança de distribuição (módulos 1, 3, 4 e 6).
2. **Padrões em imagens de lavoura** — do pixel ao vetor de características: índices de vegetação e textura por talhão, clustering e classificação de estresse na cultura (módulos 3 e 5).
3. **Dados educacionais (SAEB / Metodologia CEOD)** — distribuições de proficiência, paradoxo de Simpson em comparações escolares e componentes principais como índices que emergem de indicadores correlacionados, na linha do trabalho da professora com avaliação educacional em larga escala (módulos 1, 2, 4 e 5).

## 3. Público-alvo

Analistas e cientistas de dados em início de carreira que já treinam modelos com scikit-learn (ou concluíram Fundamentos de ML) e querem o alicerce estatístico para interpretar, validar e defender seus resultados com rigor — em relatórios, entrevistas e discussões técnicas.

## 4. Pré-requisitos

Python básico com pandas no Google Colab e noções de ML aplicado (regressão, classificação, clustering) — o equivalente ao curso Fundamentos de Machine Learning da Academy. A matemática necessária (probabilidade, álgebra do PCA) é construída em aula, com intuição antes de fórmula.

## 5. Resultados de aprendizagem

Ao concluir o curso, o aluno será capaz de:

1. **Identificar a distribuição** por trás de um dado real (normal, lognormal, Poisson, binomial, exponencial) e usar o Teorema Central do Limite e o erro padrão para quantificar a incerteza de qualquer média.
2. **Construir e interpretar** intervalos de confiança, testes de hipótese e intervalos bootstrap, usando o p-valor da forma correta e distinguindo significância estatística de relevância prática.
3. **Transformar dados brutos** (sensores, imagens de lavoura, tabelas educacionais) em vetores de características e escolher a medida de distância ou similaridade adequada a cada problema.
4. **Aplicar PCA e redução de dimensionalidade** para comprimir, visualizar e interpretar dados de alta dimensão — incluindo a leitura de loadings e os limites de t-SNE/UMAP.
5. **Agrupar com clustering hierárquico e DBSCAN**, validar clusters com silhueta e estabilidade, e classificar com Bayes ingênuo, KNN e discriminantes lineares/quadráticos entendendo suas suposições.
6. **Validar e comparar modelos com rigor estatístico** (validação cruzada com incerteza, ROC/AUC, testes pareados) e **detectar anomalias** com métodos do z-score robusto ao Isolation Forest.

## 6. Metodologia e ferramentas

- **Vídeos de 10–25 min** gravados pela professora (câmera + slides, sem produção pesada), tom de conversa — acolhedor porém rigoroso.
- **Leituras ativas** com atividades no fórum.
- **Práticas 100% no navegador, 100% gratuitas**: Google Colab com `numpy`, `scipy`, `statsmodels`, `scikit-learn` e `matplotlib`. Zero instalação.
- **Dados de exemplo realistas embutidos nos notebooks** (sensores industriais, talhões agrícolas, features de imagens de lavoura, indicadores educacionais), sem dependência de links externos.
- **Quiz ao final de cada módulo** (5 questões, 3 alternativas, correção automática com explicação, 2 tentativas).

## 7. Estrutura de módulos e aulas (~32h)

### Módulo 1 — A gramática da incerteza: distribuições, amostragem e o TCL (4h30) · **AMOSTRA GRATUITA**

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 1.1 | Padrões nascem de distribuições: o alicerce estatístico da ciência de dados | vídeo | 20min |
| 1.2 | O bestiário das distribuições: normal, lognormal, Poisson e binomial em dados brasileiros | leitura | 50min |
| 1.3 | Amostras, o Teorema Central do Limite e o erro padrão | vídeo | 22min |
| 1.4 | Distribuições e TCL na prática: sensores industriais no Colab | prática (Colab) | 2h |
| 1.5 | Quiz do Módulo 1 — Distribuições, amostragem e TCL | quiz | 20min |

### Módulo 2 — Inferência: intervalos de confiança, testes de hipótese e bootstrap (5h15)

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 2.1 | Intervalos de confiança: o tamanho honesto da dúvida | vídeo | 22min |
| 2.2 | Testes de hipótese e o p-valor bem usado | vídeo | 25min |
| 2.3 | Correlação não é causalidade — agora com rigor: confundidores, Simpson e DAGs | leitura | 60min |
| 2.4 | Bootstrap e testes na prática: comparando dois manejos agrícolas no Colab | prática (Colab) | 2h20 |
| 2.5 | Quiz do Módulo 2 — Inferência estatística | quiz | 20min |

### Módulo 3 — O que é um padrão: features, distâncias e similaridade (5h)

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 3.1 | Do pixel ao vetor: o que é um padrão para a máquina | vídeo | 22min |
| 3.2 | Engenharia de características estatísticas: momentos, janelas e normalização | leitura | 50min |
| 3.3 | Réguas do espaço: distâncias euclidiana, Manhattan, Mahalanobis e cosseno | vídeo | 25min |
| 3.4 | Assinaturas de máquinas: extraindo features de sensores e medindo similaridade no Colab | prática (Colab) | 2h20 |
| 3.5 | Quiz do Módulo 3 — Features e distâncias | quiz | 20min |

### Módulo 4 — PCA e redução de dimensionalidade (5h15)

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 4.1 | A intuição do PCA: encontrando os eixos que importam | vídeo | 25min |
| 4.2 | PCA na prática: variância explicada, scree plot e loadings | vídeo | 22min |
| 4.3 | Além do PCA: t-SNE, UMAP e seleção de características — mapas úteis e suas mentiras | leitura | 50min |
| 4.4 | Vinte sensores, três componentes: PCA em dados industriais no Colab | prática (Colab) | 2h30 |
| 4.5 | Quiz do Módulo 4 — PCA e redução de dimensionalidade | quiz | 20min |

### Módulo 5 — Clustering avançado e classificadores estatísticos (5h15)

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 5.1 | Clustering hierárquico: o dendrograma como lupa dos dados | vídeo | 22min |
| 5.2 | DBSCAN e validação de clusters: silhueta, estabilidade e ceticismo | vídeo | 22min |
| 5.3 | Classificadores estatísticos: Bayes ingênuo, KNN e discriminantes | vídeo | 25min |
| 5.4 | Padrões de lavoura: clustering e classificação de talhões no Colab | prática (Colab) | 2h50 |
| 5.5 | Quiz do Módulo 5 — Clustering avançado e classificadores | quiz | 25min |

### Módulo 6 — Validação estatística de modelos e detecção de anomalias (6h)

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 6.1 | Seu modelo é bom mesmo? Validação com incerteza e comparação estatística de modelos | vídeo | 25min |
| 6.2 | Detecção de anomalias: do z-score robusto ao Isolation Forest | leitura | 60min |
| 6.3 | Projeto final: pipeline de padrões e anomalias em sensores industriais no Colab | prática (Colab) | 3h |
| 6.4 | Do padrão à decisão: fechamento e próximos passos | vídeo | 18min |
| 6.5 | Quiz do Módulo 6 — Validação e anomalias | quiz | 25min |

**Carga total:** ~32h (aulas + atividades de fórum e reflexão).

## 8. Avaliação e certificação

| Componente | Peso | Detalhe |
|---|---|---|
| Média dos 6 quizzes de módulo | 40% | 5 questões cada, 2 tentativas, vale a maior nota |
| Projeto final (aula 6.3) | 60% | Rubrica: features e padronização corretas (20%), PCA/clustering bem aplicados e interpretados (25%), detector de anomalias com limiar justificado (25%), resumo executivo com ICs e ressalvas honestas (30%) |

- **Certificado digital** da Giselle Falcão Academy para nota final ≥ 70.
- Nota final ≥ 90 concede o selo **"Concluído com Distinção"**.
- O certificado é de **curso livre** (não confere titulação técnica ou de pós-graduação).
- **Acesso premium:** a compra libera todos os módulos; o Módulo 1 completo (incluindo notebook e quiz) fica aberto como amostra gratuita.

## 9. Materiais e fontes de dados

| Material | Onde | Fonte de dados |
|---|---|---|
| Notebook starter do Módulo 1 | `client/public/cursos/notebooks/estatistica-padroes-pratica-modulo1.ipynb` | Leituras de exemplo de temperatura e vibração de motores industriais (dados didáticos realistas embutidos) |
| Notebooks dos Módulos 2–6 | A produzir no mesmo padrão do Módulo 1 | Dados didáticos embutidos: talhões de soja sob dois manejos (M2), séries de vibração simuladas (M3), 20 variáveis de processo industrial (M4), features de imagens de lavoura (M5), frota de motores (M6) |
| Slides das aulas em vídeo | Estruturas numeradas nos documentos de módulo | — |

## 10. Identidade visual

Slides e materiais seguem a paleta da Academy: fundo roxo, títulos em lavanda, destaques em teal. Um conceito por slide; fórmulas sempre precedidas do desenho ou da simulação que as motiva.
