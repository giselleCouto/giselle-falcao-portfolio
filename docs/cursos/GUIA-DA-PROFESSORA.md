# Guia da Professora — Giselle Falcão Academy

Este é o seu manual de operação da plataforma de cursos. Tudo o que você precisa
incluir, alterar ou editar está mapeado aqui.

---

## 1. Mapa de onde vive cada coisa

| O quê | Onde | Como editar |
|-------|------|-------------|
| **Estrutura dos cursos** (módulos, aulas, quizzes) | `client/src/lib/courses/<slug>.ts` | Peça ao Claude ou edite o arquivo diretamente |
| **Material pedagógico** (planos de aula, roteiros, slides) | `docs/cursos/<slug>/` | Arquivos Markdown — abra em qualquer editor de texto |
| **Links de vídeo das aulas** | campo `videoUrl` no arquivo do curso | Cole o link de embed do YouTube |
| **Links dos slides** | campo `slidesUrl` no arquivo do curso | Cole o link de publicação do Google Slides |
| **Notebooks de prática** | `client/public/cursos/notebooks/` | Arquivos `.ipynb` — abrem direto no Google Colab |
| **Vitrine de cursos** | `client/src/lib/courseCatalogData.ts` (hero) + registro em `courses/index.ts` | Peça ao Claude |

Os cursos com `free: true` são **gratuitos** (todo o conteúdo aberto).
Os cursos com `free: false` são **pagos**: apenas o módulo 1 fica aberto como
amostra; os demais aparecem com cadeado e botão de matrícula via WhatsApp.

Para **publicar um curso** na plataforma, mude `status: "em-breve"` para
`status: "disponivel"` no arquivo do curso.

---

## 2. Fluxo de gravação das vídeo-aulas (o mais leve possível)

Você pediu "nada que me exija demais" — este fluxo foi desenhado para isso:

### Preparação (5 min por aula)
1. Abra o roteiro da aula em `docs/cursos/<slug>/modulo-N.md`
2. Leia uma vez em voz alta. O roteiro já vem com marcações de tempo e
   frases de conexão humanas — não decore, use como guia.

### Gravação (1 tomada, sem edição pesada)
- **Ferramenta recomendada:** [Loom](https://www.loom.com) (grátis até 25 vídeos)
  ou a gravação do Google Meet (grátis, já na sua conta Google).
- **Formato:** rosto na câmera + slides compartilhados. O roteiro indica
  quando alternar entre "câmera" e "slide".
- **Duração:** todas as aulas foram planejadas para 10–25 min. Se errar,
  respire e continue — pequenos tropeços humanizam. Só regrave se perder o fio.
- **Setup mínimo:** luz de frente (janela), fone com microfone, fundo neutro.

### Publicação (3 min por aula)
1. Suba o vídeo no **YouTube como "Não listado"** (unlisted) — grátis,
   sem limite, e só quem tem o link assiste.
2. Copie o ID do vídeo (a parte depois de `watch?v=`).
3. No arquivo do curso, preencha:
   ```ts
   videoUrl: "https://www.youtube.com/embed/SEU_VIDEO_ID",
   ```
4. Peça ao Claude: *"publique as alterações"* (ou faça commit + push).
   O Railway atualiza o site sozinho em ~2 min.

---

## 3. Fluxo dos slides

1. A estrutura de cada deck já está pronta no material pedagógico
   (`docs/cursos/<slug>/modulo-N.md`, seção "Estrutura de slides") —
   título e bullets de cada slide.
2. Monte no **Canva** (use sua identidade roxo/lavanda/teal) ou no
   **Google Slides**.
3. Para exibir os slides na plataforma (opcional — o vídeo já os mostra):
   - Google Slides → `Arquivo → Compartilhar → Publicar na web → Incorporar`
   - Copie o link do iframe e preencha `slidesUrl` na aula.

**Dica:** guarde os decks numa pasta do Google Drive chamada
`Academy — Slides` para achar tudo depois.

---

## 4. Espaços de prática dos alunos (bibliotecas)

Toda prática usa **ferramenta gratuita de navegador** — o aluno não instala nada:

| Ferramenta | Uso | Custo |
|------------|-----|-------|
| **Google Colab** | Notebooks Python (ML, análise) | R$ 0 |
| **Google Sheets** | Planilhas e análise básica | R$ 0 |
| **BigQuery Sandbox** | SQL em dados públicos (1 TB/mês grátis) | R$ 0 |
| **Looker Studio** | Dashboards | R$ 0 |
| **NotebookLM** | Estudo assistido por IA | R$ 0 |

Os notebooks starter ficam em `client/public/cursos/notebooks/`. Como o
repositório é público, eles abrem direto no Colab com o link:

```
https://colab.research.google.com/github/giselleCouto/giselle-falcao-portfolio/blob/main/client/public/cursos/notebooks/NOME_DO_ARQUIVO.ipynb
```

A "Biblioteca de prática" de cada curso (barra lateral da página do curso)
é editada no campo `library` do arquivo do curso.

---

## 5. Rotina sugerida de produção (1 curso por vez)

Semana a semana, sem sobrecarga:

1. **Semana 1–2:** grave as aulas do Módulo 1 do curso gratuito
   (Fundamentos de ML) — são os roteiros mais curtos. Publique.
2. **Semana 3–4:** Módulo 2. A cada módulo publicado, divulgue no
   LinkedIn — o curso gratuito é seu funil de captação.
3. **Depois:** repita para Análise de Dados. Os cursos pagos vêm por último
   (módulo 1 de amostra primeiro, para gerar lista de interesse no WhatsApp).

**Precisa expandir o material?** Peça ao Claude:
*"Desenvolva o módulo 3 do curso fundamentos-ml no mesmo padrão do módulo 1
(plano de aula + roteiro + slides)"* — o padrão está estabelecido nos docs.

---

## 6. O que já existe de infraestrutura avançada (para o futuro)

O código já contém (da versão anterior da plataforma, em `/giselle/cursos/trilha`):
- Checkout por PIX via Stripe
- Progresso do aluno salvo em banco de dados (login)
- Emissão automática de certificado em PDF

Quando os cursos pagos tiverem demanda validada pela lista do WhatsApp,
esses blocos podem ser reativados por curso — peça ao Claude nessa hora.
