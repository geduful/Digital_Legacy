import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { intro } from '../data/content'
import AmbientBackground from './AmbientBackground'
import Sparkles from './Sparkles'

// Surprise intro: two short messages build anticipation,
// then the celebration begins.
export default function LoadingScreen({ onComplete }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setTimeout(
      () => setStep(1),
      intro.messages.length === 1 ? 2200 : 2400
    )
    const finish = setTimeout(onComplete, intro.messages.length === 1 ? 3800 : 5600)
    return () => {
      clearTimeout(timer)
      clearTimeout(finish)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <AmbientBackground />
      <Sparkles count={16} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -24, filter: 'blur(10px)' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
        transition={{ delay: 0.4, duration: 1 }}
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
