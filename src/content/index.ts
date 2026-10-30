import { certifications } from "./certifications";
import { education } from "./education";
import { experience } from "./experience";
import { now } from "./now";
import { profile } from "./profile";
import { projects } from "./projects";
import { skills } from "./skills";
import { snippets } from "./snippets";
import { validateContent } from "./validate";
import { posts } from "./writing";

/**
 * The only entry point components should import content from.
 * Validation runs when this module loads, so invalid content fails the build.
 */
export const content = validateContent({
  profile,
  experience,
  education,
  certifications,
  projects,
  skills,
  now,
  posts,
  snippets,
});

export type { Localized } from "./schema";
