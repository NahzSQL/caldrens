import { matterTypes } from "./site";

export type EnquiryInput = {
  name: string;
  email: string;
  phone: string;
  matter: string;
  message: string;
  consent: boolean;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

export const limits = { name: 120, email: 254, phone: 32, message: 3000, messageMin: 20 } as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^[+()\-.\s\d]{7,}$/;

/** Validation shared by the browser form and the server endpoint. */
export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const message = input.message.trim();

  if (!name) errors.name = "Please enter your full name.";
  else if (name.length < 2) errors.name = "Please enter your full name.";
  else if (name.length > limits.name) errors.name = `Please keep your name under ${limits.name} characters.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > limits.email || !emailPattern.test(email))
    errors.email = "Please enter a valid email address, for example name@example.com.";

  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (!phonePattern.test(phone) || digits.length < 7 || digits.length > 15 || phone.length > limits.phone)
      errors.phone = "Please enter a valid phone number, or leave this field blank.";
  }

  if (!matterTypes.some((m) => m.value === input.matter))
    errors.matter = "Please choose the type of legal matter.";

  if (!message) errors.message = "Please tell us briefly how we can help.";
  else if (message.length < limits.messageMin)
    errors.message = `Please add a little more detail (at least ${limits.messageMin} characters).`;
  else if (message.length > limits.message)
    errors.message = `Please keep your message under ${limits.message} characters.`;

  if (!input.consent) errors.consent = "Please confirm that you have read the privacy notice.";

  return errors;
}

export function matterLabel(value: string) {
  return matterTypes.find((m) => m.value === value)?.label ?? "Other or not sure";
}
