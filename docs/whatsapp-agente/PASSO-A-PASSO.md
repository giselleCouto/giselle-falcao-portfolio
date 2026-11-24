# Agente de IA no WhatsApp da NOKAHI EDU · passo a passo

O agente atende o WhatsApp **(31) 98228-0551**, o mesmo dos botões das páginas da Turma 01. Ele usa a **API oficial da Meta** (WhatsApp Cloud API) e o **Claude** (modelo `claude-opus-5-5`). Nada imita o WhatsApp Web, então o número não corre risco de banimento por isso.

**O que você escolheu (23/11/2026):**
- O número continua no app **WhatsApp Business** do seu celular, ligado à API em **coexistência**.
- O agente responde **24 h** e você também pode responder pelo celular. Quando você responde, o agente fica quieto naquela conversa por 12 h.
- Cada vez que o agente passa uma conversa para você, chega um **aviso no seu WhatsApp pessoal**.

**Você mesma cria as contas e cola as chaves.** Nenhuma senha ou token passa pelo Claude. Os valores ficam só na Meta, na 360dialog e no Railway.

O caminho tem duas fases:

| Fase | O que é | Tempo | Custo |
|---|---|---|---|
| **A. Teste** | App na Meta com o **número de teste** da Meta, conversando com o seu celular pessoal | cerca de 40 min | só o Claude (centavos) |
| **B. Produção** | O **98228-0551** em coexistência, pela **360dialog** (parceira oficial da Meta) | cerca de 1 h, mais a aprovação | mensalidade da 360dialog + Meta + Claude |

---

## 0. Antes de começar

Tenha à mão:
- o login do Facebook que administra o **portfólio empresarial da NOKAHI** (o mesmo da conta de anúncios);
- o acesso ao Railway: projeto **Portifolio_GiselleFalcao** → serviço **giselle-falcao-portfolio** → aba **Variables**;
- o seu celular pessoal, que vai receber os avisos (não é o 98228-0551).

**Como colar uma variável no Railway:** abra o serviço **giselle-falcao-portfolio** → **Variables** → **New Variable** → nome e valor → **Add**. Depois de salvar as variáveis, o Railway pede para aplicar as mudanças (**Deploy**) e reinicia o site sozinho em 1 ou 2 minutos.

---

## 1. Chave do Claude

1. Entre em **platform.claude.com** com a conta da NOKAHI.
2. Em **Billing**, coloque créditos. Em **Limits**, defina um **limite mensal de gasto**. Sugestão para começar: US$ 30.
3. Em **API Keys** → **Create Key**, dê o nome `whatsapp-nokahi` e copie a chave. Ela começa com `sk-ant-` e só aparece uma vez.
4. No Railway, crie:
   - `ANTHROPIC_API_KEY` = a chave que você copiou.

> Custo estimado: de US$ 0,01 a US$ 0,03 por resposta. Com 30 conversas por dia, fica perto de US$ 10 a US$ 20 por mês.

---

## 2. Senha do webhook

O webhook é o endereço onde a Meta entrega as mensagens. Ele leva uma senha longa no próprio endereço.

1. No PowerShell do seu computador, rode o comando abaixo. Ele mostra uma sequência de 64 letras e números.

```powershell
[guid]::NewGuid().ToString("N") + [guid]::NewGuid().ToString("N")
```

2. No Railway, crie:
   - `WHATSAPP_WEBHOOK_TOKEN` = a sequência que apareceu.
3. Guarde essa sequência. Ela vai em dois lugares da Meta no passo 3.5.

---

## 3. Fase A · Teste com o número de teste da Meta

### 3.1 Criar o app

1. Abra **developers.facebook.com/apps** → **Criar app**.
2. No caso de uso, escolha **Conectar-se com clientes pelo WhatsApp**.
3. Nome do app: `NOKAHI EDU Atendimento`. E-mail: `giselle@coutofalcao.com`.
4. Escolha o **portfólio empresarial da NOKAHI** e conclua.

### 3.2 Pegar o número de teste e o identificador

1. No menu do app, abra **WhatsApp** → **Configuração da API** (*API Setup*).
2. A Meta já mostra um **número de teste**. Logo abaixo dele aparece o **Identificador do número de telefone** (*Phone number ID*). Copie esse identificador.
3. Clique em **Gerar token de acesso** e copie o token. Esse token vale 24 h e serve só para o teste de hoje. O permanente sai no passo 4.
4. No campo **Para** (*To*), adicione o seu **celular pessoal** e confirme com o código que chega por WhatsApp.

### 3.3 Chave secreta do app

1. No menu do app, abra **Configurações do app** → **Básico**.
2. Em **Chave secreta do aplicativo** (*App secret*), clique em **Mostrar** e copie.

### 3.4 Colar no Railway

| Variável | Valor |
|---|---|
| `WHATSAPP_PROVEDOR` | `meta` |
| `WHATSAPP_TOKEN` | o token do passo 3.2 |
| `WHATSAPP_PHONE_NUMBER_ID` | o identificador do passo 3.2 |
| `WHATSAPP_APP_SECRET` | a chave secreta do passo 3.3 |
| `WHATSAPP_AVISO_PARA` | o seu celular pessoal só com números, com 55 e DDD (ex.: `5531999998888`) |
| `WHATSAPP_AGENTE_LIGADO` | `1` |

Aplique o deploy e espere o site reiniciar.

### 3.5 Ligar o webhook

1. No app, abra **WhatsApp** → **Configuração** (*Configuration*) → **Webhook** → **Editar**.
2. Preencha:
   - **URL de callback:** `https://www.coutofalcao.com/api/whatsapp/webhook/` seguido da senha do passo 2, sem espaço.
   - **Token de verificação:** a mesma senha do passo 2.
3. Clique em **Verificar e salvar**. Se der erro, confira se o deploy do passo 3.4 terminou.
4. Em **Campos do webhook**, clique em **Gerenciar** e assine o campo **messages**.

### 3.6 Conferir

Abra **https://www.coutofalcao.com/api/whatsapp/saude**. A página mostra só "sim" ou "não" (`true`/`false`), nunca as chaves. Tudo deve estar `true`, menos `modeloDeAviso`, que só fica `true` depois do passo 5.

### 3.7 Conversa de teste de ponta a ponta

Do seu celular pessoal, mande mensagens para o **número de teste** da Meta:

1. `Oi, quanto custa o MBA?`
   Em uns 10 segundos, o agente se apresenta e passa o valor de R$ 6.200 (ou 12× de R$ 620,01) com o cupom MBA2800.
2. `Não sei qual curso fazer`
   Ele manda o teste de nível, `coutofalcao.com/nivel/whatsapp`.
3. `Quero reembolso`
   Ele avisa que passou a conversa para você. Chega também o aviso **🔔 Conversa para você…** no mesmo chat.
4. Abra **https://www.coutofalcao.com/painel/whatsapp**, com a mesma chave do Painel do Funil. A conversa aparece com o repasse em amarelo. Clique em **Devolver ao agente** para ele voltar a responder.

No painel também dá para:
- **Testar o agente**: um simulador que não envia nada pelo WhatsApp. Ele simula datas como "15/12/2026" para conferir o preço depois de 12/12.
- **Rodar avaliação**: 21 perguntas críticas no Claude de verdade (preço, cupom, link, certificado e repasses), com o resultado de cada uma.

---

## 4. Token permanente (usuário do sistema)

O token do passo 3.2 vence em 24 h. Para não vencer:

1. Abra **business.facebook.com/settings** → **Usuários** → **Usuários do sistema** → **Adicionar**. Nome: `whatsapp-agente`. Função: **Administrador**.
2. Clique em **Atribuir ativos**:
   - **Apps** → `NOKAHI EDU Atendimento` → **Controle total**.
   - **Contas do WhatsApp** → a conta do WhatsApp → **Controle total**.
3. Clique em **Gerar token**:
   - App: `NOKAHI EDU Atendimento`.
   - Validade: **Nunca**.
   - Permissões: `whatsapp_business_messaging` e `whatsapp_business_management`.
4. Copie o token e troque, no Railway, o valor de `WHATSAPP_TOKEN`.

---

## 5. Modelo de aviso (para o aviso chegar a qualquer hora)

A Meta só deixa mandar texto livre para quem escreveu nas últimas 24 h. Para o aviso chegar sempre no seu pessoal, crie um **modelo de mensagem**:

1. Abra **business.facebook.com/wa/manage/message-templates** → **Criar modelo**.
2. Categoria: **Utilidade**. Nome: `aviso_repasse`. Idioma: **Português (BR)**.
3. Corpo do modelo. A Meta não aceita variável no começo nem no fim do texto, por isso a última frase vem depois do link.

```
Nova conversa para você no WhatsApp da NOKAHI EDU. Quem: {{1}}. Assunto: {{2}}. Resumo: {{3}}. Painel: {{4}} . Responda pelo app WhatsApp Business.
```

4. Exemplos que a Meta pede:
   - {{1}} `Ana (+5531999990000)`
   - {{2}} `Reembolso ou cancelamento`
   - {{3}} `Pediu o reembolso do Fluente.`
   - {{4}} `https://www.coutofalcao.com/painel/whatsapp?c=1`
5. Envie para aprovação, que costuma sair em minutos ou até 1 dia.
6. Depois de aprovado, crie no Railway:
   - `WHATSAPP_MODELO_AVISO` = `aviso_repasse`

> O modelo pertence a uma conta do WhatsApp. Na fase B, a conta muda, e é preciso criar o mesmo modelo de novo nela.

---

## 6. Fase B · O 98228-0551 em coexistência (360dialog)

Coexistência quer dizer que o número continua no app WhatsApp Business do seu celular e também fica ligado à API. As mensagens aparecem nos dois lugares.

A Meta só libera a coexistência por um **parceiro oficial** (Solution Partner ou Tech Provider). A **360dialog** é um desses parceiros. O agente já sabe falar com ela: muda só o endereço e a chave, porque o formato das mensagens é o mesmo da Cloud API.

### 6.1 Antes

- No celular, atualize o **WhatsApp Business**. A versão precisa ser 2.24.17 ou mais nova.
- Saiba que algumas coisas mudam na coexistência:
  - grupos não sincronizam com a API;
  - mensagens temporárias e de visualização única ficam desligadas nas conversas individuais;
  - listas de transmissão ficam só para leitura;
  - o WhatsApp para Windows e o WearOS deixam de funcionar como aparelho conectado.
- Abra o app no celular pelo menos a cada 14 dias. Se ficar mais tempo sem abrir, a conexão cai.

### 6.2 Conectar

1. Crie a conta em **hub.360dialog.com** e escolha o plano. Confira o preço no site deles.
2. Clique em **Connect number** (conectar número) e, no cadastro da Meta que abrir, escolha **Conectar o app WhatsApp Business existente** (coexistência). **Não** escolha migrar o número, porque a migração tira o número do celular.
3. Entre com o Facebook do portfólio da NOKAHI e escolha o número **+55 31 98228-0551**.
4. O cadastro mostra um **QR code**. No celular, o WhatsApp Business mostra um aviso para conectar: siga o aviso e leia o QR. Aceite compartilhar o histórico das conversas.
5. No painel da 360dialog, gere a **API key** do número e copie.

### 6.3 Trocar no Railway

| Variável | Valor |
|---|---|
| `WHATSAPP_PROVEDOR` | `360dialog` |
| `WHATSAPP_TOKEN` | a API key da 360dialog |

`WHATSAPP_PHONE_NUMBER_ID` e `WHATSAPP_APP_SECRET` deixam de ser usados e podem ser apagados. Aplique o deploy.

### 6.4 Apontar o webhook da 360dialog para o site

No PowerShell, rode o comando abaixo. Ele pede a API key e a senha do passo 2 e não guarda nenhuma das duas no histórico.

```powershell
$chave = Read-Host "API key da 360dialog"; $senha = Read-Host "Senha do webhook (passo 2)"; Invoke-RestMethod -Method Post -Uri "https://waba-v2.360dialog.io/v1/configs/webhook" -Headers @{ "D360-API-KEY" = $chave } -ContentType "application/json" -Body (@{ url = "https://www.coutofalcao.com/api/whatsapp/webhook/$senha" } | ConvertTo-Json)
```

A resposta deve mostrar o endereço `https://www.coutofalcao.com/api/whatsapp/webhook/...`.

### 6.5 Modelo de aviso na conta nova

Refaça o passo 5 na conta do WhatsApp do 98228-0551. O nome continua `aviso_repasse`, e o Railway não muda.

### 6.6 Teste no número de verdade

1. De outro celular, mande `Oi, quanto custa o Do Dado ao Valor?` para o 98228-0551. A resposta do agente aparece nos dois celulares.
2. Responda você, pelo app, qualquer coisa. O painel passa a mostrar **Agente quieto até…** nessa conversa.
3. Do outro celular, mande `Quero falar com a Giselle`. Chega o aviso no seu pessoal.

> **Para confirmar na 360dialog:** as mensagens que você manda pelo app chegam ao site como aviso `smb_message_echoes`. É isso que faz o agente ficar quieto. Se, depois do teste 2, o painel não mostrar a sua mensagem como **Você**, peça à 360dialog para ativar o envio de *message echoes* da coexistência.

---

## 7. Ligar, pausar e desligar

- **Pausar tudo na hora:** no painel, use o botão **Pausar em todas**. As mensagens continuam sendo guardadas.
- **Desligar de vez:** no Railway, mude `WHATSAPP_AGENTE_LIGADO` para `0`.
- **Uma conversa só:** use **Pausar 24 h** ou **Devolver ao agente** no painel.

## 8. Quando o agente passa a conversa para você

Ele passa a conversa sozinho nestes casos:
- pagamento com problema;
- reembolso, cancelamento ou garantia;
- documentos da Anhanguera;
- empresa, CNPJ, nota fiscal, turma fechada, palestra ou consultoria;
- reclamação;
- pedido para falar com você;
- qualquer pergunta que não está na base: bolsa, outras turmas, validade do certificado para concurso e parecidos.

Também passa se a resposta dele falhar duas vezes na conferência automática, que bloqueia:
- preço, parcela, cupom, link ou data que não estão na base do dia;
- "reconhecido pelo MEC" ou "diploma";
- MEC junto com o Fluente;
- chamar a extensão de pós;
- chamar você de doutora;
- pressão ou promessa de emprego.

Depois de passar a conversa, o agente fica quieto nela por 72 h, ou até você clicar em **Devolver ao agente**.

## 9. Editar o que o agente sabe

O arquivo é **`server/whatsapp/base-de-conhecimento.md`**, escrito em português comum.

**Preços, cupons e links não ficam nele.** Eles vêm das páginas de vendas (`ninguemNasceFluenteData.ts`, `mbaData.ts`, `doDadoAoValorData.ts`). Se mudar no site, muda no WhatsApp. Em 13/12/2026, o agente passa sozinho para o valor regular e para de citar cupons. Em 23/01/2027, ele para de mandar links de inscrição.

Depois de editar, rode `pnpm test` e publique. Os testes conferem as respostas críticas.

## 10. Todas as variáveis

| Variável | Obrigatória | Para que serve |
|---|---|---|
| `ANTHROPIC_API_KEY` | sim | chave do Claude |
| `WHATSAPP_WEBHOOK_TOKEN` | sim | senha do endereço do webhook (e token de verificação da Meta) |
| `WHATSAPP_PROVEDOR` | sim | `meta` (fase A) ou `360dialog` (fase B) |
| `WHATSAPP_TOKEN` | sim | token permanente da Meta ou API key da 360dialog |
| `WHATSAPP_PHONE_NUMBER_ID` | só na Meta | identificador do número |
| `WHATSAPP_APP_SECRET` | recomendada na Meta | confere a assinatura dos avisos |
| `WHATSAPP_AGENTE_LIGADO` | sim | `1` responde; qualquer outro valor só guarda |
| `WHATSAPP_AVISO_PARA` | sim | seu celular pessoal para os avisos (55 + DDD + número) |
| `WHATSAPP_MODELO_AVISO` | recomendada | nome do modelo aprovado (`aviso_repasse`) |
| `WHATSAPP_PAUSA_HUMANO_HORAS` | não (12) | horas de silêncio depois que você responde |
| `WHATSAPP_PAUSA_REPASSE_HORAS` | não (72) | horas de silêncio depois de um repasse |
| `WHATSAPP_ESPERA_SEGUNDOS` | não (6) | espera a pessoa terminar de escrever antes de responder |
| `WHATSAPP_LIMITE_DIARIO` | não (30) | respostas por conversa em 24 h antes de passar para você |
| `WHATSAPP_MODELO` | não | modelo do Claude (padrão `claude-opus-5-5`) |
| `WHATSAPP_ESFORCO` | não (`low`) | esforço do modelo: `low`, `medium` ou `high` |

## 11. Privacidade

As conversas ficam no banco do site (tabelas `whatsapp_*`), e só a chave do painel abre essas conversas. O agente:
- se apresenta como assistente virtual;
- não pede CPF, cartão nem senha.

Vale incluir na política de privacidade do site uma linha sobre o atendimento por WhatsApp com IA e sobre o tempo de guarda das conversas.
