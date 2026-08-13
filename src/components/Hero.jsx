import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles as SparkleIcon } from 'lucide-react'
import { hero } from '../data/content'
import { Photo } from './Image'
import Sparkles from './Sparkles'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}

// Transform + opacity only — no blur filters (cheap on mobile GPUs).
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero({ start = true }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label="Welcome"
    >
      <Sparkles count={22} />

      <motion.div
        variants={container}
        initial="hidden"
        animate={start ? 'visible' : 'hidden'}
        style={{ opacity: fade }}
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-9 px-5 pt-28 pb-20 sm:gap-12 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
      >
        {/* Portrait — first on mobile, right on desktop */}
        <motion.div
          variants={item}
          style={{ y: portraitY }}
          className="order-1 mx-auto w-full max-w-[300px] sm:max-w-sm lg:order-2 lg:max-w-md"
        >
          <div className="relative">
            {/* Soft glow behind the portrait */}
            <div
              className="absolute -inset-10 rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(212,175,55,0.28), rgba(125,211,252,0.1) 55%, transparent 75%)',
              }}
              aria-hidden="true"
            />

            {/* Floating ring ornament */}
            <motion.div
              className="pointer-events-none absolute -inset-5 rounded-[2.5rem] border border-gold-500/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            >
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold-400 shadow-[0_0_12px_rgba(212,175,55,0.9)]" />
            </motion.div>

            {/* Portrait frame */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.8)] ring-1 ring-inset ring-white/10">
              <Photo
                name="1"
                alt={`Portrait of ${hero.name}`}
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 72vw"
                className="aspect-[4/5] w-full"
                imgClassName="portrait-zoom"
                label="Portrait"
                caption="A portrait of the birthday man"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/55 via-transparent to-transparent" aria-hidden="true" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: start ? 0.7 : 0, duration: 0.8, ease: 'easeOut' }}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-midnight/70 px-5 py-2.5 backdrop-blur-xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]"
            >
              <span className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold-300">
                <SparkleIcon size={12} className="text-gold-400" aria-hidden="true" />
                With love, from Godfred & Family
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Text — second on mobile, left on desktop */}
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 backdrop-blur-md"
          >
            <span className="h-1 w-1 rounded-full bg-gold-400" aria-hidden="true" />
            <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold-300">
              {hero.eyebrow}
            </span>
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl font-semibold leading-[1.08] text-mist-50 sm:text-6xl md:text-7xl md:leading-[1.05]"
          >
            {hero.greeting}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 max-w-md bg-gradient-to-r from-gold-200 via-gold-400 to-gold-500 bg-clip-text font-serif-alt text-2xl italic font-light text-transparent sm:text-3xl md:text-4xl"
          >
            {hero.name}
          </motion.p>

          <motion.div variants={item} className="mt-6 flex items-center gap-4" aria-hidden="true">
            <span className="h-px w-10 bg-gold-500/50 sm:w-12" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold-400" />
            <span className="h-px w-10 bg-gold-500/50 sm:w-12" />
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-md font-serif-alt text-lg md:text-xl italic text-mist-300/90 leading-relaxed">
            “{hero.line1} {hero.line2}”
          </motion.p>

          <motion.div variants={item} className="mt-9 sm:mt-11">
            <motion.button
              type="button"
              onClick={() => document.getElementById('message')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex min-h-[3rem] items-center gap-3 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 px-8 py-4 text-[11px] font-semibold tracking-[0.3em] uppercase text-midnight shadow-[0_10px_40px_-8px_rgba(212,175,55,0.55)] transition-shadow duration-500 hover:shadow-[0_14px_60px_-8px_rgba(212,175,55,0.8)]"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
              <span className="relative z-10">{hero.cta}</span>
              <ArrowRight
                size={15}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: start ? 1.0 : 0, duration: 1 }}
        style={{ opacity: fade }}
        className="absolute bottom-6 inset-x-0 z-10 hidden justify-center sm:flex"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 bg-white/[0.05] p-1.5 backdrop-blur-md"
          aria-hidden="true"
        >
          <span className="h-2 w-1 rounded-full bg-gold-400/90" />
        </motion.div>
      </motion.div>
    </section>
  )
}