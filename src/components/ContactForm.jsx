import { useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { DISTANCE, DURATION, EASE } from '../lib/motion'

const SUCCESS_MESSAGE = 'Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich.'

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
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

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
        // A failing endpoint often answers with an HTML error page rather than
        // JSON. Parsing that throws, and without this guard the throw would
        // escape into the catch below and be reported as a connection problem,
        // which it is not.
        let errorData = null
        try {
          errorData = await response.json()
        } catch (parseError) {
          console.error('Error parsing error response:', parseError)
        }
        setError(`Fehler: ${errorData?.message || 'Unbekannt'}`)
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Verbindungsfehler. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const licenseClasses = ['A', 'A1', 'A2', 'B', 'BE', 'AM', 'B196', 'FES', 'ASF']

  return (
    <div className="max-w-2xl mx-auto">
      {/*
        Announcements are made from here rather than from the visible panels
        below.

        A live region has to already be in the document for a screen reader to
        watch it. The success panel and the error banner are both inserted into
        the DOM at the same moment as their text, and an element that arrives
        already carrying its content is frequently not announced at all - the
        reader has nothing to compare against. These two regions are mounted for
        the life of the component and only their text changes, which is the case
        every screen reader handles.
      */}
      <div role="status" aria-live="polite" className="sr-only">
        {isSubmitted ? SUCCESS_MESSAGE : ''}
      </div>
      <div role="alert" aria-live="assertive" className="sr-only">
        {error}
      </div>

      {/*
        mode="wait" so the form is fully gone before the confirmation arrives;
        the two overlapping would read as a glitch rather than a transition.
        initial={false} keeps the form from fading in on first paint - it is
        the page's resting state, not an event.
      */}
      <AnimatePresence mode="wait" initial={false}>
        {isSubmitted ? (
          <m.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.base, ease: EASE.out }}
            className="bg-green-900 border border-green-500 text-green-200 px-4 py-3 rounded mb-4 flex items-center gap-3"
          >
            {/*
              A static checkmark that scales in just after the panel, rather
              than a drawn path: pathLength lives in domMax and this app loads
              domAnimation, so a draw effect would either not run or force the
              heavier feature bundle in for one flourish. aria-hidden because
              the sentence beside it already says the same thing.
            */}
            <m.svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 shrink-0"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: DURATION.base, ease: EASE.out, delay: DURATION.fast }}
            >
              <path d="M5 13l4 4L19 7" />
            </m.svg>
            <span>{SUCCESS_MESSAGE}</span>
          </m.div>
        ) : (
          <m.form
            key="form"
            onSubmit={handleSubmit}
            aria-busy={isSubmitting}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE.out }}
            className="space-y-6"
          >
            {/*
              `group` on each field wrapper is what lets the label react to
              focus inside the control below it: a sibling selector cannot
              reach backwards from the input to the label, and doing it in CSS
              keeps the form free of per-field React state.
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-fast group-focus-within:text-primary">
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
                  className="input-motion w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-dark text-white"
                  disabled={isSubmitting}
                />
              </div>
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-fast group-focus-within:text-primary">
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
                  className="input-motion w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-dark text-white"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-fast group-focus-within:text-primary">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={500}
                  className="input-motion w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-dark text-white"
                  disabled={isSubmitting}
                />
              </div>
              <div className="group">
                <label htmlFor="licenseClass" className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-fast group-focus-within:text-primary">
                  Gewünschte Klasse
                </label>
                <select
                  id="licenseClass"
                  name="licenseClass"
                  value={formData.licenseClass}
                  onChange={handleChange}
                  className="input-motion w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-dark text-white"
                  disabled={isSubmitting}
                >
                  <option value="">Bitte wählen...</option>
                  {licenseClasses.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="group">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 transition-colors duration-fast group-focus-within:text-primary">
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
                className="input-motion w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-dark text-white"
                placeholder="Wie können wir Ihnen helfen?"
                disabled={isSubmitting}
              />
            </div>

            <AnimatePresence>
              {error && (
                <m.div
                  key="error"
                  initial={{ opacity: 0, y: -DISTANCE.sm }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -DISTANCE.sm }}
                  transition={{ duration: DURATION.base, ease: EASE.out }}
                  className="bg-red-900 border border-red-500 text-red-200 px-4 py-3 rounded"
                >
                  {error}
                </m.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-motion w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50"
            >
              {/*
                Both labels sit in the same grid cell, so the box is sized by
                whichever is wider and the crossfade cannot shift anything.
                Preferred over a min-width because there is no magic number to
                re-measure when the copy, the font or the language changes.
              */}
              <span className="grid place-items-center">
                <m.span
                  className="col-start-1 row-start-1 flex items-center gap-2"
                  aria-hidden={!isSubmitting}
                  animate={{ opacity: isSubmitting ? 1 : 0 }}
                  transition={{ duration: DURATION.fast, ease: EASE.out }}
                >
                  {/*
                    An indefinite loop, so it is a CSS animation rather than a
                    Motion component - nothing here needs a JS frame loop
                    running for the whole request.
                  */}
                  <svg
                    aria-hidden="true"
                    className="animate-spin h-4 w-4 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Wird gesendet...
                </m.span>
                <m.span
                  className="col-start-1 row-start-1"
                  aria-hidden={isSubmitting}
                  animate={{ opacity: isSubmitting ? 0 : 1 }}
                  transition={{ duration: DURATION.fast, ease: EASE.out }}
                >
                  Nachricht senden
                </m.span>
              </span>
            </button>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ContactForm
