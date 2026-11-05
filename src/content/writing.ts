import type { Blog } from "./schema";

/**
 * Writing section: the newest posts of ggblog99.wordpress.com in the page's
 * language, read from the RSS feed and refreshed about every hour (ADR-020).
 *
 * - Each post on the blog is in the "English" or "Português" category.
 * - Only title and date are shown. Titles that hit the claims guard
 *   (src/content/claims.ts) are skipped automatically.
 * - To hide a specific post, add its URL to `hidden`.
 * - `allowed`: posts reviewed by Gustavo that may show even if the title trips
 *   the guard. Only for wording that is not a claim (ADR-020).
 */
export const blog = {
  feedUrl: "https://ggblog99.wordpress.com/feed/",
  home: {
    en: "https://ggblog99.wordpress.com/category/english/",
    pt: "https://ggblog99.wordpress.com/",
  },
  category: { en: "English", pt: "Português" },
  max: 3,
  hidden: [],
  allowed: [
    // ServiceNow bootcamp (Aoop / NTT DATA): about the bootcamp, not employment.
    // Reviewed by Gustavo on 05/11/2026.
    "https://ggblog99.wordpress.com/2026/11/04/servicenow-bootcamp-all-nighter/",
    "https://ggblog99.wordpress.com/2026/11/04/bootcamp-servicenow-madrugada/",
  ],
} satisfies Blog;
