import { Cormorant_Garamond } from "next/font/google";
import { Comets } from "./comets";
import { FloatingCompanies } from "./floating-companies";
import { FloatingStars } from "./floating-stars";
import { NorthStar } from "./north-star";
import { StarField } from "./star-field";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Stars, companies, comets, and glow — scoped to the hero's bounding box */}
      <StarField density={0.00011} baseOpacity={0.9} maxStars={260} />
      <FloatingStars />
      <FloatingCompanies />
      <Comets />

      <div className="pointer-events-none absolute inset-0 z-[4] flex items-center justify-center [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_46%,rgba(0,0,0,0)_78%)]">
        <NorthStar size={780} className="-translate-y-4 opacity-95" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[52vh] bg-gradient-to-b from-transparent via-navy/92 to-navy"
      />

      <div className="pointer-events-none shell relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <p className="eyebrow mb-10 text-center text-white/80 [text-shadow:0_0_10px_var(--color-navy),0_0_4px_var(--color-navy)]">
          A founders program at the University of Austin
        </p>

        <h1
          className={`${cormorant.className} text-[clamp(58px,9vw,132px)] font-normal italic leading-[0.95] tracking-[-0.01em] text-white text-balance`}
        >
          <span className="block">Follow the</span>
          <span className="block">NorthStar</span>
        </h1>

        <p className="display-sm mt-12 max-w-[34ch] text-balance text-white/80 [text-shadow:0_0_10px_var(--color-navy),0_0_4px_var(--color-navy)]">
          A program whose sole purpose is to increase the number of
          venture-backable startups within the university
        </p>
      </div>
    </section>
  );
}
