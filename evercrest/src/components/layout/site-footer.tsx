import Link from "next/link";
import { MapPin } from "lucide-react";
import { APPOINTMENT_HREF, legalNav, mainNav } from "@/config/navigation";
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";
import { ContactDetails, OfficeHours } from "@/components/contact-info";
import { CurrentYear } from "@/components/current-year";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

const linkClass = "text-navy-200 transition-colors hover:text-white";

export function SiteFooter() {
  return (
    <footer className="bg-navy-950 text-navy-100" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block rounded-lg">
              <Logo tone="light" />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-navy-200">
              Personalized dental care in a welcoming environment, with a focus on your comfort, oral health, and
              long-term smile.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-navy-100 ring-1 ring-white/10">
              <MapPin className="h-4 w-4 text-teal-300" aria-hidden="true" />
              {siteConfig.location.state}, USA
            </p>
            <div className="mt-8">
              <ButtonLink href={APPOINTMENT_HREF} variant="primary" size="sm">
                Request an Appointment
              </ButtonLink>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:col-span-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
              <ul className="mt-5 space-y-3">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
              <ul className="mt-5 space-y-3">
                {services.slice(0, 6).map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className={linkClass}>
                      {service.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/services" className="font-medium text-teal-300 hover:text-teal-200">
                    All services
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <div className="space-y-10 lg:col-span-4">
            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
              <ContactDetails tone="light" />
            </div>
            <OfficeHours tone="light" compact />
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-sm text-navy-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {siteConfig.copyrightStartYear ? `${siteConfig.copyrightStartYear}–` : ""}
            <CurrentYear /> {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            {siteConfig.social.map((social) => (
              <li key={social.href}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {social.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
