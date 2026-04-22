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
      "Companies must be incorporated prior to disbursement of funds.",
      "The initial grant size is set by the Executive Director based on stage, scope, and capital need.",
      "Additional funds are unlocked upon demonstrated progress or justified need.",
      "The overall program budget and grant parameters are approved by the Executive Director, UATX CFO, and General Counsel at the start of each cycle.",
    ],
  },
  {
    id: "mentors",
    eyebrow: "NorthStar Mentor Network",
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
  {
    id: "termination",
    eyebrow: "Termination policy",
    meta: "Governance",
    stat: "Two grounds",
    lede: "The bar for remaining in the program.",
    items: [
      "The Program Director may terminate a member’s participation if the member fails to demonstrate meaningful progress toward their milestones.",
      "If a member misappropriates funds, they are immediately and permanently disqualified from future participation in the NorthStar Program.",
    ],
  },
];

export function ProgramSection() {
  return (
    <section id="program" className="section-y">
      <div className="shell">
        <div className="mx-auto mb-16 max-w-xl text-center md:mb-24">
          <Reveal>
            <p className="eyebrow mb-6">The proposal</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-lg text-balance">
              Three instruments and a governing bar.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body mx-auto mt-6 max-w-[56ch] text-balance">
              Students admitted to NorthStar receive non-equity grants of up
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
    <div className="border-t border-hair py-16 first:border-t-0 first:pt-0 md:py-24 md:first:pt-0">
      <Reveal className="grid grid-cols-12 gap-x-8 gap-y-8">
        <div className="col-span-12 flex items-baseline justify-between gap-4 md:col-span-3 md:flex-col md:items-start md:justify-start md:gap-3">
          <p className="eyebrow">
            <span className="mr-2 text-mute-2 tabular-nums">
              0{index + 1}
            </span>
            {eyebrow}
          </p>
          <p className="eyebrow text-mute-2">{meta}</p>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-4">
          <p className="display-md text-balance">{stat}</p>
          <p className="body-lg mt-4 max-w-[48ch] text-white">{lede}</p>

          <ul className="mt-10 divide-y divide-hair border-y border-hair">
            {items.map((item, i) => (
              <li
                key={i}
                className="flex gap-6 py-5 md:gap-8 md:py-6"
              >
                <span className="eyebrow mt-1.5 shrink-0 !text-[10.5px] tabular-nums text-mute-2">
                  0{i + 1}
                </span>
                <p className="body-lg max-w-[62ch] text-balance text-mute">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
