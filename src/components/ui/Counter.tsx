import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Props {
  /** Numeric target to count up to. */
  value: number
  /** Text appended after the number, e.g. "+" or "%". */
  suffix?: string
  /** Text prepended before the number. */
  prefix?: string
  /** Count-up duration in seconds. */
  duration?: number
  className?: string
}

/**
 * Count-up number that animates 0 → value when it scrolls into view (once),
 * mirroring the stats counters on archigreendesigns.com (~1.5s, linear).
 */
export function Counter({ value, suffix = '', prefix = '', duration = 1.5, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: 'linear',
      onUpdate: (v) => setDisplay(Math.floor(v)),
      onComplete: () => setDisplay(value),
    })
    return () => controls.stop()
  }, [inView, value, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
