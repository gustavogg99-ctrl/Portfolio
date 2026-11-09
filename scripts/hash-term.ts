import { hashTerm } from "../src/content/claims";

// Usage: npm run claims:hash -- "term"  → prints the line to paste in src/content/claims.ts (ADR-030).
const term = process.argv.slice(2).join(" ");
if (!term) {
  console.error('Usage: npm run claims:hash -- "term"');
  process.exit(1);
}
const { length, sha256 } = hashTerm(term);
console.log(`  { length: ${length}, sha256: "${sha256}" },`);
