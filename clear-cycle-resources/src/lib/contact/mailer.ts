import "server-only";

import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";
import type { ContactInput } from "@/lib/contact/validation";

/**
 * Sends contact form inquiries by SMTP. All credentials come from environment
 * variables (see .env.example). Nothing is sent unless SMTP is configured.
 */

type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

export function getMailConfig(): MailConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number.parseInt(process.env.SMTP_PORT ?? "587", 10);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;

  return {
    host,
    port: Number.isFinite(port) ? port : 587,
    secure,
    user,
    pass,
    from: process.env.CONTACT_FROM_EMAIL?.trim() || user,
    to: process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email,
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildMessage(input: ContactInput) {
  const rows: [string, string][] = [
    ["Full name", input.fullName],
    ["Business email", input.email],
    ["Organization", input.organization],
    ["Job title", input.jobTitle || "Not provided"],
    ["Area of interest", input.interest],
  ];

  const text = [
    `New inquiry from the ${siteConfig.name} website`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    input.message,
    "",
    "Reply to this email to respond directly to the sender.",
  ].join("\n");

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#F3F6F9;font-family:Arial,Helvetica,sans-serif;color:#2D3748;">
  <table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#FFFFFF;border-radius:12px;border:1px solid #DFE5EC;">
    <tr><td style="padding:24px 28px;background:#07366A;border-radius:12px 12px 0 0;color:#FFFFFF;font-size:18px;font-weight:bold;">New website inquiry</td></tr>
    <tr><td style="padding:24px 28px;">
      <table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px;">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:8px 12px 8px 0;color:#4A5568;width:150px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 0;font-weight:bold;">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 8px;color:#4A5568;font-size:14px;">Message</p>
      <div style="padding:16px;background:#F3F6F9;border-radius:8px;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(input.message)}</div>
      <p style="margin:20px 0 0;color:#4A5568;font-size:12px;">Reply to this email to respond directly to the sender.</p>
    </td></tr>
  </table>
</body></html>`;

  return { text, html };
}

export async function sendContactEmail(input: ContactInput, config: MailConfig): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
    requireTLS: !config.secure,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  const { text, html } = buildMessage(input);
  const subject = `Website inquiry: ${input.interest} – ${input.organization}`.slice(0, 180);

  await transporter.sendMail({
    from: { name: `${siteConfig.name} Website`, address: config.from },
    to: config.to,
    replyTo: { name: input.fullName, address: input.email },
    subject,
    text,
    html,
  });
}
