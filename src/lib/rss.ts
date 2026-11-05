import { findBannedClaim } from "@/content/claims";

/** One post as shown in the Writing section. */
export type BlogPost = {
  title: string;
  url: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
};

type FeedItem = BlogPost & { categories: string[] };

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

/** Decodes the XML/HTML entities WordPress puts in titles (&#8217;, &amp;, …). */
export function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : match;
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? match;
  });
}

function tag(xml: string, name: string): string[] {
  const re = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "g");
  return [...xml.matchAll(re)].map((m) =>
    decodeEntities(m[1].replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, "$1").trim()),
  );
}

/** Minimal RSS 2.0 parser: enough for a WordPress feed, no dependency. */
export function parseFeed(xml: string): FeedItem[] {
  return [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/g)].flatMap(([, item]) => {
    const [title] = tag(item, "title");
    const [url] = tag(item, "link");
    const [pubDate] = tag(item, "pubDate");
    const time = Date.parse(pubDate ?? "");
    if (!title || !url?.startsWith("https://") || Number.isNaN(time)) return [];
    return [{ title, url, date: new Date(time).toISOString().slice(0, 10), categories: tag(item, "category") }];
  });
}

/**
 * Newest posts in one language: right category, not hidden, title passes the
 * claims guard (unless explicitly allowed). Newest first, at most `max`.
 */
export function selectPosts(
  items: FeedItem[],
  {
    category,
    hidden,
    allowed = [],
    max,
  }: { category: string; hidden: readonly string[]; allowed?: readonly string[]; max: number },
): BlogPost[] {
  return items
    .filter((i) => i.categories.includes(category))
    .filter((i) => !hidden.includes(i.url))
    .filter((i) => allowed.includes(i.url) || findBannedClaim(i.title) === null)
    .toSorted((a, b) => b.date.localeCompare(a.date))
    .slice(0, max)
    .map(({ title, url, date }) => ({ title, url, date }));
}
