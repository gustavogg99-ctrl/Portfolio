import type { ReactNode } from "react";
import { content } from "@/content";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { LanguageSwitch } from "./language-switch";
import { ProfileCard } from "./profile-card";
import { SiteNav, type NavSectionId } from "./site-nav";
import { ThemeToggle } from "./theme";

/**
 * Everything around the page content: skip link, sticky header, profile card
 * column and footer. Shared by the home page and project pages.
 *
 * `onHome` = nav links are in-page anchors (#projects); on other pages they
 * point back to the home page (/en#projects) and `active` is fixed.
 */
export function SiteShell({
  locale,
  dict,
  onHome,
  active,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  onHome: boolean;
  active?: NavSectionId;
  children: ReactNode;
}) {
  const other = locale === "en" ? "pt" : "en";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        {dict.a11y.skip}
      </a>

      <header className="sticky top-0 z-40 flex items-center justify-center gap-2 bg-background/80 px-4 py-3 backdrop-blur-md sm:py-4">
        <SiteNav
          labels={dict.nav}
          ariaLabel={dict.a11y.nav}
          hrefBase={onHome ? "" : `/${locale}`}
          fixedActive={onHome ? undefined : active}
        />
        <div className="flex items-center gap-2 sm:absolute sm:right-6">
          <LanguageSwitch
            target={other}
            label={dict.actions.switchLanguage}
            short={dict.actions.switchLanguageShort}
          />
          <ThemeToggle labels={{ toLight: dict.actions.toLight, toDark: dict.actions.toDark }} />
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-16 px-6 pt-6 pb-24 lg:flex-row lg:items-start lg:gap-20 lg:pt-10">
        <div className="w-full max-w-sm lg:sticky lg:top-28 lg:w-80 lg:shrink-0">
          <ProfileCard locale={locale} dict={dict} hrefBase={onHome ? "" : `/${locale}`} />
        </div>
        <main id="main" className="flex w-full min-w-0 flex-col gap-28">
          {children}
        </main>
      </div>

      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted">
        <p>
          {dict.footer.madeBy}{" "}
          <a
            href={content.profile.links.source}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            {dict.footer.source}
          </a>
        </p>
      </footer>
    </>
  );
}
