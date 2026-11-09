import type { MetadataRoute } from "next";
import { content } from "@/content";
import { htmlLang, locales } from "@/i18n/config";
import { absoluteUrl } from "@/lib/site-url";

/** Home, privacy and case-study pages in both languages, each listing its alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/privacy",
    ...content.projects.filter((p) => p.visible && p.page).map((p) => `/projects/${p.slug}`),
  ];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${path}`),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/privacy" ? 0.3 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [htmlLang[l], absoluteUrl(`/${l}${path}`)])),
      },
    })),
  );
}
