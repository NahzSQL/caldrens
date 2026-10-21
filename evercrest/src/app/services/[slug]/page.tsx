import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarCheck, CheckCircle2, ClipboardList, Stethoscope, Users } from "lucide-react";
import type { ReactNode } from "react";
import { APPOINTMENT_HREF } from "@/config/navigation";
import { getService, services } from "@/config/services";
import { pageMetadata } from "@/lib/seo";
import { AppointmentCta } from "@/components/sections/appointment-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceIcon } from "@/components/service-icon";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.name,
    description: `${service.summary} Learn what to expect at Evercrest Dental Practice in Delaware.`,
    path: `/services/${service.slug}`,
  });
}

function DetailBlock({ id, icon, title, items }: { id: string; icon: ReactNode; title: string; items: string[] }) {
  return (
    <section aria-labelledby={id} className="rounded-2xl border border-line bg-white p-7 shadow-soft sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700" aria-hidden="true">
          {icon}
        </span>
        <h2 id={id} className="text-xl font-bold">
          {title}
        </h2>
      </div>
      <ul className="mt-6 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
            <span className="leading-relaxed text-ink">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.slug === service.slug);
  const previous = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];

  return (
    <>
      <PageHero
        eyebrow="Dental Services"
        title={service.name}
        description={service.summary}
        image={service.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Dental Services", href: "/services" },
          { label: service.name },
        ]}
      >
        <ButtonLink href={APPOINTMENT_HREF}>
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          Request an Appointment
        </ButtonLink>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <div>
              <div className="flex items-center gap-3 text-teal-700">
                <ServiceIcon name={service.icon} className="h-6 w-6" />
                <span className="text-sm font-semibold uppercase tracking-[0.14em]">Overview</span>
              </div>
              <p className="mt-5 text-xl leading-relaxed text-ink">{service.overview}</p>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-soft lg:hidden">
              <Photo image={service.image} sizes="100vw" />
            </div>
            <DetailBlock id="involves" icon={<ClipboardList className="h-5 w-5" />} title="What the service involves" items={service.involves} />
            <div className="grid gap-8 md:grid-cols-2">
              <DetailBlock id="who-may-benefit" icon={<Users className="h-5 w-5" />} title="Who might benefit" items={service.whoMayBenefit} />
              <DetailBlock id="what-to-expect" icon={<CalendarCheck className="h-5 w-5" />} title="What to expect" items={service.whatToExpect} />
            </div>
            <section aria-labelledby="why-consult" className="rounded-2xl bg-navy-900 p-8 text-white sm:p-10">
              <div className="flex items-center gap-3">
                <Stethoscope className="h-6 w-6 text-teal-300" aria-hidden="true" />
                <h2 id="why-consult" className="text-xl font-bold text-white">
                  Why a consultation matters
                </h2>
              </div>
              <p className="mt-4 text-lg leading-relaxed text-navy-100">{service.whyConsult}</p>
              <p className="mt-4 text-sm text-navy-200">
                This page provides general information only. Individual results and recommendations vary, and only a
                qualified dental professional can advise on your specific needs after an examination.
              </p>
            </section>
          </div>

          <aside className="lg:col-span-4" aria-label="Related information">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl shadow-soft lg:block">
                <Photo image={service.image} sizes="30vw" />
              </div>
              <div className="rounded-2xl border border-line bg-mist p-6">
                <h2 className="text-lg font-bold">Have questions about {service.name.toLowerCase()}?</h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  Request an appointment and our team will follow up to find a time that works for you.
                </p>
                <ButtonLink href={APPOINTMENT_HREF} size="sm" className="mt-5 w-full">
                  Request an Appointment
                </ButtonLink>
              </div>
              <nav aria-label="Other services" className="rounded-2xl border border-line p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Other services</h2>
                <ul className="mt-3 space-y-1">
                  {services
                    .filter((s) => s.slug !== service.slug)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className="block rounded-lg px-2 py-1.5 text-[0.95rem] text-ink hover:bg-mist hover:text-navy-900">
                          {s.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>

        <nav aria-label="Previous and next service" className="mt-16 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
          <Link href={`/services/${previous.slug}`} className="group rounded-2xl border border-line p-5 transition-colors hover:border-teal-300 hover:bg-teal-50/40">
            <span className="flex items-center gap-2 text-sm text-muted">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" /> Previous
            </span>
            <span className="mt-1 block font-display font-bold text-navy-900">{previous.name}</span>
          </Link>
          <Link href={`/services/${next.slug}`} className="group rounded-2xl border border-line p-5 text-right transition-colors hover:border-teal-300 hover:bg-teal-50/40">
            <span className="flex items-center justify-end gap-2 text-sm text-muted">
              Next <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
            <span className="mt-1 block font-display font-bold text-navy-900">{next.name}</span>
          </Link>
        </nav>
      </Section>

      <AppointmentCta />
    </>
  );
}
