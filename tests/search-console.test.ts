import { existsSync, readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/** Google Search Console ownership file (ADR-046): one file, exact content, served from the root. */
describe("Search Console verification file (ADR-046)", () => {
  const files = readdirSync("public").filter((f) => /^google[0-9a-f]+\.html$/.test(f));

  it("has exactly one verification file", () => {
    expect(files).toHaveLength(1);
  });

  it("contains only Google's verification line for its own name", () => {
    const [name] = files;
    expect(readFileSync(`public/${name}`, "utf8").trim()).toBe(`google-site-verification: ${name}`);
  });

  it("is not caught by the locale proxy (paths with an extension are skipped)", () => {
    const proxy = readFileSync("src/proxy.ts", "utf8");
    expect(proxy).toContain('matcher: ["/((?!_next|.*\\\\..*).*)"]');
    expect(existsSync("public/robots.txt")).toBe(false); // robots comes from src/app/robots.ts
  });
});
