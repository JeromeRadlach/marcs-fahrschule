import { Helmet } from 'react-helmet-async'

function Datenschutz() {
  return (
    <>
      <Helmet>
        <title>Datenschutz - Marc's Fahrschule Essen</title>
      </Helmet>

      <section className="py-16 bg-dark-gray">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-white">Datenschutzerklärung</h1>

          <div className="max-w-3xl space-y-6 text-gray-300">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-lg font-bold mb-2 text-white">Personenbezogene Daten</h3>
              <p>
                Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder 
                identifizierbare natürliche Person beziehen. Hierzu zählen u. a. Name, Adresse, E-Mail-Adresse, 
                Telefonnummer, Geburtsdatum, oder Angaben zu physischen, psychischen, wirtschaftlichen oder 
                sozialen Verhältnissen.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">2. Allgemeine Informationen</h2>
              <h3 className="text-lg font-bold mb-2 text-white">Datenerfassung auf unserer Website</h3>
              <p>
                Beim Besuch unserer Website werden durch den Webhosting-Provider standardmäßig 
                Logdateien erstellt. Diese enthalten u. a. den Browsertyp, das Betriebssystem, 
                die Referrer-URL, die IP-Adresse und Uhrzeit des Zugriffs. Diese Daten werden 
                anonymisiert und dienen der Sicherheit und Optimierung unserer Website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">3. Datenerfassung und -verwendung</h2>
              <h3 className="text-lg font-bold mb-2 text-white">Ihre personenbezogenen Daten werden von uns nur im Rahmen folgender Zwecke verwendet:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Terminvereinbarung und -absprache</li>
                <li>Beratung zu Führerschein-Themen</li>
                <li>Bearbeitung von Anfragen</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">4. Ihre Rechte</h2>
              <p>Sie haben das Recht auf:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Auskunft über Ihre personenbezogenen Daten</li>
                <li>Berichtigung unrichtiger Daten</li>
                <li>Löschung Ihrer Daten</li>
                <li>Einschränkung der Datenverarbeitung</li>
                <li>Datenübertragbarkeit</li>
                <li>Widerspruch gegen die Datenverarbeitung</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">5. Kontakt</h2>
              <p>Wenn Sie Fragen zum Datenschutz haben, wenden Sie sich bitte an:</p>
              <p>
                Marc's Fahrschule<br />
                Reuenberg 83<br />
                45357 Essen<br />
                E-Mail: <a href="mailto:info@marcsfahr.schule" className="text-primary hover:underline">info@marcsfahr.schule</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Datenschutz