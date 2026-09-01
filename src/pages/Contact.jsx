import { Helmet } from 'react-helmet-async'
import ContactForm from '../components/ContactForm'

function Contact() {
  const officeHours = [
    { day: 'Montag', hours: '10:00-13:00 & 15:30-19:00' },
    { day: 'Dienstag', hours: '15:30-19:00' },
    { day: 'Mittwoch', hours: '10:00-13:00 & 15:30-19:00' },
    { day: 'Donnerstag', hours: '15:30-19:00' },
    { day: 'Freitag', hours: '10:00-13:00 & 15:30-19:00' },
    { day: 'Samstag', hours: 'Geschlossen' },
    { day: 'Sonntag', hours: 'Geschlossen' },
  ]

  // Google Maps embed for Reuenberg 83, 45357 Essen
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2492.928521358764!2d6.9299851!3d51.481402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8e9fd01d025c5%3A0x414029b4a958fe9d!2sReuenberg%2083%2C%2045357%20Essen!5e0!3m2!1sen!2sde!4v1721050000000"

  return (
    <>
      <Helmet>
        <title>Kontakt - Marc's Fahrschule Essen</title>
        <meta name="description" content="Kontaktieren Sie Marc's Fahrschule in Essen. Telefon, E-Mail, Adresse und Öffnungszeiten." />
      </Helmet>

      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Kontakt</h1>
          <p className="text-xl text-white opacity-90">Wir freuen uns auf Ihre Nachricht!</p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Kontaktinformationen</h2>

              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="font-bold text-white">Adresse</h3>
                  <p className="text-gray-300">
                    Marc's Fahrschule<br />
                    Reuenberg 83<br />
                    45357 Essen<br />
                    Deutschland
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-white">Telefon</h3>
                  <a href="tel:02013194371" className="text-primary hover:underline text-lg font-bold">
                    0201/3194371
                  </a>
                </div>

                <div>
                  <h3 className="font-bold text-white mb-2">Öffnungszeiten</h3>
                  <table className="text-gray-300">
                    <tbody>
                      {officeHours.map((item) => (
                        <tr key={item.day}>
                          <td className="pr-4 font-medium text-white">{item.day}:</td>
                          <td>{item.hours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="font-bold text-white mb-2">So erreichen Sie uns</h3>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/marcs_fahrschule" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Instagram
                    </a>
                    <a href="https://tiktok.com/@derfahrlehrermarc" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      TikTok
                    </a>
                    <a href="https://www.facebook.com/share/17wEPu5JMk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Nachricht senden</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-8 bg-gray-dark">
        <div className="container mx-auto px-4">
          <iframe 
            title="Standort von Marc's Fahrschule auf Google Maps"
            src={mapEmbedUrl}
            width="100%" 
            height="400" 
            style={{ border: 0, borderRadius: '0.5rem' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  )
}

export default Contact