# Changelog

What changed in each part of the build. Newest first.

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
