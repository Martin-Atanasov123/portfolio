import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { Project } from '@/data/content'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './ProjectCard.module.css'

function IconGithub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function IconExternal() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

interface Props {
  project: Project
}

export function ProjectCard({ project }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(springY, [-0.5, 0.5], reduced ? [0, 0] : [6, -6])
  const rotateY = useTransform(springX, [-0.5, 0.5], reduced ? [0, 0] : [-6, 6])
  const glowX = useTransform(springX, [-0.5, 0.5], [0, 100])
  const glowY = useTransform(springY, [-0.5, 0.5], [0, 100])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={reduced ? {} : { y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dynamic spotlight glow on hover */}
      <motion.div
        className={styles.glow}
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, var(--color-accent-glow), transparent 60%)`,
        }}
      />

      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{project.title}</h3>
            {project.status && (
              <span
                className={`${styles.status} ${
                  project.status === 'Live' ? styles.statusLive : styles.statusWip
                }`}
              >
                {project.status === 'Live' && <span className={styles.statusDot} />}
                {project.status}
              </span>
            )}
          </div>
          <div className={styles.links}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                aria-label={`${project.title} GitHub repository`}
              >
                <IconGithub />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                aria-label={`${project.title} live site`}
              >
                <IconExternal />
              </a>
            )}
          </div>
        </div>

        <p className={styles.description}>{project.description}</p>

        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
