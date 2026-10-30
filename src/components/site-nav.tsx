"use client";

import { Award, Briefcase, FolderGit2, Home, Mail, PenLine, User } from "lucide-react";
import { useEffect, useState } from "react";

export const NAV_SECTIONS = [
  { id: "home", icon: Home },
  { id: "about", icon: User },
  { id: "projects", icon: FolderGit2 },
  { id: "experience", icon: Briefcase },
  { id: "certifications", icon: Award },
  { id: "writing", icon: PenLine },
  { id: "contact", icon: Mail },
] as const;

export type NavSectionId = (typeof NAV_SECTIONS)[number]["id"];

/**
 * Sticky icon navigation. Highlights the section currently in view
 * (IntersectionObserver) and exposes it with aria-current for screen readers.
 */
export function SiteNav({ labels, ariaLabel }: { labels: Record<NavSectionId, string>; ariaLabel: string }) {
  const [active, setActive] = useState<NavSectionId>("home");

  useEffect(() => {
    const elements = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id as NavSectionId);
      },
      // A section is "active" when it crosses a band near the top of the viewport.
      { rootMargin: "-20% 0px -70% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label={ariaLabel}>
      <ul className="flex items-center gap-1 rounded-full border border-border bg-surface/80 p-1 backdrop-blur-md">
        {NAV_SECTIONS.map(({ id, icon: Icon }) => {
          const isActive = active === id;
          return (
            <li key={id} className="group relative">
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                aria-label={labels[id]}
                className={`grid size-9 place-items-center rounded-full transition-colors sm:size-10 ${
                  isActive ? "bg-foreground text-background" : "text-muted hover:bg-surface-2 hover:text-foreground"
                }`}
              >
                <Icon className="size-4" aria-hidden />
              </a>
              {/* Tooltip (visual only; the link already has aria-label) */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-md border border-border bg-surface px-2 py-1 text-xs whitespace-nowrap text-foreground opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
              >
                {labels[id]}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
