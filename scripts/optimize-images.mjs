// ------------------------------------------------------------------
// IMAGE PIPELINE — converts  src/assets/images/*.{jpg,jpeg,png}
// into responsive WebP variants + a dimension manifest.
//
//   source            output                        width
//   --------------------------------------------------------
//   2.jpeg            2-480.webp / 2-960.webp        480 / 960
//                     2-1280.webp (if larger than 960)
//                     2-1920.webp (if larger than 1280)
//
// Only widths smaller than the source are produced (no upscaling).
// Run with:  node scripts/optimize-images.mjs
// ------------------------------------------------------------------

import { readdir, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC_DIR = path.resolve('src/assets/images')
const OUT_DIR = path.join(SRC_DIR, 'webp')
const MANIFEST_PATH = path.join(SRC_DIR, 'webp', 'manifest.json')

const WIDTHS = [480, 960, 1280, 1920]
const QUALITY = 76

const SOURCE_RE = /\.(jpe?g|png|webp)$/i

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  const files = (await readdir(SRC_DIR)).filter((f) => SOURCE_RE.test(f))

  if (files.length === 0) {
    console.log('No source images found — nothing to do.')
    return
  }

  const manifest = {}

  for (const file of files) {
    const name = file.replace(SOURCE_RE, '')
    const input = path.join(SRC_DIR, file)
    const image = sharp(input)
    const meta = await image.metadata()
    const { width: srcW, height: srcH } = meta

    const widths = WIDTHS.filter((w) => w < srcW)
    if (widths.length === 0) widths.push(srcW)

    const variants = []

    for (const width of widths) {
      const out = path.join(OUT_DIR, `${name}-${width}.webp`)
      await sharp(input)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(out)
      variants.push(width)
      console.log(`  ${name}: ${width}w -> webp`)
    }

    const largest = variants[variants.length - 1]
    const ratio = srcH / srcW
    manifest[name] = {
      w: largest,
      h: Math.round(largest * ratio),
    }
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
  console.log(`\nDone. Manifest written to ${MANIFEST_PATH}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
