# Módulo 6 — IA copilota, ética e projeto final

**Curso:** Análise de Dados para Decisões Estratégicas · Giselle Falcão Academy
**Carga do módulo:** 5h30 · **Aulas:** 2 vídeos, 1 leitura, 2 práticas (NotebookLM e Looker Studio)

**Objetivo geral do módulo:** ao final, o aluno usa IA generativa como copilota da análise (nunca como fonte de números), verifica cada saída da IA contra as fontes originais, reconhece os limites legais e éticos do uso de dados na gestão pública (LGPD) e integra todas as etapas do curso em um projeto autoral: do dado aberto à recomendação estratégica, com dashboard, sumário executivo e apresentação de 5 minutos.

**Avaliação somativa do módulo:** o projeto final (Aula 6.5), corrigido por rubrica com feedback individual. As 5 questões do banco do módulo (ao final deste documento) funcionam como autoavaliação de prontidão antes do projeto.

---

## Aula 6.1 — IA generativa na análise de dados: copilota, não piloto

**Tipo:** vídeo · **Duração:** 20min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Identificar** (compreender) os quatro usos em que a IA generativa acelera o fluxo de análise: explicar código, sugerir consultas e fórmulas, resumir documentos e rascunhar textos. 2. **Reconhecer** (analisar) os modos de falha confiante da IA: números inventados, fontes fantasma, código plausível-porém-errado e conhecimento desatualizado. 3. **Aplicar** (aplicar) o protocolo da casa — *a IA propõe, o dado confirma, você assina* — a um caso concreto de uso. 4. **Julgar** (avaliar) quando um uso de IA é aceitável ou inaceitável em um contexto de gestão pública. |
| **Duração** | 20 min de vídeo + ~10 min de experimento guiado no fórum |
| **Materiais** | Slides (12); acesso a um assistente de IA generativa (Gemini, ChatGPT ou equivalente) para o experimento; link do Portal de Dados Abertos de SP para a verificação |
| **Sequência didática** | **Abertura (0–1:40):** balanço da jornada até aqui; a pergunta "a IA não faz tudo isso sozinha?". **Desenvolvimento (1:40–17:30):** onde a IA entra no ciclo dado→decisão → os 4 usos que aceleram → os 4 modos de falha confiante → o experimento do número inventado → o protocolo da casa e as 4 regras de ouro → a IA dentro das nossas ferramentas (Gemini no Colab/Sheets, NotebookLM). **Fechamento (17:30–20:00):** síntese, tarefa do experimento, ponte para a prática de NotebookLM. |
| **Avaliação** | Formativa: experimento do fórum (pedir um número a um chatbot e verificá-lo na fonte oficial). Somativa: questão 1 do banco do módulo + critério "uso documentado de IA" da rubrica do projeto final. |

### b) Roteiro de gravação

> Tom: professora experiente conversando. Ler no teleprompter com naturalidade — pausas nos "…", sorrir nos parênteses de conexão. **[CÂMERA]** = rosto na tela; **[SLIDE n]** = mostrar slide.

**[0:00–1:40] — [CÂMERA] Abertura**

Oi! Se você chegou até aqui… respira e olha para trás um segundo. Você já limpou uma base real de chamados do 156, já escolheu entre média e mediana com critério, já escreveu SQL no BigQuery e já publicou um dashboard no Looker Studio. Isso não é pouco. Isso é mais do que muita equipe técnica por aí entrega.

E agora chegou a hora da pergunta que provavelmente está na sua cabeça desde o módulo 1: "Giselle… e a inteligência artificial? Ela não faz tudo isso sozinha?" É uma pergunta justa — estamos em 2026, a IA generativa está em todo lugar, inclusive dentro das ferramentas que a gente usou neste curso. E a minha resposta vai ser honesta, porque eu trabalho com IA todos os dias, nos meus projetos de consultoria no agro, na indústria, na logística. A resposta é: a IA é a melhor copilota que você já teve. E é um péssimo piloto. Nesta aula, eu te mostro a diferença — e te entrego o protocolo que eu uso nos meus próprios projetos.

**[1:40–4:00] — [SLIDE 2 → SLIDE 3] Onde a IA entra no ciclo**

[SLIDE 2] Lembra do nosso ciclo do módulo 1? Dado → informação → conhecimento → decisão. A pergunta certa não é "a IA substitui esse ciclo?". É: "em qual etapa a IA ajuda, e em qual ela atrapalha?". [SLIDE 3] E aqui vai o mapa. Nas etapas de **transformação** — organizar, traduzir, resumir, rascunhar — a IA é excelente. Nas etapas de **verdade** — qual é o número real, qual é a fonte, o que aconteceu de fato — a IA generativa, sozinha, não é confiável. Porque ela não consulta o Portal de Dados Abertos quando você pergunta. Ela gera o texto mais *plausível* com base no que aprendeu. Plausível não é sinônimo de verdadeiro. Guarda essa frase, porque ela resume a aula inteira.

A metáfora que eu uso com os meus clientes é a do copiloto de rali. O copiloto lê o mapa, antecipa a curva, sugere o caminho — e acelera demais a sua vida. Mas quem está com a mão no volante, e quem responde pelo carro, é você. Na gestão pública isso é ainda mais sério: é o seu nome que assina o relatório, o ofício, a nota técnica. Não dá para escrever embaixo "foi a IA".

**[4:00–8:00] — [SLIDE 4 → SLIDE 5 → SLIDE 6] Os quatro usos que aceleram de verdade**

[SLIDE 4] Vamos ao lado bom, que é enorme. Quatro usos em que a IA de 2026 brilha no nosso fluxo. **Uso um: explicar código.** Você abre o notebook do Colab do módulo 3, encontra uma linha de `groupby` que não entendeu… e pergunta. "Explica essa linha como se eu fosse iniciante." A explicação vem na hora, no seu ritmo, sem vergonha de perguntar de novo. Isso, para quem está aprendendo, vale ouro. O Colab, aliás, já vem com o Gemini embutido exatamente para isso.

**Uso dois: sugerir consultas e fórmulas.** Você descreve em português — "quero o total de chamados por distrito, só de 2025, ordenado do maior para o menor" — e a IA rascunha o SQL ou a fórmula do Sheets. [SLIDE 5] Repara no verbo que eu usei: *rascunha*. Você aprendeu SQL no módulo 4 justamente para isto: para **ler** o que a IA propõe e dizer "isso está certo" ou "isso está errado". Quem não sabe ler SQL vira refém da sugestão. Quem sabe, vira revisor — e revisor com copilota é uma dupla rapidíssima.

**Uso três: resumir documentos longos.** Relatório de gestão de 200 páginas, plano de metas, ata de audiência pública… a IA transforma horas de leitura em minutos de triagem. É o tema da nossa próxima aula prática, com o NotebookLM — que tem uma vantagem especial que eu já te conto.

**Uso quatro: primeiras versões de texto.** [SLIDE 6] O sumário executivo, o e-mail para o secretário, a legenda do gráfico. A IA rascunha em trinta segundos o que você levaria trinta minutos para começar. Mas atenção à palavra de novo: *primeira versão*. Nos meus projetos, eu vejo isso direto: o texto da IA é um ótimo ponto de partida e um péssimo ponto de chegada. Ele vem genérico, vem sem o seu contexto, e às vezes vem com um número que você nunca calculou. O que nos leva ao lado escuro.

**[8:00–12:00] — [SLIDE 7 → SLIDE 8] Onde a IA erra com confiança**

[SLIDE 7] Agora o bloco mais importante da aula. A IA generativa não erra como um estagiário, que fica inseguro e pergunta. Ela erra **com confiança**. Quatro modos de falha que você precisa reconhecer de longe.

**Falha um: números inventados.** Você pergunta "quantos chamados o SP156 recebeu em 2025?" e recebe um número exato, redondo, convincente… que a IA acabou de gerar. Ela não abriu o portal. Ela produziu o texto mais provável. Esse fenômeno tem nome — alucinação — e ele não é um defeito raro: é da natureza da ferramenta.

**Falha dois: fontes fantasma.** Você pede a referência e ela cita um relatório com título verossímil, órgão verossímil, ano verossímil… que não existe. Eu já recebi de aluno citação de "relatório da Prefeitura" que nunca foi publicado. Se você não confere, você assina uma fonte fantasma com o seu nome.

[SLIDE 8] **Falha três: código plausível-porém-errado.** A consulta SQL roda sem erro, o gráfico aparece bonito… e a lógica está errada — um filtro que ficou faltando, uma média onde devia ser mediana, um JOIN que duplicou linhas. Roda sem erro não significa que está certo. Você aprendeu o teste do total no módulo 2 exatamente para isso.

**Falha quatro: conhecimento desatualizado.** A IA foi treinada até uma certa data. Pergunte sobre a estrutura atual das subprefeituras, sobre a legislação mais recente, sobre o dado do mês passado — e ela pode responder com o mundo de dois anos atrás, no mesmo tom seguro de sempre.

E aqui vai o experimento que eu quero que você faça hoje, de verdade: pergunte a um chatbot genérico um número específico da sua cidade — qualquer um. Depois vá ao portal oficial e confira. Na maioria das vezes, o número não bate. Fazer esse teste uma vez com as próprias mãos vacina melhor que dez aulas minhas.

**[12:00–15:00] — [SLIDE 9 → SLIDE 10] O protocolo da casa**

[SLIDE 9] Então como usar essa ferramenta poderosa sem se queimar? Com o protocolo da casa, três passos: **a IA propõe, o dado confirma, você assina.** A IA propõe: a consulta, o resumo, o rascunho. O dado confirma: todo número, todo fato, toda citação que for para um documento passa pela fonte oficial — o portal, a sua planilha, o seu notebook. E você assina: a responsabilidade final é sua, com o seu nome, e isso não se delega.

[SLIDE 10] Do protocolo saem quatro regras de ouro. **Regra um: número sem fonte não entra em documento.** Nunca. **Regra dois: nunca cole dados pessoais em ferramenta de IA** que não seja contratada e autorizada pela sua instituição — nome, CPF, endereço, prontuário. Isso é LGPD, é o tema da leitura da aula 6.3, e é o tipo de erro que encerra carreira. **Regra três: peça saídas verificáveis.** Em vez de "me dê os números", diga "me dê a consulta que calcula isso" — porque consulta você roda e confere. **Regra quatro: documente o uso.** No seu diário de limpeza, no rodapé do relatório: "rascunho inicial gerado com IA, revisado e verificado pela equipe". Transparência protege você.

**[15:00–17:30] — [SLIDE 11] A IA dentro das nossas ferramentas**

[SLIDE 11] E onde essa copilota mora, na prática, na nossa caixa de ferramentas? Em 2026, ela está embutida em quase tudo que usamos no curso: o **Gemini no Colab** explica e sugere código; no **Sheets**, ajuda com fórmulas; no **BigQuery**, rascunha SQL a partir de português. E tem o **NotebookLM**, que é um caso especial — e especial para melhor. Ele responde **somente com base nos documentos que você carregar**, e cada afirmação vem com citação clicável do trecho original. É a IA com coleira curta: ela ainda pode resumir mal, mas não pode inventar de onde tirou. Na próxima aula, que é prática, você vai carregar relatórios reais da Prefeitura de São Paulo no NotebookLM e interrogá-los — inclusive tentando pegar a IA em um resumo impreciso. Eu adoro essa prática, porque ela transforma desconfiança em método.

**[17:30–20:00] — [CÂMERA] Fechamento**

Recapitulando em três frases. A IA generativa acelera as etapas de transformação — explicar, sugerir, resumir, rascunhar — e falha nas etapas de verdade. Ela erra com confiança: número inventado, fonte fantasma, código plausível, mundo desatualizado. E o antídoto cabe numa linha: **a IA propõe, o dado confirma, você assina.**

Eu vejo isso direto nos meus projetos: as equipes que mais extraem valor da IA não são as que mais confiam nela — são as que mais **verificam**. Confiança cega gera retrabalho; verificação disciplinada gera velocidade.

Sua tarefa de hoje é o experimento: pergunte um número específico da sua cidade a um chatbot, confira no portal oficial e poste no fórum o que encontrou — bateu ou não bateu, e por quanto. Na próxima aula, a gente coloca a coleira na IA: NotebookLM, relatórios públicos de verdade e citação por citação. Te vejo lá. Um abraço!

### c) Estrutura de slides (12 slides)

1. **Capa** — "IA generativa na análise de dados: copilota, não piloto" · Módulo 6 · Aula 1 · logo Giselle Falcão Academy (fundo roxo, título em lavanda).
2. **A pergunta de 2026** — bullets: "a IA não faz tudo isso sozinha?"; resposta honesta: melhor copilota, péssimo piloto; quem assina o relatório é você.
3. **Onde a IA entra no ciclo** — diagrama dado → informação → conhecimento → decisão com duas faixas: etapas de TRANSFORMAÇÃO (IA excelente) × etapas de VERDADE (IA sozinha não é confiável); frase: "plausível ≠ verdadeiro".
4. **Uso 1 e Uso 2: explicar código · sugerir consultas** — bullets: "explica essa linha como se eu fosse iniciante"; português → rascunho de SQL/fórmula; a IA rascunha, você revisa; saber ler SQL = deixar de ser refém.
5. **Você é o revisor** — frase de efeito: "quem não sabe ler a sugestão vira refém dela; quem sabe, vira revisor — e revisor com copilota é uma dupla rapidíssima".
6. **Uso 3 e Uso 4: resumir documentos · rascunhar textos** — bullets: 200 páginas → minutos de triagem; primeira versão de sumários e e-mails; ótimo ponto de partida, péssimo ponto de chegada.
7. **Falhas 1 e 2: números inventados · fontes fantasma** — bullets: número exato, redondo, convincente… e gerado; alucinação é da natureza da ferramenta; citação verossímil de relatório que não existe; conferir antes de assinar.
8. **Falhas 3 e 4: código plausível-errado · mundo desatualizado** — bullets: roda sem erro ≠ está certo (filtro faltando, média × mediana, JOIN duplicando); treinamento tem data de corte; mesmo tom seguro para o mundo de 2 anos atrás.
9. **O protocolo da casa** — três blocos grandes (teal sobre lavanda): A IA PROPÕE → O DADO CONFIRMA → VOCÊ ASSINA.
10. **As 4 regras de ouro** — lista numerada: 1) número sem fonte não entra em documento; 2) dado pessoal nunca vai para IA não autorizada (LGPD → aula 6.3); 3) peça saídas verificáveis (a consulta, não o número); 4) documente o uso de IA.
11. **A copilota dentro das nossas ferramentas** — bullets: Gemini no Colab (explicar/sugerir código), no Sheets (fórmulas), no BigQuery (SQL a partir de português); NotebookLM = IA com coleira: só responde com base nos SEUS documentos, com citação clicável.
12. **Tarefa + próxima parada** — "Experimento: pergunte um número da sua cidade a um chatbot → confira no portal oficial → poste no fórum (bateu? por quanto?)" + teaser: NotebookLM na prática.

---

## Aula 6.2 — NotebookLM na prática: interrogando relatórios públicos

**Tipo:** prática · **Duração:** 1h20 · **Ferramenta:** NotebookLM

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Operar** (aplicar) o NotebookLM: criar um caderno e carregar documentos públicos como fontes. 2. **Formular** (aplicar) perguntas orientadas a decisão sobre relatórios de gestão. 3. **Verificar** (avaliar) cada citação da IA contra o trecho original do documento. 4. **Detectar** (analisar/avaliar) ao menos uma imprecisão ou perda de nuance em um resumo gerado por IA. 5. **Produzir** (criar) um resumo orientado a decisão com todos os números conferidos. |
| **Duração** | ~1h20 (setup 10min + trilha guiada 45min + desafio 25min) |
| **Materiais** | Conta Google; https://notebooklm.google.com; PDFs do Programa de Metas 2025–2028 da Prefeitura de SP e do relatório de execução mais recente (links abaixo; a plataforma do curso mantém cópias estáveis) |
| **Sequência didática** | **Abertura:** por que "IA com coleira" muda o jogo (ponte com a aula 6.1). **Desenvolvimento:** carregar fontes → perguntas com citação → teste da pergunta fora das fontes → resumo orientado a decisão → conferência número a número. **Fechamento:** desafio da imprecisão + postagem no fórum. |
| **Avaliação** | Critérios de conclusão (checklist abaixo) + postagem no fórum do par "frase da IA × trecho original". Somativa: questão 2 do banco do módulo. |

### d) Prática guiada — passo a passo

**Pergunta de gestão da prática:** *"O que o Programa de Metas da Prefeitura de São Paulo promete para a minha área de interesse — e o que os relatórios de execução mostram até agora?"*

**Dados/documentos (fontes reais):**
- **Programa de Metas 2025–2028 da Prefeitura de São Paulo** (PDF) — disponível no Planeja Sampa: https://planejasampa.prefeitura.sp.gov.br (busque "Programa de Metas"). O programa é a lista oficial de compromissos da gestão, com indicadores e valores-alvo por meta.
- **Relatório de execução do Programa de Metas** mais recente (PDF, no mesmo portal).
- *Aviso: links de governo mudam de endereço. Se um link quebrar, busque "Programa de Metas São Paulo" — e a plataforma do curso mantém cópia estável dos dois PDFs na página desta aula.*

1. Baixe os dois PDFs (Programa de Metas 2025–2028 e o relatório de execução mais recente) pelos links acima ou pelos botões "Materiais" da plataforma.
2. Acesse https://notebooklm.google.com e faça login com sua conta Google.
3. Clique em **Criar novo** (novo caderno) e nomeie: `Metas da Prefeitura de SP — [seu nome]`.
4. Em **Fontes → Adicionar fonte**, faça upload dos dois PDFs. Aguarde o processamento. *Checkpoint: as duas fontes aparecem listadas no painel esquerdo, com resumo automático gerado.*
5. Leia o resumo automático do caderno. Repare: cada afirmação se refere aos documentos carregados — o NotebookLM só responde com base nas fontes que você deu a ele.
6. Faça a **pergunta 1** no chat: `Quais metas tratam de zeladoria urbana e qual é o indicador e o valor-alvo de cada uma?` Leia a resposta e **clique em cada número de citação** para abrir o trecho original do PDF. *Checkpoint: você localizou no documento original pelo menos duas das metas citadas.*
7. Faça a **pergunta 2**, sobre a SUA área de interesse (saúde, educação, mobilidade, habitação…): `Quais metas tratam de [tema]? Liste número da meta, indicador, valor-alvo e prazo.` Confira as citações da mesma forma.
8. Faça a **pergunta 3**, cruzando os dois documentos: `Segundo o relatório de execução, qual é o status das metas de [tema] e quais estão mais atrasadas?` Observe que a resposta agora cita o segundo PDF.
9. **Teste da coleira:** pergunte algo que NÃO está nos documentos, por exemplo: `Quantos chamados o SP156 recebeu em 2025?` *Checkpoint: o NotebookLM responde que as fontes não contêm essa informação — compare esse comportamento com o chatbot genérico do experimento da aula 6.1.*
10. Gere o **resumo orientado a decisão**. Cole este prompt no chat: `Escreva um resumo de até 10 linhas, para um secretário municipal, sobre as metas de [tema]: o que foi prometido (com números e prazos) e o que o relatório de execução mostra. Indique a fonte de cada número.`
11. **Conferência número a número:** abra os PDFs e verifique, um a um, todos os números do resumo (use Ctrl+F no PDF). Marque: confere / não confere / confere mas perde contexto.
12. **Desafio final:** encontre ao menos **uma afirmação em que o resumo da IA é impreciso ou perde nuance** — um número aproximado, uma meta parcial descrita como concluída, um prazo omitido, uma condição ("desde que…", "exceto…") que sumiu. Esse tipo de perda é comum mesmo com citações corretas: a citação aponta o trecho certo, mas o resumo o comprime demais.
13. Documente o achado em duas linhas: **(a)** a frase da IA; **(b)** o trecho original do documento. Poste o par no fórum da aula, junto com uma reflexão de uma frase: o que esse achado muda no seu uso de IA?

**Critérios de conclusão (checklist do aluno):**

- [ ] Criei o caderno no NotebookLM com as duas fontes carregadas.
- [ ] Fiz as 3 perguntas guiadas e cliquei nas citações, localizando os trechos no PDF original.
- [ ] Executei o teste da pergunta fora das fontes e observei a resposta.
- [ ] Gerei o resumo orientado a decisão e conferi TODOS os números contra os PDFs.
- [ ] Encontrei e documentei 1 imprecisão ou perda de nuance (frase da IA × trecho original).
- [ ] Postei o par no fórum com a reflexão de uma frase.

**Problemas comuns e socorro rápido:**

- *"O upload do PDF falha ou trava"* → verifique o tamanho do arquivo; se necessário, use as cópias otimizadas disponíveis na plataforma do curso.
- *"A resposta veio genérica, sem citações"* → reformule a pergunta pedindo explicitamente números, metas e prazos; perguntas específicas geram respostas ancoradas.
- *"Não encontro nenhuma imprecisão no desafio"* → compare o resumo com as **condições e ressalvas** do texto original (prazos parciais, "em andamento" × "concluída", notas de rodapé). É aí que os resumos mais perdem nuance.
- *"O documento do portal mudou de versão"* → use as cópias estáveis da plataforma; registre no fórum qual versão você usou.

---

## Aula 6.3 — LGPD, ética e limites do uso de dados na gestão pública

**Tipo:** leitura · **Duração:** 40min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Definir** (lembrar/compreender) dado pessoal, dado pessoal sensível, dado anonimizado e dado agregado nos termos da LGPD. 2. **Explicar** (compreender) por que o poder público pode tratar dados sem consentimento — e quais deveres vêm junto. 3. **Analisar** (analisar) riscos de reidentificação em bases publicadas, incluindo o cruzamento de bases e as células pequenas. 4. **Aplicar** (aplicar/avaliar) o checklist ético de publicação a uma análise própria antes de divulgá-la. |
| **Duração** | ~40 min de leitura + aplicação do checklist |
| **Materiais** | Texto na plataforma (estrutura abaixo); link da Lei nº 13.709/2018 (planalto.gov.br); checklist ético para download (PDF de 1 página) |
| **Sequência didática** | **Abertura:** o caso do relato do 156 com telefone no meio do texto. **Desenvolvimento:** o que é a LGPD → os quatro tipos de dado → bases legais e o poder público → reidentificação → IA e dados pessoais → checklist ético. **Fechamento:** aplicar o checklist ao dataset do próprio projeto final. |
| **Avaliação** | Formativa: checklist aplicado ao dataset escolhido para o projeto final (postar no fórum: "meu dataset passou nos 7 itens? qual exigiu ação?"). Somativa: questões 3 e 4 do banco do módulo + item de conformidade da rubrica do projeto. |

### Estrutura do texto da leitura (para redação na plataforma)

1. **Abertura (2 parágrafos).** Cena concreta: um analista vai publicar um dashboard de chamados do 156 e, na coluna de descrição em texto livre, encontra: "moro na rua X, nº Y, meu telefone é Z, venham logo". O dado é aberto; o telefone da moradora não deveria ser. A leitura responde: onde passa a linha entre transparência (dever do Estado) e privacidade (direito da cidadã) — e como o analista fica do lado certo das duas.
2. **O que é a LGPD e a quem ela se aplica (3 parágrafos).** Lei Geral de Proteção de Dados — Lei nº 13.709/2018, em vigor desde 2020, com sanções aplicáveis desde 2021; fiscalizada pela **ANPD** (Autoridade Nacional de Proteção de Dados). Aplica-se a qualquer tratamento de dados pessoais, **inclusive pelo poder público** — municípios, autarquias, empresas públicas. "Tratamento" é amplo: coletar, armazenar, cruzar, publicar, até excluir. Ponto-chave para o aluno: a LGPD não é inimiga da transparência — LAI e LGPD convivem; o que a LGPD protege é a *pessoa identificável*, não o *número agregado*.
3. **Os quatro tipos de dado que o analista precisa distinguir (seção-chave, com tabela).**
   - **Dado pessoal** (art. 5º, I): informação relacionada a pessoa natural identificada **ou identificável** — nome, CPF, endereço, telefone, e-mail, placa, e também combinações que apontam para alguém.
   - **Dado pessoal sensível** (art. 5º, II): origem racial ou étnica, convicção religiosa, opinião política, dado de saúde, vida sexual, dado genético ou biométrico. Proteção reforçada; na gestão pública aparece em saúde, assistência social, educação.
   - **Dado anonimizado** (art. 5º, III e art. 12): passou por processo que impede a identificação **por meios técnicos razoáveis**. Em regra, sai do alcance da LGPD — *desde que a anonimização não seja reversível*.
   - **Dado agregado**: contagens, médias e totais por grupo ("1.200 chamados no distrito X"). É o terreno seguro do analista — e é onde vivem quase todas as análises deste curso.
   - Tabela-resumo: tipo · exemplo do SP156 · pode publicar? · cuidado principal.
4. **Por que o poder público não pede o seu consentimento (3 parágrafos).** As bases legais do art. 7º — consentimento é só UMA delas. Para a administração pública, a base típica é o **tratamento para execução de políticas públicas** (art. 7º, III, e Capítulo IV, arts. 23 a 30): a prefeitura não pede consentimento para registrar seu chamado no 156, sua matrícula escolar, seu atendimento na UBS. Mas essa dispensa vem com deveres: **finalidade pública específica**, **transparência ativa** (informar quais dados trata e para quê) e uso compatível com a finalidade da coleta. Tradução para o analista: você pode usar os dados do 156 para melhorar a zeladoria; não pode usar o telefone do relato para qualquer outra coisa.
5. **Reidentificação: quando o "anonimizado" volta a ter nome (seção crítica, 4–5 parágrafos).**
   - O mito do "só tirei o nome": remover a coluna de nome não anonimiza. Estudos clássicos mostram que a combinação **CEP + data de nascimento + sexo** identifica a grande maioria das pessoas de uma população — é o *efeito mosaico*: cada base publicada é uma peça; o cruzamento remonta a foto.
   - **Células pequenas**: numa tabela agregada, a célula "2 casos de [doença] no distrito Y, faixa etária Z" pode identificar alguém que os vizinhos conhecem. Prática consolidada em dados de saúde no Brasil: **suprimir ou agrupar contagens menores que 5** antes de publicar.
   - **Texto livre é campo minado**: o relato do cidadão no 156 pode conter nome, endereço exato, telefone, condição de saúde. Regra da casa: coluna de texto livre **não vai para dashboard público** sem revisão — prefira sempre os campos estruturados e os agregados.
   - **Geolocalização fina**: publicar lat/long exata de um atendimento domiciliar equivale a publicar o endereço. Agregue por distrito ou hexágono.
6. **IA generativa e dados pessoais (2 parágrafos).** Ponte com a aula 6.1, regra de ouro nº 2: colar uma planilha com nomes e CPFs num chatbot público é **tratamento de dados pessoais** — transferência para um terceiro sem base legal e sem contrato. Use apenas ferramentas contratadas/autorizadas pela instituição para qualquer dado não público; na dúvida, trabalhe com dados agregados ou fictícios ao pedir ajuda à IA (como fizemos nas práticas do curso).
7. **O checklist ético de publicação (seção final prática).** Antes de publicar qualquer análise, dashboard ou relatório, percorra os 7 itens: **(1)** O agregado responde à pergunta? (Se sim, não publique o dado individual.) **(2)** Alguma coluna identifica ou quase identifica alguém (nome, CPF, telefone, endereço, lat/long fina, placa)? **(3)** Existem células pequenas (<5) em recortes sensíveis? Suprimi ou agrupei? **(4)** Revisei todo texto livre que aparece no material? **(5)** A análise pode estigmatizar um território ou grupo ("distrito mais violento", "escola pior")? Como apresentar com contexto e sem rótulo? **(6)** Fontes, datas e limitações estão documentadas? **(7)** Algum dado pessoal passou por ferramenta de IA externa não autorizada? — Fechamento do checklist: ética não é freio da análise; é o que torna a análise **publicável e defensável**.
8. **Fechamento + atividade (2 parágrafos).** Síntese: trabalhe agregado, desconfie do "só tirei o nome", revise texto livre, documente tudo. Atividade: aplicar o checklist ao dataset escolhido para o projeto final e postar no fórum qual item exigiu ação. Ponte: "Na próxima aula, você aprende a transformar essa análise ética e verificada em uma apresentação que muda a decisão."

---

## Aula 6.4 — Storytelling com dados: a apresentação que muda a decisão

**Tipo:** vídeo · **Duração:** 20min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Estruturar** (aplicar/criar) uma apresentação executiva de 5 minutos no arco contexto → conflito → resolução. 2. **Formular** (criar) títulos de slide que afirmam a conclusão em vez de descrever o gráfico. 3. **Antecipar** (analisar) as três perguntas difíceis da audiência e preparar respostas com dados. 4. **Comunicar** (avaliar/criar) incerteza e limitações sem perder autoridade. |
| **Duração** | 20 min de vídeo + ~15 min de esboço do roteiro próprio |
| **Materiais** | Slides (12); template de roteiro de 5 minutos (download na plataforma); dashboard de zeladoria do módulo 5 como exemplo âncora |
| **Sequência didática** | **Abertura (0–1:30):** a análise que morre na gaveta. **Desenvolvimento (1:30–17:00):** por que boas análises falham → o arco contexto-conflito-resolução → os 5 minutos, minuto a minuto → um slide, uma ideia, título que afirma → as três perguntas difíceis → incerteza com autoridade. **Fechamento (17:00–20:00):** síntese + tarefa (esboçar o roteiro do projeto final). |
| **Avaliação** | Formativa: esboço do roteiro de 5 minutos postado na atividade. Somativa: questão 5 do banco do módulo + critério "recomendação acionável" da rubrica do projeto final. |

### b) Roteiro de gravação

**[0:00–1:30] — [CÂMERA] Abertura**

Oi de novo! Deixa eu te contar a cena mais triste da vida de um analista — e eu já vivi essa cena, lá no comecinho da minha carreira. Você passa duas semanas numa análise impecável. Base limpa, estatística correta, dashboard bonito. Aí chega a reunião… você apresenta vinte slides em quinze minutos, o decisor olha o celular duas vezes, diz "muito interessante, me manda por e-mail"… e nada muda. A análise morre na gaveta. O buraco continua na rua.

Hoje a gente resolve isso. Porque análise que não muda decisão é hobby — e você não chegou até o último módulo deste curso para ter um hobby. Esta aula é sobre a última milha: transformar a sua análise numa apresentação de **cinco minutos** que muda a decisão.

**[1:30–4:30] — [SLIDE 2 → SLIDE 3] Por que boas análises falham na reunião**

[SLIDE 2] Primeiro, o diagnóstico. Boas análises falham na reunião por três motivos. **Motivo um: o despejo de dados.** A gente se apaixona pelo processo e quer mostrar tudo — as três abas, os quatro gráficos, o JOIN heroico. Mas o decisor não quer ver o seu esforço; ele quer saber **o que fazer**. **Motivo dois: começar pelo método.** "Primeiro eu baixei o CSV, depois eu limpei as duplicatas…" — em três minutos você perdeu a sala. **Motivo três: terminar sem pedido.** A apresentação acaba e ninguém sabe o que precisa ser decidido, por quem, até quando.

[SLIDE 3] E aqui entra a mudança de mentalidade, que vem lá do módulo 5: a audiência **decide**, não admira. Antes de montar qualquer slide, três perguntas: quem decide? O que essa pessoa precisa saber — só o essencial? E qual decisão eu quero sair da sala tendo? Se você respondeu essas três, metade do trabalho está feito.

**[4:30–8:30] — [SLIDE 4 → SLIDE 5 → SLIDE 6] O arco: contexto → conflito → resolução**

[SLIDE 4] Agora a estrutura, e ela vem da coisa mais antiga do mundo: histórias. Toda história que prende tem três atos. **Contexto:** o mundo como ele é. **Conflito:** algo está errado, e ignorar tem custo. **Resolução:** o caminho para consertar. A apresentação executiva usa exatamente o mesmo arco — porque o cérebro do decisor, depois de um dia de reuniões, não processa relatório… mas processa história.

[SLIDE 5] Vamos aplicar ao nosso caso de zeladoria, o mesmo do dashboard do módulo 5. **Contexto:** "Nossa subprefeitura recebe em média 3.000 chamados de zeladoria por mês, e o prazo médio de resposta é de 12 dias." Uma frase, um número, todo mundo situado. **Conflito:** "Mas três distritos concentram 45% dos chamados e esperam o dobro do prazo — e são os mesmos três há seis meses." Sente o incômodo? Isso é o conflito: a diferença entre o que é e o que deveria ser, com número. **Resolução:** "Realocando duas equipes nos meses de pico, o prazo desses distritos cai para perto da média — e a proposta detalhada está aqui." Contexto, conflito, resolução. Três atos, três frases-âncora.

[SLIDE 6] E como isso vira cinco minutos? Minuto a minuto: **Minuto 1 — contexto:** a pergunta que você investigou e o cenário em um número. **Minutos 2 e 3 — conflito:** os dois ou três achados que doem, um gráfico por achado. **Minuto 4 — resolução:** a recomendação, com custo e benefício estimados. **Minuto 5 — o pedido:** a decisão que você precisa, de quem, até quando. Cinco minutos. Se te derem trinta, ótimo — mas o arco cabe em cinco, e reunião de decisor encolhe, nunca estica. Eu vejo isso direto nos meus projetos de consultoria: quem prepara cinco minutos impecáveis ganha os outros vinte e cinco de conversa boa.

**[8:30–11:00] — [SLIDE 7 → SLIDE 8] Um slide, uma ideia — e o título que afirma**

[SLIDE 7] Sobre os slides, duas regras que valem por um curso inteiro de design. **Regra um: um slide, uma ideia.** Se o slide precisa de "e também…", são dois slides. Cinco minutos, cinco ou seis slides, ponto. **Regra dois — e essa é a minha favorita: o título afirma a conclusão.** Compara comigo: título A: "Chamados por distrito — 2025". Título B: "Três distritos concentram 45% dos chamados". O título A descreve o gráfico; o título B **conclui**. Se o decisor ler só os títulos dos seus slides — e acredite, tem decisor que faz isso — ele tem que entender a história inteira.

[SLIDE 8] E dentro do slide? No máximo três números, e um deles em destaque — o *big number*, grande, que carrega a mensagem. O gráfico certo você já sabe escolher desde o módulo 5: ranking pede barras ordenadas, evolução pede linha. Aqui a novidade é a disciplina editorial: tudo que não sustenta a ideia do slide… sai.

**[11:00–14:00] — [SLIDE 9] As três perguntas difíceis**

[SLIDE 9] Agora, o que separa apresentador amador de profissional: o amador torce para não perguntarem; o profissional **prepara as respostas antes**. E as perguntas difíceis de uma sala de decisão são quase sempre as mesmas três. **Pergunta um: "posso confiar nesse dado?"** Resposta preparada: fonte, período, tratamento — "dados abertos do SP156, doze meses, limpeza documentada, posso mostrar o diário". **Pergunta dois: "quanto custa — e o que ganho?"** Se a sua recomendação não tem estimativa de custo e benefício, ela não é recomendação, é desejo. Mesmo uma estimativa grosseira e honesta é melhor que silêncio. **Pergunta três: "e se a gente não fizer nada?"** Essa é a sua amiga secreta — o custo da inação: "os três distritos seguem esperando 24 dias, e a tendência é piorar no verão, quando os chamados de chuva sobem". Prepare um slide de reserva para cada uma das três. Se ninguém perguntar, ótimo. Se perguntarem, você responde com dado — e a sala inteira percebe.

**[14:00–17:00] — [SLIDE 10 → SLIDE 11] Incerteza sem perder autoridade**

[SLIDE 10] Último bloco, e talvez o mais delicado: como falar de incerteza. Você aprendeu no módulo 3 que todo número tem margem, que amostra tem viés — quem liga para o 156 não é a cidade inteira. E aí vem o medo: "se eu mostrar as limitações, vão achar que o trabalho é fraco". É o contrário. Esconder limitação é fragilidade — porque alguém descobre, e aí a credibilidade não volta. Apresentar limitação com método é **autoridade**.

[SLIDE 11] A fórmula tem três partes: **afirme com convicção** o que o dado sustenta — "os dados apontam concentração persistente em três distritos"; **delimite com honestidade** — "o 156 mede demanda registrada, não necessidade total; regiões com menos acesso digital podem estar sub-representadas"; e **recomende mesmo assim** — "ainda com essa ressalva, a concentração é grande o bastante para justificar a realocação". Convicção no que o dado mostra, humildade no que ele não mostra, e decisão mesmo assim. Gestor bom reconhece esse padrão de longe — é assim que os melhores assessores falam.

**[17:00–20:00] — [CÂMERA] Fechamento**

Recapitulando. A apresentação que muda decisão tem arco: contexto, conflito, resolução — e termina com um pedido claro. Um slide, uma ideia, título que afirma. Três perguntas difíceis preparadas de antemão. E incerteza apresentada com método, que é o que transforma ressalva em autoridade.

Se você chegou até aqui, você está a uma aula do fim — e que aula: o projeto final, onde tudo o que a gente construiu em seis módulos vira **uma entrega sua**, com o seu nome. Sua tarefa de hoje já é o primeiro passo dele: pega o template de roteiro de 5 minutos na plataforma e esboça os três atos da história do SEU projeto — uma frase para o contexto, uma para o conflito, uma para a resolução. Não precisa estar perfeito; precisa estar começado.

Te espero na última aula. Vamos fechar esse ciclo juntos. Um abraço!

### c) Estrutura de slides (12 slides)

1. **Capa** — "Storytelling com dados: a apresentação que muda a decisão" · Módulo 6 · Aula 4.
2. **Por que boas análises morrem na gaveta** — bullets: despejo de dados (mostrar o esforço, não a decisão); começar pelo método; terminar sem pedido; "muito interessante, me manda por e-mail".
3. **A audiência decide, não admira** — 3 perguntas antes de qualquer slide: quem decide? o que precisa saber? qual decisão quero sair da sala tendo?
4. **O arco de três atos** — diagrama: CONTEXTO (o mundo como é) → CONFLITO (algo errado, com custo) → RESOLUÇÃO (o caminho); frase: "decisor cansado não processa relatório — processa história".
5. **O arco aplicado: zeladoria** — 3 frases-âncora: contexto: 3.000 chamados/mês, prazo médio 12 dias; conflito: 3 distritos = 45% dos chamados e o dobro do prazo, há 6 meses; resolução: realocar 2 equipes nos picos → prazo cai para perto da média.
6. **Os 5 minutos, minuto a minuto** — linha do tempo: min 1: contexto (pergunta + cenário em 1 número); min 2–3: conflito (2–3 achados, 1 gráfico cada); min 4: resolução (recomendação + custo/benefício); min 5: o pedido (decisão, de quem, até quando).
7. **Um slide, uma ideia — título que afirma** — antes/depois: "Chamados por distrito — 2025" × "Três distritos concentram 45% dos chamados"; regra: se o decisor ler só os títulos, entende a história.
8. **Dentro do slide** — bullets: máx. 3 números, 1 em destaque (big number); ranking = barras ordenadas, evolução = linha (módulo 5); o que não sustenta a ideia, sai.
9. **As três perguntas difíceis** — tabela: "posso confiar nesse dado?" → fonte + período + tratamento documentado; "quanto custa e o que ganho?" → estimativa honesta > silêncio; "e se não fizermos nada?" → o custo da inação; 1 slide de reserva para cada.
10. **Incerteza: esconder é fragilidade** — bullets: limitação escondida é descoberta — e a credibilidade não volta; limitação apresentada com método = autoridade; exemplo: 156 mede demanda registrada, não necessidade total.
11. **A fórmula da autoridade honesta** — 3 passos: afirme o que o dado sustenta → delimite o que ele não mostra → recomende mesmo assim; frase: "convicção no que o dado mostra, humildade no que ele não mostra, decisão mesmo assim".
12. **Tarefa + próxima parada** — "Esboce os 3 atos do SEU projeto final (1 frase por ato) no template da plataforma" + teaser: o projeto final.

---

## Aula 6.5 — Projeto final: do dado aberto à recomendação estratégica

**Tipo:** prática · **Duração:** 2h30 · **Ferramenta:** Looker Studio (+ Sheets/Colab/BigQuery e NotebookLM conforme o projeto)

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Formular** (criar) uma pergunta estratégica respondível com dados abertos. 2. **Executar** (aplicar) o ciclo completo: avaliação da base → limpeza documentada → análise descritiva → dashboard. 3. **Construir** (criar) um dashboard executivo no Looker Studio orientado a uma persona decisora. 4. **Sintetizar** (criar) os achados em um sumário executivo de 1 página e um roteiro de apresentação de 5 minutos. 5. **Autoavaliar** (avaliar) a entrega contra a rubrica e o checklist ético antes de submeter. |
| **Duração** | ~2h30 de execução (recomenda-se dividir em 2–3 sessões) + submissão |
| **Materiais** | Portais de dados do curso (links abaixo); Google Sheets/Colab; BigQuery sandbox (opcional); Looker Studio; NotebookLM (opcional, com uso documentado); template de sumário executivo e template de roteiro de 5 min (plataforma); rubrica de avaliação (abaixo) |
| **Sequência didática** | **Abertura:** escolha do dataset e da pergunta estratégica (com validação pelos critérios). **Desenvolvimento:** ritual de qualidade → limpeza com diário → análise → dashboard → sumário → roteiro. **Fechamento:** checklist ético + autoavaliação pela rubrica + submissão dos 3 entregáveis. |
| **Avaliação** | **Somativa (avaliação do módulo e do curso):** rubrica de 4 critérios (abaixo), nota mínima 70/100, feedback individual da equipe do curso em até 7 dias. Uma ressubmissão permitida após o feedback. |

### d) Prática guiada — passo a passo

**Sua missão:** *escolher um dataset aberto, definir uma pergunta estratégica e percorrer sozinho(a) o ciclo completo que você treinou em seis módulos — entregando dashboard, sumário executivo e roteiro de apresentação.*

**Fontes de dados aprovadas (escolha UMA como base principal):**

- **SP156 — chamados do cidadão** — https://dados.prefeitura.sp.gov.br (busque "SP156") — zeladoria, iluminação, limpeza, árvores…
- **InfoSiga SP — sinistros de trânsito** — https://infosiga.sp.gov.br — segurança viária no estado e na capital.
- **ObservaSampa — indicadores da cidade** — https://observasampa.prefeitura.sp.gov.br — saúde, educação, meio ambiente por distrito/subprefeitura.
- **Base dos Dados** — https://basedosdados.org — tabelas tratadas no BigQuery (educação, saúde, eleições, RAIS…), para quem quiser usar SQL.
- Outro dataset de portal público oficial é permitido **mediante aprovação prévia no fórum** (poste o link e a pergunta; a tutoria valida em até 48h).

1. **Escolha o dataset e a persona decisora.** Quem decide com base no seu trabalho? (Subprefeito, diretor de escola, coordenador de vigilância, secretário-adjunto…) Sem persona, não há projeto.
2. **Formule a pergunta estratégica** e valide pelos 3 critérios: **(a)** liga-se a uma decisão real (alocar, priorizar, investir, corrigir); **(b)** é respondível com as colunas que o dataset tem (confira o dicionário!); **(c)** tem recorte definido (período, território, serviço). Exemplo bom: "Em quais distritos e meses a subprefeitura X deveria reforçar as equipes de poda, considerando volume e tempo de resolução dos chamados?" Exemplo ruim: "Como está a zeladoria em SP?" (não liga a decisão nem tem recorte).
3. **Rode o ritual das 5 perguntas** do módulo 1 sobre a base: granularidade, tipos, dicionário, faltantes/duplicatas, coerência de datas/acentos/separador/unidades. Registre as respostas — elas abrem seu diário de limpeza.
4. **Limpe a base com o protocolo do módulo 2:** três abas (dados-brutos, trabalho, saída) no Sheets — ou, se preferir/precisar (base grande), o Colab ou o BigQuery sandbox. Trate duplicatas, vazios, textos e datas; crie as colunas derivadas de que sua pergunta precisa; **documente cada decisão no diário de limpeza** (ele será conferido na rubrica).
5. **Analise com a estatística do módulo 3:** pelo menos uma agregação ("calcule isto agrupado por aquilo") e uma medida de centro **justificada** — se a distribuição for assimétrica (tempos de resolução quase sempre são), use e defenda a mediana. Identifique os 2–3 achados que respondem à pergunta.
6. **(Opcional) Use SQL:** se a base vier da Base dos Dados ou for grande demais para o Sheets, faça as agregações no BigQuery sandbox (módulo 4) e exporte o resultado para o Sheets.
7. **Construa o dashboard no Looker Studio** (módulo 5): conecte a aba de saída (ou o resultado exportado); defina 3–5 KPIs para a persona; página de visão geral (scorecards + gráfico principal) e, se fizer sentido, página de detalhe com filtros de período/território; aplique o checklist de design do módulo 5 (regra dos 5 segundos, paleta sóbria, um destaque).
8. **Passe o checklist ético da aula 6.3** antes de publicar: agregados respondem? alguma coluna identifica alguém? células pequenas suprimidas? texto livre revisado? risco de estigmatizar território tratado com contexto? Ajuste o que for preciso.
9. **Escreva o sumário executivo de 1 página** (template na plataforma): pergunta e persona (2 linhas) → método em 3 linhas (fonte, período, tratamento) → 3 achados com números → ressalvas honestas (2 linhas, módulo 3 e aula 6.4) → recomendação acionável (o quê, quem, quando, custo/benefício estimado).
10. **Escreva o roteiro de apresentação de 5 minutos** no arco contexto → conflito → resolução (aula 6.4), minuto a minuto, incluindo as respostas preparadas para as três perguntas difíceis.
11. **(Opcional, recomendado) Use IA como copilota** — Gemini para rascunhar fórmulas/SQL, NotebookLM para contexto documental — e **documente o uso** no rodapé do sumário ("rascunho de X gerado com IA, verificado contra a fonte Y"), conforme o protocolo da aula 6.1. Uso não documentado de IA em números não verificados reprova no critério 2 da rubrica.
12. **Autoavalie pela rubrica** (abaixo), ajuste o que estiver em "insuficiente" e **submeta na plataforma**: (a) link do dashboard publicado (Compartilhar → qualquer pessoa com o link → Leitor); (b) sumário executivo em PDF; (c) roteiro de 5 minutos em PDF.

**Rubrica de avaliação (nota mínima: 70/100):**

| Critério | Exemplar (25) | Adequado (17) | Insuficiente (8) |
|----------|---------------|----------------|-------------------|
| **1. Pergunta clara e estratégica** | Liga-se a decisão real, com persona, recorte e relevância explícitos. | Pergunta respondível, mas persona ou recorte vagos. | Pergunta descritiva genérica, sem decisão associada. |
| **2. Dado tratado corretamente (auditável)** | Diário de limpeza completo; decisões justificadas; estatística adequada à distribuição; uso de IA (se houver) documentado e verificado. | Limpeza correta com documentação parcial; escolhas estatísticas aceitáveis. | Sem diário; duplicatas/vazios ignorados; média usada sem justificativa em distribuição assimétrica; número de IA sem verificação. |
| **3. Visual adequado** | Dashboard passa na regra dos 5 segundos; 3–5 KPIs; gráficos certos para cada pergunta; checklist ético cumprido. | Dashboard funcional com pequenos excessos ou hierarquia fraca. | Dashboard-enciclopédia, gráficos inadequados ou exposição de dado pessoal. |
| **4. Recomendação acionável** | Sumário e roteiro seguem o arco; recomendação com o quê/quem/quando e custo-benefício estimado; ressalvas honestas. | Recomendação clara, mas sem estimativa de custo/benefício ou sem ressalvas. | Termina em "os dados mostram que…" sem recomendação, ou recomendação sem ligação com os achados. |

**Critérios de conclusão (checklist do aluno):**

- [ ] Dataset aprovado e pergunta validada pelos 3 critérios (postada no fórum de abertura do projeto).
- [ ] Diário de limpeza preenchido, com o ritual das 5 perguntas respondido.
- [ ] Dashboard publicado no Looker Studio com 3–5 KPIs e link de leitor funcionando (teste em janela anônima).
- [ ] Checklist ético da aula 6.3 aplicado (7 itens) antes da publicação.
- [ ] Sumário executivo de 1 página com 3 achados numéricos, ressalva e recomendação acionável.
- [ ] Roteiro de 5 minutos no arco contexto → conflito → resolução, com as 3 perguntas difíceis respondidas.
- [ ] Uso de IA (se houver) documentado no rodapé do sumário.
- [ ] Três entregáveis submetidos na plataforma.

**Problemas comuns e socorro rápido:**

- *"Não consigo escolher a pergunta"* → volte à sua postagem do fórum do módulo 1 ("uma decisão do seu trabalho tomada no escuro") — o melhor projeto costuma estar lá.
- *"A base real é grande demais para o Sheets"* → use a amostra estável da plataforma, ou faça a agregação no BigQuery sandbox e traga só o resultado (módulo 4, prática 2).
- *"Meu dashboard ficou lotado"* → releia o slide do dashboard-enciclopédia (módulo 5): corte até sobrarem os 3–5 números que a persona decide com eles.
- *"O link do dashboard pede permissão"* → em Compartilhar, mude o acesso do relatório E da fonte de dados para "qualquer pessoa com o link".
- *"Não sei estimar custo/benefício"* → uma estimativa de ordem de grandeza, com premissas explícitas ("se cada equipe custa X/mês…"), vale mais que a ausência — diga que é estimativa.

---

## Banco de questões do Módulo 6 — IA, ética e comunicação (autoavaliação)

> O Módulo 6 não tem quiz-aula: a avaliação somativa é o projeto final por rubrica. As 5 questões abaixo compõem o banco do módulo na plataforma como **autoavaliação de prontidão** antes da submissão do projeto (correção automática, tentativas ilimitadas, sem nota).

### Questões (com gabarito)

**Q1.** Um gestor pergunta a um chatbot genérico "quantos chamados o SP156 recebeu em 2025?" e recebe um número exato e convincente. Qual é a atitude correta?
- a) Usar o número, pois a IA de 2026 tem acesso a todos os dados públicos.
- b) Tratar o número como não verificado e conferir na fonte oficial (Portal de Dados Abertos) antes de citá-lo. ✅
- c) Pedir ao próprio chatbot que confirme se o número está correto.

*Explicação: a IA generativa produz o texto mais plausível, não consulta o portal — e pode alucinar números e fontes com total confiança. Pedir confirmação à própria IA não verifica nada. O protocolo da casa: a IA propõe, o dado confirma, você assina.*

**Q2.** Qual é a principal vantagem do NotebookLM sobre um chatbot genérico para interrogar relatórios públicos?
- a) Ele responde com base apenas nos documentos carregados e cita o trecho de origem de cada afirmação. ✅
- b) Ele escreve resumos mais longos e em menos tempo.
- c) Ele dispensa a conferência das respostas no documento original.

*Explicação: o NotebookLM é "IA com coleira": ancora as respostas nas SUAS fontes e mostra citações clicáveis — se a informação não está nos documentos, ele diz isso. Ainda assim, resumos podem perder nuance (prazos, condições, status parciais); a conferência no original continua obrigatória.*

**Q3.** A coluna de descrição em texto livre dos chamados do 156 pode conter nome, telefone e endereço do cidadão. Antes de publicar uma análise, o correto é:
- a) Publicar mesmo assim, pois quem escreveu o relato concordou implicitamente com a divulgação.
- b) Revisar e remover os dados pessoais — ou trabalhar apenas com os campos estruturados e agregados. ✅
- c) Publicar apenas se o volume de chamados for grande, porque aí ninguém acha o relato individual.

*Explicação: dado pessoal em texto livre continua protegido pela LGPD; registrar um chamado não é consentir com a exposição, e o volume da base não anonimiza o relato individual. Regra da casa: texto livre não vai para material público sem revisão — prefira agregados.*

**Q4.** Segundo a LGPD, qual opção descreve um dado que, em regra, está FORA do alcance da lei?
- a) Um total agregado e anonimizado, como "1.200 chamados de poda no distrito X", que não permite identificar ninguém por meios razoáveis. ✅
- b) Nome e CPF de munícipes em uma planilha interna da prefeitura, porque não foi publicada.
- c) Qualquer dado que já esteja em um portal de transparência.

*Explicação: pelo art. 12, dados anonimizados/agregados que não permitem identificação por meios técnicos razoáveis não são considerados dados pessoais. Planilha interna com nome e CPF é tratamento de dado pessoal (a LGPD se aplica mesmo sem publicação), e dado publicado em portal pode, sim, conter dado pessoal indevido — publicidade não o exclui da lei.*

**Q5.** Na estrutura contexto → conflito → resolução de uma apresentação executiva de 5 minutos, o "conflito" corresponde a:
- a) O momento de debater com a audiência as discordâncias sobre o método.
- b) O problema revelado pelos dados — a distância entre o que é e o que deveria ser, com número — que exige uma decisão. ✅
- c) O gráfico visualmente mais impactante da análise.

*Explicação: o conflito é o coração da história: o achado que dói ("3 distritos concentram 45% dos chamados e esperam o dobro do prazo"). Sem ele, a apresentação vira despejo de dados; com ele, a resolução — sua recomendação — ganha urgência e sentido.*
