import { ImageResponse } from "next/og";
import { content } from "@/content";
import { hasLocale, defaultLocale, locales } from "@/i18n/config";

/**
 * Open Graph image per case study and locale (1200×630), generated at build time (Part 31, ADR-043).
 * Same exception as src/app/[lang]/opengraph-image.tsx: ImageResponse can't read CSS variables,
 * so the dark-theme token values are repeated here (keep in sync with src/app/globals.css).
 */
const BG = "#0a0a0a";
const FG = "#ededed";
const MUTED = "#8a8a8a";
const BORDER = "#2a2a2a";

const LABEL = { en: "CASE STUDY", pt: "ESTUDO DE CASO" } as const;

export const alt = "Case study by Gustavo Rodrigues";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const withPage = () => content.projects.filter((p) => p.visible && p.page);

export function generateStaticParams() {
  return locales.flatMap((lang) => withPage().map((p) => ({ lang, slug: p.slug })));
}

export default async function CaseOpenGraphImage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const project = withPage().find((p) => p.slug === slug) ?? withPage()[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: BG,
          color: FG,
          border: `16px solid ${BORDER}`,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: MUTED, letterSpacing: 4 }}>{LABEL[locale]}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 80, fontWeight: 700, lineHeight: 1.05, maxWidth: 1040 }}>
            {project.name}
          </div>
          <div style={{ display: "flex", fontSize: 34, color: MUTED, maxWidth: 1040 }}>{project.statusNote[locale]}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 2 }}>{content.profile.name}</div>
      </div>
    ),
    size,
  );
}
