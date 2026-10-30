# Gustavo Rodrigues — Portfolio

Personal portfolio: I build AI-powered products that are secure, tested and auditable.

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
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Stack, folders, i18n, design tokens, quality gates |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Why each choice was made (ADRs) |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | What changed in each part of the build |
| [docs/CONTENT.md](docs/CONTENT.md) | How to edit content |
| [docs/SOURCES.md](docs/SOURCES.md) | What the site may and may not claim |

Content lives in `src/content/` and is validated at build time: a certification without a verification link, a visible placeholder or a project without stated limitations fails the build.

Built with the help of Claude.
