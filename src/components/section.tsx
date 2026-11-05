import type { ReactNode } from "react";

/**
 * Two-tone section title: first line in the text color, second in silver.
 * `lines` comes from the dictionary, e.g. ["SELECTED", "PROJECTS"].
 */
export function SectionTitle({
  lines,
  id,
  level = 2,
}: {
  lines: readonly string[];
  id: string;
  /** 1 for a page title, 2 for sections, 3 for sub-sections (smaller). */
  level?: 1 | 2 | 3;
}) {
  const [first, ...rest] = lines;
  const Tag = (["h1", "h2", "h3"] as const)[level - 1];
  const size = level === 3 ? "text-3xl md:text-4xl" : "text-4xl md:text-6xl";
  return (
    <Tag id={id} className={`${size} leading-[0.95] font-bold tracking-tight`}>
      {first}
      {rest.length > 0 && (
        <>
          <br />
          <span className="text-silver">{rest.join(" ")}</span>
        </>
      )}
    </Tag>
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
