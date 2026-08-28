'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function WhoBenefits() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const industries = [
    {
      id: 'home-services',
      title: 'Home Services',
      description: 'Contractors, plumbers, electricians, and home improvement businesses',
      image: '/assets/images/industries/Home Services.jpg',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'financial-advisors',
      title: 'Financial Advisors',
      description: 'Independent advisors and wealth management professionals',
      image: '/assets/images/industries/Financial Advisors.jpeg',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'insurance-agencies',
      title: 'Insurance Agencies',
      description: 'Insurance brokers and agency professionals',
      image: '/assets/images/industries/Insurance Agencies.jpeg',
      color: 'from-green-500 to-green-600'
    }
  ]

  return (
    <section className="section bg-white py-20">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Who GWS Serves
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built for growth-focused businesses across multiple industries. From home services to financial advisory, GWS delivers targeted solutions for your unique challenges.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, idx) => (
            <div
              key={industry.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t ${industry.color} opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {industry.title}
                </h3>
                <p className="text-sm text-gray-100 mb-4">
                  {industry.description}
                </p>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 bg-white text-gray-900 hover:bg-gray-100 transform hover:translate-y-0`}
                  aria-label={`Learn more about ${industry.title}`}
                >
                  Learn More →
                </button>
              </div>

              {/* Static Content (visible on non-hover) */}
              <div className="p-6 bg-white group-hover:hidden">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {industry.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {industry.description}
                </p>
                <button
                  className="w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 bg-gray-100 text-gray-900 hover:bg-gray-200"
                  aria-label={`Learn more about ${industry.title}`}
                >
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Don't see your industry? GWS solutions are flexible and can be customized for any business type.
          </p>
          <button className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  )
}
