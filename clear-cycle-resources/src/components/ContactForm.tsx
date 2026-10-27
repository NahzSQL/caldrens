"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { areasOfInterest, siteConfig } from "@/config/site";
import {
  LIMITS,
  validateContact,
  type ContactField,
  type FieldErrors,
} from "@/lib/contact/validation";

type Status = "idle" | "submitting" | "success" | "error";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const fieldOrder: ContactField[] = [
  "fullName",
  "email",
  "organization",
  "jobTitle",
  "interest",
  "message",
  "consent",
];

const fieldLabels: Record<ContactField, string> = {
  fullName: "Full name",
  email: "Business email",
  organization: "Organization",
  jobTitle: "Job title",
  interest: "Area of interest",
  message: "Message",
  consent: "Consent",
};

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function ContactForm() {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const startedAtRef = useRef<number>(0);

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formMessage, setFormMessage] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  // Turnstile (optional)
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileReady || !turnstileRef.current || !window.turnstile) return;
    if (turnstileWidgetId.current) return;
    turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "light",
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
    });
    return () => {
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, [turnstileReady]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const fieldId = (name: ContactField) => `${formId}-${name}`;
  const errorId = (name: ContactField) => `${formId}-${name}-error`;

  function readForm(form: HTMLFormElement) {
    const data = new FormData(form);
    return {
      fullName: String(data.get("fullName") ?? ""),
      email: String(data.get("email") ?? ""),
      organization: String(data.get("organization") ?? ""),
      jobTitle: String(data.get("jobTitle") ?? ""),
      interest: String(data.get("interest") ?? ""),
      message: String(data.get("message") ?? ""),
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""),
    };
  }

  /** Re-check a field as the visitor corrects it, once an error is showing. */
  function revalidateField(name: ContactField) {
    if (!errors[name] || !formRef.current) return;
    const result = validateContact(readForm(formRef.current));
    const nextError = result.ok ? undefined : result.errors[name];
    if (!nextError) {
      setErrors((current) => {
        const copy = { ...current };
        delete copy[name];
        return copy;
      });
    }
  }

  function focusFirstError(fieldErrors: FieldErrors) {
    const first = fieldOrder.find((name) => fieldErrors[name]);
    if (first) document.getElementById(fieldId(first))?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const values = readForm(form);
    const result = validateContact(values);

    if (!result.ok) {
      setErrors(result.errors);
      setFormMessage("Please correct the highlighted fields.");
      setShowSummary(true);
      setStatus("error");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setErrors({});
      setFormMessage("Please complete the verification check before sending your message.");
      setShowSummary(false);
      setStatus("error");
      return;
    }

    setErrors({});
    setShowSummary(false);
    setFormMessage("");
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          startedAt: startedAtRef.current,
          turnstileToken,
        }),
      });

      const body = (await response.json().catch(() => null)) as
        | { ok: boolean; message?: string; fieldErrors?: FieldErrors }
        | null;

      if (response.ok && body?.ok) {
        form.reset();
        setMessageLength(0);
        setStatus("success");
        return;
      }

      if (body?.fieldErrors) {
        setErrors(body.fieldErrors);
        setShowSummary(true);
        requestAnimationFrame(() => focusFirstError(body.fieldErrors ?? {}));
      }
      setFormMessage(
        body?.message ??
          `Something went wrong while sending your message. Please email us directly at ${siteConfig.email}.`,
      );
      setStatus("error");
    } catch {
      setFormMessage(
        `We couldn't reach our server. Please check your connection and try again, or email us directly at ${siteConfig.email}.`,
      );
      setStatus("error");
    } finally {
      if (TURNSTILE_SITE_KEY && window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current);
        setTurnstileToken("");
      }
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start rounded-2xl border border-teal/30 bg-teal-50 p-8 focus:outline-none"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal text-white">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-2xl font-bold">Thank you. Your message has been sent.</h3>
        <p className="mt-3 leading-relaxed text-charcoal">
          Your inquiry was delivered to the {siteConfig.name} team. We will reply to the email
          address you provided.
        </p>
        <button
          type="button"
          onClick={() => {
            startedAtRef.current = Date.now();
            setStatus("idle");
          }}
          className="mt-6 inline-flex items-center rounded-lg bg-white px-5 py-3 font-semibold text-navy ring-1 ring-inset ring-line transition-colors hover:bg-mist"
        >
          Send another message
        </button>
      </div>
    );
  }

  const errorEntries = fieldOrder.filter((name) => errors[name]);
  const submitting = status === "submitting";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={`${formId}-required-note`}
      className="space-y-6"
    >
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={() => setTurnstileReady(true)}
        />
      )}

      <p id={`${formId}-required-note`} className="text-sm text-slate">
        Fields marked with <span className="font-semibold text-[#B42318]" aria-hidden="true">*</span>
        <span className="sr-only">an asterisk</span> are required.
      </p>

      {status === "error" && formMessage && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-[#F3C3BD] bg-[#FEF3F2] p-4 text-[#7A271A] focus:outline-none"
        >
          <p className="flex items-start gap-2.5 font-semibold">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            {formMessage}
          </p>
          {showSummary && errorEntries.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-12 text-sm">
              {errorEntries.map((name) => (
                <li key={name}>
                  <a href={`#${fieldId(name)}`} className="underline underline-offset-2">
                    {fieldLabels[name]}: {errors[name]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fieldId("fullName")} label="Full name" required error={errors.fullName} errorId={errorId("fullName")}>
          <input
            id={fieldId("fullName")}
            name="fullName"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.fullName.max}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? errorId("fullName") : undefined}
            onChange={() => revalidateField("fullName")}
            className={inputClass(Boolean(errors.fullName))}
          />
        </Field>

        <Field id={fieldId("email")} label="Business email" required error={errors.email} errorId={errorId("email")}>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email.max}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId("email") : undefined}
            onChange={() => revalidateField("email")}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>

        <Field
          id={fieldId("organization")}
          label="Organization"
          required
          error={errors.organization}
          errorId={errorId("organization")}
        >
          <input
            id={fieldId("organization")}
            name="organization"
            type="text"
            autoComplete="organization"
            required
            maxLength={LIMITS.organization.max}
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={errors.organization ? errorId("organization") : undefined}
            onChange={() => revalidateField("organization")}
            className={inputClass(Boolean(errors.organization))}
          />
        </Field>

        <Field id={fieldId("jobTitle")} label="Job title" optional error={errors.jobTitle} errorId={errorId("jobTitle")}>
          <input
            id={fieldId("jobTitle")}
            name="jobTitle"
            type="text"
            autoComplete="organization-title"
            maxLength={LIMITS.jobTitle.max}
            aria-invalid={Boolean(errors.jobTitle)}
            aria-describedby={errors.jobTitle ? errorId("jobTitle") : undefined}
            onChange={() => revalidateField("jobTitle")}
            className={inputClass(Boolean(errors.jobTitle))}
          />
        </Field>
      </div>

      <Field id={fieldId("interest")} label="Area of interest" required error={errors.interest} errorId={errorId("interest")}>
        <select
          id={fieldId("interest")}
          name="interest"
          required
          defaultValue=""
          aria-invalid={Boolean(errors.interest)}
          aria-describedby={errors.interest ? errorId("interest") : undefined}
          onChange={() => revalidateField("interest")}
          className={`${inputClass(Boolean(errors.interest))} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20viewBox%3D%270%200%2020%2020%27%20fill%3D%27%2307366A%27%3E%3Cpath%20d%3D%27M5.3%207.3a1%201%200%200%201%201.4%200L10%2010.6l3.3-3.3a1%201%200%201%201%201.4%201.4l-4%204a1%201%200%200%201-1.4%200l-4-4a1%201%200%200%201%200-1.4z%27/%3E%3C/svg%3E")] bg-[length:1.25rem] bg-[right_0.875rem_center] bg-no-repeat pr-11`}
        >
          <option value="" disabled>
            Select an area of interest
          </option>
          {areasOfInterest.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id={fieldId("message")}
        label="Message"
        required
        error={errors.message}
        errorId={errorId("message")}
        hint={
          <span id={`${formId}-message-hint`}>
            Please don&apos;t include patient information or other protected health information.
          </span>
        }
      >
        <textarea
          id={fieldId("message")}
          name="message"
          rows={6}
          required
          maxLength={LIMITS.message.max}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={`${formId}-message-hint ${formId}-message-count${errors.message ? ` ${errorId("message")}` : ""}`}
          onChange={(event) => {
            setMessageLength(event.currentTarget.value.length);
            revalidateField("message");
          }}
          className={`${inputClass(Boolean(errors.message))} min-h-40 resize-y leading-relaxed`}
        />
        <p id={`${formId}-message-count`} className="mt-1.5 text-right text-xs text-slate" aria-live="off">
          {messageLength.toLocaleString("en-US")} / {LIMITS.message.max.toLocaleString("en-US")} characters
        </p>
      </Field>

      {/* Honeypot: hidden from people and assistive technology. Bots that fill it are rejected. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-website`}>Leave this field empty</label>
        <input id={`${formId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? errorId("consent") : undefined}
            onChange={() => revalidateField("consent")}
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-line accent-teal"
          />
          <label htmlFor={fieldId("consent")} className="cursor-pointer text-[0.9375rem] leading-relaxed text-charcoal">
            I agree that {siteConfig.name} may use the information I submit to respond to my
            inquiry, as described in the{" "}
            <a href="#privacy" className="font-semibold text-teal-700 underline underline-offset-2 hover:text-navy">
              privacy notice
            </a>
            . <span className="font-semibold text-[#B42318]" aria-hidden="true">*</span>
          </label>
        </div>
        {errors.consent && <ErrorText id={errorId("consent")}>{errors.consent}</ErrorText>}
      </div>

      {TURNSTILE_SITE_KEY && <div ref={turnstileRef} className="min-h-[65px]" />}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          aria-disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 disabled:cursor-wait disabled:opacity-80"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Send Message
            </>
          )}
        </button>
        <p className="text-sm text-slate" aria-live="polite">
          {submitting ? "Sending your message…" : ""}
        </p>
      </div>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return `block w-full rounded-lg border bg-white px-4 py-3 text-base text-charcoal shadow-sm transition-colors placeholder:text-slate/60 focus:outline-none focus:ring-4 ${
    invalid
      ? "border-[#D92D20] focus:border-[#D92D20] focus:ring-[#D92D20]/15"
      : "border-line hover:border-navy/30 focus:border-teal focus:ring-teal/15"
  }`;
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-[#B42318]">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

function Field({
  id,
  label,
  required = false,
  optional = false,
  error,
  errorId,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  errorId: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-navy">
        {label}
        {required && (
          <span className="ml-0.5 text-[#B42318]" aria-hidden="true">
            *
          </span>
        )}
        {optional && <span className="ml-1.5 font-normal text-slate">(optional)</span>}
      </label>
      {hint && <p className="-mt-1 mb-2 text-sm text-slate">{hint}</p>}
      {children}
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}
