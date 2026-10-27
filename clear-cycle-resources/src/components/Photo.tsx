"use client";

import Image from "next/image";
import { useState } from "react";
import { LogoMark } from "@/components/Logo";

/**
 * A photo on a branded panel. If the image cannot load, it is hidden and the
 * panel (a soft navy-to-teal field with the brand symbol) remains, so the
 * layout never shows a broken image.
 */
export function Photo({
  src,
  alt,
  sizes,
  preload = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-navy via-navy-900 to-teal-700 ${className}`}
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0" />
      <LogoMark
        variant="light"
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 opacity-20"
      />
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
