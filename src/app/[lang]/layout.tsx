import type { Metadata } from "next";
// Cookie-less page views, script served from this origin (/_vercel/insights) — no CSP change (ADR-025).
import { Analytics } from "@vercel/analytics/next";
// Self-hosted Geist (no request to Google Fonts — ADR-005).
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { htmlLang, locales } from "@/i18n/config";
import { alternatesFor } from "@/lib/alternates";
import { SITE_URL } from "@/lib/site-url";
import { content } from "@/content";
import { THEME_SCRIPT } from "@/components/theme";
import "../globals.css";

/** Prerender /en and /pt at build time (required by Cache Components). */
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  const locale = await getLocale();
  const title = `${content.profile.name} | ${content.profile.title[locale]}`;
  const other = locales.filter((l) => l !== locale);
  return {
    metadataBase: SITE_URL,
    title,
    description: dict.meta.description,
    alternates: alternatesFor(locale),
    openGraph: {
      type: "website",
      siteName: content.profile.name,
      title,
      description: dict.meta.description,
      url: `/${locale}`,
      locale: htmlLang[locale].replace("-", "_"),
      alternateLocale: other.map((l) => htmlLang[l].replace("-", "_")),
    },
    twitter: { card: "summary_large_image", title, description: dict.meta.description },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  return (
    <html
      lang={htmlLang[locale]}
      // The theme script may set data-theme before hydration (ADR-009).
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
