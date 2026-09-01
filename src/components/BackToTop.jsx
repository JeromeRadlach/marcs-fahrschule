import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { DURATION, EASE } from '../lib/motion'

// Floating scroll-to-top control, shown once you are a full viewport down.
//
// Visibility is driven by an IntersectionObserver watching a zero-height
// sentinel rather than by a scroll listener: the browser tells us when the
// threshold is crossed instead of us asking on every frame of every scroll.
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const sentinelRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(sentinel)

    // StrictMode mounts effects twice in development; disconnecting here means
    // the discarded observer does not keep firing against a stale setter.
    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'instant' : 'smooth'
    })
  }

  return (
    <>
      {/*
        The sentinel sits one viewport tall at the top of the page. While any
        part of it is on screen we are still in the first screenful, so the
        button stays hidden. pointer-events-none keeps it from swallowing
        clicks meant for the content it overlays.
      */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-screen w-px"
      />

      <AnimatePresence>
        {isVisible && (
          <m.button
            type="button"
            onClick={scrollToTop}
            aria-label="Zum Seitenanfang"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: DURATION.fast, ease: EASE.out }}
            className="btn-motion fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </m.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default BackToTop
