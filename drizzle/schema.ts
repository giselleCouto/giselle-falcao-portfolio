import { boolean, index, int, mysqlEnum, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const leadContacts = mysqlTable("lead_contacts", {
  id: int("id").autoincrement().primaryKey(),
  route: varchar("route", { length: 64 }).notNull(),
  persona: varchar("persona", { length: 64 }).notNull(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  organization: varchar("organization", { length: 200 }),
  businessArea: varchar("businessArea", { length: 160 }),
  interest: varchar("interest", { length: 120 }),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "reviewed", "archived"]).default("new").notNull(),
  source: varchar("source", { length: 120 }).default("website").notNull(),
  campaign: varchar("campaign", { length: 120 }),
  howFound: varchar("howFound", { length: 80 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LeadContact = typeof leadContacts.$inferSelect;
export type InsertLeadContact = typeof leadContacts.$inferInsert;

export const courseAccess = mysqlTable(
  "course_access",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    courseSlug: varchar("courseSlug", { length: 120 }).notNull(),
    accessLevel: mysqlEnum("accessLevel", ["free", "full"]).default("full").notNull(),
    status: mysqlEnum("status", ["pending", "active", "canceled"]).default("pending").notNull(),
    stripeCheckoutSessionId: varchar("stripeCheckoutSessionId", { length: 255 }),
    stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
    grantedAt: timestamp("grantedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    userCourseUnique: uniqueIndex("course_access_user_course_unique").on(table.userId, table.courseSlug),
    checkoutSessionUnique: uniqueIndex("course_access_checkout_session_unique").on(table.stripeCheckoutSessionId),
    userIdx: index("course_access_user_idx").on(table.userId),
  }),
);

export type CourseAccess = typeof courseAccess.$inferSelect;
export type InsertCourseAccess = typeof courseAccess.$inferInsert;

export const courseProgress = mysqlTable(
  "course_progress",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    courseSlug: varchar("courseSlug", { length: 120 }).notNull(),
    moduleId: varchar("moduleId", { length: 64 }).notNull(),
    lessonKey: varchar("lessonKey", { length: 120 }),
    lessonTitle: varchar("lessonTitle", { length: 255 }),
    practiceCompleted: boolean("practiceCompleted").default(false).notNull(),
    completed: boolean("completed").default(false).notNull(),
    lastVisitedAt: timestamp("lastVisitedAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    userModuleUnique: uniqueIndex("course_progress_user_module_unique").on(table.userId, table.courseSlug, table.moduleId),
    progressUserIdx: index("course_progress_user_idx").on(table.userId),
  }),
);

export type CourseProgress = typeof courseProgress.$inferSelect;
export type InsertCourseProgress = typeof courseProgress.$inferInsert;

export const courseLessonProgress = mysqlTable(
  "course_lesson_progress",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    courseSlug: varchar("courseSlug", { length: 120 }).notNull(),
    moduleId: varchar("moduleId", { length: 64 }).notNull(),
    lessonKey: varchar("lessonKey", { length: 120 }).notNull(),
    lessonTitle: varchar("lessonTitle", { length: 255 }),
    completed: boolean("completed").default(false).notNull(),
    lastVisitedAt: timestamp("lastVisitedAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    userLessonUnique: uniqueIndex("course_lesson_progress_user_lesson_unique").on(table.userId, table.courseSlug, table.lessonKey),
    lessonProgressUserIdx: index("course_lesson_progress_user_idx").on(table.userId),
  }),
);

export type CourseLessonProgress = typeof courseLessonProgress.$inferSelect;
export type InsertCourseLessonProgress = typeof courseLessonProgress.$inferInsert;

/**
 * Alunos da Giselle Falcão Academy — cadastro gratuito na plataforma de cursos.
 * Também funciona como captação de leads: interesses em workshop, palestras
 * e consultoria alimentam o funil comercial da Giselle.
 */
export const academyStudents = mysqlTable(
  "academy_students",
  {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 160 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    whatsapp: varchar("whatsapp", { length: 40 }),
    role: varchar("role", { length: 160 }),
    organization: varchar("organization", { length: 200 }),
    courseSlug: varchar("courseSlug", { length: 120 }),
    interestWorkshop: boolean("interestWorkshop").default(false).notNull(),
    interestTalks: boolean("interestTalks").default(false).notNull(),
    interestConsulting: boolean("interestConsulting").default(false).notNull(),
    goals: text("goals"),
    consent: boolean("consent").default(false).notNull(),
    source: varchar("source", { length: 120 }).default("academy").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    emailUnique: uniqueIndex("academy_students_email_unique").on(table.email),
  }),
);

export type AcademyStudent = typeof academyStudents.$inferSelect;
export type InsertAcademyStudent = typeof academyStudents.$inferInsert;

/**
 * Pesquisa de interesse nos cursos — formulário público /interesse.
 * Perfil demográfico e de experiência para a Giselle dimensionar a demanda.
 */
export const courseInterest = mysqlTable("course_interest", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 40 }),
  state: varchar("state", { length: 2 }).notNull(),
  region: varchar("region", { length: 20 }).notNull(),
  gender: varchar("gender", { length: 40 }).notNull(),
  race: varchar("race", { length: 40 }).notNull(),
  education: varchar("education", { length: 60 }).notNull(),
  techExperience: varchar("techExperience", { length: 40 }).notNull(),
  dataExperience: varchar("dataExperience", { length: 40 }).notNull(),
  codeExperience: varchar("codeExperience", { length: 40 }).notNull(),
  coursesInterest: text("coursesInterest"),
  goals: text("goals"),
  consent: boolean("consent").default(false).notNull(),
  source: varchar("source", { length: 120 }).default("interesse").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CourseInterest = typeof courseInterest.$inferSelect;
export type InsertCourseInterest = typeof courseInterest.$inferInsert;

/**
 * Diagnóstico do programa de mentoria "Impulso Dela IA" — formulário de
 * qualificação comercial: a Giselle analisa cada resposta antes de oferecer
 * a conversa de diagnóstico e decidir o formato adequado.
 */
export const mentoriaDiagnostico = mysqlTable("mentoria_diagnostico", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 40 }).notNull(),
  city: varchar("city", { length: 120 }).notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  ageRange: varchar("ageRange", { length: 40 }),
  education: varchar("education", { length: 60 }).notNull(),
  currentSituation: varchar("currentSituation", { length: 80 }).notNull(),
  worksWithTech: varchar("worksWithTech", { length: 40 }).notNull(),
  areaInterest: varchar("areaInterest", { length: 80 }).notNull(),
  mainDifficulty: text("mainDifficulty").notNull(),
  goal: text("goal").notNull(),
  hoursPerWeek: varchar("hoursPerWeek", { length: 40 }).notNull(),
  format: varchar("format", { length: 40 }).notNull(),
  investmentRange: varchar("investmentRange", { length: 60 }).notNull(),
  whyNow: text("whyNow").notNull(),
  consent: boolean("consent").default(false).notNull(),
  source: varchar("source", { length: 120 }),
  campaign: varchar("campaign", { length: 120 }),
  status: mysqlEnum("status", ["new", "reviewed", "invited", "archived"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MentoriaDiagnostico = typeof mentoriaDiagnostico.$inferSelect;
export type InsertMentoriaDiagnostico = typeof mentoriaDiagnostico.$inferInsert;

/**
 * Quiz "Diagnóstico de Maturidade em IA" — lead magnet B2B.
 * Guarda contato + pontuação por dimensão para qualificar palestras,
 * workshops e consultoria.
 */
export const aiMaturity = mysqlTable("ai_maturity", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  company: varchar("company", { length: 200 }).notNull(),
  role: varchar("role", { length: 160 }).notNull(),
  companySize: varchar("companySize", { length: 60 }).notNull(),
  scoreDados: int("scoreDados").notNull(),
  scoreTecnologia: int("scoreTecnologia").notNull(),
  scorePessoas: int("scorePessoas").notNull(),
  scoreProcessos: int("scoreProcessos").notNull(),
  scoreEstrategia: int("scoreEstrategia").notNull(),
  totalScore: int("totalScore").notNull(),
  level: varchar("level", { length: 40 }).notNull(),
  answers: text("answers"),
  consent: boolean("consent").default(false).notNull(),
  /** Canal de origem do lead (ex.: "linkedin", "palestra", "website"). */
  source: varchar("source", { length: 120 }),
  /** Campanha dentro do canal (ex.: "guia", "mediakit"), lida do parâmetro ?c= */
  campaign: varchar("campaign", { length: 120 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AiMaturity = typeof aiMaturity.$inferSelect;
export type InsertAiMaturity = typeof aiMaturity.$inferInsert;

/**
 * Candidaturas à Turma Fundadora da "Mentoria Trajetória em Dados & IA" —
 * mentoria de 4 semanas aberta a todos, com bolsas para mulheres.
 * As 12 perguntas de seleção vêm do plano da turma fundadora; a Giselle
 * analisa cada candidatura antes de convidar para a conversa individual.
 */
export const trajetoriaCandidatura = mysqlTable("trajetoria_candidatura", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 40 }).notNull(),
  linkedin: varchar("linkedin", { length: 320 }),
  areaAtual: varchar("areaAtual", { length: 120 }).notNull(),
  formacao: varchar("formacao", { length: 160 }).notNull(),
  porque: text("porque").notNull(),
  funcaoInteresse: varchar("funcaoInteresse", { length: 120 }).notNull(),
  jaEstudou: text("jaEstudou").notNull(),
  maiorDificuldade: text("maiorDificuldade").notNull(),
  horasSemana: varchar("horasSemana", { length: 40 }).notNull(),
  expectativa: text("expectativa").notNull(),
  disponibilidade: varchar("disponibilidade", { length: 60 }).notNull(),
  dispostoProjeto: boolean("dispostoProjeto").default(false).notNull(),
  porqueAgora: text("porqueAgora").notNull(),
  bolsa: boolean("bolsa").default(false).notNull(),
  bolsaContexto: text("bolsaContexto"),
  consent: boolean("consent").default(false).notNull(),
  source: varchar("source", { length: 120 }),
  campaign: varchar("campaign", { length: 120 }),
  status: mysqlEnum("status", ["new", "interview", "approved", "waitlist", "archived"])
    .default("new")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TrajetoriaCandidatura = typeof trajetoriaCandidatura.$inferSelect;
export type InsertTrajetoriaCandidatura = typeof trajetoriaCandidatura.$inferInsert;

/**
 * Rastreamento anônimo de acessos — responde "o QR da palestra X foi usado?".
 * Sem dado pessoal (LGPD): apenas caminho, origem (?src= do QR / host de
 * referência) e data. Deduplicado por sessão no cliente.
 * visitorId: número aleatório gerado no navegador que muda todo dia — conta
 * pessoas distintas no dia sem permitir seguir alguém entre dias.
 */
export const pageVisits = mysqlTable("page_visits", {
  id: int("id").autoincrement().primaryKey(),
  path: varchar("path", { length: 255 }).notNull(),
  visitorId: varchar("visitorId", { length: 36 }),
  source: varchar("source", { length: 120 }),
  campaign: varchar("campaign", { length: 120 }),
  referrer: varchar("referrer", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PageVisit = typeof pageVisits.$inferSelect;
export type InsertPageVisit = typeof pageVisits.$inferInsert;

/**
 * Pedidos de proposta de palestra/workshop/programa corporativo — briefing
 * estruturado com origem da conversa, em vez de WhatsApp genérico.
 */
export const palestraPedidos = mysqlTable("palestra_pedidos", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 40 }),
  empresa: varchar("empresa", { length: 200 }).notNull(),
  tipo: varchar("tipo", { length: 60 }).notNull(),
  evento: varchar("evento", { length: 200 }),
  dataDesejada: varchar("dataDesejada", { length: 60 }),
  publico: varchar("publico", { length: 200 }),
  mensagem: text("mensagem").notNull(),
  source: varchar("source", { length: 120 }),
  campaign: varchar("campaign", { length: 120 }),
  consent: boolean("consent").default(false).notNull(),
  status: mysqlEnum("status", ["new", "replied", "proposal", "closed", "archived"])
    .default("new")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PalestraPedido = typeof palestraPedidos.$inferSelect;
export type InsertPalestraPedido = typeof palestraPedidos.$inferInsert;

/**
 * Estudantes da Turma 01 vindos da Voomp — uma linha por pessoa × curso.
 * Alimentada pelo webhook (/api/voomp/webhook/:token): inscrição paga recebe
 * número de matrícula; quem parou no meio (checkout abandonado, Pix/boleto não
 * pago, cartão recusado) fica registrado com o mesmo cadastro. Consultada no
 * painel protegido /painel/estudantes.
 */
export const voompInscricoes = mysqlTable(
  "voomp_inscricoes",
  {
    id: int("id").autoincrement().primaryKey(),
    matricula: varchar("matricula", { length: 24 }),
    status: varchar("status", { length: 32 }).notNull(),
    statusVoomp: varchar("statusVoomp", { length: 64 }),
    productId: varchar("productId", { length: 32 }).notNull(),
    productName: varchar("productName", { length: 255 }),
    offerName: varchar("offerName", { length: 255 }),
    email: varchar("email", { length: 320 }).notNull(),
    name: varchar("name", { length: 200 }),
    phone: varchar("phone", { length: 40 }),
    // CPF/CNPJ cifrado (AES-256-GCM, prefixo "cpf1:") — ver server/cifraDocumento.ts
    document: varchar("document", { length: 128 }),
    zipcode: varchar("zipcode", { length: 16 }),
    city: varchar("city", { length: 120 }),
    uf: varchar("uf", { length: 4 }),
    saleId: varchar("saleId", { length: 64 }),
    method: varchar("method", { length: 40 }),
    installments: int("installments"),
    amountCents: int("amountCents"),
    coupon: varchar("coupon", { length: 80 }),
    refusedReason: varchar("refusedReason", { length: 255 }),
    utmSource: varchar("utmSource", { length: 120 }),
    utmCampaign: varchar("utmCampaign", { length: 160 }),
    utmContent: varchar("utmContent", { length: 160 }),
    eventsCount: int("eventsCount").default(0).notNull(),
    firstEventAt: timestamp("firstEventAt").defaultNow().notNull(),
    lastEventAt: timestamp("lastEventAt").defaultNow().notNull(),
    paidAt: timestamp("paidAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    pessoaCursoUnique: uniqueIndex("voomp_inscricoes_email_produto_unique").on(table.email, table.productId),
    matriculaUnique: uniqueIndex("voomp_inscricoes_matricula_unique").on(table.matricula),
    statusIdx: index("voomp_inscricoes_status_idx").on(table.status),
  }),
);

export type VoompInscricao = typeof voompInscricoes.$inferSelect;
export type InsertVoompInscricao = typeof voompInscricoes.$inferInsert;

/** Cada aviso recebido da Voomp, como chegou (auditoria e depuração do webhook). */
export const voompEventos = mysqlTable(
  "voomp_eventos",
  {
    id: int("id").autoincrement().primaryKey(),
    evento: varchar("evento", { length: 64 }),
    status: varchar("status", { length: 32 }).notNull(),
    statusVoomp: varchar("statusVoomp", { length: 64 }),
    saleId: varchar("saleId", { length: 64 }),
    productId: varchar("productId", { length: 32 }),
    email: varchar("email", { length: 320 }),
    inscricaoId: int("inscricaoId"),
    payload: text("payload").notNull(),
    receivedAt: timestamp("receivedAt").defaultNow().notNull(),
  },
  (table) => ({
    recebidoIdx: index("voomp_eventos_recebido_idx").on(table.receivedAt),
  }),
);

export type VoompEvento = typeof voompEventos.$inferSelect;
export type InsertVoompEvento = typeof voompEventos.$inferInsert;

/**
 * Vida acadêmica de quem se matriculou (uma linha por inscrição paga): RA da
 * Anhanguera, turma, progresso no curso, conclusão e cancelamento. Alimentada
 * pela importação do relatório de progresso e pelas edições no painel
 * /painel/estudantes. A situação (cursando, em risco, concluiu, não concluiu)
 * é calculada a partir daqui em shared/academico.ts.
 */
export const voompAcademico = mysqlTable(
  "voomp_academico",
  {
    id: int("id").autoincrement().primaryKey(),
    inscricaoId: int("inscricaoId").notNull(),
    ra: varchar("ra", { length: 40 }),
    turma: varchar("turma", { length: 24 }),
    progressoPct: int("progressoPct"),
    aulasConcluidas: int("aulasConcluidas"),
    aulasTotal: int("aulasTotal"),
    aprovado: boolean("aprovado"),
    ultimoAcessoAt: timestamp("ultimoAcessoAt"),
    ultimoAvancoAt: timestamp("ultimoAvancoAt"),
    concluidoAt: timestamp("concluidoAt"),
    canceladoAt: timestamp("canceladoAt"),
    motivoCancelamento: varchar("motivoCancelamento", { length: 255 }),
    observacoes: text("observacoes"),
    origem: varchar("origem", { length: 24 }),
    importadoAt: timestamp("importadoAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => ({
    inscricaoUnique: uniqueIndex("voomp_academico_inscricao_unique").on(table.inscricaoId),
    raIdx: index("voomp_academico_ra_idx").on(table.ra),
  }),
);

export type VoompAcademico = typeof voompAcademico.$inferSelect;
export type InsertVoompAcademico = typeof voompAcademico.$inferInsert;
