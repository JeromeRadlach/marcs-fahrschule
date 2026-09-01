// Generates responsive WebP + JPEG variants from the originals in assets-src/.
//
// Images are written to public/images/ and served statically; the manifest of
// intrinsic dimensions is written into src/ so it can be imported.
//
// Originals are not committed (see .gitignore) - they are large and only needed
// to regenerate. Keep a backup outside the repo.
//
// Run with: npm run images

import sharp from 'sharp'
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises'
import { join, parse } from 'node:path'

const SRC = 'assets-src'
const OUT = 'public/images'
const MANIFEST = 'src/lib/image-manifest.json'
const WIDTHS = [400, 800, 1200, 1600]
const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png'])

const kb = (bytes) => Math.round(bytes / 1024)

async function main() {
  await mkdir(OUT, { recursive: true })

  const files = (await readdir(SRC)).filter(f => SOURCE_EXT.has(parse(f).ext.toLowerCase()))
  if (files.length === 0) {
    console.error('No source images found in ' + SRC)
    process.exitCode = 1
    return
  }

  const manifest = {}
  let sourceBytes = 0
  let outputBytes = 0

  for (const file of files.sort()) {
    const slug = parse(file).name
    const input = join(SRC, file)
    sourceBytes += (await stat(input)).size

    // rotate() with no argument applies EXIF orientation, so portrait phone
    // photos are not silently rendered sideways
    const base = sharp(input).rotate()
    const meta = await base.metadata()

    // Never upscale: a 731px-wide source has no business emitting a 1600px file
    const widths = WIDTHS.filter(w => w <= meta.width)
    if (widths.length === 0) widths.push(meta.width)

    const emitted = []
    for (const width of widths) {
      const resized = () => sharp(input).rotate().resize({ width, withoutEnlargement: true })

      const webpPath = join(OUT, `${slug}-${width}.webp`)
      await resized().webp({ quality: 78 }).toFile(webpPath)

      const jpegPath = join(OUT, `${slug}-${width}.jpg`)
      await resized().jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(jpegPath)

      outputBytes += (await stat(webpPath)).size + (await stat(jpegPath)).size
      emitted.push(width)
    }

    // Intrinsic aspect ratio, so the components can reserve space and avoid
    // layout shift while the image loads
    manifest[slug] = { width: meta.width, height: meta.height, widths: emitted }
    console.log(`${slug.padEnd(20)} ${String(meta.width).padStart(5)}x${String(meta.height).padEnd(5)} -> ${emitted.join(', ')}`)
  }

  // Manifest lives in src/ so it can be imported and bundled; the images
  // themselves are served statically from public/
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')

  console.log(`\n${files.length} sources ${kb(sourceBytes)}KB -> ${kb(outputBytes)}KB across ${WIDTHS.length} widths in 2 formats`)
}

main()
