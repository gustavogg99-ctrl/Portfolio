import { content } from "@/content";
import type { Locale } from "@/i18n/config";
import profilePhoto from "@/assets/profile.jpg";
import { absoluteUrl } from "./site-url";

/**
 * schema.org `Person` for the home page, so search engines connect the name
 * to the same person on LinkedIn, GitHub and the blog. Built only from
 * src/content (no claim that isn't already on the page). ADR-026.
 */
export function personJsonLd(locale: Locale) {
  const { profile } = content;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: profile.name,
    url: absoluteUrl(`/${locale}`),
    image: absoluteUrl(profilePhoto.src),
    jobTitle: profile.title[locale],
    description: profile.headline[locale],
    address: { "@type": "PostalAddress", addressLocality: "Brasília", addressRegion: "DF", addressCountry: "BR" },
    knowsLanguage: ["pt-BR", "en", "es"],
    sameAs: [profile.links.linkedin, profile.links.github, profile.links.blog],
  };
}

/** Serialize for a <script type="application/ld+json">; escapes "<" so no tag can close early. */
export const serializeJsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");
