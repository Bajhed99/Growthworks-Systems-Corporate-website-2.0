'use client'

import React from 'react'

export default function WhoBenefits() {
  const audiences = [
    { title: 'High-Net-Worth Individuals', icon: '💰' },
    { title: 'Family Offices', icon: '🏢' },
    { title: 'Institutional Investors', icon: '🏛️' },
    { title: 'Financial Advisors', icon: '👔' },
  ]

  return (
    <section className="section bg-neutral-50">
      <div className="section-container">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Who GWS Serves</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((aud, idx) => (
            <div key={idx} className="card-md p-8 text-center">
              <div className="text-5xl mb-4">{aud.icon}</div>
              <h3 className="text-lg font-semibold">{aud.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
