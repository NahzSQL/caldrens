/**
 * Central site configuration.
 *
 * Every business detail shown on the website comes from this file.
 * Optional contact details (address, phone, service area) stay `null`
 * until they have been verified. A `null` value is never rendered, so the
 * published pages never show placeholders or unverified information.
 */

export type NavItem = { label: string; href: string };

export const siteConfig = {
  name: "Clear Cycle Resources",
  tagline: "Better Connections. Better Coordinated Care.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://clearcycleresources.site",
  domain: "clearcycleresources.site",

  owner: {
    name: "Kevin Brook",
    title: "Owner",
  },

  /** Public contact email. Also the default recipient for contact form inquiries. */
  email: "kevinbrooks@clearcycleresources.site",

  /**
   * Verified business mailing address. Leave `null` until verified.
   * Example shape: { street: "...", city: "...", state: "..", postalCode: "....." }
   */
  address: null as null | {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  },

  /** Verified business phone number in display form, e.g. "(555) 010-0000". Leave `null` until verified. */
  phone: null as null | string,

  /**
   * How the company serves clients, shown in the contact details when set.
   * Only set this if it accurately reflects operations, for example:
   * "Serving U.S. healthcare organizations remotely".
   */
  serviceArea: null as null | string,

  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About & Contact", href: "/about-contact" },
  ] satisfies NavItem[],

  contactHref: "/about-contact#contact",
} as const;

export const areasOfInterest = [
  "Care Coordination",
  "Benefits Administration Support",
  "Provider Communication",
  "Population Health Support",
  "Clinical Quality Operations",
  "Healthcare Reporting",
  "General Inquiry",
] as const;

export type AreaOfInterest = (typeof areasOfInterest)[number];

/**
 * Photography. Images are free-license Unsplash photos served through
 * next/image. To self-host, place files in /public/images and change `src`
 * to "/images/<file>.jpg". Each photo sits on a branded background panel,
 * so the layout stays intact if an image cannot load.
 */
export const images = {
  homeHero: {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    alt: "A healthcare professional reviewing information on a laptop and tablet at a desk",
  },
  homeIntro: {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80",
    alt: "Colleagues meeting around a table to plan their work",
  },
  servicesHero: {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80",
    alt: "A healthcare professional wearing a stethoscope",
  },
  about: {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
    alt: "A team collaborating with laptops at a shared table",
  },
} as const;
