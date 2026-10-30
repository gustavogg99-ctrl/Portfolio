import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Section } from "@/components/section";
import { SiteShell } from "@/components/site-shell";

/** Temporary placeholder for sections built in later parts. Removed as each part lands. */
function Building({ part, label }: { part: number; label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-8 font-mono text-sm text-muted">
      {label} {part}
    </div>
  );
}

export default async function Home() {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <SiteShell locale={locale} dict={dict} onHome>
      <Section id="home">
        <Hero locale={locale} dict={dict} />
      </Section>

      <Section id="about" title={dict.sections.about}>
        <About locale={locale} dict={dict} />
      </Section>

      <Section id="projects" title={dict.sections.projects}>
        <Projects locale={locale} dict={dict} />
      </Section>

      <Section id="experience" title={dict.sections.experience}>
        <Building part={5} label={dict.labels.building} />
      </Section>

      <Section id="certifications" title={dict.sections.certifications}>
        <Building part={5} label={dict.labels.building} />
      </Section>

      <Section id="writing" title={dict.sections.writing}>
        <Building part={6} label={dict.labels.building} />
      </Section>

      <Section id="contact" title={dict.sections.contact}>
        <Building part={6} label={dict.labels.building} />
      </Section>
    </SiteShell>
  );
}
