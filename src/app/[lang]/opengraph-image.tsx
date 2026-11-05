import { ImageResponse } from "next/og";
import { content } from "@/content";
import { hasLocale, defaultLocale, locales } from "@/i18n/config";

/**
 * Open Graph image per locale (1200×630), generated at build time.
 * Exception to the "colors only via tokens" rule: ImageResponse can't read CSS
 * variables, so the dark-theme token values are repeated here (keep in sync
 * with src/app/globals.css).
 */
const BG = "#0a0a0a";
const FG = "#ededed";
const MUTED = "#8a8a8a";
const BORDER = "#2a2a2a";

export const alt = "Gustavo Rodrigues — portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const { profile } = content;
  const words = profile.hero.rotating.map((w) => w[locale]).join(" · ");

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
        <div style={{ display: "flex", fontSize: 28, color: MUTED, letterSpacing: 4 }}>
          {profile.title[locale].toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ display: "flex", fontSize: 36, color: MUTED, maxWidth: 1000 }}>{profile.headline[locale]}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6 }}>{words}</div>
      </div>
    ),
    size,
  );
}
