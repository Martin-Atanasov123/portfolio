/**
 * Motion easings & timings mirrored from archigreendesigns.com
 * (GSAP 3.15.0 + ScrollTrigger). GSAP "power" eases map to CSS cubic-beziers:
 *   power1 = quad (^2), power2 = cubic (^3)
 */

/** GSAP power2.in — easeInCubic */
export const easeInCubic: [number, number, number, number] = [0.55, 0.055, 0.675, 0.19]

/** GSAP power2.out — easeOutCubic */
export const easeOutCubic: [number, number, number, number] = [0.215, 0.61, 0.355, 1]

/** GSAP power2.inOut — easeInOutCubic */
export const easeInOutCubic: [number, number, number, number] = [0.645, 0.045, 0.355, 1]

/** GSAP default power1.out — easeOutQuad (used for the clip wipes) */
export const easeOutQuad: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

/** Scroll-reveal easing — cubic-bezier(0.25, 0.46, 0.45, 0.94). Same curve as easeOutQuad. */
export const easeReveal: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

/** "Heavy", deliberate motion for sliders & page transitions — cubic-bezier(0.77, 0, 0.18, 1). */
export const easeHeavy: [number, number, number, number] = [0.77, 0, 0.18, 1]

/** Durations (seconds) lifted from the site's ScrollTrigger animations */
export const DUR = {
  fade: 0.5, // FADE_IN / FADE_OUT
  wipe: 0.7, // CLIP_WIPE
  circle: 2.25, // CIRCLE_REVEAL
} as const

/**
 * Per-element reveal presets (once-only entrance reveals).
 * Mirrors the spec table: heading / text / card / image.
 */
export const REVEAL = {
  heading: { y: 30, duration: 0.7 },
  text: { y: 20, duration: 0.6 },
  card: { y: 50, duration: 0.8 },
  image: { scale: 1.03, duration: 1.0 },
} as const
