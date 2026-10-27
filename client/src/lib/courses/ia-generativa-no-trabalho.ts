import type { Course } from "./types";

// Programa corporativo (formato Executivo: eixos → competências → módulos).
// Programa completo e roteiros de gravação no Claude Docs: https://claude.ai/code/artifact/ea1d4756-eb7a-46d3-96e6-b6f2ba4922b2
// Edite videoUrl / slidesUrl / practiceUrl conforme grava e publica os materiais.

export const iaGenerativaNoTrabalho: Course = {
  "slug": "ia-generativa-no-trabalho",
  "title": "IA Generativa no Trabalho: Produtividade com Segurança para Equipes",
  "level": "Iniciante",
  "hours": "40h",
  "free": false,
  "publico": "empresas",
  "tagline": "Equipes não técnicas usando ChatGPT, Copilot, Gemini e Claude com produtividade real, LGPD e política de uso em dia.",
  "description": "Programa corporativo para capacitar equipes administrativas, comerciais, de marketing, RH, jurídico, atendimento e financeiro, e suas lideranças, a usar IA generativa no dia a dia com segurança. São 6 módulos com aulas curtas, encontros ao vivo e um projeto aplicado em que a equipe constrói o próprio Guia de IA Generativa, com fluxos redesenhados, prompts testados, regras de segurança e ganho medido.",
  "outcomes": [
    "Explicar com palavras simples como a IA generativa funciona, onde ela erra e quais ferramentas existem em 2026",
    "Escrever pedidos (prompts) claros, do básico ao avançado, e transformá-los em modelos reutilizáveis e assistentes da equipe",
    "Usar IA generativa com segurança, protegendo dados pessoais e sigilosos e respeitando a LGPD, os direitos autorais e a política da empresa",
    "Aplicar IA generativa a textos, atas, planilhas, apresentações, pesquisa e às rotinas de atendimento, vendas, marketing, RH, jurídico e financeiro",
    "Redesenhar fluxos de trabalho com automações simples, assistentes personalizados e bases de conhecimento, sem programação",
    "Medir o ganho de tempo e de qualidade, priorizar casos de uso e escalar o uso de IA na equipe com apoio da liderança"
  ],
  "audience": "Profissionais de áreas administrativas, comerciais, de marketing, RH, jurídico, atendimento e financeiro, e suas lideranças (coordenadores, gerentes e supervisores). Em cada módulo há um encontro ao vivo em versão para gestores, com foco em decisão, política de uso, medição e apoio à equipe.",
  "prerequisites": "Nenhum conhecimento técnico. Basta usar e-mail, editor de texto e planilha no dia a dia e ter acesso a uma ferramenta de IA aprovada pela empresa (ou usar apenas dados de exemplo durante as atividades).",
  "status": "disponivel",
  "conteudo": "em-producao",
  "modules": [
    {
      "id": "modulo-1",
      "title": "O que é IA generativa e como ela \"pensa\"",
      "subtitle": "Competência: compreender como a IA generativa funciona, seus limites e as ferramentas disponíveis",
      "duration": "6h",
      "free": true,
      "lessons": [
        {
          "title": "IA generativa no seu dia de trabalho",
          "type": "video",
          "duration": "9min",
          "summary": "O que é IA (Inteligência Artificial) e o que torna a IA generativa diferente de um buscador. Os cinco usos que servem para quase todo mundo no escritório e a regra de ouro do programa: a IA faz o rascunho, a pessoa revisa, decide e assina.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Como um modelo de linguagem escreve",
          "type": "video",
          "duration": "10min",
          "summary": "Com a analogia do teclado que sugere a próxima palavra, a aula explica o que é um LLM (grande modelo de linguagem), como ele é treinado e por que gera o texto mais provável, e não necessariamente o verdadeiro. Fluência não é garantia de verdade.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Tokens, contexto e memória: por que a IA \"esquece\"",
          "type": "video",
          "duration": "10min",
          "summary": "O que são tokens e janela de contexto, por que detalhes se perdem em materiais longos e o que a ferramenta lembra entre conversas. Boas práticas: um assunto por conversa e dividir documentos grandes em etapas.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Alucinação e outros limites: quando desconfiar",
          "type": "video",
          "duration": "11min",
          "summary": "Os tipos de alucinação (fatos, citações, leis e links inventados), os limites com contas, atualização e contexto da empresa, e os cinco sinais que pedem conferência redobrada. A conferência faz parte do trabalho.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "O mapa das ferramentas em 2026",
          "type": "video",
          "duration": "11min",
          "summary": "ChatGPT, Microsoft Copilot, Google Gemini e Claude: onde cada um \"mora\", os recursos comuns (anexos, pesquisa com fontes, voz, imagens, modelos de raciocínio) e como escolher a ferramenta certa para cada tarefa, começando pela aprovada pela empresa.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Versões gratuitas e corporativas: o que muda e como escolher",
          "type": "video",
          "duration": "12min",
          "summary": "As diferenças entre versões gratuitas, pessoais pagas e corporativas em contrato, uso dos dados, controle de acesso e registros. O que a versão corporativa garante e o que não garante, e as perguntas a fazer à TI antes de usar.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: Prazo que não existia",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma distribuidora descobre uso espontâneo de IA em contas pessoais e uma proposta enviada com um prazo inventado pela ferramenta.",
          "content": "Uma distribuidora de materiais de escritório com 120 funcionários atende empresas e órgãos públicos em três estados. Nos últimos meses, a diretoria percebeu que propostas comerciais e e-mails a clientes estavam ficando mais rápidos e bem escritos, sem que a empresa tivesse adotado nenhuma ferramenta de IA.\n\nUma conversa informal revelou o motivo: cerca de metade da equipe já usava IA generativa por conta própria, em versões gratuitas e com contas pessoais. Vendedores colavam pedidos de clientes para rascunhar propostas; o financeiro colava planilhas para pedir resumos; o atendimento usava a ferramenta para responder reclamações.\n\nO problema veio à tona quando um vendedor enviou a um cliente importante uma proposta com prazo de entrega de dez dias úteis para um item importado. O prazo tinha sido \"sugerido\" pela ferramenta, que preencheu a lacuna com um número plausível. O prazo real era de 35 dias. O cliente programou um evento contando com a entrega, e a distribuidora precisou arcar com frete aéreo para não perder a conta.\n\nAo investigar, a diretoria identificou três falhas: a ferramenta inventou uma informação com toda a confiança (alucinação); ninguém conferiu o número antes do envio; e dados de clientes e preços circulavam por ferramentas sem contrato com a empresa. Ao mesmo tempo, ficou claro que o ganho de tempo era real e que a equipe não queria abrir mão dele.\n\nA diretoria decidiu não proibir o uso, mas organizá-lo: escolher uma ferramenta corporativa, definir em quais tarefas a IA entra e com que cuidados, e treinar a equipe. O primeiro passo seria um mapa das tarefas de cada área.\n\nPerguntas para discussão:\n\n1. Quais características do funcionamento da IA explicam o prazo inventado? Como a equipe poderia ter percebido o risco antes do envio?\n\n2. Das tarefas descritas (propostas, resumos de planilhas, respostas a reclamações), quais você classificaria como \"ajuda muito\", \"ajuda com revisão\" e \"não deve ser usada\"? Por quê?\n\n3. Que diferenças concretas a versão corporativa traria para essa empresa, e o que ela não resolveria sozinha?"
        },
        {
          "title": "Atividade prática: Mapa de tarefas da equipe",
          "type": "pratica",
          "duration": "2h",
          "summary": "Liste 15 tarefas recorrentes suas ou da equipe e classifique cada uma em: a IA ajuda muito, ajuda com revisão, não deve ser usada. Teste três delas na ferramenta liberada pela empresa, com textos de exemplo e sem dados reais, e registre o que funcionou, o que errou e quanto tempo levou. Entrega: o mapa de tarefas com os três testes registrados.",
          "practiceTool": "Google Sheets",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Qual frase descreve melhor como um modelo de linguagem (LLM) produz uma resposta?",
          "options": [
            "Consulta um banco de dados de respostas verdadeiras e copia a mais adequada.",
            "Gera o texto peça por peça, escolhendo a continuação mais provável para o pedido e o contexto.",
            "Pesquisa sempre na internet e resume as páginas encontradas.",
            "Segue regras escritas por programadores para cada tipo de pergunta."
          ],
          "correctIndex": 1,
          "explanation": "O LLM aprendeu padrões da linguagem e gera a resposta prevendo a próxima parte mais provável (aula 1.2). Por isso uma resposta fluente pode estar errada."
        },
        {
          "prompt": "Em uma conversa muito longa, a IA deixou de seguir uma instrução dada no início. Qual é a explicação mais provável?",
          "options": [
            "A ferramenta ficou sem internet.",
            "A instrução foi apagada pela empresa.",
            "A janela de contexto e a atenção do modelo são limitadas; instruções antigas podem perder peso ou sair da janela.",
            "A IA decidiu ignorar a instrução por discordar dela."
          ],
          "correctIndex": 2,
          "explanation": "Aula 1.3: o modelo considera um volume limitado de texto de cada vez. Em conversas longas, repita instruções importantes ou comece uma nova conversa com um resumo."
        },
        {
          "prompt": "Qual destes é um sinal de alerta que pede conferência redobrada da resposta?",
          "options": [
            "A resposta está em português.",
            "A resposta traz números, datas, nomes de leis ou citações.",
            "A resposta tem mais de três parágrafos.",
            "A resposta usa uma linguagem cordial."
          ],
          "correctIndex": 1,
          "explanation": "Números, datas, nomes próprios, leis e citações são onde a alucinação mais aparece e mais causa dano (aula 1.4)."
        },
        {
          "prompt": "O que costuma diferenciar uma versão corporativa de uma versão gratuita de ferramenta de IA?",
          "options": [
            "A versão corporativa nunca erra.",
            "A versão corporativa dispensa a política de uso da empresa.",
            "Contrato com a empresa, compromisso sobre o uso dos dados, controle de acesso e administração pela TI.",
            "Não há diferença: muda apenas a cor da tela."
          ],
          "correctIndex": 2,
          "explanation": "Aula 1.6: a versão corporativa traz contrato, regras sobre os dados e controle. Mas não garante respostas certas nem libera qualquer tipo de dado."
        },
        {
          "prompt": "Qual é a regra de ouro do programa para o uso de IA generativa no trabalho?",
          "options": [
            "A IA decide e a pessoa executa.",
            "A IA faz o rascunho; a pessoa revisa, decide e assina.",
            "Só gestores podem usar IA.",
            "Tudo o que a IA produz pode ser enviado sem revisão se a ferramenta for paga."
          ],
          "correctIndex": 1,
          "explanation": "A IA acelera a primeira versão; a responsabilidade e o julgamento continuam humanos (aula 1.1)."
        }
      ]
    },
    {
      "id": "modulo-2",
      "title": "Pedir bem: técnicas de prompt do básico ao avançado",
      "subtitle": "Competência: escrever pedidos eficazes e reutilizáveis",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "O pedido decide a resposta",
          "type": "video",
          "duration": "9min",
          "summary": "O que é um prompt e por que ele funciona como um briefing: a IA só sabe o que está escrito no pedido. A diferença entre um pedido vago e um pedido claro, com cinco informações que economizam muitos minutos de correção.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "A receita do bom pedido: contexto, papel, tarefa e formato",
          "type": "video",
          "duration": "10min",
          "summary": "Os cinco ingredientes do bom pedido (contexto, papel, tarefa, formato, tom e público) aplicados a uma ata de reunião. Como definir critérios de qualidade e pedir que a IA sinalize lacunas em vez de inventar.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Exemplos e restrições: mostrar o que você quer",
          "type": "video",
          "duration": "10min",
          "summary": "Como ensinar pelo exemplo, com respostas aprovadas da equipe, e como usar restrições de tamanho, conteúdo, linguagem e fontes. Os cuidados para o exemplo não ser copiado demais.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Passo a passo e iteração: a conversa como rascunho",
          "type": "video",
          "duration": "11min",
          "summary": "Técnicas de raciocínio em etapas, o pedido para que a IA faça perguntas antes de responder e o ciclo de três rodadas: rascunho, crítica e versão final. Como dividir tarefas grandes.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Modelos reutilizáveis e a biblioteca de prompts da equipe",
          "type": "video",
          "duration": "10min",
          "summary": "Como transformar bons pedidos em modelos com lacunas e organizar uma biblioteca de prompts compartilhada, com ficha, responsável e revisão periódica.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Projetos, GPTs, Gems e assistentes com instruções fixas",
          "type": "video",
          "duration": "12min",
          "summary": "O que são projetos e assistentes personalizados em cada ferramenta, como escrever instruções fixas em quatro partes e quando vale criar um assistente em vez de usar um modelo de prompt.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: Cada atendente com seu prompt",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma operadora de planos odontológicos padroniza respostas a reclamações com um modelo de prompt único.",
          "content": "Uma operadora regional de planos odontológicos tem um time de 14 atendentes que responde, por e-mail e chat, reclamações sobre reembolsos, carências e rede credenciada. Há seis meses, a empresa liberou uma ferramenta corporativa de IA generativa, e cada atendente passou a usá-la do seu jeito.\n\nOs resultados eram desiguais. Uma atendente escrevia \"responda o cliente\" e colava a mensagem; outro pedia \"uma resposta educada\"; uma terceira pedia \"uma resposta completa explicando tudo\". As respostas variavam de secas a longas demais, e duas chegaram a prometer reembolsos fora da política, porque a ferramenta não conhecia as regras da empresa.\n\nA coordenadora reuniu três pedidos reais, já anonimizados, e analisou com a equipe o que faltava em cada um: nenhum dizia quem era a empresa, qual era a política aplicável, qual o tom desejado nem o tamanho da resposta. Nenhum proibia promessas fora da política.\n\nJuntos, escreveram um modelo único com contexto (operadora regional, política de reembolso colada abaixo), papel (atendente experiente e cordial), tarefa (responder à mensagem do cliente), formato (até dez linhas, com o próximo passo claro), tom (empático, sem jargão) e restrições (não prometer nada além da política; se o caso não estiver coberto, dizer que vai verificar e retornar em até dois dias úteis).\n\nO modelo foi testado em duas rodadas com casos difíceis e virou a primeira ficha da biblioteca de prompts do time.\n\nPerguntas para discussão:\n\n1. Quais ingredientes da receita do bom pedido faltavam nos três pedidos originais? Qual ausência gerava mais risco?\n\n2. Que restrições você acrescentaria ao modelo para proteger a empresa e o cliente?\n\n3. Esse caso pede apenas um modelo de prompt ou já justifica um assistente personalizado com a política anexada? Justifique."
        },
        {
          "title": "Atividade prática: Biblioteca de prompts da equipe",
          "type": "pratica",
          "duration": "2h",
          "summary": "Escolha cinco tarefas do seu mapa de tarefas e escreva, para cada uma, um prompt completo e reutilizável (contexto, papel, tarefa, formato, tom, exemplos e restrições). Teste cada um em pelo menos duas rodadas, registre a versão final e dê uma nota de 1 a 5 para a resposta. Entrega: a biblioteca com cinco fichas de prompts testados.",
          "practiceTool": "Google Docs",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Por que um pedido vago costuma gerar uma resposta genérica?",
          "options": [
            "Porque a ferramenta economiza esforço de propósito.",
            "Porque a IA só sabe o que está no pedido e preenche as lacunas com o \"mais comum\".",
            "Porque pedidos curtos são bloqueados pela empresa.",
            "Porque a IA só entende pedidos em inglês."
          ],
          "correctIndex": 1,
          "explanation": "O prompt funciona como um briefing (aula 2.1): sem contexto, a IA completa o que falta com o padrão mais provável."
        },
        {
          "prompt": "Quais são os ingredientes da receita do bom pedido?",
          "options": [
            "Senha, login, ferramenta e horário.",
            "Contexto, papel, tarefa, formato e tom/público.",
            "Título, introdução, conclusão e bibliografia.",
            "Pergunta, resposta, nota e comentário."
          ],
          "correctIndex": 1,
          "explanation": "Aula 2.2: contexto, papel, tarefa, formato e tom/público. Quando a resposta não vem boa, quase sempre falta um deles."
        },
        {
          "prompt": "Qual destes pedidos usa uma restrição de forma útil?",
          "options": [
            "\"Escreva qualquer coisa.\"",
            "\"Responda usando apenas a política de troca colada abaixo; se o caso não estiver nela, diga que vai verificar.\"",
            "\"Seja criativo e invente o que for preciso.\"",
            "\"Faça o melhor possível.\""
          ],
          "correctIndex": 1,
          "explanation": "Restrições claras limitam a resposta às fontes certas e evitam promessas indevidas (aula 2.3)."
        },
        {
          "prompt": "Na técnica de iteração em três rodadas, qual é a ordem recomendada?",
          "options": [
            "Versão final, rascunho, crítica.",
            "Crítica, versão final, rascunho.",
            "Rascunho, crítica, versão final.",
            "Uma única rodada é sempre suficiente."
          ],
          "correctIndex": 2,
          "explanation": "Aula 2.4: primeiro o rascunho, depois a crítica (por exemplo, \"revise como um cliente exigente\") e, por fim, a versão final com as melhorias."
        },
        {
          "prompt": "Quando vale criar um assistente personalizado (projeto, GPT, Gem) em vez de usar só um modelo de prompt?",
          "options": [
            "Sempre, para qualquer tarefa.",
            "Nunca: assistentes são proibidos em empresas.",
            "Quando a tarefa é frequente, usa sempre os mesmos documentos de referência e várias pessoas precisam de um padrão.",
            "Apenas quando a tarefa acontece uma vez por ano."
          ],
          "correctIndex": 2,
          "explanation": "Aula 2.6: tarefas frequentes, com documentos fixos e padrão importante justificam o assistente; tarefas eventuais pedem só um bom modelo de prompt."
        }
      ]
    },
    {
      "id": "modulo-3",
      "title": "Uso seguro e responsável",
      "subtitle": "Competência: usar IA generativa com segurança, ética e conformidade",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "O que nunca colar na ferramenta",
          "type": "video",
          "duration": "10min",
          "summary": "A lista do \"nunca\": dados pessoais (como CPF), dados sensíveis, senhas, informações estratégicas e documentos sigilosos. Como anonimizar um texto antes de pedir ajuda e a pergunta rápida \"se este texto vazasse, alguém seria prejudicado?\".",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "LGPD no uso da IA, sem juridiquês",
          "type": "video",
          "duration": "11min",
          "summary": "O que é a LGPD e a ANPD, a diferença entre dado pessoal, sensível e anonimizado, e os três princípios que resolvem a maior parte das dúvidas: finalidade, necessidade e segurança. O papel do encarregado de dados (DPO) e o que fazer diante de um incidente.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Classificação da informação: o semáforo de dados",
          "type": "video",
          "duration": "10min",
          "summary": "Os níveis público, interno, confidencial e restrito transformados num semáforo verde, amarelo e vermelho que diz qual informação pode ir para qual ferramenta. Na dúvida, a cor mais restritiva.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Direitos autorais, viés e checagem de fatos",
          "type": "video",
          "duration": "11min",
          "summary": "Cuidados com estilo de autores, marcas e autoria de conteúdos gerados; como identificar e revisar viés em textos sobre pessoas; e a checagem em três passos: fonte, número e nome.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Política de uso e IA \"às escondidas\"",
          "type": "video",
          "duration": "11min",
          "summary": "Por que existe o uso escondido de IA (shadow AI), as seis perguntas que uma boa política de uso responde e como trazer o uso para a luz sem punição, tornando o caminho oficial mais fácil que o escondido.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Regulação de IA em linguagem simples: Brasil, Europa e normas",
          "type": "video",
          "duration": "12min",
          "summary": "A lógica por risco do PL 2338/2023 no Brasil e do AI Act europeu, a norma ISO/IEC 42001 para gestão de IA e o que muda para quem usa IA no escritório: transparência, registro e responsabilidade humana. Conteúdo conferido na data de cada turma.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: A planilha de avaliação na ferramenta gratuita",
          "type": "leitura",
          "duration": "30min",
          "summary": "Uma analista de RH cola dados sensíveis da equipe numa ferramenta gratuita para pedir um resumo.",
          "content": "Uma rede de clínicas veterinárias com 18 unidades tinha acabado de concluir o ciclo anual de avaliação de desempenho. A analista de RH responsável precisava preparar, em dois dias, um resumo para cada gestor com os pontos fortes e de desenvolvimento das suas equipes.\n\nPressionada pelo prazo, ela abriu uma ferramenta de IA gratuita, com sua conta pessoal, e colou a planilha completa: nomes, cargos, salários, notas, comentários dos gestores e anotações sobre licenças médicas de alguns colaboradores. O resumo saiu em minutos e ficou muito bom.\n\nDias depois, ao comentar com a gestora como tinha conseguido entregar tão rápido, a situação veio à tona. A empresa não tinha ferramenta de IA aprovada nem política de uso. A gestora acionou a TI e a encarregada de dados, que avaliaram o caso: dados pessoais e sensíveis (saúde) tinham sido enviados a um serviço sem contrato com a empresa, cujos termos permitiam o uso das conversas para melhorar os modelos, salvo configuração em contrário.\n\nA encarregada de dados orientou o registro do incidente e a avaliação de riscos para decidir sobre eventuais comunicações. A analista apagou o histórico e revisou as configurações da conta, mas a empresa entendeu que o problema era maior do que um erro individual: faltavam regras, ferramenta aprovada e treinamento.\n\nA mesma tarefa poderia ter sido feita com segurança: com dados anonimizados (\"Colaborador 1\", sem salários nem informações de saúde), numa ferramenta corporativa e com os resultados recompostos fora dela.\n\nPerguntas para discussão:\n\n1. Quais dados da planilha estão no semáforo vermelho? Quais poderiam ser usados de forma anonimizada?\n\n2. Quais princípios da LGPD foram desrespeitados e quais providências a empresa deve tomar agora?\n\n3. Como uma política de uso de duas páginas e uma ferramenta corporativa teriam mudado a decisão da analista?"
        },
        {
          "title": "Atividade prática: Regras de segurança da equipe",
          "type": "pratica",
          "duration": "2h",
          "summary": "Monte o semáforo de dados da sua equipe: liste os tipos de informação que vocês manipulam, classifique cada um em verde, amarelo ou vermelho e indique em qual ferramenta pode ser usado. Depois reescreva três pedidos reais anonimizando os dados e crie um checklist de cinco perguntas para usar antes de cada uso de IA. Entrega: semáforo, três pedidos anonimizados e checklist.",
          "practiceTool": "Google Docs",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Qual destas informações NUNCA deve ser colocada em uma ferramenta de IA, em nenhuma circunstância?",
          "options": [
            "O texto público do site da empresa.",
            "Um modelo de e-mail sem dados de clientes.",
            "Senhas e chaves de acesso.",
            "Uma lista de ideias para um evento interno."
          ],
          "correctIndex": 2,
          "explanation": "Senhas e chaves de acesso nunca vão para nenhuma ferramenta de IA (aula 3.1)."
        },
        {
          "prompt": "Segundo a LGPD, o que é um dado pessoal sensível?",
          "options": [
            "Qualquer dado guardado em planilha.",
            "Dados de saúde, origem racial ou étnica, religião, opinião política, filiação sindical, vida sexual, genética e biometria.",
            "Apenas o número do CPF.",
            "Dados de empresas, como o CNPJ."
          ],
          "correctIndex": 1,
          "explanation": "Dados sensíveis recebem proteção reforçada porque seu vazamento pode gerar discriminação (aula 3.2)."
        },
        {
          "prompt": "No semáforo de dados, uma proposta comercial com nome do cliente costuma ser classificada como:",
          "options": [
            "Verde: pode ir para qualquer ferramenta.",
            "Amarelo: só na ferramenta corporativa, se a política permitir, de preferência anonimizada.",
            "Não precisa de classificação.",
            "Vermelho em qualquer empresa, sem exceção."
          ],
          "correctIndex": 1,
          "explanation": "Informação confidencial fica no amarelo (aula 3.3); cada equipe ajusta o semáforo à sua realidade e, na dúvida, escolhe a cor mais restritiva."
        },
        {
          "prompt": "Qual é a forma mais eficaz de lidar com o uso escondido de IA (shadow AI) na equipe?",
          "options": [
            "Proibir qualquer uso e punir quem for descoberto.",
            "Fingir que não acontece.",
            "Conversar sem punição, oferecer uma ferramenta aprovada, publicar regras claras e treinar a equipe.",
            "Pedir que cada pessoa use a ferramenta que preferir, com conta pessoal."
          ],
          "correctIndex": 2,
          "explanation": "Aula 3.5: proibir sem alternativa empurra o uso para a sombra; o caminho oficial precisa ser mais fácil que o escondido."
        },
        {
          "prompt": "O que o PL 2338/2023 e o AI Act europeu têm em comum?",
          "options": [
            "Proíbem o uso de IA generativa em empresas.",
            "Organizam as obrigações de acordo com o nível de risco do uso de IA.",
            "Valem apenas para empresas de tecnologia.",
            "Substituem a LGPD."
          ],
          "correctIndex": 1,
          "explanation": "Ambos seguem uma lógica por risco (aula 3.6). A LGPD continua valendo para dados pessoais usados com IA. Conferir o estado do PL na data da turma."
        }
      ]
    },
    {
      "id": "modulo-4",
      "title": "IA generativa por área",
      "subtitle": "Competência: aplicar IA generativa às tarefas da própria área",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Textos e e-mails que soam como você",
          "type": "video",
          "duration": "9min",
          "summary": "Quatro usos para textos e e-mails (rascunhar, reescrever, ajustar o tom e resumir) e a técnica de pedir que a IA descreva o seu estilo de escrita a partir de exemplos, para manter a própria voz.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Reuniões e atas: da conversa às decisões",
          "type": "video",
          "duration": "10min",
          "summary": "Cuidados com gravação e transcrição automática (aviso aos participantes, reuniões sensíveis, revisão) e o pedido-modelo que transforma uma conversa em ata com decisões, tarefas com responsável e prazo, e pendências.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Planilhas e números com IA, sem decorar fórmula",
          "type": "video",
          "duration": "11min",
          "summary": "Pedir fórmulas e explicações em vez de resultados, fazer análises em linguagem natural e conferir sempre os números: totais, caminho do cálculo e porcentagens suspeitas.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Apresentações e pesquisa com fontes",
          "type": "video",
          "duration": "10min",
          "summary": "Do roteiro aos slides com títulos que afirmam, notas e perguntas prováveis da plateia; pesquisa com fontes citadas e o hábito de abrir cada link antes de usar um número ou afirmação.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Atendimento, vendas e marketing",
          "type": "video",
          "duration": "11min",
          "summary": "Usos no SAC (Serviço de Atendimento ao Consumidor), em vendas e no CRM (sistema de gestão do relacionamento com clientes) e no marketing, com a regra de que nenhuma promessa sai da ferramenta, só da política.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "RH, jurídico e financeiro: usos de alto cuidado",
          "type": "video",
          "duration": "12min",
          "summary": "Usos produtivos, usos com cuidado e o que nunca delegar em RH, jurídico e financeiro, incluindo o alerta sobre golpes com voz e vídeo falsos gerados por IA.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: Atas ótimas, relatório errado",
          "type": "leitura",
          "duration": "30min",
          "summary": "O administrativo de uma construtora testa a IA em três tarefas e obtém resultados muito diferentes.",
          "content": "O setor administrativo de uma construtora de médio porte, com cinco obras em andamento, gasta segundo a coordenadora cerca de um dia por semana em três tarefas: atas das reuniões semanais de obra, relatórios de andamento para a diretoria e respostas a fornecedores sobre pagamentos e entregas.\n\nCom a ferramenta corporativa liberada, a coordenadora testou a IA nas três. As atas ficaram ótimas: a partir das anotações digitadas na reunião, saíam decisões, tarefas com responsável e pendências em minutos, com \"A DEFINIR\" onde faltava informação.\n\nOs relatórios de andamento trouxeram um problema: num deles, o percentual de execução de uma obra apareceu como 78%, quando a planilha dizia 68%. A IA tinha somado duas linhas erradas. O erro só foi visto porque o engenheiro responsável estranhou o número antes da reunião.\n\nAs respostas a fornecedores saíram corretas, mas soavam robóticas e formais demais para um relacionamento de anos. Dois fornecedores chegaram a perguntar se a construtora tinha mudado de equipe.\n\nA coordenadora concluiu que a IA não era boa ou ruim em geral: cada tarefa pedia um pedido diferente e um tipo de revisão diferente.\n\nPerguntas para discussão:\n\n1. Por que a mesma ferramenta funcionou tão bem nas atas e falhou nos relatórios? O que muda no tipo de revisão?\n\n2. Como você reescreveria o pedido dos relatórios para reduzir o risco de erro nos números?\n\n3. Que técnica das aulas resolveria o tom robótico das respostas aos fornecedores?"
        },
        {
          "title": "Atividade prática: Casos de uso testados antes e depois",
          "type": "pratica",
          "duration": "2h",
          "summary": "Escolha três tarefas reais da sua área e execute cada uma duas vezes: do jeito habitual e com IA generativa, usando prompts da biblioteca e as regras de segurança. Para cada tarefa, registre tempo gasto, qualidade percebida (nota de 1 a 5) e o que precisou ser corrigido. Entrega: três fichas de teste com o comparativo antes e depois.",
          "practiceTool": "Google Sheets",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Qual é a melhor forma de fazer a IA escrever e-mails com a sua voz?",
          "options": [
            "Pedir \"escreva como eu\" sem mais informações.",
            "Mostrar exemplos de e-mails seus e pedir que a IA descreva seu estilo, usando essa descrição nos pedidos.",
            "Usar sempre o tom mais formal possível.",
            "Não revisar o texto para manter a espontaneidade."
          ],
          "correctIndex": 1,
          "explanation": "Exemplos reais do seu jeito de escrever são o atalho mais eficaz (aula 4.1)."
        },
        {
          "prompt": "Antes de gravar ou transcrever uma reunião com IA, o que é indispensável?",
          "options": [
            "Nada: a transcrição é automática.",
            "Avisar os participantes e seguir a política da empresa, evitando gravar reuniões sensíveis.",
            "Pedir que ninguém fale durante a reunião.",
            "Desligar as câmeras."
          ],
          "correctIndex": 1,
          "explanation": "Voz e falas são dados pessoais; aviso e política da empresa vêm primeiro (aula 4.2)."
        },
        {
          "prompt": "Em planilhas, qual uso da IA é o mais seguro?",
          "options": [
            "Pedir o resultado final e copiar sem conferir.",
            "Pedir a fórmula e a explicação, aplicar na planilha e conferir os totais.",
            "Colar a planilha de salários na versão gratuita.",
            "Deixar a IA alterar a planilha oficial sem revisão."
          ],
          "correctIndex": 1,
          "explanation": "Aula 4.3: quando a planilha faz a conta, o risco de erro de soma cai; a IA ajuda a montar e explicar."
        },
        {
          "prompt": "Um assistente de atendimento sugeriu oferecer um desconto que não está previsto na política. O que fazer?",
          "options": [
            "Enviar, pois a IA sabe o que é melhor para o cliente.",
            "Corrigir: promessas e condições vêm da política aprovada, não da ferramenta.",
            "Oferecer o dobro do desconto para garantir a venda.",
            "Desligar o assistente para sempre."
          ],
          "correctIndex": 1,
          "explanation": "Regra da aula 4.5: nenhuma promessa sai da ferramenta, só da política, e nada vai ao cliente sem revisão humana."
        },
        {
          "prompt": "No RH, qual destes usos NUNCA deve ser delegado à IA generativa?",
          "options": [
            "Rascunhar uma descrição de vaga com linguagem inclusiva.",
            "Montar um roteiro de entrevista por competências.",
            "Decidir quem será contratado ou desligado.",
            "Rascunhar um comunicado interno."
          ],
          "correctIndex": 2,
          "explanation": "Decisões sobre pessoas continuam humanas (aula 4.6); a IA pode apoiar com textos e organização."
        }
      ]
    },
    {
      "id": "modulo-5",
      "title": "Do uso individual ao fluxo de trabalho",
      "subtitle": "Competência: redesenhar fluxos de trabalho com IA generativa, sem programação",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Da tarefa ao fluxo: onde está o ganho de verdade",
          "type": "video",
          "duration": "9min",
          "summary": "A diferença entre tarefa e fluxo de trabalho, por que o tempo se perde nas esperas e nos retrabalhos, e os três papéis da IA num fluxo: rascunhar, organizar e conferir, com a decisão nas mãos de uma pessoa.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Mapear e redesenhar um fluxo de trabalho",
          "type": "video",
          "duration": "10min",
          "summary": "Como mapear o fluxo real com post-its, marcar esperas e desvios, redesenhar com IA (eliminando antes de automatizar) e definir os pontos obrigatórios de revisão humana.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Automações simples sem código",
          "type": "video",
          "duration": "11min",
          "summary": "A lógica gatilho, ação e revisão; o que é uma API (a porta que permite a um sistema conversar com outro); onde montar automações sem código e como começar pequeno, com aprovação da TI.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Assistentes personalizados para a equipe",
          "type": "video",
          "duration": "10min",
          "summary": "As cinco perguntas para planejar um assistente, como escrever as instruções, testar com casos fáceis, difíceis e de recusa, e como compartilhar e manter o assistente atualizado.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Conversar com os documentos da empresa: bases de conhecimento e RAG",
          "type": "video",
          "duration": "11min",
          "summary": "Como funciona a geração aumentada por recuperação (RAG) sem matemática: recuperar, aumentar e gerar. Onde isso já existe e o que faz uma base dar certo: documentos oficiais, permissões corretas e citação da fonte.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Agentes de IA: o que são, o que já fazem e onde ter cuidado",
          "type": "video",
          "duration": "12min",
          "summary": "O que diferencia um agente de um assistente, como os agentes se conectam a outras ferramentas (conectores e o protocolo MCP) e as cinco regras de segurança: mínimo acesso, confirmação humana, registro, começar pequeno e responsabilidade de uma pessoa.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: Duzentos e-mails de fornecedores por semana",
          "type": "leitura",
          "duration": "30min",
          "summary": "O time de compras de uma rede de supermercados redesenha o fluxo de e-mails de fornecedores com automação, IA e revisão humana.",
          "content": "O time de compras de uma rede de supermercados regional, com seis compradores, recebe cerca de 200 e-mails de fornecedores por semana: cotações, avisos de atraso, mudanças de preço e dúvidas sobre pedidos. Cada comprador lia os e-mails, copiava os dados principais para uma planilha de acompanhamento e respondia.\n\nO mapeamento do fluxo mostrou que a cópia manual tomava a maior parte do tempo e que avisos de atraso às vezes ficavam dias sem ser vistos, porque se perdiam no meio das cotações. Quando um comprador saía de férias, ninguém sabia o que estava pendente na caixa dele.\n\nCom a TI, a equipe redesenhou o fluxo. Os e-mails passaram a chegar a uma caixa compartilhada. Uma automação aciona a IA para classificar cada e-mail (cotação, atraso, preço, dúvida) e extrair fornecedor, produto, quantidade, prazo e valor para a planilha. Avisos de atraso geram um alerta imediato para o comprador responsável.\n\nUm ponto de revisão humana foi definido: nenhuma resposta sai para o fornecedor sem que um comprador confira os dados extraídos e aprove o texto rascunhado pela IA. A equipe também combinou que mudanças de preço acima de um limite precisam de aprovação da gerente.\n\nNas primeiras semanas, a revisão encontrou erros de extração em e-mails com tabelas em anexo, o que levou a ajustes no pedido e a uma regra: anexos complexos são lidos por uma pessoa.\n\nPerguntas para discussão:\n\n1. Quais são os riscos do novo fluxo (dados, erros de extração, dependência) e onde estão os pontos de controle?\n\n2. Que etapas do fluxo antigo deveriam ser eliminadas, e não apenas automatizadas?\n\n3. Que indicadores você usaria para saber se o redesenho realmente funcionou?"
        },
        {
          "title": "Atividade prática: Três fluxos de trabalho redesenhados",
          "type": "pratica",
          "duration": "2h",
          "summary": "Em grupo, escolham três fluxos de trabalho da equipe. Desenhem o fluxo atual, marquem esperas, retrabalhos e os pontos onde a IA pode rascunhar, organizar ou conferir, e montem a versão redesenhada com os prompts e, quando fizer sentido, um assistente ou uma automação simples. Testem cada fluxo ao menos uma vez com dados de exemplo. Entrega: os três fluxos antes e depois, com os pontos de revisão humana.",
          "practiceTool": "Miro",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Por que o maior ganho com IA costuma aparecer ao olhar o fluxo inteiro, e não só uma tarefa?",
          "options": [
            "Porque fluxos não têm pessoas envolvidas.",
            "Porque boa parte do tempo se perde em esperas, idas e vindas e retrabalho entre etapas.",
            "Porque a IA só funciona em fluxos com mais de dez etapas.",
            "Porque tarefas isoladas não podem usar IA."
          ],
          "correctIndex": 1,
          "explanation": "Aula 5.1: escrever rápido não adianta se o trabalho fica parado esperando; o ganho real está nas passagens."
        },
        {
          "prompt": "Qual princípio deve vir antes de automatizar uma etapa?",
          "options": [
            "Automatizar tudo o que for possível, sem análise.",
            "Eliminar as etapas que não agregam valor.",
            "Contratar uma nova ferramenta.",
            "Retirar todos os pontos de revisão humana."
          ],
          "correctIndex": 1,
          "explanation": "Elimine antes de automatizar (aula 5.2): automatizar uma etapa inútil só torna o desperdício mais rápido."
        },
        {
          "prompt": "O que é uma API?",
          "options": [
            "Um tipo de assistente de IA que escreve e-mails.",
            "A interface que permite a um sistema pedir ou enviar informações a outro.",
            "Uma lei sobre proteção de dados.",
            "Um modelo de planilha."
          ],
          "correctIndex": 1,
          "explanation": "API (Application Programming Interface) é a porta padronizada pela qual os sistemas conversam; as ferramentas sem código usam essas portas para você (aula 5.3)."
        },
        {
          "prompt": "Na técnica RAG, de onde vem a informação usada na resposta?",
          "options": [
            "Exclusivamente da memória do modelo.",
            "De trechos dos documentos da empresa recuperados no momento da pergunta.",
            "De uma pesquisa aleatória na internet.",
            "Da opinião do usuário."
          ],
          "correctIndex": 1,
          "explanation": "Aula 5.5: recuperar, aumentar e gerar. A resposta se apoia nos documentos oficiais, idealmente com citação da fonte."
        },
        {
          "prompt": "Qual regra de segurança é essencial ao usar agentes de IA?",
          "options": [
            "Dar ao agente acesso total a todos os sistemas para ele trabalhar melhor.",
            "Exigir confirmação humana antes de ações irreversíveis ou externas, como enviar, pagar ou apagar.",
            "Deixar o agente agir sem registro para economizar espaço.",
            "Aceitar instruções de qualquer site que o agente visitar."
          ],
          "correctIndex": 1,
          "explanation": "Aula 5.6: mínimo acesso, confirmação humana, registro e responsabilidade de uma pessoa."
        }
      ]
    },
    {
      "id": "modulo-6",
      "title": "Medir e escalar na equipe",
      "subtitle": "Competência: medir resultados e escalar o uso de IA na equipe",
      "duration": "6h",
      "free": false,
      "lessons": [
        {
          "title": "Por onde começar: casos de uso priorizados",
          "type": "video",
          "duration": "10min",
          "summary": "Como montar o inventário de casos de uso da equipe e priorizá-los com notas de valor, esforço e risco, escolhendo de três a cinco casos para os próximos 90 dias.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Medir o ganho: tempo e qualidade antes e depois",
          "type": "video",
          "duration": "11min",
          "summary": "Linha de base, medição do depois incluindo o tempo de revisão, ganho de qualidade e o ROI (retorno sobre o investimento) em linguagem simples, com honestidade sobre o que não funcionou.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "O guia de IA da equipe",
          "type": "video",
          "duration": "10min",
          "summary": "O que vai no Guia de IA da equipe (ferramentas, regras, prompts, fluxos, medição e pessoas), como mantê-lo curto e fácil de usar e como revisá-lo a cada trimestre.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "O papel do líder e os campeões de IA",
          "type": "video",
          "duration": "10min",
          "summary": "Os comportamentos do líder que destravam a adoção (usar e contar, dar tempo, combinar o uso do tempo liberado) e como organizar a rede de campeões de IA.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Gestão da mudança e medos legítimos",
          "type": "video",
          "duration": "11min",
          "summary": "Os quatro medos mais comuns (emprego, erro, desatualização, vigilância), como conduzir conversas honestas com combinados por escrito e como construir segurança psicológica.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Escalar com responsabilidade",
          "type": "video",
          "duration": "12min",
          "summary": "Rituais que mantêm o uso vivo, registro e aprendizado com incidentes e quando envolver TI, jurídico, encarregado de dados, comitê de IA e diretoria. A aula fecha o programa.",
          "videoUrl": null,
          "slidesUrl": null
        },
        {
          "title": "Estudo de caso: Treinados, mas sem usar",
          "type": "leitura",
          "duration": "30min",
          "summary": "A área financeira de uma empresa de logística treina a equipe, mas a adoção trava por medos, falta de exemplos e ausência de medição.",
          "content": "A área financeira de uma empresa de logística, com 16 pessoas, participou de um treinamento de um dia sobre IA generativa e recebeu licenças da ferramenta corporativa. Três meses depois, um levantamento mostrou que só duas pessoas usavam a ferramenta com frequência.\n\nO gerente convocou uma conversa aberta e, depois de algum silêncio, os motivos apareceram. Uma analista disse temer que, se ganhasse tempo, a vaga dela seria cortada. Outro contou que tentou usar, a resposta veio errada e ele desistiu. Vários disseram não saber em que tarefas a ferramenta poderia ajudar. E ninguém sabia se as duas pessoas que usavam estavam de fato ganhando tempo.\n\nO gerente reconheceu que o treinamento tinha ensinado a ferramenta, mas não tinha cuidado da mudança. Não havia casos de uso priorizados, exemplos práticos da área, medição nem combinados sobre o que fazer com o tempo liberado.\n\nCom a equipe, ele montou um plano: três casos de uso priorizados (conciliação de extratos, explicação do relatório mensal de custos aos gestores e rascunho de e-mails de cobrança), uma analista como campeã de IA com horas reservadas, medição antes e depois e um combinado escrito, validado com a diretoria, de que o tempo liberado iria para análise de custos e não para cortes.\n\nOs rituais combinados foram uma troca quinzenal de práticas e uma revisão mensal dos indicadores.\n\nPerguntas para discussão:\n\n1. Quais medos aparecem no caso e qual resposta honesta a liderança pode dar a cada um?\n\n2. Os três casos de uso escolhidos fazem sentido na matriz valor, esforço e risco? Você mudaria algum?\n\n3. Que indicadores você usaria para medir os três casos, e qual seria a linha de base de cada um?"
        },
        {
          "title": "Atividade prática: Plano de medição e adoção da equipe",
          "type": "pratica",
          "duration": "2h",
          "summary": "Priorize os casos de uso da equipe na matriz valor, esforço e risco; defina a linha de base e os indicadores de dois deles; e escreva o plano de adoção com campeões, rituais, combinados da liderança e calendário de 90 dias. Entrega: o plano de medição e adoção, que fecha o Guia de IA Generativa da equipe.",
          "practiceTool": "Google Sheets",
          "practiceUrl": null
        }
      ],
      "quiz": [
        {
          "prompt": "Por quais casos de uso a equipe deve começar?",
          "options": [
            "Pelos de maior risco, para mostrar coragem.",
            "Pelos de valor alto, esforço baixo e risco baixo.",
            "Por todos ao mesmo tempo.",
            "Pelos que envolvem dados sensíveis."
          ],
          "correctIndex": 1,
          "explanation": "Aula 6.1: vitórias rápidas e seguras criam confiança; casos de alto risco entram depois, com aprovação das áreas envolvidas."
        },
        {
          "prompt": "Ao medir o tempo de uma tarefa feita com IA, o que deve entrar no \"depois\"?",
          "options": [
            "Só o tempo que a IA levou para responder.",
            "O tempo total, incluindo o pedido, a revisão e os ajustes.",
            "Nada: basta a percepção da equipe.",
            "Apenas o tempo da primeira tentativa."
          ],
          "correctIndex": 1,
          "explanation": "A revisão faz parte do trabalho (aula 6.2); medir sem ela superestima o ganho."
        },
        {
          "prompt": "O que caracteriza um bom Guia de IA da equipe?",
          "options": [
            "Ter mais de cem páginas.",
            "Ser curto, com uma página de resumo, ficar onde a equipe trabalha e ser revisado periodicamente.",
            "Ser escrito uma vez e nunca mais alterado.",
            "Ficar guardado apenas com o gestor."
          ],
          "correctIndex": 1,
          "explanation": "Aula 6.3: guia que ninguém lê é enfeite; curto, acessível e vivo é o que funciona."
        },
        {
          "prompt": "Qual é o papel de um campeão de IA na equipe?",
          "options": [
            "Fiscalizar e punir quem usa errado.",
            "Ser o único autorizado a usar IA.",
            "Ajudar colegas no dia a dia, cuidar da biblioteca de prompts e levar problemas e boas ideias à liderança.",
            "Substituir a TI na aprovação de ferramentas."
          ],
          "correctIndex": 2,
          "explanation": "Campeões são colegas curiosos e respeitados, com tempo reservado, e não fiscais nem especialistas em tecnologia (aula 6.4)."
        },
        {
          "prompt": "Diante do medo \"se eu ganhar tempo, vão cortar minha vaga\", qual atitude da liderança constrói confiança?",
          "options": [
            "Dizer que nada vai mudar, nunca.",
            "Ignorar o assunto.",
            "Conversar com honestidade e firmar combinados claros sobre o uso do tempo liberado e o desenvolvimento das pessoas.",
            "Usar as medições de tempo para avaliar cada pessoa individualmente."
          ],
          "correctIndex": 2,
          "explanation": "Aula 6.5: medos legítimos pedem resposta honesta e combinados por escrito; promessas vazias destroem a confiança."
        }
      ]
    }
  ],
  "library": [
    {
      "title": "Mapa de tarefas da equipe",
      "description": "Planilha-modelo para classificar tarefas em: a IA ajuda muito, ajuda com revisão, não usar.",
      "tool": "Google Sheets",
      "url": null
    },
    {
      "title": "Cartão \"receita do bom pedido\"",
      "description": "Os cinco ingredientes do prompt (contexto, papel, tarefa, formato, tom) em uma página.",
      "tool": "PDF",
      "url": null
    },
    {
      "title": "Ficha da biblioteca de prompts",
      "description": "Modelo de ficha com nome, objetivo, prompt, exemplo de resposta, cuidados, responsável e data de revisão.",
      "tool": "Google Docs",
      "url": null
    },
    {
      "title": "30 prompts de partida para o escritório",
      "description": "Modelos com lacunas para tarefas comuns de cada área, prontos para adaptar.",
      "tool": "Google Docs",
      "url": null
    },
    {
      "title": "Semáforo de dados e checklist \"antes de colar\"",
      "description": "Modelo de classificação verde, amarelo e vermelho e as cinco perguntas a fazer antes de usar IA.",
      "tool": "Google Docs",
      "url": null
    },
    {
      "title": "Modelo de política de uso de IA generativa",
      "description": "Política de duas páginas para adaptar com o jurídico, a TI e o encarregado de dados.",
      "tool": "Google Docs",
      "url": null
    },
    {
      "title": "Ficha de teste antes e depois",
      "description": "Registro de tempo, qualidade e correções de cada caso de uso testado.",
      "tool": "Google Sheets",
      "url": null
    },
    {
      "title": "Mapa de fluxo antes e depois",
      "description": "Quadro para mapear fluxos de trabalho, marcar esperas e pontos de revisão humana.",
      "tool": "Miro",
      "url": null
    },
    {
      "title": "Planilha de priorização e medição",
      "description": "Matriz valor, esforço e risco e cálculo de horas ganhas com linha de base.",
      "tool": "Google Sheets",
      "url": null
    },
    {
      "title": "Modelo do Guia de IA Generativa da equipe",
      "description": "Estrutura do projeto aplicado: ferramentas, regras, prompts, fluxos, medição e pessoas.",
      "tool": "Google Docs",
      "url": null
    }
  ],
  "nextSteps": [
    {
      "title": "Leve este programa para sua empresa",
      "description": "Turma fechada, adaptada às ferramentas e ao setor da sua empresa, com encontros ao vivo para equipes e gestores; investimento sob proposta.",
      "href": "/giselle/palestras?src=curso&c=ia-generativa-no-trabalho#proposta",
      "label": "Solicitar proposta"
    },
    {
      "title": "Diagnóstico de maturidade em IA",
      "description": "Descubra em poucos minutos em que estágio sua empresa está no uso de IA e por onde vale começar.",
      "href": "/diagnostico-ia?src=curso&c=ia-generativa-no-trabalho",
      "label": "Fazer o diagnóstico"
    }
  ]
};
