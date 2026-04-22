import type { Metadata } from "next";
import { ApplicationForm } from "@/components/apply/application-form";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to the University of Austin North Star program. Non-equity grants up to $50,000, mentor network, and monthly accountability reviews.",
};

export default function ApplyPage() {
  return (
    <>
      <Nav />
      <main data-theme="light" className="bg-cream text-ink">
        <section className="relative pt-36 pb-16 md:pt-44 md:pb-20">
          <div className="shell mx-auto max-w-3xl text-center">
            <h1 className="display-xl text-balance">
              Apply to the{" "}
              <em className="display-em">first cohort</em>.
            </h1>
            <p className="body-lg mx-auto mt-10 max-w-[58ch] text-balance text-ink-mute">
              Reviewed by the Executive Director of the Innovation Labs.
              You’ll hear back within two weeks.
            </p>
          </div>
        </section>

        <div className="shell pb-28 md:pb-36">
          <ApplicationForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
