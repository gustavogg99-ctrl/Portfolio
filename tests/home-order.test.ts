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

describe("Support Agent case page (ADR-043)", () => {
  const sa = content.projects.find((p) => p.slug === "support-agent-governance-prototype")!;

  it("has a case page, so its card links to it", () => {
    expect(sa.page).toBeDefined();
  });

  it("keeps a person in the loop and the simulated send in the diagram", () => {
    const kinds = sa.page!.architecture.main.map((s) => s.kind);
    expect(kinds.at(-1)).toBe("human");
    expect(kinds.filter((k) => k === "guard").length).toBeGreaterThanOrEqual(3);
    expect(sa.page!.architecture.outputs.map((o) => o.en).join(" ")).toMatch(/simulated send/i);
  });

  it("never claims production use or a full injection defence", () => {
    const text = JSON.stringify(sa.page).toLowerCase();
    for (const bad of ["in production", "em produção", "protected against prompt injection", "real tickets", "chamados reais"]) {
      expect(text).not.toContain(bad);
    }
  });
});
