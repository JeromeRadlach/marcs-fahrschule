import { Link, NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { DISTANCE, DURATION, EASE } from '../lib/motion'

// The mobile panel is referenced by the burger button through aria-controls,
// so the id has to be stable and shared between the two.
const MOBILE_MENU_ID = 'mobile-navigation'

// How far down the page the header condenses. The sentinel sits at exactly
// this offset; once it scrolls out of the viewport the header is past it.
const CONDENSE_OFFSET = 80

// Bar heights for the inner row, rest and condensed.
const BAR_HEIGHT = 64
const BAR_HEIGHT_CONDENSED = 52

const STAGGER = 0.04

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCondensed, setIsCondensed] = useState(false)
  const sentinelRef = useRef(null)
  const reduced = useReducedMotion()

  const navItems = [
    { name: 'Start', path: '/' },
    { name: 'Fahrzeuge', path: '/fahrzeuge' },
    { name: 'Team', path: '/team' },
    { name: 'Aufbauseminar', path: '/aufbauseminar' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Kontakt', path: '/kontakt' },
  ]

  // Scroll state without a scroll listener.
  //
  // A zero-height sentinel is parked in the page flow 80px below the top; the
  // observer only fires on the two transitions that matter instead of on every
  // frame of every scroll. The header itself is sticky, so the sentinel is a
  // sibling rather than a child - anything inside the header would stick along
  // with it and never leave the viewport.
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => setIsCondensed(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [])

  // The one place on the site that animates height. Opening grows the panel
  // from nothing and staggers the links in behind it; closing is a plain
  // symmetric collapse with no stagger, so the menu never appears to unravel.
  //
  // Under reduced motion the height is left alone entirely - the panel is
  // simply there or not, which is also why the variants still exist rather
  // than being dropped: AnimatePresence needs something to resolve on exit.
  const panelVariants = reduced
    ? {
        closed: { opacity: 0, transition: { duration: 0 } },
        open: { opacity: 1, transition: { duration: 0 } }
      }
    : {
        closed: {
          opacity: 0,
          height: 0,
          transition: { duration: DURATION.base, ease: EASE.inOut }
        },
        open: {
          opacity: 1,
          height: 'auto',
          transition: {
            duration: DURATION.base,
            ease: EASE.out,
            staggerChildren: STAGGER
          }
        }
      }

  const linkVariants = reduced
    ? { closed: {}, open: {} }
    : {
        closed: {
          opacity: 0,
          y: -DISTANCE.sm,
          transition: { duration: DURATION.fast, ease: EASE.inOut }
        },
        open: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.base, ease: EASE.out }
        }
      }

  // Each bar rotates about its own centre, so the outer two land on the middle
  // of the icon once they are translated 6px inwards.
  const barTransition = reduced
    ? { duration: 0 }
    : { duration: DURATION.fast, ease: EASE.out }

  return (
    <>
      {/*
        Zero-height scroll sentinel. Out of flow and invisible, positioned
        against the page wrapper rather than the sticky header.
      */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 h-0"
        style={{ top: CONDENSE_OFFSET }}
      />

      <header
        className={`bg-gray-dark sticky top-0 z-50 transition-shadow duration-base ease-out-expo ${
          isCondensed ? 'shadow-xl backdrop-blur-sm' : 'shadow-md'
        }`}
      >
        <div className="container mx-auto px-4">
          {/*
            Height is animated on this row only. The header stays in flow and
            stays sticky; the 12px it gives back is handed over across the same
            320ms as everything else, so nothing snaps.
          */}
          <div
            className="flex justify-between items-center transition-[height] duration-base ease-out-expo"
            style={{ height: isCondensed ? BAR_HEIGHT_CONDENSED : BAR_HEIGHT }}
          >
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span
                className="origin-left text-2xl font-bold text-white transition-transform duration-base ease-out-expo"
                style={{ transform: isCondensed ? 'scale(0.9)' : 'scale(1)' }}
              >
                Marc's Fahrschule
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="nav-link text-white hover:text-gray-200 font-medium rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-dark"
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden text-white hover:text-gray-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls={MOBILE_MENU_ID}
              aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <m.line
                  x1="4"
                  y1="6"
                  x2="20"
                  y2="6"
                  strokeWidth={2}
                  strokeLinecap="round"
                  animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={barTransition}
                />
                <m.line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                  strokeWidth={2}
                  strokeLinecap="round"
                  // Motion mirrors opacity onto the SVG attribute as well as
                  // the style, and without a declared starting value the
                  // attribute renders literally as opacity="undefined" until
                  // the first frame. Browsers ignore the invalid value, but
                  // there is no reason to ship it.
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                  transition={barTransition}
                />
                <m.line
                  x1="4"
                  y1="18"
                  x2="20"
                  y2="18"
                  strokeWidth={2}
                  strokeLinecap="round"
                  animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={barTransition}
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence initial={false}>
            {isMenuOpen && (
              <m.nav
                key="mobile-navigation"
                id={MOBILE_MENU_ID}
                className="md:hidden overflow-hidden"
                variants={panelVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {/*
                  The padding lives on an inner element so that the panel can
                  actually reach a height of zero while collapsing.
                */}
                <div className="space-y-2 pb-4">
                  {navItems.map((item) => (
                    <m.div key={item.path} variants={linkVariants}>
                      {/*
                        No centre-growing underline here: these links are full
                        width, so the active route is marked with a left rule
                        and full-strength text instead. The rule is present but
                        transparent when inactive, which keeps the indent - and
                        therefore the layout - identical in both states.
                      */}
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `block border-l-2 pl-3 font-medium transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                            isActive
                              ? 'border-white text-white'
                              : 'border-transparent text-white/70 hover:text-white'
                          }`
                        }
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </NavLink>
                    </m.div>
                  ))}
                </div>
              </m.nav>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  )
}

export default Header
