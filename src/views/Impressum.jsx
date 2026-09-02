function Impressum() {
  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-white">Impressum</h1>

          <div className="max-w-3xl">
            <div className="space-y-4 text-gray-300">
              <h2 className="text-2xl font-bold mb-4 text-white">Angaben gemäß § 5 DDG</h2>

              <p><strong>Marc's Fahrschule</strong><br />Inh. Marc Scheuten</p>
              <p>Reuenberg 83<br />45357 Essen<br />Deutschland</p>

              <p><strong>Telefon:</strong> <a href="tel:+492013194371" className="text-primary hover:underline">0201/3194371</a></p>
              <p><strong>Telefax:</strong> 0201/3194372</p>
              <p><strong>E-Mail:</strong> <a href="mailto:info@marcsfahr.schule" className="text-primary hover:underline">info@marcsfahr.schule</a></p>

              <p><strong>Vertreten durch:</strong> Marc Scheuten</p>
              <p><strong>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:</strong> DE 354931668</p>

              <p>
                <strong>Zuständige Aufsichtsbehörde:</strong><br />
                Stadt Essen &ndash; Einwohneramt<br />
                Kraftfahrzeugzulassungen und Fahrerlaubnisse<br />
                Altendorfer Str. 101<br />
                45143 Essen
              </p>

              <p>
                <strong>Berufsbezeichnung:</strong> Fahrlehrer<br />
                Verliehen in der Bundesrepublik Deutschland
              </p>
              <p>
                <strong>Berufsrechtliche Regelungen:</strong> Fahrlehrergesetz (FahrlG),{' '}
                <a
                  href="https://www.gesetze-im-internet.de/fahrlg_2018/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  einsehbar unter gesetze-im-internet.de
                </a>
              </p>

              <p><strong>Berufshaftpflichtversicherung:</strong> Angaben werden ergänzt</p>

              <p>
                <strong>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:</strong><br />
                Marc Scheuten, Reuenberg 83, 45357 Essen
              </p>

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
