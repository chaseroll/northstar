import { Comets } from "./comets";
import { FloatingCompanies } from "./floating-companies";
import { FloatingStars } from "./floating-stars";
import { NorthStar } from "./north-star";
import { StarField } from "./star-field";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Stars, companies, comets, and glow — scoped to the hero's bounding box */}
      <StarField density={0.00011} baseOpacity={0.9} maxStars={260} />
      <FloatingStars />
      <FloatingCompanies />
      <Comets />

      <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
        <NorthStar size={780} className="-translate-y-4 opacity-95" />
      </div>

      <div className="shell relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <p className="eyebrow mb-10">
          A founders program at the University of Austin
        </p>

        <h1 className="display-xl text-balance">
          <span className="block">Follow the</span>
          <span className="block">NorthStar.</span>
        </h1>

        <p className="display-md mt-12 max-w-[28ch] text-balance text-white [text-shadow:0_0_28px_var(--color-navy),0_0_14px_var(--color-navy)]">
          A program whose sole purpose is to increase the number of
          venture-backable startups within the university.
        </p>
      </div>
    </section>
  );
}
