import type { Metadata } from "next";
import { Building2, CheckCircle2, ClipboardCheck, HeartHandshake, Info, Network, UsersRound } from "lucide-react";
import { Photo } from "@/components/Photo";
import { ButtonLink, CtaBand, IconBadge, SectionHeading } from "@/components/ui";
import { images, siteConfig } from "@/config/site";
import { services } from "@/content/services";

const title = "Healthcare Services | Clear Cycle Resources";
const description =
  "Explore healthcare operations support, care coordination, provider communication, population health support, and clinical quality operations.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services" },
  twitter: { card: "summary_large_image", title, description },
};

const audiences = [
  { icon: Building2, label: "Healthcare organizations" },
  { icon: ClipboardCheck, label: "Health plan administrators" },
  { icon: HeartHandshake, label: "Care management teams" },
  { icon: Network, label: "Provider network operations teams" },
  {
    icon: UsersRound,
    label: "Organizations supporting population health and clinical quality programs",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="services-hero-heading" className="relative overflow-hidden bg-mist">
        <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <p className="eyebrow animate-rise">Our services</p>
            <h1
              id="services-hero-heading"
              className="animate-rise delay-1 mt-5 text-4xl font-extrabold leading-[1.1] sm:text-5xl"
            >
              Healthcare Operations and Care Coordination Support
            </h1>
            <p className="animate-rise delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-slate">
              Explore practical services designed to help healthcare organizations organize
              workflows, strengthen communication, and support coordinated care delivery.
            </p>
            <div className="animate-rise delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#service-list" withArrow>
                View Services
              </ButtonLink>
              <ButtonLink href={siteConfig.contactHref} variant="secondary">
                Contact Our Team
              </ButtonLink>
            </div>
          </div>
          <div className="animate-rise delay-2 lg:col-span-5">
            <Photo
              src={images.servicesHero.src}
              alt={images.servicesHero.alt}
              sizes="(min-width: 1024px) 460px, 100vw"
              preload
              className="aspect-[4/3] rounded-3xl shadow-card-hover lg:aspect-[4/5]"
            />
          </div>
        </div>
      </section>

      {/* Quick navigation */}
      <nav aria-label="Services on this page" className="border-y border-line bg-white">
        <div className="container-page">
          <ul className="-mx-1 flex gap-2 overflow-x-auto py-4 [scrollbar-width:none]">
            {services.map((service) => (
              <li key={service.id} className="shrink-0">
                <a
                  href={`#${service.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-teal hover:bg-teal-50 hover:text-navy"
                >
                  <service.icon className="h-4 w-4 text-teal-700" aria-hidden="true" />
                  {service.shortTitle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Service details */}
      <section id="service-list" aria-label="Service details" className="py-20 sm:py-24">
        <div className="container-page space-y-8">
          {services.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              aria-labelledby={`${service.id}-heading`}
              className="scroll-mt-28 grid gap-8 rounded-3xl border border-line bg-white p-7 shadow-card sm:p-10 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4">
                  <IconBadge icon={service.icon} tone={index % 2 === 0 ? "teal" : "navy"} />
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-slate">
                    Service {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2
                  id={`${service.id}-heading`}
                  className="mt-6 text-2xl font-bold leading-snug sm:text-3xl"
                >
                  {service.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate">{service.description}</p>
                {service.scopeNote && (
                  <p className="mt-6 flex gap-3 rounded-xl bg-mist p-4 text-[0.9375rem] leading-relaxed text-charcoal">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-navy" aria-hidden="true" />
                    <span>
                      <span className="font-semibold text-navy">Scope: </span>
                      {service.scopeNote}
                    </span>
                  </p>
                )}
              </div>
              <div className="lg:col-span-5">
                <div className="h-full rounded-2xl bg-navy-50/60 p-6 sm:p-7">
                  <h3 className="text-base font-bold">What this can include</h3>
                  <ul className="mt-4 space-y-3.5">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed text-charcoal">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Who we support */}
      <section aria-labelledby="audiences-heading" className="relative overflow-hidden bg-navy py-20 sm:py-24">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div className="container-page relative">
          <SectionHeading
            id="audiences-heading"
            eyebrow="Who we support"
            title="Designed for Teams Across Healthcare Operations"
            light
            intro={
              <p>
                Our services are intended for organizations and teams such as the following.
              </p>
            }
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((audience) => (
              <li
                key={audience.label}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-white transition-colors hover:bg-white/10"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/15 text-[#7fe0d0]">
                  <audience.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-medium leading-snug">{audience.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Let's Discuss Your Organization's Needs"
        text="Every organization has different operational requirements. Contact our team to discuss your goals and determine whether our proposed services align with your needs."
        buttonLabel="Contact Our Team"
        href={siteConfig.contactHref}
      />
    </>
  );
}
