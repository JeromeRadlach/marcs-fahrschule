import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import ResponsiveImage from './ResponsiveImage'
import { DURATION, EASE } from '../lib/motion'

// Enlarged view of a grid card, opened by ZoomableImage.
//
// The card in the grid crops its photo to a fixed height with object-cover, so
// a portrait scooter or a tall portrait shot is only ever seen in part. Here
// the same card is rebuilt at size - the whole picture with object-contain,
// captioned with the card's heading - on the same dark panel, so it reads as
// the card opening up rather than as a separate photo viewer.
//
// Only the heading comes across, not the card's body copy. The photo is the
// point of opening this, and a full description underneath would either push
// the picture down or make the panel scroll; the description is still on the
// card the reader just came from.
//
// Rendered through a portal into document.body rather than in place. The routed
// page wrapper in App.jsx animates a transform on every navigation, and a
// transformed ancestor becomes the containing block for fixed positioning - the
// overlay would be pinned to the page wrapper instead of the viewport and stop
// covering the screen. The portal steps outside that entirely.
function Lightbox({ slug, alt, title, isOpen, onClose }) {
  const reduced = useReducedMotion()
  const closeRef = useRef(null)

  // Escape closes from anywhere, not just from the focused close button, so a
  // click on the backdrop that moved focus to <body> still leaves an exit.
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  // Scroll lock. Without it the page behind keeps scrolling under the overlay,
  // which on a phone is the difference between dismissing the photo and losing
  // your place in the grid.
  //
  // Removing the scrollbar frees up its width and would shift the whole layout
  // sideways for as long as the overlay is open; the matching padding on the
  // body holds the content still. Previous values are captured rather than
  // assumed to be empty, so nothing else that touches these is clobbered.
  useEffect(() => {
    if (!isOpen) return

    const { body, documentElement } = document
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
    }
  }, [isOpen])

  // Focus moves into the dialog on open and returns to whatever opened it on
  // close, so a keyboard user carries on from the card they were on instead of
  // being dropped back at the top of the document.
  //
  // preventScroll because the page has not moved while the overlay was up and
  // scrolling it now would be unexplained motion.
  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement
    closeRef.current?.focus()

    return () => {
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus({ preventScroll: true })
      }
    }
  }, [isOpen])

  // The dialog holds exactly one focusable element, so the focus trap is just
  // "Tab keeps you on the close button" rather than a ring of candidates.
  const trapFocus = (event) => {
    if (event.key !== 'Tab') return
    event.preventDefault()
    closeRef.current?.focus()
  }

  const fade = reduced
    ? { duration: 0 }
    : { duration: DURATION.base, ease: EASE.out }

  // The photo grows the last few percent as it arrives, which reads as the card
  // opening up rather than as a new screen replacing the old one. Under reduced
  // motion it is simply there.
  const figureMotion = reduced
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, scale: 0.94 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.94 }
      }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <m.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          // Above the sticky header (z-50) and the back-to-top button (z-40).
          // The blur is what separates the photo from the brand artwork behind
          // it; the tint underneath it keeps white UI readable on a light
          // stretch of that artwork, which blur alone does not guarantee.
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fade}
          onKeyDown={trapFocus}
          // Anywhere off the photo dismisses. Guarding on currentTarget rather
          // than stopping propagation inside means a click that starts on the
          // photo never closes, however the figure is later restructured.
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          {/*
            The card, enlarged: same panel colour, same rounding, same
            heading.

            The panel is sized by the photo (w-auto), not the other way round,
            so a portrait shot gets a portrait card instead of sitting in a wide
            panel with bars either side. That only holds while the caption stays
            out of the width calculation - see the figcaption below.
          */}
          <m.figure
            className="m-0 flex max-h-full w-auto flex-col overflow-hidden rounded-lg bg-gray-dark shadow-2xl"
            {...figureMotion}
            transition={fade}
          >
            <div className="flex min-h-0 justify-center">
              {/*
                sizes is close to the full viewport here, so the browser picks a
                wider source than the card did - the point of opening it.

                Both caps are in viewport units rather than percentages: the
                panel around this image has no width of its own to resolve a
                percentage against. 70vh leaves room for the heading below even
                on a landscape phone, the
                width matches the overlay's 1rem padding, and 48rem stops a
                landscape photo from spanning a wide monitor edge to edge.
              */}
              <ResponsiveImage
                slug={slug}
                alt={alt}
                sizes="(min-width: 768px) 768px, 100vw"
                className="h-auto max-h-[70vh] w-auto max-w-[min(48rem,calc(100vw-2rem))] object-contain"
              />
            </div>

            {/*
              w-0 with min-w-full is what keeps the panel the width of the
              photo: the heading contributes nothing to the panel's intrinsic
              width, then fills whatever width the photo settled on. Without it
              a long name would widen the card past the picture.

              Roomier padding and looser leading than the grid card because the
              body's heavy text outline grows each glyph outward - at card
              spacing the strokes of a wrapped heading touch.
            */}
            {title && (
              <figcaption className="w-0 min-w-full p-6 text-center text-xl font-bold leading-relaxed text-white">
                {title}
              </figcaption>
            )}
          </m.figure>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Bild schließen"
            className="btn-motion absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          </button>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default Lightbox
