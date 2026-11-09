import { describe, expect, it } from "vitest";
import { content } from "@/content";
import { validateContent } from "@/content/validate";
import { BANNED_TERM_HASHES, BANNED_WORDS, SNIPPET_TERM_HASHES, findBannedClaim, findHashedTerm, hashTerm } from "@/content/claims";
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

  it("never shows a bootcamp certificate of completion as a certification (ADR-029)", () => {
    const c = fresh();
    const names = c.certifications.map((x) => JSON.stringify(x.name).toLowerCase());
    expect(names.some((n) => n.includes("servicenow") || n.includes("shark"))).toBe(false);
    expect(c.education.some((e) => e.id === "servicenow-shark" && e.completed)).toBe(true);
  });

  it("Now shows exactly work, study and project, once each (ADR-031)", () => {
    const kinds = fresh().now.items.filter((i) => i.visible).map((i) => i.kind);
    expect(kinds.toSorted()).toEqual(["project", "study", "work"]);
  });

  it("rejects two visible Now items of the same kind", () => {
    const c = fresh();
    c.now.items.push({ ...c.now.items[0], id: "work-2" });
    expect(() => validateContent(c)).toThrow(/one visible item per kind/);
  });

  it("the Now project links to the public repository of a project on the site", () => {
    const c = fresh();
    const project = c.now.items.find((i) => i.kind === "project" && i.visible);
    const repos = c.projects.filter((p) => p.visible && !p.links.repoPrivate).map((p) => p.links.repo);
    expect(repos).toContain(project?.link?.href);
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

  it("never contains an internal term (hashed, ADR-030)", () => {
    expect(findHashedTerm(code, SNIPPET_TERM_HASHES)).toBeNull();
  });

  it.each(["wrangler", "password", "senha", "secret", "token", "api_key", "apikey", "http://", "https://", "/home/", "c:\\"])(
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

  it("never contains a banned term (hashed, ADR-030)", () => {
    expect(findHashedTerm(all, BANNED_TERM_HASHES)).toBeNull();
  });

  it("finds a hashed term anywhere in a text, case-sensitively", () => {
    const list = [hashTerm("Fake Corp"), hashTerm("42K")];
    expect(findHashedTerm("Worked at Fake Corp in 2020", list)).toBe("Fake Corp");
    expect(findHashedTerm("Reached R$42K", list)).toBe("42K");
    expect(findHashedTerm("worked at fake corp", list)).toBeNull();
  });

  it("stores only well-formed hashes", () => {
    for (const t of [...BANNED_TERM_HASHES, ...SNIPPET_TERM_HASHES]) {
      expect(t.sha256).toMatch(/^[0-9a-f]{64}$/);
      expect(t.length).toBeGreaterThan(0);
    }
  });

  it("flags a banned word in external text (blog titles)", () => {
    expect(findBannedClaim("I am an Expert in everything")).toBe("expert");
    expect(findBannedClaim("Notes from a bootcamp")).toBeNull();
  });

  it.each(BANNED_WORDS)(
    "never uses the word %s",
    (word) => {
      expect(all.toLowerCase()).not.toContain(word);
    },
  );
});

describe("resume PDFs (ADR-032)", () => {
  it("every resume link points to a file in public/", async () => {
    const { existsSync, statSync } = await import("node:fs");
    const { join } = await import("node:path");
    const urls = content.profile.resumeUrl;
    if (!urls) return;
    for (const url of [urls.en, urls.pt]) {
      const file = join(process.cwd(), "public", url);
      expect(existsSync(file), url).toBe(true);
      expect(statSync(file).size).toBeLessThan(200_000);
    }
  });

  it("rejects a resume URL outside /resume", () => {
    const c = fresh();
    c.profile.resumeUrl = { en: "https://example.com/cv.pdf", pt: "/resume/Curriculo.pdf" };
    expect(() => validateContent(c)).toThrow(/resume/);
  });
});
