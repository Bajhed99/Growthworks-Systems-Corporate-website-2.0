'use client'

import React from 'react'

export default function Hero() {
  return (
    <section className="section bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-slideUp">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 leading-tight">
                Transform Your Wealth Strategy
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed">
                AI-powered solutions that deliver measurable results. GWS combines cutting-edge technology with expert insights to maximize your financial growth.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="btn-primary px-8 py-3 text-lg">
                Get Started Today
              </button>
              <button className="btn-outline px-8 py-3 text-lg">
                Learn More
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-neutral-200">
              <p className="text-sm font-medium text-neutral-500 mb-4">Trusted by leading organizations</p>
              <div className="flex flex-wrap gap-6">
                <div className="h-8 bg-neutral-300 rounded w-24 animate-shimmer"></div>
                <div className="h-8 bg-neutral-300 rounded w-24 animate-shimmer"></div>
                <div className="h-8 bg-neutral-300 rounded w-24 animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 md:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl opacity-20 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-neutral-400">
                <p className="text-lg font-medium">[Hero Visual - Wireframe]</p>
                <p className="text-sm mt-2">Dashboard/Chart Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
