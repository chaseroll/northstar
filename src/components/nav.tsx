import Link from "next/link";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="shell flex h-20 items-center justify-between">
        <Link
          href="/"
          aria-label="NorthStar — home"
          className="wordmark transition-colors"
        >
          NorthStar
        </Link>

        <a
          href="#apply"
          className="eyebrow transition-colors hover:text-white"
        >
          Request&nbsp;info
        </a>
      </div>
    </header>
  );
}
