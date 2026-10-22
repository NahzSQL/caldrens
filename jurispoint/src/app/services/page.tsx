import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, ChevronDown, Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PracticeIcon } from "@/components/PracticeIcon";
import { SectionHeading } from "@/components/SectionHeading";
import { photos, practiceAreas, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore JurisPoint's practice areas: corporate and commercial law, contract drafting and review, dispute resolution, property and real estate, family law, and legal consultation.",
  alternates: { canonical: "/services" },
};

const faqs = [
  {
    q: "How do I schedule a consultation?",
    a: (
      <>
        <p>
          The simplest way is to send a short enquiry through the{" "}
          <Link href="/contact#enquiry" className="font-medium text-navy-900 underline underline-offset-4 hover:text-gold-600">
            contact form
          </Link>
          . You are also welcome to call{" "}
          <a href={site.phoneHref} className="font-medium text-navy-900 underline underline-offset-4 hover:text-gold-600">
            {site.phoneDisplay}
          </a>{" "}
          or email{" "}
          <a href={site.emailHref} className="break-all font-medium text-navy-900 underline underline-offset-4 hover:text-gold-600">
            {site.email}
          </a>
          .
        </p>
        <p>Once your enquiry has been reviewed, JurisPoint will contact you to arrange a convenient time to talk.</p>
      </>
    ),
  },
  {
    q: "What documents should I prepare?",
    a: (
      <>
        <p>
          Gather anything directly connected to your matter: agreements or contracts, letters and emails, notices you
          have received, property or company documents, and a short timeline of key dates and events.
        </p>
        <p>
          Please do not send documents with your first enquiry. If they are needed, you will be told which ones are
          relevant and how to share them securely.
        </p>
      </>
    ),
  },
  {
    q: "How are legal fees determined?",
    a: (
      <p>
        Fees depend on the nature, complexity and scope of the work involved, so they are discussed with you directly
        rather than published as a fixed list. The basis of any fees will be explained and agreed with you before work
        on your matter begins, and you are always welcome to ask questions about costs.
      </p>
    ),
  },
  {
    q: "What happens after I send an initial enquiry?",
    a: (
      <p>
        Your enquiry is reviewed to understand the general nature of your matter. JurisPoint will then contact you
        using the details you provide to discuss whether and how the firm can help, and what the next steps would be.
        Sending an enquiry does not commit you to anything.
      </p>
    ),
  },
  {
    q: "When does a lawyer-client relationship begin?",
    a: (
      <p>
        A lawyer-client relationship is not created by visiting this website, sending an enquiry, or calling or
        emailing the firm. It begins only once JurisPoint has confirmed in writing that it will act for you and the
        terms of the engagement, including its scope, have been agreed. Until then, please do not rely on any general
        information as advice about your situation.
      </p>
    ),
  },
  {
    q: "Should I include confidential details in my first message?",
    a: (
      <p>
        No. A brief, general outline of your matter is all that is needed at first. Please avoid sharing highly
        sensitive or confidential information until a lawyer-client relationship has been established and a secure way
        of sharing details has been agreed.
      </p>
    ),
  },
  {
    q: "What if my matter is not listed here?",
    a: (
      <p>
        The practice areas on this page describe the matters JurisPoint focuses on. If you are unsure whether your
        situation fits, get in touch with a brief outline. If the firm is not able to help, you will be told so
        promptly, so you can look for assistance elsewhere.
      </p>
    ),
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Practical Legal Guidance Across Six Areas"
        intro="From business agreements to family concerns, JurisPoint helps individuals and businesses understand the legal matters in front of them and the options that may be available."
        photo={photos.architecture}
      >
        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <Link href="/contact#enquiry" className="btn-gold">
            Discuss your matter
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a href="#faq" className="btn-outline-light">Read the FAQs</a>
        </div>
      </PageHero>

      {/* Jump links */}
      <nav aria-label="Practice areas" className="border-b border-navy-900/10 bg-white">
        <div className="container">
          <ul className="flex snap-x gap-x-8 overflow-x-auto py-5 text-sm [scrollbar-width:none] lg:flex-wrap lg:justify-center lg:gap-y-3">
            {practiceAreas.map((area) => (
              <li key={area.slug} className="shrink-0 snap-start">
                <a href={`#${area.slug}`} className="font-medium text-navy-700 underline-offset-4 hover:text-gold-600 hover:underline">
                  {area.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Services */}
      <div className="bg-ivory">
        {practiceAreas.map((area, i) => (
          <section
            key={area.slug}
            id={area.slug}
            aria-labelledby={`${area.slug}-title`}
            className={`py-20 sm:py-24 ${i % 2 === 1 ? "bg-white" : ""}`}
          >
            <div className="container grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
              <div>
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-navy-900 text-gold-400">
                    <PracticeIcon name={area.icon} className="h-6 w-6" />
                  </span>
                  <span className="font-serif text-lg italic text-gold-600">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h2 id={`${area.slug}-title`} className="mt-7 text-3xl leading-tight sm:text-4xl">
                  {area.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-navy-800">{area.intro}</p>
                <p className="mt-5 leading-relaxed text-navy-700">{area.body}</p>
                <Link href={`/contact?matter=${area.slug}#enquiry`} className="link-arrow mt-8">
                  Enquire about {area.title.toLowerCase()}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <aside
                aria-label={`Topics in ${area.title}`}
                className="self-start border-t-2 border-gold-500 bg-white p-8 shadow-card sm:p-10 lg:mt-20"
              >
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-navy-500">
                  Matters we can discuss
                </h3>
                <ul className="mt-6 space-y-4">
                  {area.topics.map((topic) => (
                    <li key={topic} className="flex gap-3 text-navy-800">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>
        ))}
      </div>

      {/* FAQ */}
      <section id="faq" className="bg-ivory-100 py-24 sm:py-28" aria-labelledby="faq-title">
        <div className="container grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              id="faq-title"
              eyebrow="Questions"
              title="Frequently Asked Questions"
              intro="Answers to common questions about getting in touch, preparing for a consultation and how working with JurisPoint begins."
            />
          </div>
          <div className="divide-y divide-navy-900/10 border-y border-navy-900/10">
            {faqs.map((item) => (
              <details key={item.q} className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-serif text-xl text-navy-900 transition-colors hover:text-gold-600 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-gold-500 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="space-y-4 pb-6 pr-4 leading-relaxed text-navy-700">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="on-dark bg-navy-900 py-20 sm:py-24" aria-labelledby="services-contact-title">
        <div className="container grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow eyebrow-light">Get in touch</p>
            <h2 id="services-contact-title" className="mt-4 text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Talk Through Your Matter?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-100">
              Send a brief enquiry and JurisPoint will be in touch to discuss your situation and how the firm may be able
              to help.
            </p>
            <Link href="/contact#enquiry" className="btn-gold mt-9">
              Go to the enquiry form
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="space-y-4">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-5 border border-white/15 p-6 text-white transition-colors hover:border-gold-400 hover:bg-white/5">
                <Phone className="h-6 w-6 shrink-0 text-gold-400" strokeWidth={1.5} aria-hidden="true" />
                <span>
                  <span className="block text-xs uppercase tracking-[0.18em] text-navy-200">Call</span>
                  <span className="mt-1 block text-lg">{site.phoneDisplay}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="flex items-center gap-5 border border-white/15 p-6 text-white transition-colors hover:border-gold-400 hover:bg-white/5">
                <Mail className="h-6 w-6 shrink-0 text-gold-400" strokeWidth={1.5} aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.18em] text-navy-200">Email</span>
                  <span className="mt-1 block break-all text-lg">{site.email}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
