import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  HandHeart,
  Lightbulb,
  ListChecks,
  MapPin,
  MessagesSquare,
  ShieldCheck,
  Smile,
  UserRound,
} from "lucide-react";
import { APPOINTMENT_HREF } from "@/config/navigation";
import { services } from "@/config/services";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { AppointmentCta } from "@/components/sections/appointment-cta";
import { ServiceCard } from "@/components/service-card";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Dental Care in Delaware",
    description:
      "Evercrest Dental Practice provides personalized, patient-focused dental care in Delaware, from preventive exams and cleanings to restorative and cosmetic dentistry.",
    path: "/",
  }),
  title: { absolute: `${siteConfig.name} | Dental Care in Delaware` },
};

const highlights = [
  { icon: ShieldCheck, label: "Preventive focus" },
  { icon: MessagesSquare, label: "Clear communication" },
  { icon: ListChecks, label: "Individualized plans" },
  { icon: HandHeart, label: "Welcoming environment" },
];

const reasons = [
  {
    icon: UserRound,
    title: "Individualized treatment planning",
    text: "Recommendations are based on your examination, health history, and goals — not a one-size-fits-all approach.",
  },
  {
    icon: MessagesSquare,
    title: "Clear communication",
    text: "We explain what we see, what your options are, and what to expect, in plain language.",
  },
  {
    icon: ShieldCheck,
    title: "A focus on preventive care",
    text: "Regular care and early attention can help you maintain a healthy smile over the long term.",
  },
  {
    icon: Smile,
    title: "A welcoming patient experience",
    text: "From your first call to your follow-up, we aim to make every visit comfortable and straightforward.",
  },
  {
    icon: Lightbulb,
    title: "Support for informed decisions",
    text: "You will have time to ask questions and the information you need to decide what is right for you.",
  },
];

const firstVisitSteps = [
  {
    title: "Request your appointment",
    text: "Send us a request online or contact the office. Our team will follow up to confirm a date and time.",
  },
  {
    title: "Prepare your information",
    text: "Bring a photo ID, your dental insurance card if you have one, and a list of current medications.",
  },
  {
    title: "Share your history and questions",
    text: "Your dental professional will review your medical and dental history and talk through any concerns.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-b from-mist to-white">
        <div aria-hidden="true" className="absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-teal-100/50 blur-3xl" />
        <Container className="relative grid items-center gap-12 pb-20 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-20">
          <div className="animate-fade-up lg:col-span-6 xl:col-span-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-1.5 text-sm font-medium text-teal-800 shadow-sm">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Dental Care in {siteConfig.location.state}
            </p>
            <h1 id="hero-heading" className="mt-6 text-[2.75rem] font-extrabold leading-[1.05] sm:text-6xl xl:text-[4.25rem]">
              Confident Smiles <span className="text-teal-700">Start Here.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Personalized dental care in a welcoming environment, with a focus on your comfort, oral health, and
              long-term smile.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={APPOINTMENT_HREF} size="lg">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Request an Appointment
              </ButtonLink>
              <ButtonLink href="/services" variant="outline" size="lg">
                Explore Our Services
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>

          <div className="relative lg:col-span-6 xl:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-navy-900/5 sm:aspect-[16/11] lg:aspect-[5/4] xl:aspect-[16/12]">
              <Photo image="heroConsultation" sizes="(min-width: 1280px) 720px, (min-width: 1024px) 50vw, 100vw" priority />
            </div>
            <div className="absolute -bottom-8 left-4 right-4 rounded-2xl border border-line bg-white/95 p-5 shadow-lift backdrop-blur sm:left-auto sm:right-8 sm:w-80 lg:left-8 lg:right-auto">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <HandHeart className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display font-bold text-navy-900">Patient-focused care</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    For individuals and families seeking dental care in {siteConfig.location.state}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Highlights strip */}
      <section aria-label="What we focus on" className="border-y border-line bg-white">
        <Container>
          <ul className="grid grid-cols-2 divide-line py-6 sm:py-8 lg:grid-cols-4 lg:divide-x">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center justify-center gap-3 px-2 py-3 text-center sm:px-4">
                <Icon className="h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                <span className="text-sm font-semibold text-navy-900 sm:text-base">{label}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Introduction */}
      <Section labelledBy="intro-heading">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 grid grid-cols-5 gap-4 lg:order-1">
            <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-2xl shadow-soft">
              <Photo image="treatmentRoom" sizes="(min-width: 1024px) 30vw, 60vw" />
            </div>
            <div className="col-span-2 flex flex-col gap-4 pt-12">
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-soft">
                <Photo image="reception" sizes="(min-width: 1024px) 20vw, 40vw" />
              </div>
              <div className="hidden rounded-2xl bg-navy-900 p-5 text-white sm:block">
                <p className="font-display text-lg font-bold leading-snug">Comfortable. Personal. Straightforward.</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              id="intro-heading"
              eyebrow="Welcome to Evercrest"
              title="Dental Care That Puts You First"
              description={
                <>
                  <p>
                    At Evercrest, we believe dental care should feel comfortable, personal, and straightforward. Our goal
                    is to help patients make informed decisions about their oral health through attentive service, clear
                    communication, and individualized care.
                  </p>
                  <p className="mt-4">
                    Whether you are due for a routine check-up or have questions about a specific concern, we take the
                    time to listen, explain your options, and help you feel at ease.
                  </p>
                </>
              }
            />
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-semibold text-teal-700 underline-offset-4 hover:text-teal-800 hover:underline"
              >
                Learn more about our approach
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section tone="mist" labelledBy="services-heading">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="services-heading"
            eyebrow="Dental Services"
            title="Comprehensive Care for Every Stage of Your Smile"
            description="From routine preventive visits to restoring and enhancing your smile, we discuss every option with you before treatment begins."
          />
          <ButtonLink href="/services" variant="outline" className="shrink-0 self-start md:self-auto">
            View All Services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug} className="flex">
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </Section>

      {/* Why choose Evercrest */}
      <Section tone="navy" labelledBy="why-heading" className="relative overflow-hidden">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="why-heading"
              tone="light"
              eyebrow="Why Choose Evercrest?"
              title="Care Built Around You"
              description="We believe good dentistry starts with listening. These principles guide every visit."
            />
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10 lg:block">
              <Photo image="consultation" sizes="40vw" />
            </div>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {reasons.map(({ icon: Icon, title, text }, index) => (
              <li
                key={title}
                className={`rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:bg-white/[0.07] ${
                  index === reasons.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/15 text-teal-200">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 leading-relaxed text-navy-200">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* New patients */}
      <Section labelledBy="first-visit-heading">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              id="first-visit-heading"
              eyebrow="New Patients"
              title="Your First Visit Starts Here"
              description="Your first appointment is a chance for us to get to know you. A little preparation helps us understand your needs and make the most of your time."
            />
            <ol className="mt-10 space-y-6">
              {firstVisitSteps.map((step, index) => (
                <li key={step.title} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50 font-display font-bold text-teal-700 ring-1 ring-teal-200"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/patient-information" variant="secondary">
                <ClipboardList className="h-4 w-4" aria-hidden="true" />
                Patient Information
              </ButtonLink>
              <ButtonLink href={APPOINTMENT_HREF} variant="outline">
                Request an Appointment
              </ButtonLink>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift sm:aspect-[4/3] lg:aspect-[4/5]">
              <Photo image="dentistWithPatient" sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
            <div aria-hidden="true" className="absolute -bottom-5 -right-5 -z-10 hidden h-40 w-40 rounded-3xl bg-teal-100 sm:block" />
          </div>
        </div>
      </Section>

      <AppointmentCta />
    </>
  );
}
