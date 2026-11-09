"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";

type Strings = {
  name: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  success: string;
  error: string;
  privacy: string;
  privacyLink: string;
  subject: string;
};

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2";

/**
 * Contact form posting to Formspree (ADR-021).
 * - With JavaScript: fetch with `Accept: application/json`, inline status.
 * - Without JavaScript: the native form POST still works (Formspree's own thank-you page).
 * - `_gotcha` is Formspree's honeypot: hidden from people, filled by bots.
 */
export function ContactForm({
  endpoint,
  fallbackEmail,
  privacyHref,
  strings,
}: {
  endpoint: string;
  fallbackEmail: string;
  privacyHref: string;
  strings: Strings;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form action={endpoint} method="POST" onSubmit={onSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="_subject" value={strings.subject} />
      <div aria-hidden className="hidden">
        <label>
          Leave empty
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          {strings.name}
          <input name="name" required maxLength={120} autoComplete="name" className={field} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          {strings.email}
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        {strings.message}
        <textarea name="message" required minLength={10} maxLength={5000} rows={6} className={`${field} resize-y`} />
      </label>

      <p className="text-xs leading-relaxed text-muted">
        {strings.privacy}{" "}
        <a href={privacyHref} className="underline underline-offset-4 hover:text-foreground">
          {strings.privacyLink}
        </a>
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Send className="size-4" aria-hidden />
          )}
          {status === "sending" ? strings.sending : strings.send}
        </button>

        <p role="status" aria-live="polite" className="text-sm">
          {status === "success" && (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0" aria-hidden />
              {strings.success}
            </span>
          )}
          {status === "error" && (
            <span className="flex items-center gap-2">
              <TriangleAlert className="size-4 shrink-0" aria-hidden />
              <span>
                {strings.error}{" "}
                <a href={`mailto:${fallbackEmail}`} className="underline underline-offset-4">
                  {fallbackEmail}
                </a>
              </span>
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
