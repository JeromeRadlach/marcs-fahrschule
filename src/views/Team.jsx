'use client'

import { m } from 'motion/react'
import { team, officeTeam } from '../data/team'
import ExpandableCard from '../components/ExpandableCard'
import { useEntrance, useReveal } from '../lib/motion'

function Team() {
  // The heading and lead sit above the fold, so they animate on mount rather
  // than waiting for a scroll trigger that has already passed.
  const intro = useEntrance({ count: 2 })

  // One group per section, and the heading is the first staggered item in it,
  // so it always leads the cards it introduces. The two sections get their own
  // groups because they scroll into view at different times.
  const instructorReveal = useReveal({ count: team.length + 1 })
  const officeReveal = useReveal({ count: officeTeam.length + 1 })

  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <m.div {...intro.group}>
            <m.h1 {...intro.item} className="text-4xl font-bold text-center mb-4 text-white">
              Unser Team
            </m.h1>
            <m.p {...intro.item} className="text-center text-gray-300 mb-12">
              Wir stehen mit Kompetenz, Fachwissen und guter Laune vom Anfang bis zum Ende an Eurer Seite...
            </m.p>
          </m.div>

          {/* Instructors */}
          <m.div {...instructorReveal.group}>
            <m.h2 {...instructorReveal.item} className="text-2xl font-bold mb-6 text-white">Fahrlehrer</m.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-8 mb-12">
              {team.map((member) => (
                <m.div
                  key={member.id}
                  {...instructorReveal.item}
                  className="u-card u-card-lift overflow-hidden text-center"
                >
                  <ExpandableCard
                    slug={member.image}
                    alt={member.alt}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    heading={member.name}
                    className="text-center"
                  >
                    <p className="text-primary font-medium text-sm mb-1">{member.role}</p>
                    <p className="text-gray-300 text-sm">{member.description}</p>
                  </ExpandableCard>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* Office Team */}
          <m.div {...officeReveal.group}>
            <m.h2 {...officeReveal.item} className="text-2xl font-bold mb-6 text-white">Büro & Organisation</m.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-8">
              {officeTeam.map((member) => (
                <m.div
                  key={member.id}
                  {...officeReveal.item}
                  className="u-card u-card-lift overflow-hidden text-center"
                >
                  <ExpandableCard
                    slug={member.image}
                    alt={member.alt}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    heading={member.name}
                    className="text-center"
                  >
                    <p className="text-primary font-medium text-sm mb-1">{member.role}</p>
                    <p className="text-gray-300 text-sm">{member.description}</p>
                  </ExpandableCard>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </section>
    </>
  )
}

export default Team
