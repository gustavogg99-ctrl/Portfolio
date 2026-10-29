<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project rules (portfolio of Gustavo Rodrigues)

Read these before changing anything:

- `docs/SOURCES.md` — what may and may NOT be claimed. If a claim isn't backed there, don't add it.
- `docs/ARCHITECTURE.md` — structure, i18n, design tokens, quality gates. Update it in the same PR when you change any of them.
- `docs/DECISIONS.md` — add an ADR for every non-trivial decision.
- `docs/CHANGELOG.md` — add an entry for every part/PR.

Conventions:
- Facts about Gustavo live only in `src/content/` (both `en` and `pt`). Components import from `@/content`.
- Colors only via tokens in `src/app/globals.css`; never hard-coded hex in components.
- Run `npm run check` before committing. CI must be green before merge.
- One part = one branch + one pull request.
