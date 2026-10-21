import { cn } from "@/lib/utils";

/**
 * Shown wherever a practice detail has not been verified yet.
 * Fill in src/config/site.ts to replace it.
 */
export function ToBeConfirmed({
  label,
  className,
  tone = "dark",
}: {
  label: string;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-dashed px-2 py-0.5 text-[0.85em] italic",
        tone === "light" ? "border-white/30 text-navy-200" : "border-navy-200 bg-navy-50/60 text-muted",
        className,
      )}
    >
      {label} to be confirmed
    </span>
  );
}
