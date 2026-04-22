import { Comets } from "./comets";
import { FloatingCompanies } from "./floating-companies";
import { NorthStar } from "./north-star";

/**
 * Hero — full-viewport cosmic splash.
 *
 * Layered (back → front):
 *   1. FloatingCompanies — ambient brand chips with cursor-proximity glow
 *   2. Comets — slow drift accent
 *   3. NorthStar — central lens-flare guide star
 *   4. Copy — wordmark + program lede, centered in the shell
 *
 * `min-h-[100svh]` pins the splash to the full small-viewport height
 * so it never collapses under mobile browser chrome.
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

      <div className="shell relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <h1 className="display-xl text-balance">North Star</h1>

        <p className="body mt-8 max-w-[42ch] text-balance text-mute sm:mt-10">
          A founders program at the University of Austin.
        </p>
      </div>
    </section>
  );
}
