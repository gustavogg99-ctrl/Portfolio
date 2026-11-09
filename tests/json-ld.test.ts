import { describe, expect, it } from "vitest";
import { content } from "@/content";
import { personJsonLd, serializeJsonLd } from "@/lib/json-ld";

describe("Person JSON-LD (ADR-026)", () => {
  for (const locale of ["en", "pt"] as const) {
    it(`uses only content facts (${locale})`, () => {
      const data = personJsonLd(locale);
      expect(data["@type"]).toBe("Person");
      expect(data.name).toBe(content.profile.name);
      expect(data.jobTitle).toBe(content.profile.title[locale]);
      expect(data.sameAs).toEqual([
        content.profile.links.linkedin,
        content.profile.links.github,
        content.profile.links.blog,
      ]);
      expect(data.url.endsWith(`/${locale}`)).toBe(true);
    });
  }

  it("cannot close the script tag early", () => {
    expect(serializeJsonLd({ x: "</script><script>alert(1)</script>" })).not.toContain("<");
  });
});
