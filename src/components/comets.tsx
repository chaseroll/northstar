"use client";

import { useEffect, useRef } from "react";

/**
 * Comets — shooting stars that cross the hero at random intervals.
 *
 * Lightweight canvas: at most two comets alive at once, rAF runs only while
 * one is in flight, the scheduler pauses while the tab is hidden or the
 * hero is offscreen, and the whole effect is skipped on touch-primary
 * devices or when the user prefers reduced motion.
 */
export function Comets({
  minIntervalMs = 5000,
  maxIntervalMs = 14000,
}: {
  minIntervalMs?: number;
  maxIntervalMs?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches
    ) {
      return;
    }

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    type Comet = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      lifeMax: number;
      length: number;
    };

    let W = 0;
    let H = 0;
    const comets: Comet[] = [];
    let raf = 0;
    let lastT = 0;
    let running = false;
    let paused = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      if (W === 0 || H === 0) return;
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = () => {
      if (W === 0 || H === 0 || paused) return;
      const startX = Math.random() * W * 1.3 - W * 0.15;
      const startY = -40;
      const angleFromVertical = (Math.random() - 0.5) * (Math.PI / 2.4);
      const speed = 560 + Math.random() * 360;
      comets.push({
        x: startX,
        y: startY,
        vx: Math.sin(angleFromVertical) * speed,
        vy: Math.cos(angleFromVertical) * speed,
        life: 0,
        lifeMax: (H + 120) / Math.max(Math.cos(angleFromVertical) * speed, 1),
        length: 90 + Math.random() * 50,
      });
      ensureRunning();
    };

    const frame = (t: number) => {
      const dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;

      ctx.clearRect(0, 0, W, H);

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        c.life += dt;

        if (
          c.life > c.lifeMax ||
          c.x < -200 ||
          c.x > W + 200 ||
          c.y > H + 150
        ) {
          comets.splice(i, 1);
          continue;
        }

        const p = c.life / c.lifeMax;
        const a =
          p < 0.12 ? p / 0.12 : p > 0.75 ? Math.max(0, (1 - p) / 0.25) : 1;

        const speed = Math.hypot(c.vx, c.vy);
        const dirX = c.vx / speed;
        const dirY = c.vy / speed;
        const tailX = c.x - dirX * c.length;
        const tailY = c.y - dirY * c.length;

        const g = ctx.createLinearGradient(c.x, c.y, tailX, tailY);
        g.addColorStop(0, `rgba(255,255,255,${0.85 * a})`);
        g.addColorStop(0.35, `rgba(255,255,255,${0.35 * a})`);
        g.addColorStop(1, "rgba(255,255,255,0)");

        ctx.strokeStyle = g;
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      if (comets.length === 0) {
        running = false;
        ctx.clearRect(0, 0, W, H);
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const ensureRunning = () => {
      if (running) return;
      running = true;
      lastT = performance.now();
      raf = requestAnimationFrame(frame);
    };

    let spawnTimer: ReturnType<typeof setTimeout> | null = null;
    const scheduleNext = () => {
      const delay =
        minIntervalMs + Math.random() * (maxIntervalMs - minIntervalMs);
      spawnTimer = setTimeout(() => {
        if (!document.hidden && !paused) spawn();
        scheduleNext();
      }, delay);
    };
    const initialTimer = setTimeout(() => {
      spawn();
      scheduleNext();
    }, 2200);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        running = false;
      } else if (comets.length > 0) {
        ensureRunning();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Pause the whole system while the canvas is offscreen.
    const io = new IntersectionObserver(
      ([entry]) => {
        paused = !(entry?.isIntersecting ?? false);
        if (paused) {
          cancelAnimationFrame(raf);
          running = false;
          comets.length = 0;
          ctx.clearRect(0, 0, W, H);
        }
      },
      { root: null, threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      if (spawnTimer) clearTimeout(spawnTimer);
      clearTimeout(initialTimer);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, [minIntervalMs, maxIntervalMs]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: 1 }}
    />
  );
}
