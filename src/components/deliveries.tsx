import type { Project } from "@/content/schema";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { l } from "@/lib/localize";

/**
 * Counts from the real delivered jobs, with how they were counted (ADR-035).
 * `headingLevel` is one below the heading that introduces the block: h4 on the
 * home card (under its h4 label, as siblings), h3 on the case page (under an h2),
 * so heading levels never skip (ARCHITECTURE, Accessibility; Part 34).
 */
export function Deliveries({
  deliveries,
  locale,
  dict,
  headingLevel = 4,
}: {
  deliveries: NonNullable<Project["deliveries"]>;
  locale: Locale;
  dict: Dictionary;
  headingLevel?: 3 | 4;
}) {
  const JobHeading = headingLevel === 3 ? "h3" : "h4";
  return (
    <div className="flex flex-col gap-3">
      <ul className="grid gap-3 sm:grid-cols-2">
        {deliveries.jobs.map((job) => (
          <li key={job.label.en} className="flex flex-col gap-3 rounded-xl border border-border bg-surface-2 p-4">
            <JobHeading className="text-sm font-semibold">{l(job.label, locale)}</JobHeading>
            <dl className="flex flex-col gap-2 text-sm">
              {[
                [dict.labels.deliveriesVersions, job.versions],
                [dict.labels.deliveriesChanges, job.changes],
                [dict.labels.deliveriesComments, job.comments],
              ].map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted">{label}</dt>
                  <dd className="font-mono text-base font-semibold tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted">{l(deliveries.method, locale)}</p>
    </div>
  );
}
