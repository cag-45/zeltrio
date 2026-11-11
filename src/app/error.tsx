"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="relative bg-canvas/45 py-24 backdrop-blur-[2px] sm:py-32">
      <div className="mx-auto max-w-7xl px-4 text-left sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-widest uppercase text-gold">
          Unexpected Error
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Something Interrupted This View
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate">
          You can try reloading this section or return to the Zeltrio overview.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-gold px-6 py-3 text-sm"
          >
            Try Again
          </button>
          <Link href="/" className="btn-secondary px-6 py-3 text-sm">
            Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

