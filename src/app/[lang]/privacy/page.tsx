import type { Metadata } from "next";
import { content } from "@/content";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { alternatesFor } from "@/lib/alternates";
import { SectionTitle } from "@/components/section";
import { SiteShell } from "@/components/site-shell";

/**
 * Privacy notice (Part 10, ADR-027): everything the site collects, why, who
 * processes it, legal basis and rights under the LGPD. Text lives in the
 * dictionaries so both languages stay side by side.
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary();
  const title = `${dict.privacy.metaTitle} — ${content.profile.name}`;
  const description = dict.privacy.metaDescription;
  return {
    title,
    description,
    alternates: alternatesFor(locale, "/privacy"),
    openGraph: { title, description, url: `/${locale}/privacy` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.privacy;
  const { email } = content.profile;

  return (
    <SiteShell locale={locale} dict={dict} onHome={false} active="contact">
      <article className="flex max-w-2xl flex-col gap-10">
        <header className="flex flex-col gap-6">
          <SectionTitle id="privacy-title" lines={t.title} level={1} />
          <p className="font-mono text-xs text-muted">{t.updated}</p>
          <p className="text-lg leading-relaxed text-foreground/90">{t.intro}</p>
        </header>

        {t.sections.map((section) => (
          <section key={section.heading} className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold tracking-tight">{section.heading}</h2>
            <ul className="flex list-disc flex-col gap-2 pl-5 leading-relaxed text-foreground/90 marker:text-muted">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}

        <p className="leading-relaxed text-foreground/90">
          {t.contact}{" "}
          <a href={`mailto:${email}`} className="underline underline-offset-4 hover:text-foreground">
            {email}
          </a>
        </p>
      </article>
    </SiteShell>
  );
}
