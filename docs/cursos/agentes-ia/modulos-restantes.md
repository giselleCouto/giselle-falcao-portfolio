# Módulos 2–6 — Planos resumidos

**Curso:** Agentes de IA e Automação Inteligente · Giselle Falcão Academy
Estes módulos serão desenvolvidos no padrão do `modulo-1.md` (plano de aula + roteiro + slides + prática detalhada). Abaixo, o plano resumido de cada um: objetivos e lista de aulas com resumos.

---

## Módulo 2 — LLMs sob o capô: escolha de modelo e engenharia de contexto (5h)

**Objetivos do módulo** (o aluno será capaz de):
- **Comparar** modelos de LLM segundo custo, latência, janela de contexto e capacidade de tool use, e **selecionar** o adequado para cada agente (Analisar/Avaliar).
- **Construir** system prompts e contextos que produzem decisões consistentes e auditáveis (Aplicar/Criar).
- **Aplicar** saída estruturada (JSON Schema) e function calling para tornar decisões de agente confiáveis e integráveis (Aplicar).

**Aulas:**

| # | Aula | Tipo | Duração | Resumo |
|---|---|---|---|---|
| 2.1 | Como escolher o LLM do seu agente | vídeo | 20 min | Critérios práticos de seleção: custo por milhão de tokens, latência, janela de contexto, qualidade de tool use e modelos abertos vs. proprietários. Giselle apresenta o "funil de escolha" que usa em consultoria: comece pequeno e barato, suba só quando a avaliação provar necessidade. Casos: agente de triagem (modelo rápido) vs. agente de análise de laudo (modelo de raciocínio). |
| 2.2 | Engenharia de contexto: system prompt, exemplos e saída estruturada | leitura | 35 min | Texto técnico sobre a evolução de "prompt engineering" para engenharia de contexto: papéis do system prompt, few-shot examples, delimitação de dados vs. instruções e formatação de observações de ferramentas. Inclui o template de system prompt de agente usado no curso (persona, missão, regras, ferramentas, formato de resposta). |
| 2.3 | Function calling e JSON estruturado na prática | vídeo | 20 min | Como declarar esquemas de ferramentas e forçar saída em JSON Schema para decisões auditáveis. Demonstração narrada (gravação de tela) comparando resposta em texto livre vs. estruturada no mesmo cenário de decisão logística — e por que sistemas downstream exigem a segunda. |
| 2.4 | Bancada de testes: comparando modelos e prompts para decisões de agente | prática | 90 min | No Colab, o aluno monta uma "bancada" que roda o mesmo conjunto de 10 casos de decisão (manter/replanejar rotas) contra 2 modelos Gemini e 3 variações de system prompt, registrando acertos, tokens e latência. Os resultados são exportados para o Google Sheets, onde o aluno monta a tabela comparativa e escolhe a configuração vencedora com justificativa. Ferramentas: Google Colab + Google Sheets. |
| 2.5 | Quiz — LLMs e engenharia de contexto | quiz | 15 min | 5 questões sobre critérios de escolha de modelo, papéis do system prompt, few-shot e saída estruturada, com feedback explicativo. |

---

## Módulo 3 — RAG: conectando o agente ao conhecimento da sua empresa (6h)

**Objetivos do módulo** (o aluno será capaz de):
- **Explicar** o pipeline RAG completo: ingestão, chunking, embeddings, indexação, recuperação e geração (Compreender).
- **Prototipar** uma base de conhecimento sem código no NotebookLM e **avaliar** seus limites (Aplicar/Avaliar).
- **Implementar** um pipeline RAG com embeddings e FAISS em Colab e **integrá-lo** como ferramenta de um agente (Aplicar/Criar).
- **Medir** a qualidade de um RAG com métricas de recuperação e fidelidade (Avaliar).

**Aulas:**

| # | Aula | Tipo | Duração | Resumo |
|---|---|---|---|---|
| 3.1 | RAG do zero: embeddings, chunking e busca vetorial | vídeo | 25 min | O problema que o RAG resolve (conhecimento privado e atualizado sem retreinar modelo) e o pipeline peça a peça: como texto vira vetor, por que o tamanho do chunk importa e como funciona a busca por similaridade. Analogia condutora: a biblioteca com bibliotecária que entende o sentido do pedido, não só as palavras. |
| 3.2 | RAG sem código: montando uma base de conhecimento no NotebookLM | prática | 60 min | O aluno cria um notebook no NotebookLM com documentos públicos reais (ex.: normas do MAPA e manuais técnicos da Embrapa em PDF), faz perguntas de operação e analisa as respostas com citações. Fecha com teste de estresse: perguntas fora da base e perguntas ambíguas, documentando onde a ferramenta pronta atende e onde só um pipeline próprio resolve. Ferramenta: NotebookLM. |
| 3.3 | RAG avançado em 2026: busca híbrida, re-ranking e avaliação | vídeo | 20 min | O que separa RAG de demo de RAG de produção: busca híbrida (vetorial + palavra-chave), re-ranking dos resultados, metadados e filtros, e avaliação contínua (precisão da recuperação e fidelidade da resposta). Quando usar RAG vs. janela de contexto longa — e por que a resposta em 2026 é "quase sempre os dois". |
| 3.4 | Pipeline RAG completo em Colab com FAISS | prática | 100 min | Passo a passo no Colab: baixar documentos técnicos públicos, fazer chunking, gerar embeddings, indexar com FAISS (em memória), montar a função `buscar_conhecimento()` e plugá-la como ferramenta no agente do Módulo 1 — que passa a responder com base nos documentos e a citar as fontes. Fecha com miniavaliação: 8 perguntas-gabarito e cálculo da taxa de acerto da recuperação. Ferramenta: Google Colab. |
| 3.5 | Quiz — RAG na prática | quiz | 15 min | 5 questões sobre pipeline RAG, chunking, embeddings, busca híbrida e avaliação, com feedback explicativo. |

---

## Módulo 4 — MCP: integrando agentes a APIs reais (5h30)

**Objetivos do módulo** (o aluno será capaz de):
- **Explicar** o problema N×M de integrações e como o MCP o resolve com um protocolo aberto (Compreender).
- **Distinguir** os três blocos de um servidor MCP — tools, resources e prompts — e seus usos (Analisar).
- **Construir** um servidor MCP em Python expondo APIs públicas brasileiras e **consumi-lo** a partir de um agente (Criar).

**Aulas:**

| # | Aula | Tipo | Duração | Resumo |
|---|---|---|---|---|
| 4.1 | MCP: o protocolo que padronizou a conexão entre agentes e o mundo | vídeo | 20 min | A história e a arquitetura do Model Context Protocol: o problema N×M, o lançamento aberto pela Anthropic em 2024, a adoção pelos grandes provedores em 2025 e a arquitetura cliente-servidor (host, client, server). Por que "escreva o conector uma vez" muda a economia de projetos de automação — com exemplos do dia a dia de consultoria industrial. |
| 4.2 | Anatomia de um servidor MCP: tools, resources e prompts | leitura | 35 min | Texto técnico dissecando os três blocos: tools (ações que o modelo pode pedir), resources (dados que a aplicação expõe) e prompts (templates reutilizáveis). Cobre transports (stdio e HTTP), o fluxo de descoberta (o cliente pergunta "o que você oferece?") e boas práticas de descrição — conectando com a engenharia de contexto do Módulo 2. Inclui exemplo comentado de servidor com FastMCP. |
| 4.3 | Construindo um servidor MCP conectado a APIs públicas brasileiras | prática | 100 min | No Colab, o aluno constrói com o SDK Python (FastMCP) um servidor "Brasil Operações" com 3 tools — CEP e feriados (BrasilAPI), câmbio PTAX (API do Banco Central) e municípios (IBGE) — e o consome de um cliente MCP no próprio notebook, conectando-o ao agente do curso. Fecha comparando: quantas linhas mudaram no agente para ganhar 3 integrações novas? Ferramenta: Google Colab. |
| 4.4 | Quiz — MCP e integrações | quiz | 15 min | 4 questões sobre o problema N×M, arquitetura do MCP, tools vs. resources vs. prompts e transports, com feedback explicativo. |

---

## Módulo 5 — Orquestração, memória e sistemas multiagente (5h30)

**Objetivos do módulo** (o aluno será capaz de):
- **Comparar** os padrões de orquestração (pipeline, roteador, supervisor-especialistas) e **selecionar** o adequado a cada processo (Analisar/Avaliar).
- **Implementar** memória de curto prazo (gestão de contexto) e de longo prazo (registro estruturado + recuperação) em agentes (Aplicar).
- **Construir** um sistema supervisor com agentes especialistas e **justificar** quando um único agente basta (Criar/Avaliar).

**Aulas:**

| # | Aula | Tipo | Duração | Resumo |
|---|---|---|---|---|
| 5.1 | Padrões de orquestração: pipeline, roteador e supervisor | vídeo | 20 min | Os três padrões que resolvem 90% dos casos reais: pipeline (etapas fixas com IA em cada uma), roteador (classifica e despacha para o fluxo certo) e supervisor-especialistas (um agente coordena agentes de domínio). Critérios de escolha com exemplos de indústria, agro e logística — e o alerta: complexidade de orquestração é custo, não troféu. |
| 5.2 | Memória de agentes: do contexto à memória de longo prazo | vídeo | 20 min | Como agentes lembram: janela de contexto como memória de trabalho, sumarização de histórico, e memória de longo prazo com registros estruturados recuperados via busca (reaproveitando o RAG do Módulo 3). Padrões práticos: perfil da operação, decisões passadas e lições aprendidas — e os riscos de memória envenenada. |
| 5.3 | Multiagentes: quando usar (e quando um agente só resolve) | leitura | 30 min | Texto crítico contra o hype: multiagente aumenta custo, latência e superfície de erro, e só se justifica quando há especialidades com contextos distintos, paralelismo real ou limites de contexto. Framework de decisão em 5 perguntas + 3 estudos de caso (2 em que multiagente venceu, 1 em que um agente único com boas ferramentas foi superior). |
| 5.4 | Sistema supervisor com agentes especialistas para triagem logística | prática | 100 min | No Colab, o aluno constrói uma central de triagem de ocorrências da RotaViva: um agente supervisor recebe ocorrências (atraso, avaria, desvio de temperatura), classifica e delega a dois especialistas — "Clima & Rota" (com as ferramentas do Módulo 1) e "Documentação" (com o RAG do Módulo 3) — consolidando a resposta final com log completo das delegações. Ferramenta: Google Colab. |
| 5.5 | Quiz — Orquestração e memória | quiz | 15 min | 5 questões sobre padrões de orquestração, tipos de memória e critérios para (não) usar multiagente, com feedback explicativo. |

---

## Módulo 6 — Produção, segurança e projeto final certificado (6h)

**Objetivos do módulo** (o aluno será capaz de):
- **Instrumentar** agentes com logging estruturado, métricas de custo/latência e avaliação contínua (Aplicar).
- **Identificar** vetores de ataque (prompt injection direta e indireta) e **aplicar** defesas em camadas com human-in-the-loop (Analisar/Aplicar).
- **Projetar, construir e documentar** um agente completo de ponta a ponta, defendendo suas decisões de arquitetura (Criar/Avaliar).

**Aulas:**

| # | Aula | Tipo | Duração | Resumo |
|---|---|---|---|---|
| 6.1 | Agentes em produção: observabilidade, custos e avaliação contínua | vídeo | 25 min | O que muda quando o agente sai do notebook: logging estruturado de cada volta do loop, métricas que importam (custo por missão, taxa de conclusão, taxa de escalação a humano), conjuntos de avaliação que rodam a cada mudança de prompt e o dashboard mínimo de operação. Giselle mostra o checklist de go-live que usa em projetos de consultoria. |
| 6.2 | Segurança de agentes: prompt injection, permissões e human-in-the-loop | leitura | 35 min | Texto aprofundado sobre o principal risco de 2026: prompt injection indireta (instruções maliciosas escondidas nos dados que o agente lê) e a "tríade letal" — dados privados + conteúdo não confiável + capacidade de agir. Defesas em camadas: privilégio mínimo por ferramenta, separação dados/instruções, validação de saída, aprovação humana para ações de risco e trilha de auditoria. |
| 6.3 | Briefing do projeto final: o agente que vai para o seu portfólio | vídeo | 15 min | Apresentação do projeto final: requisitos (mínimo 3 ferramentas, 1 API pública real, 1 fonte de conhecimento via RAG, guardrails dos 3 tipos), a rubrica de 100 pontos explicada critério a critério, formato de entrega e exemplos de escopo bem dimensionado. Recado central: escopo estreito e profundo vence escopo largo e raso. |
| 6.4 | Projeto final certificado: agente autônomo de ponta a ponta | prática | 150 min | O aluno projeta e constrói seu próprio agente para um processo real do seu contexto (ou um dos 3 cenários sugeridos: torre de controle logística, assistente técnico de campo, triagem de qualidade industrial), com notebook documentado, log de demonstração em 2 cenários e painel simples de métricas de operação no Looker Studio a partir do log exportado em Google Sheets. Ferramentas: Google Colab + Google Sheets + Looker Studio. |

---

## Roteiro de produção sugerido (uso interno)

1. Gravar os vídeos na ordem dos módulos (1 módulo por semana mantém o ritmo sem sobrecarregar).
2. Reaproveitar a estrutura de roteiro do `modulo-1.md`: abertura no rosto (1–2 min), blocos de slides de 3–4 min, fechamento no rosto com checklist.
3. Todos os notebooks das práticas devem ser testados de ponta a ponta antes da gravação do vídeo que os antecede, pois os vídeos citam os passos.
4. Os quizzes dos módulos 2–5 seguem o formato do quiz 1.5: 4–5 questões, 3 alternativas, feedback explicativo por questão.
