"use client";

import { motion } from "framer-motion";
import { useId } from "react";

/**
 * NorthStar — anamorphic lens-flare guide star.
 *
 * Composition (bottom → top):
 *   1. Outer corona bloom (wide, soft, gently pulsing opacity)
 *   2. Long tapered vertical beam (soft glow + sharp inner highlight)
 *   3. Shorter tapered horizontal beam
 *   4. Diffraction hairlines beyond beam tips
 *   5. Hot white core with radial bloom
 *   6. Tiny specular pinprick
 *
 * All colors are pure white. No blue tint. No expanding ring pulse —
 * the "pulse" is just the bloom's opacity breathing in sync with the core.
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
    midBlur: `ns-mid-${uid}`,
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
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.06" />
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
            id={id.midBlur}
            x="-80%"
            y="-80%"
            width="260%"
            height="260%"
          >
            <feGaussianBlur stdDeviation="6.5" />
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

        {/* 1 · Outer atmospheric bloom — breathes gently for a soft pulse */}
        <motion.circle
          cx="0"
          cy="0"
          r="92"
          fill={`url(#${id.bloom})`}
          filter={`url(#${id.bigBlur})`}
          animate={{ opacity: [0.48, 0.64, 0.48] }}
          transition={{
            duration: 8.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 2 · Vertical beam */}
        <g>
          <polygon
            points="0,-238 4.2,0 0,238 -4.2,0"
            fill={`url(#${id.vbeam})`}
            filter={`url(#${id.softBlur})`}
          />
          <polygon points="0,-238 0.9,0 0,238 -0.9,0" fill="#ffffff" />
        </g>

        {/* 3 · Horizontal beam */}
        <g>
          <polygon
            points="-190,0 0,3 190,0 0,-3"
            fill={`url(#${id.hbeam})`}
            filter={`url(#${id.softBlur})`}
          />
          <polygon points="-190,0 0,0.7 190,0 0,-0.7" fill="#ffffff" />
        </g>

        {/* 4 · Diffraction hairlines */}
        <g stroke="#ffffff" strokeWidth="0.35" opacity="0.35">
          <line x1="0" y1="-273" x2="0" y2="-238" />
          <line x1="0" y1="238" x2="0" y2="273" />
        </g>
        <g stroke="#ffffff" strokeWidth="0.35" opacity="0.22">
          <line x1="-225" y1="0" x2="-190" y2="0" />
          <line x1="190" y1="0" x2="225" y2="0" />
        </g>

        {/* 5 · Center-origin glow */}
        <motion.circle
          cx="0"
          cy="0"
          r="68"
          fill="#ffffff"
          filter={`url(#${id.midBlur})`}
          animate={{ opacity: [0.1, 0.18, 0.1] }}
          transition={{
            duration: 7.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 6 · Hot core — gently breathing */}
        <motion.g
          animate={{ opacity: [0.9, 0.96, 0.9] }}
          transition={{
            duration: 7.2,
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
