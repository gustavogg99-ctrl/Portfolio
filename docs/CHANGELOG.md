# Changelog

What changed in each part of the build. Newest first.

## Part 47 — Resume PDFs without SQL and with "prototype" for the Support Agent · 2026-11-26

A file swap under ADR-032, closing the PDF side of ADR-053. No new decision, so no ADR. Notion task PORTFOLIO-43.

**Changed**
- `public/resume/Gustavo_Rodrigues_Resume.pdf` and `Gustavo_Rodrigues_Curriculo.pdf` replaced by Gustavo's export of 26/11/2026 (site versions, no phone number). Two text changes in each, in both languages: "SQL" removed from the engineering and tools skills line, and the Support Agent label "GitHub · in development" / "GitHub · em desenvolvimento" is now "GitHub · prototype" / "GitHub · protótipo".
- SOURCES.md (SQL line, new resume bullet), ROADMAP.

**Verified**
- Text extracted and compared with the Part 45 PDFs: only those two lines differ in each file. Links (LinkedIn, GitHub, this site), one A4 page each, no phone number in either file. Claims guard terms checked over the extracted text: nothing found. The version with a phone number that Gustavo also sent was not used.

## Part 46 — SQL out of the skills list; blog English link fixed · 2026-11-26

ADR-053. Notion task PORTFOLIO-43.

**Changed**
- `src/content/skills.ts`: "SQL" removed (no public proof; returns with MSFT-19).
- `src/content/writing.ts`: English blog link is now `/category/en/` (the old `/category/english/` returns 404).
- SOURCES.md, ROADMAP, ADR-053.

**Not done here**
- The resume PDFs still list SQL and "in development" for the Support Agent; they change only with Gustavo's new export (file swap, ADR-032). Done in Part 47.

## Part 45 — Resume PDFs with the approved MerkurIA line · 2026-11-25

A file swap under ADR-032, closing the PDF side of ADR-052. No new decision, so no ADR.

**Changed**
- `public/resume/Gustavo_Rodrigues_Resume.pdf` and `Gustavo_Rodrigues_Curriculo.pdf` replaced by Gustavo's export of 25/11/2026 (site versions, no phone number). MerkurIA has one bullet, the approved line (EN and PT); removed: AI automations/assistants wording, WhatsApp API, project management and security/governance, risk and feasibility assessments, training the internal team.
- SOURCES.md (resume bullet; stale "102 tests" note on the Support Agent bullet), ROADMAP.

**Verified**
- Text extracted and compared line by line with the Part 43 PDFs: only the MerkurIA entry differs (the Aoop lines read the same; they now come from the source file, so the text order changed in extraction). Links (LinkedIn, GitHub, this site), one A4 page each, no phone number. Claims guard terms checked over the extracted text: nothing found.
- A first export the same evening still had the old Aoop title ("AI track"); rejected and fixed in the source file.

## Part 44 — MerkurIA reduced to the approved line · 2026-11-25

Decision in ADR-052 (Notion: MSFT-01; audit ORG-01, item E2).

**Changed**
- `src/content/experience.ts`: MerkurIA has one highlight, the line approved in the "Rumo à Microsoft" plan (EN and PT). Removed: project management and security/governance of client projects; AI risk and feasibility assessments; training the internal team.
- SOURCES.md (MerkurIA bullet), DECISIONS.md (ADR-052), ROADMAP.

**Not changed**
- Resume PDFs in `public/resume/` (still carry the old bullets; waiting on Gustavo's export, see ROADMAP).

## Part 43 — Resume PDFs with the exact contract title · 2026-11-25

Follows Part 42 (the site text already had the new title; the PDFs did not).

**Changed**
- `public/resume/Gustavo_Rodrigues_Resume.pdf` and `Gustavo_Rodrigues_Curriculo.pdf`: the Aoop line now reads "ServiceNow Technical Consultant - JR" (was "Junior, ServiceNow (AI-specialized track)" / "Júnior em ServiceNow, trilha especializada em IA"), and the bullet below says AI work (Now Assist, agents) is planned instead of "next, an AI track". Edited in place on the Part 41 files (same fonts, layout, one A4 page, no phone number). Nothing else changed.
- ROADMAP, SOURCES (resume bullet).

**Not changed**
- "Starting Dec 2026" / "início dez/2026" (changes on 01/12/2026, ADR-047) and the employer name "Aoop (NTT DATA)" (rename expected in March 2027).

## Part 42 — Aoop role with the exact contract title · 2026-11-25

Decision in ADR-051.

**Changed**
- `src/content/experience.ts`: role title "ServiceNow Technical Consultant - JR" in EN and PT (was "Junior, ServiceNow (AI-specialized track)" / "Júnior em ServiceNow (trilha especializada em IA)"); the "Next: the AI track" highlight now says AI work is planned.
- `src/content/now.ts`: work line uses the new title.
- SOURCES.md (Aoop bullet), DECISIONS.md (ADR-051), ROADMAP.

**Not changed**
- Employer name "Aoop" (official rename to NTT DATA expected in March 2027, see ROADMAP).
- Resume PDFs in `public/resume/` (replaced in Part 43).

## Part 41 — Resume PDFs with the 24/11/2026 Support Agent numbers · 2026-11-25

A file swap under ADR-032, like Parts 28, 33 and 37; no new decision, so no ADR. The PDFs still carried numbers from before Part 38.

**Changed**
- `public/resume/Gustavo_Rodrigues_Resume.pdf` and `Gustavo_Rodrigues_Curriculo.pdf` replaced, unchanged, by Gustavo's export of 25/11/2026 (site versions, no phone number). Two text changes in the Support Agent line, in both languages: "rules alone: 9/30" to 14/30, and "102 tests in CI" to 149 (the 9/30 was from the 10/11 run, before injection detection; the 102 was missed by the Part 38 handoff note, which only listed the tests).
- SOURCES.md (resume bullet), ROADMAP (pending item closed).

**Verified**
- Text extracted and compared with the Part 37 PDFs: only those two numbers differ. Links, metadata and page size identical; one A4 page each; no phone number in either file. The version with a phone number differs from the site version only in that line. Claims guard over the extracted text: nothing found. `npm run check`.

**Not changed**
- The Aoop line ("Starting Dec 2026"), which changes on 01/12/2026 together with the site (ADR-047). Site content.

## Part 40 — Tool logos in the Skills section · 2026-11-25

Notion `PORTFOLIO-39` (the Notion title says "Part 39"; the repository already used 39 for the Autoria link). Same idea as the profile README (ADR-050).

**Changed**
- 17 logos for the tools in the Skills list (Claude, OpenAI, Microsoft Copilot, n8n, Make, Power Automate, Copilot Studio, Python, CI as GitHub Actions, Supabase, WhatsApp, Cloudflare Workers, Next.js and Vercel, Jira, Microsoft 365, ServiceNow). Standards, concepts and soft skills stay text.
- `SkillItem` gains `{ label, icons }`; `skill-icons.ts` maps ids to files in `public/icons/`; `--logo-tile` token; `about.tsx` renders the logo before the name (decorative, `alt=""`).
- `docs/ICONS.md` (sources, licenses, how to add one); `tests/skill-icons.test.ts` (files exist, registered, used and credited; no logo on standards); ARCHITECTURE, SOURCES, DECISIONS (ADR-050), ROADMAP.

**Verified**
- `npm run check` and `npm run build`. Playwright on the production build: desktop 1440×900 and mobile 390×844, dark and light, EN and PT: 17 images per page, none broken, no layout break.

## Part 39 — Autoria em Forma links its public repository · 2026-11-25

The pipeline went public on 25/11/2026 (`gustavogg99-ctrl/autoria-em-forma`, MIT). The site still called it private in three places, which broke the criterion of Notion `GHREADME-07` (README and site say the same thing about the timed test) (ADR-049).

**Changed**
- Card: `repoPrivate` replaced by a link to the public repository.
- Code excerpts note (EN/PT): the full code is public; excerpts selected for the page.
- Timed test: the method item points to `testes/ifood05` and `docs/10` (key to the planted errors not published); "the engine does not merge paragraphs" now says "at the time".
- SOURCES.md: Autoria code rule rewritten (public repository linked, private one never), test record sources updated; DECISIONS.md (ADR-049); ROADMAP.

**Verified**
- Timed-test text compared with the public README, `testes/ifood05/README.md` and `docs/10` at `925a8b6`. `npm run check`.

## Part 38 — Support Agent card republished with the 24/11/2026 run · 2026-11-24

The repository merged masking, prompt-injection detection, a held-out injection set and a new evaluation run (its PRs #28 and #29). The card still showed the 10/11 run and listed those as "Next" (ADR-048).

**Changed**
- Card, case page, quick read and "Now" line: numbers from the new `results/eval_results.json` (category 21/30 to 28/30 against 14/30 for the rules; unsafe automation 4/21 rules only, 0/21 with the guardrail in all four combinations; held-out injection 1/10 with v1, 10/10 with v2; US$ 0.00017 and 0.00348 per ticket with v2; 149 tests).
- Limitations rewritten: masking exists but has blind spots; injection detection is pattern-based; held-out set is weak evidence; two runs exist and 12 of 120 answers differ.
- Preview: EVAL-011, same model and prompt, new answer ("Technical Incident · Medium").
- "Now": measured on 30 + 10 synthetic tickets; "Next" is the recorded demo.
- SOURCES.md, DECISIONS.md (ADR-048) and ROADMAP updated; content test pins the new numbers.

**Not changed**
- Resume PDFs still say "102 tests" (Gustavo's export; to be re-exported).

**Verified**
- Every number checked against `results/eval_results.json` and the README of the repository at `848b8ce`; 149 tests run on that commit. `npm run check` (83 tests).

## Part 37 — Hired by Aoop (NTT DATA): experience, "Now", skills and resume · 2026-11-16

Gustavo was hired on 16/11/2026 and asked to lift the rule against naming NTT DATA as an employer and to publish the updated resume (ADR-047).

**Changed**
- `claims.ts`: the employer-name hash removed (the rule is withdrawn in SOURCES.md).
- Experience: new "Aoop" entry (an NTT DATA company; "Junior, ServiceNow (AI-specialized track)" / "Júnior em ServiceNow (trilha especializada em IA)"), shown as "Starting Dec 2026" through a new optional `upcoming` flag on roles (schema, component, `starting` label in both dictionaries). Freelance now ends Nov 2026.
- "Now" work line: hired, starts in December 2026 (was "available for work now"; the contact link left the line).
- Skills: "ServiceNow (learning)" replaced by "ServiceNow (App Engine Studio, Flow Designer, Service Catalog, GlideAjax)".
- Resume PDFs (EN/PT, site versions, no phone) replaced; differences listed in SOURCES.md.
- RSS test fixtures: the titles that trip the guard now use a banned generic word; `writing.ts` comment updated.

**Verified**
- `npm run check` (83 tests), `npm run build`; claims guard over the PDF text: nothing found; no phone number in either PDF.

## Part 36 — Observatory re-measured on the live site · 2026-11-16

ROADMAP "Optional": re-measure after big changes (docs only, ADR-024). The last Observatory grade was from 08/11, before Parts 30 to 35.

**Measured (live, MDN HTTP Observatory in Gustavo's Chrome, 16/11/2026 ~16:20, host `gustavorodrigues.vercel.app/en`)**
- B+ (80/100), 11 of 12 tests passed. The only failure is the CSP (−20, `'unsafe-inline'` in `script-src`), as decided in ADR-022. Cookies: none detected; CORS, redirection, Referrer-Policy and HSTS (preloaded) pass.
- Same grade and score as 08/11/2026: Parts 30 to 35 changed no header.

**Changed**
- ARCHITECTURE ("Measured on the live site"), README (security table) and ROADMAP ("Optional", Done) record the new date. No site change; no score is shown on the site.

## Docs — Handoff after Part 35 · 2026-11-16

- ROADMAP: Parts 33 to 35 done (PRs #47 to #49); "Next" now says nothing is pending on the site and the new chat starts by asking Gustavo. New "How we work" notes: take preview links from the Vercel bot comment (long branch names are shortened); the resume source file now carries the Part 29 wording, and exports are still compared line by line; Search Console property, file and sitemap status. "Optional" gains a Search Console follow-up.
- Search Console after the Part 35 merge (Gustavo, 16/11/2026): property verified automatically by the HTML file; `sitemap.xml` submitted, status "Processed", 8 pages found (home, privacy and the two case pages, in both languages).

## Part 35 — Google Search Console verification file · 2026-11-16

ROADMAP "Optional": submit the sitemap to Google Search Console (ADR-046).

**Added**
- `public/google4f8e9eef3fd71ea9.html`: the verification file Google issued for the URL-prefix property `https://gustavorodrigues.vercel.app/`, unchanged. Test `tests/search-console.test.ts` (one file, exact content, not caught by the locale proxy).

**Verified**
- `npm run check` (83 tests) and `npm run build`. The production build serves the file at `/google4f8e9eef3fd71ea9.html` (200, `text/html`, exact content, no redirect); `robots.txt` and `sitemap.xml` (8 URLs) unchanged.

**After the merge (Gustavo's account, his Chrome)**
- "Verify" in Search Console, then submit `https://gustavorodrigues.vercel.app/sitemap.xml`. Results go into the handoff entry.

**Also recorded: live PageSpeed of the Autoria case after Part 34** (16/11/2026, one run, right after the deploy): mobile 99 · 100 · 100 · 100 (FCP 0.9 s, LCP 2.1 s, TBT 30 ms, CLS 0), desktop 100 · 100 · 100 · 100. Accessibility is 100 with no failing audit; the mobile performance 99 is one run after a fresh deploy (LCP 1.0 s in the previous run, no change to that page's loading).

## Part 34 — Heading order on the Autoria case; live PageSpeed; mobile header decision · 2026-11-16

Last two items left from Gustavo's analysis (ROADMAP "Next" item 1).

**Fixed**
- Autoria em Forma case page: the job headings of the deliveries block were `h4` right under the section's `h2`, so live PageSpeed gave Accessibility 99 (`heading-order`). `Deliveries` takes a `headingLevel` (h3 on the case page, h4 on the home card, unchanged there). Same look.
- Test `tests/heading-order.test.tsx` renders the block at both levels and checks that the case page asks for h3; Vitest now also runs `.test.tsx` files.

**Decided**
- Improvement 4 (labels in the mobile header): not done, the header stays icon-only (ADR-045).

**Measured (live, PageSpeed Insights in Gustavo's Chrome, 16/11/2026 ~15:35, one run each, before this fix)**

| Page | Mobile (Perf · A11y · BP · SEO) | Mobile FCP / LCP / TBT / CLS | Desktop (Perf · A11y · BP · SEO) |
|---|---|---|---|
| `/en` | 100 · 100 · 100 · 100 | 0.9 s / 0.9 s / 40 ms / 0.015 | 100 · 100 · 100 · 100 |
| `/en/projects/autoria-em-forma` | 100 · **99** · 100 · 100 | 1.0 s / 1.0 s / 50 ms / 0 | 100 · **99** · 100 · 100 |
| `/en/projects/support-agent-governance-prototype` | 100 · 100 · 100 · 100 | 0.9 s / 0.9 s / 10 ms / 0 | 100 · 100 · 100 · 100 |

The 99 is the heading order fixed above. Docs only (ADR-024): no score is shown on the site.

**Verified**
- `npm run check` (80 tests) and `npm run build`. Playwright on the production build: no heading-level skip on `/en`, `/pt`, both case pages and the privacy page in both languages; the deliveries block at 1440×900 and 390×844, dark and light, looks the same as before; no horizontal scroll.

## Part 33 — Resume PDFs with "102 tests" · 2026-11-16

First item left from Gustavo's analysis (ROADMAP "Next" item 1). A file swap under ADR-032, like Part 28 (ADR-040); no new decision, so no ADR.

**Changed**
- `public/resume/Gustavo_Rodrigues_Resume.pdf` and `Gustavo_Rodrigues_Curriculo.pdf` replaced, unchanged, by Gustavo's export of 16/11/2026 (site versions, no phone number). The only text change: the Support Agent line ends "102 tests in CI" / "102 testes em CI" (was 84), matching the site since Part 32.
- The "with prompt v2 and the guardrail" / "com prompt v2 e guardrail" wording, edited into the PDFs in Part 29 (ADR-041), is now in Gustavo's source file, so the next export keeps it.

**Verified**
- Text extracted and compared line by line with the previous PDFs: only the Support Agent line differs (in PT the line now wraps one word, "CI.", onto a fourth line; plus a pdftotext spacing artifact in a heading). One A4 page each, rendered and read in both languages. No phone number in the text; links (LinkedIn, GitHub, this site) and metadata unchanged; fonts embedded. Claims guard over both texts: nothing found. Sizes 43 KB and 45 KB (under the 200 KB test limit).
- A first export the same day still said "84 tests" and had lost "prompt v2" (the source file did not have the Part 29 edit); it was rejected and not committed.

**Not changed**
- Site text and content. The Support Agent numbers and limitations.

## Docs — Handoff after Part 32 · 2026-11-16

- ROADMAP: Parts 30 to 32 done (PRs #43 to #45). "Next" item 1 now lists what is left from Gustavo's analysis: resume PDFs with "102 tests", the undecided mobile header labels (improvement 4), and a live PageSpeed run of the home and both case pages. New "How we work" note on measuring performance locally when Gustavo's Chrome is not connected. "Last updated" refreshed.

## Part 32 — Quick read and preview on both case studies; Support Agent test count 102 · 2026-11-16

Third part of the plan from Gustavo's analysis of another portfolio (ADR-044).

**Changed**
- Case pages: right after the header, a quick read with three cells (Problem, My role, Evidence with a "Source" link) and a preview. The separate Problem section is omitted when the quick read is shown.
- Autoria em Forma: role line approved by Gustavo ("designed it, built it with Claude and run the pipeline; deal with the clients and review every delivery"); evidence "2 real jobs accepted by the clients, 41/41 regression tests" (→ deliveries); illustrative before/after of a long direct quotation on fictional text.
- Support Agent: role line approved by Gustavo ("reviewed and approved the labels", not "labelled"); evidence "0 of 21 with prompt v2 + guardrail, 8 of 21 rules only" (→ README results); preview = the recorded result for ticket EVAL-011 (rules, Claude Haiku 5.5 with prompt v2, guardrail, label), linked to `results/eval_results.json`.
- Support Agent card: "102 automated tests" (was 84), CI "Python 3.10 and 3.13 on Ubuntu, 3.13 on Windows" (repository at `4706b74`, 16/11/2026).
- New schema fields `quickRead` and `preview`, component `quick-read.tsx`, 8 new dictionary labels, 4 new tests.

**Verified**
- `npm run check` (77 tests) and `npm run build`. Playwright on both case pages at 1440×900, 390×844 and 320×640, EN and PT, dark and light: no horizontal scroll; the evidence link of Autoria lands on the deliveries section.
- Repository facts re-read: EVAL-011 record in all 4 runs (human review, disagreements on category and priority, LLM alone would automate it); "General Support always escalates" in `docs/decision-logic.md`; 102 tests passing locally; CI matrix in the workflow.
- Lighthouse (local production build, median of 3, same machine): Autoria case mobile 93 → 94 (LCP 3.17 → 3.12 s, TBT 81 → 50 ms, CLS 0), desktop 100; Support Agent case mobile 96 → 96, desktop 100; home mobile 98.

**Not changed**
- The resume PDFs (still "84 tests" until Gustavo exports new ones). Any other number or limitation.

## Part 31 — Support Agent case page; share image per case; details only on cards without a page · 2026-11-16

Second part of the plan from Gustavo's analysis of another portfolio (ADR-043).

**Changed**
- New page `/en|pt/projects/support-agent-governance-prototype`: summary, problem, what I built, a 7-step architecture diagram (from the public repository's `docs/guardrail.md` and `docs/architecture.md`, checked at `4706b74`), evidence, guardrails, limitations, repository and results links. In the sitemap with alternates.
- Open Graph image per case study and language (`projects/[slug]/opengraph-image.tsx`).
- Home: the Support Agent card shows "Read the case study" and no longer the expandable details; the Corporate AI Use Policy card keeps them.
- Fixed: the "Evaluation results" link pointed to a README anchor that no longer exists (`#8-llm-triage-with-guardrail-results`, removed when the repository's README was reorganised on 15-16/11/2026); now `#results`. Numbers unchanged (`results/eval_results.json` last changed on 10/11/2026).
- Tests: the case page exists, ends with a person, has at least 3 control steps and the simulated send, and never claims production use or a full injection defence; the results link test follows the new anchor.

**Verified**
- `npm run check` (73 tests) and `npm run build`. Playwright on the new page at 1440×900, 390×844 and 320×640, EN and PT, dark and light: no horizontal scroll. The card opens the case, "All projects" lands on the card, the language switch keeps the case, `og:image` points to the case image (200, image/png, both languages).
- Lighthouse (local production build, median of 3): home mobile 94 (LCP 2.74 s, TBT 127 ms, CLS 0.015), desktop 100; the new case page mobile 96 (LCP 2.72 s, TBT 50 ms, CLS 0), desktop 100. No media added; differences from Part 30 are within noise.

**Not changed**
- Every number and sentence of the Support Agent content (the page reuses them). The "84 automated tests" line stays as published until Gustavo decides (the repository now has 102).

## Part 30 — Projects right after the hero; named shortcut to the case study; case links on every card · 2026-11-16

First part from Gustavo's analysis of another portfolio (ROADMAP "Next" item 1, ADR-042).

**Changed**
- Home order: Hero → Projects → About (Now, Skills) → Experience → Certifications → Writing → Contact. The nav icons follow the same order.
- Hero: new primary button "Case study: Autoria em Forma" / "Estudo de caso: Autoria em Forma", built from the featured project's name, opens its case page. "See projects" becomes a secondary button.
- Project cards: each card has `id={slug}`; "Read the case study" is shown on any card whose project has a page (today only the featured one, so nothing new is visible yet). The case page's "All projects" link returns to the project's own card (`/{lang}#{slug}`).
- New test file `tests/home-order.test.ts` (section order, nav order, featured project has a page, label names the case, card anchors don't clash with section ids).

**Verified**
- `npm run check` (70 tests) and `npm run build`. Playwright at 1440×900, 390×844 and 320×640, EN and PT, dark and light: no horizontal scroll; at 390×844 the case button ends at 745–763 px (first screen); shortcut opens the case; "All projects" lands on the card; keyboard order follows the new nav.
- Lighthouse (performance only, local production build, median of 3, same machine before and after): mobile 96 → 95, LCP 2.72 → 2.48 s, TBT 92 → 63 ms, CLS 0.015 → 0.015; desktop 100 → 100, CLS 0.008. Within noise. Not a live measurement (Gustavo's Chrome was not connected).

**Not changed**
- Content facts, texts of the sections, the case page itself, header layout (mobile labels are evaluated later, ADR-042).

## Docs — Handoff after Part 29 · 2026-11-16

- ROADMAP: handoff requested by Gustavo. New "Next" item 1: his analysis of another portfolio, with the workflow for the new chat (read the whole document, classify each idea against the site and the rules, ask one item at a time, never copy distinctive elements). "Last updated" refreshed; the other items renumbered.

## Part 29 — Skills aligned with the resume; "0 of 21" says prompt v2 · 2026-11-10

**Changed**
- Skills (EN/PT): added "LLM evaluation (accuracy and cost)"; "Claude (with connectors)" is now "Claude (API and connectors)". Same as the resume (ADR-041).
- Resume PDFs: the Support Agent line now says the "0 of 21" is with prompt v2 and the guardrail (EN: "with prompt v2 and the guardrail"; PT: "com prompt v2 e guardrail"). Only that line changed; one page, links and metadata kept, no phone number, about 70 KB each.
- SOURCES.md, ADR-040 note and ROADMAP updated; the iFood intensive is closed on the site side.

**Not changed**
- Every number, every other line of the resumes, any other page.

## Part 28 — Resume PDFs replaced (EN and PT, no phone number) · 2026-11-10

**Changed**
- `public/resume/Gustavo_Rodrigues_Resume.pdf` and `Gustavo_Rodrigues_Curriculo.pdf` replaced by the versions Gustavo exported on 10/11/2026: Autoria em Forma line split into pipeline and site, with the accepted-by-the-client numbers and 41 regression tests; Support Agent v2 numbers (28/30, 9/30, 0 of 21, 84 tests); Corporate AI Use Policy vendor risk line; skill "LLM evaluation (accuracy and cost)"; freelance bullets merged (ADR-040).
- SOURCES.md: where each new or changed fact is backed. ROADMAP: Part 27 marked as merged (#39) and Part 28 added.

**Verified**
- No phone number in the text, metadata or links of either file; one A4 page each; claims guard clean over the extracted text; files under the 200 KB test limit.

**Not changed**
- Site content and code. Two points left for Gustavo: "0 of 21" without "prompt v2" on the resume, and the new skill, which the site's Skills section does not list yet.

## Part 27 — Autoria em Forma: regression suite count 29 → 41 · 2026-11-10

**Changed**
- Autoria em Forma card and case page: "Regression suite with 41 tests (41/41 passing)" and "separate from the 41 tests", in EN and PT. SOURCES.md records the run (10/11/2026, private repository, after its PR #4) and the history 20 → 29 → 41 (ADR-039).

**Not changed**
- The 4 blocking checks, the triage check, the 14 real errors, the timed test and every other number.

## Part 26 — Timed test: one note on what was found after the run · 2026-11-10

**Changed**
- Autoria em Forma case page, timed test block: one note added to "how to read the table" (by-hand .docx without page numbers; a reference out of alphabetical order in the pipeline's versions 1 to 3, a build-spec mistake fixed in version 4; one page of difference in Word and Google Docs). The measured numbers are untouched. The limitation "not tested in Word or Google Docs" now says "during the run". ADR-038, SOURCES.md.

## Part 25 — Wording of the Autoria "processing time" limitation · 2026-11-10

**Changed**
- The Autoria em Forma limitation "Processing time per document has not been measured" now says it refers to real client documents and points to the timed test (fictional document, n = 1) as the only measurement. Follow-up to Part 24 (ADR-037); no new claim.


## Part 24 — Autoria em Forma timed test (by hand × pipeline) · 2026-11-10

**Added**
- `Project.timedTest` (schema) and the `TimedTest` component: a table of both conditions, notes on how to read it, what went wrong in each condition, method, 8 numbered limitations and "what I am not concluding". Rendered on the Autoria em Forma case page only (ADR-037). Dictionary labels in both languages.
- Test that pins the two times, the 8 limitations, the "n = 1" and "fictional document" wording in both languages, the absence of "hours saved" outside the denial and of any institution or course name.
- SOURCES.md rule and ADR-037. `IFOOD-05`.

**Not changed**
- The featured card and the real-job numbers (ADR-035) stay as they were. No hours-saved claim, no ratio.


## Docs — Handoff after Part 23 · 2026-11-10

**Changed**
- ROADMAP: `IFOOD-03` done in Part 23; `IFOOD-05` described with its protocol (written before measuring, in the Notion task), who runs it (Gustavo, in the Autoria project) and the rules for publishing it as Part 24 only after he brings the record; GitHub and Playwright session notes; next Notion code `PORTFOLIO-25`.

## Part 23 — Support Agent card and "Now" line after the v2 short version · 2026-11-10

**Added**
- `Project.links.results` and an "Evaluation results" link (both languages) on the project card, pointing to section 8 of the Support Agent README. ADR-036.
- Test that pins the card's numbers, the results link, the limitations in both languages and the absence of "no LLM" and "in production" wording.

**Changed**
- Support Agent card: status note, summary, "what I built", stack (+ Claude API), four highlights with the evaluation numbers (28/30 and 9/30 categories, unsafe automation 8/21, 1/21, 0/21, cost of caution, cost per ticket, 84 tests), guardrails of the combined design, and the README's limitations. The rules-only highlights (10 tickets, 6/4/3) left the card.
- "Now" project line: first version done and measured on 30 synthetic tickets; next steps taken from the repository's "Later" list.
- SOURCES.md: what the card may claim, with the numbers' origin, and what it must never claim.
- ROADMAP: `IFOOD-03` done.

**Not changed**
- Status stays "Prototype". Nothing says it works in production or that a model is recommended.

**Verified**
- Before editing: `main` of the Support Agent repository pulled, 84 tests run, README table recomputed from `results/eval_results.json`, prompt and evaluation-set hashes compared. See also the PR description.

## Docs — Handoff after Part 22 · 2026-11-10

**Changed**
- ROADMAP: Parts 20 to 22 summarized (IFOOD-01 complete, with the rules that stay: project instructions not "prompt", "accepted" not "approved", what is not published); next part is `IFOOD-03`; Notion codes `PORTFOLIO-22` (Part 20 and 21) and `PORTFOLIO-23` (Part 22); GitHub session setup notes; a "Later" item for the university approval line.

## Part 22 — Autoria em Forma: numbers of the 2 real jobs · 2026-11-10

**Added**
- `Project.deliveries` and a `Deliveries` component, shown on the Autoria em Forma card and case page: per job, versions until client acceptance (3 | 1), tracked changes counted per revision (87 | 69) and comments (14 | 31), with a method note in both languages. Labels in both dictionaries. ADR-035.
- Test that pins the six numbers and fails on "approved", blocking, triage or prefix wording in that block.

**Changed**
- SOURCES.md: origin of each number, the counting rule, the authorization of both clients, and what is deliberately not published. "3 versions until approval" became "until client acceptance".
- ROADMAP: part A of `IFOOD-01` done.

**Not changed**
- No check result, triage item, comment prefix split or identifying detail on the site.

**Verified**
- See the PR description.

## Part 21 — Wording fix in the Autoria instructions excerpt · 2026-11-10

**Changed**
- The explanation of the `aef-project-instructions` excerpt (EN and PT) now ends "a change makes the check fail", without "blocks the delivery", matching ADR-033 (blocking is a process rule, no script stops the delivery by itself). Gustavo's choice. Nothing else changed.

**Verified**
- `npm run check`, `npm run build`, Playwright on the page (EN and PT).

## Part 20 — Autoria em Forma: excerpt of the Claude project's instructions · 2026-11-10

**Added**
- Autoria em Forma case study: excerpt of the instructions of the Claude project that runs the pipeline (rules 1, 3, 4, 11, review format, one lessons-file line), original in Brazilian Portuguese with English translation and a fidelity note in both languages. Labelled as project instructions, never as a prompt sent to a model or through an API (ADR-034).
- `Snippet.translation` and `Snippet.kind` (optional); labels for original, translation and "real instructions" in both dictionaries.

**Changed**
- SOURCES.md: origin of the excerpt (Autoria project, 10/11/2026), the API caveat, and the rule that its text evolved after the 1st job.
- ROADMAP: Part 20 done; the numbers of the 2 deliveries (part A) stay pending until Gustavo brings the `.docx` files.
- The snippet test also scans the translation.

**Not changed**
- No new number on the site; card text ("the LLM interprets the manual") untouched.

**Verified**
- See the PR description.

## Docs — Handoff after Part 19 · 2026-11-09

- ROADMAP: Parts 18–19 done; handoff requested by Gustavo after 2 parts, to run the iFood intensive in fresh chats. New "Next" item 1: the iFood intensive until 16/11 (Part 20: Autoria prompt excerpt and client-side numbers; then the Support Agent card), coordinated in the Notion project `IFOOD`; the site's link is shared in the application on 16/11.

## Part 19 — Autoria checks as the code runs them; tools confirmed by Gustavo · 2026-11-09

**Changed**
- Autoria em Forma (card, case study, diagram): the 4 blocking checks run on the client's file and are separate from the 29 regression tests; the triage check is automated and does not block, and its list is reviewed by hand. New limitation: the 4 checks run one by one, blocking is a process rule (ADR-033).
- Resume PDFs replaced (EN/PT, still without the phone number): corrected Autoria line and the tools below.
- Experience: Teledata workflows with Microsoft Copilot, incidents in Jira, ITIL training of new technicians; MerkurIA WhatsApp customer-service bots (Make, then n8n; OpenAI API; WhatsApp API; Supabase).
- Skills: Claude (with connectors), OpenAI API, Microsoft Copilot, n8n and Make listed separately; "Engineering & tools" with CI, Supabase, WhatsApp API, Jira, Microsoft 365; "ServiceNow (learning)".
- SOURCES.md: Autoria re-check of 09/11/2026 and the tools confirmed by Gustavo.

**Verified**
- `npm run check`, `npm run build`; claims guard on both PDF texts; phone number absent from both PDFs; Playwright at 1440×900 and 390×844, dark and light, EN and PT.

## Part 18 — Resume PDFs and freelance entry · 2026-11-09

**Added**
- Resume PDFs in English and Portuguese (`public/resume/`), site versions without the phone number (ADR-032). The "Resume"/"Currículo" buttons in the hero and the profile card now appear and open the PDF in the page's language.
- Experience: "Freelance and independent projects" (Mar 2026 to present), the same entry as the resume, no client named.
- Tests: resume links point to existing files under 200 KB; a URL outside `/resume` is rejected.

**Changed**
- `profile.resumeUrl` is `{ en, pt }`; `experience.company` may be `{ en, pt }`.
- ROADMAP: resume moved from "Later" to "Done"; agreements recorded (hero counters kept for now, site text approved by Gustavo, `gustavorodrigues.vercel.app` is the final domain).

**Verified**
- `npm run check`, `npm run build`; PDF served as `application/pdf` with the security headers; Playwright at 1440×900 and 390×844, dark and light, EN and PT (buttons link to the right file, no horizontal scroll).

## Docs — Handoff after Part 17 · 2026-11-09

- ROADMAP: Parts 15–17 in "Done" (plus the items done outside this repo); "Next" starts at the hero counters, then the decision to share; new agreement recorded ("Now" must stay current, ADR-031).

## Part 17 — MerkurIA wording · 2026-11-09

**Changed**
- MerkurIA first highlight: "No formal title in a small team: worked on…" → "Led project management and the security and governance of client projects." (PT: "Liderei a gestão de projetos…"). Same facts; the role title "Co-founder" already sits above it, so the line no longer explains the absence of a title.

**Verified**
- `npm run check`, `npm run build`; Playwright on the Experience timeline (EN/PT).

## Part 16 — Autoria em Forma card leads with what was delivered · 2026-11-09

**Changed**
- Autoria em Forma status line (home card and case study): "2 complete jobs delivered (Oct and Nov 2026) · paused after a demand test without organic traction". It opened with "Launched… · paused…"; the facts are the same and "paused" stays in the badge and once in this line.
- ROADMAP: pre-sharing items done outside this repo recorded (GitHub photo, `ethical-ai-policy` README PR #1, stale branches deleted).

**Verified**
- `npm run check`, `npm run build`; Playwright on the featured card at 1440×900 and 390×844, dark and light, EN and PT.

## Part 15 — "Now": work, study, project · 2026-11-09

**Changed**
- "Now" is back (ADR-031, supersedes ADR-023), as a sub-section of About before Skills: three cards (Work: available now, link to Contact; Studying: SC-900 and Scrum Master; Project: Support Agent v2 triage, link to the repository).
- `now.ts`: items have a `kind` (`work`/`study`/`project`) and an optional link; at most one visible item per kind.
- Certifications "In progress": SC-900 replaces the generic Microsoft Learn track.
- SOURCES.md and ARCHITECTURE.md updated; unused "Planned" label removed.

**Added**
- Tests: one item per kind, duplicate kind rejected, project link points to a public repository on the site.

**Verified**
- `npm run check`, `npm run build`; Playwright at 1440×900 and 390×844, dark and light, EN and PT (no horizontal scroll); axe 0 violations on `/en` and `/pt`, dark and light.

## Docs — Handoff after Part 14 · 2026-11-09

- ROADMAP: Parts 12–14 and the docs-only PR #19 in "Done"; "Next" lists the remaining pre-sharing items; new agreements recorded (other repositories, GitHub settings only with explicit OK via Chrome, banned terms only as hashes with the plain list in Notion `PORTFOLIO-15`, kill stale local servers before Playwright).

## Part 14 — Support Agent tests (pre-sharing review) · 2026-11-09

**Changed**
- Support Agent card: new highlight "20 automated tests… CI (Python 3.10 and 3.13)"; the limitation "No automated tests yet" removed. SOURCES.md updated.

**Related (other repository)**
- `support-agent-governance-prototype` PR #1: 20 `unittest` tests pinning every governance rule and the published 10/6/4/3 results; GitHub Actions on Python 3.10 and 3.13; README without "Career Relevance".

**Verified**
- `npm run check`, `npm run build`; Playwright on the Projects card (EN/PT).

## Part 13 — Public repository hygiene before sharing · 2026-11-09

**Changed**
- Claims guard: specific terms stored as SHA-256 hashes (`findHashedTerm`), generic tone words unchanged; the snippets check does the same for its internal term (ADR-030).
- `SOURCES.md`, code comments and `ARCHITECTURE.md` state the rules without listing the banned terms; one sentence in ADR-007 and two CHANGELOG lines redacted (marked).
- README: path to `security-headers.ts` fixed.

**Added**
- `npm run claims:hash -- "term"` (`scripts/hash-term.ts`).
- Tests: matcher positive case, hash format, banned word in external text.
- ADR-030.

**Verified**
- `npm run check`, `npm run build`; a local one-off check confirmed the 17 original terms are still caught.

## Docs — Autoria em Forma numbers confirmed · 2026-11-09

- Gustavo confirmed, after the 2nd job, "14 real errors → rules (4 with automated tests)" and "111-item QA checklist in 12 stages". The site already shows them; SOURCES.md records the confirmation and the ROADMAP item is closed (it was the open point in ADR-027's consequences).

## Part 12 — ServiceNow bootcamp under Education & courses · 2026-11-09

**Changed**
- Shark in ServiceNow bootcamp (14th edition, 15 h, Shark Academy / Aoop, completed Oct 2026) added to Education & courses; the `pending_link` certification entry removed (ADR-029). Notion `PORTFOLIO-09` closed.
- SOURCES.md: certificate facts and the "course, not certification" rule.
- ARCHITECTURE.md: stale "Planned" table (Parts 10–11, already done) removed.

**Added**
- Test: ServiceNow/Shark never appears as a certification; the education entry exists.
- ADR-029.

**Verified**
- `npm run check`, `npm run build`.
- Playwright (1440×900 and 390×844, dark and light): Education & courses shows the bootcamp in EN and PT; Certifications unchanged.

## Docs — Handoff after Part 11 · 2026-11-09

- ROADMAP: Parts 9–11 and the live measurements moved to "Done"; "Next" is now: decide on sharing the link, confirm two Autoria em Forma numbers, ServiceNow certificate; Notion codes up to `PORTFOLIO-13`; notes on the Autoria repository and the new writing rules.

## Part 11 — Compact profile card on mobile · 2026-11-09

**Changed**
- Profile card below 1024 px: 80 px photo beside name, title and tagline; contact button and icons in one row (ADR-028). Desktop unchanged.
- Gap between card and content below `lg`: 64 → 40 px.

**Verified**
- `npm run check`, `npm run build`.
- Playwright + axe at 320/390/768/1440 px (dark and light, home and case study): 0 violations, no horizontal overflow; h1 top at 390×844 ≈ 324 px (was below the fold).

## Part 10 — Content review · 2026-11-09

**Added**
- Privacy page `/en/privacy` and `/pt/privacy` (LGPD: purposes, providers, legal basis, international transfer, rights), linked from the footer and the contact form; in the sitemap.
- Test: no em dashes in visible text; the claims guard now scans the dictionaries too.
- README: "Security, privacy and accessibility" table.
- ADR-027.

**Changed**
- Hero h1 (EN) "I BUILD AI / THAT IS / …"; new subtitle, card tagline and meta description (EN/PT).
- 26 em dashes replaced in content and dictionaries; page titles use `|`.
- Autoria em Forma: 2 complete jobs delivered; regression suite 29/29 (SOURCES.md updated).
- ROADMAP: old domain now redirects with 308 (done by Gustavo, checked through the Vercel API).

**Related (other repository)**
- `autoria-em-forma-pipeline` PR #1: "paused" notice on the service page; quote sending disabled.

**Verified**
- `npm run check`, `npm run build`.
- Playwright + axe on the new privacy page (320/390/1440 px, dark and light): 0 violations, no overflow; hero at 320/390/1440 px without overflow.

## Part 9 — Post-launch technical fixes · 2026-11-08

**Added**
- Localized 404 inside the site layout (`[lang]/not-found.tsx`), also for unmatched paths via a catch-all route (`[lang]/[...missing]`). Previously unmatched paths showed Next.js's default English page.
- schema.org `Person` JSON-LD on the home page (`src/lib/json-ld.ts`, tested), built only from `src/content`.
- Own icons: "GR" monogram favicon, `icon.png` (512) and `apple-icon.png` (180), replacing the `create-next-app` favicon.
- ADR-026.

**Fixed**
- Header no longer overflows at 320 px (WCAG 1.4.10 reflow): controls shrink below 380 px (30–32 px targets, above the 24 px minimum of WCAG 2.5.8).
- Theme on 404 pages: the stored theme is applied on mount when the `<head>` script didn't run (streamed 404).
- Heading order: the name in the profile card is no longer an `h2` before the page `h1`.

**Measured on the live site (2026-11-08, recorded in docs only — ADR-024)**
- Mozilla Observatory: B+ (80/100), 11/12 tests; the only failure is `'unsafe-inline'` (ADR-022).
- PageSpeed Insights `/en`: mobile 100/100/100/100 (LCP 1.7 s, CLS 0.015, TBT 10 ms); desktop 100/100/100/100 (LCP 0.3 s).
- Production headers match `security-headers.ts`; pages served from the CDN cache (`HIT`).

**Verified**
- `npm run check`, `npm run build`.
- Playwright + axe-core (WCAG 2.2 AA + best practices) on `/en`, `/pt`, the case study and both 404 types, at 320/390/1440 px, dark and light: 0 violations, no horizontal overflow, `h1` is the first heading.

## Docs — Handoff after Part 8 · 2026-11-05

- ROADMAP: parts #10–#12 moved to "Done"; next chat starts at "After launch" (large review, live measurements, content review, ServiceNow); Part 8 logged-out checks recorded.

## Part 8 — Publish · 2026-11-05

**Added**
- Vercel Web Analytics: `@vercel/analytics` 2 and `<Analytics />` in the root layout (cookie-less; same-origin script, CSP unchanged).
- Production domain `gustavorodrigues.vercel.app` added to the Vercel project.
- ADR-025: publish now; ServiceNow certificate and full content review move to after launch; the link is not shared until the post-launch review; Standard Protection.

**Changed**
- ROADMAP: Part 8 checklist and new "After launch" section; ARCHITECTURE: hosting, analytics, base URL.

**Verified**
- `npm run check`, `npm run build`.
- Playwright (`next start`): `/en` and `/pt/projects/autoria-em-forma`, desktop/mobile, dark/light: insights script present, no CSP violations. Locally the script returns 404 (it exists only on Vercel once analytics is enabled).
- Live-domain checks are recorded in the ROADMAP checklist after the deploy.

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
- `/en/projects/support-agent-governance-prototype` (no `page`) → 404. No internal path in the rendered HTML.


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
- Content model in `src/content/` with Zod schemas, filled from the briefing and the 29/10 content audit:
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
