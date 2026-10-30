import type { Snippet } from "@/content/schema";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { l } from "@/lib/localize";

/** A code excerpt with its explanation and an honesty note about how it differs from the source. */
export function CodeBlock({ snippet, locale, dict }: { snippet: Snippet; locale: Locale; dict: Dictionary }) {
  return (
    <figure className="flex flex-col gap-4">
      <figcaption className="flex flex-col gap-2">
        <h4 className="text-lg font-semibold">{l(snippet.title, locale)}</h4>
        <p className="text-sm text-foreground/90">{l(snippet.explanation, locale)}</p>
      </figcaption>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-xs text-muted">
          <span>{snippet.file}</span>
          <span>{snippet.language}</span>
        </div>
        <pre className="overflow-x-auto p-4 text-[12.5px] leading-relaxed" tabIndex={0}>
          <code className="font-mono">{snippet.code}</code>
        </pre>
      </div>
      <p className="text-xs text-muted">
        <span className="font-semibold">{dict.labels.fidelity}:</span> {l(snippet.fidelity, locale)}
      </p>
    </figure>
  );
}
