import type { Education } from "./schema";

/**
 * Degrees: expected graduation July 2027 for both. No start dates (by request).
 * Courses without an external exam (e.g. language school) live here, not in
 * certifications: a certificate of completion is not a certification (ADR-018).
 */
export const education = [
  {
    id: "ads",
    course: { en: "Systems Analysis and Development", pt: "Análise e Desenvolvimento de Sistemas" },
    institution: "FACINT",
    degree: { en: "Associate degree (Tecnólogo)", pt: "Tecnólogo" },
    expectedEnd: "2027-07",
    visible: true,
  },
  {
    id: "journalism",
    course: { en: "Journalism", pt: "Comunicação Social – Jornalismo" },
    institution: "IESB",
    degree: { en: "Bachelor's degree", pt: "Bacharelado" },
    expectedEnd: "2027-07",
    visible: true,
  },
  {
    // Certificate of completion seen 09/11/2026: "Bootcamp Shark in ServiceNow 14ª Edição", online, 15 h,
    // dated 2026-10-30, issued by Shark Academy (Aoop). No exam, no verification link: a course, not a
    // certification (ADR-018, ADR-029). The certificate image is never published (full legal name, signature).
    // "App Engine Studio" is not on the certificate, so it is not in the name.
    id: "servicenow-shark",
    course: { en: "Shark in ServiceNow bootcamp, 14th edition (15 h)", pt: "Bootcamp Shark in ServiceNow, 14ª edição (15 h)" },
    institution: "Shark Academy (Aoop)",
    degree: { en: "Online training", pt: "Treinamento on-line" },
    completed: "2026-10",
    visible: true,
  },
  {
    // Certificate of completion seen 05/11/2026: "Curso CLASSIC EXPERT de inglês", completed 2021-12-09.
    // Sent by email, no verification link. Shown as a course, never as a certification.
    // The course name is not displayed: "expert" is banned by the claims guard (docs/SOURCES.md).
    id: "english-ctj",
    course: { en: "English", pt: "Inglês" },
    institution: "Casa Thomas Jefferson",
    degree: { en: "Language course", pt: "Curso de idioma" },
    completed: "2021-12",
    visible: true,
  },
] satisfies Education[];
