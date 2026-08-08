import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { memories } from '../data/content'
import { getImage, hasImages } from '../data/images'
import SectionHeading from './SectionHeading'
import Image from './Image'

const order = ['3', '4', '5', '6']

const masonryAspects = ['aspect-[4/5]', 'aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/4]']

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const photos = useMemo(
    () =>
      order
        .map((name) => ({
          src: getImage(name),
          caption: memories.captions[name] || 'A memory we\'ll always treasure.',
        }))
        .filter((photo) => photo.src),
    []
  )

  const featured = photos[0]
  const rest = photos.slice(1)

  const close = useCallback(() => setLightboxIndex(null), [])
  const step = useCallback(
    (dir) =>
      setLightboxIndex((i) => (i + dir + photos.length) % photos.length),
    [photos.length]
  )

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, close, step])

  const openAt = (i) => setLightboxIndex(i)

  return (
    <section id="memories" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow={memories.eyebrow}
          title={memories.title}
          intro={memories.intro}
        />

        {hasImages ? (
          <div className="mt-16">
            {/* Featured image */}
            {featured && (
              <motion.figure
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="group mx-auto max-w-4xl cursor-pointer"
                onClick={() => openAt(0)}
              >
                <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)] ring-1 ring-inset ring-white/10">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={featured.src}
                      alt={featured.caption}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent" aria-hidden="true" />
                  <figcaption className="absolute bottom-0 inset-x-0 flex items-end justify-between gap-4 p-6 md:p-8">
                    <span className="font-serif-alt text-xl md:text-2xl italic text-mist-50">
                      {featured.caption}
                    </span>
                    <span className="rounded-full border border-white/15 bg-midnight/50 px-3.5 py-1.5 text-[9px] tracking-[0.3em] uppercase text-gold-300 backdrop-blur-md">
                      Our Favourite
                    </span>
                  </figcaption>
                </div>
              </motion.figure>
            )}

            {/* Masonry — the remaining photographs */}
            {rest.length > 0 && (
              <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((photo, i) => (
                  <motion.figure
                    key={`${photo.src}-${i}`}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.9, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="group cursor-pointer"
                    onClick={() => openAt(i + 1)}
                  >
                    <div className={`relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_80px_-35px_rgba(0,0,0,0.8)] ring-1 ring-inset ring-white/10 ${masonryAspects[i % masonryAspects.length]}`}>
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-110"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/65 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" aria-hidden="true" />
                    </div>
                    <figcaption className="mt-3.5 flex items-center justify-between gap-3">
                      <span className="font-serif-alt text-base md:text-lg italic text-mist-300/90">
                        {photo.caption}
                      </span>
                      <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-gold-400/60">
                        {String(i + 2).padStart(2, '0')}
                      </span>
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-16">
            <div className="mx-auto max-w-md text-center">
              <h3 className="font-display text-2xl md:text-3xl font-medium text-mist-50">
                {memories.emptyTitle}
              </h3>
              <p className="mt-4 font-serif-alt italic text-lg text-mist-300/80">
                {memories.emptyText}
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={masonryAspects[i % masonryAspects.length]}>
                  <Image
                    src={null}
                    label={`Memory ${String(i + 1).padStart(2, '0')}`}
                    caption="A memory we'll always treasure."
                    className="h-full w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox with blurred backdrop */}
      <AnimatePresence>
        {lightboxIndex !== null && hasImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-midnight/70 p-4 backdrop-blur-2xl md:p-10"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={photos[lightboxIndex].caption}
          >
            <button
              type="button"
              onClick={close}
              className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-mist-100 backdrop-blur-md transition-colors hover:border-gold-500/45 hover:text-gold-300"
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
              className="absolute left-3 md:left-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-mist-100 backdrop-blur-md transition-colors hover:border-gold-500/45 hover:text-gold-300"
              aria-label="Previous photograph"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
              className="absolute right-3 md:right-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-mist-100 backdrop-blur-md transition-colors hover:border-gold-500/45 hover:text-gold-300"
              aria-label="Next photograph"
            >
              <ChevronRight size={18} />
            </button>

            <motion.figure
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-full w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-midnight shadow-[0_60px_140px_-40px_rgba(0,0,0,0.9)]">
                <img
                  src={photos[lightboxIndex].src}
                  alt={photos[lightboxIndex].caption}
                  className="max-h-[76vh] w-full object-contain"
                />
              </div>
              <figcaption className="mt-5 flex items-center justify-between gap-4">
                <span className="font-serif-alt text-lg md:text-xl italic text-mist-100">
                  {photos[lightboxIndex].caption}
                </span>
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-400/70">
                  {lightboxIndex + 1} / {photos.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
