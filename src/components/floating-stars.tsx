"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { StarMark } from "./star-mark";

/**
 * FloatingStars — decorative four-point stars scattered across the
 * viewport. Each star drifts gently and brightens + scales + glows
 * based on cursor proximity. Non-interactive (no pointer events),
 * respects `prefers-reduced-motion`, and preserves the `mobile`
 * gating so small screens aren't over-dense.
 */
type Star = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  mobile: boolean;
};

const STARS: Star[] = [
  { x: 10, y: 35, size: 12, opacity: 0.45, mobile: true },
  { x: 35, y: 25, size: 10, opacity: 0.35, mobile: false },
  { x: 58, y: 30, size: 15, opacity: 0.55, mobile: false },
  { x: 80, y: 38, size: 12, opacity: 0.42, mobile: true },
  { x: 18, y: 58, size: 13, opacity: 0.48, mobile: false },
  { x: 50, y: 60, size: 17, opacity: 0.58, mobile: false },
  { x: 67, y: 50, size: 11, opacity: 0.4, mobile: false },
  { x: 95, y: 48, size: 13, opacity: 0.48, mobile: true },
  { x: 8, y: 88, size: 10, opacity: 0.35, mobile: true },
  { x: 45, y: 82, size: 14, opacity: 0.52, mobile: false },
  { x: 66, y: 88, size: 11, opacity: 0.42, mobile: false },
  { x: 88, y: 92, size: 13, opacity: 0.48, mobile: true },
  { x: 24, y: 42, size: 10, opacity: 0.35, mobile: false },
  { x: 74, y: 72, size: 12, opacity: 0.45, mobile: false },
];

const PROX_RADIUS = 190;

function ProximityStar({
  star,
  index,
  reduce,
  mouseX,
  mouseY,
  rectRef,
}: {
  star: Star;
  index: number;
  reduce: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  rectRef: React.RefObject<DOMRect | null>;
}) {
  const proximity = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const rect = rectRef.current;
      if (!rect) {
        proximity.set(0);
        return;
      }
      const cx = rect.left + (star.x / 100) * rect.width;
      const cy = rect.top + (star.y / 100) * rect.height;
      const dist = Math.hypot(mouseX.get() - cx, mouseY.get() - cy);
      const raw = Math.max(0, Math.min(1, 1 - dist / PROX_RADIUS));
      proximity.set(raw * raw);
    };
    update();
    const unsubX = mouseX.on("change", update);
    const unsubY = mouseY.on("change", update);
    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY, proximity, rectRef, star.x, star.y]);

  const scale = useTransform(proximity, (p) => 1 + p * 0.25);
  const starOpacity = useTransform(
    proximity,
    (p) => star.opacity + p * (1 - star.opacity),
  );
  const glowOpacity = useTransform(proximity, (p) => p * 0.85);
  const glowFilter = useTransform(proximity, (p) => `blur(${2 + p * 3}px)`);

  // Per-star drift: small offsets + staggered durations so stars don't
  // move in lockstep. Skipped entirely under prefers-reduced-motion.
  const driftX = 3 - ((index * 5) % 7);
  const driftY = 4 - ((index * 3) % 7);
  const duration = 14 + (index % 5) * 2.2;
  const delay = (index * 0.31) % 3;

  return (
    <motion.div
      className={`pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center ${
        star.mobile ? "" : "hidden md:flex"
      }`}
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
        width: star.size,
        height: star.size,
        scale,
      }}
      animate={
        reduce
          ? undefined
          : {
              x: [0, driftX, 0],
              y: [0, driftY, 0],
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ opacity: starOpacity }}
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full bg-white/90"
          style={{ opacity: glowOpacity, filter: glowFilter }}
        />
        <StarMark className="relative h-full w-full text-white" />
      </motion.div>
    </motion.div>
  );
}

export function FloatingStars() {
  const reduce = useReducedMotion() ?? false;
  const parentRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const mouseX = useMotionValue(-99999);
  const mouseY = useMotionValue(-99999);

  useEffect(() => {
    const updateRect = () => {
      rectRef.current = parentRef.current?.getBoundingClientRect() ?? null;
    };
    updateRect();

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const onLeave = () => {
      mouseX.set(-99999);
      mouseY.set(-99999);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", updateRect, { passive: true });
    window.addEventListener("resize", updateRect);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("resize", updateRect);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={parentRef}
      aria-hidden
      className="pointer-events-none absolute inset-0"
    >
      {STARS.map((star, i) => (
        <ProximityStar
          key={i}
          star={star}
          index={i}
          reduce={reduce}
          mouseX={mouseX}
          mouseY={mouseY}
          rectRef={rectRef}
        />
      ))}
    </div>
  );
}
