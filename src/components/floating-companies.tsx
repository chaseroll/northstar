"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Companies that float in the hero like distant stars. Each is a real link
 * (opens in a new tab). The list is deliberately aspirational — replace
 * with real NorthStar portfolio once Cohort 01 ships.
 *
 * To edit the set, add/remove entries here and (if count changes) in
 * POSITIONS below.
 */
const COMPANIES: Array<{ name: string; url: string }> = [
  { name: "Anduril", url: "https://www.anduril.com" },
  { name: "Palantir", url: "https://www.palantir.com" },
  { name: "Ramp", url: "https://ramp.com" },
  { name: "Linear", url: "https://linear.app" },
  { name: "Cursor", url: "https://cursor.com" },
  { name: "Vercel", url: "https://vercel.com" },
  { name: "Anthropic", url: "https://www.anthropic.com" },
  { name: "Figma", url: "https://www.figma.com" },
  { name: "Stripe", url: "https://stripe.com" },
  { name: "SpaceX", url: "https://www.spacex.com" },
  { name: "Neuralink", url: "https://neuralink.com" },
  { name: "Scale AI", url: "https://scale.com" },
];

/**
 * Each position is in % of the hero section's bounding box. They're laid
 * out in the outer ring around the headline so text never collides with a
 * company label. `mobile: false` hides the label on small screens where
 * hero real-estate is tight.
 */
const POSITIONS: Array<{
  x: number;
  y: number;
  size: 11 | 12 | 13;
  baseOpacity: number;
  mobile: boolean;
}> = [
  { x: 6, y: 20, size: 12, baseOpacity: 0.36, mobile: true },
  { x: 88, y: 14, size: 13, baseOpacity: 0.32, mobile: true },
  { x: 3, y: 44, size: 11, baseOpacity: 0.26, mobile: false },
  { x: 92, y: 42, size: 12, baseOpacity: 0.4, mobile: false },
  { x: 7, y: 68, size: 12, baseOpacity: 0.3, mobile: false },
  { x: 90, y: 66, size: 11, baseOpacity: 0.34, mobile: false },
  { x: 14, y: 86, size: 12, baseOpacity: 0.28, mobile: true },
  { x: 82, y: 88, size: 13, baseOpacity: 0.38, mobile: true },
  { x: 26, y: 10, size: 11, baseOpacity: 0.24, mobile: false },
  { x: 72, y: 8, size: 12, baseOpacity: 0.3, mobile: false },
  { x: 38, y: 92, size: 11, baseOpacity: 0.26, mobile: false },
  { x: 62, y: 92, size: 12, baseOpacity: 0.32, mobile: false },
];

export function FloatingCompanies() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-label="Aspirational companies"
      className="pointer-events-none absolute inset-0 z-[5]"
    >
      {COMPANIES.map((company, i) => {
        const pos = POSITIONS[i];
        if (!pos) return null;

        // Deterministic but varied drift per label
        const driftX = 4 - ((i * 7) % 9);
        const driftY = 5 - ((i * 3) % 8);
        const duration = 10 + (i % 5) * 2.4;
        const delay = (i * 0.37) % 3;

        return (
          <motion.a
            key={company.name}
            href={company.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Visit ${company.name}`}
            className={`group pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono uppercase tracking-[0.16em] text-white transition-[color,letter-spacing] duration-300 hover:tracking-[0.2em] ${
              pos.mobile ? "" : "hidden md:inline-flex"
            }`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              fontSize: `${pos.size}px`,
              opacity: pos.baseOpacity,
            }}
            initial={{ opacity: pos.baseOpacity }}
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
              opacity: 1,
              scale: 1.06,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
          >
            <span
              aria-hidden
              className="mr-2 inline-block size-[3px] translate-y-[-2px] rounded-full bg-white align-middle opacity-60 transition-opacity duration-200 group-hover:opacity-100"
            />
            {company.name}
            <span
              aria-hidden
              className="ml-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-70"
            >
              ↗
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}
