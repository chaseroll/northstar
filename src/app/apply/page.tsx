import type { Metadata } from "next";
import { ApplicationForm } from "@/components/apply/application-form";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
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
    <div className="apply-fancy bg-navy text-white">
      <Nav />
      <main className="text-center">
        <section className="relative pt-36 pb-14 md:pt-44 md:pb-20">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-[12px] italic tracking-[0.18em] text-white/55">
              Cohort 01 · Application
            </p>
            <h1 className="mt-6 text-[clamp(58px,9vw,132px)] font-normal italic leading-[0.95] tracking-[-0.01em] text-white text-balance">
              Apply to NorthStar
            </h1>
            <p className="mx-auto mt-10 max-w-[50ch] text-[20px] leading-[1.55] text-white/75 text-balance">
              One form. Nine short sections. Non-equity grants up to $50,000,
              a curated mentor network, and monthly accountability with the
              Executive Director of the Innovation Labs. Admission is by
              application and selection
            </p>

            <ul className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
              {STATS.map((s) => (
                <li
                  key={s.label}
                  className="inline-flex items-baseline gap-2 rounded-full border border-hair-strong px-4 py-1.5 text-[13px]"
                >
                  <span className="italic tracking-[0.12em] text-white/50">
                    {s.label}
                  </span>
                  <span className="text-white/25">·</span>
                  <span className="text-white">{s.value}</span>
                </li>
              ))}
            </ul>

            <div
              aria-hidden
              className="mx-auto mt-16 h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>
        </section>

        <div className="mx-auto w-full max-w-2xl px-6 pb-24">
          <ApplicationForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
