"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { CustomerReview } from "@/types";
import { customerReviewsData } from "@/data/reviews";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

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
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

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
      if (!reducedMotion.matches && !document.hidden && isVisibleInViewport) {
        timerId = window.setInterval(() => {
          if (!isInteractingRef.current && !document.hidden) {
            setActiveIndex((prev) => (prev + 1) % filteredReviews.length);
          }
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

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const nextIdx =
      (idx + delta + filterCategories.length) % filterCategories.length;
    setSelectedCategory(filterCategories[nextIdx]);
    setActiveIndex(0);
    tabRefs.current[nextIdx]?.focus();
  };

  const formattedIndex = String(safeIndex + 1).padStart(2, "0");
  const formattedTotal = String(filteredReviews.length).padStart(2, "0");

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
      className="relative border-t border-rule bg-surface/50 py-16 backdrop-blur-[2px] sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-rule pb-8 text-left lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-widest uppercase text-gold">
              Client Reviews
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Trusted by Growing Businesses and Ambitious Creators
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate">
              Direct feedback from clients and creators who partnered with
              Zeltrio Digital Services.
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
          {filterCategories.map((category, idx) => {
            const isActive = category === selectedCategory;
            return (
              <button
                key={category}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                id={`review-tab-${idx}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="featured-review-panel"
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveIndex(0);
                }}
                className={`min-h-[40px] rounded-full border px-4 py-2 text-xs font-bold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "border-gold/60 bg-linear-to-r from-[#1d4ed8] to-[#2563eb] text-[#ffffff] shadow-[0_6px_18px_-6px_rgba(37,99,235,0.65)]"
                    : "border-rule-strong bg-surface-elevated/80 text-slate hover:border-gold/45 hover:text-ink"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {featuredReview ? (
          <SpotlightCard
            accent="gold"
            enableTilt={false}
            className="surface-glass mt-8 rounded-2xl border border-rule-strong p-6 text-left shadow-[0_24px_56px_-26px_rgba(0,0,0,0.85)] sm:p-10"
          >
            <div
              id="featured-review-panel"
              role="tabpanel"
              aria-labelledby={`review-tab-${filterCategories.indexOf(selectedCategory)}`}
              key={featuredReview.id}
              className="animate-slide-enter grid gap-8 lg:grid-cols-12 lg:items-center"
            >
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-gold/40 bg-gold-tint px-3.5 py-1 text-xs font-bold text-gold-bright">
                    {featuredReview.ratingText}
                  </span>
                  <span className="rounded-full border border-rule-strong bg-surface-elevated px-3.5 py-1 text-xs font-bold text-ink">
                    {featuredReview.serviceCategory}
                  </span>
                  <span className="text-xs font-semibold text-zeltrio-bright">
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

              <div className="flex flex-col justify-between rounded-xl border border-rule-strong bg-surface/90 p-6 lg:col-span-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-linear-to-br from-surface-elevated to-navy font-display text-sm font-bold text-gold-bright">
                    {getInitials(featuredReview.clientName)}
                  </div>
                  <div>
                    <p className="font-display text-base font-bold text-ink">
                      {featuredReview.clientName}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-rule pt-4">
                  <p aria-live="polite" className="text-xs font-semibold text-muted">
                    Showing Review {formattedIndex} of {formattedTotal}
                  </p>
                </div>
              </div>
            </div>
          </SpotlightCard>
        ) : null}

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredReviews.map((review, idx) => {
            const isCurrent = idx === safeIndex;
            return (
              <button
                key={review.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`group flex h-full flex-col justify-between rounded-2xl border p-6 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                  isCurrent
                    ? "border-gold/60 bg-surface-elevated/95 shadow-[0_18px_36px_-18px_rgba(224,172,88,0.3)]"
                    : "border-rule bg-card/85 hover:border-zeltrio/55 hover:bg-surface-elevated/85"
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold tracking-wider uppercase text-zeltrio-bright">
                      {review.serviceCategory}
                    </span>
                    <span className="rounded-md border border-gold/25 bg-gold-tint px-2.5 py-1 text-xs font-bold text-gold-bright">
                      {review.ratingText}
                    </span>
                  </div>

                  <h4 className="mt-3 font-display text-base font-bold text-ink transition-colors group-hover:text-gold-bright">
                    {review.headline}
                  </h4>

                  <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-slate">
                    {review.quote}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-3 border-t border-rule pt-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zeltrio/40 bg-surface-elevated font-display text-xs font-bold text-zeltrio-bright">
                    {getInitials(review.clientName)}
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-ink">
                      {review.clientName}
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
