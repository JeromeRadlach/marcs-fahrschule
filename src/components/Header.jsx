import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { DISTANCE, DURATION, EASE } from '../lib/motion'

// The mobile panel is referenced by the burger button through aria-controls,
// so the id has to be stable and shared between the two.
const MOBILE_MENU_ID = 'mobile-navigation'

const STAGGER = 0.04

// The whole navigation chrome is one fixed bar at the BOTTOM of the
// viewport: brand on the left, the pill navigation in the middle (desktop),
// the call CTA on the right. On mobile the pills give way to a burger
// button whose panel opens upwards out of the bar.
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduced = useReducedMotion()

  const navItems = [
    { name: 'Start', path: '/' },
    { name: 'Fahrzeuge', path: '/fahrzeuge' },
    { name: 'Team', path: '/team' },
    { name: 'Aufbauseminar', path: '/aufbauseminar' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Kontakt', path: '/kontakt' },
  ]

  // Deliberately bound to window.scrollY + the native scroll event so the
  // state also engages reliably on touch devices.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The one place on the site that animates height. Opening grows the panel
  // upwards out of the bar and staggers the links in behind it; closing is a
  // plain symmetric collapse with no stagger, so the menu never appears to
  // unravel.
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
          y: DISTANCE.sm,
          transition: { duration: DURATION.fast, ease: EASE.inOut }
        },
        open: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.base, ease: EASE.out }
        }
      }

  // Each bar rotates about its own centre, so the outer two land on the
  // middle of the icon once they are translated 6px inwards.
  const barTransition = reduced
    ? { duration: 0 }
    : { duration: DURATION.fast, ease: EASE.out }

  return (
    <header
      className="fixed inset-x-0 bottom-0 lg:bottom-auto lg:top-0"
      style={{ zIndex: 'var(--z-header)' }}
    >
      {/*
        Surface, border and shadow live in .u-chrome-bar: their direction
        flips with the breakpoint. backdrop-filter stays inline and out of
        the transition list - the value is identical in both states, and an
        animatable backdrop-filter is the most expensive property CSS has
        to offer.
      */}
      <div
        className="u-chrome-bar"
        data-scrolled={scrolled}
        style={{
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)'
        }}
      >
        {/*
          The panel sits above the bar row inside this bottom-anchored
          container, so animating its height grows it upwards.
        */}
        <AnimatePresence initial={false}>
          {isMenuOpen && (
            <m.nav
              key="mobile-navigation"
              id={MOBILE_MENU_ID}
              aria-label="Hauptnavigation"
              className="overflow-hidden lg:hidden"
              variants={panelVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/*
                The padding lives on an inner element so that the panel can
                actually reach a height of zero while collapsing.
              */}
              <div className="space-y-1 px-4 pt-3 sm:px-6">
                {navItems.map((item) => (
                  <m.div key={item.path} variants={linkVariants}>
                    {/*
                      No flying pill here: these links are full width, so the
                      active route gets the solid primary pill directly and
                      everything else stays a quiet nav item.
                    */}
                    <NavLink
                      to={item.path}
                      className="u-navitem relative flex items-center rounded-[var(--radius-xl)] px-4"
                      style={{
                        minHeight: 'var(--touch-min)',
                        fontSize: 'var(--text-md)',
                        fontWeight: 'var(--weight-semibold)'
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 rounded-[var(--radius-xl)]"
                              style={{
                                background: 'var(--color-primary-500)',
                                boxShadow: 'var(--shadow-primary)'
                              }}
                            />
                          )}
                          <span className="relative z-10">{item.name}</span>
                        </>
                      )}
                    </NavLink>
                  </m.div>
                ))}
              </div>
            </m.nav>
          )}
        </AnimatePresence>

        {/* The bar row itself */}
        <div
          className="mx-auto flex items-center gap-3 px-4 sm:px-6"
          style={{
            maxWidth: 'var(--content-max)',
            height: 'var(--header-height)'
          }}
        >
          {/* Brand */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-3 rounded-[var(--radius-2xl)] px-1.5 py-1.5 text-left"
            aria-label="Zur Startseite"
          >
            <span
              className="relative grid place-items-center overflow-hidden rounded-[var(--radius-lg)]"
              style={{
                width: '44px',
                height: '44px',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--glow-primary)'
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt=""
                width={44}
                height={44}
                className="h-[38px] w-[38px] object-contain transition-transform duration-300 group-hover:scale-110"
                style={{ transitionTimingFunction: 'var(--ease-spring)' }}
              />
            </span>
            <span className="hidden leading-tight sm:block">
              <span
                className="block font-display font-bold"
                style={{ fontSize: 'var(--text-md)' }}
              >
                Marc's Fahrschule
              </span>
              <span
                className="block"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-2xs)',
                  letterSpacing: 'var(--tracking-caps)',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-tertiary)'
                }}
              >
                Essen
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Hauptnavigation" className="ml-auto hidden lg:flex">
            <ul
              className="flex items-center gap-2 rounded-[var(--radius-pill)] p-1.5"
              style={{
                background: 'var(--color-surface-sunken)',
                border: '1px solid var(--color-border)'
              }}
            >
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className="u-navitem relative flex items-center rounded-[var(--radius-pill)] px-4"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <m.span
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-[var(--radius-pill)]"
                            style={{
                              background: 'var(--color-primary-500)',
                              boxShadow: 'var(--shadow-primary)'
                            }}
                            transition={
                              reduced
                                ? { duration: 0 }
                                : { type: 'spring', stiffness: 420, damping: 34 }
                            }
                          />
                        )}
                        {/*
                          The active item carries its own surface as well:
                          while the layoutId pill flies between items the
                          label would otherwise sit ~200ms dark on dark.
                        */}
                        <span
                          className="relative z-10 flex items-center"
                          style={{
                            minHeight: 'var(--touch-min)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: isActive
                              ? 'var(--weight-black)'
                              : 'var(--weight-semibold)',
                            letterSpacing: 'var(--tracking-wide)'
                          }}
                        >
                          {item.name}
                        </span>
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 -z-10 rounded-[var(--radius-pill)]"
                            style={{ background: 'var(--color-primary-500)' }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Call CTA */}
          <a
            href="tel:+492013194371"
            className="btn btn-primary ml-auto flex-1 sm:flex-none lg:ml-3"
            style={{
              minHeight: 'var(--touch-min)',
              paddingInline: 'var(--space-4)',
              fontSize: 'var(--text-sm)'
            }}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ flex: 'none', display: 'block' }}
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="hidden sm:inline">0201/3194371</span>
            <span className="sm:hidden">Anrufen</span>
          </a>

          {/* Burger (mobile only) */}
          <button
            type="button"
            className="u-navitem grid shrink-0 place-items-center rounded-[var(--radius-lg)] lg:hidden"
            style={{
              width: 'var(--touch-min)',
              height: 'var(--touch-min)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)'
            }}
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
      </div>
    </header>
  )
}

export default Header
