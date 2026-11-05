import { ArrowUpRight, PenLine } from "lucide-react";
import { content } from "@/content";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { getLatestPosts } from "@/lib/blog";
import { formatDate } from "@/lib/localize";

/** Newest blog posts in the page's language (title + date only) and a link to the blog. */
export async function Writing({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const posts = await getLatestPosts(locale);

  return (
    <div className="flex flex-col gap-6">
      {posts.length > 0 && (
        <ul className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-surface">
          {posts.map((post) => (
            <li key={post.url}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 p-5 transition-colors hover:bg-surface-2"
              >
                <div className="flex flex-col gap-1.5">
                  <span className="font-semibold underline-offset-4 group-hover:underline">{post.title}</span>
                  <time dateTime={post.date} className="font-mono text-xs text-muted">
                    {formatDate(post.date, locale)}
                  </time>
                </div>
                <ArrowUpRight className="mt-0.5 size-5 shrink-0 text-muted" aria-hidden />
                <span className="sr-only"> ({dict.labels.opensInNewTab})</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <a
        href={content.blog.home[locale]}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-fit items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-surface-2"
      >
        <PenLine className="size-4" aria-hidden />
        {posts.length > 0 ? dict.labels.allPosts : dict.labels.readBlog}
        <span className="sr-only"> ({dict.labels.opensInNewTab})</span>
      </a>
    </div>
  );
}
