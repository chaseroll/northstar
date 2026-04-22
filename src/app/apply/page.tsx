import type { Metadata } from "next";
import { ApplicationForm } from "@/components/apply/application-form";
import { ProgressRail } from "@/components/apply/progress-rail";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SECTIONS } from "./sections";
import "./apply.css";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to the University of Austin NorthStar program. Non-equity grants up to $50,000, mentor network, and monthly accountability reviews",
};

const STATS: { label: string; value: string }[] = [
  { label: "Cohort", value: "01" },
  { label: "Grant", value: "Up to $50,000" },
  { label: "Review", value: "Rolling · within two weeks" },
];

export default function ApplyPage() {
  return (
    <div className="font-general-sans bg-navy text-white">
      <Nav />
      <main>
        <section className="relative pt-36 pb-14 md:pt-44 md:pb-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
              Cohort 01 · Application
            </p>
            <h1 className="mt-6 text-[clamp(52px,8vw,108px)] font-medium leading-[0.98] tracking-[-0.028em] text-white text-balance">
              Apply to NorthStar
            </h1>
            <p className="mx-auto mt-8 max-w-[58ch] text-[16.5px] leading-[1.6] text-white/60 text-balance">
              One form. Nine short sections. Non-equity grants up to $50,000,
              a curated mentor network, and monthly accountability with the
              Executive Director of the Innovation Labs. Admission is by
              application and selection
            </p>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {STATS.map((s) => (
                <li
                  key={s.label}
                  className="inline-flex items-baseline gap-2 rounded-full border border-hair-strong px-4 py-1.5 text-[12px]"
                >
                  <span className="uppercase tracking-[0.14em] text-white/45">
                    {s.label}
                  </span>
                  <span className="text-white/25">·</span>
                  <span className="text-white">{s.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
          <div className="grid grid-cols-12 gap-x-10 gap-y-8">
            <aside className="col-span-12 lg:col-span-3">
              <ProgressRail sections={SECTIONS} />
            </aside>
            <div className="col-span-12 lg:col-span-9">
              <ApplicationForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
