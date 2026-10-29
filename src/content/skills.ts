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
      "Prompt engineering",
      "Agents",
      "Copilot Studio",
      "Power Automate",
      "n8n / Make",
      "AI-assisted development",
    ],
  },
  {
    id: "engineering",
    name: { en: "Engineering", pt: "Engenharia" },
    items: [
      "Python",
      "Cloudflare Workers / D1",
      "Regression testing",
      "Next.js / Vercel",
      "SQL",
      "ServiceNow App Engine Studio (learning)",
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
      "EU AI Act (conceptual)",
      "COBIT (conceptual)",
      "ITIL 4",
      "Web application security",
      "Prompt-injection defense",
    ],
  },
  {
    id: "operations",
    name: { en: "Operations & Leadership", pt: "Operações e liderança" },
    items: ["Incident management at scale", "Technical team leadership", "Documentation & training"],
  },
  {
    id: "communication",
    name: { en: "Communication", pt: "Comunicação" },
    items: ["Journalism background", "Bilingual technical writing (EN/PT)"],
  },
] satisfies SkillGroup[];
