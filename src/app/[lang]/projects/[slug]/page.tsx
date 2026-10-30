import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { content } from "@/content";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { l } from "@/lib/localize";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { CodeBlock } from "@/components/code-block";
import { ProjectLinks, StackTags, StatusBadge } from "@/components/projects";
import { SectionTitle } from "@/components/section";
import { SiteShell } from "@/components/site-shell";

/** Only projects that declare a `page` get a case-study route. */
const withPage = () => content.projects.filter((p) => p.visible && p.page);

export async function generateStaticParams() {
  return withPage().map((p) => ({ slug: p.slug }));
}

async function findProject(params: PageProps<"/[lang]/projects/[slug]">["params"]) {
  const { slug } = await params;
  const project = withPage().find((p) => p.slug === slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata(props: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const project = await findProject(props.params);
  const locale = await getLocale();
  return {
    title: `${project.name} — ${content.profile.name}`,
    description: l(project.summary, locale),
  };
}

export default async function ProjectPage(props: PageProps<"/[lang]/projects/[slug]">) {
  const project = await findProject(props.params);
  const locale = await getLocale();
  const dict = await getDictionary();
  const page = project.page!;
  const snippets = page.snippetIds
    .map((id) => content.snippets.find((s) => s.id === id))
    .filter((s) => s !== undefined);

  const block = "flex flex-col gap-4";
  const h2 = "text-2xl font-bold tracking-tight md:text-3xl";

  return (
    <SiteShell locale={locale} dict={dict} onHome={false} active="projects">
      <article className="flex flex-col gap-16">
        <header className="flex flex-col gap-6">
          <Link
            href={`/${locale}#projects`}
            className="flex w-fit items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {dict.labels.backToProjects}
          </Link>
          <StatusBadge project={project} dict={dict} />
          <SectionTitle lines={[project.name]} id="project-title" />
          <p className="text-xs text-muted">{l(project.statusNote, locale)}</p>
          <p className="max-w-2xl text-lg text-foreground/90 md:text-xl">{l(project.summary, locale)}</p>
          {project.scope && (
            <p className="max-w-2xl border-l-2 border-accent pl-4 text-sm text-muted">
              <span className="font-semibold text-foreground">{dict.labels.scope}:</span> {l(project.scope, locale)}
            </p>
          )}
          <StackTags stack={project.stack} />
          <ProjectLinks project={project} dict={dict} />
        </header>

        <section className={block} aria-labelledby="problem">
          <h2 id="problem" className={h2}>{dict.labels.problem}</h2>
          <p className="max-w-2xl text-foreground/90">{l(project.problem, locale)}</p>
        </section>

        <section className={block} aria-labelledby="built">
          <h2 id="built" className={h2}>{dict.labels.built}</h2>
          <p className="max-w-2xl text-foreground/90">{l(project.built, locale)}</p>
        </section>

        <section className={block} aria-labelledby="architecture">
          <h2 id="architecture" className={h2}>{dict.labels.architecture}</h2>
          <ArchitectureDiagram architecture={page.architecture} locale={locale} dict={dict} />
        </section>

        {project.highlights.length > 0 && (
          <section className={block} aria-labelledby="evidence">
            <h2 id="evidence" className={h2}>{dict.labels.evidence}</h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {project.highlights.map((h) => (
                <li key={h.en} className="rounded-xl border border-border bg-surface p-4 text-sm">
                  {l(h, locale)}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.guardrails.length > 0 && (
          <section className={block} aria-labelledby="guardrails">
            <h2 id="guardrails" className={h2}>{dict.labels.guardrails}</h2>
            <ul className="flex list-disc flex-col gap-2 pl-5 text-foreground/90">
              {project.guardrails.map((g) => (
                <li key={g.en}>{l(g, locale)}</li>
              ))}
            </ul>
          </section>
        )}

        {snippets.length > 0 && (
          <section className="flex flex-col gap-10" aria-labelledby="code">
            <div className={block}>
              <h2 id="code" className={h2}>{dict.labels.codeExcerpts}</h2>
              <p className="max-w-2xl text-sm text-muted">{dict.labels.codeNote}</p>
            </div>
            {snippets.map((s) => (
              <CodeBlock key={s.id} snippet={s} locale={locale} dict={dict} />
            ))}
          </section>
        )}

        <section className={block} aria-labelledby="limitations">
          <h2 id="limitations" className={h2}>{dict.labels.limitations}</h2>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-foreground/90">
            {project.limitations.map((x) => (
              <li key={x.en}>{l(x, locale)}</li>
            ))}
          </ul>
          {project.builtWith && <p className="text-sm text-muted">{l(project.builtWith, locale)}</p>}
        </section>
      </article>
    </SiteShell>
  );
}
