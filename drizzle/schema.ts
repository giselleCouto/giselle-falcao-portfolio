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
  organization: varchar("organization", { length: 200 }),
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
