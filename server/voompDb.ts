// Gravação e leitura do registro de estudantes da Voomp (ver voompWebhook.ts):
// inscrições (pagas ou não), avisos recebidos e vida acadêmica de quem se
// matriculou (RA, turma, progresso, conclusão, cancelamento).

import { TransactionRollbackError, and, desc, eq, inArray, isNotNull, isNull, like, not, or, sql } from "drizzle-orm";
import {
  voompAcademico,
  voompEventos,
  voompInscricoes,
  type InsertVoompAcademico,
  type InsertVoompInscricao,
  type VoompAcademico,
} from "../drizzle/schema";
import { calendarioDoCurso, interpretarLinha, mapearColunas, turmaDaInscricao } from "../shared/academico";
import { cursoVoomp, formatarMatricula, type StatusInscricao } from "../shared/voomp";
import { cifrarDocumento, decifrarDocumento, estaCifrado, mascararDocumento, ocultarDocumentos } from "./cifraDocumento";
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

/** Vida acadêmica (RA, turma, progresso, conclusão) — mesmo SQL da migração 0018. */
export const DDL_ACADEMICO = `CREATE TABLE IF NOT EXISTS \`voomp_academico\` (
	\`id\` int AUTO_INCREMENT NOT NULL,
	\`inscricaoId\` int NOT NULL,
	\`ra\` varchar(40),
	\`turma\` varchar(24),
	\`progressoPct\` int,
	\`aulasConcluidas\` int,
	\`aulasTotal\` int,
	\`aprovado\` boolean,
	\`ultimoAcessoAt\` timestamp,
	\`ultimoAvancoAt\` timestamp,
	\`concluidoAt\` timestamp,
	\`canceladoAt\` timestamp,
	\`motivoCancelamento\` varchar(255),
	\`observacoes\` text,
	\`origem\` varchar(24),
	\`importadoAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT \`voomp_academico_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`voomp_academico_inscricao_unique\` UNIQUE(\`inscricaoId\`),
	KEY \`voomp_academico_ra_idx\` (\`ra\`)
);`;

/** Coluna do CPF alargada para caber o texto cifrado (migração 0018). Só roda se ainda estiver curta. */
export const ALTER_DOCUMENTO = "ALTER TABLE `voomp_inscricoes` MODIFY COLUMN `document` varchar(128);";

type Banco = NonNullable<Awaited<ReturnType<typeof getDb>>>;
type Transacao = Parameters<Parameters<Banco["transaction"]>[0]>[0];
type Executor = Banco | Transacao;

let tabelasProntas: Promise<void> | null = null;

async function garantirTabelas() {
  const db = await getDb();
  if (!db) return;
  tabelasProntas ??= (async () => {
    for (const comando of DDL_VOOMP) await db.execute(sql.raw(comando));
    await db.execute(sql.raw(DDL_ACADEMICO));
    const [linhas] = (await db.execute(
      sql`SELECT CHARACTER_MAXIMUM_LENGTH AS tamanho FROM information_schema.COLUMNS
          WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'voomp_inscricoes' AND COLUMN_NAME = 'document'`
    )) as unknown as [{ tamanho: number | string | null }[]];
    if (Number(linhas?.[0]?.tamanho ?? 0) < 128) await db.execute(sql.raw(ALTER_DOCUMENTO));
    await protegerDadosAntigos(db);
  })().catch((erro) => {
    tabelasProntas = null; // tenta de novo no próximo aviso
    throw erro;
  });
  await tabelasProntas;
}

/**
 * Uma vez por arranque do servidor: cifra CPF que tenha ficado em texto aberto
 * (avisos gravados antes da cifra) e tira o CPF das cópias dos avisos.
 */
async function protegerDadosAntigos(db: Banco) {
  const abertos = await db
    .select({ id: voompInscricoes.id, document: voompInscricoes.document })
    .from(voompInscricoes)
    .where(and(isNotNull(voompInscricoes.document), not(like(voompInscricoes.document, "cpf_:%"))));
  for (const linha of abertos) {
    const cifrado = cifrarDocumento(linha.document);
    if (cifrado) await db.update(voompInscricoes).set({ document: cifrado }).where(eq(voompInscricoes.id, linha.id));
  }
  const avisos = await db
    .select({ id: voompEventos.id, payload: voompEventos.payload })
    .from(voompEventos)
    .where(or(like(voompEventos.payload, '%"document%'), like(voompEventos.payload, '%"cpf%')));
  for (const aviso of avisos) {
    try {
      const limpo = JSON.stringify(ocultarDocumentos(JSON.parse(aviso.payload)));
      if (limpo !== aviso.payload) await db.update(voompEventos).set({ payload: limpo }).where(eq(voompEventos.id, aviso.id));
    } catch {
      /* corpo que não é JSON: fica como está */
    }
  }
}

const ehDuplicado = (erro: unknown) =>
  String((erro as { code?: string })?.code ?? (erro as Error)?.message ?? "").includes("ER_DUP_ENTRY") ||
  String((erro as Error)?.message ?? "").includes("Duplicate entry");

/** Próximo número da matrícula daquele curso e ano (NK-MBA-2027-0001, 0002...). */
async function proximaSequencia(db: Executor, prefixo: string) {
  const [linha] = await db
    .select({
      maior: sql<number>`coalesce(max(cast(substring_index(${voompInscricoes.matricula}, '-', -1) as unsigned)), 0)`,
    })
    .from(voompInscricoes)
    .where(like(voompInscricoes.matricula, `${prefixo}%`));
  return Number(linha?.maior ?? 0) + 1;
}

async function atribuirMatricula(db: Executor, inscricaoId: number, productId: string, pagoEm: Date | null) {
  const { codigo } = cursoVoomp(productId);
  const { ano } = turmaDaInscricao(productId, pagoEm);
  for (let tentativa = 0; tentativa < 5; tentativa++) {
    const matricula = formatarMatricula(codigo, ano, await proximaSequencia(db, `NK-${codigo}-${ano}-`));
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
 * Com { teste: true } faz tudo dentro de uma transação e desfaz no fim: prova
 * o caminho inteiro no banco real sem deixar estudante de mentira no painel.
 * O `payload` deve chegar sem CPF (a rota passa por ocultarDocumentos).
 */
export async function registrarEventoVoomp(ev: EventoVoomp, payload: string, opcoes: { teste?: boolean } = {}) {
  const db = await getDb();
  if (!db) return null;
  await garantirTabelas();
  if (!opcoes.teste) return gravarEvento(db, ev, payload);

  let resultado: Awaited<ReturnType<typeof gravarEvento>> | null = null;
  try {
    await db.transaction(async (tx) => {
      resultado = await gravarEvento(tx, ev, payload);
      tx.rollback();
    });
  } catch (erro) {
    if (!(erro instanceof TransactionRollbackError)) throw erro;
  }
  if (!resultado) throw new Error("Teste não gravou o evento");
  return { ...(resultado as Awaited<ReturnType<typeof gravarEvento>>), teste: true, desfeito: true };
}

async function gravarEvento(db: Executor, ev: EventoVoomp, payload: string) {
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
    document: cifrarDocumento(ev.document),
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
    if (!matricula && status === "pago") {
      matricula = await atribuirMatricula(db, inscricaoId, ev.productId, atual?.paidAt ?? null);
    }
  }

  await db.update(voompEventos).set({ inscricaoId }).where(eq(voompEventos.id, evento.id));
  return { eventoId: evento.id, inscricaoId, status, matricula };
}

/** Tudo o que o painel /painel/estudantes mostra (lista completa + vida acadêmica + últimos avisos). */
export async function listarEstudantesVoomp() {
  const db = await getDb();
  if (!db) return null;
  await garantirTabelas();
  const [linhas, academicos, eventos, [contagem]] = await Promise.all([
    db.select().from(voompInscricoes).orderBy(desc(voompInscricoes.lastEventAt)).limit(5000),
    db.select().from(voompAcademico),
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
  const porInscricao = new Map(academicos.map((a) => [a.inscricaoId, a]));
  // O CPF sai daqui só mascarado; completo, só no cartão do estudante (obterEstudante).
  const inscricoes = linhas.map(({ document, ...resto }) => ({
    ...resto,
    documentoMascarado: mascararDocumento(decifrarDocumento(document)),
    academico: porInscricao.get(resto.id) ?? null,
  }));
  const importacoes = academicos.map((a) => a.importadoAt).filter((d): d is Date => Boolean(d));
  return {
    inscricoes,
    eventos,
    totalEventos: Number(contagem?.total ?? 0),
    ultimaImportacao: importacoes.length ? new Date(Math.max(...importacoes.map((d) => d.getTime()))).toISOString() : null,
    geradoEm: new Date().toISOString(),
  };
}

/** Cartão do estudante: tudo da inscrição, CPF completo, vida acadêmica e avisos recebidos. */
export async function obterEstudante(inscricaoId: number) {
  const db = await getDb();
  if (!db) return null;
  await garantirTabelas();
  const [inscricao] = await db.select().from(voompInscricoes).where(eq(voompInscricoes.id, inscricaoId)).limit(1);
  if (!inscricao) return { encontrado: false as const };
  const [[academico], eventos] = await Promise.all([
    db.select().from(voompAcademico).where(eq(voompAcademico.inscricaoId, inscricaoId)).limit(1),
    db
      .select({
        id: voompEventos.id,
        evento: voompEventos.evento,
        status: voompEventos.status,
        statusVoomp: voompEventos.statusVoomp,
        receivedAt: voompEventos.receivedAt,
      })
      .from(voompEventos)
      .where(eq(voompEventos.inscricaoId, inscricaoId))
      .orderBy(desc(voompEventos.receivedAt))
      .limit(50),
  ]);
  const { document, ...resto } = inscricao;
  return {
    encontrado: true as const,
    inscricao: { ...resto, documento: decifrarDocumento(document), documentoCifrado: estaCifrado(document) },
    academico: academico ?? null,
    eventos,
  };
}

/** CPF completo de cada inscrição, para a planilha com "incluir CPF completo" marcado. */
export async function documentosCompletos(ids: number[]) {
  const db = await getDb();
  if (!db) return null;
  await garantirTabelas();
  if (ids.length === 0) return [];
  const linhas = await db
    .select({ id: voompInscricoes.id, document: voompInscricoes.document })
    .from(voompInscricoes)
    .where(inArray(voompInscricoes.id, ids.slice(0, 5000)));
  return linhas.map((l) => ({ id: l.id, documento: decifrarDocumento(l.document) }));
}

export type EdicaoAcademica = {
  ra?: string | null;
  turma?: string | null;
  progressoPct?: number | null;
  aprovado?: boolean | null;
  concluido?: boolean;
  cancelado?: boolean;
  motivoCancelamento?: string | null;
  observacoes?: string | null;
};

const vazioParaNulo = (v: string | null | undefined) => (v === undefined ? undefined : v?.trim() ? v.trim() : null);

/** Campos da vida acadêmica que uma edição feita à mão no cartão do estudante muda. */
export function camposDaEdicao(atual: VoompAcademico | null | undefined, edicao: EdicaoAcademica, agora: Date) {
  const campos: Partial<InsertVoompAcademico> = { origem: "painel" };
  if (edicao.ra !== undefined) campos.ra = vazioParaNulo(edicao.ra) ?? null;
  if (edicao.turma !== undefined) campos.turma = vazioParaNulo(edicao.turma)?.toUpperCase() ?? null;
  if (edicao.observacoes !== undefined) campos.observacoes = vazioParaNulo(edicao.observacoes) ?? null;
  if (edicao.aprovado !== undefined) campos.aprovado = edicao.aprovado;
  if (edicao.progressoPct !== undefined) {
    campos.progressoPct = edicao.progressoPct;
    if ((edicao.progressoPct ?? 0) > (atual?.progressoPct ?? 0)) campos.ultimoAvancoAt = agora;
  }
  if (edicao.concluido !== undefined) campos.concluidoAt = edicao.concluido ? (atual?.concluidoAt ?? agora) : null;
  if (edicao.cancelado !== undefined) {
    campos.canceladoAt = edicao.cancelado ? (atual?.canceladoAt ?? agora) : null;
    campos.motivoCancelamento = edicao.cancelado
      ? (vazioParaNulo(edicao.motivoCancelamento) ?? atual?.motivoCancelamento ?? null)
      : null;
  } else if (edicao.motivoCancelamento !== undefined) {
    campos.motivoCancelamento = vazioParaNulo(edicao.motivoCancelamento) ?? null;
  }
  return campos;
}

/** Edição feita à mão no cartão do estudante. */
export async function atualizarAcademico(inscricaoId: number, edicao: EdicaoAcademica, agora = new Date()) {
  const db = await getDb();
  if (!db) return null;
  await garantirTabelas();
  const [inscricao] = await db
    .select({ id: voompInscricoes.id })
    .from(voompInscricoes)
    .where(eq(voompInscricoes.id, inscricaoId))
    .limit(1);
  if (!inscricao) return { ok: false as const, erro: "inscrição não encontrada" };
  const [atual] = await db.select().from(voompAcademico).where(eq(voompAcademico.inscricaoId, inscricaoId)).limit(1);
  const campos = camposDaEdicao(atual, edicao, agora);
  await db
    .insert(voompAcademico)
    .values({ inscricaoId, ...campos })
    .onDuplicateKeyUpdate({ set: campos });
  const [salvo] = await db.select().from(voompAcademico).where(eq(voompAcademico.inscricaoId, inscricaoId)).limit(1);
  return { ok: true as const, academico: salvo ?? null };
}

export type ResultadoLinha = {
  linha: number;
  email: string | null;
  nome: string | null;
  matricula: string | null;
  resultado: "atualizada" | "sem_mudanca" | "nao_encontrada" | "nao_matriculada" | "ambigua";
  progressoAntes: number | null;
  progressoDepois: number | null;
  concluiuAgora: boolean;
};

type InscricaoParaImportar = { id: number; email: string; matricula: string | null; documento: string | null; status: string };

/**
 * Plano da importação do relatório de progresso (sem tocar no banco). Cada
 * linha é ligada a uma inscrição do curso pelo e-mail, pela matrícula NOKAHI,
 * pelo RA ou pelo CPF. Progresso que sobe marca o "último avanço" (base do
 * "em risco"); 100%, data de conclusão ou "aprovado" marcam a conclusão.
 */
export function planejarImportacao(
  cabecalhos: string[],
  linhasPlanilha: string[][],
  inscricoes: InscricaoParaImportar[],
  academicos: VoompAcademico[],
  agora: Date,
  cargaHoraria = 0
) {
  const colunas = mapearColunas(cabecalhos);
  const acadPorId = new Map(academicos.map((a) => [a.inscricaoId, a]));
  const indice = {
    email: new Map<string, number[]>(),
    matricula: new Map<string, number[]>(),
    ra: new Map<string, number[]>(),
    cpf: new Map<string, number[]>(),
  };
  const guardar = (mapa: Map<string, number[]>, chave: string | null | undefined, id: number) => {
    if (!chave) return;
    mapa.set(chave, [...(mapa.get(chave) ?? []), id]);
  };
  for (const i of inscricoes) {
    guardar(indice.email, i.email.toLowerCase(), i.id);
    guardar(indice.matricula, i.matricula?.toUpperCase(), i.id);
    guardar(indice.ra, acadPorId.get(i.id)?.ra?.trim().toLowerCase(), i.id);
    guardar(indice.cpf, i.documento?.replace(/\D/g, ""), i.id);
  }
  const statusPorId = new Map(inscricoes.map((i) => [i.id, i.status]));

  const resultados: ResultadoLinha[] = [];
  const gravar: { inscricaoId: number; campos: Partial<InsertVoompAcademico> }[] = [];
  const jaNaPlanilha = new Set<number>();

  linhasPlanilha.slice(0, 5000).forEach((celulas, n) => {
    const l = interpretarLinha(colunas, celulas, cargaHoraria);
    const candidatos =
      (l.email && indice.email.get(l.email)) ||
      (l.matricula && indice.matricula.get(l.matricula)) ||
      (l.ra && indice.ra.get(l.ra.toLowerCase())) ||
      (l.cpfDigitos && indice.cpf.get(l.cpfDigitos)) ||
      [];
    const base = { linha: n + 2, email: l.email, nome: l.nome, matricula: l.matricula, concluiuAgora: false };
    if (candidatos.length === 0) {
      resultados.push({ ...base, resultado: "nao_encontrada", progressoAntes: null, progressoDepois: l.progressoPct });
      return;
    }
    if (candidatos.length > 1 || jaNaPlanilha.has(candidatos[0])) {
      resultados.push({ ...base, resultado: "ambigua", progressoAntes: null, progressoDepois: l.progressoPct });
      return;
    }
    const inscricaoId = candidatos[0];
    jaNaPlanilha.add(inscricaoId);
    const status = statusPorId.get(inscricaoId);
    if (status !== "pago" && status !== "reembolsado" && status !== "chargeback") {
      resultados.push({ ...base, resultado: "nao_matriculada", progressoAntes: null, progressoDepois: l.progressoPct });
      return;
    }

    const atual = acadPorId.get(inscricaoId);
    const campos: Partial<InsertVoompAcademico> = {};
    if (l.ra && l.ra !== atual?.ra) campos.ra = l.ra;
    if (l.aulasConcluidas !== null && l.aulasConcluidas !== atual?.aulasConcluidas) campos.aulasConcluidas = l.aulasConcluidas;
    if (l.aulasTotal !== null && l.aulasTotal !== atual?.aulasTotal) campos.aulasTotal = l.aulasTotal;
    if (l.aprovado !== null && l.aprovado !== atual?.aprovado) campos.aprovado = l.aprovado;
    if (l.ultimoAcessoAt && l.ultimoAcessoAt.getTime() !== atual?.ultimoAcessoAt?.getTime()) {
      campos.ultimoAcessoAt = l.ultimoAcessoAt;
    }
    if (l.progressoPct !== null && l.progressoPct !== atual?.progressoPct) {
      campos.progressoPct = l.progressoPct;
      if (l.progressoPct > (atual?.progressoPct ?? 0)) {
        const quando = l.ultimoAcessoAt && l.ultimoAcessoAt <= agora ? l.ultimoAcessoAt : agora;
        const anterior = atual?.ultimoAvancoAt;
        campos.ultimoAvancoAt = anterior && anterior > quando ? anterior : quando;
      }
    }
    const concluiuAgora = l.concluido && !atual?.concluidoAt;
    if (concluiuAgora) campos.concluidoAt = l.concluidoAt ?? l.ultimoAcessoAt ?? agora;

    const mudou = Object.keys(campos).length > 0;
    resultados.push({
      ...base,
      concluiuAgora,
      resultado: mudou ? "atualizada" : "sem_mudanca",
      progressoAntes: atual?.progressoPct ?? null,
      progressoDepois: campos.progressoPct ?? atual?.progressoPct ?? null,
    });
    gravar.push({ inscricaoId, campos: { ...campos, origem: "importacao", importadoAt: agora } });
  });

  const conta = (r: ResultadoLinha["resultado"]) => resultados.filter((x) => x.resultado === r).length;
  return {
    colunas,
    gravar,
    totais: {
      linhas: resultados.length,
      atualizadas: conta("atualizada"),
      semMudanca: conta("sem_mudanca"),
      naoEncontradas: conta("nao_encontrada"),
      naoMatriculadas: conta("nao_matriculada"),
      ambiguas: conta("ambigua"),
      concluiramAgora: resultados.filter((r) => r.concluiuAgora).length,
    },
    resultados,
  };
}

/** Importa o relatório de progresso de um curso. Com simular = true só mostra o que mudaria. */
export async function importarProgresso(
  productId: string,
  cabecalhos: string[],
  linhasPlanilha: string[][],
  opcoes: { simular: boolean; agora?: Date }
) {
  const db = await getDb();
  if (!db) return null;
  await garantirTabelas();
  const agora = opcoes.agora ?? new Date();
  const colunas = mapearColunas(cabecalhos);
  if (!colunas.some((c) => c === "email" || c === "matricula" || c === "ra" || c === "cpf")) {
    return {
      ok: false as const,
      erro: "A planilha precisa de uma coluna de e-mail, matrícula, RA ou CPF para achar cada estudante.",
      colunas,
    };
  }

  const linhas = await db
    .select({
      id: voompInscricoes.id,
      email: voompInscricoes.email,
      matricula: voompInscricoes.matricula,
      document: voompInscricoes.document,
      status: voompInscricoes.status,
    })
    .from(voompInscricoes)
    .where(eq(voompInscricoes.productId, productId));
  const inscricoes = linhas.map(({ document, ...resto }) => ({ ...resto, documento: decifrarDocumento(document) }));
  const ids = inscricoes.map((i) => i.id);
  const academicos = ids.length ? await db.select().from(voompAcademico).where(inArray(voompAcademico.inscricaoId, ids)) : [];

  const plano = planejarImportacao(cabecalhos, linhasPlanilha, inscricoes, academicos, agora, calendarioDoCurso(productId).cargaHoraria);
  if (!opcoes.simular) {
    for (const { inscricaoId, campos } of plano.gravar) {
      await db
        .insert(voompAcademico)
        .values({ inscricaoId, ...campos })
        .onDuplicateKeyUpdate({ set: campos });
    }
  }
  return {
    ok: true as const,
    simulado: opcoes.simular,
    colunas: plano.colunas,
    totais: plano.totais,
    resultados: plano.resultados.slice(0, 1000),
  };
}
