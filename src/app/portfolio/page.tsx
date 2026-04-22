import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const COMPANIES: Array<{
  name: string;
  url: string;
  description: string;
  founders: string;
}> = [
  {
    name: "GumGauge Dental",
    url: "https://gumgaugedental.com",
    description:
      "GumGauge is a light-based periodontal scanning device paired with an AI diagnostic engine that gives dentists an objective, reproducible way to catch gum disease early",
    founders: "Joshua Strauss",
  },
  {
    name: "Nemora",
    url: "https://nemora.app",
    description:
      "Nemora is an AI-assisted journaling product that connects reflective writing with scripture-based prompts and responses.",
    founders: "Chase Roll",
  },
  {
    name: "Oros Hydration",
    url: "https://getoros.com",
    description:
      "Oros Hydration is building a smart hydration system that tracks intake and helps personalize electrolyte delivery.",
    founders: "Jack Erickson, Aithan Bezanson",
  },
  {
    name: "OptionsAI",
    url: "https://optionsai.com",
    description:
      "OptionsAI is a visual options-trading platform that helps users model, compare, and manage options strategies.",
    founders: "Pierce Crist",
  },
  {
    name: "Reading Rooms",
    url: "https://readingrooms.org",
    description:
      "Reading Rooms is an education platform designed to strengthen reading and writing outcomes with AI-assisted learning support.",
    founders: "Almar Alexandrovich, Max Apression",
  },
  {
    name: "ResearchDocAI",
    url: "https://researchdocai.com",
    description:
      "ResearchDocAI provides AI-assisted analysis tools for research papers and technical documents.",
    founders: "Nicole Kargin",
  },
  {
    name: "SpecScout",
    url: "https://specscout.org",
    description:
      "SpecScout delivers AI-powered natural-language search for equipment specifications with citation-backed results for field teams.",
    founders: "Myles Shetty",
  },
  {
    name: "Texas Film Scene",
    url: "https://filmscenetexas.com",
    description:
      "Texas Film Scene is a talent-and-opportunity platform connecting Texas actors, crew, and creators to casting and industry opportunities.",
    founders: "Danielle Guilbot",
  },
  {
    name: "Urban Pulse",
    url: "https://urbanpulsemapping.com",
    description:
      "Urban Pulse Mapping is a crowdsourced urban-tree mapping and analytics platform for climate-resilient city planning.",
    founders: "Myles Shetty, Pierce Crist, Seth Sanders",
  },
  {
    name: "ZenQuill",
    url: "https://zenquill.ai",
    description:
      "ZenQuill is an AI-powered mental training app for athletes centered on guided journaling, coaching, and resilience tracking.",
    founders: "Tony Udotong",
  },
];

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Previous companies in cohort",
};

export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <main className="section-y">
        <div className="shell mx-auto max-w-6xl text-center">
          <p className="eyebrow mb-6">Portfolio</p>
          <h1
            className={`text-[clamp(58px,9vw,132px)] font-normal italic leading-[0.95] tracking-[-0.01em] text-white text-balance ${cormorant.className}`}
          >
            The NorthStar Portfolio
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60">
            Alumni companies with links, one-line overviews, and founding
            teams.
          </p>

          <div className="mx-auto mt-12 max-w-6xl rounded-[22px] border border-white/15 bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-2 shadow-[0_24px_80px_-48px_rgba(255,255,255,0.35)]">
            <div className="hidden overflow-hidden rounded-[16px] border border-white/10 bg-navy/40 text-left backdrop-blur-sm md:block">
              <table className="w-full border-collapse">
                <thead className="bg-white/[0.045]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[11px] tracking-[0.16em] text-white/60 uppercase">
                      Company
                    </th>
                    <th className="px-6 py-4 text-left text-[11px] tracking-[0.16em] text-white/60 uppercase">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-[11px] tracking-[0.16em] text-white/60 uppercase">
                      Founders
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPANIES.map((company, index) => (
                    <tr
                      key={company.name}
                      className={`border-t border-white/10 transition-colors hover:bg-white/[0.06] ${
                        index % 2 === 0 ? "bg-white/[0.01]" : "bg-transparent"
                      }`}
                    >
                      <td className="px-6 py-4 align-top">
                        <a
                          href={company.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex text-[15px] font-medium text-white underline-offset-4 transition-colors hover:text-white/80 hover:underline"
                        >
                          {company.name}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-[14px] leading-[1.6] text-white/68 align-top">
                        {company.description}
                      </td>
                      <td className="px-6 py-4 text-[14px] leading-[1.6] text-white/80 align-top">
                        {company.founders}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 text-left md:hidden">
              {COMPANIES.map((company) => (
                <article
                  key={company.name}
                  className="rounded-2xl border border-white/12 bg-white/[0.03] px-4 py-4"
                >
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[16px] font-medium text-white underline-offset-4 hover:underline"
                  >
                    {company.name}
                  </a>
                  <p className="mt-2 text-[14px] leading-[1.6] text-white/68">
                    {company.description}
                  </p>
                  <p className="mt-3 text-[12px] tracking-[0.12em] text-white/50 uppercase">
                    Founders
                  </p>
                  <p className="mt-1 text-[14px] text-white/80">
                    {company.founders}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
