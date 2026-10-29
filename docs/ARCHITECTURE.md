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
| Tests | Vitest | 5 |
| Hosting | Vercel (planned, Part 8) | — |
| CI | GitHub Actions | — |

Runtime: Node.js 22+.

## Folder structure

```
src/
  app/
    [lang]/            ← every page lives under /en or /pt
      layout.tsx       ← root layout: <html lang>, fonts, metadata
      page.tsx         ← home page
    globals.css        ← design tokens (colors, fonts) + Tailwind
  content/             ← EVERYTHING about Gustavo. Edit here, not in components.
    schema.ts          ← Zod schemas = the rules content must follow
    validate.ts        ← extra rules (placeholders, duplicates, featured)
    index.ts           ← validated `content` export (the only import for components)
    profile.ts  experience.ts  education.ts  certifications.ts
    projects.ts  skills.ts  now.ts  writing.ts
  i18n/
    config.ts          ← locales, default locale, cookie name
    dictionaries.ts    ← loads UI strings for the current locale
    dictionaries/en.json, pt.json   ← UI strings (buttons, section titles)
  lib/
    localize.ts        ← l(text, locale), date formatting
  proxy.ts             ← redirects "/" and unprefixed paths to /en or /pt
scripts/check-content.ts   ← `npm run content:check`
tests/content.test.ts      ← content rules + claims guard
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

## Content rules (enforced by code)

| Rule | Where |
|---|---|
| A certification is shown only with a verification URL (`status: "verified"` requires `credentialUrl`) | `schema.ts` |
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
| 2 | Sidebar card, fixed navigation, theme and language switchers, responsive layout |
| 3–6 | Sections: hero, about, skills, projects (+ Autoria em Forma page), experience, certifications, now, writing, contact (Formspree) |
| 7 | Security headers (CSP, HSTS, etc.), Open Graph, sitemap, accessibility pass |
| 8 | Vercel deployment, cookie-less analytics, Observatory and Lighthouse measured on the live site |
