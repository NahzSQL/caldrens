"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/config/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 transition-shadow duration-300 ${
        scrolled || open ? "border-line shadow-[0_6px_24px_-18px_rgb(7_54_106/0.45)]" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Link
          href="/"
          className="rounded-md"
          aria-label={`${siteConfig.name} home`}
        >
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-md px-3.5 py-2 text-[0.9375rem] font-medium transition-colors ${
                      active ? "text-navy" : "text-slate hover:text-navy"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-teal transition-transform duration-300 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Link
            href={siteConfig.contactHref}
            className="inline-flex items-center rounded-lg bg-teal px-5 py-2.5 text-[0.9375rem] font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
          >
            Discuss Your Needs
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-navy transition-colors hover:bg-mist md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-white md:hidden"
      >
        <nav aria-label="Mobile" className="container-page py-4">
          <ul className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-3 text-base font-medium ${
                      active ? "bg-teal-50 text-navy" : "text-charcoal hover:bg-mist"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={siteConfig.contactHref}
            onClick={() => setOpen(false)}
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-teal px-5 py-3 text-base font-semibold text-white hover:bg-teal-700"
          >
            Discuss Your Needs
          </Link>
        </nav>
      </div>
    </header>
  );
}
