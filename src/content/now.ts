import type { Now } from "./schema";

/**
 * "What I'm doing now" — the place for moving work, so the Projects section
 * stays limited to finished, verifiable work. Update `updated` on every edit.
 * ServiceNow is intentionally not here (it goes to certifications once issued).
 */
export const now = {
  updated: "2026-10",
  items: [
    {
      id: "microsoft-learn",
      text: {
        en: "Studying the Microsoft Learn track in AI, security and data.",
        pt: "Estudando a trilha Microsoft Learn em IA, segurança e dados.",
      },
      status: "in_progress",
      visible: true,
    },
    {
      id: "scrum",
      text: { en: "Preparing for the Scrum Master certification.", pt: "Me preparando para a certificação Scrum Master." },
      status: "in_progress",
      visible: true,
    },
    {
      id: "agent-v2",
      text: {
        en: "Planning v2 of the support-agent prototype: the LLM classifies, the current rules act as guardrails, and tests block regressions.",
        pt: "Planejando a v2 do protótipo de agente de suporte: o LLM classifica, as regras atuais viram guardrail e testes bloqueiam regressões.",
      },
      status: "planned",
      visible: true,
    },
    {
      id: "port-auto",
      text: {
        en: "Building an AI-assisted IT support automation in n8n.",
        pt: "Construindo uma automação de atendimento de TI com IA em n8n.",
      },
      status: "planned",
      // Hidden until work actually starts.
      visible: false,
    },
  ],
} satisfies Now;
