import Link from "next/link";
import { Reveal } from "./reveal";

/**
 * Prospectus — editorial "paper" section under the hero.
 *
 * The hero already names the program; the sections below say what it
 * does. No middle About layer, no pitch sentences, no marketing
 * adjectives. Each section is a serif stat, a one-line lede, and
 * (where it matters) a short bulleted list of facts.
 */

type BulletItem = string;

type Section = {
  id: string;
  stat: string;
  lede: string;
  items?: readonly BulletItem[];
};

const SECTIONS: readonly Section[] = [
  {
    id: "capital",
    stat: "Up to $50,000",
    lede: "Non-equity, per company, per year.",
    items: [
      "Companies must be incorporated before funds are released. North Star covers the cost.",
      "Grant size is set by the Executive Director based on stage, scope, and need.",
      "Additional funds follow demonstrated progress.",
    ],
  },
  {
    id: "mentors",
    stat: "50+ practitioners",
    lede: "You are introduced to mentors based on what you’re building.",
  },
  {
    id: "accountability",
    stat: "Monthly reviews",
    lede: "With the Executive Director of the Innovation Labs, for the duration of the program.",
    items: [
      "On a set date each month.",
      "Fellows are expected to hit the milestones the Program Director sets.",
    ],
  },
  {
    id: "demo-day",
    stat: "Demo Day",
    lede: "Fellows present to investors at the end of the program.",
  },
  {
    id: "standards",
    stat: "Admission is not permanent.",
    lede: "Members can be removed for two reasons:",
    items: [
      "Failure to make progress on their milestones.",
      "Misappropriation of funds — permanently disqualifying.",
    ],
  },
];

export function Prospectus() {
  return (
    <section
      id="prospectus"
      data-theme="light"
      className="relative bg-cream text-ink section-y"
    >
      <div className="shell">
        <div className="mx-auto max-w-[680px] space-y-14 md:space-y-20">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.04}>
              <SectionBlock section={s} />
            </Reveal>
          ))}
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
    </section>
  );
}

function SectionBlock({ section }: { section: Section }) {
  const { id, stat, lede, items } = section;
  return (
    <section id={id}>
      <h2 className="display-md text-ink">{stat}</h2>
      <p className="mt-3 text-[17px] leading-[1.6] text-ink-mute md:text-[18px]">
        {lede}
      </p>
      {items ? <Bullets items={items} /> : null}
    </section>
  );
}

function Bullets({ items }: { items: readonly BulletItem[] }) {
  return (
    <ul className="mt-6 space-y-3 text-[16px] leading-[1.7] text-ink-mute md:text-[17px]">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-4">
          <span
            aria-hidden
            className="mt-[0.75em] h-[3px] w-[3px] shrink-0 rounded-full bg-ink-mute-2"
          />
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}
