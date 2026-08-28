'use client'

import React from 'react'

export default function BusinessOutcomes() {
  const outcomes = [
    { metric: '+45%', title: 'Average Return Growth', description: 'Increase in portfolio performance' },
    { metric: '-30%', title: 'Risk Reduction', description: 'Lower volatility exposure' },
    { metric: '+90%', title: 'Client Satisfaction', description: 'Consistently high ratings' },
    { metric: '24/7', title: 'Support Available', description: 'Round-the-clock assistance' },
  ]

  return (
    <section className="section bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div className="section-container">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Proven Business Outcomes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {outcomes.map((outcome, idx) => (
            <div key={idx} className="text-center">
              <div className="text-5xl font-bold mb-2">{outcome.metric}</div>
              <h3 className="text-xl font-semibold mb-2">{outcome.title}</h3>
              <p className="text-white/80">{outcome.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
