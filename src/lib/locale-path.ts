import { hasLocale, type Locale } from "@/i18n/config";

/**
 * Returns the same path in another locale.
 * "/en/projects/x" + "pt" → "/pt/projects/x"; "/" + "pt" → "/pt".
 */
export function swapLocale(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && hasLocale(segments[0])) segments.shift();
  return `/${[target, ...segments].join("/")}`;
}
