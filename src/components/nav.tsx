"use client";

import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { StarMark } from "./star-mark";

/**
 * Nav — Soranos-style soft hood. No scroll detection, no backdrop blur,
 * no solid tint bar. Just a gradient that fades from a hint of navy at
 * the top to fully transparent at the bottom, so the nav content stays
 * readable without a hard edge against the starscape.
 */
export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isApplyHover, setIsApplyHover] = useState(false);
  const wordmarkLineControls = useAnimationControls();

  const handleHomeClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push("/");
  };

  const handleApplyClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Smoothen page-to-page navigation when supported.
    const doc = document as Document & {
      startViewTransition?: (update: () => void) => void;
    };
    if (doc.startViewTransition) {
      e.preventDefault();
      doc.startViewTransition(() => {
        router.push("/apply");
      });
    }
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
    <nav className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,9,26,0.55) 0%, rgba(5,9,26,0.25) 55%, transparent 100%)",
        }}
      />

      <div className="pointer-events-none relative z-10 flex items-center justify-between px-4 pb-5 pt-3 sm:px-8 sm:pb-6 sm:pt-3.5">
        <Link
          href="/"
          onClick={handleHomeClick}
          onMouseEnter={handleWordmarkEnter}
          onMouseLeave={handleWordmarkLeave}
          aria-label="NorthStar — home"
          className="pointer-events-auto group relative flex items-center gap-2 pb-1.5 text-white/90 transition-colors hover:text-white"
        >
          <StarMark className="size-7 shrink-0 text-white" />
          <span className="text-[17px] font-medium tracking-tight text-white/85">
            NorthStar
          </span>
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

        <div className="pointer-events-auto flex items-center gap-2">
          <Link
            href="/portfolio"
            className="inline-flex h-9 items-center rounded-full border border-white/45 bg-transparent px-4 text-[13px] font-medium tracking-tight text-white/90 transition-[border-color,background-color,color] duration-300 hover:border-white/70 hover:bg-white/8 hover:text-white sm:h-10 sm:px-5 sm:text-[13.5px]"
          >
            Portfolio
          </Link>

          <Link
            href="/apply"
            onClick={handleApplyClick}
            onMouseEnter={() => setIsApplyHover(true)}
            onMouseLeave={() => setIsApplyHover(false)}
            className="group relative inline-flex h-9 items-center justify-center rounded-full border border-white/55 bg-transparent px-4 text-[13px] font-medium tracking-tight text-white transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-out hover:-translate-y-0.5 hover:border-white hover:bg-white/8 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_10px_24px_-16px_rgba(255,255,255,0.55)] active:translate-y-0 sm:h-10 sm:px-5 sm:text-[13.5px]"
          >
            <span className="relative z-10">Apply</span>
            <motion.svg
              aria-hidden
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              initial={{ opacity: 0 }}
              animate={
                isApplyHover
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <motion.rect
                x="1"
                y="1"
                width="98"
                height="38"
                rx="19"
                fill="none"
                stroke="rgba(255,255,255,0.98)"
                strokeWidth="1.25"
                strokeLinecap="round"
                style={{
                  filter:
                    "drop-shadow(0 0 5px rgba(255,255,255,0.92)) drop-shadow(0 0 12px rgba(255,255,255,0.45))",
                }}
                initial={{ opacity: 0.0, scale: 1 }}
                animate={
                  isApplyHover
                    ? { opacity: 0.9, scale: 1 }
                    : { opacity: 0.0, scale: 1 }
                }
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </motion.svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
