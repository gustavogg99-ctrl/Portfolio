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
      // Step 1 (tests for the current rules) is done: 20 unittest tests in CI, repository PR #1.
      // Never suggest the LLM triage already works: it is being built.
      id: "project",
      kind: "project",
      visible: true,
      text: {
        en: "Building an IT ticket triage on top of my Support Agent prototype: an LLM classifies and drafts a reply, the current rules act as guardrails, and a person approves before anything is sent.",
        pt: "Construindo uma triagem de chamados de TI sobre o meu protótipo Support Agent: um LLM classifica e sugere a resposta, as regras atuais funcionam como guardrail e uma pessoa aprova antes de qualquer envio.",
      },
      link: {
        href: "https://github.com/gustavogg99-ctrl/support-agent-governance-prototype",
        label: { en: "Repository", pt: "Repositório" },
      },
    },
  ],
} satisfies Now;
