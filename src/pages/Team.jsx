import { Helmet } from 'react-helmet-async'
import { team, officeTeam } from '../data/team'

function Team() {
  return (
    <>
      <Helmet>
        <title>Das Team - Marc's Fahrschule Essen</title>
        <meta name="description" content="Lernen Sie unser Team kennen. Erfahrene Fahrlehrer und freundliches Büroteam für Ihre Fahrtraining." />
      </Helmet>

      <section className="py-16 bg-dark-gray">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4 text-white">
            Unser Team
          </h1>
          <p className="text-center text-gray-300 mb-12">
            Wir stehen mit Kompetenz, Fachwissen und guter Laune vom Anfang bis zum Ende an Eurer Seite...
          </p>

          {/* Instructors */}
          <h2 className="text-2xl font-bold mb-6 text-white">Fahrlehrer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {team.map((member) => (
              <div key={member.id} className="bg-gray-dark rounded-lg overflow-hidden shadow-lg text-center">
                <div className="h-64 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{member.name}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Office Team */}
          <h2 className="text-2xl font-bold mb-6 text-white">Büro & Organisation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {officeTeam.map((member) => (
              <div key={member.id} className="bg-gray-dark rounded-lg overflow-hidden shadow-lg text-center">
                <div className="h-64 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{member.name}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Team