import type { Education } from "./schema";

/** Expected graduation July 2027 for both. No start dates (by request). */
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
] satisfies Education[];
