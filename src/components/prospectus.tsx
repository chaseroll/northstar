import Link from "next/link";
import { Reveal } from "./reveal";

/**
 * Prospectus — about + what fellows receive.
 *
 * Editorial about paragraph, then a clean bullet list of what the
 * program offers. No requirements, no rules, no expectations — just
 * what we do.
 */

const ABOUT =
  "North Star is a program for founders at the University of Austin. We back fellows with capital, mentorship, and a path to investors.";

const OFFERINGS: readonly string[] = [
  "Non-equity grants up to $50,000 per company, per year.",
  "Direct introductions to 50+ practitioner mentors.",
  "Monthly reviews with the North Star team.",
  "Demo Day to investors at the end of the program.",
];

export function Prospectus() {
  return (
    <section
      id="prospectus"
      data-theme="light"
      className="relative bg-cream text-ink section-y"
    >
      <div className="shell">
        <div className="mx-auto max-w-[680px]">
          <Reveal>
            <h2 className="display-md text-ink">About</h2>
            <p className="body-lg mt-6 text-pretty text-ink-mute">
              {ABOUT}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-14 space-y-4 text-[17px] leading-[1.7] text-ink md:mt-16 md:text-[18px]">
              {OFFERINGS.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="mt-[0.7em] h-[4px] w-[4px] shrink-0 rounded-full bg-ink-mute-2"
                  />
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <div
            id="apply"
            className="mx-auto mt-24 flex max-w-[680px] flex-col items-center border-t border-ink-hair pt-20 text-center md:mt-32 md:pt-28"
          >
            <h2 className="display-lg text-balance text-ink">
              Apply to the{" "}
              <em className="display-em">first cohort</em>.
            </h2>
            <p className="body-lg mt-6 max-w-[42ch] text-balance text-ink-mute">
              Reviewed by the North Star team.
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
    </section>
  );
}
