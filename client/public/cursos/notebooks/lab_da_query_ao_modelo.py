# Databricks notebook source
# MAGIC %md
# MAGIC # Da Query ao Modelo — Lab completo da palestra
# MAGIC **Giselle Falcão · DATA BH / SQL Saturday 2026**
# MAGIC
# MAGIC Pipeline end-to-end: query exploratória → features com Window Functions → modelo de classificação (churn) → MLflow → serving.
# MAGIC
# MAGIC ✅ Funciona na **Databricks Free Edition** (as seções de AutoML e Serving têm observações quando o recurso não estiver disponível no seu workspace).
# MAGIC
# MAGIC > **Antes da palestra:** rode o notebook inteiro (Run All), deixe todas as saídas visíveis e NÃO limpe os resultados.

# COMMAND ----------

# MAGIC %md
# MAGIC ## ATO 0 — Preparação (rodar antes, não mostrar no palco)
# MAGIC Gera dados sintéticos de vendas: 2.000 clientes, ~60k compras em 24 meses, com padrões reais de churn embutidos (clientes que "esfriam" compram com intervalos crescentes antes de sumir).

# COMMAND ----------

import random
from datetime import date, timedelta

random.seed(42)

linhas = []
hoje = date(2026, 8, 1)

for cliente_id in range(1, 2001):
    perfil = random.random()
    # 25% dos clientes vão "esfriar" (churn): intervalos entre compras crescem
    vai_sumir = perfil < 0.25
    ticket_base = random.choice([40, 80, 120, 250, 600])
    d = hoje - timedelta(days=random.randint(600, 730))
    intervalo = random.randint(7, 45)
    while d < hoje:
        valor = round(ticket_base * random.uniform(0.6, 1.6), 2)
        linhas.append((cliente_id, d.isoformat(), valor))
        if vai_sumir:
            intervalo = int(intervalo * random.uniform(1.15, 1.45))  # esfriando…
            if intervalo > 160:
                break  # sumiu
        d = d + timedelta(days=intervalo + random.randint(-3, 3))

df_vendas = spark.createDataFrame(linhas, "cliente_id INT, data STRING, valor DOUBLE") \
                 .selectExpr("cliente_id", "CAST(data AS DATE) AS data", "valor")

spark.sql("CREATE SCHEMA IF NOT EXISTS demo_palestra")
spark.sql("USE demo_palestra")
df_vendas.write.mode("overwrite").saveAsTable("vendas_raw")

print(f"Gerado: {df_vendas.count():,} compras de 2.000 clientes")

# COMMAND ----------

# MAGIC %md
# MAGIC ---
# MAGIC # 🎬 ATO 1 — A ponte: SQL dentro do Spark
# MAGIC ### (slide "spark.sql( ): três caracteres de distância")
# MAGIC A query abaixo é 100% SQL comum. A única novidade: ela devolve um **DataFrame**.

# COMMAND ----------

df = spark.sql("""
  SELECT cliente_id,
         COUNT(*)          AS compras,
         ROUND(SUM(valor)) AS total_gasto,
         MAX(data)         AS ultima_compra
  FROM   vendas_raw
  GROUP  BY cliente_id
  ORDER  BY total_gasto DESC
""")

display(df)

# COMMAND ----------

# MAGIC %md
# MAGIC **Fala de palco:** "Alguém viu algo desconhecido nessa query? Não. A novidade é o `df` — a tabela de resultado, só que *viva*: aceita mais SQL, aceita Python, e é o formato que o modelo come."

# COMMAND ----------

# MAGIC %md
# MAGIC ---
# MAGIC # 🎬 ATO 2 — Delta Lake: a tabela que ML exige
# MAGIC ### (slide "Delta Lake")
# MAGIC Criar Delta = `CREATE TABLE ... USING DELTA`. É SQL.

# COMMAND ----------

# MAGIC %sql
# MAGIC CREATE OR REPLACE TABLE vendas USING DELTA AS
# MAGIC SELECT * FROM vendas_raw;
# MAGIC
# MAGIC SELECT COUNT(*) AS linhas FROM vendas;

# COMMAND ----------

# MAGIC %md
# MAGIC ### Time Travel ao vivo (o momento "quem nunca?")
# MAGIC Vamos "estragar" a tabela de propósito… e voltar no tempo.

# COMMAND ----------

# MAGIC %sql
# MAGIC -- Alguém do time apaga metade da tabela numa sexta-feira:
# MAGIC DELETE FROM vendas WHERE valor < 100;
# MAGIC
# MAGIC SELECT COUNT(*) AS linhas_depois_do_desastre FROM vendas;

# COMMAND ----------

# MAGIC %sql
# MAGIC -- Todo o histórico da tabela, auditável:
# MAGIC DESCRIBE HISTORY vendas;

# COMMAND ----------

# MAGIC %sql
# MAGIC -- Voltando no tempo: a tabela como era ANTES do delete (versão 0)
# MAGIC SELECT COUNT(*) AS linhas_na_versao_0
# MAGIC FROM vendas VERSION AS OF 0;

# COMMAND ----------

# MAGIC %sql
# MAGIC -- Restaurar de verdade:
# MAGIC RESTORE TABLE vendas TO VERSION AS OF 0;
# MAGIC SELECT COUNT(*) AS linhas_restauradas FROM vendas;

# COMMAND ----------

# MAGIC %md
# MAGIC **Fala de palco:** "Quem já precisou explicar por que o número de ontem mudou hoje? Time Travel resolve — e para ML significa: *treinar hoje com os dados exatos de ontem*. Reprodutibilidade grátis."

# COMMAND ----------

# MAGIC %md
# MAGIC ---
# MAGIC # 🎬 ATO 3 — Features com Window Functions
# MAGIC ### (slide "Feature engineering é SELECT avançado")
# MAGIC Cada janela vira um **sinal** com significado de negócio.

# COMMAND ----------

# MAGIC %sql
# MAGIC CREATE OR REPLACE TABLE features_clientes USING DELTA AS
# MAGIC WITH base AS (
# MAGIC   SELECT
# MAGIC     cliente_id,
# MAGIC     data,
# MAGIC     valor,
# MAGIC     -- tendência: média das 3 compras ANTERIORES (exclui a atual → sem vazamento!)
# MAGIC     AVG(valor) OVER (
# MAGIC       PARTITION BY cliente_id ORDER BY data
# MAGIC       ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING
# MAGIC     ) AS media_ult_3_compras,
# MAGIC     -- recência: dias desde a compra anterior
# MAGIC     DATEDIFF(data, LAG(data) OVER (
# MAGIC       PARTITION BY cliente_id ORDER BY data
# MAGIC     )) AS dias_desde_anterior
# MAGIC   FROM vendas
# MAGIC )
# MAGIC SELECT
# MAGIC   cliente_id,
# MAGIC   COUNT(*)                        AS qtd_compras,
# MAGIC   ROUND(SUM(valor), 2)            AS total_gasto,
# MAGIC   ROUND(AVG(media_ult_3_compras)) AS media_movel_tipica,
# MAGIC   ROUND(AVG(dias_desde_anterior)) AS ritmo_medio_dias,
# MAGIC   MAX(dias_desde_anterior)        AS maior_intervalo,
# MAGIC   NTILE(10) OVER (ORDER BY SUM(valor)) AS decil_de_gasto,
# MAGIC   MAX(data)                       AS ultima_compra
# MAGIC FROM base
# MAGIC GROUP BY cliente_id;
# MAGIC
# MAGIC SELECT * FROM features_clientes LIMIT 10;

# COMMAND ----------

# MAGIC %md
# MAGIC **Fala de palco:** aponte o `ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING`: "a feature exclui a compra atual para não conter a resposta — primeira vacina contra *data leakage*."

# COMMAND ----------

# MAGIC %md
# MAGIC ---
# MAGIC # 🎬 ATO 4 — O alvo: um CASE WHEN honesto
# MAGIC ### (slide "O alvo + as features = dataset de treino")
# MAGIC Churn = ficou 90+ dias sem comprar. O label nasce de um `CASE WHEN`.

# COMMAND ----------

# MAGIC %sql
# MAGIC CREATE OR REPLACE TABLE treino_churn USING DELTA AS
# MAGIC SELECT
# MAGIC   qtd_compras,
# MAGIC   total_gasto,
# MAGIC   media_movel_tipica,
# MAGIC   ritmo_medio_dias,
# MAGIC   maior_intervalo,
# MAGIC   decil_de_gasto,
# MAGIC   CASE WHEN DATEDIFF(DATE'2026-08-01', ultima_compra) > 90
# MAGIC        THEN 1 ELSE 0 END AS churn
# MAGIC FROM features_clientes
# MAGIC WHERE qtd_compras >= 4;
# MAGIC
# MAGIC SELECT churn, COUNT(*) AS clientes FROM treino_churn GROUP BY churn;

# COMMAND ----------

# MAGIC %md
# MAGIC **Fala de palco:** "Vocês acabaram de ver a definição de um problema de classificação — sem uma equação. E reparem: nenhuma feature usa a `ultima_compra` diretamente. Ela só define o label. Se ela entrasse como feature, o modelo teria 100% de acurácia… e seria inútil. Isso é *data leakage*."

# COMMAND ----------

# MAGIC %md
# MAGIC ---
# MAGIC # 🎬 ATO 5 — Treinar com MLlib (+ MLflow rastreando tudo)
# MAGIC ### (slides "AutoML vs MLlib" e "MLflow")
# MAGIC > **Sobre AutoML:** se o seu workspace tiver AutoML (Experiments → Create AutoML Experiment), rode-o pela **interface** apontando para `treino_churn` com target `churn` — e mostre o ranking na demo. Na Free Edition, o caminho garantido é este abaixo: MLlib + MLflow, o "capô aberto" que o AutoML geraria.

# COMMAND ----------

import mlflow
import mlflow.spark
from pyspark.ml import Pipeline
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.classification import GBTClassifier, LogisticRegression
from pyspark.ml.evaluation import BinaryClassificationEvaluator

dados = spark.table("treino_churn").na.fill(0)
treino, teste = dados.randomSplit([0.8, 0.2], seed=42)

features = ["qtd_compras", "total_gasto", "media_movel_tipica",
            "ritmo_medio_dias", "maior_intervalo", "decil_de_gasto"]

assembler = VectorAssembler(inputCols=features, outputCol="v")
avaliador = BinaryClassificationEvaluator(labelCol="churn", metricName="areaUnderROC")

mlflow.set_experiment("/Shared/demo_palestra_churn")

def experimento(nome, classificador):
    with mlflow.start_run(run_name=nome):
        mlflow.log_param("algoritmo", nome)
        mlflow.log_param("n_features", len(features))
        modelo = Pipeline(stages=[assembler, classificador]).fit(treino)
        auc = avaliador.evaluate(modelo.transform(teste))
        mlflow.log_metric("auc", auc)
        mlflow.spark.log_model(modelo, "modelo")
        print(f"{nome:>22}  AUC = {auc:.3f}")
        return modelo, auc

# Dois experimentos — para a tabela de runs do MLflow ter uma "disputa":
modelo_lr,  auc_lr  = experimento("logistic_regression",
                                  LogisticRegression(labelCol="churn", featuresCol="v"))
modelo_gbt, auc_gbt = experimento("gbt_arvores_turbinadas",
                                  GBTClassifier(labelCol="churn", featuresCol="v", maxIter=30))

# COMMAND ----------

# MAGIC %md
# MAGIC **Fala de palco:**
# MAGIC - `randomSplit` = "estudar com a prova do ano passado e ser avaliado na deste ano"
# MAGIC - Abra a aba **Experiments** na barra lateral → experimento `demo_palestra_churn` → mostre a **tabela de runs** ordenada por AUC: "é uma tabela. Vocês auditam tabelas a vida inteira."
# MAGIC - Clique no run campeão → mostre params, métrica e o artefato do modelo.

# COMMAND ----------

# MAGIC %md
# MAGIC ---
# MAGIC # 🎬 ATO 6 — Prever é um JOIN mental: aplicar o modelo
# MAGIC O clímax sem depender de endpoint: **scoring em lote na própria sessão** — o modelo pontuando a base inteira.

# COMMAND ----------

campeao = modelo_gbt if auc_gbt >= auc_lr else modelo_lr

previsoes = campeao.transform(dados) \
    .selectExpr("qtd_compras", "total_gasto", "ritmo_medio_dias",
                "churn AS churn_real",
                "CAST(prediction AS INT) AS churn_previsto",
                "ROUND(vector_to_array(probability)[1], 3) AS risco_de_churn")

display(previsoes.orderBy("risco_de_churn", ascending=False).limit(15))

# COMMAND ----------

# MAGIC %md
# MAGIC **Fala de palco:** "83%, 91%, 95% de risco — nomes que o time de retenção pode ligar HOJE. Saímos de um `SELECT` e chegamos a uma lista priorizada por IA."

# COMMAND ----------

# MAGIC %md
# MAGIC ---
# MAGIC # 🎬 ATO 7 (opcional, workspace pago) — Registrar e servir como API
# MAGIC Se o workspace tiver **Model Serving**:
# MAGIC 1. Registre o campeão no Unity Catalog (célula abaixo).
# MAGIC 2. UI: **Serving → Create serving endpoint** → escolha o modelo → *Scale to zero* ligado.
# MAGIC 3. Chame **antes da palestra** uma vez para aquecer (cold start no palco mata o momento).

# COMMAND ----------

# Descomente para registrar (requer Unity Catalog + permissões):
# mlflow.set_registry_uri("databricks-uc")
# with mlflow.start_run(run_name="registro_campeao"):
#     mlflow.spark.log_model(campeao, "modelo",
#         registered_model_name="demo_palestra.default.churn_model")

# COMMAND ----------

# MAGIC %md
# MAGIC ### As duas portas (mostrar como slide/célula, sem executar se não houver endpoint)
# MAGIC **Porta 1 — REST:**
# MAGIC ```bash
# MAGIC curl -X POST https://<workspace>/serving-endpoints/churn_model/invocations \
# MAGIC   -H "Authorization: Bearer $DATABRICKS_TOKEN" \
# MAGIC   -d '{"dataframe_records":[{"qtd_compras":12,"total_gasto":3400,
# MAGIC        "media_movel_tipica":280,"ritmo_medio_dias":31,
# MAGIC        "maior_intervalo":88,"decil_de_gasto":7}]}'
# MAGIC # → {"predictions": [0.83]}
# MAGIC ```
# MAGIC **Porta 2 — SQL (`ai_query`):**
# MAGIC ```sql
# MAGIC SELECT cliente_id,
# MAGIC        ai_query('churn_model', named_struct(
# MAGIC          'qtd_compras', qtd_compras, 'total_gasto', total_gasto,
# MAGIC          'media_movel_tipica', media_movel_tipica, 'ritmo_medio_dias', ritmo_medio_dias,
# MAGIC          'maior_intervalo', maior_intervalo, 'decil_de_gasto', decil_de_gasto)
# MAGIC        ) AS risco_churn
# MAGIC FROM features_clientes;
# MAGIC ```
# MAGIC **Fala de palco:** "A palestra termina onde começou: com um SELECT — que agora invoca IA."
