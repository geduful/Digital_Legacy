import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { reasons } from '../data/content'
import SectionHeading from './SectionHeading'

// 3D tilt is desktop-only — hover-capable devices only. Touch devices
// get a simple, fast card instead of tilting on every tap.
const canHover =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

export default function Reasons() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="why" className="relative overflow-hidden py-24 md:py-40">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 100%, rgba(125,211,252,0.07), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
        <SectionHeading
          eyebrow={reasons.eyebrow}
          title={reasons.title}
          intro={reasons.intro}
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.items.map((reason, i) => {
            const Icon = reason.icon
            const open = openIndex === i

            return (
              <motion.button
                key={reason.title}
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={canHover ? { y: -6, rotateX: 3, rotateY: i % 2 === 0 ? -2 : 2 } : undefined}
                whileTap={{ scale: 0.98 }}
                style={{ transformPerspective: 900 }}
                className="group relative w-full rounded-2xl bg-gradient-to-b from-white/[0.16] via-white/[0.05] to-white/[0.08] p-px text-left"
                aria-expanded={open}
              >
                <span
                  className={`relative flex h-full w-full flex-col items-center rounded-[calc(1rem-1px)] px-6 py-8 sm:py-9 text-center backdrop-blur-[25px] transition-colors duration-500 ${
                    open ? 'bg-white/[0.1]' : 'bg-[rgba(255,255,255,0.07)]'
                  }`}
                >
                  {/* Icon */}
                  <span className="relative flex h-14 w-14 items-center justify-center">
                    <span
                      className={`absolute inset-0 rotate-45 rounded-lg border transition-all duration-500 ${
                        open
                          ? 'border-gold-500/60 bg-gold-500/15 shadow-[0_0_30px_rgba(212,175,55,0.3)]'
                          : 'border-gold-500/30 group-hover:border-gold-500/50'
                      }`}
                      aria-hidden="true"
                    />
                    <Icon size={20} strokeWidth={1.4} className="relative text-gold-300" aria-hidden="true" />
                  </span>

                  <span className="mt-5 block font-display text-lg md:text-xl font-medium text-mist-50">
                    {reason.title}
                  </span>

                  <motion.span
                    initial={false}
                    animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <span className="block pt-3">
                      <span className="font-serif-alt text-base md:text-lg italic text-champagne-200/90 leading-relaxed">
                        “{reason.detail}”
                      </span>
                    </span>
                  </motion.span>

                  <span
                    className={`mt-5 flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-500 ${
                      open
                        ? 'rotate-45 border-gold-400 bg-gold-500/15 text-gold-300'
                        : 'border-white/15 text-gold-400/70 group-hover:border-gold-500/40'
                    }`}
                    aria-hidden="true"
                  >
                    <Plus size={13} />
                  </span>
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}