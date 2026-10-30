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
