// Resolves an image slug to the responsive variants produced by
// scripts/optimize-images.mjs (npm run images).
//
// Importing through Vite rather than referencing /images/... by string is
// deliberate: Vite rewrites these URLs for the configured base path (the site
// is served from /marcs-fahrschule/ on GitHub Pages) and content-hashes the
// filenames for cache busting. A hardcoded absolute path would do neither.

import manifest from '../assets/images/manifest.json'

const webpFiles = import.meta.glob('../assets/images/*.webp', { eager: true, import: 'default' })
const jpegFiles = import.meta.glob('../assets/images/*.jpg', { eager: true, import: 'default' })

// '../assets/images/team-marc-800.webp' -> ['team-marc', 800]
function parseKey(key) {
  const match = /\/([^/]+)-(\d+)\.(?:webp|jpg)$/.exec(key)
  return match ? [match[1], Number(match[2])] : null
}

function buildSrcSet(files) {
  const bySlug = {}
  for (const [key, url] of Object.entries(files)) {
    const parsed = parseKey(key)
    if (!parsed) continue
    const [slug, width] = parsed
    ;(bySlug[slug] ||= []).push({ width, url })
  }
  for (const entries of Object.values(bySlug)) entries.sort((a, b) => a.width - b.width)
  return bySlug
}

const webp = buildSrcSet(webpFiles)
const jpeg = buildSrcSet(jpegFiles)

const toSrcSet = (entries) => entries.map(e => `${e.url} ${e.width}w`).join(', ')

export function getImage(slug) {
  const jpegEntries = jpeg[slug]
  const webpEntries = webp[slug]
  const meta = manifest[slug]

  if (!jpegEntries?.length || !meta) return null

  return {
    // Widest JPEG is the fallback for browsers that ignore srcset entirely
    src: jpegEntries[jpegEntries.length - 1].url,
    jpegSrcSet: toSrcSet(jpegEntries),
    webpSrcSet: webpEntries?.length ? toSrcSet(webpEntries) : null,
    width: meta.width,
    height: meta.height
  }
}
