import type { Metadata } from "next";
import { Geist_Mono, Fraunces } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const generalSans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/GeneralSans-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/GeneralSans-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
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
      className={`${generalSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-navy text-white font-sans selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
