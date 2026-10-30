/**
 * npm run content:check
 * Validates all content (same rules as the build) and lists placeholders
 * that still need real information. Hidden items may hold placeholders;
 * visible ones may not (the build fails).
 */
import { content } from "../src/content";
import { pendingPlaceholders } from "../src/content/validate";

const pending = pendingPlaceholders(content);
console.log("✔ Content is valid.");
if (pending.length) {
  console.log(`\n${pending.length} placeholder(s) pending (hidden items, not rendered):`);
  for (const p of pending) console.log(`  · ${p.path}: ${p.text}`);
}
const hiddenCerts = content.certifications.filter((c) => c.status === "pending_link");
if (hiddenCerts.length) {
  console.log(`\n${hiddenCerts.length} certification(s) hidden until a verification URL is added:`);
  for (const c of hiddenCerts) console.log(`  · ${c.name}`);
}
