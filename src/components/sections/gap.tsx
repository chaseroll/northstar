import { Reveal } from "../reveal";

export function GapSection() {
  return (
    <section id="gap" className="section-y">
      <div className="shell mx-auto max-w-xl text-center">
        <Reveal>
          <p className="eyebrow mb-6">The gap</p>
        </Reveal>

        <Reveal delay={0.04}>
          <p className="display-md text-balance">
            The infrastructure supporting builders at UATX is underdeveloped.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="body mx-auto mt-8 max-w-[58ch] text-balance">
            Today there exists limited mentorship and a micro-grant program
            offering $1,000 to $5,000. Although necessary for early
            experimentation, this is not sufficient for producing
            venture-backable startups.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="body mx-auto mt-5 max-w-[58ch] text-balance text-white">
            There is a need for a program whose sole purpose is to increase
            the number of venture-backable startups within the university.
            NorthStar is the first step.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
