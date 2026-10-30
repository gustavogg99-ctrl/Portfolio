import { Globe, Languages, MapPin } from "lucide-react";
import { content } from "@/content";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { l } from "@/lib/localize";
import { SectionTitle } from "./section";

/** "About me" text + quick facts, followed by the skills groups. */
export function About({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { profile, skills } = content;

  const facts = [
    { icon: MapPin, label: dict.labels.basedIn, value: l(profile.location, locale) },
    { icon: Globe, label: dict.labels.openTo, value: l(profile.openTo, locale) },
    {
      icon: Languages,
      label: dict.labels.languages,
      value: profile.languages.map((lang) => `${l(lang.name, locale)} (${l(lang.level, locale)})`).join(" · "),
    },
  ];

  return (
    <div className="flex flex-col gap-16">
      <div className="grid gap-10 xl:grid-cols-[1fr_16rem]">
        <div className="flex max-w-2xl flex-col gap-5 text-lg leading-relaxed text-foreground/90">
          {profile.about.map((paragraph) => (
            <p key={paragraph.en}>{l(paragraph, locale)}</p>
          ))}
        </div>

        <dl className="flex flex-col gap-5 self-start rounded-2xl border border-border bg-surface p-5 text-sm">
          {facts.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-3">
              <Icon className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden />
              <div className="flex flex-col gap-0.5">
                <dt className="text-muted">{label}</dt>
                <dd>{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      <div id="skills" className="flex flex-col gap-8">
        <SectionTitle lines={dict.sections.skills} id="skills-title" level={3} />
        <div className="grid gap-4 md:grid-cols-2">
          {skills.map((group) => (
            <div key={group.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5">
              <h4 className="font-semibold">{l(group.name, locale)}</h4>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const text = typeof item === "string" ? item : l(item, locale);
                  return (
                  <li
                    key={text}
                    className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-foreground/90"
                  >
                    {text}
                  </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
