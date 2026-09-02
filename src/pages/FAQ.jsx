import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { faqData } from '../data/faq'
import { DURATION, EASE, useEntrance, useReveal } from '../lib/motion'

// The accordion panel is one of the two places on the site allowed to animate
// height (see the note at the top of the motion section in index.css).
//
// Open and close run for the same length of time and differ only in their
// curve: entering gets the decisive ease-out, while collapsing gets the
// symmetric in-out so it reads as the panel retracting rather than snapping
// shut. This matches the mobile menu, the only other collapsing surface on the
// site, so the two never feel like different mechanisms.
const PANEL_OPEN = { duration: DURATION.base, ease: EASE.out }
const PANEL_CLOSE = { duration: DURATION.base, ease: EASE.inOut }
const PANEL_INSTANT = { duration: 0 }

function FAQ() {
  const [openId, setOpenId] = useState(null)
  const reduced = useReducedMotion()
  const heading = useEntrance({ count: 1 })
  const reveal = useReveal({ count: faqData.length })
  const cta = useReveal({ count: 1 })

  const toggle = (id) => setOpenId((current) => (current === id ? null : id))

  return (
    <>
      <Helmet>
        <title>FAQ - Marc's Fahrschule Essen</title>
        <meta name="description" content="Häufig gestellte Fragen zur Fahrschule, Führerscheinklassen, Theorie und Praxis." />
      </Helmet>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <m.div {...heading.group}>
            <m.h1 {...heading.item} className="text-4xl font-bold text-center mb-12 text-white">
              Häufige Fragen
            </m.h1>
          </m.div>

          <div className="max-w-3xl mx-auto">
            {/* The reveal moves the card (transform on the outer element); the
                accordion moves the panel (height on an inner element). They are
                different elements and different properties, so opening an item
                that has already revealed cannot fight the entrance. */}
            <m.div {...reveal.group} className="space-y-6">
              {faqData.map((faq) => {
                const isOpen = openId === faq.id
                const buttonId = `faq-question-${faq.id}`
                const panelId = `faq-panel-${faq.id}`

                return (
                  <m.div key={faq.id} {...reveal.item} className="u-card">
                    <h2 className="text-xl font-bold text-white">
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggle(faq.id)}
                        className="flex w-full items-center justify-between gap-4 rounded-[var(--radius-3xl)] p-6 text-left"
                      >
                        <span>{faq.question}</span>
                        <m.svg
                          aria-hidden="true"
                          className="h-5 w-5 flex-shrink-0 text-primary"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: DURATION.fast, ease: EASE.out }}
                        >
                          <polyline points="5 8 10 13 15 8" />
                        </m.svg>
                      </button>
                    </h2>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <m.div
                          id={panelId}
                          style={{ overflow: 'hidden' }}
                          initial={reduced ? false : { height: 0, opacity: 0 }}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                            transition: reduced ? PANEL_INSTANT : PANEL_OPEN
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: reduced ? PANEL_INSTANT : PANEL_CLOSE
                          }}
                        >
                          <p className="px-6 pb-6 text-gray-300">{faq.answer}</p>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </m.div>
                )
              })}
            </m.div>

            <m.div {...cta.group} className="mt-12">
              <m.div
                {...cta.item}
                className="u-card text-center p-6"
                style={{
                  borderColor: 'var(--color-primary-border-strong)',
                  boxShadow: 'var(--shadow-sm), var(--glow-primary)'
                }}
              >
                <p className="text-lg mb-4 text-gray-300">Haben Sie weitere Fragen?</p>
                <a href="tel:+492013194371" className="btn btn-primary">
                  📞 0201/3194371
                </a>
              </m.div>
            </m.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQ
