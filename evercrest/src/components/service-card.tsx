import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/config/services";
import { Photo } from "@/components/ui/photo";
import { ServiceIcon } from "./service-icon";

/** Card linking to a service detail page. The whole card is clickable via the stretched link. */
export function ServiceCard({ service, headingLevel = "h3" }: { service: Service; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-within:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Photo
          image={service.image}
          sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 100vw"
          imgClassName="transition-transform duration-700 group-hover:scale-105"
          decorative
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/30 to-transparent" />
      </div>
      <div className="relative flex flex-1 flex-col px-6 pb-6 pt-10">
        <span className="absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-teal-700 shadow-soft ring-1 ring-line">
          <ServiceIcon name={service.icon} className="h-6 w-6" />
        </span>
        <Heading className="text-lg font-bold leading-snug">
          <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {service.name}
          </Link>
        </Heading>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{service.summary}</p>
        <span aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 transition-colors group-hover:text-teal-800">
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
      {/* Visible focus ring for the stretched link */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl ring-teal-500 ring-offset-2 group-has-[a:focus-visible]:ring-[3px]" />
    </article>
  );
}
