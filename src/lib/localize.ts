import type { Locale } from "@/i18n/config";
import type { Localized } from "@/content/schema";

/** Picks the text for the current locale. */
export const l = (text: Localized, locale: Locale): string => text[locale];

const monthFormat: Record<Locale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" }),
  pt: new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric", timeZone: "UTC" }),
};

/** "2024-10" → "Oct 2024" / "out. de 2024". */
export function formatYearMonth(value: string, locale: Locale): string {
  const [year, month] = value.split("-").map(Number);
  return monthFormat[locale].format(new Date(Date.UTC(year, month - 1, 1)));
}

const dayFormat: Record<Locale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }),
  pt: new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }),
};

/** "2026-11-04" → "Nov 4, 2026" / "4 de nov. de 2026". */
export function formatDate(value: string, locale: Locale): string {
  return dayFormat[locale].format(new Date(`${value}T00:00:00Z`));
}
