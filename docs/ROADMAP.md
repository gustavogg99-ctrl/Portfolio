# Roadmap

What's done, what's next, and what is waiting on Gustavo. **Read this first when starting a new session**, after `AGENTS.md` and `docs/SOURCES.md`.

Update this file in the same PR whenever an item changes status.

_Last updated: 2026-11-05 (Part 5 in review)._

## How we work

- One part = one branch + one pull request + entries in `docs/CHANGELOG.md` (and an ADR in `docs/DECISIONS.md` for any non-trivial decision) + the matching task updated in Notion.
- Before opening a PR: `npm run check`, `npm run build`, and a Playwright pass (desktop 1440×900, mobile 390×844, dark and light). Send screenshots.
- Gustavo reviews and merges with **"Create a merge commit"**, then deletes the branch. Never merge without his go-ahead.
- When information from Gustavo is needed, ask for **one item at a time**.
- If a claim isn't backed by `docs/SOURCES.md`, don't publish it.
- **Chat rotation:** Gustavo starts a new chat every **3 parts** (always right after a merge). See "Handoff" below.
- Notion: project "Portfólio pessoal (site)" (code `PORTFOLIO`) in "GG — Central de Projetos", tasks `PORTFOLIO-01` to `PORTFOLIO-09`.
- Vercel: project `portfolio`; every PR gets a preview URL (open it logged in to Vercel). Check it before merging.

## Handoff (every 3 parts)

Count the parts finished in the current chat. When the **3rd** one is merged (or earlier if Gustavo asks, or if the chat shows signs of losing context: re-asking answered questions, contradicting a decision, skipping a rule):

1. Tell Gustavo it's time to switch, before starting the next part.
2. Open a small docs PR updating this file: move finished parts to "Done", refresh "Next" and items waiting on him, update "Last updated", and record any new agreement made in chat.
3. After he merges it, give him the ready-to-paste prompt for the new chat (the standard one at the end of this file).
4. Don't start new work in the old chat after that.

## Done

| Part | What | PR |
|---|---|---|
| 1 | Foundation: Next.js 16, i18n `/en` `/pt`, validated content, CI, docs | #1 |
| 2 | Visual skeleton: profile card, sticky nav, theme, language switch | #2 |
| 3 | Hero (typewriter), About, Skills | #3 |
| 4 | Projects section + Autoria em Forma case study (diagram, sanitized code) | #4 |
| — | Vercel connected: PR previews, all deployments behind Vercel Authentication (ADR-019) | — |
| 5 | Experience, Education & courses, Certifications, Now | #6 |

## Next (in order)

### 1. Part 5 — merge PR #6
Chat count: Part 5 is the **1st** part of the current chat.

### 2. Part 6 — Writing and Contact
- **Waiting on Gustavo:** EN and PT URLs of the latest blog post (about the thesis-formatting site) → `src/content/writing.ts`.
- Contact form via Formspree — **waiting on Gustavo** to create the account and send the form ID. Email shown: gustavohfr2003@gmail.com. No phone, no WhatsApp.

### 3. Part 7 — Security and SEO
- CSP without `unsafe-inline` (hash of `THEME_SCRIPT`), HSTS, X-Frame-Options/frame-ancestors, nosniff, Referrer-Policy, Permissions-Policy, COOP — consistent with Autoria em Forma.
- Open Graph image and metadata per locale, `hreflang` alternates, sitemap, robots.
- Accessibility pass.

### 4. Final adjustments (before Part 8)
- **Shark in ServiceNow #14 (Aoop):** Aoop is still issuing certificates to everyone approved. When it arrives: link (or PDF) + month → `servicenow-shark` in `certifications.ts`. Notion task `PORTFOLIO-09` (blocks `PORTFOLIO-08`).
- General review of copy and visuals.

### 5. Part 8 — Publish
- Switch Vercel Authentication from "All Deployments" back to **Standard** so the production domain is public (ADR-019).
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

## Prompt for a new chat

```
Vamos continuar a construção do meu portfólio (Gustavo Rodrigues).
Repositório: github.com/gustavogg99-ctrl/Portfolio.

Clone o repositório e leia, nesta ordem: AGENTS.md, docs/ROADMAP.md,
docs/SOURCES.md, docs/DECISIONS.md, docs/ARCHITECTURE.md.
O ROADMAP tem o estado atual, as pendências e a forma de trabalho combinada;
siga-o à risca, incluindo a seção "Handoff" (troca de chat a cada 3 partes).
O projeto no Notion é "Portfólio pessoal (site)" (PORTFOLIO) na minha
GG — Central de Projetos.

Confirme que leu, resuma o estado em 5 linhas e me pergunte o primeiro
item pendente do ROADMAP.
```
