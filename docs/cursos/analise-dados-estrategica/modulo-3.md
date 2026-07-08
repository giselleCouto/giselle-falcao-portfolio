# Módulo 3 — Estatística para decidir (sem sofrimento)

**Curso:** Análise de Dados para Decisões Estratégicas · Giselle Falcão Academy
**Carga do módulo:** 4h30 · **Aulas:** 2 vídeos, 1 leitura, 1 prática (Colab), 1 quiz

**Objetivo geral do módulo:** ao final, o aluno interpreta medidas de centro e dispersão no contexto da gestão, escolhe entre média e mediana conforme a forma da distribuição, reconhece os limites de correlações em políticas públicas, identifica vieses de amostra em dados administrativos e calcula estatísticas descritivas de uma base real de sinistros de trânsito (InfoSiga SP) no Google Colab — reportando números com honestidade, sem paralisar a decisão.

---

## Aula 3.1 — A média mente: centro, dispersão e distribuições para gestores

**Tipo:** vídeo · **Duração:** 20min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Definir** (lembrar) média, mediana, moda, desvio e percentil em linguagem de gestão. 2. **Interpretar** (compreender) por que uma mesma média pode esconder distribuições completamente diferentes. 3. **Escolher** (analisar) entre média e mediana conforme a assimetria da distribuição. 4. **Aplicar** (aplicar) percentis para formular metas e prazos honestos (ex.: P90 como prazo de compromisso). |
| **Duração** | 20 min de vídeo + ~10 min de atividade no fórum |
| **Materiais** | Slides (13); planilha limpa do SP156 (Módulo 2) como referência; link para indicadores do ObservaSampa |
| **Sequência didática** | **Abertura (0–1:30):** gancho com o relatório do "tempo médio de 12 dias". **Desenvolvimento (1:30–17:30):** o caso dos 12 dias → média, mediana e moda → assimetria e a regra prática → dispersão (amplitude e desvio) → percentis e metas → o kit de reporte do gestor. **Fechamento (17:30–20:00):** síntese, tarefa no fórum, ponte para a leitura 3.2. |
| **Avaliação** | Formativa: tarefa no fórum ("um número médio que circula no seu trabalho — e o que a mediana revelaria"). Somativa: questões 1 e 2 do quiz do módulo. |

### b) Roteiro de gravação

> Tom: professora experiente conversando. Ler no teleprompter com naturalidade — pausas nos "…", sorrir nos parênteses de conexão. **[CÂMERA]** = rosto na tela; **[SLIDE n]** = mostrar slide.

**[0:00–1:30] — [CÂMERA] Abertura**

Oi! Bem-vindo, bem-vinda ao Módulo 3. Se você chegou até aqui, você já limpou uma base de verdade e já respondeu perguntas de gestão com tabela dinâmica. Agora a gente sobe um degrau que assusta muita gente à toa: estatística. E eu prometi no título — vai ser sem sofrimento. Nada de fórmula grega, nada de demonstração. Estatística, para quem decide, é basicamente uma coisa: aprender a desconfiar de um número resumido antes de assinar embaixo dele.

Deixa eu te dar o gancho da aula. Imagina que chega na sua mesa um relatório assim: "tempo médio de atendimento dos chamados: 12 dias". Parece um número honesto, né? Pois é… esse número pode estar te contando uma mentira — sem que ninguém tenha mentido. Hoje você vai entender como, e vai sair daqui com um kit de três números que conta a verdade.

**[1:30–4:00] — [SLIDE 2 → SLIDE 3] O caso dos 12 dias**

[SLIDE 2] Vamos abrir esse relatório. Dois serviços da cidade, os dois com tempo médio de resolução de 12 dias. Idênticos no relatório. Só que quando a gente olha chamado por chamado — aquela granularidade fina que você aprendeu no Módulo 1 — aparece isto: [SLIDE 3] no serviço A, quase todos os chamados são resolvidos entre 10 e 14 dias. Previsível, estável. No serviço B… metade dos chamados é resolvida em 2 dias, e a outra metade se arrasta por 22. A média dos dois? Doze. Igualzinha.

Agora me diz: você gerencia esses dois serviços do mesmo jeito? Claro que não. No serviço B tem duas realidades convivendo — talvez dois tipos de demanda, talvez duas equipes, talvez um gargalo escondido. E a média, sozinha, apagou essa história. Eu vejo isso direto nos meus projetos de consultoria: o número médio no slide da diretoria escondendo exatamente o problema que a diretoria precisava enxergar.

A média não mente por maldade. Ela mente por resumir demais. E o antídoto não é matemática avançada — é conhecer mais dois ou três números que resumem melhor.

**[4:00–7:00] — [SLIDE 4 → SLIDE 5] Média, mediana e moda**

[SLIDE 4] Vamos ao vocabulário, com calma. A **média** você já conhece: soma tudo, divide pelo total. Ela usa todos os valores — e essa é a força e a fraqueza dela, porque um valor extremo puxa a média para longe do caso típico.

A **mediana** é outra filosofia: coloque todos os casos em fila, do menor para o maior, e pegue o do meio. Metade dos casos está abaixo dela, metade acima. A mediana não liga para extremos: se o chamado mais demorado levar 200 dias em vez de 22, a mediana nem se mexe.

E a **moda** é o valor mais frequente — útil para categorias: qual é o serviço mais pedido, qual é o canal mais usado. Para categoria, aliás, é a única das três que faz sentido: não existe "distrito médio".

[SLIDE 5] O exemplo clássico, que eu quero que você guarde para sempre, é salário. Imagina uma equipe de dez pessoas: nove ganham na faixa de três mil reais, e uma ganha cinquenta mil. A média salarial dessa equipe passa de sete mil e setecentos reais — um número que não descreve **nenhuma** das dez pessoas. A mediana? Três mil. Quem descreve melhor a equipe? … Pois é. E é por isso que renda, no Brasil e no mundo, se reporta com mediana: a distribuição de renda tem uma cauda longa de valores altos que arrasta a média para cima. Quando você ler "renda média", desconfie; quando ler "renda mediana", respire.

**[7:00–10:00] — [SLIDE 6 → SLIDE 7] Assimetria: a forma da distribuição decide**

[SLIDE 6] Isso nos leva ao conceito central da aula: a **forma da distribuição**. Distribuição é só o jeito como os valores se espalham — e um histograma, aquele gráfico de barras de faixas de valores, mostra essa forma. Quando a distribuição é **simétrica** — um morrinho equilibrado, como altura de pessoas adultas — média e mediana praticamente coincidem, e a média serve muito bem.

Mas quando a distribuição é **assimétrica** — um morro encostado de um lado com uma cauda comprida do outro — média e mediana se separam. E aqui vem a notícia importante para você: quase tudo que a gestão pública mede é assimétrico. Tempo de atendimento: a maioria resolve rápido, uns poucos casos se arrastam meses. Renda. Tamanho de fila. Valor de contrato. Consumo de água por domicílio. Tudo com cauda longa para a direita.

[SLIDE 7] Então anota a regra prática, que é o coração desta aula: **distribuição assimétrica pede mediana**. Se média e mediana estão distantes uma da outra, isso já é um diagnóstico: tem cauda longa aí, e o caso típico não é o que a média sugere. No nosso relatório dos 12 dias: se a mediana do serviço B é 2 dias e a média é 12… a própria distância entre os dois números está gritando que existe uma minoria de casos travados puxando tudo. Olha que elegante: você ainda nem abriu o histograma e dois numerozinhos já te contaram a história.

**[10:00–13:00] — [SLIDE 8 → SLIDE 9] Dispersão: o tamanho do espalhamento**

[SLIDE 8] Segundo bloco do kit: **dispersão**. Centro diz onde os casos estão; dispersão diz o quanto eles se espalham. A medida mais simples é a **amplitude**: do menor ao maior valor — "os chamados levaram de 1 a 94 dias". Fácil de comunicar, mas sensível demais a um caso extremo.

A medida mais usada é o **desvio padrão**. Esquece a fórmula: pensa nele como a régua do quanto os casos costumam fugir do típico. Desvio pequeno: serviço previsível, todo mundo perto da média. Desvio grande: montanha-russa. [SLIDE 9] Nossos dois serviços de 12 dias: o serviço A tem desvio pequeno — uns 2 dias; o serviço B tem desvio de uns 10 dias. Mesma média, desvios completamente diferentes — e é o desvio que revela qual dos dois merece a sua atenção de gestor.

Na minha tese de doutorado, em modelagem matemática, a gente tinha um ditado: quem só olha a média gerencia um sistema que não existe. O sistema real vive na dispersão — é lá que moram os casos que viram reclamação na ouvidoria e manchete no jornal.

**[13:00–16:00] — [SLIDE 10 → SLIDE 11] Percentis: a régua das metas honestas**

[SLIDE 10] Terceiro bloco, e talvez o mais útil da sua vida prática: **percentis**. O percentil 25 é o valor abaixo do qual está um quarto dos casos. O percentil 50… é a mediana, olha ela aí de novo. E o **percentil 90** — o P90 — é o valor abaixo do qual estão 90% dos casos.

Por que isso importa tanto? Porque percentil é a linguagem das **metas honestas**. Se o P90 do tempo de resolução de um serviço é 25 dias, você pode dizer ao cidadão: "nove em cada dez chamados são resolvidos em até 25 dias". Isso é um compromisso que os dados sustentam. Prometer a média — "resolvemos em 12 dias" — é prometer um prazo que metade dos casos vai estourar. E prazo estourado, no serviço público, vira desconfiança.

[SLIDE 11] É assim que operações sérias definem acordo de nível de serviço, dentro e fora do governo: pela cauda, não pelo centro. E repare como os indicadores do ObservaSampa, que você conheceu no Módulo 1, ganham outra profundidade quando você pergunta: esse indicador é uma média? Uma mediana? Um percentil? A mesma cidade conta histórias diferentes dependendo da régua.

**[16:00–17:30] — [SLIDE 12] O kit de reporte do gestor**

[SLIDE 12] Juntando tudo, o kit que eu quero que você carregue para o resto do curso — e da carreira. Ao reportar qualquer indicador numérico, entregue **três números e um contexto**: a **mediana** (o caso típico), o **P90** (o compromisso com a cauda), e o **n** — quantos casos entraram na conta, porque uma mediana de 8 casos não vale o mesmo que uma de 8 mil, e disso a gente vai falar na aula 3.3. E o contexto: o período e a fonte. A média? Ela continua no time — para distribuições simétricas, e para contas de total, tipo estimar custo: total é média vezes quantidade, aí ela é insubstituível. O erro não é usar a média; é usá-la sozinha, sem saber a forma da distribuição.

**[17:30–20:00] — [CÂMERA] Fechamento**

Recapitulando em três frases. Primeira: a média resume demais — e em distribuição assimétrica, que é o padrão da gestão pública, ela engana; assimétrica pede mediana. Segunda: dispersão é onde mora o risco — mesma média, desvios diferentes, decisões diferentes. Terceira: percentil é a régua das promessas honestas — meta séria se escreve com P90, não com média.

Sua tarefa de hoje: pega um número médio que circula no seu trabalho — tempo médio de alguma coisa, custo médio, atendimento médio — e escreve no fórum, em duas ou três linhas: que decisão esse número sustenta hoje, e o que você desconfia que a mediana revelaria. Eu leio todas as respostas, e algumas delas costumam render as melhores discussões do curso.

Na próxima aula, uma leitura de uns 45 minutos, a gente ataca a armadilha mais perigosa da estatística — aquela que derruba até gente experiente: correlação não é causalidade. Você vai ver casos reais de políticas públicas em que dois números andando juntos levaram gestores a conclusões erradas… e vai ganhar um checklist de quatro perguntas para nunca cair nessa. Te vejo lá. Um abraço!

### c) Estrutura de slides (13 slides)

1. **Capa** — "A média mente: centro, dispersão e distribuições para gestores" · Módulo 3 · Aula 1 · logo Giselle Falcão Academy (fundo roxo, título em lavanda).
2. **O caso dos 12 dias** — bullets: dois serviços, ambos "tempo médio: 12 dias"; relatório idêntico, realidades opostas; a pergunta: dá para gerenciar os dois do mesmo jeito?
3. **Mesma média, histórias diferentes** — dois mini-histogramas lado a lado: serviço A (concentrado entre 10 e 14 dias) × serviço B (metade em ~2 dias, metade em ~22); frase: "a média não mente por maldade — mente por resumir demais".
4. **Média, mediana e moda** — tabela: média (soma ÷ total; usa todos os valores; sensível a extremos), mediana (o do meio da fila; ignora extremos), moda (o mais frequente; a única que serve para categorias).
5. **O exemplo do salário** — bullets: equipe de 10 — nove ganham R$ 3 mil, um ganha R$ 50 mil; média ≈ R$ 7,7 mil (não descreve ninguém); mediana = R$ 3 mil; por isso renda se reporta com mediana.
6. **A forma da distribuição** — dois histogramas: simétrica (média ≈ mediana) × assimétrica com cauda à direita (média > mediana); bullets: tempo de atendimento, renda, filas, contratos — quase tudo na gestão é assimétrico.
7. **A regra prática** — frase grande (teal sobre lavanda): "distribuição assimétrica pede MEDIANA"; bullet: média e mediana distantes = diagnóstico de cauda longa, antes mesmo do histograma.
8. **Dispersão: amplitude e desvio padrão** — bullets: centro diz onde, dispersão diz o quanto espalha; amplitude (mín–máx): simples, sensível a extremos; desvio padrão: a régua do quanto os casos fogem do típico.
9. **Os 12 dias, de novo** — tabela comparativa: serviço A (média 12, desvio ~2 — previsível) × serviço B (média 12, desvio ~10 — montanha-russa); frase: "quem só olha a média gerencia um sistema que não existe".
10. **Percentis** — bullets: P25 = ¼ dos casos abaixo; P50 = mediana; P90 = 90% dos casos abaixo; leitura em voz alta: "9 em cada 10 chamados resolvidos em até X dias".
11. **Metas honestas se escrevem com P90** — bullets: prometer a média = estourar o prazo em metade dos casos; compromisso pela cauda, não pelo centro; pergunte dos indicadores (ObservaSampa): é média, mediana ou percentil?
12. **O kit de reporte do gestor** — lista: mediana (caso típico) + P90 (compromisso) + n (quantos casos) + período e fonte; a média sozinha, nunca — mas ela segue no time (distribuições simétricas e contas de total).
13. **Sua tarefa de hoje** — "No fórum: um número médio do seu trabalho + o que a mediana revelaria (2–3 linhas)" + teaser da leitura 3.2 (correlação × causalidade).

---

## Aula 3.2 — Correlação não é causalidade: lições de políticas públicas

**Tipo:** leitura · **Duração:** 45min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Explicar** (compreender) o que uma correlação afirma — e o que ela não afirma. 2. **Distinguir** (analisar) os três mecanismos que fazem correlação enganar: variável de confusão, causalidade reversa e coincidência. 3. **Analisar** (analisar) casos reais de políticas públicas em que a correlação levou a conclusões erradas. 4. **Julgar** (avaliar) afirmações causais na imprensa e em relatórios usando o checklist das 4 perguntas. |
| **Duração** | ~45 min de leitura + atividade no fórum |
| **Materiais** | Texto na plataforma (estrutura abaixo); checklist das 4 perguntas para download (PDF de 1 página) |
| **Sequência didática** | **Abertura:** o caso das câmeras e do crime. **Desenvolvimento:** o que correlação diz e não diz → os três mecanismos do engano → casos comentados brasileiros → como "associado a" vira "causa" no discurso público. **Fechamento:** checklist das 4 perguntas + atividade da manchete + ponte para a aula 3.3. |
| **Avaliação** | Formativa: atividade da manchete no fórum. Somativa: questão 3 do quiz do módulo. |

### Estrutura do texto da leitura (para redação na plataforma)

1. **Abertura (2 parágrafos).** Caso-gancho: uma cidade instala câmeras de monitoramento em dezenas de pontos; um ano depois, os furtos caíram 18% e a manchete diz "câmeras derrubam criminalidade". Só que, no mesmo período, os furtos caíram na cidade vizinha — que não instalou câmera nenhuma. O que aconteceu? Talvez as câmeras ajudem; talvez a queda fosse tendência regional; talvez as câmeras tenham ido para os pontos onde o crime já estava caindo. A leitura de hoje é sobre essa dúvida — a mais importante da análise de dados.
2. **O que uma correlação afirma — e o que não afirma (3 parágrafos).** Correlação = dois indicadores que se movem juntos (positiva: sobem juntos; negativa: um sobe, o outro desce). É uma constatação sobre os números, não sobre o mundo: descreve associação, não explica o motivo. Correlação forte é uma pista valiosa — quase toda descoberta começa numa correlação —, mas pista não é veredicto. A frase a memorizar: *correlação é convite para investigar, não licença para concluir.*
3. **Os três mecanismos do engano (seção central, ~35% do texto).**
   - **Variável de confusão** — um terceiro fator que causa os dois. Exemplo didático universal: venda de sorvete e afogamentos sobem juntos — o verão causa ambos. Exemplo de gestão: escolas com mais computadores por aluno têm notas maiores; antes de comprar computadores para todo mundo, note que escolas em bairros de maior renda têm mais equipamentos **e** alunos com mais suporte em casa — a renda do entorno confunde a comparação. Se a análise não separa esse fator (comparando escolas de contexto semelhante), a correlação diz pouco.
   - **Causalidade reversa** — a seta aponta para o outro lado. Exemplo: distritos com mais equipes de zeladoria registram mais chamados de zeladoria; a conclusão apressada ("equipe gera reclamação") ignora que as equipes foram alocadas **por causa** da demanda — e que presença de serviço aumenta o registro (o cidadão reclama mais quando percebe que adianta). Exemplo clássico de saúde: regiões com mais leitos hospitalares têm mais internações — os leitos foram construídos onde havia mais doentes.
   - **Coincidência (correlações espúrias)** — com dados suficientes, alguma coisa sempre se correlaciona com alguma coisa. Citar o acervo humorístico de "correlações espúrias" (séries temporais absurdas que se correlacionam quase perfeitamente, como consumo de queijo e acidentes domésticos nos EUA). Regra: quanto mais séries você compara, mais "padrões" de sorte aparecem — quem procura correlação em 200 pares de indicadores vai achar dezenas por puro acaso.
4. **Casos comentados de políticas públicas brasileiras (~30% do texto; cada caso: situação → conclusão apressada → o que os dados realmente permitiam dizer).**
   - **Caso 1 — "Distritos com mais UBS têm piores indicadores de saúde".** A conclusão absurda ("posto de saúde adoece") revela o mecanismo: as UBS são instaladas onde a necessidade é maior — direcionamento de política é causalidade reversa institucionalizada. Lição: todo equipamento público bem alocado vai "se correlacionar" com o problema que combate.
   - **Caso 2 — o ranking dos municípios pequenos.** Nos rankings de educação (IDEB) e saúde, municípios muito pequenos dominam tanto o topo quanto o fundo da lista. Não é mérito nem desastre: com poucas dezenas de alunos, uma turma boa ou um ano ruim move o índice inteiro — é a flutuação dos pequenos números (gancho para a aula 3.3). Lição: antes de premiar ou punir pelo ranking, olhe o tamanho do denominador.
   - **Caso 3 — "Bairros com mais chamados de iluminação no SP156 têm mais furtos noturnos".** Antes de concluir que escuridão causa furto (plausível!), o analista honesto testa: os dois podem refletir densidade e circulação de pessoas (confusão); bairros mais organizados reclamam mais **e** registram mais boletins (viés de registro duplo). A correlação sustenta a hipótese e justifica um piloto — não sustenta a manchete.
5. **Como "associado a" vira "causa" no discurso público (2–3 parágrafos).** A cadeia de amplificação: o estudo diz "associação"; a assessoria escreve "ligado a"; a manchete estampa "causa"; a rede social decreta "prova". Ninguém mentiu — cada elo só arredondou um pouco. O gestor de dados precisa fazer o caminho inverso: ao ler "X causa Y", perguntar o que o dado original media. E ao **escrever** seus próprios relatórios, escolher os verbos com o mesmo cuidado que escolhe os números: "está associado a", "coincide com", "é compatível com a hipótese de" — o vocabulário da honestidade não enfraquece o texto; blinda o autor.
6. **O checklist das 4 perguntas (seção-chave, formato de caixa destacada).** Antes de atribuir causa a uma correlação, pergunte: **(1) Terceiro fator?** — existe algo que cause os dois ao mesmo tempo (renda, densidade, estação do ano)? **(2) Seta invertida?** — o suposto efeito pode estar causando o suposto causador (ou a política foi direcionada para onde o problema já existia)? **(3) Acaso?** — quantas comparações foram feitas até achar essa? O n é pequeno? A relação some quando muda o período? **(4) Mecanismo + teste?** — existe explicação plausível de como X causaria Y, e dá para testar de forma mais forte (comparar antes/depois com um grupo de comparação, um piloto em área limitada)? Só quando as quatro respostas sobrevivem é que "associado a" começa a merecer virar "causa". Fechar com a nota de esperança: o padrão-ouro para separar causa de coincidência — experimentos e comparações controladas — existe e é cada vez mais usado em políticas públicas (avaliação de impacto); saber disso já coloca o aluno à frente da maioria das discussões.
7. **Fechamento + atividade.** "Agora é sua vez: encontre uma manchete ou um trecho de relatório do seu campo que afirme ou insinue causalidade ('X reduz Y', 'X é responsável por Y'). Aplique as 4 perguntas e poste no fórum: o link, a resposta a cada pergunta em uma linha, e seu veredicto — a conclusão causal se sustenta?" Ponte: "Na próxima aula, em vídeo, a gente encara a segunda fonte de excesso de confiança: achar que o dado que temos representa a realidade inteira. Spoiler: quem liga para o 156 não é a cidade inteira."

---

## Aula 3.3 — Amostras, incerteza e o tamanho da dúvida

**Tipo:** vídeo · **Duração:** 22min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Diferenciar** (compreender) população, amostra e dado administrativo. 2. **Identificar** (analisar) vieses de seleção em bases da gestão pública (quem entra e quem fica de fora do registro). 3. **Interpretar** (compreender) margem de erro e flutuação amostral em linguagem de gestão. 4. **Formular** (criar) frases de reporte que comunicam incerteza sem paralisar a decisão. |
| **Duração** | 22 min de vídeo |
| **Materiais** | Slides (13); exemplos de pesquisas eleitorais recentes; base SP156 (Módulo 2) e InfoSiga (prática 3.4) como referência |
| **Sequência didática** | **Abertura (0–1:30):** o paradoxo da pesquisa eleitoral. **Desenvolvimento (1:30–19:00):** população × amostra → viés de seleção (o caso do 156) → o avião de Wald e o viés do sobrevivente → dado administrativo mede registro, não realidade → margem de erro e empate técnico → pequenos números → frases de reporte honesto. **Fechamento (19:00–22:00):** síntese + preparação para a prática com o InfoSiga. |
| **Avaliação** | Formativa: mini-desafio em tela (identificar o viés em três situações). Somativa: questões 4 e 5 do quiz do módulo. |

### b) Roteiro de gravação

**[0:00–1:30] — [CÂMERA] Abertura**

Oi de novo! Na leitura passada você aprendeu a desconfiar de correlações. Hoje a gente ataca a segunda fonte de excesso de confiança da análise de dados: acreditar que o dado que está na sua mão representa a realidade inteira. Quase nunca representa — e tudo bem, desde que você saiba **o quanto** não representa.

Começo com um paradoxo que intriga todo mundo. Como é que uma pesquisa eleitoral ouve duas mil pessoas… e acerta, com razoável precisão, a opinião de doze milhões de eleitores da cidade de São Paulo? E aí a pergunta irmã, que interessa mais ainda para o nosso curso: se duas mil pessoas bem escolhidas falam por doze milhões… por que um milhão de chamados do 156 **não** falam pela cidade inteira? … A resposta dessas duas perguntas é a aula de hoje.

**[1:30–4:30] — [SLIDE 2 → SLIDE 3] População, amostra e o segredo do sorteio**

[SLIDE 2] Vocabulário primeiro. **População** é o todo sobre o qual você quer concluir: todos os eleitores, todos os domicílios, todos os sinistros de trânsito do estado. **Amostra** é a parte que você efetivamente observa. Censo é quando você mede a população inteira — caro, raro, o IBGE faz de década em década. No resto da vida, trabalhamos com partes.

[SLIDE 3] E aqui está o segredo que responde o paradoxo: o que faz uma amostra valer não é o tamanho — é o **jeito de escolher**. A pesquisa eleitoral séria sorteia os entrevistados de um jeito que dá a cada perfil de eleitor a chance certa de ser ouvido. É um retrato em miniatura, tirado de propósito. Duas mil pessoas sorteadas assim valem mais do que duzentas mil que se ofereceram para responder. Tamanho sem sorteio é só volume; sorteio bem feito é representatividade.

**[4:30–8:30] — [SLIDE 4 → SLIDE 5 → SLIDE 6] Viés de seleção: quem liga para o 156 não é a cidade**

[SLIDE 4] Agora vira essa lente para os nossos dados do curso. O SP156 tem centenas de milhares de chamados por ano. É muito dado. Mas ninguém sorteou esses cidadãos — eles **se selecionaram**: ligou quem conhece o canal, quem tem tempo e facilidade com telefone ou aplicativo, quem acredita que reclamar adianta. E ficou de fora quem não conhece, quem desistiu, quem resolve por conta própria, quem nunca viu o poder público chegar no seu bairro e não gasta energia pedindo.

[SLIDE 5] Isso tem nome: **viés de seleção** — quando o processo que decide quem entra nos dados distorce o retrato. E a consequência prática é séria: um distrito com poucos chamados de zeladoria pode ser um distrito bem cuidado… ou um distrito que desistiu de pedir. O mesmo número, duas cidades diferentes. Se você distribuir equipes só pelo volume de chamados, pode estar premiando os bairros que mais reclamam — que não são necessariamente os que mais precisam. Olha o caso da aula 1.1 ganhando uma camada nova de sofisticação.

[SLIDE 6] O exemplo histórico que eu mais gosto — e que eu conto em toda palestra — é o do estatístico Abraham Wald, na Segunda Guerra. Os engenheiros queriam reforçar a blindagem dos aviões nos pontos onde os que **voltavam** da batalha tinham mais furos de bala. E o Wald disse: não — reforcem onde os que voltaram **não** têm furo nenhum. Porque avião atingido ali… não voltou para ser contado. Isso é o **viés do sobrevivente**: os dados que chegam até você já passaram por um filtro, e o que o filtro descartou pode ser exatamente a informação que importa. Toda base administrativa tem os seus "aviões que não voltaram". A pergunta profissional não é "o que os dados mostram?" — é "quem ficou de fora destes dados?".

**[8:30–12:00] — [SLIDE 7 → SLIDE 8] Dado administrativo mede o registro, não a realidade**

[SLIDE 7] Isso nos leva a uma distinção que eu queria tatuar em todo relatório público: **dado administrativo mede a demanda registrada, não a necessidade real**. Chamados do 156 medem quem reclamou. Boletins de ocorrência medem quem registrou. Fila de creche mede quem se inscreveu. Entre a realidade e o registro existe um funil — e o funil aperta mais para uns grupos do que para outros.

[SLIDE 8] E olha como isso conversa com a prática que vem aí. No InfoSiga, a base de sinistros de trânsito do estado de São Paulo que vamos usar no Colab, os **sinistros fatais** são muito bem registrados — um óbito aciona necessariamente o sistema de saúde, a perícia, o registro civil; é quase um censo. Já os sinistros leves, sem vítima, aquele toque de para-choque resolvido na conversa… boa parte nunca vira registro. Então uma "alta nos sinistros leves" pode ser alta de sinistros — ou alta de **registro**, porque ficou mais fácil registrar pelo aplicativo, por exemplo. Mesma base, colunas com confiabilidades diferentes. Analista maduro sabe qual parte do dataset é censo e qual parte é funil. Eu vejo isso direto nos meus projetos: no agro, na indústria, na logística — o sensor que falha não avisa que falhou, o silo que ninguém mediu não entra na média. Perguntar "o que não está sendo medido?" já salvou mais de um projeto meu.

**[12:00–15:30] — [SLIDE 9 → SLIDE 10] Margem de erro e o empate técnico**

[SLIDE 9] Vamos à segunda peça do quebra-cabeça: mesmo com amostra bem sorteada, o acaso existe. Sorteie duas mil pessoas hoje e duas mil amanhã: os resultados não serão idênticos. Essa oscilação natural é a **flutuação amostral**, e a **margem de erro** é a régua dela. Quando a pesquisa diz "candidata A tem 42%, margem de dois pontos", está dizendo: o valor verdadeiro na população provavelmente está entre 40 e 44. Provavelmente — não certamente. É um intervalo de humildade, calculado com matemática.

E daí vem o famoso **empate técnico**: se A tem 42 e B tem 40, com dois pontos de margem para cada lado, os intervalos se cruzam — os dados não permitem afirmar quem está na frente. A manchete "A abre vantagem" pode ser só flutuação. [SLIDE 10] Detalhe que surpreende: para reduzir a margem pela metade, não basta dobrar a amostra — é preciso **quadruplicar**. Por isso as pesquisas param em umas duas ou três mil entrevistas: dali em diante, cada ponto de precisão custa uma fortuna e rende pouco. Precisão tem preço, e quem decide precisa saber quanta precisão a decisão realmente exige.

**[15:30–17:30] — [SLIDE 11] A armadilha dos pequenos números**

[SLIDE 11] Agora a versão dessa história que mais aparece na gestão municipal: os **pequenos números**. Um distrito registrou 2 sinistros fatais no ano passado e 4 neste ano. A manchete: "mortes no trânsito dobram no distrito X — alta de 100%!". Calma. Com números tão pequenos, a diferença entre 2 e 4 pode ser puro acaso — no ano que vem pode dar 1, ou 5, sem que nada tenha mudado na rua. Enquanto isso, um distrito grande que foi de 40 para 48 — "só" 20% — pode estar mostrando uma tendência real e mais grave em vidas absolutas. Percentual sobre base pequena é fogos de artifício: chama atenção e ilumina pouco. A conduta profissional: em recortes pequenos, olhe o valor absoluto, agregue mais anos ou mais território, e desconfie de qualquer ranking em que os extremos são todos pequenos — lembra dos municípios miúdos no topo e no fundo do ranking, da leitura passada? É o mesmo fenômeno.

**[17:30–19:00] — [SLIDE 12] Reportar com honestidade sem paralisar a decisão**

[SLIDE 12] "Tá, Giselle, mas se tudo tem viés e tudo flutua… eu não afirmo mais nada?" Afirma sim — com as palavras certas. Três frases-modelo para colar no monitor. Um: nomeie a fonte e o filtro — *"com base nos chamados registrados no SP156"*, e não *"a cidade precisa de"*. Dois: dê o intervalo, não o ponto — *"entre 40 e 44%"*, *"na casa de 25 dias"*. Três: declare a direção da dúvida — *"o número real de sinistros leves tende a ser maior que o registrado"*. E a atitude que fecha tudo: incerteza não é desculpa para não decidir — é informação para decidir melhor. O gestor que espera o dado perfeito não decide nunca; o que ignora a incerteza decide errado com confiança. O nosso caminho é o do meio: decidir com a melhor evidência disponível, dizendo em voz alta o tamanho da dúvida. Mini-desafio antes do fim: pausa o vídeo e me diz qual viés tem numa enquete de satisfação feita **no aplicativo** da prefeitura sobre… o próprio aplicativo. — [pausa 3s] — Isso: só responde quem usa o aplicativo — os insatisfeitos que desinstalaram nem foram perguntados. Viés de seleção puro, o avião que não voltou.

**[19:00–22:00] — [CÂMERA] Fechamento**

Recapitulando em quatro frases. Amostra vale pelo sorteio, não pelo tamanho. Dado administrativo mede o registro, não a realidade — pergunte sempre quem ficou de fora. Margem de erro e pequenos números: variação pequena ou base pequena, cuidado com manchete. E incerteza se reporta com fonte, intervalo e direção da dúvida — sem paralisar a decisão.

E agora chegou a hora de juntar tudo — média e mediana da aula 3.1, os cuidados com causa da leitura, os vieses de hoje — numa prática de verdade. Na próxima aula você abre o Colab de novo e mergulha nos dados do **InfoSiga**, a base de sinistros de trânsito do estado de São Paulo. São dados sérios, de um problema que mata milhares de pessoas por ano no estado — e exatamente por isso merecem uma análise feita com o rigor que você acabou de aprender. Você vai calcular distribuições, comparar média com mediana no dado real, usar percentis… e fechar com um mini-relatório apontando o recorte mais preocupante, justificado com dois números. Separa duas horas e meia com calma, pega um café… e te vejo no Colab!

### c) Estrutura de slides (13 slides)

1. **Capa** — "Amostras, incerteza e o tamanho da dúvida" · Módulo 3 · Aula 3.
2. **O paradoxo da pesquisa** — bullets: 2 mil entrevistados falam por 12 milhões de eleitores?; e 1 milhão de chamados do 156 não falam pela cidade?; a resposta é a aula de hoje.
3. **População × amostra** — bullets: população = o todo sobre o qual se quer concluir; amostra = a parte observada; censo = medir tudo (caro, raro); o que faz a amostra valer é o SORTEIO, não o tamanho.
4. **Quem liga para o 156?** — bullets: ninguém sorteou — os cidadãos se selecionaram; entra: quem conhece o canal, tem acesso, acredita que adianta; fica de fora: quem desistiu de pedir.
5. **Viés de seleção** — frase central: "o processo que decide quem entra nos dados distorce o retrato"; bullet: poucos chamados = bairro bem cuidado OU bairro que desistiu — o mesmo número, duas cidades.
6. **O avião de Wald (viés do sobrevivente)** — silhueta de avião com furos; bullets: reforçar onde os que voltaram NÃO têm furos; os dados que chegam já passaram por um filtro; pergunta profissional: quem ficou de fora?
7. **Dado administrativo mede o registro, não a realidade** — bullets: 156 = quem reclamou; B.O. = quem registrou; fila de creche = quem se inscreveu; entre realidade e registro existe um funil.
8. **O caso InfoSiga** — bullets: sinistros fatais ≈ censo (óbito sempre aciona o sistema); sinistros leves = funil (parte nunca vira registro); "alta nos leves" pode ser alta de REGISTRO; saiba qual coluna é censo e qual é funil.
9. **Margem de erro e empate técnico** — bullets: flutuação amostral = oscilação natural do sorteio; "42%, margem de 2 pontos" = provavelmente entre 40 e 44; intervalos que se cruzam = empate técnico — não dá para afirmar quem lidera.
10. **Precisão tem preço** — bullets: margem pela metade = amostra QUATRO vezes maior; por isso pesquisas param em ~2–3 mil entrevistas; quanta precisão a sua decisão realmente exige?
11. **A armadilha dos pequenos números** — bullets: de 2 para 4 mortes = "+100%" (pode ser acaso); de 40 para 48 = "+20%" (pode ser tendência real); base pequena: use absolutos, agregue anos/território; rankings com extremos pequenos = sinal amarelo.
12. **Reportar com honestidade** — três frases-modelo: nomeie fonte e filtro ("com base nos chamados registrados…"); dê o intervalo ("na casa de…", "entre X e Y"); declare a direção da dúvida ("o real tende a ser maior que o registrado"); lema: incerteza é informação, não paralisia.
13. **Próxima parada: InfoSiga no Colab** — bullets: sinistros de trânsito do estado de SP; média × mediana no dado real, percentis, tendências; entrega: mini-relatório com o recorte mais preocupante + 2 números; separe 2h30 e um café.

---

## Aula 3.4 — Estatística descritiva na prática: sinistros de trânsito de SP no Colab

**Tipo:** prática · **Duração:** 2h30 · **Ferramenta:** Google Colab

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Calcular** (aplicar) média, mediana, desvio padrão e percentis de uma base real com `mean()`, `median()`, `std()` e `quantile()`. 2. **Construir** (aplicar) distribuições por mês, tipo de sinistro e período do dia com `value_counts()`, `groupby()` e histograma. 3. **Comparar** (analisar) média e mediana na prática, diagnosticando assimetria. 4. **Avaliar** (avaliar) recortes considerando viés de registro e pequenos números. 5. **Redigir** (criar) um mini-relatório apontando o recorte com a tendência mais preocupante, justificado com dois números. |
| **Duração** | ~2h30 (setup 15min + trilha guiada 1h30 + desafio e mini-relatório 45min) |
| **Materiais** | Notebook starter `analise-dados-estrategica-pratica-modulo3.ipynb` (disponível na plataforma em `/cursos/notebooks/`); conta Google; dicionário de colunas incluído no próprio notebook |
| **Sequência didática** | **Abertura:** contexto da pergunta de gestão + relembrar o kit da aula 3.1. **Desenvolvimento:** execução guiada célula a célula (carregar → inspecionar → distribuir por mês/tipo/período → média × mediana → percentis → tendência). **Fechamento:** desafio autônomo + mini-relatório + postagem no fórum. |
| **Avaliação** | Critérios de conclusão (checklist abaixo) + envio do link do notebook e do mini-relatório na plataforma. |

### d) Prática guiada — passo a passo

**Pergunta de gestão da prática:** *"Em quais recortes — mês, tipo de sinistro, período do dia — os sinistros de trânsito se concentram, e qual recorte apresenta a tendência mais preocupante?"*

**Dados:** amostra didática embutida no notebook, no formato dos dados abertos do **InfoSiga SP** — o sistema de informações sobre sinistros de trânsito do Governo do Estado de São Paulo (https://infosiga.sp.gov.br — seção de dados abertos/downloads, arquivos CSV de sinistros fatais e não fatais). A última seção do notebook mostra como carregar o CSV real do portal quando você quiser ir além. Lembrete da aula 3.3, repetido dentro do notebook: sinistros **fatais** são próximos de um censo; sinistros **leves** carregam viés de registro — interprete cada recorte com a régua certa.

1. Baixe o notebook da aula na plataforma (botão "Materiais" → `analise-dados-estrategica-pratica-modulo3.ipynb`).
2. Acesse https://colab.research.google.com, faça login com sua conta Google e use **Arquivo → Fazer upload de notebook** para abrir o arquivo baixado.
3. Leia a primeira célula (contexto e dicionário de colunas: data do sinistro, mês, tipo — fatal, com vítima leve, sem vítima —, período do dia, tipo de via, veículos envolvidos, vítimas). Execute a célula de importações (**botão ▶** ou `Ctrl+Enter`). *Checkpoint: nenhuma mensagem de erro em vermelho.*
4. Execute a célula que carrega os dados e cria a tabela `df`. *Checkpoint: a saída informa o número de sinistros carregados e o período coberto.*
5. Rode o ritual do Módulo 1: `df.head()`, `shape`, `info()`. Responda na célula de texto: qual é a granularidade (cada linha é o quê?) e quais colunas têm valores faltantes?
6. Execute a célula de `value_counts()` da coluna `tipo_sinistro`. Anote a proporção de fatais no total — e releia o aviso sobre viés de registro: qual tipo é "censo" e qual é "funil"?
7. Execute a célula de distribuição por mês (`groupby` por mês + gráfico de barras). Identifique os meses de pico e escreva uma hipótese em uma frase (chuva? férias? volta às aulas?). *Checkpoint: gráfico com 12 barras visível.*
8. Execute a célula de distribuição por `periodo_dia` (madrugada, manhã, tarde, noite). Compare o volume total com o recorte só de **fatais**: o período com mais sinistros é o mesmo com mais mortes? (Tipicamente não é — e essa diferença é um achado de gestão.)
9. Execute a célula de média × mediana do número de vítimas por sinistro (`mean()` e `median()`). Observe a distância entre as duas e diagnostique: a distribuição é simétrica ou assimétrica? Qual das duas medidas descreve o sinistro típico?
10. Execute a célula do histograma dessa distribuição e confirme visualmente o diagnóstico do passo 9 — a cauda longa aparece?
11. Execute a célula de percentis (`quantile([0.25, 0.5, 0.9])`) sobre a idade das vítimas. Escreva em uma frase a leitura do P90 em voz de gestor ("9 em cada 10 vítimas têm até X anos") e reflita: que política pública esse número sugere priorizar?
12. Execute a célula de tendência: sinistros fatais por mês ao longo dos anos da amostra (gráfico de linhas). Repare no aviso do notebook sobre **pequenos números**: recortes muito finos (um município pequeno, um único tipo de via) flutuam demais para sustentar conclusão.
13. **Desafio final (célula com TODOs):** escolha UM recorte (um período do dia, um tipo de via OU uma faixa etária), calcule a evolução dele no tempo e compare com a evolução geral. Complete o código dos TODOs — os padrões são os mesmos dos passos 7–12.
14. **Mini-relatório (célula de texto final):** escreva de 4 a 6 linhas respondendo à pergunta de gestão: qual recorte apresenta a tendência mais preocupante? Justifique com **dois números** calculados no notebook (ex.: um valor absoluto e uma variação, ou uma mediana e um P90), cite a fonte (InfoSiga SP) e inclua **uma ressalva honesta** de viés ou de pequenos números, como aprendido na aula 3.3.
15. Compartilhe: **Compartilhar → Qualquer pessoa com o link → Leitor**, copie o link e envie na atividade da plataforma. Poste o mini-relatório também no fórum da aula.

**Critérios de conclusão (checklist do aluno):**

- [ ] Todas as células executam sem erro, de cima a baixo (`Ambiente de execução → Executar tudo`).
- [ ] Identifiquei os meses de pico e o período do dia com mais sinistros fatais.
- [ ] Comparei média e mediana, diagnostiquei a assimetria e disse qual medida descreve o caso típico.
- [ ] Escrevi a leitura do P90 em linguagem de gestor.
- [ ] Completei os TODOs do desafio com um recorte próprio.
- [ ] Meu mini-relatório tem: recorte escolhido + dois números + fonte + uma ressalva honesta.
- [ ] Enviei o link compartilhável do notebook na plataforma.

**Problemas comuns e socorro rápido:**

- *"Célula travada em execução"* → menu **Ambiente de execução → Reiniciar sessão** e execute de novo desde o topo.
- *"NameError: df is not defined"* → você pulou a célula que cria o `df`; execute as células na ordem.
- *Média e mediana deram iguais no seu recorte* → não é erro: significa que essa distribuição em particular é aproximadamente simétrica. Diga isso no relatório — é um diagnóstico, não um problema.
- *O gráfico de tendência do seu recorte ficou "serrilhado", subindo e descendo* → provavelmente pequenos números (aula 3.3). Agregue mais meses ou escolha um recorte maior antes de concluir tendência.
- *Acentos estranhos ao carregar o CSV real do InfoSiga* → use o parâmetro `encoding` mostrado na última seção do notebook (armadilha 4 da Aula 1.3).

---

## Aula 3.5 — Quiz do Módulo 3 — Estatística para decisão

**Tipo:** quiz · **Duração:** 15min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos** | Verificar a fixação dos conceitos do módulo (média × mediana, percentis, correlação × causalidade, viés de seleção, pequenos números). |
| **Formato** | 5 questões objetivas, 3 alternativas, correção automática com explicação; 2 tentativas; nota mínima 70% (compõe a média de quizzes). |

### Questões (com gabarito)

**Q1.** O tempo médio de resolução de um serviço é 12 dias, mas a mediana é 4 dias. O que essa diferença indica?
- a) Erro de cálculo — média e mediana de uma mesma base deveriam ser sempre iguais.
- b) Distribuição assimétrica: a maioria dos casos é resolvida rápido, mas uma minoria demora muito e puxa a média para cima. ✅
- c) Que metade dos casos demora exatamente 12 dias para ser resolvida.

*Explicação: média e mediana distantes são o diagnóstico clássico de cauda longa — poucos casos muito demorados arrastam a média para longe do caso típico. Em distribuição assimétrica, a mediana descreve melhor o típico, e a regra do curso é: assimétrica pede mediana.*

**Q2.** Para prometer um prazo ao cidadão ("seu chamado será resolvido em até X dias"), qual medida é a mais adequada?
- a) A média, porque leva em conta todos os valores.
- b) Um percentil alto, como o P90 — o prazo dentro do qual 90% dos casos são de fato resolvidos. ✅
- c) A moda, porque é o prazo que mais se repete.

*Explicação: promessa de prazo é compromisso com a cauda da distribuição, não com o centro. Prometer a média significa estourar o prazo em boa parte dos casos; o P90 é a régua das metas honestas.*

**Q3.** Distritos com mais UBS por habitante apresentam piores indicadores de saúde. A leitura mais prudente dessa correlação é:
- a) As UBS pioram a saúde da população e deveriam ser repensadas.
- b) Pode haver causalidade reversa ou direcionamento: as UBS foram instaladas justamente onde os indicadores já eram piores. ✅
- c) O dado prova que investir em atenção básica não tem efeito.

*Explicação: política pública bem alocada vai sempre "se correlacionar" com o problema que combate — o equipamento foi para onde a necessidade era maior. Antes de atribuir causa, rode o checklist das 4 perguntas: terceiro fator? seta invertida? acaso? mecanismo testável?*

**Q4.** Por que o volume de chamados do SP156 por distrito não mede diretamente a necessidade de zeladoria da cidade?
- a) Porque quem registra chamados é uma amostra autosselecionada: depende de conhecer o canal, ter acesso e acreditar que reclamar adianta. ✅
- b) Porque os dados do SP156 são sigilosos e incompletos por determinação legal.
- c) Porque chamados telefônicos não podem ser tratados estatisticamente.

*Explicação: é o viés de seleção — dado administrativo mede a demanda registrada, não a necessidade real. Um distrito com poucos chamados pode estar bem cuidado ou pode ter desistido de pedir; por isso a pergunta profissional é sempre "quem ficou de fora destes dados?".*

**Q5.** Um distrito pequeno passou de 2 para 4 sinistros fatais e virou manchete: "mortes no trânsito dobram". Qual é a leitura estatística mais honesta?
- a) Alta de 100% exige transferir imediatamente equipes de fiscalização de outros distritos para lá.
- b) Em bases pequenas, variações percentuais grandes podem ser flutuação aleatória: olhe os valores absolutos e a série de vários anos antes de concluir tendência. ✅
- c) Percentuais não podem ser calculados sobre números pequenos, então o dado deve ser descartado.

*Explicação: é a armadilha dos pequenos números — de 2 para 4 pode ser acaso, e no ano seguinte o valor pode voltar a 1 ou 2 sem que nada tenha mudado. O dado não se descarta: agrega-se mais tempo ou mais território e comparam-se absolutos, reportando a incerteza sem paralisar a decisão.*
