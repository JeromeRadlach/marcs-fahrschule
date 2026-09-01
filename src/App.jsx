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
            Decorative brand watermark. Fixed so it stays put while the page
            scrolls, and behind the content layer below rather than behind the
            wrapper's own background, which would hide it entirely. Very low
            opacity keeps body text legible; aria-hidden and pointer-events-none
            keep it out of the accessibility tree and out of the way of clicks.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 bg-center bg-no-repeat opacity-[0.07]"
            style={{
              backgroundImage: `url(${import.meta.env.BASE_URL}images/emblem-900.webp)`,
              backgroundSize: 'min(80vw, 620px)'
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