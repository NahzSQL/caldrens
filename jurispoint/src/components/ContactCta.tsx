import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";

type Props = { title: string; text: string; buttonLabel: string; href: string };

/** Closing call-to-action band shared by the Home and Services pages. */
export function ContactCta({ title, text, buttonLabel, href }: Props) {
  return (
    <section className="bg-ivory py-20 sm:py-24" aria-labelledby="cta-title">
      <div className="container">
        <div className="on-dark pattern-lines relative overflow-hidden rounded-sm bg-navy-900 px-6 py-14 text-center shadow-lift sm:px-12 lg:py-20">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" aria-hidden="true" />
          <h2 id="cta-title" className="mx-auto max-w-3xl text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">{text}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={href} className="btn-gold">
              {buttonLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={site.phoneHref} className="btn-outline-light">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phoneDisplay}
            </a>
          </div>
          <a href={site.emailHref} className="mt-8 inline-flex items-center gap-2 break-all text-sm text-navy-200 hover:text-white">
            <Mail className="h-4 w-4 text-gold-400" aria-hidden="true" />
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
