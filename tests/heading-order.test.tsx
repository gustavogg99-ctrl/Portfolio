import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { content } from "@/content";
import { Deliveries } from "@/components/deliveries";
import en from "@/i18n/dictionaries/en.json";
import type { Dictionary } from "@/i18n/dictionaries";

/** Heading order on the case page (Part 34): the deliveries block sits under an h2. */
describe("heading order of the deliveries block (Part 34)", () => {
  const deliveries = content.projects.find((p) => p.deliveries)?.deliveries;

  it("has a project with deliveries", () => {
    expect(deliveries).toBeDefined();
  });

  it("renders job headings at the requested level", () => {
    const props = { deliveries: deliveries!, locale: "en" as const, dict: en as Dictionary };
    const asCase = renderToStaticMarkup(<Deliveries {...props} headingLevel={3} />);
    const asCard = renderToStaticMarkup(<Deliveries {...props} />);
    expect(asCase).toContain("<h3");
    expect(asCase).not.toContain("<h4");
    expect(asCard).toContain("<h4");
    expect(asCard).not.toContain("<h3");
  });

  it("asks for h3 on the case page, where the block heading is an h2", () => {
    const page = readFileSync("src/app/[lang]/projects/[slug]/page.tsx", "utf8");
    expect(page).toMatch(/<h2 id="deliveries"[\s\S]{0,200}<Deliveries[^>]*headingLevel=\{3\}/);
  });
});
