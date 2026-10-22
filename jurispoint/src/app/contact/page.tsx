import type { Metadata } from "next";
import { Briefcase, HeartHandshake, Landmark, Mail, MapPin, Phone, ScanSearch, User } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
import { photos, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us & Contact",
  description:
    "Learn about JurisPoint, owned by Stevens Gregs, and its commitment to integrity, diligence and clear communication. Contact the firm by phone, email or online enquiry.",
  alternates: { canonical: "/contact" },
};

const values = [
  {
    icon: Landmark,
    title: "Integrity",
    text: "Honesty sits at the centre of every conversation. Clients can expect a candid view of their situation, including its uncertainties, rather than promises that cannot be kept.",
  },
  {
    icon: Briefcase,
    title: "Professionalism",
    text: "Every enquiry is handled with courtesy, discretion and respect for the client's time. Communication is prompt, measured and clear.",
  },
  {
    icon: ScanSearch,
    title: "Diligence",
    text: "Matters are approached thoroughly: documents are read closely, the right questions are asked and the details are given the care they deserve.",
  },
  {
    icon: HeartHandshake,
    title: "Client Commitment",
    text: "Clients are kept informed and involved. The aim is to help each person understand their options well enough to make decisions with confidence.",
  },
];

const contactItems = [
  { icon: Landmark, label: "Firm", value: site.name },
  { icon: User, label: "Owner", value: site.owner },
  { icon: MapPin, label: "Location", value: site.location },
  { icon: Phone, label: "Telephone", value: site.phoneDisplay, href: site.phoneHref },
  { icon: Mail, label: "Email", value: site.email, href: site.emailHref },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us & Contact"
        title="Clear Advice Begins with a Conversation"
        intro="Get to know JurisPoint, what it stands for and how to get in touch. A short enquiry is all it takes to begin."
        photo={photos.office}
      />

      {/* About */}
      <section className="bg-white py-24 sm:py-28" aria-labelledby="about-title">
        <div className="container grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading id="about-title" eyebrow="About JurisPoint" title="A Clearer Point of Direction in Law" />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-navy-700">
              <p>
                JurisPoint is a law firm based in South Carolina, USA, and owned by {site.owner}. The firm is built
                around a simple idea: people facing a legal question deserve clear direction, explained in a way they
                can understand and act on.
              </p>
              <p>
                Legal matters often arrive at difficult moments, whether a business arrangement is under strain, an
                agreement needs to be signed or a family situation has changed. JurisPoint&apos;s role is to bring
                order and clarity to those moments by listening carefully, considering each matter thoughtfully and
                setting out the available options honestly.
              </p>
              <p>
                That commitment rests on four principles: integrity in every interaction, diligence in every task,
                clear communication at every stage and thoughtful consideration of what each client actually needs.
              </p>
            </div>
            <p className="mt-8 font-serif text-2xl italic text-gold-600">{site.tagline}</p>
          </div>
          <div className="group relative aspect-[4/5] overflow-hidden shadow-lift sm:aspect-[4/3] lg:aspect-[4/5]">
            <Photo {...photos.meeting} sizes="(min-width: 1024px) 42vw, 100vw" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ivory py-24 sm:py-28" aria-labelledby="values-title">
        <div className="container">
          <SectionHeading
            align="center"
            id="values-title"
            eyebrow="Our values"
            title="What You Can Expect from JurisPoint"
            intro="Four commitments that shape how the firm works with every client."
          />
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="group border border-navy-900/10 bg-white p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-lift"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-500 text-navy-900 transition-colors group-hover:bg-navy-900 group-hover:text-gold-400">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-2xl">{title}</h3>
                <p className="mt-3 leading-relaxed text-navy-700">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="enquiry" className="scroll-mt-24 bg-ivory-100 py-24 sm:py-28" aria-labelledby="contact-title">
        <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              id="contact-title"
              eyebrow="Contact"
              title="Book a Consultation"
              intro="Send an enquiry using the form, or contact JurisPoint directly by phone or email. Please share a brief outline of your matter and the firm will be in touch to arrange a time to talk."
            />

            <div className="on-dark mt-10 bg-navy-900 p-8 text-white shadow-lift sm:p-10">
              <h3 className="font-serif text-2xl text-white">Contact Details</h3>
              <div className="mt-2 h-px w-12 bg-gold-500" aria-hidden="true" />
              <dl className="mt-8 space-y-6">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex gap-4">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" strokeWidth={1.5} aria-hidden="true" />
                    <div className="min-w-0">
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-200">{label}</dt>
                      <dd className="mt-1 text-lg">
                        {href ? (
                          <a href={href} className="break-all underline-offset-4 transition-colors hover:text-gold-300 hover:underline">
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div>
            <h3 className="sr-only">Enquiry form</h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
