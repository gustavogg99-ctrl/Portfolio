import Link from "next/link";
import { ArrowRight, ExternalLink, Lock } from "lucide-react";
import { content } from "@/content";
import type { Project } from "@/content/schema";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { l } from "@/lib/localize";
import { GitHubIcon } from "./icons";

export function StatusBadge({ project, dict }: { project: Project; dict: Dictionary }) {
  return (
    <span className="w-fit rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-wide text-muted uppercase">
      {dict.status[project.status]}
    </span>
  );
}

export function StackTags({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((item) => (
        <li key={item} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProjectLinks({ project, dict }: { project: Project; dict: Dictionary }) {
  const { live, repo, repoPrivate } = project.links;
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 underline-offset-4 hover:underline"
        >
          <ExternalLink className="size-4" aria-hidden />
          {dict.labels.liveSite}
        </a>
      )}
      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 underline-offset-4 hover:underline"
        >
          <GitHubIcon className="size-4" />
          {dict.labels.repository}
        </a>
      )}
      {repoPrivate && (
        <span className="flex items-center gap-1.5 text-muted">
          <Lock className="size-4" aria-hidden />
          {dict.labels.privateRepo}
        </span>
      )}
    </div>
  );
}

function List({ title, items, locale }: { title: string; items: Project["limitations"]; locale: Locale }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-muted">
        {items.map((item) => (
          <li key={item.en}>{l(item, locale)}</li>
        ))}
      </ul>
    </div>
  );
}

/** Large card for the featured project, linking to its case-study page. */
function FeaturedCard({ project, locale, dict }: { project: Project; locale: Locale; dict: Dictionary }) {
  return (
    <article className="flex flex-col gap-6 rounded-3xl border border-border bg-surface p-6 md:p-8">
      <div className="flex flex-col gap-3">
        <StatusBadge project={project} dict={dict} />
        <h3 className="text-3xl font-bold tracking-tight md:text-4xl">{project.name}</h3>
        <p className="text-xs text-muted">{l(project.statusNote, locale)}</p>
      </div>
      <p className="text-lg text-foreground/90">{l(project.summary, locale)}</p>
      {project.scope && (
        <p className="border-l-2 border-accent pl-4 text-sm text-muted">{l(project.scope, locale)}</p>
      )}
      <ul className="grid gap-3 sm:grid-cols-2">
        {project.highlights.slice(0, 4).map((h) => (
          <li key={h.en} className="rounded-xl border border-border bg-surface-2 p-4 text-sm">
            {l(h, locale)}
          </li>
        ))}
      </ul>
      <StackTags stack={project.stack} />
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        {project.page && (
          <Link
            href={`/${locale}/projects/${project.slug}`}
            className="group flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            {dict.labels.readCase}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        )}
        <ProjectLinks project={project} dict={dict} />
      </div>
    </article>
  );
}

/** Regular card; details are expandable with a native <details> (no JavaScript). */
function ProjectCard({ project, locale, dict }: { project: Project; locale: Locale; dict: Dictionary }) {
  return (
    <article className="flex flex-col gap-5 rounded-3xl border border-border bg-surface p-6">
      <div className="flex flex-col gap-3">
        <StatusBadge project={project} dict={dict} />
        <h3 className="text-2xl font-bold tracking-tight">{project.name}</h3>
        <p className="text-xs text-muted">{l(project.statusNote, locale)}</p>
      </div>
      <p className="text-foreground/90">{l(project.summary, locale)}</p>
      <StackTags stack={project.stack} />

      <details className="group rounded-xl border border-border bg-surface-2 p-4 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between text-sm font-medium">
          {dict.labels.details}
          <ArrowRight className="size-4 transition-transform group-open:rotate-90" aria-hidden />
        </summary>
        <div className="mt-4 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">{dict.labels.problem}</h4>
            <p className="text-sm text-muted">{l(project.problem, locale)}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">{dict.labels.built}</h4>
            <p className="text-sm text-muted">{l(project.built, locale)}</p>
          </div>
          <List title={dict.labels.evidence} items={project.highlights} locale={locale} />
          <List title={dict.labels.guardrails} items={project.guardrails} locale={locale} />
          <List title={dict.labels.limitations} items={project.limitations} locale={locale} />
        </div>
      </details>

      <ProjectLinks project={project} dict={dict} />
    </article>
  );
}

export function Projects({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const visible = content.projects.filter((p) => p.visible);
  const featured = visible.find((p) => p.featured);
  const others = visible.filter((p) => !p.featured);

  return (
    <div className="flex flex-col gap-6">
      {featured && <FeaturedCard project={featured} locale={locale} dict={dict} />}
      <div className="grid gap-6 xl:grid-cols-2">
        {others.map((p) => (
          <ProjectCard key={p.slug} project={p} locale={locale} dict={dict} />
        ))}
      </div>
    </div>
  );
}
