import Link from "next/link";
import { StarMark } from "./star-mark";

/**
 * Nav — Soranos-style soft hood. No scroll detection, no backdrop blur,
 * no solid tint bar. Just a gradient that fades from a hint of navy at
 * the top to fully transparent at the bottom, so the nav content stays
 * readable without a hard edge against the starscape.
 */
export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,9,26,0.55) 0%, rgba(5,9,26,0.25) 55%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex items-center justify-between px-4 pb-5 pt-3 sm:px-8 sm:pb-6 sm:pt-3.5">
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
