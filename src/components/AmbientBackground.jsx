import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Fixed ambient scene behind everything: layered gradients and drifting
// aurora glows. Orbs use soft radial gradients instead of filter: blur
// (a huge GPU win), and only transform is animated. On small screens
// fewer, slower orbs are rendered; reduced-motion users get a static
// scene.
export default function AmbientBackground() {
  const [mobile, setMobile] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    setMobile(mq.matches)
    const onChange = (e) => setMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const orbs = [
    {
      className: 'absolute -top-[15%] -left-[15%] h-[55vmax] w-[55vmax] rounded-full',
      background:
        'radial-gradient(circle at center, rgba(212,175,55,0.16), rgba(212,175,55,0.04) 40%, transparent 62%)',
      animate: { x: [0, 70, 0], y: [0, 40, 0], scale: [1, 1.08, 1] },
      transition: { duration: 26, repeat: Infinity, ease: 'easeInOut' },
    },
    {
      className: 'absolute top-[18%] -right-[20%] h-[50vmax] w-[50vmax] rounded-full',
      background:
        'radial-gradient(circle at center, rgba(125,211,252,0.13), rgba(125,211,252,0.03) 40%, transparent 62%)',
      animate: { x: [0, -60, 0], y: [0, 50, 0], scale: [1.05, 1, 1.05] },
      transition: { duration: 30, repeat: Infinity, ease: 'easeInOut' },
    },
  ]

  if (!mobile) {
    orbs.push({
      className: 'absolute -bottom-[22%] left-[20%] h-[48vmax] w-[48vmax] rounded-full',
      background:
        'radial-gradient(circle at center, rgba(110,231,183,0.1), rgba(110,231,183,0.03) 40%, transparent 62%)',
      animate: { x: [0, 50, 0], y: [0, -40, 0], scale: [1, 1.1, 1] },
      transition: { duration: 34, repeat: Infinity, ease: 'easeInOut' },
    })
  }

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

      {/* Aurora glows — static when motion is reduced */}
      {reducedMotion
        ? orbs.map((orb, i) => (
            <div key={i} className={orb.className} style={{ background: orb.background }} />
          ))
        : orbs.map((orb, i) => (
            <motion.div
              key={i}
              className={orb.className}
              style={{ background: orb.background, willChange: 'transform' }}
              animate={orb.animate}
              transition={orb.transition}
            />
          ))}

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