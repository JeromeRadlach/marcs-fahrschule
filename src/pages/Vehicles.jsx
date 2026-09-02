import { Helmet } from 'react-helmet-async'
import { m } from 'motion/react'
import { vehicles } from '../data/vehicles'
import ZoomableImage from '../components/ZoomableImage'
import { useEntrance, useReveal } from '../lib/motion'

const CAR_CLASSES = ['B', 'BE']
const BIKE_CLASSES = ['A', 'A1', 'A2', 'AM']

function Vehicles() {
  // Filtered once, above the return, so each reveal group can be told how many
  // children it actually has.
  const cars = vehicles.filter((v) => CAR_CLASSES.some((c) => v.classes.includes(c)))
  const bikes = vehicles.filter((v) => BIKE_CLASSES.some((c) => v.classes.includes(c)))

  // The heading and lead sit above the fold, so they animate on mount rather
  // than waiting for a scroll trigger that has already passed.
  const intro = useEntrance({ count: 2 })

  // One group per section, and the heading is the first staggered item in it,
  // so it always leads the cards it introduces. The two sections get their own
  // groups because they scroll into view at different times.
  const carReveal = useReveal({ count: cars.length + 1 })
  const bikeReveal = useReveal({ count: bikes.length + 1 })

  return (
    <>
      <Helmet>
        <title>Fahrzeuge - Marc's Fahrschule Essen</title>
        <meta name="description" content="Unsere modernen Fahrzeuge für Klasse A, B, BE und AM. VW Taigo, T-Roc, Yamaha MT07, Honda CB125R und NIU Roller." />
      </Helmet>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <m.div {...intro.group}>
            <m.h1 {...intro.item} className="text-4xl font-bold text-center mb-4 text-white">
              Unsere Fahrzeuge
            </m.h1>
            <m.p {...intro.item} className="text-center text-gray-300 mb-12">
              Moderne Fahrzeuge für ein sicheres Fahrerlebnis
            </m.p>
          </m.div>

          {/* Cars */}
          <m.div {...carReveal.group}>
            <m.h2 {...carReveal.item} className="text-2xl font-bold mb-6 text-white">Autos (Klasse B/BE)</m.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {cars.map((vehicle) => (
                <m.div
                  key={vehicle.id}
                  {...carReveal.item}
                  className="u-card u-card-lift overflow-hidden"
                >
                  <div className="card-motion__media h-64 bg-gradient-to-br from-primary to-primary-dark">
                    <ZoomableImage
                      slug={vehicle.image}
                      alt={vehicle.alt}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{vehicle.name} ({vehicle.count}x)</h3>
                    <p className="text-gray-300 mb-2"><strong>Getriebe:</strong> {vehicle.transmission}</p>
                    <p className="text-gray-300">{vehicle.description}</p>
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* Motorcycles */}
          <m.div {...bikeReveal.group}>
            <m.h2 {...bikeReveal.item} className="text-2xl font-bold mb-6 text-white">Motorräder & Roller</m.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bikes.map((vehicle) => (
                <m.div
                  key={vehicle.id}
                  {...bikeReveal.item}
                  className="u-card u-card-lift overflow-hidden"
                >
                  <div className="card-motion__media h-64 bg-gradient-to-br from-primary to-primary-dark">
                    <ZoomableImage
                      slug={vehicle.image}
                      alt={vehicle.alt}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{vehicle.name} ({vehicle.count}x)</h3>
                    <p className="text-gray-300 mb-2"><strong>Getriebe:</strong> {vehicle.transmission}</p>
                    <p className="text-gray-300">{vehicle.description}</p>
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </section>
    </>
  )
}

export default Vehicles
