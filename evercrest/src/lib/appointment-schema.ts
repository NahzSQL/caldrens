import { z } from "zod";

/**
 * Appointment request fields.
 * Collect only what is needed to contact the patient and schedule a visit.
 * Do not add fields for medical history, insurance numbers, or other
 * sensitive health information.
 */

export const contactMethods = [
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email" },
] as const;

export const preferredTimes = [
  { value: "no-preference", label: "No preference" },
  { value: "morning", label: "Morning" },
  { value: "midday", label: "Midday" },
  { value: "afternoon", label: "Afternoon" },
] as const;

export const visitReasons = [
  { value: "new-patient", label: "New patient visit" },
  { value: "exam-cleaning", label: "Routine examination and cleaning" },
  { value: "consultation", label: "Consultation about a specific concern" },
  { value: "restorative", label: "Fillings, crowns, or bridges" },
  { value: "cosmetic", label: "Cosmetic dentistry" },
  { value: "gum-health", label: "Gum health" },
  { value: "other", label: "Other" },
] as const;

type Values<T extends readonly { value: string }[]> = T[number]["value"];
const values = <T extends readonly { value: string }[]>(list: T) =>
  list.map((item) => item.value) as [Values<T>, ...Values<T>[]];

export const MESSAGE_MAX = 500;

const phoneDigits = (value: string) => value.replace(/\D/g, "");

export const appointmentRequestSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Please enter the patient's name.")
      .max(100, "Please keep the name under 100 characters."),
    contactMethod: z.enum(values(contactMethods), { error: "Please choose how you would like us to contact you." }),
    email: z.string().trim().max(254).optional().default(""),
    phone: z.string().trim().max(30).optional().default(""),
    preferredDate: z
      .string()
      .trim()
      .optional()
      .default("")
      .refine((v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v), "Please enter a valid date."),
    preferredTime: z.enum(values(preferredTimes)).default("no-preference"),
    reason: z.enum(values(visitReasons), { error: "Please choose a general reason for your visit." }),
    message: z
      .string()
      .trim()
      .max(MESSAGE_MAX, `Please keep your message under ${MESSAGE_MAX} characters.`)
      .optional()
      .default(""),
    consent: z.literal(true, { error: "Please confirm you have read the privacy notice." }),
    /** Honeypot field: real visitors never fill this in. */
    website: z.string().max(0).optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (data.contactMethod === "email") {
      if (!data.email) {
        ctx.addIssue({ code: "custom", path: ["email"], message: "Please enter your email address." });
      } else if (!z.email().safeParse(data.email).success) {
        ctx.addIssue({ code: "custom", path: ["email"], message: "Please enter a valid email address." });
      }
    }
    if (data.contactMethod === "phone") {
      const digits = phoneDigits(data.phone);
      if (!data.phone) {
        ctx.addIssue({ code: "custom", path: ["phone"], message: "Please enter your phone number." });
      } else if (digits.length < 10 || digits.length > 15) {
        ctx.addIssue({ code: "custom", path: ["phone"], message: "Please enter a valid phone number, including area code." });
      }
    }
    if (data.email && !z.email().safeParse(data.email).success && data.contactMethod !== "email") {
      ctx.addIssue({ code: "custom", path: ["email"], message: "Please enter a valid email address or leave it blank." });
    }
  });

export type AppointmentRequestInput = z.input<typeof appointmentRequestSchema>;
export type AppointmentRequest = z.output<typeof appointmentRequestSchema>;

export type FieldErrors = Partial<Record<keyof AppointmentRequest, string>>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof AppointmentRequest | undefined;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export function labelFor<T extends readonly { value: string; label: string }[]>(list: T, value: string): string {
  return list.find((item) => item.value === value)?.label ?? value;
}
