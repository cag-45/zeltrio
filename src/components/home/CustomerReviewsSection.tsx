"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CustomerReview } from "@/types";
import { customerReviewsData } from "@/data/reviews";

const filterCategories = [
  "All Reviews",
  "Website Development",
  "SEO Services",
  "Digital Marketing",
  "Business Automation",
];

function getInitials(name: string): string {
  const parts = name
    .replace(/\./g, "")
    .split(" ")
    .filter(Boolean);
  if (parts.length === 0) {
    return "Z";
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function CustomerReviewsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All Reviews");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInteractingRef = useRef(false);

  const filteredReviews: CustomerReview[] = useMemo(() => {
    if (selectedCategory === "All Reviews") {
      return customerReviewsData;
    }
    return customerReviewsData.filter(
      (review) => review.serviceCategory === selectedCategory
    );
  }, [selectedCategory]);

  const safeIndex =
    filteredReviews.length > 0 ? activeIndex % filteredReviews.length : 0;
  const featuredReview = filteredReviews[safeIndex] || customerReviewsData[0];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || isUserPaused || filteredReviews.length <= 1) {
      return;
    }

    const root = sectionRef.current;
    let isVisibleInViewport = true;
    let timerId: number | undefined;

    const clearTimer = () => {
      if (timerId !== undefined) {
        window.clearInterval(timerId);
        timerId = undefined;
      }
    };

    const startTimer = () => {
      clearTimer();
      if (
        !reducedMotion.matches &&
        !document.hidden &&
        isVisibleInViewport &&
        !isInteractingRef.current
      ) {
        timerId = window.setInterval(() => {
          setActiveIndex((prev) => (prev + 1) % filteredReviews.length);
        }, 6500);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleInViewport = Boolean(entry?.isIntersecting);
      if (isVisibleInViewport) {
        startTimer();
      } else {
        clearTimer();
      }
    });

    if (root) {
      observer.observe(root);
    }

    const handleVisibility = () => {
      if (document.hidden) {
        clearTimer();
      } else {
        startTimer();
      }
    };

    const handleMotionChange = () => {
      if (reducedMotion.matches) {
        clearTimer();
      } else {
        startTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", handleMotionChange);
    startTimer();

    return () => {
      clearTimer();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, [filteredReviews.length, isUserPaused]);

  const goPrevious = () => {
    setActiveIndex(
      (prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length
    );
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredReviews.length);
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      aria-label="Client Reviews"
      onPointerEnter={() => {
        isInteractingRef.current = true;
      }}
      onPointerLeave={() => {
        isInteractingRef.current = false;
      }}
      onFocusCapture={() => {
        isInteractingRef.current = true;
      }}
      onBlurCapture={() => {
        isInteractingRef.current = false;
      }}
      className="border-t border-rule bg-canvas py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-rule pb-8 text-left lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
              Client Reviews
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Trusted by Growing Businesses and Ambitious Creators
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate">
              Feedback from founders, medical studios, retail operators, and
              creators who partnered with Zeltrio Digital Services.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous Client Review"
              className="btn-secondary px-4 py-2.5 text-xs uppercase tracking-wider"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next Client Review"
              className="btn-secondary px-4 py-2.5 text-xs uppercase tracking-wider"
            >
              Next
            </button>
            <button
              type="button"
              onClick={() => setIsUserPaused((prev) => !prev)}
              aria-pressed={isUserPaused}
              className="btn-secondary px-4 py-2.5 text-xs uppercase tracking-wider"
            >
              {isUserPaused ? "Resume Auto Slide" : "Pause Auto Slide"}
            </button>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Filter Client Reviews by Service"
          className="mt-8 flex flex-wrap gap-2.5 text-left"
        >
          {filterCategories.map((category) => {
            const isActive = category === selectedCategory;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveIndex(0);
                }}
                className={`min-h-[40px] rounded-full border px-4 py-2 text-xs font-bold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "border-zeltrio bg-zeltrio text-canvas shadow-xs"
                    : "border-rule bg-surface text-slate hover:border-zeltrio hover:text-zeltrio"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {featuredReview ? (
          <div
            key={featuredReview.id}
            className="animate-slide-enter mt-8 rounded-2xl border border-zeltrio/25 bg-surface p-6 text-left shadow-sm sm:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-zeltrio px-3.5 py-1 text-xs font-bold text-canvas">
                    {featuredReview.ratingText}
                  </span>
                  <span className="rounded-full border border-rule bg-canvas px-3.5 py-1 text-xs font-bold text-ink">
                    {featuredReview.serviceCategory}
                  </span>
                  <span className="text-xs font-semibold text-zeltrio">
                    {featuredReview.outcomeBadge}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-2xl font-medium leading-snug text-ink sm:text-3xl">
                  {featuredReview.headline}
                </h3>

                <blockquote className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
                  {featuredReview.quote}
                </blockquote>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-rule bg-canvas p-6 lg:col-span-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-canvas">
                    {getInitials(featuredReview.clientName)}
                  </div>
                  <div>
                    <p className="text-base font-bold text-ink">
                      {featuredReview.clientName}
                    </p>
                    <p className="text-xs font-semibold text-muted">
                      {featuredReview.roleTitle}
                    </p>
                    <p className="mt-0.5 text-xs font-bold text-zeltrio">
                      {featuredReview.companyOrChannel}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-rule pt-4">
                  <p aria-live="polite" className="text-xs font-semibold text-muted">
                    Showing Review 0{safeIndex + 1} of 0{filteredReviews.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredReviews.map((review, idx) => {
            const isCurrent = idx === safeIndex;
            return (
              <button
                key={review.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`flex h-full flex-col justify-between rounded-xl border p-6 text-left transition-all duration-300 hover:-translate-y-1 ${
                  isCurrent
                    ? "border-zeltrio bg-zeltrio-tint/45 shadow-md"
                    : "border-rule bg-card hover:border-zeltrio/50 hover:shadow-sm"
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold tracking-wider uppercase text-zeltrio">
                      {review.serviceCategory}
                    </span>
                    <span className="rounded bg-surface px-2.5 py-1 text-xs font-bold text-ink">
                      {review.ratingText}
                    </span>
                  </div>

                  <h4 className="mt-3 text-base font-bold text-ink">
                    {review.headline}
                  </h4>

                  <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-slate">
                    {review.quote}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-3 border-t border-rule pt-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-canvas">
                    {getInitials(review.clientName)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">
                      {review.clientName}
                    </p>
                    <p className="text-xs font-medium text-muted">
                      {review.companyOrChannel}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

