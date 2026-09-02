import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LazyMotion, MotionConfig, domMax, m, useReducedMotion } from 'motion/react'
import Header from './components/Header'
import Footer from './components/Footer'
import Backdrop from './components/Backdrop'
import ScrollToTop from './components/ScrollToTop'
import BackToTop from './components/BackToTop'
import { DURATION, DISTANCE, EASE } from './lib/motion'
import Home from './pages/Home'
import Vehicles from './pages/Vehicles'
import Team from './pages/Team'
import Aufbauseminar from './pages/Aufbauseminar'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'

// The routed pages, wrapped in a per-route entry animation.
//
// Keying on pathname remounts the wrapper on every navigation, which replays
// the animation. There is no matching exit: animating the old page out before
// the new one arrives would double how long a navigation feels, and this site
// is built around getting people to the phone number quickly.
function AnimatedRoutes() {
  const location = useLocation()
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
      key={location.pathname}
      initial={prefersReducedMotion ? false : { opacity: 0, y: DISTANCE.sm }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/fahrzeuge" element={<Vehicles />} />
        <Route path="/team" element={<Team />} />
        <Route path="/aufbauseminar" element={<Aufbauseminar />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
      </Routes>
    </m.div>
  )
}

function App() {
  return (
    <HelmetProvider>
      {/*
        LazyMotion with the domMax feature set, paired with the m component
        instead of motion. The header's active-tab pill slides between nav
        items via layoutId, and layout animations live in domMax only -
        domAnimation would leave the pill snapping.

        features is passed the set directly rather than a dynamic import.
        Deferring it does move some weight off the entry chunk, but Vite
        emits no modulepreload for it, so it is only requested once the entry
        has run. Until it lands, every m element with a hidden initial - the
        hero headline among them - renders at opacity 0, and stays that way for
        good if the request fails. Trading a blank LCP element for a few KB is
        the wrong way round on a page whose job is to be read immediately.

        reducedMotion="user" is the backstop: any animation added later that
        forgets to check the preference still has its transforms dropped.
      */}
      <LazyMotion features={domMax} strict>
        <MotionConfig reducedMotion="user">
          {/*
            Derived from Vite's base rather than hardcoded, so a build for the
            domain root and a build for the GitHub Pages subpath both route
            correctly. React Router trims the trailing slash that BASE_URL
            carries, and a base of "/" leaves the basename empty.
          */}
          <Router basename={import.meta.env.BASE_URL}>
            <ScrollToTop />
            <div className="relative min-h-screen bg-dark-gray text-white">
              {/* Aurora backdrop: fixed, decorative, behind everything. */}
              <Backdrop />

              {/*
                The navigation bar is fixed at the bottom of the viewport on
                mobile and at the top on desktop; the content column reserves
                its height on whichever edge it occupies (the tokens flip at
                the lg breakpoint).
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
                  <AnimatedRoutes />
                </main>
                <Footer />
              </div>

              <BackToTop />
            </div>
          </Router>
        </MotionConfig>
      </LazyMotion>
    </HelmetProvider>
  )
}

export default App
