import { motion } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { Children, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { easeHeavy } from '@/lib/motion'
import styles from './Slider.module.css'

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}
function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

const GAP = 16 // px, matches --sp-4

interface Props {
  children: ReactNode
  ariaLabel?: string
}

/**
 * Horizontal slider with numbered indicators — modelled on the AGDS services
 * carousel. Track translateX uses the "heavy" easing (0.6s). Slides outside
 * the active window dim to opacity 0.4 / scale 0.97 for depth. Supports drag,
 * arrow buttons, and numbered page jumps.
 */
export function Slider({ children, ariaLabel }: Props) {
  const slides = Children.toArray(children)
  const n = slides.length

  const viewportRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [perView, setPerView] = useState(1)
  const [index, setIndex] = useState(0)
  const [slideW, setSlideW] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      const pv = window.innerWidth >= 768 ? 2 : 1
      const w = viewportRef.current?.clientWidth ?? 0
      setPerView(pv)
      setSlideW((w - GAP * (pv - 1)) / pv)
      setIndex((i) => Math.min(i, Math.max(0, n - pv)))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [n])

  const maxIndex = Math.max(0, n - perView)
  const step = slideW + GAP
  const x = -index * step

  const go = (i: number) => setIndex(Math.max(0, Math.min(maxIndex, i)))

  const onDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = slideW * 0.2
    if (info.offset.x < -threshold) go(index + 1)
    else if (info.offset.x > threshold) go(index - 1)
    else go(index)
  }

  return (
    <div className={styles.slider} role="group" aria-label={ariaLabel} aria-roledescription="carousel">
      <div ref={viewportRef} className={styles.viewport}>
        <motion.div
          className={styles.track}
          style={{ gap: GAP }}
          drag={reduced ? false : 'x'}
          dragConstraints={{ left: -maxIndex * step, right: 0 }}
          dragElastic={0.08}
          onDragEnd={onDragEnd}
          animate={{ x }}
          transition={{ duration: reduced ? 0 : 0.6, ease: easeHeavy }}
        >
          {slides.map((slide, i) => {
            const inWindow = i >= index && i < index + perView
            const dim = !inWindow && !reduced
            return (
              <motion.div
                key={i}
                className={styles.slide}
                style={{ width: slideW || undefined }}
                animate={{ opacity: dim ? 0.4 : 1, scale: dim ? 0.97 : 1 }}
                transition={{ duration: 0.4, ease: easeHeavy }}
              >
                {slide}
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className={styles.controls}>
        <div className={styles.indicators}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.indicator} ${i === index ? styles.indicatorActive : ''}`}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </div>

        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(index + 1)}
            disabled={index === maxIndex}
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}
