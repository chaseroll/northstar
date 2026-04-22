import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Companies building out of North Star at the University of Austin. Cohort 01 is forthcoming.",
};

/**
 * Portfolio — splash layout populated with representative sample
 * companies so the page has real information density while the real
 * cohort is being selected. Every entry here is illustrative.
 */

type SampleCompany = {
  name: string;
  sector: string;
  description: string;
  founder: string;
  stage: string;
};

const SAMPLE_COMPANIES: readonly SampleCompany[] = [
  {
    name: "Foreland",
    sector: "Defense",
    description: "Maritime autonomy for offshore defense fleets.",
    founder: "Ana Reyes",
    stage: "Pre-seed",
  },
  {
    name: "Vesper",
    sector: "Developer tools",
    description: "Evaluation infrastructure for production AI agents.",
    founder: "Michael Tate",
    stage: "Pre-seed",
  },
  {
    name: "Meridian",
    sector: "Biotech",
    description: "Synthetic enzyme discovery at industrial scale.",
    founder: "Priya Shah",
    stage: "Seed",
  },
  {
    name: "Ridgeline",
    sector: "Crypto",
    description: "Self-custody primitives for institutional treasuries.",
    founder: "Ethan Cole",
    stage: "Pre-seed",
  },
  {
    name: "Cardinal",
    sector: "Robotics",
    description: "Vision systems for industrial inspection at scale.",
    founder: "Lena Park",
    stage: "Pre-seed",
  },
  {
    name: "Fathom",
    sector: "Hardware",
    description: "Subsea autonomy for offshore energy infrastructure.",
    founder: "Will Henriksen",
    stage: "Pre-seed",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative pt-36 pb-20 md:pt-44 md:pb-24">
          <div className="shell mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow mb-7">Portfolio · Cohort 01</p>
            </Reveal>
            <Reveal delay={0.04}>
              <h1 className="display-xl text-balance">Who we back</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body-lg mx-auto mt-10 max-w-[58ch] text-balance">
                The first North Star cohort is being selected. Admitted companies
                will be announced here at the start of the program, each with
                its founders, stage, and the milestones set by the Executive
                Director of the Innovation Labs. Representative sample below.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-y pt-0 md:pt-0">
          <div className="shell mx-auto max-w-5xl">
            <Reveal>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
                {SAMPLE_COMPANIES.map((company, i) => (
                  <article
                    key={company.name}
                    className="group relative flex aspect-square flex-col justify-between rounded-md border border-hair bg-navy-2/40 p-7 transition-colors hover:border-hair-strong"
                  >
                    <header className="flex items-start justify-between">
                      <span className="eyebrow-sm tabular-nums text-mute-2">
                        0{i + 1}
                      </span>
                      <span className="eyebrow-sm text-mute-2">
                        {company.stage}
                      </span>
                    </header>

                    <div>
                      <h3 className="display-sm text-white">{company.name}</h3>
                      <p className="body mt-2.5 max-w-[28ch] text-mute">
                        {company.description}
                      </p>
                    </div>

                    <footer className="flex items-baseline justify-between gap-3">
                      <span className="eyebrow text-mute-2">
                        {company.sector}
                      </span>
                      <span className="body text-[13px] text-mute-2">
                        {company.founder}
                      </span>
                    </footer>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-24 flex flex-col items-center gap-7 border-t border-hair pt-20 text-center md:mt-32 md:pt-24">
                <p className="eyebrow">Admission</p>
                <h2 className="display-lg text-balance">
                  The next name on this page could be yours
                </h2>
                <p className="body-lg mx-auto max-w-[58ch] text-balance">
                  Applications for Cohort 01 are open to University of Austin
                  students. One form, reviewed by the Executive Director of the
                  Innovation Labs.
                </p>
                <Link
                  href="/apply"
                  className="mt-3 inline-flex h-11 items-center rounded-full bg-white px-6 text-[14px] font-medium tracking-[-0.01em] text-navy transition-colors hover:bg-white/90"
                >
                  Apply to North Star
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
