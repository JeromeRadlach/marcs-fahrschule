'use client'

import { useState } from 'react'
import ResponsiveImage from './ResponsiveImage'

// A photo card whose translucent bottom panel shows only the heading until the
// card is clicked; the click folds the detail lines out below it. The whole
// card face - photo included - is one real button, so the toggle is reachable
// by Tab and reacts to Enter and Space without any of that being reimplemented.
//
// The fold is the CSS grid 0fr -> 1fr trick: the browser animates the row
// track, so no text height has to be measured in JS and the panel works for
// any amount of content.
function ExpandableCard({ slug, alt, sizes = '100vw', heading, children, className = '' }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setIsOpen((open) => !open)}
      aria-expanded={isOpen}
      // Inset ring: the card clips its overflow, so a ring drawn outside the
      // button would be cut off on the rounded corners.
      className="block w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
    >
      <div className="card-motion__media bg-gradient-to-br from-primary to-primary-dark">
        <ResponsiveImage slug={slug} alt={alt} sizes={sizes} className="w-full h-auto" />
      </div>
      {/* Anchored to the .u-card (the nearest positioned ancestor), exactly
          like the previous static overlay, so the collapsed look is unchanged. */}
      <div className={`absolute inset-x-0 bottom-0 bg-black/50 px-4 py-2 backdrop-blur-sm ${className}`}>
        <h3 className="text-base font-bold text-white">{heading}</h3>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="pt-1">{children}</div>
          </div>
        </div>
      </div>
    </button>
  )
}

export default ExpandableCard
