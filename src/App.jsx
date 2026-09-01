import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Vehicles from './pages/Vehicles'
import Team from './pages/Team'
import Aufbauseminar from './pages/Aufbauseminar'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'

function App() {
  return (
    <HelmetProvider>
      <Router basename="/marcs-fahrschule">
        <div className="relative min-h-screen bg-dark-gray text-white">
          {/*
            Brand background, shown at full opacity. Fixed so it stays put while
            the page scrolls, and sitting above the wrapper's own background
            rather than behind it, which would hide it entirely.

            The backdrop is black because the source artwork is an opaque black
            square: matching it means the edges of the image disappear instead
            of showing as a box. background-size: contain keeps the whole emblem
            visible at any viewport shape.

            aria-hidden and pointer-events-none keep it out of the accessibility
            tree and out of the way of clicks.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 bg-black bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${import.meta.env.BASE_URL}images/background-1400.webp)`,
              backgroundSize: 'contain'
            }}
          />

          <div className="relative z-10 flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fahrzeuge" element={<Vehicles />} />
                <Route path="/team" element={<Team />} />
                <Route path="/aufbauseminar" element={<Aufbauseminar />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/kontakt" element={<Contact />} />
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App