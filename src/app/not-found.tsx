import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-alabaster py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
          Page Not Found
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          This page is unavailable
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate">
          The page you requested may have moved or is no longer active. You can
          return to the main Zeltrio overview or browse our four core digital
          services directly.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-cobalt px-6 py-3 text-sm font-semibold text-porcelain transition-colors hover:bg-cobalt-dark"
          >
            Return to Home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-md border border-rule bg-porcelain px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}

