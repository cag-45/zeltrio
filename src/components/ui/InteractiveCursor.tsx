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
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      if (dotRef.current) {
        const dotScale = isPressed ? 0.72 : isInteractive ? 1.35 : 1;
        dotRef.current.style.opacity = isVisible ? "1" : "0";
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }

      if (ringRef.current) {
        const ringScale = isPressed ? 0.85 : isInteractive ? 1.65 : 1;
        ringRef.current.style.opacity = isVisible
          ? isInteractive
            ? "0.9"
            : "0.48"
          : "0";
        ringRef.current.style.borderColor = isInteractive
          ? "rgba(224, 172, 88, 0.85)"
          : "rgba(117, 170, 255, 0.65)";
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
        className="fixed top-0 left-0 h-8 w-8 rounded-full border border-zeltrio-bright/65 bg-zeltrio/5 transition-colors duration-200 will-change-transform"
        style={{ opacity: 0 }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_rgba(224,172,88,0.85)] will-change-transform"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
