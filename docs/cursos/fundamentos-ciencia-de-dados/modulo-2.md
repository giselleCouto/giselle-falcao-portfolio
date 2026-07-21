# Módulo 2 — Estatística essencial (sem trauma)

**Curso:** Fundamentos de Ciência de Dados · Giselle Falcão Academy
**Carga do módulo:** 3h45 · **Aulas:** 2 vídeos, 1 leitura, 1 prática (Google Sheets), 1 quiz

**Objetivo geral do módulo:** ao final, o aluno classifica variáveis, lê a distribuição de um conjunto de dados pelo histograma, resume dados com medidas de centro e dispersão (incluindo boxplot), desconfia de números mal apresentados na mídia e aplica tudo isso em uma análise real de notas do ENEM no Google Sheets.

> **Nota de posicionamento:** este módulo é a *gramática estatística do cientista de dados* — tipos de variáveis, distribuições, dispersão, boxplot e probabilidade intuitiva, com exemplos de ENEM, salários e e-commerce. O recorte "estatística para gestores públicos" (média enganosa em prazos de atendimento, viés de amostra no SP156, armadilha dos pequenos números) pertence ao curso Análise de Dados para Decisões Estratégicas e não é repetido aqui.

---

## Aula 2.1 — O formato dos dados: tipos de variáveis e distribuições

**Tipo:** vídeo · **Duração:** 20min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Classificar** (compreender/aplicar) variáveis em qualitativas (nominais, ordinais) e quantitativas (discretas, contínuas). 2. **Explicar** (compreender) por que o tipo da variável define as operações e os gráficos permitidos. 3. **Interpretar** (analisar) um histograma como o retrato da distribuição de uma variável. 4. **Identificar** (analisar) os três formatos clássicos de distribuição: simétrica, assimétrica e bimodal. |
| **Duração** | 20 min de vídeo |
| **Materiais** | Slides (12); imagem de apoio com 3 histogramas (simétrico, assimétrico, bimodal) |
| **Sequência didática** | **Abertura (0–1:30):** a promessa do "sem trauma"; estatística como gramática. **Desenvolvimento (1:30–16:30):** os dois grandes grupos de variáveis → subtipos com exemplos brasileiros → por que o tipo importa (operações permitidas) → o conceito de distribuição → como nasce um histograma → os três formatos e o que cada um conta. **Fechamento (16:30–20:00):** regra "a forma antes do número", tarefa, teaser da Aula 2.2. |
| **Avaliação** | Formativa: mini-desafio em tela (classificar 4 variáveis). Somativa: questão 1 do quiz. |

### b) Roteiro de gravação

> Tom: professora experiente conversando. Pausas nos "…", sorrir nos parênteses de conexão. **[CÂMERA]** = rosto na tela; **[SLIDE n]** = mostrar slide.

**[0:00–1:30] — [CÂMERA] Abertura**

Oi! Módulo dois — e eu sei que para muita gente a palavra "estatística" vem com trauma de escola junto. Fórmula no quadro, letra grega, aquela sensação de "quando é que eu vou usar isso?"… Então deixa eu fazer um combinado com você: neste módulo, **nenhuma fórmula aparece antes da intuição**. Primeiro a gente entende a ideia com exemplo do mundo real, depois — só depois, e só se precisar — vem o cálculo.

E por que estatística logo no módulo dois? Porque ela é a **gramática** da ciência de dados. Python é o alfabeto, as ferramentas são o caderno… mas quem decide se uma frase de dados faz sentido é a estatística. Hoje a gente começa pelo mais fundamental: os tipos de dados e o formato deles. Vinte minutos. Vem comigo.

**[1:30–4:30] — [SLIDE 2 → SLIDE 3] Os dois grandes grupos de variáveis**

[SLIDE 2] Toda coluna de uma tabela — a gente chama de **variável** — cai em um de dois grandes grupos. As **qualitativas** descrevem uma qualidade, uma categoria: o estado onde a pessoa mora, a forma de pagamento do pedido, o time de coração. E as **quantitativas** descrevem uma quantidade, um número que mede algo: a renda, a nota do ENEM, o número de filhos.

O teste rápido para separar: **faz sentido tirar média?** Média de renda, faz sentido. Média de time de coração… não existe, né? Então renda é quantitativa e time é qualitativa. Simples assim.

[SLIDE 3] Agora, cada grupo se divide em dois. Dentro das qualitativas: as **nominais**, que são categorias sem ordem nenhuma — estado, time, forma de pagamento. E as **ordinais**, que têm uma ordem natural — escolaridade (fundamental, médio, superior), grau de satisfação (ruim, regular, ótimo), faixa de risco (baixo, médio, alto). Repara: tem ordem, mas a "distância" entre os degraus não é um número — de "ruim" para "regular" não dista 1,5 de nada.

E dentro das quantitativas: as **discretas**, que só assumem valores contáveis — número de filhos, número de pedidos no mês; ninguém tem 2,7 filhos. E as **contínuas**, que podem assumir qualquer valor num intervalo — altura, renda, tempo de entrega: 3,14 dias de entrega existe, infelizmente.

**[4:30–6:30] — [SLIDE 4] Por que isso importa (não é preciosismo)**

[SLIDE 4] "Tá, Giselle, mas por que eu preciso saber disso?" Porque **o tipo da variável define o que é permitido fazer com ela** — que conta, que resumo, que gráfico. Contar e ver a categoria mais frequente: pode com qualquer tipo. Tirar média, somar, calcular desvio: só com quantitativas. Ordenar: quantitativas e ordinais.

E aqui vai o erro clássico que eu já vi em relatório de gente grande: alguém codifica satisfação como 1, 2, 3 — ruim, regular, ótimo — e sai calculando "satisfação média: 2,4". Parece científico… mas é uma média de rótulos. Quem disse que a distância de "ruim" para "regular" é igual à de "regular" para "ótimo"? O número ali era só um apelido, e o apelido virou aritmética. Mini-desafio: pausa o vídeo e classifica estas quatro: bairro de entrega… nota de matemática… quantidade de parcelas… e faixa etária — [pausa 3s] — bairro é qualitativa nominal, nota é quantitativa contínua, parcelas é quantitativa discreta, e faixa etária é qualitativa **ordinal** — tem ordem, mas virou categoria. Acertou as quatro? Excelente. Errou alguma? Volta no slide 3 depois da aula, sem culpa.

**[6:30–10:00] — [SLIDE 5 → SLIDE 6] Distribuição: o retrato da variável**

[SLIDE 5] Agora o conceito central da aula. Quando você olha uma variável quantitativa — digamos, as notas de matemática de 500 candidatos do ENEM — você tem 500 números. Ninguém consegue "ler" 500 números. A pergunta esperta não é "quais são os valores?", é: **"como os valores se espalham?"** Onde eles se concentram? Até onde vão? Tem valor solitário lá longe? Esse espalhamento tem nome: **distribuição**. E a distribuição é o retrato da variável — o rosto dela.

[SLIDE 6] E como a gente revela esse retrato? Com o **histograma**. A receita é simples: primeiro, divida a régua de valores em faixas iguais — digamos, notas de 300 a 400, de 400 a 500, de 500 a 600, e assim vai. Depois, conte quantos candidatos caem em cada faixa. Por fim, desenhe uma barra para cada faixa, com altura igual à contagem. Pronto: as 500 notas viraram uma silhueta que o olho lê em dois segundos. Onde a barra é alta, os dados se concentram; onde é baixa, são raros; onde não tem barra, não tem ninguém.

Uma observação de quem já corrigiu muito exercício: histograma parece gráfico de barras, mas não é. No gráfico de barras, cada barra é uma **categoria** (SP, RJ, MG…). No histograma, cada barra é uma **faixa de valores** de uma variável contínua — por isso as barras ficam coladas: a régua é contínua.

**[10:00–14:00] — [SLIDE 7 → SLIDE 8 → SLIDE 9] Os três formatos clássicos**

Agora vem a parte que eu mais gosto: aprender a ler os rostos. Três formatos aparecem o tempo todo.

[SLIDE 7] Formato um: a distribuição **simétrica**, o famoso sino. A maioria dos valores no meio, caudas parecidas dos dois lados. A altura das pessoas adultas é o exemplo clássico: muita gente perto do centro, pouca gente muito baixa, pouca gente muito alta, e o equilíbrio dos dois lados. Quando a distribuição é simétrica, o centro é bem-comportado — média e mediana praticamente coincidem, como a gente vai ver na próxima aula.

[SLIDE 8] Formato dois: a distribuição **assimétrica**, com uma cauda comprida de um lado só. O exemplo brasileiro inevitável: **renda**. A maioria das pessoas ganha até uns poucos milhares de reais… e uma minoria pequena ganha dezenas, centenas de vezes isso, esticando a cauda para a direita. Tempo de entrega no e-commerce é igual: a maioria chega em poucos dias, e alguns pedidos levam semanas. Cauda para a direita é o formato mais comum nos dados de negócio — e é ele que faz a média enganar, assunto da próxima aula.

[SLIDE 9] Formato três: a distribuição **bimodal** — dois morros. E esse formato é um alarme delicioso: ele quase sempre significa que **tem dois grupos diferentes misturados na mesma variável**. Exemplo: você faz o histograma das notas de uma "turma" e vê dois morros… investiga… e descobre que ali dentro tem uma turma que fez curso preparatório e outra que não fez. O histograma denunciou uma estrutura que ninguém tinha contado para você. Quando você vir dois morros, não calcule nada ainda — vá descobrir quem são os dois grupos.

**[14:00–16:30] — [SLIDE 10 → SLIDE 11] A forma antes do número**

[SLIDE 10] Isso tudo nos leva à regra de ouro do módulo, que eu quero tatuada na sua memória: **a forma antes do número**. Antes de calcular qualquer média, qualquer resumo, faça o histograma. Dois segundos de silhueta te contam se o centro é confiável, se tem cauda puxando tudo, se tem dois grupos escondidos, se tem valor absurdo digitado errado.

[SLIDE 11] Nos meus projetos de consultoria eu vejo o custo de pular essa etapa: uma vez, um indicador de "tempo médio de processo" parecia ótimo… até o histograma mostrar dois morros — dois fluxos de trabalho completamente diferentes tratados como se fossem um. A média "ótima" não descrevia **nenhum** dos dois. O histograma levou trinta segundos e mudou a conversa inteira.

**[16:30–20:00] — [CÂMERA] Fechamento**

Recapitulando em quatro linhas. Variáveis são qualitativas ou quantitativas — e o teste é "faz sentido tirar média?". O tipo define o que é permitido fazer. A distribuição é o retrato da variável, e o histograma é a câmera. E os três rostos que você já sabe ler: sino, cauda, dois morros — cada um contando uma história diferente.

Sua tarefa de hoje, rapidinha: pensa numa variável do seu trabalho ou da sua vida — tempo de deslocamento, valor de compra no mercado, o que for — e escreve no fórum qual formato você **aposta** que a distribuição dela tem, e por quê. No módulo, você vai poder testar apostas assim com dados de verdade.

Na próxima aula, a gente entra no assunto que mais cai em conversa de trabalho: como resumir dados **sem mentir** — média, mediana, desvio padrão e um gráfico maravilhoso chamado boxplot que resume tudo isso numa caixinha. Te vejo lá. Um abraço!

### c) Estrutura de slides (12 slides)

1. **Capa** — "O formato dos dados: tipos de variáveis e distribuições" · Módulo 2 · Aula 1.
2. **Os dois grandes grupos** — qualitativas (qualidade/categoria: estado, pagamento, time) × quantitativas (quantidade: renda, nota, filhos); teste rápido: "faz sentido tirar média?".
3. **Os quatro subtipos** — árvore: qualitativa → nominal (sem ordem) e ordinal (com ordem, sem distância numérica); quantitativa → discreta (contável) e contínua (qualquer valor no intervalo); 1 exemplo brasileiro por subtipo.
4. **Por que o tipo importa** — tabela: operação × tipos permitidos (contar: todos; média/soma: quantitativas; ordenar: quantitativas + ordinais); alerta: "satisfação média 2,4" = média de rótulos.
5. **Distribuição: o retrato da variável** — bullets: 500 números ninguém lê; pergunta esperta: como os valores se espalham?; onde concentram, até onde vão, o que é raro.
6. **Como nasce um histograma** — 3 passos ilustrados: faixas iguais → contagem por faixa → barras coladas; nota: barras coladas ≠ gráfico de barras de categorias.
7. **Formato 1: simétrica (sino)** — histograma de alturas; bullets: maioria no centro, caudas equilibradas; média ≈ mediana (gancho aula 2.2).
8. **Formato 2: assimétrica (cauda à direita)** — histograma de renda; bullets: maioria à esquerda, minoria estica a cauda; o formato mais comum em dados de negócio; é ele que faz a média enganar.
9. **Formato 3: bimodal (dois morros)** — histograma de notas com 2 morros; bullets: dois grupos misturados; o histograma denuncia estrutura escondida; "não calcule ainda — investigue os grupos".
10. **A forma antes do número** — regra de ouro em destaque; checklist: centro confiável? cauda? dois grupos? valor absurdo?
11. **Caso real** — "a média ótima que não descrevia ninguém": dois fluxos de trabalho misturados; 30 segundos de histograma mudaram a conversa.
12. **Sua tarefa + próxima aula** — aposta de formato no fórum; teaser: "resumindo sem mentir: média, mediana, desvio e o boxplot".

---

## Aula 2.2 — Resumindo sem mentir: centro, dispersão e boxplot

**Tipo:** vídeo · **Duração:** 22min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Calcular** (aplicar) média, mediana e moda de um conjunto pequeno de valores. 2. **Explicar** (compreender) por que a assimetria afasta a média da mediana e qual medida usar em cada situação. 3. **Interpretar** (analisar) o desvio padrão como régua da variação típica. 4. **Ler** (analisar) um boxplot: quartis, mediana, bigodes e outliers. 5. **Julgar** (avaliar) se um outlier deve ser investigado, corrigido ou mantido. |
| **Duração** | 22 min de vídeo |
| **Materiais** | Slides (13); os mesmos dados de exemplo (5 salários) reutilizados ao longo da aula |
| **Sequência didática** | **Abertura (0–1:30):** o salário médio que quase ninguém recebe. **Desenvolvimento (1:30–20:00):** média, mediana e moda com um exemplo de 5 valores → o cabo de guerra da assimetria → qual usar quando → dispersão: duas turmas de média 7 → desvio padrão intuitivo → quartis e percentis → anatomia do boxplot → outliers: investigar antes de excluir. **Fechamento (20:00–22:00):** o kit de bolso dos 7 números, tarefa, teaser da leitura 2.3. |
| **Avaliação** | Formativa: leitura guiada de dois boxplots em tela. Somativa: questões 2, 3 e 4 do quiz. |

### b) Roteiro de gravação

**[0:00–1:30] — [CÂMERA] Abertura**

Oi de novo! Deixa eu abrir com uma provocação. De tempos em tempos sai a notícia: "o rendimento médio do brasileiro é de tantos mil reais". E aí a internet inteira responde a mesma coisa: *"onde? eu não ganho isso, ninguém que eu conheço ganha isso"*. E sabe de uma coisa?… A internet tem razão. O número está certo — e mesmo assim descreve mal a realidade da maioria. Como é que pode?

Hoje você vai entender exatamente como pode — e vai sair desta aula sabendo resumir dados **sem mentir**: escolhendo a medida de centro certa, medindo a variação com o desvio padrão, e lendo o gráfico que eu considero o canivete suíço da estatística descritiva: o boxplot. Bora.

**[1:30–4:30] — [SLIDE 2 → SLIDE 3] Média, mediana e moda em três minutos**

[SLIDE 2] Vamos com um exemplo de bolso: uma empresa pequena com cinco pessoas, salários de 2 mil, 2 mil, 3 mil, 4 mil… e o dono, com 39 mil. A **média** é a divisão do bolo em partes iguais: soma tudo — dá 50 mil — divide por cinco: **10 mil**. A **mediana** é o valor do meio da fila ordenada: 2, 2, **3**, 4, 39 — mediana, **3 mil**. E a **moda** é o valor mais frequente: **2 mil**, que aparece duas vezes.

[SLIDE 3] Olha que coisa: o "salário típico" dessa empresa é 10 mil pela média, 3 mil pela mediana e 2 mil pela moda. Três respostas honestas para a mesma pergunta… e uma diferença de cinco vezes entre elas! Nenhuma conta está errada. O que muda é o que cada medida enxerga: a média é sensível a **todos** os valores — inclusive o salário do dono —, a mediana só olha a **posição** do meio, e a moda só olha a **frequência**.

**[4:30–7:00] — [SLIDE 4] O cabo de guerra da assimetria**

[SLIDE 4] E agora conecta com a aula passada. Lembra da distribuição de renda, com aquela cauda comprida para a direita? Pois é: **a cauda puxa a média**. Cada valor extremo arrasta a média na direção dele — é um cabo de guerra em que o dono da empresa, sozinho, puxa mais que os quatro funcionários juntos. A mediana, não: ela fica plantada no meio da fila, indiferente ao tamanho dos extremos. O dono podia ganhar 39 mil ou 39 milhões — a mediana continuaria 3 mil.

Daí a regra de bolso, que resolve o mistério do salário médio nacional: **em distribuição assimétrica, a média e a mediana se afastam — e a mediana descreve melhor o caso típico**. Cauda para a direita? Média acima da mediana, pode apostar. E o relatório honesto, sempre que a diferença for grande, reporta **as duas** — porque a distância entre elas já é, em si, uma informação: ela denuncia a cauda.

**[7:00–11:00] — [SLIDE 5 → SLIDE 6] Dispersão: o centro não basta**

[SLIDE 5] Só que centro é metade da história. Deixa eu te mostrar com as minhas duas turmas favoritas. Turma A: todo mundo tirou nota entre 6,5 e 7,5 — média 7. Turma B: metade tirou 4,5, metade tirou 9,5 — média… 7 também. Mesmíssima média, turmas completamente diferentes! Na A, o professor pode seguir o plano; na B, tem metade da sala precisando de reforço e metade precisando de desafio. Quem olha só a média trata as duas igual — e erra nas duas.

O que diferencia as turmas é a **dispersão**: o quanto os valores se espalham em volta do centro. [SLIDE 6] A medida mais usada é o **desvio padrão** — e respira, porque a intuição é simples: ele é, aproximadamente, **o tamanho típico do desvio** — quão longe do centro os valores costumam ficar. Turma A: desvios pequenos, desvio padrão na casa de meio ponto. Turma B: desvios enormes, desvio padrão na casa de dois pontos e meio. Cinco vezes mais espalhada — e agora isso é um número, não uma impressão.

Leitura prática: desvio padrão **pequeno** significa dados concentrados — a média representa bem o grupo. Desvio padrão **grande** significa dados espalhados — a média esconde diversidade, vá olhar o histograma. E uma dica de leitura de mundo: quando te disserem uma média, pergunte "e o desvio?". Se a pessoa não souber responder… a média dela vale pouco.

**[11:00–15:00] — [SLIDE 7 → SLIDE 8] Quartis, percentis e a anatomia do boxplot**

[SLIDE 7] Agora deixa eu te apresentar um jeito elegante de descrever a fila inteira: os **quartis**. Ordene os valores e corte a fila em quatro pedaços iguais. O **Q1** é o corte do primeiro quarto: 25% dos valores estão abaixo dele. O **Q2** é a velha conhecida mediana: metade abaixo, metade acima. O **Q3**: 75% abaixo. Generalizando, o **percentil** P-alguma-coisa é o valor abaixo do qual fica aquela porcentagem dos dados — o P90 da nota do ENEM, por exemplo, é a nota que só 10% dos candidatos superam. Se você já recebeu o resultado de um exame de sangue com "percentil", é exatamente essa ideia.

[SLIDE 8] E agora, o gráfico que junta tudo: o **boxplot**. Olha a anatomia dele: uma **caixa** que vai do Q1 ao Q3 — dentro dela mora a metade central dos dados. Um **traço** dentro da caixa: a mediana. Os **bigodes** — as linhas que saem da caixa — mostram até onde os dados "normais" se estendem. E os **pontos soltos** além dos bigodes… são os **outliers**, os valores atipicamente longe do resto. Um boxplot te conta, num relance: onde está o centro, quão espalhada é a metade central, se há assimetria — mediana descentrada na caixa denuncia a cauda — e quem são os pontos fora da curva. É o retrato 3x4 da variável.

E o melhor uso dele: **comparação**. Dois boxplots lado a lado — nota de matemática de escola pública e privada, tempo de entrega da transportadora A e da B — respondem em segundos o que uma tabela de números leva minutos para contar. Na prática deste módulo você vai construir exatamente essa comparação.

**[15:00–18:00] — [SLIDE 9 → SLIDE 10] Outliers: investigar antes de excluir**

[SLIDE 9] Falemos dos pontos soltos, porque existe uma tentação perigosa: "ah, é outlier, joga fora". Calma. Outlier é um **alerta**, não uma sentença. Ele pode ser três coisas. Um: **erro de registro** — a entrega de "350 dias" que era 3,5 dias com a vírgula engolida; corrige-se ou remove-se, documentando. Dois: **caso real e extremo** — o pedido que realmente ficou dois meses preso; esse fica, porque ele É a informação: nos meus projetos de logística, os outliers de prazo são exatamente onde mora o problema a resolver. Três: **outro fenômeno misturado** — uma venda corporativa gigante no meio das vendas de varejo; talvez mereça análise separada.

[SLIDE 10] A conduta profissional, então, em três passos: **investigar** a origem do valor, **decidir** com critério — corrigir, manter ou separar — e **documentar** a decisão. O que não pode é excluir em silêncio porque o número "atrapalhava a média". Isso tem nome, e o nome não é bonito.

**[18:00–20:00] — [SLIDE 11 → SLIDE 12] O kit de bolso: 7 números**

[SLIDE 11] Juntando a aula inteira num kit de bolso. Para descrever qualquer variável quantitativa, sete números bastam: **mínimo, Q1, mediana, Q3, máximo** — os cinco que o boxplot desenha — mais **média e desvio padrão**. [SLIDE 12] E a leitura cruzada é automática: média longe da mediana? Assimetria, cuidado com a cauda. Desvio padrão grande? Espalhamento, a média representa mal. Máximo absurdo? Investigue o outlier antes de qualquer conclusão. Sete números, três diagnósticos — é o exame de sangue completo da variável, e na prática do módulo você vai calculá-los todos com funções de planilha.

**[20:00–22:00] — [CÂMERA] Fechamento**

Fecha comigo em três frases. O centro tem três medidas, e a assimetria decide qual conta a verdade — na dúvida, reporte média **e** mediana. O desvio padrão transforma "espalhado" de impressão em número. E o boxplot é o retrato 3x4 que resume tudo e ainda aponta os suspeitos de sempre, os outliers — que a gente investiga, nunca apaga em silêncio.

Tarefa de hoje: procura uma média que te afete — o preço médio do aluguel no seu bairro, a nota média da sua escola, o que for — e escreve no fórum qual pergunta você faria antes de confiar nela. Dica: você já sabe as duas melhores… "e a mediana?", "e o desvio?".

Na próxima aula, uma leitura saborosa: probabilidade e acaso no dia a dia — por que a previsão de "70% de chuva" confunde tanta gente, o que o risco relativo esconde nas manchetes de saúde, e um checklist de defesa pessoal contra número mal contado. Te vejo lá. Um abraço!

### c) Estrutura de slides (13 slides)

1. **Capa** — "Resumindo sem mentir: centro, dispersão e boxplot" · Módulo 2 · Aula 2.
2. **A empresa de 5 pessoas** — salários 2, 2, 3, 4 e 39 mil; cálculo visual: média 10 mil (bolo em partes iguais), mediana 3 mil (meio da fila), moda 2 mil (mais frequente).
3. **Três respostas honestas** — tabela média × mediana × moda com o que cada uma "enxerga" (todos os valores × posição do meio × frequência); destaque: diferença de 5× entre elas.
4. **O cabo de guerra da assimetria** — ilustração: cauda puxando a média, mediana plantada no meio; regra de bolso: assimétrica → mediana descreve o típico; relatório honesto reporta as duas.
5. **Duas turmas, mesma média** — turma A (todos entre 6,5 e 7,5) × turma B (metade 4,5, metade 9,5), ambas média 7; frase: "quem olha só a média erra nas duas".
6. **Desvio padrão sem fórmula** — definição intuitiva: o tamanho típico do desvio em relação ao centro; A ≈ 0,5 × B ≈ 2,5; leitura: pequeno = média representa; grande = média esconde; pergunta de bolso: "e o desvio?".
7. **Quartis e percentis** — fila ordenada cortada em 4: Q1 (25%), Q2 = mediana (50%), Q3 (75%); generalização: P90 do ENEM = nota que só 10% superam.
8. **Anatomia do boxplot** — diagrama anotado: caixa (Q1–Q3, metade central), traço (mediana), bigodes, pontos (outliers); leitura-relance: centro, espalhamento, assimetria, atípicos.
9. **Outlier: alerta, não sentença** — 3 origens: erro de registro (350 × 3,5 dias); caso real extremo (a informação mora nele); fenômeno misturado (venda corporativa no varejo).
10. **Conduta com outliers** — investigar → decidir (corrigir · manter · separar) → documentar; alerta: excluir em silêncio "porque atrapalhava a média" não é análise.
11. **O kit de bolso** — os 7 números: mín, Q1, mediana, Q3, máx + média e desvio padrão; "o exame de sangue completo da variável".
12. **Leitura cruzada automática** — média ≠ mediana → assimetria; desvio grande → espalhamento; máximo absurdo → investigar outlier.
13. **Tarefa + próxima aula** — "uma média que te afeta + as 2 perguntas"; teaser da leitura: probabilidade, risco relativo e defesa contra número mal contado.

---

## Aula 2.3 — Probabilidade, acaso e leitura crítica de números

**Tipo:** leitura · **Duração:** 45min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Interpretar** (compreender) probabilidades do cotidiano (previsão de chuva, jogos, exames) como grau de incerteza quantificado. 2. **Explicar** (compreender) independência de eventos e a falácia do apostador. 3. **Diferenciar** (analisar) risco relativo de risco absoluto em manchetes de saúde e economia. 4. **Avaliar** (avaliar) afirmações numéricas da mídia com um checklist de 5 perguntas. |
| **Duração** | ~45 min de leitura + atividade caça-manchete |
| **Materiais** | Texto na plataforma (estrutura abaixo); checklist de leitura crítica para download (PDF de 1 página) |
| **Sequência didática** | **Abertura:** por que intuição humana é ruim com acaso. **Desenvolvimento:** probabilidade como grau de incerteza → independência e falácia do apostador → risco relativo × absoluto → porcentagem sobre base pequena → gráficos que distorcem. **Fechamento:** checklist das 5 perguntas + atividade caça-manchete no fórum. |
| **Avaliação** | Formativa: atividade caça-manchete. Somativa: questão 5 do quiz. |

### Estrutura do texto da leitura (para redação na plataforma)

1. **Abertura (2 parágrafos).** Nosso cérebro é uma máquina de achar padrões — tão boa que acha padrão onde só existe acaso. Por isso a probabilidade é a parte da estatística que mais conserta intuição. Nesta leitura, sem fórmulas: só as ideias que blindam suas análises e sua leitura de mundo.
2. **Probabilidade é grau de incerteza (3 parágrafos).** O que significa "70% de chance de chuva" (em 100 dias com condições parecidas, chove em cerca de 70 — e não "vai chover 70% do dia"); a régua de 0 a 1 (ou 0% a 100%); probabilidade não é promessa: o evento de 10% acontece, em média, 1 vez a cada 10 — e o de 90% falha 1 vez a cada 10. Exemplo brasileiro: por que "chance de 90% de acerto" em 27 jogos da rodada ainda erra alguns.
3. **Independência e a falácia do apostador (3 parágrafos).** Moeda que deu cara 5 vezes: a chance da próxima continua 50% — a moeda não tem memória. A falácia do apostador na loteria ("esse número está atrasado") e no dia a dia ("já choveu demais este mês, agora para"). Quando eventos NÃO são independentes (chuva hoje e chuva amanhã se correlacionam) — e por que confundir os dois casos gera análise errada.
4. **Risco relativo × risco absoluto (seção-chave, 4 parágrafos).** A manchete "consumo X aumenta em 50% o risco da doença Y" — parece aterrorizante. Mas 50% **relativo a quê**? Se o risco base é 2 em 1.000, o novo risco é 3 em 1.000: um acréscimo absoluto de 0,1 ponto percentual. A pergunta profissional: "50% de quanto?". Exemplo espelhado em finanças: "fundo rende 80% a mais que a poupança" — 80% de pouco ainda é pouco. Regra da casa: **nunca reporte variação percentual sem o valor absoluto ao lado** — e desconfie de quem reporta.
5. **Porcentagem sobre base pequena e o acaso disfarçado (2 parágrafos).** "Vendas dobraram" (de 2 para 4); "método com 100% de aprovação" (3 alunos). Em bases pequenas, o acaso produz variações enormes — antes de concluir tendência, pergunte o tamanho da base. (Gancho honesto: o curso de Análise de Dados da Academy aprofunda esse tema no contexto de gestão pública.)
6. **Gráficos que distorcem (3 parágrafos + 2 imagens antes/depois).** O eixo Y cortado que transforma diferença de 2% em abismo visual; a escala dupla que fabrica correlação; o gráfico de área/pictograma em que o dobro do valor vira o quádruplo da tinta. Não é para nunca cortar eixo — é para saber **quando o corte informa e quando engana**, e sempre sinalizar.
7. **O checklist de defesa pessoal (seção final).** Antes de acreditar (ou repassar) um número: (1) Qual é a fonte e o tamanho da base? (2) É percentual de quê — qual o valor absoluto? (3) Média ou mediana — e qual a dispersão? (4) O gráfico preserva as proporções? (5) O acaso sozinho explicaria isso? Cinco perguntas, trinta segundos, 90% das ciladas evitadas.
8. **Fechamento + atividade caça-manchete.** "Sua missão: encontre nesta semana UMA manchete com número (saúde, economia, esporte, qualquer área), aplique o checklist e poste no fórum: a manchete, o que o checklist revelou e a sua versão honesta da manchete." Ponte: "Na prática do módulo, você aplica tudo — centro, dispersão, boxplot e olhar crítico — nas notas reais do ENEM."

---

## Aula 2.4 — Estatística na prática com notas do ENEM no Google Sheets

**Tipo:** prática · **Duração:** 90min · **Ferramenta:** Google Sheets

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Calcular** (aplicar) média, mediana, desvio padrão, mínimo, máximo e quartis com funções do Google Sheets. 2. **Construir** (aplicar) um histograma nativo do Sheets e interpretar seu formato. 3. **Comparar** (analisar) grupos (áreas do exame; escola pública × privada) usando os resumos e o formato das distribuições. 4. **Julgar** (avaliar) qual medida de centro descreve melhor cada variável analisada. 5. **Redigir** (criar) três conclusões honestas no padrão "número + contexto + ressalva". |
| **Duração** | ~90 min (setup 10min + trilha guiada 55min + desafio 15min + conclusões 10min) |
| **Materiais** | Planilha modelo no Google Sheets (link na plataforma, botão "Materiais") com a aba `dados` pronta; conta Google |
| **Sequência didática** | **Abertura:** a pergunta da prática + cópia da planilha modelo. **Desenvolvimento:** kit dos 7 números por área → histograma → comparação de grupos. **Fechamento:** desafio (maior distância média–mediana) + 3 conclusões + compartilhamento. |
| **Avaliação** | Critérios de conclusão (checklist abaixo) + envio do link da planilha na plataforma. |

### d) Prática guiada — passo a passo

**Pergunta da prática:** *"Como se distribuem as notas do ENEM — e o que média, mediana, desvio e histograma revelam que a nota de corte esconde?"*

**Dados:** amostra didática de **500 candidatos** na aba `dados` da planilha modelo — valores sintéticos gerados para fins didáticos, **inspirados nos microdados públicos do ENEM (INEP**, gov.br/inep — dados reais, anonimizados e abertos para download**)**. Colunas: `id_candidato`, `uf`, `tipo_escola` (pública/privada), `nota_matematica`, `nota_linguagens`, `nota_ciencias_natureza`, `nota_ciencias_humanas`, `nota_redacao`. Cada linha = um candidato. A última seção da planilha traz o link e o caminho para baixar os microdados oficiais completos.

1. Abra o link da planilha modelo (botão "Materiais" da aula) e clique em **Arquivo → Fazer uma cópia** para ter a sua versão editável no seu Drive.
2. Conheça a aba `dados`: confira a granularidade (cada linha é um candidato) e os tipos de variáveis — classifique mentalmente `uf`, `tipo_escola` e as notas (Aula 2.1!).
3. Vá para a aba `resumo` (já estruturada com os rótulos). Na célula ao lado de "Média — Matemática", digite: `=MÉDIA(dados!D2:D501)` — em contas Google em inglês, `=AVERAGE(dados!D2:D501)`. *Checkpoint: valor entre 500 e 560.*
4. Complete a linha de matemática: mediana `=MED(dados!D2:D501)`, desvio padrão `=DESVPAD(dados!D2:D501)`, mínimo `=MÍNIMO(...)`, máximo `=MÁXIMO(...)`, quartis `=QUARTIL(dados!D2:D501;1)` e `=QUARTIL(dados!D2:D501;3)`. Pronto: o kit dos 7 números da Aula 2.2.
5. Arraste (ou copie) as fórmulas para as colunas das outras quatro áreas, ajustando os intervalos (E, F, G, H). *Checkpoint: a aba `resumo` vira uma tabela 7 números × 5 áreas.*
6. Leia a tabela e anote: qual área tem a **maior média**? Qual tem o **maior desvio padrão** (notas mais espalhadas)? Repare na redação: o que os valores dela têm de diferente? (Dica: notas "redondas" de 20 em 20 — a redação é avaliada por critérios, quase uma variável discreta na prática.)
7. Construa o histograma de matemática: selecione `dados!D2:D501`, menu **Inserir → Gráfico**, e em "Tipo de gráfico" escolha **Histograma**. Dê o título "Distribuição das notas de matemática — amostra de 500 candidatos".
8. Leia o formato (Aula 2.1): é simétrico? Tem cauda para a direita? A média fica acima ou abaixo da mediana — e o histograma explica por quê?
9. Repita o histograma para `nota_redacao` e compare os dois formatos lado a lado. Qual distribui mais "em degraus"? Qual tem cauda?
10. Comparação de grupos: na aba `comparacao` (pré-estruturada), calcule a **mediana** de matemática por tipo de escola com `=MEDIAN(FILTER(dados!D2:D501;dados!C2:C501="pública"))` e o equivalente para "privada" (em português, `MED` + `FILTER`). Calcule também os desvios. O que a diferença de medianas e de desvios sugere? Escreva uma frase honesta — com a ressalva de que a amostra é didática.
11. **Desafio:** usando a aba `resumo`, calcule para cada área a distância `média − mediana` e identifique **qual área tem a maior distância**. Explique em uma frase, usando o vocabulário do módulo (assimetria, cauda), por que essa área se comporta assim.
12. **Conclusões (célula de texto na aba `conclusoes`):** escreva **3 frases** no padrão do curso — número + contexto + ressalva. Exemplo de estrutura: "A mediana de X foi ___, abaixo da média ___, o que indica ___; como a amostra é didática, vale confirmar nos microdados oficiais."
13. Compartilhe: **Compartilhar → Qualquer pessoa com o link → Leitor**, copie o link e envie na atividade da plataforma.

**Critérios de conclusão (checklist do aluno):**

- [ ] A aba `resumo` tem o kit dos 7 números para as 5 áreas do exame.
- [ ] Construí e li os 2 histogramas (matemática e redação) com título honesto.
- [ ] Comparei pública × privada por mediana e desvio, com frase de ressalva.
- [ ] Identifiquei a área com maior distância média–mediana e expliquei com o vocabulário do módulo.
- [ ] Escrevi as 3 conclusões no padrão número + contexto + ressalva e enviei o link da planilha.

**Problemas comuns e socorro rápido:**

- *"#NOME?" na fórmula* → sua conta Google está em inglês: troque `MÉDIA`/`MED`/`DESVPAD`/`MÍNIMO`/`MÁXIMO` por `AVERAGE`/`MEDIAN`/`STDEV`/`MIN`/`MAX`. `QUARTIL` vira `QUARTILE` e o separador `;` pode virar `,`.
- *"A fórmula retorna erro de intervalo"* → confira se o intervalo vai da linha 2 à 501 (a linha 1 é o cabeçalho).
- *"Não encontro o tipo Histograma"* → depois de Inserir → Gráfico, abra o Editor de gráficos → aba Configuração → caixa "Tipo de gráfico" → seção "Outros".
- *"Números com ponto em vez de vírgula (ou vice-versa)"* → verifique **Arquivo → Configurações → Localidade: Brasil**.

---

## Aula 2.5 — Quiz do Módulo 2 — Estatística essencial

**Tipo:** quiz · **Duração:** 15min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos** | Verificar a fixação dos conceitos do módulo (tipos de variáveis, média × mediana em distribuições assimétricas, desvio padrão, boxplot, risco relativo × absoluto). |
| **Formato** | 5 questões objetivas, 3 alternativas, correção automática com explicação; 2 tentativas; nota mínima 70% (compõe a média de quizzes — 50% da nota do curso). |

### Questões (com gabarito)

**Q1.** A variável "nível de escolaridade" (fundamental, médio, superior) é classificada como:
- a) Quantitativa discreta, porque os níveis podem ser numerados como 1, 2 e 3.
- b) Qualitativa ordinal, porque as categorias têm ordem natural, mas a distância entre elas não é numérica. ✅
- c) Qualitativa nominal, porque escolaridade é apenas um rótulo sem ordem.

*Explicação: há ordem clara (fundamental < médio < superior), mas numerar os níveis não os torna quantitativos — o número seria só um apelido, e calcular "escolaridade média 2,4" seria média de rótulos. Categoria com ordem e sem distância numérica é o retrato da variável ordinal.*

**Q2.** Em uma cidade, o salário médio é R$ 4.800 e o salário mediano é R$ 2.100. O que essa diferença revela?
- a) Distribuição assimétrica com cauda à direita: a maioria ganha pouco e uma minoria com salários muito altos puxa a média para cima. ✅
- b) Um erro de cálculo — em qualquer conjunto de dados, média e mediana devem ser iguais.
- c) Que metade dos trabalhadores da cidade ganha exatamente R$ 4.800.

*Explicação: é o cabo de guerra da aula 2.2 — valores extremos arrastam a média, mas a mediana fica plantada no meio da fila. Média bem acima da mediana denuncia a cauda à direita, típica de renda; nesse cenário, a mediana (R$ 2.100) descreve melhor o trabalhador típico, e o relatório honesto reporta as duas.*

**Q3.** Duas turmas têm média 7,0. O desvio padrão da turma A é 0,5 e o da turma B é 2,5. Qual leitura está correta?
- a) As turmas são equivalentes, pois têm a mesma média.
- b) A turma B é mais homogênea, pois desvio padrão maior indica notas mais parecidas.
- c) A turma A é homogênea (notas concentradas perto de 7) e a turma B é heterogênea (notas muito espalhadas) — a mesma média esconde realidades opostas. ✅

*Explicação: o desvio padrão é o tamanho típico do desvio em relação ao centro: 0,5 significa notas coladas na média; 2,5 significa notas espalhadas (como metade 4,5 e metade 9,5). Centro sem dispersão é metade da história — quem olha só a média trata as duas turmas igual e erra nas duas.*

**Q4.** Em um boxplot, o traço no interior da caixa e os limites da caixa representam, respectivamente:
- a) A mediana; o primeiro quartil (Q1) e o terceiro quartil (Q3) — a caixa contém a metade central dos dados. ✅
- b) A média; o valor mínimo e o valor máximo do conjunto de dados.
- c) A moda; o desvio padrão para baixo e para cima da média.

*Explicação: a anatomia do boxplot — caixa de Q1 a Q3 (50% central dos dados), traço na mediana, bigodes para a faixa típica e pontos soltos para os outliers. Média, moda e desvio padrão não aparecem no boxplot padrão; mínimo e máximo, quando não são outliers, ficam nas pontas dos bigodes, não na caixa.*

**Q5.** Uma manchete diz: "novo hábito aumenta em 50% o risco da doença X". Sabendo que o risco base é de 2 casos em 1.000 pessoas, qual é a leitura estatisticamente honesta?
- a) Metade das pessoas com o hábito desenvolverá a doença X.
- b) O risco passa de 2 para 3 casos em 1.000 — um acréscimo absoluto de 1 caso por mil, bem menos alarmante do que "50%" sugere. ✅
- c) A manchete está necessariamente errada, pois risco não pode ser expresso em porcentagem.

*Explicação: 50% é o risco RELATIVO — 50% a mais sobre uma base pequena (2‰ → 3‰). A pergunta de defesa pessoal é sempre "50% de quanto?": sem o valor absoluto ao lado, a variação percentual assusta mais do que informa. A manchete não é matematicamente errada — é incompleta, o que às vezes é pior.*
