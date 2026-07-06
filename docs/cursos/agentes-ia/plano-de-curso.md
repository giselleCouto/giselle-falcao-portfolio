# Plano de Curso — Agentes de IA e Automação Inteligente

**Escola:** Giselle Falcão Academy
**Nível:** Avançado · **Carga horária:** 32h · **Formato:** 100% online, autoinstrucional
**Slug:** `agentes-ia`

> **Descrição oficial:** Construa agentes de IA autônomos que tomam decisões complexas. MCP, RAG, LLMs e integração com APIs reais. Projeto final com certificação.

---

## 1. Posicionamento

Este é o curso mais avançado da Giselle Falcão Academy. Ele existe para responder à pergunta que os alunos fazem depois de dominar prompts e análise de dados com IA: **"como eu faço a IA trabalhar sozinha, com segurança, dentro do meu processo real?"**

O diferencial do curso é o olhar de quem implanta IA **na indústria, no agro e na logística brasileira**: nada de demos genéricas em inglês — os exercícios usam APIs públicas brasileiras (BrasilAPI, IBGE, Open-Meteo), cenários de cooperativa, usina, fábrica e transportadora, e a experiência de consultoria da Dra. Giselle Falcão como fio condutor.

O curso é **agnóstico de framework**: ensina os fundamentos (loop de agente, function calling, RAG, MCP, orquestração) que permanecem válidos independentemente de qual biblioteca estiver em alta — LangGraph, CrewAI, OpenAI Agents SDK, Google ADK ou Claude Agent SDK. O aluno aprende a *pensar* agentes, não a decorar um framework.

**Tagline:** *Do prompt à produção: construa agentes de IA que decidem, agem e se integram ao mundo real.*

---

## 2. Público-alvo

- Profissionais de dados, engenharia, TI e inovação que já usam LLMs e querem construir automações que **decidem e agem**, não só respondem.
- Especialistas de domínio (indústria, agro, logística, operações) com base técnica em Python que querem prototipar agentes para seus processos.

## 3. Pré-requisitos

- **Python intermediário** (funções, dicionários, `pip install`, leitura de erros).
- Noções de **APIs REST** (o que é um endpoint, JSON, requisição GET/POST).
- Já ter usado LLMs via interface (ChatGPT, Gemini, Claude) — experiência com a API é um plus, não um requisito.
- **Nenhuma instalação local é necessária:** todas as práticas rodam em ferramentas gratuitas de navegador (Google Colab, NotebookLM, Google Sheets, Looker Studio, BigQuery sandbox).

## 4. Resultados de aprendizagem

Ao concluir o curso, o aluno será capaz de:

1. **Projetar e implementar** agentes autônomos com LLMs, function calling e o padrão ReAct, do zero, em Google Colab.
2. **Selecionar o modelo e o contexto adequados** para cada agente, considerando custo, latência, janela de contexto e capacidade de tool use.
3. **Construir pipelines de RAG** — do protótipo sem código no NotebookLM ao pipeline com embeddings e FAISS — para dar conhecimento privado ao agente.
4. **Criar e consumir servidores MCP**, integrando agentes a APIs reais brasileiras de forma padronizada.
5. **Orquestrar sistemas multiagente** com memória e padrões supervisor-especialista, sabendo quando um único agente basta.
6. **Avaliar, monitorar e proteger** agentes em produção: observabilidade, custos, avaliação contínua, prompt injection e human-in-the-loop.

## 5. Metodologia

Cada módulo mescla quatro tipos de aula:

| Tipo | O que é | Duração típica |
|---|---|---|
| **Vídeo** | Aula gravada pela Giselle (rosto + slides), curta e direta | 15–25 min |
| **Leitura** | Texto na plataforma, com profundidade técnica e referências | 30–35 min |
| **Prática** | Exercício guiado passo a passo em ferramenta gratuita de navegador | 60–150 min |
| **Quiz** | Fixação com feedback explicativo por questão | 15 min |

**Ferramentas das práticas (todas gratuitas, todas no navegador):** Google Colab, Google AI Studio (chave gratuita da API Gemini), NotebookLM, Google Sheets, Looker Studio e BigQuery sandbox. O aluno não instala nada.

> **Sobre a carga horária:** as 32h incluem aulas, práticas guiadas **e o tempo estimado de estudo autônomo** (releitura, desafios opcionais das práticas e preparação do projeto final). O tempo de tela guiado é de aproximadamente 19h.

---

## 6. Estrutura do curso

### Módulo 1 — Anatomia de um Agente de IA *(4h — módulo de amostra gratuita)*

O aluno entende o que separa um chatbot de um agente, domina o loop ReAct e constrói seu primeiro agente autônomo em Colab, com ferramentas reais de CEP e clima.

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 1.1 | Do chatbot ao agente: o que muda quando a IA age | vídeo | 20 min |
| 1.2 | O ecossistema de agentes em 2026: function calling, MCP e frameworks | leitura | 30 min |
| 1.3 | Por dentro do loop do agente: ReAct, ferramentas e guardrails | vídeo | 25 min |
| 1.4 | Seu primeiro agente autônomo no Google Colab | prática (Colab) | 90 min |
| 1.5 | Quiz — Anatomia de um agente | quiz | 15 min |

### Módulo 2 — LLMs sob o capô: escolha de modelo e engenharia de contexto *(5h)*

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 2.1 | Como escolher o LLM do seu agente | vídeo | 20 min |
| 2.2 | Engenharia de contexto: system prompt, exemplos e saída estruturada | leitura | 35 min |
| 2.3 | Function calling e JSON estruturado na prática | vídeo | 20 min |
| 2.4 | Bancada de testes: comparando modelos e prompts para decisões de agente | prática (Colab + Google Sheets) | 90 min |
| 2.5 | Quiz — LLMs e engenharia de contexto | quiz | 15 min |

### Módulo 3 — RAG: conectando o agente ao conhecimento da sua empresa *(6h)*

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 3.1 | RAG do zero: embeddings, chunking e busca vetorial | vídeo | 25 min |
| 3.2 | RAG sem código: montando uma base de conhecimento no NotebookLM | prática (NotebookLM) | 60 min |
| 3.3 | RAG avançado em 2026: busca híbrida, re-ranking e avaliação | vídeo | 20 min |
| 3.4 | Pipeline RAG completo em Colab com FAISS | prática (Colab) | 100 min |
| 3.5 | Quiz — RAG na prática | quiz | 15 min |

### Módulo 4 — MCP: integrando agentes a APIs reais *(5h30)*

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 4.1 | MCP: o protocolo que padronizou a conexão entre agentes e o mundo | vídeo | 20 min |
| 4.2 | Anatomia de um servidor MCP: tools, resources e prompts | leitura | 35 min |
| 4.3 | Construindo um servidor MCP conectado a APIs públicas brasileiras | prática (Colab) | 100 min |
| 4.4 | Quiz — MCP e integrações | quiz | 15 min |

### Módulo 5 — Orquestração, memória e sistemas multiagente *(5h30)*

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 5.1 | Padrões de orquestração: pipeline, roteador e supervisor | vídeo | 20 min |
| 5.2 | Memória de agentes: do contexto à memória de longo prazo | vídeo | 20 min |
| 5.3 | Multiagentes: quando usar (e quando um agente só resolve) | leitura | 30 min |
| 5.4 | Sistema supervisor com agentes especialistas para triagem logística | prática (Colab) | 100 min |
| 5.5 | Quiz — Orquestração e memória | quiz | 15 min |

### Módulo 6 — Produção, segurança e projeto final certificado *(6h)*

| # | Aula | Tipo | Duração |
|---|---|---|---|
| 6.1 | Agentes em produção: observabilidade, custos e avaliação contínua | vídeo | 25 min |
| 6.2 | Segurança de agentes: prompt injection, permissões e human-in-the-loop | leitura | 35 min |
| 6.3 | Briefing do projeto final: o agente que vai para o seu portfólio | vídeo | 15 min |
| 6.4 | Projeto final certificado: agente autônomo de ponta a ponta | prática (Colab + Looker Studio) | 150 min |

---

## 7. Estratégia de avaliação e certificação

### Avaliação formativa (ao longo do curso)
- **Quizzes de módulo (Módulos 1 a 5):** 3–5 questões de múltipla escolha com feedback explicativo. Podem ser refeitos; conta a maior nota.
- **Práticas guiadas:** cada prática tem **critérios de conclusão** objetivos (checklist). O aluno marca a prática como concluída ao atingir todos os critérios e anexa o link do notebook Colab (ou do notebook NotebookLM) como evidência.

### Avaliação somativa (certificação)
O certificado de conclusão (32h) é emitido quando o aluno cumpre **as três condições**:

1. **Média dos quizzes ≥ 70%** (melhor tentativa de cada quiz).
2. **Todas as práticas guiadas marcadas como concluídas** com evidência (link do Colab/NotebookLM).
3. **Projeto final aprovado** conforme a rubrica abaixo (nota ≥ 70/100).

### Rubrica do projeto final (100 pontos)

| Critério | Pontos | O que se espera |
|---|---|---|
| Funcionamento do agente | 30 | Loop de decisão completo, com pelo menos 3 ferramentas funcionais |
| Integração real | 20 | Consome ao menos 1 API pública real e 1 fonte de conhecimento via RAG |
| Arquitetura e código | 20 | Notebook organizado, funções documentadas, tratamento de erros |
| Segurança e guardrails | 15 | Limite de iterações, validação de entradas, ponto de human-in-the-loop |
| Documentação e demonstração | 15 | README no notebook + vídeo curto (3–5 min) ou log comentado demonstrando 2 cenários |

**Feedback:** o projeto recebe parecer individual em até 10 dias úteis. Projetos com nota entre 50 e 69 podem ser reenviados uma vez.

### Cronograma sugerido
Ritmo recomendado de **1 módulo por semana + 2 semanas para o projeto final** (8 semanas, ~4h/semana). O curso é autoinstrucional: o aluno pode acelerar ou desacelerar livremente.

---

## 8. Observações de produção (uso interno)

- Vídeos gravados pela Giselle sozinha: câmera frontal + compartilhamento de slides. Roteiros completos com marcação de tempo estão em `modulo-1.md` (padrão a replicar nos demais módulos).
- Slides em Canva/Google Slides na paleta da marca (roxo/lavanda/teal), 8–15 slides por vídeo.
- Nenhuma prática exige instalação de software ou cartão de crédito: chaves de API usadas (Google AI Studio) têm tier gratuito.
