import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { consultationHref, disclaimer, nav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-navy-950 text-navy-100">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:gap-16">
        <div>
          <Logo variant="light" />
          <p className="mt-5 font-serif text-lg italic text-gold-300">{site.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-200">
            Clear, practical legal guidance for individuals and businesses, offered from {site.location}.
          </p>
        </div>

        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Pages</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-navy-100 transition-colors hover:text-white hover:underline underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={consultationHref} className="text-navy-100 transition-colors hover:text-white hover:underline underline-offset-4">
                Book a Consultation
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Contact</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={site.phoneHref} className="flex items-start gap-3 hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="flex items-start gap-3 break-all hover:text-white">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
              {site.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-8">
          <p className="max-w-4xl text-xs leading-relaxed text-navy-300">
            <strong className="font-semibold text-navy-200">Disclaimer.</strong> {disclaimer}
          </p>
          <p className="mt-5 text-xs text-navy-300">
            &copy; {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
