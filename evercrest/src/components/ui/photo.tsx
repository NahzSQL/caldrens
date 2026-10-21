"use client";

import Image from "next/image";
import { useState } from "react";
import { images, type ImageKey } from "@/config/images";
import { cn } from "@/lib/utils";
import { LogoMark } from "./logo";

interface PhotoProps {
  image: ImageKey;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Use an empty alt when the photo is purely decorative. */
  decorative?: boolean;
}

/**
 * A responsive photo that fills its (relatively positioned) parent.
 * If the photo cannot load, a branded background is shown instead,
 * so the layout never breaks.
 */
export function Photo({ image, sizes, priority, className, imgClassName, decorative }: PhotoProps) {
  const [failed, setFailed] = useState(false);
  const { src, alt, position } = images[image] as { src: string; alt: string; position?: string };

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-gradient-to-br from-navy-800 via-navy-700 to-teal-700", className)}>
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-15">
        <LogoMark className="h-1/3 w-auto max-h-40 text-white" />
      </div>
      {!failed && (
        <Image
          src={src}
          alt={decorative ? "" : alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={cn("object-cover", imgClassName)}
          style={{ objectPosition: position ?? "center" }}
        />
      )}
    </div>
  );
}
