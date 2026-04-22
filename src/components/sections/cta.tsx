import { InterestForm } from "../interest-form";
import { Reveal } from "../reveal";

export function CtaSection() {
  return (
    <section id="apply" className="section-y">
      <div className="shell mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="eyebrow mb-6">Admission</p>
        </Reveal>

        <Reveal delay={0.04}>
          <h2 className="display-lg text-balance">
            Build something worth following.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="body mx-auto mt-6 max-w-[52ch] text-balance">
            Admission into the program is determined by an application and
            selection process managed by the Executive Director of the
            Innovation Labs. Leave your email and we’ll send it when
            applications open.
          </p>
        </Reveal>

        <InterestForm />
      </div>
    </section>
  );
}
