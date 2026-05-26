import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '@/data/content'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './Navigation.module.css'

const SECTION_IDS = ['hero', 'projects', 'skills', 'about', 'contact']

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const reduced = useReducedMotion()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <a
            href="#hero"
            className={styles.logo}
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }}
            aria-label="Go to top"
          >
            <span className={styles.logoMark}>MA</span>
            <span className={styles.logoText}>Martin Atanasov</span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className={styles.desktopNav}>
            <ul className={styles.navList} role="list">
              {navLinks.map(({ label, href }) => {
                const id = href.replace('#', '')
                const isActive = active === id
                return (
                  <li key={href} className={styles.navItem}>
                    <a
                      href={href}
                      className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                      onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className={styles.navLinkText}>{label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Right side: CTA + hamburger */}
          <div className={styles.navRight}>
            <a
              href="#contact"
              className={styles.ctaPill}
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
            >
              <span className={styles.ctaPillLabel}>Get in Touch</span>
            </a>

            {/* Hamburger */}
            <button
              className={styles.hamburger}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.hamburgerLineTop : ''}`} />
              <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.hamburgerLineMid : ''}`} />
              <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.hamburgerLineBot : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <nav>
              <ul className={styles.mobileNavList} role="list">
                {navLinks.map(({ label, href }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{
                      delay: reduced ? 0 : i * 0.06,
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={href}
                      className={styles.mobileNavLink}
                      onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
                    >
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
