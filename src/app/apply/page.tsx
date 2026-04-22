import type { Metadata } from "next";
import { ApplicationForm } from "@/components/apply/application-form";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to the University of Austin NorthStar program. Non-equity grants up to $50,000, mentor network, and monthly accountability reviews",
};

export default function ApplyPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative pt-36 pb-20 md:pt-44 md:pb-28">
          <div className="shell mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-6">Cohort 01 · Application</p>
            <h1 className="display-xl text-balance">Apply to NorthStar</h1>
            <p className="body mx-auto mt-8 max-w-[58ch] text-balance">
              One form. Nine short sections. Non-equity grants up to $50,000,
              a curated mentor network, and monthly accountability with the
              Executive Director of the Innovation Labs. Admission is by
              application and selection
            </p>
          </div>
        </section>

        <div className="shell mx-auto max-w-5xl pb-24">
          <ApplicationForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
