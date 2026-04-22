"use client";

import { motion, useReducedMotion } from "framer-motion";
import { StarMark } from "./star-mark";

/**
 * Floating companies — each one rendered as a faint four-point star with a
 * barely-visible label below it. Hovering the star/name group triggers a
 * layered radial "shine" on the star and reveals the full label; clicking
 * opens the company in a new tab.
 *
 * Visual intent: constellation of named stars. Default state is deliberately
 * ghostly — the eye picks up the stars first, then the names reveal on
 * proximity / attention.
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

const POSITIONS: Array<{
  x: number;
  y: number;
  size: 10 | 11 | 12 | 13;
  mobile: boolean;
}> = [
  { x: 8, y: 20, size: 12, mobile: true },
  { x: 87, y: 14, size: 13, mobile: true },
  { x: 4, y: 44, size: 11, mobile: false },
  { x: 92, y: 42, size: 12, mobile: false },
  { x: 7, y: 68, size: 12, mobile: false },
  { x: 90, y: 66, size: 11, mobile: false },
  { x: 15, y: 86, size: 12, mobile: true },
  { x: 82, y: 88, size: 13, mobile: true },
  { x: 27, y: 10, size: 10, mobile: false },
  { x: 72, y: 8, size: 12, mobile: false },
  { x: 38, y: 92, size: 11, mobile: false },
  { x: 62, y: 92, size: 12, mobile: false },
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

        const driftX = 4 - ((i * 7) % 9);
        const driftY = 5 - ((i * 3) % 8);
        const duration = 11 + (i % 5) * 2.4;
        const delay = (i * 0.37) % 3;

        return (
          <motion.a
            key={company.name}
            href={company.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Visit ${company.name}`}
            className={`group pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 ${
              pos.mobile ? "flex" : "hidden md:flex"
            }`}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
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
              scale: 1.06,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
          >
            {/* Star with layered halos */}
            <div
              className="relative flex items-center justify-center"
              style={{ width: pos.size, height: pos.size }}
            >
              {/* Outer soft halo */}
              <span
                aria-hidden
                className="absolute size-16 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(255,255,255,0.22), rgba(255,255,255,0) 70%)",
                }}
              />
              {/* Inner bright halo */}
              <span
                aria-hidden
                className="absolute size-8 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(255,255,255,0.6), rgba(255,255,255,0) 72%)",
                }}
              />
              <StarMark className="relative h-full w-full text-white/55 transition-colors duration-300 group-hover:text-white" />
            </div>

            {/* Label — extremely faded by default */}
            <div className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-white opacity-[0.12] transition-[opacity,letter-spacing] duration-300 ease-out group-hover:opacity-100 group-hover:tracking-[0.22em]">
              {company.name}
              <span
                aria-hidden
                className="ml-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-70"
              >
                ↗
              </span>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
