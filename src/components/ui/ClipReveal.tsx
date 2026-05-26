import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { easeOutCubic, easeOutQuad, DUR } from '@/lib/motion'

interface Props {
  children: ReactNode
  className?: string
  /** "wipe" = left→right polygon wipe (0.7s). "circle" = circle expand (2.25s). */
  variant?: 'wipe' | 'circle'
  delay?: number
  /** "circle" plays once on the site; "wipe" replays/reverses. */
  once?: boolean
}

/* AGDS clip-path keyframes */
const WIPE_HIDDEN = 'polygon(0 0, 0 100%, 0 100%, 0 0)'
const WIPE_SHOWN = 'polygon(0 0, 0 100%, 100% 100%, 100% 0)'
const CIRCLE_HIDDEN = 'circle(0% at 50% 50%)'
const CIRCLE_SHOWN = 'circle(100% at 50% 50%)'

/**
 * Mirrors archigreendesigns.com image reveals:
 *  - CLIP_WIPE:    clipPath polygon wipe, 0.7s, power1.out, toggle "play none play reverse"
 *  - CIRCLE_REVEAL: clipPath circle 0→100%, 2.25s, power2.out, plays once
 */
export function ClipReveal({ children, className, variant = 'wipe', delay = 0, once }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const playOnce = once ?? variant === 'circle'
  const inView = useInView(ref, { once: playOnce, margin: '-10% 0px -10% 0px' })

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  const isCircle = variant === 'circle'
  const hidden = isCircle ? CIRCLE_HIDDEN : WIPE_HIDDEN
  const shown = isCircle ? CIRCLE_SHOWN : WIPE_SHOWN

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: hidden }}
      animate={{ clipPath: inView ? shown : hidden }}
      transition={{
        duration: isCircle ? DUR.circle : DUR.wipe,
        ease: isCircle ? easeOutCubic : easeOutQuad,
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
