// Gravação e leitura do registro de estudantes da Voomp (ver voompWebhook.ts).

import { and, desc, eq, isNull, like, sql } from "drizzle-orm";
import { voompEventos, voompInscricoes, type InsertVoompInscricao } from "../drizzle/schema";
import { cursoVoomp, formatarMatricula, type StatusInscricao } from "../shared/voomp";
import { getDb } from "./db";
import { proximoStatus, type EventoVoomp } from "./voompWebhook";

/**
 * Tabelas do registro de estudantes. O MySQL do Railway só aceita conexão pela
 * rede interna, então o próprio servidor as cria na primeira vez que precisa
 * (CREATE TABLE IF NOT EXISTS — seguro de repetir). Mesmo SQL da migração
 * drizzle/0017_confused_speed_demon.sql (um teste garante que não divergem).
 */
export const DDL_VOOMP = [
  `CREATE TABLE IF NOT EXISTS \`voomp_eventos\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`evento\` varchar(64),
	\`status\` varchar(32) NOT NULL,
	\`statusVoomp\` varchar(64),
	\`saleId\` varchar(64),
	\`productId\` varchar(32),
	\`email\` varchar(320),
	\`inscricaoId\` int,
	\`payload\` text NOT NULL,
	\`receivedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`voomp_eventos_id\` PRIMARY KEY(\`id\`),
	KEY \`voomp_eventos_recebido_idx\` (\`receivedAt\`)
);`,
  `CREATE TABLE IF NOT EXISTS \`voomp_inscricoes\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`matricula\` varchar(24),
	\`status\` varchar(32) NOT NULL,
	\`statusVoomp\` varchar(64),
	\`productId\` varchar(32) NOT NULL,
	\`productName\` varchar(255),
	\`offerName\` varchar(255),
	\`email\` varchar(320) NOT NULL,
	\`name\` varchar(200),
	\`phone\` varchar(40),
	\`document\` varchar(32),
	\`zipcode\` varchar(16),
	\`city\` varchar(120),
	\`uf\` varchar(4),
	\`saleId\` varchar(64),
	\`method\` varchar(40),
	\`installments\` int,
	\`amountCents\` int,
	\`coupon\` varchar(80),
	\`refusedReason\` varchar(255),
	\`utmSource\` varchar(120),
	\`utmCampaign\` varchar(160),
	\`utmContent\` varchar(160),
	\`eventsCount\` int NOT NULL DEFAULT 0,
	\`firstEventAt\` timestamp NOT NULL DEFAULT (now()),
	\`lastEventAt\` timestamp NOT NULL DEFAULT (now()),
	\`paidAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`voomp_inscricoes_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`voomp_inscricoes_email_produto_unique\` UNIQUE(\`email\`,\`productId\`),
	CONSTRAINT \`voomp_inscricoes_matricula_unique\` UNIQUE(\`matricula\`),
	KEY \`voomp_inscricoes_status_idx\` (\`status\`)
);`
];

let tabelasProntas: Promise<void> | null = null;

async function garantirTabelas() {
  const db = await getDb();
  if (!db) return;
  tabelasProntas ??= (async () => {
    for (const comando of DDL_VOOMP) await db.execute(sql.raw(comando));
  })().catch((erro) => {
    tabelasProntas = null; // tenta de novo no próximo aviso
    throw erro;
  });
  await tabelasProntas;
}

const ehDuplicado = (erro: unknown) =>
  String((erro as { code?: string })?.code ?? (erro as Error)?.message ?? "").includes("ER_DUP_ENTRY") ||
  String((erro as Error)?.message ?? "").includes("Duplicate entry");

/** Próximo número da matrícula daquele curso (NK-MBA-0001, 0002...). */
async function proximaSequencia(prefixo: string) {
  const db = await getDb();
  if (!db) return 1;
  const [linha] = await db
    .select({
      maior: sql<number>`coalesce(max(cast(substring_index(${voompInscricoes.matricula}, '-', -1) as unsigned)), 0)`,
    })
    .from(voompInscricoes)
    .where(like(voompInscricoes.matricula, `${prefixo}%`));
  return Number(linha?.maior ?? 0) + 1;
}

async function atribuirMatricula(inscricaoId: number, productId: string) {
  const db = await getDb();
  if (!db) return null;
  const { codigo } = cursoVoomp(productId);
  for (let tentativa = 0; tentativa < 5; tentativa++) {
    const matricula = formatarMatricula(codigo, await proximaSequencia(`NK-${codigo}-`));
    try {
      await db
        .update(voompInscricoes)
        .set({ matricula })
        .where(and(eq(voompInscricoes.id, inscricaoId), isNull(voompInscricoes.matricula)));
      const [atual] = await db
        .select({ matricula: voompInscricoes.matricula })
        .from(voompInscricoes)
        .where(eq(voompInscricoes.id, inscricaoId))
        .limit(1);
      return atual?.matricula ?? null;
    } catch (erro) {
      if (!ehDuplicado(erro)) throw erro; // outra matrícula pegou o mesmo número: tenta o seguinte
    }
  }
  throw new Error("Não consegui gerar matrícula única");
}

/**
 * Grava o aviso da Voomp e atualiza (ou cria) a inscrição da pessoa naquele
 * curso. Campos que o novo aviso não traz mantêm o valor que já estava.
 */
export async function registrarEventoVoomp(ev: EventoVoomp, payload: string) {
  const db = await getDb();
  if (!db) return null;
  await garantirTabelas();

  const [evento] = await db
    .insert(voompEventos)
    .values({
      evento: ev.evento,
      status: ev.status,
      statusVoomp: ev.statusVoomp,
      saleId: ev.saleId,
      productId: ev.productId,
      email: ev.email,
      payload: payload.slice(0, 60000),
    })
    .$returningId();

  if (!ev.email || !ev.productId) {
    return { eventoId: evento.id, inscricaoId: null, status: ev.status, matricula: null };
  }

  const campos = {
    statusVoomp: ev.statusVoomp,
    productName: ev.productName,
    offerName: ev.offerName,
    name: ev.name,
    phone: ev.phone,
    document: ev.document,
    zipcode: ev.zipcode,
    city: ev.city,
    uf: ev.uf,
    saleId: ev.saleId,
    method: ev.method,
    installments: ev.installments,
    amountCents: ev.amountCents,
    coupon: ev.coupon,
    refusedReason: ev.refusedReason,
    utmSource: ev.utmSource,
    utmCampaign: ev.utmCampaign,
    utmContent: ev.utmContent,
  } satisfies Partial<InsertVoompInscricao>;
  const preenchidos = Object.fromEntries(Object.entries(campos).filter(([, v]) => v !== null && v !== undefined));

  let inscricaoId: number | null = null;
  let status: StatusInscricao = ev.status;
  for (let tentativa = 0; tentativa < 2 && inscricaoId === null; tentativa++) {
    const [existente] = await db
      .select()
      .from(voompInscricoes)
      .where(and(eq(voompInscricoes.email, ev.email), eq(voompInscricoes.productId, ev.productId)))
      .limit(1);

    status = proximoStatus((existente?.status as StatusInscricao | undefined) ?? null, ev.status);
    const agora = new Date();
    const pagoAgora = status === "pago" && !existente?.paidAt;

    if (existente) {
      await db
        .update(voompInscricoes)
        .set({
          ...preenchidos,
          status,
          // um aviso antigo (ex.: abandonou) não troca o motivo de quem já pagou
          ...(status !== ev.status ? { statusVoomp: existente.statusVoomp } : {}),
          ...(status === "pago" ? { refusedReason: null } : {}),
          ...(pagoAgora ? { paidAt: ev.paidAt ?? agora } : {}),
          eventsCount: sql`${voompInscricoes.eventsCount} + 1`,
          lastEventAt: agora,
        })
        .where(eq(voompInscricoes.id, existente.id));
      inscricaoId = existente.id;
    } else {
      try {
        const [nova] = await db
          .insert(voompInscricoes)
          .values({
            ...preenchidos,
            email: ev.email,
            productId: ev.productId,
            status,
            paidAt: status === "pago" ? (ev.paidAt ?? agora) : null,
            eventsCount: 1,
            firstEventAt: agora,
            lastEventAt: agora,
          })
          .$returningId();
        inscricaoId = nova.id;
      } catch (erro) {
        if (!ehDuplicado(erro)) throw erro; // dois avisos simultâneos: o segundo vira atualização
      }
    }
  }
  if (inscricaoId === null) throw new Error("Não consegui registrar a inscrição");

  let matricula: string | null = null;
  if (status === "pago" || status === "reembolsado" || status === "chargeback") {
    const [atual] = await db
      .select({ matricula: voompInscricoes.matricula, paidAt: voompInscricoes.paidAt })
      .from(voompInscricoes)
      .where(eq(voompInscricoes.id, inscricaoId))
      .limit(1);
    matricula = atual?.matricula ?? null;
    // matrícula nasce no pagamento; quem pagou e depois pediu reembolso a mantém
    if (!matricula && status === "pago") matricula = await atribuirMatricula(inscricaoId, ev.productId);
  }

  await db.update(voompEventos).set({ inscricaoId }).where(eq(voompEventos.id, evento.id));
  return { eventoId: evento.id, inscricaoId, status, matricula };
}

/** Tudo o que o painel /painel/estudantes mostra (lista completa + últimos avisos). */
export async function listarEstudantesVoomp() {
  const db = await getDb();
  if (!db) return null;
  await garantirTabelas();
  const [inscricoes, eventos, [contagem]] = await Promise.all([
    db.select().from(voompInscricoes).orderBy(desc(voompInscricoes.lastEventAt)).limit(5000),
    db
      .select({
        id: voompEventos.id,
        evento: voompEventos.evento,
        status: voompEventos.status,
        statusVoomp: voompEventos.statusVoomp,
        productId: voompEventos.productId,
        email: voompEventos.email,
        receivedAt: voompEventos.receivedAt,
      })
      .from(voompEventos)
      .orderBy(desc(voompEventos.receivedAt))
      .limit(30),
    db.select({ total: sql<number>`count(*)` }).from(voompEventos),
  ]);
  return { inscricoes, eventos, totalEventos: Number(contagem?.total ?? 0), geradoEm: new Date().toISOString() };
}
