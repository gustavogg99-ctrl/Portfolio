import { describe, expect, it } from "vitest";
import { decodeEntities, parseFeed, selectPosts } from "@/lib/rss";

/** Shape of a WordPress.com RSS feed (trimmed). */
const item = (title: string, link: string, date: string, categories: string[]) => `
  <item>
    <title>${title}</title>
    <link>${link}</link>
    <comments>${link}#respond</comments>
    <dc:creator><![CDATA[gg]]></dc:creator>
    <pubDate>${date}</pubDate>
    ${categories.map((c) => `<category><![CDATA[${c}]]></category>`).join("\n    ")}
    <description><![CDATA[<p>Excerpt that must not be used.</p>]]></description>
  </item>`;

const FEED = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel>
  <title>GG</title><link>https://ggblog99.wordpress.com</link>
  ${item("Bootcamp at Aoop and NTT DATA", "https://ggblog99.wordpress.com/2026/11/04/en/", "Wed, 04 Nov 2026 21:27:46 +0000", ["English", "servicenow"])}
  ${item("Bootcamp da Aoop e da NTT DATA", "https://ggblog99.wordpress.com/2026/11/04/pt/", "Wed, 04 Nov 2026 21:27:56 +0000", ["Português", "servicenow"])}
  ${item("Autoria em Forma: the side project that almost went open source", "https://ggblog99.wordpress.com/2026/10/26/en/", "Mon, 26 Oct 2026 15:31:21 +0000", ["English"])}
  ${item("Autoria em Forma: o side project que quase virou open source", "https://ggblog99.wordpress.com/2026/10/26/pt/", "Mon, 26 Oct 2026 15:31:30 +0000", ["Português"])}
  ${item("Why I started this blog &#038; how I built it", "https://ggblog99.wordpress.com/2026/10/20/en/", "Tue, 20 Oct 2026 17:58:14 +0000", ["English"])}
  ${item("Why I&#8217;m an expert now", "https://ggblog99.wordpress.com/2026/10/01/en/", "Thu, 01 Oct 2026 10:00:00 +0000", ["English"])}
  ${item("No link", "", "Thu, 01 Oct 2026 10:00:00 +0000", ["English"])}
</channel></rss>`;

describe("blog feed", () => {
  const items = parseFeed(FEED);

  it("parses title, link, date and categories, skipping items without a valid link", () => {
    expect(items).toHaveLength(6);
    expect(items[2]).toEqual({
      title: "Autoria em Forma: the side project that almost went open source",
      url: "https://ggblog99.wordpress.com/2026/10/26/en/",
      date: "2026-10-26",
      categories: ["English"],
    });
  });

  it("decodes entities in titles", () => {
    expect(decodeEntities("I&#8217;m &amp; you &#x2014; ok")).toBe("I’m & you — ok");
    expect(items[4].title).toBe("Why I started this blog & how I built it");
  });

  it("keeps only the page's language, newest first, and drops titles caught by the claims guard", () => {
    const en = selectPosts(items, { category: "English", hidden: [], max: 3 });
    expect(en.map((p) => p.url)).toEqual([
      "https://ggblog99.wordpress.com/2026/10/26/en/",
      "https://ggblog99.wordpress.com/2026/10/20/en/",
    ]);
    const pt = selectPosts(items, { category: "Português", hidden: [], max: 3 });
    expect(pt.map((p) => p.url)).toEqual(["https://ggblog99.wordpress.com/2026/10/26/pt/"]);
  });

  it("respects the hidden list and the maximum", () => {
    const en = selectPosts(items, {
      category: "English",
      hidden: ["https://ggblog99.wordpress.com/2026/10/26/en/"],
      max: 1,
    });
    expect(en.map((p) => p.url)).toEqual(["https://ggblog99.wordpress.com/2026/10/20/en/"]);
  });

  it("shows a post on the allow list even if its title trips the guard", () => {
    const en = selectPosts(items, {
      category: "English",
      hidden: [],
      allowed: ["https://ggblog99.wordpress.com/2026/11/04/en/"],
      max: 3,
    });
    expect(en.map((p) => p.url)).toEqual([
      "https://ggblog99.wordpress.com/2026/11/04/en/",
      "https://ggblog99.wordpress.com/2026/10/26/en/",
      "https://ggblog99.wordpress.com/2026/10/20/en/",
    ]);
  });

  it("never exposes the excerpt", () => {
    const [post] = selectPosts(items, { category: "English", hidden: [], max: 1 });
    expect(Object.keys(post).sort()).toEqual(["date", "title", "url"]);
  });

  it("returns nothing for garbage input", () => {
    expect(parseFeed("<html>not a feed</html>")).toEqual([]);
  });
});
