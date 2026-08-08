import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { variants, dims } from '../data/images'

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

// Optimized photograph: responsive WebP srcset, intrinsic dimensions
// (no layout shift), lazy loading below the fold, graceful fallback.
export function Photo({
  name,
  alt,
  className = '',
  imgClassName = '',
  label,
  caption,
  priority = false,
  sizes = '100vw',
  fit = 'cover',
}) {
  const [failed, setFailed] = useState(false)
  const list = variants(name)
  const missing = !list.length || failed

  if (missing) {
    return <Placeholder label={label} caption={caption} className={className} />
  }

  const sorted = [...list].sort((a, b) => a.width - b.width)
  const largest = sorted[sorted.length - 1]
  const size = dims(name)
  const srcSet = sorted.map((v) => `${v.url} ${v.width}w`).join(', ')

  return (
    <img
      src={largest.url}
      srcSet={srcSet}
      sizes={sizes || '100vw'}
      alt={alt}
      width={size?.w || largest.width}
      height={size?.h || undefined}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-${fit} ${imgClassName} ${className}`}
    />
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
