"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/**
 * FloatingCompanies — company names scattered across the hero. Each name
 * brightens based on cursor **proximity**, not direct hover.
 *
 * Layout model:
 *   - Positions are chosen to avoid the central text block
 *     (reserved zone: x∈[15, 85], y∈[28, 72]).
 *   - Chips with `x < 15` anchor to the left edge and chips with `x > 85`
 *     anchor to the right edge, so they never extend past the viewport on
 *     narrow screens. Everything else is centered on its x%.
 *
 * Perf model:
 *   - A single `pointermove` listener on the window, but it's a no-op while
 *     the hero is offscreen (IntersectionObserver flips `active`).
 *   - Moves are coalesced into a single rAF that measures each chip via
 *     getBoundingClientRect (accurate regardless of anchoring) and writes
 *     a CSS variable (`--p`, a 0..1 proximity) onto the chip. All visuals
 *     flow from that variable via CSS — no per-link JS, no framer-motion.
 *   - On touch / no-hover devices the proximity effect is skipped and we
 *     render each name at a calm, static opacity defined in CSS.
 */

type Company = {
  name: string;
  url: string;
  x: number;
  y: number;
  size: 10 | 11 | 12 | 13;
  mobile: boolean;
};

// Positions are picked to feel like a scattered constellation rather than a
// frame around the hero copy. The reserved text zone is roughly x∈[15, 85]
// and y∈[28, 72]; every chip lives outside that rectangle, but inside the
// safe bands the x/y values are intentionally non-uniform — staggered
// heights across the top and bottom, mixed insets on the sides, and uneven
// gaps — so the arrangement reads as organic instead of gridded.
const COMPANIES: Company[] = [
  { name: "Reading Rooms", url: "https://readingrooms.org", x: 3, y: 22, size: 11, mobile: true },
  { name: "SpecScout", url: "https://specscout.org", x: 21, y: 5, size: 13, mobile: false },
  { name: "Texas Film Scene", url: "https://filmscenetexas.com", x: 44, y: 16, size: 10, mobile: false },
  { name: "GumGauge Dental", url: "https://gumgaugedental.com", x: 71, y: 8, size: 11, mobile: false },
  { name: "ResearchDocAI", url: "https://researchdocai.com", x: 94, y: 19, size: 12, mobile: true },
  { name: "ZenQuill", url: "https://zenquill.ai", x: 13, y: 34, size: 13, mobile: false },
  { name: "OptionsAI", url: "https://optionsai.com", x: 2, y: 65, size: 10, mobile: false },
  { name: "Oros Hydration", url: "https://getoros.com", x: 92, y: 31, size: 11, mobile: true },
  { name: "Nemora", url: "https://nemora.app", x: 86, y: 68, size: 12, mobile: false },
  { name: "Urban Pulse", url: "https://urbanpulsemapping.com", x: 73, y: 78, size: 13, mobile: false },
];

const PROX_RADIUS_PX = 220;

type Anchor = "left" | "right" | "center";
function anchorFor(x: number): Anchor {
  if (x < 15) return "left";
  if (x > 85) return "right";
  return "center";
}

export function FloatingCompanies() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const links = Array.from(
      root.querySelectorAll<HTMLAnchorElement>("a[data-company]"),
    );
    if (links.length === 0) return;

    let mouseX = -99999;
    let mouseY = -99999;
    let rafPending = false;
    let active = true;

    const computeAndWrite = () => {
      rafPending = false;
      if (!active) return;
      for (let i = 0; i < links.length; i++) {
        const el = links[i];
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const dist = Math.hypot(dx, dy);
        const raw = Math.max(0, 1 - dist / PROX_RADIUS_PX);
        el.style.setProperty("--p", (raw * raw).toFixed(3));
      }
    };

    const schedule = () => {
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(computeAndWrite);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (!active) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      schedule();
    };

    // Fires only when the pointer actually leaves the document (not when it
    // crosses between elements). Resets proximity so chips fade back out.
    const onDocLeave = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        mouseX = -99999;
        mouseY = -99999;
        schedule();
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseout", onDocLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry?.isIntersecting ?? false;
      },
      { root: null, threshold: 0 },
    );
    io.observe(root);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onDocLeave);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-label="Aspirational companies"
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 1 }}
    >
      {COMPANIES.map((c) => {
        const anchor = anchorFor(c.x);
        const positionStyle: CSSProperties =
          anchor === "right"
            ? { right: `${100 - c.x}%`, top: `${c.y}%` }
            : { left: `${c.x}%`, top: `${c.y}%` };
        const transformClass =
          anchor === "center"
            ? "-translate-x-1/2 -translate-y-1/2"
            : "-translate-y-1/2";

        return (
          <div
            key={c.name}
            className={`pointer-events-none absolute ${transformClass} ${
              c.mobile ? "" : "hidden md:block"
            }`}
            style={positionStyle}
          >
            <a
              data-company
              href={c.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Visit ${c.name}`}
              className="company-chip pointer-events-auto inline-flex items-center whitespace-nowrap font-mono uppercase text-white"
              style={{ fontSize: `${c.size}px` }}
            >
              {c.name}
              <span aria-hidden className="company-arrow ml-1.5 inline-block">
                ↗
              </span>
            </a>
          </div>
        );
      })}
    </div>
  );
}
