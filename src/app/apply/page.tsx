import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationForm } from "@/components/apply/application-form";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

// Temporary kill-switch for the application flow. While `false`, /apply
// renders a flat hold state and POST /api/apply returns 503. Flip to
// `true` to bring the form (and the route below) back online — no other
// edits required. Keep the API route's flag in sync.
const APPLICATIONS_OPEN = false;

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to the University of Austin North Star program. Non-equity grants up to $50,000, mentor network, and monthly accountability reviews.",
};

export default function ApplyPage() {
  if (!APPLICATIONS_OPEN) {
    return (
      <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow text-mute">Apply</p>
        <h1 className="display-xl mt-4 text-balance">
          Applications are temporarily closed.
        </h1>
        <p className="mt-4 max-w-[44ch] text-balance text-[14px] leading-[1.6] text-mute">
          We’ll re-open applications soon. In the meantime, follow along on
          the splash page.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-9 items-center rounded-full bg-white px-5 text-[13px] font-medium tracking-[-0.01em] text-navy transition-colors hover:bg-white/90"
        >
          Back to splash
        </Link>
      </main>
    );
  }

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
              Reviewed by the North Star team. You’ll hear back within two
              weeks.
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
