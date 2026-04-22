"use client";

import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
import { useCallback } from "react";

export function Footer() {
  const year = new Date().getFullYear();

  // Comet underline — same animation the nav wordmark uses. Sweeps
  // open left-to-right on hover and clips out to the right on leave.
  const lineControls = useAnimationControls();

  const handleEnter = useCallback(() => {
    lineControls.start({
      clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
      opacity: [0.85, 1],
      transition: { duration: 0.42, ease: "easeOut" },
    });
  }, [lineControls]);

  const handleLeave = useCallback(() => {
    lineControls.start({
      clipPath: ["inset(0 0% 0 0)", "inset(0 0% 0 100%)"],
      opacity: [1, 0],
      transition: { duration: 0.4, ease: "easeInOut" },
    });
  }, [lineControls]);

  return (
    <footer className="pb-16 pt-24">
      <div className="shell mx-auto flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <Link
            href="/"
            aria-label="North Star — home"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="relative inline-block pb-1.5"
          >
            <span className="wordmark">North Star</span>
            <motion.span
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-white/10 via-white/40 to-white"
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              animate={lineControls}
              style={{ boxShadow: "0 0 8px rgba(255,255,255,0.35)" }}
            />
          </Link>
          <span className="eyebrow text-mute">University of Austin</span>
        </div>

        <p className="eyebrow text-mute-2">© {year} · Austin,&nbsp;TX</p>
      </div>
    </footer>
  );
}
