"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { consultationHref, nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open
          ? "border-navy-900/10 bg-ivory/95 shadow-[0_6px_24px_-16px_rgba(10,23,43,0.35)] backdrop-blur"
          : "border-transparent bg-ivory"
      }`}
    >
      <div className="container flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative py-2 text-[0.94rem] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold-500 after:transition-transform after:duration-300 ${
                isActive(item.href)
                  ? "text-navy-900 after:scale-x-100"
                  : "text-navy-700/80 after:scale-x-0 hover:text-navy-900 hover:after:scale-x-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={site.phoneHref} className="flex items-center gap-2 text-sm font-medium text-navy-800 hover:text-gold-600">
            <Phone className="h-4 w-4 text-gold-500" aria-hidden="true" />
            {site.phoneDisplay}
          </a>
          <Link href={consultationHref} className="btn-primary py-3">
            Book a Consultation
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-sm text-navy-900 hover:bg-navy-900/5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-5rem)] overflow-y-auto border-t border-navy-900/10 bg-ivory lg:hidden"
      >
        <nav aria-label="Mobile" className="container flex flex-col py-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
              className={`border-b border-navy-900/10 py-4 font-serif text-2xl ${
                isActive(item.href) ? "text-gold-600" : "text-navy-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href={consultationHref} onClick={() => setOpen(false)} className="btn-primary mt-8 w-full">
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Book a Consultation
          </Link>
          <div className="mt-8 space-y-3 text-sm text-navy-700">
            <a href={site.phoneHref} className="block hover:text-gold-600">{site.phoneDisplay}</a>
            <a href={site.emailHref} className="block break-all hover:text-gold-600">{site.email}</a>
            <p>{site.location}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
