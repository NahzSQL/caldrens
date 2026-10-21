"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useState } from "react";
import { CalendarCheck, ChevronRight, Menu, X } from "lucide-react";
import { APPOINTMENT_HREF, isActivePath, mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy-900 transition-colors hover:bg-mist lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-navy-950/40 backdrop-blur-sm data-[state=open]:animate-[fade-up_0.2s_ease-out] lg:hidden" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl focus:outline-none lg:hidden">
          <div className="flex h-20 items-center justify-between border-b border-line px-5">
            <Link href="/" onClick={close}>
              <Logo />
            </Link>
            <Dialog.Close
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy-900 hover:bg-mist"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Site menu</Dialog.Title>
          <Dialog.Description className="sr-only">Navigate to a page on the Evercrest website.</Dialog.Description>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="space-y-1">
              {mainNav.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-medium transition-colors",
                        active ? "bg-teal-50 text-navy-900" : "text-ink hover:bg-mist",
                      )}
                    >
                      {item.label}
                      <ChevronRight className={cn("h-5 w-5", active ? "text-teal-600" : "text-navy-300")} aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="border-t border-line p-5">
            <ButtonLink href={APPOINTMENT_HREF} onClick={close} className="w-full">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Request an Appointment
            </ButtonLink>
            <p className="mt-4 text-center text-sm text-muted">{siteConfig.tagline}</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
