import type { Course } from "./types";

// Gerado a partir do material pedagógico em docs/cursos/analise-dados-estrategica/
// Edite videoUrl / slidesUrl / practiceUrl conforme grava e publica os materiais.

export const analiseDadosEstrategica: Course = {
  "slug": "analise-dados-estrategica",
  "title": "Análise de Dados para Decisões Estratégicas",
  "level": "Iniciante",
  "hours": "30h",
  "free": true,
  "tagline": "Transforme dados abertos em decisões estratégicas usando só o navegador — do Sheets ao dashboard.",
  "description": "Curso prático de 30 horas desenvolvido para agentes públicos e profissionais que precisam transformar dados em decisões. Baseado em problemas reais da gestão pública paulistana, utilizando dados abertos da cidade de São Paulo e ferramentas gratuitas acessíveis pelo navegador (Google Sheets, Colab, BigQuery, Looker Studio e NotebookLM).",
  "outcomes": [
    "Localizar e avaliar bases de dados abertas (Portal de Dados Abertos de SP, GeoSampa, dados.gov.br, Base dos Dados) relevantes para o seu contexto de trabalho",
    "Limpar e organizar dados reais no Google Sheets e no Google Colab, documentando as decisões de tratamento",
    "Resumir e interpretar dados com estatística descritiva, evitando armadilhas clássicas como média enganosa e correlação sem causalidade",
    "Consultar grandes volumes de dados com SQL básico no BigQuery sandbox",
    "Construir dashboards executivos no Looker Studio que respondem perguntas de gestão com clareza",
    "Comunicar recomendações estratégicas fundamentadas em dados, usando IA generativa (NotebookLM) como copilota, com responsabilidade e atenção à LGPD"
  ],
  "audience": "Agentes públicos (com foco na gestão municipal paulistana) e profissionais de qualquer setor que precisam transformar dados em decisões — analistas, assessores, coordenadores e equipes de planejamento. Não é preciso nenhuma experiência prévia em programação, estatística ou BI.",
  "prerequisites": "Nenhum conhecimento prévio: basta uma conta Google gratuita, um navegador atualizado e familiaridade básica com computador.",
  "status": "disponivel",
  "modules": [
    {
      "id": "modulo-1",
      "title": "Pensar com dados: fundamentos e dados abertos",
      "duration": "4h",
      "free": true,
      "lessons": [
        {
          "title": "Da intuição à evidência: por que decisões precisam de dados",
          "type": "video",
          "duration": "18min",
          "summary": "A partir do caso das equipes de zeladoria distribuídas sem olhar os chamados do SP156, a aula mostra o custo de decidir no escuro e apresenta o ciclo dado → informação → conhecimento → decisão. Diferencia decisões operacionais, táticas e estratégicas e apresenta a caixa de ferramentas 100% gratuita e no navegador que será usada no curso."
        },
        {
          "title": "O mapa do tesouro: dados abertos de São Paulo e do Brasil",
          "type": "leitura",
          "duration": "45min",
          "summary": "Tour guiado pelos portais de dados abertos: Portal de Dados Abertos da Prefeitura de SP, GeoSampa, ObservaSampa, dados.gov.br, Base dos Dados e InfoSiga SP, com a base legal da transparência (LAI). Ensina os formatos mais comuns (CSV, XLSX, GeoJSON, API) e um checklist de 5 critérios para avaliar a qualidade de um dataset. Fecha com a atividade de localizar 3 datasets do próprio tema de trabalho."
        },
        {
          "title": "Anatomia de um dataset: linhas, colunas, tipos e armadilhas",
          "type": "video",
          "duration": "22min",
          "summary": "Estrutura de uma tabela de dados: observações, variáveis e granularidade, mais a classificação de colunas em numéricas, categóricas, datas, texto livre e geográficas. Apresenta o dicionário de dados e as seis armadilhas clássicas dos dados públicos brasileiros: faltantes, duplicatas, datas mistas, encoding, separador e unidades. Termina com o ritual das 5 perguntas de qualidade."
        },
        {
          "title": "Sua primeira análise em Python: os chamados do SP156 no Colab",
          "type": "pratica",
          "duration": "2h",
          "summary": "Primeira análise em Python no Google Colab, sem instalar nada, com o notebook starter do curso e uma amostra no formato do dataset real Dados do SP156 (dados.prefeitura.sp.gov.br). O aluno executa células comentadas de carga, inspeção (head, shape, info), agregação (value_counts, groupby) e gráfico de barras, e fecha completando um desafio com TODOs e escrevendo duas frases de recomendação para o gestor.",
          "practiceTool": "Colab",
          "practiceUrl": "https://colab.research.google.com/github/giselleCouto/giselle-falcao-portfolio/blob/main/client/public/cursos/notebooks/analise-dados-estrategica-pratica-modulo1.ipynb"
        },
        {
          "title": "Quiz do Módulo 1 — Fundamentos e dados abertos",
          "type": "quiz",
          "duration": "15min",
          "summary": "Cinco questões objetivas com explicação comentada sobre decisão orientada por dados, portais de dados abertos, anatomia de dataset e o papel do Colab. Correção automática, duas tentativas, nota mínima de 70%."
        }
      ],
      "quiz": [
        {
          "prompt": "O que melhor caracteriza uma decisão orientada por dados?",
          "options": [
            "Substituir totalmente a experiência do gestor por relatórios automáticos.",
            "Combinar a experiência de quem decide com evidências extraídas dos dados.",
            "Só decidir quando houver dados perfeitos e completos."
          ],
          "correctIndex": 1,
          "explanation": "Dados disciplinam a intuição, não a substituem — e dados perfeitos não existem; decide-se com a melhor evidência disponível."
        },
        {
          "prompt": "Você precisa de camadas de mapa da cidade de São Paulo (equipamentos públicos, zoneamento, ciclovias). Qual portal é a fonte mais direta?",
          "options": [
            "GeoSampa.",
            "dados.gov.br.",
            "NotebookLM."
          ],
          "correctIndex": 0,
          "explanation": "O GeoSampa é o mapa digital oficial da cidade, com camadas geográficas para download. O dados.gov.br é um catálogo geral, e o NotebookLM é uma ferramenta de IA, não uma fonte de dados."
        },
        {
          "prompt": "Em uma tabela organizada (tidy), cada linha representa:",
          "options": [
            "Uma variável do fenômeno estudado.",
            "Uma observação (um registro, como um chamado do 156).",
            "Um gráfico da análise."
          ],
          "correctIndex": 1,
          "explanation": "Linhas são observações; colunas são variáveis. No SP156, cada linha é um chamado."
        },
        {
          "prompt": "Você abre um CSV e a coluna de datas mistura \"05/03/2026\" e \"2026-03-05\". Qual o primeiro passo correto?",
          "options": [
            "Excluir as linhas com o formato menos frequente.",
            "Padronizar o formato das datas antes de qualquer análise.",
            "Calcular a média das datas para preencher os valores."
          ],
          "correctIndex": 1,
          "explanation": "Formatos mistos fazem o computador tratar a mesma data como textos diferentes. Padronizar preserva os dados; excluir joga informação fora."
        },
        {
          "prompt": "Por que este curso usa o Google Colab nas práticas de Python?",
          "options": [
            "Porque ele roda Python no navegador, sem instalar nada no computador.",
            "Porque é a única forma que existe de executar Python.",
            "Porque ele dispensa a necessidade de entender os dados."
          ],
          "correctIndex": 0,
          "explanation": "O Colab é um ambiente gratuito de notebooks no navegador — perfeito para a proposta \"zero instalação\". Python roda em muitos outros lugares, e nenhuma ferramenta dispensa o entendimento dos dados."
        }
      ]
    },
    {
      "id": "modulo-2",
      "title": "Google Sheets: da planilha bruta à primeira resposta",
      "duration": "4h30",
      "free": true,
      "lessons": [
        {
          "title": "Dado bruto não responde: limpeza e organização no Google Sheets",
          "type": "video",
          "duration": "20min",
          "summary": "Como importar um CSV no Sheets conferindo separador e codificação, e o padrão profissional de três abas (dados-brutos, trabalho, saída) que protege o dado original. Apresenta a faxina essencial em quatro movimentos — duplicatas, vazios, textos e datas —, as colunas derivadas e o diário de limpeza que torna cada tratamento auditável."
        },
        {
          "title": "Faxina de dados: preparando os chamados do SP156 no Sheets",
          "type": "pratica",
          "duration": "1h30",
          "summary": "Aplicação guiada do protocolo de limpeza sobre uma amostra real de ~2.000 chamados do SP156: importação, três abas, remoção de duplicatas, tratamento de vazios e textos, padronização de datas. O aluno cria as colunas derivadas mes e dias_para_resolucao e documenta cada decisão no diário de limpeza.",
          "practiceTool": "Google Sheets"
        },
        {
          "title": "Tabela dinâmica: a pergunta certa em três cliques",
          "type": "video",
          "duration": "22min",
          "summary": "A tabela dinâmica como máquina de agregação, seguindo a gramática universal \"calcule isto agrupado por aquilo\". Ensina os quatro quadrantes (linhas, valores, colunas, filtros), a escolha da função de resumo correta (contagem, soma ou média), o agrupamento por mês, a criação de gráficos e os erros clássicos — fechando com o teste do total."
        },
        {
          "title": "Onde a cidade mais reclama? Da tabela dinâmica à resposta executiva",
          "type": "pratica",
          "duration": "1h50",
          "summary": "Três perguntas de gestão respondidas com três tabelas dinâmicas sobre a base limpa: distritos com mais chamados, serviços com maior tempo médio de resolução e evolução mensal do volume. O aluno cria gráficos de barras e de linhas e fecha redigindo um sumário executivo de 5 linhas com número, ressalva honesta e recomendação acionável.",
          "practiceTool": "Google Sheets"
        },
        {
          "title": "Quiz do Módulo 2 — Google Sheets",
          "type": "quiz",
          "duration": "18min",
          "summary": "Cinco questões objetivas com explicação sobre o padrão de três abas, tratamento de vazios, funções de resumo em tabelas dinâmicas e escolha de gráficos. Correção automática, duas tentativas, nota mínima de 70%."
        }
      ],
      "quiz": [
        {
          "prompt": "Você acabou de baixar um CSV de um portal público. Qual é a atitude correta antes de começar a análise?",
          "options": [
            "Corrigir os erros diretamente no arquivo original para não esquecer depois.",
            "Manter o original intocado numa aba dados-brutos e limpar uma cópia na aba trabalho.",
            "Apagar todas as colunas que parecem inúteis para deixar o arquivo leve."
          ],
          "correctIndex": 1,
          "explanation": "O padrão de três abas protege o dado original — se a limpeza der errado, você recomeça em minutos. Editar o original destrói sua referência; apagar colunas cedo demais joga fora informação que a análise pode precisar."
        },
        {
          "prompt": "Na tabela dinâmica, para saber QUANTOS chamados cada distrito registrou, o campo de valores deve usar:",
          "options": [
            "SOMA de dias_para_resolucao.",
            "CONTAGEM (COUNTA) de uma coluna sempre preenchida, como id_chamado.",
            "MÉDIA de id_chamado."
          ],
          "correctIndex": 1,
          "explanation": "\"Quantos?\" pede contagem. Somar dias mistura volume com tempo, e média de um identificador não significa nada."
        },
        {
          "prompt": "O filtro mostra que a coluna distrito tem células vazias. Qual é a conduta mais profissional?",
          "options": [
            "Decidir um tratamento (ex.: preencher com \"NÃO INFORMADO\") e registrar a decisão no diário de limpeza.",
            "Excluir as linhas em silêncio — ninguém vai notar.",
            "Ignorar, porque células vazias não afetam tabelas dinâmicas."
          ],
          "correctIndex": 0,
          "explanation": "Não existe resposta única para vazios, mas existe resposta registrada. Exclusões silenciosas comprometem a auditabilidade, e vazios afetam sim as agregações por distrito."
        },
        {
          "prompt": "Para obter o tempo médio de resolução por distrito, a montagem correta da dinâmica é:",
          "options": [
            "Linhas: distrito · Valores: MÉDIA de dias_para_resolucao.",
            "Linhas: dias_para_resolucao · Valores: CONTAGEM de distrito.",
            "Filtros: distrito · Valores: SOMA de dias_para_resolucao."
          ],
          "correctIndex": 0,
          "explanation": "A gramática é \"calcule ISTO (média de dias) agrupado por AQUILO (distrito)\": o agrupador vai em linhas, a medida com a função certa vai em valores."
        },
        {
          "prompt": "Você precisa mostrar o ranking de chamados dos 20 distritos mais demandados. O gráfico mais adequado é:",
          "options": [
            "Pizza com 20 fatias, para mostrar as proporções.",
            "Barras ordenadas da maior para a menor.",
            "Linhas, para dar sensação de continuidade."
          ],
          "correctIndex": 1,
          "explanation": "Ranking de categorias pede barras ordenadas. Pizza com muitas fatias é ilegível, e gráfico de linhas sugere evolução temporal — que não é o caso."
        }
      ]
    },
    {
      "id": "modulo-3",
      "title": "Estatística para decidir (sem sofrimento)",
      "duration": "4h30",
      "free": true,
      "lessons": [
        {
          "title": "A média mente: centro, dispersão e distribuições para gestores",
          "type": "video",
          "duration": "20min",
          "summary": "Por que \"tempo médio de atendimento: 12 dias\" pode esconder metade dos casos resolvidos em 2 dias e outra metade em 22. Média, mediana, moda, desvio e percentis contados com exemplos do SP156 e de salários, com a regra prática: distribuição assimétrica pede mediana."
        },
        {
          "title": "Correlação não é causalidade: lições de políticas públicas",
          "type": "leitura",
          "duration": "45min",
          "summary": "Casos comentados em que correlação enganou gestores: variáveis de confusão, causalidade reversa e coincidências. Inclui um checklist de 4 perguntas antes de atribuir causa a um número e a discussão de como \"associado a\" vira \"causa\" no discurso público."
        },
        {
          "title": "Amostras, incerteza e o tamanho da dúvida",
          "type": "video",
          "duration": "22min",
          "summary": "Toda medição carrega incerteza: amostra versus população, viés de seleção (quem liga para o 156 não é a cidade inteira) e margem de erro em linguagem de gestor. Ensina a reportar números com honestidade sem paralisar a decisão."
        },
        {
          "title": "Estatística descritiva na prática: sinistros de trânsito de SP no Colab",
          "type": "pratica",
          "duration": "2h30",
          "summary": "Notebook guiado com dados do InfoSiga SP: distribuição de sinistros por mês, tipo e período do dia, média versus mediana na prática e percentis. Desafio final: identificar o recorte com a tendência mais preocupante e justificá-lo com dois números em um mini-relatório.",
          "practiceTool": "Colab"
        },
        {
          "title": "Quiz do Módulo 3 — Estatística para decisão",
          "type": "quiz",
          "duration": "15min",
          "summary": "Questões objetivas sobre média versus mediana, correlação versus causalidade e viés de amostra, com explicações comentadas. Correção automática e nota mínima de 70%."
        }
      ]
    },
    {
      "id": "modulo-4",
      "title": "SQL no navegador: BigQuery para perguntas grandes",
      "duration": "5h",
      "free": true,
      "lessons": [
        {
          "title": "SQL: a língua franca dos dados (e os 20% que resolvem 80%)",
          "type": "video",
          "duration": "18min",
          "summary": "O que é um banco de dados, por que SQL sobrevive há décadas e por que gestores que leem SQL conversam melhor com equipes técnicas. A anatomia de um SELECT lida em voz alta como uma frase em português."
        },
        {
          "title": "Primeiras consultas no BigQuery sandbox com a Base dos Dados",
          "type": "pratica",
          "duration": "1h40",
          "summary": "Criação do projeto no BigQuery sandbox (gratuito, sem cartão de crédito) e localização de tabelas públicas tratadas da Base dos Dados. Primeiras consultas com SELECT, WHERE, LIMIT e ORDER BY sobre dados brasileiros reais, com checkpoints de custo zero e leitura de bytes processados.",
          "practiceTool": "BigQuery sandbox"
        },
        {
          "title": "Agregar, filtrar, cruzar: GROUP BY e JOIN sem medo",
          "type": "video",
          "duration": "22min",
          "summary": "A mesma gramática da tabela dinâmica (\"calcule isto agrupado por aquilo\") escrita em SQL: GROUP BY, COUNT, AVG e HAVING. O JOIN é apresentado como o PROCV honesto: cruzar a tabela de fatos com tabelas de referência, como códigos e nomes de municípios."
        },
        {
          "title": "Três perguntas de gestão respondidas em SQL",
          "type": "pratica",
          "duration": "2h10",
          "summary": "Roteiro guiado com três perguntas de complexidade crescente sobre dados públicos de São Paulo na Base dos Dados, cada uma exigindo um degrau novo (WHERE, GROUP BY, JOIN). Fecha exportando um resultado para o Google Sheets — a ponte para o módulo de dashboards.",
          "practiceTool": "BigQuery sandbox"
        },
        {
          "title": "Quiz do Módulo 4 — SQL e BigQuery",
          "type": "quiz",
          "duration": "15min",
          "summary": "Questões de leitura e correção de consultas: prever o resultado de um GROUP BY, identificar o erro de um JOIN e escolher a cláusula certa para cada pergunta de gestão."
        }
      ]
    },
    {
      "id": "modulo-5",
      "title": "Dashboards que sustentam decisões: Looker Studio",
      "duration": "5h",
      "free": true,
      "lessons": [
        {
          "title": "Visualização que decide: princípios antes da ferramenta",
          "type": "video",
          "duration": "20min",
          "summary": "Por que o cérebro compara comprimentos melhor que áreas e ângulos, e o gráfico como resposta a uma pergunta — não decoração. Apresenta os 4 tipos que resolvem 90% dos casos (barras, linhas, tabela e scorecard) com galeria de antes/depois de dashboards públicos reais."
        },
        {
          "title": "Do Sheets ao primeiro dashboard no Looker Studio",
          "type": "pratica",
          "duration": "1h40",
          "summary": "Conexão da planilha limpa do módulo 2 como fonte de dados e o conceito de dimensões versus métricas. Montagem da primeira página: scorecard de total de chamados, barras por distrito, linha por mês e filtro de serviço, com publicação e compartilhamento por link.",
          "practiceTool": "Looker Studio"
        },
        {
          "title": "Design de dashboards executivos: KPIs, hierarquia e contexto",
          "type": "video",
          "duration": "20min",
          "summary": "A regra dos 5 segundos (o número mais importante no canto superior esquerdo), a escolha de 3 a 5 KPIs, comparação com meta e período anterior, e paleta sóbria com um único destaque. Alerta contra o erro capital: o dashboard-enciclopédia que ninguém abre duas vezes."
        },
        {
          "title": "Dashboard de zeladoria urbana de ponta a ponta",
          "type": "pratica",
          "duration": "2h10",
          "summary": "Projeto guiado completo com a base SP156: definição da persona (subprefeito), 4 KPIs, página de visão geral e página de detalhe com drill por distrito, controles de período e serviço. Revisão final por checklist de design — o primeiro item de portfólio apresentável do curso.",
          "practiceTool": "Looker Studio"
        },
        {
          "title": "Quiz do Módulo 5 — Visualização e dashboards",
          "type": "quiz",
          "duration": "15min",
          "summary": "Questões sobre escolha de gráfico por pergunta, hierarquia visual e crítica de um dashboard de exemplo, com explicações comentadas."
        }
      ]
    },
    {
      "id": "modulo-6",
      "title": "IA copilota, ética e projeto final",
      "duration": "5h30",
      "free": true,
      "lessons": [
        {
          "title": "IA generativa na análise de dados: copilota, não piloto",
          "type": "video",
          "duration": "20min",
          "summary": "O que a IA de 2026 faz bem no fluxo de análise (explicar código, sugerir consultas, resumir documentos, primeiras versões de texto) e onde ela erra com confiança, como números inventados e fontes fantasma. O protocolo da casa: a IA propõe, o dado confirma, você assina."
        },
        {
          "title": "NotebookLM na prática: interrogando relatórios públicos",
          "type": "pratica",
          "duration": "1h20",
          "summary": "Carga de documentos públicos reais (como relatórios de gestão e metas da Prefeitura de SP) no NotebookLM, perguntas com citação de fonte e geração de um resumo orientado a decisão. Desafio: encontrar uma afirmação que a IA resumiu de forma imprecisa, conferindo cada citação no original.",
          "practiceTool": "NotebookLM"
        },
        {
          "title": "LGPD, ética e limites do uso de dados na gestão pública",
          "type": "leitura",
          "duration": "40min",
          "summary": "O essencial da LGPD (Lei nº 13.709/2018) para quem analisa dados no setor público: dado pessoal, anonimizado e agregado, bases legais do tratamento no poder público e as armadilhas de reidentificação. Fecha com um checklist ético antes de publicar qualquer análise."
        },
        {
          "title": "Storytelling com dados: a apresentação que muda a decisão",
          "type": "video",
          "duration": "20min",
          "summary": "A estrutura contexto → conflito → resolução aplicada a uma apresentação executiva de 5 minutos, com a regra de um slide por ideia. Ensina a antecipar as três perguntas difíceis da audiência e a apresentar incerteza sem perder autoridade."
        },
        {
          "title": "Projeto final: do dado aberto à recomendação estratégica",
          "type": "pratica",
          "duration": "2h30",
          "summary": "O aluno escolhe um dataset dos portais do curso (SP156, InfoSiga, ObservaSampa, Base dos Dados), define uma pergunta estratégica e executa o ciclo completo: limpeza, análise e dashboard no Looker Studio. Entrega link do dashboard, sumário executivo de 1 página e roteiro de apresentação de 5 minutos, avaliados por rubrica com feedback individual.",
          "practiceTool": "Looker Studio"
        }
      ]
    }
  ],
  "library": [
    {
      "title": "Notebook — Prática do Módulo 1",
      "description": "Notebook starter com a primeira análise de dados abertos da cidade de São Paulo.",
      "tool": "Google Colab",
      "url": "https://colab.research.google.com/github/giselleCouto/giselle-falcao-portfolio/blob/main/client/public/cursos/notebooks/analise-dados-estrategica-pratica-modulo1.ipynb"
    },
    {
      "title": "Portal de Dados Abertos de São Paulo",
      "description": "Fonte oficial dos datasets usados no curso: saúde, educação, mobilidade e zeladoria da capital paulista.",
      "tool": "Portal público",
      "url": "http://dados.prefeitura.sp.gov.br/"
    }
  ]
};
