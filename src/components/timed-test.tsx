import type { Project } from "@/content/schema";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { l } from "@/lib/localize";

const h3 = "text-sm font-semibold";
const list = "flex flex-col gap-2 pl-5 text-sm text-foreground/90";

/** One controlled timing test (n=1, fictional document), with its method and limitations next to the numbers (ADR-037). */
export function TimedTest({
  test,
  locale,
  dict,
}: {
  test: NonNullable<Project["timedTest"]>;
  locale: Locale;
  dict: Dictionary;
}) {
  const section = (title: string, items: { en: string; pt: string }[], ordered = false) => {
    const Tag = ordered ? "ol" : "ul";
    return (
      <div className="flex flex-col gap-2">
        <h3 className={h3}>{title}</h3>
        <Tag className={`${list} ${ordered ? "list-decimal" : "list-disc"}`}>
          {items.map((item) => (
            <li key={item.en}>{l(item, locale)}</li>
          ))}
        </Tag>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="max-w-2xl text-foreground/90">{l(test.summary, locale)}</p>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
          <thead className="bg-surface-2">
            <tr>
              <th scope="col" className="p-3"><span className="sr-only">Item</span></th>
              <th scope="col" className="p-3 font-semibold">{dict.labels.timedByHand}</th>
              <th scope="col" className="p-3 font-semibold">{dict.labels.timedPipeline}</th>
            </tr>
          </thead>
          <tbody>
            {test.rows.map((row) => (
              <tr key={row.label.en} className="border-t border-border align-top">
                <th scope="row" className="p-3 font-medium text-muted">{l(row.label, locale)}</th>
                <td className="p-3">{l(row.byHand, locale)}</td>
                <td className="p-3">{l(row.pipeline, locale)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {test.notes.length > 0 && section(dict.labels.timedNotes, test.notes)}
      {section(dict.labels.timedWrongPipeline, test.wentWrongPipeline)}
      {section(dict.labels.timedWrongByHand, test.wentWrongByHand)}
      {section(dict.labels.timedMethod, test.method)}
      {section(dict.labels.timedLimitations, test.limitations, true)}
      <div className="flex flex-col gap-2">
        <h3 className={h3}>{dict.labels.timedNotConcluded}</h3>
        <p className="max-w-2xl text-sm text-foreground/90">{l(test.notConcluded, locale)}</p>
      </div>
    </div>
  );
}
