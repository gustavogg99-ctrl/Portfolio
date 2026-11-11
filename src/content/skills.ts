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
      { en: "Claude (API and connectors)", pt: "Claude (API e conectores)" },
      { en: "OpenAI API", pt: "API da OpenAI" },
      "Microsoft Copilot",
      { en: "Prompt engineering", pt: "Engenharia de prompt" },
      { en: "Agents", pt: "Agentes" },
      { en: "LLM evaluation (accuracy and cost)", pt: "Avaliação de LLMs (acurácia e custo)" },
      "n8n",
      "Make",
      "Power Automate",
      "Copilot Studio",
      { en: "AI-assisted development", pt: "Desenvolvimento assistido por IA" },
    ],
  },
  {
    id: "engineering",
    name: { en: "Engineering & tools", pt: "Engenharia e ferramentas" },
    items: [
      "Python",
      { en: "Regression testing", pt: "Testes de regressão" },
      "CI",
      "Supabase",
      { en: "WhatsApp API", pt: "API do WhatsApp" },
      "Cloudflare Workers / D1",
      "Next.js / Vercel",
      "SQL",
      "Jira",
      "Microsoft 365",
      { en: "ServiceNow (learning)", pt: "ServiceNow (em aprendizado)" },
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
