"use client";

import { useEffect, useRef } from "react";

/**
 * StarField — a sparse canvas of tiny white stars, gently twinkling.
 *
 * No cursor interaction, no hover halos, no bright dots — just ambient
 * atmosphere. Sized against its parent, paused when the tab is hidden,
 * respects `prefers-reduced-motion`.
 */
export function StarField({
  density = 0.00004,
  baseOpacity = 0.55,
  maxStars = 90,
  className = "",
}: {
  density?: number;
  baseOpacity?: number;
  maxStars?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    type Star = {
      x: number;
      y: number;
      r: number;
      o: number;
      speed: number;
      phase: number;
    };

    let stars: Star[] = [];
    let W = 0;
    let H = 0;

    const regenerate = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      if (W === 0 || H === 0) return;

      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const count = Math.max(
        24,
        Math.min(maxStars, Math.floor(W * H * density)),
      );
      stars = new Array(count);
      for (let i = 0; i < count; i++) {
        stars[i] = {
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 0.7 + 0.3,
          o: Math.random() * 0.5 + 0.25,
          speed: Math.random() * 0.0015 + 0.0006,
          phase: Math.random() * Math.PI * 2,
        };
      }
    };
    regenerate();

    window.addEventListener("resize", regenerate);

    let raf = 0;
    let lastT = 0;
    const FRAME_INTERVAL = 1000 / 24;

    const frame = (t: number) => {
      if (t - lastT < FRAME_INTERVAL) {
        raf = requestAnimationFrame(frame);
        return;
      }
      lastT = t;

      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = reduce
          ? 1
          : 0.7 + 0.3 * Math.sin(t * s.speed + s.phase);
        ctx.globalAlpha = s.o * baseOpacity * twinkle;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        lastT = 0;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", regenerate);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, baseOpacity, maxStars]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
