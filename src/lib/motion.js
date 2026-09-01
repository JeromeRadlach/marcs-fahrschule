// Central motion system.
//
// Every animated surface on the site pulls its numbers from here, so the
// timing stays consistent and there is exactly one place to retune it.
//
// Durations are in seconds because that is what Motion expects; the CSS side
// mirrors them as custom properties in index.css. Keep the two in sync.

import { useCallback, useSyncExternalStore } from 'react'
import { useReducedMotion } from 'motion/react'

export const DURATION = {
  instant: 0.12, // colour changes, press
  fast: 0.2,     // hover, focus ring, icon rotation
  base: 0.32,    // menu, accordion, page enter
  slow: 0.5      // scroll reveals
}

// ease.out is ease-out-expo: decisive start, soft landing. Used by anything
// entering. ease.inOut is for reversible state, where a symmetric curve stops
// the close from feeling faster than the open.
export const EASE = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1]
}

export const DISTANCE = {
  sm: 8,        // page enter
  md: 24,       // scroll reveals, desktop
  mdMobile: 16  // scroll reveals, under 768px
}

const STAGGER = 0.06
const STAGGER_MOBILE = 0.04

// A ten-card grid at 60ms a card would take 540ms to finish arriving, which
// reads as a crawl rather than a stagger. Cap the total and divide it up.
const MAX_TOTAL_STAGGER = 0.36

const MOBILE_QUERY = '(max-width: 767px)'

// Motion writes an inline `transform: none` onto any element whose transform
// values are all sitting at their defaults - which is exactly where a reveal
// ends up once it has finished. An inline declaration outranks a stylesheet
// one, so a card that is both a reveal item and a .card-motion silently loses
// its CSS hover lift the moment it finishes revealing. The image zoom keeps
// working, which makes the breakage easy to miss.
//
// Passing a transformTemplate changes the contract: Motion hands the template
// the generated transform string, using "" rather than "none" when there is
// nothing to apply, and writes back whatever the template returns. Returning
// it untouched clears the inline declaration instead of pinning it, so the
// stylesheet governs again at rest while the reveal's own translate still
// passes straight through mid-animation.
const keepCssTransform = (_values, generated) => generated

// Tracks a media query. Guarded for the case where matchMedia is missing, so
// the module stays safe to import anywhere.
//
// useSyncExternalStore rather than useState + useEffect: the viewport is
// external state that can change between render and effect, and this subscribes
// to it directly instead of reading it once and then patching up the difference
// with a second render.
function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {}
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query]
  )

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(query).matches
  }, [query])

  // Third argument is the server snapshot. This app is client-rendered, but
  // passing it keeps the hook from throwing if it is ever prerendered.
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

export function useIsMobile() {
  return useMediaQuery(MOBILE_QUERY)
}

// Scroll reveal.
//
// Returns two prop bags to spread: `group` onto the wrapper and `item` onto
// each direct child that should animate. Children arrive staggered because the
// group owns the timing; the child variants only describe the shape.
//
// `count` is how many children the group has, used to cap the total stagger.
//
// Under prefers-reduced-motion both bags come back empty, so the elements
// render as plain divs with no observer attached and no hidden state to get
// stuck in. That is deliberate: it means reduced-motion users cannot end up
// with invisible content if an observer ever fails to fire.
export function useReveal({ count = 4, margin = '-80px' } = {}) {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()

  if (reduced) return { group: {}, item: {}, enabled: false }

  const base = isMobile ? STAGGER_MOBILE : STAGGER
  const stagger = Math.min(base, MAX_TOTAL_STAGGER / Math.max(count, 1))
  const distance = isMobile ? DISTANCE.mdMobile : DISTANCE.md

  return {
    enabled: true,
    group: {
      initial: 'hidden',
      whileInView: 'visible',
      viewport: { once: true, margin },
      variants: {
        hidden: {},
        visible: { transition: { staggerChildren: stagger } }
      }
    },
    item: {
      transformTemplate: keepCssTransform,
      variants: {
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.slow, ease: EASE.out }
        }
      }
    }
  }
}

// Entry animation for content already above the fold, which should not wait
// for a scroll trigger. Same shape as useReveal so the two are interchangeable
// at the call site.
export function useEntrance({ count = 4, delay = 0 } = {}) {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()

  if (reduced) return { group: {}, item: {}, enabled: false }

  const base = isMobile ? STAGGER_MOBILE : STAGGER
  const stagger = Math.min(base, MAX_TOTAL_STAGGER / Math.max(count, 1))
  const distance = isMobile ? DISTANCE.mdMobile : DISTANCE.md

  return {
    enabled: true,
    group: {
      initial: 'hidden',
      animate: 'visible',
      variants: {
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } }
      }
    },
    item: {
      transformTemplate: keepCssTransform,
      variants: {
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.slow, ease: EASE.out }
        }
      }
    }
  }
}
