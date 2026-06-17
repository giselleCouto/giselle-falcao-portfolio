import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { notifyOwner } from "./_core/notification";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  createLeadContact,
  getCourseAccessForUser,
  getUserById,
  listCourseLessonProgress,
  listCourseProgress,
  listLeadContacts,
  upsertCourseCheckout,
  upsertCourseLessonProgressRecord,
  upsertCourseProgressRecord,
} from "./db";
import {
  COURSE_PRICE_CENTS,
  COURSE_SLUG,
  COURSE_TITLE,
  FREE_MODULE_IDS,
  createCourseCheckoutSession,
  isFreeModule,
} from "./coursePayments";
import {
  COURSE_CERTIFICATE_PATH,
  hasCompletedCourseCertificate,
  hasCompletedModuleLessons,
} from "./courseCertificate";

const leadInputSchema = z
  .object({
    route: z.string().trim().min(1).max(64),
    persona: z.string().trim().min(1).max(64),
    name: z.string().trim().min(2).max(160),
    email: z.string().trim().email().max(320),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    organization: z.string().trim().max(200).optional().or(z.literal("")),
    businessArea: z.string().trim().max(160).optional().or(z.literal("")),
    interest: z.string().trim().max(120).optional().or(z.literal("")),
    message: z.string().trim().min(12).max(4000),
    source: z.string().trim().max(120).optional(),
  })
  .superRefine((input, ctx) => {
    const isMinasSummitLead = input.route === "/minas-summit" || input.source?.includes("minas-summit");

    if (!isMinasSummitLead) return;

    const phoneDigits = (input.phone ?? "").replace(/\D/g, "");

    if (!input.phone?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Telefone é obrigatório para contatos do Minas Summit.",
      });
    } else if (phoneDigits.length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Informe um telefone válido com DDD.",
      });
    }

    if (!input.businessArea?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["businessArea"],
        message: "Área de negócio é obrigatória para contatos do Minas Summit.",
      });
    }
  });

const progressInputSchema = z.object({
  moduleId: z.string().trim().min(1).max(64),
  lessonKey: z.string().trim().max(120).optional().or(z.literal("")),
  lessonTitle: z.string().trim().max(255).optional().or(z.literal("")),
  completed: z.boolean().optional(),
  practiceCompleted: z.boolean().optional(),
});

function resolveOrigin(req: {
  protocol?: string;
  headers: Record<string, unknown>;
}) {
  const originHeader = req.headers.origin;
  if (typeof originHeader === "string" && originHeader.length > 0) {
    return originHeader;
  }

  const hostHeader = req.headers.host;
  if (typeof hostHeader === "string" && hostHeader.length > 0) {
    return `${req.protocol ?? "https"}://${hostHeader}`;
  }

  throw new Error("Unable to determine request origin for checkout");
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  leads: router({
    submit: publicProcedure.input(leadInputSchema).mutation(async ({ input }) => {
      const normalized = {
        route: input.route,
        persona: input.persona,
        name: input.name,
        email: input.email,
        phone: input.phone?.trim() || null,
        organization: input.organization?.trim() || null,
        businessArea: input.businessArea?.trim() || null,
        interest: input.interest?.trim() || null,
        message: input.message,
        source: input.source?.trim() || "website",
      } as const;

      await createLeadContact(normalized);

      const notificationSent = await notifyOwner({
        title: `Novo lead recebido em ${normalized.route}`,
        content: [
          `Persona: ${normalized.persona}`,
          `Nome: ${normalized.name}`,
          `E-mail: ${normalized.email}`,
          `Telefone: ${normalized.phone ?? "Não informado"}`,
          `Organização: ${normalized.organization ?? "Não informada"}`,
          `Área de negócio: ${normalized.businessArea ?? "Não informada"}`,
          `Interesse: ${normalized.interest ?? "Não informado"}`,
          `Origem: ${normalized.source}`,
          `Mensagem: ${normalized.message}`,
        ].join("\n"),
      });

      return {
        success: true,
        notificationSent,
      } as const;
    }),
    list: adminProcedure.query(async () => {
      return listLeadContacts();
    }),
  }),
  course: router({
    status: publicProcedure.query(async ({ ctx }) => {
      const baseResponse = {
        courseSlug: COURSE_SLUG,
        courseTitle: COURSE_TITLE,
        priceCents: COURSE_PRICE_CENTS,
        freeModuleIds: [...FREE_MODULE_IDS],
        certificateUrl: COURSE_CERTIFICATE_PATH,
      };

      if (!ctx.user) {
        return {
          ...baseResponse,
          authenticated: false,
          hasPaidAccess: false,
          accessStatus: null,
          certificateEligible: false,
          progress: [],
        } as const;
      }

      const [access, progress, lessonProgress] = await Promise.all([
        getCourseAccessForUser(ctx.user.id, COURSE_SLUG),
        listCourseProgress(ctx.user.id, COURSE_SLUG),
        listCourseLessonProgress(ctx.user.id, COURSE_SLUG),
      ]);

      return {
        ...baseResponse,
        authenticated: true,
        hasPaidAccess: access?.status === "active",
        accessStatus: access?.status ?? null,
        certificateEligible: hasCompletedCourseCertificate(lessonProgress),
        progress,
      } as const;
    }),
    createCheckout: protectedProcedure.mutation(async ({ ctx }) => {
      const user = await getUserById(ctx.user.id);
      const origin = resolveOrigin(ctx.req as never);

      const session = await createCourseCheckoutSession({
        origin,
        user: {
          id: ctx.user.id,
          email: user?.email ?? ctx.user.email ?? null,
          name: user?.name ?? ctx.user.name ?? null,
          stripeCustomerId: user?.stripeCustomerId ?? null,
        },
      });

      await upsertCourseCheckout({
        userId: ctx.user.id,
        courseSlug: COURSE_SLUG,
        stripeCheckoutSessionId: session.id,
      });

      return {
        checkoutUrl: session.url,
      } as const;
    }),
    progress: protectedProcedure.input(progressInputSchema).mutation(async ({ ctx, input }) => {
      const access = await getCourseAccessForUser(ctx.user.id, COURSE_SLUG);
      const hasPaidAccess = access?.status === "active";

      if (!isFreeModule(input.moduleId) && !hasPaidAccess) {
        throw new Error("Purchase required to record progress in paid modules");
      }

      const normalizedLessonKey = input.lessonKey?.trim();
      const normalizedLessonTitle = input.lessonTitle?.trim() || null;

      if (normalizedLessonKey) {
        await upsertCourseLessonProgressRecord({
          userId: ctx.user.id,
          courseSlug: COURSE_SLUG,
          moduleId: input.moduleId,
          lessonKey: normalizedLessonKey,
          lessonTitle: normalizedLessonTitle,
          completed: input.completed ?? false,
        });
      }

      const updatedLessonProgress = await listCourseLessonProgress(ctx.user.id, COURSE_SLUG);
      const moduleCompleted = hasCompletedModuleLessons(input.moduleId, updatedLessonProgress);

      await upsertCourseProgressRecord({
        userId: ctx.user.id,
        courseSlug: COURSE_SLUG,
        moduleId: input.moduleId,
        lessonKey: normalizedLessonKey || null,
        lessonTitle: normalizedLessonTitle,
        completed: moduleCompleted,
        practiceCompleted: input.practiceCompleted ?? false,
      });

      return {
        success: true,
        certificateEligible: hasCompletedCourseCertificate(updatedLessonProgress),
        certificateUrl: COURSE_CERTIFICATE_PATH,
      } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
