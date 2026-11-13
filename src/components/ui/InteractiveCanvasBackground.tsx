"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isGold: boolean;
  alpha: number;
  phase: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

export function InteractiveCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      return;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const pointer = {
      x: width * 0.5,
      y: height * 0.35,
      active: false,
    };

    let scrollOffset = window.scrollY;
    let frameId = 0;
    let time = 0;
    const ripples: Ripple[] = [];
    let particles: Particle[] = [];

    const createParticles = () => {
      const area = width * height;
      const count = Math.min(58, Math.max(24, Math.floor(area / 28000)));
      const next: Particle[] = [];

      for (let i = 0; i < count; i += 1) {
        const speed = 0.22 + (i % 5) * 0.05;
        const angle = (i * 2.39996) % (Math.PI * 2);
        next.push({
          x: ((i * 197) % 1000) / 1000 * width,
          y: ((i * 313) % 1000) / 1000 * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: i % 4 === 0 ? 2.2 : 1.45,
          isGold: i % 4 === 0,
          alpha: i % 4 === 0 ? 0.55 : 0.45,
          phase: i * 0.7,
        });
      }
      particles = next;
    };

    const resize = () => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const widthChanged = Math.abs(nextWidth - width) > 2;
      width = nextWidth;
      height = nextHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0 || widthChanged) {
        createParticles();
      }
    };

    const drawStaticBackdrop = (tick: number) => {
      ctx.clearRect(0, 0, width, height);

      const parallaxShift = (scrollOffset * 0.06) % 160;

      // Ambient drifting Cobalt glow
      const cobaltX = width * 0.18 + Math.sin(tick * 0.35) * 60;
      const cobaltY = height * 0.22 + Math.cos(tick * 0.28) * 45 - parallaxShift * 0.25;
      const cobaltGlow = ctx.createRadialGradient(
        cobaltX,
        cobaltY,
        10,
        cobaltX,
        cobaltY,
        Math.max(width, height) * 0.52
      );
      cobaltGlow.addColorStop(0, "rgba(79, 142, 247, 0.14)");
      cobaltGlow.addColorStop(0.45, "rgba(37, 99, 235, 0.05)");
      cobaltGlow.addColorStop(1, "rgba(11, 15, 23, 0)");
      ctx.fillStyle = cobaltGlow;
      ctx.fillRect(0, 0, width, height);

      // Ambient warm Champagne Gold glow
      const goldX = width * 0.82 + Math.cos(tick * 0.3) * 55;
      const goldY = height * 0.65 + Math.sin(tick * 0.25) * 40 + parallaxShift * 0.18;
      const goldGlow = ctx.createRadialGradient(
        goldX,
        goldY,
        10,
        goldX,
        goldY,
        Math.max(width, height) * 0.44
      );
      goldGlow.addColorStop(0, "rgba(224, 172, 88, 0.1)");
      goldGlow.addColorStop(0.5, "rgba(224, 172, 88, 0.03)");
      goldGlow.addColorStop(1, "rgba(11, 15, 23, 0)");
      ctx.fillStyle = goldGlow;
      ctx.fillRect(0, 0, width, height);

      // Interactive cursor spotlight halo
      if (pointer.active) {
        const cursorGlow = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          240
        );
        cursorGlow.addColorStop(0, "rgba(79, 142, 247, 0.11)");
        cursorGlow.addColorStop(0.5, "rgba(224, 172, 88, 0.04)");
        cursorGlow.addColorStop(1, "rgba(11, 15, 23, 0)");
        ctx.fillStyle = cursorGlow;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const drawFrame = () => {
      if (document.hidden) {
        frameId = 0;
        return;
      }

      time += 0.012;
      drawStaticBackdrop(time);

      const connectionDistance = width < 768 ? 115 : 148;
      const pointerInfluenceRadius = 190;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];

        if (!reducedMotionQuery.matches) {
          p.x += p.vx;
          p.y += p.vy;

          if (pointer.active) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const distSq = dx * dx + dy * dy;
            if (distSq > 4 && distSq < pointerInfluenceRadius * pointerInfluenceRadius) {
              const dist = Math.sqrt(distSq);
              const force = (1 - dist / pointerInfluenceRadius) * 0.025;
              p.x += dx * force;
              p.y += dy * force;
            }
          }

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }

        // Draw particle connections
        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistance * connectionDistance) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / connectionDistance) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle =
              p.isGold || q.isGold
                ? `rgba(224, 172, 88, ${opacity})`
                : `rgba(79, 142, 247, ${opacity})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Connect nearby particles directly to interactive pointer
        if (pointer.active && !reducedMotionQuery.matches) {
          const pdx = pointer.x - p.x;
          const pdy = pointer.y - p.y;
          const pDistSq = pdx * pdx + pdy * pdy;
          if (pDistSq < 165 * 165) {
            const pDist = Math.sqrt(pDistSq);
            const lineAlpha = (1 - pDist / 165) * 0.34;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = p.isGold
              ? `rgba(224, 172, 88, ${lineAlpha})`
              : `rgba(117, 170, 255, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        const pulse = 0.78 + Math.sin(time * 2 + p.phase) * 0.22;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isGold
          ? `rgba(224, 172, 88, ${p.alpha * pulse})`
          : `rgba(117, 170, 255, ${p.alpha * pulse})`;
        ctx.fill();
      }

      // Click ripple pulses
      for (let r = ripples.length - 1; r >= 0; r -= 1) {
        const ripple = ripples[r];
        ripple.radius += 3.8;
        ripple.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(224, 172, 88, ${ripple.alpha})`;
        ctx.lineWidth = 1.25;
        ctx.stroke();

        if (ripple.alpha < 0.02 || ripple.radius > 220) {
          ripples.splice(r, 1);
        }
      }

      if (!reducedMotionQuery.matches) {
        frameId = window.requestAnimationFrame(drawFrame);
      }
    };

    const start = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
      drawFrame();
    };

    let touchFadeTimer: ReturnType<typeof setTimeout> | null = null;

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;

      if (event.pointerType === "touch" || event.pointerType === "pen") {
        if (touchFadeTimer) {
          clearTimeout(touchFadeTimer);
        }
        touchFadeTimer = setTimeout(() => {
          pointer.active = false;
        }, 1000);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;

      if (event.pointerType === "touch" || event.pointerType === "pen") {
        if (touchFadeTimer) {
          clearTimeout(touchFadeTimer);
        }
      }

      if (reducedMotionQuery.matches) {
        return;
      }
      ripples.push({
        x: event.clientX,
        y: event.clientY,
        radius: 6,
        alpha: 0.5,
      });
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.pointerType === "pen") {
        if (touchFadeTimer) {
          clearTimeout(touchFadeTimer);
        }
        touchFadeTimer = setTimeout(() => {
          pointer.active = false;
        }, 550);
      }
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleScroll = () => {
      scrollOffset = window.scrollY;
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (frameId) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
        }
      } else {
        start();
      }
    };

    const handleMotionChange = () => {
      start();
    };

    resize();
    start();

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotionQuery.addEventListener("change", handleMotionChange);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      if (touchFadeTimer) {
        clearTimeout(touchFadeTimer);
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      {/* Subtle architectural dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(226, 222, 213, 0.22) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

