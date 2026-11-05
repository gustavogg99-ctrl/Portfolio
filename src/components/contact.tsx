import { Mail } from "lucide-react";
import { content } from "@/content";
import type { Dictionary } from "@/i18n/dictionaries";
import { ContactForm } from "./contact-form";
import { LinkedInIcon } from "./icons";

/** Contact: short intro, form (Formspree) and direct channels. No phone, no WhatsApp. */
export function Contact({ dict }: { dict: Dictionary }) {
  const { profile } = content;
  const c = dict.contact;

  return (
    <div className="grid gap-10 xl:grid-cols-[1fr_16rem]">
      <div className="flex max-w-2xl flex-col gap-6">
        <p className="text-lg leading-relaxed text-foreground/90">{c.intro}</p>
        <ContactForm
          endpoint={profile.contactForm}
          fallbackEmail={profile.email}
          strings={{
            name: c.name,
            email: c.email,
            message: c.message,
            send: c.send,
            sending: c.sending,
            success: c.success,
            error: c.error,
            privacy: c.privacy,
            subject: c.subject,
          }}
        />
      </div>

      <div className="flex flex-col gap-4 self-start rounded-2xl border border-border bg-surface p-5 text-sm">
        <p className="text-muted">{c.direct}</p>
        <a href={`mailto:${profile.email}`} className="flex items-center gap-2 break-all underline-offset-4 hover:underline">
          <Mail className="size-4 shrink-0 text-muted" aria-hidden />
          {profile.email}
        </a>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 underline-offset-4 hover:underline"
        >
          <LinkedInIcon className="size-4 shrink-0 text-muted" />
          LinkedIn
          <span className="sr-only"> ({dict.labels.opensInNewTab})</span>
        </a>
      </div>
    </div>
  );
}
