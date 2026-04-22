import { InterestForm } from "../interest-form";
import { Reveal } from "../reveal";

export function CtaSection() {
  return (
    <section id="apply" className="section-y">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow mb-7">Admission</p>
          </Reveal>

          <Reveal delay={0.04}>
            <h2 className="display-lg text-balance">
              Apply to the first cohort
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="body-lg mx-auto mt-12 max-w-[60ch] md:mt-14">
              Admission into the program is determined by an application and
              selection process managed by the Executive Director of the
              Innovation Labs. Companies must be incorporated to receive
              capital; North Star covers the cost upon acceptance.
            </p>
          </Reveal>

          <InterestForm />
        </div>
      </div>
    </section>
  );
}
