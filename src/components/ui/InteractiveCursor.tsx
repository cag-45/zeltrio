"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, input, select, textarea, summary, [role='button'], [data-interactive='true']";

export function InteractiveCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isInteractive = false;
    let isPressed = false;
    let frameId = 0;
    let touchFadeTimer: ReturnType<typeof setTimeout> | null = null;

    const stopLoop = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const hideVisuals = () => {
      isVisible = false;
      if (dotRef.current) {
        dotRef.current.style.opacity = "0";
      }
      if (ringRef.current) {
        ringRef.current.style.opacity = "0";
      }
    };

    const updateVisuals = () => {
      if (document.hidden || !isVisible || reducedMotion.matches) {
        frameId = 0;
        return;
      }

      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (dotRef.current) {
        const dotScale = isPressed ? 0.75 : isInteractive ? 1.4 : 1;
        dotRef.current.style.opacity = "1";
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }

      if (ringRef.current) {
        const ringScale = isPressed ? 0.88 : isInteractive ? 1.7 : 1;
        ringRef.current.style.opacity = isInteractive ? "0.9" : "0.55";
        ringRef.current.style.borderColor = isInteractive
          ? "rgba(224, 172, 88, 0.9)"
          : "rgba(117, 170, 255, 0.7)";
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }

      frameId = window.requestAnimationFrame(updateVisuals);
    };

    const ensureLoop = () => {
      if (!frameId && isVisible && !document.hidden && !reducedMotion.matches) {
        frameId = window.requestAnimationFrame(updateVisuals);
      }
    };

    const handleMove = (event: PointerEvent) => {
      if (reducedMotion.matches) {
        return;
      }
      if (touchFadeTimer) {
        clearTimeout(touchFadeTimer);
        touchFadeTimer = null;
      }
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!isVisible) {
        ringX = mouseX;
        ringY = mouseY;
      }
      isVisible = true;

      const target = event.target as HTMLElement | null;
      isInteractive = Boolean(target && target.closest(INTERACTIVE_SELECTOR));
      ensureLoop();
    };

    const handleDown = (event: PointerEvent) => {
      if (reducedMotion.matches) {
        return;
      }
      if (touchFadeTimer) {
        clearTimeout(touchFadeTimer);
        touchFadeTimer = null;
      }
      isPressed = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!isVisible) {
        ringX = mouseX;
        ringY = mouseY;
      }
      isVisible = true;
      const target = event.target as HTMLElement | null;
      isInteractive = Boolean(target && target.closest(INTERACTIVE_SELECTOR));
      ensureLoop();
    };

    const handleUp = (event: PointerEvent) => {
      isPressed = false;
      // On touch devices (smartphones and tablets), gently fade out ring after touch ends
      if (event.pointerType === "touch") {
        touchFadeTimer = setTimeout(() => {
          if (!isPressed) {
            hideVisuals();
            stopLoop();
          }
        }, 450);
      }
    };

    const handleLeave = () => {
      hideVisuals();
      stopLoop();
    };

    const handleVisibility = () => {
      if (document.hidden) {
        hideVisuals();
        stopLoop();
      }
    };

    const handlePreferenceChange = () => {
      if (reducedMotion.matches) {
        hideVisuals();
        stopLoop();
      }
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown, { passive: true });
    window.addEventListener("pointerup", handleUp, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", handlePreferenceChange);

    return () => {
      stopLoop();
      if (touchFadeTimer) {
        clearTimeout(touchFadeTimer);
      }
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", handlePreferenceChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] overflow-hidden"
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
