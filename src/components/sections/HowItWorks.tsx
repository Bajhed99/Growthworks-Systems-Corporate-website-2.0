'use client'

import React from 'react'

export default function HowItWorks() {
  const steps = [
    { number: '01', title: 'Assessment', description: 'Analyze your current financial situation' },
    { number: '02', title: 'Strategy', description: 'Develop customized wealth strategy' },
    { number: '03', title: 'Implementation', description: 'Execute with precision and care' },
    { number: '04', title: 'Optimization', description: 'Continuously improve and adapt' },
  ]

  return (
    <section className="section bg-white">
      <div className="section-container">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">How GWS Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="text-5xl font-bold text-primary-200 mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-neutral-600">{step.description}</p>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-3 w-6 h-1 bg-primary-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
