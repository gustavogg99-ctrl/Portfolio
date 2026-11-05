import { describe, expect, it } from "vitest";
import { contentSecurityPolicy, securityHeaders } from "../security-headers";

const directives = Object.fromEntries(
  contentSecurityPolicy.split(";").map((d) => {
    const [name, ...values] = d.trim().split(/\s+/);
    return [name, values];
  }),
);

describe("security headers (ADR-022)", () => {
  it("sends every expected header", () => {
    expect(securityHeaders.map((h) => h.key).sort()).toEqual(
      [
        "Content-Security-Policy",
        "Cross-Origin-Opener-Policy",
        "Permissions-Policy",
        "Referrer-Policy",
        "Strict-Transport-Security",
        "X-Content-Type-Options",
        "X-Frame-Options",
      ].sort(),
    );
  });

  it("keeps the CSP strict everywhere except inline scripts/styles", () => {
    expect(directives["default-src"]).toEqual(["'self'"]);
    expect(directives["object-src"]).toEqual(["'none'"]);
    expect(directives["frame-ancestors"]).toEqual(["'none'"]);
    expect(directives["base-uri"]).toEqual(["'self'"]);
    expect(directives["connect-src"]).toEqual(["'self'", "https://formspree.io"]);
    expect(directives["form-action"]).toEqual(["'self'", "https://formspree.io"]);
  });

  it("never allows eval, wildcards or other script origins in production", () => {
    expect(directives["script-src"]).toEqual(["'self'", "'unsafe-inline'"]);
    expect(contentSecurityPolicy).not.toMatch(/\*|unsafe-eval|https?:\/\/(?!formspree\.io)/);
  });

  it("uses a two-year HSTS with preload", () => {
    const hsts = securityHeaders.find((h) => h.key === "Strict-Transport-Security")!.value;
    expect(hsts).toMatch(/max-age=63072000/);
    expect(hsts).toMatch(/preload/);
  });
});
