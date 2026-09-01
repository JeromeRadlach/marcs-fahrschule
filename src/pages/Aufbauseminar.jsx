import { Helmet } from 'react-helmet-async'
import { m } from 'motion/react'
import { useEntrance, useReveal } from '../lib/motion'

function Aufbauseminar() {
  const topics = [
    'Grundlagen des Verkehrsverhaltens',
    'Erkennen gefährder Fahrzeuge',
    'Sicherer Abstand und Zeitmanagement',
    'Besonderheiten bei Motorradfahrern',
    'Praktische Beispiele aus der Prüfung',
  ]

  // Headline and lead are above the fold, so they enter on mount.
  const intro = useEntrance({ count: 2 })

  // A standalone element gets both bags: `group` supplies the viewport trigger,
  // `item` overrides the empty group variants with the actual fade-up. Under
  // reduced motion both are empty objects and nothing animates.
  const heading = useReveal({ count: 1 })
  const list = useReveal({ count: topics.length })
  const cta = useReveal({ count: 1 })

  return (
    <>
      <Helmet>
        <title>Aufbauseminar - Marc's Fahrschule Essen</title>
        <meta name="description" content="Unser Aufbauseminar für Lernfahrzeugführer. Verbessern Sie sichere Fahrweise und erhöhen Sie Ihre Prüfungschancen." />
      </Helmet>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* The entrance group wraps only the intro. Putting it on the
              container would propagate its `visible` state into the scroll
              reveals below and fire them all on mount. */}
          <m.div {...intro.group}>
            <m.h1 {...intro.item} className="text-4xl font-bold text-center mb-4 text-white">
              Aufbauseminar
            </m.h1>
            <m.p {...intro.item} className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
              Unser Aufbauseminar ist ein praktischer Tagesworkshop für Lernfahrzeugführer, die ihre Fahrpraxis verbessern möchten.
            </m.p>
          </m.div>

          <div className="max-w-3xl mx-auto">
            <m.h2 {...heading.group} {...heading.item} className="text-2xl font-bold mb-6 text-white">
              Seminarinhalte
            </m.h2>
            <m.ul {...list.group} className="space-y-4 mb-12">
              {topics.map((topic, index) => (
                <m.li key={index} {...list.item} className="flex items-start bg-gray-dark p-4 rounded-lg">
                  <span className="text-primary mr-3">✓</span>
                  <span className="text-gray-300">{topic}</span>
                </m.li>
              ))}
            </m.ul>

            <m.div {...cta.group} {...cta.item} className="bg-primary rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">Teilnahme möglich</h3>
              <p className="text-white mb-6">
                Das Seminar ist für alle Führerscheinklassen ab dem Lernfahrzeugführerberechtigung möglich.
              </p>
              {/* inline-block, not the default inline: a transform has no
                  effect on a non-replaced inline box, so the press and lift
                  would silently do nothing without it. */}
              <a
                href="tel:+492013194371"
                className="inline-block bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-lg btn-motion"
              >
                📞 Jetzt Termin vereinbaren
              </a>
            </m.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Aufbauseminar
