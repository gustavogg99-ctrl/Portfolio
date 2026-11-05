/**
 * Claims guard (docs/SOURCES.md): terms that must never appear on the site.
 * Used by tests/content.test.ts on our own content and at render time on
 * external text we don't control (blog post titles, ADR-020).
 */
export const BANNED_TERMS = [
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
  "3 free pilot",
  "3 entregas piloto",
  "after validation",
  "após validação",
  "5 automated checks",
  "5 verificações",
] as const;

/** Matched case-insensitively. */
export const BANNED_WORDS = [
  "specialist",
  "especialista",
  "expert",
  "senior",
  "sênior",
  "passionate",
  "apaixonado",
] as const;

/** Returns the first banned term or word found in `text`, or null. */
export function findBannedClaim(text: string): string | null {
  const term = BANNED_TERMS.find((t) => text.includes(t));
  if (term) return term;
  const lower = text.toLowerCase();
  return BANNED_WORDS.find((w) => lower.includes(w)) ?? null;
}
