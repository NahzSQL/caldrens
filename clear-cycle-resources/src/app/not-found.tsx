import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-page max-w-2xl text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl">We couldn&apos;t find that page</h1>
        <p className="mt-5 text-lg text-slate">
          The page you are looking for doesn&apos;t exist. Use the links below to continue.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" withArrow>
            Go to Home
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            View Services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
