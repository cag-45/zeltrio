"use client";

import Link from "next/link";
import { useState } from "react";

export function DemoShowcaseBar() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return (
      <button
        type="button"
        onClick={() => setIsDismissed(false)}
        className="fixed top-2 right-2 z-50 rounded-full border border-gold/40 bg-canvas/90 px-3 py-1 text-[11px] font-bold text-gold backdrop-blur-md shadow-lg hover:bg-gold hover:text-canvas transition-colors"
      >
        Show Zeltrio Demo Info
      </button>
    );
  }

  return (
    <aside
      aria-label="Zeltrio Demo Build Information Bar"
      className="sticky top-0 z-50 border-b border-gold/30 bg-linear-to-r from-canvas via-navy-deep to-canvas px-3 py-2 text-xs text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-md border border-rule bg-surface px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase text-slate transition-colors hover:border-gold hover:text-gold"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>Back to Zeltrio</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/35 bg-gold-tint px-2.5 py-0.5 font-bold tracking-wide text-gold-bright text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            Live Client Demo
          </span>

          <span className="hidden font-medium text-slate md:inline">
            Aura Dental & Maxillofacial Centre · Reference Architecture
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-1.5 rounded-md border border-sage/35 bg-sage-tint/40 px-2.5 py-1 text-[11px] font-bold text-sage lg:flex">
            <span>⚡ 99/100 Lighthouse Target</span>
            <span className="text-muted">·</span>
            <span>3-Tap Mobile Booking</span>
          </div>

          <Link
            href="/contact?topic=website-audit"
            className="btn-gold inline-flex items-center gap-1.5 px-3 py-1 text-[11px] uppercase tracking-wider font-bold shadow-[0_6px_16px_-6px_rgba(224,172,88,0.5)]"
          >
            <span>Get a Website Like This</span>
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss demo banner"
            className="rounded p-1 text-muted hover:text-ink transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

