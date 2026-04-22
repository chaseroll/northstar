"use client";

import {
  motion,
  useAnimationControls,
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

const COMPANIES: Array<{
  name: string;
  url: string;
}> = [
  { name: "Reading Rooms", url: "https://readingrooms.org" },
  { name: "SpecScout", url: "https://specscout.org" },
  { name: "Texas Film Scene", url: "https://filmscenetexas.com" },
  { name: "GumGauge Dental", url: "https://gumgaugedental.com" },
  { name: "ResearchDocAI", url: "https://researchdocai.com" },
  { name: "ZenQuill", url: "https://zenquill.ai" },
  { name: "OptionsAI", url: "https://optionsai.com" },
  { name: "Oros Hydration", url: "https://getoros.com" },
  { name: "Nemora", url: "https://nemora.app" },
  { name: "Urban Pulse", url: "https://urbanpulsemapping.com" },
];

type Position = {
  x: number;
  y: number;
  size: 10 | 11 | 12 | 13;
  mobile: boolean;
};

/** Intentionally irregular — clusters, loners, no grid. */
const POSITIONS: Position[] = [
  { x: 12, y: 18, size: 11, mobile: true },
  { x: 19, y: 11, size: 13, mobile: false },
  { x: 42, y: 8, size: 10, mobile: false },
  { x: 66, y: 14, size: 12, mobile: false },
  { x: 88, y: 9, size: 11, mobile: true },
  { x: 8, y: 43, size: 12, mobile: false },
  { x: 88, y: 60, size: 11, mobile: false },
  { x: 88, y: 46, size: 13, mobile: true },
  { x: 26, y: 66, size: 11, mobile: true },
  { x: 90, y: 79, size: 12, mobile: false },
  { x: 12, y: 89, size: 10, mobile: true },
  { x: 56, y: 93, size: 12, mobile: false },
];

const PROX_RADIUS = 220;
const COMPANY_LINK_CLASS =
  "group pointer-events-auto inline-flex items-center whitespace-nowrap font-mono uppercase text-white";
const COMPANY_UNDERLINE_CLASS =
  "pointer-events-none absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-white/15 via-white/45 to-white";

function CompanyLink({
  company,
  pos,
  index,
  mouseX,
  mouseY,
  rectRef,
  reduce,
}: {
  company: {
    name: string;
    url: string;
  };
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
  const underlineControls = useAnimationControls();

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

  const baseOpacity = 0.08;
  const opacity = useTransform(proximity, (p) => baseOpacity + p * (1 - baseOpacity));
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

  const handleUnderlineEnter = () => {
    underlineControls.start({
      clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
      opacity: [0.85, 1],
      transition: { duration: 0.42, ease: "easeOut" },
    });
  };

  const handleUnderlineLeave = () => {
    underlineControls.start({
      clipPath: ["inset(0 0% 0 0)", "inset(0 0% 0 100%)"],
      opacity: [1, 0],
      transition: { duration: 0.4, ease: "easeInOut" },
    });
  };

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
        className={COMPANY_LINK_CLASS}
        onMouseEnter={handleUnderlineEnter}
        onMouseLeave={handleUnderlineLeave}
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
        <span className="relative">
          {company.name}
          <motion.span
            aria-hidden
            className={COMPANY_UNDERLINE_CLASS}
            initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
            animate={underlineControls}
          />
        </span>
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
