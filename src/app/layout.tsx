import type { Metadata, Viewport } from "next";
import { Outfit, Source_Serif_4, Geist_Mono } from "next/font/google";
import { StarBackdrop } from "@/components/star-backdrop";
import "./globals.css";

// YC's exact typographic stack: Source Serif 4 for display + italic emphasis
// (the "formidable founders" feel), Outfit for UI/body/nav/eyebrows. Geist
// Mono is retained only for the intentional "typewritten" prospectus and
// application cards — the one place the site leans monospace by design.
const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  axes: ["opsz"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://northstar.uaustin.org"),
  title: {
    default: "North Star — Funding the first build",
    template: "%s · North Star",
  },
  description:
    "Non-dilutive grants for first-time founders at the University of Austin. Up to $50K, operator mentors, and a stage at the Austin Fund Demo Day.",
  openGraph: {
    title: "North Star — Funding the first build",
    description:
      "Non-dilutive grants for first-time founders at the University of Austin. Up to $50K, operator mentors, and a stage at the Austin Fund Demo Day.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "North Star — Funding the first build",
    description:
      "Non-dilutive grants for first-time founders at the University of Austin. Up to $50K, operator mentors, and a stage at the Austin Fund Demo Day.",
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
      className={`${outfit.variable} ${sourceSerif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-navy text-white font-sans">
        <StarBackdrop />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
