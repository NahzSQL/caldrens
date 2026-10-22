"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, Phone, Send, ShieldAlert } from "lucide-react";
import { limits, matterLabel, validateEnquiry, type EnquiryErrors, type EnquiryInput } from "@/lib/enquiry";
import { matterTypes, site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const empty: EnquiryInput = { name: "", email: "", phone: "", matter: "", message: "", consent: false };

const fieldOrder: (keyof EnquiryInput)[] = ["name", "email", "phone", "matter", "message", "consent"];

export function ContactForm() {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const [values, setValues] = useState<EnquiryInput>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Pre-select the matter type when arriving from a service link, e.g. /contact?matter=family-law
  useEffect(() => {
    const matter = new URLSearchParams(window.location.search).get("matter");
    if (matter && matterTypes.some((m) => m.value === matter)) setValues((v) => ({ ...v, matter }));
  }, []);

  useEffect(() => {
    if (status === "success" || status === "error") resultRef.current?.focus();
  }, [status]);

  const update = <K extends keyof EnquiryInput>(key: K, value: EnquiryInput[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (attempted) setErrors(validateEnquiry(next));
    if (status === "error") setStatus("idle");
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttempted(true);
    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = fieldOrder.find((f) => found[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; errors?: EnquiryErrors } | null;
      if (res.ok && data?.ok) {
        setStatus("success");
        return;
      }
      if (res.status === 422 && data?.errors) setErrors(data.errors);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const mailtoFallback = () => {
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.phone ? `Phone: ${values.phone}` : "",
      `Type of matter: ${matterLabel(values.matter)}`,
      "",
      values.message,
    ]
      .filter((l, i) => l !== "" || i === 4)
      .join("\n");
    return `${site.emailHref}?subject=${encodeURIComponent(`Enquiry: ${matterLabel(values.matter)}`)}&body=${encodeURIComponent(body)}`;
  };

  if (status === "success") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="bg-white p-8 text-center shadow-card focus:outline-none sm:p-12">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold-500" strokeWidth={1.4} aria-hidden="true" />
        <h3 className="mt-6 text-3xl">Thank you, {values.name.split(" ")[0]}.</h3>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-navy-700">
          Your enquiry has been sent to JurisPoint. It will be reviewed, and you will be contacted at{" "}
          <strong className="font-semibold text-navy-900">{values.email}</strong>
          {values.phone ? " or by phone" : ""} to discuss the next steps.
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-navy-600">
          Please remember that sending an enquiry does not create a lawyer-client relationship.
        </p>
        <button
          type="button"
          className="btn-outline mt-8"
          onClick={() => {
            setValues(empty);
            setErrors({});
            setAttempted(false);
            setStatus("idle");
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;
  const inputBase =
    "mt-2 block w-full rounded-sm border bg-white px-4 py-3 text-base text-ink shadow-sm transition-colors placeholder:text-navy-400 focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/40";
  const fieldClass = (f: keyof EnquiryInput) => `${inputBase} ${errors[f] ? "border-red-700" : "border-navy-900/20 hover:border-navy-900/40"}`;
  const describedBy = (f: keyof EnquiryInput, hint?: string) =>
    [hint, errors[f] ? id(`${f}-error`) : null].filter(Boolean).join(" ") || undefined;

  const fieldError = (f: keyof EnquiryInput) =>
    errors[f] ? (
      <p id={id(`${f}-error`)} className="mt-2 flex items-start gap-1.5 text-sm text-red-800">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        {errors[f]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="bg-white p-6 shadow-card sm:p-10" aria-describedby={id("sensitive")}>
      <div
        id={id("sensitive")}
        className="flex gap-3 border-l-2 border-gold-500 bg-ivory-100 p-4 text-sm leading-relaxed text-navy-800"
      >
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
        <p>
          <strong className="font-semibold">Please keep your first message brief.</strong> Do not include highly
          sensitive or confidential information in an initial enquiry. A general outline of your matter is enough.
        </p>
      </div>

      <div aria-live="polite" className="empty:hidden">
        {attempted && errorCount > 0 && status !== "submitting" && (
          <p className="mt-6 flex items-start gap-2 rounded-sm bg-red-50 p-4 text-sm text-red-900">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {errorCount === 1 ? "Please correct the highlighted field below." : `Please correct the ${errorCount} highlighted fields below.`}
          </p>
        )}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={id("name")} className="text-sm font-semibold text-navy-900">
            Full name <span className="text-red-800" aria-hidden="true">*</span>
          </label>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={limits.name}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className={fieldClass("name")}
          />
          {fieldError("name")}
        </div>

        <div>
          <label htmlFor={id("email")} className="text-sm font-semibold text-navy-900">
            Email address <span className="text-red-800" aria-hidden="true">*</span>
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={limits.email}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={fieldClass("email")}
          />
          {fieldError("email")}
        </div>

        <div>
          <label htmlFor={id("phone")} className="text-sm font-semibold text-navy-900">
            Phone number <span className="font-normal text-navy-500">(optional)</span>
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={limits.phone}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            className={fieldClass("phone")}
          />
          {fieldError("phone")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("matter")} className="text-sm font-semibold text-navy-900">
            Type of legal matter <span className="text-red-800" aria-hidden="true">*</span>
          </label>
          <select
            id={id("matter")}
            name="matter"
            required
            value={values.matter}
            onChange={(e) => update("matter", e.target.value)}
            aria-invalid={!!errors.matter}
            aria-describedby={describedBy("matter")}
            className={`${fieldClass("matter")} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23B38F4D%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            <option value="" disabled>
              Please choose…
            </option>
            {matterTypes.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          {fieldError("matter")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className="text-sm font-semibold text-navy-900">
            Message <span className="text-red-800" aria-hidden="true">*</span>
          </label>
          <p id={id("message-hint")} className="mt-1 text-sm text-navy-600">
            Briefly describe what you would like to discuss.
          </p>
          <textarea
            id={id("message")}
            name="message"
            rows={6}
            required
            maxLength={limits.message}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message", id("message-hint"))}
            className={`${fieldClass("message")} resize-y`}
          />
          <div className="flex items-start justify-between gap-4">
            {fieldError("message")}
            <p className="ml-auto mt-2 shrink-0 text-xs text-navy-500" aria-hidden="true">
              {values.message.length}/{limits.message}
            </p>
          </div>
        </div>

        {/* Honeypot for spam bots: hidden from people and assistive technology. */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor={id("website")}>Leave this field empty</label>
          <input id={id("website")} type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              id={id("consent")}
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => update("consent", e.target.checked)}
              aria-invalid={!!errors.consent}
              aria-describedby={describedBy("consent", id("privacy"))}
              className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded-sm border-navy-900/30 accent-navy-900"
            />
            <label htmlFor={id("consent")} className="cursor-pointer text-sm leading-relaxed text-navy-800">
              I have read the privacy notice below and understand that sending this enquiry does not create a
              lawyer-client relationship. <span className="text-red-800" aria-hidden="true">*</span>
            </label>
          </div>
          {fieldError("consent")}
          <p id={id("privacy")} className="mt-4 text-xs leading-relaxed text-navy-600">
            <strong className="font-semibold text-navy-800">Privacy notice:</strong> the details you submit are used only
            to review and respond to your enquiry. They are not sold or shared for marketing purposes.
          </p>
        </div>
      </div>

      {status === "error" && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="mt-8 border-l-2 border-red-700 bg-red-50 p-5 text-sm leading-relaxed text-red-950 focus:outline-none">
          <p className="font-semibold">Your enquiry has not been sent.</p>
          <p className="mt-1">
            {errorCount
              ? "Please check the highlighted fields and try again."
              : "The online form is unable to send messages right now. Please contact JurisPoint directly instead. Your message is still in the form, so nothing has been lost."}
          </p>
          {!errorCount && (
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={mailtoFallback()} className="btn-primary py-2.5">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email this enquiry instead
              </a>
              <a href={site.phoneHref} className="btn-outline py-2.5">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {site.phoneDisplay}
              </a>
            </div>
          )}
          {!errorCount && (
            <p className="mt-3 text-xs text-red-900/80">
              &ldquo;Email this enquiry instead&rdquo; opens your email app with your message filled in. It is sent only
              when you press send there.
            </p>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-navy-500">
          <span aria-hidden="true">*</span> Required field
        </p>
        <button type="submit" disabled={status === "submitting"} className="btn-primary w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto">
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Send enquiry
            </>
          )}
        </button>
      </div>
    </form>
  );
}
