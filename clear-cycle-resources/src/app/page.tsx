import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ClipboardList,
  MessagesSquare,
  RefreshCw,
  Search,
  Waypoints,
  Workflow,
} from "lucide-react";
import { Photo } from "@/components/Photo";
import { ButtonLink, CtaBand, FeatureCard, SectionHeading } from "@/components/ui";
import { images, siteConfig } from "@/config/site";
import { services } from "@/content/services";

const title = "Clear Cycle Resources | Healthcare Operations & Care Coordination";
const description =
  "Explore Clear Cycle Resources' proposed healthcare operations, benefits administration support, provider communication, and care coordination services.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/" },
  twitter: { card: "summary_large_image", title, description },
};

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Understand",
    text: "Learn about your organization's current processes, priorities, and operational challenges.",
  },
  {
    number: "02",
    icon: Waypoints,
    title: "Coordinate",
    text: "Identify practical ways to improve communication, workflow organization, and coordination between relevant teams.",
  },
  {
    number: "03",
    icon: RefreshCw,
    title: "Improve",
    text: "Establish a clear approach to monitoring workflows and identifying opportunities for improvement.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-navy">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute -right-40 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full border-[48px] border-teal/10"
        />
        <div className="container-page relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <div className="lg:col-span-6">
            <p className="eyebrow eyebrow-light animate-rise">
              Healthcare operations &amp; care coordination
            </p>
            <h1
              id="hero-heading"
              className="animate-rise delay-1 mt-5 text-4xl font-extrabold leading-[1.08] !text-white sm:text-5xl lg:text-[3.5rem]"
            >
              Better Connections. <span className="text-[#7fe0d0]">Better Coordinated Care.</span>
            </h1>
            <p className="animate-rise delay-2 mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Clear Cycle Resources supports healthcare organizations with practical benefits
              administration, care coordination, and provider communication services designed to
              help teams work more effectively and support better healthcare experiences.
            </p>
            <div className="animate-rise delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/services" withArrow>
                Explore Our Services
              </ButtonLink>
              <ButtonLink href={siteConfig.contactHref} variant="outline-light">
                Contact Our Team
              </ButtonLink>
            </div>
          </div>

          <div className="animate-rise delay-2 relative lg:col-span-6">
            <Photo
              src={images.homeHero.src}
              alt={images.homeHero.alt}
              sizes="(min-width: 1024px) 560px, 100vw"
              preload
              className="aspect-[4/3] rounded-3xl shadow-2xl ring-1 ring-white/10 lg:aspect-[5/4]"
            />
            <div className="relative -mt-12 ml-4 mr-4 rounded-2xl bg-white p-5 shadow-card-hover sm:absolute sm:-bottom-6 sm:-left-6 sm:mt-0 sm:mr-0 sm:ml-0 sm:max-w-xs">
              <p className="text-sm font-semibold text-navy">Where we focus</p>
              <ul className="mt-3 space-y-2 text-sm text-charcoal">
                {["Care coordination", "Provider communication", "Healthcare operations"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section aria-labelledby="intro-heading" className="py-20 sm:py-28">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                id="intro-heading"
                eyebrow="Our purpose"
                title="Helping Healthcare Teams Work Better Together"
                intro={
                  <p>
                    Healthcare coordination depends on timely communication, organized workflows,
                    and clear information. Clear Cycle Resources is being developed to help
                    healthcare organizations strengthen these processes through practical
                    operational support and coordinated service delivery.
                  </p>
                }
              />
            </div>
            <Photo
              src={images.homeIntro.src}
              alt={images.homeIntro.alt}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="aspect-[16/10] rounded-3xl shadow-card"
            />
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <FeatureCard icon={Workflow} title="Care Coordination">
              Support organized care workflows, follow-up activities, and communication between
              relevant healthcare stakeholders.
            </FeatureCard>
            <FeatureCard icon={MessagesSquare} title="Provider Communication">
              Help teams establish clearer communication processes and reduce unnecessary friction
              when coordinating with healthcare providers.
            </FeatureCard>
            <FeatureCard icon={ClipboardList} title="Healthcare Operations">
              Support structured administrative workflows, reporting, and operational processes
              that help teams manage their responsibilities.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* How we help */}
      <section aria-labelledby="how-heading" className="bg-mist py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            id="how-heading"
            eyebrow="How we help"
            title="Practical Support for Complex Healthcare Workflows"
            align="center"
            intro={
              <p>
                A straightforward approach that starts with understanding how your teams work
                today.
              </p>
            }
          />

          <div className="relative mt-16">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[16%] right-[16%] top-[4.5rem] hidden h-0.5 bg-gradient-to-r from-teal/0 via-teal/50 to-teal/0 md:block"
          />
          <ol className="relative grid gap-6 md:grid-cols-3 md:gap-8">
            {steps.map((step) => (
              <li
                key={step.title}
                className="relative rounded-2xl bg-white p-8 text-center shadow-card"
              >
                <span className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-navy text-white ring-8 ring-mist">
                  <step.icon className="h-8 w-8" aria-hidden="true" />
                  <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-teal text-xs font-bold text-white ring-4 ring-white">
                    {step.number}
                  </span>
                </span>
                <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-slate">{step.text}</p>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section aria-labelledby="services-overview-heading" className="py-20 sm:py-28">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="services-overview-heading"
              eyebrow="Services"
              title="Areas We Support"
              intro={
                <p>
                  Administrative and operational support across six areas of healthcare
                  operations.
                </p>
              }
            />
            <Link
              href="/services"
              className="group inline-flex shrink-0 items-center gap-2 rounded-md font-semibold text-teal-700 hover:text-navy"
            >
              View all services
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/services#${service.id}`}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-card-hover"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy transition-colors group-hover:bg-teal group-hover:text-white">
                    <service.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold text-navy">
                      {service.shortTitle}
                    </span>
                    <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-slate">
                      {service.summary}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Let's Improve the Way Care Is Coordinated"
        text="Tell us about your organization's needs and explore whether Clear Cycle Resources is a suitable partner for your healthcare operations."
        buttonLabel="Contact Clear Cycle Resources"
        href={siteConfig.contactHref}
      />
    </>
  );
}
