import { z } from "zod";

/**
 * Content schemas. These are the rules that keep the site honest:
 *
 * 1. A certification is only shown if it has a verification URL.
 * 2. Anything marked `visible: false` is kept in the repo but never rendered.
 * 3. A visible item may not contain a "[CONFIRMAR" placeholder
 *    (enforced in ./validate.ts). If in doubt, leave it out.
 *
 * See docs/CONTENT.md for how to edit content.
 */

/** Text in both languages. Both are required so no section is half-translated. */
export const Localized = z.object({
  en: z.string().min(1),
  pt: z.string().min(1),
});
export type Localized = z.infer<typeof Localized>;

/** Year-month, e.g. "2024-10". Day precision is never needed on this site. */
export const YearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use YYYY-MM");

const visible = z.boolean().default(true);

/* ---------- profile ---------- */

export const Profile = z.object({
  name: z.string().min(1),
  title: Localized,
  tagline: Localized,
  headline: Localized,
  subtitle: Localized,
  hero: z.object({
    static: Localized,
    rotating: z.array(Localized).min(1),
  }),
  location: Localized,
  openTo: Localized,
  about: z.array(Localized).min(1),
  email: z.email(),
  links: z.object({
    linkedin: z.url(),
    github: z.url(),
    blog: z.url(),
    /** This site's own repository (footer link). */
    source: z.url(),
  }),
  resumeUrl: z.string().nullable(),
  languages: z.array(z.object({ name: Localized, level: Localized })),
  stats: z
    .array(
      z.object({
        value: Localized,
        label: Localized,
        /** Internal note: where the number comes from. Never rendered. */
        evidence: z.string().min(1),
      }),
    )
    .max(4),
});
export type Profile = z.infer<typeof Profile>;

/* ---------- experience ---------- */

export const Role = z.object({
  title: Localized,
  start: YearMonth,
  end: YearMonth.nullable(), // null = current
});

export const Experience = z.object({
  id: z.string(),
  company: z.string(),
  context: Localized.optional(),
  roles: z.array(Role).min(1),
  highlights: z.array(Localized).min(1),
  visible,
});
export type Experience = z.infer<typeof Experience>;

/* ---------- education ---------- */

export const Education = z.object({
  id: z.string(),
  course: Localized,
  institution: z.string(),
  degree: Localized,
  expectedEnd: YearMonth,
  visible,
});
export type Education = z.infer<typeof Education>;

/* ---------- certifications ---------- */

const certBase = {
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
};

/**
 * Discriminated by status:
 * - verified: rendered, MUST have a credential URL.
 * - pending_link: issued, but we don't have the verification link yet → NOT rendered.
 * - in_progress: rendered under "in progress", no URL.
 */
export const Certification = z.discriminatedUnion("status", [
  z.object({ ...certBase, status: z.literal("verified"), credentialUrl: z.url(), issued: YearMonth.optional() }),
  z.object({ ...certBase, status: z.literal("pending_link") }),
  z.object({ ...certBase, issuer: z.string().optional(), status: z.literal("in_progress") }),
]);
export type Certification = z.infer<typeof Certification>;

/* ---------- projects ---------- */

export const ProjectStatus = z.enum(["live", "paused", "prototype", "in_development", "template"]);

export const Project = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  featured: z.boolean().default(false),
  status: ProjectStatus,
  statusNote: Localized,
  summary: Localized,
  /** Scope statement shown first, e.g. what the project does NOT do. */
  scope: Localized.optional(),
  problem: Localized,
  built: Localized,
  stack: z.array(z.string()).min(1),
  highlights: z.array(Localized).default([]),
  guardrails: z.array(Localized).default([]),
  limitations: z.array(Localized).min(1, "Every project states its limitations"),
  links: z.object({
    live: z.url().optional(),
    repo: z.url().optional(),
    repoPrivate: z.boolean().default(false),
  }),
  builtWith: Localized.optional(),
  visible,
});
export type Project = z.infer<typeof Project>;

/* ---------- skills ---------- */

export const SkillGroup = z.object({
  id: z.string(),
  name: Localized,
  items: z.array(z.string()).min(1),
});
export type SkillGroup = z.infer<typeof SkillGroup>;

/* ---------- now ---------- */

export const Now = z.object({
  updated: YearMonth,
  items: z.array(
    z.object({
      id: z.string(),
      text: Localized,
      status: z.enum(["in_progress", "planned"]),
      visible,
    }),
  ),
});
export type Now = z.infer<typeof Now>;

/* ---------- writing ---------- */

export const Post = z.object({
  id: z.string(),
  title: Localized,
  summary: Localized,
  published: YearMonth,
  url: z.object({ en: z.url(), pt: z.url() }),
  visible,
});
export type Post = z.infer<typeof Post>;
