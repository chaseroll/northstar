"use client";

import { useEffect, useRef } from "react";

/**
 * Comets — shooting stars that cross the hero at random intervals.
 *
 * Each comet enters from the top edge at a slightly random angle, travels
 * down-and-across, and fades out near the end of its life. At most a couple
 * on screen at once. Respects `prefers-reduced-motion` (disables entirely).
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

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

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
      if (W === 0 || H === 0) return;
      // Start above the viewport, slightly past either horizontal edge so
      // the entry never looks like it "pops" at a visible boundary.
      const startX = Math.random() * W * 1.3 - W * 0.15;
      const startY = -40;
      // Slightly off-vertical, always heading down
      const angleFromVertical = (Math.random() - 0.5) * (Math.PI / 2.4);
      const speed = 560 + Math.random() * 360;
      const vx = Math.sin(angleFromVertical) * speed;
      const vy = Math.cos(angleFromVertical) * speed;
      comets.push({
        x: startX,
        y: startY,
        vx,
        vy,
        life: 0,
        lifeMax: (H + 120) / Math.max(vy, 1),
        length: 90 + Math.random() * 50,
      });
    };

    let raf = 0;
    let lastT = performance.now();

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

        // Fade-in fast, fade-out over the last ~25% of life
        const p = c.life / c.lifeMax;
        const alpha =
          p < 0.12 ? p / 0.12 : p > 0.75 ? (1 - p) / 0.25 : 1;
        const a = Math.max(0, Math.min(1, alpha));

        // Unit direction for tail
        const speed = Math.hypot(c.vx, c.vy);
        const dirX = c.vx / speed;
        const dirY = c.vy / speed;
        const tailX = c.x - dirX * c.length;
        const tailY = c.y - dirY * c.length;

        // Tail — linear gradient from head to tail tip
        const g = ctx.createLinearGradient(c.x, c.y, tailX, tailY);
        g.addColorStop(0, `rgba(255,255,255,${0.85 * a})`);
        g.addColorStop(0.35, `rgba(255,255,255,${0.35 * a})`);
        g.addColorStop(1, "rgba(255,255,255,0)");

        ctx.strokeStyle = g;
        ctx.lineWidth = 1.35;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Small bright head
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 1.45, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    let spawnTimer: ReturnType<typeof setTimeout> | null = null;
    const scheduleNext = () => {
      const delay =
        minIntervalMs + Math.random() * (maxIntervalMs - minIntervalMs);
      spawnTimer = setTimeout(() => {
        if (!document.hidden) spawn();
        scheduleNext();
      }, delay);
    };
    // Kick off with a first comet shortly after mount so the hero isn't empty
    const initialTimer = setTimeout(() => {
      spawn();
      scheduleNext();
    }, 2200);

    return () => {
      cancelAnimationFrame(raf);
      if (spawnTimer) clearTimeout(spawnTimer);
      clearTimeout(initialTimer);
      window.removeEventListener("resize", resize);
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
