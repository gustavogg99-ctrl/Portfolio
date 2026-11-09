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
  /** Formspree endpoint for the contact form (ADR-021). The form ID is public by design. */
  contactForm: z.string().regex(/^https:\/\/formspree\.io\/f\/[a-z0-9]+$/, "Formspree endpoint: https://formspree.io/f/<id>"),
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
  /** Exactly one: `expectedEnd` (in progress) or `completed`. */
  expectedEnd: YearMonth.optional(),
  completed: YearMonth.optional(),
  visible,
}).refine((e) => Boolean(e.expectedEnd) !== Boolean(e.completed), {
  message: "Education needs exactly one of expectedEnd or completed",
});
export type Education = z.infer<typeof Education>;

/* ---------- certifications ---------- */

const certBase = {
  id: z.string(),
  /** Plain string for official names (same in both languages); `{ en, pt }` for descriptions (ADR-014). */
  name: z.union([z.string(), Localized]),
  issuer: z.string(),
};

/**
 * Discriminated by status:
 * - verified: rendered, MUST have a credential URL. Usually a page for this
 *   credential (Microsoft Learn, Credly). When the issuer only offers a lookup
 *   portal (e.g. PeopleCert), `credentialUrl` is the portal and `lookupId` is the
 *   public certificate number the visitor types there (ADR-017). Never a
 *   candidate/customer number.
 * - pending_link: issued, but we don't have the verification link yet → NOT rendered.
 * - in_progress: rendered under "in progress", no URL.
 */
export const Certification = z.discriminatedUnion("status", [
  z.object({
    ...certBase,
    status: z.literal("verified"),
    credentialUrl: z.url(),
    lookupId: z.string().regex(/^[A-Z0-9-]{6,40}$/, "Certificate number as printed, e.g. GR123456789AB").optional(),
    issued: YearMonth.optional(),
  }),
  z.object({ ...certBase, status: z.literal("pending_link") }),
  z.object({ ...certBase, issuer: z.string().optional(), status: z.literal("in_progress") }),
]);
export type Certification = z.infer<typeof Certification>;

/* ---------- projects ---------- */

/** One step of an architecture flow, rendered as a box in the diagram. */
export const ArchitectureStep = z.object({
  title: Localized,
  detail: Localized,
  /** "ai" = LLM step, "guard" = deterministic control/test, "human" = manual review. */
  kind: z.enum(["io", "ai", "code", "guard", "human"]),
});

/** A sanitized code excerpt shown on a project page (see docs/SOURCES.md). */
export const Snippet = z.object({
  id: z.string(),
  title: Localized,
  language: z.string(),
  /** Generic source path inside the project, never an absolute path. */
  file: z.string().regex(/^[\w./+ -]+$/, "Generic relative path only"),
  code: z.string().min(1),
  explanation: Localized,
  /** How this excerpt differs from the real code (honesty note). */
  fidelity: Localized,
});
export type Snippet = z.infer<typeof Snippet>;

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
  /** Projects with a dedicated page at /[lang]/projects/[slug]. */
  page: z
    .object({
      architecture: z.object({
        main: z.array(ArchitectureStep).min(2),
        outputs: z.array(Localized).default([]),
        parallel: Localized.optional(),
      }),
      snippetIds: z.array(z.string()).default([]),
    })
    .optional(),
  visible,
});
export type Project = z.infer<typeof Project>;

/* ---------- skills ---------- */

/** A tool/standard name (same in both languages) or a localized description. */
export const SkillItem = z.union([z.string().min(1), Localized]);

export const SkillGroup = z.object({
  id: z.string(),
  name: Localized,
  items: z.array(SkillItem).min(1),
});
export type SkillGroup = z.infer<typeof SkillGroup>;

/* ---------- now ---------- */

/**
 * "Now": three fixed lines (ADR-031): current work status, what I'm studying,
 * the project I'm building. At most one visible item per kind.
 */
export const NowKind = z.enum(["work", "study", "project"]);
export type NowKind = z.infer<typeof NowKind>;

export const Now = z.object({
  updated: YearMonth,
  items: z
    .array(
      z.object({
        id: z.string(),
        kind: NowKind,
        text: Localized,
        /** Optional evidence link (repository, contact). External links open in a new tab. */
        link: z.object({ href: z.string().regex(/^(https:\/\/|#)/, "https URL or #anchor"), label: Localized }).optional(),
        visible,
      }),
    )
    .refine(
      (items) => {
        const kinds = items.filter((i) => i.visible !== false).map((i) => i.kind);
        return new Set(kinds).size === kinds.length;
      },
      { message: "Now: at most one visible item per kind" },
    ),
});
export type Now = z.infer<typeof Now>;

/* ---------- writing ---------- */

/**
 * Blog (Writing section). Posts are read from the blog's RSS feed at render
 * time and cached (ADR-020) — they are not stored here. Only titles and dates
 * are shown, and titles pass through the claims guard.
 */
export const Blog = z.object({
  feedUrl: z.url(),
  /** "See all posts" link per locale. */
  home: z.object({ en: z.url(), pt: z.url() }),
  /** WordPress category that marks each language. */
  category: z.object({ en: z.string().min(1), pt: z.string().min(1) }),
  max: z.number().int().min(1).max(6),
  /** Post URLs never shown, even if newest. */
  hidden: z.array(z.url()),
  /**
   * Post URLs reviewed by Gustavo that may show even if the title trips the
   * claims guard (e.g. naming a company in a non-employer context). Keep short.
   */
  allowed: z.array(z.url()),
});
export type Blog = z.infer<typeof Blog>;
