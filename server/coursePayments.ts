import express, { type Express } from "express";
import Stripe from "stripe";
import { activateCourseAccess, updateUserStripeCustomerId } from "./db";
import { notifyOwner } from "./_core/notification";

export const COURSE_SLUG = "engenharia-sistemas-ia-generativa";
export const COURSE_TITLE = "Engenharia de Sistemas de IA Generativa";
export const COURSE_PRICE_CENTS = 49700;
export const COURSE_CURRENCY = "brl";
export const FREE_MODULE_IDS = ["modulo-0", "modulo-1"] as const;

let stripeClient: Stripe | null = null;

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Stripe secret key is not configured");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
}

export function isFreeModule(moduleId: string) {
  return FREE_MODULE_IDS.includes(moduleId as (typeof FREE_MODULE_IDS)[number]);
}

export async function createCourseCheckoutSession(input: {
  origin: string;
  user: {
    id: number;
    email: string | null;
    name: string | null;
    stripeCustomerId?: string | null;
  };
}) {
  const stripe = getStripeClient();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${input.origin}/giselle/cursos?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${input.origin}/giselle/cursos?checkout=cancelled`,
    customer: input.user.stripeCustomerId || undefined,
    customer_email: input.user.stripeCustomerId ? undefined : input.user.email ?? undefined,
    client_reference_id: input.user.id.toString(),
    allow_promotion_codes: true,
    payment_method_types: ["pix", "card"],
    locale: "pt-BR",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: COURSE_CURRENCY,
          product_data: {
            name: COURSE_TITLE,
            description:
              "Desbloqueio integral dos módulos avançados, práticas guiadas e ambiente visual do curso de RAG e LLMs.",
          },
          unit_amount: COURSE_PRICE_CENTS,
        },
      },
    ],
    metadata: {
      user_id: input.user.id.toString(),
      course_slug: COURSE_SLUG,
      customer_email: input.user.email ?? "",
      customer_name: input.user.name ?? "",
    },
    payment_intent_data: {
      metadata: {
        user_id: input.user.id.toString(),
        course_slug: COURSE_SLUG,
      },
    },
  });

  if (!session.url) {
    throw new Error("Stripe checkout session did not return a URL");
  }

  return session;
}

async function activateFromCheckoutSession(session: Stripe.Checkout.Session) {
  const userId = Number(session.metadata?.user_id || session.client_reference_id);
  const courseSlug = session.metadata?.course_slug || COURSE_SLUG;

  if (!userId || Number.isNaN(userId) || !courseSlug) {
    console.warn("[Stripe] Missing metadata for course activation", session.id);
    return;
  }

  await activateCourseAccess({
    userId,
    courseSlug,
    stripeCheckoutSessionId: session.id,
    stripePaymentIntentId:
      typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null,
  });

  if (typeof session.customer === "string") {
    await updateUserStripeCustomerId(userId, session.customer);
  }

  await notifyOwner({
    title: `Curso desbloqueado: ${COURSE_TITLE}`,
    content: [
      `Usuário ID: ${userId}`,
      `Curso: ${courseSlug}`,
      `Checkout: ${session.id}`,
      `Pagamento: ${typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? "n/d"}`,
      `Status do pagamento: ${session.payment_status}`,
    ].join("\n"),
  }).catch((error) => {
    console.warn("[Stripe] Failed to notify owner:", error);
  });
}

export function registerStripeWebhook(app: Express) {
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      const signature = req.headers["stripe-signature"];

      if (!webhookSecret || typeof signature !== "string") {
        res.status(400).send("Missing Stripe webhook configuration");
        return;
      }

      let event: Stripe.Event;

      try {
        event = getStripeClient().webhooks.constructEvent(req.body, signature, webhookSecret);
      } catch (error) {
        console.error("[Stripe] Webhook signature verification failed:", error);
        res.status(400).send("Webhook signature verification failed");
        return;
      }

      if (event.id.startsWith("evt_test_")) {
        console.log("[Webhook] Test event detected, returning verification response");
        res.json({ verified: true });
        return;
      }

      try {
        switch (event.type) {
          case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            if (session.payment_status === "paid") {
              await activateFromCheckoutSession(session);
            }
            break;
          }
          case "checkout.session.async_payment_succeeded": {
            const session = event.data.object as Stripe.Checkout.Session;
            await activateFromCheckoutSession(session);
            break;
          }
          default:
            break;
        }
      } catch (error) {
        console.error("[Stripe] Failed to process webhook event:", event.type, error);
        res.status(500).send("Webhook processing failed");
        return;
      }

      res.json({ received: true });
    },
  );
}
