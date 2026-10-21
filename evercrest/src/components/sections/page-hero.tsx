import type { ReactNode } from "react";
import type { ImageKey } from "@/config/images";
import { Container } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: ReactNode;
  image: ImageKey;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
}

/** Banner at the top of inner pages: navy panel with a photo. */
export function PageHero({ eyebrow, title, description, image, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
        <Photo image={image} sizes="46vw" priority decorative />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/40 to-transparent" />
      </div>
      <div aria-hidden="true" className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl">
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-teal-200">{eyebrow}</p>
          <h1 className="text-4xl font-bold leading-[1.1] text-white sm:text-5xl">{title}</h1>
          <div className="mt-6 text-lg leading-relaxed text-navy-100">{description}</div>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
