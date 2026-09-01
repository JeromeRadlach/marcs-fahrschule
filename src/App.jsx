import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LazyMotion, MotionConfig, domAnimation, m, useReducedMotion } from 'motion/react'
import Header from './components/Header'
import Footer from './components/Footer'
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
        LazyMotion with the domAnimation feature set, paired with the m
        component instead of motion. domAnimation covers transforms, opacity,
        variants, gestures and AnimatePresence - everything this site uses.
        Nothing here needs layout animation or SVG path drawing, which is what
        the heavier domMax set would add.

        features is passed the set directly rather than a dynamic import.
        Deferring it does move about 12KB gzipped off the entry chunk, but Vite
        emits no modulepreload for it, so it is only requested once the entry
        has run. Until it lands, every m element with a hidden initial - the
        hero headline among them - renders at opacity 0, and stays that way for
        good if the request fails. Trading a blank LCP element for 12KB is the
        wrong way round on a page whose job is to be read immediately.

        reducedMotion="user" is the backstop: any animation added later that
        forgets to check the preference still has its transforms dropped.
      */}
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <Router basename="/marcs-fahrschule">
            <ScrollToTop />
            <div className="relative min-h-screen bg-dark-gray text-white">
              {/*
                Brand background, shown at full opacity. Fixed so it stays put while
                the page scrolls, and sitting above the wrapper's own background
                rather than behind it, which would hide it entirely.

                The backdrop is black because the source artwork is an opaque black
                square: matching it means the edges of the image disappear instead
                of showing as a box. background-size: contain keeps the whole emblem
                visible at any viewport shape.

                Two layers: the artwork centred on top, and a grain tile lifted from
                the artwork's own backdrop repeating underneath it. Flat #000 around
                the edges would not match - the source backdrop is faintly dithered,
                so the join would show as a clean rectangle against speckle.

                aria-hidden and pointer-events-none keep it out of the accessibility
                tree and out of the way of clicks.
              */}
              <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-0 bg-black"
                style={{
                  backgroundImage: [
                    `url(${import.meta.env.BASE_URL}images/background-1400.webp)`,
                    `url(${import.meta.env.BASE_URL}images/background-grain.png)`
                  ].join(', '),
                  backgroundPosition: 'center, center',
                  backgroundSize: 'contain, auto',
                  backgroundRepeat: 'no-repeat, repeat'
                }}
              />

              <div className="relative z-10 flex min-h-screen flex-col">
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
