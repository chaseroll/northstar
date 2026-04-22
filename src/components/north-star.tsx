"use client";

import { motion } from "framer-motion";
import { useId } from "react";

/**
 * NorthStar — a single clean four-point sparkle with a soft radial bloom
 * behind it. No lens flare, no diffraction spikes, no ring pulse. Just
 * geometry, light, and a gentle breath.
 */
export function NorthStar({
  size = 480,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const id = {
    bloom: `ns-bloom-${uid}`,
    blur: `ns-blur-${uid}`,
  };

  return (
    <div
      className={`pointer-events-none relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <motion.svg
        viewBox="-100 -100 200 200"
        width={size}
        height={size}
        className="overflow-visible"
        animate={{ opacity: [1, 0.88, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <radialGradient id={id.bloom} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.42" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter
            id={id.blur}
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Single soft bloom */}
        <circle
          cx="0"
          cy="0"
          r="64"
          fill={`url(#${id.bloom})`}
          filter={`url(#${id.blur})`}
        />

        {/* The sparkle itself — same geometry as the brand mark */}
        <path
          d="M 0 -82 L 11 -11 L 62 0 L 11 11 L 0 82 L -11 11 L -62 0 L -11 -11 Z"
          fill="#ffffff"
        />
      </motion.svg>
    </div>
  );
}
