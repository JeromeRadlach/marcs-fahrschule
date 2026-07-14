import { Helmet } from 'react-helmet-async'
import { vehicles } from '../data/vehicles'

function Vehicles() {
  return (
    <>
      <Helmet>
        <title>Fahrzeuge - Marc's Fahrschule Essen</title>
        <meta name="description" content="Unsere modernen Fahrzeuge für Klasse A, B, BE und AM. VW Taigo, T-Roc, Yamaha MT07, Honda CB125R und NIU Roller." />
      </Helmet>

      <section className="py-16 bg-dark-gray">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4 text-white">
            Unsere Fahrzeuge
          </h1>
          <p className="text-center text-gray-300 mb-12">
            Moderne Fahrzeuge für ein sicheres Fahrerlebnis
          </p>

          {/* Cars */}
          <h2 className="text-2xl font-bold mb-6 text-white">Autos (Klasse B/BE)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {vehicles.filter(v => ['B', 'BE'].some(c => v.classes.includes(c))).map((vehicle) => (
              <div key={vehicle.id} className="bg-gray-dark rounded-lg overflow-hidden shadow-lg">
                <div className="h-48 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <span className="text-white text-lg font-bold">{vehicle.name}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{vehicle.name} ({vehicle.count}x)</h3>
                  <p className="text-gray-300 mb-2"><strong>Getriebe:</strong> {vehicle.transmission}</p>
                  <p className="text-gray-300">{vehicle.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Motorcycles */}
          <h2 className="text-2xl font-bold mb-6 text-white">Motorräder & Roller</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.filter(v => ['A', 'A1', 'A2', 'AM'].some(c => v.classes.includes(c))).map((vehicle) => (
              <div key={vehicle.id} className="bg-gray-dark rounded-lg overflow-hidden shadow-lg">
                <div className="h-48 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <span className="text-white text-lg font-bold">{vehicle.name}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{vehicle.name} ({vehicle.count}x)</h3>
                  <p className="text-gray-300 mb-2"><strong>Getriebe:</strong> {vehicle.transmission}</p>
                  <p className="text-gray-300">{vehicle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Vehicles