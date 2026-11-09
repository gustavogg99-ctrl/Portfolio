import { createHash } from "node:crypto";

/**
 * Claims guard (docs/SOURCES.md): text that must never appear on the site.
 * Used by tests/content.test.ts on our own content and at render time on
 * external text we don't control (blog post titles, ADR-020).
 *
 * Specific terms (names, organizations, numbers, internal paths) are stored only
 * as SHA-256 hashes, so this public repository enforces the rules without
 * publishing the terms themselves (ADR-030). The plain list lives in the
 * private project notes (Notion `PORTFOLIO-15`). To add one, run
 * `npm run claims:hash -- "the term"` and paste the output here.
 */
export type HashedTerm = { length: number; sha256: string };

/** Case-sensitive, matched anywhere in the text. */
export const BANNED_TERM_HASHES: readonly HashedTerm[] = [
  { length: 16, sha256: "e85604c81c75ffa04731e3e11ba6c5f326ff646e9bbe5b50c893177976c502e1" },
  { length: 10, sha256: "2e00a89ceac1ea72149202bbc6a713d2942ae876c60004be66947de6b403ec86" },
  { length: 4, sha256: "9cf8fee7e5e0a4aa4b7974005acace2355bafbd163cd793c0408dfbcd5877f53" },
  { length: 4, sha256: "02632190f562d26c72a5b5ace8526faf8bae1574c1fd9fa6ca158026f4468b8d" },
  { length: 6, sha256: "97f272b6c2ac7cafe0db3faa9d464a5855a27fc3b424d94603dc4ebbac6caf1a" },
  { length: 6, sha256: "b05b4ab7827d4401c7077ecd7d6ccaf45a8a2ae96a2782817374e4b39f8cf78e" },
  { length: 8, sha256: "6f6f554c35376310b22bf45fc7ae847fa8e8d126d8251250f3930bcca649f2fe" },
  { length: 18, sha256: "e066dd86c95ce0df09716b7678cab1119e6a44afce821689bf3786e84493bdde" },
  { length: 16, sha256: "e96a1511d59b44d71feeff924b1884a4f7f201face15434b72761534f19d3c2c" },
  { length: 4, sha256: "d92d4d0fe9fe4d443ff7257759fc4e048670eb73f6644dd34adcc854eba62d22" },
  { length: 7, sha256: "5c7dc1231d7f50e15259baff6d3871e304c230b514c3666b983e6c4b8ef3a08e" },
  { length: 12, sha256: "23f52ec35a799fec660cb6e056282aabc7d5a1bfae013af093dba7c839f740bc" },
  { length: 17, sha256: "db1da1d14dd980f564399e4313a67b5a46d2186ed71f28f3095d2eb409ae7069" },
  { length: 16, sha256: "c6732f9494967834d7e6dfc222c515dc33de988cf705b545bb04eef9791ce3a5" },
  { length: 14, sha256: "607438b5b3d691cc578d3038e903e7730b750caf02fe57787927ea36035e7306" },
  { length: 18, sha256: "2b08081af9cacacb5a4850890c69a7b5e2269de4ed757bf7e964e6c6c1dacd9a" },
  { length: 14, sha256: "4f16dcf52194ba6da9702c2782a1c715ae6ffb09d1574c16e8ee128cf4c1fefe" },
];

/** Internal terms that must never appear in the sanitized code excerpts (lower-case). */
export const SNIPPET_TERM_HASHES: readonly HashedTerm[] = [
  { length: 6, sha256: "58a5721f128cb5713668cafb2300391bc841a4f2e2568747b69fb7ff5e054d99" },
];

/** Generic words, matched case-insensitively. Public on purpose: they describe the tone, not a fact. */
export const BANNED_WORDS = [
  "specialist",
  "especialista",
  "expert",
  "senior",
  "sênior",
  "passionate",
  "apaixonado",
] as const;

export function hashTerm(term: string): HashedTerm {
  return { length: term.length, sha256: createHash("sha256").update(term, "utf8").digest("hex") };
}

/** Returns the first substring of `text` whose hash is in `list`, or null. */
export function findHashedTerm(text: string, list: readonly HashedTerm[]): string | null {
  const byLength = new Map<number, Set<string>>();
  for (const t of list) {
    if (!byLength.has(t.length)) byLength.set(t.length, new Set());
    byLength.get(t.length)!.add(t.sha256);
  }
  for (const [length, hashes] of byLength) {
    for (let i = 0; i + length <= text.length; i++) {
      const slice = text.slice(i, i + length);
      if (hashes.has(hashTerm(slice).sha256)) return slice;
    }
  }
  return null;
}

/** Returns the first banned term or word found in `text`, or null. */
export function findBannedClaim(text: string): string | null {
  const term = findHashedTerm(text, BANNED_TERM_HASHES);
  if (term) return term;
  const lower = text.toLowerCase();
  return BANNED_WORDS.find((w) => lower.includes(w)) ?? null;
}
