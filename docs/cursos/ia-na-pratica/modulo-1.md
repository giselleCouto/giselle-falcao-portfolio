# Módulo 1 — Fundamentos de IA aplicada: do hype à prática

**Curso:** IA na Prática: Do Conceito ao Deploy — Giselle Falcão Academy
**Carga do módulo:** 5h | **Status:** módulo completo (amostra gratuita do curso)

**Objetivo geral do módulo:** situar o aluno no campo da IA aplicada, dar vocabulário preciso (IA, ML, IA generativa, tarefas de ML), ensinar a enquadrar problemas de negócio como problemas de ML e colocar a mão na massa no Google Colab logo na primeira semana.

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 1.1 | IA na prática: o que é, o que não é e onde ela gera valor | vídeo | 20min |
| 1.2 | Do problema de negócio ao problema de ML | vídeo | 15min |
| 1.3 | O ciclo de vida de um projeto de IA: do CRISP-DM ao MLOps | leitura | 45min |
| 1.4 | Seu primeiro notebook: explorando dados reais de e-commerce e logística | prática (Colab) | 2h |
| 1.5 | Quiz de fixação: fundamentos | quiz | 30min |

---

# AULA 1.1 — IA na prática: o que é, o que não é e onde ela gera valor (vídeo, 20min)

## a) Plano de aula

**Objetivos de aprendizagem (Bloom):**

- **Definir** IA, machine learning e IA generativa, distinguindo a relação entre os três conceitos. (Lembrar/Compreender)
- **Identificar** os quatro grandes tipos de valor que a IA entrega hoje: prever, classificar, otimizar e gerar. (Compreender)
- **Diferenciar** casos de uso viáveis de promessas de hype, usando três critérios objetivos (dado disponível, decisão recorrente, custo do erro tolerável). (Analisar)

**Duração:** 20 minutos de vídeo + 5 minutos de reflexão no fórum.

**Materiais:**
- Slides (estrutura abaixo, 12 slides, template do curso em roxo/lavanda/teal).
- Pergunta disparadora publicada no fórum da plataforma: "Qual decisão recorrente da sua empresa você gostaria que fosse mais inteligente?"

**Sequência didática:**
- **Abertura (0–3min30):** boas-vindas, quem é a Giselle, contrato didático do curso (prática desde a semana 1, ferramentas gratuitas, projeto final).
- **Desenvolvimento (3min30–16min30):** mapa conceitual IA ⊃ ML ⊃ deep learning + IA generativa; os 4 tipos de valor; três cenários brasileiros (agro, indústria, logística); os 3 filtros anti-hype.
- **Fechamento (16min30–20min):** fio condutor do curso, o que vem na próxima aula, chamada para a pergunta do fórum.

**Avaliação:** participação na pergunta do fórum (formativa) + questões 1 e 5 do quiz do módulo (somativa).

## b) Roteiro de gravação

> Instruções de gravação: fundo neutro, enquadramento busto, luz frontal. Alternar entre [ROSTO NA CÂMERA] e [SLIDE N]. Ler no teleprompter com pausas naturais; onde estiver "(pausa)", respirar e sorrir. Duração alvo: 20 minutos.

**[0:00–1:30] — ROSTO NA CÂMERA — Boas-vindas**

Oi, seja muito bem-vindo, seja muito bem-vinda ao IA na Prática. Eu sou a Giselle Falcão, sou doutora e trabalho como consultora de inteligência artificial para empresas de indústria, agronegócio e logística. E eu queria começar te dizendo uma coisa: se você chegou até aqui achando que IA é um bicho de sete cabeças, reservado para gênios da matemática... esse curso existe exatamente para desmontar essa ideia. (pausa)

Eu passo os meus dias entrando em fábrica, em fazenda, em centro de distribuição. E o que eu vejo direto nos meus projetos de consultoria é isso: as empresas que mais ganham com IA não são as que têm a tecnologia mais sofisticada. São as que sabem fazer a pergunta certa para os dados que já têm. E fazer a pergunta certa — isso se aprende. É o que a gente vai fazer juntos nas próximas 40 horas.

**[1:30–3:30] — SLIDE 2 — O combinado do curso**

Antes do conteúdo, o nosso combinado. Esse curso tem três regras. Primeira: prática desde a primeira semana — ainda neste módulo você vai abrir o Google Colab e analisar dados reais de e-commerce brasileiro. Segunda: tudo em ferramentas gratuitas, direto do navegador. Você não vai instalar absolutamente nada, não vai precisar de máquina potente, não vai cadastrar cartão de crédito. Terceira: todo conceito vem amarrado a uma decisão de negócio. Se eu não conseguir te explicar para que serve, eu corto da aula. (pausa) Combinado? Então vamos ao mapa.

**[3:30–6:00] — SLIDES 3 e 4 — O mapa: IA, ML e IA generativa**

Vamos organizar a casa, porque esses termos viraram sopa de letrinhas. [SLIDE 3] Inteligência artificial é o guarda-chuva: qualquer técnica que faça o computador executar tarefas que exigiriam inteligência humana. Dentro dela mora o machine learning, o aprendizado de máquina — e aqui está a virada de chave conceitual mais importante do curso inteiro, então olha para isso comigo: no software tradicional, um humano escreve as regras. Se o pedido pesa mais que tanto, cobra tanto de frete. No machine learning, a gente inverte: mostramos exemplos — milhares de pedidos com seus fretes reais — e o algoritmo descobre as regras sozinho. A lógica é aprendida dos dados, não programada à mão.

[SLIDE 4] Dentro do machine learning tem o deep learning, as redes neurais profundas, que brilham com imagem, áudio e texto. E a IA generativa — o ChatGPT, o Claude, o Gemini da vida — é uma aplicação de deep learning treinada para gerar conteúdo novo. Ela conversa bem, e por isso ganhou os holofotes. Mas presta atenção: a maior parte do valor de IA nas empresas brasileiras hoje ainda vem do machine learning "clássico", o preditivo. E é por ele que a gente começa.

**[6:00–8:00] — SLIDE 5 — Os quatro tipos de valor**

Toda aplicação de IA que gera dinheiro cai em uma destas quatro famílias. Um: **prever** um número — quanto vou vender, quando essa máquina vai falhar, qual o tempo dessa entrega. Dois: **classificar** — esse cliente vai cancelar ou não? Essa peça está conforme ou defeituosa? Três: **otimizar** — qual a melhor rota, a melhor alocação de estoque, a melhor programação de produção. Quatro: **gerar** — resumir relatórios, redigir respostas, criar documentação. (pausa) Guarda essa taxonomia, porque quando alguém te trouxer "uma ideia de IA", sua primeira pergunta vai ser: isso é prever, classificar, otimizar ou gerar?

**[8:00–12:00] — SLIDES 6, 7 e 8 — Três cenários brasileiros**

Agora deixa eu trazer isso para o chão que eu conheço. [SLIDE 6] **Agro:** numa fazenda leiteira, sensores e dados de ordenha permitem detectar precocemente problemas de saúde do rebanho — como a mastite, que é uma das maiores fontes de prejuízo da pecuária leiteira. Detectar um caso dias antes do sintoma visível muda o custo do tratamento e protege a produção. Isso é classificação: animal em risco, sim ou não.

[SLIDE 7] **Indústria:** manutenção preditiva. Em vez de trocar peça por calendário — ou pior, depois que quebrou — o modelo aprende com vibração, temperatura e histórico de falhas a estimar quando o equipamento vai precisar de intervenção. Eu vejo isso direto nos meus projetos: parada não programada é dos custos mais dolorosos de uma planta.

[SLIDE 8] **Logística:** previsão de atraso de entrega. Com o histórico de pedidos — origem, destino, transportadora, época do ano — dá para estimar a probabilidade de cada entrega estourar o prazo e agir antes: reprogramar, avisar o cliente, trocar o modal. Esse exemplo não é decorativo: o dataset real que você vai usar na prática deste módulo, com mais de cem mil pedidos de e-commerce brasileiro, é exatamente desse mundo. E no módulo 3 você vai construir esse modelo com as suas mãos.

**[12:00–15:00] — SLIDES 9 e 10 — O que a IA não é**

Agora o outro lado da moeda, porque eu prometi rigor. [SLIDE 9] IA não é mágica, e três mitos derrubam projetos todos os dias. Mito um: "IA funciona sem dados". Não funciona. Modelo aprende de exemplo; sem histórico organizado, não há o que aprender. Mito dois: "é só treinar uma vez". O mundo muda — muda o clima, o consumo, a linha de produção — e o modelo degrada em silêncio. Modelo em produção é planta viva: precisa de rega e poda, que no nosso vocabulário se chamam monitoramento e retreino. Mito três: "quanto mais complexo o modelo, melhor". Na prática é quase o contrário: o modelo simples que o time entende e mantém vale mais que o modelo genial que ninguém consegue operar.

[SLIDE 10] E aqui vai o meu filtro anti-hype, três perguntas que eu faço em toda reunião de diagnóstico. Existe **dado histórico** suficiente e acessível? A decisão é **recorrente** — acontece dezenas, centenas de vezes por semana? E o **custo do erro** é tolerável — ou seja, errar às vezes não gera catástrofe? Se as três respostas forem sim, temos um caso de IA promissor. Se alguma for não, desconfie. (pausa) Anota essas três perguntas. Elas valem uma consultoria.

**[15:00–17:00] — SLIDE 11 — O caminho do curso**

E como esse curso te leva até lá? [SLIDE 11] A nossa trilha é o subtítulo do curso: do conceito ao deploy. Módulo 1, fundamentos e enquadramento. Módulo 2, dados — coleta, limpeza, exploração. Módulo 3, construção de modelos. Módulo 4, avaliação honesta e comunicação de resultados. Módulo 5, IA generativa no fluxo de trabalho. Módulo 6, deploy e monitoramento. E o módulo 7 é o seu projeto final: um modelo seu, publicado, funcionando num link que você vai poder mandar para qualquer pessoa. Esse link no seu portfólio vale mais que dez certificados.

**[17:00–18:30] — SLIDE 12 — Próximos passos**

Seus próximos passos são três. Um: responde a pergunta que está no fórum — qual decisão recorrente da sua empresa você gostaria que fosse mais inteligente? Escreve em uma frase, sem tecniquês. Dois: garante que você tem uma conta Google, porque a prática deste módulo usa o Colab. Três: me encontra na próxima aula, que é curtinha e é talvez a habilidade mais valiosa deste curso — transformar problema de negócio em problema de machine learning.

**[18:30–20:00] — ROSTO NA CÂMERA — Fechamento**

Se você chegou até aqui, deixa eu te dizer o que eu digo para todo cliente no primeiro dia de projeto: você não precisa virar cientista de dados de laboratório para gerar valor com IA. Precisa entender o processo, respeitar os dados e fechar o ciclo — do conceito ao deploy. É exatamente isso que a gente vai fazer juntos. (pausa) Te vejo na aula 2. Até já!

## c) Estrutura de slides (12 slides)

1. **Capa** — IA na Prática: Do Conceito ao Deploy | Módulo 1, Aula 1 | "IA na prática: o que é, o que não é e onde ela gera valor" | logo da Academy (fundo roxo profundo).
2. **O combinado do curso** — Prática desde a semana 1 | 100% ferramentas gratuitas de navegador | Todo conceito amarrado a uma decisão de negócio.
3. **O mapa (parte 1)** — Diagrama de círculos concêntricos: IA ⊃ Machine Learning | Software tradicional: humano escreve as regras | ML: o algoritmo aprende as regras a partir de exemplos.
4. **O mapa (parte 2)** — ML ⊃ Deep Learning | IA generativa: gera conteúdo novo (texto, imagem, código) | Holofote ≠ maior fonte de valor: o preditivo ainda domina nas empresas.
5. **Os 4 tipos de valor** — Prever (número) | Classificar (categoria) | Otimizar (melhor escolha) | Gerar (conteúdo novo) — 4 cards em teal com um exemplo de uma linha cada.
6. **Cenário agro** — Detecção precoce de doença no rebanho leiteiro (ex.: mastite) | Dados de ordenha + sensores | Tarefa: classificação (animal em risco: sim/não) | Valor: tratamento precoce, menos perda de produção.
7. **Cenário indústria** — Manutenção preditiva | Vibração, temperatura, histórico de falhas | Tarefa: prever tempo até a falha | Valor: menos parada não programada.
8. **Cenário logística** — Previsão de atraso de entrega | Histórico de pedidos (origem, destino, transportadora, sazonalidade) | Tarefa: classificação (vai atrasar?) | "Este é o dataset que você vai usar neste curso".
9. **3 mitos que derrubam projetos** — "IA funciona sem dados" | "É só treinar uma vez" | "Quanto mais complexo, melhor" — cada um com um X em roxo.
10. **O filtro anti-hype (3 perguntas)** — Existe dado histórico acessível? | A decisão é recorrente? | O custo do erro é tolerável? — checklist em teal.
11. **A trilha do curso** — Linha do tempo horizontal com os 7 módulos: Fundamentos → Dados → Modelos → Avaliação → IA generativa → Deploy → Projeto final.
12. **Próximos passos** — Responda a pergunta do fórum | Tenha uma conta Google pronta | Aula 1.2: do problema de negócio ao problema de ML.

---

# AULA 1.2 — Do problema de negócio ao problema de ML (vídeo, 15min)

## a) Plano de aula

**Objetivos de aprendizagem (Bloom):**

- **Classificar** problemas reais nos tipos de tarefa de ML: regressão, classificação, clusterização e geração. (Compreender/Aplicar)
- **Formular** um enunciado de problema de ML no formato entrada → saída → métrica de sucesso. (Aplicar)
- **Avaliar** a viabilidade de um caso de uso usando o Canvas do Problema de IA (decisão, dado, baseline, custo do erro). (Avaliar)

**Duração:** 15 minutos de vídeo + 15 minutos de exercício assíncrono (preencher o canvas).

**Materiais:**
- Slides (10 slides).
- Template "Canvas do Problema de IA" disponível para cópia como Google Docs/Sheets na plataforma.

**Sequência didática:**
- **Abertura (0–1min30):** retomada da aula anterior; por que o enquadramento é a habilidade número 1.
- **Desenvolvimento (1min30–12min):** os 4 tipos de tarefa com exemplos; o formato entrada→saída→métrica; o conceito de baseline; o Canvas do Problema de IA preenchido ao vivo com o caso de atraso de entrega.
- **Fechamento (12min–15min):** tarefa (preencher o canvas com um problema da própria empresa) e ponte para a leitura 1.3.

**Avaliação:** canvas preenchido pelo aluno (entrega opcional comentada no fórum) + questões 2 e 3 do quiz do módulo.

## b) Roteiro de gravação

**[0:00–1:30] — ROSTO NA CÂMERA — Abertura**

Bem-vindo de volta! Na aula passada eu te dei o mapa da IA. Hoje eu te entrego a ferramenta que eu mais uso na minha vida de consultora — e olha que eu uso ferramenta sofisticada, viu? Mas nenhuma delas paga as contas como essa: a habilidade de pegar um problema de negócio, dito em português corrente, e traduzir para um problema de machine learning bem formulado. (pausa) Eu vejo isso direto nos meus projetos: quando um projeto de IA fracassa, em geral ele não fracassa no algoritmo. Ele fracassa aqui, na tradução. Então essa aula é curta, mas presta atenção nela como se fosse a mais importante do curso. Porque talvez seja.

**[1:30–4:30] — SLIDES 2 e 3 — Os quatro tipos de tarefa**

[SLIDE 2] Machine learning resolve pouquíssimos tipos de problema — e isso é uma ótima notícia. Se a resposta que você quer é **um número** — quantos pedidos amanhã, quantos litros de leite, quantos dias até a falha — isso é **regressão**. Se a resposta é **uma categoria** — atrasa ou não atrasa, conforme ou defeituoso, cancela ou renova — isso é **classificação**. Duas categorias? Classificação binária. Mais de duas? Multiclasse.

[SLIDE 3] Se você **não tem** uma resposta certa nos dados e quer descobrir grupos naturais — segmentar clientes, agrupar padrões de consumo de energia — isso é **clusterização**, o aprendizado não supervisionado. E se a saída é **conteúdo** — um resumo, um e-mail, um trecho de código — aí é o território da **IA generativa**. Quatro caixinhas. Noventa por cento dos casos de uso que chegam na minha mesa cabem nas duas primeiras.

**[4:30–7:00] — SLIDE 4 — O formato entrada → saída → métrica**

Agora o formato que transforma conversa em especificação. Todo problema de ML bem formulado cabe numa frase assim: [SLIDE 4] "Dado **[entrada]**, prever **[saída]**, com sucesso medido por **[métrica]**". Olha a mágica acontecendo: "a gente queria melhorar a experiência de entrega" — isso é um desejo, não é um problema de ML. Agora: "dado o histórico do pedido — origem, destino, transportadora, data da compra — prever se a entrega vai estourar o prazo prometido, com sucesso medido pela proporção de atrasos que conseguimos antecipar" — isso é um problema de ML. Sente a diferença? Um tem verbo mensurável, o outro tem esperança. (pausa)

**[7:00–9:00] — SLIDE 5 — Baseline: o concorrente invisível**

E aqui entra um conceito que separa amador de profissional: **baseline**. Antes de treinar qualquer modelo, pergunta: como essa decisão é tomada hoje? Porque o seu modelo não compete com a perfeição — compete com o método atual. Se hoje o analista acerta 70% das previsões de atraso "no olho", um modelo com 72% mal justifica o custo. Se hoje ninguém prevê nada, qualquer sinal já é valor. [SLIDE 5] Baseline é o chão. Sem ele, você não sabe se o modelo está de pé ou enterrado.

**[9:00–12:00] — SLIDES 6, 7 e 8 — O Canvas do Problema de IA**

Para juntar tudo isso, eu uso com meus clientes uma folha única que aqui no curso a gente chama de Canvas do Problema de IA. [SLIDE 6] Seis campos: a **decisão** que queremos melhorar; a **tarefa de ML** (das quatro caixinhas); a **entrada** disponível; a **saída** do modelo; a **métrica de sucesso** — técnica e de negócio; e o **custo do erro** — o que acontece num falso alarme, e o que acontece quando o modelo deixa passar.

[SLIDE 7] Vamos preencher juntos com o nosso caso de logística. Decisão: priorizar ações preventivas nos pedidos com risco de atraso. Tarefa: classificação binária. Entrada: dados do pedido no momento da compra. Saída: probabilidade de atraso. Métrica: capturar ao menos uma boa parte dos atrasos reais sem afogar a operação em falsos alarmes — no módulo 4 a gente dá nome técnico a isso, recall e precisão. Custo do erro: falso alarme gera uma ação preventiva desnecessária, barata; atraso não detectado gera cliente furioso, caro. [SLIDE 8] Percebe que essa última linha muda tudo? Quando os custos dos erros são assimétricos, o modelo deve ser calibrado para errar para o lado mais barato. Isso é decisão de negócio, não de algoritmo — e é você quem vai saber tomá-la.

**[12:00–13:30] — SLIDE 9 — Sua tarefa**

Sua tarefa desta aula: pega aquela decisão que você escreveu no fórum na aula passada e preenche o canvas com ela. O template está na plataforma, é uma cópia de Google Docs, quinze minutinhos. Se travar em algum campo, ótimo — travar no canvas custa quinze minutos; travar com o modelo pronto custa três meses. (pausa) Posta no fórum que eu e os colegas comentamos.

**[13:30–15:00] — ROSTO NA CÂMERA + SLIDE 10 — Fechamento**

Recapitulando em três frases. Todo problema de ML é prever número, prever categoria, achar grupos ou gerar conteúdo. Todo enunciado decente tem entrada, saída e métrica. E todo modelo compete com o baseline, nunca com a perfeição. [SLIDE 10] Na próxima aula — uma leitura — você vai ver o mapa completo da estrada: o ciclo de vida de um projeto de IA, da concepção ao pós-deploy. É o esqueleto do curso inteiro. Boa leitura e até lá!

## c) Estrutura de slides (10 slides)

1. **Capa** — Aula 1.2 | Do problema de negócio ao problema de ML.
2. **As 4 caixinhas (1/2)** — Regressão: a resposta é um número | Classificação: a resposta é uma categoria (binária ou multiclasse) | Exemplos de indústria e logística em cada card.
3. **As 4 caixinhas (2/2)** — Clusterização: descobrir grupos sem gabarito | Geração: a saída é conteúdo novo | "90% dos casos reais: regressão ou classificação".
4. **A frase mágica** — "Dado [ENTRADA], prever [SAÍDA], com sucesso medido por [MÉTRICA]" | Antes: "melhorar a experiência de entrega" | Depois: enunciado completo do caso de atraso.
5. **Baseline** — "Como essa decisão é tomada hoje?" | O modelo compete com o método atual, não com a perfeição | Exemplo numérico: analista 70% vs. modelo 72%.
6. **Canvas do Problema de IA (vazio)** — 6 campos: Decisão | Tarefa de ML | Entrada | Saída | Métrica de sucesso | Custo do erro.
7. **Canvas preenchido — caso logística** — os 6 campos preenchidos com o caso de previsão de atraso de entrega.
8. **Custo do erro assimétrico** — Falso alarme: ação preventiva desnecessária (barato) | Atraso não detectado: cliente perdido (caro) | "Calibre o modelo para errar para o lado mais barato".
9. **Sua tarefa** — Copie o template do canvas | Preencha com um problema da sua empresa | Poste no fórum (15min).
10. **Próxima aula** — Leitura 1.3: o ciclo de vida de um projeto de IA, do CRISP-DM ao MLOps.

---

# AULA 1.3 — O ciclo de vida de um projeto de IA: do CRISP-DM ao MLOps (leitura, 45min)

## a) Plano de aula

**Objetivos de aprendizagem (Bloom):**

- **Descrever** as seis fases do ciclo de vida de um projeto de IA e o que cada uma entrega. (Compreender)
- **Explicar** por que a preparação de dados costuma consumir a maior parte do tempo do projeto. (Compreender)
- **Relacionar** o ciclo clássico (CRISP-DM) às práticas modernas de MLOps: versionamento, monitoramento, retreino. (Analisar)

**Duração:** 45 minutos de leitura ativa (texto de ~2.500 palavras com diagramas).

**Materiais:** texto na plataforma com 2 diagramas (ciclo CRISP-DM adaptado; loop de MLOps) e um checklist para download.

**Sequência didática (estrutura do texto a ser publicado):**

1. **Abertura (5min de leitura)** — Cena real: por que "o modelo pronto" é a metade fácil do projeto. A analogia da planta viva: modelo sem manutenção degrada em silêncio.
2. **O ciclo em seis fases (20min)** — Baseado no CRISP-DM, o framework de mercado mais usado desde os anos 1990 e ainda a espinha dorsal dos projetos modernos:
   - *Entendimento do negócio* — o canvas da aula 1.2 vive aqui; definição de baseline e critério de sucesso.
   - *Entendimento dos dados* — inventário de fontes, qualidade, vieses; a prática 1.4 vive aqui.
   - *Preparação dos dados* — limpeza, integração, features; a fase que consome tipicamente 60–80% do tempo, e por quê (dados nascem para operar o negócio, não para treinar modelos).
   - *Modelagem* — escolha e treino de algoritmos (módulo 3).
   - *Avaliação* — validação honesta contra o baseline e as métricas de negócio (módulo 4).
   - *Implantação (deploy)* — o modelo vira produto: API, app, rotina agendada (módulo 6).
3. **O que o CRISP-DM não contava: MLOps (12min)** — O ciclo não termina no deploy; ele recomeça. Conceitos apresentados em nível de intuição: monitoramento de desempenho, *data drift* (o mundo muda e os dados de produção se afastam dos de treino), retreino programado, versionamento de dados e modelos, e o princípio 2026 de "comece enxuto": um modelo simples monitorado vale mais que um sofisticado abandonado. Menção honesta às ferramentas que o mercado usa (MLflow, pipelines gerenciados em nuvem) com o aviso de que neste curso o aluno implementará a versão enxuta e gratuita desse ciclo.
4. **Papéis no projeto (5min)** — Quem faz o quê: pessoa de negócio, engenharia de dados, ciência de dados, engenharia de ML — e por que em times brasileiros pequenos uma mesma pessoa acumula chapéus (provavelmente o aluno).
5. **Fechamento + checklist (3min)** — Checklist de 12 perguntas "meu projeto está saudável?" para download, organizado por fase.

**Avaliação:** questão 4 do quiz do módulo; autoavaliação com o checklist.

**Observação de produção:** o texto deve ser escrito no mesmo tom conversacional dos vídeos, com os dois diagramas seguindo a paleta (fases em roxo, setas de realimentação em teal).

---

# AULA 1.4 — Seu primeiro notebook: explorando dados reais de e-commerce e logística (prática, 2h)

## a) Plano de aula

**Objetivos de aprendizagem (Bloom):**

- **Operar** o ambiente Google Colab: criar notebook, executar células, subir arquivos. (Aplicar)
- **Executar** uma análise exploratória básica com pandas: carregar CSV, inspecionar tipos, tratar datas, calcular colunas derivadas. (Aplicar)
- **Interpretar** estatísticas descritivas e um histograma para responder perguntas de negócio sobre prazos de entrega. (Analisar)

**Duração:** 2 horas (guiadas; o aluno executa no próprio ritmo).

**Materiais:**
- Ferramenta: **Google Colab** — https://colab.research.google.com (gratuito, só precisa de conta Google).
- Dataset: **Brazilian E-Commerce Public Dataset (Olist)** — dados reais e anonimizados de ~100 mil pedidos de e-commerce brasileiro (2016–2018), publicados no Kaggle: https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce (licença CC BY-NC-SA 4.0; download gratuito com conta Kaggle).
- Notebook-gabarito da instrutora (link na plataforma) para consulta em caso de bloqueio.

**Sequência didática:** contextualização do dataset (10min) → setup do Colab (15min) → exploração guiada em 10 passos (75min) → perguntas de conclusão e entrega (20min).

**Avaliação:** entrega do link do notebook com as 4 perguntas de negócio respondidas (critérios abaixo).

## d) Prática guiada — passo a passo

**Contexto:** você é a pessoa de dados de uma operação de e-commerce. A diretoria quer entender os prazos de entrega antes de investir num modelo preditivo de atrasos (que você construirá no módulo 3). Sua missão hoje: conhecer os dados e responder quatro perguntas de negócio.

**Passo a passo:**

1. **Crie sua conta e o notebook.** Acesse https://colab.research.google.com com sua conta Google e clique em "Novo notebook". Renomeie para `M1-exploracao-olist-SEUNOME`.
2. **Baixe o dataset.** Acesse https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce (crie uma conta Kaggle gratuita se necessário) e clique em Download. Do arquivo .zip, extraia apenas dois arquivos: `olist_orders_dataset.csv` (pedidos) e `olist_customers_dataset.csv` (clientes, com o estado de cada um).
3. **Suba os arquivos para o Colab.** No painel esquerdo, clique no ícone de pasta e depois no ícone de upload. Envie os dois CSVs. (Atenção: os arquivos somem quando a sessão encerra — guarde-os no seu computador.)
4. **Carregue os pedidos com pandas.** Na primeira célula, digite e execute (Shift+Enter):
   ```python
   import pandas as pd
   pedidos = pd.read_csv("olist_orders_dataset.csv")
   pedidos.head()
   ```
   Você deve ver uma tabela com colunas como `order_id`, `order_status`, `order_purchase_timestamp` e `order_delivered_customer_date`.
5. **Inspecione a estrutura.** Execute `pedidos.info()` e `pedidos.shape`. Anote em uma célula de texto: quantos pedidos existem? Quais colunas têm valores ausentes, e por que isso faz sentido? (Dica: pedidos cancelados nunca foram entregues.)
6. **Converta as datas.** As colunas de data chegam como texto. Converta as três principais:
   ```python
   for col in ["order_purchase_timestamp", "order_delivered_customer_date", "order_estimated_delivery_date"]:
       pedidos[col] = pd.to_datetime(pedidos[col])
   ```
7. **Crie as colunas de negócio.** Calcule o tempo real de entrega e o desvio contra a promessa:
   ```python
   entregues = pedidos[pedidos["order_status"] == "delivered"].copy()
   entregues["dias_entrega"] = (entregues["order_delivered_customer_date"] - entregues["order_purchase_timestamp"]).dt.days
   entregues["atrasou"] = entregues["order_delivered_customer_date"] > entregues["order_estimated_delivery_date"]
   ```
8. **Explore os números.** Execute `entregues["dias_entrega"].describe()` e `entregues["atrasou"].mean()`. Interprete: qual a mediana de dias até a entrega? Que fração dos pedidos entregues estourou o prazo prometido?
9. **Visualize.** Faça seu primeiro gráfico:
   ```python
   entregues["dias_entrega"].plot(kind="hist", bins=50, title="Distribuição do tempo de entrega (dias)")
   ```
   Observe a cauda longa à direita — são as entregas problemáticas que um modelo preditivo tentará antecipar.
10. **Cruze com a geografia (desafio).** Carregue `olist_customers_dataset.csv`, junte com os pedidos via `merge` na coluna `customer_id` e calcule a taxa de atraso por estado (`groupby("customer_state")["atrasou"].mean()`). Ordene do pior para o melhor.

**Perguntas de negócio a responder (em células de texto no notebook):**

- P1. Quantos pedidos há na base e qual o período coberto?
- P2. Qual a mediana e o percentil 90 do tempo de entrega em dias?
- P3. Qual o percentual de pedidos entregues com atraso sobre a data prometida?
- P4. Quais os 3 estados com maior taxa de atraso? Levante uma hipótese (uma frase) do porquê.

**Critérios de conclusão:**

- [ ] Notebook executa do início ao fim sem erro (Ambiente de execução → Reiniciar e executar tudo).
- [ ] As 4 perguntas respondidas em células de texto, com os números encontrados.
- [ ] Pelo menos 1 gráfico gerado.
- [ ] Link de compartilhamento do notebook ("Qualquer pessoa com o link — Leitor") enviado na plataforma.

**Se travar:** consulte o notebook-gabarito na plataforma, mas só depois de tentar; e use o fórum da turma — descrever o próprio erro já resolve metade dele.

---

# AULA 1.5 — Quiz de fixação: fundamentos (quiz, 30min)

## a) Plano de aula

**Objetivos:** verificar a compreensão dos conceitos-chave do módulo (ML vs. regras, tipos de tarefa, enquadramento, ciclo de vida, produção). Nota mínima 70%, tentativas ilimitadas (vale a maior), feedback explicativo em toda alternativa.

**Formato:** 5 questões de múltipla escolha, 3 alternativas cada, ordem embaralhada pela plataforma.

## Questões (com gabarito e explicação)

**Q1. Qual é a diferença fundamental entre um sistema de regras tradicional e um modelo de machine learning?**

- a) O sistema de regras é sempre mais barato de manter do que um modelo de ML.
- b) **No ML, a lógica é aprendida a partir de exemplos (dados históricos), em vez de ser programada manualmente regra por regra.** ✔
- c) Modelos de ML não precisam de manutenção depois de treinados.

*Explicação:* essa é a virada de chave da aula 1.1: no software tradicional o humano escreve as regras; no ML o algoritmo as aprende dos dados. Os custos de manutenção variam caso a caso (a), e modelos exigem monitoramento e retreino contínuos (c).

**Q2. Uma transportadora quer prever SE cada entrega vai estourar o prazo (sim ou não). Que tipo de tarefa de ML é essa?**

- a) **Classificação binária.** ✔
- b) Regressão.
- c) Clusterização.

*Explicação:* a resposta desejada é uma categoria entre duas possíveis (atrasa/não atrasa) — classificação binária. Seria regressão se a pergunta fosse "quantos dias vai levar"; clusterização não usa gabarito e serve para descobrir grupos.

**Q3. Ao enquadrar um problema de negócio como problema de ML, qual é a primeira pergunta a fazer?**

- a) Qual é o algoritmo mais moderno disponível para usar?
- b) Quantas GPUs serão necessárias para o treinamento?
- c) **Qual decisão do negócio será melhorada e como ela é tomada hoje (baseline)?** ✔

*Explicação:* o canvas da aula 1.2 começa pela decisão e pelo baseline — o modelo compete com o método atual, não com a perfeição. Algoritmo e infraestrutura são consequências do enquadramento, nunca o ponto de partida.

**Q4. Na prática, qual etapa do ciclo de vida de um projeto de IA costuma consumir a maior parte do tempo da equipe?**

- a) **Preparação e limpeza dos dados.** ✔
- b) A escolha do algoritmo de machine learning.
- c) A gravação da apresentação final de resultados.

*Explicação:* como visto na leitura 1.3, a preparação de dados consome tipicamente 60–80% do tempo, porque os dados nascem para operar o negócio, não para treinar modelos. A escolha do algoritmo é uma fração pequena do esforço total.

**Q5. Por que um modelo com ótimo desempenho no notebook pode fracassar meses depois, em produção?**

- a) Porque notebooks do Colab corrompem os modelos ao salvar.
- b) **Porque o mundo muda: os dados de produção se afastam dos dados de treino (drift) e, sem monitoramento, o desempenho degrada em silêncio.** ✔
- c) Porque modelos só funcionam no ambiente onde foram treinados e nunca podem ser exportados.

*Explicação:* modelo em produção é planta viva — precisa de monitoramento e retreino (aulas 1.1 e 1.3). Exportar modelos é prática padrão (c), e o Colab não corrompe nada (a); o risco real é o drift silencioso.

---

## Encerramento do módulo

Ao concluir o módulo 1, o aluno tem: vocabulário preciso, um canvas de problema preenchido com um caso da própria realidade, um notebook funcional publicado com análise de dados reais brasileiros e a visão do ciclo completo que o resto do curso percorre. A mensagem de transição para o módulo 2: "modelo bom nasce de dado bem cuidado — e é para lá que vamos agora".
