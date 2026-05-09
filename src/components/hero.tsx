import { NorthStar } from "./north-star";

/**
 * Hero — full-viewport editorial splash.
 *
 * Layered (back → front):
 *   1. Global StarBackdrop (root layout) — ambient starfield
 *   2. NorthStar — central lens-flare guide star
 *   3. Copy — serif wordmark + sans subtext, centered on the star
 *
 * No floating companies, no comets, no chevron, no CTA.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      <div className="shell relative isolate mx-auto flex w-full max-w-3xl -translate-y-2 flex-col items-center text-center sm:-translate-y-4">
        <h1
          className="display-xl relative z-10 text-balance"
          style={{
            textShadow:
              "0 0 36px rgba(0, 0, 0, 0.7), 0 0 14px rgba(0, 0, 0, 0.5)",
          }}
        >
          North Star
        </h1>

        <div aria-hidden className="relative mt-5 h-0 w-full">
          <div
            className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-95"
            style={{
              width: "min(100vmin, 780px)",
              aspectRatio: "1 / 1",
            }}
          >
            <NorthStar />
          </div>
        </div>

        <p
          className="relative z-10 mt-6 max-w-[44ch] text-balance text-white/85"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.2vw, 17px)",
            fontWeight: 400,
            lineHeight: 1.6,
            letterSpacing: "-0.005em",
            textShadow:
              "0 0 14px rgba(0, 0, 0, 0.75), 0 0 5px rgba(0, 0, 0, 0.55)",
          }}
        >
          Non-dilutive capital for founders at the University of Austin.
        </p>
      </div>
    </section>
  );
}
