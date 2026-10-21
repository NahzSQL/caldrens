import type { Metadata } from "next";
import { BookOpen, CalendarCheck, MessagesSquare, ShieldCheck, UserRound } from "lucide-react";
import { APPOINTMENT_HREF } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { AppointmentCta } from "@/components/sections/appointment-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Learn about Evercrest Dental Practice, a Delaware dental practice focused on preventive care, clear communication, and individualized treatment planning.",
  path: "/about",
});

const approach = [
  {
    icon: UserRound,
    title: "We start by listening",
    text: "Every visit begins with your questions, concerns, and goals. Understanding what matters to you helps us recommend care that fits.",
  },
  {
    icon: MessagesSquare,
    title: "We explain clearly",
    text: "We share what we find, describe your options in plain language, and make sure you understand the benefits and trade-offs of each.",
  },
  {
    icon: BookOpen,
    title: "You decide with confidence",
    text: "Treatment plans are discussed openly, including timing and costs, so you can make an informed decision without pressure.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Evercrest"
        title="A Delaware Dental Practice Built on Trust and Personal Care"
        description="We believe dental care should feel comfortable, personal, and straightforward — for individuals and families alike."
        image="reception"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* Purpose */}
      <Section labelledBy="purpose-heading">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              id="purpose-heading"
              eyebrow="Our Purpose"
              title="Helping Patients Care for Their Smiles With Confidence"
              description={
                <>
                  <p>
                    Evercrest Dental Practice was created to provide attentive, high-quality dental care in a setting where
                    patients feel welcome and informed. We want every patient to leave understanding their oral health and
                    feeling confident about the next step.
                  </p>
                  <p className="mt-4">
                    We serve individuals and families seeking dental care in {siteConfig.location.state}, and we aim to
                    build lasting relationships based on respect, honesty, and consistent care.
                  </p>
                </>
              }
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
            <Photo image="treatmentRoom" sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        </div>
      </Section>

      {/* Approach */}
      <Section tone="mist" labelledBy="approach-heading">
        <SectionHeading
          id="approach-heading"
          align="center"
          eyebrow="Our Approach to Care"
          title="Communication and Treatment Planning, Done Right"
          description="Good dental care is a partnership. Our approach is designed to keep you informed and involved at every step."
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {approach.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="relative rounded-2xl border border-line bg-white p-8 shadow-soft">
              <span
                aria-hidden="true"
                data-step={`0${index + 1}`}
                className="absolute right-6 top-6 font-display text-5xl font-extrabold text-navy-100 before:content-[attr(data-step)]"
              />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-teal-300">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="relative mt-6 text-xl font-bold">{title}</h3>
              <p className="relative mt-3 leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Preventive care */}
      <Section labelledBy="preventive-heading">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift lg:order-1">
            <Photo image="dentistWithPatient" sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              id="preventive-heading"
              eyebrow="Preventive Oral Health"
              title="Why We Emphasize Prevention"
              description="Many dental problems develop gradually and may not cause symptoms at first. Regular examinations, professional cleanings, and consistent care at home can help identify concerns early, when treatment may be simpler."
            />
            <ul className="mt-8 space-y-4">
              {[
                "Routine visits help track changes in your oral health over time.",
                "Professional cleanings remove buildup that brushing alone cannot.",
                "Personalized home-care guidance helps you protect your teeth between visits.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                  <span className="text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Practice photography */}
      <Section labelledBy="practice-heading">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="practice-heading"
            eyebrow="Our Practice"
            title="A Clean, Welcoming Environment"
            description="Our practice is designed to feel calm and comfortable, with modern equipment and attention to detail."
          />
          <ButtonLink href={APPOINTMENT_HREF} className="shrink-0 self-start md:self-auto">
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Request an Appointment
          </ButtonLink>
        </div>
        <div className="mt-12 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[240px]">
          <div className="relative overflow-hidden rounded-2xl sm:col-span-2 sm:row-span-2">
            <Photo image="clinic" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <Photo image="reception" sizes="(min-width: 1024px) 25vw, 50vw" />
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <Photo image="equipment" sizes="(min-width: 1024px) 25vw, 50vw" />
          </div>
          <div className="relative overflow-hidden rounded-2xl sm:col-span-2">
            <Photo image="consultation" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>
      </Section>

      <AppointmentCta />
    </>
  );
}
