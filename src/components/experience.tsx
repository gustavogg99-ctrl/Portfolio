import { content } from "@/content";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { formatYearMonth, l } from "@/lib/localize";
import { SectionTitle } from "./section";

function Period({ start, end, locale, dict }: { start: string; end: string | null; locale: Locale; dict: Dictionary }) {
  return (
    <span className="font-mono text-xs text-muted">
      <time dateTime={start}>{formatYearMonth(start, locale)}</time>
      {" – "}
      {end ? <time dateTime={end}>{formatYearMonth(end, locale)}</time> : dict.labels.present}
    </span>
  );
}

/** Work timeline (newest first) followed by education and courses. */
export function Experience({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const experience = content.experience.filter((e) => e.visible);
  const education = content.education.filter((e) => e.visible);

  return (
    <div className="flex flex-col gap-16">
      <ol className="relative flex flex-col gap-10 border-l border-border pl-6 md:pl-8">
        {experience.map((job) => (
          <li key={job.id} className="relative flex flex-col gap-4">
            <span
              aria-hidden
              className="absolute top-2 -left-[29px] size-2.5 rounded-full border border-border bg-foreground md:-left-[37px]"
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-semibold">{typeof job.company === "string" ? job.company : l(job.company, locale)}</h3>
              {job.context && <p className="text-sm text-muted">{l(job.context, locale)}</p>}
            </div>

            <ul className="flex flex-col gap-1.5">
              {job.roles.map((role) => (
                <li key={role.start} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <span className="font-medium">{l(role.title, locale)}</span>
                  <Period start={role.start} end={role.end} locale={locale} dict={dict} />
                </li>
              ))}
            </ul>

            <ul className="flex max-w-2xl list-disc flex-col gap-2 pl-5 text-foreground/90 marker:text-muted">
              {job.highlights.map((item) => (
                <li key={item.en}>{l(item, locale)}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div id="education" className="flex flex-col gap-8">
        <SectionTitle lines={dict.sections.education} id="education-title" level={3} />
        <ul className="grid gap-4 md:grid-cols-2">
          {education.map((item) => (
            <li key={item.id} className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5">
              <h4 className="font-semibold">{l(item.course, locale)}</h4>
              <p className="text-sm text-foreground/90">
                {l(item.degree, locale)} · {item.institution}
              </p>
              <p className="font-mono text-xs text-muted">
                {item.completed ? (
                  <>
                    {dict.labels.completed} <time dateTime={item.completed}>{formatYearMonth(item.completed, locale)}</time>
                  </>
                ) : (
                  item.expectedEnd && (
                    <>
                      {dict.labels.expected} <time dateTime={item.expectedEnd}>{formatYearMonth(item.expectedEnd, locale)}</time>
                    </>
                  )
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
