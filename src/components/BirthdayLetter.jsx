import { motion } from 'framer-motion'
import { MailOpen, Feather } from 'lucide-react'
import { letter } from '../data/content'
import Reveal from './Reveal'

export default function BirthdayLetter() {
  return (
    <section id="message" className="relative overflow-hidden py-24 md:py-40">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(212,175,55,0.1), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 backdrop-blur-md">
              <span className="h-1 w-1 rounded-full bg-gold-400" aria-hidden="true" />
              <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold-300">
                {letter.eyebrow}
              </span>
            </span>
          </Reveal>

          <Reveal delay={0.12}>
            <h2 className="mt-6 font-display text-3xl md:text-5xl font-medium text-mist-50">
              {letter.title}
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6 flex items-center gap-3 text-gold-400" aria-hidden="true">
              <MailOpen size={15} strokeWidth={1.5} />
              <span className="h-px w-14 bg-gold-500/40" />
              <Feather size={15} strokeWidth={1.5} />
            </div>
          </Reveal>
        </div>

        {/* The letter — like a card placed on a luxury table */}
        <div className="relative mt-14">
          {/* Soft pool of light beneath the card */}
          <div
            className="absolute -inset-x-8 bottom-0 top-1/3 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.14), transparent 65%)',
            }}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 48, rotateX: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="paper relative rounded-[1.5rem] px-5 py-9 sm:px-8 sm:py-10 md:px-12 md:py-14 shadow-[0_70px_140px_-40px_rgba(0,0,0,0.85),0_30px_60px_-30px_rgba(212,175,55,0.15)]"
            style={{ transformPerspective: 1400 }}
          >
            {/* Gold corner accents */}
            <span className="pointer-events-none absolute top-4 left-4 h-6 w-6 rounded-tl-2xl border-t border-l border-gold-500/50" aria-hidden="true" />
            <span className="pointer-events-none absolute top-4 right-4 h-6 w-6 rounded-tr-2xl border-t border-r border-gold-500/50" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 rounded-bl-2xl border-b border-l border-gold-500/50" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 rounded-br-2xl border-b border-r border-gold-500/50" aria-hidden="true" />

            <Reveal delay={0.1}>
              <p className="font-serif-alt text-xl sm:text-2xl md:text-3xl italic font-medium text-ocean-900">
                {letter.salutation}
              </p>
            </Reveal>

            <div className="mt-5 flex flex-col gap-4 sm:mt-6">
              {letter.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={0.15 + i * 0.09}>
                  <p className="font-serif-alt text-[16px] md:text-lg italic font-light leading-[1.85] text-ocean-900/85">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <div className="mt-9 flex flex-col items-center gap-1.5 md:items-end">
              <p className="font-serif-alt text-lg italic text-ocean-900/70">
                {letter.closing}
              </p>
              <p className="font-display text-2xl italic text-gold-600">
                {letter.signature}
              </p>
            </div>

            {/* Wax seal */}
            <div className="absolute -bottom-7 left-1/2 hidden -translate-x-1/2 md:flex h-14 w-14 items-center justify-center">
              <span className="absolute inset-0 rotate-45 rounded-[0.4rem] bg-gradient-to-br from-champagne-200 to-champagne-300 shadow-[0_10px_30px_-8px_rgba(150,119,37,0.6)] ring-1 ring-gold-600/30" aria-hidden="true" />
              <span className="relative font-display text-base italic text-gold-700">
                {letter.seal}
              </span>
            </div>
          </motion.div>
        </div>

        <Reveal delay={0.3}>
          <p className="mt-16 text-center font-serif-alt italic text-base md:text-lg text-mist-400/80">
            {letter.note}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
