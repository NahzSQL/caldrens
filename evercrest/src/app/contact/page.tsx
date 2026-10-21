import type { Metadata } from "next";
import { CalendarClock, ExternalLink, Lock, MapPin, ShieldAlert } from "lucide-react";
import { hasFullAddress, siteConfig } from "@/config/site";
import { isDeliveryConfigured } from "@/lib/appointment-delivery";
import { pageMetadata } from "@/lib/seo";
import { AppointmentForm } from "@/components/appointment-form";
import { ContactDetails, OfficeHours } from "@/components/contact-info";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ToBeConfirmed } from "@/components/ui/to-be-confirmed";

export const metadata: Metadata = pageMetadata({
  title: "Contact and Appointments",
  description:
    "Contact Evercrest Dental Practice in Delaware or request an appointment online. Our team will follow up to confirm your visit.",
  path: "/contact",
});

function FallbackContact() {
  const { contact } = siteConfig;
  if (!contact.phone && !contact.email) {
    return <span className="text-[0.95rem]">Contact details will be listed on this page once confirmed.</span>;
  }
  return (
    <ul className="space-y-1">
      {contact.phone && (
        <li>
          Phone:{" "}
          <a className="font-semibold underline" href={`tel:${contact.phoneHref ?? contact.phone}`}>
            {contact.phone}
          </a>
        </li>
      )}
      {contact.email && (
        <li>
          Email:{" "}
          <a className="font-semibold underline" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </li>
      )}
    </ul>
  );
}

export default function ContactPage() {
  const live = isDeliveryConfigured();
  const { location, practiceManagement } = siteConfig;

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Contact and Appointments"
        description="We would be glad to hear from you. Send an appointment request below and our team will follow up to confirm a time."
        image="reception"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <div className="bg-mist py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Appointment request */}
            <section
              id="request-appointment"
              aria-labelledby="request-heading"
              className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-10 lg:col-span-7"
            >
              <div className="flex items-start gap-4">
                <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 sm:flex" aria-hidden="true">
                  <CalendarClock className="h-6 w-6" />
                </span>
                <div>
                  <h2 id="request-heading" className="text-2xl font-bold sm:text-3xl">
                    Request an Appointment
                  </h2>
                  <p className="mt-2 leading-relaxed text-muted">
                    Tell us how to reach you and when you would like to visit. A member of our team will contact you to
                    confirm your appointment.
                  </p>
                </div>
              </div>

              {practiceManagement.onlineSchedulingUrl && (
                <div className="mt-6 flex flex-col gap-3 rounded-xl border border-teal-200 bg-teal-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[0.95rem] text-ink">Prefer to choose a time yourself? Use our online scheduling.</p>
                  <ButtonLink href={practiceManagement.onlineSchedulingUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm">
                    Book Online
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </ButtonLink>
                </div>
              )}

              <div className="mt-8">
                <AppointmentForm live={live} fallbackContact={<FallbackContact />} />
              </div>

              <div className="mt-10 space-y-4 border-t border-line pt-8 text-sm leading-relaxed text-muted">
                <p className="flex gap-3">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-navy-500" aria-hidden="true" />
                  <span>
                    <strong className="text-ink">Privacy notice:</strong> We use the information in this form only to
                    respond to your appointment request. Please share only the details requested here. Do not include
                    medical histories, insurance numbers, or other sensitive health information.
                  </span>
                </p>
                <p className="flex gap-3">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-navy-500" aria-hidden="true" />
                  <span>
                    This form is not monitored for urgent needs. For a medical or dental emergency, call 911 or go to the
                    nearest emergency room.
                  </span>
                </p>
              </div>
            </section>

            {/* Contact details */}
            <aside className="space-y-6 lg:col-span-5" aria-label="Practice contact information">
              <div className="rounded-3xl bg-navy-900 p-8 text-white shadow-soft sm:p-10">
                <h2 className="text-2xl font-bold text-white">{siteConfig.name}</h2>
                <p className="mt-2 flex items-center gap-2 text-navy-200">
                  <MapPin className="h-4 w-4 text-teal-300" aria-hidden="true" />
                  {location.state}, USA
                </p>
                <ContactDetails tone="light" className="mt-8" />
              </div>
              <div className="rounded-3xl border border-line bg-white p-8 shadow-soft">
                <OfficeHours />
              </div>
              <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
                {location.mapEmbedUrl && hasFullAddress() ? (
                  <iframe
                    title={`Map showing the location of ${siteConfig.name}`}
                    src={location.mapEmbedUrl}
                    className="block h-72 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex h-64 flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_center,var(--color-teal-50),var(--color-mist))] p-6 text-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-teal-700 shadow-soft">
                      <MapPin className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <p className="font-semibold text-navy-900">Map</p>
                    <p className="text-sm text-muted">
                      A map will appear here once the street address is confirmed.
                    </p>
                    <ToBeConfirmed label="Street address" />
                  </div>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </>
  );
}
