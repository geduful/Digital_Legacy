import { motion } from 'framer-motion'
import { Play, Clapperboard } from 'lucide-react'
import { video } from '../data/content'
import { getImage } from '../data/images'
import SectionHeading from './SectionHeading'

export default function VideoSection() {
  const hasVideo = Boolean(video.videoUrl)
  const poster = getImage('3')

  return (
    <section id="video" className="relative overflow-hidden py-28 md:py-40">
      {/* Blurred poster backdrop */}
      {poster && (
        <div className="pointer-events-none absolute inset-0 opacity-30 blur-2xl scale-110" aria-hidden="true">
          <img src={poster} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.08), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <SectionHeading eyebrow={video.eyebrow} title={video.title} />

        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16"
        >
          {/* Cinematic frame */}
          <div className="relative rounded-[1.75rem] border border-white/10 bg-midnight/60 p-2 shadow-[0_70px_140px_-45px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/10 backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-[1.25rem]">
              <div className="relative aspect-video w-full">
                {hasVideo ? (
                  <video
                    src={video.videoUrl}
                    poster={poster || undefined}
                    controls
                    playsInline
                    preload="none"
                    className="h-full w-full object-cover"
                    aria-label={video.title}
                  />
                ) : (
                  <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden">
                    {/* Frame background */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(14,34,56,0.9), rgba(6,19,33,0.95) 60%, rgba(23,59,99,0.55))',
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(ellipse 55% 60% at 50% 45%, rgba(212,175,55,0.14), transparent 70%)',
                      }}
                      aria-hidden="true"
                    />
                    {poster && (
                      <img
                        src={poster}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-25"
                      />
                    )}

                    {/* Play button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      className="relative flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 text-midnight shadow-[0_0_60px_rgba(212,175,55,0.5)]"
                      aria-label="Play birthday video"
                    >
                      <span
                        className="absolute inset-0 rounded-full border border-gold-400/60 animate-ping"
                        style={{ animationDuration: '2.8s' }}
                        aria-hidden="true"
                      />
                      <Play size={26} className="ml-1 fill-current" aria-hidden="true" />
                    </motion.button>

                    <div className="relative flex flex-col items-center gap-3 px-8 text-center">
                      <Clapperboard size={15} strokeWidth={1.25} className="text-gold-400/70" aria-hidden="true" />
                      <p className="max-w-md font-serif-alt text-lg md:text-xl italic text-mist-200/90 leading-relaxed">
                        {video.placeholder}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ambient glow under the player */}
          <div
            className="absolute -inset-x-10 bottom-0 h-32 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.12), transparent 65%)',
            }}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  )
}
