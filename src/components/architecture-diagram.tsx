import { ArrowDown } from "lucide-react";
import type { Project } from "@/content/schema";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { l } from "@/lib/localize";

type Architecture = NonNullable<Project["page"]>["architecture"];

/** Visual weight per step kind: AI steps are inverted so they stand out from controls. */
const kindStyle: Record<Architecture["main"][number]["kind"], string> = {
  io: "border-border bg-surface",
  ai: "border-foreground bg-foreground text-background",
  code: "border-border bg-surface-2",
  guard: "border-accent bg-surface",
  human: "border-dashed border-accent bg-surface",
};

/**
 * Architecture as an ordered list of boxes (HTML, not an image): readable by
 * screen readers, follows the theme, and is edited in content, not in a drawing tool.
 */
export function ArchitectureDiagram({
  architecture,
  locale,
  dict,
}: {
  architecture: Architecture;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="flex flex-col gap-6">
      <ol className="flex flex-col items-stretch">
        {architecture.main.map((step, i) => (
          <li key={step.title.en} className="flex flex-col items-center">
            <div className={`w-full rounded-2xl border p-4 ${kindStyle[step.kind]}`}>
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold">
                  <span className="mr-2 font-mono text-xs opacity-60">{String(i + 1).padStart(2, "0")}</span>
                  {l(step.title, locale)}
                </span>
                <span className="rounded-full border border-current px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase opacity-70">
                  {dict.diagram[step.kind]}
                </span>
              </div>
              <p className="mt-1.5 text-sm opacity-80">{l(step.detail, locale)}</p>
            </div>
            {i < architecture.main.length - 1 && <ArrowDown className="my-1.5 size-4 text-muted" aria-hidden />}
          </li>
        ))}
      </ol>

      {architecture.outputs.length > 0 && (
        <div className="flex flex-col gap-2">
          <ArrowDown className="mx-auto size-4 text-muted" aria-hidden />
          <p className="text-center font-mono text-xs tracking-wide text-muted uppercase">{dict.labels.outputs}</p>
          <ul className="grid gap-2 sm:grid-cols-3">
            {architecture.outputs.map((o) => (
              <li key={o.en} className="rounded-xl border border-border bg-surface-2 p-3 text-center text-sm">
                {l(o, locale)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {architecture.parallel && (
        <p className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted">
          {l(architecture.parallel, locale)}
        </p>
      )}
    </div>
  );
}
