import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StarBackdrop } from "@/components/star-backdrop";
import "./globals.css";

// Single type family: Geist (variable weight 100–900) for everything —
// wordmark, display, and body. Geist Mono is the only accent, reserved
// for eyebrow/meta labels. Two fonts total, YC-style minimalism.
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

export const metadata: Metadata = {
  metadataBase: new URL("https://northstar.uaustin.org"),
  title: {
    default: "North Star — A founders program at the University of Austin",
    template: "%s · North Star",
  },
  description:
    "A program whose sole purpose is to increase the number of venture-backable startups within the university. Non-equity grants up to $50,000, a curated mentor network of 50+ practitioners, and monthly reviews with the Executive Director of the Innovation Labs.",
  openGraph: {
    title: "North Star — A founders program at the University of Austin",
    description:
      "Non-equity grants up to $50,000, 50+ mentors, and monthly progress reviews. Proposed by Chase Roll & Joshua Strauss.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "North Star — A founders program at the University of Austin",
    description:
      "Non-equity grants up to $50,000. Applications reviewed by the Executive Director of the Innovation Labs.",
  },
};

export const viewport: Viewport = {
  themeColor: "#05091a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-navy text-white font-sans selection:bg-white/20 selection:text-white">
        <StarBackdrop />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
