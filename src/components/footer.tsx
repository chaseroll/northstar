"use client";

import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { StarMark } from "./star-mark";

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const wordmarkLineControls = useAnimationControls();
  const year = new Date().getFullYear();

  const handleHomeClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push("/");
  };

  const handleWordmarkEnter = () => {
    wordmarkLineControls.start({
      clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
      opacity: [0.85, 1],
      transition: { duration: 0.42, ease: "easeOut" },
    });
  };

  const handleWordmarkLeave = () => {
    wordmarkLineControls.start({
      clipPath: ["inset(0 0% 0 0)", "inset(0 0% 0 100%)"],
      opacity: [1, 0],
      transition: { duration: 0.4, ease: "easeInOut" },
    });
  };

  return (
    <footer className="pb-14 pt-20">
      <div className="shell flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Link
            href="/"
            onClick={handleHomeClick}
            onMouseEnter={handleWordmarkEnter}
            onMouseLeave={handleWordmarkLeave}
            aria-label="NorthStar — home"
            className="group relative flex items-center gap-2.5 pb-1.5"
          >
            <StarMark className="size-[20px] translate-y-[0.5px] text-white" />
            <span className="wordmark">NorthStar</span>
            <motion.span
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-white/12 via-white/40 to-white"
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              animate={wordmarkLineControls}
              style={{
                boxShadow: "0 0 8px rgba(255,255,255,0.35)",
              }}
            />
          </Link>
          <span className="eyebrow">University of Austin</span>
        </div>

        <div className="flex flex-col items-center gap-2 md:items-end">
          <p className="eyebrow text-mute-2">© {year} · Austin,&nbsp;TX</p>
        </div>
      </div>
    </footer>
  );
}
