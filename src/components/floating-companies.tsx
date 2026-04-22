"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * FloatingCompanies — company names scattered across the full viewport,
 * drifting among the ambient starfield. Default state is near-invisible;
 * hovering makes the name ignite with a soft text-glow and reveal an arrow.
 * Clicking opens the company in a new tab.
 *
 * Positions are hand-picked to be deliberately non-patterned (no ring, no
 * grid) and avoid the very top (nav) and bottom (footer) of the viewport.
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

type Position = {
  x: number; // % viewport width
  y: number; // % viewport height
  size: 10 | 11 | 12 | 13;
  mobile: boolean;
};

/**
 * Intentionally irregular scatter — some clusters, some loners, varied
 * vertical density. No ring, no grid, no symmetry.
 */
const POSITIONS: Position[] = [
  { x: 4, y: 18, size: 11, mobile: true },
  { x: 19, y: 11, size: 13, mobile: false },
  { x: 38, y: 7, size: 10, mobile: false },
  { x: 66, y: 14, size: 12, mobile: false },
  { x: 93, y: 9, size: 11, mobile: true },
  { x: 8, y: 43, size: 12, mobile: false },
  { x: 47, y: 38, size: 11, mobile: false },
  { x: 88, y: 46, size: 13, mobile: true },
  { x: 22, y: 63, size: 11, mobile: false },
  { x: 71, y: 71, size: 12, mobile: false },
  { x: 12, y: 89, size: 10, mobile: true },
  { x: 56, y: 93, size: 12, mobile: false },
];

export function FloatingCompanies() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-label="Aspirational companies"
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 1 }}
    >
      {COMPANIES.map((company, i) => {
        const pos = POSITIONS[i];
        if (!pos) return null;

        const driftX = 5 - ((i * 7) % 11);
        const driftY = 4 - ((i * 3) % 9);
        const duration = 12 + (i % 6) * 2.4;
        const delay = (i * 0.43) % 4;

        return (
          <motion.a
            key={company.name}
            href={company.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Visit ${company.name}`}
            className={`group pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center whitespace-nowrap ${
              pos.mobile ? "" : "hidden md:flex"
            }`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
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
              scale: 1.08,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
          >
            {/* Text — faded by default, ignites on hover (no halo, text glow only) */}
            <span
              className="font-mono uppercase tracking-[0.16em] text-white opacity-[0.1] transition-[opacity,letter-spacing,text-shadow] duration-300 ease-out group-hover:opacity-100 group-hover:tracking-[0.22em] group-hover:[text-shadow:0_0_12px_rgba(255,255,255,0.55),0_0_24px_rgba(255,255,255,0.25)]"
              style={{ fontSize: `${pos.size}px` }}
            >
              {company.name}
              <span
                aria-hidden
                className="ml-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-80"
              >
                ↗
              </span>
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}
