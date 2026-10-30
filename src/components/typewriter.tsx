"use client";

import { useEffect, useState } from "react";

/**
 * Types, holds, erases and moves to the next word, in a loop.
 *
 * - Server render shows the first word complete (works without JS, no layout jump).
 * - Visual only (aria-hidden): the accessible text is provided by the parent h1.
 * - With prefers-reduced-motion the first word stays still.
 */
const TYPE_MS = 90;
const ERASE_MS = 45;
const HOLD_MS = 1800;
const PAUSE_MS = 350;

export function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(words[0]?.length ?? 0);
  const [erasing, setErasing] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!query.matches && words.length > 1);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [words.length]);

  useEffect(() => {
    if (!enabled) return;
    const word = words[index];
    let delay: number;
    let step: () => void;

    if (!erasing && length < word.length) {
      delay = TYPE_MS;
      step = () => setLength((n) => n + 1);
    } else if (!erasing) {
      delay = HOLD_MS;
      step = () => setErasing(true);
    } else if (length > 0) {
      delay = ERASE_MS;
      step = () => setLength((n) => n - 1);
    } else {
      delay = PAUSE_MS;
      step = () => {
        setErasing(false);
        setIndex((i) => (i + 1) % words.length);
      };
    }

    const timer = window.setTimeout(step, delay);
    return () => window.clearTimeout(timer);
  }, [enabled, erasing, index, length, words]);

  const text = enabled ? words[index].slice(0, length) : words[0];

  return (
    <span aria-hidden className="text-silver">
      {text}
      <span className="caret">_</span>
    </span>
  );
}
