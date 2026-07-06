# Módulos 3 a 6 — Planos resumidos

**Curso:** Fundamentos de Machine Learning | Giselle Falcão Academy
Estes módulos serão desenvolvidos por completo (planos de aula + roteiros + slides) em uma segunda onda de produção, após a validação dos módulos 1 e 2 com a primeira turma. Os quizzes finais destes módulos seguem o mesmo formato dos módulos 1 e 2 (5 questões, 3 alternativas, 2 tentativas).

---

## Módulo 3 — Classificação: ensinando a máquina a decidir (4h15)

**Objetivos do módulo:** o aluno será capaz de formular problemas de classificação binária e multiclasse, treinar regressão logística, árvores de decisão e florestas aleatórias no scikit-learn, ler uma matriz de confusão e escolher entre precisão e recall conforme o custo do erro no negócio.

### Aulas

**3.1 — Problemas de classificação: do spam à fraude no Pix** [vídeo, 22min]
Apresenta a classificação como o problema supervisionado de prever categorias, com exemplos brasileiros: antifraude do Pix, triagem de crédito, controle de qualidade industrial. Introduz classes, probabilidades e o limiar de decisão (threshold). Mostra por que "acurácia de 99%" pode ser péssima quando as classes são desbalanceadas (fraude é raríssima).

**3.2 — Regressão logística, árvores de decisão e florestas aleatórias** [vídeo, 25min]
Constrói a intuição dos três classificadores mais usados por iniciantes: a regressão logística como "regressão que devolve probabilidade", a árvore de decisão como sequência de perguntas (e sua interpretabilidade), e a floresta aleatória como comitê de árvores que vota. Discute quando preferir interpretabilidade (árvore) versus desempenho (floresta).

**3.3 — Matriz de confusão, precisão, recall e o custo do erro** [leitura, 60min]
Leitura aprofundada sobre avaliação de classificadores: verdadeiros/falsos positivos e negativos, precisão, recall, F1 e o trade-off entre eles. Casos com custos assimétricos: deixar passar uma fraude versus bloquear um cliente legítimo; alarme falso na fábrica versus falha não detectada. Checkpoints pedem que o aluno escolha a métrica prioritária em cada cenário.

**3.4 — Prevendo churn de clientes com classificação no Colab** [prática (Colab), 120min]
Exercício guiado completo: treinar regressão logística e floresta aleatória no dataset público Telco Customer Churn (CSV público da IBM: https://raw.githubusercontent.com/IBM/telco-customer-churn-on-icp4d/master/data/Telco-Customer-Churn.csv) para prever cancelamento de clientes de telecom. Inclui preparação de variáveis categóricas, matriz de confusão, comparação precisão × recall e ajuste do limiar de decisão. Desafio: recomendar ao "diretor comercial" qual modelo usar e por quê, em 5 linhas.

**3.5 — Quiz do Módulo 3** [quiz, 30min]
5 questões cobrindo: classes desbalanceadas e o perigo da acurácia, leitura de matriz de confusão, escolha entre precisão e recall por custo do erro, intuição da floresta aleatória e efeito do limiar de decisão.

---

## Módulo 4 — Clustering: encontrando grupos escondidos nos dados (4h)

**Objetivos do módulo:** o aluno será capaz de explicar o aprendizado não supervisionado, aplicar K-means com features padronizadas, escolher o número de clusters com o método do cotovelo, interpretar os grupos em linguagem de negócio e apresentá-los em um painel simples.

### Aulas

**4.1 — Quando não temos rótulos: aprendizado não supervisionado** [vídeo, 20min]
Retoma a diferença supervisionado × não supervisionado e apresenta os usos típicos de clustering no Brasil: segmentação de clientes no varejo, agrupamento de lojas/filiais por perfil de venda, perfis de talhões no agro. Enfatiza que sem gabarito não existe "acerto" — existe utilidade: um bom cluster é o que gera decisão.

**4.2 — K-means passo a passo (e como escolher o k)** [vídeo, 22min]
Desmonta o algoritmo K-means com animação em slides: centróides, atribuição, atualização, convergência. Explica por que padronizar as features antes (escalas diferentes distorcem distâncias) e apresenta o método do cotovelo e a silhueta como guias — não oráculos — para escolher o k.

**4.3 — Segmentação de clientes e outros usos de clustering no Brasil** [leitura, 50min]
Leitura com estudo de caso narrativo: uma rede varejista segmenta sua base com RFM (recência, frequência, valor monetário) + K-means e descobre 4 personas acionáveis. Discute como nomear clusters, apresentar para diretoria e os erros comuns (cluster demais, features sem lógica de negócio, esquecer de padronizar).

**4.4 — Segmentando clientes com K-means no Colab + painel no Looker Studio** [prática (Colab + Looker Studio), 120min]
Exercício em duas etapas: (1) no Colab, aplicar K-means ao dataset público Online Retail (UCI) transformado em RFM por cliente, escolher k pelo cotovelo e exportar o resultado em CSV; (2) importar o CSV no Looker Studio (via Google Sheets) e montar um mini-painel com o tamanho e o perfil de cada segmento. Desafio: batizar cada segmento com um nome de negócio e sugerir uma ação de marketing para cada um.

**4.5 — Quiz do Módulo 4** [quiz, 25min]
5 questões cobrindo: quando usar clustering, papel da padronização, mecânica do K-means, método do cotovelo e interpretação de clusters como decisão de negócio.

---

## Módulo 5 — Avaliação e melhoria de modelos (4h20)

**Objetivos do módulo:** o aluno será capaz de diagnosticar overfitting e underfitting, aplicar validação cruzada, ajustar hiperparâmetros de forma disciplinada, identificar vieses e vazamentos, e montar um protocolo de avaliação confiável — o módulo que transforma o iniciante em alguém que não se engana com o próprio modelo.

### Aulas

**5.1 — Overfitting, underfitting e a divisão treino/teste** [vídeo, 25min]
O conceito mais importante do curso ganha sua aula dedicada: modelos que decoram (overfitting) versus modelos simples demais (underfitting), ilustrados com o mesmo dataset ajustado por retas e por polinômios exagerados. Ensina a diagnosticar pela distância entre desempenho no treino e no teste, retomando o que o aluno viu na prática 2.4.

**5.2 — Validação cruzada e ajuste de hiperparâmetros sem pânico** [vídeo, 20min]
Apresenta a validação cruzada k-fold como forma de avaliar com mais confiança quando há poucos dados, e o ajuste de hiperparâmetros (ex.: profundidade da árvore, k do K-means) com busca simples em grade. Regra de ouro: o conjunto de teste continua no cofre — hiperparâmetro se ajusta com validação, nunca com teste.

**5.3 — Viés, vazamento de dados e ética em ML** [leitura, 60min]
Leitura sobre as formas silenciosas de um modelo dar errado: viés histórico nos dados (crédito, contratação), vazamento temporal, proxy discriminatório (CEP como substituto de renda/raça) e a responsabilidade de quem modela — com referência à LGPD e ao debate brasileiro de regulação de IA. Checkpoints com dilemas para o aluno julgar.

**5.4 — Diagnóstico completo de um modelo no Colab** [prática (Colab), 130min]
Clínica de modelos: o aluno recebe um notebook com três modelos defeituosos treinados no dataset de churn do módulo 3 — um com overfitting, um com underfitting e um com vazamento de dados — e precisa diagnosticar cada um usando curvas treino × validação, validação cruzada e inspeção de features. Desafio: consertar pelo menos dois dos três e documentar o raciocínio.

**5.5 — Quiz do Módulo 5** [quiz, 25min]
5 questões cobrindo: sintomas de overfitting/underfitting, papel da validação cruzada, por que hiperparâmetros não se ajustam no teste, identificação de vazamento e riscos éticos de proxies discriminatórios.

---

## Módulo 6 — Projeto final: do dado à decisão (4h35)

**Objetivos do módulo:** o aluno será capaz de conduzir um projeto de ML de ponta a ponta com autonomia: escolher problema e dataset, preparar dados, treinar e avaliar ao menos dois modelos, comunicar resultados em linguagem de negócio e planejar seus próximos passos de carreira. Consolida a nota final e o certificado.

### Aulas

**6.1 — Como montar um projeto de ML de ponta a ponta** [vídeo, 20min]
Giselle percorre um projeto exemplar do início ao fim usando o ciclo de vida do módulo 1 como roteiro, mostrando um notebook "gabarito" comentado. Apresenta os três temas oferecidos para o projeto final (regressão, classificação ou clustering, cada um com dataset público sugerido) e os erros que mais reprovam projetos.

**6.2 — Guia do projeto final + rubrica de pontuação** [leitura, 40min]
Documento-guia com os requisitos do projeto: perguntas de negócio, checklist técnico mínimo, estrutura esperada do notebook e a rubrica de avaliação detalhada (critérios e pontos). Inclui um FAQ e um modelo de "resumo executivo" de 10 linhas que o aluno deve escrever ao final — porque comunicar é parte do trabalho.

**6.3 — Projeto final guiado no Colab** [prática (Colab), 160min]
O aluno executa seu projeto no Colab a partir de um template com a estrutura do ciclo de vida (seções prontas, células vazias). Usa um dos datasets públicos sugeridos ou um dataset próprio aprovado no fórum. Entrega: link do notebook + resumo executivo. É a principal evidência prática do certificado.

**6.4 — Próximos passos na sua jornada de dados e IA** [vídeo, 15min]
Aula de fechamento e orientação de carreira: o que estudar depois (Python mais profundo, SQL/BigQuery, deep learning, MLOps, IA generativa), como montar portfólio com os notebooks do curso e como o LinkedIn recompensa quem publica projeto. Apresenta a trilha de cursos da Giselle Falcão Academy como caminho natural de continuidade.

**6.5 — Avaliação final com pontuação** [quiz, 40min]
Avaliação somativa de 20 questões cobrindo todo o curso (fundamentos, regressão, classificação, clustering, avaliação de modelos). Vale 40% da nota final; sem consulta ao gabarito entre tentativas (2 tentativas, questões embaralhadas). Nota ≥ 70 no curso libera o certificado; ≥ 90 concede o selo "Concluído com Distinção".
