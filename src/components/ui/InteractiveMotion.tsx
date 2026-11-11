"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}

export function RevealOnScroll({
  children,
  delayMs = 0,
  className = "",
}: RevealOnScrollProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
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
        rootMargin: "0px 0px -28px 0px",
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
      className={`motion-reduce:translate-y-0 motion-reduce:opacity-100 transition-all duration-700 ease-out will-change-transform ${
        revealed ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
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
      const ratio = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

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
        className="h-full w-full origin-left bg-zeltrio will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
