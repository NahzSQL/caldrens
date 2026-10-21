import type { Metadata } from "next";
import { absoluteUrl, hasAnyOfficeHours, hasFullAddress, siteConfig } from "@/config/site";

/** Page metadata with a canonical URL and Open Graph tags once the site URL is configured. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: url ?? undefined,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
    },
  };
}

/**
 * schema.org structured data for the practice.
 * Only verified details from src/config/site.ts are included.
 */
export function practiceJsonLd(): Record<string, unknown> {
  const { location, contact } = siteConfig;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: siteConfig.name,
    description:
      "Personalized dental care in a welcoming environment, with a focus on comfort, oral health, and long-term smiles.",
    areaServed: { "@type": "State", name: location.state },
    address: {
      "@type": "PostalAddress",
      addressRegion: location.stateCode,
      addressCountry: "US",
      ...(hasFullAddress()
        ? {
            streetAddress: [location.streetAddress, location.addressLine2].filter(Boolean).join(", "),
            addressLocality: location.city,
            postalCode: location.postalCode,
          }
        : {}),
    },
  };
  const url = absoluteUrl("/");
  if (url) data.url = url;
  if (contact.phone) data.telephone = contact.phoneHref ?? contact.phone;
  if (contact.email) data.email = contact.email;
  if (hasAnyOfficeHours()) {
    data.openingHoursSpecification = siteConfig.officeHours
      .filter((entry) => entry.opens && entry.closes)
      .map((entry) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${entry.day}`,
        opens: entry.opens,
        closes: entry.closes,
      }));
  }
  if (siteConfig.social.length) data.sameAs = siteConfig.social.map((s) => s.href);
  return data;
}

export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
