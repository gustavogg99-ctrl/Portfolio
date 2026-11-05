import type { Blog } from "./schema";

/**
 * Writing section: the newest posts of ggblog99.wordpress.com in the page's
 * language, read from the RSS feed and refreshed about every hour (ADR-020).
 *
 * - Each post on the blog is in the "English" or "Português" category.
 * - Only title and date are shown. Titles that hit the claims guard
 *   (src/content/claims.ts) are skipped automatically.
 * - To hide a specific post, add its URL to `hidden`.
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
} satisfies Blog;
