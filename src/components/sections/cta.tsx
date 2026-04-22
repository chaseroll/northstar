import { Cormorant_Garamond } from "next/font/google";
import { InterestForm } from "../interest-form";
import { Reveal } from "../reveal";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export function CtaSection() {
  return (
    <section id="apply" className="section-y">
      <div className="shell mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="eyebrow mb-6">Admission</p>
        </Reveal>

        <Reveal delay={0.04}>
          <h2
            className={`display-lg text-[clamp(50px,6.2vw,82px)] leading-[1.02] text-balance ${cormorant.className}`}
          >
            Build something worth following
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="body mx-auto mt-6 max-w-[52ch] text-balance">
            Admission into the program is determined by an application and
            selection process managed by the Executive Director of the
            Innovation Labs. Companies must be incorporated to receive
            capital; NorthStar covers the cost upon acceptance.
          </p>
        </Reveal>

        <InterestForm />
      </div>
    </section>
  );
}
