"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  delayMs?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
}

const hiddenTransformMap: Record<
  NonNullable<RevealOnScrollProps["direction"]>,
  string
> = {
  up: "translate-y-6 opacity-0",
  left: "-translate-x-6 opacity-0",
  right: "translate-x-6 opacity-0",
  scale: "scale-[0.97] translate-y-3 opacity-0",
};

export function RevealOnScroll({
  children,
  delayMs = 0,
  direction = "up",
  className = "",
}: RevealOnScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -24px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${revealed
          ? "translate-x-0 translate-y-0 scale-100 opacity-100"
          : hiddenTransformMap[direction]
        } ${className}`}
    >
      {children}
    </div>
  );
}

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      return;
    }

    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio =
        docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${ratio})`;
      }
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-linear-to-r from-zeltrio via-zeltrio-bright to-gold shadow-[0_0_12px_rgba(79,142,247,0.7)] will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
