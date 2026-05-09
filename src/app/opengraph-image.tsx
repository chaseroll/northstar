import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "North Star · Non-dilutive capital for founders at the University of Austin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Source Serif 4 (display + italic) and Outfit (UI) match the live site.
// We ship a generous ASCII subset so future copy tweaks don't break the
// render even though the current layout uses very few glyphs.
const FONT_TEXT =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,-·+";

async function loadGoogleFont(family: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error(`Failed to load font: ${family}`);
  return (await fetch(match[1])).arrayBuffer();
}

export default async function Image() {
  const [serifNormal, serifItalic, outfitMedium] = await Promise.all([
    loadGoogleFont("Source+Serif+4:wght@400", FONT_TEXT),
    loadGoogleFont("Source+Serif+4:ital,wght@1,400", FONT_TEXT),
    loadGoogleFont("Outfit:wght@500", FONT_TEXT),
  ]);

  // A small, deterministic scatter of "+" glyphs and dots — echoes the
  // splash starfield but never overwhelms the wordmark.
  const scatter: Array<{
    x: number;
    y: number;
    type: "plus" | "dot";
    size: number;
    opacity: number;
  }> = [
    { x: 110, y: 90, type: "plus", size: 14, opacity: 0.18 },
    { x: 1040, y: 70, type: "dot", size: 3, opacity: 0.35 },
    { x: 220, y: 480, type: "dot", size: 2, opacity: 0.4 },
    { x: 980, y: 520, type: "plus", size: 12, opacity: 0.16 },
    { x: 60, y: 320, type: "dot", size: 2, opacity: 0.3 },
    { x: 1130, y: 360, type: "dot", size: 4, opacity: 0.28 },
    { x: 870, y: 130, type: "plus", size: 10, opacity: 0.14 },
    { x: 320, y: 70, type: "dot", size: 2, opacity: 0.32 },
    { x: 180, y: 560, type: "plus", size: 9, opacity: 0.13 },
    { x: 760, y: 580, type: "dot", size: 3, opacity: 0.3 },
    { x: 420, y: 540, type: "dot", size: 2, opacity: 0.28 },
    { x: 1080, y: 240, type: "plus", size: 11, opacity: 0.15 },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#03061a",
          padding: "72px 80px",
          fontFamily: "Source Serif 4",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* Scattered starfield glyphs */}
        {scatter.map((g, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              position: "absolute",
              top: g.y,
              left: g.x,
              width: g.type === "dot" ? g.size : 24,
              height: g.type === "dot" ? g.size : 24,
              alignItems: "center",
              justifyContent: "center",
              color: `rgba(255,255,255,${g.opacity})`,
              fontFamily: "Outfit",
              fontWeight: 500,
              fontSize: g.size,
              borderRadius: g.type === "dot" ? g.size : 0,
              background:
                g.type === "dot" ? `rgba(255,255,255,${g.opacity})` : "transparent",
              lineHeight: 1,
            }}
          >
            {g.type === "plus" ? "+" : ""}
          </div>
        ))}

        {/* Lens-flare star centered above wordmark */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 90,
            left: 600 - 200,
            width: 400,
            height: 320,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="400"
            height="320"
            viewBox="0 0 400 320"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="bloom" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.18" />
                <stop offset="70%" stopColor="#ffffff" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#03061a" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <linearGradient
                id="vBeam"
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.65" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="65%" stopColor="#ffffff" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="hBeam"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="65%" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Soft outer bloom */}
            <ellipse cx="200" cy="160" rx="200" ry="160" fill="url(#bloom)" />

            {/* Vertical beam: tapered via gradient stops, ~8px wide × 320px tall */}
            <rect
              x="196"
              y="0"
              width="8"
              height="320"
              fill="url(#vBeam)"
              rx="3"
            />

            {/* Horizontal beam: ~6px tall × 220px wide */}
            <rect
              x="90"
              y="157"
              width="220"
              height="6"
              fill="url(#hBeam)"
              rx="2.5"
            />

            {/* Tiny hot core */}
            <circle cx="200" cy="160" r="14" fill="url(#core)" />
            <circle
              cx="200"
              cy="160"
              r="3"
              fill="#ffffff"
              fillOpacity="1"
            />
          </svg>
        </div>

        {/* Center column: wordmark + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 200,
            gap: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Source Serif 4",
              fontWeight: 400,
              fontSize: 168,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: "#ffffff",
            }}
          >
            North Star
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Source Serif 4",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 28,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.85)",
              maxWidth: 880,
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            Non-dilutive capital for founders at the University of Austin.
          </div>
        </div>

        {/* Bottom meta */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 56,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Outfit",
              fontWeight: 500,
              fontSize: 18,
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            northstar.uaustin.fund
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Source Serif 4",
          data: serifNormal,
          weight: 400,
          style: "normal",
        },
        {
          name: "Source Serif 4",
          data: serifItalic,
          weight: 400,
          style: "italic",
        },
        { name: "Outfit", data: outfitMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
