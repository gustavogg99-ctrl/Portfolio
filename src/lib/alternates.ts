import type { Metadata } from "next";
import { htmlLang, locales, defaultLocale, type Locale } from "@/i18n/config";

/**
 * Canonical + hreflang alternates for a path that exists in every locale.
 * `path` is the part after the locale ("" for home, "/projects/x").
 * x-default points to English (ADR-003).
 */
export function alternatesFor(locale: Locale, path = ""): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}${path}`])),
      "x-default": `/${defaultLocale}${path}`,
    },
  };
}
