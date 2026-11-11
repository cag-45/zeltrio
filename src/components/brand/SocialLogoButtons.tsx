"use client";

import { useId } from "react";
import { siteConfig } from "@/config/site";

interface SocialLogoButtonsProps {
  size?: "sm" | "md";
  onAction?: () => void;
  className?: string;
}

function InstagramColoredIcon({ sizePx }: { sizePx: number }) {
  const gradId = useId();

  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-300 group-hover:scale-110"
    >
      <defs>
        <radialGradient
          id={gradId}
          cx="28%"
          cy="92%"
          r="115%"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="28%" stopColor="#FA7E1E" />
          <stop offset="56%" stopColor="#D62976" />
          <stop offset="82%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill={`url(#${gradId})`} />
      <rect
        x="5.75"
        y="5.75"
        width="12.5"
        height="12.5"
        rx="3.75"
        stroke="#FFFFFF"
        strokeWidth="1.65"
      />
      <circle
        cx="12"
        cy="12"
        r="3.1"
        stroke="#FFFFFF"
        strokeWidth="1.65"
      />
      <circle cx="15.85" cy="8.15" r="0.95" fill="#FFFFFF" />
    </svg>
  );
}

function XColoredIcon({ sizePx }: { sizePx: number }) {
  const gradId = useId();

  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-300 group-hover:scale-110"
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="2"
          y1="2"
          x2="22"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="55%" stopColor="#4F8EF7" />
          <stop offset="100%" stopColor="#93C5FD" />
        </linearGradient>
      </defs>
      <path
        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
        fill={`url(#${gradId})`}
      />
    </svg>
  );
}

export function SocialLogoButtons({
  size = "md",
  onAction,
  className = "",
}: SocialLogoButtonsProps) {
  const iconPx = size === "sm" ? 19 : 21;
  const buttonDim = size === "sm" ? "h-11 w-11" : "h-11 w-11";

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {siteConfig.socialLinks.map((social) => {
        const isInstagram = social.name === "Instagram";
        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onAction}
            aria-label={`Follow ${siteConfig.brandName} on ${social.name}`}
            title={`${social.name} — @${social.handle}`}
            className={`group relative inline-flex ${buttonDim} items-center justify-center rounded-xl border bg-surface-elevated/80 backdrop-blur-md transition-all duration-250 ease-out hover:-translate-y-0.5 active:scale-95 ${
              isInstagram
                ? "border-[#d62976]/35 hover:border-[#fa7e1e]/75 hover:bg-[#d62976]/14 hover:shadow-[0_10px_24px_-8px_rgba(214,41,118,0.55)]"
                : "border-[#38bdf8]/35 hover:border-[#38bdf8]/80 hover:bg-[#38bdf8]/14 hover:shadow-[0_10px_24px_-8px_rgba(56,189,248,0.55)]"
            }`}
          >
            {isInstagram ? (
              <InstagramColoredIcon sizePx={iconPx} />
            ) : (
              <XColoredIcon sizePx={iconPx - 2} />
            )}
          </a>
        );
      })}
    </div>
  );
}

