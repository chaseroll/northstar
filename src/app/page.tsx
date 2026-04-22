import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Prospectus } from "@/components/prospectus";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Prospectus />
      </main>
      <Footer />
    </>
  );
}
