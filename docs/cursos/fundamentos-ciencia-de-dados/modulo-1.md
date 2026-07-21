# Módulo 1 — Ciência de dados: a área, as profissões e o método

**Curso:** Fundamentos de Ciência de Dados · Giselle Falcão Academy
**Carga do módulo:** 3h30 · **Aulas:** 2 vídeos, 1 leitura, 1 prática (Colab), 1 quiz

**Objetivo geral do módulo:** ao final, o aluno explica o que é (e o que não é) ciência de dados, conhece as profissões da área no mercado brasileiro, descreve o método que vai da pergunta à decisão e executa sua primeira investigação completa em um notebook no Google Colab — sem instalar nada.

---

## Aula 1.1 — O que é ciência de dados (e o que ela não é)

**Tipo:** vídeo · **Duração:** 20min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Definir** (lembrar) ciência de dados como a prática de extrair conhecimento útil de dados para apoiar decisões. 2. **Explicar** (compreender) a interseção das três competências da área: estatística, computação e conhecimento do domínio. 3. **Distinguir** (compreender/analisar) ciência de dados de termos vizinhos: BI/análise de dados, machine learning e IA generativa. 4. **Reconhecer** (analisar) a presença de ciência de dados em situações do cotidiano brasileiro. |
| **Duração** | 20 min de vídeo + ~10 min de reflexão no fórum |
| **Materiais** | Slides (12), fórum da plataforma |
| **Sequência didática** | **Abertura (0–1:30):** boas-vindas ao curso de porta de entrada; quem é a professora. **Desenvolvimento (1:30–16:30):** dados no seu dia → definição e as três competências → o que ciência de dados NÃO é → mapa dos termos (BI, ML, IA) → casos brasileiros → mapa do curso e ferramentas. **Fechamento (16:30–20:00):** frase-síntese, tarefa de reflexão no fórum, convite para a Aula 1.2. |
| **Avaliação** | Formativa: postagem no fórum ("onde os dados já tocam o seu dia — e que pergunta você gostaria de responder com dados"). Somativa: questões 1 e 4 do quiz do módulo. |

### b) Roteiro de gravação

> Tom: professora experiente conversando. Ler no teleprompter com naturalidade — pausas nos "…", sorrir nos parênteses de conexão. **[CÂMERA]** = rosto na tela; **[SLIDE n]** = mostrar slide.

**[0:00–1:30] — [CÂMERA] Abertura**

Oi! Eu sou a Giselle Falcão — bem-vindo, bem-vinda ao Fundamentos de Ciência de Dados, o curso de porta de entrada da nossa Academy. Antes de qualquer coisa, deixa eu me apresentar rapidinho: eu sou doutora em modelagem matemática computacional e trabalho como consultora de inteligência artificial em projetos de indústria, agronegócio e logística. Ou seja: eu passo os meus dias fazendo exatamente o que eu vou te ensinar aqui.

E deixa eu te contar por que este curso existe. Toda semana alguém me escreve perguntando a mesma coisa: "Giselle, eu queria trabalhar com dados… mas eu nem sei por onde começar. Isso é para mim?". Este curso é a minha resposta. Em vinte horas, você vai entender o que é essa área, o que fazem as pessoas que trabalham nela, e vai colocar a mão na massa de verdade — em Python, em estatística, em gráficos. E no final, você vai saber responder por conta própria: "isso é para mim?" e "qual caminho eu sigo agora?". Combinado? Então vamos.

**[1:30–3:30] — [SLIDE 2] Os dados já decidiram seu dia hoje**

Deixa eu começar provando uma coisa: você já convive com ciência de dados o dia inteiro — só não recebeu o crachá. [SLIDE 2] Pensa no seu dia de hoje. O aplicativo de música que acertou a playlist do seu banho… foi um sistema que aprendeu com o que você ouve. O mapa que te mandou sair dez minutos mais cedo por causa do trânsito… previsão feita com dados de milhões de celulares. O preço da passagem aérea que mudou entre ontem e hoje… precificação dinâmica, pura análise de demanda. E o banco que aprovou — ou negou — aquele limite de crédito no aplicativo… uma decisão apoiada em dados sobre milhões de clientes.

Por trás de cada uma dessas cenas tem gente. Gente que coleta dado, limpa dado, analisa dado e transforma dado em decisão. Essa gente tem vários nomes de cargo — a gente vai ver todos na próxima aula — mas o ofício é um só. E é esse ofício que este curso apresenta.

**[3:30–6:00] — [SLIDE 3 → SLIDE 4] A definição (sem firula) e as três competências**

Então vamos à definição, sem firula. [SLIDE 3] **Ciência de dados é a prática de extrair conhecimento útil de dados para apoiar decisões.** Só isso. Guarda as três palavras-chave: *conhecimento*, porque dado bruto sozinho não diz nada; *útil*, porque análise que não serve para nada é passatempo; e *decisões*, porque é aí que o dado vira valor — alguém faz algo diferente por causa do que você encontrou.

[SLIDE 4] E de que essa prática é feita? De três competências que se encontram. Primeira: **estatística** — o jeito honesto de resumir dados e de lidar com a incerteza. Segunda: **computação** — a capacidade de mandar o computador trabalhar para você, porque ninguém analisa dez milhões de linhas no olho. Terceira, e a mais subestimada: **conhecimento do domínio** — entender do negócio, do contexto, do problema. Um número só significa alguma coisa para quem conhece o terreno.

Agora, a parte que eu quero que você ouça com atenção: **ninguém começa sabendo as três**. Eu vim da matemática e fui aprender de agronegócio dentro da porteira, conversando com veterinário e com gerente de fazenda. Tem gente ótima que veio da administração e foi aprender programação depois dos trinta. A interseção se constrói — e cada pessoa entra por uma porta diferente. A sua porta de entrada é o que você já sabe hoje.

**[6:00–8:30] — [SLIDE 5] O que ciência de dados NÃO é**

Tão importante quanto a definição é desfazer os mitos. [SLIDE 5] Quatro deles.

Mito um: *"ciência de dados é sinônimo de inteligência artificial"*. Não é. IA é uma das ferramentas da caixa — e olha, uma parte enorme do trabalho de dados do mundo real resolve problema com uma boa contagem, uma média bem feita e um gráfico honesto. Sem nenhum modelo sofisticado.

Mito dois: *"é mágica"*. Não é. Dado ruim entra, resposta ruim sai — não existe algoritmo que conserte pergunta errada nem base bagunçada. Aliás, você vai ouvir muito isso de mim: o método importa mais que a ferramenta.

Mito três: *"é só para gênios da matemática"*. Definitivamente não. Você precisa de raciocínio lógico e de disposição para aprender — e é isso. A estatística que resolve a maior parte dos problemas reais é a que a gente vai ver no módulo 2, sem trauma nenhum.

Mito quatro: *"é uma ferramenta específica"*. Também não. Ciência de dados não é Python, não é Excel, não é nenhum software. Ferramentas mudam — o método fica. Neste curso a gente usa ferramentas gratuitas de navegador justamente para você focar no que importa.

**[8:30–11:00] — [SLIDE 6 → SLIDE 7] O mapa dos termos: BI, ML, IA**

Agora deixa eu organizar a sopa de letrinhas, porque eu sei que ela confunde. [SLIDE 6] Imagina círculos que se sobrepõem. **Análise de dados** — ou BI, *business intelligence* — é olhar para o que aconteceu e o que está acontecendo: relatórios, painéis, indicadores. Responde "o quê" e "onde". **Ciência de dados** engloba isso e vai além: formula hipóteses, investiga causas, constrói estimativas e previsões. **Machine learning** é uma técnica dentro da ciência de dados: ensinar o computador a aprender padrões a partir de exemplos — a gente vai dar um vislumbre dele no módulo 5, e quem quiser se aprofundar tem um curso inteiro aqui na Academy. E a **IA generativa** — os assistentes de texto e imagem que explodiram nos últimos anos — é outra família de IA, que em 2026 virou uma copilota poderosa do analista… mas que não substitui o método, porque ela erra com confiança. Disso a gente também vai falar.

[SLIDE 7] O resumo em uma linha: análise descreve, ciência de dados investiga e prevê, ML é uma das técnicas para prever, IA generativa é uma assistente para tudo isso. Se você guardar esse mapa, já sai desta aula sabendo mais que muita gente que trabalha na área.

**[11:00–14:30] — [SLIDE 8 → SLIDE 9] Onde isso acontece no Brasil**

E onde isso tudo acontece no Brasil de verdade — fora das palestras? [SLIDE 8] Deixa eu te dar quatro cenas que eu conheço de perto, dos meus projetos de consultoria e do mercado.

Cena um: **varejo**. Uma rede de farmácias precisa decidir quanto estoque de cada produto mandar para cada loja. Errar para menos é prateleira vazia; errar para mais é capital parado. Previsão de demanda com dados históricos de venda resolve — e o time de dados vira o melhor amigo do time de compras.

Cena dois: **logística**. Uma transportadora com centenas de entregas por dia decide a rota de cada veículo. Dados de trânsito, janelas de entrega, custo de combustível… otimização com dados economiza quilômetro rodado, e quilômetro rodado é dinheiro.

Cena três: **agronegócio** — meu quintal. Sensores e registros de produção monitoram a saúde de rebanhos leiteiros; os dados indicam qual animal precisa de atenção antes de a doença se instalar. O produtor deixa de apagar incêndio e passa a prevenir.

Cena quatro: **setor público e saúde**. Filas de atendimento, agendamento de consultas, distribuição de vacinas — tudo isso melhora quando alguém olha os dados com a pergunta certa. [SLIDE 9] E repara numa coisa: quatro setores completamente diferentes… e o trabalho por trás é o mesmo. Pergunta, dados, análise, decisão. É esse método que a gente aprende na aula 1.3 e pratica o curso inteiro.

**[14:30–16:30] — [SLIDE 10 → SLIDE 11] O mapa do curso e a caixa de ferramentas**

[SLIDE 10] Deixa eu te mostrar a jornada das próximas vinte horas. Módulo 1, este: a área, as profissões e o método — e sua primeira investigação num notebook de verdade. Módulo 2: estatística essencial, sem trauma — prometo e cumpro. Módulo 3: Python e pandas, onde você escreve suas primeiras linhas de código. Módulo 4: visualização e storytelling — o gráfico certo e a narrativa que convence. Módulo 5: o panorama de machine learning, seu projeto final integrador e a escolha da sua trilha aqui na Academy.

[SLIDE 11] E a caixa de ferramentas? Cem por cento gratuita, cem por cento no navegador: Google Colab para o Python, Google Sheets para a estatística, Looker Studio para o primeiro painel. Você não vai instalar absolutamente nada. Se o seu computador abre o YouTube, ele roda este curso inteiro.

**[16:30–20:00] — [CÂMERA] Fechamento**

Antes de encerrar, a frase que eu quero que você leve desta aula — anota, cola no monitor: **ciência de dados é método, não mágica**. Quem promete mágica está vendendo alguma coisa. Quem tem método entrega decisão melhor, em qualquer setor, com qualquer ferramenta.

E a sua tarefa de hoje, que vale ouro para o resto do curso: vai no fórum e escreve duas coisas. Primeira: **um lugar do seu dia ou do seu trabalho onde os dados já estão presentes** — pode ser o aplicativo do busão, a planilha da firma, o relatório da escola do seu filho. Segunda: **uma pergunta que você adoraria responder com dados**. Pode ser grande, pode ser pequena, pode parecer boba — não existe pergunta boba, existe pergunta sem dado. Eu leio todas, e as melhores viram exemplo nas próximas turmas.

Na próxima aula, uma leitura de uns quarenta e cinco minutos, você vai conhecer as profissões da área: quem faz o quê, quanto se estuda para cada papel e por onde as pessoas de verdade entraram no mercado brasileiro. Spoiler: tem muito mais porta de entrada do que você imagina. Te vejo lá. Um abraço!

### c) Estrutura de slides (12 slides)

1. **Capa** — "O que é ciência de dados (e o que ela não é)" · Módulo 1 · Aula 1 · logo Giselle Falcão Academy (fundo roxo, título em lavanda).
2. **Os dados já decidiram seu dia hoje** — 4 cenas com ícones: playlist recomendada; rota recalculada pelo trânsito; preço dinâmico da passagem; limite de crédito aprovado. Frase: "por trás de cada cena, tem gente de dados".
3. **A definição, sem firula** — destaque central: "extrair CONHECIMENTO ÚTIL de dados para apoiar DECISÕES"; as 3 palavras-chave sublinhadas em teal.
4. **As três competências** — diagrama de 3 círculos que se cruzam (estatística · computação · domínio); frase: "ninguém começa sabendo as três — cada pessoa entra por uma porta".
5. **Quatro mitos** — lista: não é sinônimo de IA; não é mágica (dado ruim entra, resposta ruim sai); não é só para gênios da matemática; não é uma ferramenta específica.
6. **O mapa dos termos** — círculos aninhados/sobrepostos: análise de dados (BI) · ciência de dados · machine learning · IA generativa, com 1 linha de definição cada.
7. **O mapa em uma linha** — "análise DESCREVE · ciência de dados INVESTIGA E PREVÊ · ML é uma TÉCNICA para prever · IA generativa é a ASSISTENTE".
8. **Quatro cenas brasileiras** — varejo (estoque de farmácias); logística (rotas de entrega); agro (saúde do rebanho); setor público (filas e vacinas).
9. **Setores diferentes, método igual** — seta: pergunta → dados → análise → decisão; frase: "o método é o mesmo — muda o cenário".
10. **O mapa do curso** — 5 módulos em linha do tempo (roxo → teal), 1 linha por módulo.
11. **Caixa de ferramentas: 100% navegador, 100% gratuita** — Google Colab, Google Sheets, Looker Studio; frase: "se o seu computador abre o YouTube, ele roda este curso".
12. **Sua tarefa de hoje** — "No fórum: (1) onde os dados já tocam o seu dia; (2) uma pergunta que você adoraria responder com dados" + teaser da Aula 1.2.

---

## Aula 1.2 — As profissões dos dados: quem faz o quê no mercado brasileiro

**Tipo:** leitura · **Duração:** 45min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Listar** (lembrar) os principais papéis da área: analista de dados, cientista de dados, engenheiro de dados, engenheiro de ML/analytics engineer. 2. **Comparar** (compreender/analisar) as responsabilidades, ferramentas típicas e perfis de entrada de cada papel. 3. **Relacionar** (analisar) a própria bagagem (formação e experiência) com os papéis da área. 4. **Planejar** (criar) uma hipótese inicial de rota profissional, a ser revisitada no módulo 5. |
| **Duração** | ~45 min de leitura + atividade de autoavaliação |
| **Materiais** | Texto na plataforma (estrutura abaixo); quadro de autoavaliação para download (PDF de 1 página) |
| **Sequência didática** | **Abertura:** o mercado precisa de mais gente do que forma. **Desenvolvimento:** os quatro papéis → um dia na vida de cada um → portas de entrada reais → o que estudar para cada papel. **Fechamento:** atividade de autoavaliação + ponte para a Aula 1.3 (o método comum a todos os papéis). |
| **Avaliação** | Formativa: postagem no fórum (papel que mais chamou atenção + por quê). Somativa: questão 2 do quiz. |

### Estrutura do texto da leitura (para redação na plataforma)

1. **Abertura (2 parágrafos).** A área de dados no Brasil segue com mais vagas do que gente preparada — e com salários acima da média do mercado de tecnologia em muitas posições. Mas "trabalhar com dados" não é um cargo só: é uma família de cargos. Esta leitura apresenta o organograma para você se localizar. (Tom honesto: sem prometer riqueza rápida; a área recompensa consistência, não atalho.)
2. **Os quatro papéis (seção principal, ~50% do texto).** Para cada papel: o que faz, um "dia na vida" narrado em 1 parágrafo, ferramentas típicas e perfil comum de entrada.
   - **Analista de dados** — transforma dados em respostas para o negócio: relatórios, painéis, análises pontuais. Dia na vida: reunião com a área comercial de manhã, tarde limpando uma base e montando um painel. Ferramentas: planilhas, SQL, ferramentas de BI (como o Looker Studio), cada vez mais Python. Porta de entrada mais comum da área — muitos vêm de administração, economia, engenharia, marketing.
   - **Cientista de dados** — investiga causas, constrói estimativas e modelos preditivos, desenha experimentos. Dia na vida: de manhã explorando dados de um problema novo, à tarde testando um modelo e conversando com a área de negócio sobre se o resultado faz sentido. Ferramentas: Python/R, estatística, bibliotecas de ML, notebooks. Perfis de entrada variados: exatas, computação, mas também ciências sociais e saúde com boa base quantitativa.
   - **Engenheiro de dados** — constrói as tubulações: pipelines que coletam, armazenam e disponibilizam dados confiáveis para todo o resto do time. Dia na vida: monitorar cargas noturnas, corrigir uma fonte que mudou de formato, otimizar consultas. Ferramentas: SQL avançado, Python, plataformas de nuvem. Costuma atrair quem vem de desenvolvimento de software.
   - **Engenheiro de ML / analytics engineer** (papéis mais recentes) — coloca modelos em produção e mantém a camada de transformação de dados organizada. Citar sem aprofundar: são especializações naturais depois de alguns anos de estrada.
   - *Caixa de destaque:* "Em empresas menores, uma pessoa faz um pouco de tudo — e está tudo bem. Os papéis são regiões de um mapa, não caixas fechadas."
3. **Portas de entrada reais (3–4 parágrafos).** Trajetórias-tipo (compostas, sem nomes reais): a analista de planejamento que automatizou a própria planilha e virou analista de dados; o professor de matemática que migrou via cursos livres e portfólio; a bióloga que usou análise de dados do mestrado como trampolim. Mensagem: portfólio público (notebooks, painéis) pesa mais que diploma específico para a primeira vaga — e este curso já começa a construir o seu.
4. **O que estudar para cada papel (tabela).** Linhas: analista, cientista, engenheiro. Colunas: base comum (estatística + SQL + uma linguagem), aprofundamento típico, primeiro projeto de portfólio sugerido. Observação: a base comum é exatamente o conteúdo deste curso + as duas trilhas da Academy.
5. **IA generativa e as profissões (2 parágrafos).** Em 2026, assistentes de IA escrevem código e rascunham análises — o que muda o trabalho, mas não elimina o profissional que sabe formular a pergunta, validar o resultado e assumir a responsabilidade pela decisão. Quem domina o método usa a IA como alavanca; quem não domina, vira refém dela.
6. **Fechamento + atividade.** Quadro de autoavaliação: para cada uma das três competências da aula 1.1 (estatística, computação, domínio), o aluno se dá uma nota de 1 a 5 e anota qual papel mais o atraiu. Postar no fórum: "o papel que mais me chamou atenção foi ___ porque ___". Ponte: "Na próxima aula, o que une todos esses papéis: o método que vai da pergunta à decisão."

---

## Aula 1.3 — O método da ciência de dados: da pergunta à decisão

**Tipo:** vídeo · **Duração:** 18min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Nomear** (lembrar) as cinco etapas do método: pergunta → obtenção → limpeza e exploração → análise → comunicação. 2. **Explicar** (compreender) por que a pergunta vem antes da ferramenta e o que caracteriza uma pergunta bem formulada. 3. **Aplicar** (aplicar) o critério de pergunta específica a um caso dado. 4. **Reconhecer** (analisar) o caráter iterativo do método (espiral, não linha reta). |
| **Duração** | 18 min de vídeo |
| **Materiais** | Slides (10); caso-fio-condutor (rede de farmácias) retomado na prática 1.4 |
| **Sequência didática** | **Abertura (0–1:30):** conexão com a leitura das profissões; o que une todos os papéis. **Desenvolvimento (1:30–16:00):** por que método → visão geral das 5 etapas → etapa 1 com pergunta vaga × específica → etapas 2 e 3 com o caso das farmácias → etapa 4 (do simples ao sofisticado) → etapa 5 (comunicação) → a espiral. **Fechamento (16:00–18:00):** síntese + preparação para a prática no Colab. |
| **Avaliação** | Formativa: mini-desafio em tela (transformar uma pergunta vaga em específica). Somativa: questões 3 e 5 do quiz. |

### b) Roteiro de gravação

**[0:00–1:30] — [CÂMERA] Abertura**

Oi de novo! Na leitura passada você conheceu as profissões da área — analista, cientista, engenheiro. Pessoas diferentes, ferramentas diferentes, salários diferentes… mas tem uma coisa que é igual para todo mundo, e é o assunto de hoje: **o método**. O caminho que começa numa pergunta e termina numa decisão. Essa aula é, talvez, a mais importante do curso inteiro — porque ferramenta você troca a cada ano, mas o método vai te acompanhar a carreira toda. Dezoito minutos. Vamos.

**[1:30–3:00] — [SLIDE 2] Sem método, dado é opinião cara**

[SLIDE 2] Deixa eu te dizer por que método importa. Sem método, análise de dados vira o quê? Vira procurar número que confirme o que a gente já achava. Vira gráfico bonito que não responde nada. Vira reunião em que cada um chega com a "sua" planilha e a "sua" verdade. Eu costumo dizer assim: **sem método, dado é só opinião cara** — porque custou tempo e dinheiro para coletar, e no fim virou enfeite de slide.

O trabalho com dados é parente do trabalho do detetive: você tem evidências, levanta hipóteses, e vai atrás de confirmar ou descartar cada uma. O detetive que decide o culpado antes de olhar as evidências… condena inocente. O analista que decide a conclusão antes de olhar os dados também.

**[3:00–5:00] — [SLIDE 3] As cinco etapas — visão geral**

[SLIDE 3] O método que a gente vai usar no curso inteiro tem cinco etapas. Um: **pergunta** — o que exatamente queremos saber, e para qual decisão. Dois: **obtenção** — conseguir os dados que podem responder. Três: **limpeza e exploração** — conhecer e arrumar os dados antes de confiar neles. Quatro: **análise** — calcular, comparar, modelar, extrair a resposta. Cinco: **comunicação** — transformar a resposta em algo que alguém consiga usar para decidir. Pergunta, obtenção, limpeza, análise, comunicação. Cinco etapas. Vamos passear por cada uma com um caso concreto.

**[5:00–7:30] — [SLIDE 4] Etapa 1: a pergunta — vaga × específica**

[SLIDE 4] Etapa um, a mais decisiva. Imagina que a diretora de uma rede de farmácias te chama e diz: *"as vendas estão ruins, dá uma olhada nos dados aí"*. Isso é uma pergunta vaga — e pergunta vaga produz análise infinita: você pode olhar mil coisas e não chegar a lugar nenhum.

O primeiro trabalho do profissional de dados é **transformar pergunta vaga em pergunta específica**. Por exemplo: *"quais lojas ficaram abaixo da meta de vendas nos últimos três meses — e o que essas lojas têm em comum?"*. Percebe a diferença? Agora eu sei o que medir (venda contra meta), em que recorte (por loja), em que período (três meses) e com que objetivo (achar padrão para agir).

Mini-desafio: pausa o vídeo e transforma essa aqui numa pergunta específica: *"o pessoal está abandonando o nosso aplicativo"*… — [pausa 3s] — uma boa versão seria: *"qual porcentagem dos usuários novos deixa de abrir o app após 30 dias, e em que tela eles desistem?"*. Se a sua versão tem **o que medir, o recorte e o período**, você acertou o espírito.

**[7:30–9:30] — [SLIDE 5] Etapa 2: obtenção — e a regra do lixo**

[SLIDE 5] Etapa dois: obter os dados. Eles podem vir de sistemas internos — o caixa da farmácia, o cadastro de clientes —, de fontes públicas — IBGE, órgãos de governo, portais de dados abertos —, ou de coleta própria. No nosso curso você vai usar dados públicos brasileiros de verdade: estimativas do IBGE já nesta prática, notas do ENEM no módulo 2, e-commerce no módulo 3.

E aqui mora uma regra de ouro com nome feio em inglês: *garbage in, garbage out* — entra lixo, sai lixo. Não existe análise boa de dado ruim. Por isso a pergunta da etapa dois nunca é só "onde tem dado?", é **"esse dado é confiável e serve para a minha pergunta?"**. Quem publicou? De quando é? O que cada linha representa?

**[9:30–11:30] — [SLIDE 6] Etapa 3: limpeza e exploração — a fama dos 80%**

[SLIDE 6] Etapa três, a mais famosa — pelo motivo errado. Você talvez já tenha ouvido que "80% do tempo do cientista de dados é limpando dado". A fama é real: dados chegam com buracos, duplicatas, formatos trocados. Mas eu quero te dar outra leitura: esse tempo não é desperdício. **Limpar e explorar É analisar** — é a fase em que você conhece os dados de verdade, e é nela que os erros caros são evitados.

Voltando às farmácias: explorando os dados, você descobre que uma das lojas com queda de venda ficou três semanas com obra na calçada. Tá vendo? Isso não estava em nenhuma coluna da planilha — apareceu porque você explorou, estranhou o padrão, e foi perguntar. Explorar é isso: olhar os dados com curiosidade **antes** de sair concluindo.

**[11:30–13:30] — [SLIDE 7] Etapa 4: análise — comece simples**

[SLIDE 7] Etapa quatro: a análise em si. E aqui vai a regra da casa, que eu aplico nos meus projetos de consultoria e você vai me ver repetindo: **comece pela média e pelo gráfico**. Uma contagem bem-feita, uma comparação honesta entre grupos, uma linha no tempo — isso resolve uma parte enorme das perguntas reais. Modelagem sofisticada, machine learning, tudo isso existe e tem sua hora — o módulo 5 te mostra o mapa —, mas é degrau de cima. Ninguém constrói o segundo andar antes do térreo, e muita pergunta de negócio se responde no térreo.

No caso das farmácias: uma tabela com venda contra meta por loja e um gráfico de barras ordenado já mostram **quais** lojas sofrem. Um recorte por bairro e por mês começa a mostrar **por quê**. Sem nenhum algoritmo místico.

**[13:30–15:00] — [SLIDE 8] Etapa 5: comunicação — análise sem decisão é hobby**

[SLIDE 8] Etapa cinco, a que separa profissional de amador: comunicar. Uma análise que ninguém entende ou que não leva a nenhuma ação… é hobby. Caro. A entrega final do método nunca é "o notebook" nem "a planilha" — é a **recomendação**: uma frase com número, com ressalva honesta e com sugestão de ação. Tipo assim: "cinco lojas concentram a queda; três delas tiveram obras no entorno; recomendo repor a meta dessas três e investigar as outras duas". O módulo 4 é inteirinho sobre essa arte — do gráfico certo ao texto que convence.

**[15:00–16:00] — [SLIDE 9] Espiral, não linha reta**

[SLIDE 9] Último conceito: essas cinco etapas parecem uma fila indiana, mas na vida real são uma **espiral**. Você analisa e descobre que precisa de mais dados — volta à etapa dois. Comunica e a diretora faz uma pergunta nova — volta à etapa um, um andar acima. Isso não é fracasso do método; isso **é** o método. Cada volta da espiral responde melhor.

**[16:00–18:00] — [CÂMERA] Fechamento**

Recapitulando em uma respiração: pergunta específica, dados confiáveis, explorar antes de confiar, começar simples na análise, e terminar em recomendação — girando em espiral. Esse é o esqueleto de todo trabalho de dados bem feito, do estagiário ao diretor.

E agora a melhor parte: na próxima aula você vai **executar** esse método inteirinho, de ponta a ponta, em uma investigação de verdade — "onde o Brasil cresce?" — usando dados inspirados nas estimativas do IBGE, dentro do Google Colab. O notebook já está pronto, todo comentado, com as cinco etapas marcadas. Seu trabalho é rodar, entender, e encarar um desafio no final. Se a palavra "Python" der um friozinho na barriga… respira: nesta prática todo código já vem escrito. Escrever, você só vai começar no módulo 3, com calma. Te vejo no Colab!

### c) Estrutura de slides (10 slides)

1. **Capa** — "O método da ciência de dados: da pergunta à decisão" · Módulo 1 · Aula 3.
2. **Sem método, dado é opinião cara** — bullets: procurar número que confirma o que já se achava; gráfico bonito que não responde nada; analogia do detetive: evidência → hipótese → verificação.
3. **As cinco etapas** — diagrama em 5 setas (teal sobre lavanda): pergunta → obtenção → limpeza e exploração → análise → comunicação, 1 linha de definição por etapa.
4. **Etapa 1: pergunta vaga × específica** — lado a lado: "as vendas estão ruins" × "quais lojas ficaram abaixo da meta nos últimos 3 meses e o que têm em comum?"; os 3 ingredientes: o que medir · recorte · período; mini-desafio do aplicativo.
5. **Etapa 2: obtenção** — bullets: fontes internas, públicas (IBGE, ENEM, dados abertos), coleta própria; *garbage in, garbage out*; as 3 perguntas de confiabilidade (quem publicou? de quando? cada linha é o quê?).
6. **Etapa 3: limpeza e exploração** — bullets: a fama dos 80%; limpar e explorar É analisar; o caso da loja com obra na calçada — o contexto que não estava na planilha.
7. **Etapa 4: comece simples** — bullets: média, contagem e gráfico resolvem muito; comparação honesta entre grupos; modelagem é degrau de cima (mapa no módulo 5); "ninguém constrói o segundo andar antes do térreo".
8. **Etapa 5: comunicação** — bullets: análise sem decisão é hobby caro; a entrega é a recomendação: número + ressalva + ação; exemplo das 5 lojas.
9. **Espiral, não linha reta** — diagrama em espiral com as 5 etapas se repetindo; frase: "voltar de etapa não é fracasso — é o método funcionando".
10. **Próxima parada: sua primeira investigação** — bullets: "onde o Brasil cresce?"; dados inspirados no IBGE; Colab com tudo comentado; as 5 etapas marcadas no notebook.

---

## Aula 1.4 — Sua primeira investigação no Colab: onde o Brasil cresce?

**Tipo:** prática · **Duração:** 90min · **Ferramenta:** Google Colab

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Executar** (aplicar) células de código em um notebook do Google Colab. 2. **Percorrer** (aplicar) as cinco etapas do método em uma investigação guiada. 3. **Inspecionar** (analisar) um DataFrame com `head()`, `shape` e `describe()`. 4. **Interpretar** (analisar) a diferença entre crescimento absoluto e percentual. 5. **Adaptar** (criar) padrões de código dados para completar o desafio final. |
| **Duração** | ~90 min (setup 10min + trilha guiada 50min + desafio 20min + comunicação 10min) |
| **Materiais** | Notebook starter `fundamentos-ciencia-de-dados-pratica-modulo1.ipynb` (na plataforma, em `/cursos/notebooks/`); conta Google |
| **Sequência didática** | **Abertura:** a pergunta da investigação + setup do Colab. **Desenvolvimento:** execução guiada célula a célula, com as 5 etapas do método sinalizadas no próprio notebook. **Fechamento:** desafio com TODOs + célula de comunicação (2–3 frases de recomendação) + compartilhamento. |
| **Avaliação** | Critérios de conclusão (checklist abaixo) + envio do link do notebook na plataforma. |

### d) Prática guiada — passo a passo

**Pergunta da investigação:** *"Quais estados brasileiros mais cresceram em população — e o que isso diz para quem planeja serviços e negócios?"*

**Dados:** amostra didática embutida no notebook — valores aproximados e arredondados, para fins didáticos, inspirados nas **estimativas populacionais do IBGE** (ibge.gov.br). Cada linha é uma unidade da federação (27 no total), com região, população estimada em 2020 e 2025 (em milhares de habitantes) e área em km². A última célula do notebook indica onde encontrar os dados oficiais completos.

1. Baixe o notebook da aula na plataforma (botão "Materiais" → `fundamentos-ciencia-de-dados-pratica-modulo1.ipynb`).
2. Acesse https://colab.research.google.com e faça login com sua conta Google.
3. No Colab, clique em **Arquivo → Fazer upload de notebook** e selecione o arquivo baixado.
4. Leia a primeira célula (boas-vindas + a pergunta da investigação) e repare no mapa: cada seção do notebook corresponde a uma etapa do método da Aula 1.3.
5. Execute a célula de importações com o **botão ▶** à esquerda (ou `Ctrl+Enter`). *Checkpoint: aparece a mensagem de bibliotecas prontas, sem erro em vermelho.*
6. Execute a célula que monta a tabela `df` com as 27 UFs. *Checkpoint: a saída confirma 27 linhas e 5 colunas.*
7. Execute `df.head()` e responda mentalmente à pergunta de ouro da granularidade: cada linha é o quê? (Uma UF.)
8. Execute a célula de `describe()` e anote: qual a maior e a menor população de 2025? A média diz muito aqui? (Repare como SP puxa tudo.)
9. Execute a célula que calcula o crescimento **absoluto** (em milhares) e **percentual**, e mostra o top 10. Compare os dois rankings: quem lidera em cada um?
10. Leia a célula de interpretação: por que o percentual é mais justo para comparar estados de tamanhos tão diferentes — e por que os dois números juntos contam a história completa.
11. Execute a célula de agregação por **região** (`groupby`) e observe qual região cresce mais rápido em média.
12. Execute a célula do gráfico de barras (top 10 de crescimento percentual). Repare no título: ele **afirma** o achado, não descreve o gráfico — técnica que o módulo 4 aprofunda.
13. **Desafio final (célula com TODOs):** (a) calcule a densidade demográfica de 2025 (habitantes por km²); (b) descubra a UF mais densa e a menos densa; (c) monte o gráfico de barras da densidade média por região. Dica: os padrões são os mesmos das células anteriores — copie e adapte.
14. **Comunicação (etapa 5):** edite a célula de texto final e escreva **2 a 3 frases de recomendação** para um gestor público ou empresário a partir do que você encontrou (ex.: onde abrir uma filial? onde faltará escola?).
15. Compartilhe: **Compartilhar → Qualquer pessoa com o link → Leitor**, copie o link e envie na atividade da plataforma. Poste também sua recomendação no fórum.

**Critérios de conclusão (checklist do aluno):**

- [ ] Todas as células executam sem erro, de cima a baixo (`Ambiente de execução → Executar tudo`).
- [ ] Sei dizer qual UF lidera o crescimento absoluto e qual lidera o percentual.
- [ ] Completei os três TODOs do desafio e o gráfico de densidade por região aparece.
- [ ] Escrevi 2–3 frases de recomendação na célula final.
- [ ] Enviei o link compartilhável do notebook na plataforma.

**Problemas comuns e socorro rápido:**

- *"Célula travada em execução"* → menu **Ambiente de execução → Reiniciar sessão** e execute de novo desde o topo.
- *"NameError: df is not defined"* → você pulou a célula que cria o `df`; execute as células na ordem.
- *"O gráfico não apareceu"* → confirme que executou a célula de importações (ela liga o matplotlib) e rode a célula do gráfico de novo.
- *Fiquei perdido nos TODOs* → releia a célula equivalente da trilha guiada; o desafio usa exatamente os mesmos padrões, só trocando as colunas.

---

## Aula 1.5 — Quiz do Módulo 1 — A área, as profissões e o método

**Tipo:** quiz · **Duração:** 15min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos** | Verificar a fixação dos conceitos do módulo (definição e mitos da ciência de dados, papéis profissionais, método em 5 etapas, leitura da primeira prática). |
| **Formato** | 5 questões objetivas, 3 alternativas, correção automática com explicação; 2 tentativas; nota mínima 70% (compõe a média de quizzes — 50% da nota do curso). |

### Questões (com gabarito)

**Q1.** O que melhor define ciência de dados?
- a) O uso de inteligência artificial para automatizar tarefas repetitivas de uma empresa.
- b) A prática de extrair conhecimento útil de dados para apoiar decisões, combinando estatística, computação e conhecimento do domínio. ✅
- c) O domínio avançado de uma ferramenta específica, como Python ou Excel.

*Explicação: a definição da aula 1.1 tem três palavras-chave — conhecimento, útil e decisões — e se apoia na interseção de três competências. IA é uma das ferramentas da caixa (não a definição da área), e ferramentas mudam: o método fica.*

**Q2.** Qual alternativa descreve corretamente a diferença entre analista de dados e cientista de dados?
- a) O analista responde perguntas sobre o que aconteceu (relatórios, painéis, indicadores); o cientista vai além, investigando causas e construindo estimativas e modelos preditivos. ✅
- b) O analista trabalha com dados pequenos e o cientista com dados grandes — essa é a única diferença.
- c) O analista usa Excel e o cientista usa Python; quem usa as duas ferramentas é engenheiro de dados.

*Explicação: a fronteira entre os papéis é o tipo de pergunta, não o tamanho do dado nem a ferramenta. O engenheiro de dados, aliás, cuida das "tubulações" — pipelines que coletam e disponibilizam dados confiáveis — e não se define por usar duas ferramentas.*

**Q3.** A diretora diz: "as vendas estão ruins, dá uma olhada nos dados". Segundo o método do curso, qual é o primeiro passo profissional?
- a) Abrir a base de vendas e calcular todas as estatísticas possíveis até algo chamar atenção.
- b) Transformar a demanda em uma pergunta específica — com o que medir, o recorte e o período — como "quais lojas ficaram abaixo da meta nos últimos 3 meses?". ✅
- c) Treinar um modelo de machine learning para prever as vendas do próximo trimestre.

*Explicação: pergunta vaga produz análise infinita. A etapa 1 do método é especificar: o que medir (venda contra meta), o recorte (por loja) e o período (3 meses). Sair calculando tudo é procurar agulha sem saber o que é agulha, e modelagem é degrau posterior — se for necessária.*

**Q4.** Sobre a relação entre ciência de dados, machine learning e IA generativa, é correto afirmar:
- a) Ciência de dados, machine learning e IA são três nomes para a mesma coisa.
- b) Machine learning é uma técnica dentro da ciência de dados, e a IA generativa atua como assistente — nenhum dos dois substitui o método da pergunta à decisão. ✅
- c) Com a IA generativa de 2026, o método da ciência de dados ficou obsoleto: basta pedir a análise pronta ao assistente.

*Explicação: o mapa da aula 1.1 — análise descreve, ciência de dados investiga e prevê, ML é uma das técnicas, IA generativa é a assistente. A IA acelera o trabalho, mas erra com confiança: formular a pergunta, validar o resultado e assumir a decisão continuam sendo humanos.*

**Q5.** Na prática do módulo, Roraima liderou o crescimento percentual enquanto São Paulo liderou o absoluto. Por que calculamos o crescimento PERCENTUAL além do absoluto?
- a) Porque o percentual permite comparar de forma justa estados de tamanhos muito diferentes — 190 mil novos habitantes transformam Roraima, mas passariam despercebidos em São Paulo. ✅
- b) Porque o crescimento absoluto está sempre errado e não deve ser usado em análises.
- c) Porque gráficos de barras só aceitam valores em porcentagem.

*Explicação: cada medida conta metade da história — o absoluto mostra o volume (relevante para dimensionar serviços), o percentual mostra o ritmo (relevante para comparar dinâmicas). Por isso a prática pede os dois rankings lado a lado; nenhum deles é "errado", e gráficos aceitam qualquer unidade.*
