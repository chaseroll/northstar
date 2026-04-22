import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Companies building out of North Star at the University of Austin. Cohort 01 is being selected.",
};

/**
 * Portfolio — holding page until Cohort 01 is announced.
 *
 * Honest empty state modelled on the Austin Fund "unresolved" grid:
 * six placeholder rows with the real row anatomy (index, two stacked
 * skeleton bars, a pill) — so the shape of the future portfolio is
 * visible without inventing company names.
 */

const PLACEHOLDERS = Array.from({ length: 6 }, (_, i) => i);

export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <main data-theme="light" className="bg-cream text-ink">
        <section className="relative pt-36 pb-16 md:pt-44 md:pb-20">
          <div className="shell mx-auto max-w-3xl text-center">
            <Reveal>
              <h1 className="display-xl text-balance">
                Who we <em className="display-em">back</em>.
              </h1>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="body-lg mx-auto mt-10 max-w-[52ch] text-balance text-ink-mute">
                Cohort 01 is being selected. Announced here at the start of
                the program.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="shell">
            <div className="mx-auto max-w-[680px]">
              <ul>
                {PLACEHOLDERS.map((i) => (
                  <Reveal key={i} delay={0.05 + i * 0.035}>
                    <li
                      aria-hidden
                      className="flex items-center gap-6 border-t border-ink-hair py-8 md:gap-10 md:py-10"
                    >
                      <span className="eyebrow-sm tabular-nums text-ink/20">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col gap-2">
                          <div className="h-5 w-40 rounded bg-ink/[0.07] md:w-56" />
                          <div className="h-3 w-52 rounded bg-ink/[0.045] md:w-72" />
                        </div>
                        <div className="h-5 w-16 rounded-full bg-ink/[0.06] md:w-20" />
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>

              <Reveal>
                <div
                  id="apply"
                  className="mt-24 flex flex-col items-center border-t border-ink-hair pt-20 text-center md:mt-32 md:pt-28"
                >
                  <h2 className="display-lg text-balance text-ink">
                    Apply to the{" "}
                    <em className="display-em">first cohort</em>.
                  </h2>
                  <p className="body-lg mt-6 max-w-[42ch] text-balance text-ink-mute">
                    Reviewed by the Executive Director of the Innovation Labs.
                  </p>
                  <Link
                    href="/apply"
                    className="mt-10 inline-flex h-12 items-center gap-3 rounded-full bg-ink px-7 text-[14px] font-medium tracking-[-0.005em] text-cream transition-colors hover:bg-ink/90"
                  >
                    Apply
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
