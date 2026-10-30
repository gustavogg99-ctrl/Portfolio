import type { Metadata } from "next";
// Self-hosted Geist (no request to Google Fonts — ADR-005).
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { htmlLang, locales } from "@/i18n/config";
import { content } from "@/content";
import "../globals.css";

/** Prerender /en and /pt at build time (required by Cache Components). */
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  const locale = await getLocale();
  return {
    title: `${content.profile.name} — ${content.profile.title[locale]}`,
    description: dict.meta.description,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  return (
    <html
      lang={htmlLang[locale]}
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
