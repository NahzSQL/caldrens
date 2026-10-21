import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

interface SectionProps {
  id?: string;
  className?: string;
  tone?: "white" | "mist" | "navy";
  labelledBy?: string;
  children: ReactNode;
}

const tones = {
  white: "bg-white",
  mist: "bg-mist",
  navy: "bg-navy-900 text-white",
};

export function Section({ id, className, tone = "white", labelledBy, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-20 sm:py-24 lg:py-28", tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}
