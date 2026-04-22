"use client";

import { motion } from "framer-motion";
import { useId } from "react";

/**
 * NorthStar — anamorphic lens-flare guide star.
 *
 * Composition (bottom → top):
 *   1. Outer corona bloom (wide, soft, low-opacity)
 *   2. Pulsing ring — circular hairline that expands + fades on loop
 *   3. Secondary 45° rays (very faint — gives 8-point presence)
 *   4. Long tapered vertical beam (soft glow + sharp inner highlight)
 *   5. Shorter tapered horizontal beam
 *   6. Diffraction hairlines beyond beam tips
 *   7. Hot white core with radial bloom
 *   8. Tiny specular pinprick
 *
 * All colors are pure white. No blue tint.
 */
export function NorthStar({
  size = 720,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");

  const id = {
    core: `ns-core-${uid}`,
    bloom: `ns-bloom-${uid}`,
    vbeam: `ns-vbeam-${uid}`,
    hbeam: `ns-hbeam-${uid}`,
    softBlur: `ns-soft-${uid}`,
    bigBlur: `ns-big-${uid}`,
  };

  return (
    <div
      className={`pointer-events-none relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg
        viewBox="-300 -300 600 600"
        width={size}
        height={size}
        className="overflow-visible"
      >
        <defs>
          <radialGradient id={id.core} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="18%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <radialGradient id={id.bloom} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.34" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={id.vbeam} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="38%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="62%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id={id.hbeam} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="38%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="62%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <filter
            id={id.softBlur}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="1.4" />
          </filter>

          <filter
            id={id.bigBlur}
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        {/* 1 · Outer atmospheric bloom */}
        <circle
          cx="0"
          cy="0"
          r="170"
          fill={`url(#${id.bloom})`}
          filter={`url(#${id.bigBlur})`}
        />

        {/* 2 · Pulsing rings — two phased hairlines that expand + fade */}
        <motion.circle
          cx="0"
          cy="0"
          r="55"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.6"
          animate={{ r: [55, 150, 55], opacity: [0.55, 0, 0.55] }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.circle
          cx="0"
          cy="0"
          r="55"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.5"
          animate={{ r: [55, 150, 55], opacity: [0.4, 0, 0.4] }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 2.1,
          }}
        />

        {/* 3 · Secondary 45° rays */}
        <g opacity="0.28" transform="rotate(45)">
          <polygon points="0,-90 0.8,0 0,90 -0.8,0" fill="#ffffff" />
          <polygon points="-60,0 0,0.5 60,0 0,-0.5" fill="#ffffff" />
        </g>

        {/* 4 · Vertical beam */}
        <g>
          <polygon
            points="0,-260 4.2,0 0,260 -4.2,0"
            fill={`url(#${id.vbeam})`}
            filter={`url(#${id.softBlur})`}
          />
          <polygon points="0,-260 0.9,0 0,260 -0.9,0" fill="#ffffff" />
        </g>

        {/* 5 · Horizontal beam */}
        <g>
          <polygon
            points="-190,0 0,3 190,0 0,-3"
            fill={`url(#${id.hbeam})`}
            filter={`url(#${id.softBlur})`}
          />
          <polygon points="-190,0 0,0.7 190,0 0,-0.7" fill="#ffffff" />
        </g>

        {/* 6 · Diffraction hairlines */}
        <g stroke="#ffffff" strokeWidth="0.35" opacity="0.35">
          <line x1="0" y1="-295" x2="0" y2="-260" />
          <line x1="0" y1="260" x2="0" y2="295" />
        </g>
        <g stroke="#ffffff" strokeWidth="0.35" opacity="0.22">
          <line x1="-225" y1="0" x2="-190" y2="0" />
          <line x1="190" y1="0" x2="225" y2="0" />
        </g>

        {/* 7 · Hot core — gently breathing */}
        <motion.g
          animate={{ opacity: [1, 0.82, 1] }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <circle cx="0" cy="0" r="40" fill={`url(#${id.core})`} />
          <circle cx="0" cy="0" r="14" fill={`url(#${id.core})`} />
          <circle cx="0" cy="0" r="1.8" fill="#ffffff" />
        </motion.g>
      </svg>
    </div>
  );
}
