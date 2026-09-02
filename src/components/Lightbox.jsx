import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import ResponsiveImage from './ResponsiveImage'
import { DURATION, EASE } from '../lib/motion'

// Enlarged view of a grid photo, opened by ZoomableImage.
//
// The card in the grid crops its photo to a fixed height with object-cover, so
// a portrait scooter or a tall portrait shot is only ever seen in part. Here
// the whole picture is shown with object-contain - just the photo, no panel or
// caption; the heading and description are still on the card the reader just
// came from.
//
// Rendered through a portal into document.body rather than in place. The routed
// page wrapper in App.jsx animates a transform on every navigation, and a
// transformed ancestor becomes the containing block for fixed positioning - the
// overlay would be pinned to the page wrapper instead of the viewport and stop
// covering the screen. The portal steps outside that entirely.
function Lightbox({ slug, alt, isOpen, onClose }) {
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
  const photoMotion = reduced
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
            Just the photo, rounded like the card it came from.

            sizes is close to the full viewport here, so the browser picks a
            wider source than the card did - the point of opening it.

            Both caps are in viewport units rather than percentages: nothing
            around this image has a width of its own to resolve a percentage
            against. The height cap matches the overlay's 1rem padding, as does
            the width, and 48rem stops a landscape photo from spanning a wide
            monitor edge to edge.
          */}
          <m.div
            className="max-h-full overflow-hidden rounded-lg shadow-2xl"
            {...photoMotion}
            transition={fade}
          >
            <ResponsiveImage
              slug={slug}
              alt={alt}
              sizes="(min-width: 768px) 768px, 100vw"
              className="h-auto max-h-[calc(100vh-2rem)] w-auto max-w-[min(48rem,calc(100vw-2rem))] object-contain"
            />
          </m.div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Bild schließen"
            className="btn-motion absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg"
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
