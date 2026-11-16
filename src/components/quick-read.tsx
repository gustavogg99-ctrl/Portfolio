import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/schema";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { l } from "@/lib/localize";

type QuickReadData = NonNullable<Project["quickRead"]>;
type Preview = NonNullable<Project["preview"]>;

/**
 * Quick read at the top of a case page (Part 32, ADR-044): problem, my role and one
 * piece of evidence with a link to where it comes from. Three short cells, one column on phones.
 */
export function QuickRead({
  project,
  quickRead,
  locale,
  dict,
}: {
  project: Project;
  quickRead: QuickReadData;
  locale: Locale;
  dict: Dictionary;
}) {
  const external = quickRead.evidenceHref.startsWith("https://");
  const cell = "flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5";
  const label = "font-mono text-xs tracking-wide text-muted uppercase";
  return (
    <section aria-label={dict.labels.atAGlance} className="grid gap-3 md:grid-cols-3">
      <div className={cell}>
        <h2 className={label}>{dict.labels.problem}</h2>
        <p className="text-sm text-foreground/90">{l(project.problem, locale)}</p>
      </div>
      <div className={cell}>
        <h2 className={label}>{dict.labels.myRole}</h2>
        <p className="text-sm text-foreground/90">{l(quickRead.role, locale)}</p>
      </div>
      <div className={cell}>
        <h2 className={label}>{dict.labels.evidence}</h2>
        <p className="text-sm text-foreground/90">{l(quickRead.evidence, locale)}</p>
        <a
          href={quickRead.evidenceHref}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="mt-auto flex w-fit items-center gap-1 text-xs text-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          {dict.labels.source}
          {external && <ArrowUpRight className="size-3" aria-hidden />}
        </a>
      </div>
    </section>
  );
}

const toneStyle = {
  io: "border-border",
  guard: "border-accent",
  ai: "border-foreground",
  human: "border-dashed border-accent",
} as const;

/** A short preview of the work: a real evaluation record, or an illustrative before/after (ADR-044). */
export function CasePreview({ preview, locale, dict }: { preview: Preview; locale: Locale; dict: Dictionary }) {
  const badge = "w-fit rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] tracking-wide uppercase";
  return (
    <figure className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-5 md:p-6">
      <figcaption className="flex flex-col gap-2">
        <span className={badge}>{preview.kind === "record" ? dict.labels.recorded : dict.labels.illustrative}</span>
        <span className="text-lg font-semibold tracking-tight">{l(preview.caption, locale)}</span>
      </figcaption>

      {preview.kind === "record" ? (
        <>
          <div className="flex flex-col gap-1 rounded-xl bg-surface-2 p-4">
            <p className="font-mono text-xs text-muted">
              {dict.labels.ticket} {preview.ticket.id}
            </p>
            <p lang="en" className="text-sm font-semibold">
              {preview.ticket.subject}
            </p>
            <p lang="en" className="text-sm text-foreground/90">
              {preview.ticket.description}
            </p>
          </div>
          <dl className="flex flex-col gap-2">
            {preview.rows.map((row) => (
              <div key={row.label.en} className={`flex flex-col gap-1 border-l-2 pl-3 ${toneStyle[row.tone]}`}>
                <dt className="font-mono text-xs text-muted">{l(row.label, locale)}</dt>
                <dd className="text-sm">{l(row.value, locale)}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-muted">{l(preview.note, locale)}</p>
          <a
            href={preview.sourceHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-1 text-xs text-muted underline-offset-4 hover:text-foreground hover:underline"
          >
            {dict.labels.source}: results/eval_results.json
            <ArrowUpRight className="size-3" aria-hidden />
          </a>
        </>
      ) : (
        <>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-xl bg-surface-2 p-4">
              <p className="font-mono text-xs text-muted uppercase">{dict.labels.before}</p>
              <p className="text-sm leading-relaxed">
                {l(preview.lead, locale)} “{l(preview.quote, locale)}” {preview.citation}.
              </p>
              <ul className="flex list-disc flex-col gap-1 pl-4 text-xs text-muted">
                {preview.beforeNotes.map((n) => (
                  <li key={n.en}>{l(n, locale)}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 rounded-xl bg-surface-2 p-4">
              <p className="font-mono text-xs text-muted uppercase">{dict.labels.after}</p>
              <div className="flex flex-col gap-2">
                <p className="text-sm leading-relaxed">{l(preview.lead, locale)}</p>
                <blockquote className="ml-8 text-xs leading-snug">
                  {l(preview.quote, locale)} {preview.citation}.
                </blockquote>
              </div>
              <ul className="flex list-disc flex-col gap-1 pl-4 text-xs text-muted">
                {preview.afterNotes.map((n) => (
                  <li key={n.en}>{l(n, locale)}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-sm text-muted">{l(preview.note, locale)}</p>
        </>
      )}
    </figure>
  );
}
