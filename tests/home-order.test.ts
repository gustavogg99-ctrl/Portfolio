import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { content } from "@/content";
import { NAV_SECTIONS } from "@/components/site-nav";
import en from "@/i18n/dictionaries/en.json";
import pt from "@/i18n/dictionaries/pt.json";

/** Section ids in the order they appear in the home page source. */
function homeSectionOrder(): string[] {
  const source = readFileSync("src/app/[lang]/page.tsx", "utf8");
  return [...source.matchAll(/<Section id="([a-z]+)"/g)].map((m) => m[1]);
}

describe("home order and case links (ADR-042)", () => {
  it("shows projects right after the hero", () => {
    expect(homeSectionOrder().slice(0, 3)).toEqual(["home", "projects", "about"]);
  });

  it("orders the nav like the page", () => {
    expect(NAV_SECTIONS.map((s) => s.id)).toEqual(homeSectionOrder());
  });

  it("has a featured project with a case page for the hero shortcut", () => {
    const featured = content.projects.filter((p) => p.visible && p.featured);
    expect(featured).toHaveLength(1);
    expect(featured[0].page).toBeDefined();
  });

  it("names the case in the shortcut label in both languages", () => {
    for (const dict of [en, pt]) expect(dict.actions.featuredCase).toContain("{name}");
  });

  it("card anchors (project slugs) never clash with section ids", () => {
    const sections = new Set<string>(homeSectionOrder());
    for (const p of content.projects) expect(sections.has(p.slug)).toBe(false);
  });
});
