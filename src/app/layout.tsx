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
  metadataBase: new URL("https://northstar.uaustin.fund"),
  title: {
    default: "North Star",
    template: "%s · North Star",
  },
  description:
    "Non-dilutive capital for founders at the University of Austin.",
  openGraph: {
    title: "North Star",
    description:
      "Non-dilutive capital for founders at the University of Austin.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "North Star",
    description:
      "Non-dilutive capital for founders at the University of Austin.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
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
