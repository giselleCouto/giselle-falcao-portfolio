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
