"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";

interface MagneticLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
}

export function MagneticLink({
  href,
  children,
  className = "",
  external = false,
  ariaLabel,
}: MagneticLinkProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const allowMagneticRef = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      allowMagneticRef.current = finePointer.matches && !reducedMotion.matches;
    };

    sync();
    finePointer.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);

    return () => {
      finePointer.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = wrapperRef.current;
    if (!node || !allowMagneticRef.current) {
      return;
    }
    const rect = node.getBoundingClientRect();
    const pullX = (event.clientX - rect.left - rect.width / 2) * 0.22;
    const pullY = (event.clientY - rect.top - rect.height / 2) * 0.22;
    node.style.transform = `translate3d(${pullX.toFixed(1)}px, ${pullY.toFixed(1)}px, 0)`;
  };

  const handlePointerLeave = () => {
    const node = wrapperRef.current;
    if (node) {
      node.style.transform = "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      ref={wrapperRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="inline-flex transition-transform duration-300 ease-out will-change-transform"
    >
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={className}
        >
          {children}
        </a>
      ) : (
        <Link href={href} aria-label={ariaLabel} className={className}>
          {children}
        </Link>
      )}
    </div>
  );
}

