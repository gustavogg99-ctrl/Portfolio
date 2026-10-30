import type { Post } from "./schema";

/**
 * Latest blog post(s) from ggblog99.wordpress.com, linked in both languages.
 * Empty until Part 6 (needs the EN and PT URLs of the TCC-site post).
 *
 * Template:
 * {
 *   id: "slug",
 *   title: { en: "", pt: "" },
 *   summary: { en: "", pt: "" },
 *   published: "2026-10",
 *   url: { en: "https://…", pt: "https://…" },
 *   visible: true,
 * }
 */
export const posts = [] satisfies Post[];
