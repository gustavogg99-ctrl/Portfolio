import type { Experience } from "./schema";

/**
 * Work experience, newest first.
 *
 * Rules (docs/SOURCES.md):
 * - Teledata: "co-led", never "led a team of 16" alone.
 * - MerkurIA: no numbers; none can be checked by a visitor.
 * - Only the employers listed here; no other engagement is named.
 * - Freelance: same entry as the resume (Gustavo, 09/11/2026); no client is named.
 * - Aoop (an NTT DATA company): hired on 16/11/2026, starts 01/12/2026 (Gustavo; ADR-047).
 *   Contract title "ServiceNow Technical Consultant - JR" (Gustavo, 25/11/2026; ADR-051), same in EN and PT.
 *   Nothing done there yet: AI work is described as planned, not as a track. Drop `upcoming` on 01/12.
 */
export const experience = [
  {
    id: "aoop",
    company: "Aoop",
    context: {
      en: "An NTT DATA company",
      pt: "Empresa do grupo NTT DATA",
    },
    roles: [
      {
        title: { en: "ServiceNow Technical Consultant - JR", pt: "ServiceNow Technical Consultant - JR" },
        start: "2026-12",
        end: null,
        upcoming: true,
      },
    ],
    highlights: [
      {
        en: "Hired after the Shark in ServiceNow bootcamp, where I built the scoped app \u201cMentorship Program\u201d (tables extending Task, an approval flow, a Record Producer).",
        pt: "Contratado após o bootcamp Shark in ServiceNow, em que construí a app escopada \u201cMentorship Program\u201d (tabelas estendendo Task, um flow de aprovação, um Record Producer).",
      },
      {
        en: "Planned: AI work on ServiceNow (Now Assist and agents). Full-time, remote.",
        pt: "Previsto: trabalho com IA no ServiceNow (Now Assist e agentes). Tempo integral, remoto.",
      },
    ],
    visible: true,
  },
  {
    id: "freelance",
    company: { en: "Freelance and independent projects", pt: "Freelancer e projetos próprios" },
    roles: [
      {
        title: { en: "Freelancer", pt: "Freelancer" },
        start: "2026-03",
        end: "2026-11",
      },
    ],
    highlights: [
      {
        en: "Technical documentation and executive presentations for municipal digital-maturity assessments.",
        pt: "Documentação técnica e apresentações executivas para diagnósticos de maturidade digital de municípios.",
      },
      {
        en: "Built and published the projects on this site and the site itself (Next.js/Vercel, with CI); earned the Microsoft AB-731 certification.",
        pt: "Construí e publiquei os projetos deste site e o próprio site (Next.js/Vercel, com CI); obtive a certificação Microsoft AB-731.",
      },
    ],
    visible: true,
  },
  {
    id: "teledata",
    company: "Teledata",
    context: {
      en: "IT service provider to Caixa Econômica Federal",
      pt: "Prestadora de serviços de TI para a Caixa Econômica Federal",
    },
    roles: [
      {
        title: { en: "IT Technical Supervisor", pt: "Supervisor Técnico de TI" },
        start: "2025-10",
        end: "2026-03",
      },
      {
        title: { en: "IT Technician", pt: "Técnico de TI" },
        start: "2024-10",
        end: "2025-10",
      },
    ],
    highlights: [
      {
        en: "Promoted from technician to supervisor of the same team after 11 months.",
        pt: "Promovido de técnico a supervisor da mesma equipe após 11 meses.",
      },
      {
        en: "Co-led, with another shift supervisor, a team of 16 technicians supporting mission-critical infrastructure across 13,000+ service points nationwide.",
        pt: "Co-liderei, com outro supervisor do turno, uma equipe de 16 técnicos em infraestrutura de missão crítica, cobrindo 13.000+ pontos de atendimento no país.",
      },
      {
        en: "Handled around 1,000 incidents per month, including escalation of critical incidents.",
        pt: "Gestão de cerca de 1.000 incidentes por mês, incluindo o escalonamento de incidentes críticos.",
      },
      {
        en: "Created AI-assisted workflows (Microsoft Copilot) for documentation, reporting and shift coordination; tracked incidents in Jira; trained new technicians on ITIL practices.",
        pt: "Criei fluxos assistidos por IA (Microsoft Copilot) para documentação, relatórios e coordenação de turnos; registrei incidentes no Jira; treinei novos técnicos em práticas ITIL.",
      },
    ],
    visible: true,
  },
  {
    id: "merkuria",
    company: "MerkurIA",
    context: {
      en: "AI implementation consultancy (early-stage startup)",
      pt: "Consultoria de implementação de IA (startup em estágio inicial)",
    },
    roles: [
      {
        title: { en: "Co-founder", pt: "Cofundador" },
        start: "2023-06",
        end: "2026-01",
      },
    ],
    highlights: [
      {
        en: "Built WhatsApp customer-service bots with Make and later n8n, OpenAI API and Supabase.",
        pt: "Construí bots de atendimento no WhatsApp com Make e depois n8n, API da OpenAI e Supabase.",
      },
    ],
    visible: true,
  },
] satisfies Experience[];
