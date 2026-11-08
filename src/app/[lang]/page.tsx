import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { About } from "@/components/about";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Section } from "@/components/section";
import { SiteShell } from "@/components/site-shell";
import { Writing } from "@/components/writing";
import { personJsonLd, serializeJsonLd } from "@/lib/json-ld";

export default async function Home() {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <SiteShell locale={locale} dict={dict} onHome>
      {/* Structured data (ADR-026). Not executed by the browser, so the CSP is unaffected. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd(locale)) }}
      />
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
        <Experience locale={locale} dict={dict} />
      </Section>

      <Section id="certifications" title={dict.sections.certifications}>
        <Certifications locale={locale} dict={dict} />
      </Section>

      <Section id="writing" title={dict.sections.writing}>
        <Writing locale={locale} dict={dict} />
      </Section>

      <Section id="contact" title={dict.sections.contact}>
        <Contact dict={dict} />
      </Section>
    </SiteShell>
  );
}
