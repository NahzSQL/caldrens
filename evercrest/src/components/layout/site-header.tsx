"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";
import { APPOINTMENT_HREF, isActivePath, mainNav } from "@/config/navigation";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md transition-shadow duration-300 supports-[backdrop-filter]:bg-white/80",
        scrolled ? "border-line shadow-[0_6px_24px_-12px_rgb(18_36_63/0.18)]" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors",
                      active ? "text-navy-900" : "text-muted hover:text-navy-900 hover:bg-mist",
                    )}
                  >
                    {item.label}
                    {active && (
                      <span aria-hidden="true" className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-teal-500" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ButtonLink href={APPOINTMENT_HREF} size="sm" className="lg:h-11 lg:px-5">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Request an Appointment
            </ButtonLink>
          </div>
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
