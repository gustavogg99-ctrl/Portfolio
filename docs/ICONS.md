# Icons: sources and licenses

Logos and product names belong to their owners. They appear next to the matching skill in the About section only to name tools Gustavo uses (nominative use), in their original colors and without changes to the drawings. Files live in `public/icons/` and are registered in `src/content/skill-icons.ts`. A test fails if a file is unregistered, uncredited or unused. Standards, laws, concepts and soft skills get no logo, and no seal or certification mark is ever drawn.

The same set is used in the profile README (`gustavogg99-ctrl/gustavogg99-ctrl`, `docs/ICONS.md` there).

| File | Used for | Source | License |
|---|---|---|---|
| `claude.svg` | Claude | Lobe Icons (`claude-color.svg`) | MIT |
| `openai.svg` | OpenAI API | Lobe Icons | MIT |
| `copilot.svg` | Microsoft Copilot | Lobe Icons (`copilot-color.svg`) | MIT |
| `n8n.svg` | n8n | Lobe Icons (`n8n-color.svg`) | MIT |
| `make.svg` | Make | Lobe Icons (`make-color.svg`) | MIT |
| `microsoft-365.svg` | Microsoft 365 | Lobe Icons (`microsoft-color.svg`, the Microsoft logo) | MIT |
| `python.svg` | Python | Devicon 2.18.0 (`python-original.svg`) | MIT |
| `supabase.svg` | Supabase | Devicon (`supabase-original.svg`) | MIT |
| `nextjs.svg` | Next.js | Devicon (`nextjs-original.svg`) | MIT |
| `jira.svg` | Jira | Devicon (`jira-original.svg`) | MIT |
| `vercel.svg` | Vercel | Simple Icons 16.38.1 | CC0 |
| `cloudflare-workers.svg` | Cloudflare Workers | Simple Icons (`cloudflareworkers.svg`) | CC0 |
| `github-actions.svg` | CI (GitHub Actions) | Simple Icons (`githubactions.svg`) | CC0 |
| `whatsapp.svg` | WhatsApp API | Simple Icons | CC0 |
| `copilot-studio.png` | Copilot Studio | Microsoft product logo, supplied by the site owner; resized to 96×96 | Trademark of Microsoft; used only to name the tool |
| `power-automate.png` | Power Automate | Microsoft product logo (2020 version), supplied by the site owner; background made transparent, resized to 96×96 | Trademark of Microsoft; used only to name the tool |
| `servicenow.png` | ServiceNow | ServiceNow logo mark, supplied by the site owner; resized to 96×96 | Trademark of ServiceNow; used only to name the tool |

## Notices

- **Lobe Icons** (MIT, Copyright (c) LobeHub): https://github.com/lobehub/lobe-icons/blob/master/LICENSE
- **Devicon** (MIT, Copyright (c) 2015 konpa): https://github.com/devicons/devicon/blob/master/LICENSE
- **Simple Icons** (CC0 1.0): https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md

## Raster logos

The three vendor logos (`copilot-studio.png`, `power-automate.png`, `servicenow.png`) are PNGs, not SVGs: the white background of the supplied JPEGs was made transparent, the image was cropped to the mark and resized. Replace them with the vendors' official SVGs if they become available.

## Display

Logos sit on a small light tile (`--logo-tile`, same in both themes) so the dark marks (OpenAI, Next.js, Vercel) stay readable on the dark theme. They are decorative (`alt=""`); the skill name next to them is the accessible content. Recoloring to match the palette was rejected: it would alter the drawings (ADR-050).

## Adding a logo

1. Put the file in `public/icons/` and add a row above (source, version, license).
2. Add the id to `skillIconIds` in `src/content/schema.ts` and the file to `src/content/skill-icons.ts`.
3. Set `icons: ["id"]` on the skill item in `src/content/skills.ts`. Only for tools the site already claims.
4. `npm run check`.
