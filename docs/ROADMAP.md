# Roadmap

What's done, what's next, and what is waiting on Gustavo. **Read this first when starting a new session**, after `AGENTS.md` and `docs/SOURCES.md`.

Update this file in the same PR whenever an item changes status.

_Last updated: 2026-11-10 (Part 27 open: regression suite count 29 → 41, ADR-039; Part 26 merged, PR #38)._

## How we work

- One part = one branch + one pull request + entries in `docs/CHANGELOG.md` (and an ADR in `docs/DECISIONS.md` for any non-trivial decision) + the matching task updated in Notion.
- Before opening a PR: `npm run check`, `npm run build`, and a Playwright pass (desktop 1440×900, mobile 390×844, dark and light). Send screenshots.
- Gustavo reviews and merges with **"Create a merge commit"**, then deletes the branch. Never merge without his go-ahead. **Every time a PR is opened, send him the PR link** (where the merge button is), together with the preview link.
- When information from Gustavo is needed, ask for **one item at a time**.
- If a claim isn't backed by `docs/SOURCES.md`, don't publish it.
- **Chat rotation:** Gustavo starts a new chat every **3 parts** (always right after a merge). See "Handoff" below.
- **Previews:** every PR has a Vercel preview behind Vercel Authentication. Gustavo opens it logged in before merging; when a change touches the contact form, he sends one real message from the preview (automated tests mock Formspree).
- **Blog in the Writing section** is automatic (RSS, ADR-020). A post whose title trips the claims guard is shown only after Gustavo reviews it (`blog.allowed`).
- **Content review:** done; Gustavo reviewed and approved the site text on 09/11/2026.
- **Decisions worth a blog post** are written up in the Notion task with the reasoning (e.g. the CSP trade-off in `PORTFOLIO-07`), for the future post about building this site.
- Notion: project "Portfólio pessoal (site)" (code `PORTFOLIO`) in "GG — Central de Projetos", tasks `PORTFOLIO-01` to `PORTFOLIO-27` (09 = ServiceNow, closed in Part 12; 11–13 = Parts 9–11; 14 = Part 12; 15 = Part 13, which also holds the private list of banned terms; 16 = Part 14; 17 = Part 15; 18 = Part 16; 19 = Part 17; 20 = Part 18; 21 = Part 19; 22 = Part 20, which also records Part 21; 23 = Part 22; 24 = Part 23; 25 = Part 24; 26 = Parts 25 and 26). New parts get the next code (27 = Part 27; the next one is `PORTFOLIO-28`).
- **Session setup for GitHub (learned in Parts 20 to 22):** at the start of a chat, call the repository tool `add_repo` for `gustavogg99-ctrl/Portfolio` with push access, or the git proxy refuses `git push` (403, "not in this session's authorized repository set"). `gh pr create` fails (GraphQL is blocked): open PRs with `gh api repos/gustavogg99-ctrl/Portfolio/pulls --method POST --input <json>`. A PR's CI can start a few minutes late; wait for the `check` run, never push an empty commit. Re-checked in Part 23: `gh auth status` reports an invalid `GH_TOKEN`, but `gh api` still works through the proxy (open the PR and read check runs with it); `npm ci` is needed before `npm run check`; Python Playwright with Chromium is available in the sandbox (serve `npx next start -p 3000` after `npm run build`, kill it afterwards).
- **Other repository:** the Autoria em Forma service page lives in `gustavogg99-ctrl/autoria-em-forma-pipeline` (private; `pagina/fonte.html` → `python3 -I pagina/gerar_site.py` → `site/`). Changes go through a branch + PR there too; merging to `main` deploys to Cloudflare. Branch preview builds fail on that project (production builds pass).
- **"Now" must stay current** (ADR-031): change `updated` on every edit; the work line changes the day Gustavo is hired; the study line and the "In progress" certifications change together; the project line never claims more than the Support Agent repository proves.
- **Writing rules added on 2026-11-09:** no em dashes in visible text (test enforces it); page titles use `|`; the claims guard also scans the dictionaries; the privacy page must change when a provider or a collected field changes (ADR-027).
- **Other repositories touched in Parts 12–14:** `support-agent-governance-prototype` (branch + PR; its own CI runs `python -m unittest discover -s tests` on Python 3.10 and 3.13; a card claim about it changes only after its PR is merged) and the profile repository `gustavogg99-ctrl/gustavogg99-ctrl` (profile README; edited directly on `main` with Gustavo's explicit OK).
- **GitHub account and repository settings** (name, bio, pins, repo description/website, contribution settings) change only with Gustavo's explicit OK for each change, through his Chrome: the API proxy refuses repository-settings writes. It also refuses deleting branches (API and `git push --delete`): Gustavo deletes them on the Branches page, or via his Chrome.
- **Banned terms** live only as hashes in `src/content/claims.ts` (ADR-030). The plain list is in the private Notion task `PORTFOLIO-15`; add one with `npm run claims:hash -- "term"`. Never write a banned term in plain text in this public repository.
- **Local checks:** before serving a build for Playwright, make sure no old `next-server` is still on port 3000 (`pkill -f next-server`), or the check reads a stale build (happened in Part 13; re-verified in Part 14).
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
| 13 | Public repository hygiene: banned terms stored as hashes, neutral SOURCES.md, README path fix (ADR-030) | #20 |
| 14 | Support Agent card: 20 automated tests in CI (other repo, PR #1); "No automated tests yet" removed | #21 |
| 15 | "Now" back under About: work (available now), study (SC-900, Scrum Master), project (Support Agent v2) (ADR-031) | #23 |
| — | Outside this repo: GitHub photo = site photo (Gustavo); `ethical-ai-policy` README names the related project correctly (that repo, PR #1); stale branches deleted by Gustavo (the proxy refuses branch deletion) | — |
| 16 | Autoria em Forma card leads with the 2 delivered jobs; "paused" only in the badge and one line | #24 |
| 17 | MerkurIA: "No formal title in a small team" replaced by "Led project management and the security and governance of client projects" (same facts) | #25 |
| 18 | Resume PDFs EN/PT without the phone number; freelance entry in Experience (ADR-032) | #27 |
| 19 | Autoria blocking/triage checks described as the code runs them (ADR-033); tools confirmed by Gustavo in Experience, Skills and the resume | #28 |
| 20 | Autoria em Forma: excerpt of the Claude project's instructions (original + translation + fidelity note), not a "prompt" (ADR-034); part B of `IFOOD-01` only | #30 |
| 21 | Wording fix in the Part 20 excerpt: "makes the check fail", no "blocks the delivery" (ADR-033); Gustavo's choice | #31 |
| 22 | Autoria em Forma: numbers of the 2 real jobs on the card and the case page (versions until client acceptance, tracked changes per revision, comments), anonymous, "accepted by the client" (ADR-035); part A of `IFOOD-01` | #32 |
| 23 | Support Agent card and "Now" line after the v2 short version (repository PRs #2 to #7): evaluation numbers, guardrails, the README's limitations and an "Evaluation results" link (ADR-036); `IFOOD-03` | #34 |
| 24 | Autoria em Forma case page: timed test by hand × pipeline, n=1, fictional document, with limitations and what went wrong in each condition (ADR-037); `IFOOD-05` | #36 |
| 25 | Wording of the "processing time not measured" limitation, now that the timed test exists (no new claim) | #37 |
| 26 | Timed test: one note on what was found after the run (page numbers of the by-hand file, reference order, Word/Docs pagination); numbers untouched (ADR-038) | #38 |
| 27 | Autoria em Forma: regression suite count updated from 29 to 41 (ADR-039) | (this PR) |

## Next (in order)

The site is **live and public but not shared yet** (ADR-025). Post-launch review (Parts 9–11) and the pre-sharing review (Parts 12–18) are done. A new chat starts at 0 after this handoff (Part 23 was the only part of the previous chat; Gustavo asked for the early switch).

Agreed on 09/11/2026 (this chat): **hero counters stay for now** (may be revisited later); **site text reviewed and approved by Gustavo** (the deferred content review is done); **`gustavorodrigues.vercel.app` is the final domain** (no custom domain).

### 1. iFood intensive (until 16/11/2026, 23:59): top priority

Gustavo applies to the iFood GenAI internship (AI Builder track) on **16/11/2026** (deadline 17/11) and puts this site's link in the form, so the site is shared from then on. Until 16/11 the site only changes for the items below. Plan, schedule and rules: Notion project `IFOOD` ("Candidatura iFood GenAI — AI Builder"), tasks `IFOOD-00` to `IFOOD-06`. A separate "manager" chat coordinates; this repository's chat only does the site parts.

- **`IFOOD-01` is complete (Parts 20 to 22, 10/11):** the excerpt of the instructions of the Claude project that runs the Autoria pipeline (ADR-034) and the numbers of the 2 real jobs on the card and the case page (ADR-035). Rules that stay: the excerpt is labelled as **project instructions**, never "prompt sent to a model" or "API prompt" (the pipeline calls no model by API), and its rules **evolved after the 1st job**, so never say they applied then; the numbers are **"accepted by the client"**, never "approved" (approval by the university only happens at the end of Nov/2026, and any line about it needs Gustavo's confirmation); **check results, triage items and comment prefixes are deliberately not published** (SOURCES.md). The section heading stays "Code excerpts" (ADR-034).
- **`IFOOD-03` is complete (Part 23, 10/11):** Support Agent card and "Now" project line updated with what the `support-agent-governance-prototype` repository proves after its v2 short version (`IFOOD-02`, merged 10/11 in its PRs #2 to #7). Rules that stay: always shown with the README's limitations; numbers change only with a new `results/eval_results.json`; never "works in production" or "the larger model is needed" (ADR-036).
- **`IFOOD-05` (optional, done in Part 24, 10/11; merged, with follow-ups in Parts 25 to 27):** timed test of the Autoria pipeline, by hand × pipeline, on one fictional document, run by Gustavo on 10/11/2026 (protocol written before measuring, in the Notion task). Published as a block on the **case page only** (ADR-037): both times side by side (4 h 56 min 45 s net by hand; 18 min 20 s on the clock and 3 min 45 s active with the pipeline), the checks and checklist counts of both outputs, what went wrong in each condition, the method and 8 limitations. Rules that stay: "controlled test, n=1, fictional document"; never "hours saved", "faster" or a ratio; never extrapolated to the 2 real jobs (no baseline); no institution, course or client named; real-job numbers and test numbers stay in separate blocks. Record: `claude/Resultado_IFOOD05_Teste_Cronometrado.md` in the Autoria Claude project.
- The form question "What appears in your AI portfolio?" is answered only with what is on the site at submission (rule in the Notion project).

### 2. Before sharing the link (pre-sharing review, 09/11/2026)
Ask Gustavo one item at a time; sharing is his call (ADR-025).
- Done on 09/11/2026 (outside this repo, with Gustavo's approval): GitHub name "Gustavo Rodrigues", bio "AI Builder · AI Governance", profile URL, Portfolio repo pinned with description and the new site, profile README links the portfolio and uses the official certification names, private contributions shown. Writing section checked live: 3 posts.
- Sharing: the link goes into the iFood application on 16/11 (item 1).
- Replacing the resume: Gustavo exports the `_site` versions (no phone) himself; compare their text with the previous PDFs and publish only facts he confirmed.
- Done on 09/11/2026: availability and "Now" (Part 15), GitHub photo, `ethical-ai-policy` README, stale branches, Autoria card order (Part 16), MerkurIA wording (Part 17), resume (Part 18), hero counters (kept for now), resume line about the Autoria checks (Part 19).

### 3. Optional
- Submit `sitemap.xml` to Google Search Console (Gustavo's account).
- Re-measure Observatory/PageSpeed after big changes (docs only, ADR-024). The shell can't reach `*.vercel.app`; use Gustavo's Chrome.

## Later

- After the clients' theses are approved by their university (expected end of Nov/2026): ask Gustavo whether he wants a line about it on the Autoria card, with his confirmation and no identifying detail.
- Support Agent v2 beyond the short version (AGENT-V2-05 prompt-injection defence, AGENT-V2-06 masking before the API call, demo): when one is merged in its repository, update the card limitations and the "Now" line here (Notion `AGENT-V2`, task AGENT-V2-09).
- English version of `docs/` is fine.

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
