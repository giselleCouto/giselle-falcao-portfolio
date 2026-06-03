import type { Express, Request, Response } from "express";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { listCourseLessonProgress } from "./db";
import { COURSE_SLUG, COURSE_TITLE } from "./coursePayments";
import { sdk } from "./_core/sdk";

export const COURSE_CERTIFICATE_PATH = "/api/course/certificate.pdf";
export const COURSE_LESSON_KEYS = [
  "modulo-0::lesson-0",
  "modulo-0::lesson-1",
  "modulo-0::lesson-2",
  "modulo-1::lesson-0",
  "modulo-1::lesson-1",
  "modulo-1::lesson-2",
  "modulo-2::lesson-0",
  "modulo-2::lesson-1",
  "modulo-2::lesson-2",
  "modulo-3::lesson-0",
  "modulo-3::lesson-1",
  "modulo-3::lesson-2",
  "modulo-4::lesson-0",
  "modulo-4::lesson-1",
  "modulo-4::lesson-2",
  "modulo-5::lesson-0",
  "modulo-5::lesson-1",
  "modulo-5::lesson-2",
  "modulo-6::lesson-0",
  "modulo-6::lesson-1",
  "modulo-6::lesson-2",
  "modulo-7::lesson-0",
  "modulo-7::lesson-1",
  "modulo-7::lesson-2",
  "modulo-8::lesson-0",
  "modulo-8::lesson-1",
  "modulo-8::lesson-2",
  "modulo-8::lesson-3",
] as const;

export const COURSE_LESSON_KEYS_BY_MODULE = COURSE_LESSON_KEYS.reduce<Record<string, string[]>>((accumulator, lessonKey) => {
  const moduleId = lessonKey.split("::")[0] ?? "";
  if (!accumulator[moduleId]) {
    accumulator[moduleId] = [];
  }
  accumulator[moduleId].push(lessonKey);
  return accumulator;
}, {});

export function hasCompletedModuleLessons(moduleId: string, progress: Array<{ lessonKey: string; completed: boolean }>) {
  const expectedLessons = COURSE_LESSON_KEYS_BY_MODULE[moduleId] ?? [];
  const completedLessons = new Set(progress.filter((entry) => entry.completed).map((entry) => entry.lessonKey));
  return expectedLessons.length > 0 && expectedLessons.every((lessonKey) => completedLessons.has(lessonKey));
}

export function hasCompletedCourseCertificate(progress: Array<{ lessonKey: string; completed: boolean }>) {
  return COURSE_LESSON_KEYS.every((lessonKey) => progress.some((entry) => entry.lessonKey === lessonKey && entry.completed));
}

function buildCertificateFileName(studentName: string) {
  return `certificado-${studentName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "aluno"}.pdf`;
}

export async function generateCourseCertificatePdf(input: {
  studentName: string;
  completionDate: Date;
}) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([842, 595]);
  const { width, height } = page.getSize();

  const serif = await pdf.embedFont(StandardFonts.TimesRomanBold);
  const sans = await pdf.embedFont(StandardFonts.Helvetica);
  const sansBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.03, 0.05, 0.1) });
  page.drawRectangle({ x: 28, y: 28, width: width - 56, height: height - 56, borderColor: rgb(0.38, 0.91, 0.95), borderWidth: 1.2 });
  page.drawRectangle({ x: 40, y: 40, width: width - 80, height: height - 80, borderColor: rgb(0.86, 0.33, 0.95), borderWidth: 0.6 });

  page.drawText("Couto Falcão", {
    x: 70,
    y: height - 80,
    size: 28,
    font: serif,
    color: rgb(0.98, 0.98, 0.99),
  });

  page.drawText("Certificado de conclusão", {
    x: 70,
    y: height - 145,
    size: 24,
    font: sansBold,
    color: rgb(0.38, 0.91, 0.95),
  });

  page.drawText("Certificamos que", {
    x: 70,
    y: height - 205,
    size: 16,
    font: sans,
    color: rgb(0.84, 0.87, 0.92),
  });

  const safeName = input.studentName.trim() || "Aluno(a)";
  page.drawText(safeName, {
    x: 70,
    y: height - 260,
    size: 30,
    font: serif,
    color: rgb(0.98, 0.98, 0.99),
  });

  const bodyLines = [
    "concluiu com êxito a trilha completa do curso",
    COURSE_TITLE,
    "incluindo fundamentos, módulos avançados, prática guiada e progresso registrado na plataforma.",
  ];

  page.drawText(bodyLines[0], {
    x: 70,
    y: height - 315,
    size: 16,
    font: sans,
    color: rgb(0.84, 0.87, 0.92),
  });

  page.drawText(bodyLines[1], {
    x: 70,
    y: height - 355,
    size: 20,
    font: sansBold,
    color: rgb(0.98, 0.98, 0.99),
  });

  page.drawText(bodyLines[2], {
    x: 70,
    y: height - 390,
    size: 15,
    font: sans,
    color: rgb(0.84, 0.87, 0.92),
  });

  const completionLabel = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(input.completionDate);

  page.drawText(`Conclusão registrada em ${completionLabel}.`, {
    x: 70,
    y: height - 455,
    size: 14,
    font: sans,
    color: rgb(0.84, 0.87, 0.92),
  });

  page.drawText("Giselle Couto Falcão", {
    x: 70,
    y: 110,
    size: 18,
    font: serif,
    color: rgb(0.98, 0.98, 0.99),
  });

  page.drawLine({
    start: { x: 70, y: 102 },
    end: { x: 280, y: 102 },
    thickness: 1,
    color: rgb(0.38, 0.91, 0.95),
  });

  page.drawText("Coordenação acadêmica e autoria da trilha", {
    x: 70,
    y: 84,
    size: 11,
    font: sans,
    color: rgb(0.72, 0.77, 0.83),
  });

  page.drawText(`Código de validação: ${COURSE_SLUG}-${input.completionDate.getTime()}`, {
    x: width - 310,
    y: 64,
    size: 10,
    font: sans,
    color: rgb(0.72, 0.77, 0.83),
  });

  return pdf.save();
}

export async function handleCourseCertificateRequest(req: Request, res: Response) {
  try {
    const user = await sdk.authenticateRequest(req);
    const progress = await listCourseLessonProgress(user.id, COURSE_SLUG);

    if (!hasCompletedCourseCertificate(progress)) {
      return res.status(403).json({
        error: "certificate_not_ready",
        message: "Conclua todas as aulas da trilha para liberar o certificado em PDF.",
      });
    }

    const completionDate = progress
      .filter((entry) => entry.completed)
      .map((entry) => new Date(entry.lastVisitedAt))
      .sort((a, b) => b.getTime() - a.getTime())[0] ?? new Date();

    const pdfBytes = await generateCourseCertificatePdf({
      studentName: user.name?.trim() || "Aluno(a)",
      completionDate,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${buildCertificateFileName(user.name?.trim() || "aluno")}"`);
    res.setHeader("Cache-Control", "private, no-store, max-age=0");
    return res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error("[CourseCertificate] Failed to generate certificate", error);
    return res.status(401).json({
      error: "unauthorized",
      message: "Faça login para acessar seu certificado.",
    });
  }
}

export function registerCourseCertificateRoute(app: Express) {
  app.get(COURSE_CERTIFICATE_PATH, handleCourseCertificateRequest);
}
