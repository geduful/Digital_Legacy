import { motion } from 'framer-motion'

// Fixed ambient scene behind everything: layered gradient, slowly
// drifting aurora orbs and soft radial lighting. Transform-only
// animation keeps it cheap at 60fps.
export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base layered gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #061321 0%, #0E2238 35%, #173B63 70%, #061321 100%)',
        }}
      />

      {/* Aurora orbs */}
      <motion.div
        className="absolute -top-[20%] -left-[15%] h-[65vmax] w-[65vmax] rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(212,175,55,0.16), transparent 60%)',
          filter: 'blur(70px)',
        }}
        animate={{ x: [0, 80, 0], y: [0, 50, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[15%] -right-[20%] h-[60vmax] w-[60vmax] rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(125,211,252,0.12), transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, -70, 0], y: [0, 60, 0], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[25%] left-[25%] h-[55vmax] w-[55vmax] rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(110,231,183,0.09), transparent 60%)',
          filter: 'blur(90px)',
        }}
        animate={{ x: [0, 60, 0], y: [0, -50, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Deep vignette to anchor content */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 90% at 50% 40%, transparent 45%, rgba(4,12,22,0.6) 100%)',
        }}
      />
    </div>
  )
}
