"use client";

import { useEffect, useRef } from "react";

/**
 * StarField — tiny white stars painted onto a canvas. Cursor-interactive:
 * stars within `influenceRadius` of the pointer brighten and halo.
 *
 * Perf model:
 *   - Stars are rolled once per resize (not per frame).
 *   - One baseline paint on mount, then repaints are scheduled **only** on
 *     pointermove and coalesced into a single rAF — there is no idle rAF
 *     loop, no twinkle, no per-frame trig. If the pointer stops moving,
 *     work stops completely.
 *   - On touch / no-hover devices the pointer branch is skipped entirely
 *     and the canvas stays at its static baseline.
 *   - IntersectionObserver pauses all updates while the hero is offscreen.
 *   - Canvas density / star cap are tuned down on narrow viewports.
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
    const hasHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    type Star = { x: number; y: number; r: number; o: number };

    let stars: Star[] = [];
    let W = 0;
    let H = 0;
    let rect = canvas.getBoundingClientRect();
    let mouseX = -10_000;
    let mouseY = -10_000;
    let rafPending = false;
    let active = true;

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

      const isMobile = W < 640;
      const effectiveDensity = isMobile ? density * 0.55 : density;
      const effectiveCap = isMobile ? Math.min(maxStars, 120) : maxStars;
      const count = Math.max(
        30,
        Math.min(effectiveCap, Math.floor(W * H * effectiveDensity)),
      );
      stars = new Array(count);
      for (let i = 0; i < count; i++) {
        stars[i] = {
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 0.9 + 0.4,
          o: Math.random() * 0.55 + 0.2,
        };
      }
    };

    const paint = () => {
      rafPending = false;
      if (W === 0 || H === 0) return;
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        let radius = s.r;
        let opacity = s.o * baseOpacity;

        if (hasHover) {
          const dx = mouseX - s.x;
          const dy = mouseY - s.y;
          const dist = Math.hypot(dx, dy);
          const prox = Math.max(0, 1 - dist / influenceRadius);
          const proxEase = prox * prox;

          if (proxEase > 0) {
            opacity = Math.min(1, opacity + proxEase * 0.9);
            radius = s.r + proxEase * 1.8;

            if (proxEase > 0.04) {
              const haloR = radius * 6;
              const g = ctx.createRadialGradient(
                s.x,
                s.y,
                0,
                s.x,
                s.y,
                haloR,
              );
              g.addColorStop(0, `rgba(255,255,255,${proxEase * 0.22})`);
              g.addColorStop(1, "rgba(255,255,255,0)");
              ctx.fillStyle = g;
              ctx.fillRect(s.x - haloR, s.y - haloR, haloR * 2, haloR * 2);
            }
          }
        }

        ctx.globalAlpha = Math.min(1, opacity);
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const schedule = () => {
      if (!rafPending && active) {
        rafPending = true;
        requestAnimationFrame(paint);
      }
    };

    regenerate();
    paint();

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      schedule();
    };
    const onLeave = () => {
      if (mouseX < -1000 && mouseY < -1000) return;
      mouseX = -10_000;
      mouseY = -10_000;
      schedule();
    };
    const onScroll = () => {
      rect = canvas.getBoundingClientRect();
    };
    const onResize = () => {
      regenerate();
      schedule();
    };

    if (hasHover) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry?.isIntersecting ?? false;
        if (active) schedule();
      },
      { root: null, threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      if (hasHover) {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("scroll", onScroll);
      }
      window.removeEventListener("resize", onResize);
      io.disconnect();
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
