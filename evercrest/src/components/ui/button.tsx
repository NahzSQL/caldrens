import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "light" | "outline-light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-600 text-white shadow-[0_8px_20px_-8px_rgb(168_83_42/0.6)] hover:bg-accent-700 hover:-translate-y-0.5",
  secondary: "bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-0.5",
  outline:
    "border border-navy-200 bg-white text-navy-900 hover:border-navy-400 hover:bg-navy-50",
  ghost: "text-teal-700 hover:text-teal-800 hover:bg-teal-50",
  light: "bg-white text-navy-900 hover:bg-navy-50 hover:-translate-y-0.5",
  "outline-light":
    "border border-white/40 text-white hover:bg-white/10 hover:border-white/70",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
