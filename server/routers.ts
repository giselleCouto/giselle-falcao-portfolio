import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { notifyOwner } from "./_core/notification";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { createLeadContact, listLeadContacts } from "./db";

const leadInputSchema = z.object({
  route: z.string().trim().min(1).max(64),
  persona: z.string().trim().min(1).max(64),
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  organization: z.string().trim().max(200).optional().or(z.literal("")),
  interest: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(12).max(4000),
  source: z.string().trim().max(120).optional(),
});

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
        organization: input.organization?.trim() || null,
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
          `Organização: ${normalized.organization ?? "Não informada"}`,
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
});

export type AppRouter = typeof appRouter;
