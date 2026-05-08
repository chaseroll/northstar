import Link from "next/link";
import { Reveal } from "./reveal";

/**
 * Prospectus — editorial thesis + what fellows receive.
 *
 * Single declarative paragraph that names every deliverable in prose,
 * mirroring the Austin Fund Mission section. No bullets — bullets
 * always read like a deck; prose reads like a thesis. The Apply
 * CTA below is set off by a hairline rule.
 */

const ABOUT =
  "North Star backs founders at the University of Austin before their first round. Fellows receive non-dilutive grants of up to $50K per year, direct introductions to a network of operator mentors, and an invitation to present at the Austin Fund Demo Day in front of partnered founders, angels, and VC's.";

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
            <h2 className="display-md text-balance text-ink">
              Funding the{" "}
              <em className="display-em">first build</em>.
            </h2>
            <p className="body-lg mt-6 text-pretty text-ink-mute">
              {ABOUT}
            </p>
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
              Open call. Reviewed by the North Star team.
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
