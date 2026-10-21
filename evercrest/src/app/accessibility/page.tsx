import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { SimplePageHero } from "@/components/sections/simple-page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = pageMetadata({
  title: "Accessibility",
  description: "Evercrest Dental Practice is committed to making its website accessible to everyone.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  const { contact } = siteConfig;
  return (
    <>
      <SimplePageHero
        title="Accessibility Statement"
        description="We want everyone to be able to use our website and access our services."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Accessibility" }]}
      />
      <Container className="py-16 sm:py-20">
        <article className="prose-evercrest mx-auto max-w-3xl">
          <h2>Our commitment</h2>
          <p>
            {siteConfig.name} is committed to providing a website that is accessible to the widest possible audience,
            including people with disabilities. We aim to follow the Web Content Accessibility Guidelines (WCAG) 2.1,
            Level AA, and we continue to review and improve the site.
          </p>

          <h2>What we do</h2>
          <ul>
            <li>Use semantic page structure, headings, and landmarks for screen reader navigation</li>
            <li>Provide text alternatives for meaningful images</li>
            <li>Support full keyboard navigation with visible focus indicators</li>
            <li>Maintain sufficient color contrast for text and controls</li>
            <li>Label every form field and describe errors clearly</li>
            <li>Respect reduced-motion settings in your device preferences</li>
            <li>Design layouts that work on phones, tablets, and desktop computers, and when zoomed</li>
          </ul>

          <h2>Need help or have feedback?</h2>
          <p>
            If you have difficulty using any part of this website, or need information in a different format, please let
            us know and we will do our best to help.{" "}
            {contact.phone || contact.email ? (
              <>
                You can reach us
                {contact.phone ? <> by phone at <a href={`tel:${contact.phoneHref ?? contact.phone}`}>{contact.phone}</a></> : null}
                {contact.phone && contact.email ? " or" : null}
                {contact.email ? <> by email at <a href={`mailto:${contact.email}`}>{contact.email}</a></> : null}.
              </>
            ) : (
              <>
                Please use the details on our <Link href="/contact">Contact page</Link>.
              </>
            )}
          </p>
          <p>When you contact us, it helps to include the page address and a description of the problem.</p>

          <h2>Visiting the practice</h2>
          <p>
            If you have accessibility needs for your visit, please tell us when you request your appointment so we can
            help make your visit as comfortable as possible.
          </p>
        </article>
      </Container>
    </>
  );
}
