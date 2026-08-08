import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, intro, align = 'center' }) {
  const alignment =
    align === 'left' ? 'text-left items-start' : 'text-center items-center'

  return (
    <div className={`flex flex-col gap-6 max-w-3xl mx-auto ${alignment}`}>
      <Reveal delay={0.05}>
        <div
          className={`inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 backdrop-blur-md ${
            align === 'left' ? '' : 'mx-auto'
          }`}
        >
          <span className="h-1 w-1 rounded-full bg-gold-400" aria-hidden="true" />
          <span className="font-sans text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-gold-300">
            {eyebrow}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <h2 className="font-display text-3xl md:text-5xl font-medium leading-tight text-mist-50">
          {title}
        </h2>
      </Reveal>

      {intro && (
        <Reveal delay={0.25}>
          <p className="font-serif-alt text-lg md:text-xl italic text-mist-300/90 leading-relaxed">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  )
}
