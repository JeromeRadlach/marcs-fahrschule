import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

function Home() {
  const licenseClasses = [
    { name: 'Klasse B', path: '/fahrzeuge', icon: '🚗' },
    { name: 'Klasse A', path: '/fahrzeuge', icon: '🏍️' },
    { name: 'Klasse BE', path: '/fahrzeuge', icon: '🚐' },
    { name: 'Klasse AM', path: '/fahrzeuge', icon: '🛵' },
  ]

  return (
    <>
      <Helmet>
        <title>Marc's Fahrschule Essen - Führerschein A, B, BE, AM</title>
        <meta name="description" content="Marc's Fahrschule in Essen bietet professionelles Fahrtraining für Klasse A, B, BE und AM. Erfahrene Fahrlehrer, moderne Fahrzeuge, individuelle Betreuung." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-dark-gray text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Herzlich willkommen bei <span className="text-primary">Marc's Fahrschule</span>
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Eure Zukunft beginnt hier! Professionelle Fahrtraining in Essen für alle Klassen.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/kontakt"
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Jetzt Anfrage senden
                </Link>
                <a
                  href="tel:+492013194371"
                  className="border border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  📞 0201/3194371
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* License Classes */}
      <section className="py-16 bg-dark-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Führerschein Klassen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {licenseClasses.map((license) => (
              <Link
                key={license.name}
                to={license.path}
                className="bg-gray-dark hover:bg-gray-600 rounded-lg p-6 text-center transition-colors group"
              >
                <div className="text-5xl mb-4">{license.icon}</div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary">
                  {license.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Warum Marc's Fahrschule?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">👨‍🏫</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Erfahrene Fahrlehrer</h3>
              <p className="text-gray-300">
                Unser Team aus 5 Fahrlehrern und 3 Büromitarbeitern steht Ihnen mit Kompetenz zur Seite.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🚗</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Moderne Fahrzeuge</h3>
              <p className="text-gray-300">
                Wir führen Markenfahrzeuge von VW, Opel, Yamaha und Honda in verschiedenen GetriebeVarianten.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Individuelle Betreuung</h3>
              <p className="text-gray-300">
                Flexible Termine und persönliche Betreuung von der Theorie bis zum Praktischen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Same as Hero */}
      <section className="py-16 bg-dark-gray">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bereit für Ihren Führerschein?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.
          </p>
          <Link
            to="/kontakt"
            className="bg-primary text-white hover:bg-primary-dark font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Jetzt Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home