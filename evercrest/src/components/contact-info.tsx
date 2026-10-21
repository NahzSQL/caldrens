import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { formatHours, hasAnyOfficeHours, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type Tone = "dark" | "light";

function Row({ icon, label, tone, children }: { icon: ReactNode; label: string; tone: Tone; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span
        className={cn(
          "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
          tone === "dark" ? "bg-teal-50 text-teal-700" : "bg-white/10 text-teal-200",
        )}
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className={cn("text-sm font-semibold", tone === "dark" ? "text-navy-900" : "text-white")}>{label}</p>
        <div className={cn("mt-1 leading-relaxed", tone === "dark" ? "text-muted" : "text-navy-100")}>{children}</div>
      </div>
    </li>
  );
}

/** Location, plus phone and email when they are set in src/config/site.ts. */
export function ContactDetails({ tone = "dark", className }: { tone?: Tone; className?: string }) {
  const { location, contact, name } = siteConfig;
  const linkClass = cn(
    "font-medium underline-offset-4 hover:underline",
    tone === "dark" ? "text-navy-900" : "text-white",
  );

  return (
    <ul className={cn("space-y-6", className)}>
      <Row icon={<MapPin className="h-5 w-5" />} label="Location" tone={tone}>
        <address className="not-italic">
          <span className="block">{name}</span>
          {location.streetAddress && <span className="block">{location.streetAddress}</span>}
          {location.addressLine2 && <span className="block">{location.addressLine2}</span>}
          <span className="block">
            {[location.city, [location.state, location.postalCode].filter(Boolean).join(" ")].filter(Boolean).join(", ")}
            {", USA"}
          </span>
        </address>
        {location.mapLink && (
          <a href={location.mapLink} target="_blank" rel="noopener noreferrer" className={cn("mt-2 inline-block text-sm", linkClass)}>
            Get directions<span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </Row>
      {contact.phone && (
        <Row icon={<Phone className="h-5 w-5" />} label="Telephone" tone={tone}>
          <a href={`tel:${contact.phoneHref ?? contact.phone}`} className={linkClass}>
            {contact.phone}
          </a>
        </Row>
      )}
      {contact.email && (
        <Row icon={<Mail className="h-5 w-5" />} label="Email" tone={tone}>
          <a href={`mailto:${contact.email}`} className={cn(linkClass, "break-all")}>
            {contact.email}
          </a>
        </Row>
      )}
    </ul>
  );
}

/** Weekly office hours, read from src/config/site.ts. Renders nothing if no hours are set. */
export function OfficeHours({ tone = "dark", className, compact }: { tone?: Tone; className?: string; compact?: boolean }) {
  if (!hasAnyOfficeHours()) return null;

  return (
    <div className={className}>
      <div className={cn("flex items-center gap-2 font-semibold", tone === "dark" ? "text-navy-900" : "text-white")}>
        <Clock className={cn("h-5 w-5", tone === "dark" ? "text-teal-700" : "text-teal-200")} aria-hidden="true" />
        Office Hours
      </div>
      <dl className={cn("mt-4 divide-y", tone === "dark" ? "divide-line" : "divide-white/10", compact ? "text-sm" : "")}>
        {siteConfig.officeHours.map((entry) => (
          <div key={entry.day} className="flex justify-between gap-4 py-2">
            <dt className={tone === "dark" ? "text-ink" : "text-navy-100"}>{entry.day}</dt>
            <dd className={tone === "dark" ? "text-muted" : "text-navy-200"}>{formatHours(entry)}</dd>
          </div>
        ))}
      </dl>
      {siteConfig.officeHoursNote && (
        <p className={cn("mt-3 text-sm", tone === "dark" ? "text-muted" : "text-navy-200")}>{siteConfig.officeHoursNote}</p>
      )}
    </div>
  );
}
