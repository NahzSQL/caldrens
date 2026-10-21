import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/ui/logo";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist to-white">
      <LogoMark className="pointer-events-none absolute -right-20 top-10 h-[420px] w-auto text-navy-900/[0.03]" />
      <Container className="relative py-24 text-center sm:py-32">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">Error 404</p>
        <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-bold sm:text-5xl">We couldn&apos;t find that page</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
          The page you are looking for may have moved or no longer exists. Here are some helpful places to start.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">
            <Home className="h-4 w-4" aria-hidden="true" />
            Return Home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact Us
          </ButtonLink>
        </div>
        <nav aria-label="Popular pages" className="mx-auto mt-14 max-w-md">
          <ul className="divide-y divide-line rounded-2xl border border-line bg-white text-left shadow-soft">
            {mainNav
              .filter((item) => item.href !== "/")
              .map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex items-center justify-between px-5 py-4 font-medium text-navy-900 hover:bg-mist">
                    {item.label}
                    <ArrowRight className="h-4 w-4 text-teal-600" aria-hidden="true" />
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
