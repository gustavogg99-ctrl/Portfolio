import type { Profile } from "./schema";

/**
 * Who Gustavo is. Source of truth: the portfolio briefing + the 29/10/2026
 * claims audit (docs/SOURCES.md). Do not add numbers that are not on the
 * "verifiable" list there.
 */
export const profile = {
  name: "Gustavo Rodrigues",
  title: {
    en: "AI Builder · AI Governance",
    pt: "AI Builder · Governança de IA",
  },
  // Same tone as the LinkedIn headline ("Building with AI, safely").
  tagline: {
    en: "Building with AI, safely.",
    pt: "Construindo com IA, com segurança.",
  },
  headline: {
    en: "I build AI-powered products that are secure, tested and auditable.",
    pt: "Construo produtos com IA que são seguros, testados e auditáveis.",
  },
  subtitle: {
    en: "Applied AI · Automation · AI Security & Governance · Brasília, Brazil",
    pt: "IA aplicada · Automação · Segurança e Governança de IA · Brasília, Brasil",
  },
  hero: {
    static: { en: "I BUILD AI", pt: "CONSTRUO IA" },
    // Each word must be backed by a project on the site:
    // secure → Autoria em Forma security headers; tested → its regression suite;
    // auditable → audit logs in Autoria em Forma and the support-agent prototype.
    rotating: [
      { en: "SECURE", pt: "SEGURA" },
      { en: "TESTED", pt: "TESTADA" },
      { en: "AUDITABLE", pt: "AUDITÁVEL" },
    ],
  },
  location: { en: "Brasília, Brazil", pt: "Brasília/DF, Brasil" },
  openTo: {
    en: "São Paulo, remote or international relocation",
    pt: "São Paulo, remoto ou relocação internacional",
  },
  about: [
    {
      en: "I build with AI and I care about what happens after the demo: tests that block bad output, security controls, logs someone can audit, and clear limits on what the system is allowed to do.",
      pt: "Construo com IA e me importo com o que acontece depois da demo: testes que bloqueiam saídas ruins, controles de segurança, logs que alguém consegue auditar e limites claros para o que o sistema pode fazer.",
    },
    {
      en: "My pattern: the LLM decides what needs to change, deterministic code applies the change, and automated tests decide whether the delivery ships. Governance (ISO/IEC 27001, LGPD, ISO/IEC 42001) is how I make that trustworthy.",
      pt: "Meu padrão: o LLM decide o que precisa mudar, código determinístico aplica a mudança e testes automáticos decidem se a entrega sai. Governança (ISO/IEC 27001, LGPD, ISO/IEC 42001) é como torno isso confiável.",
    },
    {
      en: "I want to help companies adopt AI in a way that is useful and safe, starting by building, testing and understanding each system from the inside.",
      pt: "Quero ajudar empresas a adotar IA de forma útil e segura, começando por construir, testar e entender cada sistema por dentro.",
    },
  ],
  email: "gustavohfr2003@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/gustavo99rodrigues",
    github: "https://github.com/gustavogg99-ctrl",
    blog: "https://ggblog99.wordpress.com",
    source: "https://github.com/gustavogg99-ctrl/Portfolio",
  },
  // Hidden until the final resume PDF is ready (it will live in /public).
  resumeUrl: null,
  languages: [
    { name: { en: "Portuguese", pt: "Português" }, level: { en: "native", pt: "nativo" } },
    { name: { en: "English", pt: "Inglês" }, level: { en: "advanced", pt: "avançado" } },
    { name: { en: "Spanish", pt: "Espanhol" }, level: { en: "intermediate", pt: "intermediário" } },
  ],
  stats: [
    {
      value: { en: "13,000+", pt: "13.000+" },
      label: {
        en: "service points covered by the infrastructure team I co-led",
        pt: "pontos de atendimento cobertos pela equipe de infraestrutura que co-liderei",
      },
      evidence: "Teledata/CAIXA — briefing §4 and audit summary.",
    },
    {
      value: { en: "~1,000", pt: "~1.000" },
      label: { en: "incidents handled per month", pt: "incidentes tratados por mês" },
      evidence: "Teledata/CAIXA — briefing §4.",
    },
    {
      value: { en: "A+", pt: "A+" },
      label: {
        en: "Mozilla Observatory score on Autoria em Forma (from C)",
        pt: "nota no Mozilla Observatory do Autoria em Forma (antes C)",
      },
      evidence: "Autoria em Forma audit (C 50/100 → A+ 125/100). Re-check on the live site before launch.",
    },
  ],
} satisfies Profile;
