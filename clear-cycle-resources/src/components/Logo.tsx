type LogoMarkProps = {
  className?: string;
  /** "color" for light backgrounds, "light" for dark backgrounds */
  variant?: "color" | "light";
};

/**
 * Clear Cycle Resources symbol: a continuous cycle broken into three arcs,
 * joined by three connection nodes, around a subtle care cross.
 */
export function LogoMark({ className, variant = "color" }: LogoMarkProps) {
  const ring = variant === "light" ? "#FFFFFF" : "#07366A";
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke={ring} strokeWidth="4" strokeLinecap="round">
        <path d="M30.37 8.24A17 17 0 0 1 40.83 26.37" />
        <path d="M34.47 37.4A17 17 0 0 1 13.53 37.4" />
        <path d="M7.17 26.37A17 17 0 0 1 17.63 8.24" />
      </g>
      <g fill="#00A88F">
        <circle cx="24" cy="7" r="4.25" />
        <circle cx="38.72" cy="32.5" r="4.25" />
        <circle cx="9.28" cy="32.5" r="4.25" />
        <rect x="21.75" y="17" width="4.5" height="14" rx="1.6" />
        <rect x="17" y="21.75" width="14" height="4.5" rx="1.6" />
      </g>
    </svg>
  );
}

type LogoProps = {
  variant?: "color" | "light";
  className?: string;
};

export function Logo({ variant = "color", className = "" }: LogoProps) {
  const isLight = variant === "light";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark variant={variant} className="h-10 w-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.0625rem] font-extrabold tracking-tight ${
            isLight ? "text-white" : "text-navy"
          }`}
        >
          Clear Cycle
        </span>
        <span
          className={`mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.28em] ${
            isLight ? "text-[#7fe0d0]" : "text-teal-700"
          }`}
        >
          Resources
        </span>
      </span>
    </span>
  );
}
