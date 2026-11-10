# Sources of truth for content

Every claim on this site must trace back to one of these, in this order of priority:

1. **Content audit (29/10/2026)**: private notes; highest priority.
2. **Portfolio briefing (29/10/2026)**: private notes.
3. **The rest of the briefing.**
4. **Explicit answers from Gustavo in the build conversation** (when newer than 1–3).
5. **The public repositories themselves** (checked directly: support-agent-governance-prototype, ethical-ai-policy).
6. **Autoria em Forma project audit (29/10/2026)** — numbers checked against its private repository and documentation. Overrides earlier wording about that project. Re-checked on **09/11/2026** in the same project (suite run again, scripts and docs read): see the Autoria rules below.

If a claim isn't supported by these: **don't publish it.**

The specific terms the site must never contain (names, organizations, numbers, internal paths) are kept in the private project notes and enforced in code as SHA-256 hashes (`src/content/claims.ts`, ADR-030). This file states the rules; it doesn't list those terms.

## Hard rules

- Name: **Gustavo Rodrigues**, exactly as written. No phone number.
- Never: "specialist", "expert", "senior", "senior consultant", "passionate about".
- English level: **advanced** (not fluent/native).
- Graduation: **July 2027** for both degrees (ADS — FACINT; Journalism — IESB). No start dates.
- Certifications issued (checked against the certificates on 05/11/2026): Microsoft Certified: AI Transformation Leader (AB-731, Jul 2026); ITIL 4 Foundation (PeopleCert, Dec 2024); ISO/IEC 27001:2022 Information Security Associate™, ISO/IEC 20000 IT Service Management Associate™, ISO 9001 Quality Management Systems Associate™ (all SkillFront — "Associate", never "Foundation"). Shown only with a way to verify them (ADR-017). In progress (Gustavo, 09/11/2026): Microsoft SC-900 (Security, Compliance, and Identity Fundamentals) and Scrum Master.
- English (Casa Thomas Jefferson): a course completed in Dec 2021, **not a certification** — shown under education (ADR-018).
- Shark in ServiceNow bootcamp, 14th edition (Shark Academy / Aoop): certificate of completion seen 09/11/2026, online, **15 h**, dated **30/10/2026**, no exam and no verification link. A course under education, **not a certification** (ADR-029). Never say "App Engine Studio" in its name, never show the certificate image.
- Only the certifications in `certifications.ts` are claimed. Frameworks known without a certificate appear only as skills, marked "conceptual" (e.g. COBIT).
- Teledata (service provider to CAIXA): technician from late Oct/2024, promoted to supervisor early Oct/2025 (11 months). **Co-led** a team of 16 with another shift supervisor. Tools (Gustavo, 09/11/2026): Microsoft Copilot for the AI-assisted workflows, Jira for incidents; trained new technicians on ITIL practices.
- MerkurIA: co-founder of a small team (project management, security and governance of client projects). **No numbers** about MerkurIA: none can be checked by a visitor. Tools (Gustavo, 09/11/2026): WhatsApp customer-service bots built with Make and later n8n, OpenAI API, WhatsApp API and Supabase as the database.
- Autoria em Forma: **launched Oct/2026, paused after a demand test without organic traction; 2 complete jobs delivered** (the 1st took 3 versions until approval; the 2nd, in Nov/2026, confirmed by Gustavo on 09/11/2026). No clients, sales, revenue, or per-document processing time.
- Autoria em Forma numbers: **29/29 regression checks** (run on 09/11/2026 against the private repository, after the 2nd job; was 20/20); **4 blocking checks + 1 triage check** (not "5 blocking"). The 4 blocking checks run on the client's actual file and are **separate from the 29** regression tests, which run on fictional documents and guard the scripts (never "29 checks (4 blocking)"). Blocking is a **process rule**: each script exits with an error, but none chains them or stops the delivery on its own. The triage check is an **automated** script that **does not block**; what it lists is reviewed by hand (never "manual triage check"); **14 real errors → rules, 4 of them with automated tests** (not "each with a test"); 111-item QA checklist in 12 stages (these two confirmed by Gustavo on 09/11/2026, after the 2nd job); 10 manuals from 8 institutions; R$0/month infrastructure, AI subscription not included. The Mozilla Observatory grade (C 50 → A+ 125, 22/10/2026) is true but **not shown on the site** — not in the hero, not on the project (ADR-024); the security controls behind it are listed as guardrails instead.
- Autoria em Forma project instructions (`aef-project-instructions` in `snippets.ts`): excerpt supplied by Gustavo from the Autoria em Forma project's own answer on **10/11/2026** (part B of that answer: excerpt, translation and fidelity note). Label: "instructions of the Claude project that runs the pipeline" (+ a line from the lessons file). **Never** "prompt sent to the model", "API prompt" or similar: the pipeline does not call a model through an API; the existing wording "the LLM interprets the manual" stays. The rules in the excerpt (e.g. rule 11, the marked version with prefixes) are the 10/11/2026 text and **evolved after the 1st job**: never say they applied when it was delivered. Text kept literal with `[...]`; only the bracketed line naming the lessons file is added. The numbers of the 2 deliveries (part A of that answer) are **not published**: they wait for Gustavo's `.docx` files (ROADMAP).
- Autoria em Forma code: only the sanitized snippets in `src/content/snippets.ts`. Never the repository history, `wrangler.jsonc` or the page folder (old password hash; references to the real job). Never show any real thesis content. Say openly it was built with Claude. Repository private (described only).
- Support Agent Governance Prototype: rule-based, **no LLM**. **20 automated tests** (unittest) in CI on Python 3.10 and 3.13, added on 09/11/2026 (repository PR #1); they also assert the 10/6/4/3 results. Never suggest a working AI agent. v2 tracked in Notion ("Support Agent v2 – LLM com guardrails"); its task AGENT-V2-09 updates this card.
- Employers and clients appear only as listed in `experience.ts`; no other engagement is named. Freelance work since Mar 2026 (Gustavo, 09/11/2026) is shown as on the resume: documentation and presentations for municipal digital-maturity assessments, no client named.
- Resume PDFs (`public/resume/`): Gustavo's approved text (09/11/2026), **site versions without the phone number** (ADR-032). Their facts must match the site; check the text by hand whenever they are replaced (the automated guard scans site text only).
- No Lighthouse/PageSpeed score until measured on the live site. No line or commit counts as merit.
- "Now" (Gustavo, 09/11/2026): **available for work now**; studying for SC-900 and Scrum Master; building the Support Agent v2 (IT ticket triage: LLM classifies and drafts, the current rules are guardrails, a person approves). Say it is being built; never that the LLM triage works until its repository proves it.
- Tone: first person, direct, evidence over adjectives (links, tests, docs).

Many of these are enforced automatically by `tests/content.test.ts` (claims guard).
