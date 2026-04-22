import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { CtaSection } from "@/components/sections/cta";
import { GapSection } from "@/components/sections/gap";
import { ProgramSection } from "@/components/sections/program";
import { TerminationSection } from "@/components/sections/termination";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <GapSection />
        <ProgramSection />
        <TerminationSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
