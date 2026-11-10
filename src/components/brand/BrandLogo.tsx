"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "hero";
  priority?: boolean;
}

const sizeClasses: Record<NonNullable<BrandLogoProps["size"]>, { box: string; px: number; text: string }> = {
  sm: { box: "h-10 w-10", px: 40, text: "text-sm" },
  md: { box: "h-12 w-12", px: 48, text: "text-base" },
  lg: { box: "h-20 w-20", px: 80, text: "text-2xl" },
  hero: { box: "h-44 w-44 sm:h-52 sm:w-52", px: 208, text: "text-5xl" },
};

export function BrandLogo({ size = "sm", priority = false }: BrandLogoProps) {
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const dimensions = sizeClasses[size];

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-obsidian ring-1 ring-ink/15 ${dimensions.box}`}
    >
      {imageUnavailable ? (
        <div className="flex h-full w-full flex-col items-center justify-center bg-obsidian text-center text-porcelain">
          <span className={`font-semibold tracking-tight ${dimensions.text}`}>Z</span>
          {size === "hero" ? (
            <span className="mt-1 text-xs font-medium tracking-widest uppercase text-porcelain/80">
              Zeltrio
            </span>
          ) : null}
        </div>
      ) : (
        <Image
          src={siteConfig.logoPath}
          alt="Zeltrio Digital Service official circular logo"
          width={dimensions.px}
          height={dimensions.px}
          priority={priority}
          sizes={`${dimensions.px}px`}
          onError={() => setImageUnavailable(true)}
          className="h-full w-full scale-[1.03] object-cover"
        />
      )}
    </div>
  );
}

