import { Helmet } from 'react-helmet-async'

function Impressum() {
  return (
    <>
      <Helmet>
        <title>Impressum - Marc's Fahrschule Essen</title>
      </Helmet>

      <section className="py-16 bg-dark-gray">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-white">Impressum</h1>

          <div className="max-w-3xl">
            <div className="space-y-4 text-gray-300">
              <p><strong>Marc's Fahrschule</strong></p>
              <p>Reuenberg 83<br />45357 Essen<br />Deutschland</p>
              <p><strong>Telefon:</strong> <a href="tel:02013194371" className="text-primary hover:underline">0201/3194371</a></p>
              <p><strong>E-Mail:</strong> <a href="mailto:info@marcsfahr.schule" className="text-primary hover:underline">info@marcsfahr.schule</a></p>
              <p><strong>Vertreten durch:</strong> Marc [Nachname]</p>
              <p><strong>Umsatz-ID:</strong> [Wird nachgereicht]</p>
              <p><strong>Berufshaftpflichtversicherung:</strong> [Versicherungsdetails]</p>
              <p><strong>Aufsichtsbehörde:</strong> Bezirkshauptmannschaft [Ordnungsbehörde] Essen</p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Haftung für Inhalte</h2>
              <p>
                Die Inhalte dieser Seite wurden mit größtmöglicher Sorgfalt erstellt. 
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewährleistung übernommen werden.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Impressum