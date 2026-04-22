"use client";

import { motion, useReducedMotion } from "framer-motion";
import { StarMark } from "./star-mark";

/**
 * FloatingStars — decorative four-point stars scattered across the viewport.
 * Not links, not labels — just stars. Each one catches a layered radial
 * shine on hover and scales up slightly.
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
  { x: 50, y: 60, size: 17, opacity: 0.9 },
  { x: 67, y: 50, size: 11, opacity: 0.6 },
  { x: 95, y: 48, size: 13, opacity: 0.75 },
  { x: 8, y: 88, size: 10, opacity: 0.55 },
  { x: 45, y: 82, size: 14, opacity: 0.8 },
  { x: 66, y: 88, size: 11, opacity: 0.65 },
  { x: 88, y: 92, size: 13, opacity: 0.75 },
  { x: 24, y: 42, size: 10, opacity: 0.55 },
  { x: 74, y: 72, size: 12, opacity: 0.7 },
];

export function FloatingStars() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 1 }}
    >
      {STARS.map((star, i) => {
        const driftX = 3 - ((i * 5) % 7);
        const driftY = 4 - ((i * 3) % 7);
        const duration = 14 + (i % 5) * 2.2;
        const delay = (i * 0.31) % 3;

        return (
          <motion.div
            key={i}
            className="group pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
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
            whileHover={{
              scale: 1.5,
              transition: { duration: 0.28, ease: "easeOut" },
            }}
          >
            {/* Outer soft halo */}
            <span
              className="absolute size-16 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,255,255,0.2), rgba(255,255,255,0) 70%)",
              }}
            />
            {/* Inner bright halo */}
            <span
              className="absolute size-8 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,255,255,0.55), rgba(255,255,255,0) 72%)",
              }}
            />
            <div
              className="relative h-full w-full transition-opacity duration-300 group-hover:!opacity-100"
              style={{ opacity: star.opacity }}
            >
              <StarMark className="h-full w-full text-white" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
