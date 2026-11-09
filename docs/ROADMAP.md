# Roadmap

What's done, what's next, and what is waiting on Gustavo. **Read this first when starting a new session**, after `AGENTS.md` and `docs/SOURCES.md`.

Update this file in the same PR whenever an item changes status.

_Last updated: 2026-11-09 (Part 12 merged; Autoria em Forma numbers confirmed)._

## How we work

- One part = one branch + one pull request + entries in `docs/CHANGELOG.md` (and an ADR in `docs/DECISIONS.md` for any non-trivial decision) + the matching task updated in Notion.
- Before opening a PR: `npm run check`, `npm run build`, and a Playwright pass (desktop 1440×900, mobile 390×844, dark and light). Send screenshots.
- Gustavo reviews and merges with **"Create a merge commit"**, then deletes the branch. Never merge without his go-ahead. **Every time a PR is opened, send him the PR link** (where the merge button is), together with the preview link.
- When information from Gustavo is needed, ask for **one item at a time**.
- If a claim isn't backed by `docs/SOURCES.md`, don't publish it.
- **Chat rotation:** Gustavo starts a new chat every **3 parts** (always right after a merge). See "Handoff" below.
- **Previews:** every PR has a Vercel preview behind Vercel Authentication. Gustavo opens it logged in before merging; when a change touches the contact form, he sends one real message from the preview (automated tests mock Formspree).
- **Blog in the Writing section** is automatic (RSS, ADR-020). A post whose title trips the claims guard is shown only after Gustavo reviews it (`blog.allowed`).
- **Content polish is deferred** to the pre-launch phase: build every feature first, then one full content review (Gustavo's choice, 05/11/2026).
- **Decisions worth a blog post** are written up in the Notion task with the reasoning (e.g. the CSP trade-off in `PORTFOLIO-07`), for the future post about building this site.
- Notion: project "Portfólio pessoal (site)" (code `PORTFOLIO`) in "GG — Central de Projetos", tasks `PORTFOLIO-01` to `PORTFOLIO-14` (all done; 09 = ServiceNow, closed in Part 12; 11–13 = Parts 9–11; 14 = Part 12). New parts get the next code.
- **Other repository:** the Autoria em Forma service page lives in `gustavogg99-ctrl/autoria-em-forma-pipeline` (private; `pagina/fonte.html` → `python3 -I pagina/gerar_site.py` → `site/`). Changes go through a branch + PR there too; merging to `main` deploys to Cloudflare. Branch preview builds fail on that project (production builds pass).
- **Writing rules added on 2026-11-09:** no em dashes in visible text (test enforces it); page titles use `|`; the claims guard also scans the dictionaries; the privacy page must change when a provider or a collected field changes (ADR-027).
- Vercel: project `portfolio`, production domain `gustavorodrigues.vercel.app`; every PR gets a preview URL (open it logged in to Vercel). Check it before merging.

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
| 6 | Writing (blog RSS, newest 3 per language) and Contact (Formspree) | #7 |
| 7 | Security headers (CSP per ADR-022), hreflang, Open Graph, sitemap, robots, accessibility fixes | #8 |
| — | Pre-launch: "Now" sub-section hidden (ADR-023) | #10 |
| — | Pre-launch: Observatory grade no longer shown; hero with two counters (ADR-024) | #11 |
| 8 | Published on **gustavorodrigues.vercel.app**: Web Analytics, Standard Protection (ADR-025) | #12 |
| — | Live measurements (docs only): Observatory B+ 80/100, PageSpeed 100×4 mobile and desktop, axe 0 (2026-11-08) | #14 |
| 9 | Post-launch technical fixes: localized 404, Person JSON-LD, own icons, 320 px header, heading order (ADR-026); old domain → 308 | #14 |
| 10 | Content review: hero/tagline/meta, privacy page (LGPD), no em dashes, Autoria numbers after its 2nd job (ADR-027); Autoria service page "paused" (other repo, PR #1) | #15 |
| 11 | Compact profile card below 1024 px, hero on a phone's first screen (ADR-028) | #16 |
| 12 | Shark in ServiceNow bootcamp under Education & courses, not a certification (ADR-029) | #18 |
| — | Docs only: Autoria em Forma "14 real errors → rules" and "111-item checklist in 12 stages" confirmed by Gustavo after the 2nd job; site unchanged | #19 |

## Next (in order)

The site is **live and public but not shared yet** (ADR-025). The post-launch review (Parts 9–11) is done. New chat starts at 0.

### 1. Before sharing the link
- **Decide with Gustavo whether to share now** (ADR-025 said: not before the post-launch review — that review is done). Ask him first; sharing is his call.

### 2. Optional
- Submit `sitemap.xml` to Google Search Console (Gustavo's account).
- Re-measure Observatory/PageSpeed after big changes (docs only, ADR-024). The shell can't reach `*.vercel.app`; use Gustavo's Chrome.

## Later

- Resume PDF (the button appears automatically when `profile.resumeUrl` is set). Gustavo is rewriting it.
- Support Agent v2 (LLM + guardrails) — tracked in Notion "Support Agent v2 – LLM com guardrails"; task AGENT-V2-09 updates the project card here.
- Custom domain.
- English version of `docs/` is fine; site copy review by Gustavo after launch.

## Known caveats

- First request to an unknown project slug may return HTTP 200 with the not-found page (`noindex`); later requests return 404 (Next 16 + Cache Components). See ARCHITECTURE.md.
- 404 pages use the site title, not "Page not found" (ADR-026).
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
