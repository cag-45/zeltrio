"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  enableTilt?: boolean;
  accent?: "cobalt" | "gold";
}

export function SpotlightCard({
  children,
  className = "",
  enableTilt = true,
  accent = "cobalt",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const allowMotionRef = useRef(true);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPreference = () => {
      allowMotionRef.current = finePointer.matches && !reducedMotion.matches;
    };

    syncPreference();
    finePointer.addEventListener("change", syncPreference);
    reducedMotion.addEventListener("change", syncPreference);

    return () => {
      finePointer.removeEventListener("change", syncPreference);
      reducedMotion.removeEventListener("change", syncPreference);
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = cardRef.current;
    const glow = glowRef.current;
    if (!node || !glow || !allowMotionRef.current) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const spotColor =
      accent === "gold"
        ? "rgba(224, 172, 88, 0.16)"
        : "rgba(79, 142, 247, 0.16)";

    glow.style.opacity = "1";
    glow.style.background = `radial-gradient(380px circle at ${x}px ${y}px, ${spotColor}, transparent 68%)`;

    if (enableTilt) {
      const rotateY = ((x / rect.width) - 0.5) * 4.5;
      const rotateX = (0.5 - (y / rect.height)) * 4.5;
      node.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -3px, 0)`;
    }
  };

  const handlePointerLeave = () => {
    const node = cardRef.current;
    const glow = glowRef.current;
    if (glow) {
      glow.style.opacity = "0";
    }
    if (node) {
      node.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

