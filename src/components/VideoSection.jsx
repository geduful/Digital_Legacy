import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Clapperboard } from 'lucide-react'
import { video } from '../data/content'
import SectionHeading from './SectionHeading'
import { Photo } from './Image'

export default function VideoSection() {
  const hasVideo = Boolean(video.videoUrl)
  const [started, setStarted] = useState(false)

  return (
    <section id="video" className="relative overflow-hidden py-24 md:py-40">
      {/* Blurred poster backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-30 blur-2xl scale-110" aria-hidden="true">
        <Photo
          name="3"
          alt=""
          className="h-full w-full"
          caption="A memory we'll always treasure."
          sizes="100vw"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.08), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-6 md:px-8">
        <SectionHeading eyebrow={video.eyebrow} title={video.title} />

        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12 sm:mt-16"
        >
          {/* Cinematic frame */}
          <div className="relative rounded-[1.75rem] border border-white/10 bg-midnight/60 p-2 shadow-[0_70px_140px_-45px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/10 backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-[1.25rem]">
              <div className="relative w-full">
                {hasVideo ? (
                  <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
                    {started ? (
                      <video
                        src={video.videoUrl}
                        controls
                        autoPlay
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover"
                        aria-label={video.title}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setStarted(true)}
                        className="group relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden bg-midnight"
                        aria-label="Play birthday video"
                      >
                        <Photo
                          name="3"
                          alt=""
                          priority
                          sizes="(min-width: 640px) 80vw, 92vw"
                          className="absolute inset-0 h-full w-full opacity-60 transition-opacity duration-700 group-hover:opacity-50"
                          caption="Birthday video preview"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              'linear-gradient(135deg, rgba(14,34,56,0.55), rgba(6,19,33,0.8) 60%, rgba(23,59,99,0.4))',
                          }}
                          aria-hidden="true"
                        />

                        {/* Play button */}
                        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 text-midnight shadow-[0_0_60px_rgba(212,175,55,0.5)] sm:h-20 sm:w-20 md:h-24 md:w-24">
                          <span
                            className="absolute inset-0 rounded-full border border-gold-400/60 animate-ping"
                            style={{ animationDuration: '2.8s' }}
                            aria-hidden="true"
                          />
                          <Play size={22} className="ml-1 fill-current sm:size-[26px]" aria-hidden="true" />
                        </span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-5 overflow-hidden sm:gap-6">
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
                    <Photo
                      name="3"
                      alt=""
                      className="absolute inset-0 h-full w-full opacity-25"
                      caption="A memory we'll always treasure."
                      sizes="100vw"
                    />

                    {/* Play button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      className="relative flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 text-midnight shadow-[0_0_60px_rgba(212,175,55,0.5)]"
                      aria-label="Play birthday video"
                      onClick={() => {}}
                    >
                      <span
                        className="absolute inset-0 rounded-full border border-gold-400/60 animate-ping"
                        style={{ animationDuration: '2.8s' }}
                        aria-hidden="true"
                      />
                      <Play size={22} className="ml-1 fill-current sm:size-[26px]" aria-hidden="true" />
                    </motion.button>

                    <div className="relative flex flex-col items-center gap-3 px-8 text-center">
                      <Clapperboard size={15} strokeWidth={1.25} className="text-gold-400/70" aria-hidden="true" />
                      <p className="max-w-md font-serif-alt text-base sm:text-lg md:text-xl italic text-mist-200/90 leading-relaxed">
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