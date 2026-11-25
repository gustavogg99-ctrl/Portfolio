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
      // Hired on 16/11/2026 (Gustavo; ADR-047). Change again on 01/12/2026, when the job starts.
      text: {
        en: "Hired by Aoop (an NTT DATA company) as a Junior in ServiceNow, on an AI-specialized track. I start in December 2026.",
        pt: "Contratado pela Aoop (empresa do grupo NTT DATA) como Júnior em ServiceNow, numa trilha especializada em IA. Começo em dezembro de 2026.",
      },
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
      // Short version merged on 10/11/2026 (repository PRs #2 to #7); injection detection, masking
      // and the held-out set published on 24/11/2026 (repository PRs #28 and #29; Part 38).
      // Say "measured on synthetic tickets", never that it works in production (ADR-036).
      // The "Next" part is the repository ROADMAP "Next" list (the recorded demo, AGENT-V2-08).
      id: "project",
      kind: "project",
      visible: true,
      text: {
        en: "Building an IT ticket triage on top of my Support Agent prototype. It is measured on 30 synthetic tickets plus 10 held-out injection tickets: an LLM classifies and drafts a reply, the rules act as a guardrail (with prompt-injection detection and masking before the API call) and a person approves. Next: a recorded demo.",
        pt: "Construindo uma triagem de chamados de TI sobre o meu protótipo Support Agent. Está medida em 30 chamados sintéticos mais 10 chamados de injection separados: um LLM classifica e sugere a resposta, as regras funcionam como guardrail (com detecção de prompt injection e mascaramento antes da chamada à API) e uma pessoa aprova. Próximo: uma demo gravada.",
      },
      link: {
        href: "https://github.com/gustavogg99-ctrl/support-agent-governance-prototype",
        label: { en: "Repository", pt: "Repositório" },
      },
    },
  ],
} satisfies Now;
