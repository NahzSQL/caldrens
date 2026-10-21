import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em]",
            tone === "light" ? "text-teal-200" : "text-teal-700",
          )}
        >
          <span aria-hidden="true" className={cn("h-px w-6", tone === "light" ? "bg-teal-300" : "bg-teal-500")} />
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          "text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[2.75rem]",
          tone === "light" && "text-white",
        )}
      >
        {title}
      </Heading>
      {description && (
        <div className={cn("mt-5 text-lg leading-relaxed", tone === "light" ? "text-navy-100" : "text-muted")}>
          {description}
        </div>
      )}
    </div>
  );
}
