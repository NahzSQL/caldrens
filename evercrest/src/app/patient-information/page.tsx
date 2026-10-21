import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarClock,
  CalendarX2,
  CheckCircle2,
  CircleHelp,
  ClipboardList,
  CreditCard,
  ExternalLink,
  FileText,
  Info,
  Lock,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { APPOINTMENT_HREF } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { AppointmentCta } from "@/components/sections/appointment-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = pageMetadata({
  title: "Patient Information",
  description:
    "Prepare for your visit to Evercrest Dental Practice in Delaware: what to bring, new patient guidance, questions to ask your dentist, insurance and payment information, and patient forms.",
  path: "/patient-information",
});

const sections = [
  { id: "new-patients", label: "New patient preparation" },
  { id: "what-to-bring", label: "What to bring" },
  { id: "appointment-guidance", label: "Appointment guidance" },
  { id: "questions", label: "Questions to ask your dentist" },
  { id: "insurance-payment", label: "Insurance and payment" },
  { id: "patient-forms", label: "Patient forms" },
  { id: "cancellation", label: "Cancellation and rescheduling" },
];

function InfoSection({ id, icon, title, children }: { id: string; icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="border-b border-line pb-14 last:border-0 last:pb-0">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700" aria-hidden="true">
          {icon}
        </span>
        <h2 id={`${id}-heading`} className="text-2xl font-bold sm:text-[1.75rem]">
          {title}
        </h2>
      </div>
      <div className="mt-6 text-[1.0625rem] leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 rounded-xl border border-line bg-white p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
          <span className="text-ink">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 flex gap-3 rounded-xl border border-teal-200 bg-teal-50/60 p-5 text-[0.95rem] text-ink">
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}

export default function PatientInformationPage() {
  const { insurance, policies, practiceManagement, contact } = siteConfig;

  return (
    <>
      <PageHero
        eyebrow="Patient Information"
        title="Everything You Need for a Smooth Visit"
        description="Whether you are a new or returning patient, this guide will help you prepare for your appointment and know what to expect."
        image="consultation"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Patient Information" }]}
      >
        <ButtonLink href={APPOINTMENT_HREF}>Request an Appointment</ButtonLink>
      </PageHero>

      <div className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <nav aria-label="On this page" className="lg:sticky lg:top-28">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">On this page</h2>
                <ul className="mt-4 space-y-1 border-l border-line">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[0.95rem] text-ink hover:border-teal-500 hover:text-navy-900">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="space-y-14 lg:col-span-9">
              <InfoSection id="new-patients" icon={<UserRound className="h-6 w-6" />} title="New patient preparation">
                <p>
                  Welcome! Your first visit helps us understand your oral health, your history, and what you would like
                  to achieve. A little preparation helps your appointment go smoothly.
                </p>
                <CheckList
                  items={[
                    "Request an appointment online or contact the office",
                    "Plan to arrive a little early to complete any check-in steps",
                    "Gather your medical and dental history, including past treatment",
                    "Write down any questions or concerns you would like to discuss",
                    "If you have dental insurance, have your plan details ready",
                    "Let us know about any needs that would make your visit more comfortable",
                  ]}
                />
                <p className="mt-6">
                  During your visit, your dental professional will review your medical and dental history, examine your
                  teeth and gums, and talk with you about any findings and recommended next steps. You are always
                  welcome to ask questions.
                </p>
              </InfoSection>

              <InfoSection id="what-to-bring" icon={<ClipboardList className="h-6 w-6" />} title="What to bring">
                <CheckList
                  items={[
                    "A government-issued photo ID",
                    "Your dental insurance card, if applicable",
                    "A list of current medications, including dosages",
                    "Information about allergies and medical conditions",
                    "Recent dental X-rays or records, if you have them",
                    "Contact details for your physician or previous dentist, if relevant",
                    "Completed patient forms, once available",
                    "For minors: a parent or legal guardian, as required",
                  ]}
                />
              </InfoSection>

              <InfoSection id="appointment-guidance" icon={<CalendarClock className="h-6 w-6" />} title="General appointment guidance">
                <ul className="mt-2 list-disc space-y-3 pl-5">
                  <li>
                    <strong className="text-ink">Appointment requests are not confirmed bookings.</strong> After you
                    submit a request, our team will contact you to confirm a date and time.
                  </li>
                  <li>Please let us know about changes to your health or medications since your last visit.</li>
                  <li>
                    If you feel anxious about dental visits, tell us. We will explain each step and you can ask to pause
                    at any time.
                  </li>
                  <li>
                    {policies.lateArrival ?? "If you are running late, please contact the office as soon as possible."}
                  </li>
                </ul>
                <Notice>
                  <strong>If you have a dental or medical emergency</strong>, such as facial swelling, trauma, uncontrolled
                  bleeding, or difficulty breathing or swallowing, call 911 or go to the nearest emergency room. Do not
                  use the online appointment request form for urgent concerns.
                </Notice>
              </InfoSection>

              <InfoSection id="questions" icon={<CircleHelp className="h-6 w-6" />} title="Questions to ask your dentist">
                <p>Being informed helps you make confident decisions. Here are some questions you may find useful:</p>
                <ul className="mt-5 space-y-3">
                  {[
                    "What is the current condition of my teeth and gums?",
                    "What are my treatment options, and what are the benefits and risks of each?",
                    "What happens if I wait or choose not to have treatment?",
                    "How many visits will treatment take, and what should I expect afterward?",
                    "What will this cost, and what might my insurance cover?",
                    "How often should I schedule check-ups and cleanings?",
                    "Is there anything I should change in my daily oral care routine?",
                  ].map((q) => (
                    <li key={q} className="flex gap-3 rounded-xl bg-mist px-5 py-3.5 text-ink">
                      <span aria-hidden="true" className="font-display font-bold text-teal-600">
                        Q
                      </span>
                      {q}
                    </li>
                  ))}
                </ul>
              </InfoSection>

              <InfoSection id="insurance-payment" icon={<CreditCard className="h-6 w-6" />} title="Insurance and payment">
                <p>
                  We want you to understand the cost of your care before treatment begins. Our team can discuss estimated
                  costs with you and help you understand your options.
                </p>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl border border-line p-6">
                    <h3 className="text-lg font-bold">Dental insurance</h3>
                    {insurance.acceptsInsurance && (
                      <p className="mt-3 flex gap-2 font-medium text-ink">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                        We accept dental insurance.
                      </p>
                    )}
                    {insurance.acceptedPlans.length > 0 && (
                      <ul className="mt-3 list-disc space-y-1 pl-5">
                        {insurance.acceptedPlans.map((plan) => (
                          <li key={plan}>{plan}</li>
                        ))}
                      </ul>
                    )}
                    <p className="mt-3 text-[0.95rem]">
                      Please contact the office before your appointment so we can help verify your coverage.
                    </p>
                    <p className="mt-4 text-[0.95rem]">
                      Coverage varies by plan. We recommend checking your benefits with your insurance provider.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-line p-6">
                    <h3 className="text-lg font-bold">Payment options</h3>
                    {insurance.paymentMethods.length > 0 ? (
                      <ul className="mt-3 list-disc space-y-1 pl-5">
                        {insurance.paymentMethods.map((method) => (
                          <li key={method}>{method}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3">
                        Our team will review your estimated costs and the payment options available to you before
                        treatment begins.
                      </p>
                    )}
                    {insurance.financingNote && <p className="mt-4 text-[0.95rem]">{insurance.financingNote}</p>}
                  </div>
                </div>
              </InfoSection>

              <InfoSection id="patient-forms" icon={<FileText className="h-6 w-6" />} title="Patient forms">
                {practiceManagement.patientFormsUrl ? (
                  <>
                    <p>
                      You can complete your patient forms online before your visit using our secure patient forms
                      portal. This can help save time when you arrive.
                    </p>
                    <ButtonLink href={practiceManagement.patientFormsUrl} target="_blank" rel="noopener noreferrer" variant="secondary" className="mt-6">
                      Complete Patient Forms
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </ButtonLink>
                  </>
                ) : (
                  <p>
                    New patients are typically asked to complete registration, medical history, and consent forms. Our
                    team will let you know how to complete your forms when your appointment is confirmed.
                  </p>
                )}
                <div className="mt-6 flex gap-3 rounded-xl bg-mist p-5 text-[0.95rem]">
                  <Lock className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" aria-hidden="true" />
                  <p>
                    <strong className="text-ink">Please protect your health information.</strong> Do not send medical
                    histories, insurance numbers, or other sensitive details through the website&apos;s appointment
                    request form or by regular email.
                  </p>
                </div>
              </InfoSection>

              <InfoSection id="cancellation" icon={<CalendarX2 className="h-6 w-6" />} title="Cancellation and rescheduling">
                <p>
                  If you need to cancel or reschedule, please let us know as early as possible so we can offer your time
                  to another patient.
                </p>
                {policies.cancellation && (
                  <div className="mt-6 rounded-2xl border border-line p-6">
                    <h3 className="text-lg font-bold">Our policy</h3>
                    <p className="mt-3">{policies.cancellation}</p>
                  </div>
                )}
                <p className="mt-6">
                  To cancel or reschedule,{" "}
                  {contact.phone ? (
                    <>
                      call us at{" "}
                      <a href={`tel:${contact.phoneHref ?? contact.phone}`} className="font-semibold text-teal-700 underline underline-offset-4">
                        {contact.phone}
                      </a>
                      .
                    </>
                  ) : (
                    <>
                      please{" "}
                      <Link href="/contact" className="font-semibold text-teal-700 underline underline-offset-4">
                        contact the office
                      </Link>
                      .
                    </>
                  )}
                </p>
              </InfoSection>
            </div>
          </div>
        </Container>
      </div>

      <AppointmentCta />
    </>
  );
}
