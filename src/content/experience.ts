import type { Experience } from "./schema";

/**
 * Work experience, newest first.
 *
 * Rules (docs/SOURCES.md):
 * - Teledata: "co-led", never "led a team of 16" alone.
 * - MerkurIA: no numbers; none can be checked by a visitor.
 * - Only the employers listed here; no other engagement is named.
 * - Freelance: same entry as the resume (Gustavo, 09/11/2026); no client is named.
 */
export const experience = [
  {
    id: "freelance",
    company: { en: "Freelance and independent projects", pt: "Freelancer e projetos próprios" },
    roles: [
      {
        title: { en: "Freelancer", pt: "Freelancer" },
        start: "2026-03",
        end: null,
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
        en: "Created AI-assisted workflows for documentation, reporting and shift coordination.",
        pt: "Criei fluxos assistidos por IA para documentação, relatórios e coordenação de turnos.",
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
        en: "Led project management and the security and governance of client projects.",
        pt: "Liderei a gestão de projetos e a segurança e governança dos projetos de clientes.",
      },
      {
        en: "Built AI automations and assistants for clients, including an AI customer-service bot.",
        pt: "Construí automações e assistentes com IA para clientes, incluindo um bot de atendimento com IA.",
      },
      {
        en: "Ran AI risk and feasibility assessments with attention to LGPD, and trained the internal team.",
        pt: "Conduzi avaliações de risco e viabilidade de IA com atenção à LGPD e treinei a equipe interna.",
      },
    ],
    visible: true,
  },
] satisfies Experience[];
