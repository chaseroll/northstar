import { useId } from "react";

/**
 * North Star: anamorphic lens-flare guide star.
 *
 * Static SVG (no motion). Pure white throughout. Sized by its parent so the
 * caller controls responsive scaling via CSS.
 *
 * Composition (bottom → top):
 *   1. Outer atmospheric bloom
 *   2. Secondary 45° rays
 *   3. Long tapered vertical beam
 *   4. Shorter tapered horizontal beam
 *   5. Diffraction hairlines beyond beam tips
 *   6. Hot white core with radial bloom
 *   7. Tiny specular pinprick
 */
export function NorthStar({ className = "" }: { className?: string }) {
  const uid = useId().replace(/[:]/g, "");

  const id = {
    core: `ns-core-${uid}`,
    bloom: `ns-bloom-${uid}`,
    vbeam: `ns-vbeam-${uid}`,
    hbeam: `ns-hbeam-${uid}`,
    vmask: `ns-vmask-${uid}`,
    vmaskGrad: `ns-vmaskg-${uid}`,
    softBlur: `ns-soft-${uid}`,
    bigBlur: `ns-big-${uid}`,
  };

  return (
    <div
      className={`pointer-events-none relative ${className}`}
      aria-hidden
    >
      <svg
        viewBox="-300 -300 600 600"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className="block overflow-visible"
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
            <stop offset="8%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="22%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="38%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="62%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="78%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="92%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id={id.hbeam} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="38%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="62%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <linearGradient
            id={id.vmaskGrad}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="53%" stopColor="#a8a8a8" />
            <stop offset="60%" stopColor="#5a5a5a" />
            <stop offset="67%" stopColor="#5a5a5a" />
            <stop offset="75%" stopColor="#c8c8c8" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <mask id={id.vmask} maskUnits="userSpaceOnUse">
            <rect
              x="-220"
              y="-270"
              width="440"
              height="540"
              fill={`url(#${id.vmaskGrad})`}
            />
          </mask>

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

        <circle
          cx="0"
          cy="0"
          r="170"
          fill={`url(#${id.bloom})`}
          filter={`url(#${id.bigBlur})`}
        />

        <g opacity="0.28" transform="rotate(45)">
          <polygon points="0,-90 0.8,0 0,90 -0.8,0" fill="#ffffff" />
          <polygon points="-60,0 0,0.5 60,0 0,-0.5" fill="#ffffff" />
        </g>

        <g mask={`url(#${id.vmask})`}>
          <polygon
            points="0,-260 4.2,0 0,260 -4.2,0"
            fill={`url(#${id.vbeam})`}
            filter={`url(#${id.softBlur})`}
          />
          <polygon points="0,-260 0.9,0 0,260 -0.9,0" fill="#ffffff" />
        </g>

        <g>
          <polygon
            points="-190,0 0,3 190,0 0,-3"
            fill={`url(#${id.hbeam})`}
            filter={`url(#${id.softBlur})`}
          />
          <polygon points="-190,0 0,0.7 190,0 0,-0.7" fill="#ffffff" />
        </g>

        <g stroke="#ffffff" strokeWidth="0.7" opacity="0.45">
          <line x1="0" y1="-292" x2="0" y2="-260" />
          <line x1="0" y1="260" x2="0" y2="292" />
        </g>
        <g stroke="#ffffff" strokeWidth="0.7" opacity="0.3">
          <line x1="-225" y1="0" x2="-190" y2="0" />
          <line x1="190" y1="0" x2="225" y2="0" />
        </g>

        <g>
          <circle cx="0" cy="0" r="40" fill={`url(#${id.core})`} />
          <circle cx="0" cy="0" r="14" fill={`url(#${id.core})`} />
          <circle cx="0" cy="0" r="1.8" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}
