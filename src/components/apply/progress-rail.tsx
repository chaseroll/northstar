"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string };

export function ProgressRail({ sections }: { sections: readonly Section[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.2, 0.5, 0.8, 1],
      },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const index = Math.max(
    1,
    sections.findIndex((s) => s.id === activeId) + 1,
  );
  const total = sections.length;
  const pct = total > 0 ? (index / total) * 100 : 0;

  return (
    <nav
      aria-label="Form sections"
      className="pointer-events-none fixed left-5 top-28 z-20 hidden w-44 xl:block"
    >
      <div className="pointer-events-auto flex flex-col gap-6">
        <div>
          <div className="flex items-baseline justify-between text-[10.5px] italic tracking-[0.18em] text-white/55">
            <span>Progress</span>
            <span className="tabular-nums text-white/40">
              {String(index).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-3 h-px w-full overflow-hidden bg-hair">
            <div
              className="h-full bg-white/70 transition-[width] duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <ol className="flex flex-col gap-3">
          {sections.map((s, i) => {
            const active = s.id === activeId;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`group flex items-baseline gap-3 text-[13.5px] leading-tight transition-colors ${
                    active ? "text-white" : "text-white/40 hover:text-white/75"
                  }`}
                >
                  <span
                    className={`tabular-nums text-[10.5px] transition-colors ${
                      active ? "text-white/60" : "text-white/25"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={active ? "italic" : ""}>{s.label}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
