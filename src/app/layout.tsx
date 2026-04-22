import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { StarField } from "@/components/star-field";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://northstar.uaustin.org"),
  title: {
    default: "NorthStar — A founders program at the University of Austin",
    template: "%s · NorthStar",
  },
  description:
    "A program whose sole purpose is to increase the number of venture-backable startups within the university. Non-equity grants up to $50,000, a curated mentor network of 50+ practitioners, and monthly reviews with the Executive Director of the Innovation Labs.",
  openGraph: {
    title: "NorthStar — A founders program at the University of Austin",
    description:
      "Non-equity grants up to $50,000, 50+ mentors, and monthly progress reviews. Proposed by Joshua Strauss & Chase Roll.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NorthStar — A founders program at the University of Austin",
    description:
      "Non-equity grants up to $50,000. Applications reviewed by the Executive Director of the Innovation Labs.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-navy text-white font-sans selection:bg-white/20 selection:text-white">
        <StarField />
        {children}
      </body>
    </html>
  );
}
