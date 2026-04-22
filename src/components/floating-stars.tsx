import { StarMark } from "./star-mark";

/**
 * FloatingStars — decorative four-point stars scattered across the
 * viewport. Sits inside the global `StarBackdrop` so the stars stay
 * fixed to the viewport alongside the dot starfield, reading as a
 * single star layer behind every page.
 *
 * Non-interactive on purpose: this is atmosphere, not content. Any
 * hover/pointer events are disabled so stars never intercept clicks
 * on real page content. `mobile: true` stars are shown at all widths;
 * the rest unhide at md and above so phones aren't too dense.
 */
type Star = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  mobile: boolean;
};

const STARS: Star[] = [
  { x: 10, y: 35, size: 12, opacity: 0.45, mobile: true },
  { x: 35, y: 25, size: 10, opacity: 0.35, mobile: false },
  { x: 58, y: 30, size: 15, opacity: 0.55, mobile: false },
  { x: 80, y: 38, size: 12, opacity: 0.42, mobile: true },
  { x: 18, y: 58, size: 13, opacity: 0.48, mobile: false },
  { x: 50, y: 60, size: 17, opacity: 0.58, mobile: false },
  { x: 67, y: 50, size: 11, opacity: 0.4, mobile: false },
  { x: 95, y: 48, size: 13, opacity: 0.48, mobile: true },
  { x: 8, y: 88, size: 10, opacity: 0.35, mobile: true },
  { x: 45, y: 82, size: 14, opacity: 0.52, mobile: false },
  { x: 66, y: 88, size: 11, opacity: 0.42, mobile: false },
  { x: 88, y: 92, size: 13, opacity: 0.48, mobile: true },
  { x: 24, y: 42, size: 10, opacity: 0.35, mobile: false },
  { x: 74, y: 72, size: 12, opacity: 0.45, mobile: false },
];

export function FloatingStars() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {STARS.map((star, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 ${
            star.mobile ? "" : "hidden md:block"
          }`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        >
          <StarMark className="h-full w-full text-white" />
        </div>
      ))}
    </div>
  );
}
