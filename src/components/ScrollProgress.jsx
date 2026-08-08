import { motion, useScroll, useSpring } from 'framer-motion'

// Thin gradient progress bar along the top of the viewport.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 28 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[65] h-[2px] origin-left bg-gradient-to-r from-gold-500 via-aurora-400 to-emerald-400"
      aria-hidden="true"
    />
  )
}
