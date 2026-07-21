# Módulos 2–6 — Planos resumidos

**Curso:** Estatística e Reconhecimento de Padrões na Ciência de Dados · Giselle Falcão Academy
Cada módulo abaixo será detalhado no padrão do `modulo-1.md` (roteiros integrais com timestamps, slides numerados, prática passo a passo) na fase de produção. Este documento fixa: objetivo, aulas com resumo, destaques de conteúdo, esqueleto da prática e **quiz completo com gabarito**.

---

## Módulo 2 — Inferência: intervalos de confiança, testes de hipótese e bootstrap (5h15)

**Objetivo geral:** o aluno constrói e interpreta corretamente ICs e testes de hipótese, usa o p-valor sem os vícios clássicos, domina o bootstrap como ferramenta universal de incerteza e trata afirmações causais com o rigor de confundidores, Simpson e DAGs.

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 2.1 | Intervalos de confiança: o tamanho honesto da dúvida | vídeo | 22min |
| 2.2 | Testes de hipótese e o p-valor bem usado | vídeo | 25min |
| 2.3 | Correlação não é causalidade — agora com rigor: confundidores, Simpson e DAGs | leitura | 60min |
| 2.4 | Bootstrap e testes na prática: comparando dois manejos agrícolas no Colab | prática (Colab) | 2h20 |
| 2.5 | Quiz do Módulo 2 — Inferência estatística | quiz | 20min |

**Resumos e destaques por aula:**

- **2.1 (vídeo).** Do erro padrão (módulo 1) ao IC 95% para médias e proporções; a distribuição t de Student quando n é pequeno e σ é desconhecido; interpretação frequencial correta e as duas interpretações erradas mais comuns; exemplos com talhões de soja ("82 ± 4 sacas" muda a conversa com o cliente) e indicadores educacionais. Largura do IC × n × confiança: o triângulo de trade-offs.
- **2.2 (vídeo).** A lógica do advogado do diabo: H0, estatística de teste, distribuição sob H0; o que o p-valor mede (P(dados ≥ observado | H0)) e o que não mede (P(H0)); erro tipo I e II e poder; o limiar 0,05 como convenção histórica, não lei da natureza; comparações múltiplas e p-hacking; significância estatística × relevância prática (efeitos ínfimos "significativos" com n gigante), na linha das recomendações da American Statistical Association sobre p-valores; reporte profissional: efeito + IC + contexto.
- **2.3 (leitura).** Estrutura: (1) por que o mantra precisa virar método; (2) variáveis de confusão com o exemplo dos tratores/capital do curso de ML, agora formalizado; (3) causalidade reversa; (4) **paradoxo de Simpson com exemplo numérico completo em dados educacionais** — método B vence em todos os subgrupos de duas escolas, mas perde no agregado por composição das turmas; (5) introdução a diagramas causais (DAGs): nós, setas, caminhos de porta dos fundos, o que "controlar" significa e por que controlar a variável errada (colisor) piora tudo; (6) hierarquia de evidência: dado observacional × experimento aleatorizado (ponte com A/B tests); (7) checklist de 5 perguntas antes de qualquer frase causal.
- **2.4 (prática, Colab).** Dados de exemplo embutidos: produtividade de 30 + 30 talhões de soja sob manejo convencional × plantio direto com irrigação suplementar. Fluxo: EDA distribucional (módulo 1 aplicado) → teste t de Welch com `scipy.stats` → checagem de pressupostos e alternativa Mann-Whitney → **IC bootstrap** para a diferença de médias e para a diferença de medianas (10.000 reamostras com reposição, percentis 2,5/97,5) → poder: simular quantos talhões seriam necessários para detectar metade do efeito. Desafio: escrever a conclusão executiva de 5 linhas com efeito, IC e ressalva — sem usar a palavra "provado".
- **2.5 (quiz).** Abaixo.

### Quiz do Módulo 2 (com gabarito)

**Q1.** Um IC de 95% para a produtividade média deu [78, 86] sacas/ha. A interpretação correta é:
- a) 95% dos talhões produzem entre 78 e 86 sacas/ha.
- b) Se repetíssemos o estudo muitas vezes, cerca de 95% dos intervalos construídos dessa forma conteriam a média verdadeira — este intervalo é a nossa faixa de valores plausíveis para ela. ✅
- c) Há 95% de probabilidade de o próximo talhão produzir dentro desse intervalo.

*Explicação: o IC quantifica a incerteza sobre a MÉDIA populacional, não sobre talhões individuais (isso seria um intervalo de predição, bem mais largo). A confiança de 95% é uma propriedade do procedimento repetido, não uma probabilidade sobre este intervalo específico.*

**Q2.** O teste retornou p = 0,03. Isso significa que:
- a) A probabilidade de a hipótese nula ser verdadeira é de 3%.
- b) Se a hipótese nula fosse verdadeira, dados tão ou mais extremos que os observados ocorreriam em cerca de 3% das repetições do experimento. ✅
- c) O efeito encontrado tem 97% de chance de se repetir em um novo estudo.

*Explicação: o p-valor é P(dados | H0), nunca P(H0 | dados) — confundir as duas direções é o erro mais comum da inferência aplicada. Ele também não mede replicabilidade nem tamanho do efeito: um p pequeno com efeito ínfimo pode ser irrelevante na prática.*

**Q3.** Com 2 milhões de registros, uma diferença de 0,1% entre dois grupos resultou em p < 0,001. A leitura profissional é:
- a) O efeito é importante, pois o p-valor é minúsculo.
- b) Significância estatística não é relevância prática: com n gigante, efeitos ínfimos ficam "significativos" — reporte o tamanho do efeito com IC e discuta se 0,1% muda alguma decisão. ✅
- c) O teste deve estar errado, pois diferenças pequenas nunca atingem significância.

*Explicação: o p-valor mistura tamanho do efeito com tamanho da amostra — com n enorme, qualquer diferença não nula fica "significativa". A pergunta de negócio é sempre sobre o efeito e sua incerteza (IC), não sobre cruzar o limiar de 0,05.*

**Q4.** Você precisa de um IC de 95% para a MEDIANA do tempo entre falhas — estatística sem fórmula fechada simples. A ferramenta indicada é:
- a) Bootstrap: reamostrar os dados com reposição milhares de vezes, calcular a mediana em cada reamostra e usar os percentis 2,5% e 97,5% da distribuição resultante. ✅
- b) Assumir normalidade e usar mediana ± 2 desvios-padrão.
- c) Nenhuma — apenas médias admitem intervalo de confiança.

*Explicação: o bootstrap estima a distribuição amostral de praticamente qualquer estatística reamostrando os próprios dados — é o canivete suíço da incerteza. Mediana ± 2 desvios mistura conceitos (o desvio-padrão descreve os dados, não a variabilidade da mediana), e ICs existem para qualquer parâmetro estimável.*

**Q5.** Em cada uma de duas escolas, o método B supera o método A em todos os subgrupos de alunos; no agregado das duas, A parece melhor. Esse padrão é:
- a) O paradoxo de Simpson: uma variável de confusão (a composição dos grupos) inverte a conclusão agregada — a análise deve controlar essa variável, e aqui a leitura por subgrupo é a mais confiável. ✅
- b) Impossível — se B vence em todos os subgrupos, vence necessariamente no agregado.
- c) Evidência de fraude na coleta dos dados.

*Explicação: quando os grupos têm composições muito diferentes (ex.: B foi aplicado majoritariamente nas turmas de maior dificuldade), a agregação mistura efeitos e pode inverter o sinal. É perfeitamente possível aritmeticamente — e é o argumento definitivo para sempre perguntar "controlado por quê?" antes de aceitar uma comparação.*

---

## Módulo 3 — O que é um padrão: features, distâncias e similaridade (5h)

**Objetivo geral:** o aluno formaliza o conceito de padrão como vetor num espaço de características, extrai features estatísticas de sinais e imagens, escolhe a medida de distância/similaridade adequada e entende a maldição da dimensionalidade.

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 3.1 | Do pixel ao vetor: o que é um padrão para a máquina | vídeo | 22min |
| 3.2 | Engenharia de características estatísticas: momentos, janelas e normalização | leitura | 50min |
| 3.3 | Réguas do espaço: distâncias euclidiana, Manhattan, Mahalanobis e cosseno | vídeo | 25min |
| 3.4 | Assinaturas de máquinas: extraindo features de sensores e medindo similaridade no Colab | prática (Colab) | 2h20 |
| 3.5 | Quiz do Módulo 3 — Features e distâncias | quiz | 20min |

**Resumos e destaques por aula:**

- **3.1 (vídeo).** O pipeline canônico do reconhecimento de padrões: mundo → sensor → **vetor de características** → espaço de features → decisão. Casos da professora: imagem de lavoura vira índices de vegetação e texturas por talhão; janela de sinal de vibração vira média/desvio/RMS/curtose; aluno numa avaliação vira vetor de acertos e tempos. Tese da aula: a qualidade das features decide o projeto antes do algoritmo — "o modelo enxerga o mundo que as suas features descrevem, nenhum pixel a mais".
- **3.2 (leitura).** Catálogo prático: momentos estatísticos (média, variância, assimetria, curtose) e sua leitura física; RMS e fator de crista para sinais; percentis e amplitudes; features de janelas deslizantes (tamanho e sobreposição da janela); features de imagem (histogramas de cor, estatísticas de textura); features tabulares derivadas (razões, taxas). Padronização z-score × normalização min-max: quando cada uma é obrigatória e o vazamento sutil de padronizar antes de separar treino/teste. Atividade: propor 5 features para um problema do próprio trabalho e justificar cada uma.
- **3.3 (vídeo).** Toda noção de "parecido" esconde uma métrica: euclidiana (a régua padrão, sensível a escala), Manhattan (robusta, caminho de quarteirões), **Mahalanobis** (desconta escala E correlação — a elipse no lugar do círculo), similaridade de cosseno (direção sem magnitude — perfis, textos vetorizados). Critérios de escolha por tipo de dado. Fecho: **maldição da dimensionalidade** — em alta dimensão as distâncias se concentram, "todo mundo fica longe de todo mundo", e a vizinhança perde significado — motivação direta para o módulo 4.
- **3.4 (prática, Colab).** Dados de exemplo embutidos: séries de vibração simuladas de 8 motores (6 saudáveis, 1 desgastado, 1 "disfarçado"). Fluxo: gerar janelas → extrair 6 features estatísticas por janela (`numpy`/`scipy.stats`) → padronizar → matriz de distâncias euclidianas entre motores (heatmap) → repetir com Mahalanobis e comparar → identificar o par mais parecido e o mais distinto. Desafio: encontrar o motor "disfarçado" — normal na média e no desvio, anômalo na curtose — e explicar por que só a feature certa o revela.
- **3.5 (quiz).** Abaixo.

### Quiz do Módulo 3 (com gabarito)

**Q1.** Você vai calcular distâncias euclidianas entre máquinas descritas por temperatura (60–70 °C), vibração (2–5 mm/s) e corrente (100–400 A). Antes disso, é preciso:
- a) Padronizar as variáveis (z-score), senão a corrente — de escala numérica muito maior — domina a distância e as demais viram figurantes. ✅
- b) Nada: a distância euclidiana é imune a diferenças de escala.
- c) Converter todas as variáveis para a mesma unidade física.

*Explicação: a euclidiana soma quadrados de diferenças brutas — uma diferença de 50 A pesa 2.500, enquanto 0,5 mm/s pesa 0,25. Padronizar coloca todas as variáveis em desvios-padrão, dando voz igual a cada uma. Não existe conversão física entre ampère e milímetro por segundo — a solução é estatística, não de unidades.*

**Q2.** Em problemas onde importa a proporção entre as componentes do vetor, e não seu tamanho total (perfis de consumo, textos vetorizados), a medida indicada é:
- a) Distância euclidiana sem padronização.
- b) Similaridade de cosseno, que compara a direção dos vetores ignorando a magnitude. ✅
- c) Distância de Manhattan.

*Explicação: o cosseno mede o ângulo entre vetores — dois clientes com o mesmo padrão de consumo em escalas diferentes (um gasta 10× mais) ficam próximos. Euclidiana e Manhattan misturam forma do perfil com tamanho, separando vetores que apontam para o mesmo lado.*

**Q3.** A vantagem da distância de Mahalanobis sobre a euclidiana com dados padronizados é:
- a) Ser computacionalmente mais barata.
- b) Levar em conta a correlação entre as variáveis: um ponto pode parecer próximo em cada eixo isoladamente, mas ser muito improvável considerando a estrutura conjunta dos dados. ✅
- c) Funcionar apenas com duas variáveis, o que simplifica a análise.

*Explicação: a Mahalanobis usa a matriz de covariância inteira — mede distância em "elipses de probabilidade" e detecta combinações incomuns (temperatura alta COM corrente baixa) que a euclidiana, cega às correlações, não vê. Custa mais caro computacionalmente, não menos, e funciona em qualquer dimensão.*

**Q4.** A "maldição da dimensionalidade" afirma que, em espaços com muitas features:
- a) Os cálculos apenas ficam mais lentos, sem consequência estatística.
- b) As distâncias entre todos os pares de pontos tendem a se concentrar em valores parecidos, degradando métodos baseados em vizinhança como KNN e clustering. ✅
- c) Torna-se obrigatório usar a distância de Manhattan.

*Explicação: em alta dimensão, o contraste entre o vizinho mais próximo e o mais distante encolhe — "todo mundo fica longe de todo mundo" — e a noção de vizinhança perde poder discriminativo. É um fenômeno estatístico, não computacional, e é a motivação central da redução de dimensionalidade do módulo 4.*

**Q5.** Para transformar uma janela de 10 segundos de sinal de vibração (milhares de pontos) em entrada para um classificador, a prática deste módulo usa:
- a) Passar os milhares de pontos crus diretamente ao modelo, sempre.
- b) Extrair um vetor de características estatísticas da janela (média, desvio, RMS, curtose) que resume a assinatura do sinal em poucas dimensões comparáveis. ✅
- c) Usar apenas o valor máximo da janela, descartando o resto.

*Explicação: features estatísticas comprimem a janela preservando a assinatura que interessa (nível, espalhamento, impulsividade) e tornam sinais de durações diferentes comparáveis. Pontos crus em alta dimensão alimentam a maldição da dimensionalidade; só o máximo joga fora quase toda a informação — inclusive a curtose que denuncia rolamento desgastado.*

---

## Módulo 4 — PCA e redução de dimensionalidade (5h15)

**Objetivo geral:** o aluno entende geometricamente o PCA, executa o fluxo completo (padronizar → ajustar → escolher componentes → interpretar loadings), usa t-SNE/UMAP com ceticismo informado e escolhe entre extração e seleção de features.

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 4.1 | A intuição do PCA: encontrando os eixos que importam | vídeo | 25min |
| 4.2 | PCA na prática: variância explicada, scree plot e loadings | vídeo | 22min |
| 4.3 | Além do PCA: t-SNE, UMAP e seleção de características — mapas úteis e suas mentiras | leitura | 50min |
| 4.4 | Vinte sensores, três componentes: PCA em dados industriais no Colab | prática (Colab) | 2h30 |
| 4.5 | Quiz do Módulo 4 — PCA e redução de dimensionalidade | quiz | 20min |

**Resumos e destaques por aula:**

- **4.1 (vídeo).** Construção geométrica em 2D: a nuvem de pontos correlacionados, a direção de maior variância como "primeiro eixo natural" dos dados, a segunda componente ortogonal; rotação de eixos, não criação de informação. Matriz de covariância como personagem (ponte com a Mahalanobis do módulo 3); autovetores/autovalores apresentados como "direções e importâncias" sem exigir álgebra prévia. Leitura de componentes como índices que resumem variáveis correlacionadas — como um índice socioeconômico que emerge de dados escolares correlacionados.
- **4.2 (vídeo).** Fluxo `scikit-learn`: `StandardScaler` → `PCA` → variância explicada acumulada → scree plot e o "cotovelo" → **loadings** e o batismo de componentes (ex.: "componente de carga térmica" se pesam temperatura e corrente juntas). Erros clássicos: PCA sem padronizar (a variável de maior escala sequestra a PC1), interpretar componente como causa, esquecer que PCA é linear e global. Quando NÃO usar PCA: features já interpretáveis e poucas, ou necessidade de explicabilidade variável a variável.
- **4.3 (leitura).** Estrutura: (1) o limite linear do PCA com um exemplo em espiral; (2) t-SNE por vizinhanças — perplexidade, o que preserva (estrutura local) e o que inventa (tamanhos e distâncias entre clusters não são interpretáveis); (3) UMAP — mais rápido, preserva um pouco mais de estrutura global, mesmos cuidados; (4) regras de leitura honesta de mapas 2D (rodar mais de uma vez, variar hiperparâmetros, nunca medir distâncias no mapa); (5) extração × **seleção** de features (filtros por correlação/informação, seleção por modelo) e quando preferir cada uma; (6) guia de decisão final: objetivo → técnica.
- **4.4 (prática, Colab).** Dados de exemplo embutidos: 200 instantes × 20 variáveis de processo de uma planta (temperaturas, pressões, vazões, correntes correlacionadas, com dois regimes de operação escondidos). Fluxo: padronizar → PCA → scree plot e escolha de k → loadings em heatmap e batismo das 3 primeiras componentes → dispersão PC1×PC2 revelando os **dois regimes sem nenhum rótulo** → comparação rápida com um t-SNE dos mesmos dados. Desafio: projetar uma amostra nova "suspeita" no espaço das componentes e argumentar, com base na posição dela, se é operação normal — antecipando a detecção de anomalias do módulo 6.
- **4.5 (quiz).** Abaixo.

### Quiz do Módulo 4 (com gabarito)

**Q1.** A primeira componente principal de um PCA é:
- a) A variável original que tem a maior variância.
- b) A combinação linear das variáveis que captura a maior variância possível dos dados — o eixo ao longo do qual a nuvem mais se espalha. ✅
- c) Sempre a média aritmética de todas as variáveis.

*Explicação: o PCA não escolhe variáveis, ele constrói novos eixos girando o sistema de coordenadas; a PC1 é a direção de maior espalhamento da nuvem. Só coincide com uma variável original se as demais forem irrelevantes, e só se parece com uma média quando todas as variáveis são fortemente correlacionadas entre si.*

**Q2.** Por que padronizar as variáveis antes do PCA quando elas têm unidades diferentes?
- a) Porque o PCA maximiza variância: sem padronizar, a variável de maior escala numérica "sequestra" as primeiras componentes, independentemente de sua importância real. ✅
- b) Porque o algoritmo do PCA só aceita valores entre 0 e 1.
- c) Padronizar nunca é necessário — o PCA é invariante a escalas.

*Explicação: variância depende da unidade — pressão em Pa (milhares) esmaga temperatura em °C (dezenas). Padronizar dá variância 1 a todas, e as componentes passam a refletir estrutura de correlação, não escolha de unidades. O PCA aceita qualquer faixa de valores; ele apenas responde de forma diferente (e enganosa) sem padronização.*

**Q3.** Com 20 sensores, as 3 primeiras componentes explicam 85% da variância. Isso significa que:
- a) Qualquer modelo treinado nas 3 componentes terá 85% de acurácia.
- b) Trabalhando em 3 dimensões em vez de 20, retemos 85% da variabilidade total dos dados — compressão que facilita visualização e modelagem ao custo dos 15% restantes. ✅
- c) 17 dos 20 sensores estão com defeito e devem ser removidos.

*Explicação: variância explicada mede fidelidade da compressão, não desempenho de modelo — os 15% descartados podem até conter o sinal relevante para uma tarefa específica, por isso sempre se valida depois. E componentes descartadas não apontam sensores ruins: cada componente mistura todos os sensores.*

**Q4.** Os loadings (cargas) de uma componente principal servem para:
- a) Medir a acurácia final do PCA.
- b) Interpretar a componente: mostram o peso de cada variável original na sua composição, permitindo "batizá-la" (ex.: componente de carga térmica, se temperatura e corrente pesam juntas). ✅
- c) Definir a taxa de aprendizado do algoritmo.

*Explicação: o loading é o coeficiente de cada variável original na combinação linear da componente — a ponte entre o espaço abstrato e a física ou o negócio. É a leitura dos loadings que separa "reduzi para 3 dimensões" de "descobri que o processo tem três modos: térmico, hidráulico e elétrico". PCA não tem acurácia nem taxa de aprendizado.*

**Q5.** No mapa 2D de um t-SNE, dois clusters aparecem muito distantes um do outro. A leitura correta é:
- a) A distância entre eles no mapa mede fielmente a dissimilaridade real dos grupos.
- b) O t-SNE preserva vizinhanças locais, não distâncias globais: os grupos existem, mas o espaçamento e o tamanho aparente dos clusters no mapa não devem ser interpretados literalmente. ✅
- c) O t-SNE falhou e deve ser reexecutado até os clusters se aproximarem.

*Explicação: o t-SNE otimiza a preservação de vizinhanças, distorcendo livremente distâncias e densidades globais — clusters "longe" podem ser vizinhos no espaço original, e tamanhos de cluster são artefato da perplexidade. O mapa serve para descobrir estrutura, nunca para medi-la; medições se fazem no espaço original ou nas componentes do PCA.*

---

## Módulo 5 — Clustering avançado e classificadores estatísticos (5h15)

**Objetivo geral:** o aluno agrupa dados com hierárquico e DBSCAN, valida clusters com silhueta e estabilidade em vez de aceitá-los por fé, e domina os classificadores estatísticos clássicos (Naive Bayes, KNN, LDA/QDA) com suas suposições e fronteiras.

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 5.1 | Clustering hierárquico: o dendrograma como lupa dos dados | vídeo | 22min |
| 5.2 | DBSCAN e validação de clusters: silhueta, estabilidade e ceticismo | vídeo | 22min |
| 5.3 | Classificadores estatísticos: Bayes ingênuo, KNN e discriminantes | vídeo | 25min |
| 5.4 | Padrões de lavoura: clustering e classificação de talhões no Colab | prática (Colab) | 2h50 |
| 5.5 | Quiz do Módulo 5 — Clustering avançado e classificadores | quiz | 25min |

**Resumos e destaques por aula:**

- **5.1 (vídeo).** Além do K-means (que o aluno já viu em Fundamentos de ML): aglomerativo passo a passo, métodos de ligação (simples, completa, média, Ward) e como cada um deforma os grupos; leitura de dendrogramas — altura de fusão como dissimilaridade; escolha do corte; quando a hierarquia em si é a resposta (taxonomias de escolas por perfil de indicadores, famílias de produtos). Exemplo condutor: agrupar escolas por perfil de indicadores educacionais, onde um k fixo esconderia a estrutura aninhada.
- **5.2 (vídeo).** DBSCAN: densidade, `eps` e `min_samples`, pontos núcleo/borda/**ruído**; clusters de forma arbitrária; o gráfico de k-distâncias para calibrar `eps`. Segunda metade — a parte que falta em quase todo curso: **validação de clusters**. Silhueta (leitura honesta), comparação com dados aleatorizados (se o embaralhado dá silhueta parecida, não há estrutura), estabilidade sob reamostragem. Mantra: "algoritmo de clustering sempre devolve clusters; existirem de verdade é outra história".
- **5.3 (vídeo).** O teorema de Bayes como máquina de classificar: priors, verossimilhanças, posterior. **Naive Bayes** e a suposição de independência condicional (falsa em geral, útil mesmo assim — e por quê). **KNN** como classificador por vizinhança: dependência total da métrica e da escala (ponte com módulo 3), o papel do k (viés × variância). **LDA/QDA**: gaussianas por classe, fronteira linear (covariâncias iguais) × quadrática (covariâncias próprias); LDA como redutor de dimensão supervisionado. Tabela de decisão: qual classificador para qual cenário — e a conexão com o que o scikit-learn faz por baixo do capô.
- **5.4 (prática, Colab).** Dados de exemplo embutidos: 90 talhões descritos por features extraídas de imagens de lavoura (média e desvio de índice de vegetação, proporção de solo exposto, textura), parte com rótulo agronômico (saudável × estresse hídrico × infestação). Fluxo: padronizar → dendrograma (Ward) e corte → DBSCAN e comparação (inclusive pontos de ruído) → silhueta das duas soluções + baseline embaralhado → na parte rotulada, treinar Naive Bayes, KNN e LDA → comparar com validação honesta e ler as fronteiras em 2D (PCA do módulo 4 reaproveitado para visualizar). Desafio: recomendar ao agrônomo um classificador e defender a escolha com números e uma ressalva.
- **5.5 (quiz).** Abaixo.

### Quiz do Módulo 5 (com gabarito)

**Q1.** Em um dendrograma de clustering hierárquico, a altura em que dois grupos se fundem representa:
- a) O número total de pontos contidos nos dois grupos.
- b) A dissimilaridade entre eles no momento da fusão — fusões altas unem grupos muito diferentes, e cortar o dendrograma abaixo delas revela a estrutura natural dos dados. ✅
- c) A ordem alfabética dos rótulos das observações.

*Explicação: o eixo vertical do dendrograma é a distância (segundo o método de ligação escolhido) em que a fusão ocorreu. Saltos grandes de altura são a dica visual clássica para o corte: os grupos unidos ali já eram "espécies" bem distintas.*

**Q2.** A principal vantagem do DBSCAN sobre o K-means é:
- a) Ser sempre mais rápido em qualquer volume de dados.
- b) Encontrar clusters de forma arbitrária por densidade, sem exigir o número de clusters de antemão, e marcar explicitamente pontos de ruído que não pertencem a grupo algum. ✅
- c) Não possuir nenhum hiperparâmetro para calibrar.

*Explicação: o K-means impõe k e clusters convexos "em bola", e força todo ponto para dentro de algum grupo; o DBSCAN segue a densidade (formas alongadas, anéis) e devolve ruído como categoria própria — precioso em anomalias. O preço: calibrar eps e min_samples, que são hiperparâmetros bem reais.*

**Q3.** Uma solução de clustering obteve silhueta média de 0,08 (próxima de zero). Isso indica:
- a) Clusters excelentes, compactos e bem separados.
- b) Estrutura de grupos fraca: os pontos estão, em média, quase tão próximos de clusters vizinhos quanto do próprio — a "descoberta" pode ser artefato do algoritmo, e vale comparar com dados aleatorizados. ✅
- c) Que basta normalizar a silhueta para que ela chegue a 1.

*Explicação: silhueta perto de 1 = ponto muito mais próximo do seu cluster que do vizinho; perto de 0 = fronteira indefinida; negativa = provável atribuição errada. Média 0,08 sugere que o algoritmo apenas fatiou uma nuvem contínua — o teste do embaralhamento diz se há estrutura real além do acaso.*

**Q4.** A suposição "ingênua" do classificador Naive Bayes é:
- a) Que todas as classes têm exatamente a mesma probabilidade a priori.
- b) Que as features são condicionalmente independentes dada a classe — falsa em geral, mas que ainda produz classificadores úteis, rápidos e surpreendentemente competitivos em alta dimensão. ✅
- c) Que os dados seguem distribuição uniforme em todas as dimensões.

*Explicação: o "ingênuo" está em fatorar P(x₁,…,xₚ|classe) como produto das marginais, ignorando correlações entre features. O modelo erra as probabilidades absolutas, mas frequentemente acerta o ranking entre classes — por isso classifica bem mesmo com a suposição violada. Priors desiguais são permitidos e estimados dos dados.*

**Q5.** No KNN, usar k muito pequeno (por exemplo, k = 1) tende a causar:
- a) Underfitting, pois o modelo se torna simples demais.
- b) Overfitting: a decisão fica refém do vizinho mais próximo — inclusive de ruído e outliers — criando fronteiras irregulares que não generalizam. ✅
- c) Nenhum efeito, pois o KNN não possui hiperparâmetros.

*Explicação: k controla o trade-off viés × variância do KNN — k=1 memoriza o treino (variância alta), k enorme dilui tudo na classe majoritária (viés alto). O k é hiperparâmetro central, escolhido por validação; e, como todo método de vizinhança, o KNN ainda depende criticamente da escala e da métrica (módulo 3).*

---

## Módulo 6 — Validação estatística de modelos e detecção de anomalias (6h)

**Objetivo geral:** o aluno valida e compara modelos com incerteza explícita (CV com IC, ROC/AUC, testes pareados), domina o repertório de detecção de anomalias do z-score robusto ao Isolation Forest e integra todo o curso num projeto final de pipeline completo.

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 6.1 | Seu modelo é bom mesmo? Validação com incerteza e comparação estatística de modelos | vídeo | 25min |
| 6.2 | Detecção de anomalias: do z-score robusto ao Isolation Forest | leitura | 60min |
| 6.3 | Projeto final: pipeline de padrões e anomalias em sensores industriais no Colab | prática (Colab) | 3h |
| 6.4 | Do padrão à decisão: fechamento e próximos passos | vídeo | 18min |
| 6.5 | Quiz do Módulo 6 — Validação e anomalias | quiz | 25min |

**Resumos e destaques por aula:**

- **6.1 (vídeo).** Acurácia única é amostra de tamanho 1: validação cruzada reportada com média ± desvio e IC (aplicando o módulo 2 ao próprio modelo); curva ROC e AUC como qualidade de ordenação independente de limiar; comparação de modelos com **teste t pareado nos folds** e **McNemar** nas previsões; por que "A venceu B por 0,4 ponto" sem incerteza é afirmação vazia; armadilhas: variância entre folds, teste usado muitas vezes, seleção de modelo como fonte de otimismo. O hábito que separa relatório amador de relatório defensável.
- **6.2 (leitura).** Estrutura: (1) taxonomia — anomalia pontual, contextual, coletiva, com casos de sensores e de dados educacionais; (2) métodos univariados: z-score e seus limites, versões robustas (mediana + MAD), IQR; (3) multivariados: Mahalanobis (reencontro com o módulo 3) e elipses de probabilidade; (4) por aprendizado: **Isolation Forest** (anomalia é o que se isola com poucos cortes) e **LOF** (densidade local); (5) as **cartas de controle** de Shewhart que a indústria usa há um século — e sua conexão com tudo acima; (6) calibração do limiar: taxa de alarmes falsos como decisão de negócio, não constante mágica; (7) protocolo da casa: anomalia detectada é hipótese para investigar, não veredito — pode ser falha, erro de sensor ou mudança legítima de regime.
- **6.3 (prática, Colab — projeto final).** Dados de exemplo embutidos: frota de 12 motores, séries de vibração e temperatura com regimes de operação distintos, 2 máquinas em degradação e falhas rotuladas ao final do período. Pipeline exigido (integra o curso inteiro): features por janela (M3) → padronização → PCA e leitura de loadings (M4) → clustering dos regimes de operação com validação (M5) → classificador do estado da máquina com CV e IC (M6.1) → detector de anomalias (robusto + Isolation Forest) com **limiar justificado estatisticamente** (M1/M6.2) → resumo executivo de 10 linhas com efeitos, ICs e ressalvas. Entrega: link do notebook + resumo; avaliado por rubrica (é a principal evidência do certificado).
- **6.4 (vídeo).** Síntese da jornada — da distribuição ao pipeline; mapa do que vem depois: modelos probabilísticos mais ricos, séries temporais, deep learning para padrões em imagem, e a ponte com interpretabilidade de modelos (SHAP) que conecta com a prática de consultoria da professora; portfólio com os notebooks do curso; como demonstrar rigor estatístico em entrevistas (as 5 perguntas que derrubam candidatos e como respondê-las).
- **6.5 (quiz).** Abaixo.

### Quiz do Módulo 6 (com gabarito)

**Q1.** O modelo A obteve 91,2% e o modelo B 90,8% de acurácia média em validação cruzada, com desvio de ±1,5 ponto percentual entre folds. A conclusão profissional é:
- a) A é superior e deve ser declarado vencedor imediatamente.
- b) A diferença (0,4 ponto) é menor que a variabilidade entre folds: sem um teste estatístico (como t pareado nos folds), não há evidência de superioridade real — e critérios como simplicidade e custo podem decidir a escolha. ✅
- c) B é superior, porque números mais redondos generalizam melhor.

*Explicação: a acurácia média de CV é uma estimativa com incerteza — 0,4 ponto de diferença dentro de ±1,5 de ruído é indistinguível de empate. O teste pareado nos folds usa o fato de ambos os modelos verem os mesmos dados; sem evidência de diferença, escolhe-se pelo resto: interpretabilidade, latência, manutenção.*

**Q2.** AUC = 0,93 em um classificador binário significa que:
- a) O modelo acerta 93% de todas as previsões que faz.
- b) Sorteando ao acaso um exemplo positivo e um negativo, o modelo atribui score maior ao positivo em cerca de 93% das vezes — qualidade de ordenação, independente do limiar de decisão. ✅
- c) 93% dos casos positivos são detectados quando o limiar é 0,5.

*Explicação: a AUC resume a curva ROC inteira e tem essa interpretação probabilística elegante — mede o quão bem o modelo ordena, sem fixar limiar. Acurácia e recall dependem do limiar escolhido (e do balanceamento das classes); a AUC, não. Modelos com mesma AUC podem ter acurácias bem diferentes no 0,5.*

**Q3.** Para detectar outliers em uma variável que já contém valores extremos, usar "média ± 3 desvios-padrão" é problemático porque:
- a) Os próprios outliers inflam a média e o desvio-padrão, mascarando uns aos outros; medidas robustas como mediana e MAD (ou o critério do IQR) resistem a essa contaminação. ✅
- b) A regra dos 3 sigmas só é válida para dados de sensores industriais.
- c) O desvio-padrão não pode ser matematicamente calculado na presença de outliers.

*Explicação: é o efeito de mascaramento — um outlier gigante estica o desvio, e o limite μ ± 3σ abre tanto que engole os demais extremos. Mediana e MAD quase não se movem com contaminação moderada, por isso o z-score robusto é o padrão profissional. A regra 3σ vale para qualquer dado aproximadamente normal — e falha em qualquer um contaminado.*

**Q4.** A intuição central do Isolation Forest é:
- a) Anomalias formam sempre o menor cluster encontrado pelo K-means.
- b) Anomalias são mais fáceis de isolar: partições aleatórias separam um ponto anômalo do resto com poucos cortes, então profundidade média pequena nas árvores equivale a score alto de anomalia. ✅
- c) Anomalias são sempre os pontos com os maiores valores absolutos.

*Explicação: em vez de modelar o normal e medir desvio, o Isolation Forest ataca a anomalia diretamente — pontos raros e distantes caem em folhas rasas de árvores de partição aleatória. Funciona em alta dimensão e sem assumir distribuição; e anomalias multivariadas podem ter valores individuais banais (a combinação é que é rara).*

**Q5.** O detector sinalizou uma anomalia nas leituras de um sensor em produção. O protocolo correto, segundo o curso, é:
- a) Descartar a leitura imediatamente para não contaminar as análises seguintes.
- b) Tratar a anomalia como hipótese a investigar: pode ser falha da máquina, erro do sensor ou mudança legítima de regime — o contexto decide, e o descarte automático pode apagar justamente o evento mais importante. ✅
- c) Retreinar o modelo na hora, incluindo a anomalia como uma classe nova.

*Explicação: a anomalia é o começo da investigação, não o fim — o mesmo score alto pode ser um rolamento falhando (ação de manutenção), um sensor descalibrado (ação de instrumentação) ou um novo regime operacional (ação de modelagem). Descartar ou retreinar automaticamente destrói a informação mais valiosa que o detector produz.*
