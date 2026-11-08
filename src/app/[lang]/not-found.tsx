import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { SectionTitle } from "@/components/section";
import { SiteShell } from "@/components/site-shell";

/**
 * 404 inside the site's own layout, in the language of the URL.
 * Rendered for notFound() (unknown project slug) and for unmatched paths
 * under /en or /pt. Next.js adds `noindex` automatically.
 */
export default async function NotFound() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.notFound;

  return (
    <SiteShell locale={locale} dict={dict} onHome={false}>
      <section className="flex flex-col gap-8" aria-labelledby="not-found-title">
        <p className="font-mono text-sm text-muted">404</p>
        <SectionTitle id="not-found-title" lines={t.heading} level={1} />
        <p className="max-w-prose text-lg text-muted">{t.text}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            {t.home}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href={`/${locale}#projects`}
            className="rounded-xl border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-surface-2"
          >
            {t.projects}
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
