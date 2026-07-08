# Módulo 5 — Dashboards que sustentam decisões: Looker Studio

**Curso:** Análise de Dados para Decisões Estratégicas · Giselle Falcão Academy
**Carga do módulo:** 5h · **Aulas:** 2 vídeos, 2 práticas (Looker Studio), 1 quiz

**Objetivo geral do módulo:** ao final, o aluno aplica princípios de percepção visual à escolha de gráficos, conecta a planilha limpa do Módulo 2 ao Looker Studio, projeta um dashboard executivo com KPIs, hierarquia e contexto, e entrega um painel de zeladoria urbana completo — o primeiro item de portfólio apresentável do curso.

---

## Aula 5.1 — Visualização que decide: princípios antes da ferramenta

**Tipo:** vídeo · **Duração:** 20min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Explicar** (compreender) por que o cérebro compara posições e comprimentos com mais precisão do que ângulos e áreas. 2. **Formular** (compreender/aplicar) a pergunta que um gráfico responde antes de criá-lo. 3. **Selecionar** (aplicar) entre os 4 tipos de visual que resolvem 90% dos casos (barras, linhas, tabela e scorecard) conforme a pergunta. 4. **Criticar** (avaliar) visualizações ruins de painéis públicos e propor a versão melhorada. |
| **Duração** | 20 min de vídeo + ~10 min de atividade "caçador de gráficos" no fórum |
| **Materiais** | Slides (12); galeria antes/depois (recriações inspiradas em painéis públicos reais); links do ObservaSampa e do Portal de Dados Abertos de SP |
| **Sequência didática** | **Abertura (0–2:00):** do notebook à tela do decisor; por que princípios vêm antes da ferramenta. **Desenvolvimento (2:00–17:30):** gráfico como resposta a uma pergunta → hierarquia de percepção (Cleveland & McGill) → os 4 tipos que resolvem 90% → galeria antes/depois → regras rápidas de honestidade visual. **Fechamento (17:30–20:00):** síntese, atividade do fórum e ponte para a prática 5.2. |
| **Avaliação** | Formativa: atividade "caçador de gráficos" no fórum (um gráfico ruim de relatório público + como melhorar). Somativa: questões 1 e 2 do quiz do módulo. |

### b) Roteiro de gravação

> **[CÂMERA]** = rosto na tela; **[SLIDE n]** = mostrar slide. Tom: entusiasmo contido — este é o módulo em que o trabalho do aluno fica visível.

**[0:00–2:00] — [CÂMERA] Abertura**

Oi! Bem-vindo, bem-vinda ao módulo 5 — e se este curso fosse uma trilha, agora a gente chega no mirante. Olha o caminho que você já fez: sabe onde os dados moram, sabe limpar no Sheets, sabe resumir com estatística sem cair nas armadilhas da média, e sabe consultar milhões de linhas com SQL. Só que até aqui, o resultado do seu trabalho mora em planilhas e notebooks… e eu vou te contar uma verdade da vida real: **decisor não abre planilha**. Decisor olha para uma tela por trinta segundos, entre uma reunião e outra. Este módulo é sobre essa tela.

Mas antes de abrir o Looker Studio — e eu sei que você está com vontade de sair clicando — a gente precisa de vinte minutos de princípios. Porque ferramenta sem princípio produz aquilo que eu mais encontro por aí, inclusive em painéis oficiais: gráfico bonito que não decide nada. Eu vejo isso direto nos meus projetos de consultoria: sobra gráfico, falta resposta. Hoje a gente resolve isso na raiz.

**[2:00–4:30] — [SLIDE 2 → SLIDE 3] Um gráfico é a resposta a uma pergunta**

[SLIDE 2] Primeira ideia, e é a mais importante da aula inteira: **um gráfico é a resposta a uma pergunta**. Não é decoração de relatório, não é prova de que você trabalhou muito, não é preenchimento de slide. Antes de criar qualquer visual, complete esta frase: "este gráfico responde à pergunta…". Se você não consegue completar, o gráfico não deveria existir. Simples assim.

[SLIDE 3] E tem um truque prático que muda o nível de tudo o que você produz: **use o título do gráfico para afirmar a resposta**. Em vez de "Chamados por distrito", escreva "Cinco distritos concentram quase metade dos chamados". Em vez de "Evolução mensal", escreva "Volume de chamados cresce desde março". O leitor entende a mensagem antes mesmo de olhar as barras — e se ele quiser conferir, o gráfico está ali, honesto, embaixo do título. Gestor agradece, auditoria agradece, e a sua análise finalmente vira frase. Lembra do módulo 2? Análise que não vira frase não vira decisão.

**[4:30–8:00] — [SLIDE 4 → SLIDE 5] A ciência da percepção: comprimento ganha de área e ângulo**

[SLIDE 4] Segunda ideia: escolher gráfico não é questão de gosto — é ciência da percepção. Nos anos 1980, dois pesquisadores da Bell Labs, William Cleveland e Robert McGill, fizeram experimentos medindo quais comparações visuais o olho humano faz com precisão. O resultado virou uma hierarquia que vale até hoje: no topo, **posição e comprimento** — o olho compara com precisão de relojoeiro. No meio, **ângulos e áreas** — o olho erra, e erra bastante. E lá embaixo, **cor e volume** — o olho só percebe "mais ou menos".

[SLIDE 5] Tradução prática: gráfico de **barras** usa comprimento — por isso funciona. Gráfico de **pizza** usa ângulo e área — por isso engana. Faz o teste comigo agora: estou te mostrando uma pizza com cinco fatias parecidas… consegue dizer qual é a segunda maior? … Difícil, né? Agora os mesmos dados em barras ordenadas… instantâneo. Não é porque pizza é "feia" — é porque ela pede ao seu cérebro uma tarefa em que ele é ruim. Quando alguém te disser "ah, mas pizza é mais amigável", você já sabe responder: amigável é o gráfico que o olho lê certo.

**[8:00–12:30] — [SLIDE 6 → SLIDE 7 → SLIDE 8] Os 4 tipos que resolvem 90% dos casos**

Agora, a parte libertadora da aula. Existem dezenas de tipos de gráfico, e o Looker Studio oferece um monte. Você vai precisar de **quatro**. [SLIDE 6]

Tipo um: **barras**. Pergunta que ele responde: "como as categorias se comparam?" — ranking de distritos, de serviços, de canais. Duas regras inegociáveis: **ordene** as barras da maior para a menor, porque barra em ordem alfabética esconde o ranking; e **comece o eixo no zero**, porque barra é comprimento, e comprimento cortado é mentira visual. Já chego nisso.

Tipo dois: **linhas**. Pergunta: "como isso evolui no tempo?" — chamados por mês, sinistros por semana. A linha conecta o olho de um período ao outro e mostra tendência, sazonalidade, quebra. Se o eixo horizontal não é tempo, desconfie da linha.

[SLIDE 7] Tipo três: **tabela**. Sim, tabela é visualização — e é a certa quando a pergunta é "quais são os valores exatos de várias medidas para poucos itens?". O subprefeito quer ver, distrito por distrito, o volume, o tempo mediano e o percentual no prazo? Tabela, com os números redondinhos. O erro é usar tabela para mostrar tendência ou ranking longo — aí é barras ou linhas.

[SLIDE 8] Tipo quatro: **scorecard** — em bom português, o cartão de indicador. Um número grande, sozinho, com contexto: "12.480 chamados no trimestre, 8% acima do anterior". É o tipo mais subestimado e o mais executivo de todos. Quando o decisor tem cinco segundos, é o scorecard que trabalha.

E um convidado bônus, porque estamos falando de cidade: o **mapa**. Quando a pergunta começa com "onde", o mapa é imbatível — e você já conhece o GeoSampa. Só um cuidado: mapa é o gráfico mais fácil de deixar bonito e mais difícil de deixar honesto, porque área grande chama o olho mesmo quando o valor é pequeno. A gente usa com moderação.

**[12:30–15:30] — [SLIDE 9 → SLIDE 10] Galeria antes/depois: painéis públicos na vida real**

[SLIDE 9] Deixa eu te mostrar isso funcionando. Preparei uma galeria de antes/depois com exemplos **recriados** a partir de padrões que aparecem em painéis públicos reais — recriados porque a intenção aqui é aprender, não expor ninguém. Antes: pizza em 3D com catorze fatias de serviços do 156 — o 3D distorce as áreas, e catorze fatias viram confete. Depois: barras horizontais ordenadas, top dez, com "outros" agregado. A mesma informação, um décimo do esforço de leitura.

[SLIDE 10] Outro clássico: o painel arco-íris — cada gráfico com uma paleta, doze cores brigando pela sua atenção. Depois: uma cor sóbria para tudo, **um único destaque** no dado que importa. E o mais perigoso de todos: o **eixo cortado**. Uma barra que começa em 90 em vez de zero transforma uma diferença de 5% num abismo visual. Isso aparece em relatório oficial, aparece em imprensa, aparece em apresentação de resultado. Você, a partir de hoje, é a pessoa na sala que olha o eixo. Aliás, lembra dos painéis da pandemia, que o país inteiro olhou todos os dias? Os bons mudaram comportamento coletivo. Visualização pública é política pública — leva a sério quem faz direito.

**[15:30–17:30] — [SLIDE 11] As regras rápidas da casa**

[SLIDE 11] Consolidando as regras rápidas, o cartão que eu queria que você colasse no monitor. Um: todo gráfico responde uma pergunta — e o título afirma a resposta. Dois: ranking pede barras ordenadas; tempo pede linhas; valores exatos pedem tabela; o número que importa agora pede scorecard. Três: barras começam no zero, sempre. Quatro: pizza, só com pouquíssimas fatias — e mesmo assim, pense duas vezes. Cinco: uma paleta sóbria, um único destaque. Seis: menos tinta, mais dado — se um elemento não ajuda a responder a pergunta, ele atrapalha. Seis regras. Com elas você já produz visual melhor que muito relatório institucional por aí.

**[17:30–20:00] — [CÂMERA] Fechamento**

Recapitulando em três frases. Gráfico é resposta a uma pergunta — e o título afirma a resposta. O olho compara comprimentos muito melhor que ângulos e áreas — por isso barras vencem pizza. E quatro tipos — barras, linhas, tabela, scorecard — resolvem 90% da sua vida de analista.

Sua tarefa de hoje é divertida: vira **caçador de gráficos**. Encontre, em qualquer relatório ou painel público — pode ser do seu órgão, de um portal de transparência, do ObservaSampa —, um gráfico que viola alguma regra de hoje. Poste no fórum: o print (ou o link), qual regra ele viola e como você o refaria. Sem maldade, com técnica — a gente critica o gráfico, nunca o colega.

E na próxima aula, chega de teoria: você vai conectar a sua planilha limpa do módulo 2 no **Looker Studio** e publicar o seu primeiro dashboard na internet, com link para mandar para quem você quiser. Se você chegou até aqui desde o módulo 1, esse momento é especial: é a primeira vez que o seu trabalho ganha uma cara apresentável. Te vejo na prática!

### c) Estrutura de slides (12 slides)

1. **Capa** — "Visualização que decide: princípios antes da ferramenta" · Módulo 5 · Aula 1 · logo Giselle Falcão Academy.
2. **Um gráfico é a resposta a uma pergunta** — bullets: não é decoração nem preenchimento; complete: "este gráfico responde à pergunta…"; se não completa, não cria.
3. **O título afirma a resposta** — antes/depois: "Chamados por distrito" × "Cinco distritos concentram quase metade dos chamados"; o leitor entende antes de olhar as barras.
4. **A hierarquia da percepção (Cleveland & McGill, Bell Labs)** — pódio: topo = posição e comprimento (precisão); meio = ângulo e área (erro); base = cor e volume ("mais ou menos").
5. **Pizza × barras: o teste** — os mesmos 5 valores em pizza (qual é a 2ª maior?) e em barras ordenadas (instantâneo); "amigável é o gráfico que o olho lê certo".
6. **Tipo 1 e 2: barras e linhas** — barras: "como as categorias se comparam?" — ordene + eixo no zero; linhas: "como evolui no tempo?" — tendência, sazonalidade, quebra.
7. **Tipo 3: tabela** — quando a pergunta é "valores exatos de várias medidas para poucos itens"; exemplo: distrito × volume × tempo mediano × % no prazo; não use para ranking longo.
8. **Tipo 4: scorecard (+ o convidado mapa)** — um número grande com contexto: "12.480 chamados · +8% vs trimestre anterior"; mapa: quando a pergunta é "onde" (GeoSampa) — usar com moderação.
9. **Antes/depois 1: a pizza 3D de 14 fatias** — antes: pizza 3D dos serviços do 156; depois: barras horizontais top 10 + "outros"; recriações — critica-se o gráfico, não o autor.
10. **Antes/depois 2: arco-íris e eixo cortado** — antes: 12 cores brigando + barra começando em 90; depois: paleta sóbria com um destaque + eixo no zero; "você é a pessoa que olha o eixo".
11. **As 6 regras rápidas da casa** — lista: 1) título afirma a resposta; 2) barras/linhas/tabela/scorecard conforme a pergunta; 3) barra começa no zero; 4) pizza quase nunca; 5) um só destaque; 6) menos tinta, mais dado.
12. **Sua tarefa: caçador de gráficos** — no fórum: um gráfico público que viola uma regra + qual regra + como refazer; teaser: prática 5.2 — seu primeiro dashboard publicado.

---

## Aula 5.2 — Do Sheets ao primeiro dashboard no Looker Studio

**Tipo:** prática · **Duração:** 1h40 · **Ferramenta:** Looker Studio

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Conectar** (aplicar) uma planilha do Google Sheets como fonte de dados no Looker Studio. 2. **Diferenciar** (compreender) dimensões e métricas no painel de dados. 3. **Construir** (aplicar) os quatro visuais fundamentais: scorecard, barras, série temporal e controle de filtro. 4. **Publicar** (aplicar) o relatório e compartilhá-lo por link. |
| **Duração** | ~1h40 (setup e conexão 25min + montagem guiada 55min + publicação e envio 20min) |
| **Materiais** | Planilha limpa `M2 - Faxina SP156` da prática 2.2 (pré-requisito; a amostra vem do dataset público "Dados do SP156" — https://dados.prefeitura.sp.gov.br); conta Google; https://lookerstudio.google.com |
| **Sequência didática** | **Abertura:** conferir a planilha do módulo 2 e conhecer a interface do Looker Studio. **Desenvolvimento:** conectar a fonte → conferir tipos de campo → scorecard → barras → série temporal → controle de filtro → tema. **Fechamento:** modo Visualizar, compartilhamento por link e envio na plataforma. |
| **Avaliação** | Checklist de critérios de conclusão + link do relatório enviado na plataforma. Somativa: questão 3 do quiz. |

### d) Prática guiada — passo a passo

**Missão:** transformar a planilha limpa do SP156 no seu primeiro dashboard publicado, com um scorecard, um ranking por distrito, uma linha do tempo e um filtro de serviço.

1. Abra sua planilha `M2 - Faxina SP156` (prática 2.2) e confira a aba `trabalho`: ela deve ter as colunas `id_chamado`, `data_abertura`, `data_fechamento`, `servico`, `distrito`, `canal`, `status`, `dias_para_resolucao` e `mes`. Se não concluiu a prática 2.2, volte lá — este dashboard nasce daquela faxina.
2. Acesse https://lookerstudio.google.com e faça login com a mesma conta Google da planilha. Na primeira visita, o Looker Studio pede para completar um cadastro rápido (país e termos) — é gratuito, sem cartão.
3. Clique em **Criar → Relatório**. Na janela "Adicionar dados ao relatório", escolha o conector **Planilhas Google**, autorize o acesso quando solicitado, selecione a planilha `M2 - Faxina SP156` e a página **`trabalho`**. Mantenha marcada a opção de usar a primeira linha como cabeçalho e clique em **Adicionar**. *Checkpoint: o Looker Studio abre o editor e insere uma tabela automática com seus dados — pode apagá-la (selecione e tecle Delete); a gente vai construir do zero.*
4. Conheça o território: à direita, o painel **Dados** lista seus campos. Repare nas cores — **dimensões em verde** (categorias e datas: `distrito`, `servico`, `mes`, `data_abertura`) e **métricas em azul** (números agregáveis: `dias_para_resolucao` e a métrica automática **Contagem de registros**, que conta linhas — ou seja, chamados). Essa distinção é o coração da ferramenta: dimensão é "agrupado por aquilo", métrica é "calcule isto" — a mesma gramática da tabela dinâmica e do GROUP BY.
5. Confira os tipos de campo: menu **Recurso → Gerenciar as fontes de dados adicionadas → Editar** (na fonte da planilha). Verifique: `data_abertura` e `data_fechamento` com tipo **Data**; `dias_para_resolucao` com tipo **Número**; `distrito`, `servico`, `canal`, `status` como **Texto**. Corrija clicando no tipo, se necessário, e volte com **Concluído**. *Checkpoint: se `data_abertura` aparecer como texto, o gráfico de série temporal do passo 8 não vai funcionar — resolva aqui.*
6. **Scorecard:** clique em **Adicionar um gráfico → Cartão de pontuação (scorecard)** e desenhe no canto superior esquerdo da página. No painel Configuração, defina a métrica como **Contagem de registros** e renomeie o rótulo para "Total de chamados" (clique no lápis ao lado da métrica). *Checkpoint: o número exibido deve bater com o total de linhas da aba `trabalho` (menos o cabeçalho) — é o teste do total, agora no dashboard.*
7. **Barras:** **Adicionar um gráfico → Gráfico de barras** (horizontais). Dimensão: `distrito`. Métrica: Contagem de registros. No painel Configuração, ordene por Contagem de registros **decrescente** e limite as barras aos 10 primeiros (campo "Barra" / número de barras). Título afirmativo no topo (caixa de texto): escreva o achado, por exemplo "Poucos distritos concentram a maior parte dos chamados".
8. **Série temporal:** **Adicionar um gráfico → Gráfico de série temporal**. Dimensão de período: `data_abertura`. Clique no lápis da dimensão e ajuste a granularidade para **Ano e mês** — a linha deve mostrar um ponto por mês. (Repare: a coluna `mes` em texto serve para o Sheets, mas o gráfico de tempo do Looker Studio prefere uma data de verdade — por isso conferimos os tipos no passo 5.)
9. **Filtro:** **Adicionar um controle → Lista suspensa**. Campo de controle: `servico`. Posicione no topo da página. Teste: selecione um serviço e observe **todos** os gráficos da página reagirem. *Checkpoint: se um gráfico não reagir, ele está usando outra fonte de dados — confira a aba Configuração dele.*
10. Organize a página: título do relatório no topo (caixa de texto grande: "Zeladoria urbana — chamados SP156"), scorecard no canto superior esquerdo, filtro ao lado, barras e linha abaixo. Alinhe usando as guias magnéticas.
11. Aplique um tema sóbrio: **Tema e layout** → escolha um tema claro e discreto (evite os multicoloridos). Ajuste depois, se quiser, as cores dos gráficos para a paleta do curso (roxo/teal) — lembrando da regra: um só destaque.
12. Renomeie o relatório (canto superior esquerdo): `M5 - Meu primeiro dashboard - Seu Nome`.
13. Clique em **Visualizar** e use o dashboard como um leitor: filtre, passe o mouse, leia os títulos. Volte a **Editar** se algo estiver confuso. Dica: os dados da planilha são atualizados no relatório automaticamente em intervalos regulares (padrão de 15 minutos) — se você corrigir algo no Sheets, use **Atualizar dados** no menu para forçar.
14. Compartilhe: botão **Compartilhar**, configure o acesso ao link para **Qualquer pessoa com o link → Leitor** e copie o link. Envie na atividade da plataforma. Se aparecer aviso sobre compartilhar dados, revise: a amostra do curso é de dados públicos e agregáveis — pode publicar.

**Critérios de conclusão:**

- [ ] Fonte de dados conectada à aba `trabalho` da planilha limpa, com `data_abertura` como Data e `dias_para_resolucao` como Número.
- [ ] Scorecard "Total de chamados" batendo com o total de linhas da base (teste do total).
- [ ] Barras por distrito ordenadas, top 10, com título afirmativo.
- [ ] Série temporal por `data_abertura` com granularidade "Ano e mês".
- [ ] Lista suspensa de `servico` filtrando todos os gráficos da página.
- [ ] Link do relatório (Qualquer pessoa com o link → Leitor) enviado na plataforma.

**Socorro rápido:**

- *A série temporal aparece vazia ou com erro* → `data_abertura` está como texto na fonte; refaça o passo 5 (Recurso → Gerenciar as fontes de dados → Editar → tipo Data).
- *O gráfico mostra "null" como categoria* → são os vazios que sobraram da limpeza; volte à planilha e trate (ex.: "NÃO INFORMADO"), depois Atualizar dados no relatório.
- *O scorecard não bate com a planilha* → há filtro ativo (lista suspensa ou filtro de gráfico) ou a fonte apontou para a aba errada (`dados-brutos` em vez de `trabalho`).
- *Mudei a planilha e o dashboard não mudou* → a atualização automática tem intervalo; menu com o botão direito → **Atualizar dados** força a leitura imediata.

---

## Aula 5.3 — Design de dashboards executivos: KPIs, hierarquia e contexto

**Tipo:** vídeo · **Duração:** 20min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Aplicar** (aplicar) a regra dos 5 segundos e o padrão de leitura em F na disposição dos elementos. 2. **Selecionar** (analisar/avaliar) 3 a 5 KPIs relevantes para uma persona de decisão — e recusar o resto. 3. **Contextualizar** (aplicar) cada número com meta, período anterior ou comparação entre pares. 4. **Diagnosticar** (avaliar) o dashboard-enciclopédia e prescrever a correção. |
| **Duração** | 20 min de vídeo |
| **Materiais** | Slides (13); dashboard da prática 5.2 aberto para referência; checklist de design (PDF de 1 página, material da aula) |
| **Sequência didática** | **Abertura (0–1:45):** do "painel com gráficos" à ferramenta executiva; caso das estufas. **Desenvolvimento (1:45–17:45):** regra dos 5 segundos e leitura em F → escolher 3–5 KPIs → contexto: meta, período anterior, pares → hierarquia visual e paleta → o erro capital: dashboard-enciclopédia → checklist de design. **Fechamento (17:45–20:00):** síntese e ponte para o projeto da prática 5.4. |
| **Avaliação** | Formativa: mini-desafio em tela (escolher 4 KPIs para a persona subprefeito). Somativa: questões 4 e 5 do quiz. |

### b) Roteiro de gravação

**[0:00–1:45] — [CÂMERA] Abertura**

Oi de novo! Seu primeiro dashboard existe, está publicado, tem um link — parabéns de verdade, porque muita gente trabalha anos com dados sem nunca publicar nada. Hoje a gente dá o salto de qualidade: transformar um "painel com gráficos" em uma **ferramenta executiva** — uma tela que sustenta decisão.

Deixa eu te contar de onde vem a minha convicção sobre isso. Num dos meus projetos de consultoria no agro — o gêmeo digital de estufas de morango, que talvez você tenha visto por aí —, o produtor tinha dezenas de sensores medindo tudo: temperatura, umidade, irrigação… e não olhava painel nenhum, porque a tela era um formigueiro de números. O painel que funcionou, o que ele passou a abrir todo dia de manhã, tinha **quatro números e um gráfico**. Quatro. E foi com essa tela enxuta que a gente chegou a economizar 26% de água. Menos virou mais — e hoje eu te ensino a fazer esse "menos" de propósito.

**[1:45–4:15] — [SLIDE 2 → SLIDE 3] A regra dos 5 segundos**

[SLIDE 2] Regra número um do dashboard executivo: **a regra dos 5 segundos**. Quem decide vai olhar sua tela por cinco segundos antes de decidir se continua olhando. Nesses cinco segundos, a pessoa precisa capturar a resposta mais importante. Se em cinco segundos ela só viu poluição, você a perdeu — e dashboard que ninguém abre duas vezes é um relatório caro.

[SLIDE 3] E onde o olho vai nesses cinco segundos? Estudos de rastreamento ocular mostram que, em telas de informação, a leitura ocidental varre num padrão parecido com a letra **F**: começa no **canto superior esquerdo**, corre para a direita, desce pela esquerda. Conclusão prática: o canto superior esquerdo é o metro quadrado mais caro do seu dashboard. É lá que mora o número mais importante — o scorecard do KPI número um. Nunca o logotipo gigante, nunca um texto institucional. O número.

**[4:15–7:30] — [SLIDE 4 → SLIDE 5] KPIs: escolher 3 a 5 e recusar o resto**

[SLIDE 4] Falei KPI — vamos definir. KPI, indicador-chave de desempenho, é um número que passa em quatro testes. Um: **ele muda uma decisão** — se o número subir ou descer, alguém faz algo diferente. Dois: **tem dono** — alguém responde por ele. Três: **tem referência** — uma meta, um histórico, algo para comparar. Quatro: **atualiza** numa frequência que acompanha a decisão. Se um número não passa nos quatro testes, ele pode até entrar numa página de detalhe… mas não é KPI, e não ganha o andar nobre da tela.

[SLIDE 5] E quantos? **De três a cinco.** Menos que três, falta visão; mais que cinco, vira lista de compras e nada se destaca. Mini-desafio, pausa o vídeo: você é analista de uma subprefeitura e sua persona é o **subprefeito** — quais quatro KPIs de zeladoria você escolheria? … Minha resposta, que vai ser a do nosso projeto: total de chamados no período; tempo mediano de resolução — mediana, lembra do módulo 3, porque a distribuição de tempos é assimétrica; percentual resolvido dentro do prazo; e a variação contra o período anterior. Volume, velocidade, qualidade e tendência. Quatro números, a operação inteira na palma da mão.

A parte difícil não é escolher — é **recusar**. Cada área vai pedir "só mais um numerozinho". E cada numerozinho a mais rouba atenção dos que decidem. Dizer não é design.

**[7:30–10:30] — [SLIDE 6 → SLIDE 7] Número sem contexto não decide**

[SLIDE 6] Agora, o segredo dos scorecards que funcionam: **número sozinho não significa nada**. "Tempo mediano de resolução: 9 dias." Isso é bom? É ruim? Depende! O contexto vem de três comparações possíveis. Contra a **meta**: a meta era 10? Então estamos bem. Contra o **período anterior**: mês passado eram 7? Então estamos piorando — mesmo abaixo da meta. E contra os **pares**: as outras subprefeituras estão em 6? Então temos o que aprender com elas.

[SLIDE 7] No Looker Studio, isso é um clique: o scorecard tem o **período de comparação** — você escolhe "período anterior" e ele mostra a setinha com a variação percentual. Na prática 5.4 você vai configurar. Dois cuidados de gente grande: primeiro, seta verde e vermelha ajudam, mas nunca use **só** a cor para comunicar — cerca de 8% dos homens tem alguma forma de daltonismo; a seta e o número acompanham a cor. Segundo: pense na direção — chamados **subindo** é ruim ou é bom? Pode ser mais buraco na rua… ou mais gente confiando no canal 156. O dashboard mostra; a interpretação, que é sua, vai numa linha de texto ao lado. Honestidade também se desenha.

**[10:30–13:30] — [SLIDE 8 → SLIDE 9] Hierarquia visual e paleta**

[SLIDE 8] Hierarquia visual é fazer o olho visitar a tela na ordem certa. Três alavancas: **tamanho** — o mais importante é maior; **posição** — o mais importante em cima e à esquerda, lembra do F; e **cor** — o destaque é de quem precisa dele. A estrutura clássica que funciona em quase todo dashboard executivo: uma **faixa de KPIs no topo** — os scorecards —, os **gráficos de análise no meio** — o ranking, a linha do tempo —, e o **detalhe embaixo** — a tabela. De cima para baixo: a resposta, a explicação, a evidência.

[SLIDE 9] E a paleta: **sóbria, com um único destaque**. Cinzas e um tom institucional para o corpo; uma cor viva — só uma — para o que precisa gritar. Fundo claro, sem gradiente, sem sombra 3D, sem decoração que não carrega dado. Alinhe tudo em grade — o Looker Studio tem guias magnéticas, use. Desalinhamento passa mensagem de desleixo, e desleixo visual contamina a credibilidade do número. É injusto? Talvez. Mas é como o cérebro de quem decide funciona.

**[13:30–16:00] — [SLIDE 10 → SLIDE 11] O erro capital: o dashboard-enciclopédia**

[SLIDE 10] E chegamos ao vilão da aula: o **dashboard-enciclopédia**. Você já viu um: trinta gráficos numa página, seis paletas de cores, três logotipos, filtros que ninguém entende — o painel que tenta responder tudo e não responde nada. Como ele nasce? De um pecado de origem: ninguém definiu **para quem** e **para qual pergunta**. Aí cada área pediu seu gráfico, ninguém disse não, e o painel virou depósito. O sintoma definitivo: ninguém abre duas vezes.

[SLIDE 11] A cura tem nome: **persona e pergunta**. Antes de desenhar qualquer coisa, escreva uma frase: "Este dashboard ajuda **[o subprefeito]** a decidir **[onde alocar as equipes de zeladoria neste mês]**." Tudo o que serve à frase, entra. O que não serve, sai — ou vai para uma **página de detalhe**, que é o lugar legítimo da curiosidade: uma página dois, com tabela completa e filtros, para quem quiser fuçar. Visão geral na página um, detalhe na página dois. Todo mundo atendido, ninguém soterrado.

**[16:00–17:45] — [SLIDE 12] O checklist de design**

[SLIDE 12] Para fechar, o checklist que você vai usar na prática — e, se depender de mim, pelo resto da carreira. Sete perguntas antes de publicar: A persona e a pergunta estão escritas em uma frase? O KPI número um está no canto superior esquerdo? Há no máximo cinco KPIs, cada um com comparação? Os títulos afirmam achados? A paleta tem um único destaque? Um leitor de cinco segundos captura a mensagem principal? E a fonte dos dados com o período está escrita no rodapé? — esse último parece burocracia, mas é o que blinda o seu painel em auditoria: todo número público precisa dizer de onde veio.

**[17:45–20:00] — [CÂMERA] Fechamento**

Recapitulando: cinco segundos e leitura em F — o número um mora no canto superior esquerdo; três a cinco KPIs que passam nos quatro testes, e coragem para recusar o resto; todo número com contexto — meta, período anterior ou pares; hierarquia por tamanho, posição e cor, paleta sóbria com um destaque; e a cura da enciclopédia: persona e pergunta em uma frase, detalhe na página dois.

Na próxima aula, o projeto: você vai construir, de ponta a ponta, o **dashboard de zeladoria urbana** para o subprefeito — duas páginas, quatro KPIs, controles de período e serviço, revisado pelo checklist. Vai ser a peça mais apresentável do seu portfólio até aqui — do tipo que você mostra numa entrevista ou leva para a próxima reunião do seu órgão. Separa duas horinhas de qualidade. Te vejo lá!

### c) Estrutura de slides (13 slides)

1. **Capa** — "Design de dashboards executivos: KPIs, hierarquia e contexto" · Módulo 5 · Aula 3.
2. **A regra dos 5 segundos** — bullets: quem decide olha 5s antes de decidir se continua; em 5s, a resposta principal precisa aparecer; dashboard que ninguém abre 2× é um relatório caro.
3. **O olho lê em F** — diagrama do padrão F sobre um wireframe de dashboard; o canto superior esquerdo é o m² mais caro; lá mora o KPI nº 1 — nunca o logotipo.
4. **KPI: os 4 testes** — lista: muda uma decisão; tem dono; tem referência (meta/histórico); atualiza no ritmo da decisão; "reprovou em um? vai para a página de detalhe".
5. **De 3 a 5 KPIs — e o exemplo da zeladoria** — os 4 do projeto: total de chamados · tempo mediano de resolução · % no prazo · variação vs período anterior; volume, velocidade, qualidade, tendência; "dizer não é design".
6. **Número sem contexto não decide** — "9 dias é bom?"; três comparações: meta (10 → ok), período anterior (7 → piorando), pares (6 → aprender); o mesmo número, três leituras.
7. **Contexto no Looker Studio** — bullets: scorecard → período de comparação → "período anterior"; seta + número + cor (nunca só cor — daltonismo); direção importa: mais chamados = mais problema ou mais confiança?
8. **Hierarquia visual: 3 alavancas** — tamanho, posição, cor; estrutura clássica: faixa de KPIs no topo → gráficos de análise no meio → tabela de detalhe embaixo; "resposta → explicação → evidência".
9. **Paleta sóbria, um destaque** — bullets: cinzas + tom institucional; UMA cor viva para o que importa; sem 3D, sem gradiente, sem enfeite; grade e alinhamento = credibilidade.
10. **O dashboard-enciclopédia** — sintomas: 30 gráficos, 6 paletas, filtros misteriosos, ninguém abre 2×; causa: ninguém definiu para quem nem para quê; cada área pediu "só mais um numerozinho".
11. **A cura: persona e pergunta** — frase-molde: "Este dashboard ajuda [persona] a decidir [decisão]"; o que serve à frase entra; o resto sai ou vai para a página 2 (detalhe com tabela e filtros).
12. **Checklist de design (7 itens)** — persona/pergunta em 1 frase? · KPI nº 1 no canto sup. esquerdo? · ≤5 KPIs com comparação? · títulos afirmam? · um só destaque? · leitor de 5s captura a mensagem? · fonte e período no rodapé?
13. **Próxima parada: o projeto** — bullets: dashboard de zeladoria de ponta a ponta; 2 páginas, 4 KPIs, controles, checklist; a primeira peça de portfólio do curso — 2h de qualidade.

---

## Aula 5.4 — Dashboard de zeladoria urbana de ponta a ponta

**Tipo:** prática · **Duração:** 2h10 · **Ferramenta:** Looker Studio

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Definir** (analisar) persona e pergunta de decisão em uma frase. 2. **Construir** (criar) campos calculados no Looker Studio (mediana com percentil e % no prazo). 3. **Projetar** (criar) um dashboard de duas páginas — visão geral com 4 KPIs e detalhe com drill por distrito — com controles de período e serviço. 4. **Avaliar** (avaliar) o próprio painel com o checklist de design antes de publicar. |
| **Duração** | ~2h10 (planejamento 20min + página 1 60min + página 2 35min + revisão pelo checklist e publicação 15min) |
| **Materiais** | Relatório da prática 5.2 (ponto de partida) conectado à planilha `M2 - Faxina SP156` (amostra do dataset público "Dados do SP156" — https://dados.prefeitura.sp.gov.br); checklist de design (material da aula 5.3) |
| **Sequência didática** | **Abertura:** persona, pergunta e esboço no papel. **Desenvolvimento:** campos calculados → faixa de 4 KPIs com comparação → gráficos de análise → controles no nível do relatório → página de detalhe com interação de filtro cruzado. **Fechamento:** revisão pelo checklist, publicação e envio com as 3 frases de contexto. |
| **Avaliação** | Checklist de critérios de conclusão + link do dashboard e 3 frases (persona, pergunta, decisão que o painel sustenta) enviados na plataforma; feedback por rubrica simplificada (clareza, hierarquia, correção dos números, acionabilidade). |

### d) Prática guiada — passo a passo

**A frase do projeto:** *"Este dashboard ajuda o **subprefeito** a decidir **onde alocar as equipes de zeladoria neste mês**."*

**Os 4 KPIs:** total de chamados no período · tempo mediano de resolução · % resolvidos em até 10 dias · variação de chamados vs período anterior.

**Etapa 0 — Planejamento (papel e caneta, 20min)**

1. Escreva a frase do projeto no topo de uma folha (ou de um doc). Abaixo, os 4 KPIs. Esboce à mão o layout da página 1: faixa de 4 scorecards no topo (o total de chamados no canto superior esquerdo), controles à direita do título, ranking de distritos e linha do tempo no meio, rodapé com fonte e período. Esboçar antes evita a tentação de "ir adicionando gráfico" — o pecado de origem da enciclopédia.

**Etapa 1 — Campos calculados (a base dos KPIs)**

2. Abra o relatório da prática 5.2 (ou crie um novo conectado à aba `trabalho`, como no passo 3 da prática anterior). Renomeie para `M5 - Zeladoria urbana - Seu Nome`.
3. Crie o campo do tempo mediano: **Recurso → Gerenciar as fontes de dados adicionadas → Editar → + Adicionar um campo → Adicionar campo calculado**. Nome: `tempo_mediano`. Fórmula: `PERCENTILE(dias_para_resolucao, 50)`. Salve. (Por que mediana e não média? Módulo 3: a distribuição de tempos é assimétrica — meia dúzia de chamados de 90 dias arrasta a média para cima.)
4. Crie o campo do prazo: novo campo calculado, nome `pct_no_prazo`, fórmula: `SUM(CASE WHEN dias_para_resolucao <= 10 THEN 1 ELSE 0 END) / COUNT(dias_para_resolucao)`. No tipo do campo, escolha **Numérico → Porcentagem**. *Decisão registrada: o denominador `COUNT(dias_para_resolucao)` considera apenas chamados já resolvidos (os abertos têm o campo vazio) — anote essa definição no rodapé do painel; a meta de 10 dias é ilustrativa, ajuste à realidade do serviço se souber a meta oficial.*
5. Volte ao relatório (**Concluído**). *Checkpoint: os campos `tempo_mediano` e `pct_no_prazo` aparecem na lista de campos do painel Dados.*

**Etapa 2 — Página 1: visão geral**

6. Título e rodapé: caixa de texto no topo — "Zeladoria urbana — visão do subprefeito"; no rodapé, em fonte pequena: "Fonte: amostra do dataset Dados do SP156, Portal de Dados Abertos da Prefeitura de São Paulo (dados.prefeitura.sp.gov.br) · % no prazo considera apenas chamados resolvidos · meta de prazo ilustrativa: 10 dias".
7. Faixa de KPIs (4 scorecards lado a lado, no topo, começando pelo canto superior esquerdo):
   - **KPI 1 — Total de chamados:** métrica Contagem de registros, rótulo "Chamados no período".
   - **KPI 2 — Tempo mediano:** métrica `tempo_mediano`, rótulo "Tempo mediano de resolução (dias)".
   - **KPI 3 — % no prazo:** métrica `pct_no_prazo`, rótulo "% resolvidos em até 10 dias".
   - **KPI 4 — Variação:** um segundo scorecard de Contagem de registros; no painel Configuração, defina a **dimensão do período** como `data_abertura` e, em **Período de comparação**, escolha **Período anterior** — a variação percentual com a seta aparece no cartão. Rótulo: "Chamados vs período anterior".
   *Checkpoint: com o controle de período em "últimos 3 meses" (passo 10), o KPI 4 compara com os 3 meses anteriores automaticamente.*
8. Gráficos de análise (meio da página):
   - **Ranking:** gráfico de barras horizontais — dimensão `distrito`, métrica Contagem de registros, ordem decrescente, top 10. Título afirmativo com o seu achado real (ex.: "Três distritos concentram um terço dos chamados").
   - **Tendência:** gráfico de série temporal — `data_abertura` com granularidade "Ano e mês", métrica Contagem de registros. Título afirmativo (ex.: "Volume cresce desde o início do período").
9. Um toque de qualidade: no gráfico de barras, ative a comparação de qualidade — adicione `tempo_mediano` como segunda métrica opcional OU mantenha só o volume e deixe o cruzamento para a página 2 (recomendado: página 1 enxuta).
10. Controles (topo, à direita do título):
    - **Período:** **Adicionar um controle → Período** (controle de intervalo de datas). Padrão sugerido: últimos 3 meses.
    - **Serviço:** **Adicionar um controle → Lista suspensa**, campo `servico`.
    - Para que os controles valham também para a página 2: clique com o botão direito em cada controle → **Tornar no nível do relatório**.
11. Tema e alinhamento: **Tema e layout** → tema claro e sóbrio; alinhe os 4 scorecards com as guias; verifique se há **uma única** cor de destaque (sugestão: teal para a série temporal e o distrito líder; o resto em tons neutros/roxo discreto).

**Etapa 3 — Página 2: detalhe por distrito**

12. **Página → Nova página**. Renomeie as páginas (menu Página → Gerenciar páginas): "Visão geral" e "Detalhe por distrito".
13. Monte a tabela de detalhe: **Adicionar um gráfico → Tabela**. Dimensão: `distrito`. Métricas: Contagem de registros, `tempo_mediano`, `pct_no_prazo`. Ordene por Contagem de registros decrescente. Ative a linha de resumo (opção "Mostrar linha de resumo") — é o teste do total morando no painel.
14. Ao lado, um gráfico de barras por `servico` (top 10, decrescente), métrica Contagem de registros.
15. Ative o drill por clique (filtro cruzado): selecione a tabela e, no painel Configuração, em **Interações do gráfico**, marque **Aplicar filtro**. Faça o mesmo no gráfico de barras. Teste no modo Visualizar: clicar em um distrito na tabela filtra os serviços daquele distrito — esse é o "drill" que o subprefeito vai usar para investigar cada território. *Checkpoint: clique em um distrito e confira se o gráfico de serviços reage; clique de novo (ou em área vazia) para limpar.*
16. Título da página 2: "De perto: escolha um distrito para investigar" — instrução de uso embutida no título, porque painel bom ensina a se usar.

**Etapa 4 — Revisão, publicação e entrega**

17. Rode o **checklist de design** da aula 5.3, item por item, no modo Visualizar: persona/pergunta escritas? KPI nº 1 no canto superior esquerdo? ≤5 KPIs com comparação? Títulos afirmam? Um destaque só? Mensagem capturável em 5 segundos? Fonte e período no rodapé? Corrija o que reprovar.
18. Teste dos 5 segundos com uma pessoa de verdade: mostre a página 1 por cinco segundos (literalmente conte) a um colega ou familiar e pergunte "o que você entendeu?". Se a resposta não for a sua mensagem principal, ajuste hierarquia e títulos.
19. Compartilhe: **Compartilhar → Qualquer pessoa com o link → Leitor**. Copie o link.
20. Envie na plataforma: o link + três frases — (i) a persona, (ii) a pergunta de decisão, (iii) a decisão que o painel sustentou no seu recorte (ex.: "priorizar as equipes de tapa-buraco nos distritos X e Y, onde volume e atraso se acumulam"). Poste as três frases também no fórum: criticar (com técnica e gentileza) o painel de dois colegas usando o checklist faz parte da atividade.

**Critérios de conclusão:**

- [ ] Frase persona + pergunta escrita e coerente com o painel entregue.
- [ ] Campos calculados `tempo_mediano` (PERCENTILE 50) e `pct_no_prazo` (com tipo porcentagem) funcionando.
- [ ] Página "Visão geral" com 4 scorecards no topo (total no canto superior esquerdo) e KPI 4 com comparação de período anterior.
- [ ] Controles de período e serviço no nível do relatório, afetando as duas páginas.
- [ ] Página "Detalhe por distrito" com tabela (3 métricas + linha de resumo) e filtro cruzado funcionando (clicar no distrito filtra os serviços).
- [ ] Rodapé com fonte dos dados, período e definição do % no prazo.
- [ ] Checklist de design aprovado nos 7 itens e teste dos 5 segundos realizado.
- [ ] Link + 3 frases enviados na plataforma; comentários em 2 painéis de colegas no fórum.

**Socorro rápido:**

- *`PERCENTILE` dá erro de fórmula* → confira se `dias_para_resolucao` está com tipo Número na fonte de dados; nomes de campo com acento ou espaço também quebram fórmulas — renomeie na fonte se preciso.
- *`pct_no_prazo` mostra 0% ou mais de 100%* → o tipo do campo não está como Porcentagem, ou o denominador usou `COUNT(id_chamado)` (que inclui chamados abertos); revise a fórmula do passo 4.
- *O KPI 4 não mostra a comparação* → o scorecard precisa da dimensão do período (`data_abertura`) definida E de um intervalo de datas ativo (controle de período ou período padrão do relatório).
- *Os controles não afetam a página 2* → faltou o botão direito → "Tornar no nível do relatório" em cada controle.
- *O clique na tabela não filtra o gráfico ao lado* → "Aplicar filtro" precisa estar marcado no gráfico de ORIGEM do clique (a tabela); confira em Interações do gráfico.

---

## Aula 5.5 — Quiz do Módulo 5 — Visualização e dashboards

**Tipo:** quiz · **Duração:** 15min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos** | Verificar a fixação dos princípios de percepção visual, da escolha de gráfico por pergunta, do vocabulário do Looker Studio (dimensões × métricas) e das regras de design executivo (hierarquia, KPIs, dashboard-enciclopédia). |
| **Formato** | 5 questões objetivas, 3 alternativas, correção automática com explicação; 2 tentativas; nota mínima 70% (compõe a média de quizzes). |

### Questões (com gabarito)

**Q1.** Você precisa mostrar ao gestor **como o volume de chamados evoluiu mês a mês no último ano**. O visual mais adequado é:
- a) Gráfico de pizza com 12 fatias, uma por mês.
- b) Gráfico de linhas (série temporal) com um ponto por mês. ✅
- c) Um scorecard com o total do ano.

*Explicação: evolução no tempo pede linhas — o olho acompanha tendência, sazonalidade e quebras. Pizza compara partes de um todo (mal, aliás, com 12 fatias), e o scorecard resume um número, mas não mostra a evolução.*

**Q2.** Por que gráficos de barras costumam comunicar comparações melhor que gráficos de pizza?
- a) Porque o cérebro compara comprimentos com muito mais precisão do que ângulos e áreas. ✅
- b) Porque barras aceitam mais cores diferentes que fatias.
- c) Porque pizza só funciona para dados que somam menos de 100%.

*Explicação: é a hierarquia da percepção (Cleveland & McGill): posição e comprimento no topo, ângulo e área embaixo. Não tem a ver com cores — aliás, quanto menos cores, melhor — e proporções em pizza sempre somam 100% por construção.*

**Q3.** No Looker Studio, ao montar o gráfico "chamados por distrito", os campos `distrito` e `Contagem de registros` são, respectivamente:
- a) Uma métrica e uma dimensão.
- b) Uma dimensão e uma métrica. ✅
- c) Dois filtros do relatório.

*Explicação: dimensão é o "agrupado por aquilo" (categorias, como distrito — em verde no painel); métrica é o "calcule isto" (números agregados, como a contagem — em azul). É a mesma gramática da tabela dinâmica e do GROUP BY.*

**Q4.** Em um dashboard executivo, o número mais importante (KPI nº 1) deve ficar:
- a) No rodapé, para fechar a leitura com chave de ouro.
- b) No canto superior esquerdo, onde o padrão de leitura em F começa. ✅
- c) Em qualquer lugar, desde que pisque ou tenha cor vibrante.

*Explicação: o olho varre a tela num padrão em F, começando pelo canto superior esquerdo — o "metro quadrado mais caro" do painel. É a regra dos 5 segundos: a resposta principal precisa aparecer onde o olhar chega primeiro, sem depender de efeitos.*

**Q5.** Um painel com 30 gráficos numa única página, seis paletas de cores e nenhum número em destaque comete qual erro?
- a) É um dashboard-enciclopédia: sem persona, sem pergunta e sem hierarquia, ninguém o abre duas vezes. ✅
- b) Nenhum — quanto mais informação na tela, melhor a decisão.
- c) Usar dados públicos, que não deveriam aparecer em dashboards.

*Explicação: o dashboard-enciclopédia nasce quando ninguém define para quem e para qual decisão o painel existe — cada área pede "só mais um gráfico" e nada se destaca. A cura: persona + pergunta em uma frase, 3 a 5 KPIs na visão geral e o detalhe em outra página. Mais informação não é mais decisão; dados públicos são exatamente a matéria-prima certa.*
