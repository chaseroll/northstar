import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { ApplicationForm } from "@/components/apply/application-form";
import { ProgressRail } from "@/components/apply/progress-rail";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SECTIONS } from "./sections";
import "./apply.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

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
    <div className={`${cormorant.variable} apply-fancy bg-navy text-white`}>
      <Nav />
      <ProgressRail sections={SECTIONS} />
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
              One form. Seven short sections. Non-equity grants up to $50,000,
              a curated mentor network, and monthly accountability with the
              Executive Director of the Innovation Labs. Admission is by
              application and selection
            </p>

            <ul className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
              {STATS.map((s) => (
                <li
                  key={s.label}
                  className="group inline-flex cursor-default items-baseline gap-2 rounded-full border border-hair-strong bg-white/[0.01] px-4 py-1.5 text-[13px] transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/[0.06] hover:shadow-[0_10px_32px_-8px_rgba(255,255,255,0.22)]"
                >
                  <span className="italic tracking-[0.12em] text-white/50 transition-colors duration-300 group-hover:text-white/80">
                    {s.label}
                  </span>
                  <span className="text-white/25 transition-colors duration-300 group-hover:text-white/50">
                    ·
                  </span>
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
