import type { SkillGroup } from "./schema";

/**
 * Skills, grouped. No percentage bars or numeric levels (briefing §7).
 * "(conceptual)" marks frameworks known as frameworks, not certified.
 * `icons` adds a logo for tools only (ADR-050); standards, concepts and soft skills stay text.
 */
export const skills = [
  {
    id: "applied-ai",
    name: { en: "Applied AI", pt: "IA aplicada" },
    items: [
      { label: { en: "Claude (API and connectors)", pt: "Claude (API e conectores)" }, icons: ["claude"] },
      { label: { en: "OpenAI API", pt: "API da OpenAI" }, icons: ["openai"] },
      { label: "Microsoft Copilot", icons: ["copilot"] },
      { en: "Prompt engineering", pt: "Engenharia de prompt" },
      { en: "Agents", pt: "Agentes" },
      { en: "LLM evaluation (accuracy and cost)", pt: "Avaliação de LLMs (acurácia e custo)" },
      { label: "n8n", icons: ["n8n"] },
      { label: "Make", icons: ["make"] },
      { label: "Power Automate", icons: ["power-automate"] },
      { label: "Copilot Studio", icons: ["copilot-studio"] },
      { en: "AI-assisted development", pt: "Desenvolvimento assistido por IA" },
    ],
  },
  {
    id: "engineering",
    name: { en: "Engineering & tools", pt: "Engenharia e ferramentas" },
    items: [
      { label: "Python", icons: ["python"] },
      { en: "Regression testing", pt: "Testes de regressão" },
      { label: "CI", icons: ["github-actions"] },
      { label: "Supabase", icons: ["supabase"] },
      { label: { en: "WhatsApp API", pt: "API do WhatsApp" }, icons: ["whatsapp"] },
      { label: "Cloudflare Workers / D1", icons: ["cloudflare-workers"] },
      { label: "Next.js / Vercel", icons: ["nextjs", "vercel"] },
      { label: "Jira", icons: ["jira"] },
      { label: "Microsoft 365", icons: ["microsoft-365"] },
      {
        label: "ServiceNow (App Engine Studio, Flow Designer, Service Catalog, GlideAjax)",
        icons: ["servicenow"],
      },
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
