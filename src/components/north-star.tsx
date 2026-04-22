"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useId, useRef } from "react";

/**
 * NorthStar — anamorphic lens-flare guide star.
 *
 * Composition (bottom → top):
 *   1. Outer corona bloom (wide, soft, low-opacity)
 *   2. Secondary 45° rays (very faint — gives it 8-point presence)
 *   3. Long tapered vertical beam (soft glow + sharp inner highlight)
 *   4. Shorter tapered horizontal beam
 *   5. Diffraction hairlines beyond beam tips (camera flare feel)
 *   6. Hot white core with radial bloom
 *   7. Tiny specular pinprick
 *
 * Motion: a slow breath on the core opacity + a faint cursor parallax.
 */
export function NorthStar({
  size = 720,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/[:]/g, "");

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 24, mass: 0.7 });
  const smy = useSpring(my, { stiffness: 60, damping: 24, mass: 0.7 });
  const tx = useTransform(smx, [-1, 1], [-6, 6]);
  const ty = useTransform(smy, [-1, 1], [-4, 4]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onMove = (e: MouseEvent) => {
      const r = node.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      mx.set(Math.max(-1, Math.min(1, dx)));
      my.set(Math.max(-1, Math.min(1, dy)));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

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
      ref={ref}
      className={`pointer-events-none relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <motion.svg
        viewBox="-300 -300 600 600"
        width={size}
        height={size}
        className="overflow-visible will-change-transform"
        style={{ x: tx, y: ty }}
      >
        <defs>
          {/* Core — white-hot center, falls off fast */}
          <radialGradient id={id.core} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="18%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#dfe6ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#dfe6ff" stopOpacity="0" />
          </radialGradient>

          {/* Outer atmospheric bloom — much wider, very soft */}
          <radialGradient id={id.bloom} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
            <stop offset="35%" stopColor="#c7d3ff" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#c7d3ff" stopOpacity="0" />
          </radialGradient>

          {/* Beam gradients — bright mid, fade to zero at tips */}
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

        {/* 2 · Secondary 45° rays — barely-there, gives 8-point depth */}
        <g opacity="0.28" transform="rotate(45)">
          <polygon points="0,-90 0.8,0 0,90 -0.8,0" fill="#ffffff" />
          <polygon points="-60,0 0,0.5 60,0 0,-0.5" fill="#ffffff" />
        </g>

        {/* 3 · Vertical beam — blurred outer + sharp inner */}
        <g>
          <polygon
            points="0,-260 4.2,0 0,260 -4.2,0"
            fill={`url(#${id.vbeam})`}
            filter={`url(#${id.softBlur})`}
          />
          <polygon
            points="0,-260 0.9,0 0,260 -0.9,0"
            fill="#ffffff"
          />
        </g>

        {/* 4 · Horizontal beam */}
        <g>
          <polygon
            points="-190,0 0,3 190,0 0,-3"
            fill={`url(#${id.hbeam})`}
            filter={`url(#${id.softBlur})`}
          />
          <polygon
            points="-190,0 0,0.7 190,0 0,-0.7"
            fill="#ffffff"
          />
        </g>

        {/* 5 · Diffraction hairlines — continue just past beam tips */}
        <g stroke="#ffffff" strokeWidth="0.35" opacity="0.35">
          <line x1="0" y1="-295" x2="0" y2="-260" />
          <line x1="0" y1="260" x2="0" y2="295" />
        </g>
        <g stroke="#ffffff" strokeWidth="0.35" opacity="0.22">
          <line x1="-225" y1="0" x2="-190" y2="0" />
          <line x1="190" y1="0" x2="225" y2="0" />
        </g>

        {/* 6 · Hot core — the 'star' itself */}
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
      </motion.svg>
    </div>
  );
}
