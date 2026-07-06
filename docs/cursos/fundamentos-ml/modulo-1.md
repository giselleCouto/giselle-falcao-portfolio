# Módulo 1 — Bem-vindo(a) ao Machine Learning

**Curso:** Fundamentos de Machine Learning | **Carga do módulo:** 3h15
**Objetivo do módulo:** dar ao aluno um mapa mental sólido do que é (e o que não é) Machine Learning, mostrar onde ele já opera no Brasil e colocar o aluno em contato com dados reais no Google Colab — tudo antes de qualquer fórmula.

**Aulas:**

| # | Aula | Tipo | Duração |
|---|------|------|---------|
| 1.1 | O que é Machine Learning (e o que não é) | vídeo | 18min |
| 1.2 | ML no mundo real: casos brasileiros | leitura | 45min |
| 1.3 | O ciclo de vida de um projeto de ML | vídeo | 20min |
| 1.4 | Seu primeiro dataset no Google Colab | prática (Colab) | 90min |
| 1.5 | Quiz do Módulo 1 | quiz | 20min |

---

## Aula 1.1 — O que é Machine Learning (e o que não é) [vídeo, 18min]

### a) Plano de aula

**Objetivos de aprendizagem** (ao final da aula, o aluno será capaz de):

- **Definir** Machine Learning com suas próprias palavras, diferenciando-o de programação tradicional (Bloom: lembrar/compreender).
- **Distinguir** aprendizado supervisionado de não supervisionado a partir de exemplos (Bloom: compreender).
- **Classificar** problemas do cotidiano como regressão, classificação ou clustering (Bloom: aplicar).
- **Reconhecer** situações em que ML não é a melhor solução (Bloom: analisar).

**Duração:** 18min de vídeo + pergunta de reflexão nos comentários.

**Materiais:** roteiro de teleprompter (abaixo), deck de 12 slides (estrutura abaixo), câmera frontal, microfone de lapela.

**Sequência didática:**

- *Abertura (0:00–2:00):* boas-vindas, quebra de expectativa ("você não precisa ser de exatas"), promessa da aula.
- *Desenvolvimento (2:00–15:00):* programação tradicional vs. ML → definição formal leve → os 3 pilares do curso (regressão, classificação, clustering) com exemplos brasileiros → quando NÃO usar ML.
- *Fechamento (15:00–18:00):* recapitulação em 1 slide, pergunta de reflexão, ponte para a aula 1.2.

**Avaliação:** pergunta de reflexão nos comentários ("Cite um problema do SEU trabalho que poderia ser regressão, classificação ou clustering") + itens 1, 2 e 3 do quiz 1.5.

### b) Roteiro de gravação (teleprompter)

**[0:00–1:00] — ROSTO NA CÂMERA (sem slide)**

Oi! Que bom ter você aqui. Eu sou a Giselle Falcão, e nos últimos anos eu tenho trabalhado com uma coisa que eu amo: levar inteligência artificial para dentro de fábricas, fazendas e operações logísticas aqui no Brasil. E eu vou te contar um segredo logo de cara: a parte mais difícil do Machine Learning não é a matemática. É organizar as ideias. E é exatamente isso que a gente vai fazer neste curso, juntos, do zero.

Se você chegou até aqui achando que precisava ser "de exatas", pode respirar. Neste curso, todo código já vem pronto e comentado, e toda fórmula vai aparecer só depois que a intuição estiver clara. Combinado? Então vamos lá.

**[1:00–2:00] — SLIDE 1 e 2 (título + o que você vai sair sabendo)**

Nesta primeira aula, meu objetivo é simples: que você termine esses 18 minutos sabendo explicar para alguém — no almoço, no café — o que é Machine Learning, o que ele não é, e quais são os três tipos de problema que a gente vai dominar neste curso. Só isso. E acredite: isso já te coloca à frente de muita gente que usa o termo "IA" todo dia sem saber o que tem por baixo.

**[2:00–4:30] — SLIDE 3 (programação tradicional: regras → resposta)**

Vamos começar pelo que você provavelmente já conhece, mesmo sem perceber. Na programação tradicional, um ser humano escreve as regras. Pensa numa planilha de frete: SE o peso for maior que 100 quilos E o destino for Manaus, ENTÃO o frete custa tanto. Alguém sentou e escreveu essa regra. Dados entram, regras processam, resposta sai.

Isso funciona lindamente... até o problema ficar complexo demais para alguém escrever todas as regras. Tenta escrever as regras que definem se uma foto contém uma vaca doente ou saudável. Ou as regras exatas que dizem se uma transação de Pix é fraude. Não dá. São padrões demais, exceções demais.

**[4:30–7:00] — SLIDE 4 (ML: dados + respostas → regras)**

E aí entra o Machine Learning, com uma inversão genial: em vez de escrever as regras, a gente mostra exemplos. Dados de entrada e as respostas certas. E o algoritmo descobre as regras sozinho — a gente chama essas regras aprendidas de **modelo**.

Eu vejo isso direto nos meus projetos de consultoria. No agro, por exemplo: em vez de um zootecnista escrever quinhentas regras sobre saúde do rebanho, a gente entrega ao algoritmo o histórico — dados de cada animal e o que aconteceu com ele — e o modelo aprende os padrões que antecipam um problema. O especialista continua essencial, mas o papel dele muda: ele valida e melhora o modelo, em vez de escrever regra por regra.

Então guarda essa definição, que vai cair no quiz: Machine Learning é fazer o computador **aprender padrões a partir de dados**, em vez de ser explicitamente programado com regras fixas.

**[7:00–9:00] — SLIDE 5 (supervisionado vs. não supervisionado)**

Agora, existem duas grandes famílias de aprendizado, e a diferença entre elas é uma palavrinha: **rótulo**. Rótulo é a resposta certa que acompanha cada exemplo.

Quando eu tenho os rótulos — por exemplo, mil transações marcadas como "fraude" ou "legítima" — isso é aprendizado **supervisionado**. É como estudar com gabarito.

Quando eu NÃO tenho rótulos — só tenho, digamos, o comportamento de compra de dez mil clientes, sem nenhuma classificação — isso é aprendizado **não supervisionado**. O algoritmo procura estrutura escondida nos dados por conta própria. É como organizar uma biblioteca sem saber os gêneros dos livros: você começa a agrupar pelo que parece similar.

**[9:00–13:00] — SLIDES 6, 7 e 8 (regressão, classificação, clustering — um slide cada)**

E dentro dessas famílias, os três pilares deste curso. Presta atenção que esse mapa vale ouro.

Primeiro: **regressão**. Supervisionado, e a resposta é um número. Quantos litros de leite essa vaca vai produzir amanhã? Qual o preço justo desse apartamento em Belo Horizonte? Quantas toneladas de soja esse talhão vai render? Se a pergunta começa com "quanto", pensa em regressão.

Segundo: **classificação**. Também supervisionado, mas a resposta é uma categoria. Esse e-mail é spam ou não? Esse cliente vai cancelar a assinatura ou vai ficar? Essa peça que saiu da linha de produção está conforme ou defeituosa? Se a pergunta é "qual tipo" ou "sim ou não", pensa em classificação.

Terceiro: **clustering**, ou agrupamento. Esse é o não supervisionado: sem rótulo nenhum, o algoritmo encontra grupos naturais. É o que um e-commerce faz quando descobre que tem um grupo de clientes que só compra em promoção, outro que compra pouco mas produtos caros... ninguém definiu esses grupos antes; eles emergiram dos dados.

Regressão prevê números. Classificação prevê categorias. Clustering encontra grupos. Esse é o esqueleto do curso inteiro.

**[13:00–15:00] — SLIDE 9 (quando NÃO usar ML)**

Agora, o conselho que eu mais repito em consultoria — e que raramente aparece em curso introdutório: nem tudo é caso para Machine Learning. Se o problema se resolve com uma regra simples e estável, use a regra. Se você tem pouquíssimos dados, o modelo não tem de onde aprender. Se um erro do modelo custa caro demais e você não consegue supervisionar, cuidado. Eu já cheguei em empresa que queria "IA" para uma decisão que cabia numa planilha bem-feita — e a consultoria mais honesta foi dizer isso.

Machine Learning brilha quando há padrão nos dados, volume razoável de exemplos e tolerância a erro administrável. Guarda esse filtro.

**[15:00–17:00] — SLIDE 10 e 11 (recapitulação + reflexão)**

Recapitulando em trinta segundos: programação tradicional recebe regras e dados e devolve respostas; Machine Learning recebe dados e respostas e devolve as regras — o modelo. Com gabarito, é supervisionado: regressão para números, classificação para categorias. Sem gabarito, é não supervisionado: clustering para encontrar grupos. E nem todo problema merece ML.

Sua tarefa antes da próxima aula: escreve nos comentários UM problema do seu trabalho ou do seu dia a dia, e me diz se ele parece regressão, classificação ou clustering. Eu leio, viu? E não tem resposta errada nessa altura — tem raciocínio em construção.

**[17:00–18:00] — ROSTO NA CÂMERA (sem slide)**

Na próxima aula, que é uma leitura, você vai ver cinco casos reais de ML operando no Brasil agora — do Pix à colheitadeira. Spoiler: você já foi "alvo" de pelo menos três deles hoje. Te vejo lá!

### c) Estrutura de slides (12 slides)

1. **Capa** — "Aula 1.1 — O que é Machine Learning (e o que não é)" · logo Giselle Falcão Academy · paleta roxo/lavanda/teal.
2. **O que você vai sair sabendo** — explicar ML para qualquer pessoa · diferenciar supervisionado × não supervisionado · reconhecer os 3 pilares do curso · saber quando NÃO usar ML.
3. **Programação tradicional** — diagrama: REGRAS + DADOS → [programa] → RESPOSTAS · exemplo: regra de frete (SE peso > 100kg E destino = Manaus...) · limitação: e quando as regras são complexas demais?
4. **A inversão do Machine Learning** — diagrama: DADOS + RESPOSTAS → [algoritmo] → REGRAS (= MODELO) · definição: "aprender padrões a partir de dados" · o especialista valida em vez de escrever regras.
5. **Duas famílias de aprendizado** — supervisionado = com rótulo (gabarito) · não supervisionado = sem rótulo (estrutura escondida) · analogia: estudar com gabarito × organizar biblioteca sem gêneros.
6. **Pilar 1: Regressão** — resposta é um NÚMERO · exemplos: litros de leite/dia, preço de imóvel em BH, toneladas de soja por talhão · pergunta-guia: "QUANTO?"
7. **Pilar 2: Classificação** — resposta é uma CATEGORIA · exemplos: spam × não spam, churn × fica, peça conforme × defeituosa · pergunta-guia: "QUAL TIPO? SIM OU NÃO?"
8. **Pilar 3: Clustering** — SEM rótulos: encontrar grupos naturais · exemplo: segmentos de clientes num e-commerce · pergunta-guia: "QUE GRUPOS EXISTEM AQUI?"
9. **Quando NÃO usar ML** — regra simples e estável resolve → use a regra · poucos dados → modelo não aprende · erro custa caro demais sem supervisão → cuidado · "às vezes a resposta honesta é uma planilha bem-feita".
10. **Mapa da aula (recapitulação)** — quadro-síntese: tradicional × ML · supervisionado (regressão | classificação) × não supervisionado (clustering).
11. **Sua vez** — "Escreva nos comentários: um problema do SEU dia a dia. É regressão, classificação ou clustering?"
12. **Próxima aula** — Leitura 1.2: "ML no mundo real: casos brasileiros" · teaser: "você já foi alvo de 3 deles hoje".

---

## Aula 1.2 — ML no mundo real: casos brasileiros [leitura, 45min]

### a) Plano de aula

**Objetivos de aprendizagem:**

- **Identificar** aplicações de ML em cinco setores da economia brasileira (Bloom: lembrar/compreender).
- **Relacionar** cada caso ao tipo de problema (regressão, classificação, clustering) visto na aula 1.1 (Bloom: aplicar).
- **Avaliar** o valor de negócio gerado por cada aplicação (Bloom: avaliar).

**Duração:** 45min de leitura ativa (texto de ~2.500 palavras + 5 checkpoints "pare e pense").

**Materiais:** texto na plataforma com imagens ilustrativas; links para reportagens e fontes públicas.

**Sequência didática:**

- *Abertura:* retomada do mapa da aula 1.1 (os 3 pilares) e contrato de leitura ("em cada caso, tente classificar o tipo de problema antes de ler a resposta").
- *Desenvolvimento — 5 casos, um por seção:*
  1. **Fintech/bancos:** detecção de fraude no Pix em tempo real (classificação). Como os bancos brasileiros pontuam o risco de cada transação em milissegundos.
  2. **Agronegócio:** previsão de produtividade de safra e agricultura de precisão (regressão) — sensores, imagens de satélite e histórico climático para estimar rendimento por talhão.
  3. **Indústria:** manutenção preditiva em fábricas (classificação + regressão) — prever falha de equipamento antes que ela pare a linha; caso narrado da experiência de consultoria da Giselle (sem citar cliente).
  4. **Logística:** otimização de rotas e previsão de demanda no e-commerce brasileiro (regressão) — por que seu pedido chega mais rápido a cada ano.
  5. **Varejo/streaming:** sistemas de recomendação e segmentação de clientes (clustering) — como plataformas agrupam usuários por comportamento.
- *Checkpoints "pare e pense"* após cada caso: "que dados alimentam esse modelo? qual o custo de um erro aqui?".
- *Fechamento:* tabela-resumo caso × tipo de problema × dado usado × valor gerado; ponte para a aula 1.3 (como esses projetos são construídos).

**Avaliação:** checkpoints retomados nos itens do quiz 1.5; sem pontuação direta na leitura.

---

## Aula 1.3 — O ciclo de vida de um projeto de ML [vídeo, 20min]

### a) Plano de aula

**Objetivos de aprendizagem:**

- **Descrever** as seis etapas do ciclo de vida de um projeto de ML (Bloom: compreender).
- **Explicar** por que entender o problema de negócio vem antes de qualquer código (Bloom: compreender).
- **Justificar** a divisão dos dados em treino e teste (Bloom: analisar).
- **Antecipar** o que acontece com um modelo depois que ele entra em produção (Bloom: compreender).

**Duração:** 20min de vídeo.

**Materiais:** roteiro (abaixo), deck de 12 slides, câmera + slides.

**Sequência didática:**

- *Abertura (0:00–2:00):* história real de projeto que quase falhou por pular a etapa 1.
- *Desenvolvimento (2:00–17:00):* as 6 etapas do ciclo — problema → dados → preparação → treinamento (com treino/teste) → avaliação → produção e monitoramento.
- *Fechamento (17:00–20:00):* recapitulação, regra 80/20 da preparação de dados, ponte para a prática 1.4.

**Avaliação:** itens 4 e 5 do quiz 1.5.

### b) Roteiro de gravação (teleprompter)

**[0:00–2:00] — ROSTO NA CÂMERA**

Se você chegou até aqui, você já sabe o que é Machine Learning e já viu ele operando no Brasil inteiro. Agora eu quero te mostrar **como um projeto de ML nasce, cresce e vai para o mundo** — porque é aqui que separa quem só fala de IA de quem entrega IA.

Deixa eu te contar uma cena que eu já vi mais de uma vez em consultoria. Uma equipe técnica brilhante passa meses construindo um modelo sofisticado... e quando apresenta, o gestor pergunta: "tá, mas isso resolve qual problema meu?". Silêncio. O projeto tecnicamente lindo morreu ali, porque começou pelo algoritmo e não pelo problema. Essa aula existe para você nunca viver essa cena.

**[2:00–4:30] — SLIDE 3 (visão geral do ciclo: 6 etapas)**

Todo projeto de ML bem-sucedido passa por seis etapas, e existe até uma metodologia clássica de mercado chamada CRISP-DM que organiza isso — a nossa versão é uma simplificação dela. As etapas: um, entender o problema. Dois, coletar os dados. Três, preparar os dados. Quatro, treinar o modelo. Cinco, avaliar. Seis, colocar em produção e monitorar. Parece linear, mas na prática é um ciclo: a gente volta atrás o tempo todo — e isso é normal, não é fracasso.

**[4:30–7:00] — SLIDE 4 (etapa 1: o problema)**

Etapa um: entender o problema de negócio. A pergunta não é "que modelo vou usar?", é "que decisão essa previsão vai melhorar?". Prever a produtividade da soja... para quê? Para decidir quanto insumo comprar? Para negociar contrato de venda antecipada? Cada resposta muda o modelo, o dado e a métrica. Nos meus projetos, eu não escrevo uma linha de código antes de conseguir completar esta frase: "se o modelo acertar, a empresa vai fazer X de forma diferente". Anota essa frase, ela vale uma consultoria.

**[7:00–9:30] — SLIDE 5 (etapa 2: os dados)**

Etapa dois: coletar os dados. Aqui mora a pergunta de ouro: *que dados eu tenho e que dados eu precisaria ter?* Planilhas, sistemas ERP, sensores, imagens de satélite, histórico de vendas. E uma verdade que ninguém te conta: na empresa brasileira típica, o dado existe, mas está espalhado — metade num sistema, metade na planilha do Carlos. Parte do trabalho é arqueologia de dados mesmo.

**[9:30–12:00] — SLIDE 6 (etapa 3: preparação — a regra 80/20)**

Etapa três: preparar os dados. Limpar valores faltantes, corrigir erros de digitação, padronizar unidades — já vi produção de leite em litros numa planilha e em quilos na outra, na mesma cooperativa. Existe um ditado na área: a gente passa oitenta por cento do tempo preparando dados e vinte por cento modelando. É quase isso mesmo. E vou te falar: é na preparação que os projetos ganham ou perdem qualidade, porque modelo bom com dado ruim é previsão ruim com aparência sofisticada.

**[12:00–14:30] — SLIDE 7 e 8 (etapa 4: treinamento + treino/teste)**

Etapa quatro: treinar o modelo. E aqui vem o conceito mais importante desta aula, presta atenção. A gente **nunca** avalia o modelo nos mesmos dados em que ele aprendeu. Antes de treinar, separamos os dados: tipicamente oitenta por cento para treino e vinte por cento para teste — e o teste fica trancado num cofre até o final.

Por quê? Pensa num aluno que decora o gabarito da prova. Se a prova for exatamente aquelas questões, ele gabarita — mas ele não aprendeu nada. Para saber se aprendeu, você dá questões **novas**. O conjunto de teste é a prova com questões novas do modelo. Isso vai voltar com força no módulo 5, mas a semente fica plantada aqui.

**[14:30–17:00] — SLIDES 9 e 10 (etapas 5 e 6: avaliação, produção e monitoramento)**

Etapa cinco: avaliar. Com números, não com impressão. Cada tipo de problema tem suas métricas — MAE e R² para regressão, precisão e recall para classificação — e a gente vai dedicar aulas inteiras a isso nos módulos 2, 3 e 5.

Etapa seis: produção e monitoramento. O modelo sai do laboratório e vira uma peça do dia a dia: um alerta no celular do veterinário, um score na esteira do banco. E o trabalho não acaba — o mundo muda, os dados mudam, e o modelo envelhece. Clima muda, comportamento do consumidor muda. Modelo em produção sem monitoramento é como máquina sem manutenção: funciona, até o dia que não funciona mais.

**[17:00–19:00] — SLIDE 11 (recapitulação do ciclo)**

Recapitulando o ciclo completo: problema, dados, preparação, treinamento com a divisão treino/teste, avaliação com métricas, produção com monitoramento. Seis etapas, formando um ciclo que se retroalimenta. Se você guardar só duas coisas desta aula, que sejam estas: **comece sempre pelo problema** e **nunca avalie o modelo nos dados de treino**.

**[19:00–20:00] — ROSTO NA CÂMERA**

E agora chegou a hora que eu mais gosto: colocar a mão nos dados. Na próxima aula você vai abrir o Google Colab — direto no navegador, sem instalar absolutamente nada — e explorar um dataset de fazendas leiteiras, com direito a gráfico e tudo. Vai por mim: quando o primeiro gráfico aparecer na sua tela, feito por você, alguma coisa muda. Te espero lá!

### c) Estrutura de slides (12 slides)

1. **Capa** — "Aula 1.3 — O ciclo de vida de um projeto de ML".
2. **A cena que você não quer viver** — "modelo lindo, problema nenhum" · projeto que começa pelo algoritmo morre na apresentação.
3. **O ciclo em 6 etapas** — diagrama circular: 1 Problema → 2 Dados → 3 Preparação → 4 Treinamento → 5 Avaliação → 6 Produção/Monitoramento · inspirado no CRISP-DM · "voltar atrás é normal".
4. **Etapa 1: entender o problema** — pergunta-chave: "que decisão essa previsão melhora?" · frase para completar: "se o modelo acertar, a empresa vai fazer ___ de forma diferente".
5. **Etapa 2: coletar dados** — fontes: ERP, planilhas, sensores, satélite, histórico · realidade brasileira: dado espalhado ("a planilha do Carlos") · arqueologia de dados.
6. **Etapa 3: preparar dados** — limpar faltantes · padronizar unidades (litros × quilos!) · corrigir erros · regra 80/20: maior parte do tempo é aqui · "modelo bom + dado ruim = previsão ruim sofisticada".
7. **Etapa 4: treinar o modelo** — o algoritmo aprende os padrões · diagrama: dados de treino → algoritmo → modelo.
8. **Treino × Teste** — split 80/20 · analogia: aluno que decora o gabarito · teste = prova com questões novas · "o teste fica no cofre até o final".
9. **Etapa 5: avaliar** — com números, não impressões · regressão: MAE, R² (módulo 2) · classificação: precisão, recall (módulo 3).
10. **Etapa 6: produção e monitoramento** — modelo vira alerta, score, painel · o mundo muda → o modelo envelhece · monitoramento = manutenção preventiva do modelo.
11. **Recapitulação** — as 6 etapas em linha · as 2 lições de ouro: "comece pelo problema" e "nunca avalie no dado de treino".
12. **Próxima aula: mãos na massa** — prática 1.4 no Google Colab · "sem instalar nada" · teaser do dataset de fazendas leiteiras.

---

## Aula 1.4 — Seu primeiro dataset no Google Colab [prática, 90min]

### a) Plano de aula

**Objetivos de aprendizagem:**

- **Operar** o Google Colab: abrir notebook, executar células, entender a ordem de execução (Bloom: aplicar).
- **Carregar e inspecionar** um dataset tabular com pandas (`head`, `shape`, `describe`) (Bloom: aplicar).
- **Construir** visualizações simples (dispersão e histograma) e **interpretar** o que mostram (Bloom: aplicar/analisar).
- **Calcular e interpretar** uma matriz de correlação como ponte para a regressão do módulo 2 (Bloom: analisar).

**Duração:** 90min (execução guiada ~60min + desafio ~30min).

**Materiais:** notebook starter `fundamentos-ml-pratica-modulo1.ipynb` (hospedado na plataforma em `/cursos/notebooks/fundamentos-ml-pratica-modulo1.ipynb`), conta Google gratuita, navegador.

**Sequência didática:** abertura (o que é o Colab e por que ele) → execução guiada das células (dataset embutido de fazendas leiteiras de Minas Gerais) → desafio individual (última seção do notebook) → fechamento (checklist de conclusão + compartilhar link do notebook).

**Avaliação:** checklist de conclusão (abaixo) + upload do link do Colab na plataforma (compõe os 20 pontos de práticas do curso).

### d) Prática guiada — passo a passo

**Ferramenta:** Google Colab (colab.research.google.com) — gratuito, roda no navegador, requer apenas conta Google.

**Dataset:** dados de exemplo de 24 fazendas leiteiras de Minas Gerais (fictícios, mas realistas — produção diária, número de vacas, ração e temperatura). Os dados estão **embutidos no próprio notebook**, então não há risco de link quebrado. O notebook starter está em: `client/public/cursos/notebooks/fundamentos-ml-pratica-modulo1.ipynb` (na plataforma: `/cursos/notebooks/fundamentos-ml-pratica-modulo1.ipynb`).

**Passo a passo:**

1. Baixe o notebook starter pelo botão "Baixar notebook da prática" na plataforma (arquivo `fundamentos-ml-pratica-modulo1.ipynb`).
2. Acesse [https://colab.research.google.com](https://colab.research.google.com) logado na sua conta Google.
3. No Colab, clique em **Arquivo → Fazer upload de notebook** e selecione o arquivo baixado.
4. Leia a primeira célula de texto e execute a célula de código de imports clicando no botão ▶ (ou `Shift+Enter`). Aguarde o ícone de "executando" terminar — a primeira execução pode levar alguns segundos enquanto o Colab conecta uma máquina virtual para você.
5. Execute a célula que carrega o dataset embutido e observe a tabela exibida com `head()`. Identifique as colunas: `fazenda`, `municipio`, `n_vacas`, `racao_kg_vaca_dia`, `temp_media_c`, `producao_litros_dia`.
6. Execute a célula de `shape` e `describe()` e responda mentalmente: quantas fazendas há? Qual a produção média? Qual a maior e a menor?
7. Execute a célula de visualização (gráfico de dispersão ração × produção e histograma de produção). Interprete: mais ração por vaca parece acompanhar mais produção?
8. Execute a célula da matriz de correlação. Identifique qual variável tem correlação mais forte com `producao_litros_dia`.
9. **Desafio (últimas células):** siga as instruções do notebook — calcular a produção média por município, criar a coluna `litros_por_vaca` e fazer um novo gráfico de dispersão (temperatura × produção). O código tem lacunas marcadas com `# TODO`.
10. Salve seu notebook no Drive (**Arquivo → Salvar uma cópia no Drive**), gere o link de compartilhamento ("qualquer pessoa com o link — leitor") e cole o link na entrega da plataforma.

**Critérios de conclusão (checklist do aluno):**

- [ ] Todas as células do notebook executadas sem erro, na ordem.
- [ ] Respondeu (nos comentários do notebook ou na plataforma): qual variável tem maior correlação com a produção?
- [ ] Completou os três `# TODO` do desafio (média por município, coluna `litros_por_vaca`, gráfico temperatura × produção).
- [ ] Link do notebook no Drive enviado na plataforma.

**Dica de acessibilidade:** quem nunca programou deve assistir aos 3 primeiros minutos do vídeo-pílula "Tour pelo Colab" (material complementar da plataforma) antes de começar.

---

## Aula 1.5 — Quiz do Módulo 1 [quiz, 20min]

### a) Plano de aula

**Objetivos:** verificar a compreensão dos conceitos centrais do módulo (definição de ML, tipos de problema, ciclo de vida). Bloom: lembrar/compreender/aplicar.
**Formato:** 5 questões de múltipla escolha, 3 alternativas cada, correção automática com explicação. 2 tentativas permitidas; conta a maior nota. Compõe a média de quizzes (40% da nota do curso).

### Questões

**Q1. O que melhor define Machine Learning?**

- a) Programar manualmente regras fixas que o computador deve seguir para cada situação.
- b) Fazer o computador aprender padrões a partir de dados, em vez de ser explicitamente programado com regras fixas. ✅
- c) Qualquer sistema de computador que automatiza tarefas repetitivas de escritório.

*Explicação:* Em ML, mostramos dados e respostas, e o algoritmo descobre as regras (o modelo). Na programação tradicional é o contrário: o humano escreve as regras. Automação de tarefas repetitivas pode existir sem aprendizado algum.

**Q2. Prever o preço de venda de um apartamento em Belo Horizonte a partir de área, bairro e idade do imóvel é um problema de...**

- a) Regressão, porque a resposta é um número contínuo. ✅
- b) Classificação, porque bairros são categorias.
- c) Clustering, porque agrupamos apartamentos parecidos.

*Explicação:* O que define o tipo de problema é a **resposta** que queremos prever — aqui, um preço (número contínuo) → regressão. Bairro é uma variável de entrada (feature), não a resposta.

**Q3. Qual das situações abaixo é um exemplo de aprendizado NÃO supervisionado?**

- a) Prever a produção de leite de cada vaca usando o histórico de produção como resposta.
- b) Classificar e-mails como spam usando milhares de e-mails já marcados como spam/não spam.
- c) Agrupar clientes de um e-commerce por comportamento de compra, sem nenhuma categoria pré-definida. ✅

*Explicação:* Sem rótulos (respostas certas), o algoritmo procura estrutura por conta própria — é o caso do agrupamento de clientes (clustering). Os outros dois casos têm gabarito (produção histórica, marcação de spam) → supervisionados.

**Q4. Para que serve o conjunto de TESTE na divisão treino/teste?**

- a) Acelerar o treinamento usando menos dados.
- b) Avaliar o desempenho do modelo em dados que ele nunca viu durante o treinamento. ✅
- c) Aumentar a quantidade de dados disponível para o modelo aprender.

*Explicação:* O teste é a "prova com questões novas": ele mede se o modelo aprendeu padrões generalizáveis ou apenas decorou os dados de treino. Por isso ele fica separado ("no cofre") até a avaliação final.

**Q5. Qual é a primeira etapa do ciclo de vida de um projeto de ML?**

- a) Escolher o algoritmo mais moderno disponível.
- b) Entender o problema de negócio e que decisão a previsão vai melhorar. ✅
- c) Treinar o modelo com todos os dados disponíveis.

*Explicação:* Projeto que começa pelo algoritmo morre na apresentação. A pergunta inicial é sempre: "se o modelo acertar, a empresa fará o quê de forma diferente?". O algoritmo é consequência do problema, nunca o contrário.
