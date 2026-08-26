'use client'

import React from 'react'

export default function ProblemRecognition() {
  const problems = [
    {
      title: 'Market Volatility',
      description: 'Navigate unpredictable market conditions with confidence',
      icon: '📊',
    },
    {
      title: 'Complex Strategies',
      description: 'Simplify wealth management without sacrificing results',
      icon: '🎯',
    },
    {
      title: 'Lack of Insights',
      description: 'Get actionable intelligence to drive better decisions',
      icon: '💡',
    },
  ]

  return (
    <section className="section bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Common Wealth Management Challenges
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            You&apos;re facing complex financial decisions with limited visibility
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, idx) => (
            <div key={idx} className="card-md p-8">
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {problem.title}
              </h3>
              <p className="text-neutral-600">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
