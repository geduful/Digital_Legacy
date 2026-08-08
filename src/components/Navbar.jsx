import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, site } from '../data/content'
import MusicToggle from './MusicToggle'

function Monogram() {
  return (
    <a href="#home" className="group flex items-center gap-3" aria-label={`${site.name} — home`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/45 bg-gold-500/10 text-gold-300 transition-all duration-300 group-hover:border-gold-400 group-hover:bg-gold-500/20">
        <span className="font-display text-sm">{site.initials[0]}</span>
      </span>
      <span className="hidden sm:flex flex-col leading-none">
        <span className="font-display text-[13px] tracking-[0.18em] text-mist-50 uppercase">
          {site.initials}
        </span>
        <span className="mt-1 text-[9px] tracking-[0.28em] uppercase text-gold-400/80">
          A Celebration Of You
        </span>
      </span>
    </a>
  )
}

function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    setTimeout(() => scrollToId(id), open ? 350 : 0)
  }

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <nav
          className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-all duration-500 ${
            scrolled
              ? 'border-white/10 bg-midnight/70 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-2xl'
              : 'border-white/10 bg-white/[0.05] shadow-[0_16px_40px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl'
          }`}
          aria-label="Main navigation"
        >
          <Monogram />

          <ul className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => go(link.id)}
                  className={`relative text-[11px] tracking-[0.22em] uppercase transition-colors duration-300 ${
                    active === link.id ? 'text-gold-300' : 'text-mist-300/80 hover:text-mist-50'
                  }`}
                >
                  {link.label}
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill-dot"
                      className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold-400"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <MusicToggle compact />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-mist-100 transition-colors hover:border-gold-500/40 hover:text-gold-300"
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="fixed inset-0 z-[90] flex flex-col bg-midnight/85"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Monogram />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-mist-100 transition-colors hover:border-gold-500/40 hover:text-gold-300"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-1 px-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: 'easeOut' }}
                  onClick={() => go(link.id)}
                  className="group flex items-baseline gap-5 py-3"
                >
                  <span className="font-serif-alt italic text-gold-400/70 text-lg">
                    0{i + 1}
                  </span>
                  <span className="font-display text-3xl text-mist-50 transition-colors duration-300 group-hover:text-gold-300">
                    {link.label}
                  </span>
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="mt-10 flex flex-col items-center gap-3"
              >
                <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-gold-400/70">
                  With love, from the family
                </span>
                <span className="h-px w-16 gold-rule" aria-hidden="true" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
