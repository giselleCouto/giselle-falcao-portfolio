# Módulo 2 — Google Sheets: da planilha bruta à primeira resposta

**Curso:** Análise de Dados para Decisões Estratégicas · Giselle Falcão Academy
**Carga do módulo:** 4h30 · **Aulas:** 2 vídeos, 2 práticas (Google Sheets), 1 quiz

**Objetivo geral do módulo:** ao final, o aluno importa uma base real de dados abertos no Google Sheets, executa uma limpeza documentada, constrói tabelas dinâmicas e gráficos, e entrega uma resposta executiva de cinco linhas a uma pergunta de gestão.

---

## Aula 2.1 — Dado bruto não responde: limpeza e organização no Google Sheets

**Tipo:** vídeo · **Duração:** 20min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Importar** (aplicar) um CSV no Google Sheets configurando separador e codificação. 2. **Aplicar** (aplicar) as operações essenciais de limpeza: remover duplicatas, tratar vazios, padronizar textos e datas. 3. **Organizar** (aplicar) a planilha no padrão de três abas (dados-brutos / trabalho / saída). 4. **Justificar** (avaliar) cada decisão de limpeza em um registro simples. |
| **Duração** | 20 min de vídeo |
| **Materiais** | Slides (12); Google Sheets aberto para referência; amostra SP156 da prática 2.2 |
| **Sequência didática** | **Abertura (0–2:00):** por que 80% do trabalho é limpeza. **Desenvolvimento (2:00–17:30):** importar do jeito certo → padrão 3 abas → faxina essencial (duplicatas, vazios, textos, datas) → colunas derivadas → diário de limpeza. **Fechamento (17:30–20:00):** síntese e ponte para a prática 2.2. |
| **Avaliação** | Formativa: pergunta de reflexão ("qual planilha do seu trabalho precisa dessa faxina?"). Somativa: questões 1 e 3 do quiz do módulo. |

### b) Roteiro de gravação

> **[CÂMERA]** = rosto na tela; **[SLIDE n]** = mostrar slide. Tom: leve, cúmplice, sem pressa.

**[0:00–2:00] — [CÂMERA] Abertura**

Oi! Módulo 2, e agora a gente entra na ferramenta que provavelmente já está aberta no seu computador neste momento: a planilha. Deixa eu te contar um segredo da profissão que ninguém coloca no anúncio da vaga: analista de dados passa a maior parte do tempo… limpando dado. Sério. A análise em si, aquela parte glamourosa do gráfico bonito, é a ponta do iceberg. E eu vejo isso direto nos meus projetos de consultoria: quando um resultado dá errado, em nove de dez casos o problema nasceu numa base mal preparada — não na análise.

A boa notícia? Limpeza de dados não é difícil. É método. E hoje você sai daqui com o método completo.

**[2:00–4:30] — [SLIDE 2 → SLIDE 3] Importar do jeito certo**

[SLIDE 2] Tudo começa na importação. No Google Sheets: **Arquivo → Importar → Fazer upload**, e aqui mora o primeiro detalhe que separa quem sofre de quem não sofre: o **separador**. Lembra da Aula 1.3? CSV brasileiro adora ponto e vírgula. Na tela de importação, se a prévia aparecer espremida numa coluna só, troque o tipo de separador para "ponto e vírgula" — ou deixe em "detectar automaticamente" e confira a prévia.

[SLIDE 3] Segundo detalhe: acentos. Se aparecer "SÃ£o Paulo", o arquivo veio numa codificação diferente. O caminho mais simples no dia a dia: abrir o CSV pelo **Google Drive** (o Drive costuma detectar bem) ou pedir a versão UTF-8 no portal. Na prática desta semana, a amostra da plataforma já vem redondinha — mas você vai saber se virar com qualquer arquivo.

**[4:30–7:00] — [SLIDE 4] O padrão de três abas**

[SLIDE 4] Antes de tocar em qualquer célula, uma regra de ouro que vai te salvar: **nunca edite o dado original**. Meu padrão, que eu uso em consultoria e recomendo para tudo: três abas. Aba um: `dados-brutos` — o arquivo exatamente como veio, intocado, congelado. Aba dois: `trabalho` — uma cópia onde a faxina acontece. Aba três: `saida` — tabelas e gráficos prontos para apresentar. Se qualquer coisa der errado na limpeza — e vai dar, faz parte — você volta na aba um e recomeça em dois minutos, em vez de baixar tudo de novo e tentar lembrar o que fez.

**[7:00–13:30] — [SLIDE 5 → SLIDE 8] A faxina essencial**

Agora, a faxina em quatro movimentos. [SLIDE 5] **Movimento um: duplicatas.** No Sheets, selecione os dados e use **Dados → Limpeza de dados → Remover cópias**. Antes de remover, anote quantas eram — esse número é informação: uma base com 5% de duplicatas conta uma história sobre o sistema que a gerou.

[SLIDE 6] **Movimento dois: vazios.** Use filtros — **Dados → Criar um filtro** — e filtre cada coluna importante por "vazio". A decisão aqui é de gente grande: excluir a linha? Preencher com "NÃO INFORMADO"? Deixar como está? Não existe resposta única — existe resposta **registrada**. Já chego nisso.

[SLIDE 7] **Movimento três: textos.** "Sé", "SE", "sé " com espaço no final… para o computador são três distritos diferentes. Suas armas: a função `TRIM` para tirar espaços das pontas, `UPPER` ou `PROPER` para uniformizar maiúsculas, e **Dados → Limpeza de dados → Aparar espaços em branco**. Uma dica de 2026: o Sheets aceita os nomes de função em inglês ou português, dependendo da configuração — se `TRIM` não funcionar, tente `ARRUMAR`; nas configurações da planilha dá para fixar os nomes em inglês, que é o que eu recomendo para acompanhar tutoriais.

[SLIDE 8] **Movimento quatro: datas.** Selecione a coluna e confira em **Formatar → Número** se o Sheets está lendo como data mesmo — se estiver alinhado à esquerda como texto, ele não entendeu. Padronize com **Formatar → Número → Data**. Teste rápido: se você consegue subtrair duas datas e obter um número de dias, está tudo certo.

**[13:30–15:30] — [SLIDE 9] Colunas derivadas: onde a análise começa**

[SLIDE 9] Limpou? Agora a parte gostosa: criar colunas novas a partir das existentes — as **colunas derivadas**. Do par "data de abertura" e "data de fechamento" nasce `dias_para_resolucao`, com uma subtração simples. Da data de abertura nasce `mes`, com a função `TEXT` — e de repente você consegue ver evolução mensal. A análise boa raramente usa só as colunas que vieram; ela fabrica as colunas de que a pergunta precisa.

**[15:30–17:30] — [SLIDE 10 → SLIDE 11] O diário de limpeza**

[SLIDE 10] E o hábito que separa o amador do profissional: o **diário de limpeza**. Uma aba extra, ou um bloco de comentários, com três colunas: o que fiz, por quê, quantas linhas afetou. "Removi 37 duplicatas pelo número do chamado." "Excluí 12 linhas sem distrito — 0,4% da base." [SLIDE 11] Por que isso importa tanto no setor público? Porque seu número vai ser questionado — em reunião, em auditoria, no gabinete. E a diferença entre "ah, eu mexi na planilha" e "aqui está o registro de cada tratamento" é a diferença entre perder e ganhar a discussão. Transparência não é só publicar o dado; é publicar o que você fez com ele.

**[17:30–20:00] — [CÂMERA] Fechamento**

Fechando: importe conferindo separador e acento, proteja o original com as três abas, faxine em quatro movimentos — duplicatas, vazios, textos, datas —, fabrique as colunas que a pergunta pede, e registre tudo no diário. 

Na próxima atividade você vai fazer exatamente isso, passo a passo, com os chamados do SP156. Reserva uma hora e meia com um café do lado. E se você chegou até aqui pensando "nossa, quanta coisa antes de analisar"… é isso mesmo. Preparar o dado **é** analisar — é quando você conhece a base de verdade. Te vejo na prática!

### c) Estrutura de slides (12 slides)

1. **Capa** — "Dado bruto não responde: limpeza e organização no Google Sheets" · Módulo 2 · Aula 1.
2. **Importar do jeito certo** — bullets: Arquivo → Importar → Fazer upload; conferir a PRÉVIA sempre; separador: vírgula × ponto e vírgula; tudo numa coluna só = separador errado.
3. **E os acentos?** — bullets: "SÃ£o Paulo" = codificação, não dado ruim; abrir via Google Drive resolve na maioria; amostras do curso já vêm em UTF-8.
4. **O padrão de três abas** — diagrama: `dados-brutos` (intocada) → `trabalho` (faxina) → `saida` (apresentação); regra de ouro: nunca edite o original.
5. **Faxina 1/4 — Duplicatas** — bullets: Dados → Limpeza de dados → Remover cópias; anote QUANTAS eram; duplicata conta história sobre o sistema.
6. **Faxina 2/4 — Vazios** — bullets: Dados → Criar um filtro → filtrar por vazio; opções: excluir, preencher "NÃO INFORMADO", manter; não existe resposta única — existe resposta registrada.
7. **Faxina 3/4 — Textos** — bullets: "Sé" ≠ "SE" ≠ "sé " para o computador; TRIM/ARRUMAR, UPPER, PROPER; Limpeza de dados → Aparar espaços; dica: fixar nomes de função em inglês.
8. **Faxina 4/4 — Datas** — bullets: Formatar → Número → Data; texto alinhado à esquerda = data não reconhecida; teste: data − data = nº de dias.
9. **Colunas derivadas** — bullets: `dias_para_resolucao` = fechamento − abertura; `mes` = TEXT(data; "YYYY-MM"); a pergunta define as colunas que você fabrica.
10. **O diário de limpeza** — tabela exemplo: o que fiz | por quê | linhas afetadas; "removi 37 duplicatas pelo nº do chamado".
11. **Por que registrar?** — bullets: seu número SERÁ questionado; registro transforma discussão em confiança; transparência = dado + tratamento.
12. **Próxima parada: a faxina de verdade** — bullets: prática 2.2 com os chamados do SP156; 1h30 + café; preparar o dado É analisar.

---

## Aula 2.2 — Faxina de dados: preparando os chamados do SP156 no Sheets

**Tipo:** prática · **Duração:** 1h30 · **Ferramenta:** Google Sheets

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Importar** (aplicar) a amostra CSV do SP156 no Google Sheets. 2. **Executar** (aplicar) o protocolo de limpeza: 3 abas, duplicatas, vazios, textos, datas. 3. **Construir** (aplicar) as colunas derivadas `mes` e `dias_para_resolucao`. 4. **Documentar** (avaliar) as decisões no diário de limpeza. |
| **Duração** | ~1h30 |
| **Materiais** | Amostra `sp156-amostra-modulo2.csv` (material da aula na plataforma; ~2.000 linhas extraídas do dataset público "Dados do SP156" — https://dados.prefeitura.sp.gov.br); conta Google |
| **Sequência didática** | **Abertura:** baixar a amostra e criar a planilha. **Desenvolvimento:** protocolo de limpeza guiado com checkpoints. **Fechamento:** diário de limpeza + envio do link. |
| **Avaliação** | Checklist de critérios de conclusão + link da planilha enviado na plataforma. |

### d) Prática guiada — passo a passo

**Missão:** transformar a amostra bruta do SP156 em uma base limpa e documentada, pronta para a tabela dinâmica da Aula 2.4.

1. Baixe o arquivo `sp156-amostra-modulo2.csv` nos materiais da aula. (Quer usar o dado real completo depois? Busque "SP156" em https://dados.prefeitura.sp.gov.br — os arquivos semestrais são grandes; para esta prática, use a amostra.)
2. Acesse https://sheets.google.com e crie uma planilha em branco. Renomeie para `M2 - Faxina SP156 - Seu Nome`.
3. Importe: **Arquivo → Importar → Fazer upload**, selecione o CSV. Na tela de importação, escolha "Substituir planilha" e confira a prévia: as colunas devem aparecer separadas. Se vier tudo em uma coluna, troque o separador para ponto e vírgula. *Checkpoint: você deve ver as colunas `id_chamado`, `data_abertura`, `data_fechamento`, `servico`, `distrito`, `canal`, `status`.*
4. Renomeie a aba para `dados-brutos`. Clique com o botão direito na aba → **Duplicar**. Renomeie a cópia para `trabalho`. A partir daqui, **só mexa na aba `trabalho`**.
5. Congele o cabeçalho: **Visualizar → Congelar → 1 linha**.
6. Anote o total de linhas da base (aparece no canto ou use `=COUNTA(A2:A)` numa célula livre). Você vai comparar no final.
7. **Duplicatas:** selecione todas as colunas → **Dados → Limpeza de dados → Remover cópias** (marque "os dados têm linha de cabeçalho", considere todas as colunas). Anote quantas duplicatas foram removidas. *Checkpoint: a amostra contém duplicatas propositais — se removeu 0, refaça a seleção.*
8. **Vazios:** **Dados → Criar um filtro**. Na coluna `distrito`, filtre por células vazias. Decida: preencha com `NÃO INFORMADO` (recomendado nesta prática) e registre a decisão. Limpe o filtro em seguida.
9. **Textos:** selecione a coluna `distrito` → **Dados → Limpeza de dados → Aparar espaços em branco**. Depois, crie uma coluna auxiliar com `=UPPER(TRIM(E2))` (ajuste a letra da coluna), copie e **cole como valores** sobre a original, e apague a auxiliar. Faça o mesmo para `servico` se notar inconsistências. *Checkpoint: o filtro da coluna `distrito` não deve mais mostrar variações do mesmo nome (ex.: "Sé" e "SÉ ").*
10. **Datas:** selecione `data_abertura` e `data_fechamento` → **Formatar → Número → Data**. Teste numa célula livre: `=C2-B2` deve retornar um número de dias, não um erro.
11. **Coluna derivada 1:** crie `dias_para_resolucao` na primeira coluna livre: `=IF(C2="";"";C2-B2)` e arraste até o fim (ou use `ARRAYFORMULA`). Chamados sem data de fechamento ficam vazios — eles ainda estão abertos.
12. **Coluna derivada 2:** crie `mes` com `=TEXT(B2;"YYYY-MM")` e arraste.
13. **Diário de limpeza:** crie uma aba `diario` com as colunas `o que fiz | por quê | linhas afetadas` e registre pelo menos 4 entradas (duplicatas, vazios, textos, datas/derivadas).
14. Confira o total de linhas final e registre a diferença no diário.
15. Compartilhe: **Compartilhar → Qualquer pessoa com o link → Leitor** e envie o link na plataforma.

**Critérios de conclusão:**

- [ ] Três abas presentes: `dados-brutos` (intocada), `trabalho` (limpa), `diario`.
- [ ] Duplicatas removidas e quantidade registrada no diário.
- [ ] Coluna `distrito` sem vazios e sem variações de grafia.
- [ ] `dias_para_resolucao` e `mes` calculadas corretamente.
- [ ] Diário com pelo menos 4 entradas (o quê / por quê / quantas linhas).
- [ ] Link da planilha enviado na plataforma.

**Socorro rápido:**

- *Fórmula retorna o texto da própria fórmula* → a célula está formatada como texto; Formatar → Número → Automático e redigite.
- *`TRIM`/`UPPER` não existem* → sua planilha está com nomes de função em português (`ARRUMAR`, `MAIÚSCULA`); ou ative "Sempre usar nomes de função em inglês" nas configurações.
- *Data − data dá erro* → uma das colunas ainda está como texto; refaça o passo 10.

---

## Aula 2.3 — Tabela dinâmica: a pergunta certa em três cliques

**Tipo:** vídeo · **Duração:** 22min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Explicar** (compreender) o que é agregação e por que a tabela dinâmica é uma "máquina de agregação". 2. **Construir** (aplicar) tabelas dinâmicas com linhas, colunas, valores e filtros. 3. **Escolher** (analisar) a função de resumo correta (contagem × soma × média) para cada pergunta. 4. **Criar** (criar) um gráfico a partir de uma tabela dinâmica. |
| **Duração** | 22 min de vídeo |
| **Materiais** | Slides (13); planilha limpa da prática 2.2 (a demo usa a mesma base) |
| **Sequência didática** | **Abertura (0–2:00):** a ferramenta mais subestimada do serviço público. **Desenvolvimento (2:00–19:00):** o que é agregar → os 4 quadrantes da dinâmica → contagem × soma × média → montagem passo a passo → agrupamento por mês → top N e gráficos → erros comuns. **Fechamento (19:00–22:00):** síntese + ponte para a prática 2.4. |
| **Avaliação** | Formativa: mini-desafio mental ("qual função de resumo para 'tempo médio por distrito'?"). Somativa: questões 2, 4 e 5 do quiz. |

### b) Roteiro de gravação

**[0:00–2:00] — [CÂMERA] Abertura**

Oi! Aula três do módulo, e hoje eu te apresento a ferramenta com a melhor relação custo-benefício de toda a análise de dados. Não é Python, não é inteligência artificial. É a **tabela dinâmica**. Se você chegou até aqui achando que tabela dinâmica é "coisa avançada de Excel"… hoje esse mito cai. Em três cliques, ela responde perguntas que levariam uma tarde de fórmulas. E o melhor: ela responde exatamente o tipo de pergunta que gestor faz — "quantos por região?", "quanto em média por serviço?", "como evoluiu por mês?".

**[2:00–5:00] — [SLIDE 2 → SLIDE 3] O que é agregar**

[SLIDE 2] Primeiro, o conceito. A sua base limpa da prática passada tem milhares de linhas. Nenhum gestor quer ver milhares de linhas — ele quer o **resumo**: os totais, as médias, os agrupamentos. Esse ato de resumir muitas linhas em poucas se chama **agregação**. [SLIDE 3] E toda agregação tem a mesma gramática, presta atenção que isso destrava tudo: **"calcule ISTO, agrupado por AQUILO"**. Conte os chamados… agrupados por distrito. Calcule a média de dias… agrupada por serviço. Quando você aprender SQL no módulo 4, vai ver que é a mesma gramática. A tabela dinâmica é só o jeito visual de dizer isso.

**[5:00–8:00] — [SLIDE 4] Os quatro quadrantes**

[SLIDE 4] No Sheets: selecione seus dados, **Inserir → Tabela dinâmica**, numa página nova. Aparece o editor com quatro caixas, e cada caixa é uma parte da frase. **Linhas**: o seu "agrupado por" — distrito, serviço. **Valores**: o seu "calcule isto" — contagem de chamados, média de dias. **Colunas**: um segundo agrupamento, opcional — cuidado para não virar um tabuleiro ilegível. **Filtros**: o recorte — só 2026, só chamados concluídos. Linhas, valores, colunas, filtros. É isso. O resto é prática.

**[8:00–11:30] — [SLIDE 5 → SLIDE 6] Contagem × soma × média**

[SLIDE 5] Agora, o erro número um do iniciante — e cai no quiz, aviso dado: a **função de resumo** errada. Na caixa de valores, o Sheets pergunta: somar? contar? tirar média? E a resposta depende da pergunta, não da ferramenta. Quero saber **quantos** chamados cada distrito teve? **CONTAGEM** — COUNTA em cima de qualquer coluna sempre preenchida, tipo o id do chamado. Quero o tempo **médio** de resolução? **MÉDIA** da coluna `dias_para_resolucao`. Somar dias de resolução por distrito? Quase nunca faz sentido — distrito com mais chamados teria "mais dias" mesmo atendendo rápido.

[SLIDE 6] Mini-desafio, pausa o vídeo: "tempo médio de resolução **por serviço**" — o que vai em linhas e o que vai em valores? … Linhas: `servico`. Valores: `dias_para_resolucao` resumido por **MÉDIA**. Se você respondeu isso, pode seguir com o peito estufado.

**[11:30–14:30] — [SLIDE 7 → SLIDE 8] Montagem ao vivo (descrita) e agrupamento por mês**

[SLIDE 7] Deixa eu descrever a montagem completa da nossa pergunta-mestra, "onde a cidade mais reclama": dados da aba `trabalho` selecionados, Inserir → Tabela dinâmica, página nova. Linhas: `distrito`. Valores: `id_chamado`, resumido por COUNTA. Três cliques, literalmente, e o ranking aparece. Ordene por valor decrescente — a opção de ordenação está nas linhas — e pronto: o top de distritos por volume de chamados.

[SLIDE 8] E o tempo? Lembra da coluna `mes` que você fabricou na prática? Coloque `mes` nas linhas e a contagem em valores: evolução mensal instantânea. É por isso que a gente fabrica colunas derivadas — a dinâmica só agrupa pelo que existe como coluna.

**[14:30–17:00] — [SLIDE 9 → SLIDE 10] Do resumo ao gráfico**

[SLIDE 9] Tabela dinâmica pronta é meio caminho; gestor entende mais rápido com gráfico. Selecione a tabela dinâmica → **Inserir → Gráfico**. O Sheets sugere um tipo; confira se é o adequado: ranking de categorias pede **barras**; evolução no tempo pede **linhas**. [SLIDE 10] E uma opinião forte, pode me cobrar: **pizza com mais de 5 fatias é ilegível**. Ranking de 20 distritos em pizza vira confete. Barras ordenadas, sempre. No módulo 5 a gente aprofunda visualização; por ora, essa regra já evita 80% dos gráficos ruins.

**[17:00–19:00] — [SLIDE 11 → SLIDE 12] Erros comuns**

[SLIDE 11] Três tropeços clássicos, para você desviar. Um: montar a dinâmica sobre a aba `dados-brutos` em vez da `trabalho` limpa — aí "SÉ" e "Sé " viram duas linhas no ranking. Dois: usar SOMA onde era CONTAGEM — número gigante, sem sentido. Três: esquecer um filtro ativo e apresentar "total da cidade" que na verdade era só um distrito. [SLIDE 12] Antídoto universal: antes de apresentar, faça o **teste do total** — o total geral da dinâmica bate com o número de linhas da base? Trinta segundos que salvam reuniões.

**[19:00–22:00] — [CÂMERA] Fechamento**

Recapitulando: agregar é "calcule isto agrupado por aquilo"; a dinâmica tem quatro caixas — linhas, valores, colunas, filtros; a função de resumo segue a pergunta; ranking em barras, tempo em linhas; e teste do total antes de apresentar.

Na próxima prática, você vai usar tudo isso para responder três perguntas de verdade sobre a cidade — e vai fechar com um exercício que eu considero o mais importante do curso até aqui: escrever a resposta em **cinco linhas de português claro**, como se fosse para a mesa do secretário. Porque análise que não vira frase… não vira decisão. Te vejo lá!

### c) Estrutura de slides (13 slides)

1. **Capa** — "Tabela dinâmica: a pergunta certa em três cliques" · Módulo 2 · Aula 3.
2. **Ninguém quer ver 2.000 linhas** — bullets: gestor quer o resumo; resumir muitas linhas em poucas = agregação; a dinâmica é uma máquina de agregação.
3. **A gramática universal** — frase central grande: "Calcule ISTO, agrupado por AQUILO"; exemplos: conte chamados ↔ por distrito; média de dias ↔ por serviço; (spoiler: SQL usa a mesma gramática).
4. **Os 4 quadrantes do editor** — diagrama: LINHAS (agrupado por) · VALORES (calcule isto) · COLUNAS (2º agrupamento, opcional) · FILTROS (o recorte); caminho: Inserir → Tabela dinâmica.
5. **A função de resumo segue a pergunta** — tabela: "quantos?" → CONTAGEM/COUNTA; "quanto em média?" → MÉDIA; "quanto no total?" → SOMA (só p/ grandezas somáveis); alerta: somar dias de resolução não faz sentido.
6. **Mini-desafio** — "Tempo médio de resolução por serviço": linhas = ?; valores = ?; (resposta no verso: linhas `servico`, valores MÉDIA de `dias_para_resolucao`).
7. **Montagem: onde a cidade mais reclama** — passos: selecionar dados da aba `trabalho`; Inserir → Tabela dinâmica; linhas: `distrito`; valores: COUNTA de `id_chamado`; ordenar decrescente.
8. **O tempo entra pela coluna `mes`** — bullets: dinâmica só agrupa pelo que existe como coluna; `mes` nas linhas = evolução mensal; colunas derivadas alimentam a dinâmica.
9. **Do resumo ao gráfico** — bullets: selecionar dinâmica → Inserir → Gráfico; ranking de categorias = barras; evolução no tempo = linhas.
10. **Pizza com 20 fatias é confete** — visual comparativo: pizza ilegível × barras ordenadas; regra: pizza só até ~5 categorias (e mesmo assim…).
11. **Três tropeços clássicos** — bullets: dinâmica sobre a aba errada (suja); SOMA no lugar de CONTAGEM; filtro esquecido ativo.
12. **O teste do total** — bullets: total geral da dinâmica = nº de linhas da base?; 30 segundos antes de qualquer reunião; confiança se constrói nos detalhes.
13. **Próxima parada: resposta executiva** — bullets: 3 perguntas reais na prática 2.4; fechamento em 5 linhas de português claro; "análise que não vira frase não vira decisão".

---

## Aula 2.4 — Onde a cidade mais reclama? Da tabela dinâmica à resposta executiva

**Tipo:** prática · **Duração:** 1h50 · **Ferramenta:** Google Sheets

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Construir** (aplicar) três tabelas dinâmicas que respondem perguntas de gestão. 2. **Criar** (criar) dois gráficos adequados (barras para ranking, linhas para evolução). 3. **Analisar** (analisar) os resultados cruzando volume × tempo de atendimento. 4. **Redigir** (criar/avaliar) um sumário executivo de 5 linhas com uma recomendação acionável. |
| **Duração** | ~1h50 |
| **Materiais** | Planilha limpa da prática 2.2 (pré-requisito); modelo de sumário executivo (material da aula) |
| **Sequência didática** | **Abertura:** retomar a planilha e as 3 perguntas. **Desenvolvimento:** dinâmica 1 (volume por distrito) → dinâmica 2 (tempo médio por serviço) → dinâmica 3 (evolução mensal) → gráficos. **Fechamento:** sumário executivo + teste do total + envio. |
| **Avaliação** | Checklist de critérios de conclusão + link da planilha; o sumário executivo recebe feedback por rubrica simplificada (clareza, correção, acionabilidade). |

### d) Prática guiada — passo a passo

**As três perguntas de gestão:**
- **P1.** Quais 5 distritos concentram mais chamados?
- **P2.** Quais serviços têm o maior tempo médio de resolução?
- **P3.** O volume de chamados está subindo ou caindo ao longo dos meses?

1. Abra sua planilha `M2 - Faxina SP156` (prática 2.2). Se não a concluiu, volte — esta prática depende da base limpa.
2. **Dinâmica 1 (P1):** selecione os dados da aba `trabalho` → **Inserir → Tabela dinâmica → Nova página**. Linhas: `distrito`. Valores: `id_chamado` resumido por **COUNTA**. Ordene as linhas por COUNTA decrescente. Renomeie a aba para `din-distrito`. *Checkpoint: o teste do total — o total geral deve bater com o nº de linhas da aba `trabalho` (menos o cabeçalho).*
3. Anote em uma célula ao lado: os 5 primeiros distritos e o percentual que somam do total (calcule com uma divisão simples).
4. **Dinâmica 2 (P2):** nova tabela dinâmica na página `din-servico`. Linhas: `servico`. Valores: `dias_para_resolucao` resumido por **MÉDIA** (a dinâmica ignora os vazios dos chamados abertos — comportamento correto aqui). Adicione um segundo valor: COUNTA de `id_chamado`, para ver volume junto do tempo. Ordene pela média decrescente.
5. Interprete: algum serviço demora muito, mas tem pouco volume? Algum une alto volume E alta demora? (Esse é o candidato a prioridade.) Anote ao lado da tabela.
6. **Dinâmica 3 (P3):** nova página `din-mes`. Linhas: `mes`. Valores: COUNTA de `id_chamado`. Os meses devem ordenar sozinhos (formato YYYY-MM foi escolhido por isso).
7. **Gráfico 1:** na `din-distrito`, selecione o resumo → **Inserir → Gráfico** → tipo **barras** (horizontais ficam melhores para nomes longos). Título: "Chamados por distrito — amostra SP156". Limite aos 10 primeiros se ficar poluído (filtro de topo na dinâmica ou seleção parcial).
8. **Gráfico 2:** na `din-mes`, insira um gráfico de **linhas**. Título: "Evolução mensal de chamados".
9. Capriche 5 minutos nos dois gráficos: eixo legível, sem legenda redundante, cores da paleta (roxo/teal — botão de personalização do gráfico).
10. **Sumário executivo:** crie a aba `saida` e escreva, em no máximo **5 linhas**, seguindo o modelo: (i) a pergunta; (ii) o principal achado com número (`"os 5 distritos X…Y concentram Z% dos chamados"`); (iii) um segundo achado (tempo médio); (iv) uma ressalva honesta (`"amostra de N chamados do período P"`); (v) **uma recomendação acionável** começando com verbo ("Priorizar…", "Realocar…", "Investigar…").
11. Releia o sumário como se você fosse o secretário: dá para decidir algo com essas 5 linhas? Se não, reescreva a recomendação.
12. Compartilhe a planilha (Qualquer pessoa com o link → Leitor) e envie o link na plataforma. Poste seu sumário executivo (texto) no fórum da aula — ler os sumários dos colegas é parte do exercício.

**Critérios de conclusão:**

- [ ] Três dinâmicas em abas separadas (`din-distrito`, `din-servico`, `din-mes`), cada uma com a função de resumo correta.
- [ ] Teste do total feito e aprovado na dinâmica 1.
- [ ] Gráfico de barras (ranking) e gráfico de linhas (evolução) com títulos claros.
- [ ] Sumário executivo de até 5 linhas na aba `saida`, com número, ressalva e recomendação iniciada por verbo.
- [ ] Link enviado na plataforma e sumário postado no fórum.

**Socorro rápido:**

- *A dinâmica mostra "SÉ" e "Sé" separados* → sua limpeza da 2.2 ficou incompleta; refaça o passo de textos e a dinâmica atualiza sozinha.
- *MÉDIA retorna erro ou zero* → confira se `dias_para_resolucao` é número (teste: `=ISNUMBER()` numa célula da coluna).
- *O gráfico não atualiza* → gráficos criados sobre dinâmicas atualizam ao atualizar a dinâmica; se criou sobre células soltas, refaça a partir da dinâmica.

---

## Aula 2.5 — Quiz do Módulo 2 — Google Sheets

**Tipo:** quiz · **Duração:** 18min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos** | Verificar fixação do protocolo de limpeza, do padrão 3 abas, da lógica de agregação e da escolha de funções de resumo e gráficos. |
| **Formato** | 5 questões objetivas, 3 alternativas, correção automática com explicação; 2 tentativas; nota mínima 70%. |

### Questões (com gabarito)

**Q1.** Você acabou de baixar um CSV de um portal público. Qual é a atitude correta antes de começar a análise?
- a) Corrigir os erros diretamente no arquivo original para não esquecer depois.
- b) Manter o original intocado numa aba `dados-brutos` e limpar uma cópia na aba `trabalho`. ✅
- c) Apagar todas as colunas que parecem inúteis para deixar o arquivo leve.

*Explicação: o padrão de três abas protege o dado original — se a limpeza der errado, você recomeça em minutos. Editar o original destrói sua referência; apagar colunas cedo demais joga fora informação que a análise pode precisar.*

**Q2.** Na tabela dinâmica, para saber **quantos** chamados cada distrito registrou, o campo de valores deve usar:
- a) SOMA de `dias_para_resolucao`.
- b) CONTAGEM (COUNTA) de uma coluna sempre preenchida, como `id_chamado`. ✅
- c) MÉDIA de `id_chamado`.

*Explicação: "quantos?" pede contagem. Somar dias mistura volume com tempo, e média de um identificador não significa nada.*

**Q3.** O filtro mostra que a coluna `distrito` tem células vazias. Qual é a conduta mais profissional?
- a) Decidir um tratamento (ex.: preencher com "NÃO INFORMADO") e registrar a decisão no diário de limpeza. ✅
- b) Excluir as linhas em silêncio — ninguém vai notar.
- c) Ignorar, porque células vazias não afetam tabelas dinâmicas.

*Explicação: não existe resposta única para vazios, mas existe resposta registrada. Exclusões silenciosas comprometem a auditabilidade, e vazios afetam sim as agregações por distrito.*

**Q4.** Para obter o **tempo médio de resolução por distrito**, a montagem correta da dinâmica é:
- a) Linhas: `distrito` · Valores: MÉDIA de `dias_para_resolucao`. ✅
- b) Linhas: `dias_para_resolucao` · Valores: CONTAGEM de `distrito`.
- c) Filtros: `distrito` · Valores: SOMA de `dias_para_resolucao`.

*Explicação: a gramática é "calcule ISTO (média de dias) agrupado por AQUILO (distrito)": o agrupador vai em linhas, a medida com a função certa vai em valores.*

**Q5.** Você precisa mostrar o ranking de chamados dos 20 distritos mais demandados. O gráfico mais adequado é:
- a) Pizza com 20 fatias, para mostrar as proporções.
- b) Barras ordenadas da maior para a menor. ✅
- c) Linhas, para dar sensação de continuidade.

*Explicação: ranking de categorias pede barras ordenadas. Pizza com muitas fatias é ilegível, e gráfico de linhas sugere evolução temporal — que não é o caso.*
