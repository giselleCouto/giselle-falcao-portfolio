import { and, desc, eq, gte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  academyStudents,
  aiMaturity,
  courseAccess,
  courseInterest,
  InsertAiMaturity,
  courseLessonProgress,
  courseProgress,
  InsertAcademyStudent,
  InsertCourseInterest,
  InsertMentoriaDiagnostico,
  mentoriaDiagnostico,
  InsertCourseAccess,
  InsertCourseLessonProgress,
  InsertCourseProgress,
  InsertLeadContact,
  InsertPageVisit,
  InsertPalestraPedido,
  InsertTrajetoriaCandidatura,
  InsertUser,
  leadContacts,
  pageVisits,
  palestraPedidos,
  trajetoriaCandidatura,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }

  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod", "stripeCustomerId"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }

    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user by id: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserStripeCustomerId(userId: number, stripeCustomerId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update stripe customer id: database not available");
    return;
  }

  await db
    .update(users)
    .set({ stripeCustomerId, updatedAt: new Date() })
    .where(eq(users.id, userId));
}

export async function createLeadContact(input: InsertLeadContact) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available for lead capture");
  }

  await db.insert(leadContacts).values(input);
  return { ...input };
}

export async function listLeadContacts() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot list leads: database not available");
    return [];
  }

  return db.select().from(leadContacts).orderBy(desc(leadContacts.createdAt));
}

export async function upsertAcademyStudent(input: InsertAcademyStudent) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available for student registration");
  }

  await db
    .insert(academyStudents)
    .values(input)
    .onDuplicateKeyUpdate({
      set: {
        name: input.name,
        whatsapp: input.whatsapp ?? null,
        role: input.role ?? null,
        organization: input.organization ?? null,
        courseSlug: input.courseSlug ?? null,
        interestWorkshop: input.interestWorkshop ?? false,
        interestTalks: input.interestTalks ?? false,
        interestConsulting: input.interestConsulting ?? false,
        goals: input.goals ?? null,
        consent: input.consent ?? false,
        source: input.source ?? "academy",
      },
    });

  return { ...input };
}

export async function createCourseInterest(input: InsertCourseInterest) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available for interest survey");
  }

  await db.insert(courseInterest).values(input);
  return { ...input };
}

export async function listCourseInterest() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot list interest survey: database not available");
    return [];
  }

  return db.select().from(courseInterest).orderBy(desc(courseInterest.createdAt));
}

export async function createAiMaturity(input: InsertAiMaturity) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available for AI maturity quiz");
  }

  await db.insert(aiMaturity).values(input);
  return { ...input };
}

export async function listAiMaturity() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot list AI maturity entries: database not available");
    return [];
  }

  return db.select().from(aiMaturity).orderBy(desc(aiMaturity.createdAt));
}

export async function createMentoriaDiagnostico(input: InsertMentoriaDiagnostico) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available for mentoria diagnostic");
  }

  await db.insert(mentoriaDiagnostico).values(input);
  return { ...input };
}

export async function listMentoriaDiagnostico() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot list mentoria diagnostics: database not available");
    return [];
  }

  return db.select().from(mentoriaDiagnostico).orderBy(desc(mentoriaDiagnostico.createdAt));
}

export async function createTrajetoriaCandidatura(input: InsertTrajetoriaCandidatura) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available for trajetoria application");
  }

  await db.insert(trajetoriaCandidatura).values(input);
  return { ...input };
}

export async function listTrajetoriaCandidatura() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot list trajetoria applications: database not available");
    return [];
  }

  return db.select().from(trajetoriaCandidatura).orderBy(desc(trajetoriaCandidatura.createdAt));
}

/**
 * Resumo de leads e visitas das últimas N horas — alimenta o digest diário
 * enviado à Giselle. Somente leitura; consumido via academy.digest (token).
 */
export async function getLeadDigest(hoursWindow: number) {
  const db = await getDb();
  if (!db) return null;
  const since = new Date(Date.now() - hoursWindow * 60 * 60 * 1000);

  const [
    interesse,
    alunos,
    impulso,
    trajetoria,
    maturidade,
    pedidosPalestra,
    visitas,
    [contagemVisitas],
  ] = await Promise.all([
      db
        .select({
          name: courseInterest.name,
          email: courseInterest.email,
          whatsapp: courseInterest.whatsapp,
          coursesInterest: courseInterest.coursesInterest,
          source: courseInterest.source,
          createdAt: courseInterest.createdAt,
        })
        .from(courseInterest)
        .where(gte(courseInterest.createdAt, since)),
      db
        .select({
          name: academyStudents.name,
          email: academyStudents.email,
          createdAt: academyStudents.createdAt,
        })
        .from(academyStudents)
        .where(gte(academyStudents.createdAt, since)),
      db
        .select({
          name: mentoriaDiagnostico.name,
          email: mentoriaDiagnostico.email,
          whatsapp: mentoriaDiagnostico.whatsapp,
          areaInterest: mentoriaDiagnostico.areaInterest,
          source: mentoriaDiagnostico.source,
          campaign: mentoriaDiagnostico.campaign,
          createdAt: mentoriaDiagnostico.createdAt,
        })
        .from(mentoriaDiagnostico)
        .where(gte(mentoriaDiagnostico.createdAt, since)),
      db
        .select({
          name: trajetoriaCandidatura.name,
          email: trajetoriaCandidatura.email,
          whatsapp: trajetoriaCandidatura.whatsapp,
          funcaoInteresse: trajetoriaCandidatura.funcaoInteresse,
          bolsa: trajetoriaCandidatura.bolsa,
          source: trajetoriaCandidatura.source,
          campaign: trajetoriaCandidatura.campaign,
          createdAt: trajetoriaCandidatura.createdAt,
        })
        .from(trajetoriaCandidatura)
        .where(gte(trajetoriaCandidatura.createdAt, since)),
      db
        .select({
          name: aiMaturity.name,
          email: aiMaturity.email,
          company: aiMaturity.company,
          role: aiMaturity.role,
          totalScore: aiMaturity.totalScore,
          level: aiMaturity.level,
          source: aiMaturity.source,
          campaign: aiMaturity.campaign,
          createdAt: aiMaturity.createdAt,
        })
        .from(aiMaturity)
        .where(gte(aiMaturity.createdAt, since)),
      db
        .select({
          name: palestraPedidos.name,
          email: palestraPedidos.email,
          whatsapp: palestraPedidos.whatsapp,
          empresa: palestraPedidos.empresa,
          tipo: palestraPedidos.tipo,
          evento: palestraPedidos.evento,
          source: palestraPedidos.source,
          createdAt: palestraPedidos.createdAt,
        })
        .from(palestraPedidos)
        .where(gte(palestraPedidos.createdAt, since)),
      db
        .select({ path: pageVisits.path, source: pageVisits.source, campaign: pageVisits.campaign })
        .from(pageVisits)
        .where(gte(pageVisits.createdAt, since))
        .limit(2000),
      // Pessoas x páginas: visitorId é anônimo e muda por dia. Eventos do kit
      // (/kit/e/...) usam o mesmo endpoint mas não são páginas vistas.
      db
        .select({
          paginasVistas: sql<number>`count(*)`,
          visitantesUnicos: sql<number>`count(distinct ${pageVisits.visitorId})`,
          paginasSemIdentificador: sql<number>`sum(case when ${pageVisits.visitorId} is null then 1 else 0 end)`,
        })
        .from(pageVisits)
        .where(and(gte(pageVisits.createdAt, since), sql`${pageVisits.path} not like '/kit/e/%'`)),
    ]);

  return {
    desde: since.toISOString(),
    janelaHoras: hoursWindow,
    interesseCursos: interesse,
    novosAlunos: alunos,
    mentoriaImpulso: impulso,
    candidaturasTrajetoria: trajetoria,
    diagnosticosMaturidade: maturidade,
    pedidosPalestra,
    visitas,
    resumoVisitas: {
      paginasVistas: Number(contagemVisitas?.paginasVistas ?? 0),
      visitantesUnicos: Number(contagemVisitas?.visitantesUnicos ?? 0),
      paginasSemIdentificador: Number(contagemVisitas?.paginasSemIdentificador ?? 0),
    },
  };
}

export async function createPalestraPedido(input: InsertPalestraPedido) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available for talk proposal request");
  }

  await db.insert(palestraPedidos).values(input);
  return { ...input };
}

export async function listPalestraPedidos() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot list talk proposal requests: database not available");
    return [];
  }

  return db.select().from(palestraPedidos).orderBy(desc(palestraPedidos.id));
}

export async function createPageVisit(input: InsertPageVisit) {
  const db = await getDb();
  if (!db) {
    // Métrica é best-effort: nunca derrubar a navegação por falta de banco.
    console.warn("[Database] Cannot record page visit: database not available");
    return null;
  }

  try {
    await db.insert(pageVisits).values(input);
    return { ...input };
  } catch (error) {
    console.warn("[Database] Failed to record page visit", error);
    return null;
  }
}

export async function listPageVisits() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot list page visits: database not available");
    return [];
  }

  // id (PK) tem a mesma ordem cronológica e usa índice — createdAt não tem.
  return db.select().from(pageVisits).orderBy(desc(pageVisits.id)).limit(2000);
}

export async function listAcademyStudents() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot list students: database not available");
    return [];
  }

  return db.select().from(academyStudents).orderBy(desc(academyStudents.createdAt));
}

export async function upsertCourseCheckout(input: {
  userId: number;
  courseSlug: string;
  stripeCheckoutSessionId: string;
}) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available for course checkout");
  }

  const values: InsertCourseAccess = {
    userId: input.userId,
    courseSlug: input.courseSlug,
    accessLevel: "full",
    status: "pending",
    stripeCheckoutSessionId: input.stripeCheckoutSessionId,
  };

  await db.insert(courseAccess).values(values).onDuplicateKeyUpdate({
    set: {
      status: "pending",
      accessLevel: "full",
      stripeCheckoutSessionId: input.stripeCheckoutSessionId,
      updatedAt: new Date(),
    },
  });
}

export async function activateCourseAccess(input: {
  userId: number;
  courseSlug: string;
  stripeCheckoutSessionId?: string | null;
  stripePaymentIntentId?: string | null;
}) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available for course activation");
  }

  const values: InsertCourseAccess = {
    userId: input.userId,
    courseSlug: input.courseSlug,
    accessLevel: "full",
    status: "active",
    stripeCheckoutSessionId: input.stripeCheckoutSessionId ?? null,
    stripePaymentIntentId: input.stripePaymentIntentId ?? null,
    grantedAt: new Date(),
  };

  await db.insert(courseAccess).values(values).onDuplicateKeyUpdate({
    set: {
      accessLevel: "full",
      status: "active",
      stripeCheckoutSessionId: input.stripeCheckoutSessionId ?? null,
      stripePaymentIntentId: input.stripePaymentIntentId ?? null,
      grantedAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

export async function getCourseAccessForUser(userId: number, courseSlug: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get course access: database not available");
    return null;
  }

  const result = await db
    .select()
    .from(courseAccess)
    .where(and(eq(courseAccess.userId, userId), eq(courseAccess.courseSlug, courseSlug)))
    .limit(1);

  return result[0] ?? null;
}

export async function getCourseAccessByCheckoutSessionId(checkoutSessionId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get course access by checkout session: database not available");
    return null;
  }

  const result = await db
    .select()
    .from(courseAccess)
    .where(eq(courseAccess.stripeCheckoutSessionId, checkoutSessionId))
    .limit(1);

  return result[0] ?? null;
}

export async function upsertCourseProgressRecord(input: {
  userId: number;
  courseSlug: string;
  moduleId: string;
  lessonKey?: string | null;
  lessonTitle?: string | null;
  practiceCompleted?: boolean;
  completed?: boolean;
}) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available for course progress");
  }

  const values: InsertCourseProgress = {
    userId: input.userId,
    courseSlug: input.courseSlug,
    moduleId: input.moduleId,
    lessonKey: input.lessonKey ?? null,
    lessonTitle: input.lessonTitle ?? null,
    practiceCompleted: input.practiceCompleted ?? false,
    completed: input.completed ?? false,
    lastVisitedAt: new Date(),
  };

  await db.insert(courseProgress).values(values).onDuplicateKeyUpdate({
    set: {
      lessonKey: input.lessonKey ?? null,
      lessonTitle: input.lessonTitle ?? null,
      practiceCompleted: input.practiceCompleted ?? false,
      completed: input.completed ?? false,
      lastVisitedAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

export async function upsertCourseLessonProgressRecord(input: {
  userId: number;
  courseSlug: string;
  moduleId: string;
  lessonKey: string;
  lessonTitle?: string | null;
  completed?: boolean;
}) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available for lesson progress");
  }

  const values: InsertCourseLessonProgress = {
    userId: input.userId,
    courseSlug: input.courseSlug,
    moduleId: input.moduleId,
    lessonKey: input.lessonKey,
    lessonTitle: input.lessonTitle ?? null,
    completed: input.completed ?? false,
    lastVisitedAt: new Date(),
  };

  await db.insert(courseLessonProgress).values(values).onDuplicateKeyUpdate({
    set: {
      lessonTitle: input.lessonTitle ?? null,
      completed: input.completed ?? false,
      lastVisitedAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

export async function listCourseLessonProgress(userId: number, courseSlug: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot list lesson progress: database not available");
    return [];
  }

  return db
    .select()
    .from(courseLessonProgress)
    .where(and(eq(courseLessonProgress.userId, userId), eq(courseLessonProgress.courseSlug, courseSlug)))
    .orderBy(desc(courseLessonProgress.lastVisitedAt));
}

export async function listCourseProgress(userId: number, courseSlug: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot list course progress: database not available");
    return [];
  }

  return db
    .select()
    .from(courseProgress)
    .where(and(eq(courseProgress.userId, userId), eq(courseProgress.courseSlug, courseSlug)))
    .orderBy(desc(courseProgress.lastVisitedAt));
}

/**
 * Métricas do funil de vendas para o painel protegido da Giselle (/painel).
 * Janela em dias; somente leitura, consumido via academy.painel (token).
 * O diagnóstico da masterclass fica codificado em lead_contacts:
 *   interest = "mc-perfil:<perfil>" · businessArea = "uso:x;inv:x;obj:x;agentes:x".
 */
export async function getPainelFunil(days: number) {
  const db = await getDb();
  if (!db) return null;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const [visitasDia, visitasPath, canais, eventosKit, leads, [contagemLeads], trajetorias, impulso, maturidade, pedidos, interesses] =
    await Promise.all([
      db
        .select({
          dia: sql<string>`date(${pageVisits.createdAt})`,
          visitas: sql<number>`count(*)`,
          unicos: sql<number>`count(distinct ${pageVisits.visitorId})`,
        })
        .from(pageVisits)
        .where(and(gte(pageVisits.createdAt, since), sql`${pageVisits.path} not like '/kit/e/%'`))
        .groupBy(sql`date(${pageVisits.createdAt})`)
        .orderBy(sql`date(${pageVisits.createdAt})`),
      db
        .select({
          path: pageVisits.path,
          visitas: sql<number>`count(*)`,
          unicos: sql<number>`count(distinct ${pageVisits.visitorId})`,
        })
        .from(pageVisits)
        .where(and(gte(pageVisits.createdAt, since), sql`${pageVisits.path} not like '/kit/e/%'`))
        .groupBy(pageVisits.path)
        .orderBy(desc(sql`count(*)`))
        .limit(40),
      db
        .select({
          source: sql<string>`coalesce(${pageVisits.source}, 'direto')`,
          visitas: sql<number>`count(*)`,
          unicos: sql<number>`count(distinct ${pageVisits.visitorId})`,
        })
        .from(pageVisits)
        .where(and(gte(pageVisits.createdAt, since), sql`${pageVisits.path} not like '/kit/e/%'`))
        .groupBy(sql`coalesce(${pageVisits.source}, 'direto')`)
        .orderBy(desc(sql`count(*)`))
        .limit(15),
      db
        .select({ path: pageVisits.path, total: sql<number>`count(*)` })
        .from(pageVisits)
        .where(and(gte(pageVisits.createdAt, since), sql`${pageVisits.path} like '/kit/e/%'`))
        .groupBy(pageVisits.path)
        .orderBy(desc(sql`count(*)`)),
      db
        .select({
          route: leadContacts.route,
          persona: leadContacts.persona,
          interest: leadContacts.interest,
          businessArea: leadContacts.businessArea,
          source: leadContacts.source,
          campaign: leadContacts.campaign,
          name: leadContacts.name,
          createdAt: leadContacts.createdAt,
        })
        .from(leadContacts)
        .where(gte(leadContacts.createdAt, since))
        .orderBy(desc(leadContacts.createdAt))
        .limit(500),
      // Contagem sem teto: os tiles usam este número; a lista acima é amostra.
      db
        .select({ total: sql<number>`count(*)` })
        .from(leadContacts)
        .where(gte(leadContacts.createdAt, since)),
      db
        .select({ status: trajetoriaCandidatura.status, total: sql<number>`count(*)` })
        .from(trajetoriaCandidatura)
        .where(gte(trajetoriaCandidatura.createdAt, since))
        .groupBy(trajetoriaCandidatura.status),
      db
        .select({ total: sql<number>`count(*)` })
        .from(mentoriaDiagnostico)
        .where(gte(mentoriaDiagnostico.createdAt, since)),
      db
        .select({ total: sql<number>`count(*)`, mediaScore: sql<number>`avg(${aiMaturity.totalScore})` })
        .from(aiMaturity)
        .where(gte(aiMaturity.createdAt, since)),
      db
        .select({ status: palestraPedidos.status, total: sql<number>`count(*)` })
        .from(palestraPedidos)
        .where(gte(palestraPedidos.createdAt, since))
        .groupBy(palestraPedidos.status),
      db
        .select({ total: sql<number>`count(*)` })
        .from(courseInterest)
        .where(gte(courseInterest.createdAt, since)),
    ]);

  return {
    desde: since.toISOString(),
    janelaDias: days,
    visitasDia: visitasDia.map((v) => ({ ...v, visitas: Number(v.visitas), unicos: Number(v.unicos) })),
    visitasPath: visitasPath.map((v) => ({ ...v, visitas: Number(v.visitas), unicos: Number(v.unicos) })),
    canais: canais.map((c) => ({ ...c, visitas: Number(c.visitas), unicos: Number(c.unicos) })),
    eventosKit: eventosKit.map((e) => ({ evento: e.path.replace("/kit/e/", ""), total: Number(e.total) })),
    leads,
    leadsTotal: Number(contagemLeads?.total ?? 0),
    trajetorias: trajetorias.map((t) => ({ ...t, total: Number(t.total) })),
    impulso: Number(impulso[0]?.total ?? 0),
    maturidade: {
      total: Number(maturidade[0]?.total ?? 0),
      mediaScore: maturidade[0]?.mediaScore !== null && maturidade[0]?.mediaScore !== undefined ? Math.round(Number(maturidade[0]?.mediaScore) * 10) / 10 : null,
    },
    pedidosPalestra: pedidos.map((p) => ({ ...p, total: Number(p.total) })),
    interesseCursos: Number(interesses[0]?.total ?? 0),
  };
}
