# Changelog

What changed in each part of the build. Newest first.

## Docs — Roadmap · 2026-10-30

- Added `docs/ROADMAP.md`: done/next/later, items waiting on Gustavo, working agreement. Linked from `AGENTS.md` and `README.md` so a new session starts from it.


## Part 4 — Projects and Autoria em Forma case study · 2026-10-29

**Added**
- Projects section: featured card for Autoria em Forma; cards for the support-agent prototype and the AI use policy with expandable details (native `<details>`).
- Case-study page `/en|pt/projects/autoria-em-forma`: scope, problem, what I built, architecture diagram (7 steps + outputs + parallel site), evidence, guardrails, 3 sanitized code excerpts with fidelity notes, limitations, "built with Claude".
- `SiteShell` (shared header, profile card, footer); nav and Contact link back to the home sections from sub-pages.
- Content: `snippets.ts`; `page.architecture` / `page.snippetIds` in the project schema; snippet references validated.
- Tests: snippet secret/internal-term scan; unknown snippet reference; claims guard for the superseded Autoria phrasings. Total: 50.
- UI strings for project labels, statuses and diagram kinds (EN, PT).

**Changed (facts — ADR-015)**
- Autoria em Forma status: launched Oct 2026, paused after a demand test without organic traction, 1 complete job delivered (was "paused after validation · 3 free pilot deliveries").
- 4 blocking checks + 1 manual triage check (was "5 blocking checks").
- 14 real errors → rules; 4 with automated tests (was "each turned into a rule and a test").
- 10 manuals from 8 institutions; infrastructure cost note says the AI subscription is not included.

**Verified (Playwright + curl, production build)**
- Home `#projects`, details expanded, case page in PT (top, architecture, code) and mobile — no console errors, no horizontal overflow.
- On the case page: nav "Projects" → `/pt#projects`, Contact → `/pt#contact`, language switch → `/en/projects/autoria-em-forma`.
- `/en/projects/support-agent-governance-prototype` (no `page`) → 404. No occurrence of "painel" in the rendered HTML.


## Part 3 — Hero, About and Skills · 2026-10-29

**Added**
- Hero: "I BUILD AI" / "CONSTRUO IA" with typewriter rotating SECURE → TESTED → AUDITABLE; headline; subtitle; buttons (See projects, Resume when available, Contact); three counters from `profile.stats`.
- About: three paragraphs, facts card (location, availability, languages).
- Skills: five groups as tags (no levels), sub-section `#skills`.
- `SectionTitle` supports h3 for sub-sections; caret blink CSS.
- UI strings: basedIn / openTo / languages (EN, PT).

**Changed**
- Skills items can be localized (`string | { en, pt }`, ADR-014) — descriptions now appear in Portuguese on `/pt`.
- `profile.openTo` shortened to fit the facts card; language levels lowercase ("advanced", "avançado").
- Placeholders removed from `#home` and `#about`.

**Verified (Playwright, production build)**
- Typewriter cycles through all three words; screen-reader text is a single stable sentence; with reduced motion the word stays "SECURE".
- Desktop dark (EN), PT about/skills, mobile light — no console errors, no horizontal overflow.


## Part 2 — Visual skeleton · 2026-10-29

**Added**
- Two-column layout: sticky profile card (≥1024px) + content column; single column on mobile.
- Profile card: photo (color, 4:5, EXIF stripped), name, title, tagline, Contact button (Resume button appears automatically when `resumeUrl` is set), LinkedIn / GitHub / Blog / Email links.
- Sticky header: icon navigation with tooltips and active-section highlight; EN ⇄ PT switch that keeps the current `#section` and remembers the choice; light/dark toggle without flash.
- Two-tone section titles; skeleton sections (`#home`, `#about`, `#projects`, `#experience`, `#certifications`, `#writing`, `#contact`) with "under construction" placeholders for the next parts.
- Footer with credits ("built with Next.js and the help of Claude") and a link to the source code.
- Accessibility baseline: skip link, labelled icon buttons, `aria-current`, focus outline, reduced motion.
- `profile.links.source` in content; new UI strings in both dictionaries.
- Tests: `swapLocale` (6 cases). Total: 31.
- Docs: layout, theme and accessibility sections in ARCHITECTURE; ADR-009 to 012.

**Verified (Playwright, production build)**
- Desktop 1440×900 and mobile 390×844, dark and light; no console errors; no horizontal overflow.
- Theme persists after reload; language switch `/en#projects` → `/pt#projects` and sets the `locale` cookie; first Tab focuses the skip link.


## Part 1 — Foundation · 2026-10-29

**Added**
- Next.js 16.4 + React 19 + TypeScript + Tailwind CSS 4 scaffold (App Router, Cache Components).
- Design tokens for the dark (default) and light themes; `text-silver` gradient utility; reduced-motion support.
- Self-hosted Geist Sans/Mono fonts.
- Internationalized routing: `/en` (default) and `/pt`, `proxy.ts` redirects, cookie to remember the choice, type-checked dictionaries.
- Content model in `src/content/` with Zod schemas, filled from the briefing and the 29/10 claims audit:
  profile, experience (Teledata, MerkurIA), education, certifications (all hidden until verification links), projects (Autoria em Forma, Support Agent Governance Prototype, Corporate AI Use Policy), skills, now, writing (empty).
- Build-time content validation and `npm run content:check` report.
- Vitest suite: 7 content-rule tests + claims guard (banned terms and words).
- GitHub Actions CI: lint, typecheck, tests, content report, build.
- Documentation: ARCHITECTURE, DECISIONS (ADR-001 to 008), CHANGELOG, SOURCES, CONTENT.
- Temporary placeholder home page proving routing + tokens + content.

**Changed vs. earlier plan**
- next-intl replaced by native Next.js i18n (ADR-004).
- Google-hosted font replaced by self-hosted Geist (ADR-005).
- Hero word "AT SCALE" replaced by "TESTED" (ADR-008).
- Corporate AI Use Policy card rewritten from the actual repository: it already contains the AI vendor risk assessment procedure (v1.0) and Excel matrix, so that framework is part of this project instead of a separate "in development" item.

**Pending (needs owner input)**
- Verification links for all certifications (Part 5).
- Issuers of ITIL 4, ISO 27001, ISO 20000, ISO 9001; exact name of the English certificate.
- Profile photo (Part 2).
- EN/PT URLs of the latest blog post (Part 6).
- Final resume PDF (after everything else).
