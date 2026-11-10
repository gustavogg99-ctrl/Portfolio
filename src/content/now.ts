import type { Now } from "./schema";

/**
 * "What I'm doing now": three fixed lines (ADR-031), rendered under About.
 * - work: current work status;
 * - study: what I'm studying (the matching certifications are also shown as
 *   "In progress" under Certifications);
 * - project: the project I'm building, linked to its public repository.
 * Only real, current facts (Gustavo, 09/11/2026). Update `updated` on every edit.
 */
export const now = {
  updated: "2026-11",
  items: [
    {
      id: "work",
      kind: "work",
      visible: true,
      text: {
        en: "Available for work now.",
        pt: "Disponível para trabalho agora.",
      },
      link: { href: "#contact", label: { en: "Get in touch", pt: "Fale comigo" } },
    },
    {
      id: "study",
      kind: "study",
      visible: true,
      text: {
        en: "Studying for Microsoft SC-900 (Security, Compliance, and Identity Fundamentals) and for Scrum Master.",
        pt: "Estudando para a SC-900 da Microsoft (Security, Compliance, and Identity Fundamentals) e para Scrum Master.",
      },
    },
    {
      // Notion AGENT-V2 ("Support Agent v2: IT ticket triage with LLM and guardrails").
      // Short version merged on 10/11/2026 (repository PRs #2 to #7): LLM classifier, rules as
      // guardrail, human approval, evaluation of 2 prompts x 2 models on 30 synthetic tickets.
      // Say "measured on 30 synthetic tickets", never that it works in production (ADR-036).
      // The "Next" part is the repository ROADMAP "Later" list (AGENT-V2-05 and -06).
      id: "project",
      kind: "project",
      visible: true,
      text: {
        en: "Building an IT ticket triage on top of my Support Agent prototype. The first version is done and measured on 30 synthetic tickets: an LLM classifies and drafts a reply, the rules act as a guardrail and a person approves. Next: prompt-injection defence and masking before the API call.",
        pt: "Construindo uma triagem de chamados de TI sobre o meu protótipo Support Agent. A primeira versão está pronta e medida em 30 chamados sintéticos: um LLM classifica e sugere a resposta, as regras funcionam como guardrail e uma pessoa aprova. Próximo: defesa contra prompt injection e mascaramento antes da chamada à API.",
      },
      link: {
        href: "https://github.com/gustavogg99-ctrl/support-agent-governance-prototype",
        label: { en: "Repository", pt: "Repositório" },
      },
    },
  ],
} satisfies Now;
