"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CalendarCheck, CheckCircle2, LoaderCircle, Mail, Phone, RotateCcw } from "lucide-react";
import {
  appointmentRequestSchema,
  contactMethods,
  MESSAGE_MAX,
  preferredTimes,
  toFieldErrors,
  visitReasons,
  type AppointmentRequest,
  type FieldErrors,
} from "@/lib/appointment-schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

interface AppointmentFormProps {
  /** Contact details shown if a request can't be sent. */
  fallbackContact?: ReactNode;
}

const initialValues = {
  fullName: "",
  contactMethod: "" as "" | "phone" | "email",
  email: "",
  phone: "",
  preferredDate: "",
  preferredTime: "no-preference",
  reason: "",
  message: "",
  consent: false,
  website: "",
};

type Values = typeof initialValues;

const fieldOrder: (keyof AppointmentRequest)[] = [
  "fullName",
  "contactMethod",
  "email",
  "phone",
  "preferredDate",
  "preferredTime",
  "reason",
  "message",
  "consent",
];

const inputClass =
  "block w-full rounded-xl border bg-white px-4 py-3 text-ink shadow-sm transition-colors placeholder:text-navy-300 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/15";

function todayIso() {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

const noopSubscribe = () => () => {};

const SEND_ERROR = "Sorry, we couldn't send your request right now. Please try again in a little while.";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-red-700">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

function Label({ htmlFor, children, optional }: { htmlFor: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[0.95rem] font-semibold text-navy-900">
      {children}
      {optional ? (
        <span className="ml-1.5 font-normal text-muted">(optional)</span>
      ) : (
        <span className="ml-0.5 text-accent-600" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

export function AppointmentForm({ fallbackContact }: AppointmentFormProps) {
  const id = useId();
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  // Today's date, read on the client only (the page itself is prerendered).
  const minDate = useSyncExternalStore(noopSubscribe, todayIso, () => undefined);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status === "success") resultRef.current?.focus();
  }, [status]);

  const fid = (name: string) => `${id}-${name}`;
  const errId = (name: string) => `${id}-${name}-error`;

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    // Clear a field's error as soon as the visitor edits it.
    if (errors[key as keyof FieldErrors]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  }

  function validate(): AppointmentRequest | null {
    const result = appointmentRequestSchema.safeParse(values);
    const fieldErrors: FieldErrors = result.success ? {} : toFieldErrors(result.error);

    if (values.preferredDate && minDate && values.preferredDate < minDate) {
      fieldErrors.preferredDate = "Please choose today or a future date.";
    }

    if (Object.values(fieldErrors).some(Boolean)) {
      setErrors(fieldErrors);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return null;
    }
    setErrors({});
    return result.success ? result.data : null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setServerMessage(null);

    const data = validate();
    if (!data) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/appointment-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok: boolean; message?: string; fieldErrors?: FieldErrors }
        | null;

      if (response.ok && result?.ok) {
        setStatus("success");
        return;
      }
      if (result?.fieldErrors) {
        setErrors(result.fieldErrors);
        setStatus("idle");
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      // One friendly message for every sending problem; visitors don't need technical details.
      setServerMessage(SEND_ERROR);
      setStatus("error");
    } catch {
      setServerMessage(SEND_ERROR);
      setStatus("error");
    }
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
    setServerMessage(null);
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center focus:outline-none sm:p-10"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-700">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-2xl font-bold">Thank you — we received your request</h3>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink">
          Our team will contact you using your preferred contact method to confirm your appointment.
        </p>
        <p className="mx-auto mt-3 max-w-md font-semibold text-navy-900">
          Please note: your appointment is not confirmed until the practice contacts you.
        </p>
        <Button variant="outline" className="mt-8" onClick={reset}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Submit another request
        </Button>
      </div>
    );
  }

  const errorEntries = fieldOrder.filter((key) => errors[key]);
  const submitting = status === "submitting";

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-describedby={`${id}-intro`} className="space-y-7">
      <p id={`${id}-intro`} className="text-sm text-muted">
        Fields marked with <span className="text-accent-600">*</span> are required.
      </p>

      {errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-5 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
        >
          <p className="flex items-center gap-2 font-semibold text-red-800">
            <AlertCircle className="h-5 w-5" aria-hidden="true" />
            Please correct {errorEntries.length === 1 ? "the following field" : `the following ${errorEntries.length} fields`}:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-red-800">
            {errorEntries.map((key) => (
              <li key={key}>
                <a href={`#${key === "contactMethod" ? fid("contactMethod-phone") : fid(key)}`} className="underline underline-offset-2">
                  {errors[key]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {status === "error" && serverMessage && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-[0.95rem] text-red-900">
          <p className="flex items-center gap-2 font-semibold">
            <AlertCircle className="h-5 w-5" aria-hidden="true" />
            Your request was not sent.
          </p>
          <p className="mt-2">
            {serverMessage}
            {fallbackContact ? " You can also contact the practice directly:" : ""}
          </p>
          {fallbackContact && <div className="mt-2">{fallbackContact}</div>}
        </div>
      )}

      {/* Patient name */}
      <div>
        <Label htmlFor={fid("fullName")}>Patient name</Label>
        <input
          id={fid("fullName")}
          name="fullName"
          type="text"
          autoComplete="name"
          required
          maxLength={100}
          value={values.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? errId("fullName") : undefined}
          className={cn(inputClass, errors.fullName ? "border-red-400" : "border-line")}
        />
        <FieldError id={errId("fullName")} message={errors.fullName} />
      </div>

      {/* Preferred contact method */}
      <fieldset aria-describedby={errors.contactMethod ? errId("contactMethod") : undefined}>
        <legend className="mb-2 block text-[0.95rem] font-semibold text-navy-900">
          Preferred contact method
          <span className="ml-0.5 text-accent-600" aria-hidden="true">
            *
          </span>
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {contactMethods.map((method) => {
            const Icon = method.value === "phone" ? Phone : Mail;
            const checked = values.contactMethod === method.value;
            return (
              <label
                key={method.value}
                htmlFor={fid(`contactMethod-${method.value}`)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-teal-500/25",
                  checked ? "border-teal-500 bg-teal-50 text-navy-900" : "border-line bg-white hover:border-navy-300",
                  errors.contactMethod && !checked && "border-red-400",
                )}
              >
                <input
                  id={fid(`contactMethod-${method.value}`)}
                  type="radio"
                  name="contactMethod"
                  value={method.value}
                  checked={checked}
                  onChange={() => update("contactMethod", method.value)}
                  className="h-4 w-4 accent-teal-600"
                />
                <Icon className={cn("h-4 w-4", checked ? "text-teal-700" : "text-navy-400")} aria-hidden="true" />
                <span className="font-medium">{method.label}</span>
              </label>
            );
          })}
        </div>
        <FieldError id={errId("contactMethod")} message={errors.contactMethod} />
      </fieldset>

      {/* Email / phone */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor={fid("phone")} optional={values.contactMethod !== "phone"}>
            Telephone number
          </Label>
          <input
            id={fid("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={30}
            required={values.contactMethod === "phone"}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? errId("phone") : undefined}
            className={cn(inputClass, errors.phone ? "border-red-400" : "border-line")}
          />
          <FieldError id={errId("phone")} message={errors.phone} />
        </div>
        <div>
          <Label htmlFor={fid("email")} optional={values.contactMethod !== "email"}>
            Email address
          </Label>
          <input
            id={fid("email")}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required={values.contactMethod === "email"}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errId("email") : undefined}
            className={cn(inputClass, errors.email ? "border-red-400" : "border-line")}
          />
          <FieldError id={errId("email")} message={errors.email} />
        </div>
      </div>

      {/* Preferred date and time */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor={fid("preferredDate")} optional>
            Preferred date
          </Label>
          <input
            id={fid("preferredDate")}
            name="preferredDate"
            type="date"
            min={minDate}
            value={values.preferredDate}
            onChange={(e) => update("preferredDate", e.target.value)}
            aria-invalid={Boolean(errors.preferredDate)}
            aria-describedby={errors.preferredDate ? errId("preferredDate") : undefined}
            className={cn(inputClass, errors.preferredDate ? "border-red-400" : "border-line")}
          />
          <FieldError id={errId("preferredDate")} message={errors.preferredDate} />
        </div>
        <div>
          <Label htmlFor={fid("preferredTime")} optional>
            Preferred time of day
          </Label>
          <select
            id={fid("preferredTime")}
            name="preferredTime"
            value={values.preferredTime}
            onChange={(e) => update("preferredTime", e.target.value)}
            className={cn(inputClass, "border-line")}
          >
            {preferredTimes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reason */}
      <div>
        <Label htmlFor={fid("reason")}>General reason for your visit</Label>
        <select
          id={fid("reason")}
          name="reason"
          required
          value={values.reason}
          onChange={(e) => update("reason", e.target.value)}
          aria-invalid={Boolean(errors.reason)}
          aria-describedby={errors.reason ? errId("reason") : undefined}
          className={cn(inputClass, errors.reason ? "border-red-400" : "border-line", !values.reason && "text-muted")}
        >
          <option value="" disabled>
            Select a reason
          </option>
          {visitReasons.map((r) => (
            <option key={r.value} value={r.value} className="text-ink">
              {r.label}
            </option>
          ))}
        </select>
        <FieldError id={errId("reason")} message={errors.reason} />
      </div>

      {/* Message */}
      <div>
        <Label htmlFor={fid("message")} optional>
          Message
        </Label>
        <textarea
          id={fid("message")}
          name="message"
          rows={4}
          maxLength={MESSAGE_MAX}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={`${fid("message")}-hint${errors.message ? ` ${errId("message")}` : ""}`}
          className={cn(inputClass, "resize-y", errors.message ? "border-red-400" : "border-line")}
        />
        <div className="mt-2 flex justify-between gap-4 text-sm text-muted">
          <p id={`${fid("message")}-hint`}>
            Scheduling notes only, such as days that work best. Please do not include medical history or other
            sensitive health information.
          </p>
          <span aria-hidden="true" className="shrink-0 tabular-nums">
            {values.message.length}/{MESSAGE_MAX}
          </span>
        </div>
        <FieldError id={errId("message")} message={errors.message} />
      </div>

      {/* Honeypot: hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fid("website")}>Leave this field empty</label>
        <input
          id={fid("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      {/* Consent */}
      <div>
        <div
          className={cn(
            "flex gap-3 rounded-xl border p-4",
            errors.consent ? "border-red-400 bg-red-50/40" : "border-line bg-mist",
          )}
        >
          <input
            id={fid("consent")}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? errId("consent") : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-teal-600"
          />
          <label htmlFor={fid("consent")} className="text-[0.95rem] leading-relaxed text-ink">
            I agree that Evercrest Dental Practice may contact me about this request using the details I provided. I
            understand that this is a request, not a confirmed appointment, and that I should not include sensitive
            health information. I have read the{" "}
            <Link href="/privacy-policy" className="font-semibold text-teal-700 underline underline-offset-2">
              Privacy Policy
            </Link>
            .
            <span className="ml-0.5 text-accent-600" aria-hidden="true">
              *
            </span>
          </label>
        </div>
        <FieldError id={errId("consent")} message={errors.consent} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={submitting} aria-disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
              Sending request…
            </>
          ) : (
            <>
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Request an Appointment
            </>
          )}
        </Button>
        <p className="text-sm text-muted">The practice will contact you to confirm your appointment.</p>
      </div>
      <p className="sr-only" aria-live="polite">
        {submitting ? "Sending your request." : ""}
      </p>
    </form>
  );
}
