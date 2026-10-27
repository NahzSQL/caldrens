import type { Metadata } from "next";
import {
  Building2,
  Globe,
  Handshake,
  ListChecks,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Photo } from "@/components/Photo";
import { FeatureCard, SectionHeading } from "@/components/ui";
import { images, siteConfig } from "@/config/site";

const title = "About & Contact | Clear Cycle Resources";
const description =
  "Learn about Clear Cycle Resources and contact Kevin Brook to discuss healthcare operations and care coordination needs.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about-contact" },
  openGraph: { title, description, url: "/about-contact" },
  twitter: { card: "summary_large_image", title, description },
};

type ContactDetail = {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
};

function getContactDetails(): ContactDetail[] {
  const details: ContactDetail[] = [
    { icon: Building2, label: "Company", value: siteConfig.name },
    { icon: UserRound, label: "Contact person", value: siteConfig.owner.name },
    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Globe, label: "Website", value: siteConfig.url, href: siteConfig.url },
  ];

  // Optional details appear only once they have been verified and added to the site config.
  if (siteConfig.phone) {
    details.push({
      icon: Phone,
      label: "Telephone",
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`,
    });
  }
  if (siteConfig.address) {
    const { street, city, state, postalCode } = siteConfig.address;
    details.push({ icon: MapPin, label: "Headquarters", value: `${street}, ${city}, ${state} ${postalCode}` });
  } else if (siteConfig.serviceArea) {
    details.push({ icon: MapPin, label: "Service area", value: siteConfig.serviceArea });
  }

  return details;
}

export default function AboutContactPage() {
  const contactDetails = getContactDetails();
  const ownerInitials = siteConfig.owner.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <>
      {/* About */}
      <section aria-labelledby="about-heading" className="relative overflow-hidden bg-mist">
        <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:py-24">
          <div className="lg:col-span-7">
            <p className="eyebrow animate-rise">About us</p>
            <h1
              id="about-heading"
              className="animate-rise delay-1 mt-5 text-4xl font-extrabold leading-[1.1] sm:text-5xl"
            >
              About Clear Cycle Resources
            </h1>
            <div className="animate-rise delay-2 mt-6 max-w-2xl space-y-5 text-lg leading-relaxed text-slate">
              <p>
                Clear Cycle Resources is developing a healthcare services business focused on
                benefits administration support, care coordination, provider communication, and
                healthcare operations.
              </p>
              <p>
                Our approach emphasizes clear processes, responsible handling of information, and
                practical collaboration with organizations working to improve the coordination of
                healthcare services.
              </p>
              <p>
                We aim to help healthcare teams organize their workflows, communicate more
                effectively, and identify opportunities to improve operational consistency.
              </p>
            </div>
          </div>
          <div className="animate-rise delay-2 lg:col-span-5">
            <Photo
              src={images.about.src}
              alt={images.about.alt}
              sizes="(min-width: 1024px) 460px, 100vw"
              preload
              className="aspect-[4/3] rounded-3xl shadow-card-hover lg:aspect-[4/5]"
            />
          </div>
        </div>
      </section>

      {/* Approach */}
      <section aria-labelledby="approach-heading" className="py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            id="approach-heading"
            eyebrow="Our approach"
            title="How We Work"
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard icon={ListChecks} title="Clear processes">
              We focus on well-defined, documented workflows so responsibilities, handoffs, and
              next steps are easy for teams to follow.
            </FeatureCard>
            <FeatureCard icon={ShieldCheck} title="Responsible handling of information">
              We treat the information shared with us with care and limit its use to the purpose
              for which it was provided.
            </FeatureCard>
            <FeatureCard icon={Handshake} title="Practical collaboration">
              We work alongside the organizations we support, building on how their teams already
              operate rather than imposing one-size-fits-all approaches.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section aria-labelledby="leadership-heading" className="bg-mist py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading id="leadership-heading" eyebrow="Leadership" title="Meet Our Leadership" />
          <article className="mt-10 flex flex-col gap-6 rounded-3xl border border-line bg-white p-7 shadow-card sm:flex-row sm:items-center sm:gap-8 sm:p-10 lg:max-w-4xl">
            <div
              aria-hidden="true"
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-navy font-display text-3xl font-extrabold text-white"
            >
              {ownerInitials}
            </div>
            <div>
              <h3 className="text-2xl font-bold">{siteConfig.owner.name}</h3>
              <p className="mt-1 font-semibold text-teal-700">{siteConfig.owner.title}</p>
              <p className="mt-4 leading-relaxed text-slate">
                Kevin Brook leads Clear Cycle Resources and its development as a healthcare services
                business, with a focus on practical operational support and coordinated service
                delivery.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              id="contact-heading"
              eyebrow="Contact"
              title="Contact Clear Cycle Resources"
              intro={
                <p>
                  Have a question about our services or want to discuss a potential collaboration?
                  Contact our team using the details below.
                </p>
              }
            />

            <ul className="mt-10 space-y-5">
              {contactDetails.map((detail) => (
                <li key={detail.label} className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <detail.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-slate">{detail.label}</span>
                    <span className="mt-0.5 block break-words font-semibold text-navy">
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="rounded-sm underline decoration-teal/40 underline-offset-4 transition-colors hover:text-teal-700 hover:decoration-teal"
                        >
                          {detail.value.replace(/^https:\/\//, "")}
                        </a>
                      ) : (
                        detail.value
                      )}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-10">
              <h3 className="text-2xl font-bold">Send us a message</h3>
              <p className="mt-2 text-slate">
                Tell us a little about your organization and what you would like to discuss.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy" aria-labelledby="privacy-heading" className="scroll-mt-24 pb-20 sm:pb-28">
        <div className="container-page">
          <div className="rounded-3xl bg-mist p-7 sm:p-10">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-teal-700" aria-hidden="true" />
              <h2 id="privacy-heading" className="text-2xl font-bold">
                Privacy and Your Information
              </h2>
            </div>
            <div className="mt-6 grid gap-6 text-[0.9375rem] leading-relaxed text-charcoal md:grid-cols-3">
              <div>
                <h3 className="text-base font-bold">What we collect and why</h3>
                <p className="mt-2">
                  When you use the contact form, we collect the details you enter: your name,
                  business email, organization, job title, area of interest, and message. We use
                  this information only to respond to your inquiry and to discuss services you ask
                  about. We do not sell it.
                </p>
              </div>
              <div>
                <h3 className="text-base font-bold">How it is handled</h3>
                <p className="mt-2">
                  Your submission is sent by email to {siteConfig.name} through our email service
                  provider and is not stored in a database on this website. Please do not include
                  patient information or other protected health information in your message.
                  {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY &&
                    " To protect the form from spam, it uses Cloudflare Turnstile, which processes limited technical information about your browser."}
                </p>
              </div>
              <div>
                <h3 className="text-base font-bold">Your choices</h3>
                <p className="mt-2">
                  To ask what information we hold about you, or to request that it be corrected or
                  deleted, email{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="break-all font-semibold text-teal-700 underline underline-offset-2 hover:text-navy"
                  >
                    {siteConfig.email}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
