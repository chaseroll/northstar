import { NorthStar } from "./north-star";

/**
 * Hero — full-viewport editorial splash.
 *
 * Layered (back → front):
 *   1. Global StarBackdrop (root layout) — ambient starfield
 *   2. NorthStar — central lens-flare guide star
 *   3. Copy — wordmark + italic subtext, centered on the star
 *
 * No floating companies, no comets, no chevron, no CTA.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      <div className="shell relative isolate mx-auto flex w-full max-w-3xl -translate-y-2 flex-col items-center text-center sm:-translate-y-4">
        <h1 className="display-xl relative z-10 text-balance">North Star</h1>

        <div aria-hidden className="relative mt-5 h-0 w-full">
          <div
            className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-95"
            style={{
              width: "min(86vmin, 780px)",
              aspectRatio: "1 / 1",
            }}
          >
            <NorthStar />
          </div>
        </div>

        <p
          className="relative z-10 mt-5 max-w-[42ch] text-balance text-white/90"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(18px, 1.7vw, 22px)",
            lineHeight: 1.55,
            fontStyle: "italic",
            textShadow:
              "0 0 18px rgba(7, 9, 22, 0.92), 0 0 8px rgba(7, 9, 22, 0.75), 0 1px 2px rgba(7, 9, 22, 0.6)",
          }}
        >
          Non-dilutive capital for founders at the University of Austin,
          before their first round.
        </p>
      </div>
    </section>
  );
}
