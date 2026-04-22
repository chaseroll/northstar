import { Reveal } from "../reveal";

const GROUNDS: readonly string[] = [
  "The Program Director may terminate a member’s participation if the member fails to demonstrate meaningful progress toward their milestones.",
  "If a member misappropriates funds, they are immediately and permanently disqualified from future participation in the North Star Program.",
];

export function TerminationSection() {
  return (
    <section id="standards" className="section-y">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow mb-7">Standards</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="display-lg text-balance">
              Two grounds for termination
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="body-lg mx-auto mt-12 max-w-[60ch] md:mt-14">
              Admission to North Star is not permanent — continued participation
              rests on two standards.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-20 max-w-3xl md:mt-24">
          <Reveal delay={0.15}>
            <ul className="mx-auto grid max-w-[66ch] gap-6 text-left md:gap-7">
              {GROUNDS.map((item, i) => (
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
      </div>
    </section>
  );
}
