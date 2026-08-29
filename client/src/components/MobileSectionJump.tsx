'use client'

import { useState } from 'react'
import { ChevronUp, X } from 'lucide-react'

const sections = [
  { id: 'top', label: 'Home' },
  { id: 'problem-recognition', label: 'Problems' },
  { id: 'how-gws-works', label: 'How It Works' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'industries', label: 'Industries' },
  { id: 'founder', label: 'Founder' },
  { id: 'revenue-diagnostic', label: 'Book Call' },
]

export default function MobileSectionJump() {
  const [isOpen, setIsOpen] = useState(false)

  const handleJump = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mobile-section-jump-button"
        aria-label={isOpen ? 'Close section menu' : 'Open section menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={20} /> : <ChevronUp size={20} />}
      </button>

      {/* Section Menu */}
      {isOpen && (
        <div className="mobile-section-jump-menu">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => handleJump(section.id)}
              className="mobile-section-jump-item"
            >
              {section.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
