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
  { outer: string; px: number; text: string; showOrbit: boolean }
> = {
  sm: { outer: "h-11 w-11", px: 44, text: "text-sm", showOrbit: false },
  md: { outer: "h-14 w-14", px: 56, text: "text-base", showOrbit: false },
  lg: { outer: "h-24 w-24", px: 96, text: "text-2xl", showOrbit: true },
  hero: {
    outer: "h-40 w-40 sm:h-48 sm:w-48",
    px: 192,
    text: "text-5xl",
    showOrbit: true,
  },
};

export function BrandLogo({ size = "sm", priority = false }: BrandLogoProps) {
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const dimensions = sizeClasses[size];

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full p-[3px] ${
        size === "hero" ? "animate-logo-pulse" : ""
      } ${dimensions.outer}`}
    >
      {dimensions.showOrbit ? (
        <span
          aria-hidden="true"
          className="animate-logo-orbit pointer-events-none absolute -inset-1 rounded-full opacity-75"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(79,142,247,0.85), rgba(224,172,88,0.75), rgba(79,142,247,0.12), rgba(79,142,247,0.85))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1.5px))",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1.5px))",
          }}
        />
      ) : null}

      <div className="relative h-full w-full overflow-hidden rounded-full bg-[#f8fafc] ring-2 ring-zeltrio/50 shadow-[0_8px_24px_-8px_rgba(79,142,247,0.55)]">
        {imageUnavailable ? (
          <div className="flex h-full w-full flex-col items-center justify-center bg-navy text-center text-ink">
            <span
              className={`font-display font-bold tracking-tight text-zeltrio-bright ${dimensions.text}`}
            >
              Z
            </span>
            {size === "hero" ? (
              <span className="mt-1 text-xs font-bold tracking-widest uppercase text-gold">
                Zeltrio
              </span>
            ) : null}
          </div>
        ) : (
          <Image
            src={siteConfig.logoPath}
            alt="Zeltrio Digital Services Official Circular Brand Logo"
            width={dimensions.px}
            height={dimensions.px}
            priority={priority}
            sizes={`${dimensions.px}px`}
            onError={() => setImageUnavailable(true)}
            className="h-full w-full object-contain p-0.5"
          />
        )}
      </div>
    </div>
  );
}
