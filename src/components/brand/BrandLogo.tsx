"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "hero";
  priority?: boolean;
}

const sizeClasses: Record<
  NonNullable<BrandLogoProps["size"]>,
  { box: string; px: number; text: string }
> = {
  sm: { box: "h-11 w-11", px: 44, text: "text-sm" },
  md: { box: "h-14 w-14", px: 56, text: "text-base" },
  lg: { box: "h-24 w-24", px: 96, text: "text-2xl" },
  hero: { box: "h-40 w-40 sm:h-48 sm:w-48", px: 192, text: "text-5xl" },
};

export function BrandLogo({ size = "sm", priority = false }: BrandLogoProps) {
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const dimensions = sizeClasses[size];

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-canvas shadow-sm ring-1 ring-ink/15 ${
        size === "hero" ? "animate-logo-pulse ring-zeltrio/30" : ""
      } ${dimensions.box}`}
    >
      {imageUnavailable ? (
        <div className="flex h-full w-full flex-col items-center justify-center bg-canvas text-center text-ink">
          <span
            className={`font-bold tracking-tight text-zeltrio ${dimensions.text}`}
          >
            Z
          </span>
          {size === "hero" ? (
            <span className="mt-1 text-xs font-bold tracking-widest uppercase text-ink">
              Zeltrio
            </span>
          ) : null}
        </div>
      ) : (
        <Image
          src={siteConfig.logoPath}
          alt="Zeltrio Digital Services Official Circular Logo"
          width={dimensions.px}
          height={dimensions.px}
          priority={priority}
          sizes={`${dimensions.px}px`}
          onError={() => setImageUnavailable(true)}
          className="h-full w-full object-contain p-0.5"
        />
      )}
    </div>
  );
}
