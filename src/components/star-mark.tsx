/**
 * StarMark — four-point sparkle with concave waist, used as the brand lockup
 * next to the "North Star" wordmark in the nav and footer.
 *
 * Geometry: an asymmetric sparkle (longer vertical axis than horizontal) so
 * it reads as a guide star, not a compass rose. The concave inner waist at
 * ±1.6 units gives the points that "pinched" look that makes the shape feel
 * crafted rather than drawn with a ruler.
 */
export function StarMark({
  className = "",
  "aria-hidden": ariaHidden = true,
}: {
  className?: string;
  "aria-hidden"?: boolean;
}) {
  return (
    <svg
      viewBox="-10 -10 20 20"
      className={className}
      aria-hidden={ariaHidden}
      fill="currentColor"
    >
      <path d="M 0 -9 L 1.6 -1.6 L 7 0 L 1.6 1.6 L 0 9 L -1.6 1.6 L -7 0 L -1.6 -1.6 Z" />
    </svg>
  );
}
