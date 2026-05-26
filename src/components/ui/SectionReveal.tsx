import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { easeReveal, REVEAL } from '@/lib/motion'

type Variant = 'heading' | 'text' | 'card' | 'image' | 'block'

interface Props {
  children: ReactNode
  delay?: number
  /** Slide direction for translate reveals. */
  direction?: 'up' | 'left' | 'right' | 'none'
  /** Reveal preset — controls offset & duration per the spec. */
  variant?: Variant
  className?: string
}

/**
 * Scroll-triggered entrance reveal. Animates ONCE (does not reverse on scroll
 * back), threshold ~0.15, using easeReveal — per the integration spec.
 *
 * Per-variant offsets/durations:
 *   heading 30px / 0.7s · text 20px / 0.6s · card 50px / 0.8s ·
 *   image scale(1.03) / 1.0s · block (default) 28px / 0.7s
 */
export function SectionReveal({
  children,
  delay = 0,
  direction = 'up',
  variant = 'block',
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  // once: true + amount 0.15 ≈ IntersectionObserver threshold 0.15, fires once.
  const inView = useInView(ref, { once: true, amount: 0.15 })

  const preset =
    variant === 'block' ? { y: 28, duration: 0.7 } : REVEAL[variant]
  const duration = reduced ? 0.2 : preset.duration

  // Image variant reveals via scale; others via translate.
  const isImage = variant === 'image'
  const baseOffset = 'y' in preset ? preset.y : 28

  const hidden = reduced
    ? { opacity: 0 }
    : isImage
      ? { opacity: 0, scale: (preset as { scale: number }).scale }
      : {
          opacity: 0,
          x: direction === 'left' ? -32 : direction === 'right' ? 32 : 0,
          y: direction === 'up' ? baseOffset : 0,
        }

  const variants: Variants = {
    hidden,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration, delay: reduced ? 0 : delay, ease: easeReveal },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
