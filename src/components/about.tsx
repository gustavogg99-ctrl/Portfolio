import Image from "next/image";
import { Globe, Languages, MapPin } from "lucide-react";
import { content } from "@/content";
import { skillIconFiles } from "@/content/skill-icons";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { l } from "@/lib/localize";
import { NowList } from "./now";
import { SectionTitle } from "./section";

/** "About me" text + quick facts, then "Now" (ADR-031) and the skills groups. */
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
            // dl > div > dt + dd only (valid HTML); the icon lives inside <dt>.
            <div key={label} className="flex flex-col gap-0.5">
              <dt className="flex items-center gap-3 text-muted">
                <Icon className="size-4 shrink-0" aria-hidden />
                {label}
              </dt>
              <dd className="pl-7">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <NowList locale={locale} dict={dict} />

      <div id="skills" className="flex flex-col gap-8">
        <SectionTitle lines={dict.sections.skills} id="skills-title" level={3} />
        <div className="grid gap-4 md:grid-cols-2">
          {skills.map((group) => (
            <div key={group.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5">
              <h4 className="font-semibold">{l(group.name, locale)}</h4>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const withIcons = typeof item === "object" && "icons" in item;
                  const label = withIcons ? item.label : item;
                  const text = typeof label === "string" ? label : l(label, locale);
                  return (
                    <li
                      key={text}
                      className="flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-foreground/90"
                    >
                      {withIcons &&
                        item.icons.map((id) => (
                          // Decorative: the name next to it is the accessible content (ADR-050).
                          <span
                            key={id}
                            className="flex size-5 shrink-0 items-center justify-center rounded-md bg-logo-tile"
                          >
                            <Image
                              src={`/icons/${skillIconFiles[id]}`}
                              alt=""
                              width={14}
                              height={14}
                              unoptimized
                              className="size-3.5"
                            />
                          </span>
                        ))}
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
