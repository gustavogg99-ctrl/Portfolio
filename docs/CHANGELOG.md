# Changelog

What changed in each part of the build. Newest first.

## Pre-launch — Observatory grade no longer shown · 2026-11-05

**Changed**
- Hero: the "A+ Mozilla Observatory" counter removed; two counters remain (13,000+ service points, ~1,000 incidents/month). The counter grid now follows the number of counters (`STAT_COLUMNS` in `hero.tsx`).
- Autoria em Forma: the "Mozilla HTTP Observatory: from C to A+" highlight removed; the guardrails already list the controls behind it.
- ADR-024 (supersedes ADR-007 in part); SOURCES.md, ARCHITECTURE.md and ROADMAP updated (Part 8 records Observatory/Lighthouse in docs only; PR link sent with every PR).

**Verified**
- `npm run check`, `npm run build`; no "Observatory" left in the rendered pages.
- Playwright: hero with two counters and the case study without the grade; desktop 1440×900 and mobile 390×844, dark and light.

## Pre-launch — "Now" sub-section hidden · 2026-11-05

**Changed**
- `now.ts`: the last visible item (Support Agent v2, *Planned*) set to `visible: false`. It repeated the Support Agent card. With no visible item, the "Now" sub-section is not rendered (ADR-023). No code changes.

**Verified**
- `npm run check`, `npm run build`.
- Playwright: Certifications ends at "In progress", no `#now` on `/en` or `/pt`; desktop 1440×900 and mobile 390×844, dark and light.

## Docs — Handoff after Part 7 · 2026-11-05

- ROADMAP: next chat starts at "Final adjustments — pre-launch"; production URL decision added; working agreements from this chat recorded (previews, blog allow list, deferred content review, decision notes for the blog).

## Part 7 — Security headers, SEO and accessibility · 2026-11-05

**Added**
- Security headers on every route: CSP, HSTS (2 years, preload), `nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, COOP; `X-Powered-By` removed. CSP keeps the site static with `'unsafe-inline'` scripts and is otherwise strict (ADR-022).
- Canonical URLs and `hreflang` alternates (en, pt-BR, x-default) on all pages; Open Graph + Twitter metadata per locale.
- Open Graph image per locale (prerendered), `sitemap.xml`, `robots.txt`.
- Tests for the security headers. Total: 64.

**Fixed (axe-core, WCAG 2.2 AA)**
- About facts list: valid `<dl>` structure.
- Language switch: visible "EN/PT" is part of the accessible name.
- Case-study page: project name is the page's `h1`; code excerpt titles are `h3` (no skipped levels).

**Verified**
- `npm run check`, `npm run build`; headers, canonical/hreflang, OG tags, sitemap, robots and OG image checked with curl.
- Strict hash-only CSP simulated in Playwright: 36 violations, theme toggle broken — the measurement behind ADR-022.
- axe-core: 0 violations on `/en` and `/pt/projects/autoria-em-forma`, dark and light.

## Part 6 — Writing and Contact · 2026-11-05

**Added**
- Writing section: 3 newest posts in the page's language, read from the blog's RSS feed and cached about an hour (ADR-020); title + date only; link to the blog. Falls back to the link alone if the feed fails.
- `src/content/claims.ts`: the claims guard lists, now shared by the tests and the blog filter. `blog.allowed` for posts Gustavo reviewed (the ServiceNow bootcamp posts); `blog.hidden` to suppress one.
- Contact section: Formspree form (AJAX + native fallback, honeypot, privacy notice), email and LinkedIn (ADR-021). `profile.contactForm` with format check.
- Tests: RSS parsing, entities, language filter, guard, allow/hide lists, no excerpt. Total: 60.

**Removed**
- `Post` schema and the "Under construction" placeholder (every section is now built).

**Verified**
- Vercel preview: `/en` shows the 3 EN posts, `/pt` the PT ones.
- Playwright with Formspree mocked: success and error states, honeypot and subject sent; desktop/mobile, dark/light, EN/PT screenshots; no console errors.
- Formspree form settings checked in the dashboard (destination email, CAPTCHA off, Formshield on) — nothing changed.

## Part 5 — Experience, Certifications and Now · 2026-11-05

**Added**
- Experience section: timeline (Teledata, MerkurIA) with roles, periods and highlights; Education & courses sub-section.
- Certifications section: 5 verified certifications, each with a way to check it; "In progress" chips; "Now" sub-section.
- Schema: `lookupId` for certifications verified by number on the issuer's portal (ADR-017); education `completed` (exactly one of `expectedEnd`/`completed`, ADR-018); certification names may be `{ en, pt }`.
- Tests: lookup-id format, education dates, English never as a certification. Total: 53.
- UI strings (EN, PT): education title, completed, planned, issued, verify at, certificate no., opens in a new tab.

**Changed (facts — checked against the certificates, 05/11/2026)**
- AB-731: verified, Microsoft Learn link (en-us), issued Jul 2026.
- ITIL 4 Foundation: PeopleCert, Dec 2024, verified by certificate number.
- ISO certifications: issuer SkillFront; names corrected to the official "…Associate™" titles (were "…Foundation"); per-certificate badge pages; Nov/Dec 2024.
- English (Casa Thomas Jefferson): moved from certifications to education — course completed Dec 2021 (ADR-018).
- "Now": the Microsoft Learn and Scrum items are hidden there (already shown as certifications in progress); `updated` → 2026-11.
- Vercel connected with all deployments protected (ADR-019).

**Pending**
- Shark in ServiceNow #14: hidden until Aoop issues it (Notion `PORTFOLIO-09`, before Part 8).

**Verified**
- `npm run check`, `npm run build`. Playwright: desktop 1440×900 and mobile 390×844, dark and light, EN and PT — no console errors; role dates stack on mobile.
- The SkillFront badge pages and the Microsoft Learn link show the holder's name and the certification title.

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
