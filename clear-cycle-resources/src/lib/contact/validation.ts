import { areasOfInterest, type AreaOfInterest } from "@/config/site";

/**
 * Contact form validation shared by the browser (for instant feedback) and
 * the server (the source of truth). The server never trusts client checks.
 */

export const LIMITS = {
  fullName: { min: 2, max: 100 },
  email: { max: 254 },
  organization: { min: 2, max: 150 },
  jobTitle: { max: 100 },
  message: { min: 10, max: 5000 },
} as const;

export type ContactInput = {
  fullName: string;
  email: string;
  organization: string;
  jobTitle: string;
  interest: AreaOfInterest;
  message: string;
};

export type ContactField = keyof ContactInput | "consent";
export type FieldErrors = Partial<Record<ContactField, string>>;

export type ValidationResult =
  | { ok: true; data: ContactInput }
  | { ok: false; errors: FieldErrors };

// Control characters other than tab and newline.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** Single-line fields: strip control characters and collapse all whitespace (including line breaks). */
function cleanLine(value: unknown): string {
  return asString(value).replace(CONTROL_CHARS, "").replace(/\s+/g, " ").trim();
}

/** Multi-line message: normalize line endings and strip control characters. */
function cleanText(value: unknown): string {
  return asString(value)
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_CHARS, "")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

function isAreaOfInterest(value: string): value is AreaOfInterest {
  return (areasOfInterest as readonly string[]).includes(value);
}

export function validateContact(raw: Record<string, unknown>): ValidationResult {
  const errors: FieldErrors = {};

  const fullName = cleanLine(raw.fullName);
  const email = cleanLine(raw.email).toLowerCase();
  const organization = cleanLine(raw.organization);
  const jobTitle = cleanLine(raw.jobTitle);
  const interest = cleanLine(raw.interest);
  const message = cleanText(raw.message);
  const consent = raw.consent === true || raw.consent === "on" || raw.consent === "true";

  if (!fullName) errors.fullName = "Please enter your full name.";
  else if (fullName.length < LIMITS.fullName.min) errors.fullName = "Please enter your full name.";
  else if (fullName.length > LIMITS.fullName.max)
    errors.fullName = `Please keep your name under ${LIMITS.fullName.max} characters.`;

  if (!email) errors.email = "Please enter your business email address.";
  else if (email.length > LIMITS.email.max || !EMAIL_PATTERN.test(email))
    errors.email = "Please enter a valid email address, such as name@organization.com.";

  if (!organization) errors.organization = "Please enter your organization's name.";
  else if (organization.length < LIMITS.organization.min)
    errors.organization = "Please enter your organization's name.";
  else if (organization.length > LIMITS.organization.max)
    errors.organization = `Please keep the organization name under ${LIMITS.organization.max} characters.`;

  if (jobTitle.length > LIMITS.jobTitle.max)
    errors.jobTitle = `Please keep your job title under ${LIMITS.jobTitle.max} characters.`;

  if (!interest) errors.interest = "Please select an area of interest.";
  else if (!isAreaOfInterest(interest)) errors.interest = "Please select an option from the list.";

  if (!message) errors.message = "Please enter a message.";
  else if (message.length < LIMITS.message.min)
    errors.message = `Please add a little more detail (at least ${LIMITS.message.min} characters).`;
  else if (message.length > LIMITS.message.max)
    errors.message = `Please keep your message under ${LIMITS.message.max} characters.`;

  if (!consent)
    errors.consent = "Please confirm that we may use your information to respond to your inquiry.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      fullName,
      email,
      organization,
      jobTitle,
      interest: interest as AreaOfInterest,
      message,
    },
  };
}
