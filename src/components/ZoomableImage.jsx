import { useState } from 'react'
import ResponsiveImage from './ResponsiveImage'
import Lightbox from './Lightbox'

// A grid photo that opens its whole card, enlarged, when clicked.
//
// Drop-in replacement for ResponsiveImage at any call site where the image is
// worth seeing whole: same props, same rendered picture, wrapped in a button.
// A real button rather than a click handler on the image, so the photo is
// reachable by Tab and opens on Enter and Space without any of that being
// reimplemented.
//
// title is the card's heading, repeated under the enlarged photo so it is
// still clear whose picture is on screen.
function ZoomableImage({ slug, alt, title, sizes = '100vw', className = '' }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        // The button carries the description, so the image inside it is marked
        // decorative - otherwise the same text is announced twice, once as the
        // control and once as its content.
        aria-label={`${alt} - vergrößert anzeigen`}
        // Inset ring: the media wrapper clips its overflow, so a ring drawn
        // outside the button would be cut off on the edges that touch it.
        className="block h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
      >
        <ResponsiveImage slug={slug} alt="" sizes={sizes} className={className} />
      </button>

      <Lightbox
        slug={slug}
        alt={alt}
        title={title}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}

export default ZoomableImage
