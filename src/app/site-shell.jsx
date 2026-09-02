'use client'

import { usePathname } from 'next/navigation'
import { LazyMotion, MotionConfig, domMax, m, useReducedMotion } from 'motion/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Backdrop from '@/components/Backdrop'
import BackToTop from '@/components/BackToTop'
import { DURATION, DISTANCE, EASE } from '@/lib/motion'

// The routed page, wrapped in a per-navigation entry animation.
//
// Keying on pathname remounts the wrapper on every navigation, which replays
// the animation. There is no matching exit: animating the old page out before
// the new one arrives would double how long a navigation feels, and this site
// is built around getting people to the phone number quickly.
//
// Scroll position is not touched here. The App Router already scrolls to the
// top of the document on a forward navigation and restores the previous offset
// on back/forward, and it does so with scroll-behavior temporarily forced to
// auto - which is what the old ScrollToTop component had to reimplement by hand
// because html carries scroll-behavior: smooth for anchor links.
function PageTransition({ children }) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  // MotionConfig's reducedMotion="user" drops transforms but deliberately
  // keeps opacity animating, so it alone would still fade every page in over
  // 320ms. The preference here means content should simply be there, so the
  // whole transition is skipped rather than reduced to a fade. Note the CSS
  // reduced-motion block cannot cover this: Motion drives its own animations
  // and never creates a CSS transition for the override to shorten.
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: DURATION.base, ease: EASE.out }

  return (
    <m.div
      key={pathname}
      initial={prefersReducedMotion ? false : { opacity: 0, y: DISTANCE.sm }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      {children}
    </m.div>
  )
}

// The chrome around every page: backdrop, header, footer, back-to-top.
//
// A client component, because all of it is interactive - but it still takes the
// page as `children`, so each route's own server component (and with it the
// Metadata export) stays on the server.
function SiteShell({ children }) {
  return (
    /*
      LazyMotion with the domMax feature set, paired with the m component
      instead of motion. The header's active-tab pill slides between nav items
      via layoutId, and layout animations live in domMax only - domAnimation
      would leave the pill snapping.

      features is passed the set directly rather than a dynamic import.
      Deferring it does move some weight off the entry chunk, but until it lands
      every m element with a hidden initial - the hero headline among them -
      renders at opacity 0, and stays that way for good if the request fails.
      Trading a blank LCP element for a few KB is the wrong way round on a page
      whose job is to be read immediately.

      reducedMotion="user" is the backstop: any animation added later that
      forgets to check the preference still has its transforms dropped.
    */
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen bg-dark-gray text-white">
          {/* Aurora backdrop: fixed, decorative, behind everything. */}
          <Backdrop />

          {/*
            The navigation bar is fixed at the bottom of the viewport on mobile
            and at the top on desktop; the content column reserves its height on
            whichever edge it occupies (the tokens flip at the lg breakpoint).
          */}
          <div
            className="relative flex min-h-screen flex-col"
            style={{
              zIndex: 'var(--z-content)',
              paddingTop: 'var(--content-pad-top)',
              paddingBottom: 'var(--content-pad-bottom)'
            }}
          >
            <Header />
            <main className="flex-grow">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>

          <BackToTop />
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}

export default SiteShell
