import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Props {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  strength?: number
}

export function MagneticButton({ children, className, href, onClick, strength = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 200, damping: 18, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 200, damping: 18, mass: 0.5 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rawX.set((e.clientX - cx) * strength)
    rawY.set((e.clientY - cy) * strength)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  const inner = (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} style={{ display: 'inline-block' }}>
        {inner}
      </a>
    )
  }

  return inner
}
