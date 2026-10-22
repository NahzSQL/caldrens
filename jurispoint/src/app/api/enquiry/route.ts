import { NextResponse } from "next/server";
import { matterLabel, validateEnquiry, type EnquiryInput } from "@/lib/enquiry";

/**
 * Contact form endpoint.
 *
 * Delivers enquiries by email through Resend (https://resend.com) when these
 * environment variables are set: RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL.
 * Without them it answers 503, and the form tells the visitor their message
 * was NOT sent and offers the phone number and email address instead.
 *
 * To use a different provider, replace `deliver()` below; nothing else needs to change.
 */

export const runtime = "nodejs";

type Payload = Partial<EnquiryInput> & { website?: string };

function str(v: unknown) {
  return typeof v === "string" ? v : "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

async function deliver(enquiry: EnquiryInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  if (!apiKey || !to || !from) return "not_configured" as const;

  const matter = matterLabel(enquiry.matter);
  const rows: [string, string][] = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone || "Not provided"],
    ["Type of matter", matter],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${enquiry.message}\n`;
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(
    enquiry.message,
  )}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: enquiry.email,
      subject: `Website enquiry: ${matter} (${enquiry.name})`,
      text,
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    console.error("Enquiry delivery failed", res.status, await res.text().catch(() => ""));
    return "failed" as const;
  }
  return "sent" as const;
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (str(body.website)) return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });

  const enquiry: EnquiryInput = {
    name: str(body.name).trim(),
    email: str(body.email).trim(),
    phone: str(body.phone).trim(),
    matter: str(body.matter),
    message: str(body.message).trim(),
    consent: body.consent === true,
  };

  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, error: "invalid", errors }, { status: 422 });

  try {
    const result = await deliver(enquiry);
    if (result === "sent") return NextResponse.json({ ok: true });
    if (result === "not_configured") {
      console.warn("Enquiry received but email delivery is not configured. See README.");
      return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
    }
  } catch (err) {
    console.error("Enquiry delivery error", err);
  }
  return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
}
