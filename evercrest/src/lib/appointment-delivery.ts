import "server-only";
import { siteConfig } from "@/config/site";
import {
  contactMethods,
  labelFor,
  preferredTimes,
  visitReasons,
  type AppointmentRequest,
} from "./appointment-schema";

/**
 * Delivers appointment requests to the practice.
 *
 * Two options, configured with server-side environment variables (never in
 * frontend code):
 *
 * 1. Webhook: APPOINTMENT_WEBHOOK_URL (+ optional APPOINTMENT_WEBHOOK_SECRET)
 *    POSTs the request as JSON, e.g. to a form-processing or practice
 *    communication service.
 * 2. Email via Resend: RESEND_API_KEY, APPOINTMENT_EMAIL_TO, APPOINTMENT_EMAIL_FROM.
 *
 * If neither is configured, the site runs the form in demo mode and nothing
 * is sent.
 *
 * IMPORTANT: Appointment requests may count as protected health information.
 * Before enabling delivery, confirm the provider is appropriate for healthcare
 * data (for example, that it will sign a Business Associate Agreement if HIPAA
 * applies) and that the practice has reviewed the full workflow.
 */

export type DeliveryMethod = "webhook" | "email";

export function getDeliveryMethod(): DeliveryMethod | null {
  if (process.env.APPOINTMENT_WEBHOOK_URL) return "webhook";
  if (process.env.RESEND_API_KEY && process.env.APPOINTMENT_EMAIL_TO && process.env.APPOINTMENT_EMAIL_FROM) {
    return "email";
  }
  return null;
}

export function isDeliveryConfigured(): boolean {
  return getDeliveryMethod() !== null;
}

function formatRequest(request: AppointmentRequest) {
  return {
    patientName: request.fullName,
    preferredContactMethod: labelFor(contactMethods, request.contactMethod),
    email: request.email || null,
    phone: request.phone || null,
    preferredDate: request.preferredDate || null,
    preferredTime: labelFor(preferredTimes, request.preferredTime),
    reasonForVisit: labelFor(visitReasons, request.reason),
    message: request.message || null,
  };
}

function emailBody(request: AppointmentRequest): string {
  const f = formatRequest(request);
  return [
    `New appointment request from the ${siteConfig.name} website.`,
    "",
    `Patient name: ${f.patientName}`,
    `Preferred contact method: ${f.preferredContactMethod}`,
    `Email: ${f.email ?? "—"}`,
    `Phone: ${f.phone ?? "—"}`,
    `Preferred date: ${f.preferredDate ?? "No preference"}`,
    `Preferred time: ${f.preferredTime}`,
    `Reason for visit: ${f.reasonForVisit}`,
    "",
    "Message:",
    f.message ?? "—",
    "",
    "This is a request only. Please contact the patient to confirm an appointment.",
  ].join("\n");
}

export async function deliverAppointmentRequest(request: AppointmentRequest): Promise<void> {
  const method = getDeliveryMethod();
  const timeout = AbortSignal.timeout(10_000);

  if (method === "webhook") {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.APPOINTMENT_WEBHOOK_SECRET) {
      headers.Authorization = `Bearer ${process.env.APPOINTMENT_WEBHOOK_SECRET}`;
    }
    const response = await fetch(process.env.APPOINTMENT_WEBHOOK_URL!, {
      method: "POST",
      headers,
      body: JSON.stringify({
        type: "appointment_request",
        source: siteConfig.name,
        submittedAt: new Date().toISOString(),
        request: formatRequest(request),
      }),
      signal: timeout,
    });
    if (!response.ok) throw new Error(`Webhook responded with status ${response.status}`);
    return;
  }

  if (method === "email") {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.APPOINTMENT_EMAIL_FROM,
        to: process.env.APPOINTMENT_EMAIL_TO!.split(",").map((s) => s.trim()),
        subject: "New appointment request (website)",
        text: emailBody(request),
        ...(request.email ? { reply_to: request.email } : {}),
      }),
      signal: timeout,
    });
    if (!response.ok) throw new Error(`Email provider responded with status ${response.status}`);
    return;
  }

  throw new Error("Appointment delivery is not configured");
}
