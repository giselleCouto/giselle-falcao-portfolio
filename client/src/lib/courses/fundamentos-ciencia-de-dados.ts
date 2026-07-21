import type { Course } from "./types";

// Gerado a partir do material pedagógico em docs/cursos/fundamentos-ciencia-de-dados/
// Edite videoUrl / slidesUrl / practiceUrl conforme grava e publica os materiais.

export const fundamentosCienciaDeDados: Course = {
  "slug": "fundamentos-ciencia-de-dados",
  "title": "Fundamentos de Ciência de Dados",
  "level": "Iniciante",
  "hours": "20h",
  "free": true,
  "tagline": "Seu primeiro passo na ciência de dados: entenda a área, domine o essencial e descubra sua trilha — tudo no navegador.",
  "description": "O curso de porta de entrada da Giselle Falcão Academy: entenda o que é ciência de dados, domine a estatística essencial, dê os primeiros passos em Python e visualização, e descubra qual trilha seguir — tudo com ferramentas gratuitas de navegador e certificado ao concluir.",
  "outcomes": [
    "Explicar o que é ciência de dados, como a área se organiza (análise, ciência, engenharia de dados, ML) e o que faz cada profissional no mercado brasileiro",
    "Aplicar o método da ciência de dados — da pergunta bem formulada à comunicação do resultado — em investigações com dados reais",
    "Resumir e interpretar dados com estatística descritiva: tipos de variáveis, distribuições, medidas de centro e dispersão, boxplot e leitura crítica de números na mídia",
    "Escrever seus primeiros programas em Python e analisar dados com pandas no Google Colab, sem instalar nada",
    "Escolher o gráfico certo para cada pergunta e transformar resultados em narrativa, com título-afirmação, destaque visual e recomendação",
    "Situar o Machine Learning e a IA generativa no mapa da área e escolher com segurança a próxima trilha na Giselle Falcão Academy"
  ],
  "audience": "Qualquer pessoa que queira dar o primeiro passo na área de dados: estudantes, profissionais em transição de carreira, gestores e curiosos. É o curso de porta de entrada da Academy — nenhuma experiência prévia é necessária.",
  "prerequisites": "Nenhum pré-requisito: basta uma conta Google gratuita, um navegador atualizado e familiaridade básica com computador — todo código das primeiras práticas vem pronto e comentado.",
  "status": "disponivel",
  "modules": [
    {
      "id": "modulo-1",
      "title": "Ciência de dados: a área, as profissões e o método",
      "subtitle": "O panorama: o que é a área, quem trabalha nela e o método que vai da pergunta à decisão",
      "duration": "3h30",
      "free": true,
      "lessons": [
        {
          "title": "O que é ciência de dados (e o que ela não é)",
          "type": "video",
          "duration": "20min",
          "summary": "Giselle define ciência de dados como a prática de extrair conhecimento útil de dados para apoiar decisões, na interseção de três competências: estatística, computação e conhecimento do domínio. Desfaz quatro mitos (não é sinônimo de IA, não é mágica, não é só para gênios da matemática, não é uma ferramenta), organiza o mapa dos termos (BI, ciência de dados, ML, IA generativa) e mostra quatro cenas brasileiras — varejo, logística, agro e setor público — onde o mesmo método opera."
        },
        {
          "title": "As profissões dos dados: quem faz o quê no mercado brasileiro",
          "type": "leitura",
          "duration": "45min",
          "summary": "Leitura ativa com o organograma da área: analista, cientista, engenheiro de dados e os papéis mais recentes (engenheiro de ML, analytics engineer), cada um com 'um dia na vida', ferramentas típicas e perfis de entrada. Traz trajetórias reais de transição, uma tabela do que estudar para cada papel e o impacto da IA generativa nas profissões. Fecha com autoavaliação das três competências e hipótese de rota profissional, revisitada no módulo 5."
        },
        {
          "title": "O método da ciência de dados: da pergunta à decisão",
          "type": "video",
          "duration": "18min",
          "summary": "As cinco etapas do método: pergunta → obtenção → limpeza e exploração → análise → comunicação, ilustradas com o caso de uma rede de farmácias. Ensina a transformar pergunta vaga em específica (o que medir + recorte + período), a regra garbage in garbage out, a fama dos 80% da limpeza, a regra 'comece pela média e pelo gráfico' e o fecho em recomendação. O método é espiral, não linha reta."
        },
        {
          "title": "Sua primeira investigação no Colab: onde o Brasil cresce?",
          "type": "pratica",
          "duration": "90min",
          "summary": "Primeira mão na massa com o notebook starter: uma investigação completa pelas 5 etapas do método usando dados das 27 UFs inspirados nas estimativas populacionais do IBGE. O aluno executa células comentadas (head, shape, describe, colunas de crescimento absoluto e percentual, groupby por região, gráfico de barras com título-afirmação) e encara um desafio com três TODOs sobre densidade demográfica. Fecha escrevendo 2–3 frases de recomendação e compartilhando o link do notebook.",
          "practiceTool": "Colab",
          "practiceUrl": "https://colab.research.google.com/github/giselleCouto/giselle-falcao-portfolio/blob/main/client/public/cursos/notebooks/fundamentos-ciencia-de-dados-pratica-modulo1.ipynb"
        },
        {
          "title": "Quiz do Módulo 1 — A área, as profissões e o método",
          "type": "quiz",
          "duration": "15min",
          "summary": "Cinco questões objetivas com explicação comentada sobre a definição de ciência de dados, a diferença entre analista e cientista, a etapa da pergunta específica, o mapa dos termos (ML e IA generativa) e a leitura absoluto × percentual da prática. Correção automática, duas tentativas, nota mínima de 70%."
        }
      ],
      "quiz": [
        {
          "prompt": "O que melhor define ciência de dados?",
          "options": [
            "O uso de inteligência artificial para automatizar tarefas repetitivas de uma empresa.",
            "A prática de extrair conhecimento útil de dados para apoiar decisões, combinando estatística, computação e conhecimento do domínio.",
            "O domínio avançado de uma ferramenta específica, como Python ou Excel."
          ],
          "correctIndex": 1,
          "explanation": "A definição da aula 1.1 tem três palavras-chave — conhecimento, útil e decisões — e se apoia na interseção de três competências. IA é uma das ferramentas da caixa (não a definição da área), e ferramentas mudam: o método fica."
        },
        {
          "prompt": "Qual alternativa descreve corretamente a diferença entre analista de dados e cientista de dados?",
          "options": [
            "O analista responde perguntas sobre o que aconteceu (relatórios, painéis, indicadores); o cientista vai além, investigando causas e construindo estimativas e modelos preditivos.",
            "O analista trabalha com dados pequenos e o cientista com dados grandes — essa é a única diferença.",
            "O analista usa Excel e o cientista usa Python; quem usa as duas ferramentas é engenheiro de dados."
          ],
          "correctIndex": 0,
          "explanation": "A fronteira entre os papéis é o tipo de pergunta, não o tamanho do dado nem a ferramenta. O engenheiro de dados, aliás, cuida das 'tubulações' — pipelines que coletam e disponibilizam dados confiáveis — e não se define por usar duas ferramentas."
        },
        {
          "prompt": "A diretora diz: 'as vendas estão ruins, dá uma olhada nos dados'. Segundo o método do curso, qual é o primeiro passo profissional?",
          "options": [
            "Abrir a base de vendas e calcular todas as estatísticas possíveis até algo chamar atenção.",
            "Transformar a demanda em uma pergunta específica — com o que medir, o recorte e o período — como 'quais lojas ficaram abaixo da meta nos últimos 3 meses?'.",
            "Treinar um modelo de machine learning para prever as vendas do próximo trimestre."
          ],
          "correctIndex": 1,
          "explanation": "Pergunta vaga produz análise infinita. A etapa 1 do método é especificar: o que medir (venda contra meta), o recorte (por loja) e o período (3 meses). Sair calculando tudo é procurar agulha sem saber o que é agulha, e modelagem é degrau posterior — se for necessária."
        },
        {
          "prompt": "Sobre a relação entre ciência de dados, machine learning e IA generativa, é correto afirmar:",
          "options": [
            "Ciência de dados, machine learning e IA são três nomes para a mesma coisa.",
            "Machine learning é uma técnica dentro da ciência de dados, e a IA generativa atua como assistente — nenhum dos dois substitui o método da pergunta à decisão.",
            "Com a IA generativa de 2026, o método da ciência de dados ficou obsoleto: basta pedir a análise pronta ao assistente."
          ],
          "correctIndex": 1,
          "explanation": "O mapa da aula 1.1 — análise descreve, ciência de dados investiga e prevê, ML é uma das técnicas, IA generativa é a assistente. A IA acelera o trabalho, mas erra com confiança: formular a pergunta, validar o resultado e assumir a decisão continuam sendo humanos."
        },
        {
          "prompt": "Na prática do módulo, Roraima liderou o crescimento percentual enquanto São Paulo liderou o absoluto. Por que calculamos o crescimento PERCENTUAL além do absoluto?",
          "options": [
            "Porque o percentual permite comparar de forma justa estados de tamanhos muito diferentes — 190 mil novos habitantes transformam Roraima, mas passariam despercebidos em São Paulo.",
            "Porque o crescimento absoluto está sempre errado e não deve ser usado em análises.",
            "Porque gráficos de barras só aceitam valores em porcentagem."
          ],
          "correctIndex": 0,
          "explanation": "Cada medida conta metade da história — o absoluto mostra o volume (relevante para dimensionar serviços), o percentual mostra o ritmo (relevante para comparar dinâmicas). Por isso a prática pede os dois rankings lado a lado; nenhum deles é 'errado', e gráficos aceitam qualquer unidade."
        }
      ]
    },
    {
      "id": "modulo-2",
      "title": "Estatística essencial (sem trauma)",
      "subtitle": "A gramática do cientista de dados: variáveis, distribuições, centro, dispersão e leitura crítica",
      "duration": "3h45",
      "free": true,
      "lessons": [
        {
          "title": "O formato dos dados: tipos de variáveis e distribuições",
          "type": "video",
          "duration": "20min",
          "summary": "Nenhuma fórmula antes da intuição: variáveis qualitativas (nominais, ordinais) e quantitativas (discretas, contínuas) com o teste rápido 'faz sentido tirar média?', e por que o tipo define as operações permitidas. Apresenta a distribuição como o retrato da variável, ensina a ler o histograma e os três formatos clássicos — sino, cauda à direita (renda, prazos) e bimodal (dois grupos misturados) — com a regra de ouro: a forma antes do número."
        },
        {
          "title": "Resumindo sem mentir: centro, dispersão e boxplot",
          "type": "video",
          "duration": "22min",
          "summary": "A partir do enigma do salário médio que quase ninguém recebe: média, mediana e moda com um exemplo de 5 salários, o cabo de guerra da assimetria (a cauda puxa a média; a mediana fica plantada), o desvio padrão intuitivo com as duas turmas de média 7, quartis, percentis e a anatomia completa do boxplot. Fecha com a conduta profissional diante de outliers (investigar, decidir, documentar) e o kit de bolso dos 7 números."
        },
        {
          "title": "Probabilidade, acaso e leitura crítica de números",
          "type": "leitura",
          "duration": "45min",
          "summary": "Leitura sem fórmulas sobre as ideias que consertam a intuição: probabilidade como grau de incerteza (o que significa 70% de chuva), independência e a falácia do apostador, risco relativo × risco absoluto nas manchetes ('aumenta 50% o risco' — de 2 para 3 em mil), porcentagens sobre bases pequenas e gráficos que distorcem (eixo cortado, escala dupla). Fecha com um checklist de defesa pessoal de 5 perguntas e a atividade caça-manchete no fórum."
        },
        {
          "title": "Estatística na prática com notas do ENEM no Google Sheets",
          "type": "pratica",
          "duration": "90min",
          "summary": "Sobre uma amostra didática de 500 candidatos inspirada nos microdados públicos do ENEM (INEP), o aluno monta o kit dos 7 números (média, mediana, desvio, mínimo, máximo, quartis) para as 5 áreas do exame com funções do Sheets, constrói histogramas de matemática e redação, compara escola pública × privada por mediana e desvio, e encara o desafio: identificar a área com maior distância média–mediana e explicá-la com o vocabulário da assimetria. Entrega: 3 conclusões no padrão número + contexto + ressalva.",
          "practiceTool": "Google Sheets"
        },
        {
          "title": "Quiz do Módulo 2 — Estatística essencial",
          "type": "quiz",
          "duration": "15min",
          "summary": "Cinco questões objetivas com explicação sobre classificação de variáveis, média × mediana em distribuições assimétricas, interpretação do desvio padrão, anatomia do boxplot e risco relativo × absoluto. Correção automática, duas tentativas, nota mínima de 70%."
        }
      ],
      "quiz": [
        {
          "prompt": "A variável 'nível de escolaridade' (fundamental, médio, superior) é classificada como:",
          "options": [
            "Quantitativa discreta, porque os níveis podem ser numerados como 1, 2 e 3.",
            "Qualitativa ordinal, porque as categorias têm ordem natural, mas a distância entre elas não é numérica.",
            "Qualitativa nominal, porque escolaridade é apenas um rótulo sem ordem."
          ],
          "correctIndex": 1,
          "explanation": "Há ordem clara (fundamental < médio < superior), mas numerar os níveis não os torna quantitativos — o número seria só um apelido, e calcular 'escolaridade média 2,4' seria média de rótulos. Categoria com ordem e sem distância numérica é o retrato da variável ordinal."
        },
        {
          "prompt": "Em uma cidade, o salário médio é R$ 4.800 e o salário mediano é R$ 2.100. O que essa diferença revela?",
          "options": [
            "Distribuição assimétrica com cauda à direita: a maioria ganha pouco e uma minoria com salários muito altos puxa a média para cima.",
            "Um erro de cálculo — em qualquer conjunto de dados, média e mediana devem ser iguais.",
            "Que metade dos trabalhadores da cidade ganha exatamente R$ 4.800."
          ],
          "correctIndex": 0,
          "explanation": "É o cabo de guerra da aula 2.2 — valores extremos arrastam a média, mas a mediana fica plantada no meio da fila. Média bem acima da mediana denuncia a cauda à direita, típica de renda; nesse cenário, a mediana (R$ 2.100) descreve melhor o trabalhador típico, e o relatório honesto reporta as duas."
        },
        {
          "prompt": "Duas turmas têm média 7,0. O desvio padrão da turma A é 0,5 e o da turma B é 2,5. Qual leitura está correta?",
          "options": [
            "As turmas são equivalentes, pois têm a mesma média.",
            "A turma B é mais homogênea, pois desvio padrão maior indica notas mais parecidas.",
            "A turma A é homogênea (notas concentradas perto de 7) e a turma B é heterogênea (notas muito espalhadas) — a mesma média esconde realidades opostas."
          ],
          "correctIndex": 2,
          "explanation": "O desvio padrão é o tamanho típico do desvio em relação ao centro: 0,5 significa notas coladas na média; 2,5 significa notas espalhadas (como metade 4,5 e metade 9,5). Centro sem dispersão é metade da história — quem olha só a média trata as duas turmas igual e erra nas duas."
        },
        {
          "prompt": "Em um boxplot, o traço no interior da caixa e os limites da caixa representam, respectivamente:",
          "options": [
            "A mediana; o primeiro quartil (Q1) e o terceiro quartil (Q3) — a caixa contém a metade central dos dados.",
            "A média; o valor mínimo e o valor máximo do conjunto de dados.",
            "A moda; o desvio padrão para baixo e para cima da média."
          ],
          "correctIndex": 0,
          "explanation": "A anatomia do boxplot — caixa de Q1 a Q3 (50% central dos dados), traço na mediana, bigodes para a faixa típica e pontos soltos para os outliers. Média, moda e desvio padrão não aparecem no boxplot padrão; mínimo e máximo, quando não são outliers, ficam nas pontas dos bigodes, não na caixa."
        },
        {
          "prompt": "Uma manchete diz: 'novo hábito aumenta em 50% o risco da doença X'. Sabendo que o risco base é de 2 casos em 1.000 pessoas, qual é a leitura estatisticamente honesta?",
          "options": [
            "Metade das pessoas com o hábito desenvolverá a doença X.",
            "O risco passa de 2 para 3 casos em 1.000 — um acréscimo absoluto de 1 caso por mil, bem menos alarmante do que '50%' sugere.",
            "A manchete está necessariamente errada, pois risco não pode ser expresso em porcentagem."
          ],
          "correctIndex": 1,
          "explanation": "50% é o risco RELATIVO — 50% a mais sobre uma base pequena (2‰ → 3‰). A pergunta de defesa pessoal é sempre '50% de quanto?': sem o valor absoluto ao lado, a variação percentual assusta mais do que informa. A manchete não é matematicamente errada — é incompleta, o que às vezes é pior."
        }
      ]
    },
    {
      "id": "modulo-3",
      "title": "Python e pandas: suas primeiras análises no Colab",
      "subtitle": "De executar código pronto a escrever o seu: a base da linguagem e a planilha com superpoderes",
      "duration": "4h15",
      "free": true,
      "lessons": [
        {
          "title": "Python do zero: variáveis, listas e a lógica do código",
          "type": "video",
          "duration": "22min",
          "summary": "Primeira aula de programação de verdade, sem pressa: o que é um programa, variáveis como caixinhas nomeadas, tipos básicos (número, texto, lógico), listas e o print. Giselle escreve o código ao vivo no Colab, errando de propósito para mostrar que mensagem de erro é dica, não bronca. Fecha com if e for em versão mínima — o suficiente para ler código, não para decorar sintaxe."
        },
        {
          "title": "Primeiros passos em Python: exercícios guiados no Colab",
          "type": "pratica",
          "duration": "60min",
          "summary": "Notebook de exercícios curtos e progressivos: criar variáveis, formatar frases com f-strings, somar uma lista de gastos do mês, usar if para classificar o orçamento e for para percorrer uma lista de compras. Cada exercício tem exemplo resolvido mais uma variação para o aluno adaptar. Desafio: uma calculadora de parcelamento que avisa quando a parcela estoura 30% da renda.",
          "practiceTool": "Colab"
        },
        {
          "title": "pandas essencial: a planilha com superpoderes",
          "type": "video",
          "duration": "20min",
          "summary": "O pandas apresentado como planilha programável: DataFrame e Series, read_csv, seleção de colunas, filtros com condições, colunas calculadas e a dupla de ouro value_counts() + groupby(). Cada operação é mostrada lado a lado com o equivalente em planilha (filtro, coluna nova, tabela dinâmica) para ancorar no que o aluno já conhece dos módulos anteriores."
        },
        {
          "title": "Explorando o e-commerce brasileiro com pandas",
          "type": "pratica",
          "duration": "110min",
          "summary": "Análise guiada de uma amostra do dataset público Olist (e-commerce brasileiro real): pedidos com estado, categoria, preço, frete e prazo de entrega. O aluno filtra por estado, cria a coluna custo_total, agrupa por categoria e UF, aplica o kit dos 7 números com describe() e responde três perguntas de negócio. Desafio com TODOs: a categoria com maior frete proporcional, o estado com maior prazo mediano e duas frases de recomendação para o lojista.",
          "practiceTool": "Colab"
        },
        {
          "title": "Quiz do Módulo 3 — Python e pandas",
          "type": "quiz",
          "duration": "15min",
          "summary": "Cinco questões de leitura e previsão de código: valor de expressões simples (len de lista), efeito de um filtro booleano, criação de coluna calculada, resultado de um groupby e o diagnóstico do erro mais comum do iniciante no Colab (células executadas fora de ordem). Duas tentativas, nota mínima de 70%."
        }
      ],
      "quiz": [
        {
          "prompt": "O que o código compras = [\"arroz\", \"feijão\", \"café\"] seguido de print(len(compras)) exibe?",
          "options": [
            "3, porque len conta quantos itens a lista tem.",
            "15, porque len conta todas as letras dos itens da lista.",
            "\"arroz, feijão, café\", porque print sempre exibe o conteúdo completo."
          ],
          "correctIndex": 0,
          "explanation": "len (de length, comprimento) devolve o número de ELEMENTOS da lista — aqui, 3 itens. Para contar letras seria preciso medir cada texto individualmente, e o print exibe o que recebe: neste caso, o resultado de len, não a lista."
        },
        {
          "prompt": "Em um DataFrame df de pedidos, o que a linha df[df[\"uf\"] == \"SP\"] faz?",
          "options": [
            "Apaga do DataFrame todos os pedidos que não são de São Paulo.",
            "Seleciona (filtra) apenas as linhas cujo valor da coluna uf é \"SP\", sem alterar o DataFrame original.",
            "Cria uma nova coluna chamada \"SP\" preenchida com verdadeiro e falso."
          ],
          "correctIndex": 1,
          "explanation": "A condição df[\"uf\"] == \"SP\" gera uma máscara de verdadeiros/falsos, e o colchete externo usa essa máscara para exibir só as linhas verdadeiras — o equivalente ao filtro da planilha. O df original permanece intacto; para guardar o recorte, atribui-se a uma variável (pedidos_sp = ...)."
        },
        {
          "prompt": "O que acontece ao executar df[\"custo_total\"] = df[\"preco\"] + df[\"frete\"]?",
          "options": [
            "O pandas cria (ou substitui) a coluna custo_total, somando preço e frete linha a linha para todos os pedidos de uma vez.",
            "O pandas soma todos os preços e todos os fretes do DataFrame e guarda um único número total.",
            "Nada — para criar colunas novas é obrigatório usar um laço for percorrendo cada linha."
          ],
          "correctIndex": 0,
          "explanation": "É a coluna calculada da planilha em versão programável — o pandas opera vetorialmente, linha a linha, sem laço nenhum. O resultado é uma coluna nova com um valor por pedido; a soma total única seria df[\"preco\"].sum() + df[\"frete\"].sum()."
        },
        {
          "prompt": "A tabela df tem 5.000 pedidos de 27 UFs. O que df.groupby(\"uf\")[\"preco\"].mean() retorna?",
          "options": [
            "Um único número: o preço médio de todos os 5.000 pedidos.",
            "5.000 linhas, cada uma com a média da sua própria UF repetida.",
            "27 valores — o preço médio dos pedidos de cada UF, um por estado."
          ],
          "correctIndex": 2,
          "explanation": "O groupby é a tabela dinâmica do pandas: 'calcule ISTO (média de preço) agrupado por AQUILO (UF)'. Ele colapsa as 5.000 linhas em um resultado por grupo — 27 UFs, 27 médias. A média geral única seria df[\"preco\"].mean(), sem groupby."
        },
        {
          "prompt": "Você abre seu notebook no Colab, executa direto a célula da análise e recebe NameError: name 'df' is not defined. Qual é a causa mais provável e a correção?",
          "options": [
            "O Colab está fora do ar; basta aguardar alguns minutos e tentar de novo.",
            "A sessão começou zerada e a célula que cria o df ainda não foi executada; execute as células na ordem, do topo para baixo (ou use 'Executar tudo').",
            "O pandas não funciona no plano gratuito do Colab; é preciso instalar o Python no computador."
          ],
          "correctIndex": 1,
          "explanation": "Cada sessão do Colab começa com a memória vazia — variáveis só existem depois que a célula que as cria roda. É o erro mais comum do iniciante e a correção é sempre a mesma: rodar da primeira célula para baixo. O pandas é gratuito no Colab e o erro não indica instabilidade do serviço."
        }
      ]
    },
    {
      "id": "modulo-4",
      "title": "Visualização e storytelling com dados",
      "subtitle": "O gráfico certo, a figura legível e a narrativa que transforma achado em decisão",
      "duration": "4h",
      "free": true,
      "lessons": [
        {
          "title": "O gráfico certo para cada pergunta: comparação, tendência, distribuição e relação",
          "type": "video",
          "duration": "20min",
          "summary": "As quatro intenções que resolvem quase tudo: COMPARAR categorias (barras ordenadas), acompanhar TENDÊNCIA no tempo (linhas), ver a DISTRIBUIÇÃO de uma variável (histograma e boxplot, reaproveitando o módulo 2) e investigar a RELAÇÃO entre duas variáveis numéricas (dispersão). Antes de escolher o gráfico, nomeie a intenção — com galeria de acertos e desastres, incluindo o clássico: pizza de 15 fatias."
        },
        {
          "title": "Seus primeiros gráficos com matplotlib no Colab",
          "type": "pratica",
          "duration": "80min",
          "summary": "Notebook guiado sobre os dados da Olist e do IBGE já conhecidos: barras ordenadas (frete médio por estado), linha (pedidos por mês), histograma (prazo de entrega) e dispersão (frete × distância). Para cada gráfico, três versões: crua → legível (título, rótulos, formatação) → com destaque (uma barra colorida, o resto neutro). Desafio: reproduzir um gráfico-alvo apenas olhando a imagem final.",
          "practiceTool": "Colab"
        },
        {
          "title": "Storytelling com dados: o gráfico que fala sozinho",
          "type": "video",
          "duration": "18min",
          "summary": "A diferença entre mostrar dados e contar um achado: título-afirmação ('Frete no Norte custa quase o dobro da média nacional' em vez de 'Gráfico de fretes por região'), destacar UM elemento e apagar o resto, anotar o ponto que importa e cortar o que não serve à mensagem. Apresenta a estrutura do mini-relatório em três blocos — pergunta, achados com números, recomendação com ressalva — exigida no projeto final."
        },
        {
          "title": "Primeiro contato com o Looker Studio: do Sheets ao mini-painel",
          "type": "pratica",
          "duration": "75min",
          "summary": "Degustação honesta da ferramenta de BI: conectar a planilha do ENEM do módulo 2 como fonte de dados, entender dimensões × métricas e montar um mini-painel de uma página com scorecard, gráfico de barras por UF e filtro por tipo de escola, publicando por link. Fecha com o convite transparente: quem se encantou por painéis tem a trilha de Análise de Dados para Decisões Estratégicas esperando na Academy.",
          "practiceTool": "Looker Studio"
        },
        {
          "title": "Quiz do Módulo 4 — Visualização e storytelling",
          "type": "quiz",
          "duration": "15min",
          "summary": "Cinco questões sobre a escolha do gráfico pela intenção (relação → dispersão; distribuição → histograma), título-afirmação, a técnica do destaque único e a estrutura do mini-relatório em três blocos. Duas tentativas, nota mínima de 70%."
        }
      ],
      "quiz": [
        {
          "prompt": "Você quer investigar se pedidos entregues a distâncias maiores pagam fretes maiores (duas variáveis numéricas). Qual gráfico responde melhor?",
          "options": [
            "Gráfico de pizza, com uma fatia para cada faixa de frete.",
            "Gráfico de dispersão (scatter), com distância em um eixo e frete no outro.",
            "Gráfico de barras com o frete médio geral de todos os pedidos."
          ],
          "correctIndex": 1,
          "explanation": "A intenção aqui é RELAÇÃO entre duas variáveis numéricas — e o gráfico de dispersão foi feito para isso: cada pedido vira um ponto, e o padrão da nuvem revela se frete cresce com distância. Pizza compara partes de um todo, e uma única barra média esconde justamente a relação que se quer ver."
        },
        {
          "prompt": "Para mostrar como os prazos de entrega se espalham (maioria rápida, alguns pedidos muito demorados), o gráfico adequado é:",
          "options": [
            "Um histograma (ou boxplot), pois a intenção é ver a DISTRIBUIÇÃO da variável.",
            "Um gráfico de linhas, pois prazos envolvem tempo.",
            "Um scorecard com o prazo médio, pois resume tudo em um número."
          ],
          "correctIndex": 0,
          "explanation": "'Como os valores se espalham' é pergunta de distribuição — histograma mostra a silhueta (e a cauda dos pedidos demorados); o boxplot resume com quartis e outliers. Linhas servem para tendência ao longo de datas (outra intenção), e um único número médio esconde exatamente a cauda que interessa."
        },
        {
          "prompt": "Qual título segue a técnica do título-afirmação da aula 4.3?",
          "options": [
            "\"Gráfico de barras dos fretes médios por região do Brasil\".",
            "\"Análise de fretes — dados de 2025\".",
            "\"Frete médio no Norte custa quase o dobro da média nacional\"."
          ],
          "correctIndex": 2,
          "explanation": "O título-afirmação entrega o ACHADO, não a descrição do gráfico — quem lê só o título já sai sabendo a conclusão. 'Gráfico de barras de...' descreve o óbvio e desperdiça a linha mais lida da figura; 'Análise de fretes' não afirma nada."
        },
        {
          "prompt": "Em um gráfico de barras com as 27 UFs, qual técnica de destaque comunica melhor que o seu achado está em um único estado?",
          "options": [
            "Pintar a barra do estado-achado em uma cor forte e deixar todas as outras em cinza neutro.",
            "Usar uma cor vibrante diferente para cada uma das 27 barras.",
            "Aplicar efeito 3D para dar mais impacto visual ao conjunto."
          ],
          "correctIndex": 0,
          "explanation": "Destaque funciona por contraste — UMA cor forte contra um fundo neutro guia o olho direto ao achado. Vinte e sete cores competindo é o mesmo que nenhuma, e o 3D distorce as proporções que o gráfico existe para preservar."
        },
        {
          "prompt": "A estrutura do mini-relatório de análise ensinada no módulo é:",
          "options": [
            "Pergunta → achados com números → recomendação com ressalva.",
            "Capa → 10 gráficos sem texto → agradecimentos.",
            "Recomendação primeiro, sem números, para não cansar o leitor."
          ],
          "correctIndex": 0,
          "explanation": "Os três blocos contam a investigação completa: a pergunta dá o contexto, os achados trazem a evidência (números e gráficos que falam sozinhos) e a recomendação fecha com a ação — incluindo a ressalva honesta sobre limites dos dados. Gráficos sem narrativa não se defendem, e recomendação sem número é opinião."
        }
      ]
    },
    {
      "id": "modulo-5",
      "title": "Panorama de ML, projeto final e sua trilha",
      "subtitle": "O vislumbre do Machine Learning, o projeto integrador e a escolha consciente da próxima trilha",
      "duration": "4h30",
      "free": true,
      "lessons": [
        {
          "title": "Onde o Machine Learning entra na história (e onde entra a IA generativa)",
          "type": "video",
          "duration": "20min",
          "summary": "O degrau seguinte do método: quando a pergunta deixa de ser 'o que aconteceu?' e vira 'o que vai acontecer com casos novos?', entra o ML — a técnica de aprender padrões a partir de exemplos históricos. Panorama sem algoritmos: perguntas preditivas nos dados do curso, o alerta de que ML exige dados de qualidade e a distinção entre ML preditivo e a IA generativa copilota de 2026. Critério prático: análise descritiva responde a maioria das perguntas; ML entra quando prever vale dinheiro ou tempo."
        },
        {
          "title": "O ecossistema de dados em 2026: times, ferramentas e como continuar aprendendo",
          "type": "leitura",
          "duration": "40min",
          "summary": "Mapa do ecossistema sem jargão gratuito: como os papéis do módulo 1 se organizam em times reais, o caminho do dado da coleta ao painel, onde vivem as ferramentas do curso e o que existe além (bancos de dados, nuvem, orquestração — citados como paisagem). A IA generativa como copilota, com o protocolo de responsabilidade: a IA propõe, o dado confirma, você assina. Fecha com o guia para publicar os notebooks do curso como primeiro portfólio público."
        },
        {
          "title": "Projeto final integrador: sua investigação completa no Colab",
          "type": "pratica",
          "duration": "140min",
          "summary": "O rito de passagem: o aluno escolhe um dos três datasets do curso (IBGE, ENEM ou Olist), formula uma pergunta específica própria e percorre as cinco etapas do método em um notebook-template com seções prontas: pergunta, obtenção, exploração e limpeza, análise com estatística descritiva, dois gráficos com título-afirmação e o mini-relatório final (pergunta → achados → recomendação com ressalva). Entrega por link, avaliada por rubrica — vale 50% da nota e é a principal evidência prática do certificado.",
          "practiceTool": "Colab"
        },
        {
          "title": "Qual trilha seguir? Seu mapa na Giselle Falcão Academy",
          "type": "video",
          "duration": "15min",
          "summary": "Aula de orientação, cara a cara: o que você aprendeu nas 20 horas e as duas trilhas que se abrem. Quer prever, classificar e agrupar com modelos? Fundamentos de Machine Learning (24h). Quer dominar dados abertos, SQL, BigQuery e dashboards para decisões de gestão? Análise de Dados para Decisões Estratégicas (30h). Critérios honestos de escolha pelo tipo de pergunta que mais encantou o aluno — e o lembrete de que as trilhas se somam: a ordem é escolha, não exclusão."
        },
        {
          "title": "Quiz do Módulo 5 — Panorama e integração",
          "type": "quiz",
          "duration": "20min",
          "summary": "Cinco questões integradoras: o critério análise descritiva × ML, o papel da IA generativa como copilota, a natureza do aprendizado por exemplos, a razão de todo projeto terminar em recomendação e a escolha da trilha adequada a cada perfil de pergunta. Duas tentativas, nota mínima de 70%."
        }
      ],
      "quiz": [
        {
          "prompt": "Qual das perguntas abaixo é a que JUSTIFICA machine learning, em vez de análise descritiva?",
          "options": [
            "\"Qual foi a categoria de produto mais vendida no último trimestre?\"",
            "\"Qual foi o prazo mediano de entrega por estado no ano passado?\"",
            "\"Qual a probabilidade de ESTE novo pedido atrasar, antes de ele ser despachado?\""
          ],
          "correctIndex": 2,
          "explanation": "As duas primeiras perguntas olham para o passado e se respondem com contagem, mediana e agrupamento — análise descritiva pura, o território dos módulos 2 e 3. A terceira exige prever um caso novo e individual a partir de padrões aprendidos no histórico: é exatamente o degrau em que o ML entra no método."
        },
        {
          "prompt": "Sobre o papel da IA generativa no trabalho de dados em 2026, a postura correta do curso é:",
          "options": [
            "A IA generativa substitui o método: basta pedir a análise pronta e usar a resposta.",
            "A IA generativa é uma copilota que acelera código e rascunhos, mas pode errar com confiança — a validação nos dados e a responsabilidade pela decisão continuam humanas.",
            "A IA generativa não tem nenhuma utilidade em análise de dados e deve ser evitada."
          ],
          "correctIndex": 1,
          "explanation": "O protocolo da casa — a IA propõe, o dado confirma, você assina. Assistentes escrevem código e rascunham análises com velocidade real, mas alucinam números e justificativas com a mesma fluência; quem domina o método usa a IA como alavanca, quem não domina vira refém dela."
        },
        {
          "prompt": "Qual afirmação sobre machine learning está correta?",
          "options": [
            "O ML aprende padrões a partir de exemplos históricos — por isso a qualidade e a representatividade dos dados limitam a qualidade de qualquer modelo.",
            "O ML dispensa dados históricos: o algoritmo descobre as respostas sozinho, por lógica.",
            "O ML sempre supera uma análise descritiva simples, qualquer que seja a pergunta."
          ],
          "correctIndex": 0,
          "explanation": "Aprender com exemplos é a definição do panorama da aula 5.1 — e a consequência direta é o garbage in, garbage out do módulo 1: dados ruins ou enviesados produzem modelos ruins ou enviesados. Sem histórico não há de onde aprender, e para perguntas descritivas ('o que aconteceu?') a análise simples responde melhor, mais rápido e mais barato."
        },
        {
          "prompt": "Por que o projeto final exige terminar com uma recomendação (e não apenas com gráficos e tabelas)?",
          "options": [
            "Porque a recomendação deixa o notebook maior e mais impressionante para o portfólio.",
            "Porque a etapa 5 do método é a comunicação: análise que não aponta uma ação não apoia decisão nenhuma — e apoiar decisões é a definição de ciência de dados.",
            "Porque gráficos e tabelas são elementos opcionais em uma análise de dados."
          ],
          "correctIndex": 1,
          "explanation": "Fecha o ciclo aberto na aula 1.1 — extrair conhecimento ÚTIL para apoiar DECISÕES. O mini-relatório (pergunta → achados → recomendação com ressalva) é a entrega que transforma a investigação em valor; gráficos e números são a evidência, não o destino. 'Análise sem decisão é hobby caro.'"
        },
        {
          "prompt": "Ao final do curso, um aluno diz: 'o que mais me encantou foi responder perguntas de gestão com painéis — quero dominar SQL e dashboards'. Qual trilha da Academy é a continuação natural?",
          "options": [
            "Análise de Dados para Decisões Estratégicas, que aprofunda dados abertos, SQL no BigQuery e dashboards no Looker Studio.",
            "Fundamentos de Machine Learning, que aprofunda regressão, classificação e clustering.",
            "Nenhuma — quem conclui o curso de fundamentos já domina SQL e BI e não precisa continuar."
          ],
          "correctIndex": 0,
          "explanation": "O mapa da aula 5.4 casa a trilha com o tipo de pergunta que encanta o aluno: painéis, SQL e decisões de gestão são o coração da trilha de Análise de Dados; prever e classificar com modelos é o coração da trilha de ML. E o curso de fundamentos abre as portas — SQL e BI profundos ficam justamente nas trilhas, que se somam em qualquer ordem."
        }
      ]
    }
  ],
  "library": [
    {
      "title": "Notebook — Prática do Módulo 1",
      "description": "Notebook starter do curso: sua primeira exploração de dados em Python, direto no navegador.",
      "tool": "Google Colab",
      "url": "https://colab.research.google.com/github/giselleCouto/giselle-falcao-portfolio/blob/main/client/public/cursos/notebooks/fundamentos-ciencia-de-dados-pratica-modulo1.ipynb"
    }
  ]
};
