/**
 * StarMark — small four-point guide star, used as the brand lockup next to
 * the "NorthStar" wordmark in the nav and footer.
 *
 * This is the reduced-form of the hero visual: same asymmetric geometry
 * (longer vertical beam, shorter horizontal), but flat-filled so it reads
 * cleanly at 16–24px where gradients and blurs wouldn't render.
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
      <polygon points="0,-9.2 0.7,0 0,9.2 -0.7,0" />
      <polygon points="-6.2,0 0,0.5 6.2,0 0,-0.5" />
      <circle cx="0" cy="0" r="0.95" />
    </svg>
  );
}
