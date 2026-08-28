'use client'

import React from 'react'

export default function CoreSolutions() {
  const solutions = [
    { title: 'AI-Powered Analysis', description: 'Real-time market insights' },
    { title: 'Portfolio Optimization', description: 'Maximize returns, minimize risk' },
    { title: 'Risk Management', description: 'Proactive risk mitigation' },
    { title: 'Performance Tracking', description: 'Comprehensive analytics' },
  ]

  return (
    <section className="section bg-neutral-50">
      <div className="section-container">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Our Core Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((sol, idx) => (
            <div key={idx} className="card-md p-6">
              <h3 className="font-semibold text-lg mb-2">{sol.title}</h3>
              <p className="text-neutral-600">{sol.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
