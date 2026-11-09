import Image from "next/image";
import { FileText, Mail, PenLine } from "lucide-react";
import { content } from "@/content";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { l } from "@/lib/localize";
import profilePhoto from "@/assets/profile.jpg";
import { GitHubIcon, LinkedInIcon } from "./icons";

/**
 * The "who am I" card. Sticky on large screens so it stays visible
 * while the content scrolls (pattern from the reference site, ADR-001).
 * Below lg it is compact (photo beside the name, actions in one row) so the
 * hero shows on the first screen of a phone (ADR-028).
 */
export function ProfileCard({
  locale,
  dict,
  hrefBase = "",
}: {
  locale: Locale;
  dict: Dictionary;
  /** "" on the home page; "/en" or "/pt" elsewhere, so #contact points home. */
  hrefBase?: string;
}) {
  const { profile } = content;

  const socials = [
    { href: profile.links.linkedin, label: "LinkedIn", icon: LinkedInIcon, external: true },
    { href: profile.links.github, label: "GitHub", icon: GitHubIcon, external: true },
    { href: profile.links.blog, label: dict.labels.blog, icon: PenLine, external: true },
    { href: `mailto:${profile.email}`, label: dict.labels.email, icon: Mail, external: false },
  ];

  return (
    <aside
      aria-label={profile.name}
      className="profile-glow grid w-full max-w-sm grid-cols-[auto_1fr] items-center gap-4 rounded-3xl border border-border bg-surface p-4 text-left lg:flex lg:flex-col lg:gap-5 lg:p-6 lg:text-center"
    >
      <Image
        src={profilePhoto}
        alt={dict.labels.photoAlt}
        placeholder="blur"
        sizes="(min-width: 1024px) 288px, 80px"
        preload
        className="aspect-[4/5] w-20 rounded-xl object-cover lg:w-full lg:max-w-72 lg:rounded-2xl"
      />

      <div className="flex min-w-0 flex-col gap-1 lg:items-center lg:gap-5">
        <div className="flex flex-col gap-1">
          {/* Not a heading: the page h1 must come first; the <aside> is already labelled with the name. */}
          <p className="text-xl font-bold tracking-tight lg:text-2xl">{profile.name}</p>
          <p className="text-sm font-medium text-silver">{l(profile.title, locale)}</p>
        </div>
        <p className="text-sm text-muted">{l(profile.tagline, locale)}</p>
      </div>

      <div className="col-span-2 flex items-center gap-2 lg:w-full lg:flex-col lg:gap-5">
        <div className="flex min-w-0 flex-1 flex-col gap-2 lg:w-full">
          {profile.resumeUrl && (
            <a
              href={l(profile.resumeUrl, locale)}
                type="application/pdf"
              className="flex items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <FileText className="size-4" aria-hidden />
              {dict.actions.resume}
            </a>
          )}
          <a
            href={`${hrefBase}#contact`}
            className={`rounded-xl px-4 py-2.5 text-center text-sm font-medium transition-colors lg:py-3 ${
              profile.resumeUrl
                ? "border border-border hover:bg-surface-2"
                : "bg-foreground text-background hover:opacity-90"
            }`}
          >
            {dict.actions.contact}
          </a>
        </div>

        <ul className="flex items-center lg:gap-1">
          {socials.map(({ href, label, icon: Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                title={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="grid size-9 place-items-center rounded-full text-muted lg:size-10 transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <Icon className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
