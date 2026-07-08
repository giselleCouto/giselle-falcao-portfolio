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
      ],
      "quiz": [
        {
          "prompt": "O tempo médio de resolução de um serviço é 12 dias, mas a mediana é 4 dias. O que essa diferença indica?",
          "options": [
            "Erro de cálculo — média e mediana de uma mesma base deveriam ser sempre iguais.",
            "Distribuição assimétrica: a maioria dos casos é resolvida rápido, mas uma minoria demora muito e puxa a média para cima.",
            "Que metade dos casos demora exatamente 12 dias para ser resolvida."
          ],
          "correctIndex": 1,
          "explanation": "Média e mediana distantes são o diagnóstico clássico de cauda longa — poucos casos muito demorados arrastam a média para longe do caso típico. Em distribuição assimétrica, a mediana descreve melhor o típico, e a regra do curso é: assimétrica pede mediana."
        },
        {
          "prompt": "Para prometer um prazo ao cidadão (\"seu chamado será resolvido em até X dias\"), qual medida é a mais adequada?",
          "options": [
            "A média, porque leva em conta todos os valores.",
            "Um percentil alto, como o P90 — o prazo dentro do qual 90% dos casos são de fato resolvidos.",
            "A moda, porque é o prazo que mais se repete."
          ],
          "correctIndex": 1,
          "explanation": "Promessa de prazo é compromisso com a cauda da distribuição, não com o centro. Prometer a média significa estourar o prazo em boa parte dos casos; o P90 é a régua das metas honestas."
        },
        {
          "prompt": "Distritos com mais UBS por habitante apresentam piores indicadores de saúde. A leitura mais prudente dessa correlação é:",
          "options": [
            "As UBS pioram a saúde da população e deveriam ser repensadas.",
            "Pode haver causalidade reversa ou direcionamento: as UBS foram instaladas justamente onde os indicadores já eram piores.",
            "O dado prova que investir em atenção básica não tem efeito."
          ],
          "correctIndex": 1,
          "explanation": "Política pública bem alocada vai sempre \"se correlacionar\" com o problema que combate — o equipamento foi para onde a necessidade era maior. Antes de atribuir causa, rode o checklist das 4 perguntas: terceiro fator? seta invertida? acaso? mecanismo testável?"
        },
        {
          "prompt": "Por que o volume de chamados do SP156 por distrito não mede diretamente a necessidade de zeladoria da cidade?",
          "options": [
            "Porque quem registra chamados é uma amostra autosselecionada: depende de conhecer o canal, ter acesso e acreditar que reclamar adianta.",
            "Porque os dados do SP156 são sigilosos e incompletos por determinação legal.",
            "Porque chamados telefônicos não podem ser tratados estatisticamente."
          ],
          "correctIndex": 0,
          "explanation": "É o viés de seleção — dado administrativo mede a demanda registrada, não a necessidade real. Um distrito com poucos chamados pode estar bem cuidado ou pode ter desistido de pedir; por isso a pergunta profissional é sempre \"quem ficou de fora destes dados?\"."
        },
        {
          "prompt": "Um distrito pequeno passou de 2 para 4 sinistros fatais e virou manchete: \"mortes no trânsito dobram\". Qual é a leitura estatística mais honesta?",
          "options": [
            "Alta de 100% exige transferir imediatamente equipes de fiscalização de outros distritos para lá.",
            "Em bases pequenas, variações percentuais grandes podem ser flutuação aleatória: olhe os valores absolutos e a série de vários anos antes de concluir tendência.",
            "Percentuais não podem ser calculados sobre números pequenos, então o dado deve ser descartado."
          ],
          "correctIndex": 1,
          "explanation": "É a armadilha dos pequenos números — de 2 para 4 pode ser acaso, e no ano seguinte o valor pode voltar a 1 ou 2 sem que nada tenha mudado. O dado não se descarta: agrega-se mais tempo ou mais território e comparam-se absolutos, reportando a incerteza sem paralisar a decisão."
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
      ],
      "quiz": [
        {
          "prompt": "Considere a consulta: SELECT servico, distrito FROM chamados WHERE distrito = 'SE' LIMIT 100. O que ela retorna?",
          "options": [
            "As colunas servico e distrito de até 100 chamados cujo distrito é \"SE\".",
            "Todas as colunas de todos os chamados da cidade, destacando os da Sé.",
            "A contagem de chamados da Sé, agrupada por serviço."
          ],
          "correctIndex": 0,
          "explanation": "Lendo como uma frase — \"selecione serviço e distrito, da tabela chamados, onde o distrito é SE, no máximo 100 linhas\". Sem GROUP BY não há contagem, e o SELECT nomeou apenas duas colunas."
        },
        {
          "prompt": "A tabela chamados tem 50.000 linhas distribuídas em 96 distritos. Quantas linhas retorna SELECT distrito, COUNT(*) AS total FROM chamados GROUP BY distrito?",
          "options": [
            "50.000 — uma por chamado, com o total repetido.",
            "96 — uma por distrito, cada uma com sua contagem.",
            "1 — apenas o total geral de chamados."
          ],
          "correctIndex": 1,
          "explanation": "O GROUP BY colapsa as linhas em um registro por grupo — a mesma lógica da tabela dinâmica do módulo 2: \"conte os chamados, agrupados por distrito\" produz uma linha por distrito."
        },
        {
          "prompt": "Você quer listar apenas os serviços cujo tempo MÉDIO de resolução passa de 30 dias. Qual cláusula filtra corretamente essa condição?",
          "options": [
            "WHERE AVG(dias_para_resolucao) > 30, antes do GROUP BY.",
            "HAVING AVG(dias_para_resolucao) > 30, depois do GROUP BY.",
            "LIMIT 30, para restringir o resultado a 30 dias."
          ],
          "correctIndex": 1,
          "explanation": "O WHERE filtra linhas antes do agrupamento — quando a média ainda não existe. Filtros sobre resultados agregados usam HAVING, que age depois do GROUP BY. LIMIT corta a quantidade de linhas exibidas, não tem relação com dias."
        },
        {
          "prompt": "Um colega cruzou a tabela de ocorrências com o diretório de municípios usando ON ocorrencias.nome_municipio = diretorio.nome e vários municípios sumiram do resultado. Qual é a causa mais provável e a correção?",
          "options": [
            "Nomes de município variam em grafia e acentuação entre bases; o correto é juntar pela chave de código IBGE (id_municipio).",
            "O BigQuery não permite JOIN entre projetos diferentes; é preciso copiar as tabelas para o mesmo projeto.",
            "Faltou um LIMIT na consulta; sem ele o JOIN descarta linhas automaticamente."
          ],
          "correctIndex": 0,
          "explanation": "JOIN por texto é a armadilha de grafia vestida de consulta — \"Embu das Artes\" × \"Embu\" não casam e a linha some no INNER JOIN. O código IBGE de 7 dígitos existe justamente para ser a chave única e estável. JOINs entre projetos públicos são permitidos, e LIMIT nunca altera quais linhas casam."
        },
        {
          "prompt": "No BigQuery, o custo de uma consulta (bytes processados) depende principalmente de quê?",
          "options": [
            "Das colunas que a consulta lê — por isso SELECT * processa a tabela inteira e nomear colunas processa menos.",
            "Do número de linhas exibidas — um LIMIT 10 garante custo próximo de zero.",
            "Do tempo que a consulta demora para executar."
          ],
          "correctIndex": 0,
          "explanation": "O BigQuery é um banco colunar — ele lê apenas as colunas citadas na consulta, e é isso que a estimativa mostra antes de executar. O LIMIT corta a exibição, mas não reduz o que foi escaneado; o tempo de execução não é a base do custo."
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
      ],
      "quiz": [
        {
          "prompt": "Você precisa mostrar ao gestor como o volume de chamados evoluiu mês a mês no último ano. O visual mais adequado é:",
          "options": [
            "Gráfico de pizza com 12 fatias, uma por mês.",
            "Gráfico de linhas (série temporal) com um ponto por mês.",
            "Um scorecard com o total do ano."
          ],
          "correctIndex": 1,
          "explanation": "Evolução no tempo pede linhas — o olho acompanha tendência, sazonalidade e quebras. Pizza compara partes de um todo (mal, aliás, com 12 fatias), e o scorecard resume um número, mas não mostra a evolução."
        },
        {
          "prompt": "Por que gráficos de barras costumam comunicar comparações melhor que gráficos de pizza?",
          "options": [
            "Porque o cérebro compara comprimentos com muito mais precisão do que ângulos e áreas.",
            "Porque barras aceitam mais cores diferentes que fatias.",
            "Porque pizza só funciona para dados que somam menos de 100%."
          ],
          "correctIndex": 0,
          "explanation": "É a hierarquia da percepção (Cleveland & McGill): posição e comprimento no topo, ângulo e área embaixo. Não tem a ver com cores — aliás, quanto menos cores, melhor — e proporções em pizza sempre somam 100% por construção."
        },
        {
          "prompt": "No Looker Studio, ao montar o gráfico \"chamados por distrito\", os campos distrito e Contagem de registros são, respectivamente:",
          "options": [
            "Uma métrica e uma dimensão.",
            "Uma dimensão e uma métrica.",
            "Dois filtros do relatório."
          ],
          "correctIndex": 1,
          "explanation": "Dimensão é o \"agrupado por aquilo\" (categorias, como distrito — em verde no painel); métrica é o \"calcule isto\" (números agregados, como a contagem — em azul). É a mesma gramática da tabela dinâmica e do GROUP BY."
        },
        {
          "prompt": "Em um dashboard executivo, o número mais importante (KPI nº 1) deve ficar:",
          "options": [
            "No rodapé, para fechar a leitura com chave de ouro.",
            "No canto superior esquerdo, onde o padrão de leitura em F começa.",
            "Em qualquer lugar, desde que pisque ou tenha cor vibrante."
          ],
          "correctIndex": 1,
          "explanation": "O olho varre a tela num padrão em F, começando pelo canto superior esquerdo — o \"metro quadrado mais caro\" do painel. É a regra dos 5 segundos: a resposta principal precisa aparecer onde o olhar chega primeiro, sem depender de efeitos."
        },
        {
          "prompt": "Um painel com 30 gráficos numa única página, seis paletas de cores e nenhum número em destaque comete qual erro?",
          "options": [
            "É um dashboard-enciclopédia: sem persona, sem pergunta e sem hierarquia, ninguém o abre duas vezes.",
            "Nenhum — quanto mais informação na tela, melhor a decisão.",
            "Usar dados públicos, que não deveriam aparecer em dashboards."
          ],
          "correctIndex": 0,
          "explanation": "O dashboard-enciclopédia nasce quando ninguém define para quem e para qual decisão o painel existe — cada área pede \"só mais um gráfico\" e nada se destaca. A cura: persona + pergunta em uma frase, 3 a 5 KPIs na visão geral e o detalhe em outra página. Mais informação não é mais decisão; dados públicos são exatamente a matéria-prima certa."
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
      ],
      "quiz": [
        {
          "prompt": "Um gestor pergunta a um chatbot genérico \"quantos chamados o SP156 recebeu em 2025?\" e recebe um número exato e convincente. Qual é a atitude correta?",
          "options": [
            "Usar o número, pois a IA de 2026 tem acesso a todos os dados públicos.",
            "Tratar o número como não verificado e conferir na fonte oficial (Portal de Dados Abertos) antes de citá-lo.",
            "Pedir ao próprio chatbot que confirme se o número está correto."
          ],
          "correctIndex": 1,
          "explanation": "A IA generativa produz o texto mais plausível, não consulta o portal — e pode alucinar números e fontes com total confiança. Pedir confirmação à própria IA não verifica nada. O protocolo da casa: a IA propõe, o dado confirma, você assina."
        },
        {
          "prompt": "Qual é a principal vantagem do NotebookLM sobre um chatbot genérico para interrogar relatórios públicos?",
          "options": [
            "Ele responde com base apenas nos documentos carregados e cita o trecho de origem de cada afirmação.",
            "Ele escreve resumos mais longos e em menos tempo.",
            "Ele dispensa a conferência das respostas no documento original."
          ],
          "correctIndex": 0,
          "explanation": "O NotebookLM é \"IA com coleira\": ancora as respostas nas SUAS fontes e mostra citações clicáveis — se a informação não está nos documentos, ele diz isso. Ainda assim, resumos podem perder nuance (prazos, condições, status parciais); a conferência no original continua obrigatória."
        },
        {
          "prompt": "A coluna de descrição em texto livre dos chamados do 156 pode conter nome, telefone e endereço do cidadão. Antes de publicar uma análise, o correto é:",
          "options": [
            "Publicar mesmo assim, pois quem escreveu o relato concordou implicitamente com a divulgação.",
            "Revisar e remover os dados pessoais — ou trabalhar apenas com os campos estruturados e agregados.",
            "Publicar apenas se o volume de chamados for grande, porque aí ninguém acha o relato individual."
          ],
          "correctIndex": 1,
          "explanation": "Dado pessoal em texto livre continua protegido pela LGPD; registrar um chamado não é consentir com a exposição, e o volume da base não anonimiza o relato individual. Regra da casa: texto livre não vai para material público sem revisão — prefira agregados."
        },
        {
          "prompt": "Segundo a LGPD, qual opção descreve um dado que, em regra, está FORA do alcance da lei?",
          "options": [
            "Um total agregado e anonimizado, como \"1.200 chamados de poda no distrito X\", que não permite identificar ninguém por meios razoáveis.",
            "Nome e CPF de munícipes em uma planilha interna da prefeitura, porque não foi publicada.",
            "Qualquer dado que já esteja em um portal de transparência."
          ],
          "correctIndex": 0,
          "explanation": "Pelo art. 12, dados anonimizados/agregados que não permitem identificação por meios técnicos razoáveis não são considerados dados pessoais. Planilha interna com nome e CPF é tratamento de dado pessoal (a LGPD se aplica mesmo sem publicação), e dado publicado em portal pode, sim, conter dado pessoal indevido — publicidade não o exclui da lei."
        },
        {
          "prompt": "Na estrutura contexto → conflito → resolução de uma apresentação executiva de 5 minutos, o \"conflito\" corresponde a:",
          "options": [
            "O momento de debater com a audiência as discordâncias sobre o método.",
            "O problema revelado pelos dados — a distância entre o que é e o que deveria ser, com número — que exige uma decisão.",
            "O gráfico visualmente mais impactante da análise."
          ],
          "correctIndex": 1,
          "explanation": "O conflito é o coração da história: o achado que dói (\"3 distritos concentram 45% dos chamados e esperam o dobro do prazo\"). Sem ele, a apresentação vira despejo de dados; com ele, a resolução — sua recomendação — ganha urgência e sentido."
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
