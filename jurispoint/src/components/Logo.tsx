import Link from "next/link";

type Props = { variant?: "dark" | "light"; className?: string };

/** JurisPoint wordmark: a fine gold "point" mark beside the serif name. */
export function Logo({ variant = "dark", className = "" }: Props) {
  const text = variant === "dark" ? "text-navy-900" : "text-white";
  return (
    <Link href="/" aria-label="JurisPoint home" className={`group inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 40 40" aria-hidden="true" className="h-9 w-9 shrink-0">
        <rect x="1" y="1" width="38" height="38" rx="2" fill="none" stroke="#B38F4D" strokeWidth="1.5" />
        <path d="M20 9v22M13 31h14M10 14h20" stroke="#B38F4D" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M13 14l-4 8h8zM27 14l-4 8h8z" fill="none" stroke="#B38F4D" strokeWidth="1.3" strokeLinejoin="round" />
        <circle cx="20" cy="9" r="1.8" fill="#B38F4D" />
      </svg>
      <span className={`font-serif text-[1.45rem] font-semibold leading-none tracking-tight ${text}`}>
        Juris<span className="text-gold-500">Point</span>
      </span>
    </Link>
  );
}
