import { FloatingStars } from "./floating-stars";
import { StarField } from "./star-field";

/**
 * Site-wide star layer that sits behind every page. Fixed to the
 * viewport so the whole field — dot stars plus four-point stars —
 * reads as a single consistent background, regardless of scroll
 * position or which route you're on.
 *
 * Everything inside is non-interactive and `pointer-events-none`; the
 * layer never captures clicks on real page content.
 */
export function StarBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <StarField density={0.00005} baseOpacity={0.42} maxStars={130} />
      <FloatingStars />
    </div>
  );
}
