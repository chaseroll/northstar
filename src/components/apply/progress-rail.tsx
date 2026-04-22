"use client";

import { useEffect, useState } from "react";

export type RailSection = { id: string; label: string };

export function ProgressRail({ sections }: { sections: RailSection[] }) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const currentIndex = sections.findIndex((s) => s.id === active);
  const percent = sections.length
    ? Math.round(((currentIndex + 1) / sections.length) * 100)
    : 0;

  function jumpTo(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <nav
      aria-label="Application sections"
      className="hidden lg:block"
    >
      <div className="sticky top-28">
        <div className="mb-6 flex items-baseline justify-between">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">
            Progress
          </p>
          <p className="text-[11px] tabular-nums text-white/50">
            {String(Math.max(currentIndex + 1, 1)).padStart(2, "0")}&nbsp;/&nbsp;
            {String(sections.length).padStart(2, "0")}
          </p>
        </div>

        <div className="mb-6 h-px w-full bg-white/10">
          <div
            className="h-px bg-white/80 transition-[width] duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        <ul className="flex flex-col">
          {sections.map((s, i) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => jumpTo(e, s.id)}
                  className={`group flex items-baseline gap-3 py-2 text-[13px] transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-white/45 hover:text-white/80"
                  }`}
                  aria-current={isActive ? "location" : undefined}
                >
                  <span
                    className={`text-[10.5px] tabular-nums tracking-[0.1em] ${
                      isActive ? "text-white" : "text-white/35"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="tracking-[-0.005em]">{s.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
