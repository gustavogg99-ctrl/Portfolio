"use client";

import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { swapLocale } from "@/lib/locale-path";

/**
 * Link to the same page in the other language. Saves the choice in a cookie
 * (read by proxy.ts for "/") and keeps the current #section.
 * A plain <a> on purpose: changing the [lang] root segment reloads the page anyway.
 */
export function LanguageSwitch({
  target,
  label,
  short,
}: {
  target: Locale;
  label: string;
  short: string;
}) {
  const pathname = usePathname();
  const href = swapLocale(pathname, target);

  return (
    <a
      href={href}
      hrefLang={target === "pt" ? "pt-BR" : "en"}
      lang={target === "pt" ? "pt-BR" : "en"}
      title={label}
      onClick={(event) => {
        document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; SameSite=Lax`;
        if (window.location.hash) {
          event.preventDefault();
          window.location.assign(href + window.location.hash);
        }
      }}
      className="grid h-8 min-w-8 place-items-center rounded-full border border-border bg-surface px-2 min-[380px]:h-10 min-[380px]:min-w-10 min-[380px]:px-3 font-mono text-xs font-medium text-foreground transition-colors hover:bg-surface-2"
    >
      {/* Visible text stays part of the accessible name (WCAG 2.5.3). */}
      {short}
      <span className="sr-only">, {label}</span>
    </a>
  );
}
