import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CalendarCheck, Compass, Eye, MessageCircle, Search, ShieldCheck, Signpost, Waypoints } from "lucide-react";
import { ContactCta } from "@/components/ContactCta";
import { Photo } from "@/components/Photo";
import { PracticeIcon } from "@/components/PracticeIcon";
import { SectionHeading } from "@/components/SectionHeading";
import { consultationHref, photos, practiceAreas, site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Trusted Legal Counsel in South Carolina, USA` },
  description:
    "JurisPoint provides clear, practical legal guidance on corporate and commercial matters, contracts, disputes, property and family law. Book a consultation today.",
  alternates: { canonical: "/" },
};

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    text: "Honest, straightforward guidance, including candour about what can and cannot be known at the outset. Your trust is something to be earned through how each matter is handled.",
  },
  {
    icon: MessageCircle,
    title: "Clear Communication",
    text: "Legal issues explained in plain English, without unnecessary jargon. You should always understand where your matter stands and what the next step is.",
  },
  {
    icon: Eye,
    title: "Careful Attention to Detail",
    text: "Documents read closely, facts considered properly and questions asked early. Small details can shape a legal matter, so they are given the time they deserve.",
  },
  {
    icon: Compass,
    title: "Practical Guidance",
    text: "Advice that takes account of your circumstances, priorities and resources, so the options discussed are ones you can realistically act on.",
  },
];

const steps = [
  {
    icon: Search,
    title: "Understand the Matter",
    text: "We begin by listening. You explain what has happened and what concerns you, and we review the key facts and any documents you share, so the issue is properly understood before any view is formed.",
  },
  {
    icon: Waypoints,
    title: "Explore Available Options",
    text: "Next, we set out the routes that may be open to you, explaining what each could involve, along with the considerations and trade-offs worth weighing, in language that is easy to follow.",
  },
  {
    icon: Signpost,
    title: "Determine the Next Steps",
    text: "With a clearer picture, you decide how to proceed. We help you plan the sensible next steps, whether that is preparing documents, opening a conversation with another party or simply taking time to consider.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ivory" aria-labelledby="hero-title">
        <div className="absolute right-0 top-0 hidden h-full w-[38%] bg-ivory-100 lg:block" aria-hidden="true" />
        <div className="container relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
          <div className="animate-fade-up">
            <p className="eyebrow">{site.tagline}</p>
            <h1 id="hero-title" className="mt-6 text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-[4.1rem]">
              Trusted Legal Counsel. <span className="italic text-gold-600">Confident</span> Decisions.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-navy-700">
              Legal matters can be complicated. JurisPoint is built around a straightforward approach: understand the
              issue, explain the available options, and help clients make informed decisions about their next steps.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href={consultationHref} className="btn-primary">
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Book a Consultation
              </Link>
              <Link href="/services" className="btn-outline">
                Explore Our Services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-1 gap-6 border-t border-navy-900/10 pt-8 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-500">Call</dt>
                <dd className="mt-1.5">
                  <a href={site.phoneHref} className="font-medium text-navy-900 hover:text-gold-600">{site.phoneDisplay}</a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-500">Based in</dt>
                <dd className="mt-1.5 font-medium text-navy-900">{site.location}</dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -bottom-5 -right-5 hidden h-full w-full border border-gold-500/60 sm:block" aria-hidden="true" />
            <div className="relative aspect-[4/5] w-full overflow-hidden shadow-lift sm:aspect-[5/6]">
              <Photo {...photos.hero} sizes="(min-width: 1024px) 46vw, 100vw" priority />
            </div>
            <div className="absolute -bottom-8 left-4 right-4 bg-navy-900 p-6 text-white shadow-lift sm:left-auto sm:right-10 sm:max-w-xs">
              <p className="font-serif text-xl leading-snug">Clear advice, explained in plain language.</p>
              <p className="mt-2 text-sm text-navy-200">So every decision is an informed one.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white py-24 sm:py-28" aria-labelledby="intro-title">
        <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="group relative order-2 aspect-[4/3] overflow-hidden shadow-card lg:order-1">
            <Photo {...photos.signing} sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              id="intro-title"
              eyebrow="About the firm"
              title="Legal Guidance with Purpose"
              intro={
                <p>
                  Good legal guidance starts with clear communication. JurisPoint takes the time to understand what
                  each client is facing, then explains the relevant considerations in plain, direct language.
                </p>
              }
            />
            <div className="mt-6 space-y-5 leading-relaxed text-navy-700">
              <p>
                No two matters are quite the same. Every enquiry is considered carefully on its own facts, with
                attention to the documents involved, the people affected and the outcome you are hoping for.
              </p>
              <p>
                The result is practical guidance tailored to your individual circumstances: an honest picture of where
                you stand, the options that may be available and what each could mean for you.
              </p>
            </div>
            <Link href="/contact" className="link-arrow mt-8">
              Learn more about JurisPoint
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Practice areas */}
      <section className="bg-ivory py-24 sm:py-28" aria-labelledby="practice-title">
        <div className="container">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              id="practice-title"
              eyebrow="Practice areas"
              title="Matters We Can Help You Think Through"
              intro="JurisPoint offers guidance across six areas of law that commonly affect individuals, families and businesses."
            />
            <Link href="/services" className="btn-outline shrink-0 self-start lg:self-auto">
              View all services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/services#${area.slug}`}
                  className="group relative flex h-full flex-col border border-navy-900/10 bg-white p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-lift"
                >
                  <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold-500 transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
                  <span className="flex h-14 w-14 items-center justify-center bg-navy-900 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                    <PracticeIcon name={area.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-7 text-[1.4rem] leading-snug">{area.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-navy-700">{area.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-800 group-hover:text-gold-600">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why JurisPoint */}
      <section className="on-dark relative overflow-hidden bg-navy-900 py-24 sm:py-28" aria-labelledby="why-title">
        <div className="pattern-lines absolute inset-0" aria-hidden="true" />
        <div className="container relative grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              light
              id="why-title"
              eyebrow="Why JurisPoint?"
              title="Principles That Guide Every Matter"
              intro="The firm's values are simple and deliberate. They shape how each enquiry is received, how advice is given and how clients are treated from the first conversation onward."
            />
            <div className="group relative mt-12 hidden aspect-[4/3] overflow-hidden lg:block">
              <Photo {...photos.study} sizes="40vw" />
            </div>
          </div>
          <ul className="grid gap-px self-center overflow-hidden bg-white/10 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="bg-navy-900 p-8 transition-colors duration-300 hover:bg-navy-800 sm:p-10">
                <Icon className="h-8 w-8 text-gold-400" strokeWidth={1.4} aria-hidden="true" />
                <h3 className="mt-6 text-2xl text-white">{title}</h3>
                <p className="mt-3 leading-relaxed text-navy-100">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-white py-24 sm:py-28" aria-labelledby="approach-title">
        <div className="container">
          <SectionHeading
            align="center"
            id="approach-title"
            eyebrow="Our approach"
            title="A Clear Path from Question to Decision"
            intro="Working with JurisPoint follows three straightforward stages, designed to keep you informed and in control throughout."
          />
          <div className="relative mt-16">
          <div className="absolute left-[16.5%] right-[16.5%] top-8 hidden h-px bg-gradient-to-r from-gold-500/20 via-gold-500 to-gold-500/20 lg:block" aria-hidden="true" />
          <ol className="relative grid gap-10 lg:grid-cols-3 lg:gap-8">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="relative text-center">
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold-500 bg-white text-navy-900 shadow-card">
                  <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-gold-600">Step {i + 1}</p>
                <h3 className="mt-2 text-2xl">{title}</h3>
                <p className="mx-auto mt-4 max-w-sm leading-relaxed text-navy-700">{text}</p>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </section>

      <ContactCta
        title="Every Legal Matter Deserves Careful Attention."
        text="Whatever you are facing, a clear conversation is a good place to start. Contact JurisPoint to discuss your needs and find out how the firm may be able to help."
        buttonLabel="Contact JurisPoint"
        href="/contact#enquiry"
      />
    </>
  );
}
