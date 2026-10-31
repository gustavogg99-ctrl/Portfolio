# Roadmap

What's done, what's next, and what is waiting on Gustavo. **Read this first when starting a new session**, after `AGENTS.md` and `docs/SOURCES.md`.

Update this file in the same PR whenever an item changes status.

_Last updated: 2026-10-30 (after Part 4)._

## How we work

- One part = one branch + one pull request + entries in `docs/CHANGELOG.md` (and an ADR in `docs/DECISIONS.md` for any non-trivial decision) + the matching task updated in Notion.
- Before opening a PR: `npm run check`, `npm run build`, and a Playwright pass (desktop 1440×900, mobile 390×844, dark and light). Send screenshots.
- Gustavo reviews and merges with **"Create a merge commit"**, then deletes the branch. Never merge without his go-ahead.
- When information from Gustavo is needed, ask for **one item at a time**.
- If a claim isn't backed by `docs/SOURCES.md`, don't publish it.
- Notion: project "Portfólio pessoal (site)" (code `PORTFOLIO`) in "GG — Central de Projetos", tasks `PORTFOLIO-01` to `PORTFOLIO-08`.

## Done

| Part | What | PR |
|---|---|---|
| 1 | Foundation: Next.js 16, i18n `/en` `/pt`, validated content, CI, docs | #1 |
| 2 | Visual skeleton: profile card, sticky nav, theme, language switch | #2 |
| 3 | Hero (typewriter), About, Skills | #3 |
| 4 | Projects section + Autoria em Forma case study (diagram, sanitized code) | #4 |

## Next (in order)

### 1. Decide: connect Vercel now for PR previews
Recommended: yes. Connect the repository to Vercel so every PR gets a preview URL Gustavo can open before merging. The project stays private until he approves going public (Part 8). Security headers and measurements remain in Parts 7–8.

### 2. Part 5 — Experience, Certifications, Now
- Experience timeline and education from `src/content/experience.ts` / `education.ts` (already filled).
- Certifications — **waiting on Gustavo**, one at a time: verification link + month issued.

  | Certification | Status in content | Needed |
  |---|---|---|
  | Microsoft AB-731 (AI Transformation Leader) | `pending_link` | Microsoft Learn share link, month |
  | ITIL 4 Foundation | `pending_link` | link, month, issuer |
  | ISO/IEC 27001 Foundation | `pending_link` | link, month, issuer |
  | ISO/IEC 20000 Foundation | `pending_link` | link, month, issuer |
  | ISO 9001 Foundation | `pending_link` | link, month, issuer |
  | English — Casa Thomas Jefferson | `pending_link` | exact certificate name, link (or decide how to show without one), month |
  | Shark in ServiceNow #14 (Aoop) | `pending_link` | only after it's issued |

  Without a link a certification stays hidden (schema rule). In progress (shown as such): Microsoft Learn track, Scrum Master.
- "Now" section from `src/content/now.ts` (PORT-AUTO hidden until work starts).

### 3. Part 6 — Writing and Contact
- **Waiting on Gustavo:** EN and PT URLs of the latest blog post (about the thesis-formatting site) → `src/content/writing.ts`.
- Contact form via Formspree — **waiting on Gustavo** to create the account and send the form ID. Email shown: gustavohfr2003@gmail.com. No phone, no WhatsApp.

### 4. Part 7 — Security and SEO
- CSP without `unsafe-inline` (hash of `THEME_SCRIPT`), HSTS, X-Frame-Options/frame-ancestors, nosniff, Referrer-Policy, Permissions-Policy, COOP — consistent with Autoria em Forma.
- Open Graph image and metadata per locale, `hreflang` alternates, sitemap, robots.
- Accessibility pass.

### 5. Part 8 — Publish
- Production deploy on `*.vercel.app` after Gustavo approves.
- Cookie-less analytics (Vercel Web Analytics).
- Re-measure **on the live sites** before citing: Mozilla Observatory for Autoria em Forma (A+ is from 22/10/2026) and for this portfolio; Lighthouse. Record results in docs.

## Later

- Resume PDF (the button appears automatically when `profile.resumeUrl` is set). Gustavo is rewriting it.
- Support Agent v2 (LLM + guardrails) — tracked in Notion "Support Agent v2 – LLM com guardrails"; task AGENT-V2-09 updates the project card here.
- Custom domain.
- English version of `docs/` is fine; site copy review by Gustavo after launch.

## Known caveats

- First request to an unknown project slug may return HTTP 200 with the not-found page (`noindex`); later requests return 404 (Next 16 + Cache Components). See ARCHITECTURE.md.
- Code excerpts on the Autoria em Forma page have comments translated to English (disclosed in each fidelity note).
