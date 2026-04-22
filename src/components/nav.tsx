import Link from "next/link";
import { StarMark } from "./star-mark";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.06] bg-white/[0.04] backdrop-blur-xl backdrop-saturate-150">
      <div className="shell flex h-20 items-center justify-between">
        <Link
          href="/"
          aria-label="NorthStar — home"
          className="group flex items-center gap-2.5"
        >
          <StarMark className="size-[22px] translate-y-[0.5px] text-white transition-opacity group-hover:opacity-90" />
          <span className="wordmark">NorthStar</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/#apply"
            className="eyebrow hidden transition-colors hover:text-white sm:inline-block"
          >
            Request&nbsp;info
          </Link>
          <Link
            href="/apply"
            className="inline-flex h-9 items-center rounded-full bg-white px-4 text-[13px] font-medium tracking-tight text-navy transition-colors hover:bg-white/90"
          >
            Apply
          </Link>
        </div>
      </div>
    </header>
  );
}
