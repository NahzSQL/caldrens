import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container py-28 text-center sm:py-36">
      <p className="eyebrow justify-center">Page not found</p>
      <h1 className="mt-5 text-4xl sm:text-5xl">This page could not be found.</h1>
      <p className="mx-auto mt-6 max-w-lg text-lg text-navy-700">
        The address may have changed. You can return to the home page or get in touch with JurisPoint directly.
      </p>
      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
        <Link href="/" className="btn-primary">Return home</Link>
        <Link href="/contact" className="btn-outline">Contact JurisPoint</Link>
      </div>
    </section>
  );
}
