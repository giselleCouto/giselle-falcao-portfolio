import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  courseAccess,
  courseProgress,
  InsertCourseAccess,
  InsertCourseProgress,
  InsertLeadContact,
  InsertUser,
  leadContacts,
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
