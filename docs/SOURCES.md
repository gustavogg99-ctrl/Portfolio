# Sources of truth for content

Every claim on this site must trace back to one of these, in this order of priority:

1. **Claims audit summary (29/10/2026)** — rules after the cleanup of LinkedIn, GitHub and blog. Highest priority.
2. **Portfolio briefing (29/10/2026), section 9 "what NOT to claim"**.
3. **The rest of the briefing.**
4. **Explicit answers from Gustavo in the build conversation** (when newer than 1–3).
5. **The public repositories themselves** (checked directly: support-agent-governance-prototype, ethical-ai-policy).
6. **Autoria em Forma project audit (29/10/2026)** — numbers checked against its private repository and documentation. Overrides earlier wording about that project.

If a claim isn't supported by these: **don't publish it.**

## Hard rules

- Name: **Gustavo Rodrigues** — never "Gustavo Henrique". No phone number.
- Never: "specialist", "expert", "senior", "senior consultant", "passionate about".
- English level: **advanced** (not fluent/native).
- Graduation: **July 2027** for both degrees (ADS — FACINT; Journalism — IESB). No start dates.
- Certifications issued: ITIL 4 Foundation, ISO/IEC 27001, ISO/IEC 20000, ISO 9001, Microsoft AB-731, English (Casa Thomas Jefferson). Shown only with a verification link. ServiceNow only after issuance. Other Microsoft certs and Scrum: in progress.
- **Not** certifications: COBIT 2019, EXIN AI Essentials (COBIT appears only as "conceptual" knowledge).
- Teledata (service provider to CAIXA): technician from late Oct/2024, promoted to supervisor early Oct/2025 (11 months). **Co-led** a team of 16 with another shift supervisor.
- MerkurIA: co-founder, no formal title (project management, security/governance). **No numbers** — not R$100K, 1,500+ users, 10+ projects, 100K+ users, "trained 3+".
- Autoria em Forma: **launched Oct/2026, paused after a demand test without organic traction; 1 complete job delivered** (3 versions until approval). Not "paused after validation", not "3 pilot deliveries". No clients, sales, revenue, or per-document processing time.
- Autoria em Forma numbers: 20/20 regression tests; **4 blocking checks + 1 triage check** (not "5 blocking"); **14 real errors → rules, 4 of them with automated tests** (not "each with a test"); 111-item QA checklist in 12 stages; 10 manuals from 8 institutions; Observatory C (50) → A+ (125) — re-run before launch; R$0/month infrastructure, AI subscription not included.
- Autoria em Forma code: only the sanitized snippets in `src/content/snippets.ts`. Never the repository history, `wrangler.jsonc` or the page folder (old password hash; references to the real job). Never link `/painel`. Never show any real thesis content. Say openly it was built with Claude. Repository private (described only).
- Support Agent Governance Prototype: rule-based, **no LLM, no automated tests**. Never suggest a working AI agent. v2 tracked in Notion ("Support Agent v2 – LLM com guardrails"); its task AGENT-V2-09 updates this card.
- Never mention the Digital Maturity Assessment (CAIXA/BIRD) or NTT DATA as employer.
- No Lighthouse/PageSpeed score until measured on the live site. No line or commit counts as merit.
- Tone: first person, direct, evidence over adjectives (links, tests, docs).

Many of these are enforced automatically by `tests/content.test.ts` (claims guard).
