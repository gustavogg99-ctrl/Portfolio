import { ArrowRight, FileText } from "lucide-react";
import { content } from "@/content";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { l } from "@/lib/localize";
import { Typewriter } from "./typewriter";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { profile } = content;
  const staticLine = l(profile.hero.static, locale);
  const words = profile.hero.rotating.map((w) => l(w, locale));

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <h1 className="text-5xl leading-[0.95] font-bold tracking-tight md:text-7xl xl:text-8xl">
          {/* Screen readers get one stable sentence instead of a changing word. */}
          <span className="sr-only">
            {staticLine}: {words.join(", ")}.
          </span>
          <span aria-hidden>{staticLine}</span>
          <br />
          <Typewriter words={words} />
        </h1>

        <p className="max-w-xl text-lg text-foreground/90 md:text-xl">{l(profile.headline, locale)}</p>
        <p className="font-mono text-xs tracking-wide text-muted uppercase">{l(profile.subtitle, locale)}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href="#projects"
          className="group flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {dict.actions.projects}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </a>
        {profile.resumeUrl && (
          <a
            href={profile.resumeUrl}
            className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-surface-2"
          >
            <FileText className="size-4" aria-hidden />
            {dict.actions.resume}
          </a>
        )}
        <a
          href="#contact"
          className="rounded-xl border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-surface-2"
        >
          {dict.actions.contact}
        </a>
      </div>

      <ul className="grid gap-3 sm:grid-cols-3">
        {profile.stats.map((stat) => (
          <li
            key={stat.evidence}
            className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5"
          >
            <span className="text-silver text-4xl font-bold tracking-tight md:text-5xl">
              {l(stat.value, locale)}
            </span>
            <span className="text-sm leading-snug text-muted">{l(stat.label, locale)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
