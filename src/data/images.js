// ------------------------------------------------------------------
// CENTRAL IMAGE CONFIGURATION
// ------------------------------------------------------------------
// Drop your images into  src/assets/images/  following the naming
// convention (1.jpg, 2.jpg, 3.jpg ... 6.jpg) and run:
//
//   node scripts/optimize-images.mjs
//
// The script produces responsive WebP variants in  src/assets/images/webp/
// plus a dimension manifest, and every <Photo /> picks them up
// automatically. No component imports images directly.
// ------------------------------------------------------------------

import manifest from '../assets/images/webp/manifest.json'

const modules = import.meta.glob('/src/assets/images/webp/*.webp', {
  eager: true,
  import: 'default',
})

// group variants by image name, e.g. "2-480.webp" -> "2"
const byVariant = {}
for (const path of Object.keys(modules)) {
  const base = path.split('/').pop().replace(/\.webp$/, '')
  const match = base.match(/^(.*)-(\d+)$/)
  if (!match) continue
  const name = match[1]
  const width = Number(match[2])
  ;(byVariant[name] ||= []).push({ url: modules[path], width })
}

/** Sorted variants (ascending width) for a given image name. */
export const variants = (name) =>
  (byVariant[name] || []).slice().sort((a, b) => a.width - b.width)

/** Direct URL of the largest variant (used for CSS backgrounds / posters). */
export const getImage = (name) => {
  const list = variants(name)
  return list.length ? list[list.length - 1].url : null
}

export const images = {
  // Large celebratory portrait — welcome screen
  hero: getImage('1'),

  // Our Favourite Memories — distributed from the remaining set
  gallery: [getImage('3'), getImage('4'), getImage('5'), getImage('6')].filter(Boolean),

  // Large family photo — final birthday wish (used nowhere else)
  family: getImage('2'),

  // Poster used behind the birthday video player
  videoPoster: getImage('3'),
}

export const hasImages = Object.keys(byVariant).length > 0

/** Intrinsic dimensions of the largest variant — prevents layout shift. */
export const dims = (name) => manifest[name] || null