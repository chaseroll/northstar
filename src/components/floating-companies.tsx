"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * FloatingCompanies — company names scattered across the hero. Each name
 * brightens based on cursor **proximity**, not direct hover. Clicking opens
 * the company in a new tab.
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
  x: number;
  y: number;
  size: 10 | 11 | 12 | 13;
  mobile: boolean;
};

/** Intentionally irregular — clusters, loners, no grid. */
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

const PROX_RADIUS = 220;

function CompanyLink({
  company,
  pos,
  index,
  mouseX,
  mouseY,
  rectRef,
  reduce,
}: {
  company: { name: string; url: string };
  pos: Position;
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  rectRef: React.MutableRefObject<DOMRect | null>;
  reduce: boolean;
}) {
  // Explicit subscription pattern: one motion value per link, updated
  // whenever the shared mouse motion values change.
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
      const cx = rect.left + (pos.x / 100) * rect.width;
      const cy = rect.top + (pos.y / 100) * rect.height;
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
  }, [mouseX, mouseY, pos.x, pos.y, proximity, rectRef]);

  const opacity = useTransform(proximity, (p) => 0.1 + p * 0.9);
  const scale = useTransform(proximity, (p) => 1 + p * 0.08);
  const letterSpacing = useTransform(
    proximity,
    (p) => `${0.16 + p * 0.06}em`,
  );
  const textShadow = useTransform(proximity, (p) =>
    p > 0.02
      ? `0 0 ${12 * p}px rgba(255,255,255,${0.55 * p}), 0 0 ${24 * p}px rgba(255,255,255,${0.25 * p})`
      : "none",
  );
  const arrowOpacity = useTransform(proximity, (p) => p * 0.8);

  const driftX = 5 - ((index * 7) % 11);
  const driftY = 4 - ((index * 3) % 9);
  const duration = 12 + (index % 6) * 2.4;
  const delay = (index * 0.43) % 4;

  return (
    <div
      className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 ${
        pos.mobile ? "" : "hidden md:block"
      }`}
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      <motion.a
        href={company.url}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Visit ${company.name}`}
        className="pointer-events-auto inline-flex items-center whitespace-nowrap font-mono uppercase text-white"
        style={{
          fontSize: `${pos.size}px`,
          opacity,
          scale,
          letterSpacing,
          textShadow,
        }}
        animate={
          reduce
            ? undefined
            : { x: [0, driftX, 0], y: [0, driftY, 0] }
        }
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      >
        {company.name}
        <motion.span
          aria-hidden
          className="ml-1.5 inline-block"
          style={{ opacity: arrowOpacity }}
        >
          ↗
        </motion.span>
      </motion.a>
    </div>
  );
}

export function FloatingCompanies() {
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
      aria-label="Aspirational companies"
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 1 }}
    >
      {COMPANIES.map((company, i) => {
        const pos = POSITIONS[i];
        if (!pos) return null;
        return (
          <CompanyLink
            key={company.name}
            company={company}
            pos={pos}
            index={i}
            mouseX={mouseX}
            mouseY={mouseY}
            rectRef={rectRef}
            reduce={reduce}
          />
        );
      })}
    </div>
  );
}
