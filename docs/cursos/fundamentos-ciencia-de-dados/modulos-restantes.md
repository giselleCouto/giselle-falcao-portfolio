# Módulos 3 a 5 — Planos resumidos

**Curso:** Fundamentos de Ciência de Dados · Giselle Falcão Academy
Estes módulos serão detalhados no mesmo padrão dos módulos 1 e 2 (plano de aula com Bloom, roteiro de gravação com timestamps, estrutura de slides, prática passo a passo e quiz com gabarito). Abaixo, o plano resumido de cada um, com o quiz já fechado.

---

## Módulo 3 — Python e pandas: suas primeiras análises no Colab (4h15)

**Objetivo geral:** ao final, o aluno escreve seus primeiros programas em Python (variáveis, listas, condicionais e a lógica de ler código), manipula tabelas com pandas (filtros, colunas calculadas, agrupamentos) e conduz uma análise real do e-commerce brasileiro no Google Colab.

**Nota de posicionamento:** é aqui que o aluno passa de *executar* código pronto (módulo 1) a *escrever* código. Os cursos de ML e de Análise de Dados da Academy usam Python pronto e comentado; este módulo é o único da Academy que ensina a base da linguagem em si.

### Aulas

| # | Aula | Tipo | Duração | Resumo |
|---|---|---|---|---|
| 3.1 | Python do zero: variáveis, listas e a lógica do código | vídeo | 22min | Primeira aula de programação de verdade, sem pressa: o que é um programa, variáveis como caixinhas nomeadas, tipos básicos (número, texto, lógico), listas e o `print`. Giselle escreve o código ao vivo no Colab, errando de propósito para mostrar que mensagem de erro é dica, não bronca. Fecha com `if` e `for` em versão mínima — o suficiente para ler código, não para decorar sintaxe. |
| 3.2 | Primeiros passos em Python: exercícios guiados no Colab | prática (Colab) | 60min | Notebook de exercícios curtos e progressivos: criar variáveis com dados pessoais fictícios, formatar frases com f-strings, somar uma lista de gastos do mês, usar `if` para classificar o orçamento e `for` para percorrer uma lista de compras. Cada exercício tem exemplo resolvido + variação para o aluno adaptar. Desafio: uma "calculadora de parcelamento" que avisa quando a parcela estoura 30% da renda. |
| 3.3 | pandas essencial: a planilha com superpoderes | vídeo | 20min | O pandas apresentado como planilha programável: DataFrame e Series, ler dados com `read_csv`, selecionar colunas, filtrar linhas com condições (`df[df["uf"] == "SP"]`), criar colunas calculadas e a dupla de ouro `value_counts()` + `groupby()`. Cada operação é mostrada lado a lado com o equivalente em planilha (filtro, coluna nova, tabela dinâmica) para ancorar no que o aluno já conhece dos módulos 1 e 2. |
| 3.4 | Explorando o e-commerce brasileiro com pandas | prática (Colab) | 110min | Análise guiada de uma amostra do dataset público Olist (e-commerce brasileiro real, disponível no Kaggle): pedidos com estado, categoria, preço, frete e prazo de entrega. O aluno filtra por estado, cria a coluna `custo_total` (preço + frete), agrupa por categoria e por UF, calcula o kit dos 7 números do módulo 2 com `describe()` e responde três perguntas de negócio. Desafio com TODOs: descobrir a categoria com maior frete médio proporcional e o estado com maior prazo mediano de entrega, e escrever duas frases de recomendação para o lojista. |
| 3.5 | Quiz do Módulo 3 — Python e pandas | quiz | 15min | Cinco questões de leitura e previsão de código: valor de expressões simples, efeito de um filtro booleano, criação de coluna calculada, resultado de um `groupby` e diagnóstico do erro mais comum do iniciante no Colab (células fora de ordem). |

### Quiz do Módulo 3 (com gabarito)

**Q1.** O que o código `compras = ["arroz", "feijão", "café"]` seguido de `print(len(compras))` exibe?
- a) 3, porque `len` conta quantos itens a lista tem. ✅
- b) 15, porque `len` conta todas as letras dos itens da lista.
- c) "arroz, feijão, café", porque `print` sempre exibe o conteúdo completo.

*Explicação: `len` (de length, comprimento) devolve o número de ELEMENTOS da lista — aqui, 3 itens. Para contar letras seria preciso medir cada texto individualmente, e o `print` exibe o que recebe: neste caso, o resultado de `len`, não a lista.*

**Q2.** Em um DataFrame `df` de pedidos, o que a linha `df[df["uf"] == "SP"]` faz?
- a) Apaga do DataFrame todos os pedidos que não são de São Paulo.
- b) Seleciona (filtra) apenas as linhas cujo valor da coluna `uf` é "SP", sem alterar o DataFrame original. ✅
- c) Cria uma nova coluna chamada "SP" preenchida com verdadeiro e falso.

*Explicação: a condição `df["uf"] == "SP"` gera uma máscara de verdadeiros/falsos, e o colchete externo usa essa máscara para exibir só as linhas verdadeiras — o equivalente ao filtro da planilha. O `df` original permanece intacto; para guardar o recorte, atribui-se a uma variável (`pedidos_sp = ...`).*

**Q3.** O que acontece ao executar `df["custo_total"] = df["preco"] + df["frete"]`?
- a) O pandas cria (ou substitui) a coluna `custo_total`, somando preço e frete linha a linha para todos os pedidos de uma vez. ✅
- b) O pandas soma todos os preços e todos os fretes do DataFrame e guarda um único número total.
- c) Nada — para criar colunas novas é obrigatório usar um laço `for` percorrendo cada linha.

*Explicação: é a coluna calculada da planilha em versão programável — o pandas opera vetorialmente, linha a linha, sem laço nenhum. O resultado é uma coluna nova com um valor por pedido; a soma total única seria `df["preco"].sum() + df["frete"].sum()`.*

**Q4.** A tabela `df` tem 5.000 pedidos de 27 UFs. O que `df.groupby("uf")["preco"].mean()` retorna?
- a) Um único número: o preço médio de todos os 5.000 pedidos.
- b) 5.000 linhas, cada uma com a média da sua própria UF repetida.
- c) 27 valores — o preço médio dos pedidos de cada UF, um por estado. ✅

*Explicação: o `groupby` é a tabela dinâmica do pandas: "calcule ISTO (média de preço) agrupado por AQUILO (UF)". Ele colapsa as 5.000 linhas em um resultado por grupo — 27 UFs, 27 médias. A média geral única seria `df["preco"].mean()`, sem groupby.*

**Q5.** Você abre seu notebook no Colab, executa direto a célula da análise e recebe `NameError: name 'df' is not defined`. Qual é a causa mais provável e a correção?
- a) O Colab está fora do ar; basta aguardar alguns minutos e tentar de novo.
- b) A sessão começou zerada e a célula que cria o `df` ainda não foi executada; execute as células na ordem, do topo para baixo (ou use "Executar tudo"). ✅
- c) O pandas não funciona no plano gratuito do Colab; é preciso instalar o Python no computador.

*Explicação: cada sessão do Colab começa com a memória vazia — variáveis só existem depois que a célula que as cria roda. É o erro mais comum do iniciante e a correção é sempre a mesma: rodar da primeira célula para baixo. O pandas é gratuito no Colab e o erro não indica instabilidade do serviço.*

---

## Módulo 4 — Visualização e storytelling com dados (4h)

**Objetivo geral:** ao final, o aluno escolhe o tipo de gráfico pela pergunta (comparação, tendência, distribuição, relação), constrói gráficos legíveis com matplotlib no Colab, aplica as técnicas de storytelling (título-afirmação, destaque, anotação) e monta um primeiro mini-painel no Looker Studio como degustação da trilha de Análise de Dados.

**Nota de posicionamento:** o design de dashboards executivos (KPIs, hierarquia, persona, regra dos 5 segundos) pertence ao curso de Análise de Dados e não é coberto aqui — a aula 4.4 é explicitamente um primeiro contato com o Looker Studio, não um módulo de BI. O foco deste módulo é o gráfico do analista (matplotlib, histograma e dispersão incluídos) e a narrativa escrita.

### Aulas

| # | Aula | Tipo | Duração | Resumo |
|---|---|---|---|---|
| 4.1 | O gráfico certo para cada pergunta: comparação, tendência, distribuição e relação | vídeo | 20min | As quatro intenções que resolvem quase tudo: COMPARAR categorias (barras ordenadas), acompanhar TENDÊNCIA no tempo (linhas), ver a DISTRIBUIÇÃO de uma variável (histograma e boxplot — reaproveitando o módulo 2) e investigar a RELAÇÃO entre duas variáveis numéricas (dispersão). Antes de escolher o gráfico, nomeie a intenção. Galeria de acertos e desastres com os dados do curso, incluindo o clássico: pizza de 15 fatias. |
| 4.2 | Seus primeiros gráficos com matplotlib no Colab | prática (Colab) | 80min | Notebook guiado sobre os dados da Olist e do IBGE já conhecidos: gráfico de barras ordenado (frete médio por estado), linha (pedidos por mês), histograma (prazo de entrega) e dispersão (frete × distância estimada). Para cada um: versão crua → versão legível (título, rótulos de eixos, formatação) → versão com destaque (uma barra colorida, o resto neutro). Desafio: reproduzir um gráfico-alvo apenas olhando a imagem final. |
| 4.3 | Storytelling com dados: o gráfico que fala sozinho | vídeo | 18min | A diferença entre mostrar dados e contar um achado: título-afirmação ("Frete no Norte custa quase o dobro da média nacional" em vez de "Gráfico de fretes por região"), destacar UM elemento e apagar o resto, anotar o ponto que importa e cortar tudo que não serve à mensagem. Estrutura do mini-relatório de análise em três blocos — pergunta, achados com números, recomendação com ressalva — que será exigida no projeto final. |
| 4.4 | Primeiro contato com o Looker Studio: do Sheets ao mini-painel | prática (Looker Studio) | 75min | Degustação honesta da ferramenta de BI: conectar a planilha do ENEM do módulo 2 como fonte de dados, entender dimensões × métricas e montar um mini-painel de uma página com um scorecard, um gráfico de barras por UF e um filtro por tipo de escola, publicando por link. Fecha com o convite transparente: quem se encantou por painéis tem a trilha de Análise de Dados para Decisões Estratégicas esperando na Academy. |
| 4.5 | Quiz do Módulo 4 — Visualização e storytelling | quiz | 15min | Cinco questões sobre a escolha do gráfico pela intenção (relação → dispersão; distribuição → histograma), título-afirmação, técnica do destaque único e a estrutura do mini-relatório em três blocos. |

### Quiz do Módulo 4 (com gabarito)

**Q1.** Você quer investigar se pedidos entregues a distâncias maiores pagam fretes maiores (duas variáveis numéricas). Qual gráfico responde melhor?
- a) Gráfico de pizza, com uma fatia para cada faixa de frete.
- b) Gráfico de dispersão (scatter), com distância em um eixo e frete no outro. ✅
- c) Gráfico de barras com o frete médio geral de todos os pedidos.

*Explicação: a intenção aqui é RELAÇÃO entre duas variáveis numéricas — e o gráfico de dispersão foi feito para isso: cada pedido vira um ponto, e o padrão da nuvem revela se frete cresce com distância. Pizza compara partes de um todo, e uma única barra média esconde justamente a relação que se quer ver.*

**Q2.** Para mostrar como os prazos de entrega se espalham (maioria rápida, alguns pedidos muito demorados), o gráfico adequado é:
- a) Um histograma (ou boxplot), pois a intenção é ver a DISTRIBUIÇÃO da variável. ✅
- b) Um gráfico de linhas, pois prazos envolvem tempo.
- c) Um scorecard com o prazo médio, pois resume tudo em um número.

*Explicação: "como os valores se espalham" é pergunta de distribuição — histograma mostra a silhueta (e a cauda dos pedidos demorados); o boxplot resume com quartis e outliers. Linhas servem para tendência ao longo de datas (outra intenção), e um único número médio esconde exatamente a cauda que interessa.*

**Q3.** Qual título segue a técnica do título-afirmação da aula 4.3?
- a) "Gráfico de barras dos fretes médios por região do Brasil".
- b) "Análise de fretes — dados de 2025".
- c) "Frete médio no Norte custa quase o dobro da média nacional". ✅

*Explicação: o título-afirmação entrega o ACHADO, não a descrição do gráfico — quem lê só o título já sai sabendo a conclusão. "Gráfico de barras de..." descreve o óbvio e desperdiça a linha mais lida da figura; "Análise de fretes" não afirma nada.*

**Q4.** Em um gráfico de barras com as 27 UFs, qual técnica de destaque comunica melhor que o seu achado está em um único estado?
- a) Pintar a barra do estado-achado em uma cor forte e deixar todas as outras em cinza neutro. ✅
- b) Usar uma cor vibrante diferente para cada uma das 27 barras.
- c) Aplicar efeito 3D para dar mais impacto visual ao conjunto.

*Explicação: destaque funciona por contraste — UMA cor forte contra um fundo neutro guia o olho direto ao achado. Vinte e sete cores competindo é o mesmo que nenhuma, e o 3D distorce as proporções que o gráfico existe para preservar.*

**Q5.** A estrutura do mini-relatório de análise ensinada no módulo é:
- a) Pergunta → achados com números → recomendação com ressalva. ✅
- b) Capa → 10 gráficos sem texto → agradecimentos.
- c) Recomendação primeiro, sem números, para não cansar o leitor.

*Explicação: os três blocos contam a investigação completa: a pergunta dá o contexto, os achados trazem a evidência (números e gráficos que falam sozinhos) e a recomendação fecha com a ação — incluindo a ressalva honesta sobre limites dos dados. Gráficos sem narrativa não se defendem, e recomendação sem número é opinião.*

---

## Módulo 5 — Panorama de ML, projeto final e sua trilha (4h30)

**Objetivo geral:** ao final, o aluno situa o machine learning e a IA generativa no mapa da ciência de dados (sabendo quando cada um é necessário), conhece o ecossistema de dados de 2026, executa um projeto final integrador aplicando o método completo e escolhe conscientemente sua próxima trilha na Academy.

**Nota de posicionamento:** este módulo NÃO ensina algoritmos, métricas nem treinamento de modelos — regressão, classificação, clustering e avaliação são o território do curso Fundamentos de Machine Learning. Aqui o ML aparece apenas como panorama: o que é, que tipos de pergunta responde e como decidir se a sua pergunta precisa dele.

### Aulas

| # | Aula | Tipo | Duração | Resumo |
|---|---|---|---|---|
| 5.1 | Onde o Machine Learning entra na história (e onde entra a IA generativa) | vídeo | 20min | O degrau seguinte do método: quando a pergunta deixa de ser "o que aconteceu?" e vira "o que vai acontecer com casos novos?", entra o ML — a técnica de aprender padrões a partir de exemplos históricos. Panorama sem algoritmos: exemplos de perguntas preditivas nos dados do curso, o alerta de que ML exige dados de qualidade e a distinção entre o ML preditivo e a IA generativa copilota de 2026. Fecha com o critério prático: análise descritiva responde a maioria das perguntas; ML entra quando prever vale dinheiro ou tempo. |
| 5.2 | O ecossistema de dados em 2026: times, ferramentas e como continuar aprendendo | leitura | 40min | Mapa do ecossistema sem jargão gratuito: como os papéis do módulo 1 se organizam em times reais, o caminho do dado da coleta ao painel, onde vivem as ferramentas que o aluno conheceu (planilha, notebook, BI) e o que existe além (bancos de dados, nuvem, orquestração — citados como paisagem, não como matéria). A IA generativa como copilota do analista — com o protocolo de responsabilidade: a IA propõe, o dado confirma, você assina. Fecha com o guia de portfólio: como publicar os notebooks do curso como primeiro portfólio público. |
| 5.3 | Projeto final integrador: sua investigação completa no Colab | prática (Colab) | 140min | O rito de passagem: o aluno escolhe um dos três datasets do curso (IBGE, ENEM ou Olist), formula uma pergunta específica própria e percorre as cinco etapas do método em um notebook-template com as seções prontas: pergunta, obtenção, exploração e limpeza, análise com estatística descritiva, dois gráficos com título-afirmação e mini-relatório final (pergunta → achados → recomendação com ressalva). Entrega: link do notebook, avaliado por rubrica — é a principal evidência prática do certificado. |
| 5.4 | Qual trilha seguir? Seu mapa na Giselle Falcão Academy | vídeo | 15min | Aula de orientação, cara a cara: o que você aprendeu nas 20 horas e as duas trilhas que se abrem. Quer prever, classificar e agrupar com modelos? Fundamentos de Machine Learning (24h). Quer dominar dados abertos, SQL, BigQuery e dashboards para decisões de gestão? Análise de Dados para Decisões Estratégicas (30h). Critérios honestos de escolha pelo tipo de pergunta que mais te encantou no curso — e o lembrete de que as trilhas se somam: a ordem é escolha, não exclusão. |
| 5.5 | Quiz do Módulo 5 — Panorama e integração | quiz | 20min | Cinco questões integradoras: o critério análise descritiva × ML, o papel da IA generativa como copilota, a natureza do aprendizado por exemplos, a razão de todo projeto terminar em recomendação e a escolha de trilha adequada a cada perfil de pergunta. |

### Quiz do Módulo 5 (com gabarito)

**Q1.** Qual das perguntas abaixo é a que JUSTIFICA machine learning, em vez de análise descritiva?
- a) "Qual foi a categoria de produto mais vendida no último trimestre?"
- b) "Qual foi o prazo mediano de entrega por estado no ano passado?"
- c) "Qual a probabilidade de ESTE novo pedido atrasar, antes de ele ser despachado?" ✅

*Explicação: as duas primeiras perguntas olham para o passado e se respondem com contagem, mediana e agrupamento — análise descritiva pura, o território dos módulos 2 e 3. A terceira exige prever um caso novo e individual a partir de padrões aprendidos no histórico: é exatamente o degrau em que o ML entra no método.*

**Q2.** Sobre o papel da IA generativa no trabalho de dados em 2026, a postura correta do curso é:
- a) A IA generativa substitui o método: basta pedir a análise pronta e usar a resposta.
- b) A IA generativa é uma copilota que acelera código e rascunhos, mas pode errar com confiança — a validação nos dados e a responsabilidade pela decisão continuam humanas. ✅
- c) A IA generativa não tem nenhuma utilidade em análise de dados e deve ser evitada.

*Explicação: o protocolo da casa — a IA propõe, o dado confirma, você assina. Assistentes escrevem código e rascunham análises com velocidade real, mas alucinam números e justificativas com a mesma fluência; quem domina o método usa a IA como alavanca, quem não domina vira refém dela.*

**Q3.** Qual afirmação sobre machine learning está correta?
- a) O ML aprende padrões a partir de exemplos históricos — por isso a qualidade e a representatividade dos dados limitam a qualidade de qualquer modelo. ✅
- b) O ML dispensa dados históricos: o algoritmo descobre as respostas sozinho, por lógica.
- c) O ML sempre supera uma análise descritiva simples, qualquer que seja a pergunta.

*Explicação: aprender com exemplos é a definição do panorama da aula 5.1 — e a consequência direta é o garbage in, garbage out do módulo 1: dados ruins ou enviesados produzem modelos ruins ou enviesados. Sem histórico não há de onde aprender, e para perguntas descritivas ("o que aconteceu?") a análise simples responde melhor, mais rápido e mais barato.*

**Q4.** Por que o projeto final exige terminar com uma recomendação (e não apenas com gráficos e tabelas)?
- a) Porque a recomendação deixa o notebook maior e mais impressionante para o portfólio.
- b) Porque a etapa 5 do método é a comunicação: análise que não aponta uma ação não apoia decisão nenhuma — e apoiar decisões é a definição de ciência de dados. ✅
- c) Porque gráficos e tabelas são elementos opcionais em uma análise de dados.

*Explicação: fecha o ciclo aberto na aula 1.1 — extrair conhecimento ÚTIL para apoiar DECISÕES. O mini-relatório (pergunta → achados → recomendação com ressalva) é a entrega que transforma a investigação em valor; gráficos e números são a evidência, não o destino. "Análise sem decisão é hobby caro."*

**Q5.** Ao final do curso, um aluno diz: "o que mais me encantou foi responder perguntas de gestão com painéis — quero dominar SQL e dashboards". Qual trilha da Academy é a continuação natural?
- a) Análise de Dados para Decisões Estratégicas, que aprofunda dados abertos, SQL no BigQuery e dashboards no Looker Studio. ✅
- b) Fundamentos de Machine Learning, que aprofunda regressão, classificação e clustering.
- c) Nenhuma — quem conclui o curso de fundamentos já domina SQL e BI e não precisa continuar.

*Explicação: o mapa da aula 5.4 casa a trilha com o tipo de pergunta que encanta o aluno: painéis, SQL e decisões de gestão são o coração da trilha de Análise de Dados; prever e classificar com modelos é o coração da trilha de ML. E o curso de fundamentos abre as portas — SQL e BI profundos ficam justamente nas trilhas, que se somam em qualquer ordem.*
