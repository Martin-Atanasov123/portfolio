import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { easeHeavy } from '@/lib/motion'
import styles from './IntroOverlay.module.css'

/**
 * Full-screen dark intro that wipes upward on first paint
 * (translateY 0 → -100%, "heavy" easing) — echoing the AGDS page-load reveal.
 * Skipped entirely for reduced-motion users.
 */
export function IntroOverlay() {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(false)

  // Lock scroll while the overlay covers the viewport.
  useEffect(() => {
    if (reduced) return
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      document.body.style.overflow = ''
    }, 900)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [reduced])

  if (reduced || done) return null

  return (
    <motion.div
      className={styles.overlay}
      aria-hidden="true"
      initial={{ y: 0 }}
      animate={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: easeHeavy, delay: 0.35 }}
      onAnimationComplete={() => setDone(true)}
    >
      <motion.span
        className={styles.mark}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 1, 1, 0], y: 0 }}
        transition={{ duration: 1.0, times: [0, 0.25, 0.7, 1], ease: 'easeInOut' }}
      >
        MA
      </motion.span>
    </motion.div>
  )
}
