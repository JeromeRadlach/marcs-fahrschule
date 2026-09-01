import { getImage } from '../lib/images'

// Renders a slug from src/assets/images as a responsive picture element.
//
// width/height come from the manifest and are always set: the source photos
// have inconsistent aspect ratios (portrait scooter, square trailer, 3:2 cars),
// so without them the grid reflows as each image loads.
function ResponsiveImage({ slug, alt, sizes = '100vw', className = '' }) {
  const image = getImage(slug)

  if (!image) return null

  return (
    <picture>
      {image.webpSrcSet && (
        <source type="image/webp" srcSet={image.webpSrcSet} sizes={sizes} />
      )}
      <img
        src={image.src}
        srcSet={image.jpegSrcSet}
        sizes={sizes}
        alt={alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  )
}

export default ResponsiveImage
