# Módulo 1 — Anatomia de um Agente de IA

**Curso:** Agentes de IA e Automação Inteligente · **Carga do módulo:** 4h
**Papel no curso:** módulo de amostra gratuita — precisa encantar E entregar valor real sozinho.

**Objetivo do módulo:** ao final, o aluno diferencia agente de chatbot, explica o loop ReAct com as próprias palavras e **constrói em Colab um agente funcional** que consulta CEP e previsão do tempo para decidir sobre uma rota de entrega.

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 1.1 | Do chatbot ao agente: o que muda quando a IA age | vídeo | 20 min |
| 1.2 | O ecossistema de agentes em 2026: function calling, MCP e frameworks | leitura | 30 min |
| 1.3 | Por dentro do loop do agente: ReAct, ferramentas e guardrails | vídeo | 25 min |
| 1.4 | Seu primeiro agente autônomo no Google Colab | prática | 90 min |
| 1.5 | Quiz — Anatomia de um agente | quiz | 15 min |

---
---

# AULA 1.1 — Do chatbot ao agente: o que muda quando a IA age (vídeo, 20 min)

## A) Plano de aula

**Objetivos de aprendizagem** (o aluno será capaz de):
- **Definir** o que caracteriza um agente de IA e **diferenciá-lo** de um chatbot e de uma automação tradicional (Compreender).
- **Identificar** os quatro componentes de um agente: modelo, ferramentas, memória e loop de decisão (Lembrar/Compreender).
- **Classificar** cenários do próprio trabalho segundo a matriz risco × valor de autonomia (Analisar).

**Duração:** 20 min de vídeo + ~5 min de reflexão proposta ao final.

**Materiais:** roteiro de gravação (abaixo), 12 slides (estrutura abaixo), teleprompter ou notas.

**Sequência didática:**
- *Abertura (0:00–4:00):* boas-vindas + caso concreto de logística que cria a necessidade ("por que um chatbot não resolve isso?").
- *Desenvolvimento (4:00–14:30):* definição de agente por contraste; os 4 componentes; níveis de autonomia e matriz risco × valor com exemplos brasileiros.
- *Fechamento (14:30–20:00):* panorama do curso, o que o aluno vai construir, chamada para a prática 1.4 e pergunta reflexiva.

**Avaliação:** pergunta reflexiva ao final ("liste 2 processos do seu trabalho e posicione-os na matriz risco × valor") + questões 1 e 4 do quiz 1.5.

## B) Roteiro de gravação

> Formato: teleprompter ou guia. Marcações: **[ROSTO]** = Giselle na câmera, **[SLIDE N]** = mostrar slide. Tom: conversa de professora experiente, não leitura.

**[0:00–1:30] [ROSTO] Abertura**

Oi! Que bom ter você aqui. Eu sou a Giselle Falcão, e esse é o primeiro módulo do curso de Agentes de IA e Automação Inteligente. Se você chegou até aqui, provavelmente você já usa IA no dia a dia — já escreve bons prompts, já analisa dados com LLM — e bateu naquela pergunta que eu mais escuto nos meus projetos de consultoria: "tá, Giselle, mas como eu faço isso rodar sozinho?". Como a IA sai do papel de assistente que responde quando eu pergunto... e vira uma peça do processo, que percebe, decide e age?

É exatamente isso que a gente vai construir nesse curso. E eu digo construir no sentido literal: já nesse primeiro módulo você sai com um agente funcionando, feito por você, no navegador, sem instalar nada. Combinado? Então vem comigo.

**[1:30–4:00] [SLIDE 2] O caso que motiva tudo**

Deixa eu começar com uma cena que eu vejo direto nos meus projetos de consultoria em logística. Imagina uma transportadora com trezentas entregas programadas pra amanhã no interior de Minas. De madrugada, muda a previsão: frente fria, oitenta milímetros de chuva na região de três rotas. Quem percebe isso hoje? Na maioria das empresas... ninguém. O analista chega às oito, abre o painel, vê a chuva, replaneja — e a essa altura os caminhões já saíram.

Agora pensa comigo: a informação estava disponível. A previsão do tempo é pública. As rotas estão no sistema. A regra de decisão — "se chover mais que tanto, repriorize cargas perecíveis" — cabe num parágrafo. O que faltou não foi informação, foi **alguém acordado às três da manhã cruzando as duas coisas**. É esse "alguém" que a gente vai aprender a construir. E adianto: no final deste módulo, na prática, você vai montar exatamente um mini agente desse cenário — CEP, clima e decisão de rota.

**[4:00–7:00] [SLIDE 3, depois SLIDE 4] Chatbot × agente**

Então vamos dar nome aos bois. Qual é a diferença entre um chatbot e um agente?

O chatbot é **reativo**: você pergunta, ele responde, acabou. Toda a inteligência dele acontece dentro de uma resposta. Se a resposta exige um dado que ele não tem — a previsão de amanhã, o estoque de agora — ele inventa ou desiste.

O agente é **proativo dentro de um objetivo**. Você não dá uma pergunta, você dá uma *missão*: "garanta que as entregas de amanhã não sejam pegas de surpresa pela chuva". E o agente decide sozinho os passos: consultar a previsão, cruzar com as rotas, calcular o risco, e — dependendo da autonomia que você deu — replanejar ou acionar um humano.

[SLIDE 4] Repara que são três diferenças concretas, guarda essas três: primeiro, o agente **usa ferramentas** — APIs, bancos de dados, planilhas — pra perceber e agir no mundo. Segundo, ele roda em **loop**: age, observa o resultado, decide o próximo passo. Terceiro, ele tem **critério de parada**: sabe quando a missão terminou. Chatbot não tem nenhuma das três.

**[7:00–11:00] [SLIDES 5–7] Os quatro componentes**

Todo agente — não importa o framework, não importa o fornecedor — tem quatro componentes. Eu gosto de apresentar com uma analogia de gente mesmo.

[SLIDE 5] Primeiro, o **modelo**, o LLM. É o cérebro: interpreta a missão, raciocina, escolhe o próximo passo. No módulo 2 a gente aprende a escolher esse cérebro — porque tem missão que pede um modelo caro e poderoso, e tem missão que roda lindamente num modelo pequeno e barato.

Segundo, as **ferramentas**. São as mãos e os sentidos. Uma ferramenta é, na prática, uma função que o modelo pode pedir pra executar: "consulte esse CEP", "busque a previsão", "escreva nessa planilha". É aqui que mora a mágica do function calling, e é aqui que entra o MCP, o protocolo que padronizou isso tudo — módulo 4 inteiro sobre isso.

[SLIDE 6] Terceiro, a **memória**. O caderno de anotações. Curto prazo: o que já aconteceu nessa missão. Longo prazo: o que o agente aprendeu em missões passadas, o conhecimento da sua empresa — e aí entra o RAG, no módulo 3.

Quarto — e esse é o que separa demo de produção — o **loop de decisão** com **guardrails**. A disciplina. Quantas vezes o agente pode tentar? O que ele pode fazer sozinho e o que exige aprovação humana? Eu vejo isso direto nos meus projetos: o técnico fica fascinado pelo cérebro, e quem garante que o agente entra em produção é a disciplina.

[SLIDE 7] Fórmula no slide, pra fixar: **agente = modelo + ferramentas + memória + loop com guardrails**. Se alguém te vender "agente" sem um desses quatro, desconfia.

**[11:00–14:30] [SLIDES 8–9] Onde agente faz sentido: risco × valor**

Agora, a pergunta de um milhão de reais — literalmente, porque erro aqui custa caro: **onde** vale a pena colocar um agente?

[SLIDE 8] Eu uso uma matriz simples com meus clientes: no eixo horizontal, o **valor da autonomia** — quanto vale decidir rápido, fora do horário, em escala. No eixo vertical, o **risco do erro** — o que acontece se o agente errar.

[SLIDE 9] Três exemplos do mundo que eu vivo. Monitorar clima e reordenar prioridade de entregas: valor alto, risco moderado — o pior caso é uma entrega adiantada sem necessidade. Ótimo primeiro agente. Responder dúvidas de produtores sobre um manual técnico de cooperativa, com RAG: valor alto, risco baixo se ele citar a fonte. Excelente candidato. Agora, aprovar crédito rural ou liberar laudo de qualidade sozinho? Valor alto, mas risco altíssimo — aí o agente **prepara** a decisão e um humano bate o martelo. Isso tem nome, human-in-the-loop, e a gente dedica boa parte do módulo 6 a isso.

A regra de bolso que eu quero que você leve: comece pelo quadrante de **alto valor e baixo risco**, e desenhe o caminho de aprovação humana pra todo o resto.

**[14:30–17:30] [SLIDE 10–11] O mapa do curso**

Deixa eu te mostrar o mapa da mina. [SLIDE 10] Módulo 1, esse aqui: anatomia do agente e seu primeiro agente rodando. Módulo 2: o cérebro — como escolher modelo e escrever o contexto que faz o agente decidir bem. Módulo 3: RAG, o conhecimento — seu agente lendo os documentos da *sua* operação. Módulo 4: MCP — plugando o agente em APIs reais do jeito que virou padrão da indústria. Módulo 5: orquestração — vários agentes trabalhando juntos com memória. E módulo 6: produção — segurança, custo, monitoramento, e o seu projeto final certificado.

[SLIDE 11] E o projeto final não é enfeite: você vai entregar um agente completo, com RAG, ferramentas e uma API real, documentado, do jeito que eu entregaria num projeto de consultoria. É peça de portfólio.

**[17:30–20:00] [ROSTO] Fechamento**

Antes de você ir pra próxima aula, eu quero te pedir uma coisa — e quem já fez curso comigo sabe que eu cobro. Pega papel e caneta, ou abre uma nota no celular, e escreve **dois processos do seu trabalho** que hoje dependem de alguém "estar olhando". Posiciona cada um na matriz: qual o valor de rodar sozinho? Qual o risco se errar? Guarda essa nota — ela vai virar seu projeto final, eu prometo.

Na próxima aula, uma leitura curta: o ecossistema de agentes em 2026 — function calling, MCP, os frameworks — pra você entender o mapa antes de a gente descer pro código. E logo depois, na aula 1.3, a gente abre o capô do loop ReAct. Te vejo lá!

## C) Estrutura de slides (12 slides)

1. **Capa** — "Do chatbot ao agente: o que muda quando a IA age" · Módulo 1, Aula 1 · logo da Academy (fundo roxo, detalhe teal).
2. **A cena das 3h da manhã** — bullets: 300 entregas programadas; frente fria muda a previsão de madrugada; informação pública + regra simples; faltou "alguém acordado cruzando as duas coisas".
3. **Chatbot: reativo** — pergunta → resposta → fim; inteligência confinada à resposta; sem acesso a dados vivos.
4. **Agente: uma missão, não uma pergunta** — recebe objetivo; decide os passos; 3 marcas registradas: usa ferramentas · roda em loop · sabe quando parar.
5. **Componentes 1 e 2** — Modelo (cérebro: interpreta, raciocina, escolhe) · Ferramentas (mãos e sentidos: APIs, bancos, planilhas — function calling / MCP).
6. **Componentes 3 e 4** — Memória (curto prazo: a missão; longo prazo: RAG) · Loop com guardrails (limite de tentativas, permissões, aprovação humana).
7. **A fórmula** — AGENTE = MODELO + FERRAMENTAS + MEMÓRIA + LOOP COM GUARDRAILS (slide de destaque, uma linha só).
8. **Matriz risco × valor** — quadrante 2×2: eixo X = valor da autonomia; eixo Y = risco do erro; quadrante verde = "comece aqui" (alto valor, baixo risco).
9. **Três exemplos na matriz** — reordenar entregas por clima (valor alto/risco moderado) · dúvidas sobre manual técnico com RAG (valor alto/risco baixo) · aprovar crédito rural (valor alto/risco altíssimo → human-in-the-loop).
10. **Mapa do curso** — 6 módulos em linha do tempo: Anatomia → Cérebro (LLMs) → Conhecimento (RAG) → Conexões (MCP) → Orquestração → Produção + Projeto.
11. **Seu projeto final** — agente completo: RAG + 3 ferramentas + 1 API real + documentação; avaliado por rubrica; peça de portfólio.
12. **Sua tarefa antes da próxima aula** — anote 2 processos que dependem de "alguém olhando"; posicione na matriz risco × valor; guarde a nota (vira projeto final).

---
---

# AULA 1.2 — O ecossistema de agentes em 2026: function calling, MCP e frameworks (leitura, 30 min)

## A) Plano de aula

**Objetivos de aprendizagem** (o aluno será capaz de):
- **Descrever** a evolução técnica que levou do function calling (2023) ao MCP como padrão de mercado (Compreender).
- **Nomear** os principais frameworks de agentes de 2026 e **explicar** por que o curso é agnóstico de framework (Compreender/Avaliar).
- **Situar** MCP, RAG e orquestração no mapa de componentes visto na aula 1.1 (Analisar).

**Duração:** ~30 min de leitura.

**Materiais:** texto-base abaixo (publicar na plataforma), com 3 perguntas de reflexão embutidas.

**Sequência didática:** o texto segue a linha do tempo (2023 → 2026), fecha conectando cada tecnologia ao módulo do curso onde será praticada.

**Avaliação:** perguntas de reflexão ao longo do texto (autoavaliação) + questão 3 do quiz 1.5.

## B) Texto-base (conteúdo da plataforma)

### De "gerador de texto" a "trabalhador digital": uma linha do tempo honesta

Quando os LLMs explodiram em popularidade, eles tinham um limite óbvio: só produziam texto. Qualquer ação no mundo real — consultar um sistema, gravar um registro — dependia de um humano copiar e colar. A história dos agentes é a história de como esse limite foi caindo, camada por camada.

**2023 — Function calling.** Os provedores de LLM (OpenAI primeiro, depois todos) ensinaram os modelos a responder, em vez de texto livre, com um **pedido estruturado de execução de função**: um JSON dizendo "chame `previsao_tempo` com `latitude=-19.9` e `longitude=-43.9`". O modelo não executa nada — quem executa é o *seu* código — mas agora existe um contrato claro entre o raciocínio do modelo e as ações do sistema. O function calling é, até hoje, o tijolo fundamental de qualquer agente, e é o que você vai usar na prática 1.4.

**2022–2023 — ReAct.** Em paralelo, a pesquisa acadêmica formalizou o padrão **ReAct** (*Reasoning + Acting*, Yao et al.): o modelo alterna raciocínio ("preciso saber o clima antes de decidir"), ação (chamar a ferramenta) e observação (ler o resultado), em loop, até concluir a missão. A aula 1.3 abre esse loop em detalhe.

**2024 — MCP.** Cada empresa integrava ferramentas ao seu modelo de um jeito. Integrar N sistemas a M modelos custava N×M conectores. Em novembro de 2024, a Anthropic lançou como padrão aberto o **Model Context Protocol (MCP)** — um protocolo que padroniza como aplicações expõem ferramentas, dados e prompts para modelos de IA. A analogia consagrada: o **USB-C dos agentes**. Você escreve um servidor MCP para o seu sistema *uma vez*, e qualquer cliente compatível — de qualquer fornecedor — consegue usá-lo.

**2025 — adoção em massa.** O que fez o MCP virar padrão de fato foi a adoção cruzada: OpenAI, Google e Microsoft anunciaram suporte ao protocolo em 2025, e um ecossistema de milhares de servidores MCP públicos surgiu — de bancos de dados a ferramentas de produtividade. Surgiram também protocolos complementares focados em comunicação *entre* agentes (como o A2A, iniciado pelo Google). No módulo 4, você constrói e consome seu próprio servidor MCP.

**2026 — a era dos agentes "verticais".** O hype de "agentes que fazem tudo" deu lugar a algo mais maduro e mais interessante para quem trabalha com operações: **agentes estreitos e profundos**, desenhados para um processo específico — triagem de ocorrências logísticas, resposta técnica a produtores, monitoramento de qualidade industrial — com guardrails, avaliação contínua e aprovação humana nos pontos críticos. É exatamente esse tipo de agente que este curso ensina a construir.

> **Pare e pense №1:** na sua empresa, quantos sistemas um agente precisaria acessar para automatizar o processo que você anotou na aula 1.1? Cada um seria um conector sob medida — ou um servidor MCP reutilizável?

### O mapa dos frameworks (e por que não vamos casar com nenhum)

Em 2026, os nomes que você mais vai ouvir:

- **LangGraph** (ecossistema LangChain): orquestração de agentes como grafos de estados; forte em fluxos complexos e auditáveis.
- **CrewAI**: abstração de "equipes" de agentes com papéis; curva de entrada suave.
- **OpenAI Agents SDK** e **Google ADK**: kits oficiais dos provedores, integração profunda com seus modelos.
- **Claude Agent SDK** (Anthropic): o kit que empacota o loop agêntico usado pelo Claude Code, com MCP nativo.

Todos são bons. Todos mudam rápido. E todos implementam **os mesmos fundamentos**: loop ReAct, function calling, gestão de contexto, ferramentas, memória. Por isso a decisão pedagógica deste curso: você vai construir o loop **do zero, em Python puro, no Colab** — porque quem entende o loop lê a documentação de qualquer framework em uma tarde. O contrário não é verdade: quem só decorou um framework fica órfão na próxima mudança de API.

> **Pare e pense №2:** você já viu esse filme em outra área? (Quem aprendeu SQL navegou entre bancos; quem decorou um ORM específico, nem tanto.)

### Onde cada peça entra no curso

| Peça do ecossistema | O que resolve | Onde você pratica |
|---|---|---|
| Function calling | contrato modelo ↔ ações | Módulo 1 (prática 1.4) e Módulo 2 |
| ReAct / loop de agente | autonomia com critério de parada | Módulos 1 e 5 |
| RAG | conhecimento privado da empresa | Módulo 3 |
| MCP | integração padronizada com sistemas | Módulo 4 |
| Orquestração / multiagente | processos com várias especialidades | Módulo 5 |
| Observabilidade, segurança, avaliação | produção de verdade | Módulo 6 + projeto final |

> **Pare e pense №3:** olhando a tabela, qual peça é o maior gargalo hoje no seu contexto — conhecimento (RAG), integração (MCP) ou confiança (guardrails)? Sua resposta é uma pista de por onde seu projeto final deve começar.

### Para guardar

1. Function calling é o tijolo; ReAct é a planta; MCP é o encanamento padronizado; frameworks são andaimes.
2. MCP virou padrão porque foi **aberto e adotado por concorrentes** — aposte em padrões, não em marcas.
3. Em 2026, o valor está em agentes **estreitos, profundos e com guardrails** — não em "AGI de garagem".

---
---

# AULA 1.3 — Por dentro do loop do agente: ReAct, ferramentas e guardrails (vídeo, 25 min)

## A) Plano de aula

**Objetivos de aprendizagem** (o aluno será capaz de):
- **Explicar** o ciclo ReAct (raciocínio → ação → observação) e o papel do critério de parada (Compreender).
- **Descrever** como uma ferramenta é declarada ao modelo (nome, descrição, parâmetros) e como o function calling fecha o ciclo (Compreender/Aplicar).
- **Antecipar** os três erros clássicos de agente (loop infinito, alucinação de ferramenta, excesso de autonomia) e **associar** cada um ao guardrail que o previne (Analisar).
- **Interpretar** o pseudocódigo do loop que será implementado na prática 1.4 (Aplicar).

**Duração:** 25 min de vídeo.

**Materiais:** roteiro (abaixo), 13 slides (abaixo), pseudocódigo do loop (slide 9 — o mesmo do notebook da prática 1.4, de propósito).

**Sequência didática:**
- *Abertura (0:00–2:30):* retomada da fórmula da aula 1.1; promessa: "no fim desta aula você lê o código de qualquer agente".
- *Desenvolvimento (2:30–19:00):* o ciclo ReAct passo a passo com o exemplo da rota; declaração de ferramentas; quem executa o quê; pseudocódigo; os 3 erros clássicos e seus guardrails.
- *Fechamento (19:00–25:00):* ponte direta para a prática 1.4 (o que o aluno vai ver rodando) + checklist mental.

**Avaliação:** questões 2, 4 e 5 do quiz 1.5; a própria prática 1.4 (o aluno reconhece no código o que viu na aula).

## B) Roteiro de gravação

**[0:00–2:30] [ROSTO] Abertura**

Bem-vinda, bem-vindo de volta! Se você fez a leitura da aula anterior, você já tem o mapa: function calling, ReAct, MCP, frameworks. Agora a gente vai abrir o capô. E eu vou te fazer uma promessa: no final desses vinte e cinco minutos, você vai ser capaz de olhar pro código de *qualquer* agente — LangGraph, CrewAI, o que for — e reconhecer a estrutura por baixo. Porque, spoiler: é sempre o mesmo loop. Muda o verniz, não muda o motor.

Lembra da fórmula? Modelo, ferramentas, memória, loop com guardrails. Hoje é o dia do **loop**. E na próxima aula, a prática, você implementa esse loop com as suas mãos. Bora.

**[2:30–6:30] [SLIDES 2–4] O ciclo ReAct com o exemplo da rota**

[SLIDE 2] O padrão se chama ReAct — de *Reasoning and Acting*, raciocinar e agir. Veio de um artigo de pesquisa de 2022, dos autores Yao e colegas, e a ideia é de uma elegância danada: em vez de pedir pro modelo responder de uma vez, a gente deixa ele alternar três movimentos. **Raciocínio**: "o que eu sei? o que me falta?". **Ação**: "vou usar tal ferramenta com tais parâmetros". **Observação**: "recebi esse resultado, e agora?". E repete. Até o modelo decidir: "tenho tudo, missão cumprida" — e aí ele para e responde.

[SLIDE 3] Vamos rodar o filme com o nosso cenário da transportadora. Missão: "avalie se a entrega do CEP 35700-000, Sete Lagoas, precisa ser replanejada por causa do clima amanhã". Passo um, raciocínio: "preciso da localização desse CEP". Ação: chama a ferramenta `consultar_cep`. Observação: "Sete Lagoas, Minas, latitude tal, longitude tal". Passo dois, raciocínio: "agora preciso da chuva prevista". Ação: `previsao_tempo` com aquelas coordenadas. Observação: "amanhã, 45 milímetros, probabilidade 90%". Passo três, raciocínio: "45 milímetros com carga refrigerada, pela regra que me deram, é replanejamento". Ação: `registrar_decisao`. Observação: "registrado". E aí — repara — o modelo **para**: missão cumprida, resposta final pro usuário.

[SLIDE 4] Três voltas de loop. Em cada volta, o modelo só decidiu **o próximo passo** — nunca o plano inteiro de uma vez. Isso é o que dá robustez: se o CEP viesse sem coordenada, o raciocínio da volta seguinte se adapta. Plano rígido quebra; loop se adapta.

**[6:30–11:00] [SLIDES 5–7] Ferramentas: o contrato**

Agora, a pergunta que separa quem entende de quem repete jargão: **como o modelo sabe quais ferramentas existem?**

[SLIDE 5] Resposta: a gente declara. Toda ferramenta é apresentada ao modelo com três coisas: um **nome**, uma **descrição em linguagem natural** — pra que serve, quando usar — e o **esquema dos parâmetros**: quais argumentos, de que tipo, quais obrigatórios. Isso vai junto com o prompt, em cada chamada. O modelo lê esse "cardápio" e decide se pede algum prato.

[SLIDE 6] E aqui vem o ponto que eu mais preciso que você grave, porque é a fonte da confusão número um: **o modelo nunca executa nada**. Ele *pede*. Ele devolve um JSON estruturado: "chame `previsao_tempo` com latitude menos dezenove vírgula quarenta e seis". Quem executa é o **seu código Python** — que roda a função de verdade, pega o resultado e devolve pro modelo como observação. O modelo é o cérebro; o seu código é o corpo. Isso tem uma consequência linda de segurança: se a ferramenta não está no cardápio, o agente **não tem como** fazer aquilo. O poder do agente é exatamente o poder das ferramentas que você deu a ele. Nem mais, nem menos.

[SLIDE 7] Por isso a descrição da ferramenta importa tanto. Eu vejo isso direto nos meus projetos: agente "burro" que era só descrição ruim. Se você escreve "consulta dados", o modelo não sabe quando usar. Se você escreve "retorna cidade, estado e coordenadas geográficas a partir de um CEP brasileiro no formato 00000-000", o modelo acerta. Descrever ferramenta é engenharia de contexto — e a gente aprofunda isso no módulo 2.

**[11:00–15:00] [SLIDES 8–9] O loop em pseudocódigo**

[SLIDE 8] Vamos juntar tudo. O loop de um agente, tirando o verniz, é isso: monte o contexto com a missão, o histórico e o cardápio de ferramentas; chame o modelo; se o modelo pediu ferramenta, execute, anexe o resultado ao histórico e volte pro início; se o modelo deu resposta final, pare. Só. Isso é um agente.

[SLIDE 9] Olha o pseudocódigo — e presta atenção porque esse slide é literalmente o coração do notebook da próxima aula:

```
historico = [missao]
para tentativa de 1 até MAX_ITERACOES:
    resposta = modelo(historico, ferramentas)
    se resposta é chamada_de_ferramenta:
        resultado = executar(resposta.nome, resposta.argumentos)
        historico += [resposta, resultado]
    senão:
        retorne resposta   # resposta final: missão cumprida
alerta("limite de iterações atingido")  # guardrail!
```

Umas dez linhas. Quando você usar um framework, ele estará fazendo *isso* por você — com mais conforto, mais telemetria, mas isso. Quem entende essas dez linhas nunca mais fica refém de ferramenta.

**[15:00–19:00] [SLIDES 10–12] Os 3 erros clássicos e seus guardrails**

Agora a parte que eu insisto em todo projeto, porque é o que separa protótipo de produção. Três jeitos clássicos de um agente dar errado — e o guardrail de cada um.

[SLIDE 10] Erro um: o **loop infinito**. A ferramenta falha, o modelo tenta de novo, falha, tenta de novo... e você descobre no fim do mês, na fatura da API. Guardrail: **limite de iterações** — reparou o `MAX_ITERACOES` no pseudocódigo? — mais um orçamento de custo por missão. Simples, obrigatório, e muita gente esquece.

[SLIDE 11] Erro dois: a **alucinação de ferramenta ou de argumento**. O modelo inventa uma ferramenta que não existe, ou passa um CEP mal formatado. Guardrail: **validação antes de executar** — se o nome não está no cardápio, se o argumento não bate com o esquema, devolve erro claro pro modelo como observação, e ele se corrige na próxima volta. O loop se autocorrige *se* você der feedback de erro bem escrito.

[SLIDE 12] Erro três, o mais sério: **excesso de autonomia**. O agente *pode* executar uma ação irreversível — cancelar um pedido, enviar um e-mail pro cliente — e faz isso num caso que exigia julgamento humano. Guardrail: **classificar ferramentas por risco**. Ferramenta de leitura, roda livre. Ferramenta de escrita reversível, roda com log. Ação irreversível ou de alto impacto: o agente **prepara e pede aprovação** — human-in-the-loop. Lembra da matriz risco × valor da aula 1.1? Ela vale ferramenta por ferramenta, não só processo por processo.

**[19:00–22:00] [SLIDE 13] Ponte para a prática**

E agora você está pronta, pronto, pro momento mais legal do módulo. Na próxima aula, a prática, você vai abrir o Google Colab — de graça, no navegador, sem instalar nada — criar uma chave gratuita da API do Gemini no Google AI Studio, e montar o agente da transportadora de verdade: ferramenta de CEP usando a BrasilAPI, ferramenta de clima usando a Open-Meteo, que são APIs públicas brasileiras e gratuitas, e a ferramenta de registrar decisão. Você vai dar a missão, e vai **ver** o loop acontecendo: raciocínio, ação, observação, volta por volta, no output do notebook. Eu desenhei o passo a passo pra ninguém ficar pra trás — e tem desafio extra pra quem quiser voar.

**[22:00–25:00] [ROSTO] Fechamento**

Checklist mental antes de você ir — me responde de cabeça, vale mais que anotar: O que o modelo faz no loop... e o que ele *nunca* faz? (Ele decide; ele nunca executa.) O que define o poder de um agente? (O cardápio de ferramentas que você deu.) E quais são os três guardrails de hoje? (Limite de iterações, validação de chamadas, aprovação humana pra ação de risco.)

Se você respondeu as três, você já pensa como quem constrói agente. Se travou em alguma, revê o bloco correspondente — tá tudo marcado no vídeo. Agora abre o Colab e me encontra na prática. Vai ser divertido — palavra de quem já montou esse agente muitas vezes. Até lá!

## C) Estrutura de slides (13 slides)

1. **Capa** — "Por dentro do loop do agente: ReAct, ferramentas e guardrails" · Módulo 1, Aula 3.
2. **ReAct** — Reasoning + Acting (Yao et al., 2022); ciclo: Raciocínio → Ação → Observação → (repete) → Parada; diagrama circular com seta de saída "missão cumprida".
3. **O filme da missão** — missão: "a entrega de Sete Lagoas precisa ser replanejada?"; volta 1: `consultar_cep` → coordenadas; volta 2: `previsao_tempo` → 45 mm / 90%; volta 3: `registrar_decisao` → replanejar; parada: resposta final.
4. **Por que loop e não plano?** — o modelo decide só o próximo passo; observação alimenta o raciocínio seguinte; plano rígido quebra, loop se adapta.
5. **O cardápio de ferramentas** — cada ferramenta declarada com: nome · descrição em linguagem natural · esquema de parâmetros (tipos, obrigatórios); enviado ao modelo em toda chamada.
6. **Quem faz o quê** — MODELO: decide e pede (devolve JSON estruturado) · SEU CÓDIGO: valida, executa, devolve observação; consequência: sem ferramenta no cardápio = ação impossível.
7. **Descrição é engenharia** — antes: "consulta dados" (agente perdido) · depois: "retorna cidade, UF e coordenadas a partir de CEP brasileiro (formato 00000-000)" (agente certeiro).
8. **O loop sem verniz** — 4 passos: montar contexto (missão + histórico + cardápio) → chamar modelo → se pediu ferramenta: executar e voltar → se resposta final: parar.
9. **Pseudocódigo do coração do agente** — bloco de código de ~10 linhas (o mesmo da prática 1.4); destacar `MAX_ITERACOES` em teal.
10. **Erro clássico №1: loop infinito** — sintoma: fatura surpresa; guardrail: limite de iterações + orçamento por missão.
11. **Erro clássico №2: alucinação de ferramenta/argumento** — sintoma: chamada inválida; guardrail: validar contra o cardápio e o esquema; devolver erro claro como observação (o loop se autocorrige).
12. **Erro clássico №3: excesso de autonomia** — classificar ferramentas por risco: leitura = livre · escrita reversível = com log · irreversível/alto impacto = human-in-the-loop.
13. **Sua vez: prática 1.4** — Google Colab + chave gratuita (Google AI Studio) + BrasilAPI + Open-Meteo; você vai VER o loop rodando; checklist dos 3 guardrails no notebook.

---
---

# AULA 1.4 — Seu primeiro agente autônomo no Google Colab (prática, 90 min)

## A) Plano de aula

**Objetivos de aprendizagem** (o aluno será capaz de):
- **Configurar** ambiente de agente em Colab com chave gratuita da API Gemini (Aplicar).
- **Implementar** ferramentas como funções Python conectadas a APIs públicas reais (Aplicar).
- **Construir e executar** um agente ReAct com function calling, observando o loop volta a volta (Aplicar/Analisar).
- **Experimentar** guardrails alterando limite de iterações e regras de decisão (Analisar/Avaliar).

**Duração:** 90 min (60 min de roteiro guiado + 30 min de desafios extras).

**Materiais:** navegador; conta Google; notebook-modelo do curso (link na plataforma); este passo a passo.

**Sequência didática:** *Abertura:* setup (passos 1–4). *Desenvolvimento:* ferramentas (5–7), agente e missão (8–11). *Fechamento:* guardrails e desafios (12–14) + checklist de conclusão.

**Avaliação:** checklist de critérios de conclusão (abaixo); o aluno anexa o link do seu notebook Colab na plataforma.

## B) Prática guiada — passo a passo

**Ferramenta:** Google Colab (colab.research.google.com) + Google AI Studio (aistudio.google.com — chave de API gratuita do Gemini).
**Fontes de dados (APIs públicas, gratuitas, sem cadastro):**
- BrasilAPI — CEP v2: `https://brasilapi.com.br/api/cep/v2/{cep}` (documentação: https://brasilapi.com.br/docs)
- Open-Meteo — previsão: `https://api.open-meteo.com/v1/forecast` (documentação: https://open-meteo.com/en/docs)

**Cenário:** você é a analista de logística da transportadora fictícia **RotaViva**, que sai de Belo Horizonte para o interior de MG. Seu agente deve avaliar entregas e decidir: **MANTER** ou **REPLANEJAR** cada rota conforme a chuva prevista, registrando a justificativa.

### Parte 1 — Setup (passos 1–4, ~15 min)

1. Acesse **aistudio.google.com**, faça login com sua conta Google e clique em **"Get API key" → "Create API key"**. Copie a chave (começa com `AIza...`). *Essa chave tem tier gratuito — nenhum cartão de crédito é pedido.*
2. Abra **colab.research.google.com** e crie um notebook novo. Renomeie para `agente-rotaviva-SEUNOME`.
3. No painel esquerdo do Colab, clique no ícone de **chave (Secrets)** → **"Adicionar novo secret"**. Nome: `GOOGLE_API_KEY`, valor: a chave copiada. Ative a chavinha "Acesso ao notebook". *Nunca cole a chave direto no código — esse hábito vale ouro em produção.*
4. Na primeira célula, instale e configure o SDK:
   ```python
   !pip install -q google-genai requests
   from google import genai
   from google.colab import userdata
   client = genai.Client(api_key=userdata.get("GOOGLE_API_KEY"))
   ```
   Execute (Shift+Enter). Teste com uma chamada simples:
   ```python
   r = client.models.generate_content(model="gemini-2.5-flash", contents="Diga 'pronto' em uma palavra.")
   print(r.text)
   ```
   ✅ *Checkpoint: apareceu uma resposta do modelo? Setup concluído.*

### Parte 2 — As ferramentas do agente (passos 5–7, ~20 min)

5. **Ferramenta 1 — consultar CEP.** Nova célula:
   ```python
   import requests

   def consultar_cep(cep: str) -> dict:
       """Retorna cidade, UF e coordenadas geográficas de um CEP brasileiro.

       Args:
           cep: CEP no formato 00000000 ou 00000-000.
       """
       cep = cep.replace("-", "").strip()
       resp = requests.get(f"https://brasilapi.com.br/api/cep/v2/{cep}", timeout=10)
       if resp.status_code != 200:
           return {"erro": f"CEP {cep} não encontrado."}
       dados = resp.json()
       coord = (dados.get("location") or {}).get("coordinates") or {}
       return {
           "cidade": dados.get("city"), "uf": dados.get("state"),
           "latitude": coord.get("latitude"), "longitude": coord.get("longitude"),
       }

   consultar_cep("35700-000")  # teste manual: Sete Lagoas/MG
   ```
   *Repare na docstring: é ela que o SDK transforma na "descrição do cardápio" que o modelo lê (aula 1.3, slide 7).*
6. **Ferramenta 2 — previsão do tempo.** Nova célula:
   ```python
   def previsao_tempo(latitude: float, longitude: float) -> dict:
       """Retorna a chuva prevista (mm) e a probabilidade de chuva (%) para amanhã nas coordenadas dadas.

       Args:
           latitude: latitude em graus decimais (ex.: -19.46).
           longitude: longitude em graus decimais (ex.: -44.24).
       """
       resp = requests.get(
           "https://api.open-meteo.com/v1/forecast",
           params={"latitude": latitude, "longitude": longitude,
                   "daily": "precipitation_sum,precipitation_probability_max",
                   "timezone": "America/Sao_Paulo", "forecast_days": 2},
           timeout=10)
       d = resp.json()["daily"]
       return {"data": d["time"][1], "chuva_mm": d["precipitation_sum"][1],
               "prob_chuva_pct": d["precipitation_probability_max"][1]}
   ```
   Teste com as coordenadas obtidas no passo 5. *Se o CEP vier sem coordenadas (acontece com alguns CEPs), use as da capital do estado — anote esse caso: é o tipo de "mundo real" que o agente precisa contornar.*
7. **Ferramenta 3 — registrar decisão.** Nova célula:
   ```python
   registro_de_decisoes = []

   def registrar_decisao(cep: str, decisao: str, justificativa: str) -> dict:
       """Registra a decisão final sobre uma entrega no log da operação.

       Args:
           cep: CEP da entrega avaliada.
           decisao: 'MANTER' ou 'REPLANEJAR'.
           justificativa: explicação objetiva citando os dados de clima.
       """
       if decisao not in ("MANTER", "REPLANEJAR"):
           return {"erro": "decisao deve ser MANTER ou REPLANEJAR"}  # guardrail nº2: validação!
       registro_de_decisoes.append({"cep": cep, "decisao": decisao, "justificativa": justificativa})
       return {"status": "registrado", "total_registros": len(registro_de_decisoes)}
   ```

### Parte 3 — O agente em ação (passos 8–11, ~25 min)

8. **Monte o agente.** O SDK `google-genai` executa o loop de function calling automaticamente quando você passa funções Python em `tools` — exatamente o pseudocódigo da aula 1.3, já embutido:
   ```python
   from google.genai import types

   INSTRUCOES = """Você é o agente de logística da transportadora RotaViva (Belo Horizonte/MG).
   Missão: avaliar entregas e decidir MANTER ou REPLANEJAR cada rota.
   Regras da operação:
   - Chuva prevista > 30 mm OU probabilidade > 80%: REPLANEJAR cargas perecíveis/refrigeradas.
   - Chuva prevista > 60 mm: REPLANEJAR qualquer carga.
   - Sempre registre a decisão com registrar_decisao antes de responder.
   Responda em português, citando os números que fundamentaram a decisão."""

   chat = client.chats.create(
       model="gemini-2.5-flash",
       config=types.GenerateContentConfig(
           system_instruction=INSTRUCOES,
           tools=[consultar_cep, previsao_tempo, registrar_decisao],
       ),
   )
   ```
9. **Dê a primeira missão:**
   ```python
   resposta = chat.send_message(
       "Avalie a entrega de carga refrigerada para o CEP 35700-000 amanhã.")
   print(resposta.text)
   print(registro_de_decisoes)
   ```
   ✅ *Checkpoint: o agente consultou o CEP, buscou o clima, registrou a decisão e explicou com números? Você acabou de ver o loop ReAct inteiro.*
10. **Enxergue o loop.** Inspecione as voltas que o SDK executou por você:
    ```python
    for parte in chat.get_history():
        for p in parte.parts:
            if p.function_call: print("AÇÃO →", p.function_call.name, dict(p.function_call.args))
            if p.function_response: print("OBSERVAÇÃO ←", p.function_response.response)
    ```
    Compare com o slide 3 da aula 1.3: raciocínio → ação → observação, volta a volta.
11. **Missão em lote:** peça `"Avalie agora estas entregas: CEP 38400-000 (carga seca) e CEP 37200-000 (carga refrigerada)."` e observe o agente encadear múltiplas consultas e decisões sozinho.

### Parte 4 — Guardrails e desafios (passos 12–14, ~30 min)

12. **Guardrail de validação em ação:** peça `"Registre a decisão ADIAR para o CEP 35700-000"`. A ferramenta devolve erro (`decisao deve ser MANTER ou REPLANEJAR`) — observe no histórico como o agente lê o erro e se corrige. *É o "loop que se autocorrige" da aula 1.3.*
13. **Guardrail de iterações:** adicione `automatic_function_calling=types.AutomaticFunctionCallingConfig(maximum_remote_calls=3)` ao `GenerateContentConfig`, recrie o chat e repita o passo 11. O que acontece quando a missão exige mais voltas que o limite? Anote no notebook (célula de texto) — essa reflexão faz parte da entrega.
14. **Desafios extras (opcionais, recomendados):**
    - **a)** Adicione uma 4ª ferramenta `consultar_feriado(data)` usando a BrasilAPI (`/api/feriados/v1/2026`) e inclua a regra "não replanejar para feriado nacional".
    - **b)** Mude a regra de chuva para 10 mm e observe como as decisões mudam — sensibilidade de política.
    - **c)** Human-in-the-loop simples: faça `registrar_decisao` exigir confirmação via `input()` quando a decisão for REPLANEJAR.

### Critérios de conclusão (checklist da plataforma)

- [ ] Notebook executa de ponta a ponta sem erro (Ambiente de execução → Reiniciar e executar tudo).
- [ ] As 3 ferramentas funcionam isoladamente (testes manuais dos passos 5–7).
- [ ] O agente completou a missão do passo 9 consultando **as duas APIs** e registrando a decisão.
- [ ] O histórico do passo 10 mostra pelo menos 3 pares ação/observação.
- [ ] Célula de texto final com a reflexão do passo 13 (limite de iterações) em 3–5 linhas.
- [ ] Link do notebook (compartilhamento "qualquer pessoa com o link — leitor") anexado na plataforma.

**Solução de problemas comuns:** erro 429 = limite de requisições do tier gratuito, aguarde 1 min; CEP sem coordenadas = use fallback do passo 6; `userdata.SecretNotFoundError` = ative a chavinha "Acesso ao notebook" no secret.

---
---

# AULA 1.5 — Quiz: Anatomia de um agente (quiz, 15 min)

## A) Plano de aula

**Objetivos:** verificar a compreensão dos conceitos-chave do módulo (agente × chatbot, ReAct, MCP, function calling, guardrails) antes de avançar ao módulo 2 (Lembrar/Compreender/Analisar).
**Formato:** 5 questões de múltipla escolha (3 alternativas), feedback explicativo imediato por questão, tentativas ilimitadas (vale a maior nota), nota mínima recomendada: 70%.

## B) Questões (com gabarito e feedback)

**Questão 1.** O que diferencia fundamentalmente um agente de IA de um chatbot?

- a) O agente usa um modelo de linguagem maior e mais caro que o chatbot.
- b) O agente recebe uma missão e decide sozinho os passos, usando ferramentas em um loop com critério de parada. ✅
- c) O agente responde mais rápido porque roda na nuvem.

*Gabarito: b.* **Explicação:** o que define o agente não é o tamanho do modelo, e sim a autonomia estruturada: missão (em vez de pergunta), uso de ferramentas para perceber e agir, loop de decisão e critério de parada. Um chatbot pode até usar um modelo maior — e continuar sendo reativo.

**Questão 2.** No padrão ReAct, qual é a sequência correta de um ciclo do loop?

- a) Raciocínio → Ação → Observação, repetindo até o critério de parada. ✅
- b) Planejamento completo de todos os passos → execução em lote → relatório final.
- c) Observação → Resposta final → Raciocínio, sempre em uma única volta.

*Gabarito: a.* **Explicação:** o ReAct alterna raciocínio ("o que me falta?"), ação (chamada de ferramenta) e observação (resultado), decidindo apenas o próximo passo a cada volta. É isso que permite ao agente se adaptar quando uma observação muda o cenário — um plano rígido feito de uma vez quebraria.

**Questão 3.** Qual é o papel do MCP (Model Context Protocol) no ecossistema de agentes?

- a) Substituir os LLMs em tarefas de raciocínio complexo.
- b) Padronizar como aplicações expõem ferramentas, dados e prompts para modelos de IA, evitando conectores sob medida para cada par sistema-modelo. ✅
- c) Treinar modelos de linguagem com dados privados da empresa.

*Gabarito: b.* **Explicação:** o MCP (lançado como padrão aberto pela Anthropic em 2024 e adotado pelos grandes provedores em 2025) é o "USB-C dos agentes": você escreve um servidor MCP uma vez e qualquer cliente compatível o utiliza. Ele não treina modelos nem raciocina — ele padroniza a conexão.

**Questão 4.** Durante o function calling, quem efetivamente executa a ferramenta (por exemplo, a chamada à API de previsão do tempo)?

- a) O próprio LLM, dentro dos servidores do provedor do modelo.
- b) O código da aplicação (por exemplo, sua função Python no Colab), após o modelo devolver um pedido estruturado de chamada. ✅
- c) A API externa, que lê a conversa e decide responder sozinha.

*Gabarito: b.* **Explicação:** o modelo nunca executa — ele *pede*, devolvendo um JSON com nome da função e argumentos. Quem valida e executa é o seu código, que devolve o resultado como observação. Consequência prática de segurança: o agente só pode fazer o que as ferramentas declaradas permitem.

**Questão 5.** Um agente de cobrança pode enviar e-mails a clientes. Qual guardrail é o mais adequado para a ferramenta `enviar_email`, considerando a classificação de risco vista no módulo?

- a) Aumentar o limite de iterações do loop para o agente ter mais chances de acertar.
- b) Remover a descrição da ferramenta para o modelo usá-la com mais cautela.
- c) Exigir aprovação humana (human-in-the-loop) antes do envio, por ser uma ação de alto impacto voltada ao cliente. ✅

*Gabarito: c.* **Explicação:** ferramentas se classificam por risco: leitura roda livre, escrita reversível roda com log, e ações irreversíveis ou de alto impacto (como comunicação direta com cliente) exigem aprovação humana. Limite de iterações previne loop infinito (outro problema), e remover a descrição só deixaria o agente confuso — descrição boa é guardrail, não risco.

---

## Notas de produção do módulo (uso interno da Giselle)

- **Gravação:** 2 vídeos (20 + 25 min), câmera frontal + slides compartilhados; roteiros prontos para teleprompter acima. Sem edição pesada: cortes secos entre blocos funcionam.
- **Slides:** 12 + 13 slides, montar no Canva com paleta roxo/lavanda/teal; o slide 9 da aula 1.3 (pseudocódigo) deve ser idêntico ao comentário do notebook da prática.
- **Notebook-modelo:** criar a partir do passo a passo da aula 1.4 e publicar como link "leitor" na plataforma (o aluno faz cópia).
- **Revisão técnica antes de gravar:** rodar o notebook de ponta a ponta e confirmar os endpoints BrasilAPI/Open-Meteo e o nome do modelo (`gemini-2.5-flash`) — atualizar se o tier gratuito mudar.
