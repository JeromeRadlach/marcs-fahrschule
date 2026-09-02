import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getImage } from '../lib/images'

// Pages are prerendered to static HTML at build time, where a layout effect
// cannot run and React warns about it. The effect below only ever has anything
// to do in a browser, so it steps aside on the server rather than warning.
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

// Renders a slug from public/images as a responsive picture element.
//
// width/height come from the manifest and are always set: the source photos
// have inconsistent aspect ratios (portrait scooter, square trailer, 3:2 cars),
// so without them the grid reflows as each image loads.
//
// Photos fade up over the orange gradient placeholder behind them rather than
// snapping in as they decode, which on a slow connection makes the grid
// visibly flicker into place.
function ResponsiveImage({ slug, alt, sizes = '100vw', className = '' }) {
  const image = getImage(slug)
  const imgRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // A cached image can already be decoded by the time React attaches the
  // handler, in which case load never fires and the photo would stay at zero
  // opacity forever. Checking complete on mount covers that; useLayoutEffect
  // runs it before paint so the correct state is the first thing drawn.
  useIsomorphicLayoutEffect(() => {
    if (imgRef.current?.complete) setIsLoaded(true)
  }, [slug])

  if (!image) return null

  return (
    <picture>
      {image.webpSrcSet && (
        <source type="image/webp" srcSet={image.webpSrcSet} sizes={sizes} />
      )}
      <img
        ref={imgRef}
        src={image.src}
        srcSet={image.jpegSrcSet}
        sizes={sizes}
        alt={alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        // A decode failure must not leave a permanently invisible element, so
        // an error counts as loaded and reveals whatever the browser shows.
        onError={() => setIsLoaded(true)}
        data-loaded={isLoaded ? 'true' : 'false'}
        className={`img-fade ${className}`}
      />
    </picture>
  )
}

export default ResponsiveImage
