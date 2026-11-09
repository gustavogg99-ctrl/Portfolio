import { describe, expect, it } from "vitest";
import { content } from "@/content";
import { validateContent } from "@/content/validate";
import { BANNED_TERMS, BANNED_WORDS } from "@/content/claims";
import en from "@/i18n/dictionaries/en.json";
import pt from "@/i18n/dictionaries/pt.json";

/** Deep copy so each test mutates its own version of the real content. */
const fresh = () => structuredClone(content);

describe("content rules", () => {
  it("current content is valid", () => {
    expect(() => validateContent(fresh())).not.toThrow();
  });

  it("rejects a verified certification without a credential URL", () => {
    const c = fresh();
    c.certifications.push({ id: "x", name: "Fake", issuer: "X", status: "verified" } as never);
    expect(() => validateContent(c)).toThrow(/credentialUrl/);
  });

  it("rejects a lookup id that is not a printed certificate number", () => {
    const c = fresh();
    c.certifications.push({
      id: "x", name: "Fake", issuer: "X", status: "verified",
      credentialUrl: "https://example.com/verify", lookupId: "not a number!",
    } as never);
    expect(() => validateContent(c)).toThrow(/Certificate number/);
  });

  it("requires exactly one of expectedEnd or completed in education", () => {
    const both = fresh();
    Object.assign(both.education[0], { completed: "2020-01" });
    expect(() => validateContent(both)).toThrow(/exactly one/);
    const none = fresh();
    delete (none.education[0] as { expectedEnd?: string }).expectedEnd;
    expect(() => validateContent(none)).toThrow(/exactly one/);
  });

  it("never shows a language-school course as a certification", () => {
    const names = fresh().certifications.map((c) => JSON.stringify(c.name).toLowerCase());
    expect(names.some((n) => n.includes("english") || n.includes("thomas jefferson"))).toBe(false);
  });

  it("rejects a placeholder in a visible item", () => {
    const c = fresh();
    c.projects[0].summary.en = "[CONFIRMAR: something]";
    expect(() => validateContent(c)).toThrow(/placeholder/);
  });

  it("allows a placeholder in a hidden item", () => {
    const c = fresh();
    c.projects[0].visible = false;
    c.projects[0].summary.en = "[CONFIRMAR: something]";
    expect(() => validateContent(c)).not.toThrow();
  });

  it("requires every project to state its limitations", () => {
    const c = fresh();
    c.projects[0].limitations = [];
    expect(() => validateContent(c)).toThrow(/limitations/);
  });

  it("requires both languages", () => {
    const c = fresh();
    (c.profile.headline as { pt?: string }).pt = "";
    expect(() => validateContent(c)).toThrow();
  });

  it("rejects duplicate project slugs", () => {
    const c = fresh();
    c.projects.push({ ...c.projects[0], featured: false });
    expect(() => validateContent(c)).toThrow(/duplicate slug/);
  });
});

describe("code snippets (sanitized excerpts from private repos)", () => {
  const code = content.snippets.map((s) => s.code).join("\n").toLowerCase();

  it.each(["painel", "wrangler", "password", "senha", "secret", "token", "api_key", "apikey", "http://", "https://", "/home/", "c:\\"])(
    "never contains %s",
    (term) => {
      expect(code).not.toContain(term);
    },
  );

  it("rejects a project page that points to a missing snippet", () => {
    const c = fresh();
    c.projects[0].page!.snippetIds.push("does-not-exist");
    expect(() => validateContent(c)).toThrow(/unknown snippet/);
  });
});

describe("claims guard (docs/SOURCES.md)", () => {
  // Dictionaries carry page text too (privacy page, meta descriptions), so they are scanned with the content.
  const all = JSON.stringify(content) + JSON.stringify(en) + JSON.stringify(pt);

  // Em dashes read as AI-generated text; use a colon, comma or period (Part 10).
  it("has no em dashes in visible text", () => {
    expect(all).not.toContain("\u2014");
  });

  it.each(BANNED_TERMS)("never contains %s", (term) => {
    expect(all).not.toContain(term);
  });

  it.each(BANNED_WORDS)(
    "never uses the word %s",
    (word) => {
      expect(all.toLowerCase()).not.toContain(word);
    },
  );
});
