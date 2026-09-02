'use client'

import Link from 'next/link'
import { m, useReducedMotion } from 'motion/react'
import { asset } from '../lib/base-path'
import { useEntrance, useReveal } from '../lib/motion'

// The license cards are router links, so they need the motion props applied to
// the Link itself - wrapping them in a motion div would turn the card inline
// and break the grid. Created once at module scope, never per render.
const MotionLink = m.create(Link)

function Home() {
  const licenseClasses = [
    { name: 'Klasse B', path: '/fahrzeuge', icon: '🚗' },
    { name: 'Klasse A', path: '/fahrzeuge', icon: '🏍️' },
    { name: 'Klasse BE', path: '/fahrzeuge', icon: '🚐' },
    { name: 'Klasse AM', path: '/fahrzeuge', icon: '🛵' },
  ]

  // The hero is above the fold and the h1 is the LCP element, so it enters on
  // mount with no added delay. Three items: headline, lead, and the button row
  // as a single unit - the two buttons sit side by side and staggering them
  // against each other reads as a glitch.
  const hero = useEntrance({ count: 3 })
  const reduced = useReducedMotion()

  // A standalone element gets both bags: `group` supplies the viewport trigger,
  // `item` overrides the empty group variants with the actual fade-up. Under
  // reduced motion both are empty objects and nothing animates.
  const classesHeading = useReveal({ count: 1 })
  const classesGrid = useReveal({ count: licenseClasses.length })
  const featuresHeading = useReveal({ count: 1 })
  const featuresGrid = useReveal({ count: 3 })
  const cta = useReveal({ count: 3 })

  return (
    <>
      {/* Hero Section */}
      <section className="relative text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <m.div {...hero.group}>
              <m.h1 {...hero.item} className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Herzlich willkommen bei <span className="u-gradient-text">Marc's Fahrschule</span>
              </m.h1>
              <m.p {...hero.item} className="text-xl mb-8 text-gray-300">
                Eure Zukunft beginnt hier! Professionelle Fahrtraining in Essen für alle Klassen.
              </m.p>
              <m.div {...hero.item} className="flex flex-wrap gap-4">
                <Link href="/kontakt" className="btn btn-primary">
                  Jetzt Anfrage senden
                </Link>
                <a href="tel:+492013194371" className="btn btn-secondary">
                  📞 0201/3194371
                </a>
              </m.div>
            </m.div>

            {/* Animated brand logo. The source was a 15MB GIF; it ships as
                WebM/MP4 with a crushed black level instead. */}
            <m.div
              className="relative mx-auto w-full max-w-[420px]"
              initial={reduced ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.34, 1.12, 0.64, 1] }}
            >
              {/* Neon halo. Only opacity animates: a scale on a blurred
                  layer would force re-rasterisation every frame. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,107,0,0.42) 0%, rgba(255,107,0,0.18) 34%, rgba(255,107,0,0) 68%)',
                  animation: reduced
                    ? 'none'
                    : 'halo-breathe 4.5s var(--ease) infinite'
                }}
              />
              <m.div
                // `screen` dissolves the video's black background optically,
                // leaving only the chrome artwork. The blending sits on this
                // element deliberately: the transform creates a stacking
                // context for the CHILDREN, while the element itself keeps
                // blending against the section behind it.
                style={{
                  mixBlendMode: 'screen',
                  // Feathers the edge so no rectangle remains
                  maskImage:
                    'radial-gradient(closest-side, #000 80%, transparent 100%)',
                  WebkitMaskImage:
                    'radial-gradient(closest-side, #000 80%, transparent 100%)'
                }}
                // Only `y`: rotating the masked blend surface would force
                // resampling per frame, pure translation does not.
                animate={reduced ? undefined : { y: [0, -16, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/*
                  Under prefers-reduced-motion the still image replaces the
                  video: an autoplay loop cannot be paused via CSS and would
                  violate WCAG 2.2.2. Decorative, hence aria-hidden - the h1
                  beside it names the brand.
                */}
                <img
                  src={asset('images/logo-poster.png')}
                  alt=""
                  width={480}
                  height={480}
                  className="u-motion-still w-full"
                />
                <video
                  className="u-motion-video w-full"
                  width={480}
                  height={480}
                  style={{ aspectRatio: '1 / 1' }}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={asset('images/logo-poster.png')}
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  <source src={asset('images/logo-anim.webm')} type="video/webm" />
                  <source src={asset('images/logo-anim.mp4')} type="video/mp4" />
                </video>
              </m.div>
            </m.div>
          </div>
        </div>
      </section>

      {/* License Classes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <m.h2
            {...classesHeading.group}
            {...classesHeading.item}
            className="text-3xl font-bold text-center mb-12 text-white"
          >
            Führerschein Klassen
          </m.h2>
          <m.div {...classesGrid.group} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {licenseClasses.map((license) => (
              <MotionLink
                key={license.name}
                {...classesGrid.item}
                href={license.path}
                className="u-card u-card-interactive p-6 text-center group"
              >
                <div className="text-5xl mb-4">{license.icon}</div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary">
                  {license.name}
                </h3>
              </MotionLink>
            ))}
          </m.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <m.h2
            {...featuresHeading.group}
            {...featuresHeading.item}
            className="text-3xl font-bold text-center mb-12 text-white"
          >
            Warum Marc's Fahrschule?
          </m.h2>
          <m.div {...featuresGrid.group} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <m.div {...featuresGrid.item} className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  background: 'var(--color-primary-050)',
                  border: '1px solid var(--color-primary-border-strong)',
                  boxShadow: 'var(--glow-primary)'
                }}
              >
                <span className="text-white text-2xl">👨‍🏫</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Erfahrene Fahrlehrer</h3>
              <p className="text-gray-300">
                Unser Team aus 5 Fahrlehrern und 3 Büromitarbeitern steht Ihnen mit Kompetenz zur Seite.
              </p>
            </m.div>
            <m.div {...featuresGrid.item} className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  background: 'var(--color-primary-050)',
                  border: '1px solid var(--color-primary-border-strong)',
                  boxShadow: 'var(--glow-primary)'
                }}
              >
                <span className="text-white text-2xl">🚗</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Moderne Fahrzeuge</h3>
              <p className="text-gray-300">
                Wir führen Markenfahrzeuge von VW, Opel, Yamaha und Honda in verschiedenen GetriebeVarianten.
              </p>
            </m.div>
            <m.div {...featuresGrid.item} className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  background: 'var(--color-primary-050)',
                  border: '1px solid var(--color-primary-border-strong)',
                  boxShadow: 'var(--glow-primary)'
                }}
              >
                <span className="text-white text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Individuelle Betreuung</h3>
              <p className="text-gray-300">
                Flexible Termine und persönliche Betreuung von der Theorie bis zum Praktischen.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* CTA Section - Same as Hero */}
      <section className="py-16">
        <m.div {...cta.group} className="container mx-auto px-4 text-center">
          <m.h2 {...cta.item} className="text-3xl font-bold text-white mb-4">
            Bereit für Ihren Führerschein?
          </m.h2>
          <m.p {...cta.item} className="text-gray-300 text-lg mb-8">
            Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.
          </m.p>
          <m.div {...cta.item}>
            <Link href="/kontakt" className="btn btn-primary">
              Jetzt Kontakt aufnehmen
            </Link>
          </m.div>
        </m.div>
      </section>
    </>
  )
}

export default Home
