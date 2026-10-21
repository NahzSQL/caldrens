import { cn } from "@/lib/utils";

/** The Evercrest crest: a shield framing a rising arc. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 44" fill="none" aria-hidden="true" className={className}>
      <path
        d="M20 2.5 4.5 8.2v12.6c0 9.6 6.4 17.4 15.5 20.7 9.1-3.3 15.5-11.1 15.5-20.7V8.2L20 2.5Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 22.5c2.6 3.6 5.4 5.3 8.5 5.3s5.9-1.7 8.5-5.3"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M14 14.5h12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl",
          tone === "dark" ? "bg-navy-900 text-teal-300" : "bg-white/10 text-teal-200 ring-1 ring-white/15",
        )}
      >
        <LogoMark className="h-7 w-7" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.35rem] font-bold tracking-tight",
            tone === "dark" ? "text-navy-900" : "text-white",
          )}
        >
          Evercrest
        </span>
        <span
          className={cn(
            "mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em]",
            tone === "dark" ? "text-teal-700" : "text-teal-200",
          )}
        >
          Dental Practice
        </span>
      </span>
    </span>
  );
}
