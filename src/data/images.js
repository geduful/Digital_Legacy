// ------------------------------------------------------------------
// CENTRAL IMAGE CONFIGURATION
// ------------------------------------------------------------------
// Drop your images into  src/assets/images/  following the naming
// convention (1.jpg, 2.jpg, 3.jpg ... 6.jpg) and they are picked
// up automatically. No component imports images directly — edit the
// mapping below to change which image is used where.
// ------------------------------------------------------------------

const modules = import.meta.glob('/src/assets/images/*.{jpg,jpeg,png,webp}', {
  eager: true,
})

const byName = Object.keys(modules).reduce((acc, path) => {
  const name = path.split('/').pop().replace(/\.(jpg|jpeg|png|webp)$/i, '')
  acc[name] = modules[path].default
  return acc
}, {})

const src = (name) => byName[name] || null

// Look up an image by its filename (without extension).
export const getImage = src

export const images = {
  // Large celebratory portrait — welcome screen
  hero: src('1'),

  // Our Favourite Memories — distributed from the remaining set
  gallery: [src('3'), src('4'), src('5'), src('6')].filter(Boolean),

  // Large family photo — final birthday wish (used nowhere else)
  family: src('2'),

  // Poster used behind the birthday video player
  videoPoster: src('3'),
}

export const hasImages = Object.keys(byName).length > 0
