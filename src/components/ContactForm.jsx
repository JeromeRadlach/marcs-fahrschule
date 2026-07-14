import { useState } from 'react'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    licenseClass: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(() => setIsSubmitted(false), 5000)
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          licenseClass: ''
        })
      } else {
        console.error('Error sending message')
        const errorData = await response.json()
        alert('Fehler: ' + (errorData.message || 'Unbekannt'))
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Verbindungsfehler. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const licenseClasses = ['A', 'A1', 'A2', 'B', 'BE', 'AM', 'B196', 'FES', 'ASF']

  return (
    <div className="max-w-2xl mx-auto">
      {isSubmitted ? (
        <div className="bg-green-900 border border-green-500 text-green-200 px-4 py-3 rounded mb-4">
          Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                maxLength={500}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-dark text-white"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                E-Mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                maxLength={500}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-dark text-white"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={500}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-dark text-white"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="licenseClass" className="block text-sm font-medium text-gray-300 mb-2">
                Gewünschte Klasse
              </label>
              <select
                id="licenseClass"
                name="licenseClass"
                value={formData.licenseClass}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-dark text-white"
                disabled={isSubmitting}
              >
                <option value="">Bitte wählen...</option>
                {licenseClasses.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Nachricht *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              maxLength={500}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-dark text-white"
              placeholder="Wie können wir Ihnen helfen?"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
          </button>
        </form>
      )}
    </div>
  )
}

export default ContactForm