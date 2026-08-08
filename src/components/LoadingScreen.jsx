import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { intro } from '../data/content'

// Surprise intro: two short messages build anticipation. It is a
// lightweight overlay — the celebration already mounts underneath,
// so hero assets warm up while the intro plays. Kept short.
export default function LoadingScreen({ onComplete }) {
  const [step, setStep] = useState(0)
  const reducedMotion = useReducedMotion()
  const twoSteps = intro.messages.length > 1

  useEffect(() => {
    if (reducedMotion) {
      onComplete()
      return
    }
    const stepTimer = setTimeout(() => setStep(1), twoSteps ? 1500 : 1200)
    const finish = setTimeout(onComplete, twoSteps ? 3100 : 2500)
    return () => {
      clearTimeout(stepTimer)
      clearTimeout(finish)
    }
  }, [onComplete, reducedMotion, twoSteps])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-midnight"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex max-w-md flex-col items-center gap-6 px-8 text-center"
        >
          {step === 0 ? (
            <>
              <span className="h-px w-12 gold-rule" aria-hidden="true" />
              <p className="font-serif-alt italic text-xl md:text-2xl font-light leading-relaxed text-mist-100/90">
                {intro.messages[0]}
              </p>
            </>
          ) : (
            <>
              <span className="h-px w-12 gold-rule" aria-hidden="true" />
              <h1 className="font-display text-3xl md:text-4xl font-medium text-mist-50">
                {intro.messages[1]}
              </h1>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-3"
      >
        <span className="font-sans text-[9px] tracking-[0.45em] uppercase text-gold-400/70">
          From Godfred & Family
        </span>
        <span className="h-px w-24 gold-rule" aria-hidden="true" />
      </motion.div>
    </motion.div>
  )
}
