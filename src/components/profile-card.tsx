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
      className="profile-glow flex w-full max-w-sm flex-col items-center gap-5 rounded-3xl border border-border bg-surface p-6 text-center"
    >
      <Image
        src={profilePhoto}
        alt={dict.labels.photoAlt}
        placeholder="blur"
        sizes="(min-width: 1024px) 288px, 176px"
        preload
        className="aspect-[4/5] w-full max-w-44 rounded-2xl object-cover lg:max-w-72"
      />

      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">{profile.name}</h2>
        <p className="text-sm font-medium text-silver">{l(profile.title, locale)}</p>
      </div>

      <p className="text-sm text-muted">{l(profile.tagline, locale)}</p>

      <div className="flex w-full flex-col gap-2">
        {profile.resumeUrl && (
          <a
            href={profile.resumeUrl}
            className="flex items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <FileText className="size-4" aria-hidden />
            {dict.actions.resume}
          </a>
        )}
        <a
          href={`${hrefBase}#contact`}
          className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
            profile.resumeUrl
              ? "border border-border hover:bg-surface-2"
              : "bg-foreground text-background hover:opacity-90"
          }`}
        >
          {dict.actions.contact}
        </a>
      </div>

      <ul className="flex items-center gap-1">
        {socials.map(({ href, label, icon: Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <Icon className="size-5" />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
