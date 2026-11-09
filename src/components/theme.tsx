"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

/**
 * Theme handling (ADR-009).
 *
 * - Dark is the default; the server always renders dark.
 * - The visitor's choice is stored in localStorage ("theme": "light" | "dark").
 * - THEME_SCRIPT runs in <head> before the first paint, so there is no flash.
 * - Fallback: on a streamed 404 the <head> script is inserted by React and the
 *   browser doesn't run it, so the toggle applies the stored theme on mount
 *   (one frame of dark on 404 pages only).
 * - The toggle reads the <html data-theme> attribute through
 *   useSyncExternalStore, so it never disagrees with what is on screen.
 */

const STORAGE_KEY = "theme";
type Theme = "light" | "dark";

/** Inline script (whitelisted values only). Allowed by the CSP's 'unsafe-inline' (ADR-022). */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function ThemeToggle({ labels }: { labels: { toLight: string; toDark: string } }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    if (document.documentElement.hasAttribute("data-theme")) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") document.documentElement.setAttribute("data-theme", stored);
    } catch {}
  }, []);
  const label = next === "light" ? labels.toLight : labels.toDark;

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.setAttribute("data-theme", next);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {}
      }}
      aria-label={label}
      title={label}
      className="grid size-8 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-2 min-[380px]:size-10"
    >
      {theme === "dark" ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
    </button>
  );
}
