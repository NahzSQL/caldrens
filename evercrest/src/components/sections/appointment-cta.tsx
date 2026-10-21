import { CalendarCheck } from "lucide-react";
import { APPOINTMENT_HREF } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/ui/logo";

export function AppointmentCta() {
  return (
    <section aria-labelledby="appointment-cta-heading" className="bg-white py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-teal-800 px-6 py-14 text-center shadow-lift sm:px-12 sm:py-16 lg:py-20">
          <LogoMark className="pointer-events-none absolute -right-10 -top-10 h-72 w-auto text-white/[0.05]" />
          <LogoMark className="pointer-events-none absolute -bottom-16 -left-12 h-64 w-auto text-white/[0.04]" />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="appointment-cta-heading" className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              Ready to Take the Next Step Toward a Healthier Smile?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-100">
              Connect with Evercrest to learn more about our dental services and request an appointment.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={APPOINTMENT_HREF} size="lg">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Request an Appointment
              </ButtonLink>
              {siteConfig.contact.phone && (
                <ButtonLink href={`tel:${siteConfig.contact.phoneHref ?? siteConfig.contact.phone}`} variant="outline-light" size="lg">
                  Call {siteConfig.contact.phone}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
