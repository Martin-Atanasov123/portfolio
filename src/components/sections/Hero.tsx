import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { easeInCubic, easeReveal } from '@/lib/motion'
import { Counter } from '@/components/ui/Counter'
import styles from './Hero.module.css'

function ChevronDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export function Hero() {
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)

  // Pin range: progress 0 (top pinned) → 1 (hero scrolled away).
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end start'],
  })

  // Background parallax — mirrors AGDS `backgroundPosition: center -400px` (scrub, ease none).
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -400])
  // Content fade-out — mirrors AGDS FADE_OUT (scrub). Completes before the hero
  // unpins (~progress 0.39 for the 165vh wrapper) so it fully clears like the site.
  const contentOpacity = useTransform(scrollYProgress, [0, 0.33], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.33], [0, -60])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={wrapRef}
      className={styles.heroWrap}
      style={reduced ? { height: 'auto' } : undefined}
      aria-labelledby="hero-heading"
    >
      <div className={styles.heroSticky}>
        {/* Architectural grid — scale-reveals on load, parallaxes on scroll */}
        <motion.div
          className={styles.grid}
          style={reduced ? undefined : { y: gridY }}
          initial={reduced ? false : { opacity: 0, scale: 1.05 }}
          animate={reduced ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: easeReveal }}
          aria-hidden="true"
        />

        {/* Subtle light leak */}
        <div className={styles.lightLeak} aria-hidden="true" />

        {/* Bottom fade */}
        <div className={styles.bottomFade} aria-hidden="true" />

        <motion.div
          className={`container ${styles.content}`}
          style={reduced ? undefined : { opacity: contentOpacity, y: contentY }}
        >
          {/* Section label */}
          <motion.p
            className={styles.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeInCubic }}
          >
            <span className={styles.labelSlash}>//</span>i love to create things
          </motion.p>

          <motion.h1
            id="hero-heading"
            className={styles.heading}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: easeInCubic }}
          >
            I craft interfaces
            <br />
            <span className={styles.headingAccent}>that feel alive.</span>
          </motion.h1>

          <motion.p
            className={styles.subheading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: easeInCubic }}
          >
            Specialising in design systems, motion design, and the kind of
            attention to detail that makes people say{' '}
            <em>"how did they do that?"</em>
          </motion.p>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: easeInCubic }}
          >
            <button className={styles.ctaGreen} onClick={scrollToProjects}>
              <span className={styles.ctaLabel}>View My Work <ArrowRight /></span>
            </button>

            <button className={styles.ctaOutline} onClick={scrollToContact}>
              <span className={styles.ctaLabel}>Get in Touch</span>
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className={styles.stats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55, ease: easeInCubic }}
          >
            {[
              { value: 4, suffix: '+', label: 'Years Experience' },
              { value: 30, suffix: '+', label: 'Projects Built' },
              { value: 100, suffix: '%', label: 'TypeScript' },
            ].map((s) => (
              <div key={s.label} className={styles.stat}>
                <Counter value={s.value} suffix={s.suffix} className={styles.statValue} />
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          className={styles.scrollIndicator}
          onClick={scrollToProjects}
          aria-label="Scroll to projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: reduced ? 0 : [0, 6, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.5 },
            y: { delay: 1.5, duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <ChevronDown />
        </motion.button>
      </div>
    </section>
  )
}
