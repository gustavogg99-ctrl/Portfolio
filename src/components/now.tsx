import { ArrowUpRight, BookOpen, BriefcaseBusiness, Wrench } from "lucide-react";
import { content } from "@/content";
import type { NowKind } from "@/content/schema";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { formatYearMonth, l } from "@/lib/localize";
import { SectionTitle } from "./section";

const ICONS = { work: BriefcaseBusiness, study: BookOpen, project: Wrench } satisfies Record<NowKind, unknown>;

/**
 * "What I'm doing now" (sub-section of About, ADR-031): current work status,
 * what I'm studying and the project I'm building, one card each.
 * With no visible item the sub-section is not rendered.
 */
export function NowList({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = content.now.items.filter((i) => i.visible);
  if (items.length === 0) return null;

  return (
    <div id="now" className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <SectionTitle lines={dict.sections.now} id="now-title" level={3} />
        <p className="font-mono text-xs text-muted">
          {dict.labels.updated} <time dateTime={content.now.updated}>{formatYearMonth(content.now.updated, locale)}</time>
        </p>
      </div>
      <ul className="grid gap-4 md:grid-cols-3">
        {items.map((item) => {
          const Icon = ICONS[item.kind];
          const external = item.link?.href.startsWith("https://");
          return (
            <li key={item.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5">
              <h4 className="flex items-center gap-2 font-mono text-xs tracking-wide text-muted uppercase">
                <Icon className="size-4 shrink-0" aria-hidden />
                {dict.now[item.kind]}
              </h4>
              <p className="text-foreground/90">{l(item.text, locale)}</p>
              {item.link && (
                <a
                  href={item.link.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-auto flex w-fit items-center gap-1.5 text-sm underline-offset-4 hover:underline"
                >
                  {l(item.link.label, locale)}
                  <ArrowUpRight className="size-4" aria-hidden />
                  {external && <span className="sr-only"> ({dict.labels.opensInNewTab})</span>}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
