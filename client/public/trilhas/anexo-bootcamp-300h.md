# Bootcamp Arquiteto de Dados e IA Multicloud

**Versão:** 1.0 — agosto de 2026  
**Carga recomendada:** 24 semanas, 12 a 15 horas por semana, aproximadamente 300 horas  
**Nível de saída:** arquiteto capaz de projetar, implementar, operar, proteger e custear plataformas de dados e IA em AWS, GCP, Azure e OCI  
**Pré-requisitos:** Python básico, SQL, Git, Linux e fundamentos de redes. O bootcamp inclui uma semana de nivelamento para quem ainda não domina esses temas.

> **Objetivo de competência.** Ao concluir a trilha, o aluno deverá conseguir transformar um requisito de negócio em uma arquitetura executável, escolher serviços equivalentes entre as quatro nuvens, construir pipelines batch e streaming, governar dados, operar workloads de analytics e GenAI, medir consumo por unidade de negócio e defender uma estimativa de custo com premissas, cenários e limites de confiança.

## 1. Como o bootcamp funciona

A formação é organizada em ciclos de **conceito, construção, medição e defesa**. Cada módulo produz um artefato versionado em Git: diagrama, ADR (Architecture Decision Record), código de infraestrutura, pipeline, testes, dashboard de observabilidade ou modelo de custos. O aluno não “passa” por assistir a aulas; ele progride quando consegue explicar as decisões, executar o laboratório e diagnosticar uma falha introduzida deliberadamente.

A arquitetura pedagógica usa uma nuvem primária por sprint e mantém um **contrato de portabilidade**. O mesmo domínio é implementado com serviços nativos e, quando aplicável, com componentes abertos como Apache Spark, Kafka, Airflow, dbt, Iceberg, Trino, OpenTelemetry, Docker, Kubernetes e Terraform. O propósito não é fingir que os serviços são idênticos, mas ensinar a separar **capacidade arquitetural**, **interface operacional** e **implementação específica do provedor**.

| Dimensão | Resultado esperado | Evidência de domínio |
|---|---|---|
| Dados | Projetar lake, warehouse, lakehouse, streaming e serving | Diagrama, modelo, pipeline e consulta com SLO |
| Plataforma | Automatizar ambientes, identidades, redes e políticas | Repositório IaC reproduzível e revisão de segurança |
| IA/GenAI | Construir RAG, avaliação, serving e controles de uso | Aplicação com métricas de qualidade, latência e tokens |
| Operação | Monitorar confiabilidade, qualidade, segurança e custo | Painel, alertas, runbook e simulação de incidente |
| FinOps | Prever, atribuir, otimizar e explicar gastos | Modelo bottom-up, orçamento, variação e recomendação |
| Arquitetura | Comparar alternativas e justificar trade-offs | ADR, threat model, matriz de decisão e defesa oral |

A referência conceitual é um fluxo de analytics com ingestão, armazenamento, processamento, catálogo/governança e consumo. Essa decomposição aparece nas arquiteturas oficiais dos provedores: o Azure recomenda decidir armazenamento, modelo de processamento e ferramentas analíticas, além de orquestrar a ingestão e considerar o custo total; a arquitetura de lake da OCI separa refinaria, persistência/processamento e acesso/interpretação; AWS e Google mantêm centros de referência para arquiteturas modernas de analytics e big data.[1] [2] [3] [4]

## 2. Mapa de competências e correspondência multicloud

A tabela abaixo é uma **bússola de capacidades**, não uma promessa de equivalência de preço ou funcionalidade. Os nomes e limites mudam; por isso, o aluno deve consultar a calculadora e a tabela de preços da região no momento da estimativa.

| Capacidade | AWS | GCP | Azure | OCI | Abstração portátil ensinada |
|---|---|---|---|---|---|
| Object storage/lake | Amazon S3 | Cloud Storage | ADLS Gen2 | Object Storage | Buckets, camadas, retenção, versionamento, criptografia |
| Warehouse/lakehouse | Redshift, Athena, EMR/Iceberg | BigQuery, Dataproc | Synapse, Fabric, Databricks | Autonomous Data Warehouse, Big Data Service | Tabelas, partições, formatos colunares e contratos |
| Batch distribuído | EMR, Glue | Dataproc, Dataflow | Databricks, Synapse, Fabric | Data Flow | Spark, particionamento, shuffle, idempotência |
| Streaming | Kinesis, MSK, Flink | Pub/Sub, Dataflow | Event Hubs, Stream Analytics | Streaming, Kafka compatível | Eventos, offsets, watermark, replay e DLQ |
| Orquestração | Step Functions, MWAA, Glue Workflows | Composer, Workflows | Data Factory, Fabric Pipelines, Airflow | Data Integration, OCI Functions | DAGs, retries, backfill, lineage e SLO |
| Catálogo/governança | Glue Data Catalog, Lake Formation | Dataplex, Data Catalog | Purview, Unity Catalog | Data Catalog | Metadados, classificação, ownership, política e linhagem |
| ML/GenAI | SageMaker, Bedrock | Vertex AI | Azure ML, Azure OpenAI, AI Foundry | OCI Data Science, Generative AI | Registry, avaliação, serving, RAG, guardrails |
| Containers | EKS, ECS, Fargate | GKE, Cloud Run | AKS, Container Apps | OKE, Container Instances | Imagem, registry, identidade, autoscaling e observabilidade |
| Observabilidade | CloudWatch, X-Ray | Cloud Monitoring/Logging/Trace | Azure Monitor, App Insights | Monitoring, Logging, APM | Métricas, logs, traces, SLO e custo por operação |
| FinOps | Cost Explorer, CUR, Budgets | Billing export, BigQuery billing, Budgets | Cost Management, budgets | Cost Analysis, budgets | Tags/labels, rate card, alocação, forecast e showback |

## 3. Currículo em 24 semanas

### Fase 0 — Nivelamento e método de arquitetura — semanas 1 e 2

O aluno revisa Python para dados, SQL analítico, Git, Docker, Linux, HTTP, JSON, filas, redes, IAM e princípios de sistemas distribuídos. Em seguida, aprende a escrever requisitos funcionais e não funcionais, SLOs, RPO/RTO, ADRs, diagramas C4 e threat models.

**Laboratório:** construir um serviço Docker que recebe eventos de vendas, valida um contrato JSON, persiste uma cópia local e expõe métricas Prometheus. O teste exige reproduzir o ambiente do zero, alterar o schema de forma compatível e explicar o impacto de uma indisponibilidade do armazenamento.

### Fase 1 — Fundamentos de engenharia de dados — semanas 3 a 5

Conteúdo: modelagem dimensional e Data Vault; normalização e desnormalização; formatos Parquet, Avro e JSON; compressão; particionamento e clustering; CDC; qualidade, idempotência e deduplicação; batch versus streaming; data contracts e schema evolution.

**Exemplo prático:** a fonte envia pedidos em JSON, clientes em CSV e eventos de navegação em Avro. O aluno cria zonas bronze, silver e gold, converte o bronze para Parquet, particiona por data e país, aplica regras de qualidade e publica uma tabela de fatos. Deve provar que uma reexecução não duplica registros.

**Teste de domínio:** o instrutor injeta duplicatas, atraso de eventos, coluna nova e arquivo corrompido. A solução deve enviar registros inválidos para uma DLQ, preservar a linhagem e produzir relatório de qualidade.

### Fase 2 — Cloud foundations e landing zone — semanas 6 e 7

Conteúdo: organizações/contas/projetos/tenancies; regiões e zonas; VPC/VNet/VCN; sub-redes, rotas, endpoints privados, DNS e conectividade híbrida; IAM, RBAC, ABAC, secrets, KMS, logs de auditoria e políticas; IaC com Terraform; ambientes dev, staging e produção.

**Laboratório multicloud:** provisionar o mesmo contrato de landing zone em uma conta AWS, projeto GCP, subscription Azure e tenancy OCI, utilizando módulos Terraform separados por provedor. O aluno deve aplicar least privilege, bloquear storage público, ativar logs e produzir um inventário de recursos.

### Fase 3 — Lake, warehouse e lakehouse — semanas 8 a 10

Conteúdo: data lake, warehouse e lakehouse; tabelas abertas; Iceberg; catálogo; transações; compactação; vacuum/retention; concorrência; query engines; materializações; governança de PII; políticas por coluna e linha.

**Laboratório:** criar um lakehouse de pedidos com bronze/silver/gold e duas tabelas Iceberg. Executar cargas incrementais e uma correção retroativa. Comparar três estratégias: consulta direta no lake, tabela materializada e warehouse. Medir custo, latência, bytes lidos e frescor.

**Critério de autonomia:** justificar por que uma consulta deve ser particionada, quando compactar arquivos pequenos, por que uma tabela não deve ser exposta diretamente ao analista e qual é o custo de duplicar dados em outra nuvem.

### Fase 4 — Pipelines e orquestração — semanas 11 a 13

Conteúdo: DAGs, dependências, retries com backoff, timeouts, sensores, backfill, parametrização, secrets, data-aware scheduling, SLAs, event-driven orchestration, CDC, checkpoints, watermark, replay, exatamente-uma-vez versus pelo-menos-uma-vez, testes unitários e de integração.

**Padrão de pipeline ensinado:**

```text
Fonte -> Ingestão -> Landing -> Validação de contrato -> Bronze
      -> Transformação incremental -> Silver -> Qualidade -> Gold
      -> Catálogo/linhagem -> Serving/BI/Feature Store -> Monitoramento
```

**Laboratório:** implementar o DAG em Airflow/Composer/MWAA/Data Factory/OCI Data Integration, conforme a nuvem do sprint. O DAG deve aceitar `data_interval`, permitir backfill, ser idempotente, publicar métricas e parar antes de propagar dados inválidos. Uma segunda versão deve reagir a evento e não apenas a cron.

### Fase 5 — Streaming e dados em tempo real — semanas 14 e 15

Conteúdo: tópicos e partições, ordenação, retenção, offsets, consumer groups, schema registry, janelas, joins temporais, late data, DLQ, replay, custo por volume e throughput.

**Laboratório:** processar eventos de transação e fraude em streaming. Gerar uma janela de cinco minutos, calcular taxa de fraude, armazenar eventos atrasados e reprocessar uma janela histórica. O teste injeta duplicação, indisponibilidade do consumidor e pico de 10 vezes no volume.

### Fase 6 — ML, GenAI e RAG — semanas 16 a 19

Conteúdo: ciclo de vida de ML, feature engineering, treino, avaliação, registry, drift, batch scoring e online serving; embeddings, chunking, vector search, RAG, grounding, citações, prompt injection, PII, guardrails, avaliação offline e observabilidade de LLM.

**Laboratório de RAG:** construir um assistente sobre documentação de uma empresa fictícia. O pipeline extrai documentos, classifica sensibilidade, cria chunks, gera embeddings, indexa vetores, recupera contexto e responde com citações. O aluno deve medir precisão de recuperação, groundedness, taxa de “não sei”, latência p50/p95, tokens de entrada/saída, custo por resposta e custo por usuário.

**Teste adversarial:** documentos conflitantes, pergunta fora do domínio, prompt injection dentro de um documento, contexto acima do limite, resposta com PII e modelo indisponível. A solução deve falhar de forma segura e registrar o motivo.

### Fase 7 — Segurança, privacidade, governança e confiabilidade — semanas 20 e 21

Conteúdo: classificação, ownership, catálogo, linhagem, qualidade, consentimento, mascaramento, tokenização, retenção, auditoria, residência, criptografia, segregação de ambientes, DR, RPO/RTO, SLOs e resposta a incidentes.

**Laboratório:** localizar PII em três zonas, aplicar mascaramento para consumidores diferentes, revogar uma permissão e demonstrar que o acesso deixa de funcionar. Executar um exercício de restauração e provar o RPO/RTO medido.

### Fase 8 — FinOps e arquitetura econômica — semanas 22 e 23

Conteúdo: custo fixo e variável; armazenamento, operações, requests, processamento, shuffle, consultas, transferência, egress, logs, backups, NAT, IP, GPUs, endpoints, observabilidade e suporte; tagging/labeling; rate cards; budgets; forecast; showback/chargeback; unit economics; compromisso/reserva/spot; rightsizing; políticas de desligamento.

O Azure recomenda avaliar o custo total, equilibrando o preço por unidade de computação com o tempo de execução; essa ideia é central no bootcamp: **o job mais barato por hora pode ser mais caro por execução se for ineficiente**.[2]

### Fase 9 — Capstone e defesa — semana 24

O aluno recebe um cenário empresarial, restrições de segurança, metas de latência, volumes, crescimento e orçamento. Deve entregar uma arquitetura em duas nuvens, uma implementação funcional em uma nuvem e um plano de portabilidade para as outras duas. A banca pode alterar região, volume, SLA, modelo ou preço de transferência na defesa.

## 4. Método completo para mensurar custos

A estimativa não deve começar pelo nome do serviço. Deve começar por **drivers de consumo**. Para cada componente, registre unidade de cobrança, quantidade, frequência, região, camada de redundância, desconto aplicável, retenção e hipótese.

### 4.1 Drivers obrigatórios

| Categoria | Drivers que o aluno deve medir |
|---|---|
| Armazenamento | GB-mês por camada, crescimento, compressão, número de objetos, requests, versões, retenção, backups e replicação |
| Ingestão | GB/dia, eventos/s, tamanho médio, frequência, operações, transformação e replay |
| Processamento | vCPU-hora, OCPU-hora, DBU, worker-hora, memória, GPU-hora, duração, autoscaling e shuffle |
| Consulta | bytes escaneados, slots/compute dedicado, concorrência, cache, materialização e frequência |
| Streaming | throughput, partições, retenção, mensagens, consumidores, janelas e reprocessamento |
| Rede | entrada, saída, egress entre regiões/nuvens, NAT, VPN, interconexão, endpoints e balanceadores |
| GenAI | tokens de entrada, tokens de saída, embeddings, chamadas, batch, cache, armazenamento vetorial, reranking e GPU |
| Operação | logs ingeridos, métricas, traces, retenção, alertas, scans, secrets, chaves e suporte |

### 4.2 Fórmula de custo mensal

```text
Custo mensal = Σ (quantidade do driver × preço unitário × fator de região)
              + custos de transferência
              + custos fixos
              - descontos/créditos
              + contingência operacional
```

A contingência não deve esconder incerteza. Apresente três cenários: **baixo**, **base** e **alto**, variando volume, crescimento, concorrência, duração do job, tokens por requisição, taxa de cache e egress. O aluno deve separar custo contratado de custo efetivamente usado.

### 4.3 Unidade econômica

O resultado precisa ser expresso em unidades de negócio, por exemplo: custo por milhão de eventos ingeridos, custo por TB-month armazenado, custo por pipeline concluído, custo por 1.000 consultas, custo por previsão, custo por documento indexado e custo por resposta válida do assistente.

Para GenAI, use:

```text
Custo por resposta =
  (tokens_in × preço_in + tokens_out × preço_out)
  + embeddings
  + recuperação/reranking
  + banco vetorial
  + compute do pipeline
  + observabilidade
  + amortização de documentos e índices
```

O aluno deve ainda calcular **custo por resposta útil**, pois respostas recusadas, alucinações e retrabalho também têm custo. Acompanhe `tokens_in`, `tokens_out`, `tokens_total`, `cache_hit`, `latência`, `erro`, `modelo`, `tenant` e `feature`.

### 4.4 Procedimento de estimativa reproduzível

Primeiro, desenhe a arquitetura e marque cada fluxo de dados. Depois, transforme cada fluxo em drivers, aplique preços oficiais da região e registre a data da consulta. Em seguida, valide a estimativa com um pequeno laboratório, compare previsão versus fatura/telemetria, calcule a variação e atualize o modelo. Por fim, configure orçamento, alerta e política de desligamento.

Use as calculadoras e páginas de preço oficiais, que são dinâmicas e variam por região, moeda, tier, contrato e compromisso. A AWS mantém referências de arquitetura e calculadora de preços; o Google explica que o preço varia por produto e uso; a Azure centraliza preços e custos; e a OCI disponibiliza lista de preços e estimador.[1] [5] [6] [7]

## 5. Testes práticos e rubrica de avaliação

Cada laboratório deve conter testes de caminho feliz, falha, volume, segurança, custo e recuperação. Não basta “rodar uma vez”.

| Área | Teste prático | Evidência mínima |
|---|---|---|
| Volume | Multiplicar o volume por 10 e por 100 | Curva de latência, custo e throughput; gargalo identificado |
| Armazenamento | Verificar retenção, compactação e crescimento | Projeção de 12 meses com três cenários |
| Ingestão | Reenviar o mesmo lote e atrasar eventos | Zero duplicidade indevida e política de late data |
| Pipeline | Falhar uma etapa e executar retry/backfill | DAG recuperável, idempotente e observável |
| Qualidade | Injetar schema inválido e PII | Quarentena, alerta, linhagem e mascaramento |
| Streaming | Derrubar consumidor e reprocessar offsets | Sem perda silenciosa; replay documentado |
| GenAI | Prompt injection e pergunta sem evidência | Recusa segura, grounding e logs sem segredo |
| FinOps | Variar região, egress e tokens | Modelo parametrizado e análise de sensibilidade |
| Segurança | Revogar papel e tentar acesso | Negação comprovada, auditoria e princípio de menor privilégio |
| DR | Simular indisponibilidade do serviço principal | RPO/RTO medidos e runbook executável |

A aprovação exige nota mínima de 70%, nenhum zero em segurança e uma defesa técnica. A rubrica pondera arquitetura e trade-offs em 20%, implementação em 20%, confiabilidade em 15%, segurança/governança em 15%, FinOps em 20% e comunicação em 10%. Para o nível “autônomo”, o aluno deve obter pelo menos 80% no capstone e explicar como migraria a solução sem depender de uma única API proprietária.

## 6. Capstone recomendado: Plataforma de risco e atendimento com GenAI

O cenário combina transações batch, eventos de cartão em streaming, documentos regulatórios, dados de clientes com PII e um assistente de atendimento. O volume inicial é definido pelo instrutor e pode crescer dez vezes durante a banca. A solução deve manter dados brutos imutáveis, publicar dados curados, detectar fraude em tempo quase real, responder perguntas apenas com fontes autorizadas e oferecer custo por cliente e por resposta.

A entrega inclui: documento de requisitos; diagrama lógico e físico; matriz de equivalência AWS/GCP/Azure/OCI; Terraform; pipeline batch; pipeline streaming; catálogo e políticas; suíte de testes; dashboards de SLO, qualidade e custo; threat model; modelo de custo baixo/base/alto; runbook de incidentes; plano de DR; e defesa de 45 minutos.

O capstone é considerado concluído somente quando o aluno consegue responder, com números e evidências: quantos GB entram por dia; quantos GB permanecem após compressão; quantos TB serão armazenados em 12 meses; quanto custa cada execução; quais bytes são transferidos entre regiões; quanto custa cada mil consultas; quantos tokens são consumidos por resposta; qual é o custo de uma resposta útil; que acontece quando o volume cresce dez vezes; e qual componente será otimizado primeiro.

## 7. Rotina semanal do aluno

| Atividade | Tempo | Produto |
|---|---:|---|
| Estudo conceitual e leitura da documentação | 2 h | Notas e glossário |
| Implementação guiada | 4 h | Código e infraestrutura |
| Desafio individual | 3 h | Solução sem roteiro |
| Medição de desempenho e custo | 2 h | Relatório com evidências |
| Revisão arquitetural | 1 h | ADR e feedback |
| Defesa ou retrospectiva | 1 a 3 h | Apresentação e plano de melhoria |

A cada semana, o aluno deve atualizar um **diário de decisões** com quatro campos: decisão tomada, alternativas rejeitadas, evidência usada e condição que faria a decisão mudar. Isso desenvolve autonomia de arquitetura, em vez de memorização de catálogo.

## 8. Kit técnico mínimo

Use GitHub, Python, SQL, Docker, Terraform, Makefile, pre-commit, pytest, dbt, Spark, Airflow, Kafka ou equivalente gerenciado, OpenTelemetry, Prometheus/Grafana, Parquet, Iceberg e um scanner de qualidade. As contas cloud devem usar quotas, budgets, regiões de baixo custo e recursos efêmeros. Cada laboratório começa com uma previsão de custo e termina com a destruição do ambiente, salvo quando o exercício exigir retenção.

Recomenda-se implementar primeiro uma versão local com Docker e dados públicos, depois uma versão em uma nuvem e finalmente um exercício de tradução para as outras três. Serviços gerenciados devem ser comparados com alternativas abertas, mas não necessariamente implantados integralmente nas quatro nuvens em todas as semanas: a meta é dominar o raciocínio de portabilidade e os pontos de acoplamento.

## 9. Resultado esperado ao final

O egresso não será apenas um usuário de serviços de nuvem. Ele deverá ser capaz de atuar como responsável técnico por uma plataforma: esclarecer requisitos, escolher o padrão certo, estimar consumo, controlar blast radius, automatizar provisionamento, acompanhar qualidade e segurança, operar pipelines, avaliar GenAI, justificar o custo e conduzir uma migração ou evolução sem perder governança.

> **Regra de ouro do arquiteto:** toda arquitetura deve declarar seus dados, unidades de consumo, limites, falhas esperadas, políticas de segurança, SLOs, custo unitário e plano de mudança. Se esses elementos não estão escritos e medidos, a solução ainda é um protótipo.

## Referências

[1]: https://aws.amazon.com/architecture/analytics-big-data/ — AWS, “Architecture Best Practices for Analytics & Big Data”.

[2]: https://learn.microsoft.com/en-us/azure/architecture/analytics/analytics-get-started — Microsoft Learn, “Get started with analytics architecture design”.

[3]: https://cloud.google.com/architecture/big-data-analytics — Google Cloud Architecture Center, “Big data and analytics resources”.

[4]: https://docs.oracle.com/en/solutions/arch-center-about-data-lake/index.html — Oracle Architecture Center, “Learn About Designing Data Lakes in Oracle Cloud”.

[5]: https://aws.amazon.com/pricing/ — AWS, “Pricing”.

[6]: https://cloud.google.com/pricing — Google Cloud, “Pricing overview”.

[7]: https://www.oracle.com/cloud/price-list/ — Oracle, “OCI Price List”.

[8]: https://azure.microsoft.com/en-us/pricing — Microsoft Azure, “Pricing overview”.

**Autor:** Manus AI
