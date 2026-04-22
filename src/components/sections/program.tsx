import { Reveal } from "../reveal";

type Subsection = {
  id: string;
  eyebrow: string;
  meta: string;
  stat: string;
  lede: string;
  items: readonly string[];
};

const SUBSECTIONS: readonly Subsection[] = [
  {
    id: "capital",
    eyebrow: "Capital",
    meta: "Grant structure",
    stat: "Up to $50,000",
    lede: "Non-equity funding per company, per year.",
    items: [
      "Companies must be incorporated prior to disbursement of funds — incorporation costs are covered by the program upon acceptance.",
      "The initial grant size is set by the Executive Director based on stage, scope, and capital need.",
      "Additional funds are unlocked upon demonstrated progress or justified need.",
      "The overall program budget and grant parameters are approved by the Executive Director, UATX CFO, and General Counsel at the start of each cycle.",
    ],
  },
  {
    id: "mentors",
    eyebrow: "North Star Mentor Network",
    meta: "Mentorship",
    stat: "50+ practitioners",
    lede: "A curated network, actively matched to what you are building.",
    items: [
      "Managed by the Innovation Labs Director of Student Engagement.",
      "A curated network of 50+ practitioners across industries, each committed to mentoring founders in the program.",
      "Fellows are actively matched with mentors based on what they are building — not left to find connections on their own.",
    ],
  },
  {
    id: "accountability",
    eyebrow: "Accountability",
    meta: "Cadence",
    stat: "Monthly reviews",
    lede: "Progress checks for the duration of the program.",
    items: [
      "After the first month, each member meets once a month with the Executive Director of the Innovation Labs for progress checks, on a set date, for the duration of the program.",
      "By the end of the program, each member is expected to have reached their personalized milestones set by the Program Director.",
    ],
  },
];

export function ProgramSection() {
  return (
    <section id="program" className="section-y">
      <div className="shell">
        <div className="mx-auto mb-24 max-w-3xl text-center md:mb-32">
          <Reveal>
            <p className="eyebrow mb-7">The proposal</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-lg text-balance">
              What the program provides
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-lg mx-auto mt-12 max-w-[60ch] md:mt-14">
              Students admitted to North Star receive non-equity grants of up
              to $50,000, exclusive introductions to a network of mentors, and
              an accountability structure that keeps them on track.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-5xl">
          {SUBSECTIONS.map((s, i) => (
            <ProgramBlock key={s.id} subsection={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramBlock({
  subsection,
  index,
}: {
  subsection: Subsection;
  index: number;
}) {
  const { eyebrow, meta, stat, lede, items } = subsection;
  return (
    <div className="border-t border-hair py-20 first:border-t-0 first:pt-0 md:py-24 md:first:pt-0">
      <Reveal>
        <p className="eyebrow tabular-nums text-mute-2">
          {String(index + 1).padStart(2, "0")} · {eyebrow}
          <span className="text-mute"> / {meta}</span>
        </p>
        <p className="display-md mt-8 text-balance">{stat}</p>
        <p className="body-lg mt-5 max-w-[62ch]">{lede}</p>
      </Reveal>

      <Reveal delay={0.08}>
        <ul className="mt-10 grid max-w-[66ch] gap-5 md:mt-12 md:gap-6">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3.5">
              <span
                aria-hidden
                className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-white/45"
              />
              <p className="body-lg text-white/80">{item}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
