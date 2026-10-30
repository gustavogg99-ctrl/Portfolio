import type { Project } from "./schema";

/**
 * Projects, in display order.
 *
 * Rules (docs/SOURCES.md):
 * - Only things that exist and can be checked. No idea/deck-only projects.
 * - Every project lists its limitations.
 * - Autoria em Forma: launched Oct/2026, paused after a demand test without
 *   organic traction; 1 complete job delivered. No clients, sales or revenue.
 *   Never link /painel. No real TCC content anywhere (see SOURCES.md).
 * - Support agent: rule-based prototype. No LLM, no automated tests yet.
 */
export const projects = [
  {
    slug: "autoria-em-forma",
    name: "Autoria em Forma",
    featured: true,
    status: "paused",
    statusNote: {
      en: "Launched Oct 2026 · paused after a demand test without organic traction · 1 complete job delivered",
      pt: "Lançado em out/2026 · pausado após teste de demanda sem tração orgânica · 1 trabalho completo entregue",
    },
    summary: {
      en: "ABNT formatting and text revision service for undergraduate theses, with an AI pipeline whose deliveries are gated by automated checks.",
      pt: "Serviço de formatação ABNT e revisão textual de TCC, com um pipeline de IA em que as entregas passam por verificações automáticas.",
    },
    scope: {
      en: "Formatting and revision only — requests to write content are refused. Every delivery ships with tracked changes and comments, so the text provably remains the author's.",
      pt: "Só formatação e revisão — pedidos de escrita de conteúdo são recusados. Toda entrega vai com controle de alterações e comentários, para provar que o texto continua do autor.",
    },
    problem: {
      en: "ABNT rules differ from one institution to another, and generic AI tools rewrite the student's text — which puts authorship at risk.",
      pt: "As regras ABNT mudam de uma instituição para outra, e ferramentas genéricas de IA reescrevem o texto do aluno — o que coloca a autoria em risco.",
    },
    built: {
      en: "A Python + Claude pipeline that runs outside the website, in an isolated environment: the LLM interprets the course manual and points out corrections, deterministic code applies the formatting to the .docx XML, and automated checks block the delivery if anything fails. Output: a clean version, a tracked-changes version and a PDF. The public site is a static page on Cloudflare Workers with first-party analytics (Worker + D1), no login and no upload.",
      pt: "Um pipeline em Python + Claude que roda fora do site, em ambiente isolado: o LLM interpreta o manual do curso e aponta correções, código determinístico aplica a formatação no XML do .docx e verificações automáticas bloqueiam a entrega se algo falhar. Saem uma versão limpa, uma versão com controle de alterações e um PDF. O site público é uma página estática em Cloudflare Workers com analytics próprio (Worker + D1), sem login e sem upload.",
    },
    stack: ["Python", "Claude", "Cloudflare Workers", "Cloudflare D1", "OOXML (.docx)"],
    highlights: [
      {
        en: "Regression suite with 20 tests on fictional documents generated at every run (20/20 passing).",
        pt: "Suíte de regressão com 20 testes sobre documentos fictícios gerados a cada execução (20/20 passando).",
      },
      {
        en: "4 automated checks that block a delivery if they fail (pagination, quotation integrity, clean version, tracked-changes version), plus 1 triage check reviewed by hand (quotation × reference cross-check).",
        pt: "4 verificações automáticas que bloqueiam a entrega se falharem (paginação, integridade das citações, versão limpa, versão marcada), mais 1 de triagem conferida à mão (cruzamento citação × referência).",
      },
      {
        en: "14 real errors documented with root cause and turned into permanent rules; 4 of them also have automated tests, the rest are in the manual checklist.",
        pt: "14 erros reais documentados com causa e convertidos em regras permanentes; 4 deles também têm teste automático, os demais estão no checklist manual.",
      },
      {
        en: "Manual QA checklist with 111 items in 12 stages; 10 formatting manuals from 8 institutions in the Federal District mapped.",
        pt: "Checklist de QA manual com 111 itens em 12 etapas; 10 manuais de formatação de 8 instituições do DF mapeados.",
      },
      {
        en: "Mozilla HTTP Observatory: from C (50/100) to A+ (125/100).",
        pt: "Mozilla HTTP Observatory: de C (50/100) para A+ (125/100).",
      },
      {
        en: "R$0/month infrastructure (Cloudflare free tier; the AI subscription is not included).",
        pt: "R$ 0 por mês de infraestrutura (plano gratuito da Cloudflare; a assinatura de IA não está incluída).",
      },
    ],
    guardrails: [
      {
        en: "Thesis text is treated as data, never as instructions (prompt-injection defense).",
        pt: "O texto do TCC é tratado como dado, nunca como instrução (defesa contra prompt injection).",
      },
      {
        en: "Rejects .docx files with macros; protected against XXE and zip bombs.",
        pt: "Recusa .docx com macro; proteção contra XXE e zip bomb.",
      },
      {
        en: "CSP with script hashes, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP.",
        pt: "CSP com hash dos scripts, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP.",
      },
      {
        en: "Constant-time comparison, password stored as a hash in a Cloudflare Secret, rate limiting.",
        pt: "Comparação em tempo constante, senha como hash em Secret da Cloudflare, rate limit.",
      },
      {
        en: "LGPD: minimal data, IP not stored, 400-day retention, isolated processing and deletion of copies.",
        pt: "LGPD: dados mínimos, IP não gravado, retenção de 400 dias, processamento isolado e exclusão das cópias.",
      },
    ],
    limitations: [
      {
        en: "Not end-to-end automatic: checks are automated, but applying the formatting is still adjusted per document, with human review.",
        pt: "Não é automático de ponta a ponta: as verificações são automáticas, mas a aplicação da formatação ainda é ajustada por documento, com revisão humana.",
      },
      {
        en: "Processing time per document has not been measured.",
        pt: "O tempo de processamento por documento não foi medido.",
      },
    ],
    links: {
      live: "https://site.autoriaemforma.workers.dev",
      repoPrivate: true,
    },
    builtWith: {
      en: "Developed with the help of Claude.",
      pt: "Desenvolvido com apoio do Claude.",
    },
    page: {
      architecture: {
        main: [
          {
            kind: "io",
            title: { en: "Student sends the .docx", pt: "Aluno envia o .docx" },
            detail: { en: "Via WhatsApp — the website has no upload.", pt: "Pelo WhatsApp — o site não tem upload." },
          },
          {
            kind: "guard",
            title: { en: "Safe reading", pt: "Leitura segura" },
            detail: {
              en: "Size and compression limits, macro rejection, XML parser without DTD/entities.",
              pt: "Limites de tamanho e compressão, recusa de macro, parser XML sem DTD/entidades.",
            },
          },
          {
            kind: "guard",
            title: { en: "Protect quotations", pt: "Proteger citações" },
            detail: {
              en: "Direct quotations and data tables are extracted and fingerprinted before any change.",
              pt: "Citações diretas e tabelas de dados são extraídas e registradas antes de qualquer alteração.",
            },
          },
          {
            kind: "ai",
            title: { en: "Claude interprets the manual", pt: "Claude interpreta o manual" },
            detail: {
              en: "The LLM reads the course's formatting manual and points out corrections. The thesis text is data, never instructions.",
              pt: "O LLM lê o manual de formatação do curso e aponta correções. O texto do TCC é dado, nunca instrução.",
            },
          },
          {
            kind: "code",
            title: { en: "Code applies the formatting", pt: "Código aplica a formatação" },
            detail: {
              en: "Deterministic Python edits the .docx XML, adjusted per document.",
              pt: "Python determinístico edita o XML do .docx, com ajustes por documento.",
            },
          },
          {
            kind: "guard",
            title: { en: "Blocking checks", pt: "Verificações bloqueantes" },
            detail: {
              en: "4 automated checks; any failure blocks the delivery.",
              pt: "4 verificações automáticas; qualquer falha bloqueia a entrega.",
            },
          },
          {
            kind: "human",
            title: { en: "Human review", pt: "Revisão humana" },
            detail: {
              en: "Triage check and 111-item QA checklist, by hand.",
              pt: "Verificação de triagem e checklist de QA de 111 itens, à mão.",
            },
          },
        ],
        outputs: [
          { en: "Clean version", pt: "Versão limpa" },
          { en: "Tracked-changes version with comments", pt: "Versão com controle de alterações e comentários" },
          { en: "PDF", pt: "PDF" },
        ],
        parallel: {
          en: "In parallel: a static page on Cloudflare Workers with first-party analytics (Worker + D1) — no login, no upload, no third-party trackers.",
          pt: "Em paralelo: página estática em Cloudflare Workers com analytics próprio (Worker + D1) — sem login, sem upload, sem rastreadores de terceiros.",
        },
      },
      snippetIds: ["aef-safe-docx", "aef-quote-integrity", "aef-regression"],
    },
    visible: true,
  },
  {
    slug: "support-agent-governance-prototype",
    name: "Support Agent Governance Prototype",
    featured: false,
    status: "prototype",
    statusNote: {
      en: "Prototype · LLM integration on the roadmap",
      pt: "Protótipo · integração com LLM no roadmap",
    },
    summary: {
      en: "Prototype of the governance layer for an AI support agent: rule-based triage, human escalation and an audit log with sensitive-data masking.",
      pt: "Protótipo da camada de governança de um agente de suporte com IA: triagem por regras, escalonamento humano e log de auditoria com mascaramento.",
    },
    problem: {
      en: "Support teams want to automate ticket handling, but automating access requests, critical incidents or tickets with personal data without clear limits creates risk. Inspired by handling ~1,000 incidents a month.",
      pt: "Times de suporte querem automatizar chamados, mas automatizar pedidos de acesso, incidentes críticos ou chamados com dados pessoais sem limites claros gera risco. Inspirado na experiência com ~1.000 incidentes por mês.",
    },
    built: {
      en: "A local Python prototype (standard library only) that classifies and prioritizes simulated tickets, decides whether automation is allowed or blocked, escalates sensitive or high-risk cases to a human, and writes a redacted audit log. Fully documented: scope, architecture, decision logic and governance controls.",
      pt: "Um protótipo local em Python (só biblioteca padrão) que classifica e prioriza chamados simulados, decide se a automação é permitida ou bloqueada, escalona casos sensíveis ou de alto risco para um humano e grava um log de auditoria mascarado. Documentado: escopo, arquitetura, lógica de decisão e controles de governança.",
    },
    stack: ["Python"],
    highlights: [
      {
        en: "On the 10 simulated tickets: 6 escalated to a human, 4 automated, 3 sensitive-data cases detected.",
        pt: "Nos 10 chamados simulados: 6 escalonados para humano, 4 automatizados, 3 casos de dados sensíveis detectados.",
      },
    ],
    guardrails: [
      {
        en: "Automation is blocked whenever predefined risk conditions are met.",
        pt: "A automação é bloqueada sempre que condições de risco predefinidas são atendidas.",
      },
      {
        en: "Sensitive data is masked before it reaches the audit log.",
        pt: "Dados sensíveis são mascarados antes de chegar ao log de auditoria.",
      },
    ],
    limitations: [
      {
        en: "Deterministic rules only — no LLM integrated yet.",
        pt: "Só regras determinísticas — ainda sem LLM integrado.",
      },
      { en: "No automated tests yet.", pt: "Ainda sem testes automatizados." },
      {
        en: "Simulated tickets; no real ticketing-system integration.",
        pt: "Chamados simulados; sem integração com sistema de chamados real.",
      },
    ],
    links: {
      repo: "https://github.com/gustavogg99-ctrl/support-agent-governance-prototype",
      repoPrivate: false,
    },
    visible: true,
  },
  {
    slug: "ethical-ai-policy",
    name: "Corporate AI Use Policy (template)",
    featured: false,
    status: "template",
    statusNote: { en: "Policy template · v2.1", pt: "Modelo de política · v2.1" },
    summary: {
      en: "Template corporate policy for the ethical use of AI, aligned with LGPD, ISO/IEC 42001 and ISO/IEC 27001, with controls against Shadow AI and an AI vendor risk assessment procedure.",
      pt: "Modelo de política corporativa para uso ético de IA, alinhado à LGPD, ISO/IEC 42001 e ISO/IEC 27001, com controles contra Shadow AI e um procedimento de avaliação de risco de fornecedores de IA.",
    },
    problem: {
      en: "Employees adopt AI tools faster than organizations can approve them: personal data goes into unapproved tools, automated decisions skip human review, and nobody knows which AI systems are in use (Shadow AI).",
      pt: "Funcionários adotam ferramentas de IA mais rápido do que as organizações conseguem aprová-las: dados pessoais vão para ferramentas não aprovadas, decisões automatizadas pulam a revisão humana e ninguém sabe quais sistemas de IA estão em uso (Shadow AI).",
    },
    built: {
      en: "A bilingual (EN/PT) policy with 14 sections and an auditable compliance checklist, a section-by-section framework mapping (ISO/IEC 42001, NIST AI RMF, LGPD), and an AI vendor risk assessment procedure with an Excel matrix that scores up to 3 vendors side by side.",
      pt: "Uma política bilíngue (EN/PT) com 14 seções e um checklist de conformidade auditável, um mapeamento seção a seção para frameworks (ISO/IEC 42001, NIST AI RMF, LGPD) e um procedimento de avaliação de risco de fornecedores de IA com uma matriz em Excel que pontua até 3 fornecedores lado a lado.",
    },
    stack: ["LGPD", "ISO/IEC 42001", "ISO/IEC 27001", "NIST AI RMF", "Excel"],
    highlights: [
      {
        en: "Framework mapping: of 23 requirements, 13 covered explicitly, 7 partially and 3 delegated to the adopting organization — gaps documented in a v3.0 roadmap.",
        pt: "Mapeamento de frameworks: de 23 requisitos, 13 cobertos explicitamente, 7 parcialmente e 3 delegados à organização que adota — lacunas documentadas num roadmap da v3.0.",
      },
      {
        en: "Vendor risk procedure: inherent-risk tiering, 30 questions in 8 weighted domains, 5 knock-out criteria and required contract clauses.",
        pt: "Procedimento de risco de fornecedores: classificação de risco inerente, 30 perguntas em 8 domínios ponderados, 5 critérios eliminatórios e cláusulas contratuais obrigatórias.",
      },
    ],
    guardrails: [],
    limitations: [
      {
        en: "A template — not an active policy of any organization. Adoption requires legal and governance review by the adopting company.",
        pt: "É um modelo — não é a política ativa de nenhuma organização. A adoção exige revisão jurídica e de governança pela empresa que adotar.",
      },
    ],
    links: {
      repo: "https://github.com/gustavogg99-ctrl/ethical-ai-policy",
      repoPrivate: false,
    },
    visible: true,
  },
] satisfies Project[];
