import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { content } from "@/content";
import { skillIconFiles } from "@/content/skill-icons";
import { skillIconIds } from "@/content/schema";

const root = resolve(__dirname, "..");
const credits = readFileSync(resolve(root, "docs/ICONS.md"), "utf8");
const used = content.skills.flatMap((g) => g.items.flatMap((i) => (typeof i === "object" && "icons" in i ? i.icons : [])));

describe("tool logos (ADR-050)", () => {
  it("every icon id has a file in public/icons/", () => {
    for (const id of skillIconIds) expect(existsSync(resolve(root, "public/icons", skillIconFiles[id])), id).toBe(true);
  });

  it("every file in public/icons/ is used and credited in docs/ICONS.md", () => {
    const files = readdirSync(resolve(root, "public/icons"));
    for (const f of files) {
      expect(Object.values(skillIconFiles), `${f} is not registered`).toContain(f);
      expect(credits, `${f} has no credit in docs/ICONS.md`).toContain(`\`${f}\``);
    }
  });

  it("every registered icon is used by at least one skill", () => {
    for (const id of skillIconIds) expect(used, id).toContain(id);
  });

  it("standards, concepts and soft skills never get a logo", () => {
    const noLogo = ["security-governance", "operations", "communication"];
    for (const g of content.skills.filter((g) => noLogo.includes(g.id))) {
      for (const item of g.items) expect(typeof item === "object" && "icons" in item, g.id).toBe(false);
    }
  });
});
