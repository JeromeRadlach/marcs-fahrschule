// Resolves an image slug to the responsive variants produced by
// scripts/optimize-images.mjs (npm run images).
//
// The files live in public/images/ and are copied into the export as-is. Their
// URLs are built through asset() rather than written as '/images/...' literals:
// the site is served from /marcs-fahrschule/ on GitHub Pages, and Next does not
// rewrite path strings inside JS, so a root-absolute path would 404 in both dev
// and production. See src/lib/base-path.js.
//
// The manifest is imported (not fetched) so intrinsic dimensions are available
// synchronously on first render and the layout can reserve space immediately.

import manifest from './image-manifest.json'
import { asset } from './base-path'

const url = (slug, width, ext) => asset(`images/${slug}-${width}.${ext}`)

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
