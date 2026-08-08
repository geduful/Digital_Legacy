import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music2, Volume2, VolumeX } from 'lucide-react'
import { music } from '../data/content'

// Discreet glass music control — never autoplays.
// Shows a one-time hint after the site loads so visitors discover it.
export default function MusicToggle({ compact = false }) {
  const [state, setState] = useState('idle') // idle | playing | paused
  const [notice, setNotice] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (!music.src) return
    const audio = new Audio(music.src)
    audio.loop = true
    audio.preload = 'none'
    audio.volume = 0.65
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  // Reveal the hint a moment after mount; keep it until the visitor
  // taps the button for the first time.
  useEffect(() => {
    if (!music.src) return
    const show = setTimeout(() => setShowHint(true), 2600)
    return () => clearTimeout(show)
  }, [])

  const showNotice = () => {
    setNotice(true)
    setTimeout(() => setNotice(false), 2800)
  }

  const toggle = () => {
    const audio = audioRef.current
    if (!music.src || !audio) {
      showNotice()
      return
    }
    setShowHint(false)
    if (state === 'playing') {
      audio.pause()
      setState('paused')
    } else {
      audio.play().then(() => setState('playing')).catch(showNotice)
    }
  }

  const Icon = state === 'playing' ? Volume2 : state === 'paused' ? VolumeX : Music2
  const size = compact ? 'h-9 w-9' : 'h-10 w-10'

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className={`relative flex ${size} items-center justify-center rounded-full border transition-all duration-300 ${
          showHint
            ? 'border-gold-400/80 bg-gold-500/15 text-gold-200 shadow-[0_0_24px_rgba(212,175,55,0.45)]'
            : 'border-white/10 bg-white/[0.06] text-gold-300 hover:border-gold-500/45 hover:bg-gold-500/10 hover:text-gold-200'
        }`}
        aria-label={state === 'playing' ? 'Pause background music' : music.label}
        aria-pressed={state === 'playing'}
      >
        {state === 'playing' && (
          <span
            className="absolute inset-0 rounded-full border border-gold-400/50 animate-ping"
            style={{ animationDuration: '2.4s' }}
            aria-hidden="true"
          />
        )}
        {showHint && state === 'idle' && (
          <span
            className="absolute inset-0 rounded-full border border-gold-400/60 animate-ping"
            style={{ animationDuration: '1.8s' }}
            aria-hidden="true"
          />
        )}
        <Icon size={compact ? 15 : 16} aria-hidden="true" />
      </button>

      {/* One-time discovery hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed right-4 top-20 z-[85] flex items-center gap-2.5 rounded-full border border-gold-500/30 bg-midnight/90 px-4 py-2.5 backdrop-blur-xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] md:right-8"
            role="status"
          >
            <Music2 size={14} className="text-gold-300" aria-hidden="true" />
            <span className="text-[11px] text-mist-200">{music.hint}</span>
            <span className="ml-1 flex items-end gap-[3px]" aria-hidden="true">
              {[0, 1, 2].map((bar) => (
                <motion.span
                  key={bar}
                  className="w-[3px] rounded-full bg-gold-400"
                  animate={{ height: [4, 12, 5, 10, 4] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay: bar * 0.15,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notice && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 right-4 md:right-8 z-[85] rounded-full border border-white/10 bg-midnight/90 backdrop-blur-xl px-4 py-2 text-[11px] text-mist-200 shadow-xl"
            role="status"
          >
            {music.comingSoon}
          </motion.span>
        )}
      </AnimatePresence>
    </>
  )
}
