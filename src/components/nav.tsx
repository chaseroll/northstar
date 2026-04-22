"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { StarMark } from "./star-mark";

/**
 * Nav — fixed editorial top bar with per-section theme detection.
 *
 * Behaviour (ported from the Austin Fund nav):
 *   - No hard gradient band. A whisper-thin blur plate fades in only
 *     after `scrolled > 20px`, tinted to match whichever surface is
 *     currently under the nav.
 *   - On every scroll, we query for `[data-theme='light']` sections
 *     (cream Prospectus, etc.). If one overlaps the top 60px of the
 *     viewport we flip `isDark → false` and invert every colour token
 *     (wordmark, StarMark, link text, Apply pill, hamburger bars,
 *     hairline) with a 500ms transition, so the bar never clashes with
 *     the surface beneath it.
 *   - Below `sm`, links collapse into a hamburger that opens a
 *     full-screen navy overlay. While the overlay is open we lock body
 *     scroll using the fixed-body trick so iOS Safari can't
 *     rubber-band.
 */

type NavLink = { href: string; label: string };

const LINKS: NavLink[] = [{ href: "/portfolio", label: "Portfolio" }];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Theme-of-what's-under-the-nav detection. Light sections opt in via
  // `data-theme="light"` on their outer element; we check whether any
  // of them overlap the top 60px of the viewport and flip accordingly.
  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);

    const lightSections = document.querySelectorAll<HTMLElement>(
      "[data-theme='light']",
    );
    if (lightSections.length === 0) {
      setIsDark(true);
      return;
    }

    let overTop = false;
    for (const el of lightSections) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 60 && rect.bottom >= 60) {
        overTop = true;
        break;
      }
    }
    setIsDark(!overTop);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onScroll]);

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
      <nav
        aria-label="Primary"
        className={`fixed inset-x-0 top-0 z-[400] transition-colors duration-500 ${
          isDark ? "text-white" : "text-ink"
        }`}
      >
        {/* Scroll-triggered blur plate. Near-invisible tint + 3px blur
            gives a gentle lift off whatever is underneath without ever
            looking like a solid band. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 transition-all duration-700 ${
            scrolled
              ? isDark
                ? "bg-black/[0.04] backdrop-blur-[3px] backdrop-saturate-[1.1]"
                : "bg-cream/[0.35] backdrop-blur-[3px] backdrop-saturate-[1.2]"
              : ""
          }`}
        />

        {/* Hairline at the bottom edge, same fade. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          } ${isDark ? "bg-white/[0.08]" : "bg-ink/[0.1]"}`}
        />

        <div className="relative flex items-center justify-between px-5 pb-5 pt-4 sm:px-8 sm:pb-6 sm:pt-4">
          <Link
            href="/"
            aria-label="North Star — home"
            className="group flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-75"
          >
            <StarMark
              className={`size-[22px] shrink-0 transition-colors duration-500 ${
                isDark ? "text-white/95" : "text-ink"
              }`}
            />
            <span
              className={`wordmark-sm transition-colors duration-500 ${
                isDark ? "text-white/90" : "text-ink"
              }`}
            >
              North Star
            </span>
          </Link>

          <div className="hidden items-center gap-8 sm:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link whitespace-nowrap transition-colors duration-500 ${
                  isDark
                    ? "text-white/60 hover:text-white"
                    : "text-ink-mute hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/apply"
              className={`inline-flex h-9 items-center rounded-full px-5 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-500 ${
                isDark
                  ? "bg-white text-navy hover:bg-white/90"
                  : "bg-ink text-cream hover:bg-ink/90"
              }`}
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
            className={`relative flex h-10 w-10 items-center justify-center rounded-md border transition-colors duration-500 sm:hidden ${
              isDark
                ? "border-hair-strong hover:border-white/40"
                : "border-ink-hair-strong hover:border-ink/60"
            }`}
          >
            <span className="sr-only">Menu</span>
            {[0, 1, 2].map((i) => {
              const base = `absolute block h-[2px] w-[16px] transition-[transform,opacity] duration-300 ${
                // Mobile menu overlay is always dark navy, so when `open`
                // the bars are always white regardless of `isDark`.
                open || isDark ? "bg-white/85" : "bg-ink/85"
              }`;
              const pose = open
                ? i === 0
                  ? "rotate-45"
                  : i === 1
                    ? "opacity-0"
                    : "-rotate-45"
                : i === 0
                  ? "-translate-y-[5px]"
                  : i === 1
                    ? "opacity-100"
                    : "translate-y-[5px]";
              return (
                <span key={i} aria-hidden className={`${base} ${pose}`} />
              );
            })}
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
            className="nav-link text-[13px] tracking-[0.22em] text-white/75 transition-colors hover:text-white"
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
