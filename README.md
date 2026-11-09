# Gustavo Rodrigues | Portfolio

Personal portfolio: AI products and governance, shipped with evidence (tests, controls and documentation).

Live: https://gustavorodrigues.vercel.app

Built with Next.js 16, TypeScript and Tailwind CSS, deployed on Vercel. Bilingual (English / Português).

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en
npm run check      # lint + typecheck + tests + content report
npm run build
```

Requires Node.js 22+.

## How this site is built

| Document | What's in it |
|---|---|
| [docs/ROADMAP.md](docs/ROADMAP.md) | Status, working agreement and next steps |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Stack, folders, i18n, design tokens, quality gates |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Why each choice was made (ADRs) |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | What changed in each part of the build |
| [docs/CONTENT.md](docs/CONTENT.md) | How to edit content |
| [docs/SOURCES.md](docs/SOURCES.md) | What the site may and may not claim |

## Security, privacy and accessibility

How this site handles the things I write about. These are controls adopted in this codebase, not a certification of the site against any standard; each one points to where it is decided or tested.

| Area | What the site does | Where |
|---|---|---|
| HTTP security | CSP (`default-src 'self'`, `frame-ancestors 'none'`, `object-src 'none'`), HSTS with preload, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP | `security-headers.ts`, ADR-022 |
| Known trade-off | Scripts allow `'unsafe-inline'` so pages stay static and cached; Mozilla Observatory B+ (80/100) on 08/11/2026 | ADR-022, ADR-024 |
| Data minimization (LGPD) | The only personal data collected is what someone types in the contact form; analytics are cookie-less and aggregated; no tracking or advertising cookies | [`/en/privacy`](https://gustavorodrigues.vercel.app/en/privacy), ADR-021, ADR-027 |
| Transparency | Privacy page with purpose, providers (Formspree, Vercel), legal basis, international transfer and data-subject rights | `src/app/[lang]/privacy` |
| Content integrity | Every claim traces to a source; a claims guard (specific terms stored as hashes) fails the build on banned terms and the tests scan all visible text | `docs/SOURCES.md`, `src/content/claims.ts`, ADR-030 |
| CI | Lint, typecheck, tests, content check and build on every pull request; one part = one branch + one PR | `.github/workflows`, `docs/ROADMAP.md` |
| Accessibility | axe-core (WCAG 2.2 AA + best practices): 0 violations in both themes; no horizontal scroll at 320 px (WCAG 1.4.10); keyboard skip link; reduced motion respected | `docs/ARCHITECTURE.md` |
| Performance | PageSpeed Insights 100 in all four categories, mobile and desktop (08/11/2026) | `docs/CHANGELOG.md` |

Content lives in `src/content/` and is validated at build time: a certification without a verification link, a visible placeholder or a project without stated limitations fails the build.

Built with the help of Claude.
