import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { m } from 'motion/react'
import { useEntrance, useReveal } from '../lib/motion'

// The license cards are router links, so they need the motion props applied to
// the Link itself - wrapping them in a motion div would turn the card inline
// and break the grid. Created once at module scope, never per render.
const MotionLink = m.create(Link)

function Home() {
  const licenseClasses = [
    { name: 'Klasse B', path: '/fahrzeuge', icon: '🚗' },
    { name: 'Klasse A', path: '/fahrzeuge', icon: '🏍️' },
    { name: 'Klasse BE', path: '/fahrzeuge', icon: '🚐' },
    { name: 'Klasse AM', path: '/fahrzeuge', icon: '🛵' },
  ]

  // The hero is above the fold and the h1 is the LCP element, so it enters on
  // mount with no added delay. Three items: headline, lead, and the button row
  // as a single unit - the two buttons sit side by side and staggering them
  // against each other reads as a glitch.
  const hero = useEntrance({ count: 3 })

  // A standalone element gets both bags: `group` supplies the viewport trigger,
  // `item` overrides the empty group variants with the actual fade-up. Under
  // reduced motion both are empty objects and nothing animates.
  const classesHeading = useReveal({ count: 1 })
  const classesGrid = useReveal({ count: licenseClasses.length })
  const featuresHeading = useReveal({ count: 1 })
  const featuresGrid = useReveal({ count: 3 })
  const cta = useReveal({ count: 3 })

  return (
    <>
      <Helmet>
        <title>Marc's Fahrschule Essen - Führerschein A, B, BE, AM</title>
        <meta name="description" content="Marc's Fahrschule in Essen bietet professionelles Fahrtraining für Klasse A, B, BE und AM. Erfahrene Fahrlehrer, moderne Fahrzeuge, individuelle Betreuung." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <m.div {...hero.group}>
              <m.h1 {...hero.item} className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Herzlich willkommen bei <span className="text-primary">Marc's Fahrschule</span>
              </m.h1>
              <m.p {...hero.item} className="text-xl mb-8 text-gray-300">
                Eure Zukunft beginnt hier! Professionelle Fahrtraining in Essen für alle Klassen.
              </m.p>
              <m.div {...hero.item} className="flex flex-wrap gap-4">
                <Link
                  to="/kontakt"
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg btn-motion"
                >
                  Jetzt Anfrage senden
                </Link>
                <a
                  href="tel:+492013194371"
                  className="border border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-8 rounded-lg btn-motion"
                >
                  📞 0201/3194371
                </a>
              </m.div>
            </m.div>
          </div>
        </div>
      </section>

      {/* License Classes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <m.h2
            {...classesHeading.group}
            {...classesHeading.item}
            className="text-3xl font-bold text-center mb-12 text-white"
          >
            Führerschein Klassen
          </m.h2>
          <m.div {...classesGrid.group} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {licenseClasses.map((license) => (
              <MotionLink
                key={license.name}
                {...classesGrid.item}
                to={license.path}
                className="bg-gray-dark hover:bg-gray-600 rounded-lg p-6 text-center group card-motion"
              >
                <div className="text-5xl mb-4">{license.icon}</div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary">
                  {license.name}
                </h3>
              </MotionLink>
            ))}
          </m.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-dark">
        <div className="container mx-auto px-4">
          <m.h2
            {...featuresHeading.group}
            {...featuresHeading.item}
            className="text-3xl font-bold text-center mb-12 text-white"
          >
            Warum Marc's Fahrschule?
          </m.h2>
          <m.div {...featuresGrid.group} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <m.div {...featuresGrid.item} className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">👨‍🏫</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Erfahrene Fahrlehrer</h3>
              <p className="text-gray-300">
                Unser Team aus 5 Fahrlehrern und 3 Büromitarbeitern steht Ihnen mit Kompetenz zur Seite.
              </p>
            </m.div>
            <m.div {...featuresGrid.item} className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🚗</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Moderne Fahrzeuge</h3>
              <p className="text-gray-300">
                Wir führen Markenfahrzeuge von VW, Opel, Yamaha und Honda in verschiedenen GetriebeVarianten.
              </p>
            </m.div>
            <m.div {...featuresGrid.item} className="text-center">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Individuelle Betreuung</h3>
              <p className="text-gray-300">
                Flexible Termine und persönliche Betreuung von der Theorie bis zum Praktischen.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* CTA Section - Same as Hero */}
      <section className="py-16">
        <m.div {...cta.group} className="container mx-auto px-4 text-center">
          <m.h2 {...cta.item} className="text-3xl font-bold text-white mb-4">
            Bereit für Ihren Führerschein?
          </m.h2>
          <m.p {...cta.item} className="text-gray-300 text-lg mb-8">
            Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.
          </m.p>
          {/* inline-block, not the default inline: a transform has no effect on
              a non-replaced inline box, so without it the press and lift would
              silently do nothing. It also makes the vertical padding actually
              occupy space instead of just painting over the lines around it.
              text-center on the section still centres the link. */}
          <m.div {...cta.item}>
            <Link
              to="/kontakt"
              className="inline-block bg-primary text-white hover:bg-primary-dark font-bold py-3 px-8 rounded-lg btn-motion"
            >
              Jetzt Kontakt aufnehmen
            </Link>
          </m.div>
        </m.div>
      </section>
    </>
  )
}

export default Home
