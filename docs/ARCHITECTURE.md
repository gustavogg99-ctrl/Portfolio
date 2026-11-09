# Architecture

Personal portfolio of Gustavo Rodrigues. This document describes how the site is built **today**. When something changes, update this file in the same pull request.

## Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router, Cache Components) | 16.4 |
| UI | React | 19.3 |
| Language | TypeScript (strict) | 5 |
| Styling | Tailwind CSS (CSS-first config) | 4 |
| Content validation | Zod | 4 |
| Font | Geist Sans / Geist Mono, self-hosted (`geist` package) | — |
| Icons | lucide-react (+ GitHub mark from Simple Icons, CC0) | — |
| Tests | Vitest | 5 |
| Hosting | Vercel — `gustavorodrigues.vercel.app`; Standard Protection: production public, previews private (ADR-025) | — |
| Analytics | Vercel Web Analytics (`@vercel/analytics`), cookie-less, same-origin script | 2 |
| CI | GitHub Actions | — |

Runtime: Node.js 22+.

## Folder structure

```
src/
  app/
    [lang]/            ← every page lives under /en or /pt
      layout.tsx       ← root layout: <html lang>, fonts, metadata
      page.tsx         ← home page
      projects/[slug]/page.tsx ← case-study page (only projects with `page` in content)
      not-found.tsx    ← localized 404 inside the site shell (ADR-026)
      [...missing]/page.tsx ← catch-all → notFound(), so unmatched paths get that 404
      icon.png  apple-icon.png ← "GR" monogram (512 / 180)
    favicon.ico        ← "GR" monogram (16/32/48)
    globals.css        ← design tokens (colors, fonts) + Tailwind
  content/             ← EVERYTHING about Gustavo. Edit here, not in components.
    schema.ts          ← Zod schemas = the rules content must follow
    validate.ts        ← extra rules (placeholders, duplicates, featured)
    index.ts           ← validated `content` export (the only import for components)
    profile.ts  experience.ts  education.ts  certifications.ts
    projects.ts  skills.ts  now.ts  writing.ts (blog feed config)
    claims.ts          ← banned terms/words (claims guard), shared by tests and the blog filter
    snippets.ts        ← sanitized code excerpts from private repos
  i18n/
    config.ts          ← locales, default locale, cookie name
    dictionaries.ts    ← loads UI strings for the current locale
    dictionaries/en.json, pt.json   ← UI strings (buttons, section titles)
  components/
    profile-card.tsx   ← sticky "who am I" card (photo, title, CTA, socials)
    site-nav.tsx       ← sticky icon nav, highlights the section in view (client)
    theme.tsx          ← theme toggle + no-flash inline script (client)
    language-switch.tsx← EN ⇄ PT link, keeps #section, saves cookie (client)
    section.tsx        ← <Section> + two-tone <SectionTitle> (h2 or h3)
    site-shell.tsx     ← header + profile card column + footer, shared by all pages
    projects.tsx       ← featured card, project cards (native <details>), status/stack/links
    architecture-diagram.tsx ← ordered flow of boxes rendered from content (no image)
    code-block.tsx     ← code excerpt + explanation + fidelity note
    experience.tsx     ← work timeline + education and courses
    certifications.tsx ← verified certifications, in progress, and "Now"
    writing.tsx        ← newest blog posts (RSS) + link to the blog
    contact.tsx        ← contact intro, form and direct channels
    contact-form.tsx   ← Formspree form (client, AJAX + native fallback)
    hero.tsx           ← hero: typewriter title, headline, CTAs, counters
    typewriter.tsx     ← rotating words (client, reduced-motion aware)
    about.tsx          ← about text, quick facts, skills groups
    icons.tsx          ← GitHub / LinkedIn icons
  assets/
    profile.jpg        ← profile photo (cropped 4:5, 640×800, EXIF stripped)
  lib/
    localize.ts        ← l(text, locale), date formatting
    rss.ts             ← RSS parser + post selection (pure, tested)
    blog.ts            ← cached fetch of the blog feed ("use cache", hourly)
    locale-path.ts     ← swapLocale(path, locale)
    json-ld.ts         ← schema.org Person for the home page (ADR-026)
  proxy.ts             ← redirects "/" and unprefixed paths to /en or /pt
scripts/check-content.ts   ← `npm run content:check`
tests/content.test.ts      ← content rules + claims guard
tests/locale-path.test.ts  ← language switch path logic
tests/json-ld.test.ts      ← structured data uses only content facts
docs/                      ← this documentation
```

Two kinds of text, kept apart on purpose:

- **Content** (`src/content/*.ts`): facts about Gustavo — projects, experience, certifications. Each field holds both languages: `{ en, pt }`.
- **UI strings** (`src/i18n/dictionaries/*.json`): interface labels — "See projects", section titles.

## Internationalization

- Routes: `/en/...` and `/pt/...`. English is the default (ADR-003).
- `src/app/[lang]` is the root segment, so `lang` is a **root parameter**. Server code reads it with `next/root-params` (`getLocale()`), with no prop drilling.
- `generateStaticParams` in the root layout prerenders both languages at build time.
- `proxy.ts` (Next 16's replacement for `middleware.ts`):
  - path with a locale → passes through;
  - no locale → redirects to the language saved in the `locale` cookie, or `en`.
  - It does **not** guess from the browser language: a link opens in the same language for everyone.
- Unknown locales (`/xx`) are redirected to `/en/xx`, which returns 404.
- `pt.json` is type-checked against `en.json`: a missing key fails `npm run typecheck`.

## Design tokens

Defined once in `src/app/globals.css` as CSS variables and exposed to Tailwind via `@theme inline`. Components use `bg-surface`, `text-muted`, `border-border`, etc. — never hex codes.

| Token | Dark (default) | Light | Use |
|---|---|---|---|
| `--background` | `#0a0a0a` | `#fafafa` | page |
| `--surface` | `#141414` | `#ffffff` | cards |
| `--surface-2` | `#1c1c1c` | `#f2f2f2` | inputs, hover |
| `--border` | `#2a2a2a` | `#e0e0e0` | borders |
| `--foreground` | `#ededed` | `#0a0a0a` | text |
| `--muted` | `#8a8a8a` | `#5c5c5c` | secondary text |
| `--accent-from → --accent-to` | `#e5e5e5 → #9ca3af` | `#3f3f46 → #71717a` | silver/graphite gradient (`text-silver`) |

- Dark is the default. Light is applied with `<html data-theme="light">` (switcher in Part 2).
- `prefers-reduced-motion` disables animations globally.
- The profile photo stays in color (owner's choice), even though the palette is neutral.

## Page layout

```
┌──────────────── sticky header: icon nav (center) · EN/PT · theme (right) ────────────────┐
│                                                                                          │
│  ┌──────────────┐   #home        hero (I BUILD AI / SECURE_)                             │
│  │ profile card │   #about       ABOUT / ME                                              │
│  │ (sticky ≥lg) │   #projects    SELECTED / PROJECTS                                     │
│  │ photo, name  │   #experience  WORK / EXPERIENCE                                       │
│  │ title, CTA   │   #certifications                                                      │
│  │ socials      │   #writing                                                             │
│  └──────────────┘   #contact                                                             │
│                                                                                          │
└──────────────────────────── footer (credits + source code link) ─────────────────────────┘
```

- **≥ 1024px (lg):** two columns; the card is `position: sticky` and stays visible while the content scrolls.
- **< 1024px:** single column, card on top with a smaller photo, then the content.
- The header is sticky on every size, with a translucent blurred background; `scroll-padding-top` keeps section titles clear of it.
- Server Components by default. Only the nav, theme toggle and language switch are Client Components (they need the browser).

## Hero and About

- **Hero title** = static line + rotating word (`profile.hero`). The server renders the first word complete, so the page works without JavaScript and doesn't jump. The `Typewriter` client component then types/erases each word (≈90 ms per letter, 1.8 s hold).
- **Accessibility:** the visual title is `aria-hidden`; screen readers read one stable sentence ("I BUILD AI: SECURE, TESTED, AUDITABLE."). With `prefers-reduced-motion`, the first word stays still.
- **CTAs:** See projects (primary), Resume (only when `resumeUrl` is set), Contact.
- **Counters** come from `profile.stats`; each has an internal `evidence` note (ADR-007). Today there are two, both from infrastructure operations (ADR-024). The grid follows the number of counters (`STAT_COLUMNS` in `hero.tsx`: 2 → two columns, 3 → three, 4 → 2×2 then four on `xl`).
- **About:** paragraphs from `profile.about` + facts card (location, availability, languages).
- **Skills** (`#skills`, a sub-section of About, not in the nav): groups from `skills.ts` rendered as tags, no levels or percentages. Items are either a plain name (same in both languages, e.g. "ISO/IEC 27001") or `{ en, pt }` for descriptions.

## Projects

- **Home (`#projects`):** the featured project (one at most) gets a large card with status, status note, summary, scope, up to 4 highlights, stack and a "Read the case study" button. Other projects get cards whose details (problem, what I built, evidence, guardrails, limitations) open with a native `<details>` — no JavaScript.
- **Case-study page `/[lang]/projects/[slug]`:** only for projects that define `page` in content. Sections: scope, problem, what I built, architecture diagram, evidence, guardrails, code excerpts, limitations. Prerendered for both languages via `generateStaticParams`.
- **Architecture diagram** is data (`page.architecture`): ordered steps with a `kind` (`io`, `ai`, `code`, `guard`, `human`) that sets the visual style; AI steps are inverted so the reader sees where the LLM sits between controls.
- **Code excerpts** (`snippets.ts`) come from private repositories, sanitized at the source and re-checked here. Each has a `fidelity` note saying how it differs from the real code. A test scans all excerpts for secrets and internal terms.
- **Shared shell:** `SiteShell` renders the header, profile card and footer for every page. Off the home page, nav and "Contact" link back to `/{lang}#section`.
- **Known behavior (Next 16 + Cache Components):** `dynamicParams` is not available, so unknown slugs are rejected with `notFound()`. The first request to an unknown slug may return HTTP 200 with the not-found UI and `noindex`; later requests return 404. Acceptable: no content leaks and search engines don't index it.

## Experience, Certifications and Now

- **Experience (`#experience`):** vertical timeline, newest first; each company lists its roles with periods (`Present` when `end` is null) and highlights. Then **Education & courses** (`#education`, sub-section): degrees show "Expected", completed courses show "Completed".
- **Certifications (`#certifications`):** cards for `verified` items, newest first, each with a way to check it — a link to the credential page, or the issuer's portal plus the certificate number (`lookupId`, ADR-017). `pending_link` items are never rendered. `in_progress` items appear as chips.
- **Now (`#now`, sub-section of Certifications):** visible items from `now.ts` with an "In progress"/"Planned" tag and the `updated` month. Items already shown as certifications in progress are hidden there to avoid duplicates. With no visible item the sub-section is not rendered at all — the case today (ADR-023).
- Certification names are a plain string for official names or `{ en, pt }` for descriptions (same pattern as skills, ADR-014).

## Writing and Contact

- **Writing (`#writing`):** the server fetches the blog's RSS feed inside a `"use cache"` function (`cacheLife("hours")`; `"minutes"` after a failure) and shows the 3 newest posts in the page's language (category "English"/"Português"), title and date only. Titles that hit the claims guard are skipped unless their URL is in `blog.allowed`; `blog.hidden` suppresses a post. On any error only the "Read the blog" link renders (ADR-020).
- **Contact (`#contact`):** Formspree form posted with `fetch` (inline status, `aria-live`), native POST without JS, honeypot `_gotcha`, privacy notice; email and LinkedIn alongside. No phone (ADR-021).
- **CSP for Part 7:** `connect-src` and `form-action` must allow `https://formspree.io`. The blog fetch is server-side, so it needs nothing in the CSP.

## Theme

- Server always renders dark (`<html>` without `data-theme`).
- `THEME_SCRIPT` (inline, in `<head>`) reads `localStorage.theme` and sets `data-theme="light"` **before the first paint** — no flash. Only `"light"`/`"dark"` are accepted.
- The toggle reads the attribute via `useSyncExternalStore` + `MutationObserver`, so its icon always matches the screen.
- Pages stay statically prerendered (a cookie read on the server would make them dynamic). See ADR-009.
- The CSP allows inline scripts, so this script needs no hash (ADR-022).
- On a streamed 404 the `<head>` script is inserted by React and not run; `ThemeToggle` applies the stored theme on mount there (ADR-026).

## Security headers and SEO

- **Headers** (`security-headers.ts`, applied to every route in `next.config.ts`, tested in `tests/security-headers.test.ts`): CSP with `'unsafe-inline'` scripts/styles and everything else strict (ADR-022), HSTS 2 years + preload, `nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, COOP. `poweredByHeader: false`.
- **Base URL** (`src/lib/site-url.ts`): `VERCEL_PROJECT_PRODUCTION_URL` on Vercel (production domain `gustavorodrigues.vercel.app`), localhost otherwise. Previews point canonicals to production.
- **Analytics:** `<Analytics />` from `@vercel/analytics/next` in the root layout. Script and beacon on `/_vercel/insights/*` (same origin), so the CSP needs no change; no cookies. Enabled per project in the Vercel dashboard (ADR-025).
- **Metadata:** canonical + `hreflang` (en, pt-BR, x-default → en) on every page via `alternatesFor()`; Open Graph and Twitter card per locale.
- **Open Graph image:** `src/app/[lang]/opengraph-image.tsx`, 1200×630, prerendered per locale. Repeats the dark-theme hex values (ImageResponse can't read CSS variables) — the one exception to the tokens rule.
- **`/sitemap.xml`** (home + case-study pages, both languages, with alternates) and **`/robots.txt`** (allow all, sitemap link).
- **Structured data:** `Person` JSON-LD on the home page (`src/lib/json-ld.ts`), only facts from `src/content`; not executed, so no CSP change.
- **Icons:** own "GR" favicon, `icon.png` and `apple-icon.png` (static files; colors repeat the tokens, like the OG image).
- **404:** `[lang]/not-found.tsx` inside `SiteShell`, in the URL's language, `noindex`; a catch-all route sends unmatched paths there. Title = site title (ADR-026).
- **Measured on the live site (2026-11-08):** Observatory B+ (80/100, only `'unsafe-inline'`), PageSpeed 100 in all four categories on mobile and desktop. Docs only (ADR-024).

## Accessibility (baseline)

- "Skip to content" link is the first focusable element.
- Nav links have `aria-label` and `aria-current="location"` for the section in view; tooltips are visual only.
- Icon-only buttons have labels in both languages; language links carry `hreflang`/`lang`.
- Visible `:focus-visible` outline using the accent token; `prefers-reduced-motion` respected.
- Checked with axe-core (WCAG 2.2 AA + best practices) on the home page and the case study, dark and light: 0 violations (Part 7); again in Part 9 including the 404 page, at 320/390/1440 px.
- Reflow (WCAG 1.4.10): no horizontal scroll at 320 px; header controls shrink to 30–32 px below 380 px. The profile card's name is a `<p>` so the page `h1` is the first heading. Visible text is part of every accessible name (language switch); each page has one `h1`; heading levels don't skip.

## Content rules (enforced by code)

| Rule | Where |
|---|---|
| A certification is shown only with a verification URL (`status: "verified"` requires `credentialUrl`); `lookupId` must look like a printed certificate number (ADR-017) | `schema.ts` |
| Education has exactly one of `expectedEnd` / `completed` | `schema.ts` |
| A language-school course is never listed as a certification (ADR-018) | `tests/content.test.ts` |
| Hidden items (`visible: false`) stay in the repo but are never rendered | `validate.ts` |
| A visible item cannot contain a `[CONFIRMAR …]` placeholder | `validate.ts` |
| Every project must list at least one limitation | `schema.ts` |
| Every text field needs both `en` and `pt` | `schema.ts` |
| Unique project slugs; at most one featured project | `validate.ts` |
| Banned claims/words (e.g. "Gustavo Henrique", COBIT/EXIN as certs, MerkurIA numbers, "specialist", "expert") never appear | `tests/content.test.ts` |

Validation runs when `src/content/index.ts` is imported, so **invalid content fails the build** — a broken or dishonest claim cannot be deployed.

## Quality gates

`npm run check` locally, and the same steps in CI on every push/PR:

1. `npm run lint` — ESLint (Next.js core-web-vitals + TypeScript)
2. `npm run typecheck` — route types + `tsc --noEmit`
3. `npm test` — content rules and claims guard
4. `npm run content:check` — lists placeholders and hidden certifications
5. `npm run build` — production build

## Planned (not built yet)

| Part | Item |
|---|---|
| 10 | Content review (ROADMAP "After launch") |
| 11 | Design review: compact profile card on mobile |
