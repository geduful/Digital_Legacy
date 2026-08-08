import { useEffect } from 'react'
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion'

// Subtle lighting that follows the cursor — desktop only.
export default function Spotlight() {
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 55, damping: 18 })
  const sy = useSpring(y, { stiffness: 55, damping: 18 })
  const background = useMotionTemplate`radial-gradient(620px circle at ${sx}px ${sy}px, rgba(125,211,252,0.07), transparent 68%)`

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [x, y])

  return (
    <motion.div
      style={{ background }}
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      aria-hidden="true"
    />
  )
}
