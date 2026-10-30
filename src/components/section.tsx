import type { ReactNode } from "react";

/**
 * Two-tone section title: first line in the text color, second in silver.
 * `lines` comes from the dictionary, e.g. ["SELECTED", "PROJECTS"].
 */
export function SectionTitle({ lines, id }: { lines: readonly string[]; id: string }) {
  const [first, ...rest] = lines;
  return (
    <h2 id={id} className="text-4xl leading-[0.95] font-bold tracking-tight md:text-6xl">
      {first}
      {rest.length > 0 && (
        <>
          <br />
          <span className="text-silver">{rest.join(" ")}</span>
        </>
      )}
    </h2>
  );
}

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title?: readonly string[];
  children: ReactNode;
}) {
  const titleId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={title ? titleId : undefined} className="flex flex-col gap-8">
      {title && <SectionTitle lines={title} id={titleId} />}
      {children}
    </section>
  );
}
