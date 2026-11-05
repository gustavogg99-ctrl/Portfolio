/**
 * Absolute base URL for metadata, Open Graph, sitemap and robots.
 * On Vercel, VERCEL_PROJECT_PRODUCTION_URL is the production domain (system
 * env var, available at build time) — previews also point their canonical URLs
 * at production, which is what search engines should index. Locally: localhost.
 * Replace with the custom domain when there is one (ROADMAP "Later").
 */
export const SITE_URL = new URL(
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
);

/** Absolute URL for a path. */
export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();
