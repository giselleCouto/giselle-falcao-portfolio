# Curso Completo: Arquiteto de Dados e IA Multicloud

**Formato:** curso autodirigido e bootcamp prático  
**Carga:** 300 horas em 24 semanas  
**Idioma:** Português do Brasil  
**Nível de saída:** profissional autônomo para projetar, implementar, operar, proteger e mensurar soluções de dados e IA em AWS, GCP, Azure e OCI.

## Como estudar

Cada aula segue o ciclo **aprender, construir, quebrar, medir e explicar**. O aluno deve assistir à demonstração, repetir o laboratório, alterar uma variável, provocar uma falha, medir o resultado e registrar uma decisão arquitetural. A conclusão de um módulo exige a entrega do artefato e a aprovação no quiz correspondente.

| Item por módulo | Entrega |
|---|---|
| Aula conceitual | Resumo de uma página e glossário |
| Demonstração | Código reproduzível e captura de evidência |
| Laboratório | Repositório versionado com README |
| Atividade interativa | Pontuação e justificativa das escolhas |
| Podcast | Síntese falada e perguntas de revisão |
| Quiz | Pelo menos 80% de acerto ou refação |
| Diário de arquitetura | ADR com decisão, alternativas, evidências e riscos |

> **Contrato de conclusão:** você só domina um assunto quando consegue construir a solução, explicar a decisão, diagnosticar a falha e calcular seu consumo.

# Módulo 0 — Nivelamento profissional

## Aulas

Aula 0.1 aborda Python, ambientes virtuais, tratamento de exceções e leitura de arquivos. Aula 0.2 revisa SQL, joins, agregações, funções de janela e planos de execução. Aula 0.3 trabalha Git, Linux, Docker e APIs. Aula 0.4 introduz redes, DNS, HTTP, TLS, filas, IAM e sistemas distribuídos.

## Prática guiada

Crie um serviço Docker que receba eventos JSON de pedidos, valide o schema, grave o evento original e exponha `/health` e `/metrics`. Escreva testes para payload válido, campo ausente, duplicidade e indisponibilidade do armazenamento.

## Quiz rápido

1. Qual é a propriedade que permite executar o mesmo lote mais de uma vez sem duplicar o resultado?  
**Resposta:** idempotência.

2. Por que um plano de execução SQL deve ser observado antes de escalar a infraestrutura?  
**Resposta:** porque o gargalo pode ser join, filtro sem partição, cardinalidade ou leitura excessiva, e não falta de CPU.

# Módulo 1 — Pensamento arquitetural e requisitos

## Aulas

Aprenda a converter objetivos de negócio em requisitos funcionais, SLOs, RPO/RTO, requisitos de segurança, custo, residência, latência, frescor e crescimento. Estude diagramas C4, trade-offs, ADRs, threat modeling e matriz de decisão.

## Prática

Receba o requisito: “o fraud scoring deve responder em até dois segundos, suportar dez vezes o volume atual e manter trilha de auditoria”. Produza três arquiteturas, escolha uma e justifique a decisão com custo, latência, segurança, disponibilidade e portabilidade.

## Atividade de arrastar

Arraste cada requisito para a categoria correta: “tempo máximo de resposta” para desempenho; “perda máxima aceitável de dados” para RPO; “tempo máximo de recuperação” para RTO; “dados devem permanecer na região” para residência; “custo por mil transações” para economia unitária.

# Módulo 2 — Fundamentos de dados

## Aulas

Estude dados estruturados, semiestruturados e não estruturados; modelagem relacional, dimensional e Data Vault; fatos, dimensões, chaves, granularidade, SCD, contratos de dados e evolução de schema.

## Laboratório

Combine pedidos em JSON, clientes em CSV e eventos de navegação em Avro. Modele uma tabela de fatos, dimensões de cliente e produto, aplique SCD tipo 2 e publique uma camada gold. O teste injeta coluna nova, arquivo incompleto e duplicação.

## Quiz

1. O que define a granularidade de uma tabela de fatos?  
**Resposta:** o que representa exatamente cada linha.

2. Quando SCD tipo 2 é útil?  
**Resposta:** quando é necessário preservar o histórico das versões de um atributo.

# Módulo 3 — Armazenamento, formatos e lakehouse

## Aulas

Aprenda object storage, camadas bronze/silver/gold, Parquet, Avro, compressão, particionamento, clustering, pequenos arquivos, catálogos e tabelas abertas como Iceberg. Compare lake, warehouse e lakehouse.

## Laboratório

Implemente uma tabela Iceberg ou equivalente com carga incremental, correção retroativa e compactação. Compare consulta direta no lake, tabela materializada e warehouse. Registre bytes lidos, latência e custo estimado.

## Teste de volume

Execute o laboratório com 1 GB, 10 GB e 100 GB. O relatório deve apresentar a curva de latência, o número de arquivos, o volume comprimido, o volume escaneado e o ponto em que a estratégia deixa de ser adequada.

# Módulo 4 — Cloud foundations multicloud

## Aulas

Estude organizações, contas, projetos, subscriptions e tenancies; regiões e zonas; VPC/VNet/VCN; sub-redes; rotas; endpoints privados; DNS; IAM; RBAC/ABAC; KMS; secrets; quotas; logs de auditoria e landing zones.

## Laboratório

Provisione uma landing zone mínima em AWS, GCP, Azure e OCI. Use Terraform para criar ambientes separados, bloquear storage público, restringir regiões, ativar logs e aplicar tags/labels de custo. Destrua tudo ao final.

## Atividade de arrastar

Ordene a cadeia de acesso: identidade, autenticação, autorização, política, recurso e auditoria. Depois arraste cada serviço para a camada correspondente: rede, identidade, armazenamento, processamento, governança ou observabilidade.

# Módulo 5 — Pipelines batch

## Aulas

Aprenda ETL/ELT, ingestão incremental, CDC, DAGs, dependências, retries, backoff, timeout, sensores, backfill, parâmetros, secrets, qualidade, idempotência e contratos.

## Laboratório

Construa um pipeline: fonte → landing → validação → bronze → silver → gold → catálogo → serving. Implemente uma versão com Airflow e faça o mapeamento para Composer, MWAA, Data Factory/Fabric e OCI Data Integration.

## Falhas injetadas

O instrutor deve introduzir schema inválido, atraso, arquivo corrompido, tarefa lenta, duplicidade e falha de credencial. A solução deve recuperar sem propagar dados inválidos e registrar a causa.

# Módulo 6 — Streaming e orquestração orientada a eventos

## Aulas

Estude tópicos, partições, offsets, consumer groups, retenção, ordering, schema registry, watermark, janelas, late data, replay, DLQ, exactly-once e at-least-once.

## Laboratório

Processe eventos de transações e fraude em tempo quase real. Calcule taxa de fraude em janela de cinco minutos, armazene eventos tardios e reexecute uma janela histórica. Derrube o consumidor e prove que o replay funciona.

## Quiz

1. Para que serve o offset?  
**Resposta:** registrar a posição de leitura do consumidor.

2. Por que watermark é necessário?  
**Resposta:** para controlar eventos atrasados em cálculos baseados em tempo de evento.

# Módulo 7 — Analytics, BI e serving

## Aulas

Aprenda warehouses, query engines, materializações, semantic layer, métricas certificadas, row-level security, column-level security, caching, concorrência, frescor e governança de dashboards.

## Laboratório

Publique um conjunto de KPIs de vendas e fraude com métricas certificadas. Compare consulta interativa, materialização incremental e pré-agregação. O painel deve mostrar frescor, custo por consulta e volume escaneado.

# Módulo 8 — ML e MLOps

## Aulas

Estude preparação de features, treino, validação, leakage, métricas, registry, experiment tracking, batch scoring, online serving, drift, monitoramento e rollback.

## Laboratório

Treine um modelo de risco, registre o artefato, faça deploy em endpoint e compare batch scoring com inferência online. Injete drift e estabeleça um alerta. Calcule custo por mil previsões.

# Módulo 9 — GenAI, embeddings e RAG

## Aulas

Aprenda tokens de entrada e saída, janela de contexto, prompts, embeddings, chunking, vector search, reranking, grounding, citações, avaliação, cache, guardrails, prompt injection, PII e fallback de modelo.

## Laboratório completo

Construa um assistente sobre documentos empresariais. O pipeline deve extrair documentos, classificar sensibilidade, criar chunks, gerar embeddings, indexar vetores, recuperar contexto, responder com citações e registrar métricas.

As métricas obrigatórias são precisão de recuperação, groundedness, taxa de “não sei”, latência p50/p95, tokens de entrada, tokens de saída, custo por resposta, custo por resposta útil, taxa de cache e taxa de erro.

## Teste adversarial

Inclua prompt injection dentro de um documento, perguntas fora do domínio, fontes conflitantes, contexto acima do limite, documento contendo PII e indisponibilidade do modelo. A resposta deve recusar com segurança, evitar vazamento e registrar a falha sem expor segredo.

# Módulo 10 — Segurança, governança e privacidade

## Aulas

Estude classificação de dados, ownership, catálogo, linhagem, qualidade, consentimento, mascaramento, tokenização, retenção, auditoria, criptografia, least privilege, segregação e resposta a incidentes.

## Laboratório

Localize PII nas três zonas do lake, aplique mascaramento para analistas, permita acesso integral somente a uma função autorizada, revogue o papel e demonstre a negação. Execute restauração e prove RPO/RTO.

# Módulo 11 — Observabilidade e SRE de dados

## Aulas

Aprenda logs, métricas, traces, data freshness, volume, distribuição, schema, null rate, incidentes, SLI/SLO, error budget e runbooks.

## Laboratório

Crie um painel com duração do pipeline, atraso, taxa de falha, registros rejeitados, freshness, custo por execução e custo por unidade. Configure alertas e escreva um runbook para três incidentes.

# Módulo 12 — FinOps de dados e IA

## Aulas

Aprenda storage GB-mês, requests, processamento, shuffle, consulta, streaming, egress, NAT, backups, logs, GPU, embeddings, tokens, cache, reranking, budgets, forecast, showback, chargeback e unit economics.

## Exercício de mensuração

Preencha a planilha fornecida com drivers reais: GB/dia, retenção, crescimento, duração do job, vCPU-hora, bytes escaneados, egress, número de respostas, tokens médios, cache hit e retenção de logs.

Use a fórmula:

```text
custo mensal = Σ(quantidade do driver × preço unitário × fator regional)
              + rede + custos fixos + contingência − descontos
```

Depois produza cenários baixo, base e alto. Calcule custo por milhão de eventos, custo por TB-mês, custo por pipeline, custo por mil consultas, custo por previsão e custo por resposta útil de GenAI.

# Módulo 13 — Portabilidade entre AWS, GCP, Azure e OCI

## Prática comparativa

Implemente uma mesma solução em uma nuvem e produza o mapa de tradução para as outras três. Separe o que é portátil, como Parquet, SQL, Docker, Terraform, Spark, Iceberg e OpenTelemetry, do que é específico, como APIs proprietárias, IAM, billing e controles de rede.

## Desafio

A banca muda região, volume, SLA, modelo de GenAI e orçamento. O aluno deve atualizar o diagrama, o plano de migração, a estimativa e os riscos sem reescrever toda a solução.

# Módulo 14 — Projeto final

O cenário combina dados de clientes, documentos regulatórios, transações batch, eventos de fraude em streaming e um assistente de atendimento com RAG. O projeto deve conter arquitetura, requisitos, ADRs, Terraform, pipelines, testes, catálogo, políticas, observabilidade, modelo de custos, threat model, DR, runbook e defesa oral.

## Critérios de aprovação

| Critério | Peso |
|---|---:|
| Arquitetura e trade-offs | 20% |
| Implementação funcional | 20% |
| Confiabilidade e testes | 15% |
| Segurança e governança | 15% |
| FinOps e economia unitária | 20% |
| Comunicação e defesa | 10% |

A aprovação exige 70% no curso, 80% em cada quiz de módulo, ausência de falha crítica de segurança e no mínimo 80% no projeto final.

# Banco de quizzes

## Quiz A — Dados e pipelines

1. O que é idempotência?  
A) Executar mais rápido. B) Repetir uma operação sem produzir duplicidade indevida. C) Criptografar arquivos. D) Aumentar a retenção.  
**Gabarito:** B.

2. Qual camada normalmente preserva o dado bruto?  
A) Gold. B) Serving. C) Bronze. D) BI.  
**Gabarito:** C.

3. Qual prática reduz consultas que leem dados desnecessários?  
A) Remover partições. B) Particionar e filtrar corretamente. C) Duplicar todas as tabelas. D) Desativar compressão.  
**Gabarito:** B.

## Quiz B — Cloud e segurança

4. O princípio de least privilege significa:  
A) dar acesso administrativo temporário a todos. B) conceder somente o acesso necessário. C) remover auditoria. D) usar uma senha compartilhada.  
**Gabarito:** B.

5. O que deve ser separado em uma landing zone?  
A) somente nomes de bucket. B) ambientes, identidades, redes, logs e políticas. C) apenas dashboards. D) somente modelos.  
**Gabarito:** B.

## Quiz C — Streaming

6. O que acontece com eventos tardios?  
A) devem ser sempre descartados. B) precisam de política de watermark, janela e reprocessamento. C) devem sobrescrever todos os eventos. D) são automaticamente corretos.  
**Gabarito:** B.

## Quiz D — GenAI

7. Qual é a diferença entre token de entrada e token de saída?  
A) entrada é o contexto enviado; saída é o texto gerado. B) são sinônimos. C) entrada é sempre imagem. D) saída é sempre embedding.  
**Gabarito:** A.

8. Por que medir custo por resposta útil?  
A) porque toda resposta é correta. B) porque erros, recusas e retrabalho também consomem recursos. C) para eliminar avaliação. D) para ignorar tokens.  
**Gabarito:** B.

## Quiz E — FinOps

9. Qual driver normalmente influencia o custo de consulta?  
A) cor do dashboard. B) bytes escaneados ou capacidade consumida. C) nome do usuário. D) tamanho do README.  
**Gabarito:** B.

10. Qual é a melhor prática para uma estimativa?  
A) usar um valor fixo sem premissas. B) documentar drivers, região, unidade, data e cenários. C) estimar apenas storage. D) ignorar egress.  
**Gabarito:** B.

# Roteiros de vídeo demonstrativo

## Vídeo 1 — Construindo um pipeline idempotente

**Duração:** 12 minutos.  
**Abertura:** “Nesta aula vamos transformar um arquivo bruto em uma tabela curada e provar que uma segunda execução não duplica dados.”  
**Cena 1:** mostrar o contrato de entrada e destacar a chave natural.  
**Cena 2:** executar a ingestão para a camada landing.  
**Cena 3:** validar schema e enviar registros inválidos para a quarentena.  
**Cena 4:** executar a transformação incremental.  
**Cena 5:** executar novamente o mesmo lote e comparar contagens.  
**Cena 6:** inserir uma falha e mostrar retry, logs e alerta.  
**Encerramento:** o aluno deve repetir o laboratório e alterar a chave de deduplicação.

## Vídeo 2 — Medindo custo de uma consulta

**Duração:** 10 minutos.  
Mostrar uma consulta sem filtro de partição, observar bytes lidos, reescrever com partição e comparar latência e custo. Depois simular aumento de volume e registrar o ponto de inflexão.

## Vídeo 3 — RAG com medição de tokens

**Duração:** 15 minutos.  
Mostrar ingestão do documento, chunking, embeddings, busca, prompt final, resposta com citação e telemetria de tokens. Em seguida, ativar cache e comparar custo por resposta.

## Vídeo 4 — Arrastar componentes para formar uma arquitetura

**Duração:** 8 minutos.  
O narrador mostra componentes de fonte, ingestão, lake, processamento, catálogo, warehouse, vector store, modelo, observabilidade e billing. O aluno pausa o vídeo, executa a atividade interativa e depois compara com a solução comentada.

# Roteiros de podcast

## Podcast 1 — O que realmente faz um arquiteto de dados

**Direção de voz:** Speak in Brazilian Portuguese with a clear, warm, professional educational podcast tone, moderate pace, distinct pauses between concepts:  
“Um arquiteto de dados não começa escolhendo um produto. Ele começa perguntando qual decisão o dado precisa apoiar, qual atraso é aceitável, quem pode acessar a informação, como a falha será tratada e quanto cada unidade de valor pode custar. A tecnologia vem depois da clareza.”

## Podcast 2 — A conta invisível do egress

**Direção de voz:** Speak in Brazilian Portuguese with an engaging explanatory tone, as if teaching a senior engineering class:  
“Armazenar dados costuma ser apenas uma parte da conta. Consultas repetidas, logs, backups, NAT, replicação e transferência entre regiões podem dominar o custo. Por isso, toda seta em um diagrama deve responder a três perguntas: quantos dados passam, com que frequência e para onde eles vão?”

## Podcast 3 — Tokens não são qualidade

**Direção de voz:** Speak in Brazilian Portuguese with a thoughtful, precise technology podcast tone and short pauses:  
“Mais tokens não significam automaticamente uma resposta melhor. Contexto excessivo pode aumentar custo, latência e ruído. O objetivo é medir a resposta útil: evidência recuperada, correção, segurança, latência e custo. Um sistema de GenAI maduro otimiza qualidade por unidade de consumo.”

# Atividades interativas sugeridas

## Arrastar e soltar 1 — Pipeline correto

Componentes: fonte, ingestão, landing, validação, bronze, transformação, silver, qualidade, gold, catálogo, serving, observabilidade. O aluno deve ordenar os componentes. A atividade concede pontos por cada posição correta e mostra a explicação ao final.

## Arrastar e soltar 2 — Serviço por capacidade

Colunas: armazenamento, processamento, streaming, orquestração, governança, GenAI, observabilidade e FinOps. Cartões: object storage, Spark, fila de eventos, DAG, catálogo, vector database, tracing e billing export. O aluno deve classificar os cartões e depois mapear cada capacidade para AWS, GCP, Azure e OCI.

## Arrastar e soltar 3 — Drivers de custo

Arraste “GB-mês”, “bytes escaneados”, “vCPU-hora”, “egress”, “tokens de entrada”, “tokens de saída”, “embeddings”, “logs” e “backups” para armazenamento, processamento, rede, GenAI ou operações.

# Plano de produção multimídia

Cada módulo deve ter uma aula de 15 a 25 minutos, um vídeo de demonstração, um podcast de 5 a 8 minutos, uma atividade interativa, um laboratório, dez perguntas de quiz e uma checklist de entrega. Os vídeos devem mostrar terminal, código, diagrama e telemetria; os podcasts devem reforçar decisões e anti padrões; a atividade de arrastar deve exigir raciocínio de arquitetura, não apenas memorização.

# Checklist do aluno

Antes de considerar o curso concluído, confirme que você consegue: desenhar uma arquitetura em quatro nuvens; criar uma landing zone; construir batch e streaming; aplicar idempotência e backfill; governar PII; medir freshness e qualidade; fazer RAG com avaliação; calcular storage, compute, consulta, egress, logs e tokens; criar cenários de custo; configurar orçamento; responder a incidentes; executar DR; e defender uma decisão arquitetural.

**Autor:** Manus AI
