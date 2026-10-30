import { z } from "zod";
import {
  Certification,
  Education,
  Experience,
  Now,
  Post,
  Profile,
  Project,
  SkillGroup,
} from "./schema";

export const PLACEHOLDER = "[CONFIRMAR";

export const ContentBundle = z.object({
  profile: Profile,
  experience: z.array(Experience),
  education: z.array(Education),
  certifications: z.array(Certification),
  projects: z.array(Project),
  skills: z.array(SkillGroup),
  now: Now,
  posts: z.array(Post),
});
export type ContentBundle = z.infer<typeof ContentBundle>;

/** Collects every string inside a value, with its path, for placeholder scanning. */
function strings(value: unknown, path: string, out: { path: string; text: string }[]) {
  if (typeof value === "string") out.push({ path, text: value });
  else if (Array.isArray(value)) value.forEach((v, i) => strings(v, `${path}[${i}]`, out));
  else if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value)) strings(v, `${path}.${k}`, out);
  return out;
}

/**
 * Items that will actually be rendered. Hidden items and certifications
 * without a verification link are allowed to hold placeholders.
 */
function rendered(content: ContentBundle) {
  return {
    profile: content.profile,
    experience: content.experience.filter((e) => e.visible),
    education: content.education.filter((e) => e.visible),
    certifications: content.certifications.filter((c) => c.status !== "pending_link"),
    projects: content.projects.filter((p) => p.visible),
    skills: content.skills,
    now: content.now.items.filter((i) => i.visible),
    posts: content.posts.filter((p) => p.visible),
  };
}

/**
 * Validates the whole content bundle. Throws with a readable list of problems.
 * Runs at build time (imported by src/content/index.ts) and in CI.
 */
export function validateContent(input: unknown): ContentBundle {
  const parsed = ContentBundle.safeParse(input);
  if (!parsed.success) {
    throw new Error(`Invalid content:\n${z.prettifyError(parsed.error)}`);
  }
  const content = parsed.data;

  const problems: string[] = [];

  const placeholders = strings(rendered(content), "content", []).filter((s) =>
    s.text.includes(PLACEHOLDER),
  );
  for (const p of placeholders)
    problems.push(`${p.path}: visible item still has a placeholder → "${p.text}"`);

  const slugs = content.projects.map((p) => p.slug);
  const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  for (const d of dupes) problems.push(`projects: duplicate slug "${d}"`);

  if (content.projects.filter((p) => p.visible && p.featured).length > 1)
    problems.push("projects: only one visible project can be featured");

  if (problems.length) throw new Error(`Content rules violated:\n- ${problems.join("\n- ")}`);
  return content;
}

/** Lists placeholders still pending anywhere (visible or not) — for the CLI report. */
export function pendingPlaceholders(input: ContentBundle) {
  return strings(input, "content", []).filter((s) => s.text.includes(PLACEHOLDER));
}
