import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { SimplePageHero } from "@/components/sections/simple-page-hero";
import { Container } from "@/components/ui/container";
import { ToBeConfirmed } from "@/components/ui/to-be-confirmed";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How the Evercrest Dental Practice website handles the information you share with us.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const { contact } = siteConfig;
  return (
    <>
      <SimplePageHero
        title="Privacy Policy"
        description="How this website handles the information you share with us."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />
      <Container className="py-16 sm:py-20">
        <article className="prose-evercrest mx-auto max-w-3xl">
          <p className="rounded-xl border border-dashed border-navy-200 bg-navy-50/60 p-4 text-sm not-italic">
            <strong>Effective date:</strong> <ToBeConfirmed label="Effective date" />. This policy describes the
            practice&apos;s website only. It should be reviewed by the practice and its legal advisor before launch.
          </p>

          <h2>Overview</h2>
          <p>
            {siteConfig.name} (&quot;Evercrest,&quot; &quot;we,&quot; or &quot;us&quot;) respects your privacy. This
            policy explains what information this website collects, how it is used, and the choices available to you.
            It applies to this website only. How we handle your health information as a patient is described in our
            Notice of Privacy Practices, which is available from the practice.
          </p>

          <h2>Information you provide</h2>
          <p>When you submit an appointment request, we ask for:</p>
          <ul>
            <li>The patient&apos;s name</li>
            <li>Your preferred contact method and your phone number and/or email address</li>
            <li>Your preferred appointment date and time of day</li>
            <li>A general reason for your visit, selected from a list</li>
            <li>An optional message for scheduling notes</li>
          </ul>
          <p>
            We use this information only to respond to your request and to schedule your appointment. Please do not
            include medical histories, insurance numbers, or other sensitive health information in the form or in
            emails to the practice.
          </p>

          <h2>Information collected automatically</h2>
          <p>
            This website does not use advertising cookies, analytics tracking, or third-party marketing tools. Like
            most websites, our hosting provider may keep standard technical logs (such as IP addresses, browser type,
            and pages requested) to operate and secure the website.
          </p>
          <p>
            Some pages display photographs served by a third-party image service. When these images load, that service
            receives standard technical information, such as your IP address, from your browser.
          </p>

          <h2>How we share information</h2>
          <p>
            We do not sell your personal information. We share information only with service providers who help us
            operate the website and deliver your request to the practice, or when required by law.
          </p>

          <h2>How we protect information</h2>
          <p>
            We use reasonable safeguards to protect information submitted through this website, including encrypted
            (HTTPS) connections. No method of transmission over the internet is completely secure, which is why we ask
            you not to submit sensitive health information through the website.
          </p>

          <h2>Children&apos;s privacy</h2>
          <p>
            This website is intended for adults. Appointment requests for minors should be submitted by a parent or
            legal guardian.
          </p>

          <h2>Your choices</h2>
          <p>
            You may contact us to ask about, correct, or request deletion of the information you submitted through this
            website, subject to any records we are required to keep.
          </p>

          <h2>Contact us</h2>
          <p>
            If you have questions about this policy, please{" "}
            {contact.email ? (
              <a href={`mailto:${contact.email}`}>email {contact.email}</a>
            ) : (
              <Link href="/contact">contact the practice</Link>
            )}
            {contact.phone ? <> or call {contact.phone}</> : null}.
          </p>

          <h2>Changes to this policy</h2>
          <p>We may update this policy from time to time. The effective date above shows when it was last revised.</p>
        </article>
      </Container>
    </>
  );
}
