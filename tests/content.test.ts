import { describe, expect, it } from "vitest";
import { content } from "@/content";
import { validateContent } from "@/content/validate";

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

describe("claims guard (docs/SOURCES.md)", () => {
  const all = JSON.stringify(content);

  it.each([
    "Gustavo Henrique",
    "COBIT 2019",
    "EXIN",
    "100K",
    "1.500+",
    "1,500+",
    "NTT DATA",
    "Maturidade Digital",
    "Digital Maturity",
    "BIRD",
    "/painel",
  ])("never contains %s", (term) => {
    expect(all).not.toContain(term);
  });

  it.each(["specialist", "especialista", "expert", "senior", "sênior", "passionate", "apaixonado"])(
    "never uses the word %s",
    (word) => {
      expect(all.toLowerCase()).not.toContain(word);
    },
  );
});
