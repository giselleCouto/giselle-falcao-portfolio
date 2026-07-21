# Módulo 1 — A gramática da incerteza: distribuições, amostragem e o TCL

**Curso:** Estatística e Reconhecimento de Padrões na Ciência de Dados · Giselle Falcão Academy
**Carga do módulo:** 4h30 · **Aulas:** 2 vídeos, 1 leitura, 1 prática (Colab), 1 quiz
**Status comercial:** este módulo é a **amostra gratuita** do curso premium — é a vitrine; cada aula precisa entregar valor completo por si só.

**Objetivo geral do módulo:** ao final, o aluno enxerga qualquer dado real como amostra de uma distribuição de probabilidade, sabe reconhecer as distribuições mais comuns pelo histograma e pelo QQ-plot, entende o Teorema Central do Limite por simulação e usa o erro padrão para quantificar a incerteza de uma média — tudo com `scipy` no Google Colab.

---

## Aula 1.1 — Padrões nascem de distribuições: o alicerce estatístico da ciência de dados

**Tipo:** vídeo · **Duração:** 20min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Definir** (lembrar) variável aleatória e distribuição de probabilidade com as próprias palavras. 2. **Explicar** (compreender) por que a distribuição normal aparece em tantos processos reais (soma de muitos efeitos pequenos). 3. **Distinguir** (analisar) fenômenos que tendem à normal de fenômenos assimétricos ou de contagem, citando o risco de assumir normalidade sem verificar. 4. **Relacionar** (compreender) reconhecimento de padrões com detecção de mudanças de distribuição, usando os casos de sensores e de dados educacionais. |
| **Duração** | 20 min de vídeo + ~10 min de atividade no fórum |
| **Materiais** | Slides (12), fórum da plataforma |
| **Sequência didática** | **Abertura (0–1:40):** gancho das três telas; posicionamento do curso. **Desenvolvimento (1:40–17:30):** variável aleatória e distribuição → a normal e sua origem → o mundo não normal → padrões como distribuições (sensores, SAEB) → mapa do curso. **Fechamento (17:30–20:00):** síntese, tarefa de fórum, ponte para a leitura 1.2. |
| **Avaliação** | Formativa: postagem no fórum (uma variável do seu trabalho + palpite de distribuição). Somativa: questões 1 e 2 do quiz do módulo. |

### b) Roteiro de gravação

> Tom: professora experiente conversando com quem já treinou modelos e agora quer entender o porquê. Pausas nos "…", sorrir nos parênteses de conexão. **[CÂMERA]** = rosto na tela; **[SLIDE n]** = mostrar slide.

**[0:00–1:40] — [CÂMERA] Abertura**

Oi! Eu sou a Giselle Falcão — e se você chegou até este curso, provavelmente você já treinou os seus primeiros modelos. Já rodou uma regressão, uma classificação, talvez um K-means… e em algum momento bateu aquela sensação incômoda: "funciona, mas eu não sei exatamente *por quê*". Ou pior: "deu 87% de acurácia… e agora, eu confio nisso ou não?".

Este curso existe para tirar você desse lugar. Aqui a gente constrói a camada que falta entre rodar modelo e *entender* modelo: a estatística de verdade e a teoria do reconhecimento de padrões. E eu prometo uma coisa: cada fórmula que aparecer aqui vai chegar depois de um desenho ou de uma simulação. Intuição primeiro, símbolo depois. Bem-vindo, bem-vinda. Vamos começar pelo alicerce de tudo.

**[1:40–4:00] — [SLIDE 2] Três telas, um segredo**

[SLIDE 2] Deixa eu te mostrar três telas que resumem a minha vida de consultora. Na primeira, a leitura de vibração de um motor numa fábrica — milhares de números por segundo. Na segunda, a imagem de satélite de uma lavoura — milhões de pixels em tons de verde. Na terceira, as proficiências de matemática de milhares de alunos numa avaliação em larga escala, tipo o SAEB.

Três mundos completamente diferentes: indústria, agro, educação. E no entanto… quando eu abro esses dados, eu faço exatamente a mesma primeira pergunta nos três: **como esses valores se distribuem?** Onde eles se concentram, o quanto se espalham, que forma tem esse espalhamento. Porque — e essa é a tese deste curso inteiro — um *padrão*, para a máquina e para a estatística, não é uma coisa mística. Um padrão é uma **regularidade estatística**: uma distribuição que se repete. E reconhecer padrões, no fundo, é perceber quando uma distribuição… muda.

Guarda essa frase. A gente volta nela daqui a pouco com exemplos concretos.

**[4:00–6:30] — [SLIDE 3 → SLIDE 4] Variável aleatória: o dado antes do dado**

[SLIDE 3] Primeiro conceito, e eu quero que ele fique cristalino: **variável aleatória**. O nome assusta, a ideia é simples. Uma variável aleatória é uma quantidade cujo valor você não sabe *antes* de medir — mas cujos valores possíveis seguem uma regra de frequência. A temperatura do mancal do motor daqui a uma hora: eu não sei o valor exato, mas eu sei que vai ser algo perto de 62 graus, quase nunca abaixo de 58, quase nunca acima de 66. Essa "regra de frequência" tem nome: **distribuição de probabilidade**.

[SLIDE 4] E como a gente enxerga uma distribuição? Pelo velho e bom **histograma** — que você já conhece dos cursos anteriores, mas que agora ganha um upgrade de interpretação. O histograma não é só um gráfico descritivo. Ele é o **retrato empírico da distribuição**: a sua melhor estimativa, a partir dos dados, da regra que governa o processo. Quando eu olho o histograma das temperaturas de um motor saudável, eu não estou vendo "os dados que coletei". Eu estou vendo a *impressão digital estatística daquela máquina funcionando bem*. Essa mudança de olhar — do dado para o processo que gera o dado — é a mudança que separa o analista descritivo do cientista de dados inferencial.

**[6:30–9:30] — [SLIDE 5 → SLIDE 6] A normal: por que esse sino aparece em todo lugar**

[SLIDE 5] Agora, a celebridade. A distribuição **normal**, ou gaussiana: o famoso sino simétrico, definido por dois números só — a média μ, que diz onde o centro está, e o desvio padrão σ, que diz o quanto o sino é largo. Com esses dois parâmetros você sabe tudo: cerca de 68% dos valores caem a um desvio da média, 95% a dois desvios, 99,7% a três. Essa "regra 68–95–99,7" vai trabalhar para você o curso inteiro.

Mas a pergunta interessante não é "o que é a normal". É: **por que ela aparece tanto?** Temperatura de sensores, erros de medição, altura de pessoas, ruído elétrico… [SLIDE 6] A resposta é um dos resultados mais bonitos da matemática, e eu vou te dar a versão intuitiva agora e a versão completa na aula 1.3: quando uma quantidade é o resultado da **soma de muitos efeitos pequenos e independentes** — um pouquinho de carga, um pouquinho de ventilação, um pouquinho de ruído do circuito, nenhum deles dominante — essa soma tende ao formato de sino. Não importa muito a cara de cada efeitinho individual: somando muitos, o sino emerge. É por isso que a natureza parece "gostar" da normal: ela é o que acontece quando muitas causas pequenas se somam.

**[9:30–12:30] — [SLIDE 7 → SLIDE 8] O mundo não é normal (e assumir que é custa caro)**

[SLIDE 7] Só que aqui vem o alerta que eu faço em toda consultoria: **o mundo não é normal por padrão**. Renda no Brasil? Fortemente assimétrica — a maioria ganha pouco, uma cauda longa ganha muito; isso é território da **lognormal**, que aparece quando os efeitos se *multiplicam* em vez de somar. Chuva mensal numa fazenda? Assimétrica também. Número de defeitos por lote na fábrica, chamados por hora num call center? Isso nem contínuo é — são **contagens**, e contagem de evento raro é o habitat da **Poisson**. Sementes que germinam num lote de cem? Sim-ou-não repetido: **binomial**.

[SLIDE 8] E por que isso importa tanto? Porque quase todas as ferramentas "automáticas" que você já usou carregam suposições de normalidade escondidas — e quando a suposição falha, a ferramenta mente com confiança. Um exemplo que eu vejo direto na indústria: alguém define alarme de sensor como "média mais três desvios", que na normal cobre 99,7% dos casos… só que o dado tem cauda pesada, e o alarme dispara três vezes por dia, até a operação desligar o alarme. O problema não era a máquina. Era a distribuição errada na cabeça de quem projetou o limite. Na leitura 1.2, você vai ganhar um bestiário completo dessas distribuições e um teste visual — o QQ-plot — para nunca mais assumir normalidade no escuro.

**[12:30–15:00] — [SLIDE 9] Reconhecer padrões = detectar mudanças de distribuição**

[SLIDE 9] Agora eu volto àquela frase do início, porque agora ela tem chão. Olha o motor de novo: a vibração dele, saudável, tem uma distribuição — centro ali, espalhamento assim. Quando o rolamento começa a desgastar, o que acontece? A distribuição **muda**: a média desloca, a variância cresce, a cauda engorda. O padrão "máquina saudável" é uma distribuição; a falha é a *mudança* dessa distribuição. Detecção de anomalia — que fecha este curso no módulo 6 — é literalmente isso.

E na educação? No trabalho que eu desenvolvo com avaliação educacional em larga escala, a distribuição das proficiências de uma escola é a impressão digital pedagógica dela. Duas escolas com a *mesma média* podem ter distribuições completamente diferentes — uma homogênea, outra com dois grupos bem separados, os que dominam e os que ficaram para trás. A média esconde; a distribuição revela. É por isso que este curso começa aqui: porque **toda técnica que vem pela frente — teste de hipótese, PCA, clustering, classificador — é uma pergunta diferente feita a uma distribuição**.

**[15:00–17:30] — [SLIDE 10 → SLIDE 11] O mapa da jornada**

[SLIDE 10] Deixa eu te mostrar o caminho completo. Módulo 1, este: distribuições, amostragem e o Teorema Central do Limite — o alicerce. Módulo 2: inferência — intervalos de confiança, testes de hipótese, o p-valor usado do jeito certo, bootstrap, e correlação versus causalidade com o rigor que o assunto merece. Módulo 3: a gente entra no reconhecimento de padrões propriamente dito — como transformar sensores, imagens e tabelas em vetores de características, e como medir "parecido" com distâncias e similaridades. Módulo 4: PCA e redução de dimensionalidade — comprimir vinte sensores em três eixos que fazem sentido. Módulo 5: clustering avançado — hierárquico, DBSCAN, validação — e os classificadores estatísticos: Bayes, KNN, discriminantes. Módulo 6: o fechamento profissional — validar modelos com rigor estatístico e detectar anomalias, com um projeto final de ponta a ponta.

[SLIDE 11] E o combinado da casa, que vale para as trinta e duas horas: **intuição antes de fórmula, simulação antes de teorema, e dado brasileiro de verdade em toda prática**. Você vai *ver* o Teorema Central do Limite acontecer na tela antes de qualquer equação. Prometido.

**[17:30–20:00] — [CÂMERA] Fechamento**

Recapitulando em três frases. Um: todo dado real é uma amostra de uma distribuição — e o histograma é o retrato dela. Dois: a normal aparece quando muitos efeitos pequenos se somam, mas o mundo real é cheio de lognormais, Poissons e caudas pesadas — assumir normalidade sem verificar é a fonte de alarme falso mais comum que eu encontro em consultoria. Três: reconhecer padrões é, na essência, perceber quando uma distribuição muda.

Sua tarefa de hoje, no fórum: escolhe **uma variável do seu trabalho ou do seu dia a dia** — tempo de deslocamento, vendas diárias, temperatura de um equipamento, nota de uma turma — e escreve duas linhas: qual você *acha* que é a forma da distribuição dela, e por quê. Não vale olhar os dados antes; o exercício é justamente calibrar a sua intuição para depois confrontá-la. Eu leio todas as respostas.

Na próxima aula, uma leitura de uns cinquenta minutos, você recebe o bestiário completo: as cinco distribuições que cobrem a maior parte dos dados reais, como reconhecer cada uma no histograma, e o QQ-plot — o teste do espelho que diz se o seu dado é normal ou só está fingindo. Te vejo lá. Um abraço!

### c) Estrutura de slides (12 slides)

1. **Capa** — "Padrões nascem de distribuições" · Módulo 1 · Aula 1 · logo Giselle Falcão Academy (fundo roxo, título em lavanda).
2. **Três telas, um segredo** — três imagens lado a lado: série de vibração de motor, imagem de satélite de lavoura, histograma de proficiências; pergunta em teal: "como esses valores se distribuem?".
3. **Variável aleatória** — bullets: valor desconhecido antes de medir; valores possíveis seguem regra de frequência; a regra = distribuição de probabilidade; exemplo: temperatura do mancal daqui a 1h.
4. **O histograma é o retrato da distribuição** — histograma de temperaturas do motor; frase: "do dado → para o processo que gera o dado"; "impressão digital estatística da máquina saudável".
5. **A normal: dois números contam tudo** — sino com μ e σ marcados; regra 68–95–99,7 em três faixas coloridas.
6. **Por que o sino aparece tanto** — diagrama: muitos efeitos pequenos e independentes somados → sino; exemplos: ruído de sensor, erro de medição.
7. **O mundo não é normal** — quatro mini-histogramas rotulados: renda (lognormal), chuva mensal (assimétrica), defeitos por lote (Poisson), germinação (binomial).
8. **Assumir normalidade custa caro** — caso do alarme μ + 3σ com cauda pesada: alarme dispara 3×/dia → operação desliga o alarme; frase: "a distribuição errada projeta o limite errado".
9. **Reconhecer padrões = detectar mudança de distribuição** — duas curvas sobrepostas (motor saudável × desgastado: média desloca, cauda engorda); duas distribuições escolares com mesma média e formas diferentes.
10. **O mapa do curso** — 6 módulos em linha do tempo (roxo → teal), 1 linha por módulo.
11. **O combinado da casa** — três frases: intuição antes de fórmula; simulação antes de teorema; dado brasileiro em toda prática.
12. **Sua tarefa de hoje** — "No fórum: uma variável do seu trabalho + seu palpite de distribuição (2 linhas, sem olhar os dados)" + teaser da leitura 1.2.

---

## Aula 1.2 — O bestiário das distribuições: normal, lognormal, Poisson e binomial em dados brasileiros

**Tipo:** leitura · **Duração:** 50min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Listar** (lembrar) as cinco distribuições do bestiário e um exemplo brasileiro de cada. 2. **Explicar** (compreender) o mecanismo gerador de cada uma (soma → normal; produto → lognormal; contagem de eventos raros → Poisson; n ensaios sim/não → binomial; tempo até o evento → exponencial). 3. **Classificar** (aplicar) variáveis reais na distribuição mais plausível. 4. **Interpretar** (analisar) um QQ-plot, identificando desvios de normalidade nas caudas. |
| **Duração** | ~50 min de leitura + atividade |
| **Materiais** | Texto na plataforma (estrutura abaixo); galeria de histogramas e QQ-plots; checklist de diagnóstico para download (PDF de 1 página) |
| **Sequência didática** | **Abertura:** por que um bestiário (nomear o bicho antes de domá-lo). **Desenvolvimento:** as cinco fichas do bestiário → como diagnosticar pelo histograma → QQ-plot passo a passo. **Fechamento:** checklist + atividade de classificação no fórum + ponte para a aula 1.3. |
| **Avaliação** | Formativa: atividade de classificação no fórum (3 variáveis). Somativa: questões 1, 2 e 5 do quiz. |

### b) Estrutura do texto da leitura (para redação na plataforma)

1. **Abertura (2 parágrafos).** A metáfora do bestiário: naturalistas do século XIX catalogavam espécies para reconhecê-las em campo; o cientista de dados cataloga distribuições pelo mesmo motivo. Cada distribuição tem um *mecanismo gerador* — a história de como o acaso produz aquele formato — e reconhecer o mecanismo diz muito antes de qualquer modelo.
2. **Ficha 1 — Normal (3 parágrafos + histograma).** Mecanismo: soma de muitos efeitos pequenos e independentes. Parâmetros μ e σ; regra 68–95–99,7. Exemplos brasileiros: ruído de sensores industriais calibrados, erros de medição agronômica, variação de peso de produtos numa linha de envase. Contraexemplo importante: proficiências educacionais são *aproximadamente* normais por construção do modelo de medida (a escala da TRI é definida assim), não por acaso — bom exemplo de normalidade "de projeto".
3. **Ficha 2 — Lognormal (3 parágrafos + histograma).** Mecanismo: efeitos que se *multiplicam* (crescimentos percentuais). Assimétrica à direita, só valores positivos; o log dela é normal. Exemplos: renda e salários no Brasil, faturamento de empresas, tempo de execução de tarefas, chuva acumulada. Regra prática: se o dado é positivo e a média está bem à direita da mediana, suspeite de lognormal — e experimente olhar o histograma do logaritmo.
4. **Ficha 3 — Poisson (3 parágrafos + histograma).** Mecanismo: contagem de eventos raros e independentes num intervalo fixo (tempo, área, lote). Um parâmetro só, λ (que é média E variância ao mesmo tempo — assinatura da Poisson). Exemplos: defeitos por lote numa linha de produção, chamados por hora, focos de praga por hectare em monitoramento de lavoura. Alerta de campo: se a variância observada é muito maior que a média ("superdispersão"), o modelo Poisson puro já não basta.
5. **Ficha 4 — Binomial (2 parágrafos + histograma).** Mecanismo: n ensaios independentes de sim/não com probabilidade p. Exemplos: sementes germinadas em bandejas de 100, peças aprovadas por lote inspecionado, questões acertadas num teste (com a ressalva de que itens de prova não são igualmente difíceis — gancho honesto para a TRI, tema do trabalho da professora, sem aprofundar aqui).
6. **Ficha 5 — Exponencial (2 parágrafos + histograma).** Mecanismo: tempo de espera até o próximo evento de um processo de Poisson. Fortemente assimétrica; "sem memória". Exemplos: tempo entre falhas de um equipamento, tempo entre chegadas de caminhões numa balança. É a população que usaremos na simulação do TCL na prática 1.4 — justamente por ser bem torta.
7. **Diagnóstico visual 1: o histograma (2 parágrafos + galeria).** Roteiro de leitura: simétrico ou assimétrico? contínuo ou contagem? uma moda ou duas? (bimodalidade = mistura de dois regimes — dois turnos da fábrica, duas variedades na lavoura, dois perfis de escola — e nenhuma distribuição simples serve antes de separar os regimes).
8. **Diagnóstico visual 2: o QQ-plot (seção-chave, 4 parágrafos + 3 exemplos).** A ideia do espelho: ordenar os dados e comparar cada quantil observado com o quantil teórico da normal; se o dado é normal, os pontos abraçam a reta. Leitura dos desvios: curva em "S" = caudas leves; pontas fugindo para fora = **caudas pesadas** (o caso perigoso para alarmes e anomalias); curvatura só de um lado = assimetria. Três QQ-plots comentados: um normal de verdade, um lognormal, um com caudas pesadas.
9. **Checklist de diagnóstico (caixa destacada).** 1) O dado é contagem, proporção, tempo-até-evento ou medida contínua? 2) Simétrico ou assimétrico? 3) Média e mediana próximas? 4) O QQ-plot abraça a reta — inclusive nas pontas? 5) Há bimodalidade sugerindo mistura de regimes? — "Cinco perguntas antes de qualquer teste ou modelo. O bicho identificado errado morde depois."
10. **Fechamento + atividade.** "Volte à variável que você postou no fórum da aula 1.1 e classifique-a numa das cinco fichas — mecanismo incluído. Depois escolha mais duas variáveis do seu contexto e faça o mesmo. Poste as três classificações com uma linha de justificativa cada." Ponte: "Na próxima aula, a pergunta muda: se eu só tenho uma amostra, o que eu posso afirmar sobre a distribuição toda? A resposta é o teorema mais importante da estatística."

---

## Aula 1.3 — Amostras, o Teorema Central do Limite e o erro padrão

**Tipo:** vídeo · **Duração:** 22min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Diferenciar** (compreender) população, amostra e estimador, reconhecendo a média amostral como variável aleatória. 2. **Explicar** (compreender) o enunciado do TCL em linguagem própria: a distribuição das médias amostrais tende à normal, seja qual for a população. 3. **Calcular** (aplicar) o erro padrão σ/√n e usar a lei do √n para dimensionar amostras. 4. **Avaliar** (avaliar) situações em que o TCL não socorre: caudas muito pesadas, dependência temporal, n pequeno. |
| **Duração** | 22 min de vídeo |
| **Materiais** | Slides (13); animação/simulação das médias amostrais (série de frames nos slides 6–7); notebook da prática 1.4 |
| **Sequência didática** | **Abertura (0–1:30):** o problema da amostra única. **Desenvolvimento (1:30–18:30):** população × amostra → o experimento das mil amostras → TCL → erro padrão e lei do √n → o que o TCL nos compra → onde ele falha. **Fechamento (18:30–22:00):** síntese + preparação para a prática. |
| **Avaliação** | Formativa: pergunta de pausa em tela (slide 8). Somativa: questões 3 e 4 do quiz. |

### b) Roteiro de gravação

**[0:00–1:30] — [CÂMERA] Abertura**

Oi de novo! Na aula passada e na leitura, você aprendeu a olhar um dado e perguntar: "de que distribuição você veio?". Hoje a gente encara o problema central de toda a estatística — e eu não estou exagerando, é ele mesmo: **você nunca vê a população. Você só vê amostras.** Eu nunca meço *todas* as temperaturas possíveis do motor; eu meço sessenta. Eu nunca avalio *todos* os alunos do estado; avalio uma amostra. E mesmo assim eu preciso afirmar coisas sobre o todo. Que direito eu tenho? … Hoje você descobre que direito você tem. Ele tem nome, e é o teorema mais importante que você vai aprender neste curso.

**[1:30–4:30] — [SLIDE 2 → SLIDE 3] População, amostra e uma ideia que muda tudo**

[SLIDE 2] Vocabulário rápido, mas preciso. **População**: todos os valores possíveis do processo — as infinitas leituras que o sensor *poderia* dar, todos os talhões que a fazenda *poderia* ter. **Amostra**: os n valores que você de fato tem. **Estimador**: a conta que você faz na amostra para chutar um parâmetro da população — a média amostral x̄ estimando a média verdadeira μ, o desvio amostral s estimando o σ verdadeiro.

[SLIDE 3] E agora a ideia que muda tudo — se você levar uma única coisa desta aula, que seja esta: **a média amostral é, ela mesma, uma variável aleatória**. Pensa comigo: se eu coletar sessenta leituras hoje, calculo uma média. Se eu coletar outras sessenta amanhã, dá… outra média. Ligeiramente diferente. E depois de amanhã, outra. A média que você calculou não é "a" resposta — é **um sorteio da distribuição das médias possíveis**. E se a média é uma variável aleatória, ela tem a sua própria distribuição, com o seu próprio centro e o seu próprio espalhamento. A pergunta de ouro vira: que cara tem essa distribuição das médias?

**[4:30–8:30] — [SLIDE 4 → SLIDE 5 → SLIDE 6] O experimento das mil amostras**

[SLIDE 4] Vamos descobrir com um experimento mental — que na prática 1.4 você vai executar de verdade, no Colab, com as suas mãos. Pega uma população *bem torta* de propósito: o tempo entre falhas de um equipamento, aquela exponencial da leitura — despencando, assimétrica, nada a ver com um sino.

[SLIDE 5] Agora o protocolo: sorteio uma amostra de tamanho n dessa população, calculo a média, anoto. Repito mil vezes. No final, faço o histograma… *das mil médias*. O que aparece?

[SLIDE 6] Com n igual a 2, o histograma das médias ainda é torto — herdou a assimetria da mãe. Com n igual a 10… opa, já está bem mais simétrico. Com n igual a 50 — olha isso — um **sino quase perfeito**. A população continua torta lá atrás, ninguém mexeu nela. Mas a distribuição *das médias* virou uma normal. Isso não é coincidência, não é truque de simulação. Isso é lei.

**[8:30–12:00] — [SLIDE 7 → SLIDE 8] O Teorema Central do Limite e o erro padrão**

[SLIDE 7] **Teorema Central do Limite**, enunciado com cuidado — porque cada palavra importa: quando n cresce, a distribuição das **médias amostrais** se aproxima de uma normal, centrada na média verdadeira μ, com desvio padrão σ dividido pela raiz de n — *seja qual for a distribuição da população original*, desde que ela tenha variância finita. Repara no que o teorema diz e no que ele não diz. Ele **não** diz que os seus dados viram normais com n grande — a renda continua torta com um milhão de registros, e a exponencial continua exponencial. Ele diz que a **média** dos seus dados se comporta como normal. É a distribuição do *estimador* que domestica, não a dos dados. Essa confusão reprova gente em entrevista, e cai no quiz.

[SLIDE 8] E aquele desvio da distribuição das médias, σ sobre raiz de n, tem nome próprio: **erro padrão**. Ele mede o quanto a sua média amostral tipicamente erra a média verdadeira. Pausa o vídeo e pensa: se eu quadruplicar o número de leituras, o que acontece com o erro padrão? … [pausa 3s] … Ele cai **pela metade** — porque raiz de 4 é 2. Essa é a **lei do √n**, e ela tem consequência de negócio direta: precisão custa cada vez mais caro. Dobrar a precisão exige quadruplicar os dados; dobrar de novo, dezesseis vezes os dados originais. Quando um cliente me pede "duas casas decimais de precisão" na estimativa, a lei do √n é a conta que eu apresento junto com o orçamento de coleta.

**[12:00–15:30] — [SLIDE 9 → SLIDE 10] O que o TCL compra para você**

[SLIDE 9] "Tá, Giselle, bonito — mas para que serve?" Serve para quase tudo o que vem no resto do curso. Se eu sei que a média amostral é aproximadamente normal com centro μ e desvio σ/√n, eu posso usar a regra 68–95–99,7 *na média*: a média que eu calculei tem uns 95% de chance de estar a menos de dois erros padrão da média verdadeira. Percebeu o que aconteceu? Eu acabei de construir, no susto, a lógica do **intervalo de confiança** — o assunto que abre o módulo 2. Todo IC e todo teste de hipótese clássico que você vai rodar está apoiado neste teorema.

[SLIDE 10] Exemplo com número redondo, do agro: sessenta e quatro talhões, produtividade média de 82 sacas por hectare, desvio de 8 sacas. Erro padrão: 8 dividido por raiz de 64 — 8 sobre 8 — **1 saca**. Então "82, com margem de uns 2 para lá ou para cá" é uma frase estatisticamente honesta. Se eu tivesse só 16 talhões, o erro padrão dobraria para 2, e a margem viraria 4. Mesma média, confianças bem diferentes — e agora você tem o número que expressa essa diferença.

**[15:30–18:30] — [SLIDE 11 → SLIDE 12] Onde o TCL não te socorre**

[SLIDE 11] Agora o parágrafo de honestidade, porque rigor sem limites declarados é marketing. Três situações onde o TCL falha ou demora a valer. Um: **caudas muito pesadas**. Se a população tem extremos brutais — retornos financeiros em crise, picos raros de vibração — a convergência para o sino fica lenta, e com variância infinita (existe, sim) o teorema nem se aplica. Dois: **dependência**. O TCL clássico pede observações independentes; leituras de sensor a cada segundo são altamente autocorrelacionadas — mil leituras em vinte minutos valem, em termos de informação, muito menos que mil leituras independentes. O "n efetivo" é menor do que parece, e o erro padrão calculado ingenuamente fica otimista demais. Três: **n pequeno com σ desconhecido** — que é a vida real, porque você quase nunca conhece o σ verdadeiro. Aí entra a distribuição **t de Student**, com caudas mais gordas que compensam a incerteza extra… e que eu apresento direitinho na primeira aula do módulo 2.

[SLIDE 12] Regra da casa, então: o TCL é o motor da inferência, mas antes de ligar o motor, três perguntas — meus dados são independentes? as caudas são civilizadas? meu n dá conta da assimetria da população? Na dúvida… simule. É gratuito, e é exatamente o que você vai fazer agora.

**[18:30–22:00] — [CÂMERA] Fechamento**

Fechando com as três frases de sempre. Um: você nunca vê a população — e a média que você calcula é um sorteio da distribuição das médias possíveis. Dois: o TCL garante que essa distribuição das médias tende ao sino, centrada no valor verdadeiro, com erro padrão σ sobre raiz de n — e a lei do √n diz que precisão custa quadraticamente caro. Três: o teorema pede independência e caudas comportadas; na dúvida, simule antes de confiar.

E agora vem a melhor parte deste módulo. Abre o notebook da prática 1.4 — está na plataforma, pronto, comentado. Você vai analisar leituras reais-de-exemplo de um motor industrial: histograma, ajuste de normal, QQ-plot… e depois vai **construir o Teorema Central do Limite com as próprias mãos**, sorteando milhares de amostras de uma população torta e vendo o sino emergir na sua tela. Tem coisa que a gente só entende de verdade quando vê acontecer. Essa é uma delas. Te vejo no Colab!

### c) Estrutura de slides (13 slides)

1. **Capa** — "Amostras, o TCL e o erro padrão" · Módulo 1 · Aula 3.
2. **População × amostra × estimador** — três definições em coluna; ícones: nuvem infinita (população), punhado de pontos (amostra), calculadora (estimador); x̄ → μ, s → σ.
3. **A ideia que muda tudo** — frase grande em teal: "a média amostral é uma variável aleatória"; três amostras do mesmo sensor → três médias ligeiramente diferentes.
4. **O experimento das mil amostras — setup** — histograma exponencial (tempo entre falhas) rotulado "população: torta de propósito".
5. **O protocolo** — fluxo em 4 passos: sortear n valores → calcular média → anotar → repetir 1.000× → histograma DAS MÉDIAS.
6. **O sino emerge** — três histogramas lado a lado: médias com n=2 (torto), n=10 (quase simétrico), n=50 (sino); população original pequena no canto, ainda torta.
7. **Teorema Central do Limite** — enunciado em 3 linhas; caixa de alerta: "o TCL normaliza a MÉDIA, não os seus dados".
8. **Erro padrão e a lei do √n** — EP = σ/√n; tabela: n=100 → EP 0,4 · n=400 → EP 0,2 · n=1.600 → EP 0,1; frase: "dobrar a precisão custa 4× os dados"; marcador de pausa para a pergunta em tela.
9. **O que o TCL compra** — regra 68–95–99,7 aplicada à média; seta: "x̄ ± 2·EP cobre μ em ~95% das repetições" → "isso é um intervalo de confiança (módulo 2)".
10. **Exemplo dos 64 talhões** — conta em três linhas: σ=8, n=64 → EP=1 → "82 ± 2 sacas"; contraste com n=16 → EP=2 → "82 ± 4".
11. **Onde o TCL falha** — três cartões: caudas pesadas (convergência lenta/variância infinita); dependência (autocorrelação → n efetivo menor); n pequeno + σ desconhecido → t de Student (teaser módulo 2).
12. **Regra da casa** — checklist de 3 perguntas + frase: "na dúvida, simule — é gratuito".
13. **Próxima parada: Colab** — bullets: notebook pronto e comentado; motor industrial de exemplo; "você vai construir o TCL com as próprias mãos".

---

## Aula 1.4 — Distribuições e TCL na prática: sensores industriais no Colab

**Tipo:** prática · **Duração:** 2h · **Ferramenta:** Google Colab (`numpy`, `scipy`, `matplotlib`)

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos de aprendizagem (Bloom)** | 1. **Executar** (aplicar) análise distribucional completa de dados de sensor: histograma, ajuste de normal com `scipy.stats.norm.fit`, QQ-plot com `probplot`. 2. **Construir** (aplicar/criar) a simulação do TCL: reamostrar uma população exponencial e observar a convergência das médias ao sino. 3. **Calcular** (aplicar) o erro padrão e um intervalo de ~95% para a média, verificando a lei do √n empiricamente. 4. **Diagnosticar** (analisar/avaliar) a normalidade das leituras de um segundo sensor no desafio, interpretando a cauda direita em termos de manutenção. |
| **Duração** | ~2h (setup 10min + trilha guiada 80min + desafio 30min) |
| **Materiais** | Notebook starter `estatistica-padroes-pratica-modulo1.ipynb` (na plataforma, em `/cursos/notebooks/`); conta Google. Dados de temperatura e vibração embutidos no próprio notebook — nenhum download externo. |
| **Sequência didática** | **Abertura:** contexto do caso (motor M-07 de uma planta industrial) + setup. **Desenvolvimento:** execução guiada (histograma → ajuste e QQ-plot → simulação do TCL → erro padrão e IC). **Fechamento:** desafio autônomo do sensor de vibração + postagem no fórum. |
| **Avaliação** | Checklist de conclusão (abaixo) + envio do link do notebook (Compartilhar → qualquer pessoa com o link → Leitor) na plataforma. |

### b) Prática guiada — passo a passo

**Pergunta condutora da prática:** *"Qual é a impressão digital estatística de um motor saudável — e como a incerteza da minha média diminui quando eu coleto mais dados?"*

**Dados:** 60 leituras horárias de temperatura de mancal (°C) e 40 leituras de vibração RMS (mm/s) do motor fictício M-07 — dados didáticos com valores realistas, embutidos no notebook (sem links externos).

1. Baixe o notebook na plataforma (botão "Materiais" → `estatistica-padroes-pratica-modulo1.ipynb`).
2. Acesse https://colab.research.google.com, faça login e use **Arquivo → Fazer upload de notebook**. Salve sua cópia em **Arquivo → Salvar uma cópia no Drive**.
3. Execute a célula de importações (`numpy`, `scipy.stats`, `matplotlib`). *Checkpoint: versões impressas, nenhum erro em vermelho.*
4. Execute a célula que carrega as 60 temperaturas do M-07 e desenha o **histograma**. Responda mentalmente ao roteiro da leitura 1.2: simétrico? uma moda só? *Checkpoint: média ≈ 62 °C impressa na saída.*
5. Execute a célula do **ajuste de normal**: `scipy.stats.norm.fit` estima μ e σ e sobrepõe a curva ao histograma. Compare a curva com as barras: onde ela abraça bem? onde escapa?
6. Execute a célula do **QQ-plot** (`scipy.stats.probplot`). Verifique: os pontos abraçam a reta, inclusive nas pontas? Anote a sua conclusão na célula de texto indicada.
7. Execute a célula que define a **população torta** (tempos entre falhas, exponencial com média 30 dias) e visualize como ela é assimétrica.
8. Execute a célula da **simulação do TCL**: 2.000 amostras para cada n ∈ {2, 10, 50}, histogramas das médias lado a lado. Observe o sino emergindo — este é o gráfico mais importante do módulo.
9. Execute a célula do **erro padrão**: compare o desvio empírico das médias simuladas com o teórico σ/√n para cada n e confirme a **lei do √n** na tabela impressa.
10. Execute a célula do **intervalo de ~95%** para a temperatura média do M-07 (x̄ ± 2·EP) e leia a frase de interpretação pronta — você vai reescrevê-la com rigor no módulo 2.
11. **Desafio final (célula com TODOs):** repita o diagnóstico completo para as 40 leituras de **vibração**: (a) histograma, (b) média e desvio, (c) QQ-plot. Depois responda na célula de texto: a vibração parece normal? O que os 3 pontos que fogem da reta na ponta direita sugerem sobre o M-07 — e por que um limite de alarme μ + 3σ seria arriscado aqui?
12. Compartilhe: **Compartilhar → Qualquer pessoa com o link → Leitor**, envie o link na plataforma e poste no fórum sua resposta ao desafio em até 4 linhas.

**Critérios de conclusão (checklist do aluno):**

- [ ] Todas as células executam sem erro, de cima a baixo (`Ambiente de execução → Executar tudo`).
- [ ] Interpretei o QQ-plot da temperatura (normal ou não, com justificativa).
- [ ] Gerei os três histogramas do TCL e identifiquei em qual n o sino "aparece".
- [ ] Confirmei a lei do √n comparando erro padrão empírico e teórico.
- [ ] Completei os TODOs do desafio de vibração e escrevi o diagnóstico em 4 linhas.
- [ ] Enviei o link compartilhável do notebook na plataforma.

**Problemas comuns e socorro rápido:**

- *"Célula travada em execução"* → **Ambiente de execução → Reiniciar sessão** e execute de novo desde o topo.
- *"NameError: temperaturas is not defined"* → você pulou a célula que cria os dados; execute na ordem.
- *Gráficos diferentes dos meus a cada execução* → normal na simulação; a célula de importações fixa `np.random.seed(42)` — execute-a antes das demais para reproduzir os números do gabarito.
- *A curva normal não aparece sobre o histograma* → confira se o histograma usa `density=True`; sem isso, as escalas de barras e curva não conversam.

---

## Aula 1.5 — Quiz do Módulo 1 — Distribuições, amostragem e TCL

**Tipo:** quiz · **Duração:** 20min

### a) Plano de aula

| Item | Detalhe |
|------|---------|
| **Objetivos** | Verificar a fixação dos conceitos do módulo: escolha de distribuição por mecanismo gerador, enunciado correto do TCL, lei do √n e leitura de QQ-plot. |
| **Formato** | 5 questões objetivas, 3 alternativas, correção automática com explicação; 2 tentativas; compõe a média de quizzes (40% da nota do curso). |

### Questões (com gabarito)

**Q1.** Um sensor registra a cada hora a temperatura de um mancal de motor. As leituras se concentram simetricamente em torno de 62 °C, com pequenos desvios causados por muitos fatores somados (carga, ventilação, ruído elétrico). Qual distribuição tende a descrever bem esses dados?
- a) Normal, porque a soma de muitos efeitos pequenos e independentes tende ao formato de sino. ✅
- b) Poisson, porque a temperatura é uma contagem de graus.
- c) Binomial, porque cada leitura é um sucesso ou um fracasso.

*Explicação: quando muitas perturbações pequenas e independentes se somam, o resultado tende à normal — é o mecanismo gerador clássico do sino. Poisson modela contagens de eventos raros (números inteiros), e a binomial exige ensaios de sim/não; temperatura é uma medida contínua.*

**Q2.** O número de defeitos encontrados por lote em uma linha de produção (0, 1, 2, 3…) — eventos raros e independentes contados em um intervalo fixo. Qual é o modelo natural?
- a) Normal, porque todo dado industrial tende ao sino.
- b) Poisson, a distribuição de contagens de eventos raros em intervalo fixo, cujo parâmetro λ é ao mesmo tempo a média e a variância. ✅
- c) Lognormal, porque defeitos só assumem valores positivos.

*Explicação: contagem de eventos raros e independentes em intervalo fixo é o habitat da Poisson — e a assinatura dela é média ≈ variância. A normal é contínua e admite valores negativos; a lognormal modela medidas contínuas positivas e assimétricas, como renda, não contagens.*

**Q3.** O que o Teorema Central do Limite garante?
- a) Que qualquer conjunto de dados, com n grande, torna-se normalmente distribuído.
- b) Que a distribuição das MÉDIAS amostrais se aproxima da normal quando n cresce, mesmo que a população original não seja normal. ✅
- c) Que amostras grandes eliminam o erro de estimação.

*Explicação: o TCL domestica a distribuição do estimador (médias e somas), não a dos dados — a renda continua assimétrica com um milhão de registros. E o erro de estimação nunca desaparece: ele diminui na proporção de 1/√n, que é justamente o erro padrão.*

**Q4.** O erro padrão da temperatura média de um sensor é 0,4 °C com 100 leituras. Aproximadamente quantas leituras são necessárias para reduzi-lo a 0,2 °C?
- a) 200 leituras — o dobro.
- b) 400 leituras — o quádruplo. ✅
- c) 150 leituras — mais 50%.

*Explicação: erro padrão = σ/√n. Para dividi-lo por 2, é preciso multiplicar n por 4 (√400/√100 = 2). É a lei do √n: cada ganho de precisão custa quadraticamente mais dados — a conta que acompanha qualquer orçamento de coleta.*

**Q5.** No QQ-plot das suas leituras contra a normal teórica, os pontos seguem bem a reta no centro, mas fogem dela para fora nas duas pontas. O diagnóstico correto é:
- a) Os dados são perfeitamente normais — as pontas de um QQ-plot sempre escapam.
- b) Caudas mais pesadas que a normal: valores extremos são mais frequentes do que a normal prevê, e limites do tipo μ ± 3σ subestimarão a taxa de eventos raros. ✅
- c) Erro de construção do gráfico — QQ-plots corretos são sempre retas perfeitas.

*Explicação: pontas fugindo para fora da reta são a assinatura visual de caudas pesadas. A consequência prática é séria: alarmes e detectores calibrados pela regra 68–95–99,7 dispararão muito mais (ou confiarão menos) do que o projetado — tema que volta com força na detecção de anomalias do módulo 6.*
