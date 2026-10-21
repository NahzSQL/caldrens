import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { APPOINTMENT_HREF } from "@/config/navigation";
import { services } from "@/config/services";
import { pageMetadata } from "@/lib/seo";
import { AppointmentCta } from "@/components/sections/appointment-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceCard } from "@/components/service-card";
import { ServiceIcon } from "@/components/service-icon";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = pageMetadata({
  title: "Dental Services",
  description:
    "Explore dental services at Evercrest Dental Practice in Delaware, including preventive dentistry, examinations and cleanings, restorative and cosmetic dentistry, and gum health.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Dental Services"
        title="Thoughtful Dental Care for Individuals and Families"
        description="From preventive visits to restoring and enhancing your smile, every treatment begins with an examination and a clear conversation about your options."
        image="treatmentRoom"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Dental Services" }]}
      >
        <ButtonLink href={APPOINTMENT_HREF}>Request an Appointment</ButtonLink>
        <ButtonLink href="#all-services" variant="outline-light">
          Browse Services
        </ButtonLink>
      </PageHero>

      <Section id="all-services" labelledBy="all-services-heading">
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3" aria-labelledby="service-index-heading">
            <div className="lg:sticky lg:top-28">
              <h2 id="service-index-heading" className="text-sm font-semibold uppercase tracking-wider text-muted">
                All services
              </h2>
              <ul className="mt-4 space-y-1">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-[0.95rem] text-ink transition-colors hover:bg-mist hover:text-navy-900"
                    >
                      <ServiceIcon name={service.icon} className="h-4 w-4 text-teal-600" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="lg:col-span-9">
            <SectionHeading
              id="all-services-heading"
              title="Our Services"
              description="Select a service to learn what it involves, who may benefit, and what to expect."
            />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <li key={service.slug} className="flex">
                  <ServiceCard service={service} />
                </li>
              ))}
            </ul>
            <div className="mt-10 flex gap-4 rounded-2xl border border-teal-200 bg-teal-50/60 p-6">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
              <div className="text-[0.95rem] leading-relaxed text-ink">
                <p>
                  The information on this website is general and educational. It is not a substitute for an examination
                  or professional advice. Treatment recommendations depend on each patient&apos;s individual needs.
                </p>
                <p className="mt-2">
                  Have a question about a service?{" "}
                  <Link href="/contact" className="font-semibold text-teal-800 underline underline-offset-4">
                    Contact us
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="mist" labelledBy="consult-heading">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            id="consult-heading"
            align="center"
            eyebrow="Start With a Conversation"
            title="Not Sure Which Service You Need?"
            description="That is completely normal. An examination is the best place to start. Your dentist will review your oral health, answer your questions, and explain any options before treatment begins."
          />
          <Link
            href="/patient-information"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-teal-700 underline-offset-4 hover:underline"
          >
            Prepare for your visit
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Section>

      <AppointmentCta />
    </>
  );
}
