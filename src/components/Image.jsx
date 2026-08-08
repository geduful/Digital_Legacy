import { useState } from 'react'
import { ImageOff } from 'lucide-react'

// Elegant glass placeholder shown while real photographs are added.
export function Placeholder({ label, caption, className = '' }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl flex flex-col items-center justify-center gap-4 p-8 ${className}`}
      aria-label={caption || 'Photograph coming soon'}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(212,175,55,0.3), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <ImageOff className="w-7 h-7 text-gold-400/50" strokeWidth={1} aria-hidden="true" />
      {caption && (
        <span className="font-serif-alt italic text-lg text-mist-300/75 text-center">
          {caption}
        </span>
      )}
      <span className="text-[10px] tracking-[0.3em] uppercase text-mist-400/50">
        {label || 'Photograph pending'}
      </span>
    </div>
  )
}

// Image with graceful fallback — if the source is missing or fails to
// load (images are added after build), an elegant placeholder renders.
export default function Image({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  label,
  caption,
  eager = false,
}) {
  const [failed, setFailed] = useState(false)
  const missing = !src || failed

  if (missing) {
    return <Placeholder label={label} caption={caption} className={className} />
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
      className={`object-cover ${className} ${imgClassName}`}
    />
  )
}
