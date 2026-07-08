# Módulo 4 — SQL no navegador: BigQuery para perguntas grandes

**Curso:** Análise de Dados para Decisões Estratégicas · Giselle Falcão Academy
**Carga do módulo:** 5h · **Aulas:** 2 vídeos, 2 práticas (BigQuery sandbox), 1 quiz

**Objetivo geral do módulo:** ao final, o aluno cria seu projeto gratuito no BigQuery sandbox (sem cartão de crédito), lê e escreve consultas SQL com SELECT, WHERE, ORDER BY, LIMIT, GROUP BY, HAVING e JOIN sobre dados públicos brasileiros tratados pela Base dos Dados, monitora o custo (bytes processados) de cada consulta e exporta um resultado para o Google Sheets — a ponte para os dashboards do Módulo 5.

---

## Aula 4.1 — SQL: a língua franca dos dados (e os 20% que resolvem 80%)

**Tipo:** vídeo · **Duração:** 18min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Explicar** (compreender) o que é um banco de dados e quando a planilha deixa de ser suficiente. 2. **Reconhecer** (lembrar) por que SQL segue sendo a língua franca dos dados há cinco décadas. 3. **Traduzir** (compreender/aplicar) uma consulta SELECT simples para uma frase em português, cláusula por cláusula. 4. **Identificar** (analisar) as sete palavras-chave que resolvem a maioria das perguntas de gestão. |
| **Duração** | 18 min de vídeo + ~10 min de tarefa de leitura de consulta no fórum |
| **Materiais** | Slides (11); consulta de exemplo impressa no material da aula; links do BigQuery sandbox (https://console.cloud.google.com/bigquery) e da Base dos Dados (https://basedosdados.org) |
| **Sequência didática** | **Abertura (0–1:40):** o dia em que a planilha acaba. **Desenvolvimento (1:40–15:30):** o que é um banco de dados e o que é o BigQuery → por que SQL sobrevive há 50 anos → anatomia do SELECT lida em voz alta → as sete palavras do 20/80 → segurança e custo zero do sandbox → onde tudo isso acontece. **Fechamento (15:30–18:00):** síntese, tarefa de leitura de consulta e ponte para a prática 4.2. |
| **Avaliação** | Formativa: tarefa no fórum (traduzir uma consulta dada para uma frase em português). Somativa: questões 1 e 5 do quiz do módulo. |

### b) Roteiro de gravação

> Tom: professora experiente conversando. Ler no teleprompter com naturalidade — pausas nos "…", sorrir nos parênteses de conexão. **[CÂMERA]** = rosto na tela; **[SLIDE n]** = mostrar slide.

**[0:00–1:40] — [CÂMERA] Abertura**

Oi! Bem-vindo, bem-vinda ao módulo 4 — e deixa eu começar com uma confissão: essa é a parte do curso que eu mais gosto de ensinar. Porque hoje você começa a aprender a língua que os dados falam. Ela se chama SQL, e eu sei que a sigla assusta um pouco… mas eu te prometo uma coisa já na abertura: ao final desta aula, você vai ler uma consulta SQL em voz alta como se fosse uma frase em português. Porque é exatamente isso que ela é.

Antes, uma pergunta: se o Google Sheets resolve tanta coisa — e resolve, você provou isso no módulo 2 — por que aprender mais uma ferramenta? A resposta tem uma data marcada: o dia em que a planilha acaba.

**[1:40–4:00] — [SLIDE 2 → SLIDE 3] O dia em que a planilha acaba**

[SLIDE 2] O Google Sheets tem um teto: dez milhões de células por planilha. Parece muito, né? Faz a conta comigo: uma base com dez colunas… dá um milhão de linhas. Só o SP156 gera centenas de milhares de chamados por semestre — um histórico de alguns anos da cidade inteira já não cabe. E olha, na prática o sofrimento começa bem antes do teto: com algumas centenas de milhares de linhas a planilha já trava, a tabela dinâmica engasga, e você passa mais tempo esperando do que analisando. Eu vejo isso direto nos meus projetos de consultoria: a equipe insiste na planilha por costume, e a análise que levaria segundos passa a levar tardes.

[SLIDE 3] A solução tem nome: **banco de dados**. E aqui vai a boa notícia: você já entende o essencial. Um banco de dados é, na prática, um conjunto de tabelas — linhas e colunas, exatamente como você aprendeu na Aula 1.3 — só que guardadas num sistema feito para volumes gigantes, com regras claras sobre o tipo de cada coluna. O que muda não é o conceito. É a escala… e o jeito de conversar com ele. Numa planilha, você aponta e clica. Num banco de dados, você **pede por escrito**. Esse pedido por escrito é o SQL.

**[4:00–6:30] — [SLIDE 4 → SLIDE 5] Por que SQL sobrevive há 50 anos**

[SLIDE 4] SQL significa *Structured Query Language* — linguagem estruturada de consulta. Ela nasceu nos anos 1970, na IBM… e continua aí, firme, em 2026. Pensa comigo: quantas tecnologias dos anos setenta você usa no trabalho hoje? Pois é. E o motivo da longevidade é lindo: SQL é uma linguagem **declarativa**. Você declara **o que** quer — "me dá o total de chamados por distrito" — e o banco de dados se vira para descobrir **como** buscar isso da forma mais rápida. Você não programa o caminho; você descreve o destino. Por isso ela é considerada a porta de entrada mais suave do mundo dos dados.

[SLIDE 5] E tem um segundo motivo, que me importa muito neste curso: SQL é a **língua franca**. O Sheets fala SQL por baixo dos panos, o BigQuery fala SQL, os sistemas da prefeitura falam SQL, as ferramentas de BI falam SQL. E as pessoas também: quando um gestor sabe ler uma consulta, a conversa com a equipe técnica muda de patamar. Em vez de pedir "um relatório aí dos chamados" e receber, duas semanas depois, algo que não era o que você queria… você consegue especificar: "eu quero a contagem de chamados por distrito, só de 2025, ordenada da maior para a menor". Quem pede bem, recebe rápido. Eu vejo isso direto nos meus projetos — do agro à logística: o gargalo raramente é a tecnologia, é a tradução entre quem pergunta e quem consulta.

**[6:30–10:00] — [SLIDE 6 → SLIDE 7] A anatomia do SELECT, lida em voz alta**

[SLIDE 6] Chega de contexto, vamos ao verbo. Olha essa consulta na tela — e não se assusta, a gente vai ler junto:

`SELECT servico, distrito FROM chamados WHERE distrito = 'SE' ORDER BY data_abertura DESC LIMIT 100`

Agora lê comigo, em português, da esquerda para a direita. **SELECT** servico, distrito: "selecione as colunas serviço e distrito". **FROM** chamados: "da tabela chamados". **WHERE** distrito igual a Sé: "onde o distrito for Sé" — só as linhas que passam nesse teste. **ORDER BY** data_abertura **DESC**: "ordenado pela data de abertura, decrescente" — do mais recente para o mais antigo. **LIMIT** 100: "e me mostre só as cem primeiras". Pronto. Você acabou de ler SQL. "Selecione serviço e distrito, da tabela de chamados, onde o distrito é Sé, do mais recente para o mais antigo, só os cem primeiros." É uma frase. Sujeito, verbo, complemento.

[SLIDE 7] Três detalhes de gramática que evitam noventa por cento dos erros de iniciante. Primeiro: texto vai entre **aspas simples** — distrito igual a 'SE', com aspas. Número vai sem aspas. Segundo: a **ordem das cláusulas é fixa** — SELECT, FROM, WHERE, ORDER BY, LIMIT. O banco é educado, mas é rígido: se você inverter, ele reclama. Terceiro: o asterisco — SELECT **asterisco** — significa "todas as colunas". É útil para espiar uma tabela nova… e a gente vai conversar daqui a pouco sobre por que ele merece moderação.

**[10:00–12:00] — [SLIDE 8] As sete palavras que resolvem 80%**

[SLIDE 8] Agora, a promessa do título da aula. SQL completo tem dezenas de comandos, e você **não** precisa da maioria. Para perguntas de gestão — quantos, quanto em média, onde, quando, comparado com o quê — sete palavras resolvem: **SELECT** (o que mostrar), **FROM** (de qual tabela), **WHERE** (com qual filtro), **ORDER BY** (em que ordem), **LIMIT** (quantas linhas), **GROUP BY** (agrupado por quê — a nossa velha gramática da tabela dinâmica, que chega na aula 4.3) e **JOIN** (cruzando com qual outra tabela). Cinco você acabou de ler; as outras duas fecham o módulo. É esse o 20% que resolve 80% — e é exatamente o escopo deste curso. O resto? Existe, é bonito, e fica para quando você precisar.

**[12:00–14:00] — [SLIDE 9] Você não vai quebrar nada (e não vai pagar nada)**

[SLIDE 9] Duas ansiedades que eu quero desmontar agora, porque eu sei que elas travam gente boa. Primeira: "e se eu quebrar alguma coisa?". Respira: neste curso a gente só usa **SELECT**, e SELECT apenas **lê** os dados — não altera, não apaga, não move uma vírgula. Você vai consultar tabelas públicas que milhares de pessoas consultam todo dia. O pior cenário possível é uma mensagem de erro em vermelho… que é, aliás, como todo mundo aprende.

Segunda ansiedade: "isso vai custar caro?". Não vai custar **nada**. O BigQuery, que é o banco de dados na nuvem do Google, tem um modo chamado **sandbox** — caixa de areia: gratuito, sem cartão de crédito, sem risco de fatura surpresa. Ele te dá 1 terabyte de processamento de consultas por mês de graça — e eu te garanto: o curso inteiro não gasta nem uma fração disso. E tem um hábito profissional que eu vou te cobrar desde a primeira consulta: **ler a estimativa de bytes processados** antes de executar. O BigQuery mostra, no canto do editor, quanto a consulta vai processar. Custo zero não é desculpa para desatenção — é oportunidade de criar o hábito certo.

**[14:00–15:30] — [SLIDE 10] Onde tudo isso acontece: BigQuery + Base dos Dados**

[SLIDE 10] E onde a gente vai praticar? Dois endereços, os dois no navegador. O primeiro é o **console do BigQuery** — console.cloud.google.com/bigquery — onde você escreve e executa as consultas. O segundo é um dos projetos mais bonitos do Brasil de dados: a **Base dos Dados** — basedosdados.org — uma organização da sociedade civil que pega dados públicos brasileiros, limpa, padroniza e publica prontinhos no BigQuery. Lembra da faxina do módulo 2? Eles já fizeram a faxina de centenas de bases — IBGE, segurança pública, educação, eleições — e deixaram tudo com dicionário de dados. É sobre esses dados reais, tratados, que você vai escrever suas primeiras consultas na próxima atividade.

**[15:30–18:00] — [CÂMERA] Fechamento**

Se você chegou até aqui, recapitula comigo em quatro frases. A planilha tem teto, e a cidade produz dados acima desse teto — para isso existem os bancos de dados. SQL é a língua franca: declarativa, cinquentona e mais viva do que nunca. Uma consulta se lê como uma frase em português: selecione isto, daquela tabela, onde tal condição, nesta ordem, só tantas linhas. E sete palavras cobrem as perguntas que a gestão faz.

Sua tarefa antes da prática vale ouro e leva cinco minutos: no material da aula tem uma consulta SQL de exemplo. Vai no fórum e escreve a **tradução dela para o português**, do jeito que a gente fez aqui. Ler consulta em voz alta é o exercício que transforma sigla em idioma — e eu leio todas as traduções.

Na próxima atividade, você cria o seu projeto no BigQuery sandbox — sem cartão, sem instalação — e executa suas primeiras consultas de verdade sobre dados brasileiros da Base dos Dados. Reserva uma hora e quarenta, com café. Se bater aquele friozinho na barriga da primeira vez… você já sabe o que ele significa. Te vejo no console!

### c) Estrutura de slides (11 slides)

1. **Capa** — "SQL: a língua franca dos dados (e os 20% que resolvem 80%)" · Módulo 4 · Aula 1 · logo Giselle Falcão Academy.
2. **O dia em que a planilha acaba** — bullets: teto do Sheets: 10 milhões de células (10 colunas ≈ 1 milhão de linhas); SP156: centenas de milhares de chamados por semestre; o travamento chega antes do teto; tempo esperando ≠ tempo analisando.
3. **Banco de dados: o conceito você já sabe** — bullets: tabelas de linhas × colunas (Aula 1.3), em escala gigante; tipos de coluna com regras; planilha: apontar e clicar → banco: pedir por escrito; o pedido por escrito = SQL.
4. **Por que SQL sobrevive desde os anos 1970** — bullets: *Structured Query Language* (IBM, anos 1970); linguagem DECLARATIVA: você diz O QUE, o banco resolve COMO; destino, não caminho; porta de entrada mais suave do mundo dos dados.
5. **A língua franca** — bullets: Sheets, BigQuery, sistemas da prefeitura, ferramentas de BI — todos falam SQL; gestor que lê SQL especifica melhor; "quem pede bem, recebe rápido"; o gargalo é a tradução, não a tecnologia.
6. **Anatomia de um SELECT** — consulta em destaque: `SELECT servico, distrito FROM chamados WHERE distrito = 'SE' ORDER BY data_abertura DESC LIMIT 100`; tradução linha a linha: selecione… / da tabela… / onde… / ordenado por… / só as 100 primeiras.
7. **Três regras de gramática** — bullets: texto entre aspas simples ('SE'), número sem aspas; ordem fixa das cláusulas: SELECT → FROM → WHERE → ORDER BY → LIMIT; `SELECT *` = todas as colunas (usar com moderação — spoiler do custo).
8. **As 7 palavras do 20/80** — tabela: SELECT (o que mostrar) · FROM (de onde) · WHERE (filtro) · ORDER BY (ordem) · LIMIT (quantas) · GROUP BY (agrupado por quê — aula 4.3) · JOIN (cruzado com quê — aula 4.3).
9. **Você não vai quebrar nada — nem pagar nada** — bullets: SELECT só LÊ (não altera, não apaga); BigQuery **sandbox**: grátis, sem cartão de crédito; 1 TB de consulta/mês de graça; hábito profissional: ler a estimativa de bytes ANTES de executar.
10. **Onde praticamos** — bullets: console do BigQuery (console.cloud.google.com/bigquery); Base dos Dados (basedosdados.org): dados públicos BR limpos, padronizados e com dicionário; IBGE, segurança pública, educação, eleições — prontos para consultar.
11. **Sua tarefa de hoje** — "No fórum: traduza a consulta do material da aula para uma frase em português" + teaser da prática 4.2: primeiro projeto no sandbox + primeiras consultas reais.

---

## Aula 4.2 — Primeiras consultas no BigQuery sandbox com a Base dos Dados

**Tipo:** prática · **Duração:** 1h40 · **Ferramenta:** BigQuery sandbox

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Criar** (aplicar) um projeto gratuito no BigQuery sandbox, sem cartão de crédito. 2. **Localizar** (aplicar) tabelas públicas da Base dos Dados no console e ler o esquema e o dicionário. 3. **Executar** (aplicar) consultas com SELECT, WHERE, ORDER BY e LIMIT sobre dados brasileiros reais. 4. **Monitorar** (avaliar) o custo de cada consulta pela estimativa e pelos bytes processados. |
| **Duração** | ~1h40 (setup 25min + trilha guiada 55min + desafio 20min) |
| **Materiais** | Conta Google; console do BigQuery (https://console.cloud.google.com/bigquery); catálogo da Base dos Dados (https://basedosdados.org); roteiro de consultas nos materiais da aula |
| **Sequência didática** | **Abertura:** criação do projeto sandbox e reconhecimento do console. **Desenvolvimento:** fixar o projeto `basedosdados` → explorar esquema → consultas guiadas em degraus (SELECT → WHERE → ORDER BY → LIMIT) → experimento de custo. **Fechamento:** desafio autônomo + registro do resultado na plataforma. |
| **Avaliação** | Checklist de critérios de conclusão + envio de captura de tela da consulta do desafio com o resultado e os bytes processados. |

### d) Prática guiada — passo a passo

**Missão da prática:** sair do zero absoluto — sem projeto, sem nunca ter escrito SQL — para executar consultas reais sobre dados públicos brasileiros, com custo zero comprovado.

**Dados:** tabelas públicas tratadas pela **Base dos Dados** (https://basedosdados.org), hospedadas no projeto `basedosdados` do BigQuery: o diretório de municípios brasileiros (`br_bd_diretorios_brasil.municipio`) e a população municipal do IBGE (`br_ibge_populacao.municipio`).

**Parte 1 — Criar o projeto sandbox (setup, ~25min)**

1. Acesse https://console.cloud.google.com/bigquery logado na sua conta Google. Na primeira visita, aceite os termos de serviço do Google Cloud.
2. Crie um projeto: no seletor de projetos (topo da tela) → **Novo projeto**. Nomeie `analise-dados-curso` (ou similar) e clique em **Criar**. Não preencha nada de faturamento — é justamente isso que mantém você no modo sandbox. *Checkpoint: um selo escrito **Sandbox** aparece no topo do console. Se aparecer, você está no modo gratuito e sem risco de cobrança.*
3. Reconheça o território: à esquerda fica o **Explorador** (a lista de projetos e tabelas); no centro, o **editor de consultas**; abaixo dele, os **resultados**. É só isso que a gente usa.
4. Fixe o projeto da Base dos Dados: no Explorador, clique em **+ Adicionar** (ou no ícone de busca) → **Marcar um projeto com estrela pelo nome** → digite `basedosdados` → confirme. *Checkpoint: o projeto `basedosdados` aparece no Explorador, com centenas de conjuntos de dados dentro.*
5. Explore antes de consultar (ritual da Aula 1.3 — dicionário primeiro, dado depois): expanda `basedosdados` → localize o conjunto `br_bd_diretorios_brasil` → clique na tabela `municipio` → abra a aba **Esquema**. Leia os nomes e tipos das colunas. Repare: `id_municipio` (o código IBGE de 7 dígitos) é do tipo **STRING** — texto, não número. Isso vai importar já já. Abra também a aba **Detalhes** e anote o tamanho da tabela.

**Parte 2 — Trilha guiada de consultas (~55min)**

6. Primeira consulta da sua vida — espiar a tabela. Clique em **+** (nova consulta), digite e execute (botão **Executar** ou `Ctrl+Enter`):
   ```sql
   SELECT *
   FROM `basedosdados.br_bd_diretorios_brasil.municipio`
   LIMIT 10
   ```
   Atenção à pontuação: o nome completo da tabela vai entre **crases** (`` ` ``), não entre aspas. *Checkpoint: 10 linhas de municípios aparecem no painel de resultados. Respire e comemore — você executou SQL num banco de dados de verdade.*
7. Leia o custo: antes de executar, o validador (canto superior direito do editor) mostrou algo como "Esta consulta processará X MB quando executada"; depois de executar, a aba **Informações do job** mostra os bytes efetivamente processados. Anote o valor — você vai compará-lo no passo 10.
8. Filtre com WHERE — só os municípios paulistas:
   ```sql
   SELECT nome, id_municipio
   FROM `basedosdados.br_bd_diretorios_brasil.municipio`
   WHERE sigla_uf = 'SP'
   ORDER BY nome
   LIMIT 20
   ```
   Lembre da gramática da Aula 4.1: texto entre aspas simples. *Checkpoint: só municípios de São Paulo, em ordem alfabética.*
9. Encontre a capital: altere o WHERE para `WHERE nome = 'São Paulo' AND sigla_uf = 'SP'` e execute. Anote o `id_municipio` retornado — **3550308**. Esse código IBGE é a identidade oficial da capital e vai nos acompanhar até o fim do módulo.
10. O experimento do custo (o hábito mais barato que você vai criar hoje): reescreva a consulta do passo 6 trocando `SELECT *` por `SELECT nome, sigla_uf` e compare a **estimativa** antes de executar. O número cai. Por quê? O BigQuery é um banco **colunar**: ele só lê as colunas que você pede. `SELECT *` lê a tabela inteira; colunas nomeadas leem só o necessário. Em tabelas de gigabytes, essa diferença é o seu 1 TB mensal durando o ano inteiro. Regra da casa: **`SELECT *` só com LIMIT e só para espiar; análise de verdade nomeia colunas.**
11. Agora uma tabela com números — a população do IBGE. Descubra o ano mais recente disponível usando só o que você já sabe (sem funções novas):
    ```sql
    SELECT ano, populacao
    FROM `basedosdados.br_ibge_populacao.municipio`
    WHERE id_municipio = '3550308'
    ORDER BY ano DESC
    LIMIT 5
    ```
    Repare nas aspas em `'3550308'`: o código é STRING, então vai entre aspas — se você esquecer, o BigQuery devolve um erro de tipo (leia a mensagem: ela diz exatamente isso). *Checkpoint: a população da capital nos anos mais recentes, por volta de 11,9 milhões de habitantes.*
12. Ranking populacional paulista — junte tudo (WHERE composto + ORDER BY numérico):
    ```sql
    SELECT id_municipio, populacao
    FROM `basedosdados.br_ibge_populacao.municipio`
    WHERE sigla_uf = 'SP' AND ano = 2024
    ORDER BY populacao DESC
    LIMIT 10
    ```
    (Use no `ano` o valor mais recente que você descobriu no passo 11.) *Checkpoint: a capital lidera com folga; Guarulhos e Campinas disputam a segunda posição.* Incômodo proposital: o resultado mostra códigos, não nomes. Guarde esse incômodo — ele é o gancho do JOIN na Aula 4.3.

**Parte 3 — Desafio autônomo (~20min)**

13. **Desafio:** escreva, sozinho, uma consulta que responda: *"Quais os 10 municípios menos populosos do estado de São Paulo no ano mais recente?"* Dica: é a consulta do passo 12 com uma palavra a menos. Antes de executar, anote sua previsão da estimativa de bytes.
14. Registre a conclusão: tire uma captura de tela mostrando a consulta, o resultado e os bytes processados (aba Informações do job) e envie na atividade da plataforma. Poste no fórum uma frase: qual foi a consulta mais satisfatória de executar e por quê.

**Critérios de conclusão (checklist do aluno):**

- [ ] Projeto criado e selo **Sandbox** visível no console.
- [ ] Projeto `basedosdados` fixado no Explorador e esquema da tabela `municipio` lido.
- [ ] As 5 consultas da trilha executadas sem erro (passos 6, 8, 9, 11 e 12).
- [ ] Experimento do custo feito: diferença de estimativa entre `SELECT *` e colunas nomeadas observada.
- [ ] Desafio resolvido e captura de tela enviada na plataforma.

**Problemas comuns e socorro rápido:**

- *"Not found: Table"* → confira o nome completo entre crases e a grafia exata (`basedosdados.br_bd_diretorios_brasil.municipio`); um ponto fora do lugar derruba tudo.
- *"No matching signature" ou erro de tipo no WHERE* → você comparou STRING com número; ponha o valor entre aspas simples (`id_municipio = '3550308'`).
- *"Syntax error at or near…"* → leia a posição indicada: quase sempre é vírgula sobrando no SELECT, aspas não fechadas ou cláusulas fora de ordem (SELECT → FROM → WHERE → ORDER BY → LIMIT).
- *O selo Sandbox não aparece* → você entrou num projeto antigo com faturamento; volte ao seletor de projetos e escolha o projeto criado no passo 2.
- *Não encontro o botão de estrela* → alternativa: pesquise `basedosdados` na barra de busca do Explorador e marque a estrela no resultado.

> **Nota para o instrutor (revisar a cada oferta):** nomes de conjuntos e tabelas no catálogo da Base dos Dados podem mudar. Antes de cada turma, validar `br_bd_diretorios_brasil.municipio` e `br_ibge_populacao.municipio` e o ano mais recente de população. Fallback estável caso alguma tabela saia do ar: usar `bigquery-public-data.austin_311.311_service_requests` (chamados 311 de Austin, análogo ao SP156) com os mesmos degraus SELECT → WHERE → ORDER BY → LIMIT.

---

## Aula 4.3 — Agregar, filtrar, cruzar: GROUP BY e JOIN sem medo

**Tipo:** vídeo · **Duração:** 22min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Traduzir** (aplicar) a gramática "calcule isto agrupado por aquilo" da tabela dinâmica para GROUP BY com COUNT, SUM e AVG. 2. **Diferenciar** (analisar) WHERE (filtra linhas antes de agrupar) de HAVING (filtra grupos depois de agrupar). 3. **Construir** (aplicar) um JOIN entre tabela de fatos e tabela de referência usando a chave correta. 4. **Detectar** (analisar) os erros clássicos: coluna fora do GROUP BY e JOIN por nome em vez de código. |
| **Duração** | 22 min de vídeo |
| **Materiais** | Slides (13); consultas da demonstração no material da aula; tabelas da prática 4.2 (a demo usa as mesmas) |
| **Sequência didática** | **Abertura (0–1:30):** você já sabe agregar — só falta o dialeto. **Desenvolvimento (1:30–19:30):** GROUP BY como tabela dinâmica escrita → funções de agregação → WHERE × HAVING → a regra de ouro do GROUP BY → JOIN como PROCV honesto → chave certa e cardinalidade → leitura de uma consulta completa. **Fechamento (19:30–22:00):** síntese e ponte para a prática 4.4. |
| **Avaliação** | Formativa: mini-desafio em tela (montar mentalmente um GROUP BY). Somativa: questões 2, 3 e 4 do quiz do módulo. |

### b) Roteiro de gravação

**[0:00–1:30] — [CÂMERA] Abertura**

Oi de novo! Se você fez a prática passada, você já tem um projeto no BigQuery, já filtrou, já ordenou… e ficou com um incômodo no final: aquele ranking de população mostrando **código** de município em vez de **nome**. Hoje a gente resolve esse incômodo — e de quebra destrava as duas palavras mais poderosas do SQL: GROUP BY e JOIN. E eu quero começar tirando um peso: você **já sabe** agregar dados. Você fez isso o módulo 2 inteiro, na tabela dinâmica. Hoje você só aprende a escrever, por extenso, o que os seus cliques já faziam.

**[1:30–4:30] — [SLIDE 2 → SLIDE 3] GROUP BY: a tabela dinâmica escrita por extenso**

[SLIDE 2] Lembra da gramática universal do módulo 2? **"Calcule ISTO, agrupado por AQUILO."** Conte os chamados, agrupados por distrito. Na tabela dinâmica, o "agrupado por aquilo" ia na caixa de linhas, e o "calcule isto" ia na caixa de valores. Em SQL, é assim:

`SELECT distrito, COUNT(*) AS total_chamados FROM chamados GROUP BY distrito`

[SLIDE 3] Lê comigo: "selecione o distrito e a contagem de linhas… da tabela chamados… agrupado por distrito". O **GROUP BY distrito** é a caixa de linhas. O **COUNT(*)** é a caixa de valores. E o **AS total_chamados** é só um apelido — um nome bonito para a coluna do resultado, porque "f0_" não fica bem num relatório. O resultado? Uma linha por distrito, com o total de cada um. Exatamente a tabela dinâmica que você montou na prática 2.4 — agora escrita numa frase que qualquer sistema do planeta entende.

**[4:30–7:00] — [SLIDE 4] As funções de agregação (e a velha regra do módulo 2)**

[SLIDE 4] O COUNT tem irmãos, e você já conhece a personalidade de cada um. **COUNT(*)** conta linhas — responde "quantos?". **SUM** soma — responde "quanto no total?", e só faz sentido para grandeza somável. **AVG** é a média — "quanto em média?" — com todas as ressalvas que a média merece, e o módulo 3 te deixou bem desconfiado dela, né? **MIN** e **MAX** dão os extremos. E a regra continua a mesma de sempre: **a função segue a pergunta, não a ferramenta**. Tempo médio de resolução por serviço? AVG. Total de ocorrências por município? SUM. Quantos chamados por canal? COUNT. Se você acertava isso na tabela dinâmica, você já acerta em SQL.

Mini-desafio, pausa o vídeo: como você escreveria "média de dias de resolução, agrupada por serviço"? … — [pausa 3s] — `SELECT servico, AVG(dias_para_resolucao) FROM chamados GROUP BY servico`. Se você chegou perto disso, pode seguir com o peito estufado.

**[7:00–10:00] — [SLIDE 5 → SLIDE 6] WHERE × HAVING: antes e depois do agrupamento**

[SLIDE 5] Agora uma sutileza que derruba muita gente em entrevista — e que cai no quiz, aviso dado. Você quer o tempo médio por serviço, mas **só dos serviços com média acima de 30 dias**. Tenta usar o WHERE… e o banco reclama. Por quê? Porque o WHERE filtra **linhas, antes** do agrupamento — e antes de agrupar, a média ainda não existe! Para filtrar **grupos, depois** do agrupamento, existe a cláusula **HAVING**:

`SELECT servico, AVG(dias_para_resolucao) AS media_dias FROM chamados GROUP BY servico HAVING AVG(dias_para_resolucao) > 30`

[SLIDE 6] A imagem que eu quero que você leve: o SQL trabalha numa linha de montagem. Primeiro o WHERE seleciona a matéria-prima — as linhas. Depois o GROUP BY monta os pacotes — os grupos. Só então o HAVING inspeciona os pacotes prontos. **WHERE filtra linhas; HAVING filtra grupos.** Quer só o ano de 2025 E serviços com média alta? Use os dois: WHERE para o ano, HAVING para a média. Cada um no seu posto da linha de montagem.

**[10:00–11:30] — [SLIDE 7] A regra de ouro do GROUP BY**

[SLIDE 7] E o erro número um do iniciante em GROUP BY, para você nunca cometer: colocar no SELECT uma coluna que não está nem no GROUP BY, nem dentro de uma função de agregação. Pensa comigo: se eu agrupo por distrito e peço a coluna "serviço"… qual serviço? Cada distrito tem centenas de serviços diferentes — o banco não tem como escolher um, então ele se recusa e devolve erro. A regra de ouro, anota: **toda coluna do SELECT ou está no GROUP BY, ou está embrulhada numa função de agregação.** Sem exceção. Quando o BigQuery te mostrar o erro "neither grouped nor aggregated"… agora você sabe exatamente o que ele está dizendo.

**[11:30–15:00] — [SLIDE 8 → SLIDE 9 → SLIDE 10] JOIN: o PROCV honesto**

[SLIDE 8] Agora, o incômodo da prática passada: o ranking com códigos em vez de nomes. Isso acontece porque bancos de dados bem organizados separam as informações em tabelas especializadas. De um lado, a **tabela de fatos**: os eventos, os números — população por ano, ocorrências por mês — identificados por códigos enxutos. Do outro, a **tabela de referência**: o catálogo que traduz cada código — o diretório de municípios da Base dos Dados, com código IBGE, nome, UF. Ninguém repete "São Paulo" doze vezes por ano na tabela de fatos; repete-se o código, e o nome mora no catálogo.

[SLIDE 9] E como juntar as duas? Se você já usou **PROCV** no Excel ou no Sheets, você já fez isso na alma: "procura esse código lá na outra tabela e traz o nome". O **JOIN** é o PROCV honesto — mais robusto, sem depender de coluna ordenada, sem quebrar quando alguém insere uma linha. Olha a sintaxe, e lê comigo:

`SELECT dir.nome, fato.populacao FROM populacao AS fato JOIN diretorio AS dir ON fato.id_municipio = dir.id_municipio`

"Selecione o nome, que vem do diretório, e a população, que vem dos fatos… juntando as duas tabelas **onde o código de uma bate com o código da outra**." O **ON** é o coração do JOIN: ele declara a **chave** — a coluna que as duas tabelas têm em comum. E os apelidos — AS fato, AS dir — deixam a consulta legível, dizendo de qual tabela vem cada coluna.

[SLIDE 10] Um detalhe que separa o analista cuidadoso do apressado: **junte por código, nunca por nome**. Nome tem acento, tem abreviação, tem grafia diferente entre sistemas — "Embu das Artes" já foi "Embu"; "Mogi Mirim" aparece com e sem hífen dependendo da base. O código IBGE de sete dígitos é único, estável e imune a criatividade ortográfica. É literalmente para isso que ele existe. Lembra da armadilha de textos da Aula 1.3? O JOIN por nome é ela, vestida de consulta.

**[15:00–17:00] — [SLIDE 11] INNER, LEFT e o teste do total**

[SLIDE 11] Duas variações em uma frase cada, porque é o que você precisa por ora. O **JOIN** comum — o INNER — só mantém as linhas que encontraram par nas duas tabelas. O **LEFT JOIN** mantém **todas** as linhas da tabela da esquerda, mesmo as sem par — que aparecem com o resultado vazio, o tal do NULL. Quando usar qual? Se perder linha sem par é aceitável, INNER; se você precisa enxergar o que **não** casou — um código órfão, um município sem cadastro —, LEFT. E o hábito de sempre, herdado do módulo 2: depois de um JOIN, faça o **teste do total** — o número de linhas do resultado faz sentido? Se de repente dobrou, sua chave está se repetindo na tabela de referência e cada linha de fato casou duas vezes. JOIN que multiplica linha é o jeito mais silencioso de inflar um número público — e a gente não faz número inflado, nem sem querer.

**[17:00–19:30] — [SLIDE 12] Lendo uma consulta completa (a da próxima prática)**

[SLIDE 12] Para fechar, deixa eu te mostrar aonde tudo isso chega. Essa é, quase palavra por palavra, uma consulta que você vai escrever na próxima prática:

`SELECT dir.nome, SUM(occ.roubo_veiculo) AS total FROM ocorrencias AS occ JOIN diretorio AS dir ON occ.id_municipio = dir.id_municipio WHERE occ.ano = 2025 GROUP BY dir.nome ORDER BY total DESC LIMIT 10`

Respira e lê comigo, de cima para baixo: "selecione o nome do município e a soma dos roubos de veículo… das ocorrências, cruzadas com o diretório pelo código IBGE… só do ano de 2025… agrupado por município… do maior para o menor… os dez primeiros." Isso é uma pergunta de secretário de segurança, respondida numa frase de sete linhas, sobre milhões de registros, em dois segundos, de graça, no seu navegador. Três módulos atrás você não sabia o que era granularidade. Olha onde você está.

**[19:30–22:00] — [CÂMERA] Fechamento**

Recapitulando em quatro frases. GROUP BY é a tabela dinâmica escrita por extenso: calcule isto — a função de agregação — agrupado por aquilo. WHERE filtra linhas antes de agrupar; HAVING filtra grupos depois. Toda coluna do SELECT ou está no GROUP BY ou está numa função — regra de ouro. E o JOIN é o PROCV honesto: junte pela chave de código, nunca por nome, e faça o teste do total depois.

Na próxima prática, a última mão na massa deste módulo, você responde **três perguntas de gestão de verdade** sobre segurança pública paulista — cada uma subindo um degrau: WHERE, GROUP BY, JOIN — e termina exportando o resultado direto para o Google Sheets. Essa exportação é a ponte para o módulo 5, onde esse resultado vira dashboard. Reserva duas horas e dez, capricha no café… e te vejo lá!

### c) Estrutura de slides (13 slides)

1. **Capa** — "Agregar, filtrar, cruzar: GROUP BY e JOIN sem medo" · Módulo 4 · Aula 3.
2. **Você já sabe agregar** — frase central: "Calcule ISTO, agrupado por AQUILO" (a mesma do módulo 2); tabela dinâmica: caixa de linhas + caixa de valores; SQL: GROUP BY + função de agregação.
3. **A tabela dinâmica escrita por extenso** — consulta em destaque: `SELECT distrito, COUNT(*) AS total_chamados FROM chamados GROUP BY distrito`; mapeamento visual: GROUP BY = caixa de linhas · COUNT(*) = caixa de valores · AS = apelido da coluna.
4. **As funções de agregação** — tabela: COUNT(*) → "quantos?"; SUM → "quanto no total?" (só grandeza somável); AVG → "quanto em média?" (desconfie — módulo 3); MIN/MAX → extremos; regra: a função segue a PERGUNTA.
5. **WHERE não filtra média** — bullets: WHERE filtra LINHAS, antes do agrupamento; antes de agrupar, a média não existe; para filtrar GRUPOS: HAVING; consulta exemplo com `HAVING AVG(dias_para_resolucao) > 30`.
6. **A linha de montagem do SQL** — diagrama em 3 etapas: WHERE (seleciona matéria-prima/linhas) → GROUP BY (monta pacotes/grupos) → HAVING (inspeciona pacotes prontos); frase: "WHERE filtra linhas; HAVING filtra grupos".
7. **A regra de ouro do GROUP BY** — frase central: "toda coluna do SELECT ou está no GROUP BY, ou está numa função de agregação"; exemplo do erro: agrupar por distrito e pedir `servico` solto; mensagem do BigQuery: "neither grouped nor aggregated".
8. **Fatos × referência** — diagrama: tabela de FATOS (eventos + códigos: população por ano, ocorrências por mês) ↔ tabela de REFERÊNCIA (catálogo: código IBGE → nome, UF); "o nome mora no catálogo; o fato carrega só o código".
9. **JOIN: o PROCV honesto** — consulta em destaque com `JOIN … ON fato.id_municipio = dir.id_municipio`; bullets: ON declara a CHAVE; apelidos (AS) dizem de onde vem cada coluna; mais robusto que PROCV: não depende de ordenação.
10. **Junte por código, nunca por nome** — bullets: nomes variam ("Embu" × "Embu das Artes", hífens, acentos); código IBGE de 7 dígitos: único e estável; JOIN por nome = armadilha de textos (Aula 1.3) vestida de consulta.
11. **INNER × LEFT + teste do total** — tabela: INNER (só linhas com par nas duas tabelas) × LEFT (todas da esquerda; sem par vira NULL); alerta: resultado dobrou de tamanho? chave repetida na referência; "JOIN que multiplica linha infla número público".
12. **Uma consulta completa** — a consulta da prática 4.4 (SELECT + JOIN + WHERE + GROUP BY + ORDER BY + LIMIT) com tradução linha a linha ao lado; frase: "pergunta de secretário, respondida em 7 linhas, sobre milhões de registros, de graça".
13. **Próxima parada: três perguntas de gestão** — bullets: prática 4.4: WHERE → GROUP BY → JOIN, um degrau por pergunta; fecha exportando para o Google Sheets; a ponte para o dashboard do módulo 5.

---

## Aula 4.4 — Três perguntas de gestão respondidas em SQL

**Tipo:** prática · **Duração:** 2h10 · **Ferramenta:** BigQuery sandbox

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Traduzir** (analisar) três perguntas de gestão em consultas SQL de complexidade crescente. 2. **Aplicar** (aplicar) WHERE, GROUP BY/HAVING e JOIN sobre dados reais de segurança pública do estado de São Paulo. 3. **Interpretar** (analisar/avaliar) os resultados com as ressalvas do módulo 3 (números absolutos × população). 4. **Exportar** (aplicar) um resultado do BigQuery para o Google Sheets. 5. **Redigir** (criar) um mini-sumário executivo com um achado e uma ressalva. |
| **Duração** | ~2h10 (aquecimento 20min + três perguntas 80min + exportação e sumário 30min) |
| **Materiais** | Projeto sandbox da prática 4.2 (pré-requisito); tabelas `basedosdados.br_sp_gov_ssp.ocorrencias_registradas`, `basedosdados.br_bd_diretorios_brasil.municipio` e `basedosdados.br_ibge_populacao.municipio`; dicionário do conjunto em https://basedosdados.org (buscar "SSP-SP"); modelo de sumário nos materiais da aula |
| **Sequência didática** | **Abertura:** reconhecer a tabela de ocorrências da SSP-SP (esquema + dicionário). **Desenvolvimento:** P1 com WHERE/ORDER BY → P2 com GROUP BY/HAVING → P3 com JOIN → desafio extra de taxa por habitante. **Fechamento:** exportação para o Sheets + sumário executivo + envio. |
| **Avaliação** | Checklist de critérios de conclusão + link da planilha exportada + sumário executivo postado no fórum (feedback por rubrica simplificada: consulta correta, interpretação honesta, recomendação acionável). |

### d) Prática guiada — passo a passo

**As três perguntas de gestão** (imagine-se assessorando a Secretaria de Segurança Pública do estado):

- **P1 (degrau WHERE).** Em quais meses de 2025 a capital paulista concentrou mais roubos de veículo?
- **P2 (degrau GROUP BY).** O total anual de roubos de veículo na capital está subindo ou caindo nos últimos anos?
- **P3 (degrau JOIN).** Quais os 10 municípios paulistas com mais roubos de veículo em 2025 — com nome, não código?

**Dados:** ocorrências criminais registradas pela SSP-SP, tratadas pela **Base dos Dados** — tabela `basedosdados.br_sp_gov_ssp.ocorrencias_registradas` (granularidade: município × mês; fonte original: https://www.ssp.sp.gov.br/estatistica). Página do conjunto com dicionário: https://basedosdados.org (busque "SSP-SP").

**Parte 0 — Aquecimento: conheça a tabela (~20min)**

1. Abra seu projeto no https://console.cloud.google.com/bigquery (o mesmo da prática 4.2 — o selo Sandbox deve estar lá).
2. No Explorador, dentro de `basedosdados`, localize o conjunto `br_sp_gov_ssp` e a tabela `ocorrencias_registradas`. Abra a aba **Esquema** e confirme os nomes exatos das colunas que vamos usar: `ano`, `mes`, `id_municipio`, `regiao_ssp` e as colunas de ocorrências (entre elas `roubo_veiculo`, `furto_veiculo`, `homicidio_doloso`). *Os nomes exatos mandam: se nesta oferta do curso alguma coluna estiver diferente, use o nome que está no esquema.*
3. Ritual da Aula 1.3 — responda antes de consultar: cada linha desta tabela é o quê? (Resposta: as ocorrências de **um município em um mês de um ano** — granularidade município × mês.) Espie com `SELECT * … LIMIT 10` para confirmar, lendo a estimativa de bytes antes.

**Parte 1 — P1: WHERE e ORDER BY (~20min)**

4. Traduza a P1 para SQL antes de digitar (hábito da Aula 4.1): "selecione mês e roubos de veículo, das ocorrências, onde o município é a capital e o ano é 2025, do maior para o menor". Agora digite e execute:
   ```sql
   SELECT mes, roubo_veiculo
   FROM `basedosdados.br_sp_gov_ssp.ocorrencias_registradas`
   WHERE id_municipio = '3550308' AND ano = 2025
   ORDER BY roubo_veiculo DESC
   ```
   (O código `3550308` você anotou na prática 4.2 — é a capital. Se 2025 ainda não estiver completo na tabela, verifique o último ano/mês disponível com `ORDER BY ano DESC, mes DESC LIMIT 3` e ajuste.) *Checkpoint: 12 linhas ou menos, uma por mês, ordenadas pelo volume.*
5. Interprete: anote os 3 meses de pico. Há padrão sazonal plausível (férias? fim de ano?) ou os valores são próximos entre si? Uma linha de anotação basta — vai alimentar seu sumário.

**Parte 2 — P2: GROUP BY e HAVING (~25min)**

6. A P2 pede totais anuais — a granularidade da tabela é mensal, então é preciso **agregar**. Traduza: "selecione o ano e a soma dos roubos de veículo, onde o município é a capital, agrupado por ano, em ordem cronológica":
   ```sql
   SELECT ano, SUM(roubo_veiculo) AS total_roubo_veiculo
   FROM `basedosdados.br_sp_gov_ssp.ocorrencias_registradas`
   WHERE id_municipio = '3550308'
   GROUP BY ano
   ORDER BY ano
   ```
   *Checkpoint: uma linha por ano. Teste do total mental: 12 meses somados — o valor anual deve ter ordem de grandeza compatível com os valores mensais da P1 vezes doze.*
7. Interprete a série: tendência de alta, queda ou estabilidade? Cuidado com o último ano se ele estiver incompleto (menos de 12 meses somados) — compará-lo com anos cheios é a armadilha clássica; se for o caso, registre a ressalva.
8. Degrau extra do HAVING — "quais municípios tiveram em 2025 média mensal acima de 100 roubos de veículo?":
   ```sql
   SELECT id_municipio, AVG(roubo_veiculo) AS media_mensal
   FROM `basedosdados.br_sp_gov_ssp.ocorrencias_registradas`
   WHERE ano = 2025
   GROUP BY id_municipio
   HAVING AVG(roubo_veiculo) > 100
   ORDER BY media_mensal DESC
   ```
   Repare na linha de montagem da Aula 4.3: WHERE corta o ano **antes** de agrupar; HAVING corta os grupos **depois**. Troque o HAVING por WHERE de propósito e leia a mensagem de erro — conhecer o erro de olho é aprendizado.

**Parte 3 — P3: JOIN (~35min)**

9. O resultado do passo 8 voltou com códigos — o velho incômodo. Hora do PROCV honesto. Traduza a P3: "selecione o nome do município e a soma dos roubos, das ocorrências cruzadas com o diretório pelo código IBGE, só de 2025, agrupado por nome, do maior para o menor, os 10 primeiros":
   ```sql
   SELECT
     dir.nome AS municipio,
     SUM(occ.roubo_veiculo) AS total_roubo_veiculo
   FROM `basedosdados.br_sp_gov_ssp.ocorrencias_registradas` AS occ
   JOIN `basedosdados.br_bd_diretorios_brasil.municipio` AS dir
     ON occ.id_municipio = dir.id_municipio
   WHERE occ.ano = 2025
   GROUP BY dir.nome
   ORDER BY total_roubo_veiculo DESC
   LIMIT 10
   ```
   *Checkpoint 1: os 10 municípios aparecem com NOME.* *Checkpoint 2 — teste do total: rode a mesma consulta sem o JOIN (agrupando por `id_municipio`) e confirme que os totais dos líderes batem; se algum valor dobrou, a chave está multiplicando linhas.*
10. Interprete com o módulo 3 na cabeça: os líderes do ranking são, previsivelmente, os municípios mais populosos. **Número absoluto premia cidade grande.** Isso responde "onde há mais ocorrências", não "onde é proporcionalmente pior" — as duas perguntas interessam a gestores diferentes. Escreva essa ressalva; ela vai no sumário.
11. **Desafio extra (opcional, para quem quiser voar):** transforme o ranking em **taxa por 100 mil habitantes**, juntando também a população: adicione um segundo JOIN com `basedosdados.br_ibge_populacao.municipio` (chave `id_municipio`, filtrando o mesmo ano) e calcule `SUM(occ.roubo_veiculo) / MAX(pop.populacao) * 100000 AS taxa_100mil`. Compare os dois rankings — as posições mudam? Esse contraste absoluto × taxa é dos argumentos mais poderosos que você leva deste curso.

**Parte 4 — Exportar e concluir (~30min)**

12. Volte à consulta da P3 (o ranking com nomes) e execute-a. No painel de resultados, clique em **Salvar resultados → Planilhas Google** (Google Sheets). O BigQuery cria a planilha no seu Drive e mostra o link — abra e confira. *Checkpoint: as colunas `municipio` e `total_roubo_veiculo` estão na planilha, prontas para virar gráfico.* (Se o botão estiver indisponível, use **Salvar resultados → CSV (download)** e importe no Sheets como na prática 2.2.)
13. Na planilha exportada, renomeie para `M4 - Ranking SQL - Seu Nome` e monte um gráfico de barras ordenado (você é veterano nisso desde o módulo 2).
14. **Mini-sumário executivo** (célula de texto na planilha ou direto no fórum), em até 4 linhas: (i) a pergunta P3; (ii) o principal achado com número; (iii) a ressalva honesta (número absoluto × população; período coberto); (iv) uma recomendação começando com verbo ("Priorizar…", "Investigar…", "Comparar…").
15. Compartilhe a planilha (Qualquer pessoa com o link → Leitor), envie o link na plataforma e poste o sumário no fórum. Ler os sumários dos colegas é parte do exercício.

**Critérios de conclusão (checklist do aluno):**

- [ ] P1 respondida com WHERE + ORDER BY e os meses de pico anotados.
- [ ] P2 respondida com GROUP BY + SUM, com ressalva registrada se o último ano estiver incompleto.
- [ ] Consulta com HAVING executada e a diferença WHERE × HAVING observada na prática.
- [ ] P3 respondida com JOIN pelo código IBGE, exibindo nomes de municípios, e teste do total feito.
- [ ] Resultado exportado para o Google Sheets com gráfico de barras.
- [ ] Mini-sumário executivo (achado + ressalva + recomendação) enviado no fórum e link da planilha na plataforma.

**Problemas comuns e socorro rápido:**

- *"Unrecognized name: roubo_veiculo"* → o nome da coluna mudou nesta versão da tabela; abra a aba **Esquema** e use o nome exato que estiver lá.
- *"SELECT list expression references … which is neither grouped nor aggregated"* → regra de ouro da Aula 4.3: a coluna citada precisa entrar no GROUP BY ou numa função de agregação.
- *Resultado do JOIN com linhas a mais (total inflado)* → confira se juntou por `id_municipio` (código), não por nome, e se usou o diretório correto (`br_bd_diretorios_brasil.municipio`).
- *2025 sem os 12 meses* → a SSP publica com defasagem; use o último ano completo disponível e registre a escolha no sumário (é a ressalva honesta, não um problema).
- *Botão "Planilhas Google" ausente* → salve como CSV e importe manualmente no Sheets (Arquivo → Importar), conferindo separador como no módulo 2.

> **Nota para o instrutor (revisar a cada oferta):** validar antes da turma os nomes `br_sp_gov_ssp.ocorrencias_registradas` e as colunas de ocorrências (o catálogo da Base dos Dados pode renomear conjuntos). Fallback documentado: repetir os três degraus (WHERE → GROUP BY → JOIN) sobre `bigquery-public-data.austin_311.311_service_requests` cruzando com a tabela de conselhos distritais, ou sobre `basedosdados.br_inep_ideb.municipio` (IDEB por município) com o mesmo diretório de municípios.

---

## Aula 4.5 — Quiz do Módulo 4 — SQL e BigQuery

**Tipo:** quiz · **Duração:** 15min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos** | Verificar a fixação dos conceitos do módulo: leitura de consultas, previsão de resultado de GROUP BY, escolha entre WHERE e HAVING, diagnóstico de erro de JOIN e o modelo de custo do BigQuery. |
| **Formato** | 5 questões objetivas, 3 alternativas, correção automática com explicação; 2 tentativas; nota mínima 70% (compõe a média de quizzes). |

### Questões (com gabarito)

**Q1.** Considere a consulta: `SELECT servico, distrito FROM chamados WHERE distrito = 'SE' LIMIT 100`. O que ela retorna?
- a) As colunas `servico` e `distrito` de até 100 chamados cujo distrito é "SE". ✅
- b) Todas as colunas de todos os chamados da cidade, destacando os da Sé.
- c) A contagem de chamados da Sé, agrupada por serviço.

*Explicação: lendo como uma frase — "selecione serviço e distrito, da tabela chamados, onde o distrito é SE, no máximo 100 linhas". Sem GROUP BY não há contagem, e o SELECT nomeou apenas duas colunas.*

**Q2.** A tabela `chamados` tem 50.000 linhas distribuídas em 96 distritos. Quantas linhas retorna `SELECT distrito, COUNT(*) AS total FROM chamados GROUP BY distrito`?
- a) 50.000 — uma por chamado, com o total repetido.
- b) 96 — uma por distrito, cada uma com sua contagem. ✅
- c) 1 — apenas o total geral de chamados.

*Explicação: o GROUP BY colapsa as linhas em um registro por grupo — a mesma lógica da tabela dinâmica do módulo 2: "conte os chamados, agrupados por distrito" produz uma linha por distrito.*

**Q3.** Você quer listar apenas os serviços cujo tempo MÉDIO de resolução passa de 30 dias. Qual cláusula filtra corretamente essa condição?
- a) `WHERE AVG(dias_para_resolucao) > 30`, antes do GROUP BY.
- b) `HAVING AVG(dias_para_resolucao) > 30`, depois do GROUP BY. ✅
- c) `LIMIT 30`, para restringir o resultado a 30 dias.

*Explicação: o WHERE filtra linhas antes do agrupamento — quando a média ainda não existe. Filtros sobre resultados agregados usam HAVING, que age depois do GROUP BY. LIMIT corta a quantidade de linhas exibidas, não tem relação com dias.*

**Q4.** Um colega cruzou a tabela de ocorrências com o diretório de municípios usando `ON ocorrencias.nome_municipio = diretorio.nome` e vários municípios sumiram do resultado. Qual é a causa mais provável e a correção?
- a) Nomes de município variam em grafia e acentuação entre bases; o correto é juntar pela chave de código IBGE (`id_municipio`). ✅
- b) O BigQuery não permite JOIN entre projetos diferentes; é preciso copiar as tabelas para o mesmo projeto.
- c) Faltou um LIMIT na consulta; sem ele o JOIN descarta linhas automaticamente.

*Explicação: JOIN por texto é a armadilha de grafia vestida de consulta — "Embu das Artes" × "Embu" não casam e a linha some no INNER JOIN. O código IBGE de 7 dígitos existe justamente para ser a chave única e estável. JOINs entre projetos públicos são permitidos, e LIMIT nunca altera quais linhas casam.*

**Q5.** No BigQuery, o custo de uma consulta (bytes processados) depende principalmente de quê?
- a) Das colunas que a consulta lê — por isso `SELECT *` processa a tabela inteira e nomear colunas processa menos. ✅
- b) Do número de linhas exibidas — um `LIMIT 10` garante custo próximo de zero.
- c) Do tempo que a consulta demora para executar.

*Explicação: o BigQuery é um banco colunar — ele lê apenas as colunas citadas na consulta, e é isso que a estimativa mostra antes de executar. O LIMIT corta a exibição, mas não reduz o que foi escaneado; o tempo de execução não é a base do custo.*
