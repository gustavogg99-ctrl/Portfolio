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
  const code = content.snippets.map((s) => `${s.code}\n${s.translation ?? ""}`).join("\n").toLowerCase();

  it("never contains an internal term (hashed, ADR-030)", () => {
    expect(findHashedTerm(code, SNIPPET_TERM_HASHES)).toBeNull();
  });

  it.each(["wrangler", "password", "senha", "secret", "token", "api_key", "apikey", "http://", "https://", "/home/", "c:\\"])(
    "never contains %s",
    (term) => {
      expect(code).not.toContain(term);
    },
  );

  it("labels the Autoria instructions as project instructions, never as a prompt sent to a model (ADR-034)", () => {
    const s = content.snippets.find((x) => x.id === "aef-project-instructions")!;
    expect(s.kind).toBe("instructions");
    expect(s.translation).toBeTruthy();
    for (const loc of ["en", "pt"] as const) {
      const shown = `${s.title[loc]} ${s.explanation[loc]}`.toLowerCase();
      expect(shown).not.toMatch(/prompt|api/);
      expect(s.fidelity[loc].toLowerCase()).toContain("api");
    }
  });

  it("publishes only the agreed numbers of the 2 real Autoria jobs, as accepted by the client (ADR-035)", () => {
    const d = content.projects.find((p) => p.slug === "autoria-em-forma")!.deliveries!;
    expect(d.jobs.map((j) => [j.versions, j.changes, j.comments])).toEqual([
      [3, 87, 14],
      [1, 69, 31],
    ]);
    // Only these three numbers per job (no check results, triage items or comment prefixes).
    for (const j of d.jobs) expect(Object.keys(j).sort()).toEqual(["changes", "comments", "label", "versions"]);
    const shown = JSON.stringify(d).toLowerCase();
    // Client acceptance, never the university's approval; nothing about checks, triage or prefixes.
    expect(shown).not.toMatch(/approved|aprovad(o|a)s?\b|block|bloque|triage|triagem|prefix|\[regra\]/);
    expect(shown).toMatch(/accepted/);
    expect(shown).toMatch(/aceito/);
  });

  it("publishes the timed test as n=1 on a fictional document, with its limitations and no hours-saved claim (ADR-037)", () => {
    const t = content.projects.find((p) => p.slug === "autoria-em-forma")!.timedTest!;
    // The case page only: the card stays as it is.
    expect(content.projects.filter((p) => p.timedTest).map((p) => p.slug)).toEqual(["autoria-em-forma"]);
    expect(t.limitations).toHaveLength(8);
    expect(t.rows[0].byHand.en).toContain("4 h 56 min 45 s");
    expect(t.rows[0].pipeline.en).toContain("18 min 20 s");
    expect(t.rows[0].pipeline.en).toContain("3 min 45 s");
    for (const loc of ["en", "pt"] as const) {
      const shown = JSON.stringify(t, (_k, v) => (v && typeof v === "object" && loc in v ? v[loc] : v)).toLowerCase();
      expect(shown).toMatch(/n = 1/);
      expect(shown).toMatch(loc === "en" ? /fictional/ : /fictício/);
      // Never a time-saving claim, and no institution or course of the real jobs.
      expect(shown).not.toMatch(/faster|mais rápido|times? faster|vezes mais/);
      // "hours saved" appears only inside the explicit denial.
      const { notConcluded, ...rest } = t;
      expect(JSON.stringify(rest, (_k, v) => (v && typeof v === "object" && loc in v ? v[loc] : v)).toLowerCase()).not.toMatch(
        /hours saved|horas economizadas/,
      );
      expect(notConcluded[loc].toLowerCase()).toMatch(loc === "en" ? /not concluding hours saved/ : /não concluo horas economizadas/);
      expect(shown).not.toMatch(/iesb|jornalismo|journalism/);
    }
    expect(t.notConcluded.en).toContain("not concluding hours saved");
  });

  it("Support Agent card states only what its repository README proves, with its limitations (ADR-036)", () => {
    const p = content.projects.find((x) => x.slug === "support-agent-governance-prototype")!;
    const repo = "https://github.com/gustavogg99-ctrl/support-agent-governance-prototype";
    expect(p.links.repo).toBe(repo);
    expect(p.links.results).toBe(`${repo}#8-llm-triage-with-guardrail-results`);
    const en = JSON.stringify([p.highlights, p.guardrails, p.limitations].map((a) => a.map((x) => x.en))).toLowerCase();
    // Numbers from results/eval_results.json (run of 10/11/2026, repository PR #7).
    for (const n of ["28/30", "9/30", "8/21", "1/21", "0/21", "3/21", "4 of the 9", "84 automated tests", "0.00016", "0.0032"]) {
      expect(en).toContain(n);
    }
    // Limitations declared in both languages: synthetic data, no full injection defence, no masking before the API.
    for (const loc of ["en", "pt"] as const) {
      const lim = p.limitations.map((x) => x[loc]).join(" ").toLowerCase();
      expect(lim).toMatch(/sint[eé]tic|synthetic/);
      expect(lim).toMatch(/prompt injection|prompt-injection/);
      expect(lim).toMatch(/mascaramento|masking/);
    }
    // No claim that it works in production or on real tickets, and no stale "no LLM" line.
    const all = JSON.stringify(p).toLowerCase();
    expect(all).not.toMatch(/no llm|sem llm|production-ready|in production|em produ[cç][aã]o|ainda sem llm/);
  });

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
