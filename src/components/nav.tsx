"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { StarMark } from "./star-mark";

/** Hysteresis so the bar doesn't flicker around the threshold */
const SCROLL_ON = 72;
const SCROLL_OFF = 36;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const read = () => {
      ticking.current = false;
      const y = Math.max(window.scrollY, document.documentElement.scrollTop);
      setScrolled((prev) => (prev ? y > SCROLL_OFF : y > SCROLL_ON));
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 [contain:layout_style]">
      {/* Blur + tint only appears once you've scrolled past the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          opacity: scrolled ? 1 : 0,
          backgroundColor: "rgba(5, 9, 26, 0.18)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(14px) saturate(150%)",
          WebkitBackdropFilter: "blur(14px) saturate(150%)",
        }}
      />

      <div className="relative z-10 flex items-center justify-between px-4 py-3 sm:px-8 sm:py-3.5">
        <Link
          href="/"
          aria-label="NorthStar — home"
          className="flex items-center gap-2 text-white/90 transition-colors hover:text-white"
        >
          <StarMark className="size-7 shrink-0 text-white" />
          <span className="text-[17px] font-medium tracking-tight text-white/85">
            NorthStar
          </span>
        </Link>

        <Link
          href="/apply"
          className="inline-flex h-9 items-center rounded-full bg-white px-4 text-[13px] font-medium tracking-tight text-navy transition-colors hover:bg-white/90 sm:h-10 sm:px-5 sm:text-[13.5px]"
        >
          Apply
        </Link>
      </div>
    </nav>
  );
}
