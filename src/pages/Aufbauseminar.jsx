import { Helmet } from 'react-helmet-async'

function Aufbauseminar() {
  const topics = [
    'Grundlagen des Verkehrsverhaltens',
    'Erkennen gefährder Fahrzeuge',
    'Sicherer Abstand und Zeitmanagement',
    'Besonderheiten bei Motorradfahrern',
    'Praktische Beispiele aus der Prüfung',
  ]

  return (
    <>
      <Helmet>
        <title>Aufbauseminar - Marc's Fahrschule Essen</title>
        <meta name="description" content="Unser Aufbauseminar für Lernfahrzeugführer. Verbessern Sie sichere Fahrweise und erhöhen Sie Ihre Prüfungschancen." />
      </Helmet>

      <section className="py-16 bg-dark-gray">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4 text-white">
            Aufbauseminar
          </h1>
          <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            Unser Aufbauseminar ist ein praktischer Tagesworkshop für Lernfahrzeugführer, die ihre Fahrpraxis verbessern möchten.
          </p>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-white">Seminarinhalte</h2>
            <ul className="space-y-4 mb-12">
              {topics.map((topic, index) => (
                <li key={index} className="flex items-start bg-gray-dark p-4 rounded-lg">
                  <span className="text-primary mr-3">✓</span>
                  <span className="text-gray-300">{topic}</span>
                </li>
              ))}
            </ul>

            <div className="bg-primary rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">Teilnahme möglich</h3>
              <p className="text-white mb-6">
                Das Seminar ist für alle Führerscheinklassen ab dem Lernfahrzeugführerberechtigung möglich.
              </p>
              <a
                href="tel:02013194371"
                className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors"
              >
                📞 Jetzt Termin vereinbaren
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Aufbauseminar