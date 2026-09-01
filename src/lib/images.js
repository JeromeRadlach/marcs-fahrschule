// Resolves an image slug to the responsive variants produced by
// scripts/optimize-images.mjs (npm run images).
//
// The files live in public/images/ and are served as-is by Vite. Their URLs
// are built from import.meta.env.BASE_URL rather than written as '/images/...'
// literals: the site is served from /marcs-fahrschule/ on GitHub Pages, and
// Vite does not rewrite path strings inside JS, so a root-absolute path would
// 404 in both dev and production.
//
// The manifest is imported (not fetched) so intrinsic dimensions are available
// synchronously on first render and the layout can reserve space immediately.

import manifest from './image-manifest.json'

// Vite guarantees BASE_URL has a trailing slash
const base = import.meta.env.BASE_URL

const url = (slug, width, ext) => `${base}images/${slug}-${width}.${ext}`

const toSrcSet = (slug, widths, ext) =>
  widths.map(width => `${url(slug, width, ext)} ${width}w`).join(', ')

export function getImage(slug) {
  const meta = manifest[slug]
  if (!meta?.widths?.length) return null

  const widest = meta.widths[meta.widths.length - 1]

  return {
    // Widest JPEG is the fallback for browsers that ignore srcset entirely
    src: url(slug, widest, 'jpg'),
    jpegSrcSet: toSrcSet(slug, meta.widths, 'jpg'),
    webpSrcSet: toSrcSet(slug, meta.widths, 'webp'),
    width: meta.width,
    height: meta.height
  }
}
