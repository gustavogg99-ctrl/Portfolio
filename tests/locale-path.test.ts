import { describe, expect, it } from "vitest";
import { swapLocale } from "@/lib/locale-path";

describe("swapLocale", () => {
  it.each([
    ["/en", "pt", "/pt"],
    ["/pt", "en", "/en"],
    ["/en/projects/autoria-em-forma", "pt", "/pt/projects/autoria-em-forma"],
    ["/", "pt", "/pt"],
    ["/projects", "en", "/en/projects"],
    ["/en/", "pt", "/pt"],
  ] as const)("%s → %s = %s", (from, to, expected) => {
    expect(swapLocale(from, to)).toBe(expected);
  });
});
