'use client'

import React from 'react'

export default function AIVisibility() {
  const features = [
    { title: 'Predictive Analytics', description: 'AI-driven market forecasting' },
    { title: 'Automated Rebalancing', description: 'Keep portfolios optimized 24/7' },
    { title: 'Risk Intelligence', description: 'Identify risks before they materialize' },
    { title: 'Smart Recommendations', description: 'Personalized investment suggestions' },
  ]

  return (
    <section className="section bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">AI-Powered Wealth Management</h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Cutting-edge artificial intelligence working 24/7 to optimize your wealth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="card-md p-6 bg-gradient-to-br from-primary-50 to-secondary-50 border-none">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-neutral-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
