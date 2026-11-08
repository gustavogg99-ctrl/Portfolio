import { notFound } from "next/navigation";

/**
 * Any path under /en or /pt that no other route matches lands here and
 * renders [lang]/not-found.tsx, so the 404 keeps the site's layout and the
 * URL's language. Without it, unmatched paths get Next.js's default 404.
 */
export async function generateStaticParams() {
  // Cache Components needs at least one param set; this one is never linked.
  return [{ missing: ["404"] }];
}

export default function MissingPage() {
  notFound();
}
