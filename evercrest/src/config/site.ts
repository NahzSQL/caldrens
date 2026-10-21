/**
 * Evercrest Dental Practice — central business configuration.
 *
 * Every practice detail shown on the website comes from this file.
 * Optional fields set to `null` (or empty lists) are simply not shown on the
 * site, and are left out of search metadata and structured data.
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
  /** Opening time in 24-hour format, e.g. "09:00". Null when closed. */
  opens: string | null;
  /** Closing time in 24-hour format, e.g. "17:00". Null when closed. */
  closes: string | null;
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
  /** Practice management software. Used for optional patient-facing links. */
  practiceManagement: {
    system: string;
    /** Online booking link, if the practice enables online scheduling in Dentrix Ascend. */
    onlineSchedulingUrl: string | null;
    /** Secure patient forms link, if the practice enables online forms in Dentrix Ascend. */
    patientFormsUrl: string | null;
  };
  insurance: {
    /** Whether the practice accepts dental insurance. */
    acceptsInsurance: boolean;
    /** Optional list of specific plans, if the practice wants to name them. */
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
    mapLink: null,
  },
  contact: {
    phone: "(251) 520-4334",
    phoneHref: "+12515204334",
    email: "wellsmuffle@evercrest.fit",
    fax: null,
  },
  officeHours: [
    { day: "Monday", opens: "09:00", closes: "17:00" },
    { day: "Tuesday", opens: "09:00", closes: "17:00" },
    { day: "Wednesday", opens: "09:00", closes: "17:00" },
    { day: "Thursday", opens: "09:00", closes: "17:00" },
    { day: "Friday", opens: "09:00", closes: "17:00" },
    { day: "Saturday", opens: null, closes: null },
    { day: "Sunday", opens: null, closes: null },
  ],
  officeHoursNote: null,
  practiceManagement: {
    system: "Dentrix Ascend",
    onlineSchedulingUrl: null,
    patientFormsUrl: null,
  },
  insurance: {
    acceptsInsurance: true,
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
  return config.officeHours.some((entry) => entry.opens && entry.closes);
}

/** "09:00" -> "9:00 AM" */
function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** "9:00 AM – 5:00 PM" or "Closed". */
export function formatHours(entry: OfficeHoursEntry): string {
  if (!entry.opens || !entry.closes) return "Closed";
  return `${formatTime(entry.opens)} – ${formatTime(entry.closes)}`;
}

/** Absolute URL for a path, or null if the site URL is not configured yet. */
export function absoluteUrl(path = "/", config: SiteConfig = siteConfig): string | null {
  if (!config.url) return null;
  return new URL(path, config.url).toString();
}
