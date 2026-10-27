import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/Logo";
import { CurrentYear } from "@/components/CurrentYear";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white/80">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link href="/" className="inline-block rounded-md" aria-label={`${siteConfig.name} home`}>
            <Logo variant="light" />
          </Link>
          <p className="mt-5 max-w-sm font-display text-lg font-semibold text-white">
            {siteConfig.tagline}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
            Navigation
          </h2>
          <ul className="mt-4 space-y-3">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-sm transition-colors hover:text-white hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
            Contact
          </h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-start gap-2.5 rounded-sm break-all transition-colors hover:text-white hover:underline hover:underline-offset-4"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                {siteConfig.email}
              </a>
            </li>
            {siteConfig.phone && (
              <li>
                <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`} className="hover:text-white">
                  {siteConfig.phone}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-8 text-sm text-white/65 md:flex-row md:items-start md:justify-between md:gap-10">
          <p className="shrink-0">
            © <CurrentYear /> {siteConfig.name}. All rights reserved.
          </p>
          <p className="max-w-2xl md:text-right">
            {siteConfig.name} offers administrative and operational support services and does not
            provide insurance coverage or medical advice. All services are subject to the
            company&apos;s actual operating scope and applicable federal and state laws.
          </p>
        </div>
      </div>
    </footer>
  );
}
