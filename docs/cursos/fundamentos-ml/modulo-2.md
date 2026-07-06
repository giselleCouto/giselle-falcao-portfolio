# Módulo 2 — Regressão: ensinando a máquina a prever números

**Curso:** Fundamentos de Machine Learning | **Carga do módulo:** 3h20
**Objetivo do módulo:** construir a intuição da regressão linear (o "olá, mundo" do ML supervisionado), ensinar o aluno a preparar features com senso crítico, avaliar previsões com MAE/RMSE/R² e treinar seu primeiro modelo de verdade no Google Colab.

**Aulas:**

| # | Aula | Tipo | Duração |
|---|------|------|---------|
| 2.1 | A intuição da regressão linear | vídeo | 22min |
| 2.2 | Features, correlação e armadilhas dos dados | leitura | 40min |
| 2.3 | Avaliando previsões: MAE, RMSE e R² | vídeo | 18min |
| 2.4 | Prevendo a produtividade da soja com regressão no Colab | prática (Colab) | 100min |
| 2.5 | Quiz do Módulo 2 | quiz | 20min |

---

## Aula 2.1 — A intuição da regressão linear [vídeo, 22min]

### a) Plano de aula

**Objetivos de aprendizagem:**

- **Explicar** a regressão linear como "a melhor reta pelos pontos" (Bloom: compreender).
- **Interpretar** os coeficientes da equação y = a + bx em contexto de negócio (Bloom: compreender/analisar).
- **Descrever** intuitivamente como o algoritmo encontra a reta (minimizar erros) (Bloom: compreender).
- **Estender** o raciocínio para a regressão múltipla (várias variáveis de entrada) (Bloom: aplicar).

**Duração:** 22min de vídeo.

**Materiais:** roteiro (abaixo), deck de 13 slides, câmera + slides. Gráficos dos slides podem ser gerados no Google Sheets (dispersão + linha de tendência) para manter a produção leve.

**Sequência didática:**

- *Abertura (0:00–2:30):* retomada da prática 1.4 (a correlação vista lá vira previsão aqui); promessa: "hoje você entende a máquina por dentro".
- *Desenvolvimento (2:30–19:00):* do gráfico de dispersão à reta → equação y = a + bx com tradução de negócio → como a máquina escolhe a reta (erros/resíduos e a ideia de minimizá-los) → regressão múltipla → o que a reta não faz (limites).
- *Fechamento (19:00–22:00):* recapitulação, pergunta de reflexão, ponte para a leitura 2.2.

**Avaliação:** itens 1 e 4 do quiz 2.5 + pergunta de reflexão nos comentários.

### b) Roteiro de gravação (teleprompter)

**[0:00–2:30] — ROSTO NA CÂMERA**

Se você fez a prática do módulo 1, você viu com seus próprios olhos que a ração por vaca tinha correlação forte com a produção de leite. Hoje a gente dá o passo que transforma essa observação em superpoder: **usar essa relação para prever**. Bem-vindo, bem-vinda à regressão linear — o "olá, mundo" do Machine Learning.

E eu quero começar tirando um peso: regressão linear é uma reta. Só isso. Uma reta bem escolhida. Se você já viu uma "linha de tendência" num gráfico de Excel, você já esbarrou nela. A diferença é que hoje você vai entender o que essa reta significa, como a máquina escolhe ela, e como usar isso para tomar decisão. Vamos?

**[2:30–5:30] — SLIDES 3 e 4 (dispersão → reta)**

Olha esse gráfico de dispersão comigo. Cada ponto é uma fazenda: no eixo horizontal, quilos de ração por vaca por dia; no vertical, litros de leite produzidos. Dá para ver a olho nu que os pontos sobem juntos — mais ração, mais leite, em média.

Agora, se eu te perguntasse: uma fazenda nova vai dar 7 quilos de ração por vaca — quanto leite esperar? Seu olho já está traçando uma linha imaginária pelos pontos, não está? A regressão linear faz exatamente isso, só que com critério matemático: ela encontra **a reta que melhor resume a nuvem de pontos**. Aprender, aqui, é achar essa reta. O modelo É a reta.

**[5:30–9:30] — SLIDES 5 e 6 (a equação y = a + bx, traduzida)**

Toda reta tem uma fórmula, e eu prometo que essa é a única fórmula da aula: y igual a **a** mais **b** vezes x. Vamos traduzir para gente como a gente.

O **b** é a inclinação — o número mais importante do modelo. Ele responde: quando x aumenta uma unidade, quanto y aumenta em média? Se b for 2,3, cada quilo a mais de ração está associado, em média, a 2,3 litros a mais de leite. Percebe o poder disso numa reunião? Você não diz "ração importa"; você diz **quanto** importa. É a diferença entre opinião e análise.

O **a** é o intercepto: o valor de y quando x é zero. Às vezes tem interpretação real, às vezes é só o ponto onde a reta corta o eixo — uma vaca com zero de ração ainda produz algo pastando, mas nem sempre vale extrapolar até o zero. O protagonista da história de negócio costuma ser o b.

**[9:30–13:30] — SLIDES 7 e 8 (como a máquina escolhe a reta: resíduos)**

Agora, a pergunta de um milhão: entre infinitas retas possíveis, como o algoritmo escolhe A reta? Vem comigo que é bonito.

Para cada fazenda, olha a distância vertical entre o ponto real e a reta — o quanto a reta errou para aquela fazenda. Esse erro tem nome: **resíduo**. Uma reta boa deixa resíduos pequenos no conjunto todo. O método clássico, chamado de mínimos quadrados, eleva cada erro ao quadrado — para erro pra cima e pra baixo não se cancelarem, e para punir com força os erros grandes — soma tudo, e escolhe a reta que torna essa soma a **menor possível**.

E aqui está a revelação que eu quero que você leve desta aula: "treinar um modelo" significa **encontrar os números — o a e o b — que minimizam o erro nos dados de treino**. Só isso. Quando alguém falar "treinei um modelo", é isso que aconteceu por baixo: uma busca pelos parâmetros que erram menos. Tira o mistério, né?

**[13:30–17:00] — SLIDES 9 e 10 (regressão múltipla)**

"Mas Giselle, produção de leite não depende só de ração!" Exatamente — e que bom que você pensou isso, porque é o pensamento de quem entendeu. Depende da genética, da temperatura, da sanidade do rebanho... A boa notícia: a regressão aceita várias variáveis de entrada ao mesmo tempo. Vira y igual a: a, mais b1 vezes ração, mais b2 vezes temperatura, mais b3 vezes o que mais fizer sentido.

Não dá mais para desenhar — seria uma reta em várias dimensões — mas a leitura de cada coeficiente continua: b2 diz quanto a produção muda para cada grau a mais de temperatura, **mantendo o resto constante**. Nos meus projetos de agro e indústria, é assim que a regressão vira ferramenta de gestão: ela coloca número na conversa. Deixa de ser "o calor atrapalha" e vira "cada grau acima da média custa tantos litros por vaca". Isso muda reunião.

**[17:00–19:00] — SLIDE 11 (o que a reta NÃO faz)**

Três limites honestos, porque rigor faz parte do combinado. Um: a regressão linear assume relação de linha reta — se a relação real faz curva, ela resume mal. Dois: ela é sensível a pontos extremos — uma fazenda fora da curva pode entortar a reta inteira. Três: coeficiente não é causalidade — o b diz que as coisas variam juntas, não que uma causa a outra. Essa última é tão importante que tem uma seção só dela na leitura da próxima aula.

**[19:00–22:00] — SLIDE 12 + ROSTO NA CÂMERA**

Recapitulando: regressão linear é a melhor reta pela nuvem de pontos; o coeficiente b diz quanto y muda por unidade de x; treinar é encontrar os parâmetros que minimizam a soma dos erros ao quadrado; e com várias variáveis vira regressão múltipla, cada coeficiente com sua história — sempre "mantendo o resto constante".

Reflexão nos comentários: pensa numa relação do teu trabalho que pode ser uma reta — investimento em anúncio e vendas, temperatura e consumo de energia, o que for. Qual seria o x, qual seria o y, e o que o b significaria? Na próxima aula, uma leitura importante: como escolher bem as variáveis de entrada — e as armadilhas que fazem modelos mentirem com confiança. Te vejo lá!

### c) Estrutura de slides (13 slides)

1. **Capa** — "Aula 2.1 — A intuição da regressão linear".
2. **Da correlação à previsão** — na prática 1.4 você VIU a relação ração × leite · hoje: usar a relação para PREVER · "regressão linear = uma reta bem escolhida".
3. **O gráfico de dispersão** — pontos: fazendas (ração/vaca/dia × litros/dia) · os pontos "sobem juntos" · pergunta: 7 kg de ração → quantos litros?
4. **A melhor reta pelos pontos** — mesma dispersão com a reta traçada · o modelo É a reta · aprender = achar a reta.
5. **A única fórmula da aula** — y = a + b·x · y: o que quero prever · x: o que eu conheço · a e b: o que o treino descobre.
6. **Traduzindo a e b** — b (inclinação): "+1 em x → +b em y, em média" · ex.: b = 2,3 → cada kg de ração ≈ +2,3 L de leite · a (intercepto): y quando x = 0 (nem sempre interpretável) · "b transforma opinião em análise".
7. **Resíduo: o erro de cada ponto** — distância vertical ponto ↔ reta · resíduos pequenos = reta boa · gráfico com os resíduos desenhados como segmentos.
8. **Mínimos quadrados** — erros² (não se cancelam + punem erros grandes) → somar → escolher a reta com a MENOR soma · "treinar = achar a e b que minimizam o erro no treino".
9. **O mundo tem mais de um x** — produção de leite: ração + temperatura + genética + sanidade · regressão múltipla: y = a + b1x1 + b2x2 + b3x3...
10. **Lendo coeficientes múltiplos** — cada b: efeito daquela variável "mantendo o resto constante" · exemplo: "cada grau acima da média ≈ −X litros/vaca" · número na conversa muda a reunião.
11. **O que a reta NÃO faz** — relação em curva → resume mal · sensível a outliers · coeficiente ≠ causalidade (teaser da leitura 2.2).
12. **Recapitulação** — reta · b = quanto y muda por unidade de x · treinar = minimizar erro² · múltipla = vários x, "resto constante".
13. **Sua vez + próxima aula** — reflexão: qual reta existe no SEU trabalho? (x, y e o significado do b) · próxima: leitura "Features, correlação e armadilhas dos dados".

---

## Aula 2.2 — Features, correlação e armadilhas dos dados [leitura, 40min]

### a) Plano de aula

**Objetivos de aprendizagem:**

- **Definir** feature (variável de entrada) e target (variável-alvo) (Bloom: lembrar).
- **Interpretar** coeficientes de correlação (força e direção, de −1 a +1) (Bloom: compreender).
- **Diferenciar** correlação de causalidade com exemplos concretos (Bloom: analisar).
- **Reconhecer** vazamento de dados (data leakage) e correlações espúrias antes de treinar um modelo (Bloom: analisar/avaliar).

**Duração:** 40min de leitura ativa (~2.200 palavras + 4 checkpoints).

**Materiais:** texto na plataforma com gráficos ilustrativos (podem ser gerados no Google Sheets).

**Sequência didática:**

- *Abertura:* vocabulário oficial — o que chamávamos de "variáveis de entrada" agora tem nome: **features**; a resposta é o **target**. Tabela do dataset da soja (prática 2.4) com features e target destacados.
- *Desenvolvimento:*
  1. **Correlação de Pearson na prática:** escala de −1 a +1, o que é forte/fraco, correlação negativa (ex.: temperatura acima do conforto térmico × produção de leite). Como ler a matriz de correlação (retomando a prática 1.4).
  2. **Correlação ≠ causalidade:** exemplos memoráveis — venda de sorvete e afogamentos (variável oculta: verão); no agro, "fazendas com mais trator têm mais produtividade" (variável oculta: capital). O que um modelo pode e não pode afirmar.
  3. **Correlações espúrias:** com dados suficientes, alguma coisa sempre se correlaciona por acaso; por que isso piora com amostras pequenas.
  4. **Vazamento de dados (data leakage):** quando uma feature "entrega" a resposta porque só existe depois do fato (ex.: usar "quantidade colhida por hectare em outra métrica" para prever produtividade; usar "valor da fatura final" para prever inadimplência). Regra de bolso: *"essa informação existiria no momento em que eu preciso da previsão?"*.
  5. **Boas práticas de seleção de features:** começar simples, preferir features com lógica de negócio, desconfiar de correlação perfeita (≈1,0) com o target — quase sempre é vazamento.
- *Checkpoints "pare e pense"* após as seções 2, 4 e 5.
- *Fechamento:* checklist "antes de treinar, pergunte-se" (5 perguntas) + ponte para a aula 2.3 (como medir se a previsão presta).

**Avaliação:** itens 4 e 5 do quiz 2.5 retomam diretamente esta leitura.

---

## Aula 2.3 — Avaliando previsões: MAE, RMSE e R² [vídeo, 18min]

### a) Plano de aula

**Objetivos de aprendizagem:**

- **Calcular** mentalmente o MAE em um exemplo pequeno (Bloom: aplicar).
- **Diferenciar** MAE de RMSE e **justificar** quando usar cada um (Bloom: analisar).
- **Interpretar** o R² como proporção da variação explicada (Bloom: compreender).
- **Criticar** avaliações feitas nos dados de treino (Bloom: avaliar).

**Duração:** 18min de vídeo.

**Materiais:** roteiro (abaixo), deck de 11 slides.

**Sequência didática:**

- *Abertura (0:00–2:00):* cena de consultoria — "seu modelo é bom?" exige resposta em número.
- *Desenvolvimento (2:00–15:30):* erro de previsão → MAE (com mini-exemplo numérico) → RMSE e a punição dos erros grandes → R² → em qual conjunto medir (teste!).
- *Fechamento (15:30–18:00):* tabela-resumo das métricas, ponte para a prática 2.4.

**Avaliação:** itens 2 e 3 do quiz 2.5.

### b) Roteiro de gravação (teleprompter)

**[0:00–2:00] — ROSTO NA CÂMERA**

Imagina a cena: você treinou seu primeiro modelo de regressão — aliás, na próxima aula você vai treinar mesmo, de verdade — e alguém da diretoria pergunta: "e aí, o modelo é bom?". "Acho que sim" não é resposta profissional. Hoje eu te dou as três ferramentas para responder essa pergunta com número: MAE, RMSE e R². São três siglas, mas relaxa: por trás delas tem três ideias simples, e você vai sair daqui lendo as três como quem lê placar de jogo.

**[2:00–5:30] — SLIDES 3 e 4 (erro e MAE)**

Tudo começa com uma subtração. O modelo previu 50 sacas por hectare; o talhão rendeu 47. Erro: 3 sacas. Fazemos isso para cada previsão do conjunto de teste — lembra dele, o cofre? — e temos uma lista de erros. Métrica de avaliação é só um jeito de resumir essa lista num número.

O resumo mais honesto e direto é o **MAE** — erro absoluto médio. Pega cada erro, ignora o sinal — errar 3 pra cima ou 3 pra baixo é errar 3 — e tira a média. Mini-exemplo, acompanha comigo no slide: erros de 2, 5 e 8 sacas... some, 15, divide por 3... MAE de 5 sacas por hectare. E olha que maravilha: a métrica está **na unidade do problema**. "Nosso modelo erra em média 5 sacas por hectare" — qualquer pessoa da operação entende, sem estatística nenhuma. Por isso o MAE é a métrica que eu mais uso para conversar com gestor.

**[5:30–9:00] — SLIDES 5 e 6 (RMSE)**

Agora, o MAE tem um ponto cego: para ele, dez erros de 1 saca e um erro de 10 sacas dão na mesma. Mas e se erro grande for muito pior para o negócio? Se uma previsão muito errada significa comprar insumo demais, ou deixar um caminhão ocioso?

Para isso existe o **RMSE** — raiz do erro quadrático médio. A receita: eleva cada erro ao quadrado — e aqui está o truque, porque ao quadrado, um erro de 10 vira 100, enquanto dez erros de 1 viram só 10 — tira a média, e depois a raiz quadrada para voltar à unidade original. Resultado: o RMSE **pune erros grandes** com muito mais força.

Regra prática, anota: RMSE é sempre maior ou igual ao MAE. E se o RMSE estiver **muito** maior que o MAE, isso é um sinal de alerta valioso: seu modelo comete alguns erros grandes escondidos na média. Vale investigar que casos são esses — muitas vezes é ali que mora o insight.

**[9:00–13:00] — SLIDES 7 e 8 (R²)**

A terceira métrica responde outra pergunta. MAE e RMSE dizem o tamanho do erro; o **R²** diz: **quanto da variação do alvo o meu modelo explica?**

Pensa assim: se eu não tivesse modelo nenhum, meu melhor chute para qualquer talhão seria a média geral de todos. O R² compara seu modelo contra esse "chute da média". R² de 0,85 significa: o modelo explica 85% da variação da produtividade; os 15% restantes são fatores que ele não captura. R² de zero? Seu modelo empatou com o chute da média — não aprendeu nada útil. E no mundo real, com dados de campo, ninguém espera R² de 0,99 — aliás, se aparecer um, desconfie: lembra da leitura sobre vazamento de dados? Correlação perfeita demais geralmente é informação vazada, não genialidade.

Cuidado clássico de leitura: R² de 0,85 **não** significa "o modelo acerta 85% das vezes". Regressão não acerta ou erra — ela erra mais ou erra menos. O R² fala de variação explicada. Essa confusão cai em entrevista de emprego, viu?

**[13:00–15:30] — SLIDE 9 (onde medir: treino × teste)**

E a pergunta final, que amarra tudo com o módulo 1: essas métricas, eu calculo em quais dados? Se eu medir no treino, estou dando ao aluno a prova que ele decorou — a nota vem inflada, linda e mentirosa. A avaliação honesta é **sempre no conjunto de teste**, nos dados que o modelo nunca viu. Na prática de amanhã você vai calcular as três métricas nos dois conjuntos e ver a diferença com seus próprios olhos. É um dos momentos mais formativos do curso.

**[15:30–18:00] — SLIDES 10 e 11 + ROSTO NA CÂMERA**

Recapitulando com a tabela: **MAE** — erro médio na unidade do problema, ótimo para comunicar. **RMSE** — parecido, mas pune erros grandes; compare com o MAE para achar alertas. **R²** — proporção da variação explicada, de "empatei com a média" até 1. E as três medidas valem no **teste**, nunca no treino.

Agora sim, você tem o vocabulário completo do ciclo: prever com a reta, e julgar a previsão com métrica. Na próxima aula, a gente junta tudo: você vai treinar uma regressão de verdade, com dados de soja, no Colab, e defender o resultado com números. É a aula que eu mais queria gravar deste módulo. Te vejo lá!

### c) Estrutura de slides (11 slides)

1. **Capa** — "Aula 2.3 — Avaliando previsões: MAE, RMSE e R²".
2. **"O modelo é bom?"** — a pergunta da diretoria exige número · hoje: 3 métricas, 3 ideias simples.
3. **Tudo começa com o erro** — erro = previsto − real · ex.: previu 50 sacas/ha, rendeu 47 → erro 3 · lista de erros no conjunto de TESTE · métrica = resumo da lista.
4. **MAE — erro absoluto médio** — ignora o sinal, tira a média · mini-exemplo: erros 2, 5, 8 → MAE = 5 sacas/ha · na unidade do problema → fala com o gestor.
5. **O ponto cego do MAE** — 10 erros de 1 ≈ 1 erro de 10 · e se erro grande custar caro? (insumo comprado errado, caminhão ocioso).
6. **RMSE — punindo erros grandes** — erros² → média → raiz · 1 erro de 10 → 100; 10 erros de 1 → 10 · RMSE ≥ MAE sempre · RMSE ≫ MAE = alerta: erros grandes escondidos.
7. **R² — variação explicada** — baseline: "chute da média" · R² 0,85 = modelo explica 85% da variação · R² 0 = empatou com a média · R² ≈ 1,0 → desconfie (vazamento!).
8. **O que o R² NÃO é** — R² 0,85 ≠ "acerta 85% das vezes" · regressão erra mais ou erra menos, não acerta/erra · pegadinha clássica de entrevista.
9. **Onde medir? No TESTE** — medir no treino = corrigir a prova decorada → nota inflada · avaliação honesta = dados nunca vistos · na prática 2.4: métricas no treino × teste, lado a lado.
10. **Tabela-resumo** — MAE: erro médio, comunica bem | RMSE: pune erros grandes, compare com MAE | R²: % de variação explicada · todas no conjunto de teste.
11. **Próxima aula** — prática 2.4: treinar regressão de verdade (soja, Colab, scikit-learn) · "defender o resultado com números".

---

## Aula 2.4 — Prevendo a produtividade da soja com regressão no Colab [prática, 100min]

### a) Plano de aula

**Objetivos de aprendizagem:**

- **Construir** um modelo de regressão linear com scikit-learn (`LinearRegression`) (Bloom: aplicar).
- **Executar** a divisão treino/teste com `train_test_split` (Bloom: aplicar).
- **Calcular e interpretar** MAE, RMSE e R² no treino e no teste (Bloom: analisar).
- **Comunicar** os coeficientes do modelo em linguagem de negócio (Bloom: avaliar/criar).

**Duração:** 100min (guiado ~70min + desafio ~30min).

**Materiais:** Google Colab, roteiro passo a passo (abaixo), código fornecido em blocos comentados na plataforma (o aluno copia e cola célula a célula — decisão pedagógica: digitar/colar cada bloco cria mais engajamento que um notebook 100% pronto, agora que ele já conhece o Colab).

**Sequência didática:** abertura (contexto do problema: cooperativa quer estimar produtividade por talhão antes da colheita) → geração do dataset sintético realista no próprio notebook → exploração rápida → treino do modelo → avaliação treino × teste → leitura dos coeficientes → desafio (nova feature) → fechamento (checklist + entrega).

**Avaliação:** checklist de conclusão + link do notebook entregue na plataforma.

### d) Prática guiada — passo a passo

**Ferramenta:** Google Colab (colab.research.google.com).

**Dataset:** dataset sintético realista de 200 talhões de soja (gerado no próprio notebook com semente fixa `random_state=42`, garantindo reprodutibilidade e independência de links externos). Features: `chuva_mm` (chuva acumulada no ciclo), `adubo_kg_ha` (adubação), `temp_media_c` (temperatura média), `argila_pct` (teor de argila do solo). Target: `produtividade_sacas_ha`.
*Extra opcional:* quem quiser um segundo dataset real pode repetir o fluxo com o California Housing, embutido no scikit-learn (`sklearn.datasets.fetch_california_housing`) — sem download manual.

**Passo a passo:**

1. Crie um notebook novo no Colab (**Arquivo → Novo notebook**) e renomeie para `pratica-modulo2-regressao-soja`.
2. Cole e execute a célula de imports fornecida na plataforma (`pandas`, `numpy`, `matplotlib`, `sklearn`). Tudo já vem instalado no Colab — nenhum `pip install` é necessário.
3. Cole e execute a célula que gera o dataset dos 200 talhões (código fornecido, com `np.random.seed`/`random_state=42`). Confira com `df.head()` e `df.shape` que há 200 linhas e 5 colunas.
4. Explore: execute `df.describe()` e a matriz de correlação `df.corr(numeric_only=True)`. Anote qual feature tem maior correlação com `produtividade_sacas_ha` — você vai comparar com os coeficientes do modelo no passo 8.
5. Separe features e target: `X = df[["chuva_mm", "adubo_kg_ha", "temp_media_c", "argila_pct"]]` e `y = df["produtividade_sacas_ha"]`.
6. Divida treino e teste: `train_test_split(X, y, test_size=0.2, random_state=42)`. Confirme os tamanhos: 160 talhões no treino, 40 no teste.
7. Treine o modelo: crie `LinearRegression()`, chame `.fit(X_treino, y_treino)`. (Sim, treinar são duas linhas — o difícil, como você já sabe, é tudo que vem antes e depois.)
8. Leia os coeficientes: imprima `model.coef_` e `model.intercept_` e escreva, em uma frase de negócio para cada feature, o que o coeficiente significa (ex.: "cada mm a mais de chuva no ciclo ≈ +X sacas/ha, mantendo o resto constante").
9. Avalie: gere previsões com `.predict()` para treino e teste; calcule MAE (`mean_absolute_error`), RMSE (`root_mean_squared_error`) e R² (`r2_score`) **nos dois conjuntos** e organize em uma tabelinha. Compare: o desempenho no teste é um pouco pior que no treino? Por quê?
10. Visualize: faça o gráfico de dispersão "real × previsto" no conjunto de teste com a linha de 45° — quanto mais os pontos abraçam a linha, melhor o modelo.
11. **Desafio:** o código de geração inclui uma coluna extra `talhao_id` (número sequencial do talhão). Adicione-a como feature, retreine e compare as métricas. Ela ajuda, atrapalha ou nada muda? Escreva em uma célula de texto por que um identificador não deveria melhorar um modelo honesto — e o que significaria se melhorasse (dica: reveja a seção de vazamento de dados da leitura 2.2).
12. Salve no Drive e envie o link de compartilhamento na plataforma.

**Critérios de conclusão (checklist do aluno):**

- [ ] Modelo treinado com `LinearRegression` sobre o split 80/20.
- [ ] Tabela com MAE, RMSE e R² calculados no treino E no teste.
- [ ] Uma frase de interpretação de negócio para cada coeficiente.
- [ ] Gráfico real × previsto do conjunto de teste.
- [ ] Desafio respondido (efeito do `talhao_id` + explicação em texto).
- [ ] Link do notebook enviado na plataforma.

---

## Aula 2.5 — Quiz do Módulo 2 [quiz, 20min]

### a) Plano de aula

**Objetivos:** verificar compreensão da mecânica da regressão (coeficientes, treino), das métricas (MAE/RMSE/R²) e das armadilhas (causalidade, vazamento). Bloom: compreender/aplicar/analisar.
**Formato:** 5 questões de múltipla escolha, 3 alternativas cada, correção automática com explicação. 2 tentativas; vale a maior. Compõe a média de quizzes (40% da nota do curso).

### Questões

**Q1. Na regressão linear y = a + b·x, o coeficiente b representa...**

- a) O valor de y quando x é igual a zero.
- b) Quanto y varia, em média, a cada unidade a mais de x. ✅
- c) A porcentagem de acertos do modelo no conjunto de teste.

*Explicação:* b é a inclinação da reta: o efeito médio de +1 unidade de x sobre y (na múltipla, "mantendo o resto constante"). O valor de y quando x = 0 é o intercepto (a). Regressão não tem "porcentagem de acerto".

**Q2. Qual métrica penaliza mais fortemente os erros grandes de previsão?**

- a) MAE, porque tira a média de todos os erros.
- b) RMSE, porque eleva os erros ao quadrado antes de tirar a média. ✅
- c) R², porque mede a variação explicada pelo modelo.

*Explicação:* Ao elevar ao quadrado, um erro de 10 pesa 100, enquanto dez erros de 1 pesam 10 no total — por isso o RMSE cresce muito na presença de erros grandes (e RMSE ≥ MAE sempre). Um RMSE muito maior que o MAE indica erros grandes escondidos.

**Q3. Um modelo de regressão obteve R² = 0,85 no conjunto de teste. Isso significa que...**

- a) O modelo acerta a previsão em 85% das vezes.
- b) O modelo explica cerca de 85% da variação do alvo; o restante fica sem explicação. ✅
- c) O erro médio do modelo é de 0,85 sacas por hectare.

*Explicação:* R² compara o modelo com o "chute da média" e mede a proporção da variação do target explicada. Regressão não "acerta/erra" (isso seria classificação), e erro médio em unidades do problema é o MAE, não o R².

**Q4. Descobriu-se que fazendas com mais tratores têm maior produtividade. Podemos concluir que comprar tratores CAUSA aumento de produtividade?**

- a) Sim — a correlação alta comprova a relação de causa e efeito.
- b) Não — correlação não implica causalidade; uma variável oculta (como capital disponível) pode explicar as duas coisas. ✅
- c) Sim, desde que a correlação seja maior que 0,9.

*Explicação:* Correlação mostra que as variáveis andam juntas, não que uma causa a outra. Fazendas mais capitalizadas compram mais tratores E investem em tudo que aumenta produtividade — o capital é a variável oculta. Nenhum valor de correlação, por maior que seja, comprova causalidade sozinho.

**Q5. O que caracteriza vazamento de dados (data leakage) no treinamento de um modelo?**

- a) Usar como feature uma informação que não estaria disponível no momento real da previsão (ou que entrega a resposta). ✅
- b) Usar menos de 80% dos dados para o treinamento do modelo.
- c) Treinar o modelo com dados coletados de mais de uma fonte diferente.

*Explicação:* Vazamento é quando o modelo "cola" — recebe no treino uma informação que só existe depois do fato ou que embute o próprio target (ex.: usar o valor da fatura final para prever inadimplência). O sintoma clássico é desempenho bom demais para ser verdade. A proporção do split e o número de fontes não definem vazamento.
