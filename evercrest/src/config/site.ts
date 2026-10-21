/**
 * Evercrest Dental Practice — central business configuration.
 *
 * Every practice detail shown on the website comes from this file.
 * Fields set to `null` (or empty lists) are NOT yet verified. The site shows a
 * clear "to be confirmed" placeholder for them and leaves them out of search
 * metadata and structured data.
 *
 * When a detail is confirmed, fill it in here and the whole site updates.
 * Do not enter details that have not been verified by the practice.
 */

export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface OfficeHoursEntry {
  day: Weekday;
  /** e.g. "8:00 AM – 5:00 PM", "Closed", or null while unconfirmed. */
  hours: string | null;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  /** Public website URL, e.g. "https://www.example.com". Used for canonical URLs and the sitemap. */
  url: string | null;
  location: {
    /** Verified: the practice is located in Delaware. */
    state: string;
    stateCode: string;
    country: string;
    city: string | null;
    streetAddress: string | null;
    /** Suite, unit, or floor. */
    addressLine2: string | null;
    postalCode: string | null;
    /** Optional map embed URL (e.g. Google Maps "Embed a map" src). Only set once the street address is verified. */
    mapEmbedUrl: string | null;
    /** Optional link to directions (e.g. a Google Maps place link). */
    mapLink: string | null;
  };
  contact: {
    /** Display format, e.g. "(302) 555-0100". */
    phone: string | null;
    /** Dialable format, e.g. "+13025550100". */
    phoneHref: string | null;
    email: string | null;
    fax: string | null;
  };
  officeHours: OfficeHoursEntry[];
  /** Optional note shown under office hours, e.g. holiday closures. */
  officeHoursNote: string | null;
  dentist: {
    name: string | null;
    /** e.g. "DDS" or "DMD". */
    degree: string | null;
    title: string | null;
    biography: string | null;
    education: string[];
    licensure: string[];
    professionalMemberships: string[];
    /** Path or URL of a portrait photo. */
    photo: string | null;
  };
  /** Practice management software. Used for optional patient-facing links. */
  practiceManagement: {
    system: string;
    /** Online booking link, if the practice enables online scheduling in Dentrix Ascend. */
    onlineSchedulingUrl: string | null;
    /** Secure patient forms link, if the practice enables online forms in Dentrix Ascend. */
    patientFormsUrl: string | null;
  };
  insurance: {
    /** Plans the practice has confirmed it accepts or is in-network with. Leave empty until verified. */
    acceptedPlans: string[];
    /** Confirmed payment methods, e.g. ["Cash", "Visa", "Mastercard"]. */
    paymentMethods: string[];
    /** Confirmed financing or payment-plan information. */
    financingNote: string | null;
  };
  policies: {
    /** Confirmed cancellation and rescheduling policy text. */
    cancellation: string | null;
    /** Confirmed policy for late arrivals. */
    lateArrival: string | null;
  };
  social: SocialLink[];
  /** Year the copyright notice starts from. Leave null to show the current year only. */
  copyrightStartYear: number | null;
}

export const siteConfig: SiteConfig = {
  name: "Evercrest Dental Practice",
  shortName: "Evercrest",
  tagline: "Dental Care in Delaware",
  url: null,
  location: {
    state: "Delaware",
    stateCode: "DE",
    country: "United States",
    city: null,
    streetAddress: null,
    addressLine2: null,
    postalCode: null,
    mapEmbedUrl: null,
    mapLink: null,
  },
  contact: {
    phone: null,
    phoneHref: null,
    email: null,
    fax: null,
  },
  officeHours: [
    { day: "Monday", hours: null },
    { day: "Tuesday", hours: null },
    { day: "Wednesday", hours: null },
    { day: "Thursday", hours: null },
    { day: "Friday", hours: null },
    { day: "Saturday", hours: null },
    { day: "Sunday", hours: null },
  ],
  officeHoursNote: null,
  dentist: {
    name: null,
    degree: null,
    title: null,
    biography: null,
    education: [],
    licensure: [],
    professionalMemberships: [],
    photo: null,
  },
  practiceManagement: {
    system: "Dentrix Ascend",
    onlineSchedulingUrl: null,
    patientFormsUrl: null,
  },
  insurance: {
    acceptedPlans: [],
    paymentMethods: [],
    financingNote: null,
  },
  policies: {
    cancellation: null,
    lateArrival: null,
  },
  social: [],
  copyrightStartYear: null,
};

/* ---------- Helpers ---------- */

/** "City, DE" when the city is known, otherwise "Delaware". */
export function locationLabel(config: SiteConfig = siteConfig): string {
  const { city, stateCode, state } = config.location;
  return city ? `${city}, ${stateCode}` : state;
}

export function hasFullAddress(config: SiteConfig = siteConfig): boolean {
  const { streetAddress, city, postalCode } = config.location;
  return Boolean(streetAddress && city && postalCode);
}

export function hasAnyOfficeHours(config: SiteConfig = siteConfig): boolean {
  return config.officeHours.some((entry) => entry.hours);
}

export function dentistDisplayName(config: SiteConfig = siteConfig): string | null {
  const { name, degree } = config.dentist;
  if (!name) return null;
  return degree ? `${name}, ${degree}` : name;
}

/** Absolute URL for a path, or null if the site URL is not configured yet. */
export function absoluteUrl(path = "/", config: SiteConfig = siteConfig): string | null {
  if (!config.url) return null;
  return new URL(path, config.url).toString();
}
