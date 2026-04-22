import { FloatingCompanies } from "@/components/floating-companies";
import { FloatingStars } from "@/components/floating-stars";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { CtaSection } from "@/components/sections/cta";
import { GapSection } from "@/components/sections/gap";
import { ProgramSection } from "@/components/sections/program";
import { StarField } from "@/components/star-field";

export default function Home() {
  return (
    <>
      {/* Starfield layers — splash-only, not in the root layout */}
      <StarField density={0.00011} baseOpacity={0.9} maxStars={260} />
      <FloatingStars />
      <FloatingCompanies />

      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <GapSection />
          <ProgramSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
