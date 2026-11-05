import { cacheLife } from "next/cache";
import { content } from "@/content";
import type { Locale } from "@/i18n/config";
import { parseFeed, selectPosts, type BlogPost } from "./rss";

/**
 * Latest posts for one locale, fetched from the blog's RSS feed on the server
 * and cached: refreshed in the background about once an hour (ADR-020).
 * Any failure (network, timeout, bad XML) returns [] and the section shows
 * only the "See all posts" link — the page never breaks because of the blog.
 */
export async function getLatestPosts(locale: Locale): Promise<BlogPost[]> {
  "use cache";
  const { blog } = content;
  try {
    const res = await fetch(blog.feedUrl, {
      headers: { accept: "application/rss+xml, application/xml" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`feed ${res.status}`);
    const posts = selectPosts(parseFeed(await res.text()), {
      category: blog.category[locale],
      hidden: blog.hidden,
      allowed: blog.allowed,
      max: blog.max,
    });
    cacheLife("hours");
    return posts;
  } catch {
    // Retry sooner than a successful result, so a short outage doesn't stick for an hour.
    cacheLife("minutes");
    return [];
  }
}
