import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { finalWish, site } from '../data/content'
import { getImage } from '../data/images'
import Image from './Image'
import WarmLights from './Sparkles'

export default function FinalWish() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '5%'])
  const familyPhoto = getImage('2')

  return (
    <section
      id="wish"
      ref={ref}
      className="relative overflow-hidden"
      aria-label={finalWish.eyebrow}
    >
      {/* Cinematic background */}
      <motion.div style={{ y: bgY }} className="absolute -inset-y-16 inset-x-0" aria-hidden="true">
        <div
          className="h-full w-full"
          style={{
            background:
              'linear-gradient(135deg, #061321 0%, #0E2238 40%, #173B63 75%, #061321 100%)',
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-midnight/60" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-transparent to-midnight" aria-hidden="true" />

      <WarmLights count={16} />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-32 md:py-44 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 backdrop-blur-md"
        >
          <span className="h-1 w-1 rounded-full bg-gold-400" aria-hidden="true" />
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold-300">
            {finalWish.eyebrow}
          </span>
        </motion.span>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 h-px w-24 gold-rule"
          aria-hidden="true"
        />

        <motion.h2
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-mist-50"
        >
          {finalWish.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-2 bg-gradient-to-r from-gold-200 via-gold-400 to-gold-500 bg-clip-text font-serif-alt text-3xl md:text-4xl italic font-light text-transparent"
        >
          {finalWish.name}
        </motion.p>

        {/* Family photograph */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-14 w-full max-w-lg"
        >
          <div
            className="absolute -inset-12 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(212,175,55,0.2), rgba(125,211,252,0.08) 55%, transparent 75%)',
            }}
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_70px_140px_-40px_rgba(0,0,0,0.85)] ring-1 ring-inset ring-white/10">
            {familyPhoto ? (
              <img
                src={familyPhoto}
                alt="Our family together"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
            ) : (
              <Image
                src={null}
                label="Family photograph"
                caption="A photograph of the family, together"
                className="aspect-[16/10] w-full"
              />
            )}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 max-w-xl font-serif-alt text-xl md:text-2xl italic leading-relaxed text-mist-100/90"
        >
          {finalWish.thanks}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-11 font-sans text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-gold-300/85"
        >
          {finalWish.blessingsTitle}
        </motion.p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {finalWish.blessings.map((blessing, i) => {
            const Icon = blessing.icon
            return (
              <motion.span
                key={blessing.label}
                initial={{ opacity: 0, scale: 0.88, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 1 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3 }}
                className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 backdrop-blur-xl shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:border-gold-500/40"
              >
                <Icon size={14} strokeWidth={1.5} className="text-gold-400" aria-hidden="true" />
                <span className="font-serif-alt text-base md:text-lg italic text-mist-100/90">
                  {blessing.label}
                </span>
              </motion.span>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <span className="font-sans text-[11px] tracking-[0.4em] uppercase text-gold-300/80">
            {finalWish.signature}
          </span>
          <span className="h-px w-16 gold-rule" aria-hidden="true" />
          <span className="font-display text-3xl md:text-4xl italic text-gold-400">
            {finalWish.signatureName}
          </span>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-midnight/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-9 text-center md:flex-row md:justify-between md:text-left">
          <p className="font-display text-sm tracking-[0.2em] uppercase text-mist-100/80">
            {site.name}
          </p>
          <p className="font-serif-alt italic text-sm text-mist-400/80">
            {finalWish.footer}
          </p>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-400/60">
            Joy · Peace · Love
          </p>
        </div>
      </footer>
    </section>
  )
}
