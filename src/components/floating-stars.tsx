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
 * FloatingStars — decorative four-point stars scattered across the viewport.
 * Not links, not labels — just stars. Each one brightens with a soft glow
 * based on cursor proximity.
 *
 * Lives at the same z-layer as FloatingCompanies so the two interleave into
 * one mixed constellation. Positions are chosen to sit between the company
 * name positions rather than on top of them.
 */
type Star = {
  x: number;
  y: number;
  size: number;
  opacity: number;
};

const STARS: Star[] = [
  { x: 10, y: 35, size: 12, opacity: 0.7 },
  { x: 35, y: 25, size: 10, opacity: 0.55 },
  { x: 58, y: 30, size: 15, opacity: 0.85 },
  { x: 80, y: 38, size: 12, opacity: 0.65 },
  { x: 18, y: 58, size: 13, opacity: 0.75 },
  { x: 64, y: 60, size: 17, opacity: 0.9 },
  { x: 67, y: 50, size: 11, opacity: 0.6 },
  { x: 95, y: 48, size: 13, opacity: 0.75 },
  { x: 8, y: 88, size: 10, opacity: 0.55 },
  { x: 45, y: 82, size: 14, opacity: 0.8 },
  { x: 66, y: 88, size: 11, opacity: 0.65 },
  { x: 88, y: 92, size: 13, opacity: 0.75 },
  { x: 24, y: 42, size: 10, opacity: 0.55 },
  { x: 74, y: 72, size: 12, opacity: 0.7 },
  { x: 6, y: 22, size: 9, opacity: 0.5 },
  { x: 27, y: 16, size: 11, opacity: 0.62 },
  { x: 43, y: 12, size: 9, opacity: 0.52 },
  { x: 62, y: 19, size: 10, opacity: 0.58 },
  { x: 91, y: 20, size: 12, opacity: 0.68 },
  { x: 14, y: 72, size: 9, opacity: 0.48 },
  { x: 33, y: 70, size: 10, opacity: 0.56 },
  { x: 59, y: 74, size: 9, opacity: 0.5 },
  { x: 82, y: 64, size: 11, opacity: 0.64 },
  { x: 96, y: 78, size: 9, opacity: 0.5 },
  { x: 16, y: 27, size: 9, opacity: 0.5 },
  { x: 40, y: 22, size: 10, opacity: 0.58 },
  { x: 72, y: 27, size: 9, opacity: 0.52 },
  { x: 28, y: 83, size: 10, opacity: 0.6 },
  { x: 61, y: 86, size: 9, opacity: 0.5 },
  { x: 78, y: 86, size: 10, opacity: 0.58 },
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
  rectRef: React.MutableRefObject<DOMRect | null>;
}) {
  const proximity = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const rect = rectRef.current;
      if (!rect) {
        proximity.set(0);
        return;
      }

      const mx = mouseX.get();
      const my = mouseY.get();
      const cx = rect.left + (star.x / 100) * rect.width;
      const cy = rect.top + (star.y / 100) * rect.height;
      const dist = Math.hypot(mx - cx, my - cy);
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
  const starOpacity = useTransform(proximity, (p) => star.opacity + p * (1 - star.opacity));
  const glowOpacity = useTransform(proximity, (p) => p * 0.95);
  const glowBlur = useTransform(proximity, (p) => `${2 + p * 3}px`);

  const driftX = 3 - ((index * 5) % 7);
  const driftY = 4 - ((index * 3) % 7);
  const duration = 14 + (index % 5) * 2.2;
  const delay = (index * 0.31) % 3;

  return (
    <motion.div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
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
      <motion.div className="relative h-full w-full" style={{ opacity: starOpacity }}>
        <motion.div
          className="absolute inset-0 rounded-full bg-white/90"
          style={{ opacity: glowOpacity, filter: useTransform(glowBlur, (b) => `blur(${b})`) }}
          aria-hidden
        />
        <StarMark className="h-full w-full text-white" />
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
      style={{ zIndex: 1 }}
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
