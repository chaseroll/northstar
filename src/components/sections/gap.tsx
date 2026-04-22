import { Reveal } from "../reveal";

export function GapSection() {
  return (
    <section id="gap" className="section-y">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow mb-7">The gap</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="display-lg text-balance">
              The infrastructure supporting builders at UATX is underdeveloped
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-12 max-w-[60ch] space-y-6 md:mt-14">
              <p className="body-lg">
                Today there exists limited mentorship and a micro-grant program
                offering $1,000 to $5,000. Although necessary for early
                experimentation, this is not sufficient for producing
                venture-backable startups.
              </p>

              <p className="body-lg">
                There is a need for a program whose sole purpose is to increase
                the number of venture-backable startups within the university.
                North Star is the first step.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
