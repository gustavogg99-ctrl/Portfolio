import type { SkillGroup } from "./schema";

/**
 * Skills, grouped. No percentage bars or numeric levels (briefing §7).
 * "(conceptual)" marks frameworks known as frameworks, not certified.
 */
export const skills = [
  {
    id: "applied-ai",
    name: { en: "Applied AI", pt: "IA aplicada" },
    items: [
      "LLMs (Claude)",
      { en: "Prompt engineering", pt: "Engenharia de prompt" },
      { en: "Agents", pt: "Agentes" },
      "Copilot Studio",
      "Power Automate",
      "n8n / Make",
      { en: "AI-assisted development", pt: "Desenvolvimento assistido por IA" },
    ],
  },
  {
    id: "engineering",
    name: { en: "Engineering", pt: "Engenharia" },
    items: [
      "Python",
      "Cloudflare Workers / D1",
      { en: "Regression testing", pt: "Testes de regressão" },
      "Next.js / Vercel",
      "SQL",
      { en: "ServiceNow App Engine Studio (learning)", pt: "ServiceNow App Engine Studio (aprendendo)" },
    ],
  },
  {
    id: "security-governance",
    name: { en: "Security & Governance", pt: "Segurança e governança" },
    items: [
      "ISO/IEC 27001",
      "LGPD",
      "ISO/IEC 42001",
      "NIST AI RMF",
      { en: "EU AI Act (conceptual)", pt: "EU AI Act (conceitual)" },
      { en: "COBIT (conceptual)", pt: "COBIT (conceitual)" },
      "ITIL 4",
      { en: "Web application security", pt: "Segurança de aplicações web" },
      { en: "Prompt-injection defense", pt: "Defesa contra prompt injection" },
    ],
  },
  {
    id: "operations",
    name: { en: "Operations & Leadership", pt: "Operações e liderança" },
    items: [
      { en: "Incident management at scale", pt: "Gestão de incidentes em escala" },
      { en: "Technical team leadership", pt: "Liderança de equipe técnica" },
      { en: "Documentation & training", pt: "Documentação e treinamento" },
    ],
  },
  {
    id: "communication",
    name: { en: "Communication", pt: "Comunicação" },
    items: [
      { en: "Journalism background", pt: "Formação em Jornalismo" },
      { en: "Bilingual technical writing (EN/PT)", pt: "Escrita técnica bilíngue (PT/EN)" },
    ],
  },
] satisfies SkillGroup[];
