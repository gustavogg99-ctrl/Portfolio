/**
 * Locale configuration — single source of truth for supported languages.
 * See docs/DECISIONS.md (ADR-003) for why English is the default.
 */
export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Cookie that remembers the visitor's explicit language choice. */
export const LOCALE_COOKIE = "locale";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** BCP 47 tags used in <html lang> and Open Graph. */
export const htmlLang: Record<Locale, string> = {
  en: "en",
  pt: "pt-BR",
};
