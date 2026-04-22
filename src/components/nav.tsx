import Link from "next/link";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-navy/70 backdrop-blur-md">
      <div className="shell flex h-20 items-center justify-between">
        <Link
          href="/"
          aria-label="NorthStar — home"
          className="wordmark transition-colors"
        >
          NorthStar
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
