"use client";

import { useEffect, useRef } from "react";

/**
 * StarField — a fixed-position canvas of tiny twinkling stars behind the
 * page content. Stars within a radius of the cursor brighten and glow.
 *
 *  - Deterministic per-load star positions (generated once per resize).
 *  - Frame-rate capped to ~30fps; paused when the tab is hidden.
 *  - Respects `prefers-reduced-motion`: twinkle freezes but cursor
 *    proximity still brightens stars.
 *  - `pointer-events: none` so it never intercepts clicks.
 */
export function StarField({
  density = 0.00009,
  baseOpacity = 0.55,
  influenceRadius = 160,
  maxStars = 220,
  className = "",
}: {
  density?: number;
  baseOpacity?: number;
  influenceRadius?: number;
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
    let rect = canvas.getBoundingClientRect();
    const mouse = { x: -10_000, y: -10_000 };

    const regenerate = () => {
      rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      if (W === 0 || H === 0) return;
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const count = Math.max(
        40,
        Math.min(maxStars, Math.floor(W * H * density)),
      );
      stars = new Array(count);
      for (let i = 0; i < count; i++) {
        stars[i] = {
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 0.9 + 0.4,
          o: Math.random() * 0.55 + 0.2,
          speed: Math.random() * 0.0022 + 0.0008,
          phase: Math.random() * Math.PI * 2,
        };
      }
    };
    regenerate();

    const onResize = () => regenerate();
    const onScroll = () => {
      rect = canvas.getBoundingClientRect();
    };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -10_000;
      mouse.y = -10_000;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    let raf = 0;
    let lastT = 0;
    const FRAME_INTERVAL = 1000 / 30; // ~30fps

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
          : 0.6 + 0.4 * Math.sin(t * s.speed + s.phase);

        const dx = mouse.x - s.x;
        const dy = mouse.y - s.y;
        const dist = Math.hypot(dx, dy);
        const prox = Math.max(0, 1 - dist / influenceRadius);
        const proxEase = prox * prox; // ease-in

        const opacity = Math.min(
          1,
          s.o * baseOpacity * twinkle + proxEase * 0.9,
        );
        const radius = s.r + proxEase * 1.8;

        // Soft halo for stars near the cursor.
        if (proxEase > 0.04) {
          const haloR = radius * 6;
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, haloR);
          g.addColorStop(0, `rgba(255,255,255,${proxEase * 0.22})`);
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = g;
          ctx.fillRect(s.x - haloR, s.y - haloR, haloR * 2, haloR * 2);
        }

        ctx.globalAlpha = opacity;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
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
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, baseOpacity, influenceRadius, maxStars]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
