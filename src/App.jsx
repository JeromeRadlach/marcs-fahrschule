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
        <div className="min-h-screen flex flex-col bg-dark-gray text-white">
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
      </Router>
    </HelmetProvider>
  )
}

export default App