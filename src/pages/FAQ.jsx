import { Helmet } from 'react-helmet-async'
import { faqData } from '../data/faq'

function FAQ() {
  return (
    <>
      <Helmet>
        <title>FAQ - Marc's Fahrschule Essen</title>
        <meta name="description" content="Häufig gestellte Fragen zur Fahrschule, Führerscheinklassen, Theorie und Praxis." />
      </Helmet>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12 text-white">
            Häufige Fragen
          </h1>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqData.map((faq) => (
                <div key={faq.id} className="bg-gray-dark rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-3 text-white">{faq.question}</h2>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center bg-primary text-white p-6 rounded-lg">
              <p className="text-lg mb-4">Haben Sie weitere Fragen?</p>
              <a href="tel:+492013194371" className="text-white hover:underline font-bold">
                📞 0201/3194371
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQ