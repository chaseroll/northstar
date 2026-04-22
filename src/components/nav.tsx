"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { StarMark } from "./star-mark";

/**
 * Nav — fixed editorial top bar with a mobile overlay menu.
 *
 *  - Brand lockup on the left, real Next.js routes on the right, plus a
 *    single accented "Apply" pill.
 *  - Below `sm`, links collapse into a hamburger that morphs into an X and
 *    opens a full-screen overlay. While the overlay is open we lock body
 *    scroll using the fixed-body trick so iOS Safari can't rubber-band.
 */

type NavLink = { href: string; label: string };

const LINKS: NavLink[] = [{ href: "/portfolio", label: "Portfolio" }];

export function Nav() {
  const [open, setOpen] = useState(false);

  // Close on Escape + when the viewport grows past the overlay breakpoint.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 640) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Body scroll lock while the overlay is open.
  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY || 0;

    html.classList.add("menu-open");
    body.classList.add("menu-open");
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      html.classList.remove("menu-open");
      body.classList.remove("menu-open");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <>
      <nav aria-label="Primary" className="fixed inset-x-0 top-0 z-[400]">
        {/* Solid navy at the top (fully hides content scrolling under), fading
            to transparent by ~140px. Over solid-navy sections the overlay
            paints navy-on-navy → invisible; over the hero it feathers the
            stars behind the links. No backdrop-filter — that was the source
            of the visible blurred band earlier. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[140px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,9,26,1) 0%, rgba(5,9,26,0.92) 40%, rgba(5,9,26,0.55) 72%, transparent 100%)",
          }}
        />

        <div className="relative flex items-center justify-between px-5 pb-5 pt-4 sm:px-8 sm:pb-6 sm:pt-4">
          <Link
            href="/"
            aria-label="North Star — home"
            className="group flex items-center gap-2.5 transition-colors"
          >
            <StarMark className="size-[22px] shrink-0 text-white/95 transition-colors group-hover:text-white" />
            <span className="wordmark-sm text-white/90 transition-colors group-hover:text-white">
              North Star
            </span>
          </Link>

          <div className="hidden items-center gap-8 sm:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link whitespace-nowrap text-white/60 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/apply"
              className="inline-flex h-9 items-center rounded-full bg-white px-5 text-[13px] font-medium tracking-[-0.01em] text-navy transition-colors hover:bg-white/90"
            >
              Apply
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="primary-mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center rounded-md border border-hair-strong bg-navy/70 backdrop-blur-md transition-colors hover:border-white/40 sm:hidden"
          >
            <span className="sr-only">Menu</span>
            <span
              aria-hidden
              className={`absolute block h-[2px] w-[16px] bg-white/85 transition-transform duration-300 ${
                open ? "rotate-45" : "-translate-y-[5px]"
              }`}
            />
            <span
              aria-hidden
              className={`absolute block h-[2px] w-[16px] bg-white/85 transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              aria-hidden
              className={`absolute block h-[2px] w-[16px] bg-white/85 transition-transform duration-300 ${
                open ? "-rotate-45" : "translate-y-[5px]"
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        id="primary-mobile-menu"
        aria-hidden={!open}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
        className={`fixed inset-0 z-[300] flex flex-col items-center justify-center gap-10 bg-navy transition-[opacity,transform] duration-300 sm:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="font-mono text-[13px] uppercase tracking-[0.22em] text-white/75 transition-colors hover:text-white"
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/apply"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
          className="mt-2 inline-flex h-11 items-center rounded-full bg-white px-6 text-[14px] font-medium tracking-[-0.01em] text-navy transition-colors hover:bg-white/90"
        >
          Apply
        </Link>
      </div>
    </>
  );
}
