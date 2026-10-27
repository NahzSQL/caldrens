import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline-light" | "ghost-light";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-teal text-white shadow-sm hover:bg-teal-700",
  secondary:
    "bg-white text-navy ring-1 ring-inset ring-line hover:bg-mist hover:ring-navy/20",
  "outline-light":
    "bg-transparent text-white ring-1 ring-inset ring-white/40 hover:bg-white/10 hover:ring-white/70",
  "ghost-light":
    "bg-white text-navy hover:bg-teal-50",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  withArrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  withArrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-base font-semibold transition-all duration-200 ${buttonStyles[variant]} ${className}`}
    >
      {children}
      {withArrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  id?: string;
  light?: boolean;
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className={`eyebrow ${light ? "eyebrow-light" : ""} ${centered ? "justify-center" : ""}`}>
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`mt-4 text-3xl font-bold leading-tight sm:text-4xl ${light ? "!text-white" : ""}`}
      >
        {title}
      </h2>
      {intro && (
        <div className={`mt-5 text-lg leading-relaxed ${light ? "text-white/80" : "text-slate"}`}>
          {intro}
        </div>
      )}
    </div>
  );
}

export type IconType = LucideIcon;

export function IconBadge({ icon: Icon, tone = "teal" }: { icon: IconType; tone?: "teal" | "navy" }) {
  return (
    <span
      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${
        tone === "teal" ? "bg-teal-50 text-teal-700" : "bg-navy-50 text-navy"
      }`}
    >
      <Icon className="h-6 w-6" aria-hidden="true" />
    </span>
  );
}

export function FeatureCard({
  icon,
  title,
  children,
}: {
  icon: IconType;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="group h-full rounded-2xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-card-hover">
      <IconBadge icon={icon} />
      <h3 className="mt-6 text-xl font-bold">{title}</h3>
      <p className="mt-3 leading-relaxed text-slate">{children}</p>
    </article>
  );
}

/** Closing call-to-action band used at the bottom of each page */
export function CtaBand({
  title,
  text,
  buttonLabel,
  href,
}: {
  title: string;
  text: string;
  buttonLabel: string;
  href: string;
}) {
  return (
    <section aria-labelledby="cta-heading" className="py-20 sm:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-14 text-center sm:px-12 sm:py-16">
          <div aria-hidden="true" className="bg-grid absolute inset-0" />
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[28px] border-teal/20"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full border-[28px] border-white/5"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="cta-heading" className="text-3xl font-bold !text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">{text}</p>
            <div className="mt-9">
              <ButtonLink href={href} withArrow>
                {buttonLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
