// Gravação das conversas do WhatsApp no MySQL (implementação do
// RepositorioWhatsApp de atendimento.ts) e consultas do painel /painel/whatsapp.
//
// O MySQL do Railway só aceita conexão pela rede interna, então o próprio
// servidor cria as tabelas na primeira vez (CREATE TABLE IF NOT EXISTS, mesmo
// SQL da migração drizzle/0019_large_gorgon.sql; um teste garante que não divergem).

import { and, desc, eq, gte, inArray, like, sql } from "drizzle-orm";
import {
  whatsappAjustes,
  whatsappConversas,
  whatsappMensagens,
  whatsappRepasses,
  type WhatsappConversa,
  type WhatsappMensagem,
  type WhatsappRepasse,
} from "../../drizzle/schema";
import { getDb } from "../db";
import type { Conversa, Mensagem, Repasse, RepositorioWhatsApp, StatusRepasse } from "./atendimento";
import type { MensagemRecebida } from "./cloudApi";
import { ehCategoria } from "./regras";

export const DDL_WHATSAPP = [
  `CREATE TABLE IF NOT EXISTS \`whatsapp_ajustes\` (
	\`chave\` varchar(64) NOT NULL,
	\`valor\` varchar(255),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`whatsapp_ajustes_chave\` PRIMARY KEY(\`chave\`)
);`,
  `CREATE TABLE IF NOT EXISTS \`whatsapp_conversas\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`waId\` varchar(32) NOT NULL,
	\`nome\` varchar(200),
	\`pausadoAte\` timestamp NULL,
	\`motivoPausa\` varchar(64),
	\`ultimaMensagemAt\` timestamp NOT NULL DEFAULT (now()),
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`whatsapp_conversas_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`whatsapp_conversas_waid_unique\` UNIQUE(\`waId\`),
	KEY \`whatsapp_conversas_ultima_idx\` (\`ultimaMensagemAt\`)
);`,
  `CREATE TABLE IF NOT EXISTS \`whatsapp_mensagens\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`conversaId\` int NOT NULL,
	\`waMessageId\` varchar(128),
	\`direcao\` varchar(8) NOT NULL,
	\`autor\` varchar(16) NOT NULL,
	\`tipo\` varchar(32) NOT NULL,
	\`texto\` text NOT NULL,
	\`semTexto\` boolean NOT NULL DEFAULT false,
	\`status\` varchar(24),
	\`erro\` varchar(255),
	\`meta\` text,
	\`criadaEm\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`whatsapp_mensagens_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`whatsapp_mensagens_wamid_unique\` UNIQUE(\`waMessageId\`),
	KEY \`whatsapp_mensagens_conversa_idx\` (\`conversaId\`,\`id\`)
);`,
  `CREATE TABLE IF NOT EXISTS \`whatsapp_repasses\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`conversaId\` int NOT NULL,
	\`categoria\` varchar(24) NOT NULL,
	\`resumo\` text NOT NULL,
	\`origem\` varchar(16) NOT NULL,
	\`status\` varchar(16) NOT NULL DEFAULT 'aberto',
	\`avisadoAt\` timestamp NULL,
	\`avisoErro\` varchar(255),
	\`resolvidoAt\` timestamp NULL,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`whatsapp_repasses_id\` PRIMARY KEY(\`id\`),
	KEY \`whatsapp_repasses_conversa_idx\` (\`conversaId\`),
	KEY \`whatsapp_repasses_status_idx\` (\`status\`)
);`,
];

type Banco = NonNullable<Awaited<ReturnType<typeof getDb>>>;

let tabelasProntas: Promise<void> | null = null;

async function banco(): Promise<Banco> {
  const db = await getDb();
  if (!db) throw new Error("Banco de dados indisponível (DATABASE_URL)");
  tabelasProntas ??= (async () => {
    for (const comando of DDL_WHATSAPP) await db.execute(sql.raw(comando));
  })().catch((erro) => {
    tabelasProntas = null;
    throw erro;
  });
  await tabelasProntas;
  return db;
}

const ehDuplicado = (erro: unknown) => {
  const e = erro as { code?: string; message?: string; cause?: { code?: string; message?: string } };
  const textos = [e?.code, e?.message, e?.cause?.code, e?.cause?.message].map((t) => String(t ?? ""));
  return textos.some((t) => t.includes("ER_DUP_ENTRY") || t.includes("Duplicate entry"));
};

const paraConversa = (c: WhatsappConversa): Conversa => ({
  id: c.id,
  waId: c.waId,
  nome: c.nome,
  pausadoAte: c.pausadoAte,
  motivoPausa: c.motivoPausa,
});

const paraMensagem = (m: WhatsappMensagem): Mensagem => ({
  id: m.id,
  conversaId: m.conversaId,
  waMessageId: m.waMessageId,
  direcao: m.direcao === "entrada" ? "entrada" : "saida",
  autor: (["cliente", "agente", "giselle", "sistema"].includes(m.autor) ? m.autor : "sistema") as Mensagem["autor"],
  tipo: m.tipo,
  texto: m.texto,
  semTexto: Boolean(m.semTexto),
  status: m.status,
  erro: m.erro,
  criadaEm: m.criadaEm,
  meta: m.meta,
});

const paraRepasse = (r: WhatsappRepasse): Repasse => ({
  id: r.id,
  conversaId: r.conversaId,
  categoria: ehCategoria(r.categoria) ? r.categoria : "outro",
  resumo: r.resumo,
  origem: r.origem,
  status: (["aberto", "respondido", "resolvido"].includes(r.status) ? r.status : "aberto") as StatusRepasse,
  avisadoEm: r.avisadoAt,
  avisoErro: r.avisoErro,
  criadoEm: r.createdAt,
});

async function conversaPorWaId(db: Banco, waId: string) {
  const [c] = await db.select().from(whatsappConversas).where(eq(whatsappConversas.waId, waId)).limit(1);
  return c ? paraConversa(c) : null;
}

async function garantirConversa(db: Banco, waId: string, nome: string | null) {
  await db
    .insert(whatsappConversas)
    .values({ waId, nome: nome?.slice(0, 200) ?? null })
    .onDuplicateKeyUpdate({
      set: nome ? { nome: nome.slice(0, 200), ultimaMensagemAt: new Date() } : { ultimaMensagemAt: new Date() },
    });
  const c = await conversaPorWaId(db, waId);
  if (!c) throw new Error(`Conversa ${waId} não foi criada`);
  return c;
}

export const repositorioMySql: RepositorioWhatsApp = {
  async registrarEntrada(m: MensagemRecebida) {
    const db = await banco();
    const conversa = await garantirConversa(db, m.waId, m.nome);
    try {
      await db.insert(whatsappMensagens).values({
        conversaId: conversa.id,
        waMessageId: m.waMessageId,
        direcao: "entrada",
        autor: "cliente",
        tipo: m.tipo.slice(0, 32),
        texto: m.texto.slice(0, 20000),
        semTexto: m.semTexto,
        status: "recebido",
        criadaEm: m.recebidaEm,
      });
      return { conversa, nova: true };
    } catch (erro) {
      if (ehDuplicado(erro)) return { conversa, nova: false };
      throw erro;
    }
  },

  async registrarSaida(conversaId, s) {
    const db = await banco();
    try {
      const [{ id }] = await db
        .insert(whatsappMensagens)
        .values({
          conversaId,
          waMessageId: s.waMessageId,
          direcao: "saida",
          autor: s.autor,
          tipo: (s.tipo ?? "text").slice(0, 32),
          texto: s.texto.slice(0, 20000),
          semTexto: false,
          status: s.status,
          erro: s.erro?.slice(0, 255) ?? null,
          meta: s.meta?.slice(0, 20000) ?? null,
          criadaEm: s.criadaEm ?? new Date(),
        })
        .$returningId();
      await db.update(whatsappConversas).set({ ultimaMensagemAt: new Date() }).where(eq(whatsappConversas.id, conversaId));
      const [m] = await db.select().from(whatsappMensagens).where(eq(whatsappMensagens.id, id)).limit(1);
      return m ? paraMensagem(m) : null;
    } catch (erro) {
      if (ehDuplicado(erro)) return null;
      throw erro;
    }
  },

  async conversaPorId(id) {
    const db = await banco();
    const [c] = await db.select().from(whatsappConversas).where(eq(whatsappConversas.id, id)).limit(1);
    return c ? paraConversa(c) : null;
  },

  async conversaPorWaId(waId) {
    return conversaPorWaId(await banco(), waId);
  },

  async criarConversa(waId, nome) {
    return garantirConversa(await banco(), waId, nome);
  },

  async historico(conversaId, limite) {
    const db = await banco();
    const linhas = await db
      .select()
      .from(whatsappMensagens)
      .where(eq(whatsappMensagens.conversaId, conversaId))
      .orderBy(desc(whatsappMensagens.id))
      .limit(limite);
    return linhas.reverse().map(paraMensagem);
  },

  async pausar(conversaId, ate, motivo) {
    const db = await banco();
    await db.update(whatsappConversas).set({ pausadoAte: ate, motivoPausa: motivo }).where(eq(whatsappConversas.id, conversaId));
  },

  async atualizarStatus(waMessageId, status, erro) {
    const db = await banco();
    await db
      .update(whatsappMensagens)
      .set(erro ? { status: status.slice(0, 24), erro: erro.slice(0, 255) } : { status: status.slice(0, 24) })
      .where(eq(whatsappMensagens.waMessageId, waMessageId));
  },

  async repasseAberto(conversaId) {
    const db = await banco();
    const [r] = await db
      .select()
      .from(whatsappRepasses)
      .where(and(eq(whatsappRepasses.conversaId, conversaId), inArray(whatsappRepasses.status, ["aberto", "respondido"])))
      .orderBy(desc(whatsappRepasses.id))
      .limit(1);
    return r ? paraRepasse(r) : null;
  },

  async abrirRepasse(r) {
    const db = await banco();
    const [{ id }] = await db
      .insert(whatsappRepasses)
      .values({ conversaId: r.conversaId, categoria: r.categoria, resumo: r.resumo.slice(0, 2000), origem: r.origem })
      .$returningId();
    const [linha] = await db.select().from(whatsappRepasses).where(eq(whatsappRepasses.id, id)).limit(1);
    return paraRepasse(linha);
  },

  async atualizarRepasse(id, campos) {
    const db = await banco();
    const set: Partial<typeof whatsappRepasses.$inferInsert> = {};
    if (campos.status) set.status = campos.status;
    if ("avisadoEm" in campos) set.avisadoAt = campos.avisadoEm ?? null;
    if ("avisoErro" in campos) set.avisoErro = campos.avisoErro?.slice(0, 255) ?? null;
    if (campos.resumo) set.resumo = campos.resumo.slice(0, 2000);
    if ("resolvidoEm" in campos) set.resolvidoAt = campos.resolvidoEm ?? null;
    if (Object.keys(set).length) await db.update(whatsappRepasses).set(set).where(eq(whatsappRepasses.id, id));
  },

  async respostasDaIaDesde(conversaId, desde) {
    const db = await banco();
    const [linha] = await db
      .select({ n: sql<number>`count(*)` })
      .from(whatsappMensagens)
      .where(
        and(
          eq(whatsappMensagens.conversaId, conversaId),
          eq(whatsappMensagens.autor, "agente"),
          like(whatsappMensagens.meta, '%"llm":true%'),
          gte(whatsappMensagens.criadaEm, desde)
        )
      );
    return Number(linha?.n ?? 0);
  },

  async ajuste(chave) {
    const db = await banco();
    const [linha] = await db.select().from(whatsappAjustes).where(eq(whatsappAjustes.chave, chave)).limit(1);
    return linha?.valor ?? null;
  },
};

// ------------------------------------------------------------------ painel

export async function definirAjuste(chave: string, valor: string | null) {
  const db = await banco();
  await db.insert(whatsappAjustes).values({ chave, valor }).onDuplicateKeyUpdate({ set: { valor } });
}

/** Lista de conversas para o painel, com o repasse aberto (se houver) e a última mensagem. */
export async function listarConversas(limite = 200) {
  const db = await banco();
  const conversas = await db.select().from(whatsappConversas).orderBy(desc(whatsappConversas.ultimaMensagemAt)).limit(limite);
  const ids = conversas.map((c) => c.id);
  const repasses = ids.length
    ? await db
        .select()
        .from(whatsappRepasses)
        .where(and(inArray(whatsappRepasses.conversaId, ids), inArray(whatsappRepasses.status, ["aberto", "respondido"])))
    : [];
  const ultimas = ids.length
    ? ((await db.execute(sql`
        SELECT m.conversaId, m.autor, m.texto, m.criadaEm, m.status
        FROM whatsapp_mensagens m
        JOIN (SELECT conversaId, MAX(id) AS id FROM whatsapp_mensagens WHERE conversaId IN (${sql.join(ids, sql`, `)}) GROUP BY conversaId) u
          ON u.id = m.id`)) as unknown as [{ conversaId: number; autor: string; texto: string; criadaEm: Date; status: string | null }[]])[0]
    : [];
  const ajusteGlobal = await repositorioMySql.ajuste("agente_pausado");
  return {
    agentePausado: ajusteGlobal === "1",
    conversas: conversas.map((c) => {
      const r = repasses.filter((x) => x.conversaId === c.id).sort((a, b) => b.id - a.id)[0];
      const u = ultimas.find((x) => Number(x.conversaId) === c.id);
      return {
        ...paraConversa(c),
        ultimaMensagemEm: c.ultimaMensagemAt,
        criadaEm: c.createdAt,
        repasse: r ? paraRepasse(r) : null,
        ultima: u ? { autor: u.autor, texto: String(u.texto).slice(0, 160), em: new Date(u.criadaEm), status: u.status } : null,
      };
    }),
  };
}

export async function obterConversa(id: number) {
  const db = await banco();
  const [c] = await db.select().from(whatsappConversas).where(eq(whatsappConversas.id, id)).limit(1);
  if (!c) return null;
  const mensagens = await db
    .select()
    .from(whatsappMensagens)
    .where(eq(whatsappMensagens.conversaId, id))
    .orderBy(desc(whatsappMensagens.id))
    .limit(300);
  const repasses = await db.select().from(whatsappRepasses).where(eq(whatsappRepasses.conversaId, id)).orderBy(desc(whatsappRepasses.id));
  return {
    conversa: { ...paraConversa(c), criadaEm: c.createdAt },
    mensagens: mensagens.reverse().map((m) => ({ ...paraMensagem(m), meta: m.meta })),
    repasses: repasses.map((r) => ({ ...paraRepasse(r), resolvidoEm: r.resolvidoAt })),
  };
}

export async function resolverRepassesDaConversa(conversaId: number) {
  const db = await banco();
  await db
    .update(whatsappRepasses)
    .set({ status: "resolvido", resolvidoAt: new Date() })
    .where(and(eq(whatsappRepasses.conversaId, conversaId), inArray(whatsappRepasses.status, ["aberto", "respondido"])));
}
