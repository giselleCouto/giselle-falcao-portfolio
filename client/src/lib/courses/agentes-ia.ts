import type { Course } from "./types";

// Gerado a partir do material pedagógico em docs/cursos/agentes-ia/
// Edite videoUrl / slidesUrl / practiceUrl conforme grava e publica os materiais.

export const agentesIa: Course = {
  "slug": "agentes-ia",
  "title": "Agentes de IA e Automação Inteligente",
  "level": "Avançado",
  "hours": "32h",
  "free": false,
  "tagline": "Do prompt à produção: construa agentes de IA que decidem, agem e se integram ao mundo real.",
  "description": "Construa agentes de IA autônomos que tomam decisões complexas. MCP, RAG, LLMs e integração com APIs reais. Projeto final com certificação.",
  "outcomes": [
    "Projetar e implementar agentes autônomos com LLMs, function calling e o padrão ReAct, do zero, em Google Colab",
    "Selecionar o modelo e o contexto adequados para cada agente, considerando custo, latência, janela de contexto e capacidade de tool use",
    "Construir pipelines de RAG — do protótipo sem código no NotebookLM ao pipeline com embeddings e FAISS — para dar conhecimento privado ao agente",
    "Criar e consumir servidores MCP, integrando agentes a APIs reais brasileiras de forma padronizada",
    "Orquestrar sistemas multiagente com memória e padrões supervisor-especialista, sabendo quando um único agente basta",
    "Avaliar, monitorar e proteger agentes em produção: observabilidade, custos, avaliação contínua, prompt injection e human-in-the-loop"
  ],
  "audience": "Profissionais de dados, engenharia, TI e inovação que já usam LLMs e querem construir automações que decidem e agem, não só respondem. Também atende especialistas de domínio (indústria, agro, logística, operações) com base técnica em Python que querem prototipar agentes para seus processos.",
  "prerequisites": "Python intermediário, noções de APIs REST e experiência prévia com LLMs via interface — nenhuma instalação local é necessária, pois todas as práticas rodam em ferramentas gratuitas de navegador.",
  "status": "disponivel",
  "modules": [
    {
      "id": "modulo-1",
      "title": "Anatomia de um Agente de IA",
      "subtitle": "Do chatbot ao agente: entenda o loop ReAct e construa seu primeiro agente autônomo em Colab (módulo de amostra gratuita)",
      "duration": "4h",
      "free": true,
      "lessons": [
        {
          "title": "Do chatbot ao agente: o que muda quando a IA age",
          "type": "video",
          "duration": "20min",
          "summary": "Diferencia chatbot (reativo) de agente (missão + ferramentas + loop + critério de parada) a partir de um caso real de logística. Apresenta os quatro componentes de todo agente — modelo, ferramentas, memória e loop com guardrails — e a matriz risco × valor para decidir onde a autonomia faz sentido, com exemplos brasileiros de agro, indústria e logística."
        },
        {
          "title": "O ecossistema de agentes em 2026: function calling, MCP e frameworks",
          "type": "leitura",
          "duration": "30min",
          "summary": "Linha do tempo técnica do function calling (2023) ao MCP como padrão de mercado e à era dos agentes verticais de 2026. Mapeia os principais frameworks (LangGraph, CrewAI, OpenAI Agents SDK, Google ADK, Claude Agent SDK) e explica por que o curso ensina os fundamentos em Python puro em vez de casar com um framework."
        },
        {
          "title": "Por dentro do loop do agente: ReAct, ferramentas e guardrails",
          "type": "video",
          "duration": "25min",
          "summary": "Abre o capô do padrão ReAct: raciocínio, ação e observação volta a volta, com o pseudocódigo de ~10 linhas que está no coração de qualquer agente. Mostra como ferramentas são declaradas ao modelo (nome, descrição, esquema), quem executa o quê, e os três erros clássicos — loop infinito, alucinação de ferramenta e excesso de autonomia — com o guardrail que previne cada um."
        },
        {
          "title": "Seu primeiro agente autônomo no Google Colab",
          "type": "pratica",
          "duration": "90min",
          "summary": "Passo a passo de 14 etapas: chave gratuita no Google AI Studio, ferramentas Python conectadas à BrasilAPI (CEP) e à Open-Meteo (clima), e um agente Gemini com function calling que decide MANTER ou REPLANEJAR rotas de entrega. O aluno inspeciona o loop ReAct no histórico, testa guardrails de validação e limite de iterações, e entrega o notebook com checklist de conclusão.",
          "practiceTool": "Colab"
        },
        {
          "title": "Quiz — Anatomia de um agente",
          "type": "quiz",
          "duration": "15min",
          "summary": "Cinco questões de múltipla escolha com feedback explicativo sobre agente × chatbot, ciclo ReAct, papel do MCP, quem executa no function calling e classificação de ferramentas por risco. Tentativas ilimitadas, vale a maior nota; mínimo recomendado de 70%."
        }
      ],
      "quiz": [
        {
          "prompt": "O que diferencia fundamentalmente um agente de IA de um chatbot?",
          "options": [
            "O agente usa um modelo de linguagem maior e mais caro que o chatbot.",
            "O agente recebe uma missão e decide sozinho os passos, usando ferramentas em um loop com critério de parada.",
            "O agente responde mais rápido porque roda na nuvem."
          ],
          "correctIndex": 1,
          "explanation": "O que define o agente não é o tamanho do modelo, e sim a autonomia estruturada: missão (em vez de pergunta), uso de ferramentas para perceber e agir, loop de decisão e critério de parada. Um chatbot pode até usar um modelo maior — e continuar sendo reativo."
        },
        {
          "prompt": "No padrão ReAct, qual é a sequência correta de um ciclo do loop?",
          "options": [
            "Raciocínio → Ação → Observação, repetindo até o critério de parada.",
            "Planejamento completo de todos os passos → execução em lote → relatório final.",
            "Observação → Resposta final → Raciocínio, sempre em uma única volta."
          ],
          "correctIndex": 0,
          "explanation": "O ReAct alterna raciocínio ('o que me falta?'), ação (chamada de ferramenta) e observação (resultado), decidindo apenas o próximo passo a cada volta. É isso que permite ao agente se adaptar quando uma observação muda o cenário — um plano rígido feito de uma vez quebraria."
        },
        {
          "prompt": "Qual é o papel do MCP (Model Context Protocol) no ecossistema de agentes?",
          "options": [
            "Substituir os LLMs em tarefas de raciocínio complexo.",
            "Padronizar como aplicações expõem ferramentas, dados e prompts para modelos de IA, evitando conectores sob medida para cada par sistema-modelo.",
            "Treinar modelos de linguagem com dados privados da empresa."
          ],
          "correctIndex": 1,
          "explanation": "O MCP (lançado como padrão aberto pela Anthropic em 2024 e adotado pelos grandes provedores em 2025) é o 'USB-C dos agentes': você escreve um servidor MCP uma vez e qualquer cliente compatível o utiliza. Ele não treina modelos nem raciocina — ele padroniza a conexão."
        },
        {
          "prompt": "Durante o function calling, quem efetivamente executa a ferramenta (por exemplo, a chamada à API de previsão do tempo)?",
          "options": [
            "O próprio LLM, dentro dos servidores do provedor do modelo.",
            "O código da aplicação (por exemplo, sua função Python no Colab), após o modelo devolver um pedido estruturado de chamada.",
            "A API externa, que lê a conversa e decide responder sozinha."
          ],
          "correctIndex": 1,
          "explanation": "O modelo nunca executa — ele pede, devolvendo um JSON com nome da função e argumentos. Quem valida e executa é o seu código, que devolve o resultado como observação. Consequência prática de segurança: o agente só pode fazer o que as ferramentas declaradas permitem."
        },
        {
          "prompt": "Um agente de cobrança pode enviar e-mails a clientes. Qual guardrail é o mais adequado para a ferramenta enviar_email, considerando a classificação de risco vista no módulo?",
          "options": [
            "Aumentar o limite de iterações do loop para o agente ter mais chances de acertar.",
            "Remover a descrição da ferramenta para o modelo usá-la com mais cautela.",
            "Exigir aprovação humana (human-in-the-loop) antes do envio, por ser uma ação de alto impacto voltada ao cliente."
          ],
          "correctIndex": 2,
          "explanation": "Ferramentas se classificam por risco: leitura roda livre, escrita reversível roda com log, e ações irreversíveis ou de alto impacto (como comunicação direta com cliente) exigem aprovação humana. Limite de iterações previne loop infinito (outro problema), e remover a descrição só deixaria o agente confuso — descrição boa é guardrail, não risco."
        }
      ]
    },
    {
      "id": "modulo-2",
      "title": "LLMs sob o capô: escolha de modelo e engenharia de contexto",
      "subtitle": "O cérebro do agente: como escolher o modelo certo e escrever o contexto que produz decisões consistentes",
      "duration": "5h",
      "free": false,
      "lessons": [
        {
          "title": "Como escolher o LLM do seu agente",
          "type": "video",
          "duration": "20min",
          "summary": "Critérios práticos de seleção: custo por milhão de tokens, latência, janela de contexto, qualidade de tool use e modelos abertos vs. proprietários. Giselle apresenta o 'funil de escolha' que usa em consultoria: comece pequeno e barato, suba só quando a avaliação provar necessidade."
        },
        {
          "title": "Engenharia de contexto: system prompt, exemplos e saída estruturada",
          "type": "leitura",
          "duration": "35min",
          "summary": "Texto técnico sobre a evolução de prompt engineering para engenharia de contexto: papéis do system prompt, few-shot examples, delimitação de dados vs. instruções e formatação de observações de ferramentas. Inclui o template de system prompt de agente usado no curso (persona, missão, regras, ferramentas, formato de resposta)."
        },
        {
          "title": "Function calling e JSON estruturado na prática",
          "type": "video",
          "duration": "20min",
          "summary": "Como declarar esquemas de ferramentas e forçar saída em JSON Schema para decisões auditáveis. Demonstração narrada comparando resposta em texto livre vs. estruturada no mesmo cenário de decisão logística — e por que sistemas downstream exigem a segunda."
        },
        {
          "title": "Bancada de testes: comparando modelos e prompts para decisões de agente",
          "type": "pratica",
          "duration": "90min",
          "summary": "No Colab, o aluno monta uma bancada que roda os mesmos 10 casos de decisão logística contra 2 modelos Gemini e 3 variações de system prompt, registrando acertos, tokens e latência. Os resultados vão para o Google Sheets, onde o aluno monta a tabela comparativa e escolhe a configuração vencedora com justificativa.",
          "practiceTool": "Colab"
        },
        {
          "title": "Quiz — LLMs e engenharia de contexto",
          "type": "quiz",
          "duration": "15min",
          "summary": "Cinco questões sobre critérios de escolha de modelo, papéis do system prompt, few-shot e saída estruturada, com feedback explicativo por questão."
        }
      ]
    },
    {
      "id": "modulo-3",
      "title": "RAG: conectando o agente ao conhecimento da sua empresa",
      "subtitle": "Do protótipo sem código no NotebookLM ao pipeline com embeddings e FAISS plugado no agente",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "RAG do zero: embeddings, chunking e busca vetorial",
          "type": "video",
          "duration": "25min",
          "summary": "O problema que o RAG resolve (conhecimento privado e atualizado sem retreinar modelo) e o pipeline peça a peça: como texto vira vetor, por que o tamanho do chunk importa e como funciona a busca por similaridade. Analogia condutora: a biblioteca com bibliotecária que entende o sentido do pedido, não só as palavras."
        },
        {
          "title": "RAG sem código: montando uma base de conhecimento no NotebookLM",
          "type": "pratica",
          "duration": "60min",
          "summary": "O aluno cria um notebook no NotebookLM com documentos públicos reais (normas do MAPA e manuais técnicos da Embrapa), faz perguntas de operação e analisa as respostas com citações. Fecha com teste de estresse: perguntas fora da base e ambíguas, documentando onde a ferramenta pronta atende e onde só um pipeline próprio resolve.",
          "practiceTool": "NotebookLM"
        },
        {
          "title": "RAG avançado em 2026: busca híbrida, re-ranking e avaliação",
          "type": "video",
          "duration": "20min",
          "summary": "O que separa RAG de demo de RAG de produção: busca híbrida (vetorial + palavra-chave), re-ranking, metadados e filtros, e avaliação contínua de recuperação e fidelidade. Quando usar RAG vs. janela de contexto longa — e por que a resposta em 2026 é 'quase sempre os dois'."
        },
        {
          "title": "Pipeline RAG completo em Colab com FAISS",
          "type": "pratica",
          "duration": "100min",
          "summary": "Passo a passo no Colab: chunking de documentos técnicos públicos, embeddings, indexação com FAISS em memória e a função buscar_conhecimento() plugada como ferramenta no agente do Módulo 1, que passa a citar fontes. Fecha com miniavaliação: 8 perguntas-gabarito e cálculo da taxa de acerto da recuperação.",
          "practiceTool": "Colab"
        },
        {
          "title": "Quiz — RAG na prática",
          "type": "quiz",
          "duration": "15min",
          "summary": "Cinco questões sobre pipeline RAG, chunking, embeddings, busca híbrida e avaliação, com feedback explicativo por questão."
        }
      ]
    },
    {
      "id": "modulo-4",
      "title": "MCP: integrando agentes a APIs reais",
      "subtitle": "O USB-C dos agentes: construa e consuma servidores MCP conectados a APIs públicas brasileiras",
      "duration": "5h30",
      "free": false,
      "lessons": [
        {
          "title": "MCP: o protocolo que padronizou a conexão entre agentes e o mundo",
          "type": "video",
          "duration": "20min",
          "summary": "A história e a arquitetura do Model Context Protocol: o problema N×M de integrações, o lançamento aberto pela Anthropic em 2024, a adoção pelos grandes provedores em 2025 e a arquitetura host-client-server. Por que 'escreva o conector uma vez' muda a economia de projetos de automação, com exemplos de consultoria industrial."
        },
        {
          "title": "Anatomia de um servidor MCP: tools, resources e prompts",
          "type": "leitura",
          "duration": "35min",
          "summary": "Texto técnico dissecando os três blocos: tools (ações), resources (dados) e prompts (templates reutilizáveis). Cobre transports (stdio e HTTP), o fluxo de descoberta e boas práticas de descrição — conectando com a engenharia de contexto do Módulo 2 — e traz exemplo comentado de servidor com FastMCP."
        },
        {
          "title": "Construindo um servidor MCP conectado a APIs públicas brasileiras",
          "type": "pratica",
          "duration": "100min",
          "summary": "No Colab, o aluno constrói com FastMCP um servidor 'Brasil Operações' com 3 tools — CEP e feriados (BrasilAPI), câmbio PTAX (Banco Central) e municípios (IBGE) — e o consome de um cliente MCP no próprio notebook, conectando-o ao agente do curso. Fecha comparando quantas linhas mudaram no agente para ganhar 3 integrações novas.",
          "practiceTool": "Colab"
        },
        {
          "title": "Quiz — MCP e integrações",
          "type": "quiz",
          "duration": "15min",
          "summary": "Quatro questões sobre o problema N×M, arquitetura do MCP, tools vs. resources vs. prompts e transports, com feedback explicativo por questão."
        }
      ]
    },
    {
      "id": "modulo-5",
      "title": "Orquestração, memória e sistemas multiagente",
      "subtitle": "Pipeline, roteador e supervisor: vários agentes trabalhando juntos — e o senso crítico de quando um só basta",
      "duration": "5h30",
      "free": false,
      "lessons": [
        {
          "title": "Padrões de orquestração: pipeline, roteador e supervisor",
          "type": "video",
          "duration": "20min",
          "summary": "Os três padrões que resolvem 90% dos casos reais: pipeline (etapas fixas), roteador (classifica e despacha) e supervisor-especialistas (um agente coordena agentes de domínio). Critérios de escolha com exemplos de indústria, agro e logística — e o alerta: complexidade de orquestração é custo, não troféu."
        },
        {
          "title": "Memória de agentes: do contexto à memória de longo prazo",
          "type": "video",
          "duration": "20min",
          "summary": "Como agentes lembram: janela de contexto como memória de trabalho, sumarização de histórico e memória de longo prazo com registros estruturados recuperados via busca, reaproveitando o RAG do Módulo 3. Padrões práticos (perfil da operação, decisões passadas, lições aprendidas) e os riscos de memória envenenada."
        },
        {
          "title": "Multiagentes: quando usar (e quando um agente só resolve)",
          "type": "leitura",
          "duration": "30min",
          "summary": "Texto crítico contra o hype: multiagente aumenta custo, latência e superfície de erro, e só se justifica quando há especialidades com contextos distintos, paralelismo real ou limites de contexto. Framework de decisão em 5 perguntas e 3 estudos de caso — incluindo um em que o agente único venceu."
        },
        {
          "title": "Sistema supervisor com agentes especialistas para triagem logística",
          "type": "pratica",
          "duration": "100min",
          "summary": "No Colab, o aluno constrói a central de triagem de ocorrências da RotaViva: um supervisor classifica ocorrências (atraso, avaria, desvio de temperatura) e delega a dois especialistas — 'Clima & Rota' (ferramentas do Módulo 1) e 'Documentação' (RAG do Módulo 3). A resposta final é consolidada com log completo das delegações.",
          "practiceTool": "Colab"
        },
        {
          "title": "Quiz — Orquestração e memória",
          "type": "quiz",
          "duration": "15min",
          "summary": "Cinco questões sobre padrões de orquestração, tipos de memória e critérios para (não) usar multiagente, com feedback explicativo por questão."
        }
      ]
    },
    {
      "id": "modulo-6",
      "title": "Produção, segurança e projeto final certificado",
      "subtitle": "Observabilidade, defesa contra prompt injection e o agente completo que vai para o seu portfólio",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Agentes em produção: observabilidade, custos e avaliação contínua",
          "type": "video",
          "duration": "25min",
          "summary": "O que muda quando o agente sai do notebook: logging estruturado de cada volta do loop, métricas que importam (custo por missão, taxa de conclusão, taxa de escalação a humano) e conjuntos de avaliação que rodam a cada mudança de prompt. Giselle apresenta o checklist de go-live que usa em projetos de consultoria."
        },
        {
          "title": "Segurança de agentes: prompt injection, permissões e human-in-the-loop",
          "type": "leitura",
          "duration": "35min",
          "summary": "Texto aprofundado sobre o principal risco de 2026: prompt injection indireta e a 'tríade letal' — dados privados + conteúdo não confiável + capacidade de agir. Defesas em camadas: privilégio mínimo por ferramenta, separação dados/instruções, validação de saída, aprovação humana para ações de risco e trilha de auditoria."
        },
        {
          "title": "Briefing do projeto final: o agente que vai para o seu portfólio",
          "type": "video",
          "duration": "15min",
          "summary": "Apresentação do projeto final: requisitos (mínimo 3 ferramentas, 1 API pública real, 1 fonte de conhecimento via RAG, guardrails dos 3 tipos), a rubrica de 100 pontos explicada critério a critério e exemplos de escopo bem dimensionado. Recado central: escopo estreito e profundo vence escopo largo e raso."
        },
        {
          "title": "Projeto final certificado: agente autônomo de ponta a ponta",
          "type": "pratica",
          "duration": "150min",
          "summary": "O aluno projeta e constrói seu próprio agente para um processo real do seu contexto (ou um dos 3 cenários sugeridos: torre de controle logística, assistente técnico de campo, triagem de qualidade industrial). Entrega notebook documentado, log de demonstração em 2 cenários e painel de métricas no Looker Studio a partir do log exportado em Google Sheets.",
          "practiceTool": "Colab"
        }
      ]
    }
  ],
  "library": []
};
