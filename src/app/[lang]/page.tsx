import Link from "next/link";
import { content } from "@/content";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { l } from "@/lib/localize";

/**
 * Part 1 placeholder. Proves that routing (/en, /pt), the design tokens and
 * the validated content are wired together. Replaced by the real layout in Part 2.
 */
export default async function Home() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const { profile, projects, experience } = content;
  const other = locale === "en" ? "pt" : "en";

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-24">
      <p className="font-mono text-sm text-muted">Part 1 · foundation</p>

      <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
        {l(profile.hero.static, locale)}
        <br />
        <span className="text-silver">{l(profile.hero.rotating[0], locale)}_</span>
      </h1>

      <p className="text-lg text-muted">{l(profile.headline, locale)}</p>

      <ul className="grid gap-3 sm:grid-cols-3">
        {profile.stats.map((s) => (
          <li key={s.evidence} className="rounded-xl border border-border bg-surface p-4">
            <span className="text-silver text-3xl font-bold">{l(s.value, locale)}</span>
            <p className="mt-1 text-sm text-muted">{l(s.label, locale)}</p>
          </li>
        ))}
      </ul>

      <p className="text-sm text-muted">
        {projects.filter((p) => p.visible).length} {dict.nav.projects.toLowerCase()} ·{" "}
        {experience.filter((e) => e.visible).length} {dict.nav.experience.toLowerCase()}
      </p>

      <Link href={`/${other}`} className="w-fit text-sm underline underline-offset-4">
        {dict.actions.switchLanguage}
      </Link>
    </main>
  );
}
