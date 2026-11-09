import type { Profile } from "./schema";

/**
 * Who Gustavo is. Sources: docs/SOURCES.md. Do not add a number that a
 * visitor can't check (ADR-007).
 */
export const profile = {
  name: "Gustavo Rodrigues",
  title: {
    en: "AI Builder · AI Governance",
    pt: "AI Builder · Governança de IA",
  },
  // The fact that sets him apart, not a fourth version of the hero sentence (Part 10).
  tagline: {
    en: "Systems analysis + journalism",
    pt: "Análise de sistemas + jornalismo",
  },
  // Who it is for and how, instead of repeating the h1 (Part 10).
  headline: {
    en: "AI products and governance for teams that need to ship with evidence: tests, controls and documentation.",
    pt: "Produtos com IA e governança para equipes que precisam entregar com evidência: testes, controles e documentação.",
  },
  subtitle: {
    en: "Applied AI · Automation · AI Security & Governance · Brasília, Brazil",
    pt: "IA aplicada · Automação · Segurança e Governança de IA · Brasília, Brasil",
  },
  hero: {
    // EN needs "THAT IS" for the adjective to read correctly; PT already agrees ("IA SEGURA").
    // "\n" marks a forced line break (rendered as <br />).
    static: { en: "I BUILD AI\nTHAT IS", pt: "CONSTRUO IA" },
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
  // Formspree form "Portfolio" → gustavohfr2003@gmail.com. CAPTCHA off (AJAX), Formshield on.
  contactForm: "https://formspree.io/f/mvkkyvdv",
  links: {
    linkedin: "https://www.linkedin.com/in/gustavo99rodrigues",
    github: "https://github.com/gustavogg99-ctrl",
    blog: "https://ggblog99.wordpress.com",
    source: "https://github.com/gustavogg99-ctrl/Portfolio",
  },
  // Hidden until the final resume PDF is ready (it will live in /public).
  // Site versions without the phone number (SOURCES.md, ADR-032).
  resumeUrl: {
    en: "/resume/Gustavo_Rodrigues_Resume.pdf",
    pt: "/resume/Gustavo_Rodrigues_Curriculo.pdf",
  },
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
      evidence: "Teledata/CAIXA, briefing §4 and audit summary.",
    },
    {
      value: { en: "~1,000", pt: "~1.000" },
      label: { en: "incidents handled per month", pt: "incidentes tratados por mês" },
      evidence: "Teledata/CAIXA, briefing §4.",
    },
    // The Mozilla Observatory "A+" counter was removed (ADR-024): a header
    // configuration check reads as beginner-level when shown as a headline number.
  ],
} satisfies Profile;
