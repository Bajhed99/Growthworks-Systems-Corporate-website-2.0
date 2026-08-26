'use client'

import React from 'react'

export default function CredibilityBridge() {
  const credentials = [
    { title: 'ISO Certified', year: '2020' },
    { title: 'Industry Awards', year: '2021-2024' },
    { title: 'Client Testimonials', year: 'Ongoing' },
    { title: 'Expert Team', year: 'Established' },
  ]

  return (
    <section className="section bg-white">
      <div className="section-container">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Why Trust GWS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((cred, idx) => (
            <div key={idx} className="card-md p-6 border-t-4 border-primary-500">
              <p className="text-sm text-neutral-500 mb-2">{cred.year}</p>
              <h3 className="text-lg font-semibold">{cred.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
