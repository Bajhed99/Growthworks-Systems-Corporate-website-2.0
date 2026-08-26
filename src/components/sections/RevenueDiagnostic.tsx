'use client'

import React from 'react'

export default function RevenueDiagnostic() {
  return (
    <section className="section bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Transform Your Wealth?
            </h2>
            <p className="text-xl text-white/90">
              Get a comprehensive revenue diagnostic and discover how GWS can help you achieve your financial goals
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 hover:bg-neutral-100 font-semibold px-8 py-3 rounded-lg transition-all duration-200">
              Start Your Diagnostic
            </button>
            <button className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-all duration-200">
              Schedule a Consultation
            </button>
          </div>

          <div className="pt-8 border-t border-white/20">
            <p className="text-sm text-white/80">
              No credit card required • Takes less than 10 minutes • Get instant insights
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
