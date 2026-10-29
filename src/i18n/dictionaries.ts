import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./config";
import type en from "./dictionaries/en.json";

export type Dictionary = typeof en;

/**
 * UI strings (labels, section titles, buttons). Content about Gustavo
 * (projects, experience, etc.) lives in src/content/, not here.
 */
// Typed as Dictionary: if pt.json misses a key that en.json has, typecheck fails.
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  pt: () => import("./dictionaries/pt.json").then((m) => m.default),
};

/** Resolves the current locale from the [lang] root segment. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}
