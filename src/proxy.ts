import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, defaultLocale, hasLocale, locales } from "@/i18n/config";

/**
 * Locale routing. Every page lives under /en or /pt.
 *
 * - Path already has a locale → pass through.
 * - No locale → redirect to the visitor's saved choice (cookie) or English.
 *
 * We deliberately do NOT auto-detect from Accept-Language: shared links must
 * open in the same language for everyone (ADR-003).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocalePrefix) return;

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = saved && hasLocale(saved) ? saved : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and any path with a file extension (favicon, images, PDFs).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
