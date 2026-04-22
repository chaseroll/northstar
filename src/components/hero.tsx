import { Comets } from "./comets";
import { NorthStar } from "./north-star";
import { StarField } from "./star-field";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <StarField />
      <Comets />

      <div className="shell relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <p className="eyebrow mb-10">
          A founders program at the University of Austin
        </p>

        <NorthStar size={120} className="mb-10" />

        <h1 className="display-xl text-balance">
          <span className="block">Follow the</span>
          <span className="block">NorthStar.</span>
        </h1>

        <p className="body mt-10 max-w-[38ch] text-balance">
          A program whose sole purpose is to increase the number of
          venture-backable startups within the university.
        </p>
      </div>
    </section>
  );
}
