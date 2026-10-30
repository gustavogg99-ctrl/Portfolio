import { content } from "@/content";
import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { LanguageSwitch } from "@/components/language-switch";
import { ProfileCard } from "@/components/profile-card";
import { Section } from "@/components/section";
import { SiteNav } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme";

/** Temporary placeholder for sections built in later parts. Removed as each part lands. */
function Building({ part, label }: { part: number; label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-8 font-mono text-sm text-muted">
      {label} {part}
    </div>
  );
}

export default async function Home() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const { profile } = content;
  const other = locale === "en" ? "pt" : "en";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        {dict.a11y.skip}
      </a>

      {/* Top bar: section nav (center) + language and theme (right). Sticky on every screen size. */}
      <header className="sticky top-0 z-40 flex items-center justify-center gap-2 bg-background/80 px-4 py-3 backdrop-blur-md sm:py-4">
        <SiteNav labels={dict.nav} ariaLabel={dict.a11y.nav} />
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
        {/* Left column: sticky profile card on large screens */}
        <div className="w-full max-w-sm lg:sticky lg:top-28 lg:w-80 lg:shrink-0">
          <ProfileCard locale={locale} dict={dict} />
        </div>

        {/* Right column: content */}
        <main id="main" className="flex w-full min-w-0 flex-col gap-28">
          <Section id="home">
            <Hero locale={locale} dict={dict} />
          </Section>

          <Section id="about" title={dict.sections.about}>
            <About locale={locale} dict={dict} />
          </Section>

          <Section id="projects" title={dict.sections.projects}>
            <Building part={4} label={dict.labels.building} />
          </Section>

          <Section id="experience" title={dict.sections.experience}>
            <Building part={5} label={dict.labels.building} />
          </Section>

          <Section id="certifications" title={dict.sections.certifications}>
            <Building part={5} label={dict.labels.building} />
          </Section>

          <Section id="writing" title={dict.sections.writing}>
            <Building part={6} label={dict.labels.building} />
          </Section>

          <Section id="contact" title={dict.sections.contact}>
            <Building part={6} label={dict.labels.building} />
          </Section>
        </main>
      </div>

      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted">
        <p>
          {dict.footer.madeBy}{" "}
          <a
            href={profile.links.source}
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
