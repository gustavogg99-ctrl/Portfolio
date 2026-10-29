# How to edit content

Everything about you lives in `src/content/`. You never need to touch components to change text.

## Quick workflow (from the browser)

1. On GitHub, open the file (e.g. `src/content/now.ts`) and click the pencil icon.
2. Edit. Keep both `en` and `pt`.
3. Commit to a new branch and open a pull request.
4. CI runs. If it's green, merge — Vercel publishes automatically (after Part 8).
   If it's red, the log says which rule was broken.

Locally: `npm run check` runs the same checks as CI.

## Common edits

| I want to… | File | What to do |
|---|---|---|
| Change headline, bio, counters | `profile.ts` | Edit the text. Counters need an `evidence` note. |
| Publish a certification | `certifications.ts` | Set `status: "verified"` and add `credentialUrl`. |
| Add a certification in progress | `certifications.ts` | `status: "in_progress"` (no URL). |
| Add a project | `projects.ts` | Copy an existing block. `limitations` is required. |
| Hide something without deleting | any | `visible: false` |
| Update "Now" | `now.ts` | Edit items and **update `updated`** (YYYY-MM). |
| Add a blog post | `writing.ts` | Follow the template in the file; needs EN and PT URLs. |
| Change a button or section title | `src/i18n/dictionaries/en.json` + `pt.json` | Same key in both files. |

## Placeholders

If you don't have a piece of information yet, write `[CONFIRMAR: what's missing]`. That's allowed only in hidden items (`visible: false` or certifications with `pending_link`). If a visible item has one, the build fails — on purpose.

`npm run content:check` lists every placeholder still pending.

## Before adding a claim

Check `docs/SOURCES.md`. If you can't link to evidence, don't publish it.
