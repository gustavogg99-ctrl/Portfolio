import { BadgeCheck, ExternalLink, Hourglass } from "lucide-react";
import { content } from "@/content";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { formatYearMonth, l } from "@/lib/localize";
import type { Localized } from "@/content/schema";

const certName = (name: string | Localized, locale: Locale) => (typeof name === "string" ? name : l(name, locale));
import { SectionTitle } from "./section";

/**
 * Verified certifications (each with a way to check it), certifications in
 * progress, and the "Now" list. Certifications without a verification method
 * (`pending_link`) are never rendered.
 */
export function Certifications({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const verified = content.certifications
    .filter((c) => c.status === "verified")
    .toSorted((a, b) => (b.issued ?? "").localeCompare(a.issued ?? ""));
  const inProgress = content.certifications.filter((c) => c.status === "in_progress");
  const nowItems = content.now.items.filter((i) => i.visible);

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-8">
        <ul className="grid gap-4 md:grid-cols-2">
          {verified.map((cert) => (
            <li key={cert.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5">
              <div className="flex gap-3">
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-muted" aria-hidden />
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold">{certName(cert.name, locale)}</h3>
                  <p className="text-sm text-foreground/90">
                    {cert.issuer}
                    {cert.issued && (
                      <>
                        {" · "}
                        <span className="text-muted">
                          {dict.labels.issued} <time dateTime={cert.issued}>{formatYearMonth(cert.issued, locale)}</time>
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-1 pl-8 text-sm">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-1.5 underline-offset-4 hover:underline"
                >
                  <ExternalLink className="size-4" aria-hidden />
                  {cert.lookupId ? `${dict.labels.verifyAt} ${cert.issuer}` : dict.labels.verify}
                  <span className="sr-only"> ({dict.labels.opensInNewTab})</span>
                </a>
                {cert.lookupId && (
                  <p className="font-mono text-xs text-muted">
                    {dict.labels.certificateNo} <span className="select-all text-foreground/90">{cert.lookupId}</span>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>

        {inProgress.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-xs tracking-wide text-muted uppercase">{dict.labels.inProgress}</h3>
            <ul className="flex flex-wrap gap-2">
              {inProgress.map((cert) => (
                <li
                  key={cert.id}
                  className="flex items-center gap-2 rounded-full border border-dashed border-border px-3 py-1 text-sm"
                >
                  <Hourglass className="size-3.5 shrink-0 text-muted" aria-hidden />
                  {certName(cert.name, locale)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {nowItems.length > 0 && (
        <div id="now" className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <SectionTitle lines={dict.sections.now} id="now-title" level={3} />
            <p className="font-mono text-xs text-muted">
              {dict.labels.updated}{" "}
              <time dateTime={content.now.updated}>{formatYearMonth(content.now.updated, locale)}</time>
            </p>
          </div>
          <ul className="flex max-w-2xl flex-col gap-4">
            {nowItems.map((item) => (
              <li key={item.id} className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-start sm:gap-4">
                <span className="w-fit shrink-0 rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-wide text-muted uppercase">
                  {item.status === "in_progress" ? dict.labels.inProgress : dict.labels.planned}
                </span>
                <p className="text-foreground/90">{l(item.text, locale)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
