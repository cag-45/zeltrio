"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, input, select, textarea, summary, [role='button'], [data-interactive='true']";

export function InteractiveCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isInteractive = false;
    let isPressed = false;
    let frameId = 0;

    const updateVisuals = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (dotRef.current) {
        const dotScale = isPressed ? 0.78 : isInteractive ? 1.45 : 1;
        dotRef.current.style.opacity = isVisible ? "1" : "0";
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }

      if (ringRef.current) {
        const ringScale = isPressed ? 0.85 : isInteractive ? 1.55 : 1;
        ringRef.current.style.opacity = isVisible
          ? isInteractive
            ? "0.8"
            : "0.42"
          : "0";
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }

      frameId = window.requestAnimationFrame(updateVisuals);
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        isVisible = false;
        return;
      }
      mouseX = event.clientX;
      mouseY = event.clientY;
      isVisible = true;

      const target = event.target as HTMLElement | null;
      isInteractive = Boolean(target && target.closest(INTERACTIVE_SELECTOR));
    };

    const handleDown = () => {
      isPressed = true;
    };

    const handleUp = () => {
      isPressed = false;
    };

    const handleLeave = () => {
      isVisible = false;
    };

    frameId = window.requestAnimationFrame(updateVisuals);
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown, { passive: true });
    window.addEventListener("pointerup", handleUp, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 hidden overflow-hidden md:block"
    >
      <div
        ref={ringRef}
        className="fixed top-0 left-0 h-8 w-8 rounded-full border border-cursor-red/75 transition-opacity duration-150 will-change-transform"
        style={{ opacity: 0 }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-2.5 w-2.5 rounded-full bg-cursor-red shadow-[0_0_10px_rgba(239,35,60,0.65)] transition-opacity duration-150 will-change-transform"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
