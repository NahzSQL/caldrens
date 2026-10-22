"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Darken the photo slightly so it sits comfortably with the navy palette. */
  tint?: boolean;
};

/**
 * Fills its (relatively positioned) parent with a photo. The parent always shows a
 * navy backdrop with a fine pattern, so the design still holds if a photo fails to load.
 */
export function Photo({ src, alt, sizes, priority, className = "", tint = true }: Props) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`absolute inset-0 overflow-hidden bg-navy-800 ${className}`}>
      <div className="pattern-lines absolute inset-0" aria-hidden="true" />
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-1/3 max-h-48 w-1/3 max-w-48 -translate-x-1/2 -translate-y-1/2 opacity-25"
      >
        <path d="M20 7v26M12 33h16M8 13h24" stroke="#C9AB6E" strokeWidth="0.9" strokeLinecap="round" fill="none" />
        <path d="M12 13l-4.5 9h9zM28 13l-4.5 9h9z" fill="none" stroke="#C9AB6E" strokeWidth="0.7" strokeLinejoin="round" />
        <circle cx="20" cy="7" r="1.3" fill="#C9AB6E" />
      </svg>
      {!failed && (
        <Image
          src={`${src}?auto=format&fit=crop&w=1600&q=80`}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      )}
      {tint && <div className="absolute inset-0 bg-gradient-to-t from-navy-950/35 via-navy-900/5 to-transparent" aria-hidden="true" />}
    </div>
  );
}
