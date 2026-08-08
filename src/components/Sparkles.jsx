import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Floating royal-gold particles for a calm, celebratory atmosphere.
// Rendered once (memoised) and cheap: dots are absolutely positioned
// and animated with transform + opacity only.
export default function Sparkles({ count = 22, className = '' }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: 40 + Math.random() * 60,
        size: 1.5 + Math.random() * 3,
        duration: 13 + Math.random() * 16,
        delay: -Math.random() * 24,
        drift: 34 + Math.random() * 52,
        sway: 10 + Math.random() * 20,
        swayDuration: 6 + Math.random() * 7,
      })),
    [count]
  )

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: dot.size,
            height: dot.size,
            background:
              'radial-gradient(circle, rgba(240,225,178,0.95), rgba(212,175,55,0.35) 60%, transparent)',
            boxShadow: '0 0 12px rgba(212,175,55,0.55)',
          }}
          animate={{
            y: [0, -dot.drift, 0],
            x: [0, dot.sway, 0],
            opacity: [0.08, 0.85, 0.08],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
