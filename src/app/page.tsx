import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { CtaSection } from "@/components/sections/cta";
import { GapSection } from "@/components/sections/gap";
import { ProgramSection } from "@/components/sections/program";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <GapSection />
        <ProgramSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
