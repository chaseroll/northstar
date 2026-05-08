import { Comets } from "./comets";
import { FloatingCompanies } from "./floating-companies";
import { NorthStar } from "./north-star";

/**
 * Hero — full-viewport cosmic splash.
 *
 * Composition:
 *   1. Ambient backdrop: FloatingCompanies + Comets
 *   2. Star: NorthStar lens-flare, optical center on the same vertical
 *      line as the wordmark/subtext column (matching translate-y).
 *   3. Wordmark + subtext: stacked tight together so the splash reads
 *      as one block sitting on the star.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <FloatingCompanies />
      <Comets />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center"
      >
        <div
          className="-translate-y-2 opacity-95 sm:-translate-y-4"
          style={{
            width: "min(86vmin, 780px)",
            aspectRatio: "1 / 1",
          }}
        >
          <NorthStar />
        </div>
      </div>

      <div className="shell relative z-10 mx-auto flex w-full max-w-3xl -translate-y-2 flex-col items-center text-center sm:-translate-y-4">
        <h1 className="display-xl text-balance">North Star</h1>

        <p
          className="mt-6 max-w-[44ch] text-balance text-white/85 sm:mt-7"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--fs-body-lg)",
            lineHeight: 1.5,
          }}
        >
          Non-dilutive capital for founders at the University of Austin, before their first round.
        </p>
      </div>
    </section>
  );
}
