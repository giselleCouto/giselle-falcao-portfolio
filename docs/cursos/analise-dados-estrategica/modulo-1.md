# Módulo 1 — Pensar com dados: fundamentos e dados abertos

**Curso:** Análise de Dados para Decisões Estratégicas · Giselle Falcão Academy
**Carga do módulo:** 4h · **Aulas:** 2 vídeos, 1 leitura, 1 prática (Colab), 1 quiz

**Objetivo geral do módulo:** ao final, o aluno reconhece o valor da decisão orientada por dados, sabe onde encontrar dados abertos de São Paulo e do Brasil, entende a anatomia de um dataset e executa sua primeira análise em Python no Google Colab — sem instalar nada.

---

## Aula 1.1 — Da intuição à evidência: por que decisões precisam de dados

**Tipo:** vídeo · **Duração:** 18min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Reconhecer** (lembrar) situações da gestão pública em que decidir só pela intuição gera desperdício. 2. **Explicar** (compreender) o ciclo dado → informação → conhecimento → decisão com um exemplo próprio. 3. **Identificar** (analisar) uma decisão do seu contexto de trabalho que poderia ser apoiada por dados. |
| **Duração** | 18 min de vídeo + ~10 min de reflexão no fórum |
| **Materiais** | Slides (11), fórum da plataforma, link do Portal de Dados Abertos de SP |
| **Sequência didática** | **Abertura (0–3:30):** gancho com o caso das equipes de zeladoria; quem é a professora. **Desenvolvimento (3:30–15:30):** custo da decisão no escuro → ciclo dado-decisão → três altitudes de decisão → dados abertos e caixa de ferramentas → mapa do curso. **Fechamento (15:30–18:00):** síntese em uma frase, tarefa de reflexão, convite para a Aula 1.2. |
| **Avaliação** | Formativa: postagem no fórum ("uma decisão do seu trabalho que hoje é tomada sem dados"). Somativa: questões 1 e 5 do quiz do módulo. |

### b) Roteiro de gravação

> Tom: professora experiente conversando. Ler no teleprompter com naturalidade — pausas nos "…", sorrir nos parênteses de conexão. **[CÂMERA]** = rosto na tela; **[SLIDE n]** = mostrar slide.

**[0:00–1:20] — [CÂMERA] Abertura**

Oi! Eu sou a Giselle Falcão, e se você está aqui é porque, em algum momento, você precisou tomar uma decisão importante… sem ter certeza nenhuma de que era a decisão certa. Bem-vindo, bem-vinda à primeira aula de Análise de Dados para Decisões Estratégicas.

Deixa eu começar com uma pergunta que parece simples: quantos buracos de rua a sua cidade tapou no mês passado? … E a pergunta que importa de verdade: os buracos tapados eram os que mais atrapalhavam a vida das pessoas? Se você não sabe responder, tudo bem — quase ninguém sabe. E é exatamente por isso que este curso existe.

**[1:20–3:30] — [SLIDE 2] O caso das equipes de zeladoria**

Imagina o seguinte cenário, que é típico de qualquer prefeitura grande. Uma cidade tem equipes de tapa-buraco e distribui uma equipe por região, tudo igualzinho, porque "assim é justo". Só que quando alguém finalmente abre os dados do 156 — o canal de atendimento do cidadão em São Paulo — descobre que uma região concentra três vezes mais reclamações de buraco do que outra. Ou seja: tinha equipe sobrando de um lado e faltando do outro. A "justiça" da divisão igual estava, na prática, deixando cidadão sem resposta.

Isso não é falha de caráter de ninguém. É o que acontece quando a informação existe, mas não chega em quem decide. E eu vejo isso direto nos meus projetos de consultoria — na indústria, no agro, na logística: o dado quase sempre já existe. O que falta é alguém olhar para ele com a pergunta certa.

**[3:30–5:30] — [SLIDE 3] O custo de decidir no escuro**

Decidir no escuro custa caro, e custa três vezes. [SLIDE 3] Primeiro: desperdício direto — recurso indo para onde o problema não está. Segundo: custo de oportunidade — o problema real continua lá, crescendo. Terceiro, e esse é o mais cruel no setor público: perda de confiança — o cidadão que reclamou e não foi atendido não reclama de novo… ele desiste.

E olha, o contrário também é verdade. Quando a decisão vem acompanhada de evidência, ela fica mais fácil de **defender**. Numa reunião de secretaria, numa prestação de contas, num pedido de orçamento: "eu acho" perde para "os dados mostram" — todas as vezes.

**[5:30–8:00] — [SLIDE 4 → SLIDE 5] Intuição e evidência: aliadas, não rivais**

Agora, um cuidado importante, porque eu não quero que você saia daqui achando que experiência não vale nada. [SLIDE 4] Intuição e evidência não são rivais. A sua experiência é o que gera as boas perguntas; os dados são o que testa essas perguntas. O analista iniciante acha que o dado substitui a experiência. O analista maduro sabe que o dado **disciplina** a experiência.

[SLIDE 5] E aqui entra o conceito central da aula, o ciclo: **dado → informação → conhecimento → decisão**. Dado é o registro bruto: "chamado nº 123, buraco na via, distrito X, aberto dia 3 de março". Informação é o dado organizado: "o distrito X abriu 1.200 chamados de buraco neste trimestre, 40% a mais que no anterior". Conhecimento é a informação interpretada no contexto: "o aumento coincide com o período de chuvas e com o adiamento do recapeamento". E decisão é o conhecimento virando ação: "vamos antecipar o recapeamento das cinco vias mais críticas".

**[8:00–9:30] — [SLIDE 6] O ciclo na prática: SP156**

[SLIDE 6] Guarda esse exemplo do 156, porque ele vai nos acompanhar o curso inteiro. A Prefeitura de São Paulo publica, no Portal de Dados Abertos, os registros de chamados do SP156: o serviço solicitado, a região, as datas. É um retrato honesto do que a cidade pede. Nos próximos módulos, você vai pegar esses dados crus e subir cada degrau do ciclo — até a decisão.

**[9:30–11:30] — [SLIDE 7] Três altitudes de decisão**

[SLIDE 7] Outra distinção que organiza tudo: decisões têm altitudes. A **operacional** é o dia a dia — "qual equipe mando para qual rua hoje?". A **tática** é o mês, o trimestre — "como distribuo as equipes entre as regiões?". E a **estratégica** é o ano, o mandato — "eu invisto em tapa-buraco ou em recapeamento preventivo?". O mesmo dado do 156 alimenta as três altitudes, só muda o zoom. Este curso chama-se decisões *estratégicas* porque o nosso destino final é esse último andar — mas a gente vai subir de escada, degrau por degrau.

**[11:30–13:30] — [SLIDE 8 → SLIDE 9] A matéria-prima já é sua**

[SLIDE 8] "Ah, Giselle, mas eu não tenho acesso a dados." Tem sim. O Brasil tem uma das legislações de transparência mais avançadas do mundo — Lei de Acesso à Informação — e São Paulo é um dos municípios que mais publica: o Portal de Dados Abertos da Prefeitura, o GeoSampa com os mapas da cidade, o ObservaSampa com indicadores… Na próxima aula, que é uma leitura, você vai ganhar o mapa completo desse tesouro.

[SLIDE 9] E a caixa de ferramentas? Toda gratuita, toda no navegador: Google Sheets, Google Colab, BigQuery, Looker Studio e NotebookLM. Você não vai instalar nada neste curso. Nada. Se o seu computador abre o YouTube, ele roda tudo o que a gente vai fazer aqui. Eu vejo isso direto nos meus projetos de consultoria: a ferramenta nunca é o gargalo. A pergunta é.

**[13:30–15:30] — [SLIDE 10] O mapa do curso**

[SLIDE 10] Deixa eu te mostrar a jornada. Módulo 1, este aqui: fundamentos e dados abertos — você já faz sua primeira análise no Colab. Módulo 2: Google Sheets, da planilha bruta à primeira resposta. Módulo 3: estatística para decidir, sem sofrimento — prometo. Módulo 4: SQL no BigQuery, para quando a planilha não dá conta. Módulo 5: dashboards no Looker Studio. E módulo 6: IA como copilota, ética, e o seu projeto final — um dashboard com recomendação estratégica que você pode apresentar no seu trabalho na semana seguinte.

**[15:30–18:00] — [CÂMERA] Fechamento**

Se você chegou até aqui, eu quero te deixar com uma frase só. Não é sobre planilha, não é sobre Python, não é sobre dashboard. É sobre isto: **decidir com dados é uma forma de respeito** — com o recurso público, com o cidadão, e com a sua própria assinatura no documento.

Sua tarefa de hoje é simples e vale ouro: vai no fórum e escreve, em duas ou três linhas, **uma decisão do seu trabalho que hoje é tomada no escuro** — sem dado nenhum. Pode ser pequena. As melhores análises deste curso vão nascer dessas respostas, e eu leio todas.

Na próxima aula, uma leitura de uns 45 minutos, você ganha o mapa do tesouro: onde estão os dados abertos de São Paulo e do Brasil, e como avaliar se um dataset presta. Te vejo lá. Um abraço!

### c) Estrutura de slides (11 slides)

1. **Capa** — "Da intuição à evidência: por que decisões precisam de dados" · Módulo 1 · Aula 1 · logo Giselle Falcão Academy (fundo roxo, título em lavanda).
2. **O caso das equipes de zeladoria** — bullets: distribuição igual "por justiça"; dados do 156: uma região com 3× mais chamados; equipe sobrando de um lado, faltando do outro; a informação existia — não chegava em quem decide.
3. **O custo de decidir no escuro** — bullets: desperdício direto (recurso no lugar errado); custo de oportunidade (o problema real cresce); perda de confiança (o cidadão desiste); evidência torna a decisão defensável.
4. **Intuição × evidência: aliança, não guerra** — bullets: experiência gera as perguntas; dados testam as perguntas; o dado disciplina a intuição — não a substitui.
5. **O ciclo: dado → informação → conhecimento → decisão** — diagrama em 4 setas (teal sobre lavanda), uma linha de definição por etapa.
6. **O ciclo na prática: SP156** — bullets: dado: chamado nº 123, buraco, distrito X; informação: 1.200 chamados no trimestre (+40%); conhecimento: coincide com chuvas + recape adiado; decisão: antecipar recapeamento de 5 vias.
7. **Três altitudes de decisão** — tabela: operacional (hoje — qual rua?); tática (trimestre — como distribuir equipes?); estratégica (mandato — tapa-buraco ou recape preventivo?).
8. **A matéria-prima já é sua** — bullets: Lei de Acesso à Informação; Portal de Dados Abertos da Prefeitura de SP; GeoSampa (mapas); ObservaSampa (indicadores); dados.gov.br (catálogo federal).
9. **Caixa de ferramentas: 100% navegador, 100% gratuita** — logos/nomes: Google Sheets, Colab, BigQuery, Looker Studio, NotebookLM; frase: "a ferramenta nunca é o gargalo — a pergunta é".
10. **O mapa do curso** — 6 módulos em linha do tempo (roxo → teal), 1 linha por módulo.
11. **Sua tarefa de hoje** — "No fórum: uma decisão do seu trabalho que hoje é tomada no escuro (2–3 linhas)" + teaser da Aula 1.2.

---

## Aula 1.2 — O mapa do tesouro: dados abertos de São Paulo e do Brasil

**Tipo:** leitura · **Duração:** 45min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Listar** (lembrar) os principais portais de dados abertos úteis para a gestão pública paulistana. 2. **Diferenciar** (compreender) formatos de dados (CSV, XLSX, GeoJSON/SHP, API) e quando cada um aparece. 3. **Avaliar** (avaliar) a qualidade de um dataset com um checklist de 5 critérios. 4. **Localizar** (aplicar) três datasets relevantes para o próprio tema de trabalho. |
| **Duração** | ~45 min de leitura + exploração guiada dos portais |
| **Materiais** | Texto na plataforma (estrutura abaixo), links dos portais, checklist para download (PDF de 1 página) |
| **Sequência didática** | **Abertura:** por que "onde achar" vem antes de "como analisar". **Desenvolvimento:** base legal → tour pelos portais → formatos → checklist de qualidade. **Fechamento:** atividade de exploração (3 datasets do seu tema) + ponte para a Aula 1.3. |
| **Avaliação** | Formativa: atividade de exploração postada no fórum (nome + link dos 3 datasets). Somativa: questão 2 do quiz. |

### Estrutura do texto da leitura (para redação na plataforma)

1. **Abertura (2 parágrafos).** Analogia do mapa do tesouro: o ouro (dado) já está enterrado e é público; o que separa você dele é saber ler o mapa. Nesta leitura, o mapa.
2. **Por que esses dados são seus: a base legal (3 parágrafos).** Lei de Acesso à Informação (Lei Federal nº 12.527/2011) — transparência ativa e passiva; política municipal de dados abertos de São Paulo; o princípio: dado produzido com dinheiro público é, por padrão, público (exceto sigilos legais e dados pessoais — gancho para a leitura de LGPD no Módulo 6).
3. **Tour guiado pelos portais (seção principal, ~40% do texto).**
   - **Portal de Dados Abertos da Prefeitura de SP** — https://dados.prefeitura.sp.gov.br — catálogo oficial do município: SP156, educação, saúde, mobilidade, finanças. Como buscar por palavra-chave; página de um dataset (recursos, dicionário, frequência de atualização). *Exemplo âncora: buscar "SP156" e abrir o dataset de chamados.*
   - **GeoSampa** — https://geosampa.prefeitura.sp.gov.br — o mapa digital oficial da cidade: camadas de equipamentos públicos, zoneamento, árvores, ciclovias; downloads em SHP/GeoJSON/CSV. Quando usar: perguntas que começam com "onde".
   - **ObservaSampa** — https://observasampa.prefeitura.sp.gov.br — indicadores já calculados por distrito e subprefeitura; ideal para contexto e comparação.
   - **dados.gov.br** — https://dados.gov.br — catálogo federal; agrega estados e municípios; útil para comparar SP com outras cidades.
   - **Base dos Dados** — https://basedosdados.org — organização da sociedade civil que padroniza dados públicos em tabelas prontas no BigQuery (será nossa fonte no Módulo 4).
   - **InfoSiga SP** — https://infosiga.sp.gov.br — sinistros de trânsito do estado (será nossa fonte no Módulo 3).
   - *Caixa de aviso (tom acolhedor):* "Links de governo mudam de endereço. Se um link quebrar, busque o nome do dataset no portal — e a plataforma do curso mantém uma cópia estável de todas as amostras usadas nas práticas."
4. **Formatos que você vai encontrar (1 tabela + 4 parágrafos curtos).** CSV (o pão com manteiga — texto separado por vírgula ou ponto e vírgula); XLSX (planilha Excel); GeoJSON/SHP (dados com geometria, para mapas); API (dados sob demanda, para sistemas). Regra prática do iniciante: prefira CSV; se só houver XLSX, o Sheets abre; se for SHP, o GeoSampa costuma oferecer CSV alternativo.
5. **O checklist dos 5 critérios de qualidade (seção-chave).** Para cada dataset, pergunte: (1) **Atualidade** — qual a data da última atualização? Serve para a minha pergunta? (2) **Granularidade** — cada linha é o quê? (chamado individual × total por mês); (3) **Dicionário** — existe documentação explicando cada coluna? (4) **Completude** — há colunas majoritariamente vazias? (5) **Licença/fonte** — quem publica e com que licença? Exemplo aplicado: avaliação do dataset do SP156 pelos 5 critérios.
6. **Fechamento + atividade.** "Agora é sua vez: encontre **3 datasets** relacionados ao seu trabalho (ou ao tema que você escolheu para o curso) em qualquer um dos portais. Poste no fórum: nome, link e uma frase sobre qual pergunta ele ajudaria a responder." Ponte: "Na próxima aula, a gente abre um dataset de verdade e aprende a ler a anatomia dele."

---

## Aula 1.3 — Anatomia de um dataset: linhas, colunas, tipos e armadilhas

**Tipo:** vídeo · **Duração:** 22min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Descrever** (compreender) a estrutura de uma tabela de dados: observações (linhas), variáveis (colunas) e granularidade. 2. **Classificar** (compreender/aplicar) variáveis em numéricas, categóricas, datas, texto livre e geográficas. 3. **Detectar** (analisar) as seis armadilhas mais comuns em dados públicos brasileiros (faltantes, duplicatas, datas mistas, encoding, separador, unidades). 4. **Julgar** (avaliar) a qualidade de um dataset usando o checklist de 5 perguntas. |
| **Duração** | 22 min de vídeo |
| **Materiais** | Slides (13); dicionário de dados do SP156 (link no portal); amostra CSV da prática 1.4 |
| **Sequência didática** | **Abertura (0–1:30):** conexão com a leitura; promessa da aula. **Desenvolvimento (1:30–19:30):** tabela como átomo → granularidade → tipos de variáveis → dicionário de dados → as 6 armadilhas → checklist de qualidade. **Fechamento (19:30–22:00):** síntese + preparação para a prática no Colab. |
| **Avaliação** | Formativa: mini-desafio em tela (classificar 5 colunas do SP156). Somativa: questões 3 e 4 do quiz. |

### b) Roteiro de gravação

**[0:00–1:30] — [CÂMERA] Abertura**

Oi de novo! Se você fez a leitura da aula passada, você agora sabe **onde** os dados moram. Hoje a gente aprende a **ler** um dado quando ele chega na sua frente. Porque, olha… um dataset é tipo um exame de sangue: os números estão todos ali, mas você precisa saber o que cada campo significa antes de sair tirando conclusão. Nesta aula, eu te dou o vocabulário e — talvez mais importante — te mostro as seis armadilhas que derrubam todo iniciante. Eu já caí em todas, então você não precisa cair.

**[1:30–4:00] — [SLIDE 2 → SLIDE 3] A tabela é o átomo da análise**

[SLIDE 2] Praticamente tudo neste curso vai ser uma tabela: linhas e colunas, como uma planilha. Parece banal, mas tem uma disciplina aí. [SLIDE 3] Numa tabela bem organizada — o pessoal de dados chama de *tidy*, arrumada — **cada linha é uma observação** e **cada coluna é uma variável**. No nosso SP156: cada linha é um chamado de um cidadão. Cada coluna é uma característica desse chamado: a data, o serviço pedido, o distrito, o canal.

Se alguém te manda uma "tabela" onde os meses viraram colunas, com total de janeiro, total de fevereiro… isso é um **relatório**, não é uma base de dados. Dá para apresentar, mas é ruim de analisar. A gente vai aprender a transformar uma coisa na outra.

**[4:00–6:00] — [SLIDE 4] Granularidade: o que é "uma linha"?**

[SLIDE 4] Pergunta de ouro, anota ela: **"nesta tabela, cada linha representa o quê?"** Isso se chama granularidade. Uma linha pode ser um chamado individual… ou o total de chamados por distrito por mês. As duas tabelas falam do 156, mas respondem perguntas diferentes. Se você quer o tempo médio de atendimento, precisa da granularidade fina, do chamado a chamado. Errar a granularidade é a fonte número um de análise errada que eu vejo — inclusive em relatório de gente experiente.

**[6:00–9:30] — [SLIDE 5 → SLIDE 6] Tipos de variáveis**

[SLIDE 5] Agora, as colunas. Cinco tipos cobrem quase tudo. **Numéricas**: quantidades — dá para somar, tirar média. **Categóricas**: rótulos — tipo de serviço, distrito, status; dá para contar, não faz sentido somar. **Datas**: dia, hora — permitem linha do tempo e cálculo de prazos. **Texto livre**: a descrição que o cidadão escreveu — riquíssimo, mas bagunçado. E **geográficas**: latitude, longitude, CEP — permitem mapa.

[SLIDE 6] Olha o SP156: `data_abertura` é data. `servico` e `distrito` são categóricas. `dias_para_resolucao` é numérica. A descrição do chamado é texto livre. Mini-desafio: pausa o vídeo e classifica você as colunas `canal` e `status`… — [pausa 3s] — as duas são categóricas! Se você acertou, ótimo sinal. Se errou, revê o slide 5 com carinho, porque essa classificação decide o que a gente **pode** fazer com cada coluna.

**[9:30–11:30] — [SLIDE 7] Dicionário de dados: o manual de instruções**

[SLIDE 7] Todo dataset decente vem com um **dicionário de dados**: um documento que explica coluna por coluna — nome, significado, tipo, valores possíveis. No Portal de Dados Abertos, ele costuma aparecer na página do dataset. Regra da casa: **dicionário primeiro, dado depois**. São dez minutos de leitura que evitam horas de interpretação errada. Se não houver dicionário… desconfie e redobre o cuidado — o checklist da leitura passada já te avisaria.

**[11:30–16:30] — [SLIDE 8 → SLIDE 9 → SLIDE 10] As seis armadilhas**

Agora o bloco mais valioso da aula. Dados públicos brasileiros são um presente, mas vêm com pegadinhas. Seis delas: [SLIDE 8]

Armadilha um: **valores faltantes**. Células vazias, "N/D", "SEM INFORMAÇÃO". A pergunta não é "tem faltante?" — sempre tem. É: "o faltante tem padrão?". Se um distrito inteiro não preenche um campo, qualquer comparação entre distritos fica torta.

Armadilha dois: **duplicatas**. O mesmo chamado registrado duas vezes infla a contagem. Sempre vale perguntar: existe uma coluna de identificador único? Ela se repete?

[SLIDE 9] Armadilha três: **datas em formatos mistos**. "05/03/2026" e "2026-03-05" na mesma coluna. O computador lê como textos diferentes e suas linhas do tempo viram salada. Padronizar antes de qualquer análise.

Armadilha quatro: **encoding** — a codificação dos acentos. Se você abrir um CSV e ver "SÃ£o Paulo" no lugar de "São Paulo", não entre em pânico: é só o arquivo aberto com a codificação errada. Na prática de amanhã eu te mostro como resolver com um parâmetro.

[SLIDE 10] Armadilha cinco: **o separador**. CSV significa "separado por vírgula", mas no Brasil, como a vírgula é decimal, muita base usa **ponto e vírgula**. Se a planilha abrir tudo espremido numa coluna só, é isso.

Armadilha seis: **unidades e escalas**. Reais ou milhares de reais? Metros ou quilômetros? O dicionário responde. Já vi análise virar piada porque alguém somou "mil reais" com "reais" — e a diferença era de mil vezes, literalmente.

**[16:30–19:30] — [SLIDE 11 → SLIDE 12] Checklist de qualidade em 5 perguntas**

[SLIDE 11] Juntando com a leitura passada, seu ritual ao abrir qualquer base nova: **1)** Cada linha é o quê? **2)** Que tipo tem cada coluna? **3)** Tem dicionário? Li? **4)** Quais colunas têm faltantes ou duplicatas? **5)** Datas, acentos, separadores e unidades estão coerentes? [SLIDE 12] Cinco perguntas, cinco minutos. Esse ritual vai te poupar retrabalho a vida inteira — eu vejo isso direto nos meus projetos de consultoria: os erros caros quase nunca estão no modelo sofisticado, estão na base que ninguém conferiu.

**[19:30–22:00] — [CÂMERA] Fechamento**

Recapitulando em três frases. Tabela arrumada: linha é observação, coluna é variável. Classifique os tipos antes de analisar, porque o tipo define o que é permitido fazer. E rode o ritual das cinco perguntas antes de confiar em qualquer número.

Na próxima aula, a coisa fica boa de verdade: você vai abrir o **Google Colab** — Python no navegador, sem instalar nada — e fazer sua primeira análise com dados no estilo do SP156. O notebook já está pronto na plataforma, com tudo comentado; seu trabalho é executar, entender e, no final, encarar um desafio. Se bater um friozinho na barriga por causa da palavra "Python"… ótimo. Friozinho na barriga é sinal de que a gente está aprendendo. Te vejo no Colab!

### c) Estrutura de slides (13 slides)

1. **Capa** — "Anatomia de um dataset" · Módulo 1 · Aula 3.
2. **De onde viemos, para onde vamos** — bullets: você já sabe ONDE achar dados (Aula 1.2); hoje: como LER um dataset; próxima: mão na massa no Colab.
3. **A tabela é o átomo da análise** — bullets: linha = observação; coluna = variável; tabela *tidy* (arrumada); relatório ≠ base de dados.
4. **Granularidade: cada linha é o quê?** — bullets: pergunta de ouro; chamado individual × total por mês; granularidade errada = análise errada; exemplo SP156 nas duas versões.
5. **Cinco tipos de variáveis** — tabela: numérica (somar/média), categórica (contar), data (linha do tempo/prazos), texto livre (ler/minerar), geográfica (mapear).
6. **Tipos no SP156** — mini-tabela com as colunas `data_abertura`, `servico`, `distrito`, `canal`, `dias_para_resolucao`, `status` e seus tipos; destaque "pausa e classifique: canal e status".
7. **Dicionário de dados: o manual de instruções** — bullets: explica coluna por coluna; onde encontrar no portal; regra: dicionário primeiro, dado depois; sem dicionário = sinal amarelo.
8. **Armadilhas 1 e 2: faltantes e duplicatas** — bullets: faltante sempre existe — pergunte se tem padrão; "N/D", vazio, "SEM INFORMAÇÃO"; duplicata infla contagem; procure o identificador único.
9. **Armadilhas 3 e 4: datas mistas e encoding** — bullets: "05/03/2026" × "2026-03-05"; padronizar antes de analisar; "SÃ£o Paulo" = codificação errada, não dado ruim; solução: parâmetro de encoding (prática 1.4).
10. **Armadilhas 5 e 6: separador e unidades** — bullets: CSV brasileiro adora ponto e vírgula; tudo numa coluna só? é o separador; reais × milhares de reais; o dicionário responde.
11. **O ritual das 5 perguntas** — lista numerada: 1) cada linha é o quê? 2) tipos das colunas? 3) li o dicionário? 4) faltantes/duplicatas? 5) datas, acentos, separador, unidades?
12. **Cinco perguntas, cinco minutos** — frase de efeito: "os erros caros não estão no modelo sofisticado — estão na base que ninguém conferiu".
13. **Próxima parada: Google Colab** — bullets: Python no navegador, zero instalação; notebook pronto e comentado; friozinho na barriga é aprendizado.

---

## Aula 1.4 — Sua primeira análise em Python: os chamados do SP156 no Colab

**Tipo:** prática · **Duração:** 2h · **Ferramenta:** Google Colab

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Executar** (aplicar) células de código em um notebook do Google Colab. 2. **Inspecionar** (aplicar/analisar) um DataFrame com `head()`, `shape` e `info()`. 3. **Calcular** (aplicar) contagens e médias agrupadas com `value_counts()` e `groupby()`. 4. **Interpretar** (analisar) os resultados como resposta a uma pergunta de gestão. 5. **Adaptar** (criar) o código do desafio final para responder uma pergunta nova. |
| **Duração** | ~2h (setup 15min + trilha guiada 75min + desafio 30min) |
| **Materiais** | Notebook starter `analise-dados-estrategica-pratica-modulo1.ipynb` (disponível na plataforma em `/cursos/notebooks/`); conta Google; dicionário de colunas incluído no próprio notebook |
| **Sequência didática** | **Abertura:** contexto da pergunta de gestão + setup do Colab. **Desenvolvimento:** execução guiada célula a célula (carregar → inspecionar → agregar → visualizar → interpretar). **Fechamento:** desafio autônomo + postagem do resultado no fórum. |
| **Avaliação** | Critérios de conclusão (checklist abaixo) + envio do link do notebook (Compartilhar > qualquer pessoa com o link) na plataforma. |

### d) Prática guiada — passo a passo

**Pergunta de gestão da prática:** *"Quais serviços a população mais solicita e onde o atendimento demora mais?"*

**Dados:** amostra didática embutida no notebook, inspirada no formato do dataset real **"Dados do SP156"** do Portal de Dados Abertos da Prefeitura de São Paulo (https://dados.prefeitura.sp.gov.br — busque por "SP156"). A última seção do notebook mostra como carregar o CSV real do portal quando você quiser ir além.

1. Baixe o notebook da aula na plataforma (botão "Materiais" → `analise-dados-estrategica-pratica-modulo1.ipynb`).
2. Acesse https://colab.research.google.com e faça login com sua conta Google.
3. No Colab, clique em **Arquivo → Fazer upload de notebook** e selecione o arquivo baixado.
4. Leia a primeira célula (texto de boas-vindas) e execute a célula de importações clicando no **botão ▶** à esquerda dela (ou `Ctrl+Enter`). Aguarde o ícone de "concluído". *Checkpoint: nenhuma mensagem de erro em vermelho.*
5. Execute a célula que carrega os dados de exemplo. Ela cria a tabela `df` com os chamados. *Checkpoint: a saída informa quantos chamados foram carregados.*
6. Execute `df.head()` e compare o que você vê com a Aula 1.3: identifique qual é a granularidade (cada linha é o quê?).
7. Execute a célula de `shape` e `info()`. Anote: quantas linhas? Quantas colunas? Algum valor faltante?
8. Execute a célula de `value_counts()` da coluna `servico`. Escreva em uma frase: qual serviço lidera as solicitações?
9. Execute a célula de contagem por `distrito` com gráfico de barras. Observe o eixo: qual distrito concentra mais chamados?
10. Execute a célula de tempo médio de resolução por serviço (`groupby` + `mean`). Repare que o serviço mais *pedido* não é necessariamente o mais *demorado*.
11. Leia a célula de interpretação ("O que isso diz para o gestor?") e confirme que cada conclusão vem de uma célula que você executou.
12. **Desafio final (célula com TODOs):** complete o código para descobrir (a) o canal de atendimento mais usado e (b) o distrito com maior tempo médio de resolução, e gere um gráfico de barras desse ranking. Dica: os padrões são os mesmos dos passos 8–10.
13. Escreva, na célula de texto final, **duas frases de recomendação** para um gestor com base no que você encontrou.
14. Compartilhe: botão **Compartilhar → Qualquer pessoa com o link → Leitor**, copie o link e envie na atividade da plataforma. Poste também sua recomendação no fórum da aula.

**Critérios de conclusão (checklist do aluno):**

- [ ] Todas as células executam sem erro, de cima a baixo (`Ambiente de execução → Executar tudo`).
- [ ] Respondi à pergunta: qual serviço lidera e qual distrito concentra mais chamados.
- [ ] Completei os dois TODOs do desafio e o gráfico do ranking aparece.
- [ ] Escrevi 2 frases de recomendação na célula final.
- [ ] Enviei o link compartilhável do notebook na plataforma.

**Problemas comuns e socorro rápido:**

- *"Célula travada em execução"* → menu **Ambiente de execução → Reiniciar sessão** e execute de novo desde o topo.
- *"NameError: df is not defined"* → você pulou a célula que cria o `df`; execute as células na ordem.
- *Acentos estranhos ao carregar o CSV real do portal* → use o parâmetro `encoding` mostrado na última seção do notebook (armadilha 4 da Aula 1.3!).

---

## Aula 1.5 — Quiz do Módulo 1 — Fundamentos e dados abertos

**Tipo:** quiz · **Duração:** 15min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos** | Verificar a fixação dos conceitos do módulo (decisão orientada por dados, portais, anatomia de dataset, Colab). |
| **Formato** | 5 questões objetivas, 3 alternativas, correção automática com explicação; 2 tentativas; nota mínima 70% (compõe a média de quizzes). |

### Questões (com gabarito)

**Q1.** O que melhor caracteriza uma decisão orientada por dados?
- a) Substituir totalmente a experiência do gestor por relatórios automáticos.
- b) Combinar a experiência de quem decide com evidências extraídas dos dados. ✅
- c) Só decidir quando houver dados perfeitos e completos.

*Explicação: dados disciplinam a intuição, não a substituem — e dados perfeitos não existem; decide-se com a melhor evidência disponível.*

**Q2.** Você precisa de camadas de mapa da cidade de São Paulo (equipamentos públicos, zoneamento, ciclovias). Qual portal é a fonte mais direta?
- a) GeoSampa. ✅
- b) dados.gov.br.
- c) NotebookLM.

*Explicação: o GeoSampa é o mapa digital oficial da cidade, com camadas geográficas para download. O dados.gov.br é um catálogo geral, e o NotebookLM é uma ferramenta de IA, não uma fonte de dados.*

**Q3.** Em uma tabela organizada (*tidy*), cada linha representa:
- a) Uma variável do fenômeno estudado.
- b) Uma observação (um registro, como um chamado do 156). ✅
- c) Um gráfico da análise.

*Explicação: linhas são observações; colunas são variáveis. No SP156, cada linha é um chamado.*

**Q4.** Você abre um CSV e a coluna de datas mistura "05/03/2026" e "2026-03-05". Qual o primeiro passo correto?
- a) Excluir as linhas com o formato menos frequente.
- b) Padronizar o formato das datas antes de qualquer análise. ✅
- c) Calcular a média das datas para preencher os valores.

*Explicação: formatos mistos fazem o computador tratar a mesma data como textos diferentes (armadilha 3). Padronizar preserva os dados; excluir joga informação fora.*

**Q5.** Por que este curso usa o Google Colab nas práticas de Python?
- a) Porque ele roda Python no navegador, sem instalar nada no computador. ✅
- b) Porque é a única forma que existe de executar Python.
- c) Porque ele dispensa a necessidade de entender os dados.

*Explicação: o Colab é um ambiente gratuito de notebooks no navegador — perfeito para a proposta "zero instalação". Python roda em muitos outros lugares, e nenhuma ferramenta dispensa o entendimento dos dados.*
