import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { notifyOwner } from "./_core/notification";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  createCourseInterest,
  createLeadContact,
  createMentoriaDiagnostico,
  listMentoriaDiagnostico,
  getCourseAccessForUser,
  getUserById,
  listAcademyStudents,
  listCourseInterest,
  listCourseLessonProgress,
  listCourseProgress,
  listLeadContacts,
  upsertAcademyStudent,
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

const studentInputSchema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  whatsapp: z.string().trim().max(40).optional().or(z.literal("")),
  role: z.string().trim().max(160).optional().or(z.literal("")),
  organization: z.string().trim().max(200).optional().or(z.literal("")),
  courseSlug: z.string().trim().max(120).optional().or(z.literal("")),
  interestWorkshop: z.boolean().optional(),
  interestTalks: z.boolean().optional(),
  interestConsulting: z.boolean().optional(),
  goals: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.boolean().refine((value) => value === true, {
    message: "É preciso aceitar a política de contato para criar o perfil.",
  }),
});

const UF_REGIONS: Record<string, string> = {
  AC: "Norte", AM: "Norte", AP: "Norte", PA: "Norte", RO: "Norte", RR: "Norte", TO: "Norte",
  AL: "Nordeste", BA: "Nordeste", CE: "Nordeste", MA: "Nordeste", PB: "Nordeste",
  PE: "Nordeste", PI: "Nordeste", RN: "Nordeste", SE: "Nordeste",
  DF: "Centro-Oeste", GO: "Centro-Oeste", MS: "Centro-Oeste", MT: "Centro-Oeste",
  ES: "Sudeste", MG: "Sudeste", RJ: "Sudeste", SP: "Sudeste",
  PR: "Sul", RS: "Sul", SC: "Sul",
};

const interestInputSchema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  whatsapp: z.string().trim().max(40).optional().or(z.literal("")),
  state: z
    .string()
    .trim()
    .toUpperCase()
    .refine((uf) => uf in UF_REGIONS, { message: "Selecione um estado válido." }),
  gender: z.string().trim().min(1).max(40),
  race: z.string().trim().min(1).max(40),
  education: z.string().trim().min(1).max(60),
  techExperience: z.string().trim().min(1).max(40),
  dataExperience: z.string().trim().min(1).max(40),
  codeExperience: z.string().trim().min(1).max(40),
  coursesInterest: z.array(z.string().trim().max(80)).max(10).optional(),
  goals: z.string().trim().max(2000).optional().or(z.literal("")),
  source: z.string().trim().max(120).optional().or(z.literal("")),
  consent: z.boolean().refine((value) => value === true, {
    message: "É preciso aceitar a política de contato para enviar.",
  }),
});

const mentoriaInputSchema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  whatsapp: z.string().trim().min(8).max(40),
  city: z.string().trim().min(2).max(120),
  state: z
    .string()
    .trim()
    .toUpperCase()
    .refine((uf) => uf in UF_REGIONS, { message: "Selecione um estado válido." }),
  ageRange: z.string().trim().max(40).optional().or(z.literal("")),
  education: z.string().trim().min(1).max(60),
  currentSituation: z.string().trim().min(1).max(80),
  worksWithTech: z.string().trim().min(1).max(40),
  areaInterest: z.string().trim().min(1).max(80),
  mainDifficulty: z.string().trim().min(5).max(2000),
  goal: z.string().trim().min(5).max(2000),
  hoursPerWeek: z.string().trim().min(1).max(40),
  format: z.string().trim().min(1).max(40),
  investmentRange: z.string().trim().min(1).max(60),
  whyNow: z.string().trim().min(5).max(2000),
  consent: z.boolean().refine((value) => value === true, {
    message: "É preciso autorizar o contato para enviar o diagnóstico.",
  }),
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
  academy: router({
    register: publicProcedure.input(studentInputSchema).mutation(async ({ input }) => {
      const normalized = {
        name: input.name,
        email: input.email.toLowerCase(),
        whatsapp: input.whatsapp?.trim() || null,
        role: input.role?.trim() || null,
        organization: input.organization?.trim() || null,
        courseSlug: input.courseSlug?.trim() || null,
        interestWorkshop: input.interestWorkshop ?? false,
        interestTalks: input.interestTalks ?? false,
        interestConsulting: input.interestConsulting ?? false,
        goals: input.goals?.trim() || null,
        consent: input.consent,
        source: "academy",
      } as const;

      await upsertAcademyStudent(normalized);

      // Notificação é melhor-esforço: sem credenciais do serviço (ex.: Railway),
      // o cadastro do aluno não pode falhar por causa dela.
      let notificationSent = false;
      try {
        const interesses = [
          normalized.interestWorkshop ? "Workshop de Dados & IA" : null,
          normalized.interestTalks ? "Palestras" : null,
          normalized.interestConsulting ? "Consultoria/Soluções" : null,
        ].filter(Boolean);
        notificationSent = await notifyOwner({
          title: `Novo aluno na Academy: ${normalized.name}`,
          content: [
            `E-mail: ${normalized.email}`,
            `WhatsApp: ${normalized.whatsapp ?? "Não informado"}`,
            `Cargo/área: ${normalized.role ?? "Não informado"}`,
            `Organização: ${normalized.organization ?? "Não informada"}`,
            `Curso: ${normalized.courseSlug ?? "Não informado"}`,
            `Interesses: ${interesses.length ? interesses.join(", ") : "Nenhum assinalado"}`,
            `Objetivos: ${normalized.goals ?? "Não informados"}`,
          ].join("\n"),
        });
      } catch {
        notificationSent = false;
      }

      return { success: true, notificationSent } as const;
    }),
    students: adminProcedure.query(async () => {
      return listAcademyStudents();
    }),
    interest: publicProcedure.input(interestInputSchema).mutation(async ({ input }) => {
      await createCourseInterest({
        name: input.name,
        email: input.email.toLowerCase(),
        whatsapp: input.whatsapp?.trim() || null,
        state: input.state,
        region: UF_REGIONS[input.state],
        gender: input.gender,
        race: input.race,
        education: input.education,
        techExperience: input.techExperience,
        dataExperience: input.dataExperience,
        codeExperience: input.codeExperience,
        coursesInterest: input.coursesInterest?.length ? input.coursesInterest.join(", ") : null,
        goals: input.goals?.trim() || null,
        consent: input.consent,
        source: input.source?.trim() || "interesse",
      });

      return { success: true } as const;
    }),
    interests: adminProcedure.query(async () => {
      return listCourseInterest();
    }),
    mentoria: publicProcedure.input(mentoriaInputSchema).mutation(async ({ input }) => {
      await createMentoriaDiagnostico({
        name: input.name,
        email: input.email.toLowerCase(),
        whatsapp: input.whatsapp,
        city: input.city,
        state: input.state,
        ageRange: input.ageRange?.trim() || null,
        education: input.education,
        currentSituation: input.currentSituation,
        worksWithTech: input.worksWithTech,
        areaInterest: input.areaInterest,
        mainDifficulty: input.mainDifficulty,
        goal: input.goal,
        hoursPerWeek: input.hoursPerWeek,
        format: input.format,
        investmentRange: input.investmentRange,
        whyNow: input.whyNow,
        consent: input.consent,
      });

      return { success: true } as const;
    }),
    mentorias: adminProcedure.query(async () => {
      return listMentoriaDiagnostico();
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
