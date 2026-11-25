import type { SkillIconId } from "./schema";

/**
 * Logo files served from `public/icons/`. Sources and licenses: docs/ICONS.md.
 * The record type forces one file per id in `skillIconIds`; a test checks the files exist and are credited.
 */
export const skillIconFiles = {
  claude: "claude.svg",
  openai: "openai.svg",
  copilot: "copilot.svg",
  "copilot-studio": "copilot-studio.png",
  n8n: "n8n.svg",
  make: "make.svg",
  "power-automate": "power-automate.png",
  python: "python.svg",
  supabase: "supabase.svg",
  whatsapp: "whatsapp.svg",
  "cloudflare-workers": "cloudflare-workers.svg",
  nextjs: "nextjs.svg",
  vercel: "vercel.svg",
  jira: "jira.svg",
  "microsoft-365": "microsoft-365.svg",
  servicenow: "servicenow.png",
  "github-actions": "github-actions.svg",
} satisfies Record<SkillIconId, string>;
